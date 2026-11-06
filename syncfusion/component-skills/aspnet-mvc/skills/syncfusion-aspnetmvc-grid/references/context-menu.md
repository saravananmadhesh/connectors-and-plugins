# Context Menu in ASP.NET MVC Grid

Right-click anywhere in the grid to display a context menu with built-in or custom actions.

## When to Use This

Use this reference when you need to:
- Add right-click context menus to grid areas
- Enable quick actions like edit, delete, copy, and export
- Create custom context menu items
- Handle context menu events
- Conditionally show/hide menu items

## Table of Contents
- [Enable Context Menu](#enable-context-menu)
- [Built-in Context Menu Items](#built-in-context-menu-items)
- [Custom Context Menu Items](#custom-context-menu-items)
- [Enable/Disable Context Menu Items](#enabledisable-context-menu-items)
- [Show Context Menu on Left Click](#show-context-menu-on-left-click)
- [Events](#events)
- [Target Property](#target-property)

## Enable Context Menu

Pass a list of built-in item strings to `ContextMenuItems`:

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .AllowSorting(true)
    .AllowGrouping(true)
    .AllowPaging(true)
    .AllowExcelExport(true)
    .AllowPdfExport(true)
    .EditSettings(edit => edit.AllowAdding(true).AllowEditing(true).AllowDeleting(true))
    .ContextMenuItems(new List<object> {
        "AutoFit", "AutoFitAll", "SortAscending", "SortDescending",
        "Copy", "Edit", "Delete", "Save", "Cancel",
        "PdfExport", "ExcelExport", "CsvExport",
        "FirstPage", "PrevPage", "LastPage", "NextPage"
    })
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").IsPrimaryKey(true).Width("100").Add();
        col.Field("CustomerID").HeaderText("Customer").Width("150").Add();
    })
    .Render()
```

## Built-in Context Menu Items

### Header Area
| Item | Description |
|------|-------------|
| `AutoFit` | Fit current column to content width |
| `AutoFitAll` | Fit all columns to content width |
| `Group` | Group by current column |
| `Ungroup` | Remove grouping for current column |
| `SortAscending` | Sort current column ascending |
| `SortDescending` | Sort current column descending |

### Content Area
| Item | Description |
|------|-------------|
| `Edit` | Edit the selected record |
| `Delete` | Delete the selected record |
| `Save` | Save changes to edited record |
| `Cancel` | Cancel edit and revert changes |
| `Copy` | Copy selected rows to clipboard |
| `PdfExport` | Export grid data as PDF |
| `ExcelExport` | Export grid data as Excel |
| `CsvExport` | Export grid data as CSV |

### Pager Area
| Item | Description |
|------|-------------|
| `FirstPage` | Navigate to first page |
| `PrevPage` | Navigate to previous page |
| `LastPage` | Navigate to last page |
| `NextPage` | Navigate to next page |

## Custom Context Menu Items

Add custom items alongside built-in items using `ContextMenuItemModel`:

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .ContextMenuItems(new List<object> {
        "Copy",
        new { text = "Copy with Headers", target = ".e-content", id = "copywithheader" },
        new { text = "Export to CSV", target = ".e-content", id = "exportcsv" }
    })
    .ContextMenuClick("contextMenuClick")
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").Width("100").Add();
        col.Field("CustomerID").HeaderText("Customer").Width("150").Add();
    })
    .Render()

<script>
function contextMenuClick(args) {
    var grid = document.getElementById("Grid").ej2_instances[0];
    if (args.item.id === 'copywithheader') {
        grid.copy(true);  // copy with header
    } else if (args.item.id === 'exportcsv') {
        grid.csvExport();
    }
}
</script>
```

## Enable/Disable Context Menu Items

Use the context menu's `enableItems` method:

```javascript
function onSwitchChange(args) {
    var grid = document.getElementById("Grid").ej2_instances[0];
    var contextMenuObj = grid.contextMenuModule.contextMenu;
    if (args.checked) {
        contextMenuObj.enableItems(['Copy'], true);   // enable
    } else {
        contextMenuObj.enableItems(['Copy'], false);  // disable
    }
}
```

## Show Context Menu on Left Click

Override the default right-click behavior to open on left click:

```javascript
function created() {
    var grid = document.getElementById("Grid").ej2_instances[0];
    // Prevent default right-click context menu
    grid.element.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    // Open on left click
    grid.element.addEventListener('click', function(e) {
        var contextMenu = grid.contextMenuModule.contextMenu;
        contextMenu.open(e.pageY, e.pageX);
    });
}
```

## Events

| Event | Description |
|-------|-------------|
| `ContextMenuOpen` | Fires before the context menu opens — use to show/hide items |
| `ContextMenuClick` | Fires when a context menu item is clicked |

```javascript
function contextMenuOpen(args) {
    // Hide 'Delete' for specific rows
    if (args.rowInfo && args.rowInfo.rowData &&
        args.rowInfo.rowData['OrderID'] === 10248) {
        args.items = args.items.filter(item => item.id !== 'Delete');
    }
}
```

## Target Property

Restrict a custom context menu item to appear only in specific grid areas:

```javascript
{ text = "Header Action", target = ".e-headercell", id = "headeraction" }
{ text = "Content Action", target = ".e-content", id = "contentaction" }
{ text = "Pager Action", target = ".e-pager", id = "pageraction" }
```
