# Toolbar — Syncfusion ASP.NET Core Grid

## Table of Contents
- [Built-in Toolbar Items](#built-in-toolbar-items)
- [Custom Toolbar Items](#custom-toolbar-items)
- [Toolbar with Editing](#toolbar-with-editing)
- [Toolbar Click Event](#toolbar-click-event)
- [Disable Toolbar Items](#disable-toolbar-items)
- [Toolbar Template](#toolbar-template)

## When to Use This

- Add toolbar buttons to grid header
- Implement built-in actions (Add, Edit, Delete, Export)
- Create custom toolbar items
- Configure toolbar events
- Conditionally enable/disable toolbar buttons

---

## Built-in Toolbar Items

Add the `toolbar` property with a list of built-in item names:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          toolbar="@(new List<string>() { "Add","Edit","Delete","Update","Cancel","Search","Print","ExcelExport","PdfExport","CsvExport","ColumnChooser" })">
```

| Item Key | Action |
|---|---|
| `Add` | Add new record |
| `Edit` | Edit selected record |
| `Delete` | Delete selected record |
| `Update` | Save in-progress edit |
| `Cancel` | Cancel in-progress edit |
| `Search` | Show search text box |
| `Print` | Print grid |
| `ExcelExport` | Export to Excel |
| `PdfExport` | Export to PDF |
| `CsvExport` | Export to CSV |
| `ColumnChooser` | Show/hide column dialog |

---

## Custom Toolbar Items

Mix built-in items with custom buttons using `ItemModel`:

C# definition of custom item:
```csharp
ViewBag.Toolbaritems = new List<ItemModel>()
{
    new ItemModel { Text = "Expand All", TooltipText = "Expand All", PrefixIcon = "e-expand", Id = "expandall" },
    new ItemModel { Text = "Collapse All", TooltipText = "Collapse All", PrefixIcon = "e-collapse", Id = "collapseall" }
};
```

Then use `toolbar="@ViewBag.Toolbaritems"` on `<ejs-grid>`.

---

## Toolbar with Editing

Common pattern combining CRUD toolbar items with `editSettings`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          toolbar="@(new List<string>() { "Add","Edit","Delete","Update","Cancel" })">
    <e-grid-editSettings allowAdding="true" allowEditing="true" allowDeleting="true" mode="Normal"></e-grid-editSettings>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" isPrimaryKey="true" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID" width="150"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

---

## Toolbar Click Event

Handle toolbar button clicks with `toolbarClick`:

```cshtml
<ejs-grid id="Grid" toolbarClick="toolbarClickHandler"
          allowExcelExport="true" allowPdfExport="true"
          toolbar="@(new List<string>() { "ExcelExport","PdfExport","expandall","collapseall" })">
```

```javascript
function toolbarClickHandler(args) {
    var grid = document.getElementById('Grid').ej2_instances[0];
    if (args.item.id === 'Grid_excelexport') {
        grid.excelExport();
    }
    if (args.item.id === 'Grid_pdfexport') {
        grid.pdfExport();
    }
    if (args.item.id === 'expandall') {
        grid.detailRowModule.expandAll();
    }
}
```

> The auto-generated ID for built-in items is `{gridID}_{itemKey}` (e.g., `Grid_excelexport`). Custom item IDs are whatever you set in `ItemModel.Id`.

---

## Disable Toolbar Items

Use `enableItems()` method to enable/disable toolbar items:

```javascript
var grid = document.getElementById('Grid').ej2_instances[0];
grid.toolbarModule.enableItems(['Grid_edit', 'Grid_delete'], false); // disable
grid.toolbarModule.enableItems(['Grid_edit', 'Grid_delete'], true);  // enable
```

---

## Toolbar Template

Define a completely custom toolbar using `toolbarTemplate` property with an inline template.
