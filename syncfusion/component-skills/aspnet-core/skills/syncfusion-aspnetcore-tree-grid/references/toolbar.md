# Toolbar — Syncfusion ASP.NET Core TreeGrid

## Table of Contents
- [Toolbar — Built-in Items](#toolbar--built-in-items)
- [Custom Toolbar Items](#custom-toolbar-items)
- [Toolbar Click Handler](#toolbar-click-handler)
- [Disabling Toolbar Items](#disabling-toolbar-items)

---

## Toolbar — Built-in Items

Add a toolbar with built-in action buttons by assigning a list of item IDs to the `toolbar` property:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" childMapping="Children"
              treeColumnIndex="1"
              toolbar="@(new List<string>() {"Add","Edit","Delete","Update","Cancel","Search","ExcelExport","PdfExport","CsvExport","Print","ExpandAll","CollapseAll"})">
    <e-treegrid-editSettings allowAdding="true" allowEditing="true"
                             allowDeleting="true" mode="Row"></e-treegrid-editSettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   isPrimaryKey="true" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"  textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

**Available built-in toolbar items:**

| Item | Description | Requirement |
|------|-------------|-------------|
| `Add` | Add a new record | `allowAdding="true"` in editSettings |
| `Edit` | Edit selected record | `allowEditing="true"` in editSettings |
| `Delete` | Delete selected record | `allowDeleting="true"` in editSettings |
| `Update` | Save edits | Combined with `Edit` |
| `Cancel` | Cancel current edits | Combined with `Edit` |
| `Search` | Show search/find input box | No requirement |
| `ExcelExport` | Export to Excel | `allowExcelExport="true"` |
| `PdfExport` | Export to PDF | `allowPdfExport="true"` |
| `CsvExport` | Export to CSV | `allowExcelExport="true"` |
| `Print` | Print the grid | `allowPrinting="true"` |
| `ExpandAll` | Expand all tree nodes | No requirement |
| `CollapseAll` | Collapse all tree nodes | No requirement |
| `Indent` | Indent selected row (increase level) | Hierarchy structure required |
| `Outdent` | Outdent selected row (decrease level) | Hierarchy structure required |

---

## Custom Toolbar Items

Add custom buttons alongside or instead of built-in items by defining toolbar items as objects:

```cshtml
@{
    var toolbarItems = new List<object>()
    {
        new { text = "Export Data", tooltipText = "Export to Custom Format", prefixIcon = "e-export", id = "customExport" },
        new { text = "Refresh Data", tooltipText = "Refresh from Server", prefixIcon = "e-refresh", id = "refreshData" },
        "Search",
        "ExcelExport"
    };
}

<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" childMapping="Children"
              treeColumnIndex="1" toolbar="@toolbarItems" toolbarClick="onToolbarClick">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

**Custom Item Properties:**

| Property | Type | Description |
|---|---|---|
| `text` | string | Display text for the button |
| `tooltipText` | string | Tooltip shown on hover |
| `prefixIcon` | string | CSS class for icon (e.g., `e-export`, `e-refresh`, `e-save`) |
| `id` | string | Unique identifier for the button (used in click handler) |
| `align` | string | Alignment: `Left` (default) or `Right` |

---

## Toolbar Click Handler

Handle built-in and custom toolbar button clicks using the `toolbarClick` event:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" childMapping="Children"
              treeColumnIndex="1" allowExcelExport="true" allowPdfExport="true"
              toolbar="@(new List<string>() {"Add","Edit","Delete","ExcelExport","PdfExport"})"
              toolbarClick="toolbarClickHandler">
    <e-treegrid-editSettings allowAdding="true" allowEditing="true"
                             allowDeleting="true" mode="Dialog"></e-treegrid-editSettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   isPrimaryKey="true" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function toolbarClickHandler(args) {
        var grid = document.getElementById('TreeGrid').ej2_instances[0];
        
        // Handle built-in export items
        if (args.item.id === 'TreeGrid_excelexport') {
            console.log('Exporting to Excel...');
            grid.excelExport();
        }
        else if (args.item.id === 'TreeGrid_pdfexport') {
            console.log('Exporting to PDF...');
            grid.pdfExport();
        }
        
        // Handle custom toolbar items
        if (args.item.id === 'customExport') {
            console.log('Custom export clicked');
            // Implement custom export logic
            var data = grid.getCurrentViewRecords();
            console.log('Data to export:', data);
        }
        else if (args.item.id === 'refreshData') {
            console.log('Refreshing data...');
            grid.refresh();
        }
    }
</script>
```

**Important Notes:**
- Built-in toolbar item IDs follow the pattern `{gridId}_{itemname}` (e.g., `TreeGrid_excelexport`, `TreeGrid_add`)
- Use `args.item.id` to identify which button was clicked
- Use `args.item.text` to get the button's display text

---

## Disabling Toolbar Items

Disable specific toolbar items dynamically using the `enableItems` method:

```javascript
var treeGrid = document.getElementById('TreeGrid').ej2_instances[0];

// Disable specific toolbar buttons
treeGrid.toolbarModule.enableItems(['TreeGrid_delete', 'TreeGrid_edit'], false);

// Enable toolbar buttons
treeGrid.toolbarModule.enableItems(['TreeGrid_delete', 'TreeGrid_edit'], true);

// Disable all toolbar items
treeGrid.toolbarModule.enableItems(treeGrid.toolbarModule.getToolbarItems(), false);
```

**Disable based on row selection:**

```cshtml
<ejs-treegrid id="TreeGrid" ... rowSelected="onRowSelected" rowDeselected="onRowDeselected">
    ...
</ejs-treegrid>

<script>
    function onRowSelected(args) {
        var treeGrid = document.getElementById('TreeGrid').ej2_instances[0];
        // Enable edit and delete buttons when row is selected
        treeGrid.toolbarModule.enableItems(['TreeGrid_edit', 'TreeGrid_delete'], true);
    }
    
    function onRowDeselected(args) {
        var treeGrid = document.getElementById('TreeGrid').ej2_instances[0];
        // Disable edit and delete buttons when row is deselected
        treeGrid.toolbarModule.enableItems(['TreeGrid_edit', 'TreeGrid_delete'], false);
    }
</script>
```

---

## Best Practices

1. **Meaningful Icons**: Use standard FontAwesome or EJ2 icon classes for recognition
2. **Tooltip Text**: Always provide tooltips for custom buttons
3. **Item Ordering**: Place most-used actions first (Add, Edit, Delete)
4. **Separators**: Use separators (`"-"`) to group related items logically
5. **Responsive**: Test toolbar layout on mobile devices with touch targets
6. **Disabled State**: Disable buttons when actions are not applicable
7. **Edit Mode Integration**: Ensure toolbar buttons work with your chosen edit mode (Cell, Row, Dialog, Batch)
