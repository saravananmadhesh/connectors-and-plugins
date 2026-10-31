# Tooltip Features in WinUI Rating

The Rating control provides tooltip support to display rating values when users hover over the control. This enhances user feedback and makes ratings more precise and understandable.

## Table of Contents
- [Enabling Tooltips](#enabling-tooltips)
- [Tooltip Formatting](#tooltip-formatting)
- [Format Patterns](#format-patterns)
- [Use Cases](#use-cases)
- [Best Practices](#best-practices)

## Enabling Tooltips

Display rating values as tooltips using the `EnableToolTip` property.

**Property:** `EnableToolTip`  
**Type:** `bool`  
**Default:** `false`

### Basic Tooltip Usage

**XAML:**
```xml
<syncfusion:SfRating 
    Value="3"
    ItemsCount="5"
    EnableToolTip="True"/>
```

**C#:**
```csharp
SfRating rating = new SfRating();
rating.Value = 3;
rating.ItemsCount = 5;
rating.EnableToolTip = true;
```

### How Tooltips Work

**Behavior:**
- Tooltip appears when mouse hovers over the rating control
- Shows the current rating value or hover value
- Updates dynamically as user hovers over different positions
- Displays formatted value based on `ToolTipFormat` setting

**Default Display:**
- Without `ToolTipFormat`: Shows raw number (e.g., "3", "3.5", "4.2")
- With `ToolTipFormat`: Shows formatted value (e.g., "3.0", "3.50", "4.23")

## Tooltip Formatting

Customize tooltip content using the `ToolTipFormat` property with standard or custom numeric format strings.

**Property:** `ToolTipFormat`  
**Type:** `string`  
**Default:** `null` (no formatting)

### Basic Formatting

**XAML:**
```xml
<syncfusion:SfRating 
    Value="2"
    ItemsCount="5"
    Precision="Exact"
    EnableToolTip="True"
    ToolTipFormat="0.000"/>
```

**C#:**
```csharp
SfRating rating = new SfRating();
rating.Value = 2;
rating.ItemsCount = 5;
rating.Precision = RatingPrecision.Exact;
rating.EnableToolTip = true;
rating.ToolTipFormat = "0.000";
```

**Result:** Tooltip displays "2.000" instead of "2"

## Format Patterns
> See also: [references/tooltip-customization.md](tooltip-customization.md) for Format Patterns, Use Cases, Best Practices, Accessibility, Troubleshooting, and examples.
