# Ports

## Table of Contents

- [Overview](#overview)
- [Port Basics](#port-basics)
- [Port Types](#port-types)
- [Port Positioning](#port-positioning)
- [Port Appearance](#port-appearance)
- [Connecting via Ports](#connecting-via-ports)
- [Port Interaction](#port-interaction)
- [Port Events](#port-events)

## Overview

Ports are specific connection points on nodes where connectors can attach. Instead of connecting connectors anywhere on a node's perimeter, ports define precise anchor points, making diagrams cleaner and more organized.

**Key Concepts:**
- **Port** - Specific attachment point on a node
- **Port Offset** - Position relative to node (0-1 scale)
- **Port Shape** - Visual indicator (circle, square, diamond)
- **Port Visibility** - When ports are visible (always, on hover, on select)

## Port Basics

### Creating Ports on a Node

```ts
import { Diagram, NodeModel, PortModel } from '@syncfusion/ej2-diagrams';

let nodeWithPorts: NodeModel = {
  id: 'node1',
  offsetX: 250,
  offsetY: 250,
  width: 100,
  height: 100,
  style: { fill: '#6BA5D7' },
  
  // Define ports
  ports: [
    {
      id: 'port1',
      shape: 'Circle',
      offset: { x: 0, y: 0.5 }    // Left side, middle
    },
    {
      id: 'port2',
      shape: 'Circle',
      offset: { x: 1, y: 0.5 }    // Right side, middle
    },
    {
      id: 'port3',
      shape: 'Circle',
      offset: { x: 0.5, y: 0 }    // Top, middle
    },
    {
      id: 'port4',
      shape: 'Circle',
      offset: { x: 0.5, y: 1 }    // Bottom, middle
    }
  ]
};

let diagram = new Diagram({
  nodes: [nodeWithPorts]
});

diagram.appendTo('#diagram');
```

### Standard Port Positions

```ts
// Four-directional ports (common for flowcharts)
let standardPorts = [
  { id: 'left', offset: { x: 0, y: 0.5 } },      // Left
  { id: 'right', offset: { x: 1, y: 0.5 } },     // Right
  { id: 'top', offset: { x: 0.5, y: 0 } },       // Top
  { id: 'bottom', offset: { x: 0.5, y: 1 } }     // Bottom
];

// Eight-directional ports (comprehensive coverage)
let comprehensivePorts = [
  { id: 'left', offset: { x: 0, y: 0.5 } },
  { id: 'right', offset: { x: 1, y: 0.5 } },
  { id: 'top', offset: { x: 0.5, y: 0 } },
  { id: 'bottom', offset: { x: 0.5, y: 1 } },
  { id: 'topLeft', offset: { x: 0, y: 0 } },
  { id: 'topRight', offset: { x: 1, y: 0 } },
  { id: 'bottomLeft', offset: { x: 0, y: 1 } },
  { id: 'bottomRight', offset: { x: 1, y: 1 } }
];
```

## Port Types

### Port Shapes

```ts
type PortShape = 'Circle' | 'Square' | 'Diamond' | 'X';

let shapedPorts = [
  {
    id: 'circle_port',
    shape: 'Circle',       // Circular port
    offset: { x: 0, y: 0.25 }
  },
  {
    id: 'square_port',
    shape: 'Square',       // Square port
    offset: { x: 0, y: 0.5 }
  },
  {
    id: 'diamond_port',
    shape: 'Diamond',      // Diamond port
    offset: { x: 0, y: 0.75 }
  },
  {
    id: 'x_port',
    shape: 'X',            // X-shaped port
    offset: { x: 1, y: 0.5 }
  }
];
```

### Port Visibility

```ts
// Port visibility settings
type PortVisibility = 
  | 'Visible'      // Always visible
  | 'Hidden'       // Never visible
  | 'Hover'        // Show on mouse hover
  | 'Connect';     // The port becomes visible when you hover the connector thumb over the DiagramElement where the port resides.

let visibilityPorts = [
  {
    id: 'always_visible',
    shape: 'Circle',
    offset: { x: 0, y: 0.5 },
    visibility: PortVisibility.Visible      // Always show
  },
  {
    id: 'hover_visible',
    shape: 'Circle',
    offset: { x: 1, y: 0.5 },
    visibility: PortVisibility.Hover        // Show on hover
  },
  {
    id: 'connect',
    shape: 'Circle',
    offset: { x: 0.5, y: 0 },
    visibility: PortVisibility.Connect        // Show on focus
  },
  {
    id: 'hidden',
    shape: 'Circle',
    offset: { x: 0.5, y: 1 },
    visibility: PortVisibility.Hidden       // Never show (still connectable)
  }
];
```

## Port Positioning

### Offset Coordinates

Ports use normalized coordinates (0-1 scale) where:
- `x: 0` = left edge, `x: 1` = right edge
- `y: 0` = top edge, `y: 1` = bottom edge
- `x: 0.5, y: 0.5` = center

```ts
let positionedPorts = [
  // Corners
  { id: 'topLeft', offset: { x: 0, y: 0 } },
  { id: 'topRight', offset: { x: 1, y: 0 } },
  { id: 'bottomLeft', offset: { x: 0, y: 1 } },
  { id: 'bottomRight', offset: { x: 1, y: 1 } },
  
  // Edges (middle)
  { id: 'leftMiddle', offset: { x: 0, y: 0.5 } },
  { id: 'rightMiddle', offset: { x: 1, y: 0.5 } },
  { id: 'topMiddle', offset: { x: 0.5, y: 0 } },
  { id: 'bottomMiddle', offset: { x: 0.5, y: 1 } },
  
  // Custom positions
  { id: 'custom1', offset: { x: 0.25, y: 0.25 } },
  { id: 'custom2', offset: { x: 0.75, y: 0.75 } }
];
```

### Node-Size Independence

Ports automatically scale with node size:

```ts
let resizableNode = {
  id: 'resizable',
  offsetX: 250,
  offsetY: 250,
  width: 100,
  height: 100,
  ports: [
    { id: 'port1', offset: { x: 0, y: 0.5 } }  // Always on left edge
  ]
};

// If node resizes to 200x200, port stays on left edge
// Positions are relative to node bounds, not absolute
```


## Port Appearance

### Styling Ports

```ts
import { PortModel } from '@syncfusion/ej2-diagrams';

let styledPort: PortModel = {
  id: 'styled',
  shape: 'Circle',
  offset: { x: 0, y: 0.5 },
  
  style: {
    fill: '#FF6B6B',           // Fill color
    strokeColor: '#8B0000',    // Border color
    strokeWidth: 2,            // Border width
    opacity: 0.8               // Transparency
  },
  
  width: 12,                   // Port size width
  height: 12,                  // Port size height
  
  visibility: PortVisibility.Visible
};
```

### Port Size

```ts
let ports = [
  {
    id: 'small',
    shape: 'Circle',
    offset: { x: 0, y: 0.25 },
    width: 8,                  // Small port
    height: 8
  },
  {
    id: 'medium',
    shape: 'Circle',
    offset: { x: 0, y: 0.5 },
    width: 12,                 // Medium port (default)
    height: 12
  },
  {
    id: 'large',
    shape: 'Circle',
    offset: { x: 0, y: 0.75 },
    width: 16,                 // Large port
    height: 16
  }
];
```

### Port Colors by Type

```ts
let coloredPorts = [
  {
    id: 'input',
    shape: 'Circle',
    offset: { x: 0, y: 0.5 },
    style: { fill: '#6BA5D7' }  // Blue for input
  },
  {
    id: 'output',
    shape: 'Circle',
    offset: { x: 1, y: 0.5 },
    style: { fill: '#90EE90' }  // Green for output
  },
  {
    id: 'control',
    shape: 'Square',
    offset: { x: 0.5, y: 1 },
    style: { fill: '#FFD700' }  // Yellow for control
  }
];
```

## Connecting via Ports

### Connect Connectors to Specific Ports

```ts
import { Diagram, ConnectorModel } from '@syncfusion/ej2-diagrams';

let nodes = [
  {
    id: 'node1',
    offsetX: 100,
    offsetY: 100,
    width: 100,
    height: 100,
    ports: [
      { id: 'port1', offset: { x: 1, y: 0.5 } }  // Right side
    ]
  },
  {
    id: 'node2',
    offsetX: 300,
    offsetY: 100,
    width: 100,
    height: 100,
    ports: [
      { id: 'port1', offset: { x: 0, y: 0.5 } }  // Left side
    ]
  }
];

let connectors: ConnectorModel[] = [
  {
    id: 'connector1',
    sourceID: 'node1',
    sourcePortID: 'port1',      // Connect from node1's port1
    targetID: 'node2',
    targetPortID: 'port1',      // To node2's port1
    targetDecorator: { shape: 'Arrow' }
  }
];

let diagram = new Diagram({
  nodes: nodes,
  connectors: connectors
});

diagram.appendTo('#diagram');
```

### Automatic Port Selection

Without specifying ports:
```ts
let connector = {
  id: 'connector1',
  sourceID: 'node1',           // Connects anywhere on node
  targetID: 'node2',           // Free connection point
  targetDecorator: { shape: 'Arrow' }
};
```

With ports:
```ts
let connector = {
  id: 'connector1',
  sourceID: 'node1',
  sourcePortID: 'output',      // Specific connection point
  targetID: 'node2',
  targetPortID: 'input',       // Specific connection point
  targetDecorator: { shape: 'Arrow' }
};
```

### Multiple Connectors to Same Port

```ts
let multipleConnectors = [
  {
    id: 'c1',
    sourceID: 'node1',
    sourcePortID: 'output',
    targetID: 'node2',
    targetPortID: 'input'
  },
  {
    id: 'c2',
    sourceID: 'node1',
    sourcePortID: 'output',    // Same port
    targetID: 'node3',
    targetPortID: 'input'
  }
];
```

## Port Interaction

### Port Highlighting

```ts
let diagram = new Diagram({
  nodes: [
    {
      id: 'node1',
      offsetX: 250,
      offsetY: 250,
      width: 100,
      height: 100,
      ports: [
        {
          id: 'port1',
          offset: { x: 1, y: 0.5 },
          style: { fill: '#6BA5D7' }
        }
      ]
    }
  ],

});
```

### Dragging from Ports

```ts
let diagram = new Diagram({
  // User can drag from ports to create connectors
  tool: DiagramTools.DrawOnce,
  
  // When user drags from a port
  connectionChange: (args) => {
    console.log('Connecting from port:', args.portName);
  }
});
```

### Port Constraints

```ts
import { PortConstraints } from '@syncfusion/ej2-diagrams';

let constrainedPort = {
  id: 'port1',
  offset: { x: 1, y: 0.5 },
  
  // Only outgoing connections allowed
  constraints: PortConstraints.OutConnect,
  // or
  // constraints: PortConstraints.InConnect,    // Only incoming
  // constraints: PortConstraints.Default    // Both directions
};
```

## Port Events

### Port Connection Events

```ts
let diagram = new Diagram({
  nodes: [/* nodes with ports */],
  connectors: [/* connectors */],
  
  // Before connector connects to port
  positionChange: (args) => {
    console.log('Position change');
  },
  
  // After connector connects to port
  connectionChange: (args) => {
    console.log('Connected to port:', args.target);
  },
  
  // Port interaction
  click: (args) => {
    console.log('clicked');
  }
});
```

### Port Visibility Toggle

```ts
let diagram = new Diagram({
  nodes: [
    {
      id: 'node1',
      offsetX: 250,
      offsetY: 250,
      width: 100,
      height: 100,
      ports: [
        {
          id: 'port1',
          offset: { x: 0, y: 0.5 },
          visibility: PortVisibility.Hover,
        }
      ]
    }
  ]
});

// Toggle port visibility
document.getElementById('togglePortsBtn').onclick = () => {
  let node = diagram.getObject('node1');
  
  node.ports.forEach(port => {
    port.visibility = port.visibility === PortVisibility.Visible ? PortVisibility.Hidden : PortVisibility.Visible;
  });
  
  diagram.dataBind();
};
```

## Complete Example: Ports in Action

```ts
import { Diagram, NodeModel, ConnectorModel, PortModel } from '@syncfusion/ej2-diagrams';

// Create nodes with ports
let nodes: NodeModel[] = [
  {
    id: 'input',
    offsetX: 100,
    offsetY: 150,
    width: 80,
    height: 60,
    shape: 'Rectangle',
    style: { fill: '#6BA5D7' },
    annotations: [{ content: 'Input' }],
    ports: [
      {
        id: 'output',
        shape: 'Circle',
        offset: { x: 1, y: 0.5 },
        style: { fill: '#90EE90' }
      }
    ]
  },
  {
    id: 'process',
    offsetX: 250,
    offsetY: 150,
    width: 80,
    height: 60,
    shape: 'Rectangle',
    style: { fill: '#FFD700' },
    annotations: [{ content: 'Process' }],
    ports: [
      {
        id: 'input',
        shape: 'Circle',
        offset: { x: 0, y: 0.5 },
        style: { fill: '#6BA5D7' }
      },
      {
        id: 'output',
        shape: 'Circle',
        offset: { x: 1, y: 0.5 },
        style: { fill: '#90EE90' }
      }
    ]
  },
  {
    id: 'output',
    offsetX: 400,
    offsetY: 150,
    width: 80,
    height: 60,
    shape: 'Rectangle',
    style: { fill: '#FF6B6B' },
    annotations: [{ content: 'Output' }],
    ports: [
      {
        id: 'input',
        shape: 'Circle',
        offset: { x: 0, y: 0.5 },
        style: { fill: '#6BA5D7' }
      }
    ]
  }
];

// Create connectors using ports
let connectors: ConnectorModel[] = [
  {
    id: 'c1',
    sourceID: 'input',
    sourcePortID: 'output',
    targetID: 'process',
    targetPortID: 'input',
    style: { strokeColor: '#0066CC' },
    targetDecorator: { shape: 'Arrow' }
  },
  {
    id: 'c2',
    sourceD: 'process',
    sourcePortID: 'output',
    targetID: 'output',
    targetPortID: 'input',
    style: { strokeColor: '#0066CC' },
    targetDecorator: { shape: 'Arrow' }
  }
];

let diagram = new Diagram({
  width: '100%',
  height: '400px',
  nodes: nodes,
  connectors: connectors
});

diagram.appendTo('#diagram');
```

## Common Patterns

### Pattern 1: Data Flow Diagram
```ts
// Input ports (blue) on left, output ports (green) on right
ports: [
  { id: 'in', shape: 'Circle', offset: { x: 0, y: 0.5 }, style: { fill: '#6BA5D7' } },
  { id: 'out', shape: 'Circle', offset: { x: 1, y: 0.5 }, style: { fill: '#90EE90' } }
]
```

### Pattern 2: Bus/Multi-Connection
```ts
// Multiple ports on one side for fan-out
ports: [
  { id: 'p1', offset: { x: 1, y: 0.2 } },
  { id: 'p2', offset: { x: 1, y: 0.5 } },
  { id: 'p3', offset: { x: 1, y: 0.8 } }
]
```

### Pattern 3: Control Nodes
```ts
// Cross shape for control points
ports: [
  { id: 'up', shape: 'X', offset: { x: 0.5, y: 0 } },
  { id: 'down', shape: 'X', offset: { x: 0.5, y: 1 } },
  { id: 'left', shape: 'X', offset: { x: 0, y: 0.5 } },
  { id: 'right', shape: 'X', offset: { x: 1, y: 0.5 } }
]
```

## Next Steps

- **Add Labels:** [labels-and-annotations.md](labels-and-annotations.md)
- **Customize Styling:** [styling-and-appearance.md](styling-and-appearance.md)
- **Handle Events:** [interaction-and-tools.md](interaction-and-tools.md)
