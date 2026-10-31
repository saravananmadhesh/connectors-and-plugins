# Summary Customization in ASP.NET MVC Pivot Table

## Table of Contents
- [Overview](#overview)
- [Show/Hide Grand Totals](#showhide-grand-totals)
- [Grand Totals Position](#grand-totals-position)
- [Show/Hide Sub-Totals](#showhide-sub-totals)
- [Sub-Totals for Specific Fields](#sub-totals-for-specific-fields)
- [Sub-Totals Position](#sub-totals-position)
- [Best Practices](#best-practices)

## Overview

Summary customization controls visibility and positioning of grand totals and subtotals, allowing clean data visualization and focused analysis.

## Show/Hide Grand Totals

Control grand total row and column display:

```html
using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })
        .ShowGrandTotals(false)).Height("450").Width("100%").Render()
```

### Grand Total Properties:

```html
.DataSourceSettings(ds => ds
    .ShowGrandTotals(false)
    .ShowRowGrandTotals(false)
    .ShowColumnGrandTotals(false))
```

### Use Cases:

- `ShowGrandTotals(false)` - For focused field analysis
- `ShowRowGrandTotals(false)` - When column totals sufficient
- `ShowColumnGrandTotals(false)` - When row totals sufficient

## Grand Totals Position

Control whether grand totals appear at top or bottom:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })
        .GrandTotalsPosition(GrandTotalsPosition.Top)).Height("450").Width("100%").Render()
```

### Position Options:

| Position | Description | Best For |
|----------|-------------|----|
| **Top** | Grand totals at row/column beginning | Quick overview |
| **Bottom** | Grand totals at row/column end (default) | Standard reporting |

**Example - Top Position:**
```
Year        2019    2020    2021    Total
Total       45K     50K     55K     150K
USA         ...
Canada      ...
```

## Show/Hide Sub-Totals

Control subtotal display for detailed breakdowns:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })
        .ShowSubTotals(false)).Height("450").Width("100%").Render()
```

### Sub-Total Properties:

```html
.DataSourceSettings(ds => ds
    .ShowSubTotals(false)
    .ShowRowSubTotals(false)
    .ShowColumnSubTotals(false))
```

### Use Cases:

- `ShowSubTotals(true)` - For hierarchical analysis
- `ShowRowSubTotals(false)` - Focus on grand totals only
- `ShowColumnSubTotals(false)` - Reduce visual clutter

## Sub-Totals for Specific Fields

Hide subtotals for individual fields while keeping others visible:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { 
            rows.Name("Country").Add();
            rows.Name("Region")
                .ShowSubTotals(false)
                .Add();
        })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).Height("450").Width("100%").Render()
```

**Result:** Region subtotals hidden, but Country subtotals remain visible.

## Sub-Totals Position

Control where subtotals appear within groups:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })
        .SubTotalsPosition(SubTotalsPosition.Top)).Height("450").Width("100%").Render()
```

### Position Options:

| Position | Description | Appearance |
|----------|-------------|-----------|
| **Top** | Subtotals at group beginning | Summary first |
| **Auto** (Default) | Automatic placement | Smart rendering |
| **Bottom** | Subtotals at group end | Summary last |

**Example - Top Position:**
```
USA Subtotal    100K
  New York      50K
  California    50K
Canada Subtotal 80K
  Toronto       50K
  Vancouver     30K
```

## Best Practices

- **Readability:** Show grand totals for context, hide subtotals if too many fields
- **Performance:** Hide subtotals with 100+ rows to improve rendering speed
- **Consistency:** Maintain standard position (Top or Bottom) across reports
- **Print:** Verify total visibility before printing
- **Mobile:** Consider hiding subtotals on small screens to reduce scrolling
- **Analysis:** Use field-level ShowSubTotals for focused hierarchical views
