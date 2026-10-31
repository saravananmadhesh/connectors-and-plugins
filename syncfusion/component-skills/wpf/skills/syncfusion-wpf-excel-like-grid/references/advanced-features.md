# Advanced Features in WPF GridControl

## Table of Contents
- [Cell Comments (Comment Tips)](#cell-comments-comment-tips)
- [Input Message Tips](#input-message-tips)
- [Tooltips](#tooltips)
- [Cell Layout Customization](#cell-layout-customization)
- [Autofit Rows and Columns](#autofit-rows-and-columns)
- [Printing](#printing)
- [Serialization](#serialization)

---

## Cell Comments (Comment Tips)

Add Excel-like comment indicators to cells. A small red triangle appears in the corner; hovering shows the comment text.

```csharp
// Attach a comment to a cell
gridControl.Model[3, 2].Comment = "Reviewed by Finance on 2026-03-24";

// Style the comment popup
gridControl.Model[3, 2].Background = Brushes.LightYellow;
gridControl.Model[3, 2].Foreground = Brushes.DarkRed;

// Enable the comment service in GridControl
GridCommentService.SetShowComment(gridControl, true);
```

### ToolTip for row and column

```csharp
//Adding tooltip to the specific row
gridcontrol.Model.RowStyles[1].ToolTip = "First row";
gridcontrol.Model.RowStyles[1].ShowTooltip = true;

//Adding tooltip to the specific column
gridcontrol.Model.ColStyles[1].ToolTip = "First column";
gridcontrol.Model.ColStyles[1].ShowTooltip = true;
```

---

## Input Message Tips

Input message tips provide guidance when a cell becomes active — similar to Excel’s data validation tooltip.

```xml
<syncfusion:GridControl
    x:Name="gridControl"
    syncfusion:GridTooltipService.ShowTooltips="True" />

```csharp
// Set an input message tip on a cell
gridControl.Model[4, 3].DataValidationTooltip = "Enter a value between 1 and 100";
gridControl.Model[4, 3].ShowDataValidationTooltip = true;

```
The tip appears automatically when the user activates the cell.

---

## Tooltips

The grid supports standard WPF `ToolTip` objects on individual cells via the `GridStyleInfo.Tooltip` property:

```csharp
gridControl.Model[5, 2].ToolTip = "Last updated: 2026-01-15 by Admin";
```

For dynamic tooltips based on cell content, generate the tooltip text in `QueryCellInfo`:

```csharp
gridControl.QueryCellInfo += (s, e) =>
{
    if (e.Cell.RowIndex == 1 && e.Cell.ColumnIndex == 1)
        {
            e.Style.Enabled = false;
            e.Style.ToolTip = " Grid (" + e.Cell.RowIndex + "," + e.Cell.ColumnIndex + ") ";
            e.Style.ShowTooltip = false;
        }
};
```

---

## Cell Layout Customization

### Covered cells (merged ranges)

```csharp
// Span cell (2,2) through (4,5)
gridControl.CoveredCells.Add(new CoveredCellInfo(2, 2, 4, 5));
gridControl.Model[2, 2].CellValue           = "Merged Header";
gridControl.Model[2, 2].HorizontalAlignment = HorizontalAlignment.Center;
```

### Covered ranges with different layouts

Covered cells are cells that span across neighboring rows or columns and behave as a single cell both visually and programmatically.

```csharp
// Create covered cell ranges
gridControl.Model.CoveredCells.Add(new CoveredCellInfo(6, 4, 7, 4));
gridControl.Model.CoveredCells.Add(new CoveredCellInfo(9, 4, 11, 6));

// Customize the top-left cell of the covered range
var cell = gridControl.Model[6, 4];
cell.CellValue = "Row spanned cell";
cell.HorizontalAlignment = HorizontalAlignment.Center;
cell.Background = Brushes.BlanchedAlmond;

cell = gridControl.Model[9, 4];
cell.CellValue = "Row and column spanned cell";
cell.HorizontalAlignment = HorizontalAlignment.Center;
cell.Background = Brushes.BlanchedAlmond;

```

### Cell margins and padding

```csharp
// Add interior padding around cell content
gridControl.Model[6, 2].BorderMargins = new CellMarginsInfo(4, 2, 4, 2);
```

### Word wrap

```csharp
gridControl.Model[7, 2].TextWrapping = TextWrapping.Wrap;
gridControl.Model.RowHeights[7]  = 60; // allow room for wrapped text
```

---

## Autofit Rows and Columns

GridControl provides support to autofit rows and columns based on the content of cells.

```csharp
// Autofit a single row
gridControl.Model.ResizeRowsToFit(GridRangeInfo.Row(2),GridResizeToFitOptions.NoShrinkSize);

// Autofit a range of rows
gridControl.Model.ResizeRowsToFit(GridRangeInfo.Rows(3, 6),GridResizeToFitOptions.NoShrinkSize);

// Autofit a single column
gridControl.Model.ResizeColumnsToFit(GridRangeInfo.Col(2),GridResizeToFitOptions.NoShrinkSize);

// Autofit a range of columns
gridControl.Model.ResizeColumnsToFit(GridRangeInfo.Cols(3, 6),GridResizeToFitOptions.NoShrinkSize);
```

---

## Printing

GridControl has built-in print support. Use `GridPrintManager` to print the entire grid or a specific range.

```csharp
// Print the entire grid (shows print dialog)
var printManager = new GridPrintManager(gridControl);
printManager.Print();

// Print preview
var previewWindow = new PrintPreviewWindow(printManager);
previewWindow.Show();

// Print without dialog (direct to default printer)
printManager.PrintDirect();
```

### Print options

```csharp
var printManager = new GridPrintManager(gridControl);

// Scale to fit one page wide
printManager.PrintOptions.FitToPage = true;

// Set page orientation
printManager.PrintOptions.PageOrientation =
    System.Printing.PageOrientation.Landscape;

// Print a specific cell range only
printManager.PrintRange = GridRangeInfo.Cells(1, 1, 50, 10);

printManager.Print();
```

---

## Serialization

Serialization allows you to save and restore the complete state of the GridControl, including data, structure, and styles.

### Save grid state to XML file

```csharp
// Serialize GridControl state to an XML file
gridControl.Model.Serialize("GridState.xml");
```
### Restore grid state from XML file

```csharp
// Deserialize GridControl state from an XML file
gridControl.Model.Deserialize("GridState.xml");
```

### Save grid state to a string

```csharp
// Serialize GridControl state as a string
string xmlState = gridControl.Model.SerializeAsString();
```
### Restore grid state from a string

```csharp
// Deserialize GridControl state from a string
gridControl.Model.DeserializeFromString(xmlState);
```

> Serialization captures: cell values, styles, row/column sizes, frozen row/column counts, covered cells, and base style definitions. It does not capture event handlers or runtime-only state.
