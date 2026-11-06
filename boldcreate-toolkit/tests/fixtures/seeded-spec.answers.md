# Answer key: seeded-spec.md

`seeded-spec.md` is a short feature spec with 10 known defects. It is used for acceptance criterion AC-4: the `review-doc` skill, run with the `spec` lens, must catch at least 7 of the 10.

## How to score

1. Run the `review-doc` skill on `tests/fixtures/seeded-spec.md` with the `spec` lens. Record the result for one reviewer pass, then for two passes.
2. Count a defect as caught when a finding points to the same section and names the same problem. The finding's severity and fix wording do not need to match.
3. Findings that match no defect below are not scored. Record them, since they may show a gap in this key.
4. The run passes with 7 or more defects caught. Ship the cheaper setup (one pass or two) that passes.

## Defects

| # | Location | Defect | Expected severity |
|---|---|---|---|
| 1 | US-2 and Implementation decisions | A held copy waits 3 days in US-2, but `expireHolds` expires holds after 5 days. | blocking |
| 2 | US-2 and Out of scope | US-2 sends an email to the member, but email notifications are listed as out of scope. | blocking |
| 3 | Problem and User stories | The problem says members need to cancel a hold, but no story covers cancelling, and it is not out of scope. | blocking |
| 4 | US-3 | The desk list shows members' full names and phone numbers on the public catalogue page, with no access control. | blocking |
| 5 | US-4 | "Premium patron tier" is used but never defined, and nothing says how a member gets it. | major |
| 6 | US-1 | "Search for a title to hold should be fast" has no number or check, so it cannot be tested. | major |
| 7 | US-1 | No behaviour is given for a member who already holds 5 titles, or who places a second hold on the same title. | major |
| 8 | Implementation decisions | The spec names a file path, `src/holds/HoldQueueService.ts`, where it should name only modules and interfaces. | minor |
| 9 | Testing decisions | Expiry is tested by reading the `holds` table, not through the module's public seam. | major |
| 10 | US-2 and Implementation decisions | "Last day to collect" and "midnight" do not say which time zone applies, and whether day 3 ends at the start or end of that day. | minor |
