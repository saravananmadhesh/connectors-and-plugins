# Pie and Donut Charts

## Table of Contents
- [Chart Types Overview](#chart-types-overview)
- [Pie Chart](#pie-chart)
- [Donut Chart](#donut-chart)
- [Radius Customization](#radius-customization)
- [Chart Type Selection](#chart-type-selection)
- [Styling Pie and Donut Charts](#styling-pie-and-donut-charts)

## Chart Types Overview

The 3D Circular Chart supports two primary series types for visualizing part-to-whole relationships:

| Chart Type | Use Case | Visual Style |
|-----------|----------|--------------|
| **Pie** | Show composition with all slices in single circle | Traditional pie with center point |
| **Donut** | Display composition with emphasis on ring shape | Pie with customizable center opening |

Both chart types are ideal for:
- Market share analysis
- Budget allocation visualization
- Survey result distribution
- Percentage composition display
- Category breakdown

## Pie Chart

Pie charts display data as slices of a circle, with each slice representing a proportion of the whole.

### Basic Pie Chart

```csharp
public class MarketShare
{
    public string Brand { get; set; }
    public double Percentage { get; set; }
}

// Controller
public ActionResult Index()
{
    List<MarketShare> data = new List<MarketShare>
    {
        new MarketShare { Brand = "Brand A", Percentage = 35 },
        new MarketShare { Brand = "Brand B", Percentage = 25 },
        new MarketShare { Brand = "Brand C", Percentage = 20 },
        new MarketShare { Brand = "Brand D", Percentage = 15 },
        new MarketShare { Brand = "Others", Percentage = 5 }
    };
    return View(data);
}

// View
@Html.EJS().CircularChart3D("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Brand")
            .YName("Percentage")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Title("Market Share Distribution")
    .Legend(legend => legend.Visible(true))
    .Render()
```

### Pie Chart with Data Labels

```csharp
@Html.EJS().CircularChart3D("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Brand")
            .YName("Percentage")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .DataLabel(label =>
            {
                label.Visible(true);
                label.Format("{point.x}: {point.y}%");
                label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Outside);
            })
            .Add();
    })
    .Title("Market Share with Labels")
    .Render()
```

### Pie Chart Use Cases

- **Market analysis**: Competitor market share
- **Budget breakdown**: Spending distribution by department
- **Survey results**: Response distribution across options
- **Sales composition**: Revenue by product line
- **Traffic sources**: Website visitors by source

## Donut Chart

Donut charts (also called doughnut charts) are pie charts with a hollow center, creating a ring-shaped visualization.

### Basic Donut Chart

```csharp
@Html.EJS().CircularChart3D("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Brand")
            .YName("Percentage")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Doughnut)
            .Add();
    })
    .Title("Market Share (Donut)")
    .Legend(legend => legend.Visible(true))
    .Render()
```

### Donut Chart with Custom Inner Radius

Control the size of the center hole:

```csharp
@Html.EJS().CircularChart3D("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Brand")
            .YName("Percentage")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Doughnut)
            .InnerRadius("50%")  // Customize hole size
            .Add();
    })
    .Title("Market Share")
    .Render()
```

### Inner Radius Options

| Radius | Result | Use Case |
|--------|--------|----------|
| **"0%"** | Solid pie (no hole) | Traditional pie chart |
| **"30%"** | Small center hole | Subtle donut style |
| **"50%"** | Medium hole | Balanced appearance |
| **"70%"** | Large hole, thin ring | Minimal data visualization |
| **"80%"** | Very thin ring | Focus on center content |

### Donut with Center Content

Display text or metrics in the center hole:

```csharp
@Html.EJS().CircularChart3D("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Brand")
            .YName("Percentage")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Doughnut)
            .InnerRadius("60%")
            .Add();
    })
    .Title("Market Share")
    .Render()
```

**HTML/CSS for Center Content:**

```html
<div style="position: relative; display: inline-block;">
    @Html.EJS().CircularChart3D("container")
        .Series(series =>
        {
            series.DataSource((IEnumerable<object>)Model)
                .XName("Brand")
                .YName("Percentage")
                .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Doughnut)
                .InnerRadius("60%")
                .Add();
        })
        .Render()
    
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                text-align: center; font-size: 24px; font-weight: bold;">
        <div>Total</div>
        <div>100%</div>
    </div>
</div>
```

### Donut Chart Use Cases

- **KPI dashboard**: Display key metrics in center
- **Progress tracking**: Show completion percentage
- **Resource allocation**: Visual resource distribution
- **Status overview**: Show status breakdown with label
- **Design-focused dashboards**: Modern aesthetic appearance

## Radius Customization

### Default Radius

By default, both pie and donut charts use 80% of available space:

```csharp
// Default behavior: 80% of container
@Html.EJS().CircularChart3D("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Render()
```

### Custom Radius

Set specific radius for the pie:

```csharp
// 50% of container size
@Html.EJS().CircularChart3D("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Radius("50%")
            .Add();
    })
    .Render()
```

### Multiple Pie Charts with Different Radii

```csharp
// Nested pies with different sizes
@Html.EJS().CircularChart3D("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value1")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Radius("80%")
            .Add();
        
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value2")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Radius("50%")
            .Add();
    })
    .Render()
```

## Chart Type Selection

### Decision Guide

**Choose Pie Chart when:**
- You need a traditional circular visualization
- Space isn't constrained
- Legend handles series identification
- Simplicity is preferred

**Choose Donut Chart when:**
- You want a modern design
- Space in center can display information
- You prefer a ring aesthetic
- Designing dashboards or KPI displays

### Data Preparation

Both chart types require simple data structures:

```csharp
public class ChartItem
{
    public string Category { get; set; }
    public double Value { get; set; }
}

// Model
var data = new List<ChartItem>
{
    new ChartItem { Category = "Category A", Value = 30 },
    new ChartItem { Category = "Category B", Value = 25 },
    new ChartItem { Category = "Category C", Value = 20 },
    new ChartItem { Category = "Category D", Value = 15 },
    new ChartItem { Category = "Category E", Value = 10 }
};
return View(data);
```

## Styling Pie and Donut Charts

### Series Colors

```csharp
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("Category")
        .YName("Value")
        .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
        .Fill("#0078d4")
        .Add();
})
```

### Palette Colors

```csharp
@Html.EJS().CircularChart3D("container")
    .Palette(Syncfusion.EJ2.Charts.ChartSeriesPalette.Excel)
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Render()
```

### Custom Colors Per Slice

```csharp
public class ColoredData
{
    public string Category { get; set; }
    public double Value { get; set; }
    public string Color { get; set; }
}

@Html.EJS().CircularChart3D("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .PointColorMapping("Color")
            .Add();
    })
    .Render()
```

### Border Styling

```csharp
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("Category")
        .YName("Value")
        .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
        .Border(border =>
        {
            border.Color("#ffffff");
            border.Width(2);
        })
        .Add();
})
```

## Performance Considerations

### Data Point Limits

- **Recommended**: 5-15 categories (optimal readability)
- **Acceptable**: Up to 30 categories (may impact clarity)
- **Limit**: Performance remains good with 100+ points

### Best Practices

1. **Combine small slices**: Group values <5% as "Others"
2. **Sort data**: Order by value for visual clarity
3. **Limit colors**: Use 5-7 distinct colors
4. **Data validation**: Ensure positive values only

```csharp
// Combine small categories
var combinedData = data
    .Where(x => x.Value >= totalSum * 0.05)  // >5% of total
    .Concat(new[] { new ChartItem 
    { 
        Category = "Others", 
        Value = data.Where(x => x.Value < totalSum * 0.05).Sum(x => x.Value) 
    }})
    .ToList();
```

Pie and donut charts provide intuitive visualizations for part-to-whole relationships, making complex data easily understandable at a glance.
