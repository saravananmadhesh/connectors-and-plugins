# Command Column Editing in Tree Grid

## Table of Contents
- [When to Use This](#when-to-use-this)
- [Built-in Command Buttons](#built-in-command-buttons)
- [Adding Command Buttons](#adding-command-buttons)
- [Custom Command Buttons](#custom-command-buttons)
- [Example with Edit Settings](#example-with-edit-settings)
- [Notes & References](#notes--references)

## When to Use This

Use command columns when you need to:
- Provide inline Edit, Delete, Save, and Cancel buttons for each row
- Create custom action buttons (Details, Approve, Reject, etc.) with handler logic
- Reduce toolbar clutter by embedding row-level actions directly in the grid
- Enable quick access to row-specific operations

## Built-in Command Buttons

The Tree Grid provides four built-in command types:
- `Edit` — Edit the current row
- `Delete` — Delete the current row
- `Save` — Save changes after editing
- `Cancel` — Cancel the edit state

Each can be customized with icons and CSS classes via `buttonOption`.

## Adding Command Buttons

Define a list of command objects and assign to the column's `Commands` property. Customize button icons and styling with `buttonOption`.

```csharp
List<object> commands = new List<object>();
commands.Add(new { type = "Edit", buttonOption = new { iconCss = "e-icons e-edit", cssClass = "e-flat" } });
commands.Add(new { type = "Delete", buttonOption = new { iconCss = "e-icons e-delete", cssClass = "e-flat" } });
commands.Add(new { type = "Save", buttonOption = new { iconCss = "e-icons e-update", cssClass = "e-flat" } });
commands.Add(new { type = "Cancel", buttonOption = new { iconCss = "e-icons e-cancel-icon", cssClass = "e-flat" } });
```

Then add to column:

```csharp
col.HeaderText("Manage Records").Width("160").Commands(commands).Add();
```

## Custom Command Buttons

Create custom command buttons with a type identifier (e.g., `"details"`, `"approve"`) and attach a `Click` event handler.

```csharp
List<object> commands = new List<object>();
commands.Add(new { type = "taskstatus", buttonOption = new { content = "Details", cssClass = "e-flat e-details" } });
```

In the `Load` event, hook the click handler:

```javascript
function load() {
    this.columns[4].commands[0].buttonOption.click = function (args) {
        var treegrid = document.getElementById('TreeGrid').ej2_instances[0];
        var rowObj = treegrid.grid.getRowObjectFromUID(
            ej.base.closest(args.target, '.e-row').getAttribute('data-uid')
        );
        console.log("Row data:", rowObj.data);
        // Perform custom action
    }
}
```

## Example with Edit Settings

```cshtml
@(Html.EJS().TreeGrid("TreeGrid")
    .DataSource((IEnumerable<object>)ViewBag.datasource)
    .EditSettings(edit => {
        edit.AllowAdding(true);
        edit.AllowDeleting(true);
        edit.AllowEditing(true);
        edit.Mode(Syncfusion.EJ2.TreeGrid.EditMode.Row);
    })
    .Columns(col => {
        col.Field("TaskId").HeaderText("Task ID").IsPrimaryKey(true).Add();
        col.Field("TaskName").HeaderText("Task Name").Add();
        col.HeaderText("Actions").Commands(commands).Add();
    })
    .Height(400)
    .ChildMapping("Children")
    .TreeColumnIndex(1)
    .Load("load")
    .Render()
)
```

## Notes & References
- Requires editing mode to be configured (`EditMode.Row`, `EditMode.Dialog`, or `EditMode.Batch`).
- Use `ShowDeleteConfirmDialog(true)` to confirm deletion.
- Custom commands provide flexibility for any row-specific operation.
