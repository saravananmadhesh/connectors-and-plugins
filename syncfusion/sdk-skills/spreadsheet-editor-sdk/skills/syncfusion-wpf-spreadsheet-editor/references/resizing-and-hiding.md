# Resizing and Hiding

> Resize, hide/unhide, insert/delete rows and columns in WPF Spreadsheet control.

---

## Overview

Supports interactive resizing and hiding/unhiding of rows and columns to customize worksheet layout.

---

## Key Features
- Resize row height and column width
- Hide or unhide rows/columns
- Auto-fit to content

---

## Example

Drag the row or column border to resize. Right-click to hide or unhide rows/columns.

## Insert Rows and Columns

```csharp
// For Inserting Rows
spreadsheet.ActiveSheet.InsertRow(2, 3);
spreadsheet.ActiveGrid.Model.InsertRows(2, 3);

// For Inserting Columns
spreadsheet.ActiveSheet.InsertColumn(3, 2);
spreadsheet.ActiveGrid.Model.InsertColumns(3, 2);

```

## Delete Rows and Columns

```csharp
// For Deleting Rows
spreadsheet.ActiveSheet.DeleteRow(5, 2);
spreadsheet.ActiveGrid.Model.RemoveRows(5, 2);

// For Deleting Columns
spreadsheet.ActiveSheet.DeleteColumn(3, 2);
spreadsheet.ActiveGrid.Model.RemoveColumns(3, 2);

```

## Hide Rows and Columns

```csharp
// For Hiding Rows

spreadsheet.ActiveSheet.HideRow(5);
spreadsheet.ActiveGrid.RowHeights.SetHidden(5, 5, true);

// For Hiding Columns
spreadsheet.ActiveSheet.HideColumn(4);
spreadsheet.ActiveGrid.ColumnWidths.SetHidden(4, 4, true);

```

## Unhide Rows and Columns

```csharp
// For Unhiding Rows
spreadsheet.ActiveSheet.ShowRow(5, true);
spreadsheet.ActiveGrid.RowHeights.SetHidden(5, 5, false);

// For Unhiding Columns
spreadsheet.ActiveSheet.ShowColumn(4, true);
spreadsheet.ActiveGrid.ColumnWidths.SetHidden(4, 4, false);
```

## Row Height and Column Width

```csharp
// To resize or adjust the row height or column width

// For setting RowHeight for 4th Row
spreadsheet.ActiveGrid.SetRowHeight(4, 4, 30);
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Row(4), true);

// For setting ColumnWidth for 5th Column
spreadsheet.ActiveGrid.SetColumnWidth(5, 5, 22);
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Col(5), true);
```

## Auto Fit Rows and Columns

```csharp
// To AutoFit a single column
spreadsheet.ActiveSheet.AutofitColumn(2);
spreadsheet.ActiveGrid.SetColumnWidth(2, 2, spreadsheet.ActiveSheet.GetColumnWidthInPixels(2)); 

// To AutoFit multiple columns
spreadsheet.ActiveSheet["A1:D100"].AutofitColumns();

for(int i = 1; i <= 4; i++)
{
   spreadsheet.ActiveGrid.SetColumnWidth(i, i, spreadsheet.ActiveSheet.GetColumnWidthInPixels(i));
}

// To AutoFit a single row
spreadsheet.ActiveSheet.AutofitRow(3);
spreadsheet.ActiveGrid.SetRowHeight(3, 3, spreadsheet.ActiveSheet.GetRowHeightInPixels(3)); 

// To AutoFit multiple rows
spreadsheet.ActiveSheet["B1:B5"].AutofitRows();

for(int i = 1; i <= 5; i++)
{
   spreadsheet.ActiveGrid.SetRowHeight(i, i, spreadsheet.ActiveSheet.GetRowHeightInPixels(i));
}
```
---

## References
- [Resizing and Hiding Documentation](https://help.syncfusion.com/wpf/spreadsheet/rows-columns)
