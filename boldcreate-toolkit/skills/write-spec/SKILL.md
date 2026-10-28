---
name: write-spec
description: Write a feature spec from the conversation so far, without a new interview.
license: MIT
disable-model-invocation: true
---

# Write spec

Turn what the user and agent have already agreed into `docs/specs/<feature-slug>/spec.md`. Do not interview again. The spec is the single source the slice plan and the reviewers work from.

Paths below are defaults. When `.boldcreate/project.yml` exists, use its `docs` entries instead.

## Steps

1. **Find the spec location.**
   - Choose a short kebab-case `<feature-slug>` from the feature name.
   - If `docs/specs/<feature-slug>/spec.md` exists, update it in place.
   - If the repository keeps specs in another layout, follow `other-formats.md` in this folder to read them and decide where this spec goes.

   Done when the target path is fixed and any existing spec for this feature has been read.

2. **Prepare the branch.** Read `git.default_branch` and `git.protected_branches` from `.boldcreate/project.yml`. If the current branch is a work branch not in `protected_branches`, stay on it. Otherwise create `feat/<feature-slug>` from the default branch and check it out. If setup left its files uncommitted, commit them on the new branch first as `Set up BoldCreate Toolkit`. Never write the spec, glossary or decision records on a protected branch.

   Done when you are on a branch that is not protected, before any file is written.

3. **Load the shared terms.** Read `GLOSSARY.md`, the decision records and the PRD if one exists.

   Done when you know which glossary terms and decisions apply to this feature.

4. **Write the spec** from `spec-template.md` in this skill's folder. Fill each section from the conversation:
   - **Problem**: who has it and what it costs them today.
   - **Solution**: what changes for the user, in a few sentences.
   - **User stories**: numbered `US-1`, `US-2` and so on, each with acceptance checks a test can confirm.
   - **Implementation decisions**: the modules involved, what each is responsible for, and the interfaces between them. Name modules and interfaces, not file paths.
   - **Testing decisions**: the seams where tests observe behaviour, and what each seam's tests prove.
   - **Out of scope**: what was discussed and left out.

   Use glossary terms exactly. Do not ask the user new questions. If the conversation left a decision open, write it in the section where it belongs, starting with "Open decision:", so `review-doc` raises it.

   Done when every section is filled and every user story has at least one acceptance check.

5. **Update the domain docs.** Run the `domain-docs` skill to add new terms to the glossary and to write a decision record for each choice the spec makes that meets that skill's bar for a record. Link those records from the spec.

   Done when every new term is in the glossary and every choice that meets the bar links to a decision record.

6. **Hand off.** Show the spec path and the number of user stories, then hand off to the `review-doc` skill with the `spec` lens.

   Done when review-doc has started.
