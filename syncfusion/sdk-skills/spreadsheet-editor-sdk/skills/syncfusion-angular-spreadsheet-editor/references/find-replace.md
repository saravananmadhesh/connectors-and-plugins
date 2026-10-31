# Find & Replace

Search(Find) and replace text in the Spreadsheet Editor.

## Minimal Code

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template:
  `<ejs-spreadsheet #spreadsheet [allowFindAndReplace]="true">
    <e-sheets>
      <e-sheet name="Students"></e-sheet>
    </e-sheets>
  </ejs-spreadsheet>

  <button (click)="findText()">Find</button>
  <button (click)="replaceText()">Replace</button>`
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  // === Find ===
  findText(): void {
    this.spreadsheet.find({
      value: 'Jenna Schoolfield',
      sheetIndex: 0,
      findOpt: 'next',
      mode: 'Sheet',
      isCSen: false,
      isEMatch: false,
      searchBy: 'By Row'
    });
  }

  // === Replace ===
  replaceText(): void {
    this.spreadsheet.replace({
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
}
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `value` | `FindOptions.value` — text to search for | `'Laptop'`, `'2024'` |
| `replaceValue` | `FindOptions.replaceValue` — text to replace with (used in `replace()` only) | `'Notebook'`, `'2025'` |
| `sheetIndex` | `FindOptions.sheetIndex` — zero-based index of the sheet to search | `0`, `1` |
| `findOpt` | `FindOptions.findOpt` — search direction | `'next'`, `'prev'` |
| `mode` | `FindOptions.mode` — search scope | `'Sheet'`, `'Workbook'` |
| `isCSen` | `FindOptions.isCSen` — case-sensitive search | `true`, `false` |
| `isEMatch` | `FindOptions.isEMatch` — match entire cell content only | `true`, `false` |
| `searchBy` | `FindOptions.searchBy` — search direction order | `'By Row'`, `'By Column'` |

## Notes

- **Best Practice**: Use `find()` first to preview matches before calling `replace()`
- **Case Sensitivity**: `isCSen` defaults to `false` (case-insensitive)
- **Entire Cell**: If `isEMatch: true`, `'Laptop'` won't match `'My Laptop'`
- **Regex**: Standard regex patterns not supported — literal string matching only
- **Gotcha**: Replace operates on formula text, not formula results
- **Gotcha**: Replace operations can be undone with `Ctrl+Z`
- **Angular Tip**: Use `@ViewChild` to access spreadsheet instance after view initialization