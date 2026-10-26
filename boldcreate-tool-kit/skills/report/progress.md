# Progress summary

Summarise one person's work over a period from commits and PRs.

## Scope

Default: the current git user (`git config user.email`) and the last seven days. Show it in one line and let the user change the person or the dates.

## Collect

- Merged PRs: `gh pr list --state merged --author <handle> --search "merged:<start>..<end>" --json number,title,url,labels`
- Open PRs: `gh pr list --state open --author <handle> --json number,title,url,isDraft`
- Commits on the default branch that came without a PR: `git log <default_branch> --author=<email> --since=<start> --until=<end> --no-merges --format="%h %s"`

On GitLab, use the equivalents in `../ship/gitlab.md`.

## Group

| Group | What goes in it |
|---|---|
| Features | New behaviour |
| Fixes | Corrected behaviour |
| Tech debt | Refactors, dependency updates, tests, CI, tooling, docs |
| In progress | Open PRs, with draft PRs marked |

## Write

At most 250 words. One line per item: what it does for the product, then the PR number or commit hash. Combine several small commits on one topic into one line. Leave out an empty group.

## Check

Done when every merged PR, open PR and direct commit in scope appears in exactly one group.
