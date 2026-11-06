# Hyperlinks and Bookmarks

> Add hyperlinks and bookmarks to cells in WPF Spreadsheet control.

---

## Overview

Supports creating, editing, and importing hyperlinks and bookmarks for easy navigation within or outside the workbook.

---

## Key Features
- Link to web pages, files, email, or worksheet locations
- Create and edit bookmarks
- Navigate quickly using links

---

## Example

Insert a hyperlink to a website or bookmark a specific cell for quick access.

## Add a Hyperlink to a cell
```csharp

// Creating a Hyperlink for e-mail,
var range = spreadsheet.ActiveSheet.Range["A5"];
IHyperLink hyperlink1 = spreadsheet.ActiveSheet.HyperLinks.Add(range);
hyperlink1.Type = ExcelHyperLinkType.Url;
hyperlink1.Address = "mailto:Username@syncfusion.com";
hyperlink1.TextToDisplay="Send Mail";
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Cell(5, 1));

// Creating a Hyperlink for Opening Files,
var range1 = spreadsheet.ActiveSheet.Range["D5"];
IHyperLink hyperlink2 = spreadsheet.ActiveSheet.HyperLinks.Add(range1);
hyperlink2.Type = ExcelHyperLinkType.File;
hyperlink2.Address = @"C:\Samples\Local";
hyperlink2.TextToDisplay = "File Location";
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Cell(5, 4));

//Creating a Hyperlink to refer another cell in the workbook,
var range2 = spreadsheet.ActiveSheet.Range["C13"];
IHyperLink hyperlink3 = spreadsheet.ActiveSheet.HyperLinks.Add(range2);
hyperlink3.Type = ExcelHyperLinkType.Workbook;
hyperlink3.Address = "Sheet2!C23";
hyperlink3.TextToDisplay = "Sample";
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Cell(13, 3));
```

## Edit or Remove a Hyperlink
```csharp

//To Edit a hyperlink in a cell,
var hyperlink = spreadsheet.ActiveSheet.Range["A5"].Hyperlinks[0];
hyperlink.TextToDisplay = "Sample";
hyperlink.Address = "http://help.syncfusion.com";
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Cell(5,1));

//To remove a hyperlink in a cell,
spreadsheet.ActiveSheet.Range["A5"].Hyperlinks.RemoveAt(0);
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Cell(5,1));
```

---

## References
- [Hyperlinks and Bookmarks Documentation](https://help.syncfusion.com/wpf/spreadsheet/hyperlinks)
