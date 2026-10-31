# Interaction and Tools in Syncfusion Vue Diagram

## Table of Contents
- [Overview](#overview)
- [Selection and Interaction](#selection-and-interaction)
- [Tool Modes](#tool-modes)
- [Constraints](#constraints)
- [Commands](#commands)
- [Undo/Redo](#undoredo)
- [Context Menus](#context-menus)
- [User Handles](#user-handles)

## Overview

Interaction features enable users to manipulate diagrams intuitively. Tools, modes, and constraints control available actions and user workflows.

## Selection and Interaction

### Select Nodes

```javascript
// Programmatic selection
diagram.select([diagram.nodes[0]]);

// Select by ID
const nodeToSelect = diagram.nodes.find(n => n.id === 'node1');
diagram.select([nodeToSelect]);

// Select multiple
diagram.select([diagram.nodes[0], diagram.nodes[1]]);

// Deselect
diagram.clearSelection();
```

### Selection Events

```javascript
diagram.selectionChange = (args) => {
  console.log('Selection changed:', args);
  console.log('New items:', args.newItems);
  console.log('Old items:', args.oldItems);
};
```

### Drag Nodes

```javascript
diagram.positionChange = (args) => {
  console.log('Node moved:', args.source.id);
  console.log('New position:', args.source.offsetX, args.source.offsetY);
};
```

### Resize Nodes

```javascript
diagram.sizeChange = (args) => {
  console.log('Node resized:', args.source.id);
  console.log('New size:', args.source.width, args.source.height);
};
```

### Rotate Nodes

```javascript
diagram.rotateChange = (args) => {
  console.log('Node rotated:', args.source.rotateAngle);
};
```

## Tool Modes

### Pointer Tool (Default)

Allows selection, drag, and interaction:

```javascript
diagram.tool = DiagramTools.Default;
```

### Draw Tool

Draws new connectors:

```javascript
// Switch to connector drawing mode
diagram.tool = DiagramTools.DrawOnce;

// User draws one connector, then returns to default
diagram.drawingObject = {
  type: 'Straight'
};
```

### Zoom Tool

```javascript
// Zoom to specific level
diagram.zoomTo(1.5);

// Fit to view
diagram.fitToPage();
```

### Tool Combinations

```javascript
// Drawing tool that allows multiple connectors
diagram.tool = DiagramTools.ContinuousDraw;
diagram.drawingObject = { type: 'Orthogonal' };
```

## Constraints

### Node Constraints

```javascript
const node = {
  id: 'restrictedNode',
  offsetX: 250,
  offsetY: 250,
  width: 100,
  height: 60,
  constraints: 
    NodeConstraints.Default & 
    ~NodeConstraints.Drag &           // Prevent dragging
    ~NodeConstraints.Resize &         // Prevent resizing
    ~NodeConstraints.Rotate           // Prevent rotation
};
```

### Available Node Constraints

```javascript
NodeConstraints.Default          // All allowed
NodeConstraints.Drag        // Can drag
NodeConstraints.Resize        // Can resize
NodeConstraints.Rotate        // Can rotate
NodeConstraints.Select           // Can select
NodeConstraints.Delete           // Can delete
NodeConstraints.InConnect  // Can be connector source
NodeConstraints.OutConnect   // Can be connector target

// Example: Allow only selection, no dragging
node.constraints = NodeConstraints.Select | NodeConstraints.Tooltip;
```

### Connector Constraints

```javascript
const connector = {
  id: 'lockedConnector',
  sourceID: 'node1',
  targetID: 'node2',
  constraints: 
    ConnectorConstraints.Default & 
    ~ConnectorConstraints.Drag      // Lock connector position
};
```

### Diagram-level Constraints

```javascript
diagram.constraints = 
  DiagramConstraints.Default & 
  ~DiagramConstraints.Zoom &       // Disable zoom
  ~DiagramConstraints.Pan          // Disable pan
```

## Commands

### Keyboard Commands

```javascript
diagram.commands = {
  // Custom command shortcuts
  'ctrl+s': () => saveDiagram(),
  'ctrl+z': () => diagram.undo(),
  'ctrl+y': () => diagram.redo(),
  'delete': () => diagram.remove(diagram.selectedItems.nodes)
};
```

### Built-in Commands

```javascript
// Align
diagram.align('Left', diagram.selectedItems.nodes);
diagram.align('Right', diagram.selectedItems.nodes);
diagram.align('Top', diagram.selectedItems.nodes);
diagram.align('Bottom', diagram.selectedItems.nodes);
diagram.align('Center', diagram.selectedItems.nodes);
diagram.align('Middle', diagram.selectedItems.nodes);

// Arrange
diagram.bringToFront();
diagram.sendToBack();
diagram.moveForward();
diagram.moveBackward();

// Distribute
diagram.distribute('RightToLeft', diagram.selectedItems.nodes);
diagram.distribute('BottomToTop', diagram.selectedItems.nodes);

// Sizing
diagram.sameSize('Width', diagram.selectedItems.nodes);
diagram.sameSize('Height', diagram.selectedItems.nodes);
diagram.sameSize('Size', diagram.selectedItems.nodes);
```

## Undo/Redo

### Enable Undo/Redo

```javascript
diagram.historyManager.canUndo = true;
diagram.historyManager.canRedo = true;
```

### Undo/Redo Stack Size

```typescript
diagram.historyManager.stackLimit = 50;  // Max undo steps
```

### Programmatic Undo/Redo

```javascript
// Undo
diagram.undo();

// Redo
diagram.redo();

```

### Track Changes

```javascript
diagram.historyChange = (args) => {
  console.log('Action:', args.action);
  console.log('Can undo:', diagram.historyManager.canUndo);
  console.log('Can redo:', diagram.historyManager.canRedo);
};
```

## Context Menus

### Enable Context Menu

```javascript
const contextMenuSettings = {
  show: true,
  items: [
    { text: 'Cut', id: 'cut', target: '.e-diagram' },
    { text: 'Copy', id: 'copy', target: '.e-diagram' },
    { text: 'Paste', id: 'paste', target: '.e-diagram' },
    { text: 'Delete', id: 'delete', target: '.e-diagram' }
  ]
};

diagram.contextMenuSettings = contextMenuSettings;
```

### Custom Context Menu

```javascript
const customContextMenu = {
  show: true,
  items: [
    { text: 'Properties', id: 'properties' },
    { text: 'Edit', id: 'edit' },
    { text: 'Remove', id: 'remove' },
    { separator: true },
    { text: 'Reset', id: 'reset' }
  ]
};

diagram.contextMenuSettings = customContextMenu;

diagram.contextMenuBeforeItemRender = (args) => {
  // Customize menu based on context
  if (!args.target || !args.target.id) {
    args.items = args.items.filter(item => item.id !== 'edit');
  }
};

diagram.contextMenuClick = (args) => {
  if (args.id === 'properties') {

  }
};
```

## User Handles

Custom interaction handles for nodes:

```javascript
const nodeWithHandles = {
  id: 'node1',
  offsetX: 250,
  offsetY: 250,
  width: 100,
  height: 60,
  userHandles: [
    {
      name: 'handle1',
      offset: 1,
      pathData: 'M 0,0 L 0,8 L 8,8 L 8,0 Z',
      side: 'Left',
      horizontalAlignment: 'Left',
      verticalAlignment: 'Center',

    },
    {
      name: 'handle2',
      offset: 0.5,
      pathData: 'M 0,0 L 0,8 L 8,8 L 8,0 Z',
      side: 'Right',
      horizontalAlignment: 'Right',
      verticalAlignment: 'Center',
   
    }
  ]
};

diagram.onUserHandleMouseDown((args) => {
  if (args.source instanceof UserHandle) {
    console.log('Handle clicked:', args.source.name);
  }
});

diagram.onUserHandleMouseEnter((args) => {
  if (args.element) {
    args.element.pathColor = 'red';
    args.element.backgroundColor = 'pink';
  }
});

diagram.onUserHandleMouseUp((args) => {
  if (args.element) {
    args.element.pathColor = 'yellow';
    args.element.backgroundColor = 'pink';
  }
});

diagram.onUserHandleMouseLeave((args) => {
  if (args.element) {
    args.element.pathColor = 'green';
    args.element.backgroundColor = 'yellow';
  }
});
```

## Complete Interaction Example

```vue
<template>
  <div>
    <div style="margin-bottom: 10px;">
      <button @click="selectAll">Select All</button>
      <button @click="deselect">Deselect</button>
      <button @click="alignLeft">Align Left</button>
      <button @click="alignCenter">Align Center</button>
      <button @click="distributeSpace">Distribute</button>
      <button @click="undo" :disabled="!canUndo">Undo</button>
      <button @click="redo" :disabled="!canRedo">Redo</button>
    </div>
    
    <ejs-diagram 
      ref="diagramRef"
      :width="width"
      :height="height"
      :nodes="nodes"
      :connectors="connectors"
      :contextMenuSettings="contextMenuSettings"
    ></ejs-diagram>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { DiagramComponent as EjsDiagram, DiagramTools, NodeConstraints } from '@syncfusion/ej2-vue-diagrams';

const diagramRef = ref();
const width = '100%';
const height = '590px';

const nodes = [
  { id: 'node1', offsetX: 150, offsetY: 200, width: 100, height: 60 },
  { id: 'node2', offsetX: 350, offsetY: 200, width: 100, height: 60 }
];

const connectors = [];

const contextMenuSettings = {
  show: true,
  items: [
    { text: 'Cut', id: 'cut' },
    { text: 'Copy', id: 'copy' },
    { text: 'Paste', id: 'paste' },
    { separator: true },
    { text: 'Delete', id: 'delete' }
  ]
};

const diagram = () => diagramRef.value;

const selectAll = () => diagram().selectAll();
const deselect = () => diagram().clearSelection();
const alignLeft = () => diagram().align('Left', diagram().selectedItems.nodes);
const alignCenter = () => diagram().align('Center', diagram().selectedItems.nodes);
const distributeSpace = () => diagram().distribute('RightToLeft', diagram().selectedItems.nodes);
const undo = () => diagram().undo();
const redo = () => diagram().redo();

const canUndo = computed(() => diagram()?.historyManager?.canUndo || false);
const canRedo = computed(() => diagram()?.historyManager?.canRedo || false);
</script>
```

Interaction and tool features create intuitive, powerful diagram editing experiences with precise control and efficient workflows.
