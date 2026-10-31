# Nodes

## Table of Contents
- [Overview](#overview)
- [Creating Nodes](#creating-nodes)
- [Positioning and Sizing](#positioning-and-sizing)
- [Node Shapes](#node-shapes)
- [Styling Nodes](#styling-nodes)
- [Node Customization](#node-customization)
- [Expand/Collapse](#expandcollapse)
- [Node Events](#node-events)
- [getNodeDefaults Pattern](#getnodedefaults-pattern)

## Overview

**Nodes** are the primary building blocks of a diagram. They represent entities, processes, decisions, and other visual elements.

### Key Node Properties

```typescript
interface Node {
  id: string;                          // Unique identifier
  width: number;                       // Width in pixels
  height: number;                      // Height in pixels
  offsetX: number;                     // X position of center
  offsetY: number;                     // Y position of center
  shape: { type: string; shape?: string };  // Shape definition
  annotations?: Annotation[];          // Labels on node
  style?: NodeStyle;                   // Fill, strokeColor, colors
  constraints?: NodeConstraints;       // Allow/disable interactions
  // ...many more properties in NodeModel
}
```

## Creating Nodes

### Add Nodes to Diagram

```typescript
// Define nodes array
nodes = [
  {
    id: 'node1',
    width: 100,
    height: 100,
    offsetX: 150,
    offsetY: 150
  },
  {
    id: 'node2',
    width: 100,
    height: 100,
    offsetX: 350,
    offsetY: 150
  }
];

// Add to template
<ejs-diagram [nodes]="nodes"></ejs-diagram>
```

### Add Nodes Dynamically

```typescript
// Add a single node
diagram.add({
  id: 'newNode',
  width: 80,
  height: 80,
  offsetX: 500,
  offsetY: 200,
  shape: { type: 'Flow', shape: 'Process' }
});

// Add multiple nodes at once
const nodesArray = [node1, node2, node3];
diagram.addElements(nodesArray);
```

> **Note:** The method `addNode()` does not exist. Use `add()` for a single node and `addElements()` for multiple nodes.

### Remove Nodes

```typescript
// Remove by ID
diagram.remove('node1');

// Remove multiple
diagram.remove(['node1', 'node2']);
```

## Positioning and Sizing

### Absolute Positioning

Nodes are positioned by **center point** (offsetX, offsetY):

```typescript
{
  id: 'process',
  offsetX: 200,    // Center X
  offsetY: 150,    // Center Y
  width: 100,      // Total width
  height: 80       // Total height
}
```

**Note:** The node's top-left will be at:
- X = offsetX - (width / 2)
- Y = offsetY - (height / 2)

### Responsive Sizing

> **Note:** Percentage values for `width`, `height`, `offsetX`, and `offsetY` are **not supported**. These properties must be numbers (pixels). Responsive sizing must be handled via container resizing and manual recalculation.

### Maintaining Aspect Ratio

```typescript
{
  id: 'node1',
  width: 100,
  height: 100,
  shape: { type: 'Image', source: 'image.png' },
  constraints: NodeConstraints.Default & ~NodeConstraints.Resize  // Prevent resize
}
```

## Node Shapes

### Flow Chart Shapes

```typescript
shape: { type: 'Flow', shape: 'Process' }
```

**Available shapes:** Terminator, Decision, Process, Data, DirectData, SequentialData, PaperTape, Sort, MultiDocument, Collate, SummingJunction, Or, Extract, Merge, OfflineStorage, OnlineStorage, ManualInput, ManualOperation, LoopLimit, Delay

### Basic Shapes

```typescript
shape: { type: 'Basic', shape: 'Rectangle' }
// or: Ellipse, Hexagon, Pentagon, Triangle, Star, Cylinder, Parallelogram
```

### Path Shapes

```typescript
shape: {
  type: 'Path',
  data: 'M20 20 L20 500 L500 500 L500 20 Z'  // SVG path data
}
```

### Image Shapes

```typescript
shape: {
  type: 'Image',
  source: 'https://example.com/avatar.png',
  scale: 'Stretch'  // or: Meet, Slice, None
}
```

### HTML Shapes

```typescript
shape: {
  type: 'HTML',
  content: '<div style="color:red;padding:5px"><b>HTML Node</b></div>'
}
```

### NSvg (Native SVG)

```typescript
shape: {
  type: 'Native',
  content: '<svg><circle cx="20" cy="20" r="20" fill="blue"/></svg>'
}
```

## Styling Nodes

### Basic Styling

```typescript
{
  id: 'node1',
  style: {
    fill: '#90EE90',           // Light green
    strokeColor: '#228B22',         // Dark green
    strokeWidth: 2,
    opacity: 0.8
  }
}
```

### Gradients

```typescript
{
  id: 'node1',
  style: {
    gradient: {
      type: 'Linear',
      x1: 0, y1: 0,
      x2: 100, y2: 100,
      stops: [
        { color: '#FF0000', offset: 0 },
        { color: '#0000FF', offset: 100 }
      ]
    }
  }
}
```

### Dashed Borders

```typescript
{
  id: 'node1',
  style: {
    strokeColor: '#000000',
    strokeDashArray: '5,5',  // 5px dash, 5px gap
    strokeWidth: 2
  }
}
```

### Shadow Effect

```typescript
{
  id: 'node1',
  style: {
    fill: '#90EE90',
    shadow: {
      angle: 45,
      blur: 15,
      color: 'rgba(0,0,0,0.3)',
      distance: 5
    }
  }
}
```

## Node Customization

### Custom Templates

```typescript
<ejs-diagram>
  <e-nodes>
    <e-node 
      id="node1" 
      [offsetX]="150" 
      [offsetY]="150"
      [template]="customTemplate">
    </e-node>
  </e-nodes>
</ejs-diagram>

<!-- Template -->
<ng-template #customTemplate let-data>
  <div style="width:100%;height:100%;background:lightblue;border-radius:5px;">
    <span>Custom Node</span>
  </div>
</ng-template>
```

### Appearance with getNodeDefaults

See [getNodeDefaults Pattern](#getnodedefaults-pattern) section below.

### Tooltip on Nodes

```typescript
{
  id: 'node1',
  tooltip: {
    content: 'This is Node 1',
    position: 'TopCenter'
  }
}
```

## Expand/Collapse

### Collapsible Nodes

```typescript
{
  id: 'node1',
  isExpanded: true,       // Initially expanded
  shape: { type: 'Flow', shape: 'Process' },
  expandIcon: {
    shape: 'Plus',
    width: 20,
    height: 20
  },
  collapseIcon: {
    shape: 'Minus',
    width: 20,
    height: 20
  }
}
```

## Node Events

### Selection Events

```typescript
diagram.selectionChange((args) => {
  if (args.state === 'Changed') {
    console.log('Selected nodes:', args.newItems);
    console.log('Deselected nodes:', args.oldItems);
  }
});
```

### Double-click and Click Events

```typescript
diagram.doubleClick((args) => {
  if (args.source instanceof Node) {
    console.log('Clicked node:', args.source.id);
  }
});
```

### Drag Events

```typescript
diagram.dragEnter((args) => {
  console.log('Dragging:', args.element);
});

diagram.drag((args) => {
  console.log('New position:', args.element.offsetX, args.element.offsetY);
});

diagram.dragLeave((args) => {
  console.log('Drag complete');
});
```

### Position Changed

```typescript
// Use the positionChange event for node drag/move
<ejs-diagram (positionChange)="onPositionChange($event)"></ejs-diagram>

// In your component:
onPositionChange(args: IDraggingEventArgs) {
  if (args.state === 'Completed') {
    console.log('Node moved to:', args.source.offsetX, args.source.offsetY);
  }
}
```

### Property Change Event

```typescript
// Use the propertyChange event to track any property changes
<ejs-diagram (propertyChange)="onPropertyChange($event)"></ejs-diagram>

// In your component:
onPropertyChange(args: IPropertyChangeEventArgs) {
  console.log('Property changed:', args.propertyName, 'New value:', args.newValue);
}
```

## getNodeDefaults Pattern

### Purpose

Set default styles for all nodes without repeating code:

```typescript
getNodeDefaults = (node: NodeModel): NodeModel => {
  return {
    shape: { type: 'Flow', shape: 'Process' },
    style: {
      fill: '#90EE90',
      strokeColor: '#228B22',
      strokeWidth: 2
    },
    height: 80,
    width: 100
  };
};

// In template
<ejs-diagram [getNodeDefaults]="getNodeDefaults"></ejs-diagram>
```

### Override Defaults Per Node

```typescript
// Global defaults
getNodeDefaults = (node: NodeModel): NodeModel => {
  return {
    style: { fill: '#90EE90' }
  };
};

// Override in specific nodes
nodes = [
  {
    id: 'special',
    style: { fill: '#FF0000' }  // This red overrides green default
  }
];
```

### Common Defaults

```typescript
getNodeDefaults = (node: NodeModel): NodeModel => {
  const isDecision = node.id.includes('decision');
  
  return {
    style: {
      fill: isDecision ? '#FFD700' : '#90EE90',
      strokeColor: '#333333',
      strokeWidth: 1
    },
    annotations: [{
      content: node.id,
      style: { fontSize: 12, color: 'black' }
    }],
    width: 100,
    height: 80
  };
};
```

---

**→ Next: Add [connectors](connectors.md) to link nodes together**
