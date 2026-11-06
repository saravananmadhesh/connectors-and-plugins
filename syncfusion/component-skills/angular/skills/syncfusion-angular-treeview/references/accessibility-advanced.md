# Accessibility, Advanced Features & API Migration

## Table of Contents
- [Keyboard Navigation](#keyboard-navigation)
- [Accessibility (ARIA)](#accessibility-aria)
- [RTL Support](#rtl-support)
- [Advanced Methods](#advanced-methods)
- [Performance Optimization](#performance-optimization)
- [Accordion Tree Pattern](#accordion-tree-pattern)
- [EJ1 to EJ2 Migration](#ej1-to-ej2-migration)

---

## Keyboard Navigation

### Navigation Keys

TreeView supports standard keyboard navigation:

| Key | Action |
|-----|--------|
| `Arrow Up` | Select previous node |
| `Arrow Down` | Select next node |
| `Arrow Right` | Expand parent node |
| `Arrow Left` | Collapse parent node |
| `Enter` | Select/toggle checkbox of current node |
| `Space` | Toggle checkbox state |
| `Home` | Select first node |
| `End` | Select last node |
| `F2` | Edit current node (if allowEditing enabled) |
| `Delete` | Delete current node (if allowEditing enabled) |

### Example: Custom Keyboard Handling

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { NodeKeyPressEventArgs } from '@syncfusion/ej2-navigations';

@Component({
  template: `
    <ejs-treeview
      #treeview
      [fields]="treeFields"
      (keyPress)="onKeyPress($event)">
    </ejs-treeview>
  `
})
export class KeyboardNavigationComponent {
  @ViewChild('treeview') treeViewComponent?: TreeViewComponent;

  treeFields = { /* ... */ };

  onKeyPress(event: NodeKeyPressEventArgs): void {
    // Custom keyboard handling
    if (event.key === 'Delete') {
      event.preventDefault();
      if (confirm('Delete this node?')) {
        this.treeViewComponent?.removeNodes([event.nodeData.id]);
      }
    }
  }
}
```

### Disable Keyboard Navigation

```typescript
onKeyPress(event: NodeKeyPressEventArgs): void {
  // Prevent default keyboard behavior
  event.cancel = true;
}
```

## Accessibility (ARIA)

### Built-in ARIA Support

TreeView automatically includes ARIA attributes for screen readers:

```html
<!-- Example rendered TreeView with ARIA -->
<div role="tree">
  <div role="treeitem" aria-expanded="true" aria-level="1">
    <span>Parent Node</span>
    <div role="group">
      <div role="treeitem" aria-expanded="false" aria-level="2">
        <span>Child Node</span>
      </div>
    </div>
  </div>
</div>
```

### Key ARIA Attributes

- `role="tree"` - Container role
- `role="treeitem"` - Individual node role
- `role="group"` - Child nodes container
- `aria-expanded="true/false"` - Expansion state
- `aria-selected="true/false"` - Selection state
- `aria-level="1,2,3..."` - Node hierarchy level
- `aria-checked="true/false/mixed"` - Checkbox state

### Test with Screen Readers

```typescript
// Ensure all interactive elements are keyboard accessible
// Test with:
// - NVDA (Windows)
// - JAWS (Windows)
// - VoiceOver (macOS)
// - TalkBack (Android)
```

### Configure for Accessibility

```typescript
@Component({
  template: `
    <ejs-treeview
      id="accessible-tree"
      [fields]="treeFields"
      [allowMultiSelection]="true"
      [showCheckBox]="true"
      aria-label="Hierarchical navigation tree">
    </ejs-treeview>
  `
})
export class AccessibleTreeComponent {
  treeFields = { /* ... */ };
}
```

## RTL Support

### Enable Right-to-Left Layout

```typescript
import { Component } from '@angular/core';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-rtl-tree',
  standalone: true,
  imports: [TreeViewModule],
  template: `
    <div dir="rtl">
      <ejs-treeview
        [fields]="treeFields"
        [enableRtl]="true">
      </ejs-treeview>
    </div>
  `,
  styles: [`
    :host {
      direction: rtl;
    }
  `]
})
export class RTLTreeComponent {
  treeFields = { /* ... */ };
}
```

### RTL CSS

```css
/* RTL specific styles */
.e-rtl .e-treeview {
  direction: rtl;
  text-align: right;
}

.e-rtl .e-treeview .e-list-item {
  padding-left: 20px;
  padding-right: 0;
}

.e-rtl .e-treeview .e-icon-expandable {
  margin-left: 8px;
  margin-right: 0;
}
```

## Advanced Methods

### Get Tree Data

Retrieve all tree data or specific node data:

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  template: `
    <button (click)="getTreeData()">Get All Data</button>
    <button (click)="getNodeData('1')">Get Node 1</button>
    <ejs-treeview #treeview [fields]="treeFields"></ejs-treeview>
  `
})
export class GetDataComponent {
  @ViewChild('treeview') treeViewComponent?: TreeViewComponent;

  getTreeData(): void {
    const allData = this.treeViewComponent?.getTreeData();
    console.log('All tree data:', allData);
  }

  getNodeData(nodeId: string): void {
    const nodeData = this.treeViewComponent?.getTreeData(nodeId);
    console.log('Node data:', nodeData?.[0]);
  }
}
```

### Get Child Nodes

```typescript
getChildNodes(parentId: string): void {
  const allData = this.treeViewComponent?.getTreeData() || [];
  const children = allData.filter((node: any) => node.parentID === parentId);
  console.log('Child nodes:', children);
}
```

### Ensure Visibility

Scroll tree to make node visible:

```typescript
ensureNodeVisible(nodeId: string): void {
  this.treeViewComponent?.ensureVisible(nodeId);
}
```

### Get Node

```typescript
getNodeElement(nodeId: string): void {
  const nodeElement = this.treeViewComponent?.getNode(nodeId);
  console.log('Node element:', nodeElement);
}
```

### expandAll Method

Expands all the collapsed TreeView nodes. You can expand specific nodes by passing array of nodes as argument.

**Method Signature:**
```typescript
expandAll(nodes?: string[] | Element[], level?: number, excludeHiddenNodes?: boolean, preventAnimation?: boolean): void
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `nodes` (optional) | `string[] \| Element[]` | Array of TreeView node IDs or node elements to expand |
| `level` (optional) | `number` | Expand all nodes up to the given level |
| `excludeHiddenNodes` (optional) | `boolean` | Exclude hidden nodes when expanding all nodes |
| `preventAnimation` (optional) | `boolean` | Prevent the expand animation when expanding all nodes |

**Returns:** `void`

**Examples:**

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  template: `
    <ejs-treeview #treeview [fields]="treeFields"></ejs-treeview>
    <button (click)="expandSpecificNode()">Expand Node</button>
    <button (click)="expandAll()">Expand All</button>
    <button (click)="expandByLevel()">Expand Level 1</button>
  `
})
export class ExpandComponent {
  @ViewChild('treeview') treeViewComponent?: TreeViewComponent;

  // Expand specific node
  expandSpecificNode(): void {
    this.treeViewComponent?.expandAll(['2']);
  }

  // Expand all nodes
  expandAll(): void {
    this.treeViewComponent?.expandAll();
  }

  // Expand all nodes up to level 2
  expandByLevel(): void {
    this.treeViewComponent?.expandAll(undefined, 2);
  }

  // Expand without animation
  expandWithoutAnimation(): void {
    this.treeViewComponent?.expandAll(undefined, undefined, false, true);
  }

  // Expand excluding hidden nodes
  expandExcludingHidden(): void {
    this.treeViewComponent?.expandAll(undefined, undefined, true);
  }
}
```

---

### collapseAll Method

Collapses all the expanded TreeView nodes. You can collapse specific nodes by passing array of nodes as argument.

**Method Signature:**
```typescript
collapseAll(nodes?: string[] | Element[], level?: number, excludeHiddenNodes?: boolean): void
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `nodes` (optional) | `string[] \| Element[]` | Array of TreeView node IDs or node elements to collapse |
| `level` (optional) | `number` | Collapse all nodes up to the given level |
| `excludeHiddenNodes` (optional) | `boolean` | Exclude hidden nodes when collapsing all nodes |

**Returns:** `void`

**Examples:**

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  template: `
    <ejs-treeview #treeview [fields]="treeFields"></ejs-treeview>
    <button (click)="collapseSpecificNode()">Collapse Node</button>
    <button (click)="collapseAll()">Collapse All</button>
    <button (click)="collapseByLevel()">Collapse Level 1</button>
  `
})
export class CollapseComponent {
  @ViewChild('treeview') treeViewComponent?: TreeViewComponent;

  // Collapse specific node
  collapseSpecificNode(): void {
    this.treeViewComponent?.collapseAll(['2']);
  }

  // Collapse all nodes
  collapseAll(): void {
    this.treeViewComponent?.collapseAll();
  }

  // Collapse all nodes up to level 2
  collapseByLevel(): void {
    this.treeViewComponent?.collapseAll(undefined, 2);
  }

  // Collapse excluding hidden nodes
  collapseExcludingHidden(): void {
    this.treeViewComponent?.collapseAll(undefined, undefined, true);
  }
}
```

### Accordion Behavior

Only one parent expanded at a time:

```typescript
@Component({
  template: `
    <ejs-treeview
      #treeview
      [fields]="treeFields"
      (nodeExpanding)="onNodeExpanding($event)">
    </ejs-treeview>
  `
})
export class AccordionTreeComponent {
  @ViewChild('treeview') treeViewComponent?: TreeViewComponent;

  currentExpandedNode: string = '';

  onNodeExpanding(event: any): void {
    // Collapse previous expanded node
    if (this.currentExpandedNode && this.currentExpandedNode !== event.nodeData.id) {
      this.treeViewComponent?.collapseAll([this.currentExpandedNode]);
    }
    this.currentExpandedNode = event.nodeData.id;
  }
}
```

### Disable/Enable Nodes

```typescript
disableNodes(nodeIds: string[]): void {
  this.treeViewComponent?.disableNodes(nodeIds);
}

enableNodes(nodeIds: string[]): void {
  this.treeViewComponent?.enableNodes(nodeIds);
}
```

## Animation Control

### Disable or Customize Animations

```typescript
import { Component } from '@angular/core';
import { AnimationSettings } from '@syncfusion/ej2-angular-navigations';

@Component({
  template: `
    <ejs-treeview
      [fields]="treeFields"
      [animation]="animationSettings">
    </ejs-treeview>
  `
})
export class AnimationComponent {
  // Disable animations for better performance
  animationSettings: AnimationSettings = {
    expand: { duration: 0 },
    collapse: { duration: 0 }
  };
  
  // Or customize animation duration (default: 400ms)
  customAnimation: AnimationSettings = {
    expand: { duration: 200, easing: 'ease-out' },
    collapse: { duration: 150, easing: 'ease-in' }
  };
}
```

## Performance Optimization

### Lazy Loading (Load on Demand)

```typescript
<ejs-treeview
  [fields]="treeFields"
  [loadOnDemand]="true"
  (nodeExpanding)="onNodeExpanding($event)">
</ejs-treeview>

onNodeExpanding(event: any): void {
  // Load child nodes from server only when needed
  if (!event.nodeData.childrenLoaded) {
    this.loadChildNodes(event.nodeData.id);
    event.nodeData.childrenLoaded = true;
  }
}

loadChildNodes(parentId: string): void {
  // Fetch from API
  this.apiService.getChildren(parentId).subscribe((children: any[]) => {
    this.treeViewComponent?.addNodes(children, parentId);
  });
}
```

### Optimize Data Structure

```typescript
// Use flat self-referential structure for large datasets
const flatData = [
  { id: 1, name: 'Node 1', pid: null },
  { id: 2, name: 'Node 2', pid: 1 },
  // ... thousands more
];

// Not: deeply nested hierarchical structure
const badStructure = {
  id: 1,
  name: 'Node 1',
  child: [
    { id: 2, name: 'Node 2', child: [...] }
  ]
};
```

### Use enablePersistence

Cache tree state in browser:

```typescript
<ejs-treeview
  [fields]="treeFields"
  [enablePersistence]="true">
</ejs-treeview>

// Automatically saves/restores:
// - Expanded nodes
// - Selected nodes
// - Scroll position
```

## EJ1 to EJ2 Migration

### Major API Changes

| Feature | EJ1 | EJ2 |
|---------|-----|-----|
| **Module** | ejTreeView | TreeViewModule |
| **Template** | `<div id="tree"></div>` | `<ejs-treeview></ejs-treeview>` |
| **Add Node** | `addNode()` | `addNodes()` |
| **Remove Node** | `removeNode()` | `removeNodes()` |
| **Update Text** | `updateText()` | `updateNode()` |
| **Move Node** | `moveNode()` | `moveNodes()` |
| **Get Text** | `getText()` | `getNode()['text']` |
| **Keyboard** | `allowKeyboardNavigation` | `keyPress` event |
| **Event** | `create` | `created` |
| **Event** | `ready` | `dataBound` |

### Migration Example

**EJ1:**
```typescript
$("#tree").ejTreeView({
  fields: { 
    dataSource: data, 
    id: "id", 
    text: "text",
    parentId: "parent"
  }
});

var treeObj = $("#tree").data("ejTreeView");
treeObj.addNode("NewNode", "#node1");
```

**EJ2:**
```typescript
@Component({
  template: `
    <ejs-treeview 
      #treeview 
      [fields]="treeFields">
    </ejs-treeview>
  `
})
export class TreeViewComponent {
  @ViewChild('treeview') treeViewComponent?: TreeViewComponent;

  treeFields = {
    dataSource: data,
    id: 'id',
    text: 'text',
    parentID: 'parent'
  };

  addNewNode(): void {
    this.treeViewComponent?.addNodes(
      [{ id: 'new', text: 'NewNode' }],
      'node1'
    );
  }
}
```

### Event Migration

| EJ1 | EJ2 |
|-----|-----|
| `beforeAdd` | Not applicable |
| `nodeAdd` | `dataSourceChanged` |
| `nodeClick` | `nodeClicked` |
| `nodeDelete` | `dataSourceChanged` |
| `beforeDelete` | Not applicable |
| `nodeCheckChange` | `nodeChecked` |
| `beforeCheckChange` | `nodeChecking` |
| `create` | `created` |
| `destroy` | `destroyed` |

---

## Accordion Tree Pattern

### Single Expansion with Automatic Collapse

Implement accordion behavior where only one branch can be expanded at a time. When expanding a node, all previously expanded nodes are automatically collapsed:

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { NodeSelectEventArgs } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-accordion-tree',
  standalone: true,
  imports: [FormsModule, TreeViewModule],
  template: `
    <ejs-treeview 
      #treevalidate
      [fields]="field"
      (nodeSelected)="nodeSelect($event)"
      [cssClass]="'accordiontree'">
    </ejs-treeview>
  `,
  styles: [`
    :host ::ng-deep .accordiontree {
      max-height: 400px;
      overflow-y: auto;
    }
    
    :host ::ng-deep .accordiontree .e-level-1 {
      font-weight: 600;
    }
  `]
})
export class AccordionTreeComponent {
  @ViewChild('treevalidate') tree?: TreeViewComponent;

  public continents: Object[] = [
    {
      code: "AF", name: "Africa", countries: [
        { code: "NGA", name: "Nigeria" },
        { code: "EGY", name: "Egypt" },
        { code: "ZAF", name: "South Africa" }
      ]
    },
    {
      code: "AS", name: "Asia", countries: [
        { code: "CHN", name: "China" },
        { code: "IND", name: "India", selected: true },
        { code: "JPN", name: "Japan" }
      ]
    },
    {
      code: "EU", name: "Europe", countries: [
        { code: "DNK", name: "Denmark" },
        { code: "FIN", name: "Finland" },
        { code: "AUT", name: "Austria" }
      ]
    },
    {
      code: "NA", name: "North America", countries: [
        { code: "USA", name: "United States of America" },
        { code: "CUB", name: "Cuba" },
        { code: "MEX", name: "Mexico" }
      ]
    }
  ];

  public field: Object = { 
    dataSource: this.continents, 
    id: "code", 
    text: "name", 
    child: "countries" 
  };

  public nodeSelect(args: NodeSelectEventArgs): void {
    // Check if clicked node is a level-1 (parent) node
    if (args.node.classList.contains('e-level-1')) {
      // Collapse all nodes first
      this.tree?.collapseAll();
      
      // Expand only the selected node
      this.tree?.expandAll([args.node]);
      
      // Disable auto-expand on click
      (this.tree as TreeViewComponent).expandOn = 'None';
    }
  }
}
```

**Key Features:**
- Only one parent node expanded at a time
- Child nodes automatically collapse when switching parents
- Better for compact interfaces with many top-level categories
- Prevents information overload

**Use Cases:**
- File explorer with mutually exclusive folders
- Settings menu with collapsible sections
- Categorized navigation systems
- FAQs or help documentation

**Implementation Details:**
1. Listen to `nodeSelected` event
2. Check if clicked node is a parent (level-1)
3. Collapse all nodes with `collapseAll()`
4. Expand only the selected node with `expandAll([args.node])`
5. Set `expandOn` to 'None' to prevent auto-expand

---

**Best Practices:**
- Use keyboard navigation for accessibility
- Enable RTL for multilingual apps
- Test with screen readers regularly
- Implement lazy loading for 1000+ nodes
- Use flat data structure for large datasets
- Optimize render performance with virtual scrolling
- Plan migration timeline for EJ1 apps
- Maintain accessibility during migrations
