# Series Types and Chart Types

## Table of Contents
- [Chart Types Overview](#chart-types-overview)
- [Column Chart](#column-chart)
- [Bar Chart](#bar-chart)
- [Stacking Column](#stacking-column)
- [Stacking Column 100%](#stacking-column-100)
- [Stacking Bar](#stacking-bar)
- [Stacking Bar 100%](#stacking-bar-100)
- [Choosing the Right Chart Type](#choosing-the-right-chart-type)

## Chart Types Overview

The 3D Chart control supports six primary series/chart types, each designed for different data visualization scenarios:

| Chart Type | Use Case | Data Format |
|-----------|----------|-------------|
| **Column** | Categorical comparison | Categories with single/multiple values |
| **Bar** | Horizontal comparison | Categories with single/multiple values |
| **Stacking Column** | Part-to-whole composition | Multiple value columns per category |
| **Stacking Column 100%** | Percentage composition | Multiple values normalized to 100% |
| **Stacking Bar** | Horizontal part-to-whole | Multiple value bars per category |
| **Stacking Bar 100%** | Horizontal percentage composition | Multiple values normalized to 100% |

## Column Chart

Column charts display vertical bars for comparing values across categories. Best for time-series data, categorical comparisons, and showing trends.

### Basic Column Chart

```csharp
public class MonthlySales
{
    public string Month { get; set; }
    public double Sales { get; set; }
}

// Controller
public ActionResult Index()
{
    List<MonthlySales> data = new List<MonthlySales>
    {
        new MonthlySales { Month = "January", Sales = 35000 },
        new MonthlySales { Month = "February", Sales = 28000 },
        new MonthlySales { Month = "March", Sales = 34000 },
        new MonthlySales { Month = "April", Sales = 32000 },
        new MonthlySales { Month = "May", Sales = 40000 },
        new MonthlySales { Month = "June", Sales = 32000 }
    };
    return View(data);
}

// View
@Html.EJS().Chart("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Month")
            .YName("Sales")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
            .Add();
    })
    .PrimaryXAxis(axis => 
        axis.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
    )
    .PrimaryYAxis(axis => 
        axis.LabelFormat("${value}K")
    )
    .Title("Monthly Sales 2024")
    .Render()
```

### Multiple Series Column Chart

Compare multiple metrics side-by-side:

```csharp
public class QuarterlyData
{
    public string Quarter { get; set; }
    public double Sales { get; set; }
    public double Revenue { get; set; }
    public double Profit { get; set; }
}

// View
@Html.EJS().Chart("container")
    .Series(series =>
    {
        // Sales series
        series.DataSource((IEnumerable<object>)Model)
            .XName("Quarter")
            .YName("Sales")
            .Name("Sales")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
            .Add();
        
        // Revenue series
        series.DataSource((IEnumerable<object>)Model)
            .XName("Quarter")
            .YName("Revenue")
            .Name("Revenue")
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
    .Legend(legend => legend.Visible(true))
    .Render()
```

### Column Chart Use Cases

- **Time-series trends**: Display data changes over months, quarters, years
- **Department comparisons**: Compare metrics across departments
- **Product performance**: Show sales by product
- **Regional analysis**: Compare regions side-by-side
- **Year-over-year**: Compare same period across years

### Column Chart Best Practices

- Use for 5-20 categories
- Limit to 2-4 series for clarity
- Sort categories logically (chronological, alphabetical)
- Add data labels for exact values
- Use consistent colors across series

## Bar Chart

Bar charts display horizontal bars for comparing values across categories. Ideal when category names are long or when horizontal space is limited.

### Basic Bar Chart

```csharp
public class ProductSales
{
    public string Product { get; set; }
    public double Sales { get; set; }
}

// View
@Html.EJS().Chart("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Product")
            .YName("Sales")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Bar)
            .Add();
    })
    .PrimaryXAxis(axis => 
        axis.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
    )
    .Title("Product Sales Comparison")
    .Render()
```

### Multiple Series Bar Chart

```csharp
@Html.EJS().Chart("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Product")
            .YName("Q1Sales")
            .Name("Q1 Sales")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Bar)
            .Add();
        
        series.DataSource((IEnumerable<object>)Model)
            .XName("Product")
            .YName("Q2Sales")
            .Name("Q2 Sales")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Bar)
            .Add();
    })
    .Legend(legend => legend.Visible(true))
    .Render()
```

### Bar Chart Use Cases

- **Long category labels**: City names, company names, product descriptions
- **Ranking display**: Top 10 performers, rankings by metric
- **Regional comparisons**: Country or region data
- **Demographic data**: Age groups, income brackets
- **Horizontal space constraints**: Dashboard widgets with limited width

### Bar Chart Best Practices

- Use for categories with long names
- Rows should be sortable by value
- Sort bars by value (descending for top performers)
- Use labels to show exact values
- Limit to reasonable number of rows (10-20)

## Stacking Column

Stacking column charts show composition by stacking multiple series on top of each other. Perfect for showing part-to-whole relationships while maintaining categorical comparisons.

### Basic Stacking Column

```csharp
public class DepartmentSales
{
    public string Month { get; set; }
    public double Sales { get; set; }
    public double Support { get; set; }
    public double Marketing { get; set; }
}

// View
@Html.EJS().Chart("container")
    .Series(series =>
    {
        // Sales department
        series.DataSource((IEnumerable<object>)Model)
            .XName("Month")
            .YName("Sales")
            .Name("Sales Dept")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn)
            .Add();
        
        // Support department
        series.DataSource((IEnumerable<object>)Model)
            .XName("Month")
            .YName("Support")
            .Name("Support Dept")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn)
            .Add();
        
        // Marketing department
        series.DataSource((IEnumerable<object>)Model)
            .XName("Month")
            .YName("Marketing")
            .Name("Marketing Dept")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn)
            .Add();
    })
    .PrimaryXAxis(axis => 
        axis.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
    )
    .Legend(legend => legend.Visible(true))
    .Title("Department Revenue Breakdown")
    .Render()
```

### Stacking Column Customization

```csharp
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("Month")
        .YName("Sales")
        .Name("Sales")
        .Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn)
        .DataLabel(label =>
        {
            label.Visible(true);
            label.Format("{point.y}");
            label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Middle);
        })
        .Add();
    
    series.DataSource((IEnumerable<object>)Model)
        .XName("Month")
        .YName("Profit")
        .Name("Profit")
        .Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn)
        .DataLabel(label =>
        {
            label.Visible(true);
            label.Format("{point.y}");
        })
        .Add();
})
```

### Stacking Column Use Cases

- **Budget breakdown**: Show spending by department or category
- **Revenue composition**: Sales by product or region
- **Time tracking**: Time spent on different activities
- **Resource allocation**: Resources distributed across projects
- **Categorical trends**: Trends with composition details

### Stacking Column Best Practices

- Order series logically (largest to smallest or by importance)
- Limit to 3-5 series (too many make comparison difficult)
- Add data labels for accuracy
- Use distinct, accessible colors
- Consider 100% stacked variant for percentage comparisons

## Stacking Column 100%

Stacking Column 100% normalizes stacked data to show percentages, making composition comparison consistent across categories regardless of total values.

### Basic Stacking Column 100%

```csharp
@Html.EJS().Chart("container")
    .Series(series =>
    {
        // Browser A
        series.DataSource((IEnumerable<object>)Model)
            .XName("Month")
            .YName("Chrome")
            .Name("Chrome")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn100)
            .Add();
        
        // Browser B
        series.DataSource((IEnumerable<object>)Model)
            .XName("Month")
            .YName("Firefox")
            .Name("Firefox")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn100)
            .Add();
        
        // Browser C
        series.DataSource((IEnumerable<object>)Model)
            .XName("Month")
            .YName("Safari")
            .Name("Safari")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn100)
            .Add();
    })
    .PrimaryXAxis(axis => 
        axis.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
    )
    .PrimaryYAxis(axis => 
        axis.LabelFormat("{value}%")
    )
    .Legend(legend => legend.Visible(true))
    .Title("Browser Market Share (%)")
    .Render()
```

### 100% Chart Data Model

```csharp
public class BrowserStats
{
    public string Month { get; set; }
    public double Chrome { get; set; }
    public double Firefox { get; set; }
    public double Safari { get; set; }
    public double Edge { get; set; }
}

// Controller - Data will be normalized to percentages
var data = new List<BrowserStats>
{
    new BrowserStats { Month = "Jan", Chrome = 60, Firefox = 20, Safari = 15, Edge = 5 },
    new BrowserStats { Month = "Feb", Chrome = 62, Firefox = 18, Safari = 14, Edge = 6 },
    new BrowserStats { Month = "Mar", Chrome = 64, Firefox = 16, Safari = 15, Edge = 5 }
};
```

### 100% Stacking Column Use Cases

- **Market share**: Browser, OS, or device market share
- **Percentage composition**: Revenue percentage by source
- **Survey results**: Percentage distribution across options
- **Ratings breakdown**: Distribution of 1-5 star ratings
- **Status distribution**: Percentage of tasks by status

### 100% Stacking Column Best Practices

- Always format Y-axis as percentage
- Best for showing proportions
- Each segment represents percentage of total
- Makes trend comparison easy across categories
- Label segments with percentages for clarity

## Stacking Bar

Horizontal stacking bar charts show composition with bars stacked horizontally. Use when category names are long or horizontal orientation is preferred.

### Basic Stacking Bar

```csharp
public class RegionalBudget
{
    public string Region { get; set; }
    public double Marketing { get; set; }
    public double Operations { get; set; }
    public double Development { get; set; }
}

// View
@Html.EJS().Chart("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Region")
            .YName("Marketing")
            .Name("Marketing")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingBar)
            .Add();
        
        series.DataSource((IEnumerable<object>)Model)
            .XName("Region")
            .YName("Operations")
            .Name("Operations")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingBar)
            .Add();
        
        series.DataSource((IEnumerable<object>)Model)
            .XName("Region")
            .YName("Development")
            .Name("Development")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingBar)
            .Add();
    })
    .PrimaryXAxis(axis => 
        axis.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
    )
    .Legend(legend => legend.Visible(true))
    .Title("Budget Allocation by Region")
    .Render()
```

### Stacking Bar Use Cases

- **Horizontal layout preference**: Better fit for dashboard widgets
- **Long category labels**: City, company, or department names
- **Ranking with composition**: Top 10 with breakdown
- **Geographic data**: States, countries, or regions
- **Organizational hierarchy**: Teams or divisions

## Stacking Bar 100%

Horizontal 100% stacked bars show normalized percentage composition horizontally, ideal for comparing proportions across categories with long names.

### Basic Stacking Bar 100%

```csharp
public class CustomerSegment
{
    public string Segment { get; set; }
    public double Premium { get; set; }
    public double Standard { get; set; }
    public double Basic { get; set; }
}

// View
@Html.EJS().Chart("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Segment")
            .YName("Premium")
            .Name("Premium")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingBar100)
            .Add();
        
        series.DataSource((IEnumerable<object>)Model)
            .XName("Segment")
            .YName("Standard")
            .Name("Standard")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingBar100)
            .Add();
        
        series.DataSource((IEnumerable<object>)Model)
            .XName("Segment")
            .YName("Basic")
            .Name("Basic")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.StackingBar100)
            .Add();
    })
    .PrimaryXAxis(axis => 
        axis.LabelFormat("{value}%")
    )
    .Legend(legend => legend.Visible(true))
    .Title("Customer Distribution by Segment (%)")
    .Render()
```

### Stacking Bar 100% Use Cases

- **Percentage composition**: Horizontal display of percentages
- **Survey data**: Distribution across responses
- **Quality metrics**: Defect rates across products
- **Status distribution**: Completion status by project
- **Demographic breakdown**: Population segments

## Choosing the Right Chart Type

### Decision Tree

**Question 1: How many value dimensions per category?**
- **One**: Use Column or Bar
- **Multiple**: Continue to Question 2

**Question 2: Do you want to show part-to-whole relationship?**
- **No (comparison)**: Use Column or Bar (multiple series)
- **Yes**: Continue to Question 3

**Question 3: Do you need percentages or raw values?**
- **Raw values**: Use Stacking Column or Stacking Bar
- **Percentages**: Use Stacking Column 100% or Stacking Bar 100%

**Question 4: Vertical or horizontal orientation?**
- **Vertical**: Use Column variants
- **Horizontal**: Use Bar variants

### Quick Selection Guide

| Scenario | Recommended Chart Type |
|----------|------------------------|
| Compare 2-3 metrics across categories | Column or Bar |
| Show budget breakdown by department | Stacking Column |
| Compare composition across regions | Stacking Column |
| Show market share percentages | Stacking Column 100% |
| Top 10 with breakdown | Stacking Bar |
| Percentage survey results | Stacking Bar 100% |
| Long category names | Bar or Stacking Bar |
| Time series with composition | Stacking Column |

### Chart Type Selection Code

```csharp
public ActionResult GetChartByType(string chartType)
{
    var data = GetChartData();
    
    switch(chartType)
    {
        case "comparison":
            return View("ColumnChart", data);
        
        case "composition":
            return View("StackingColumnChart", data);
        
        case "percentage":
            return View("StackingColumn100Chart", data);
        
        case "horizontal":
            return View("BarChart", data);
        
        case "horizontalComposition":
            return View("StackingBarChart", data);
        
        case "horizontalPercentage":
            return View("StackingBar100Chart", data);
        
        default:
            return View("ColumnChart", data);
    }
}
```

## Performance Considerations

### Data Point Limits

- **Column/Bar**: 100-1000 categories (optimal: 5-50)
- **Stacking Column/Bar**: 50-500 categories with multiple series
- **100% Variants**: Same as stacking, good performance

### Series Limits

- **Recommended**: 2-5 series for readability
- **Maximum**: 10+ series (may compromise visibility)
- **Stacking**: Limit to 3-5 series for clarity

### Optimization Tips

```csharp
// 1. Aggregate data for large datasets
var aggregated = data
    .GroupBy(x => x.Category)
    .Select(g => new ChartData
    {
        Category = g.Key,
        Value = g.Sum(x => x.Value)
    })
    .ToList();

// 2. Sample data if needed
var sampled = data.Where((x, i) => i % 10 == 0).ToList();

// 3. Use rendering mode
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("Category")
        .YName("Value")
        .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
        .Add();
})
```

Understanding series types and selecting the appropriate chart type for your data is crucial for effective data visualization and user comprehension.
