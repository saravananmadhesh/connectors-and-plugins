# Color Mapping in ASP.NET MVC TreeMap Control

## Table of Contents
- [Overview](#overview)
- [Range Color Mapping](#range-color-mapping)
- [Equal Color Mapping](#equal-color-mapping)
- [Desaturation Color Mapping](#desaturation-color-mapping)
- [Color Mapping Properties Reference](#color-mapping-properties-reference)
- [Advanced Color Mapping](#advanced-color-mapping)
- [Troubleshooting Color Mapping](#troubleshooting-color-mapping)

## Overview

Color mapping allows you to apply colors to TreeMap items based on data values. Different color mapping types support different use cases: applying colors across ranges (e.g., low to high performance), applying specific colors to matching values (e.g., categories), or using opacity levels.

### Color Mapping Types

| Type | Use Case | Example |
|------|----------|---------|
| **Range** | Color gradient based on numeric ranges | $0-50K: Red, $50-100K: Yellow, $100K+: Green |
| **Equal** | Specific color for specific values | Category A: Blue, Category B: Red |
| **Desaturation** | Opacity-based coloring (light to dark) | Low priority: light gray, High priority: dark gray |

### Core Color Mapping Properties

```razor
.ColorMapping(colors => { /* configuration */ })
.RangeColorValuePath("PropertyName")     // For range mapping
.EqualColorValuePath("PropertyName")     // For equal mapping
```

## Range Color Mapping

Range color mapping applies colors based on numeric ranges. Items with values falling within a range receive the corresponding color.

### When to Use Range Color Mapping

- Sales performance (low/medium/high performers)
- Temperature display (cold/warm/hot)
- Efficiency ratings (inefficient/average/efficient)
- Numeric grades or scores

### Range Color Mapping Properties

| Property | Type | Purpose |
|----------|------|---------|
| **From** | numeric | Start value of range |
| **To** | numeric | End value of range |
| **Color** | string | Color name or hex code (e.g., "Red", "#FF0000") |

### Complete Range Color Mapping Example

**Controller:**
```csharp
public ActionResult RangeColorMap()
{
    var data = new List<object>
    {
        new { Company = "Apple", Revenue = 365.8m },
        new { Company = "Microsoft", Revenue = 198.3m },
        new { Company = "Google", Revenue = 282.8m },
        new { Company = "Amazon", Revenue = 469.8m },
        new { Company = "Meta", Revenue = 114.6m },
        new { Company = "Tesla", Revenue = 81.5m },
        new { Company = "Nvidia", Revenue = 60.9m }
    };
    return View(data);
}
```

**View:**
```razor
@model List<object>

@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .WeightValuePath("Revenue")
    .RangeColorValuePath("Revenue")
    .Levels(levels =>
    {
        levels.GroupPath("Company").Add();
    })
    .LeafItemSettings(leaf => leaf.LabelPath("Company"))
    .ColorMapping(colors =>
    {
        colors.From(0).To(150).Color("Red").Add();           // $0-150B: Red
        colors.From(150).To(300).Color("Yellow").Add();      // $150-300B: Yellow
        colors.From(300).To(500).Color("Green").Add();       // $300-500B: Green
    })
    .Tooltip(tooltip => 
        tooltip.Visible(true)
               .Format("<b>${Company}</b><br/>Revenue: $${Revenue}B"))
    .Render();

<style>
    #container {
        height: 500px;
    }
</style>
```

**Expected Output:**
- Apple, Microsoft, Google, Amazon: Green (high revenue, >$300B)
- Google: Green (>$300B)
- Meta, Tesla, Nvidia: Red (low revenue, <$150B)
- Rectangles colored according to their revenue range

### Range Color Mapping Best Practices

1. **Non-Overlapping Ranges:** Ensure ranges don't overlap to prevent ambiguity
2. **Progressive Colors:** Use related colors for visual progression (Red → Yellow → Green)
3. **Meaningful Thresholds:** Choose ranges that align with business logic
4. **Cover Full Range:** Define ranges covering your data's minimum to maximum values

```csharp
// ✅ Good: Clear, non-overlapping, progressive colors
colors.From(0).To(50).Color("Red").Add();
colors.From(50).To(100).Color("Yellow").Add();
colors.From(100).To(150).Color("Green").Add();

// ❌ Bad: Overlapping ranges (ambiguous)
colors.From(0).To(75).Color("Red").Add();
colors.From(50).To(100).Color("Yellow").Add();  // Overlaps with first range
```

## Equal Color Mapping

Equal color mapping applies specific colors to items matching specific values. It's useful for categorical data where each category should have a distinct color.

### When to Use Equal Color Mapping

- Department types (Sales, Engineering, HR, Finance)
- Status values (Active, Pending, Inactive)
- Product categories (Electronics, Furniture, Clothing)
- Geographic regions (North, South, East, West)

### Equal Color Mapping Properties

| Property | Type | Purpose |
|----------|------|---------|
| **Value** | string | The exact value to match |
| **Color** | string | Color for matching items |

### Complete Equal Color Mapping Example

**Controller:**
```csharp
public ActionResult EqualColorMap()
{
    var data = new List<object>
    {
        new { Department = "Sales", Employees = 45 },
        new { Department = "Engineering", Employees = 120 },
        new { Department = "Marketing", Employees = 30 },
        new { Department = "HR", Employees = 20 },
        new { Department = "Finance", Employees = 35 },
        new { Department = "Operations", Employees = 50 }
    };
    return View(data);
}
```

**View:**
```razor
@Model List<object>

@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .WeightValuePath("Employees")
    .EqualColorValuePath("Department")
    .Levels(levels =>
    {
        levels.GroupPath("Department").Add();
    })
    .LeafItemSettings(leaf => leaf.LabelPath("Department"))
    .ColorMapping(colors =>
    {
        colors.Value("Sales").Color("Red").Add();
        colors.Value("Engineering").Color("Blue").Add();
        colors.Value("Marketing").Color("Green").Add();
        colors.Value("HR").Color("Orange").Add();
        colors.Value("Finance").Color("Purple").Add();
        colors.Value("Operations").Color("Brown").Add();
    })
    .Tooltip(tooltip => 
        tooltip.Visible(true)
               .Format("<b>${Department}</b><br/>Employees: $${Employees}"))
    .Render();

<style>
    #container {
        height: 500px;
    }
</style>
```

**Expected Output:**
- Each department has a distinct color (Sales=Red, Engineering=Blue, etc.)
- Engineering has the largest rectangle (120 employees)
- Sales has second-largest (45 employees)
- HR has the smallest (20 employees)
- Colors match the mapping regardless of size

### Equal Color Mapping Best Practices

1. **Distinct Colors:** Use easily distinguishable colors for different values
2. **Cover All Values:** Define mappings for all possible values in your data
3. **Consistent Mapping:** Use the same color for the same value across applications
4. **Accessibility:** Avoid red-green combinations for colorblind accessibility

```csharp
// ✅ Good: Distinct, accessible colors
colors.Value("High").Color("Green").Add();      // Clear, accessible
colors.Value("Medium").Color("Blue").Add();     // No red-green conflict
colors.Value("Low").Color("Orange").Add();

// ❌ Bad: Similar colors, hard to distinguish
colors.Value("High").Color("Red").Add();
colors.Value("Medium").Color("Orange").Add();   // Too similar to Red
colors.Value("Low").Color("Green").Add();       // Red-green conflict
```

## Desaturation Color Mapping

Desaturation color mapping applies a single base color with varying opacity levels. Items are colored light (low opacity) to dark (high opacity) based on their values.

### When to Use Desaturation Color Mapping

- Sequential data visualization (1st, 2nd, 3rd, etc.)
- Priority levels (Low, Medium, High)
- Time progression (past → present → future)
- Hierarchical levels

### Desaturation Color Mapping Properties

| Property | Type | Purpose |
|----------|------|---------|
| **Color** | string | Base color (will be desaturated) |
| **MinOpacity** | decimal | Minimum opacity (0.0-1.0) for lowest values |
| **MaxOpacity** | decimal | Maximum opacity (0.0-1.0) for highest values |

### Complete Desaturation Color Mapping Example

**Controller:**
```csharp
public ActionResult DesaturationColorMap()
{
    var data = new List<object>
    {
        new { Priority = "Critical", TaskCount = 95 },
        new { Priority = "High", TaskCount = 75 },
        new { Priority = "Medium", TaskCount = 50 },
        new { Priority = "Low", TaskCount = 25 },
        new { Priority = "Backlog", TaskCount = 10 }
    };
    return View(data);
}
```

**View:**
```razor
@Model List<object>

@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .WeightValuePath("TaskCount")
    .RangeColorValuePath("TaskCount")
    .Levels(levels =>
    {
        levels.GroupPath("Priority").Add();
    })
    .LeafItemSettings(leaf => leaf.LabelPath("Priority"))
    .ColorMapping(colors =>
    {
        colors.Color("Blue").MinOpacity(0.2m).MaxOpacity(1.0m).Add();
    })
    .Tooltip(tooltip => 
        tooltip.Visible(true)
               .Format("<b>${Priority}</b><br/>Tasks: $${TaskCount}"))
    .Render();

<style>
    #container {
        height: 500px;
    }
</style>
```

**Expected Output:**
- All rectangles are shades of blue
- Critical (95 tasks): Dark blue (high opacity)
- High (75 tasks): Medium blue
- Medium (50 tasks): Light medium blue
- Low (25 tasks): Light blue (low opacity)
- Backlog (10 tasks): Very light blue (minimum opacity)
- Opacity increases with task count

### Desaturation Color Mapping Best Practices

1. **Opacity Range:** Ensure 0.0 ≤ MinOpacity < MaxOpacity ≤ 1.0
2. **Clear Contrast:** MinOpacity should be light enough to see (0.2+)
3. **Single Color:** Use a single base color for consistency
4. **Order Matters:** Higher opacity = higher values

```csharp
// ✅ Good: Clear opacity range
colors.Color("Blue").MinOpacity(0.2m).MaxOpacity(1.0m).Add();

// ❌ Bad: Too narrow range, hard to distinguish
colors.Color("Blue").MinOpacity(0.9m).MaxOpacity(1.0m).Add();

// ❌ Bad: Reversed opacity (confusing)
colors.Color("Blue").MinOpacity(1.0m).MaxOpacity(0.2m).Add();
```

## Color Mapping Properties Reference

### ColorMapping Configuration

All color mapping types are configured through the ColorMapping method:

```razor
.ColorMapping(colors =>
{
    // Range mapping
    colors.From(value).To(value).Color("ColorName").Add();
    
    // Equal mapping
    colors.Value("Value").Color("ColorName").Add();
    
    // Desaturation mapping
    colors.Color("ColorName").MinOpacity(decimal).MaxOpacity(decimal).Add();
})
```

### Supported Color Formats

```csharp
// Color name (CSS color name)
.Color("Red")
.Color("Blue")
.Color("Green")

// Hex color code
.Color("#FF0000")        // Red
.Color("#00FF00")        // Green
.Color("#0000FF")        // Blue

// RGB format
.Color("rgb(255,0,0)")   // Red
.Color("rgb(0,255,0)")   // Green
```

### RangeColorValuePath and EqualColorValuePath

These properties specify which data field is used for color determination:

```razor
// For range mapping - must be numeric
.RangeColorValuePath("Revenue")      // Property with numeric values
.ColorMapping(colors =>
{
    colors.From(0).To(100).Color("Red").Add();
})

// For equal mapping - any type
.EqualColorValuePath("Category")     // Property with categorical values
.ColorMapping(colors =>
{
    colors.Value("CategoryA").Color("Red").Add();
})

// For desaturation - must be numeric
.RangeColorValuePath("Score")        // Numeric field for opacity calculation
.ColorMapping(colors =>
{
    colors.Color("Blue").MinOpacity(0.2m).MaxOpacity(1.0m).Add();
})
```

## Advanced Color Mapping

### Multiple Color Ranges with Business Logic

Create intuitive color ranges based on business metrics:

```csharp
var data = new List<object>
{
    new { Product = "ProductA", SalesGrowth = -15 },    // Negative growth
    new { Product = "ProductB", SalesGrowth = 0 },      // No growth
    new { Product = "ProductC", SalesGrowth = 15 },     // Moderate growth
    new { Product = "ProductD", SalesGrowth = 45 }      // Strong growth
};

@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .WeightValuePath("SalesGrowth")
    .RangeColorValuePath("SalesGrowth")
    .ColorMapping(colors =>
    {
        colors.From(-50).To(0).Color("Red").Add();       // Loss: Red
        colors.From(0).To(20).Color("Yellow").Add();     // Small gain: Yellow
        colors.From(20).To(50).Color("Green").Add();     // Large gain: Green
    })
    .Render();
```

### Dynamic Color Mapping

Change color mapping based on user selection:

```javascript
var treemap = document.getElementById('container').ej2_instances[0];

function updateColorMapping(colorType) {
    if (colorType === 'range') {
        treemap.colorMapping = [
            { from: 0, to: 50, color: 'Red' },
            { from: 50, to: 100, color: 'Green' }
        ];
    } else if (colorType === 'equal') {
        treemap.colorMapping = [
            { value: 'A', color: 'Red' },
            { value: 'B', color: 'Blue' }
        ];
    }
}
```

## Troubleshooting Color Mapping

### Issue: No Colors Applied / All Same Color

**Cause:** ColorMapping not configured or RangeColorValuePath/EqualColorValuePath missing.

**Solution:**
1. Verify ColorMapping is added to your TreeMap configuration
2. Specify RangeColorValuePath or EqualColorValuePath
3. Check property names match your data

```razor
// ✅ Correct: ColorMapping with RangeColorValuePath
.RangeColorValuePath("Revenue")
.ColorMapping(colors =>
{
    colors.From(0).To(100).Color("Red").Add();
})

// ❌ Incorrect: ColorMapping without RangeColorValuePath
.ColorMapping(colors =>
{
    colors.From(0).To(100).Color("Red").Add();
})
// Missing: .RangeColorValuePath("Revenue")
```

### Issue: Unexpected Color Assignment

**Cause:** Overlapping color ranges or incorrect value paths.

**Solution:**
1. Verify ranges don't overlap
2. Check that RangeColorValuePath property exists in data
3. Ensure values are numeric for range mapping

```csharp
// ✅ Correct: Non-overlapping ranges
colors.From(0).To(50).Color("Red").Add();
colors.From(50).To(100).Color("Green").Add();

// ❌ Incorrect: Overlapping (ambiguous)
colors.From(0).To(75).Color("Red").Add();
colors.From(50).To(100).Color("Green").Add();  // Value 50-75 matches both!
```

### Issue: Equal Mapping Not Working

**Cause:** Value names don't match exactly (case-sensitive).

**Solution:**
1. Check exact spelling and case
2. Verify value exists in data
3. Add mappings for all possible values

```csharp
// ✅ Correct: Exact matching
.EqualColorValuePath("Status")
.ColorMapping(colors =>
{
    colors.Value("Active").Color("Green").Add();
    colors.Value("Inactive").Color("Red").Add();
})

// Data must have: Status = "Active" (case must match)
new { Status = "Active", ... }

// ❌ Incorrect: Case mismatch
colors.Value("active").Color("Green").Add();  // lowercase
// Data has: Status = "Active"  // uppercase (doesn't match)
```

### Issue: Desaturation Not Visible

**Cause:** MinOpacity too high (items appear fully opaque) or MaxOpacity too low.

**Solution:**
1. Ensure MinOpacity is significantly lower than MaxOpacity (0.2 to 1.0 recommended)
2. Verify single color mapping is used, not multiple
3. Check RangeColorValuePath is set

```csharp
// ✅ Good: Clear difference between min and max
colors.Color("Blue").MinOpacity(0.2m).MaxOpacity(1.0m).Add();

// ❌ Bad: No visible difference
colors.Color("Blue").MinOpacity(0.95m).MaxOpacity(1.0m).Add();

// ❌ Bad: Multiple colors (desaturation only works with one)
colors.Color("Red").MinOpacity(0.2m).MaxOpacity(1.0m).Add();
colors.Color("Blue").MinOpacity(0.2m).MaxOpacity(1.0m).Add();  // Wrong!
```

### Issue: Colors Not Matching Legend

**Cause:** Legend color mapping not synchronized with TreeMap mapping.

**Solution:**
Ensure legend configuration matches your color mapping:

```razor
.LegendSettings(legend =>
{
    legend.Visible(true)
          .LabelDisplayMode(LabelDisplayMode.All);
})
.ColorMapping(colors =>
{
    colors.From(0).To(50).Color("Red").Add();
    colors.From(50).To(100).Color("Green").Add();
})
```

The legend will automatically use colors from ColorMapping.

