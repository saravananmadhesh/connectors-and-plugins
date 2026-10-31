# Selection in Tree Grid

## Table of Contents
- [When to Use This](#when-to-use-this)
- [Selection Modes](#selection-modes)
- [Row Selection](#row-selection)
- [Cell Selection](#cell-selection)
- [Programmatic Selection](#programmatic-selection)
- [Selection Events](#selection-events)

## When to Use This

Use selection features when you need to:
- Allow users to select single or multiple rows
- Enable cell-level selection for data entry or copying
- Implement checkbox selection for bulk operations
- Select rows programmatically based on conditions
- Get selected data for processing or export
- Handle selection events for custom actions

## Selection Modes

### Enable Selection

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .SelectionSettings(selection =>
    {
        selection.Type(SelectionType.Multiple)     // Single, Multiple, Checkbox
                 .Mode(SelectionMode.Row)          // Row, Cell, Both
                 .AllowDragSelection(false);        // Drag to select
    })
    .Render()
```

## Row Selection

### Single Row Selection

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .SelectionSettings(selection =>
    {
        selection.Type(SelectionType.Single)
                 .Mode(SelectionMode.Row)
                 .CheckboxOnly(false);              // Can select by clicking row
    })
    .RowSelecting("onRowSelecting")
    .RowSelected("onRowSelected")
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Width("80").Add();
        col.Field("TaskName").HeaderText("Task").Width("200").Add();
        col.Field("Duration").HeaderText("Duration").Width("100").Add();
    })
    .Render()

<script>
function onRowSelecting(args) {
    console.log("Row selecting: " + args.data.TaskID);
}

function onRowSelected(args) {
    console.log("Row selected: " + args.data.TaskID);
    // Perform action based on selected row
}
</script>
```

### Multiple Row Selection

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .SelectionSettings(selection =>
    {
        selection.Type(SelectionType.Multiple)
                 .Mode(SelectionMode.Row)
                 .CheckboxOnly(true);               // Show checkboxes
    })
    .RowSelecting("onMultiSelect")
    .RowDeselecting("onDeselect")
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Width("80").Add();
        col.Field("TaskName").HeaderText("Task").Width("200").Add();
    })
    .Render()

<script>
var selectedRows = [];

function onMultiSelect(args) {
    if(args.data) {
        selectedRows.push(args.data.TaskID);
    }
    console.log("Selected rows: " + selectedRows.join(", "));
}

function onDeselect(args) {
    selectedRows = selectedRows.filter(id => id !== args.data.TaskID);
    console.log("Deselected. Remaining: " + selectedRows.join(", "));
}
</script>
```

### Checkbox Selection

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .SelectionSettings(selection =>
    {
        selection.Type(SelectionType.Multiple)
                 .Mode(SelectionMode.Row)
                 .CheckboxOnly(true)               // Only checkbox selectable
                 .CheckboxCellSelecting("onCheckbox");
    })
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Width("80").Add();
        col.Field("TaskName").HeaderText("Task").Width("200").Add();
    })
    .Render()

<script>
function onCheckbox(args) {
    console.log("Checkbox " + (args.isChecked ? "checked" : "unchecked"));
}
</script>
```

## Cell Selection

### Single Cell Selection

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .SelectionSettings(selection =>
    {
        selection.Type(SelectionType.Single)
                 .Mode(SelectionMode.Cell)        // Cell mode
                 .CellSelectionMode(CellSelectionMode.Flow);
    })
    .CellSelecting("onCellSelect")
    .CellSelected("onCellSelected")
    .Render()

<script>
function onCellSelect(args) {
    console.log("Selecting cell at row: " + args.rowIndex + ", col: " + args.cellIndex);
}

function onCellSelected(args) {
    console.log("Cell value: " + args.value);
}
</script>
```

### Multiple Cell Selection

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .SelectionSettings(selection =>
    {
        selection.Type(SelectionType.Multiple)
                 .Mode(SelectionMode.Cell);
    })
    .Render()

<script>
document.addEventListener('keydown', function(e) {
    if (e.which == 67 && e.ctrlKey) {  // Ctrl+C to copy
        var grid = document.getElementById('TreeGrid').ej2_instances[0];
        var selectedCells = grid.getSelectedCells();
        console.log("Copying " + selectedCells.length + " cells");
    }
});
</script>
```

### Cell Range Selection

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .SelectionSettings(selection =>
    {
        selection.Type(SelectionType.Multiple)
                 .Mode(SelectionMode.Cell)
                 .CellSelectionMode(CellSelectionMode.Box);  // Box or Flow
    })
    .Render()
```

## Programmatic Selection

### Select Rows Programmatically

```html
<button onclick="selectRow()">Select Row 2</button>
<button onclick="selectAllRows()">Select All</button>
<button onclick="clearSelection()">Clear Selection</button>

@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .SelectionSettings(selection => selection.Type(SelectionType.Multiple))
    .Render()

<script>
function selectRow() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    grid.selectRow(1);  // Select row by index
}

function selectAllRows() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    grid.selectAll();   // Select all rows
}

function clearSelection() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    grid.clearSelection();  // Clear all selections
}
</script>
```

### Get Selected Data

```html
<button onclick="getSelectedRows()">Get Selected Data</button>

<script>
function getSelectedRows() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    var selectedRows = grid.getSelectedRows();
    var selectedRecords = grid.getSelectedRecords();
    
    console.log("Selected row indices: " + selectedRows.join(", "));
    console.log("Selected records: ", selectedRecords);
    
    selectedRecords.forEach(function(record) {
        console.log("Task: " + record.TaskName + ", Duration: " + record.Duration);
    });
}
</script>
```

### Select Range of Rows

```html
<script>
function selectRowRange() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    
    // Select rows 1 to 5
    for (var i = 1; i <= 5; i++) {
        grid.selectRow(i);
    }
}

function selectByProperty() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    
    // Select rows where Progress > 50%
    grid.getRows().forEach(function(row, index) {
        var record = grid.getSelectedRecords(index);
        if (record && record.Progress > 50) {
            grid.selectRow(index);
        }
    });
}
</script>
```

## Selection Events

### Row Selecting/Deselecting Events

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .SelectionSettings(selection => selection.Type(SelectionType.Multiple).Mode(SelectionMode.Row))
    .RowSelecting("onRowSelecting")
    .RowDeselecting("onRowDeselecting")
    .RowSelected("onRowSelected")
    .RowDeselected("onRowDeselected")
    .Render()

<script>
function onRowSelecting(args) {
    // Before selection - can cancel with args.cancel = true
    console.log("Row selecting: " + args.data.TaskID);
    
    // Cancel selection for specific rows
    if (args.data.Status === "Locked") {
        args.cancel = true;
    }
}

function onRowDeselecting(args) {
    // Before deselection
    console.log("Row deselecting");
}

function onRowSelected(args) {
    // After selection complete
    console.log("Row selected successfully: " + args.data.TaskName);
}

function onRowDeselected(args) {
    // After deselection complete
    console.log("Row deselected");
}
</script>
```

### Handle Selection Changes

```html
<div id="selectionInfo"></div>

<script>
function onRowSelected(args) {
    updateSelectionInfo();
}

function updateSelectionInfo() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    var selectedCount = grid.getSelectedRows().length;
    var totalCount = grid.getCurrentViewRecords().length;
}
</script>
```
