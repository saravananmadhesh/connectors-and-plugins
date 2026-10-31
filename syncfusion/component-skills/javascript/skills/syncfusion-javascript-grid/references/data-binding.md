# Data Binding in JavaScript Grid

## Table of Contents
- [Overview](#overview)
- [Local Data Binding](#local-data-binding)
- [Remote Data Binding](#remote-data-binding)
- [DataManager Configuration](#datamanager-configuration)
- [Loading Indicators](#loading-indicators)
- [Handling Data Source Changes](#handling-data-source-changes)
- [Immutable Mode](#immutable-mode)

## When to Use This Reference

- Connect grid to local JavaScript arrays and objects
- Bind grid to remote REST APIs and data services
- Configure DataManager for server-side operations
- Handle real-time data updates and synchronization
- Implement data source changes and refresh strategies

## Overview

Data binding is the process of connecting the Grid component to a data source. The JavaScript Grid supports both local data (JavaScript arrays) and remote data (REST API services) through the DataManager component.

## ⚠️ Data Source Selection Rule — Choose the Right Approach

**Always default to local array data unless the prompt explicitly mentions a remote API, REST endpoint, or server-side data source.**

| Scenario | Use | How |
|----------|-----|-----|
| Prompt provides sample data, static list, or does NOT mention an API | **Local array** | `dataSource: data` where `data` is a plain JS array |
| Prompt explicitly mentions REST API, remote endpoint, server-side, or URL | **DataManager** | `dataSource: new DataManager({ url: '...', adaptor: new UrlAdaptor() })` |

- ✅ **Local array**: Used when data is hardcoded, provided inline, or when no remote source is mentioned. No imports from `@syncfusion/ej2-data` needed.
- ✅ **DataManager**: Used **only** when the prompt explicitly mentions connecting to a REST API, remote URL, or server-side data source.
- ❌ **Never** use `DataManager` with a remote URL when the prompt asks for local/static data — it will cause data not to load because the URL does not exist.

## Local Data Binding

### Binding Array Data

The simplest way to bind data is to pass a JavaScript array to the `dataSource` property:

```ts
import { Grid } from '@syncfusion/ej2-grids';

const data = [
  { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
  { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 },
  { OrderID: 10250, CustomerID: 'HANAR', Freight: 65.83 }
];

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'Freight', headerText: 'Freight', width: 120, format: 'C2' }
  ]
});

grid.appendTo('#grid');
```

### Dynamic Data Updates

Update grid data dynamically:

```ts
import { Grid } from '@syncfusion/ej2-grids';

const initialData = [
  { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 }
];

const grid = new Grid({
  dataSource: initialData,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'Freight', headerText: 'Freight', width: 120, format: 'C2' }
  ]
});

grid.appendTo('#grid');

// Add a row
const addRow = () => {
  const newRecord = { OrderID: 10251, CustomerID: 'VICTE', Freight: 41.34 };
  grid.addRecord(newRecord);
};

// Update data source
const updateData = (newData: any[]) => {
  grid.dataSource = newData;
  grid.refresh();
};

// Get current data
const getCurrentData = () => {
  return grid.getCurrentViewRecords();
};
```

## Remote Data Binding

### Remote DataManager Quick Checklist

> **Only use DataManager when the prompt explicitly mentions a REST API, remote endpoint, or server-side data. For local/static data use a plain array.**

1. Import `DataManager` and the appropriate adaptor from `@syncfusion/ej2-data`
2. **Always replace the `url` with the actual API endpoint** — never leave a placeholder or demo URL
3. **Match `field` names on columns exactly to the JSON property names returned by the API** — any mismatch causes empty columns
4. Choose the correct adaptor based on your API response shape:
   - `UrlAdaptor` → API returns `{ result: [...], count: N }`
   - `WebApiAdaptor` → API returns a plain array or `{ value: [...], Count: N }`
5. For paging with `UrlAdaptor`, the API **must** return a `count` field with the total record count — without it the pager shows incorrect page numbers
6. Add `loadingIndicator` **only when** the prompt asks for a loading indicator or the scenario explicitly involves async API fetching — never add it for local data
7. With `UrlAdaptor`, all operations (filter, search, sort, page) are **automatically sent server-side** — inject `Filter`, `Search`, `Sort`, `Page` modules as normal; no custom query logic needed
8. For server-side error handling use the `actionFailure` event

### Using DataManager

Connect to remote REST API endpoints using DataManager:

```ts
import { Grid, Page, Inject } from '@syncfusion/ej2-grids';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

Grid.Inject(Page);

const data = new DataManager({
  url: 'url',
  adaptor: new UrlAdaptor()
});

const grid = new Grid({
  dataSource: data,
  allowPaging: true,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'Freight', headerText: 'Freight', width: 120, format: 'C2' }
  ]
});

grid.appendTo('#grid');
```

### Adaptor Types

The Grid supports multiple adaptor types for different backend architectures:

**1. UrlAdaptor** - Standard REST API

```ts
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

const data = new DataManager({
  url: 'url',
  adaptor: new UrlAdaptor()
});
```

**2. ODataV4Adaptor** - OData v4 services with advanced filtering

```ts
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

const data = new DataManager({
  url: 'url',
  adaptor: new ODataV4Adaptor()
});
```

**3. WebApiAdaptor** - ASP.NET Web API

```ts
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

const data = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  crossDomain: true
});
```

**4. GraphQLAdaptor** - GraphQL endpoints

```ts
import { DataManager, GraphQLAdaptor } from '@syncfusion/ej2-data';

const data = new DataManager({
  url: 'url',
  adaptor: new GraphQLAdaptor(),
  query: `{
    orders {
      id
      customer
      amount
      date
    }
  }`
});
```

### Error Handling

Handle data loading errors gracefully:

```ts
import { Grid, Page, Inject } from '@syncfusion/ej2-grids';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

Grid.Inject(Page);

const data = new DataManager({
  url: 'url',
  adaptor: new UrlAdaptor()
});

const grid = new Grid({
  dataSource: data,
  allowPaging: true,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'Freight', headerText: 'Freight', width: 120, format: 'C2' }
  ],
  actionFailure: (args: any) => {
    console.error('Data loading failed:', args.error);
    alert('Failed to load data. Please try again.');
  }
});

grid.appendTo('#grid');
```

### Loading States

Display loading indicators while data is being fetched:

```ts
import { Grid, Page, Inject } from '@syncfusion/ej2-grids';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

Grid.Inject(Page);

const data = new DataManager({
  url: 'url',
  adaptor: new UrlAdaptor()
});

const grid = new Grid({
  dataSource: data,
  allowPaging: true,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'Freight', headerText: 'Freight', width: 120, format: 'C2' }
  ],
  actionBegin: (args: any) => {
    if (args.requestType === 'beforesend') {
      console.log('Loading data...');
    }
  },
  dataBound: () => {
    console.log('Data loaded successfully');
  }
});

grid.appendTo('#grid');
```

### Custom Adaptor

Create a custom adaptor for specialized data handling:

```ts
class FullCustomAdaptor extends CustomAdaptor {
  // Override processResponse to transform data
  processResponse(response: any, dm?: DataManager, query?: Query, xhr?: XMLHttpRequest, request?: Request, params?: any): any {
    const result = super.processResponse(response, dm, query, xhr, request, params);
    
    // Transform result
    if (result && result.result) {
      result.result = result.result.map((item: any) => ({
        ...item,
        processed: true
      }));
    }
    
    return result;
  }
}

const dataManager = new DataManager({
  adaptor: new FullCustomAdaptor()
});
```

## DataManager Configuration

### Choosing the Right Adaptor

| Adaptor | Use When | Expected API Response |
|---------|----------|-----------------------|
| `UrlAdaptor` | Your API is built to work with Syncfusion DataManager | `{ result: [...], count: N }` |
| `WebApiAdaptor` | Standard Web API returning plain arrays or OData-like responses | `{ value: [...], Count: N }` or plain array |
| `ODataAdaptor` | OData v3 service | OData XML/JSON format |
| `ODataV4Adaptor` | OData v4 service | OData v4 JSON format |

> ⚠️ **If data is not loading**, the most common causes are:
> 1. **Wrong URL** — the `url` is a placeholder or demo URL, not your real API
> 2. **Wrong adaptor** — your API returns a plain array but you are using `UrlAdaptor` (use `WebApiAdaptor` instead)
> 3. **Wrong field names** — `field` values on columns don't match JSON property names returned by the API
> 4. **Missing `count`** — `UrlAdaptor` requires the response to include `"count"` for paging to work

### Basic Configuration

```ts
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: 'url',
  adaptor: new UrlAdaptor(),
  offline: false
});
```

### Offline Mode

Load data once and work offline:

```ts
const dataManager = new DataManager({
  url: 'url',
  adaptor: new UrlAdaptor(),
  offline: true
});
```

### CRUD Operations

DataManager supports automatic CRUD operations:

```ts
const dataManager = new DataManager({
  url: 'url',
  adaptor: new UrlAdaptor(),
  insertUrl: 'url',
  updateUrl: 'url',
  removeUrl: 'url'
});
```

## Immutable Mode

Immutable mode optimizes grid rendering performance by preventing unnecessary re-renders of unchanged rows. When enabled, only modified or newly added rows are regenerated, improving performance especially with large datasets and frequent updates.


### Enable Immutable Mode

Set `enableImmutableMode: true` on the Grid:

```ts
import { Grid, Page } from '@syncfusion/ej2-grids';
import { data } from './datasource';

Grid.Inject(Page);

const grid = new Grid({
  dataSource: data,
  enableImmutableMode: true,  // Enable immutable mode
  allowPaging: true,
  pageSettings: { pageSize: 50 },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, width: 120 },
    { field: 'CustomerID', headerText: 'Customer ID', width: 120 },
    { field: 'Freight', headerText: 'Freight', width: 100, format: 'C2' },
    { field: 'ShipName', headerText: 'Ship Name', width: 150 }
  ]
});

grid.appendTo('#grid');
```

### How Immutable Mode Works

#### Without Immutable Mode (Default)
When data changes, **all rows** are re-rendered:
- Add: All rows regenerated
- Update: All rows regenerated
- Delete: All rows regenerated
- Result: Events fire for all rows (inefficient with large datasets)

#### With Immutable Mode Enabled
When data changes, **only new/modified rows** are re-rendered:
- Add: Only new rows generated
- Update: Only updated rows regenerated
- Delete: Only remaining rows handled
- Result: Events fire only for changed rows (much more efficient)

```ts
import { Grid, Page, RowDataBoundEventArgs } from '@syncfusion/ej2-grids';

Grid.Inject(Page);

const grid = new Grid({
  dataSource: initialData,
  enableImmutableMode: true,
  
  // This event fires ONLY for newly generated rows (not existing rows)
  rowDataBound: (args: RowDataBoundEventArgs) => {
    console.log('Row rendered:', args.data);
    // Style newly added rows
    if ((args.data as any).isNewlyAdded) {
      (args.row as HTMLElement).style.backgroundColor = 'lightgreen';
    }
  },
  
  columns: [
    { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, width: 120 },
    { field: 'CustomerID', headerText: 'Customer ID', width: 120 },
    { field: 'ShipName', headerText: 'Ship Name', width: 150 }
  ]
});

grid.appendTo('#grid');
```

### Practical Example: Adding, Updating, Deleting with Immutable Mode

```ts
import { Grid, Page } from '@syncfusion/ej2-grids';
import { data } from './datasource';

Grid.Inject(Page);

const grid = new Grid({
  dataSource: data,
  enableImmutableMode: true,
  allowPaging: true,
  pageSettings: { pageSize: 50 },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, width: 120 },
    { field: 'CustomerID', headerText: 'Customer ID', width: 120 },
    { field: 'Freight', headerText: 'Freight', width: 100, format: 'C2' },
    { field: 'ShipName', headerText: 'Ship Name', width: 150 }
  ]
});

grid.appendTo('#grid');

// ADD: Only new row is re-rendered
const addButton = document.getElementById('addBtn') as HTMLElement;
addButton.addEventListener('click', () => {
  const newRecord = {
    OrderID: 11000,
    CustomerID: 'NEWCUST',
    Freight: 45.50,
    ShipName: 'New Shipper',
    isNewlyAdded: true
  };
  
  // Spread operator adds new record to beginning
  grid.dataSource = [newRecord, ...grid.dataSource as any[]];
  // Only the new record renders (efficient)
});

// UPDATE: Only modified row is re-rendered
const updateButton = document.getElementById('updateBtn') as HTMLElement;
updateButton.addEventListener('click', () => {
  const updatedData = (grid.dataSource as any[]).map(row => {
    if (row.OrderID === 10248) {
      return { ...row, Freight: 99.99 };  // Update single row
    }
    return row;
  });
  
  grid.dataSource = updatedData;
  // Only the modified row (OrderID 10248) is re-rendered
});

// DELETE: Remaining rows keep their DOM state
const deleteButton = document.getElementById('deleteBtn') as HTMLElement;
deleteButton.addEventListener('click', () => {
  const filtered = (grid.dataSource as any[]).filter(
    row => row.OrderID !== 10248
  );
  
  grid.dataSource = filtered;
  // Other rows are not re-rendered, only the deleted row is removed
});
```

### queryCellInfo with Immutable Mode

The `queryCellInfo` event fires **only for newly generated cells**:

```ts
import { Grid, CustomRowDataBoundEventArgs } from '@syncfusion/ej2-grids';

const grid = new Grid({
  dataSource: data,
  enableImmutableMode: true,
  
  queryCellInfo: (args: any) => {
    // This fires ONLY when cell is newly generated
    // NOT called for existing cells even if their data unchanged
    
    if (args.column.field === 'Freight' && args.data.Freight > 100) {
      (args.cell as HTMLElement).style.color = 'red';
      (args.cell as HTMLElement).style.fontWeight = 'bold';
    }
  },
  
  columns: [
    { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, width: 120 },
    { field: 'Freight', headerText: 'Freight', width: 100, format: 'C2' }
  ]
});
```

### Performance Comparison

| Scenario | Without Mode | With Immutable Mode |
|----------|-------------|-------------------|
| Add 1 row (1000 rows total) | All 1000 rows re-render | Only 1 row renders ✅ |
| Update 1 row (1000 rows total) | All 1000 rows re-render | Only 1 row re-renders ✅ |
| Delete 1 row (1000 rows total) | All 999 rows re-render | 0 rows re-render ✅ |
| Event fires for | All rows | Changed rows only ✅ |

### Limitations

⚠️ **Immutable mode is NOT compatible with these features:**

| Feature | Reason |
|---------|--------|
| Frozen rows/columns | Cannot reuse rows when columns frozen |
| Grouping | Requires full re-render for group calculations |
| Row template | Templates depend on row position |
| Detail template | Requires different rendering logic |
| Hierarchy grid | Child rows need full parent re-render |
| Virtual/Infinite scroll | Requires complete DOM control |
| Column reorder | Changes cell positions |
| Row/Column spanning | Layout changes require re-render |
| PDF/Excel export | Needs full row data in DOM |
| Print | Requires complete grid rendering |
| Column resize | Changes column widths dynamically |
| Drag and drop | Requires full DOM access |
| Column template | Depends on column position |
| Column chooser | Shows/hides columns dynamically |
| Clipboard | Copy/paste needs all rows |
| AutoFit | Requires measuring all rows |
| Filtering | With freeze requires re-render of all |

```ts
// ✅ BEST PRACTICE: Mark new records for styling
const newRecord = {
  OrderID: 11000,
  CustomerID: 'NEWCUST',
  Freight: 45.50,
  ShipName: 'New Shipper',
  isNewlyAdded: true  // Flag for styling
};

grid.dataSource = [newRecord, ...grid.dataSource as any[]];
```

## Loading Indicators

Display loading state while fetching remote data using `loadingIndicator`:

### Spinner Indicator

```ts
import { Grid, Page, Inject } from '@syncfusion/ej2-grids';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

Grid.Inject(Page);

const data = new DataManager({
  url: 'url',
  adaptor: new UrlAdaptor()
});

const grid = new Grid({
  dataSource: data,
  allowPaging: true,
  loadingIndicator: { indicatorType: 'Spinner' },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'Freight', headerText: 'Freight', width: 120, format: 'C2' }
  ]
});

grid.appendTo('#grid');
```

### Shimmer Indicator

```ts
const grid = new Grid({
  dataSource: data,
  allowPaging: true,
  loadingIndicator: { indicatorType: 'Shimmer' },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'Freight', headerText: 'Freight', width: 120, format: 'C2' }
  ]
});

grid.appendTo('#grid');
```

## Handling Data Source Changes

### Update Data Source

Change data source dynamically:

```ts
import { Grid } from '@syncfusion/ej2-grids';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

const grid = new Grid({
  dataSource: initialData,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'Freight', headerText: 'Freight', width: 120, format: 'C2' }
  ]
});

grid.appendTo('#grid');

// Switch to different data source
const switchDataSource = () => {
  const newData = new DataManager({
    url: 'url',
    adaptor: new UrlAdaptor()
  });
  
  grid.dataSource = newData;
  grid.refresh();
};
```

### Refresh Data

Reload data from the source:

```ts
const refreshData = () => {
  grid.refresh();
};
```

### Query with Additional Parameters

```ts
import { Query } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: 'url',
  adaptor: new UrlAdaptor()
});

// Add query parameters (where, select, etc.)
const query = new Query()
  .where('CustomerID', 'equal', 'VINET')
  .select(['OrderID', 'CustomerID', 'Freight']);

const gridData = dataManager.executeQuery(query);
```

### Modify Data Programmatically

```ts
// Add record
grid.addRecord({ OrderID: 10251, CustomerID: 'VICTE', Freight: 41.34 });

// Update record at specific index
grid.setRowData(0, { OrderID: 10248, CustomerID: 'UPDATED', Freight: 50.00 });

// Delete record at specific index
grid.deleteRow(0);

// Get all records
const allRecords = grid.getCurrentViewRecords();
```
