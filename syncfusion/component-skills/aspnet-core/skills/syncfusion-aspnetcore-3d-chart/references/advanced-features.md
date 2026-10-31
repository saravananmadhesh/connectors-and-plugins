# Advanced Features

## Table of Contents
- [Print Functionality](#print-functionality)
  - [Basic Print](#basic-print)
  - [Print from a Button Area](#print-from-a-button-area)
- [Export to Image](#export-to-image)
  - [Export as PNG](#export-as-png)
  - [Export as SVG](#export-as-svg)
  - [Export as PDF](#export-as-pdf)
  - [Export Multiple Charts](#export-multiple-charts)
- [Accessibility Features](#accessibility-features)
  - [Screen Reader Friendly Data Table](#screen-reader-friendly-data-table)
  - [Keyboard Focus Wrapper](#keyboard-focus-wrapper)
- [Event Handling](#event-handling)
  - [Selection Complete Event](#selection-complete-event)
  - [Point Render Event](#point-render-event)
  - [Mouse Interaction Events](#mouse-interaction-events)
- [Performance Optimization](#performance-optimization)
  - [Debounce Resize](#debounce-resize)
  - [Progressive Data Loading](#progressive-data-loading)
  - [Cache Chart Instance](#cache-chart-instance)
- [Cross-Browser Compatibility](#cross-browser-compatibility)
  - [Capability Check Example](#capability-check-example)
  - [Responsive Container](#responsive-container)
- [Complete Advanced Example](#complete-advanced-example)
  - [Features](#features)

## Print Functionality

The Syncfusion 3D Chart can be printed directly from the browser by calling the public `print()` method on the chart instance.

### Basic Print

```cshtml
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
</ejs-chart3d>

<button onclick="printChart()">Print Chart</button>

<script>
function printChart() {
    var chart = document.getElementById('chart').ej2_instances[0];
    chart.print();
}
</script>
```

### Print from a Button Area

```cshtml
<div style="margin-bottom: 10px;">
    <button class="btn btn-primary" onclick="printChart()">Print</button>
</div>

<ejs-chart3d id="chart" title="Sales Report" enableRotation="true" rotation="7" tilt="10" depth="100">
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
function printChart() {
    var chartObj = document.getElementById('chart').ej2_instances[0];
    chartObj.print();
}
</script>
```

---

## Export to Image

The Syncfusion 3D Chart supports exporting through the `export(type, fileName)` pattern. Enable export with `enableExport="true"` on the chart when needed.

### Export as PNG

```cshtml
<ejs-chart3d id="chart" title="Sales Data" enableExport="true" enableRotation="true" rotation="7" tilt="10" depth="100">
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

<button onclick="exportPNG()">Export as PNG</button>

<script>
function exportPNG() {
    var chart = document.getElementById('chart').ej2_instances[0];
    chart.export('PNG', 'sales-chart');
}
</script>
```

### Export as SVG

```javascript
function exportSVG() {
    var chart = document.getElementById('chart').ej2_instances[0];
    chart.export('SVG', 'sales-chart');
}
```

### Export as PDF

```javascript
function exportPDF() {
    var chart = document.getElementById('chart').ej2_instances[0];
    chart.export('PDF', 'sales-chart');
}
```

### Export Multiple Charts

```javascript
function exportAllCharts() {
    var chart1 = document.getElementById('chart1').ej2_instances[0];
    var chart2 = document.getElementById('chart2').ej2_instances[0];
    var chart3 = document.getElementById('chart3').ej2_instances[0];

    chart1.export('PNG', 'chart1');
    chart2.export('PNG', 'chart2');
    chart3.export('PNG', 'chart3');
}
```

---

## Accessibility Features

For accessibility, use a meaningful chart title, clear series names, and provide an HTML table alternative where appropriate.

### Screen Reader Friendly Data Table

```html
<ejs-chart3d id="chart" title="Sales Data">
    <!-- Chart visualization -->
</ejs-chart3d>

<table summary="Sales data represented in the chart above">
    <thead>
        <tr>
            <th>Quarter</th>
            <th>Sales</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Q1</td>
            <td>$100,000</td>
        </tr>
        <tr>
            <td>Q2</td>
            <td>$120,000</td>
        </tr>
    </tbody>
</table>
```

### Keyboard Focus Wrapper

```html
<div tabindex="0" aria-label="3D chart showing quarterly sales">
    <ejs-chart3d id="chart" title="Quarterly Sales" enableRotation="true" rotation="7" tilt="10" depth="100">
        <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
        </e-chart3d-primaryxaxis>
        <e-chart3d-series-collection>
            <e-chart3d-series dataSource="@Model"
                              xName="Quarter"
                              yName="Sales"
                              name="Sales"
                              type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
            </e-chart3d-series>
        </e-chart3d-series-collection>
    </ejs-chart3d>
</div>
```

---

## Event Handling

Use chart events to respond to user interactions and rendering lifecycle changes.

### Selection Complete Event

```cshtml
<ejs-chart3d id="chart"
             title="Sales"
             selectionMode="@Syncfusion.EJ2.Charts.Chart3DSelectionMode.Point"
             selectionComplete="onSelectionComplete" enableRotation="true" rotation="7" tilt="10" depth="100">
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
    console.log("Selection completed", args);
}
</script>
```

### Point Render Event

```cshtml
<ejs-chart3d id="chart"
             title="Sales"
             pointRender="onPointRender" enableRotation="true" rotation="7" tilt="10" depth="100">
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
    console.log("Point render args", args);

    if (args.point && args.point.yValue > 40) {
        args.fill = '#4CAF50';
    }
}
</script>
```

### Mouse Interaction Events

```cshtml
<ejs-chart3d id="chart"
             title="Sales"
             chart3DMouseMove="onMouseMove"
             chart3DMouseLeave="onMouseLeave" enableRotation="true" rotation="7" tilt="10" depth="100">
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
function onMouseMove(args) {
    console.log("Mouse move", args);
}

function onMouseLeave(args) {
    console.log("Mouse leave", args);
}
</script>
```

---

## Performance Optimization

For better performance, use application-level patterns around the chart instance such as resize debouncing, incremental data loading, and instance caching.

### Debounce Resize

```javascript
var resizeTimer;

window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        var chart = document.getElementById('chart').ej2_instances[0];
        chart.refresh();
    }, 250);
});
```

### Progressive Data Loading

```csharp
[HttpGet("data")]
public IActionResult GetChartData(int skip = 0, int take = 100)
{
    var allData = GetAllChartData();
    var chunk = allData.Skip(skip).Take(take).ToList();
    return Ok(chunk);
}
```

```javascript
var allData = [];
var pageSize = 100;

function loadData(skip) {
    fetch('/api/chart/data?skip=' + skip + '&take=' + pageSize)
        .then(response => response.json())
        .then(data => {
            allData = allData.concat(data);

            var chart = document.getElementById('chart').ej2_instances[0];
            chart.series[0].dataSource = allData;
            chart.refresh();

            if (data.length === pageSize) {
                loadData(skip + pageSize);
            }
        });
}

loadData(0);
```

### Cache Chart Instance

```javascript
var chartInstance = null;

function getChartInstance() {
    if (!chartInstance) {
        chartInstance = document.getElementById('chart').ej2_instances[0];
    }
    return chartInstance;
}

function updateData(newData) {
    var chart = getChartInstance();
    chart.series[0].dataSource = newData;
    chart.refresh();
}
```

---

## Cross-Browser Compatibility

If your app needs a compatibility check, you can use an app-level capability test and show a message when the environment may not fully support the 3D experience.

### Capability Check Example

```javascript
function supportsWebGL() {
    try {
        var canvas = document.createElement('canvas');
        return !!(
            window.WebGLRenderingContext &&
            (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
    } catch (e) {
        return false;
    }
}

if (!supportsWebGL()) {
    console.warn("The current environment may not support the 3D chart experience.");
}
```

### Responsive Container

```html
<div style="width: 100%; height: 500px;">
    <ejs-chart3d id="responsiveChart" title="Responsive Chart" enableRotation="true" rotation="7" tilt="10" depth="100">
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
</div>
```

The chart can be hosted in a responsive container, and your app can refresh it on resize when needed.

---

## Complete Advanced Example

```cshtml
<ejs-chart3d id="advancedChart"
             title="Advanced Analytics"
             selectionMode="@Syncfusion.EJ2.Charts.Chart3DSelectionMode.Point"
             selectionComplete="onSelection"
             enableExport="true" enableRotation="true" rotation="7" tilt="10" depth="100">
        <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
        </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model"
                          xName="Month"
                          yName="Sales"
                          name="Sales"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
    </e-chart3d-series-collection>

    <e-chart3d-tooltipsettings enable="true"
                               format="${point.x}: ${point.y}">
    </e-chart3d-tooltipsettings>

    <e-chart3d-legendsettings position="@Syncfusion.EJ2.Charts.LegendPosition.Bottom"
                              toggleVisibility="true">
    </e-chart3d-legendsettings>
</ejs-chart3d>

<div style="margin: 20px 0;">
    <button onclick="printChart()" class="btn">Print</button>
    <button onclick="exportChart()" class="btn">Export PNG</button>
    <button onclick="updateData()" class="btn">Update Data</button>
</div>

<div id="status" style="padding: 10px; background: #F5F5F5; border-radius: 4px;">
    Ready
</div>

<script>
function updateStatus(msg) {
    document.getElementById('status').innerHTML = msg;
}

function onSelection(args) {
    console.log("Selection completed", args);
    updateStatus("Selection changed");
}

function printChart() {
    var chart = document.getElementById('advancedChart').ej2_instances[0];
    chart.print();
    updateStatus("Printing...");
}

function exportChart() {
    var chart = document.getElementById('advancedChart').ej2_instances[0];
    chart.export('PNG', 'chart');
    updateStatus("Exported as PNG");
}

function updateData() {
    var chart = document.getElementById('advancedChart').ej2_instances[0];
    // Fetch or assign new data here.
    chart.refresh();
    updateStatus("Data updated");
}
</script>
```

### Features
- Print via `print()` on the chart instance.
- Export via `export(type, fileName)` with `enableExport="true"`.
- Selection handling through `selectionComplete`.
- Tooltip formatting using `${point.x}` and `${point.y}`.
- Safe application-level status updates and refresh logic around the chart instance.