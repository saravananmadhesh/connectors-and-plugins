# Node Editing & Manipulation in TreeView

## Table of Contents
- [In-Place Editing](#in-place-editing)
- [Adding Nodes](#adding-nodes)
- [Removing Nodes](#removing-nodes)
- [Updating Nodes](#updating-nodes)
- [Moving Nodes](#moving-nodes)
- [Validation & Events](#validation--events)
- [Edge Cases](#edge-cases)

---

## In-Place Editing

### Enable Editing

Allow users to edit node text directly in the tree:

```typescript
import { Component } from '@angular/core';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editable-tree',
  standalone: true,
  imports: [FormsModule, TreeViewModule],
  template: `
    <ejs-treeview 
      [fields]="treeFields"
      [allowEditing]="true">
    </ejs-treeview>
  `
})
export class EditableTreeComponent {
  treeFields = {
    dataSource: [
      {
        id: 1,
        name: 'Desktop',
        hasChild: true,
        expanded: true,
        child: [
          { id: 2, pid: 1, name: 'Document1.txt' },
          { id: 3, pid: 1, name: 'Document2.docx' }
        ]
      }
    ],
    id: 'id',
    parentID: 'pid',
    text: 'name',
    hasChildren: 'hasChild'
  };
}
```

### Edit Activation

Users can edit nodes in three ways:

**Double-click the node:**
```
Double-click on text → text becomes editable
```

**Press F2 while node is selected:**
```
Click node → Press F2 → text becomes editable
```

**Programmatic editing:**
```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  template: `
    <button (click)="editNode()">Edit Node</button>
    <ejs-treeview #treeview [fields]="treeFields" [allowEditing]="true"></ejs-treeview>
  `
})
export class ProgrammaticEditComponent {
  @ViewChild('treeview') treeViewComponent?: TreeViewComponent;

  editNode(): void {
    this.treeViewComponent?.beginEdit('2');  // Start editing node with ID 2
  }
}
```

### Save/Cancel Editing

- **Press Enter**: Save edited text
- **Press Escape**: Cancel edit, restore original text
- **Click elsewhere**: Save edited text automatically

## Adding Nodes

### addNodes Method

Adds the collection of TreeView nodes based on target and index position. If target node is not specified, nodes are added as children of given parentID or at root level.

#### Method Signature

```typescript
addNodes(nodes: { [key: string]: Object }[], target?: string | Element, index?: number, preventTargetExpand?: boolean): void
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `nodes` | `{ [key: string]: Object }[]` | **Required.** Collection of objects with node properties to be added to the TreeView. Each object can contain any properties based on your field mappings. |
| `target` | `string \| Element` | **Optional.** The ID of the node or DOM element where new nodes will be added as children. If not specified, nodes are added at root level. |
| `index` | `number` | **Optional.** The index position at which nodes will be inserted. If not specified, nodes are appended at the end. |
| `preventTargetExpand` | `boolean` | **Optional.** When `true`, prevents automatic expansion of the parent/target node after adding children. Default is `false` (parent expands by default). |

#### Return Type

`void`

#### Examples

**Example 1: Add Single Child Node**

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  template: `
    <button (click)="addChild()">Add Child Node</button>
    <ejs-treeview #treeview [fields]="treeFields"></ejs-treeview>
  `
})
export class AddNodeComponent {
  @ViewChild('treeview') treeViewComponent?: TreeViewComponent;

  treeFields = { dataSource: [], id: 'id', parentID: 'pid', text: 'name' };

  addChild(): void {
    const newNode = {
      id: 10,
      name: 'New Item',
      pid: 1
    };
    this.treeViewComponent?.addNodes([newNode], '1');  // Add as child of node 1
  }
}
```

**Example 2: Add Multiple Nodes to Parent**

```typescript
addMultipleNodes(): void {
  const newNodes = [
    { id: 10, name: 'New Item 1', pid: 1 },
    { id: 11, name: 'New Item 2', pid: 1 },
    { id: 12, name: 'New Item 3', pid: 1 }
  ];
  this.treeViewComponent?.addNodes(newNodes, '1');  // Add all as children of node 1
}
```

**Example 3: Add Node at Root Level**

```typescript
addRootNode(): void {
  const rootNode = {
    id: 20,
    name: 'New Root Folder',
    hasChild: true
  };
  this.treeViewComponent?.addNodes([rootNode]);  // No target = add at root level
}
```

**Example 4: Add Node at Specific Position**

```typescript
addNodeAtPosition(): void {
  const nodeToAdd = { id: 5, name: 'Insert Here', pid: 1 };
  const parentNodeId = '1';
  const insertIndex = 2;  // Insert at position 2 (0-indexed)
  this.treeViewComponent?.addNodes([nodeToAdd], parentNodeId, insertIndex);
}
```

**Example 5: Add Nodes Without Expanding Parent**

```typescript
addNodesWithoutExpand(): void {
  const newNodes = [
    { id: 15, name: 'Hidden Item 1', pid: 3 },
    { id: 16, name: 'Hidden Item 2', pid: 3 }
  ];
  const parentNodeId = '3';
  const insertIndex = 0;
  const preventExpand = true;
  
  this.treeViewComponent?.addNodes(
    newNodes, 
    parentNodeId, 
    insertIndex, 
    preventExpand  // Parent node will not auto-expand
  );
}
```

## Removing Nodes

### Remove Single Node

```typescript
removeNode(): void {
  this.treeViewComponent?.removeNodes(['3']);  // Node ID as string or array
}
```

### Remove Multiple Nodes

```typescript
removeMultipleNodes(): void {
  this.treeViewComponent?.removeNodes(['2', '5', '8']);
}
```

## Updating Nodes

### updateNode Method

Replaces the text of the TreeView node with the given text only when the `allowEditing` property is enabled.

**Method Signature:**
```typescript
updateNode(target: string | Element, newText: string): void
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `target` | `string \| Element` | Specifies ID of TreeView node or TreeView node as target element |
| `newText` | `string` | Specifies the new text of TreeView node |

**Returns:** `void`

**Requirement:** The `allowEditing` property must be enabled for updateNode to work.

### Update Single Node Text

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  template: `
    <ejs-treeview 
      #treeview
      [fields]="treeFields"
      [allowEditing]="true">
    </ejs-treeview>
    <button (click)="updateNodeText()">Update Node Text</button>
  `
})
export class UpdateNodeComponent {
  @ViewChild('treeview') treeViewComponent?: TreeViewComponent;

  updateNodeText(): void {
    // Update node with ID '2' to new text 'Updated Text'
    this.treeViewComponent?.updateNode('2', 'Updated Node Text');
  }
}
```

### Update Node Using Element Reference

```typescript
updateNodeUsingElement(): void {
  // Get the node element
  const nodeElement = document.querySelector('[data-uid="2"]');
  
  if (nodeElement) {
    // Update using element reference
    this.treeViewComponent?.updateNode(nodeElement as Element, 'New Text');
  }
}
```

### Update Multiple Nodes Sequentially

```typescript
updateMultipleNodes(): void {
  const nodesToUpdate = [
    { id: '2', text: 'Updated Name 1' },
    { id: '3', text: 'Updated Name 2' },
    { id: '4', text: 'Updated Name 3' }
  ];
  
  nodesToUpdate.forEach(node => {
    this.treeViewComponent?.updateNode(node.id, node.text);
  });
}
```

### Update Node with Conditions

```typescript
updateNodeConditionally(): void {
  const nodeId = '2';
  const currentNodeData = this.treeViewComponent?.getTreeData(nodeId);
  
  // Only update if certain conditions are met
  if (currentNodeData && currentNodeData[0]?.name !== 'Protected') {
    this.treeViewComponent?.updateNode(nodeId, 'Updated safely');
  } else {
    console.warn('Cannot update protected nodes');
  }
}
```

### Update Node with Event Handling

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { NodeEditEventArgs } from '@syncfusion/ej2-navigations';

@Component({
  template: `
    <ejs-treeview 
      #treeview
      [fields]="treeFields"
      [allowEditing]="true"
      (nodeEdited)="onNodeEdited($event)">
    </ejs-treeview>
  `
})
export class UpdateWithEventsComponent {
  @ViewChild('treeview') treeViewComponent?: TreeViewComponent;

  onNodeEdited(event: NodeEditEventArgs): void {
    // After editing is complete, you can further update if needed
    console.log('Node edited:', event.nodeData.name);
    
    // Example: Convert to uppercase after editing
    if (event.nodeData.name) {
      this.treeViewComponent?.updateNode(
        event.nodeData.id as string, 
        event.nodeData.name.toUpperCase()
      );
    }
  }
}
```

### Refresh Node (Reload Data)

```typescript
refreshNodeData(): void {
  // Refresh specific node from data source
  this.treeViewComponent?.refreshNode('2');
}

refreshAllNodes(): void {
  // Refresh entire tree
  const allData = this.treeViewComponent?.getTreeData() || [];
  const allNodeIds = allData.map((node: any) => node.id);
  
  allNodeIds.forEach((nodeId: any) => {
    this.treeViewComponent?.refreshNode(nodeId);
  });
}
```

## Moving Nodes

### moveNodes Method

Moves the collection of nodes within the same TreeView based on target or its index position. Nodes can be repositioned to different parents or reorganized within the same parent.

#### Method Signature

```typescript
moveNodes(sourceNodes: string[] | Element[], target: string | Element, index?: number, preventTargetExpand?: boolean): void
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `sourceNodes` | `string[] \| Element[]` | **Required.** Array of node IDs (as strings) or DOM elements representing the nodes to be moved. |
| `target` | `string \| Element` | **Required.** The ID of the target node or DOM element where the source nodes will be moved. Nodes will become children of this target node. |
| `index` | `number` | **Optional.** The index position at which nodes will be inserted under the target. If not specified, nodes are appended at the end. |
| `preventTargetExpand` | `boolean` | **Optional.** When `true`, prevents automatic expansion of the target parent node after moving nodes. Default is `false` (target expands by default). |

#### Return Type

`void`

#### Examples

**Example 1: Move Nodes to Different Parent**

```typescript
moveNodesToParent(): void {
  const nodeIds = ['5', '6', '7'];    // Nodes to move
  const newParentId = '2';            // New parent node ID
  this.treeViewComponent?.moveNodes(nodeIds, newParentId);  // Move nodes as children of node 2
}
```

**Example 2: Move Single Node**

```typescript
moveSingleNode(): void {
  const nodeToMove = ['5'];
  const targetParentId = '3';
  this.treeViewComponent?.moveNodes(nodeToMove, targetParentId);
}
```

**Example 3: Move Nodes to Specific Position**

```typescript
moveNodesToPosition(): void {
  const sourceNodeIds = ['8', '9'];
  const targetNodeId = '2';
  const insertIndex = 1;  // Insert at position 1 (0-indexed)
  this.treeViewComponent?.moveNodes(sourceNodeIds, targetNodeId, insertIndex);
}
```

**Example 4: Move Nodes Without Target Expansion**

```typescript
moveNodesWithoutExpand(): void {
  const sourceNodeIds = ['5', '6'];
  const targetNodeId = '4';
  const insertIndex = 0;
  const preventExpand = true;
  
  this.treeViewComponent?.moveNodes(
    sourceNodeIds, 
    targetNodeId, 
    insertIndex, 
    preventExpand  // Target node will not auto-expand
  );
}
```

**Example 5: Move Nodes Using Element References**

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  template: `
    <ejs-treeview #treeview [fields]="treeFields"></ejs-treeview>
  `
})
export class MoveNodeComponent {
  @ViewChild('treeview') treeViewComponent?: TreeViewComponent;
  
  moveNodesByElement(): void {
    // Get element references from the TreeView
    const sourceElements = this.treeViewComponent?.element.querySelectorAll('[data-id="5"], [data-id="6"]');
    const targetElement = this.treeViewComponent?.element.querySelector('[data-id="3"]');
    
    if (sourceElements && targetElement) {
      this.treeViewComponent?.moveNodes(
        Array.from(sourceElements) as Element[], 
        targetElement
      );
    }
  }
}
```

## Validation & Events

### nodeEditing Event (Before Edit)

Triggered before node editing starts. Use for validation or prevention:

```typescript
<ejs-treeview 
  [fields]="treeFields"
  [allowEditing]="true"
  (nodeEditing)="onNodeEditing($event)">
</ejs-treeview>

onNodeEditing(event: any): void {
  console.log('Old text:', event.text);
  
  // Prevent editing first-level nodes
  if (event.nodeData.level === 0) {
    event.cancel = true;
  }
}
```

### nodeEdited Event (After Edit)

Triggered after editing completes. Use for validation or post-processing:

```typescript
import { NodeEditEventArgs } from '@syncfusion/ej2-navigations';

<ejs-treeview 
  [fields]="treeFields"
  [allowEditing]="true"
  (nodeEdited)="onNodeEdited($event)">
</ejs-treeview>

onNodeEdited(event: NodeEditEventArgs): void {
  console.log('New text:', event.newText);
  console.log('Old text:', event.oldText);
  
  // Validate: prevent empty names
  if (!event.newText || event.newText.trim() === '') {
    event.cancel = true;
    alert('Node name cannot be empty');
  }
  
  // Validate: prevent duplicates
  const existingNodes = this.getNodeNames();
  if (existingNodes.includes(event.newText)) {
    event.cancel = true;
    alert('Node name already exists');
  }
}

getNodeNames(): string[] {
  const allData = this.treeViewComponent?.getTreeData() || [];
  return allData.map((node: any) => node.name);
}
```

### dataSourceChanged Event

Triggered after any data modification:

```typescript
(dataSourceChanged)="onDataSourceChanged($event)"

onDataSourceChanged(event: any): void {
  console.log('Tree data changed');
  console.log('Current data:', this.treeViewComponent?.getTreeData());
}
```

## Edge Cases

### Prevent Duplicate Node Names

```typescript
onNodeEdited(event: NodeEditEventArgs): void {
  const allNodes = this.treeViewComponent?.getTreeData() || [];
  const isDuplicate = allNodes.some((node: any) => 
    node.id !== event.nodeData.id && 
    node.name === event.newText
  );
  
  if (isDuplicate) {
    event.cancel = true;
    this.updateNodeToOldValue(event.nodeData.id, event.oldText);
  }
}
```

### Validate Node Name Format

```typescript
onNodeEdited(event: NodeEditEventArgs): void {
  const nameRegex = /^[a-zA-Z0-9\s\-_.]+$/;  // Alphanumeric, spaces, hyphens, dots, underscores
  
  if (!nameRegex.test(event.newText)) {
    event.cancel = true;
    alert('Invalid characters in node name');
  }
}
```

### Prevent Editing During Specific Conditions

```typescript
onNodeEditing(event: any): void {
  // Don't allow editing if node is disabled
  if (event.nodeData.disabled) {
    event.cancel = true;
  }
  
  // Don't allow editing if user lacks permission
  if (!this.userHasEditPermission()) {
    event.cancel = true;
  }
}

userHasEditPermission(): boolean {
  // Check permissions logic here
  return true;
}
```

### Revert Changes on Error

```typescript
async onNodeEdited(event: NodeEditEventArgs): Promise<void> {
  try {
    // Send to server for validation
    const result = await this.saveNodeName(event.nodeData.id, event.newText);
    if (!result.success) {
      event.cancel = true;
      this.updateNodeToOldValue(event.nodeData.id, event.oldText);
    }
  } catch (error) {
    event.cancel = true;
    alert('Error saving node name');
  }
}

saveNodeName(nodeId: string, newName: string): Promise<any> {
  // Server API call here
  return Promise.resolve({ success: true });
}
```

---

**Best Practices:**
- Always validate user input in nodeEdited event
- Prevent special characters that might break data structure
- Disable editing for critical nodes
- Provide user feedback for validation errors
- Handle async operations (server validation) before saving
- Log all changes for audit purposes
