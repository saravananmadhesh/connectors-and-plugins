# Infinite Scrolling

## Table of Contents
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Infinite Scroll Setup](#infinite-scroll-setup)(#performance-optimization)
- [Limitations](#limitations)

## When to Use

| Scenario | When to Use | Example |
|----------|------------|----------|
| **No pagination UI** | Continuous scroll experience | Twitter-like infinite feed |
| **Large datasets** | Load on demand as user scrolls | 100k+ records loaded gradually |
| **Mobile friendly** | No page buttons visible | Swipe-and-scroll interface |
| **Streaming data** | Real-time appending | Live data feeds |
| **Search results** | Endless result list | Google-like search results |
| **Social feeds** | Similar to feeds | Facebook timeline |
| **Memory efficient** | Don't load all upfront | Browser capability limits |

---

## Mandatory Rules

Before implementing infinite scrolling:
- ✓ **InfiniteScroll Module**: Inject from '@syncfusion/ej2-vue-treegrid'
- ✓ **enableInfiniteScrolling**: Set true on grid
- ✓ **pageSettings**: Configure pageSize (determines batch load size)
- ✓ **Height**: Set fixed height for scrolling viewport

---

## Infinite Scroll Setup

Enable infinite scrolling with minimal configuration:

```vue
<template>
  <ejs-treegrid 
    :dataSource="virtualData" 
    :enableInfiniteScrolling="true"
    :treeColumnIndex="1"
    childMapping="Crew"
    height="317px"
    :pageSettings="pageSettings">
  </ejs-treegrid>
</template>

<script setup>
import { provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, InfiniteScroll, Page, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';
import { dataSource, virtualData } from './datasource';

const pageSettings = { pageSize: 50 };  // Load 50 rows per scroll batch

provide('treegrid', [InfiniteScroll, Page]);
</script>
```

**Behavior:**
- Loads initial batch of rows (3 pages by default)
- As user scrolls down, loads next batch automatically
- Caching disabled by default (refetch on revisit)
- No visible pagination UI

---

### Initial Blocks Configuration

Control how many pages load initially:

```vue
const infiniteScrollSettings = {
  initialBlocks: 5  // Load 5 pages initially instead of default 3
};
```

**initialBlocks Options:**
- `1`: Load 1 page (50 rows with pageSize=50)
- `3`: Load 3 pages (150 rows) - **default**
- `5`: Load 5 pages (250 rows)
- Higher values = more initial data, slower initial load

---

### Cache Mode

Store loaded rows for reuse when scrolling back:

```vue
const infiniteScrollSettings = {
  enableCache: true    // Cache loaded rows in memory
};
```

**Cache Mode Behavior:**
- `enableCache: true`: Stores loaded data so revisiting pages doesn't refetch
- `enableCache: false` (default): Refetches data each time user scrolls back to visited page
- Maintains row elements based on `maxBlocks` count (default manages automatically)

**When to Use:**
- **enableCache: true** - Static data, users scroll back frequently, reduce server calls
- **enableCache: false** - Real-time data, memory constraints, large datasets

---

## Limitations

Infinite scrolling has the following limitations:

| Feature | Compatible | Notes |
|---------|-----------|-------|
| **Batch Editing** | ❌ No | Cannot edit multiple cells at once |
| **Cell Editing** | ❌ No | In-place editing not compatible |
| **Detail Template** | ❌ No | Expandable rows not supported |
| **Hierarchy** | ❌ No | Parent-child relationships limited |
| **Checkbox Selection** | ❌ No | Multi-select with checkboxes unavailable |
| **Row Template** | ✅ Yes | Custom row HTML supported |
| **Filtering** | ✅ Yes | Filter data before displaying |
| **Sorting** | ✅ Yes | Sort order maintained during scroll |
| **State Persistence** | ⚠️ Partial | Scroll position not always retained |
| **Programmatic Selection** | ❌ No | selectRows() method not supported |
| **Collapsed Rendering** | ❌ No | All records must be expanded initially |

**Additional Constraints:**
- Initial loading rows total height must be greater than viewport height
- Cell selection not persisted in cache mode
- Browser element limit constrains maximum total records (typically 1M for modern browsers)
- Copy-paste limited to visible viewport rows during scroll
- Aggregation reflects current view items, not full dataset

---
