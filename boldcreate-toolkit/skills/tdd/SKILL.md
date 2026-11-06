---
name: tdd
description: Build or change behaviour test-first at agreed seams, one failing test at a time. Use for any code change that adds or alters behaviour, including bug fixes after a reproduction exists.
license: MIT
---

# Test-driven development

Grow the code in small steps, each proven by a test that failed first.

## Before you start

- Read `commands.test` from `.boldcreate/project.yml`. If it is missing, ask the user for the test command and do not guess.
- Read the spec or bug report you are working from, and `GLOSSARY.md` if present.

## Steps

1. **Set up the branch.** This step applies on the quick-fix and bug paths: when this skill is started directly, by `bc-start`, or by `debug`. When `build` or the `implementer` agent runs it for a slice, the branch is already given; skip this step. Read `git.default_branch` and `git.protected_branches` from `project.yml`. If the current branch is a work branch not in `protected_branches`, stay on it. Otherwise create `fix/<slug>` from `git.default_branch`, where the slug is two to four kebab-case words naming the change. If setup left its files uncommitted, commit them on the new branch first as `Set up BoldCreate Toolkit`. If the tree has other uncommitted changes, ask the user whether they belong to this change before switching. Done when the current branch is not protected.

2. **Agree the seams.** A seam is a public interface where a test can observe behaviour without reaching inside: an exported function, a module API, an HTTP endpoint, a command. Propose the seams for this change in a short list and ask the user to confirm. When the change stays inside one existing seam that tests already cover, do not ask; name the seam and its test file in one line. On the implementer path the seams come from the spec; use them as written. Done when the seams are confirmed, named as existing, or taken from the spec.

3. **List behaviours.** Write the behaviours to prove, one line each, in the order you will build them. Start with the simplest useful case. Done when the list covers every acceptance point in the spec or bug report.

4. **Red.** Write one test for the next behaviour on the list. Run the test command. Done when that test fails for the expected reason (an assertion about the missing behaviour, not a syntax or import error).

5. **Green.** Write the least code that makes the test pass. Do not add behaviour no test asks for. Run the test command. Done when the new test and all earlier tests pass.

6. **Repeat.** Go back to step 4 for the next behaviour. Done when every behaviour on the list has a passing test.

7. **Verify.** Run the `verify` skill. Report the tests added and the behaviours they cover. Done when `verify` returns its verdict.

8. **Commit.** On the paths where step 1 applied: when `verify` returned `VERIFIED`, stage only the files of this change and commit once, with a subject that says what the change does for the user. On any other verdict, show the evidence and do not commit until the user decides. Done when `git log -1` shows the commit and `git status` lists no file of this change. On the paths where step 1 applied, start `code-review` now, in the same turn.

## Rules for every test

- Test behaviour through the agreed seam. Do not test private functions or internal state.
- Name each test after the behaviour it proves, in the project's own vocabulary.
- One reason to fail per test.
- Prefer real collaborators. Replace one only when it is slow, non-deterministic or outside the system boundary.
- When a tool rewrites a shared file, such as a solution, project or lock file, read its diff before committing. Keep only the lines this change needs, and keep the file's encoding, byte order mark and line endings as they were.

Read [tests.md](tests.md) when choosing what a test should assert or when a test is hard to write. Read [mocking.md](mocking.md) before replacing any collaborator with a test double.

## Not in this loop

- Refactoring. Note anything worth cleaning up and leave it for the `code-review` skill.
- New behaviour discovered mid-loop. Add it to the list in step 3 if it is in scope; otherwise report it to the user.

If a test cannot be made to fail first because the behaviour already exists, say so, keep the test, and move to the next behaviour.
