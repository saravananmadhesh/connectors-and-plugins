# BPMN Diagrams

## Table of Contents

- [Overview](#overview)
- [BPMN Module Injection](#bpmn-module-injection)
- [BPMN Shapes Overview](#bpmn-shapes-overview)
- [Activities](#activities)
- [Events](#events)
- [Gateways](#gateways)
- [Flows](#flows)
- [Data Objects & Sources](#data-objects--sources)
- [Groups & Annotations](#groups--annotations)

## Overview

BPMN (Business Process Model and Notation) is an industry standard for visualizing business processes. Syncfusion Diagram supports comprehensive BPMN shape libraries for creating professional workflow diagrams.

**Key Concepts:**
- **BPMN Shapes** - Standardized symbols for business processes
- **Shape Types** - Activities, events, gateways, flows, data objects
- **Attributes** - Shape-specific properties (task type, event type, gateway type)
- **Standard Compliance** - OMG BPMN 2.0 specification

## Common BPMN Patterns ⭐

### Pattern 1: Simple Sequential Flow
Straight workflow: Start → Task → Decision → End
```
Start Event→ User Task → Exclusive Gateway → (Yes) Service Task → End Event
                                          ↓
                                        (No) Notify Task → End Event
```

### Pattern 2: Loop with Rejection
Approval workflow: Start → Review → Approve/Reject with loop back
```
Start → User Task (Review) → Exclusive Gateway
         ↑                    ├→(Approved) End
         |                    └→(Rejected) Loop back
         |__________________|
```

### Pattern 3: Parallel Processing
Multiple tasks executing simultaneously
```
Start → Parallel Gateway → Task 1, Task 2, Task 3 → Parallel Gateway → End
```

### Pattern 4: Timer & Escalation
Workflow with timer events
```
Start → Task → Timer Event (24h) ─→ Escalation Task → End
         ↓                              ↑
         └─────(Complete in time)───────→ End
```

### Pattern 5: Subprocess with Error Handling
Complex workflow with subprocesses
```
Start → Subprocess (contains Tasks) → Error Event → Compensation Task → End
```

**Use Case Examples:**
- **Approval Workflows:** Start → Manager Review → Decision → Financial Processing
- **Order Processing:** Customer Order → Inventory Check → Payment → Fulfillment
- **Incident Management:** Report Received → Assign → Resolve → Close
- **Loan Application:** Submit → Verification → Approval Decision → Disbursement

## BPMN Module Injection

### Required Setup

```ts
import { Diagram, BpmnDiagrams } from '@syncfusion/ej2-diagrams';

// Must inject BPMN module
Diagram.Inject(BpmnDiagrams);

// Now BPMN shapes are available
let diagram = new Diagram({
  nodes: [/* BPMN nodes */]
});
```

## BPMN Shapes Overview

### BPMN Shape Properties

```ts
let bpmnNode: NodeModel = {
  id: 'bpmn1',
  offsetX: 250,
  offsetY: 250,
  width: 100,
  height: 100,
  
  // BPMN-specific shape object
  shape: {
    type: 'Bpmn',
    shape: 'Activity',                 // Activity | Event | Gateway | ...
    activity: {
      activity: 'SubProcess', // Task | SubProcess
      //Sets collapsed as true and loop as None
      subProcess: {
        collapsed: true,
        loop: 'None', // None | Standard | SequenceMultiInstance | ParallelMultiInstance
        compensation: false,
        adhoc: false,
        boundary: 'Event', // Default | Call | Event
      },
    }
  }
};
```

## Activities

### Task Types

```ts
import { Diagram, BpmnDiagrams, NodeModel } from '@syncfusion/ej2-diagrams';
Diagram.Inject(BpmnDiagrams);

const taskNodes: NodeModel[] = [
  // Standard Task
  {
    id: 'task',
    offsetX: 100, offsetY: 100, width: 100, height: 80,
    shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task' } }
  },

  // Send Task
  {
    id: 'sendTask',
    offsetX: 220, offsetY: 100, width: 100, height: 80,
    shape: { type: 'Bpmn', shape: 'Activity',
      activity: { activity: 'Task', task: { type: 'Send' } } }
  },

  // Receive Task
  {
    id: 'receiveTask',
    offsetX: 340, offsetY: 100, width: 100, height: 80,
    shape: { type: 'Bpmn', shape: 'Activity',
      activity: { activity: 'Task', task: { type: 'Receive' } } }
  },

  // User Task
  {
    id: 'userTask',
    offsetX: 460, offsetY: 100, width: 100, height: 80,
    shape: { type: 'Bpmn', shape: 'Activity',
      activity: { activity: 'Task', task: { type: 'User' } } }
  },

  // Service Task
  {
    id: 'serviceTask',
    offsetX: 580, offsetY: 100, width: 100, height: 80,
    shape: { type: 'Bpmn', shape: 'Activity',
      activity: { activity: 'Task', task: { type: 'Service' } } }
  }
];

```

### Subprocess Types

```ts
let subprocessNodes: NodeModel[] = [
  // Simple Subprocess
  {
    id: 'subprocess',
    offsetX: 250, offsetY: 250, width: 150, height: 100,
    shape: { type: 'Bpmn', shape: 'Activity',
      activity: { activity: 'SubProcess', subProcess: { type: 'None' } } }
  },

  // Event Subprocess
  {
    id: 'eventSubprocess',
    offsetX: 430, offsetY: 250, width: 150, height: 100,
    shape: { type: 'Bpmn', shape: 'Activity',
      activity: { activity: 'SubProcess', subProcess: { type: 'Event' } } }
  },

  // Compensation Subprocess
  {
    id: 'compensationSubprocess',
    offsetX: 610, offsetY: 250, width: 150, height: 100,
    shape: { type: 'Bpmn', shape: 'Activity',
      activity: { activity: 'SubProcess', subProcess: { type: 'Transaction' } } }
  }
];
```

### Looping and Compensation Activities

```ts
let loopingActivities: NodeModel[] = [
  // Standard Loop
  {
    id: 'loopTask',
    offsetX: 100, offsetY: 380, width: 120, height: 80,
    shape: { type: 'Bpmn', shape: 'Activity',
      activity: { activity: 'SubProcess', // Task | SubProcess
        subProcess: {
          loop: 'Standard',
        } 
      }
    }
  },
  // Parallel MultiInstance
  {
    id: 'parallelTask',
    offsetX: 260, offsetY: 380, width: 120, height: 80,
    shape: { type: 'Bpmn', shape: 'Activity',
      activity: {
        activity: 'SubProcess', // Task | SubProcess
        subProcess: {
          loop: 'ParallelMultiInstance',
        } 
      }
    }
  },
  // Sequwnce MultiInstance
  {
    id: 'sequenceTask',
    offsetX: 420, offsetY: 380, width: 120, height: 80,
    shape: { type: 'Bpmn', shape: 'Activity',
    activity: {
      activity: 'SubProcess', // Task | SubProcess
        subProcess: {
          loop: 'SequenceMultiInstance',
        } 
      }
    }
  },
  // Compensation Activity
  {
    id: 'compensationTask',
    offsetX: 580, offsetY: 380, width: 120, height: 80,
    shape: { type: 'Bpmn', shape: 'Activity',
    activity: {
      activity: 'SubProcess', // Task | SubProcess
        subProcess: {
          loop: 'SequenceMultiInstance',
          compensation: true,
        } 
      }
    }
  }
];
```

## Events

### Event Types

```ts
let eventNodes: NodeModel[] = [
  // Start Event
  {
    offsetX: 150, offsetY: 150,
    width: 100, height: 100,
    shape: {
      type: 'Bpmn', shape: 'Event',
      event: {
        event: 'Start', trigger: 'None',
      },
    },
  },
  // Intermediate Event
  {
    offsetX: 350, offsetY: 150,
    width: 100, height: 100,
    shape: {
      type: 'Bpmn', shape: 'Event',
      event: {
        event: 'Intermediate', trigger: 'None',
      },
    },
  },
  // End Event
  {
    offsetX: 550, offsetY: 150,
    width: 100, height: 100,
    shape: {
      type: 'Bpmn', shape: 'Event',
      event: {
        event: 'End', trigger: 'None',
      },
    },
  },
  // NonInterruptingStart Event
  {
    offsetX: 150, offsetY: 350,
    width: 100, height: 100,
    shape: {
      type: 'Bpmn', shape: 'Event',
      event: {
        event: 'NonInterruptingStart', trigger: 'Timer',
      },
    },
  },
  // NonInterruptingIntermediate Event
  {
    offsetX: 350, offsetY: 350,
    width: 100, height: 100,
    shape: {
      type: 'Bpmn', shape: 'Event',
      event: {
        event: 'NonInterruptingIntermediate', trigger: 'Escalation',
      },
    },
  },
  // ThrowingIntermediate Event
  {
    offsetX: 550, offsetY: 350,
    width: 100, height: 100,
    shape: {
      type: 'Bpmn', shape: 'Event',
      event: {
        event: 'ThrowingIntermediate', trigger: 'Compensation',
      },
    },
  }
];
```

### Event Triggers

```ts
let triggeredEvents: NodeModel[] = [
  // None
  {
    id: 'noneStart',
    offsetX: 100, offsetY: 100, width: 60, height: 60,
    shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start', trigger: 'None' } }
  },

  // Message
  {
    id: 'messageStart',
    offsetX: 200, offsetY: 100, width: 60, height: 60,
    shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start', trigger: 'Message' } }
  },
  // Timer
  {
    id: 'timerStart',
    offsetX: 300, offsetY: 100, width: 60, height: 60,
    shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start', trigger: 'Timer' } }
  },

  // Conditional
  {
    id: 'conditionalStart',
    offsetX: 400, offsetY: 100, width: 60, height: 60,
    shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start', trigger: 'Conditional' } }
  },
  // Link
  {
    id: 'linkStart',
    offsetX: 500, offsetY: 100, width: 60, height: 60,
    shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start', trigger: 'Link' } }
  },
  // Signal
  {
    id: 'signalStart',
    offsetX: 600, offsetY: 100, width: 60, height: 60,
    shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start', trigger: 'Signal' } }
  },

  // Parallel
  {
    id: 'parallelStart',
    offsetX: 700, offsetY: 100, width: 60, height: 60,
    shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start', trigger: 'Parallel' } }
  },

  // Error
  {
    id: 'errorStart',
    offsetX: 100, offsetY: 200, width: 60, height: 60,
    shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start', trigger: 'Error' } }
  },

  // Escalation
  {
    id: 'escalationStart',
    offsetX: 200, offsetY: 200, width: 60, height: 60,
    shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start', trigger: 'Escalation' } }
  },

  // Terminate
  {
    id: 'terminateStart',
    offsetX: 300, offsetY: 200, width: 60, height: 60,
    shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start', trigger: 'Terminate' } }
  },

  // Compensation
  {
    id: 'compensationStart',
    offsetX: 400, offsetY: 200, width: 60, height: 60,
    shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start', trigger: 'Compensation' } }
  },

  // Cancel
  {
    id: 'cancelStart',
    offsetX: 500, offsetY: 200, width: 60, height: 60,
    shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start', trigger: 'Cancel' } }
  },

  // Multiple
  {
    id: 'multipleStart',
    offsetX: 600, offsetY: 200, width: 60, height: 60,
    shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start', trigger: 'Multiple' } }
  },
];
```

## Gateways

### Gateway Types

```ts
let gatewayNodes: NodeModel[] = [
  // None Gateway
  {
    id: 'noneGateway',
    offsetX: 100, offsetY: 100, width: 60, height: 60,
    shape: { type: 'Bpmn', shape: 'Gateway', gateway: { type: 'None' } }
  },
  // Exclusive Gateway (XOR)
  {
    id: 'exclusiveGateway',
    offsetX: 200, offsetY: 100, width: 60, height: 60,
    shape: { type: 'Bpmn', shape: 'Gateway', gateway: { type: 'Exclusive' } }
  },

  // Parallel Gateway
  {
    id: 'parallelGateway',
    offsetX: 300, offsetY: 100, width: 60, height: 60,
    shape: { type: 'Bpmn', shape: 'Gateway', gateway: { type: 'Parallel' } }
  },

  // Inclusive Gateway (OR)
  {
    id: 'inclusiveGateway',
    offsetX: 400, offsetY: 100, width: 60, height: 60,
    shape: { type: 'Bpmn', shape: 'Gateway', gateway: { type: 'Inclusive' } }
  },

  // Complex Gateway
  {
    id: 'complexGateway',
    offsetX: 100, offsetY: 200, width: 60, height: 60,
    shape: { type: 'Bpmn', shape: 'Gateway', gateway: { type: 'Complex' } }
  },

  // Event-based Gateway
  {
    id: 'eventGateway',
    offsetX: 200, offsetY: 200, width: 60, height: 60,
    shape: { type: 'Bpmn', shape: 'Gateway', gateway: { type: 'EventBased' } }
  },

  // ExclusiveEvent-based Gateway
  {
    id: 'exclusiveEventGateway',
    offsetX: 300, offsetY: 200, width: 60, height: 60,
    shape: { type: 'Bpmn', shape: 'Gateway', gateway: { type: 'ExclusiveEventBased' } }
  },
  
  // ParallelEvent-based Gateway
  {
    id: 'parallelEventGateway',
    offsetX: 400, offsetY: 200, width: 60, height: 60,
    shape: { type: 'Bpmn', shape: 'Gateway', gateway: { type: 'ParallelEventBased' } }
  }
];
```

## Flows

### Sequence Flows

```ts
let sequenceFlows: ConnectorModel[] = [
  {
    id: 'connector1',
    sourcePoint: { x: 100, y: 100 },
    targetPoint: { x: 300, y: 100 },
    shape: {
      type: 'Bpmn', flow: 'Sequence', sequence: 'Default'
    },
  },
  {
    id: 'connector2',
    sourcePoint: { x: 100, y: 200 },
    targetPoint: { x: 300, y: 200 },
    shape: {
      type: 'Bpmn', flow: 'Sequence', sequence: 'Normal'
    },
  },
  {
    id: 'connector3',
    sourcePoint: { x: 100, y: 300 },
    targetPoint: { x: 300, y: 300 },
    shape: {
      type: 'Bpmn', flow: 'Sequence', sequence: 'Conditional'
    },
  }
];
```

### Message Flows

```ts
let messageFlow: ConnectorModel[] = [
  {
    id: 'connector1',
    sourcePoint: { x: 100, y: 100 },
    targetPoint: { x: 300, y: 100 },
    shape: {
      type: 'Bpmn', flow: 'Message', message: 'Default'
    },
  },
  {
    id: 'connector2',
    sourcePoint: { x: 100, y: 200 },
    targetPoint: { x: 300, y: 200 },
    shape: {
      type: 'Bpmn', flow: 'Message', message: 'InitiatingMessage'
    },
  },
  {
    id: 'connector3',
    sourcePoint: { x: 100, y: 300 },
    targetPoint: { x: 300, y: 300 },
    shape: {
      type: 'Bpmn', flow: 'Message', message: 'NonInitiatingMessage'
    },
  }
]
```

### Association Flows

```ts
let associationFlow: ConnectorModel[] = [
  {
    id: 'connector1',
    sourcePoint: { x: 100, y: 100 },
    targetPoint: { x: 300, y: 100 },
    shape: {
      type: 'Bpmn', flow: 'Association', association: 'BiDirectional'
    },
  },
  {
    id: 'connector2',
    sourcePoint: { x: 100, y: 200 },
    targetPoint: { x: 300, y: 200 },
    shape: {
      type: 'Bpmn', flow: 'Association', association: 'Directional'
    },
  },
  {
    id: 'connector3',
    sourcePoint: { x: 100, y: 300 },
    targetPoint: { x: 300, y: 300 },
    shape: {
      type: 'Bpmn', flow: 'Association', association: 'Default'
    },
  }
]
```

## Data Objects & Sources

### Data Objects

```ts
let dataObjects: NodeModel[] = [
  {
    id: 'DataObject',
    offsetX: 150, offsetY: 150,
    width: 100, height: 100,
    shape: {
      type: 'Bpmn', shape: 'DataObject',
      dataObject: {
        type: 'None', collection: false,
      },
    },
  },
  {
    id: 'InputDataObject',
    offsetX: 350, offsetY: 150,
    width: 100, height: 100,
    shape: {
      type: 'Bpmn', shape: 'DataObject',
      dataObject: {
        type: 'Input', collection: false,
      },
    },
  },
  {
    id: 'OutputDataObject',
    offsetX: 150, offsetY: 350,
    width: 100, height: 100,
    shape: {
      type: 'Bpmn', shape: 'DataObject',
      dataObject: {
        type: 'Output', collection: false,
      },
    },
  },
  {
    id: 'OutputDataObject2',
    offsetX: 350, offsetY: 350,
    width: 100, height: 100,
    shape: {
      type: 'Bpmn', shape: 'DataObject',
      dataObject: {
        type: 'Output', collection: true,
      },
    },
  }
];
```

### Data Sources

```ts
let node: NodeModel = {
  id: 'dataStore',
  offsetX: 250, offsetY: 250,
  width: 100, height: 100,
  shape: {
    type: 'Bpmn', shape: 'DataSource'
  },
  annotations: [{ content: 'Database' }]
};
```

## Groups & Annotations

### Groups

```ts
let group: NodeModel = {
  id: 'group',
  offsetX: 300, offsetY: 300, width: 400, height: 300,
  constraints: NodeConstraints.Default | NodeConstraints.AllowDrop,
  shape: { type: 'Bpmn', shape: 'Group' },
};
```

### Text Annotations

```ts
const textAnnotation: NodeModel = {
  id: 'annotation',
  offsetX: 250, offsetY: 400, width: 150, height: 80,
  shape: { type: 'Bpmn', shape: 'TextAnnotation' },
  annotations: [{
    content: 'This task requires manual approval\nfrom the manager.',
    style: { fontSize: 12 }
  }]
};
```

## Complete Example: Order Processing Workflow

```ts
import { Diagram, BpmnDiagrams } from '@syncfusion/ej2-diagrams';

Diagram.Inject(BpmnDiagrams);

let bpmnDiagram = new Diagram({
  width: '100%',
  height: '700px',
  
  nodes: [
    // Start
    {
      id: 'start', offsetX: 100, offsetY: 150, width: 60, height: 60,
      shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start', trigger: 'None' } }
    },

    // Receive Order
    {
      id: 'receiveOrder', offsetX: 250, offsetY: 150, width: 110, height: 70,
      shape: {
        type: 'Bpmn', shape: 'Activity',
        activity: { activity: 'Task', task: { type: 'Receive' } }
      },
      annotations: [{ content: 'Receive Order' }]
    },

    // Check Stock (Exclusive Gateway)
    {
      id: 'checkStock', offsetX: 400, offsetY: 150, width: 80, height: 80,
      shape: { type: 'Bpmn', shape: 'Gateway', gateway: { type: 'Exclusive' } }
    },

    // In Stock Path
    {
      id: 'processOrder', offsetX: 250, offsetY: 320, width: 110, height: 70,
      shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task' } },
      annotations: [{ content: 'Process Order' }]
    },

    // Out of Stock Path
    {
      id: 'notifyCustomer', offsetX: 550, offsetY: 320, width: 110, height: 70,
      shape: {
        type: 'Bpmn', shape: 'Activity',
        activity: { activity: 'Task', task: { type: 'Send' } }
      },
      annotations: [{ content: 'Notify Customer' }]
    },

    // End
    {
      id: 'end', offsetX: 250, offsetY: 450, width: 60, height: 60,
      shape: { type: 'Bpmn', shape: 'Event', event: { event: 'End', trigger: 'Link' } }
    }
  ],
  
  connectors: [
  // Sequence flows (Normal)
  {
    id: 'c1', sourceID: 'start', targetID: 'receiveOrder',
    shape: { type: 'Bpmn', flow: 'Sequence', sequence: 'Normal' },
    targetDecorator: { shape: 'Arrow' }
  },
  {
    id: 'c2', sourceID: 'receiveOrder', targetID: 'checkStock',
    shape: { type: 'Bpmn', flow: 'Sequence', sequence: 'Normal' },
    targetDecorator: { shape: 'Arrow' }
  },

  // Decision branches with labels
  {
    id: 'c3', sourceID: 'checkStock', targetID: 'processOrder',
    shape: { type: 'Bpmn', flow: 'Sequence', sequence: 'Normal' },
    annotations: [{ content: 'Yes' }], targetDecorator: { shape: 'Arrow' }
  },
  {
    id: 'c4', sourceID: 'checkStock', targetID: 'notifyCustomer',
    shape: { type: 'Bpmn', flow: 'Sequence', sequence: 'Normal' },
    annotations: [{ content: 'No' }], targetDecorator: { shape: 'Arrow' }
  },
  {
    id: 'c5', sourceID: 'processOrder', targetID: 'end',
    shape: { type: 'Bpmn', flow: 'Sequence', sequence: 'Normal' },
    targetDecorator: { shape: 'Arrow' }
  },
  {
    id: 'c6', sourceID: 'notifyCustomer', targetID: 'end',
    shape: { type: 'Bpmn', flow: 'Sequence', sequence: 'Normal' },
    targetDecorator: { shape: 'Arrow' }
  }
],
});

bpmnDiagram.appendTo('#bpmn-diagram');
```

## Next Steps

- **UML Diagrams:** [uml-diagrams.md](uml-diagrams.md)
- **Swimlanes:** [swimlanes.md](swimlanes.md)
- **Export Workflows:** [serialization-and-export.md](serialization-and-export.md)
