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

1. **Agree the seams.** A seam is a public interface where a test can observe behaviour without reaching inside: an exported function, a module API, an HTTP endpoint, a command. Propose the seams for this change in a short list and ask the user to confirm. On the implementer path the seams come from the spec; use them as written. Done when the seams are confirmed or taken from the spec.

2. **List behaviours.** Write the behaviours to prove, one line each, in the order you will build them. Start with the simplest useful case. Done when the list covers every acceptance point in the spec or bug report.

3. **Red.** Write one test for the next behaviour on the list. Run the test command. Done when that test fails for the expected reason (an assertion about the missing behaviour, not a syntax or import error).

4. **Green.** Write the least code that makes the test pass. Do not add behaviour no test asks for. Run the test command. Done when the new test and all earlier tests pass.

5. **Repeat.** Go back to step 3 for the next behaviour. Done when every behaviour on the list has a passing test.

6. **Hand off.** Run the `verify` skill. Report the tests added and the behaviours they cover. Done when `verify` returns its verdict.

## Rules for every test

- Test behaviour through the agreed seam. Do not test private functions or internal state.
- Name each test after the behaviour it proves, in the project's own vocabulary.
- One reason to fail per test.
- Prefer real collaborators. Replace one only when it is slow, non-deterministic or outside the system boundary.

Read [tests.md](tests.md) when choosing what a test should assert or when a test is hard to write. Read [mocking.md](mocking.md) before replacing any collaborator with a test double.

## Not in this loop

- Refactoring. Note anything worth cleaning up and leave it for the `code-review` skill.
- New behaviour discovered mid-loop. Add it to the list in step 2 if it is in scope; otherwise report it to the user.

If a test cannot be made to fail first because the behaviour already exists, say so, keep the test, and move to the next behaviour.
