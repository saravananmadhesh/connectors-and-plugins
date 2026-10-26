---
name: define-product
description: Turn a product idea into a reviewed product requirements document (PRD).
license: MIT
disable-model-invocation: true
---

# Define product

Interview the user about a new product, write `docs/product/prd.md`, have it reviewed once by a fresh reviewer, and get the user's approval.

Paths below are defaults. When `.boldcreate/project.yml` exists, use its `docs` entries instead.

## Steps

1. **Check for an existing PRD.** If `docs/product/prd.md` exists, ask whether to update it or start a new one. When updating, the interview covers only what the user wants to change.

   Done when you know whether you are writing a new PRD or updating one.

2. **Interview.** Run the `grilling` skill. The decisions to settle are:
   - who the users are, as one to three named groups;
   - the problems each group has today;
   - the features, each with a MoSCoW priority (must, should, could, won't);
   - non-functional needs, such as scale, availability, privacy, accessibility and supported platforms;
   - how success is measured, with a number or an observable event for each measure;
   - the MVP: the smallest set of must features that solves the main problem for the main user group.

   Leave technology choices for `design-architecture`. If the user raises one, record it as a constraint and move on.

   Done when grilling ends with no open decision and the user has confirmed.

3. **Create the domain docs.** Run the `domain-docs` skill to create the `docs/` folders, `GLOSSARY.md` and the decision record folder if they are missing, and to add the product terms that came up in the interview.

   Done when the glossary holds each product term the PRD will use.

4. **Write the PRD** from `templates/prd.md` in this kit. Use glossary terms. Every feature in the table has a priority, every success measure is checkable, and the MVP section lists features by name from the table.

   Done when every section of the template is filled from the interview and nothing in it was decided by you alone.

5. **Review.** Run the `review-doc` skill on the PRD with the `product` lens.

   Done when review-doc returns, with a CLEAN verdict or with remaining blockers handed to the user.

6. **Approval gate.** Show the user the PRD path, the review verdict and any finding still open. Ask for approval.
   - Approved: hand off to the `design-architecture` skill.
   - Changes requested: apply them, then ask again. Run review-doc again only if a must feature or the MVP scope changed.

   Done when the user approves the PRD.
