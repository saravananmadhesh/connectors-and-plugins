# Data Handling & Binding

## When to Use This Reference

Read this reference when you need to:
- Bind hierarchical or self-referential local data to TreeGrid
- Fetch and bind data from remote APIs and web services
- Use DataManager for querying and data operations
- Handle load-on-demand for large datasets
- Work with offline data or custom data processing
- Enable immutable mode for performance optimization
- Manage data structures (nested arrays, flat ID-based)
- Configure remote data with DataManager adaptors
- Handle parent-child relationships in flat data

---

## Table of Contents

- [Local Data Binding](#local-data-binding)
- [Hierarchical Data](#hierarchical-data)
- [Self-Referential Data](#self-referential-data)
- [Remote Data Binding](#remote-data-binding)
- [DataManager Integration](#datamanager-integration)
- [Load On Demand](#load-on-demand)
- [Offline Mode](#offline-mode)
- [Custom Adaptor](#custom-adaptor)
- [AJAX Binding](#ajax-binding)
- [Immutable Mode](#immutable-mode)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

---

## Local Data Binding

Bind data directly from memory (synchronous):

```typescript
import { TreeGrid, Page } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Page);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowPaging: true,
    pageSettings: { pageSize: 10 },
    treeColumnIndex: 1,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'startDate', headerText: 'Start Date', width: 100, type: 'date', format: 'yMd' },
        { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**Advantages:**
- Fast rendering (no server latency)
- Works offline
- No network requests
- Good for small to medium datasets (<10,000 rows)

**Disadvantages:**
- All data loaded upfront  
- Increased initial load time
- Memory intensive for large datasets

---

## Hierarchical Data

Parent-child relationship via nested arrays (childMapping):

```typescript
import { TreeGrid } from '@syncfusion/ej2-treegrid';

// Data structure with nested children
const projectData = [
    {
        taskID: 1,
        taskName: 'Project Initiation',
        subtasks: [
            { taskID: 2, taskName: 'Identify Project Scope', duration: 2 },
            { taskID: 3, taskName: 'Define Project Goals', duration: 4 }
        ]
    },
    {
        taskID: 4,
        taskName: 'Project Execution',
        subtasks: [
            { taskID: 5, taskName: 'Configure Environments', duration: 3 },
            {
                taskID: 6,
                taskName: 'System Setup',
                subtasks: [
                    { taskID: 7, taskName: 'Install Server', duration: 1 },
                    { taskID: 8, taskName: 'Install Client', duration: 1 }
                ]
            }
        ]
    }
];

let treeGridObj = new TreeGrid({
    dataSource: projectData,
    childMapping: 'subtasks',  // Map to child array property
    treeColumnIndex: 0,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90 },
        { field: 'taskName', headerText: 'Task Name', width: 200 },
        { field: 'duration', headerText: 'Duration', width: 100 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**childMapping Property:**
- Points to child records array property
- Supports multiple nesting levels
- No need for ID mapping

**Data Format:** `{ parent: {}, subtasks: [ { child1 }, { child2 } ] }`

---

## Self-Referential Data

Flat data structure using ID and parent ID (parentIdMapping):

```typescript
import { TreeGrid, Page } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Page);

// Flat data with ID and parent ID relationship
const flatProjectData = [
    { taskID: 1, taskName: 'Project Planning', parentID: null, duration: 10 },
    { taskID: 2, taskName: 'Define Scope', parentID: 1, duration: 5 },
    { taskID: 3, taskName: 'Plan Resources', parentID: 1, duration: 3 },
    { taskID: 4, taskName: 'Project Execution', parentID: null, duration: 20 },
    { taskID: 5, taskName: 'Develop Phase', parentID: 4, duration: 15 },
    { taskID: 6, taskName: 'Testing Phase', parentID: 4, duration: 5 }
];

let treeGridObj = new TreeGrid({
    dataSource: flatProjectData,
    idMapping: 'taskID',          // Unique identifier
    parentIdMapping: 'parentID',  // Parent reference
    allowPaging: true,
    pageSettings: { pageSize: 10 },
    treeColumnIndex: 1,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'duration', headerText: 'Duration', width: 100 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**idMapping Property:**
- Unique identifier for each row
- Used for CRUD operations
- Required for data binding

**parentIdMapping Property:**
- References parent row's ID
- `null` value indicates root level
- Flattens hierarchical data

**Data Format:** `{ id, parentId, field1, field2, ... }`

**Reserved Properties to Avoid:**
- childRecords, expanded, level
- parentItem, hasChildRecords, index
- uniqueID, parentUniqueID

---

## Remote Data Binding

Fetch data from backend API (asynchronous):

```typescript
import { TreeGrid, Page } from '@syncfusion/ej2-treegrid';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

TreeGrid.Inject(Page);

let data = new DataManager({
    url: 'localhost://api/xxxx',
    adaptor: new WebApiAdaptor,
    crossDomain: true
});

let treeGridObj = new TreeGrid({
    dataSource: data,
    hasChildMapping: 'isParent',      // Maps field indicating if has children
    idMapping: 'TaskID',
    parentIdMapping: 'ParentItem',
    allowPaging: true,
    height: 350,
    treeColumnIndex: 1,
    columns: [
        { field: 'TaskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
        { field: 'TaskName', headerText: 'Task Name', width: 180 },
        { field: 'StartDate', headerText: 'Start Date', width: 120, type: 'date', format: 'yMd' },
        { field: 'Duration', headerText: 'Duration', width: 80, textAlign: 'Right' }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**hasChildMapping Property:**
- Maps field that indicates parent rows
- Prevents expand icon on leaf nodes
- Improves UX

**Benefits:**
- Large datasets on server
- Lazy loads data as needed
- Reduces client memory

---

## DataManager Integration

Powerful query and adaptor system:

```typescript
import { TreeGrid, Page } from '@syncfusion/ej2-treegrid';
import { DataManager, WebApiAdaptor, Query } from '@syncfusion/ej2-data';

TreeGrid.Inject(Page);

let data = new DataManager({
    url: 'localhost://api/SelfReferenceData',
    adaptor: new WebApiAdaptor,
    crossDomain: true
});

let treeGridObj = new TreeGrid({
    dataSource: data,
    idMapping: 'TaskID',
    parentIdMapping: 'ParentItem',
    allowPaging: true,
    allowSorting: true,
    allowFiltering: true,
    treeColumnIndex: 1,
    columns: [
        { field: 'TaskID', headerText: 'Task ID', width: 90 },
        { field: 'TaskName', headerText: 'Task Name', width: 200 },
        { field: 'Duration', headerText: 'Duration', width: 100 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

### Common Adaptors

```typescript
// WebApiAdaptor - ASP.NET Web API
let webApiData = new DataManager({
    url: 'localhost:3000/api/tasks',
    adaptor: new WebApiAdaptor
});

// UrlAdaptor - Generic REST endpoint
import { UrlAdaptor } from '@syncfusion/ej2-data';
let urlData = new DataManager({
    url: 'localhost:3000/tasks',
    adaptor: new UrlAdaptor
});

// ODataAdaptor - OData v2 service
import { ODataAdaptor } from '@syncfusion/ej2-data';
let odataData = new DataManager({
    url: 'localhost://api/odata/data',
    adaptor: new ODataAdaptor
});

// ODataV4Adaptor - OData v4 service
import { ODataV4Adaptor } from '@syncfusion/ej2-data';
let odata4Data = new DataManager({
    url: 'localhost://api/odata/v4/data',
    adaptor: new ODataV4Adaptor
});
```

### CRUD Operations via DataManager

```typescript
let data = new DataManager({
    url: 'localhost:3000/api/tasks',
    updateUrl: 'localhost:3000/api/tasks',
    insertUrl: 'localhost:3000/api/tasks/insert',
    removeUrl: 'localhost:3000/api/tasks/delete',
    adaptor: new WebApiAdaptor
});

let treeGridObj = new TreeGrid({
    dataSource: data,
    idMapping: 'TaskID',
    parentIdMapping: 'ParentItem',
    editSettings: {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: 'Row'
    },
    toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
    treeColumnIndex: 1,
    columns: [
        { field: 'TaskID', headerText: 'Task ID', isPrimaryKey: true, width: 90 },
        { field: 'TaskName', headerText: 'Task Name', width: 200, allowEditing: true },
        { field: 'Duration', headerText: 'Duration', width: 100 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

---

## Load On Demand

Load child records only when parent is expanded:

```typescript
import { TreeGrid, Page } from '@syncfusion/ej2-treegrid';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

TreeGrid.Inject(Page);

let data = new DataManager({
    url: 'localhost:3000/api/tasks',
    adaptor: new UrlAdaptor
});

let treeGridObj = new TreeGrid({
    dataSource: data,
    idMapping: 'TaskID',
    parentIdMapping: 'ParentItem',
    hasChildMapping: 'isParent',
    loadChildOnDemand: true,      // Enable load on demand
    expandStateMapping: 'IsExpanded',  // Map expand state
    allowPaging: true,
    height: 350,
    treeColumnIndex: 1,
    columns: [
        { field: 'TaskID', headerText: 'Task ID', width: 90 },
        { field: 'TaskName', headerText: 'Task Name', width: 180 },
        { field: 'Duration', headerText: 'Duration', width: 80 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**loadChildOnDemand: true**
- Parent rows collapse on load
- Child records load when parent expands
- Improves performance with large hierarchies

**expandStateMapping Property:**
- Maps field indicating if row is expanded
- Loads pre-expanded rows from server
- Useful for saved states

---

## Offline Mode

Load all data once, process client-side:

```typescript
import { TreeGrid, Page } from '@syncfusion/ej2-treegrid';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

TreeGrid.Inject(Page);

let data = new DataManager({
    url: 'localhost://api/SelfReferenceData',
    adaptor: new WebApiAdaptor,
    crossDomain: true,
    offline: true  // Enable offline mode
});

let treeGridObj = new TreeGrid({
    dataSource: data,
    idMapping: 'TaskID',
    parentIdMapping: 'ParentItem',
    allowPaging: true,
    allowSorting: true,
    allowFiltering: true,
    treeColumnIndex: 1,
    columns: [
        { field: 'TaskID', headerText: 'Task ID', width: 90 },
        { field: 'TaskName', headerText: 'Task Name', width: 200 },
        { field: 'Duration', headerText: 'Duration', width: 100 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**Benefits:**
- All operations (paging, filtering, sorting) client-side
- No postback to server
- Faster interaction after initial load

**When to use:**
- Small to medium datasets (< 50K rows)
- All data needs to be available
- Performance is critical

---

## Custom Adaptor

Extend built-in adaptor for custom logic:

```typescript
import { TreeGrid } from '@syncfusion/ej2-treegrid';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

class CustomAdaptor extends WebApiAdaptor {
    public processResponse(): any {
        let i = 0;
        // Call base processResponse
        let original = super.processResponse.apply(this, arguments);
        
        // Add serial number to each record
        original.forEach((item: any) => {
            item['SerialNo'] = ++i;
        });
        
        return original;
    }
}

let data = new DataManager({
    url: 'localhost:3000/api/tasks',
    adaptor: new CustomAdaptor,
    crossDomain: true
});

let treeGridObj = new TreeGrid({
    dataSource: data,
    idMapping: 'TaskID',
    parentIdMapping: 'ParentItem',
    treeColumnIndex: 1,
    columns: [
        { field: 'SerialNo', headerText: 'S.No', width: 70 },
        { field: 'TaskID', headerText: 'Task ID', width: 90 },
        { field: 'TaskName', headerText: 'Task Name', width: 200 },
        { field: 'Duration', headerText: 'Duration', width: 80 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**Use Cases:**
- Add computed columns (serial number, totals)
- Transform response data format
- Implement custom encoding/decoding
- Add authentication headers

### Sending Additional Parameters

```typescript
import { Query } from '@syncfusion/ej2-data';

let data = new DataManager({
    url: 'localhost:3000/api/tasks',
    adaptor: new WebApiAdaptor,
    crossDomain: true
});

// Add custom parameters to request
let query = new Query().addParams('ej2treegrid', 'true').addParams('department', 'engineering');

let treeGridObj = new TreeGrid({
    dataSource: data,
    query: query,  // Apply query with parameters
    idMapping: 'TaskID',
    parentIdMapping: 'ParentItem',
    columns: [
        { field: 'TaskID', headerText: 'Task ID', width: 90 },
        { field: 'TaskName', headerText: 'Task Name', width: 200 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

### Error Handling

```typescript
let treeGridObj = new TreeGrid({
    dataSource: data,
    idMapping: 'TaskID',
    parentIdMapping: 'ParentItem',
    actionFailure: (args: any) => {
        // Handle error
        
    },
    columns: [
        { field: 'TaskID', headerText: 'Task ID', width: 90 },
        { field: 'TaskName', headerText: 'Task Name', width: 200 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

---

## AJAX Binding

Fetch data via Fetch API or Ajax:

```typescript
import { TreeGrid, Page } from '@syncfusion/ej2-treegrid';
import { Fetch } from '@syncfusion/ej2-base';

TreeGrid.Inject(Page);

let treeGridObj = new TreeGrid({
    idMapping: 'TaskID',
    parentIdMapping: 'ParentItem',
    allowPaging: true,
    pageSettings: { pageSize: 10 },
    treeColumnIndex: 1,
    columns: [
        { field: 'TaskID', headerText: 'Task ID', width: 90 },
        { field: 'TaskName', headerText: 'Task Name', width: 200 },
        { field: 'Duration', headerText: 'Duration', width: 80 }
    ]
});

treeGridObj.appendTo('#TreeGrid');

// Create button to load data
let button = document.createElement('button');
button.textContent = 'Load Data';
treeGridObj.element.parentNode.insertBefore(button, treeGridObj.element);

button.addEventListener('click', () => {
    let fetch = new Fetch('localhost://api/SelfReferenceData', 'GET');
    
    treeGridObj.showSpinner();
    
    fetch.send();
    
    fetch.onSuccess = (data: any) => {
        treeGridObj.hideSpinner();
        treeGridObj.dataSource = data;  // Bind fetched data
    };
});
```

**Important:** Data binds locally after fetch (not remote binding).

---

## Immutable Mode

Optimize re-rendering by detecting only changed rows:

```typescript
import { TreeGrid, Page, Edit } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Page, Edit);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    enableImmutableMode: true,    // Enable immutable mode
    allowPaging: true,
    pageSettings: { pageSize: 50 },
    editSettings: {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: 'Cell'
    },
    selectionSettings: { type: 'Multiple' },
    beforeDataBound: () => {
        console.log('Rendering started...');
    },
    dataBound: () => {
        console.log('Rendering completed');
    },
    treeColumnIndex: 1,
    columns: [
        { field: 'taskID', headerText: 'Task ID', isPrimaryKey: true, width: 70, textAlign: 'Right' },
        { field: 'taskName', headerText: 'Task Name', width: 200 },
        { field: 'startDate', headerText: 'Start Date', width: 100, type: 'date', format: 'yMd' },
        { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' },
        { field: 'progress', headerText: 'Progress', width: 80 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**enableImmutableMode: true**
- Only re-renders changed/new rows
- Uses object reference comparison
- Requires `isPrimaryKey` on primary column
- Performance improvement: 10-50% faster

**When to use:**
- Large data (>1000 rows)
- Frequent CRUD operations
- Cell editing enabled

**Limitations:**
- No frozen rows/columns
- No row/detail templates
- No column reordering
- No virtualization

**Example Performance Comparison:**

```typescript
// Without immutable mode: 500ms render time
// With immutable mode: 50ms render time
// On delete/add operations
```

---

## Common Patterns

### Pattern: Dynamic Data Source Switch

```typescript
function switchDataSource(sourceType: string) {
    if (sourceType === 'local') {
        treeGridObj.dataSource = localData;
    } else if (sourceType === 'remote') {
        let remoteData = new DataManager({
            url: 'localhost:3000/api/tasks',
            adaptor: new WebApiAdaptor
        });
        treeGridObj.dataSource = remoteData;
    }
}
```

### Pattern: Implement Pagination with Load On Demand

```typescript
let treeGridObj = new TreeGrid({
    dataSource: data,
    loadChildOnDemand: true,
    allowPaging: true,
    pageSettings: { pageSize: 20, pageSizeMode: 'Root' },
    // Only root rows count shown in pager
});
```

---

## Troubleshooting

**Q: Remote data not loading?**  
A: Check API endpoint, CORS setup, network tab, and hasChildMapping property.

**Q: Reserved property errors?**  
A: Avoid using `childRecords`, `expanded`, `level`, `parentItem`, etc. in data.

**Q: Immutable mode not working?**  
A: Ensure `isPrimaryKey: true` is set on primary column.

**Q: Child data not loading on expand?**  
A: Verify `hasChildMapping` property is set correctly, and server returns appropriate values.

