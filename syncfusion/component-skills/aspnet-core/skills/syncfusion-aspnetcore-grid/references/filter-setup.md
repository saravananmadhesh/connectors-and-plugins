# Filter Setup and Configuration in ASP.NET Core Grid

## Table of Contents
- [Setup Filtering Module](#setup-filtering-module)
- [Enable Filtering](#enable-filtering)
- [Filter Types Overview](#filter-types-overview)
- [Disable Filtering for Columns](#disable-filtering-for-columns)
- [Quick Reference](#quick-reference)

---

## Setup Filtering Module

Filtering is built-in and always available. Just enable it with the `allowFiltering` property:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowFiltering="true">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="100"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer" width="120"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" format="C2" width="100"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

---

## Enable Filtering

Set `allowFiltering="true"` on the Grid component to activate filtering UI. Configure behavior via `<e-grid-filterSettings>`.

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" 
          allowFiltering="true"
          allowPaging="true"
          allowSorting="true">
    <e-grid-filterSettings type="FilterBar" mode="Immediate"></e-grid-filterSettings>
    <e-grid-pageSettings pageSize="12"></e-grid-pageSettings>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="100"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer" width="120"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" format="C2" width="100"></e-grid-column>
        <e-grid-column field="OrderDate" headerText="Order Date" type="date" format="yMd" width="130"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

---

## Filter Types Overview

Choose a filter type based on your use case:

| Type | UI | Best For |
|------|-----|----------|
| **FilterBar** | Inline input cells | Quick text search, simple queries |
| **Menu** | Dropdown dialog with operators | Complex conditions, typed data, power users |
| **Excel** | Checkbox list | Large categorical data, multi-select |

### FilterBar (Default)

Inline filter inputs in each column header:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowFiltering="true">
    <e-grid-filterSettings type="FilterBar" mode="Immediate"></e-grid-filterSettings>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

**Filter Operators (FilterBar):**
- `=` Equals
- `!=` Not equals
- `>` Greater than
- `<` Less than
- `*` Starts with
- `%` Ends with

### Menu Filter

Dropdown with operators and a text/date picker:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowFiltering="true">
    <e-grid-filterSettings type="Menu"></e-grid-filterSettings>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" type="number"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer" type="string"></e-grid-column>
        <e-grid-column field="OrderDate" headerText="Order Date" type="date"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

**Menu Operators by Type:**
- **String**: startswith, endswith, contains, equal, notequal, doesnotstartwith, doesnotendwith, doesnotcontain
- **Number**: equal, notequal, lessthan, lessthanorequal, greaterthan, greaterthanorequal
- **Date**: equal, notequal, lessthan, lessthanorequal, greaterthan, greaterthanorequal

### Excel Filter

Checkbox list for multi-select filtering:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowFiltering="true">
    <e-grid-filterSettings type="Excel"></e-grid-filterSettings>
    <e-grid-columns>
        <e-grid-column field="Status" headerText="Status"></e-grid-column>
        <e-grid-column field="Region" headerText="Region"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

---

## Disable Filtering for Columns

Prevent filtering on specific columns:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowFiltering="true">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" allowFiltering="false"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer" allowFiltering="true"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" allowFiltering="true"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

---

## Quick Reference

### Immediate vs OnEnter Mode

```cshtml
<!-- Filter as you type (default) -->
<e-grid-filterSettings type="FilterBar" mode="Immediate"></e-grid-filterSettings>

<!-- Filter on Enter key press (better for performance) -->
<e-grid-filterSettings type="FilterBar" mode="OnEnter"></e-grid-filterSettings>
```

### Reset/Clear Filters

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowFiltering="true">
    <e-grid-columns>
        <!-- columns -->
    </e-grid-columns>
</ejs-grid>

<button onclick="clearFilters()">Clear Filters</button>

<script>
function clearFilters() {
    var grid = document.getElementById('Grid').ej2_instances[0];
    grid.clearFiltering();
}
</script>
```

### Programmatic Filtering

```cshtml
<script>
var grid = document.getElementById('Grid').ej2_instances[0];

// Filter by single column
grid.filterByColumn('Freight', 'greaterThan', 100);

// Filter by multiple columns
grid.filterByColumn('OrderID', 'equal', 10248);
grid.filterByColumn('CustomerID', 'startswith', 'VIN');

// Clear all filters
grid.clearFiltering();
</script>
```

---

## Best Practices

1. **Choose appropriate filter type**: FilterBar for simplicity, Menu for complex conditions, Excel for large categorical data
2. **Use OnEnter mode for large datasets**: Reduces performance impact
3. **Disable unnecessary filters**: Remove filter capability from read-only or non-searchable columns
4. **Provide clear placeholders**: Set meaningful placeholder text for filter inputs
5. **Consider server-side filtering**: For very large remote datasets, filter on the server
6. **Combine filter types**: You can use different filter types for different columns if needed
7. **Clear filters on demand**: Provide a clear/reset button for user convenience
