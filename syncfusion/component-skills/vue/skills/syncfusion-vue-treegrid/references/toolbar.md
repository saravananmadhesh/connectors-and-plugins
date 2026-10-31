# Toolbar

## Table of Contents
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Module Setup](#module-setup)
- [Built-in Toolbar Items](#built-in-toolbar-items)
- [Custom Toolbar Items](#custom-toolbar-items)
- [Enable or Disable Toolbar Items](#enable-or-disable-toolbar-items)


## When to Use

Use toolbar functionality when you need to:

| Use Case | Built-in Items | Custom Items |
|----------|----------------|--------------|
| **Quick Row Operations** | Add, Edit, Delete, Update, Cancel | - |
| **Data Export** | ExcelExport, PdfExport, WordExport, CsvExport | - |
| **Manage Hierarchy** | ExpandAll, CollapseAll, Indent, Outdent | - |
| **Search Data** | Search | - |
| **Print Grid** | Print | - |
| **Custom Actions** | - | Custom button with icon |
| **Filter/Report** | - | Filter button, Report button |
| **Refresh Data** | - | Refresh button |

## Mandatory Rules

Before implementing toolbar:
- ✓ **Toolbar Module**: Inject Toolbar module in provide statement
- ✓ **toolbar Property**: Define as array of strings (built-in items) or ItemModel objects (custom)
- ✓ **Module Requirements**: Each built-in item requires specific modules (Edit for Add/Edit, etc.)
- ✓ **toolbar Click Handler**: Implement :toolbarClick event for custom items
- ✓ **Item IDs**: Unique identifiers for custom items to handle in events

## Module Setup

Enable toolbar in TreeGrid by injecting the **Toolbar** module:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    childMapping="subtasks"
    :treeColumnIndex="1"
    :toolbar="toolbarItems"
    height="270px">
  </ejs-treegrid>
</template>

<script setup>
import { provide, ref } from 'vue';
import { TreeGridComponent as EjsTreegrid, Toolbar, Filter, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';

const data = ref([
  { taskID: 1, taskName: 'Planning', startDate: '03/02/2024', duration: 5, subtasks: [] },
  { taskID: 2, taskName: 'Development', startDate: '03/03/2024', duration: 10, subtasks: [] }
]);

const toolbarItems = ref(['Print', 'Search']);

provide('treegrid', [Toolbar, Filter]);
</script>
```

## Built-in Toolbar Items

14 pre-configured toolbar items available:

| Item | ID | Description | Required Module | Action |
|------|---|----|-----------|--------|
| **ExpandAll** | expandall | Expand all parent rows | - | Auto-expands all hierarchy |
| **CollapseAll** | collapseall | Collapse all parent rows | - | Auto-collapses all hierarchy |
| **Add** | add | Add new row | Edit | Opens new row for input |
| **Edit** | edit | Edit selected row | Edit | Opens selected row for edit |
| **Update** | update | Save changes | Edit | Commits edits to grid |
| **Delete** | delete | Delete selected row | Edit | Removes row from grid |
| **Cancel** | cancel | Cancel edit mode | Edit | Discards unsaved changes |
| **Search** | search | Open search box | Filter | Searches all visible columns |
| **Print** | print | Print grid | Print | Opens print dialog |
| **ExcelExport** | excelexport | Export to Excel | ExcelExport | Downloads .xlsx file |
| **PdfExport** | pdfexport | Export to PDF | PdfExport | Downloads .pdf file |
| **WordExport** | wordexport | Export to Word | WordExport | Downloads .docx file |
| **CsvExport** | csvexport | Export to CSV | - | Downloads .csv file |

### Basic Toolbar with Built-in Items

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    childMapping="subtasks"
    :treeColumnIndex="1"
    :toolbar="toolbarItems"
    height="270px">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width="90" textAlign="Right"></e-column>
      <e-column field="taskName" headerText="Task Name" width="160"></e-column>
      <e-column field="startDate" headerText="Start Date" width="90" format="yMd" textAlign="Right"></e-column>
      <e-column field="duration" headerText="Duration" width="80" textAlign="Right"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { provide, ref } from 'vue';
import { TreeGridComponent as EjsTreegrid, Toolbar, Filter, Print, ExcelExport, PdfExport, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';

const data = ref([...]);

const toolbarItems = ref([
  'ExpandAll',      // Expand all rows
  'CollapseAll',    // Collapse all rows
  'Add',            // Add new row (needs Edit module)
  'Edit',           // Edit selected (needs Edit module)
  'Delete',         // Delete selected (needs Edit module)
  'Update',         // Save changes (needs Edit module)
  'Cancel',         // Cancel edit (needs Edit module)
  'Search',         // Search box (needs Filter module)
  'Print',          // Print (needs Print module)
  'ExcelExport',    // Export Excel (needs ExcelExport module)
  'PdfExport'       // Export PDF (needs PdfExport module)
]);

// Requires multiple modules for all items
provide('treegrid', [Toolbar, Filter, Print, ExcelExport, PdfExport]);
</script>
```

## Custom Toolbar Items

Add custom buttons with icons and custom actions:

```vue
<template>
  <ejs-treegrid 
    ref="gridInstance"
    :dataSource="data" 
    childMapping="subtasks"
    :treeColumnIndex="1"
    :toolbar="toolbarItems"
    :toolbarClick="onToolbarClick"
    height="270px">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width="90" textAlign="Right"></e-column>
      <e-column field="taskName" headerText="Task Name" width="160"></e-column>
      <e-column field="startDate" headerText="Start Date" width="90" format="yMd" textAlign="Right"></e-column>
      <e-column field="duration" headerText="Duration" width="80" textAlign="Right"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { provide, ref } from 'vue';
import { TreeGridComponent as EjsTreegrid, Toolbar, Filter, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';

const gridInstance = ref(null);
const data = ref([...]);

const toolbarItems = ref([
  'Search',
  {
    text: 'Refresh',
    tooltipText: 'Refresh Data',
    prefixIcon: 'e-icons e-refresh',
    id: 'refresh',
    align: 'Left'
  },
  {
    text: 'Report',
    tooltipText: 'Generate Report',
    prefixIcon: 'e-icons e-print',
    id: 'report',
    align: 'Left'
  },
  {
    text: 'Archive',
    tooltipText: 'Archive Selected Rows',
    prefixIcon: 'e-icons e-folder',
    id: 'archive',
    align: 'Left'
  },
  {
    text: 'Settings',
    tooltipText: 'Grid Settings',
    prefixIcon: 'e-icons e-settings',
    id: 'settings',
    align: 'Right'  // Right-aligned
  }
]);

const onToolbarClick = (args) => {
  if (args.item.id === 'refresh') {
    gridInstance.value.refresh();
    console.log('Grid refreshed');
  }
  else if (args.item.id === 'report') {
    generateReport();
  }
  else if (args.item.id === 'archive') {
    archiveSelected();
  }
  else if (args.item.id === 'settings') {
    openSettings();
  }
};

const generateReport = () => {
  const selectedRecords = gridInstance.value.getSelectedRecords();
  console.log('Generating report for:', selectedRecords);
};

const archiveSelected = () => {
  const selectedRecords = gridInstance.value.getSelectedRecords();
  if (selectedRecords.length === 0) {
    alert('Please select rows to archive');
    return;
  }
  console.log('Archiving:', selectedRecords);
};

const openSettings = () => {
  console.log('Opening settings...');
};

provide('treegrid', [Toolbar, Filter]);
</script>
```

### Custom Toolbar Item Properties

Configure custom toolbar buttons:

| Property | Type | Description | Example |
|----------|------|-----------|---------|
| **text** | string | Button display text | 'Refresh' |
| **tooltipText** | string | Hover tooltip message | 'Refresh Data' |
| **prefixIcon** | string | Icon CSS class (Syncfusion icons) | 'e-icons e-refresh' |
| **id** | string | Unique identifier for click handler | 'refresh' |
| **align** | string | Position in toolbar: 'Left' or 'Right' | 'Left' |
| **disabled** | boolean | Enable/disable button state | false |

```javascript
const customItem = {
  text: 'Custom Button',
  tooltipText: 'Click for action',
  prefixIcon: 'e-icons e-add',
  id: 'custom-btn',
  align: 'Left',
  disabled: false
};
```

### Toolbar Icons

Use Syncfusion icon classes in prefixIcon:

```javascript
const toolbarItems = [
  { text: 'Add', prefixIcon: 'e-icons e-add' },
  { text: 'Edit', prefixIcon: 'e-icons e-edit' },
  { text: 'Delete', prefixIcon: 'e-icons e-delete' },
  { text: 'Refresh', prefixIcon: 'e-icons e-refresh' },
  { text: 'Download', prefixIcon: 'e-icons e-download' },
  { text: 'Upload', prefixIcon: 'e-icons e-upload' },
  { text: 'Export', prefixIcon: 'e-icons e-export-excel' },
  { text: 'Search', prefixIcon: 'e-icons e-search' },
  { text: 'Settings', prefixIcon: 'e-icons e-settings' },
  { text: 'Help', prefixIcon: 'e-icons e-help' },
  { text: 'Folder', prefixIcon: 'e-icons e-folder' },
  { text: 'Mail', prefixIcon: 'e-icons e-mail' }
];
```

### Toolbar Item Alignment

Control toolbar item position:

```javascript
const toolbarItems = [
  { text: 'Left Item', id: 'left-btn', align: 'Left' },    // Default position
  { text: 'Right Item 1', id: 'right-btn1', align: 'Right' }, // Right side
  { text: 'Right Item 2', id: 'right-btn2', align: 'Right' }  // Right side
];

// Layout: [Left Item] ... [Right Item 1] [Right Item 2]
```

## Enable or Disable Toolbar Items

Toggle toolbar button state programmatically:

```vue
  // Enable toolbar items using toolbar module
  gridInstance.value.ej2Instances.toolbarModule.enableItems(
    ['_gridcontrol_toolbarfilter', '_gridcontrol_clearfilter'],
    true  // true = enable
  );
  // Disable toolbar items using toolbar module
  gridInstance.value.ej2Instances.toolbarModule.enableItems(
    ['_gridcontrol_toolbarfilter', '_gridcontrol_clearfilter'],
    false  // false = disable
  );
```

**Toolbar ID Format:** `_gridcontrol_<ItemID>`
