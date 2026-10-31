# Column Reordering in Tree Grid

## Table of Contents

- [When to Use This](#when-to-use-this)
- [Enable Column Reordering](#enable-column-reordering)
- [Disable Reordering for a Column](#disable-reordering-for-a-column)
- [Programmatic Reorder (reorderColumns)](#programmatic-reorder-reordercolumns)
- [Reorder Multiple Columns](#reorder-multiple-columns)
- [Notes](#notes)

## When to Use This

Use column reordering when you need to:
- Let users change column order by dragging header cells
- Provide a customizable column layout without changing server data
- Programmatically change column positions in response to user actions
- Support workflows that require temporary reorganization of columns for reporting or viewing

## Enable Column Reordering

Set `AllowReordering` to enable drag-and-drop reordering of column headers.

```cshtml
@using Syncfusion.EJ2.Grids

@(Html.EJS().TreeGrid("Reorder").AllowReordering()
    .DataSource((IEnumerable<object>)ViewBag.datasource)
    .Columns(col =>
    {
        col.Field("TaskId").HeaderText("Task ID").Width(80).TextAlign(TextAlign.Right).Add();
        col.Field("TaskName").HeaderText("Task Name").Width(200).Add();
        col.Field("Duration").HeaderText("Duration").Width(80).TextAlign(TextAlign.Right).Add();
        col.Field("Progress").HeaderText("Progress").Width(80).TextAlign(TextAlign.Right).Add();
    }).Height(315).ChildMapping("Children").TreeColumnIndex(1).Render()
)
```

## Disable Reordering for a Column

Disable reordering for a particular column by setting its `AllowReordering` to `false`.

```csharp
col.Field("TaskId").HeaderText("Task ID").AllowReordering(false).Add();
```

## Programmatic Reorder (reorderColumns)

Use the `reorderColumns` API to programmatically move columns. The method accepts a column key/field or an array of keys and a target column/key or index.

```html
<script>
    var treegrid = document.getElementById("Reorder").ej2_instances[0];
    // Move column at index 2 to index 0
    treegrid.reorderColumns(2, 0);
    // Or move by field name
    treegrid.reorderColumns(['TaskId'], 'TaskName');
</script>
```

## Reorder Multiple Columns

You can reorder multiple columns at once by passing an array of column keys as the source and a key or index as the destination.

```cshtml
@Html.EJS().Button("reorderMultipleCols").Content("Reorder Multiple Columns").Render()

@(Html.EJS().TreeGrid("Reorder").AllowReordering()
    .DataSource((IEnumerable<object>)ViewBag.datasource)
    .Columns(col => { /* columns omitted for brevity */ }).Height(315).ChildMapping("Children").TreeColumnIndex(1).Render()
)

<script>
    document.getElementById("reorderMultipleCols").addEventListener('click', () => {
        var treegrid = document.getElementById("Reorder").ej2_instances[0];
        treegrid.reorderColumns(['TaskId', 'Duration'], 'Progress');
    });
</script>
```

## Notes
- `AllowReordering` must be enabled on the Tree Grid to allow drag-and-drop reordering.
- Individual columns can opt-out by setting `AllowReordering(false)`.
- Programmatic reordering is useful for UX flows or restoring saved layouts.
- Refer to the official Syncfusion API docs for `reorderColumns` for additional options and return behavior.
