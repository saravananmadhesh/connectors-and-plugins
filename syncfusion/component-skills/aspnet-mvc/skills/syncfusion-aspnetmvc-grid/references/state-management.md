# State Management in ASP.NET MVC Grid

Persist grid state (sorting, filtering, grouping, paging, column order) across browser refreshes.

## When to Use This

Use this reference when you need to:
- Save and restore grid state across page reloads
- Enable localStorage persistence
- Get current grid state data
- Restore specific saved states
- Handle version-based state management

## Table of Contents
- [Enable State Persistence](#enable-state-persistence)
- [Persisted Settings](#persisted-settings)
- [Get Persisted State Data](#get-persisted-state-data)
- [Set/Restore State](#setrestore-state)
- [Save and Restore to Previous State](#save-and-restore-to-previous-state)
- [Reset Grid to Initial State](#reset-grid-to-initial-state)
- [Version-Based Persistence](#version-based-persistence)
- [Maintain Custom Query Params with Persistence](#maintain-custom-query-params-with-persistence)
- [localStorage Key Format](#localstorage-key-format)

## Enable State Persistence

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .EnablePersistence(true)
    .AllowPaging(true)
    .AllowSorting(true)
    .AllowFiltering(true)
    .AllowGrouping(true)
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").IsPrimaryKey(true).Width("120").Add();
        col.Field("CustomerID").HeaderText("Customer").Width("150").Add();
        col.Field("Freight").HeaderText("Freight").Format("C2").Width("120").Add();
    })
    .Render()
```

State is saved to `localStorage` using key: `grid{ComponentID}` (e.g., `gridGrid`).

## Persisted Settings

| Setting | Persisted Properties |
|---------|---------------------|
| `PageSettings` | CurrentPage, PageCount, PageSize, PageSizes, TotalRecordsCount |
| `GroupSettings` | Columns, ShowDropArea, ShowGroupedColumn, EnableLazyLoading, etc. |
| `Columns` | Width, Visible, Index, SortDirection, AllowFiltering, AllowSorting, etc. |
| `SortSettings` | All sort configuration |
| `FilterSettings` | All filter configuration |
| `SearchSettings` | All search configuration |
| `SelectedRowIndex` | Last selected row index |

**NOT persisted:** Template, Format, TextAlign, ValidationRules, HeaderText, EditType, etc.

## Get Persisted State Data

Retrieve the current state as a JSON string:

```javascript
function getCurrentState() {
    var grid = document.getElementById("Grid").ej2_instances[0];
    var stateJson = grid.getPersistData();
    console.log(stateJson);
    return stateJson;
}
```

## Set/Restore State

Restore a previously saved state using `setProperties`:

```javascript
function restoreState(savedState) {
    var grid = document.getElementById("Grid").ej2_instances[0];
    grid.setProperties(JSON.parse(savedState));
}
```

## Save and Restore to Previous State

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

Manually save state to localStorage and restore on demand:

```javascript
// Save current state
function saveState() {
    var grid = document.getElementById("Grid").ej2_instances[0];
    window.localStorage.setItem('savedGridState', grid.getPersistData());
    alert('State saved!');
}

// Restore saved state
function restoreState() {
    var grid = document.getElementById("Grid").ej2_instances[0];
    var savedState = window.localStorage.getItem('savedGridState');
    if (savedState) {
        grid.setProperties(JSON.parse(savedState));
    }
}
```

## Reset Grid to Initial State

### Method 1: Clear localStorage

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

```javascript
function resetGrid() {
    var grid = document.getElementById("Grid").ej2_instances[0];
    var storageKey = 'grid' + grid.element.id;
    window.localStorage.removeItem(storageKey);
    window.location.reload();  // reload to apply default state
}
```

### Method 2: Change Component ID

Changing the grid's ID causes it to load a fresh state (since state is keyed by ID):

```javascript
function resetWithNewId() {
    var grid = document.getElementById("Grid").ej2_instances[0];
    grid.element.id = 'GridNew';  // change ID to use a fresh state key
    window.location.reload();
}
```

## Version-Based Persistence

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

Save and restore multiple named state versions:

```javascript
// Save current state as version "v1"
function saveVersion(version) {
    var grid = document.getElementById("Grid").ej2_instances[0];
    window.localStorage.setItem('gridState_' + version, grid.getPersistData());
}

// Restore a specific version
function restoreVersion(version) {
    var grid = document.getElementById("Grid").ej2_instances[0];
    var state = window.localStorage.getItem('gridState_' + version);
    if (state) {
        grid.setProperties(JSON.parse(state));
    }
}
```

## Maintain Custom Query Params with Persistence

When using `EnablePersistence`, custom query params are cleared on each page load. Re-apply them in `ActionBegin`:

```javascript
function actionBegin(args) {
    if (args.requestType === 'paging' || args.requestType === 'sorting') {
        var grid = document.getElementById("Grid").ej2_instances[0];
        grid.query.addParams('CustomParam', 'CustomValue');
    }
}
```

## localStorage Key Format

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

The storage key follows the pattern: `grid{ComponentID}`

```javascript
// For grid with id="OrderGrid"
var storageKey = 'gridOrderGrid';
var persistedData = window.localStorage.getItem(storageKey);
console.log(persistedData);  // JSON string of grid state
```
