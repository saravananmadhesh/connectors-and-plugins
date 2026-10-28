---
name: build
description: Build a milestone slice by slice with implementer agents, then review it and stop for approval.
license: MIT
disable-model-invocation: true
---

# Build

Build one milestone from `docs/product/roadmap.md`. Each ready slice goes to a fresh `implementer` agent on its own branch, lands on the integration branch as one commit, and the milestone ends with a full review and a human gate.

## Inputs

- `docs/product/roadmap.md`: milestones and the slice table `| ID | Slice | Blocked by | Status | Commit |`.
- The spec or PRD named on the roadmap's `Source:` line, and the stories and check under `Slice details`.
- `.boldcreate/project.yml`: commands, `thresholds.slice_review_files`, `git.default_branch`.

If the roadmap has no slices, stop and run the `plan-slices` skill.

## 1. Load the state

1. Pick the milestone: the first one with a slice that is not `done`. Confirm it with the user in one line.
2. Read the milestone's `Integration branch:` line in the roadmap. Check out that branch; it usually exists already, holding the product docs. Create it from `git.default_branch` only if it does not exist yet. Never start a second integration branch for the same milestone.
3. Reconcile the roadmap with git. A slice whose ID starts a commit subject on the integration branch is done; set it to `done` and fill its commit. Never rebuild a done slice.
4. For each slice marked `in-progress`: if its slice branch has commits, resume from them; otherwise set it back to `todo`.

Done when every slice status in the milestone matches the integration branch.

## 2. Work the frontier

Follow `frontier.md` in this folder to find ready slices and to branch and merge them. For each ready slice:

1. Set its status to `in-progress` in the roadmap.
2. Start the `implementer` agent with only: the slice ID, the roadmap path, the spec path, the integration branch and the slice branch name. Start one agent per ready slice, in parallel where the host allows. Where the host cannot start agents, build the slice in this session with the `tdd` skill, one slice at a time.
3. When the implementer reports, run the `verify` skill on the slice commit in a fresh temporary worktree, as `frontier.md` describes. A slice is done only on `VERIFIED`.
4. Run a spec check when the slice changed more files than `thresholds.slice_review_files`, or changed a shared seam (a public interface other slices or modules call). Start the `spec-reviewer` agent with the spec path, the slice ID and the slice's commit range. Where the host lets the caller pick the agent's model, use a smaller model (in Claude Code, `sonnet`). Where the host cannot start agents, say the spec check was skipped and why.
5. When `verify` or the implementer fails because the operating system refused to run a file the build produced (for example Windows Smart App Control or Application Control, error `0x800711C7`), or because a path is too long, do not retry and do not try to get around the policy. Tell the user the cause and that a repository outside `%TEMP%`, on a short path, usually avoids it, then stop.
   On `NOT VERIFIED` or a blocking finding, send the evidence or finding IDs back in one more implementer run on the same slice branch. If it still fails, stop and ask the user.
   When an implementer reports `BLOCKED` because a tool call was refused, show the user the refused command and how to allow it (in Claude Code, a `permissions.allow` entry such as `Bash(git:*)`, or `PowerShell(git:*)` where the host runs commands in PowerShell, as Claude Code does on Windows), then build that slice in this session with the `tdd` skill. Start implementers again for later slices once the user has allowed the command.
6. Merge the slice as one commit and update the roadmap, as `frontier.md` describes.

Recompute the frontier after each merge and start the next ready slices in the same turn. The approved plan covers every slice in the milestone, so do not stop between slices to ask whether to go on. Done when every slice in the milestone is `done`, or no slice is ready and some are still `todo`. In the second case, show the blocked slices and their blockers and ask the user.

## 3. Pause and resume

When the user stops the work or the session is running out of room:

1. Leave each unfinished slice as `in-progress` with its branch intact.
2. Run the `retro` skill in handoff mode, so it writes `.boldcreate/handoff.md`.

A new session resumes by running this skill again; step 1 picks up from the roadmap and the git history.

## 4. Milestone review

1. Run the `code-review` skill on the integration branch, from its merge base with `git.default_branch` to its tip. This is the full two-axis review for the milestone.
2. Save the review reports to `.boldcreate/review-M<n>.md` (not committed). Sort the findings:
   - **Direct fixes:** minor findings and major findings that need a small, local change. Fix them in this session on the integration branch, with the `tdd` skill where the fix changes behaviour. Commit once as `M<n>: fix <finding IDs>`.
   - **Implementer fixes:** each blocking finding, and each major finding too large for a direct fix. Start one `implementer` run per finding, or per tight group of findings in the same files, with branch `feat/<slug>--M<n>-fix-<first ID>`, base the integration branch, its finding IDs and the report path, and the message `M<n>: fix <finding IDs>`. Merge each as one commit, as `frontier.md` describes for a slice.

   A finding you decide not to fix stays open with your reason. Done when every finding is fixed or open with a reason.
3. If `commands.run` is missing from `project.yml` and the application now has an entry point, save the command that starts it.
4. Run the `verify` skill. The gate needs `VERIFIED`.

## 5. Milestone gate

Show a status report, at most 250 words. Do not repeat the slice table; point to `docs/product/roadmap.md` for it.

- **Done:** the number of slices done and of findings fixed.
- **Open:** findings not fixed, with IDs; slices moved out of the milestone.
- **Risks:** what could break, what is hard to reverse, what was not tested.
- **Verify:** the verdict and the commands it ran.
- **Cost:** only when the host reports agent token usage, one line with the milestone total and the largest run with its slice ID.

Wait for the user's approval. On approval, hand off to the `ship` skill. Start the next milestone only after the user approves it in this session.

## Safety

- Never push, force-push, merge to a protected branch or delete a branch without the user's confirmation in this session. Slice branches stay until the user agrees to remove them.
- Implementers never push. This skill does not push either; `ship` does.
