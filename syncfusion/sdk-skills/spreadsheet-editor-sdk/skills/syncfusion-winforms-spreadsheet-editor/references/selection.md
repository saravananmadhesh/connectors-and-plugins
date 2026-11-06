# Selection in Windows Forms Spreadsheet

This section explains about the Selection behavior in Spreadsheet.

The Spreadsheet control provides support for selection in grid by using mouse, keyboard and touch interactions.

By default, Selection behavior will be enabled in Spreadsheet, but if you want to disable the selection in Spreadsheet, then set the AllowSelection Property to be false.

## Disabling Selection

**C#**

```csharp
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
    spreadsheet.ActiveGrid.AllowSelection = false;
}
```

## Accessing the current cell

Spreadsheet allows the user to access the active cell by using the CurrentCell property of SelectionController Class.

**C#**

```csharp
var cell = spreadsheet.ActiveGrid.SelectionController.CurrentCell;
```

## Accessing the selected ranges

Spreadsheet allows the user to access the selected ranges of the SpreadsheetGrid using SelectedRanges property of SpreadsheetGrid.

**C#**

```csharp
var rangeList = spreadsheet.ActiveGrid.SelectedRanges;
```

> **NOTE**
>
> To get the active range in the selected ranges list, use ActiveRange property of GridRangeInfoList class.

## Adding or clearing the selection

Spreadsheet allows the user to add and clear the selection in the Active SpreadsheetGrid for the given range.

**C#**

```csharp
//To Add the Selection for range,
spreadsheet.ActiveGrid.SelectionController.AddSelection(GridRangeInfo.Cells(4,6,5,8));

//To Add the Selection for particular row,
spreadsheet.ActiveGrid.SelectionController.AddSelection(GridRangeInfo.Row(4));

//To Add the Selection for multiple rows,
spreadsheet.ActiveGrid.SelectionController.AddSelection(GridRangeInfo.Rows(4,9));

//To Add the Selection for particular column,
spreadsheet.ActiveGrid.SelectionController.AddSelection(GridRangeInfo.Col(5));

//To Add the Selection for multiple columns,
spreadsheet.ActiveGrid.SelectionController.AddSelection(GridRangeInfo.Cols(5,10));

//To Clear the Selection,
spreadsheet.ActiveGrid.SelectionController.ClearSelection();
```

## Moving current cell

Spreadsheet allows the user to move the current cell to the mentioned cell in SpreadsheetGrid.

**C#**

```csharp
//Moves current cell to the mentioned row and column index of cell,
spreadsheet.ActiveGrid.CurrentCell.MoveCurrentCell(5, 5);

//For moving the current cell to a different sheet,
spreadsheet.SetActiveSheet("Sheet2");
spreadsheet.ActiveGrid.CurrentCell.MoveCurrentCell(6, 5);
```

## Converting GridRangeInfo into IRange

Spreadsheet allows the user to convert the GridRangeInfo into the equivalent IRange by using ConvertGridRangeToExcelRange method of GridExcelHelper class.

**C#**

```csharp
var excelRange = GridExcelHelper.ConvertGridRangeToExcelRange(GridRangeInfo.Cell(4, 5), spreadsheet.ActiveGrid);
```
