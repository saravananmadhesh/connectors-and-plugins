---
name: grilling
description: Interview the user in numbered rounds until every open decision about an idea, feature or design is settled. Use before writing a PRD, architecture or spec, or when a request leaves choices undecided.
license: MIT
---

# Grilling

Turn a vague request into a set of settled decisions. The user decides; you find facts.

## Rules

- Ask only what the user must decide: goals, priorities, trade-offs, scope, naming, acceptable risk.
- Never ask what you can find yourself. Read the code, `GLOSSARY.md`, `docs/adr/`, existing specs and config before each round. If you looked something up, state the fact and move on.
- Look these up instead of asking: Git remotes and their URLs (`git remote -v`), the default branch, the operating system, installed runtime and tool versions, and existing CI files.
- Give every question a recommended answer, phrased so that "yes" accepts it.
- Use glossary terms. When the user introduces a new term, note it for the `domain-docs` skill.

## Steps

1. **Frame the goal.** Write one sentence for what the user wants and why. Put it at the top of the first round's message (step 3) and ask the user to correct it if it is wrong. If they correct it, revisit the decisions the change affects. Done when the sentence is sent.

2. **List open decisions.** Write down every decision that must be made before the work can be specified. For each, note which other decisions it depends on. Keep this list in your working notes, not in a file. Done when no decision you can think of is missing from the list.

3. **Ask a round.** Select every open decision whose prerequisites are already settled. Ask them all in one message, numbered:

   ```
   Round 2

   1. Should signed-out users see the price list?
      Recommended: yes, read-only, so search engines can index it.
   2. Should a cancelled order keep its number?
      Recommended: yes, numbers are never reused.

   Reply "yes" to accept all, or answer by number.
   ```

   Keep each question to one decision. Put a short reason in the recommendation only when the choice is not obvious. Done when the message is sent.

4. **Record answers.** Mark each answered decision as settled with the chosen answer. An answer that raises a new decision adds it to the list. An answer that contradicts an earlier one reopens both; ask about them together in the next round. Done when every answer from the round is recorded.

5. **Repeat.** Go back to step 3 while any decision is open. Done when no open decision remains.

6. **Confirm.** If the user accepted every recommendation unchanged in every round, skip this step: their "yes" is the confirmation. Otherwise show the settled decisions as a numbered list, one line each, and ask the user to confirm or change any line. Done when the user confirms or the step is skipped.

## Output

Return the settled list to the caller and go straight on to the caller's next step. For each decision that is hard to reverse and affects more than one module or the public interface (for example the stack, data format, hosting or security model), tell the caller to record it with the `domain-docs` skill.

Stop early only if the user says so. In that case, list the decisions still open and hand them back with the confirmed ones.
