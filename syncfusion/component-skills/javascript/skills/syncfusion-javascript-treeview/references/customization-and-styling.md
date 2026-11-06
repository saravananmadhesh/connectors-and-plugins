# Customization & Styling

Customize TreeView appearance using CSS classes, themes, templates, and HTML attributes.

## Table of Contents

1. [CSS Customization](#css-customization)
   - 1.1 [Customizing Node Height](#customizing-node-height)
   - 1.2 [Customizing Node Text](#customizing-node-text)
   - 1.3 [Customizing Icons](#customizing-expandcollapse-icons)
   - 1.4 [Customizing Checkboxes](#customizing-checkboxes)
   - 1.5 [Customizing Node Icons](#customizing-node-icons)
2. [HTML Attributes Customization](#html-attributes-customization)
3. [Node Templates](#node-templates)
4. [Level-Based Customization](#level-based-customization)
5. [Themes & Appearance](#themes--appearance)
6. [RTL Support](#rtl-support)

---

## CSS Customization

The TreeView component provides specific CSS classes for customization. These classes target different parts of the component.

### Customizing Node Height

Use the `.e-list-item` and `.e-fullrow` classes to control node height:

```css
.e-treeview .e-list-item { 
    line-height: 45px; 
} 
.e-treeview .e-fullrow { 
    height: 45px; 
}
```

This adjusts the vertical spacing and height of each tree node.

### Customizing Node Text

Modify text appearance using the `.e-list-text` class:

```css
.e-treeview .e-list-text { 
    font-weight: bold;
    color: yellow !important;
} 
```

### Customizing Expand/Collapse Icons

Use these classes to style the expand and collapse indicator icons:

```css
.e-treeview .e-icon-expandable { 
    color: red; 
} 
.e-treeview .e-icon-collapsible { 
    color: black; 
}
```

The `.e-icon-expandable` class applies when a node is collapsed (can be expanded), while `.e-icon-collapsible` applies when a node is expanded (can be collapsed).

### Customizing Checkboxes

Apply custom styles to checkboxes:

```css
.e-treeview .e-checkbox-wrapper {
    margin-right: 8px;
}

.e-treeview .e-checkbox-wrapper .e-frame {
    border-color: #0078d4;
}

.e-treeview .e-checkbox-wrapper.e-check .e-frame {
    background-color: #0078d4;
    border-color: #0078d4;
}

.e-treeview .e-checkbox-wrapper.e-frame::before {
    color: white;
}
```

### Customizing Node Icons

Style the icons displayed next to node text:

```css
.e-treeview .e-list-item .e-icon {
    width: 20px;
    height: 20px;
    margin: 0 5px;
}

.e-treeview .e-list-item.e-level-1 .e-icon {
    color: #0078d4;
    font-weight: bold;
}

.e-treeview .e-list-item.e-level-2 .e-icon {
    color: #666;
}
```

## HTML Attributes Customization

Add custom HTML attributes to nodes for per-node styling:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView } from '@syncfusion/ej2-navigations';
enableRipple(true);

let data = [
    {
        id: 1,
        name: 'Inbox',
        htmlAttributes: { class: 'critical' }
    },
    {
        id: 2,
        name: 'Drafts',
        htmlAttributes: { class: 'normal' }
    },
    {
        id: 3,
        name: 'Archive',
        htmlAttributes: { class: 'normal' }
    }
];

let treeObj = new TreeView({
    fields: {
        dataSource: data,
        id: 'id',
        text: 'name',
        htmlAttributes: 'htmlAttributes'  // Map HTML attributes field
    }
});

treeObj.appendTo('#tree');
```

Then apply CSS based on custom classes:

```css
.e-treeview .e-list-item.critical {
    background-color: #ffe6e6;
    border-left: 3px solid #e81123;
}

.e-treeview .e-list-item.normal {
    background-color: #f5f5f5;
}
```

## CSS Classes Reference

| Class | Target | Purpose |
|-------|--------|---------|
| `.e-treeview` | Main container | Styles entire TreeView |
| `.e-list-item` | Individual node | Styles each tree node |
| `.e-list-text` | Node text | Styles node text content |
| `.e-fullrow` | Full row area | Background of entire row |
| `.e-icon-expandable` | Expand icon | Styles expand indicator (collapsed) |
| `.e-icon-collapsible` | Collapse icon | Styles collapse indicator (expanded) |
| `.e-checkbox-wrapper` | Checkbox area | Styles checkbox container |
| `.e-level-1` | Level 1 nodes | First level children |
| `.e-level-2` | Level 2 nodes | Second level children |
| `.e-level-n` | Level n nodes | Nth level children |
| `.e-node-focus` | Focused node | Currently focused node |
| `.e-active` | Active node | Selected/active node |

## Theme Customization

TreeView supports multiple built-in themes. Change theme by adding CSS:

```html
<!-- Material theme -->
<link href="https://cdn.jsdelivr.net/npm/@syncfusion/ej2-material@latest/dist/material.css" rel="stylesheet" />

<!-- Bootstrap theme -->
<link href="https://cdn.jsdelivr.net/npm/@syncfusion/ej2-bootstrap@latest/dist/bootstrap.css" rel="stylesheet" />

<!-- Fabric theme -->
<link href="https://cdn.jsdelivr.net/npm/@syncfusion/ej2-fabric@latest/dist/fabric.css" rel="stylesheet" />

<!-- High Contrast theme -->
<link href="https://cdn.jsdelivr.net/npm/@syncfusion/ej2-highcontrast@latest/dist/highcontrast.css" rel="stylesheet" />
```

## Tooltips

Set tooltips for tree nodes using the `tooltip` field:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView } from '@syncfusion/ej2-navigations';
enableRipple(true);

let hierarchicalData = [
    {
        id: '01', name: 'Local Disk (C:)', expanded: true, 
        tooltip: 'System drive',
        subChild: [
            { id: '01-01', name: 'Program Files', tooltip: 'Application directory' },
            { id: '01-02', name: 'Users', tooltip: 'User profiles directory' },
            { id: '01-03', name: 'Windows', tooltip: 'Windows system directory' }
        ]
    }
];

let treeObj = new TreeView({
    fields: { 
        dataSource: hierarchicalData, 
        id: 'id', 
        text: 'name', 
        child: 'subChild',
        tooltip: 'tooltip'  // Map tooltip field
    }
});

treeObj.appendTo('#tree');
```

## Level-Wise Customization

Apply styles and properties based on node level using CSS classes:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView } from '@syncfusion/ej2-navigations';
enableRipple(true);

let data = [
    {
        id: 1, name: 'Level 1 Parent', expanded: true,
        child: [
            {
                id: 2, name: 'Level 2 Parent', expanded: true,
                child: [
                    { id: 3, name: 'Level 3 Item' },
                    { id: 4, name: 'Level 3 Item' }
                ]
            }
        ]
    }
];

let treeObj = new TreeView({
    fields: { dataSource: data, id: 'id', text: 'name', child: 'child' },
    cssClass: 'customTree'  // Custom CSS class
});

treeObj.appendTo('#tree');
```

Apply level-based CSS:

```css
/* Style level 1 nodes (direct children) */
.customTree .e-level-1 {
    font-weight: bold;
    color: #333;
}

.customTree .e-level-1 .e-text-content {
    font-size: 16px;
}

/* Style level 2 nodes */
.customTree .e-level-2 {
    color: #666;
}

.customTree .e-level-2 .e-text-content {
    font-size: 14px;
}

/* Style level 3 nodes */
.customTree .e-level-3 {
    color: #999;
}

.customTree .e-level-3 .e-text-content {
    font-size: 12px;
}
```

## Auto Hide/Show Expand-Collapse Icons

Show expand/collapse icons only on hover:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView } from '@syncfusion/ej2-navigations';
enableRipple(true);

let countries = [
    { id: 1, name: 'India', hasChild: true },
    { id: 2, pid: 1, name: 'Assam' },
    { id: 3, pid: 1, name: 'Bihar' }
];

let treeObj = new TreeView({
    fields: { dataSource: countries, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' },
    created: onCreate
});

treeObj.appendTo('#tree');

function onCreate() {
    let treeElement = document.getElementById("tree");
    let collapseIcons = treeElement.querySelectorAll('.e-icons.e-icon-collapsible');
    let expandIcons = treeElement.querySelectorAll('.e-icons.e-icon-expandable');
    
    // Initially hide icons
    hideIcons(expandIcons, collapseIcons);
    
    // Show on mouseenter
    treeElement.addEventListener('mouseenter', (event: any) => {
        if (event.target.closest('.e-list-item')) {
            showIcons(expandIcons, collapseIcons);
        }
    });
    
    // Hide on mouseleave
    treeElement.addEventListener('mouseleave', (event: any) => {
        hideIcons(expandIcons, collapseIcons);
    });
}

function hideIcons(expand: NodeListOf<Element>, collapse: NodeListOf<Element>) {
    for (let icon of expand) {
        (icon as HTMLElement).style.visibility = 'hidden';
    }
    for (let icon of collapse) {
        (icon as HTMLElement).style.visibility = 'hidden';
    }
}

function showIcons(expand: NodeListOf<Element>, collapse: NodeListOf<Element>) {
    for (let icon of expand) {
        (icon as HTMLElement).style.visibility = 'visible';
    }
    for (let icon of collapse) {
        (icon as HTMLElement).style.visibility = 'visible';
    }
}
```

CSS to support icon hiding:

```css
.e-treeview .e-icons.e-icon-expandable,
.e-treeview .e-icons.e-icon-collapsible {
    visibility: hidden;
}

.e-treeview .e-list-item:hover .e-icons.e-icon-expandable,
.e-treeview .e-list-item:hover .e-icons.e-icon-collapsible {
    visibility: visible;
}
```

## Accordion-Like TreeView

Make only one parent expandable at a time:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView, NodeSelectEventArgs } from '@syncfusion/ej2-navigations';
enableRipple(true);

let continents = [
    {
        code: "AF", name: "Africa", countries: [
            { code: "NGA", name: "Nigeria" },
            { code: "EGY", name: "Egypt" }
        ]
    },
    {
        code: "AS", name: "Asia", countries: [
            { code: "CHN", name: "China" },
            { code: "IND", name: "India" }
        ]
    },
    {
        code: "EU", name: "Europe", countries: [
            { code: "DNK", name: "Denmark" },
            { code: "FIN", name: "Finland" }
        ]
    }
];

let treeObj = new TreeView({
    fields: { dataSource: continents, id: "code", text: "name", child: "countries" },
    nodeSelected: onNodeSelect,
    cssClass: "accordiontree"
});

treeObj.appendTo('#tree');

function onNodeSelect(args: NodeSelectEventArgs) {
    // If clicking on level-1 (parent), collapse all and expand only this one
    if (args.node.classList.contains('e-level-1')) {
        treeObj.collapseAll();
        treeObj.expandAll([args.node]);
    }
}
```

## Multi-Line Tree Nodes

Support multi-line node text with proper hover/selection:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView } from '@syncfusion/ej2-navigations';
enableRipple(true);

let hierarchicalData = [
    {
        id: 1, 
        name: 'Web Controls Web Controls Web Controls Web Controls',
        expanded: true,
        child: [
            { id: 2, name: 'Calendar Calendar Calendar Calendar' },
            { id: 3, name: 'Data Grid Data Grid Data Grid Data Grid' }
        ]
    }
];

let treeObj = new TreeView({
    fields: { dataSource: hierarchicalData, id: 'id', text: 'name', child: 'child' },
    nodeSelecting: onSelect,
    cssClass: "customTree"
});

treeObj.appendTo('#tree');

['mouseover', 'keydown'].forEach(evt =>
    (document.getElementById("tree") as HTMLElement).addEventListener(evt, (event) => {
        setHeight(event.target);
    }));

function onSelect(arg) {
    setHeight(arg.node);
}

// Set e-fullrow height to match e-text-content
function setHeight(element: any) {
    if (treeObj.fullRowSelect) {
        if (element.classList.contains("e-treeview")) {
            element = element.querySelector(".e-node-focus")?.querySelector(".e-fullrow");
        }
        else if (element.classList.contains("e-list-parent")) {
            element = element.querySelector(".e-fullrow");
        }
        else if (!element.classList.contains("e-fullrow") && element.closest(".e-list-item")) {
            element = element.closest(".e-list-item").querySelector(".e-fullrow");
        }
        if (element && element.nextElementSibling) {
            element.style.height = element.nextElementSibling.offsetHeight + "px";
        }
    }
}
```

CSS for multi-line support:

```css
.customTree .e-text-content {
    white-space: normal;
    word-wrap: break-word;
}

.customTree .e-fullrow {
    min-height: auto;
    height: auto;
}
```

## Best Practices

1. **Use specific selectors** - Target `.e-treeview` class to ensure styles apply only to TreeView
2. **Use `!important`** sparingly - Only when overriding default Syncfusion styles
3. **Test with different themes** - Ensure custom styles work with multiple themes
4. **Use HTML attributes** - For node-specific styling instead of complex CSS selectors
5. **Leverage level-based classes** - For hierarchical styling (`.e-level-n`)
6. **Consider accessibility** - Maintain sufficient color contrast and readable font sizes
