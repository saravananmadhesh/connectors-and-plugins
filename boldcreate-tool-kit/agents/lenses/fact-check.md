# Fact-check lens

Use for any document that makes claims about existing code: a spec for an existing repo, an architecture overview, a README or a decision record.

- **Names.** Every module, function, endpoint, command, setting and file the document names exists in the code with that name.
- **Behaviour.** Every statement about current behaviour matches what the code does, including defaults, limits and error handling.
- **Structure.** Described dependencies and data flows match the imports and calls in the code.
- **Commands.** Build, test and run commands match `.boldcreate/project.yml` and the repository's own configuration.
- **Decisions.** Statements that a decision was made match an accepted record in `docs/adr/`, and the code follows that record.
- **Terms.** Terms match `GLOSSARY.md` and the names used in the code.
- **Evidence.** Each finding cites the `path:line` that contradicts the document, or states that the named item was searched for and not found.
