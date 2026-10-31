# Command Column in ASP.NET Core Grid

## Table of Contents
- [Overview](#overview)
- [Enable Command Column](#enable-command-column)
- [Built-in Commands](#built-in-commands)
- [Custom Commands](#custom-commands)
- [Command Events](#command-events)
- [Conditional Commands](#conditional-commands)
- [Styling Commands](#styling-commands)

## Overview

Command column provides buttons for common grid actions like Edit, Delete, and custom operations. It simplifies row-level interactions without needing custom templates.

---

## Enable Command Column

### Basic Setup

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" 
          toolbar="@(new List<string>() { "Add", "Edit", "Delete", "Update", "Cancel" })">
    <e-grid-editSettings allowAdding="true" allowEditing="true" allowDeleting="true"></e-grid-editSettings>
    <e-grid-columns>
        <e-grid-column type="checkbox" width="50"></e-grid-column>
        <e-grid-column field="OrderID" headerText="Order ID" isPrimaryKey="true" width="100"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer" width="120"></e-grid-column>
        <e-grid-column headerText="Actions" width="150">
            <e-grid-commands>
                <e-grid-command type="Edit"></e-grid-command>
                <e-grid-command type="Delete"></e-grid-command>
                <e-grid-command type="Save"></e-grid-command>
                <e-grid-command type="Cancel"></e-grid-command>
            </e-grid-commands>
        </e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

---

## Built-in Commands

### Available Built-in Commands

| Command | Available In | Action |
|---------|--------------|--------|
| `Edit` | Normal mode | Start editing row |
| `Delete` | Normal mode | Delete row |
| `Save` | Edit mode | Save changes |
| `Cancel` | Edit mode | Cancel editing |

### Edit/Delete Commands

```cshtml
<e-grid-column headerText="Edit/Delete" width="120">
    <e-grid-commands>
        <e-grid-command type="Edit"></e-grid-command>
        <e-grid-command type="Delete"></e-grid-command>
    </e-grid-commands>
</e-grid-column>
```

### Save/Cancel Commands

```cshtml
<e-grid-column headerText="Save/Cancel" width="120">
    <e-grid-commands>
        <e-grid-command type="Save"></e-grid-command>
        <e-grid-command type="Cancel"></e-grid-command>
    </e-grid-commands>
</e-grid-column>
```

---

## Custom Commands

Add custom action buttons beyond the built-in Edit/Delete.

### Button Text & Icon

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowPaging="true">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" isPrimaryKey="true" width="100"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer" width="120"></e-grid-column>
        <e-grid-column headerText="Actions" width="200">
            <e-grid-commands>
                <e-grid-command type="Edit" buttonOption="@(new { iconCss = "e-icons e-edit", title = "Edit Order" })"></e-grid-command>
                <e-grid-command type="Delete" buttonOption="@(new { iconCss = "e-icons e-delete", title = "Delete Order" })"></e-grid-command>
                <e-grid-command type="Custom" commandButtonOption="@(new { content = "Duplicate", idPrefix = "duplicate" })"></e-grid-command>
                <e-grid-command type="Custom" commandButtonOption="@(new { content = "Print", idPrefix = "print" })"></e-grid-command>
            </e-grid-commands>
        </e-grid-column>
    </e-grid-columns>
</ejs-grid>

<script>
// Custom command click handlers
var grid = document.getElementById('Grid').ej2_instances[0];

grid.commandClick = function(args) {
    if (args.commandColumn.type === 'Custom') {
        if (args.commandColumn.commandButtonOption.idPrefix === 'duplicate') {
            handleDuplicate(args.rowData);
        } else if (args.commandColumn.commandButtonOption.idPrefix === 'print') {
            handlePrint(args.rowData);
        }
    }
};

function handleDuplicate(rowData) {
    var newRecord = Object.assign({}, rowData);
    delete newRecord.OrderID; // Remove ID so it creates new record
    grid.addRecord(newRecord);
    console.log('Record duplicated:', newRecord);
}

function handlePrint(rowData) {
    console.log('Printing record:', rowData);
    window.print();
}
</script>
```

---

## Command Events

### commandClick Event

Handle command button clicks:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" 
          onCommandClick="onCommandClick">
    <e-grid-editSettings allowEditing="true" allowDeleting="true"></e-grid-editSettings>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" isPrimaryKey="true"></e-grid-column>
        <e-grid-column headerText="Actions">
            <e-grid-commands>
                <e-grid-command type="Edit"></e-grid-command>
                <e-grid-command type="Delete"></e-grid-command>
                <e-grid-command type="Custom" commandButtonOption="@(new { content = "Archive", idPrefix = "archive" })"></e-grid-command>
            </e-grid-commands>
        </e-grid-column>
    </e-grid-columns>
</ejs-grid>

<script>
function onCommandClick(args) {
    var grid = document.getElementById('Grid').ej2_instances[0];
    
    if (args.commandColumn.type === 'Edit') {
        console.log('Edit clicked for row:', args.rowData);
    } else if (args.commandColumn.type === 'Delete') {
        if (!confirm('Are you sure you want to delete this record?')) {
            args.cancel = true; // Cancel delete
        }
    } else if (args.commandColumn.type === 'Custom') {
        if (args.commandColumn.commandButtonOption.idPrefix === 'archive') {
            archiveRecord(args.rowData);
        }
    }
}

function archiveRecord(rowData) {
    console.log('Archiving record:', rowData);
    // Call API to archive
    fetch('/api/orders/' + rowData.OrderID + '/archive', {
        method: 'POST'
    }).then(response => response.json())
      .then(data => console.log('Archived:', data));
}
</script>
```

---

## Conditional Commands

Show/hide commands based on row data conditions.

### Display Commands Based on Status

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" onActionBegin="onActionBegin">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" isPrimaryKey="true"></e-grid-column>
        <e-grid-column field="Status" headerText="Status"></e-grid-column>
        <e-grid-column headerText="Actions">
            <e-grid-commands>
                <e-grid-command type="Edit"></e-grid-command>
                <e-grid-command type="Delete"></e-grid-command>
            </e-grid-commands>
        </e-grid-column>
    </e-grid-columns>
</ejs-grid>

<script>
function onActionBegin(args) {
    var grid = document.getElementById('Grid').ej2_instances[0];
    
    // Hide Edit for completed orders
    if (args.requestType === 'save') {
        var rows = grid.getRows();
        rows.forEach(function(row) {
            var rowData = grid.getRowObjectFromUID(row.getAttribute('data-uid'));
            
            if (rowData.Status === 'Completed') {
                var editCmd = row.querySelector('[e-icon-id="edit"]');
                if (editCmd) {
                    editCmd.style.display = 'none';
                }
            }
        });
    }
}
</script>
```

---

## Styling Commands

### Custom Icon Colors

```css
/* Style command buttons */
.e-grid .e-grid-action-start button {
    margin: 0 2px;
}

/* Edit button style */
.e-grid .e-grid-action-start button.e-edit {
    background-color: #007bff;
    color: white;
}

.e-grid .e-grid-action-start button.e-edit:hover {
    background-color: #0056b3;
}

/* Delete button style */
.e-grid .e-grid-action-start button.e-delete {
    background-color: #dc3545;
    color: white;
}

.e-grid .e-grid-action-start button.e-delete:hover {
    background-color: #c82333;
}

/* Custom button style */
.e-grid .e-grid-action-start button[e-icon-id="archive"] {
    background-color: #6c757d;
    color: white;
}
```

### Icon-Only Commands

```cshtml
<e-grid-column headerText="" width="100">
    <e-grid-commands>
        <e-grid-command type="Edit" buttonOption="@(new { iconCss = "e-icons e-edit", title = "Edit" })"></e-grid-command>
        <e-grid-command type="Delete" buttonOption="@(new { iconCss = "e-icons e-trash", title = "Delete" })"></e-grid-command>
        <e-grid-command type="Custom" commandButtonOption="@(new { iconCss = "e-icons e-print", idPrefix = "print", title = "Print" })"></e-grid-command>
    </e-grid-commands>
</e-grid-column>
```

---

## Best Practices

1. **Use appropriate command types**: Edit, Delete for CRUD; Custom for specialized actions
2. **Include tooltips**: Set `title` property for accessibility and UX
3. **Confirm destructive actions**: Show confirmation for Delete operations
4. **Disable unavailable commands**: Hide/disable commands based on row state
5. **Use icons**: Icons are more intuitive than text labels
6. **Handle errors**: Implement error handling for async operations
7. **Provide feedback**: Show toast or notification after action completes
8. **Conditional visibility**: Show commands only when applicable (e.g., no delete forreadonly users)
