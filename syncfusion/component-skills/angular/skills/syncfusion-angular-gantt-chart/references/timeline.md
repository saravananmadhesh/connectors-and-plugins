# Timeline in Angular Gantt Chart

## Table of Contents
- [Timeline Settings Overview](#timeline-settings-overview)
- [Timeline View Modes](#timeline-view-modes)
- [Top and Bottom Tier Configuration](#top-and-bottom-tier-configuration)
- [Formatter Function Parameters](#formatter-function-parameters)
- [Timeline Cell Width](#timeline-cell-width)
- [Custom Date Formats](#custom-date-formats)
- [Project Date Range](#project-date-range)
- [Timeline View Dates](#timeline-view-dates)
- [Week Start Day](#week-start-day)
- [Automatic Timescale Update](#automatic-timescale-update)
- [Weekend Highlighting](#weekend-highlighting)
- [Timeline Cells Tooltip](#timeline-cells-tooltip)
- [Navigating the Timeline](#navigating-the-timeline)
- [Zooming](#zooming)
- [Infinite timeline scrolling](#infinite-timeline-scrolling)
- [Timeline Template](#timeline-template)

---

## Timeline Settings Overview

The timeline is configured via `timelineSettings`, which controls the two-tier header (top and bottom) and cell width/count:

```typescript
public timelineSettings: object = {
  topTier: {
    unit: 'Week',
    format: 'MMM dd, yyyy',
    count: 1
  },
  bottomTier: {
    unit: 'Day',
    format: 'dd',
    count: 1
  },
  timelineUnitSize: 33   // Width in pixels of each bottom tier cell
};
```

---

## Timeline View Modes

Use `timelineViewMode` as a shortcut to configure both tiers at once:

| Mode | Top Tier | Bottom Tier |
|------|----------|-------------|
| `'Hour'` | Day | Hour |
| `'Day'` | Week | Day |
| `'Week'` | Month | Week |
| `'Month'` | Year | Month |
| `'Year'` | Year | Month |
| `'Minutes'` | Hour | Minute |

```html
<ejs-gantt timelineViewMode="Week"></ejs-gantt>
```

Or configure tiers explicitly for more control (see below).

---

## Top and Bottom Tier Configuration

Each tier supports `unit`, `format`, `count`, and `formatter`:

**Supported units:** `'Hour'` | `'Day'` | `'Week'` | `'Month'` | `'Year'` | `'Minutes'`

```typescript
public timelineSettings: object = {
  topTier: {
    unit: 'Month',
    format: 'MMMM yyyy',  // "April 2024"
    count: 1
  },
  bottomTier: {
    unit: 'Week',
    format: "'Week' W",   // "Week 14"
    count: 1
  }
};
```

The `count` property groups multiple units together. For example, `unit: 'Day', count: 7` shows weeks as a single cell in the bottom tier.

---

## Custom Date Formats

Use standard date format strings:

| Token | Meaning | Example |
|-------|---------|---------|
| `MMM` | Month abbreviation | Apr |
| `MMMM` | Full month name | April |
| `MM` | Month number (padded) | 04 |
| `dd` | Day (padded) | 02 |
| `yyyy` | 4-digit year | 2024 |
| `ddd` | Day name abbreviation | Mon |
| `W` | Week number | 14 |

---

## Formatter Function Parameters

The `formatter` function receives four arguments: `date`, `format`, `tier`, and `mode`:

```typescript
public timelineSettings: object = {
  bottomTier: {
    unit: 'Day',
    formatter: (date: Date, format: string, tier: string, mode: string) => {
      // tier: 'topTier' | 'bottomTier'
      // mode: unit string like 'Day', 'Week', 'Month', etc.
      return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
    }
  }
};
```

Use `tier` to differentiate formatting logic between top and bottom tiers, and `mode` to know which timeline unit is active.

---

## Timeline Cell Width

Control the width of each bottom-tier cell in pixels using `timelineUnitSize`:

```typescript
public timelineSettings: object = {
  bottomTier: { unit: 'Day', format: 'dd' },
  timelineUnitSize: 50   // Default is 33px; increase for more spacing
};
```

Top-tier cells automatically span the combined width of the bottom-tier cells they cover.

---

## Project Date Range

Define the timeline start and end to avoid auto-calculation from task data:

```html
<ejs-gantt
  projectStartDate="03/01/2024"
  projectEndDate="09/30/2024">
</ejs-gantt>
```

Without these properties, the Gantt derives the date range from the earliest and latest task dates. Setting them explicitly ensures consistent timeline rendering even when tasks haven't been assigned yet.

---

## Timeline View Dates

Use `viewStartDate` and `viewEndDate` inside `timelineSettings` to show a fixed visible window of the timeline without altering the project date range:

```typescript
public timelineSettings: object = {
  viewStartDate: new Date('03/01/2024'),
  viewEndDate: new Date('06/30/2024')
};
```

- The timeline header renders only within this window even if tasks extend beyond it.
- `projectStartDate` / `projectEndDate` still control the full project scope; `viewStartDate` / `viewEndDate` only affect what is visible.

---

## Week Start Day

Configure which day is treated as the start of the week using `weekStartDay` (0 = Sunday by default):

```typescript
public timelineSettings: object = {
  topTier: { unit: 'Week', format: 'MMM dd, yyyy' },
  bottomTier: { unit: 'Day', format: 'dd' },
  weekStartDay: 1   // 0=Sunday, 1=Monday, ... 6=Saturday
};
```

---

## Automatic Timescale Update

When tasks are edited and their dates move beyond the current timeline range, the Gantt can auto-extend the timeline. This is controlled by `updateTimescaleView`:

```typescript
public timelineSettings: object = {
  updateTimescaleView: true   // Default: true — auto-extends timeline on task edit
};
```

Set to `false` to lock the timeline range and prevent it from shifting when tasks are dragged or resized beyond the visible area.

---

## Zooming

Enable zoom toolbar buttons to let users adjust timeline granularity:

```typescript
public toolbar: string[] = ['ZoomIn', 'ZoomOut', 'ZoomToFit'];
```

Programmatic zoom:
```typescript
this.ganttObj.zoomIn();    // Increase detail level
this.ganttObj.zoomOut();   // Decrease detail level
this.ganttObj.fitToProject(); // Fit entire project in view
```

Configure zoom levels:
```typescript
public zoomingLevels: object[] = [
  { topTier: { unit: 'Year', format: 'yyyy', count: 1 }, bottomTier: { unit: 'Month', format: 'MMM', count: 1 }, timelineUnitSize: 33, level: 1 },
  { topTier: { unit: 'Month', format: 'MMM yyyy', count: 1 }, bottomTier: { unit: 'Week', format: "'W'W", count: 1 }, timelineUnitSize: 33, level: 2 },
  { topTier: { unit: 'Week', format: 'MMM dd, yyyy', count: 1 }, bottomTier: { unit: 'Day', format: 'dd', count: 1 }, timelineUnitSize: 33, level: 3 }
];
```

```html
<ejs-gantt [zoomingLevels]="zoomingLevels"></ejs-gantt>
```

---

## Weekend Highlighting

Highlight non-working day columns in the timeline using `showWeekend` inside `timelineSettings`. Use `workWeek` to define which days are working:

```typescript
public timelineSettings: object = {
  showWeekend: true   // Highlights non-working days (based on workWeek)
};

public workWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
```

```html
<ejs-gantt [timelineSettings]="timelineSettings" [workWeek]="workWeek"></ejs-gantt>
```

---

## Timeline Cells Tooltip

Hovering over timeline cells shows a tooltip with date information by default. Disable it via `showTooltip`:

```typescript
public timelineSettings: object = {
  showTooltip: false   // Default: true
};
```

---

## Navigating the Timeline

Move the visible timeline window forward or backward by one time unit programmatically:

```typescript
// Move timeline forward by one unit
this.ganttObj.nextTimeSpan();

// Move timeline backward by one unit
this.ganttObj.previousTimeSpan();
```

These methods extend the `projectStartDate` / `projectEndDate` of the Gantt, effectively scrolling the timeline. Useful for toolbar buttons or navigation controls.

---

## Infinite timeline scrolling

Enable `enableInfiniteTimelineScroll` to extend the timeline dynamically as users scroll horizontally:

```typescript
public enableInfiniteTimelineScroll: boolean = true;
```

- Forward scrolling extends the timeline automatically when the user uses the horizontal scrollbar or the forward scroll arrow.
- Backward extension happens only when the user clicks the backward scroll arrow.
- This feature extends only the visible timeline range and does not change the project dates.

Use this when you need to explore long schedules without manually updating the timeline window.

---

## Timeline Template

Customize the rendering of timeline tier header cells using the `timelineTemplate` template.

You can use the following context properties inside the template:

- `date`: the date for the timeline cell.
- `value`: the formatted date value shown in the timeline cell.
- `tier`: indicates whether the cell belongs to `'topTier'` or `'bottomTier'`.

```ts
import { Component, ViewEncapsulation, ViewChild, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttModule, GanttComponent } from '@syncfusion/ej2-angular-gantt';
import { GanttData } from './data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GanttModule, CommonModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ejs-gantt
      #gantt
      id="ganttChart"
      height="430px"
      [dataSource]="taskData"
      [taskFields]="taskFields"
      [treeColumnIndex]="1"
      [columns]="columns"
      [timelineSettings]="timelineSettings"
      [projectStartDate]="projectStartDate"
      [projectEndDate]="projectEndDate"
      [holidays]="holidays"
    >
      <ng-template #timelineTemplate let-data>
        <ng-container *ngIf="data.tier === 'topTier'">
          <div
            class="e-header-cell-label e-gantt-top-cell-text"
            style="width:100%;background-color:#FBF9F1;font-weight:bold;height:100%;display:flex;justify-content:center;align-items:center;"
            title="{{data.date}}"
          >
            <div>{{ data.value }}</div>
            <div style="width:20px;height:20px;line-height:normal;padding-left:10px;">
              <img style="width:100%;height:100%;" [src]="imagedate()" />
            </div>
          </div>
        </ng-container>

        <ng-container *ngIf="data.tier === 'bottomTier'">
          <div
            class="e-header-cell-label e-gantt-top-cell-text"
            [ngStyle]="{ 'background-color': bgColor(data.value, data.date) }"
            style="width:100%;text-align:center;height:100%;display:flex;align-items:center;font-weight:bold;justify-content:center;"
            title="{{data.date}}"
          >
            {{ holidayValue(data.value, data.date) }}
          </div>
        </ng-container>
      </ng-template>
    </ejs-gantt>
  `
})
export class AppComponent implements OnInit {
  @ViewChild('gantt') public ganttInstance?: GanttComponent;
  public taskData?: object;
  public taskFields?: object;
  public timelineSettings?: object;
  public columns?: object[];
  public projectStartDate?: Date;
  public projectEndDate?: Date;
  private currentIndex: number = 1;
  public holidays?: object[];

  public ngOnInit(): void {
    this.taskData = GanttData;
    this.taskFields = {
      id: 'TaskId',
      name: 'TaskName',
      startDate: 'StartDate',
      endDate: 'EndDate',
      duration: 'Duration',
      progress: 'Progress',
      dependency: 'Predecessor',
      parentID: 'ParentId',
    };

    this.timelineSettings = {
      topTier: {
        unit: 'Week',
        format: 'dd/MM/yyyy'
      },
      bottomTier: {
        unit: 'Day',
        count: 1
      },
      timelineUnitSize: 100
    };

    this.columns = [
      { field: 'TaskId', width: 80 },
      { field: 'TaskName', headerText: 'Job Name', width: '250', clipMode: 'EllipsisWithTooltip' },
      { field: 'StartDate' },
      { field: 'EndDate' },
      { field: 'Duration' },
      { field: 'Progress' },
      { field: 'Predecessor' }
    ];

    this.projectStartDate = new Date('03/31/2024');
    this.projectEndDate = new Date('04/23/2024');
    this.holidays = [
      {
        from: new Date('04/04/2024'),
        to: new Date('04/04/2024'),
        label: 'Local Holiday'
      },
      {
        from: new Date('04/19/2024'),
        to: new Date('04/19/2024'),
        label: 'Good Friday'
      }
    ];
  }

  public bgColor(value: string, date: string): string {
    if (value === 'S') {
      return '#7BD3EA';
    }
    const parsedDate = new Date(date);
    const holidays = this.ganttInstance?.holidays ?? [];
    for (let i = 0; i < holidays.length; i++) {
      const holiday: any = this.ganttInstance?.holidays[i];
      const fromDate: Date = new Date(holiday.from);
      const toDate: Date = new Date(holiday.to);
      if (parsedDate >= fromDate && parsedDate <= toDate) {
        return '#97E7E1';
      }
    }
    return '#E0FBE2';
  }

  public imagedate(): string {
    const getImage = this.currentIndex;
    this.currentIndex = this.currentIndex < 4 ? this.currentIndex + 1 : 1; // Loop 1-4
    return `assets/images/${getImage}.svg`;
  }

  public holidayValue(value: string, date: string): string {
    const parsedDate = new Date(date);
    const holidays = this.ganttInstance?.holidays ?? [];
    for (let i = 0; i < holidays.length; i++) {
      const holiday: any = this.ganttInstance?.holidays[i];
      const fromDate: Date = new Date(holiday.from);
      const toDate: Date = new Date(holiday.to);
      if (parsedDate >= fromDate && parsedDate <= toDate) {
        const options: any = { weekday: 'short' };
        return parsedDate.toLocaleDateString('en-US', options).toLocaleUpperCase();
      }
    }
    return value;
  }
}
```
