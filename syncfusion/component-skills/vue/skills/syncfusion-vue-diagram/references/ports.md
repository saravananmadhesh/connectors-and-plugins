# Ports in Syncfusion Vue Diagram

## Table of Contents
- [Overview](#overview)
- [Adding Ports](#adding-ports)
- [Port Positioning](#port-positioning)
- [Port Appearance](#port-appearance)
- [Connecting via Ports](#connecting-via-ports)
- [Port Interaction](#port-interaction)

## Overview

Ports are connection points on nodes. They define specific points where connectors can attach to nodes. This allows precise control over connector connection points rather than connecting to arbitrary node positions.

Ports are useful for:
- Creating predictable connector paths
- Preventing connectors from crossing through node content
- Representing specific connection interfaces
- Building structured diagram layouts

## Adding Ports

### Basic Port Definition

```javascript
const node = {
  id: 'node1',
  offsetX: 250,
  offsetY: 250,
  width: 100,
  height: 100,
  ports: [
    {
      id: 'port1',
      shape: 'Circle',
      offset: { x: 0.5, y: 0 }         // Top center
    },
    {
      id: 'port2',
      shape: 'Circle',
      offset: { x: 1, y: 0.5 }         // Right center
    },
    {
      id: 'port3',
      shape: 'Circle',
      offset: { x: 0.5, y: 1 }         // Bottom center
    },
    {
      id: 'port4',
      shape: 'Circle',
      offset: { x: 0, y: 0.5 }         // Left center
    }
  ]
};
```

### Four-sided Port Layout (Standard)

```javascript
const ports = [
  { id: 'top', offset: { x: 0.5, y: 0 } },
  { id: 'right', offset: { x: 1, y: 0.5 } },
  { id: 'bottom', offset: { x: 0.5, y: 1 } },
  { id: 'left', offset: { x: 0, y: 0.5 } }
];
```

### Grid Port Layout (6+ ports)

```javascript
const ports = [
  { id: 'p1', offset: { x: 0.25, y: 0 } },
  { id: 'p2', offset: { x: 0.75, y: 0 } },
  { id: 'p3', offset: { x: 1, y: 0.25 } },
  { id: 'p4', offset: { x: 1, y: 0.75 } },
  { id: 'p5', offset: { x: 0.75, y: 1 } },
  { id: 'p6', offset: { x: 0.25, y: 1 } },
  { id: 'p7', offset: { x: 0, y: 0.75 } },
  { id: 'p8', offset: { x: 0, y: 0.25 } }
];
```

## Port Positioning

### Normalized Coordinates (0-1)

Port offset uses normalized coordinates where:
- `x: 0` = left edge
- `x: 0.5` = horizontal center
- `x: 1` = right edge
- `y: 0` = top edge
- `y: 0.5` = vertical center
- `y: 1` = bottom edge

```javascript
const port = {
  id: 'center-port',
  offset: { x: 0.5, y: 0.5 }  // Center of node
};
```

### Corner Ports

```javascript
const cornerPorts = [
  { id: 'topLeft', offset: { x: 0, y: 0 } },
  { id: 'topRight', offset: { x: 1, y: 0 } },
  { id: 'bottomLeft', offset: { x: 0, y: 1 } },
  { id: 'bottomRight', offset: { x: 1, y: 1 } }
];
```

### Offset from Edge

```javascript
const port = {
  id: 'inset-port',
  offset: { x: 0.05, y: 0.05 }  // 5% from top-left corner
};
```

## Port Appearance

### Port Shape and Style

```javascript
const port = {
  id: 'port1',
  shape: 'Circle',               // Circle, Square, X, Custom
  width: 10,
  height: 10,
  offset: { x: 0.5, y: 0 },
  style: {
    fill: '#FF0000',
    stroke: '#000000',
    strokeWidth: 2,
    opacity: 0.8
  },
  visibility: PortVisibility.Visible  // Always visible
};
```

### Port Types

```javascript
// Circle port
{ id: 'circle', shape: 'Circle', width: 12, height: 12 }

// Square port
{ id: 'square', shape: 'Square', width: 10, height: 10 }

// X port
{ id: 'x', shape: 'X', width: 10, height: 10 }
```

### Port Visibility

```javascript
const port = {
  id: 'port1',
  offset: { x: 0.5, y: 0 },
  visibility: PortVisibility.Visible           // Always visible
  // OR
  visibility: PortVisibility.Hidden            // Never visible
  // OR
  visibility: PortVisibility.Hover             // Visible on hover
  // OR
  visibility: PortVisibility.Connect           // Visible when connector hovers
};
```

### Tooltip on Port

```javascript
const port = {
  id: 'port1',
  offset: { x: 0.5, y: 0 },
  tooltip: {
    content: 'Connect here for input signal',
    position: 'TopCenter'
  }
};
```

## Connecting via Ports

### Connect Connector to Specific Port

```javascript
const connector = {
  id: 'connector1',
  sourceID: 'node1',
  sourcePortID: 'port2',         // Left port of node1
  targetID: 'node2',
  targetPortID: 'port4',         // Right port of node2
  type: 'Orthogonal'
};
```

### Multiple Connectors to Same Port

```javascript
const connectors = [
  {
    id: 'c1',
    sourceID: 'node1',
    sourcePortID: 'bottom',
    targetID: 'node2',
    type: 'Orthogonal'
  },
  {
    id: 'c2',
    sourceID: 'node1',
    sourcePortID: 'bottom',      // Same port can connect multiple times
    targetID: 'node3',
    type: 'Orthogonal'
  }
];
```

### Dynamic Port Connection

```javascript
// Change connection port at runtime
const connector = diagram.connectors[0];
connector.sourcePortID = 'newPort';
diagram.dataBind();
```

## Port Interaction

### Port Highlighting on Hover

```javascript
const port = {
  id: 'port1',
  offset: { x: 0.5, y: 0 },
  visibility: PortVisibility.Hover,  // Show only on hover
  style: { fill: '#00AA00' }
};
```

### Drag Connectors to Ports

Ports enable drag-and-drop connector behavior:

```javascript
diagram.constraints = DiagramConstraints.Default | DiagramConstraints.Interaction;

// Users can drag from port to port to create connections
```

### Port Constraints

```javascript
const port = {
  id: 'port1',
  offset: { x: 0.5, y: 0 },
  constraints: PortConstraints.InConnect,  // Connect from outside
  // OR
  constraints: PortConstraints.OutConnect  // Connect to outside only
};
```

### Programmatic Port Management

```javascript
// Add ports to node
const port = [{
  id: 'port1',
  offset: { x: 0, y: 0.5 },
  visibility: PortVisibility.Visible
},
{
  id: 'port2',
  offset: { x: 1, y: 0.5 },
  visibility: PortVisibility.Visible
}];

diagramInstance.addPorts(diagramInstance.nodes[0], port);

// Remove ports from node
diagramInstance.removePorts(diagramInstance.nodes[0], diagramInstance.nodes[0].ports);

// Update port at runtime
const updatePortOffset = function () {
  let port1 = diagramInstance.nodes[0].ports[0];
  port1.offset = { x: 1, y: 1 };
  diagramInstance.dataBind();
};
```

Ports provide precise control over how nodes connect to each other, enabling clean, organized diagram layouts with predictable connector paths.
