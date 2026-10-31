# Data Labels in HeatMap

## Table of Contents
- [Data Labels Overview](#data-labels-overview)
- [Enabling Data Labels](#enabling-data-labels)
- [Label Formatting](#label-formatting)
- [Label Positioning](#label-positioning)
- [Label Styling](#label-styling)
- [Advanced Customization](#advanced-customization)
- [Common Use Cases](#common-use-cases)

## Data Labels Overview

Data labels display cell values directly on the HeatMap, providing immediate visibility without hovering. They:
- Show exact values at a glance
- Enhance data readability
- Support custom formatting
- Improve accessibility
- Reduce dependency on legends

### Basic Label Display

```csharp
@Html.EJS().HeatMap("container")
    .CellSettings(cellSettings =>
    {
        cellSettings.ShowLabel(true);
    })
    .Render()
```

## Enabling Data Labels

### Show All Labels

Display values for all cells:

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
})
```

### Hide All Labels

Hide cell values:

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(false);
})
```

### Toggle Labels Dynamically

Control labels at runtime:

```csharp
<script>
function toggleLabels() {
    var heatmap = document.getElementById("container").ej2_instances[0];
    heatmap.cellSettings.showLabel = !heatmap.cellSettings.showLabel;
    heatmap.refresh();
}
</script>

<button onclick="toggleLabels()">Toggle Labels</button>
```

## Label Formatting

### Default Formatting

Display values as-is:

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    cellSettings.Format("0");  // Integer display
})
```

### Decimal Places

Format with specific decimal precision:

```csharp
// One decimal place
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    cellSettings.Format("0.0");
})

// Two decimal places
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    cellSettings.Format("0.00");
})
```

### Percentage Format

Display as percentages:

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    cellSettings.Format("0.00\\%");  // Shows: "45.50%"
})
```

### Currency Format

Format as currency:

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    cellSettings.Format("$#,##0.00");  // Shows: "$1,234.56"
})
```

### Thousands Separator

Add thousand separators:

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    cellSettings.Format("#,##0");  // Shows: "1,234"
})
```

### Scientific Notation

Use exponential format:

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    cellSettings.Format("0.00e+00");  // Shows: "1.23e+02"
})
```

### Custom Format Strings

| Format | Value | Display |
|--------|-------|---------|
| "0" | 123.45 | 123 |
| "0.00" | 123.4 | 123.40 |
| "#,##0" | 1234.5 | 1,235 |
| "0.0\\%" | 0.5 | 50.0% |
| "$#,##0.00" | 1234 | $1,234.00 |

### Template-Based Formatting

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    cellSettings.LabelTemplate("#=value# pts");
})
```

Result: "125 pts" instead of just "125"

## Label Positioning

### Default Position

Labels centered in cells:

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    cellSettings.TextAlignment(Syncfusion.EJ2.HeatMap.TextAlignment.Center);
})
```

### Alignment Options

| Alignment | Position |
|-----------|----------|
| Center | Center of cell |
| Left | Left side of cell |
| Right | Right side of cell |

### Right Alignment

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    cellSettings.TextAlignment(Syncfusion.EJ2.HeatMap.TextAlignment.Right);
})
```

### Left Alignment

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    cellSettings.TextAlignment(Syncfusion.EJ2.HeatMap.TextAlignment.Left);
})
```

## Label Styling

### Font Size

Control label text size:

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    cellSettings.LabelStyle(style =>
    {
        style.FontSize("14px");
    });
})
```

### Font Family

Set label typeface:

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    cellSettings.LabelStyle(style =>
    {
        style.FontFamily("Arial");
        style.FontSize("12px");
    });
})
```

### Font Weight

Make labels bold or normal:

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    cellSettings.LabelStyle(style =>
    {
        style.FontWeight("bold");
        style.Color("#ffffff");
    });
})
```

### Text Color

Set label text color:

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    cellSettings.LabelStyle(style =>
    {
        style.Color("#000000");  // Black text
    });
})
```

### Complete Label Styling

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    cellSettings.Format("0.0");
    cellSettings.TextAlignment(Syncfusion.EJ2.HeatMap.TextAlignment.Center);
    cellSettings.LabelStyle(style =>
    {
        style.FontFamily("Segoe UI");
        style.FontSize("13px");
        style.FontWeight("bold");
        style.Color("#ffffff");
    });
})
```

## Advanced Customization

### Conditional Label Display

Show labels only for specific cells:

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    cellSettings.LabelTemplate("#=value > 100 ? value : ''#");
})
// Shows values only if > 100
```

### Highlight High Values

Emphasize important values:

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    cellSettings.LabelTemplate("#=value > 500 ? '<b>' + value + '</b>' : value#");
})
```

### Display with Units

Add units to values:

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    cellSettings.LabelTemplate("#=value + ' units'#");
})
// Shows: "250 units"
```

### Conditional Color

Change label color based on value:

```csharp
<script>
function getTextColor(value) {
    if (value > 500) return '#00aa00';  // Green
    if (value > 250) return '#ffaa00';  // Orange
    return '#aa0000';                    // Red
}
</script>

.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    cellSettings.LabelTemplate("<span style='color: " + 
        getTextColor(/*value*/) + "'>#=value#</span>");
})
```

### Abbreviate Large Values

Show abbreviated values for large numbers:

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    cellSettings.LabelTemplate(
        "#=" + 
        "value >= 1000000 ? (value/1000000).toFixed(1) + 'M' : " +
        "value >= 1000 ? (value/1000).toFixed(1) + 'K' : " +
        "value" +
        "#"
    );
})
// Shows: "1.5M" for 1500000, "2.3K" for 2300
```

## Common Use Cases

### Use Case 1: Sales Dashboard

Display sales values with currency format:

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    cellSettings.Format("$#,##0");
    cellSettings.LabelStyle(style =>
    {
        style.FontWeight("bold");
        style.FontSize("12px");
    });
})
```

### Use Case 2: Performance Metrics

Show percentages with one decimal:

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    cellSettings.Format("0.0\\%");
    cellSettings.LabelStyle(style =>
    {
        style.Color("#333333");
    });
})
```

### Use Case 3: Correlation Matrix

Display correlation coefficients (-1 to 1):

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    cellSettings.Format("0.00");
    cellSettings.LabelStyle(style =>
    {
        style.FontSize("11px");
    });
})
```

### Use Case 4: Inventory Status

Show stock count without decimals:

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    cellSettings.Format("0");
    cellSettings.LabelTemplate("#=value + ' units'#");
})
```

### Use Case 5: Temperature Heatmap

Display temperatures with degree symbol:

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    cellSettings.Format("0.0\\°C");
    cellSettings.LabelStyle(style =>
    {
        style.FontSize("12px");
        style.FontWeight("bold");
    });
})
```

### Use Case 6: Sparse Data

Hide labels for zero values:

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    cellSettings.LabelTemplate("#=value > 0 ? value : ''#");
})
// Empty cells for zero values, labels for others
```

## Best Practices

1. **Readability**: Use sufficient font size (12px minimum)
2. **Contrast**: Ensure text color contrasts with background
3. **Format**: Choose format matching data type
4. **Density**: Avoid excessive labels in tight layouts
5. **Alignment**: Center-align for consistency
6. **Updates**: Refresh labels when data changes
7. **Accessibility**: Pair labels with color coding

Data labels enhance HeatMap usability by providing direct value visibility without additional interactions.
