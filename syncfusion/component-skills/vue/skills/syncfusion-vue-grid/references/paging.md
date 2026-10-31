# Paging

## Table of Contents
- [When to Use](#when-to-use)
- [Paging Configuration](#paging-configuration)
- [Page Size Options](#page-size-options)
- [Pager Customization](#pager-customization)
- [Pager Position](#pager-position)
- [Page Navigation](#page-navigation)
- [Custom Pager Template](#custom-pager-template)

## When to Use

Use this reference when you need to:
- Enable pagination to display large datasets in pages
- Configure page size and page size options
- Customize pager appearance and position
- Implement programmatic page navigation
- Create custom pager templates
- Handle pager events

## Paging Configuration

### Enable Paging
```vue
<template>
  <ejs-grid 
    :dataSource="data" 
    :allowPaging="true"
    :pageSettings="pageSettings">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Page } from "@syncfusion/ej2-vue-grids";
import { provide } from 'vue';

const pageSettings = {
  pageSize: 10,        // Records per page
  pageCount: 5,        // Pager button count
  currentPage: 1,      // Initial page
  totalRecordsCount: 0 // Set by server for remote data
};

provide('grid', [Page]);
</script>
```

## Page Size Options

### Fixed Page Size Selection
```vue
<script setup>
const pageSettings = {
  pageSize: 10,
  pageSizes: [5, 10, 20, 50],  // Dropdown for user selection
  pageCount: 5
};
</script>
```

### Dynamic Page Size
```javascript
// Change page size programmatically
gridInstance.pageSettings.pageSize = 20;
```

## Page Settings Configuration

### PageSettings Properties
```javascript
const pageSettings = {
  pageSize: 10,              // Number of records per page
  pageCount: 5,              // Number of pager buttons to display
  currentPage: 1,            // Current page number (1-based)
  totalRecordsCount: 0,      // Total record count (for remote data)
  enableQueryString: false,  // Add page info to query string URL
  pagePosition: 'Bottom'     // 'Top' or 'Bottom'
};
```

### PageSize Configuration
```javascript
// Integer value for fixed page size
pageSettings.pageSize = 20;

// Array of options for dropdown selection
pageSettings.pageSizes = [10, 20, 50, 100];  // User can choose page size
```

### Enable Query String
When `enableQueryString` is enabled, page information is added to the URL query string, allowing users to share/bookmark specific pages:

```javascript
const pageSettings = {
  pageSize: 10,
  enableQueryString: true  // URL will have ?grid_pageSize=10&grid_currentPage=2
};
```

This is useful for:
- Sharing specific pages via URL
- Bookmarking or saving pagination state
- Server-side pagination tracking

### Page Count (Pager Button Display)
```javascript
// Display 5 pager buttons
pageSettings.pageCount = 5;

// URL: Page 1, 2, 3, 4, 5 buttons shown
// Going to page 10 shows buttons: 8, 9, 10, 11, 12
```

### Total Records (Server-side Paging)
```javascript
// Set when data comes from server
pageSettings.totalRecordsCount = 500;  // Server provides total count
```

## Page Navigation

### Navigate Programmatically
```javascript
// Go to specific page
gridInstance.goToPage(3);

// Get current page
const currentPage = gridInstance.pageSettings.currentPage;

// Get page size
const pageSize = gridInstance.pageSettings.pageSize;

// Get total records
const totalRecords = gridInstance.pageSettings.totalRecordsCount;
```

### First/Last Page
```javascript
// Go to first page
gridInstance.goToPage(1);

// Go to last page
const totalPages = Math.ceil(gridInstance.pageSettings.totalRecordsCount / gridInstance.pageSettings.pageSize);
gridInstance.goToPage(totalPages);
```

## Custom Pager Template

### Custom Pager UI
```vue
<template>
  <ejs-grid :dataSource="data" :pageSettings="pageSettings">
    <e-columns>
      <e-column field="OrderID"></e-column>
    </e-columns>
    
    <template v-slot:pagerTemplate>
      <div class="custom-pager">
        <button @click="previousPage" :disabled="currentPage === 1">← Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next →</button>
      </div>
    </template>
  </ejs-grid>
</template>

<script setup>
import { ref, computed } from 'vue';

const currentPage = ref(1);
const pageSize = ref(10);
const data = ref([...]);  // Your data

const totalPages = computed(() => {
  return Math.ceil(data.value.length / pageSize.value);
});

const previousPage = () => {
  if (currentPage.value > 1) {
    gridInstance.goToPage(currentPage.value - 1);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    gridInstance.goToPage(currentPage.value + 1);
  }
};
</script>
```

### Page Info Template
```vue
<script setup>
const pageSettings = {
  pageSize: 10,
  template: 'Total: {TotalPages} pages'
};
</script>
```

## Paging Events

### Action Begin Event
Triggered before paging action starts:

```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :allowPaging="true"
    :actionBegin="handleActionBegin">
    <e-columns>
      <e-column field="OrderID" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const handleActionBegin = (args) => {
  if (args.requestType === 'paging') {
    console.log('Current page:', args.currentPage);
    console.log('Paging action started');
    
    // Can prevent action if needed
    // args.cancel = true;
  }
};
</script>
```

### Action Complete Event
Triggered after paging action completes:

```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :allowPaging="true"
    :actionComplete="handleActionComplete">
    <!-- columns -->
  </ejs-grid>
</template>

<script setup>
const handleActionComplete = (args) => {
  if (args.requestType === 'paging') {
    console.log('Paging completed');
    console.log('Current page:', gridInstance.pageSettings.currentPage);
    console.log('Total records:', gridInstance.pageSettings.totalRecordsCount);
    
    // Update UI, load data from server, etc.
  }
};
</script>
```

### Practical Event Handling

```javascript
const handleActionBegin = (args) => {
  if (args.requestType === 'paging') {
    // Show loading indicator
    showLoadingSpinner(true);
  }
};

const handleActionComplete = (args) => {
  if (args.requestType === 'paging') {
    // Hide loading indicator
    showLoadingSpinner(false);
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Log pagination analytics
    console.log('User navigated to page:', args.currentPage);
  }
};
```

### Server-side Paging
```vue
<template>
  <ejs-grid :dataSource="dataManager" :pageSettings="pageSettings">
    <!-- columns -->
  </ejs-grid>
</template>

<script setup>
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: 'url',
  adaptor: new UrlAdaptor(),
  pageSize: 10
});

const pageSettings = {
  pageSize: 10,
  pageCount: 5
};
</script>
```

### Virtual Scrolling vs Paging
- **Paging:** Better for traditional list navigation
- **Virtual Scrolling:** Better for large datasets (100K+ rows)
