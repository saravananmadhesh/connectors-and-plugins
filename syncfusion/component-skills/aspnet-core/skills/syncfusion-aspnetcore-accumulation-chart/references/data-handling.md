# Data Handling

This guide covers data manipulation techniques including grouping small values, handling empty points, and dynamic data updates.

## Table of Contents

- [Data Grouping](#data-grouping)
  - [Basic Grouping](#basic-grouping)
  - [Grouping by Value](#grouping-by-value)
  - [Grouping by Point Count](#grouping-by-point-count)
  - [Broken Slice (Drill Down)](#broken-slice-drill-down)
  - [Customizing Grouped Points](#customizing-grouped-points)
- [Empty Points](#empty-points)
  - [Understanding Empty Points](#understanding-empty-points)
  - [Empty Point Modes](#empty-point-modes)
  - [Customizing Empty Points](#customizing-empty-points)
  - [No Data Template](#no-data-template)
- [Dynamic Data Updates](#dynamic-data-updates)
  - [Update Data on Button Click](#update-data-on-button-click)
  - [Real-Time Data Updates (Polling)](#real-time-data-updates-polling)
  - [Add Data Point Dynamically](#add-data-point-dynamically)
- [Data Source Patterns](#data-source-patterns)
  - [Server-Side Data Binding](#server-side-data-binding)
  - [JSON Data Source](#json-data-source)
  - [Database Query Example](#database-query-example)
- [Troubleshooting](#troubleshooting)
  - [Data Not Displaying](#data-not-displaying)
  - [Grouped Points Not Working](#grouped-points-not-working)
  - [Empty Points Show Incorrectly](#empty-points-show-incorrectly)
  - [Dynamic Updates Not Reflecting](#dynamic-updates-not-reflecting)
  - [Performance Issues with Large Datasets](#performance-issues-with-large-datasets)
- [Best Practices](#best-practices)
- [Data Model Examples](#data-model-examples)

## Data Grouping

Group small data points together to simplify visualization and focus on larger segments.

### Basic Grouping

Combine values below a threshold into a single "Others" group:

```cshtml
@{
    List<SalesData> salesData = new List<SalesData>
    {
        new SalesData { Product = "Laptop", Revenue = 45 },
        new SalesData { Product = "Desktop", Revenue = 28 },
        new SalesData { Product = "Tablet", Revenue = 15 },
        new SalesData { Product = "Smartphone", Revenue = 8 },    // Will be grouped
        new SalesData { Product = "Smartwatch", Revenue = 3 },    // Will be grouped
        new SalesData { Product = "Earbuds", Revenue = 1 }        // Will be grouped
    };
}

<ejs-accumulationchart id="groupedChart">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@salesData" 
                              xName="Product" 
                              yName="Revenue"
                              groupTo="11">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Result:** Products with revenue < 11% are combined into "Others" slice.

### Grouping by Value

Use the `groupTo` property to set a threshold value:

```cshtml
<!-- Group values less than 10 -->
<ejs-accumulationchart id="valueGrouping">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@salesData" 
                              xName="Product" 
                              yName="Revenue"
                              groupTo="10"
                              groupMode="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**How it works:**
- `groupTo="10"` - All points with value < 10% are grouped
- `groupMode="Value"` - Explicit value-based grouping (default)
- Grouped points shown as single "Others" slice

**Percentage vs Absolute:**

```cshtml
<!-- Percentage (default) -->
groupTo="10"        <!-- Groups values < 10% -->

<!-- Absolute value -->
groupTo="1000"      <!-- Groups values < 1000 -->
```

### Grouping by Point Count

Group based on the number of data points:

```cshtml
@{
    List<CountryData> trafficData = new List<CountryData>
    {
        new CountryData { Country = "USA", Visitors = 5000 },
        new CountryData { Country = "India", Visitors = 3500 },
        new CountryData { Country = "UK", Visitors = 2200 },
        new CountryData { Country = "Germany", Visitors = 1800 },
        new CountryData { Country = "France", Visitors = 1500 },  // Point 5
        new CountryData { Country = "Japan", Visitors = 1200 },   // Will be grouped
        new CountryData { Country = "Canada", Visitors = 1000 },  // Will be grouped
        new CountryData { Country = "Australia", Visitors = 800 } // Will be grouped
    };
}

<ejs-accumulationchart id="pointGrouping">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@trafficData" 
                              xName="Country" 
                              yName="Visitors"
                              groupTo="5"
                              groupMode="Point">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Result:** Shows first 5 countries individually, groups remaining into "Others".

**When to use:**
- **Value mode:** When you want to hide small values (market share < 5%)
- **Point mode:** When you want to show top N items (top 10 products)

### Broken Slice (Drill Down)

Allow users to click "Others" to see grouped points:

```cshtml
<div>
    <ejs-accumulationchart id="chart" textRender="textRender" pointClick="pointClick" chartMouseClick="chartMouseClick" title="Automobile Sales by Category">
        <e-accumulationchart-legendsettings visible="false"></e-accumulationchart-legendsettings>
        <e-accumulation-series-collection>
            <e-accumulation-series explode="false" type="Pie" xName="x" yName="y" dataSource="ViewBag.dataSource" name="Level 1">
                <e-accumulationseries-datalabel visible="true" name="text">
                    <e-font fontWeight="600"></e-font>
                </e-accumulationseries-datalabel>
            </e-accumulation-series>
        </e-accumulation-series-collection>
    </ejs-accumulationchart>
</div>

<script>
    var pointIndex = -1;
    // Data structure containing nested children in the 'z' property
    var data = [
        { x: 'SUV', y: 25, z: [
            { title: 'SUV Segment Details', x: 'Toyota', y: 8, z: [{ x: '2000', y: 20 }, { x: '2001', y: 30 }] },
            { x: 'Ford', y: 12 }, { x: 'GM', y: 17 }] 
        },
        { x: 'Car', y: 37, z: [{ title: 'Car Segment Details', x: 'Toyota', y: 7 }, { x: 'Chrysler', y: 12 }] }
    ];

    var textRender = function (args) {
        args.text = args.point.x + ' ' + args.point.y + ' %';
    };

    var chartMouseClick = function (args) {
        var pie = document.getElementById("chart").ej2_instances[0];
        // Check if the click target is the 'back' button image or div
        if (args.target.indexOf('back') > -1) {
            if (pie.series[0].name === 'Level 3') {
                pie.series[0].dataSource = data[window.pointIndex].z;
                pie.series[0].name = 'Level 2';
                pie.title = data[window.pointIndex].z[0].title;
            } else if (pie.series[0].name === 'Level 2') {
                pie.series[0].dataSource = data;
                pie.series[0].name = 'Level 1';
                pie.title = 'Automobile Sales by Category';
                pie.annotations = [{}]; // Remove back button
                pie.pointClick = pointClick; // Restore original click event
            }
            pie.refresh();
        }
    };

    var pointClick = function (args) {
        var pie = document.getElementById("chart").ej2_instances[0];
        if (data[args.pointIndex].z) {
            window.pointIndex = args.pointIndex;
            pie.series[0].dataSource = data[args.pointIndex].z;
            pie.title = data[args.pointIndex].z[0].title;
            pie.series[0].name = 'Level 2';
            
            // Add Center Annotation (Back Button)
            pie.annotations = [{
                content: '<div id="back" style="cursor:pointer;"><img src="https://ej2.syncfusion.com/javascript/demos/src/chart/images/back.png" id="back" style="width:30px;height:30px;"/></div>',
                region: 'Series', x: '50%', y: '50%'
            }];
            pie.pointClick = level2Click; // Switch to second level click logic
            pie.refresh();
        }
    }

    var level2Click = function (args) {
        var pie = document.getElementById("chart").ej2_instances[0];
        // Logic for Level 3 drill down if data exists
        if (pie.series[0].name === 'Level 2' && pie.series[0].dataSource[args.pointIndex].z) {
            pie.series[0].dataSource = pie.series[0].dataSource[args.pointIndex].z;
            pie.title = 'Yearly Sales Detail';
            pie.series[0].name = 'Level 3';
            pie.refresh();
        }
    };
</script>
```

**Behavior:**
1. User sees "Others" slice with grouped data
2. Click "Others" to explode and reveal individual slices
3. Click again to collapse back to grouped view

### Customizing Grouped Points

Style the "Others" group differently:

```cshtml
<ejs-accumulationchart id="customGroupChart" pointRender="onPointRender">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@salesData" 
                              xName="Product" 
                              yName="Revenue"
                              groupTo="10">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>

<script>
    function onPointRender(args) {
        // Customize the "Others" group
        if (args.point.x === 'Others') {
            args.fill = '#CCCCCC';  // Gray color
            args.border.color = '#999999';
            args.border.width = 2;
        }
    }
</script>
```

**Custom Group Name:**

```cshtml
<ejs-accumulationchart id="renamedGroup" textRender="onTextRender">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@salesData" 
                              xName="Product" 
                              yName="Revenue"
                              groupTo="10">
            <e-accumulationseries-datalabel visible="true">
            </e-accumulationseries-datalabel>
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>

<script>
    function onTextRender(args) {
        // Rename "Others" to "Miscellaneous"
        if (args.point.x === 'Others') {
            args.text = 'Miscellaneous';
        }
    }
</script>
```

## Empty Points

Handle missing or null data gracefully in your charts.

### Understanding Empty Points

Empty points occur when data contains `null`, `undefined`, or missing values:

```csharp
public class SalesData
{
    public string Month { get; set; }
    public double? Revenue { get; set; }  // Nullable to allow null values
}

List<SalesData> data = new List<SalesData>
{
    new SalesData { Month = "Jan", Revenue = 35 },
    new SalesData { Month = "Feb", Revenue = null },    // Empty point
    new SalesData { Month = "Mar", Revenue = 42 },
    new SalesData { Month = "Apr", Revenue = null },    // Empty point
    new SalesData { Month = "May", Revenue = 50 }
};
```

### Empty Point Modes

Control how empty points are rendered:

**1. Gap Mode (Default)**

Skip empty points, leaving a gap:

```cshtml
<ejs-accumulationchart id="gapMode">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@data" 
                              xName="Month" 
                              yName="Revenue">
            <e-accumulationseries-emptypointsettings mode="Gap">
            </e-accumulationseries-emptypointsettings>
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Result:** Feb and Apr are not displayed in the chart.

**2. Zero Mode**

Treat empty points as zero:

```cshtml
<ejs-accumulationchart id="zeroMode">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@data" 
                              xName="Month" 
                              yName="Revenue">
            <e-accumulationseries-emptypointsettings mode="Zero">
            </e-accumulationseries-emptypointsettings>
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Result:** Feb and Apr appear with value of 0.

**3. Average Mode**

Replace empty points with the average of surrounding values:

```cshtml
<ejs-accumulationchart id="averageMode">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@data" 
                              xName="Month" 
                              yName="Revenue">
            <e-accumulationseries-emptypointsettings mode="Average">
            </e-accumulationseries-emptypointsettings>
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Result:** Feb = (35 + 42) / 2 = 38.5, Apr = (42 + 50) / 2 = 46

**4. Drop Mode**

Remove empty points from calculation entirely:

```cshtml
<ejs-accumulationchart id="dropMode">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@data" 
                              xName="Month" 
                              yName="Revenue">
            <e-accumulationseries-emptypointsettings mode="Drop">
            </e-accumulationseries-emptypointsettings>
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Result:** Percentages recalculated without Feb and Apr.

**Comparison:**

| Mode | Behavior | Use When |
|------|----------|----------|
| **Gap** | Skips empty points | Visual gap indicates missing data |
| **Zero** | Shows as 0 value | Want to emphasize absence of data |
| **Average** | Interpolates value | Need smooth data representation |
| **Drop** | Removes from calculation | Missing data should be ignored completely |

### Customizing Empty Points

Style empty points with custom colors:

```cshtml
<ejs-accumulationchart id="styledEmpty">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@data" 
                              xName="Month" 
                              yName="Revenue">
            <e-accumulationseries-emptypointsettings mode="Average" 
                                                    fill="#E0E0E0">
            </e-accumulationseries-emptypointsettings>
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Result:** Empty points filled with gray color, making them visually distinct.

### No Data Template

Display custom message when no data is available:

```cshtml
<ejs-accumulationchart id="lineContainer" title="Mobile Browser Statistics" load="load" loaded="loaded">
    <e-accumulationchart-legendsettings visible="false">
    </e-accumulationchart-legendsettings>
    <e-accumulation-series-collection>
        <e-accumulation-series xName="x" yName="y" name="Browser">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
<div id="noDataButtonOverlay" class="no-data-button-overlay" style="display: none;">
    <ejs-button id="loadDataButton" content="Load data" iconCss="e-icons e-refresh" onclick="loadChartData()"
        cssClass="load-data-btn e-outline" isPrimary="false">
    </ejs-button>
</div>

<style>
    .no-data-button-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin-top: 60px;
        /* Position below the no-data message */
        z-index: 10;
    }

    #noDataTemplateContainer {
        height: inherit;
        width: inherit;
    }

    .load-data-btn {
        margin-top: 55px;
        border-radius: 4px !important;
    }

    .load-data-btn .e-btn-icon {
        margin-right: 8px;
    }

    .light-bg {
        background-color: #fafafa;
        color: #000000;
    }

    .template-align img {
        max-width: 150px;
        /* Adjust size as needed */
        max-height: 150px;
        margin-top: 55px;
    }

    .template-align {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    #control-container {
        padding: 0px !important;
    }
</style>
<script src="~/scripts/chart/theme-color.js"></script>
<script id='No-Data-Template' type="text/x-template">
    <div id='noDataTemplateContainer' class="light-bg">
        <div class="template-align">
            <img src="no-data.png" alt="No Data" />
        </div>
        <div class="template-align">
            <p style="font-size: 15px; margin: 10px 0 10px;"><strong>No data available to display.</strong></p>
        </div>
    </div>
</script>
<script>
    var chartData = [
        { x: "Chrome", y: 37 },
        { x: "UC Browser", y: 17 },
        { x: "iPhone", y: 19 },
        { x: "Others", y: 4 },
        { x: "Opera", y: 11 },
        { x: "Android", y: 12 },
    ];
    var dataLoaded = false;
    function load(args) {
        args.chart.noDataTemplate = "#No-Data-Template";
        args.chart.series[0].dataSource = (dataLoaded ? chartData : []);
    }

    function loaded(args) {
        var buttonOverlay = document.getElementById("noDataButtonOverlay");
        if (buttonOverlay) {
            buttonOverlay.style.display = !dataLoaded ? 'block' : 'none';
        }
    }

    function loadChartData() {
        var chart = document.getElementById('lineContainer').ej2_instances[0];
        var buttonOverlay = document.getElementById("noDataButtonOverlay");
        dataLoaded = true;
        chart.series[0].dataSource = chartData;
        chart.series[0].animation.enable = true;
        if (buttonOverlay) {
            buttonOverlay.style.display = 'none';
        }
        chart.refresh();
    }
</script>
```

## Dynamic Data Updates

Update chart data in real-time or on user interaction.

### Update Data on Button Click

```cshtml
@{
    List<SalesData> initialData = new List<SalesData>
    {
        new SalesData { Product = "Laptop", Revenue = 45 },
        new SalesData { Product = "Desktop", Revenue = 28 }
    };
}

<button onclick="updateData()" class="btn btn-primary">Update Data</button>

<ejs-accumulationchart id="dynamicChart">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@initialData" 
                              xName="Product" 
                              yName="Revenue"
                              name="sales">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>

<script>
    function updateData() {
        var chart = document.getElementById('dynamicChart').ej2_instances[0];
        
        // New data
        var newData = [
            { Product: 'Laptop', Revenue: 55 },
            { Product: 'Desktop', Revenue: 32 },
            { Product: 'Tablet', Revenue: 18 }
        ];
        
        // Update series data
        chart.series[0].dataSource = newData;
        chart.refresh();
    }
</script>
```

### Real-Time Data Updates (Polling)

```cshtml
<ejs-accumulationchart id="realtimeChart" load="startPolling">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@initialData" 
                              xName="Product" 
                              yName="Revenue">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>

<script>
    var pollInterval;
    
    function startPolling() {
        // Poll every 5 seconds
        pollInterval = setInterval(function() {
            fetchDataFromServer();
        }, 5000);
    }
    
    function fetchDataFromServer() {
        fetch('/api/sales/current')
            .then(response => response.json())
            .then(data => {
                var chart = document.getElementById('realtimeChart').ej2_instances[0];
                chart.series[0].dataSource = data;
                chart.refresh();
            });
    }
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', function() {
        clearInterval(pollInterval);
    });
</script>
```

### Add Data Point Dynamically

```cshtml
<ejs-accumulationchart id="container">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="ViewBag.dataSource" xName="X" yName="Y"
            type="@Syncfusion.EJ2.Charts.AccumulationType.Pie">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>

<div>
    <ejs-button id="add" content="Add Point" isPrimary="true"></ejs-button>
</div>
<script>
    document.getElementById('add').onclick = () => {
        var piechart = document.getElementById('container').ej2_instances[0];
        piechart.series[0].addPoint({ X: 'Nov', Y: 18 });
    }
</script>
```

## Data Source Patterns

### Server-Side Data Binding

```csharp
// Controller
public class ChartController : Controller
{
    private readonly IChartService _chartService;
    
    public ChartController(IChartService chartService)
    {
        _chartService = chartService;
    }
    
    public IActionResult Index()
    {
        var chartData = _chartService.GetSalesData();
        return View(chartData);
    }
    
    [HttpGet]
    public JsonResult GetLiveData()
    {
        var liveData = _chartService.GetLiveSalesData();
        return Json(liveData);
    }
}
```

```cshtml
@model List<SalesData>

<ejs-accumulationchart id="serverChart">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@Model" 
                              xName="Product" 
                              yName="Revenue">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### JSON Data Source

```cshtml
<ejs-accumulationchart id="jsonChart" load="loadJsonData">
    <e-accumulation-series-collection>
        <e-accumulation-series xName="Product" yName="Revenue">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>

<script>
    function loadJsonData(args) {
        fetch('/data/sales.json')
            .then(response => response.json())
            .then(data => {
                args.accumulation.series[0].dataSource = data;
            });
    }
</script>
```

### Database Query Example

```csharp
public class ChartService : IChartService
{
    private readonly ApplicationDbContext _context;
    
    public ChartService(ApplicationDbContext context)
    {
        _context = context;
    }
    
    public List<SalesData> GetSalesData()
    {
        return _context.Sales
            .GroupBy(s => s.ProductCategory)
            .Select(g => new SalesData
            {
                Product = g.Key,
                Revenue = g.Sum(s => s.Amount)
            })
            .OrderByDescending(s => s.Revenue)
            .Take(10)
            .ToList();
    }
}
```

## Troubleshooting

### Data Not Displaying

**Problem:** Chart renders but shows no data

**Solutions:**
1. Verify data source is not null or empty
2. Check `xName` and `yName` match property names exactly (case-sensitive)
3. Ensure data types are correct (string for x, number for y)
4. Check for null values and handle with empty point settings

```csharp
// Debug: Log data to console
@{
    var json = JsonSerializer.Serialize(chartData);
}
<script>
    console.log('Chart Data:', @Html.Raw(json));
</script>
```

### Grouped Points Not Working

**Problem:** `groupTo` doesn't group as expected

**Solutions:**
1. Ensure `groupTo` value is appropriate for your data scale
2. Check if `groupMode` is set correctly (Value vs Point)
3. Verify data values are numeric and not strings
4. Use percentage values (10) not absolute unless intended

### Empty Points Show Incorrectly

**Problem:** Empty points appear as 0 instead of being skipped

**Solutions:**
1. Set explicit `mode` in empty point settings
2. Use nullable types for data properties (`double?` instead of `double`)
3. Check for string "null" vs actual null value
4. Ensure empty point settings are inside series definition

### Dynamic Updates Not Reflecting

**Problem:** Data changes but chart doesn't update

**Solutions:**
1. Call `chart.refresh()` after data change
2. Update `dataSource` property, don't modify array directly
3. Ensure chart instance is retrieved correctly
4. Check browser console for JavaScript errors

```cshtml
<script>
    // CORRECT
    var chart = document.getElementById('chartId').ej2_instances[0];
    chart.series[0].dataSource = newData;
    chart.refresh();
    
    // INCORRECT (won't trigger update)
    chart.series[0].dataSource.push(newItem);
</script>
```

### Performance Issues with Large Datasets

**Problem:** Chart is slow with many data points

**Solutions:**
1. Use grouping to reduce visible points
2. Implement pagination for historical data
3. Use point mode grouping to show top N items
4. Optimize data queries at the server level
5. Consider data aggregation before rendering

```cshtml
<!-- Group to show top 10, combine rest -->
<e-accumulation-series groupTo="10" groupMode="Point">
</e-accumulation-series>
```

## Best Practices

1. **Always handle empty points** - Set explicit mode to avoid surprises
2. **Group small values** - Improve readability by combining values < 5-10%
3. **Use nullable types** - Allow null values in data models for flexibility
4. **Validate data** - Check for null, negative, or invalid values before binding
5. **Optimize queries** - Fetch only necessary data from database
6. **Cache static data** - Don't re-fetch unchanged data on every render
7. **Show loading states** - Display indicators during async data operations
8. **Handle errors gracefully** - Show friendly messages when data fails to load

## Data Model Examples

```csharp
// Basic model
public class ChartData
{
    public string Category { get; set; }
    public double Value { get; set; }
}

// With nullable for empty points
public class ChartDataNullable
{
    public string Category { get; set; }
    public double? Value { get; set; }  // Allows null
}

// Rich model with metadata
public class DetailedChartData
{
    public string Category { get; set; }
    public double Value { get; set; }
    public string Color { get; set; }
    public string Label { get; set; }
    public string TooltipText { get; set; }
    public bool IsHighlighted { get; set; }
}

// Time-series data
public class TimeSeriesData
{
    public DateTime Date { get; set; }
    public double Value { get; set; }
    public string FormattedDate => Date.ToString("MMM dd, yyyy");
}
```
