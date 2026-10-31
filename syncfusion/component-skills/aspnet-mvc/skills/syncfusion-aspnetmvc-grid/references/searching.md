# Searching in ASP.NET MVC Grid

Search grid records in real time using the search toolbar item or programmatic API.

## When to Use This

Use this reference when you need to:
- Enable search functionality in the grid
- Configure search fields and operators
- Set initial search values
- Handle search events
- Implement case-insensitive searching

## Table of Contents
- [Enable Search](#enable-search)
- [Initial Search](#initial-search)
- [SearchSettings Properties](#searchsettings-properties)
- [Search Operators](#search-operators)
- [Programmatic Search](#programmatic-search)
- [Search Specific Columns](#search-specific-columns)
- [Search Events](#search-events)

## Enable Search

Add `"Search"` to the toolbar items:

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .AllowSearching(true)
    .Toolbar(new List<string> { "Search" })
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").Width("100").Add();
        col.Field("CustomerID").HeaderText("Customer").Width("150").Add();
        col.Field("ShipCity").HeaderText("Ship City").Width("150").Add();
    })
    .Render()
```

> A clear icon appears in the search box when focused or after typing — clicking it clears the search.

## Initial Search

Apply a search when the grid first loads using `SearchSettings`:

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .AllowSearching(true)
    .Toolbar(new List<string> { "Search" })
    .SearchSettings(search => search
        .Fields(new string[] { "CustomerID" })
        .Operator("contains")
        .Key("Ha")
        .IgnoreCase(true)
        .IgnoreAccent(true)
    )
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").Width("100").Add();
        col.Field("CustomerID").HeaderText("Customer").Width("150").Add();
    })
    .Render()
```

## SearchSettings Properties

| Property | Description |
|----------|-------------|
| `Fields(string[])` | Columns to search in (default: all bound columns) |
| `Operator(string)` | Search operator (default: `"contains"`) |
| `Key(string)` | Initial search value |
| `IgnoreCase(bool)` | Case-insensitive search (default: `true`) |
| `IgnoreAccent(bool)` | Ignore diacritic/accent characters (default: `false`) |

## Search Operators

| Operator | Description |
|----------|-------------|
| `startswith` | Values beginning with the search key |
| `endswith` | Values ending with the search key |
| `contains` (default) | Values containing the search key |
| `wildcard` | Pattern matching with `*` symbol |
| `like` | Pattern matching with `%` symbol |
| `equal` | Exact match |
| `notequal` | Values not equal to search key |

## Programmatic Search

Use the `search()` method to trigger a search:

```javascript
function searchGrid(term) {
    var grid = document.getElementById("Grid").ej2_instances[0];
    grid.search(term);
}
```

Clear search programmatically:

```javascript
function clearSearch() {
    var grid = document.getElementById("Grid").ej2_instances[0];
    grid.searchSettings.key = '';
}
```

## Search Specific Columns

Restrict search to specific fields by configuring `SearchSettings.Fields`:

```cshtml
.SearchSettings(search => search
    .Fields(new string[] { "CustomerID", "ShipCity", "ShipCountry" })
    .Operator("contains")
    .IgnoreCase(true)
)
```

## Search Events

| Event | Description |
|-------|-------------|
| `ActionBegin` | Fires before search (requestType: "searching") |
| `ActionComplete` | Fires after search results are displayed |

```javascript
function actionBegin(args) {
    if (args.requestType === 'searching') {
        console.log('Searching for:', args.searchString);
    }
}
```
