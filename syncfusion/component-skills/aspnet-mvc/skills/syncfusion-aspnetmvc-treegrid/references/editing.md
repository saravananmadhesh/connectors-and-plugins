# Editing in Tree Grid

## Table of Contents

- [When to Use This](#when-to-use-this)
- [Edit Modes](#edit-modes)
- [Inline Editing](#inline-editing)
- [Batch Editing](#batch-editing)
- [Dialog Editing](#dialog-editing)
- [Edit Events](#edit-events)
- [Validation](#validation)

## When to Use This

Use editing features when you need to:
- Allow users to modify grid data inline or in dialogs
- Add new records to the hierarchy
- Delete records from the tree structure
- Perform batch edits and save multiple changes at once
- Validate data before saving
- Handle edit events for custom logic

## Edit Modes

### Enable Editing

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .EditSettings(edit =>
    {
        edit.AllowEditing(true)        // Enable editing
           .AllowAdding(true)          // Enable adding rows
           .AllowDeleting(true)        // Enable deleting rows
           .Mode(EditMode.Inline);     // Edit mode: Inline, Batch, Dialog
    })
    .Toolbar(new List<string> { "Add", "Edit", "Delete", "Update", "Cancel" })
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Width("80").Add();
        col.Field("TaskName").HeaderText("Task").Width("200").Add();
        col.Field("StartDate").HeaderText("Start").Type("date").Format("yMd").Width("120").Add();
        col.Field("Duration").HeaderText("Duration").Width("100").Add();
    })
    .Render()
```

## Inline Editing

### Basic Inline Editing

Click a cell to edit it directly in the grid:

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .EditSettings(edit =>
    {
        edit.AllowEditing(true)
           .Mode(EditMode.Inline)
           .AllowEditOnDblClick(false);  // Click once to edit
    })
    .Toolbar(new List<string> { "Add", "Edit", "Delete" })
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").AllowEditing(false).Width("80").Add();
        col.Field("TaskName").HeaderText("Task").AllowEditing(true).Width("200").Add();
        col.Field("StartDate").HeaderText("Start").Type("date").Format("yMd").Width("120").Add();
        col.Field("Duration").HeaderText("Duration").Type("number").Width("100").Add();
    })
    .Render()
```

### Inline Adding Row

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .EditSettings(edit =>
    {
        edit.AllowEditing(true)
           .AllowAdding(true)
           .Mode(EditMode.Inline)
           .NewRowPosition(RowPosition.Bottom);  // NewRowPosition.Top or Bottom
    })
    .ChildMapping("Children")
    .Toolbar(new List<string> { "Add", "Edit", "Delete" })
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").IsPrimaryKey(true).Width("80").Add();
        col.Field("TaskName").HeaderText("Task").Width("200").Add();
    })
    .Render()
```

**Controller for Adding:**
```csharp
[HttpPost]
public ActionResult Insert(TaskModel value)
{
    // Save new record
    _context.Tasks.Add(value);
    _context.SaveChanges();
    
    // Return updated data
    return Json(new { value = value });
}
```

## Batch Editing

### Batch Edit Mode

Edit multiple rows and save all at once:

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .EditSettings(edit =>
    {
        edit.AllowEditing(true)
           .AllowAdding(true)
           .AllowDeleting(true)
           .Mode(EditMode.Batch);
    })
    .Toolbar(new List<string> { "Add", "Edit", "Delete", "Update", "Cancel" })
    .Columns(col =>
    {
        col.Field("TaskID").IsPrimaryKey(true).Width("80").Add();
        col.Field("TaskName").HeaderText("Task").Width("200").Add();
        col.Field("Progress").HeaderText("Progress").Type("number").Format("P0").Width("120").Add();
    })
    .Render()
```

**Visual Indicators:**
- Green row: Added
- Orange row: Modified
- Red row: Deleted (marked for deletion)

## Dialog Editing

### Dialog Edit Mode

Edit records in a popup dialog:

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .EditSettings(edit =>
    {
        edit.AllowEditing(true)
           .AllowAdding(true)
           .AllowDeleting(true)
           .Mode(EditMode.Dialog);
    })
    .Toolbar(new List<string> { "Add", "Edit", "Delete", "Cancel" })
    .Columns(col =>
    {
        col.Field("TaskID").IsPrimaryKey(true).Width("80").Add();
        col.Field("TaskName").HeaderText("Task").Width("200").Add();
        col.Field("StartDate").Type("date").Format("yMd").Width("120").Add();
        col.Field("Duration").Type("number").Width("100").Add();
    })
    .Render()
```

### Custom Dialog Template

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .EditSettings(edit =>
    {
        edit.AllowEditing(true)
           .Mode(EditMode.Dialog)
           .Template("<div id='customForm'></div>");
    })
    .Render()

<script>
var template = function() {
    return '<div>' +
           '<div class="form-group">' +
           '<label>Task Name</label>' +
           '<input id="TaskName" type="text" class="form-control" />' +
           '</div>' +
           '<div class="form-group">' +
           '<label>Start Date</label>' +
           '<input id="StartDate" type="date" class="form-control" />' +
           '</div>' +
           '</div>';
};
</script>
```

## Edit Events

### ActionBegin Event

Triggered before editing action:

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .EditSettings(edit => edit.Mode(EditMode.Inline).AllowEditing(true))
    .ActionBegin("onActionBegin")
    .Render()

<script>
function onActionBegin(args) {
    if (args.requestType === 'save') {
        // Validate before saving
        if (!args.data.TaskName || args.data.TaskName === '') {
            args.cancel = true;
            alert('TaskName is required');
        }
    }
    
    if (args.requestType === 'delete') {
        // Confirm before deleting
        if (!confirm('Are you sure you want to delete this record?')) {
            args.cancel = true;
        }
    }
}
</script>
```

### ActionComplete Event

Triggered after editing action:

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .ActionComplete("onActionComplete")
    .Render()

<script>
function onActionComplete(args) {
    if (args.requestType === 'save') {
        alert('Record saved successfully!');
    }
    
    if (args.requestType === 'delete') {
        alert('Record deleted successfully!');
    }
}
</script>
```

## Validation

### Field Validation Rules

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .EditSettings(edit =>
    {
        edit.AllowEditing(true)
           .Mode(EditMode.Dialog);
    })
    .Columns(col =>
    {
        // Required field
        col.Field("TaskName")
           .HeaderText("Task")
           .ValidationRules("{required:true, min:3}")
           .Width("200")
           .Add();
           
        // Number with min/max
        col.Field("Duration")
           .HeaderText("Duration")
           .ValidationRules("{required:true, min:1, max:100}")
           .Width("100")
           .Add();
           
        // Email validation
        col.Field("Email")
           .HeaderText("Email")
           .ValidationRules("{required:true, email:true}")
           .Width("200")
           .Add();
    })
    .Render()
```

### Custom Validation

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .ActionBegin("validateData")
    .EditSettings(edit => edit.Mode(EditMode.Dialog).AllowEditing(true))
    .Render()

<script>
function validateData(args) {
    if (args.requestType === 'save') {
        var data = args.data;
        
        // Custom validation: End date must be after start date
        if (new Date(data.EndDate) <= new Date(data.StartDate)) {
            args.cancel = true;
            alert('End date must be after start date');
        }
        
        // Custom validation: Progress cannot exceed 100%
        if (data.Progress > 100) {
            args.cancel = true;
            alert('Progress cannot exceed 100%');
        }
    }
}
</script>
```

### Server-side Validation

**Controller:**
```csharp
[HttpPost]
public ActionResult Insert(TaskModel value)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    // Additional server validation
    if (value.EndDate <= value.StartDate)
    {
        return BadRequest("End date must be after start date");
    }

    _context.Tasks.Add(value);
    _context.SaveChanges();

    return Ok(value);
}
```
