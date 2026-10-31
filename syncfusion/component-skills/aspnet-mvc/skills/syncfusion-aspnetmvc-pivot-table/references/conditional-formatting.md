# Conditional Formatting in ASP.NET MVC Pivot Table

## Table of Contents
- [Overview](#overview)
- [Enable Conditional Formatting](#enable-conditional-formatting)
- [Configure Programmatically](#configure-programmatically)
- [Apply to All Fields](#apply-to-all-fields)
- [Apply to Specific Field](#apply-to-specific-field)
- [Apply to Specific Row/Column](#apply-to-specific-rowcolumn)
- [Condition Types](#condition-types)
- [Style Properties](#style-properties)
- [Open Dialog Programmatically](#open-dialog-programmatically)
- [Events](#events)

## Overview

Conditional Formatting allows customizing the appearance of pivot table value cells by applying styling based on specific conditions. You can modify:
- Background color
- Font color
- Font family
- Font size

This is useful for highlighting important values, identifying trends, and improving data visualization.

## Enable Conditional Formatting

Enable conditional formatting through the toolbar by setting required properties:

```html
@using Syncfusion.EJ2.PivotView
@model IEnumerable<dynamic>

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Rows(rows => { rows.Name("Country").Add(); })
    .Columns(columns => { columns.Name("Year").Add(); })
    .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).AllowConditionalFormatting(true).ShowToolbar(true).Toolbar(new List<string> { "ConditionalFormatting" }).Height("450").Width("100%").Render()
```

**Key Properties:**
- `AllowConditionalFormatting(true)` - Enables the feature
- `ShowToolbar(true)` - Displays the toolbar
- Toolbar includes "ConditionalFormatting" item for UI access

Users click the "Conditional Formatting" icon to open the dialog and define rules.

## Configure Programmatically

Define formatting rules during initialization using `ConditionalFormatSettings` with the correct conditions and style builder pattern:

```csharp
@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Rows(rows => { rows.Name("Country").Add(); })
    .Columns(columns => { columns.Name("Year").Add(); })
    .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })
    .ConditionalFormatSettings(format => {
        format.Conditions(Syncfusion.EJ2.PivotView.Condition.GreaterThan)
            .Measure("Sales")
            .Value1(100000)
            .Style(style => { 
                style.BackgroundColor("#FFE699")
                     .Color("#000000")
                     .FontSize("14px");
            })
            .Add();
    })).AllowConditionalFormatting(true).Height("450").Width("100%").Render()
```

**Condition Properties:**
- `Conditions()` - Accepts `Syncfusion.EJ2.PivotView.Condition` enum (LessThan, GreaterThan, Between, Equals, etc.)
- `Measure()` - Specifies the value field name
- `Value1()` - Starting value for comparison
- `Value2()` - Ending value (for Between/NotBetween conditions)
- `Style()` - Lambda expression with style builder methods

## Apply to All Fields

Format all value fields with the same rule by omitting `Measure()`:

```csharp
.ConditionalFormatSettings(format => {
    format.Conditions(Syncfusion.EJ2.PivotView.Condition.GreaterThan)
        .Value1(50000)
        .Style(style => { 
            style.BackgroundColor("#FFC7CE")
                 .Color("#9C0006");
        })
        .Add();
})
```

**Result:** Rule applies to every value field in the pivot table.

## Apply to Specific Field

Format only one value field:

```csharp
.ConditionalFormatSettings(format => {
    format.Conditions(Syncfusion.EJ2.PivotView.Condition.LessThan)
        .Measure("Sales")
        .Value1(20000)
        .Style(style => { 
            style.BackgroundColor("#C6EFCE")
                 .Color("#006100");
        })
        .Add();
})
```

**Measure Method:** Specify exact field name (case-sensitive).

## Apply to Specific Row/Column

Format specific row or column members using the `Label()` method:

```csharp
.ConditionalFormatSettings(format => {
    format.Conditions(Syncfusion.EJ2.PivotView.Condition.GreaterThan)
        .Label("USA")
        .Value1(75000)
        .Style(style => { 
            style.BackgroundColor("#FF6B6B")
                 .Color("#FFFFFF")
                 .FontFamily("Arial");
        })
        .Add();
})
```

**Label Method:** Uses header name (row/column member).

## Condition Types

Supported comparison operators:

| Operator | Description | Properties |
|----------|-------------|-----------|
| **Equals** | Exact match | Value1 |
| **GreaterThan** | Value exceeds | Value1 |
| **LessThan** | Value below | Value1 |
| **GreaterThanOrEqualTo** | Value >= | Value1 |
| **LessThanOrEqualTo** | Value <= | Value1 |
| **NotEquals** | Not equal to | Value1 |
| **Between** | Within range | Value1, Value2 |
| **NotBetween** | Outside range | Value1, Value2 |

### Between Condition Example:

```csharp
.ConditionalFormatSettings(format => {
    format.Conditions(Syncfusion.EJ2.PivotView.Condition.Between)
        .Measure("Sales")
        .Value1(50000)
        .Value2(100000)
        .Style(style => { 
            style.BackgroundColor("#FFFFCC");
        })
        .Add();
})
```

## Style Properties

Apply formatting using the style builder lambda with method calls:

```csharp
Style => { 
    style.BackgroundColor("#FFE699")      // Background color
         .Color("#000000")                 // Font color
         .FontFamily("Arial")              // Font family
         .FontSize("14px");                // Font size
}
```

### ApplyGrandTotals Option:

Control whether formatting applies to grand totals:

```csharp
.ConditionalFormatSettings(format => {
    format.Conditions(Syncfusion.EJ2.PivotView.Condition.GreaterThan)
        .Measure("Sales")
        .Value1(100000)
        .ApplyGrandTotals(true)
        .Style(style => { 
            style.BackgroundColor("#FFE699");
        })
        .Add();
})
```

## Open Dialog Programmatically

Open formatting dialog via external button:

```html
<button onclick="openConditionalFormatting()">Configure Formatting</button>

<script>
    function openConditionalFormatting() {
        var pivotObj = document.getElementById('pivotview').ej2_instances[0];
        pivotObj.showConditionalFormattingDialog();
    }
</script>
```

## Events

### ConditionalFormatting Event

Triggered when "ADD CONDITION" is clicked in the dialog:

```html
.ConditionalFormatting("onConditionalFormatting")

<script>
    function onConditionalFormatting(args) {
        // Event parameters:
        // args.conditions - Operator type
        // args.label - Row/column member
        // args.measure - Value field name
        // args.value1 -  Start value
        // args.value2 - End value (Between conditions)
        // args.style - Applied styling
        
        console.log("Applying:", args.conditions, "to", args.measure);
    }
</script>
```

## Best Practices

- **Conditions Enum:** Always use `Syncfusion.EJ2.PivotView.Condition` enum for condition types
- **Style Builder:** Use lambda expressions with `.BackgroundColor()`, `.Color()`, `.FontFamily()`, `.FontSize()` methods
- **Color contrast:** Ensure readability with sufficient contrast
- **Grand totals:** Use `.ApplyGrandTotals(false)` to exclude summary rows
- **Performance:** Limit rules on large datasets
- **Accessibility:** Avoid color-only differentiation
- **Consistency:** Use uniform color schemes and naming conventions
- **Testing:** Verify with actual data before deployment
- **KPI visualization:** Use for highlighting important metrics and trends
- **Values only:** Apply to value fields primarily
- **Multiple conditions:** Chain multiple `.Add()` calls for multiple rules
