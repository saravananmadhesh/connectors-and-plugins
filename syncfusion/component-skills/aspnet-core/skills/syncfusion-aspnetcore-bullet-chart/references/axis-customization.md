# Axis Customization in Bullet Chart

## Table of Contents
- [Tick Lines Customization](#tick-lines-customization)
  - [Major and Minor Tick Lines](#major-and-minor-tick-lines)
  - [Tick Line Properties](#tick-line-properties)
  - [Using Range Colors](#using-range-colors)
- [Tick Placement](#tick-placement)
  - [Inside vs. Outside Ticks](#inside-vs-outside-ticks)
  - [Tick Position Options](#tick-position-options)
  - [Example: Outside Ticks](#example-outside-ticks)
- [Label Formatting](#label-formatting)
  - [Basic Label Format](#basic-label-format)
  - [Common Format Codes](#common-format-codes)
- [Number Formatting](#number-formatting)
  - [Decimal Places](#decimal-places)
  - [Currency Format](#currency-format)
  - [Percentage Format](#percentage-format)
- [Grouping Separator](#grouping-separator)
  - [Enable Thousands Separator](#enable-thousands-separator)
  - [Without Grouping](#without-grouping)
- [Custom Label Format](#custom-label-format)
  - [Using Placeholders](#using-placeholders)
  - [Common Custom Formats](#common-custom-formats)
- [Label Placement](#label-placement)
  - [Inside vs. Outside Labels](#inside-vs-outside-labels)
  - [Label Placement Options](#label-placement-options)
  - [Example: Inside Labels](#example-inside-labels)
- [Opposed Axis Position](#opposed-axis-position)
  - [Position Axis on Opposite Side](#position-axis-on-opposite-side)
- [Category Labels](#category-labels)
  - [Enable Category Labels](#enable-category-labels)
  - [Category Label Customization](#category-label-customization)
  - [Category Label Properties](#category-label-properties)
  - [Example: Styled Category Labels](#example-styled-category-labels)
- [Complete Axis Customization Example](#complete-axis-customization-example)
- [Troubleshooting](#troubleshooting)
  - [Labels Overlapping](#labels-overlapping)
  - [Numbers Not Formatted Correctly](#numbers-not-formatted-correctly)
  - [Ticks Not Visible](#ticks-not-visible)

---

## Tick Lines Customization

### Major and Minor Tick Lines

Customize the appearance of major and minor tick lines using `MajorTickLines` and `MinorTickLines` properties:

```cshtml
<ejs-bulletchart id="container" 
    dataSource="@Model.ChartData" 
    valueField="Value" 
    targetField="Target">
    <e-bulletchart-majorticklines width="2" height="8" color="blue"></e-bulletchart-majorticklines>
    <e-bulletchart-minorticklines width="1" height="4" color="red"></e-bulletchart-minorticklines>
</ejs-bulletchart>
```

### Tick Line Properties

| Property | Type | Purpose |
|----------|------|---------|
| `width` | number | Width of the tick line in pixels |
| `height` | number | Height of the tick line in pixels |
| `color` | string | Color of the tick line (hex or color name) |

### Using Range Colors

Automatically apply colors from defined ranges:

```cshtml
<e-bulletchart-majorticklines width="2" height="8"></e-bulletchart-majorticklines>
```

---

## Tick Placement

### Inside vs. Outside Ticks

Control whether ticks appear inside or outside the ranges using `TickPosition`:

```cshtml
<ejs-bulletchart id="container" 
    dataSource="@Model.ChartData" 
    valueField="Value" 
    targetField="Target"
    tickPosition="@Syncfusion.EJ2.Charts.TickPosition.Inside">
</ejs-bulletchart>
```

### Tick Position Options

- `Inside` - Ticks appear inside the ranges 
- `Outside` - Ticks appear outside the ranges (increases chart height and default for better visual integration)

### Example: Outside Ticks

```cshtml
<ejs-bulletchart id="container" 
    tickPosition="@Syncfusion.EJ2.Charts.TickPosition.Outside">
    <e-bulletchart-majorticklines width="3" height="10"></e-bulletchart-majorticklines>
</ejs-bulletchart>
```

---

## Label Formatting

### Basic Label Format

Format axis numeric labels using the `LabelFormat` property:

```cshtml
<ejs-bulletchart id="container" 
    dataSource="@Model.ChartData" 
    valueField="Value" 
    targetField="Target"
    labelFormat="n2">
</ejs-bulletchart>
```

### Common Format Codes

| Format | Result | Description |
|--------|--------|-------------|
| `n1` | 1000.0 | Number with 1 decimal place |
| `n2` | 1000.00 | Number with 2 decimal places |
| `n3` | 1000.000 | Number with 3 decimal places |
| `c1` | $1000.0 | Currency with 1 decimal place |
| `c2` | $1000.00 | Currency with 2 decimal places |
| `p1` | 100.0% | Percentage with 1 decimal place |
| `p2` | 100.00% | Percentage with 2 decimal places |

---

## Number Formatting

### Decimal Places

Display numbers with specific decimal precision:

```cshtml
<!-- Show 2 decimal places -->
<ejs-bulletchart id="container" labelFormat="n2"></ejs-bulletchart>

<!-- Show 3 decimal places -->
<ejs-bulletchart id="container" labelFormat="n3"></ejs-bulletchart>
```

### Currency Format

Display values as currency:

```cshtml
<!-- Dollar format -->
<ejs-bulletchart id="container" labelFormat="c2"></ejs-bulletchart>
```

Data like 1000 displays as `$1000.00`.

### Percentage Format

Display decimal values as percentages:

```cshtml
<ejs-bulletchart id="container" labelFormat="p1"></ejs-bulletchart>
```

Data like 0.75 displays as `75.0%`.

---

## Grouping Separator

### Enable Thousands Separator

Add commas to separate thousands:

```cshtml
<ejs-bulletchart id="container" 
    enableGroupSeparator="true"
    labelFormat="n2">
</ejs-bulletchart>
```

**Result:** 1000000 displays as `1,000,000.00`

### Without Grouping

```cshtml
<ejs-bulletchart id="container" 
    enableGroupSeparator="false"
    labelFormat="n2">
</ejs-bulletchart>
```

**Result:** 1000000 displays as `1000000.00`

---

## Custom Label Format

### Using Placeholders

Create custom format strings with placeholders:

```cshtml
<ejs-bulletchart id="container" labelFormat="${value}K"></ejs-bulletchart>
```

**Result:** 100 displays as `100K`

### Common Custom Formats

```cshtml
<!-- Append "M" for millions -->
<ejs-bulletchart id="container" labelFormat="${value}M"></ejs-bulletchart>

<!-- Append "%" for percentages -->
<ejs-bulletchart id="container" labelFormat="${value}%"></ejs-bulletchart>

<!-- Prefix with currency symbol -->
<ejs-bulletchart id="container" labelFormat="₹${value}"></ejs-bulletchart>

<!-- Append unit -->
<ejs-bulletchart id="container" labelFormat="${value} units"></ejs-bulletchart>
```

---

## Label Placement

### Inside vs. Outside Labels

Control label position relative to tick marks using `labelPosition`:

```cshtml
<ejs-bulletchart id="container" 
    labelPosition="@Syncfusion.EJ2.Charts.LabelsPlacement.Inside">
</ejs-bulletchart>
```

### Label Placement Options

- `Inside` - Labels appear inside the chart area
- `Outside` - Labels appear outside the chart area (default)

### Example: Inside Labels

```cshtml
<ejs-bulletchart id="container" labelPosition="@Syncfusion.EJ2.Charts.LabelsPlacement.Inside"></ejs-bulletchart>
```

---

## Opposed Axis Position

### Position Axis on Opposite Side

Display the axis label and tick on the opposite side:

```cshtml
<ejs-bulletchart id="container" 
    opposedPosition="true">
</ejs-bulletchart>
```

**Default Behavior:** Labels and ticks appear on the left (horizontal) or bottom (vertical)

**With `opposedPosition="true"`:** Labels and ticks appear on the right (horizontal) or top (vertical)

---

## Category Labels

### Enable Category Labels

Display category names alongside values:

```cshtml
<ejs-bulletchart id="container" 
    dataSource="@Model.ChartData" 
    categoryField="Category">
</ejs-bulletchart>
```

### Category Label Customization

Customize the font and style of category labels:

```cshtml
<ejs-bulletchart id="container" 
    categoryField="Category">
    <e-bulletchart-categorylabelstyle 
        size="14" 
        fontFamily="Arial"
        color="blue"
        fontWeight="bold">
    </e-bulletchart-categorylabelstyle>
</ejs-bulletchart>
```

### Category Label Properties

| Property | Type | Purpose |
|----------|------|---------|
| `size` | string | Font size (e.g., "14px") |
| `fontFamily` | string | Font family (e.g., "Arial") |
| `color` | string | Text color (hex or name) |
| `fontWeight` | string | Font weight (normal, bold, 600, etc.) |
| `fontStyle` | string | Font style (normal, italic) |

### Example: Styled Category Labels

```cshtml
<ejs-bulletchart id="container" categoryField="Category">
    <e-bulletchart-categorylabelstyle 
        size="12" 
        fontFamily="Verdana"
        color="#333333"
        fontWeight="600">
    </e-bulletchart-categorylabelstyle>
</ejs-bulletchart>
```

---

## Complete Axis Customization Example

```cshtml
<ejs-bulletchart id="container" 
    dataSource="@Model.ChartData" 
    valueField="Value" 
    targetField="Target"
    categoryField="Category"
    labelFormat="n1"
    enableGroupSeparator="true"
    tickPosition="@Syncfusion.EJ2.Charts.TickPosition.Inside"
    labelPosition="@Syncfusion.EJ2.Charts.LabelsPlacement.Outside"
    opposedPosition="false"
    minimum="0"
    maximum="2500"
    interval="250">
    
    <e-bulletchart-majorticklines width="2" height="8" color="#0066cc"></e-bulletchart-majorticklines>
    <e-bulletchart-minorticklines width="1" height="4" color="#cccccc"></e-bulletchart-minorticklines>
    
    <e-bulletchart-categorylabelstyle 
        size="12" 
        fontFamily="Arial"
        fontWeight="bold">
    </e-bulletchart-categorylabelstyle>
    
</ejs-bulletchart>
```

---

## Troubleshooting

### Labels Overlapping

**Issue:** Category labels are overlapping or hard to read.

**Solution:** Increase font size or use horizontal orientation:
```cshtml
<ejs-bulletchart id="container" orientation="@Syncfusion.EJ2.Charts.OrientationType.Horizontal">
</ejs-bulletchart>
```

### Numbers Not Formatted Correctly

**Issue:** Format code not working as expected.

**Solution:** Verify the format code and data type:
```csharp
// Ensure values are numeric
public double Value { get; set; }  // ✅ Correct for formatting
public string Value { get; set; }  // ❌ Won't format
```

### Ticks Not Visible

**Issue:** Tick marks not appearing on chart.

**Solution:** Check tick color and width:
```cshtml
<!-- Increase visibility -->
<e-bulletchart-majorticklines width="3" height="10" color="black"></e-bulletchart-majorticklines>
```
