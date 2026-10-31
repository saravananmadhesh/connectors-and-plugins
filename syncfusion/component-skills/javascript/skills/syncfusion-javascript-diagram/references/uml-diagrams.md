# UML Diagrams

## Table of Contents

- [Overview](#overview)
- [UML Class Diagrams](#uml-class-diagrams)
- [Classifier Shapes](#classifier-shapes)
- [UML Relationships](#uml-relationships)
- [UML Sequence Diagrams](#uml-sequence-diagrams)

## Overview

UML (Unified Modeling Language) diagrams help visualize software architecture and design. Syncfusion Diagram supports UML class diagrams and sequence diagrams for software modeling.

**Key Concepts:**
- **Class Diagrams** - Show system structure, classes, interfaces, relationships
- **Sequence Diagrams** - Show interactions over time between objects
- **Lifelines** - Vertical lines representing object existence
- **Messages** - Interactions between objects

## UML Class Diagrams

### Creating UML Classes

```ts
import { Diagram, NodeModel, UmlClassifierShapeModel } from '@syncfusion/ej2-diagrams';

let umlClass: NodeModel = {
  id: 'employee',
  offsetX: 250,
  offsetY: 250,
  width: 150,
  height: 200,
  
  style: { fill: '#26A0DA' },
  
  shape: {
    type: 'UmlClassifier',
    classifier: 'Class',
    
    // Class structure
    classShape: {
      name: 'Employee',           // Class name
      
      // Class attributes/properties as objects
      attributes: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'string' },
        { name: 'salary', type: 'decimal' },
        { name: 'department', type: 'string' }
      ],
      
      // Class methods as objects
      methods: [
        { name: 'getDetails', type: 'void' },
        { name: 'updateSalary', type: 'void', parameters: [{ name: 'amount', type: 'decimal' }] },
        { name: 'calculateBonus', type: 'decimal' }
      ]
    }
  } as UmlClassifierShapeModel
};

let diagram = new Diagram({
  nodes: [umlClass]
});

diagram.appendTo('#diagram');
```

## Classifier Shapes

### Interface Classifier

```ts
let interfaceClassifier: NodeModel = {
  id: 'interface',
  offsetX: 100,
  offsetY: 100,
  width: 150,
  height: 150,
  
  style: { fill: '#26A0DA' },
  
  shape: {
    type: 'UmlClassifier',
    classifier: 'Interface',
    
    interfaceShape: {
      name: 'IEmployee',
      
      // Interface methods (all public)
      methods: [
        { name: 'getDetails', type: 'void' },
        { name: 'updateRecord', type: 'void' },
        { name: 'getAddress', type: 'string' }
      ]
    }
  } as UmlClassifierShapeModel
};
```

### Enumeration Classifier

```ts
let enumClassifier: NodeModel = {
  id: 'enum',
  offsetX: 100,
  offsetY: 100,
  width: 150,
  height: 150,
  
  style: { fill: '#26A0DA' },
  
  shape: {
    type: 'UmlClassifier',
    classifier: 'Enumeration',
    
    enumerationShape: {
      name: 'Department',
      
      // Enumeration members
      members: [
        { name: 'HR' },
        { name: 'IT' },
        { name: 'Sales' },
        { name: 'Finance' }
      ]
    }
  } as UmlClassifierShapeModel
};
```

## UML Relationships

### Association Relationship

```ts
import { Diagram, ConnectorModel } from '@syncfusion/ej2-diagrams';

let associationConnector: ConnectorModel = {
  id: 'association',
  sourcePoint: { x: 100, y: 100 },
  targetPoint: { x: 300, y: 300 },
  type: 'Straight',
  
  shape: {
    type: 'UmlClassifier',
    relationship: 'Association',
    associationType: 'Default'     // Default or BiDirectional
  },
  
  annotations: [{
    content: 'works in',
    offset: 0.5
  }]
};
```

### Generalization (Inheritance)

```ts
let inheritanceConnector: ConnectorModel = {
  id: 'inheritance',
  sourcePoint: { x: 100, y: 100 },
  targetPoint: { x: 300, y: 300 },
  type: 'Straight',
  
  shape: {
    type: 'UmlClassifier',
    relationship: 'Inheritance'    // Triangle for generalization
  }
};
```

### Realization (Implementation)

```ts
let realizationConnector: ConnectorModel = {
  id: 'realization',
  sourcePoint: { x: 100, y: 100 },
  targetPoint: { x: 300, y: 300 },
  type: 'Straight',
  
  shape: {
    type: 'UmlClassifier',
    relationship: 'Realization'    // Dashed line for implementation
  }
};
```

### Composition Relationship

```ts
let compositionConnector: ConnectorModel = {
  id: 'composition',
  sourcePoint: { x: 100, y: 100 },
  targetPoint: { x: 300, y: 300 },
  type: 'Straight',
  
  shape: {
    type: 'UmlClassifier',
    relationship: 'Composition'    // Filled diamond at source
  },
  
  annotations: [{ content: '1..n' }]  // Multiplicity
};
```

### Aggregation Relationship

```ts
let aggregationConnector: ConnectorModel = {
  id: 'aggregation',
  sourcePoint: { x: 100, y: 100 },
  targetPoint: { x: 300, y: 300 },
  type: 'Straight',
  
  shape: {
    type: 'UmlClassifier',
    relationship: 'Aggregation'    // Hollow diamond at source
  },
  
  annotations: [{ content: '1..n' }]
};
```

### Dependency Relationship

```ts
let dependencyConnector: ConnectorModel = {
  id: 'dependency',
  sourcePoint: { x: 100, y: 100 },
  targetPoint: { x: 300, y: 300 },
  type: 'Straight',
  
  shape: {
    type: 'UmlClassifier',
    relationship: 'Dependency'     // Dashed line with arrow
  }
};
```

### Multiplicity Relationship

Multiplicity defines the cardinality (number of instances) of elements in a relationship. Types supported:

```ts
let multiplicityConnector: ConnectorModel = {
  id: 'connector1',
  sourcePoint: { x: 100, y: 100 },
  targetPoint: { x: 300, y: 300 },
  type: 'Straight',
  
  shape: {
    type: 'UmlClassifier',
    relationship: 'Dependency',
    multiplicity: {
      type: 'OneToOne',           // OneToOne, ManyToOne, OneToMany, ManyToMany
      
      // Source cardinality label
      source: {
        optional: true,
        lowerBounds: '1',
        upperBounds: '1'
      },
      
      // Target cardinality label
      target: {
        optional: false,
        lowerBounds: '1',
        upperBounds: '*'            // '*' means unlimited
      }
    }
  }
};
```

## UML Sequence Diagrams

A UML sequence diagram is an interaction diagram that demonstrates how objects interact with each other and the order of these interactions. Sequence diagrams are created using the `UmlSequenceDiagramModel` and assigned to the `model` property.

### UML Sequence Diagram Setup

```ts
import { Diagram, UmlSequenceDiagramModel, UmlSequenceMessageType, SnapConstraints, UmlSequenceParticipantStereotype } from '@syncfusion/ej2-diagrams';

// Define the model for the UML Sequence Diagram
const umlSequenceDiagramModel: UmlSequenceDiagramModel = {
  // Define participants in the sequence diagram
  participants: [
    { id: 'client', content: 'Client', stereotype: UmlSequenceParticipantStereotype.Actor, showDestructionMarker: false },
    { id: 'server', content: 'Server', stereotype: UmlSequenceParticipantStereotype.Control },
    { id: 'database', content: 'Database', stereotype: UmlSequenceParticipantStereotype.Database, showDestructionMarker: true  }
  ],
  
  // Define messages exchanged between participants
  messages: [
    { id: 'MSG1', content: 'Request', fromParticipantID: 'client', toParticipantID: 'server', type: UmlSequenceMessageType.Synchronous },
    { id: 'MSG2', content: 'Query', fromParticipantID: 'server', toParticipantID: 'database', type: UmlSequenceMessageType.Synchronous },
    { id: 'MSG3', content: 'Data', fromParticipantID: 'database', toParticipantID: 'server', type: UmlSequenceMessageType.Reply },
    { id: 'MSG4', content: 'Response', fromParticipantID: 'server', toParticipantID: 'client', type: UmlSequenceMessageType.Reply }
  ]
};

let diagram = new Diagram({
  width: '100%',
  height: '600px',
  model: umlSequenceDiagramModel,
  snapSettings: { constraints: SnapConstraints.None }
});

diagram.appendTo('#element');
```

### Participants

Participants represent the entities (actors or objects) that interact in the sequence diagram. Each participant is displayed with a lifeline extending downward.

#### UmlSequenceParticipantModel Properties

| Property | Type | Description |
|---|---|---|
| `id` | string \| number | A unique identifier for the participant. |
| `content` | string | The display text of the participant. |
| `showDestructionMarker` | boolean | Indicates whether a destruction marker (X) is shown at the end of the participant lifeline. |
| `activationBoxes` | UmlSequenceActivationBoxModel[] | A collection of activation boxes associated with the participant. |
| `stereotype` | UmlSequenceParticipantStereotype | The visual stereotype used to render the participant header. |

#### Participant Stereotypes

The `UmlSequenceParticipantStereotype` enum defines the visual style of a participant:

| Stereotype | Description |
|---|---|
| `Default` | Standard object participant displayed as a labeled rectangle. |
| `Actor` | External person or system that interacts with the process. |
| `Boundary` | Interface or entry point, such as a UI, API gateway, or external system. |
| `Control` | Object that manages the flow, such as a controller or coordinator. |
| `Entity` | Object that represents data, domain objects, or stored information. |
| `Database` | Database or persistent storage system, displayed using a cylindrical shape. |

```ts
import { Diagram, UmlSequenceDiagramModel, UmlSequenceParticipantStereotype } from '@syncfusion/ej2-diagrams';

const participants = [
  { 
    id: 'User', 
    content: 'User',
    stereotype: UmlSequenceParticipantStereotype.Actor,
    showDestructionMarker: false
  },
  { 
    id: 'Browser', 
    content: 'Browser', 
    stereotype: UmlSequenceParticipantStereotype.Boundary
  },
  { 
    id: 'Server', 
    content: 'Server', 
    stereotype: UmlSequenceParticipantStereotype.Control
  },
  { 
    id: 'Database', 
    content: 'Database',
    stereotype: UmlSequenceParticipantStereotype.Database,
    showDestructionMarker: true 
  }
];
```

### Messages

Messages represent communication between participants and are displayed as arrows connecting lifelines. EJ2 supports multiple message types:

#### UmlSequenceMessageModel Properties

| Property | Type | Description |
|---|---|---|
| `id` | string \| number | A unique identifier for the message |
| `content` | string | The display text for the message |
| `fromParticipantID` | string \| number | ID of the participant sending the message |
| `toParticipantID` | string \| number | ID of the participant receiving the message |
| `type` | UmlSequenceMessageType | Type of the message (Synchronous, Asynchronous, Reply, Create, Delete, Self) |

#### Message Types

| Message Type | Description | Symbol |
|---|---|---|
| `Synchronous` | The sender waits for a response | Solid arrow |
| `Asynchronous` | The sender continues without waiting | Open arrow |
| `Reply` | A response to a previous message | Dashed arrow |
| `Create` | Creates a new participant | Arrow to new participant |
| `Delete` | Terminates a participant | Arrow with X |
| `Self` | A message from a participant to itself | Loop arrow |

```ts
const umlSequenceDiagramModel: UmlSequenceDiagramModel = {
  participants: [
    {
      id: 'Customer', content: 'Customer',
      stereotype: UmlSequenceParticipantStereotype.Actor,
    },
    { id: 'Server', content: 'Server' },
    {
      id: 'DB', content: 'Database',
      stereotype: UmlSequenceParticipantStereotype.Database,
    },
    {
      id: 'Browser', content: 'Browser',
      stereotype: UmlSequenceParticipantStereotype.Boundary,
    },
  ],
  messages: [
    {
      id: 'msg1',
      fromParticipantID: 'Customer',
      toParticipantID: 'Server',
      content: 'POST /orders',
      type: UmlSequenceMessageType.Synchronous,
    },
    {
      id: 'msg2',
      fromParticipantID: 'Server',
      toParticipantID: 'DB',
      content: 'INSERT order',
      type: UmlSequenceMessageType.Asynchronous,
    },
    {
      id: 'msg3',
      fromParticipantID: 'DB',
      toParticipantID: 'Server',
      content: 'OK',
      type: UmlSequenceMessageType.Reply,
    },
    {
      id: 'msg4',
      fromParticipantID: 'Server',
      toParticipantID: 'Server',
      content: '201 Created',
      type: UmlSequenceMessageType.Self,
    },
    {
      id: 'msg5',
      content: 'Create Session',
      fromParticipantID: 'DB',
      toParticipantID: 'Browser',
      type: UmlSequenceMessageType.Create,
    },
    {
      id: 'msg6',
      content: 'Destroy',
      fromParticipantID: 'Customer',
      toParticipantID: 'Server',
      type: UmlSequenceMessageType.Delete,
    },
  ],
};
```

### Activation Boxes

Activation boxes (or activation lifelines) represent periods when a participant is active and processing a message. They appear as thin rectangles on participant lifelines.

#### UmlSequenceActivationBoxModel Properties

| Property | Type | Description |
|---|---|---|
| `id` | string \| number | A unique identifier for the activation box |
| `startMessageID` | string \| number | ID of the message that initiates the activation |
| `endMessageID` | string \| number | ID of the message that terminates the activation |

```ts
const umlSequenceDiagramModel: UmlSequenceDiagramModel = {
  participants: [
    {
      id: 'Client',
      content: 'Client',
      stereotype: UmlSequenceParticipantStereotype.Actor,
      activationBoxes: [
        { id: 'act1', startMessageID: 'req1', endMessageID: 'res1' }
      ]
    },
    {
      id: 'Server',
      content: 'Server',
      activationBoxes: [
        { id: 'act2', startMessageID: 'req1', endMessageID: 'res1' }
      ]
    }
  ],
  messages: [
    { id: 'req1', fromParticipantID: 'Client', toParticipantID: 'Server', content: 'Request', type: UmlSequenceMessageType.Synchronous },
    { id: 'res1', fromParticipantID: 'Server', toParticipantID: 'Client', content: 'Response', type: UmlSequenceMessageType.Reply }
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

```ts
import { Diagram, SnapConstraints, UmlSequenceDiagramModel, UmlSequenceFragmentType, UmlSequenceMessageType, UmlSequenceParticipantStereotype } from '@syncfusion/ej2-diagrams';

const model: UmlSequenceDiagramModel = {
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
  ],
};
```
> Use `spaceBetweenParticipants` on the model to increase horizontal spacing when message labels are long.

## Complete Example: User Login Sequence

A complete user login flow demonstrating interactions between User, Client, Server, and Database:

```ts
import { Diagram, UmlSequenceDiagramModel, UmlSequenceParticipantStereotype, UmlSequenceMessageType, UmlSequenceFragmentType, SnapConstraints } from '@syncfusion/ej2-diagrams';

const loginSequenceModel: UmlSequenceDiagramModel = {
  spaceBetweenParticipants: 250,
  
  // Define all participants in the login flow
  participants: [
    { id: 'User', content: 'User', stereotype: UmlSequenceParticipantStereotype.Actor },
    { id: 'Client', content: 'Client Application', stereotype: UmlSequenceParticipantStereotype.Boundary },
    { id: 'Server', content: 'Authentication Server', stereotype: UmlSequenceParticipantStereotype.Entity },
    { id: 'Database', content: 'Database', stereotype: UmlSequenceParticipantStereotype.Database }
  ],
  // Define all messages exchanged during login
  messages: [
    // User enters credentials and submits
    { id: 'MSG1', content: 'Enter Credentials', fromParticipantID: 'User', toParticipantID: 'Client', type: UmlSequenceMessageType.Synchronous },
    
    // Client sends login request to server
    { id: 'MSG2', content: 'POST /login', fromParticipantID: 'Client', toParticipantID: 'Server', type: UmlSequenceMessageType.Synchronous },
    
    // Server validates credentials with database
    { id: 'MSG3', content: 'Query User', fromParticipantID: 'Server', toParticipantID: 'Database', type: UmlSequenceMessageType.Asynchronous },
    
    // Database returns user data
    { id: 'MSG4', content: 'User Data', fromParticipantID: 'Database', toParticipantID: 'Server', type: UmlSequenceMessageType.Reply },
    
    // Server processes login (internal operation)
    { id: 'MSG5', content: 'Validate & Create Session', fromParticipantID: 'Server', toParticipantID: 'Server', type: UmlSequenceMessageType.Self },
    
    // Server returns session token to client
    { id: 'MSG6', content: 'Session Token', fromParticipantID: 'Server', toParticipantID: 'Client', type: UmlSequenceMessageType.Delete },
    
    // Client displays success and stores token
    { id: 'MSG7', content: 'Login Success', fromParticipantID: 'Client', toParticipantID: 'User', type: UmlSequenceMessageType.Reply }
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
          messageIds: ['MSG4', 'MSG5', 'MSG6']
        }
      ]
    },
    // Alternative: Success or Failure
    {
      id: 'resultFrag',
      type: UmlSequenceFragmentType.Alternative,
      conditions: [
        {
          content: 'if login successful',
          messageIds: ['MSG6', 'MSG7']
        },
        {
          content: 'else login failed',
          messageIds: ['MSG1']  // User tries again
        }
      ]
    }
  ]
};

// Initialize diagram with sequence model
let diagram = new Diagram({
  width: '100%',
  height: '700px',
  model: loginSequenceModel,
  snapSettings: { constraints: SnapConstraints.None }
});

diagram.appendTo('#element');
```

## Next Steps

- **Swimlanes:** [swimlanes.md](swimlanes.md)
- **BPMN Diagrams:** [bpmn-diagrams.md](bpmn-diagrams.md)
- **Export Diagrams:** [serialization-and-export.md](serialization-and-export.md)
