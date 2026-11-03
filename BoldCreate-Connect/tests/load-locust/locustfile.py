"""
Locust load testing suite for the public Gateway and Core API.

Simulates host product workloads:
1. User registration (PUT /v1/project/users) with idempotency key.
2. Active user session generation (POST /v1/project/sessions).
3. Reads: listing sessions (GET /v1/project/sessions) and project me (GET /v1/project/me).
Handles 429 rate limiting and 503 saturation with Retry-After backoff.
"""

import os
import random
import time
import uuid
from locust import FastHttpUser, between, events, task

DEFAULT_SESSION_SECONDS = 3600
MAX_THROTTLE_RETRIES = 10


class GatewayHostUser(FastHttpUser):
    """Simulates a host product making gateway requests."""

    wait_time = between(
        float(os.getenv("LOCUST_MIN_WAIT", "0.01")),
        float(os.getenv("LOCUST_MAX_WAIT", "0.05")),
    )

    def on_start(self):
        self.project_key = os.getenv("PROJECT_KEY", "")
        self.run_id = uuid.uuid4().hex[:6]
        self.registered_users = []
        self.headers = {
            "Content-Type": "application/json",
        }
        if self.project_key:
            self.headers["Authorization"] = f"Bearer {self.project_key}"

    def _request_with_retry(
        self,
        method: str,
        path: str,
        name: str,
        expected_status: tuple[int, ...] = (200,),
        json_data: dict | None = None,
    ):
        req_headers = dict(self.headers)
        if method != "GET":
            req_headers["idempotency-key"] = str(uuid.uuid4())

        for attempt in range(MAX_THROTTLE_RETRIES):
            with self.client.request(
                method,
                path,
                headers=req_headers,
                json=json_data,
                name=name,
                catch_response=True,
            ) as response:
                if response.status_code in expected_status:
                    response.success()
                    return response
                if response.status_code in (429, 503):
                    retry_header = response.headers.get("Retry-After", "1")
                    try:
                        wait = float(retry_header)
                    except ValueError:
                        wait = 1.0
                    time.sleep((wait if wait > 0 else 1.0) + random.uniform(0, 0.5))
                    continue

                response.failure(
                    f"Unexpected status {response.status_code}: {(response.text or '')[:200]}"
                )
                return response

        return None

    @task(3)
    def register_user(self):
        user_id = f"locust-{self.run_id}-{uuid.uuid4().hex[:6]}"
        payload = {"userId": user_id, "displayName": f"Locust User {user_id}"}
        res = self._request_with_retry(
            "PUT",
            "/v1/project/users",
            name="PUT /v1/project/users",
            expected_status=(200, 201),
            json_data=payload,
        )
        if res is not None and getattr(res, "status_code", None) in (200, 201):
            self.registered_users.append(user_id)
            if len(self.registered_users) > 100:
                self.registered_users.pop(0)

    @task(5)
    def create_session(self):
        if not self.registered_users:
            self.register_user()
            if not self.registered_users:
                return

        user_id = self.registered_users[-1]
        payload = {"userId": user_id, "expiresInSeconds": DEFAULT_SESSION_SECONDS}
        self._request_with_retry(
            "POST",
            "/v1/project/sessions",
            name="POST /v1/project/sessions",
            expected_status=(201,),
            json_data=payload,
        )

    @task(10)
    def list_sessions(self):
        self._request_with_retry(
            "GET",
            "/v1/project/sessions",
            name="GET /v1/project/sessions",
            expected_status=(200,),
        )

    @task(10)
    def read_project_me(self):
        self._request_with_retry(
            "GET",
            "/v1/project/me",
            name="GET /v1/project/me",
            expected_status=(200,),
        )
