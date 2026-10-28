---
skill: write-spec
---
## Setup
A repository with GLOSSARY.md and docs/adr/. Earlier in the session the user and agent agreed the scope of a password reset feature through a grilling interview; one question about token lifetime was left open.
## Prompt
/write-spec
## Expected
- No new questions are asked.
- docs/specs/password-reset/spec.md has Problem, Solution, User stories, Implementation decisions, Testing decisions and Out of scope sections.
- User stories are numbered US-1, US-2 and each has at least one acceptance check.
- Implementation decisions name modules and interfaces and contain no file paths.
- The token lifetime appears as a line starting with "Open decision:".
- New terms are added to GLOSSARY.md.
- review-doc starts with the spec lens.
- A decision record is written only for a choice that is hard to reverse and affects more than one module or the public interface, and the spec links it.
- Started on main (protected), the skill creates `feat/<feature-slug>` before writing any file, and no spec, glossary or decision record change is left on main.
- The spec template is read from spec-template.md in the write-spec folder on the first try.
