# Immutable Mode — Syncfusion ASP.NET MVC Gantt Chart

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

Set `EnableImmutableMode(true)`. A column with `IsPrimaryKey(true)` is **required** — the Gantt uses the primary key to identify which rows have changed:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Child("SubTasks")
    )
    .Columns(col =>
    {
        col.Field("TaskId").HeaderText("ID").IsPrimaryKey(true).Width("60").Add();
        col.Field("TaskName").HeaderText("Task Name").Width("250").Add();
        col.Field("StartDate").HeaderText("Start").Width("120").Add();
        col.Field("Duration").HeaderText("Duration").Width("80").Add();
        col.Field("Progress").HeaderText("Progress").Width("100").Add();
    })
    .EnableImmutableMode(true)
    .Height("450px")
    .Render()
```

> **A primary key column is mandatory.** Without `IsPrimaryKey(true)` on one column, immutable mode cannot identify changed rows and will not function correctly.

---

## Limitations

The following features are **not supported** in immutable mode:

- **Column reorder** — drag-reordering columns is disabled
- **Virtualization** — `EnableVirtualization(true)` and `EnableImmutableMode(true)` cannot be used together
