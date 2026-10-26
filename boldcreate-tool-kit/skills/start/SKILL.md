---
name: start
description: Start here. Sizes your request, shows the path the kit will follow, and hands off to the first skill.
license: MIT
disable-model-invocation: true
---

# Start

Classify the request, show the path in one line, let the user change it, then hand off to the first skill of that path.

## Steps

1. **Check setup.** Look for `.boldcreate/project.yml`.
   - Missing, and the repository has source code: run the `setup` skill, then continue here.
   - Missing, and there is no source code yet: skip setup. The `scaffold` skill runs it once real commands exist. Use the default thresholds shown in step 2.

   Done when `project.yml` is loaded, or you know the request is on the new-application path.

2. **Classify the request** into exactly one path. Check the rows in order and take the first that matches.

   | Path | Matches when |
   |---|---|
   | New application | The repository has no source code and the user describes a product to build. |
   | Bug | The user reports behaviour that differs from what the code is meant to do. |
   | Quick fix | The change is expected to stay under `thresholds.quick_fix_lines` changed lines (default 100) and touch fewer than `thresholds.quick_fix_core_files` core files (default 3). |
   | Feature | Anything else. |

   Core files are source files that hold behaviour. Tests, docs and configuration do not count.
   Estimate size by reading the code the request touches. If the estimate is near a threshold, or you cannot tell, choose Feature.

   Done when one path is chosen and you can state the reason in a few words.

3. **Show the path** as a single line, then ask for confirmation in the same message:

   ```
   Path: <name> (<reason>). <skill> → <skill> → ... Reply "go", or name another path.
   ```

   | Path | Skills in order |
   |---|---|
   | Quick fix | tdd → verify → code-review (standards axis) → ship |
   | Bug | debug → tdd → verify → code-review → ship → retro (optional) |
   | Feature | grilling → write-spec → review-doc → plan-slices → build → ship |
   | New application | define-product → design-architecture → plan-slices → scaffold → build (per milestone) → ship → report |

   Done when the user accepts the path or names another one. A path the user names wins, even if it disagrees with the thresholds.

4. **Hand off** to the first skill of the chosen path and pass on the user's request unchanged.

   | Path | First skill |
   |---|---|
   | New application | `define-product` |
   | Feature | `grilling` |
   | Bug | `debug` |
   | Quick fix | `tdd` |

   Done when the first skill has started.

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
