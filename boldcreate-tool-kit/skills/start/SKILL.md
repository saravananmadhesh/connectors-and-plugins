---
name: start
description: Start here. Sizes your request, shows the path the kit will follow, and hands off to the first skill.
license: MIT
disable-model-invocation: true
---

# Start

Classify the request, show the path in one line, let the user change it, then hand off to the first skill of that path.

Most kit skills start only when the user runs them, so the host may refuse to start one for you. Then read `<kit root>/skills/<name>/SKILL.md` and follow it; do not search for the file. The kit root is two levels above this file. In Claude Code, the session-start message also prints it as an absolute path. This applies to every skill this one starts, `setup` included. Running `start` is the user's request to run the skills on the chosen path.

## Steps

1. **Check setup.** Look for `.boldcreate/project.yml`.
   - Missing, and the repository has source code: run the `setup` skill, then continue here.
   - Missing, and there is no source code yet: skip setup. The `scaffold` skill runs it once real commands exist. Use the default thresholds shown in step 2.

   Done when `project.yml` is loaded, or you know the request is on the new-application path.

2. **Classify the request** into exactly one path. Check the rows in order and take the first that matches.

   | Path | Matches when |
   |---|---|
   | New application | The repository has no source code and the user describes a product to build. |
   | Bug | The user reports behaviour that differs from what the code is meant to do, and the report does not already pin down the change. |
   | Quick fix | The change is expected to stay under `thresholds.quick_fix_lines` changed lines (default 100) and touch fewer than `thresholds.quick_fix_core_files` core files (default 3). |
   | Feature | Anything else. |

   Core files are source files that hold behaviour. Tests, docs and configuration do not count.
   Estimate size by reading the code the request touches. If the estimate is near a threshold, or you cannot tell, choose Feature.
   A defect report pins down the change when it names the wrong output and the input or field that causes it, for example "a comma in the customer name adds a CSV column". Such a report within the quick-fix limits is a Quick fix, and the report becomes its first failing test. When in doubt, choose Bug.

   For a new application, also pick the lane. Count the must-have features and the user groups the description names. At most `thresholds.small_app_features` must-have features (default 5) and one user group: small lane. Otherwise, or when you cannot tell: full lane.

   Done when one path, and for a new application one lane, is chosen and you can state the reason in a few words.

3. **Show the path** as a single line, then ask for confirmation in the same message:

   ```
   Path: <name> (<reason>). <skill> → <skill> → ... Reply "go", or name another path.
   ```

   For a new application, name the lane and its counts in the reason, for example `New application, small lane (4 must features, one user group)`, so the user can correct it.
   On the Bug path, do not name a suspected cause or a line of code, here or anywhere before `debug` runs. `debug` must reach the cause from a failing check.

   | Path | Skills in order |
   |---|---|
   | Quick fix | tdd → verify → code-review (standards axis) → ship |
   | Bug | debug → tdd → verify → code-review → ship → retro (optional) |
   | Feature | grilling → write-spec → review-doc → plan-slices → build → ship |
   | New application, full lane | define-product → design-architecture → plan-slices → scaffold → build (per milestone) → ship → report |
   | New application, small lane | define-product (short PRD, no product review) → design-architecture (short, one combined review) → plan-slices → scaffold → build → ship |

   Done when the user accepts the path or names another one. A path or lane the user names wins, even if it disagrees with the thresholds.

4. **Hand off** to the first skill of the chosen path and pass on the user's request unchanged. For a new application, also pass the lane.

   | Path | First skill |
   |---|---|
   | New application | `define-product` |
   | Feature | `grilling` |
   | Bug | `debug` |
   | Quick fix | `tdd` |

   Done when the first skill has started.

5. **Continue the path.** When a skill returns without handing off, start the next skill on the confirmed path, until `ship` has run. Done when `ship` reports or the user stops the work.

## Which skill when

Any skill can also be run on its own. Use this table when the user asks what to run.

| Situation | Skill |
|---|---|
| First use in a repository, or commands changed | `setup` |
| A product idea with no code yet | `define-product` |
| Choose a stack and write the architecture | `design-architecture` |
| Turn an agreed conversation into a feature spec | `write-spec` |
| Get a fresh review of a PRD, architecture or spec | `review-doc` |
| Break a PRD or spec into milestones and slices | `plan-slices` |
| Create the project skeleton and CI | `scaffold` |
| Build the slices of a milestone | `build` |
| Open or update a pull request, answer comments, fix CI | `ship` |
| Drift report, release notes or progress summary | `report` |
| Capture lessons or write a handoff for a fresh session | `retro` |
