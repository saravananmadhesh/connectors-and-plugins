---
name: review-doc
description: Get a fresh review of a PRD, architecture document or spec, then resolve the findings.
license: MIT
disable-model-invocation: true
---

# Review doc

Have a reviewer with no memory of this conversation check one document, resolve each finding in this session, and stop after at most two rounds. Return the result to the skill that called this one.

## Inputs

- The document path.
- The lens. Use the one the caller names. Otherwise pick it from the path:

  | Document | Lens |
  |---|---|
  | `docs/product/` (PRD) | `product` |
  | `docs/architecture/` | `architecture` |
  | `docs/specs/` | `spec` |
  | Any document the user wants checked against the code | `fact-check` |

  Lens files live in this kit's `lenses/` folder, two levels above this file.

## Steps

1. **Check the host.** If the host cannot start agents, say so and stop. Do not review the document in this session instead.

   Done when you know agents can be started.

2. **Size the round.** Count the words in the document. Read `thresholds.large_doc_words` from `.boldcreate/project.yml` (default 2500).
   - At or under the threshold: one pass, focused on clarity and readiness.
   - Over the threshold: two independent passes in parallel, one on clarity and readiness and one on design and complexity.

   Done when the number of passes for round 1 is fixed.

3. **Run the reviewers.** Start one `doc-reviewer` agent per pass. Give each only:
   - the document path;
   - the lens file path;
   - `.boldcreate/principles.md`, if it exists;
   - the pass focus: `clarity and readiness` or `design and complexity`.

   Never paste the document or an earlier report into the request.
   Each reviewer returns a verdict (`BLOCKING`, `CHANGES` or `CLEAN`) and a finding table with IDs `D1`, `D2` and so on. When two passes ran, renumber the second pass's findings to follow the first, and take the stricter verdict.

   Done when every reviewer has returned a report in that format.

4. **Resolve every finding** in this session. For each one choose exactly one action:
   - **Fix**: apply the proposed fix or a better one.
   - **Keep**: leave the text as it is and write the reason in one sentence.
   - **Ask**: the finding needs a decision only the user can make.

   Collect all Ask findings and run the `grilling` skill on those alone, then apply the answers.
   Keep a resolution table: `| ID | Action | Note |`.

   Done when every finding has an action and the document reflects every Fix and every answer.

5. **Decide on round 2.**
   - Round 1 verdict `CLEAN` or `CHANGES`: stop. The fixes are not reviewed again.
   - Round 1 verdict `BLOCKING`: run round 2 on the updated document with two independent passes, one per focus, as in step 3. Drop any round 2 finding that repeats a round 1 finding marked Keep, unless it brings new evidence. Resolve the rest as in step 4.

   Done when either round 1 ended without a blocker, or round 2 is resolved.

6. **Stop after round 2.** Never start a third round. If a blocking finding is still open, list it for the user with its quote and proposed fix, and let the user decide: accept the risk, give the fix, or stop the work.

   Done when no blocking finding remains open without a user decision.

7. **Return.** Give the caller, or the user if review-doc ran alone:
   - the document path;
   - the final verdict;
   - the resolution table;
   - any finding the user accepted as open.

   Do not save reviewer reports to files unless the user asks. On the feature path, ask the user to approve the spec. On approval, set its status to `Approved`, commit the spec, the glossary and any decision records as one commit, `Add <feature> spec`, then hand off to the `plan-slices` skill. Without approval, apply the requested changes and ask again.

   Done when the summary is shown and the next skill, if any, has started.
