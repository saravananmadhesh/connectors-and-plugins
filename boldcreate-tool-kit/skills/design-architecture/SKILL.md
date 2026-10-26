---
name: design-architecture
description: Choose a stack and write the architecture for an approved PRD, with decision records and a security review.
license: MIT
disable-model-invocation: true
---

# Design architecture

From an approved PRD, agree a stack, write `docs/architecture/overview.md` with a decision record for each key choice, and pass an architecture review and a security review before the user approves.

Paths below are defaults. When `.boldcreate/project.yml` exists, use its `docs` entries instead.

## Steps

1. **Read the inputs.** Read `docs/product/prd.md`, `GLOSSARY.md`, existing decision records and `.boldcreate/principles.md` if present. If there is no PRD, stop and offer the `define-product` skill.

   Done when you can list the must features, the non-functional needs and any constraints the PRD records.

2. **Propose stacks.** Follow `stack-options.md` in this folder to present two or three options with their trade-offs and a recommended choice. Put the choice to the user as one `grilling` question.

   Done when the user has chosen a stack.

3. **Record the stack.** Run the `domain-docs` skill to write a decision record for the stack choice, listing the options that were not chosen and why.

   Done when the decision record exists.

4. **Settle the design.** Run the `grilling` skill on the decisions the overview needs:
   - components and what each one owns;
   - the data model: main entities, their relations and where each is stored;
   - API contracts between components and to the outside, at the level of operations and payload shapes;
   - the security model: who the actors are, how they authenticate, what each may do, and how secrets are stored;
   - hosting: where each component runs, how it is deployed, and the environments.

   Look up anything the PRD, the chosen stack's documentation or the repository already answers instead of asking it.

   Done when grilling ends with no open decision and the user has confirmed.

5. **Write the overview** at `docs/architecture/overview.md` with one section for each item in step 4, in that order, plus a short summary at the top. Use glossary terms. Link each decision record where its choice appears.

   Done when every must feature in the PRD maps to at least one component.

6. **Record key choices.** For every choice that is hard to reverse (data store, authentication approach, hosting model, a public API style), run `domain-docs` to write a decision record in this session.

   Done when every hard-to-reverse choice in the overview links to a decision record.

7. **Review.** Do both:
   - Run the `review-doc` skill on the overview with the `architecture` lens.
   - Start the `security-reviewer` agent with the overview path, the decision record folder and `.boldcreate/principles.md` if present. Pass paths only.

   If the host cannot start agents, say so and stop before the approval gate. Do not review in this session instead.
   Resolve security findings the same way review-doc resolves its own: apply the fix, keep the text with a stated reason, or put the decision to the user. Run the security reviewer a second time only if round one returned BLOCKING.

   Done when both reviews have returned and no blocking finding remains unless the user chose to accept it.

8. **Approval gate.** Show the user the overview path, the decision records written, both verdicts and any finding still open. Ask for approval.
   - Approved: hand off to the `plan-slices` skill.
   - Changes requested: apply them, then ask again.

   Done when the user approves the architecture.
