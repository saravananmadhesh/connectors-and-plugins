# Print

Print the active sheet or entire workbook using `print()`.

## Minimal Angular Code

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template:
  `<ejs-spreadsheet #spreadsheet>
    <e-sheets>
      <e-sheet name="Sheet1"></e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  // Print active sheet (default)
  printSheet(): void {
    this.spreadsheet.print();
  }

  // Print active sheet with options
  printWithOptions(): void {
    this.spreadsheet.print({
      type: 'ActiveSheet',
      allowRowColumnHeader: true,
      allowGridLines: true
    });
  }

  // Print entire workbook
  printWorkbook(): void {
    this.spreadsheet.print({ type: 'Workbook' });
  }
}
```

## API Reference

### print(printOptions?)

| Parameter | Type | Default | Description |
|---|---|---|---|
| `type` | `PrintType` | `'ActiveSheet'` | `'ActiveSheet'` prints active sheet; `'Workbook'` prints all sheets |
| `allowRowColumnHeader` | `boolean` | `false` | Include row/column headers (A, B, C / 1, 2, 3) |
| `allowGridLines` | `boolean` | `false` | Include cell gridlines |

## Notes

- Calling `print()` with no arguments defaults to `{ type: 'ActiveSheet', allowRowColumnHeader: false, allowGridLines: false }`
- Print behavior is browser-dependent; test in the target environment