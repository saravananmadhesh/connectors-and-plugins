# Immutable Mode — Syncfusion ASP.NET Core Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Enable Immutable Mode](#enable-immutable-mode)
- [Limitations](#limitations)

---

## Overview

Immutable mode optimizes Gantt re-rendering performance by using object reference and deep comparison. When data updates occur (e.g., CRUD operations, data refresh), only rows with **changed data** are re-rendered. Unchanged rows remain untouched in the DOM, preventing unnecessary re-renders.

This is especially useful for scenarios with frequent, partial data updates — such as real-time progress tracking or incremental remote data pushes.

---

## Enable Immutable Mode

Set `enableImmutableMode="true"`. A column with `isPrimaryKey="true"` is **required** — the Gantt uses the primary key to identify which rows have changed:

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           enableImmutableMode="true"
           height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId"    headerText="ID"        isPrimaryKey="true" width="60"></e-gantt-column>
        <e-gantt-column field="TaskName"  headerText="Task Name" width="250"></e-gantt-column>
        <e-gantt-column field="StartDate" headerText="Start"     width="120"></e-gantt-column>
        <e-gantt-column field="Duration"  headerText="Duration"  width="80"></e-gantt-column>
        <e-gantt-column field="Progress"  headerText="Progress"  width="100"></e-gantt-column>
    </e-gantt-columns>
</ejs-gantt>
```

> **A primary key column is mandatory.** Without `isPrimaryKey="true"` on one column, immutable mode cannot identify changed rows and will not function correctly.

---

## Limitations

The following features are **not supported** in immutable mode:

- **Column reorder** — drag-reordering columns is disabled
- **Virtualization** — `enableVirtualization` and `enableImmutableMode` cannot be used together
