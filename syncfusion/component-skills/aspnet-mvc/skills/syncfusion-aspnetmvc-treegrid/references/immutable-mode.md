# Immutable Mode in Tree Grid

## Table of Contents
- [When to Use This](#when-to-use-this)
- [Enable Immutable Mode](#enable-immutable-mode)
- [How It Works](#how-it-works)
- [Configuration Example](#configuration-example)
- [Limitations](#limitations)
- [Notes & References](#notes--references)

## When to Use This

Use immutable mode when you need to:
- Improve rendering performance on frequent updates
- Avoid full re-renders and preserve scroll/selection state
- Update only modified or newly added rows efficiently

## Enable Immutable Mode

Set `EnableImmutableMode(true)` on the Tree Grid. Ensure the primary key column is configured (`IsPrimaryKey(true)`) because immutable comparison relies on the primary key.

```cshtml
@Html.EJS().TreeGrid("Pager")
    .AllowPaging()
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .EnableImmutableMode(true)
    .Columns(col => {
        col.Field("TaskId").HeaderText("Task ID").Width(70).IsPrimaryKey(true).Add();
        col.Field("TaskName").HeaderText("Task Name").Width(160).Add();
        col.Field("StartDate").HeaderText("Start Date").Format("yMd").Width(90).Add();
        col.Field("Duration").HeaderText("Duration").Width(80).Add();
    })
    .ChildMapping("Children")
    .TreeColumnIndex(1)
    .Render()
```

## How It Works

Immutable mode uses object reference and deep-compare logic to determine changed rows. Only rows that differ (by primary key and deep comparison) are re-rendered, preserving DOM for unchanged rows.

## Limitations

Features not supported in immutable mode:
- Frozen rows and columns
- Row Template
- Detail Template
- Column Reorder
- Virtualization

Consider these constraints before enabling immutable mode in feature-rich grids.

## Notes & References
- Provide `IsPrimaryKey` for correct diffing behavior.
- Immutable mode is ideal when frequent updates occur on large datasets and full re-render is expensive.

