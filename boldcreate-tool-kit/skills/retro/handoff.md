# Handoff

Write `.boldcreate/handoff.md` so a fresh session can continue without this conversation. Point to files, IDs and commits; never copy their content.

## Steps

1. **Bring the record up to date.** Make sure `docs/product/roadmap.md` shows the true status of every slice, and that finished work is committed. Done when `git status` shows only the roadmap and the in-progress work.
2. **Write the file** in the format below, replacing any earlier handoff.
3. **Check it.** Every path in it exists, every commit hash resolves with `git rev-parse`, and the file is under 40 lines.
4. **Tell the user** where it is, and that a new session should start by reading it.

## Format

```markdown
# Handoff <yyyy-mm-dd hh:mm>

Read this file first, then the files it points to.

## Goal
<one line: what the work is for>

## Where things are
- Branch: <branch> at <short hash>
- Roadmap: docs/product/roadmap.md, milestone <n>
- Spec: <path>
- Slice branches in progress: <branch list, or none>

## Done
- <slice ID>: <short hash>

## Next
1. <the exact next action, for example "run the build skill; M2-S3 is ready">

## Open
- <decisions waiting on the user>
- <blocking finding IDs and where the report is>
- <failing command and its first error line>

## Do not redo
- <work that is finished or tried and rejected, with the reason>
```

Leave out a section that has nothing in it.

The file stays uncommitted unless the user asks to commit it, since it describes one person's working state.
