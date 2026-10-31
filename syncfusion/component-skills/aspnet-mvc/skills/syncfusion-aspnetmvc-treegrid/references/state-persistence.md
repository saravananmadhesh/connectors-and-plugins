# State Persistence in Tree Grid

## Table of Contents
- [When to Use This](#when-to-use-this)
- [Enable Persistence](#enable-persistence)
- [Persisted Properties](#persisted-properties)
- [State Management](#state-management)
- [Exclude Properties from Persistence](#exclude-properties-from-persistence)
- [Persistence Events](#persistence-events)
- [Use Cases](#use-cases)

## When to Use This

Use state persistence when you need to:
- Remember user's grid configuration across browser sessions
- Preserve filters, sorting, and paging state after page refresh
- Maintain column order, width, and visibility preferences
- Save selected rows or search terms
- Create a personalized user experience

## Enable Persistence

### Basic State Persistence

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .EnablePersistence(true)           // Save state to localStorage
    .ChildMapping("Children")
    .AllowPaging(true)
    .AllowSorting(true)
    .AllowFiltering(true)
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Width("80").Add();
        col.Field("TaskName").HeaderText("Task").Width("200").Add();
        col.Field("Status").HeaderText("Status").Width("120").Add();
    })
    .Render()
```

When persistence is enabled, grid state is automatically saved to browser localStorage.

## Persisted Properties

Tree Grid saves these properties:

- **Columns:** Reordering, resizing, visibility, sorting
- **Paging:** Current page, page size
- **Filtering:** Active filters
- **Sorting:** Sort columns and direction
- **Selection:** Selected rows and cells
- **Grouping:** Grouped columns
- **Search:** Search keyword

## State Management

### Manual Get/Set State

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

```html
<button onclick="saveState()">Save State</button>
<button onclick="restoreState()">Restore State</button>
<button onclick="clearState()">Clear State</button>

<script>
function saveState() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    var state = JSON.stringify(grid.getCurrentStateData());
    localStorage.setItem('treegridState', state);
    console.log("State saved to localStorage");
}

function restoreState() {
    var savedState = localStorage.getItem('treegridState');
    if (savedState) {
        var grid = document.getElementById('TreeGrid').ej2_instances[0];
        grid.restoreState(JSON.parse(savedState));
        console.log("State restored from localStorage");
    }
}

function clearState() {
    localStorage.removeItem('treegridState');
    console.log("State cleared");
}
</script>
```

### Get Current State

```html
<button onclick="showState()">Show Current State</button>

<script>
function showState() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    var state = grid.getCurrentStateData();
    
    console.log("Current Page: " + state.pageSettings.currentPage);
    console.log("Page Size: " + state.pageSettings.pageSize);
    console.log("Sorted Columns: " + JSON.stringify(state.sortSettings.columns));
    console.log("Filters: " + JSON.stringify(state.filterSettings.filterBardropdownList));
    
    // Display in UI
    document.getElementById('stateInfo').innerText = JSON.stringify(state, null, 2);
}
</script>
```

## Exclude Properties from Persistence

### Don't Persist Specific Properties

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .EnablePersistence(true)
    .ActionBegin("beforePersist")
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
    })
    .Render()

<script>
function beforePersist(args) {
    if (args.requestType === 'getPersistData') {
        // Clear fields that shouldn't be persisted
        delete args.persistedData.selectedRowIndexes;
        delete args.persistedData.selectedCellIndexes;
        
        // Keep only paging and sorting
        var simplified = {
            pageSettings: args.persistedData.pageSettings,
            sortSettings: args.persistedData.sortSettings
        };
        
        args.persistedData = simplified;
    }
}
</script>
```

## Persistence Events

### ActionBegin - Before Persistence

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .EnablePersistence(true)
    .ActionBegin("onPersistBegin")
    .Render()

<script>
function onPersistBegin(args) {
    if (args.requestType === 'getPersistData') {
        console.log("Saving state to localStorage");
    }
}
</script>
```

### ActionComplete - After Persistence

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .EnablePersistence(true)
    .ActionComplete("onPersistComplete")
    .Render()

<script>
function onPersistComplete(args) {
    if (args.requestType === 'afterStateRestore') {
        console.log("State restored from localStorage");
    }
}
</script>
```

## Use Cases

### Case 1: User-Friendly Page Refresh

```csharp
// Controller
public IActionResult Index()
{
    var data = GetTreeGridData();
    return View(data);
}

// View with persistence
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .EnablePersistence(true)
    .AllowPaging(true)
    .AllowSorting(true)
    .AllowFiltering(true)
    .Render()
```

**Result:** When user: 1. Filters data, sorts by status, goes to page 3
2. Refreshes the browser
3. Grid returns to page 3 with same filters and sorting

### Case 2: Custom Export with State

```html
<button onclick="exportWithState()">Export Current State</button>

<script>
function exportWithState() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    var state = grid.getCurrentStateData();
    
    // Send state to server for report generation
    fetch('/api/export', {
        method: 'POST'
    })
    .then(r => r.blob())
    .then(blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'report.xlsx';
        a.click();
    });
}
</script>
```

### Case 3: Reset to Default State

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

```html
<button onclick="resetToDefault()">Reset Grid</button>

<script>
function resetToDefault() {
    localStorage.removeItem('treegridTreeGrid');  // treegridTreeGrid is default key
    location.reload();
}
</script>
```
