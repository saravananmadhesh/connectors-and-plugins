# Merge Cells

> Merge two or more adjacent cells into a single cell in WPF Spreadsheet control.

---

## Overview

Allows combining multiple cells into one, displaying the content of a single cell across the merged area.

---

## Key Features
- Merge horizontally or vertically
- Unmerge cells
- Retain content of the top-left cell

---

## Example

Select a range and use the Merge command to combine cells. Unmerge to revert to individual cells.

## Merge Cells
```csharp
// To merge two or more cells in the spreadsheet
//spreadsheet.ActiveGrid.SelectionController.AddSelection(GridRangeInfo.Cells(4, 6, 5, 8));
var gridRange = spreadsheet.ActiveGrid.SelectedRanges.ActiveRange;
var excelRange = gridRange.ConvertGridRangeToExcelRange(spreadsheet.ActiveGrid);
var coverCell = new CoveredCellInfo(gridRange.Top, gridRange.Left, gridRange.Bottom, gridRange.Right);
spreadsheet.ActiveGrid.CoveredCells.Add(coverCell);
spreadsheet.ActiveSheet.Range[excelRange].Merge();
spreadsheet.ActiveGrid.InvalidateCell(gridRange, true);
```

## UnMerge Cell
```csharp
// To the merged cells in Spreadsheet
var gridRange = spreadsheet.ActiveGrid.SelectedRanges.ActiveRange;
var excelRange = gridRange.ConvertGridRangeToExcelRange(spreadsheet.ActiveGrid);
spreadsheet.ActiveGrid.CoveredCells.Clear(gridRange);
spreadsheet.ActiveSheet.Range[excelRange].UnMerge();
spreadsheet.ActiveGrid.InvalidateCell(gridRange, true);
```

### Unmerge All Cells

```csharp
var sheet = spreadsheet.ActiveSheet;

// Get all covered cells (merged cells)
var grid = spreadsheet.ActiveGrid;

// Create a copy of the list to avoid modification during iteration
var coveredCellsList = new List<CoveredCellInfo>(grid.CoveredCells);

foreach (CoveredCellInfo coveredCell in coveredCellsList)
{
    // Convert to Excel range
    var gridRange = GridRangeInfo.Cells(
        coveredCell.Top, 
        coveredCell.Left, 
        coveredCell.Bottom, 
        coveredCell.Right);
    
    // Unmerge
    var excelRange = gridRange.ConvertGridRangeToExcelRange(grid);
    sheet.Range[excelRange].UnMerge();
    
    // Clear the covered cell
    grid.CoveredCells.Clear(gridRange);
}

grid.InvalidateCells();
```

### Check if Cell is Merged

```csharp
bool IsCellMerged(int row, int column)
{
    var grid = spreadsheet.ActiveGrid;
    
    // Check if cell is covered (merged)
    foreach (CoveredCellInfo coveredCell in grid.CoveredCells)
    {
        if (coveredCell.Top <= row && row <= coveredCell.Bottom &&
            coveredCell.Left <= column && column <= coveredCell.Right)
        {
            return true;
        }
    }
    
    return false;
}
```

---

## References
- [Merge Cells Documentation](https://help.syncfusion.com/wpf/spreadsheet/merge-cells)
