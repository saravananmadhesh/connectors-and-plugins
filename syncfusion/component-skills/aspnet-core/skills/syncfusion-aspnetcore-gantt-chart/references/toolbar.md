# Toolbar — Syncfusion ASP.NET Core Gantt Chart

## Table of Contents
- [Built-in Toolbar Items](#built-in-toolbar-items)
- [Custom Toolbar Items](#custom-toolbar-items)
- [Built-in and Custom Items Together](#built-in-and-custom-items-together)
- [Enable / Disable Toolbar Items](#enable--disable-toolbar-items)
- [Add Input Elements to Toolbar](#add-input-elements-to-toolbar)

---

## Built-in Toolbar Items

Add the `toolbar` property with a `List<string>` of built-in keys. Gantt renders each as a button with icon and text.

| Item | Action |
|------|--------|
| `Add` | Add a new record |
| `Edit` | Edit the selected record |
| `Delete` | Delete the selected record |
| `Update` | Save the edited record |
| `Cancel` | Cancel the edit state |
| `Indent` | Indent the selected record one level |
| `Outdent` | Outdent the selected record one level |
| `ExpandAll` | Expand all rows |
| `CollapseAll` | Collapse all rows |
| `PrevTimeSpan` | Navigate timeline to the previous span |
| `NextTimeSpan` | Navigate timeline to the next span |
| `ZoomIn` | Zoom in the timeline |
| `ZoomOut` | Zoom out the timeline |
| `ZoomToFit` | Fit the timeline to the visible area |
| `Search` | Show the search box |
| `ExcelExport` | Export to Excel |
| `CsvExport` | Export to CSV |
| `PdfExport` | Export to PDF |
| `Undo` | Undo the last action |
| `Redo` | Redo the last undone action |

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           toolbar="@(new List<string>() {
               "Add","Edit","Delete","Cancel","Update",
               "Indent","Outdent",
               "ExpandAll","CollapseAll",
               "PrevTimeSpan","NextTimeSpan",
               "ZoomIn","ZoomOut","ZoomToFit",
               "Search",
               "ExcelExport","CsvExport","PdfExport",
               "Undo","Redo"
           })"
           height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowAdding="true" allowEditing="true"
                          allowDeleting="true">
    </e-gantt-editsettings>
</ejs-gantt>
```

---

## Custom Toolbar Items

Define custom toolbar items as `List<object>` entries with `text`, `tooltipText`, `id`, `align`, and optionally `prefixIcon`. Handle clicks in the `toolbarClick` event.

```cshtml
@{
    List<object> toolbarItems = new List<object>();
    toolbarItems.Add("ExpandAll");
    toolbarItems.Add("CollapseAll");
    toolbarItems.Add(new {
        text        = "Quick Filter",
        tooltipText = "Quick Filter",
        id          = "toolbarfilter",
        align       = "Right",
        prefixIcon  = "e-quickfilter"
    });
}

<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           toolbar=toolbarItems
           toolbarClick="toolbarClick"
           height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
function toolbarClick(args) {
    if (args.item.id === 'toolbarfilter') {
        // handle custom toolbar button click
        var ganttObj = document.getElementById('Gantt').ej2_instances[0];
        ganttObj.filterByColumn('TaskName', 'startswith', 'Plan');
    }
}
</script>
```

> Pass the toolbar variable using Razor syntax **without quotes** (`toolbar=toolbarItems`). If a toolbar item does not match a built-in key, it is treated as a custom item.

---

## Built-in and Custom Items Together

Mix built-in string keys and custom `ItemModel` objects in the same list:

```cshtml
@{
    List<object> toolbarItems = new List<object>();
    toolbarItems.Add("ExpandAll");
    toolbarItems.Add("CollapseAll");
    toolbarItems.Add(new { text = "Test", id = "testBtn", prefixIcon = "e-icon" });
}

<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           toolbar=toolbarItems
           toolbarClick="toolbarClick"
           height="450px">
    ...
</ejs-gantt>

<script>
function toolbarClick(args) {
    if (args.item.id === 'testBtn') {
        alert('Custom button clicked');
    }
}
</script>
```

---

## Enable / Disable Toolbar Items

Use the `enableItems` method to enable or disable toolbar items at runtime. Pass an array of item IDs and a boolean flag:

```cshtml
<button onclick="enableBtn()">Enable</button>
<button onclick="disableBtn()">Disable</button>

<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           toolbar="@(new List<string>() { "ExpandAll", "CollapseAll" })"
           height="450px">
    ...
</ejs-gantt>

<script>
function enableBtn() {
    var ganttObj = document.getElementById('Gantt').ej2_instances[0];
    ganttObj.toolbarModule.enableItems(['Gantt_ExpandAll', 'Gantt_CollapseAll'], true);
}
function disableBtn() {
    var ganttObj = document.getElementById('Gantt').ej2_instances[0];
    ganttObj.toolbarModule.enableItems(['Gantt_ExpandAll', 'Gantt_CollapseAll'], false);
}
</script>
```

> Built-in item IDs follow the pattern `{ganttId}_{ItemKey}` (e.g., `Gantt_ExpandAll`). For custom items, use the `id` you defined.

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

<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           toolbar=toolbarItems
           height="450px">
    ...
</ejs-gantt>

<script type="text/x-template" id="numericTemplate">
    <input id="numericInput" type="number" />
</script>

<script>
    // Initialize EJ2 NumericTextBox on the input after Gantt renders
    document.addEventListener('DOMContentLoaded', function () {
        new ej.inputs.NumericTextBox({
            value: 1,
            min: 1,
            max: 100,
            change: function(args) {
                // handle value change
            }
        }, '#numericInput');
    });
</script>
```
