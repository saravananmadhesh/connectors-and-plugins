# Find & Replace

Search and replace text in the Spreadsheet Editor.

## Minimal Code

```cshtml
@using Syncfusion.EJ2.Spreadsheet

<div class="control-pane">
    <div class="control-section spreadsheet-control">
        <ejs-spreadsheet id="spreadsheet" allowFindAndReplace="true" created="onCreated">
            <e-spreadsheet-sheets>
                <e-spreadsheet-sheet name="Sheet1">
                </e-spreadsheet-sheet>
            </e-spreadsheet-sheets>
        </ejs-spreadsheet>
    </div>
</div>

<script>
    function onCreated() {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];

        // === Find ===
        spreadsheet.find({
            value: 'Jenna Schoolfield',
            sheetIndex: 0,
            findOpt: 'next',
            mode: 'Sheet',
            isCSen: false,
            isEMatch: false,
            searchBy: 'By Row'
        });

        // === Replace ===
        spreadsheet.replace({
            value: 'Jenna Schoolfield',
            replaceValue: 'Jenna S.',
            sheetIndex: 0,
            findOpt: 'next',
            mode: 'Sheet',
            isCSen: false,
            isEMatch: true,
            searchBy: 'By Row'
        });
    }
</script>

```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[FIND_VALUE]` | Text to search for | `'Laptop'`, `'2024'` |
| `[REPLACE_VALUE]` | Text to replace with | `'Notebook'`, `'2025'` |
| `[RANGE]` | Search scope | `'A1:E100'` or empty for all |
| `[MODE]` | Search scope (Sheet/Workbook) | `'Sheet'`, `'Workbook'` |
| `[MATCH_CASE]` | Case-sensitive search | `true`, `false` |
| `[MATCH_ENTIRE_CELL]` | Must match entire cell | `true`, `false` |
| `[SEARCH_BY]` | Search by row or column | `'ByRow'`, `'ByColumn'` |

## Notes

- **Best Practice**: Use Find first to preview matches before Replace All
- **Best Practice**: Backup spreadsheet before Replace All on large ranges
- **Case Sensitivity**: Default false (case-insensitive)
- **Entire Cell**: If true, 'Laptop' won't match 'My Laptop' (must be exact)
- **Regex**: Standard regex patterns not supported (literal string matching only)
- **Performance**: Replace All on large ranges (100k+ cells) may pause UI
- **Undo**: Replace operations can be undone with Ctrl+Z
- **Gotcha**: Replace in formulas replaces formula text, not results
- **Gotcha**: 'Entire Cell' option applies to both find and replace

## Placeholders
| Placeholder | Description | Example |
|---|---|---|
| [FIND_VALUE] | Text to search for | 'Laptop' |
| [REPLACE_VALUE] | Text to replace with | 'Notebook' |
| [RANGE] | Search scope | 'A1:E100' |
| [MODE] | Search mode | 'Sheet', 'Workbook' |
| [MATCH_CASE] | Case-sensitive | true, false |

## Notes
- Best Practice: Use Find first to preview matches
- Case Sensitivity: Default false
- Regex: Literal string matching only
- Gotcha: Replaces in formulas too (formula text)
