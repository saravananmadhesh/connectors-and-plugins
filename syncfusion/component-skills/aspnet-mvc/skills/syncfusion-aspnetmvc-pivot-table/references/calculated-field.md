# Calculated Fields in ASP.NET MVC Pivot Table

## Table of Contents
- [Overview](#overview)
- [Enable Calculated Fields](#enable-calculated-fields)
- [Create Calculated Fields](#create-calculated-fields)
- [Add to Values Axis](#add-to-values-axis)
- [Open Dialog Programmatically](#open-dialog-programmatically)
- [Edit Calculated Fields](#edit-calculated-fields)
- [Rename Calculated Fields](#rename-calculated-fields)
- [Edit Formulas](#edit-formulas)
- [Reuse Formulas](#reuse-formulas)
- [Format Calculated Field Values](#format-calculated-field-values)
- [Supported Operators and Functions](#supported-operators-and-functions)
- [Events](#events)
- [Best Practices](#best-practices)

## Overview

Calculated fields enable creating custom value fields using mathematical formulas based on existing fields. Users can perform complex calculations with arithmetic operators (+, -, *, /) and integrate custom fields into pivot tables for enhanced data visualization. The feature applies only to value fields.

## Enable Calculated Fields

Enable the feature by setting `AllowCalculatedField(true)`. This displays the "CALCULATED FIELD" button in the Field List:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => {
            values.Name("Amount").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
            values.Name("Sold").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
        })).AllowCalculatedField(true).ShowFieldList(true).Height("450").Width("100%").Render()
```

**Key Property:**
- `AllowCalculatedField(true)` - Enables calculated field dialog in Field List UI

## Create Calculated Fields

### Programmatic Configuration

Define calculated fields using the fluent API with `.Name()`, `.Formula()`, `.Add()`:

```html
@using Syncfusion.EJ2.PivotView

@{
    // Define formula as string variable
    var profitFormula = "\"Sum(Amount)\" + \"+\" + \"Sum(Sold)\"";
}

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => {
            values.Name("Amount").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
            values.Name("Sold").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
            values.Name("Total")
                .Type(Syncfusion.EJ2.PivotView.SummaryTypes.CalculatedField)
                .Add();
        })
        .CalculatedFieldSettings(calcFields => {
            calcFields.Name("Total")
                .Formula(profitFormula)
                .Add();
        })).AllowCalculatedField(true).ShowFieldList(true).Height("450").Width("100%").Render()

```

**Formula Construction Pattern:**
```csharp
// Formula referencing existing fields with aggregation
@{ var profitFormula = "\"Sum(Amount)\" + \"+\" + \"Sum(Sold)\""; }
// Result: "Sum(Amount)" + "Sum(Sold)"

// Complex formula with operators
@{ var marginFormula = "\"(Sum(Amount) - Sum(Cost))\" + \"/\" + \"Sum(Amount) * 100\""; }
// Result: (Sum(Amount) - Sum(Cost)) / Sum(Amount) * 100
```

### UI Dialog Method

When `AllowCalculatedField(true)`, users click "CALCULATED FIELD" button in Field List to:
1. Open calculated field dialog
2. Enter field name and formula
3. Select format (Standard, Currency, Percent, Custom, None)
4. Click OK to create

## Add to Values Axis

**CRITICAL:** Calculated fields MUST be added to Values axis to display in pivot table:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => {
            // Original fields
            values.Name("Amount").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
            values.Name("Sold").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
            
            // Calculated field - must include with CalculatedField type
            values.Name("Total")
                .Type(Syncfusion.EJ2.PivotView.SummaryTypes.CalculatedField)
                .Add();
        })
        .CalculatedFieldSettings(calcFields => {
            var totalFormula = "\"Sum(Amount)\" + \"+\" + \"Sum(Sold)\"";
            calcFields.Name("Total")
                .Formula(totalFormula)
                .Add();
        })).AllowCalculatedField(true).Height("450").Width("100%").Render()
```

**Result:** "Total" calculated field appears as value column in pivot table.

## Open Dialog Programmatically

Trigger calculated field dialog from external button:

```html
@using Syncfusion.EJ2.PivotView

<button onclick="openCalculatedFieldDialog()">Add Calculated Field</button>

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => {
            values.Name("Amount").Add();
            values.Name("Sold").Add();
        })).AllowCalculatedField(true).ShowFieldList(true).Height("450").Width("100%").Render()

<script>
    function openCalculatedFieldDialog() {
        var pivotObj = document.getElementById('pivotview').ej2_instances[0];
        pivotObj.createCalculatedFieldDialog();  // Opens dialog
    }
</script>
```

## Edit Calculated Fields

### Edit via Field List

1. Locate calculated field in Field List
2. Click Edit icon next to field name
3. Modify name, formula, or format in dialog
4. Click OK to save changes

### Edit via Grouping Bar

1. Locate calculated field in Grouping Bar
2. Click Edit icon next to field name
3. Update field configuration
4. Click OK to apply

**UI shows different sections:**
- Field name text box at top
- Formula text box at bottom
- Format dropdown (Standard/Currency/Percent/Custom/None)

## Rename Calculated Fields

Rename existing calculated fields at runtime:

1. Click Edit icon on calculated field (in Field List or Grouping Bar)
2. Dialog opens with current name in text box
3. Replace name with preferred name
4. Click OK to save

**Example:** Rename "Total" → "GrandTotal"

## Edit Formulas

Update calculated field formulas:

1. Open calculated field dialog (via Edit icon)
2. Select calculated field from list (if multiple)
3. Click Edit icon next to field
4. Update formula in multiline text box at bottom
5. Click OK to apply

**Result:** Pivot table automatically recalculates with new formula.

## Reuse Formulas

Create new calculated fields from existing ones:

1. Open calculated field dialog to create new field
2. Locate existing calculated field in tree view
3. Drag existing field from tree view
4. Drop into Formula section
5. Formula auto-populates; modify if needed
6. Click OK to create new field

**Benefit:** Ensures formula consistency across calculated fields.

## Format Calculated Field Values

### Programmatic Formatting

Use `FormatSettings` to apply number formats:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => {
            values.Name("Amount").Add();
            values.Name("Total")
                .Type(Syncfusion.EJ2.PivotView.SummaryTypes.CalculatedField)
                .Add();
        })
        .CalculatedFieldSettings(calcFields => {
            calcFields.Name("Total")
                .Formula("\"Sum(Amount)\" + \"*\" + \"1.1\"")  // Add 10% markup
                .Add();
        })
        .FormatSettings(fs => {
            fs.Name("Total")
                .Format("C2")  // Currency format with 2 decimals
                .Add();
        })).AllowCalculatedField(true).Height("450").Width("100%").Render()
```

### UI Formatting

In calculated field dialog, use Format dropdown:
- **Standard** - Basic numeric form
- **Currency** - Currency symbol (e.g., $1,234.56)
- **Percent** - Percentage (e.g., 45.67%)
- **Custom** - User-defined pattern
- **None** (default) - No formatting

## Supported Operators and Functions

### Arithmetic Operators

| Operator | Description | Syntax |
|----------|------------|--------|
| **+** | Addition | X + Y |
| **-** | Subtraction | X - Y |
| **\*** | Multiplication | X * Y |
| **/** | Division | X / Y |
| **^** | Power | X^2 |

### Comparison Operators

| Operator | Description | Syntax |
|----------|------------|--------|
| **<** | Less than | X < Y |
| **<=** | Less than or equal | X <= Y |
| **>** | Greater than | X > Y |
| **>=** | Greater than or equal | X >= Y |
| **==** | Equal | X == Y |
| **!=** | Not equal | X != Y |

### Logical Operators

| Operator | Description | Syntax |
|----------|------------|--------|
| **\|** | OR | X \| Y |
| **&** | AND | X & Y |
| **?** | Conditional | condition ? then : else |

### Functions

| Function | Description | Syntax |
|----------|------------|--------|
| **isNaN()** | Checks if value is NOT a number | isNaN(value) |
| **!isNaN()** | Checks if value IS a number | !isNaN(value) |
| **abs()** | Absolute value | abs(number) |
| **min()** | Minimum value | min(num1, num2) |
| **max()** | Maximum value | max(num1, num2) |

### JavaScript Math Object

Use Math properties and methods directly:
- `Math.PI` - Pi constant
- `Math.sqrt(n)` - Square root
- `Math.pow(x, y)` - Power function
- `Math.ceil()`, `Math.floor()`, `Math.round()` - Rounding
- `Math.sin()`, `Math.cos()`, `Math.tan()` - Trigonometry

### Examples

**Conditional Formula - Profit Margin with Min/Max bounds:**
```csharp
var formula = "((Sum(Amount) - Sum(Cost)) / Sum(Amount)) * 100";
// With conditional: "Sum(Amount) > 10000 ? ((Sum(Amount) - Sum(Cost)) / Sum(Amount)) * 100 : 0"
```

**Complex Formula with Functions:**
```csharp
var formula = "max(Sum(Amount), Sum(Cost)) * min(Sum(Quantity), 100)";
```

**Conditional with AND Operator:**
```csharp
var formula = "Sum(Amount) > 50000 & Sum(Quantity) > 100 ? Sum(Amount) * 0.9 : Sum(Amount)";
```

## Events

### CalculatedFieldCreate Event

Triggered when "OK" button closes calculated field dialog. Allows validation before applying changes:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Amount").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).AllowCalculatedField(true).CalculatedFieldCreate("onCalculatedFieldCreate").Height("450").Width("100%").Render()


<script>
    function onCalculatedFieldCreate(args) {
        // args.calculatedField - Field information from dialog
        // args.CalculatedFieldSettings - Current calculated field settings
        // args.cancel - Set true to prevent dialog changes
        // args.dataSourceSettings - Current data source config
        // args.fieldName - Name of field being created/updated
        
        // Validate: require format to be set
        if (!args.calculatedField.format || args.calculatedField.format === 'None') {
            args.cancel = true;
            alert("Please select a format for calculated field");
        }
    }
</script>
```

**Event Parameters:**
- `calculatedField` - New/existing field info from dialog
- `CalculatedFieldSettings` - Current settings list
- `cancel` - Set true to prevent changes
- `dataSourceSettings` - Current data source config
- `fieldName` - Field being created/updated

### ActionBegin Event

Triggered for calculated field UI interactions before action executes:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Amount").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).AllowCalculatedField(true).ActionBegin("onActionBegin").Height("450").Width("100%").Render()

<script>
    function onActionBegin(args) {
        // args.actionName - Identifies the action (see table below)
        // args.cancel - Set true to prevent action
        // args.dataSourceSettings - Current config
        // args.fieldInfo - Selected field info (when applicable)
        
        if (args.actionName === 'Calculated field dialog opened') {
            console.log("User clicked calculated field button");
        }
    }
</script>
```

**Available Actions:**

| User Action | Action Name |
|-------------|------------|
| Click calculated field button | "Calculated field dialog opened" |
| Click edit icon on existing field | "Edit calculated field" |
| Context menu in dialog | "Calculated field context menu" |

## Best Practices

- **Enable AllowCalculatedField:** Always set to true to enable UI dialog functionality
- **Add to Values:** Calculated field must be added to Values axis with `.Type(Syncfusion.EJ2.PivotView.SummaryTypes.CalculatedField)`
- **Formula Syntax:** Field names in formulas are case-sensitive; must match data exactly
- **Use Aggregation Functions:** Formulas typically use `Sum()`, `Count()`, `Avg()` on field references
- **String Construction:** Build formula strings by concatenating operators and field references
- **Test Formulas:** Verify with sample data before production deployment
- **Formatting:** Apply currency/percentage formats for better readability
- **Performance:** Complex formulas on large datasets may impact performance
- **Naming:** Use descriptive names (e.g., "ProfitMargin" not "calc1")
- **Reuse:** Use formula reuse feature to maintain consistency across calculated fields
- **Validation:** Use CalculatedFieldCreate event to validate before applying
- **Module Injection:** Ensure CalculatedField module is loaded for feature availability
