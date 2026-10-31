# Data Binding in Angular Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Local Data — Self-Referential Structure (Default)](#local-data--self-referential-structure-default)
- [Local Data — Hierarchical Structure](#local-data--hierarchical-structure)
- [Remote Data Binding](#remote-data-binding)
- [Load-on-Demand (Virtual Loading)](#load-on-demand-virtual-loading)
- [Observable Data Binding](#observable-data-binding)
- [Handling CRUD with Remote Data](#handling-crud-with-remote-data)
- [Common Gotchas](#common-gotchas)

---

## Overview

The `dataSource` property accepts:
- A JavaScript object array (local data)
- A `DataManager` instance (remote or local with query support)

Two data structures are supported:
- **Self-referential** *(default)* — flat array where each task has an `id` and a `parentID` pointing to its parent task
- **Hierarchical** — parent tasks contain nested child arrays (use only when the user explicitly asks for hierarchical / nested data)

> **Default rule:** Always use self-referential data binding unless the user specifically requests hierarchical data. Self-referential maps directly to database tables and is the most common real-world pattern.

---

## Local Data — Self-Referential Structure (Default)

Self-referential data is a **flat array** where parent-child relationships are expressed using two key fields:

| `taskFields` property | Maps to | Purpose |
|-----------------------|---------|---------|
| `id` | `'TaskID'` | Unique identifier for each task (idMapping) |
| `parentID` | `'ParentID'` | References the parent task's ID (parentIdMapping). Root tasks have `null` or `0` |

```typescript
import { Component } from '@angular/core';
import { GanttModule } from '@syncfusion/ej2-angular-gantt';

@Component({
  imports: [GanttModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-gantt
      [dataSource]="data"
      [taskFields]="taskFields"
      [height]="'450px'">
    </ejs-gantt>
  `
})
export class AppComponent {
  public data: object[] = [
    // Root tasks — ParentID is null (no parent)
    { TaskID: 1, TaskName: 'Project Initiation',   StartDate: new Date('04/02/2024'), Duration: 5,  Progress: 0,  ParentID: null },

    // Children of Task 1 — ParentID: 1
    { TaskID: 2, TaskName: 'Identify Site location', StartDate: new Date('04/02/2024'), Duration: 4, Progress: 50, ParentID: 1 },
    { TaskID: 3, TaskName: 'Perform Soil test',      StartDate: new Date('04/02/2024'), Duration: 4, Progress: 50, ParentID: 1 },
    { TaskID: 4, TaskName: 'Soil test approval',     StartDate: new Date('04/04/2024'), Duration: 3, Progress: 30, ParentID: 1 },

    // Root task 2
    { TaskID: 5, TaskName: 'Project Estimation',   StartDate: new Date('04/08/2024'), Duration: 6,  Progress: 0,  ParentID: null },

    // Children of Task 5 — ParentID: 5
    { TaskID: 6, TaskName: 'Develop floor plan',   StartDate: new Date('04/08/2024'), Duration: 3,  Progress: 50, ParentID: 5 },
    { TaskID: 7, TaskName: 'List material',        StartDate: new Date('04/08/2024'), Duration: 3,  Progress: 50, ParentID: 5 },
  ];

  public taskFields: object = {
    id: 'TaskID',         // idMapping — unique identifier field
    name: 'TaskName',
    startDate: 'StartDate',
    duration: 'Duration',
    progress: 'Progress',
    parentID: 'ParentID'  // parentIdMapping — parent reference field (null = root)
  };
}
```

**Key rules for self-referential data:**
- Root tasks must have `ParentID: null` (or `0` — both are treated as root)
- Every `ParentID` value must correspond to an existing `TaskID` in the same array
- There is no nesting in the data — the Gantt builds the tree from the ID relationships
- Best for: database tables, REST APIs returning flat records, any backend with foreign key relationships

---

## Local Data — Hierarchical Structure

> **Use this only when the user explicitly asks for hierarchical, nested, or tree-structured data.**

Hierarchical data nests child tasks inside parent tasks using the field mapped to `taskFields.child`:

```typescript
import { Component } from '@angular/core';
import { GanttModule } from '@syncfusion/ej2-angular-gantt';

@Component({
  imports: [GanttModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-gantt
      [dataSource]="data"
      [taskFields]="taskFields"
      [height]="'450px'">
    </ejs-gantt>
  `
})
export class AppComponent {
  public data: object[] = [
    {
      TaskID: 1,
      TaskName: 'Project Initiation',
      StartDate: new Date('04/02/2024'),
      EndDate: new Date('04/21/2024'),
      subtasks: [
        { TaskID: 2, TaskName: 'Identify Site location', StartDate: new Date('04/02/2024'), Duration: 4, Progress: 50 },
        { TaskID: 3, TaskName: 'Perform Soil test',      StartDate: new Date('04/02/2024'), Duration: 4, Progress: 50 },
        { TaskID: 4, TaskName: 'Soil test approval',     StartDate: new Date('04/04/2024'), Duration: 3, Progress: 30 }
      ]
    },
    {
      TaskID: 5,
      TaskName: 'Project Estimation',
      StartDate: new Date('04/08/2024'),
      EndDate: new Date('04/21/2024'),
      subtasks: [
        { TaskID: 6, TaskName: 'Develop floor plan', StartDate: new Date('04/08/2024'), Duration: 3, Progress: 50 },
        { TaskID: 7, TaskName: 'List material',      StartDate: new Date('04/08/2024'), Duration: 3, Progress: 50 }
      ]
    }
  ];

  public taskFields: object = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    child: 'subtasks'     // Maps the nested children array field name
  };
}
```

**Key rules for hierarchical data:**
- Child tasks are nested inside the parent's `subtasks` array (or whichever field `child` maps to)
- `parentID` is NOT used — the nesting itself defines the relationship
- Best for: JSON APIs that return pre-nested structures, static project data defined inline

---

## Choosing Between Self-Referential and Hierarchical

| Scenario | Use |
|----------|-----|
| Default / no preference stated | **Self-referential** (`id` + `parentID`) |
| User says "flat array", "database", "foreign key" | **Self-referential** |
| User says "hierarchical", "nested", "tree structure", "subtasks array" | **Hierarchical** (`id` + `child`) |
| Remote REST API / OData | **Self-referential** (most backends return flat records) |
| Static inline data with nesting | Either works — prefer self-referential |

---

## Remote Data Binding

Use a `DataManager` with the appropriate adaptor for your backend:

```typescript
import { DataManager, ODataV4Adaptor, WebApiAdaptor } from '@syncfusion/ej2-data';

// OData V4 — use your own controlled OData endpoint
public dataManager: DataManager = new DataManager({
  url: '/api/odata/tasks',   // ✅ Use an internal, authenticated endpoint — never a public third-party URL
  adaptor: new ODataV4Adaptor()
});

// Web API / REST
public dataManager: DataManager = new DataManager({
  url: 'api/tasks',
  adaptor: new WebApiAdaptor()
  // crossDomain: true  — avoid unless required; enforce CORS on the server side instead
});
```

```html
<ejs-gantt [dataSource]="dataManager" [taskFields]="taskFields"></ejs-gantt>
```

**Supported adaptors:**
- `ODataAdaptor` — OData v3
- `ODataV4Adaptor` — OData v4
- `WebApiAdaptor` — REST API / ASP.NET Web API
- `UrlAdaptor` — Custom server with Syncfusion data format
- `JsonAdaptor` — Local JSON with DataManager features

---

## Load-on-Demand (Virtual Loading)

For large hierarchical datasets, load child tasks only when a parent is expanded. Requires `hasChildMapping`:

```typescript
public taskFields: object = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  duration: 'Duration',
  hasChildMapping: 'isParent',  // Boolean field: true if task has children
  parentID: 'ParentID'
};
```

```html
<ejs-gantt
  [dataSource]="dataManager"
  [taskFields]="taskFields"
  [loadChildOnDemand]="true">
</ejs-gantt>
```

**Important:** Without `hasChildMapping`, load-on-demand triggers `actionFailure`. Use `parentID` (not `child`) for self-referential remote data.

---

## Observable Data Binding

Bind to a RxJS Observable when data updates dynamically:

```typescript
import { Observable, of } from 'rxjs';

public data$: Observable<object[]> = of([
  { TaskID: 1, TaskName: 'Task 1', StartDate: new Date('04/02/2024'), Duration: 4 }
]);
```

```html
<ejs-gantt [dataSource]="data$ | async" [taskFields]="taskFields"></ejs-gantt>
```

Use this pattern when integrating with NgRx store or other reactive state management.

---

## Handling CRUD with Remote Data

For remote CRUD operations, configure `dataSource` with a `DataManager` that has a `crudUrl` or individual action URLs:

```typescript
public dataManager: DataManager = new DataManager({
  url: 'api/tasks',
  crudUrl: 'api/tasks/crud',
  adaptor: new UrlAdaptor()
});
```

Or use separate URLs per action:

```typescript
public dataManager: DataManager = new DataManager({
  url: 'api/tasks',
  insertUrl: 'api/tasks/insert',
  updateUrl: 'api/tasks/update',
  removeUrl: 'api/tasks/delete',
  adaptor: new UrlAdaptor()
});
```

Inject `EditService` and enable `editSettings` to activate CRUD. The Gantt sends batch requests or individual requests based on the adaptor.

For batch save, use `batchUrl`:
```typescript
public dataManager: DataManager = new DataManager({
  url: 'api/tasks',
  batchUrl: 'api/tasks/batchsave',
  adaptor: new UrlAdaptor()
});
```

---

## Common Gotchas

| Issue | Cause | Fix |
|-------|-------|-----|
| Tasks not rendering | Missing `taskFields.id` or `taskFields.name` | Ensure both are mapped |
| Hierarchy not showing | Wrong field name in `child` or `parentID` | Double-check field names match data |
| Remote data not loading | Wrong adaptor type | Match adaptor to your backend protocol |
| CRUD fails | Missing `isPrimaryKey` column | Set `columns.isPrimaryKey: true` on the ID column |
| Load-on-demand error | Missing `hasChildMapping` | Add `hasChildMapping` to `taskFields` |
| Parent dates wrong | Using manual mode | Parent dates auto-computed only in `taskMode: 'Auto'` |
