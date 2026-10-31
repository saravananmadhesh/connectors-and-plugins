# Data Validation

> Enforce valid data entry in cells using data validation rules in WPF Spreadsheet control.

---

## Overview

Supports restricting cell input to specific types, ranges, or lists. Displays error messages when invalid data is entered.

---

## Key Features
- Restrict input by type (number, date, list, etc.)
- Custom validation formulas
- Error alerts and messages
- Cross-sheet and list validation

---

## Example

Set a cell to accept only numbers between 1 and 100. If a user enters an invalid value, an error message appears.

```csharp
//Number Validation - Between Range
IDataValidation validation = spreadsheet.ActiveSheet.Range["A5"].DataValidation;
validation.AllowType = ExcelDataType.Integer;
validation.CompareOperator = ExcelDataValidationComparisonOperator.Between;
validation.FirstFormula = "4";
validation.SecondFormula = "15";
validation.ShowErrorBox = true;
validation.ErrorBoxText = "Accepts values only between 4 to 15";

//Number Validation - Less Than
IDataValidation validation = spreadsheet.ActiveSheet.Range["A2"].DataValidation;
validation.AllowType = ExcelDataType.Integer;
validation.CompareOperator = ExcelDataValidationComparisonOperator.Less;
validation.FirstFormula = "1000";
validation.ShowErrorBox = true;
validation.ErrorBoxTitle = "Invalid Number";
validation.ErrorBoxText = "Please enter a value less than 1000";
validation.PromptBoxTitle = "Number Entry";
validation.PromptBoxText = "Enter a value less than 1000";
validation.ShowPromptBox = true;

//Date Validation
IDataValidation validation = spreadsheet.ActiveSheet.Range["B4"].DataValidation;
validation.AllowType = ExcelDataType.Date;
validation.CompareOperator = ExcelDataValidationComparisonOperator.Greater;
validation.FirstDateTime = new DateTime(2016,5,5);
validation.ShowErrorBox = true;
validation.ErrorBoxText = "Enter the date value which is greater than 05/05/2016";

//TextLength Validation
IDataValidation validation = spreadsheet.ActiveSheet.Range["A3:B3"].DataValidation;
validation.AllowType = ExcelDataType.TextLength;
validation.CompareOperator = ExcelDataValidationComparisonOperator.LessOrEqual;
validation.FirstFormula = "4";
validation.ShowErrorBox = true;
validation.ErrorBoxText = "Text length should be lesser than or equal 4 characters";

//List Validation
IDataValidation validation = spreadsheet.ActiveSheet.Range["D3"].DataValidation;
validation.ListOfValues = new string[] { "10", "20", "30" };

//Custom Validation
IDataValidation validation = spreadsheet.ActiveSheet.Range["D4"].DataValidation;
validation.AllowType = ExcelDataType.Formula;
validation.FirstFormula = "=A1+A2>0";
validation.ErrorBoxText = "Sum of the values in A1 and A2 should be greater than zero";
```

---

## References
- [Data Validation Documentation](https://help.syncfusion.com/wpf/spreadsheet/data-validation)
