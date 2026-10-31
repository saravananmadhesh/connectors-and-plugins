    # Context Menu — Syncfusion ASP.NET MVC Gantt Chart

## Table of Contents
- [Enable Context Menu](#enable-context-menu)
- [Default Context Menu Items](#default-context-menu-items)
- [Custom Context Menu Items](#custom-context-menu-items)
- [Context Menu Events](#context-menu-events)
- [Touch interaction](#touch-interaction)

---

## Enable Context Menu

Enable a right-click context menu on the Gantt rows by setting `EnableContextMenu(true)`:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .EditSettings(es => es.AllowAdding(true).AllowEditing(true).AllowDeleting(true))
    .EnableContextMenu(true)
    .Height("450px")
    .Render()
```

---

## Default Context Menu Items

When editing is enabled, the following default context menu items are shown:

| Item | Action |
|---|---|
| `AutoFitAll` | Auto-fit all column widths |
| `AutoFit` | Auto-fit selected column width |
| `TaskInformation` | Open edit dialog for selected task |
| `Add` | Add new task (sub-menu: above, below, child, milestone) |
| `DeleteTask` | Delete selected task |
| `Save` | Save pending changes |
| `Cancel` | Cancel pending changes |
| `Indent` | Indent task (make child of row above) |
| `Outdent` | Outdent task (promote up one level) |
| `DeleteDependency` | Remove a dependency from selected task |
| `Convert` | Convert task to milestone or vice versa |

---

## Custom Context Menu Items

Add custom items to the context menu using `ContextMenuItems`:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .EnableContextMenu(true)
    .ContextMenuItems(cm =>
    {
        cm.Text("Task Details").Id("taskDetails").Target(".e-content").Add();
        cm.Text("Assign Resource").Id("assignResource").Target(".e-content").Add();
    })
    .ContextMenuClick("onContextMenuClick")
    .Height("450px")
    .Render()

<script>
function onContextMenuClick(args) {
    if (args.item.id === 'taskDetails') {
        console.log('Selected task:', args.rowData.TaskName);
    }
    if (args.item.id === 'assignResource') {
        // open resource assignment UI
    }
}
</script>
```

> Custom items are added **in addition to** the default items. To show only custom items, set `ContextMenuItems` and do not pass built-in item strings. Use the `Target` property to control where the menu item appears (e.g., `.e-content` for row content area).

---

## Context Menu Events

| Event | Description |
|---|---|
| `ContextMenuOpen` | Fires before the context menu opens — use to show/hide items conditionally |
| `ContextMenuClick` | Fires when a context menu item is clicked |

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .EnableContextMenu(true)
    .ContextMenuOpen("onContextMenuOpen")
    .ContextMenuClick("onContextMenuClick")
    .Height("450px")
    .Render()

<script>
function onContextMenuOpen(args) {
    // Hide the Delete item for root-level tasks
    if (args.rowData && !args.rowData.parentItem) {
        args.hideItems = ['DeleteTask'];
    }
}

function onContextMenuClick(args) {
    switch (args.item.id) {
        case 'taskDetails':
            console.log('Task:', args.rowData.TaskName);
            break;
        case 'gantt_TaskInformation':
            // built-in item clicked
            break;
    }
}
</script>
```

**`ContextMenuOpen` args:**

| Property | Description |
|---|---|
| `rowData` | The task data for the right-clicked row |
| `hideItems` | Array of item IDs to hide from the menu |
| `disableItems` | Array of item IDs to disable in the menu |

**`ContextMenuClick` args:**

| Property | Description |
|---|---|
| `item` | The clicked menu item object (contains `id`, `text`) |
| `rowData` | The task data for the row the menu was opened on |
| `column` | The column object for the cell that was right-clicked |

---

## Touch interaction

To perform `long press` action on a row, the `context menu` is opened, and then you can tap a menu item to trigger its action.

