# Grouping in Vue Grid

## Table of Contents
- [When to Use](#when-to-use)
- [Basic Grouping](#basic-grouping)
- [Prevent Grouping for Specific Columns](#prevent-grouping-for-specific-columns)
- [Multi-Level Grouping](#multi-level-grouping)
- [Reorder Grouped Columns](#reorder-grouped-columns)
- [Group with Paging](#group-with-paging)
- [Group Caption Templates](#group-caption-templates)
- [Group by Format](#group-by-format)
- [Collapse/Expand Groups](#collapseexpand-groups)
- [Programmatic Grouping](#programmatic-grouping)
- [Sort Grouped Columns](#sort-grouped-columns)
- [Lazy Load Grouping](#lazy-load-grouping)
- [Grouping Events](#grouping-events)

## When to Use

Grouping organizes data into logical subsets based on column values, helping users identify patterns and manage related data. Use grouping to summarize hierarchical information, improve data visualization, and allow users to expand/collapse groups for detailed analysis. Syncfusion Grid supports multi-level grouping, custom captions, lazy loading for large datasets, and advanced grouping operations.

## Basic Grouping

Enable grouping by setting the `allowGrouping` property to true and inject the Group module:

```vue
<template>
  <ejs-grid :dataSource="data" :allowGrouping="true" :groupSettings="groupSettings" height="315px">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100" textAlign="Right"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="ShipCity" headerText="Ship City" width="150"></e-column>
      <e-column field="ShipName" headerText="Ship Name" width="150"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { provide } from "vue";
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Group } from "@syncfusion/ej2-vue-grids";
import { data } from "./datasource.js";

const groupSettings = { 
  columns: ["ShipCity"]  // Group by ShipCity
};

provide("grid", [Group]);
</script>
```

---

## Prevent Grouping for Specific Columns

Prevent users from grouping by certain columns:

```vue
<e-column 
  field="OrderID" 
  headerText="Order ID" 
  :allowGrouping="false"
  width="100" 
  textAlign="Right">
</e-column>
```

When `allowGrouping` is false, the column cannot be used for grouping by draggi ng into the group drop area.

---

## Multi-Level Grouping

Group by multiple columns to create nested group hierarchies:

```vue
<template>
  <ejs-grid :dataSource="data" :allowGrouping="true" :groupSettings="groupSettings" height="400px">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100" textAlign="Right"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="ShipCountry" headerText="Ship Country" width="150"></e-column>
      <e-column field="ShipCity" headerText="Ship City" width="150"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const groupSettings = { 
  columns: ["ShipCountry", "ShipCity"]  // Group by Country, then City
};
</script>
```

**Result:** Data is grouped first by ShipCountry, then by ShipCity within each country group.

---

## Reorder Grouped Columns

Change the grouping hierarchy by reordering columns in the group drop area:

```vue
<template>
  <ejs-grid ref="grid" :dataSource="data" :allowGrouping="true" :groupSettings="groupSettings">
    <e-columns>
      <!-- columns -->
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const reorderGroups = () => {
  // Change grouping order programmatically
  grid.value.ej2Instances.groupSettings.columns = ["ShipCity", "ShipCountry"];
  grid.value.ej2Instances.refresh();
};
</script>
```

---

## Group with Paging

Display grouped data with pagination to show a specific number of groups per page:

```vue
<template>
  <ejs-grid 
    :dataSource="data" 
    :allowGrouping="true" 
    :allowPaging="true"
    :groupSettings="groupSettings"
    :pageSettings="pageSettings"
    height="400px">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100" textAlign="Right"></e-column>
      <e-column field="ShipCity" headerText="Ship City" width="150"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const groupSettings = { 
  columns: ["ShipCity"],
  enableImmediateMode: false  // Allow group + page interaction
};

const pageSettings = { pageSize: 25 };
</script>
```

### Show Grouped Rows Based on Page Size

Control how many rows are displayed per page when grouping is active:

```vue
const pageSettings = { 
  pageSize: 25,  // Includes group header rows in count
  allowPreviousPage: true
};
```

---

## Group Caption Templates

Customize group header appearance and content using templates:

```vue
<template>
  <ejs-grid 
    :dataSource="data" 
    :allowGrouping="true" 
    :groupSettings="groupSettings"
    height="400px">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="ShipCity" headerText="Ship City" width="150"></e-column>
      <e-column field="Freight" headerText="Freight" width="100" textAlign="Right"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { provide } from "vue";
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Group, GroupSettings } from "@syncfusion/ej2-vue-grids";

const groupSettings = {
  columns: ["ShipCity"],
  captionTemplate: `
    <div>
      <span style="font-weight: bold">\${key}</span>
      <span style="margin-left: 10px; color: gray">(\${count} items)</span>
    </div>
  `
};

const groupAggregates = {
  columns: [{
    field: "Freight",
    type: "Sum",
    footerTemplate: "Total: \${Sum}"
  }]
};

provide("grid", [Group, GroupSettings]);
</script>
```

### Variables Available in Caption Template

- `${key}`: Group value (e.g., city name)
- `${count}`: Number of records in group
- `${aggregates}`: Aggregate values if configured
- `${childLevels}`: Nested group levels

---

## Group by Format

Group data by formatted values rather than raw values:

```vue
<template>
  <ejs-grid 
    :dataSource="data" 
    :allowGrouping="true" 
    :groupSettings="groupSettings"
    height="400px">
    <e-columns>
      <e-column field="OrderDate" headerText="Order Date" width="130" type="date" format="yMd"></e-column>
      <e-column field="Freight" headerText="Freight" width="100" textAlign="Right"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const groupSettings = { 
  columns: ["OrderDate"],
  format: "MMM yyyy"  // Group by Month-Year instead of exact date
};
</script>
```

**Example:** Instead of grouping by exact dates (1/15/2023, 1/16/2023, etc.), group by months (Jan 2023, Feb 2023).

Supported formats:
- `"yyyy-MM-dd"`: Year-Month-Day
- `"MMM yyyy"`: Month Year
- `"MMMM"`: Full month name
- For numbers: range-based grouping

---

## Collapse/Expand Groups

### Collapse All Groups at Initial Rendering

Start with all groups collapsed:

```vue
<template>
  <ejs-grid 
    :dataSource="data" 
    :allowGrouping="true" 
    :groupSettings="groupSettings"
    :dataBound="dataBound"
    height="400px">
    <e-columns>
      <e-column field="ShipCity" headerText="Ship City" width="150"></e-column>
      <e-column field="OrderID" headerText="Order ID" width="100" textAlign="Right"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const groupSettings = { 
  columns: ["ShipCity"]
};

const dataBound = () => {
  // Collapse all group rows after binding
  grid.value.ej2Instances.groupModule.collapseAll();
};
</script>
```

### Expand All Groups

```vue
const expandAllGroups = () => {
  grid.value.ej2Instances.groupModule.expandAll();
};
```

### Toggle Specific Group

```vue
const toggleGroup = (groupKey) => {
  const groupRows = grid.value.ej2Instances.groupModule.getGroupRowsBy(groupKey);
  groupRows.forEach(row => {
    if (row.classList.contains('e-groupexpand')) {
      row.click();  // Toggle
    }
  });
};
```

### Collapse Groups Programmatically

```vue
const collapseGroup = (groupValue) => {
  const groupRow = grid.value.ej2Instances.getRowByIndex(
    grid.value.ej2Instances.groupModule.getGroupRowIndex(groupValue)
  );
  if (groupRow && !groupRow.classList.contains('e-groupcollapse')) {
    groupRow.click();
  }
};
```

---

## Programmatic Grouping

### Group or Ungroup Columns

Change grouping via code:

```vue
const groupByCity = () => {
  grid.value.ej2Instances.groupByColumn("ShipCity");
};

const ungroupByCity = () => {
  grid.value.ej2Instances.ungroupByColumn("ShipCity");
};

const clearAllGroups = () => {
  grid.value.ej2Instances.groupSettings.columns = [];
  grid.value.ej2Instances.refresh();
};
```

### Add Group Dynamically

```vue
const addGrouping = () => {
  const currentGroups = [...grid.value.ej2Instances.groupSettings.columns];
  currentGroups.push("CustomerID");
  grid.value.ej2Instances.groupSettings.columns = currentGroups;
};
```

### Get Grouped Column Information

```vue
const getGroupedColumns = () => {
  const groupedCols = grid.value.ej2Instances.groupSettings.columns;
  console.log("Currently grouped by:", groupedCols);
  
  return groupedCols.map(field => {
    const column = grid.value.ej2Instances.getColumnByField(field);
    return {
      field: field,
      headerText: column.headerText
    };
  });
};
```

---

## Sort Grouped Columns

### Sort Grouped Columns in Descending Order

Sort groups by their key values:

```vue
<template>
  <ejs-grid 
    :dataSource="data" 
    :allowGrouping="true" 
    :allowSorting="true"
    :groupSettings="groupSettings"
    :sortSettings="sortSettings"
    height="400px">
    <e-columns>
      <e-column field="ShipCity" headerText="Ship City" width="150"></e-column>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const groupSettings = { 
  columns: ["ShipCity"]
};

const sortSettings = {
  columns: [
    { field: "ShipCity", direction: "Descending" }  // Sort groups descending
  ]
};
</script>
```

### Sort Groups During Initial Grouping

```vue
const groupAndSort = () => {
  grid.value.ej2Instances.groupByColumn("ShipCity", "Descending");
};
```

---

## Lazy Load Grouping

Load grouped child data on-demand when users expand groups, improving performance:

```vue
<template>
  <ejs-grid 
    :dataSource="dataManager"
    :allowGrouping="true" 
    :groupSettings="lazyGroupSettings"
    height="400px">
    <e-columns>
      <e-column field="ShipCity" headerText="Ship City" width="150"></e-column>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";

const dataManager = new DataManager({
  url: "url",
  adaptor: new WebApiAdaptor(),
  crossDomain: true
});

const lazyGroupSettings = {
  columns: ["ShipCity"],
  enableLazyLoadGrouping: true,
  lazyLoadGroupSettings: {
    expandedCount: 50,  // Show 50 items in first group
    pageSize: 25       // Page size for child data
  }
};
</script>
```

### Server-Side Lazy Load Grouping

Configure server to handle lazy loading on expand:

```vue
const actionBegin = (args) => {
  if (args.requestType === "groupExpand") {
    // Server will fetch child data for expanded group
    console.log("Expanding group:", args.data);
  }
};
```

### LazyLoadGroup Module

```vue
import { LazyLoadGroup } from "@syncfusion/ej2-vue-grids";

const lazyLoadModule = new LazyLoadGroup({
  expandedCount: 50,
  childCount: 100
});
```

---

## Grouping Events

### Capture Grouping Operations

```vue
const actionBegin = (args) => {
  if (args.requestType === "grouping") {
    console.log("Before grouping:", args);
    // Perform validation or setup
  }
};

const actionComplete = (args) => {
  if (args.requestType === "grouping") {
    console.log("Grouping complete:", args);
    // Perform post-grouping actions
  }
};

const actionFailure = (args) => {
  console.error("Grouping failed:", args);
};
```

### Expand/Collapse Events

```vue
const onGroupExpand = (args) => {
  console.log("Group expanded:", args.data);
  // Load additional data, analytics, etc.
};

const onGroupCollapse = (args) => {
  console.log("Group collapsed:", args.data);
  // Clean up resources
};
```

---

## Advanced Grouping Scenarios

### Group with Aggregates

Calculate summaries for each group:

```vue
<template>
  <ejs-grid 
    :dataSource="data" 
    :allowGrouping="true"
    :groupSettings="groupSettings"
    :aggregateRows="aggregateRows"
    height="400px">
    <e-columns>
      <e-column field="ShipCity" headerText="Ship City" width="150"></e-column>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="Freight" headerText="Freight" width="100" textAlign="Right"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const groupSettings = { columns: ["ShipCity"] };

const aggregateRows = [{
  columns: [
    { 
      field: "Freight", 
      type: "Sum",
      groupCaptionTemplate: "Total Freight: ${Sum}"
    }
  ]
}];
</script>
```

### Combine Grouping with Filtering

```vue
const filterAndGroup = () => {
  // Apply filter first
  grid.value.ej2Instances.filterByColumn("Freight", ">", 100);
  
  // Then apply grouping to filtered results
  setTimeout(() => {
    grid.value.ej2Instances.groupByColumn("ShipCity");
  }, 500);
};
```

### Custom Group Hierarchy

```vue
const createCustomGrouping = () => {
  // Group by multiple fields with different sort directions
  grid.value.ej2Instances.groupSettings.columns = ["ShipCountry", "ShipCity"];
  grid.value.ej2Instances.sortSettings.columns = [
    { field: "ShipCountry", direction: "Ascending" },
    { field: "ShipCity", direction: "Descending" }
  ];
  grid.value.ej2Instances.refresh();
};
```

### Export Grouped Data

```vue
const exportGroupedData = () => {
  // Export maintains grouping structure
  grid.value.ej2Instances.excelExport();
};
```

---

## Common Grouping Patterns

### Conditional Grouping

```vue
const groupByUserPreference = (userPreference) => {
  if (userPreference.groupByCountry) {
    grid.value.ej2Instances.groupByColumn("ShipCountry");
  }
  if (userPreference.groupByCity) {
    grid.value.ej2Instances.groupByColumn("ShipCity");
  }
};
```

### Dynamic Group Depth

```vue
const groupByDepth = (depth) => {
  const groupColumns = [];
  if (depth >= 1) groupColumns.push("ShipCountry");
  if (depth >= 2) groupColumns.push("ShipCity");
  if (depth >= 3) groupColumns.push("CustomerID");
  
  grid.value.ej2Instances.groupSettings.columns = groupColumns;
  grid.value.ej2Instances.refresh();
};
```

### Preserve Group State

```vue
const groupState = {};

const saveGroupState = () => {
  groupState.columns = grid.value.ej2Instances.groupSettings.columns;
  groupState.expanded = [];
};

const restoreGroupState = () => {
  grid.value.ej2Instances.groupSettings.columns = groupState.columns;
  grid.value.ej2Instances.refresh();
};
```
