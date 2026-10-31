# Selection — Syncfusion ASP.NET MVC Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Disable Selection](#disable-selection)
- [Selection Mode](#selection-mode)
- [Selection Type](#selection-type)
- [Toggle Selection](#toggle-selection)
- [Hover Highlighting](#hover-highlighting)
- [Row Selection](#row-selection)
  - [Select a Row on Initial Load](#select-a-row-on-initial-load)
  - [Select a Row Dynamically](#select-a-row-dynamically)
  - [Multiple Row Selection](#multiple-row-selection)
  - [Conditional Row Selection](#conditional-row-selection)
  - [Customize Row Selection Action](#customize-row-selection-action)
- [Cell Selection](#cell-selection)
  - [Multiple Cell Selection](#multiple-cell-selection)
  - [Select a Cell Dynamically](#select-a-cell-dynamically)
  - [Customize Cell Selection Action](#customize-cell-selection-action)
- [Get Selected Row Indexes and Records](#get-selected-row-indexes-and-records)
- [Clear Selection](#clear-selection)
- [Hierarchy Checkbox Mode](#hierarchy-checkbox-mode)
- [Touch Interaction](#touch-interaction)

---

## Overview

Selection provides an option to highlight a row or a cell in the Gantt Chart. It can be triggered by clicking or using arrow keys. Selection is enabled by default and configured via `.SelectionSettings()` on the Gantt builder.

---

## Disable Selection

Set `.AllowSelection(false)` on the Gantt builder to disable all selection behaviour:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .AllowSelection(false)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Child("SubTasks"))
    .Render()
```

> `Row` selection is the default mode when `AllowSelection` is `true`.

---

## Selection Mode

Set `Mode` on `.SelectionSettings()` to control what can be selected:

| `Mode` Value | Description |
|---|---|
| `Row` (default) | Selects the entire row |
| `Cell` | Selects individual cells |
| `Both` | Selects both rows and cells simultaneously |

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .SelectionSettings(ss => ss
        .Mode(Syncfusion.EJ2.Grids.SelectionMode.Both))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Child("SubTasks"))
    .Render()
```

---

## Selection Type

Set `Type` on `.SelectionSettings()` to allow single or multiple selections:

| `Type` Value | Description |
|---|---|
| `Single` (default) | Only one row or cell can be selected at a time |
| `Multiple` | Multiple rows or cells can be selected by holding **Ctrl** while clicking |

---

## Toggle Selection

Set `EnableToggle(true)` on `.SelectionSettings()` to allow deselecting an already-selected row or cell by clicking it again. Default is `false`.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .AllowSelection(true)
    .SelectionSettings(ss => ss
        .Mode(Syncfusion.EJ2.Grids.SelectionMode.Row)
        .Type(Syncfusion.EJ2.Grids.SelectionType.Multiple)
        .EnableToggle(true))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Child("SubTasks"))
    .Render()
```

Disable toggle at runtime:

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.selectionSettings.enableToggle = false;
```

---

## Hover Highlighting

Set `.EnableHover(true)` on the Gantt builder to highlight tree grid rows, chart taskbars, header cells, and timeline cells when the mouse hovers over them:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .EnableHover(true)
    .AllowSelection(true)
    .SelectionSettings(ss => ss
        .Mode(Syncfusion.EJ2.Grids.SelectionMode.Row)
        .Type(Syncfusion.EJ2.Grids.SelectionType.Multiple))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Child("SubTasks"))
    .Render()
```

---

## Row Selection

### Select a Row on Initial Load

Use `.SelectedRowIndex(n)` on the Gantt builder to pre-select a row when the component first renders. The index is **0-based**:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .AllowSelection(true)
    .SelectedRowIndex(3)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Child("SubTasks"))
    .Render()
```

---

### Select a Row Dynamically

Use `selectionModule.selectRow(index)` to select a single row, or `selectionModule.selectRows(indexes)` to select multiple rows programmatically:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .AllowSelection(true)
    .SelectionSettings(ss => ss
        .Mode(Syncfusion.EJ2.Grids.SelectionMode.Row)
        .Type(Syncfusion.EJ2.Grids.SelectionType.Multiple))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Child("SubTasks"))
    .Render()

<script>
function selectSingleRow() {
    var ganttObj = document.getElementById('gantt').ej2_instances[0];
    ganttObj.selectionModule.selectRow(2);        // select row at index 2
}

function selectMultipleRows() {
    var ganttObj = document.getElementById('gantt').ej2_instances[0];
    ganttObj.selectionModule.selectRows([1, 2, 3]); // select rows at indexes 1, 2, 3
}
</script>
```

---

### Multiple Row Selection

Set `Type(Syncfusion.EJ2.Grids.SelectionType.Multiple)` on `.SelectionSettings()` to allow selecting more than one row. Hold **Ctrl** while clicking to add rows to the selection:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .AllowSelection(true)
    .SelectionSettings(ss => ss
        .Mode(Syncfusion.EJ2.Grids.SelectionMode.Row)
        .Type(Syncfusion.EJ2.Grids.SelectionType.Multiple))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Child("SubTasks"))
    .Render()
```

> Multiple row selection is also required to enable multi-row drag-and-drop (`AllowRowDragAndDrop`).

---

### Conditional Row Selection

Use `selectionModule.selectRows()` inside the `DataBound` event to select specific rows based on data conditions on initial load:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .AllowSelection(true)
    .DataBound("dataBound")
    .SelectionSettings(ss => ss
        .Mode(Syncfusion.EJ2.Grids.SelectionMode.Row)
        .Type(Syncfusion.EJ2.Grids.SelectionType.Multiple))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Child("SubTasks"))
    .Render()

<script>
function dataBound(args) {
    var ganttObj = document.getElementById('gantt').ej2_instances[0];
    var rowIndexes = [];
    ganttObj.treeGrid.grid.dataSource.forEach(function (data, index) {
        if (data.TaskId === 3 || data.TaskId === 4) {
            rowIndexes.push(index);
        }
    });
    ganttObj.selectionModule.selectRows(rowIndexes);
}
</script>
```

---

### Customize Row Selection Action

The `RowSelecting` event fires before a row is selected. Use `args.cancel = true` to prevent selection of a specific row. The `RowSelected` event fires after the selection completes.

When a row is deselected, `RowDeselecting` fires before and `RowDeselected` fires after.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .AllowSelection(true)
    .RowSelecting("rowSelecting")
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Child("SubTasks"))
    .Render()

<script>
function rowSelecting(args) {
    if (args.rowIndex === 3) {
        args.cancel = true;   // prevent selection of row at index 3
    }
}
</script>
```

| Event | Trigger point | Key `args` properties |
|---|---|---|
| `RowSelecting` | Before row selection completes | `rowIndex`, `data`, `cancel` |
| `RowSelected` | After row selection completes | `rowIndex`, `data` |
| `RowDeselecting` | Before row deselection completes | `rowIndex`, `data`, `cancel` |
| `RowDeselected` | After row deselection completes | `rowIndex`, `data` |

---

## Cell Selection

Set `Mode(Syncfusion.EJ2.Grids.SelectionMode.Cell)` on `.SelectionSettings()` to enable cell-level selection. Use `getSelectedRowCellIndexes()` to retrieve selected cell information:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .AllowSelection(true)
    .SelectionSettings(ss => ss
        .Mode(Syncfusion.EJ2.Grids.SelectionMode.Cell)
        .Type(Syncfusion.EJ2.Grids.SelectionType.Single))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Child("SubTasks"))
    .Render()
```

> Cell-based selection is **not supported** when virtualization is enabled.

---

### Multiple Cell Selection

Set `Type(Syncfusion.EJ2.Grids.SelectionType.Multiple)` with `Mode(Cell)` to allow selecting more than one cell. Hold **Ctrl** while clicking to add cells to the selection:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .AllowSelection(true)
    .SelectionSettings(ss => ss
        .Mode(Syncfusion.EJ2.Grids.SelectionMode.Cell)
        .Type(Syncfusion.EJ2.Grids.SelectionType.Multiple))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Child("SubTasks"))
    .Render()
```

---

### Select a Cell Dynamically

Use `selectionModule.selectCell(cellIndex)` to select a cell programmatically:

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.selectionModule.selectCell(2);   // select cell at index 2
```

---

### Customize Cell Selection Action

The `CellSelecting` event fires when a cell selection begins. Use `args.cancel = true` to prevent selection of a specific cell. The `CellSelected` event fires after the selection completes.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .AllowSelection(true)
    .CellSelecting("cellSelecting")
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Child("SubTasks"))
    .Render()

<script>
function cellSelecting(args) {
    if (args.cellIndex === 3) {
        args.cancel = true;   // prevent selection of cell at index 3
    }
}
</script>
```

| Event | Trigger point | Key `args` properties |
|---|---|---|
| `CellSelecting` | Before cell selection completes | `cellIndex`, `rowIndex`, `cancel` |
| `CellSelected` | After cell selection completes | `cellIndex`, `rowIndex` |

---

## Get Selected Row Indexes and Records

Use `getSelectedRowIndexes()` to retrieve the indexes of all selected rows, and `getSelectedRecords()` to retrieve the full data objects of selected rows:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .AllowSelection(true)
    .RowSelected("rowSelected")
    .SelectionSettings(ss => ss
        .Mode(Syncfusion.EJ2.Grids.SelectionMode.Row)
        .Type(Syncfusion.EJ2.Grids.SelectionType.Multiple))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Child("SubTasks"))
    .Render()

<script>
function rowSelected(args) {
    var ganttObj = document.getElementById('gantt').ej2_instances[0];
    var selectedIndexes = ganttObj.selectionModule.getSelectedRowIndexes(); // [0, 2, 3]
    var selectedRecords = ganttObj.selectionModule.getSelectedRecords();    // task data objects
    console.log(selectedIndexes);
    console.log(selectedRecords);
}
</script>
```

---

## Clear Selection

Call `clearSelection()` on the Gantt instance to deselect all currently selected rows or cells:

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
ganttObj.selectionModule.selectRows([1, 2, 3]);
ganttObj.clearSelection();   // deselect all
```

---

## Hierarchy Checkbox Mode

The hierarchy checkbox mode controls how checkbox selection propagates across parent and child task records in the hierarchy. When you enable checkbox selection combined with a hierarchy mode, selecting a parent or child checkbox automatically manages the selection state of related records.

Set `HierarchyCheckboxMode` to `Self`, `Hierarchy`, or `FilteredHierarchy`. The default is `Hierarchy`. This setting controls checkbox propagation; enable selection and define a checkbox column as well.

| API | Type | Default | Requirement |
|---|---|---|---|
| `HierarchyCheckboxMode` | `string` | `Hierarchy` | Use with checkbox selection and a checkbox column |

### Enable Checkbox Selection with Hierarchy Mode

First, add a checkbox column. Then use `HierarchyCheckboxMode` to define how selection propagates:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .Height("450px")
    .AllowSelection(true)
    .CheckboxSelection(true)  // Enable checkbox selection
    .SelectionSettings(ss => ss
        .Mode(Syncfusion.EJ2.Grids.SelectionMode.Row)
        .Type(Syncfusion.EJ2.Grids.SelectionType.Multiple)
    )
    .HierarchyCheckboxMode("Hierarchy")   // Propagate selection through hierarchy
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Child("SubTasks")
    )
    .Columns(col =>
        {
            col.Field("CheckBox").HeaderText("").ShowCheckbox(true).Width(70).AllowFiltering(false).Add();
            col.Field("TaskId").Visible(false).Add();
            col.Field("TaskName").Width(260).HeaderText("Task Name").AllowReordering(false).Add();
            col.Field("StartDate").HeaderText("Start Date").Width(140).Add();
            col.Field("Predecessor").Width(190).HeaderText("Predecessor").Add();
            col.Field("Duration").HeaderText("Duration").AllowEditing(false).Add();
            col.Field("Progress").HeaderText("Progress").Add();
        })
    .Render()
```

### Hierarchy Checkbox Mode Values

| Mode | Description | Behavior |
|------|-------------|----------|
| `Self` | Selection applies to clicked record only | Selecting a parent does **not** select its children; selecting a child does **not** affect the parent |
| `Hierarchy` | Selection propagates through the entire hierarchy (default for checkbox) | Selecting a parent selects all descendants; selecting a child updates ancestor states accordingly |
| `FilteredHierarchy` | Selection propagates only within the currently visible filtered results | Selecting a parent in filtered view selects only visible descendants; hidden records remain unaffected |

The checkbox column can also be declared explicitly with `Field("CheckBox").ShowCheckbox(true)`. Keep the checkbox column and hierarchy mode configuration together so the mode applies to checkbox interactions.

### Mode Behavior: Self

In `Self` mode, checkbox selection is independent for each record. No automatic propagation occurs:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .CheckboxSelection(true)
    .HierarchyCheckboxMode("Self")
    .SelectionSettings(ss => ss
        .Type(Syncfusion.EJ2.Grids.SelectionType.Multiple)
    )
    .Columns(col =>
        {
            col.Field("CheckBox").HeaderText("").ShowCheckbox(true).Width(70).AllowFiltering(false).Add();
            col.Field("TaskId").Visible(false).Add();
            col.Field("TaskName").Width(260).HeaderText("Task Name").AllowReordering(false).Add();
            col.Field("StartDate").HeaderText("Start Date").Width(140).Add();
            col.Field("Predecessor").Width(190).HeaderText("Predecessor").Add();
            col.Field("Duration").HeaderText("Duration").AllowEditing(false).Add();
            col.Field("Progress").HeaderText("Progress").Add();
        })
    .Render()
```

**Example:**
- When you select the parent "Project", only the "Project" row is checked.
- Child rows remain unchecked.
- Selecting a child row does not affect the parent's checkbox state.

### Mode Behavior: Hierarchy

In `Hierarchy` mode, selecting a parent automatically selects all descendant tasks. Selecting a child updates the parent's state based on how many children are selected:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .CheckboxSelection(true)
    .HierarchyCheckboxMode("Hierarchy")
    .SelectionSettings(ss => ss
        .Type(Syncfusion.EJ2.Grids.SelectionType.Multiple)
    )
    .Columns(col =>
        {
            col.Field("CheckBox").HeaderText("").ShowCheckbox(true).Width(70).AllowFiltering(false).Add();
            col.Field("TaskId").Visible(false).Add();
            col.Field("TaskName").Width(260).HeaderText("Task Name").AllowReordering(false).Add();
            col.Field("StartDate").HeaderText("Start Date").Width(140).Add();
            col.Field("Predecessor").Width(190).HeaderText("Predecessor").Add();
            col.Field("Duration").HeaderText("Duration").AllowEditing(false).Add();
            col.Field("Progress").HeaderText("Progress").Add();
        })
    .Render()
```

**Selection propagation rules:**

- **Selecting a parent checkbox**: All child rows (direct and indirect descendants) are checked.
- **Deselecting a parent checkbox**: All child rows are unchecked.
- **Selecting a child checkbox**: The selection state of ancestor records is updated according to the hierarchy selection rules.
- **Deselecting all children**: The parent checkbox becomes unchecked.

**Example with data:**
```
Project (Parent)
├── Design (Child 1)
│   ├── Mockup (Grandchild 1.1)
│   └── Prototype (Grandchild 1.2)
├── Development (Child 2)
│   ├── Backend (Grandchild 2.1)
│   └── Frontend (Grandchild 2.2)
└── Testing (Child 3)
```

When you check "Project":
- All 8 rows (Project + 2 children + 5 grandchildren) are checked.

When only some descendants are selected, ancestor selection state reflects the resulting hierarchy selection.

### Mode Behavior: FilteredHierarchy

In `FilteredHierarchy` mode, hierarchy selection propagation applies only to visible (non-filtered-out) records. Hidden records are not affected:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .AllowFiltering(true)
    .CheckboxSelection(true)
    .HierarchyCheckboxMode("FilteredHierarchy")
    .SelectionSettings(ss => ss
        .Type(Syncfusion.EJ2.Grids.SelectionType.Multiple)
    )
    .Columns(col =>
        {
            col.Field("CheckBox").HeaderText("").ShowCheckbox(true).Width(70).AllowFiltering(false).Add();
            col.Field("TaskId").Visible(false).Add();
            col.Field("TaskName").Width(260).HeaderText("Task Name").AllowReordering(false).Add();
            col.Field("StartDate").HeaderText("Start Date").Width(140).Add();
            col.Field("Predecessor").Width(190).HeaderText("Predecessor").Add();
            col.Field("Duration").HeaderText("Duration").AllowEditing(false).Add();
            col.Field("Progress").HeaderText("Progress").Add();
        })
    .Render()
```

**Behavior:**
- When you filter tasks by status = "Active", only active rows are visible.
- Selecting a parent in the filtered view selects only its visible children.
- Child rows hidden by the filter remain unchanged (not selected).
- When you clear the filter, previously hidden records appear with their original selection state.

**Example:**

Original state:
- All 10 tasks: 3 checked, 7 unchecked.

After filtering to show only Active tasks (5 tasks visible):
- You select "Project" checkbox.
- Only the 3 visible descendants of "Project" are checked.
- The 4 inactive descendants remain unchecked (still hidden by filter).

After clearing filter:
- The 3 active descendants remain checked.
- The 4 inactive descendants remain unchecked.

### Interaction with Other Features

#### Virtualization

When virtual scrolling is enabled, hierarchy checkbox mode still works correctly:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.LargeDataSet)
    .EnableVirtualization(true)
    .CheckboxSelection(true)
    .HierarchyCheckboxMode("Hierarchy")
    .Render()
```

- Selection state is preserved as you scroll.
- Indeterminate parent states are calculated correctly based on child selection.

#### Sorting

When rows are sorted, the hierarchy checkbox mode still propagates selection correctly:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .AllowSorting(true)
    .CheckboxSelection(true)
    .HierarchyCheckboxMode("Hierarchy")
    .Render()
```

- Sorting does not change the hierarchy structure or selection behavior.
- Parent-child relationships are preserved regardless of sort order.

#### Expanding and Collapsing

When parent tasks are collapsed, child checkboxes are hidden but their selection state is preserved:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .CheckboxSelection(true)
    .HierarchyCheckboxMode("Hierarchy")
    .Columns(col =>
        {
            col.Field("CheckBox").HeaderText("").ShowCheckbox(true).Width(70).AllowFiltering(false).Add();
            col.Field("TaskId").Visible(false).Add();
            col.Field("TaskName").Width(260).HeaderText("Task Name").AllowReordering(false).Add();
            col.Field("StartDate").HeaderText("Start Date").Width(140).Add();
            col.Field("Predecessor").Width(190).HeaderText("Predecessor").Add();
            col.Field("Duration").HeaderText("Duration").AllowEditing(false).Add();
            col.Field("Progress").HeaderText("Progress").Add();
        })
    .Render()
```

- Collapsing a parent with checked children shows the parent as checked.
- Expanding reveals that children are still checked.
- Unchecking a collapsed parent unchecks all its children, even though they are not visible.

#### Paging

With paging, interpret checkbox propagation against the loaded data subset. Use `FilteredHierarchy` when selection should be limited to records available in the current filtered or page-scoped view. Verify behavior when changing pages, because records outside the loaded subset are not part of the current page interaction.

#### Row and Cell Selection

Hierarchy mode governs checkbox propagation and is configured separately from ordinary row or cell selection. Checkbox selection can be combined with multiple row selection. Cell selection remains independent; checking a hierarchy row does not imply that its cells are selected.

### Getting Selected Records with Hierarchy Mode

When using hierarchy checkbox mode, use the same methods to retrieve selected rows:

```javascript
var ganttObj = document.getElementById('gantt').ej2_instances[0];
var selectedIndexes = ganttObj.selectionModule.getSelectedRowIndexes();
var selectedRecords = ganttObj.selectionModule.getSelectedRecords();
```

Use the selection APIs to retrieve selected indexes and records after hierarchy propagation. Verify whether an operation should include hidden descendants, particularly when filtering, collapsing, or paging is enabled.

### Best Practices

1. **Choose the Right Mode**: Use `Hierarchy` for projects where selecting a phase should select all related activities. Use `Self` for independent task selection.

2. **Document Selection Behavior**: Clearly communicate to users whether selecting a task will automatically select its subtasks.

3. **Validate Before Bulk Operations**: When performing actions on selected tasks (e.g., bulk edit, bulk delete), verify the selection includes all intended records, especially with `FilteredHierarchy`.

4. **Test Filtering Combinations**: After enabling `FilteredHierarchy`, test selecting, filtering, clearing, and re-filtering to ensure selection state is preserved correctly.

5. **Test Combined Views**: Test expanded and collapsed rows, filtering, sorting, virtualization, and paging together when those features are enabled.

---

## Touch Interaction

The Gantt Chart supports touch-based selection on mobile and tablet devices:

- **Single row selection:** Tap a row to select it.
- **Multiple row selection:** When you tap a row, a popup appears indicating the multi-row selection option. Tap the popup, then tap additional rows to build a multi-row selection.

Touch interaction follows the same `SelectionSettings.Mode` and `SelectionSettings.Type` configuration as pointer-based selection.
