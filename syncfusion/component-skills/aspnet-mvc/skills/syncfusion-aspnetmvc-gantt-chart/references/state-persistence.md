# State Persistence — Syncfusion ASP.NET MVC Gantt Chart

## Table of Contents
- [Enable State Persistence](#enable-state-persistence)
- [What is Persisted](#what-is-persisted)
- [Get or Set localStorage Value](#get-or-set-localstorage-value)
- [Prevent Specific Properties from Persisting](#prevent-specific-properties-from-persisting)
- [Persist Header Template and Header Text](#persist-header-template-and-header-text)

---

## Enable State Persistence

Set `EnablePersistence(true)` to save the Gantt model state to the browser's `localStorage`. The state is restored automatically on the next page load:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration")
        .Progress("Progress").Child("SubTasks")
    )
    .EnablePersistence(true)
    .Height("450px")
    .Render()
```

> State is stored in `localStorage` using the key `"gantt" + id` (e.g., `"ganttgantt"` for `id="gantt"`). Changing the component `id` clears the persisted state.

---

## What is Persisted

When `EnablePersistence(true)` is set, the following Gantt properties are persisted:

- Column widths, visibility, and order (`Columns`)
- Sort state (`Sorting`)
- Filter state (`Filtering`)
- Timeline zoom level

> Column `Template`, `HeaderText`, `HeaderTemplate`, column formatters, and `ValueAccessor` are **not** persisted by default.

---

## Get or Set localStorage Value

Manually read or write the persisted Gantt model using the browser's `localStorage` API. The key format is `"gantt" + componentId`:

```javascript
// Get the persisted Gantt model
var raw   = window.localStorage.getItem('ganttgantt');  // key = "gantt" + id
var model = JSON.parse(raw);
console.log(model);

// Set/override the persisted model
window.localStorage.setItem('ganttgantt', JSON.stringify(model));

// Clear persisted state entirely
localStorage.removeItem('ganttgantt');
```

---

## Prevent Specific Properties from Persisting

Use `addOnPersist` in the `DataBound` event to exclude specific Gantt properties (e.g., `columns`) from being saved:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .EnablePersistence(true)
    .DataBound("onDataBound")
    .Height("450px")
    .Render()

<script>
function onDataBound() {
    var ganttObj = document.getElementById('gantt').ej2_instances[0];

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

Column `HeaderText` and `HeaderTemplate` are excluded from automatic persistence. To restore them, manually clone and save the columns on load, then re-apply on restore:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks")
    )
    .Columns(col =>
    {
        col.Field("TaskId").HeaderText("Task ID").Width("80").Add();
        col.Field("TaskName").HeaderText("Task Name").Width("250").Add();
    })
    .EnablePersistence(true)
    .DataBound("onDataBound")
    .Height("450px")
    .Render()

<script>
var savedColumns;

function onDataBound() {
    var ganttObj = document.getElementById('gantt').ej2_instances[0];

    // Clone columns to preserve HeaderText and HeaderTemplate
    savedColumns = ganttObj.columns.map(function(col) {
        return Object.assign({}, col);
    });
}

function restoreColumns() {
    var ganttObj = document.getElementById('gantt').ej2_instances[0];
    if (savedColumns) {
        ganttObj.columns = savedColumns;
        ganttObj.dataBind();
    }
}
</script>
```
