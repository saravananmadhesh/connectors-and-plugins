# Interaction and Tools

## Table of Contents
- [Overview](#overview)
- [Selection and Interaction](#selection-and-interaction)
- [Tool Modes](#tool-modes)
- [Constraints](#constraints)
- [Commands](#commands)
- [Undo and Redo](#undo-and-redo)
- [Context Menu](#context-menu)
- [User Handles](#user-handles)

## Overview

**Interaction** enables users to select, drag, resize, and modify diagram elements. **Tools** control which operations are allowed.

---

## Selection and Interaction

### Select Nodes

```typescript
// Single node selection
diagram.select([diagram.nodes[0]]);

// Multiple selection
diagram.selectAll();

// Deselect
diagram.clearSelection();

// Check selection
const selectedItems = diagram.selectedItems.nodes;
```

### Selection Events

```typescript
diagram.selectionChange((args) => {
  console.log('New selection:', args.newItems);
  console.log('Previous selection:', args.oldItems);
  console.log('State:', args.state);  // Added, Removed, Changed
});
```

### Drag Nodes

```typescript
diagram.positionChange((args) => {
  console.log('Dragging:', args.newValue);
  console.log('Previous position:', args.oldValue);
});
```

> **Note:** The `positionChange` event is triggered only for mouse-based dragging operations and does not support keyboard-based movement interactions.

### Resize Nodes

```typescript
diagram.sizeChange((args) => {
if (args.state === 'Start') {
      console.log('Size Change');
    }
});

diagram.sizeChange((args) => {
 if (args.state === 'Progress') {
      console.log('Size Change');
    }
});

diagram.sizeChange((args) => {
   if (args.state === 'Completed') {
      console.log('Size Change');
    }
});
```

---

## Tool Modes

### Pointer Tool (Default)

Select and manipulate existing elements:

```typescript
diagram.tool = DiagramTools.ZoomPan;  // Default pointer tool
```

### Draw Tool

Draw connectors manually:

```typescript
diagram.tool = DiagramTools.DrawOnce;  // Draw one connector, return to pointer

diagram.tool = DiagramTools.ContinuousDraw;  // Draw multiple connectors
```

---

## Constraints

Constraints control what interactions are allowed on nodes and connectors.

### Node Constraints

```typescript
{
  id: 'node1',
  constraints: NodeConstraints.Default  // All interactions allowed
}

// Disable specific interactions
{
  id: 'node1',
  constraints: NodeConstraints.Default & ~NodeConstraints.Drag  // Can't drag
}

{
  id: 'readOnly',
  constraints: NodeConstraints.Default & ~NodeConstraints.Drag & ~NodeConstraints.Resize
}
```

### Constraint Options

```typescript
NodeConstraints.Default          // All allowed
NodeConstraints.Drag        // Can drag
NodeConstraints.Resize        // Can resize
NodeConstraints.Rotate        // Can rotate
NodeConstraints.Select           // Can select
NodeConstraints.Delete           // Can delete
NodeConstraints.InConnect  // Can be connector source
NodeConstraints.OutConnect   // Can be connector target
```

### Connector Constraints

```typescript
{
  id: 'connector1',
  constraints: ConnectorConstraints.Default & ~ConnectorConstraints.Delete
}
```

### Diagram Constraints

```typescript
diagram.constraints = DiagramConstraints.Default;

// Disable zooming
diagram.constraints = DiagramConstraints.Default & ~DiagramConstraints.Zoom;

// Disable panning
diagram.constraints = DiagramConstraints.Default & ~DiagramConstraints.Pan;
```

---

## Commands

### Built-in Commands

```typescript
// Copy/Paste
diagram.copy();
diagram.paste();

// Cut
diagram.cut();

// Delete
diagram.delete();

// Undo/Redo (see section below)
diagram.undo();
diagram.redo();

// Group/Ungroup
diagram.group();
diagram.ungroup();

// Align
diagram.align('Left');
diagram.align('Right');
diagram.align('Top');
diagram.align('Bottom');
diagram.align('Center');
diagram.align('Middle');

// Distribute
diagram.distribute('RightToLeft');
diagram.distribute('BottomToTop');

// Arrange
diagram.sendToBack();
diagram.bringToFront();

// Zoom
diagram.zoomTo(1.2);  // Zoom to 120%
diagram.fitToPage();
```

### Keyboard Shortcuts

```typescript
// Default shortcuts
Ctrl+A    // Select all
Ctrl+C    // Copy
Ctrl+V    // Paste
Ctrl+X    // Cut
Delete    // Delete
Ctrl+Z    // Undo
Ctrl+Y    // Redo
```

### Custom Commands

```typescript
// Define custom command
const customCmd = {
  name: 'myCommand',
  execute: () => {
    console.log('Custom command executed');
  },
  undo: () => {
    console.log('Undo custom command');
  },
  redo: () => {
    console.log('Redo custom command');
  }
};


// Execute from keyboard
diagram.keyDown((args) => {
  if (args.key === 'q') {
    
  }
});
```

---

## Undo and Redo

### Enable/Disable Undo/Redo

```typescript
diagram.historyManager.canUndo = true;
diagram.historyManager.canRedo = true;
```

### Undo/Redo Stack Size

```typescript
diagram.historyManager.stackLimit = 50;  // Max undo steps
```

### Manual Undo/Redo

```typescript
diagram.undo();
diagram.redo();

diagram.historyManager.clearHistory();  // Clear all history
```

### Listen to History Changes

```typescript
diagram.historyChange((args) => {
  console.log('Can undo:', args.undoCount > 0);
  console.log('Can redo:', args.redoCount > 0);
});
```

---

## Context Menu

### Enable Context Menu

```typescript
diagram.contextMenu = {
  show: true,
  items: ['Cut', 'Copy', 'Paste', 'Delete', 'Group', 'Ungroup']
};
```

### Context Menu Items

```typescript
diagram.contextMenu = {
  show: true,
  items: [
    'Cut',
    'Copy',
    'Paste',
    'Delete',
    { text: 'Custom', id: 'custom', target: '.e-diagram' },
    'Group',
    'Ungroup',
    'SelectAll',
    'SendToBack',
    'BringToFront'
  ]
};
```

### Custom Menu Item Handler

```typescript
diagram.contextMenuClick((args) => {
  if (args.item.id === 'custom') {
    console.log('Custom item clicked');
    // Perform action
  }
});
```

---

## User Handles

Custom connection handles for visual feedback in diagrams:

### Define User Handles

```typescript
{
  id: 'node1',
  userHandles: [
    {
      name: 'handle1',
      position: 'TopCenter',
      offset: { x: 0.5, y: 0 },
      side: 'Top',
      icon: {
        shape: 'Circle',
        width: 15,
        height: 15,
        fill: '#FF0000'
      }
    }
  ]
}
```

### Handle Positions

```
TopLeft, TopCenter, TopRight
MiddleLeft, MiddleCenter, MiddleRight
BottomLeft, BottomCenter, BottomRight
```

### Handle Events

```typescript
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

---

**→ Next: Save and export diagrams with [serialization and export](serialization-and-export.md)**
