# Tooltips in ASP.NET MVC Pivot Table

## Overview

Tooltips display contextual information when users hover over pivot table cells, showing row headers, column headers, and values. Tooltips are **enabled by default** and display cell value along with row and column header information.

## Enable/Disable Tooltips

Use the `ShowTooltip` property to control tooltip visibility:

```csharp
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).ShowTooltip(true).Width("100%").Height("450").Render()
```

### Disable Tooltips

```csharp
@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).ShowTooltip(false).Width("100%").Height("450").Render()
```

## Tooltip Content

Default tooltip displays:
- **Row Headers** - Field names from row area
- **Column Headers** - Field names from column area
- **Cell Value** - Aggregated value in the selected cell
- **Data Type Info** - Value type information

## Customize Tooltip Template

Use `TooltipTemplate` to create custom tooltip HTML with dynamic placeholders:

```csharp
@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).TooltipTemplate("<div class='tooltip'><p>${rowHeaders} - ${columnHeaders}</p><p>Value: ${value}</p></div>").ShowTooltip(true).Width("100%").Height("450").Render()
```

### Template Placeholders

| Placeholder | Description |
|-------------|-------------|
| `${rowHeaders}` | Row field headers for selected cell |
| `${columnHeaders}` | Column field headers for selected cell |
| `${rowFields}` | Row field names |
| `${columnFields}` | Column field names |
| `${valueField}` | Aggregated field name |
| `${aggregateType}` | Aggregation type (Sum, Average, etc.) |
| `${value}` | Formatted cell value |

## Pivot Chart Tooltips

Pivot Chart tooltips are configured separately through `ChartSettings.Tooltip`:

```csharp
.ChartSettings(c => c.Tooltip(ts => ts.Enable(true)))
```

Unlike pivot table tooltips, chart tooltips are controlled via `ChartSettings`, not `TooltipTemplate`.
