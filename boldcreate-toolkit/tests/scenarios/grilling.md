---
skill: grilling
---
## Setup
A repository with an orders module and a GLOSSARY.md that defines "order" and "customer". No spec exists for discounts.
## Prompt
I want customers to be able to use discount codes at checkout.
## Expected
- The first message restates the goal in one sentence, asks the user to correct it if wrong, and also holds round 1.
- Each round lists only decisions whose prerequisites are settled, numbered, each with a recommended answer that "yes" accepts.
- No question asks for a fact found in the code or GLOSSARY.md, such as how orders are stored.
- A decision that depends on an unanswered one (for example, stacking rules before "one code per order" is settled) is not asked until its prerequisite is answered.
- When the user changed any recommendation, the interview ends with a numbered list of settled decisions and a request to confirm.
- Hard-to-reverse decisions are flagged for a decision record.
- No question asks for the remote name or URL, the default branch, the operating system, installed runtime versions or existing CI files; these are read and stated as facts.
- When the user replies "yes" to every round, no separate confirmation list is sent; the settled decisions go straight back to the caller.
