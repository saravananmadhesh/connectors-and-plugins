# Find and Replace (WPF Spreadsheet - SfSpreadsheet)

> Concise reference describing how to find and replace content in the Syncfusion WPF `SfSpreadsheet` control. Features include: Find All, Find Next, Find Conditional Formatting, Find Constants, Find Formulas, Find Data Validation, Replace All, and Replace operations with common patterns, API calls, and short code examples.

---

## Overview

This reference explains common find and replace tasks you can perform with `SfSpreadsheet` in a WPF app: searching for text values across cells, replacing single or multiple occurrences, applying search options like case sensitivity, and managing search scope within sheets or selected ranges.

---

## Find 

### Find All 
```csharp
//Search the entire workbook
var list = spreadsheet.SearchManager.FindAll(spreadsheet.Workbook, "sample", SearchBy.ByRows, ExcelFindType.Text, false, true);

// To select the matched cell content ranges,

foreach (var cell in list)
{  
  spreadsheet. ActiveGrid.SelectionController.AddSelection(GridRangeInfo.Cell(cell.Row, cell.Column));          
}

//Search the particular worksheet
var list = spreadsheet.SearchManager.FindAll(spreadsheet.Workbook.Worksheets[0], "sample", SearchBy.ByRows, ExcelFindType.Text, false, true);

// To select the matched cell content ranges,

foreach (var cell in list)
{
  spreadsheet.ActiveGrid.SelectionController.AddSelection(GridRangeInfo.Cell(cell.Row, cell.Column));          
}
```

### Find Next
```csharp
//Search the text in entire workbook in column wise,
var cell = spreadsheet.SearchManager.FindNext(spreadsheet.Workbook, "sample", SearchBy.ByColumns, ExcelFindType.Text, false, true);

// To move the current cell to matched cell content range,
spreadsheet.ActiveGrid.CurrentCell.MoveCurrentCell(cell.Row,cell.Column);          

//Search the formula in particular worksheet in row wise,
var cell = spreadsheet.SearchManager.FindNext(spreadsheet.Workbook.Worksheets[0], "sum", SearchBy.ByRows, ExcelFindType.Text, false, false);

// To move the current cell to matched cell content range,
spreadsheet.ActiveGrid.CurrentCell.MoveCurrentCell(cell.Row,cell.Column);
```

### Find Conditional Formatting
```csharp
//Searches the conditional formatting within the worksheet,
var list = spreadsheet.SearchManager.FindConditionalFormatting(spreadsheet.Workbook.Worksheets[0]);

// To select the matched cell content ranges,

foreach (var cell in list)
{
  spreadsheet.ActiveGrid.SelectionController.AddSelection(GridRangeInfo.Cell(cell.Row, cell.Column));          
}
```

### Find Constants
```csharp
//Searches the constants within the worksheet,
var list = spreadsheet.SearchManager.FindConstants(spreadsheet.Workbook.Worksheets[0]);

// To select the matched cell content ranges,

foreach (var cell in list)
{
   spreadsheet.ActiveGrid.SelectionController.AddSelection(GridRangeInfo.Cell(cell.Row, cell.Column));         
}
```

### Find Formulas
```csharp
//Searches the formulas within the worksheet,
var list = spreadsheet.SearchManager.FindFormulas(spreadsheet.Workbook.Worksheets[0]);

// To select the matched cell content ranges,

foreach (var cell in list)
{
   spreadsheet.ActiveGrid.SelectionController.AddSelection(GridRangeInfo.Cell(cell.Row, cell.Column));          
}
```
### Find Data Validation
```csharp
//Searches the data validation within the worksheet,
var list = spreadsheet.SearchManager.FindDataValidation(spreadsheet.Workbook.Worksheets[0]);

// To select the matched cell content ranges,

foreach (var cell in list)
{
   spreadsheet.ActiveGrid.SelectionController.AddSelection(GridRangeInfo.Cell(cell.Row, cell.Column));        
}
```
---

## Replace All Operations

```csharp
//Replaces the text in the entire workbook
spreadsheet.SearchManager.ReplaceAll(spreadsheet.Workbook, "sample","Sync", false, false);

//Replaces the text in the particular worksheet
spreadsheet.SearchManager.ReplaceAll(spreadsheet.Workbook.Worksheets[0], "sample", "sync", false, true);
```

---

## Replace

```csharp
//Searches the given text and replaces it with specified text
var cell = spreadsheet.SearchManager.FindNext(spreadsheet.Workbook, "sample", SearchBy.ByColumns, ExcelFindType.Text, false, true);
spreadsheet.ActiveGrid.SetCellValue(cell, "sync");
```

---

## Tips & Notes
- Use `FindAll()` to search the entire sheet or a specific range; results highlight all matching cells.
- `ReplaceAll()` replaces all occurrences at once; use `Find()` followed by manual replacement for more control.
- Define a clear search range for large datasets to optimize performance and avoid unintended replacements.
- Always consider case sensitivity and whole-cell matching options based on your data requirements.
- Undo/Redo is supported for replace operations; users can revert changes if needed.

---

## Reference
- Original documentation: https://help.syncfusion.com/document-processing/excel/spreadsheet/wpf/find-and-replace
