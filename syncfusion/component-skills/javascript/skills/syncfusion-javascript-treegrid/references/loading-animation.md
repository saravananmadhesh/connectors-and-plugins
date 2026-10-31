# Loading Animation

## When to Use This Reference

Read this reference when you need to:
- Display loading indicators during data fetch
- Customize spinner or shimmer animation types
- Handle loading states during operations (sorting, paging, filtering)
- Control loading indicator appearance and timing

---

## Spinner & Shimmer Indicators

TreeGrid displays loading indicators while data loads during initial render, paging, sorting, and filtering. Two types available: `Spinner` (default) and `Shimmer`.

```typescript
import { TreeGrid, Page, Sort } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Page, Sort);

let treeGridObj = new TreeGrid({
    dataSource: remoteData,
    idMapping: 'TaskID',
    parentIdMapping: 'ParentItem',
    hasChildMapping: 'isParent',
    height: 400,
    allowPaging: true,
    allowSorting: true,
    loadingIndicator: { indicatorType: 'Spinner' },  // or 'Shimmer'
    columns: [
        { field: 'TaskID', headerText: 'Task ID', width: 120, textAlign: 'Right' },
        { field: 'TaskName', headerText: 'Task Name', width: 240, textAlign: 'Left' },
        { field: 'StartDate', headerText: 'Start Date', width: 140, textAlign: 'Right', type: 'date', format: 'yMd' },
        { field: 'Duration', headerText: 'Duration', width: 130, textAlign: 'Right' },
        { field: 'Progress', headerText: 'Progress', width: 130 }
    ],
    pageSettings: { pageCount: 3 }
});

treeGridObj.appendTo('#TreeGrid');
```

**Indicator Types:**
- `Spinner` - Animated circular spinner (default)
- `Shimmer` - Skeleton loading placeholder effect

### Shimmer Loading Animation

Shimmer provides visual skeleton of grid structure during loading, better UX for large datasets:

```typescript
let treeGridObj = new TreeGrid({
    dataSource: remoteDataWithDelay,
    loadingIndicator: { indicatorType: 'Shimmer' },
    columns: [/* columns */]
});

treeGridObj.appendTo('#TreeGrid');
```

Shimmer displays automatically during:
- Initial data fetch
- Page navigation (when allowPaging: true)
- Sorting operations (when allowSorting: true)
- Filtering operations (when allowFiltering: true)

### Spinner Loading Animation

Spinner (animated circle) displays during data loading:

```typescript
let treeGridObj = new TreeGrid({
    dataSource: remoteData,
    loadingIndicator: { indicatorType: 'Spinner' },
    columns: [/* columns */]
});

treeGridObj.appendTo('#TreeGrid');
```

**Key Points:**
- Automatically shown during asynchronous operations
- Dismisses automatically when data loads
- Works with remote data sources (DataManager, WebApiAdaptor)
- Applies to all grid actions requiring data fetch
