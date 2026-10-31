# TreeGrid Paging

## When to Use This Reference

Read this reference when you need to:
- Display large datasets in pages (avoid loading all rows at once)
- Implement pagination UI at bottom/top of TreeGrid
- Allow users to change page size dynamically (page size dropdown)
- Configure page size: All records per page vs Root level records only
- Create custom pager with page navigation buttons
- Position pager at top of grid instead of bottom
- Handle page change events (pagination, page size change)
- Count root-level vs total records for display logic
- Improve performance by limiting render of visible rows
- Navigate between pages programmatically

---

## Table of Contents

- [Basic Paging Setup](#basic-paging-setup)
- [Page Size Modes](#page-size-modes)
- [Page Size Dropdown](#page-size-dropdown)
- [Custom Pager Templates](#custom-pager-templates)
- [Pager Positioning](#pager-positioning)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

---

## Basic Paging Setup

Enable paging with Page module injection and allowPaging property.

```typescript
import { TreeGrid, Page } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Page);  // Inject Page module

const treeGridObj = new TreeGrid({
  dataSource: projectData,
  childMapping: 'subtasks',
  allowPaging: true,
  pageSettings: { pageSize: 7 },  // 7 rows per page
  height: 265,
  columns: [
    { field: 'taskID', headerText: 'ID', width: 90 },
    { field: 'taskName', headerText: 'Task', width: 160 }
  ]
});
treeGridObj.appendTo('#TreeGrid');

// Pager renders at bottom automatically
```

**Pager Features (Auto-Rendered):**
- Page number buttons (1, 2, 3...)
- Previous/Next buttons
- First/Last page shortcuts
- Total record count display

---

## Page Size Modes

Define how records are counted for paging: all records or root-level only.

### All Records Mode (Default)

Count total records (parents + children):

```typescript
pageSettings: {
  pageSize: 7,
  pageSizeMode: 'All'  // Default: count all records including children
}
```

**Result:** If page 1 has 3 parents + 4 children each = 7 total records (hierarchical or flat mix).

### Root Mode

Count only root-level records (parent nodes):

```typescript
pageSettings: {
  pageSize: 2,
  pageSizeMode: 'Root'  // Count only root/parent nodes
}
```

**Result:** If pageSize: 2, show only 2 root parents (plus ALL their children). Useful when paging by parent, not total count.

**When to Use Each:**
- `All` - Page by total count (every 10 records total, including nested)
- `Root` - Page by parent count (2 root nodes per page, all children shown)

---

## Page Size Dropdown

Allow users to dynamically change page size via dropdown.

```typescript
pageSettings: {
  pageSize: 7,
  pageSizes: true  // Show dropdown with options: 5, 10, 20, 50
}
```

Pager automatically shows "Rows per page: [dropdown]" at bottom with default options.

---

## Custom Pager Templates

Create custom pager UI with page navigation controls.

```typescript
import { NumericTextBox, ChangeEventArgs } from '@syncfusion/ej2-inputs';
import { TreeGrid, Page, PageEventArgs } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Page);

let flag = true;

const treeGridObj = new TreeGrid({
  dataSource: projectData,
  childMapping: 'subtasks',
  allowPaging: true,
  pageSettings: {
    pageSize: 6,
    template: '#pageTemplate'
  },
  dataBound: () => {
    if (flag) {
      flag = false;
      updatePagerTemplate();
    }
  },
  actionComplete: (args: PageEventArgs) => {
    if (args.requestType === 'paging') {
      updatePagerTemplate();
    }
  },
  columns: [
    { field: 'taskID', headerText: 'ID', width: 90 },
    { field: 'taskName', headerText: 'Task', width: 160 }
  ]
});
treeGridObj.appendTo('#TreeGrid');

function updatePagerTemplate() {
  const textBox = new NumericTextBox({
    min: 1,
    max: treeGridObj.pageSettings.totalPage,
    step: 1,
    width: 75,
    change: (args: ChangeEventArgs) => {
      treeGridObj.goToPage(args.value as number);
    }
  });
  textBox.appendTo('#currentPage');
}
```

**HTML Template (in index.html):**
```html
<script id="pageTemplate" type="text/template">
  <div class="e-pagercontainer">
    <div class="e-pageritem">
      <input id="currentPage" type="text" />
    </div>
    <div class="e-pageritem">
      <span style="margin-left: 10px;">Page ${currentPage} of ${totalPage}</span>
    </div>
  </div>
</script>
```

---

## Pager Positioning

Move pager from bottom to top of grid.

```typescript
let initialGridLoad = true;

const treeGridObj = new TreeGrid({
  dataSource: projectData,
  childMapping: 'subtasks',
  allowPaging: true,
  pageSettings: { pageSize: 7 },
  dataBound: () => {
    if (initialGridLoad) {
      initialGridLoad = false;
      const pager = document.getElementsByClassName('e-gridpager')[0];
      const topElement = document.getElementsByClassName('e-gridheader')[0];
      topElement.parentElement?.insertBefore(pager, topElement);
    }
  },
  columns: [
    { field: 'taskID', headerText: 'ID', width: 90 },
    { field: 'taskName', headerText: 'Task', width: 160 }
  ]
});
treeGridObj.appendTo('#TreeGrid');
```

---

## Common Patterns

### Pattern: Dynamic Page Size Based on Screen

Change page size for responsive display:

```typescript
TreeGrid.Inject(Page);

function getResponsivePageSize() {
  if (window.innerWidth < 600) return 5;   // Mobile: 5 rows
  if (window.innerWidth < 1024) return 10; // Tablet: 10 rows
  return 15;                               // Desktop: 15 rows
}

const treeGridObj = new TreeGrid({
  dataSource: projectData,
  childMapping: 'subtasks',
  allowPaging: true,
  pageSettings: { pageSize: getResponsivePageSize() },
  columns: [
    { field: 'taskID', headerText: 'ID', width: 90 },
    { field: 'taskName', headerText: 'Task', width: 160 }
  ]
});
treeGridObj.appendTo('#TreeGrid');
```

### Pattern: Track Page Navigation in Event

Respond to page changes:

```typescript
TreeGrid.Inject(Page);

const treeGridObj = new TreeGrid({
  dataSource: projectData,
  childMapping: 'subtasks',
  allowPaging: true,
  pageSettings: { pageSize: 7 },
  actionComplete: (args: PageEventArgs) => {
    if (args.requestType === 'paging') {
      console.log('Page changed to:', treeGridObj.pageSettings.currentPage);
      // Perform action on page change (scroll top, update status, etc.)
    }
  },
  columns: [
    { field: 'taskID', headerText: 'ID', width: 90 },
    { field: 'taskName', headerText: 'Task', width: 160 }
  ]
});
treeGridObj.appendTo('#TreeGrid');
```

---

## Troubleshooting

**Q: Pager not showing?**  
A: Ensure `TreeGrid.Inject(Page)` is called and `allowPaging: true` is set.

**Q: Page size dropdown not appearing?**  
A: Set `pageSettings.pageSizes: true` to show size dropdown.

**Q: Page size mode not working as expected?**  
A: Verify `pageSizeMode: 'All'` or `'Root'` is set. Root mode counts parents only, All counts total records.

**Q: Pager at wrong position?**  
A: Use dataBound event to reposition pager to top. Ensure topElement is correct (grid header or toolbar).


