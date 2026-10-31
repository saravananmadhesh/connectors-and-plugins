# Outlines

Spreadsheet provides support for outlines like in excel which makes your data easier to view. You can group or ungroup the data's either by rows or columns.

## Grouping rows and columns

Spreadsheet provides support to group the specified range in a worksheet.

### To Group the rows/columns

```csharp
//Group rows,
var gridRange = GridRangeInfo.Rows(4,8);
spreadsheet.Group(spreadsheet.ActiveSheet, gridRange, ExcelGroupBy.ByRows);

//Group columns,
var gridRange = GridRangeInfo.Cols(4,8);
spreadsheet.Group(spreadsheet.ActiveSheet, gridRange, ExcelGroupBy.ByColumns);
```

## Ungrouping rows and columns

Spreadsheet provides support to ungroup the specified range in a worksheet.

### To Ungroup the rows/columns

```csharp
//Ungroup rows,
var gridRange = GridRangeInfo.Rows(4,8);
spreadsheet.UnGroup(spreadsheet.ActiveSheet, gridRange, ExcelGroupBy.ByRows);

//Ungroup columns,
var gridRange = GridRangeInfo.Cols(4,8);
spreadsheet.UnGroup(spreadsheet.ActiveSheet, gridRange, ExcelGroupBy.ByColumns);
```

## Collapsing or expanding group

Groups can be Expanded by ExpandGroup method and Collapsed by CollapseGroup method of XlsIO.

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

> **NOTE**
>
> RefreshOutlines method is invoked to refresh/update the Outlines of the Group in Spreadsheet.

## Changing Outline settings

In Spreadsheet, users can change the outline settings by changing the display of summary rows to either below or above the details and summary columns to either left or right of the details in Outlines Group.

```csharp
spreadsheet.ActiveSheet.PageSetup.IsSummaryRowBelow = false;
spreadsheet.ActiveSheet.PageSetup.IsSummaryColumnRight = false;
spreadsheet.RefreshOutlines(true, true);
```

## Clearing Outlines

Spreadsheet provides support to clear all the Outlines of the Grouped range.

```csharp
var sheet = spreadsheet.Workbook.Worksheets[0] as WorksheetImpl;

foreach (OutlineWrapper outline in sheet.OutlineWrappers)
{
  outline.OutlineRange.Ungroup(outline.GroupBy);
}
spreadsheet.RefreshOutlines(true, true);
```