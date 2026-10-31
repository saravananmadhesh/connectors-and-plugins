# Critical Path

Highlight tasks that directly impact the project end date.

## Table of Contents
- [Overview](#overview)
- [Module Injection](#module-injection)
- [Enabling Critical Path](#enabling-critical-path)
- [Toolbar Button](#toolbar-button)
- [Customizing Critical Taskbars](#customizing-critical-taskbars)
- [Slack Time](#slack-time)

## Overview

The **critical path** is the sequence of tasks that determines the earliest possible project completion date. Any delay to a critical task delays the entire project. Non-critical tasks have **slack** — extra time they can slip without affecting the end date.

The `CriticalPath` module must be injected to use this feature.

## Module Injection

```js
// Composition API (Vue 3)
import { provide } from 'vue';
import { CriticalPath, Toolbar } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [CriticalPath, Toolbar]);

// Options API
provide: {
  gantt: [CriticalPath, Toolbar]
}
```

## Enabling Critical Path

Set `enableCriticalPath` to `true` on the component:

```vue
<ejs-gantt
  :enableCriticalPath="true"
  :dataSource="data"
  :taskFields="taskFields"
  height="450px"
></ejs-gantt>

<script setup>
import { provide } from 'vue';
import { GanttComponent as EjsGantt, CriticalPath, Edit, Toolbar } from '@syncfusion/ej2-vue-gantt';

const taskFields = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  duration: 'Duration',
  progress: 'Progress',
  child: 'subtasks'
};

const editSettings = {
  allowAdding: true,
  allowEditing: true,
  allowDeleting: true,
  allowTaskbarEditing: true
};

provide('gantt', [CriticalPath, Edit, Toolbar]);
</script>
```

Critical tasks are rendered with a distinct red/highlighted taskbar by default.

## Toolbar Button

Add `'CriticalPath'` to the toolbar to allow users to toggle the critical path view on/off:

```vue
<ejs-gantt :toolbar="toolbar" :enableCriticalPath="true" ...></ejs-gantt>

<script setup>
const toolbar = ['CriticalPath'];
</script>
```

The toolbar button acts as a toggle — clicking it enables or disables the critical path highlight at runtime.

## Customizing Critical Taskbars

Use the `queryTaskbarInfo` event to apply custom colors to critical tasks:

```vue
<ejs-gantt
  :enableCriticalPath="true"
  :queryTaskbarInfo="onQueryTaskbarInfo"
  ...
></ejs-gantt>

<script setup>
function onQueryTaskbarInfo(args) {
  // args.data.isCritical — true if task is on critical path
  // args.data.slack       — slack duration string (e.g. '0 day', '2 days')
  if ((args.data.isCritical || args.data.slack === '0 day') && !args.data.hasChildRecords) {
    args.taskbarBgColor     = 'rgb(242, 210, 189)';
    args.progressBarBgColor = 'rgb(201, 169, 166)';
  }
}
</script>
```

### `queryTaskbarInfo` args relevant to critical path

| Property | Type | Description |
|---|---|---|
| `data.isCritical` | boolean | `true` if task lies on the critical path |
| `data.slack` | string | Slack duration (e.g. `'0 day'`, `'3 days'`) |
| `data.hasChildRecords` | boolean | `true` for parent/summary tasks |
| `args.taskbarBgColor` | string | Set to override taskbar background color |
| `args.progressBarBgColor` | string | Set to override progress fill color |
| `args.taskbarBorderColor` | string | Set to override taskbar border color |

## Slack Time

Slack (float) is the amount of time a task can slip before it becomes critical. It is available on the row data:

```js
function onQueryTaskbarInfo(args) {
  const slackDays = parseInt(args.data.slack);  // parse from '2 days' → 2
  if (slackDays === 0) {
    // zero slack = critical
    args.taskbarBgColor = '#e74c3c';
  } else if (slackDays <= 2) {
    // near-critical
    args.taskbarBgColor = '#f39c12';
  }
}
```
