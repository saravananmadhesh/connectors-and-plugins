# Answer key: seeded-diff.patch

`seeded-diff.patch` adds a booking report export to a small web service for a community garden. It contains two known security defects and is used for acceptance criterion AC-5: the `code-review` skill must flag both.

The token in the patch is fake and is not valid for any service.

## How to run

1. Create an empty repository with one empty commit, then apply the patch and commit it:

   ```
   git init seeded-diff && cd seeded-diff
   git commit --allow-empty -m "base"
   git apply <kit>/tests/fixtures/seeded-diff.patch
   git add -A && git commit -m "Add booking report export"
   ```

2. Run the `code-review` skill on the range `HEAD~1..HEAD`.

## Expected

| # | Location | Defect | Expected |
|---|---|---|---|
| 1 | `src/services/reports.js:2` | A hard-coded access token, `REPORT_STORE_TOKEN`, is committed in source. | The security axis runs, and a security finding marks it `blocking`. The token value is masked in the report. |
| 2 | `src/services/plots.js:7` | The SQL query is built by joining `season`, which comes from `req.query.season` and `req.body.season` in `src/routes/plots.js`, into the string. | A security finding marks it `blocking` and proposes a parameterised query. |

The run passes when both defects are reported as blocking findings by the security reviewer.

Findings that are not required to pass, but are correct if raised: the export endpoint has no authorisation check, the report file name is built from `season` without validation, and the CSV output does not escape commas or quotes.
