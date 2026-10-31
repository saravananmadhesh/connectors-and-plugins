# UML Diagrams in Syncfusion Vue Diagram

## Table of Contents
- [Overview](#overview)
- [UML Setup](#uml-setup)
- [Class Diagrams](#class-diagrams)
- [Classifiers](#classifiers)
- [UML Relationships](#uml-relationships)
- [Sequence Diagrams](#sequence-diagrams)
- [Lifelines](#lifelines)
- [Messages](#messages)

## Overview

UML (Unified Modeling Language) provides diagrams for software design and architecture. Syncfusion supports UML class diagrams, sequence diagrams, and various relationship types for technical documentation.

## UML Setup


### Basic Usage

```vue
<template>
  <ejs-diagram id="diagram" :width="width" :height="height" :nodes="nodes" />
</template>

<script setup>
import { DiagramComponent } from '@syncfusion/ej2-vue-diagrams';
import { ref } from 'vue';

const width = '100%';
const height = '590px';
const nodes = ref([]); // Add UML nodes as shown below
</script>
<style>
  @import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/diagram/index.css";
</style>
```

## Class Diagrams


### Class Classifier

```javascript
const classNode = {
  id: 'class1',
  width: 200,
  height: 150,
  offsetX: 250,
  offsetY: 250,
  shape: {
    type: 'UmlClassifier',
    classShape: {
      name: 'ClassName',
      attributes: [
        { name: 'property1', type: 'string' },
        { name: 'property2', type: 'number' }
      ],
      methods: [
        { name: 'method1', type: 'void' },
        { name: 'method2', type: 'boolean' }
      ]
    },
    classifier: 'Class'
  }
};
```


### Interface Classifier

```javascript
const interfaceNode = {
  id: 'interface1',
  width: 200,
  height: 120,
  shape: {
    type: 'UmlClassifier',
    interfaceShape: {
      name: 'IExample',
      attributes: [],
      methods: [
        { name: 'doSomething', type: 'void' }
      ]
    },
    classifier: 'Interface'
  }
};
```


### Enumeration Classifier

```javascript
const enumNode = {
  id: 'enum1',
  width: 150,
  height: 120,
  shape: {
    type: 'UmlClassifier',
    enumerationShape: {
      name: 'Status',
      members: [
        { name: 'Active' },
        { name: 'Inactive' },
        { name: 'Pending' }
      ]
    },
    classifier: 'Enumeration'
  }
};
```


### Abstract Class

```javascript
const abstractClass = {
  id: 'abstractClass1',
  width: 200,
  height: 150,
  shape: {
    type: 'UmlClassifier',
    classShape: {
      name: 'BaseClass',
      attributes: [{ name: 'abstractProperty', type: 'T' }],
      methods: [
        { name: 'abstractMethod', type: 'void' },
        { name: 'concreteMethod', type: 'boolean' }
      ]
    },
    classifier: 'Abstract'
  }
};
```


### Visibility Modifiers

```javascript
const classWithModifiers = {
  shape: {
    type: 'UmlClassifier',
    classShape: {
      attributes: [
        { name: 'publicProperty', type: 'string', scope: 'public' },
        { name: 'protectedProperty', type: 'number', scope: 'protected' },
        { name: 'privateProperty', type: 'boolean', scope: 'private' },
        { name: 'packageProperty', type: 'object', scope: 'package' }
      ],
      methods: [
        { name: 'publicMethod', type: 'void', scope: 'public' },
        { name: 'privateMethod', type: 'string', scope: 'private' }
      ]
    },
    classifier: 'Class'
  }
};
```

## Classifiers

All classifiers extend from base class definition:


### Classifier Properties

```javascript
const classifier = {
  shape: {
    type: 'UmlClassifier',
    classShape: {
      name: 'ClassName',
      attributes: [
        { name: 'propertyName', type: 'PropertyType' }
      ],
      methods: [
        { name: 'methodName', type: 'ReturnType', parameters: [{ name: 'param', type: 'ParamType' }] }
      ],
      separator: true
    },
    classifier: 'Class'
  }
};
```

## UML Relationships


### Association

Generic relationship between classes:

```javascript
const association = {
  id: 'assoc1',
  sourceID: 'class1',
  targetID: 'class2',
  type: 'Straight',
  shape: {
    type: 'UmlClassifier',
    relationship: 'Association',
    association: 'BiDirectional' // or 'Directional'
  }
};
```


### Inheritance (Generalization)

```javascript
const inheritance = {
  id: 'inherit1',
  sourceID: 'childClass',
  targetID: 'parentClass',
  type: 'Straight',
  shape: {
    type: 'UmlClassifier',
    relationship: 'Inheritance'
  }
};
```


### Realization (Interface Implementation)

```javascript
const realization = {
  id: 'realize1',
  sourceID: 'implementingClass',
  targetID: 'interfaceClass',
  type: 'Straight',
  shape: {
    type: 'UmlClassifier',
    relationship: 'Realization'
  },
  style: { strokeDashArray: '5,5' }
};
```


### Dependency

Weaker relationship indicating usage:

```javascript
const dependency = {
  id: 'depend1',
  sourceID: 'dependentClass',
  targetID: 'dependencyClass',
  type: 'Straight',
  shape: {
    type: 'UmlClassifier',
    relationship: 'Dependency'
  },
  style: { strokeDashArray: '5,5' }
};
```


### Aggregation

One class contains instances of another:

```javascript
const aggregation = {
  id: 'aggr1',
  sourceID: 'containerClass',
  targetID: 'containedClass',
  type: 'Straight',
  shape: {
    type: 'UmlClassifier',
    relationship: 'Aggregation'
  }
};
```


### Composition

Strong ownership relationship:

```javascript
const composition = {
  id: 'comp1',
  sourceID: 'ownerClass',
  targetID: 'ownedClass',
  type: 'Straight',
  shape: {
    type: 'UmlClassifier',
    relationship: 'Composition'
  }
};
```


## UML Sequence Diagrams

UML Sequence diagrams demonstrate how objects interact with each other and the order of these interactions. The Vue Diagram control supports creating sequence diagrams through the `UmlSequenceDiagramModel` using a model-based approach.

### Participants

Participants represent entities that interact in the sequence diagram. They appear at the top with lifelines extending downward.

#### Participant Stereotypes

Stereotypes define the visual style of a participant and show their role in the interaction:

| Stereotype | Description |
|---|---|
| Default | Standard object participant displayed as a rectangle |
| Actor | External person or system interacting with the process |
| Boundary | Interface or entry point (UI, API gateway, external system) |
| Control | Object managing the flow (controller, coordinator) |
| Entity | Object representing data or domain objects |
| Database | Database or persistent storage system (cylindrical shape) |

#### Participant Properties

| Property | Type | Description |
|---|---|---|
| id | string \| number | Unique identifier for the participant |
| content | string | Display text of the participant |
| stereotype | UmlSequenceParticipantStereotype | Visual style (Default, Actor, Boundary, Control, Entity, Database) |
| showDestructionMarker | boolean | Show destruction marker (X) at end of lifeline |
| activationBoxes | UmlSequenceActivationBoxModel[] | Collection of activation boxes for the participant |

#### Define Participants with Stereotypes

```vue
<template>
  <div id="app">
    <ejs-diagram ref="diagramRef" id="diagram" width="100%" height="600px" :snapSettings='snapSettings'/>
  </div>
</template>
<script>
import { DiagramComponent, SnapConstraints, UmlSequenceParticipantStereotype } from '@syncfusion/ej2-vue-diagrams';

const model = {
  participants: [
    {
      id: "User",
      content: "User",
      stereotype: UmlSequenceParticipantStereotype.Actor // External user
    },
    {
      id: "UI",
      content: "UI",
      stereotype: UmlSequenceParticipantStereotype.Boundary // Interface/boundary
    },
    {
      id: "Controller",
      content: "Controller",
      stereotype: UmlSequenceParticipantStereotype.Control // Flow controller
    },
    {
      id: "UserData",
      content: "UserData",
      stereotype: UmlSequenceParticipantStereotype.Entity // Data object
    },
    {
      id: "Database",
      content: "Database",
      stereotype: UmlSequenceParticipantStereotype.Database // Storage system
    }
  ],
  messages: []
};

export default {
  name: "App",
  components: { "ejs-diagram": DiagramComponent },
  data() {
    return {
      snapSettings: { constraints: SnapConstraints.None },
    }
  },
  mounted() {
    const diagramInstance = this.$refs.diagramRef.ej2Instances;
    diagramInstance.model = model;
    diagramInstance.updateFromModel();
  }
};
</script>
<style>
  @import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/diagram/index.css";
</style>
```

### Messages

Messages represent communication between participants.

#### Message Types

| Type | Description | Usage |
|---|---|---|
| Synchronous | Sender waits for response (blocking call) | Function calls, requests |
| Asynchronous | Sender continues without waiting | Event notifications, async calls |
| Reply | Response to a previous message | Returning from function calls |
| Create | Creates a new participant | Object instantiation |
| Delete | Terminates a participant | Object destruction |
| Self | Message to the same participant | Internal logic/validation |

#### Message Properties

| Property | Type | Description |
|---|---|---|
| id | string \| number | Unique identifier for the message |
| content | string | Display text for the message |
| fromParticipantID | string \| number | ID of sending participant |
| toParticipantID | string \| number | ID of receiving participant |
| type | UmlSequenceMessageType | Message type (Synchronous, Asynchronous, Reply, Create, Delete, Self) |

#### Define Messages

```javascript
const messages = [
  // Synchronous: User sends login request to UI
  {
    id: "MSG1",
    content: "Login Request",
    fromParticipantID: "User",
    toParticipantID: "UI",
    type: UmlSequenceMessageType.Synchronous
  },
  // Asynchronous: UI sends request to Controller
  {
    id: "MSG2",
    content: "Validate Login",
    fromParticipantID: "UI",
    toParticipantID: "Controller",
    type: UmlSequenceMessageType.Asynchronous
  },
  // Create: Controller creates UserData object
  {
    id: "MSG3",
    content: "Create UserData",
    fromParticipantID: "Controller",
    toParticipantID: "UserData",
    type: UmlSequenceMessageType.Create
  },
  // Synchronous: UserData queries database
  {
    id: "MSG4",
    content: "Query User",
    fromParticipantID: "UserData",
    toParticipantID: "Database",
    type: UmlSequenceMessageType.Synchronous
  },
  // Reply: Database returns result
  {
    id: "MSG5",
    content: "User Found",
    fromParticipantID: "Database",
    toParticipantID: "UserData",
    type: UmlSequenceMessageType.Reply
  },
  // Self: UserData validates data
  {
    id: "MSG6",
    content: "Validate Data",
    fromParticipantID: "UserData",
    toParticipantID: "UserData",
    type: UmlSequenceMessageType.Self
  },
  // Delete: Controller destroys UserData
  {
    id: "MSG7",
    content: "Destroy UserData",
    fromParticipantID: "Controller",
    toParticipantID: "UserData",
    type: UmlSequenceMessageType.Delete
  }
];
```

### Activation Boxes

Activation boxes represent periods when a participant is active and processing messages. They appear as thin rectangles on participant lifelines.

#### Activation Box Properties

| Property | Type | Description |
|---|---|---|
| id | string \| number | Unique identifier for the activation box |
| startMessageID | string \| number | ID of the message that initiates activation |
| endMessageID | string \| number | ID of the message that terminates activation |

#### Define Activation Boxes

```javascript
const model = {
  participants: [
    {
      id: "User",
      content: "User",
      stereotype: UmlSequenceParticipantStereotype.Actor
    },
    {
      id: "System",
      content: "System",
      showDestructionMarker: true,
      // System is active from MSG1 to MSG2
      activationBoxes: [
        {
          id: "ActSystem1",
          startMessageID: "MSG1", // Starts when receiving login request
          endMessageID: "MSG2"    // Ends when sending response
        }
      ]
    }
  ],
  messages: [
    {
      id: "MSG1",
      content: "Login Request",
      fromParticipantID: "User",
      toParticipantID: "System",
      type: UmlSequenceMessageType.Synchronous
    },
    {
      id: "MSG2",
      content: "Login Response",
      fromParticipantID: "System",
      toParticipantID: "User",
      type: UmlSequenceMessageType.Reply
    }
  ]
};
```

### Fragments (Loops & Conditions)

Fragments group a set of messages based on specific conditions in a sequence diagram. They are displayed as rectangular enclosures that visually separate conditional or looping interactions.

#### Fragment Types

| Fragment Type | Description |
|---|---|
| `Optional` | Represents a sequence that is executed only if a specified condition is met; otherwise, it is skipped. |
| `Alternative` | Represents a choice between two or more alternative message sequences. |
| `Loop` | Represents a sequence that is repeated until a condition is met. |

```javascript
import { Diagram, SnapConstraints, UmlSequenceDiagramModel, UmlSequenceFragmentType, UmlSequenceMessageType, UmlSequenceParticipantStereotype } from '@syncfusion/ej2-diagrams';

const model = {
  spaceBetweenParticipants: 300,
  participants: [
    { id: 'Customer', content: 'Customer', stereotype: UmlSequenceParticipantStereotype.Actor },
    { id: 'OrderSystem', content: 'Order System' },
    { id: 'PaymentGateway', content: 'Payment Gateway' },
  ],
  messages: [
    {
      id: 'MSG1',
      content: 'Place Order',
      fromParticipantID: 'Customer',
      toParticipantID: 'OrderSystem',
      type: UmlSequenceMessageType.Synchronous,
    },
    {
      id: 'MSG2',
      content: 'Check Stock',
      fromParticipantID: 'OrderSystem',
      toParticipantID: 'OrderSystem',
      type: UmlSequenceMessageType.Synchronous,
    },
    {
      id: 'MSG3',
      content: 'Stock Available',
      fromParticipantID: 'OrderSystem',
      toParticipantID: 'Customer',
      type: UmlSequenceMessageType.Reply,
    },
    {
      id: 'MSG4',
      content: 'Process Payment',
      fromParticipantID: 'OrderSystem',
      toParticipantID: 'PaymentGateway',
      type: UmlSequenceMessageType.Synchronous,
    },
    {
      id: 'MSG5',
      content: 'Payment Successful',
      fromParticipantID: 'PaymentGateway',
      toParticipantID: 'OrderSystem',
      type: UmlSequenceMessageType.Reply,
    },
    {
      id: 'MSG6',
      content: 'Order Confirmed',
      fromParticipantID: 'OrderSystem',
      toParticipantID: 'Customer',
      type: UmlSequenceMessageType.Reply,
    },
    {
      id: 'MSG7',
      content: 'Payment Failed',
      fromParticipantID: 'PaymentGateway',
      toParticipantID: 'OrderSystem',
      type: UmlSequenceMessageType.Reply,
    },
    {
      id: 'MSG8',
      content: 'Retry Payment',
      fromParticipantID: 'OrderSystem',
      toParticipantID: 'Customer',
      type: UmlSequenceMessageType.Reply,
    },
  ],
  fragments: [
    // Optional: only if item is in stock
    {
      id: 1,
      type: UmlSequenceFragmentType.Optional,
      conditions: [{ content: 'if item is in stock', messageIds: ['MSG4'] }],
    },
    // Alternative: payment success vs failure
    {
      id: 2,
      type: UmlSequenceFragmentType.Alternative,
      conditions: [
        { content: 'if payment is successful', messageIds: ['MSG5', 'MSG6'] },
        { content: 'if payment fails', messageIds: ['MSG7', 'MSG8'] },
      ],
    },
    // Loop wraps both child fragments
    {
      id: 3,
      type: UmlSequenceFragmentType.Loop,
      conditions: [{ content: 'while attempts < 3', fragmentIds: ['1', '2'] }],
    },
  ]
};
```
> Use `spaceBetweenParticipants` on the model to increase horizontal spacing when message labels are long.

### Complete Example

```vue
<template>
  <div id="app">
    <ejs-diagram ref="diagramRef" id="diagram" width="100%" height="700px" :snapSettings="snapSettings" />
  </div>
</template>

<script>
import { DiagramComponent, SnapConstraints, UmlSequenceParticipantStereotype, UmlSequenceFragmentType, UmlSequenceMessageType } from '@syncfusion/ej2-vue-diagrams';

const model = {
  participants: [
    {
      id: 'User',
      content: 'User',
      stereotype: UmlSequenceParticipantStereotype.Actor,
    },
    { id: 'System', content: 'System', showDestructionMarker: true },
    { id: 'Logger', content: 'Logger', showDestructionMarker: true },
    { id: 'SessionManager', content: 'SessionManager' },
  ],
  messages: [
    {
      id: 'MSG1',
      content: 'Login Request',
      fromParticipantID: 'User',
      toParticipantID: 'System',
      type: UmlSequenceMessageType.Synchronous,
    },
    {
      id: 'MSG2',
      content: 'Login Response',
      fromParticipantID: 'System',
      toParticipantID: 'User',
      type: UmlSequenceMessageType.Reply,
    },
    {
      id: 'MSG3',
      content: 'Log Event',
      fromParticipantID: 'System',
      toParticipantID: 'Logger',
      type: UmlSequenceMessageType.Asynchronous,
    },
    {
      id: 'MSG4',
      content: 'Create Session',
      fromParticipantID: 'System',
      toParticipantID: 'SessionManager',
      type: UmlSequenceMessageType.Create,
    },
    {
      id: 'MSG5',
      content: 'Delete Session',
      fromParticipantID: 'System',
      toParticipantID: 'SessionManager',
      type: UmlSequenceMessageType.Delete,
    },
    {
      id: 'MSG6',
      content: 'Validate Inputs',
      fromParticipantID: 'System',
      toParticipantID: 'System',
      type: UmlSequenceMessageType.Self,
    },
  ],

  // Define conditional fragments for the flow
  fragments: [
    // Optional: Show only if credentials are valid
    {
      id: 'validationFrag',
      type: UmlSequenceFragmentType.Optional,
      conditions: [
        {
          content: 'if credentials valid',
          messageIds: ['MSG4', 'MSG5', 'MSG6'],
        },
      ],
    },
    // Alternative: Success or Failure
    {
      id: 'resultFrag',
      type: UmlSequenceFragmentType.Alternative,
      conditions: [
        {
          content: 'if login successful',
          messageIds: ['MSG6', 'MSG7'],
        },
        {
          content: 'else login failed',
          messageIds: ['MSG1'], // User tries again
        },
      ],
    },
  ],
};

const snapSettings = { constraints: SnapConstraints.None };

export default {
  name: 'App',
  components: { 'ejs-diagram': DiagramComponent },
  data() {
    return {
      snapSettings: snapSettings,
    };
  },
  mounted() {
    // Retrieve the diagram instance
    const diagramInstance = this.$refs.diagramRef.ej2Instances;
    diagramInstance.model = model;
    diagramInstance.updateFromModel();
  },
};
</script>
<style>
  @import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/diagram/index.css";
</style>
```

UML diagrams enable technical teams to communicate software design, architecture, and object relationships clearly and consistently.
