# Drift report

List every place where the written docs and the current code disagree. Compare against the code at `HEAD`, not only a recent diff, because drift builds up across many changes.

## Scope

Read the doc locations from `docs` in `.boldcreate/project.yml`. Default scope: every spec under `docs.specs`, the glossary, and every accepted decision record under `docs.adr`. With more than five specs, ask which to check, recommending the ones whose code changed most since the spec's last commit.

## Steps

1. **Specs.** Start one `spec-reviewer` agent per spec, in parallel where the host allows, with the spec path, the commit `HEAD`, and the instruction to check the whole code against the spec. Where the host cannot start agents, stop the spec part and say so; do not review specs in this session.
2. **Glossary.** For each term in the glossary, search the code for the term and for any name the entry lists as an alias to avoid. Flag a term the code no longer uses, and an alias the code uses instead of the term.
3. **Decision records.** For each accepted record, check that its decision still holds in the code: the named library, pattern, boundary or setting is still there. Flag a record the code contradicts and no later record supersedes.
4. **Merge the results** into one table. Keep the spec-reviewer finding IDs (`P1`, `P2`). Number glossary and decision-record items `G1`, `A1`.

## Output

```
Drift: <n> items (<blocking> blocking)
| ID | Doc | Doc says | Code | Suggested action |
```

- **Doc:** path and section, or the glossary term, or the ADR ID.
- **Code:** `path:line` that shows the difference.
- **Suggested action:** update the doc, change the code, or ask the user which is right.

Keep the report under 400 words. When there is no drift, say so in one line with the scope checked.

## Check

Done when every spec, term and record in scope was checked, and every row has a doc location and a code location.
