# Sorting in ASP.NET MVC Pivot Table

## Table of Contents
- [Overview](#overview)
- [Enable Sorting](#enable-sorting)
- [Member Sorting](#member-sorting)
- [Sort at Design-Time](#sort-at-design-time)
- [Multiple Sort Fields](#multiple-sort-fields)
- [Alphanumeric Sorting](#alphanumeric-sorting)
- [Custom Sort Order](#custom-sort-order)
- [Value Sorting](#value-sorting)
- [Multiple Axis Sorting](#multiple-axis-sorting)
- [Best Practices](#best-practices)

## Overview

Member sorting arranges field members (in rows and columns) in ascending or descending order. By default, sorting is enabled and field members are sorted in ascending order (A-Z, 0-9). Users can also change sort order through the Grouping Bar or Field List UI.

## Enable Sorting

Sorting is enabled by default through the `EnableSorting` property in `DataSourceSettings`. To control whether sorting is available:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .EnableSorting(true)
        .Rows(rows => {
            rows.Name("Country").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Add();
        })
        .Values(values => {
            values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
        }))
    .Height("450")
    .Width("100%")
    .Render()
```

**Important:** 
- By default, `EnableSorting` is **true**, allowing users to sort by clicking sort icons in the Grouping Bar or Field List
- If `EnableSorting` is set to **false**, field members will display in data source order and sort icons will be removed from the UI
- When `EnableSorting` is true, you can programmatically configure initial sort order using `SortSettings`

## Member Sorting

Sorting applies to dimension members in rows and columns. Key concepts:

- **Default:** Ascending order (A-Z, 0-9)
- **Configurable:** Use `SortSettings` to specify initial sort direction
- **UI:** Click sort icon in Grouping Bar to toggle sort direction  (when `EnableSorting` is true)
- **Multiple fields:** Each field can have independent sort order

## Sort at Design-Time

Use the fluent API pattern `.Name().Order().Add()`:

**Ascending Order (Default):**

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .EnableSorting(true)
        .Rows(rows => {
            rows.Name("Country").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Add();
        })
        .Values(values => {
            values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
        })
        .SortSettings(sorts => {
            sorts.Name("Country").Order(Sorting.Ascending).Add();
        }))
    .Height("450")
    .Width("100%")
    .Render()
```

**Descending Order:**

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .EnableSorting(true)
        .Rows(rows => {
            rows.Name("Country").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Add();
        })
        .Values(values => {
            values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
        })
        .SortSettings(sorts => {
            sorts.Name("Year").Order(Sorting.Descending).Add();  // Latest years first
        }))
    .Height("450")
    .Width("100%")
    .Render()
```

## Multiple Sort Fields

Apply different sort orders to multiple fields:

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .EnableSorting(true)
        .Rows(rows => {
            rows.Name("Country").Add();
            rows.Name("Product").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Add();
        })
        .Values(values => {
            values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
        })
        .SortSettings(sorts => {
            // Sort countries A-Z
            sorts.Name("Country").Order(Sorting.Ascending).Add();
            
            // Sort years newest first
            sorts.Name("Year").Order(Sorting.Descending).Add();
            
            // Sort products A-Z
            sorts.Name("Product").Order(Sorting.Ascending).Add();
        }))
    .Height("450")
    .Width("100%")
    .Render()
```

## Alphanumeric Sorting

By default, field members are sorted alphabetically (A-Z). To enable numeric sorting based on numbers at the beginning of member names, set the `DataType` property to **number** for the specific field.

**Use Case:** Members like '71-AJ', '209-FB', '36-SW' should sort numerically (36-SW, 71-AJ, 209-FB) instead of alphabetically (209-FB, 36-SW, 71-AJ).

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .EnableSorting(true)
        .Rows(rows => {
            rows.Name("ProductID").DataType("number").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Add();
        })
        .Values(values => {
            values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
        }))
    .Height("450")
    .Width("100%")
    .Render()
```

**Key Points:**
- `DataType("number")` enables numeric sorting on the member names
- Sorts numbers at the beginning of strings in numerical order
- Applies to dimension fields in rows or columns
- Default is alphabetical sorting (DataType not specified or set to "string")

## Custom Sort Order

Arrange members in a specific order independent of alphabet/numeric order:

**Use Case:** Quarters (Q1, Q2, Q3, Q4) or fiscal periods with non-alphabetic sequence

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => {
            rows.Name("Quarter").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Add();
        })
        .Values(values => {
            values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
        })
        .SortSettings(sorts => {
            // Custom order: Q1, Q2, Q3, Q4
            sorts.Name("Quarter")
                .Order(Sorting.Custom)
                .MembersOrder(new[] { "Q1", "Q2", "Q3", "Q4" })
                .Add();
        }))
    .Height("450")
    .Width("100%")
    .Render()
```

**Another Example:** Regions in priority order

```html
.SortSettings(sorts => {
    // Custom order: USA (high priority), Canada, Mexico
    sorts.Name("Region")
        .Order(Sorting.Custom)
        .MembersOrder(new[] { "USA", "Canada", "Mexico" })
        .Add();
})
```

**Important:** All members that appear in data must be included in `MembersOrder` array. Missing members may not display.

## Value Sorting

Sort aggregated values (not dimension members) across rows or columns by clicking value field headers. Enable using `EnableValueSorting` property.

### Enable Value Sorting

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => {
            rows.Name("Country").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Add();
        })
        .Values(values => {
            values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
        }))
    .EnableValueSorting(true)  // Enable value sorting
    .Height("450")
    .Width("100%")
    .Render()
```

**When Enabled:**
- Users can click value field headers to sort
- Works on column axis by default
- Place value fields in row axis for row-wise sorting

### Configure Value Sorting Programmatically

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => {
            rows.Name("Country").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Add();
        })
        .Values(values => {
            values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
        }))
    .EnableValueSorting(true)
    .ValueSortSettings(vs => vs
        .HeaderText("2024-Sales")      // Sort by this column header
        .HeaderDelimiter("-")           // Delimiter between hierarchy levels
        .SortOrder(Sorting.Descending) // Sort order
    )
    .Height("450")
    .Width("100%")
    .Render()
```

**Configuration Properties:**
- `HeaderText` - Hierarchical column header path (e.g., "2024-Sales", "2023-Profit")
- `HeaderDelimiter` - Separator between header levels (e.g., "-", "|", "~")
- `SortOrder` - Sort direction (Ascending or Descending)

## Multiple Axis Sorting

Sort value fields simultaneously in both row and column axes for flexible data analysis. **Available only for relational data sources with client-side engine.**

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => {
            rows.Name("Country").Add();
            rows.Name("Products").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Add();
        })
        .Values(values => {
            values.Name("Amount").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
            values.Name("Quantity").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
        }))
    .EnableValueSorting(true)
    .ValueSortSettings(vs => vs
        .ColumnHeaderText("2024~Amount")        // Column hierarchy to sort
        .ColumnSortOrder(Sorting.Descending)   // Column sort direction
        .RowHeaderText("USA")                  // Row to sort against
        .RowSortOrder(Sorting.Descending)      // Row sort direction
        .HeaderDelimiter("~")                  // Delimiter between levels
    )
    .Height("450")
    .Width("100%")
    .Render()
```

**Multiple Axis Configuration:**
- `ColumnHeaderText` - Column header hierarchy (e.g., "2024~Amount", "2023~Quantity")
- `ColumnSortOrder` - Sort direction for column axis (Ascending/Descending)
- `RowHeaderText` - Specific row header to sort by (e.g., "USA", "Product A")
- `RowSortOrder` - Sort direction for row axis (Ascending/Descending)
- `HeaderDelimiter` - Separator between hierarchy levels

**Use Cases:**
- Compare sales across years with different sort orders per axis
- Analyze regional performance with ascending/descending by measure
- Multi-level hierarchical sorting with custom delimiters

## Best Practices

- **Alphabetic fields:** Use ascending (A-Z) for country, product names
- **Numeric fields:** Use descending for sales, quantity to show top values first
- **Date fields:** Use descending to show newest dates first
- **Alphanumeric members:** Apply `DataType("number")` for fields like "71-AJ", "209-FB"
- **Custom order:** Use for non-standard sequences (fiscal quarters, priority regions)
- **Value sorting:** Click headers to sort aggregated values; enable with `EnableValueSorting(true)`
- **Multiple axis:** Use `ColumnHeaderText` and `RowHeaderText` for independent axis sorting
- **Performance:** Sorting is applied on client-side; enable Grouping Bar for user control
- **Field names case-sensitive:** Names in SortSettings must match data field names exactly
- **Consistency:** Apply consistent sort order across same field in different table sections
- **Delimiters:** Use clear delimiters ("-", "~", "|") for multi-level header hierarchies
