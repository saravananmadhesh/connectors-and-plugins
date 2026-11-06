# Swimlanes

## Table of Contents
- [Overview](#overview)
- [Swimlane Structure](#swimlane-structure)
- [Creating Swimlanes](#creating-swimlanes)
- [Lanes and Phases](#lanes-and-phases)
- [Swimlane Children](#swimlane-children)
- [Swimlane Palette](#swimlane-palette)
- [Swimlane Interaction](#swimlane-interaction)

## Overview

**Swimlanes** organize diagram elements into horizontal or vertical lanes, typically used in BPMN process diagrams to show different actors or departments.

### Swimlane Types

- **Header** - Lane identifier (who performs activity)
- **Lanes** - Vertical or horizontal divisions
- **Phases** - Subdivision of lanes

---

## Swimlane Structure

### Basic Swimlane

```typescript
{
  id: 'swimlane1',
  shape: {
    type: 'SwimLane',
    orientation: 'Horizontal',
    lanes: [
      // Lanes defined here
    ]
  },
  width: 800,
  height: 200,
  offsetX: 400,
  offsetY: 200
}
```

### Swimlane with Header

```typescript
{
  id: 'swimlane1',
  shape: {
    type: 'SwimLane',
    orientation: 'Horizontal',
    header: {
      annotation: {
        content: 'Manager'
      },
      width: 50
    },
    lanes: [
      {
        id: 'lane1',
        header: {
          width: 50,
          annotation: { content: 'Lane 1' }
        }
      }
    ]
  }
}
```

---

## Lanes and Phases

### Creating Lanes

```typescript
shape: {
  type: 'SwimLane',
  orientation: 'Horizontal',
  lanes: [
    {
      id: 'lane1',
      header: {
        width: 50,
        annotation: { content: 'Department A' }
      }
    },
    {
      id: 'lane2',
      header: {
        width: 50,
        annotation: { content: 'Department B' }
      }
    }
  ]
}
```

### Creating Phases

Phases subdivide lanes vertically:

```typescript
shape: {
  type: 'SwimLane',
  phases: [
    {
      id: 'phase1',
      header: {
        annotation: { content: 'Phase 1' }
      }
    },
    {
      id: 'phase2',
      header: {
        annotation: { content: 'Phase 2' }
      }
    }
  ]
}
```

### Orientation

```typescript
orientation: 'Horizontal'  // Lanes flow vertically (top-to-bottom)
orientation: 'Vertical'    // Lanes flow horizontally (left-to-right)
```

---

## Swimlane Children

### Adding Child Nodes to Lanes

To add or remove child nodes to a lane, use the dedicated methods:

#### Add Child to Lane
```typescript
// Add a child node to a specific lane
diagram.addChildToLane('lane1', {
  id: 'newTask',
  shape: { type: 'Flow', shape: 'Process' },
  // ...other node properties
});
```

#### Remove Child from Lane
```typescript
// Remove a child node from a specific lane
diagram.removeChildFromLane('lane1', 'newTask');
```

> **Note:** These methods ensure the child is properly managed within the lane structure. Children are automatically positioned within their parent lane.

---

## Swimlane Palette

### Symbol Palette Integration

```typescript
import { SymbolPalette } from '@syncfusion/ej2-angular-diagrams';

```

### Define Swimlane Symbols

```typescript
symbolPaletteNodes = [
  {
    id: 'swimlane_palette',
    shape: {
      type: 'SwimLane',
      orientation: 'Horizontal',
      header: { width: 50 },
      lanes: [{ id: 'lane' }]
    }
  }
];

<ejs-symbolpalette 
  [symbolWidth]="75" 
  [symbolHeight]="75"
  [palettes]="palettes">
</ejs-symbolpalette>
```

---

## Swimlane Interaction

### Resize Swimlanes

```typescript
// Allow resizing (default enabled)
swimlane.constraints = NodeConstraints.Default

// Prevent resizing
swimlane.constraints = NodeConstraints.Default & ~NodeConstraints.Resize
```

### Move Swimlanes

```typescript
// Allow moving (default enabled)
swimlane.constraints = NodeConstraints.Default

// Prevent moving
swimlane.constraints = NodeConstraints.Default & ~NodeConstraints.Drag
```

### Add/Remove Lanes

```typescript
// Add lane dynamically using the dedicated method
diagram.addLane('swimlane1', {
  id: 'newLane',
  header: { annotation: { content: 'New Lane' } }
});

// Remove lane using the dedicated method
diagram.removeLane('swimlane1', 'laneToRemove');
```

### Header Editing

```typescript
// Enable editing swimlane header
diagram.doubleClick((args) => {
  if (args.source instanceof SwimLane) {
    // Allow header text edit
  }
});
```

---

**→ Next: Group nodes with [groups and containers](groups-and-containers.md)**
