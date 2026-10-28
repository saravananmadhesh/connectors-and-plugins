# Release notes

Turn the PRs merged since the last release into notes a user of the product can read.

## Scope

1. Find the last tag: `git describe --tags --abbrev=0`. If there is none, ask the user for a start commit or date.
2. Take the tag's date: `git log -1 --format=%cI <tag>`.
3. List the merged PRs into the default branch since then:
   `gh pr list --state merged --base <default_branch> --search "merged:>=<date>" --limit 200 --json number,title,body,labels,url`.
   On GitLab, use the equivalent in `../ship/gitlab.md`.

Done when the PR list is loaded. If it holds 200 entries, narrow the date range and fetch the rest.

## Group

Put each PR in exactly one group:

| Group | How to tell |
|---|---|
| Breaking changes | A label or title that says breaking, a "hard to reverse" risk call that changes a public interface, or a removed feature or setting |
| Features | New behaviour a user can see or call |
| Fixes | Corrected behaviour |

PRs that change only tests, CI, tooling or internal structure leave the notes. List their count in one closing line.

## Write

```markdown
## <version or "Unreleased"> (<yyyy-mm-dd>)

### Breaking changes
- <what changed and what the user must do> (#123)

### Features
- <what the user can now do> (#124)

### Fixes
- <what works correctly now> (#125)
```

- Write each line for the user of the product, not for its developers. Use the PR body, not only its title.
- Breaking changes say what to change, in one step each.
- Leave out an empty group.

## Check

Done when every merged PR in scope is either in a group or counted in the closing line.
