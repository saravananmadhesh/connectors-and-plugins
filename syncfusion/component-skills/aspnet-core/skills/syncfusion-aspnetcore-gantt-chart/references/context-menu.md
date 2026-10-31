# Context Menu — Syncfusion ASP.NET Core Gantt Chart

## Table of Contents
- [Enable Context Menu](#enable-context-menu)
- [Default Context Menu Items](#default-context-menu-items)
- [Custom Context Menu Items](#custom-context-menu-items)
- [Context Menu Events](#context-menu-events)
- [Touch Interaction](#touch-interaction)

---

## Enable Context Menu

Set `enableContextMenu="true"` on `<ejs-gantt>` to allow right-click context menus in both the TreeGrid and chart areas:

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           enableContextMenu="true"
           height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowAdding="true" allowEditing="true"
                          allowDeleting="true">
    </e-gantt-editsettings>
</ejs-gantt>
```

---

## Default Context Menu Items

The default items available when `enableContextMenu="true"`:

| Item | Description |
|------|-------------|
| `AutoFit` | Auto-fit the current column |
| `AutoFitAll` | Auto-fit all columns |
| `SortAscending` | Sort the column in ascending order |
| `SortDescending` | Sort the column in descending order |
| `TaskInformation` | Open the edit dialog for the current task |
| `Add` | Add a new row |
| `Indent` | Indent the selected record one level |
| `Outdent` | Outdent the selected record one level |
| `DeleteTask` | Delete the current task |
| `Save` | Save the edited task |
| `Cancel` | Cancel the edit |
| `DeleteDependency` | Delete the current dependency link |
| `Convert` | Convert the task to a milestone or vice-versa |

---

## Custom Context Menu Items

Add custom items by defining `contextMenuItems` as a `List<object>` mixing built-in string keys and anonymous objects with `text`, `target`, and `id`.

- Use `target = ".e-content"` for row-area items
- Use `target = ".e-gridheader"` for header-area items

```cshtml
@{
    List<object> contextItems = new List<object>() {
        "AutoFitAll", "AutoFit",
        "TaskInformation", "DeleteTask",
        "Save", "Cancel",
        "SortAscending", "SortDescending",
        "Add", "DeleteDependency", "Convert"
    };
    contextItems.Add(new { text = "Collapse the Row", target = ".e-content",    id = "collapserow" });
    contextItems.Add(new { text = "Expand the Row",   target = ".e-content",    id = "expandrow"   });
    contextItems.Add(new { text = "Hide Column",      target = ".e-gridheader", id = "hidecols"    });
}

<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           enableContextMenu="true"
           contextMenuItems="contextItems"
           contextMenuOpen="contextMenuOpen"
           contextMenuClick="contextMenuClick"
           height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

---

## Context Menu Events

### contextMenuOpen

Fires before the context menu opens. Use `args.hideItems` to conditionally hide items based on the row or header context:

```javascript
function contextMenuOpen(args) {
    var record = args.rowData;
    if (args.type !== 'Header') {
        if (!record.hasChildRecords) {
            args.hideItems.push('Collapse the Row');
            args.hideItems.push('Expand the Row');
        } else {
            if (record.expanded) {
                args.hideItems.push('Expand the Row');
            } else {
                args.hideItems.push('Collapse the Row');
            }
        }
    }
}
```

### contextMenuClick

Fires when the user clicks a context menu item. Use `args.item.id` to identify which item was clicked:

```javascript
function contextMenuClick(args) {
    var ganttObj = document.getElementById('Gantt').ej2_instances[0];
    var record   = args.rowData;

    if (args.item.id === 'collapserow') {
        ganttObj.collapseByID(record.ganttProperties.taskId);
    } else if (args.item.id === 'expandrow') {
        ganttObj.expandByID(record.ganttProperties.taskId);
    } else if (args.item.id === 'hidecols') {
        ganttObj.hideColumn(args.column.headerText);
    }
}
```

> Use `args.hideItems.push(itemText)` in `contextMenuOpen` to hide items by their display text. Use `args.item.id` in `contextMenuClick` to identify custom items by their registered `id`.

---

## Touch Interaction

On touch devices, perform a **long press** on a row to open the context menu. Then tap a menu item to trigger its action.
