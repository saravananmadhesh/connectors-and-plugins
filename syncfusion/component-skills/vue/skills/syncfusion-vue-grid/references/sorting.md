# Sorting in Vue Grid

## Table of Contents
- [When to Use](#when-to-use)
- [Basic Sorting](#basic-sorting)
- [Sort Direction](#sort-direction)
- [Multi-Column Sorting](#multi-column-sorting)
- [Foreign Key Sorting](#foreign-key-sorting)
- [Custom Sort Comparers](#custom-sort-comparers)
- [Culture-Based Sorting](#culture-based-sorting)
- [Programmatic Sorting](#programmatic-sorting)
- [Sort Events](#sort-events)
- [Touch and Gesture Sorting](#touch-and-gesture-sorting)
- [Sort Icon Customization](#sort-icon-customization)

## When to Use

Use sorting to enable users to organize data in ascending or descending order by one or multiple columns. Sorting enhances data analysis by allowing users to quickly identify patterns, locate specific records, and organize information according to their needs. Syncfusion Grid supports multi-column sorting, custom sort comparers, culture-based sorting, and touch-based sorting.

## Basic Sorting

Enable sorting by setting the `allowSorting` property to true and inject the Sort module:

```vue
<template>
  <ejs-grid :dataSource="data" :allowSorting="true" height="315px">
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
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Sort } from "@syncfusion/ej2-vue-grids";
import { data } from "./datasource.js";

provide("grid", [Sort]);
</script>
```

### Disable Sorting for Specific Columns

```vue
<e-column 
  field="OrderID" 
  headerText="Order ID" 
  :allowSorting="false" 
  width="100" 
  textAlign="Right">
</e-column>
```

---

## Sort Direction

### Initial Sort Direction

Set the initial sort direction (Ascending or Descending) when the grid loads:

```vue
<template>
  <ejs-grid :dataSource="data" :allowSorting="true" :sortSettings="sortSettings" height="315px">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100" textAlign="Right"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="ShipCity" headerText="Ship City" width="150"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const sortSettings = { 
  columns: [
    { field: "OrderID", direction: "Descending" }
  ]
};
</script>
```

### Default Sort Direction Override

Change what direction sorting defaults to when a user first clicks a column header:

```vue
const sortSettings = {
  columns: [],
  initialSortDirection: "Descending"  // Default: "Ascending"
};
```

Possible values:
- `Ascending`: Sort in ascending order by default
- `Descending`: Sort in descending order by default

---

## Multi-Column Sorting

Enable sorting by multiple columns simultaneously:

```vue
<template>
  <ejs-grid :dataSource="data" :allowSorting="true" :sortSettings="sortSettings" height="315px">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100" textAlign="Right"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="ShipCity" headerText="Ship City" width="150"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const sortSettings = {
  columns: [
    { field: "CustomerID", direction: "Ascending" },
    { field: "ShipCity", direction: "Ascending" }
  ]
};
</script>
```

### Allow Multiple Column Sort by Clicking Headers

Users can sort by multiple columns by holding Ctrl and clicking column headers. Configure the sort mode:

```vue
const sortSettings = {
  allowMultiSorting: true,
  sortMode: "Child"  // or "Parent" (default)
};
```

Possible values:
- `Parent`: When sorting a column, all child columns are cleared
- `Child`: When sorting a column, the sort orders of all other columns are retained

---

## Foreign Key Sorting

Sort grid by foreign key column values (text from related data):

```vue
<template>
  <ejs-grid :dataSource="gridData" :allowSorting="true" height="315px">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100" textAlign="Right"></e-column>
      <e-column 
        field="EmployeeID" 
        headerText="Employee" 
        width="120"
        :dataSource="employeeData"
        foreignKeyField="EmployeeID"
        foreignKeyValue="EmployeeName">
      </e-column>
      <e-column field="Freight" headerText="Freight" textAlign="Right" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { provide } from "vue";
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Sort, ForeignKey } from "@syncfusion/ej2-vue-grids";

provide("grid", [Sort, ForeignKey]);
</script>
```

**How it works:**
- `foreignKeyField`: The actual key in the current row (EmployeeID)
- `foreignKeyValue`: The display value from related data (EmployeeName)
- When sorted, Grid sorts by the display value, not the numeric ID

---

## Custom Sort Comparers

Create custom sort logic using custom comparer functions:

```vue
<script setup>
const customComparer = (value1, value2) => {
  // Return -1 if value1 < value2
  // Return 0 if value1 === value2
  // Return 1 if value1 > value2
  
  if (value1.length < value2.length) {
    return -1;
  }
  if (value1.length > value2.length) {
    return 1;
  }
  return 0;
};

const handleSortColumn = () => {
  grid.value.ej2Instances.sortByColumn("CustomerID", "Ascending", true, customComparer);
};
</script>
```

**Application:** Custom comparers are useful when:
- Sorting alphanumeric values (e.g., "v2.1" before "v10.0")
- Sorting custom data types with specific business logic
- Sorting dates in non-standard formats
- Sorting strings with special characters

---

## Culture-Based Sorting

Sort values based on culture/locale rules. For example, in Swedish, "ä" comes after "z", but in German, "ä" sorts near "a":

```vue
<template>
  <ejs-grid :dataSource="data" :allowSorting="true" :locale="'sv-SE'" height="315px">
    <e-columns>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { setCulture } from "@syncfusion/ej2-base";

// Set culture before grid initialization
setCulture('sv-SE');  // Swedish
</script>
```

**Culture Codes:**
- `en-US`: English (United States)
- `de-DE`: German (Germany)
- `sv-SE`: Swedish (Sweden)
- `fr-FR`: French (France)
- `es-ES`: Spanish (Spain)
- `ja-JP`: Japanese (Japan)

Sorting will automatically apply the locale's collation rules.

---

## Programmatic Sorting

Apply sorting through code instead of user interaction:

```vue
const applySorting = () => {
  // Single column sort
  grid.value.ej2Instances.sortByColumn("CustomerID", "Ascending");
};

const applyMultiColumnSort = () => {
  // Multi-column sort
  grid.value.ej2Instances.sortByColumn("CustomerID", "Ascending", true);
  grid.value.ej2Instances.sortByColumn("ShipCity", "Descending", true);
};

const clearSort = () => {
  // Remove all sorting
  grid.value.ej2Instances.clearSorting();
};
```

**Parameters:**
- Column field name
- Sort direction ("Ascending" or "Descending")
- Whether to retain existing sort (true/false)
- Optional: Custom comparer function

---

## Sort Events

Capture and respond to sorting operations:

```vue
const actionBegin = (args) => {
  if (args.requestType === "sorting") {
    console.log("Before sort", args);
    // Validate sort criteria, perform pre-sort logic
  }
};

const actionComplete = (args) => {
  if (args.requestType === "sorting") {
    console.log("After sort", args);
    // Perform post-sort actions
    console.log("Sort columns:", args.columns);
  }
};

const actionFailure = (args) => {
  console.error("Sort failed", args);
};
```

### Event Properties

- `args.requestType`: "sorting"
- `args.columns`: Array of sorted columns with field, direction
- `args.data`: The sorted data

---

## Touch and Gesture Sorting

Enable sorting through touch interactions on mobile and tablet devices:

```vue
<template>
  <ejs-grid 
    :dataSource="data" 
    :allowSorting="true"
    :allowTouchDragSort="true"
    height="315px">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100" textAlign="Right"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
    </e-columns>
  </ejs-grid>
</template>
```

**Touch Sorting Methods:**
- **Headers:** Tap on a column header to sort
- **Long Press:** Hold a column header to open sort menu
- **Swipe:** Gesture support for sort direction changes in some configurations

---

## Sort Icon Customization

Customize the appearance of sort icons in column headers:

### CSS Class Customization

```css
/* Style ascending sort icon */
.e-grid .e-sort-ascending::before {
  content: "▲";
  color: #0066cc;
}

/* Style descending sort icon */
.e-grid .e-sort-descending::before {
  content: "▼";
  color: #0066cc;
}

/* Custom icon size */
.e-grid .e-gridcell.e-headercell .e-sort-icon {
  font-size: 18px;
  margin-left: 8px;
}
```

### Using Icon Libraries

```css
/* Using Material Icons */
@import url('url');

.e-sort-ascending::before {
  font-family: 'Material Icons';
  content: "arrow_upward";
}

.e-sort-descending::before {
  font-family: 'Material Icons';
  content: "arrow_downward";
}
```

### Template-Based Icon Customization

```vue
<e-column 
  field="CustomerID" 
  headerText="Customer ID" 
  width="120"
  :headerTemplate="headerTemplate">
</e-column>

const headerTemplate = (props) => {
  return {
    template: `
      <div>
        ${props.headerText}
        <span class="custom-sort-icon">⬆️</span>
      </div>
    `
  };
};
```

---

## Common Sorting Patterns

### Sort and Reset Behavior

```vue
const sortAndReset = () => {
  // Clear existing sorts
  grid.value.ej2Instances.clearSorting();
  
  // Apply new sort
  grid.value.ej2Instances.sortByColumn("OrderID", "Ascending");
};
```

### Dynamic Sort Based on User Preference

```vue
const userPreference = {
  sortField: "CustomerID",
  sortDirection: "Ascending"
};

const applyUserPreferenceSort = () => {
  grid.value.ej2Instances.sortByColumn(
    userPreference.sortField, 
    userPreference.sortDirection
  );
};
```

### Combined Sorting and Filtering

```vue
const actionComplete = (args) => {
  if (args.requestType === "filtering") {
    // When filter completes, apply default sort
    grid.value.ej2Instances.sortByColumn("OrderID", "Ascending");
  }
};
```
