# Ranges and Comparative Bars in Bullet Chart

## Table of Contents
- [Understanding Ranges](#understanding-ranges)
  - [What Are Ranges?](#what-are-ranges)
  - [Why Use Ranges?](#why-use-ranges)
- [Configuring Ranges](#configuring-ranges)
  - [Basic Range Setup](#basic-range-setup)
  - [Range Structure](#range-structure)
  - [Setting Minimum and Maximum](#setting-minimum-and-maximum)
- [Range Color Customization](#range-color-customization)
  - [Custom Range Colors](#custom-range-colors)
  - [Color Best Practices](#color-best-practices)
  - [Range Opacity](#range-opacity)
  - [Complete Range Color Example](#complete-range-color-example)
- [Target Bar Overview](#target-bar-overview)
  - [What Is the Target Bar?](#what-is-the-target-bar)
  - [Displaying the Target Bar](#displaying-the-target-bar)
- [Target Bar Types](#target-bar-types)
  - [Available Shapes](#available-shapes)
  - [Target Bar Shape Options](#target-bar-shape-options)
  - [Examples by Type](#examples-by-type)
- [Target Bar Customization](#target-bar-customization)
  - [Target Color](#target-color)
  - [Target Width](#target-width)
  - [Dynamic Target Styling](#dynamic-target-styling)
- [Value Bar Display](#value-bar-display)
  - [What Is the Value Bar?](#what-is-the-value-bar)
  - [Value Bar Properties](#value-bar-properties)
  - [Value Bar Customization](#value-bar-customization)
  - [Value Bar Border](#value-bar-border)
  - [Value Bar Shape](#value-bar-shape)
- [Complete Example](#complete-example)
  - [Three-Tier Performance Dashboard](#three-tier-performance-dashboard)
  - [Data for the Example](#data-for-the-example)
- [Troubleshooting](#troubleshooting)
  - [Target Bar Not Visible](#target-bar-not-visible)
  - [Ranges Overlapping Labels](#ranges-overlapping-labels)
  - [Value Bar Too Thin or Thick](#value-bar-too-thin-or-thick)

---

## Understanding Ranges

### What Are Ranges?

Ranges represent performance quality zones (poor, satisfactory, good) in the Bullet Chart scale. They provide visual context for comparing actual values against targets.

**Key Concepts:**
- Each range has an ending point (`End` property)
- The starting point is either the `Minimum` value or the previous range's end
- Ranges are displayed in background, with value and target bars overlaid

### Why Use Ranges?

- **Visual Context** - Immediately see if performance is in good, fair, or poor zones
- **Color Coding** - Use colors to represent performance levels
- **Standard Benchmarks** - Display industry standards or acceptable performance bands

---

## Configuring Ranges

### Basic Range Setup

Define ranges using the `e-bullet-range-collection`:

```cshtml
<ejs-bulletchart id="container" 
    dataSource="@Model.ChartData" 
    valueField="Value" 
    targetField="Target">
    <e-bullet-range-collection>
        <e-bullet-range end="50"></e-bullet-range>
        <e-bullet-range end="100"></e-bullet-range>
        <e-bullet-range end="150"></e-bullet-range>
    </e-bullet-range-collection>
</ejs-bulletchart>
```

### Range Structure

```
Minimum: 0
├── Range 1: 0 to 50
├── Range 2: 50 to 100
└── Range 3: 100 to 150
Maximum: 150
```

### Setting Minimum and Maximum

```cshtml
<ejs-bulletchart id="container" 
    dataSource="@Model.ChartData" 
    valueField="Value" 
    targetField="Target"
    minimum="0"
    maximum="200">
    <e-bullet-range-collection>
        <e-bullet-range end="75"></e-bullet-range>
        <e-bullet-range end="150"></e-bullet-range>
        <e-bullet-range end="200"></e-bullet-range>
    </e-bullet-range-collection>
</ejs-bulletchart>
```

---

## Range Color Customization

### Custom Range Colors

Assign specific colors to each range:

```cshtml
<e-bullet-range-collection>
    <e-bullet-range end="50" color="#ff6b6b"></e-bullet-range>    <!-- Red: Poor -->
    <e-bullet-range end="100" color="#ffd43b"></e-bullet-range>   <!-- Yellow: Fair -->
    <e-bullet-range end="150" color="#69db7c"></e-bullet-range>   <!-- Green: Good -->
</e-bullet-range-collection>
```

### Color Best Practices

**Standard Performance Indicators:**
- **Red (#ff6b6b)** - Poor/Below target (0-50%)
- **Yellow (#ffd43b)** - Fair/Acceptable (50-75%)
- **Lime green (#51cf66)** - Good/On target (75-90%)
- **Green (#69db7c)** - Excellent/Above target (90-100%)

### Range Opacity

Control range transparency:

```cshtml
<e-bullet-range end="100" color="#0066cc" opacity="0.5"></e-bullet-range>
```

**Opacity Values:**
- `0` - Fully transparent
- `0.5` - 50% transparent
- `1` - Fully opaque (default)

### Complete Range Color Example

```cshtml
<e-bullet-range-collection>
    <e-bullet-range end="20" color="#ff6b6b" opacity="0.8"></e-bullet-range>
    <e-bullet-range end="40" color="#ff8787" opacity="0.8"></e-bullet-range>
    <e-bullet-range end="60" color="#ffd43b" opacity="0.8"></e-bullet-range>
    <e-bullet-range end="80" color="#69db7c" opacity="0.8"></e-bullet-range>
    <e-bullet-range end="100" color="#51cf66" opacity="0.8"></e-bullet-range>
</e-bullet-range-collection>
```

---

## Target Bar Overview

### What Is the Target Bar?

The target bar (comparative measure) is a line marker perpendicular to the chart orientation that represents the target/goal value. It's displayed for each data point and compared against the actual value.

### Displaying the Target Bar

Map the `TargetField` to your target data:

```cshtml
<ejs-bulletchart id="container" 
    dataSource="@Model.ChartData" 
    valueField="Value" 
    targetField="Target">
</ejs-bulletchart>
```

---

## Target Bar Types

### Available Shapes

Control the target bar shape using `TargetTypes`:

```cshtml
@{
    var targetType = new string[] { "Circle" };
}
<ejs-bulletchart id="container"
    dataSource="@Model.ChartData"
    valueField="Value"
    targetField="Target"
    targetTypes="targetType">
</ejs-bulletchart>
```

### Target Bar Shape Options

| Type | Description | Use Case |
|------|-------------|----------|
| `Rect` | Rectangular bar (default) | Standard target marker |
| `Circle` | Circular marker | Prominent target indicator |
| `Cross` | Cross/plus shape | Alternative visual distinction |

### Examples by Type

**Rectangle (Default):**
```cshtml
@{
    var targetType = new string[] { "Rect" };
}
<ejs-bulletchart id="container"
    dataSource="@Model.ChartData"
    valueField="Value"
    targetField="Target"
    targetTypes="targetType">
</ejs-bulletchart>
```

**Circle:**
```cshtml
@{
    var targetType = new string[] { "Circle" };
}
<ejs-bulletchart id="container"
    dataSource="@Model.ChartData"
    valueField="Value"
    targetField="Target"
    targetTypes="targetType">
</ejs-bulletchart>
```

**Cross:**
```cshtml
@{
    var targetType = new string[] { "Cross" };
}
<ejs-bulletchart id="container"
    dataSource="@Model.ChartData"
    valueField="Value"
    targetField="Target" 
    targetTypes="targetType">
</ejs-bulletchart>
```

---

## Target Bar Customization

### Target Color

Set the target bar fill color:

```cshtml
<ejs-bulletchart id="container"
    dataSource="@Model.ChartData"
    valueField="Value"
    targetField="Target"
    targetColor="#000000">
</ejs-bulletchart>
```

### Target Width

Control the thickness of the target bar:

```cshtml
<ejs-bulletchart id="container"
    dataSource="@Model.ChartData"
    valueField="Value"
    targetField="Target" 
    targetWidth="4">
</ejs-bulletchart>
```

**Typical Values:**
- `2` - Thin line
- `3` - Medium line
- `4-5` - Thick line (visible from distance)

### Dynamic Target Styling

Bind target color from data for different styling per row:

```csharp
public class BulletChartData
{
    public double Value { get; set; }
    public double Target { get; set; }
    public string Category { get; set; }
    public string TargetColor { get; set; }  // Dynamic color
}

public void OnGet()
{
    ChartData = new List<BulletChartData>
    {
        new BulletChartData 
        { 
            Value = 75, 
            Target = 80, 
            Category = "Sales", 
            TargetColor = "#0066cc" 
        },
        new BulletChartData 
        { 
            Value = 85, 
            Target = 90, 
            Category = "Revenue", 
            TargetColor = "#00aa44" 
        }
    };
}
```

---

## Value Bar Display

### What Is the Value Bar?

The value bar (feature bar or actual bar) represents the primary data—the current value being measured. It's displayed as a bar extending from zero to the actual value.

### Value Bar Properties

```cshtml
<ejs-bulletchart id="container"
    dataSource="@Model.ChartData"
    valueField="Value"
    targetField="Target" 
    valueFill="#0066cc"
    valueHeight="8">
</ejs-bulletchart>
```

### Value Bar Customization

**Properties:**
- `valueFill` - Bar color/fill
- `valueHeight` - Bar thickness
- `valueBorder` - Border styling

### Value Bar Border

Customize the border around the value bar:

```cshtml
<ejs-bulletchart id="container"
    dataSource="@Model.ChartData"
    valueField="Value"
    targetField="Target">
    <e-bulletchart-valueborder color="#666666" width="2"></e-bulletchart-valueborder>
</ejs-bulletchart>
```

### Value Bar Shape

Control the shape of the actual bar:

```cshtml
<ejs-bulletchart id="container"
    dataSource="@Model.ChartData"
    valueField="Value"
    targetField="Target" 
    type="@Syncfusion.EJ2.Charts.FeatureType.Rect">  <!-- Default -->
</ejs-bulletchart>

<!-- Or use Dot shape -->
<ejs-bulletchart id="container"
    dataSource="@Model.ChartData"
    valueField="Value"
    targetField="Target" 
    type="@Syncfusion.EJ2.Charts.FeatureType.Dot">
</ejs-bulletchart>
```

---

## Complete Example

### Three-Tier Performance Dashboard

```cshtml
@{
    var targetType = new string[] { "Circle" };
}
<ejs-bulletchart id="container" 
    dataSource="@Model.ChartData" 
    valueField="Value" 
    targetField="Target"
    categoryField="Category"
    minimum="0"
    maximum="100"
    interval="20"
    valueFill="#0066cc"
    valueHeight="8"
    targetColor="#000000"
    targetWidth="3"
    targetTypes="targetType"
    title="Quarterly Performance">
    
    <!-- Define performance ranges -->
    <e-bullet-range-collection>
        <e-bullet-range end="33" color="#ff6b6b" opacity="0.6"></e-bullet-range>
        <e-bullet-range end="66" color="#ffd43b" opacity="0.6"></e-bullet-range>
        <e-bullet-range end="100" color="#69db7c" opacity="0.6"></e-bullet-range>
    </e-bullet-range-collection>
    
    <!-- Customize value bar border -->
    <e-bulletchart-valueborder color="#003366" width="1"></e-bulletchart-valueborder>
    
</ejs-bulletchart>
```

### Data for the Example

```csharp
public class QuarterlyPerformance
{
    public double Value { get; set; }
    public double Target { get; set; }
    public string Category { get; set; }
}

public List<QuarterlyPerformance> ChartData { get; set; }
public void OnGet()
{
    ChartData = new List<QuarterlyPerformance>
    {
        new QuarterlyPerformance { Value = 72, Target = 80, Category = "Q1 Sales" },
        new QuarterlyPerformance { Value = 85, Target = 90, Category = "Q2 Sales" },
        new QuarterlyPerformance { Value = 65, Target = 75, Category = "Q3 Sales" },
        new QuarterlyPerformance { Value = 92, Target = 88, Category = "Q4 Sales" }
    };
}
```

---

## Troubleshooting

### Target Bar Not Visible

**Issue:** Target bar doesn't appear on chart.

**Solution:** Verify target data and width:
```cshtml
<!-- Increase visibility -->
<ejs-bulletchart id="container"
    dataSource="@Model.ChartData"
    valueField="Value"
    targetField="Target" 
    targetWidth="5" 
    targetColor="#000000">
</ejs-bulletchart>
```

### Ranges Overlapping Labels

**Issue:** Range colors make text hard to read.

**Solution:** Reduce opacity or use lighter colors:
```cshtml
<e-bullet-range end="100" color="#ccccff" opacity="0.3"></e-bullet-range>
```

### Value Bar Too Thin or Thick

**Issue:** Value bar visibility issues.

**Solution:** Adjust height:
```cshtml
<ejs-bulletchart id="container"
    dataSource="@Model.ChartData"
    valueField="Value"
    targetField="Target" 
    valueHeight="10">
</ejs-bulletchart>
```
