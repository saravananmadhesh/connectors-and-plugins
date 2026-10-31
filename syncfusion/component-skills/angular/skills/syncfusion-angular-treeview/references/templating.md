# Templating & Styling Nodes

## Table of Contents
- [Draw Node Event](#draw-node-event)
- [Node Templates](#node-templates)
- [Custom Icons](#custom-icons)
- [Node Styling](#node-styling)
- [Level-Based Customization](#level-based-customization)
- [Tooltips](#tooltips)
- [Multi-Line Nodes](#multi-line-nodes)
- [Dynamic Icons](#dynamic-icons)
- [Node Tooltips](#node-tooltips)
- [Auto-Hide/Show Expand-Collapse Icons](#auto-hideshow-expand-collapse-icons)

---

## Draw Node Event

The `drawNode` event is triggered before each node is rendered, allowing you to customize node appearance dynamically:

```typescript
import { Component } from '@angular/core';
import { DrawNodeEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  template: `
    <ejs-treeview 
      [fields]="treeFields"
      (drawNode)="onDrawNode($event)">
    </ejs-treeview>
  `
})
export class DrawNodeComponent {
  onDrawNode(event: DrawNodeEventArgs): void {
    // Access node element and data
    const nodeElement = event.node;           // HTML element
    const nodeData = event.nodeData;          // Node data object
    
    // Customize appearance
    if (nodeData?.type === 'folder') {
      nodeElement?.classList.add('folder-node');
    } else if (nodeData?.type === 'file') {
      nodeElement?.classList.add('file-node');
    }
    
    // Add data attributes
    nodeElement?.setAttribute('data-size', nodeData?.size || 'unknown');
  }
}
```

**When to use `drawNode` event:**
- Conditional node styling based on data
- Adding custom attributes to nodes
- Dynamic icon assignment
- Hide/show elements conditionally
- Apply different styles per level
- Add accessibility attributes

## Node Templates

### Basic Template

Create custom node appearance using `nodeTemplate`:

```typescript
import { Component } from '@angular/core';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-tree',
  standalone: true,
  imports: [FormsModule, TreeViewModule],
  template: `
    <ejs-treeview 
      [fields]="treeFields"
      [nodeTemplate]="nodeTemplate">
    </ejs-treeview>
    
    <ng-template #nodeTemplate let-data>
      <div class="node-content">
        <strong>${data.name}</strong>
        <span class="node-type">${data.type}</span>
      </div>
    </ng-template>
  `
})
export class TemplateTreeComponent {
  treeFields = {
    dataSource: [
      { id: 1, name: 'Documents', type: 'folder', hasChild: true },
      { id: 2, pid: 1, name: 'Report.pdf', type: 'file' }
    ],
    id: 'id',
    parentID: 'pid',
    text: 'name'
  };

  nodeTemplate: any;
}
```

### Template with Multiple Fields

```typescript
<ng-template #nodeTemplate let-data>
  <div class="employee-card">
    <img [src]="'assets/employees/' + data.image" alt="Photo">
    <div class="employee-info">
      <strong>${data.name}</strong>
      <small>${data.designation}</small>
    </div>
  </div>
</ng-template>
```

Data structure:

```typescript
treeData = [
  {
    id: 1,
    name: 'CEO',
    designation: 'Chief Executive Officer',
    image: 'ceo.jpg',
    hasChild: true,
    child: [
      {
        id: 2,
        pid: 1,
        name: 'Manager 1',
        designation: 'Department Manager',
        image: 'manager1.jpg'
      }
    ]
  }
];
```

### Conditional Templates (Different Template per Level)

```typescript
@Component({
  template: `
    <ejs-treeview 
      #treeview
      [fields]="treeFields"
      (drawNode)="onDrawNode($event)">
    </ejs-treeview>
  `
})
export class ConditionalTemplateComponent {
  treeFields = {
    dataSource: [
      { id: 1, name: 'Category 1', level: 1, hasChild: true },
      { id: 2, pid: 1, name: 'Product 1', level: 2 },
      { id: 3, pid: 1, name: 'Product 2', level: 2 }
    ],
    id: 'id',
    parentID: 'pid',
    text: 'name'
  };

  onDrawNode(event: DrawNodeEventArgs): void {
    const level = event.nodeData?.level;
    const textElement = event.node?.querySelector('.e-list-text');
    
    if (level === 1) {
      // Format category nodes differently
      textElement?.classList.add('category-template');
      textElement!.innerHTML = `<strong>📁 ${event.nodeData?.name}</strong>`;
    } else if (level === 2) {
      // Format product nodes
      textElement?.classList.add('product-template');
      textElement!.innerHTML = `<span>📦 ${event.nodeData?.name}</span>`;
    }
  }
}
```

### Rich HTML Templates

```typescript
<ng-template #richTemplate let-data>
  <div class="rich-node">
    <div class="node-header">
      <h4>${data.name}</h4>
      <span class="badge" *ngIf="data.status === 'active'">Active</span>
    </div>
    <div class="node-details">
      <p class="description">${data.description}</p>
      <div class="metadata">
        <span class="date">Modified: ${data.modified}</span>
        <span class="size" *ngIf="data.size">Size: ${data.size}KB</span>
      </div>
    </div>
  </div>
</ng-template>

<style>
  .rich-node {
    padding: 8px;
  }
  
  .node-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .node-header h4 {
    margin: 0;
    font-size: 14px;
  }
  
  .badge {
    padding: 2px 6px;
    background: #4caf50;
    color: white;
    border-radius: 3px;
    font-size: 11px;
  }
  
  .description {
    margin: 4px 0;
    font-size: 12px;
    color: #666;
  }
  
  .metadata {
    display: flex;
    gap: 12px;
    font-size: 11px;
    color: #999;
  }
</style>
```

## Custom Icons

### Using iconCss Property

Map custom icon classes to nodes:

```typescript
treeFields = {
  dataSource: [
    {
      id: 1,
      name: 'Music',
      iconCss: 'e-icons e-folder-music',
      hasChild: true,
      child: [
        { id: 2, pid: 1, name: 'Song1.mp3', iconCss: 'e-icons e-audio' }
      ]
    },
    {
      id: 3,
      name: 'Videos',
      iconCss: 'e-icons e-folder-video',
      hasChild: true,
      child: [
        { id: 4, pid: 3, name: 'Video.mp4', iconCss: 'e-icons e-video' }
      ]
    }
  ],
  id: 'id',
  parentID: 'pid',
  text: 'name',
  iconCss: 'iconCss'  // Map icon field
};
```

Use Syncfusion icon library or custom icon classes.

### Dynamic Icons Based on State

```typescript
import { Component, ViewChild } from '@angular/core';
import { DrawNodeEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  template: `
    <ejs-treeview 
      #treeview
      [fields]="treeFields"
      (drawNode)="onDrawNode($event)">
    </ejs-treeview>
  `
})
export class DynamicIconComponent {
  treeFields = {
    dataSource: [
      { id: 1, name: 'Active', status: 'active', hasChild: true },
      { id: 2, pid: 1, name: 'Item 1', status: 'inactive' }
    ],
    id: 'id',
    parentID: 'pid',
    text: 'name'
  };

  onDrawNode(event: DrawNodeEventArgs): void {
    // Change icon based on node status
    const statusIcon = event.nodeData?.status === 'active' 
      ? 'e-check' 
      : 'e-close';
    
    const iconElement = event.node?.querySelector('.e-list-icon');
    if (iconElement) {
      iconElement.className = `e-list-icon e-icons ${statusIcon}`;
    }
  }
}
```

## Node Styling

### CSS Classes for Styling

```css
/* Style all nodes */
.e-treeview .e-list-text {
  font-size: 14px;
  font-weight: 500;
}

/* Style node text */
.e-treeview .e-list-text {
  color: #333;
}

/* Hover effect */
.e-treeview .e-list-item:hover {
  background-color: #f5f5f5;
}

/* Selected node */
.e-treeview .e-list-item.e-active {
  background-color: #e3f2fd;
  border-left: 4px solid #2196F3;
}
```

### Apply cssClass to TreeView

```typescript
<ejs-treeview 
  [fields]="treeFields"
  cssClass="custom-tree">
</ejs-treeview>

/* Custom styles */
.custom-tree .e-list-text {
  font-weight: bold;
  color: darkblue;
}

.custom-tree .e-list-item:hover {
  background-color: lightyellow;
}
```

## Level-Based Customization

### Style Nodes by Hierarchy Level

```typescript
@Component({
  template: `
    <ejs-treeview 
      [fields]="treeFields"
      [cssClass]="'level-styled-tree'">
    </ejs-treeview>
  `,
  styles: [`
    .level-styled-tree .e-level-1 > .e-text-content {
      font-size: 16px;
      font-weight: bold;
      color: #1976d2;
      background-color: #e3f2fd;
      padding: 8px;
    }
    
    .level-styled-tree .e-level-2 > .e-text-content {
      font-size: 14px;
      font-weight: 600;
      color: #388e3c;
      background-color: #e8f5e9;
    }
    
    .level-styled-tree .e-level-3 > .e-text-content {
      font-size: 13px;
      color: #7b1fa2;
    }
  `]
})
export class LevelStyledComponent {
  treeFields = { /* ... */ };
}
```

TreeView automatically adds classes: `.e-level-1`, `.e-level-2`, `.e-level-3`, etc.

### Conditional Level Styling

```typescript
onDrawNode(event: DrawNodeEventArgs): void {
  const level = parseInt(event.node?.getAttribute('aria-level') || '0');
  
  if (level === 1) {
    event.node?.classList.add('level-1-custom');
  } else if (level === 2) {
    event.node?.classList.add('level-2-custom');
  }
}
```

## Tooltips

### Basic Tooltip

Add tooltip text to nodes through data field:

```typescript
treeFields = {
  dataSource: [
    {
      id: 1,
      name: 'Desktop',
      tooltip: 'Main desktop folder',
      hasChild: true,
      child: [
        { id: 2, pid: 1, name: 'Document.txt', tooltip: 'Text document' }
      ]
    }
  ],
  id: 'id',
  parentID: 'pid',
  text: 'name',
  tooltip: 'tooltip'  // Map tooltip field
};
```

### Dynamic Tooltip on Hover

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  template: `
    <ejs-treeview 
      #treeview
      [fields]="treeFields"
      (created)="onTreeCreated()">
    </ejs-treeview>
  `
})
export class DynamicTooltipComponent {
  @ViewChild('treeview') treeViewComponent?: TreeViewComponent;

  onTreeCreated(): void {
    const treeElement = this.treeViewComponent?.element;
    treeElement?.addEventListener('mouseenter', (event: any) => {
      const listItem = (event.target as HTMLElement).closest('.e-list-item');
      const nodeData = this.treeViewComponent?.getTreeData(
        listItem?.getAttribute('data-uid') || ''
      )[0];
      
      if (nodeData?.tooltip) {
        this.showTooltip(event.target as HTMLElement, nodeData.tooltip);
      }
    }, true);
  }

  showTooltip(element: HTMLElement, text: string): void {
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = text;
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = '#333';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '4px 8px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '12px';
    
    document.body.appendChild(tooltip);
    
    // Position near element
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = (rect.top - 30) + 'px';
    
    // Remove after delay
    setTimeout(() => tooltip.remove(), 3000);
  }
}
```

## Multi-Line Nodes

### Display Multi-Line Content

```typescript
<ng-template #nodeTemplate let-data>
  <div class="multiline-node">
    <div class="node-title">${data.name}</div>
    <div class="node-description">${data.description}</div>
    <small class="node-meta">Modified: ${data.modified}</small>
  </div>
</ng-template>

<style>
  .multiline-node {
    padding: 8px 0;
    line-height: 1.4;
  }
  
  .node-title {
    font-weight: bold;
    color: #333;
  }
  
  .node-description {
    font-size: 12px;
    color: #666;
  }
  
  .node-meta {
    font-size: 11px;
    color: #999;
  }
</style>
```

### Adjust Row Height for Multi-Line

```typescript
@Component({
  template: `...`,
  styles: [`
    .e-treeview .e-list-item {
      line-height: auto;
      height: auto;
      min-height: 45px;
    }
    
    .e-treeview .e-fullrow {
      height: auto;
      min-height: 45px;
    }
    
    .e-treeview .e-text-content {
      display: flex;
      align-items: center;
      min-height: 45px;
    }
  `]
})
export class MultiLineComponent {
  treeFields = { /* ... */ };
}
```

### Handle Hover on Multi-Line Nodes

```typescript
onNodeSelecting(event: any): void {
  // Synchronize row height with content height
  const contentElement = event.node?.querySelector('.e-text-content');
  const rowElement = event.node?.querySelector('.e-fullrow');
  
  if (contentElement && rowElement) {
    const height = contentElement.scrollHeight;
    rowElement.style.height = height + 'px';
  }
}
```

---

## Dynamic Icons

### Get and Apply Dynamic Icons Based on Node State

Retrieve the original bound data using the `getTreeData` method to apply dynamic icons based on node properties or events:

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { NodeCheckEventArgs } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-dynamic-icon',
  standalone: true,
  imports: [FormsModule, TreeViewModule],
  template: `
    <ejs-treeview 
      #treevalidate
      [fields]="field"
      [showCheckBox]="true"
      [autoCheck]="false"
      (nodeChecking)="onNodeCheck($event)">
    </ejs-treeview>
  `
})
export class DynamicIconComponent {
  @ViewChild('treevalidate') tree?: TreeViewComponent;

  public treeData: Object[] = [
    {
      "nodeId": "01", "nodeText": "Music", "icon": "folder", "expanded": true, "nodeChild": [
        { "nodeId": "01-01", "nodeText": "Gouttes.mp3", "icon": "audio" }
      ]
    },
    {
      "nodeId": "02", "nodeText": "Videos", "icon": "folder", "expanded": true, "nodeChild": [
        { "nodeId": "02-01", "nodeText": "Naturals.mp4", "icon": "video" },
        { "nodeId": "02-02", "nodeText": "Wild.mpeg", "icon": "video" }
      ]
    }
  ];

  public field: Object = { 
    dataSource: this.treeData, 
    id: 'nodeId', 
    text: 'nodeText', 
    child: 'nodeChild', 
    iconCss: 'icon', 
    expanded: 'expanded' 
  };

  public onNodeCheck(args: NodeCheckEventArgs): void {
    let nodeId: any = args.data[0]['id'];
    // Retrieve the iconCss dynamically
    let iconClass = this.tree?.getTreeData(nodeId)[0]['icon'];
    console.log('Icon class for node:', iconClass);
  }
}
```

**Use Cases:**
- Display different icons based on node type or status
- Show media type icons for files
- Apply custom icons based on permissions

---

## Node Tooltips

### Set Tooltip for Tree Nodes

Add tooltips to tree nodes through data source mapping for displaying additional information on hover:

```typescript
import { Component } from '@angular/core';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-tooltip-tree',
  standalone: true,
  imports: [FormsModule, TreeViewModule],
  template: `
    <ejs-treeview [fields]="field"></ejs-treeview>
  `
})
export class TooltipTreeComponent {
  public hierarchicalData: Object[] = [
    {
      id: '01', name: 'Local Disk (C:)', expanded: true, tooltip: 'Local Disk (C:)',
      subChild: [
        {
          id: '01-01', name: 'Program Files', tooltip: 'Program Files',
          subChild: [
            { id: '01-01-01', name: 'Windows NT', tooltip: 'Windows NT' },
            { id: '01-01-02', name: 'Windows Mail', tooltip: 'Windows Mail' }
          ]
        },
        {
          id: '01-02', name: 'Users', expanded: true, tooltip: 'Users',
          subChild: [
            { id: '01-02-01', name: 'Smith', tooltip: 'Smith' },
            { id: '01-02-02', name: 'Public', tooltip: 'Public' }
          ]
        }
      ]
    },
    {
      id: '02', name: 'Local Disk (D:)', tooltip: 'Local Disk (D:)',
      subChild: [
        {
          id: '02-01', name: 'Personals', tooltip: 'Personals',
          subChild: [
            { id: '02-01-01', name: 'My photo.png', tooltip: 'My photo.png' },
            { id: '02-01-02', name: 'Document.docx', tooltip: 'Document.docx' }
          ]
        }
      ]
    }
  ];

  public field: Object = { 
    dataSource: this.hierarchicalData, 
    id: 'id', 
    text: 'name', 
    child: 'subChild' 
  };
}
```

**Tooltip Field Mapping:**
The field settings support a `tooltip` property that maps to a data source field:

```typescript
public field: Object = { 
  dataSource: this.data,
  id: 'id',
  text: 'name',
  tooltip: 'description',  // Maps to the tooltip field in data
  child: 'children'
};
```

---

## Auto-Hide/Show Expand-Collapse Icons

### Show Expand/Collapse Icons Only on Hover

Create a cleaner interface by hiding expand/collapse icons and displaying them only when hovering over the tree:

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-auto-hide-icon',
  standalone: true,
  imports: [FormsModule, TreeViewModule],
  template: `
    <ejs-treeview 
      #treevalidate
      [fields]="field"
      (created)="onCreate()">
    </ejs-treeview>
  `,
  styles: [`
    :host ::ng-deep .hide-icons .e-icons.e-icon-collapsible,
    :host ::ng-deep .hide-icons .e-icons.e-icon-expandable {
      visibility: hidden;
    }
  `]
})
export class AutoHideIconComponent {
  @ViewChild('treevalidate') tree?: TreeViewComponent;

  public countries: Object[] = [
    { id: 1, name: 'India', hasChild: true },
    { id: 2, pid: 1, name: 'Assam' },
    { id: 3, pid: 1, name: 'Bihar' },
    { id: 7, name: 'Brazil', hasChild: true },
    { id: 8, pid: 7, name: 'Paraná' },
    { id: 9, pid: 7, name: 'Ceará' },
  ];

  public field: Object = { 
    dataSource: this.countries, 
    id: 'id', 
    text: 'name', 
    parentID: 'pid', 
    hasChildren: 'hasChild' 
  };

  public onCreate(): void {
    const treeElement = (this.tree as any)?.element;
    
    // Get all expand/collapse icons
    let collapse: NodeListOf<Element> = treeElement?.querySelectorAll('.e-icons.e-icon-collapsible');
    let expand: NodeListOf<Element> = treeElement?.querySelectorAll('.e-icons.e-icon-expandable');
    
    // Hide icons initially
    this.hideIcon(expand, collapse);
    
    // Show icons on hover
    treeElement?.addEventListener('mouseenter', () => {
      this.showIcon(expand, collapse);
    });
    
    // Hide icons when mouse leaves
    treeElement?.addEventListener('mouseleave', () => {
      this.hideIcon(expand, collapse);
    });
  }

  private hideIcon(expand: NodeListOf<Element>, collapse: NodeListOf<Element>): void {
    for (let i: number = 0; i < (collapse?.length || 0); i++) {
      collapse[i]?.setAttribute('style', 'visibility: hidden');
    }
    for (let j: number = 0; j < (expand?.length || 0); j++) {
      expand[j]?.setAttribute('style', 'visibility: hidden');
    }
  }

  private showIcon(expand: NodeListOf<Element>, collapse: NodeListOf<Element>): void {
    for (let i: number = 0; i < (collapse?.length || 0); i++) {
      collapse[i]?.setAttribute('style', 'visibility: visible');
    }
    for (let j: number = 0; j < (expand?.length || 0); j++) {
      expand[j]?.setAttribute('style', 'visibility: visible');
    }
  }
}
```

**Benefits:**
- Cleaner, less cluttered interface
- Icons appear on demand for better UX
- Reduces visual noise for static trees
- Better focus on node content

---

**Best Practices:**
- Keep templates simple for better performance
- Use level-based styling to create visual hierarchy
- Provide tooltips for truncated text
- Test templates with various data lengths
- Use CSS classes instead of inline styles
- Consider performance with large trees (1000+ nodes)
- Ensure templates remain readable at various zoom levels
