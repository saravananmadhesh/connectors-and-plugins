# Frozen Rows and Columns in Tree Grid

## Table of Contents
- [When to Use This](#when-to-use-this)
- [Enable Frozen Rows & Columns](#enable-frozen-rows--columns)
- [Freeze Particular Columns (`IsFrozen`)](#freeze-particular-columns-isfrozen)
- [Freeze Direction (Left / Right)](#freeze-direction-left--right)
- [Limitations](#limitations)
- [Notes & References](#notes--references)

## When to Use This

Use frozen rows and columns when you need to:
- Keep important columns always visible while horizontally scrolling
- Keep header or top rows visible during vertical scrolling
- Improve readability for wide hierarchies or long lists of columns
- Present key identifiers (IDs, names) while users inspect other fields

## Enable Frozen Rows & Columns

Set `FrozenColumns` and `FrozenRows` on the Tree Grid to freeze the left-most columns and top rows respectively.

```cshtml
@Html.EJS().TreeGrid("DefaultFunctionalities")
    .DataSource((IEnumerable<object>)ViewBag.datasource)
    .Columns(col => {
        col.Field("TaskId").HeaderText("Task ID").Width(100).TextAlign(TextAlign.Right).Add();
        col.Field("TaskName").HeaderText("Task Name").Width(230).Add();
        col.Field("StartDate").HeaderText("Start Date").Width(150).TextAlign(TextAlign.Right).Format("yMd").Add();
        /* other columns omitted */
    })
    .Height(410)
    .ChildMapping("Children")
    .TreeColumnIndex(1)
    .FrozenColumns(2)  // freeze first 2 columns
    .FrozenRows(3)     // freeze first 3 rows
    .Render()
```

## Freeze Particular Columns (`IsFrozen`)

Use the column-level `IsFrozen(true)` property to freeze specific columns instead of freezing by index.

```csharp
col.Field("TaskName").HeaderText("Task Name").Width(230).IsFrozen(true).Add();
col.Field("StartDate").HeaderText("Start Date").Width(150).IsFrozen(true).Format("yMd").Add();
```

## Freeze Direction (Left / Right)

Columns can be frozen to the left or right side using the `Freeze` property with `FreezeDirection.Left` or `FreezeDirection.Right`. Remaining columns remain movable; the grid will position frozen columns according to the specified direction.

```csharp
col.Field("TaskName").HeaderText("Task Name").Width(230).Freeze(Syncfusion.EJ2.Grids.FreezeDirection.Left).Add();
col.Field("Priority").HeaderText("Priority").Width(120).Freeze(Syncfusion.EJ2.Grids.FreezeDirection.Right).Add();
```

## Limitations

The following features are not supported when using frozen rows and columns:
- Row Template
- Detail Template
- Cell Editing

Additional limitations for Freeze Direction:
- Infinite scroll cache mode is not compatible
- Freeze direction in stacked headers is not compatible with column reordering

Consider these constraints when designing editable or highly interactive grids.

## Notes & References
- `FrozenColumns` and `FrozenRows` keep left/top sections visible during scrolling.
- Use `IsFrozen` for freezing individual columns.
- Use the `Freeze` direction when you need frozen columns on the right side.
