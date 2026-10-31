# Undo and Redo — Syncfusion ASP.NET Core Gantt Chart

## Table of Contents
- [Enable Undo / Redo](#enable-undo--redo)
- [Configure Supported Actions](#configure-supported-actions)
- [Set Steps Count](#set-steps-count)
- [Programmatic Undo / Redo](#programmatic-undo--redo)
- [Retrieve Undo / Redo Stack](#retrieve-undo--redo-stack)
- [Clear Undo / Redo Collection](#clear-undo--redo-collection)

---

## Enable Undo / Redo

Set `enableUndoRedo="true"` and add `"Undo"` and `"Redo"` to the toolbar:

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           enableUndoRedo="true"
           toolbar="@(new List<string>() {
               "Add","Edit","Delete","Cancel","Update",
               "Undo","Redo"
           })"
           height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" progress="Progress"
                        dependency="Predecessor" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowAdding="true" allowEditing="true"
                          allowDeleting="true" allowTaskbarEditing="true">
    </e-gantt-editsettings>
</ejs-gantt>
```

---

## Configure Supported Actions

By default, **all** Gantt actions are tracked for undo/redo. Use `undoRedoActions` to limit which actions are tracked:

| Action | Description |
|--------|-------------|
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
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           enableUndoRedo="true"
           undoRedoActions="@(new List<string>() { "Edit", "Delete" })"
           toolbar="@(new List<string>() { "Edit","Delete","Undo","Redo" })"
           height="450px">
    ...
</ejs-gantt>
```

---

## Set Steps Count

`undoRedoStepsCount` controls how many actions are stored (default: **10**). When exceeded, the oldest action is discarded:

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           enableUndoRedo="true"
           undoRedoStepsCount="20"
           toolbar="@(new List<string>() { "Undo","Redo" })"
           height="450px">
    ...
</ejs-gantt>
```

---

## Programmatic Undo / Redo

Invoke `undo()` and `redo()` methods programmatically via external buttons:

```cshtml
<button onclick="undoAction()">Undo</button>
<button onclick="redoAction()">Redo</button>

<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           enableUndoRedo="true"
           height="450px">
    ...
</ejs-gantt>

<script>
function undoAction() {
    var ganttObj = document.getElementById('Gantt').ej2_instances[0];
    ganttObj.undo();
}
function redoAction() {
    var ganttObj = document.getElementById('Gantt').ej2_instances[0];
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
    var ganttObj   = document.getElementById('Gantt').ej2_instances[0];
    var undoStack  = ganttObj.getUndoActions();
    var redoStack  = ganttObj.getRedoActions();
    console.log('Undo stack:', undoStack);
    console.log('Redo stack:', redoStack);
}
</script>
```

---

## Clear Undo / Redo Collection

Use `clearUndoCollection()` and `clearRedoCollection()` to reset the stacks at runtime:

```cshtml
<button onclick="clearAll()">Clear Undo & Redo</button>

<script>
function clearAll() {
    var ganttObj = document.getElementById('Gantt').ej2_instances[0];
    ganttObj.clearUndoCollection();
    ganttObj.clearRedoCollection();
}
</script>
```
