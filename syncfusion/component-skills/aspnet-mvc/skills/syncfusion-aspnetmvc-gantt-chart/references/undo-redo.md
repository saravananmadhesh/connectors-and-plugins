# Undo and Redo — Syncfusion ASP.NET MVC Gantt Chart

## Table of Contents
- [Enable Undo / Redo](#enable-undo--redo)
- [Configure Supported Actions](#configure-supported-actions)
- [Set Steps Count](#set-steps-count)
- [Programmatic Undo / Redo](#programmatic-undo--redo)
- [Retrieve Undo / Redo Stack](#retrieve-undo--redo-stack)
- [Clear Undo / Redo Collection](#clear-undo--redo-collection)

---

## Enable Undo / Redo

Set `EnableUndoRedo(true)` and add `"Undo"` and `"Redo"` to the toolbar:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration")
        .Progress("Progress").Dependency("Predecessor").Child("SubTasks")
    )
    .EditSettings(es => es
        .AllowAdding(true).AllowEditing(true).AllowDeleting(true).AllowTaskbarEditing(true)
    )
    .EnableUndoRedo(true)
    .Toolbar(new List<string> { "Add", "Edit", "Delete", "Cancel", "Update", "Undo", "Redo" })
    .Height("450px")
    .Render()
```

---

## Configure Supported Actions

By default, **all** Gantt actions are tracked for undo/redo. Use `UndoRedoActions` to limit which actions are tracked:

| Action | Description |
|---|---|
| `Edit` | Cell and dialog edits |
| `Delete` | Row deletions |
| `Add` | New row additions |
| `ColumnReorder` | Column drag reordering |
| `Indent` | Row indent |
| `Outdent` | Row outdent |
| `ColumnResize` | Column width resize |
| `Sorting` | Column sort changes |
| `Filtering` | Filter changes |
| `Search` | Search value changes |
| `ZoomIn` | Timeline zoom in |
| `ZoomOut` | Timeline zoom out |
| `ZoomToFit` | Timeline zoom to fit |
| `ColumnState` | Column show/hide |
| `RowDragAndDrop` | Row drag-and-drop reordering |
| `TaskbarDragAndDrop` | Taskbar drag-and-drop rescheduling |
| `PreviousTimeSpan` | Navigate to previous time span |
| `NextTimeSpan` | Navigate to next time span |

```cshtml
@* Track only Edit and Delete actions *@
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .EnableUndoRedo(true)
    .UndoRedoActions(new List<string> { "Edit", "Delete" })
    .Toolbar(new List<string> { "Edit", "Delete", "Undo", "Redo" })
    .Height("450px")
    .Render()
```

---

## Set Steps Count

`UndoRedoStepsCount` controls how many actions are stored (default: **10**). When exceeded, the oldest action is discarded:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .EnableUndoRedo(true)
    .UndoRedoStepsCount(20)
    .Toolbar(new List<string> { "Undo", "Redo" })
    .Height("450px")
    .Render()
```

---

## Programmatic Undo / Redo

Invoke `undo()` and `redo()` methods programmatically via external buttons:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .EnableUndoRedo(true)
    .Height("450px")
    .Render()

<button onclick="undoAction()">Undo</button>
<button onclick="redoAction()">Redo</button>

<script>
function undoAction() {
    var ganttObj = document.getElementById('gantt').ej2_instances[0];
    ganttObj.undo();
}
function redoAction() {
    var ganttObj = document.getElementById('gantt').ej2_instances[0];
    ganttObj.redo();
}
</script>
```

---

## Retrieve Undo / Redo Stack

Use `getUndoActions()` and `getRedoActions()` to retrieve the current undo/redo stacks as arrays:

```cshtml
<button onclick="showStacks()">Show Stacks</button>

<script>
function showStacks() {
    var ganttObj = document.getElementById('gantt').ej2_instances[0];
    var undoStack = ganttObj.getUndoActions();
    var redoStack = ganttObj.getRedoActions();
    console.log('Undo stack:', undoStack);
    console.log('Redo stack:', redoStack);
}
</script>
```

---

## Clear Undo / Redo Collection

Use `clearUndoCollection()` and `clearRedoCollection()` to reset the stacks at runtime:

```cshtml
<button onclick="clearAll()">Clear Undo &amp; Redo</button>

<script>
function clearAll() {
    var ganttObj = document.getElementById('gantt').ej2_instances[0];
    ganttObj.clearUndoCollection();
    ganttObj.clearRedoCollection();
}
</script>
```
