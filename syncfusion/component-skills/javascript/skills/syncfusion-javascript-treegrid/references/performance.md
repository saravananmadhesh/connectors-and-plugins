# Performance Optimization

## When to Use This Reference

**Read this file when you need to:**
- Improve rendering speed for large datasets (10,000+ rows)
- Optimize memory usage in the browser
- Choose between virtual scrolling, infinite scrolling, or pagination
- Configure change detection strategy
- Implement lazy loading for hierarchical data
- Monitor and measure performance metrics
- Identify and fix performance bottlenecks

## Table of Contents
- [Best Practices](#best-practices)
- [Change Detection](#change-detection)
- [Lazy Loading Data](#lazy-loading-data)
- [Memory Management](#memory-management)
- [Monitoring Performance](#monitoring-performance)
- [Code Snippet Locations](#code-snippet-locations)

## Best Practices

### 1. Virtual Scrolling

For datasets > 1,000 rows, use virtual scrolling:

```typescript
import { TreeGrid, VirtualScroll, Page } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(VirtualScroll, Page);

let treeGridObj: TreeGrid = new TreeGrid({
    dataSource: largeData,
    childMapping: 'subtasks',
    enableVirtualization: true,
    pageSettings: { pageSize: 12 },
    height: '500px',
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90 },
        { field: 'taskName', headerText: 'Task Name', width: 200 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

### 2. Minimize Column Count

Render only necessary columns:

```typescript
// Good: Show 3 critical columns
const columns = [
    { field: 'taskID', headerText: 'ID', width: 80 },
    { field: 'taskName', headerText: 'Task', width: 200 },
    { field: 'duration', headerText: 'Duration', width: 100 }
    // Exclude: Description, Notes, Metadata, etc.
];

let treeGridObj: TreeGrid = new TreeGrid({
    dataSource: data,
    childMapping: 'subtasks',
    columns: columns
});

treeGridObj.appendTo('#TreeGrid');
```

### 3. Server-Side Operations

Move filtering, sorting, paging to backend:

```typescript
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: '/api/treegrid/data',
  adaptor: new UrlAdaptor(),
  offline: false
});

let treeGridObj: TreeGrid = new TreeGrid({
    dataSource: dataManager,
    allowSorting: true,
    allowFiltering: true,
    allowPaging: true,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90 }
        // Server handles filtering, sorting, paging
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

### 4. Optimize Data Types

Use appropriate types to avoid conversion:

```typescript
{
  taskID: 1,                              // number, not string
  StartDate: new Date('02/03/2017'),     // Date object
  IsCompleted: true,                      // boolean
  Duration: 5                             // number
}
```

## Change Detection

### Batch Updates

Update multiple records at once:

```typescript
// Prepare records to update
const recordsToUpdate = [
  { TaskID: 1, Progress: 100 },
  { TaskID: 2, Progress: 75 },
  { TaskID: 3, Progress: 50 }
];

// Update all at once
recordsToUpdate.forEach(record => {
  const index = treeGridObj.getRowIndexByPrimaryKey(record.TaskID);
  if (index !== undefined) {
    treeGridObj.setRowData(index, record);
  }
});

// Refresh once after all updates
treeGridObj.refresh();
```

### Avoid Manual Refresh

```typescript
// ❌ Inefficient - refreshes after each update
data[0].Progress = 100;
gridInstance?.refresh();
data[1].Progress = 75;
gridInstance?.refresh();

// ✅ Efficient - refresh once
data[0].Progress = 100;
data[1].Progress = 75;
gridInstance?.refresh();
```

## Lazy Loading Data

Load children only when expanded:

```typescript
// Setup lazy loading on expand
const handleActionBegin = async (args: any) => {
  if (args.requestType === 'expand') {
    const parentData = args.data;
    
    // Fetch child data from API
    try {
      const response = await fetch(`/api/treegrid/children/${parentData.TaskID}`);
      const children = await response.json();
      
      parentData.subtasks = children;
      treeGridObj.refresh();
    } catch (error) {
      console.error('Failed to load children:', error);
    }
  }
};

let treeGridObj: TreeGrid = new TreeGrid({
  dataSource: data,
  childMapping: 'subtasks',
  actionBegin: handleActionBegin,
  columns: [
      { field: 'taskID', headerText: 'Task ID', width: 90 }
  ]
});

treeGridObj.appendTo('#TreeGrid');
```

## Memory Management

### 1. Unsubscribe from Events

```typescript
let treeGridObj: TreeGrid = new TreeGrid({
  dataSource: data,
  childMapping: 'subtasks',
  dataBound: handleDataBound, // Initial Subscribe event
  columns: [
    { field: 'taskID', headerText: 'Task ID', width: 90 }
  ]
});

const handleDataBound = () => {
  console.log('Data bound');
};

// Dynamic Subscribe to event
treeGridObj.dataBound = handleDataBound;

// Later: Unsubscribe to prevent memory leaks
treeGridObj.dataBound = null;

// On destroy
treeGridObj.destroy();
```

### 2. Clear Large Datasets

```typescript
const handleClear = () => {
  treeGridObj.dataSource = [];
  treeGridObj.refresh();
  // Data is garbage collected
};
```

### 3. Limit Template Data

```typescript
// ❌ Stores entire object (memory intensive)
let cellTemplate = (props: any) => {
  return '<div>' + JSON.stringify(props) + '</div>';  // All data serialized
};

// ✅ Uses only needed fields (memory efficient)
let cellTemplate = (props: any) => {
  return '<div>' + props.taskName + '</div>';  // Only needed field
};
```
  <div>{props.TaskName} - {props.Duration}d</div>
);
```

## Monitoring Performance

Use browser DevTools to monitor performance metrics:

```typescript

// Monitor data-bound events
const handleDataBound = () => {
    performance.mark('treegrid-end');
    performance.measure('treegrid-operation', 'treegrid-start', 'treegrid-end');
    
    const measure = performance.getEntriesByName('treegrid-operation')[0];
    console.log(`Grid binding completed in ${measure.duration}ms`);
};

// Set up performance monitoring
let treeGridObj: TreeGrid = new TreeGrid({
    dataSource: data,
    childMapping: 'subtasks',
    dataBound: handleDataBound,
    load: () => {
      // Mark grid operations
      performance.mark('treegrid-start');
    }
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90 }
    ]
});

treeGridObj.appendTo('#TreeGrid');

// Monitor with PerformanceObserver
const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        console.log(`${entry.name}: ${entry.duration}ms`);
    }
});

observer.observe({ entryTypes: ['measure'] });
```

## Troubleshooting

**Q: Grid freezing with large dataset?**  
A: Enable virtual scrolling and server-side operations.

**Q: Memory leak in production?**  
A: Ensure components unmount properly and listeners removed.

**Q: Slow after many edits?**  
A: Batch updates and refresh once.
