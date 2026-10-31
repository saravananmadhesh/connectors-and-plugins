# Filtering in ASP.NET MVC Grid

Filter grid data using filter bar, filter menu, or Excel-like filter UI. Enable with `AllowFiltering(true)`.

## When to Use This

Use this reference when you need to:
- Enable filtering on grid columns
- Choose between filter bar, menu, or Excel-like UI
- Configure filter operators and types
- Implement case-insensitive or diacritics-insensitive filtering
- Set initial filter state
- Handle filter events

## Table of Contents
- [Enable Filtering](#enable-filtering)
- [Filter Types](#filter-types)
- [Filter Bar (Default)](#filter-bar-default)
- [Filter Menu](#filter-menu)
- [Excel-Like Filter](#excel-like-filter)
- [Filter Operators](#filter-operators)
- [Disable Filtering for a Specific Column](#disable-filtering-for-a-specific-column)
- [Filter Programmatically](#filter-programmatically)
- [Initial Filter State](#initial-filter-state)
- [Filter Events](#filter-events)
- [Case-Insensitive / Diacritics](#case-insensitive--diacritics)

## Enable Filtering

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").Width("100").Add();
        col.Field("CustomerID").HeaderText("Customer").Width("150").Add();
        col.Field("Freight").HeaderText("Freight").Format("C2").Width("120").Add();
        col.Field("ShipCountry").HeaderText("Ship Country").Width("150").Add();
    })
    .AllowFiltering(true)
    .Render()
```

## Filter Types

Set `FilterSettings.Type` to change the filter UI:

| Type | Description |
|------|-------------|
| `FilterBar` (default) | Input boxes below each column header |
| `Menu` | Dropdown filter menu per column header |
| `Excel` | Excel-like checkbox filter with search |
| `CheckBox` | Checkbox list filter |

```cshtml
.AllowFiltering(true)
.FilterSettings(filter => filter.Type(Syncfusion.EJ2.Grids.FilterType.Excel))
```

## Filter Bar (Default)

Each column gets an input box under the header. Typing filters the column in real-time.

**Filter bar mode:** `Immediate` (default) or `OnEnter`

```cshtml
.FilterSettings(filter => filter.Mode(Syncfusion.EJ2.Grids.FilterBarMode.OnEnter))
```

**Show filter bar row always:**
```cshtml
.FilterSettings(filter => filter.ShowFilterBarStatus(true))
```

**Custom filter bar template for a column:**
```cshtml
col.Field("OrderID").FilterBarTemplate(new {
    create = "createFn", write = "writeFn"
}).Add();
```

## Filter Menu

Right-click or click column header for a filter popup.

```cshtml
.AllowFiltering(true)
.FilterSettings(filter => filter.Type(Syncfusion.EJ2.Grids.FilterType.Menu))
```

**Filter operators per type:**

| Column Type | Default Operator |
|-------------|-----------------|
| string | `startswith` |
| number | `equal` |
| date | `equal` |
| boolean | `equal` |

**Custom filter menu using template:**
```cshtml
col.Field("Freight").Filter(new {
    ui = new { create = "createFn", write = "writeFn", read = "readFn" }
}).Add();
```

## Excel-Like Filter

Provides a searchable checkbox list and condition-based filtering.

```cshtml
.AllowFiltering(true)
.FilterSettings(filter => filter.Type(Syncfusion.EJ2.Grids.FilterType.Excel))
```

Features:
- Checkbox list with **Select All**
- Search box to filter list items
- Diacritics-insensitive searching: `.FilterSettings(filter => filter.IgnoreAccent(true))`

## Filter Operators

Available operators:

| Operator | Applies To |
|----------|------------|
| `equal` | All types |
| `notequal` | All types |
| `startswith` | String |
| `endswith` | String |
| `contains` | String |
| `doesnotcontain` | String |
| `greaterthan` | Number, Date |
| `lessthan` | Number, Date |
| `greaterthanorequal` | Number, Date |
| `lessthanorequal` | Number, Date |

## Disable Filtering for a Specific Column

```cshtml
col.Field("OrderID").AllowFiltering(false).Add();
```

## Filter Programmatically

```javascript
var grid = document.getElementById('Grid').ej2_instances[0];
grid.filterByColumn('CustomerID', 'startswith', 'V');
grid.clearFiltering();                     // remove all filters
grid.clearFiltering(['CustomerID']);       // remove filter for one column
```

## Initial Filter State

Pre-apply filters when the grid loads:

```cshtml
.FilterSettings(filter => filter
    .Columns(col => {
        col.Field("CustomerID").MatchCase(false).Operator("startswith").Predicate("and").Value("V").Add();
    })
)
```

## Filter Events

```cshtml
.ActionBegin("onActionBegin")
.ActionComplete("onActionComplete")
```

```javascript
function onActionBegin(args) {
    if (args.requestType === 'filtering') {
        console.log('Filter applied:', args.currentFilteringColumn);
    }
}
```

## Case-Insensitive / Diacritics

```cshtml
.FilterSettings(filter => filter.IgnoreAccent(true))
```

For case-sensitive filtering, set `matchCase: true` on each filter column.
