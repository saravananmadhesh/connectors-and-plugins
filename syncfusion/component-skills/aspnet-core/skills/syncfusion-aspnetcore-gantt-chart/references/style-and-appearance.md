# Style and Appearance — Syncfusion ASP.NET Core Gantt Chart

## Table of Contents
- [CSS Class Reference](#css-class-reference)
- [Grid Lines](#grid-lines)
- [Row Height](#row-height)
- [Alternate Row Styling](#alternate-row-styling)
- [Custom Theme via Theme Studio](#custom-theme-via-theme-studio)

---

## CSS Class Reference

Override these CSS classes to customize Gantt appearance:

### Root & Layout

| CSS Class | Element | Purpose |
|-----------|---------|---------|
| `.e-gantt` | Root `<div>` | Root container of the Gantt control |
| `.e-gridheader` | Header root | Override border between header and content |
| `.e-gridcontent` | Body content root | Override body background color |
| `.e-gantt-chart` | Chart side | Chart area container |
| `.e-split-bar` | Splitter | Splitter bar between grid and chart |
| `.e-resize-handler` | Splitter handle | Resize drag handle |

### Grid Rows & Cells

| CSS Class | Element | Purpose |
|-----------|---------|---------|
| `.e-row` | Grid row | All grid rows |
| `.e-altrow` | Alternate rows | Alternate row background color |
| `.e-rowcell` | Grid cells | All cell appearance and padding |
| `.e-chart-row` | Chart rows | Chart-side row containers |

### Taskbar

| CSS Class | Element | Purpose |
|-----------|---------|---------|
| `.e-taskbar-main-container` | Taskbar wrapper | Outer taskbar container |
| `.e-gantt-parent-taskbar` | Parent taskbar | Parent task bar appearance |
| `.e-gantt-child-taskbar` | Child taskbar | Leaf task bar appearance |
| `.e-gantt-milestone` | Milestone | Diamond milestone shape |
| `.e-gantt-unscheduled-taskbar` | Unscheduled task | Unscheduled task bar |
| `.e-gantt-manualparenttaskbar` | Manual parent | Manually scheduled parent |
| `.e-gantt-child-manualtaskbar` | Manual child | Manually scheduled child |

### Timeline

| CSS Class | Element | Purpose |
|-----------|---------|---------|
| `.e-timeline-header-container` | Timeline header | Full timeline header area |
| `.e-header-cell-label` | Timeline cell label | Text in each timeline cell |
| `.e-weekend-header-cell` | Weekend cells | Weekend column header cells |

### Connector Lines

| CSS Class | Element | Purpose |
|-----------|---------|---------|
| `.e-line` | Connector line | Dependency line |
| `.e-connector-line-right-arrow` | Right arrow | Arrowhead pointing right |
| `.e-connector-line-left-arrow` | Left arrow | Arrowhead pointing left |

### Labels, Event Markers, Baseline, Tooltip

| CSS Class | Element | Purpose |
|-----------|---------|---------|
| `.e-task-label` | Task labels | Left, right, and task label text |
| `.e-right-label-container` | Right label | Container for right label |
| `.e-left-label-container` | Left label | Container for left label |
| `.e-event-markers` | Event markers | Vertical event marker lines |
| `.e-baseline-bar` | Baseline bar | Baseline taskbar |
| `.e-baseline-gantt-milestone-container` | Baseline milestone | Baseline milestone shape |
| `.e-gantt-tooltip` | Tooltip | Hover tooltip container |

**Example — custom alternate row and taskbar color:**

```css
/* Alternate row background */
.e-gantt .e-altrow {
    background-color: #f5f9ff;
}

/* Child taskbar color */
.e-gantt .e-gantt-child-taskbar {
    background-color: #3f91e5;
    border-color: #1d6ebc;
}

/* Parent taskbar color */
.e-gantt .e-gantt-parent-taskbar {
    background-color: #1d6ebc;
}

/* Timeline weekend cell */
.e-gantt .e-weekend-header-cell {
    background-color: #fff3e0;
}
```

---

## Grid Lines

Control grid line visibility on both the TreeGrid and Chart sides using `gridLines`:

| Value | Description |
|-------|-------------|
| `Horizontal` | Horizontal lines only (default) |
| `Vertical` | Vertical lines only |
| `Both` | Both horizontal and vertical lines |
| `None` | No grid lines |

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           gridLines="Both"
           height="450px">
    ...
</ejs-gantt>
```

---

## Row Height

Set the height of all rows in pixels using `rowHeight`:

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           rowHeight="50"
           taskbarHeight="30"
           height="450px">
    ...
</ejs-gantt>
```

> `taskbarHeight` must be **less than** `rowHeight`. Both properties accept pixel values only.

---

## Alternate Row Styling

Customize the alternate row color using CSS:

```css
.e-gantt .e-altrow {
    background-color: #e8f4fd;
}

/* Matching chart-side alternate rows */
.e-gantt .e-gantt-chart .e-chart-row:nth-child(even) {
    background-color: #e8f4fd;
}
```

---
