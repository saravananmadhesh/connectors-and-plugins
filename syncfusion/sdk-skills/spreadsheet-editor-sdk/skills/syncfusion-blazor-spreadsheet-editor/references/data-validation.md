## Data Validation
> Restrict and guide cell input by applying validation rules to selected cells or ranges, such as lists, whole numbers, decimals, dates, times, or custom formulas.

### PROPERTY
```csharp
AllowDataValidation="true(Default)/false"
```

### BUTTON
<!-- Refer the below button for creating button and update the API public method calling. -->
<button @onclick="#MethodName">#Button Name</button>

### API METHODS
```csharp
// Adds a data validation rule to the specified cell or range.
SpreadsheetRef.AddDataValidationAsync(ValidationRule RULE)

// Removes data validation rules from the specified cell or range.
SpreadsheetRef.RemoveDataValidationAsync(string RANGE)

```
### API Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `#MethodName` | Name of the method calling when clicking the button | - |
| `#Button Name` | Provide a meaning full name to button which binds to API method | - |
| `RULE` | A ValidationRule object that defines the validation settings | new ValidationRule {  Type = ValidationType.WholeNumber,Operator = ValidationOperator.Between,Value1 = "0",Value2 = "100",Range = "A1:A10",IgnoreBlank = true} |
| `RANGE` | A cell address or range from which validation is removed | A1:A10 |

### Features Accessible via Data Validation

**List Validation**
- Restrict entries to a predefined list of values
- Show an in-cell dropdown for quick selection

**Whole Number Validation**
- Allow only integers within a specified range
- Useful for quantity, count, or numeric ID fields

**Decimal Validation**
- Allow decimal values within a defined range
- Useful for scores, percentages, and measurements

**Date Validation**
- Restrict input to valid dates within a date range
- Useful for scheduling and deadline fields

**Time Validation**
- Restrict input to valid time values
- Useful for time tracking and planning scenarios

**Text Length Validation**
- Limit the number of characters entered in a cell
- Useful for codes, names, and short text fields

**Custom Validation**
- Apply validation using a custom formula or expression
- Useful for advanced business rules and conditional checks

### Related Properties that Control Data Validation Options

| Property | Default | Effect when set to "false" |
|---|---|---|
| `AllowDataValidation` | true | Disables adding and removing validation rules through the API and UI |
| `ShowInvalidDataHighlights` | false | Prevents invalid cells from being visually highlighted |
| `AllowEditing` | true | Prevents users from changing cell values, which also reduces the need for validation |

### When Data Validation is Disabled

When `AllowDataValidation` is set to **false**, the following features become unavailable through the UI and API:

- Adding new validation rules
- Removing existing validation rules
- Editing validation settings
- Displaying validation-related prompts and dropdown behavior where applicable

**Note:** Existing workbook validation rules may still be present when files are loaded, but validation actions cannot be managed while the feature is disabled.

### Sheet Protection Impact on Data Validation

When a sheet is protected:
- Validation rules can continue to restrict input for cells that are editable
- Validation changes may be blocked if protection prevents formatting or rule updates
- Invalid value highlighting still depends on both validation and display settings

When a workbook is protected:
- Validation behavior remains tied to the protection permissions of the workbook and sheet
- API calls for adding or removing validation rules may be restricted by protection settings

### Notes
- **AllowDataValidation** is enabled by default; include `AllowDataValidation="false"` only when you want to disable validation operations.
- **ShowInvalidDataHighlights** is useful when you want invalid entries to stand out visually.
- **When using the API methods** `AddDataValidationAsync`, `RemoveDataValidationAsync` ensure the `SfSpreadsheet` component includes `ID="spreadsheet"` so the APIs can target the correct instance.
- **Important:** API methods should **NOT** be called inside `OnInitialized` or `OnParametersSet` lifecycle methods. Even if you call them, they will not work properly. Call API methods in response to user interactions (like button clicks) or in other appropriate lifecycle methods after the component is fully rendered.

### Documentation link
[Blazor Spreadsheet Data Validation](https://help.syncfusion.com/document-processing/excel/spreadsheet/blazor/data-validation)