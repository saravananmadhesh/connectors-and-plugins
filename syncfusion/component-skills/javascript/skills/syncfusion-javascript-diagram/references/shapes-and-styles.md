# Shapes & Styles

## Overview

Diagram supports multiple shape types for representing different elements in your visual workflows. Each shape can be customized with styling properties like colors, strokes, opacity, and effects.

**Key Concepts:**
- **Shape Types** - Built-in shapes and custom shapes (Flow, Basic, Path, Image, HTML)
- **Style Properties** - Fill, stroke, shadows, opacity, dash patterns
- **Theming** - CSS-based theming and class customization
- **Shape Libraries** - Predefined shape groups for common use cases

## Built-in Shape Types

### Flow Chart Shapes

```ts
import { Diagram, NodeModel } from '@syncfusion/ej2-diagrams';

let flowchartShapes: NodeModel[] = [
  // Terminator (start/end)
  {
    id: 'start', offsetX: 100, offsetY: 100, width: 100, height: 50,
    shape: { type: 'Flow', shape: 'Terminator' }
  },

  // Process (action)
  {
    id: 'process', offsetX: 100, offsetY: 180, width: 100, height: 50,
    shape: { type: 'Flow', shape: 'Process' }
  },
  // Decision (branch)
  {
    id: 'decision', offsetX: 100, offsetY: 280, width: 100, height: 80,
    shape: { type: 'Flow', shape: 'Decision' }
  },
  // Direct Data
  {
    id: 'directData', offsetX: 100, offsetY: 400, width: 100, height: 50,
    shape: { type: 'Flow', shape: 'DirectData' }
  },
  // Sequential Data
  {
    id: 'SequentialData', offsetX: 400, offsetY: 100, width: 100, height: 50,
    shape: { type: 'Flow', shape: 'SequentialData' }
  },
  // Data
  {
    id: 'data', offsetX: 250, offsetY: 100, width: 100, height: 60,
    shape: { type: 'Flow', shape: 'Data' }
  },
  // Sort
  {
    id: 'sort', offsetX: 400, offsetY: 200, width: 100, height: 60,
    shape: { type: 'Flow', shape: 'Sort' }
  },

  // Document
  {
    id: 'doc', offsetX: 250, offsetY: 200, width: 100, height: 70,
    shape: { type: 'Flow', shape: 'Document' }
  },

  // MultiDocument
  {
    id: 'MultiDocument', offsetX: 400, offsetY: 300, width: 100, height: 70,
    shape: { type: 'Flow', shape: 'MultiDocument' }
  },
  // Collate
  {
    id: 'Collate', offsetX: 400, offsetY: 400, width: 100, height: 70,
    shape: { type: 'Flow', shape: 'Collate' }
  },

  // Predefined Process
  {
    id: 'predefine', offsetX: 250, offsetY: 310, width: 100, height: 50,
    shape: { type: 'Flow', shape: 'PreDefinedProcess' }
  },

  // PaperTap
  {
    id: 'PaperTap', offsetX: 250, offsetY: 410, width: 100, height: 60,
    shape: { type: 'Flow', shape: 'PaperTap' }
  },

  // SummingJunction
  {
    id: 'parallel', offsetX: 100, offsetY: 500, width: 100, height: 60,
    shape: { type: 'Flow', shape: 'SummingJunction' }
  },
  // Or
  {
    id: 'Or', offsetX: 250, offsetY: 500, width: 100, height: 60,
    shape: { type: 'Flow', shape: 'Or' }
  },
  // InternalStorage
  {
    id: 'InternalStorage', offsetX: 400, offsetY: 500, width: 100, height: 60,
    shape: { type: 'Flow', shape: 'InternalStorage' }
  },
  // Extract
  {
    id: 'Extract', offsetX: 100, offsetY: 600, width: 100, height: 60,
    shape: { type: 'Flow', shape: 'Extract' }
  },
  // ManualOperation
  {
    id: 'ManualOperation', offsetX: 250, offsetY: 600, width: 100, height: 60,
    shape: { type: 'Flow', shape: 'ManualOperation' }
  },
  // Merge
  {
    id: 'Merge', offsetX: 400, offsetY: 600, width: 100, height: 60,
    shape: { type: 'Flow', shape: 'Merge' }
  },

  // OffPageReference
  {
    id: 'OffPageReference', offsetX: 100, offsetY: 700, width: 100, height: 60,
    shape: { type: 'Flow', shape: 'OffPageReference' }
  },
  // SequentialAccessStorage
  {
    id: 'SequentialAccessStorage', offsetX: 250, offsetY: 700, width: 100, height: 60,
    shape: { type: 'Flow', shape: 'SequentialAccessStorage' }
  },
  // Card
  {
    id: 'Card', offsetX: 400, offsetY: 700, width: 100, height: 60,
    shape: { type: 'Flow', shape: 'Card' }
  },

];
```

### Basic Shapes

```ts
let basicShapes: NodeModel[] = [
  { id: 'rectangle', offsetX: 100, offsetY: 100, width: 100, height: 60,
    shape: { type: 'Basic', shape: 'Rectangle' } },

  { id: 'decagon', offsetX: 250, offsetY: 100, width: 80, height: 80,
    shape: { type: 'Basic', shape: 'Decagon' } },

  { id: 'ellipse', offsetX: 400, offsetY: 100, width: 120, height: 60,
    shape: { type: 'Basic', shape: 'Ellipse' } },

  { id: 'diamond', offsetX: 100, offsetY: 200, width: 80, height: 80,
    shape: { type: 'Basic', shape: 'Diamond' } },
  
  { id: 'rightTriangle', offsetX: 100, offsetY: 550, width: 80, height: 80,
    shape: { type: 'Basic', shape: 'RightTriangle' } },

  { id: 'triangle', offsetX: 250, offsetY: 200, width: 80, height: 80,
    shape: { type: 'Basic', shape: 'Triangle' } },

  { id: 'hexagon', offsetX: 400, offsetY: 200, width: 80, height: 80,
    shape: { type: 'Basic', shape: 'Hexagon' } },

  { id: 'parallelogram', offsetX: 100, offsetY: 320, width: 100, height: 60,
    shape: { type: 'Basic', shape: 'Parallelogram' } },

  { id: 'pentagon', offsetX: 250, offsetY: 320, width: 80, height: 80,
    shape: { type: 'Basic', shape: 'Pentagon' } },

  { id: 'plus', offsetX: 400, offsetY: 320, width: 80, height: 80,
    shape: { type: 'Basic', shape: 'Plus' } },

  { id: 'star', offsetX: 100, offsetY: 440, width: 80, height: 80,
    shape: { type: 'Basic', shape: 'Star' } },
  
    { id: 'heptagon', offsetX: 250, offsetY: 440, width: 80, height: 80,
    shape: { type: 'Basic', shape: 'Heptagon' } },
    { id: 'octagon', offsetX: 400, offsetY: 440, width: 80, height: 80,
    shape: { type: 'Basic', shape: 'Octagon' } },
    { id: 'trapizoid', offsetX: 250, offsetY: 550, width: 80, height: 80,
    shape: { type: 'Basic', shape: 'Trapezoid' } },
];
```

### Path Shapes

```ts
let pathShape: NodeModel = {
  id: 'path',
  offsetX: 250,
  offsetY: 250,
  width: 100,
  height: 100,
  shape: {type:'Path',
  data: 'M2,2 L8,2 L2,5 L8,5 L2,8 L8,8'
  // SVG path
  }
};
```

### Image Shapes

```ts
let imageShape: NodeModel = {
  id: 'image',
  offsetX: 250,
  offsetY: 250,
  width: 100,
  height: 100,
  shape: {type:'Image',source: '../images/logo.png'
  }
};
```

### HTML & Native Shapes

```ts
let htmlShape: NodeModel = {
  id: 'html',
  offsetX: 250,
  offsetY: 250,
  width: 150,
  height: 100,
  shape: {type:'HTML',content: '<div style="background:lightblue;padding:10px;"><h4>HTML Content</h4></div>'
}
};
```

## Style Properties

### Complete Styling - Solid Fill variant

```ts
let styledNodeSolid: NodeModel = {
  id: 'styledSolid',
  offsetX: 250,
  offsetY: 200,
  width: 100,
  height: 100,
  // Use a Basic shape model (not a string)
  shape: { type: 'Basic', shape: 'Rectangle' },
  // Use either fill OR gradient in a single node style (not both)
  style: {
    fill: '#6BA5D7',               // Solid background color
    strokeColor: '#003366',
    strokeWidth: 5,
    strokeDashArray: '6 3',        // Correct API for dashed borders
    opacity: 0.8
  },

  // Text styling should go on annotations (not node.style)
  annotations: [{
    content: 'Node Annotation styling',
    style: { color: '#fff', fontSize: 14, fontFamily: 'Arial', bold: true,fill:'hsl(0,100%,50%)',italic:true,opacity:0.7,textAlign:'Right',textDecoration:'Underline',textWrapping:'Wrap',textOverflow:'Wrap',whiteSpace:'CollapseSpace', }
  }]
};

```

### Complete Styling — Gradient Fill variant

```ts
let styledNodeGradient: NodeModel = {
  id: 'styledGradient',
  offsetX: 380,
  offsetY: 200,
  width: 100,
  height: 100,
  shape: { type: 'Basic', shape: 'Rectangle' },

  // Gradient fill example — do NOT include 'fill' here
  style: {
    gradient: {
      type: 'Linear',
      x1: 0, y1: 0, x2: 100, y2: 100,
      // Use 0..1 for offsets
      stops: [
        { color: '#6BA5D7', offset: 0.0 },
        { color: '#003366', offset: 1.0 }
      ]
    },
    strokeColor: '#003366',
    strokeWidth: 2,
    strokeDashArray: '6 3',  // dashed border
    opacity: 0.8
  },

  annotations: [{
    content: 'Gradient Fill',
    style: { color: '#fff', fontSize: 14, fontFamily: 'Arial', bold: true }
  }]
};
```

### Complete Styling — Shadow variant

```ts
import { NodeConstraints } from '@syncfusion/ej2-diagrams';

let nodeWithShadow: NodeModel = {
  id: 'withShadow',
  offsetX: 510, offsetY: 200, width: 110, height: 70,
  shape: { type: 'Basic', shape: 'Rectangle' },
  constraints: NodeConstraints.Default | NodeConstraints.Shadow, // enable shadow
  shadow: { angle: 45, distance: 6, opacity: 0.35, color: '#000' },
  style: { fill: '#FFF8E1', strokeColor: '#F9A825', strokeWidth: 2 },
  annotations: [{ content: 'Shadowed' }]
};
```

### Dash Patterns

```ts

// There are no built-in named dash styles like 'Dash'/'Dot'.
// Use strokeDashArray strings (numbers = dash/gap lengths in pixels).
const dashPatterns = [
  value: '' // empty string → solid line
  value: '6 3' // dash 6, gap 3
  value: '1 3' // short dots
  value: '6 3 1 3' // dash, gap, dot, gap
  value: '6 3 1 3 1 3' // dash, gap, dot, gap, dot, gap
];

// Example of applying a selected pattern to a node:
function applyDashPattern(node: NodeModel, patternValue: string) {
  node.style = { ...(node.style || {}), strokeDashArray: patternValue };
  // Call diagram.dataBind() after modifying nodes in a real setup
}

```

### Color Options

```ts
// CSS color names
const namedColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

// Hex colors
const hexColors = ['#FF0000', '#0000FF', '#00FF00', '#FFFF00'];

// RGB colors
const rgbColors = ['rgb(255,0,0)', 'rgb(0,0,255)'];

// HSL colors
const hslColors = ['hsl(0,100%,50%)', 'hsl(240,100%,50%)'];
```

## CSS Style & Theme Customization

```ts
let cssNode: NodeModel = {
  id: 'primary-node', // Apply CSS id as nodeID_content
  offsetX: 250,
  offsetY: 250,
  width: 100,
  height: 100,
};
```

### CSS Styling

```css
/* styles.css */
 #primary-node_content {
  fill: #6BA5D7 !important;
  stroke: green !important;
  stroke-width: 2 !important;
}

#highlight-node_content {
  fill: #FF6B6B !important;
  stroke-width: 3 !important;
}

#success-node_content {
  fill: #90EE90 !important;
}
```

### Theme Imports

```css
/* Material theme (default) */
@import '@syncfusion/ej2-diagrams/styles/material.css';

/* Bootstrap theme */
@import '@syncfusion/ej2-diagrams/styles/bootstrap.css';

/* Fabric theme */
@import '@syncfusion/ej2-diagrams/styles/fabric.css';

/* High contrast */
@import '@syncfusion/ej2-diagrams/styles/highcontrast.css';
```

## Shape Collections & Libraries

### Creating Shape Collections

```ts
let shapeLibrary: NodeModel[] = [
  // Process shapes (Flow models use shape: { type: 'Flow', shape: '...' })
  { id: 'process1',  offsetX: 100, offsetY: 100, width: 100, height: 60,
    shape: { type: 'Flow', shape: 'Process' } },

  { id: 'decision1', offsetX: 250, offsetY: 100, width: 100, height: 80,
    shape: { type: 'Flow', shape: 'Decision' } },
  
  // Document shape
  { id: 'doc1',      offsetX: 400, offsetY: 100, width: 100, height: 70,
    shape: { type: 'Flow', shape: 'Document' } },
  
  // Data shape (I/O in flowcharts is named 'Data' in EJ2)
  { id: 'data1',     offsetX: 100, offsetY: 220, width: 100, height: 60,
    shape: { type: 'Flow', shape: 'Data' } }
];

let diagram = new Diagram({
  width:1000, height:1000,
  nodes: shapeLibrary
});

```

### Predefined Palettes

```ts
// Flow chart palette (metadata; when creating real nodes, use these shape objects)
// Flow chart palette (metadata; when creating real nodes, use these shape objects)
const flowchartPalette = [
  { id: 'terminator', shape: { type: 'Flow', shape: 'Terminator' }, annotations: [{content:'Start'}] },
  { id: 'process', shape: { type: 'Flow', shape: 'Process'    },  annotations: [{content:'Process'}]   },
  { id: 'decision',  shape: { type: 'Flow', shape: 'Decision'   },  annotations: [{content:'Decision'}]   },
  { id: 'data', shape: { type: 'Flow', shape: 'Data' }, annotations: [{content:'Data'}] }
];

// Basic shapes palette (metadata → convert to NodeModel when needed)
const basicPalette = [
  { id: 'rect',   shape: { type: 'Basic', shape: 'Rectangle' },  annotations: [{content:'Rectangle'}] },
  { id: 'circle', shape: { type: 'Basic', shape: 'Ellipse'   }, annotations: [{content:'Ellipse'}]  },
  { id: 'diamond',shape: { type: 'Basic', shape: 'Diamond'   },  annotations: [{content:'Diamond'}]   }
];
```

## Common Patterns

### Pattern 1: Themed Nodes by Category
```ts
function createNode(
  id: string,
  label: string,
  category: 'process' | 'decision' | 'data'
) {
  // Map category → Flow shape object + desired fill
  const styles = {
    process:  { fill: '#6BA5D7', shape: { type: 'Flow', shape: 'Process'  } },
    decision: { fill: '#FFD700', shape: { type: 'Flow', shape: 'Decision' } },
    data:     { fill: '#90EE90', shape: { type: 'Flow', shape: 'Data'     } }
  };

  const s = styles[category];
  return {
    id,
    offsetX: 250,
    offsetY: 250,
    width: 100,
    height: 60,
    shape: s.shape,
    style: { fill: s.fill },
    // Put text on annotations, not node.style
    annotations: [{ content: label }]
  } as NodeModel;
}
let nodes: NodeModel[] = [
  createNode('process','Process',"process"),
  createNode('decision','Decision',"decision"),
]
let diagram = new Diagram({
  width:1000, height:1000,
  nodes:nodes,
})
```

### Pattern 2: Conditional Styling
```ts
// Define the node with a normal (non-functional) style
let conditionalNode: NodeModel = {
  id: 'conditional',
  offsetX: 250,
  offsetY: 250,
  width: 100,
  height: 100,
  shape: { type: 'Basic', shape: 'Rectangle' },
  style: { fill: '#6BA5D7', strokeWidth: 2 }
};

let diagram = new Diagram({
  width:1000, height:1000,
  nodes:[conditionalNode],
  selectionChange : (args) => {
    if (args.state === 'Changed') {
      // If the node became selected
      for (const obj of args.newValue ?? []) {
        if (obj.id === 'conditional') {
          obj.style = { ...(obj.style || {}), fill: '#FF6B6B', strokeWidth: 3 };
        }
      }
      // If the node got deselected
      for (const obj of args.oldValue ?? []) {
        if (obj.id === 'conditional') {
          obj.style = { ...(obj.style || {}), fill: '#6BA5D7', strokeWidth: 2 };
        }
      }
      diagram.dataBind();
    }
  }
})
```

### Pattern 3: Gradient Fills
```ts
let gradientNode: NodeModel = {
  id: 'gradient',
  offsetX: 250,
  offsetY: 250,
  width: 100,
  height: 100,
  shape: { type: 'Basic', shape: 'Rectangle' },
  style: {
    // Prefer offsets in 0..1; omit 'fill' when using 'gradient'
    gradient: {
      type: 'Linear',
      x1: 0, y1: 0, x2: 100, y2: 100,
      stops: [
        { color: '#6BA5D7', offset: 0.0 },
        { color: '#003366', offset: 1.0 }
      ]
    }
  }
};
```

## Next Steps

- **Add Labels:** [labels-and-annotations.md](labels-and-annotations.md)
- **Connect Shapes:** [connectors-and-connections.md](connectors-and-connections.md)
- **Use in BPMN:** [bpmn-diagrams.md](bpmn-diagrams.md)
