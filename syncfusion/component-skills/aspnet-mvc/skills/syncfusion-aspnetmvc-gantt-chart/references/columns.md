# Columns — Syncfusion ASP.NET MVC Gantt Chart

## Table of Contents
- [Defining Columns](#defining-columns)
- [Column Properties Reference](#column-properties-reference)
- [Custom Column Header](#custom-column-header)
- [Column Template](#column-template)
- [Column Type](#column-type)
- [Column Format](#column-format)
- [Checkbox Column](#checkbox-column)
- [Serial Number Column](#serial-number-column)
- [Show or Hide Columns Dynamically](#show-or-hide-columns-dynamically)
- [Controlling Column Actions](#controlling-column-actions)
- [Frozen Columns](#frozen-columns)
- [Column Reordering](#column-reordering)
- [Column Resizing](#column-resizing)
- [Column Spanning](#column-spanning)
- [Responsive Columns](#responsive-columns)
- [WBS Column](#wbs-column)
- [Column Menu](#column-menu)
- [TreeColumnIndex](#treecolumnindex)

---

## Defining Columns

Use `.Columns()` to explicitly define which columns appear in the TreeGrid section. If omitted, Gantt auto-generates columns from `TaskFields`.

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .EndDate("EndDate").Duration("Duration").Progress("Progress")
        .Child("SubTasks")
    )
    .Columns(col =>
    {
        col.Field("TaskId").HeaderText("ID").Width("60").TextAlign(Syncfusion.EJ2.Grids.TextAlign.Right).IsPrimaryKey(true).Add();
        col.Field("TaskName").HeaderText("Task Name").Width("250").ClipMode(Syncfusion.EJ2.Grids.ClipMode.EllipsisWithTooltip).Add();
        col.Field("StartDate").HeaderText("Start").Width("120").Format("yMd").Add();
        col.Field("Duration").HeaderText("Days").Width("80").TextAlign(Syncfusion.EJ2.Grids.TextAlign.Right).Add();
        col.Field("Progress").HeaderText("Progress").Width("100").TextAlign(Syncfusion.EJ2.Grids.TextAlign.Right).Add();
    })
    .Render()
```

---

## Column Properties Reference

| Property | Type | Description |
|---|---|---|
| `Field` | string | Maps to the data model property name |
| `HeaderText` | string | Column header label |
| `Width` | number/string | Column width in pixels or percentage |
| `TextAlign` | enum | `Left` \| `Right` \| `Center` \| `Justify` |
| `Format` | string | Date/number format (e.g., `yMd`, `C2`, `n2`) |
| `IsPrimaryKey` | bool | Must be `true` on the ID column for CRUD |
| `Visible` | bool | Show or hide the column |
| `AllowEditing` | bool | Allow cell editing for this column |
| `AllowSorting` | bool | Allow sorting on this column |
| `AllowFiltering` | bool | Allow filtering on this column |
| `ClipMode` | enum | `Clip` \| `Ellipsis` \| `EllipsisWithTooltip` |
| `EditType` | string | `numericedit` \| `defaultedit` \| `dropdownedit` \| `booleanedit` \| `datepickeredit` |
| `Freeze` | string | `Left` \| `Right` to freeze the column |
| `MinWidth` | number | Minimum column width during resizing |
| `MaxWidth` | number | Maximum column width during resizing |

---

## Custom Column Header

Use `HeaderText` for a simple rename, or `HeaderTemplate` for rich HTML content:

```cshtml
@* Simple header rename *@
col.Field("TaskName").HeaderText("Activity Description").Width("250").Add();

@* Header with template *@
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.dataSource)
    .Height("450px")
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .EndDate("EndDate").Duration("Duration").Progress("Progress").Child("SubTasks")
    )
    .Columns(col =>
    {
        col.Field("TaskName").HeaderTemplate("#projectName").Width("150").Add();
        col.Field("StartDate").HeaderTemplate("#dateTemplate").Width("150").Add();
        col.Field("Duration").HeaderTemplate("#durationTemplate").Width("150").Add();
        col.Field("Progress").HeaderTemplate("#progressTemplate").Width("150").Add();
    })
    .Render()

<script type="text/x-template" id="projectName">
    <div><img src="taskname.png" width="20" height="20" class="e-image" />  Task Name</div>
</script>
<script type="text/x-template" id="dateTemplate">
    <div><img src="startdate.png" width="20" height="20" class="e-image" />  Start Date</div>
</script>
<script type="text/x-template" id="durationTemplate">
    <div><img src="duration.png" width="20" height="20" class="e-image" />  Duration</div>
</script>
<script type="text/x-template" id="progressTemplate">
    <div><img src="progress.png" width="20" height="20" class="e-image" />  Progress</div>
</script>
```

> Header templates use `type="text/x-template"` script blocks. Reference them by script ID string on `HeaderTemplate` (e.g., `HeaderTemplate("#projectName")`).

---

## Column Template

Render custom HTML inside cells using a column template — reference a script ID string via the `Template` builder method:

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.dataSource)
    .Height("450px")
    .Resources((IEnumerable<object>)ViewBag.projectResources)
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .EndDate("EndDate").Duration("Duration").Progress("Progress")
        .Child("SubTasks").ResourceInfo("ResourceId")
    )
    .ResourceFields(rf => rf.Id("ResourceId").Name("ResourceName"))
    .Columns(col =>
    {
        col.Field("TaskId").HeaderText("Task Id").Width("50").Add();
        col.Field("TaskName").HeaderText("Task Name").Width("250").Add();
        col.Field("ResourceId").HeaderText("Resources").Template("#columnTemplate").Add();
        col.Field("StartDate").Add();
        col.Field("Duration").Add();
        col.Field("Progress").Add();
    })
    .Render()

<script type="text/x-jsrender" id="columnTemplate">
    ${if(ganttProperties.resourceNames)}
    <div class="image">
        <img src="${TaskID}.png" style="height:40px;width:40px" />
        <div style="display:inline-block;width:100%;position:relative;left:30px;top:-14px">
            ${ganttProperties.resourceNames}
        </div>
    </div>
    ${/if}
</script>
```

> Column templates use `type="text/x-jsrender"` script blocks. Reference them by script ID string on `Template` (e.g., `Template("#columnTemplate")`). Access gantt-computed values via `${ganttProperties.resourceNames}`, and raw task fields via `${TaskName}`, `${Progress}`, etc.

---

## Column Type

Use `Type` on the column builder to specify the data type of a column. If `Format` is defined, Gantt uses `Type` to choose between number or date formatting.

Supported types:
- `string`
- `number`
- `boolean`
- `date`
- `dateTime`

```cshtml
col.Field("Progress").Type("number").HeaderText("Progress").Width("100").Add();
col.Field("StartDate").Type("date").HeaderText("Start Date").Format("yMd").Width("120").Add();
col.Field("IsActive").Type("boolean").HeaderText("Active").DisplayAsCheckBox(true).Width("80").Add();
```

> If `Type` is not defined, it is inferred from the first record of `DataSource`. If the first record has a `null`/blank value for a column, explicitly define the `Type` for that column.

---

## Column Format

Format cell values using the `Format` builder method. Gantt uses the `Internationalization` library for number and date values. Default culture is `en-US`.

### Number Formatting

| Format | Description |
|--------|-------------|
| `N` | Numeric — followed by precision integer (e.g., `N2`, `N3`) |
| `C` | Currency — followed by precision integer (e.g., `C2`, `C3`) |
| `P` | Percentage — input must be in range 0–100; `0.2` renders as `20%` (e.g., `P2`) |

```cshtml
col.Field("Cost").Format("C2").TextAlign(Syncfusion.EJ2.Grids.TextAlign.Right).Width("100").Add();
col.Field("Progress").Format("P2").TextAlign(Syncfusion.EJ2.Grids.TextAlign.Right).Width("100").Add();
```

### Date Formatting

Pass a built-in skeleton string or a custom format object to `Format`:

| Format | Rendered Value |
|--------|---------------|
| `{ type:'date', format:'dd/MM/yyyy' }` | 04/07/2019 |
| `{ type:'date', format:'dd.MM.yyyy' }` | 04.07.2019 |
| `{ type:'date', skeleton:'short' }` | 7/4/19 |
| `{ type:'dateTime', format:'dd/MM/yyyy hh:mm a' }` | 04/07/2019 12:00 AM |
| `{ type:'dateTime', format:'MM/dd/yyyy hh:mm:ss a' }` | 07/04/2019 12:00:00 AM |

```cshtml
@* Built-in skeleton *@
col.Field("StartDate").Format("yMd").Width("120").Add();

@* Custom format object — pass as a JSON string *@
col.Field("StartDate").Format("{ type:'date', format:'dd/MM/yyyy' }").Width("120").Add();
```

---

## Checkbox Column

Add a boolean checkbox column for selection or boolean data fields:

```cshtml
col.Field("IsCompleted").HeaderText("Done")
   .EditType("booleanedit")
   .DisplayAsCheckBox(true)
   .Width("80").TextAlign(Syncfusion.EJ2.Grids.TextAlign.Center).Add();
```

To show a selection checkbox column (for multi-select), use the built-in `CheckboxSelection` property on the Gantt itself:

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .CheckboxSelection(true)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Render()
```

---

## Serial Number Column

The built-in serial number column generates sequential numbers for rows in the current visible order. It does not require a serial-number field in the task data. Enable the feature with `EnableSerialNumber(true)` and declare a column with `Field("SerialNumber")`.

| Configuration | Type | Default | Requirement |
|---|---|---|---|
| `EnableSerialNumber` | `bool` | `false` | Set to `true` to enable generated row numbering |
| Column `Field` | `string` | None | Add a dedicated column with the value `SerialNumber` |

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .EnableSerialNumber(true)
    .TaskFields(tf => tf
        .Id("TaskID").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Progress("Progress").ParentID("ParentID")
    )
    .Columns(col =>
    {
        col.Field("SerialNumber").HeaderText("S.No").Width("80").Add();
        col.Field("TaskID").HeaderText("ID").Width("90").Add();
        col.Field("TaskName").HeaderText("Task Name").Width("250").Add();
        col.Field("StartDate").HeaderText("Start Date").Width("140").Add();
        col.Field("Duration").Width("100").Add();
    })
    .Render()
```

### Serial Number Behavior

Numbers reflect the rendered row order, not the original order or a persisted task identifier. Gantt recalculates them when visible rows change, including sorting, filtering or searching, expanding or collapsing parent tasks, indenting or outdenting, CRUD operations, row drag and drop, and data refresh. The feature supports hierarchical data and keeps numbering aligned with the visible rows during virtualization.

### Paging and Other Viewport-Based Operations

The serial number feature is based on the current visible row sequence. The Gantt reference does not specify whether numbers continue across pages or restart on each page when paging is integrated through the grid. Verify the desired page behavior in the application, and do not use the generated value as a stable identifier. Apply the same check when combining serial numbering with other viewport-based rendering modes.

### Limitations and Best Practices

- The generated number is not stored in the task data and should not be used as a primary key or business identifier.
- Use the underlying task fields for sorting and filtering; the serial number is a display index that changes when row visibility or order changes.
- Keep the column narrow and place it near the start of the column list when it is intended as a row index.
- Test filters, search, hierarchy expand/collapse, row drag and drop, virtualization, and any paging integration together if those operations are enabled.

---

## Show or Hide Columns Dynamically

Use the `showColumn` and `hideColumn` methods to toggle column visibility programmatically via external buttons. Pass the column's `HeaderText` value to identify the column.

```cshtml
<button onclick="show()">Show</button>
<button onclick="hide()">Hide</button>

@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .EndDate("EndDate").Duration("Duration").Progress("Progress").Child("SubTasks")
    )
    .Columns(col =>
    {
        col.Field("TaskId").HeaderText("Task Id").Width("100").Add();
        col.Field("TaskName").HeaderText("Task Name").Width("250").Add();
        col.Field("StartDate").HeaderText("Start Date").Width("150").Add();
        col.Field("Duration").HeaderText("Duration").Width("100").Add();
        col.Field("Progress").HeaderText("Progress").Width("100").Add();
    })
    .Render()

<script>
function show() {
    var ganttObj = document.getElementById('Gantt').ej2_instances[0];
    ganttObj.showColumn(['Progress']);   // pass headerText values
}
function hide() {
    var ganttObj = document.getElementById('Gantt').ej2_instances[0];
    ganttObj.hideColumn(['Progress']);  // pass headerText values
}
</script>
```

> Pass the column **HeaderText** (not the field name) to `showColumn`/`hideColumn`.

---

## Controlling Column Actions

Enable or disable specific Gantt actions per column using boolean builder methods on each column:

| Method | Description |
|----------|-------------|
| `AllowFiltering` | Enables or disables filtering for the column |
| `AllowSorting` | Enables or disables sorting for the column |
| `AllowReordering` | Enables or disables drag reordering for the column |
| `AllowEditing` | Enables or disables cell editing for the column |

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .AllowFiltering(true).AllowSorting(true).AllowReordering(true)
    .EditSettings(es => es.AllowEditing(true))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .EndDate("EndDate").Duration("Duration").Progress("Progress").Child("SubTasks")
    )
    .Columns(col =>
    {
        col.Field("TaskId").HeaderText("Task Id").IsPrimaryKey(true).Width("100").Add();
        col.Field("TaskName").HeaderText("Task Name").AllowSorting(false).AllowFiltering(false).Width("250").Add();
        col.Field("StartDate").HeaderText("Start Date").AllowEditing(false).Width("150").Add();
        col.Field("Duration").HeaderText("Duration").AllowReordering(false).Width("100").Add();
        col.Field("Progress").HeaderText("Progress").Width("100").Add();
    })
    .Render()
```

---

## Frozen Columns

Pin columns to the left or right so they remain visible when scrolling horizontally. Use the `FrozenColumns` property to freeze the first N columns from the left:

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .FrozenColumns(2)
    .Height("450px")
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Render()
```

### Freeze Particular Columns

Use the `IsFrozen` builder method at the column level to freeze a specific column at any desired index on the left side:

```cshtml
col.Field("TaskId").IsFrozen(true).Width("60").Add();
col.Field("TaskName").IsFrozen(true).Width("200").Add();
```

### Freeze Direction

Use the `Freeze` builder method to position frozen columns on the left, right, or in a fixed position:

| Value | Description |
|-------|-------------|
| `Left` | Freezes the column on the left side |
| `Right` | Freezes the column on the right side |
| `Fixed` | Locks the column at a fixed position — always visible during horizontal scroll |

```cshtml
col.Field("TaskId").Freeze("Left").Width("60").Add();
col.Field("TaskName").Freeze("Left").Width("200").Add();
col.Field("StartDate").Width("120").Add();
col.Field("Progress").Freeze("Fixed").Width("100").Add();
col.Field("Resources").Freeze("Right").Width("150").Add();
```

> The `Freeze` direction is not compatible when both `IsFrozen` and `FrozenColumns` properties are enabled simultaneously.

### Change Default Frozen Line Color

Customize the frozen border color using CSS:

```css
/* Left frozen columns */
.e-gantt .e-leftfreeze.e-freezeleftborder {
    border-right-color: rgb(0, 255, 0) !important;
}

/* Right frozen columns */
.e-gantt .e-rightfreeze.e-freezerightborder {
    border-left-color: rgb(0, 0, 255) !important;
}
```

---

## Column Reordering

Allow users to drag and drop columns to reorder them. Set `AllowReordering(true)` on the Gantt:

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .AllowReordering(true)
    .Height("450px")
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Render()
```

> To disable reordering for a specific column, call `AllowReordering(false)` on that column builder.

### Reorder Events

| Event | Trigger |
|-------|---------|
| `ColumnDragStart` | When column header drag starts |
| `ColumnDrag` | While column header is being dragged continuously |
| `ColumnDrop` | When a column header is dropped on the target column |

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .AllowReordering(true)
    .ColumnDragStart("onColumnDragStart")
    .ColumnDrag("onColumnDrag")
    .ColumnDrop("onColumnDrop")
    .Height("450px")
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Render()

<script>
function onColumnDragStart(args) { console.log('Drag started', args.column.headerText); }
function onColumnDrag(args)      { console.log('Dragging',      args.column.headerText); }
function onColumnDrop(args)      { console.log('Dropped',       args.column.headerText); }
</script>
```

### Reorder Multiple Columns

Use the `reorderColumns` method to reorder multiple columns at once programmatically:

```javascript
var ganttObj = document.getElementById('Gantt').ej2_instances[0];
// Move 'TaskId' and 'TaskName' columns to position after 'Duration'
ganttObj.reorderColumns(['TaskId', 'TaskName'], 'Duration');
```

---

## Column Resizing

Allow users to resize column widths by clicking and dragging the right edge of the column header. Double-clicking the right edge auto-fits the column to its widest cell content. Set `AllowResizing(true)` on the Gantt:

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .AllowResizing(true)
    .Height("450px")
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Render()
```

> To disable resizing for a specific column, call `AllowResizing(false)` on that column builder.

### Minimum and Maximum Column Width

Restrict how far a column can be resized using `MinWidth` and `MaxWidth` per column:

```cshtml
col.Field("TaskName").MinWidth("100").MaxWidth("400").Width("200").Add();
col.Field("Duration").MinWidth("60").MaxWidth("200").Width("100").Add();
```

### Touch Interaction

On touch devices, tapping the right edge of a column header reveals a floating resize handler. Drag the floating handler to resize the column.

---

## Column Spanning

Merge adjacent cells in a row to span multiple columns using the `QueryCellInfo` event:

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .QueryCellInfo("queryCellInfo")
    .Height("450px")
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Render()

<script>
function queryCellInfo(args) {
    if (args.column.field === 'TaskName' && args.data.TaskId === 1) {
        args.colSpan = 2;  // span TaskName across 2 columns
    }
}
</script>
```

---

## Responsive Columns

Hide columns on smaller screen widths using `HideAtMedia`:

```cshtml
col.Field("Notes").HeaderText("Notes").HideAtMedia("(max-width: 768px)").Width("200").Add();
```

The column is automatically hidden when the viewport width matches the media query.

---

## WBS Column

Display a Work Breakdown Structure (WBS) code column — automatically generated hierarchy codes. Enable WBS with `EnableWBS(true)` and `EnableAutoWbsUpdate(true)` on the Gantt, then add `WBSCode` and `WBSPredecessor` columns. Use a flat (parent-ID) data binding with `ParentID` in task fields:

```cshtml
@Html.EJS().Gantt("GanttChart")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("550px")
    .EnableWBS(true)
    .EnableAutoWbsUpdate(true)
    .TreeColumnIndex(2)
    .AllowSorting(true).AllowFiltering(true)
    .Toolbar(new List<string> { "Add", "Edit", "Update", "Delete", "Cancel", "ExpandAll", "CollapseAll", "Indent", "Outdent" })
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Progress("Progress").Dependency("Predecessor").ParentID("ParentID")
    )
    .EditSettings(es => es
        .AllowAdding(true).AllowEditing(true).AllowDeleting(true)
        .AllowTaskbarEditing(true).ShowDeleteConfirmDialog(true)
    )
    .SplitterSettings(sp => sp.ColumnIndex(4))
    .Columns(col =>
    {
        col.Field("TaskId").HeaderText("Task ID").Visible(false).Add();
        col.Field("WBSCode").HeaderText("WBS Code").Width("150").Add();
        col.Field("TaskName").HeaderText("Task Name").Width("260").Add();
        col.Field("StartDate").HeaderText("Start Date").Width("140").Add();
        col.Field("WBSPredecessor").HeaderText("WBS Predecessor").Width("190").Add();
        col.Field("Duration").HeaderText("Duration").AllowEditing(false).Add();
        col.Field("Progress").HeaderText("Progress").Add();
    })
    .Render()
```

| Property | Description |
|---|---|
| `EnableWBS` | Enables WBS code generation |
| `EnableAutoWbsUpdate` | Automatically recalculates WBS codes when tasks are reordered via drag-and-drop |
| `WBSCode` | Auto-generated column field (e.g., `1`, `1.1`, `1.1.1`) |
| `WBSPredecessor` | Auto-generated column that shows predecessors using WBS codes instead of task IDs |

> WBS requires **flat (parent-ID) data binding** — use `ParentID` in `TaskFields` instead of `Child`. `WBSCode` and `WBSPredecessor` are auto-generated; do not map them in `TaskFields` or populate from the data source.

### Managing WBS Code Updates

For better performance, control when WBS codes are updated using the `ActionBegin` and `DataBound` events:

```cshtml
@Html.EJS().Gantt("GanttChart")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("550px")
    .EnableWBS(true)
    .EnableAutoWbsUpdate(false)
    .ActionBegin("actionBegin")
    .DataBound("dataBound")
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate")
        .Duration("Duration").Progress("Progress").Dependency("Predecessor").ParentID("ParentID")
    )
    .Render()

<script>
var isDragAction = false;
function actionBegin(args) {
    if (args.requestType === 'rowDragAndDrop') {
        isDragAction = true;
        var gantt = document.getElementById('GanttChart').ej2_instances[0];
        gantt.enableAutoWbsUpdate = true;
    }
}
function dataBound() {
    if (isDragAction) {
        var gantt = document.getElementById('GanttChart').ej2_instances[0];
        gantt.enableAutoWbsUpdate = false;
        isDragAction = false;
    }
}
</script>
```

### WBS Limitations

- Editing the `WBSCode` and `WBSPredecessor` columns is **not supported**.
- **Load on demand** is not supported with the WBS feature.
- `WBSCode` and `WBSPredecessor` fields **cannot be mapped** directly from the data source.

---

## Column Menu

Show a context menu on column headers for sorting, filtering, and autofit. Set `ShowColumnMenu(true)` on the Gantt:

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .ShowColumnMenu(true)
    .AllowSorting(true)
    .AllowFiltering(true)
    .Height("450px")
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Render()
```

Default column menu items:

| Item | Description |
|------|-------------|
| `SortAscending` | Sort the column in ascending order |
| `SortDescending` | Sort the column in descending order |
| `AutoFit` | Auto-fit the current column width |
| `AutoFitAll` | Auto-fit all columns |
| `Filter` | Show the filter option based on `FilterSettings.Type` |

> To disable the column menu for a specific column, call `ShowColumnMenu(false)` on that column builder.

### Column Menu Events

| Event | Trigger |
|-------|---------|
| `ColumnMenuOpen` | Before the column menu opens |
| `ColumnMenuClick` | When the user clicks a column menu item |

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .ShowColumnMenu(true)
    .ColumnMenuOpen("onColumnMenuOpen")
    .ColumnMenuClick("onColumnMenuClick")
    .Height("450px")
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Render()

<script>
function onColumnMenuOpen(args)  { console.log('Menu opening for:', args.column.headerText); }
function onColumnMenuClick(args) { console.log('Menu item clicked:', args.item.text); }
</script>
```

### Custom Column Menu Items

Add custom items to the column menu via `ColumnMenuItems`. Handle click actions in the `ColumnMenuClick` event:

```cshtml
@{
    var menuItems = new List<object> { new { text = "Clear Sorting", id = "clearSorting" } };
}

@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .ShowColumnMenu(true)
    .ColumnMenuItems(menuItems)
    .ColumnMenuClick("onColumnMenuClick")
    .Height("450px")
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Render()

<script>
function onColumnMenuClick(args) {
    if (args.item.id === 'clearSorting') {
        var ganttObj = document.getElementById('Gantt').ej2_instances[0];
        ganttObj.clearSorting();
    }
}
</script>
```

### Customize Menu Items Per Column

Hide specific menu items for particular columns using `ColumnMenuOpen`:

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .ShowColumnMenu(true)
    .AllowFiltering(true)
    .ColumnMenuOpen("onColumnMenuOpen")
    .Height("450px")
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Render()

<script>
function onColumnMenuOpen(args) {
    for (var item of args.items) {
        if (item.text === 'Filter' && args.column.headerText === 'Task Name') {
            args.hide = true;
        }
    }
}
</script>
```

---

## TreeColumnIndex

Control which column displays the expand/collapse tree icon (default is index 0 = first column):

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TreeColumnIndex(1)
    .Height("450px")
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Columns(col =>
    {
        col.Field("TaskId").HeaderText("ID").Width("60").Add();
        col.Field("TaskName").HeaderText("Task Name").Width("250").Add();
    })
    .Render()
```

> Setting `TreeColumnIndex(1)` puts the tree expand icon on "Task Name" instead of "ID".
