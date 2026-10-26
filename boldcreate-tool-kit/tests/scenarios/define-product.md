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
