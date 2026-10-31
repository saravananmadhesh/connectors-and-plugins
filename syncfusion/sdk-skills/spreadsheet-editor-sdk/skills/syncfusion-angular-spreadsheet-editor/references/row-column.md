# Row & Column Operations

Insert, delete, resize, and hide rows and columns using the Spreadsheet component.

## Minimal Code

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
      <e-sheet name="Data">
        <e-rows>
          <e-row>
            <e-cells>
              <e-cell value="Col A"></e-cell>
              <e-cell value="Col B"></e-cell>
            </e-cells>
          </e-row>
          <e-row>
            <e-cells>
              <e-cell [value]="1"></e-cell>
              <e-cell [value]="2"></e-cell>
            </e-cells>
          </e-row>
        </e-rows>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  // Insert rows
  insertRows(): void {
    this.spreadsheet.insertRow(2, 2);   // Insert 1 row at index 2
    this.spreadsheet.insertRow(2, 3);   // Insert 2 rows at index 2–3
  }

  // Delete rows
  deleteRows(): void {
    this.spreadsheet.delete(1, 1, 'Row', 'Data');  // Delete 1 row at index 1
    this.spreadsheet.delete(2, 3, 'Row', 'Data');  // Delete 2 rows at index 2–3
  }

  // Insert columns
  insertColumns(): void {
    this.spreadsheet.insertColumn(1, 1); // Insert 1 column at index 1
    this.spreadsheet.insertColumn(1, 2); // Insert 2 columns at index 1–2
  }

  // Delete columns
  deleteColumns(): void {
    this.spreadsheet.delete(1, 1, 'Column', 'Data'); // Delete 1 column at index 1
    this.spreadsheet.delete(2, 3, 'Column', 'Data'); // Delete 2 columns at index 2–3
  }

  // Set row height
  setRowHeight(): void {
    this.spreadsheet.setRowHeight(25, 1);          // Row 2 (index 1) to 25px
    this.spreadsheet.setRowsHeight(35, ['1:5']);   // Rows 1–5 to 35px
  }

  // Set column width
  setColWidth(): void {
    this.spreadsheet.setColWidth(100, 0);            // Column A to 100px
    this.spreadsheet.setColumnsWidth(150, ['B:D']); // Columns B–D to 150px
  }

  // Auto-fit column width
  autofit(): void {
    this.spreadsheet.autofit('A:A');  // Auto-fit column A
    this.spreadsheet.autofit('B:D'); // Auto-fit columns B–D
  }

  // Hide rows
  hideRows(): void {
    this.spreadsheet.hideRow(3);     // Hide row at index 3
    this.spreadsheet.hideRow(3, 5); // Hide rows index 3–5
  }

  // Hide columns
  hideColumns(): void {
    this.spreadsheet.hideColumn(2);     // Hide column at index 2
    this.spreadsheet.hideColumn(2, 4); // Hide columns index 2–4
  }

  // Insert row with data
  insertRowWithData(): void {
    this.spreadsheet.insertRow(2, 2);
    this.spreadsheet.updateCell({ value: 'New Row' }, 'A3');
    this.spreadsheet.updateCell({ value: '100' }, 'B3');
  }
}
```

## API Reference

### insertRow(startIndex?, endIndex?, sheet?)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `startIndex` | `number` | Starting row index (0-based) | `2` |
| `endIndex` | `number` | Ending row index (inclusive) | `3` |
| `sheet` | `string \| number` | Sheet name or index | `'Data'`, `0` |

### insertColumn(startIndex?, endIndex?, sheet?)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `startIndex` | `number` | Starting column index (0-based) | `1` |
| `endIndex` | `number` | Ending column index (inclusive) | `2` |
| `sheet` | `string \| number` | Sheet name or index | `'Data'`, `0` |

### delete(startIndex, endIndex, modelType, sheet?)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `startIndex` | `number` | Starting index (0-based) | `1` |
| `endIndex` | `number` | Ending index (inclusive) | `3` |
| `modelType` | `string` | Target type | `'Row'`, `'Column'` |
| `sheet` | `string \| number` | Sheet name or index | `'Data'`, `0` |

### Row Height & Column Width

| Method | Parameters | Description | Example |
|---|---|---|---|
| `setRowHeight(height, rowIndex)` | `number, number` | Set single row height | `setRowHeight(25, 1)` |
| `setRowsHeight(height, rowRange)` | `number, string[]` | Set range of rows height | `setRowsHeight(35, ['1:5'])` |
| `setColWidth(width, colIndex)` | `number, number` | Set single column width | `setColWidth(100, 0)` |
| `setColumnsWidth(width, colRange)` | `number, string[]` | Set range of columns width | `setColumnsWidth(150, ['B:D'])` |
| `autofit(range)` | `string` | Auto-fit column width | `autofit('A:A')` |

### Hide

| Method | Parameters | Description | Example |
|---|---|---|---|
| `hideRow(startIndex, endIndex?)` | `number, number?` | Hide row or row range | `hideRow(3, 5)` |
| `hideColumn(startIndex, endIndex?)` | `number, number?` | Hide column or column range | `hideColumn(2, 4)` |

## Row/Column Indexing

All indices are **0-based**.

| Index | Row | Column |
|---|---|---|
| `0` | Row 1 | Column A |
| `1` | Row 2 | Column B |
| `2` | Row 3 | Column C |

## Notes

- `insertRow` / `insertColumn` shifts existing rows/columns down or right
- `delete` shifts remaining rows up or columns left
- Setting height/width to `0` does not hide — use `hideRow()` / `hideColumn()` instead
- Hidden rows/columns retain data; show them before deleting if needed