# Working With SfSpreadsheet — UWP

> Learn how to access and manipulate worksheets, grids, cells, and events in the Syncfusion UWP Spreadsheet (SfSpreadsheet) control.

---

## ⚠️ IMPORTANT: ActiveSheet and ActiveGrid Access

**When accessing `ActiveSheet` and `ActiveGrid` properties, ensure the code is executed in the appropriate event:**

- **❌ DO NOT** call `ActiveSheet` or `ActiveGrid` in the **Constructor** — the worksheet grid is not yet initialized
- **✅ DO** use `MainPage.Loaded` event to safely access `ActiveSheet` and `ActiveGrid`

### Correct Pattern
```csharp
public MainPage()
{
    InitializeComponent();
    this.Loaded += MainPage_Loaded;
}

private void MainPage_Loaded(object sender, RoutedEventArgs e)
{
    // Access ActiveSheet, ActiveGrid, add charts, set cell values here
    var worksheet = spreadsheet.ActiveSheet;
    var grid = spreadsheet.ActiveGrid;
}
```

---

## Overview

The **SfSpreadsheet** control provides APIs to work with workbooks, worksheets, grids, cells, ranges, and related events. This section explains how to access these components and perform common spreadsheet operations programmatically. 

---

## Accessing the Workbook and Worksheets

A workbook represents an Excel document and can be accessed using the `Workbook` property of `SfSpreadsheet`. Each workbook contains one or more worksheets. 

```csharp
// Access workbook
var workbook = spreadsheet.Workbook;

// Access worksheet by index
var sheet1 = workbook.Worksheets[0];

// Access worksheet by name
var sheet2 = workbook.Worksheets["Sheet1"];

// Access active worksheet
var activeSheet = spreadsheet.ActiveSheet;
```

---

## Accessing SpreadsheetGrid

Each worksheet is rendered as a `SpreadsheetGrid`. Grid-level operations and events can be accessed during worksheet lifecycle events. 

```csharp
//Namespace
using Syncfusion.UI.Xaml.Spreadsheet.Helpers;
using Syncfusion.UI.Xaml.CellGrid.Helpers;

spreadsheet.WorksheetAdded += spreadsheet_WorksheetAdded;
spreadsheet.WorksheetRemoved += spreadsheet_WorksheetRemoved;

void spreadsheet_WorksheetAdded(object sender, WorksheetAddedEventArgs args)
{
    var grid = spreadsheet.ActiveGrid;
    grid.CurrentCellActivated += grid_CurrentCellActivated;
}

void spreadsheet_WorksheetRemoved(object sender, WorksheetRemovedEventArgs args)
{
    var grid = spreadsheet.ActiveGrid;
    grid.CurrentCellActivated -= grid_CurrentCellActivated;
}
```

### Access Grid by Sheet Name

```csharp
var sheet = spreadsheet.Workbook.Worksheets[1];
spreadsheet.GridCollection[sheet.Name].RowCount = 50;
spreadsheet.GridCollection[sheet.Name].ColumnCount = 12;
```

---

## Workbook Load and Unload Events

You can hook or unhook grid events when a workbook is loaded or unloaded. 

```csharp
//Namespace
using Syncfusion.UI.Xaml.Spreadsheet.Helpers;
using Syncfusion.UI.Xaml.CellGrid.Helpers;

spreadsheet.WorkbookLoaded += spreadsheet_WorkbookLoaded;
spreadsheet.WorkbookUnloaded += spreadsheet_WorkbookUnloaded;

void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
    foreach (var grid in args.GridCollection)
        grid.QueryRange += grid_QueryRange;
}

void spreadsheet_WorkbookUnloaded(object sender, WorkbookUnloadedEventArgs args)
{
    foreach (var grid in args.GridCollection)
        grid.QueryRange -= grid_QueryRange;
}
```

---

## Setting the Active Sheet

The active worksheet can be changed programmatically using the `SetActiveSheet` method. 

```csharp
this.Loaded += MainPage_Loaded;
private void MainPage_Loaded(object sender, RoutedEventArgs e)
{
spreadsheet.SetActiveSheet("Sheet2");
}
```

---

## Accessing Cells and Ranges

The `IRange` interface allows access to single cells or ranges in multiple ways. 

```csharp
// Access a cell by specifying cell address. 
var cell = spreadsheet.Workbook.Worksheets[0].Range["A3"];

// Access a cell by specifying cell row and column index. 
var cell1 = spreadsheet.Workbook.Worksheets[0].Range[3, 1];

// Access a cells by specifying user defined name.
var cell2 = spreadsheet.Workbook.Worksheets[0].Range["Namerange"];

// Accessing a range of cells by specifying cell's address.
var cell3 = spreadsheet.Workbook.Worksheets[0].Range["A5:C8"];

// Accessing a range of cells specifying cell row and column index.
var cell4 = spreadsheet.Workbook.Worksheets[0].Range[15, 1, 15, 3];
```

---

## Accessing Cell Values

Cell values and display text can be retrieved using `Value` and `DisplayText` properties. 

```csharp
// Access a cell value by using "Value" Property,
var cellValue = spreadsheet.Workbook.Worksheets[0].Range["A3"].Value;

// Access a cell value by using "DisplayText" Property. 
var displayValue = spreadsheet.Workbook.Worksheets[0].Range[4, 1].DisplayText;
```

---

## Setting Cell Value or Formula

To update a cell value or formula, use `SetCellValue` and invalidate the cell.

⚠️ **IMPORTANT:** The `SetCellValue` method **only accepts string values**. Convert all values to strings before passing them to this method, including numbers and formulas.

```csharp
var range = spreadsheet.ActiveSheet.Range[2, 2];

// Text value (already string)
spreadsheet.ActiveGrid.SetCellValue(range, "CellValue");

// Numeric value (convert to string)
spreadsheet.ActiveGrid.SetCellValue(range, "10");

// Formula (string)
spreadsheet.ActiveGrid.SetCellValue(range, "=SUM(A1:A5)");

spreadsheet.ActiveGrid.InvalidateCell(2, 2);
```

---

## Clearing Cell Content and Formatting

Cells can be cleared with or without formatting options. 

```csharp
//Namespace
using Syncfusion.XlsIO;

//To clear the contents in the range alone,
spreadsheet.Workbook.Worksheets[0].Range[3, 3].Clear();

//To clear the contents along with its formatting in the range,   
spreadsheet.Workbook.Worksheets[0].Range[3, 3].Clear(true);

//To clear the range with specified ExcelClearOptions,
spreadsheet.Workbook.Worksheets[0].Range[3, 3].Clear(ExcelClearOptions.ClearDataValidations);
```

---

## Refreshing the View

Invalidate cells or ranges to refresh the UI after updates. 

```csharp
//Invalidates the mentioned cell in the grid,
spreadsheet.ActiveGrid.InvalidateCell(3, 3);

//Invalidates the range ,
var range = GridRangeInfo.Cells(5, 4, 6, 7);
spreadsheet.ActiveGrid.InvalidateCell(range);

//Invalidates all the cells in the grid,
spreadsheet.ActiveGrid.InvalidateCells();

//Invalidates the measurement state(layout) of grid,
spreadsheet.ActiveGrid.InvalidateVisual();

//Invalidates the cell borders in the range,
var range = GridRangeInfo.Cells(2, 4, 6, 4);
spreadsheet.ActiveGrid.InvalidateCellBorders(range);
```

---

## Scrolling Programmatically

Scroll the grid to a specific cell using `ScrollInView`. 

```csharp
// Namespace
using Syncfusion.UI.Xaml.Grid.ScrollAxis;

spreadsheet.ActiveGrid.ScrollInView(new RowColumnIndex(5, 5));
```

---

## Formula Bar Visibility

Control the visibility of the Formula Bar using the `FormulaBarVisibility` property. 

```xaml
<syncfusion:SfSpreadsheet x:Name="spreadsheet" FormulaBarVisibility="Collapsed" />
```
```csharp
spreadsheet.FormulaBarVisibility = Windows.UI.Xaml.Visibility.Collapsed;
```

---

## Workbook Modification Check

You can determine whether a workbook has been modified using reflection. 

```csharp
//Namespace
using Syncfusion.XlsIO.Implementation;

var workbookImpl = spreadsheet.Workbook as WorkbookImpl;
var binding = System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.NonPublic;
var isModified = typeof(WorkbookImpl)
    .GetProperty("IsCellModified", binding)
    .GetValue(workbookImpl);
```

---

## Suppressing Alert Messages

Disable spreadsheet alerts using the `DisplayAlerts` property. 

```csharp
spreadsheet.DisplayAlerts = false;
```

---

## Suspend and Resume Formula Calculation

Improve performance by suspending formula calculation during bulk updates. 

```csharp
spreadsheet.SuspendFormulaCalculation();
spreadsheet.ResumeFormulaCalculation();
```

---

## Managing Popup Visibility

Popups such as copy-paste options can be closed or shown programmatically. 

```csharp
//To close the popup
spreadsheet.ActiveGrid.ShowHidePopup(false);

//To show the closed popup, if needed.
spreadsheet.ActiveGrid.ShowHidePopup(true);
```

---

## Detecting Active Sheet Changes

Track active sheet changes using the `PropertyChanged` event. 

```csharp
//Namespace
using System.ComponentModel;

spreadsheet.PropertyChanged += Spreadsheet_PropertyChanged;

void Spreadsheet_PropertyChanged(object sender, PropertyChangedEventArgs e)
{
    if (e.PropertyName == "ActiveSheet")
    {
        // Handle active sheet change
    }
}
```

---

## Query Workbook and Worksheet Information

Retrieve metadata and information about workbooks and worksheets programmatically.

### Get Worksheet Count

```csharp
var workbook = spreadsheet.Workbook;

// Get total number of worksheets
int worksheetCount = workbook.Worksheets.Count;

// Iterate through worksheets
foreach (IWorksheet worksheet in workbook.Worksheets)
{
    string sheetName = worksheet.Name;
}
```

### Get Worksheet Used Range

```csharp
var sheet = spreadsheet.ActiveSheet;

// Get used range dimensions
IRange usedRange = sheet.UsedRange;

int firstRow = usedRange.Row;
int lastRow = usedRange.LastRow;
int firstColumn = usedRange.Column;
int lastColumn = usedRange.LastColumn;
```
---
