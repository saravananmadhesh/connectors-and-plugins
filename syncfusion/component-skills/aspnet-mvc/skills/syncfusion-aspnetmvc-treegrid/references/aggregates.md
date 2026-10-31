# Column Aggregates in Tree Grid

## Table of Contents

- [When to Use This](#when-to-use-this)
- [Overview](#overview)
- [Adding Aggregates](#adding-aggregates)
- [Aggregate Types](#aggregate-types)
- [Parent & Child Aggregates](#parent--child-aggregates)
- [Advanced Scenarios](#advanced-scenarios)

## When to Use This

Use column aggregates when you need to:
- Display total budgets in organizational hierarchies
- Show sum of sales per department
- Calculate average ratings across categories
- Count items in each product category
- Visualize summary statistics at parent and child levels
- Display min/max values across hierarchical data

## Overview

Column aggregates calculate summary values (sum, average, count, etc.) for column data. Tree Grid displays aggregates at both parent and child levels, helping visualize totals and statistics within hierarchical data.

## Adding Aggregates

### Enable Aggregates

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowPaging(true)
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Width("80").Add();
        col.Field("TaskName").HeaderText("Task Name").Width("200").Add();
        col.Field("Duration").HeaderText("Duration").Width("120").Add();
        col.Field("Progress").HeaderText("Progress").Width("120").Add();
    })
    .AggregateRows(aggr =>
    {
        aggr.AggregateColumns(agg =>
        {
            agg.Field("Duration").Type("Sum").FooterTemplate("Total: ${Sum}").Add();
            agg.Field("Progress").Type("Average").FooterTemplate("Avg: ${Average}%").Add();
        })
        .ShowChildSummary(true)
        .Add();
    })
    .Render()
```

### Data Model with Aggregatable Fields

```csharp
public class TreeTask
{
    public int TaskID { get; set; }
    public string TaskName { get; set; }
    public int Duration { get; set; }          // Numeric field for sum
    public decimal Progress { get; set; }      // Decimal for average
    public int? ParentID { get; set; }
    public decimal? Budget { get; set; }
}
```

## Aggregate Types

### Sum Aggregate

Calculate total of numeric values:

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AggregateRows(aggr =>
    {
        aggr.AggregateColumns(agg =>
        {
            agg.Field("Duration")
                .Type("Sum")
                .FooterTemplate("Total Duration: ${Sum} hours")
                .Add();
                
            agg.Field("Budget")
                .Type("Sum")
                .FooterTemplate("Total Budget: ${Sum:C2}")
                .Add();
        })
        .Add();
    })
    .Render()
```

**Example Output:** Total Duration: 45 hours

### Average Aggregate

Calculate mean of numeric values:

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AggregateRows(aggr =>
    {
        aggr.AggregateColumns(agg =>
        {
            agg.Field("Progress")
                .Type("Average")
                .FooterTemplate("Avg Progress: ${Average:P0}")
                .Add();
                
            agg.Field("Rating")
                .Type("Average")
                .FooterTemplate("Avg Rating: ${Average:N2}")
                .Add();
        })
        .Add();
    })
    .Render()
```

**Example Output:** Avg Progress: 65%

### Count Aggregate

Count non-null values:

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AggregateRows(aggr =>
    {
        aggr.AggregateColumns(agg =>
        {
            agg.Field("TaskID")
                .Type("Count")
                .FooterTemplate("Total Tasks: ${Count}")
                .Add();
                
            agg.Field("Status")
                .Type("Count")
                .FooterTemplate("Count: ${Count}")
                .Add();
        })
        .Add();
    })
    .Render()
```

**Example Output:** Total Tasks: 12

### Min/Max Aggregates

Find minimum and maximum values:

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AggregateRows(aggr =>
    {
        aggr.AggregateColumns(agg =>
        {
            agg.Field("StartDate")
                .Type("Min")
                .FooterTemplate("Earliest: ${Min}")
                .Add();
                
            agg.Field("EndDate")
                .Type("Max")
                .FooterTemplate("Latest: ${Max}")
                .Add();
                
            agg.Field("Duration")
                .Type("Min")
                .FooterTemplate("Min: ${Min}")
                .Add();
                
            agg.Field("Duration")
                .Type("Max")
                .FooterTemplate("Max: ${Max}")
                .Add();
        })
        .Add();
    })
    .Render()
```

## Parent & Child Aggregates

### Show Child Level Aggregates

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AggregateRows(aggr =>
    {
        aggr.AggregateColumns(agg =>
        {
            agg.Field("Duration")
                .Type("Sum")
                .FooterTemplate("Subtotal: ${Sum}")
                .Add();
        })
        .ShowChildSummary(true)      // Show aggregate at child level
        .Add();
    })
    .Render()
```

When ShowChildSummary is true:
- Parent rows 显示汇总值 for all descendants
- Child rows show subtotals for their children
- Leaf nodes show their individual values

### Multiple Aggregates per Column

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AggregateRows(aggr =>
    {
        aggr.AggregateColumns(agg =>
        {
            // Multiple aggregates for Duration column
            agg.Field("Duration").Type("Sum").FooterTemplate("Sum: ${Sum}").Add();
            agg.Field("Duration").Type("Average").FooterTemplate("Avg: ${Average}").Add();
            agg.Field("Duration").Type("Min").FooterTemplate("Min: ${Min}").Add();
            agg.Field("Duration").Type("Max").FooterTemplate("Max: ${Max}").Add();
        })
        .Add();
    })
    .Render()
```

## Advanced Scenarios

### Scenario 1: Department Budget Summary

```csharp
// Data Model
public class DepartmentBudget
{
    public int DeptID { get; set; }
    public string DeptName { get; set; }
    public decimal Budget { get; set; }
    public decimal Spent { get; set; }
    public int? ParentDeptID { get; set; }
}
```

```html
<!-- View with aggregates -->
@Html.EJS().TreeGrid("DeptGrid")
    .DataSource(ViewBag.Departments)
    .ParentIdMapping("ParentDeptID")
    .IdMapping("DeptID")
    .Columns(col =>
    {
        col.Field("DeptID").HeaderText("ID").Width("80").Add();
        col.Field("DeptName").HeaderText("Department").Width("200").Add();
        col.Field("Budget").HeaderText("Budget").Format("C2").Width("120").Add();
        col.Field("Spent").HeaderText("Spent").Format("C2").Width("120").Add();
    })
    .AggregateRows(aggr =>
    {
        aggr.AggregateColumns(agg =>
        {
            agg.Field("Budget").Type("Sum").FooterTemplate("Total: ${Sum:C2}").Add();
            agg.Field("Spent").Type("Sum").FooterTemplate("Total: ${Sum:C2}").Add();
        })
        .ShowChildSummary(true)
        .Add();
    })
    .Render()
```

**Sample Output:**
```
Engineering          Budget: $500,000      Spent: $450,000
├─ Frontend          Budget: $200,000      Spent: $180,000  (Sum shown)
└─ Backend           Budget: $300,000      Spent: $270,000  (Sum shown)
```

### Scenario 2: Sales Performance by Region

```csharp
public class RegionalSales
{
    public int RegionID { get; set; }
    public string RegionName { get; set; }
    public decimal Sales { get; set; }
    public int Transactions { get; set; }
    public int? ParentRegionID { get; set; }
}
```

```html
@Html.EJS().TreeGrid("RegionGrid")
    .DataSource(ViewBag.Regions)
    .ParentIdMapping("ParentRegionID")
    .Columns(col =>
    {
        col.Field("RegionID").HeaderText("ID").Width("80").Add();
        col.Field("RegionName").HeaderText("Region").Width("200").Add();
        col.Field("Sales").HeaderText("Sales").Format("C0").Width("120").Add();
        col.Field("Transactions").HeaderText("Count").Width("100").Add();
    })
    .AggregateRows(aggr =>
    {
        aggr.AggregateColumns(agg =>
        {
            agg.Field("Sales").Type("Sum").FooterTemplate("Total: ${Sum:C0}").Add();
            agg.Field("Transactions").Type("Sum").FooterTemplate("Total: ${Sum}").Add();
            agg.Field("Sales").Type("Average").HeaderTemplate("Avg Sale: ${Average:C0}").Add();
        })
        .ShowChildSummary(true)
        .Add();
    })
    .Render()
```

### Scenario 3: Task Progress Summary

```html
@Html.EJS().TreeGrid("TaskGrid")
    .DataSource(ViewBag.Tasks)
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Width("80").Add();
        col.Field("TaskName").HeaderText("Task").Width("250").Add();
        col.Field("Progress").HeaderText("Progress").Format("P0").Width("120").Add();
        col.Field("CompletedDays").HeaderText("Days Done").Width("100").Add();
    })
    .AggregateRows(aggr =>
    {
        aggr.AggregateColumns(agg =>
        {
            agg.Field("Progress").Type("Average").FooterTemplate("Avg: ${Average:P0}").Add();
            agg.Field("CompletedDays").Type("Sum").FooterTemplate("Total: ${Sum}").Add();
        })
        .ShowChildSummary(true)
        .Add();
    })
    .Render()
```
