# Context Menu — Syncfusion ASP.NET Core TreeGrid

## Table of Contents
- [Context Menu — Default Items](#context-menu--default-items)
- [Custom Context Menu Items](#custom-context-menu-items)
- [Contextual Item Visibility with Target](#contextual-item-visibility-with-target)
- [Context Menu Click Handler](#context-menu-click-handler)
- [Enable/Disable Context Menu Items Dynamically](#enabledisable-context-menu-items-dynamically)
- [Advanced Context Menu Scenarios](#advanced-context-menu-scenarios)

---

## Context Menu — Default Items

Enable the right-click context menu by defining `contextMenuItems` with default item IDs. The TreeGrid provides a rich set of pre-built context menu actions:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" childMapping="Children"
              treeColumnIndex="1" allowPdfExport="true" allowExcelExport="true"
              contextMenuItems="@(new List<object>() {"Edit", "Delete", "Save", "Cancel", "PdfExport", "ExcelExport", "CsvExport", "AutoFit", "AutoFitAll", "SortAscending", "SortDescending", "FirstPage", "PrevPage", "LastPage", "NextPage", "AddRow"})">
    <e-treegrid-editSettings allowAdding="true" allowEditing="true" allowDeleting="true" mode="Row"></e-treegrid-editSettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   isPrimaryKey="true" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

**Available default context menu items:**

| Item | Description | Requirement |
|---|---|---|
| `AutoFit` | Auto fit the current column width | No requirement |
| `AutoFitAll` | Auto fit all column widths | No requirement |
| `Edit` | Edit the current record | `allowEditing="true"` in editSettings |
| `Delete` | Delete the current record | `allowDeleting="true"` in editSettings |
| `Save` | Save the edited record | Combined with `Edit` |
| `Cancel` | Cancel the edited state | Combined with `Edit` |
| `PdfExport` | Export the TreeGrid data as PDF | `allowPdfExport="true"` |
| `ExcelExport` | Export the TreeGrid data as Excel | `allowExcelExport="true"` |
| `CsvExport` | Export the TreeGrid data as CSV | `allowExcelExport="true"` |
| `SortAscending` | Sort the current column ascending | `allowSorting="true"` |
| `SortDescending` | Sort the current column descending | `allowSorting="true"` |
| `FirstPage` | Navigate to the first page | `allowPaging="true"` |
| `PrevPage` | Navigate to the previous page | `allowPaging="true"` |
| `LastPage` | Navigate to the last page | `allowPaging="true"` |
| `NextPage` | Navigate to the next page | `allowPaging="true"` |
| `AddRow` | Add a new row to the TreeGrid | `allowAdding="true"` in editSettings |
| `Indent` | Indent the selected row (increase hierarchy level) | Hierarchy structure required |
| `Outdent` | Outdent the selected row (decrease hierarchy level) | Hierarchy structure required |

---

## Custom Context Menu Items

Mix custom items with built-in items by defining context menu items as objects:

```cshtml
@{
    var contextItems = new List<object>()
    {
        new { text = "Expand the Row", target = ".e-content", id = "expandrow" },
        new { text = "Collapse the Row", target = ".e-content", id = "collapserow" },
        "Edit",
        "Delete",
        "PdfExport"
    };
}

<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" childMapping="Children"
              treeColumnIndex="1" contextMenuItems="@contextItems"
              contextMenuOpen="onContextMenuOpen"
              contextMenuClick="onContextMenuClick"
              allowPdfExport="true">
    <e-treegrid-editSettings allowEditing="true" allowDeleting="true" mode="Row"></e-treegrid-editSettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   isPrimaryKey="true" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function onContextMenuOpen(args) {
        var treeGrid = document.getElementById("TreeGrid").ej2_instances[0];
        
        // Hide menu for rows without children
        if (ej.base.isNullOrUndefined(ej.base.getValue('hasChildRecords', treeGrid.getRowObjectFromUID(args.rowInfo.row.getAttribute('data-uid')).data))) {
            args.cancel = true;
        }
    }
    
    function onContextMenuClick(args) {
        var treeGrid = document.getElementById("TreeGrid").ej2_instances[0];
        
        if (args.item.id === "collapserow") {
            treeGrid.collapseRow(treeGrid.getSelectedRows()[0], treeGrid.getSelectedRecords()[0]);
        }
        else if (args.item.id === "expandrow") {
            treeGrid.expandRow(treeGrid.getSelectedRows()[0], treeGrid.getSelectedRecords()[0]);
        }
    }
</script>
```

**Custom Item Properties:**

| Property | Type | Description |
|---|---|---|
| `text` | string | Display text for the menu item |
| `id` | string | Unique identifier (used in click handler) |
| `target` | string | CSS selector for where menu appears (`.e-headercell`, `.e-content`, `.e-gridheader`) |
| `iconCss` | string | CSS class for icon before text |
| `separator` | boolean | Set to `true` to create a separator line |

---

## Contextual Item Visibility with Target

Use the `target` property to show/hide context menu items based on where the right-click occurred:

```cshtml
@{
    var contextItems = new List<object>()
    {
        new { text = "Edit Column", target = ".e-headercell", id = "editcol" },
        new { text = "Edit Record", target = ".e-content", id = "editrow" },
        new { text = "Delete Record", target = ".e-content", id = "deleterow" },
        new { text = "Sort Ascending", target = ".e-headercell", id = "sortasc" },
        new { text = "Sort Descending", target = ".e-headercell", id = "sortdesc" }
    };
}

<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" childMapping="Children"
              treeColumnIndex="1" contextMenuItems="@contextItems"
              contextMenuClick="onContextMenuClick"
              allowSorting="true">
    <e-treegrid-editSettings allowEditing="true" allowDeleting="true" mode="Row"></e-treegrid-editSettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   isPrimaryKey="true" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

**Target Values:**
- `.e-headercell` — Context menu appears in column header
- `.e-content` — Context menu appears in grid content/data area
- `.e-gridheader` — Context menu appears in grid header row

---

## Context Menu Click Handler

Handle context menu item clicks with the `contextMenuClick` event to implement custom logic:

```cshtml
<ejs-treegrid id="TreeGrid" ... contextMenuClick="onContextMenuClick">
    ...
</ejs-treegrid>

<script>
    function onContextMenuClick(args) {
        var treeGrid = document.getElementById('TreeGrid').ej2_instances[0];
        
        if (args.item.id === 'editrow') {
            treeGrid.startEdit(args.rowInfo.row);
        }
        else if (args.item.id === 'deleterow') {
            treeGrid.deleteRecord(args.rowInfo.row);
        }
        else if (args.item.id === 'expandrow') {
            treeGrid.expandRow(args.rowInfo.row, args.rowInfo.rowData);
        }
        else if (args.item.id === 'collapserow') {
            treeGrid.collapseRow(args.rowInfo.row, args.rowInfo.rowData);
        }
    }
</script>
```

**Event Arguments:**

| Property | Description |
|---|---|
| `item` | Context menu item object (id, text, etc.) |
| `rowInfo` | Row information (row element, rowData, rowIndex) |
| `column` | Column information (fieldName, headerText, etc.) |
| `element` | HTML element of the clicked menu item |

---

## Enable/Disable Context Menu Items Dynamically

Control which context menu items are available based on row data using `contextMenuOpen` event:

```cshtml
@{
    var contextItems = new List<object>()
    {
        new { text = "Edit Record", target = ".e-content", id = "Edit_record" },
        new { text = "Delete Record", target = ".e-content", id = "Delete_record" }
    };
}

<ejs-treegrid id="TreeGrid" dataSource="@data" contextMenuOpen="ContextMenuOpen"
              contextMenuClick="ContextMenuClick" contextMenuItems="@contextItems"
              allowPaging="true" childMapping="Children" treeColumnIndex="1">
    <e-treegrid-editSettings allowEditing="true" allowDeleting="true" mode="Row"></e-treegrid-editSettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   isPrimaryKey="true" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function ContextMenuOpen(args) {
        var treeGrid = document.getElementById('TreeGrid').ej2_instances[0];
        
        // Check if row has child records (is a parent)
        if (args.rowInfo.rowData.hasChildRecords == true) {
            // Enable edit, disable delete for parent rows
            treeGrid.contextMenuModule.contextMenu.enableItems(['Edit_record'], true);
            treeGrid.contextMenuModule.contextMenu.enableItems(['Delete_record'], false);
        } else {
            // Enable both edit and delete for child rows
            treeGrid.contextMenuModule.contextMenu.enableItems(['Edit_record'], true);
            treeGrid.contextMenuModule.contextMenu.enableItems(['Delete_record'], true);
        }
    }
    
    function ContextMenuClick(args) {
        var treeGrid = document.getElementById('TreeGrid').ej2_instances[0];
        
        if (args.item.id === "Edit_record") {
            treeGrid.startEdit(args.rowInfo.row);
        }
        else if (args.item.id === "Delete_record") {
            treeGrid.deleteRecord(args.rowInfo.row);
        }
    }
</script>
```

---

## Advanced Context Menu Scenarios

### Hierarchy-Aware Menu (Expand/Collapse)

```cshtml
@{
    var contextItems = new List<object>()
    {
        new { text = "Expand Row", target = ".e-content", id = "expandrow" },
        new { text = "Collapse Row", target = ".e-content", id = "collapserow" },
        "Edit",
        "Delete"
    };
}

<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" childMapping="Children"
              treeColumnIndex="1" contextMenuItems="@contextItems"
              contextMenuOpen="onContextMenuOpen"
              contextMenuClick="onContextMenuClick">
    <e-treegrid-editSettings allowEditing="true" allowDeleting="true" mode="Dialog"></e-treegrid-editSettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" isPrimaryKey="true" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function onContextMenuOpen(args) {
        var treeGrid = document.getElementById("TreeGrid").ej2_instances[0];
        var uid = args.rowInfo.row.getAttribute('data-uid');
        var rowObj = treeGrid.getRowObjectFromUID(uid);
        
        // Hide if no children
        if (!rowObj.data.hasChildRecords) {
            args.cancel = true;
            return;
        }
        
        // Show/hide expand/collapse based on current state
        var isExpanded = rowObj.data.expanded;
        document.querySelectorAll('li#expandrow')[0].style.display = isExpanded ? 'none' : 'block';
        document.querySelectorAll('li#collapserow')[0].style.display = isExpanded ? 'block' : 'none';
    }
    
    function onContextMenuClick(args) {
        var treeGrid = document.getElementById("TreeGrid").ej2_instances[0];
        if (args.item.id === "collapserow") {
            treeGrid.collapseRow(treeGrid.getSelectedRows()[0], treeGrid.getSelectedRecords()[0]);
        }
        else if (args.item.id === "expandrow") {
            treeGrid.expandRow(treeGrid.getSelectedRows()[0], treeGrid.getSelectedRecords()[0]);
        }
    }
</script>
```

---

## Best Practices

1. **Meaningful IDs**: Use descriptive IDs that reflect the action (e.g., `expandrow`, `deleterow`)
2. **Show/Hide Logic**: Use `target` to show menu items only where they're relevant
3. **Enable/Disable**: Disable menu items when actions aren't applicable based on row state
4. **Hierarchy Awareness**: Check `hasChildRecords` and `expanded` properties in TreeGrid-specific context menu logic
5. **Keyboard Support**: Context menu respects keyboard navigation (accessible with Shift+F10)
6. **Visual Feedback**: Use icons and separators to organize related menu items
7. **Performance**: Keep `contextMenuOpen` handlers lightweight to avoid lag