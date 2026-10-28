# Security

Report a vulnerability in `@syncfusion/boldcreate-connect` or `Syncfusion.BoldCreate.Connect` to the Syncfusion security team by email (security@syncfusion.com), not in a public issue. Include the package, its version and the steps to reproduce. You get an answer within three working days.

What the packages promise, and what a report should break:

- A key (`prk_`) or session token (`stk_`) never appears in an error message, log line, printed value, lock file or trace.
- The base address must be https (http only for localhost unless the host opts in), so a key is not sent in clear text.
- Archives are checked against their hash and refused when they hold `..`, absolute or drive paths, links, too many entries or too many bytes; files are placed inside the sync folder only.
- A webhook is accepted only with a valid signature (constant-time compare) and a timestamp inside the tolerance.

Supported versions: the latest minor of each major version. Breaking changes are announced in the changelog one minor version ahead.
