import unittest
from guard import validate_target


class TestGuard(unittest.TestCase):
    def test_refuses_without_opt_in(self):
        err = validate_target("http://localhost:3002", {})
        self.assertIn("Load runs are disabled", err)

    def test_refuses_production_domain(self):
        err = validate_target("https://api.prod.company.com", {"LOCUST_ALLOW_LOAD": "1"})
        self.assertIn("Refusing to load a production host", err)

    def test_refuses_unallowed_hosts(self):
        err = validate_target("http://external-host.com", {"LOCUST_ALLOW_LOAD": "1"})
        self.assertIn("is not in allowed hosts", err)

    def test_allows_localhost_with_opt_in(self):
        err = validate_target("http://localhost:3002", {"LOCUST_ALLOW_LOAD": "1"})
        self.assertIsNone(err)

    def test_allows_custom_allowed_hosts(self):
        err = validate_target(
            "http://staging.internal:3002",
            {"LOCUST_ALLOW_LOAD": "1", "LOCUST_ALLOWED_HOSTS": "staging.internal"},
        )
        self.assertIsNone(err)

    def test_allows_full_url_in_allowed_hosts(self):
        err = validate_target(
            "http://connect-gateway.boldcreate.ai/",
            {"LOCUST_ALLOW_LOAD": "1", "LOCUST_ALLOWED_HOSTS": "http://connect-gateway.boldcreate.ai/"},
        )
        self.assertIsNone(err)


if __name__ == "__main__":
    unittest.main()
