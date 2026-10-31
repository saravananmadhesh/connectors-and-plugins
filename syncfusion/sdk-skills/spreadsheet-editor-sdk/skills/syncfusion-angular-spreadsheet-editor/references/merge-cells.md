# Merge & Unmerge Cells

Merge and split cells using `merge()` and `unMerge()`.

## Minimal Angular Code

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template:
  `<ejs-spreadsheet #spreadsheet [allowMerge]="true">
    <e-sheets>
      <e-sheet name="Sheet1"></e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  // Merge all cells in range (default)
  mergeAll(): void {
    this.spreadsheet.merge('A1:C1');
  }

  // Merge horizontally (each row merged independently)
  mergeHorizontal(): void {
    this.spreadsheet.merge('A1:C3', 'Horizontally');
  }

  // Merge vertically (each column merged independently)
  mergeVertical(): void {
    this.spreadsheet.merge('A1:C3', 'Vertically');
  }

  // Unmerge cells
  unmerge(): void {
    this.spreadsheet.unMerge('A1:C1');
  }
}
```

## API Reference

### merge(range, type?)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `range` | `string` | Cell range to merge | `'A1:C1'`, `'A1:C3'` |
| `type` | `MergeType` | Merge direction — default: `'All'` | `'All'`, `'Horizontally'`, `'Vertically'` |

### MergeType

| Value | Description |
|---|---|
| `'All'` | Merge all cells in range into one |
| `'Horizontally'` | Merge cells row-wise (each row independently) |
| `'Vertically'` | Merge cells column-wise (each column independently) |

### unMerge(range)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `range` | `string` | Merged range to split back | `'A1:C1'`, `'B2:D5'` |

## Notes

- `[allowMerge]="true"` must be set at initialization
- Only the **top-left** cell value is kept after merge; other values are discarded
- After `unMerge()`, only the top-left cell retains the value; others are left empty
- Always `unMerge()` before writing individual cell data to avoid data loss