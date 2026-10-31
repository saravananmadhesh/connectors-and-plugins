# Data Binding

Bind TreeView to local arrays, remote services, or DataManager instances.

## Table of Contents

1. [Local Data - Hierarchical Format](#local-data---hierarchical-format)
2. [Local Data - Self-Referential Format](#local-data---self-referential-format)
3. [Remote Data with DataManager](#remote-data-with-datamanager)
4. [OData Service Binding](#odata-service-binding)
5. [Web API Binding](#web-api-binding)
6. [Custom Adaptor](#custom-adaptor)
7. [Lazy Loading](#lazy-loading)
8. [Data Binding Best Practices](#data-binding-best-practices)
9. [Troubleshooting](#troubleshooting)

---

## Local Data - Hierarchical Format

Bind TreeView to nested JSON objects with hierarchical structure:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView } from '@syncfusion/ej2-navigations';
enableRipple(true);

let continents = [
    {
        code: 'AF', name: 'Africa', countries: [
            { code: 'NGA', name: 'Nigeria' },
            { code: 'EGY', name: 'Egypt' },
            { code: 'ZAF', name: 'South Africa' }
        ]
    },
    {
        code: 'AS', name: 'Asia', expanded: true, countries: [
            { code: 'CHN', name: 'China' },
            { code: 'IND', name: 'India', selected: true },
            { code: 'JPN', name: 'Japan' }
        ]
    },
    {
        code: 'EU', name: 'Europe', countries: [
            { code: 'DNK', name: 'Denmark' },
            { code: 'FIN', name: 'Finland' },
            { code: 'AUT', name: 'Austria' }
        ]
    }
];

let treeObj = new TreeView({
    fields: { 
        dataSource: continents, 
        id: 'code', 
        text: 'name', 
        child: 'countries'  // Specify nested property
    }
});

treeObj.appendTo('#tree');
```

**Map fields to your data structure:**

```typescript
fields: {
    dataSource: continents,
    id: 'code',              // Unique identifier
    text: 'name',            // Display text
    child: 'countries',      // Child nodes property
    expanded: 'expanded',    // Pre-expanded state
    selected: 'selected'     // Pre-selected state
}
```

## Local Data - Self-Referential Format

Bind TreeView to flat arrays using parent-child relationships:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView } from '@syncfusion/ej2-navigations';
enableRipple(true);

let localData = [
    { id: 1, name: 'Discover Music', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'Hot Singles' },
    { id: 3, pid: 1, name: 'Rising Artists' },
    { id: 4, pid: 1, name: 'Live Music' },
    { id: 7, name: 'Sales and Events', hasChild: true },
    { id: 8, pid: 7, name: '100 Albums - $5 Each' },
    { id: 9, pid: 7, name: 'Hip-Hop and R&B Sale' },
    { id: 11, name: 'Categories', hasChild: true },
    { id: 12, pid: 11, name: 'Songs' },
    { id: 13, pid: 11, name: 'Bestselling Albums' },
    { id: 14, pid: 11, name: 'New Releases' }
];

let treeObj = new TreeView({
    fields: {
        dataSource: localData,
        id: 'id',
        parentID: 'pid',      // Parent ID mapping
        text: 'name',
        hasChildren: 'hasChild'  // Has children indicator
    }
});

treeObj.appendTo('#tree');
```

**Key differences from hierarchical:**
- Use `parentID` instead of `child`
- Flat array structure (no nesting)
- Root nodes have `pid: null` or no pid field
- Child nodes reference parent with `pid`

## Remote Data - Web API

Fetch data from a remote Web API endpoint:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView } from '@syncfusion/ej2-navigations';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
enableRipple(true);

let dataManager = new DataManager({
    url: 'https://ej2services.syncfusion.com/production/web-services/api/treeviewdata',
    adaptor: new WebApiAdaptor(),
    offline: false  // Fetch fresh data each time
});

let treeObj = new TreeView({
    fields: {
        dataSource: dataManager,
        id: 'nodeId',
        parentID: 'parentID',
        text: 'nodeText',
        hasChildren: 'hasChild'
    }
});

treeObj.appendTo('#tree');
```

## Remote Data - OData Service

Connect to OData endpoints:

```typescript
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

let dataManager = new DataManager({
    url: 'https://services.odata.org/V4/Northwind/Northwind.svc/',
    adaptor: new ODataV4Adaptor(),
    offline: false
});

let treeObj = new TreeView({
    fields: {
        dataSource: dataManager,
        id: 'EmployeeID',
        text: 'FirstName',
        parentID: 'ReportsTo'
    }
});

treeObj.appendTo('#tree');
```

## Remote Data with Query Filtering

Apply filters when fetching remote data:

```typescript
import { DataManager, WebApiAdaptor, Query, Predicate } from '@syncfusion/ej2-data';

let dataManager = new DataManager({
    url: 'https://ej2services.syncfusion.com/production/web-services/api/treeviewdata',
    adaptor: new WebApiAdaptor(),
    offline: false
});

// Create a query with filter
let query = new Query().where('country', 'equal', 'India');

let treeObj = new TreeView({
    fields: {
        dataSource: new DataManager({ 
            url: 'https://ej2services.syncfusion.com/production/web-services/api/treeviewdata',
            adaptor: new WebApiAdaptor(),
            offline: false
        }),
        id: 'nodeId',
        parentID: 'parentID',
        text: 'nodeText',
        hasChildren: 'hasChild'
    }
});

treeObj.appendTo('#tree');
```

## Load on Demand

By default, TreeView uses `loadOnDemand` mode which loads parent nodes initially and child nodes when expanded:

```typescript
let treeObj = new TreeView({
    fields: { dataSource: data, id: 'id', parentID: 'pid', text: 'name' },
    loadOnDemand: true  // Default: true (lazy loading)
});

treeObj.appendTo('#tree');
```

### Disable Load on Demand

Load all data at once:

```typescript
let treeObj = new TreeView({
    fields: { dataSource: data, id: 'id', parentID: 'pid', text: 'name' },
    loadOnDemand: false  // Load all nodes immediately
});

treeObj.appendTo('#tree');
```

## DataBound Event

Use the `dataBound` event to execute code after data is loaded:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView } from '@syncfusion/ej2-navigations';
enableRipple(true);

let treeObj = new TreeView({
    fields: { dataSource: data, id: 'id', parentID: 'pid', text: 'name' },
    dataBound: onDataBound
});

treeObj.appendTo('#tree');

function onDataBound(): void {
    console.log('Data bound to TreeView');
    // Perform actions after data is loaded
    let allNodes = treeObj.getTreeData('');
    console.log('Total nodes:', allNodes.length);
}
```

## Data Events

### Data Source Changed Event

Detect when data source is updated:

```typescript
import { TreeView, DataSourceChangedEventArgs } from '@syncfusion/ej2-navigations';

let treeObj = new TreeView({
    fields: { dataSource: data, id: 'id', parentID: 'pid', text: 'name' },
    dataSourceChanged: onDataSourceChanged
});

treeObj.appendTo('#tree');

function onDataSourceChanged(args: DataSourceChangedEventArgs): void {
    console.log('Data source changed');
    console.log('Action:', args.action);  // 'add', 'remove', 'update'
}
```

## Complete Example: Remote Data with Error Handling

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView, DataBoundEventArgs } from '@syncfusion/ej2-navigations';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
enableRipple(true);

let dataManager = new DataManager({
    url: 'https://ej2services.syncfusion.com/production/web-services/api/treeviewdata',
    adaptor: new WebApiAdaptor(),
    offline: false,
    // Handle request completion
    beforeSend: (request) => {
        console.log('Request sent to server');
    },
    // Handle errors
    onError: (error) => {
        console.error('Data fetch error:', error);
        showErrorMessage('Failed to load data');
    }
});

let treeObj = new TreeView({
    fields: {
        dataSource: dataManager,
        id: 'nodeId',
        parentID: 'parentID',
        text: 'nodeText',
        hasChildren: 'hasChild'
    },
    dataBound: onDataBound,
    actionFailure: onActionFailure,
    loadOnDemand: true
});

treeObj.appendTo('#tree');

function onDataBound(args: DataBoundEventArgs): void {
    console.log('TreeView data loaded successfully');
    hideLoadingIndicator();
}

function onActionFailure(): void {
    console.error('TreeView action failed');
    showErrorMessage('Unable to load TreeView data');
}

function showErrorMessage(message: string): void {
    let errorDiv = document.getElementById('error');
    if (errorDiv) {
        errorDiv.innerHTML = message;
    }
}

function hideLoadingIndicator(): void {
    let loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
}
```

## Data Source Configuration Summary

| Option | Purpose | Example |
|--------|---------|---------|
| **Array** | Local hierarchical data | `dataSource: continents` |
| **Array** | Local self-referential data | `dataSource: localData` |
| **DataManager (Web API)** | Remote JSON API | `dataSource: new DataManager({url: '...'})` |
| **DataManager (OData)** | OData service | `adaptor: new ODataV4Adaptor()` |
| **loadOnDemand** | Lazy load nodes | `loadOnDemand: true` |
| **dataBound** | Callback after load | `dataBound: onDataBound` |

## Best Practices

1. **Use hierarchical data** for simpler structures with clear parent-child relationships
2. **Use self-referential data** for flexible, complex hierarchies
3. **Enable `loadOnDemand`** for large datasets to improve performance
4. **Handle errors** when using remote data sources
5. **Map fields correctly** to avoid data binding issues
6. **Cache remote data** when appropriate to reduce server requests
