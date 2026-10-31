# Number Formatting in Pivot Table

## Table of Contents
- [Overview](#overview)
- [Supported Format Types](#supported-format-types)
- [Define Format Settings](#define-format-settings)
- [Format Type Codes](#format-type-codes)
- [Additional Options](#additional-options)
- [Custom Format Specifiers](#custom-format-specifiers)
- [Toolbar Integration](#toolbar-integration)
- [Best Practices](#best-practices)

## Overview

Number formatting controls how numeric values display in the pivot table. Options include:
- Currency formatting ($, €, £)
- Decimal precision
- Thousand separators
- Percentage formatting
- Custom format patterns
- Date and time formatting

This improves readability and ensures consistent data presentation across all reports.

## Supported Format Types

| Format Type | Description | Example |
|-------------|-------------|---------|
| **Number (N)** | Standard numeric format with decimals | 1,234.56 |
| **Currency (C)** | Currency with symbol | $1,234.56 |
| **Percentage (P)** | Percentage value | 45.67% |
| **Date** | Date/time format | 01/15/2024 |
| **Custom** | User-defined pattern | [pattern] |

## Define Format Settings

Configure formatting using `<e-formatsettings>` and `<e-field>` elements:

```html
<ejs-pivotview id="PivotView" height="300" showFieldList="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-formatsettings>
            <e-field name="Amount" format="C2" currency="USD" maximumSignificantDigits="10" minimumSignificantDigits="1" useGrouping="true"></e-field>
            <e-field name="Quantity" format="N0"></e-field>
            <e-field name="Growth" format="P2"></e-field>
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
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Key Properties in `<e-field>`:**
- `name` - Value field name to format
- `format` - Format code or pattern
- `currency` - Currency code (USD, EUR, GBP, etc.)
- `useGrouping` - Enable thousand separators
- `maximumSignificantDigits` - Max significant digits
- `minimumSignificantDigits` - Min significant digits

## Format Type Codes

### Currency Format (C)

```html
<e-field name="Sales" format="C2" currency="USD"></e-field>
<!-- $1,234.56 (2 decimals) -->

<e-field name="Revenue" format="C0" currency="EUR"></e-field>
<!-- €1,235 (no decimals) -->

<e-field name="Total" format="C3" currency="GBP"></e-field>
<!-- £1,234.567 (3 decimals) -->
```

**Format Variations:**
- `C0` - Currency, no decimals
- `C1` - Currency, 1 decimal
- `C2` - Currency, 2 decimals (most common)
- `C3` - Currency, 3 decimals

**Supported Currencies:**
USD, EUR, GBP, JPY, INR, CHF, CAD, AUD, NZD

### Number Format (N)

```html
<e-field name="Quantity" format="N2" useGrouping="true"></e-field>
<!-- 1,234.56 (2 decimals with grouping) -->

<e-field name="Count" format="N0"></e-field>
<!-- 1,235 (no decimals) -->

<e-field name="Average" format="N4"></e-field>
<!-- 1,234.5678 (4 decimals) -->
```

**Format Variations:**
- `N0` - No decimals, with thousand separators
- `N2` - 2 decimals, with thousand separators
- `N3` - 3 decimals, with thousand separators

### Percentage Format (P)

```html
<e-field name="GrowthRate" format="P2"></e-field>
<!-- 45.67% (2 decimals) -->

<e-field name="SuccessRate" format="P0"></e-field>
<!-- 46% (no decimals) -->
```

### Date and Time Format

```html
<e-formatsettings>
    <e-field name="OrderDate" format="dd/MM/yyyy" type="date"></e-field>
    <e-field name="Timestamp" format="dd/MM/yyyy-hh:mm" type="date"></e-field>
</e-formatsettings>
```

**Date Format Patterns:**
- `dd/MM/yyyy` - Date only
- `dd/MM/yyyy HH:mm` - Date and time
- `mm/dd/yyyy` - US format
- `yyyy-MM-dd` - ISO format

## Additional Options

### UseGrouping (Thousand Separator)

Control thousand separator display:

```html
<!-- With grouping (default) -->
<e-field name="Sales" format="N2" useGrouping="true"></e-field>
<!-- Output: 1,234.56 -->

<!-- Without grouping -->
<e-field name="Sales" format="N2" useGrouping="false"></e-field>
<!-- Output: 1234.56 -->
```

### Currency Code

Specify currency symbol:

```html
<e-formatsettings>
    <e-field name="USRevenue" format="C2" currency="USD"></e-field>
    <e-field name="EURRevenue" format="C2" currency="EUR"></e-field>
    <e-field name="UKRevenue" format="C2" currency="GBP"></e-field>
</e-formatsettings>
```

### Significant Digits Control

Limit the number of significant digits:

```html
<e-field name="Amount" 
    format="C0" 
    maximumSignificantDigits="10" 
    minimumSignificantDigits="1" 
    useGrouping="true">
</e-field>
```

**Properties:**
- `maximumSignificantDigits="10"` - Max 10 significant digits
- `minimumSignificantDigits="1"` - Min 1 significant digit

## Custom Format Specifiers

Define custom number patterns using these format specifiers:

| Specifier | Description | Format Example | Output |
|-----------|-------------|-----------------|--------|
| **0** | Digit placeholder (required) - displays zero if no digit present | `'0000'` | `'0123'` |
| **#** | Digit placeholder (optional) - no digit shown if not present | `'####'` | `'1234'` |
| **.** | Decimal point separator - specifies decimal places | `'###0.##0#'` | `'546321.000'` |
| **%** | Percentage placeholder - converts to percentage format | `'0000 %'` | `'0100 %'` |
| **$** | Currency placeholder - displays currency symbol | `'$ ###.00'` | `'$ 13.00'` |
| **;** | Format separator for positive;negative;zero values | `'###.##;(###.00);-0'` | `'(120.00)'` |
| **'String'** | Literal text in single quotes - preserved in output | `"####.00 '@'"` | `"123.00 @"` |

### Custom Format Examples

```html
<e-formatsettings>
    <!-- Display with unit using literal text -->
    
    <!-- Currency formatting -->
    <e-field name="Sales" format="$ ###.00"></e-field>
    <!-- Output: $ 1234.56 -->
    
    <!-- Percentage formatting -->
    <e-field name="Growth" format="0000 %"></e-field>
    <!-- Output: 0045 % -->
    
    <!-- Multiple values with separate formats: positive;negative;zero -->
    
    <!-- Decimal point control -->
    <e-field name="Precision" format="###0.##0#"></e-field>
    <!-- Output: 546321.000 -->
    
    <!-- Literal text suffix -->
    <e-field name="ItemCount" format="####.00 '@'"></e-field>
    <!-- Output: 1234.00 @ -->
</e-formatsettings>
```

## Toolbar Integration

Enable number formatting through toolbar:

```html
<ejs-pivotview id="pivotview" 
    allowNumberFormatting="true" 
    showToolbar="true" 
    width="100%" 
    height="300" 
    toolbar="@(new List<string>() {"NumberFormatting", "Grid", "Export"})">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" useGrouping="true"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year"></e-field>
            <e-field name="Order_Source" caption="Order Source"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
    <e-displayOption view="Both"></e-displayOption>
</ejs-pivotview>
```

**Toolbar Items:**
- `"NumberFormatting"` - Opens format dialog
- Users can select format, currency, decimals at runtime
- Changes apply immediately to all cells

## Best Practices

✓ **Currency Fields:** Always include currency code
```html
<e-field name="Sales" format="C2" currency="USD"></e-field>
```

✓ **Consistent Decimals:** Use same decimal places for related fields
```html
<e-field name="Sales" format="C2"></e-field>
<e-field name="Cost" format="C2"></e-field>
```

✓ **Thousand Separators:** Enable for better readability with large numbers
```html
<e-field name="Revenue" format="N0" useGrouping="true"></e-field>
```

✓ **Custom Units:** Use quotes for literal text
```html
<e-field name="Weight" format="0.00 'kg'"></e-field>
```

❌ **Avoid:** Percentage format on already-summed percentages (use custom aggregate)

❌ **Avoid:** More than 3 decimal places unless required (overwhelming)

## Important Notes

- Formats **display only**, don't change underlying values
- **Filtering and sorting** use actual values, not formatted text
- **Exports** preserve formatted appearance
- Format applied at **field level** (all instances)
- Custom formats **retained in exports** (Excel, PDF)
- Default format is **general number** (N format)
- Currency code must be **valid ISO 4217** code for proper symbol display
