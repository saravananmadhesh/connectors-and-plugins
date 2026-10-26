# Spec lens

Use for a feature spec such as `docs/specs/<feature-slug>/spec.md`.

- **Sections.** Problem, solution, user stories, implementation decisions, testing decisions and out of scope are all present.
- **Problem coverage.** Every need named in the problem is met by a user story or listed as out of scope.
- **Stories.** Each story has an ID (`US-1`), one actor, one goal and acceptance conditions a test can check.
- **Testable wording.** No condition relies on words such as "fast", "easy", "secure" or "user-friendly" without a number or a check.
- **Edge cases.** Empty input, limits, duplicates, concurrency, permissions and failure of each dependency are covered where they apply.
- **Consistency.** No two sections disagree on a value, a rule or a scope. Out-of-scope items appear nowhere else as requirements.
- **Terms.** Every domain term is defined in the spec or `GLOSSARY.md`, and used with one meaning.
- **Implementation decisions.** Modules and interfaces are named; file paths and code are not.
- **Testing decisions.** Tests observe behaviour through the agreed public seams, not private functions or storage.
- **Security and privacy.** Who may see and change each piece of data is stated.
