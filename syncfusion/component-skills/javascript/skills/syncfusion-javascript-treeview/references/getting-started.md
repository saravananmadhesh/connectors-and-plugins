# Getting Started with TreeView

Set up TreeView in a TypeScript project and create your first interactive tree.

## Table of Contents

1. [Dependencies](#dependencies)
2. [Installation](#installation)
3. [Import CSS Styles](#import-css-styles)
4. [Create HTML Structure](#create-html-structure)
5. [Initialize TreeView](#initialize-treeview)
6. [Next Steps](#next-steps)

---

## Dependencies

TreeView requires the following npm packages:

```
@syncfusion/ej2-navigations (TreeView component)
├── @syncfusion/ej2-base
├── @syncfusion/ej2-data
├── @syncfusion/ej2-lists
├── @syncfusion/ej2-inputs
└── @syncfusion/ej2-popups
```

## Installation

Install the required packages using npm:

```bash
npm install @syncfusion/ej2-navigations @syncfusion/ej2-base
```

Or install all Syncfusion packages:

```bash
npm install @syncfusion/ej2
```

## Import CSS Styles

Include the TreeView CSS in your main stylesheet. Choose your preferred theme:

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/treeview/index.css";
```

**Alternative themes:**
- `bootstrap5.css`
- `bootstrap4.css`
- `material3.css`
- `material.css`
- `tailwind.css`
- `fluent.css`

## Create HTML Structure

Add a container div for the TreeView in your HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>TreeView Example</title>
    <link rel="stylesheet" href="styles/styles.css">
</head>
<body>
    <div id="tree"></div>
    <script src="app.js"></script>
</body>
</html>
```

## Initialize TreeView

Create your first TreeView control in TypeScript:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView } from '@syncfusion/ej2-navigations';

// Enable ripple effect
enableRipple(true);

// Sample data
let data = [
    { id: 1, name: 'Folder', expanded: true },
    { id: 2, pid: 1, name: 'File 1' },
    { id: 3, pid: 1, name: 'File 2' },
    { id: 4, name: 'Downloads' }
];

// Initialize TreeView
let treeView = new TreeView({
    fields: { 
        dataSource: data, 
        id: 'id', 
        parentID: 'pid', 
        text: 'name',
        expanded: 'expanded'
    }
});

// Render to element with id 'tree'
treeView.appendTo('#tree');
```

## Basic Properties

### Fields Configuration

The `fields` property maps your data to TreeView:

```typescript
fields: {
    dataSource: data,           // Data array
    id: 'id',                   // Unique identifier field
    parentID: 'pid',            // Parent reference field
    text: 'name',               // Display text field
    expanded: 'expanded',       // Expansion state field
    selected: 'isSelected',     // Selection state field
    isChecked: 'isChecked',     // Checkbox state field
    hasChildren: 'hasChild',    // Has children indicator
    iconCss: 'icon',            // Icon CSS class field
    imageUrl: 'image',          // Image URL field
    tooltip: 'tooltip',         // Tooltip text field
    htmlAttributes: 'htmlAttr'  // Custom HTML attributes
}
```

### Data Structure Examples

**Hierarchical (nested) data:**

```typescript
let hierarchicalData = [
    {
        id: 1,
        name: 'Parent',
        child: [
            { id: 2, name: 'Child 1' },
            { id: 3, name: 'Child 2' }
        ]
    }
];

let treeView = new TreeView({
    fields: {
        dataSource: hierarchicalData,
        id: 'id',
        text: 'name',
        child: 'child'  // For hierarchical data
    }
});
```

**Self-referential (flat) data:**

```typescript
let flatData = [
    { id: 1, pid: null, name: 'Parent' },
    { id: 2, pid: 1, name: 'Child 1' },
    { id: 3, pid: 1, name: 'Child 2' }
];

let treeView = new TreeView({
    fields: {
        dataSource: flatData,
        id: 'id',
        parentID: 'pid',  // For flat data
        text: 'name'
    }
});
```

## Common Configuration Properties

```typescript
let treeView = new TreeView({
    fields: { dataSource: data, id: 'id', parentID: 'pid', text: 'name' },
    
    // Selection
    allowMultiSelection: false,     // Allow multiple node selection
    
    // Checkboxes
    showCheckBox: false,            // Display checkboxes
    autoCheck: true,                // Auto-check parent/child
    
    // Editing
    allowEditing: false,            // Enable inline editing
    
    // Drag and Drop
    allowDragAndDrop: false,        // Enable drag-and-drop
    
    // Expansion
    expandOn: 'Click',              // 'DblClick' or 'Click'
    
    // Appearance
    cssClass: 'custom-tree',        // Custom CSS class
    
    // Events
    nodeClicked: onNodeClicked,
    nodeSelected: onNodeSelected,
    nodeExpanded: onNodeExpanded,
    nodeCollapsed: onNodeCollapsed
});

treeView.appendTo('#tree');

function onNodeClicked(args): void {
    console.log('Node clicked:', args.nodeData.name);
}

function onNodeSelected(args): void {
    console.log('Node selected:', args.nodeData.name);
}

function onNodeExpanded(args): void {
    console.log('Node expanded:', args.nodeData.name);
}

function onNodeCollapsed(args): void {
    console.log('Node collapsed:', args.nodeData.name);
}
```

## Loading Remote Data

Fetch data from a server using DataManager:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView } from '@syncfusion/ej2-navigations';
import { DataManager, WebApiAdaptor, Query } from '@syncfusion/ej2-data';

enableRipple(true);

let dataManager = new DataManager({
    url: 'https://ej2services.syncfusion.com/production/web-services/api/treeviewdata',
    adaptor: new WebApiAdaptor(),
    offline: false
});

let treeView = new TreeView({
    fields: {
        dataSource: dataManager,
        id: 'nodeId',
        parentID: 'parentID',
        text: 'nodeText',
        hasChildren: 'hasChild'
    }
});

treeView.appendTo('#tree');
```

## Quick Reference

| Feature | Property/Method | Type |
|---------|-----------------|------|
| **Data Source** | `fields.dataSource` | Array or DataManager |
| **ID Field** | `fields.id` | string |
| **Parent ID** | `fields.parentID` | string |
| **Text Field** | `fields.text` | string |
| **Multi-Select** | `allowMultiSelection` | boolean |
| **Checkboxes** | `showCheckBox` | boolean |
| **Editing** | `allowEditing` | boolean |
| **Drag/Drop** | `allowDragAndDrop` | boolean |
| **Add Nodes** | `addNodes()` | Adds new nodes |
| **Remove Nodes** | `removeNodes()` | Removes nodes |
| **Update Node** | `updateNode()` | Modifies node data |
| **Get Node Data** | `getTreeData()` | Retrieves node information |

## Example: Complete TreeView Setup

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView, NodeSelectEventArgs } from '@syncfusion/ej2-navigations';

enableRipple(true);

// Sample hierarchical data
let employees = [
    {
        id: 1,
        name: 'Steven Buchanan',
        job: 'CEO',
        expanded: true,
        child: [
            {
                id: 2,
                name: 'Laura Callahan',
                job: 'Product Manager',
                child: [
                    { id: 3, name: 'Andrew Fuller', job: 'Team Lead' },
                    { id: 4, name: 'Nancy Davolio', job: 'Developer' }
                ]
            },
            {
                id: 5,
                name: 'Michael Suyama',
                job: 'Sales Manager',
                child: [
                    { id: 6, name: 'Robert King', job: 'Sales Executive' }
                ]
            }
        ]
    }
];

// Initialize TreeView with full configuration
let treeView = new TreeView({
    fields: {
        dataSource: employees,
        id: 'id',
        text: 'name',
        child: 'child',
        expanded: 'expanded'
    },
    allowMultiSelection: true,
    expandOn: 'Click',
    nodeSelected: onNodeSelected
});

// Render to element
treeView.appendTo('#tree');

// Event handler
function onNodeSelected(args: NodeSelectEventArgs): void {
    console.log('Selected:', args.nodeData.name, args.nodeData.job);
}

// Add new nodes dynamically
document.getElementById('addBtn').onclick = () => {
    treeView.addNodes([{
        id: 10,
        name: 'New Employee',
        job: 'New Position'
    }]);
};
```

## Next Steps

- **[Data Binding](./data-binding.md)** - Learn different data binding methods
- **[Node Selection](./node-selection-and-checking.md)** - Handle node selection and checkboxes
- **[Node Manipulation](./node-manipulation.md)** - Add, remove, and update nodes
- **[Styling](./customization-and-styling.md)** - Customize appearance with CSS
- **[Advanced Features](./accessibility-and-advanced.md)** - Drag-drop, keyboard navigation, and more
