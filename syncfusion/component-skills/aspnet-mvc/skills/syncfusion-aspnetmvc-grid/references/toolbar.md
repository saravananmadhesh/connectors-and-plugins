# Toolbar in ASP.NET MVC Grid

Configure built-in and custom toolbar items for CRUD, export, search, and other actions.

## When to Use This

Use this reference when you need to:
- Add built-in toolbar items (Add, Edit, Delete, Export)
- Create custom toolbar buttons
- Configure toolbar templates
- Handle toolbar click events
- Enable/disable toolbar items programmatically
- Implement search toolbar items

## Table of Contents
- [Enable Toolbar](#enable-toolbar)
- [Built-in Toolbar Items](#built-in-toolbar-items)
- [Custom Toolbar Items](#custom-toolbar-items)
- [Toolbar Template](#toolbar-template)
- [ToolbarClick Event](#toolbarclick-event)
- [Enable/Disable Toolbar Items Programmatically](#enabledisable-toolbar-items-programmatically)
- [Search Toolbar Item](#search-toolbar-item)
- [Toolbar with Edit Options (Full CRUD)](#toolbar-with-edit-options-full-crud)

## Enable Toolbar

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Toolbar(new List<string> { "Add", "Edit", "Delete", "Update", "Cancel", "Search", "ExcelExport", "PdfExport" })
    .Columns(col => { /* ... */ })
    .Render()
```

## Built-in Toolbar Items

| Item | Description |
|------|-------------|
| `Add` | Open add row form |
| `Edit` | Edit selected row |
| `Delete` | Delete selected row |
| `Update` | Save current edit |
| `Cancel` | Cancel current edit |
| `Search` | Show search text box |
| `Print` | Print the grid |
| `ExcelExport` | Export to Excel |
| `PdfExport` | Export to PDF |
| `CsvExport` | Export to CSV |
| `ColumnChooser` | Open column chooser dialog |

## Custom Toolbar Items

Add custom buttons with `ToolbarItems` objects:

```cshtml
@{
    var toolbarItems = new List<object> {
        "Add", "Edit", "Delete",
        new { text = "Refresh", tooltipText = "Refresh Data", prefixIcon = "e-refresh", id = "refreshBtn" }
    };
}
@Html.EJS().Grid("Grid")
    .Toolbar(toolbarItems)
    .ToolbarClick("toolbarClick")
    .Columns(col => { /* ... */ })
    .Render()
```

```javascript
function toolbarClick(args) {
    if (args.item.id === 'refreshBtn') {
        var grid = document.getElementById('Grid').ej2_instances[0];
        grid.refresh();
    }
}
```

## Toolbar Template

Render a completely custom toolbar using a template:

```cshtml
@Html.EJS().Grid("Grid")
    .ToolbarTemplate("#toolbarTemplate")
    .Columns(col => { /* ... */ })
    .Render()
```

```html
<script id="toolbarTemplate" type="text/x-template">
    <div>
        <button onclick="addRecord()">Add</button>
        <button onclick="exportExcel()">Export</button>
    </div>
</script>
```

## ToolbarClick Event

Handle all toolbar item clicks in one event:

```cshtml
.ToolbarClick("onToolbarClick")
```

```javascript
function onToolbarClick(args) {
    var grid = document.getElementById('Grid').ej2_instances[0];
    switch(args.item.id) {
        case 'Grid_excelexport': grid.excelExport(); break;
        case 'Grid_pdfexport':  grid.pdfExport();   break;
        case 'Grid_csvexport':  grid.csvExport();   break;
        case 'Grid_print':      grid.print();       break;
    }
}
```

> Default toolbar item IDs follow the pattern: `{gridId}_{itemName}` (e.g., `Grid_excelexport`, `Grid_add`).

## Enable/Disable Toolbar Items Programmatically

```javascript
var grid = document.getElementById('Grid').ej2_instances[0];
grid.toolbarModule.enableItems(['Grid_add', 'Grid_edit'], false); // disable
grid.toolbarModule.enableItems(['Grid_add', 'Grid_edit'], true);  // enable
```

## Search Toolbar Item

The `Search` toolbar item shows a search input. Configure via `SearchSettings`:

```cshtml
.Toolbar(new List<string> { "Search" })
.SearchSettings(search => search.Fields(new List<string> { "CustomerID", "ShipCity" }).Operator("contains").IgnoreCase(true))
```

Search programmatically:
```javascript
grid.search('VINET');   // search for a term
grid.searchSettings.key = 'VINET'; // via property
```

## Toolbar with Edit Options (Full CRUD)

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Toolbar(new List<string> { "Add", "Edit", "Delete", "Update", "Cancel" })
    .EditSettings(edit => edit.AllowAdding(true).AllowEditing(true).AllowDeleting(true))
    .Columns(col => {
        col.Field("OrderID").IsPrimaryKey(true).HeaderText("Order ID").Width("100").Add();
        col.Field("CustomerID").HeaderText("Customer").Width("150").Add();
    })
    .Render()
```
