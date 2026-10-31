# Toolbar in Tree Grid

## Table of Contents
- [When to Use This](#when-to-use-this)
- [Built-in Toolbar Items](#built-in-toolbar-items)
- [Custom Toolbar Items](#custom-toolbar-items)
- [Toolbar Events](#toolbar-events)
- [Toolbar Customization](#toolbar-customization)

## When to Use This

Use toolbar features when you need to:
- Provide quick access to common grid actions (add, edit, delete)
- Add export or print functionality
- Create custom actions with buttons or dropdowns
- Group related commands in a single location
- Display search or filter controls above the grid

## Built-in Toolbar Items

### Add Toolbar

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowPaging(true)
    .AllowExcelExport(true)
    .AllowPdfExport(true)
    .AllowPrinting(true)
    .EditSettings(edit =>
    {
        edit.AllowEditing(true)
           .AllowAdding(true)
           .AllowDeleting(true)
           .Mode(EditMode.Inline);
    })
    .Toolbar(new List<string> {
        "Add", "Edit", "Delete", "Update", "Cancel",
        "Search", "ExcelExport", "PdfExport", "Print"
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

**Built-in Items:**
- `Add`: Add new record
- `Edit`: Edit selected record  
- `Delete`: Delete selected record
- `Update`: Save edited record
- `Cancel`: Cancel editing
- `Search`: Display search box
- `ExcelExport`: Export to Excel
- `PdfExport`: Export to PDF
- `Print`: Print grid
- `ColumnChooser`: Show/hide columns
- `ExpandAll`: Expand all rows
- `CollapseAll`: Collapse all rows

## Custom Toolbar Items

### Add Custom Buttons

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .Toolbar(new List<object> {
        new { text = "Add New Task", prefixIcon = "e-icons e-add", id = "grid_add", align = "Left" },
        new { text = "Refresh", prefixIcon = "e-icons e-refresh", id = "grid_refresh", align = "Left" },
        new { type = "Separator" },
        new { text = "Export", prefixIcon = "e-icons e-export-excel", id = "grid_export", align = "Right" },
        new { text = "Settings", prefixIcon = "e-icons e-settings", id = "grid_settings", align = "Right" }
    })
    .ToolbarClick("onToolbarClick")
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
    })
    .Render()

<script>
function onToolbarClick(args) {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    
    if (args.item.id === 'grid_add') {
        console.log("Add new task");
        // Custom add logic
    }
    
    if (args.item.id === 'grid_refresh') {
        console.log("Refreshing grid");
        grid.refresh();
    }
    
    if (args.item.id === 'grid_export') {
        console.log("Exporting data");
        grid.excelExport();
    }
    
    if (args.item.id === 'grid_settings') {
        console.log("Opening settings");
        // Open settings dialog
    }
}
</script>
```

### Toolbar with Dropdown

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .Toolbar(new List<object> {
        new { text = "Quick Actions", items = new List<object> {
            new { text = "Export to Excel", id = "export_excel" },
            new { text = "Export to PDF", id = "export_pdf" },
            new { text = "Print", id = "print_grid" }
        }
    }})
    .ToolbarClick("onToolbarItemClick")
    .Render()

<script>
function onToolbarItemClick(args) {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    
    if (args.item.id === 'export_excel') {
        grid.excelExport();
    } else if (args.item.id === 'export_pdf') {
        grid.pdfExport();
    } else if (args.item.id === 'print_grid') {
        grid.print();
    }
}
</script>
```

## Toolbar Events

### Toolbar Click Handler

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .Toolbar(new List<string> { "Add", "Edit", "Delete", "Search" })
    .ToolbarClick("onToolbarAction")
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
    })
    .Render()

<script>
function onToolbarAction(args) {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    
    if (args.item.text === 'Search') {
        console.log("Search clicked");
    }
    
    // Validate before action
    if (args.item.text === 'Delete') {
        if (grid.getSelectedRows().length === 0) {
            args.cancel = true;
            alert('Please select a row to delete');
        }
    }
}
</script>
```

## Toolbar Customization

### Position Alignment

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .Toolbar(new List<object> {
        new { text = "Add", prefixIcon = "e-icons e-add", align = "Left" },
        new { text = "Edit", prefixIcon = "e-icons e-edit", align = "Left" },
        new { type = "Separator", align = "Left" },
        new { text = "Settings", prefixIcon = "e-icons e-settings", align = "Right" },
        new { text = "Help", prefixIcon = "e-icons e-help", align = "Right" }
    })
    .Render()
```

**Alignment Values:**
- `Left`: Items on left side
- `Right`: Items on right side
- `Center`: Items in center

### Toolbar with Template

```html
<script id="toolbarTemplate" type="text/x-template">
    <div style="display: flex; gap: 10px;">
        <input type="text" id="searchInput" placeholder="Search..." style="padding: 5px;">
        <button onclick="performSearch()" style="padding: 5px 10px;">Go</button>
        <select id="filterStatus" onchange="filterByStatus()">
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
        </select>
    </div>
</script>

@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .Toolbar("#toolbarTemplate")
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
    })
    .Render()

<script>
function performSearch() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    var value = document.getElementById('searchInput').value;
    grid.search(value);
}

function filterByStatus() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    var value = document.getElementById('filterStatus').value;
    
    if (value) {
        var filterSettings = [{ field: 'Status', operator: 'equal', value: value }];
        grid.filterByMethod(filterSettings);
    } else {
        grid.clearFiltering();
    }
}
</script>
```
