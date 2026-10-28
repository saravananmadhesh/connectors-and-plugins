---
name: define-product
description: Turn a product idea into a reviewed product requirements document (PRD).
license: MIT
disable-model-invocation: true
---

# Define product

Interview the user about a new product, write `docs/product/prd.md` on the integration branch, have it reviewed once by a fresh reviewer, get the user's approval and commit it.

Paths below are defaults. When `.boldcreate/project.yml` exists, use its `docs` entries instead.

## Lanes

- **Full lane**: the steps below as written.
- **Small lane**: a short PRD and no separate product review. The product is checked later in the combined review that `design-architecture` runs.

Use the lane `bc-start` confirmed. Run on its own, decide it after the interview: at most `thresholds.small_app_features` must features (default 5) and one user group is the small lane. State the lane in one line and let the user change it.

## Steps

1. **Check for an existing PRD.** If `docs/product/prd.md` exists, ask whether to update it or start a new one. When updating, the interview covers only what the user wants to change.

   Done when you know whether you are writing a new PRD or updating one.

2. **Prepare the branch.** Read `git.default_branch` and `git.protected_branches` from `.boldcreate/project.yml`. When they are missing, the default branch is the one the repository already uses, or `main` in a new repository, and only it is protected.
   - Current branch is not protected and not the default branch: work on it.
   - Otherwise: create `feat/<slug>` from the default branch and check it out. `<slug>` is the product name in kebab case.
   - The folder is not a Git repository: initialise one with the default branch name. The default branch has no commits: make one empty commit on it, `Initial commit`, so the new branch has a base.

   Done when you are on a branch that is not protected, and you know its name.

3. **Interview.** Run the `grilling` skill. The decisions to settle are:
   - who the users are, as one to three named groups;
   - the problems each group has today;
   - the features, each with a MoSCoW priority (must, should, could, won't);
   - non-functional needs, such as scale, availability, privacy, accessibility and supported platforms;
   - how success is measured, with a number or an observable event for each measure;
   - the MVP: the smallest set of must features that solves the main problem for the main user group.

   In the small lane, ask only about non-functional needs that apply to this product, and settle one success measure.
   Leave technology choices for `design-architecture`. If the user raises one, record it as a constraint and move on.

   Done when grilling ends with no open decision and the user has confirmed.

4. **Create the domain docs.** Run the `domain-docs` skill to create the `docs/` folders, `GLOSSARY.md` and the decision record folder if they are missing, and to add the product terms that came up in the interview.

   Done when the glossary holds each product term the PRD will use.

5. **Write the PRD** from `prd-template.md` in this skill's folder. Use glossary terms. Every feature in the table has a priority, every success measure is checkable, and the MVP section lists features by name from the table. Under the `Status:` line, add `Integration branch: <branch from step 2>`.

   In the small lane, also add `Lane: small` under the `Status:` line. Keep each section to a few lines and the whole PRD under 400 words. Write "Not applicable" for a section with nothing to say instead of filling it.

   Done when every section of the template is filled from the interview and nothing in it was decided by you alone.

6. **Review.** Full lane: run the `review-doc` skill on the PRD with the `product` lens. Small lane: skip this step.

   Done when review-doc returns, with a CLEAN verdict or with remaining blockers handed to the user, or the lane is small.

7. **Approval gate.** Show the user the PRD path, the review verdict and any finding still open. Ask for approval.
   - Approved: set the status to `Approved`, then commit the PRD, the glossary and any decision records as one commit, `Add product requirements`. Do not push. Hand off to the `design-architecture` skill and pass the lane.
   - Changes requested: apply them, then ask again. In the full lane, if a must feature or the MVP scope changed and review round 2 has not run, run review-doc as round 2; otherwise show the change to the user and let them decide.

   Done when the user approves the PRD and the commit exists.
