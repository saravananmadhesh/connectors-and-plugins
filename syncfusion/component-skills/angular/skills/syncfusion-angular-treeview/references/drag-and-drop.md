# Drag and Drop in TreeView

## Table of Contents
- [Overview](#overview)
- [Enable Drag and Drop](#enable-drag-and-drop)
- [Drop Indicators](#drop-indicators)
- [Drag and Drop Events](#drag-and-drop-events)
- [Restricting Operations](#restricting-operations)
- [Copy vs Move](#copy-vs-move)

---

## Overview

TreeView supports drag-and-drop functionality for reorganizing nodes within the tree structure. Users can drag nodes to change parent-child relationships or reorder siblings, with visual feedback showing where nodes will be dropped.

## Enable Drag and Drop

### Basic Setup

```typescript
import { Component } from '@angular/core';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dnd-tree',
  standalone: true,
  imports: [FormsModule, TreeViewModule],
  template: `
    <ejs-treeview 
      [fields]="treeFields"
      [allowDragAndDrop]="true">
    </ejs-treeview>
  `
})
export class DragDropTreeComponent {
  treeFields = {
    dataSource: [
      {
        id: 1,
        name: 'Music',
        hasChild: true,
        expanded: true,
        child: [
          { id: 2, pid: 1, name: 'Gouttes.mp3' }
        ]
      },
      {
        id: 3,
        name: 'Videos',
        hasChild: true,
        child: [
          { id: 4, pid: 3, name: 'Naturals.mp4' },
          { id: 5, pid: 3, name: 'Wild.mpeg' }
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

### With Multi-Selection

```typescript
<ejs-treeview 
  [fields]="treeFields"
  [allowDragAndDrop]="true"
  [allowMultiSelection]="true">
</ejs-treeview>
```

Drag multiple selected nodes at once by dragging any selected node.

## Drop Indicators

TreeView shows visual indicators when dragging nodes:

| Icon | Meaning |
|------|---------|
| **Plus icon** | Dragged node will be added as child of target node |
| **Between icon** | Dragged node will be added as sibling (same level) |
| **Minus/Restrict icon** | Dragged node cannot be dropped at this location |

Indicators automatically appear as you hover over nodes during drag operation.

## Drag and Drop Events

### Drag and Drop Event Properties

All drag-and-drop events provide these properties:

```typescript
interface DragAndDropEventArgs {
  draggedNodeData: any;        // Data of the node being dragged
  draggedNode: HTMLElement;    // HTML element being dragged
  droppedNodeData?: any;       // Data of target node (null if drop on empty area)
  droppedNode?: HTMLElement;   // HTML element of target node
  dropIndicator?: string;      // 'plus' (as child) | 'between' (as sibling) | 'restrict' (not allowed)
  event?: MouseEvent;          // Original mouse event
  cancel?: boolean;            // Set to true to prevent default action
}
```

### nodeDragStart Event

Triggered when drag operation begins. Use to prevent dragging certain nodes:

```typescript
import { Component } from '@angular/core';
import { DragAndDropEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  template: `
    <ejs-treeview 
      [fields]="treeFields"
      [allowDragAndDrop]="true"
      (nodeDragStart)="onNodeDragStart($event)">
    </ejs-treeview>
  `
})
export class DragStartComponent {
  onNodeDragStart(event: DragAndDropEventArgs): void {
    console.log('Dragging node:', event.draggedNodeData.name);

    // Prevent dragging specific nodes
    if (event.draggedNodeData.id === '1') {
      event.cancel = true;  // Can't drag root node
    }

    // Check if dragged element is from this tree
    if (event.event?.ctrlKey) {
      console.log('Dragging with Ctrl key');
    }
  }
}
```

### nodeDragging Event

Triggered while node is being dragged. Use for visual feedback:

```typescript
onNodeDragging(event: DragAndDropEventArgs): void {
  console.log('Dragging over node:', event.droppedNodeData?.name);

  // Customize drag element appearance
  const dragElement = event.draggedNode as HTMLElement;
  dragElement.style.opacity = '0.5';
}
```

### nodeDragStop Event

Triggered when drag ends but before drop completes. Use for validation:

```typescript
onNodeDragStop(event: DragAndDropEventArgs): void {
  console.log('Dropped on:', event.droppedNodeData?.name);

  // Prevent certain drops
  if (event.droppedNodeData?.isFolder === false) {
    event.cancel = true;  // Can't drop files into files
  }
}
```

### nodeDropped Event

Triggered after successful drop. Use for post-processing:

```typescript
onNodeDropped(event: DragAndDropEventArgs): void {
  console.log('Node successfully dropped');
  console.log('New parent:', event.droppedNodeData?.name);

  // Update server or perform operations
  this.saveNodeMove(event.draggedNodeData.id, event.droppedNodeData?.id);
}

saveNodeMove(nodeId: string, newParentId: string): void {
  // Send change to server
}
```

## Restricting Operations

### Restrict Drops on Specific Nodes

```typescript
import { Component } from '@angular/core';

@Component({
  template: `
    <ejs-treeview 
      [fields]="treeFields"
      [allowDragAndDrop]="true"
      (nodeDragging)="onNodeDragging($event)"
      (nodeDragStop)="onNodeDragStop($event)">
    </ejs-treeview>
  `
})
export class RestrictDropComponent {
  treeFields = {
    dataSource: [
      { id: 1, name: 'Music', type: 'folder', hasChild: true },
      { id: 2, pid: 1, name: 'Song1.mp3', type: 'file' },
      { id: 3, name: 'Document.txt', type: 'file' }
    ],
    id: 'id',
    parentID: 'pid',
    text: 'name'
  };

  onNodeDragging(event: DragAndDropEventArgs): void {
    // Show restrict icon when hovering over files (not folders)
    if (event.droppedNodeData?.type === 'file') {
      event.dropIndicator = 'restrict';  // Shows minus/restrict icon
    }
  }

  onNodeDragStop(event: DragAndDropEventArgs): void {
    // Prevent dropping into files
    if (event.droppedNodeData?.type === 'file') {
      event.cancel = true;
    }
  }
}
```

### Allow Drop Only on Folders

```typescript
treeFields = {
  dataSource: [
    { id: 1, name: 'Folder 1', isFolder: true, hasChild: true },
    { id: 2, pid: 1, name: 'File 1.txt', isFolder: false },
    { id: 3, name: 'Folder 2', isFolder: true }
  ],
  id: 'id',
  parentID: 'pid',
  text: 'name'
};

onNodeDragStop(event: DragAndDropEventArgs): void {
  // Only allow dropping on folders
  if (event.droppedNodeData && !event.droppedNodeData.isFolder) {
    event.cancel = true;
  }
}
```

### Prevent Dragging into Own Children

```typescript
onNodeDragStop(event: DragAndDropEventArgs): void {
  const draggedId = event.draggedNodeData.id;
  const targetId = event.droppedNodeData?.id;

  // Check if target is descendant of dragged node
  if (this.isDescendant(draggedId, targetId)) {
    event.cancel = true;  // Prevent creating circular hierarchy
    alert('Cannot move node into its own children');
  }
}

isDescendant(parentId: string, potentialChildId: string): boolean {
  const allNodes = this.treeViewComponent?.getTreeData() || [];
  const findDescendants = (id: string): string[] => {
    const children = allNodes.filter((n: any) => n.parentID === id);
    return [
      ...children.map((c: any) => c.id),
      ...children.flatMap((c: any) => findDescendants(c.id))
    ];
  };

  return findDescendants(parentId).includes(potentialChildId);
}
```

### Limit Depth of Tree

```typescript
onNodeDragStop(event: DragAndDropEventArgs): void {
  const maxDepth = 5;
  const targetDepth = this.getNodeDepth(event.droppedNodeData?.id);

  if (targetDepth >= maxDepth - 1) {
    event.cancel = true;
    alert(`Maximum nesting depth (${maxDepth}) reached`);
  }
}

getNodeDepth(nodeId: string, depth = 0): number {
  const allNodes = this.treeViewComponent?.getTreeData() || [];
  const node = allNodes.find((n: any) => n.id === nodeId);

  if (!node || !node.parentID) return depth;
  return this.getNodeDepth(node.parentID, depth + 1);
}
```

## Copy vs Move

### Default: Move Operation

By default, drag-and-drop moves nodes:

```typescript
// Drag node 2 under node 3
// Node 2 moves from its current parent to node 3
```

### Implement Copy Behavior

Use events to implement copy instead of move:

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  template: `
    <ejs-treeview 
      #treeview
      [fields]="treeFields"
      [allowDragAndDrop]="true"
      (nodeDropped)="onNodeDropped($event)">
    </ejs-treeview>
  `
})
export class CopyBehaviorComponent {
  @ViewChild('treeview') treeViewComponent?: TreeViewComponent;

  private draggedNodeId: string = '';

  onNodeDropped(event: DragAndDropEventArgs): void {
    // Save original node
    const allNodes = this.treeViewComponent?.getTreeData() || [];
    const originalNode = allNodes.find((n: any) => n.id === this.draggedNodeId);

    if (originalNode) {
      // Create copy with new ID
      const copyNode = {
        ...originalNode,
        id: 'copy_' + Date.now(),
        name: originalNode.name + ' (Copy)'
      };

      // Add copy to new location
      this.treeViewComponent?.addNodes([copyNode], event.droppedNodeData?.id);
    }
  }
}
```

### Conditional Copy vs Move

```typescript
onNodeDropped(event: DragAndDropEventArgs): void {
  // Check if Ctrl key was held (copy mode)
  const isCopyMode = (event as any).event?.ctrlKey;

  if (isCopyMode) {
    // Implement copy behavior
    this.copyNode(event.draggedNodeData, event.droppedNodeData?.id);
  } else {
    // Default move behavior (already done by TreeView)
    console.log('Node moved');
  }
}

copyNode(sourceNode: any, targetParentId: string): void {
  const copyNode = {
    ...sourceNode,
    id: 'copy_' + Date.now(),
    name: sourceNode.name + ' (Copy)'
  };
  this.treeViewComponent?.addNodes([copyNode], targetParentId);
}
```

---

**Best Practices:**
- Always validate drag-and-drop operations
- Prevent circular hierarchies (dragging parent into child)
- Restrict drops on leaf nodes if appropriate for your use case
- Provide visual feedback via drop indicators
- Log or sync changes to server after drop
- Implement depth limits to prevent deep nesting issues
