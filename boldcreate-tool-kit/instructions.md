# BoldCreate Tool Kit rules

- Follow `.boldcreate/principles.md` when it exists. Check each change against it before calling the change finished. When a request or existing code conflicts with a principle, name the principle and the conflict, and ask the user before going against it.
- Call work done, fixed or passing only after the project's build and test commands from `.boldcreate/project.yml` have passed in this session. Otherwise show the evidence you have, and say which checks were not run.
- Never write keys, tokens, passwords or connection strings into code, tests, logs, commits or docs. Read them from environment variables or a secret store. Mask any secret in command output before showing it. If you find a committed secret, stop and tell the user.
