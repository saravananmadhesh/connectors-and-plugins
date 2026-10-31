# TreeGrid Scrolling, Virtual Scrolling & Infinite Scroll

## When to Use This Reference

Read this reference when you need to:
- Implement scrolling for large datasets (10,000+ rows)
- Choose between virtual scrolling vs infinite scrolling vs paging
- Set fixed scroll container height and width
- Keep column headers visible while scrolling (sticky headers)
- Jump to specific row during scroll
- Load rows on-demand as scrollbar moves (infinite scroll)
- Render only visible rows to improve performance
- Combine scrolling with hierarchical/tree data
- Implement column virtualization for many columns
- Handle responsive scrolling in different screen sizes

---

## Table of Contents

- [Basic Scrolling](#basic-scrolling)
- [Sticky Headers](#sticky-headers)
- [Scroll to Row](#scroll-to-row)
- [Row Virtualization](#row-virtualization)
- [Column Virtualization](#column-virtualization)
- [Infinite Scrolling](#infinite-scrolling)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

---

## Basic Scrolling

Enable scrolling by setting height and width constraints on TreeGrid.

```typescript
import { TreeGrid } from '@syncfusion/ej2-treegrid';

// Fixed size with scrollbars
const treeGridObj = new TreeGrid({
  dataSource: projectData,
  childMapping: 'subtasks',
  height: 315,              // Fixed height (pixels)
  width: 400,               // Fixed width (pixels or %)
  columns: [
    { field: 'taskID', headerText: 'ID', width: 90 },
    { field: 'taskName', headerText: 'Task', width: 180 },
    { field: 'startDate', headerText: 'Start Date', width: 120 }
  ]
});
treeGridObj.appendTo('#TreeGrid');

// Responsive (parent container must have fixed height)
const treeGridObj2 = new TreeGrid({
  dataSource: projectData,
  childMapping: 'subtasks',
  height: '100%',              // Fill parent
  width: '100%',               // Fill parent
  columns: [
    { field: 'taskID', headerText: 'ID', width: 90 },
    { field: 'taskName', headerText: 'Task', width: 180 }
  ]
});
treeGridObj2.appendTo('#TreeGrid');  // Parent must have height: 500px or similar
```

**Scroll Behavior:**
- Vertical scrollbar appears when content height > container height
- Horizontal scrollbar appears when columns width > container width
- Auto/default means scrolling based on content size

---

## Sticky Headers

Keep column headers visible at top while scrolling down.

```typescript
import { TreeGrid } from '@syncfusion/ej2-treegrid';

const treeGridObj = new TreeGrid({
  dataSource: projectData,
  childMapping: 'subtasks',
  height: 400,                    // Must set height for sticky
  enableStickyHeader: true,       // Enable sticky headers
  columns: [
    { field: 'taskID', headerText: 'ID', width: 90 },
    { field: 'taskName', headerText: 'Task', width: 200 },
    { field: 'startDate', headerText: 'Start Date', width: 120 },
    { field: 'duration', headerText: 'Duration', width: 110 }
  ]
});
treeGridObj.appendTo('#TreeGrid');

// Toggle sticky header at runtime
document.getElementById('toggleStickyBtn').onclick = () => {
  treeGridObj.enableStickyHeader = !treeGridObj.enableStickyHeader;
};
```

**Benefits:**
- Headers always visible while scrolling
- Context preserved for large datasets
- Useful for spreadsheet-like interfaces

---

## Scroll to Row

Jump to specific row programmatically.

```typescript
import { TreeGrid, RowSelectEventArgs } from '@syncfusion/ej2-treegrid';
import { NumericTextBox, ChangeEventArgs } from '@syncfusion/ej2-inputs';

const treeGridObj = new TreeGrid({
  dataSource: projectData,
  childMapping: 'subtasks',
  height: 270,
  columns: [
    { field: 'taskID', headerText: 'ID', width: 90 },
    { field: 'taskName', headerText: 'Task', width: 180 },
    { field: 'duration', headerText: 'Duration', width: 80 }
  ],
  rowSelected: (args: RowSelectEventArgs) => {
    // Scroll to selected row
    const rowHeight = treeGridObj.getRows()[treeGridObj.getSelectedRowIndexes()[0]].scrollHeight;
    treeGridObj.getContent().children[0].scrollTop = rowHeight * treeGridObj.getSelectedRowIndexes()[0];
  }
});
treeGridObj.appendTo('#TreeGrid');

// Jump to row via numeric input
const numericBox = new NumericTextBox({
  width: 200,
  min: 0,
  showSpinButton: false,
  placeholder: 'Enter row index to scroll to',
  change: (args: ChangeEventArgs) => {
    treeGridObj.selectRow(parseInt(numericBox.getText(), 10));
  }
});
numericBox.appendTo('#rowJump');
```

---

## Row Virtualization

Render only visible rows for large datasets (10,000+ rows).

```typescript
import { TreeGrid, VirtualScroll } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(VirtualScroll);  // Inject VirtualScroll module

const treeGridObj = new TreeGrid({
  dataSource: largeDataset,        // 10,000+ rows
  childMapping: 'subtasks',
  enableVirtualization: true,      // Enable row virtualization
  height: 317,                      // MUST set fixed height
  pageSettings: { pageSize: 50 },  // Virtual buffer size
  treeColumnIndex: 1,
  columns: [
    { field: 'taskID', headerText: 'ID', width: 140 },
    { field: 'taskName', headerText: 'Task', width: 140 },
    { field: 'year', headerText: 'Year', width: 120 },
    { field: 'duration', headerText: 'Duration', width: 120 }
  ]
});
treeGridObj.appendTo('#TreeGrid');
```

**Limitations of Row Virtualization:**
- Cannot use: Batch editing, checkbox selection, detail template, row template, rowspan, autofill
- Expand/collapse state persists automatically
- Copy-paste limited to visible viewport
- Cell selection NOT supported
- Requires static fixed height for container
- Max rows limited by browser (usually 100k+)

---

## Column Virtualization

Render only visible columns for wide grids (100+ columns).

```typescript
import { TreeGrid, VirtualScroll } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(VirtualScroll);

const treeGridObj = new TreeGrid({
  dataSource: projectData,
  childMapping: 'subtasks',
  enableVirtualization: true,          // Enable row virtualization
  enableColumnVirtualization: true,    // Enable column virtualization
  height: 317,                          // Fixed height
  pageSettings: { pageSize: 50 },
  treeColumnIndex: 1,
  columns: [
    { field: 'f1', headerText: 'Field 1', width: 140 },
    { field: 'f2', headerText: 'Field 2', width: 140 },
    // ... many more columns
    { field: 'f100', headerText: 'Field 100', width: 140 }
  ]
});
treeGridObj.appendTo('#TreeGrid');

// Column widths MUST be in pixels (not percentage)
// Columns render on-demand during horizontal scroll
```

**Important:**
- Column width required (default 200px if not specified)
- Cell selection NOT supported
- Column reordering works only within viewport
- Print/Export work within viewport only
- Limitations same as row virtualization

---

## Infinite Scrolling

Load buffer pages as user scrolls down (lazy loading).

```typescript
import { TreeGrid, InfiniteScroll } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(InfiniteScroll);

const treeGridObj = new TreeGrid({
  dataSource: largeDataset,           // 1000+ rows
  childMapping: 'subtasks',
  enableInfiniteScrolling: true,      // Enable infinite scroll
  height: 317,                         // Fixed height
  pageSettings: { pageSize: 30 },     // Rows per page buffer
  infiniteScrollSettings: {
    initialBlocks: 3                   // Load 3 pages initially
  },
  treeColumnIndex: 1,
  columns: [
    { field: 'taskID', headerText: 'ID', width: 140 },
    { field: 'taskName', headerText: 'Task', width: 140 },
    { field: 'year', headerText: 'Year', width: 120 }
  ]
});
treeGridObj.appendTo('#TreeGrid');
```

**Infinite Scroll vs Virtual Scroll:**
- Infinite: Lazy-loads pages at end of scroll (rows stay in DOM)
- Virtual: Renders only viewport rows (reuses DOM elements)
- Infinite: Better for server-side data, cache-friendly
- Virtual: Better for client-side data, pure lazy loading

### Infinite Scroll Cache Mode

Don't re-fetch previously viewed pages:

```typescript
TreeGrid.Inject(InfiniteScroll);

const treeGridObj = new TreeGrid({
  dataSource: serverDataUrl,      // Server endpoint
  childMapping: 'subtasks',
  enableInfiniteScrolling: true,
  pageSettings: { pageSize: 30 },
  infiniteScrollSettings: {
    enableCache: true,             // Cache loaded pages
    initialBlocks: 5,              // Load 5 pages initially
    maxBlocks: 10                  // Keep max 10 pages in DOM
  },
  height: 317,
  columns: [
    { field: 'taskID', headerText: 'ID', width: 140 },
    // ... columns
  ]
});
treeGridObj.appendTo('#TreeGrid');

// After scrolling past 10 pages, old ones removed from DOM but cached
// Scrolling back re-renders from cache (no server call)
```

**Limitations:**
- Max DOM elements limited by browser (usually 10,000+)
- Initial load height must be > viewport
- Expand/collapse must be fully expanded at load
- Batch editing, detail template NOT supported
- Programmatic selection (selectRows) NOT supported
- Cell selection NOT persisted in cache mode

---

## Common Patterns

### Pattern: Choose Right Technique for Data Size

```typescript
// Small dataset (1,000 rows): Use regular paging
if (dataSize < 1000) {
  allowPaging: true
  pageSettings: { pageSize: 20 }
}

// Medium dataset (1,000-50,000 rows): Virtual scrolling
if (dataSize >= 1000 && dataSize < 50000) {
  enableVirtualization: true
  pageSettings: { pageSize: 50 }
}

// Large dataset (50,000+ rows): Infinite scrolling with server-side
if (dataSize >= 50000) {
  enableInfiniteScrolling: true
  pageSettings: { pageSize: 100 }
  infiniteScrollSettings: { enableCache: true, maxBlocks: 20 }
}
```

### Pattern: Responsive Scrolling

Adjust scroll settings based on screen size:

```typescript
function getScrollConfig() {
  const width = window.innerWidth;
  
  if (width < 600) {  // Mobile
    return { enableVirtualization: true, pageSize: 10, height: 300 };
  } else if (width < 1024) {  // Tablet
    return { enableVirtualization: true, pageSize: 25, height: 500 };
  } else {  // Desktop
    return { enableVirtualization: true, pageSize: 50, height: 600 };
  }
}

const config = getScrollConfig();
const treeGridObj = new TreeGrid({
  dataSource: projectData,
  enableVirtualization: config.enableVirtualization,
  height: config.height,
  pageSettings: { pageSize: config.pageSize },
  // ... columns
});
```

---

## Troubleshooting

**Q: Virtual scrolling not working?**  
A: Ensure `enableVirtualization: true`, module injected, and height set (not auto/100%).

**Q: Infinite scroll loads duplicate pages?**  
A: Check initialBlocks and pageSize settings. May need enableCache: true for caching.

**Q: Expansion state lost when scrolling?**  
A: Expand/collapse state auto-persists in virtualization. If lost, verify virtual scrolling enabled properly.

**Q: Performance still slow with 50,000 rows?**  
A: Use infinite scrolling with server-side pagination instead of virtual scrolling with all rows.

**Q: Sticky headers not appearing?**  
A: Set `enableStickyHeader: true` and ensure height is fixed (not auto).

**Q: Column virtualization showing empty cells?**  
A: Set all column widths in pixels only (not %), and verify enableColumnVirtualization: true.