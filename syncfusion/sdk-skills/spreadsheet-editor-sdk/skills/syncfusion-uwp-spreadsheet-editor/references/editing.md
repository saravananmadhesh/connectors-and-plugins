# Editing — UWP Spreadsheet

> Learn how to edit cell values, apply data validation, manage hyperlinks, and control editing behavior in the Syncfusion UWP Spreadsheet (SfSpreadsheet) control.

---

## Overview

The **Editing** feature in SfSpreadsheet provides comprehensive support for modifying cell values, validating user input, and managing hyperlinks. Editing is enabled by default and can be customized or restricted based on application requirements. 

---

## Enable or Disable Editing

Editing is enabled by default. You can disable editing globally by setting the `AllowEditing` property to `false`.

```csharp
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
    spreadsheet.ActiveGrid.AllowEditing = false;
}
```

---

## Editing a Cell Programmatically

### Start Editing

Enter edit mode for the current cell using the `BeginEdit` method. 

```csharp
spreadsheet.ActiveGrid.CurrentCell.BeginEdit(true);
```

### End Editing

You can end cell editing using one of the following methods: 

```csharp
// Validates and ends the edit operation
spreadsheet.ActiveGrid.CurrentCell.ValidateAndEndEdit();

// Commits changes and ends the edit operation
spreadsheet.ActiveGrid.CurrentCell.EndEdit(true);
```

---

## Locking and Unlocking Cells

Locked cells prevent editing and formatting when the worksheet is protected. By default, all cells are locked. You can unlock specific cells to allow editing. 

```csharp
var worksheet = spreadsheet.ActiveSheet;
var excelStyle = worksheet.Range["A2"].CellStyle;

// Unlock a cell
excelStyle.Locked = false;

// Lock a cell
excelStyle.Locked = true;
```

---

## Editing Events

The following events occur during the cell editing lifecycle. These events can be used to validate input or control editing behavior. 

- **CurrentCellBeginEdit** – Triggered when a cell enters edit mode
- **CurrentCellValueChanged** – Triggered when the cell value changes
- **CurrentCellValidating** – Triggered before validating the cell value
- **CurrentCellValidated** – Triggered after validation
- **CurrentCellEndEdit** – Triggered when the cell leaves edit mode

---

## Editing Properties

Key properties associated with editing operations include: 

- **AllowEditing** – Enables or disables editing
- **EditorSelectionBehavior** – Controls text selection behavior in editor
- **EditTrigger** – Specifies triggers for entering edit mode
- **IsEditing** – Indicates whether the current cell is in edit mode

---

## Editing Methods

The following methods are available for managing editing operations: 

- **BeginEdit** – Begins editing the current cell
- **EndEdit** – Commits or cancels editing
- **ValidateAndEndEdit** – Validates and commits editing
- **Validate** – Validates the current cell

---

## Data Validation

Data Validation restricts the type of data that users can enter into a cell. Validation rules can be applied programmatically using the `IDataValidation` interface. 

### ⚠️ IDataValidation Properties

**DO NOT use these unsupported properties:**
- ❌ `ShowInputMessage`
- ❌ `PromptTitle`
- ❌ `PromptMessage`
- ❌ `ErrorTitle`

---

### Number Validation

```csharp
IDataValidation validation = spreadsheet.ActiveSheet.Range["A5"].DataValidation;
validation.AllowType = ExcelDataType.Integer;
validation.CompareOperator = ExcelDataValidationComparisonOperator.Between;
validation.FirstFormula = "4";
validation.SecondFormula = "15";
validation.ShowErrorBox = true;
validation.ErrorBoxText = "Accepts values only between 4 to 15";
```

### Date Validation

```csharp
IDataValidation validation = spreadsheet.ActiveSheet.Range["B4"].DataValidation;
validation.AllowType = ExcelDataType.Date;
validation.CompareOperator = ExcelDataValidationComparisonOperator.Greater;
validation.FirstDateTime = new DateTime(2016, 5, 5);
validation.ShowErrorBox = true;
validation.ErrorBoxText = "Enter the date value which is greater than 05/05/2016";
```

### Text Length Validation

```csharp
IDataValidation validation = spreadsheet.ActiveSheet.Range["A3:B3"].DataValidation;
validation.AllowType = ExcelDataType.TextLength;
validation.CompareOperator = ExcelDataValidationComparisonOperator.LessOrEqual;
validation.FirstFormula = "4";
validation.ShowErrorBox = true;
validation.ErrorBoxText = "Text length should be <= 4 characters";
```

### List Validation

```csharp
IDataValidation validation = spreadsheet.ActiveSheet.Range["D4"].DataValidation;
validation.ListOfValues = new string[] { "10", "20", "30" };
```

### Custom formula Data Validation

```csharp
IDataValidation validation = spreadsheet.ActiveSheet.Range["D4"].DataValidation;
validation.AllowType = ExcelDataType.Formula;
validation.FirstFormula = "=A1+A2>0";
validation.ErrorBoxText = "Sum of A1 and A2 should be greater than zero";
```

> **Tip**: Applying List Validation enables ComboBox-style input for a cell.

---

## Hyperlinks

SfSpreadsheet supports adding, editing, and removing hyperlinks to access web URLs, email addresses, files, or other worksheet locations. 

### Add Hyperlinks

```csharp
// Email hyperlink
var range = spreadsheet.ActiveSheet.Range["A5"];
IHyperLink hyperlink1 = spreadsheet.ActiveSheet.HyperLinks.Add(range);
hyperlink1.Type = ExcelHyperLinkType.Url;
hyperlink1.Address = "mailto:[email protected]";
hyperlink1.TextToDisplay = "Send Mail";
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Cell(5, 1));
```

```csharp
// File hyperlink
var range1 = spreadsheet.ActiveSheet.Range["D5"];
IHyperLink hyperlink2 = spreadsheet.ActiveSheet.HyperLinks.Add(range1);
hyperlink2.Type = ExcelHyperLinkType.File;
hyperlink2.Address = @"C:\Samples\Local";
hyperlink2.TextToDisplay = "File Location";
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Cell(5, 4));
```

```csharp
// Workbook hyperlink
var range2 = spreadsheet.ActiveSheet.Range["C13"];
IHyperLink hyperlink3 = spreadsheet.ActiveSheet.HyperLinks.Add(range2);
hyperlink3.Type = ExcelHyperLinkType.Workbook;
hyperlink3.Address = "Sheet2!C23";
hyperlink3.TextToDisplay = "Sample";
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Cell(13, 3));
```

### Edit or Remove Hyperlinks

```csharp
// Edit hyperlink
var hyperlink = spreadsheet.ActiveSheet.Range["A5"].Hyperlinks[0];
hyperlink.TextToDisplay = "Sample";
hyperlink.Address = "http://help.syncfusion.com";
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Cell(5, 1));

// Remove hyperlink
spreadsheet.ActiveSheet.Range["A5"].Hyperlinks.RemoveAt(0);
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Cell(5, 1));
```

---


