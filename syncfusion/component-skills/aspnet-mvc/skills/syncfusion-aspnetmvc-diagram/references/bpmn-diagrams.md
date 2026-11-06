# BPMN Diagrams in Syncfusion ASP.NET MVC Diagram

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

Place this in a `<script>` block that runs after adding the diagram:

```cshtml

@using Syncfusion.EJ2

<div>
    @(Html.EJS().Diagram("diagram").Width("1000px").Height("645px").Nodes((List<Syncfusion.EJ2.Diagrams.DiagramNode>)ViewData["nodes"]).Render()
        )
</div>
```

## BPMN Events

BPMN Events represent things that happen. Set `Shape = "Bpmn"` and specify the `Event` property:

```csharp
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            List<DiagramNode> nodes = new List<DiagramNode>();
            // START EVENT
            nodes.Add(new DiagramNode
            {
                Id = "startEvent",
                OffsetX = 100,
                OffsetY = 200,
                Width = 50,
                Height = 50,
                Shape = new BpmnShapes()
                {
                    Type = "Bpmn",
                    Shape = "Event",
                    Event = new DiagramBpmnEvent()
                    {
                        Event = BpmnEvents.Start,
                        Trigger = BpmnTriggers.None
                    }
                }
            });

            // INTERMEDIATE MESSAGE CATCH EVENT
            nodes.Add(new DiagramNode
            {
                Id = "msgEvent",
                OffsetX = 300,
                OffsetY = 200,
                Width = 50,
                Height = 50,
                Shape = new BpmnShapes()
                {
                    Type = "Bpmn",
                    Shape = "Event",
                    Event = new DiagramBpmnEvent()
                    {
                        Event = BpmnEvents.Intermediate,
                        Trigger = BpmnTriggers.Message
                    }
                }
            });

            // END EVENT
            nodes.Add(new DiagramNode
            {
                Id = "endEvent",
                OffsetX = 500,
                OffsetY = 200,
                Width = 50,
                Height = 50,
                Shape = new BpmnShapes()
                {
                    Type = "Bpmn",
                    Shape = "Event",
                    Event = new DiagramBpmnEvent()
                    {
                        Event = BpmnEvents.End,
                        Trigger = BpmnTriggers.None
                    }
                }
            });

            ViewData["nodes"] = nodes;


            return View();
        }
    }

    public class DiagramBpmnAnnotation
    {
        [DefaultValue(null)]
        [HtmlAttributeName("id")]
        [JsonProperty("id")]
        public string Id
        {
            get;
            set;
        }
        [DefaultValue(0)]
        [HtmlAttributeName("angle")]
        [JsonProperty("angle")]
        public double Angle
        {
            get;
            set;
        }
        [DefaultValue(0)]
        [HtmlAttributeName("length")]
        [JsonProperty("length")]
        public double Length
        {
            get;
            set;
        }
        [DefaultValue(null)]
        [HtmlAttributeName("text")]
        [JsonProperty("text")]
        public string Text
        {
            get;
            set;
        }
    }
    public class BpmnShapes
    {
        [DefaultValue(null)]
        [HtmlAttributeName("type")]
        [JsonProperty("type")]
        public string Type
        {
            get;
            set;
        }
        [DefaultValue(null)]
        [HtmlAttributeName("shape")]
        [JsonProperty("shape")]
        public string Shape
        {
            get;
            set;
        }
        [DefaultValue(null)]
        [HtmlAttributeName("activity")]
        [JsonProperty("activity")]
        public DiagramBpmnActivity Activity
        {
            get;
            set;
        }
        [DefaultValue(null)]
        [HtmlAttributeName("event")]
        [JsonProperty("event")]
        public DiagramBpmnEvent Event
        {
            get;
            set;
        }
        [DefaultValue(null)]
        [HtmlAttributeName("gateway")]
        [JsonProperty("gateway")]
        public DiagramBpmnGateway Gateway
        {
            get;
            set;
        }
        [DefaultValue(null)]
        [HtmlAttributeName("dataObject")]
        [JsonProperty("dataObject")]
        public DiagramBpmnDataObject DataObject
        {
            get;
            set;
        }
        [DefaultValue(null)]
        [HtmlAttributeName("annotations")]
        [JsonProperty("annotations")]
        public List<DiagramBpmnAnnotation> Annotations
        {
            get;
            set;
        }
                [DefaultValue(null)]
        [HtmlAttributeName("flow")]
        [JsonProperty("flow")]
        public string Flow
        {
            get;
            set;
        }
        [DefaultValue(null)]
        [HtmlAttributeName("sequence")]
        [JsonProperty("sequence")]
        public string Sequence
        {
            get;
            set;
        }
        [DefaultValue(null)]
        [HtmlAttributeName("trigger")]
        [JsonProperty("trigger")]
        public string Trigger
        {
            get;
            set;
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

Gateways control process flow. Set `Shape = "Gateway"`:

```csharp
// EXCLUSIVE GATEWAY (XOR)
nodes.Add(new DiagramNode
{
    Id = "exclusiveGW",
    OffsetX = 200,
    OffsetY = 350,
    Width = 50,
    Height = 50,
    Shape = new BpmnShapes()
    {
        Type = "Bpmn",
        Shape = "Gateway",
        Gateway = new DiagramBpmnGateway()
        {
            Type = BpmnGateways.Exclusive
        }
    }
});

// PARALLEL GATEWAY (AND)
nodes.Add(new DiagramNode
{
    Id = "parallelGW",
    OffsetX = 350,
    OffsetY = 350,
    Width = 50,
    Height = 50,
    Shape = new BpmnShapes()
    {
        Type = "Bpmn",
        Shape = "Gateway",
        Gateway = new DiagramBpmnGateway()
        {
            Type = BpmnGateways.Parallel
        }
    }
});

// INCLUSIVE GATEWAY (OR)
nodes.Add(new DiagramNode
{
    Id = "inclusiveGW",
    OffsetX = 500,
    OffsetY = 350,
    Width = 50,
    Height = 50,
    Shape = new BpmnShapes()
    {
        Type = "Bpmn",
        Shape = "Gateway",
        Gateway = new DiagramBpmnGateway()
        {
            Type = BpmnGateways.Inclusive
        }
    }
});
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

Activities represent work. Set `Shape = "Activity"`:

### Task

```csharp
nodes.Add(new DiagramNode
{
    Id = "userTask",
    OffsetX = 200,
    OffsetY = 200,
    Width = 120,
    Height = 60,
    Shape = new BpmnShapes()
    {
        Type = "Bpmn",
        Shape = "Activity",
        Activity = new DiagramBpmnActivity()
        {
            Activity = BpmnActivities.Task,
            Task = new DiagramBpmnTask()
            {
                Type = BpmnTasks.User,
                Loop = BpmnLoops.None,
                Compensation = false,
                Call = false
            }
        }
    }
});
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
| `SequenceMultiInstance` | Sequential repetitions |
| `ParallelMultiInstance` | Parallel repetitions |

### Sub-Process

```csharp
nodes.Add(new DiagramNode
{
    Id = "transactionSubProcess",
    OffsetX = 400,
    OffsetY = 300,
    Width = 180,
    Height = 120,
    Shape = new BpmnShapes()
    {
        Type = "Bpmn",
        Shape = "Activity",
        Activity = new DiagramBpmnActivity()
        {
            Activity = BpmnActivities.SubProcess,
            SubProcess = new DiagramBpmnSubProcess()
            {
                Type = BpmnSubProcessTypes.Transaction,
                Collapsed = true,
                Adhoc = false,
                Boundary = BpmnBoundary.Default,
                Loop = BpmnLoops.None,
                Compensation = false
            }
        }
    }
});
```

**BpmnSubProcessTypes**: `None`, `Event`, `Transaction`  
**BpmnBoundary**: `Default`, `Call`, `Event`

### Embedded Sub-Process with Events

```csharp
nodes.Add(new DiagramNode
{
    Id = "expandedSubProcess",
    OffsetX = 600,
    OffsetY = 350,
    Width = 300,
    Height = 180,
    Shape = new BpmnShapes()
    {
        Type = "Bpmn",
        Shape = "Activity",
        Activity = new DiagramBpmnActivity()
        {
            Activity = BpmnActivities.SubProcess,
            SubProcess = new DiagramBpmnSubProcess()
            {
                Collapsed = false,                  // Expanded sub‑process
                Boundary = BpmnBoundary.Event,      // Enables boundary events
                Loop = BpmnLoops.None,
                Compensation = false,
                Adhoc = false,

                // Boundary Events for the Sub‑Process
                Events = new List<DiagramBpmnSubEvent>()
                {
                    new DiagramBpmnSubEvent
                    {
                        Event = BpmnEvents.Intermediate,
                        Trigger = BpmnTriggers.Error,
                        Offset = new DiagramPoint
                        {
                            X = 0.5,   // Horizontal position on boundary (0–1)
                            Y = 1      // Bottom boundary
                        }
                    }
                }
            }
        }
    }
});
```

## BPMN Data Objects

```csharp
// BPMN Data Input
nodes.Add(new DiagramNode
{
    Id = "dataInput",
    OffsetX = 150,
    OffsetY = 300,
    Width = 50,
    Height = 60,
    Shape = new BpmnShapes()
    {
        Type = "Bpmn",
        Shape = "DataObject",
        DataObject = new DiagramBpmnDataObject()
        {
            Type = BpmnDataObjects.Input,
            Collection = false
        }
    }
});

// BPMN Data Output (Collection)
nodes.Add(new DiagramNode
{
    Id = "dataOutput",
    OffsetX = 350,
    OffsetY = 300,
    Width = 50,
    Height = 60,
    Shape = new BpmnShapes()
    {
        Type = "Bpmn",
        Shape = "DataObject",
        DataObject = new DiagramBpmnDataObject()
        {
            Type = BpmnDataObjects.Output,
            Collection = true
        }
    }
});

// BPMN Data Store
nodes.Add(new DiagramNode
{
    Id = "dataStore",
    OffsetX = 250,
    OffsetY = 350,
    Width = 60,
    Height = 50,
    Shape = new BpmnShapes()
    {
        Type = "Bpmn",
        Shape = "DataSource"
    }
});
```

## BPMN Annotations

Attach text annotations to BPMN elements:

```csharp
    nodes.Add(new DiagramNode
    {
        Id = "note",
        OffsetX = 200,
        OffsetY = 100,
        Width = 120,
        Height = 60,
        Shape = new BpmnShapes()
        {
            Type = "Bpmn",
            Shape = "Activity",
            Activity = new DiagramBpmnActivity()
            {
                Activity = BpmnActivities.Task,
                Task = new DiagramBpmnTask()
                {
                    Type = BpmnTasks.User
                }
            },

            // ✅ BPMN Text Annotation
            Annotations = new List<DiagramBpmnAnnotation>()
            {
                new DiagramBpmnAnnotation()
                {
                    Id = "ann1",
                    Angle = 0,
                    Length = 100,
                    Text = "Approve Request"
                }
            }
        }
    });

```

## BPMN Connectors

BPMN connectors define flow types using the `Bpmn` shape type:

```csharp
     // 1. Normal Sequence Flow
     connectors.Add(new DiagramConnector
     {
         Id = "seq1",
         SourcePoint = new DiagramPoint { X = 100, Y = 200 },
         TargetPoint = new DiagramPoint { X = 200, Y = 200 },
         Shape = new DiagramBpmnFlow()
         {
             Type = ConnectionShapes.Bpmn,
             Flow = BpmnFlows.Sequence,
             Sequence = BpmnSequenceFlows.Normal


         }
     });

     // 2. BiDirectional Association Flow
     connectors.Add(new DiagramConnector
     {
         Id = "biDir",
         SourcePoint = new DiagramPoint { X = 300, Y = 200 },
         TargetPoint = new DiagramPoint { X = 400, Y = 200 },
         Shape = new DiagramBpmnFlow()
         {
             Type = ConnectionShapes.Bpmn,
             Flow = BpmnFlows.Association,
             Association = BpmnAssociationFlows.BiDirectional
         }
     });

     // 3. Message Flow
     connectors.Add(new DiagramConnector
     {
         Id = "msg1",
         SourcePoint = new DiagramPoint { X = 500, Y = 200 },
         TargetPoint = new DiagramPoint { X = 600, Y = 200 },
         Shape = new DiagramBpmnFlow()
         {
             Type = ConnectionShapes.Bpmn,
             Flow = BpmnFlows.Message,
             Message = BpmnMessageFlows.InitiatingMessage
         }
     });
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
            Shape = new BpmnShapes() { Type = "Bpmn", Shape = "Event",
                Event = new DiagramBpmnEvent() { Event = BpmnEvents.Start, Trigger = BpmnTriggers.None } }
        },
        // User Task
        new DiagramNode
        {
            Id = "userTask", OffsetX = 220, OffsetY = 250, Width = 120, Height = 60,
            Shape = new BpmnShapes() { Type = "Bpmn", Shape = "Activity",
                Activity = new DiagramBpmnActivity()
                {
                    Activity = BpmnActivities.Task,
                    Task = new DiagramBpmnTask() { Type = BpmnTasks.User }
                } }
        },
        // Exclusive Gateway
        new DiagramNode
        {
            Id = "gateway", OffsetX = 400, OffsetY = 250, Width = 50, Height = 50,
            Shape = new BpmnShapes() { Type = "Bpmn", Shape = "Gateway",
                Gateway = new DiagramBpmnGateway() { Type = BpmnGateways.Exclusive } }
        },
        // End
        new DiagramNode
        {
            Id = "end", OffsetX = 530, OffsetY = 250, Width = 50, Height = 50,
            Shape = new BpmnShapes() { Type = "Bpmn", Shape = "Event",
                Event = new DiagramBpmnEvent() { Event = BpmnEvents.End, Trigger = BpmnTriggers.None } }
        }
    };

    var connectors = new List<DiagramConnector>
    {
        new DiagramConnector
        {
            Id = "c1", SourceID = "start", TargetID = "userTask",
            Shape = new BpmnShapes() { Type = "Bpmn", Flow = "Sequence", Sequence = "Normal" }
        },
        new DiagramConnector
        {
            Id = "c2", SourceID = "userTask", TargetID = "gateway",
            Shape = new BpmnShapes() { Type = "Bpmn", Flow = "Sequence", Sequence = "Conditional" }
        },
        new DiagramConnector
        {
            Id = "c3", SourceID = "gateway", TargetID = "end",
            Shape = new BpmnShapes() { Type = "Bpmn", Flow = "Sequence", Sequence = "Default" }
        }
    };

    ViewBag.nodes = nodes;
    ViewBag.connectors = connectors;
    return View();
}
```

```cshtml
@(Html.EJS().Diagram("diagram")
    .Width("100%")
    .Height("550px")
    .Nodes(ViewBag.nodes)
    .Connectors(ViewBag.connectors)
    .Render())
```
