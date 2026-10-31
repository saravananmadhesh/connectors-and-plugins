# Pie and Donut Variations

## Table of Contents
- [Pie vs Donut](#pie-vs-donut)
  - [Basic Pie Chart](#basic-pie-chart)
  - [Donut Chart](#donut-chart)
  - [Comparison Example](#comparison-example)
- [Radius Customization](#radius-customization)
  - [Default Radius](#default-radius)
  - [Custom Radius](#custom-radius)
  - [Radius with Donut Effect](#radius-with-donut-effect)
- [Various Radius Pie](#various-radius-pie)
  - [Implementation](#implementation)
  - [Use Cases](#use-cases)
- [Color and Text Mapping](#color-and-text-mapping)
  - [Mapping Colors from Data](#mapping-colors-from-data)
  - [Mapping Text from Data](#mapping-text-from-data)
  - [Combined Example](#combined-example)
- [Point Customization](#point-customization)
  - [Customizing Individual Points](#customizing-individual-points)
  - [Point Customization Properties](#point-customization-properties)
  - [Use Cases](#use-cases)
- [Complete Example](#complete-example)
- [Summary](#summary)

## Pie vs Donut

### Basic Pie Chart

To render a pie series, use the series `Type` as `Pie`. This is the default behavior.

```cshtml
<e-circularchart3d-series dataSource="@chartData" xName="X" yName="Y" type="@Syncfusion.EJ2.Charts.CircularChart3DSeriesType.Pie">
</e-circularchart3d-series>
```

**Result:** A traditional pie chart where slices meet at the center.

### Donut Chart

To create a donut chart, customize the `InnerRadius` property. By setting a value greater than 0%, the center is removed, creating a donut effect. The `InnerRadius` accepts values from 0% to 100% of the pie radius.

```cshtml
<e-circularchart3d-series dataSource="@chartData" xName="X" yName="Y" innerRadius="50%">
</e-circularchart3d-series>
```

**Common Inner Radius Values:**
- `0%` → Pie chart (no hole)
- `25%` → Small center hole
- `50%` → Standard donut
- `75%` → Large donut with thin ring

### Comparison Example

```cshtml
// Pie Chart
<e-circularchart3d-series dataSource="@data" xName="Category" yName="Value" innerRadius="0%">
</e-circularchart3d-series>

// Donut Chart
<e-circularchart3d-series dataSource="@data" xName="Category" yName="Value" innerRadius="50%">
</e-circularchart3d-series>
```

## Radius Customization

### Default Radius

By default, the radius of the pie series is 80% of the chart container size (the minimum of width and height). This ensures the chart fits well within the container.

```cshtml
<e-circularchart3d-series dataSource="@chartData" xName="X" yName="Y">
    <!-- Default radius: 80% of container -->
</e-circularchart3d-series>
```

### Custom Radius

Customize the pie radius using the `Radius` property. This can be a percentage (relative to container) or a pixel value.

**Example: 70% of container**
```cshtml
<e-circularchart3d-series dataSource="@chartData" xName="X" yName="Y" radius="70%">
</e-circularchart3d-series>
```

**Example: Fixed pixel value**
```cshtml
<e-circularchart3d-series dataSource="@chartData" xName="X" yName="Y" radius="250px">
</e-circularchart3d-series>
```

### Radius with Donut Effect

Combine radius and inner radius customization:

```cshtml
<e-circularchart3d-series dataSource="@chartData" xName="X" yName="Y" 
    radius="90%" innerRadius="40%">
</e-circularchart3d-series>
```

This creates a donut with 90% of the container as outer radius and 40% as inner radius.

## Various Radius Pie

You can assign different radii to each slice of the pie, creating a visual hierarchy. This is useful for emphasizing certain data points.

### Implementation

First, add a `Radius` column to your data source:

```cshtml
// Code-behind or Controller
public class ChartData
{
    public string X { get; set; }
    public double Y { get; set; }
    public string Radius { get; set; } // Per-slice radius
}

List<ChartData> chartData = new()
{
    new ChartData { X = "Product A", Y = 35, Radius = "100%" },
    new ChartData { X = "Product B", Y = 28, Radius = "80%" },
    new ChartData { X = "Product C", Y = 37, Radius = "100%" },
    new ChartData { X = "Product D", Y = 30, Radius = "60%" }
};
```

Then bind the radius from the data source:

```cshtml
<e-circularchart3d-series dataSource="@chartData" xName="X" yName="Y" radius="Radius">
</e-circularchart3d-series>
```

**Result:** Each slice has a different radius based on its `Radius` value, creating a staggered effect.

### Use Cases

- **Highlighting Top Products:** Use 100% radius for best sellers and smaller radius for others
- **Visual Importance:** Size slices radially to indicate importance or priority
- **Data Clustering:** Group related items with similar radius values

## Color and Text Mapping

### Mapping Colors from Data

Use the `PointColorMapping` property to assign colors to each data point from your data source.

**Step 1: Add color data**
```csharp
public class ChartData
{
    public string X { get; set; }
    public double Y { get; set; }
    public string Color { get; set; }
}

List<ChartData> chartData = new()
{
    new ChartData { X = "Product A", Y = 35, Color = "#FF5733" },
    new ChartData { X = "Product B", Y = 28, Color = "#33FF57" },
    new ChartData { X = "Product C", Y = 37, Color = "#3357FF" }
};
```

**Step 2: Bind color mapping**
```cshtml
<e-circularchart3d-series dataSource="@chartData" xName="X" yName="Y" pointColorMapping="Color">
</e-circularchart3d-series>
```

### Mapping Text from Data

Use the `Name` property in `DataLabel` to map text from the data source (e.g., category names, custom labels).

```cshtml
<e-circularchart3d-series-datalabel visible="true" name="X">
    <!-- Display the 'X' field value as label text -->
</e-circularchart3d-series-datalabel>
```

### Combined Example

```cshtml
<e-circularchart3d-series dataSource="@chartData" xName="X" yName="Y" pointColorMapping="Color">
    <e-circularchart3d-series-datalabel visible="true" position="@Syncfusion.EJ2.Charts.CircularChart3DLabelPosition.Outside" name="X">
        <e-connectorstyle length="40px"></e-connectorstyle>
    </e-circularchart3d-series-datalabel>
</e-circularchart3d-series>
```

## Point Customization

### Customizing Individual Points

Individual points (pie slices) can be customized using the `PointRender` event. This event fires for each data point before rendering.

**View:**
```cshtml
<ejs-circularchart3d id="container" title="Sales" pointRender="pointRender" tilt="-45">
    <e-circularchart3d-series-collection>
        <e-circularchart3d-series dataSource="@chartData" xName="X" yName="Y">
        </e-circularchart3d-series>
    </e-circularchart3d-series-collection>
</ejs-circularchart3d>

<script>
    function pointRender(args) {
        if (args.point.y > 35) {
            args.fill = '#FFD700';
        }
    }
</script>
```

### Point Customization Properties

- `fill` - Background color of the slice
- `point` - Defines the current point
- `series` - Defines the current series of the point
- `cancel` - Defines the event cancel status

### Use Cases

- **Highlight Top Values:** Use different color for slices above a threshold
- **Conditional Styling:** Apply styles based on data value
- **Visual Patterns:** Alternate colors or styles for visual distinction
- **Emphasis:** Draw attention to specific data points

## Complete Example

```csharp

public List<CircularChartData> ChartData { get; set; } = new();

public void OnGet()
{
    ChartData = new List<CircularChartData>
    {
        new CircularChartData { X = "Chrome", Y = 62.92, Text = "Chrome", Fill = "#4F46E5" },
        new CircularChartData { X = "Safari", Y = 19.97, Text = "Safari", Fill = "#06B6D4" },
        new CircularChartData { X = "Edge", Y = 5.50, Text = "Edge", Fill = "#10B981" },
        new CircularChartData { X = "Opera", Y = 3.15, Text = "Opera", Fill = "#F59E0B" },
        new CircularChartData { X = "Others", Y = 8.46, Text = "Others", Fill = "#EF4444" }
    };
}
    
public class CircularChartData
{
    public string X { get; set; } = string.Empty;
    public double Y { get; set; }
    public string Text { get; set; } = string.Empty;
    public string Fill { get; set; } = string.Empty;
}

```

```cshtml
<ejs-circularchart3d id="container" title="Browser Market Share" tilt="-45" pointRender="pointRender" tilt="-45">
        <e-circularchart3d-legendsettings visible="true" position="@Syncfusion.EJ2.Charts.LegendPosition.Right">
        </e-circularchart3d-legendsettings>
        <e-circularchart3d-series-collection>
            <e-circularchart3d-series dataSource="@Model.ChartData" xName="X" yName="Y" innerRadius="40%" radius="80%" pointColorMapping="Fill">
                <e-circularchart3d-series-datalabel visible="true" name="Text" position="@Syncfusion.EJ2.Charts.CircularChart3DLabelPosition.Outside">
                    <e-font fontWeight="600"></e-font>
                    <e-connectorstyle length="40px"></e-connectorstyle>
                </e-circularchart3d-series-datalabel>
            </e-circularchart3d-series>
        </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
</div>

<script>
    function pointRender(args) {
        // Optional customization: highlight Chrome slice
        if (args.point.x === "Chrome") {
            args.fill = "#7C3AED";
        }
    }
</script>
```

**Result**: A 3D donut chart is rendered with custom colors, outside data labels, legend support, and point-level customization.

## Summary

| Feature | Usage | Example |
|---------|-------|---------|
| Pie Chart | Display proportional data | Standard pie with center point |
| Donut Chart | Create visual interest | innerRadius="50%" |
| Custom Radius | Control chart size | radius="70%" |
| Various Radius | Emphasize data points | radius="Radius" |
| Color Mapping | Data-driven colors | pointColorMapping="Color" |
| Text Mapping | Dynamic labels | name="X" in DataLabel |
| Point Customization | Conditional styling | PointRender event |
