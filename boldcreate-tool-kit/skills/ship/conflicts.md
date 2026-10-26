# Merge conflicts

Bring the target branch into the PR branch, resolve each conflict on purpose, and prove the result still builds and passes.

## Steps

1. **Update.** `git fetch origin <target-branch>`.
2. **Merge, do not rebase.** `git merge origin/<target-branch>`. A merge keeps the pushed history, so no force-push is needed. Rebase only when the repository requires a linear history and the user confirms the force-push it needs; then push with `--force-with-lease`, never plain `--force`.
3. **Resolve each file.** For each conflict:
   - Read both sides and the commits that made them (`git log --oneline -3 -- <file>` on each side).
   - Keep the behaviour both sides intended. Taking one side whole is correct only when the other side's change is already present elsewhere or no longer needed; say which in the merge commit body.
   - When the two intents contradict each other, show both to the user and ask.
4. **Check generated files.** Regenerate lock files and other generated files with the project's own tool instead of editing their conflict markers by hand.
5. **Confirm no markers remain.** `git diff --check` and a search for conflict markers in the changed files both come back clean.
6. **Verify.** Run the `verify` skill. Done when `VERIFIED`.
7. **Commit and push.** Commit the merge with a body that lists each conflicted file and how it was resolved. Push with a normal `git push`.

Done when the PR reports that it can merge and CI runs again on the new commit.
