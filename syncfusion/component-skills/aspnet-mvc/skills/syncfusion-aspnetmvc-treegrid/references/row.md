# Row Operations in Tree Grid

## Table of Contents
- [When to Use This](#when-to-use-this)
- [Row Editing](#row-editing)
- [Row Selection](#row-selection)
- [Expand & Collapse](#expand--collapse)
- [Row Templates](#row-templates)
- [Row Events](#row-events)

## When to Use This

Use row operations when you need to:
- Enable row-level editing with inline or dialog mode
- Allow users to select single or multiple rows
- Programmatically expand or collapse hierarchical rows
- Create custom row templates with complex HTML layouts
- Apply conditional styling or highlighting to rows
- Handle row events like click, double-click, or data bound

## Row Editing

### Enable Row Editing

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .EditSettings(edit =>
    {
        edit.AllowEditing(true)
           .Mode(EditMode.Inline)
           .AllowEditOnDblClick(true);
    })
    .Toolbar(new List<string> { "Add", "Edit", "Delete", "Update", "Cancel" })
    .ChildMapping("Children")
    .Columns(col =>
    {
        col.Field("TaskID").IsPrimaryKey(true).Width("80").Add();
        col.Field("TaskName").AllowEditing(true).Width("200").Add();
        col.Field("StartDate").AllowEditing(true).Type("date").Format("yMd").Width("120").Add();
        col.Field("Duration").AllowEditing(true).Type("number").Width("100").Add();
    })
    .Render()
```

### Inline Row Editing in Detail

When in edit mode, the entire row becomes editable:
1. Double-click a row to enter edit mode
2. All editable columns become input fields
3. Press Enter to save or Escape to cancel
4. Update and Cancel buttons available in toolbar

### Row Adding

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .EditSettings(edit =>
    {
        edit.AllowAdding(true)
           .AllowEditing(true)
           .Mode(EditMode.Inline)
           .NewRowPosition(RowPosition.Child);  // RowPosition.Top, Bottom, Child
    })
    .Toolbar(new List<string> { "Add", "Update", "Cancel" })
    .ChildMapping("Children")
    .Render()
```

**RowPosition Options:**
- `RowPosition.Top`: Add new row at top
- `RowPosition.Bottom`: Add new row at bottom (default)
- `RowPosition.Child`: Add as child of selected row

### Row Deletion

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .EditSettings(edit =>
    {
        edit.AllowDeleting(true)
           .Mode(EditMode.Inline);
    })
    .ActionBegin("beforeDelete")
    .Toolbar(new List<string> { "Delete" })
    .Render()

<script>
function beforeDelete(args) {
    if (args.requestType === 'delete') {
        // Confirm deletion
        if (!confirm('Delete ' + args.data[0].TaskName + '?')) {
            args.cancel = true;
        }
    }
}
</script>
```

## Row Selection

### Get Selected Rows

```html
<button onclick="getSelectedData()">Get Selected</button>

@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .SelectionSettings(selection =>
    {
        selection.Type(SelectionType.Multiple)
                 .Mode(SelectionMode.Row);
    })
    .Render()

<script>
function getSelectedData() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    var selectedRecords = grid.getSelectedRecords();
    
    console.log("Selected " + selectedRecords.length + " rows:");
    selectedRecords.forEach(function(record) {
        console.log("ID: " + record.TaskID + ", Name: " + record.TaskName);
    });
    
    return selectedRecords;
}
</script>
```

### Row Highlighting

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .RowDataBound("highlightRow")
    .Render()

<script>
function highlightRow(args) {
    // Highlight completed rows
    if (args.data.IsCompleted) {
        args.row.classList.add('completed-row');
    }
    
    // Highlight overdue rows
    if (new Date(args.data.DueDate) < new Date()) {
        args.row.classList.add('overdue-row');
    }
}
</script>

<style>
.completed-row {
    background-color: #d4edda;
}

.overdue-row {
    background-color: #f8d7da;
}
</style>
```

## Expand & Collapse

### Programmatic Expand/Collapse

```html
<button onclick="expandAll()">Expand All</button>
<button onclick="collapseAll()">Collapse All</button>
<button onclick="expandRow(1)">Expand Row 1</button>

@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .ChildMapping("Children")
    .Render()

<script>
function expandAll() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    grid.expandAll();
    console.log("All rows expanded");
}

function collapseAll() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    grid.collapseAll();
    console.log("All rows collapsed");
}

function expandRow(rowIndex) {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    grid.expand(grid.getCurrentViewRecords()[rowIndex]);
}
</script>
```

### Expand/Collapse Events

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .ActionBegin("onExpanding")
    .ActionComplete("onExpanded")
    .Render()

<script>
function onExpanding(args) {
    if (args.requestType === 'expand') {
        console.log("Expanding row: " + args.data.TaskID);
        // Load child data if needed
    }
}

function onExpanded(args) {
    if (args.requestType === 'expand') {
        console.log("Row expanded successfully");
    }
}
</script>
```

## Row Templates

### Custom Row Template

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .RowTemplate(@"<tr>
                 <td>${TaskID}</td>
                 <td><strong>${TaskName}</strong></td>
                 <td>${StartDate}</td>
                 <td class='progress-cell'>
                   <div class='progress'>
                     <div class='progress-bar' style='width: ${Progress}%'>
                       ${Progress}%
                     </div>
                   </div>
                 </td>
               </tr>")
    .Render()

<style>
.progress-cell {
    padding: 10px !important;
}

.progress {
    height: 20px;
    background-color: #e9ecef;
    border-radius: 4px;
}

.progress-bar {
    background-color: #28a745;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: white;
}
</style>
```

### Detail Row Template

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .DetailTemplate(@"<div class='detail-template'>
                     <div class='detail-section'>
                       <label>Description:</label>
                       ${Description}
                     </div>
                     <div class='detail-section'>
                       <label>Budget:</label>
                       ${Budget:C2}
                     </div>
                     <div class='detail-section'>
                       <label>Notes:</label>
                       ${Notes}
                     </div>
                   </div>")
    .DetailsTemplate(new[] { "Description", "Budget", "Notes" })
    .Render()

<style>
.detail-template {
    padding: 20px;
    background-color: #f5f5f5;
}

.detail-section {
    margin-bottom: 10px;
}

.detail-section label {
    font-weight: bold;
    display: inline-block;
    width: 100px;
}
</style>
```

## Row Events

### Row Loading Events

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .RowDataBound("onRowBound")
    .RowRendered("onRowRendered")
    .Render()

<script>
function onRowBound(args) {
    // Called before row rendering
    console.log("Row bound: " + args.data.TaskID);
    
    // Modify row properties
    if (args.data.Priority === 'High') {
        args.row.style.fontWeight = 'bold';
    }
}

function onRowRendered(args) {
    // Called after row rendering
    console.log("Row rendered: " + args.data.TaskID);
}
</script>
```

### Row Height Management

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .RowHeight(30)                    // Fixed height for all rows
    .QueryCellInfo("setRowHeight")
    .Render()

<script>
function setRowHeight(args) {
    // Dynamic row height based on content
    if (args.column.field === 'Description') {
        var text = args.data.Description;
        var lines = Math.ceil(text.length / 50);
        args.row.style.height = (25 * lines) + 'px';
    }
}
</script>
```
