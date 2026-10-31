# Row Drag and Drop in Tree Grid

## Table of Contents
- [When to Use This](#when-to-use-this)
- [Enable Row Drag and Drop](#enable-row-drag-and-drop)
- [Drag Between Grids (targetID)](#drag-between-grids-targetid)
- [Events](#events)
- [Prevent Default Drop / Reorder Rows](#prevent-default-drop--reorder-rows)
- [Limitations & Notes](#limitations--notes)
- [References](#references)

## When to Use This

Use row drag-and-drop when you need to:
- Reorder rows interactively within the same Tree Grid
- Move rows between two Tree Grids or into another target control
- Provide visual reorganization of hierarchical data via drag handles

## Enable Row Drag and Drop

Set `AllowRowDragAndDrop(true)` and enable selection. For multiple selection, set selection `Type` to `Multiple`. Primary key column is required for reliable operations.

```cshtml
@(Html.EJS().TreeGrid("TreeGrid")
    .AllowRowDragAndDrop(true)
    .Height(275)
    .DataSource((IEnumerable<object>)ViewBag.datasource)
    .SelectionSettings(selection => selection.Type(Syncfusion.EJ2.TreeGrid.SelectionType.Multiple))
    .Columns(col => { /* columns */ })
    .ChildMapping("Children").TreeColumnIndex(1).Render())
```

## Drag Between Grids (targetID)

To enable cross-grid drag-and-drop, set `RowDropSettings.TargetID` to the destination Tree Grid selector/ID and enable `AllowRowDragAndDrop` on both grids.

```cshtml
.RowDropSettings(new Syncfusion.EJ2.TreeGrid.TreeGridRowDropSettings() { TargetID = "DestTree" })
```

## Events

Common events to hook:
- `RowDragStartHelper` — customize drag element
- `RowDragStart` — triggered when dragging starts
- `RowDrag` — while dragging
- `RowDrop` — when drop occurs (inspect `args.dropPosition` and other params)

## Prevent Default Drop / Reorder Rows

You can cancel the default drop behavior in the `rowDrop` handler by setting `args.cancel = true` and then call `reorderRows` to change drop position programmatically.

```js
function rowDrop(args) {
    if (args.dropPosition == 'middleSegment') {
        var treeGridObj = document.getElementById('TreeGrid').ej2_instances[0];
        args.cancel = true;
        treeGridObj.reorderRows([args.fromIndex], args.dropIndex, 'above');
    }
}
```

## Limitations & Notes

- Selection must be enabled and primary key column set.
- Works with multiple selected rows if selection type is `Multiple`.
- Use event handlers to validate or transform drop behavior.
