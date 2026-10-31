# UML Diagrams

## Table of Contents
- [Overview](#overview)
- [Class Diagrams](#class-diagrams)
- [Classifiers](#classifiers)
- [UML Relationships](#uml-relationships)
- [Sequence Diagrams](#sequence-diagrams)
- [Sequence Participants](#sequence-participants)
- [Sequence Messages](#sequence-messages)
- [Activation Boxes](#activation-boxes)
- [Fragments](#fragments)

## Overview

**UML (Unified Modeling Language)** provides standardized notation for system design and documentation.

Syncfusion supports:
- **Class Diagrams** - Show classes, attributes, methods, and relationships
- **Sequence Diagrams** - Show message interactions over time with participants, lifelines, and activation boxes

### When to Use UML Diagrams

- **Class Diagrams**: Model system architecture, show inheritance hierarchies, visualize relationships between classes
- **Sequence Diagrams**: Document API workflows, show interaction sequences, design system interactions

---

## Class Diagrams

Class diagrams show the structure and relationships of classes in a system.

### Basic Class Node

```typescript
{
  id: 'class1',
  width: 150,
  height: 150,
  offsetX: 200,
  offsetY: 150,
  shape: {
    type: 'UmlClassifier', // Correct type for UML class
    classifier: 'Class',
    attributes: [
      {
        name: 'id',
        type: 'int',
        isSeparator: false
      },
      {
        name: 'name',
        type: 'string',
        isSeparator: false
      }
    ],
    methods: [
      {
        name: 'getName',
        parameters: [], // Correct property name is 'parameters'
        type: 'string'
      },
      {
        name: 'setName',
        parameters: [{ name: 'name', type: 'string' }],
        type: 'void'
      }
    ]
  }
}
```

### Class Node Structure

```typescript
shape: {
  type: 'UmlClassifier',
  classifier: 'Class',
  attributes: [       // Class properties
    {
      name: 'id',
      type: 'int',
      visibility: 'Private'  // Private, Public, Protected, Package
    }
  ],
  methods: [          // Class operations/methods
    {
      name: 'getName',
      parameters: [],  // Method parameters
      type: 'string',  // Return type
      visibility: 'Public'
    }
  ]
}
```

---

## Classifiers

### Class Classifier

Standard class shape:

```typescript
classifier: 'Class'
```

### Interface Classifier

Shows interface contract:

```typescript
classifier: 'Interface'
```

### Enumeration Classifier

Shows enum values:

```typescript
classifier: 'Enumeration',
enumMembers: [
  { name: 'RED' },
  { name: 'GREEN' },
  { name: 'BLUE' }
]
```

### Package Classifier

Groups related classes:

```typescript
classifier: 'Package'
```

### Component Classifier

Represents a reusable component:

```typescript
classifier: 'Component'
```

### Visibility Modifiers

```typescript
visibility: 'Public'       // + (accessible everywhere)
visibility: 'Private'      // - (accessible within class)
visibility: 'Protected'    // # (accessible in subclasses)
visibility: 'Package'      // ~ (accessible in same package)
```

### Abstract Classes

```typescript
isAbstract: true  // Class name appears in italics
```

### Static Members

```typescript
attributes: [
  {
    name: 'count',
    isStatic: true       // Underlined in diagram
  }
]
```

---

## UML Relationships

Relationships show how classes are connected:

### Association

Generic relationship between classes:

```typescript
{
  id: 'association',
  sourceID: 'class1',
  targetID: 'class2',
  relationship: 'Association',
  sourceMultiplicity: '1',    // Cardinality at source
  targetMultiplicity: '*'     // Cardinality at target (0..*, 1..*, 1..1, etc.)
}
```

### Generalization (Inheritance)

Subclass inherits from superclass:

```typescript
{
  id: 'generalization',
  sourceID: 'subclass',
  targetID: 'superclass',
  relationship: 'Generalization'
  // Shown as unfilled triangle arrow
}
```

### Realization (Interface Implementation)

Class implements interface:

```typescript
{
  id: 'realization',
  sourceID: 'class',
  targetID: 'interface',
  relationship: 'Realization'
  // Shown as dashed line with unfilled triangle
}
```

### Aggregation

"Has-a" relationship (whole-part, but part can exist independently):

```typescript
{
  id: 'aggregation',
  sourceID: 'wholeClass',
  targetID: 'partClass',
  relationship: 'Aggregation'
  // Shown as hollow diamond at whole end
}
```

### Composition

Strong "has-a" relationship (part cannot exist without whole):

```typescript
{
  id: 'composition',
  sourceID: 'ownerClass',
  targetID: 'ownedClass',
  relationship: 'Composition'
  // Shown as filled diamond at owner end
}
```

### Dependency

One class depends on another:

```typescript
{
  id: 'dependency',
  sourceID: 'class1',
  targetID: 'class2',
  relationship: 'Dependency'
  // Shown as dashed line with arrow
}
```

---

## Sequence Diagrams

Sequence diagrams visualize how objects communicate over time, showing the sequence of messages exchanged between participants. The `UmlSequenceDiagramModel` provides comprehensive support for UML sequence diagram creation.

### Key Elements

- **Participants**: Actors or objects participating in the interaction
- **Lifelines**: Vertical dashed lines representing participant existence over time
- **Messages**: Arrows showing communication between participants
- **Activation Boxes**: Rectangles on lifelines showing active processing periods
- **Sequence Flow**: Messages flow top-to-bottom in chronological order

---

## Sequence Participants

Participants are entities in the interaction sequence, displayed as boxes at the top with lifelines extending downward.

### Participant Types and Stereotypes

| Stereotype | Description | Usage |
|---|---|---|
| **Default** | Standard object participant (rectangle) | System components, classes |
| **Actor** | Human user (stick figure) | External actors, users |
| **Boundary** | System interface (UI, API gateway) | API endpoints, UI components |
| **Control** | Coordinator or workflow controller | Control logic, managers |
| **Entity** | Persistent data or domain object | Database objects, domain models |
| **Database** | Database storage (cylinder shape) | Database systems, storage |

### Participant Properties

| Property | Type | Description |
|---|---|---|
| `id` | string | Unique identifier for the participant |
| `content` | string | Display text for the participant |
| `stereotype` | UmlSequenceParticipantStereotype | Visual style (Actor, Boundary, Control, Entity, Database, Default) |
| `showDestructionMarker` | boolean | Shows "X" marker at end of lifeline (participant is destroyed) |
| `activationBoxes` | Array | Collection of activation boxes for this participant |

### Creating Participants

```typescript

import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { DiagramComponent, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { UmlSequenceDiagramModel, UmlSequenceParticipantStereotype, UmlSequenceMessageType } from '@syncfusion/ej2-diagrams';

@Component({
  selector: 'app-container',
  imports: [DiagramModule],
  providers: [],
  standalone: true,
  template: `
    <ejs-diagram #diagram id="diagram" width="100%" height="600px"
      [model]="umlSequenceModel"></ejs-diagram>
  `,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @ViewChild('diagram') diagram!: DiagramComponent;

  umlSequenceModel: UmlSequenceDiagramModel = {
    participants: [
      {
        id: 'user',
        content: 'User',
        stereotype: UmlSequenceParticipantStereotype.Actor
      },
      {
        id: 'webUI',
        content: 'Web UI',
        stereotype: UmlSequenceParticipantStereotype.Boundary
      },
      {
        id: 'apiServer',
        content: 'API Server',
        stereotype: UmlSequenceParticipantStereotype.Control
      },
      {
        id: 'database',
        content: 'Database',
        stereotype: UmlSequenceParticipantStereotype.Database
      },
      {
        id: "System", // Unique identifier for the participant
        content: "System", // Label or name of the participant
        // Flag to show destruction marker at the end of the lifeline
        showDestructionMarker: true,
        // Activation boxes for System
        activationBoxes: [
          {
            id: "ActSystem", // Unique identifier for the activation box
            startMessageID: "MSG1", // Message ID that marks the start of the activation
            endMessageID: "MSG2" // Message ID that marks the end of the activation
          }
        ]
      }
    ],
    // Define messages exchanged between participants
    messages: [
      {
        id: "MSG1", content: "Login Request", fromParticipantID: "user", toParticipantID: "System",
        type: UmlSequenceMessageType.Synchronous
      },
      {
        id: "MSG2", content: "Login Response", fromParticipantID: "System", toParticipantID: "user",
        type: UmlSequenceMessageType.Reply
      }
    ],
  };
}
```
---

## Sequence Messages

Messages represent communication between participants, displayed as arrows with different styles based on message type.

### Message Types

| Type | Arrow | When to Use |
|---|---|---|
| **Synchronous** | Solid arrow with filled head | Method calls, API requests requiring response |
| **Asynchronous** | Open arrow | Event notifications, fire-and-forget operations |
| **Reply** | Dashed arrow | Return values, acknowledgments to synchronous calls |
| **Create** | Arrow to participant | Object instantiation during execution |
| **Delete** | X marker on lifeline | Object destruction, service termination |
| **Self** | Arrow to same lifeline | Internal processing, recursive calls |

### Message Properties

| Property | Type | Description |
|---|---|---|
| `id` | string | Unique message identifier |
| `content` | string | Message label/text |
| `fromParticipantID` | string | ID of sending participant |
| `toParticipantID` | string | ID of receiving participant |
| `type` | UmlSequenceMessageType | Message type (Synchronous, Asynchronous, Reply, Create, Delete, Self) |

### Creating Messages

```typescript
umlSequenceModel: UmlSequenceDiagramModel = {
  participants: [
    { id: "User", content: "User", stereotype: UmlSequenceParticipantStereotype.Actor },
    { id: "System", content: "System", showDestructionMarker: true, },
    { id: "Logger", content: "Logger", showDestructionMarker: true, },
    { id: "SessionManager", content: "SessionManager" }
  ],
  messages: [
    {
      id: 'message1',
      fromParticipantID: 'User',
      toParticipantID: 'System',
      type: UmlSequenceMessageType.Synchronous,
      content: 'Login Request'
    },
    {
      id: 'message2',
      fromParticipantID: 'System',
      toParticipantID: 'User',
      type: UmlSequenceMessageType.Reply,
      content: 'Authenticate User'
    },
    {
      id: 'message3',
      fromParticipantID: 'System',
      toParticipantID: 'Logger',
      type: UmlSequenceMessageType.Asynchronous,
      content: 'Query User'
    },
    {
      id: 'message4',
      fromParticipantID: 'System',
      toParticipantID: 'SessionManager',
      type: UmlSequenceMessageType.Create,
      content: 'User Data'
    },
    {
      id: 'message5',
      fromParticipantID: 'System',
      toParticipantID: 'SessionManager',
      type: UmlSequenceMessageType.Delete,
      content: 'Login Success'
    },
    {
      id: 'message6',
      fromParticipantID: 'System',
      toParticipantID: 'System',
      type: UmlSequenceMessageType.Self,
      content: 'Dashboard'
    }
  ]
};
```

---

## Activation Boxes

Activation boxes represent periods when a participant is actively processing, shown as thin rectangles on the lifeline.

### Activation Box Properties

| Property | Type | Description |
|---|---|---|
| `id` | string | Unique activation box identifier |
| `startMessageID` | string | ID of message that initiates activation |
| `endMessageID` | string | ID of message that terminates activation |

### Creating Activation Boxes

```typescript
umlSequenceModel: UmlSequenceDiagramModel = {
  participants: [
    {
      id: "System",
      content: "System",
      activationBoxes: [
        {
          id: "ActSystem",
          startMessageID: "MSG1",
          endMessageID: "MSG2"
        }
      ]
    }
  ]
};
```

### Destruction Markers

Show when a participant is terminated:

```typescript
participants: [
  {
    id: 'object1',
    content: 'Temporary Object',
    showDestructionMarker: true  // Shows X at end of lifeline
  }
]
```
---

## Fragments

Fragments are used to group messages based on specific control-flow conditions such as optional execution, branching logic, and repetition. They help organize complex interaction flows within a sequence diagram.

### Common Use Cases

- Optional processing that executes only when a condition is met.
- Alternative execution paths (if/else scenarios).
- Repeated operations using loops.
- Retry workflows and validation cycles.
- Nested interaction flows and complex business processes.

### Fragment Types

The `UmlSequenceFragmentType` enum supports the following fragment types:

| Type | Description | Common Usage |
|--------|-------------|-------------|
| `Optional` | Executes enclosed messages only when a condition is satisfied | Optional validations, feature flags |
| `Alternative` | Provides multiple conditional paths where only one executes | Decision trees, success/failure scenarios |
| `Loop` | Repeats enclosed interactions based on a loop condition | Retry mechanisms, iterative processing |

### Fragment Properties

Fragments are defined using `UmlSequenceFragmentModel`.

| Property | Description |
|-----------|-------------|
| `id` | Unique identifier for the fragment |
| `type` | Fragment type (`Optional`, `Alternative`, `Loop`) |
| `conditions` | Collection of conditions associated with the fragment |

### Fragment Condition Properties

Fragment conditions are defined using `UmlSequenceFragmentConditionModel`.

| Property | Description |
|-----------|-------------|
| `content` | Condition or descriptive text |
| `messageIds` | Collection of message IDs included in the condition |
| `fragmentIds` | Collection of nested fragment IDs |

#### Creating Fragments

The following example illustrates how to create fragments with different condition types:

```ts
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DiagramComponent, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { UmlSequenceDiagramModel, UmlSequenceMessageType, UmlSequenceFragmentType, SnapSettingsModel, SnapConstraints, UmlSequenceParticipantStereotype } from "@syncfusion/ej2-diagrams";

@Component({
  imports: [DiagramModule],
  standalone: true,
  selector: 'app-container',
  template: `<ejs-diagram #diagram id="diagram" width="100%" height="700px"
  [model]="umlSequenceModel"></ejs-diagram>`,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  @ViewChild('diagram', { static: false })
  public diagram?: DiagramComponent;
  public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };

  // Define the UML Sequence Diagram model
  umlSequenceModel: UmlSequenceDiagramModel = {
    // Define the space between participants
    spaceBetweenParticipants: 300,
    participants: [
      { id: "Customer", content: "Customer", stereotype: UmlSequenceParticipantStereotype.Actor },
      { id: "OrderSystem", content: "Order System"},
      { id: "PaymentGateway", content: "Payment Gateway" }
    ],
    // Define the messages passed between participants
    messages: [
      {
        id: "MSG1", content: "Place Order", fromParticipantID: "Customer", toParticipantID: "OrderSystem",
        type: UmlSequenceMessageType.Synchronous
      },
      {
        id: "MSG2", content: "Check Stock Availability", fromParticipantID: "OrderSystem", toParticipantID: "OrderSystem",
        type: UmlSequenceMessageType.Synchronous
      },
      {
        id: "MSG3", content: "Stock Available", fromParticipantID: "OrderSystem", toParticipantID: "Customer",
        type: UmlSequenceMessageType.Reply
      },
      {
        id: "MSG4", content: "Process Payment", fromParticipantID: "OrderSystem", toParticipantID: "PaymentGateway",
        type: UmlSequenceMessageType.Synchronous
      },
      {
        id: "MSG5", content: "Payment Successful", fromParticipantID: "PaymentGateway", toParticipantID: "OrderSystem",
        type: UmlSequenceMessageType.Reply
      },
      {
        id: "MSG6", content: "Order Confirmed and Shipped", fromParticipantID: "OrderSystem", toParticipantID: "Customer",
        type: UmlSequenceMessageType.Reply
      },
      {
        id: "MSG7", content: "Payment Failed", fromParticipantID: "PaymentGateway", toParticipantID: "OrderSystem",
        type: UmlSequenceMessageType.Reply
      },
      {
        id: "MSG8", content: "Retry Payment", fromParticipantID: "OrderSystem", toParticipantID: "Customer",
        type: UmlSequenceMessageType.Reply
      }
    ],
    // Define fragments for conditional visual representation
    fragments: [
      // Child Fragment 1 (Optional)
      {
        id: 1,
        type: UmlSequenceFragmentType.Optional,
        conditions: [
          {
            content: "if item is in stock",
            messageIds: ["MSG4"]
          }
        ]
      },
      // Child Fragment 2 (Alternative)
      {
        id: 2,
        type: UmlSequenceFragmentType.Alternative,
        conditions: [
          {
            content: "if payment is successful",
            messageIds: ["MSG5", "MSG6"]
          },
          {
            content: "if payment fails",
            messageIds: ["MSG7", "MSG8"]
          }
        ]
      },
      // Parent Fragment (Loop)
      {
        id: 3,
        type: UmlSequenceFragmentType.Loop,
        conditions: [
          {
            content: "while attempts less than 3",
            // Use IDs of child fragments for nested conditions
            fragmentIds: ['1', '2'],
          }
        ]
      },
    ],
  };
}
```

### Customization Options

#### Adjusting Participant Spacing

Adjust this value to accommodate longer message labels or improve diagram readability.

```ts
// Define the UML Sequence Diagram model with custom spacing
const model: UmlSequenceDiagramModel = {
  // Increase space between participants for better readability
  spaceBetweenParticipants: 300,
  participants: participants,    // collection of participants in the sequence diagram  
  messages: messages,            // collection of messages exchanged between participants  
  fragments: fragments           // collection of sequence diagram fragments (opt, alt, loop) 
}
```
---

**→ Next: Organize diagrams with [automatic layouts](layouts.md)**
