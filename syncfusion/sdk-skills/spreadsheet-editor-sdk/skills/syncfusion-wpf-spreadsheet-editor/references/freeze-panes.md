# Freeze Panes

> Freeze rows or columns to keep them visible while scrolling in WPF Spreadsheet control.

---

## Overview

Allows users to lock specific rows or columns so they remain visible when scrolling through large worksheets.

---

## Key Features
- Freeze top rows or left columns
- Unfreeze as needed
- Improves navigation in large sheets

---

## Example

Freeze the first row to keep headers visible while scrolling down.

## Freeze Rows and Columns
```csharp
//Freeze panes

//To Freeze 4th row and 4th column
spreadsheet.Workbook.ActiveSheet.Range[4, 4].FreezePanes();
spreadsheet.ActiveGrid.FrozenRows = 5;
spreadsheet.ActiveGrid.FrozenColumns = 5;
```
## Unfreeze Rows and Columns
```csharp
//Unfreeze panes

//To Unfreeze 4th row and 4th column
spreadsheet.Workbook.ActiveSheet.RemovePanes();
spreadsheet.ActiveGrid.FrozenRows = 1;
spreadsheet.ActiveGrid.FrozenColumns = 1;
```

---

## References
- [Freeze Panes Documentation](https://help.syncfusion.com/wpf/spreadsheet/freeze-panes)
