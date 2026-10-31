# Scrolling in Angular Gantt Chart

## Table of Contents
- [Basic Scroll Configuration](#basic-scroll-configuration)
- [Scroll to Specific Row or Date](#scroll-to-specific-row-or-date)
- [Virtual Scrolling (Row Virtualization)](#virtual-scrolling-row-virtualization)
- [Timeline Virtualization](#timeline-virtualization)
- [Virtual Scrolling Limitations](#virtual-scrolling-limitations)
- [Splitter (TreeGrid / Chart ratio)](#splitter-treegrid--chart-ratio)

---

## Basic Scroll Configuration

Set explicit `height` and `width` to control viewport and trigger scrollbars:

```html
<ejs-gantt height="450px" width="900px"></ejs-gantt>
```

By default both are `'auto'`, expanding to fit content. Scrollbars appear automatically when content exceeds dimensions.

**Responsive (fills container):**
```html
<ejs-gantt height="100%" width="100%"></ejs-gantt>
```

When using `height: '100%'`, the parent container must have an explicit height defined in CSS.

---

## Scroll to Specific Row or Date

```typescript
// Scroll to a specific row index
this.ganttObj.scrollToTaskbar(5);   // Scroll to task at index 5

// Scroll to a specific date in the timeline
this.ganttObj.scrollToDate('04/15/2024');
```

---

## Virtual Scrolling (Row Virtualization)

For large datasets (thousands of tasks), enable virtual scrolling to render only visible rows:

```typescript
@Component({
  providers: [VirtualScrollService],  // Required
  template: `
    <ejs-gantt
      height="600px"
      [enableVirtualization]="true">
    </ejs-gantt>
  `
})
```

**How it works:** All data is fetched at once, but only visible rows are rendered in the DOM. As the user scrolls, rows are rendered/removed on demand.

**Requirements:**
- `VirtualScrollService` must be injected
- `height` must be set in **pixels** (not percentage) to define the viewport
- Static height on the Gantt or its parent container

---

## Timeline Virtualization

For wide timelines (multi-year projects with day-level granularity), reduce memory by loading timeline cells on demand:

```typescript
@Component({
  providers: [VirtualScrollService],  // Required for both row and timeline virtualization
  template: `
    <ejs-gantt
      height="600px"
      [enableTimelineVirtualization]="true">
    </ejs-gantt>
  `
})
```

Initially renders 3× the Gantt's width worth of timeline cells, loading more as the user scrolls horizontally.

---

## Virtual Scrolling Limitations

| Limitation | Details |
|-----------|---------|
| Incompatible with `enableImmutableMode` | Both use conflicting rendering optimizations |
| Cell selection not persisted | On-demand rendering resets cell state |
| Browser height limits | Maximum records limited by browser's DOM height constraints |
| Height must be pixels | `height: '100%'` only works with explicitly-sized parent |
| Data paging | Public methods only see currently rendered page of data |

---

## Splitter (TreeGrid / Chart ratio)

Control the width split between the TreeGrid pane and the chart area:

```typescript
public splitterSettings: object = {
  columnIndex: 3,     // Number of columns visible in TreeGrid pane
  position: '30%',    // Or use percentage/pixel value for splitter position
  separatorSize: 4    // Splitter bar width in pixels
};
```

```html
<ejs-gantt [splitterSettings]="splitterSettings"></ejs-gantt>
```

Programmatic splitter adjustment:
```typescript
this.ganttObj.setSplitterPosition(400, 'position');   // Set by pixel
this.ganttObj.setSplitterPosition(3, 'columnIndex');  // Set by column count
```
