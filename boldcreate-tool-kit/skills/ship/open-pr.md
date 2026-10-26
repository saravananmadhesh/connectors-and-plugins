# Open a pull request

## Title

`<slug>: <what the user gets, in under 60 characters>`. For a milestone, add the milestone: `billing: M1 invoices can be created and paid`.

## Body

Write the body to a file outside the repository and pass it with `--body-file`. Keep it under 300 words.

```markdown
## What changed
- M1-S1: <one line, in the user's terms>
- M1-S2: <one line>

## Evidence
- verify: VERIFIED (<commands run>)
- <tests added, with counts; a screenshot or output for visible behaviour>

## Risk
- Reversibility: easy | hard. <why, in one line: data migration, public API, config change>
- Impact: <who or what is affected, and how widely>

## Links
- Spec: docs/specs/<feature-slug>/spec.md
- Decisions: ADR-0003
- Slices: M1-S1, M1-S2
```

For a quick fix or bug with no slices, replace the slice bullets with one or two lines on the change, and link the issue instead of the spec when there is one.

Rate reversibility as hard when the change migrates data, changes a public interface others call, deletes anything, or changes security settings.

## One PR for the branch

```
gh pr create --base <default_branch> --head <branch> --title "<title>" --body-file <file>
```

To update an existing PR: `gh pr edit <number> --title "<title>" --body-file <file>`.

## One PR per slice

Use this when the milestone diff is over `pr_split_lines`. Each PR then shows exactly one slice commit.

1. Push the integration branch as it was before the first slice of this milestone: `git push -u origin <base-commit>:refs/heads/feat/<slug>`. The base commit is the parent of the first slice commit. If `feat/<slug>` already exists on the remote at a later commit, stop and ask the user: moving it back needs a force-push.
2. For each slice in roadmap order, push a branch that ends at that slice's commit: `git push origin <slice-commit>:refs/heads/feat/<slug>--<slice-id>`.
3. Open the first slice's PR into `feat/<slug>`. Open each later slice's PR into the previous slice's branch, so its diff holds only its own commit.
4. Use the body template with one slice per PR, and add "Part n of m" under the title.

When a slice PR merges and its branch is removed, GitHub moves the next PR's base to `feat/<slug>`. Removing a merged branch is the reviewer's call; do not delete branches without confirmation.

After every slice PR has merged, open one PR from `feat/<slug>` into the default branch, with a short body that links the slice PRs.
