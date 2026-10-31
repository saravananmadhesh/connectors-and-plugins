# Nodes & Shapes

## Table of Contents

- [Overview](#overview)
- [Creating Nodes](#creating-nodes)
- [Built-in Shapes](#built-in-shapes)
- [Node Properties](#node-properties)
- [Adding Labels](#adding-labels)
- [BPMN Shapes](#bpmn-shapes)
- [Creating Node Collections](#creating-node-collections)
- [Adding/Removing Nodes at Runtime](#addingremoving-nodes-at-runtime)

## Overview

Nodes are graphical objects representing data, processes, or concepts in a diagram. Each node consists of:
- **Visual Shape** - Rectangle, circle, polygon, diamond, etc.
- **Label/Text** - Annotations describing the node
- **Style** - Fill color, stroke, formatting
- **Position & Size** - Location and dimensions on canvas

## Creating Nodes

### Basic Node

The simplest node requires only an ID, position, and size:

```ts
import { Diagram, NodeModel } from '@syncfusion/ej2-diagrams';

let node: NodeModel = {
  id: 'node1',           // Unique identifier (must start with letter)
  offsetX: 250,          // X position (center)
  offsetY: 250,          // Y position (center)
  width: 100,            // Width in pixels
  height: 100            // Height in pixels
};

let diagram = new Diagram({
  width: '100%',
  height: '600px',
  nodes: [node]
});

diagram.appendTo('#diagram');
```

**Node ID Rules:**
- ✅ Must start with a letter
- ✅ Unique across all nodes and connectors
- ❌ Cannot contain spaces
- ❌ Cannot start with numbers or special characters
- ❌ Cannot contain underscores (_)

## Built-in Shapes

Syncfusion provides predefined shapes for common use cases:

### Basic Shapes

```ts
let nodes: NodeModel[] = [
  // Rectangle (default)
  {
    id: 'rectangle',
    offsetX: 50,
    offsetY: 50,
    width: 100,
    height: 60,
    shape: 'Rectangle'
  },
  
  // Circle/Ellipse
  {
    id: 'circle',
    offsetX: 200,
    offsetY: 50,
    width: 80,
    height: 80,
    shape: 'Circle'
  },
  
  // Diamond (often used for decisions)
  {
    id: 'diamond',
    offsetX: 350,
    offsetY: 50,
    width: 80,
    height: 80,
    shape: 'Diamond'
  },
  
  // Triangle
  {
    id: 'triangle',
    offsetX: 500,
    offsetY: 50,
    width: 80,
    height: 80,
    shape: 'Triangle'
  },
  
  // Hexagon
  {
    id: 'hexagon',
    offsetX: 650,
    offsetY: 50,
    width: 80,
    height: 80,
    shape: 'Hexagon'
  },
  
  // Polygon (custom sides)
  {
    id: 'polygon',
    offsetX: 800,
    offsetY: 50,
    width: 80,
    height: 80,
    shape: 'Polygon'
  }
];
```

### Predefined Flowchart Shapes

```ts
let flowchartShapes: NodeModel[] = [
  // Start/End (rounded rectangle)
  { id: 'start', offsetX: 100, offsetY: 100, width: 100, height: 50, shape: 'Ellipse' },
  
  // Process (rectangle)
  { id: 'process', offsetX: 100, offsetY: 200, width: 100, height: 50, shape: 'Rectangle' },
  
  // Decision (diamond)
  { id: 'decision', offsetX: 100, offsetY: 300, width: 100, height: 80, shape: 'Diamond' },
  
  // Data (parallelogram)
  { id: 'data', offsetX: 100, offsetY: 450, width: 100, height: 60, shape: 'Parallelogram' },
  
  // Document (rectangle with bottom notch)
  { id: 'document', offsetX: 100, offsetY: 580, width: 100, height: 60, shape: 'Document' }
];
```

## Node Properties

### Positioning & Sizing

```ts
let node: NodeModel = {
  id: 'node1',
  offsetX: 250,        // Center X position
  offsetY: 250,        // Center Y position
  width: 100,          // Width
  height: 100,         // Height
  minWidth: 50,        // Minimum width (prevents shrinking below this)
  minHeight: 50,       // Minimum height
  maxWidth: 200,       // Maximum width
  maxHeight: 200       // Maximum height
};
```

### Styling

```ts
let styledNode: NodeModel = {
  id: 'styled',
  offsetX: 250,
  offsetY: 250,
  width: 100,
  height: 100,
  style: {
    fill: '#6BA5D7',              // Background color
    strokeColor: 'white',         // Border color
    strokeWidth: 2,               // Border width
    opacity: 0.8,                 // 0 = transparent, 1 = opaque
    textOverflow: 'Wrap'          // How text wraps
  }
};
```

### Rotation

```ts
let rotatedNode: NodeModel = {
  id: 'rotated',
  offsetX: 250,
  offsetY: 250,
  width: 100,
  height: 100,
  rotationAngle: 45  // Rotate 45 degrees
};
```

## Adding Labels

Labels are text annotations on nodes:

### Single Label

```ts
let nodeWithLabel: NodeModel = {
  id: 'node1',
  offsetX: 250,
  offsetY: 250,
  width: 100,
  height: 100,
  style: { fill: '#6BA5D7' },
  annotations: [
    {
      content: 'Start',           // Text content
      style: {
        color: 'white',          // Text color
        fontSize: 14,            // Font size
        fontFamily: 'Arial',     // Font family
        bold: true               // Bold text
      }
    }
  ]
};
```

### Multiple Labels

```ts
let multiLabelNode: NodeModel = {
  id: 'node2',
  offsetX: 250,
  offsetY: 250,
  width: 120,
  height: 100,
  annotations: [
    {
      content: 'Process',
      offset: { x: 0.5, y: 0.3 }  // Position in node (0-1 scale)
    },
    {
      content: 'Sub-process',
      offset: { x: 0.5, y: 0.7 },
      style: { fontSize: 10 }
    }
  ]
};
```

## BPMN Shapes

BPMN (Business Process Model and Notation) shapes for business process diagrams:

**Important:** BPMN shapes require importing the BPMN module. See ej2-diagrams BPMN documentation for complete list.

```ts
let bpmnNode: NodeModel = {
  id: 'event',
  offsetX: 250,
  offsetY: 250,
  width: 60,
  height: 60,
 shape: {
        type: 'Bpmn',
        shape: 'Event',
        // Sets event as Start and trigger as None
        event: {
          event: 'Start',
          trigger: 'None',
        },
    }, // No external trigger
};
```

**Common BPMN Shapes:**
- `Event` - Circle (start, end, intermediate)
- `Activity` - Rectangle/rounded rectangle
- `Gateway` - Diamond (decision points)
- `DataObject` - Folder/document shape

## Creating Node Collections

### Array of Nodes

```ts
let nodes: NodeModel[] = [
  {
    id: 'node1',
    offsetX: 100,
    offsetY: 100,
    width: 80,
    height: 60,
    annotations: [{ content: 'Node 1' }]
  },
  {
    id: 'node2',
    offsetX: 250,
    offsetY: 100,
    width: 80,
    height: 60,
    annotations: [{ content: 'Node 2' }]
  },
  {
    id: 'node3',
    offsetX: 400,
    offsetY: 100,
    width: 80,
    height: 60,
    annotations: [{ content: 'Node 3' }]
  }
];

let diagram = new Diagram({
  nodes: nodes
});
```

## Adding/Removing Nodes at Runtime

### Add Nodes Dynamically

```ts
let diagram = new Diagram({
  width: '100%',
  height: '600px'
});
diagram.appendTo('#diagram');

// Add single node
let newNode: NodeModel = {
  id: 'runtime_node',
  offsetX: 300,
  offsetY: 300,
  width: 100,
  height: 100,
  annotations: [{ content: 'Added at Runtime' }]
};

diagram.add(newNode);

// Add multiple nodes

let nodesCollection: NodeModel[] =[
  { id: 'node2', offsetX: 100, offsetY: 100, width: 80, height: 60 },
  { id: 'node3', offsetX: 200, offsetY: 200, width: 80, height: 60 }
]

diagram.addElements(nodesCollection);
```

### Remove Nodes

```ts
// Remove
diagram.remove(diagram.nodes[0]);

// Remove selected node
if (diagram.selectedItems.nodes.length > 0) {
  diagram.remove(diagram.selectedItems.nodes[0]);
}

// Remove all nodes
diagram.nodes.forEach(node => diagram.remove(node));
```

### Update Node Properties

```ts
// Get node by ID
let node = diagram.getObject('node1');

if (node) {
  // Update position
  node.offsetX = 350;
  node.offsetY = 350;
  
  // Update style
  node.style.fill = 'yellow';
  
  //diagram to show changes
  diagram.dataBind();
}
```

## Common Patterns

### Pattern : Hierarchical Nodes
```ts
let nodes: NodeModel[] = [
  { id: 'parent', offsetX: 250, offsetY: 50, width: 80, height: 60, annotations: [{ content: 'Boss' }] },
  { id: 'child1', offsetX: 100, offsetY: 150, width: 80, height: 60, annotations: [{ content: 'Team 1' }] },
  { id: 'child2', offsetX: 250, offsetY: 150, width: 80, height: 60, annotations: [{ content: 'Team 2' }] },
  { id: 'child3', offsetX: 400, offsetY: 150, width: 80, height: 60, annotations: [{ content: 'Team 3' }] }
];
```

## Next Steps

- **Connect Nodes:** [connectors-and-connections.md](connectors-and-connections.md)
- **Customize Appearance:** [styling-and-appearance.md](styling-and-appearance.md)
- **Load from Data:** [data-binding-and-loading.md](data-binding-and-loading.md)
