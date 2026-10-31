# Pie and Doughnut Charts

## Table of Contents
- [Pie Chart Overview](#pie-chart-overview)
- [Basic Pie Chart Implementation](#basic-pie-chart-implementation)
- [Radius Customization](#radius-customization)
- [Pie Center Positioning](#pie-center-positioning)
- [Various Radius Pie Charts](#various-radius-pie-charts)
- [Doughnut Charts](#doughnut-charts)
- [Start and End Angles](#start-and-end-angles)
- [Color and Text Mapping](#color-and-text-mapping)
- [Border Radius](#border-radius)
- [Point Customization](#point-customization)
- [Patterns](#patterns)
- [Hide Border on Mouse Move](#hide-border-on-mouse-move)
- [Color Palettes](#color-palettes)
- [Multi-Level Drill Down](#multi-level-drill-down)
- [Multiple Pie Seies](#multiple-pie-series)
  - [Mapping Related Points with MappingKey](#mapping-related-points-with-mappingkey)
- [Complete Example](#complete-example)
- [Best Practices](#best-practices)
- [See Also](#see-also)

## Pie Chart Overview

A pie chart is a circular statistical graphic divided into slices to illustrate numerical proportions. Each slice represents a category's contribution to the total, with the slice size proportional to the quantity it represents.

**When to Use Pie Charts:**
- Show parts of a whole relationship
- Display percentage or proportional data
- Visualize market share, budget allocation, survey results
- Present data with 3-7 categories (more categories reduce readability)

## Basic Pie Chart Implementation

To render a pie chart, set the series `Type` property to `Pie`:

```cshtml
@(Html.EJS().AccumulationChart("pieChart")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataSource(Model)
              .XName("Category")
              .YName("Value")
              .Add();
    })
    .Title("Sales by Category")
    .Render()
)
```

```csharp
// Controller
public ActionResult PieChart()
{
    List<ChartData> data = new List<ChartData>
    {
        new ChartData { Category = "Electronics", Value = 37 },
        new ChartData { Category = "Clothing", Value = 17 },
        new ChartData { Category = "Food", Value = 19 },
        new ChartData { Category = "Books", Value = 11 },
        new ChartData { Category = "Others", Value = 16 }
    };
    return View(data);
}
```

## Radius Customization

By default, the pie chart radius is 80% of the minimum chart dimension (width or height). Customize using the `Radius` property:

```cshtml
@(Html.EJS().AccumulationChart("customRadius")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataSource(Model)
              .XName("X")
              .YName("Y")
              .Radius("100%")  // Use full available space
              .Add();
    })
    .Render()
)
```

**Radius Values:**
- **Percentage** (`"80%"`, `"100%"`) - Relative to chart size
- **Pixels** (`"200px"`, `"150px"`) - Absolute size
- **Default** - `"80%"` if not specified

**Example: Small Pie Chart**

```cshtml
.Series(series =>
{
    series.Radius("50%")  // Half the default size
          // ... other properties
          .Add();
})
```

## Pie Center Positioning

Change the center position of the pie chart using the `Center` property. Default is `50%, 50%` (center of chart).

```cshtml
@(Html.EJS().AccumulationChart("centeredPie")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataSource(Model)
              .XName("Product")
              .YName("Sales")
              .Add();
    })
    .Center(new Syncfusion.EJ2.Charts.AccumulationChartCenter { X = "60%", Y = "60%" })
    .Title("Product Sales")
    .Render()
)
```

**Use Cases:**
- Offset chart to make room for annotations
- Position multiple charts in same container
- Accommodate long data labels

## Various Radius Pie Charts

Create pie charts where each slice has a different radius using `Radius` field mapping:

```cshtml
@(Html.EJS().AccumulationChart("variousRadius")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
            .DataLabel(dl => dl.Visible(true).Name("Text"))
            .Border(b => b.Width(2).Color("white"))
              .DataSource(Model)
              .XName("X")
              .YName("Y")
              .Radius("R")  // Map radius from data source
              
              .Add();
    })
    .EnableSmartLabels(true)
    .Render()
)
```

```csharp
// Controller - Data with radius values
public ActionResult VariousRadius()
{
    List<VariableRadiusData> data = new List<VariableRadiusData>
    {
        new VariableRadiusData { X = "Argentina", Y = 505370, R = "100" },
        new VariableRadiusData { X = "Belgium", Y = 551500, R = "118.7" },
        new VariableRadiusData { X = "Cuba", Y = 312685, R = "124.6" },
        new VariableRadiusData { X = "Dominican", Y = 350000, R = "137.5" },
        new VariableRadiusData { X = "Egypt", Y = 301000, R = "150.8" }
    };
    return View(data);
}

public class VariableRadiusData
{
    public string X { get; set; }
    public double Y { get; set; }
    public string R { get; set; }  // Radius value
}
```

## Doughnut Charts

Create a doughnut chart (pie with center hole) by setting the `InnerRadius` property to a value greater than 0%:

```cshtml
@(Html.EJS().AccumulationChart("doughnut")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataLabel(dl => dl.Visible(true))
              .DataSource(Model)
              .XName("Category")
              .YName("Value")
              .InnerRadius("40%")  // Creates doughnut effect
              .Add();
    })
    .Title("Sales Distribution")
    .LegendSettings(ls => ls.Visible(true))
    .Render()
)
```

**InnerRadius Values:**
- **Range:** `0%` to `100%` of pie radius
- **Typical:** `40%` to `70%` for balanced appearance
- **Thin Ring:** `80%` to `90%`
- **No Hole:** `0%` (default pie chart)

**Doughnut with Center Label:**

```cshtml
Html.EJS().AccumulationChart("container").Series(series =>
            {
                series.DataSource(ViewBag.dataSource)
                      .XName("x")
                      .YName("y")
                      .InnerRadius("65%").Add();
            })
            .CenterLabel(cl => cl.Text("Mobile<br>Browsers<br>Statistics"))
            .LegendSettings(ls => ls.Visible(false)).Render()
```

## Start and End Angles

Customize the start and end angles to create semi-pie or custom arc charts:

```cshtml
@(Html.EJS().AccumulationChart("semiPie")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
        .DataLabel(dl => dl.Visible(true))
              .DataSource(Model)
              .XName("Browser")
              .YName("Users")
              .StartAngle(270)  // Start at top
              .EndAngle(90)     // End at bottom (180° arc)
              .Add();
    })
    .Title("Browser Usage (Semi-Pie)")
    .EnableSmartLabels(true)
    .Render()
)
```

**Angle Guidelines:**
- **Default:** StartAngle = 0°, EndAngle = 360° (full circle)
- **Semi-Pie:** EndAngle = StartAngle + 180°
- **Quarter-Pie:** EndAngle = StartAngle + 90°
- **Angles:** 0° = Right, 90° = Bottom, 180° = Left, 270° = Top

**Common Patterns:**

| Description | StartAngle | EndAngle |
|-------------|-----------|----------|
| Full Circle | 0° | 360° |
| Top Half | 270° | 90° |
| Bottom Half | 90° | 270° |
| Right Half | 0° | 180° |
| Left Half | 180° | 360° |
| Quarter (Top-Right) | 270° | 360° |

## Color and Text Mapping

Map colors and custom text from your data source using `PointColorMapping` and data label `Name`:

```cshtml
@(Html.EJS().AccumulationChart("colorMapped")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
        .DataLabel(dl => dl.Visible(true).Name("Text"))  // Map text from data
              .DataSource(Model)
              .XName("X")
              .YName("Y")
              .PointColorMapping("Fill")  // Map color from data
              .Add();
    })
    .Render()
)
```

```csharp
// Controller
public ActionResult ColorMapping()
{
    List<ColorMappedData> data = new List<ColorMappedData>
    {
        new ColorMappedData { X = "Chrome", Y = 37, Text = "37%", Fill = "#498fff" },
        new ColorMappedData { X = "UC Browser", Y = 17, Text = "17%", Fill = "#ffa060" },
        new ColorMappedData { X = "iPhone", Y = 19, Text = "19%", Fill = "#ff68b6" },
        new ColorMappedData { X = "Others", Y = 4, Text = "4%", Fill = "#81e2a1" }
    };
    return View(data);
}

public class ColorMappedData
{
    public string X { get; set; }
    public double Y { get; set; }
    public string Text { get; set; }
    public string Fill { get; set; }  // Color for this point
}
```

## Border Radius

Apply rounded corners to pie slices using the `BorderRadius` property for a modern appearance:

```cshtml
@(Html.EJS().AccumulationChart("roundedPie")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataSource(Model)
              .XName("Product")
              .YName("Sales")
              .BorderRadius(8)  // Rounded corners (pixels)
              .Add();
    })
    .Render()
)
```

**BorderRadius Values:**
- Pixels (e.g., `8`, `12`, `16`)
- Higher values = more rounded
- Works best with medium to large pie slices
- Combine with border for enhanced effect

## Point Customization

Customize individual points using the `PointRender` event:

```cshtml
@(Html.EJS().AccumulationChart("customPoints")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataSource(Model)
              .XName("X")
              .YName("Y")
              .Add();
    })
    .PointRender("pointRenderHandler")
    .Render()
)

<script>
    function pointRenderHandler(args) {
        // Highlight specific point
        if (args.point.x === "Electronics") {
            args.fill = "#ff6b6b";  // Red for electronics
            args.border.width = 3;
            args.border.color = "#c92a2a";
        }
        
        // Alternate colors
        if (args.point.index % 2 === 0) {
            args.fill = "#4dabf7";
        } else {
            args.fill = "#74c0fc";
        }
    }
</script>
```

## Patterns

Apply visual patterns (stripes, dots, etc.) to pie slices using `ApplyPattern` and the `PointRender` event:

```cshtml
@(Html.EJS().AccumulationChart("patternPie")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataSource(Model)
              .XName("Category")
              .YName("Value")
              .ApplyPattern(true)  // Enable pattern support
              .Add();
    })
    .PointRender("applyPattern")
    .Render()
)

<script>
    function applyPattern(args) {
        var patterns = ['dots', 'chessboard', 'diagonalbackward', 'crosshatch',
                        'dots', 'pacman', 'grid', 'turquoise'];
        var selectedPattern = patterns[args.point.index % patterns.length];
        args.pattern = selectedPattern;
    }
</script>
```

**Available Patterns:**
- `dots` - Dotted pattern
- `chessboard` - Checkerboard
- `diagonalbackward` - Diagonal lines (\)
- `diagonalforward` - Diagonal lines (/)
- `crosshatch` - Cross-hatch
- `grid` - Grid pattern
- `pacman` - Pacman pattern
- `turquoise` - Turquoise pattern

## Hide Border on Mouse Move

By default, a border appears when hovering over pie slices. Disable this behavior:

```cshtml
@(Html.EJS().AccumulationChart("noBorder")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataSource(Model)
              .XName("X")
              .YName("Y")
              .Add();
    })
    .EnableBorderOnMouseMove(false)  // Disable hover border
    .Render()
)
```

**Use Cases:**
- Cleaner appearance
- Avoid visual clutter
- Custom hover effects via CSS or events

## Color Palettes

Apply predefined or custom color schemes using the `Palettes` property:

```cshtml
@(Html.EJS().AccumulationChart("palettePie")
    
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
        .Palettes(new string[] { "#E94649", "#F6B53F", "#6FAAB0", "#C4C24A", "#DA874B" })
              .DataSource(Model)
              .XName("Product")
              .YName("Sales")
              .Add();
    })
    .Render()
)
```

**Built-in Palette Themes:**

Material palette is default. Palette colors auto-apply based on theme.

**Custom Palettes:**

```csharp
// Warm colors
.Palettes(new string[] { "#ff6b6b", "#ffa07a", "#ffcc5c", "#ffd93d", "#a8dadc" })

// Cool colors
.Palettes(new string[] { "#4361ee", "#4895ef", "#4cc9f0", "#7209b7", "#560bad" })

// Business professional
.Palettes(new string[] { "#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51" })
```

## Multi-Level Drill Down

Implement interactive drill-down to show detailed data when clicking pie slices:

```cshtml
@(Html.EJS().AccumulationChart("drillDown")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataLabel(dl => dl.Visible(true))
              .DataSource(Model)
              .XName("X")
              .YName("Y")
              .Add();
    })
    .PointClick("onPointClick")
    .ChartMouseClick("onChartClick")
    .Title("Sales by Region")
    .Render()
)

<script>
    var data = {
        level1: [
            { X: "North", Y: 28000 },
            { X: "South", Y: 34000 },
            { X: "East", Y: 42000 },
            { X: "West", Y: 31000 }
        ],
        North: [
            { X: "New York", Y: 12000 },
            { X: "Boston", Y: 8000 },
            { X: "Chicago", Y: 8000 }
        ],
        South: [
            { X: "Miami", Y: 15000 },
            { X: "Atlanta", Y: 11000 },
            { X: "Houston", Y: 8000 }
        ]
        // ... more drill-down data
    };

    var level = "level1";
    var chartObj;

    function onPointClick(args) {
        chartObj = document.getElementById("drillDown").ej2_instances[0];

        if (data[args.point.x]) {
            level = args.point.x;
            chartObj.series[0].dataSource = data[level];
            chartObj.title = "Sales in " + level;
            chartObj.refresh();
        }
    }

    function onChartClick(args) {
        chartObj = document.getElementById("drillDown").ej2_instances[0];

        // Drill up on back button click (if you add one)
        if (level !== "level1") {
            level = "level1";
            chartObj.series[0].dataSource = data.level1;
            chartObj.title = "Sales by Region";
            chartObj.refresh();
        }
    }
</script>
```

**Implementation Tips:**
1. Store hierarchical data structure
2. Track current drill-down level
3. Update data source and title on point click
4. Provide navigation to drill back up
5. Consider adding breadcrumb for navigation context

## Multiple Pie Series

Render multiple pie or doughnut series in a single Accumulation Chart to compare related datasets as concentric rings. Each series can have its own data source, radius, inner radius, data labels, and styling.

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Charts

@(Html.EJS().AccumulationChart("multiplePieSeries")
    .Title("Device Usage Comparison")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataSource(ViewBag.CurrentYearData)
              .XName("Category")
              .YName("Value")
              .Name("Current Year")
              .Radius("100%")
              .InnerRadius("70%")
              .DataLabel(dataLabel => dataLabel
                  .Visible(true)
                  .Name("Category")
                  .Position(Syncfusion.EJ2.Charts.AccumulationLabelPosition.Outside)
              )
              .Add();

        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataSource(ViewBag.PreviousYearData)
              .XName("Category")
              .YName("Value")
              .Name("Previous Year")
              .Radius("60%")
              .InnerRadius("30%")
              .DataLabel(dataLabel => dataLabel
                  .Visible(true)
                  .Name("Category")
                  .Position(Syncfusion.EJ2.Charts.AccumulationLabelPosition.Inside)
              )
              .Add();
    })
    .LegendSettings(legend => legend.Visible(true))
    .Tooltip(tooltip => tooltip
        .Enable(true)
        .Format("${series.name}<br/>${point.x}: <b>${point.y}%</b>")
    )
    .Render()
)
```

```csharp
using System.Collections.Generic;
using System.Web.Mvc;

public class PieSeriesData
{
    public string Category { get; set; }

    public double Value { get; set; }
}

public class ChartController : Controller
{
    public ActionResult MultiplePieSeries()
    {
        ViewBag.CurrentYearData = new List<PieSeriesData>
        {
            new PieSeriesData { Category = "Mobile", Value = 45 },
            new PieSeriesData { Category = "Desktop", Value = 35 },
            new PieSeriesData { Category = "Tablet", Value = 20 }
        };

        ViewBag.PreviousYearData = new List<PieSeriesData>
        {
            new PieSeriesData { Category = "Mobile", Value = 38 },
            new PieSeriesData { Category = "Desktop", Value = 42 },
            new PieSeriesData { Category = "Tablet", Value = 20 }
        };

        return View();
    }
}
```

Configure the `Radius` and `InnerRadius` properties of each series so that the series are rendered as separate concentric rings without overlapping.

- The outer series uses a larger `Radius`.
- The inner series uses a smaller `Radius`.
- The `InnerRadius` property determines the thickness of each ring.
- Each series can use a separate data source and visual configuration.
- The tooltip identifies the hovered point and its corresponding series.

### Mapping Related Points with MappingKey

Use the `MappingKey` property in `LegendSettings` to associate corresponding points across multiple pie series. The property specifies the point field used to group related legend items across the series.

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Charts

@(Html.EJS().AccumulationChart("mappedMultiplePieSeries")
    .Title("Device Usage Comparison")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataSource(ViewBag.CurrentYearData)
              .XName("Category")
              .YName("Value")
              .Name("Current Year")
              .Radius("100%")
              .InnerRadius("70%")
              .DataLabel(dataLabel => dataLabel
                  .Visible(true)
                  .Name("Category")
                  .Position(Syncfusion.EJ2.Charts.AccumulationLabelPosition.Outside)
              )
              .Add();

        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataSource(ViewBag.PreviousYearData)
              .XName("Category")
              .YName("Value")
              .Name("Previous Year")
              .Radius("60%")
              .InnerRadius("30%")
              .DataLabel(dataLabel => dataLabel
                  .Visible(true)
                  .Name("Category")
                  .Position(Syncfusion.EJ2.Charts.AccumulationLabelPosition.Inside)
              )
              .Add();
    })
    .LegendSettings(legend => legend
        .Visible(true)
        .MappingKey("x")
    )
    .Tooltip(tooltip => tooltip
        .Enable(true)
        .Format("${series.name}<br/>${point.x}: <b>${point.y}%</b>")
    )
    .Render()
)
```

```csharp
using System.Collections.Generic;
using System.Web.Mvc;

public class MappedPieSeriesData
{
    public string Id { get; set; }

    public string Category { get; set; }

    public double Value { get; set; }
}

public class ChartController : Controller
{
    public ActionResult MappedMultiplePieSeries()
    {
        ViewBag.CurrentYearData = new List<MappedPieSeriesData>
        {
            new MappedPieSeriesData
            {
                Id = "mobile",
                Category = "Mobile",
                Value = 45
            },
            new MappedPieSeriesData
            {
                Id = "desktop",
                Category = "Desktop",
                Value = 35
            },
            new MappedPieSeriesData
            {
                Id = "tablet",
                Category = "Tablet",
                Value = 20
            }
        };

        ViewBag.PreviousYearData = new List<MappedPieSeriesData>
        {
            new MappedPieSeriesData
            {
                Id = "mobile",
                Category = "Mobile",
                Value = 38
            },
            new MappedPieSeriesData
            {
                Id = "desktop",
                Category = "Desktop",
                Value = 42
            },
            new MappedPieSeriesData
            {
                Id = "tablet",
                Category = "Tablet",
                Value = 20
            }
        };

        return View();
    }
}
```

In the above example:

- `MappingKey("x")` is configured within `LegendSettings`.
- The `x` value represents the category mapped through the `XName` property of each series.
- Points with the same category across multiple series are represented by a common legend item.
- Interacting with a mapped legend item affects the corresponding points in all related series.
- Point mapping does not depend on the order of the records in each data source.

For example, the following points are related because both use `Mobile` as their category:

```csharp
// Current year
new MappedPieSeriesData
{
    Id = "mobile",
    Category = "Mobile",
    Value = 45
}

// Previous year
new MappedPieSeriesData
{
    Id = "mobile",
    Category = "Mobile",
    Value = 38
}
```

Both series configure `XName("Category")`. Therefore, the chart maps the `Category` field to the internal `x` value used by `MappingKey("x")`.

**Requirements for `MappingKey`:**

- Configure `MappingKey` inside `LegendSettings`.
- Use `"x"` to associate points based on the field mapped through each series' `XName` property.
- Related points across the series must have identical X-values.
- Use consistent category mapping in every related series.
- Each mapped value should uniquely identify a category within its series.

> **Note:** Enable the legend to display and interact with mapped legend items. Enable data labels and tooltips only when those features are required.

## Complete Example

Here's a comprehensive pie chart with multiple features:

```cshtml
@(Html.EJS().AccumulationChart("comprehensivePie")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataLabel(dl => dl
                    .Visible(true)
                    .Position(Syncfusion.EJ2.Charts.AccumulationLabelPosition.Outside)
                    .Name("Text")
                    .Font(f => f.FontWeight("600").Size("14px"))
                    .ConnectorStyle(cs => cs.Type(Syncfusion.EJ2.Charts.ConnectorType.Curve).Length("20px"))
                )
                  .Palettes(new string[] { "#4361ee", "#3a0ca3", "#7209b7", "#f72585", "#4cc9f0" })
              .DataSource(Model)
              .XName("X")
              .YName("Y")
              .Radius("90%")
              .StartAngle(0)
              .EndAngle(360)
              .PointColorMapping("Color")
              .BorderRadius(10)
              .Explode(true)
              .ExplodeOffset("10%")
              .ExplodeIndex(2)
              .Add();
    })
    .Title("Product Sales Analysis")
    .EnableSmartLabels(true)
    .EnableAnimation(true)
    .LegendSettings(ls => ls
        .Visible(true)
        .Position(Syncfusion.EJ2.Charts.LegendPosition.Right)
    )
    .Tooltip(t => t
        .Enable(true)
        .Format("${point.x}: <b>${point.y}</b>")
    )
    .Render()
)
```

## Best Practices

1. **Limit Categories:** Use 3-7 slices for optimal readability
2. **Group Small Values:** Combine tiny slices into "Others" category
3. **Smart Labels:** Always enable to prevent overlapping
4. **Consistent Colors:** Use palettes for professional appearance
5. **Tooltips:** Provide detailed information on hover
6. **Legends:** Essential when colors are not self-explanatory
7. **Responsive:** Test on different screen sizes
8. **Accessibility:** Ensure keyboard navigation and screen reader support
