# State Management — Syncfusion ASP.NET Core Grid

## Table of Contents
- [Enable State Persistence](#enable-state-persistence)
- [What State is Persisted](#what-state-is-persisted)
- [Restore Grid State](#restore-grid-state)
- [Reset Grid State](#reset-grid-state)
- [Custom State Persistence](#custom-state-persistence)

## When to Use This

- Persist grid state across sessions
- Save user preferences (column widths, sorting, filtering)
- Restore grid configuration on page reload
- Reset grid state to defaults
- Implement custom state management

---

## Enable State Persistence

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

Persist the grid's UI state (sorting, filtering, paging, grouping, column order/width/visibility) in `localStorage` across page reloads using `enablePersistence="true"`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          allowPaging="true" allowSorting="true" allowFiltering="true" allowGrouping="true"
          enablePersistence="true">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID" width="150"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

> The grid's `id` property is used as the `localStorage` key. Each grid instance must have a unique `id` for persistence to work correctly.

---

## What State is Persisted

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

When `enablePersistence` is `true`, the following are saved to `localStorage`:

| Feature | Persisted State |
|---|---|
| Paging | Current page, page size |
| Sorting | Sort columns and directions |
| Filtering | Applied filters |
| Grouping | Grouped columns |
| Column | Width, visibility, order, reorder position |
| Column chooser | Hidden/shown columns |

---

## Restore Grid State

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

The persisted state is automatically restored on the next page load. The grid reads from `localStorage` using the key `grid-{gridId}`.

Manually get saved state:
```javascript
var state = JSON.parse(localStorage.getItem('gridGrid')); // key = 'grid' + id
console.log(state);
```

---

## Reset Grid State

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

Clear the persisted state and reset the grid to its default configuration:

```javascript
var grid = document.getElementById('Grid').ej2_instances[0];

// Clear persistence storage
localStorage.removeItem('gridGrid'); // 'grid' + gridID

// Reload the page or refresh grid
location.reload();
```

Or programmatically reset all settings:
```javascript
grid.sortSettings.columns = [];
grid.filterSettings.columns = [];
grid.groupSettings.columns = [];
grid.pageSettings.currentPage = 1;
grid.refresh();
```

---

## Custom State Persistence

For custom or server-side state persistence, use `getPersistData()` to retrieve the current state as a JSON string:

```javascript
var grid = document.getElementById('Grid').ej2_instances[0];
var persistedState = grid.getPersistData();
// Send persistedState to server
fetch('/api/SaveGridState', {
    method: 'POST'
});
```

Restore from custom source:
```javascript
fetch('/api/GetGridState').then(res => res.json()).then(data => {
    var grid = document.getElementById('Grid').ej2_instances[0];
    grid.setProperties(JSON.parse(data.state));
});
```
