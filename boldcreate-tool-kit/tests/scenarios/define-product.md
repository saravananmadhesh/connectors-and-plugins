---
skill: define-product
---
## Setup
An empty repository with no source code and no docs/ folder.
## Prompt
/define-product A booking app for small yoga studios: members book classes, studio owners manage the timetable and see attendance.
## Expected
- Questions come in numbered rounds, each with a recommended answer; no question asks about language or framework.
- GLOSSARY.md and docs/adr/ are created before the PRD is written.
- docs/product/prd.md lists user groups, problems, features with a MoSCoW priority, non-functional needs, success measures with targets, and an MVP made of Must features by ID.
- review-doc runs once with the product lens before the user is asked to approve.
- design-architecture starts only after the user approves the PRD.
- Before the PRD is written, the work is on a new feat/<slug> branch made from the default branch, and the PRD header names it on an "Integration branch:" line.
- After approval, the PRD, GLOSSARY.md and any decision records are committed as one commit and nothing is pushed.
- Given the small lane instead (one user group, 4 must features), the PRD has a "Lane: small" line, stays under 400 words, and review-doc does not run.
