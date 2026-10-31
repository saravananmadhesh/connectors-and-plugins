# Handling Empty Points and Null Values

## Table of Contents
- [Empty Points Overview](#empty-points-overview)
- [Identifying Empty Points](#identifying-empty-points)
- [Handling Empty Points](#handling-empty-points)
- [Empty Point Styling](#empty-point-styling)
- [Data Validation](#data-validation)
- [Common Scenarios](#common-scenarios)

## Empty Points Overview

Empty points occur when:
- Data values are null or undefined
- Categories exist but have no data
- Data sources have gaps
- Incomplete data is loaded

Empty points require special handling to:
- Maintain chart accuracy
- Prevent rendering errors
- Preserve visual consistency
- Communicate data status

## Identifying Empty Points

### Check for Null Values

Validate data before rendering:

```csharp
public class SalesData
{
    public string Category { get; set; }
    public double? Sales { get; set; }  // Nullable for empty values
}

// Usage in Controller
var data = new List<SalesData>
{
    new SalesData { Category = "Q1", Sales = 25000 },
    new SalesData { Category = "Q2", Sales = null },  // Empty point
    new SalesData { Category = "Q3", Sales = 35000 }
};
```

### Detect Missing Values in View

```csharp
@{
    var validData = Model.Where(x => x.Sales.HasValue).ToList();
    var emptyCount = Model.Count - validData.Count;
}

<!-- Show data quality indicator -->
@if (emptyCount > 0)
{
    <div class="alert alert-info">
        @emptyCount missing data point(s)
    </div>
}
```

## Handling Empty Points

### Default Empty Point Behavior

By default, Syncfusion charts skip null values:

```csharp
@Html.EJS().CircularChart3D("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Sales")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Render()
    // Null values automatically excluded
```

### Display Empty Points

Show gaps as distinct visual elements:

```csharp
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("Category")
        .YName("Sales")
        .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
        .EmptyPointSettings(settings =>
        {
            settings.Mode(Syncfusion.EJ2.Charts.EmptyPointMode.Drop);
            settings.Fill("#cccccc");
            settings.Visible(true);
        })
        .Add();
})
```

### Empty Point Modes

| Mode | Behavior | Use Case |
|------|----------|----------|
| `Drop` | Skip empty points | Remove incomplete data |
| `Zero` | Treat as zero value | Include in totals |
| `Average` | Use average of neighbors | Estimate missing values |
| `Gap` | Show visual gap | Indicate data absence |

### Drop Empty Points (Skip)

```csharp
.EmptyPointSettings(settings =>
{
    settings.Mode(Syncfusion.EJ2.Charts.EmptyPointMode.Drop);
})
```

Result: Empty points removed from chart entirely.

### Zero Empty Points

```csharp
.EmptyPointSettings(settings =>
{
    settings.Mode(Syncfusion.EJ2.Charts.EmptyPointMode.Zero);
    settings.Fill("#ffffcc");
})
```

Result: Empty points treated as zero, displayed with warning color.

### Average Empty Points

```csharp
.EmptyPointSettings(settings =>
{
    settings.Mode(Syncfusion.EJ2.Charts.EmptyPointMode.Average);
    settings.Fill("#e0e0e0");
})
```

Result: Calculates average of surrounding values.

## Empty Point Styling

### Visual Indication

Style empty points distinctly:

```csharp
.EmptyPointSettings(settings =>
{
    settings.Visible(true);
    settings.Fill("#f0f0f0");
    settings.Border(border =>
    {
        border.Color("#999999");
        border.Width(2);
        border.DashArray("5,5");  // Dashed border
    });
})
```

### Color Coding

Use different colors for empty points:

```csharp
.EmptyPointSettings(settings =>
{
    settings.Fill("#e0e0e0");  // Gray for missing data
    settings.Border(border =>
    {
        border.Color("#999999");
        border.Width(1);
    });
})
```

### Custom Empty Point Styling

```csharp
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("Category")
        .YName("Sales")
        .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
        .EmptyPointSettings(settings =>
        {
            settings.Mode(Syncfusion.EJ2.Charts.EmptyPointMode.Drop);
            settings.Visible(true);
            settings.Fill("#d3d3d3");
            settings.Border(border =>
            {
                border.Color("#808080");
                border.Width(2);
            });
        })
        .Add();
})
```

### Conditional Styling

Apply styling based on conditions:

```csharp
@{
    var hasEmptyPoints = Model.Any(x => !x.Sales.HasValue);
}

@Html.EJS().CircularChart3D("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Sales")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .EmptyPointSettings(settings =>
            {
                settings.Mode(hasEmptyPoints ? 
                    Syncfusion.EJ2.Charts.EmptyPointMode.Drop : 
                    Syncfusion.EJ2.Charts.EmptyPointMode.Average);
                settings.Fill("#f0f0f0");
            })
            .Add();
    })
    .Render()
```

## Data Validation

### Pre-Chart Validation

Clean data before rendering:

```csharp
public List<SalesData> ValidateData(List<SalesData> data)
{
    // Remove null categories
    var validated = data
        .Where(x => !string.IsNullOrEmpty(x.Category))
        .ToList();
    
    // Log removed items
    var removedCount = data.Count - validated.Count;
    if (removedCount > 0)
    {
        Logger.Warn($"{removedCount} invalid records removed");
    }
    
    return validated;
}
```

### Null Coalescing

Provide default values:

```csharp
public List<SalesData> FillMissingValues(List<SalesData> data)
{
    return data.Select(x => new SalesData
    {
        Category = x.Category,
        Sales = x.Sales ?? 0  // Default to 0 for nulls
    }).ToList();
}
```

### Data Quality Report

Generate quality metrics:

```csharp
public class DataQualityReport
{
    public int TotalRecords { get; set; }
    public int ValidRecords { get; set; }
    public int EmptyRecords { get; set; }
    public double CompletionRate { get; set; }
}

public DataQualityReport GenerateReport(List<SalesData> data)
{
    var validCount = data.Count(x => x.Sales.HasValue);
    var emptyCount = data.Count - validCount;
    
    return new DataQualityReport
    {
        TotalRecords = data.Count,
        ValidRecords = validCount,
        EmptyRecords = emptyCount,
        CompletionRate = (double)validCount / data.Count * 100
    };
}
```

## Common Scenarios

### Scenario 1: Incomplete Monthly Data

Handle months with no data:

```csharp
// Data: January, February (null), March, April (null), May
@Html.EJS().CircularChart3D("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Month")
            .YName("Revenue")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .EmptyPointSettings(settings =>
            {
                settings.Mode(Syncfusion.EJ2.Charts.EmptyPointMode.Drop);
                settings.Fill("#e0e0e0");
                settings.Visible(true);
            })
            .Add();
    })
    .Title("Revenue by Month (Incomplete Data)")
    .Legend(legend =>
    {
        legend.Visible(true);
    })
    .Render()
```

### Scenario 2: Data Entry Errors

Handle invalid entries:

```csharp
// Controller: Clean data
var cleanedData = Model
    .Where(x => x.Sales >= 0)  // Remove negative values
    .Where(x => x.Sales.HasValue)  // Remove nulls
    .ToList();

// View: Display chart with cleaned data
@Html.EJS().CircularChart3D("container")
    .Series(series =>
    {
        series.DataSource(cleanedData)
            .XName("Category")
            .YName("Sales")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Render()
```

### Scenario 3: Seasonal Data Gaps

Handle missing seasonal periods:

```csharp
@Html.EJS().CircularChart3D("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Quarter")
            .YName("Sales")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .EmptyPointSettings(settings =>
            {
                settings.Mode(Syncfusion.EJ2.Charts.EmptyPointMode.Average);
                settings.Fill("#fff4e6");
                settings.Border(border =>
                {
                    border.Color("#ffc107");
                    border.Width(1);
                });
            })
            .Add();
    })
    .Tooltip(tooltip =>
    {
        tooltip.Enable(true);
        tooltip.Format("{point.x}: {point.y} (estimated)");
    })
    .Render()
```

### Scenario 4: Multi-Source Data Integration

Combine data from multiple sources with gaps:

```csharp
public List<SalesData> MergeDataSources(
    List<SalesData> source1, 
    List<SalesData> source2)
{
    var merged = source1
        .Union(source2, new CategoryComparer())
        .OrderBy(x => x.Category)
        .ToList();
    
    return merged;
}

// View: Display merged data
@Html.EJS().CircularChart3D("container")
    .Series(series =>
    {
        series.DataSource(mergedData)
            .XName("Category")
            .YName("Sales")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .EmptyPointSettings(settings =>
            {
                settings.Mode(Syncfusion.EJ2.Charts.EmptyPointMode.Drop);
            })
            .Add();
    })
    .Render()
```

## Empty Points Strategy

### Decision Matrix

| Situation | Strategy | Mode |
|-----------|----------|------|
| Real absence | Show indicator | Drop |
| Estimate needed | Average values | Average |
| Incomplete entry | Skip point | Drop |
| Zero valid | Use zero | Zero |
| Data quality unknown | Show warning | Gap |

### Best Practice Flow

1. **Validate** - Check data completeness
2. **Decide** - Choose handling strategy
3. **Configure** - Set empty point mode
4. **Style** - Visual distinction
5. **Communicate** - Inform users
6. **Monitor** - Track quality metrics

## Troubleshooting Empty Points

**Chart appears empty?**
- Check if all values are null
- Verify data source is populated
- Review empty point mode settings

**Unexpected values displayed?**
- Check mode: Zero might show 0 values
- Verify Average calculation is correct
- Validate source data quality

**Visual doesn't match expectations?**
- Review styling configuration
- Check border and fill colors
- Verify visibility setting

Empty point handling ensures accurate, reliable data visualization even with incomplete datasets.
