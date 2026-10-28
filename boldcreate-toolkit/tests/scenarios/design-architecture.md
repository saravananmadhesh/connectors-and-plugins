---
skill: design-architecture
---
## Setup
An approved docs/product/prd.md for a web application, a GLOSSARY.md, an empty docs/adr/ folder and no source code.
## Prompt
/design-architecture
## Expected
- Two or three stack options are shown in one table covering team skills, cost, hosting, ecosystem and licensing, with one recommended.
- A decision record for the chosen stack lists the options not chosen.
- docs/architecture/overview.md has sections for components, data model, API contracts, security model and hosting, and every Must feature maps to a component.
- Every hard-to-reverse choice in the overview links to a decision record.
- review-doc runs with the architecture lens and the security-reviewer agent runs on the overview, each given file paths only.
- plan-slices starts only after the user approves.
- The user is asked which languages the team knows before any stack option is shown.
- No decision record is written for a choice that stays inside one module, or for not adding something yet, such as no CI.
- After approval, the overview and decision records are committed on the PRD's integration branch and nothing is pushed.
- With "Lane: small" in a PRD for a local tool with no accounts or network input, the overview stays under 500 words, decision records cover only the stack and the data format, review-doc runs once, and the security-reviewer agent does not run.
