# Outline — UWP Spreadsheet

> Learn how to group, ungroup, expand, and collapse rows and columns using Outline support in the Syncfusion UWP Spreadsheet (SfSpreadsheet) control.

---

## Overview

The **Outline** feature in SfSpreadsheet enables grouping of rows or columns similar to Microsoft Excel. Grouped data can be expanded or collapsed to improve readability and navigation of large datasets.

---

## Group Rows and Columns

SfSpreadsheet allows grouping rows or columns within a specified range.

### Group Rows

```csharp
var gridRange = GridRangeInfo.Rows(4, 8);
spreadsheet.Group(
    spreadsheet.ActiveSheet,
    gridRange,
    ExcelGroupBy.ByRows
);
```

### Group Columns

```csharp
var gridRange = GridRangeInfo.Cols(4, 8);
spreadsheet.Group(
    spreadsheet.ActiveSheet,
    gridRange,
    ExcelGroupBy.ByColumns
);
```

---

## Ungroup Rows and Columns

Use `UnGroup` to remove existing outlines from rows or columns.

### Ungroup Rows

```csharp
var gridRange = GridRangeInfo.Rows(4, 8);
spreadsheet.UnGroup(
    spreadsheet.ActiveSheet,
    gridRange,
    ExcelGroupBy.ByRows
);
```

### Ungroup Columns

```csharp
var gridRange = GridRangeInfo.Cols(4, 8);
spreadsheet.UnGroup(
    spreadsheet.ActiveSheet,
    gridRange,
    ExcelGroupBy.ByColumns
);
```

---

## Expand and Collapse Groups

Grouped rows or columns can be expanded or collapsed programmatically.

### Expand Groups

```csharp
// Expand grouped rows
spreadsheet.ActiveSheet.Range["A4:A8"]
    .ExpandGroup(ExcelGroupBy.ByRows);

spreadsheet.ActiveGrid.RowHeights.SetHidden(4, 8, false);
spreadsheet.RefreshOutlines(true, false);
```

```csharp
// Expand grouped columns
spreadsheet.ActiveSheet.Range["A3:F3"]
    .ExpandGroup(ExcelGroupBy.ByColumns);

spreadsheet.ActiveGrid.ColumnWidths.SetHidden(1, 6, false);
spreadsheet.RefreshOutlines(false, true);
```

### Collapse Groups

```csharp
// Collapse grouped rows
spreadsheet.ActiveSheet.Range["A4:A8"]
    .CollapseGroup(ExcelGroupBy.ByRows);

spreadsheet.ActiveGrid.RowHeights.SetHidden(4, 8, true);
spreadsheet.RefreshOutlines(true, false);
```

```csharp
// Collapse grouped columns
spreadsheet.ActiveSheet.Range["A3:F3"]
    .CollapseGroup(ExcelGroupBy.ByColumns);

spreadsheet.ActiveGrid.ColumnWidths.SetHidden(1, 6, true);
spreadsheet.RefreshOutlines(false, true);
```

> **Note:** `RefreshOutlines` must be called to reflect group changes in the UI.

---

## Change Outline Settings

Configure where summary rows and columns appear.

```csharp
spreadsheet.ActiveSheet.PageSetup.IsSummaryRowBelow = false;
spreadsheet.ActiveSheet.PageSetup.IsSummaryColumnRight = false;

spreadsheet.RefreshOutlines(true, true);
```

---

## Clear All Outlines

Remove all outline groups in a worksheet.

```csharp
var sheet = spreadsheet.Workbook.Worksheets[0] as WorksheetImpl;

foreach (OutlineWrapper outline in sheet.OutlineWrappers)
{
    outline.OutlineRange.Ungroup(outline.GroupBy);
}

spreadsheet.RefreshOutlines(true, true);
```

---
