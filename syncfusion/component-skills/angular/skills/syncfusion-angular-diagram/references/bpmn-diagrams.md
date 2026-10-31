# BPMN Diagrams

## Table of Contents
- [Overview](#overview)
- [BPMN Setup](#bpmn-setup)
- [BPMN Shapes](#bpmn-shapes)
- [Activities](#activities)
- [Events](#events)
- [Gateways](#gateways)
- [Flows](#flows)
- [Data Elements](#data-elements)
- [Groups and Annotations](#groups-and-annotations)

## Overview

**BPMN (Business Process Model and Notation)** is a standardized language for modeling business processes.

Syncfusion provides built-in BPMN shape libraries and styling.

### BPMN Concepts

- **Activities** - Work performed (tasks, subprocesses)
- **Events** - Things that happen (start, end, intermediate)
- **Gateways** - Decision points that route flow
- **Flows** - Connections between elements (sequence flow, message flow, association)
- **Data** - Objects and sources used in the process
- **Groups** - Logical grouping of elements

---

## BPMN Setup

### Enable BPMN Module

```typescript
import { Component } from '@angular/core';
import {
  Diagram,
  DiagramModule,
} from '@syncfusion/ej2-angular-diagrams';
Diagram.Inject(BpmnDiagrams);

import { BpmnDiagrams } from '@syncfusion/ej2-angular-diagrams';

@Component({
  selector: 'app-bpmn',
  template: `<ejs-diagram #diagram id="diagram" width="100%" height="500px"></ejs-diagram>`,
  standalone:true,
  imports:[DiagramModule]
})
export class BpmnComponent {}
```

### Basic BPMN Diagram

```typescript
nodes = [
  // Start event
  {
    id: 'start',
    width: 50,
    height: 50,
    offsetX: 100,
    offsetY: 100,
    shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start' } }
  },
  // Task
  {
    id: 'task1',
    width: 100,
    height: 80,
    offsetX: 250,
    offsetY: 100,
    shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task' } } // Sets the type of the task as task: {type: 'Service'}
  },
  // End event
  {
    id: 'end',
    width: 50,
    height: 50,
    offsetX: 400,
    offsetY: 100,
    shape: { type: 'Bpmn', shape: 'Event', event: { event: 'End' } }
  }
];

connectors = [
  { id: 'conn1', sourceID: 'start', targetID: 'task1' },
  { id: 'conn2', sourceID: 'task1', targetID: 'end' }
];
```

---

## BPMN Shapes

### Shape Structure

```typescript
  shape: {
    type: 'Bpmn',
    shape: 'Activity' | 'Event' | 'Gateway' | 'Flow' | 'DataObject' | 'DataSource' | 'Group',
    // Use the correct sub-property for each BPMN type:
    // - activity: { activity: 'Task' | 'SubProcess' | ... }
    // - event: { event: 'Start' | 'End' | 'Intermediate', trigger: ... }
    // - gateway: { type: 'Exclusive' | 'Parallel' | ... }
    // - dataObject: { ... }
    // - textAnnotation: { ... }
  }
```

---

## Activities

Activities represent work performed in the process:

### Basic Task

```typescript
{
  id: 'task1',
  width: 100,
  height: 80,
  offsetX: 250,
  offsetY: 100,
  shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task' } } //Sets the type of the task as Sendtask: {type: 'Service'}
}
```

### Subprocess

A task containing other activities (collapsed):

```typescript
{
  id: 'subprocess',
  width: 100,
  height: 80,
  shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'SubProcess' } }
}
```

### Expanded Subprocess

Subprocess showing inner activities:

```typescript
{
  id: 'expandedSubprocess',
  width: 300,
  height: 200,
  shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'SubProcess', collapsed: false } }
  // Contains child nodes inside
}
```

### Activity Types

```typescript
// Use the activity property:
activity: { activity: 'Task' }                    // Basic work
activity: { activity: 'SubProcess', collapsed: true } // Collapsed subprocess
activity: { activity: 'SubProcess', collapsed: false } // Expanded subprocess
activity: { activity: 'Transaction' }             // Task with compensation
activity: { activity: 'Task', loop: 'Standard' }  // Repeating activity
activity: { activity: 'Task', loop: 'ParallelMultiInstance' } // Parallel instances
activity: { activity: 'Task', loop: 'SequentialMultiInstance' } // Sequential instances
```

### Activity Markers

```typescript
{
  id: 'task1',
  shape: {
    type: 'Bpmn',
    shape: 'Activity',
    activity: {
      activity: 'Task',
      subProcess: {
        collapsed: true,       // Show + or - marker
        type: 'Default',       // Type of subprocess
        adhoc: false,          // Ad-hoc subprocess
        compensation: false    // Compensation activity
      },
      loop: 'None'        // None, Standard, ParallelMultiInstance, SequentialMultiInstance
    }
  }
}
```

---

## Events

Events represent occurrences in the process:

### Start Events

```typescript
{
  id: 'start',
  width: 50,
  height: 50,
  shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start' } }
}
```

### End Events

```typescript
{
  id: 'end',
  width: 50,
  height: 50,
  shape: { type: 'Bpmn', shape: 'Event', event: { event: 'End' } }
}
```

### Intermediate Events

Occur during the process:

```typescript
{
  id: 'intermediate',
  width: 50,
  height: 50,
  shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Intermediate' } }
}
```

### Event Types

Within each event, specify the trigger:

```typescript

event: {
  trigger: 'None' | 'Message' | 'Timer' | 'Escalation' | 'Link' | 'Error' | 'Compensation' | 'Signal' | 'Multiple' | 'ParallelMultiInstance' | 'Conditional' | 'Terminate'
}

// Examples:
{
  id: 'messageStart',
  shape: {
    type: 'Bpmn',
    shape: 'Event',
    event: { event: 'Start', trigger: 'Message' }
  }
}

{
  id: 'timerIntermediate',
  shape: {
    type: 'Bpmn',
    shape: 'Event',
    event: { event: 'Intermediate', trigger: 'Timer' }
  }
}
```

### Event Direction

```typescript

event: {
  trigger: 'Message',
  event: 'Intermediate',
  type: 'Catching'   // Catching (default) or Throwing
}
```

---

## Gateways

Gateways control flow routing:

### Exclusive Gateway (XOR)

Only one path is taken:

```typescript
{
  id: 'decision',
  width: 50,
  height: 50,
  shape: { type: 'Bpmn', shape: 'Gateway', gateway: { type: 'Exclusive' } }
}
```

### Parallel Gateway

All paths are executed:

```typescript
{
  id: 'parallel',
  width: 50,
  height: 50,
  shape: { type: 'Bpmn', shape: 'Gateway', gateway: { type: 'Parallel' } }
}
```

### Inclusive Gateway

One or more paths:

```typescript
{
  id: 'inclusive',
  width: 50,
  height: 50,
  shape: { type: 'Bpmn', shape: 'Gateway', gateway: { type: 'Inclusive' } }
}
```

### Complex Gateway

Complex branching logic:

```typescript
{
  id: 'complex',
  width: 50,
  height: 50,
  shape: { type: 'Bpmn', shape: 'Gateway', gateway: { type: 'Complex' } }
}
```

### Event-based Gateway

Routes based on events:

```typescript
{
  id: 'eventBased',
  width: 50,
  height: 50,
  shape: { type: 'Bpmn', shape: 'Gateway', gateway: { type: 'EventBased' } }
}
```

---

## Flows

Flows are connectors with BPMN semantics:

### Sequence Flow

Normal flow between activities:

```typescript
{
  id: 'flow1',
  sourceID: 'task1',
  targetID: 'task2',
  shape: {
    type: 'Bpmn',
    flow: 'Sequence'
  }
}
```

### Message Flow

Communication between pools/lanes:

```typescript
{
  id: 'messageFlow',
  sourceID: 'task1',
  targetID: 'task2',
  shape: {
    type: 'Bpmn',
    flow: 'Message'
  }
}
```

### Association

Links annotations/gateways to activities:

```typescript
{
  id: 'association',
  sourceID: 'annotation',
  targetID: 'task1',
  shape: {
    type: 'Bpmn',
    flow: 'Association'
  }
}
```

---

## Data Elements

### Data Object

Represents data used in process:

```typescript
{
  id: 'dataObject',
  width: 50,
  height: 70,
  shape: {
    type: 'Bpmn',
    shape: 'DataObject',
    dataObject: {
      collection: false,  // Is it a collection?
      type: 'None'       // Type of data
    }
  }
}
```

### Data Object Reference

Points to a data object:

```typescript
{
  id: 'dataRef',
  width: 50,
  height: 70,
  shape: {
    type: 'Bpmn',
    shape: 'DataObject',
    dataObject: {
      collection: true,
      type: 'Input' // or 'Output'
    }
  }
}
```

### Data Source

External data source:

```typescript
{
  id: 'datasource',
  width: 50,
  height: 70,
  shape: {
    type: 'Bpmn',
    shape: 'DataSource'
  }
}
```

---

## Groups and Annotations

### Group

Logical grouping of elements:

```typescript
{
  id: 'group',
  width: 400,
  height: 300,
  shape: {
    type: 'Bpmn',
    shape: 'Group'
  }
  // Contains child nodes inside
}
```

### Text Annotation

Adds documentation:

```typescript
{
  id: 'annotation',
  width: 100,
  height: 50,
  annotations: [{
    content: 'This is a note about the process'
  }],
  shape: {
    type: 'Bpmn',
    shape: 'TextAnnotation',
  }
}
```

---

## Troubleshooting BPMN Common Issues

### ❌ BPMN Shapes Not Rendering

**Problem:** BPMN shapes appear as basic rectangles instead of BPMN-specific shapes.

**Solution:** Ensure BpmnDiagrams module is injected:

```typescript
import { Diagram, BpmnDiagrams } from '@syncfusion/ej2-angular-diagrams';
Diagram.Inject(BpmnDiagrams);
```

### ❌ Gateway Logic Not Working

**Problem:** Sequence flows not routing correctly through gateways.

**Solution:** Use proper connector configuration with gateway types:

```typescript
// Define gateway correctly
{
  id: 'xor_gate',
  shape: { type: 'Bpmn', shape: 'Gateway',  gateway: { type: 'Exclusive' } }
}

// Use labeled connectors for decision paths
connectors = [
  {
    id: 'yes_path',
    sourceID: 'xor_gate',
    targetID: 'success_task',
    annotations: [{ content: 'Yes' }]
  },
  {
    id: 'no_path',
    sourceID: 'xor_gate',
    targetID: 'reject_task',
    annotations: [{ content: 'No' }]
  }
];
```

### ❌ Export Not Working

**Problem:** Export fails or produces blank images.

**Solution:** Ensure diagram content is fully loaded before exporting:

```typescript
// Wait for diagram to initialize
ngAfterViewInit() {
  setTimeout(() => {
    this.diagram.exportDiagram({format: 'PNG', fileName: 'bpmn-process'});
  }, 500);
}
```

### ⚠️ BPMN Best Practices

1. **Always inject BpmnDiagrams** at component level - not using it breaks rendering
2. **Use Swimlane module** for department/role separation in complex workflows
3. **Label all decision paths** with 'Yes'/'No' or condition names
4. **Group related activities** using Groups or SubProcess shapes
5. **Use consistent naming** for events (Start_ApplicationReview, End_Approved, etc.)
6. **Test with swimlanes early** - adding swimlanes to existing nodes requires restructuring

---

**→ Next: Create [UML diagrams](uml-diagrams.md) for system design**
