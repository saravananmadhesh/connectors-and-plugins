# Getting Started

Setup and first implementation of the Syncfusion Vue Gantt Chart component.

## Table of Contents
- [Installation](#installation)
- [CSS Import Order](#adding-css-reference)
- [Composition API (Vue 3 — Recommended)](#composition-api-vue-3--recommended)
- [Options API (Vue 2 / Vue 3)](#options-api-vue-2--vue-3)
- [Module Injection](#module-injection)
- [Vite + Vue 3 Setup (Full Steps)](#vite--vue-3-setup-full-steps)
- [Vue 2 Setup (Vue CLI)](#vue-2-setup-vue-cli)
- [Quasar Framework](#quasar-framework)
- [Error Handling](#error-handling)

## Installation

```bash
npm install @syncfusion/ej2-vue-gantt --save
```

## Adding CSS Reference

Install the **Tailwind 3** theme package using the following command:

```bash
npm install @syncfusion/ej2-tailwind3-theme --save
```

Then add the following CSS reference to the **src/App.vue** file:

```vue
<style>
    @import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/gantt/index.css";
</style>
```

For other themes, replace `ej2-tailwind3-theme` with your chosen theme package: `ej2-material-theme`, `ej2-material3-theme`, `ej2-bootstrap5-theme`, `ej2-fluent-theme`, `ej2-fabric-theme`, or `ej2-highcontrast-theme`.

## Composition API (Vue 3 — Recommended)

```vue
<template>
  <ejs-gantt
    id="gantt"
    :dataSource="data"
    :taskFields="taskFields"
    height="450px"
  >
    <e-columns>
      <e-column field="TaskID" headerText="Task ID" width="70"></e-column>
      <e-column field="TaskName" headerText="Task Name" width="200"></e-column>
      <e-column field="StartDate" headerText="Start Date" width="100"></e-column>
      <e-column field="Duration" headerText="Duration" width="80"></e-column>
    </e-columns>
  </ejs-gantt>
</template>

<script setup>
import {
  GanttComponent as EjsGantt,
  ColumnsDirective as EColumns,
  ColumnDirective as EColumn
} from '@syncfusion/ej2-vue-gantt';

const data = [
  { TaskID: 1, TaskName: 'Planning', StartDate: new Date('04/02/2019'), EndDate: new Date('04/06/2019'), ParentID: null },
  { TaskID: 2, TaskName: 'Identify location', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50, ParentID: 1 },
  { TaskID: 3, TaskName: 'Soil test', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50, ParentID: 1 },
  { TaskID: 4, TaskName: 'Estimation', StartDate: new Date('04/02/2019'), EndDate: new Date('04/08/2019'), ParentID: null },
  { TaskID: 5, TaskName: 'Floor plan', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50, ParentID: 4 },
];

const taskFields = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  endDate: 'EndDate',
  duration: 'Duration',
  progress: 'Progress',
  parentID: 'ParentID'    // use 'child' instead for hierarchical data
};
</script>
```

## Options API (Vue 2 / Vue 3)

```vue
<template>
  <div>
    <ejs-gantt
      id="gantt"
      :dataSource="data"
      :taskFields="taskFields"
      height="450px"
    ></ejs-gantt>
  </div>
</template>

<script>
import { GanttComponent } from '@syncfusion/ej2-vue-gantt';

export default {
  name: 'App',
  components: { 'ejs-gantt': GanttComponent },
  data() {
    return {
      data: [
        { TaskID: 1, TaskName: 'Planning', StartDate: new Date('04/02/2019'), EndDate: new Date('04/06/2019'), ParentID: null },
        { TaskID: 2, TaskName: 'Identify location', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50, ParentID: 1 },
      ],
      taskFields: {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        parentID: 'ParentID'
      }
    };
  }
};
</script>
```

## Module Injection

Features require explicit module injection. Without it the feature silently does nothing.

```js
// Composition API (Vue 3)
import { provide } from 'vue';
import { Edit, Filter, Sort, Toolbar, Selection, DayMarkers, ExcelExport, PdfExport } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [Edit, Filter, Sort, Toolbar, Selection, DayMarkers]);

// Options API
provide: {
  gantt: [Edit, Filter, Sort, Toolbar, Selection, DayMarkers]
}
```

| Module | Enables |
|---|---|
| `Edit` | Cell / dialog / taskbar editing, add, delete |
| `Filter` | Column filter menus, toolbar search |
| `Sort` | Column header sorting |
| `Toolbar` | Toolbar rendering |
| `Selection` | Row / cell selection |
| `DayMarkers` | Event markers and holidays |
| `ExcelExport` | Excel export |
| `PdfExport` | PDF export |
| `VirtualScroll` | Virtual row / timeline rendering |
| `CriticalPath` | Critical path highlighting |
| `UndoRedo` | Undo / redo actions |
| `ColumnMenu` | Column header context menu |
| `ContextMenu` | Right-click context menu |
| `RowDD` | Row drag and drop |

## Vite + Vue 3 Setup (Full Steps)

```bash
npm create vite@latest my-gantt-app
# Select: Vue → JavaScript
cd my-gantt-app
npm install
npm install @syncfusion/ej2-vue-gantt --save
npm run dev
```

## Vue 2 Setup (Vue CLI)

```bash
npm install -g @vue/cli
vue create my-gantt-app
cd my-gantt-app
npm install @syncfusion/ej2-vue-gantt --save
npm run serve
```

## Quasar Framework

Wrap the component in `<client-only>` to avoid SSR issues, and import CSS in `quasar.config.js` extras or a boot file.

```js
// boot/syncfusion.js
import '@syncfusion/ej2-base/styles/material.css';
// ... other imports
```

## Error Handling

Listen to the `actionFailure` event to catch configuration mistakes at runtime (missing `isPrimaryKey`, invalid date format, wrong `taskFields` mapping, etc.):

```vue
<ejs-gantt :actionFailure="onActionFailure" ...></ejs-gantt>

<script setup>
const onActionFailure = (args) => {
  console.error('Gantt error:', args.error);
};
</script>
```

Common errors caught by `actionFailure`:
- Invalid duration value (non-numeric)
- Invalid predecessor string format
- `isPrimaryKey` not set on any column
- Missing `hasChildMapping` for load-on-demand
- Invalid `day` value in `eventMarkers`
