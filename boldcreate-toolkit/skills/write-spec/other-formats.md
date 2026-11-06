# Specs in other layouts

Some repositories already keep specs in a layout made by another tool or by hand. Continue from what is there instead of starting over.

## Recognising a layout

Look for a folder of feature documents outside `docs/specs/`. Common shapes:

| Shape | What it usually holds |
|---|---|
| One folder per feature with separate files for requirements, design and tasks | Requirements in user story or acceptance form, a design note, a checklist of tasks |
| A folder of change proposals, each with a proposal, a task list and changed requirements | One change at a time, with requirements stored as additions, edits and removals |
| A numbered folder per feature with a spec, a plan and a task list | A spec, a technical plan and ordered tasks |
| A project principles or constitution file next to the specs | Rules every feature must follow |

## Reading it

1. Map what exists onto the kit's spec sections: problem, solution, user stories, implementation decisions, testing decisions, out of scope.
2. Treat requirements and acceptance criteria as user stories. Keep their original IDs next to the new `US-` IDs so links still work.
3. Treat design or plan files as implementation decisions. Drop file paths; keep module and interface names.
4. Treat task lists as input for `plan-slices`, not as part of the spec.
5. If a principles or constitution file exists, tell the user and offer to merge it into `.boldcreate/principles.md`.

## Where to write

- If the user wants to keep the existing layout, write the kit's spec into that feature's folder as `spec.md` and leave the other files in place.
- Otherwise write to `docs/specs/<feature-slug>/spec.md` and add one line at the top naming the folder it was built from.

Never delete or rewrite the original files unless the user asks.
