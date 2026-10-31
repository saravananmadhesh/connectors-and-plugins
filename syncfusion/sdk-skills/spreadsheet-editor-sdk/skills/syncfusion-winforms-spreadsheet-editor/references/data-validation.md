# Data Validation in Windows Forms Spreadsheet

Data Validation ensures data integrity by restricting the type or range of values a user can enter into a cell. If the entered data does not meet the specified criteria, an error message is displayed.

**Interface:** `IDataValidation`  
**Access:** `spreadsheet.ActiveSheet.Range["<cell>"].DataValidation`

## Number Validation

Restrict cell input to integer values within a specified range.

**Enum:** `ExcelDataType.Integer`  
**Enum:** `ExcelDataValidationComparisonOperator`

```csharp
IDataValidation validation = spreadsheet.ActiveSheet.Range["A5"].DataValidation;
validation.AllowType = ExcelDataType.Integer;
validation.CompareOperator = ExcelDataValidationComparisonOperator.Between;
validation.FirstFormula = "4";
validation.SecondFormula = "15";
validation.ShowErrorBox = true;
validation.ErrorBoxText = "Accepts values only between 4 to 15";
```

## Date Validation

Restrict cell input to date values satisfying a condition.

**Enum:** `ExcelDataType.Date`

```csharp
IDataValidation validation = spreadsheet.ActiveSheet.Range["B4"].DataValidation;
validation.AllowType = ExcelDataType.Date;
validation.CompareOperator = ExcelDataValidationComparisonOperator.Greater;
validation.FirstDateTime = new DateTime(2016, 5, 5);
validation.ShowErrorBox = true;
validation.ErrorBoxText = "Enter the date value which is greater than 05/05/2016";
```

## Text Length Validation

Restrict the number of characters that can be entered in a cell.

**Enum:** `ExcelDataType.TextLength`

```csharp
IDataValidation validation = spreadsheet.ActiveSheet.Range["A3:B3"].DataValidation;
validation.AllowType = ExcelDataType.TextLength;
validation.CompareOperator = ExcelDataValidationComparisonOperator.LessOrEqual;
validation.FirstFormula = "4";
validation.ShowErrorBox = true;
validation.ErrorBoxText = "Text length should be lesser than or equal to 4 characters";
```

## List Validation (Drop-Down)

Restrict cell input to a predefined list of values. This also renders a ComboBox drop-down in the cell.

```csharp
IDataValidation validation = spreadsheet.ActiveSheet.Range["D4"].DataValidation;
validation.ListOfValues = new string[] { "10", "20", "30" };
```

> **TIP:** To display a ComboBox in a cell, apply List Validation to that cell.

## Custom (Formula-Based) Validation

Use a custom formula to define the validation rule.

**Enum:** `ExcelDataType.Formula`

```csharp
IDataValidation validation = spreadsheet.ActiveSheet.Range["D4"].DataValidation;
validation.AllowType = ExcelDataType.Formula;
validation.FirstFormula = "=A1+A2>0";
validation.ErrorBoxText = "Sum of the values in A1 and A2 should be greater than zero";
```

## IDataValidation Properties

| Property | Type | Description |
|---|---|---|
| `AllowType` | `ExcelDataType` | Specifies the type of data allowed in the cell. |
| `CompareOperator` | `ExcelDataValidationComparisonOperator` | Specifies the comparison operator for the validation rule. |
| `FirstFormula` | `string` | Gets or sets the first formula or value for the validation rule. |
| `SecondFormula` | `string` | Gets or sets the second formula or value (used for `Between` operator). |
| `FirstDateTime` | `DateTime` | Gets or sets the first date value for date-type validation. |
| `SecondDateTime` | `DateTime` | Gets or sets the second date value for date-type validation. |
| `ListOfValues` | `string[]` | Gets or sets the list of allowed values for List Validation. |
| `ShowErrorBox` | `bool` | Gets or sets whether to show an error message box when validation fails. |
| `ErrorBoxText` | `string` | Gets or sets the text displayed in the error message box. |
| `ErrorBoxTitle` | `string` | Gets or sets the title of the error message box. |

## ExcelDataValidationComparisonOperator Values

| Operator | Description |
|---|---|
| `Between` | Value must be between `FirstFormula` and `SecondFormula`. |
| `NotBetween` | Value must not be between `FirstFormula` and `SecondFormula`. |
| `Equal` | Value must equal `FirstFormula`. |
| `NotEqual` | Value must not equal `FirstFormula`. |
| `Greater` | Value must be greater than `FirstFormula`. |
| `Less` | Value must be less than `FirstFormula`. |
| `GreaterOrEqual` | Value must be greater than or equal to `FirstFormula`. |
| `LessOrEqual` | Value must be less than or equal to `FirstFormula`. |

## See Also

- [Editing](editing.md)
- [Protection](protection.md)
