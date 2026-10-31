# Searching

## Table of Contents
- [When to Use](#when-to-use)
- [Enable Search](#enable-search)
- [Search Bar](#search-bar)
- [Programmatic Search](#programmatic-search)
- [Search Events](#search-events)
- [Advanced Search](#advanced-search)

## When to Use

Use this reference when you need to:
- Enable search functionality in grid toolbar
- Implement multi-column search across all fields
- Configure search behavior (case sensitivity, operator)
- Handle search events
- Create custom search filters
- Programmatic search operations

## Enable Search

### Basic Search
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :allowSearching="true">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="ShipCountry" headerText="Ship Country" width="150"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Search } from "@syncfusion/ej2-vue-grids";
import { provide } from 'vue';

provide('grid', [Search]);
</script>
```

## Search Bar

### Search in Toolbar
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :toolbar="toolbar"
    :allowSearching="true">
    <e-columns>
      <e-column field="OrderID" width="100"></e-column>
      <e-column field="CustomerID" width="120"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const toolbar = ['Search'];  // Adds search input to toolbar
</script>
```

### Custom Search Input
```vue
<template>
  <div class="search-container">
    <input 
      v-model="searchValue" 
      placeholder="Search grid..."
      @keydown.enter="handleSearch"
      class="search-input"
    />
    <button @click="handleSearch" class="btn btn-primary">Search</button>
    <button @click="clearSearch" class="btn btn-secondary">Clear</button>
  </div>
  
  <ejs-grid :dataSource="data">
    <e-columns>
      <e-column field="OrderID" width="100"></e-column>
      <e-column field="CustomerID" width="120"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const searchValue = ref('');

const handleSearch = () => {
  if (searchValue.value) {
    gridInstance.search(searchValue.value);
  }
};

const clearSearch = () => {
  searchValue.value = '';
  gridInstance.search('');
};
</script>

<style>
.search-container {
  margin-bottom: 15px;
  display: flex;
  gap: 10px;
}

.search-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
}
</style>
```

## Programmatic Search

### Search Across All Columns
```javascript
// Search across all columns
gridInstance.search('VINET');

// Clear search
gridInstance.search('');
```

### Keyword Match
- Contains (default)
- Starts with
- Ends with
- Equal

### Clear Search
```javascript
// Clear the search by setting key to empty string
gridInstance.ej2Instances.searchSettings.key = "";

// Or use search method with empty string
gridInstance.search('');
```

## Highlight Search Text

Visually highlight search results using the `queryCellInfo` event. This event is triggered for each cell during Grid rendering:

```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :queryCellInfo="handleQueryCellInfo"
    :allowSearching="true">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const handleQueryCellInfo = (args) => {
  const searchKey = gridInstance.ej2Instances.searchSettings.key;
  
  if (searchKey && args.data) {
    const cellValue = String(args.data[args.column.field]);
    
    // Check if cell value contains search key
    if (cellValue.toLowerCase().includes(searchKey.toLowerCase())) {
      // Add custom CSS class for highlighting
      args.cell.classList.add('search-highlight');
    }
  }
};
</script>

<style>
.search-highlight {
  background-color: yellow;
  font-weight: bold;
}
</style>
```

**Implementation Steps:**
1. Use `queryCellInfo` event to check each cell value
2. Compare against `searchSettings.key`
3. Apply CSS class when search term matches
4. Style the class for visual emphasis

This provides visual feedback showing which cells contain the search term.

## Search Events

### Search Begin Event
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :actionBegin="handleActionBegin">
    <!-- columns -->
  </ejs-grid>
</template>

<script setup>
const handleActionBegin = (args) => {
  if (args.requestType === 'searching') {
    console.log('Search started with:', args.searchString);
  }
};
</script>
```

### Search Complete Event
```javascript
gridInstance.addEventListener('actionComplete', (args) => {
  if (args.requestType === 'searching') {
    console.log('Search completed');
    console.log('Results count:', gridInstance.getVisibleRecords().length);
  }
});
```

## Search Settings

### Configure Search Behavior
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :allowSearching="true"
    :searchSettings="searchSettings">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="ShipCountry" headerText="Ship Country" width="150"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const searchSettings = {
  fields: ['CustomerID', 'ShipCountry'],  // Search in specific columns
  operator: 'contains',                    // Operator type
  key: '',                                 // Initial search value
  ignoreCase: true,                        // Case-insensitive search
  ignoreAccent: true                       // Accent-insensitive search
};
</script>
```

### Search Operators

The Grid supports various search operators for different comparison types:

- **`contains`** - Finds records that contain the search key anywhere (default)
- **`startswith`** - Finds records where the value starts with the search key
- **`endswith`** - Finds records where the value ends with the search key
- **`equal`** - Exact match only
- **`notequal`** - Not equal match
- **`wildcard`** - Pattern matching (uses * as wildcard)
- **`like`** - Similar to contains

### Search Specific Columns
```javascript
// Define fields in searchSettings to limit search scope
const searchSettings = {
  fields: ['CustomerID', 'ShipCity'],  // Only search these columns
  operator: 'contains',
  key: 'London'
};
```

### Initial Search
```vue
<script setup>
const searchSettings = {
  fields: ['CustomerID'],
  operator: 'contains',
  key: 'VINET',           // Applied automatically on grid load
  ignoreCase: true,
  ignoreAccent: true
};
</script>
```

### Case and Accent Sensitivity
```javascript
// Case-insensitive (default: false)
searchSettings.ignoreCase = true;

// Accent-insensitive (default: false)
searchSettings.ignoreAccent = true;

// Both enabled for flexible searching
const flexibleSearch = {
  ignoreCase: true,
  ignoreAccent: true,
  operator: 'contains',
  key: 'Café'  // Will match 'cafe', 'Café', 'CAFE', etc.
};
```

## Practical Example

```vue
<template>
  <div class="search-grid-container">
    <div class="search-header">
      <h3>Order Search</h3>
      <div class="search-controls">
        <input 
          v-model="searchValue" 
          type="text"
          placeholder="Search by Order ID, Customer, or Country..."
          @keydown.enter="handleSearch"
          class="search-box"
        />
        <button @click="handleSearch" class="btn btn-primary">🔍 Search</button>
        <button @click="clearSearch" class="btn btn-light">Clear</button>
      </div>
    </div>
    
    <ejs-grid 
      ref="gridRef"
      :dataSource="data"
      :allowSearching="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
        <e-column field="ShipCountry" headerText="Ship Country" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" format="C2" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Search } from "@syncfusion/ej2-vue-grids";
import { provide } from 'vue';

const gridRef = ref(null);
const searchValue = ref('');

const handleSearch = () => {
  if (gridRef.value && searchValue.value) {
    gridRef.value.ej2Instances.search(searchValue.value);
  }
};

const clearSearch = () => {
  searchValue.value = '';
  if (gridRef.value) {
    gridRef.value.ej2Instances.search('');
  }
};

provide('grid', [Search]);
</script>

<style>
.search-grid-container {
  padding: 20px;
}

.search-header {
  margin-bottom: 20px;
}

.search-controls {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.search-box {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.search-box:focus {
  outline: none;
  border-color: #0078d4;
  box-shadow: 0 0 0 2px rgba(0, 120, 212, 0.1);
}
</style>
```
