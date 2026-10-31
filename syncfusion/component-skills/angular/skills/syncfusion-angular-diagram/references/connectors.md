# Connectors

## Table of Contents
- [Overview](#overview)
- [Connector Types](#connector-types)
- [Creating Connectors](#creating-connectors)
- [Segments Configuration](#segments-configuration)
- [Source and Target](#source-and-target)
- [Multiple Segments](#multiple-segments)
- [Bezier Control Points](#bezier-control-points)
- [Connector Customization](#connector-customization)
- [Connector Events](#connector-events)
- [getConnectorDefaults Pattern](#getconnectordefaults-pattern)

## Overview

**Connectors** link nodes together and represent relationships, flows, or data paths in a diagram.


## Connector Types

### 1. Straight Connector

Direct line between two nodes:

```typescript
{
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  type: 'Straight'
}
```

**Use cases:**
- Simple process flows
- Minimal connections
- Clean diagrams

### 2. Orthogonal Connector

Right-angle turns (horizontal and vertical):

```typescript
{
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  type: 'Orthogonal'
}
```

**Use cases:**
- Flowcharts (avoids line confusion)
- Circuit diagrams
- Structured layouts

### 3. Bezier Connector

Smooth curved lines:

```typescript
{
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  type: 'Bezier'
}
```

**Use cases:**
- Organic diagrams
- Mind maps
- Artistic or visual workflows

---

## Creating Connectors

### Add Connectors to Diagram

```typescript
connectors = [
  {
    id: 'connector1',
    sourceID: 'node1',
    targetID: 'node2',
    type: 'Orthogonal'
  },
  {
    id: 'connector2',
    sourceID: 'node2',
    targetID: 'node3',
    type: 'Straight'
  }
];

<ejs-diagram [connectors]="connectors"></ejs-diagram>
```

### Add Connectors Dynamically

```typescript
diagram.add({
  id: 'newConnector',
  sourceID: 'node1',
  targetID: 'node2',
  type: 'Orthogonal'
});

// Add multiple
const connectorArray = [conn1, conn2, conn3];
diagram.addElements(connectorArray);
```

### Remove Connectors

```typescript
diagram.remove(diagram.connectors[0]);
```

---

## Segments Configuration

### What Are Segments?

Segments define **how the connector path is drawn**:

```typescript
{
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  type: 'Orthogonal',
  segments: [
    {
      type: 'Orthogonal',
      length: 100,
      direction: 'Right'
    },
    {
      type: 'Orthogonal',
      direction: 'Bottom'
    }
  ]
}
```

### Segment Directions

For **Orthogonal** type:
- `Right` - Move right (East)
- `Left` - Move left (West)
- `Top` - Move up (North)
- `Bottom` - Move down (South)

### Segment Types

```typescript
{
  type: 'Orthogonal',   // Right angles
  direction: 'Right',
  length: 100
}

{
  type: 'Bezier',       // Smooth curve
  vector1: { distance: 100, angle: 90 }
}
```

### Auto-routing Segments

Let the diagram calculate segments automatically:

```typescript
{
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  type: 'Orthogonal'
  // No segments specified - auto-routed
}
```

---

## Source and Target

### Link by Node ID

```typescript
{
  id: 'connector1',
  sourceID: 'node1',      // Start from node1
  targetID: 'node2'       // End at node2
}
```

### Link to Specific Ports

```typescript
{
  id: 'connector1',
  sourceID: 'node1',
  sourcePortID: 'port1',   // Start port
  targetID: 'node2',
  targetPortID: 'port2'    // End port
}
```

See [ports.md](ports.md) for detailed port configuration.

### Dynamic Source/Target

```typescript
// Change connection at runtime
diagram.connectors[0].sourceID = 'newNode1';
diagram.connectors[0].targetID = 'newNode2';
diagram.dataBind();
```

---

## Multiple Segments

### Chain Multiple Paths

```typescript
{
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  type: 'Orthogonal',
  segments: [
    { type: 'Orthogonal', length: 100, direction: 'Right' },
    { type: 'Orthogonal', length: 50, direction: 'Bottom' },
    { type: 'Orthogonal', direction: 'Right' }
  ]
}
```

### Custom Waypoints

```typescript
{
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  type: 'Straight',
  segments: [
    {
      type: 'Straight',
      points: [
        { x: 100, y: 100 },
        { x: 200, y: 150 },
        { x: 300, y: 100 }
      ]
    }
  ]
}
```

---

## Bezier Control Points

### What Are Control Points?

Bezier curves use **control points** to define curve shape:

```typescript
{
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  type: 'Bezier',
  segments: [
    {
      type: 'Bezier',
      vector1: { distance: 100, angle: 90},    // First control point
      vector2: { distance: 45, angle: 270 }     // Second control point
    }
  ]
}
```

### Control Point Orientation

**vector1** - Control point relative to **source**
**vector2** - Control point relative to **target**

Higher values = more pronounced curve

## Connector Customization

### Styling

```typescript
{
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  style: {
    strokeColor: '#FF0000',      // Red line
    strokeWidth: 2,
    strokeDashArray: '5,5'        // Dashed line
  }
}
```

### Arrow Heads (Decorators)

```typescript
{
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  sourceDecorator: {
    shape: 'Arrow',
    width: 10,
    height: 10,
    style: { fill: '#000000' }
  },
  targetDecorator: {
    shape: 'Arrow',
    width: 10,
    height: 10,
    style: { fill: '#000000' }
  }
}
```

**Decorator shapes:** Arrow, Circle, Diamond, OpenArrow, Fletch, OpenFetch, Crescent

### Labels on Connectors

```typescript
{
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  annotations: [
    {
      content: 'Approves',
      offset: 0.5,  // Middle of connector
      style: { fontSize: 12, fill: 'black' }
    }
  ]
}
```

See [labels-and-annotations.md](labels-and-annotations.md) for details.

---

## Connector Events

### Selection Events

```typescript
diagram.selectionChange((args) => {
  if (args.state === 'Changed') {
    console.log('selectionChange');
    //Customize
  }
});
```


### Connection Changed

```typescript
diagram.connectionChange((args) => {
  if (args.state === 'Changed') {
      console.log('connectionChange');
      //Customize
  }
});
```

---

## getConnectorDefaults Pattern

### Purpose

Set default styles for all connectors:

```typescript
getConnectorDefaults = (connector: ConnectorModel): ConnectorModel => {
  return {
    type: 'Orthogonal',
    style: {
      strokeColor: '#333333',
      strokeWidth: 2
    },
    targetDecorator: {
      shape: 'Arrow',
      width: 10,
      height: 10
    }
  };
};

<ejs-diagram [getConnectorDefaults]="getConnectorDefaults"></ejs-diagram>
```

### Conditional Defaults

```typescript
getConnectorDefaults = (connector: ConnectorModel): ConnectorModel => {
  const isApproval = connector.id.includes('approve');
  const isDenial = connector.id.includes('deny');

  return {
    type: 'Orthogonal',
    style: {
      strokeColor: isApproval ? '#00AA00' : isDenial ? '#FF0000' : '#333333',
      strokeWidth: 2,
      strokeDashArray: isDenial ? '5,5' : ''
    },
    targetDecorator: {
      shape: 'Arrow'
    }
  };
};
```

---

**→ Next: Add [labels and annotations](labels-and-annotations.md) to your diagram**
