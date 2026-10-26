---
name: retro
description: Review the session for improvements to checks, docs and standards, or write a handoff for the next session.
license: MIT
disable-model-invocation: true
---

# Retro

Make the next session cheaper and safer than this one. Two modes:

- **Retro** (default): find what went wrong or cost too much in this session, and fix the environment so it does not happen again.
- **Handoff**: the work is pausing. Follow `handoff.md` in this folder. The `build` skill uses this mode when a milestone stops part way.

Pick handoff when the user says they are stopping, pausing or handing over, or when another skill asks for it. Otherwise run the retro.

## Retro steps

1. **Collect evidence from this session.** Look for: commands that failed and why, review findings, mistakes made more than once, corrections from the user, steps repeated without effect, and the most expensive tool calls. Note each with where it happened (file, command, finding ID). Done when the list is written down.
2. **Name the improvement for each item.** Use one of these types:
   | Type | Example |
   |---|---|
   | Missing check | A defect reached review that a test, lint rule or CI step would have caught |
   | Lesson | A non-obvious fact about this codebase that cost time to learn |
   | Vague standard | A principle or glossary term that two people read two ways |
   | Expensive call | A search, build or agent run that could be narrower or skipped |
   | No-op instruction | A rule or skill step that changed nothing this session |
3. **Prefer a check over a rule.** For each item, propose a deterministic guard first: a test, a lint rule, a CI step, a script, a setting in `project.yml`. Propose written guidance only when no check can catch it.
4. **Rank and show.** Order by severity: something that let a defect through comes first, then repeated work, then cost. Show at most five, each in one or two lines with the change and the file it touches. Ask which to apply. Done when the user has chosen.
5. **Apply the chosen items.**
   - Checks: add them, then run the `verify` skill. Done when `VERIFIED`.
   - Lessons: write `docs/learnings/<yyyy-mm-dd>-<topic>.md` in the format below.
   - Principles: edit `.boldcreate/principles.md` with the wording the user approved.
   - Glossary terms and decision records: run the `domain-docs` skill.
   - No-op instructions in this kit: tell the user which file and line, since kit files are outside the project.
6. **Report** what changed, with file paths, in at most 100 words.

## Learning file

```markdown
# <topic>

- **What happened:** <one or two sentences, with the file or command>
- **Why:** <the cause>
- **Next time:** <the action to take>
- **Guarded by:** <the check that now catches it, or "none">
```

Use the learnings folder from `docs.learnings` in `.boldcreate/project.yml`. Keep each file under 20 lines.

## Rules

- Never write secrets, tokens or customer data into a learning, principle or handoff.
- Change `.boldcreate/principles.md` only with the user's approval of the exact wording.
