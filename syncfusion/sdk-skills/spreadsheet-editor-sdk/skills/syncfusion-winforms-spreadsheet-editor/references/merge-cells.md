# Merge Cells in Windows Forms Spreadsheet

The WinForms Spreadsheet control supports merging two or more adjacent cells into a single cell. The contents of one cell are displayed in the merged cell.

## Merge Cells

To merge cells programmatically:
1. Add a `CoveredCellInfo` entry to the `CoveredCells` collection of `SpreadsheetGrid`.
2. Call `Merge()` on the corresponding XlsIO `IRange`.
3. Call `InvalidateCell` to refresh the view.

**Class:** `CoveredCellInfo`  
**Method:** `Merge()` on `IRange`

```csharp
var gridRange = spreadsheet.ActiveGrid.SelectedRanges.ActiveRange;
var excelRange = gridRange.ConvertGridRangeToExcelRange(spreadsheet.ActiveGrid);
var coverCell = new CoveredCellInfo(gridRange.Top, gridRange.Left, gridRange.Bottom, gridRange.Right);

spreadsheet.ActiveGrid.CoveredCells.Add(coverCell);
spreadsheet.ActiveSheet.Range[excelRange].Merge();
spreadsheet.ActiveGrid.InvalidateCell(gridRange, true);
```

## Unmerge Cells

To unmerge cells programmatically:
1. Clear the `CoveredCellInfo` from the `CoveredCells` collection for the given range.
2. Call `UnMerge()` on the corresponding XlsIO `IRange`.
3. Call `InvalidateCell` to refresh the view.

**Method:** `UnMerge()` on `IRange`

```csharp
var gridRange = spreadsheet.ActiveGrid.SelectedRanges.ActiveRange;
var excelRange = gridRange.ConvertGridRangeToExcelRange(spreadsheet.ActiveGrid);

spreadsheet.ActiveGrid.CoveredCells.Clear(gridRange);
spreadsheet.ActiveSheet.Range[excelRange].UnMerge();
spreadsheet.ActiveGrid.InvalidateCell(gridRange, true);
```

## CoveredCellInfo Constructor

```csharp
CoveredCellInfo(int top, int left, int bottom, int right)
```

| Parameter | Description |
|---|---|
| `top` | The top (starting) row index of the merge range. |
| `left` | The left (starting) column index of the merge range. |
| `bottom` | The bottom (ending) row index of the merge range. |
| `right` | The right (ending) column index of the merge range. |

> **NOTE:** Row and column indices in `SpreadsheetGrid` are 1-based.

## See Also

- [Formatting](formatting.md)
- [Editing](editing.md)
