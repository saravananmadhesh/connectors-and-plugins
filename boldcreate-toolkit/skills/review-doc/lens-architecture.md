# Architecture lens

Use for an architecture document such as `docs/architecture/overview.md`.

- **Requirements fit.** Every Must feature and non-functional need in the PRD has a component or decision that serves it.
- **Components.** Each component has one responsibility, a named owner of its data, and stated dependencies. No two components own the same data.
- **Interfaces.** Every interface between components has a contract: inputs, outputs, errors and versioning.
- **Data model.** Entities, keys and relationships are defined. Sensitive fields are marked, with how they are stored.
- **Stack choice.** At least two options were compared on team skills, cost, hosting, ecosystem and licensing, and the choice has a decision record.
- **Failure.** What happens when each external dependency is slow or down is stated.
- **Operations.** Hosting, environments, configuration, logging and monitoring are described.
- **Simplicity.** Each component, layer or service earns its place against a stated need; nothing exists only for possible future scale.
- **Decisions.** Every hard-to-reverse choice links to a decision record in `docs/adr/`, and no record contradicts the document.
