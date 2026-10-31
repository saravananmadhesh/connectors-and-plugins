# Aggregation Types in ASP.NET MVC Pivot Table

## Table of Contents
- [Supported Aggregation Types](#supported-aggregation-types)
- [Configure at Design Time](#configure-at-design-time)
- [Restrict Aggregation Types](#restrict-aggregation-types)
- [Advanced Configurations](#advanced-configurations)
- [Best Practices](#best-practices)

## Supported Aggregation Types

Use `SummaryTypes` enum from `Syncfusion.EJ2.PivotView` namespace:

| Type | Description | Use Case |
|------|-------------|----------|
| **Sum** | Total of all values | Sales, Revenue totals |
| **Avg** | Average of values | Average price, performance |
| **Count** | Number of records | Transaction count |
| **DistinctCount** | Unique records | Unique customers |
| **Min** | Minimum value | Lowest price |
| **Max** | Maximum value | Highest price  |
| **Product** | Multiplication of values | Compound rates |
| **Median** | Middle value | Median income |
| **Index** | Data position | Sequential numbering |
| **PopulationStDev** | Population std dev | Statistical analysis |
| **SampleStDev** | Sample std dev | Sample data analysis |
| **PopulationVar** | Population variance | Statistical variance |
| **SampleVar** | Sample variance | Sample variance |
| **RunningTotals** | Cumulative sum | Progress tracking |
| **PercentageOfRunningTotals** | Cumulative percentage of running totals (client-side engine only) | Cumulative proportion tracking |
| **DifferenceFrom** | Difference vs base | YoY comparison |
| **PercentageOfGrandTotal** | % of grand total | Proportion analysis |
| **PercentageOfColumnTotal** | % of column | Column proportion |
| **PercentageOfRowTotal** | % of row | Row proportion |

## Configure at Design Time

Use `.Type()` method to specify aggregation for value fields. Must use correct MVC pattern with `.Name().Add()`:

**Single Aggregation Type:**

```csharp
@using Syncfusion.EJ2.PivotView
@model IEnumerable<dynamic>

@Html.EJS().PivotView("pivotview").DataSourceSettings(dataSource => dataSource
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => {
            rows.Name("Country").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Add();
        })
        .Values(values => {
            values.Name("Amount").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
        })).Height("450").Width("100%").Render()
```

**Multiple Value Fields with Different Types:**

```csharp
@Html.EJS().PivotView("pivotview").DataSourceSettings(dataSource => dataSource
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => {
            rows.Name("Country").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Add();
        })
        .Values(values => {
            values.Name("Sold").Caption("Units Sold").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
            values.Name("Amount").Caption("Total Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
            values.Name("Amount").Caption("Avg Price").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Avg).Add();
            values.Name("Transactions").Caption("Count").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Count).Add();
        })).Height("450").Width("100%").Render()
```

**Advanced - DifferenceFrom Aggregation:**

Compare each value against a base item:

```csharp
@Html.EJS().PivotView("PivotView").DataSourceSettings(dataSource => dataSource
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => {
            rows.Name("Country").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Add();
        })
        .Values(values => {
            values.Name("Amount")
                .Type(Syncfusion.EJ2.PivotView.SummaryTypes.DifferenceFrom)
                .BaseField("Year")
                .BaseItem("2023")
                .Add();
        })).Height(450).Render()
```

## Restrict Aggregation Types

Limit which aggregation options appear in Field List and Grouping Bar using `AggregateTypes` with string values:

```csharp
@Html.EJS().PivotView("PivotView").DataSourceSettings(dataSource => dataSource
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => {
            rows.Name("Country").Add();
            rows.Name("Products").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Caption("Year").Add();
            columns.Name("Quarter").Add();
        })
        .Values(values => {
            values.Name("Sold").Caption("Units Sold").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
            values.Name("Amount").Caption("Sold Amount").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Min).Add();
        })).Height(450).AggregateTypes(new List<string>() { "DistinctCount", "Avg", "Product" }).ShowGroupingBar(true).Render()
```

**Key Points:**
- `AggregateTypes` accepts `List<string>` with aggregate type names as strings
- String values: `"Sum"`, `"Avg"`, `"Count"`, `"DistinctCount"`, `"Min"`, `"Max"`, `"Product"`, etc.
- Only listed aggregation types will appear in the Field List and Grouping Bar dropdown
- If not specified, all available aggregation types are shown

## Advanced Configurations

**Running Totals (Cumulative Sum):**

```csharp
.Values(values => {
    values.Name("Sales")
        .Type(Syncfusion.EJ2.PivotView.SummaryTypes.RunningTotals)
        .Add();
})
```

**Percentage of Running Totals (Cumulative Percentage):**

Displays the cumulative percentage of running totals. Useful for analyzing how each member contributes to the running total over time. **Note:** This aggregation type is supported only on the client-side engine.

```csharp
@Html.EJS().PivotView("PivotView").DataSourceSettings(dataSource => dataSource
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => {
            rows.Name("Country").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Add();
        })
        .Values(values => {
            values.Name("Amount")
                .Caption("Running %")
                .Type(Syncfusion.EJ2.PivotView.SummaryTypes.PercentageOfRunningTotals)
                .Add();
        })).Height(450).Render()
```

**Percentage of Grand Total:**

```csharp
.Values(values => {
    values.Name("Sales")
        .Type(Syncfusion.EJ2.PivotView.SummaryTypes.PercentageOfGrandTotal)
        .Caption("% of Total")
        .Add();
})
```

## Best Practices

- Numeric fields default to `Sum` aggregation if not specified
- Non-numeric fields (string, date) support only `Count` and `DistinctCount`
- For large datasets, avoid slow aggregations: `DistinctCount`, `PopulationStDev`, `SampleStDev`
- Use `DifferenceFrom` for comparisons like year-over-year analysis
- Test aggregation logic with small data first
- Always use `.Name()` method to specify fields - names are case-sensitive
