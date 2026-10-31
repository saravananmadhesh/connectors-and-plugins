# Filtering in Vue Grid

## Table of Contents
- [When to Use](#when-to-use)
- [Basic Filtering](#basic-filtering)
- [Filter Bar](#filter-bar)
- [Filter Menu](#filter-menu)
- [Excel-Like Filters](#excel-like-filters)
- [Checkbox Filters](#checkbox-filters)
- [Filter Configuration](#filter-configuration)
- [Diacritics Filter](#diacritics-filter)
- [Filtering Events](#filtering-events)
- [Common Filtering Patterns](#common-filtering-patterns)

## When to Use

Use filtering to allow users to selectively view data based on specific criteria. This powerful feature enables users to narrow down large datasets and focus on the information they need, enhancing data analysis and decision-making. Syncfusion Grid supports multiple filtering approaches: Filter Bar (inline text inputs), Filter Menu (dropdown with operators), Excel-like Filters (checkbox lists), and Checkbox Filters for categorical data.

## Basic Filtering

Enable filtering by setting the `allowFiltering` property to true and inject the Filter module:

```vue
<template>
  <ejs-grid :dataSource='data' :allowFiltering='true' :filterSettings='filterOptions' height='273px'>
    <e-columns>
      <e-column field='OrderID' headerText='Order ID' textAlign='Right' width=100></e-column>
      <e-column field='CustomerID' headerText='Customer ID' width=120></e-column>
      <e-column field='ShipCity' headerText='Ship City' width=100></e-column>
      <e-column field='ShipName' headerText='Ship Name' width=100></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { provide } from 'vue';
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Filter } from "@syncfusion/ej2-vue-grids";
import { data } from './datasource.js';

const filterOptions = { type: 'FilterBar' };

provide('grid', [Filter]);
</script>
```

### Disable Filtering for Specific Columns

```vue
<e-column 
  field='OrderID' 
  headerText='Order ID' 
  textAlign='Right' 
  :allowFiltering='false' 
  width=100
/>
```

### Initial Filters

Set default filters when grid loads:

```vue
<template>
  <ejs-grid :dataSource='data' :allowFiltering='true' height='273px'>
    <e-columns>
      <!-- columns -->
    </e-columns>
    <e-filter-settings 
      :columns='[
        { field: "OrderID", matchCase: false, operator: "equal", value: "10248" },
        { field: "CustomerID", matchCase: false, operator: "contains", value: "VINET" }
      ]'>
    </e-filter-settings>
  </ejs-grid>
</template>
```

### Initial Filter with Multiple Values

Apply multiple filters to the same or different columns:

```vue
const filterOptions = {
  columns: [
    { field: 'OrderID', matchCase: false, operator: 'equal', value: '10248' },
    { field: 'CustomerID', matchCase: false, operator: 'contains', value: 'VINET' }
  ]
};
```

---

## Filter Bar

Display filter input fields below column headers for inline filtering:

```vue
const filterOptions = { type: 'FilterBar' };
```

### Filter Bar Modes

Configure when filtering is applied:

- **OnEnter**: Apply filter when Enter key is pressed
- **Immediate**: Apply filter immediately as user types
- **OnBlur**: Apply filter when input loses focus

```vue
const filterOptions = { 
  type: 'FilterBar',
  mode: 'OnEnter'  // or 'Immediate', 'OnBlur'
};
```

### Display Filter Text in Pager

Show filter status in the pager area:

```vue
const filterOptions = { 
  type: 'FilterBar',
  showFilterBarStatus: true
};
```

### Show or Hide Filter Bar Operator

Display or hide operator dropdowns in filter bar cells:

```vue
const filterOptions = { 
  type: 'FilterBar',
  showFilterBarOperator: true
};
```

### Filter Bar Expressions

Manual filter operators (when typing in filter cells):

| Operator | Expression | Meaning | Column Type |
|----------|-----------|---------|------------|
| = | =value | equal | Number |
| != | !=value | notequal | Number |
| > | >value | greaterthan | Number |
| < | <value | lessthan | Number |
| >= | >=value | greaterthanorequal | Number |
| <= | <=value | lessthanorequal | Number |
| * | *value | startswith | String |
| % | %value | endswith | String |
| N/A | N/A | Always = for Date | Date |
| N/A | N/A | Always = for Boolean | Boolean |

### Filter Bar Template with Custom Component

Create custom filter inputs for specific columns:

```vue
<e-column 
  field='CustomerID'
  headerText='Customer ID'
  width=120>
  <template v-slot:filterTemplate>
    <ejs-dropdownlist 
      id='dropdown' 
      :dataSource='dropDownData'
      :fields='{ text: "CustomerID", value: "CustomerID" }'
      placeholder='Select customer'>
    </ejs-dropdownlist>
  </template>
</e-column>
```

### Hide Filter Bar for Template Column

```vue
const load = () => {
  grid.value.ej2Instances.columns[2].filterTemplate = '<span></span>';
}
```

---

## Filter Menu

Dropdown-based filtering with operator selection and multiple conditions:

```vue
const filterOptions = { type: 'Menu' };
```

### Customize Filter Menu Operators

```vue
<e-column 
  field='Freight'
  headerText='Freight'
  width=80
  :filter='{ type: "Menu", operator: ["equal", "greaterThan", "lessThan"] }'>
</e-column>
```

### Customizing Filter Menu Operators List

```vue
const filterOptions = {
  type: 'Menu',
  filterOperators: {
    stringOperator: [
      { value: 'startswith', text: 'Starts With' },
      { value: 'endswith', text: 'Ends With' },
      { value: 'contains', text: 'Contains' },
      { value: 'equal', text: 'Equal' }
    ],
    numberOperator: [
      { value: 'equal', text: 'Equal' },
      { value: 'notEqual', text: 'Not Equal' },
      { value: 'greaterThan', text: 'Greater Than' }
    ],
    booleanOperator: [
      { value: 'equal', text: 'Equal' },
      { value: 'notEqual', text: 'Not Equal' }
    ]
  }
}
```

### Show 24-Hour Time Format in Filter Dialog

For datetime columns, display time in 24-hour format:

```vue
const actionComplete = (args) => {
  if (args.requestType === 'filterAfterOpen') {
    const columnObj = grid.value.getColumnByField(args.columnName);
    if (columnObj.type === 'datetime') {
      const dateObj = document.getElementById('dateui-' + columnObj.uid)['ej2_instances'][0];
      dateObj.timeFormat = 'HH:mm';
    }
  }
};
```

### Customize Default Input Component

Customize filter input components for specific column types:

```vue
<e-column field='OrderID' headerText='Order ID' :filter='filterParams' textAlign='Right' width=100></e-column>

const filterParams = {
  params: { showSpinButton: false }  // For numeric columns
};
```

| Column Type | Default Component | Example Param |
|------------|------------------|----------------|
| String | AutoComplete | `{ params: { autofill: false }}` |
| Number | NumericTextBox | `{ params: { showSpinButton: false }}` |
| Boolean | DropDownList | `{ params: { sortOrder:'Ascending'}}` |
| Date | DatePicker | `{ params: { weekNumber: true }}` |
| DateTime | DateTimePicker | `{ params: { showClearButton: true }}` |

### Custom Component in Filter Menu

Render custom components like MultiSelect in filter menu:

```vue
<e-column field='OrderID' :filter='filter' headerText='Order ID' textAlign='Right' width=100></e-column>

const filter = {
  ui: {
    create: function (args) {
      let flValInput = createElement('input', { className: 'flm-input' });
      args.target.appendChild(flValInput);
      new MultiSelect({ dataSource: countryData }, flValInput);
    }
  }
};
```

### Filter by Multiple Keywords

Perform filtering with multiple keywords using MultiSelect in filter menu:

```vue
const filterSettings = { type: 'Menu' };

const filter = {
  ui: {
    create: function (args) {
      let flValInput = createElement('input', { className: 'flm-input' });
      args.target.appendChild(flValInput);
      dropInstance = new MultiSelect({
        dataSource: gridData,
        fields: { text: 'CustomerID', value: 'CustomerID' },
        change: (args) => {
          grid.value.ej2Instances.removeFilteredColsByField(args.column.field);
          args.fltrObj.filterByColumn(args.column.field, "contains", dropInstance.value);
        }
      }, flValInput);
    }
  }
};
```

### Filter Menu Events

Handle filter menu operations:

```vue
const actionBegin = (args) => {
  if (args.requestType === 'filterBeforeOpen' && args.columnType === "number") {
    args.filterModel.customFilterOperators.numberOperator = [
      { value: "equal", text: "Equal" },
      { value: "notequal", text: "Not Equal" }
    ];
  }
};

const actionComplete = (args) => {
  if (args.requestType === 'filterAfterOpen') {
    // Filter menu opened
  }
};
```

---

## Excel-Like Filters

Checkbox-based filtering similar to Microsoft Excel:

```vue
const filterOptions = { type: 'Excel' };
```

### Checkbox Filtering

The checkbox filtering feature enables filtering data based on checkbox selections within a column:

```vue
<template>
  <ejs-grid ref="grid" :dataSource="data" :allowPaging='true' :pageSettings='pageSettings' :allowFiltering="true" :filterSettings="filterOptions" height="200px">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="80"></e-column>
      <e-column field="CustomerID" headerText="CustomerID" width="90"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { provide } from "vue";
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Filter, Page } from "@syncfusion/ej2-vue-grids";

const filterOptions = { type: "CheckBox" };
const pageSettings = { pageSize: 6 };

provide('grid', [Filter, Page]);
</script>
```

### Customize Filter Choice Count

Control number of distinct values displayed in the checkbox list. Default is 1000:

```vue
const actionBegin = (args) => {
  if (args.requestType === 'filterChoiceRequest' || args.requestType === 'filterSearchBegin') {
    args.filterChoiceCount = 3000;  // Display up to 3000 distinct values
  }
};
```

### Render Checkbox List On-Demand

For large datasets, load checkbox data dynamically with infinite scrolling:

```vue
const filterSettings = { 
  type: 'Excel', 
  enableInfiniteScrolling: true,
  loadingIndicator: 'Spinner'  // or 'Shimmer' (default)
};
```

### Show Template in Checkbox List Data

Customize checkbox list rendering with templates:

```vue
const columnFilterSettings = { 
  type: "Excel",
  itemTemplate: function() {
    return {
      template: '<div><span>${CategoryName}</span></div>'
    }
  } 
};
```

### Bind Custom Remote Datasource for Excel/Checkbox Filtering

```vue
const actionBegin = function(args) {
  if (args.requestType === "filterBeforeOpen") {
    args.filterModel.options.dataSource = new DataManager({
      url: 'url',
      adaptor: new WebApiAdaptor()
    });
  }
};
```

### Customize Excel Filter Dialog Using CSS

```css
.e-grid .e-excelfilter .e-contextmenu-wrapper {
  display: none;  /* Hide context menu */
}
```

### Hide Sorting Options in Filter Dialog

```css
.e-excel-ascending,
.e-excel-descending,
.e-separator.e-excel-separator {
  display: none;
}
```

---

## Filter Configuration

### Change Default Filter Operator

Set the default filter operator for specific columns:

```vue
<e-column 
  field='Freight'
  headerText='Freight'
  width=80
  :filter='{ operator: "greaterThan" }'>
</e-column>
```

### Enable Different Filter Type for Each Column

```vue
<ejs-grid 
  ref='grid' 
  :dataSource='data' 
  :allowFiltering='true' 
  :filterSettings='filterOptions' 
  :dataBound='dataBound' 
  height='273px'>
  <e-columns>
    <e-column field='OrderID' headerText='Order ID' textAlign='Right' width=100></e-column>
    <e-column field='CustomerID' headerText='Customer ID' width=120></e-column>
  </e-columns>
</ejs-grid>

const filterOptions = { type: 'Menu' };

const dataBound = function () {
  const fieldData = grid.value.getColumnFieldNames();
  // Allow changing filter type per column
};
```

### Prevent Filtering for Specific Columns

```vue
<e-column 
  field='OrderID'
  headerText='Order ID'
  :allowFiltering='false'
  width=100>
</e-column>
```

---

## Diacritics Filter

Enable or disable diacritic-sensitive filtering (accented characters):

```vue
const filterOptions = { 
  type: 'FilterBar',
  ignoreAccent: false  // Respect diacritics (accents like é, ñ, ü)
};
```

When `ignoreAccent` is true, diacritics are ignored during filtering. When false, diacritics are considered.

---

## Filtering Events

### Handle Filtering Operations

```vue
const actionBegin = (args) => {
  if (args.requestType === 'filtering') {
    // Perform actions before filtering
    console.log('Filtering starting');
  }
};

const actionComplete = (args) => {
  if (args.requestType === 'filtering') {
    // Perform actions after filtering
    console.log('Filtering completed');
  }
};
```

### Get Filtered Records

Access filtered data using FilterEventArgs properties:

```vue
const actionComplete = (args) => {
  if (args.requestType === 'filtering') {
    // Access filtered columns
    const columns = args.columns;
    
    // Access current filter object
    const currentFilter = args.currentFilterObject;
    
    // Access currently filtering column
    const filteringColumn = args.currentFilteringColumn;
  }
};
```

### Clear Filtering Using Methods

Remove all filter conditions and reset the grid:

```vue
const clearFilter = () => {
  grid.value.ej2Instances.clearFiltering();
};
```

---

## Common Filtering Patterns

### Wildcard and LIKE Operators

Use wildcard operators in filter bar:

- `%value`: Contains the value
- `value%`: Starts with the value
- `%value%`: Contains the value (alternative)

### Filter by Column Index

Apply filter to a specific column by index:

```javascript
gridInstance.filterByColumn(2, 'equal', 'value');
```

### Programmatic Filter with Predicate

Create complex filter conditions:

```javascript
const predicate = new Predicate('Freight', '>', 50)
  .and('ShipCountry', 'equal', 'USA');

gridInstance.filter(predicate);
```

### Server-Side Filtering

Use DataManager with remote adaptors:

```vue
<template>
  <ejs-grid :dataSource="dataManager" :allowFiltering="true">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="Freight" headerText="Freight" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const dataManager = new DataManager({
  url: 'url',
  adaptor: new UrlAdaptor()
});
</script>
```

### Advanced Filter Scenarios

#### Filter ENUM Columns

```vue
<e-column 
  field='Status'
  headerText='Status'
  width=120>
  <template v-slot:filterTemplate="{ data }">
    <select v-model="filterValue" @change="applyFilter">
      <option value="">All</option>
      <option value="Active">Active</option>
      <option value="Pending">Pending</option>
    </select>
  </template>
</e-column>

const applyFilter = () => {
  gridInstance.filterByColumn('Status', 'equal', filterValue.value);
};
```

#### Perform Filter Using Custom Condition

```vue
const customFilterCondition = () => {
  const predicate = new Predicate('Freight', '>', 100)
    .and('CustomerID', 'contains', 'V');
  grid.value.ej2Instances.filter(predicate);
};
```
