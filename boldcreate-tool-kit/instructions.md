# BoldCreate-tool-kit rules

- Follow `.boldcreate/principles.md` when it exists, and check each change against it before calling it finished. If a request or existing code conflicts with a principle, name both and ask the user first.
- Call work done, fixed or passing only after the build and test commands in `.boldcreate/project.yml` pass in this session. Otherwise show your evidence and name the checks not run.
- Never write keys, tokens, passwords or connection strings into code, tests, logs, commits or docs; read them from the environment or a secret store. Mask secrets in output. If you find a committed secret, stop and tell the user.
- To run a kit skill the host will not start, read `<kit root>/skills/<name>/SKILL.md` and follow it. The `Kit root:` line gives the path.
