# Scrolling in Vue Grid

## Table of Contents
- [When to Use](#when-to-use)
- [Basic Scrolling](#basic-scrolling)
- [Virtual Scrolling](#virtual-scrolling)
- [Infinite Scrolling](#infinite-scrolling)
- [Column Virtualization](#column-virtualization)
- [Sticky Headers](#sticky-headers)
- [Scrollbar Customization](#scrollbar-customization)
- [Performance Tuning](#performance-tuning)
- [Advanced Scrolling](#advanced-scrolling)

## When to Use

Use scrolling optimization techniques to handle large datasets efficiently. Virtual scrolling and infinite scrolling improve grid performance by rendering only visible rows, reducing memory usage and improving responsiveness. Use sticky headers to keep column headers visible while scrolling, and column virtualization to display numerous columns without lag.

## Basic Scrolling

Grid supports vertical and horizontal scrolling by default. When content exceeds the grid dimensions, scrollbars appear automatically:

```vue
<template>
  <ejs-grid :dataSource="data" height="400px" width="800px">
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
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from "@syncfusion/ej2-vue-grids";
import { data } from "./datasource.js";

provide("grid", []);
</script>
```

---

## Virtual Scrolling

Virtual scrolling renders only visible rows, dramatically improving performance with large datasets. Rows are dynamically rendered as the user scrolls:

```vue
<template>
  <ejs-grid :dataSource="largeData" :enableVirtualization="true" height="400px">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100" textAlign="Right"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="ShipCity" headerText="Ship City" width="150"></e-column>
    </e-columns>
  </ejs-grid>
</template>
```

### Disable Virtual Scrolling for Specific Scenarios

```vue
const gridSettings = {
  enableVirtualization: false  // When dataset is small (<500 rows)
};
```

### Browser Height Limitation Solutions

Virtual scrolling row height calculation is important for proper rendering. When using specific browser heights, certain solutions ensure correct scrolling:

**Solution 1: Calculate Row Height Based on Content**

```vue
<template>
  <ejs-grid 
    :dataSource="data" 
    :enableVirtualization="true"
    :rowHeight="rowHeightValue"
    height="400px">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
// Set row height explicitly (default: 36px for normal rows, 54px for grouped)
const rowHeightValue = 36;  // Ensure consistent height
</script>
```

**Solution 2: Use Browser Height Detection**

```vue
const detectBrowserHeight = () => {
  const windowHeight = window.innerHeight;
  const gridElement = document.getElementById('grid');
  gridElement.style.height = (windowHeight - 100) + 'px';  // Subtract header
};

onMounted(() => {
  detectBrowserHeight();
  window.addEventListener('resize', detectBrowserHeight);
});
```

**Solution 3: Replace Virtual Scrolling with Paging**

For browsers with height limitations, paging provides better UX than virtual scrolling:

```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :allowPaging="true"
    :pageSettings="pageSettings"
    height="400px">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const pageSettings = { pageSize: 50 };  // More control than virtual scrolling
</script>
```

### Virtual Scrolling Limitations

- **Grouped rows:** Virtualization works but with reduced performance
- **Batch editing:** Not fully compatible; use single-row editing instead
- **Row/Column spanning:** Not supported with virtualization
- **Frozen columns:** May have layout issues with virtual scrolling
- **Browser compatibility:** IE 11 has limited support

---

## Column Virtualization

Render only visible columns to improve horizontal scrolling performance with many columns:

```vue
<template>
  <ejs-grid 
    :dataSource="data" 
    :enableColumnVirtualization="true"
    height="400px"
    width="800px">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="100"></e-column>
      <e-column field="EmployeeID" headerText="Employee ID" width="100"></e-column>
      <!-- Many more columns... -->
      <e-column field="Column50" headerText="Column 50" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>
```

### Column Virtualization Requirements

- **Column width:** All columns must have a defined width (not auto)
- **Minimum width:** Width should be at least 100px per column
- **Height:** Container must have explicit height

### Column Virtualization Performance Tips

```vue
const settings = {
  enableColumnVirtualization: true,
  enableVirtualization: true,  // Enable row virtualization too
  scrollSettings: { mode: "Virtual" }
};
```

### Combining Row and Column Virtualization

```vue
<template>
  <ejs-grid 
    :dataSource="massiveData"
    :enableVirtualization="true"
    :enableColumnVirtualization="true"
    height="600px"
    width="1000px">
    <!-- Define many columns with fixed widths -->
  </ejs-grid>
</template>
```

**Benefits:** Handle 1000+ rows × 50+ columns efficiently

---

## Infinite Scrolling

Load data on-demand as users scroll to the bottom. Ideal for continuous data streams and large result sets:

```vue
<template>
  <ejs-grid 
    :dataSource="dataManager"
    :allowPaging="true"
    :pageSettings="pageSettings"
    :pageLoad="pageLoad"
    height="400px">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100" textAlign="Right"></e-column>
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

const pageSettings = { pageSize: 20, mode: "Infinite" };

const pageLoad = (args) => {
  // Monitor when page load is triggered
  console.log("Page loaded:", args.requestType);
};
</script>
```

### Number of Blocks Loaded During Initial Load

Control how many data blocks are loaded initially:

```vue
const pageSettings = { 
  pageSize: 20,
  mode: "Infinite"
};

const actionComplete = (args) => {
  if (args.requestType === "paging") {
    // Each page load is a "block"
    // First scroll might load 2-3 blocks initially
    console.log("Current pageIndex:", args.currentPage);
  }
};
```

### Efficient Data Caching and DOM Management

#### Use Cache Mode to Store Previously Loaded Data

```vue
const actionBegin = (args) => {
  if (args.requestType === "paging") {
    // Enable client-side caching to avoid re-fetching
    grid.value.ej2Instances.enableQueryString = true;
  }
};
```

#### Cache Mode Configuration

```vue
const cacheSettings = {
  type: "Cache"  // Cache mode: "Cache" or "ExcelFilter"
};
```

#### Managing DOM Memory

```vue
const actionComplete = (args) => {
  if (args.requestType === "paging" && args.currentPage > 10) {
    // Remove old rendered rows when many pages loaded
    const viewport = grid.value.ej2Instances.getContent();
    const oldRows = viewport.querySelectorAll('tr:not([data-visible="true"])');
    oldRows.forEach(row => row.remove());
  }
};
```

#### Toggle Infinite Scrolling On and Off

```vue
const toggleInfiniteScroll = () => {
  if (grid.value.ej2Instances.pageSettings.mode === "Infinite") {
    grid.value.ej2Instances.pageSettings = { pageSize: 20, mode: "Normal" };
  } else {
    grid.value.ej2Instances.pageSettings = { pageSize: 20, mode: "Infinite" };
  }
  grid.value.ej2Instances.refresh();
};
```

### Rendering Checkbox List On-Demand for Infinite Lists

For filtering/selection on infinite data:

```vue
const actionBegin = (args) => {
  if (args.requestType === "filterChoiceRequest") {
    // Load checkbox data lazily from server
    args.filterModel.options.dataSource = new DataManager({
      url: "url",
      adaptor: new WebApiAdaptor()
    });
  }
};
```

### Infinite Scrolling Limitations

- **Element height:** Browser has maximum DOM element count (~100K elements)
- **Batch editing:** Not compatible; use inline editing instead
- **Row/Column spanning:** Not supported
- **Grouped data:** Cannot group with infinite scrolling
- **Sorting:** Re-sorts entire dataset (impacts performance)

---

## Sticky Headers

Keep column headers visible while scrolling vertically:

```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :frozenRows="0"
    :frozenColumns="0"
    height="400px">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
    </e-columns>
  </ejs-grid>
</template>
```

### Freeze Rows and Columns

Keep header and first N rows/columns visible:

```vue
const frozenSettings = {
  frozenRows: 2,      // Keep top 2 rows visible
  frozenColumns: 1    // Keep first column visible
};
```

### CSS Sticky Headers

```css
.e-grid .e-gridheader {
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
}
```

---

## Scrollbar Customization

### Hide Empty Placeholder of Scrollbar

In cases where scrollbar isn't needed (all content visible):

```vue
const actionComplete = (args) => {
  const scrollbar = document.querySelector('.e-grid .e-hsbar');
  if (scrollbar && !scrollbar.classList.contains('e-hide')) {
    scrollbar.classList.add('e-hide');
  }
};

// Or use hideScroll method
grid.value.ej2Instances.hideScroll();
```

### Render Scrollbar in Both Top and Bottom

Display scrollbars at both top and bottom for easier navigation on very wide grids:

```vue
<template>
  <div>
    <!-- Top scrollbar -->
    <div class="e-grid-top-scrollbar" @scroll="synchronizeScroll"></div>
    
    <!-- Grid with bottom scrollbar -->
    <ejs-grid ref="grid" :dataSource="data" height="400px" width="1200px">
      <e-columns>
        <!-- Many columns -->
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script setup>
const synchronizeScroll = (event) => {
  const gridContent = grid.value.ej2Instances.getContent();
  gridContent.scrollLeft = event.target.scrollLeft;
};
</script>
```

### Customize Scrollbar Appearance

```css
/* Scrollbar styling */
.e-grid .e-hscroll::-webkit-scrollbar {
  height: 12px;
}

.e-grid .e-hscroll::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.e-grid .e-hscroll::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 6px;
}

.e-grid .e-hscroll::-webkit-scrollbar-thumb:hover {
  background: #555;
}
```

---

## Performance Tuning

### Optimize for Large Datasets

```vue
const optimizedSettings = {
  enableVirtualization: true,           // Render visible rows only
  enableColumnVirtualization: true,     // Render visible columns only
  rowHeight: 36,                        // Set explicit row height
  pageSettings: { pageSize: 50 }        // Reasonable page size
};
```

### Lazy Load with Infinite Scrolling Integration

```vue
const dataManager = new DataManager({
  url: "url",
  adaptor: new WebApiAdaptor()
});

const actionBegin = (args) => {
  if (args.requestType === "paging") {
    console.log("Loading page", args.currentPage);
    // Server handles pagination automatically
  }
};
```

### Monitor Scrolling Performance

```vue
const actionComplete = (args) => {
  if (args.requestType === "paging" || args.requestType === "virtualscroll") {
    const renderTime = performance.now() - args.startTime;
    console.log("Render time:", renderTime, "ms");
    
    if (renderTime > 1000) {
      console.warn("Slow scroll performance detected");
    }
  }
};
```

---

## Advanced Scrolling

### Combined Virtual and Infinite Scrolling

Use virtual scrolling for row rendering + infinite scrolling for data loading:

```vue
<template>
  <ejs-grid 
    :dataSource="dataManager"
    :enableVirtualization="true"
    :allowPaging="true"
    :pageSettings="pageSettings"
    height="600px">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const pageSettings = { 
  pageSize: 50,
  mode: "Infinite"
};
</script>
```

### Programmatic Scrolling

Scroll to specific rows or positions:

```vue
const scrollToRow = (rowIndex) => {
  grid.value.ej2Instances.scrollIntoView(rowIndex);
};

const scrollToColumn = (columnField) => {
  const columnIndex = grid.value.ej2Instances.getColumnIndexByField(columnField);
  grid.value.ej2Instances.getContent().scrollLeft = 
    grid.value.ej2Instances.getColumnByIndex(columnIndex).getScroll();
};

const scrollToTop = () => {
  grid.value.ej2Instances.getContent().scrollTop = 0;
};

const scrollToBottom = () => {
  const content = grid.value.ej2Instances.getContent();
  content.scrollTop = content.scrollHeight;
};
```

### Smooth Scrolling

```css
.e-grid .e-content {
  scroll-behavior: smooth;
}
```

### Scroll Events

Capture scroll events for custom actions:

```vue
const onScroll = (args) => {
  console.log("Scroll position:", args.target.scrollTop);
  
  // Load more data when near bottom
  if (args.target.scrollTop > args.target.scrollHeight - args.target.clientHeight - 100) {
    loadMoreData();
  }
};
```

### Export Scrolled Data

When exporting or downloading, include all data (not just visible):

```vue
const exportAllData = () => {
  // Temporarily disable virtualization to access all data
  grid.value.ej2Instances.enableVirtualization = false;
  grid.value.ej2Instances.excelExport();
  grid.value.ej2Instances.enableVirtualization = true;
};
```

---

## Common Scrolling Patterns

### Lazy Loading with Cache

```vue
const lazyLoadedPages = {};

const pageLoad = (args) => {
  if (lazyLoadedPages[args.requestType]) {
    // Use cached data
    args.result = lazyLoadedPages[args.requestType];
  } else {
    // Fetch new data
    lazyLoadedPages[args.requestType] = args.result;
  }
};
```

### Scroll Synchronization Between Multiple Grids

```vue
const syncScroll = (sourceGrid, targetGrid) => {
  sourceGrid.getContent().addEventListener('scroll', function() {
    targetGrid.getContent().scrollLeft = this.scrollLeft;
  });
};
```

### Accessibility with Scrolling

Ensure keyboard navigation works with virtual scrolling:

```vue
const onKeyDown = (args) => {
  if (args.key === "ArrowDown") {
    grid.value.ej2Instances.scrollIntoView(grid.value.ej2Instances.currentIndex + 1);
  }
  if (args.key === "ArrowUp") {
    grid.value.ej2Instances.scrollIntoView(grid.value.ej2Instances.currentIndex - 1);
  }
};
```
