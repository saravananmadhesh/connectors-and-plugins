# Node Selection in TreeView

## Table of Contents
- [Overview](#overview)
- [Checkbox Selection](#checkbox-selection)
- [Checkbox States](#checkbox-states)
- [Checkbox Properties](#checkbox-properties)
- [Multi-Selection](#multi-selection)
- [Single Selection](#single-selection)
- [Selection Events](#selection-events)
- [Getting Selected Nodes](#getting-selected-nodes)
- [Advanced Checkbox Control](#advanced-checkbox-control)
- [Select One Child](#select-one-child)
- [Remove Parent Checkbox](#remove-parent-checkbox)
- [Checkbox Toggle on Node Text Click](#checkbox-toggle-on-node-text-click)
- [Disable Checkbox on Specific Nodes](#disable-checkbox-on-specific-nodes)

---

## Overview

TreeView supports multiple selection modes:
- **Checkbox selection**: Hierarchical checkboxes with parent-child relationships
- **Multi-selection**: Multiple nodes with Ctrl+Click or Shift+Click
- **Single selection**: One node selected at a time (default)

## Checkbox Selection

### Enable Checkboxes

Add checkboxes before each tree node:

```typescript
import { Component } from '@angular/core';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox-tree',
  standalone: true,
  imports: [FormsModule, TreeViewModule],
  template: `
    <ejs-treeview 
      [fields]="treeFields"
      [showCheckBox]="true">
    </ejs-treeview>
  `
})
export class CheckboxTreeComponent {
  treeFields = {
    dataSource: [
      {
        id: 1,
        name: 'Australia',
        hasChild: true,
        expanded: true,
        child: [
          { id: 2, pid: 1, name: 'New South Wales' },
          { id: 3, pid: 1, name: 'Victoria' },
          { id: 4, pid: 1, name: 'South Australia' }
        ]
      },
      {
        id: 5,
        name: 'Brazil',
        hasChild: true,
        child: [
          { id: 6, pid: 5, name: 'Paraná' },
          { id: 7, pid: 5, name: 'Ceará' }
        ]
      }
    ],
    id: 'id',
    parentID: 'pid',
    text: 'name',
    hasChildren: 'hasChild',
    expanded: 'expanded'
  };
}
```

## Checkbox States

### Tri-State Checkboxes (Default)

When `autoCheck` is enabled (default):
- **Checked**: All child nodes are checked
- **Unchecked**: All child nodes are unchecked
- **Intermediate (tri-state)**: Some child nodes are checked

```typescript
autoCheck = true;  // Parent/child auto-check enabled (default)
```

Parent node automatically:
- Becomes checked when ALL children are checked
- Becomes unchecked when ALL children are unchecked
- Becomes tri-state when SOME children are checked

### Independent Checkbox States

Make parent and child checkboxes independent:

```typescript
autoCheck = false;  // No auto-relationship

<ejs-treeview 
  [fields]="treeFields"
  [showCheckBox]="true"
  [autoCheck]="false">
</ejs-treeview>
```

## Checkbox Properties

### Set Initially Checked Nodes

```typescript
treeFields = {
  dataSource: [
    { id: 1, name: 'Australia', hasChild: true, isChecked: true },
    { id: 2, pid: 1, name: 'New South Wales', isChecked: true },
    { id: 3, pid: 1, name: 'Victoria' }
  ],
  id: 'id',
  parentID: 'pid',
  text: 'name',
  isChecked: 'isChecked'  // Map checkbox state
};
```

### Get Currently Checked Nodes

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  template: `
    <ejs-treeview #treeview [fields]="treeFields" [showCheckBox]="true"></ejs-treeview>
    <button (click)="getChecked()">Get Checked Nodes</button>
  `
})
export class GetCheckedComponent {
  @ViewChild('treeview') treeViewComponent?: TreeViewComponent;

  getChecked(): void {
    const checkedNodes = this.treeViewComponent?.getAllCheckedNodes();
    console.log('Checked node IDs:', checkedNodes);
  }
}
```

## Multi-Selection

### Enable Multi-Selection

Select multiple nodes without checkboxes using keyboard:

```typescript
<ejs-treeview 
  [fields]="treeFields"
  [allowMultiSelection]="true">
</ejs-treeview>
```

**Selection methods:**
- `Ctrl + Click`: Toggle individual node selection
- `Shift + Click`: Select continuous range from last selected node
- `Click`: Single selection (replaces previous)


## Single Selection

Single selection is default. Only one node can be selected at a time:

```typescript
<ejs-treeview 
  [fields]="treeFields"
  [allowMultiSelection]="false">
</ejs-treeview>
```

Or explicitly:

```typescript
allowMultiSelection = false;
```

## Selection Events

### nodeSelected Event

Triggered when a node is selected:

```typescript
<ejs-treeview 
  [fields]="treeFields"
  [allowMultiSelection]="true"
  (nodeSelected)="onNodeSelected($event)">
</ejs-treeview>

onNodeSelected(event: any): void {
  console.log('Selected node:', event.nodeData.name);
  console.log('Node ID:', event.nodeData.id);
}
```

### nodeSelecting Event

Triggered before selection. Allows canceling selection:

```typescript
(nodeSelecting)="onNodeSelecting($event)"

onNodeSelecting(event: any): void {
  // Prevent selection of specific nodes
  if (event.nodeData.id === 'restricted') {
    event.cancel = true;  // Prevent this node from being selected
  }
}
```

### nodeChecking Event

Triggered before checkbox changes:

```typescript
(nodeChecking)="onNodeChecking($event)"

onNodeChecking(event: any): void {
  console.log('About to check/uncheck node:', event.data[0].name);
  // Can set event.cancel = true to prevent
}
```

### nodeChecked Event

Triggered after checkbox state changes:

```typescript
(nodeChecked)="onNodeChecked($event)"

onNodeChecked(event: any): void {
  console.log('Node checked:', event.data[0].name);
  console.log('Checked state:', event.data[0].checked);
}
```

### Get Checked Node Information

```typescript
const checkedIds = this.treeViewComponent?.getAllCheckedNodes();
checkedIds?.forEach(id => {
  const nodeData = this.treeViewComponent?.getTreeData(id)[0];
  console.log('Checked node:', nodeData.name);
});
```

### Get Checked Nodes with Full Data

```typescript
getFullCheckedNodeData(): any[] {
  const checkedIds = this.treeViewComponent?.getAllCheckedNodes() || [];
  const allNodes = this.treeViewComponent?.getTreeData() || [];
  
  return allNodes.filter((node: any) => checkedIds.includes(node.id));
}
```

### Export Checked Nodes

```typescript
exportCheckedNodesAsJson(): string {
  const checkedData = this.getFullCheckedNodeData();
  return JSON.stringify(checkedData, null, 2);
}
```

## Advanced Checkbox Control

### Disable Checkbox on Specific Nodes

Use the `drawNode` event to disable checkboxes for certain nodes:

```typescript
import { DrawNodeEventArgs } from '@syncfusion/ej2-angular-navigations';

<ejs-treeview 
  [fields]="treeFields"
  [showCheckBox]="true"
  (drawNode)="onDrawNode($event)">
</ejs-treeview>

onDrawNode(event: DrawNodeEventArgs): void {
  // Disable checkbox for parent nodes only
  if (event.nodeData?.hasChild) {
    const checkbox = event.node?.querySelector('.e-checkbox-wrapper');
    checkbox?.classList.add('e-checkbox-disabled');
  }
}
```

### Remove Parent Checkboxes (Leaf Only)

```typescript
onDrawNode(event: DrawNodeEventArgs): void {
  if (event.nodeData?.hasChild) {
    const checkbox = event.node?.querySelector('.e-checkbox-wrapper');
    checkbox?.style.display = 'none';  // Hide parent checkbox
  }
}
```

### Toggle Checkbox on Node Click

```typescript
import { NodeClickEventArgs } from '@syncfusion/ej2-navigations';

<ejs-treeview 
  [fields]="treeFields"
  [showCheckBox]="true"
  (nodeClicked)="onNodeClicked($event)">
</ejs-treeview>

onNodeClicked(event: NodeClickEventArgs): void {
  const node = event.node as HTMLElement;
  if (node?.classList.contains('e-fullrow')) {
    const checkedNodes = this.treeViewComponent?.getAllCheckedNodes() || [];
    const nodeId = event.nodeData.id;
    
    if (checkedNodes.includes(nodeId)) {
      this.treeViewComponent?.uncheckAll([nodeId]);
    } else {
      this.treeViewComponent?.checkAll([nodeId]);
    }
  }
}
```

### checkAll Method

Checks all unchecked nodes. You can also check specific nodes by passing array of unchecked nodes as argument.

**Method Signature:**
```typescript
checkAll(nodes?: string[] | Element[]): void
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `nodes` (optional) | `string[] \| Element[]` | Array of TreeView node IDs or node elements to check |

**Returns:** `void`

**Examples:**

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  template: `
    <ejs-treeview 
      #treeview
      [fields]="treeFields"
      [showCheckBox]="true">
    </ejs-treeview>
    <button (click)="checkSpecificNodes()">Check Specific</button>
    <button (click)="checkAll()">Check All</button>
  `
})
export class CheckComponent {
  @ViewChild('treeview') treeViewComponent?: TreeViewComponent;

  // Check specific nodes
  checkSpecificNodes(): void {
    const nodesToCheck = ['1', '2', '5'];
    this.treeViewComponent?.checkAll(nodesToCheck);
  }

  // Check all nodes
  checkAll(): void {
    this.treeViewComponent?.checkAll();
  }

  // Check using element references
  checkByElements(): void {
    const elements = [
      document.querySelector('[data-uid="1"]') as Element,
      document.querySelector('[data-uid="2"]') as Element
    ];
    this.treeViewComponent?.checkAll(elements);
  }
}
```

---

### uncheckAll Method

Unchecks all checked nodes. You can also uncheck specific nodes by passing array of checked nodes as argument.

**Method Signature:**
```typescript
uncheckAll(nodes?: string[] | Element[]): void
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `nodes` (optional) | `string[] \| Element[]` | Array of TreeView node IDs or node elements to uncheck |

**Returns:** `void`

**Examples:**

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  template: `
    <ejs-treeview 
      #treeview
      [fields]="treeFields"
      [showCheckBox]="true">
    </ejs-treeview>
    <button (click)="uncheckSpecificNodes()">Uncheck Specific</button>
    <button (click)="uncheckAll()">Uncheck All</button>
  `
})
export class UncheckComponent {
  @ViewChild('treeview') treeViewComponent?: TreeViewComponent;

  // Uncheck specific nodes
  uncheckSpecificNodes(): void {
    const nodesToUncheck = ['1', '2'];
    this.treeViewComponent?.uncheckAll(nodesToUncheck);
  }

  // Uncheck all nodes
  uncheckAll(): void {
    this.treeViewComponent?.uncheckAll();
  }

  // Uncheck using element references
  uncheckByElements(): void {
    const elements = [
      document.querySelector('[data-uid="1"]') as Element,
      document.querySelector('[data-uid="2"]') as Element
    ];
    this.treeViewComponent?.uncheckAll(elements);
  }
}
```

## Select One Child

### Restrict Selection to One Child Per Parent

In scenarios where the application requires selecting only one child node at a time under a specific parent node while maintaining multi-selection capability across different parent branches, you can implement this using the `nodeSelecting` event:

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { NodeSelectEventArgs } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-single-child',
  standalone: true,
  imports: [FormsModule, TreeViewModule],
  template: `
    <ejs-treeview 
      #tree 
      [fields]="listfields"
      [allowMultiSelection]="true"
      (nodeSelecting)="onNodeSelecting($event)">
    </ejs-treeview>
  `
})
export class SingleChildSelectionComponent {
  @ViewChild('tree') tree?: TreeViewComponent;

  public localData: Object[] = [
    { id: 1, name: 'Parent 1', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'Child 1' },
    { id: 3, pid: 1, name: 'Child 2' },
    { id: 4, pid: 1, name: 'Child 3' },
    { id: 7, name: 'Parent 2', hasChild: true, expanded: true },
    { id: 8, pid: 7, name: 'Child 1' },
    { id: 9, pid: 7, name: 'Child 2' },
    { id: 10, pid: 7, name: 'Child 3' },
  ];

  public listfields: Object = { 
    dataSource: this.localData, 
    id: 'id', 
    parentID: 'pid', 
    text: 'name', 
    hasChildren: 'hasChild' 
  };

  private parent?: any;
  private child?: any;
  private count: boolean = false;
  private childCount: boolean = false;

  public onNodeSelecting(args: NodeSelectEventArgs): void {
    let id: any = args.nodeData['parentID'];
    
    if (!this.count) {
      this.parent = id;
      this.count = true;
    }
    if (!this.childCount) {
      this.child = args.nodeData['id'];
      this.childCount = true;
    }

    if (id != null && id === this.parent) {
      let element: HTMLElement = (this.tree as any)?.element.querySelector('[data-uid="' + id + '"]');
      let liElements: any = element?.querySelectorAll('ul li');
      
      for (let i: number = 0; i < (liElements?.length || 0); i++) {
        let nodeData: any = (this.tree as any)?.getNode(liElements[i]);
        if (nodeData.selected && args.action === "select" && this.child !== args.nodeData['id']) {
          args.cancel = true;
        } else if (args.action === "un-select" && this.child === args.nodeData['id']) {
          this.childCount = false;
          this.child = null;
          this.parent = null;
          this.count = false;
        }
      }
    } else if (id !== this.parent && id !== null) {
      if (args.action == "select") {
        args.cancel = true;
      }
    } else if (id === null) {
      this.childCount = false;
      this.child = null;
      this.parent = null;
      this.count = false;
    }
  }
}
```

**Use Case:** Restrict users to select only one child at a time under each parent while allowing different parents to have different selected children.

---

## Remove Parent Checkbox

### Hide Checkbox on Parent Nodes (Leaf Nodes Only)

To display checkboxes only for leaf nodes while hiding them on parent nodes for a cleaner interface:

```typescript
import { Component } from '@angular/core';
import { DrawNodeEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-leaf-checkbox',
  standalone: true,
  imports: [FormsModule, TreeViewModule],
  template: `
    <ejs-treeview 
      [fields]="field"
      [showCheckBox]="true"
      (drawNode)="onDrawNode($event)">
    </ejs-treeview>
  `,
  styles: [`
    :host ::ng-deep .custom .e-checkbox-wrapper {
      display: none;
    }
    :host ::ng-deep .custom .e-list-item.e-leaf-node .e-checkbox-wrapper {
      display: block;
    }
  `]
})
export class LeafCheckboxComponent {
  public Countries: Object[] = [
    { id: 1, name: 'India', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'Assam' },
    { id: 3, pid: 1, name: 'Bihar' },
    { id: 7, name: 'Brazil', hasChild: true },
    { id: 8, pid: 7, name: 'Paraná' },
  ];

  public field: Object = { 
    dataSource: this.Countries, 
    id: 'id', 
    text: 'name', 
    parentID: 'pid', 
    hasChildren: 'hasChild' 
  };

  onDrawNode(event: DrawNodeEventArgs): void {
    if (event.nodeData?.hasChild) {
      const checkbox = event.node?.querySelector('.e-checkbox-wrapper');
      if (checkbox) {
        checkbox.style.display = 'none';
      }
    }
  }
}
```

---

## Checkbox Toggle on Node Text Click

### Check/Uncheck Checkbox When Clicking Node Text

Enable checkbox toggling when users click the node text instead of just the checkbox itself:

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { NodeClickEventArgs, NodeKeyPressEventArgs } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-click-to-check',
  standalone: true,
  imports: [FormsModule, TreeViewModule],
  template: `
    <ejs-treeview 
      #treevalidate
      [fields]="field"
      [showCheckBox]="true"
      (nodeClicked)="nodeCheck($event)"
      (keyPress)="nodeCheck($event)">
    </ejs-treeview>
  `
})
export class ClickToCheckComponent {
  @ViewChild('treevalidate') treevalidate?: TreeViewComponent;

  public countries: Object[] = [
    { id: 1, name: 'Australia', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'New South Wales' },
    { id: 3, pid: 1, name: 'Victoria' },
    { id: 7, name: 'Brazil', hasChild: true },
    { id: 8, pid: 7, name: 'Paraná' },
  ];

  public field: Object = { 
    dataSource: this.countries, 
    id: 'id', 
    parentID: 'pid', 
    text: 'name', 
    hasChildren: 'hasChild' 
  };

  public nodeCheck(args: NodeClickEventArgs | NodeKeyPressEventArgs | any): void {
    let checkedNode: any = [args.node];
    
    // Toggle checkbox on fullrow click or Enter key
    if ((args.event.target as EventTarget | any)?.classList?.contains('e-fullrow') || args.event.key == "Enter") {
      let getNodeDetails: any = (this.treevalidate as TreeViewComponent).getNode(args.node);
      
      if (getNodeDetails.isChecked == 'true') {
        (this.treevalidate as TreeViewComponent).uncheckAll(checkedNode);
      } else {
        (this.treevalidate as TreeViewComponent).checkAll(checkedNode);
      }
    }
  }
}
```

**Features:**
- Click on node text to toggle checkbox state
- Press Enter to toggle checkbox
- Provides larger click target for better UX
- Works alongside direct checkbox clicking

---

## Disable Checkbox on Specific Nodes

### Conditionally Disable Checkboxes

Disable checkboxes on specific nodes based on data attributes or conditions using the `drawNode` event:

```typescript
import { Component } from '@angular/core';
import { DrawNodeEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-disable-checkbox',
  standalone: true,
  imports: [FormsModule, TreeViewModule],
  template: `
    <ejs-treeview 
      [fields]="field"
      [showCheckBox]="true"
      (drawNode)="onDrawNode($event)">
    </ejs-treeview>
  `
})
export class DisableCheckboxComponent {
  public Items: Object[] = [
    { id: 1, name: 'Important', hasChild: true, canDisable: false, expanded: true },
    { id: 2, pid: 1, name: 'Read-Only Item', canDisable: true },
    { id: 3, pid: 1, name: 'Editable Item', canDisable: false },
    { id: 4, name: 'System', hasChild: true, canDisable: true },
    { id: 5, pid: 4, name: 'Protected', canDisable: true },
  ];

  public field: Object = { 
    dataSource: this.Items, 
    id: 'id', 
    text: 'name', 
    parentID: 'pid', 
    hasChildren: 'hasChild' 
  };

  onDrawNode(event: DrawNodeEventArgs): void {
    if (event.nodeData?.canDisable) {
      const checkbox = event.node?.querySelector('.e-checkbox');
      if (checkbox) {
        checkbox.classList.add('e-disabled');
        checkbox.setAttribute('disabled', 'disabled');
      }
    }
  }
}
```

**When to use:**
- Protect critical nodes from modification
- Enforce permissions and access control
- Create read-only tree sections

---

**Best Practices:**
- Use checkboxes for batch operations on multiple items
- Use multi-selection for complex workflows
- Enable autoCheck for intuitive parent-child relationships
- Use selection events for validation or side effects
- Provide visual feedback for selection state changes
