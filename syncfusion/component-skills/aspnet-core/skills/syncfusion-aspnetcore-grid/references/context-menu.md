# Context Menu — Syncfusion ASP.NET Core Grid

## Table of Contents
- [Enable Context Menu](#enable-context-menu)
- [Built-in Context Menu Items](#built-in-context-menu-items)
- [Custom Context Menu Items](#custom-context-menu-items)
- [Context Menu Click Event](#context-menu-click-event)
- [Disable Context Menu Items Conditionally](#disable-context-menu-items-conditionally)

## When to Use This

- Add right-click context menus to grid rows
- Provide quick access to common actions
- Implement custom menu items
- Handle context menu events
- Conditionally enable/disable menu options

---

## Enable Context Menu

Add `contextMenuItems` property with a list of item names. Right-click a row or header to open the menu:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          contextMenuItems="@(new List<object>() { "AutoFit","AutoFitAll","SortAscending","SortDescending","Copy","Edit","Delete","Save","Cancel","PdfExport","ExcelExport","CsvExport","FirstPage","PrevPage","LastPage","NextPage" })">
```

## Built-in Context Menu Items

| Item Key | Where Available | Action |
|---|---|---|
| `AutoFit` | Header | Auto-fit selected column |
| `AutoFitAll` | Header | Auto-fit all columns |
| `SortAscending` | Header | Sort column ascending |
| `SortDescending` | Header | Sort column descending |
| `Copy` | Content | Copy selected rows |
| `Edit` | Content | Edit selected row |
| `Delete` | Content | Delete selected row |
| `Save` | Content (editing) | Save current edit |
| `Cancel` | Content (editing) | Cancel current edit |
| `PdfExport` | Pager/Content | Export to PDF |
| `ExcelExport` | Pager/Content | Export to Excel |
| `CsvExport` | Pager/Content | Export to CSV |
| `FirstPage` | Pager | Go to first page |
| `PrevPage` | Pager | Go to previous page |
| `LastPage` | Pager | Go to last page |
| `NextPage` | Pager | Go to next page |

---

## Custom Context Menu Items

Add custom items by mixing string (built-in) and object (custom) entries:

```csharp
ViewBag.contextMenuItems = new List<object>() {
    "Copy",
    new { text = "View Details", target = ".e-content", id = "viewdetails" },
    new { text = "Mark as Shipped", target = ".e-content", id = "markshipped" }
};
```

## Context Menu Click Event

Handle clicks on context menu items using `contextMenuClick`:

```cshtml
<ejs-grid id="Grid" contextMenuClick="contextMenuClickFn"
          contextMenuItems="@(new List<object>() { "Copy", new { text="Custom Action", id="customAction" } })">
```

```javascript
function contextMenuClickFn(args) {
    var grid = document.getElementById('Grid').ej2_instances[0];
    if (args.item.id === 'customAction') {
        var selectedData = grid.getSelectedRecords();
        console.log('Custom action on:', selectedData);
    }
}
```

## Disable Context Menu Items Conditionally

Use `contextMenuOpen` event to dynamically disable/enable items before the menu renders:

```javascript
function contextMenuOpen(args) {
    // Disable 'Edit' if the row is verified
    if (args.rowInfo && args.rowInfo.rowData && args.rowInfo.rowData.Verified) {
        args.element.querySelector('#Grid_contextmenu_Edit').closest('li').classList.add('e-disabled');
    }
}
```
