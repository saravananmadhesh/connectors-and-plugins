# Standards baseline

Check the changed code against these items after the project's own standards and `.boldcreate/principles.md`. The project's rules win when they conflict with this list.

## Design

- A function or module does more than one job.
- A function is long enough that its steps need comments to follow.
- Deep nesting that early returns would flatten.
- Duplicated logic that already exists elsewhere in the codebase.
- A new abstraction with a single caller and no stated reason.
- A public interface changed without the callers or tests being updated.
- Feature flags, configuration or parameters that nothing reads.

## Naming

- Names that do not match the terms in `GLOSSARY.md`.
- Two names for one concept, or one name for two concepts.
- Vague names: `data`, `info`, `handle`, `manager`, `util`, `temp`.
- Boolean names that do not read as a yes/no question.

## Errors

- Errors caught and ignored, or logged and then lost.
- Broad catches that hide unrelated failures.
- Error messages that do not say what failed or what to do.

## Tests

- New behaviour with no test.
- Tests that check internal calls instead of outcomes.
- Tests skipped, disabled or weakened in this diff.

## Generated-code clutter

- Comments that restate the next line of code.
- Comments addressed to the reader of a chat, such as notes about what was changed or why it was asked for.
- Defensive checks for states the types or callers already rule out.
- Wrappers that only forward to another function.
- Unused imports, variables, parameters or files.
- Leftover debug output, placeholder values or example data.
- Large blocks of commented-out code.
- New dependencies added for something the standard library or an existing dependency already does.
- Style that differs from the surrounding file: formatting, error handling, logging, naming.
