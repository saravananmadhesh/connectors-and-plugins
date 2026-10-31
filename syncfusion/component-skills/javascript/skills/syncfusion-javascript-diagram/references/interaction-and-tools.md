# Interaction & Tools

## Table of Contents

- [Overview](#overview)
- [Drawing Tools](#drawing-tools)
- [Selection & Manipulation](#selection--manipulation)
- [Pan & Zoom](#pan--zoom)
- [User Constraints](#user-constraints)
- [Event Handling](#event-handling)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Custom Interactions](#custom-interactions)

## Overview

Diagram provides rich interaction features that allow users to:
- Draw and create nodes/connectors
- Select and manipulate elements
- Navigate the diagram (pan, zoom)
- Respond to user actions with events
- Constrain what users can do

## Drawing Tools

### Enable Drawing Tools

```ts
import { Diagram, DiagramTools } from '@syncfusion/ej2-diagrams';

Diagram.Inject(DiagramTools);

let diagram = new Diagram({
  width: '100%',
  height: '600px',
  
  // Enable all tools
  tool: DiagramTools.DrawOnce,  // Draw single element then disconnect
  // or
  tool: DiagramTools.ContinuesDraw  // Keep drawing multiple elements
});

diagram.appendTo('#diagram');
```

### Tool Types

```ts
import { DiagramTools } from '@syncfusion/ej2-diagrams';

// Available tools
type DiagramToolsType = 
  | DiagramTools.SingleSelect      // Select single element
  | DiagramTools.MultipleSelect    // Select multiple elements
  | DiagramTools.DrawOnce          // Draw one element
  | DiagramTools.ContinuesDraw     // Draw multiple elements
  | DiagramTools.ZoomPan           // Pan and zoom
  | DiagramTools.None;             // Disable all tools

let diagram = new Diagram({
  tool: DiagramTools.DrawOnce | DiagramTools.MultipleSelect  // Combine tools
});
```

### Drawing Specific Shapes

```ts
// Configure drawing tool to create specific node types
let diagram = new Diagram({
  tool: DiagramTools.DrawOnce,
  
 // Define what gets drawn
  drawingObject: {
    width: 100,
    height: 100,
    shape: { type: 'Basic', shape: 'Rectangle' },
    style: { fill: '#6BA5D7' }
  }
});
```

### Drawing Connectors

```ts
// Allow users to draw connectors between nodes
let diagram = new Diagram({
  tool: DiagramTools.DrawOnce,
  
  // Connector template for drawing
  drawingObject: {
    type: 'Orthogonal',
    style: { strokeColor: '#6BA5D7' },
    targetDecorator: { shape: 'Arrow' }
  }
});
```

## Selection & Manipulation

### Selection Modes

```ts
let diagram = new Diagram({
  // Allow clicking to select
  tool: DiagramTools.SingleSelect | DiagramTools.MultipleSelect,
});

// Get selected items
let selectedNodes = diagram.selectedItems.nodes;
let selectedConnectors = diagram.selectedItems.connectors;

console.log('Selected:', selectedNodes, selectedConnectors);
```

### Programmatic Selection

```ts
// Select specific node
diagram.select([diagram.getObject('node1')]);

// Select multiple
diagram.select([
  diagram.getObject('node1'),
  diagram.getObject('node2'),
  diagram.getObject('connector1')
]);

// Clear selection
diagram.clearSelection();

// Select all
diagram.selectAll();
```

### Drag-Drop Support

```ts
let diagram = new Diagram({
  // Enable dragging nodes
  tool: DiagramTools.SingleSelect,
  
  // Constrain drag area
  pageSettings: {
    // Allow dragging only within bounds
    boundaryConstraints: 'Diagram'
  }
});

// Handle drag events
diagram.dragEnter = (args) => {
  console.log('Dragging node into area');
};

diagram.dragLeave = (args) => {
  console.log('Dragging node out of area');
};

diagram.drop = (args) => {
  console.log('Node dropped at', args.position);
};
```

## Pan & Zoom

### Zoom Levels

```ts
let diagram = new Diagram({
  // Initial scroll settings
  scrollSettings: {
    currentZoom: 1.0,           // 1 = 100% zoom
    minZoom: 0.5,               // Minimum: 50%
    maxZoom: 3.0,               // Maximum: 300%
  }
});

// Change zoom programmatically
diagram.zoom(1.5);              // Set to 150%

// Zoom in/out
diagram.zoom(diagram.scrollSettings.currentZoom * 1.2);  // Zoom in 20%
diagram.zoom(diagram.scrollSettings.currentZoom * 0.8);  // Zoom out 20%

// Fit to page
diagram.fitToPage();
```

### Pan Control

```ts
// Pan with scrollbars
let diagram = new Diagram({
  scrollSettings: {
    horizontalOffset: 100,      // Horizontal scroll position
    verticalOffset: 100,        // Vertical scroll position
    scrollLimit: 'Diagram',     // 'Diagram' | 'Page'
  }
  //Activate zoom pan tool
  tool: DiagramTools.ZoomPan,
});

```

### Zoom Controls via Buttons

```html
<button id="zoomInBtn">Zoom In</button>
<button id="zoomOutBtn">Zoom Out</button>
<button id="fitPageBtn">Fit Page</button>
<div id="diagram"></div>
```

```ts
let diagram = new Diagram({
  width: '100%',
  height: '600px'
});

diagram.appendTo('#diagram');

// Zoom In
document.getElementById('zoomInBtn').onclick = () => {
  diagram.zoom(diagram.scrollSettings.currentZoom * 1.2);
};

// Zoom Out
document.getElementById('zoomOutBtn').onclick = () => {
  diagram.zoom(diagram.scrollSettings.currentZoom * 0.8);
};

// Fit Page
document.getElementById('fitPageBtn').onclick = () => {
  diagram.fitToPage();
};
```

## User Constraints

### Restrict User Actions

```ts
let diagram = new Diagram({
  // Disable editing
  constraints: DiagramConstraints.Default & ~DiagramConstraints.UserInteraction,
  
  // Allow only viewing
  // constraints: DiagramConstraints.ReadOnly
});
```

### Node Constraints

```ts
import { NodeConstraints } from '@syncfusion/ej2-diagrams';

let nodes = [
  {
    id: 'locked',
    offsetX: 100,
    offsetY: 100,
    width: 100,
    height: 60,
    constraints: NodeConstraints.Default & ~NodeConstraints.Drag  // Cannot drag
  },
  {
    id: 'readonly',
    offsetX: 250,
    offsetY: 100,
    width: 100,
    height: 60,
    constraints: NodeConstraints.ReadOnly  // Cannot interact
  },
  {
    id: 'selectable',
    offsetX: 400,
    offsetY: 100,
    width: 100,
    height: 60,
    constraints: NodeConstraints.Default & ~NodeConstraints.Delete  // Cannot delete
  }
];
```

### Connector Constraints

```ts
import { ConnectorConstraints } from '@syncfusion/ej2-diagrams';

let connectors = [
  {
    id: 'fixed',
    sourcePoint: { x: 100, y: 100 },
    targetPoint: { x: 200, y: 200 },
    constraints: ConnectorConstraints.Default & ~ConnectorConstraints.Drag  // Cannot drag
  },
  {
    id: 'locked',
    sourcePoint: { x: 300, y: 100 },
    targetPoint: { x: 400, y: 200 },
    constraints: ConnectorConstraints.ReadOnly  // Locked
  }
];
```

## Event Handling

### Common Events

```ts
let diagram = new Diagram({
  // Diagram loaded
  created: () => {
    console.log('Diagram initialized');
  },
  
  // Before node creation
  collectionChange: (args) => {
    if (args.state === 'Changed') {
      console.log('Elements changed:', args.cause);
    }
  },
  
  // Node/Connector selected
  selectionChange: (args) => {
    console.log('Selected:', args.newValue);
  },
  
  // Element double-clicked
  doubleClick: (args) => {
    console.log('Double-clicked:', args.element);
  },
  
  // Mouse hover
  mouseEnter: (args) => {
    console.log('Entering element:', args.element);
  },
  
  mouseLeave: (args) => {
    console.log('Leaving element:', args.element);
  }
});
```

### Node/Connector Events

```ts
let diagram = new Diagram({
  // Node specific
  selectionChange: (args) => {
     if(args.state === 'Changed'){
      console.log('Selection Change');
    }
  },
  
  positionChange: (args) => {
    if(args.state === 'Completed'){
      console.log('Position Change');
    }
  },
  
  // Connector specific
  sourcePointChange: (args) => {
     console.log('sourcePointChange');
  },
  
  targetPointChange: (args) => {
    console.log('targetPointChange');
  },
  
  // Property changes
  propertyChange: (args) => {
    console.log('Property changed:', args.cause);
  }
});
```

## Keyboard Shortcuts

### Built-in Shortcuts

| Key | Action |
|-----|--------|
| `Delete` | Delete selected elements |
| `Ctrl+A` | Select all |
| `Ctrl+C` | Copy |
| `Ctrl+V` | Paste |
| `Ctrl+Z` | Undo |
| `Ctrl+Y` | Redo |
| `Ctrl+X` | Cut |
| `Arrow Keys` | Move selected element |
| `Ctrl+Plus` | Zoom in |
| `Ctrl+Minus` | Zoom out |

### Custom Keyboard Events

```ts
let diagram = new Diagram({
  keyDown: (args) => {
    if (args.keyCode === 'Delete') {
      console.log('Delete pressed');
    }
    if (args.keyCode === 'Space') {
      console.log('Space pressed');
      diagram.fitToPage();
    }
  }
});
```

## Custom Interactions

### Custom Context Menu

```ts
let diagram = new Diagram({
  // Enable context menu
  contextMenuSettings: {
    show: true,
    items: [
      'Copy',
      'Paste',
      'Delete',
      { text: 'Custom Action', id: 'custom' }
    ]
  },
  
  // Handle context menu click
  contextMenuClick: (args) => {
    if (args.id === 'custom') {
      console.log('Custom action clicked');
    }
  }
});
```

### Custom Tools Bar

```ts
let diagram = new Diagram({
  created: () => {
    // Add custom buttons after diagram loads
    let toolbar = document.createElement('div');
    toolbar.style.cssText = 'padding: 10px; background: #f0f0f0;';
    
    let btnDraw = document.createElement('button');
    btnDraw.textContent = 'Draw Shape';
    btnDraw.onclick = () => {
      diagram.drawingObject = {
        id: 'shape' + Date.now(),
        width: 100,
        height: 100,
        shape: 'Rectangle'
      };
      diagram.tool = DiagramTools.DrawOnce;
    };
    
    toolbar.appendChild(btnDraw);
    document.getElementById('diagram')?.parentElement?.insertBefore(toolbar, diagram.element);
  }
});
```

## Complete Example: Interactive Diagram

```ts
import { Diagram, DiagramTools, NodeConstraints } from '@syncfusion/ej2-diagrams';

let diagram = new Diagram({
  width: '100%',
  height: '600px',
  
  // Enable interactions
  tool: DiagramTools.SingleSelect | DiagramTools.MultipleSelect | DiagramTools.ZoomPan,
  
  // Initial nodes
  nodes: [
    {
      id: 'node1',
      offsetX: 100,
      offsetY: 100,
      width: 100,
      height: 60,
      annotations: [{ content: 'Draggable' }]
    }
  ],
  
  // Scroll settings
  scrollSettings: {
    minZoom: 0.5,
    maxZoom: 3.0,
    enableAutoScroll: true
  },
  
  // Event handling
  selectionChange: (args) => {
    console.log('Selected items:', args.newValue);
  },
  
  keyDown: (args) => {
    if (args.keyCode === 'Delete') {
      diagram.remove(diagram.selectedItems.nodes[0]);
    }
  }
});

diagram.appendTo('#diagram');
```

## Next Steps

- **Style Everything:** [styling-and-appearance.md](styling-and-appearance.md)
- **Advanced Features:** [advanced-features.md](advanced-features.md)
- **Export Diagrams:** [advanced-features.md](advanced-features.md#export)
