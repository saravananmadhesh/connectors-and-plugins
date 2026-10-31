# Toolbar & Report Management

## Table of Contents
- [Overview](#overview)
- [Enabling Toolbar](#enabling-toolbar)
- [Built-In Toolbar Items](#built-in-toolbar-items)
- [Report Lifecycle Callbacks](#report-lifecycle-callbacks)
- [Custom Toolbar Items](#custom-toolbar-items)
- [Chart Type Management](#chart-type-management)
- [Common Patterns](#common-patterns)

---

## Overview

The PivotView toolbar provides quick access to key operations like report saving/loading, export, chart type switching, and field management. It improves user experience by reducing the need for nested menus and dialogs.

**Key features:**
- **Report Management** - Save, load, rename, and remove reports
- **Export Options** - Export to Excel, PDF, CSV
- **Display Toggling** - Switch between Grid and Chart views
- **Field Organization** - Show/hide field list and grouping bar
- **Formatting** - Access conditional formatting and number formatting dialogs
- **Custom Items** - Add your own buttons and actions

**When to use:**
- Business dashboards with multiple saved pivot views
- Applications requiring quick export capabilities
- User-friendly reporting interfaces
- Data exploration applications with changing layouts

---

## Enabling Toolbar

### Step 1: Show Toolbar

Set `showToolbar` to `true`:

```vue
<template>
  <ejs-pivotview
    :dataSourceSettings="dataSourceSettings"
    :showToolbar="true">
  </ejs-pivotview>
</template>

<script setup>
const dataSourceSettings = { /* ... */ };
</script>
```

### Step 2: Configure Toolbar Items

Define which built-in items to display using the `toolbar` array:

```vue
<template>
  <ejs-pivotview
    :dataSourceSettings="dataSourceSettings"
    :showToolbar="true"
    :toolbar="toolbarItems">
  </ejs-pivotview>
</template>

<script setup>
const toolbarItems = [
  'New',                    // Create new report
  'Save',                   // Save current report
  'SaveAs',                 // Save as new report name
  'Rename',                 // Rename saved report
  'Remove',                 // Delete saved report
  'Load',                   // Load saved report
  'Grid',                   // Toggle grid view
  'Chart',                  // Toggle chart view
  'Export',                 // Show export options
  'SubTotal',               // Show row subtotals
  'GrandTotal',             // Show grand total row
  'ConditionalFormatting',  // Open conditional formatting dialog
  'NumberFormatting',       // Open number formatting dialog
  'FieldList',              // Toggle field list panel
  'MDX'                     // OLAP MDX query (OLAP only)
];
</script>
```

### Step 3: Inject Required Modules

Some toolbar features require module injection:

```vue
<script setup>
import { 
  PivotViewComponent as EjsPivotview, 
  Toolbar,           // For toolbar
  FieldList,         // For field list button
  ConditionalFormatting     // For conditional formatting button
} from "@syncfusion/ej2-vue-pivotview";
import { provide } from "vue";

provide('pivotview', [Toolbar, FieldList, ConditionalFormatting]);
</script>
```

---

## Built-In Toolbar Items

### Report Management Items

| Item | Purpose | Action |
|------|---------|--------|
| **New** | Create new blank report | Clears fields, resets pivot to empty state |
| **Save** | Save current report | Triggers `saveReport()` callback with current state |
| **SaveAs** | Save report with new name | Prompts for name, triggers `saveReport()` callback |
| **Load** | Load saved report | Shows dropdown of available reports, triggers `loadReport()` |
| **Rename** | Rename selected report | Triggers `renameReport()` callback |
| **Remove** | Delete selected report | Removes report, triggers `removeReport()` callback |

### View & Display Items

| Item | Purpose | Action |
|------|---------|--------|
| **Grid** | Show grid view (default) | Displays pivot table grid |
| **Chart** | Show chart view | Displays pivot chart |
| **SubTotal** | Toggle row/column subtotals | Shows/hides subtotal rows |
| **GrandTotal** | Toggle grand totals | Shows/hides grand total row and column |

### Feature Access Items

| Item | Purpose | Action |
|------|---------|--------|
| **Export** | Show export options | Dropdown with Excel, CSV, PDF export |
| **FieldList** | Toggle field list panel | Shows/hides field configuration panel |
| **ConditionalFormatting** | Open formatting dialog | Shows conditional formatting UI |
| **NumberFormatting** | Open number format dialog | Shows number format customization dialog |
| **MDX** | Show OLAP MDX query | (OLAP data source only) |

### Example: Minimal Toolbar

```vue
<ejs-pivotview
  :toolbar="['New', 'Save', 'Load', 'Export']"
  :showToolbar="true">
</ejs-pivotview>
```

### Example: Full-Featured Toolbar

```vue
<ejs-pivotview
  :toolbar="[
    'New', 'Save', 'SaveAs', 'Rename', 'Remove', 'Load',
    'Grid', 'Chart',
    'Export', 'SubTotal', 'GrandTotal',
    'ConditionalFormatting', 'NumberFormatting', 'FieldList'
  ]"
  :showToolbar="true">
</ejs-pivotview>
```

---

## Report Lifecycle Callbacks

### saveReport() Callback

Called when user clicks **Save** or **SaveAs** in toolbar:

```vue
<template>
  <ejs-pivotview
    :dataSourceSettings="dataSourceSettings"
    :saveReport="onSaveReport">
  </ejs-pivotview>
</template>

<script setup>
const onSaveReport = (args) => {
  // args.reportName    - Report name entered by user
  // args.report        - Serialized pivot state (JSON string)
  
  console.log('Saving report:', args.reportName);
  
  // Example: Save to localStorage
  const existingReports = JSON.parse(localStorage.getItem('pivotReports')) || {};
  existingReports[args.reportName] = args.report;
  localStorage.setItem('pivotReports', JSON.stringify(existingReports));
};
</script>
```

**Parameters:**
- `reportName` (string) - Name user gave the report
- `report` (string) - Serialized pivot state (pass to `loadPersistData()` to restore)

### loadReport() Callback

Called when user selects report from **Load** dropdown:

```vue
<script setup>
const onLoadReport = (args) => {
  // args.reportName - Report name to load
  
  console.log('Loading report:', args.reportName);
  
  // Example: Load from localStorage
  const reports = JSON.parse(localStorage.getItem('pivotReports')) || {};
  const reportData = reports[args.reportName];
  
  if (reportData) {
    pivotview.value?.loadPersistData(reportData);
  }
};
</script>

<template>
  <ejs-pivotview
    :loadReport="onLoadReport">
  </ejs-pivotview>
</template>
```

**Parameters:**
- `reportName` (string) - Name of report to load

### fetchReport() Callback

Called to retrieve list of available saved reports for the **Load** dropdown:

```vue
<script setup>
const onFetchReport = (args) => {
  // Must set args.reportNames with array of available report names
  
  // Example: Get from localStorage
  const reports = JSON.parse(localStorage.getItem('pivotReports')) || {};
  args.reportNames = Object.keys(reports);
};
</script>

<template>
  <ejs-pivotview
    :fetchReport="onFetchReport">
  </ejs-pivotview>
</template>
```

**Parameters:**
- `reportNames` (array) - Set this with available report names

### renameReport() Callback

Called when user renames report:

```vue
<script setup>
const onRenameReport = (args) => {
  // args.reportName    - Old report name
  // args.rename        - New report name
  
  const reports = JSON.parse(localStorage.getItem('pivotReports')) || {};
  
  if (reports[args.reportName]) {
    reports[args.rename] = reports[args.reportName];
    delete reports[args.reportName];
    localStorage.setItem('pivotReports', JSON.stringify(reports));
  }
};
</script>

<template>
  <ejs-pivotview
    :renameReport="onRenameReport">
  </ejs-pivotview>
</template>
```

**Parameters:**
- `reportName` (string) - Original report name
- `rename` (string) - New report name

### removeReport() Callback

Called when user deletes a report:

```vue
<script setup>
const onRemoveReport = (args) => {
  // args.reportName - Report name to delete
  
  const reports = JSON.parse(localStorage.getItem('pivotReports')) || {};
  delete reports[args.reportName];
  localStorage.setItem('pivotReports', JSON.stringify(reports));
};
</script>

<template>
  <ejs-pivotview
    :removeReport="onRemoveReport">
  </ejs-pivotview>
</template>
```

**Parameters:**
- `reportName` (string) - Report name to remove

### newReport() Callback

Called when user clicks **New** button:

```vue
<script setup>
const onNewReport = (args) => {
  // Reset to blank pivot state
  console.log('Creating new report');
  // Clear current report, user will configure new pivot
};
</script>

<template>
  <ejs-pivotview
    :newReport="onNewReport">
  </ejs-pivotview>
</template>
```

---

## Custom Toolbar Items

### Adding Custom Buttons

Add custom toolbar items by including objects in the `toolbar` array:

```vue
<template>
  <ejs-pivotview
    :toolbar="toolbarConfig">
  </ejs-pivotview>
</template>

<script setup>
const toolbarConfig = [
  'New', 'Save', 'Load',
  {
    id: 'export-json',
    text: 'Export JSON',
    tooltipText: 'Export pivot data as JSON',
    cssClass: 'e-icons e-export',
    align: 'Left',
    prefixIcon: 'e-icons e-export'
  },
  {
    id: 'refresh-data',
    text: 'Refresh',
    tooltipText: 'Reload data from source',
    align: 'Left',
    prefixIcon: 'e-icons e-refresh'
  }
];
</script>
```

### Handling Custom Button Clicks

Use the `toolbarClick` event:

```vue
<script setup>
const onToolbarClick = (args) => {
  if (args.item.id === 'export-json') {
    const currentReport = pivotview.value?.getPersistData();
    console.log('Exporting JSON:', currentReport);
    // Handle custom export logic
  } else if (args.item.id === 'refresh-data') {
    pivotview.value?.refresh();
  }
};
</script>

<template>
  <ejs-pivotview
    :toolbarClick="onToolbarClick">
  </ejs-pivotview>
</template>
```

### Icon & Styling

Use Syncfusion EJ2 icon classes:

```vue
{
  id: 'my-button',
  text: 'My Action',
  prefixIcon: 'e-icons e-check',  // Checkmark icon
  cssClass: 'e-success',           // Green button
  align: 'Left'
}
```

---

## Chart Type Management

### Control Chart Display

Use `displayOption` to show grid, chart, or both:

```vue
<template>
  <ejs-pivotview
    :displayOption="displayOption">
  </ejs-pivotview>
</template>

<script setup>
// Show both grid and chart
const displayOption = {
  view: 'Both'  // 'Grid' | 'Chart' | 'Both'
};
</script>
```

### Chart Type Dropdown

When `displayOption.view` includes 'Chart', toolbar shows chart type dropdown:

```vue
<template>
  <ejs-pivotview
    :displayOption="{ view: 'Both' }"
    :chartSettings="chartSettings"
    :toolbar="['Chart', 'Export']">
  </ejs-pivotview>
</template>

<script setup>
const chartSettings = {
  type: 'Column',  // Default: Column
  // Supported: Line, Column, Area, Bar, Bubble, Scatter, Pie, Doughnut, etc.
  multipleAxisMode: 'Single'  // 'Single' | 'Combined' | 'Stacked'
};
</script>
```

### Limit Chart Type Options

Restrict available chart types in dropdown (optional):

```vue
const chartSettings = {
  type: 'Column',
  chartTypes: ['Column', 'Line', 'Area']  // Only show these options
};
```

---

## Common Patterns

### Pattern 1: Report Management Dashboard

```vue
<template>
  <div>
    <ejs-pivotview
      ref="pivotview"
      :dataSourceSettings="dataSourceSettings"
      :showToolbar="true"
      :toolbar="fullToolbar"
      :saveReport="onSaveReport"
      :loadReport="onLoadReport"
      :fetchReport="onFetchReport"
      :renameReport="onRenameReport"
      :removeReport="onRemoveReport"
      :newReport="onNewReport">
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const pivotview = ref(null);
const fullToolbar = [
  'New', 'Save', 'SaveAs', 'Load', 'Rename', 'Remove',
  'Grid', 'Chart',
  'Export', 'SubTotal', 'GrandTotal', 'FieldList'
];

// Report lifecycle handlers
const onSaveReport = (args) => {
  const reports = JSON.parse(localStorage.getItem('pivotReports')) || {};
  reports[args.reportName] = args.report;
  localStorage.setItem('pivotReports', JSON.stringify(reports));
  alert(`Report "${args.reportName}" saved successfully!`);
};

const onLoadReport = (args) => {
  const reports = JSON.parse(localStorage.getItem('pivotReports')) || {};
  pivotview.value?.loadPersistData(reports[args.reportName]);
};

const onFetchReport = (args) => {
  const reports = JSON.parse(localStorage.getItem('pivotReports')) || {};
  args.reportNames = Object.keys(reports);
};

const onRenameReport = (args) => {
  const reports = JSON.parse(localStorage.getItem('pivotReports')) || {};
  reports[args.rename] = reports[args.reportName];
  delete reports[args.reportName];
  localStorage.setItem('pivotReports', JSON.stringify(reports));
};

const onRemoveReport = (args) => {
  const reports = JSON.parse(localStorage.getItem('pivotReports')) || {};
  delete reports[args.reportName];
  localStorage.setItem('pivotReports', JSON.stringify(reports));
};

const onNewReport = () => {
  // Reset pivot to initial state
  dataSourceSettings.value.rows = [];
  dataSourceSettings.value.columns = [];
  dataSourceSettings.value.values = [];
};
</script>
```

### Pattern 2: Export-Only Toolbar

```vue
<ejs-pivotview
  :toolbar="['Export']"
  :showToolbar="true">
</ejs-pivotview>
```

### Pattern 3: Analysis Toolbar (Grid + Chart + Formatting)

```vue
<ejs-pivotview
  :toolbar="[
    'Grid', 'Chart',
    'Export',
    'ConditionalFormatting', 'NumberFormatting',
    'FieldList'
  ]"
  :showToolbar="true"
  :allowConditionalFormatting="true"
  :allowNumberFormatting="true"
  :showFieldList="true">
</ejs-pivotview>
```

### Pattern 4: Custom Export Button with Analytics

```vue
<template>
  <ejs-pivotview
    :toolbarClick="onToolbarClick"
    :toolbar="customToolbar">
  </ejs-pivotview>
</template>

<script setup>
const customToolbar = [
  'Export',
  {
    id: 'analytics',
    text: 'Analytics',
    prefixIcon: 'e-icons e-chart-line',
    tooltipText: 'Show pivot analytics',
    cssClass: 'e-info'
  }
];

const onToolbarClick = (args) => {
  if (args.item.id === 'analytics') {
    // Show custom analytics panel
  }
};
</script>
```

---

## Complete Example with All Features

```vue
<template>
  <div class="pivot-container">
    <ejs-pivotview
      ref="pivotview"
      :dataSourceSettings="dataSourceSettings"
      :showToolbar="true"
      :toolbar="toolbarConfig"
      :displayOption="displayOption"
      :chartSettings="chartSettings"
      :conditionalFormatSettings="conditionalFormatSettings"
      :allowConditionalFormatting="true"
      :showFieldList="true"
      :height="500"
      :saveReport="onSaveReport"
      :loadReport="onLoadReport"
      :fetchReport="onFetchReport"
      :toolbarClick="onToolbarClick">
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { 
  PivotViewComponent as EjsPivotview,
  Toolbar,
  FieldList,
  ConditionalFormatting
} from "@syncfusion/ej2-vue-pivotview";
import { provide } from "vue";

const pivotview = ref(null);

const dataSourceSettings = ref({
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Amount' }],
  formatSettings: [{ name: 'Amount', format: 'C0' }]
});

const toolbarConfig = [
  'New', 'Save', 'SaveAs', 'Load', 'Rename', 'Remove',
  'Grid', 'Chart',
  'Export', 'SubTotal', 'GrandTotal',
  'ConditionalFormatting', 'FieldList'
];

const displayOption = { view: 'Both' };
const chartSettings = { type: 'Column' };
const conditionalFormatSettings = [];

const onSaveReport = (args) => {
  const reports = JSON.parse(localStorage.getItem('reports')) || {};
  reports[args.reportName] = args.report;
  localStorage.setItem('reports', JSON.stringify(reports));
};

const onLoadReport = (args) => {
  const reports = JSON.parse(localStorage.getItem('reports')) || {};
  if (reports[args.reportName]) {
    pivotview.value?.loadPersistData(reports[args.reportName]);
  }
};

const onFetchReport = (args) => {
  const reports = JSON.parse(localStorage.getItem('reports')) || {};
  args.reportNames = Object.keys(reports);
};

const onToolbarClick = (args) => {
  if (args.item.id === 'custom-action') {
    console.log('Custom action triggered');
  }
};

provide('pivotview', [Toolbar, FieldList, ConditionalFormatting]);
</script>

<style scoped>
.pivot-container {
  width: 100%;
  height: 600px;
}
</style>
```
  Toolbar,
  FieldList,
  GroupingBar,
  PDFExport,
  ExcelExport,
  ConditionalFormatting
]);
</script>

<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings" 
    :showToolbar="showToolbar"
    :toolbar="toolbarItems"
    :height="height">
  </ejs-pivotview>
</template>
```

> **Note:** The order of toolbar options can be changed by moving the position of items in the `toolbar` array. If end users want to remove any toolbar option from getting displayed, it can be simply omitted from the `toolbar` array.

## Chart Types in Toolbar

By default, the dropdown menu in the toolbar displays all available chart types. However, you may want to show only specific chart types based on your application's needs. Use the [`chartTypes`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/index-default#charttypes) property to define a list of chart types that will appear in the dropdown menu.

### Limit Available Chart Types
```vue
<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, Toolbar } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};

// Show only specific chart types in the toolbar chart type dropdown
const chartTypes = ['Column', 'Bar', 'Line', 'Area'];
const showToolbar = true;
const toolbar = ['Grid', 'Chart'];

provide('pivotview', [Toolbar]);
</script>

<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings" 
    :showToolbar="showToolbar"
    :toolbar="toolbar"
    :chartTypes="chartTypes"
    :height="height">
  </ejs-pivotview>
</template>
```

## Custom Toolbar Items

### Adding Custom Options to the Toolbar

You can add new items to the toolbar beyond the built-in options using the [`toolbarRender`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/index-default#toolbarrender) event. Within this event, you can define the new toolbar item and specify what action it performs when clicked. Additionally, you can place the new item at a specific position in the toolbar using the `splice` method.

```vue
<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings" 
    :showToolbar="showToolbar"
    :toolbar="toolbar"
    :toolbarRender="onToolbarRender"
    :height="height">
  </ejs-pivotview>
</template>

<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, Toolbar } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};

const showToolbar = true;
const toolbar = ['Grid', 'Chart'];

const onToolbarRender = (args) => {
  // Add custom toolbar item at position 2
  args.customToolbar.splice(2, 0, {
    prefixIcon: 'e-icons e-expand',
    tooltipText: 'Expand/Collapse',
    align: 'Left',
    id: 'expand_collapse'
  });
};

provide('pivotview', [Toolbar]);
</script>
```

### Custom Toolbar Template

You can customize the entire toolbar panel by using the [`toolbarTemplate`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/index-default#toolbartemplate) property. This allows you to design the toolbar with HTML elements and include any custom control as toolbar items.

```vue
<template>
  <div id="app">
    <!-- Custom toolbar template -->
    <div id="template" class="custom-toolbar">
      <button class="e-btn" @click="expandAll">📂 Expand All</button>
      <button class="e-btn" @click="collapseAll">📁 Collapse All</button>
      <button class="e-btn" @click="downloadReport">📥 Download</button>
    </div>
    
    <ejs-pivotview 
      ref="pivot"
      :dataSourceSettings="dataSourceSettings" 
      :showToolbar="true"
      :toolbarTemplate="toolbarTemplate"
      :height="height">
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { provide, ref } from "vue";
import { PivotViewComponent as EjsPivotview, Toolbar } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const pivot = ref(null);

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};

const toolbarTemplate = '#template';
const height = 350;

const expandAll = () => {
  let pivotObj = pivot.value;
  if (pivotObj && pivotObj.dataSourceSettings) {
    pivotObj.dataSourceSettings.expandAll = true;
  }
};

const collapseAll = () => {
  let pivotObj = pivot.value;
  if (pivotObj && pivotObj.dataSourceSettings) {
    pivotObj.dataSourceSettings.expandAll = false;
  }
};

const downloadReport = () => {
  console.log('Report download initiated');
};

provide('pivotview', [Toolbar]);
</script>

<style scoped>
.custom-toolbar {
  display: flex;
  gap: 10px;
  padding: 10px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px 4px 0 0;
  margin-bottom: 10px;
}

.custom-toolbar .e-btn {
  background: white;
  color: #333;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

.custom-toolbar .e-btn:hover {
  background: #f0f0f0;
  transform: translateY(-1px);
}
</style>
```

## Toolbar Events

### Handle Report Management

The toolbar provides events for managing reports (New, Save, Load, Delete, Rename):

```vue
<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings" 
    :showToolbar="showToolbar"
    :toolbar="toolbar"
    :saveReport="saveReport"
    :loadReport="loadReport"
    :renameReport="renameReport"
    :removeReport="removeReport"
    :newReport="newReport"
    :toolbarRender="onToolbarRender">
  </ejs-pivotview>
</template>

<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, Toolbar } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};

const toolbar = ['New', 'Save', 'SaveAs', 'Rename', 'Delete', 'Load', 'Grid', 'Chart', 'Export'];
const showToolbar = true;

/**
 * Save current report to localStorage
 */
const saveReport = (args) => {
  let reports = JSON.parse(localStorage.getItem('pivotTableReports') || '[]');
  let report = {
    name: args.reportName,
    dataSourceSettings: args.dataSourceSettings
  };
  reports.push(report);
  localStorage.setItem('pivotTableReports', JSON.stringify(reports));
  console.log('✓ Report saved:', args.reportName);
};

/**
 * Fetch list of saved reports
 */
const fetchReport = (args) => {
  let reports = JSON.parse(localStorage.getItem('pivotTableReports') || '[]');
  args.reportName = reports.map(r => r.name);
};

/**
 * Load a saved report
 */
const loadReport = (args) => {
  let reports = JSON.parse(localStorage.getItem('pivotTableReports') || '[]');
  let report = reports.find(r => r.name === args.reportName);
  if (report) {
    args.dataSourceSettings = report.dataSourceSettings;
    console.log('✓ Report loaded:', args.reportName);
  }
};

/**
 * Rename a report
 */
const renameReport = (args) => {
  let reports = JSON.parse(localStorage.getItem('pivotTableReports') || '[]');
  let report = reports.find(r => r.name === args.reportName);
  if (report) {
    report.name = args.newName;
    localStorage.setItem('pivotTableReports', JSON.stringify(reports));
    console.log('✓ Report renamed:', args.reportName, '→', args.newName);
  }
};

/**
 * Remove a report
 */
const removeReport = (args) => {
  let reports = JSON.parse(localStorage.getItem('pivotTableReports') || '[]');
  reports = reports.filter(r => r.name !== args.reportName);
  localStorage.setItem('pivotTableReports', JSON.stringify(reports));
  console.log('✓ Report removed:', args.reportName);
};

/**
 * Create a new report
 */
const newReport = () => {
  console.log('✓ New report created');
};

const onToolbarRender = (args) => {
  console.log('✓ Toolbar rendered');
};

provide('pivotview', [Toolbar]);
</script>
```

### Toolbar Item Click Handling

You can handle toolbar item clicks and customize export behavior using additional events:

```vue
<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings" 
    :showToolbar="true"
    :toolbar="toolbar"
    :gridSettings="gridSettings"
    :height="height">
  </ejs-pivotview>
</template>

<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, Toolbar, PDFExport, ExcelExport } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};

const toolbar = ['Grid', 'Chart', 'Export'];
const height = 350;

const gridSettings = {
  // Export customization via gridSettings
  excelQueryCellInfo: (args) => {
    // Customize Excel export - column width, headers, etc.
  },
  pdfQueryCellInfo: (args) => {
    // Customize PDF export - page size, orientation, margins
  }
};

provide('pivotview', [Toolbar, PDFExport, ExcelExport]);
</script>
```

---

## Sizing & Layout Configuration

Configure component dimensions, spacing, and responsive behavior to fit various container sizes.

### Fixed Height & Width
```vue
<template>
  <ejs-pivotview
    :dataSourceSettings="dataSourceSettings"
    :showToolbar="true"
    :height="'600px'"
    :width="'100%'">
  </ejs-pivotview>
</template>

<script setup>
const dataSourceSettings = { /* ... */ };
// height: Fixed pixel value, e.g., '600px'
// width: Can be % of parent or fixed pixels
</script>
```

### Responsive Components with Minimum Dimensions
```vue
<template>
  <div :style="{ minHeight: '600px', minWidth: '800px', overflow: 'auto' }">
    <ejs-pivotview
      :dataSourceSettings="dataSourceSettings"
      :showToolbar="true"
      :height="'100%'"
      :width="'100%'">
    </ejs-pivotview>
  </div>
</template>

<script setup>
const dataSourceSettings = { /* ... */ };
</script>
```

### Dynamic Height Adjustment
```vue
<template>
  <div class="pivot-wrapper">
    <ejs-pivotview
      ref="pivot"
      :dataSourceSettings="dataSourceSettings"
      :showToolbar="true"
      :showGroupingBar="true"
      :height="calculatedHeight"
      :dataBound="adjustHeight">
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const pivot = ref(null);
const calculatedHeight = ref('600px');

const adjustHeight = () => {
  const content = pivot.value?.$el?.querySelector('.e-grid-content');
  if (content) {
    const needed = content.scrollHeight + 100;  // Account for toolbar/groupingbar
    calculatedHeight.value = `${needed}px`;
  }
};

onMounted(() => {
  window.addEventListener('resize', adjustHeight);
  setTimeout(adjustHeight, 100);  // Adjust after initial render
});
</script>

<style scoped>
.pivot-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
```

### Viewport-Based Sizing
```vue
<template>
  <ejs-pivotview
    :dataSourceSettings="dataSourceSettings"
    :showToolbar="true"
    :height="windowHeight - 100"
    :width="windowWidth">
  </ejs-pivotview>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const windowHeight = ref(window.innerHeight);
const windowWidth = ref(window.innerWidth);

const handleResize = () => {
  windowHeight.value = window.innerHeight;
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
```

### Column & Row Spacing
```vue
<template>
  <ejs-pivotview
    :dataSourceSettings="dataSourceSettings"
    :gridSettings="gridSettings"
    :height="'600px'">
  </ejs-pivotview>
</template>

<script setup>
const gridSettings = {
  columnWidth: 140,           // Width of each column (pixels)
  rowHeight: 36,              // Height of each row
  allowResizing: true,        // Allow user to resize columns
  allowReordering: true,      // Allow reordering columns
  selectionSettings: {
    mode: 'Cell',
    type: 'Single'
  }
};

const dataSourceSettings = { /* ... */ };
</script>
```

### Responsive Grid in Container
```vue
<template>
  <div class="responsive-container">
    <div class="toolbar-section">
      <button @click="toggleView">Toggle View</button>
    </div>
    
    <div :class="['grid-section', { fullscreen: isFullscreen }]">
      <ejs-pivotview
        ref="pivot"
        :dataSourceSettings="dataSourceSettings"
        :showToolbar="true"
        :height="'100%'"
        :width="'100%'">
      </ejs-pivotview>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isFullscreen = ref(false);

const toggleView = () => {
  isFullscreen.value = !isFullscreen.value;
};

const dataSourceSettings = { /* ... */ };
</script>

<style scoped>
.responsive-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}

.toolbar-section {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  flex-shrink: 0;
}

.grid-section {
  flex: 1;
  overflow: auto;
  height: calc(100vh - 50px);
}

.grid-section.fullscreen {
  height: 100vh;
  overflow: hidden;
}

@media (max-width: 768px) {
  .grid-section {
    height: calc(100% - 50px);
  }
}
</style>
```
```vue
<template>
  <div class="container">
    <div class="controls">
      <select v-model="componentHeight" @change="updateHeight">
        <option value="400">Compact (400px)</option>
        <option value="600">Standard (600px)</option>
        <option value="800">Expanded (800px)</option>
        <option value="100%">Full Screen</option>
      </select>
    </div>

    <ejs-pivotview
      :dataSourceSettings="dataSourceSettings"
      :height="componentHeight"
      :showToolbar="true"
      :showGroupingBar="true">
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const componentHeight = ref('600');

const updateHeight = () => {
  // Height automatically updates via reactive binding
  console.log(`✓ Height changed to: ${componentHeight.value}`);
};

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};
</script>

<style>
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.controls {
  margin-bottom: 20px;
}

.controls select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
```

### Component Width & Responsive Layout
```vue
<template>
  <div class="pivot-wrapper" :class="layoutMode">
    <div class="sidebar" v-if="showSidebar">
      <!-- Filter panel or settings -->
      <div class="filter-panel">
        <h3>Filters</h3>
        <!-- Filter controls -->
      </div>
    </div>

    <div class="pivot-main">
      <ejs-pivotview
        :dataSourceSettings="dataSourceSettings"
        :width="pivotWidth"
        :height="pivotHeight"
        :showToolbar="true"
        :gridSettings="gridSettings">
      </ejs-pivotview>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const layoutMode = ref('desktop');  // 'desktop', 'tablet', 'mobile'
const showSidebar = ref(true);

const pivotWidth = computed(() => {
  if (layoutMode.value === 'mobile') return '100%';
  if (layoutMode.value === 'tablet') return 'calc(100% - 250px)';
  return 'calc(100% - 300px)';  // desktop
});

const pivotHeight = ref('700px');

const gridSettings = {
  rowHeight: 36,
  columnWidth: 150,
  allowResizing: true,
  allowReordering: true
};

const dataSourceSettings = {
  // Configuration...
};

</script>
</script>
```

## Events

### SaveReport

The `saveReport` event triggers when a user clicks the Save button in the toolbar. Use it to store report configurations to a database or local storage.

**When to use:**
- Persist report configurations
- Create audit trails
- Validate report names

```vue
<script setup>
const saveReport = (args) => {
  // args.report - serialized pivot configuration
  // args.reportName - name given by user
  
  // Save to localStorage
  let reports = JSON.parse(localStorage.getItem('pivotReports') || '[]');
  
  // Check if report already exists
  const existingIndex = reports.findIndex(r => r.name === args.reportName);
  if (existingIndex >= 0) {
    reports[existingIndex] = {
      name: args.reportName,
      report: args.report,
      savedAt: new Date().toISOString()
    };
  } else {
    reports.push({
      name: args.reportName,
      report: args.report,
      savedAt: new Date().toISOString()
    });
  }
  
   localStorage.setItem('pivotReports', JSON.stringify(reports));
  console.log(`Report "${args.reportName}" saved successfully`);
};
</script>
```

### LoadReport

The `loadReport` event triggers when a user clicks the Load button. Use it to retrieve and apply saved report configurations.

**When to use:**
- Restore previously saved reports
- Load reports from database
- Apply user preferences

```vue
<script setup>
const loadReport = (args) => {
  // args.reportName - name of report to load
  // args.report - write loaded report here
  
  let reports = JSON.parse(localStorage.getItem('pivotReports') || '[]');
  const report = reports.find(r => r.name === args.reportName);
  
  if (report) {
    args.report = report.report;
    console.log(`Report "${args.reportName}" loaded`);
  } else {
    console.error(`Report "${args.reportName}" not found`);
  }
};
</script>
```

### FetchReport

The `fetchReport` event triggers before the Load dialog opens. Use it to populate the list of available reports.

**When to use:**
- Retrieve all saved reports
- Refresh report list
- Filter available reports

```vue
<script setup>
const fetchReport = (args) => {
  // args.reportName - populate this with available report names array
  
  let reports = JSON.parse(localStorage.getItem('pivotReports') || '[]');
  args.reportName = reports.map(r => r.name);
  
  console.log('Available reports:', args.reportName);
};
</script>
```

### NewReport

The `newReport` event triggers when a user clicks the New button. Use it to clear the pivot table and start fresh.

**When to use:**
- Reset pivot configuration
- Clear current report
- Show confirmation dialog

```vue
<script setup>
import { ref } from 'vue';

const pivotRef = ref(null);

const newReport = () => {
  // Confirm user wants to discard current report
  if (confirm('Create a new report? Current data will be lost.')) {
    const pivotObj = pivotRef.value.ej2Instances;
    
    // Reset to empty configuration
    pivotObj.setProperties({
      dataSourceSettings: {
        columns: [],
        rows: [],
        values: [],
        filters: []
      }
    }, false);
    
    console.log('New report created');
  }
};
</script>
```

### RenameReport

The `renameReport` event triggers when a user renames a saved report. Use it to update the stored report name.

**When to use:**
- Update report names in storage
- Validate new names
- Create rename history

```vue
<script setup>
const renameReport = (args)  => {
  // args.reportName - current report name
  // args.rename - new report name
  
  let reports = JSON.parse(localStorage.getItem('pivotReports') || '[]');
  
  const report = reports.find(r => r.name === args.reportName);
  if (report) {
    report.name = args.rename;
    report.renamedAt = new Date().toISOString();
  }
  
  localStorage.setItem('pivotReports', JSON.stringify(reports));
  console.log(`Report renamed from "${args.reportName}" to "${args.rename}"`);
};
</script>
```

### RemoveReport

The `removeReport` event triggers when a user deletes a saved report. Use it to remove the report from storage.

**When to use:**
- Delete reports from database
- Clean up unused reports
- Log deletions

```vue
<script setup>
const removeReport = (args) => {
  // args.reportName - name of report to delete
  
  if (confirm(`Are you sure you want to delete "${args.reportName}"?`)) {
    let reports = JSON.parse(localStorage.getItem('pivotReports') || '[]');
    
    reports = reports.filter(r => r.name !== args.reportName);
    localStorage.setItem('pivotReports', JSON.stringify(reports));
    
    console.log(`Report "${args.reportName}" deleted`);
  }
};
</script>
```
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};

// Responsive breakpoints
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  if (width < 768) {
    layoutMode.value = 'mobile';
    showSidebar.value = false;
  } else if (width < 1024) {
    layoutMode.value = 'tablet';
    showSidebar.value = true;
  } else {
    layoutMode.value = 'desktop';
    showSidebar.value = true;
  }
});
</script>

<style scoped>
.pivot-wrapper {
  display: flex;
  width: 100%;
  height: 100vh;
  gap: 20px;
}

.sidebar {
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
  background: #f9f9f9;
  overflow-y: auto;
}

.pivot-main {
  flex: 1;
  min-width: 0;
}

/* Tablet layout */
.pivot-wrapper.tablet {
  .sidebar {
    width: 250px;
  }
}

/* Mobile layout */
.pivot-wrapper.mobile {
  flex-direction: column;
  
  .sidebar {
    display: none;  /* Hide sidebar on mobile */
    width: 100%;
  }
  
  .pivot-main {
    flex: 1;
    width: 100%;
  }
}

.filter-panel {
  border-bottom: 1px solid #ddd;
  padding-bottom: 15px;
  margin-bottom: 15px;
}

.filter-panel h3 {
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: 600;
}
</style>
```

### Grid Row & Column Sizing
```vue
<template>
  <ejs-pivotview
    :dataSourceSettings="dataSourceSettings"
    :gridSettings="gridSettings"
    :height="height">
  </ejs-pivotview>
</template>

<script setup>
const gridSettings = {
  // Fixed sizing for consistent layout
  rowHeight: 40,           // Larger rows for readability
  columnWidth: 150,        // Wider columns for content
  
  // Resizing behavior
  allowResizing: true,     // Allow users to resize columns
  allowReordering: true,   // Allow reordering columns
  
  // Text wrapping
  allowTextWrap: true      // Wrap long content
};

const height = '700px';
const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};
</script>
```

### Minimum Height & Width
```vue
<template>
  <ejs-pivotview
    :dataSourceSettings="dataSourceSettings"
    :height="minHeight"
    :width="minWidth"
    :minHeight="400"
    :minWidth="500">
  </ejs-pivotview>
</template>

<script setup>
// Component will not shrink below these minimums
const minHeight = '600px';
const minWidth = '800px';

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};

// Ensure container respects these dimensions
const containerStyle = {
  minHeight: '600px',
  minWidth: '800px',
  maxHeight: '1000px',
  maxWidth: '1600px'
};
</script>
```

### Dynamic Sizing
```vue
<template>
  <div class="pivot-container" ref="container">
    <button @click="expandPivot">Expand</button>
    <button @click="minimizePivot">Minimize</button>
    
    <ejs-pivotview
      ref="pivot"
      :dataSourceSettings="dataSourceSettings"
      :height="currentHeight"
      :width="currentWidth">
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const pivot = ref(null);
const container = ref(null);
const isExpanded = ref(false);

const baseHeight = '500px';
const baseWidth = '100%';
const expandedHeight = '900px';
const expandedWidth = '100%';

const currentHeight = ref(baseHeight);
const currentWidth = ref(baseWidth);

const expandPivot = () => {
  isExpanded.value = true;
  currentHeight.value = expandedHeight;
  currentWidth.value = expandedWidth;
  pivot.value?.refresh?.();
  console.log('✓ Pivot expanded');
};

const minimizePivot = () => {
  isExpanded.value = false;
  currentHeight.value = baseHeight;
  currentWidth.value = baseWidth;
  pivot.value?.refresh?.();
  console.log('✓ Pivot minimized');
};

// Monitor container resize
const observeResize = () => {
  const observer = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const width = entry.contentRect.width;
      const height = entry.contentRect.height;
      
      console.log(`Container size: ${width}x${height}`);
      pivot.value?.refresh?.();
    }
  });
  
  if (container.value) {
    observer.observe(container.value);
  }
};

// Call on mount
onMounted(() => {
  observeResize();
});
</script>

<style scoped>
.pivot-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
}

.pivot-container > button {
  padding: 8px 16px;
  margin-right: 10px;
  margin-bottom: 15px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pivot-container > button:hover {
  background: #764ba2;
}
</style>
```

---

## Best Practices
1. **Visibility**: Keep toolbar accessible but not intrusive
2. **Icons**: Use standard/recognizable icons for actions
3. **Tooltips**: Provide helpful tooltips for toolbar items
4. **Custom Actions**: Add domain-specific operations
5. **Mobile**: Simplify toolbar for touch devices

