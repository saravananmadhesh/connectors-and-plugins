# Annotations and Striplines Configuration

This guide covers comprehensive annotations and striplines configuration in Syncfusion ASP.NET Core Charts, including text, shapes, images, positioning, stripline patterns, and customization options.

## Table of Contents

- [Chart Annotations](#chart-annotations)
  - [Basic Text Annotation](#basic-text-annotation)
  - [Multiple Annotations](#multiple-annotations)
- [Text Annotations](#text-annotations)
  - [Styled Text Annotation](#styled-text-annotation)
  - [Text with Arrow](#text-with-arrow)
  - [Multi-Line Text Annotation](#multi-line-text-annotation)
- [Shape Annotations](#shape-annotations)
  - [Circle Annotation](#circle-annotation)
  - [Rectangle Annotation](#rectangle-annotation)
  - [Custom SVG Shape](#custom-svg-shape)
- [Image Annotations](#image-annotations)
  - [Basic Image Annotation](#basic-image-annotation)
  - [Image with Text](#image-with-text)
- [Annotation Positioning](#annotation-positioning)
  - [Point Coordinate Units](#point-coordinate-units)
  - [Pixel Coordinate Units](#pixel-coordinate-units)
  - [Alignment Options](#alignment-options)
- [Striplines Basics](#striplines-basics)
  - [Horizontal Stripline](#horizontal-stripline)
  - [Vertical Stripline](#vertical-stripline)
  - [Multiple Striplines](#multiple-striplines)
- [Stripline Patterns](#stripline-patterns)
  - [Recurrence Striplines](#recurrence-striplines)
  - [Segmented Stripline](#segmented-stripline)
  - [Stripline with Border](#stripline-with-border)
- [Advanced Striplines](#advanced-striplines)
  - [Stripline with Custom Text Position](#stripline-with-custom-text-position)
  - [Gradient Stripline](#gradient-stripline)
  - [Combined Annotations and Striplines](#combined-annotations-and-striplines)
- [When to Use](#when-to-use)

## Chart Annotations

### Basic Text Annotation

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-annotations>
        <e-chart-annotation x="Feb" y="35" coordinateUnits="@Syncfusion.EJ2.Charts.Units.Point" content="<div style="color:#0078D4;font-weight:bold">Peak Sales</div>">
        </e-chart-annotation>
    </e-chart-annotations>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
// Controller
public class ChartController : Controller
{
    public IActionResult Index()
    {
        ViewBag.ChartData = new[]
        {
            new { Month = "Jan", Sales = 35 },
            new { Month = "Feb", Sales = 42 },
            new { Month = "Mar", Sales = 34 },
            new { Month = "Apr", Sales = 38 },
            new { Month = "May", Sales = 40 }
        };
        return View();
    }
}
```

### Multiple Annotations

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-annotations>
        <e-chart-annotation x="Jan" y="35" coordinateUnits="@Syncfusion.EJ2.Charts.Units.Point" content="<div style="background:#FFB900;color:white;padding:5px;border-radius:3px">Start</div>">
        </e-chart-annotation>
        <e-chart-annotation x="Mar" y="34" coordinateUnits="@Syncfusion.EJ2.Charts.Units.Point" content="<div style="background:#E74856;color:white;padding:5px;border-radius:3px">Low Point</div>">
        </e-chart-annotation>
        <e-chart-annotation x="May" y="40" coordinateUnits="@Syncfusion.EJ2.Charts.Units.Point" content="<div style="background:#107C10;color:white;padding:5px;border-radius:3px">Target Achieved</div>">
        </e-chart-annotation>
    </e-chart-annotations>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Area">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Text Annotations

### Styled Text Annotation

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-annotations>
        <e-chart-annotation x="Mar" y="40" coordinateUnits="@Syncfusion.EJ2.Charts.Units.Point" content="<div style="background:#0078D4;color:white;padding:10px;border-radius:5px;box-shadow:0 2px 4px rgba(0,0,0,0.2);font-weight:600">
                    <div style="font-size:16px">Q1 Performance</div>
                    <div style="font-size:12px;margin-top:5px">Above Target</div>
                </div>">
        </e-chart-annotation>
    </e-chart-annotations>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Text with Arrow

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis @Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-annotations>
        <e-chart-annotation x="Apr" y="45" coordinateUnits="@Syncfusion.EJ2.Charts.Units.Point" content="<div style="text-align:center">
                    <div style="background:#FFB900;color:#333;padding:8px;border-radius:5px;font-weight:bold;margin-bottom:5px">
                        High Sales
                    </div>
                    <div style="width:0;height:0;border-left:10px solid transparent;border-right:10px solid transparent;border-top:10px solid #FFB900;margin:0 auto"></div>
                </div>">
        </e-chart-annotation>
    </e-chart-annotations>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Spline">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Multi-Line Text Annotation

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime"></e-chart-primaryxaxis>
    <e-chart-annotations>
        <e-chart-annotation x="30%" y="10%" region="@Syncfusion.EJ2.Charts.Regions.Chart" coordinateUnits="@Syncfusion.EJ2.Charts.Units.Pixel" content="<div style="background:#f8f9fa;border:2px solid #0078D4;padding:15px;border-radius:8px;max-width:200px">
                    <div style="font-weight:bold;color:#0078D4;margin-bottom:8px">Sales Summary</div>
                    <div style="font-size:12px;color:#666;line-height:1.5">
                        Q1 sales exceeded expectations<br/>
                        Growth: 25%<br/>
                        Target: Achieved
                    </div>
                </div>">
        </e-chart-annotation>
    </e-chart-annotations>
    <e-series-collection>
        <e-series dataSource="ViewBag.TimeSeriesData" 
                  xName="Date" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
// Controller
ViewBag.TimeSeriesData = new[]
{
    new { Date = new DateTime(2024, 1, 1), Sales = 35 },
    new { Date = new DateTime(2024, 2, 1), Sales = 42 },
    new { Date = new DateTime(2024, 3, 1), Sales = 38 }
};
```

## Shape Annotations

### Circle Annotation

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-annotations>
        <e-chart-annotation x="Mar" y="34" coordinateUnits="@Syncfusion.EJ2.Charts.Units.Point" content="<div style="width:60px;height:60px;border-radius:50%;background:rgba(231,72,86,0.2);border:3px solid #E74856;display:flex;align-items:center;justify-content:center">
                    <div style="font-weight:bold;color:#E74856">Low</div>
                </div>">
        </e-chart-annotation>
    </e-chart-annotations>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Rectangle Annotation

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-annotations>
        <e-chart-annotation x="20%" y="20%" region="@Syncfusion.EJ2.Charts.Regions.Chart" coordinateUnits="@Syncfusion.EJ2.Charts.Units.Pixel" content="<div style="width:150px;padding:15px;background:rgba(0,120,212,0.1);border:2px solid #0078D4;border-radius:5px">
                    <div style="font-weight:bold;color:#0078D4;margin-bottom:5px">Target Zone</div>
                    <div style="font-size:12px;color:#666">35-45 units</div>
                </div>">
        </e-chart-annotation>
    </e-chart-annotations>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Custom SVG Shape

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-annotations>
        <e-chart-annotation x="Apr" y="40" coordinateUnits="@Syncfusion.EJ2.Charts.Units.Point" content = "<svg width="40" height="40">
                    <polygon points="20,5 35,35 5,35" fill="#FFB900" stroke="#CC8800" stroke-width="2"/>
                    <text x="20" y="28" text-anchor="middle" fill="white" font-size="12" font-weight="bold">!</text>
                </svg>">
        </e-chart-annotation>
    </e-chart-annotations>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Area">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Image Annotations

### Basic Image Annotation

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-annotations>
        <e-chart-annotation x="Mar" y="40" coordinateUnits="@Syncfusion.EJ2.Charts.Units.Point" content="<img src="/images/trophy.png" style="width:40px;height:40px" alt="Achievement"/>">
        </e-chart-annotation>
    </e-chart-annotations>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Image with Text

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-annotations>
        <e-chart-annotation x="May" y="42" coordinateUnits="@Syncfusion.EJ2.Charts.Units.Point" content="<div style="text-align:center;background:white;padding:10px;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.1)">
                    <img src="/images/star.png" style="width:30px;height:30px" alt="Star"/>
                    <div style="margin-top:5px;font-weight:bold;color:#FFB900">Best Month</div>
                </div>" >
        </e-chart-annotation>
    </e-chart-annotations>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Annotation Positioning

### Point Coordinate Units

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-annotations>
        <e-chart-annotation x="Feb" y="35" coordinateUnits="@Syncfusion.EJ2.Charts.Units.Point" content="<div style="background:#0078D4;color:white;padding:5px;border-radius:3px">Point Coordinate</div>">
        </e-chart-annotation>
    </e-chart-annotations>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Pixel Coordinate Units

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-annotations>
        <e-chart-annotation x="50" y="50" coordinateUnits="@Syncfusion.EJ2.Charts.Units.Pixel" region="@Syncfusion.EJ2.Charts.Regions.Chart" content="<div style="background:#107C10;color:white;padding:8px;border-radius:5px">
                    Chart Annotation<br/>
                    (50px, 50px from top-left)
                </div>">
        </e-chart-annotation>
    </e-chart-annotations>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Alignment Options

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-annotations>
        <e-chart-annotation x="Mar" y="35" coordinateUnits="@Syncfusion.EJ2.Charts.Units.Point" horizontalAlignment="Center" verticalAlignment="Top" content="<div style="background:#FFB900;color:white;padding:5px;border-radius:3px">Centered</div>">
        </e-chart-annotation>
    </e-chart-annotations>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Area">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Striplines Basics

### Horizontal Stripline

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-primaryyaxis>
        <e-striplines>
            <e-stripline start="35" end="45" color="rgba(0, 120, 212, 0.1)" text="Target Range">
            </e-stripline>
        </e-striplines>
    </e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Vertical Stripline

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
        <e-striplines>
            <e-stripline startFromAxis="true" size="1" text="Q1 End" color="rgba(231, 72, 86, 0.2)">
            </e-stripline>
        </e-striplines>
    </e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Multiple Striplines

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-primaryyaxis>
        <e-striplines>
            <e-stripline start="30" end="35" color="rgba(231, 72, 86, 0.1)" text="Below Target">
            </e-stripline>
            <e-stripline start="35" end="40" color="rgba(255, 185, 0, 0.1)" text="On Target">
            </e-stripline>
            <e-stripline start="40" end="45" color="rgba(16, 124, 16, 0.1)" text="Above Target">
            </e-stripline>
        </e-striplines>
    </e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Area">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Stripline Patterns

### Recurrence Striplines

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
        <e-striplines>
            <e-stripline startFromAxis="true" 
                        size="1" 
                        isRepeat="true" 
                        repeatEvery="2" 
                        color="rgba(0, 120, 212, 0.1)">
            </e-stripline>
        </e-striplines>
    </e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Segmented Stripline

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
        <e-striplines>
            <e-stripline start="0" 
                        end="2" 
                        color="rgba(0, 120, 212, 0.1)" 
                        text="Period 1"
                        dashArray="5,5">
            </e-stripline>
            <e-stripline start="3" 
                        end="5" 
                        color="rgba(16, 124, 16, 0.1)" 
                        text="Period 2"
                        dashArray="5,5">
            </e-stripline>
        </e-striplines>
    </e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Stripline with Border

```cshtml
@{
    border = {width="2" color="#FFB900" dashArray="3,3"}
    textStyle = {color="#FFB900" fontWeight="bold" size="12px"}
}
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-primaryyaxis>
        <e-striplines>
            <e-stripline start="38" 
                        end="42" 
                        color="rgba(255, 185, 0, 0.1)" 
                        text="Optimal Range"
                        opacity="0.5" border="border" textStyle="textStyle">
            </e-stripline>
        </e-striplines>
    </e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Spline">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Advanced Striplines

### Stripline with Custom Text Position

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-primaryyaxis>
        <e-striplines>
            <e-stripline start="40" 
                        size="0" 
                        color="#E74856" 
                        text="Critical Threshold"
                        horizontalAlignment="Start"
                        verticalAlignment="Start">
            </e-stripline>
        </e-striplines>
    </e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Gradient Stripline

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-primaryyaxis>
        <e-striplines>
            <e-stripline start="35" 
                        end="45" 
                        color="url(#gradient)" 
                        text="Performance Zone"
                        opacity="0.3">
            </e-stripline>
        </e-striplines>
    </e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Area">
        </e-series>
    </e-series-collection>
</ejs-chart>

<svg style="width:0;height:0">
    <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#107C10;stop-opacity:0.3" />
            <stop offset="100%" style="stop-color:#FFB900;stop-opacity:0.3" />
        </linearGradient>
    </defs>
</svg>
```

### Combined Annotations and Striplines

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-primaryyaxis>
        <e-striplines>
            <e-stripline start="40" size="0" color="#0078D4">
            </e-stripline>
        </e-striplines>
    </e-chart-primaryyaxis>
    <e-chart-annotations>
        <e-chart-annotation x="85%" y="40" coordinateUnits="@Syncfusion.EJ2.Charts.Units.Point" region="@Syncfusion.EJ2.Charts.Regions.Chart" content="<div style="background:#0078D4;color:white;padding:5px;border-radius:3px;font-weight:bold">
                    Target: 40
                </div>">
        </e-chart-annotation>
    </e-chart-annotations>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## When to Use

**Text Annotations**: Use to add explanatory notes, highlight specific data points, or provide context about important events or milestones in your data.

**Shape Annotations**: Use to draw attention to specific regions, highlight trends, or create visual groupings that help users understand data relationships.

**Image Annotations**: Use to add icons, logos, or visual indicators that represent achievements, events, or categorical information in a more engaging way.

**Point Coordinates**: Use when annotations need to be precisely positioned relative to specific data points for accurate data labeling.

**Pixel Coordinates**: Use for fixed-position annotations like legends, watermarks, or headers that should remain in the same screen location regardless of data.

**Horizontal Striplines**: Use to indicate target ranges, thresholds, safe zones, or performance bands across the entire chart width.

**Vertical Striplines**: Use to highlight specific time periods, events, phases, or categories that span the full height of the chart.

**Recurrence Patterns**: Use to create alternating background colors for better readability in dense charts or to highlight regular intervals.

**Multiple Striplines**: Use to create color-coded zones for different performance levels, risk categories, or quality bands.

Choose annotations and striplines based on the need to add context, highlight important information, indicate thresholds, or improve chart readability and interpretation.
