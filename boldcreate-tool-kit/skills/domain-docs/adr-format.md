# Decision record format

File name: `NNNN-<kebab-title>.md`, for example `0003-store-orders-in-postgres.md`.

```markdown
# ADR-NNNN: <decision as a short statement>

Status: Proposed | Accepted | Superseded by ADR-NNNN
Date: YYYY-MM-DD

## Context

What forces the choice: the requirement, constraint or problem, in three to six sentences. Name the spec, story or earlier record IDs it relates to.

## Options

- **<Option A>**: one line on what it is, one line on its main cost.
- **<Option B>**: same.

## Decision

The option chosen, in one or two sentences.

## Consequences

- What becomes easier.
- What becomes harder or is ruled out.
- What would make us revisit this.
```

## Writing guidance

- Title the record with the decision, not the question: "Use server-side sessions", not "Session strategy".
- List only options that were seriously considered. Two or three is typical.
- Keep the whole record under 300 words.
- Use glossary terms.
- Never include credentials, internal hostnames or personal data.
