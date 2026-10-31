# Taskbar in Angular Gantt Chart

## Table of Contents
- [Taskbar Size and Row Height](#taskbar-size-and-row-height)
- [Labels (Left, Right, Task)](#labels-left-right-task)
- [Label Templates](#label-templates)
- [Conditional Formatting with queryTaskbarInfo](#conditional-formatting-with-querytaskbarinfo)
- [Taskbar Template](#taskbar-template)
- [Parent Taskbar and Milestone](#parent-taskbar-and-milestone)
- [Tooltips](#tooltips)
- [Data Markers (Task Indicators)](#data-markers-task-indicators)
- [Gripper Icon Customization](#gripper-icon-customization)
- [Taskbar Drag and Drop](#taskbar-drag-and-drop)

---

## Taskbar Size and Row Height

Control taskbar and row dimensions:

```html
<ejs-gantt
  [taskbarHeight]="40"
  [rowHeight]="50">
</ejs-gantt>
```

`taskbarHeight` must be less than `rowHeight` to prevent overflow. Default `rowHeight` is 36px.

---

## Labels (Left, Right, Task)

Use `labelSettings` to display information around taskbars:

```typescript
public labelSettings: object = {
  leftLabel: 'TaskName',       // Text left of taskbar (e.g., task name)
  rightLabel: 'resources',     // Text right of taskbar (e.g., assigned resources)
  taskLabel: '${Progress}%'    // Text overlaid on taskbar (e.g., progress %)
};
```

```html
<ejs-gantt [labelSettings]="labelSettings"></ejs-gantt>
```

- `leftLabel` / `rightLabel`: Always visible regardless of taskbar width
- `taskLabel`: May clip for short tasks

Use template string syntax `'${fieldName}'` to reference data fields.

---

## Label Templates

Use label templates when you need richer content than plain text labels. Templates let you display task metadata, formatted values, icons, or multiple data points inside `leftLabel`, `rightLabel`, or `taskLabel`.

- `leftLabel`: Best for identifiers or supporting details shown before the taskbar
- `rightLabel`: Best for status or summary values shown after the taskbar
- `taskLabel`: Best for content rendered on top of the taskbar

Use template syntax with `ng-template` and reference it from `labelSettings`.

```typescript
@Component({
  template: `
    <ejs-gantt [labelSettings]="labelSettings">
      <ng-template #leftLabelTemplate let-data>
        <span class="priority-high" *ngIf="data.Priority === 'High'">🔴</span>
        <span class="priority-medium" *ngIf="data.Priority === 'Medium'">🟡</span>
        <span class="priority-low" *ngIf="data.Priority === 'Low'">🟢</span>
        {{ data.TaskName }}
      </ng-template>

      <ng-template #rightLabelTemplate let-data>
        <span class="progress-text">{{ data.Progress }}%</span>
        <span class="duration-text" *ngIf="data.Duration">{{ data.Duration }} days</span>
      </ng-template>

      <ng-template #taskLabelTemplate let-data>
        <strong>{{ data.TaskName }}</strong>
        <small>{{ data.StartDate | date:'MMM dd' }} - {{ data.EndDate | date:'MMM dd' }}</small>
      </ng-template>
    </ejs-gantt>
  `
})
```

```typescript
public labelSettings: object = {
  leftLabel: '#leftLabelTemplate',
  rightLabel: '#rightLabelTemplate',
  taskLabel: '#taskLabelTemplate'
};
```

For text-based labels, you can also use template literals such as `${Progress}%` and ensure your `taskFields` map the correct data properties.

---

## Conditional Formatting with queryTaskbarInfo

Dynamically style taskbars based on task data:

```typescript
public queryTaskbarInfo(args: any): void {
  // Color by progress
  if (args.data.Progress < 30) {
    args.taskbarBgColor = '#FF6B6B';      // Red for low progress
    args.progressBarBgColor = '#FF4444';
  } else if (args.data.Progress < 70) {
    args.taskbarBgColor = '#FFA500';      // Orange for medium progress
    args.progressBarBgColor = '#FF8C00';
  } else {
    args.taskbarBgColor = '#4CAF50';      // Green for high progress
    args.progressBarBgColor = '#388E3C';
  }

  // Custom CSS class
  if (args.data.isCritical) {
    args.taskbarClass = 'critical-task';
  }
}
```

```html
<ejs-gantt (queryTaskbarInfo)="queryTaskbarInfo($event)"></ejs-gantt>
```

Available args properties: `taskbarBgColor`, `progressBarBgColor`, `taskbarClass`, `leftLabelStyle`, `rightLabelStyle`, `connectorLineColor`.

---

## Taskbar Template

Replace the default taskbar rendering with a custom Angular template:

```typescript
@Component({
  template: `
    <ejs-gantt>
      <ng-template #taskbarTemplate let-data>
        <div class="custom-taskbar" [style.background]="getColor(data)">
          <span class="task-icon">{{ data.TaskName[0] }}</span>
          <div class="progress" [style.width.%]="data.Progress"></div>
        </div>
      </ng-template>
    </ejs-gantt>
  `
})
```

```typescript
public taskbarTemplate: string = '#taskbarTemplate';
```

Use `parentTaskbarTemplate` for parent tasks and `milestoneTemplate` for milestones separately.

---

## Parent Taskbar and Milestone

Customize the parent task rollup bar:
```html
<ejs-gantt parentTaskbarBackground="#2196F3" parentProgressBarBackground="#1565C0">
</ejs-gantt>
```

Milestones are tasks with `Duration: 0`. Style them:
```html
<ejs-gantt milestoneBackground="#FF5722"></ejs-gantt>
```

---

## Tooltips

Configure what appears in taskbar hover tooltips:

```typescript
public tooltipSettings: object = {
  showTooltip: true,
  taskbar: '#tooltipTemplate'  // Custom template for taskbar tooltip
};
```

```typescript
@Component({
  template: `
    <ejs-gantt [tooltipSettings]="tooltipSettings">
      <ng-template #tooltipTemplate let-data>
        <div class="tooltip-content">
          <b>{{ data.TaskName }}</b><br>
          Start: {{ data.StartDate | date }}<br>
          End: {{ data.EndDate | date }}<br>
          Progress: {{ data.Progress }}%
        </div>
      </ng-template>
    </ejs-gantt>
  `
})
```

Set `showTooltip: false` to disable tooltips globally.

---

## Data Markers (Task Indicators)

Display custom icons within tasks using indicators:

```typescript
public taskFields: object = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  duration: 'Duration',
  indicators: 'Indicators'   // Maps indicator array from data source
};

public data: object[] = [
  {
    TaskID: 1, TaskName: 'Milestone',
    StartDate: new Date('04/05/2024'), Duration: 0,
    Indicators: [
      {
        date: new Date('04/05/2024'),
        name: 'Review',
        title: 'Product Review Meeting',
        iconClass: 'e-meeting-icon'
      }
    ]
  }
];
```

Each indicator appears as an icon at the specified date with a tooltip showing the `title`. Use custom CSS classes via `iconClass` to display any icon.

---

## Gripper Icon Customization

Override CSS to change resize handles:

```css
/* Left resize handle */
.e-gantt-left-resize-gripper {
  content: '◀';
  font-size: 14px;
}

/* Right resize handle */
.e-gantt-right-resize-gripper {
  content: '▶';
  font-size: 14px;
}

/* Progress resize handle */
.e-gantt-progress-resize-gripper {
  background: #FF5722;
}
```

---

## Taskbar Drag and Drop

Enable moving taskbars between rows (reassigning parent tasks):

```html
<ejs-gantt [allowTaskbarDragAndDrop]="true"></ejs-gantt>
```

This allows dragging a taskbar vertically to reassign it to a different parent or position in the hierarchy, separate from horizontal date adjustment via `editSettings.allowTaskbarEditing`.
