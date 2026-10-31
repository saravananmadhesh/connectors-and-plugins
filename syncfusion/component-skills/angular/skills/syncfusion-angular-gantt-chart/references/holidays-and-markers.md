# Holidays and Event Markers in Syncfusion Angular Gantt Chart

## Table of Contents
- [DayMarkersService requirement](#daymarkersservice-requirement)
- [Holidays](#holidays)
  - [Holiday effects on task scheduling](#holiday-effects-on-task-scheduling)
  - [Holiday configuration properties](#holiday-configuration-properties)
  - [Single and multi-day holidays](#single-and-multi-day-holidays)
  - [Custom holiday styling](#custom-holiday-styling)
- [Event Markers](#event-markers)
  - [Event marker properties](#event-marker-properties)
  - [Multiple event markers](#multiple-event-markers)
  - [Vertical offset with top](#vertical-offset-with-top)

---

## DayMarkersService requirement

Both holidays and event markers require `DayMarkersService` to be injected in the component's `providers`:

```typescript
import { GanttModule, DayMarkersService } from '@syncfusion/ej2-angular-gantt';

@Component({
  imports: [GanttModule],
  providers: [DayMarkersService],
  standalone: true
})
export class AppComponent { }
```

Without this service, holidays will not render in the timeline, and event markers will not appear.

---

## Holidays

The `holidays` property defines non-working days that affect task duration and scheduling. Holidays take precedence over `workWeek` and `includeWeekend` settings.

### Holiday effects on task scheduling

| Effect | Description |
|---|---|
| Duration adjustments | Task durations exclude holidays; end dates extend past holiday periods |
| Dependency management | Successor tasks shift automatically to respect FS/SS/FF/SF relationships |
| Critical path | Holidays impact slack calculations (`enableCriticalPath`) — delayed tasks may become critical |
| Resource allocation | Holidays pause resource availability; task progress halts during these periods |
| Timeline rendering | Holidays appear as highlighted background regions with descriptive labels |

### Holiday configuration properties

| Property | Type | Description |
|---|---|---|
| `from` | Date | Start date of the holiday (required) |
| `to` | Date | End date for multi-day holidays (optional for single-day) |
| `label` | string | Display label shown in timeline (e.g., "Christmas Day") |
| `cssClass` | string | CSS class for custom styling of this holiday region |

### Single and multi-day holidays

```typescript
@Component({
  template: `
    <ejs-gantt
      [dataSource]="data"
      [taskFields]="taskSettings"
      [holidays]="holidays">
    </ejs-gantt>
  `
})
export class AppComponent {
  public holidays = [
    // Single-day holiday
    {
      from: new Date('2024-12-25'),
      label: 'Christmas Day',
      cssClass: 'national-holiday'
    },
    // Multi-day holiday
    {
      from: new Date('2024-12-25'),
      to: new Date('2024-12-26'),
      label: 'Christmas Break',
      cssClass: 'national-holiday'
    },
    // Company closure
    {
      from: new Date('2024-12-31'),
      to: new Date('2025-01-01'),
      label: 'New Year Break',
      cssClass: 'company-holiday'
    }
  ];
}
```

### Custom holiday styling

Apply custom CSS for different holiday types using the `cssClass` property:

```css
/* Global or component styles */
.e-gantt .national-holiday {
  background-color: rgba(255, 100, 100, 0.2);
  border-left: 2px solid #e74c3c;
}

.e-gantt .company-holiday {
  background-color: rgba(255, 165, 0, 0.2);
  border-left: 2px solid #f39c12;
}
```

---

## Event Markers

Event markers display vertical lines across the entire Gantt chart at specific dates. They represent project-wide milestones, deadlines, or critical dates — visible across all rows and during scroll/zoom.

Unlike data markers (indicators tied to individual task rows), event markers span the full chart height.

### Event marker properties

| Property | Type | Description |
|---|---|---|
| `day` | Date \| string | The date where the marker is positioned (required) |
| `label` | string | Descriptive label displayed at the top of the marker line |
| `cssClass` | string | CSS class for custom styling of the marker line |
| `top` | number | Vertical offset in pixels from the chart content top (for staggering overlapping markers) |

### Multiple event markers

```typescript
@Component({
  template: `
    <ejs-gantt
      [dataSource]="data"
      [taskFields]="taskSettings"
      [eventMarkers]="eventMarkers">
    </ejs-gantt>
  `
})
export class AppComponent {
  public eventMarkers = [
    {
      day: new Date('2024-04-15'),
      label: 'Phase 1 Review',
      cssClass: 'review-marker'
    },
    {
      day: new Date('2024-05-01'),
      label: 'Go Live',
      cssClass: 'go-live-marker'
    },
    {
      day: new Date('2024-06-01'),
      label: 'Project Deadline',
      cssClass: 'deadline-marker'
    }
  ];
}
```

### Vertical offset with top

When multiple markers share the same date, use `top` to stagger them vertically:

```typescript
public eventMarkers = [
  {
    day: new Date('2024-04-15'),
    label: 'Stakeholder Review',
    cssClass: 'review-marker',
    top: 0     // At chart top
  },
  {
    day: new Date('2024-04-15'),
    label: 'Budget Freeze',
    cssClass: 'budget-marker',
    top: 20    // 20px below first marker
  }
];
```

### Event marker CSS customization

```css
.e-gantt .review-marker .e-span-label {
  color: #2980b9;
  font-weight: bold;
}

.e-gantt .review-marker .e-gantt-event-marker {
  border-left: 2px dashed #2980b9;
}

.e-gantt .deadline-marker .e-gantt-event-marker {
  border-left: 2px solid #e74c3c;
}

.e-gantt .deadline-marker .e-span-label {
  color: #e74c3c;
}
```

---

## Full example: holidays + event markers

```typescript
import { Component } from '@angular/core';
import { GanttModule, DayMarkersService } from '@syncfusion/ej2-angular-gantt';

@Component({
  imports: [GanttModule],
  providers: [DayMarkersService],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-gantt
      [dataSource]="data"
      [taskFields]="taskSettings"
      [holidays]="holidays"
      [eventMarkers]="eventMarkers"
      height="450px">
    </ejs-gantt>
  `
})
export class AppComponent {
  public taskSettings = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    duration: 'Duration',
    progress: 'Progress',
    child: 'subtasks'
  };

  public holidays = [
    { from: new Date('2024-04-05'), label: 'Company Off Day', cssClass: 'company-holiday' },
    { from: new Date('2024-04-12'), to: new Date('2024-04-14'), label: 'Easter Break', cssClass: 'national-holiday' }
  ];

  public eventMarkers = [
    { day: new Date('2024-04-08'), label: 'Sprint Review', cssClass: 'review-marker' },
    { day: new Date('2024-04-22'), label: 'Release Deadline' }
  ];

  public data = [
    {
      TaskID: 1, TaskName: 'Planning Phase',
      StartDate: new Date('2024-04-01'), EndDate: new Date('2024-04-20'),
      subtasks: [
        { TaskID: 2, TaskName: 'Requirements', StartDate: new Date('2024-04-01'), Duration: 5, Progress: 100 },
        { TaskID: 3, TaskName: 'Design', StartDate: new Date('2024-04-08'), Duration: 5, Progress: 60 }
      ]
    }
  ];
}
```
