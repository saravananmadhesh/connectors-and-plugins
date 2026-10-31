# Selection — UWP Spreadsheet

> Learn how to work with cell and range selection in the Syncfusion UWP Spreadsheet (SfSpreadsheet) control using mouse, keyboard, and programmatic APIs.

---

## Overview

The **Selection** feature in SfSpreadsheet enables users to select cells and ranges using mouse, keyboard, or touch interactions. Selection is enabled by default and can be customized or controlled programmatically. 

---

## Enable or Disable Selection

Selection is enabled by default. You can disable selection by setting the `AllowSelection` property to `false`. 

```csharp
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
    spreadsheet.ActiveGrid.AllowSelection = false;
}
```

---

## Accessing the Current Cell

Use the `CurrentCell` property of the `SelectionController` to access the active cell. 

```csharp
var cell = spreadsheet.ActiveGrid.SelectionController.CurrentCell;
```

---

## Accessing Selected Ranges

The selected ranges in the grid can be accessed using the `SelectedRanges` property. 

```csharp
var rangeList = spreadsheet.ActiveGrid.SelectedRanges;
```

> **Note**: Use the `ActiveRange` property of `GridRangeInfoList` to get the active range within the selection.

---

## Adding and Clearing Selection

You can programmatically add or clear selections using the `SelectionController`. 

```csharp
// Add selection for a range
spreadsheet.ActiveGrid.SelectionController.AddSelection(
    GridRangeInfo.Cells(4, 6, 5, 8)
);

// Add selection for a row
spreadsheet.ActiveGrid.SelectionController.AddSelection(
    GridRangeInfo.Row(4)
);

// Add selection for multiple rows
spreadsheet.ActiveGrid.SelectionController.AddSelection(
    GridRangeInfo.Rows(4, 9)
);

// Add selection for a column
spreadsheet.ActiveGrid.SelectionController.AddSelection(
    GridRangeInfo.Col(5)
);

// Add selection for multiple columns
spreadsheet.ActiveGrid.SelectionController.AddSelection(
    GridRangeInfo.Cols(5, 10)
);

// Clear selection
spreadsheet.ActiveGrid.SelectionController.ClearSelection();
```

---

## Moving the Current Cell

Move the current cell programmatically to a specific row and column. 

```csharp
// Move within the same sheet
spreadsheet.ActiveGrid.CurrentCell.MoveCurrentCell(5, 5);

// Move to a different sheet
spreadsheet.SetActiveSheet("Sheet2");
spreadsheet.ActiveGrid.CurrentCell.MoveCurrentCell(6, 5);
```

---

## Converting GridRangeInfo and IRange

SfSpreadsheet provides helper APIs to convert between `GridRangeInfo` and `IRange`. 

```csharp
// Convert GridRangeInfo to IRange
var excelRange = GridExcelHelper.ConvertGridRangeToExcelRange(
    GridRangeInfo.Cell(4, 5),
    spreadsheet.ActiveGrid
);
```

> **Tip**: Use `ConvertExcelRangeToGridRange` to convert `IRange` into `GridRangeInfo`.

---

## Selection Events

The following events are associated with selection behavior in SfSpreadsheet. 

- **CellClick** – Occurs when a cell is clicked
- **CurrentCellActivating** – Occurs before the current cell is activated (can be canceled)
- **CurrentCellActivated** – Occurs after the current cell is activated
- **SelectionChanging** – Occurs before the selection changes (can be canceled)
- **SelectionChanged** – Occurs after the selection changes

---

## Selection Properties

Important properties related to selection include: 

- **SelectedRanges** – Collection of selected ranges
- **SelectionBrush** – Brush for selected area
- **SelectionBorderBrush** – Brush for selection borders
- **SelectionBorderThickness** – Thickness of selection borders
- **SelectionController** – Manages selection logic
- **AllowSelection** – Enables or disables selection
- **ShowTouchIndicator** – Shows or hides touch indicator
- **TouchHitTestPrecision** – Touch precision distance

---

## CurrentCell Properties

Properties available on the `CurrentCell` object include: 

- **CellRowColumnIndex** – Row and column index of the current cell
- **RowIndex** – Row index
- **ColumnIndex** – Column index
- **Range** – Range of the current cell
- **HasCurrentCell** – Indicates if the grid has an active cell
- **PreviousRowColumnIndex** – Previous cell index

---

## Selection Methods

Commonly used selection-related methods include: 

- **AddSelection** – Adds or extends selection
- **ClearSelection** – Clears current selection
- **MoveCurrentCell** – Moves active cell

---

## Keyboard Navigation

SfSpreadsheet supports extensive keyboard navigation for selection. Some common key combinations include: 

- **HOME / END** – Move to first or last cell of current row
- **Arrow Keys** – Move selection one cell
- **CTRL + Arrow Keys** – Jump to first or last cell in direction
- **SHIFT + Arrow Keys** – Extend selection
- **CTRL + A** – Select entire worksheet
- **TAB / SHIFT + TAB** – Move selection horizontally
- **ENTER / SHIFT + ENTER** – Move selection vertically

---


