---
skill: plan-slices
---
## Setup
An approved spec with five user stories at docs/specs/team-invites/spec.md. One story needs the existing user lookup moved behind a shared interface first. No roadmap exists.
## Prompt
/plan-slices docs/specs/team-invites/spec.md
## Expected
- The first slice is a prefactoring slice that changes no behaviour.
- Every slice delivers one piece of behaviour through every layer it needs, with a check and the user stories it covers.
- Every user story is covered by at least one slice, and blocking edges form no cycle.
- Each slice's details name its main files; two slices that share a main file are linked by blocking edges, so build never runs them in parallel.
- Each milestone's `Integration branch:` line names the current `feat/<slug>` branch when the session is on one.
- docs/product/roadmap.md has a table with columns ID, Slice, Blocked by, Status, Commit; IDs follow M1-S1; every status is todo.
- The user approves the plan before the roadmap is saved.
- A second run after M1-S1 is marked done keeps M1-S1 unchanged.
- The build skill starts after the roadmap is saved.
- After approval, the roadmap is committed on the integration branch as `Add roadmap`, and `git status` is clean.
