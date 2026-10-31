# Diagram Settings

## Table of Contents

- [Overview](#overview)
- [Layers](#layers)
- [Virtualization](#virtualization)
- [Grid & Ruler](#grid--ruler)
- [Page Settings](#page-settings)
- [Tooltips](#tooltips)
- [Overview Panel](#overview-panel)
- [Scroll Settings](#scroll-settings)
- [Accessibility](#accessibility)

## Overview

Diagram settings fine-tune the canvas, appearance, and user experience. These features include performance optimization, visual guides, and accessibility options.

**Key Concepts:**
- **Layers** - Organize elements by z-order
- **Virtualization** - Render visible nodes only for performance
- **Grid/Ruler** - Visual alignment guides
- **Page Settings** - Canvas boundaries and orientation
- **Accessibility** - WCAG compliance and keyboard navigation

## Layers

### Layer Structure

```ts
import { Diagram, Layer } from '@syncfusion/ej2-diagrams';

let diagram = new Diagram({
  width: '100%',
  height: '600px',
  
  // Define layers
  layers: [
    {
      id: 'background',
      visible: true,
      lock: false,
      objects: ['bg_shape']
    },
    {
      id: 'content',
      visible: true,
      lock: false,
      objects: ['node1', 'node2']
    },
    {
      id: 'overlay',
      visible: true,
      lock: false,
      objects: ['annotation1']
    }
  ],
  
  nodes: [
    { id: 'bg_shape', offsetX: 300, offsetY: 300, width: 500, height: 400,
      shape: 'Rectangle', style: { fill: 'transparent', strokeColor: '#999' } },
    { id: 'node1', offsetX: 200, offsetY: 200, width: 100, height: 60 },
    { id: 'node2', offsetX: 400, offsetY: 200, width: 100, height: 60 },
    { id: 'annotation1', offsetX: 300, offsetY: 400, width: 200, height: 50 }
  ]
});

diagram.appendTo('#diagram');
```

### Layer Operations

```ts
let diagram = new Diagram({
  layers: [
    { id: 'layer1', visible: true, lock: false, objects: [] },
    { id: 'layer2', visible: true, lock: false, objects: [] }
  ]
});

// Add object to layer
diagram.addLayer('layer1', ['node1']);

// Remove object from layer
diagram.removeLayer('layer1', ['node1']);

// Show/hide layer
let layer = diagram.layers[0];
layer.visible = false; // visibility set as false to hide
layer.visible = true;  // visibility set as true to show

// Lock/unlock layer (prevent selection/edit)
let layer = diagram.layers[0];
layer.lock = true;  // Locked
diagram.layers = [layer];

// Get layer by ID
let foundLayer = diagram.layers.find(l => l.id === 'layer1');
console.log(foundLayer);
```

### Layer Visibility Control

```ts
// Toggle layer visibility
let toggleButton = document.createElement('button');
toggleButton.textContent = 'Toggle Layer 1';
toggleButton.onclick = () => {
  let layer = diagram.layers.find(l => l.id === 'layer1');
  if (layer) {
    layer.visible = !layer.visible;
    diagram.refreshDiagram();
  }
};
```

## Virtualization

### Enable Virtualization

```ts
import { Diagram, Virtualization } from '@syncfusion/ej2-diagrams';

Diagram.Inject(Virtualization);

let diagram = new Diagram({
  width: '100%',
  height: '600px',
  
  // Enable virtualization
  enableVirtualization: true,
  
  nodes: [
    // Large number of nodes (1000+)
    ...generateLargeNodeSet()
  ]
});

function generateLargeNodeSet() {
  let nodes = [];
  for (let i = 0; i < 1000; i++) {
    nodes.push({
      id: `node${i}`,
      offsetX: (i % 20) * 80 + 50,
      offsetY: Math.floor(i / 20) * 80 + 50,
      width: 60,
      height: 60,
      annotations: [{ content: `N${i}` }]
    });
  }
  return nodes;
}
```

### Virtualization Performance Impact

```ts
// Without virtualization: 1000 nodes = slow rendering
let slowDiagram = new Diagram({
  enableVirtualization: false,
  nodes: largeNodeSet
});

// With virtualization: Only visible nodes rendered = fast
let fastDiagram = new Diagram({
  enableVirtualization: true,
  nodes: largeNodeSet
});
```

## Grid & Ruler

### Grid Lines Configuration

```ts
import { Diagram, GridlinesModel } from '@syncfusion/ej2-diagrams';

let diagram = new Diagram({
  width: '100%',
  height: '600px',
  
  // Grid settings
  snapSettings: {
    constraints: SnapConstraints.ShowLines,
    horizontalGridlines: {
        // Sets the line color of gridlines
        lineColor: 'blue',
        // Defines the lineDashArray of gridlines
        lineDashArray: '2 2'
    },
    // Defines the verticalGridlines for SnapSettings
    verticalGridlines: {
        lineColor: 'blue',
        lineDashArray: '2 2'
    }
  }
});
```

### Ruler Configuration

```ts
let diagramWithRuler = new Diagram({
  width: '100%',
  height: '600px',
  
  // Show rulers
  showRulers: true,
  
  // Ruler settings
  rulerSettings: {
    showRulers: true,
    horizontalRuler: {
      segmentWidth: 100,
      thickness: 20,
      color: '#F0F0F0'
    },
    verticalRuler: {
      segmentWidth: 100,
      thickness: 20,
      color: '#F0F0F0'
    }
  }
});
```

### Grid Snap

```ts
let snapGrid = new Diagram({
  width: '100%',
  height: '600px',
  
  // Snap to grid
  snapSettings: {
    enableSnapToObject: true,
    constraints: SnapConstraints.SnapToGrid | SnapConstraints.SnapToObject,
    verticalGridlines: {
      lineColor: '#e6e6e6',
      lineIntervals: [1, 9, 0.25, 9.75],
      snapIntervals: [10]
    },
    horizontalGridlines: {
      lineColor: '#e6e6e6',
      lineIntervals: [1, 9, 0.25, 9.75],
      snapIntervals: [10]
    }
  }
});
```

## Page Settings

### Page Configuration

```ts
import { Diagram, PageSettings, PageOrientation } from '@syncfusion/ej2-diagrams';

let diagram = new Diagram({
  width: '100%',
  height: '600px',
  
  // Page settings
  pageSettings: {
    width: 800,
    height: 1100,
    
    // Margins
    margin: { left: 10, top: 10, bottom: 10 },
    
    // Orientation
    orientation: 'Portrait',

    // Background
    backgroundColor: '#FFFFFF'
  }
});
```

### Page Background & Orientation

```ts
let portraitPage = new Diagram({
  pageSettings: {
    width: 816,      // 8.5 inches at 96 DPI
    height: 1056,    // 11 inches at 96 DPI
    orientation: 'Portrait',
    backgroundColor: '#f5f5f5'
  }
});

let landscapePage = new Diagram({
  pageSettings: {
    width: 1056,
    height: 816,
    orientation: 'Landscape',
    backgroundColor: '#ffffff'
  }
});
```

## Tooltips

### Basic Tooltip

```ts
import { Diagram, DiagramTooltip } from '@syncfusion/ej2-diagrams';

Diagram.Inject(DiagramTooltip);

let diagram = new Diagram({
  width: '100%',
  height: '600px',
  
  // Tooltip settings
  constraints: DiagramConstraints.Default | DiagramConstraints.Tooltip,
  
  nodes: [
    { id: 'node1', offsetX: 250, offsetY: 250, width: 100, height: 60,
      tooltip: { content: 'Node 1: Important Step' } }
  ]
});
```

### Custom Tooltip Template

```ts
let customTooltip = new Diagram({
  tooltip: {
    content: (args) => {
      return `<div style="padding: 10px; background: lightblue;">
        <strong>${args.content.id}</strong><br/>
        Type: ${args.content.shape || 'Node'}
      </div>`;
    }
  }
});
```

### Tooltip alignments

```ts
let styledTooltip = new Diagram({
  tooltip: {
    content: (args) => `Tooltip for ${args.content.id}`,

    //Sets the alignment properties
    position: 'BottomRight',
    //Sets to show tooltip around the element
    relativeMode: 'Object',
  }
});
```

## Overview Panel

### Overview Control

```ts
import { Diagram, Overview } from '@syncfusion/ej2-diagrams';

Diagram.Inject(Overview);

let diagram = new Diagram({
  width: '100%',
  height: '600px',
  nodes: [
    { id: 'node1', offsetX: 100, offsetY: 100, width: 100, height: 60 },
    { id: 'node2', offsetX: 300, offsetY: 300, width: 100, height: 60 }
  ]
});

// Create overview panel
let overview = new Overview({
  sourceID: 'diagram'  // ID of diagram to preview
});

overview.appendTo('#overview');
```

### Overview Styling

```ts
// HTML - position overview panel
<div style="position: absolute; right: 0; top: 0; width: 200px; height: 200px; border: 1px solid #999;">
  <div id="overview"></div>
</div>

// TypeScript
let diagram = new Diagram({
  width: '100%',
  height: '600px',
  nodes: [/* nodes */]
});

let overview = new Overview({
  sourceID: 'diagram',
  width: '200px',
  height: '200px'
});

diagram.appendTo('#diagram');
overview.appendTo('#overview');
```

## Scroll Settings

### Scroll Configuration

```ts
import { Diagram, ScrollSettings } from '@syncfusion/ej2-diagrams';

let diagram = new Diagram({
  width: '100%',
  height: '600px',
  
  // Scroll settings
  scrollSettings: {
    minZoom: 0.5,        // Minimum zoom level
    maxZoom: 2,          // Maximum zoom level
    
    horizontalOffset : 0,
    verticalOffset : 0,

    //Enable autoScroll
    canAutoScroll: true,
    // Auto-scroll on drag
    autoScrollBorder: { left: 100, right: 100, top: 100, bottom: 100 },
  }
});
```

### Programmatic Scrolling

```ts
// Scroll to position
diagram.scroll(100, 200);

// Zoom in/out
diagram.zoom(1.2);  // Zoom by factor
diagram.zoomTo({ type: ZoomFitMode.FitToPage });

// Pan/auto-fit
diagram.fitToPage();
```

## Accessibility

### WCAG Compliance

```ts
import { Diagram, DiagramAccessibility } from '@syncfusion/ej2-diagrams';

let accessibleDiagram = new Diagram({
  width: '100%',
  height: '600px',
  
  // Accessibility features
  accessibility: {
    // Keyboard navigation
    enableKeyBoard: true,
    
    // Screen reader support
    ariaLabel: 'Organization chart diagram'
  },
  
  nodes: [
    { 
      id: 'node1',
      offsetX: 250,
      offsetY: 250,
      width: 100,
      height: 60,
      
      // Accessibility properties
      ariaLabel: 'CEO node',
      ariaDescription: 'Chief Executive Officer node'
    }
  ]
});
```

### Keyboard Navigation

```ts
let diagram = new Diagram({
  keyboardInteraction: {
    // Arrow keys to move selected node
    moveBy: 10,           // pixels per key press
    
    // Tab to select next element
    tabNavigation: true
  },
  
  // Keyboard shortcuts
  keyDown: (args) => {
    if (args.key === 'Delete') {
      diagram.delete();
    }
    if (args.key === 'Ctrl+S') {
      // Save diagram
      console.log('Save diagram');
    }
  }
});
```

### High Contrast Support

```ts
// Import high contrast theme
import '@syncfusion/ej2-diagrams/styles/highcontrast.css';

// Or apply dynamically
let diagram = new Diagram({
  theme: 'highcontrast',  // Or 'material', 'bootstrap'
  
  // Ensure sufficient color contrast
  nodes: [
    {
      id: 'node1',
      style: {
        fill: '#000000',
        strokeColor: '#FFFFFF',
        strokeWidth: 3
      }
    }
  ]
});
```

## Localization

### Multi-Language Support

```ts
import { Diagram, L10n } from '@syncfusion/ej2-diagrams';

// Define translations
L10n.load({
  'es': {
    'diagram': {
      'enterKey': 'Ingrese',
      'deleteKey': 'Eliminar',
      'save': 'Guardar'
    }
  },
  'fr': {
    'diagram': {
      'enterKey': 'Entrer',
      'deleteKey': 'Supprimer',
      'save': 'Enregistrer'
    }
  }
});

let diagram = new Diagram({
  locale: 'es'  // or 'fr', 'en' (default)
});
```

## Complete Example: Fully Configured Diagram

```ts
import { 
  Diagram, 
  Virtualization, 
  Overview,
  DiagramTooltip,
  ScrollSettings,
  PageSettings
} from '@syncfusion/ej2-diagrams';

Diagram.Inject(Virtualization, Overview, DiagramTooltip);

let diagram = new Diagram({
  width: '100%',
  height: '700px',
  
  // Layers
  layers: [
    { id: 'background', visible: true, lock: false, objects: [] },
    { id: 'content', visible: true, lock: false, objects: [] }
  ],
  
  // Virtualization for performance
  enableVirtualization: true,
  
  // Grid & Ruler
  snapSettings: {
    constraints: SnapConstraints.ShowLines,
    horizontalGridlines: {
      lineColor: '#e6e6e6',
      lineIntervals: [1, 9, 0.25, 9.75]
    },
    verticalGridlines: {
      lineColor: '#e6e6e6',
      lineIntervals: [1, 9, 0.25, 9.75]
    }
  }
  showRulers: true,
  
  // Page settings
  pageSettings: {
    width: 816,
    height: 1056,
    orientation: 'Portrait',
    backgroundColor: '#F5F5F5'
  },
  
  // Scroll settings
  scrollSettings: {
    minZoom: 0.5,
    maxZoom: 2,
    autoScroll: { left: true, right: true, top: true, bottom: true }
  },
  
  // Tooltip
  tooltip: {
    content: (args) => `${args.content.id}: ${args.content.shape}`
  },
  
  // Accessibility
  accessibility: {
    enableKeyBoard: true,
    ariaLabel: 'Diagram editor'
  },
  
  nodes: [
    { id: 'node1', offsetX: 250, offsetY: 100, width: 100, height: 60,
      annotations: [{ content: 'Start' }],
      tooltip: { content: 'Start node: begins process' } },
    { id: 'node2', offsetX: 250, offsetY: 250, width: 100, height: 60,
      annotations: [{ content: 'Process' }] },
    { id: 'node3', offsetX: 250, offsetY: 400, width: 100, height: 60,
      annotations: [{ content: 'End' }] }
  ],
  
  connectors: [
    { id: 'c1', sourceID: 'node1', targetID: 'node2', targetDecorator: { shape: 'Arrow' } },
    { id: 'c2', sourceID: 'node2', targetID: 'node3', targetDecorator: { shape: 'Arrow' } }
  ]
});

diagram.appendTo('#diagram');

// Overview panel
let overview = new Overview({
  sourceID: 'diagram'
});

overview.appendTo('#overview');
```

## Next Steps

- **Serialization & Export:** [serialization-and-export.md](serialization-and-export.md)
- **Advanced Features:** [advanced-features.md](advanced-features.md)
- **Getting Started:** [getting-started.md](getting-started.md)
