# Freeze Panes

Freeze rows and columns via `frozenRows` / `frozenColumns` sheet properties, or programmatically using `freezePanes()`.

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
      <e-sheet name="Sales" [frozenRows]="1" [frozenColumns]="1">
        <e-ranges>
          <e-range [dataSource]="data"></e-range>
        </e-ranges>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  data: object[] = [
    { ID: 1, Name: 'Alice', Amount: 500 },
    { ID: 2, Name: 'Bob',   Amount: 300 }
  ];

  // Freeze programmatically
  freeze(): void {
    this.spreadsheet.freezePanes(2, 2);           // active sheet
    this.spreadsheet.freezePanes(1, 1, 'Sales');  // by sheet name
    this.spreadsheet.freezePanes(1, 1, 0);        // by sheet index
  }

  // Unfreeze all
  unfreeze(): void {
    this.spreadsheet.freezePanes(0, 0);
  }
}
```

## API Reference

### Sheet Initialization Properties

| Property | Description | Example |
|---|---|---|
| `[frozenRows]` | Number of rows to freeze from top | `1`, `2` |
| `[frozenColumns]` | Number of columns to freeze from left | `1`, `2` |

### freezePanes(row?, column?, sheet?)

| Parameter | Description | Example |
|---|---|---|
| `row` | Number of rows to freeze | `0`, `1`, `2` |
| `column` | Number of columns to freeze | `0`, `1`, `2` |
| `sheet` | Sheet name or zero-based index — defaults to active sheet | `'Sales'`, `0` |

## Notes

- Set `row` and `column` to `0` to unfreeze all panes
- `[frozenRows]` / `[frozenColumns]` are init-time only; use `freezePanes()` for runtime changes
- Freeze does not affect data export or programmatic cell access