---
skill: domain-docs
---
## Setup
A repository with .boldcreate/project.yml but no GLOSSARY.md and no docs/adr/. The team has just chosen to store sessions on the server instead of in signed cookies.
## Prompt
We decided to keep sessions server-side. Record that, and add "session" to the glossary.
## Expected
- GLOSSARY.md and docs/adr/ are created, and project.yml gains docs.glossary and docs.adr if they were missing.
- The glossary has one row for "session" with a meaning under 25 words.
- docs/adr/0001-<kebab-title>.md is created with Context, Options, Decision and Consequences filled.
- The record title states the decision, and its ID is ADR-0001.
- The user is asked to accept the record, and its status reflects the answer.
- Asked to record "use a local helper function for date formatting", the skill explains that the choice stays inside one module and writes no record.
