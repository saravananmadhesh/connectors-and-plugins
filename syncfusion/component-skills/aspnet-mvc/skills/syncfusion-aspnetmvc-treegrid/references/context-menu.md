# Context Menu in Tree Grid

## Table of Contents

- [When to Use This](#when-to-use-this)
- [Enable Context Menu](#enable-context-menu)
- [Custom Context Menu Items](#custom-context-menu-items)
- [Context Menu Events](#context-menu-events)
- [Context Menu for Headers](#context-menu-for-headers)
- [Context Menu for Pager](#context-menu-for-pager)

## When to Use This

Use context menus when you need to:
- Provide quick access to common actions (copy, edit, delete)
- Create contextual operations based on selected rows
- Customize right-click behavior for headers or cells
- Add shortcuts for frequently used commands
- Reduce toolbar clutter by moving actions to context menu

## Enable Context Menu

### Add Default Context Menu

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .ContextMenuItems(new List<ContextMenuItemModel> {
        new ContextMenuItemModel { Text = "Copy", Target = ".e-rowcell" },
        new ContextMenuItemModel { Text = "Cut", Target = ".e-rowcell" },
        new ContextMenuItemModel { Text = "Paste", Target = ".e-rowcell" },
        new ContextMenuItemModel { Type = "Separator", Target = ".e-rowcell" },
        new ContextMenuItemModel { Text = "Edit", Target = ".e-rowcell" },
        new ContextMenuItemModel { Text = "Delete", Target = ".e-rowcell" }
    })
    .EditSettings(edit =>
    {
        edit.AllowEditing(true)
           .AllowDeleting(true)
           .Mode(EditMode.Inline);
    })
    .ChildMapping("Children")
    .Columns(col =>
    {
        col.Field("TaskID").IsPrimaryKey(true).Width("80").Add();
        col.Field("TaskName").HeaderText("Task").Width("200").Add();
        col.Field("StartDate").HeaderText("Start").Type("date").Format("yMd").Width("120").Add();
    })
    .Render()
```

## Custom Context Menu Items

### Custom Menu with Icons

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .ContextMenuItems(new List<ContextMenuItemModel> {
        new ContextMenuItemModel { Type = "Separator" },
        new ContextMenuItemModel { Text = "Add Task", IconCss = "e-icons e-add-icon" },
        new ContextMenuItemModel { Text = "Edit Task", IconCss = "e-icons e-edit" },
        new ContextMenuItemModel { Text = "Delete Task", IconCss = "e-icons e-delete" },
        new ContextMenuItemModel { Type = "Separator" },
        new ContextMenuItemModel { Text = "Copy", IconCss = "e-icons e-copy" },
        new ContextMenuItemModel { Text = "Export", IconCss = "e-icons e-export-excel" }
    })
    .ContextMenuClick("onContextMenuClick")
    .ChildMapping("Children")
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
    })
    .Render()

<script>
function onContextMenuClick(args) {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    
    switch(args.item.text) {
        case 'Edit Task':
            grid.startEdit(args.rowInfo);
            break;
        case 'Delete Task':
            grid.deleteRow(args.rowInfo);
            break;
        case 'Add Task':
            grid.addRecord();
            break;
        case 'Copy':
            copyRowData(args.rowInfo.data);
            break;
    }
}

function copyRowData(data) {
    var text = JSON.stringify(data);
    navigator.clipboard.writeText(text);
    console.log("Row data copied to clipboard");
}
</script>
```

## Context Menu Events

### Before Menu Display

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .ContextMenuItems(new List<ContextMenuItemModel> {
        new ContextMenuItemModel { Text = "Edit" },
        new ContextMenuItemModel { Text = "Delete" }
    })
    .ContextMenuOpen("beforeMenuOpen")
    .ChildMapping("Children")
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
    })
    .Render()

<script>
function beforeMenuOpen(args) {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    
    // Disable delete if no row selected
    if (grid.getSelectedRows().length === 0) {
        args.items.forEach(item => {
            if (item.text === 'Delete') {
                item.disabled = true;
            }
        });
    }
    
    // Disable edit for completed rows
    if (args.rowInfo && args.rowInfo.data.IsCompleted) {
        args.items.forEach(item => {
            if (item.text === 'Edit') {
                item.disabled = true;
            }
        });
    }
}
</script>
```

### After Menu Item Click

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .ContextMenuItems(new List<ContextMenuItemModel> {
        new ContextMenuItemModel { Text = "View Details" }
    })
    .ContextMenuClick("showActionResult")
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
    })
    .Render()

<script>
function showActionResult(args) {
    console.log("Menu item clicked: " + args.item.text);
    console.log("Row data: ", args.rowInfo.data);
    
    // Show toast or notification
    alert("Action: " + args.item.text + "\nTask: " + args.rowInfo.data.TaskName);
}
</script>
```

## Context Menu for Headers

### Header Context Menu

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .ContextMenuItems(new List<ContextMenuItemModel> {
        new ContextMenuItemModel { Text = "Sort Ascending", Target = ".e-headercell" },
        new ContextMenuItemModel { Text = "Sort Descending", Target = ".e-headercell" },
        new ContextMenuItemModel { Type = "Separator", Target = ".e-headercell" },
        new ContextMenuItemModel { Text = "Filter", Target = ".e-headercell" },
        new ContextMenuItemModel { Text = "Group", Target = ".e-headercell" }
    })
    .ContextMenuClick("onHeaderContextClick")
    .AllowSorting(true)
    .AllowFiltering(true)
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
        col.Field("Priority").Width("100").Add();
    })
    .Render()

<script>
function onHeaderContextClick(args) {
    if (args.target.classList.contains('e-headercell')) {
        var columnField = args.target.textContent;
        
        if (args.item.text === 'Sort Ascending') {
            var grid = document.getElementById('TreeGrid').ej2_instances[0];
            grid.sort([{ field: columnField, direction: 'Ascending' }]);
        }
    }
}
</script>
```

## Context Menu for Pager

### Pager Context Menu

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowPaging(true)
    .ContextMenuItems(new List<ContextMenuItemModel> {
        new ContextMenuItemModel { Text = "Go to First Page", Target = ".e-pagercontainer" },
        new ContextMenuItemModel { Text = "Go to Last Page", Target = ".e-pagercontainer" },
        new ContextMenuItemModel { Type = "Separator", Target = ".e-pagercontainer" },
        new ContextMenuItemModel { Text = "Refresh", Target = ".e-pagercontainer" }
    })
    .ContextMenuClick("onPagerContextClick")
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
    })
    .Render()

<script>
function onPagerContextClick(args) {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    
    if (args.item.text === 'Go to First Page') {
        grid.goToPage(1);
    } else if (args.item.text === 'Go to Last Page') {
        var pageCount = Math.ceil(grid.pageSettings.totalRecordsCount / grid.pageSettings.pageSize);
        grid.goToPage(pageCount);
    } else if (args.item.text === 'Refresh') {
        grid.refresh();
    }
}
</script>
```
