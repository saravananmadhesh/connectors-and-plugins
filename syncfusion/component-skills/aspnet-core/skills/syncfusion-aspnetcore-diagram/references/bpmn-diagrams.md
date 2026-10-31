# BPMN Diagrams in Syncfusion ASP.NET Core Diagram

## Table of Contents
- [Module Injection](#module-injection)
- [BPMN Events](#bpmn-events)
- [BPMN Gateways](#bpmn-gateways)
- [BPMN Activities (Tasks and Sub-Processes)](#bpmn-activities-tasks-and-sub-processes)
- [BPMN Data Objects](#bpmn-data-objects)
- [BPMN Annotations](#bpmn-annotations)
- [BPMN Connectors](#bpmn-connectors)
- [Complete Process Example](#complete-process-example)

## Module Injection

BPMN support requires injecting the `BpmnDiagrams` module via JavaScript after the page loads:

```javascript
ej.diagrams.Diagram.Inject(ej.diagrams.BpmnDiagrams);
```

Place this in a `<script>` block that runs after `<ejs-scripts>`:

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px" nodes="@ViewBag.nodes">
</ejs-diagram>
<ejs-scripts></ejs-scripts>
<script>
    ej.diagrams.Diagram.Inject(ej.diagrams.BpmnDiagrams);
</script>
```

## BPMN Events

BPMN Events represent things that happen. Set `Type = "Bpmn"` and `Shape = "event"` with the `Event` property:

```csharp
// Start Event
new DiagramNode
{
    Id = "startEvent",
    OffsetX = 100, OffsetY = 200, Width = 50, Height = 50,
    Shape = new BpmnShapes
    {
        Type = "Bpmn",
        Shape = "event",
        Event = new DiagramBpmnEvent
        {
            Event = BpmnEvents.Start,
            Trigger = BpmnTriggers.None
        }
    }
}

// End Event
new DiagramNode
{
    Id = "endEvent",
    OffsetX = 500, OffsetY = 200, Width = 50, Height = 50,
    Shape = new BpmnShapes
    {
        Type = "Bpmn",
        Shape = "event",
        Event = new DiagramBpmnEvent
        {
            Event = BpmnEvents.End,
            Trigger = BpmnTriggers.None
        }
    }
}

// Intermediate Message Catching Event
new DiagramNode
{
    Id = "msgEvent",
    OffsetX = 300, OffsetY = 200, Width = 50, Height = 50,
    Shape = new BpmnShapes
    {
        Type = "Bpmn",
        Shape = "event",
        Event = new DiagramBpmnEvent
        {
            Event = BpmnEvents.Intermediate,
            Trigger = BpmnTriggers.Message
        }
    }
}
```

### Event Types (`BpmnEvents`)

| Value | Description |
|-------|-------------|
| `Start` | Process start (thin border) |
| `Intermediate` | Intermediate event (double border) |
| `End` | Process end (thick border) |
| `NonInterruptingStart` | Non-interrupting start (dashed) |
| `NonInterruptingIntermediate` | Non-interrupting intermediate |
| `ThrowingIntermediate` | Throwing intermediate |

### Trigger Types (`BpmnTriggers`)

`None`, `Message`, `Timer`, `Conditional`, `Link`, `Signal`, `Error`, `Escalation`, `Termination`, `Compensation`, `Cancel`, `Multiple`, `Parallel`

## BPMN Gateways

Gateways control process flow. Set `Shape = "gateway"`:

```csharp
new DiagramNode
{
    Id = "exclusiveGW",
    OffsetX = 300, OffsetY = 200, Width = 50, Height = 50,
    Shape = new BpmnShapes
    {
        Type = "Bpmn",
        Shape = "gateway",
        Gateway = new DiagramBpmnGateway
        {
            Type = BpmnGateways.Exclusive
        }
    }
}
```

| Gateway Type | Description |
|-------------|-------------|
| `Exclusive` | XOR — only one path taken |
| `Parallel` | AND — all paths taken |
| `Inclusive` | OR — one or more paths |
| `Complex` | Complex conditions |
| `EventBased` | Based on event occurrence |
| `ExclusiveEventBased` | Exclusive event-based |
| `ParallelEventBased` | Parallel event-based |

## BPMN Activities (Tasks and Sub-Processes)

Activities represent work. Set `Shape = "activity"`:

### Task

```csharp
new DiagramNode
{
    Id = "userTask",
    OffsetX = 200, OffsetY = 200, Width = 120, Height = 60,
    Shape = new BpmnShapes
    {
        Type = "Bpmn",
        Shape = "activity",
        Activity = new DiagramBpmnActivity
        {
            Activity = BpmnActivities.Task,
            Task = new DiagramBpmnTask
            {
                Type = BpmnTasks.User,
                Loop = BpmnLoops.None,
                Compensation = false,
                Call = false
            }
        }
    }
}
```

| Task Type (`BpmnTasks`) | Description |
|------------------------|-------------|
| `None` | Generic task |
| `Service` | Automated service call |
| `Send` | Send message |
| `Receive` | Receive message |
| `InstantiatingReceive` | Instantiating receive |
| `Manual` | Manual/human task |
| `BusinessRule` | Business rule evaluation |
| `User` | User interaction task |
| `Script` | Script execution |

| Loop Type (`BpmnLoops`) | Description |
|------------------------|-------------|
| `None` | No loop |
| `Standard` | Repeat until condition |
| `SequentialMultiInstance` | Sequential repetitions |
| `ParallelMultiInstance` | Parallel repetitions |

### Sub-Process

```csharp
Activity = new DiagramBpmnActivity
{
    Activity = BpmnActivities.SubProcess,
    SubProcess = new DiagramBpmnSubProcess
    {
        Type = BpmnSubProcessTypes.Transaction,
        Collapsed = true,
        Adhoc = false,
        Boundary = BpmnBoundary.Default,
        Loop = BpmnLoops.None,
        Compensation = false
    }
}
```

`BpmnSubProcessTypes`: `None`, `Event`, `Transaction`  
`BpmnBoundary`: `Default`, `Call`, `Event`

### Embedded Sub-Process with Events

```csharp
SubProcess = new DiagramBpmnSubProcess
{
    Collapsed = false,
    Events = new List<DiagramBpmnSubEvent>
    {
        new DiagramBpmnSubEvent
        {
            Event = BpmnEvents.Intermediate,
            Trigger = BpmnTriggers.Error,
            Offset = new DiagramPoint { X = 0, Y = 1 }
        }
    }
}
```

## BPMN Data Objects

```csharp
// Data input
new DiagramNode
{
    Id = "dataInput",
    OffsetX = 150, OffsetY = 300, Width = 50, Height = 60,
    Shape = new BpmnShapes
    {
        Type = "Bpmn",
        Shape = "dataobject",
        DataObject = new DiagramBpmnDataObject
        {
            Type = BpmnDataObjects.Input,
            Collection = false
        }
    }
}

// Data output (collection)
new DiagramNode
{
    Id = "dataOutput",
    OffsetX = 350, OffsetY = 300, Width = 50, Height = 60,
    Shape = new BpmnShapes
    {
        Type = "Bpmn",
        Shape = "dataobject",
        DataObject = new DiagramBpmnDataObject
        {
            Type = BpmnDataObjects.Output,
            Collection = true
        }
    }
}

// Data Store
new DiagramNode
{
    Id = "dataStore",
    OffsetX = 250, OffsetY = 350, Width = 60, Height = 50,
    Shape = new BpmnShapes { Type = "Bpmn", Shape = "datasource" }
}
```

## BPMN Annotations

Attach text annotations to BPMN elements:

```csharp
// A Task node
new DiagramNode
{
    Id = "userTask",
    OffsetX = 200, OffsetY = 200, Width = 120, Height = 60,
    Shape = new BpmnShapes
    {
        Type = "Bpmn",
        Shape = "activity",
        Activity = new DiagramBpmnActivity
        {
            Activity = BpmnActivities.Task,
            Task = new DiagramBpmnTask { Type = BpmnTasks.User }
        },
        Annotations = new List<DiagramBpmnAnnotation>
        {
            new DiagramBpmnAnnotation
            {
                Id = "ann1",
                Angle = 0,
                Length = 100,
                Text = "Approve Request"
            }
        }
    }
}
```

## BPMN Connectors

BPMN connectors define flow types using the `Bpmn` shape type:

```csharp
// Sequence Flow (default process flow)
new DiagramConnector
{
    Id = "seq1",
    SourceID = "startEvent", TargetID = "userTask",
    Shape = new { type = "Bpmn", flow = "Sequence", sequence = "Normal" }
}

// Conditional Sequence
new DiagramConnector
{
    Id = "cond1",
    SourceID = "gateway", TargetID = "node2",
    Shape = new { type = "Bpmn", flow = "Sequence", sequence = "Conditional" }
}

// Message Flow (between pools)
new DiagramConnector
{
    Id = "msg1",
    SourceID = "sendTask", TargetID = "receiveTask",
    Shape = new { type = "Bpmn", flow = "Message", message = "InitiatingMessage" }
}

// Association
new DiagramConnector
{
    Id = "assoc1",
    SourceID = "task1", TargetID = "note1",
    Shape = new { type = "Bpmn", flow = "Association", association = "Directional" }
}
```

### Flow Types

| `flow` | Sub-Type Values | Use |
|--------|----------------|-----|
| `"Sequence"` | `sequence`: `Normal`, `Conditional`, `Default` | Process flow |
| `"Message"` | `message`: `Default`, `InitiatingMessage`, `NonInitiatingMessage` | Cross-pool messaging |
| `"Association"` | `association`: `Default`, `Directional`, `BiDirectional` | Data/annotation links |

## Complete Process Example

```csharp
// Controller
public IActionResult BpmnProcess()
{
    var nodes = new List<DiagramNode>
    {
        // Start
        new DiagramNode
        {
            Id = "start", OffsetX = 80, OffsetY = 250, Width = 50, Height = 50,
            Shape = new BpmnShapes { Type = "Bpmn", Shape = "event",
                Event = new DiagramBpmnEvent { Event = BpmnEvents.Start, Trigger = BpmnTriggers.None } }
        },
        // User Task
        new DiagramNode
        {
            Id = "userTask", OffsetX = 220, OffsetY = 250, Width = 120, Height = 60,
            Shape = new BpmnShapes { Type = "Bpmn", Shape = "activity",
                Activity = new DiagramBpmnActivity
                {
                    Activity = BpmnActivities.Task,
                    Task = new DiagramBpmnTask { Type = BpmnTasks.User }
                } }
        },
        // Exclusive Gateway
        new DiagramNode
        {
            Id = "gateway", OffsetX = 400, OffsetY = 250, Width = 50, Height = 50,
            Shape = new BpmnShapes { Type = "Bpmn", Shape = "gateway",
                Gateway = new DiagramBpmnGateway { Type = BpmnGateways.Exclusive } }
        },
        // End
        new DiagramNode
        {
            Id = "end", OffsetX = 530, OffsetY = 250, Width = 50, Height = 50,
            Shape = new BpmnShapes { Type = "Bpmn", Shape = "event",
                Event = new DiagramBpmnEvent { Event = BpmnEvents.End, Trigger = BpmnTriggers.None } }
        }
    };

    var connectors = new List<DiagramConnector>
    {
        new DiagramConnector
        {
            Id = "c1", SourceID = "start", TargetID = "userTask",
            Shape = new { type = "Bpmn", flow = "Sequence", sequence = "Normal" }
        },
        new DiagramConnector
        {
            Id = "c2", SourceID = "userTask", TargetID = "gateway",
            Shape = new { type = "Bpmn", flow = "Sequence", sequence = "Normal" }
        },
        new DiagramConnector
        {
            Id = "c3", SourceID = "gateway", TargetID = "end",
            Shape = new { type = "Bpmn", flow = "Sequence", sequence = "Default" }
        }
    };

    ViewBag.nodes = nodes;
    ViewBag.connectors = connectors;
    return View();
}
```

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px"
    nodes="@ViewBag.nodes"
    connectors="@ViewBag.connectors">
</ejs-diagram>
<ejs-scripts></ejs-scripts>
<script>
    ej.diagrams.Diagram.Inject(ej.diagrams.BpmnDiagrams);
</script>
```
