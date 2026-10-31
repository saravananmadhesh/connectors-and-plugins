# Labels & Annotations

## Table of Contents

- [Overview](#overview)
- [Node Annotations](#node-annotations)
- [Connector Annotations](#connector-annotations)
- [Label Appearance](#label-appearance)
- [Label Positioning](#label-positioning)
- [Label Interaction](#label-interaction)
- [Label Events](#label-events)
- [Editing Labels](#editing-labels)

## Overview

Labels are text annotations that appear on nodes and connectors, providing descriptive information. Every diagram element can have one or more labels with customizable appearance, position, and interactive behavior.

**Key Concepts:**
- **Annotation** - Text content with style properties
- **Node Labels** - Display inside or around nodes
- **Connector Labels** - Display along connector paths
- **Interactive Labels** - Allow editing, dragging, resizing by users

## Node Annotations

### Single Annotation

```ts
import { Diagram, NodeModel } from '@syncfusion/ej2-diagrams';

let node: NodeModel = {
  id: 'node1',
  offsetX: 250,
  offsetY: 250,
  width: 100,
  height: 100,
  style: { fill: '#6BA5D7' },
  
  // Single annotation
  annotations: [
    {
      content: 'Process',      // Label text
      style: {
        color: 'white',
        fontSize: 14,
        bold: true
      }
    }
  ]
};

let diagram = new Diagram({
  nodes: [node]
});

diagram.appendTo('#diagram');
```

### Multiple Annotations

```ts
let nodeWithMultipleLabels: NodeModel = {
  id: 'multi',
  offsetX: 250,
  offsetY: 250,
  width: 120,
  height: 100,
  style: { fill: '#6BA5D7' },
  
  annotations: [
    {
      content: 'Main Title',
      offset: { x: 0.5, y: 0.3 },  // Position within node
      style: {
        fontSize: 14,
        bold: true,
        color: 'white'
      }
    },
    {
      content: 'Subtitle',
      offset: { x: 0.5, y: 0.7 },
      style: {
        fontSize: 10,
        color: 'white'
      }
    }
  ]
};
```

### Dynamic Node Labels from Data

```ts
function getTemplate(obj: any) {
   let template = `${data},'return "<div>" + ${data.name} + "</div>"'`
}
let diagram = new Diagram({
  dataSourceSettings: {
    dataManager: employeeData,
    id: 'id',
    parentId: 'parentId',
    textField: 'name'  // Use 'name' field as label
  },
  
  getNodeDefaults: {
    width: 100,
    height: 60,
    style: { fill: '#6BA5D7' }
  },
  annotationTemplate: getTemplate.bind(this)
});
```

## Connector Annotations

### Single Label on Connector

```ts
let connector = {
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  style: { strokeColor: '#6BA5D7' },
  
  annotations: [
    {
      content: 'Flow',
      offset: 0.5,                 // 0 = start, 1 = end of connector
      alignment: 'Top',            // Position relative to line
      style: {
        color: '#000',
        fontSize: 12,
        fill: '#FFF',
        strokeColor: '#999'
      }
    }
  ]
};
```

### Multiple Connector Labels

```ts
let connectorWithLabels = {
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  type: 'Orthogonal',
  targetDecorator: { shape: 'Arrow' },
  
  annotations: [
    {
      content: 'Yes',
      offset: 0.25,
      alignment: 'Top',
      style: { fontSize: 10, color: '#006400', bold: true }
    },
    {
      content: 'Main Path',
      offset: 0.5,
      alignment: 'Top',
      style: { fontSize: 12, color: '#000', bold: true }
    },
    {
      content: '→',
      offset: 0.75,
      alignment: 'Bottom',
      style: { fontSize: 14, color: '#666' }
    }
  ]
};
```

### Conditional Connector Labels

```ts
let conditionalConnector = {
  id: 'decision_connector',
  sourceID: 'decision',
  targetID: 'nextNode',
  
  annotations: [
    {
      content: 'Yes',              // Condition result
      offset: 0.3,
      alignment: 'Top',
      style: {
        color: '#006400',
        fill: '#E0FFE0',
        bold: true
      }
    }
  ]
};
```

## Label Appearance

### Complete Styling Options

```ts
let styledLabel = {
  id: 'label1',
  content: 'Styled Label',
  
  style: {
    // Text styling
    color: '#000',                // Text color
    fontSize: 14,                 // Font size in pixels
    fontFamily: 'Arial',          // Font family
    bold: false,                  // Bold text
    italic: false,                // Italic text
    textDecoration: 'None',       // 'None' | 'Underline' | 'Overline' | 'LineThrough'
    textOverflow: 'Wrap',         // 'Wrap' | 'Ellipsis'
    textAlign: 'Center',          // 'Center' | 'Left' | 'Right'
    
    // Background styling
    fill: '#FFF',      // Background color
    opacity: 1,                   // Transparency (0-1)
    
    // Border styling
    strokeColor: '#999',
    strokeWidth: 1,
    
    // Margin and padding
    margin: { left: 5, right: 5, top: 5, bottom: 5 }
  }
};
```

### Font Families

```ts
const availableFonts = [
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Courier New',
  'Georgia',
  'Verdana',
  'Comic Sans MS',
  'Trebuchet MS',
  'Consolas'
];
```

### Color Combinations

```ts
// High contrast for accessibility
let accessibleLabel = {
  content: 'Accessible',
  style: {
    color: '#FFFFFF',              // White text
    fill: '#000000',    // Black background
    fontSize: 14,
    bold: true
  }
};

// Soft styling
let softLabel = {
  content: 'Soft',
  style: {
    color: '#666666',
    fill: '#F5F5F5',
    fontSize: 12,
    opacity: 0.9
  }
};

// Prominent styling
let prominentLabel = {
  content: 'Important',
  style: {
    color: '#FFFFFF',
    fill: '#FF6B6B',
    fontSize: 14,
    bold: true,
    strokeColor: '#8B0000',
    strokeWidth: 2
  }
};
```

## Label Positioning

### Node Label Positioning

```ts
let node = {
  id: 'positioned',
  offsetX: 250,
  offsetY: 250,
  width: 120,
  height: 100,
  
  annotations: [
    {
      content: 'Top Left',
      // Offset: 0 = left/top, 1 = right/bottom
      offset: { x: 0.1, y: 0.1 }
    },
    {
      content: 'Center',
      offset: { x: 0.5, y: 0.5 }  // Center of node
    },
    {
      content: 'Bottom Right',
      offset: { x: 0.9, y: 0.9 }
    }
  ]
};
```

### Connector Label Positioning

```ts
let connector = {
  id: 'positioned_connector',
  sourceID: 'node1',
  targetID: 'node2',
  
  annotations: [
    {
      content: 'Start',
      offset: 0.1,                 // 10% along connector
      alignment: 'Top'             // Above the line
    },
    {
      content: 'Middle',
      offset: 0.5,                 // Middle of connector
      alignment: 'Center'          // On the line
    },
    {
      content: 'End',
      offset: 0.9,                 // 90% along connector
      alignment: 'Bottom'          // Below the line
    }
  ]
};
```

### Alignment Options

```ts
// Connector label alignment
type ConnectorLabelAlignment = 
  | 'Top'
  | 'Center'
  | 'Bottom';

// Positioning relative to connector line
let alignedLabels = [
  { content: 'Top', alignment: 'Top', offset: 0.5 },          // Above line
  { content: 'Center', alignment: 'Center', offset: 0.5 },    // On line
  { content: 'Bottom', alignment: 'Bottom', offset: 0.5 }     // Below line
];
```

## Label Interaction

### Editable Labels

```ts
let diagram = new Diagram({
  nodes: [
    {
      id: 'editable',
      offsetX: 250,
      offsetY: 250,
      width: 100,
      height: 100,
      
      annotations: [
        {
          content: 'Double-click to edit',
          
          // Allow editing
          constraints: AnnotationConstraints.Default | 
                      AnnotationConstraints.Interaction
        }
      ]
    }
  ]
});
```

### Draggable Labels

```ts
import { AnnotationConstraints } from '@syncfusion/ej2-diagrams';

let draggableLabel = {
  content: 'Drag me',
  
  // Allow dragging label position
  constraints: AnnotationConstraints.Default | 
               AnnotationConstraints.Drag
};
```

### Resizable Labels

```ts
let resizableLabel = {
  content: 'Resize me to wrap text differently',
  
  // Allow resizing label bounds
  constraints: AnnotationConstraints.Default | 
               AnnotationConstraints.Resize
};
```

### Label with All Interactions

```ts
let interactiveLabel = {
  content: 'Interactive Label',
  
  constraints: 
    AnnotationConstraints.Default |
    AnnotationConstraints.Interaction |    // Can edit text
    AnnotationConstraints.Drag |     // Can drag
    AnnotationConstraints.Resize,      // Can resize
  
  style: {
    color: '#000',
    fontSize: 12
  }
};
```

## Label Events

### Label Editing Events

```ts
let diagram = new Diagram({
  // While editing
  textEdit: (args) => {
    console.log('Editing text:', args.newValue);
  },
});
```

### Label Interaction Events

```ts
let diagram = new Diagram({
  // Label selected
  selectionChange: (args) => {
    if (args.newValue && args.newValue.annotations) {
      console.log('Label selected');
    }
  },
  
  // Label moved/resized
  propertyChange: (args) => {
    if (args.cause === 'AnnotationPositionChange') {
      console.log('Label position changed');
    }
  },
  
  // Mouse hover on label
  mouseEnter: (args) => {
    console.log('Hovering annotation');
  }
});
```
## Editing Labels

### Enable Label Editing

```ts
let diagram = new Diagram({
  nodes: [
    {
      id: 'editable_node',
      offsetX: 250,
      offsetY: 250,
      width: 100,
      height: 100,
      
      annotations: [
        {
          content: 'Click to edit',
          
          // Enable editing
          constraints: AnnotationConstraints.Drag | 
                      AnnotationConstraints.Interaction
        }
      ]
    }
  ]
});

// User double-clicks label to edit
// Press Enter to confirm, Escape to cancel
```

### Programmatic Label Update

```ts
// Get node
let node = diagram.getObject('node1');

if (node && node.annotations.length > 0) {
  // Update label
  node.annotations[0].content = 'Updated Label';
  
  // Update style
  node.annotations[0].style.color = 'red';
  
  // Refresh diagram
  diagram.dataBind();
}
```

### Add Labels at Runtime

```ts
let node = diagram.getObject('node1');

// Add new annotation
let newLabel = {
  content: 'New Label',
  offset: { x: 0.5, y: 0.8 },
  style: { fontSize: 12, color: '#666' }
};

diagram.addLabels(diagram.nodes[0], newLabel);
diagram.dataBind();
```

### Remove Labels

```ts
let annotation = diagram.nodes[0].annotations;

// Remove specific annotation
diagram.removeLabels(diagram.nodes[0], annotation);

diagram.dataBind();
```

## Complete Example: Feature Flowchart with Labels

```ts
import { Diagram, NodeModel, ConnectorModel } from '@syncfusion/ej2-diagrams';

let nodes: NodeModel[] = [
  {
    id: 'start',
    offsetX: 200,
    offsetY: 100,
    width: 80,
    height: 60,
    shape: { type: 'Basic', shape: 'Ellipse' }
    style: { fill: '#90EE90' },
    annotations: [{
      content: 'Start',
      style: { fontSize: 12, bold: true }
    }]
  },
  {
    id: 'process',
    offsetX: 200,
    offsetY: 220,
    width: 100,
    height: 60,
    shape: 'Rectangle',
    style: { fill: '#6BA5D7' },
    annotations: [{
      content: 'Process Data',
      style: { color: 'white', fontSize: 12, bold: true }
    }]
  },
  {
    id: 'decision',
    offsetX: 200,
    offsetY: 340,
    width: 80,
    height: 80,
    shape: 'Diamond',
    style: { fill: '#FFD700' },
    annotations: [{
      content: 'Valid?',
      style: { fontSize: 12, bold: true }
    }]
  },
  {
    id: 'end',
    offsetX: 200,
    offsetY: 480,
    width: 80,
    height: 60,
    shape: 'Ellipse',
    style: { fill: '#FF6B6B' },
    annotations: [{
      content: 'End',
      style: { fontSize: 12, bold: true, color: 'white' }
    }]
  }
];

let connectors: ConnectorModel[] = [
  {
    id: 'c1',
    sourceID: 'start',
    targetID: 'process',
    targetDecorator: { shape: 'Arrow' },
    annotations: [{ content: 'Execute', offset: 0.3, alignment: 'Top' }]
  },
  {
    id: 'c2',
    sourceID: 'process',
    targetID: 'decision',
    targetDecorator: { shape: 'Arrow' },
    annotations: [{ content: 'Check', offset: 0.3, alignment: 'Top' }]
  },
  {
    id: 'c3',
    sourceID: 'decision',
    targetID: 'end',
    targetDecorator: { shape: 'Arrow' },
    annotations: [{ content: 'Yes', offset: 0.3, alignment: 'Top', 
                   style: { fill: '#E0FFE0' } }]
  }
];

let diagram = new Diagram({
  width: '100%',
  height: '600px',
  nodes: nodes,
  connectors: connectors
});

diagram.appendTo('#diagram');
```

## Common Patterns

### Pattern 1: Decision Labels
```ts
annotation: {
  content: 'Yes/No',
  style: { color: '#006400', bold: true, fontSize: 11 }
}
```

### Pattern 2: Data Flow Labels
```ts
annotation: {
  content: 'Data: JSON',
  style: { fill: '#E3F2FD', fontSize: 10 }
}
```

### Pattern 3: Status Labels
```ts
annotation: {
  content: 'Processing',
  style: { color: '#FF9800', fontSize: 12, bold: true }
}
```

## Next Steps

- **Interact with Diagram:** [interaction-and-tools.md](interaction-and-tools.md)
- **Style Everything:** [styling-and-appearance.md](styling-and-appearance.md)
- **Export Diagrams:** [advanced-features.md](advanced-features.md)
