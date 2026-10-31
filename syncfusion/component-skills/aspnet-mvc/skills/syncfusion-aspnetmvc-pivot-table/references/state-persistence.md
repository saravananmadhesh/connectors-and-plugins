# State Persistence in ASP.NET MVC Pivot Table

## Overview

State persistence automatically saves the pivot table configuration to browser **local storage**, allowing users to retain their field arrangements, sorting, filters, and expand/collapse states. When users return to the page, the pivot table restores their previous configuration automatically.

## Enable State Persistence

Use the `EnablePersistence` property to automatically save and restore state:

```csharp
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).EnablePersistence(true).Width("100%").Height("450").Render()
```

## Automatic Persistence

When `EnablePersistence(true)` is set, the following states are saved automatically:
- **Field Arrangement** - Rows, Columns, Values, Filters configuration
- **Sorting** - Sort order applied to fields
- **Filters** - Selected member values from filters
- **Expand/Collapse** - Expanded or collapsed row/column states
- **Custom Aggregations** - Aggregation type changes by users

State is saved automatically whenever these operations are performed, and restored when the page reloads or user returns.

## Save and Load Pivot Layout

Beyond automatic persistence, you can manually save and restore the pivot table state using `getPersistData()` and `loadPersistData()` methods for custom workflows.

### Get Persist Data

Use `getPersistData()` to retrieve the current state as a JSON string:

```csharp
@Html.EJS().PivotView("PivotView").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .ExpandAll(false)
        .Rows(rows => rows.Name("Country").Add())
        .Columns(columns => columns.Name("Year").Caption("Year").Add())
        .Values(values => values.Name("Sold").Caption("Units Sold").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add()).ShowGroupingBar(true)
    .ShowFieldList(true)
    .Render()

<script>
    function savePivotState() {
        var pivotObj = document.getElementById('PivotView').ej2_instances[0];
        var state = pivotObj.getPersistData();
        
        // Store in browser local storage
        localStorage.setItem('pivot-state', state);
        alert('State saved successfully!');
    }
</script>
```

### Load Persist Data

Use `loadPersistData()` to restore a previously saved state:

```csharp
<script>
    function loadPivotState() {
        var pivotObj = document.getElementById('PivotView').ej2_instances[0];
        var savedState = localStorage.getItem('pivot-state');
        
        if (savedState) {
            pivotObj.loadPersistData(savedState);
        }
    }
    
    // Load state on page load
    document.addEventListener('DOMContentLoaded', function() {
        loadPivotState();
    });
</script>
```

## Use Cases

**Manual Save/Load Methods Enable:**
- Saving and loading specific report configurations
- Creating multiple report variations
- Exporting report state for sharing
- Server-side state management (store in database)
- Implementing custom backup/restore workflows
```

**2. Share Report via URL:**
```javascript
function shareReport() {
    var pivotObj = document.getElementById('PivotView').ej2_instances[0];
    var state = pivotObj.getPersistData();
    var url = window.location.href + '?state=' + encodeURIComponent(state);
    copyToClipboard(url);
}
```

**3. Save to Server Database:**
```javascript
function saveReportToServer(reportName) {
    var pivotObj = document.getElementById('PivotView').ej2_instances[0];
    var state = pivotObj.getPersistData();
    
    fetch('/api/reports/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            reportName: reportName, 
            configuration: state 
        })
    });
}
```

## loadPersistData() Method

Restore state from JSON string:

```csharp
@Html.EJS().Button("save").Content("Save Layout").IsPrimary(true).Render()
@Html.EJS().Button("load").Content("Load Layout").IsPrimary(true).Render()

@Html.EJS().PivotView("PivotView").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .ExpandAll(false)
        .Rows(rows => rows.Name("Country").Add())
        .Columns(columns => columns.Name("Year").Caption("Year").Add())
        .Values(values => values.Name("Sold").Caption("Units Sold").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add()).ShowGroupingBar(true)
    .ShowFieldList(true)
    .Render()

<script>
    var pivotObj;
    var pivotLayout;
    
    // Save current state
    document.getElementById('save').onclick = function () {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        pivotLayout = pivotObj.getPersistData();
        console.log('State saved:', pivotLayout);
    }
    
    // Restore saved state
    document.getElementById('load').onclick = function () {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        pivotObj.loadPersistData(pivotLayout);
        console.log('State restored');
    }
</script>
```

### Method Signature

```javascript
pivotObj.loadPersistData(persistedData);
```

**Parameters:**
- `persistedData` (string): JSON string from `getPersistData()` or localStorage

### Import Use Cases

**1. From Query Parameter:**
```javascript
window.addEventListener('DOMContentLoaded', function() {
    var urlParams = new URLSearchParams(window.location.search);
    var state = urlParams.get('state');
    
    if (state) {
        // Wait for pivot table to render first
        setTimeout(() => {
            var pivotObj = document.getElementById('PivotView').ej2_instances[0];
            pivotObj.loadPersistData(state);
        }, 1000);
    }
});
```

**2. From LocalStorage:**
```javascript
function loadSavedState() {
    var pivotObj = document.getElementById('PivotView').ej2_instances[0];
    var savedState = localStorage.getItem('pivot-state');
    
    if (savedState) {
        pivotObj.loadPersistData(savedState);
    }
}
```

**3. From Server Database:**
```javascript
function loadReportFromServer(reportId) {
    fetch('/api/reports/' + reportId)
        .then(response => response.json())
        .then(data => {
            var pivotObj = document.getElementById('PivotView').ej2_instances[0];
            pivotObj.loadPersistData(data.configuration);
        });
}
```

**4. Report Gallery - Load from Multiple Saved Reports:**
```html
<div class="report-gallery">
    <button onclick="loadPredefinedReport(1)">Sales Analysis</button>
    <button onclick="loadPredefinedReport(2)">Regional Performance</button>
    <button onclick="loadPredefinedReport(3)">Product Trends</button>
</div>

<script>
    function loadPredefinedReport(reportId) {
        var pivotObj = document.getElementById('PivotView').ej2_instances[0];
        var savedReports = {
            1: savedState1,  // Predefined states
            2: savedState2,
            3: savedState3
        };
        pivotObj.loadPersistData(savedReports[reportId]);
    }
</script>
```

## Saved State Contents

### Complete State Structure

The state object contains all pivot table configuration:

```json
{
  "dataSourceSettings": {
    "rows": [{ "name": "Country" }],
    "columns": [{ "name": "Year" }],
    "values": [{ "name": "Sales", "type": "Sum" }],
    "filters": [{ "name": "Product", "items": ["Electronics"] }],
    "sortSettings": [{ "name": "Sales", "order": "Descending" }]
  },
  "displaySettings": {
    "showFieldList": true,
    "showGroupingBar": true
  }
}
```

### State Properties Included

- **dataSourceSettings**: Field arrangement, data source configuration
- **sortSettings**: Sort order and directions
- **filterSettings**: Applied filters
- **displaySettings**: UI element visibility
- expandedRowHeaders, expandedColumnHeaders: Expanded members
- valueAxis: Value field arrangement and formatting

## API Reference

### EnablePersistence Property

```csharp
.EnablePersistence(true)
```

**Type:** Boolean | **Default:** false | **Scope:** Component-wide

### getPersistData() Method

```javascript
var state = pivotObj.getPersistData();
```

**Returns:** String containing serialized pivot state

**Usage:**
```javascript
// Get current state
var persistedState = pivotObj.getPersistData();

// Store in localStorage
localStorage.setItem('pivot-state', persistedState);

// Store in server
fetch('/api/save-state', { 
    method: 'POST', 
    body: persistedState 
});
```

### loadPersistData() Method

```javascript
pivotObj.loadPersistData(persistedData);
```

**Parameters:**
- `persistedData` (string): JSON state from `getPersistData()`

**Usage: **
```javascript
// Load from localStorage
var savedState = localStorage.getItem('pivot-state');
pivotObj.loadPersistData(savedState);

// Load from server response
fetch('/api/load-state')
    .then(r => r.json())
    .then(data => pivotObj.loadPersistData(data.state));

// Load from shared URL
var urlState = new URLSearchParams(window.location.search).get('state');
pivotObj.loadPersistData(urlState);
```

### Complex Workflows

#### Server-Side State Management

```csharp
[HttpPost]
public ActionResult SavePivotState(string reportName, string state)
{
    // Save to database
    var report = new PivotReport
    {
        Name = reportName,
        Configuration = state,
        SavedDate = DateTime.Now,
        UserId = User.Identity.GetUserId()
    };
    _context.PivotReports.Add(report);
    _context.SaveChanges();
    
    return Json(new { success = true, reportId = report.Id });
}

[HttpGet]
public ActionResult LoadPivotState(int reportId)
{
    var report = _context.PivotReports.Find(reportId);
    return Json(new { success = true, state = report.Configuration });
}
```

#### State Versioning

```javascript
function saveVersionedState(reportName) {
    var pivotObj = document.getElementById('PivotView').ej2_instances[0];
    var state = pivotObj.getPersistData();
    var version = parseInt(localStorage.getItem('pivot-version') || 0) + 1;
    
    localStorage.setItem('pivot-state-v' + version, state);
    localStorage.setItem('pivot-version', version);
}

function loadVersionedState(version) {
    var pivotObj = document.getElementById('PivotView').ej2_instances[0];
    var state = localStorage.getItem('pivot-state-v' + version);
    if (state) {
        pivotObj.loadPersistData(state);
    }
}
```
