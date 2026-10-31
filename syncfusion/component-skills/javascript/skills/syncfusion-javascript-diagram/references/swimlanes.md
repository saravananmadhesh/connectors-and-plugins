# Swimlanes

## Table of Contents

- [Overview](#overview)
- [Swimlane Structure](#swimlane-structure)
- [Creating Lanes](#creating-lanes)
- [Creating Phases](#creating-phases)
- [Swimlane Children](#swimlane-children)
- [Swimlane Headers](#swimlane-headers)
- [Swimlane Palette](#swimlane-palette)
- [Swimlane Interaction](#swimlane-interaction)

## Overview

Swimlanes organize diagram elements - processes, activities, data flows - visually grouped by actor, role, or organization. They're commonly used for process flowcharts showing who's responsible for each step.

**Key Concepts:**
- **Lane** - Vertical group for an actor/role
- **Phase** - Horizontal group for a time period/stage
- **Header** - Labels for lanes and phases
- **Children** - Nodes and connectors within lanes

## Swimlane Structure

### Basic Swimlane Concepts

```ts
import { Diagram, NodeModel } from '@syncfusion/ej2-diagrams';

// Swimlane node structure (recommended API):
const swimlaneNode: NodeModel = {
  id: 'swimlane1',
  offsetX: 350,
  offsetY: 200,
  width: 600,
  height: 300,
  shape: {
    type: 'SwimLane',
    orientation: 'Horizontal',
    header: {
      annotation: { content: 'Process Owner' },
      height: 50,
      style: { fontSize: 14, fill: '#6BA5D7', color: '#fff' }
    },
    lanes: [
      {
        id: 'lane1',
        height: 100,
        header: { annotation: { content: 'Sales' } }
      },
      {
        id: 'lane2',
        height: 100,
        header: { annotation: { content: 'Support' } }
      }
    ],
    phases: [
      {
        id: 'phase1',
        offset: 170,
        header: { annotation: { content: 'Phase 1' } }
      },
      {
        id: 'phase2',
        offset: 350,
        header: { annotation: { content: 'Phase 2' } }
      }
    ],
    phaseSize: 20
  }
};

const diagram = new Diagram({
  width: '100%',
  height: '600px',
  nodes: [swimlaneNode]
});
diagram.appendTo('#diagram');
```

## Creating Lanes

### Vertical Lanes (Most Common)

```ts
const verticalSwimlane: NodeModel = {
  id: 'verticalSwimlane',
  offsetX: 350,
  offsetY: 200,
  width: 600,
  height: 300,
  shape: {
    type: 'SwimLane',
    orientation: 'Vertical',
    header: {
      annotation: { content: 'Vertical Process' },
      height: 40
    },
    lanes: [
      {
        id: 'lane1',
        height: 120,
        header: { annotation: { content: 'Manager' } }
      },
      {
        id: 'lane2',
        height: 120,
        header: { annotation: { content: 'Employee' } }
      }
    ],
    phases: [
      {
        id: 'phase1',
        offset: 200,
        header: { annotation: { content: 'Phase 1' } }
      }
    ],
    phaseSize: 20
  }
};
```

### Horizontal Lanes

```ts
const horizontalSwimlane: NodeModel = {
  id: 'horizontalSwimlane',
  offsetX: 350,
  offsetY: 200,
  width: 600,
  height: 300,
  shape: {
    type: 'SwimLane',
    orientation: 'Horizontal',
    header: {
      annotation: { content: 'Q1 2024' },
      height: 40
    },
    lanes: [
      {
        id: 'lane1',
        height: 120,
        header: { annotation: { content: 'Team A' } }
      },
      {
        id: 'lane2',
        height: 120,
        header: { annotation: { content: 'Team B' } }
      }
    ],
    phases: [],
    phaseSize: 20
  }
};
```

### Multiple Lanes

```ts
// Multiple lanes in a swimlane node
const multiLaneSwimlane: NodeModel = {
  id: 'multiLaneSwimlane',
  offsetX: 350,
  offsetY: 200,
  width: 600,
  height: 300,
  shape: {
    type: 'SwimLane',
    orientation: 'Horizontal',
    header: {
      annotation: { content: 'Multi-Lane Example' },
      height: 40
    },
    lanes: [
      {
        id: 'lane1',
        height: 100,
        header: { annotation: { content: 'Manager' } }
      },
      {
        id: 'lane2',
        height: 100,
        header: { annotation: { content: 'Employee' } }
      },
      {
        id: 'lane3',
        height: 100,
        header: { annotation: { content: 'HR' } }
      }
    ],
    phases: [],
    phaseSize: 20
  }
};
```

## Creating Phases

### Vertical Phases

```ts
// Vertical phases in a swimlane node
const verticalPhasesSwimlane: NodeModel = {
  id: 'verticalPhasesSwimlane',
  offsetX: 350,
  offsetY: 200,
  width: 600,
  height: 300,
  shape: {
    type: 'SwimLane',
    orientation: 'Vertical',
    header: {
      annotation: { content: 'Vertical Phases' },
      height: 40
    },
    lanes: [
      {
        id: 'lane1',
        height: 200,
        header: { annotation: { content: 'Process' } }
      }
    ],
    phases: [
      {
        id: 'phase1',
        offset: 120,
        header: { annotation: { content: 'Planning Phase' } }
      },
      {
        id: 'phase2',
        offset: 240,
        header: { annotation: { content: 'Execution Phase' } }
      }
    ],
    phaseSize: 20
  }
};
```

### Horizontal Phases

```ts
// Horizontal phases in a swimlane node
const horizontalPhasesSwimlane: NodeModel = {
  id: 'horizontalPhasesSwimlane',
  offsetX: 350,
  offsetY: 200,
  width: 600,
  height: 300,
  shape: {
    type: 'SwimLane',
    orientation: 'Horizontal',
    header: {
      annotation: { content: 'Horizontal Phases' },
      height: 40
    },
    lanes: [
      {
        id: 'lane1',
        height: 200,
        header: { annotation: { content: 'Process' } }
      }
    ],
    phases: [
      {
        id: 'phase1',
        offset: 170,
        header: { annotation: { content: 'Phase 1: Discovery' } }
      },
      {
        id: 'phase2',
        offset: 350,
        header: { annotation: { content: 'Phase 2: Delivery' } }
      }
    ],
    phaseSize: 20
  }
};
```

### Multiple Phases

```ts
// Multiple phases in a swimlane node
const multiPhaseSwimlane: NodeModel = {
  id: 'multiPhaseSwimlane',
  offsetX: 350,
  offsetY: 200,
  width: 600,
  height: 300,
  shape: {
    type: 'SwimLane',
    orientation: 'Horizontal',
    header: {
      annotation: { content: 'Multi-Phase Example' },
      height: 40
    },
    lanes: [
      {
        id: 'lane1',
        height: 200,
        header: { annotation: { content: 'Process' } }
      }
    ],
    phases: [
      {
        id: 'phase1',
        offset: 150,
        header: { annotation: { content: 'Phase 1' } }
      },
      {
        id: 'phase2',
        offset: 350,
        header: { annotation: { content: 'Phase 2' } }
      },
      {
        id: 'phase3',
        offset: 550,
        header: { annotation: { content: 'Phase 3' } }
      }
    ],
    phaseSize: 20
  }
};
```

## Swimlane Children

### Adding Child Nodes

```ts
// Adding child nodes to lanes in a swimlane
const swimlaneWithChildren: NodeModel = {
  id: 'swimlaneWithChildren',
  offsetX: 350,
  offsetY: 200,
  width: 600,
  height: 300,
  shape: {
    type: 'SwimLane',
    orientation: 'Horizontal',
    header: {
      annotation: { content: 'Swimlane with Children' },
      height: 40
    },
    lanes: [
      {
        id: 'lane1',
        height: 120,
        header: { annotation: { content: 'Team' } },
        children: [
          {
            id: 'task1',
            width: 100,
            height: 60,
            offsetX: 150,
            offsetY: 120,
            annotations: [{ content: 'Review Request' }]
          },
          {
            id: 'task2',
            width: 100,
            height: 60,
            offsetX: 300,
            offsetY: 120,
            annotations: [{ content: 'Approve' }]
          },
          {
            id: 'task3',
            width: 100,
            height: 60,
            offsetX: 450,
            offsetY: 120,
            annotations: [{ content: 'Notify' }]
          }
        ]
      }
    ],
    phases: [],
    phaseSize: 20
  }
};
```

### Cross-Lane Connectors

```ts
// Connectors between swimlanes
let crossLaneConnector = {
  id: 'crossConnector',
  sourceID: 'manager_task',        // In manager lane
  targetID: 'employee_task',       // In employee lane
  type: 'Orthogonal',
  style: { strokeColor: '#FF6B6B', strokeWidth: 2 },
  targetDecorator: { shape: 'Arrow' }
};
```

## Swimlane Headers

### Header Configuration

```ts
// Customizing the swimlane header
const swimlaneWithHeader: NodeModel = {
  id: 'swimlaneWithHeader',
  offsetX: 350,
  offsetY: 200,
  width: 600,
  height: 300,
  shape: {
    type: 'SwimLane',
    orientation: 'Horizontal',
    header: {
      annotation: {
        content: 'Sales Process',
        style: {
          fontSize: 14,
          bold: true,
          color: '#fff'
        }
      },
      style: {
        fill: '#6BA5D7',
        strokeColor: '#003366',
        strokeWidth: 2
      },
      height: 40
    },
    lanes: [
      {
        id: 'lane1',
        height: 120,
        header: { annotation: { content: 'Sales' } }
      }
    ],
    phases: [],
    phaseSize: 20
  }
};
```

### Header Customization

```ts
// Further header customization example
const customHeaderSwimlane: NodeModel = {
  id: 'customHeaderSwimlane',
  offsetX: 350,
  offsetY: 200,
  width: 600,
  height: 300,
  shape: {
    type: 'SwimLane',
    orientation: 'Horizontal',
    header: {
      annotation: {
        content: 'Actor: Marketing Team\nRole: Campaign Management',
        style: {
          fontSize: 12,
          textAlign: 'Center'
        }
      },
      style: {
        fill: '#FFE6E6',
        textOverflow: 'Wrap'
      },
      height: 40
    },
    lanes: [
      {
        id: 'lane1',
        height: 120,
        header: { annotation: { content: 'Marketing' } }
      }
    ],
    phases: [],
    phaseSize: 20
  }
};
```

## Swimlane Palette

### Symbol Palette with Swimlanes

```ts
import { SymbolPalette, SymbolPaletteModel } from '@syncfusion/ej2-diagrams';

const paletteShapes: NodeModel[] = [
  {
    id: 'swimlaneSymbol',
    width: 350,
    height: 200,
    shape: {
      type: 'SwimLane',
      orientation: 'Horizontal',
      header: {
        annotation: { content: 'Swimlane' },
        height: 40
      },
      lanes: [
        {
          id: 'lane1',
          height: 100,
          header: { annotation: { content: 'Lane' } }
        }
      ],
      phases: [],
      phaseSize: 20
    }
  },
  {
    id: 'taskSymbol',
    width: 100,
    height: 60,
    shape: { type: 'Basic', shape: 'Rectangle' },
    annotations: [{ content: 'Task' }]
  }
];

const palette = new SymbolPalette({
  width: '100%',
  height: '600px',
  palettes: [
    {
      id: 'swimlanePalette',
      expanded: true,
      symbols: paletteShapes,
      title: 'Swimlane Shapes'
    }
  ]
});
palette.appendTo('#palette');
```

### Drag-Drop from Palette

```ts
// Users drag swimlanes and tasks from palette to diagram
// Dropped tasks automatically become children of swimlane
```

## Swimlane Interaction

### Editing Swimlane Content

```ts
let diagram = new Diagram({
  // Enable swimlane resizing
  swimLaneResizing: true,
  
  // Handle property changes
  propertyChange: (args) => {
    if (args.element) {
      console.log('Swimlane property changed');
    }
  }
});
```

### Moving Children Between Lanes

```ts
// When user drags task from one lane to another
let diagram = new Diagram({
  dragEnter: (args) => {
    // Allow dropping into swimlanes
    if (args.target) {
      console.log('Dragging into lane:', args.target.id);
    }
  },
  
  drop: (args) => {
    // Child now belongs to new swimlane
    console.log('Dropped into lane');
  }
});
```

## Complete Example: Approval Process

```ts
import { Diagram, NodeModel } from '@syncfusion/ej2-diagrams';

const approvalSwimlane: NodeModel = {
  id: 'approvalSwimlane',
  offsetX: 350,
  offsetY: 200,
  width: 600,
  height: 300,
  shape: {
    type: 'SwimLane',
    orientation: 'Horizontal',
    header: {
      annotation: { content: 'Approval Process' },
      height: 40
    },
    lanes: [
      {
        id: 'managerLane',
        height: 120,
        header: { annotation: { content: 'Manager' } },
        children: [
          {
            id: 'receiveRequest',
            width: 100,
            height: 60,
            offsetX: 150,
            offsetY: 120,
            annotations: [{ content: 'Receive' }]
          },
          {
            id: 'review',
            width: 100,
            height: 60,
            offsetX: 350,
            offsetY: 120,
            shape: { type: 'Basic', shape: 'Diamond' },
            annotations: [{ content: 'Approved?' }]
          }
        ]
      },
      {
        id: 'employeeLane',
        height: 120,
        header: { annotation: { content: 'Employee' } },
        children: [
          {
            id: 'submitRequest',
            width: 100,
            height: 60,
            offsetX: 150,
            offsetY: 270,
            annotations: [{ content: 'Submit' }]
          },
          {
            id: 'waitApproval',
            width: 100,
            height: 60,
            offsetX: 350,
            offsetY: 270,
            annotations: [{ content: 'Wait' }]
          }
        ]
      }
    ],
    phases: [],
    phaseSize: 20
  }
};

const approvalDiagram = new Diagram({
  width: '100%',
  height: '600px',
  nodes: [approvalSwimlane],
  connectors: [
    { id: 'c1', sourceID: 'receiveRequest', targetID: 'review', targetDecorator: { shape: 'Arrow' } },
    { id: 'c2', sourceID: 'submitRequest', targetID: 'waitApproval', targetDecorator: { shape: 'Arrow' } },
    { id: 'c3', sourceID: 'review', targetID: 'waitApproval', targetDecorator: { shape: 'Arrow' },
      annotations: [{ content: 'Approved' }] }
  ]
});
approvalDiagram.appendTo('#swimlane-diagram');
```

## Next Steps
- **Groups & Containers:** [groups-and-containers.md](groups-and-containers.md)
- **Symbol Palette:** [symbol-palette.md](symbol-palette.md)
- **UML Diagrams:** [uml-diagrams.md](uml-diagrams.md)

---

## Working with Constraints

You can control the behavior of swimlanes, nodes, and connectors using constraints. These are bitwise flags that enable or disable features such as selection, dragging, resizing, and more.

**Diagram constraints example:**
```ts
import { Diagram, DiagramConstraints } from '@syncfusion/ej2-diagrams';
const diagram = new Diagram({
  width: '100%',
  height: '600px',
  constraints: DiagramConstraints.Default & ~DiagramConstraints.PageEditable // disables page editing
});
```

**Node constraints example:**
```ts
import { NodeModel, NodeConstraints } from '@syncfusion/ej2-diagrams';
const node: NodeModel = {
  id: 'node1',
  offsetX: 100,
  offsetY: 100,
  constraints: NodeConstraints.Default & ~NodeConstraints.Rotate // disables rotation
};
```

**Connector constraints example:**
```ts
import { ConnectorModel, ConnectorConstraints } from '@syncfusion/ej2-diagrams';
const connector: ConnectorModel = {
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  constraints: ConnectorConstraints.Default | ConnectorConstraints.Bridging
};
```

- **Groups & Containers:** [groups-and-containers.md](groups-and-containers.md)
- **Symbol Palette:** [symbol-palette.md](symbol-palette.md)
- **UML Diagrams:** [uml-diagrams.md](uml-diagrams.md)
