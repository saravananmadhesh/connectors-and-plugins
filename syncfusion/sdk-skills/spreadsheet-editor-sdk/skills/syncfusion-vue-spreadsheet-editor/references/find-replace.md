# Find & Replace

Search and replace text in the Spreadsheet Editor.

## Minimal Code

```vue
<template>
<div class="control-section">
  <ejs-spreadsheet ref="spreadsheet" :allowFindAndReplace="true" :created="onCreated">
    <e-sheets>
      <e-sheet name="Sheet1">
        <e-ranges><e-range :dataSource="data" /></e-ranges>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>
</div>
</template>

<script>
import { SpreadsheetComponent, SheetsDirective, SheetDirective, RangesDirective, RangeDirective } 
from "@syncfusion/ej2-vue-spreadsheet";

export default {
components: {
  "ejs-spreadsheet": SpreadsheetComponent, "e-sheets": SheetsDirective,
  "e-sheet": SheetDirective, "e-ranges": RangesDirective, "e-range": RangeDirective,
},

data: () => ({
  data: [
    { Name:"John Carter", Dept:"Sales", Salary:52000, Status:"Active" },
    { Name:"Emily Watson", Dept:"Finance", Salary:61000, Status:"Active" },
    { Name:"Michael Brown", Dept:"IT", Salary:72000, Status:"Active" },
    { Name:"Jenna Schoolfield", Dept:"Marketing", Salary:58000, Status:"Active" },
    { Name:"Liam Johnson", Dept:"Support", Salary:43000, Status:"Active" },
    { Name:"Sophia Lee", Dept:"HR", Salary:55000, Status:"Active" },
    { Name:"Daniel Reed", Dept:"Sales", Salary:50000, Status:"Active" },
    { Name:"Ella Carter", Dept:"Finance", Salary:60000, Status:"Active" },
    { Name:"Henry Adams", Dept:"IT", Salary:68000, Status:"Active" },
    { Name:"Olivia Parker", Dept:"Support", Salary:45000, Status:"Inactive" },
    { Name:"Jason Clarke", Dept:"Logistics", Salary:47000, Status:"Active" }
  ]
}),

methods: {
  onCreated() {
    const s = this.$refs.spreadsheet;
    s.find({ value:"Jenna Schoolfield", sheetIndex:0, findOpt:"next", mode:"Sheet", searchBy:"By Row" });
    s.replace({ value:"John Carter", replaceValue:"Issy Humm", sheetIndex:0, replaceBy:"replace", findOpt:"next", mode:"Sheet", searchBy:"By Row" });
  }
}
};
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