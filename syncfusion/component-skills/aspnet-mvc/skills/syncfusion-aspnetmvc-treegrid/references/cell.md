# Cell Operations in Tree Grid

## Table of Contents

- [When to Use This](#when-to-use-this)
- [Cell Editing](#cell-editing)
- [Cell Styling](#cell-styling)
- [Cell Templates](#cell-templates)
- [Cell Events](#cell-events)
- [Advanced Scenarios](#advanced-scenarios)

## When to Use This

Use cell operations when you need to:
- Enable inline editing of specific cells
- Apply conditional styling based on cell values
- Create custom cell renderers with buttons or badges
- Handle cell-level click or selection events
- Validate data at the cell level

## Cell Editing

### Enable Cell Editing

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .EditSettings(edit =>
    {
        edit.AllowEditing(true)
           .Mode(EditMode.Inline)
           .AllowEditOnDblClick(true);    // Double-click to edit
    })
    .Columns(col =>
    {
        col.Field("TaskID").AllowEditing(false).Width("80").Add();
        col.Field("TaskName").AllowEditing(true).Width("200").Add();
        col.Field("Duration").AllowEditing(true).Type("number").Width("100").Add();
        col.Field("Status").AllowEditing(true).Width("120").Add();
    })
    .CellEdit("onCellEdit")
    .CellSave("onCellSave")
    .Render()

<script>
function onCellEdit(args) {
    console.log("Cell editing: " + args.column.field);
}

function onCellSave(args) {
    console.log("Cell saved. New value: " + args.value);
}
</script>
```

### Cell Editor Types

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .EditSettings(edit => edit.Mode(EditMode.Inline).AllowEditing(true))
    .Columns(col =>
    {
        // Text input
        col.Field("TaskName")
           .HeaderText("Task")
           .EditType("Text")
           .Width("200")
           .Add();
           
        // Dropdown
        col.Field("Status")
           .HeaderText("Status")
           .EditType("DropDown")
           .DataSource(new[] { "Active", "Pending", "Completed" })
           .Width("120")
           .Add();
           
        // Date picker
        col.Field("StartDate")
           .HeaderText("Start Date")
           .EditType("DatePicker")
           .Type("date")
           .Format("yMd")
           .Width("120")
           .Add();
           
        // Number input
        col.Field("Duration")
           .HeaderText("Duration")
           .EditType("NumericTextBox")
           .Type("number")
           .Width("100")
           .Add();
           
        // Checkbox
        col.Field("IsCompleted")
           .HeaderText("Completed")
           .EditType("CheckBox")
           .Type("checkbox")
           .Width("100")
           .Add();
    })
    .Render()
```

## Cell Styling

### Background Color Styling

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .QueryCellInfo("customizeCell")
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Width("80").Add();
        col.Field("TaskName").HeaderText("Task").Width("200").Add();
        col.Field("Progress").HeaderText("Progress").Format("P0").Width("120").Add();
    })
    .Render()

<script>
function customizeCell(args) {
    if (args.column.field === 'Progress') {
        var progress = parseInt(args.data.Progress);
        
        if (progress >= 75) {
            args.cell.style.backgroundColor = '#d4edda';  // Green
            args.cell.style.color = '#155724';
        } else if (progress >= 50) {
            args.cell.style.backgroundColor = '#fff3cd';  // Yellow
            args.cell.style.color = '#856404';
        } else {
            args.cell.style.backgroundColor = '#f8d7da';  // Red
            args.cell.style.color = '#721c24';
        }
    }
}
</script>
```

### Add CSS Classes

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .QueryCellInfo("applyClasses")
    .Render()

<script>
function applyClasses(args) {
    if (args.column.field === 'Status') {
        if (args.data.Status === 'Active') {
            args.cell.classList.add('cell-active');
        } else if (args.data.Status === 'Pending') {
            args.cell.classList.add('cell-pending');
        }
    }
}
</script>

<style>
.cell-active {
    background-color: #28a745;
    color: white;
    font-weight: bold;
}

.cell-pending {
    background-color: #ffc107;
    color: black;
}
</style>
```

## Cell Templates

### Custom Cell Template

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Width("80").Add();
        
        // Status with icon
        col.Field("Status")
           .HeaderText("Status")
           .Template(@"<div class='status-badge ${Status}'>
                      <i class='icon ${Status}'></i>${Status}
                      </div>")
           .Width("120")
           .Add();
           
        // Progress bar
        col.Field("Progress")
           .HeaderText("Progress")
           .Template(@"<div class='progress'>
                      <div class='progress-bar' style='width: ${Progress}%'>
                      ${Progress}%
                      </div>
                      </div>")
           .Width("150")
           .Add();
           
        // Custom button
        col.Field("Action")
           .HeaderText("Action")
           .Template(@"<button class='btn-action' onclick='viewDetails(${TaskID})'>
                      View
                      </button>")
           .Width("100")
           .Add();
    })
    .Render()

<script>
function viewDetails(id) {
    console.log("Viewing details for task: " + id);
}
</script>

<style>
.status-badge {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 4px;
    font-weight: bold;
}

.status-badge.Active { background-color: #d4edda; color: #155724; }
.status-badge.Pending { background-color: #fff3cd; color: #856404; }
.status-badge.Completed { background-color: #d1ecf1; color: #0c5460; }

.progress {
    height: 20px;
    background-color: #e9ecef;
    border-radius: 4px;
    overflow: hidden;
}

.progress-bar {
    height: 100%;
    background-color: #007bff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: white;
    transition: width 0.3s;
}
</style>
```

## Cell Events

### Cell Click Events

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .RecordDoubleClick("onRecordDoubleClick")
    .CellSelecting("onCellSelecting")
    .CellSelected("onCellSelected")
    .Render()

<script>
function onRecordDoubleClick(args) {
    console.log("Double-clicked row: " + args.rowIndex);
    console.log("Cell value: " + args.cell.innerText);
}

function onCellSelecting(args) {
    console.log("Cell selecting - " + args.column.field);
    
    // Prevent selection of certain cells
    if (args.column.field === 'TaskID') {
        args.cancel = true;
    }
}

function onCellSelected(args) {
    console.log("Cell selected");
    var value = args.value;
    console.log("Cell content: " + value);
}
</script>
```


## Advanced Scenarios

### Scenario 1: Data Validation Cell Display

```csharp
public class TaskData
{
    public int TaskID { get; set; }
    public string TaskName { get; set; }
    public decimal Budget { get; set; }
    public decimal Spent { get; set; }
    public bool IsValid { get; set; }  // Calculated property
}
```

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .QueryCellInfo("validateCell")
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
        col.Field("Budget").Format("C2").Width("120").Add();
        col.Field("Spent").Format("C2").Width("120").Add();
    })
    .Render()

<script>
function validateCell(args) {
    // Warn if spent exceeds budget
    if (args.column.field === 'Spent') {
        if (args.data.Spent > args.data.Budget) {
            args.cell.style.backgroundColor = '#ffcccc';
            args.cell.title = 'Spent exceeds budget!';
        }
    }
}
</script>
```

### Scenario 2: Interactive Cell Editor

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .EditSettings(edit => edit.Mode(EditMode.Inline).AllowEditing(true))
    .Columns(col =>
    {
        col.Field("TaskName").AllowEditing(true).Width("200").Add();
        
        col.Field("Priority")
           .AllowEditing(true)
           .EditType("DropDown")
           .EditParams("{ dataSource: ['Critical', 'High', 'Medium', 'Low'] }")
           .Width("120")
           .Add();
    })
    .CellEdit("preEditCell")
    .CellSave("postEditCell")
    .Render()

<script>
function preEditCell(args) {
    // Customize edit control before displayed
    if (args.column.field === 'Priority') {
        args.element.value = args.rowData.Priority;
    }
}

function postEditCell(args) {
    // Post-process after cell edit
    console.log("Cell saved with value: " + args.value);
}
</script>
```
