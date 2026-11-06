# Groups & Containers

## Overview

Grouping allows you to combine multiple nodes and connectors into a single unit that can be moved, resized, and styled together. Containers provide nesting capabilities for hierarchical diagram structures.

**Key Concepts:**
- **Grouping** - Combine nodes and connectors
- **Containers** - Parent nodes with children
- **Nesting** - Multiple levels of grouping
- **Padding** - Space between container and children

## Creating Groups

### Basic Grouping

```ts
import { Diagram, NodeModel, connectorModel } from '@syncfusion/ej2-diagrams';

// Create individual nodes
let nodes: NodeModel[] = [
  { id: 'node1', offsetX: 100, offsetY: 100, width: 80, height: 60 },
  { id: 'node2', offsetX: 200, offsetY: 100, width: 80, height: 60 },
  { id: 'node3', offsetX: 150, offsetY: 200, width: 80, height: 60 }
];
let connectors:connectorModel[] = [
      { id: 'c1', sourceID: 'node1', targetID: 'node3' },
      { id: 'c2', sourceID: 'node2', targetID: 'node3' }
    ];
let diagram = new Diagram({
  nodes: nodes, connectors = connectors,
  
  // Select and group nodes at runtime
  created: () => {
    // Group the nodes
    diagram.group(['node1', 'node2', 'node3']);
  }
});
```

### Programmatic Grouping

```ts
// Group multiple elements
diagram.group(['id1', 'id2', 'id3', 'connectorId']);

// Ungroup
diagram.ungroup();

// Check if selected is a group
if (diagram.selectedItems.nodes.length > 1 || 
    diagram.selectedItems.connectors.length > 0) {
  console.log('Multiple elements selected - can group');
}
```

## Container Nodes

### Creating Containers

```ts
import { Diagram, NodeModel } from '@syncfusion/ej2-diagrams';

// Define child nodes first
let nodes: NodeModel[] = [
  {
    id: 'node1',
    margin: { left: 50, top: 30 },
    width: 100,
    height: 100,
    style: { fill: 'white', strokeColor: '#2546BB', strokeWidth: 1 },
    annotations: [{ content: 'Node 1' }]
  },
  {
    id: 'node2',
    margin: { left: 200, top: 130 },
    width: 100,
    height: 100,
    style: { fill: 'white', strokeColor: '#2546BB', strokeWidth: 1 },
    annotations: [{ content: 'Node 2' }]
  },
  // Container node with header
  {
    id: 'container',
    width: 350,
    height: 300,
    offsetX: 250,
    offsetY: 250,
    shape: {
      type: 'Container',                // Container type
      // Define header for container
      header: {
        annotation: {
          content: 'Container Title',
          style: { fontSize: 18, bold: true, color: 'white' }
        },
        height: 40,
        style: { fill: '#3c63ac', strokeColor: '#30518f' }
      },
      children: ['node1', 'node2']      // Children of container
    },
    style: { fill: '#E9EEFF', strokeColor: '#2546BB', strokeWidth: 1 }
  }
];

let diagram = new Diagram({
  width: '100%',
  height: '600px',
  nodes: nodes
});

diagram.appendTo('#diagram');
```

### Container without Header

For simple containers without headers, you can omit the header property:

```ts
let simpleContainer: NodeModel = {
  id: 'simpleContainer',
  width: 350,
  height: 280,
  offsetX: 250,
  offsetY: 250,
  shape: {
    type: 'Container',
    children: ['node1', 'node2']      // Just children, no header
  },
  style: { fill: 'white', strokeColor: '#30518f', strokeDashArray: '4 4' }
};
```

### Container with Fixed Size

```ts
let fixedContainer: NodeModel = {
  id: 'container',
  width: 300,
  height: 200,
  offsetX: 300,
  offsetY: 300,
  
  shape: {
    type: 'Container',
    header: {
      annotation: { content: 'Fixed Container' },
      height: 30,
      style: { fill: '#6BA5D7' }
    },
    children: ['child1', 'child2']
  },
  
  // Fixed dimensions
  minWidth: 300,
  maxWidth: 300,
  minHeight: 200,
  maxHeight: 200,
  
  style: { fill: '#F5F5F5', strokeColor: '#6BA5D7' }
};
```

### Canvas Container

```ts
let canvasContainer = {
  id: 'canvas',
  offsetX: 250,
  offsetY: 250,
  width: 400,
  height: 300,
  
  shape: 'Rectangle',
  container: {
    type: 'Canvas'                   // Free positioning of children
  },
  
  children: ['child1', 'child2', 'child3']
};

// Children can be positioned freely within container
let canvasChildren = [
  { id: 'child1', offsetX: 100, offsetY: 100, width: 80, height: 60 },
  { id: 'child2', offsetX: 200, offsetY: 80, width: 80, height: 60 },
  { id: 'child3', offsetX: 150, offsetY: 200, width: 80, height: 60 }
];
```

### Grid Container

```ts
import { Diagram, NodeModel } from '@syncfusion/ej2-diagrams';

// Level 3: Leaf nodes (must be defined first)
let leafNodes: NodeModel[] = [
  { id: 'leaf1', offsetX: 200, offsetY: 180, width: 60, height: 40, 
    annotations: [{ content: 'Leaf 1' }] },
  { id: 'leaf2', offsetX: 300, offsetY: 180, width: 60, height: 40, 
    annotations: [{ content: 'Leaf 2' }] },
  { id: 'leaf3', offsetX: 350, offsetY: 180, width: 60, height: 40, 
    annotations: [{ content: 'Leaf 3' }] },
  { id: 'leaf4', offsetX: 450, offsetY: 180, width: 60, height: 40, 
    annotations: [{ content: 'Leaf 4' }] }
];

// Level 2: Child groups (defined before parent)
let childGroup1: NodeModel = {
  id: 'group1',
  children: ['leaf1', 'leaf2'],
  padding: { left: 20, right: 20, top: 20, bottom: 20 },
  style: { fill: '#FFE6E6', strokeColor: '#CC0000', strokeWidth: 1 }
};

let childGroup2: NodeModel = {
  id: 'group2',
  children: ['leaf3', 'leaf4'],
  padding: { left: 20, right: 20, top: 20, bottom: 20 },
  style: { fill: '#E6FFE6', strokeColor: '#00CC00', strokeWidth: 1 }
};

// Level 1: Parent group (contains child groups)
let parentGroup: NodeModel = {
  id: 'group3',
  children: ['group1', 'group2'],
  padding: { left: 20, right: 20, top: 20, bottom: 20 },
  style: { fill: 'yellow', strokeColor: '#003366', strokeWidth: 2 }
};

// Create diagram with all nodes
let diagram = new Diagram({
  width: '100%',
  height: '900px',
  nodes: [leafNodes, childGroup1, childGroup2, parentGroup]
});

diagram.appendTo('#diagram');
```

## Container Padding

### Padding Configuration

```ts
import { Diagram, NodeModel } from '@syncfusion/ej2-diagrams';

let nodes: NodeModel[] = [
  { id: 'node1', offsetX: 100, offsetY: 100, width: 100, height: 100, 
    annotations: [{ content: 'Node1' }] },
  { id: 'node2', offsetX: 200, offsetY: 200, width: 100, height: 100, 
    annotations: [{ content: 'Node2' }] },
  { id: 'node3', offsetX: 300, offsetY: 300, width: 100, height: 100, 
    annotations: [{ content: 'Node3' }] },
  
  // Group with padding
  {
    id: 'group',
    children: ['node1', 'node2', 'node3'],
    
    // Individual padding values
    padding: {
      top: 20,
      left: 20,
      right: 20,
      bottom: 20
    }
  }
];

let diagram = new Diagram({
  width: '100%',
  height: '900px',
  nodes: nodes
});

diagram.appendTo('#diagram');
```

### Padding Effects

The padding property creates space between the group boundary and its children:

```ts
// Group with asymmetric padding
let groupWithPadding: NodeModel = {
  id: 'group',
  children: ['child1', 'child2'],
  
  // Different padding on each side
  padding: {
    top: 20,
    left: 30,
    right: 20,
    bottom: 30
  },
  
  style: {
    strokeColor: '#6BA5D7',
    strokeWidth: 2,
    strokeDashArray: '5 5'
  }
};
```

## Styling Groups and Containers

### Group Styling

```ts
import { Diagram, NodeModel } from '@syncfusion/ej2-diagrams';

// Transparent group (logical grouping only)
let transparentGroup: NodeModel = {
  id: 'transparentGroup',
  children: ['node1', 'node2'],
  style: { 
    fill: 'transparent', 
    strokeColor: '#999',
    strokeDashArray: '4 4'
  }
};

// Colored group with visual boundary
let styledGroup: NodeModel = {
  id: 'styledGroup',
  children: ['node3', 'node4'],
  
  padding: { left: 10, right: 10, top: 10, bottom: 10 },
  
  style: {
    fill: '#F0F0F0',
    strokeColor: '#0066CC',
    strokeWidth: 2
  }
};
```

### Container Styling with Header

```ts
// Container with styled header and body
let styledContainer: NodeModel = {
  id: 'styledContainer',
  offsetX: 300,
  offsetY: 300,
  width: 400,
  height: 300,
  
  shape: {
    type: 'Container',
    
    // Styled header
    header: {
      annotation: {
        content: 'System Boundary',
        style: { fontSize: 14, bold: true, color: 'white' }
      },
      height: 40,
      style: { fill: '#0066CC', strokeColor: '#004080' }
    },
    
    children: ['child1', 'child2']
  },
  
  // Container body style
  style: {
    fill: '#F5F5F5',
    strokeColor: '#0066CC',
    strokeWidth: 2
  }
};
```

## Common Patterns

### Pattern 1: Component Groups
```ts
import { Diagram, NodeModel } from '@syncfusion/ej2-diagrams';

// Group related components
let componentGroup: NodeModel = {
  id: 'db_component',
  children: ['database', 'connection', 'query'],
  padding: { left: 15, right: 15, top: 15, bottom: 15 },
  style: {
    fill: '#E6F3FF',
    strokeColor: '#0066CC',
    strokeWidth: 2
  }
};
```

### Pattern 2: Interactive Container with Header
```ts
// Container with header for interactive use
let interactiveContainer: NodeModel = {
  id: 'interactiveContainer',
  offsetX: 300,
  offsetY: 300,
  width: 400,
  height: 250,
  
  shape: {
    type: 'Container',
    header: {
      annotation: {
        content: 'Database Layer',
        style: { fontSize: 16, bold: true, color: 'white' }
      },
      height: 35,
      style: { fill: '#0066CC', strokeColor: '#004080' }
    },
    children: ['database', 'connection', 'query']
  },
  
  style: {
    fill: 'white',
    strokeColor: '#0066CC',
    strokeWidth: 1
  }
};
```

### Pattern 3: System Boundary Container
```ts
// Visual boundary for system scope
let systemBoundary: NodeModel = {
  id: 'system',
  offsetX: 500,
  offsetY: 400,
  width: 600,
  height: 450,
  
  shape: {
    type: 'Container',
    
    // Header for system boundary
    header: {
      annotation: {
        content: 'System Boundary',
        style: { fontSize: 14, bold: true, color: '#000' }
      },
      height: 35,
      style: { fill: 'transparent', strokeColor: '#000', strokeWidth: 2 }
    },
    
    children: ['app', 'service', 'database']
  },
  
  style: {
    fill: 'transparent',
    strokeColor: '#000',
    strokeWidth: 2,
    strokeDashArray: '8 4'
  }
};
```

## Next Steps

- **Symbol Palette:** [symbol-palette.md](symbol-palette.md)
- **Swimlanes:** [swimlanes.md](swimlanes.md)
- **Advanced Features:** [advanced-features.md](advanced-features.md)
