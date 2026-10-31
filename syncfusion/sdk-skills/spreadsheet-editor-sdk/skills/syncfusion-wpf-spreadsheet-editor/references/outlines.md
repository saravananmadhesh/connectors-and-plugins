# Outlines

> Group or ungroup, Collapse or expand rows and columns, change outline settings and clear outlines in WPF Spreadsheet control.

---

## Overview

Supports outlining to organize data by grouping rows or columns, allowing users to expand or collapse sections.

---

## Key Features
- Group/ungroup rows and columns
- Expand/collapse outline levels
- Organize large datasets

---

## Example

Group rows for monthly data and collapse to show only totals.

## Group rows and columns
```csharp
//Group rows,
var gridRange = GridRangeInfo.Rows(4,8);
spreadsheet.Group(spreadsheet.ActiveSheet, gridRange, ExcelGroupBy.ByRows);

//Group columns,
var gridRange = GridRangeInfo.Cols(4,8);
spreadsheet.Group(spreadsheet.ActiveSheet, gridRange, ExcelGroupBy.ByColumns);
```

## Ungroup rows and columns

```csharp
//UnGroup rows,
var gridRange = GridRangeInfo.Rows(4,8);
spreadsheet.UnGroup(spreadsheet.ActiveSheet, gridRange, ExcelGroupBy.ByRows);

//UnGroup columns,
var gridRange = GridRangeInfo.Cols(4,8);
spreadsheet.UnGroup(spreadsheet.ActiveSheet, gridRange, ExcelGroupBy.ByColumns);
```
## Collapse or Expand Group
```csharp
//Expand Rows,
spreadsheet.ActiveSheet.Range["A4:A8"].ExpandGroup(ExcelGroupBy.ByRows);
spreadsheet.ActiveGrid.RowHeights.SetHidden(4, 8, false);
spreadsheet.RefreshOutlines(true,false);

//Expand Columns,
spreadsheet.ActiveSheet.Range["A3:F3"].ExpandGroup(ExcelGroupBy.ByColumns);
spreadsheet.ActiveGrid.ColumnWidths.SetHidden(1, 6, false);
spreadsheet.RefreshOutlines(false,true);

//Collapse Rows,
spreadsheet.ActiveSheet.Range["A4:A8"].CollapseGroup(ExcelGroupBy.ByRows);
spreadsheet.ActiveGrid.RowHeights.SetHidden(4, 8, true);
spreadsheet.RefreshOutlines(true,false);

//Collapse Columns,
spreadsheet.ActiveSheet.Range["A3:F3"].CollapseGroup(ExcelGroupBy.ByColumns);
spreadsheet.ActiveGrid.ColumnWidths.SetHidden(1, 6, true);
spreadsheet.RefreshOutlines(false,true);
```

## Change Outline Settings
```csharp
// To change the display summary rows to either below or above and summary columns to either left or right of the details in Outlines Group.
spreadsheet.ActiveSheet.PageSetup.IsSummaryRowBelow = false;
spreadsheet.ActiveSheet.PageSetup.IsSummaryColumnRight = false;
spreadsheet.RefreshOutlines(true, true);
```

## Clear Outlines 
```csharp
// To clear all the existing Outlines of the Grouped range
var sheet = spreadsheet.Workbook.Worksheets[0] as WorksheetImpl;

foreach (OutlineWrapper outline in sheet.OutlineWrappers)
{
  outline.OutlineRange.Ungroup(outline.GroupBy);
}
spreadsheet.RefreshOutlines(true, true);
```

## Advanced Outline Operations

### Ungroup All Row Outlines

```csharp
var sheet = spreadsheet.Workbook.Worksheets[0] as WorksheetImpl;
foreach (OutlineWrapper outline in sheet.OutlineWrappers)
{
    if (outline.GroupBy == ExcelGroupBy.ByRows)
    {
        outline.OutlineRange.Ungroup(ExcelGroupBy.ByRows);
    }
}
spreadsheet.RefreshOutlines(true, false);
```

### Ungroup All Column Outlines

```csharp
var sheet = spreadsheet.Workbook.Worksheets[0] as WorksheetImpl;
foreach (OutlineWrapper outline in sheet.OutlineWrappers)
{
    if (outline.GroupBy == ExcelGroupBy.ByColumns)
    {
        outline.OutlineRange.Ungroup(ExcelGroupBy.ByColumns);
    }
}
spreadsheet.RefreshOutlines(false, true);
```

### Auto-Collapse Groups

```csharp
var sheet = spreadsheet.Workbook.Worksheets[0] as WorksheetImpl;
foreach (OutlineWrapper outline in sheet.OutlineWrappers)
{
    // Collapse the group
    outline.OutlineRange.CollapseGroup(outline.GroupBy);
    
    if (outline.GroupBy == ExcelGroupBy.ByRows)
    {
        spreadsheet.ActiveGrid.RowHeights.SetHidden(
            outline.OutlineRange.Row, 
            outline.OutlineRange.LastRow, 
            true);
    }
}
spreadsheet.RefreshOutlines(true, true);
```

### Toggle Outline Summary Row Position

```csharp
var pageSetup = spreadsheet.ActiveSheet.PageSetup;

// Toggle summary rows position (default is below)
pageSetup.IsSummaryRowBelow = !pageSetup.IsSummaryRowBelow;

// Also toggle summary columns position
pageSetup.IsSummaryColumnRight = !pageSetup.IsSummaryColumnRight;

// Refresh the outline display
spreadsheet.RefreshOutlines(true, true);
```

### Get Outline Level Count

```csharp
var sheet = spreadsheet.Workbook.Worksheets[0] as WorksheetImpl;
if (sheet != null && sheet.OutlineWrappers != null)
{
    int maxLevel = 0;
    foreach (OutlineWrapper outline in sheet.OutlineWrappers)
    {
        if (outline.OutlineLevel > maxLevel)
            maxLevel = outline.OutlineLevel;
    }
}
```

---

## References
- [Outlines Documentation](https://help.syncfusion.com/wpf/spreadsheet/outlines)
