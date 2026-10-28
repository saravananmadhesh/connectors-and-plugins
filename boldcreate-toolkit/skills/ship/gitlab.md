# GitLab equivalents

Use these when `git.host` is `gitlab`. GitLab calls a pull request a merge request (MR). Check the exact flags with `glab <command> --help` for the installed version.

| Task | GitHub (`gh`) | GitLab (`glab`) |
|---|---|---|
| Check sign-in | `gh auth status` | `glab auth status` |
| Open | `gh pr create --base B --head H --title T --body-file F` | `glab mr create --target-branch B --source-branch H --title T --description "$(cat F)"` |
| Update body | `gh pr edit N --body-file F` | `glab mr update N --description "$(cat F)"` |
| View with comments | `gh pr view N --comments` | `glab mr view N --comments` |
| Reply | `gh pr comment N --body R` | `glab mr note N --message R` |
| Check status | `gh pr checks N --watch` | `glab ci status --branch H --live` |
| Failed job log | `gh run view ID --log-failed` | `glab ci trace JOB_ID` |
| Re-run failed | `gh run rerun ID --failed` | `glab ci retry JOB_ID` |
| Merged since a date | `gh pr list --state merged --search "merged:>=DATE"` | `glab mr list --merged`, then filter by merge date |
| Merge, after confirmation | `gh pr merge N` | `glab mr merge N` |

Inline review threads: `glab mr note` adds a general note. To answer a specific thread, quote the file and line in the note.
