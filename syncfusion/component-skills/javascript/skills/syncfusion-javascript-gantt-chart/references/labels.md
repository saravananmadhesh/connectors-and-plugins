# Task Labels in Syncfusion Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Basic Label Configuration](#basic-label-configuration)
- [Label Settings Properties](#label-settings-properties)
- [Template String Syntax](#template-string-syntax)
- [HTML Template Labels](#html-template-labels)

## Overview

Labels display data beside or inside taskbars on the chart. Map any data source fields using template strings or HTML templates.

## Basic Label Configuration

```typescript
import { Gantt } from '@syncfusion/ej2-gantt';

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    labelSettings: {
        leftLabel: 'TaskID',                              // field name or template string
        rightLabel: 'Task Name: ${taskData.TaskName}',    // template string using taskData
        taskLabel: '${Progress}%'                         // shown inside the taskbar
    },
    projectStartDate: new Date('03/31/2019'),
    projectEndDate: new Date('04/19/2019')
});
gantt.appendTo('#Gantt');
```

---

## Label Settings Properties

| Property | Description |
|----------|-------------|
| `leftLabel` | Label displayed to the left of the taskbar |
| `rightLabel` | Label displayed to the right of the taskbar |
| `taskLabel` | Label displayed inside the taskbar |

**Value options for each label:**
- A **field name** string (e.g., `'TaskName'`) — displays that field's value
- A **template string** (e.g., `'${Progress}%'`) — uses `taskData` context variable
- An **HTML template ID** (e.g., `'#labelTemplate'`) — custom HTML template

---

## Template String Syntax

Use `${taskData.fieldName}` in template strings to access any data source field:

```typescript
labelSettings: {
    leftLabel: '${taskData.TaskName}',
    rightLabel: '${taskData.resources}',
    taskLabel: '${taskData.Progress}%'
}
```

---

## HTML Template Labels

Reference an HTML template script by ID:

```html
<script id="leftLabelTemplate" type="text/x-template">
  <div class="label-left">
    <span class="task-id">#${taskData.TaskID}</span>
  </div>
</script>
```

```typescript
labelSettings: {
    leftLabel: '#leftLabelTemplate',
    taskLabel: '#taskLabelTemplate'
}
```
