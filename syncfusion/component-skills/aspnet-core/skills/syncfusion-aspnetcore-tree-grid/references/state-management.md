# State Management — Syncfusion ASP.NET Core TreeGrid

## Table of Contents
- [Enable State Persistence](#enable-state-persistence)
- [What State is Persisted](#what-state-is-persisted)
- [Restore TreeGrid State](#restore-treegrid-state)
- [Reset TreeGrid State](#reset-treegrid-state)
- [Expand/Collapse State Persistence](#expandcollapse-state-persistence)
- [Custom State Persistence](#custom-state-persistence)

## When to Use This

- Persist TreeGrid state across sessions (sorting, filtering, expand/collapse state)
- Save user preferences (column widths, sort order, filter criteria, row expansion)
- Restore TreeGrid configuration on page reload
- Reset TreeGrid state to defaults
- Implement custom state management with expand/collapse hierarchy preservation
- Remember user's last viewed hierarchy state

---

## Enable State Persistence

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

Persist the TreeGrid's UI state (sorting, filtering, paging, expand/collapse state, column order/width/visibility) in `localStorage` across page reloads using `enablePersistence="true"`:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.TreeData"
              childMapping="Children" treeColumnIndex="1"
              allowPaging="true" allowSorting="true" allowFiltering="true"
              enablePersistence="true">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" isPrimaryKey="true" width="100"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" width="100"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

> The TreeGrid's `id` property is used as the `localStorage` key. Each TreeGrid instance must have a unique `id` for persistence to work correctly.

---

## What State is Persisted

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

When `enablePersistence` is `true`, the following are saved to `localStorage`:

| Feature | Persisted State |
|---|---|
| Paging | Current page, page size |
| Sorting | Sort columns and directions |
| Filtering | Applied filters |
| Expand/Collapse | Parent row expanded/collapsed state |
| Column | Width, visibility, order, reorder position |
| Column chooser | Hidden/shown columns |
| Selection | Selected row/cell state |

---

## Restore TreeGrid State

The persisted state is automatically restored on the next page load. The TreeGrid reads from `localStorage` using the key `treegrid-{treeGridId}`.

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

Manually retrieve saved state:

```javascript
var state = JSON.parse(localStorage.getItem('treegridTreeGrid')); // key = 'treegrid' + id
console.log(state);
```

Verify persistence is working:

```javascript
var treeGrid = document.getElementById('TreeGrid').ej2_instances[0];
console.log('Persistence enabled:', treeGrid.enablePersistence);
console.log('Saved state:', localStorage.getItem('treegridTreeGrid'));
```

---

## Reset TreeGrid State

Clear the persisted state and reset the TreeGrid to its default configuration:

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

```javascript
var treeGrid = document.getElementById('TreeGrid').ej2_instances[0];

// Clear persistence storage
localStorage.removeItem('treegridTreeGrid'); // 'treegrid' + treeGridID

// Reload the page or refresh TreeGrid
location.reload();
```

Or programmatically reset all settings while keeping the data:

```javascript
var treeGrid = document.getElementById('TreeGrid').ej2_instances[0];

// Clear all filters
treeGrid.filterSettings.columns = [];

// Clear all sorts
treeGrid.sortSettings.columns = [];

// Reset to first page
treeGrid.pageSettings.currentPage = 1;

// Collapse all expanded rows (optional)
treeGrid.collapseAll();

// Refresh the TreeGrid
treeGrid.refresh();
```

---

## Expand/Collapse State Persistence

The expand/collapse state of parent rows is preserved automatically when `enablePersistence="true"`. When users expand or collapse parent rows and then reload the page, their hierarchy state is restored.

**Preserve Hierarchy on Page Reload:**

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.TreeData"
              childMapping="Children" treeColumnIndex="1"
              enablePersistence="true"
              allowPaging="true">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" isPrimaryKey="true" width="100"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

**Get Current Expand State Programmatically:**

```javascript
var treeGrid = document.getElementById('TreeGrid').ej2_instances[0];

// Get all expanded row indices
var expandedindexes = treeGrid.getExpandedRowIndexes();
console.log('Currently expanded rows:', expandedindexes);

// Get expand state for a specific row
var rowData = treeGrid.getRowByIndex(1); // Get row at index 1
console.log('Row data:', rowData);
```

**Manually Set Expand State:**

```javascript
var treeGrid = document.getElementById('TreeGrid').ej2_instances[0];

// Expand all rows
treeGrid.expandAll();

// Collapse all rows
treeGrid.collapseAll();

// Expand specific row by index
treeGrid.expand(1);  // Expand row at index 1

// Collapse specific row by index
treeGrid.collapse(1); // Collapse row at index 1

// Expand rows by IDs (if using idMapping)
treeGrid.expand([1, 2, 3]); // Expand multiple rows
```

---

## Custom State Persistence

For custom or server-side state persistence that includes expand/collapse state, use `getPersistData()` to retrieve the current state and manually save hierarchy information:

**Save State to Server:**

```javascript
var treeGrid = document.getElementById('TreeGrid').ej2_instances[0];

// Get all TreeGrid state
var persistedState = treeGrid.getPersistData();

// Get expand state separately
var expandedRows = treeGrid.getExpandedRowIndexes();

// Combine states
var customState = {
    gridState: persistedState,
    expandedRows: expandedRows
};

// Send to server
fetch('/api/SaveTreeGridState', {
    method: 'POST'
}).then(res => res.json()).then(data => {
    console.log('State saved:', data);
});
```

**Restore State from Server:**

```javascript
fetch('/api/GetTreeGridState').then(res => res.json()).then(data => {
    var treeGrid = document.getElementById('TreeGrid').ej2_instances[0];
    
    // Restore grid state
    treeGrid.setProperties(JSON.parse(data.gridState));
    
    // Restore expand state
    if (data.expandedRows && data.expandedRows.length > 0) {
        treeGrid.expand(data.expandedRows);
    }
});
```

**Server-Side Example (C# Controller):**

```csharp
[HttpPost]
public IActionResult SaveTreeGridState([FromBody] StateModel state)
{
    // Save to database or session
    HttpContext.Session.SetString("TreeGridState", state.GridState);
    HttpContext.Session.SetString("ExpandedRows", JsonConvert.SerializeObject(state.ExpandedRows));
    
    return Ok(new { message = "State saved successfully" });
}

[HttpGet]
public IActionResult GetTreeGridState()
{
    var gridState = HttpContext.Session.GetString("TreeGridState");
    var expandedRows = HttpContext.Session.GetString("ExpandedRows");
    
    return Ok(new { gridState, expandedRows });
}

public class StateModel
{
    public string GridState { get; set; }
    public int[] ExpandedRows { get; set; }
}
```

---

## Best Practices for State Persistence

1. **Unique TreeGrid IDs**: Ensure each TreeGrid has a unique `id` for proper state isolation
2. **Session Management**: Use server-side persistence for sensitive data or large state objects
3. **Hierarchy Preservation**: Test that expand/collapse state is correctly restored with nested data
4. **Clearing Old State**: Provide a "Reset View" button to clear persistence when needed
5. **Performance Considerations**: Large datasets with many expanded rows may impact localStorage size limits
6. **Storage Limits**: localStorage typically has a 5-10MB limit per domain; monitor usage
7. **Version Compatibility**: When changing data structure, clear cached state to prevent errors

---

## Example: TreeGrid with Persistence Reset Button

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

```cshtml
<div style="margin-bottom: 20px;">
    <button type="button" onclick="resetTreeGridState()" class="e-btn e-primary">
        Reset Grid View
    </button>
</div>

<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.TreeData"
              childMapping="Children" treeColumnIndex="1"
              allowSorting="true" allowFiltering="true" allowPaging="true"
              enablePersistence="true">
    <e-treegrid-pagesettings pageSize="10"></e-treegrid-pagesettings>
    <e-treegrid-filtersettings type="Excel" hierarchyMode="Parent"></e-treegrid-filtersettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" isPrimaryKey="true" width="100"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="StartDate" headerText="Start Date" type="date" format="yMd" width="120"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" width="100"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function resetTreeGridState() {
        var treeGrid = document.getElementById('TreeGrid').ej2_instances[0];
        
        // Confirm reset
        if (confirm('Clear all filters, sorts, and expand states?')) {
            // Clear localStorage
            localStorage.removeItem('treegridTreeGrid');
            
            // Reset in-memory state
            treeGrid.filterSettings.columns = [];
            treeGrid.sortSettings.columns = [];
            treeGrid.pageSettings.currentPage = 1;
            treeGrid.collapseAll();
            
            // Refresh
            treeGrid.refresh();
            
            alert('TreeGrid view has been reset');
        }
    }
</script>
```

> Use state persistence to improve user experience by remembering their preferences and navigation state. Always test with realistic data hierarchies to ensure expand/collapse state is properly saved and restored.
