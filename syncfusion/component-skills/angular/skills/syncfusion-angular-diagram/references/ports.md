# Ports

## Table of Contents
- [Overview](#overview)
- [Port Types](#port-types)
- [Port Positioning](#port-positioning)
- [Port Appearance](#port-appearance)
- [Connecting to Ports](#connecting-to-ports)
- [Port Interaction](#port-interaction)
- [getPortDefaults Pattern](#getportdefaults-pattern)

## Overview

**Ports** are connection points on node boundaries where connectors can attach.

### Key Properties

```typescript
interface Port {
  id: string;                    // Unique identifier within node
  offset: { x: number; y: number };  // Position (0-1 coordinates)
  shape: 'X' | 'Circle' | 'Square' | 'Custom';  // Visual appearance
  width: number;                 // Size in pixels
  height: number;
  visibility: 'Visible' | 'Hidden' | 'Hover' | 'Connect';  // When to show
  style: PortStyle;             // Color, fill
  constraints: PortConstraints;  // Interaction settings
}
```

## Port Types


### Automatic Port Creation

The Diagram component supports automatic port creation when `DiagramConstraints.AutomaticPortCreation` is enabled. Users can create ports interactively by Ctrl+dragging on a node or connector. This feature is disabled by default.

**Auto-port positions (when enabled):**
- Top, Bottom, Left, Right (middle of each side)
- TopLeft, TopRight, BottomLeft, BottomRight (corners)

To enable:
```typescript
import { DiagramConstraints } from '@syncfusion/ej2-angular-diagrams';

diagram.constraints = DiagramConstraints.Default | DiagramConstraints.AutomaticPortCreation;
```

// To disable auto-ports, set the node's `ports` property to an empty array and do not enable `AutomaticPortCreation`.

### Custom Ports

```typescript
{
  id: 'node1',
  width: 100,
  height: 100,
  ports: [
    {
      id: 'port1',
      offset: { x: 0.5, y: 0 }    // Top center
    },
    {
      id: 'port2',
      offset: { x: 0.5, y: 1 }    // Bottom center
    },
    {
      id: 'port3',
      offset: { x: 0, y: 0.5 }    // Left center
    }
  ]
}
```

---

## Port Positioning

### Offset Coordinates

Ports use **normalized coordinates** (0-1):

```typescript
{
  id: 'port1',
  offset: { x: 0, y: 0 }      // Top-left corner
}

{
  id: 'port2',
  offset: { x: 1, y: 1 }      // Bottom-right corner
}

{
  id: 'port3',
  offset: { x: 0.5, y: 0.5 }  // Center
}
```

### Percentage-based Positioning

```typescript
// x=0.5, y=0 = middle of top edge
// x=1, y=0.5 = middle of right edge
// x=0.5, y=1 = middle of bottom edge
// x=0, y=0.5 = middle of left edge
```

### Margin from Node Edge

```typescript
{
  id: 'port1',
  offset: { x: 0.5, y: 0 },
  margin: {
    top: 5,      // 5px inside from edge
    left: 0,
    right: 0,
    bottom: 0
  }
}
```

---

## Port Appearance

### Shape and Size

```typescript
{
  id: 'port1',
  offset: { x: 0.5, y: 0 },
  shape: 'Circle',    // Circle, Square, Triangle
  width: 12,
  height: 12
}
```

### Styling

```typescript
{
  id: 'port1',
  offset: { x: 0.5, y: 0 },
  style: {
    fill: '#FF0000',        // Red port
    strokeColor: '#000000',      // Black border
    strokeWidth: 2,
    opacity: 0.8
  }
}
```

### Visibility

```typescript
{
  id: 'port1',
  offset: { x: 0.5, y: 0 },
  visibility: 'Hover'  // Only show when hovering over node
}
```

**Options:** Visible, Hidden, Hover

---

## Connecting to Ports

### Connect Connector to Specific Port

```typescript
{
  id: 'connector1',
  sourceID: 'node1',
  sourcePortID: 'port1',    // Start from specific port
  targetID: 'node2',
  targetPortID: 'port3'     // End at specific port
}
```

### Auto-port Connection

```typescript
{
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2'
  // Automatically connects to nearest auto-ports
}
```

### Change Connection at Runtime

```typescript
// Reconnect to different port
diagram.connectors[0].sourcePortID = 'newPort';
diagram.dataBind();
```

---

## Port Interaction

### Dragging to Port

When dragging a connector endpoint, the diagram automatically snaps the connector to the nearest visible port on the node if any ports are available. If no ports are visible or defined, the connector will attach to the node boundary. This snapping behavior ensures precise connections and is especially useful for technical diagrams where port-based connections are required.

### Port Constraints

The `constraints` property controls port interaction. Use bitwise OR (`|`) to combine flags from `PortConstraints`:

```typescript
import { PortConstraints } from '@syncfusion/ej2-angular-diagrams';

{
  id: 'port1',
  offset: { x: 0.5, y: 0 },
  constraints: PortConstraints.Default | PortConstraints.Draw // Example: allow drawing connectors from this port
}
```

**PortConstraints options:**
- `Default`: All basic interactions enabled
- `Draw`: Allows drawing connectors from the port
- `Drag`: Allows dragging the port
- `ToolTip`: Shows tooltip on hover
- `None`: Disables all interactions

---


## Setting Port Defaults

There is no `getPortDefaults` method for ports. All port properties (such as size, style, and constraints) must be set explicitly in each port object.

Example:
```typescript
{
  id: 'port1',
  offset: { x: 0.5, y: 0 },
  width: 12,
  height: 12,
  visibility: 'Hover',
  style: {
    fill: '#0066CC',
    strokeColor: '#000000'
  },
  constraints: PortConstraints.Default | PortConstraints.Draw
}
```

----

**→ Next: Explore [shapes and styles](shapes-and-styles.md)**
