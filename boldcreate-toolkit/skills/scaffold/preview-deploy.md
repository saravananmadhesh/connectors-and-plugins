# Preview deployment

A preview deployment lets people try the scaffold before real features land. It is never a production deployment.

## Rules

- Deploy only after the user confirms the exact target and command in this session.
- Deploy only to a preview or staging target. If the target's name, configuration or account suggests production, or the user cannot say that it is not production, stop.
- Read credentials from the environment or the host's login session. Never write them to a file, a commit or the chat.

## Steps

1. **Pick the target.** Read the hosting section of `docs/architecture/overview.md`. Propose the matching preview option and the command that deploys to it. Done when the user confirms target and command.
2. **Check access.** Run the hosting tool's own status or whoami command. Done when it shows a signed-in account. If it does not, ask the user to sign in themselves; do not ask for a token in the chat.
3. **Deploy.** Run the confirmed command. Done when it exits 0 and prints a URL.
4. **Smoke check.** Request the URL. Done when it returns a success status. On failure, show the redacted error and stop.
5. **Record it.** Add the preview URL and the command used to the README, under a "Preview" heading. Add the teardown command next to it.

Report the URL and how to tear the preview down.
