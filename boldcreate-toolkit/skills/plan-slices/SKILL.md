---
name: plan-slices
description: Break a PRD or spec into milestones and vertical slices with blocking edges, saved to the roadmap.
license: MIT
disable-model-invocation: true
---

# Plan slices

Turn an approved PRD and architecture, or an approved feature spec, into milestones made of thin vertical slices. Save the plan in `docs/product/roadmap.md` so work can resume in a new session without redoing finished slices.

Paths below are defaults. When `.boldcreate/project.yml` exists, use its `docs` entries instead.

## Steps

1. **Read the inputs.**
   - New application: `docs/product/prd.md` and `docs/architecture/overview.md`.
   - Feature: `docs/specs/<feature-slug>/spec.md`.
   - Both: `GLOSSARY.md`, the decision records, and `docs/product/roadmap.md` if it exists.

   If the roadmap exists, keep every slice with status `done` or `in-progress` as it is, with its ID. New slices take the next free IDs.

   Done when you can list the user stories or must features to cover and the slices already done.

2. **Set milestones.** The first milestone is the smallest release that delivers value: the MVP for a new application, or the core user stories for a feature. Later milestones add the remaining features in priority order. A feature usually fits in one milestone.

   Done when each must feature or user story belongs to exactly one milestone.

3. **Plan prefactoring first.** If the existing code needs a change of structure to make the new work easy, plan it as the first slices of the milestone. A prefactoring slice changes no behaviour and keeps all tests passing.

   Done when every needed structural change is its own slice ahead of the slices that rely on it.

4. **Cut vertical slices.** Each slice:
   - goes through every layer it needs (for example data, logic and interface) to deliver one observable piece of behaviour;
   - has a check a person or a test can run to show it works on its own;
   - is small enough to build in one fresh session, aiming for fewer changed files than `thresholds.slice_review_files` (default 8);
   - names the user stories it covers;
   - names the main files or modules it expects to change;
   - lists the slices it is blocked by, by ID.

   Two slices that change the same main file cannot run in parallel. If neither already depends on the other, add the earlier one to the later one's blocked-by list.

   Prefer more, thinner slices over fewer, wider ones. Split by behaviour, not by layer: "list items" and "add an item" are slices; "the database layer" is not.
   For a wide mechanical change, such as a rename that breaks many call sites, follow `wide-change.md` in this folder.

   Done when every slice has a check, stories, main files and a blocked-by list (which may be empty).

5. **Check the plan.**
   - Every must feature or user story is covered by at least one slice.
   - Blocking edges point only to slices in the same or an earlier milestone, and form no cycle.
   - At least one slice in the first milestone is blocked by nothing.
   - Any two slices that share a main file are linked by a chain of blocking edges.

   Done when all four checks pass.

6. **Show the plan** to the user as the slice table per milestone, with the first ready slices marked. Ask for approval.

   Done when the user approves the plan or the changes they asked for are applied and approved.

7. **Save the roadmap** at `docs/product/roadmap.md` from `roadmap-template.md` in this skill's folder. Each milestone has a slice table with IDs `M<milestone>-S<slice>`, status `todo` for new slices, and an empty Commit column. Write each slice's stories, check and main files (`Files: <paths>`) in the slice details below its table. Fill each milestone's `Integration branch:` line with the branch named on the PRD's `Integration branch:` line; without one, use the current branch when it is a `feat/<slug>` branch, otherwise `feat/<slug>` with the slug from the PRD or spec name.

   Check out the integration branch, creating it from `git.default_branch` if it does not exist, and commit the roadmap there as `Add roadmap`.

   Done when the roadmap file matches the approved plan and is committed on the integration branch.

8. **Hand off.**
   - New application with no code yet, first milestone: the `scaffold` skill.
   - Otherwise: the `build` skill.

   Done when the next skill has started.
