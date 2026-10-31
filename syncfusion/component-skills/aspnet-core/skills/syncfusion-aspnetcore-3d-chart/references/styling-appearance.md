# Styling & Appearance

## Table of Contents
- [Custom Color Palettes](#custom-color-palettes)
  - [Basic Color Palette](#basic-color-palette)
  - [Palette Best Practices](#palette-best-practices)
  - [Override Series Color](#override-series-color)
- [Point Color Mapping](#point-color-mapping)
  - [Basic Point Color Mapping](#basic-point-color-mapping)
  - [Conditional Color Mapping](#conditional-color-mapping)
  - [Performance Indicator Example](#performance-indicator-example)
- [Point-Level Customization](#point-level-customization)
  - [Using PointRender Event](#using-pointrender-event)
  - [Highlight Specific Points](#highlight-specific-points)
- [Chart Area Customization](#chart-area-customization)
  - [Background Color](#background-color)
  - [Chart Area Border](#chart-area-border)
  - [Combined Example](#combined-example)
- [Border Styling](#border-styling)
  - [Gradient Borders](#gradient-borders)
  - [Dashed Border Style](#dashed-border-style)
- [3D Wall Colors](#3d-wall-colors)
  - [Wall Color Configuration](#wall-color-configuration)
  - [3D Depth Configuration](#3d-depth-configuration)
  - [3D Rotation](#3d-rotation)
- [Series Opacity](#series-opacity)
  - [Basic Opacity](#basic-opacity)
  - [Layered Series with Opacity](#layered-series-with-opacity)

## Custom Color Palettes

Define custom color schemes for all series in the chart.

### Basic Color Palette

```cshtml
<ejs-chart3d id="chart"
             title="Sales Data"
             enableRotation="true"
             rotation="7"
             tilt="10"
             depth="100"
             palettes="@Model.Palettes">

    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>

    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model.ChartData"
                          xName="Month"
                          yName="Sales"
                          name="Sales"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>

        <e-chart3d-series dataSource="@Model.ChartData"
                          xName="Month"
                          yName="Revenue"
                          name="Revenue"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>

        <e-chart3d-series dataSource="@Model.ChartData"
                          xName="Month"
                          yName="Expenses"
                          name="Expenses"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>
```

```csharp

public string[] Palettes { get; set; } = new[]
{
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A"
};

```
**Result:** Series 1 gets #FF6B6B (red), Series 2 gets #4ECDC4 (teal), Series 3 gets #45B7D1 (blue), etc.

### Palette Best Practices

**Professional Palettes:**

```csharp
<!-- Corporate Blue Palette -->
Palettes = new[] { "#003366", "#006699", "#0099CC", "#66CCFF" };
```

```csharp
<!-- Warm Palette -->
Palettes = new[] { "#FF4500", "#FF8C00", "#FFA500", "#FFB347" };
```

```csharp
<!-- Accessible/Colorblind-Friendly Palette -->
Palettes = new[] { "#0173B2", "#DE8F05", "#CC78BC", "#CA9161" };
```

### Override Series Color

Override palette for specific series:

```cshtml
<e-chart3d-series dataSource="@Model" 
                  xName="Month" 
                  yName="Sales" 
                  name="Sales"
                  type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column"
                  fill="#FF0000">
</e-chart3d-series>
```

Explicit `fill` property overrides palette color.

## Point Color Mapping

Map colors to individual data points from data values, useful for conditional coloring.

### Basic Point Color Mapping

```cshtml
<ejs-chart3d id="chart" title="Sales with Status">
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model.SalesData" 
                          xName="Month" 
                          yName="Sales" 
                          pointColorMapping="Color"
                          name="Sales"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>
```

**Data Model:**
```csharp
public class SalesData
{
    public string Month { get; set; }
    public double Sales { get; set; }
    public string Color { get; set; }  // Color property
}

List<SalesData> data = new List<SalesData>
{
    new SalesData { Month = "Jan", Sales = 35, Color = "#4CAF50" },    // Green (good)
    new SalesData { Month = "Feb", Sales = 28, Color = "#FFC107" },    // Yellow (warning)
    new SalesData { Month = "Mar", Sales = 34, Color = "#4CAF50" },    // Green
    new SalesData { Month = "Apr", Sales = 15, Color = "#F44336" }     // Red (poor)
};
```

### Conditional Color Mapping

In the controller, calculate colors based on values:

```csharp
public IActionResult GetColoredSales()
{
    var salesData = GetAllSalesData();
    double average = salesData.Average(s => s.Sales);

    foreach (var item in salesData)
    {
        if (item.Sales > average * 1.2)
            item.Color = "#4CAF50";  // Green - excellent
        else if (item.Sales > average)
            item.Color = "#8BC34A";  // Light green - good
        else if (item.Sales > average * 0.8)
            item.Color = "#FFC107";  // Yellow - fair
        else
            item.Color = "#F44336";  // Red - poor
    }
    return View(salesData);
}
```

### Performance Indicator Example

```cshtml
<ejs-chart3d id="performanceChart" title="Employee Performance">
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model.EmployeeData" 
                          xName="EmployeeName" 
                          yName="PerformanceScore" 
                          pointColorMapping="StatusColor"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Bar">
            <e-chart3d-series-datalabel visible="true" position="Right" format="n1">
            </e-chart3d-series-datalabel>
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>
```

Where `StatusColor` in data ranges from red (low) to green (high).

## Point-Level Customization

Customize individual data points using events.

### Using PointRender Event

```cshtml
<ejs-chart3d id="chart" pointRender="onPointRender" title="Custom Points">
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model.ChartData" 
                          xName="Month" 
                          yName="Sales" 
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>

<script>
function onPointRender(args) {
    // Customize point based on value
    if (args.point.yValue > 35) {
        args.fill = '#4CAF50';  // Green for high values
    } else if (args.point.yValue < 25) {
        args.fill = '#F44336';  // Red for low values
    } else {
        args.fill = '#FFC107';  // Yellow for medium values
    }
}
</script>
```

### Highlight Specific Points

```javascript
function onPointRender(args) {
    // Highlight maximum value
    if (args.point.yValue === Math.max(...data.map(d => d.value))) {
        args.fill = '#FFD700';  // Gold
        args.border = { width: 2, color: '#FFA500' };
    }
    
    // Highlight minimum value
    if (args.point.yValue === Math.min(...data.map(d => d.value))) {
        args.fill = '#87CEEB';  // Sky blue
        args.border = { width: 2, color: '#4169E1' };
    }
}
```

## Chart Area Customization

Customize the chart container background and border.

### Background Color

```cshtml
<ejs-chart3d id="chart" 
             title="Sales Data"
             background="#F5F5F5">
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Sales" 
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>
```

Sets the outer chart background color.

### Chart Area Border

```cshtml
<e-chart3d-border width="2" color="#333333">
</e-chart3d-border>
```

Adds a border around the chart.

### Combined Example

```cshtml
<ejs-chart3d id="chart" 
             title="Sales" 
             background="#FAFAFA">
    
    <e-chart3d-border width="1" color="#CCCCCC">
    </e-chart3d-border>
    
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Sales" 
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>
```

## Border Styling

Add and customize borders on columns, bars, and elements.

### Gradient Borders

For visual interest, use contrasting colors:

```cshtml
<e-chart3d-border width="1" color="#1A1A1A">
</e-chart3d-border>
```

Pair with a lighter fill for contrast.

### Dashed Border Style

```cshtml
<e-chart3d-border width="2" color="#333333" dashArray="2,3">
</e-chart3d-border>
```

Creates a dashed border pattern (5px dash, 5px gap).

## 3D Wall Colors

Customize the 3D appearance with wall colors for depth.

### Wall Color Configuration

```cshtml
<ejs-chart3d id="chart3d" 
             title="3D Sales Chart"
             wallColor="#E8F4F8">
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Sales" 
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>
```

### 3D Depth Configuration

```cshtml
<ejs-chart3d id="chart3d" 
             title="3D Chart"
             depth="200"
             wallColor="#D0E8F2">
</ejs-chart3d>
```

| Property | Purpose | Range |
|----------|---------|-------|
| `depth` | 3D depth in pixels | 50-300 |
| `wallColor` | Back wall color | #HEX, rgb() |

### 3D Rotation

```cshtml
<ejs-chart3d id="chart3d" 
             title="3D Chart"
             rotation="15"
             tilt="10">
</ejs-chart3d>
```

## Series Opacity

Control transparency of series for layered visualization.

### Basic Opacity

```cshtml
<e-chart3d-series dataSource="@Model" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column"
                  opacity="0.7">
</e-chart3d-series>
```

| Opacity | Appearance |
|---------|------------|
| 1.0 | Fully opaque (default) |
| 0.7 | 70% opaque, 30% transparent |
| 0.5 | 50% opaque (semi-transparent) |
| 0.3 | 30% opaque, very transparent |

### Layered Series with Opacity

When multiple series overlap, use opacity for visual distinction:

```cshtml
<ejs-chart3d id="chart" title="Overlapping Data">
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Sales" 
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column"
                          fill="#FF6B6B"
                          opacity="0.8"
                          name="Sales">
        </e-chart3d-series>
        
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Revenue" 
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column"
                          fill="#4ECDC4"
                          opacity="0.6"
                          name="Revenue">
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>
```

## Complete Styled Example

```cshtml
<ejs-chart3d id="styledChart"
             title="Quarterly Business Metrics"
             background="#F8F9FA"
             wallColor="#E3F2FD"
             enableRotation="true"
             rotation="7"
             tilt="10"
             depth="200"
             palettes="@Model.Palettes">

    <!-- Chart border -->
    <e-chart3d-border width="1" color="#E0E0E0">
    </e-chart3d-border>

    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>

    <e-chart3d-series-collection>
        <!-- Series 1: Revenue -->
        <e-chart3d-series dataSource="@Model.ChartData"
                          xName="Quarter"
                          yName="Revenue"
                          name="Revenue"
                          opacity="0.9"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
            <e-chart3d-series-datalabel visible="true"
                                        position="@Syncfusion.EJ2.Charts.Chart3DDataLabelPosition.Top"
                                        format="n1">
            </e-chart3d-series-datalabel>
        </e-chart3d-series>

        <!-- Series 2: Expenses -->
        <e-chart3d-series dataSource="@Model.ChartData"
                          xName="Quarter"
                          yName="Expenses"
                          name="Expenses"
                          opacity="0.8"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
            <e-chart3d-series-datalabel visible="true"
                                        position="@Syncfusion.EJ2.Charts.Chart3DDataLabelPosition.Top"
                                        format="n1">
            </e-chart3d-series-datalabel>
        </e-chart3d-series>

        <!-- Series 3: Growth Rate -->
        <e-chart3d-series dataSource="@Model.ChartData"
                          xName="Quarter"
                          yName="GrowthRate"
                          name="Growth %"
                          opacity="0.85"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
            <e-chart3d-series-datalabel visible="true"
                                        position="@Syncfusion.EJ2.Charts.Chart3DDataLabelPosition.Top"
                                        format="n1">
            </e-chart3d-series-datalabel>
        </e-chart3d-series>
    </e-chart3d-series-collection>

    <!-- Legend styling -->
    <e-chart3d-legendsettings position="@Syncfusion.EJ2.Charts.LegendPosition.Bottom"
                              alignment="@Syncfusion.EJ2.Charts.Alignment.Center"
                              background="rgba(255,255,255,0.95)">
        <e-chart3dlegendsettings-border width="1" color="#D0D0D0">
        </e-chart3dlegendsettings-border>
    </e-chart3d-legendsettings>

    <!-- Tooltip -->
    <e-chart3d-tooltipsettings enable="true"
                               format="${series.name}: ${point.y}">
    </e-chart3d-tooltipsettings>

</ejs-chart3d>

<style>
    #styledChart {
        height: 500px;
        width: 100%;
    }
</style>
```

```csharp
public string[] Palettes { get; set; } = new[]
        {
            "#1976D2",
            "#F57C00",
            "#388E3C"
        };

```

**Styling Features:**
- Light background (#F8F9FA) for contrast
- 3D walls with light blue tint
- Custom color palette (blue, orange, green)
- Rounded corners on bars
- Borders for definition
- Data labels with currency format
- Styled legend with background
- Point color mapping for trend indicator
