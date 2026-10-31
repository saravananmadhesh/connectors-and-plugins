# Getting Started with TreeView

## Table of Contents
- [Installation](#installation)
- [Module Setup](#module-setup)
- [CSS Imports](#css-imports)
- [Creating Your First TreeView](#creating-your-first-treeview)
- [Basic Data Structure](#basic-data-structure)

---

## Installation

Install the Syncfusion Angular navigations package containing the TreeView component:

```bash
npm install @syncfusion/ej2-angular-navigations --save
```

For Angular versions below 12, use the ngcc (legacy) package:

```bash
npm install @syncfusion/ej2-angular-navigations@ngcc --save
```

## Module Setup

Import `TreeViewModule` in your Angular component using standalone architecture:

```typescript
import { Component } from '@angular/core';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-treeview-demo',
  standalone: true,
  imports: [FormsModule, TreeViewModule],
  template: `<ejs-treeview id="treeview" [fields]="treeFields"></ejs-treeview>`
})
export class TreeViewDemoComponent {
  // Component code here
}
```

For NgModule-based applications, add to your module:

```typescript
import { NgModule } from '@angular/core';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';

@NgModule({
  imports: [TreeViewModule],
  // ...
})
export class AppModule { }
```

## CSS Imports

Add Syncfusion theme CSS to your `styles.css` or Angular component. The recommended approach is to import in `styles.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/treeview/index.css";
```

**All Available Themes:**
- `material3.css` - Modern Material Design 3 (recommended)
- `material.css` - Original Material Design
- `fabric.css` - Microsoft Fluent Design System
- `bootstrap5.css` - Bootstrap 5 theme
- `bootstrap.css` - Bootstrap 4 theme
- `fluent.css` - Fluent Light theme
- `fluent-dark.css` - Fluent Dark theme
- `highcontrast.css` - High contrast for accessibility
- `tailwind.css` - Tailwind CSS theme
- `bootstrap-dark.css` - Bootstrap 4 Dark theme

**Theme Selection Guide:**
- Use `material3.css` for modern, contemporary applications
- Use `bootstrap5.css` if your app already uses Bootstrap 5
- Use `fluent.css`/`fluent-dark.css` for Microsoft/Windows-style apps
- Use `highcontrast.css` for accessibility compliance
- Use `tailwind.css` for Tailwind CSS projects

Or use in component metadata:

```typescript
@Component({
  selector: 'app-treeview',
  styleUrls: ['../node_modules/@syncfusion/ej2-navigations/styles/material3.css']
})
```

**Custom Resource Generator (CRG):**

For optimized bundle size, use CRG to include only the components and themes you need:
- Visit: https://crg.syncfusion.com/
- Select TreeView component
- Choose your theme
- Generate and download optimized CSS

## Creating Your First TreeView

Here's a minimal TreeView with hierarchical data:

```typescript
import { Component } from '@angular/core';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-basic-tree',
  standalone: true,
  imports: [FormsModule, TreeViewModule],
  template: `
    <div id="treeparent">
      <ejs-treeview 
        id="treeview" 
        [fields]="treeFields">
      </ejs-treeview>
    </div>
  `
})
export class BasicTreeViewComponent {
  treeFields: Object = {
    dataSource: [
      {
        id: 1,
        name: 'Folder 1',
        hasChild: true,
        expanded: true,
        child: [
          { id: 2, name: 'Item 1.1' },
          { id: 3, name: 'Item 1.2' }
        ]
      },
      {
        id: 4,
        name: 'Folder 2',
        hasChild: true,
        child: [
          { id: 5, name: 'Item 2.1' }
        ]
      }
    ],
    id: 'id',
    text: 'name',
    child: 'child',
    hasChildren: 'hasChild',
    expanded: 'expanded'
  };
}
```

## Basic Data Structure

TreeView works with hierarchical data. Two common approaches:

### Hierarchical (Nested) Data

Data with nested `child` arrays:

```typescript
const hierarchicalData = [
  {
    id: '01',
    name: 'Desktop',
    expanded: true,
    child: [
      { id: '01-01', name: 'Document1.txt' },
      { id: '01-02', name: 'Document2.docx' }
    ]
  },
  {
    id: '02',
    name: 'Downloads',
    child: [
      { id: '02-01', name: 'Image.png' }
    ]
  }
];

treeFields = {
  dataSource: hierarchicalData,
  id: 'id',
  text: 'name',
  child: 'child'
};
```

### Self-Referential (Flat) Data

Flat array with parent-child IDs:

```typescript
const flatData = [
  { id: 1, name: 'Desktop', pid: null, hasChild: true },
  { id: 2, name: 'Folder 1', pid: 1, hasChild: true },
  { id: 3, name: 'Folder 2', pid: 1, hasChild: false },
  { id: 4, name: 'File 1.txt', pid: 2 },
  { id: 5, name: 'File 2.txt', pid: 2 }
];

treeFields = {
  dataSource: flatData,
  id: 'id',
  parentID: 'pid',
  text: 'name',
  hasChildren: 'hasChild'
};
```

### Field Mapping Configuration

| Property | Purpose |
|----------|---------|
| `dataSource` | Array of data items |
| `id` | Unique identifier field name |
| `text` | Display text field name |
| `child` | Child array property name (hierarchical) |
| `parentID` | Parent ID field name (flat/self-referential) |
| `hasChildren` | Boolean property indicating if node has children |
| `expanded` | Boolean property for initial expand state |
| `selected` | Boolean property for initial selection |
| `isChecked` | Boolean property for checkbox state |
| `iconCss` | CSS class for node icon |
| `imageUrl` | Image URL for node |
| `tooltip` | Tooltip text for node |

## Rendering Output

After creating the component, TreeView renders with:
- Expand/collapse icons for parent nodes
- Hierarchical indentation for child nodes
- Text labels from mapped field
- Default Material theme styling

The component is now ready for adding features like checkboxes, drag-and-drop, editing, and more. See other reference files for feature-specific implementation.
