# Grouping Bar in ASP.NET MVC Pivot Table

## Table of Contents
- [Overview](#overview)
- [Enable Grouping Bar](#enable-grouping-bar)
- [Show or Hide Fields Panel](#show-or-hide-fields-panel)
- [Show or Hide All Filter Icon](#show-or-hide-all-filter-icon)
- [Show or Hide Specific Filter Icon](#show-or-hide-specific-filter-icon)
- [Show or Hide All Sort Icon](#show-or-hide-all-sort-icon)
- [Show or Hide Specific Sort Icon](#show-or-hide-specific-sort-icon)
- [Show or Hide All Remove Icon](#show-or-hide-all-remove-icon)
- [Show or Hide Specific Remove Icon](#show-or-hide-specific-remove-icon)
- [Disable All Fields from Dragging](#disable-all-fields-from-dragging)
- [Disable Specific Field from Dragging](#disable-specific-field-from-dragging)
- [Remove Specific Fields from Displaying](#remove-specific-fields-from-displaying)
- [Change Aggregation Type at Runtime](#change-aggregation-type-at-runtime)
- [Show or Hide Specific Dropdown Icon](#show-or-hide-specific-dropdown-icon)
- [Show Values Button](#show-values-button)
- [Best Practices](#best-practices)

## Overview

The Grouping Bar provides an interactive UI for users to reshape the Pivot Table by dragging and dropping fields. Users can arrange fields between Rows, Columns, Values, and Filters axes directly in the grouping bar without opening additional dialogs.

**Key capabilities:**
- Drag/drop fields between axes for real-time reshaping
- Quick field sorting and filtering
- Remove fields from layout
- Change aggregation types
- Filter field members on-the-fly

## Enable Grouping Bar

Use `.ShowGroupingBar(true)` to display the grouping bar above the pivot table:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).ShowGroupingBar(true).Height("450").Width("100%").Render()
```

## Show or Hide Fields Panel

The fields panel displays all available fields from the data source that aren't currently used in the report. Use `GroupingBarSettings` to show or hide it:

**Show Fields Panel:**
```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).ShowGroupingBar(true).GroupingBarSettings(gbs => gbs.ShowFieldsPanel(true)).Height("450").Width("100%").Render()
```

Users can drag unused fields from the panel to any axis to add them to the report.

## Show or Hide All Filter Icon

Control the visibility of filter icons for all fields in the grouping bar:

**Hide All Filter Icons:**
```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).ShowGroupingBar(true).GroupingBarSettings(gbs => gbs.ShowFilterIcon(false)).Height("450").Width("100%").Render()
```

**Show All Filter Icons (Default):**
```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows =>
        {
            rows.Name("Country").Add();
            rows.Name("Products").ShowFilterIcon(false).Add();
        })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).ShowGroupingBar(true).Height("450").Width("100%").Render()
```

This allows fine-grained control over which fields can be filtered.

## Show or Hide All Sort Icon

Control the visibility of sort icons for all fields:

**Hide All Sort Icons:**
```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).ShowGroupingBar(true).GroupingBarSettings(gbs => gbs.ShowSortIcon(false)).Height("450").Width("100%").Render()
```

**Show All Sort Icons (Default):**
```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).ShowGroupingBar(true).GroupingBarSettings(gbs => gbs.ShowSortIcon(true)).Height("450").Width("100%").Render()
```

When visible, clicking the sort icon cycles through ascending, descending, and no sort.

## Show or Hide Specific Sort Icon

Hide the sort icon for individual fields:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows =>
        {
            rows.Name("Country").Add();
            rows.Name("Quarter").ShowSortIcon(false).Add();
        })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).ShowGroupingBar(true).Height("450").Width("100%").Render()
```

## Show or Hide All Remove Icon

Control the visibility of remove icons for all fields:

**Hide All Remove Icons:**
```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).ShowGroupingBar(true).GroupingBarSettings(gbs => gbs.ShowRemoveIcon(false)).Height("450").Width("100%").Render()
```

**Show All Remove Icons (Default):**
```html
@using Syncfusion.EJ2.PivotView
@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows =>
        {
            rows.Name("Country").ShowRemoveIcon(false).Add();
            rows.Name("Products").Add();
        })
        .Columns(columns => { columns.Name("Year").ShowRemoveIcon(false).Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).ShowGroupingBar(true).Height("450").Width("100%").Render()
```

## Disable All Fields from Dragging

Lock the entire pivot layout by preventing all drag-and-drop operations:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).ShowGroupingBar(true).GroupingBarSettings(gbs => gbs.AllowDragAndDrop(false)).Height("450").Width("100%").Render()
```

This freezes the current report structure so users cannot rearrange fields.

## Disable Specific Field from Dragging

Prevent dragging for individual fields while allowing others to be moved:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows =>
        {
            rows.Name("Country").AllowDragAndDrop(false).Add();
            rows.Name("Products").Add();
        })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).ShowGroupingBar(true).Height("450").Width("100%").Render()
```

## Remove Specific Fields from Displaying

Use `ExcludeFields` to hide fields from both the grouping bar and field list:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })
        .ExcludeFields(new string[] { "Quantity", "Cost" })).ShowGroupingBar(true).Height("450").Width("100%").Render()
```

Hidden fields still exist in the data source but won't appear in the UI.

## Change Aggregation Type at Runtime

Value fields show a dropdown icon that lets users change how values are calculated:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values =>
        {
            values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
            values.Name("Quantity").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
        })).ShowGroupingBar(true).GroupingBarSettings(gbs => gbs.ShowValueTypeIcon(true)).Height("450").Width("100%").Render()
```

Users can select from Sum, Avg, Count, Min, Max, DistinctCount, and other aggregation types.

## Show or Hide Specific Dropdown Icon

Hide the aggregation dropdown for individual value fields:
using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values =>
        {
            values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
            values.Name("Quantity").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
            values.Name("Quantity").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum)
                  .ShowValueTypeIcon(false).Add();
        })).ShowGroupingBar(true).Height("450").Width("100%").Render()
```

## Show Values Button

Enable the Values button in the grouping bar to let users reposition the "Values" field:

`using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns =>
        {
            columns.Name("Year").Add();
            columns.Name("Quarter").Add();
        })
        .Values(values =>
        {
            values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
            values.Name("Profit").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
        })).ShowGroupingBar(true).ShowValuesButton(true).Height("450").Width("100%").Render()
```

**Important:** The Values button only appears when:
- Using relational data sources
- Multiple value fields exist in the report
- Set `ShowValuesButton(true)`

## Best Practices

- **Always enable for interactive analysis:** Grouping bar is the primary UI for users to explore data dynamically
- **Use field panel:** Enable `ShowFieldsPanel(true)` to let users add available fields
- **Clear visual feedback:** Keep default icons visible (`ShowFilterIcon`, `ShowSortIcon`, etc.) for user clarity
- **Prevent accidental actions:** Hide remove icon for critical fields using `ShowRemoveIcon(false)`
- **Lock sensitive layouts:** Disable drag-and-drop for key fields using `AllowDragAndDrop(false)`
- **Simplify UI:** Use `ExcludeFields` to hide unused fields from the grouping bar
- **Consistent behavior:** Use global settings in `GroupingBarSettings` before field-specific settings
- **Testing:** Test field dragging, filtering, and sorting with actual data
- **Field naming:** Use clear, user-friendly captions in field definitions
