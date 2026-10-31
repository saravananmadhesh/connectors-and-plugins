# Data Binding

## Table of Contents
- [Overview](#overview)
- [Local Data Binding](#local-data-binding)
- [Data Structure Requirements](#data-structure-requirements)
- [Field Mapping](#field-mapping)
- [Single Data Point](#single-data-point)
- [Multiple Data Points](#multiple-data-points)
- [Controller Setup](#controller-setup)
- [Advanced Data Binding](#advanced-data-binding)
- [Data Binding Best Practices](#data-binding-best-practices)
- [Common Data Binding Scenarios](#common-data-binding-scenarios)
- [Troubleshooting](#troubleshooting)

## Overview

The Bullet Chart component can visualize data from local or remote sources. Data binding connects your business data to the chart's visual representation, displaying actual values, target values, and optionally category information.

**Core Concept:** The chart uses `DataSource` to receive data, then maps specific properties to visual elements using `ValueField` (actual value) and `TargetField` (comparison value).

## Local Data Binding

Local data binding uses data available in your application's memory, such as collections, lists, or arrays.

### Basic Binding Example

```csharp
// Controller
public ActionResult Index()
{
    List<BulletChartData> data = new List<BulletChartData>
    {
        new BulletChartData { value = 270, target = 250 }
    };
    return View(data);
}

public class BulletChartData
{
    public double value { get; set; }
    public double target { get; set; }
}
```

```cshtml
<!-- View -->
@model List<BulletChartData>

@(Html.EJS().BulletChart("bulletChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .Render()
)
```

**Result:** Displays a bullet chart with:
- Value bar at 270 (actual performance)
- Target marker at 250 (goal)
- Scale from 0 to 300

## Data Structure Requirements

### Essential Properties

Your data class must contain properties for:

1. **Value Field** (Required): The actual/current value to display
   - Type: `double`, `int`, `decimal`, or numeric type
   - Represents the primary measure (e.g., actual sales, current score)

2. **Target Field** (Required): The comparison/target value
   - Type: `double`, `int`, `decimal`, or numeric type
   - Represents the goal or benchmark (e.g., sales target, expected score)

3. **Category Field** (Optional): Used for category axes
   - Type: `string`
   - Provides labels for categorical data

### Simple Data Model

```csharp
public class PerformanceData
{
    public double ActualValue { get; set; }
    public double TargetValue { get; set; }
}
```

### Extended Data Model

```csharp
public class SalesMetric
{
    public string Region { get; set; }        // Optional: for categorization
    public double Sales { get; set; }         // Actual sales
    public double Quota { get; set; }         // Sales target
    public DateTime Period { get; set; }      // Optional: tracking metadata
    public string SalesRep { get; set; }      // Optional: additional context
}
```

## Field Mapping

The Bullet Chart maps data properties to visual elements using field mapping properties.

### ValueField Property

Maps the data property containing the actual value to the value bar.

```cshtml
@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("Sales")  // Maps to 'Sales' property in data
    .TargetField("Quota")
    .Render()
)
```

**Key Points:**
- Property name is case-sensitive
- Must match the exact property name in your data class
- Determines the length/position of the value bar
- Can be any numeric property

### TargetField Property

Maps the data property containing the target value to the comparative marker.

```cshtml
@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("ActualRevenue")
    .TargetField("ProjectedRevenue")  // Maps to target property
    .Render()
)
```

**Key Points:**
- Displays as a distinct marker (line, circle, cross, etc.)
- Visually compares actual vs target performance
- Independent styling from value bar

### CategoryField Property

Maps the data property used for category axes.

```cshtml
@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("score")
    .TargetField("benchmark")
    .CategoryField("department")  // For category axis labels
    .Render()
)
```

## Single Data Point

For displaying one metric, use a single-item collection.

### Controller

```csharp
public ActionResult QuarterlySales()
{
    List<QuarterlyMetric> data = new List<QuarterlyMetric>
    {
        new QuarterlyMetric 
        { 
            ActualSales = 85000,
            TargetSales = 100000,
            Quarter = "Q1 2024"
        }
    };
    return View(data);
}

public class QuarterlyMetric
{
    public double ActualSales { get; set; }
    public double TargetSales { get; set; }
    public string Quarter { get; set; }
}
```

### View

```cshtml
@model List<QuarterlyMetric>

@(Html.EJS().BulletChart("quarterlyChart")
    .DataSource(Model)
    .ValueField("ActualSales")
    .TargetField("TargetSales")
    .Title("Q1 2024 Sales Performance")
    .Minimum(0)
    .Maximum(120000)
    .Interval(20000)
    .LabelFormat("${value}k")
    .Ranges(r => {
        r.End(60000).Add();   // Below expectations
        r.End(90000).Add();   // Meeting expectations
        r.End(120000).Add();  // Exceeding expectations
    })
    .Render()
)
```

## Multiple Data Points

While bullet charts typically show one metric, you can create multiple chart instances for dashboard scenarios.

### Controller with Multiple Metrics

```csharp
public ActionResult Dashboard()
{
    ViewBag.SalesData = new List<MetricData>
    {
        new MetricData { value = 85000, target = 100000 }
    };
    
    ViewBag.RevenueData = new List<MetricData>
    {
        new MetricData { value = 450000, target = 500000 }
    };
    
    ViewBag.CustomerData = new List<MetricData>
    {
        new MetricData { value = 1250, target = 1500 }
    };
    
    return View();
}

public class MetricData
{
    public double value { get; set; }
    public double target { get; set; }
}
```

### View with Multiple Charts

```cshtml
<div class="dashboard">
    <h2>KPI Dashboard</h2>
    
    <div class="metric-card">
        <h3>Sales Performance</h3>
        @(Html.EJS().BulletChart("salesChart")
            .DataSource((List<MetricData>)ViewBag.SalesData)
            .ValueField("value")
            .TargetField("target")
            .Minimum(0)
            .Maximum(120000)
            .Interval(20000)
            .Ranges(r => {
                r.End(60000).Color("#DC3545").Add();
                r.End(90000).Color("#FFC107").Add();
                r.End(120000).Color("#28A745").Add();
            })
            .Render()
        )
    </div>
    
    <div class="metric-card">
        <h3>Revenue Target</h3>
        @(Html.EJS().BulletChart("revenueChart")
            .DataSource((List<MetricData>)ViewBag.RevenueData)
            .ValueField("value")
            .TargetField("target")
            .Minimum(0)
            .Maximum(600000)
            .Interval(100000)
            .Ranges(r => {
                r.End(300000).Color("#DC3545").Add();
                r.End(450000).Color("#FFC107").Add();
                r.End(600000).Color("#28A745").Add();
            })
            .Render()
        )
    </div>
    
    <div class="metric-card">
        <h3>New Customers</h3>
        @(Html.EJS().BulletChart("customerChart")
            .DataSource((List<MetricData>)ViewBag.CustomerData)
            .ValueField("value")
            .TargetField("target")
            .Minimum(0)
            .Maximum(2000)
            .Interval(500)
            .Ranges(r => {
                r.End(1000).Color("#DC3545").Add();
                r.End(1500).Color("#FFC107").Add();
                r.End(2000).Color("#28A745").Add();
            })
            .Render()
        )
    </div>
</div>
```

## Controller Setup

### Basic Controller Pattern

```csharp
using System.Collections.Generic;
using System.Web.Mvc;

namespace YourApp.Controllers
{
    public class MetricsController : Controller
    {
        public ActionResult Index()
        {
            var chartData = GetChartData();
            return View(chartData);
        }
        
        private List<BulletChartData> GetChartData()
        {
            return new List<BulletChartData>
            {
                new BulletChartData 
                { 
                    value = 270, 
                    target = 250 
                }
            };
        }
    }
    
    public class BulletChartData
    {
        public double value { get; set; }
        public double target { get; set; }
    }
}
```

### Controller with Database Data

```csharp
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace YourApp.Controllers
{
    public class SalesController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        
        public ActionResult Performance()
        {
            // Fetch data from database
            var salesData = db.SalesMetrics
                .Where(s => s.Period == "Current")
                .Select(s => new BulletChartData
                {
                    value = s.ActualSales,
                    target = s.TargetSales
                })
                .ToList();
            
            return View(salesData);
        }
        
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
    
    public class BulletChartData
    {
        public double value { get; set; }
        public double target { get; set; }
    }
}
```

## Advanced Data Binding

### Binding with Complex Objects

```csharp
public class EmployeePerformance
{
    public string EmployeeName { get; set; }
    public string Department { get; set; }
    public PerformanceMetrics Metrics { get; set; }
}

public class PerformanceMetrics
{
    public double CurrentScore { get; set; }
    public double TargetScore { get; set; }
    public double LastYearScore { get; set; }
}

// Controller
public ActionResult EmployeeScorecard()
{
    var employee = GetEmployeeData();
    ViewBag.PerformanceData = new List<PerformanceMetrics>
    {
        employee.Metrics
    };
    return View();
}
```

```cshtml
<!-- View -->
@(Html.EJS().BulletChart("scorecard")
    .DataSource((List<PerformanceMetrics>)ViewBag.PerformanceData)
    .ValueField("CurrentScore")
    .TargetField("TargetScore")
    .Title("Employee Performance Score")
    .Minimum(0)
    .Maximum(100)
    .Interval(20)
    .Render()
)
```

### Dynamic Data Loading

```csharp
public ActionResult LoadData()
{
    // Simulating API call or database query
    var data = FetchFromExternalSource();
    return View(data);
}

private List<MetricData> FetchFromExternalSource()
{
    // Could be API call, database query, file read, etc.
    return new List<MetricData>
    {
        new MetricData 
        { 
            value = CalculateCurrentMetric(),
            target = GetTargetFromConfig()
        }
    };
}

private double CalculateCurrentMetric()
{
    // Business logic to calculate current value
    return 275.5;
}

private double GetTargetFromConfig()
{
    // Retrieve target from configuration
    return 300.0;
}
```

### Binding with ViewModels

```csharp
public class DashboardViewModel
{
    public string PageTitle { get; set; }
    public string ReportPeriod { get; set; }
    public List<BulletChartData> ChartData { get; set; }
}

public ActionResult Dashboard()
{
    var viewModel = new DashboardViewModel
    {
        PageTitle = "Sales Dashboard",
        ReportPeriod = "Q1 2024",
        ChartData = new List<BulletChartData>
        {
            new BulletChartData { value = 270, target = 250 }
        }
    };
    
    return View(viewModel);
}
```

```cshtml
@model DashboardViewModel

<h1>@Model.PageTitle</h1>
<p>Period: @Model.ReportPeriod</p>

@(Html.EJS().BulletChart("dashboard")
    .DataSource(Model.ChartData)
    .ValueField("value")
    .TargetField("target")
    .Minimum(0)
    .Maximum(300)
    .Render()
)
```

## Data Binding Best Practices

### 1. Use Strongly-Typed Models
Always create dedicated classes for your data instead of using anonymous types or ViewBag for the DataSource.

### 2. Match Property Names Exactly
Ensure ValueField and TargetField strings match property names exactly (case-sensitive).

### 3. Validate Data Ranges
Ensure Minimum and Maximum values encompass your data range with appropriate padding.

### 4. Handle Null or Missing Data
Check for null values in your controller before passing to the view:

```csharp
public ActionResult Index()
{
    var data = GetChartData();
    if (data == null || !data.Any())
    {
        data = new List<BulletChartData>
        {
            new BulletChartData { value = 0, target = 0 }
        };
    }
    return View(data);
}
```

### 5. Use Appropriate Numeric Types
Use `double` or `decimal` for precision; avoid `float` for financial data.

### 6. Consider Performance
For large datasets or multiple charts, consider caching data or using asynchronous loading.

## Common Data Binding Scenarios

### Scenario 1: Monthly Sales Tracking
```csharp
public class MonthlySales
{
    public double ActualSales { get; set; }
    public double SalesTarget { get; set; }
    public string Month { get; set; }
}
```

### Scenario 2: KPI Monitoring
```csharp
public class KPIData
{
    public double CurrentValue { get; set; }
    public double Benchmark { get; set; }
    public string KPIName { get; set; }
    public string Unit { get; set; }  // "$", "%", "units", etc.
}
```

### Scenario 3: Performance Comparison
```csharp
public class PerformanceComparison
{
    public double YourScore { get; set; }
    public double AverageScore { get; set; }
    public string Category { get; set; }
}
```

## Troubleshooting

### Data Not Displaying
- Verify DataSource is not null
- Check ValueField and TargetField names match exactly
- Ensure data values are within Minimum/Maximum range
- Confirm model is passed correctly to the view

### Incorrect Values Showing
- Check property types (ensure numeric types)
- Verify field mapping strings are correct
- Review data in controller before passing to view

### Performance Issues
- Limit the amount of data bound to essential values
- Use ViewModels to pass only necessary data
- Consider pagination for large datasets (though bullet charts typically show single metrics)

You now have complete understanding of data binding in Bullet Charts, from simple single-value scenarios to complex dashboard implementations!
