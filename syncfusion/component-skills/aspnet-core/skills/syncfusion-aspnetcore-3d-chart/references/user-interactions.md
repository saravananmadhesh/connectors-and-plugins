# User Interactions & Events

## Table of Contents
- [Selection Modes](#selection-modes)
  - [Selection Mode Options](#selection-mode-options)
- [Point Selection](#point-selection)
  - [Enable Point Selection](#enable-point-selection)
  - [Multiple Point Selection](#multiple-point-selection)
- [Series Selection](#series-selection)
  - [Enable Series Selection](#enable-series-selection)
  - [Events](#events)
- [Cluster Selection](#cluster-selection)
  - [Enable Cluster Selection](#enable-cluster-selection)
  - [Use Case: Comparing Time Periods](#use-case-comparing-time-periods)
- [Tooltip Basics](#tooltip-basics)
  - [Enable Tooltips](#enable-tooltips)
  - [Disable Tooltips](#disable-tooltips)
  - [Default Tooltip Content](#default-tooltip-content)
- [Tooltip Configuration](#tooltip-configuration)
  - [Fixed Tooltip Position](#fixed-tooltip-position)
  - [Tooltip Styling](#tooltip-styling)
  - [Tooltip Fade Out Duration](#tooltip-fade-out-duration)
- [Tooltip Formatting](#tooltip-formatting)
  - [Format String Template](#format-string-template)
  - [Format with Multiple Values](#format-with-multiple-values)
  - [Format Variables](#format-variables)
  - [Inline Tooltip Formatting](#inline-tooltip-formatting)
  - [Currency Format](#currency-format)
  - [Multi-Line Tooltip](#multi-line-tooltip)
- [Selection Events](#selection-events)
  - [Selection Complete Event](#selection-complete-event)
  - [Get Selected Values](#get-selected-values)
  - [Point Render Event](#point-render-event)
- [Complete Interactive Example](#complete-interactive-example)

## Selection Modes

Selection enables users to interact with chart data by clicking on points or series. Choose from four selection modes.

### Selection Mode Options

```html
<ejs-chart3d id="chart" 
             selectionMode="@Syncfusion.EJ2.Charts.Chart3DSelectionMode.Point"
             title="Sales Data"
             enableRotation="true" rotation="7" tilt="10">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Sales" 
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>
```

| Mode | Behavior |
|------|----------|
| None | No selection (default) |
| Point | Select individual data points |
| Series | Select entire series |
| Cluster | Select same-index points across all series |

## Point Selection

Select individual data points by clicking on them.

### Enable Point Selection

```html
<ejs-chart3d id="chart" 
             selectionMode="@Syncfusion.EJ2.Charts.Chart3DSelectionMode.Point"
             title="Monthly Sales" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model.SalesData" 
                          xName="Month" 
                          yName="Sales" 
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>
```

**Result:** Users can click on any column to select it. Selected points are highlighted with a border or color change.

### Multiple Point Selection

When `isMultiSelect="true"` is enabled, users can select multiple points, series or clusters.

```html
<ejs-chart3d id="chart" 
             selectionMode="@Syncfusion.EJ2.Charts.Chart3DSelectionMode.Point"
             isMultiSelect="true"
             title="Sales" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Sales" 
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>
```

Now users can:
- Click to select one point

## Series Selection

To select a point or series through legend use the `ToggleVisibility` property. Also, use `EnableHighlight` property for highlighting the series through legend.

### Enable Series Selection

```html
<ejs-chart3d id="chart" 
             selectionMode="@Syncfusion.EJ2.Charts.Chart3DSelectionMode.Series"
             title="Sales Comparison" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Sales" 
                          name="Sales"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
        
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Revenue" 
                          name="Revenue"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
    </e-chart3d-series-collection>
    
    <e-chart3d-legendsettings position="Bottom" toggleVisibility="true" enableHighlight="true">
    </e-chart3d-legendsettings>
</ejs-chart3d>
```

**Result:** Clicking any Sales column highlights the entire Sales series. Clicking any Revenue column highlights the entire Revenue series.

### Events

Handle series selection in JavaScript:

```html
<ejs-chart3d id="chart" 
             selectionMode="@Syncfusion.EJ2.Charts.Chart3DSelectionMode.Series"
             pointRender="onPointRender"
             seriesRender="onSeriesRender"
             title="Sales" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Sales" 
                          name="Sales"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Expenses" 
                          name="Expenses"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>

<script>
function onSeriesRender(args) {
    console.log("Series rendered:", args.series.name);
}
</script>
```

## Cluster Selection

Select points at the same index across all series simultaneously.

### Enable Cluster Selection

```html
<ejs-chart3d id="chart" 
             selectionMode="@Syncfusion.EJ2.Charts.Chart3DSelectionMode.Cluster"
             title="Multi-Series Data" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Sales" 
                          name="Sales"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
        
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Revenue" 
                          name="Revenue"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
        
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Expenses" 
                          name="Expenses"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>
```

**Result:** Clicking on "January Sales" also selects "January Revenue" and "January Expenses" - all January values across series are highlighted.

### Use Case: Comparing Time Periods

```html
<ejs-chart3d id="chart" 
             selectionMode="@Syncfusion.EJ2.Charts.Chart3DSelectionMode.Cluster"
             title="Quarterly Comparison">
    <!-- Three series for different metrics -->
    <!-- Clicking a quarter highlights all metrics for that quarter -->
</ejs-chart3d>
```

Useful for comparing how all metrics performed in a specific time period.

## Tooltip Basics

Tooltips display information about data points when users hover over them.

### Enable Tooltips

```html
<ejs-chart3d id="chart" title="Sales Data" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Sales" 
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
    </e-chart3d-series-collection>
    
    <!-- Enable tooltips -->
    <e-chart3d-tooltipsettings enable="true">
    </e-chart3d-tooltipsettings>
</ejs-chart3d>
```

**Result:** Hovering over any column shows a tooltip with X and Y values.

### Disable Tooltips

```html
<e-chart3d-tooltipsettings enable="false">
</e-chart3d-tooltipsettings>
```

### Default Tooltip Content

By default, tooltips show:
- Series name
- X-axis value
- Y-axis value

Example: "Sales: January, 35000"

## Tooltip Configuration

Customize tooltip appearance and behavior.

### Fixed Tooltip Position

By default, tooltips follow the mouse. Make them fixed:

```html
<e-chart3d-tooltipsettings enable="true" 
                           enableMarker="true"
                           x="100" y="50">
</e-chart3d-tooltipsettings>
```

Tooltip appears at (100px, 50px) from top-left, regardless of mouse position.

### Tooltip Styling

```html
<e-chart3d-tooltipsettings enable="true">
    <e-chart3dtooltipsettings-border width="2" color="grey"></e-chart3dtooltipsettings-border>
    <e-chart3dtooltipsettings-textstyle color="#FFFFFF" 
                         fontFamily="Arial" 
                         size="12px">
    </e-chart3dtooltipsettings-textstyle>
</e-chart3d-tooltipsettings>
```

### Tooltip Fade Out Duration

```html
<e-chart3d-tooltipsettings enable="true" 
                           fadeOutDuration="1000">
</e-chart3d-tooltipsettings>
```

Tooltip disappears after 1000ms (1 second) of inactivity.

## Tooltip Formatting

Customize tooltip content using templates and format strings.

### Format String Template

```html
<e-chart3d-tooltipsettings enable="true" 
                           format="${series.name}: ${point.y}">
</e-chart3d-tooltipsettings>
```

**Result:** Shows "Sales: 35000"

### Format with Multiple Values

```html
<e-chart3d-tooltipsettings enable="true" 
                           format="${point.x} - ${series.name}: ${point.y}">
</e-chart3d-tooltipsettings>
```

**Result:** Shows "January - Sales: 35000"

### Format Variables

| Variable | Content | Example |
|----------|---------|---------|
| ${series.name} | Series name | "Sales" |
| ${point.x} | X-axis value | "January" |
| ${point.y} | Y-axis value | "35000" |

### Inline Tooltip Formatting

The tooltip content can be formatted directly within the `format` property by adding DateTime or number format specifiers to supported tooltip tokens. This allows you to control how point and series values are displayed without using additional events.

Apply a format specifier by adding a colon (`:`) after the tooltip token, followed by the required format.

```html
<e-chart3d-tooltipsettings
    enable="true"
    format="${series.name}<br/>${point.x:MMM yyyy}: ${point.y:n2}<br/>Opacity: ${series.opacity}">
</e-chart3d-tooltipsettings>
```

In the above example, `point.x` is displayed in month-year format, `point.y` is displayed with two decimal places, and `series.opacity` displays the opacity applied to the series.

Inline formatting can be applied to the following tooltip tokens:

- `${point.x}` or `${point.x:MMM yyyy}`: Specifies the x-value of the data point, such as a DateTime or category value.
- `${point.y}` or `${point.y:n2}`: Specifies the numeric y-value of the data point.
- `${series.name}`: Specifies the name assigned to the series.
- `${series.type}`: Specifies the series rendering type, such as `Column`, `Bar`, `StackingColumn`, or `StackingBar`.
- `${series.opacity}` or `${series.opacity:n1}`: Specifies the opacity applied to the series.

> **Important:** The availability of point-specific tokens depends on the fields configured in the data source and the 3D Chart series type. The `${series.name}` and `${series.type}` tokens return string values, so DateTime or number formatting is not applied to them.

The following format types are supported:

**DateTime formats:**

- `MMM yyyy`: Displays the abbreviated month and four-digit year.
- `MM:yy`: Displays the two-digit month and year.
- `dd MMM`: Displays the two-digit day and abbreviated month.

**Number formats:**

- `n2`: Displays a number with two decimal places.
- `n0`: Displays a number without decimal places.
- `c2`: Displays the value in currency format with two decimal places.
- `p1`: Displays the value in percentage format with one decimal place.
- `e1`: Displays the value in exponential notation with one decimal place.

If the specified format does not match the resolved value type, the original value is displayed.

### Currency Format

```html
<e-chart3d-tooltipsettings enable="true" 
                           format="<b>${point.x}</b><br/>Sales: $${point.y}">
</e-chart3d-tooltipsettings>
```

or

```html
<e-chart3d-tooltipsettings enable="true" 
                           format="<b>${point.x}</b><br/>Sales: ${point.y:c0}">
</e-chart3d-tooltipsettings>
```


**Result:**
```
January
Sales: $35000
```

### Multi-Line Tooltip

```html
<e-chart3d-tooltipsettings enable="true" 
                           format="${point.x}<br/>${series.name}<br/>Amount: ${point.y}">
</e-chart3d-tooltipsettings>
```

## Selection Events

Handle selection events with JavaScript callbacks.

### Selection Complete Event

```html
<ejs-chart3d id="chart" 
             selectionMode="@Syncfusion.EJ2.Charts.Chart3DSelectionMode.Point"
             selectionComplete="onSelectionComplete"
             title="Sales" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Sales" 
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>

<script>
function onSelectionComplete(args) {
    console.log("Selection changed");
    console.log("Selected points:", args.selectedDataPoints);
    
    // Get all selected points
    if (args.selectedDataPoints) {
        args.selectedDataPoints.forEach(function(point) {
            console.log("Selected point:", point.point.x, point.point.y);
        });
    }
}
</script>
```

### Get Selected Values

```javascript
function onSelectionComplete(args) {
    var selectedValues = [];
    
    if (args.selectedDataPoints) {
        args.selectedDataPoints.forEach(function(point) {
            selectedValues.push({
                x: point.point.x,
                y: point.point.y,
                seriesName: args.series.name
            });
        });
    }
    
    console.log("Selected data:", selectedValues);
    // Send to server or update UI
}
```

### Point Render Event

```html
<ejs-chart3d id="chart" 
             pointRender="onPointRender"
             title="Sales" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Sales" 
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>

<script>
function onPointRender(args) {
    // Customize each point before rendering
    if (args.point.yValue > 35) {
        args.fill = '#4CAF50';  // Green for high values
    }
}
</script>
```

## Complete Interactive Example

```html
<ejs-chart3d id="interactiveChart" 
             selectionMode="@Syncfusion.EJ2.Charts.Chart3DSelectionMode.Point"
             isMultiSelect="true"
             selectionComplete="handleSelection"
             title="Interactive Sales Dashboard" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model.SalesData" 
                          xName="Month" 
                          yName="Sales" 
                          name="Sales"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column"
                          fill="#1976D2">
        </e-chart3d-series>
    </e-chart3d-series-collection>
    
    <!-- Tooltip with custom format -->
    <e-chart3d-tooltipsettings enable="true" 
                               format="<b>${point.x}</b><br/>Sales: ${point.y}">
        <e-chart3dtooltipsettings-border width="1" color="#333333">
        </e-chart3dtooltipsettings-border>
    </e-chart3d-tooltipsettings>
    
    <!-- Legend with toggle -->
    <e-chart3d-legendsettings position="Bottom" toggleVisibility="true" enableHighlight="true">
    </e-chart3d-legendsettings>
</ejs-chart3d>

<div id="selectedData" style="margin-top: 20px; padding: 10px; border: 1px solid #CCC;">
    <h4>Selected Data:</h4>
    <p id="selectionInfo">Click on data points to select</p>
</div>

<script>
function handleSelection(args) {
    var selectedInfo = [];
    
    if (args.selectedDataPoints && args.selectedDataPoints.length > 0) {
        args.selectedDataPoints.forEach(function(point) {
            selectedInfo.push(
                point.point.x + ": $" + point.point.y
            );
        });
        document.getElementById('selectionInfo').innerHTML = selectedInfo.join("<br/>");
    } else {
        document.getElementById('selectionInfo').innerHTML = "No selection";
    }
}
</script>
```

**Features:**
- Point selection with multiple selection enabled
- Custom styling for selected points (red highlight)
- Hover tooltips showing formatted data
- Toggle legend to show/hide series
- Display selected data in panel below chart

## Troubleshooting Interactions

**Issue: Selection not working**
- Verify `selectionMode` is set: Point, Series, or Cluster
- Check for JavaScript errors in console
- Ensure chart has data to select

**Issue: Tooltips not appearing**
- Confirm `<e-chart3d-tooltipsettings enable="true">`
- Check `format` template syntax
- Verify series have data

**Issue: Selection event not firing**
- Confirm event handler is defined: `selectionComplete="functionName"`
- Verify function is in global scope (not inside another function)
- Check browser console for JavaScript errors

**Issue: Multiple selection not working**
- Verify `isMultiSelect="true"` is set when multiple selection is needed
- Ensure `selectionMode="@Syncfusion.EJ2.Charts.Chart3DSelectionMode.Point"` is set
