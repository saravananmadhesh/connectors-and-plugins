# Toolbar & Context Menu – Syncfusion ASP.NET MVC Gantt Chart

## Table of Contents
- [Built-in Toolbar Items](#built-in-toolbar-items)
- [Custom Toolbar Items](#custom-toolbar-items)
- [Built-in and Custom Items Together](#built-in-and-custom-items-together)
- [Toolbar Click Event](#toolbar-click-event)
- [Enable/Disable Toolbar Items](#enabledisable-toolbar-items)
- [Add Input Elements to Toolbar](#add-input-elements-to-toolbar)
- [Splitter Configuration](#splitter-configuration)

---

## Built-in Toolbar Items

Add built-in toolbar actions by passing their string names to `.Toolbar()`:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .EditSettings(es => es.AllowAdding(true).AllowEditing(true).AllowDeleting(true))
    .AllowSorting(true)
    .AllowFiltering(true)
    .AllowExcelExport(true)
    .AllowPdfExport(true)
    .Toolbar(new List<string>
    {
        "Add", "Edit", "Delete", "Update", "Cancel",
        "ExpandAll", "CollapseAll",
        "Indent", "Outdent",
        "PrevTimeSpan", "NextTimeSpan",
        "ZoomIn", "ZoomOut", "ZoomToFit",
        "Search",
        "ExcelExport", "CsvExport", "PdfExport",
        "Undo", "Redo"
    })
    .Render()
```

**All built-in toolbar items:**

| Item | Description |
|---|---|
| `Add` | Add a new task row |
| `Edit` | Edit selected task (opens dialog or cell) |
| `Delete` | Delete selected task |
| `Update` | Save current pending edits |
| `Cancel` | Cancel current edits |
| `ExpandAll` | Expand all parent task rows |
| `CollapseAll` | Collapse all parent task rows |
| `Indent` | Make selected task a child of the row above |
| `Outdent` | Promote selected task up one level |
| `PrevTimeSpan` | Shift timeline to previous period |
| `NextTimeSpan` | Shift timeline to next period |
| `ZoomIn` | Increase timeline zoom level |
| `ZoomOut` | Decrease timeline zoom level |
| `ZoomToFit` | Fit all tasks within current view |
| `Search` | Show search input box |
| `ExcelExport` | Export to Excel (requires `AllowExcelExport`) |
| `CsvExport` | Export to CSV (requires `AllowExcelExport`) |
| `PdfExport` | Export to PDF (requires `AllowPdfExport`) |
| `Undo` | Undo last action (requires `EnableUndoRedo`) |
| `Redo` | Redo last undone action (requires `EnableUndoRedo`) |

---

## Custom Toolbar Items

Add custom buttons with their own icons and click handlers:

```cshtml
@Html.EJS().Gantt("gantt")
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Toolbar(tb =>
    {
        tb.Text("Add").TooltipText("Add Task").Id("toolbarAdd").PrefixIcon("e-add").Add();
        tb.Text("Refresh").TooltipText("Refresh Data").Id("customRefresh").PrefixIcon("e-refresh").Add();
        tb.Type(Syncfusion.EJ2.Navigations.ItemType.Separator).Add();
        tb.Text("Custom Report").Id("customReport").Add();
    })
    .ToolbarClick("toolbarClick")
    .Render()

<script>
function toolbarClick(args) {
    var gantt = document.getElementById('gantt').ej2_instances[0];
    if (args.item.id === 'customRefresh') {
        // custom logic
        console.log('Refresh clicked');
    }
    if (args.item.id === 'customReport') {
        // generate report
    }
    if (args.item.id === 'gantt_excelexport') {
        gantt.excelExport();
    }
    if (args.item.id === 'gantt_pdfexport') {
        gantt.pdfExport();
    }
}
</script>
```

> Built-in export item IDs follow the pattern `{ganttId}_excelexport`, `{ganttId}_csvexport`, and `{ganttId}_pdfexport`. Built-in action item IDs follow `{ganttId}_{ItemKey}` (e.g., `gantt_expandall`).

---

## Built-in and Custom Items Together

Mix built-in string keys and custom item objects in the same toolbar list using `List<object>`:

```cshtml
@{
    List<object> toolbarItems = new List<object>();
    toolbarItems.Add("ExpandAll");
    toolbarItems.Add("CollapseAll");
    toolbarItems.Add(new {
        text = "Quick Filter",
        tooltipText = "Quick Filter",
        id = "toolbarfilter",
        align = "Right",
        prefixIcon = "e-quickfilter"
    });
}

@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Toolbar(toolbarItems)
    .ToolbarClick("toolbarClick")
    .Render()

<script>
function toolbarClick(args) {
    if (args.item.id === 'toolbarfilter') {
        var ganttObj = document.getElementById('gantt').ej2_instances[0];
        ganttObj.filterByColumn('TaskName', 'startswith', 'Plan');
    }
}
</script>
```

> Pass the toolbar variable using Razor syntax **without quotes** when using `List<object>`. If a toolbar item does not match a built-in key, it is treated as a custom item.

---

## Toolbar Click Event

Handle all toolbar actions in one event:

```cshtml
@Html.EJS().Gantt("gantt")
    .Toolbar(new List<string> { "Add", "Delete", "ExcelExport", "Search" })
    .ToolbarClick("onToolbarClick")
    .AllowExcelExport(true)
    .EditSettings(es => es.AllowAdding(true).AllowDeleting(true))
    .Render()

<script>
function onToolbarClick(args) {
    var gantt = document.getElementById('gantt').ej2_instances[0];
    switch (args.item.id) {
        case 'gantt_excelexport':
            gantt.excelExport();
            break;
        case 'gantt_add':
            // custom logic before add
            break;
    }
}
</script>
```

---

## Enable/Disable Toolbar Items

Dynamically enable or disable toolbar buttons at runtime:

```javascript
var gantt = document.getElementById('gantt').ej2_instances[0];

// Disable a toolbar item by ID
gantt.toolbarModule.enableItems(['gantt_delete'], false);

// Enable it again
gantt.toolbarModule.enableItems(['gantt_delete'], true);
```

> Built-in item IDs follow the pattern `{ganttId}_{ItemKey}` (e.g., `gantt_expandall`, `gantt_collapseall`). For custom items, use the `id` you defined.

---

## Add Input Elements to Toolbar

Embed EJ2 editor components (NumericTextBox, DropDownList, DatePicker, etc.) inside the toolbar using a custom item with a `template` property:

```cshtml
@{
    List<object> toolbarItems = new List<object>();
    toolbarItems.Add("ExpandAll");
    toolbarItems.Add("CollapseAll");
    toolbarItems.Add(new { type = "Input", template = "#numericTemplate", id = "numeric" });
}

@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Toolbar(toolbarItems)
    .Render()

<script type="text/x-template" id="numericTemplate">
    <input id="numericInput" type="number" />
</script>

<script>
document.addEventListener('DOMContentLoaded', function () {
    new ej.inputs.NumericTextBox({
        value: 1, min: 1, max: 100,
        change: function (args) { /* handle value change */ }
    }, '#numericInput');
});
</script>
```

---