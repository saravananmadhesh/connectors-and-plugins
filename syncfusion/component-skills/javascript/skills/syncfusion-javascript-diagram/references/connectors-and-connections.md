# Connectors & Connections

## Table of Contents

- [Overview](#overview)
- [Creating Connectors](#creating-connectors)
- [Connection Types](#connection-types)
- [Connector Routing](#connector-routing)
- [Connector Styling](#connector-styling)
- [Decorators (Arrows)](#decorators-arrows)
- [Labels on Connectors](#labels-on-connectors)
- [Ports](#ports)
- [Adding/Removing Connectors](#addingremoving-connectors)

## Overview

Connectors are lines that link nodes together, representing relationships or flows in a diagram. Each connector consists of:
- **Source & Target** - Starting and ending nodes or points
- **Path Type** - How the line is drawn (straight, orthogonal, curved)
- **Styling** - Color, width, dash pattern
- **Decorators** - Arrows or symbols at endpoints
- **Labels** - Text annotations on the line

## Creating Connectors

### Basic Connector Between Points

```ts
import { Diagram, ConnectorModel } from '@syncfusion/ej2-diagrams';

let connector: ConnectorModel = {
  id: 'connector1',
  // Connect from point to point
  sourcePoint: { x: 100, y: 100 },
  targetPoint: { x: 200, y: 200 },
  type: 'Straight'
};

let diagram = new Diagram({
  width: '100%',
  height: '600px',
  connectors: [connector]
});

diagram.appendTo('#diagram');
```

### Connector Between Nodes

```ts
let connector: ConnectorModel = {
  id: 'connector1',
  sourceID: 'node1',      // Connect from node1
  targetID: 'node2',      // Connect to node2
  type: 'Straight'
};
```

### Basic Example

```ts
let nodes: NodeModel[] = [
  { id: 'node1', offsetX: 100, offsetY: 100, width: 80, height: 60 },
  { id: 'node2', offsetX: 300, offsetY: 100, width: 80, height: 60 }
];

let connectors: ConnectorModel[] = [
  {
    id: 'connector1',
    sourceID: 'node1',
    targetID: 'node2',
    style: {
      strokeColor: '#6BA5D7',
      strokeWidth: 2
    },
    targetDecorator: {
      shape: 'Arrow',
      style: { fill: '#6BA5D7' }
    }
  }
];

let diagram = new Diagram({
  nodes: nodes,
  connectors: connectors
});

diagram.appendTo('#diagram');
```

## Connection Types

### Straight Line

Direct path between source and target:

```ts
let connector: ConnectorModel = {
  id: 'straight',
  sourceID: 'node1',
  targetID: 'node2',
  type: 'Straight'
};
```

### Orthogonal (Rectangular)

Horizontal and vertical segments, good for flowcharts:

```ts
let connector: ConnectorModel = {
  id: 'orthogonal',
  sourceID: 'node1',
  targetID: 'node2',
  type: 'Orthogonal'     // Best for structured diagrams
};
```

### Curved (Bezier)

Smooth curved path:

```ts
let connector: ConnectorModel = {
  id: 'curved',
  sourceID: 'node1',
  targetID: 'node2',
  type: 'Bezier'         // Smooth flowing connections
};
```

## Connector Routing

Control where connectors anchor to nodes:

### Segments Configuration

```ts
let connectorWithSegments: ConnectorModel = {
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  type: 'Orthogonal',
  segments: [
    { type: 'Orthogonal', length: 80, direction: 'Right' },
    { type: 'Orthogonal', length: 50, direction: 'Down' },
    { type: 'Orthogonal', length: 50, direction: 'Right' }
  ]
};
```

### Auto-Routing

Connectors automatically avoid node collisions:

```ts
import { Diagram, ConnectorModel, DiagramConstraints, LineRouting } from '@syncfusion/ej2-diagrams';
Diagram.Inject(LineRouting);

let connector: ConnectorModel = {
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
};
let diagram = new Diagram({
  connectors:[connector]
  constraints: DiagramConstraints.Default | DiagramConstraints.LineRouting,
});
```

## Connector Styling

### Basic Styling

```ts
let styledConnector: ConnectorModel = {
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  style: {
    strokeColor: '#6BA5D7',        // Line color
    strokeWidth: 2,                // Line width in pixels
    strokeDashArray : '6 3',
    opacity: 0.8,                  // Transparency (0-1)
    fill: '#6BA5D7'                // Fill (for curved lines)
  }
};
```

## Decorators (Arrows)

Decorators are symbols at connector endpoints:

### Source Decorator (Start of line)

```ts
let connector: ConnectorModel = {
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  sourceDecorator: {
    shape: 'Arrow',              // Arrow pointing back to source
    style: { fill: '#6BA5D7' },
    width: 10,
    height: 10
  }
};
```

### Target Decorator (End of line)

```ts
let connector: ConnectorModel = {
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  targetDecorator: {
    shape: 'Arrow',              // Arrow pointing to target
    style: { fill: '#6BA5D7' },
    width: 10,
    height: 10
  }
};
```

### Decorator Shapes

```ts
// Common shapes
type DecoratorShape = 
  | 'Arrow'           // Standard arrow
  | 'OpenArrow'       // Hollow arrow
  | 'Circle'          // Filled circle
  | 'OpenCircle'      // Hollow circle
  | 'Square'          // Filled square
  | 'OpenSquare'      // Hollow square
  | 'Diamond'         // Diamond shape
  | 'OpenDiamond'     // Hollow diamond
  | 'None';           // No decorator

// Example with different shapes
let connectors: ConnectorModel[] = [
  {
    id: 'arrow',
    sourceID: 'node1',
    targetID: 'node2',
    targetDecorator: { shape: 'Arrow' }
  },
  {
    id: 'circle',
    sourceID: 'node1',
    targetID: 'node3',
    targetDecorator: { shape: 'Circle' }
  },
  {
    id: 'diamond',
    sourceID: 'node1',
    targetID: 'node4',
    targetDecorator: { shape: 'Diamond' }
  }
];
```

## Labels on Connectors

Add text annotations to connectors:

### Single Label

```ts
let connector: ConnectorModel = {
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  annotations: [
    {
      content: 'Flow Label',
      offset: 0.5,                 // 0 = start, 1 = end
      style: {
        color: '#000',
        fontSize: 12
      }
    }
  ]
};
```

### Multiple Labels

```ts
let connector: ConnectorModel = {
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  annotations: [
    { content: 'Yes', offset: 0.3, style: { fontSize: 10 } },
    { content: 'Success', offset: 0.5, style: { fontSize: 12, bold: true } },
    { content: 'Data Flow', offset: 0.7, style: { fontSize: 10 } }
  ]
};
```

### Label Positioning

```ts
// Offset along connector (0 = start, 1 = end)
offset: 0.5,           // Middle of connector

// Vertical alignment relative to connector
alignment: 'Before',      // 'Before', 'Center', 'After'

// Rotation of label text
rotateAngle: 0,              // Degrees
```

## Ports

Ports define precise connection points on nodes:

### Creating Ports on a Node

```ts
let nodeWithPorts: NodeModel = {
  id: 'node1',
  offsetX: 250,
  offsetY: 250,
  width: 100,
  height: 100,
  ports: [
    {
      id: 'port1',
      offset: { x: 0, y: 0.5 },      // Left side, middle
      shape: 'Circle'
    },
    {
      id: 'port2',
      offset: { x: 1, y: 0.5 },      // Right side, middle
      shape: 'Circle'
    },
    {
      id: 'port3',
      offset: { x: 0.5, y: 0 },      // Top, middle
      shape: 'Circle'
    },
    {
      id: 'port4',
      offset: { x: 0.5, y: 1 },      // Bottom, middle
      shape: 'Circle'
    }
  ]
};
```

### Connect to Ports

```ts
let connector: ConnectorModel = {
  id: 'connector1',
  sourceID: 'node1',
  sourcePortID: 'port2',    // Connect from right port
  targetID: 'node2',
  targetPortID: 'port1'     // Connect to left port
};
```

## Adding/Removing Connectors

### Add Connector at Runtime

```ts
let diagram = new Diagram({
  width: '100%',
  height: '600px'
});

// Add single connector
let newConnector: ConnectorModel = {
  id: 'new_connector',
  sourceID: 'node1',
  targetID: 'node2',
  targetDecorator: { shape: 'Arrow' }
};

diagram.add(newConnector);

// Add multiple connectors
diagram.addElements([
  { id: 'c1', sourceID: 'n1', targetID: 'n2', targetDecorator: { shape: 'Arrow' } },
  { id: 'c2', sourceID: 'n2', targetID: 'n3', targetDecorator: { shape: 'Arrow' } }
]);
```

### Remove Connectors

```ts
// Remove by ID

const connector = diagram.getObject('connector1');
if (connector) diagram.remove(connector);


// Remove all connectors from node
diagram.connectors.forEach(conn => {
  if (conn.sourceID === 'node1' || conn.targetID === 'node1') {
    diagram.remove(conn);
  }
});

// Remove by Selection
diagram.select([diagram.connectors[0]]);
diagram.remove();

```

### Update Connector

```ts
let connector = diagram.getObject('connector1');

if (connector) {
  // Change target
  connector.targetID = 'node3';
  
  // Change style
  connector.style.strokeColor = 'red';
  
  // Refresh
  diagram.dataBind();
}
```

## Complete Example

```ts
let nodes: NodeModel[] = [
  {
    id: 'start',
    offsetX: 100,
    offsetY: 100,
    width: 80,
    height: 60,
    shape:{ type: 'Basic', shape: 'Ellipse' }
    annotations: [{ content: 'Start' }]
  },
  {
    id: 'process',
    offsetX: 100,
    offsetY: 200,
    width: 80,
    height: 60,
    annotations: [{ content: 'Process' }]
  },
  {
    id: 'decision',
    offsetX: 100,
    offsetY: 320,
    width: 60,
    height: 60,
    shape: { type: 'Basic', shape: 'Diamond' }
    annotations: [{ content: 'Decision' }]
  },
  {
    id: 'end',
    offsetX: 100,
    offsetY: 430,
    width: 80,
    height: 60,
    shape: { type: 'Basic', shape: 'Ellipse' }
    annotations: [{ content: 'End' }]
  }
];

let connectors: ConnectorModel[] = [
  {
    id: 'start_to_process',
    sourceID: 'start',
    targetID: 'process',
    targetDecorator: { shape: 'Arrow' }
  },
  {
    id: 'process_to_decision',
    sourceID: 'process',
    targetID: 'decision',
    type: 'Orthogonal',
    targetDecorator: { shape: 'Arrow' }
  },
  {
    id: 'decision_to_end',
    sourceID: 'decision',
    targetID: 'end',
    type: 'Orthogonal',
    annotations: [{ content: 'Yes', offset: 0.3 }],
    targetDecorator: { shape: 'Arrow' }
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

## Next Steps

- **Style Everything:** [styling-and-appearance.md](styling-and-appearance.md)
- **Add Data:** [data-binding-and-loading.md](data-binding-and-loading.md)
- **Enable Interactions:** [interaction-and-tools.md](interaction-and-tools.md)
