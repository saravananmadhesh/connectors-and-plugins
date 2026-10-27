# BoldCreate-tool-kit

Syncfusion's BoldCreate plugin that gives AI coding agents one software delivery lifecycle: idea, specification, build, test, review, release and maintenance.

The kit is a set of skills, agents and rules. It has no MCP server and calls no outside service except `git` and your Git host's command-line tool. It works with any language that has a command-line build and test, because it reads the project's own commands instead of assuming a stack.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **BoldCreate-tool-kit**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **BoldCreate-tool-kit**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install boldcreate-tool-kit@boldcreate-plugins`.

You also need:

- `git`.
- The GitHub CLI (`gh`), signed in, to open pull requests and read CI checks. GitHub is the default Git host. To use GitLab instead, set `git.host: gitlab` in `.boldcreate/project.yml` and install `glab`. For any other host, set `git.host: other`; the kit pushes one branch, gives you pull request text ready to paste, and asks before pushing more than one branch.
- A host that runs subagents for the reviewer and implementer agents. Where a host cannot, the reviewer steps stop and say so instead of reviewing in the main session.

## Get started

Run the `start` skill and describe what you want. In Cursor, type `/start`. In Claude Code, type `/boldcreate-tool-kit:start`.

In Claude Code, the agent cannot start the skills marked "You" below by itself. When a path reaches one, it reads that skill's `SKILL.md` from the kit folder and follows it; the session-start hook prints that folder as `Kit root: <path>`. If Claude Code asks before each read, allow reads of installed plugins in `~/.claude/settings.json`:

```json
{ "permissions": { "allow": ["Read(~/.claude/plugins/cache/**)"] } }
```

Claude Code runs the implementer agents in the background, where they cannot ask you for permission, so a command you have not allowed is refused. Allow `git` and the commands saved in `.boldcreate/project.yml` in the project's `.claude/settings.json`, for example `"Bash(git:*)"` and `"Bash(<test tool>:*)"`. When a slice is still refused, `build` names the command to allow and builds that slice in the main session.

`start` sorts the request into one of four paths, shows the path in one line, and lets you change it. On first use it runs `setup`, which detects your build, test, lint and run commands and saves them to `.boldcreate/project.yml`. Every skill can also be run on its own.

| Path | When | Skills in order |
| --- | --- | --- |
| Quick fix | Under the size threshold in `project.yml` (default: under 100 lines and under 3 core files), including a defect report that already names what to change | `start`, `tdd`, `verify`, `code-review`, `ship` |
| Bug | A reported defect whose cause is not yet known | `start`, `debug`, `tdd`, `verify`, `code-review`, `ship`, then `retro` if you want it |
| Feature | Over the size threshold | `start`, `grilling`, `write-spec`, `review-doc`, `plan-slices`, `build`, `ship` |
| New application | No code yet | `start`, `define-product`, `design-architecture`, `plan-slices`, `scaffold`, `build` for each milestone, `ship`, `report` |
| New application, small lane | No code yet, at most `thresholds.small_app_features` must-have features (default 5) and one user group | The same skills, with a short PRD, a short architecture with decision records only for the stack and data format, and one combined review |

You approve every gate: specs, the plan, each milestone, merges and releases. The kit never pushes to a protected branch, force-pushes, merges, deletes a branch, releases or deploys without your confirmation in the same session, and it never prints or commits secrets.

## Skills

The agent can start the first six on its own when a request matches. Only their short descriptions stay in context on every turn. The other twelve start only when you run them by name, so they cost nothing until then.

| Skill | Starts | What it does |
| --- | --- | --- |
| `grilling` | Agent or you | Interviews you in rounds until every open decision is settled. Each question comes with a recommended answer, and the agent looks up facts itself. |
| `tdd` | Agent or you | Builds test-first at agreed seams: one failing test, the least code to pass it, repeat. |
| `debug` | Agent or you | Builds a loop that fails on the bug before forming any theory, then fixes it and keeps the loop as a regression test. |
| `verify` | Agent or you | Runs the saved build, type-check, lint and test commands and returns `VERIFIED`, `NOT VERIFIED` or `INCONCLUSIVE` with the evidence. |
| `code-review` | Agent or you | Reviews a diff on two separate axes, standards and spec, and adds a security pass when the diff touches secrets, input handling or auth. |
| `domain-docs` | Agent or you | Keeps the project glossary and decision records short and current. |
| `start` | You | Sorts a request into a path and lists which skill fits which situation. |
| `setup` | You | Detects project commands and writes `.boldcreate/project.yml`, the principles file and the glossary skeleton. |
| `define-product` | You | Interviews you and writes the product requirements, then runs one product review. |
| `design-architecture` | You | Proposes two or three stack options, writes the architecture with a decision record per key choice, and runs architecture and security reviews. |
| `write-spec` | You | Turns the conversation into a feature spec without a second interview. |
| `review-doc` | You | Has a fresh reviewer check a document, then resolves the findings with you, in at most two rounds. |
| `plan-slices` | You | Breaks a spec or product plan into milestones and thin end-to-end slices with the order they must follow. |
| `scaffold` | You | Creates the project skeleton and CI for the chosen stack, and checks that it builds and its tests pass. |
| `build` | You | Builds ready slices with implementer agents, merges each as one commit, and reviews the whole milestone before the next one. |
| `ship` | You | Opens or updates the pull request, answers review comments, resolves conflicts and fixes failing CI. |
| `report` | You | Writes a drift report between docs and code, release notes, or a progress summary. |
| `retro` | You | Suggests improvements to the agent's setup, records lessons, and writes a handoff file for the next session. |

## Agents

Reviewer agents start with no chat history and never edit files. They receive file paths, IDs and commit ranges, read the code themselves, and return a report of at most 400 words with a verdict of `BLOCKING`, `CHANGES` or `CLEAN`. Reports use paths relative to the repository and list at most five reviewed files; that list does not count toward the limit. The implementer's report follows the same rules with a 300-word limit.

Every agent file sets `model: inherit`. Where the host lets the caller choose an agent's model, the skills start `standards-reviewer` and `spec-reviewer` on a smaller model (in Claude Code, `sonnet`). `implementer`, `doc-reviewer` and `security-reviewer` use the session's model.

| Agent | What it does | Used by |
| --- | --- | --- |
| `doc-reviewer` | Reviews product requirements, an architecture or a spec, using a checklist file for that document type. | `review-doc` |
| `standards-reviewer` | Checks a diff against the repository's standards, the team principles, common code smells and leftover clutter. | `code-review` |
| `spec-reviewer` | Checks code against the spec for missing, wrong or unrequested behaviour. In milestone reviews it also checks the validation and data rules in the architecture and decision records. | `code-review`, `build`, `report` |
| `security-reviewer` | Looks for exposed secrets, injection, auth and access gaps, vulnerable dependencies and architecture threats. | `code-review`, `design-architecture` |
| `implementer` | Builds one slice test-first on its own branch, reading only the spec sections and files that slice needs, and reports what changed. It does not push. | `build` |

## Rules

| Rule | Applies | What it says |
| --- | --- | --- |
| `team-principles` | Always | Follow `.boldcreate/principles.md` and flag any conflict with it. |
| `verify-before-done` | Always | Report work as done only with a passing build or test run, or stated evidence. |
| `no-secrets` | Always | Keep keys, tokens and passwords out of code, logs, commits and docs. |
| `plain-english-docs` | Markdown files | Write short, direct sentences and explain how things work. |

Claude Code has no rule component. There, a session-start hook loads the three always-on rules from `instructions.md` and prints the kit folder.

## Files the kit creates in your project

| Path | Written by | Purpose |
| --- | --- | --- |
| `.boldcreate/project.yml` | `setup`, `scaffold` | Commands, size thresholds, Git host and doc locations |
| `.boldcreate/principles.md` | `setup` | Team principles that every review checks |
| `.boldcreate/.gitignore` | `setup` | Keeps the kit's one-session files below out of Git |
| `.boldcreate/handoff.md` | `retro` | Where a new session should pick up; not committed |
| `.boldcreate/review-M<n>.md` | `build` | Milestone review findings for the fix run; not committed |
| `.boldcreate/bugs/<slug>.md` | `debug` | The bug report a fix is reviewed against; not committed |
| `.boldcreate/pr-<branch>.md` | `ship` | Pull request text to paste, on hosts with no pull request tool; not committed |
| `GLOSSARY.md` | `domain-docs` | Project terms, one line each |
| `docs/adr/NNNN-<title>.md` | `domain-docs` | Decision records |
| `docs/product/prd.md` | `define-product` | Product requirements |
| `docs/product/roadmap.md` | `plan-slices`, `build` | Milestones, slices and their status |
| `docs/architecture/overview.md` | `design-architecture` | Architecture |
| `docs/specs/<feature>/spec.md` | `write-spec` | Feature spec |
| `docs/learnings/<date>-<topic>.md` | `retro` | Lessons learned |
| `docs/reports/` | `report` | Drift reports, release notes and progress summaries |

Commit the other files so that the whole team and every new session share them. `setup` commits its own files as `Set up BoldCreate tool kit`, on the first work branch when you start on a protected branch, and reviews leave that commit out. If a command in `project.yml` is missing or fails, the kit asks you for it instead of guessing.

## Context budget

The kit is built to spend as few tokens as the work allows, and CI checks these limits on every change:

- The six automatic skill descriptions, the five agent descriptions and the always-on rules together stay under 600 tokens, and each skill description is at most 40 words.
- Each `SKILL.md` is at most 150 lines. Steps that only some runs need live in sibling files that load on demand.
- Each agent file is at most 80 lines.
- Every skill has a scenario file in `tests/scenarios/`.

## Credits

The kit's text is original. These projects shaped its methods, and we thank their authors:

| Project | License | Ideas used |
| --- | --- | --- |
| Matt Pocock's skills | MIT | Interview rounds, automatic and manual skills, writing for agents, test-first at seams, loop-first debugging, two-axis review, vertical slices, glossary and decision records, retrospectives, handoff, a router skill |
| Cursor Team Kit | MIT | Pull request, review comment, merge conflict and CI skills; plugin layout |
| Superpowers | MIT | Verify before done, systematic debugging, a fresh subagent per unit of work |
| Elephant-Goldfish Model (Google) | Apache-2.0 | A main session paired with fresh reviewers, the review and resolve loop, drift reports |
| GitHub Spec Kit | MIT | A team principles file; a spec format the kit can read |
| OpenSpec | MIT | A change proposal format the kit can read |
| cc-sdd | MIT | Spec format and dependency waves |
| Agent OS | MIT | Finding standards in an existing codebase |
| BMAD Method | MIT | The order for new applications: product brief, requirements, architecture, then stories |
| Compound Engineering plugin | MIT | Capturing lessons after each fix |

## License

MIT
