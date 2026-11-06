# Nodes in Syncfusion Vue Diagram

## Table of Contents
- [Overview](#overview)
- [Creating Nodes](#creating-nodes)
- [Node Positioning](#node-positioning)
- [Node Shapes](#node-shapes)
- [Node Styling](#node-styling)
- [Node Customization](#node-customization)
- [Expand/Collapse](#expandcollapse)
- [Node Events](#node-events)
- [getNodeDefaults Pattern](#getnodedefaults-pattern)

## Overview

Nodes are the primary building blocks of a diagram. They represent entities, processes, or objects in your diagram. Each node can be styled, customized, and interacted with.

## Creating Nodes

Nodes are defined as an array and passed to the diagram component:

```vue
<template>
  <ejs-diagram :nodes="nodes"></ejs-diagram>
</template>

<script setup>
const nodes = [
  {
    id: 'node1',
    width: 100,
    height: 100,
    offsetX: 250,
    offsetY: 250,
    style: { fill: '#6BA3D5' },
    annotations: [{ content: 'Node 1' }]
  }
];
</script>
```

### Adding Nodes Programmatically

```javascript
// Add a single node
diagram.add({
  id: 'newNode',
  width: 100,
  height: 100,
  offsetX: 400,
  offsetY: 400
});

// Add multiple nodes
const newNodes = [
  { id: 'node2', offsetX: 300, offsetY: 300, width: 100, height: 100 },
  { id: 'node3', offsetX: 500, offsetY: 300, width: 100, height: 100 }
];
diagram.addElements(newNodes);
```

## Node Positioning

### Offset (Absolute Position)

Nodes are positioned using `offsetX` and `offsetY`, which represent the center of the node:

```javascript
const node = {
  id: 'node1',
  offsetX: 250,    // Horizontal center position
  offsetY: 250,    // Vertical center position
  width: 100,      // Node width
  height: 100      // Node height
};
```

### Node Dimensions

```javascript
const node = {
  id: 'node1',
  width: 150,      // Node width in pixels
  height: 75,      // Node height in pixels
  offsetX: 250,
  offsetY: 250
};
```

### Min/Max Size

```javascript
const node = {
  id: 'node1',
  offsetX: 250,
  offsetY: 250,
  minWidth: 50,    // Minimum resizable width
  minHeight: 50,   // Minimum resizable height
  maxWidth: 300,   // Maximum resizable width
  maxHeight: 300   // Maximum resizable height
};
```

## Node Shapes

### Basic Shapes

```javascript
const nodes = [
  // Rectangle
  { id: 'rect', shape: { type: 'Basic', shape: 'Rectangle' } },
  
  // Ellipse
  { id: 'ellipse', shape: { type: 'Basic', shape: 'Ellipse' } },
  
  // Diamond
  { id: 'diamond', shape: { type: 'Basic', shape: 'Diamond' } },
  
];
```

### Flow Chart Shapes

```javascript
const nodes = [
  { id: 'process', shape: { type: 'Flow', shape: 'Process' } },
  { id: 'decision', shape: { type: 'Flow', shape: 'Decision' } },
  { id: 'document', shape: { type: 'Flow', shape: 'Document' } },
  { id: 'data', shape: { type: 'Flow', shape: 'Data' } },
  { id: 'predefinedProcess', shape: { type: 'Flow', shape: 'PreDefinedProcess' } },
  { id: 'terminator', shape: { type: 'Flow', shape: 'Terminator' } }
];
```

### Image Nodes

```javascript
const node = {
  id: 'imageNode',
  width: 100,
  height: 100,
  offsetX: 250,
  offsetY: 250,
  shape: {
    type: 'Image',
    source: '[YOUR URL HERE]',
    scale: 'Stretch'
  }
};
```

### HTML Nodes

```javascript
const node = {
  id: 'htmlNode',
  width: 150,
  height: 100,
  offsetX: 250,
  offsetY: 250,
  shape: {
    type: 'HTML',
    content: '<div style="background: #fff; padding: 10px;">Custom HTML</div>'
  }
};
```

### Text Nodes

```javascript
const node = {
  id: 'textNode',
  shape: { type: 'Text', content: 'Text Element' },
  style: { fill: 'none' }
};
```

## Node Styling

### Fill, Stroke, and Outline

```javascript
const node = {
  id: 'node1',
  offsetX: 250,
  offsetY: 250,
  width: 100,
  height: 100,
  style: {
    fill: '#6BA3D5',           // Background color
    strokeColor: '#2E5090',         // Border color
    strokeWidth: 2,            // Border thickness
    opacity: 1,                // Transparency (0-1)
    strokeDashArray: '5,5',          // Dashed border pattern
    shadow: {
      offset: { x: 5, y: 5 },  // Shadow offset
      angle: 45,
      opacity: 0.3,
      color: '#000000'
    }
  }
};
```

### Font Styling for Text

```javascript
const node = {
  id: 'textNode',
  annotations: [{
    content: 'Sample Text',
    style: {
      fontSize: 14,
      fontFamily: 'Arial',
      color: '#ffffff',
      bold: true,
      italic: false,
      textAlign: 'Center',
      textOverflow: 'Wrap',
      textDecoration: 'None'
    }
  }]
};
```

## Node Customization

### Node with Annotations (Labels)

```javascript
const node = {
  id: 'node1',
  offsetX: 250,
  offsetY: 250,
  width: 100,
  height: 100,
  style: { fill: '#6BA3D5' },
  annotations: [
    {
      content: 'Node Label',
      offset: { x: 0.5, y: 0.5 },    // Normalized position (0-1)
      style: { color: '#ffffff' }
    }
  ]
};
```

### Tooltip on Node

```javascript
const node = {
  id: 'node1',
  offsetX: 250,
  offsetY: 250,
  tooltip: {
    content: 'This is Node 1',
    position: 'TopCenter',
    relativeMode: 'Object'
  }
};
```

### Rotation

```javascript
const node = {
  id: 'node1',
  offsetX: 250,
  offsetY: 250,
  width: 100,
  height: 100,
  rotateAngle: 45    // Rotate 45 degrees
};
```

## Expand/Collapse

Nodes can be configured to expand/collapse child nodes:

```javascript
const nodes = [
  {
    id: 'parent',
    offsetX: 250,
    offsetY: 250,
    width: 100,
    height: 100,
    expandIcon: {
      shape: 'Plus',
      width: 20,
      height: 20,
      offset: { x: 0.5, y: 1 },
      fill: '#2E5090'
    },
    collapseIcon: {
      shape: 'Minus',
      width: 20,
      height: 20,
      offset: { x: 0.5, y: 1 },
      fill: '#2E5090'
    }
  }
];

```

## Node Events

```javascript
diagram.selectionChange = (args) => {
  console.log('Node selected:', args.source);
};

diagram.propertyChange = (args) => {
  console.log('Node Property Changed');
};

diagram.positionChange = (args) => {
  console.log('Node moved to:', args.source.offsetX, args.source.offsetY);
};

diagram.sizeChange = (args) => {
  console.log('Node resized:', args.source.width, args.source.height);
};

diagram.rotateChange = (args) => {
  console.log('Node rotated:', args.source.rotateAngle);
};
```

## getNodeDefaults Pattern

Use `getNodeDefaults` to apply consistent defaults to all nodes:

```javascript
diagram.getNodeDefaults = (node) => {
  // Apply default values to every node
  if (!node.width) node.width = 100;
  if (!node.height) node.height = 100;
  if (!node.style) {
    node.style = {};
  }
  node.style.fill = '#6BA3D5';
  node.style.strokeColor = '#2E5090';
  node.style.strokeWidth = 2;
  
  // Set default annotation
  if (!node.annotations || node.annotations.length === 0) {
    node.annotations = [{ content: node.id }];
  }
  
  return node;
};
```

This ensures all nodes follow the same styling convention without repeating the code for each node.
