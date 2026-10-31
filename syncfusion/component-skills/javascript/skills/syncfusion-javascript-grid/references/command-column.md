# Command Column in JavaScript Grid

## Table of Contents
- [Overview](#overview)
- [Enable Command Column](#enable-command-column)
- [Built-in Commands](#built-in-commands)
- [Custom Commands](#custom-commands)
- [Command Events](#command-events)
- [Conditional Commands](#conditional-commands)
- [Styling Commands](#styling-commands)
- [Complete Example](#complete-example)
- [Best Practices](#best-practices)

## When to Use This Reference

- Add action buttons (Edit, Delete, Save, Cancel) to grid rows
- Execute row-level commands and operations
- Create custom command buttons with icons
- Handle command click events and row actions
- Configure command visibility and behavior per row

## Overview

Command column provides buttons for common grid actions like Edit, Delete, and custom operations. It simplifies row-level interactions without needing custom templates.

---

## Enable Command Column

### Basic Setup

```ts
import { Grid, Edit, Toolbar, CommandColumn } from '@syncfusion/ej2-grids';

Grid.Inject(Edit, Toolbar, CommandColumn);

const data = [
  { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
  { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 }
];

const grid = new Grid({
  dataSource: data,
  editSettings: { mode: 'Dialog', allowEditing: true, allowDeleting: true },
  columns: [
    { type: 'checkbox', width: 50 },
    { field: 'OrderID', headerText: 'Order ID', width: 100, isPrimaryKey: true },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    {
      headerText: 'Actions',
      width: 150,
      commands: [
        { type: 'Edit', buttonOption: { cssClass: 'e-flat' } },
        { type: 'Delete', buttonOption: { cssClass: 'e-flat' } },
        { type: 'Save', buttonOption: { cssClass: 'e-flat' } },
        { type: 'Cancel', buttonOption: { cssClass: 'e-flat' } }
      ]
    }
  ]
});

grid.appendTo('#grid');
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

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, isPrimaryKey: true },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    {
      headerText: 'Edit/Delete',
      width: 120,
      commands: [
        { type: 'Edit', buttonOption: { cssClass: 'e-flat' } },
        { type: 'Delete', buttonOption: { cssClass: 'e-flat' } }
      ]
    }
  ]
});

grid.appendTo('#grid');
```

### Save/Cancel Commands

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, isPrimaryKey: true },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    {
      headerText: 'Save/Cancel',
      width: 120,
      commands: [
        { type: 'Save', buttonOption: { cssClass: 'e-flat' } },
        { type: 'Cancel', buttonOption: { cssClass: 'e-flat' } }
      ]
    }
  ]
});

grid.appendTo('#grid');
```

### All Commands

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, isPrimaryKey: true },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    {
      headerText: 'Actions',
      width: 200,
      commands: [
        { type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'e-icons e-edit' } },
        { type: 'Save', buttonOption: { cssClass: 'e-flat', iconCss: 'e-icons e-save' } },
        { type: 'Cancel', buttonOption: { cssClass: 'e-flat', iconCss: 'e-icons e-cancel' } },
        { type: 'Delete', buttonOption: { cssClass: 'e-flat e-flat-danger', iconCss: 'e-icons e-delete' } }
      ]
    }
  ]
});

grid.appendTo('#grid');
```

---

## Custom Commands

### Duplicate Row Command

```ts
const onDuplicate = (args: any) => {
  const rowData = args.rowData;
  const newData = { ...rowData };
  delete newData[grid.getPrimaryKeyFieldNames()[0]];
  
  grid.addRecord(newData);
};

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, isPrimaryKey: true },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    {
      headerText: 'Actions',
      width: 150,
      commands: [
        { type: 'Edit', buttonOption: { cssClass: 'e-flat' } },
        {
          buttonOption: {
            content: 'Copy',
            cssClass: 'e-flat',
            click: onDuplicate
          }
        },
        { type: 'Delete', buttonOption: { cssClass: 'e-flat' } }
      ]
    }
  ]
});

grid.appendTo('#grid');
```

### View Details Command

```ts
const onViewDetails = (args: any) => {
  const rowData = args.rowData;
  alert(`Order ID: ${rowData.OrderID}\nCustomer: ${rowData.CustomerID}`);
};

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, isPrimaryKey: true },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    {
      headerText: 'Actions',
      width: 150,
      commands: [
        {
          buttonOption: {
            content: 'Details',
            cssClass: 'e-flat e-info',
            click: onViewDetails
          }
        },
        { type: 'Edit', buttonOption: { cssClass: 'e-flat' } },
        { type: 'Delete', buttonOption: { cssClass: 'e-flat' } }
      ]
    }
  ]
});

grid.appendTo('#grid');
```

### Download/Export Command

```ts
const onDownload = (args: any) => {
  const rowData = args.rowData;
  const csv = Object.entries(rowData).map(([key, value]) => `${key},${value}`).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `order-${rowData.OrderID}.csv`;
  link.click();
};

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, isPrimaryKey: true },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    {
      headerText: 'Actions',
      width: 150,
      commands: [
        {
          buttonOption: {
            content: 'Download',
            cssClass: 'e-flat e-success',
            iconCss: 'e-icons e-download',
            click: onDownload
          }
        },
        { type: 'Edit', buttonOption: { cssClass: 'e-flat' } }
      ]
    }
  ]
});

grid.appendTo('#grid');
```

### Multi-Action Button

```ts

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, isPrimaryKey: true },
    {
      headerText: 'Actions',
      width: 150,
      commands: [
        {
          buttonOption: {
            content: 'More Actions',
            cssClass: 'e-flat e-outline',
            click: showActionMenu
          }
        }
      ]
    }
  ]
});

grid.appendTo('#grid');
```

---

## Command Events

### Click Event

```ts
const handleCommandClick = (args: any) => {
  console.log('Command type:', args.commandType);
  console.log('Row data:', args.rowData);
  console.log('Button element:', args.target);
};

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, isPrimaryKey: true },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    {
      headerText: 'Actions',
      width: 150,
      commands: [
        { type: 'Edit', buttonOption: { cssClass: 'e-flat' } },
        { type: 'Delete', buttonOption: { cssClass: 'e-flat' } }
      ]
    }
  ],
  commandClick: handleCommandClick
});

grid.appendTo('#grid');
```

### Command Type Checking

```ts
const handleCommand = (args: any) => {
  if (args.commandType === 'Edit') {
    console.log('Edit command:', args.rowData);
  } else if (args.commandType === 'Delete') {
    console.log('Delete command:', args.rowData);
    if (!window.confirm('Are you sure you want to delete this record?')) {
      args.cancel = true;
    }
  } else if (args.commandType === 'CustomCommand') {
    console.log('Custom command:', args.target);
  }
};

const grid = new Grid({
  dataSource: data,
  commandClick: handleCommand
});

grid.appendTo('#grid');
```

---

## Conditional Commands

### Show/Hide Based on Row Data

```ts
import { Grid, Edit } from '@syncfusion/ej2-grids';

Grid.Inject(Edit);

const data = [
  { OrderID: 10248, CustomerID: 'VINET', Status: 'Shipped' },
  { OrderID: 10249, CustomerID: 'TOMSP', Status: 'Pending' }
];

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, isPrimaryKey: true },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'Status', headerText: 'Status', width: 100 },
    {
      headerText: 'Actions',
      width: 200,
      template: (props: any) => {
        let html = '<button class="e-btn e-small">Edit</button>';
        
        if (props.Status !== 'Completed') {
          html += '<button class="e-btn e-small e-danger">Delete</button>';
        }
        
        if (props.Status === 'Pending') {
          html += '<button class="e-btn e-small e-success">Complete</button>';
        }
        
        return html;
      }
    }
  ]
});

grid.appendTo('#grid');
```

### Role-Based Commands

```ts
const userRole = 'admin'; // Get from your auth system

const getCommands = () => {
  if (userRole === 'admin') {
    return [
      { type: 'Edit', buttonOption: { cssClass: 'e-flat' } },
      { type: 'Delete', buttonOption: { cssClass: 'e-flat' } },
      {
        buttonOption: {
          content: 'Audit',
          cssClass: 'e-flat',
          click: (args: any) => viewAudit(args.rowData)
        }
      }
    ];
  } else {
    return [
      { type: 'Edit', buttonOption: { cssClass: 'e-flat' } },
      {
        buttonOption: {
          content: 'View',
          cssClass: 'e-flat',
          click: (args: any) => viewDetails(args.rowData)
        }
      }
    ];
  }
};

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, isPrimaryKey: true },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    {
      headerText: 'Actions',
      width: 200,
      commands: getCommands()
    }
  ]
});

grid.appendTo('#grid');
```

### Status-Based Commands

```ts
const getCommandsForStatus = (status: string) => {
  const baseCommands: any[] = [
    { type: 'Edit', buttonOption: { cssClass: 'e-flat' } }
  ];

  if (status === 'Draft') {
    baseCommands.push({ type: 'Delete', buttonOption: { cssClass: 'e-flat' } });
  }

  if (status === 'Pending') {
    baseCommands.push({
      buttonOption: {
        content: 'Approve',
        cssClass: 'e-flat e-success',
        click: (args: any) => approveRow(args.rowData)
      }
    });
  }

  if (status === 'Approved') {
    baseCommands.push({
      buttonOption: {
        content: 'Publish',
        cssClass: 'e-flat e-info',
        click: (args: any) => publishRow(args.rowData)
      }
    });
  }

  return baseCommands;
};

const data = [
  { OrderID: 10248, CustomerID: 'VINET', Status: 'Draft' },
  { OrderID: 10249, CustomerID: 'TOMSP', Status: 'Pending' },
  { OrderID: 10250, CustomerID: 'HANAR', Status: 'Approved' }
];

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, isPrimaryKey: true },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'Status', headerText: 'Status', width: 100 },
    {
      headerText: 'Actions',
      width: 200,
      template: (props: any) => {
        const commands = getCommandsForStatus(props.Status);
        return commands.map(cmd => 
          `<button class="e-btn e-small">${cmd.type || cmd.buttonOption.content}</button>`
        ).join('');
      }
    }
  ]
});

grid.appendTo('#grid');
```

---

## Styling Commands

### Button Styling

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, isPrimaryKey: true },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    {
      headerText: 'Actions',
      width: 200,
      commands: [
        {
          type: 'Edit',
          buttonOption: {
            cssClass: 'e-flat e-outline',
            iconCss: 'e-icons e-edit'
          }
        },
        {
          type: 'Delete',
          buttonOption: {
            cssClass: 'e-flat e-danger',
            iconCss: 'e-icons e-delete'
          }
        },
        {
          buttonOption: {
            content: 'Archive',
            cssClass: 'e-flat e-warning',
            iconCss: 'e-icons e-archive'
          }
        }
      ]
    }
  ]
});

grid.appendTo('#grid');
```

### CSS Classes

```css
/* Button sizes */
.e-btn.e-small {
  padding: 4px 8px;
  font-size: 12px;
}

.e-btn.e-large {
  padding: 12px 16px;
  font-size: 16px;
}

/* Button styles */
.e-btn.e-flat {
  background-color: transparent;
  border: 1px solid #ddd;
}

.e-btn.e-outline {
  border: 2px solid currentColor;
}

.e-btn.e-primary {
  background-color: #007bff;
  color: white;
}

.e-btn.e-success {
  background-color: #28a745;
  color: white;
}

.e-btn.e-danger {
  background-color: #dc3545;
  color: white;
}

.e-btn.e-warning {
  background-color: #ffc107;
  color: black;
}

.e-btn.e-info {
  background-color: #17a2b8;
  color: white;
}

/* Hover effects */
.e-btn:hover {
  opacity: 0.8;
  cursor: pointer;
}

.e-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Icon styling */
.e-btn .e-icons {
  margin-right: 4px;
}
```

### Inline Styling

```ts
const commandButtonStyle = {
  padding: '6px 10px',
  fontSize: '12px',
  marginRight: '4px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const editButtonStyle = { ...commandButtonStyle, backgroundColor: '#007bff', color: 'white' };
const deleteButtonStyle = { ...commandButtonStyle, backgroundColor: '#dc3545', color: 'white' };

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, isPrimaryKey: true },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    {
      headerText: 'Actions',
      width: 150,
      template: (props: any) => {
        return `
          <button style="padding: 6px 10px; background-color: #007bff; color: white;">Edit</button>
          <button style="padding: 6px 10px; background-color: #dc3545; color: white;">Delete</button>
        `;
      }
    }
  ]
});

grid.appendTo('#grid');
```

---

## Complete Example

```ts
import { Grid, Edit, Toolbar, CommandColumn } from '@syncfusion/ej2-grids';

Grid.Inject(Edit, Toolbar, CommandColumn);

const data = [
  { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38, Status: 'Pending' },
  { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61, Status: 'Shipped' },
  { OrderID: 10250, CustomerID: 'HANAR', Freight: 65.83, Status: 'Pending' }
];

const onDuplicate = (args: any) => {
  const newData = { ...args.rowData };
  delete newData.OrderID;
  grid.addRecord(newData);
};

const onViewDetails = (args: any) => {
  alert(`Order ID: ${args.rowData.OrderID}\nCustomer: ${args.rowData.CustomerID}\nFreight: ${args.rowData.Freight}`);
};

const handleCommandClick = (args: any) => {
  if (args.commandType === 'Delete') {
    if (!window.confirm('Are you sure you want to delete this record?')) {
      args.cancel = true;
    }
  }
};

const grid = new Grid({
  dataSource: data,
  editSettings: { mode: 'Dialog', allowEditing: true, allowDeleting: true },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, isPrimaryKey: true },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'Freight', headerText: 'Freight', width: 100, format: 'C2' },
    { field: 'Status', headerText: 'Status', width: 100 },
    {
      headerText: 'Actions',
      width: 250,
      commands: [
        {
          type: 'Edit',
          buttonOption: { cssClass: 'e-flat', iconCss: 'e-icons e-edit' }
        },
        {
          buttonOption: {
            content: 'Duplicate',
            cssClass: 'e-flat e-info',
            click: onDuplicate
          }
        },
        {
          buttonOption: {
            content: 'Details',
            cssClass: 'e-flat e-primary',
            click: onViewDetails
          }
        },
        {
          type: 'Delete',
          buttonOption: { cssClass: 'e-flat e-danger', iconCss: 'e-icons e-delete' }
        }
      ]
    }
  ],
  commandClick: handleCommandClick
});

grid.appendTo('#grid');
```

---

## Best Practices

1. **Keep command column width fixed** (~150-250px)
2. **Order commands logically** (Edit → Save/Cancel, Delete at end)
3. **Use icons with text** for clarity
4. **Confirm destructive actions** (delete)
5. **Disable commands** when not applicable
6. **Show loading state** for async operations
7. **Provide keyboard shortcuts** (accessibility)
8. **Test with touch devices** (small button sizing)
9. **Group related commands** visually
10. **Provide tooltips** for clarity
