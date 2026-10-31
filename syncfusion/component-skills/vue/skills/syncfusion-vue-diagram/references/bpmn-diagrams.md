# BPMN Diagrams in Syncfusion Vue Diagram

## Table of Contents
- [Overview](#overview)
- [BPMN Setup](#bpmn-setup)
- [BPMN Shapes](#bpmn-shapes)
- [BPMN Events](#bpmn-events)
- [BPMN Gateways](#bpmn-gateways)
- [BPMN Activity](#bpmn-activity)
- [BPMN Data Objects](#bpmn-data-objects)
- [BPMN Data Source](#bpmn-data-source)
- [BPMN Text Annotation](#bpmn-text-annotation)
- [BPMN Group](#bpmn-group)
- [BPMN Expanded Subprocess](#bpmn-expanded-subprocess)
- [BPMN Flow Connectors](#bpmn-flow-connectors)

## Overview

BPMN (Business Process Model and Notation) provides a standardized notation for modeling business processes. Syncfusion Diagram supports BPMN 2.0 shapes and notations for creating professional business process diagrams.

## BPMN Setup

### Enable BPMN Module

```vue
<template>
    <div id="app">
        <ejs-diagram id="diagram" :width='width' :height='height' :nodes='nodes'></ejs-diagram>
    </div>
</template>
<script>
import { DiagramComponent, BpmnDiagrams } from '@syncfusion/ej2-vue-diagrams';

let nodes = [
  {
    // Position of the node
    offsetX: 250,
    offsetY: 250,
    // Size of the node
    width: 100,
    height: 100,
    //Sets type as Bpmn and shape as Event
    shape: {
        type: 'Bpmn',
        shape: 'Event',
        // set the event type as End
        event: {
            event: 'End'
        }
    }
  }
];
export default {
    name: "App",
    components: {
        "ejs-diagram": DiagramComponent
    },
    data() {
        return {
            width: "100%",
            height: "350px",
            nodes: nodes
        }
    },
    provide: {
        diagram: [BpmnDiagrams]
    }
}
</script>
<style>

</style>
```

## BPMN Shapes

All BPMN shapes require `type: 'Bpmn'` with a `shape` property:

```javascript
const bpmnNode = {
  id: 'bpmnNode',
  width: 100,
  height: 60,
  shape: {
    type: 'Bpmn',
    shape: 'Activity'  // Activity, Event, Gateway, Message, DataObject, etc.
  }
};
```

## BPMN Events

Events represent occurrences or triggers in a process.

### Event Types

```javascript
const eventsTypes = [
  { event: 'Start', trigger: 'None' },        // Simple start event
  { event: 'Intermediate', trigger: 'None' },  // Simple Intermediate event
  { event: 'NonInterruptingStart', trigger: 'None' },  // Simple NonInterruptingStart event
  { event: 'NonInterruptingIntermediate', trigger: 'None' },  // Simple NonInterruptingIntermediate event
  { event: 'ThrowingIntermediate', trigger: 'None' },  // Simple ThrowingIntermediate event
  { event: 'End', trigger: 'None' },          // Simple end event
];

const triggerTypes = [
  { event: 'Start', trigger: 'None' },        // Simple start event
  { event: 'Start', trigger: 'Message' },     // Message start event
  { event: 'Start', trigger: 'Timer' },       // Timer start event
  { event: 'Start', trigger: 'Conditional' },      // Conditional start event
  { event: 'Start', trigger: 'Link' },      // Link start event
  { event: 'Start', trigger: 'Signal' },      // Signal start event
  { event: 'Start', trigger: 'Error' },      // Error start event
  { event: 'Start', trigger: 'Escalation' },      // Escalation start event
  { event: 'Start', trigger: 'Termination' },      // Termination start event
  { event: 'Start', trigger: 'Compendation' },      // Compendation start event
  { event: 'Start', trigger: 'Cancel' },      // Cancel start event
  { event: 'Start', trigger: 'Multiple' },    // Multiple start event
  { event: 'Start', trigger: 'Multiple' },    // Parallel start event
];
```

#### Start Event

```javascript
const startEvent = {
  id: 'startEvent',
  width: 50,
  height: 50,
  shape: {
    type: 'Bpmn',
    shape: 'Event',
    event: {
      event: 'Start',
      trigger: 'None'
    }
  }
};
```

#### End Event

```javascript
const endEvent = {
  id: 'endEvent',
  width: 50,
  height: 50,
  shape: {
    type: 'Bpmn',
    shape: 'Event',
    event: {
      event: 'End'
    }
  }
};
```

#### Intermediate Event

```javascript
const intermediateEvent = {
  id: 'intermediateEvent',
  width: 50,
  height: 50,
  shape: {
    type: 'Bpmn',
    shape: 'Event',
    event: {
      event: 'Intermediate',
      trigger: 'Message'
    }
  }
};
```


## BPMN Gateways

Gateways control flow branching and convergence.

### Gateway Types

```javascript
const gatewayTypes = [
  { type: 'None' },            // Parallel gateway
  { type: 'Exclusive' },       // Exclusive gateway (XOR decision)
  { type: 'Parallel' }         // Parallel gateway (fork/join)
  { type: 'Inclusive' },       // Inclusive gateway (multiple paths)
  { type: 'Complex' },         // Complex gateway
  { type: 'EventBased' },      // Event-based gateway
  { type: 'ExclusiveEventBased' },      // ExclusiveEvent-based gateway
  { type: 'ParallelEventBased' },      // ParallelEvent-based gateway
];
```

#### Exclusive Gateway (Decision Point)

```javascript
const exclusiveGateway = {
  id: 'decision',
  width: 60,
  height: 60,
  shape: {
    type: 'Bpmn',
    shape: 'Gateway',
    gateway: {
      type: 'Exclusive'
    }
  }
};
```

#### Parallel Gateway

```javascript
const parallelGateway = {
  id: 'fork',
  width: 60,
  height: 60,
  shape: {
    type: 'Bpmn',
    shape: 'Gateway',
    gateway: {
      type: 'Parallel'
    }
  }
};
```

#### Inclusive Gateway

```javascript
const inclusiveGateway = {
  id: 'merge',
  width: 60,
  height: 60,
  shape: {
    type: 'Bpmn',
    shape: 'Gateway',
    gateway: {
      type: 'Inclusive'
    }
  }
};
```

## BPMN Activity

Activities represent work performed in a process.

```javascript
const task = {
  id: 'task1',
  width: 100,
  height: 60,
  shape: {
    type: 'Bpmn',
    shape: 'Activity',
    activity: {
      activity: 'Task', // None | Task | SubProcess
    }
  }
};
```

### Task

Basic work unit:

```javascript
const task = {
  id: 'task1',
  width: 100,
  height: 60,
  shape: {
    type: 'Bpmn',
    shape: 'Activity',
    activity: {
      activity: 'Task',
      task: {
        call: true
      }
    }
  }
};
```

### Task Types

```javascript
const taskTypes = [
  { shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task', task: { type: 'None' } } } },                   // None task
  { shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task', task: { type: 'Service' } } } },                // Service task
  { shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task', task: { type: 'BusinessRule' } } } },           // BusinessRule task
  { shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task', task: { type: 'Send' } } } },                   // Send task
  { shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task', task: { type: 'Receive' } } } },                // Receive task
  { shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task', task: { type: 'Manual' } } } },                 // Manual task
  { shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task', task: { type: 'InstantiatingReceive' } } } },   // InstantiatingReceive task
  { shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task', task: { type: 'User' } } } },                   // User task
  { shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task', task: { type: 'Script' } } } },                 // Script task
];
```

### Subprocess

Container for nested activities:

```javascript

const subprocess = {
  id: 'subprocess1',
  width: 200,
  height: 150,
  shape: {
    type: 'Bpmn',
    shape: 'Activity',
    activity: {
      activity: 'SubProcess',
      subProcess: {
        collapsed: true,
        adhoc: true,
        compensation: true,
        loop:'Standard',  // None | ParallelMultiInstance | SequenceMultiInstance | Standard
        boundary: 'Call' // Call | Default | Event
      },
    },
  }
};



const subprocessEvent = {
  id: 'subprocess1',
  width: 200,
  height: 150,
  shape: {
    type: 'Bpmn',
    shape: 'Activity',
    activity: {
      activity: 'SubProcess',
      //Sets the collapsed as true and type as Event
      subProcess: {
        collapsed: false,
        type: 'Event',   // Transaction | Event | None
        //Sets event as Start and trigger as Message
        events: [
          {
            id: 'event',
            event: 'Start',
            trigger: 'Message',
            offset: { x: 0.5, y: 0 },
          },
        ],
      },
    }
  }
};


const subprocessTransaction = {
  id: 'subprocess2',
  width: 200,
  height: 150,
  shape: {
    type: 'Bpmn',
    shape: 'Activity',
    activity: {
      activity: 'SubProcess',
      //Sets the collapsed as true and type as Event
      subProcess: {
        collapsed: true,
        type: 'Transaction',
        //Sets transaction
        transaction: {
          success: {
            id: 'success',
            event: 'Start',
            trigger: 'None',
          },
          failure: {
            id: 'failure',
            event: 'ThrowingIntermediate',
            trigger: 'Error',
          },
          cancel: {
            id: 'cancel',
            event: 'End',
            trigger: 'Cancel',
          },
        },
      },
    }
  }
};
```

### Loop and Marker

```javascript
const task = {
  offsetX: 100, offsetY: 100,
  width: 100, height: 100,
  shape: {
    type: 'Bpmn',
    shape: 'Activity',
    activity: {
        activity: 'Task',
        task: {
            compensation: true,
            loop: 'None',  // None | ParallelMultiInstance | SequenceMultiInstance | Standard
        }
    },
  },
};
```


## BPMN Data Objects

Represent data used by activities.

### Data Object

```javascript
const dataObject = {
  id: 'data1',
  width: 50,
  height: 60,
  shape: {
    type: 'Bpmn',
    shape: 'DataObject',
    dataObject: {
      collection: false, // true | false
      type: 'None'   // None | Input | Output
    }
  }
};
```

## BPMN Data Source

```javascript
const dataSource = {
  id: 'source1',
  width: 100,
  height: 80,
  shape: {
    type: 'Bpmn',
    shape: 'DataSource'
  }
};
```

## BPMN Text Annotation

Documentation or comments:

```javascript
const textAnnotation = {
  id: 'annotation1',
  width: 150,
  height: 60,
  shape: {
    type: 'Bpmn',
    shape: 'TextAnnotation',
    annotation: {
      angle: 0,
      direction: 'Left'
    }
  },
  annotations: [{
    content: 'Process notes or explanation'
  }]
};
```

## BPMN Group

### Group

Container for related elements:

```javascript
const group = {
  id: 'group1',
  width: 300,
  height: 200,
  shape: {
    type: 'Bpmn',
    shape: 'Group'
  }
};
```

## BPMN Expanded Subprocess

Subprocess shown with expanded view:

```javascript
const startNode = {
  id: 'start',
  height: 50,
  width: 50,
  margin: { left: 50, top: 50 },
  shape: { type: 'Bpmn', shape: 'Event' },
};

const expandedSubprocess = {
  id: 'expandedSubprocess1',
  width: 250,
  height: 200,
  shape: {
    type: 'Bpmn',
    shape: 'Activity',
    activity: {
      activity: 'SubProcess',
      subProcess: {
        collapsed: false,
        processes: ['start'],
        adhoc: true,
      },
    }
  }
};
```

## BPMN Flow Connectors

Flows connect BPMN elements and represent transitions.

### Sequence Flow

Normal flow between elements:

```javascript
const sequenceFlow = {
  id: 'flow1',
  sourceID: 'task1',
  targetID: 'decision1',
  shape: { 
    type: 'Bpmn',
    flow: 'Sequence',
    sequence: 'Default'  // Default | Normal | Conditional
  },
  annotations: [{
    content: 'flow'
  }]
};
```

### Message Flow

Communication between pools:

```javascript
const messageFlow = {
  id: 'messageFlow1',
  sourceID: 'task1',
  targetID: 'task2',
  shape: {
    type: 'Bpmn',
    flow: 'Message',
    message: 'InitiatingMessage'  // InitiatingMessage | NonInitiatingMessage | Default
  }
};
```

### Association Flow

Connects annotations to BPMN elements:

```javascript
const associationFlow = {
  id: 'association1',
  sourceID: 'annotation1',
  targetID: 'task1',
  shape: {
    type: 'Bpmn',
    flow: 'Association',
    association: 'BiDirectional'  // Default | Directional | BiDirectional
  }
};
```

## Complete BPMN Process Example

```javascript

  var nodes = [
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
  ];
  
  var connectors = [
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
];
```

BPMN diagrams provide industry-standard notation for business process communication and documentation.
