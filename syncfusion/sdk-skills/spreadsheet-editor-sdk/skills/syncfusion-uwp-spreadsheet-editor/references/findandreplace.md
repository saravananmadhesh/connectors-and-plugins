# Find and Replace — UWP Spreadsheet

> Learn how to search and replace text, values, formulas, and other cell data in the Syncfusion UWP Spreadsheet (SfSpreadsheet) control using built-in Find and Replace APIs.

---

## Overview

The **Find and Replace** feature in SfSpreadsheet enables you to search for text, numbers, formulas, constants, conditional formatting, and data validations within a worksheet or the entire workbook. You can also replace matching content programmatically.

---

## Find Operations

Find operations search for specific content and return an `IRange` or a list of `IRange` instances based on the search criteria.

### Common Find Parameters

- **Search Scope** – Workbook (`IWorkbook`) or Worksheet (`IWorksheet`)
- **Search Text** – Text or value to search
- **Search Direction** – Row-wise or Column-wise using `SearchBy`
- **Search Type** – Values or formulas using `ExcelFindType`
- **Case Sensitive** – `true` or `false`
- **Match Entire Cell Content** – `true` or `false`

---

## Find All

Finds every occurrence of the specified text and returns a list of matching ranges.

```csharp
// Search entire workbook
var list = spreadsheet.SearchManager.FindAll(spreadsheet.Workbook, "sample", SearchBy.ByRows, ExcelFindType.Text, false, true);

// To select the matched cell content ranges,

foreach (var cell in list)
{  
  spreadsheet.ActiveGrid.SelectionController.AddSelection(GridRangeInfo.Cell(cell.Row, cell.Column));          
}
```

```csharp
// Search a specific worksheet
var list = spreadsheet.SearchManager.FindAll(spreadsheet.Workbook.Worksheets[0], "sample", SearchBy.ByRows, ExcelFindType.Text, false, true);

// To select the matched cell content ranges,

foreach (var cell in list)
{
  spreadsheet.ActiveGrid.SelectionController.AddSelection(GridRangeInfo.Cell(cell.Row, cell.Column));          
}
```

---

## Find Next

Finds the next occurrence of the search text starting from the current cell.

```csharp
// Search entire workbook (column-wise)
var cell = spreadsheet.SearchManager.FindNext(
    spreadsheet.Workbook,
    "sample",
    SearchBy.ByColumns,
    ExcelFindType.Text,
    false,
    true);

spreadsheet.ActiveGrid.CurrentCell.MoveCurrentCell(cell.Row, cell.Column);
```

```csharp
// Search formulas in a worksheet (row-wise)
var cell = spreadsheet.SearchManager.FindNext(
    spreadsheet.Workbook.Worksheets[0],
    "sum",
    SearchBy.ByRows,
    ExcelFindType.Text,
    false,
    false);
spreadsheet.ActiveGrid.CurrentCell.MoveCurrentCell(cell.Row,cell.Column);
```

---

## Find Conditional Formatting

Searches for cells that contain conditional formatting within a worksheet.

```csharp
var list = spreadsheet.SearchManager.FindConditionalFormatting(
    spreadsheet.Workbook.Worksheets[0]);

foreach (var cell in list)
{
    spreadsheet.ActiveGrid.SelectionController.AddSelection(
        GridRangeInfo.Cell(cell.Row, cell.Column));
}
```

---

## Find Constants

Finds cells that contain constant values. 

```csharp
var list = spreadsheet.SearchManager.FindConstants(
    spreadsheet.Workbook.Worksheets[0]);
```

---

## Find Formulas

Finds all formula cells within a worksheet. 

```csharp
var list = spreadsheet.SearchManager.FindFormulas(
    spreadsheet.Workbook.Worksheets[0]);
```

---

## Find Data Validation

Searches for cells that have data validation rules applied. 

```csharp
var list = spreadsheet.SearchManager.FindDataValidation(
    spreadsheet.Workbook.Worksheets[0]);
```

---

## Replace All

Replaces all occurrences of the specified text within a workbook or worksheet. 

```csharp
// Replace text in entire workbook
spreadsheet.SearchManager.ReplaceAll(
    spreadsheet.Workbook,
    "sample",
    "Sync",
    false,
    false
);
```

```csharp
// Replace text in a specific worksheet
spreadsheet.SearchManager.ReplaceAll(
    spreadsheet.Workbook.Worksheets[0],
    "sample",
    "sync",
    false,
    true
);
```

---

## Replace (Find Next + Update)

Searches for the next matching cell and replaces its value programmatically.

```csharp
var cell = spreadsheet.SearchManager.FindNext(
    spreadsheet.Workbook,
    "sample",
    SearchBy.ByColumns,
    ExcelFindType.Text,
    false,
    true
);

spreadsheet.ActiveGrid.SetCellValue(cell, "sync");
```

---

