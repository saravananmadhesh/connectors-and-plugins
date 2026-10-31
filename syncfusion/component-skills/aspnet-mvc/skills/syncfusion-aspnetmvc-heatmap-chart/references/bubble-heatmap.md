# Bubble HeatMap Visualization

## Table of Contents
- [Bubble HeatMap Overview](#bubble-heatmap-overview)
- [Creating Bubble HeatMap](#creating-bubble-heatmap)
- [Size Mapping](#size-mapping)
- [Color Mapping](#color-mapping)
- [Bubble Types](#bubble-types)
- [Advanced Customization](#advanced-customization)
- [Use Cases](#use-cases)

## Bubble HeatMap Overview

Bubble HeatMap extends traditional HeatMap to visualize three variables simultaneously:
- **X-Axis**: First dimension (category or time)
- **Y-Axis**: Second dimension (category or series)
- **Bubble Size**: Third dimension (numeric value)
- **Bubble Color**: Optional fourth dimension (value range)

This provides powerful multi-dimensional data visualization for complex analysis.

### When to Use Bubble HeatMap

- Visualizing three-variable relationships
- Market analysis (market size, growth, share)
- Correlations with weighted importance
- Portfolio analysis (risk, return, allocation)
- Hierarchical data representation

### Basic Bubble HeatMap

```csharp
@Html.EJS().HeatMap("container")
    .DataSource((IEnumerable<object>)Model)
    .BubbleDataMapping(bubble =>
    {
        bubble.XDataMapping("X");
        bubble.YDataMapping("Y");
        bubble.SizeDataMapping("Value");
        bubble.ColorDataMapping("Value");
    })
    .Render()
```

## Creating Bubble HeatMap

### Data Structure for Bubble HeatMap

```csharp
public class BubbleData
{
    public string X { get; set; }      // X-axis category
    public string Y { get; set; }      // Y-axis category
    public double Value { get; set; }  // Bubble size/color
    public double ColorValue { get; set; }  // Optional: color separate from size
}

// Controller
public ActionResult Index()
{
    var bubbleData = new List<BubbleData>
    {
        new BubbleData { X = "Product A", Y = "Region 1", Value = 150, ColorValue = 75 },
        new BubbleData { X = "Product B", Y = "Region 2", Value = 200, ColorValue = 85 },
        new BubbleData { X = "Product C", Y = "Region 3", Value = 250, ColorValue = 95 }
    };

    return View(bubbleData);
}
```

### Basic Bubble HeatMap Setup

```csharp
@Html.EJS().HeatMap("container")
    .XAxis(xaxis =>
    {
        xaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .YAxis(yaxis =>
    {
        yaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .DataSource((IEnumerable<object>)Model)
    .BubbleDataMapping(bubble =>
    {
        bubble.XDataMapping("X");
        bubble.YDataMapping("Y");
        bubble.SizeDataMapping("Value");
    })
    .Render()
```

### Bubble with Row and Column Headers

```csharp
@Html.EJS().HeatMap("container")
    .XAxis(xaxis =>
    {
        xaxis.Labels(new List<string> { "Product A", "Product B", "Product C" });
        xaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .YAxis(yaxis =>
    {
        yaxis.Labels(new List<string> { "Region 1", "Region 2", "Region 3" });
        yaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .DataSource((IEnumerable<object>)Model)
    .BubbleDataMapping(bubble =>
    {
        bubble.XDataMapping("X");
        bubble.YDataMapping("Y");
        bubble.SizeDataMapping("Value");
    })
    .Render()
```

## Size Mapping

### Basic Size Mapping

Map data values to bubble size:

```csharp
.BubbleDataMapping(bubble =>
{
    bubble.SizeDataMapping("Value");
    bubble.SizeMinimum(5);
    bubble.SizeMaximum(50);
})
```

### Size Range Configuration

Control minimum and maximum bubble dimensions:

```csharp
.BubbleDataMapping(bubble =>
{
    bubble.SizeDataMapping("Value");
    bubble.SizeMinimum(10);  // Smallest bubble size in pixels
    bubble.SizeMaximum(100); // Largest bubble size in pixels
})
```

### Size with Value Range

```csharp
.BubbleDataMapping(bubble =>
{
    bubble.SizeDataMapping("Value");
    bubble.SizeMinimum(2);
    bubble.SizeMaximum(60);
})

// Data with Value range: 10-1000
// 10 -> 2px, 1000 -> 60px
```

### Scaling Bubbles

Adjust overall bubble scale:

```csharp
.BubbleDataMapping(bubble =>
{
    bubble.SizeDataMapping("Value");
    bubble.SizeMinimum(15);
    bubble.SizeMaximum(80);
})
```

## Color Mapping

### Size-Based Color

Use same data for size and color:

```csharp
.BubbleDataMapping(bubble =>
{
    bubble.SizeDataMapping("Value");
    bubble.ColorDataMapping("Value");
})
```

### Separate Color Mapping

Map different data to color:

```csharp
public class BubbleData
{
    public string X { get; set; }
    public string Y { get; set; }
    public double Size { get; set; }
    public double Color { get; set; }  // Different from size
}

// View
.BubbleDataMapping(bubble =>
{
    bubble.SizeDataMapping("Size");
    bubble.ColorDataMapping("Color");
})
```

### Color Palette for Bubbles

```csharp
.Palette(new List<string>
{
    "#1a9850",  // Green (low)
    "#91cf60",
    "#d9ef8b",
    "#fee08b",
    "#fc8d59",
    "#e34a33",  // Red (high)
    "#b30000"
})
.BubbleDataMapping(bubble =>
{
    bubble.SizeDataMapping("Value");
    bubble.ColorDataMapping("Color");
})
```

### Fixed Color by Range

```csharp
.Legend(legend => { legend.Visible(true); })
.BubbleDataMapping(bubble =>
{
    bubble.SizeDataMapping("Value");
    bubble.ColorDataMapping("Category");
})
```

## Bubble Types

### Circle Bubbles (Default)

```csharp
.BubbleDataMapping(bubble =>
{
    bubble.SizeDataMapping("Value");
    bubble.Type(Syncfusion.EJ2.HeatMap.BubbleType.Circle);
})
```

### Sector Bubbles

Pie-chart style bubble representation:

```csharp
.BubbleDataMapping(bubble =>
{
    bubble.SizeDataMapping("Value");
    bubble.Type(Syncfusion.EJ2.HeatMap.BubbleType.Sector);
})
```

### Combination View

```csharp
@Html.EJS().HeatMap("container")
    .DataSource((IEnumerable<object>)Model)
    .BubbleDataMapping(bubble =>
    {
        bubble.SizeDataMapping("Value");
        bubble.ColorDataMapping("Value");
        bubble.Type(Syncfusion.EJ2.HeatMap.BubbleType.Circle);
    })
    .CellSettings(cellSettings =>
    {
        cellSettings.ShowLabel(true);
        cellSettings.Format("0.0");
    })
    .Render()
```

## Advanced Customization

### Bubble Border

```csharp
.BubbleDataMapping(bubble =>
{
    bubble.SizeDataMapping("Value");
})
.CellSettings(cellSettings =>
{
    cellSettings.Border(border =>
    {
        border.Color("#ffffff");
        border.Width(2);
    });
})
```

### Bubble Styling

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.Opacity(0.9);
    cellSettings.Border(border =>
    {
        border.Color("#cccccc");
        border.Width(1);
    });
})
```

### Labels on Bubbles

Display values on bubble centers:

```csharp
.BubbleDataMapping(bubble =>
{
    bubble.SizeDataMapping("Value");
})
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    cellSettings.Format("0.0");
    cellSettings.LabelStyle(style =>
    {
        style.FontSize("12px");
        style.Color("#ffffff");
        style.FontWeight("bold");
    });
})
```

### Interactive Bubble Tooltips

```csharp
.Tooltip(tooltip =>
{
    tooltip.Visible(true);
    tooltip.Format(
        "<b>{xLabel} - {yLabel}</b><br/>" +
        "Size: {value}<br/>" +
        "Category: Product A"
    );
})
.BubbleDataMapping(bubble =>
{
    bubble.SizeDataMapping("Value");
})
```

### Complete Bubble Configuration

```csharp
@Html.EJS().HeatMap("container")
    .DataSource((IEnumerable<object>)Model)
    .XAxis(xaxis =>
    {
        xaxis.Labels(new List<string> { "Jan", "Feb", "Mar", "Apr" });
        xaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .YAxis(yaxis =>
    {
        yaxis.Labels(new List<string> { "Product A", "Product B", "Product C" });
        yaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .Palette(new List<string>
    {
        "#00d084", "#ffeb3b", "#ff6f00", "#f44336"
    })
    .BubbleDataMapping(bubble =>
    {
        bubble.SizeDataMapping("Value");
        bubble.ColorDataMapping("Value");
        bubble.SizeMinimum(10);
        bubble.SizeMaximum(60);
        bubble.Type(Syncfusion.EJ2.HeatMap.BubbleType.Circle);
    })
    .CellSettings(cellSettings =>
    {
        cellSettings.ShowLabel(true);
        cellSettings.Format("0.0");
        cellSettings.Border(border =>
        {
            border.Color("#ffffff");
            border.Width(1);
        });
    })
    .Legend(legend =>
    {
        legend.Visible(true);
        legend.Position(Syncfusion.EJ2.HeatMap.LegendPosition.Bottom);
    })
    .Tooltip(tooltip =>
    {
        tooltip.Visible(true);
        tooltip.Format("<b>{xLabel}</b> - <b>{yLabel}</b><br/>Value: {value}");
    })
    .Render()
```

## Use Cases

### Use Case 1: Market Analysis

Visualize product presence, market share, and growth:

```csharp
public class MarketAnalysis
{
    public string Product { get; set; }     // X-axis
    public string Region { get; set; }      // Y-axis
    public double MarketShare { get; set; } // Bubble size
    public double Growth { get; set; }      // Color intensity
}

// Shows which products are strong in which regions
```

### Use Case 2: Portfolio Analysis

Display risk, return, and allocation:

```csharp
public class PortfolioData
{
    public string AssetClass { get; set; }  // X-axis
    public string Quarter { get; set; }     // Y-axis
    public double Allocation { get; set; }  // Bubble size
    public double Return { get; set; }      // Color
}
```

### Use Case 3: Website Traffic Analysis

Show traffic sources, pages, and engagement:

```csharp
public class TrafficData
{
    public string Source { get; set; }      // X-axis: Referrer
    public string Page { get; set; }        // Y-axis: Landing page
    public double Visits { get; set; }      // Bubble size
    public double AvgTimeOnPage { get; set; } // Color
}
```

### Use Case 4: Scientific Correlation

Visualize multi-variable relationships:

```csharp
// X: Variable 1
// Y: Variable 2
// Size: Correlation strength
// Color: P-value significance
```

### Use Case 5: Organizational Analysis

Show team distribution and productivity:

```csharp
public class OrgData
{
    public string Department { get; set; }  // X-axis
    public string Team { get; set; }        // Y-axis
    public double HeadCount { get; set; }   // Bubble size
    public double Productivity { get; set; } // Color
}
```

## Best Practices

1. **Clarity**: Limit to 3-4 dimensions for readability
2. **Scale**: Use appropriate size ranges for visibility
3. **Color**: Apply meaningful color schemes
4. **Labels**: Include identifying information
5. **Legend**: Clearly explain size and color mapping
6. **Tooltips**: Provide detailed hover information
7. **Accessibility**: Ensure sufficient contrast

Bubble HeatMaps provide powerful multi-dimensional visualization capabilities for complex data analysis and exploration.
