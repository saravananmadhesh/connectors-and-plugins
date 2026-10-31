# Worksheet Management — UWP Spreadsheet

## Insert and Delete
SfSpreadsheet provides support to insert and delete the worksheets in a workbook.
```csharp
//Insert Sheet
spreadsheet.AddSheet();
	
//Insert sheet with name
spreadsheet.AddSheet("Sheet4", 3);

//Delete Sheet
spreadsheet.RemoveSheet("Sheet2");
```

## Hide and Unhide

SfSpreadsheet provides support to hide and unhide the worksheets in a workbook.
```csharp
//Hide Sheet
spreadsheet.HideSheet("Sheet2");

//Unhide Sheet
spreadsheet.UnhideSheet("Sheet2");
```

## Rename a sheet 
SfSpreadsheet provides support to rename a worksheet in the workbook programmatically by using RenameSheet method.
```csharp
//To Rename a sheet programmatically
spreadsheet.RenameSheet("ExistingSheetName", "NewSheetName");
```

## Protection

### Protecting a worksheet

```csharp
//Protect the sheet with password
spreadsheet.ProtectSheet(spreadsheet.ActiveSheet, "123");

//Protect the sheet with Protection options
spreadsheet.ProtectSheet(spreadsheet.ActiveSheet, "123", ExcelSheetProtection.FormattingCells);

//Unprotect the sheet
spreadsheet.UnProtectSheet(spreadsheet.ActiveSheet, "123");
```
### Protecting a workbook 

```csharp
// To Protect the Workbook 
spreadsheet.Protect(true, true, "123");

//To Unprotect the Workbook
spreadsheet.Unprotect("123");
```
### The Protect sheet options are

LockedCells - Allows the users to select the locked cells of the protected worksheet.

UnLockedCells - Allows the users to select the unlocked cells of the protected worksheet.

FormattingCells - Allows the users to format any cell on a protected worksheet.

FormattingRows - Allows the users to format any row on a protected worksheet.

FormattingColumns - Allows the users to format any column on a protected worksheet.

InsertingRows - Allows the users to insert rows on the protected worksheet.

InsertingColumns - Allows the users to insert columns on the protected worksheet.

InsertingHyperlinks - Allows the users to insert hyperlinks on the protected worksheet.

DeletingRows - Allows the users to delete rows on the protected worksheet.

DeletingColumns - Allows the users to delete columns on the protected worksheet.


## Gridlines
SfSpreadsheet provides support to control the visibility and color of the Gridlines in a worksheet.

```csharp
//To show GridLines
spreadsheet.SetGridLinesVisibility(true);

//To hide GridLines
spreadsheet.SetGridLinesVisibility(false);
```

## Headings
SfSpreadsheet provides support to control the visibility of row and column headers in a worksheet

```csharp
//To hide the Header cells visibility
spreadsheet.SetRowColumnHeadersVisibility(false);

```

## Zooming
SfSpreadsheet provides support to zoom in and zoom out of a worksheet view. The property AllowZooming determines whether to allow zooming or not.

```csharp
//zoom factor
spreadsheet.SetZoomFactor("Sheet1", 200);
```
