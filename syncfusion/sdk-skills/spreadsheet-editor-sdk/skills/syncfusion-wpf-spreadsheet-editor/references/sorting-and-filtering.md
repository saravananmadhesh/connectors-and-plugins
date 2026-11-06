# Sorting and Filtering (WPF Spreadsheet - SfSpreadsheet)

> Concise reference describing how to sort data and apply filters in the Syncfusion WPF `SfSpreadsheet` control (common patterns, API calls, and short code examples).

---

## Overview

This reference explains common sorting and filtering tasks you can perform with `SfSpreadsheet` in a WPF app: sorting rows by one or more columns, applying AutoFilter, using filter-by-condition/value, clearing filters, and reapplying filters after data changes.

---

## Programmatic Sorting and Filtering
```csharp
// To Programmatically appply sorting and filetring data in the spreadsheet.
spreadsheet.WorkbookLoaded += spreadsheet_WorkbookLoaded;

void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
    IRange filterRange = spreadsheet.Workbook.ActiveSheet.Range["A1:D9"];
    spreadsheet.Workbook.ActiveSheet.AutoFilters.FilterRange = filterRange;
    IDataSort sorter = spreadsheet.Workbook.CreateDataSorter();
    sorter.SortRange = spreadsheet.ActiveSheet.Range["A1:D9"];
    ISortField sortField = sorter.SortFields.Add(1, SortOn.Values, OrderBy.Ascending);
    sorter.Sort();
}
```

---

## Filtering


```csharp
// To disable the filtering support in the spreadsheet
spreadsheet.AllowFiltering = false;
```

### Via XAML
```xml
<syncfusion:SfSpreadsheet x:Name="spreadsheet" AllowFiltering="False"/>
```

### Remove AutoFilter

```csharp
spreadsheet.WorkbookLoaded += spreadsheet_WorkbookLoaded;

void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
    var sheet = spreadsheet.Workbook.ActiveSheet;
    // Clear the filter range to remove AutoFilter
    sheet.AutoFilters.FilterRange = null;
}
```
---

## Tips & Notes
- When sorting or filtering, prefer operating on a well-defined contiguous range (exclude summary rows) to avoid moving unrelated cells.
- If your table has a header row, ensure the APIs are called with header-aware ranges or options so headers won't be sorted with data.
- Large datasets: avoid repeated full-sheet operations inside tight loops; batch changes if possible, then reapply sort/filter once.

---

## Reference
- Original documentation (link): https://help.syncfusion.com/document-processing/excel/spreadsheet/wpf/sorting-and-filtering


