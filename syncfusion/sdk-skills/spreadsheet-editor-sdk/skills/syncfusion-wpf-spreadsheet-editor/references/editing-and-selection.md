# Editing and Selection

> Interactive editing and cell selection in WPF Spreadsheet control.

---

## Overview

Allows users to edit cell values, select single or multiple cells, and perform standard editing operations (cut, copy, paste, delete, etc.).

---

## Key Features
- Edit cell values directly
- Select single/multiple cells, rows, or columns
- Keyboard and mouse navigation
- Context menu support

---

## Example

Users can click on a cell to edit or select a range using mouse drag or keyboard shortcuts (Shift+Arrow).

## Editing
```csharp
// To disable/enable editing support in the spreadsheet
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
    spreadsheet.ActiveGrid.AllowEditing = false;
}
```

## Editing a cell programmatically

```csharp
// To edit the current cell programmatically 
spreadsheet.ActiveGrid.CurrentCell.BeginEdit(true);

// To end the editing of a cell programmatically 
//Validates and end the edit operation,
spreadsheet.ActiveGrid.CurrentCell.ValidateAndEndEdit();

//Commits the value and end the edit operation,
spreadsheet.ActiveGrid.CurrentCell.EndEdit(true);
```

## Locking or Unlocking a cell
```csharp
// Locking cells allows you to disable editing and formatting the cells when the sheet is protected. By default, every cells are locked in the worksheet. But while in protect mode, if you want to edit or format a cell, you can unlock the cells.

var worksheet = spreadsheet.ActiveSheet;
var excelStyle = worksheet.Range["A2"].CellStyle;

//To unlock a cell,           
excelStyle.Locked = false;

//To lock a cell, 
excelStyle.Locked = true;
```
---

## References
- [Editing and Selection Documentation](https://help.syncfusion.com/wpf/spreadsheet/editing)
