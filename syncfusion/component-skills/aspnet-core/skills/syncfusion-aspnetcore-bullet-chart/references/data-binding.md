# Data Binding in Bullet Chart


## Table of Contents
- [Overview](#overview)
- [Local Data Binding](#local-data-binding)
  - [Basic Data Structure](#basic-data-structure)
  - [Populating Data](#populating-data)
- [Mapping Fields](#mapping-fields)
  - [ValueField and TargetField](#valuefield-and-targetfield)
  - [CategoryField (Optional)](#categoryfield-optional)
- [Data Binding Scenarios](#data-binding-scenarios)
  - [Scenario 1: Single Value Comparison](#scenario-1-single-value-comparison)
  - [Scenario 2: Multiple Categories](#scenario-2-multiple-categories)
  - [Scenario 3: Dynamic Data](#scenario-3-dynamic-data)
- [Advanced Data Configuration](#advanced-data-configuration)
  - [Custom Field Names](#custom-field-names)
  - [Filtering and Sorting Data](#filtering-and-sorting-data)
  - [Null Handling](#null-handling)
- [Data Binding Best Practices](#data-binding-best-practices)
  - [1. Use Strongly-Typed Collections](#1-use-strongly-typed-collections)
  - [2. Validate Data Before Binding](#2-validate-data-before-binding)
  - [3. Optimize Data Size](#3-optimize-data-size)
  - [4. Consider Performance](#4-consider-performance)
- [Troubleshooting](#troubleshooting)
  - [Data Not Displaying](#data-not-displaying)
  - [Incorrect Values Displayed](#incorrect-values-displayed)
  - [Performance Issues with Large Datasets](#performance-issues-with-large-datasets)
  
## Overview

The Bullet Chart visualizes data bound from local or remote data sources. This reference covers how to structure data, map fields, and configure data binding for various scenarios.

---

## Local Data Binding

### Basic Data Structure

Define a C# class to represent your bullet chart data:

```csharp
public class BulletChartData
{
    public double Value { get; set; }              // Actual/current value
    public double Target { get; set; }             // Target/comparative value
    public string Category { get; set; }           // Category name for Multiple records
}
```

### Populating Data

Create a list of data and pass it to your Razor page:

```csharp
// CSHTML.cs - Page Model
public class IndexModel : PageModel
{
    public List<BulletChartData> ChartData { get; set; }
    
    public void OnGet()
    {
        ChartData = new List<BulletChartData>
        {
            new BulletChartData { Value = 75, Target = 80, Category = "Sales" },
            new BulletChartData { Value = 85, Target = 90, Category = "Revenue" },
            new BulletChartData { Value = 65, Target = 75, Category = "Profit" }
        };
    }
}
```

---

## Mapping Fields

### ValueField and TargetField

Map the data properties to Bullet Chart properties:

```cshtml
<ejs-bulletchart id="container" 
    dataSource="@Model.ChartData"
    categoryField="Category" 
    valueField="Value" 
    targetField="Target">
</ejs-bulletchart>
```

**Required Properties:**
- `dataSource` - Collection of data objects
- `valueField` - Property name containing actual values
- `targetField` - Property name containing target values

### CategoryField (Optional)

For multiple categories in one chart, use the `categoryField`:

```cshtml
<ejs-bulletchart id="container" 
    dataSource="@Model.ChartData" 
    valueField="Value" 
    targetField="Target"
    categoryField="Category">
</ejs-bulletchart>
```

---

## Data Binding Scenarios

### Scenario 1: Single Value Comparison

Display one metric with its actual vs. target value:

```csharp
public class SingleMetricData
{
    public double ActualSales { get; set; }
    public double TargetSales { get; set; }
}
```

```cshtml
<ejs-bulletchart id="container" 
    dataSource="@Model.SingleData" 
    valueField="ActualSales" 
    targetField="TargetSales"
    title="Sales Performance">
</ejs-bulletchart>
```

### Scenario 2: Multiple Categories

Display multiple categories in separate rows:

```csharp
public List<BulletChartData> MultiCategoryData { get; set; } = new List<BulletChartData>
{
    new BulletChartData { Value = 75, Target = 80, Category = "Sales Rep A" },
    new BulletChartData { Value = 85, Target = 90, Category = "Sales Rep B" },
    new BulletChartData { Value = 65, Target = 75, Category = "Sales Rep C" }
};
```

```cshtml
<ejs-bulletchart id="container" 
    dataSource="@Model.MultiCategoryData" 
    valueField="Value" 
    targetField="Target"
    categoryField="Category">
</ejs-bulletchart>
```

### Scenario 3: Dynamic Data

Fetch data from external sources (database, API):

```csharp
public void OnGet()
{
    // Example: Fetch from database or API
    using (var db = new ApplicationDbContext())
    {
        ChartData = db.Sales
            .Select(s => new BulletChartData 
            { 
                Value = s.ActualAmount, 
                Target = s.TargetAmount,
                Category = s.Department
            })
            .ToList();
    }
}
```

---

## Advanced Data Configuration

### Custom Field Names

If your data uses different property names, create a mapping class:

```csharp
public class SalesMetric
{
    public int SalesAmount { get; set; }
    public int QuotaAmount { get; set; }
    public string SalesPerson { get; set; }
}

public class BulletChartData
{
    public double Value { get; set; }
    public double Target { get; set; }
    public string Category { get; set; }
}

// In your OnGet method:
public void OnGet()
{
    var salesData = GetSalesData(); // Get from source
    
    ChartData = salesData.Select(s => new BulletChartData
    {
        Value = s.SalesAmount,
        Target = s.QuotaAmount,
        Category = s.SalesPerson
    }).ToList();
}
```

### Filtering and Sorting Data

Apply filters and sorting before binding:

```csharp
public void OnGet()
{
    ChartData = new List<BulletChartData>
    {
        new BulletChartData { Value = 270, Target = 250, Category = "Q1" },
        new BulletChartData { Value = 285, Target = 290, Category = "Q2" },
        new BulletChartData { Value = 200, Target = 210, Category = "Q3" },
        new BulletChartData { Value = 320, Target = 300, Category = "Q4" }
    }
    .Where(x => x.Value > 0)        // Filter
    .OrderByDescending(x => x.Value) // Sort
    .ToList();
}
```

### Null Handling

Handle null or missing values gracefully:

```csharp
ChartData = sourceData
    .Where(x => x.Value.HasValue && x.Target.HasValue)
    .Select(x => new BulletChartData 
    { 
        Value = x.Value.Value, 
        Target = x.Target.Value,
        Category = x.Category ?? "Unknown"
    })
    .ToList();
```

---

## Data Binding Best Practices

### 1. Use Strongly-Typed Collections

```csharp
// ✅ Good
public List<BulletChartData> ChartData { get; set; }

// ❌ Avoid
public dynamic Data { get; set; }
```

### 2. Validate Data Before Binding

```csharp
public void OnGet()
{
    var data = GetChartData();
    
    if (data == null || data.Count == 0)
    {
        // Handle empty data
        ViewData["Message"] = "No data available";
        ChartData = new List<BulletChartData>();
    }
    else
    {
        ChartData = data;
    }
}
```

### 3. Optimize Data Size

```csharp
// Fetch only required fields
ChartData = db.Metrics
    .Select(m => new BulletChartData 
    { 
        Value = m.ActualValue, 
        Target = m.TargetValue 
    })
    .Take(100) // Limit results
    .ToList();
```

### 4. Consider Performance

For large datasets, implement paging or filtering to reduce data volume:

```csharp
public void OnGet(int pageIndex = 1)
{
    int pageSize = 10;
    ChartData = db.Metrics
        .Skip((pageIndex - 1) * pageSize)
        .Take(pageSize)
        .Select(m => new BulletChartData 
        { 
            Value = m.ActualValue, 
            Target = m.TargetValue 
        })
        .ToList();
}
```

---

## Troubleshooting

### Data Not Displaying

**Issue:** Chart renders but no data is shown.

**Solution:** Verify the data source:
```csharp
// Check if data is null or empty
if (ChartData == null || ChartData.Count == 0)
{
    throw new Exception("ChartData is not properly initialized");
}

// Verify field mapping
// valueField must match property name in data class
// targetField must match property name in data class
```

### Incorrect Values Displayed

**Issue:** Chart shows wrong values or scales incorrectly.

**Solution:** Check field mapping and data type:
```csharp
// Ensure properties are numeric
public double Value { get; set; }  // ✅ Correct
public int Value { get; set; }     // ✅ Also works
public string Value { get; set; }  // ❌ Won't work
```

### Performance Issues with Large Datasets

**Issue:** Chart is slow to render with lots of data.

**Solution:** Implement data aggregation or pagination:
```csharp
// Aggregate data by category
ChartData = sourceData
    .GroupBy(x => x.Category)
    .Select(g => new BulletChartData
    {
        Value = g.Sum(x => x.Value),
        Target = g.Sum(x => x.Target),
        Category = g.Key
    })
    .ToList();
```
