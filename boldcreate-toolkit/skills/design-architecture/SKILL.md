---
name: design-architecture
description: Choose a stack and write the architecture for an approved PRD, with decision records and a security review.
license: MIT
disable-model-invocation: true
---

# Design architecture

From an approved PRD, agree a stack, write `docs/architecture/overview.md` with a decision record for each key choice, and pass an architecture review and a security review before the user approves.

Paths below are defaults. When `.boldcreate/project.yml` exists, use its `docs` entries instead.

## Lanes

The PRD header says `Lane: small` for a small application. Then the overview is short, decision records cover only the stack and the data format, and one combined review replaces the separate ones. Without that line, follow the full lane: every step as written.

## Steps

1. **Read the inputs.** Read `docs/product/prd.md`, `GLOSSARY.md`, existing decision records and `.boldcreate/principles.md` if present. If there is no PRD, stop and offer the `define-product` skill. If the PRD names an `Integration branch:`, check that branch out unless you are already on it.

   Done when you can list the must features, the non-functional needs and any constraints the PRD records, and you know the lane.

2. **Propose stacks.** Follow `stack-options.md` in this folder: ask about the team's skills first, then present two or three options with their trade-offs and a recommended choice. Put the choice to the user as one `grilling` question.

   Done when the user has chosen a stack.

3. **Record the stack.** Run the `domain-docs` skill to write a decision record for the stack choice, listing the options that were not chosen and why.

   Done when the decision record exists.

4. **Settle the design.** Run the `grilling` skill on the decisions the overview needs:
   - components and what each one owns;
   - the data model: main entities, their relations and where each is stored;
   - API contracts between components and to the outside, at the level of operations and payload shapes;
   - the security model: who the actors are, how they authenticate, what each may do, and how secrets are stored;
   - hosting: where each component runs, how it is deployed, and the environments.

   Look up anything the PRD, the chosen stack's documentation or the repository already answers instead of asking it. In the small lane, settle only the items this product has; a local tool with no accounts has no authentication to decide.

   Done when grilling ends with no open decision and the user has confirmed.

5. **Write the overview** at `docs/architecture/overview.md` with one section for each item in step 4, in that order, plus a short summary at the top. Use glossary terms. Link each decision record where its choice appears.

   In the small lane, keep each section to a few lines and the whole overview under 500 words. Write "Not applicable" for an item the product does not have.

   Done when every must feature in the PRD maps to at least one component.

6. **Record key choices.** A choice gets a decision record when it is hard to reverse and it affects more than one module or the public interface, such as the data store or data format, the authentication approach, the hosting model or a public API style. Run `domain-docs` for each one in this session.

   In the small lane, write one more record only for the data format or store, if step 3 did not cover it. Mention other choices in the overview alone.

   Done when every choice that meets the bar links to a decision record.

7. **Review.** If the host cannot start agents, say so and stop before the approval gate. Do not review in this session instead.

   Full lane, do both:
   - Run the `review-doc` skill on the overview with the `architecture` lens.
   - Start the `security-reviewer` agent with the overview path, the decision record folder and `.boldcreate/principles.md` if present. Pass paths only.

   Small lane: run the `review-doc` skill once on the overview with the `architecture` lens. Its requirements-fit check reads the PRD, so this one review covers both documents. Start the `security-reviewer` agent as above only when the app stores secrets, accepts input over a network, or has authentication.

   Resolve security findings the same way review-doc resolves its own: apply the fix, keep the text with a stated reason, or put the decision to the user. Run the security reviewer a second time only if round one returned BLOCKING.

   Done when every review that applies has returned and no blocking finding remains unless the user chose to accept it.

8. **Approval gate.** Show the user the overview path, the decision records written, each verdict and any finding still open. Ask for approval.
   - Approved: commit the overview, the decision records and any glossary change as one commit, `Add architecture overview`. Do not push. Hand off to the `plan-slices` skill.
   - Changes requested: apply them, then ask again.

   Done when the user approves the architecture and the commit exists.
