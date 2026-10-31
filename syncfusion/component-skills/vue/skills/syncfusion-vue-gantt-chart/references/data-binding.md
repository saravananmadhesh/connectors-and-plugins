# Data Binding

## Table of Contents
- [Local Data](#local-data)
- [Self-Referential vs Hierarchical](#self-referential-vs-hierarchical)
- [Remote Data](#remote-data)
- [Remote Save Adaptor](#remote-save-adaptor)
- [Load-on-Demand](#load-on-demand)
- [Immutable Data](#immutable-data)
- [Virtual Scrolling for Large Data](#virtual-scrolling-for-large-data)
- [Sending additional parameters to the server](#sending-additional-parameters-to-the-server)
- [Handling HTTP error](#handling-http-error)
- [Binding with Ajax](#binding-with-ajax)

## Local Data

Assign a JavaScript array directly to `dataSource`. The Gantt Chart accepts two structural formats.

## Self-Referential vs Hierarchical

Choose the format based on your use case:

| Format | Field | Best For |
|---|---|---|
| Self-referential (flat) | `parentID` | CRUD operations, server data |
| Hierarchical (nested) | `child` / `subtasks` | Static data, simpler nesting |

### Self-Referential (Flat with ParentID) — Recommended for CRUD

```vue
<script setup>
import { GanttComponent as EjsGantt } from '@syncfusion/ej2-vue-gantt';

const data = [
  { TaskID: 1, TaskName: 'Project Initiation', StartDate: new Date('04/02/2019'), EndDate: new Date('04/21/2019'), ParentID: null },
  { TaskID: 2, TaskName: 'Identify Site location', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50, ParentID: 1 },
  { TaskID: 3, TaskName: 'Perform Soil test', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50, ParentID: 1 },
  { TaskID: 4, TaskName: 'Soil test approval', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50, ParentID: 1 },
  { TaskID: 5, TaskName: 'Project Estimation', StartDate: new Date('04/02/2019'), EndDate: new Date('04/21/2019'), ParentID: null },
  { TaskID: 6, TaskName: 'Develop floor plan', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50, ParentID: 5 },
];

const taskFields = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  endDate: 'EndDate',
  duration: 'Duration',
  progress: 'Progress',
  parentID: 'ParentID'   // key: use parentID for flat data
};
</script>
```

### Hierarchical (Nested subtasks)

```js
const data = [
  {
    TaskID: 1,
    TaskName: 'Project Initiation',
    StartDate: new Date('04/02/2019'),
    subtasks: [
      { TaskID: 2, TaskName: 'Identify Site location', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50 },
      { TaskID: 3, TaskName: 'Perform Soil test', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50 },
    ]
  }
];

const taskFields = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  duration: 'Duration',
  child: 'subtasks'   // key: use child for hierarchical data
};
```

## Remote Data

Use `DataManager` to bind remote REST or OData sources.

```vue
<template>
  <ejs-gantt :dataSource="dataManager" :taskFields="taskFields" height="450px"></ejs-gantt>
</template>

<script setup>
import { GanttComponent as EjsGantt } from '@syncfusion/ej2-vue-gantt';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: '/api/odata/tasks',
  adaptor: new WebApiAdaptor()
});

const taskFields = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  duration: 'Duration',
  progress: 'Progress',
  parentID: 'ParentID'
};
</script>
```

**Common adaptors:**
- `WebApiAdaptor` — ASP.NET Web API / REST JSON
- `ODataV4Adaptor` — OData v4 endpoints
- `UrlAdaptor` — Custom CRUD URL mapping

## Remote Save Adaptor

Use **RemoteSaveAdaptor** when you want to apply most Gantt operations on the client (sorting, expanding, editing in UI), but persist CRUD changes on the server.

With Remote Save:
- Set `json` for initial data
- Set `adaptor` to `new RemoteSaveAdaptor()`
- Use `batchUrl` to map added/changed/deleted batches to your server

```vue
<template>
  <ejs-gantt
    :dataSource="dataManager"
    :taskFields="taskFields"
    :editSettings="editSettings"
    height="450px"
  ></ejs-gantt>
</template>

<script setup>
import { GanttComponent as EjsGantt } from '@syncfusion/ej2-vue-gantt';
import { DataManager, RemoteSaveAdaptor } from '@syncfusion/ej2-data';

const jsonData = [
  { TaskID: 1, TaskName: 'Project Initiation', StartDate: new Date('04/02/2019'), EndDate: new Date('04/21/2019'), ParentID: null },
  { TaskID: 2, TaskName: 'Identify Site location', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50, ParentID: 1 },
];

const dataManager = new DataManager({
  json: jsonData,
  adaptor: new RemoteSaveAdaptor(),
  batchUrl: '/api/gantt/batch'
});

const taskFields = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  endDate: 'EndDate',
  duration: 'Duration',
  progress: 'Progress',
  parentID: 'ParentID'
};

const editSettings = {
  allowAdding: true,
  allowEditing: true,
  allowDeleting: true,
  allowTaskbarEditing: true,
  showDeleteConfirmDialog: true
};
</script>
```

> On your server, handle the batch payload (added/changed/deleted) and return the updated records.

Server-side example (ASP.NET Core):

```csharp
public class CRUDModel
{
  public List<GanttData> added { get; set; }
  public List<GanttData> changed { get; set; }
  public List<GanttData> deleted { get; set; }
  public object key { get; set; }
  public string action { get; set; }
  public string table { get; set; }
}

public IActionResult BatchUpdate([FromBody] CRUDModel batchmodel)
{
  if (batchmodel.changed != null)
  {
    foreach (var value in batchmodel.changed)
    {
      var existing = DataList.FirstOrDefault(x => x.TaskID == value.TaskID);
      if (existing == null) continue;

      existing.TaskName = value.TaskName;
      existing.StartDate = value.StartDate;
      existing.EndDate = value.EndDate;
      existing.Duration = value.Duration;
      existing.Progress = value.Progress;
      existing.ParentID = value.ParentID;
    }
  }

  if (batchmodel.deleted != null)
  {
    foreach (var value in batchmodel.deleted)
    {
      DataList.RemoveAll(x => x.TaskID == value.TaskID);
      // Optional: remove child records recursively.
    }
  }

  if (batchmodel.added != null)
  {
    DataList.AddRange(batchmodel.added);
  }

  return Json(new {
    addedRecords = batchmodel.added,
    changedRecords = batchmodel.changed,
    deletedRecords = batchmodel.deleted
  });
}
```

## Load-on-Demand

Load only parent records initially; fetch child records when a row expands. Reduces initial payload for large hierarchies.

```vue
<ejs-gantt
  :dataSource="dataManager"
  :taskFields="taskFields"
  :allowParentDependency="true"
  height="450px"
></ejs-gantt>

<script setup>
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: '/api/gantt',
  adaptor: new WebApiAdaptor()
});

const taskFields = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  duration: 'Duration',
  parentID: 'ParentID',
  hasChildMapping: 'isParent'   // required for load-on-demand
};
</script>
```

> `hasChildMapping` is **required** for load-on-demand. Failing to map it triggers `actionFailure`.

## Sending additional parameters to the server

Pass extra values during load (and sometimes during CRUD) using `Query.addParams()`.

In Vue, hook the Gantt `load` event and attach your parameters to the request.

```vue
<template>
  <ejs-gantt
    :dataSource="dataManager"
    :taskFields="taskFields"
    :load="load"
    :editSettings="editSettings"
    height="450px"
  ></ejs-gantt>
</template>

<script setup>
import { DataManager, UrlAdaptor, Query } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: '/Home/UrlDatasource',
  adaptor: new UrlAdaptor(),
  batchUrl: '/Home/BatchSave'
});

const taskFields = {
  id: 'TaskId',
  name: 'TaskName',
  startDate: 'StartDate',
  progress: 'Progress',
  duration: 'Duration',
  dependency: 'Predecessor',
  parentID: 'parentID'
};

const editSettings = {
  allowAdding: true,
  allowEditing: true,
  allowDeleting: true
};

const load = (args) => {
  // Attach custom params to the request
  args.query = new Query().addParams('ej2Gantt', 'test');
};
</script>
```

> Your server should read the custom parameter (for example `ej2Gantt`) and apply it to the returned dataset.

## Handling HTTP error

During remote operations, handle server exceptions on the client by using the `actionFailure` event.

```vue
<template>
  <ejs-gantt
    ref="ganttRef"
    :dataSource="dataManager"
    :taskFields="taskFields"
    :actionFailure="actionFailure"
    height="450px"
  ></ejs-gantt>
</template>

<script setup>
import { ref } from 'vue';
import { DataManager } from '@syncfusion/ej2-data';

const ganttRef = ref(null);

const dataManager = new DataManager({
  url: '/invalidUrl'
});

const taskFields = {
  id: 'TaskId',
  name: 'TaskName',
  startDate: 'StartDate',
  duration: 'Duration',
  progress: 'Progress',
  dependency: 'Predecessor',
  parentID: 'parentID'
};

const actionFailure = (args) => {
  console.error('Gantt actionFailure:', args);

  // Optional: show a red message next to the Gantt
  const gantt = ganttRef.value?.ej2Instances;
  const span = document.createElement('span');
  span.style.color = '#FF0000';
  span.textContent = `Server exception: ${args?.error?.message || args?.error}`;

  if (gantt?.element?.parentNode) {
    gantt.element.parentNode.insertBefore(span, gantt.element);
  }
};
</script>
```

## Immutable Data

Prevent re-rendering of unchanged rows during data updates — useful for large datasets with frequent partial updates.

```vue
<ejs-gantt
  :dataSource="data"
  :taskFields="taskFields"
  :enableImmutableMode="true"
  height="450px"
></ejs-gantt>
```

When `enableImmutableMode` is `true`, only rows whose data has changed are re-rendered. Row identity is based on the primary key (`taskFields.id`).

## Virtual Scrolling for Large Data

Enable virtual row rendering when rendering thousands of tasks. Only visible rows are in the DOM.

```vue
<ejs-gantt
  :dataSource="largeData"
  :taskFields="taskFields"
  :enableVirtualization="true"
  height="450px"
></ejs-gantt>

<script setup>
import { provide } from 'vue';
import { GanttComponent as EjsGantt, VirtualScroll } from '@syncfusion/ej2-vue-gantt';

provide('gantt', [VirtualScroll]);
</script>
```

> Inject the `VirtualScroll` module. `enableVirtualization` handles both row and timeline virtual rendering.

## Binding with Ajax

You can fetch data manually with `Ajax` and bind it to the Gantt as local data.

> Note: when you bind using Ajax like this, it behaves as local data—server-side CRUD actions are not automatically performed.

```vue
<template>
  <div>
    <button @click="databind">Bind Data</button>
    <br /><br />

    <ejs-gantt
      ref="ganttRef"
      :dataSource="data"
      :taskFields="taskFields"
      height="450px"
      :projectStartDate="projectStartDate"
      :projectEndDate="projectEndDate"
    ></ejs-gantt>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Ajax } from '@syncfusion/ej2-base';
import { GanttComponent as EjsGantt } from '@syncfusion/ej2-vue-gantt';

const ganttRef = ref(null);
const data = ref([]);
const taskFields = {
  id: 'TaskId',
  name: 'TaskName',
  startDate: 'StartDate',
  progress: 'Progress',
  duration: 'Duration',
  dependency: 'Predecessor',
  child: 'SubTasks'
};

const projectStartDate = new Date('02/24/2019');
const projectEndDate = new Date('07/20/2019');

const databind = () => {
  const ganttObj = ganttRef.value.ej2Instances;

  const ajax = new Ajax(
    '/api/GanttData',
    'GET'
  );

  ganttObj.showSpinner();
  ajax.send();

  ajax.onSuccess = (result) => {
    ganttObj.hideSpinner();
    data.value = JSON.parse(result).Items;
  };
};
</script>
```

## Gotchas

- **`parentID: null` for root tasks** — root-level records must have `parentID` explicitly set to `null` (not `undefined`) in self-referential data
- **Duplicate IDs cause broken hierarchy** — ensure every `TaskID` is unique across the dataset
- **Date objects, not strings** — `StartDate` and `EndDate` must be JavaScript `Date` objects, not date strings
- **`child` vs `parentID`** — never mix both in the same `taskFields` config; pick one model
