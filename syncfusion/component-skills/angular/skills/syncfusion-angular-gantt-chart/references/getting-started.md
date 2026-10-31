# Getting Started with Angular Gantt Chart

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [CSS Imports](#css-imports)
- [Add the Component](#add-the-component)
- [Bind Data](#bind-data)
- [Configure Task Fields](#configure-task-fields)
- [Inject Feature Modules](#inject-feature-modules)
- [Configure Timeline](#configure-timeline)
- [Enable Toolbar](#enable-toolbar)
- [Enable Editing](#enable-editing)
- [Enable Filtering and Sorting](#enable-filtering-and-sorting)
- [Define Event Markers](#define-event-markers)
- [Handle Errors](#handle-errors)
- [Run the Application](#run-the-application)

---

## Prerequisites

- Node.js **20.11 or later** (required by Angular 20/21)
- Angular CLI installed globally
- npm or yarn package manager
- Basic knowledge of Angular framework

```bash
npm install -g @angular/cli
```

---

## Installation

Create a new Angular application:

```bash
ng new syncfusion-angular-app
```

Install the Gantt Chart package using `ng add` (recommended):

```bash
cd syncfusion-angular-app
ng add @syncfusion/ej2-angular-gantt
```

This command performs the following:
- Installs required dependencies
- Imports the Gantt module
- Registers default theme styles in `angular.json`

Or install manually:

```bash
npm install @syncfusion/ej2-angular-gantt --save
```

---

## CSS Imports

The Gantt component requires specific CSS files for proper rendering. Add to `src/styles.css`

To apply the tailwind 3 theme, install the corresponding theme package by using the following command:

```bash
npm install @syncfusion/ej2-tailwind3-theme
```

The installed theme package includes an `index.css` file that automatically imports all the required dependency styles. Import the following stylesheet into `src/styles.css`:

```css
@import '../node_modules/@syncfusion/ej2-tailwind3-theme/styles/gantt/index.css';
```

> **Note:** For other available themes like Material 3, Bootstrap 5, or Fluent 2

---

## Add the Component

Modify `src/app/app.ts` (Angular 20+) or `src/app/app.component.ts` (Angular 19 and below):

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { GanttModule } from '@syncfusion/ej2-angular-gantt';

@Component({
    imports: [GanttModule],
    standalone: true,
    selector: 'app-root',
    template: `<ejs-gantt [dataSource]="data" [taskFields]="taskSettings"></ejs-gantt>`,
    encapsulation: ViewEncapsulation.None
})
export class App {
    public data = [
        {TaskID: 1, TaskName: 'Project initiation', StartDate: new Date('2024-04-01'), EndDate: new Date('2024-04-15')},
        {TaskID: 2, TaskName: 'Identify site location', StartDate: new Date('2024-04-01'), Duration: 4, ParentID: 1},
        {TaskID: 3, TaskName: 'Perform site survey', StartDate: new Date('2024-04-01'), Duration: 4, ParentID: 1},
        {TaskID: 4, TaskName: 'Soil testing', StartDate: new Date('2024-04-01'), Duration: 3, ParentID: 1},
        {TaskID: 5, TaskName: 'Project estimation', StartDate: new Date('2024-04-08'), EndDate: new Date('2024-04-18')},
        {TaskID: 6, TaskName: 'Develop floor plan', StartDate: new Date('2024-04-08'), Duration: 5, ParentID: 5},
        {TaskID: 7, TaskName: 'Estimate project cost', StartDate: new Date('2024-04-08'), Duration: 5, ParentID: 5},
    ];
    public taskSettings = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        duration: 'Duration',
        parentID: 'ParentID'
    };
}
```

This renders a Gantt chart with task hierarchy. Two data patterns are supported:
- **Self-referential** (shown above): Flat array with `id` + `parentID` — use this by default
- **Hierarchical**: Nested `subtasks` array — only when user explicitly requests nested/tree structure

---

## Configure Task Fields

The `taskFields` property maps data fields to Gantt properties:

```typescript
public taskSettings = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    duration: 'Duration',
    parentID: 'ParentID'
};
```

**Essential `taskFields` mappings:**
| Property | Maps to | Required |
|----------|---------|----------|
| `id` | Unique task ID | Yes |
| `name` | Task name | Yes |
| `startDate` | Start date | Yes |
| `duration` | Task duration in days | Either Duration or EndDate |
| `endDate` | Task end date | Either Duration or EndDate |
| `progress` | Completion % | Optional |
| `dependency` | Predecessor IDs (e.g., `'3FS'`) | Optional |
| `child` | Child tasks array | For hierarchical data |
| `parentID` | Parent task ID | For self-referential data |

> **`dateFormat`:** Use the top-level `dateFormat` property to set the default display format for all date columns globally (e.g., `dateFormat="MM/dd/yyyy"`). Individual column `format` overrides this per-column.

---

## Inject Feature Modules

Inject services in the `providers` array to enable features:

```typescript
import { Component } from '@angular/core';
import {
  GanttModule,
  EditService, FilterService, SortService,
  ToolbarService, SelectionService, DayMarkersService
} from '@syncfusion/ej2-angular-gantt';

@Component({
  imports: [GanttModule],
  standalone: true,
  providers: [EditService, FilterService, SortService, ToolbarService, SelectionService, DayMarkersService],
  selector: 'app-root',
  template: `
    <ejs-gantt
      [dataSource]="data"
      [taskFields]="taskFields"
      [toolbar]="toolbar"
      [allowFiltering]="true"
      [allowSorting]="true"
      [editSettings]="editSettings">
    </ejs-gantt>
  `
})
export class AppComponent {
  public data: object[] = [];
  public taskFields: object = {};
  public toolbar: string[] = ['Add', 'Edit', 'Delete'];
  public editSettings: object = { allowEditing: true, allowAdding: true, allowDeleting: true };
}
```

Omitting a required service disables its feature at runtime.

---

## Configure Timeline

Use `timelineSettings` to define the top/bottom tiers and date formats:

```typescript
public timelineSettings: object = {
  topTier: {
    unit: 'Week',
    format: 'MMM dd, yyyy'
  },
  bottomTier: {
    unit: 'Day',
    count: 1
  }
};
```

Set project date range:
```html
<ejs-gantt
  [timelineSettings]="timelineSettings"
  projectStartDate="04/01/2024"
  projectEndDate="06/30/2024">
</ejs-gantt>
```

---

## Enable Toolbar

Add `ToolbarService` to providers and set the `toolbar` array:

```typescript
public toolbar: string[] = ['Add', 'Edit', 'Delete', 'ExpandAll', 'CollapseAll', 'Search', 'ZoomIn', 'ZoomOut', 'ZoomToFit'];
```

Without `ToolbarService`, toolbar won't render.

---

## Enable Editing

Set `editSettings` and inject `EditService`:

```typescript
public editSettings: object = {
  allowEditing: true,      // Enable cell/dialog editing
  allowAdding: true,       // Enable adding new tasks
  allowDeleting: true,     // Enable deleting tasks
  allowTaskbarEditing: true, // Enable drag/resize taskbars
  mode: 'Auto'             // 'Auto' = cell editing | 'Dialog' = dialog editing
};
```

- **Cell editing:** `mode: 'Auto'` — double-click a TreeGrid cell
- **Dialog editing:** `mode: 'Dialog'` — double-click anywhere opens dialog
- **Taskbar editing:** `allowTaskbarEditing: true` — drag/resize taskbars on the chart

---

## Enable Filtering and Sorting

```html
<ejs-gantt [allowFiltering]="true" [allowSorting]="true">
</ejs-gantt>
```

Inject `FilterService` and `SortService` in providers. Filtering adds filter icons to column headers; sorting enables click-to-sort.

---

## Define Event Markers

Event markers highlight important project dates with vertical lines:

```typescript
// Inject DayMarkersService
public eventMarkers: object[] = [
  { day: new Date('04/10/2024'), label: 'Kickoff meeting', cssClass: 'e-custom-event-marker' },
  { day: new Date('05/15/2024'), label: 'Mid-project review' }
];
```

```html
<ejs-gantt [eventMarkers]="eventMarkers"></ejs-gantt>
```

Missing `DayMarkersService` prevents marker rendering.

---

## Handle Errors

Subscribe to the `actionFailure` event to catch configuration issues:

```typescript
public actionFailure(args: any): void {
  console.error('Gantt action failed:', args.error);
}
```

```html
<ejs-gantt (actionFailure)="actionFailure($event)"></ejs-gantt>
```

Common causes: missing `isPrimaryKey`, invalid `dependency` format, missing `hasChildMapping` for load-on-demand, invalid `timelineSettings.format`.


---

## Grid Lines

Control which grid lines are rendered in the TreeGrid (left) and chart (right) panes:

```html
<ejs-gantt gridLines="Both"></ejs-gantt>
```

| Value | Description |
|---|---|
| `'Both'` | Horizontal and vertical lines in both panes (default) |
| `'Horizontal'` | Only horizontal row separator lines |
| `'Vertical'` | Only vertical column divider lines |
| `'None'` | No grid lines |

```typescript
// Programmatic toggle
this.ganttObj.gridLines = 'Horizontal';
```

---

## Run the Application

```bash
ng serve --open
```

The browser opens at `http://localhost:4200` showing the Gantt chart.

**Troubleshooting checklist:**
- Styles not showing → Verify CSS import order in `styles.css`
- Editing not working → Check `EditService` is in `providers`
- Toolbar not visible → Check `ToolbarService` is in `providers`
- Tasks not rendering → Verify `taskFields.id`, `taskFields.name`, `taskFields.startDate` are mapped
