# Styling & Appearance

## When to Use This Reference

**Read this file when you need to:**
- Apply built-in themes (Material, Bootstrap, Fabric, HighContrast, Tailwind)
- Override default CSS with custom styles and branding
- Enable adaptive UI for mobile and responsive layouts
- Customize specific CSS classes for sections (header, body, pager, summary)
- Implement light/dark mode switching
- Create consistent visual styling across different devices

## Table of Contents
- [Theme Configuration](#theme-configuration)
- [CSS Customization](#css-customization)
- [Adaptive UI](#adaptive-ui)
- [CSS Classes Reference](#css-classes-reference)

## Theme Configuration

Apply built-in themes by importing theme CSS:

```typescript
// Import theme stylesheet (choose one)
import '@syncfusion/ej2-treegrid/styles/material.css';
// Options: bootstrap.css, fabric.css, highcontrast.css, tailwind.css

import { TreeGrid, Sort, Filter, Toolbar, Page } from '@syncfusion/ej2-treegrid';
import { sampleData } from './datasource.ts';

TreeGrid.Inject(Sort, Filter, Toolbar, Page);

let treeGridObj: TreeGrid = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowSorting: true,
    allowFiltering: true,
    allowPaging: true,
    pageSettings: { pageSize: 10 },
    toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
    treeColumnIndex: 1,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
        { field: 'taskName', headerText: 'Task Name', width: 180, textAlign: 'Left' },
        { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**Available Themes:**
- Material: Modern, clean design
- Bootstrap: Bootstrap styling
- Fabric: Office-inspired
- HighContrast: Accessibility-focused
- Tailwind: Tailwind CSS framework

## CSS Customization

Override TreeGrid CSS by adding custom styles:

```css
/* Custom TreeGrid styling */
.e-treegrid {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Header customization */
.e-treegrid .e-headercell {
  background-color: #4472C4;
  color: white;
  font-weight: 600;
  padding: 12px;
  border-color: #2E5BA3;
}

/* Row cell styling */
.e-treegrid .e-rowcell {
  padding: 10px 8px;
  border-color: #E0E0E0;
}

/* Hover effect on rows */
.e-treegrid .e-row:hover {
  background-color: #F0F5FF;
}

/* Alternate row colors */
.e-treegrid .e-row.e-altrow {
  background-color: #FAFAFA;
}

/* Selection highlighting */
.e-treegrid .e-row.e-selectionbackground {
  background-color: #CCE5FF;
}
```

Apply custom CSS class:

```typescript
let treeGridObj: TreeGrid = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    cssClass: 'custom-treegrid',
    treeColumnIndex: 1,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
        { field: 'taskName', headerText: 'Task Name', width: 180, textAlign: 'Left' }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

## Adaptive UI

Enable responsive mobile-friendly interface using `enableAdaptiveUI` property:

```typescript
import { TreeGrid, Filter, Sort, Edit, Toolbar, Page } from '@syncfusion/ej2-treegrid';
import { sampleData } from './datasource.ts';

TreeGrid.Inject(Filter, Sort, Edit, Toolbar, Page);

let treeGridObj: TreeGrid = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    enableAdaptiveUI: true,  // Enable mobile-optimized UI
    allowPaging: true,
    pageSettings: { pageSize: 12 },
    allowSorting: true,
    allowFiltering: true,
    filterSettings: { type: 'Excel' },
    editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' },
    toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search'],
    height: '100%',  // Full screen height
    treeColumnIndex: 1,
    columns: [
        { field: 'taskID', headerText: 'Task ID', isPrimaryKey: true, width: 135, validationRules: { required: true } },
        { field: 'taskName', headerText: 'Task Name', width: 280, validationRules: { required: true } },
        { field: 'duration', headerText: 'Duration', width: 140, validationRules: { required: true } },
        { field: 'progress', headerText: 'Progress', width: 145, validationRules: { required: true } }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**Adaptive Features:**
- Full-screen edit dialogs on mobile devices
- Bottom-aligned filter popups
- Touch-friendly controls and larger touch targets
- Optimized column visibility for small screens
- Responsive toolbar wrapping

## CSS Classes Reference

Complete reference of TreeGrid CSS classes organized by section:

| Section | CSS Class | Purpose |
|---------|-----------|---------|
| **Root** | e-treegrid | Root container element |
| **Header** | e-gridheader | Header section container |
| **Header** | e-table | Table in header (100% width) |
| **Header** | e-columnheader | Header row (tr) element |
| **Header** | e-headercell | Header cell element (th) |
| **Header** | e-headercelldiv | Div inside header cell (recommended for override) |
| **Body** | e-gridcontent | Body content container |
| **Body** | e-table | Table in body (100% width) |
| **Body** | e-row | Data row element |
| **Body** | e-altrow | Alternate rows (odd rows) |
| **Body** | e-rowcell | Cell in data row |
| **Body** | e-groupcaption | Group caption cell |
| **Body** | e-selectionbackground | Selected row cell |
| **Body** | e-hover | Row on hover state |
| **Pager** | e-pager | Pager container |
| **Pager** | e-pagercontainer | Numeric page items |
| **Pager** | e-parentmsgbar | Pager info/message bar |
| **Summary** | e-gridfooter | Summary/footer section |
| **Summary** | e-summaryrow | Summary row in footer |
| **Summary** | e-summarycell | Summary cell in footer |

**Common Customization Examples:**

Override header background:
```css
.e-treegrid .e-gridheader {
  background-color: #2E5BA3;
}

.e-treegrid .e-headercell {
  background-color: #2E5BA3;
  color: white;
  font-weight: bold;
}
```

Style alternating rows:
```css
.e-treegrid .e-altrow {
  background-color: #F5F5F5;
}

.e-treegrid .e-row:hover {
  background-color: #E8F0FF;
}
```

Customize selection:
```css
.e-treegrid .e-selectionbackground {
  background-color: #CCE5FF;
  color: #000000;
}
```

Format pager:
```css
.e-treegrid .e-pager {
  background-color: #F9F9F9;
  padding: 10px;
}

.e-treegrid .e-pagercontainer {
  gap: 5px;
}
```
