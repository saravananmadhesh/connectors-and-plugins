# Selection

> Cell and range selection behavior in WPF Spreadsheet (SfSpreadsheet) — accessing current cell, selected ranges, adding/clearing selection, moving current cell, and key navigation.

---

## Enable / Disable Selection

### Minimal Code
```csharp
// To disable selection in the spreadsheet
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
    spreadsheet.ActiveGrid.AllowSelection = false;
}
```

### Re-enable
```csharp
// To enable selection in the spreadsheet
spreadsheet.ActiveGrid.AllowSelection = true;
```

---

## Access Current Cell

### Minimal Code
```csharp
// To access the active cell in the sheet
spreadsheet.WorkbookLoaded += spreadsheet_WorkbookLoaded;
var cell = spreadsheet.ActiveGrid.SelectionController.CurrentCell;
```

### Access Cell Properties
```csharp
spreadsheet.WorkbookLoaded += spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
var currentCell = spreadsheet.ActiveGrid.SelectionController.CurrentCell;

int row    = currentCell.RowIndex;
int col    = currentCell.ColumnIndex;
IRange range = currentCell.Range;
bool hasCell = currentCell.HasCurrentCell;
}
```

---

## Access Selected Ranges

### Minimal Code
```csharp
// To access the selected ranges in the SpreadsheetGrid
spreadsheet.WorkbookLoaded += spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
var rangeList = spreadsheet.ActiveGrid.SelectedRanges;
}
```

### Active Range
```csharp
// To access the active range within the selected ranges in the SpreadsheetGrid.
spreadsheet.WorkbookLoaded += spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
var activeRange = spreadsheet.ActiveGrid.SelectedRanges.ActiveRange;
}
```

---

## Add or Clear Selection

### Minimal Code
```csharp
//Namespace
using Syncfusion.UI.Xaml.CellGrid;

// To Add selection for range
spreadsheet.WorkbookLoaded += spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
spreadsheet.ActiveGrid.SelectionController.AddSelection(GridRangeInfo.Cells(4, 6, 5, 8));
}
```

### All AddSelection Overloads
```csharp

// Select a cell range (row1, col1, row2, col2)
spreadsheet.WorkbookLoaded += spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
spreadsheet.ActiveGrid.SelectionController.AddSelection(GridRangeInfo.Cells(4, 6, 5, 8));

// To Add the Selection for particular row
spreadsheet.ActiveGrid.SelectionController.AddSelection(GridRangeInfo.Row(4));

// To Add the Selection for multiple rows
spreadsheet.ActiveGrid.SelectionController.AddSelection(GridRangeInfo.Rows(4, 9));

// To Add the Selection for particular column
spreadsheet.ActiveGrid.SelectionController.AddSelection(GridRangeInfo.Col(5));

// To Add the Selection for multiple columns
spreadsheet.ActiveGrid.SelectionController.AddSelection(GridRangeInfo.Cols(5, 10));

// To Clear the Selection from the SpreadsheetGrid
spreadsheet.ActiveGrid.SelectionController.ClearSelection();
}
```

---

## Move Current Cell

### Minimal Code
```csharp
// To Move current cell to the mentioned row and column index of cell
spreadsheet.WorkbookLoaded += spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
spreadsheet.ActiveGrid.CurrentCell.MoveCurrentCell(5, 5);
}
```

### Move to a Different Sheet
```csharp
// To move the current cell to a different sheet
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
spreadsheet.SetActiveSheet("Sheet2");
spreadsheet.ActiveGrid.CurrentCell.MoveCurrentCell(6, 5);
}
```

---

## Convert Range Types

### GridRangeInfo → IRange/ExcelRange
```csharp
// To convert the grid range to excel range or IRange
spreadsheet.WorkbookLoaded += spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
var excelRange = GridExcelHelper.ConvertGridRangeToExcelRange(
    GridRangeInfo.Cell(4, 5),
    spreadsheet.ActiveGrid);
}
```

### IRange/ExcelRange → GridRangeInfo
```csharp
// To convert the IRange/excel range to equivalent grid range
spreadsheet.WorkbookLoaded += spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
    IRange range = spreadsheet.Workbook.Worksheets[0].Range["A1:B5"];
    var gridRange = GridExcelHelper.ConvertExcelRangeToGridRange(range);
}
```

---

## Selection Styling

```csharp
// Namespace
using System.Windows.Media;

spreadsheet.WorkbookLoaded += spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
// Selection fill color
spreadsheet.ActiveGrid.SelectionBrush = new SolidColorBrush(System.Windows.Media.Colors.LightBlue);

// Selection border color
spreadsheet.ActiveGrid.SelectionBorderBrush = new SolidColorBrush(Colors.DarkBlue);

// Selection border thickness
spreadsheet.ActiveGrid.SelectionBorderThickness = 2;
}
```

---

## Selection Events

| Event | Description |
|---|---|
| `CellClick` | Fires when a cell is clicked |
| `CurrentCellActivating` | Fires before the current cell is activated (cancellable) |
| `CurrentCellActivated` | Fires after the current cell is activated |
| `SelectionChanging` | Fires before selection changes (cancellable) |
| `SelectionChanged` | Fires after selection changes |

---

## Key Navigation Reference

| Key | Action |
|---|---|
| `HOME` | Move to first cell in current row |
| `END` | Move to last cell in current row |
| `↑ ↓ ← →` | Move one cell in arrow direction |
| `PAGE UP / PAGE DOWN` | Move to first/last visible cell in column |
| `CTRL+HOME` | Move to beginning of worksheet |
| `CTRL+END` | Move to last used cell |
| `CTRL+A` | Select entire worksheet |
| `SHIFT+ARROW` | Extend selection one cell |
| `CTRL+SHIFT+ARROW` | Extend selection to last cell in row/column |
| `ENTER / SHIFT+ENTER` | Move active cell down/up within selection |
| `TAB / SHIFT+TAB` | Move active cell right/left within selection |

---

## References
- [Selection Documentation](https://help.syncfusion.com/wpf/spreadsheet/selection)
