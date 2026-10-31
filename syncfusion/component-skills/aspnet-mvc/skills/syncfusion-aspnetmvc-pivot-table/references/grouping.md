# Grouping in ASP.NET MVC Pivot Table

## Table of Contents
- [Overview](#overview)
- [Enable Grouping](#enable-grouping)
- [Number Grouping](#number-grouping)
- [Date Grouping](#date-grouping)
- [Custom Grouping](#custom-grouping)
- [Best Practices](#best-practices)

## Overview

Grouping automatically organizes data into meaningful categories:

- **Number Grouping:** Organize values into ranges (e.g., 1-100, 101-200)
- **Date Grouping:** Group dates by year, quarter, month, day, hour, minute
- **Custom Grouping:** Manually define business categories (e.g., Electronics, Furniture)

**Important:** Grouping is applicable **only for relational data sources**, not OLAP data. This feature is particularly useful for large datasets to create hierarchical summaries and focus analysis.

## Enable Grouping

To enable grouping, set the `AllowGrouping` property to **true** and optionally configure `GroupSettings`:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").AllowGrouping(true).DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => {
            rows.Name("OrderDate").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Add();
        })
        .Values(values => {
            values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
        })).Height("450").Width("100%").Render()
```

With `AllowGrouping(true)`, users can:
- Right-click on any field header, and select **Group** to apply grouping through the UI dialog
- See the **Group** option in the context menu for both row and column headers
- Configure grouping options interactively without code

## Number Grouping

Organize numeric data into ranges and intervals.

**Group Numbers by Range:**

```html
@Html.EJS().PivotView("pivotview").AllowGrouping(true).DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => {
            rows.Name("ProductID").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Add();
        })
        .Values(values => {
            values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
        })
        .GroupSettings(groups => {
            // Group ProductID from 1001 to 1050 with interval of 10
            groups.Name("ProductID")
                .Type(Syncfusion.EJ2.PivotView.GroupType.Number)
                .StartingAt(1001)
                .EndingAt(1050)
                .RangeInterval(10)
                .Add();
        })).Height("450").Width("100%").Render()
```

**Result Groups:** 1001-1010, 1011-1020, 1021-1030, etc. (Values outside range grouped as "Out of Range")

**Age Ranges Example:**

```html
.GroupSettings(groups => {
    // Group age into 10-year intervals
    groups.Name("Age")
        .Type(Syncfusion.EJ2.PivotView.GroupType.Number)
        .StartingAt(0)
        .EndingAt(100)
        .RangeInterval(10)
        .Add();
})
```

**Result:** 0-9, 10-19, 20-29, ... 90-99, 100+

## Date Grouping

Group dates by different time intervals.

**Group by Month:**

```html
@Html.EJS().PivotView("pivotview")
    .AllowGrouping(true)
    .DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => {
            rows.Name("OrderDate").Add();
        })
        .Columns(columns => {
            columns.Name("Region").Add();
        })
        .Values(values => {
            values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
        })
        .GroupSettings(groups => {
            // Group dates by month - GroupInterval uses string values
            groups.Name("OrderDate")
                .Type(Syncfusion.EJ2.PivotView.GroupType.Date)
                .GroupInterval(@(new List<string>() { "Months" }))
                .Add();
        })).Height("450").Width("100%").Render()
```

**Result:** January 2024, February 2024, March 2024, ...

**Group by Quarter:**

```html
.GroupSettings(groups => {
    // Group dates by quarter
    groups.Name("OrderDate")
        .Type(Syncfusion.EJ2.PivotView.GroupType.Date)
        .GroupInterval(@(new List<string>() { "Quarters" }))
        .Add();
})
```

**Result:** Q1 2024, Q2 2024, Q3 2024, Q4 2024

**Group by Year:**

```html
.GroupSettings(groups => {
    // Group dates by year
    groups.Name("OrderDate")
        .Type(Syncfusion.EJ2.PivotView.GroupType.Date)
        .GroupInterval(@(new List<string>() { "Years" }))
        .Add();
})
```

**Result:** 2022, 2023, 2024

**Multiple Date Intervals (Hierarchical):**

```html
.GroupSettings(groups => {
    // Group by year → month hierarchy
    // Results in two new fields: Years (OrderDate), Months (OrderDate)
    groups.Name("OrderDate")
        .Type(Syncfusion.EJ2.PivotView.GroupType.Date)
        .GroupInterval(@(new List<string>() { "Years", "Months" }))
        .Add();
})
```

**Result:** 2024 > January, February ... 2025 > January, February ...

**Additional Hierarchical Options:**
- **Year + Quarter:** `@(new List<string>() { "Years", "Quarters" })` - For quarterly analysis
- **Year + Quarter + Month:** `@(new List<string>() { "Years", "Quarters", "Months" })` - For deep drill-down

**Date Grouping Interval Options:**

| String Value | Example Result | Use Case |
|----------|----------------|----------|
| "Years" | 2022, 2023, 2024 | Annual analysis |
| "Quarters" | Q1 2024, Q2 2024 | Quarterly reporting |
| "Months" | January 2024, February 2024 | Monthly trends |
| "Days" | 1 Jan 2024, 2 Jan 2024 | Daily analysis |
| "Hours" | 0:00-1:00, 1:00-2:00 | Hourly monitoring |
| "Minutes" | 0:00-1:00, 1:00-2:00 | Minute-level tracking |
| "Seconds" | For high-frequency data | Real-time analysis |

## Custom Grouping

Manually group string or numeric data into business categories.

### Creating Custom Groups Programmatically

**Group Products into Categories:**

```html
@Html.EJS().PivotView("pivotview")
    .AllowGrouping(true)
    .DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => {
            rows.Name("Products").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Add();
        })
        .Values(values => {
            values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
        })
        .GroupSettings(groups => {
            // Define custom grouping with Caption for field name
            groups.Name("Products")
                .Type("Custom")
                .Caption("Product Category")  // New field name in Pivot Table
                .CustomGroups(customgroup => {
                    // Group products under Electronics
                    customgroup.GroupName("Electronics")
                        .Items(@(new string[] { "Laptop", "Phone", "Tablet" }))
                        .Add();
                    // Group products under Furniture
                    customgroup.GroupName("Furniture")
                        .Items(@(new string[] { "Chair", "Table", "Desk" }))
                        .Add();
                    // Group products under Accessories
                    customgroup.GroupName("Accessories")
                        .Items(@(new string[] { "Mouse", "Keyboard", "Monitor" }))
                        .Add();
                })
                .Add();
        }))
    .Height("450")
    .Width("100%")
    .Render()
```

**Result Rows:** Electronics, Furniture, Accessories (instead of individual products)

**Key Properties:**
- **Name**: The source field to group (e.g., "Products")
- **Caption**: The display name for the new custom grouping field (e.g., "Product Category")
- **GroupName**: The display name for each group (e.g., "Electronics", "Furniture")
- **Items**: Array of member items to include in this group

### Nested Custom Grouping

You can apply custom grouping to an existing custom group, creating a hierarchical structure. For example, after grouping products into "Electronics", "Furniture", and "Accessories", you can further group these categories into "Indoor" and "Outdoor" sections.

**Group Regions into Geographical Clusters:**

```html
groups.Name("Region")
    .Type("Custom")
    .Caption("Geographical Region")  // Custom field name
    .CustomGroups(customgroup => {
        // North American cluster
        customgroup.GroupName("North America")
            .Items(@(new string[] { "USA", "Canada", "Mexico" }))
            .Add();
        // European cluster
        customgroup.GroupName("Europe")
            .Items(@(new string[] { "UK", "France", "Germany" }))
            .Add();
        // Asian cluster
        customgroup.GroupName("Asia")
            .Items(@(new string[] { "China", "Japan", "India" }))
            .Add();
    })
    .Add();
```

**Key Concept:**
- **Nested Grouping**: After applying the initial custom group, users can right-click on any group header (e.g., "North America") and apply another custom group to further categorize items
- **Field Naming**: Each nested level creates a new field (e.g., "Geographical Region", "Geographical Region 1", etc.)
- **Unlimited Levels**: You can create as many levels of custom grouping as needed for your analysis

## Best Practices

- **One grouping per field:** Apply only one grouping type to a field at a time (Number, Date, or Custom)
- **Number grouping:** Use for KPI ranges, age groups, sales brackets; set RangeInterval appropriately
- **Date grouping:** Use temporal analysis; start with Year, drill into Month; use `@(new List<string>() { "Years", "Months" })` for hierarchies
- **Custom grouping:** Use for business taxonomy (product categories, regions); include `.Caption()` to name the custom field properly
- **Hierarchical dates:** Use Year→Month or Year→Quarter for drill-down analysis; creates separate fields like "Years (Date)" and "Months (Date)"
- **Nested custom groups:** Apply custom grouping to existing custom groups for multiple hierarchy levels
- **GroupInterval format:** Always use string values ("Years", "Months", "Days", etc.) in GroupInterval, not enum types like GroupingDateType
- **Custom group properties:** Use `.Items()` with string arrays, not direct property assignment; wrap with `@(new string[] { ... })`
- **Range selection:** Use StartingAt and EndingAt for number/date grouping to define boundaries; items outside range appear under "Out of Range"
- **Performance:** Grouping is applied client-side; reasonable for typical datasets
- **Case-sensitivity:** Field names must match data exactly; Region vs region will not match
- **UI grouping:** Users can also right-click fields to apply grouping through context menu dialog
- **Ungroup functionality:** Users can right-click grouped headers and select Ungroup to revert to original data
- **Field visibility:** After ungrouping, if the source field is removed from the report, associated group fields are also removed
