# Taskbar Customization in Syncfusion Gantt Chart

## Table of Contents
- [Taskbar Template](#taskbar-template)
- [Taskbar Height and Row Height](#taskbar-height-and-row-height)
- [Conditional Formatting via queryTaskbarInfo](#conditional-formatting-via-querytaskbarinfo)
- [Connector Lines](#connector-lines)
- [Tooltips](#tooltips)

## Taskbar Template

Replace the default taskbar with fully custom HTML using template IDs:

```typescript
import { Gantt } from '@syncfusion/ej2-gantt';

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    rowHeight: 60,
    taskbarTemplate: '#TaskbarTemplate',            // for child taskbars
    parentTaskbarTemplate: '#ParentTaskbarTemplate', // for parent/summary taskbars
    milestoneTemplate: '#MilestoneTemplate'         // for milestone tasks (duration=0)
});
gantt.appendTo('#Gantt');
```

Template HTML elements reference `taskData` context:
```html
<script id="TaskbarTemplate" type="text/x-template">
  <div class="custom-taskbar" style="background:${taskData.color}; width:100%; height:100%">
    <span>${taskData.TaskName}</span>
  </div>
</script>
```

---

## Taskbar Height and Row Height

```typescript
let gantt: Gantt = new Gantt({
    taskbarHeight: 50,  // height of taskbar in pixels (must be < rowHeight)
    rowHeight: 60       // height of each grid/chart row in pixels
});
```

> `taskbarHeight` must be smaller than `rowHeight`. Both accept pixel values only.

---

## Conditional Formatting via queryTaskbarInfo

Use `queryTaskbarInfo` to dynamically change taskbar styles based on data:

```typescript
let gantt: Gantt = new Gantt({
    queryTaskbarInfo: (args) => {
        // Customize progress bar color
        if (args.data.Progress < 30) {
            args.progressBarBgColor = 'red';
        } else if (args.data.Progress < 70) {
            args.progressBarBgColor = 'yellow';
        } else {
            args.progressBarBgColor = 'lightgreen';
        }

        // Customize taskbar color
        args.taskbarBgColor = args.data.Priority === 'High' ? '#FF6B6B' : '#4ECDC4';
        args.taskbarBorderColor = args.data.Priority === 'High' ? '#C00' : '#2C8A80';

        // Customize label
        args.rightLabel = args.data.TaskName;

        // Customize connector line (for dependency tasks)
        args.connectorLineBackground = '#0078D4';
    }
});
```

**`queryTaskbarInfo` event `args` properties:**
| Property | Description |
|----------|-------------|
| `data` | The task record data |
| `progressBarBgColor` | CSS color for the progress bar |
| `taskbarBgColor` | CSS background color for the taskbar |
| `taskbarBorderColor` | CSS border color for the taskbar |
| `rightLabel` | Dynamic right label text |
| `leftLabel` | Dynamic left label text |
| `taskLabel` | Dynamic task label text |
| `connectorLineBackground` | CSS color for outgoing connector lines |

---

## Connector Lines

Customize the dependency connector lines globally:

```typescript
let gantt: Gantt = new Gantt({
    connectorLineBackground: 'red',   // connector line color
    connectorLineWidth: 3             // connector line width in pixels
});
```

---

## Tooltips

Enable and customize tooltips for taskbars, connector lines, baselines, and event markers:

```typescript
import { Gantt, DayMarkers } from '@syncfusion/ej2-gantt';

Gantt.Inject(DayMarkers);

let gantt: Gantt = new Gantt({
    tooltipSettings: {
        showTooltip: true,              // enable tooltips globally (default: true)
        taskbar: '#taskbarTooltip',     // custom taskbar tooltip template ID
        connectorLine: '#depTooltip',   // custom connector line tooltip template ID
        editing: '#editingTooltip',     // custom taskbar editing tooltip template ID
        baseline: '#baselineTooltip'    // custom baseline tooltip template ID
    }
});
```

```html
<script id="taskbarTooltip" type="text/x-template">
  <div class="tooltip-content">
    <b>${TaskName}</b><br/>
    Start: ${StartDate}<br/>
    End: ${EndDate}<br/>
    Progress: ${Progress}%
  </div>
</script>
```
