# Report Manipulation

## Table of Contents
- [Overview](#overview)
- [Dynamic Report Changes](#dynamic-report-changes)
- [Field List Interactions](#field-list-interactions)
- [Grouping Bar Operations](#grouping-bar-operations)
- [Programmatic Updates](#programmatic-updates)

## Overview

Report manipulation allows users to dynamically modify the pivot table layout and configuration at runtime. This includes adding/removing fields, changing axes, sorting, and filtering without code changes. Properties: [`showFieldList`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/pivotViewModel#showfieldlist), [`showGroupingBar`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/pivotViewModel#showgroupingbar)

## Dynamic Report Changes

### Modify DataSourceSettings at Runtime
```vue
<template>
  <div id="app">
    <button @click="updateReport">Update Report</button>
    <ejs-pivotview ref="pivot" :dataSourceSettings="dataSourceSettings" :height="height"></ejs-pivotview>
  </div>
</template>

<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { ref } from 'vue';
import { pivotData } from './pivotData.js';

const pivot = ref(null);

const dataSourceSettings = ref({
  dataSource: pivotData,
  expandAll: false,
  columns: [{ name: 'Year' }],
  rows: [{ name: 'Country' }],
  values: [{ name: 'Sales' }],
  filters: []
});

const updateReport = () => {
  // Update configuration dynamically
  dataSourceSettings.value = {
    dataSource: pivotData,
    expandAll: false,
    // Changed: Add Quarter to columns
    columns: [{ name: 'Year' }, { name: 'Quarter' }],
    // Changed: Add Product to rows
    rows: [{ name: 'Country' }, { name: 'Product' }],
    // Changed: Add Profit to values
    values: [{ name: 'Sales' }, { name: 'Profit' }],
    filters: [],
    formatSettings: [
      { name: 'Sales', format: 'C0' },
      { name: 'Profit', format: 'C0' }
    ]
  };
};
</script>
```

### Add/Remove Fields
```vue
<script setup>
const addFieldToReport = () => {
  // Add a new value field
  dataSourceSettings.value.values.push({
    name: 'Units',
    caption: 'Units Sold',
    type: 'Sum'
  });
};

const removeFieldFromReport = () => {
  // Remove last value field
  dataSourceSettings.value.values.pop();
};

const moveFieldToAxis = () => {
  // Move field from one axis to another
  const field = dataSourceSettings.value.rows.shift();  // Remove from rows
  dataSourceSettings.value.columns.push(field);         // Add to columns
};
</script>
```

## Field List Interactions

The Field List makes it easy to organize and analyze data in your Pivot Table. It provides a user-friendly interface similar to Microsoft Excel that allows you to add or remove fields and move them between different axes like columns, rows, values, and filters.

> To use the field list, inject the `FieldList` module in the Pivot Table.

### Enable Field List (Popup)
```vue
<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings" 
    :showFieldList="showFieldList"
    :height="height">
  </ejs-pivotview>
</template>

<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, FieldList } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};

const showFieldList = true;  // Enable field list UI

provide('pivotview', [FieldList]);
</script>
```

> The field list icon appears in the top-left corner of the Pivot Table. When the grouping bar is enabled, the field list icon appears in the top-right corner.

### Field List Features
- **Drag-Drop**: Add fields by dragging from available fields to row/column/value/filter axes
- **Axis Selection**: Choose which axis (rows, columns, values, filters) to place each field
- **Sort/Filter**: Apply sorting and filtering operations from field list
- **Tree View**: Hierarchical field organization for better readability
- **Search**: Find fields quickly using the search box (when enabled)
- **Dynamic Updates**: Real-time synchronization with the pivot table

### Enable Field Search
```vue
<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, FieldList } from "@syncfusion/ej2-vue-pivotview";

const dataSourceSettings = { /* ...config... */ };
const showFieldList = true;
const enableFieldSearching = true;  // Enable search box in field list

provide('pivotview', [FieldList]);
</script>

<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings" 
    :showFieldList="showFieldList"
    :enableFieldSearching="enableFieldSearching"
    :height="height">
  </ejs-pivotview>
</template>
```

## Grouping Bar Operations

The Grouping Bar option in the Pivot Table automatically displays fields from the data source. It allows users to drag and drop fields between different axes (columns, rows, values, and filters) to create a pivot table at runtime. Set the [`showGroupingBar`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/index-default#showgroupingbar) property to **true** to enable it.

> To use the grouping bar, inject the `GroupingBar` module in the Pivot Table.

### Enable Grouping Bar
```vue
<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings" 
    :showGroupingBar="showGroupingBar"
    :groupingBarSettings="groupingBarSettings"
    :height="height">
  </ejs-pivotview>
</template>

<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, GroupingBar } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [
    { name: 'Country', caption: 'Country', showFilterIcon: true, showSortIcon: true, showRemoveIcon: true },
    { name: 'Region', caption: 'Region', showFilterIcon: true, showSortIcon: true, showRemoveIcon: true }
  ],
  columns: [
    { name: 'Year', caption: 'Year', showFilterIcon: true, showSortIcon: true, showRemoveIcon: true },
    { name: 'Quarter', caption: 'Quarter', showFilterIcon: true, showSortIcon: true, showRemoveIcon: true }
  ],
  values: [
    { name: 'Sales', caption: 'Total Sales', type: 'Sum', showFilterIcon: true, showSortIcon: true, showRemoveIcon: true },
    { name: 'Profit', caption: 'Total Profit', type: 'Sum', showFilterIcon: true, showSortIcon: true, showRemoveIcon: true }
  ],
  filters: [
    { name: 'Product', caption: 'Product', showFilterIcon: true, showSortIcon: true, showRemoveIcon: true }
  ]
};

const showGroupingBar = true;
const height = 350;

// Grouping Bar Settings Configuration
const groupingBarSettings = {
  showFieldsPanel: true,        // Show fields panel above grouping bar
  showFilterIcon: true,         // Show filter icon for each field
  showSortIcon: true,           // Show sort icon for each field
  showRemoveIcon: true          // Show remove icon for each field
};

provide('pivotview', [GroupingBar]);
</script>
```

### Grouping Bar Interactions

The grouping bar provides intuitive interactions:

| Icon | Action | Description |
|------|--------|-------------|
| 🔍 Filter | Click filter icon | Opens member filter dialog |
| ↕️ Sort | Click sort icon | Toggles ascending/descending sort |
| ⊗ Remove | Click remove icon | Removes field from current axis |
| 📋 Field | Drag field button | Move field to different axis |

### Grouping Bar Settings Configuration

Configure the appearance and behavior using [`groupingBarSettings`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/index-default#groupingbarsettings):

```vue
<script setup>
const groupingBarSettings = {
  showFieldsPanel: true,        // Display available fields panel
  showFilterIcon: true,         // Show filter icons for all fields
  showSortIcon: true,           // Show sort icons for all fields
  showRemoveIcon: true          // Show remove icons for all fields
};
</script>
```

For field-specific control:

```vue
<script setup>
const dataSourceSettings = {
  rows: [
    { name: 'Country', showFilterIcon: true, showSortIcon: false, showRemoveIcon: true },   // Only filter & remove
    { name: 'Region', showFilterIcon: false, showSortIcon: true, showRemoveIcon: false }   // Only sort
  ],
  columns: [
    { name: 'Year', showFilterIcon: true, showSortIcon: true, showRemoveIcon: true }      // All icons
  ],
  values: [
    { name: 'Sales', showFilterIcon: false, showSortIcon: false, showRemoveIcon: true }   // Only remove
  ],
  filters: [
    { name: 'Product', showFilterIcon: true, showSortIcon: true, showRemoveIcon: true }   // All icons
  ]
};
</script>
```

## Programmatic Updates

### Get Current Report
```vue
<script setup>
const getPivotReport = () => {
  const pivotObj = document.getElementById('pivotview').ej2_instances[0];
  const report = pivotObj.dataSourceSettings;
  console.log('Current report configuration:', report);
  return report;
};
</script>
```

### Update Fields Programmatically
```vue
<script setup>
import { ref } from 'vue';

const pivot = ref(null);
const dataSourceSettings = ref({ /* ...initial config... */ });

const addSalesField = () => {
  if (!dataSourceSettings.value.values) {
    dataSourceSettings.value.values = [];
  }
  dataSourceSettings.value.values.push({
    name: 'Sales',
    caption: 'Total Sales',
    type: 'Sum',
    format: 'C0'
  });
};

const changGroupingStrategy = () => {
  // Reorganize fields
  dataSourceSettings.value = {
    ...dataSourceSettings.value,
    rows: [{ name: 'Year' }, { name: 'Country' }],  // Swap hierarchy
    columns: [{ name: 'Product' }, { name: 'Region' }]
  };
};

const applyFilters = () => {
  dataSourceSettings.value.filterSettings = [
    {
      name: 'Country',
      type: 'Exclude',
      items: ['France', 'Germany']  // Exclude these countries
    }
  ];
};
</script>
```

### Refresh Report
```vue
<script setup>
const refreshReport = () => {
  const pivotObj = document.getElementById('pivotview').ej2_instances[0];
  pivotObj.refresh();  // Refresh the pivot table
};
</script>
```

### Apply Calculated Fields
```vue
<script setup>
const addCalculatedField = () => {
  const pivotObj = document.getElementById('pivotview').ej2_instances[0];
  
  // Define calculated field
  pivotObj.dataSourceSettings.calculatedFieldSettings = [{
    name: 'Profit Margin',
    formula: '"Sales" - "Cost"'  // Profit Margin = Sales - Cost
  }];
  
  pivotObj.refresh();
};
</script>
```

### Complete Example with Report Manipulation
```vue
<template>
  <div id="app">
    <div class="controls">
      <button @click="addYearToColumns">Add Year to Columns</button>
      <button @click="removeLastColumn">Remove Last Column</button>
      <button @click="swapRowsColumns">Swap Rows & Columns</button>
      <button @click="changAggregation">Change to Average</button>
      <button @click="displayReport">Show Report</button>
    </div>
    
    <ejs-pivotview 
      ref="pivot"
      :dataSourceSettings="dataSourceSettings" 
      :showGroupingBar="showGroupingBar"
      :showFieldList="showFieldList"
      :height="height">
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { provide } from 'vue';
import { PivotViewComponent as EjsPivotview, GroupingBar, FieldList } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const pivot = ref(null);
const dataSourceSettings = ref({
  dataSource: pivotData,
  expandAll: false,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales', type: 'Sum' }],
  filters: [],
  formatSettings: [{ name: 'Sales', format: 'C0' }]
});

const showGroupingBar = true;
const showFieldList = true;
const height = 350;

const addYearToColumns = () => {
  dataSourceSettings.value.columns.push({ name: 'Quarter' });
};

const removeLastColumn = () => {
  if (dataSourceSettings.value.columns.length > 0) {
    dataSourceSettings.value.columns.pop();
  }
};

const swapRowsColumns = () => {
  [dataSourceSettings.value.rows, dataSourceSettings.value.columns] = 
  [dataSourceSettings.value.columns, dataSourceSettings.value.rows];
};

const changAggregation = () => {
  dataSourceSettings.value.values[0].type = 'Average';
};

const displayReport = () => {
  console.log('Current Report:', dataSourceSettings.value);
};

provide('pivotview', [GroupingBar, FieldList]);
</script>

<style>
.controls {
  margin-bottom: 20px;
}
.controls button {
  padding: 8px 12px;
  margin-right: 10px;
  cursor: pointer;
}
</style>
```

---

## Loading Predefined Reports

Load pre-configured pivot layouts on initial component render for quick data exploration.

### Load Report on Component Creation
```vue
<template>
  <div>
    <select @change="loadSelectedReport">
      <option value="">Select Predefined Report...</option>
      <option value="sales-by-region">Sales by Region</option>
      <option value="category-analysis">Category Analysis</option>
      <option value="quarterly-performance">Quarterly Performance</option>
    </select>

    <ejs-pivotview
      ref="pivot"
      :dataSourceSettings="dataSourceSettings"
      :allowExcelExport="true"
      :created="loadInitialReport">
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { PivotViewComponent as EjsPivotview, FieldList, Toolbar } from "@syncfusion/ej2-vue-pivotview";

const pivot = ref(null);

// Pre-defined report templates
const predefinedReports = {
  'sales-by-region': {
    rows: [{ name: 'Region' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'Sales', type: 'Sum' }],
    filters: [],
    formatSettings: [{ name: 'Sales', format: 'C2' }]
  },
  
  'category-analysis': {
    rows: [{ name: 'Category' }, { name: 'SubCategory' }],
    columns: [{ name: 'Year' }, { name: 'Quarter' }],
    values: [{ name: 'Amount', type: 'Sum' }, { name: 'Quantity', type: 'Count' }],
    filters: [{ name: 'Country' }],
    formatSettings: [
      { name: 'Amount', format: 'C0' },
      { name: 'Quantity', format: 'N0' }
    ]
  },
  
  'quarterly-performance': {
    rows: [{ name: 'SalesRep' }, { name: 'Territory' }],
    columns: [{ name: 'Quarter' }],
    values: [
      { name: 'Revenue', type: 'Sum' },
      { name: 'Growth', type: 'Avg' }
    ],
    filters: [{ name: 'Year' }],
    formatSettings: [
      { name: 'Revenue', format: 'C0' },
      { name: 'Growth', format: 'P2' }
    ]
  }
};

const dataSourceSettings = ref({
  dataSource: pivotData,
  rows: [],
  columns: [],
  values: [],
  filters: [],
  formatSettings: []
});

// Load default report on component creation
const loadInitialReport = () => {
  const defaultReport = predefinedReports['sales-by-region'];
  Object.assign(dataSourceSettings.value, defaultReport);
  pivot.value?.refresh?.();
};

// Load report from dropdown selection
const loadSelectedReport = (event) => {
  const reportName = event.target.value;
  if (!reportName) return;
  
  const report = predefinedReports[reportName];
  if (report) {
    Object.assign(dataSourceSettings.value, report);
    pivot.value?.refresh?.();
  }
};

provide('pivotview', [FieldList, Toolbar]);
</script>
```

### Load Report from Server

⚠️ **SECURITY WARNING**: Only load reports from trusted, authenticated endpoints. Always validate the response before applying it to your pivot configuration.

```vue
<script setup>
import { ref, onMounted } from 'vue';

const dataSourceSettings = ref({
  dataSource: [],
  rows: [],
  columns: [],
  values: [],
  filters: []
});

const pivot = ref(null);

// Validate report configuration structure
const isValidReportConfig = (config) => {
  return config && typeof config === 'object' && 
         'rows' in config && 'columns' in config && 'values' in config;
};

// Fetch report from server and apply
const loadReportFromServer = async (reportId) => {
  try{
    // ✓ SECURE: Use trusted endpoint
    const url = `https://your-server/api/reports/${reportId}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'X-API-Key': apiKey  // Your API key
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const report = await response.json();
    
    // ✓ SECURE: Validate report structure before applying
    if (!isValidReportConfig(report.config)) {
      console.error('Invalid report configuration received');
      return;
    }
    
    // Apply fetched configuration
    Object.assign(dataSourceSettings.value, report.config);
    pivot.value?.refresh?.();
    
    console.log(`✓ Report "${report.name}" loaded`);
  } catch (error) {
    console.error('Failed to load report:', error);
  }
};

onMounted(async () => {
  // Load default report on mount
  await loadReportFromServer('default-report');
});
</script>
```

**❌ DO NOT** do this:
```vue
// Unsafe: Accepts user input for API endpoint
const userProvidedUrl = getUserInput();
const response = await fetch(`${userProvidedUrl}/api/reports/${reportId}`);  // Risk!
```

**Server API Response Format:**
```json
{
  "id": "default-report",
  "name": "Sales Overview",
  "config": {
    "rows": [{ "name": "Country" }],
    "columns": [{ "name": "Year" }],
    "values": [{ "name": "Sales", "type": "Sum" }],
    "filters": [],
    "formatSettings": [{ "name": "Sales", "format": "C2" }]
  }
}
```

### Template-Based Report System
```vue
<template>
  <div class="report-manager">
    <div class="templates">
      <h3>Report Templates</h3>
      <div v-for="template in reportTemplates" :key="template.id" class="template-card">
        <h4>{{ template.name }}</h4>
        <p>{{ template.description }}</p>
        <button @click="applyTemplate(template)">Use Template</button>
      </div>
    </div>

    <ejs-pivotview
      ref="pivot"
      :dataSourceSettings="dataSourceSettings"
      :showFieldList="true">
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const pivot = ref(null);

const reportTemplates = [
  {
    id: 'regional',
    name: 'Regional Sales',
    description: 'Sales breakdown by geography',
    config: {
      rows: [{ name: 'Region' }, { name: 'Country' }],
      columns: [{ name: 'Year' }],
      values: [{ name: 'Sales', type: 'Sum' }],
      filters: []
    }
  },
  {
    id: 'product',
    name: 'Product Performance',
    description: 'Performance metrics per product',
    config: {
      rows: [{ name: 'Category' }],
      columns: [{ name: 'Quarter' }],
      values: [{ name: 'Revenue', type: 'Sum' }, { name: 'Margin', type: 'Avg' }],
      filters: [{ name: 'Year' }]
    }
  },
  {
    id: 'trend',
    name: 'Trend Analysis',
    description: 'Historical trends and forecasts',
    config: {
      rows: [{ name: 'Month' }],
      columns: [{ name: 'Product' }],
      values: [{ name: 'Sales', type: 'Sum' }],
      filters: [{ name: 'Region' }]
    }
  }
];

const dataSourceSettings = ref({
  dataSource: pivotData,
  rows: [],
  columns: [],
  values: [],
  filters: []
});

const applyTemplate = (template) => {
  Object.assign(dataSourceSettings.value, template.config);
  pivot.value?.refresh?.();
  console.log(`✓ Template "${template.name}" applied`);
};
</script>

<style scoped>
.report-manager {
  display: flex;
  gap: 20px;
}

.templates {
  width: 300px;
  flex-shrink: 0;
}

.template-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 4px;
  cursor: pointer;
}

.template-card:hover {
  background: #f5f5f5;
  border-color: #667eea;
}

.template-card button {
  background: #667eea;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
}

.template-card button:hover {
  background: #764ba2;
}
</style>
```

