# Row & Column Operations

Insert, delete, resize, and hide rows and columns in the Spreadsheet Editor.

## Table of Contents

- [Minimal Code](#minimal-code)
- [API](#api)
  - [insertRow](#insertrowstartindex-endindex-sheet)
  - [insertColumn](#insertcolumnstartindex-endindex-sheet)
  - [delete](#deletestartindex-endindex-modeltype-sheet)
  - [setRowHeight](#setrowheightheight-rowindex)
  - [setRowsHeight](#setrowsheightheight-rowrange)
  - [setColWidth](#setcolwidthwidth-colindex)
  - [setColumnsWidth](#setcolumnswidthwidth-colrange)
  - [autofit](#autofitrange)
  - [hideRow](#hiderowstartindex-endindex)
  - [hideColumn](#hidecolumnstartindex-endindex)
- [Row/Column Indexing](#rowcolumn-indexing)
- [Example: Insert Row with Data](#example-insert-row-with-data)
- [Notes](#notes)

## Minimal Code

```typescript
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';

const spreadsheet = new Spreadsheet({
  sheets: [{
    name: 'Data',
    rows: [
      { cells: [{ value: 'Col A' }, { value: 'Col B' }] },
      { cells: [{ value: '1' }, { value: '2' }] },
      { cells: [{ value: '3' }, { value: '4' }] }
    ]
  }]
});
spreadsheet.appendTo('#spreadsheet');

// Insert rows (startIndex, endIndex) — endIndex is inclusive
spreadsheet.insertRow(2, 2);          // Insert 1 row at index 2
spreadsheet.insertRow(2, 3);          // Insert 2 rows at index 2–3

// Delete rows
spreadsheet.delete(1, 1, 'Row', 'Sheet1');    // Delete 1 row at index 1
spreadsheet.delete(2, 3, 'Row', 'Sheet1');    // Delete 2 rows at index 2–3

// Insert columns
spreadsheet.insertColumn(1, 1);       // Insert 1 column at index 1
spreadsheet.insertColumn(1, 2);       // Insert 2 columns at index 1–2

// Delete columns
spreadsheet.delete(1, 1, 'Column', 'Sheet1');   // Delete 1 column at index 1
spreadsheet.delete(2, 3, 'Column', 'Sheet1');   // Delete 2 columns at index 2–3

// Set row height
spreadsheet.setRowHeight(25, 1);              // Set row 2 (index 1) to 25px
spreadsheet.setRowsHeight(35, ['1:5']);        // Set rows 1–5 to 35px

// Set column width
spreadsheet.setColWidth(100, 0);              // Set column A (index 0) to 100px
spreadsheet.setColumnsWidth(150, ['B:D']);    // Set columns B–D to 150px

// Auto-fit column width
spreadsheet.autofit('A:A');                   // Auto-fit column A
spreadsheet.autofit('B:D');                   // Auto-fit columns B–D

// Hide rows
spreadsheet.hideRow(3);               // Hide row at index 3
spreadsheet.hideRow(3, 5);            // Hide rows index 3–5

// Hide columns
spreadsheet.hideColumn(2);            // Hide column at index 2
spreadsheet.hideColumn(2, 4);         // Hide columns index 2–4
```

## API

### `insertRow(startIndex?, endIndex?, sheet?)`

| Parameter | Type | Description |
|---|---|---|
| `startIndex` | `number` | Starting row index (0-based) |
| `endIndex` | `number` | Ending row index (inclusive) |
| `sheet` | `string \| number` | Sheet name or index; defaults to active sheet |

### `insertColumn(startIndex?, endIndex?, sheet?)`

| Parameter | Type | Description |
|---|---|---|
| `startIndex` | `number` | Starting column index (0-based) |
| `endIndex` | `number` | Ending column index (inclusive) |
| `sheet` | `string \| number` | Sheet name or index; defaults to active sheet |

### `delete(startIndex, endIndex, modelType, sheet?)`

| Parameter | Type | Description |
|---|---|---|
| `startIndex` | `number` | Starting index (0-based) |
| `endIndex` | `number` | Ending index (inclusive) |
| `modelType` | `'Row' \| 'Column'` | Target type |
| `sheet` | `string \| number` | Sheet name or index |

### `setRowHeight(height, rowIndex)`

| Parameter | Type | Description |
|---|---|---|
| `height` | `number` | Height in pixels |
| `rowIndex` | `number` | Row index (0-based) |

### `setRowsHeight(height, rowRange)`

| Parameter | Type | Description |
|---|---|---|
| `height` | `number` | Height in pixels |
| `rowRange` | `string[]` | Row range e.g. `['1:5']` |

### `setColWidth(width, colIndex)`

| Parameter | Type | Description |
|---|---|---|
| `width` | `number` | Width in pixels |
| `colIndex` | `number` | Column index (0-based) |

### `setColumnsWidth(width, colRange)`

| Parameter | Type | Description |
|---|---|---|
| `width` | `number` | Width in pixels |
| `colRange` | `string[]` | Column range e.g. `['B:D']` |

### `autofit(range)`

| Parameter | Type | Description |
|---|---|---|
| `range` | `string` | Column or cell range e.g. `'A:A'`, `'B:D'` |

### `hideRow(startIndex, endIndex?)`

| Parameter | Type | Description |
|---|---|---|
| `startIndex` | `number` | Row index (0-based) |
| `endIndex` | `number` | Optional end index for range |

### `hideColumn(startIndex, endIndex?)`

| Parameter | Type | Description |
|---|---|---|
| `startIndex` | `number` | Column index (0-based) |
| `endIndex` | `number` | Optional end index for range |

## Row/Column Indexing

All indices are **0-based**.

| Index | Row | Column |
|---|---|---|
| `0` | Row 1 | Column A |
| `1` | Row 2 | Column B |
| `2` | Row 3 | Column C |

## Example: Insert Row with Data

```typescript
// Insert a blank row at index 2, then populate it
spreadsheet.insertRow(2, 2);
spreadsheet.updateCell({ value: 'New Row' }, 'A3');
spreadsheet.updateCell({ value: '100' }, 'B3');
```

## Notes

- `insertRow`/`insertColumn` shifts existing rows/columns down or right
- `delete` shifts remaining rows up or columns left
- Hidden rows/columns retain their data and index; show them before deleting if needed
- Setting height/width to `0` does not hide; use `hideRow()`/`hideColumn()` instead