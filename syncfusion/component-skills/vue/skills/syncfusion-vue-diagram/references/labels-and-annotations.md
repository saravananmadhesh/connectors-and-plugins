# Labels and Annotations in Syncfusion Vue Diagram

## Table of Contents
- [Overview](#overview)
- [Adding Annotations](#adding-annotations)
- [Node Annotations](#node-annotations)
- [Connector Annotations](#connector-annotations)
- [Label Styling](#label-styling)
- [Label Positioning](#label-positioning)
- [Label Interaction](#label-interaction)
- [Label Events](#label-events)

## Overview

Annotations (labels) are text elements that appear on nodes and connectors. They provide context, descriptions, or additional information about diagram elements. You can style, position, and interact with labels dynamically.

## Adding Annotations

### To Nodes

```javascript
const node = {
  id: 'node1',
  offsetX: 250,
  offsetY: 250,
  width: 100,
  height: 100,
  annotations: [
    {
      id: 'label1',
      content: 'Node Label',
      style: { fill: '#ffffff', fontSize: 12 }
    }
  ]
};
```

### To Connectors

```javascript
const connector = {
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  annotations: [
    {
      id: 'connLabel',
      content: 'Flows to',
      alignment: 'Center',
      offset: 0.2 
    }
  ]
};
```

### Multiple Annotations on Single Node

```javascript
const node = {
  id: 'node1',
  offsetX: 250,
  offsetY: 250,
  width: 150,
  height: 100,
  annotations: [
    {
      content: 'Title',
      offset: { x: 0.5, y: 0.3 },
      style: { bold: true, fontSize: 14 }
    },
    {
      content: 'Description',
      offset: { x: 0.5, y: 0.7 },
      style: { fontSize: 11, color: '#888888' }
    }
  ]
};
```

## Node Annotations

### Basic Node Label

```javascript
const node = {
  annotations: [
    {
      content: 'Process Step',
      style: { fill: '#000000', fontSize: 12 }
    }
  ]
};
```

### Positioning Node Labels

```javascript
const node = {
  annotations: [
    {
      content: 'Top Label',
      offset: { x: 0.5, y: 0.2 },    // Normalized coordinates (0-1)
      horizontalAlignment: 'Center',
      verticalAlignment: 'Top'
    }
  ]
};
```

### Icon with Label

```javascript
const node = {
  id: 'node1',
  width: 120,
  height: 100,
  annotations: [
    {
      content: '📊 Analytics',
      offset: { x: 0.5, y: 0.5 },
      style: { fontSize: 16, fill: '#2E5090' }
    }
  ]
};
```

## Connector Annotations

### Center Label

```javascript
const connector = {
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  annotations: [
    {
      content: 'connects',
      alignment: 'Center',
      offset: 0.2 // Center of connector
    }
  ]
};
```

### Multiple Connector Labels

```javascript
const connector = {
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  annotations: [
    {
      content: 'Yes',
      alignment: 'Before',            // Near source
      offset: 0.5 
    },
    {
      content: 'Action',
      alignment: 'Center',
      offset: 0
    }
  ]
};
```

### Distance-based Positioning

```javascript
const connector = {
  annotations: [
    {
      content: 'Label',
      alignment: 'Center',
      offset: 0.8,
      segmentAngle: true,              // Follow connector angle
      style: { background: '#ffffff' }
    }
  ]
};
```

## Label Styling

### Font Properties

```javascript
const annotation = {
  content: 'Styled Label',
  style: {
    fontSize: 14,
    fontFamily: 'Arial',
    bold: true,
    italic: false,
    underline: false,
    color: '#ffffff',
    fill: '#6BA3D5'
  }
};
```

### Text Format

```javascript
const annotation = {
  content: 'Formatted Text',
  style: {
    textAlign: 'Center',               // Left, Center, Right
    textOverflow: 'Wrap',              // Wrap or Ellipsis
    textDecoration: 'Underline',       // None, Underline, Overline, LineThrough
    textWrapping: 'WrapWithOverflow'
  }
};
```

### Background and Borders

```javascript
const annotation = {
  content: 'Label with Background',
  style: {
    fill: '#ffffff',
    color: '#000000',
    strokeColor: '#cccccc',
    strokeWidth: 1,
    margin: { left: 5, top: 5, right: 5, bottom: 5 },
    opacity: 0.9
  }
};
```

### Rotation

```javascript
const annotation = {
  content: 'Rotated Label',
  style: {
    rotateAngle: 45                    // Rotate text 45 degrees
  }
};
```

## Label Positioning

### Normalized Positioning (0-1)

```javascript
const annotation = {
  offset: { x: 0.5, y: 0.5 }           // Center of element
  // x: 0 = left, x: 0.5 = center, x: 1 = right
  // y: 0 = top, y: 0.5 = center, y: 1 = bottom
};
```

### Pixel-based Positioning

```javascript
const annotation = {
  margin: { left: 10, top: 10, right: 10, bottom: 10 }
};
```

### Alignment Options

```javascript
const annotation = {
  content: 'Label',
  horizontalAlignment: 'Center',       // Left, Center, Right
  verticalAlignment: 'Center',         // Top, Center, Bottom
  alignment: 'Center'                  // Center, Before, After, Auto
};
```

## Label Interaction

### Editable Labels

```javascript
const diagram = new DiagramComponent();
diagram.constraints = diagram.constraints | DiagramConstraints.TextEdit;

const node = {
  annotations: [
    {
      content: 'Editable Label',
      constraints: AnnotationConstraints.Interaction  // Allow editing
    }
  ]
};
```

### Draggable Labels

```javascript
const node = {
  annotations: [
    {
      content: 'Draggable Label',
      constraints: AnnotationConstraints.Drag     // Allow dragging
    }
  ]
};
```

### Resizable Labels

```javascript
const node = {
  annotations: [
    {
      content: 'Resizable Label Box',
      constraints: AnnotationConstraints.Resize   // Allow resizing
    }
  ]
};
```

### Combined Constraints

```javascript
const node = {
  annotations: [
    {
      content: 'Interactive Label',
      constraints: AnnotationConstraints.Interaction | AnnotationConstraints.Drag
    }
  ]
};
```

## Label Events

### Text Editing

```javascript
diagram.textEdit = (args) => {
  console.log('Annotation before edit:', args.newValue);
  // args.oldValue = original text
  // args.newValue = edited text
  // args.cancel = true to prevent edit
};
```

### Annotation Selection

```javascript
diagram.selectionChange = (args) => {
  console.log('Annotation selected:', args.newItems);
};
```

### Update Labels Programmatically

```javascript
// Update node annotation
const node = diagram.nodes[0];
if (node.annotations && node.annotations.length > 0) {
  node.annotations[0].content = 'Updated Label';
  diagram.dataBind();
}

// Update connector annotation
const connector = diagram.connectors[0];
if (connector.annotations && connector.annotations.length > 0) {
  connector.annotations[0].content = 'Updated Connection Label';
  diagram.dataBind();
}
```

### Clear Annotations

```javascript
const node = diagram.nodes[0];
node.annotations = [];
diagram.dataBind();
```

Labels provide essential context and information display in your diagrams. They improve clarity and user understanding of diagram relationships and processes.
