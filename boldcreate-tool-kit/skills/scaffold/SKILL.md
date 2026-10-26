---
name: scaffold
description: Create the starting repository for a new application, with build, test, lint, CI and project settings.
license: MIT
disable-model-invocation: true
---

# Scaffold

Turn an approved architecture into a repository that builds and passes its tests, so the first milestone can start from working ground.

## Before you start

- `docs/architecture/overview.md` exists, the user approved it, and a decision record in `docs/adr/` names the stack. If not, stop and run the `design-architecture` skill.
- `docs/product/roadmap.md` lists milestone 1. If not, stop and run the `plan-slices` skill.
- Confirm in one line: the stack, the project root folder, and the Git host (`github` or `gitlab`).

## Steps

1. **Generate the skeleton.** Use the stack's official project generator or init command where one exists, so the layout matches what that ecosystem expects. Use the versions the decision records name; otherwise the current stable release. Show each command before you run it. Done when the generator exits 0.
2. **Add build, test and lint.** Use the stack's standard tools. Write one sample test that calls a real public function through its interface and checks its result. Done when the build, test and lint commands each run from the command line.
3. **Ignore generated and local files.** Add a `.gitignore` for build output, dependency folders and local environment files. If the app needs configuration, commit an example file with placeholder values only; real values come from the environment. Done when `git status` shows no build output or secrets.
4. **Write README.md.** One paragraph from the PRD on what the app does, then how to build, test, lint and run it. List only commands you ran in step 2. Done when every command in the README works.
5. **Record the project settings.** Run the `setup` skill. It reads the real commands and writes `.boldcreate/project.yml` and `.boldcreate/principles.md`. Files that already exist, such as the glossary, keep their content; setup only adds what is missing. Done when `project.yml` has `build` and `test` commands.
6. **Create CI.** Follow `ci.md` in this folder. Done when the CI file exists and every command in it matches `project.yml`.
7. **Verify.** Run the `verify` skill. The gate is `VERIFIED`. On `NOT VERIFIED`, fix the cause and run it again. After two failed attempts, show the evidence and ask the user how to proceed.
8. **Commit.** Create the integration branch `feat/<slug>` for milestone 1, where `<slug>` comes from the product name in the PRD. If the repository has no commits yet, first commit a minimal default branch (README only) so the integration branch has a base. Commit the scaffold on it as one commit, `Scaffold <stack> project`. Do not push; the `ship` skill does that.
9. **Preview deployment (optional).** Ask whether the user wants a preview deployment. Only on a yes, follow `preview-deploy.md` in this folder.

## Gate

Show the user:

- the files created, grouped by purpose (code, tests, CI, docs, settings)
- the `verify` verdict with its evidence
- the CI file path and the jobs it runs
- the preview URL, if one was created

Wait for approval. On approval, hand off to the `build` skill for milestone 1.

## Safety

- Never push to a protected branch, force-push, or deploy without the user's confirmation in this session.
- Never write a real credential to any file. CI reads secrets from the Git host's secret store.
