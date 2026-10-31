# Data Binding in Syncfusion Gantt Chart

## Table of Contents
- [Local Data](#local-data)
  - [Hierarchical Data](#hierarchical-data)
  - [Self-Referential (Flat) Data](#self-referential-flat-data)
- [Remote Data](#remote-data)
  - [WebApiAdaptor](#webapiadaptor)
  - [UrlAdaptor](#urladaptor)
  - [Load Child on Demand](#load-child-on-demand)
  - [Additional Parameters](#additional-parameters)
  - [Ajax Binding](#ajax-binding)
- [Split Tasks (Segments)](#split-tasks-segments)
- [Limitations](#limitations)

---

## Local Data

### Hierarchical Data

Map child records using `taskFields.child`. Parent records contain an array of subtasks.

```typescript
import { Gantt } from '@syncfusion/ej2-gantt';

let data: Object[] = [
    {
        TaskID: 1, TaskName: 'Project Initiation',
        StartDate: new Date('04/02/2024'), EndDate: new Date('04/21/2024'),
        subtasks: [
            { TaskID: 2, TaskName: 'Identify Site location', StartDate: new Date('04/02/2024'), Duration: 4, Progress: 50 },
            { TaskID: 3, TaskName: 'Perform Soil test', StartDate: new Date('04/02/2024'), Duration: 4, Progress: 50 },
            { TaskID: 4, TaskName: 'Soil test approval', StartDate: new Date('04/02/2024'), Duration: 4, Progress: 50 }
        ]
    }
];

let gantt: Gantt = new Gantt({
    dataSource: data,
    height: '450px',
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', progress: 'Progress', child: 'subtasks'
    }
});
gantt.appendTo('#Gantt');
```

### Self-Referential (Flat) Data

Use `taskFields.parentID` for flat arrays where each record stores its parent's ID.

```typescript
import { Gantt } from '@syncfusion/ej2-gantt';

let flatData: Object[] = [
    { TaskID: 1, TaskName: 'Project Initiation', StartDate: new Date('04/02/2024'), EndDate: new Date('04/21/2024') },
    { TaskID: 2, TaskName: 'Identify Site location', StartDate: new Date('04/02/2024'), Duration: 4, Progress: 50, ParentId: 1 },
    { TaskID: 3, TaskName: 'Perform Soil test', StartDate: new Date('04/02/2024'), Duration: 4, Progress: 50, ParentId: 1 },
    { TaskID: 4, TaskName: 'Soil test approval', StartDate: new Date('04/02/2024'), Duration: 4, Progress: 50, ParentId: 1 }
];

let gantt: Gantt = new Gantt({
    dataSource: flatData,
    height: '450px',
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', progress: 'Progress', parentID: 'ParentId'
    }
});
gantt.appendTo('#Gantt');
```

> **Rule:** If both `child` and `parentID` are mapped, `parentID` takes priority and Gantt renders based on the flat structure.

---

## Remote Data

### WebApiAdaptor

```typescript
import { Gantt } from '@syncfusion/ej2-gantt';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

let dataSource: DataManager = new DataManager({
    url: '/api/odata/tasks',  // ✅ Use an internal, authenticated endpoint — never a public third-party URL
    adaptor: new WebApiAdaptor,
    // crossDomain: true  — avoid unless required; enforce CORS on the server side instead
});

let gantt: Gantt = new Gantt({
    dataSource: dataSource,
    height: '450px',
    treeColumnIndex: 1,
    taskFields: {
        id: 'TaskId', name: 'TaskName', startDate: 'StartDate',
        progress: 'Progress', duration: 'Duration',
        dependency: 'Predecessor', child: 'SubTasks'
    }
});
gantt.appendTo('#Gantt');
```

### UrlAdaptor

Use `UrlAdaptor` when communicating with ASP.NET MVC/Web API endpoints:

```typescript
import { Gantt } from '@syncfusion/ej2-gantt';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

let dataSource: DataManager = new DataManager({
    url: '/Home/UrlDatasource',
    adaptor: new UrlAdaptor
});

let gantt: Gantt = new Gantt({
    dataSource: dataSource,
    height: '450px',
    treeColumnIndex: 1,
    taskFields: {
        id: 'TaskId', name: 'TaskName', startDate: 'StartDate',
        progress: 'Progress', duration: 'Duration',
        dependency: 'Predecessor', child: 'SubTasks'
    }
});
gantt.appendTo('#Gantt');
```

**Server-side controller (C#):**
```csharp
public ActionResult UrlDatasource(DataManagerRequest dm)
{
    List<GanttData> DataList = db.GanttDatas.ToList();
    var count = DataList.Count();
    return Json(new { result = DataList, count = count });
}
```

### Load Child on Demand

Renders child records lazily when parent nodes are expanded. Requires `hasChildMapping` in `taskFields`.

```typescript
import { Gantt, VirtualScroll, Selection } from '@syncfusion/ej2-gantt';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

Gantt.Inject(Selection, VirtualScroll);

let gantt: Gantt = new Gantt({
    dataSource: new DataManager({
        url: '/api/tasks',  // ✅ Use an internal, authenticated endpoint — never a public
        adaptor: new WebApiAdaptor,
        // crossDomain: true  — avoid unless required; enforce CORS on the server side instead
    }),
    loadChildOnDemand: false,    // false = lazy load on expand
    enableVirtualization: true,
    taskFields: {
        id: 'taskId', name: 'taskName', startDate: 'startDate',
        endDate: 'endDate', duration: 'duration', progress: 'progress',
        hasChildMapping: 'isParent',   // field indicating record has children
        parentID: 'parentID'
    },
    height: '460px',
    projectStartDate: new Date('01/02/2000'),
    projectEndDate: new Date('12/01/2002')
});
gantt.appendTo('#Gantt');
```

**Key behaviours:**
- `loadChildOnDemand: false` → all root nodes collapsed at load; children fetched on expand
- `loadChildOnDemand: true` → parent records rendered expanded
- Once expanded, children are cached locally for subsequent expand/collapse

**Limitations:** Filtering, sorting, and searching are not supported with load-on-demand.

### Additional Parameters

Pass extra parameters to the server using `Query.addParams` inside the `load` event:

```typescript
import { Gantt, Edit, Toolbar } from '@syncfusion/ej2-gantt';
import { DataManager, UrlAdaptor, Query } from '@syncfusion/ej2-data';

Gantt.Inject(Edit, Toolbar);

let gantt: Gantt = new Gantt({
    dataSource: new DataManager({ url: '/Home/UrlDatasource', adaptor: new UrlAdaptor }),
    height: '450px',
    taskFields: { id: 'taskID', name: 'taskName', startDate: 'startDate', parentID: 'parentID' },
    load: function () {
        this.query = new Query().addParams('ej2Gantt', 'myCustomValue');
    }
});
gantt.appendTo('#Gantt');
```

### Ajax Binding

Fetch data manually and assign it to `dataSource`:

```typescript
import { Gantt } from '@syncfusion/ej2-gantt';
import { Ajax } from '@syncfusion/ej2-base';

let gantt: Gantt = new Gantt({
    height: '450px',
    taskFields: { id: 'TaskId', name: 'TaskName', startDate: 'StartDate', child: 'SubTasks' }
});
gantt.appendTo('#Gantt');

let button: HTMLElement = document.createElement('button');
button.textContent = 'Load Data';
document.body.appendChild(button);

button.addEventListener('click', function () {
    let ajax = new Ajax('/api/GanttData', 'GET');
    gantt.showSpinner();
    ajax.send();
    ajax.onSuccess = function (data: string) {
        gantt.hideSpinner();
        gantt.dataSource = (JSON.parse(data)).Items;
        gantt.refresh();
    };
});
```

> **Note:** Ajax-bound data acts as local data — no server-side CRUD operations.

---

## Split Tasks (Segments)

Split a task into multiple segments (interrupted work periods).

### Hierarchical Segments

```typescript
let data: Object[] = [
    {
        TaskID: 1, TaskName: 'Identify Site location', StartDate: new Date('04/02/2024'), Duration: 4, Progress: 50,
        Segments: [
            { StartDate: new Date('04/02/2024'), Duration: 2 },
            { StartDate: new Date('04/05/2024'), Duration: 2 }
        ]
    }
];

let gantt: Gantt = new Gantt({
    dataSource: data,
    height: '450px',
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', progress: 'Progress',
        child: 'subtasks', segments: 'Segments'  // map segments field
    }
});
gantt.appendTo('#Gantt');
```

### Self-Referential Segments

Use `segmentData` for flat segment collection with `taskFields.segmentId`:

```typescript
let gantt: Gantt = new Gantt({
    dataSource: flatData,
    height: '450px',
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', progress: 'Progress',
        parentID: 'ParentID', segmentId: 'segmentId'
    },
    segmentData: [
        { segmentId: 2, StartDate: new Date('04/02/2024'), Duration: 2 },
        { segmentId: 2, StartDate: new Date('04/05/2024'), Duration: 2 },
        { segmentId: 4, StartDate: new Date('04/02/2024'), Duration: 2 },
        { segmentId: 4, StartDate: new Date('04/05/2024'), Duration: 2 }
    ]
});
gantt.appendTo('#Gantt');
```

---

## Limitations

- Load-on-demand supports **only self-referential data** with remote binding
- With remote data, only flat (self-referential) data is supported — not complex hierarchical JSON
- If both `child` and `parentID` are mapped, `parentID` is prioritized
- Ajax-bound data cannot perform server-side CRUD
