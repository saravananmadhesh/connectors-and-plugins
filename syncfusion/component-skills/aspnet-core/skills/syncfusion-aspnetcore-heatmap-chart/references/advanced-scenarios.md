# Advanced Scenarios and Best Practices

## Table of Contents
- [Common Implementation Patterns](#common-implementation-patterns)
  - [Pattern 1: Dashboard with Real-Time Data](#pattern-1-dashboard-with-real-time-data)
  - [Pattern 2: Hierarchical Data Visualization](#pattern-2-hierarchical-data-visualization)
  - [Pattern 3: Correlation Matrix](#pattern-3-correlation-matrix)
- [Performance Optimization](#performance-optimization)
  - [Optimization 1: Data Virtualization](#optimization-1-data-virtualization)
  - [Optimization 2: Disable Unnecessary Features](#optimization-2-disable-unnecessary-features)
  - [Optimization 3: Aggregate Data Before Binding](#optimization-3-aggregate-data-before-binding)
- [Event Handling](#event-handling)
  - [Cell Render Event](#cell-render-event)
  - [Title Rendering](#title-rendering)
  - [Resizing Event](#resizing-event)
- [Integration Patterns](#integration-patterns)
  - [Pattern 1: Export to Image](#pattern-1-export-to-image)
  - [Pattern 2: Export to CSV](#pattern-2-export-to-csv)
  - [Pattern 3: Print HeatMap](#pattern-3-print-heatmap)
  - [Pattern 4: Save as PDF](#pattern-4-save-as-pdf)
- [RTL Support](#rtl-support)
  - [Enable Right-to-Left](#enable-right-to-left)
  - [RTL with Arabic Labels](#rtl-with-arabic-labels)
- [Troubleshooting](#troubleshooting)
  - [Issue: HeatMap Not Rendering](#issue-heatmap-not-rendering)
  - [Issue: Data Not Displaying](#issue-data-not-displaying)
  - [Issue: Poor Performance with Large Data](#issue-poor-performance-with-large-data)
  - [Issue: Styles Not Applied](#issue-styles-not-applied)
  - [Issue: Selection Not Working](#issue-selection-not-working)
  - [Debugging Tips](#debugging-tips)
  - [Best Practices Summary](#best-practices-summary)

## Common Implementation Patterns

### Pattern 1: Dashboard with Real-Time Data

Use this pattern when the HeatMap must render initial data from `Index.cshtml.cs` and later refresh itself from a Razor Page handler.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="heatmap"
    dataSource="@Model.DashboardData"
    showTooltip="true"
    renderingMode="Auto">

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.DashboardXAxisLabels">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.DashboardYAxisLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true"
        format="{value}">
    </e-heatmap-cellsettings>

    <e-heatmap-palettesettings
        type="Gradient"
        palette="@Model.DashboardPalette">
    </e-heatmap-palettesettings>

    <e-heatmap-legendsettings
        visible="true"
        position="Right">
    </e-heatmap-legendsettings>
</ejs-heatmap>

<script>
    setInterval(function () {
        fetch('?handler=UpdatedData')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var heatmap = document.getElementById('heatmap').ej2_instances[0];
                heatmap.dataSource = data;
                heatmap.refresh();
            });
    }, 30000);
</script>
```

#### Pages/Index.cshtml.cs

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Syncfusion.EJ2.HeatMap;
using System;
using System.Collections.Generic;

namespace YourApplication.Pages
{
    public class IndexModel : PageModel
    {
        public List<HeatMapDataPoint> DashboardData { get; set; } = new List<HeatMapDataPoint>();

        public string[] DashboardXAxisLabels { get; set; } =
        {
            "Jan", "Feb", "Mar", "Apr", "May"
        };

        public string[] DashboardYAxisLabels { get; set; } =
        {
            "North", "South", "East", "West"
        };

        public List<HeatMapPalette> DashboardPalette { get; set; } = new List<HeatMapPalette>
        {
            new HeatMapPalette { Value = 0, Color = "#E8F5E9", Label = "Low" },
            new HeatMapPalette { Value = 50, Color = "#FFF9C4", Label = "Medium" },
            new HeatMapPalette { Value = 100, Color = "#C8E6C9", Label = "High" }
        };

        public void OnGet()
        {
            DashboardData = GetDashboardData();
        }

        public JsonResult OnGetUpdatedData()
        {
            return new JsonResult(GetDashboardData());
        }

        private List<HeatMapDataPoint> GetDashboardData()
        {
            Random random = new Random();

            List<HeatMapDataPoint> result = new List<HeatMapDataPoint>();

            foreach (string region in DashboardYAxisLabels)
            {
                foreach (string month in DashboardXAxisLabels)
                {
                    result.Add(new HeatMapDataPoint
                    {
                        XValue = month,
                        YValue = region,
                        Value = random.Next(10, 101)
                    });
                }
            }

            return result;
        }
    }

    public class HeatMapDataPoint
    {
        public string XValue { get; set; } = string.Empty;

        public string YValue { get; set; } = string.Empty;

        public double Value { get; set; }
    }
}
```

### Pattern 2: Hierarchical Data Visualization

Use this pattern when the same HeatMap must display data at different aggregation levels, such as daily, weekly, monthly, or yearly.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<form method="get">
    <label for="level">Aggregation Level</label>
    <select id="level" name="level" onchange="this.form.submit()">
        <option value="daily" selected="@(Model.CurrentLevel == "daily")">Daily</option>
        <option value="weekly" selected="@(Model.CurrentLevel == "weekly")">Weekly</option>
        <option value="monthly" selected="@(Model.CurrentLevel == "monthly")">Monthly</option>
        <option value="yearly" selected="@(Model.CurrentLevel == "yearly")">Yearly</option>
    </select>
</form>

<ejs-heatmap
    id="hierarchicalHeatmap"
    dataSource="@Model.HierarchicalData"
    showTooltip="true"
    renderingMode="Auto">

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.HierarchicalXAxisLabels">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.HierarchicalYAxisLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true"
        format="{value}">
    </e-heatmap-cellsettings>

    <e-heatmap-palettesettings
        type="Gradient"
        palette="@Model.HierarchicalPalette">
    </e-heatmap-palettesettings>
</ejs-heatmap>
```

#### Pages/Index.cshtml.cs

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using Syncfusion.EJ2.HeatMap;
using System.Collections.Generic;

namespace YourApplication.Pages
{
    public class IndexModel : PageModel
    {
        public string CurrentLevel { get; set; } = "monthly";

        public List<HeatMapDataPoint> HierarchicalData { get; set; } = new List<HeatMapDataPoint>();

        public string[] HierarchicalXAxisLabels { get; set; } =
        {
            "Jan", "Feb", "Mar", "Apr"
        };

        public string[] HierarchicalYAxisLabels { get; set; } =
        {
            "Product A", "Product B", "Product C"
        };

        public List<HeatMapPalette> HierarchicalPalette { get; set; } = new List<HeatMapPalette>
        {
            new HeatMapPalette { Value = 0, Color = "#F3E5F5", Label = "Low" },
            new HeatMapPalette { Value = 50, Color = "#CE93D8", Label = "Medium" },
            new HeatMapPalette { Value = 100, Color = "#6A1B9A", Label = "High" }
        };

        public void OnGet(string level = "monthly")
        {
            CurrentLevel = level;

            HierarchicalData = level switch
            {
                "daily" => GetDailyData(),
                "weekly" => GetWeeklyData(),
                "yearly" => GetYearlyData(),
                _ => GetMonthlyData()
            };
        }

        private List<HeatMapDataPoint> GetDailyData()
        {
            return new List<HeatMapDataPoint>
            {
                new HeatMapDataPoint { XValue = "Jan", YValue = "Product A", Value = 20 },
                new HeatMapDataPoint { XValue = "Feb", YValue = "Product A", Value = 35 },
                new HeatMapDataPoint { XValue = "Mar", YValue = "Product A", Value = 45 },
                new HeatMapDataPoint { XValue = "Apr", YValue = "Product A", Value = 30 }
            };
        }

        private List<HeatMapDataPoint> GetWeeklyData()
        {
            return new List<HeatMapDataPoint>
            {
                new HeatMapDataPoint { XValue = "Jan", YValue = "Product B", Value = 48 },
                new HeatMapDataPoint { XValue = "Feb", YValue = "Product B", Value = 62 },
                new HeatMapDataPoint { XValue = "Mar", YValue = "Product B", Value = 71 },
                new HeatMapDataPoint { XValue = "Apr", YValue = "Product B", Value = 58 }
            };
        }

        private List<HeatMapDataPoint> GetMonthlyData()
        {
            return new List<HeatMapDataPoint>
            {
                new HeatMapDataPoint { XValue = "Jan", YValue = "Product A", Value = 73 },
                new HeatMapDataPoint { XValue = "Feb", YValue = "Product A", Value = 39 },
                new HeatMapDataPoint { XValue = "Mar", YValue = "Product B", Value = 53 },
                new HeatMapDataPoint { XValue = "Apr", YValue = "Product C", Value = 66 }
            };
        }

        private List<HeatMapDataPoint> GetYearlyData()
        {
            return new List<HeatMapDataPoint>
            {
                new HeatMapDataPoint { XValue = "Jan", YValue = "Product C", Value = 85 },
                new HeatMapDataPoint { XValue = "Feb", YValue = "Product C", Value = 78 },
                new HeatMapDataPoint { XValue = "Mar", YValue = "Product C", Value = 92 },
                new HeatMapDataPoint { XValue = "Apr", YValue = "Product C", Value = 88 }
            };
        }
    }

    public class HeatMapDataPoint
    {
        public string XValue { get; set; } = string.Empty;

        public string YValue { get; set; } = string.Empty;

        public double Value { get; set; }
    }
}
```

### Pattern 3: Correlation Matrix

Use this pattern to display relationships between variables. Correlation values usually range from `-1` to `1`, so a gradient palette with negative, neutral, and positive values is recommended.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="correlationHeatmap"
    dataSource="@Model.CorrelationData"
    showTooltip="true"
    renderingMode="Auto">

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.CorrelationLabels">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.CorrelationLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Variable1"
        yDataMapping="Variable2"
        valueMapping="Correlation">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true"
        format="{value}">
    </e-heatmap-cellsettings>

    <e-heatmap-palettesettings
        type="Gradient"
        palette="@Model.CorrelationPalette">
    </e-heatmap-palettesettings>

    <e-heatmap-legendsettings
        visible="true"
        position="Right"
        showLabel="true">
    </e-heatmap-legendsettings>
</ejs-heatmap>
```

#### Pages/Index.cshtml.cs

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using Syncfusion.EJ2.HeatMap;
using System.Collections.Generic;

namespace YourApplication.Pages
{
    public class IndexModel : PageModel
    {
        public string[] CorrelationLabels { get; set; } =
        {
            "Metric 1", "Metric 2", "Metric 3", "Metric 4"
        };

        public List<CorrelationDataPoint> CorrelationData { get; set; } = new List<CorrelationDataPoint>();

        public List<HeatMapPalette> CorrelationPalette { get; set; } = new List<HeatMapPalette>
        {
            new HeatMapPalette { Value = -1, Color = "#D73027", Label = "Negative" },
            new HeatMapPalette { Value = 0, Color = "#FFFFFF", Label = "Neutral" },
            new HeatMapPalette { Value = 1, Color = "#4575B4", Label = "Positive" }
        };

        public void OnGet()
        {
            CorrelationData = new List<CorrelationDataPoint>
            {
                new CorrelationDataPoint { Variable1 = "Metric 1", Variable2 = "Metric 1", Correlation = 1.00 },
                new CorrelationDataPoint { Variable1 = "Metric 1", Variable2 = "Metric 2", Correlation = 0.72 },
                new CorrelationDataPoint { Variable1 = "Metric 1", Variable2 = "Metric 3", Correlation = -0.45 },
                new CorrelationDataPoint { Variable1 = "Metric 1", Variable2 = "Metric 4", Correlation = 0.18 },

                new CorrelationDataPoint { Variable1 = "Metric 2", Variable2 = "Metric 1", Correlation = 0.72 },
                new CorrelationDataPoint { Variable1 = "Metric 2", Variable2 = "Metric 2", Correlation = 1.00 },
                new CorrelationDataPoint { Variable1 = "Metric 2", Variable2 = "Metric 3", Correlation = -0.20 },
                new CorrelationDataPoint { Variable1 = "Metric 2", Variable2 = "Metric 4", Correlation = 0.64 },

                new CorrelationDataPoint { Variable1 = "Metric 3", Variable2 = "Metric 1", Correlation = -0.45 },
                new CorrelationDataPoint { Variable1 = "Metric 3", Variable2 = "Metric 2", Correlation = -0.20 },
                new CorrelationDataPoint { Variable1 = "Metric 3", Variable2 = "Metric 3", Correlation = 1.00 },
                new CorrelationDataPoint { Variable1 = "Metric 3", Variable2 = "Metric 4", Correlation = -0.78 },

                new CorrelationDataPoint { Variable1 = "Metric 4", Variable2 = "Metric 1", Correlation = 0.18 },
                new CorrelationDataPoint { Variable1 = "Metric 4", Variable2 = "Metric 2", Correlation = 0.64 },
                new CorrelationDataPoint { Variable1 = "Metric 4", Variable2 = "Metric 3", Correlation = -0.78 },
                new CorrelationDataPoint { Variable1 = "Metric 4", Variable2 = "Metric 4", Correlation = 1.00 }
            };
        }
    }

    public class CorrelationDataPoint
    {
        public string Variable1 { get; set; } = string.Empty;

        public string Variable2 { get; set; } = string.Empty;

        public double Correlation { get; set; }
    }
}
```

## Performance Optimization

### Optimization 1: Data Virtualization

The HeatMap Chart does not work like a row-virtualized Grid. For very large HeatMap datasets, use server-side paging, filtering, or aggregation and bind only the required matrix range.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<button type="button" onclick="loadPageData()">Load Next Data Page</button>

<ejs-heatmap
    id="pagedHeatmap"
    dataSource="@Model.PagedData"
    renderingMode="Canvas"
    showTooltip="false">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="false">
    </e-heatmap-cellsettings>
</ejs-heatmap>

<script>
    var currentPage = 1;
    var pageSize = 100;

    function loadPageData() {
        fetch('?handler=PagedData&page=' + currentPage + '&pageSize=' + pageSize)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                var heatmap = document.getElementById('pagedHeatmap').ej2_instances[0];

                if (currentPage === 1) {
                    heatmap.dataSource = response.data;
                } else {
                    heatmap.dataSource = heatmap.dataSource.concat(response.data);
                }

                heatmap.refresh();
                currentPage++;
            });
    }
</script>
```

#### Pages/Index.cshtml.cs

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using System.Linq;

namespace YourApplication.Pages
{
    public class IndexModel : PageModel
    {
        public List<HeatMapDataPoint> PagedData { get; set; } = new List<HeatMapDataPoint>();

        public void OnGet()
        {
            PagedData = GetAllHeatMapData().Take(100).ToList();
        }

        public JsonResult OnGetPagedData(int page = 1, int pageSize = 100)
        {
            int skip = (page - 1) * pageSize;
            List<HeatMapDataPoint> allData = GetAllHeatMapData();

            List<HeatMapDataPoint> data = allData
                .Skip(skip)
                .Take(pageSize)
                .ToList();

            return new JsonResult(new
            {
                data,
                page,
                pageSize,
                total = allData.Count
            });
        }

        private List<HeatMapDataPoint> GetAllHeatMapData()
        {
            List<HeatMapDataPoint> data = new List<HeatMapDataPoint>();

            for (int x = 0; x < 100; x++)
            {
                for (int y = 0; y < 100; y++)
                {
                    data.Add(new HeatMapDataPoint
                    {
                        XValue = "X" + x,
                        YValue = "Y" + y,
                        Value = (x + y) % 100
                    });
                }
            }

            return data;
        }
    }

    public class HeatMapDataPoint
    {
        public string XValue { get; set; } = string.Empty;

        public string YValue { get; set; } = string.Empty;

        public double Value { get; set; }
    }
}
```

### Optimization 2: Disable Unnecessary Features

For large datasets, use `Canvas` rendering, hide labels, and disable tooltips unless they are required.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="optimizedHeatmap"
    dataSource="@Model.LargeData"
    renderingMode="Canvas"
    showTooltip="false">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="false">
    </e-heatmap-cellsettings>

    <e-heatmap-legendsettings
        visible="true"
        position="Bottom">
    </e-heatmap-legendsettings>
</ejs-heatmap>
```

### Optimization 3: Aggregate Data Before Binding

Aggregate large datasets on the server before assigning them to the HeatMap.

#### Pages/Index.cshtml.cs

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using System.Linq;

namespace YourApplication.Pages
{
    public class IndexModel : PageModel
    {
        public List<HeatMapDataPoint> AggregatedData { get; set; } = new List<HeatMapDataPoint>();

        public void OnGet()
        {
            List<SalesRecord> rawData = GetSalesRecords();

            AggregatedData = rawData
                .GroupBy(item => new { item.Product, item.Month })
                .Select(group => new HeatMapDataPoint
                {
                    XValue = group.Key.Month,
                    YValue = group.Key.Product,
                    Value = group.Sum(item => item.Amount)
                })
                .ToList();
        }

        private List<SalesRecord> GetSalesRecords()
        {
            return new List<SalesRecord>
            {
                new SalesRecord { Product = "Product A", Month = "Jan", Amount = 1200 },
                new SalesRecord { Product = "Product A", Month = "Jan", Amount = 800 },
                new SalesRecord { Product = "Product B", Month = "Feb", Amount = 1500 }
            };
        }
    }

    public class SalesRecord
    {
        public string Product { get; set; } = string.Empty;

        public string Month { get; set; } = string.Empty;

        public double Amount { get; set; }
    }

    public class HeatMapDataPoint
    {
        public string XValue { get; set; } = string.Empty;

        public string YValue { get; set; } = string.Empty;

        public double Value { get; set; }
    }
}
```

## Event Handling

### Cell Render Event

Use `cellRender` to customize cell color before cells are rendered.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="eventHeatmap"
    dataSource="@Model.EventData"
    cellRender="onCellRender">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true">
    </e-heatmap-cellsettings>
</ejs-heatmap>

<script>
    function onCellRender(args) {
        if (args.value > 80) {
            args.cellColor = '#27AE60';
        }

        if (args.value < 30) {
            args.cellColor = '#C0392B';
        }

        if (args.value >= 50 && args.value <= 70) {
            args.cellColor = '#F39C12';
        }
    }
</script>
```

### Title Rendering

Use the `load` event to configure dynamic settings before rendering.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="titleHeatmap"
    dataSource="@Model.EventData"
    load="onHeatMapLoad">

    <e-heatmap-titlesettings
        text="Performance Report">
    </e-heatmap-titlesettings>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>

<script>
    function onHeatMapLoad(args) {
        var today = new Date().toLocaleDateString();
        args.heatmap.titleSettings.text = 'Performance Report - ' + today;
    }
</script>
```

### Resizing Event

Use browser resize handling when the HeatMap container changes size dynamically.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<div id="heatmapContainer" style="width: 100%; height: 500px;">
    <ejs-heatmap
        id="resizeHeatmap"
        dataSource="@Model.EventData"
        width="100%"
        height="100%">

        <e-heatmap-datasourcesettings
            isJsonData="true"
            adaptorType="Cell"
            xDataMapping="XValue"
            yDataMapping="YValue"
            valueMapping="Value">
        </e-heatmap-datasourcesettings>
    </ejs-heatmap>
</div>

<script>
    window.addEventListener('resize', function () {
        var heatmap = document.getElementById('resizeHeatmap').ej2_instances[0];
        var container = document.getElementById('heatmapContainer');

        heatmap.width = container.clientWidth;
        heatmap.height = container.clientHeight;
        heatmap.refresh();
    });
</script>
```

## Integration Patterns

### Pattern 1: Export to Image

Use the client-side HeatMap instance to export the rendered HeatMap as an image.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<button type="button" onclick="exportAsImage()">Export as PNG</button>

<ejs-heatmap
    id="exportHeatmap"
    dataSource="@Model.ExportData">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>

<script>
    function exportAsImage() {
        var heatmap = document.getElementById('exportHeatmap').ej2_instances[0];
        heatmap.export('PNG', 'heatmap-export');
    }
</script>
```

### Pattern 2: Export to CSV

Use this approach when you need to export the underlying HeatMap data rather than the rendered image.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<button type="button" onclick="exportAsCSV()">Export Data as CSV</button>

<ejs-heatmap
    id="csvHeatmap"
    dataSource="@Model.ExportData">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>

<script>
    function exportAsCSV() {
        var heatmap = document.getElementById('csvHeatmap').ej2_instances[0];
        var data = heatmap.dataSource || [];

        var csv = 'X,Y,Value\n';

        data.forEach(function (row) {
            csv += row.XValue + ',' + row.YValue + ',' + row.Value + '\n';
        });

        var link = document.createElement('a');
        link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
        link.download = 'heatmap-data.csv';
        link.click();
    }
</script>
```

### Pattern 3: Print HeatMap

Use the HeatMap instance `print` method to print the component.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<button type="button" onclick="printHeatMap()">Print HeatMap</button>

<ejs-heatmap
    id="printHeatmap"
    dataSource="@Model.ExportData">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>

<script>
    function printHeatMap() {
        var heatmap = document.getElementById('printHeatmap').ej2_instances[0];
        heatmap.print();
    }
</script>
```

### Pattern 4: Save as PDF

Use PDF export when a report-style output is required.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<button type="button" onclick="savePDF()">Save as PDF</button>

<ejs-heatmap
    id="pdfHeatmap"
    dataSource="@Model.ExportData">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>

<script>
    function savePDF() {
        var heatmap = document.getElementById('pdfHeatmap').ej2_instances[0];
        heatmap.export('PDF', 'heatmap-report');
    }
</script>
```

## RTL Support

### Enable Right-to-Left

Use `enableRtl="true"` when displaying the HeatMap in right-to-left layouts.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="rtlHeatmap"
    dataSource="@Model.RtlData"
    enableRtl="true">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true">
    </e-heatmap-cellsettings>
</ejs-heatmap>
```

Automatic adjustments include:

- Text direction follows RTL layout.
- Component layout is rendered in right-to-left direction.
- Legend and axis placement can be configured to match the intended layout.

### RTL with Arabic Labels

Use Arabic labels from `Index.cshtml.cs` and bind them through the axis label properties.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="arabicHeatmap"
    dataSource="@Model.ArabicData"
    enableRtl="@Model.UseRtl">

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.ArabicXAxisLabels">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.ArabicYAxisLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true">
    </e-heatmap-cellsettings>
</ejs-heatmap>
```

#### Pages/Index.cshtml.cs

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;

namespace YourApplication.Pages
{
    public class IndexModel : PageModel
    {
        public bool UseRtl { get; set; } = true;

        public string[] ArabicXAxisLabels { get; set; } =
        {
            "يناير", "فبراير", "مارس"
        };

        public string[] ArabicYAxisLabels { get; set; } =
        {
            "منتج أ", "منتج ب"
        };

        public List<HeatMapDataPoint> ArabicData { get; set; } = new List<HeatMapDataPoint>();

        public void OnGet()
        {
            ArabicData = new List<HeatMapDataPoint>
            {
                new HeatMapDataPoint { XValue = "يناير", YValue = "منتج أ", Value = 1000 },
                new HeatMapDataPoint { XValue = "فبراير", YValue = "منتج أ", Value = 1500 },
                new HeatMapDataPoint { XValue = "مارس", YValue = "منتج ب", Value = 1200 }
            };
        }
    }

    public class HeatMapDataPoint
    {
        public string XValue { get; set; } = string.Empty;

        public string YValue { get; set; } = string.Empty;

        public double Value { get; set; }
    }
}
```

## Troubleshooting

### Issue: HeatMap Not Rendering

Symptoms:

- Empty container.
- HeatMap tag appears in the page but the control is not initialized.
- No visible cells.

Solutions:

1. Verify that Syncfusion Tag Helpers are registered in `Pages/_ViewImports.cshtml`.

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

2. Verify that the script manager is added before the closing `body` tag in `Pages/Shared/_Layout.cshtml`.

```cshtml
<ejs-scripts></ejs-scripts>
```

3. Verify that the Syncfusion stylesheet and script references are added in `_Layout.cshtml`.

```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.2.3/fluent.css" />
<script src="https://cdn.syncfusion.com/ej2/33.2.3/dist/ej2.min.js"></script>
```

4. Verify that the `dataSource` is not null or empty.

5. Check the browser console for JavaScript errors.

### Issue: Data Not Displaying

Symptoms:

- HeatMap container renders.
- Legend or title may render.
- Cells are missing or empty.

Solutions:

Use `e-heatmap-datasourcesettings` when binding object collections.

```cshtml
<e-heatmap-datasourcesettings
    isJsonData="true"
    adaptorType="Cell"
    xDataMapping="XValue"
    yDataMapping="YValue"
    valueMapping="Value">
</e-heatmap-datasourcesettings>
```

Ensure the C# model property names match the mapping names exactly.

```csharp
public class HeatMapDataPoint
{
    public string XValue { get; set; } = string.Empty;

    public string YValue { get; set; } = string.Empty;

    public double Value { get; set; }
}
```

### Issue: Poor Performance with Large Data

Symptoms:

- Slow rendering.
- Browser lag.
- High memory usage.
- Slow tooltip interaction.

Solutions:

1. Use Canvas rendering for large datasets.

```cshtml
<ejs-heatmap
    id="heatmap"
    dataSource="@Model.DataSource"
    renderingMode="Canvas">
</ejs-heatmap>
```

2. Disable labels for high-density data.

```cshtml
<e-heatmap-cellsettings
    showLabel="false">
</e-heatmap-cellsettings>
```

3. Disable tooltip if not required.

```cshtml
<ejs-heatmap
    id="heatmap"
    dataSource="@Model.DataSource"
    showTooltip="false">
</ejs-heatmap>
```

4. Aggregate data on the server before binding.

5. Avoid loading unnecessary data points into the HeatMap.

### Issue: Styles Not Applied

Symptoms:

- Generic or unstyled component output.
- Missing HeatMap colors or incorrect layout.
- Component layout differs from expected appearance.

Solutions:

Verify that the CSS theme is loaded.

```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.2.3/fluent.css" />
```

Verify that the script file is loaded.

```html
<script src="https://cdn.syncfusion.com/ej2/33.2.3/dist/ej2.min.js"></script>
```

Verify that your installed Syncfusion package version and CDN version are aligned where possible.

### Issue: Selection Not Working

Symptoms:

- Clicking cells does not select them.
- Cell selected event does not trigger.
- No visual selection feedback.

Solutions:

Enable selection on the HeatMap.

```cshtml
<ejs-heatmap
    id="selectionHeatmap"
    dataSource="@Model.DataSource"
    allowSelection="true"
    enableMultiSelect="true"
    cellSelected="onCellSelected">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>

<script>
    function onCellSelected(args) {
        console.log('Cell selected:', args);
    }
</script>
```

### Debugging Tips

Use browser developer tools to validate script, style, data, and component instance availability.

#### Browser DevTools Checklist

- Check the Network tab for failed CSS or JavaScript files.
- Check the Console tab for JavaScript errors.
- Inspect the page and verify that the HeatMap element is rendered.
- Confirm that the Syncfusion script manager has rendered required initialization scripts.

#### HeatMap Instance Check

```javascript
var heatmapElement = document.getElementById('heatmap');

if (heatmapElement && heatmapElement.ej2_instances && heatmapElement.ej2_instances.length > 0) {
    var heatmap = heatmapElement.ej2_instances[0];

    console.log('HeatMap Instance:', heatmap);
    console.log('DataSource:', heatmap.dataSource);
    console.log('Rendering Mode:', heatmap.renderingMode);
} else {
    console.log('HeatMap instance is not available.');
}
```

#### Data Validation in PageModel

```csharp
System.Diagnostics.Debug.WriteLine("DataSource count: " + DataSource.Count);

foreach (HeatMapDataPoint item in DataSource.Take(3))
{
    System.Diagnostics.Debug.WriteLine($"{item.XValue}, {item.YValue}, {item.Value}");
}
```

### Best Practices Summary

1. Always include `<ejs-scripts></ejs-scripts>` in `_Layout.cshtml`.
2. Always register Syncfusion Tag Helpers in `_ViewImports.cshtml`.
3. Always verify that the datasource has the mapped fields required by `dataSourceSettings`.
4. Use `renderingMode="Canvas"` for large datasets.
5. Use `renderingMode="Auto"` when the component should choose the rendering mode.
6. Disable labels for high-density data.
7. Disable tooltip when it is not required.
8. Aggregate data server-side before binding.
9. Keep reusable data and configuration in `Index.cshtml.cs`.
10. Keep UI markup in `Index.cshtml`.
11. Use real Razor tags in `.cshtml` files, not encoded tags.
12. Keep namespace values consistent across `Index.cshtml`, `Index.cshtml.cs`, and `_ViewImports.cshtml`.
13. Test responsiveness with different screen sizes.
14. Check browser console errors when the HeatMap does not render.
15. Use strongly typed model classes instead of `ViewBag` for maintainable Razor Pages code.
