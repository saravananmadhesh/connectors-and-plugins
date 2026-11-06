# State Persistence — Syncfusion ASP.NET Core Gantt Chart

## Table of Contents
- [Enable State Persistence](#enable-state-persistence)
- [What is Persisted](#what-is-persisted)
- [Get or Set localStorage Value](#get-or-set-localstorage-value)
- [Prevent Specific Properties from Persisting](#prevent-specific-properties-from-persisting)
- [Persist Header Template and Header Text](#persist-header-template-and-header-text)

---

## Enable State Persistence

Set `enablePersistence="true"` to save the Gantt model state to the browser's `localStorage`. The state is restored automatically on the next page load:

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           enablePersistence="true"
           height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" progress="Progress"
                        child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

> State is stored in `localStorage` using the key `"gantt" + id` (e.g., `"ganttGantt"` for `id="Gantt"`). Changing the component `id` clears the persisted state.

---

## What is Persisted

When `enablePersistence="true"`, the following Gantt properties are persisted:

- Column widths, visibility, and order (`Columns`)
- Sort state (`Sorting`)
- Filter state (`Filtering`)
- Timeline zoom level

> Column `template`, `headerText`, `headerTemplate`, column formatters, and `valueAccessor` are **not** persisted by default.

---

## Get or Set localStorage Value

Manually read or write the persisted Gantt model using the browser's `localStorage` API. The key format is `"gantt" + componentId`:

```javascript
// Get the persisted Gantt model
var raw   = window.localStorage.getItem('ganttGantt');  // key = "gantt" + id
var model = JSON.parse(raw);
console.log(model);

// Set/override the persisted model
window.localStorage.setItem('ganttGantt', JSON.stringify(model));

// Clear persisted state entirely
localStorage.removeItem('ganttGantt');
```

---

## Prevent Specific Properties from Persisting

Use `addOnPersist` in the `dataBound` event to exclude specific Gantt properties (e.g., `columns`) from being saved:

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           enablePersistence="true"
           dataBound="onDataBound"
           height="450px">
    ...
</ejs-gantt>

<script>
function onDataBound() {
    var ganttObj = document.getElementById('Gantt').ej2_instances[0];

    // Override addOnPersist to exclude 'columns' from persistence
    var originalAddOnPersist = ganttObj.addOnPersist.bind(ganttObj);
    ganttObj.addOnPersist = function(keys) {
        keys = keys.filter(function(key) { return key !== 'columns'; });
        return originalAddOnPersist(keys);
    };
}
</script>
```

---

## Persist Header Template and Header Text

Column `headerText` and `headerTemplate` are excluded from automatic persistence. To restore them, manually clone and save the columns on load, then re-apply on restore:

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           enablePersistence="true"
           dataBound="onDataBound"
           height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId"   headerText="Task ID"   width="80"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Task Name" width="250"></e-gantt-column>
    </e-gantt-columns>
</ejs-gantt>

<script>
var savedColumns;

function onDataBound() {
    var ganttObj = document.getElementById('Gantt').ej2_instances[0];

    // Clone columns to preserve headerText and headerTemplate
    savedColumns = ganttObj.columns.map(function(col) {
        return Object.assign({}, col);
    });
}

function restoreColumns() {
    var ganttObj = document.getElementById('Gantt').ej2_instances[0];
    if (savedColumns) {
        ganttObj.columns = savedColumns;
        ganttObj.dataBind();
    }
}
</script>
```
