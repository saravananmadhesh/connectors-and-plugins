# Number Formatting in ASP.NET MVC Pivot Table

## Table of Contents
- [Overview](#overview)
- [Supported Format Types](#supported-format-types)
- [Define Format Settings](#define-format-settings)
- [Format Type Codes](#format-type-codes)
- [Additional Options](#additional-options)
- [Custom Format Specifiers](#custom-format-specifiers)
- [Toolbar Integration](#toolbar-integration)
- [External Button Invocation](#external-button-invocation)
- [Best Practices](#best-practices)

## Overview

Number formatting controls how numeric values display in the pivot table. Options include:
- Currency formatting ($, €, £)
- Decimal precision
- Thousand separators
- Percentage formatting
- Custom format patterns

This improves readability and ensures consistent data presentation.

## Supported Format Types

| Format Type | Description | Example |
|-------------|-------------|---------|
| **Number (N)** | Standard numeric format | 1,234.56 |
| **Currency (C)** | Currency with symbol | $1,234.56 |
| **Percentage (P)** | Percentage value | 45.67% |
| **Custom** | User-defined pattern | [pattern] |

## Define Format Settings

Use `FormatSettings` to configure formatting during initialization:

```csharp
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })
        .FormatSettings(fs => {
            fs.Name("Sales")
                .Format("C2")
                .Add();
            fs.Name("Quantity")
                .Format("N0")
                .Add();
        }).Height("450").Width("100%").Render()
```

**Key Properties:**
- `Name()` - Value field name
- `Format()` - Format code or pattern
- `UseGrouping()` - Enable thousand separators
- `Currency()` - Specify currency code

## Format Type Codes

### Supported Summary Types

The `Type()` property accepts the `Syncfusion.EJ2.PivotView.SummaryTypes` enum with the following aggregation types:

| Type | Description | Example |
|------|-------------|---------|
| **Sum** | Adds all values | Total = 1000 + 500 + 750 |
| **Average** | Calculates mean value | Average = 750 |
| **Count** | Counts number of items | Count = 3 |
| **Min** | Finds minimum value | Min = 500 |
| **Max** | Finds maximum value | Max = 1000 |
| **Product** | Multiplies all values | Product = 375,000,000 |
| **StdDev** | Standard deviation | StdDev = 223.6 |
| **StdDevP** | Population standard deviation | StdDevP = 183.0 |
| **Var** | Variance | Var = 50,000 |
| **VarP** | Population variance | VarP = 33,333 |
| **Median** | Median value | Median = 750 |
| **DifferenceFrom** | Difference from reference value | DifferenceFrom = Value - Reference |
| **PercentageOfDifferenceFrom** | Percentage difference | PercentageOfDifferenceFrom = (Value - Reference) / Reference * 100 |
| **PercentageOfParentTotal** | Percentage of parent | PercentageOfParentTotal = (Value / Parent) * 100 |
| **PercentageOfParentRowTotal** | Percentage of row | PercentageOfParentRowTotal = (Value / Row) * 100 |
| **PercentageOfParentColumnTotal** | Percentage of column | PercentageOfParentColumnTotal = (Value / Column) * 100 |
| **PercentageOfGrandTotal** | Percentage of grand total | PercentageOfGrandTotal = (Value / GrandTotal) * 100 |
| **PercentageOfTotal** | Percentage of sum | PercentageOfTotal = (Value / Sum) * 100 |

### Currency Format (C)

```csharp
.Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum)
.Format("C2")  // $1,234.56 (2 decimals)
.Format("C0")  // $1,235 (no decimals)
.Currency("EUR")  // Use Euro symbol
```

### Number Format (N)

```csharp
.Type(Syncfusion.EJ2.PivotView.SummaryTypes.Avg)
.Format("N2")  // 1,234.56 (2 decimals)
.Format("N0")  // 1,235 (no decimals)
.Format("N4")  // 1,234.5678 (4 decimals)
```

### Percentage Format (P)

```csharp
.Type(Syncfusion.EJ2.PivotView.SummaryTypes.PercentageOfTotal)
.Format("P2")  // 45.67% (2 decimals)
.Format("P0")  // 46% (no decimals)
```

## Additional Options

### UseGrouping (Thousand Separator)

Control thousand separator display:

```csharp
.FormatSettings(fs => {
    fs.Name("Sales")
        .Format("N2")
        .UseGrouping(true)
        .Add();
})
```

### Currency Code

Specify currency symbol or code:

```csharp
.FormatSettings(fs => {
    fs.Name("Revenue")
        .Format("C2")
        .Currency("USD")       // $
        .Add();
    fs.Name("EuroSales")
        .Format("C2")
        .Currency("EUR")       // €
        .Add();
})
```

## Custom Format Specifiers

Define custom number patterns:

| Specifier | Meaning | Example |
|-----------|---------|---------|
| **0** | Digit placeholder (required) | "0000" → 0045 |
| **#** | Digit placeholder (optional) | "####" → 45 |
| **.** | Decimal separator | "0.00" |
| **%** | Percentage placeholder | "0.00%" → "45.67%" |
| **$** | Currency placeholder | "$0.00" |
| **,** | Thousand separator | "#,##0.00" → 1,234.56 |
| **;** | Format separator (positive;negative;zero) | "0.00;-0.00;0" |
| **'String'** | Literal text | "0 kg" → "45 kg" |

### Custom Format Examples:

```csharp
.FormatSettings(fs => {
    // Display percentage with symbol
    fs.Name("Growth")
        .Format("0.00% 'Growth'")  // 45.67% Growth
        .Add();
    
    // Currency with thousand separator
    fs.Name("Sales")
        .Format("$#,##0.00")       // $1,234.56
        .Add();
    
    // Format with unit
    fs.Name("Weight")
        .Format("0.00 'kg'")       // 123.45 kg
        .Add();
})
```

## Toolbar Integration

Enable number formatting through the toolbar:

```csharp
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).AllowNumberFormatting(true).ShowToolbar(true).Toolbar(new List<string>{ "NumberFormatting" }).Height("450").Width("100%").Render()

```

**Key Properties:**
- `AllowNumberFormatting(true)` - Enables formatting dialog
- `ShowToolbar(true)` - Displays toolbar
- Toolbar includes "NumberFormatting" button

Users click the "Number Formatting" button to define format rules.

## External Button Invocation

Open the formatting dialog programmatically:

```html
<button onclick="showNumberFormatting()">Configure Formatting</button>

<script>
    function showNumberFormatting() {
        var pivotObj = document.getElementById('pivotview').ej2_instances[0];
        pivotObj.showNumberFormattingDialog();
    }
</script>
```

## Best Practices

- **Type Property:** Always use full namespace `Syncfusion.EJ2.PivotView.SummaryTypes` when specifying aggregation type
- **Consistency:** Use same format for related fields (Revenue, Sales)
- **Precision:** Choose decimals based on data type (currency=2, percentages=1-2)
- **Performance:** Limit custom format complexity
- **Localization:** Consider regional number formats
- **Testing:** Verify displays with edge cases (0, negatives, large numbers)
- **Accessibility:** Ensure format doesn't obscure values
- **Aggregation Type:** Select appropriate SummaryType for your analysis (Sum for totals, Average for means, DifferenceFrom for comparisons)
