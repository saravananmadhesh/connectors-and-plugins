# Paging

## Table of Contents
- [Module Setup](#module-setup)
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Page Size Mode](#page-size-mode)
- [Page Configuration](#page-configuration)
- [Pager Events](#pager-events)

## Module Setup

To enable paging, inject the `Page` module and set `allowPaging` to true.

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    childMapping="subtasks" 
    :treeColumnIndex="1"
    :allowPaging="true" 
    :pageSettings="pageSettings">
  </ejs-treegrid>
</template>

<script setup>
import { provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, Page, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';
import { sampleData } from './datasource';

const data = sampleData;

const pageSettings = {
  pageSize: 7  // Rows per page
};

provide('treegrid', [Page]);  // Required: Page module injection
</script>
```

---

## When to Use

| Scenario | When to Use | Example |
|----------|------------|----------|
| **Large datasets** | Break into manageable pages | 100+ rows split into 10-row pages |
| **Memory efficiency** | Load one page at a time | Only 10 rows in memory per page |
| **User navigation** | Page buttons instead of scrolling | Users click Next/Previous |
| **Server pagination** | API returns page-based results | Server handles pageSize |
| **Performance** | Improve response time | Load segments vs. all data |

---

## Mandatory Rules

Before implementing paging:
- ✓ **Page Module**: Inject `Page` from '@syncfusion/ej2-vue-treegrid'
- ✓ **allowPaging Property**: Set `:allowPaging="true"` on TreeGrid
- ✓ **pageSettings**: Configure with at least `pageSize`

---

## Page Size Modes

### Mode: 'All' (Default)

Counts all rows including both parent and child records:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    childMapping="subtasks"
    :treeColumnIndex="1"
    :allowPaging="true"
    :pageSettings="pageSettings">
  </ejs-treegrid>
</template>

<script setup>
import { provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, Page, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';

const pageSettings = {
  pageSize: 10,
  pageSizeMode: 'All'  // Parent rows + child rows = 10 total on page
};

provide('treegrid', [Page]);
</script>
```

**Behavior:** If pageSize=10 with pageSizeMode='All', page displays 10 total records counting parents and children combined.

### Mode: 'Root'

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    childMapping="subtasks"
    :treeColumnIndex="1"
    :allowPaging="true"
    :pageSettings="pageSettings">
  </ejs-treegrid>
</template>

<script setup>
import { provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, Page, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';

const pageSettings = {
  pageSize: 2,
  pageSizeMode: 'Root'  // Only count root/parent rows (pageSize=2 means 2 parent tasks per page)
};

provide('treegrid', [Page]);
</script>
```

**Behavior:** If pageSize=2 with pageSizeMode='Root', page shows 2 parent tasks. All their child tasks expand and display without counting toward limit.

**Comparison:**
- **All**: pageSize=10 → 10 total rows (mix of parents/children) per page
- **Root**: pageSize=10 → 10 parent rows per page (+ all their children)

---

## Page Configuration

Customize pager behavior and appearance:

```vue
<script setup>
const pageSettings = {
  pageSize: 7,              // Rows per page (5-50 typical)
  pageCount: 5,             // Number of pager buttons to display
  currentPage: 1,           // Starting page (1-indexed)
  pageSizeMode: 'All',      // 'All' or 'Root'
  enableQueryString: false, // Add ?pageNo=X to URL when enabled
  pageSizes: true           // Show page size dropdown with default options
};
</script>
```

**pageSettings Options:**
- `pageSize`: Rows per page
- `pageCount`: Pager button count (5-10 typical)
- `currentPage`: Initial page number
- `pageSizeMode`: 'All' (default) or 'Root'
- `enableQueryString`: Track page in URL for shareable links
- `pageSizes`: true (standard options) or [5, 10, 15, 20, 25] (custom)

---

### Page Size Dropdown

Allow users to change rows per page dynamically:

```vue
const pageSettings = {
  pageSize: 7,
  pageSizes: true  // Show dropdown with options: 5, 10, 15, 20, 25 (default)
};
```

**Custom Page Size Options:**
```js
const pageSettings = {
  pageSize: 10,
  pageSizes: [5, 10, 25, 50, 100]  // Custom options in dropdown
};
```

When `pageSizes: true`, users can select from standard options in pager dropdown. When `pageSizes` is an array, users can select from your custom options.

---

### Pager Template

Customize pager appearance with custom template:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    childMapping="subtasks"
    :treeColumnIndex="1"
    :allowPaging="true"
    :pageSettings="initialPage"
    :pagerTemplate="'pagerTemplate'">
    
    <template v-slot:pagerTemplate="{ data }">
      <div class="e-pagertemplate">
        <div class="pager-content">
          <input 
            type="number" 
            :value="data.currentPage"
            @change="onPageChange"
            :min="1"
            :max="data.totalPages"
            style="width: 50px; padding: 5px;">
          <span style="margin-left: 10px;">of {{ data.totalPages }} pages</span>
          <span style="margin-left: 20px;">{{ data.totalRecordCount }} total records</span>
        </div>
      </div>
    </template>
  </ejs-treegrid>
</template>

<script setup>
import { provide, ref } from 'vue';
import { TreeGridComponent as EjsTreegrid, Page, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';

const initialPage = ref({ pageSize: 5 });

const onPageChange = (args) => {
  initialPage.value = { currentPage: parseInt(args.target.value) };
};

provide('treegrid', [Page]);
</script>

<style>
.e-pagertemplate {
  padding: 10px;
  background: #f9f9f9;
  border-top: 1px solid #ddd;
}

.pager-content {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
}
</style>
```

**Available in pagerTemplate:**
- `data.currentPage`: Current page number
- `data.pageSize`: Rows per page
- `data.pageCount`: Page button count
- `data.totalPages`: Total number of pages
- `data.totalRecordCount`: Total records in dataset

---

## Pager Events

Monitor paging operations. The pager triggers the following events:

| Event | When Fired | Usage |
|-------|-----------|-------|
| `created` | Pager component is initialized | Setup custom handlers |
| `click` | Numeric button in pager clicked | Track page navigation |
| `dropDownChanged` | Page size dropdown changed | Handle size changes |

```vue
<script setup>
// Events are automatically managed by pager
// - 'created': Component creation
// - 'click': Numeric button click
// - 'dropDownChanged': Page size selection change
</script>
```

---
