# Advanced Features

## Table of Contents
- [Overview](#overview)
- [Data Grouping](#data-grouping)
  - [Group by Value](#group-by-value)
  - [Group by Point Count](#group-by-point-count)
  - [Custom Group Name](#custom-group-name)
- [Empty Points](#empty-points)
  - [Empty Point Modes](#empty-point-modes)
  - [Mode Examples](#mode-examples)
- [Annotations](#annotations)
  - [Multiple Annotations](#multiple-annotations)
- [Center Label](#center-label)
- [Gradient Fill](#gradient-fill)
- [Dynamic Data Updates](#dynamic-data-updates)
- [Title and Subtitle](#title-and-subtitle)
- [Margins and Sizing](#margins-and-sizing)
- [Responsive Design](#responsive-design)
- [Background Customization](#background-customization)
- [Border Styling](#border-styling)
- [Series Customization](#series-customization)
- [Multiple Series](#multiple-series)
- [Complete Advanced Example](#complete-advanced-example)
- [Best Practices](#best-practices)
  - [Data Grouping Best Practices](#data-grouping-best-practices)
  - [Empty Points Best Practices](#empty-points-best-practices)
  - [Annotations Best Practices](#annotations-best-practices)
  - [Dynamic Updates](#dynamic-updates)
  - [Visual Design](#visual-design)
  - [Performance](#performance)
- [See Also](#see-also)

## Overview

Advanced features extend AccumulationChart capabilities with sophisticated data handling, visual enhancements, and dynamic behaviors for complex business scenarios.

**Key Advanced Features:**
- **Grouping:** Combine small slices into "Others"
- **Empty Points:** Handle null/missing data gracefully
- **Annotations:** Add custom content overlay
- **Center Labels:** Display info in doughnut center
- **Gradients:** Visual depth with color transitions
- **Dynamic Updates:** Real-time data changes

## Data Grouping

Automatically group small data points into a single "Others" slice:

### Group by Value

Combine points below a threshold:

```cshtml
@(Html.EJS().AccumulationChart("groupByValue")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Product")
              .YName("Sales")
              .GroupTo("5")  // Group points with value < 5
              .GroupMode(Syncfusion.EJ2.Charts.GroupModes.Value)
              .Add();
    })
    .Title("Product Sales (Small items grouped)")
    .LegendSettings(ls => ls.Visible(true))
    .Render()
)
```

```csharp
// Controller
public ActionResult GroupByValue()
{
    List<ChartData> data = new List<ChartData>
    {
        new ChartData { Product = "Laptops", Sales = 45 },
        new ChartData { Product = "Phones", Sales = 32 },
        new ChartData { Product = "Tablets", Sales = 18 },
        new ChartData { Product = "Headphones", Sales = 3 },  // Will be grouped
        new ChartData { Product = "Cables", Sales = 1 },       // Will be grouped
        new ChartData { Product = "Cases", Sales = 1 }         // Will be grouped
    };
    return View(data);
}
```

**Result:** Points with Sales < 5 combine into "Others" slice.

### Group by Point Count

Keep top N points, group the rest:

```cshtml
@(Html.EJS().AccumulationChart("groupByPoints")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Country")
              .YName("Users")
              .GroupTo("5")  // Show top 5, group others
              .GroupMode(Syncfusion.EJ2.Charts.GroupModes.Point)
              .Add();
    })
    .Title("Top 5 Countries by Users")
    .Render()
)
```

**Use Case:** Show top performers, aggregate the "long tail"

### Custom Group Name

Change "Others" to custom text:

```cshtml
@(Html.EJS().AccumulationChart("customGroupName")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Region")
              .YName("Revenue")
              .GroupTo("10")
              .GroupMode(Syncfusion.EJ2.Charts.GroupModes.Value)
              .Add();
    })
    .Render()
)

<script>
    // Customize via PointRender event
    window.addEventListener('load', function() {
        var chart = document.getElementById('customGroupName').ej2_instances[0];
        chart.pointRender = function(args) {
            if (args.point.x === 'Others') {
                args.point.x = 'Rest of Market';
            }
        };
    });
</script>
```

**Alternative: Specify in data model**

```csharp
.GroupTo("8")
.GroupMode(Syncfusion.EJ2.Charts.GroupModes.Value)
// Points below 8 grouped as "Others"
```

## Empty Points

Handle null, undefined, or missing data points:

### Empty Point Modes

```cshtml
@(Html.EJS().AccumulationChart("emptyPoints")
    .Series(series =>
    {
        series.XName("Month")
              .YName("Sales")
              .EmptyPointSettings(eps => eps
                  .Mode(Syncfusion.EJ2.Charts.EmptyPointMode.Zero)  // Fill with 0
                  .Fill("#e0e0e0")  // Color for empty points
                  .Border(new{Width=2,Color="#bdbdbd"})
              )
              .DataSource(Model)              
              .Add();
    })
    .Render()
)
```

```csharp
// Controller with missing data
public ActionResult EmptyPoints()
{
    List<ChartData> data = new List<ChartData>
    {
        new ChartData { Month = "Jan", Sales = 35 },
        new ChartData { Month = "Feb", Sales = null },  // Missing data
        new ChartData { Month = "Mar", Sales = 28 },
        new ChartData { Month = "Apr", Sales = 0 },     // Explicit zero
        new ChartData { Month = "May", Sales = 42 }
    };
    return View(data);
}
```

**Empty Point Modes:**

| Mode | Behavior | Use Case |
|------|----------|----------|
| `Zero` | Treat as 0 value | Show no contribution |
| `Average` | Use average of neighbors | Estimate missing data |
| `Drop` | Remove point entirely | Exclude from calculations |
| `Gap` | Leave visible gap | Show data unavailable |

### Mode Examples

**Average Mode:**

```cshtml
.EmptyPointSettings(eps => eps
    .Mode(Syncfusion.EJ2.Charts.EmptyPointMode.Average)
    .Fill("#ffeb3b")  // Yellow to indicate estimated
)
```

**Drop Mode:**

```cshtml
.EmptyPointSettings(eps => eps
    .Mode(Syncfusion.EJ2.Charts.EmptyPointMode.Drop)
    // Point won't appear in chart or calculations
)
```

**Gap Mode:**

```cshtml
.EmptyPointSettings(eps => eps
    .Mode(Syncfusion.EJ2.Charts.EmptyPointMode.Gap)
    // Visible gap in chart
)
```

## Annotations

Add custom HTML content overlaid on the chart:

```cshtml
@(Html.EJS().AccumulationChart("annotatedChart")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Category")
              .YName("Value")
              .Add();
    })
    .Annotations(annotations =>
    {
        annotations.Content("<div style='padding:8px; background:rgba(255,255,255,0.9); " +
                           "border:2px solid #2196F3; border-radius:5px; box-shadow:0 2px 8px rgba(0,0,0,0.15);'>" +
                           "<div style='font-size:16px; font-weight:bold; color:#1976D2;'>Total Sales</div>" +
                           "<div style='font-size:24px; font-weight:bold; color:#2c3e50;'>$87M</div>" +
                           "<div style='font-size:12px; color:#7f8c8d;'>↑ 12% vs Q4</div>" +
                           "</div>")
                   .Region(Syncfusion.EJ2.Charts.Regions.Series)
                   .CoordinateUnits(Syncfusion.EJ2.Charts.Units.Point)
                   .X("50%")
                   .Y("50%")
                   .Add();
    })
    .Title("Q1 2026 Sales Distribution")
    .Render()
)
```

**Annotation Properties:**

| Property | Description | Values |
|----------|-------------|--------|
| `Content` | HTML content | Any HTML string |
| `Region` | Placement region | `Chart`, `Series` |
| `CoordinateUnits` | Position type | `Point`, `Pixel` |
| `X`, `Y` | Position | Coordinates or percentage |

### Multiple Annotations

```cshtml
.Annotations(annotations =>
{
    // Center annotation
    annotations.Content("<div class='center-note'>Q1 2026</div>")
               .X("50%").Y("50%")
               .Region(Syncfusion.EJ2.Charts.Regions.Series)
               .Add();
    
    // Top-right badge
    annotations.Content("<div class='badge'>NEW</div>")
               .X("90%").Y("10%")
               .Region(Syncfusion.EJ2.Charts.Regions.Chart)
               .Add();
    
    // Bottom note
    annotations.Content("<div class='footnote'>*Preliminary data</div>")
               .X("50%").Y("95%")
               .Region(Syncfusion.EJ2.Charts.Regions.Chart)
               .Add();
})
```

**Positioning:**
- **Region.Chart:** Relative to entire chart area
- **Region.Series:** Relative to plot area
- **Pixel units:** Exact pixel coordinates
- **Point units:** Based on data coordinates
- **Percentage:** `"50%"` centers element

## Center Label

Display information in the center of doughnut charts:

```cshtml
@(Html.EJS().AccumulationChart("centerLabel")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataSource(Model)
              .XName("Product")
              .YName("Revenue")
              .InnerRadius("65%")  // Create space for label
              .Add();
    })
    .Annotations(annotations =>
    {
        annotations.Content("<div style='text-align:center;'>" +
                           "<div style='font-size:14px; color:#7f8c8d; margin-bottom:5px;'>Total Revenue</div>" +
                           "<div style='font-size:32px; font-weight:bold; color:#2c3e50;'>$125M</div>" +
                           "<div style='font-size:13px; color:#27ae60; font-weight:600;'>↑ 18.5%</div>" +
                           "</div>")
                   .Region(Syncfusion.EJ2.Charts.Regions.Series)
                   .X("50%")
                   .Y("50%")
                   .Add();
    })
    .Title("Revenue by Product Line")
    .Render()
)
```

**Dynamic Center Label:**

```cshtml
@(Html.EJS().AccumulationChart("dynamicCenter")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataSource(Model)
              .XName("Category")
              .YName("Value")
              .InnerRadius("60%")
              .Add();
    })
    .Annotations(annotations =>
    {
        annotations.Content("<div id='centerContent' style='text-align:center;'>" +
                           "<div style='font-size:18px; font-weight:bold;'>Hover to view</div>" +
                           "</div>")
                   .Region(Syncfusion.EJ2.Charts.Regions.Series)
                   .X("50%").Y("50%")
                   .Add();
    })
    .PointMove("updateCenterLabel")
    .Render()
)

<script>
    function updateCenterLabel(args) {
        document.getElementById('centerContent').innerHTML = 
            "<div style='font-size:14px; color:#7f8c8d;'>" + args.point.x + "</div>" +
            "<div style='font-size:28px; font-weight:bold; color:#2c3e50;'>$" + args.point.y + "M</div>" +
            "<div style='font-size:13px; color:#3498db;'>" + args.point.percentage.toFixed(1) + "%</div>";
    }
</script>
```

## Gradient Fill

Apply gradient colors to slices for visual depth:

```cshtml
@(Html.EJS().AccumulationChart("gradientChart")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Region")
              .YName("Sales")
              .Add();
    })
    .PointRender("applyGradient")
    .Render()
)

<script>
    function applyGradient(args) {
        // Define gradients per slice
        var gradients = [
            { start: '#667eea', end: '#764ba2' },  // Purple gradient
            { start: '#f093fb', end: '#f5576c' },  // Pink gradient
            { start: '#4facfe', end: '#00f2fe' },  // Blue gradient
            { start: '#43e97b', end: '#38f9d7' }   // Green gradient
        ];
        
        var index = args.point.index % gradients.length;
        args.fill = 'url(#gradient' + args.point.index + ')';
    }
    
    // Add SVG gradients after chart loads
    window.addEventListener('load', function() {
        var svg = document.querySelector('#gradientChart svg');
        var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        
        var gradients = [
            { id: 'gradient0', start: '#667eea', end: '#764ba2' },
            { id: 'gradient1', start: '#f093fb', end: '#f5576c' },
            { id: 'gradient2', start: '#4facfe', end: '#00f2fe' },
            { id: 'gradient3', start: '#43e97b', end: '#38f9d7' }
        ];
        
        gradients.forEach(function(g) {
            var gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            gradient.setAttribute('id', g.id);
            gradient.setAttribute('x1', '0%');
            gradient.setAttribute('y1', '0%');
            gradient.setAttribute('x2', '100%');
            gradient.setAttribute('y2', '100%');
            
            var stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('stop-color', g.start);
            
            var stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop2.setAttribute('offset', '100%');
            stop2.setAttribute('stop-color', g.end);
            
            gradient.appendChild(stop1);
            gradient.appendChild(stop2);
            defs.appendChild(gradient);
        });
        
        svg.insertBefore(defs, svg.firstChild);
    });
</script>
```

**Radial Gradient:**

```javascript
gradient.setAttribute('id', 'radialGrad');
gradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
gradient.setAttribute('cx', '50%');
gradient.setAttribute('cy', '50%');
gradient.setAttribute('r', '50%');
```

## Dynamic Data Updates

Update chart data in real-time:

```cshtml
@(Html.EJS().AccumulationChart("liveChart")
    .Series(series =>
    {
        series.XName("Status")
              .YName("Count")
              .Animation(anim => anim.Enable(true).Duration(800))
              .DataSource(Model)
              .Add();
    })
    .Title("Live Order Status")
    .EnableAnimation(true)
    .Render()
)

<button onclick="updateData()" class="btn btn-primary">Update Data</button>
<button onclick="addPoint()" class="btn btn-success">Add Point</button>
<button onclick="removePoint()" class="btn btn-danger">Remove Point</button>

<script>
    var chartObj;
    
    window.addEventListener('load', function() {
        chartObj = document.getElementById('liveChart').ej2_instances[0];
    });
    
    function updateData() {
        // Generate new data
        var newData = [
            { Status: 'Pending', Count: Math.floor(Math.random() * 50) + 20 },
            { Status: 'Processing', Count: Math.floor(Math.random() * 40) + 15 },
            { Status: 'Shipped', Count: Math.floor(Math.random() * 60) + 30 },
            { Status: 'Delivered', Count: Math.floor(Math.random() * 80) + 40 }
        ];
        
        // Update chart
        chartObj.series[0].dataSource = newData;
        chartObj.refresh();
    }
    
    function addPoint() {
        var currentData = chartObj.series[0].dataSource;
        currentData.push({
            Status: 'Cancelled',
            Count: Math.floor(Math.random() * 15) + 5
        });
        chartObj.series[0].dataSource = currentData;
        chartObj.refresh();
    }
    
    function removePoint() {
        var currentData = chartObj.series[0].dataSource;
        if (currentData.length > 1) {
            currentData.pop();
            chartObj.series[0].dataSource = currentData;
            chartObj.refresh();
        }
    }
    
    // Auto-update every 5 seconds
    setInterval(function() {
        updateData();
    }, 5000);
</script>
```

**Update Patterns:**

```javascript
// Replace entire dataset
chart.series[0].dataSource = newData;
chart.refresh();

// Update specific point
chart.series[0].dataSource[2].Count = 75;
chart.refresh();

// Add point
chart.series[0].dataSource.push({ Status: 'New', Count: 10 });
chart.refresh();

// Remove point
chart.series[0].dataSource.splice(index, 1);
chart.refresh();
```

## Title and Subtitle

Configure chart title and subtitle:

```cshtml
@(Html.EJS().AccumulationChart("titledChart")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Product")
              .YName("Sales")
              .Add();
    })
    .Title("Quarterly Product Sales Analysis")
    .TitleStyle(ts => ts
        .FontFamily("Segoe UI, Arial")
        .Size("22px")
        .FontWeight("600")
        .Color("#2c3e50")
        .TextAlignment(Syncfusion.EJ2.Charts.Alignment.Center)
    )
    .SubTitle("Q1 2026 - North America Region")
    .SubTitleStyle(sts => sts
        .Size("14px")
        .FontWeight("400")
        .Color("#7f8c8d")
        .TextAlignment(Syncfusion.EJ2.Charts.Alignment.Center)
    )
    .Render()
)
```

**Title Alignment:**

```cshtml
.Title("Sales Report")
.TitleStyle(ts => ts
    .TextAlignment(Syncfusion.EJ2.Charts.Alignment.Near)  // Left-aligned
)
```

**Options:** `Near` (left), `Center`, `Far` (right)

## Margins and Sizing

Control chart dimensions and spacing:

```cshtml
@(Html.EJS().AccumulationChart("sizedChart")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("X")
              .YName("Y")
              .Add();
    })
    .Width("800px")   // Chart width
    .Height("500px")  // Chart height
    .Margin(m => m
        .Left(40)
        .Right(40)
        .Top(60)
        .Bottom(40)
    )
    .Render()
)
```

**Responsive Width:**

```cshtml
.Width("100%")  // Responsive to container
.Height("400px")
```

**Percentage-based:**

```cshtml
.Width("80%")
.Height("60%")
```

## Responsive Design

Make charts adapt to different screen sizes:

```cshtml
@(Html.EJS().AccumulationChart("responsiveChart")
    .Series(series =>
    {
        series.XName("Category")
              .YName("Value")
              .DataLabel(dl => dl.Visible(true))
              .DataSource(Model)
              .Add();
    })
    .Width("100%")
    .Height("400px")
    .Title("Sales Distribution")
    .LegendSettings(ls => ls
        .Visible(true)
        .Position(Syncfusion.EJ2.Charts.LegendPosition.Bottom)
    )
    .Render()
)

<style>
    @media (max-width: 768px) {
        #responsiveChart {
            height: 300px;
        }
        
        /* Adjust legend for mobile */
        #responsiveChart .e-chart-legend {
            font-size: 11px;
        }
        
        /* Smaller title */
        #responsiveChart .e-chart-title {
            font-size: 16px;
        }
    }
    
    @media (max-width: 480px) {
        #responsiveChart {
            height: 250px;
        }
    }
</style>

<script>
    // JavaScript responsive adjustments
    window.addEventListener('resize', function() {
        var chart = document.getElementById('responsiveChart').ej2_instances[0];
        
        if (window.innerWidth < 768) {
            chart.series[0].dataLabel.font.size = '10px';
            chart.legendSettings.position = 'Bottom';
        } else {
            chart.series[0].dataLabel.font.size = '12px';
            chart.legendSettings.position = 'Right';
        }
        
        chart.refresh();
    });
</script>
```

## Background Customization

Style chart background:

```cshtml
@(Html.EJS().AccumulationChart("styledBackground")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Product")
              .YName("Sales")
              .Add();
    })
    .Background("#f5f7fa")  // Light gray background
    .Border(b => b
        .Width(2)
        .Color("#3498db")
    )
    .Margin(m => m.Left(20).Right(20).Top(20).Bottom(20))
    .Render()
)
```

**Transparent Background:**

```cshtml
.Background("transparent")
```

**Image Background:**

```cshtml
.Background("url('/images/background.png')")
```

## Border Styling

Add borders to chart and elements:

```cshtml
@(Html.EJS().AccumulationChart("borderedChart")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Category")
              .YName("Value")
              .Border(new
               {
                   Width = 2,
                   Color = "white"  // White borders between slices
               })
              .Add();
    })
    .Border(b => b
        .Width(3)
        .Color("#34495e")  // Chart container border
    )
    .Render()
)
```

## Series Customization

Fine-tune series appearance:

```cshtml
@(Html.EJS().AccumulationChart("customSeries")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataSource(Model)
              .XName("Product")
              .YName("Revenue")
              .Name("Q1 Revenue")
              .StartAngle(90)        // Start at top
              .EndAngle(450)         // Full circle
              .Radius("80%")         // Pie size
              .Explode(true)
              .ExplodeOffset("8%")
              .ExplodeIndex(0)
              .Opacity(0.95)         // Slight transparency
              .PointColorMapping("Color")  // Use color from data
              .Add();
    })
    .Render()
)
```

```csharp
// Controller with custom colors
public ActionResult CustomSeries()
{
    List<SeriesData> data = new List<SeriesData>
    {
        new SeriesData { Product = "Premium", Revenue = 45, Color = "#9b59b6" },
        new SeriesData { Product = "Standard", Revenue = 32, Color = "#3498db" },
        new SeriesData { Product = "Basic", Revenue = 23, Color = "#1abc9c" }
    };
    return View(data);
}

public class SeriesData
{
    public string Product { get; set; }
    public double Revenue { get; set; }
    public string Color { get; set; }
}
```

## Multiple Series

Display multiple accumulation series (rare, but supported):

```cshtml
@(Html.EJS().AccumulationChart("multiSeries")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataSource(Model.Series1Data)
              .XName("Category")
              .YName("Value")
              .Radius("40%")  // Smaller radius for multiple
              .Add();
        
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataSource(Model.Series2Data)
              .XName("Category")
              .YName("Value")
              .InnerRadius("45%")
              .Radius("70%")
              .Add();
    })
    .Title("Nested Sales Analysis")
    .Render()
)
```

**Note:** Multiple series in accumulation charts create nested layouts (pie within doughnut).

## Complete Advanced Example

Comprehensive advanced feature demonstration:

```cshtml
@(Html.EJS().AccumulationChart("advancedComplete")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .XName("Category")
              .YName("Revenue")
              .PointColorMapping("Color")
              .InnerRadius("60%")
              .Radius("85%")
              .StartAngle(0)
              .EndAngle(360)
              .Explode(true)
              .ExplodeOffset("8%")
              .ExplodeIndex(0)
              .GroupTo("5")  // Group values below 5
              .GroupMode(Syncfusion.EJ2.Charts.GroupModes.Value)
              .EmptyPointSettings(eps => eps
                  .Mode(Syncfusion.EJ2.Charts.EmptyPointMode.Average)
                  .Fill("#e0e0e0")
              )
              .DataLabel(dl => dl
                  .Visible(true)
                  .Position(Syncfusion.EJ2.Charts.AccumulationLabelPosition.Outside)
                  .ConnectorStyle(cs => cs.Length("15px"))
                  .Font(f => f.Size("13px").FontWeight("600"))
              )
              .Border(b => b.Width(2).Color("white"))
              .Animation(anim => anim.Enable(true).Duration(1200))              
              .DataSource(Model)
              .Add();
    })
    .Title("Advanced Sales Dashboard - Q1 2026")
    .TitleStyle(ts => ts
        .Size("22px")
        .FontWeight("600")
        .Color("#2c3e50")
    )
    .SubTitle("Real-time data with advanced features")
    .SubTitleStyle(sts => sts
        .Size("14px")
        .Color("#7f8c8d")
    )
    .LegendSettings(ls => ls
        .Visible(true)
        .Position(Syncfusion.EJ2.Charts.LegendPosition.Right)
        .ShapeHeight(15)
        .ShapeWidth(15)
        .ToggleVisibility(true)
    )
    .Tooltip(t => t
        .Enable(true)
        .EnableHighlight(true)
        .Format("<b>${point.x}</b><br/>Revenue: $${point.y}M<br/>Share: ${point.percentage}%")
        .TextStyle(ts => ts.Size("13px"))
    )
    .SelectionMode(Syncfusion.EJ2.Charts.AccumulationSelectionMode.Point)
    .Annotations(annotations =>
    {
        annotations.Content("<div style='text-align:center;'>" +
                           "<div style='font-size:13px; color:#7f8c8d; margin-bottom:4px;'>Total Revenue</div>" +
                           "<div style='font-size:34px; font-weight:bold; color:#2c3e50;'>$187M</div>" +
                           "<div style='font-size:14px; color:#27ae60; font-weight:600; margin-top:4px;'>" +
                           "↑ 15.3% YoY</div>" +
                           "</div>")
                   .Region(Syncfusion.EJ2.Charts.Regions.Series)
                   .X("50%")
                   .Y("50%")
                   .Add();
    })
    .EnableAnimation(true)
    .EnableSmartLabels(true)
    .Background("white")
    .Border(b => b.Width(1).Color("#e0e0e0"))
    .Margin(m => m.Left(10).Right(10).Top(10).Bottom(10))
    .Width("100%")
    .Height("500px")
    .PointClick("handlePointClick")
    .Render()
)

<div style="margin-top:15px; display:flex; gap:10px;">
    <button onclick="updateData()" class="btn btn-primary">Update Data</button>
    <button onclick="toggleAnimation()" class="btn btn-secondary">Toggle Animation</button>
    <button onclick="exportPDF()" class="btn btn-success">Export PDF</button>
</div>

<script>
    var chartObj;
    
    window.addEventListener('load', function() {
        chartObj = document.getElementById('advancedComplete').ej2_instances[0];
    });
    
    function handlePointClick(args) {
        console.log("Selected:", args.point.x, "Revenue:", args.point.y);
        // Implement drill-down or details view
    }
    
    function updateData() {
        // Simulate real-time update
        var newData = [
            { Category: 'Enterprise', Revenue: 58 + Math.random() * 10, Color: '#3498db' },
            { Category: 'SMB', Revenue: 38 + Math.random() * 8, Color: '#2ecc71' },
            { Category: 'Consumer', Revenue: 45 + Math.random() * 7, Color: '#e74c3c' },
            { Category: 'Education', Revenue: 28 + Math.random() * 5, Color: '#f39c12' },
            { Category: 'Government', Revenue: 18 + Math.random() * 4, Color: '#9b59b6' }
        ];
        
        chartObj.series[0].dataSource = newData;
        chartObj.refresh();
    }
    
    function toggleAnimation() {
        chartObj.series[0].animation.enable = !chartObj.series[0].animation.enable;
        chartObj.refresh();
    }
    
    function exportPDF() {
        chartObj.export('PDF', 'Advanced-Sales-Dashboard');
    }
</script>
```

## Best Practices

### Data Grouping Best Practices
1. **Threshold Selection:** Group points representing <5% of total
2. **Custom Labels:** Use meaningful "Others" alternatives
3. **Documentation:** Note grouping in titles/subtitles
4. **Tooltip Details:** Show grouped items in tooltip

### Empty Points Best Practices
1. **Choose Appropriate Mode:** 
   - `Zero` for missing events
   - `Average` for data estimation
   - `Drop` for incomplete datasets
   - `Gap` to show unavailability
2. **Visual Distinction:** Use distinct colors for empty points
3. **Data Quality:** Address root cause of missing data

### Annotations Best Practices
1. **Strategic Placement:** Don't obscure important data
2. **Responsive Design:** Adjust annotation size/position for mobile
3. **Performance:** Limit to 3-4 annotations max
4. **Purpose:** Use for key metrics, insights, or calls-to-action

### Dynamic Updates
1. **Smooth Transitions:** Enable animation for updates
2. **Performance:** Throttle high-frequency updates (max 1/second)
3. **User Feedback:** Show loading state during fetch
4. **Error Handling:** Gracefully handle failed updates

### Visual Design
1. **Gradients:** Use subtly - avoid overwhelming
2. **Borders:** 2px white borders improve slice distinction
3. **Spacing:** Adequate margins prevent crowding
4. **Colors:** Ensure 3:1 contrast for non-text elements

### Performance
1. **Data Volume:** Group when >8-10 slices
2. **Animation:** 800-1500ms feels smooth
3. **Refresh Rate:** Debounce dynamic updates
4. **Responsive:** Test on mobile devices

## See Also

- [Data Labels](data-labels.md) - Advanced label customization
- [Tooltip and Interactions](tooltip-and-interactions.md) - Dynamic interactions
- [Pie and Doughnut Charts](pie-and-doughnut-charts.md) - Chart types
