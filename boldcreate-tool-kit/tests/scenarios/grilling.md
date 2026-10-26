---
skill: grilling
---
## Setup
A repository with an orders module and a GLOSSARY.md that defines "order" and "customer". No spec exists for discounts.
## Prompt
I want customers to be able to use discount codes at checkout.
## Expected
- The first message restates the goal in one sentence and asks the user to confirm it.
- Each round lists only decisions whose prerequisites are settled, numbered, each with a recommended answer that "yes" accepts.
- No question asks for a fact found in the code or GLOSSARY.md, such as how orders are stored.
- A decision that depends on an unanswered one (for example, stacking rules before "one code per order" is settled) is not asked until its prerequisite is answered.
- The interview ends with a numbered list of settled decisions and a request to confirm.
- Hard-to-reverse decisions are flagged for a decision record.
