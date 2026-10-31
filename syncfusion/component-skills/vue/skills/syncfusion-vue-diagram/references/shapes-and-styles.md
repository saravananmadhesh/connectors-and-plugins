# Shapes and Styles in Syncfusion Vue Diagram

## Overview

Syncfusion Diagram provides comprehensive built-in shape types and styling options. Choose from flow chart shapes, basic geometry, custom paths, images, or HTML content. Styling options include fill colors, strokes, shadows, and more.

## Built-in Shape Types

### Basic Shapes

Basic shapes are fundamental geometry elements:

```javascript
const basicShapes = [
  { id: 'rect', shape: { type: 'Basic', shape: 'Rectangle' } },
  { id: 'circle', shape: { type: 'Basic', shape: 'Ellipse' } },
  { id: 'diamond', shape: { type: 'Basic', shape: 'Diamond' } },
  { id: 'triangle', shape: { type: 'Basic', shape: 'Triangle' } },
  { id: 'pentagon', shape: { type: 'Basic', shape: 'Pentagon' } },
  { id: 'hexagon', shape: { type: 'Basic', shape: 'Hexagon' } },
  { id: 'parallelogram', shape: { type: 'Basic', shape: 'Parallelogram' } },
  { id: 'trapezoid', shape: { type: 'Basic', shape: 'Trapezoid' } }
];
```

### Flow Chart Shapes

Flow chart shapes represent common workflow elements:

```javascript
const flowShapes = [
  { id: 'process', shape: { type: 'Flow', shape: 'Process' } },
  { id: 'decision', shape: { type: 'Flow', shape: 'Decision' } },
  { id: 'document', shape: { type: 'Flow', shape: 'Document' } },
  { id: 'data', shape: { type: 'Flow', shape: 'Data' } },
  { id: 'preProcess', shape: { type: 'Flow', shape: 'PreDefinedProcess' } },
  { id: 'terminator', shape: { type: 'Flow', shape: 'Terminator' } },
  { id: 'merge', shape: { type: 'Flow', shape: 'Merge' } },
  { id: 'sort', shape: { type: 'Flow', shape: 'Sort' } },
  { id: 'delay', shape: { type: 'Flow', shape: 'Delay' } },
  { id: 'multiDoc', shape: { type: 'Flow', shape: 'MultiDocument' } },
  { id: 'card', shape: { type: 'Flow', shape: 'Card' } },
  { id: 'offpageRef', shape: { type: 'Flow', shape: 'OffPageReference' } }
];
```

### Path Shapes

Define custom shapes using SVG path data:

```javascript
const pathShape = {
  id: 'customPath',
  shape: {
    type: 'Path',
    data: 'M0,0 L100,0 L100,100 L0,100 Z'  // SVG path
  },
  width: 100,
  height: 100
};
```

### Image Shapes

Use images as node content:

```javascript
const imageNode = {
  id: 'imageNode',
  width: 100,
  height: 100,
  shape: {
    type: 'Image',
    source: '[YOUR URL HERE]',
    scale: 'Stretch'    // Stretch, Meet, Slice
  }
};
```

### HTML Shapes

Embed custom HTML content:

```javascript
const htmlNode = {
  id: 'htmlNode',
  width: 150,
  height: 100,
  shape: {
    type: 'HTML',
    content: `<div style="background: #6BA3D5; padding: 10px; border-radius: 5px; color: white;">
      <strong>Custom HTML</strong><br/>Node Content
    </div>`
  }
};
```

### Text Shapes

Add text-only nodes:

```javascript
const textNode = {
  id: 'textNode',
  shape: {
    type: 'Text',
    content: 'Text Element'
  },
  width: 150,
  height: 100,
  style: {
    fill: 'none',  // No background
    fontSize: 14
  }
};
```

## Style Properties

### Fill and Stroke

```javascript
const node = {
  style: {
    fill: '#6BA3D5',              // Background color
    strokeColor: '#2E5090',            // Border color
    strokeWidth: 2,               // Border thickness
    opacity: 1,                   // Transparency (0-1)
    strokeDashArray: '5,5',             // Dashed pattern
  }
};
```

### Shadow

```javascript
const node = {
  style: {
    shadow: {
      angle: 45,                  // Shadow angle in degrees
      opacity: 0.3,               // Shadow transparency
      offset: { x: 5, y: 5 },     // Offset from node
      color: '#000000'            // Shadow color
    }
  }
};
```

### Gradient Fill

```javascript
const node = {
  style: {
    gradient: {
      type: 'Linear',             // Linear or Radial
      x1: 0,
      y1: 0,
      x2: 50,
      y2: 50,
      stops: [
        { color: '#ffffff', offset: 0 },
        { color: '#6BA3D5', offset: 100 }
      ]
    }
  }
};
```

### Font Styling

```javascript
const node = {
  style: {
    fontSize: 14,
    fontFamily: 'Arial',
    bold: true,
    italic: false,
    color: '#ffffff',
    textAlign: 'Center',
    textOverflow: 'Wrap',
    textDecoration: 'None'        // None, Underline, Overline, LineThrough
  }
};
```

## CSS Class Customization

### Apply CSS Classes to Nodes

```javascript
const node = {
  id: 'node1',
  width: 100,
  height: 100,
  cssClass: 'custom-node',        // CSS class name
  annotations: [
    {
      content: 'Styled Node',
      cssClass: 'custom-label'
    }
  ]
};
```

```css
.custom-node {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.custom-label {
  font-weight: bold;
  color: #ffffff;
}
```


## Complete Style Example

```javascript
const styledNode = {
  id: 'styledNode',
  width: 120,
  height: 80,
  offsetX: 250,
  offsetY: 250,
  shape: { type: 'Flow', shape: 'Process' },
  style: {
    fill: '#6BA3D5',
    strokeColor: '#2E5090',
    strokeWidth: 2,
    opacity: 0.95,
    shadow: {
      angle: 45,
      opacity: 0.3,
      offset: { x: 5, y: 5 }
    }
  },
  annotations: [
    {
      content: 'Process Step',
      style: {
        fontSize: 12,
        bold: true,
        color: '#ffffff',
        textAlign: 'Center'
      }
    }
  ]
};
```

Shapes and styles work together to create visually distinct and meaningful diagrams. Choose appropriate shapes for your domain and apply consistent styling across your diagram.
