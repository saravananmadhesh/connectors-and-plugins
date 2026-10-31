# Virtual Scrolling — Syncfusion ASP.NET Core Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Row Virtualization](#row-virtualization)
- [Timeline Virtualization](#timeline-virtualization)
- [Limitations](#limitations)

---

## Overview

Virtual scrolling renders only the rows and timeline cells visible in the current viewport, significantly improving performance for large datasets. All records are fetched from the data source initially, but only the visible portion is in the DOM.

---

## Row Virtualization

Enable row-level virtualization to handle thousands of tasks efficiently. Set `enableVirtualization="true"`:

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           enableVirtualization="true"
           height="600px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId"    headerText="ID"        width="60"></e-gantt-column>
        <e-gantt-column field="TaskName"  headerText="Task Name" width="250"></e-gantt-column>
        <e-gantt-column field="StartDate" headerText="Start"     width="120"></e-gantt-column>
        <e-gantt-column field="Duration"  headerText="Duration"  width="80"></e-gantt-column>
        <e-gantt-column field="Progress"  headerText="Progress"  width="100"></e-gantt-column>
    </e-gantt-columns>
</ejs-gantt>
```

> The number of rows rendered is determined by the `height` property. **Height must be specified in pixels** when virtualization is enabled.

---

## Timeline Virtualization

Enable timeline-level virtualization for data sources with a large time span. Initially renders the timeline at 3× the Gantt width; additional cells are rendered on demand during horizontal scrolling.

Set `enableTimelineVirtualization="true"`:

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           enableVirtualization="true"
           enableTimelineVirtualization="true"
           height="600px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

> Both `enableVirtualization` and `enableTimelineVirtualization` can be enabled together for maximum performance on large datasets with wide timelines.

---

## Limitations

The following features are **not supported** when virtual scrolling is enabled:

- Cell-based selection
- Immutable mode (`enableImmutableMode`) cannot be combined with virtualization
- The Gantt `height` must be specified in **pixels** (not percentage)
- Due to browser DOM element height limits, the maximum number of rendered rows is browser-dependent
