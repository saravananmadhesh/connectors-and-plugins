# Virtual Scrolling — Syncfusion ASP.NET MVC Gantt Chart

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

Enable row-level virtualization to handle thousands of tasks efficiently. Set `EnableVirtualization(true)`:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Child("SubTasks")
    )
    .Columns(col =>
    {
        col.Field("TaskId").HeaderText("ID").Width("60").Add();
        col.Field("TaskName").HeaderText("Task Name").Width("250").Add();
        col.Field("StartDate").HeaderText("Start").Width("120").Add();
        col.Field("Duration").HeaderText("Duration").Width("80").Add();
        col.Field("Progress").HeaderText("Progress").Width("100").Add();
    })
    .EnableVirtualization(true)
    .Height("600px")
    .Render()
```

> The number of rows rendered is determined by the `Height` property. **Height must be specified in pixels** when virtualization is enabled.

---

## Timeline Virtualization

Enable timeline-level virtualization for data sources with a large time span. Initially renders the timeline at 3× the Gantt width; additional cells are rendered on demand during horizontal scrolling.

Set `EnableTimelineVirtualization(true)`:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Child("SubTasks")
    )
    .EnableVirtualization(true)
    .EnableTimelineVirtualization(true)
    .Height("600px")
    .Render()
```

> Both `EnableVirtualization` and `EnableTimelineVirtualization` can be enabled together for maximum performance on large datasets with wide timelines.

---

## Limitations

The following features are **not supported** when virtual scrolling is enabled:

- Cell-based selection
- Immutable mode (`EnableImmutableMode(true)`) cannot be combined with virtualization
- The Gantt `Height` must be specified in **pixels** (not percentage)
- Due to browser DOM element height limits, the maximum number of rendered rows is browser-dependent
