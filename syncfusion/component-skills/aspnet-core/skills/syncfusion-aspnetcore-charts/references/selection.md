# Selection Configuration

This guide covers comprehensive selection configuration in Syncfusion ASP.NET Core Charts, including point selection, series selection, selection modes, patterns, multiple selection, events, and visual feedback customization.

## Table of Contents

- [Point Selection](#point-selection)
  - [Enable Point Selection](#enable-point-selection)
  - [Point Selection with Custom Color](#point-selection-with-custom-color)
  - [Point Selection on Line Chart](#point-selection-on-line-chart)
- [Series Selection](#series-selection)
  - [Enable Series Selection](#enable-series-selection)
  - [Series Selection with Multiple Series](#series-selection-with-multiple-series)
- [Selection Modes](#selection-modes)
  - [Cluster Selection](#cluster-selection)
  - [Drag Selection (Box Selection)](#drag-selection-box-selection)
  - [Drag X Selection](#drag-x-selection)
  - [Drag Y Selection](#drag-y-selection)
  - [Lasso Selection](#lasso-selection)
- [Selection Patterns](#selection-patterns)
  - [None Pattern (Solid Fill)](#none-pattern-solid-fill)
  - [Dots Pattern](#dots-pattern)
  - [DiagonalForward Pattern](#diagonalforward-pattern)
  - [Horizontal Stripe Pattern](#horizontal-stripe-pattern)
  - [Different Patterns for Multiple Series](#different-patterns-for-multiple-series)
- [Multiple Selection](#multiple-selection)
  - [Enable Multi-Point Selection](#enable-multi-point-selection)
  - [Multi-Series Selection](#multi-series-selection)
  - [Multi-Cluster Selection](#multi-cluster-selection)
- [Selection Events](#selection-events)
  - [Chart Selection Event](#chart-selection-event)
  - [Point Selection Complete Event](#point-selection-complete-event)
  - [Selection Changed Event](#selection-changed-event)
  - [Drag Selection Event](#drag-selection-event)
- [Visual Feedback](#visual-feedback)
  - [Custom Selection Color](#custom-selection-color)
  - [Gradient Selection Style](#gradient-selection-style)
  - [Opacity Change on Selection](#opacity-change-on-selection)
  - [Highlight Unselected](#highlight-unselected)
- [When to Use](#when-to-use)

## Point Selection

### Enable Point Selection

```cshtml
<ejs-chart id="chart" selectionMode="@Syncfusion.EJ2.Charts.SelectionMode.Point" >
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
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
            new { Month = "Feb", Sales = 28 },
            new { Month = "Mar", Sales = 34 },
            new { Month = "Apr", Sales = 32 },
            new { Month = "May", Sales = 40 },
            new { Month = "Jun", Sales = 38 }
        };
        return View();
    }
}
```

### Point Selection with Custom Color

```cshtml
<ejs-chart id="chart" selectionMode="@Syncfusion.EJ2.Charts.SelectionMode.Point" >
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"
                  selectionStyle="rgba(0, 120, 212, 0.8)">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Point Selection on Line Chart

```cshtml
<ejs-chart id="chart" selectionMode="@Syncfusion.EJ2.Charts.SelectionMode.Point" >
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line"
                  width="3"
                  selectionStyle="#0078D4">
            <e-series-marker visible="true" width="10" height="10"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Series Selection

### Enable Series Selection

```cshtml
<ejs-chart id="chart" selectionMode="@Syncfusion.EJ2.Charts.SelectionMode.Series" >
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.Sales2023" 
                  xName="Month" 
                  yName="Sales" 
                  name="2023"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
        <e-series dataSource="ViewBag.Sales2024" 
                  xName="Month" 
                  yName="Sales" 
                  name="2024"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
// Controller
ViewBag.Sales2023 = new[]
{
    new { Month = "Jan", Sales = 35 },
    new { Month = "Feb", Sales = 28 },
    new { Month = "Mar", Sales = 34 },
    new { Month = "Apr", Sales = 32 }
};

ViewBag.Sales2024 = new[]
{
    new { Month = "Jan", Sales = 42 },
    new { Month = "Feb", Sales = 38 },
    new { Month = "Mar", Sales = 45 },
    new { Month = "Apr", Sales = 40 }
};
```

### Series Selection with Multiple Series

```cshtml
<ejs-chart id="chart" selectionMode="@Syncfusion.EJ2.Charts.SelectionMode.Series" >
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ProductA" 
                  xName="Month" 
                  yName="Sales" 
                  name="Product A"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
        <e-series dataSource="ViewBag.ProductB" 
                  xName="Month" 
                  yName="Sales" 
                  name="Product B"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
        <e-series dataSource="ViewBag.ProductC" 
                  xName="Month" 
                  yName="Sales" 
                  name="Product C"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Selection Modes

### Cluster Selection

```cshtml
<ejs-chart id="chart" selectionMode="@Syncfusion.EJ2.Charts.SelectionMode.Cluster" >
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ProductA" 
                  xName="Month" 
                  yName="Sales" 
                  name="Product A"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
        <e-series dataSource="ViewBag.ProductB" 
                  xName="Month" 
                  yName="Sales" 
                  name="Product B"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Drag Selection (Box Selection)

```cshtml
<ejs-chart id="chart" selectionMode="@Syncfusion.EJ2.Charts.SelectionMode.DragXY">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Double"></e-chart-primaryxaxis>
    <e-chart-primaryyaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Double"></e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ScatterData" 
                  xName="X" 
                  yName="Y" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Scatter">
            <e-series-marker width="10" height="10"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
// Controller
var random = new Random();
ViewBag.ScatterData = Enumerable.Range(1, 50).Select(i => new
{
    X = random.Next(10, 100),
    Y = random.Next(10, 100)
}).ToArray();
```

### Drag X Selection

```cshtml
<ejs-chart id="chart" selectionMode="@Syncfusion.EJ2.Charts.SelectionMode.DragX">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.LargeDataSet" 
                  xName="Category" 
                  yName="Value" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Drag Y Selection

```cshtml
<ejs-chart id="chart" selectionMode="@Syncfusion.EJ2.Charts.SelectionMode.DragY">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Area">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Lasso Selection

```cshtml
<ejs-chart id="chart" selectionMode="@Syncfusion.EJ2.Charts.SelectionMode.Lasso">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Double"></e-chart-primaryxaxis>
    <e-chart-primaryyaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Double"></e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ScatterData" 
                  xName="X" 
                  yName="Y" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Scatter">
            <e-series-marker width="8" height="8"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Selection Patterns

### None Pattern (Solid Fill)

```cshtml
<ejs-chart id="chart" selectionMode="@Syncfusion.EJ2.Charts.SelectionMode.Point"  selectionPattern="@Syncfusion.EJ2.Charts.SelectionPattern.None">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"
                  selectionStyle="#0078D4">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Dots Pattern

```cshtml
<ejs-chart id="chart" selectionMode="@Syncfusion.EJ2.Charts.SelectionMode.Point"  selectionPattern="@Syncfusion.EJ2.Charts.SelectionPattern.Dots">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### DiagonalForward Pattern

```cshtml
<ejs-chart id="chart" selectionMode="@Syncfusion.EJ2.Charts.SelectionMode.Point" selectionPattern="@Syncfusion.EJ2.Charts.SelectionPattern.DiagonalForward">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Horizontal Stripe Pattern

```cshtml
<ejs-chart id="chart" selectionMode="@Syncfusion.EJ2.Charts.SelectionMode.Point"  selectionPattern="@Syncfusion.EJ2.Charts.SelectionPattern.HorizontalDash">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Category" 
                  yName="Value" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Bar">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Different Patterns for Multiple Series

```cshtml
<ejs-chart id="chart" selectionMode="@Syncfusion.EJ2.Charts.SelectionMode.Series" >
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ProductA" 
                  xName="Month" 
                  yName="Sales" 
                  name="Product A"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"
                  selectionStyle="#0078D4">
        </e-series>
        <e-series dataSource="ViewBag.ProductB" 
                  xName="Month" 
                  yName="Sales" 
                  name="Product B"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"
                  selectionStyle="#107C10">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Multiple Selection

### Enable Multi-Point Selection

```cshtml
<ejs-chart id="chart" selectionMode="@Syncfusion.EJ2.Charts.SelectionMode.Point"  isMultiSelect="true">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Multi-Series Selection

```cshtml
<ejs-chart id="chart" selectionMode="@Syncfusion.EJ2.Charts.SelectionMode.Series"  isMultiSelect="true">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ProductA" 
                  xName="Month" 
                  yName="Sales" 
                  name="Product A"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
        <e-series dataSource="ViewBag.ProductB" 
                  xName="Month" 
                  yName="Sales" 
                  name="Product B"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
        <e-series dataSource="ViewBag.ProductC" 
                  xName="Month" 
                  yName="Sales" 
                  name="Product C"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Multi-Cluster Selection

```cshtml
<ejs-chart id="chart" selectionMode="@Syncfusion.EJ2.Charts.SelectionMode.Cluster"  isMultiSelect="true">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.Sales2023" 
                  xName="Month" 
                  yName="Sales" 
                  name="2023"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
        <e-series dataSource="ViewBag.Sales2024" 
                  xName="Month" 
                  yName="Sales" 
                  name="2024"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Selection Events

### Chart Selection Event

```cshtml
<ejs-chart id="chart" selectionMode="@Syncfusion.EJ2.Charts.SelectionMode.Point"  chartMouseClick="onChartClick">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>

<div id="selectionInfo"></div>

<script>
    function onChartClick(args) {
        if (args.target.indexOf('point') > -1) {
            var pointIndex = args.target.split('_point_')[1];
            document.getElementById('selectionInfo').innerHTML = 
                'Selected Point Index: ' + pointIndex;
        }
    }
</script>
```

### Point Selection Complete Event

```cshtml
<ejs-chart id="chart" selectionMode="@Syncfusion.EJ2.Charts.SelectionMode.Point"  pointClick="onPointClick">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>

<script>
    function onPointClick(args) {
        console.log('Point clicked:', args.pointIndex);
        console.log('Value:', args.point.y);
        console.log('Category:', args.point.x);
    }
</script>
```

### Selection Changed Event

```cshtml
<ejs-chart id="chart" selectionMode="@Syncfusion.EJ2.Charts.SelectionMode.Point"  selectionComplete="onSelectionComplete">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Area">
        </e-series>
    </e-series-collection>
</ejs-chart>

<div id="selectedData"></div>

<script>
    function onSelectionComplete(args) {
        var selectedPoints = args.selectedDataValues;
        var html = '<h4>Selected Data:</h4><ul>';
        selectedPoints.forEach(function(point) {
            html += '<li>' + point.x + ': ' + point.y + '</li>';
        });
        html += '</ul>';
        document.getElementById('selectedData').innerHTML = html;
    }
</script>
```

### Drag Selection Event

```cshtml
<ejs-chart id="chart" selectionMode="@Syncfusion.EJ2.Charts.SelectionMode.DragXY" dragComplete="onDragComplete">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Double"></e-chart-primaryxaxis>
    <e-chart-primaryyaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Double"></e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ScatterData" 
                  xName="X" 
                  yName="Y" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Scatter">
            <e-series-marker width="10" height="10"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>

<script>
    function onDragComplete(args) {
        console.log('Drag selection completed');
        console.log('Selected data count:', args.selectedDataValues.length);
        args.selectedDataValues.forEach(function(point) {
            console.log('X:', point.x, 'Y:', point.y);
        });
    }
</script>
```

## Visual Feedback

### Custom Selection Color

```cshtml
<ejs-chart id="chart" selectionMode="@Syncfusion.EJ2.Charts.SelectionMode.Point" >
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"
                  fill="#D3D3D3"
                  selectionStyle="#FFB900">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Gradient Selection Style

```cshtml
<ejs-chart id="chart" selectionMode="@Syncfusion.EJ2.Charts.SelectionMode.Point" >
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"
                  selectionStyle="url(#gradient)">
        </e-series>
    </e-series-collection>
</ejs-chart>

<svg style="width:0;height:0">
    <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#0078D4;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#004578;stop-opacity:1" />
        </linearGradient>
    </defs>
</svg>
```

### Opacity Change on Selection

```cshtml
<ejs-chart id="chart" selectionMode="@Syncfusion.EJ2.Charts.SelectionMode.Series" >
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ProductA" 
                  xName="Month" 
                  yName="Sales" 
                  name="Product A"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line"
                  width="2"
                  opacity="0.5">
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
        <e-series dataSource="ViewBag.ProductB" 
                  xName="Month" 
                  yName="Sales" 
                  name="Product B"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line"
                  width="2"
                  opacity="0.5">
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>

<style>
    .e-chart .e-selected-series {
        opacity: 1 !important;
    }
</style>
```

### Highlight Unselected

```cshtml
<ejs-chart id="chart" selectionMode="@Syncfusion.EJ2.Charts.SelectionMode.Point"  highlightMode="@Syncfusion.EJ2.Charts.HighlightMode.Point">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## When to Use

**Point Selection**: Use when users need to identify and interact with individual data points for detailed analysis or data operations.

**Series Selection**: Use to allow users to focus on specific datasets in multi-series charts, hiding or highlighting particular trends.

**Cluster Selection**: Use in grouped column/bar charts to select all series points at a specific category for comparison.

**Drag Selection**: Use with scatter plots or large datasets where users need to select multiple points in a region for batch operations.

**Lasso Selection**: Use for free-form selection of data points in scatter charts, providing more flexibility than rectangular drag selection.

**Selection Patterns**: Use to provide visual differentiation for selected items, especially important for accessibility and monochrome displays.

**Multiple Selection**: Use when users need to compare or perform operations on multiple non-contiguous data points or series simultaneously.

**Selection Events**: Use to trigger custom actions, data filtering, drill-down navigation, or update other UI components based on user selections.

**Custom Visual Feedback**: Use to provide clear, branded, and accessible visual indicators that match your design system and improve user experience.

Choose selection features based on interaction requirements, data analysis needs, user workflow, and whether single or multiple item selection is needed.
