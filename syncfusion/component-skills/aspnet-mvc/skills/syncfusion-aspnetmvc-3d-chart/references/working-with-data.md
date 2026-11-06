# Working with Chart Data

## Table of Contents
- [Data Binding Overview](#data-binding-overview)
- [Simple Data Binding](#simple-data-binding)
- [Multiple Series Data](#multiple-series-data)
- [Dynamic Data Sources](#dynamic-data-sources)
- [Data Binding Best Practices](#data-binding-best-practices)
- [Common Data Scenarios](#common-data-scenarios)

## Data Binding Overview

The 3D Chart control accepts data through the DataSource property and maps it to chart series using XName and YName properties. Each series represents a different dimension of your data visualization.

**Core Concept:** 
- **DataSource** = The collection of data objects
- **XName** = Property for X-axis (categories)
- **YName** = Property for Y-axis (values)
- **Series** = Individual data representation layer

## Simple Data Binding

### Basic Single Series Chart

Create a simple chart with one data series:

**Model/Data:**

```csharp
public class MonthlySales
{
    public string Month { get; set; }
    public double Revenue { get; set; }
}
```

**Controller:**

```csharp
public ActionResult Index()
{
    List<MonthlySales> data = new List<MonthlySales>
    {
        new MonthlySales { Month = "January", Revenue = 15000 },
        new MonthlySales { Month = "February", Revenue = 18000 },
        new MonthlySales { Month = "March", Revenue = 22000 },
        new MonthlySales { Month = "April", Revenue = 19000 },
        new MonthlySales { Month = "May", Revenue = 25000 },
        new MonthlySales { Month = "June", Revenue = 28000 }
    };
    return View(data);
}
```

**View:**

```html
@model List<MonthlySales>

@Html.EJS().Chart("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Month")
            .YName("Revenue")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
            .Add();
    })
    .PrimaryXAxis(axis => 
        axis.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
    )
    .PrimaryYAxis(axis => 
        axis.LabelFormat("${value}K")
    )
    .Title("Monthly Revenue")
    .Render()
```

This creates a column chart showing revenue for each month.

## Multiple Series Data

### Comparing Multiple Metrics

Display multiple data series for comparison:

**Model:**

```csharp
public class QuarterlyResults
{
    public string Quarter { get; set; }
    public double Revenue { get; set; }
    public double Expenses { get; set; }
    public double Profit { get; set; }
}
```

**Controller:**

```csharp
public ActionResult Index()
{
    List<QuarterlyResults> data = new List<QuarterlyResults>
    {
        new QuarterlyResults 
        { 
            Quarter = "Q1", 
            Revenue = 100000, 
            Expenses = 70000, 
            Profit = 30000 
        },
        new QuarterlyResults 
        { 
            Quarter = "Q2", 
            Revenue = 115000, 
            Expenses = 75000, 
            Profit = 40000 
        },
        new QuarterlyResults 
        { 
            Quarter = "Q3", 
            Revenue = 130000, 
            Expenses = 80000, 
            Profit = 50000 
        },
        new QuarterlyResults 
        { 
            Quarter = "Q4", 
            Revenue = 150000, 
            Expenses = 90000, 
            Profit = 60000 
        }
    };
    return View(data);
}
```

**View with Multiple Series:**

```html
@model List<QuarterlyResults>

@Html.EJS().Chart("container")
    .Series(series =>
    {
        // Revenue series
        series.DataSource((IEnumerable<object>)Model)
            .XName("Quarter")
            .YName("Revenue")
            .Name("Revenue")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
            .Add();
        
        // Expenses series
        series.DataSource((IEnumerable<object>)Model)
            .XName("Quarter")
            .YName("Expenses")
            .Name("Expenses")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
            .Add();
        
        // Profit series
        series.DataSource((IEnumerable<object>)Model)
            .XName("Quarter")
            .YName("Profit")
            .Name("Profit")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
            .Add();
    })
    .PrimaryXAxis(axis => 
        axis.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
    )
    .PrimaryYAxis(axis => 
        axis.LabelFormat("${value}K")
    )
    .Legend(legend => 
        legend.Visible(true)
    )
    .Title("Quarterly Financial Results")
    .Render()
```

This displays three series side-by-side for direct comparison.

## Dynamic Data Sources

### Real-Time Data Updates

Load data dynamically from various sources:

**From API Endpoint:**

```csharp
public async Task<ActionResult> Index()
{
    using (var client = new HttpClient())
    {
        var response = await client.GetAsync("https://api.example.com/sales");
        var jsonData = await response.Content.ReadAsStringAsync();
        var data = JsonConvert.DeserializeObject<List<SalesData>>(jsonData);
        return View(data);
    }
}
```

**From Database:**

```csharp
using (var context = new AppDbContext())
{
    var data = context.SalesRecords
        .Where(x => x.Year == 2024)
        .OrderBy(x => x.Month)
        .ToList();
    return View(data);
}
```

**From CSV File:**

```csharp
public ActionResult Index()
{
    var data = new List<SalesData>();
    using (var reader = new StreamReader("~/App_Data/sales.csv"))
    {
        string line;
        reader.ReadLine(); // Skip header
        
        while ((line = reader.ReadLine()) != null)
        {
            var parts = line.Split(',');
            data.Add(new SalesData
            {
                Month = parts[0],
                Sales = double.Parse(parts[1])
            });
        }
    }
    return View(data);
}
```

## Data Binding Best Practices

### 1. Use Strong Typing

Always use typed models instead of dynamic or anonymous objects:

```csharp
// ✓ Good: Type-safe
List<SalesData> data = GetSalesData();
return View(data);

// ✗ Avoid: Dynamic
dynamic data = GetData();
return View(data);
```

### 2. Sort and Filter Data

Order data appropriately before binding:

```csharp
var data = _context.Sales
    .Where(x => x.Year == 2024)  // Filter by year
    .OrderBy(x => x.Month)        // Sort chronologically
    .ToList();
return View(data);
```

### 3. Property Naming Convention

Use clear, consistent property names:

```csharp
// ✓ Clear: Property names match chart intent
public string Category { get; set; }
public double Value { get; set; }

// ✗ Ambiguous: Generic names
public string X { get; set; }
public double Y { get; set; }
```

### 4. Null Handling

Always check for null values before rendering:

```csharp
public ActionResult Index()
{
    var data = GetData() ?? new List<SalesData>();
    return View(data);
}
```

### 5. Data Formatting

Format numbers in the model when appropriate:

```csharp
public class SalesData
{
    public string Month { get; set; }
    public double Sales { get; set; }        // Raw value
    public string FormattedSales             // Formatted display
    {
        get { return Sales.ToString("C"); }
    }
}
```

## Common Data Scenarios

### Scenario 1: Time Series Data

Chart monthly trend data over a year:

```csharp
public List<TimeSeriesData> GetMonthlyData()
{
    return new List<TimeSeriesData>
    {
        new TimeSeriesData { Date = "2024-01", Value = 100 },
        new TimeSeriesData { Date = "2024-02", Value = 115 },
        new TimeSeriesData { Date = "2024-03", Value = 130 },
        new TimeSeriesData { Date = "2024-04", Value = 125 },
        new TimeSeriesData { Date = "2024-05", Value = 140 },
        new TimeSeriesData { Date = "2024-06", Value = 155 }
    };
}
```

### Scenario 2: Categorical Comparison

Compare values across categories:

```csharp
public List<CategoryData> GetCategoryData()
{
    return new List<CategoryData>
    {
        new CategoryData { Region = "North", Sales = 50000 },
        new CategoryData { Region = "South", Sales = 45000 },
        new CategoryData { Region = "East", Sales = 55000 },
        new CategoryData { Region = "West", Sales = 48000 }
    };
}
```

### Scenario 3: Stacked Composition

Show part-to-whole relationships:

```csharp
public List<CompositionData> GetCompositionData()
{
    return new List<CompositionData>
    {
        new CompositionData 
        { 
            Product = "A", 
            Q1 = 20, 
            Q2 = 25, 
            Q3 = 30, 
            Q4 = 35 
        },
        new CompositionData 
        { 
            Product = "B", 
            Q1 = 15, 
            Q2 = 18, 
            Q3 = 22, 
            Q4 = 25 
        }
    };
}
```

### Scenario 4: Large Datasets

Handle performance with large datasets:

```csharp
public ActionResult Index()
{
    // Aggregate or sample data for performance
    var data = _context.Transactions
        .GroupBy(x => x.Date.Date)
        .Select(g => new DailySummary
        {
            Date = g.Key,
            Total = g.Sum(x => x.Amount),
            Count = g.Count()
        })
        .OrderBy(x => x.Date)
        .ToList();
    
    return View(data);
}
```

## Key Data Mapping Properties

| Property | Purpose | Example |
|----------|---------|---------|
| `DataSource` | Collection of data objects | `(IEnumerable<object>)Model` |
| `XName` | Property for X-axis | `"Month"` or `"Category"` |
| `YName` | Property for Y-axis | `"Sales"` or `"Revenue"` |
| `Name` | Series display name | `"2024 Sales"` |
| `Type` | Chart type rendering the series | `ChartSeriesType.Column` |

Understanding these core bindings allows you to create flexible, reusable chart components for various data visualization needs.
