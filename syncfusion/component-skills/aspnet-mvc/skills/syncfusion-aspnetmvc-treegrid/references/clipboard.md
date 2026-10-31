# Clipboard in Tree Grid

## Table of Contents
- [When to Use This](#when-to-use-this)
- [Copy & Shortcuts](#copy--shortcuts)
- [Copy via External Button](#copy-via-external-button)
- [Copy Hierarchy Modes](#copy-hierarchy-modes)
- [AutoFill & Paste](#autofill--paste)
- [Limitations](#limitations)
- [Notes & References](#notes--references)

## When to Use This

Use the clipboard feature when you need to:
- Allow users to copy selected rows or cells to the system clipboard
- Support copying data with or without headers
- Provide external copy buttons or toolbar actions for convenience
- Enable autofill and paste workflows in combination with batch editing

## Copy & Shortcuts

Supported keyboard shortcuts:
- `Ctrl + C`: Copy selected rows or cells
- `Ctrl + Shift + H`: Copy selected rows or cells with header

Basic Tree Grid setup with selection:

```cshtml
@(Html.EJS().TreeGrid("Clipboard")
    .DataSource((IEnumerable<object>)ViewBag.dataSource)
    .SelectionSettings(select => { select.Mode(SelectionMode.Row); select.Type(SelectionType.Multiple); })
    .Columns(col => { /* columns */ })
    .ChildMapping("Children").TreeColumnIndex(1).Height(200).Render())
```

## Copy via External Button

Call the `copy()` method programmatically to copy selection. Pass `true` to include headers.

```js
document.getElementById("Copy").onclick = function () {
    var treegrid = document.getElementById("CopyBtn").ej2_instances[0];
    treegrid.copy();
}

document.getElementById("CopyHeader").onclick = function () {
    var treegrid = document.getElementById("CopyBtn").ej2_instances[0];
    treegrid.copy(true);
}
```

## Copy Hierarchy Modes

`CopyHierarchyMode` controls how parent/child rows are included with copied records:
- `Parent`: Include selected records with their parent records (default)
- `Child`: Include selected records with their child records
- `Both`: Include both parent and child records
- `None`: Only selected records

## AutoFill & Paste

- `EnableAutoFill(true)` enables drag-to-fill behavior for cell selections; requires cell selection mode `Box` and batch editing.
- Paste is supported with `Ctrl + V` when selection `Mode` is `Cell`, `CellSelectionMode` is `Box`, and batch editing is enabled.

## Limitations

- AutoFill does not parse strings to numbers/dates; copying string-to-number may produce `NaN`.
- Paste and AutoFill require specific selection and editing configurations (Cell + Box + Batch Edit).

## Notes & References
- Useful for quick transfer of grid data to spreadsheets or external editors.
- When enabling clipboard/paste/autofill, ensure selection and edit settings align with feature requirements.