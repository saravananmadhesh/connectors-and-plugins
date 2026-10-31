# Calculated Fields in Pivot Table

## Table of Contents
- [Overview](#overview)
- [Enable Calculated Fields](#enable-calculated-fields)
- [Create Calculated Fields Programmatically](#create-calculated-fields-programmatically)
- [Opening Dialog Programmatically](#opening-dialog-programmatically)
- [Edit Calculated Fields](#edit-calculated-fields)
- [Rename Calculated Fields](#rename-calculated-fields)
- [Reusing Existing Formulas](#reusing-existing-formulas)
- [Format Calculated Field Values](#format-calculated-field-values)
- [Supported Operators and Functions](#supported-operators-and-functions)
- [Events](#events)

## Overview

Calculated fields enable users to create custom value fields using mathematical formulas combining existing fields from the data source. Users can perform complex calculations with basic arithmetic operators and seamlessly integrate these custom fields into the pivot table for enhanced data visualization and reporting.

## Enable Calculated Fields

To enable calculated field functionality, set the `allowCalculatedField` property to **true**:

```html
<ejs-pivotview id="pivotview" allowCalculatedField="true" showFieldList="true">
</ejs-pivotview>
```

When enabled, a "CALCULATED FIELD" button appears in the Field List UI. Clicking this opens the calculated field dialog for creating and managing custom fields.

## Create Calculated Fields Programmatically

Configure calculated fields using `e-calculatedfieldsettings`. Field names in formulas must be wrapped in quotes and use aggregation functions like `Sum()`, `Count()`, `Avg()`, `Min()`, `Max()`.

### Tag Helper (Recommended for ASP.NET Core):

```html
@{
    var amount = "\"" + "Sum(Amount)" + "\"";
    var sold = "\"" + "Sum(Sold)" + "\"";
    var totalPrice = amount + "+" + sold;
}

<ejs-pivotview id="PivotView" height="300" allowCalculatedField="true" showFieldList="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" useGrouping="true"></e-field>
            <e-field name="Total" format="C0"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
            <e-field name="Total" type="CalculatedField"></e-field>
        </e-values>
        <e-calculatedfieldsettings>
            <e-field name="Total" formula="@totalPrice"></e-field>
        </e-calculatedfieldsettings>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Key Points:**
- Uses Tag Helper syntax with `<ejs-pivotview>` and `<e-*>` child elements
- Modern, cleaner, and recommended approach for ASP.NET Core
- Calculated field formula constructed in C# and passed via `formula="@totalPrice"` attribute
- Each field configuration uses separate `<e-field name="">` tags
- Set `type="CalculatedField"` on the value field to display in pivot table

## Formula Syntax

**Critical Rule:** Field names must be wrapped in quotes and use aggregation functions with concatenation:

```csharp
// Construct formula in C#
var amount = "\"" + "Sum(Amount)" + "\"";  // Results in: "Sum(Amount)"
var sold = "\"" + "Sum(Sold)" + "\"";      // Results in: "Sum(Sold)"
var totalPrice = amount + "+" + sold;      // Results in: "Sum(Amount)"+"Sum(Sold)"
```

**Formula Examples:**
- `"Sum(Amount)" + "+" + "Sum(Sold)"` - Total of two fields
- `"Sum(Profit)" + "/" + "Sum(Revenue) * 100"` - Profit margin percentage
- `"Count(Orders)" + "*" + "Sum(UnitPrice)"` - Total weighted count

**Supported Aggregations:**
- `Sum()` - Total of values
- `Count()` - Number of records
- `Avg()` - Average value
- `Min()` - Minimum value
- `Max()` - Maximum value

## Opening Dialog Programmatically

Trigger the calculated field dialog from an external button:

```html
<button onclick="openCalculatedFieldDialog()">Add Calculated Field</button>

<ejs-pivotview id="PivotView" allowCalculatedField="true" showFieldList="true">
    <!-- configuration -->
</ejs-pivotview>

<script>
    function openCalculatedFieldDialog() {
        var pivotObj = document.getElementById('PivotView').ej2_instances[0];
        pivotObj.createCalculatedFieldDialog();
    }
</script>
```

## Edit Calculated Fields

### Via Field List
1. Locate the calculated field in the Field List
2. Click the Edit icon (pencil) next to the field name
3. Modify name, formula, or format in the dialog
4. Click OK to save changes

### Via Grouping Bar
1. Locate the calculated field in the Grouping Bar
2. Click the Edit icon
3. Update the field configuration
4. Click OK to apply changes

## Rename Calculated Fields

To rename an existing calculated field at runtime:

1. Click the Edit icon on the calculated field (in Field List or Grouping Bar)
2. Change the field name in the text box at the top of dialog
3. Click OK to save the new name

## Reusing Existing Formulas

Create new calculated fields by reusing formulas from existing fields:

1. Open the calculated field dialog to create new field
2. Locate an existing calculated field in the tree view
3. Drag it from the tree view
4. Drop into the **Formula** section at the bottom
5. Formula auto-populates; modify if needed
6. Click OK to create new calculated field

This ensures formula consistency across multiple calculated fields.

## Format Calculated Field Values

### Programmatic Formatting

Apply formats using `e-formatsettings`:

```html
<e-formatsettings>
    <e-field name="Total" format="C0"></e-field>
    <e-field name="ProfitMargin" format="0.##"></e-field>
</e-formatsettings>
```

### UI Format Options

In the calculated field dialog, use the "Format" dropdown:
- **Standard** - Basic numeric form (1234.56)
- **Currency** - Currency format ($1,234.56)
- **Percent** - Percentage format (45.67%)
- **Custom** - User-defined format pattern
- **None** - No formatting (default)

## Supported Operators and Functions

### Arithmetic Operators
```
+  : Addition
-  : Subtraction
*  : Multiplication
/  : Division
^  : Power operator (X^2)
```

### Comparison Operators
```
<  : Less than
<= : Less than or equal
>  : Greater than
>= : Greater than or equal
== : Equal
!= : Not equal
```

### Logical Operators
```
|  : OR operator
&  : AND operator
?  : Conditional operator (condition ? then : else)
```

### Built-in Functions
```
isNaN(value)   : Check if value is NOT a number
!isNaN(value)  : Check if value IS a number
abs(number)    : Absolute value
min(num1, num2): Minimum value
max(num1, num2): Maximum value
```

### JavaScript Math Object
Use Math object methods directly: `Math.PI`, `Math.sqrt()`, `Math.pow()`, `Math.ceil()`, `Math.floor()`, `Math.round()`, `Math.sin()`, `Math.cos()`, `Math.tan()`

## Events

### CalculatedFieldCreate

Triggered when the "OK" button closes the calculated field dialog. Validates field details before applying:

```html
<ejs-pivotview id="PivotView" calculatedFieldCreate="onCalculatedFieldCreate">
</ejs-pivotview>

<script>
    function onCalculatedFieldCreate(args) {
        // Prevent creating calculated field without format
        if (!args.calculatedField.format) {
            args.cancel = true;
            alert("Please select a format for the calculated field");
        }
    }
</script>
```

**Event Parameters:**
- `calculatedField` - Contains calculated field information (name, formula, format)
- `cancel` - Set to true to prevent changes from being applied
- `dataSourceSettings` - Current data source settings
- `fieldName` - Name of the field being created or updated

### ActionBegin

Triggered before calculated field operations. Allows monitoring or restricting user actions:

```html
<ejs-pivotview id="PivotView" actionBegin="onActionBegin">
</ejs-pivotview>

<script>
    function onActionBegin(args) {
        if (args.actionName === "Open calculated field dialog") {
            // Allow or prevent dialog opening
        }
    }
</script>
```

**Event Parameters:**
- `actionName` - Name of the action being performed (see table below)
- `cancel` - Set to true to prevent the action
- `dataSourceSettings` - Current data source configuration

| User Action | Action Name |
|-------------|-------------|
| Click calculated field button | Open calculated field dialog |
| Click edit icon on existing field | Edit calculated field |
| Right-click context menu in dialog tree view | Calculated field context menu |

## Important Notes

- **Calculated fields apply only to value fields** - Cannot be placed in rows, columns, or filters
- **Must add to Values axis** - Use `type="CalculatedField"` in `e-values` to display in pivot table
- **Field names must be quoted** - Always use `"Sum(Amount)"` not just `Amount`
- **Use aggregation functions** - `Sum()`, `Count()`, `Avg()`, `Min()`, `Max()` are required
- **Case-sensitive field names** - Must match data source field names exactly
- **Formula construction** - Use C# string concatenation to build formulas: `amount + "+" + sold`
- **Module injection** - CalculatedField module must be injected for feature to work
- **Performance** - Complex formulas on large datasets may impact performance; consider server-side aggregation
