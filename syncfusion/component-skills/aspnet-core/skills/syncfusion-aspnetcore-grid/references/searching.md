# Searching — Syncfusion ASP.NET Core Grid

## Table of Contents
- [Enable Search Toolbar](#enable-search-toolbar)
- [Search Settings](#search-settings)
- [Search by Specific Columns](#search-by-specific-columns)
- [Programmatic Search](#programmatic-search)
- [Clear Search](#clear-search)
- [Search Events](#search-events)

## When to Use This

- Enable full-text search across grid data
- Add search toolbar to grid
- Filter by specific columns
- Implement programmatic search
- Handle search events

---

## Enable Search Toolbar

Add `Search` to the toolbar to display a search input box:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          toolbar="@(new List<string>() { "Search" })">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID" width="150"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

---

## Search Settings

Configure search behavior with `<e-grid-searchsettings>`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          toolbar="@(new List<string>() { "Search" })">
    <e-grid-searchsettings ignoreCase="true" operator="contains"></e-grid-searchsettings>
</ejs-grid>
```

| Property | Type | Description |
|---|---|---|
| `fields` | string[] | Columns to search in (default: all) |
| `operator` | string | `contains`, `startswith`, `endswith`, `equal`, `notequal` |
| `ignoreCase` | boolean | Case-insensitive search (default: `true`) |
| `ignoreAccent` | boolean | Ignore diacritical marks |
| `key` | string | Initial search term on load |

---

## Search by Specific Columns

Limit search to specific fields using `fields`:

```cshtml
<e-grid-searchsettings fields="@(new string[] { "CustomerID", "ShipCity" })" operator="startswith"></e-grid-searchsettings>
```

---

## Programmatic Search

Use the `search()` method to trigger search from external input:

```javascript
var grid = document.getElementById('Grid').ej2_instances[0];
grid.search('London');
```

Example with external text box:
```javascript
document.getElementById('searchBtn').onclick = function() {
    var searchVal = document.getElementById('searchInput').value;
    document.getElementById('Grid').ej2_instances[0].search(searchVal);
};
```

---

## Clear Search

Clear the current search term:

```javascript
var grid = document.getElementById('Grid').ej2_instances[0];
grid.searchSettings.key = '';
```

Or call:
```javascript
grid.search('');
```

---

## Search Events

Detect search via `actionBegin` / `actionComplete` with `requestType === 'searching'`:

```javascript
function actionBegin(args) {
    if (args.requestType === 'searching') {
        console.log('Search term:', args.searchString);
    }
}

function actionComplete(args) {
    if (args.requestType === 'searching') {
        console.log('Search complete, rows:', args.rows.length);
    }
}
```
