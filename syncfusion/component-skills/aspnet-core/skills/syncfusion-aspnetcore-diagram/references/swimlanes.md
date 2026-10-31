# Swimlane Diagrams in Syncfusion ASP.NET Core Diagram

## Table of Contents
- [Basic Swimlane Setup](#basic-swimlane-setup)
- [Swimlane Structure](#swimlane-structure)
- [Lanes](#lanes)
- [Phases](#phases)
- [Swimlane Header](#swimlane-header)
- [Orientation](#orientation)
- [Adding Nodes Inside Lanes](#adding-nodes-inside-lanes)
- [Runtime Operations](#runtime-operations)
- [Dynamic Updates](#dynamic-updates)
- [Interaction](#interaction)
- [Symbol Palette Integration](#symbol-palette-integration)

## Basic Swimlane Setup

A swimlane node is a special `DiagramNode` with `Shape.Type = "SwimLane"`:

```csharp
// Controller
var swimlane = new DiagramNode
{
    Id = "swimlane1",
    OffsetX = 400,
    OffsetY = 300,
    Shape = new SwimLaneShape()
    {
        Type = "SwimLane",
        Orientation = "Horizontal",
        Header = new Header()
        {
            Annotation = new DiagramNodeAnnotation() { Content = "SALES PROCESS" },
            Height = 50,
            Style = new ShapeStyle() { Fill = "#4674CE", Color = "white", FontSize = 16, FontFamily = "Segoe UI" }
        },
        Lanes = new List<Lane>()
        {
            new Lane()
            {
                Id = "lane1",
                Height = 100,
                Header = new Header()
                {
                    Annotation = new DiagramNodeAnnotation() { Content = "Identify" },
                    Width = 50,
                    Style = new ShapeStyle() { Fill = "#4674CE", Color = "white" }
                }
            },
            new Lane()
            {
                Id = "lane2",
                Height = 100,
                Header = new Header()
                {
                    Annotation = new DiagramNodeAnnotation() { Content = "Research" },
                    Width = 50,
                    Style = new ShapeStyle() { Fill = "#4674CE", Color = "white" }
                }
            }
        }
    }
};
ViewBag.nodes = new List<DiagramNode> { swimlane };
```

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px"
    nodes="@ViewBag.nodes">
</ejs-diagram>
```

## Swimlane Structure

A swimlane has:
- **Header** — title bar at the top or side
- **Lanes** — horizontal or vertical bands
- **Phases** — divisions within lanes (optional)

| Property | Type | Description |
|----------|------|-------------|
| `type` | `"SwimLane"` | Required to create a swimlane |
| `orientation` | `"Horizontal"` / `"Vertical"` | Lane direction |
| `header` | object | Swimlane title bar config |
| `lanes` | `object[]` | Array of lane definitions |
| `phases` | `object[]` | Array of phase (column/row dividers) |
| `phaseSize` | number | Width/height of phase header area |

## Lanes

Each lane defines its ID, size, header, and optional child nodes:

```csharp
new Lane()
{
    Id = "lane1",
    Height = 120,   // For horizontal swimlane — use Width for vertical
    Header = new Header()
    {
        Annotation = new DiagramNodeAnnotation() { Content = "Lane Title" },
        Width = 50,  // Side header width (horizontal orientation)
        Style = new ShapeStyle() { Fill = "#4674CE", Color = "white", Bold = true }
    },
    Children = new List<DiagramNode>()
    {
        new DiagramNode()
        {
            Id = "task1",
            Width = 90,
            Height = 50,
            OffsetX = 160,
            OffsetY = 0,
            Shape = new FlowShape() { Type = "Flow", FlowShape = "Process" },
            Annotations = new List<DiagramNodeAnnotation>()
            {
                new DiagramNodeAnnotation() { Content = "Task 1" }
            }
        }
    }
}
```

> **Note:** Child node offsets within a lane are relative to the lane's top-left corner.

## Phases

Phases divide the swimlane into sections along the primary axis:

```csharp
var swimlane = new DiagramNode
{
    Id = "swimlane1",
    Shape = new SwimLaneShape()
    {
        Type = "SwimLane",
        Orientation = "Horizontal",
        PhaseSize = 30,
        Phases = new List<Phase>()
        {
            new Phase()
            {
                Id = "phase1",
                Offset = 200,
                Header = new Header()
                {
                    Annotation = new DiagramNodeAnnotation() { Content = "Phase 1" },
                    Style = new ShapeStyle() { Fill = "#4674CE", Color = "white" }
                }
            },
            new Phase()
            {
                Id = "phase2",
                Offset = 400,
                Header = new Header()
                {
                    Annotation = new DiagramNodeAnnotation() { Content = "Phase 2" },
                    Style = new ShapeStyle() { Fill = "#4674CE", Color = "white" }
                }
            }
        },
        Lanes = new List<Lane>()
        {
            new Lane()
            {
                Id = "lane1",
                Height = 100
            }
        }
    }
};
```

| Property | Description |
|----------|-------------|
| `Id` | Unique identifier for the phase |
| `Offset` | Position along the primary axis (pixels from swimlane origin) |
| `Header` | Phase header with annotation and style |

## Swimlane Header

Configure the main swimlane title bar:

```csharp
var header = new Header()
{
    Annotation = new DiagramNodeAnnotation()
    {
        Content = "Process Name",
        Style = new TextStyle() { Color = "white", FontSize = 14, Bold = true }
    },
    Height = 50,         // For horizontal swimlane (top bar height)
    Style = new ShapeStyle() { Fill = "#4674CE" }
};
```

## Orientation

| Value | Description |
|-------|-------------|
| `"Horizontal"` | Lanes stack vertically (top-to-bottom); phases run left-to-right |
| `"Vertical"` | Lanes stack horizontally (left-to-right); phases run top-to-bottom |

## Adding Nodes Inside Lanes

When adding nodes inside a lane, assign them to the lane via `addNodeToLane` method:

```javascript
var diagram = document.getElementById('diagram').ej2_instances[0];

var newNode = {
    id: 'newTask',
    shape: { type: 'Flow', shape: 'Process' },
    width: 90,
    height: 50,
    offsetX: 300,
    offsetY: 60,
    annotations: [{ content: 'New Task' }]
};

// Add node to a specific lane
var swimlane = diagram.getObject('swimlane1');
diagram.addNodeToLane(swimlane, 'lane1', newNode);
```

## Runtime Operations

### Add Lanes

```javascript
var diagram = document.getElementById('diagram').ej2_instances[0];
var swimlane = diagram.getObject('swimlane1');

var newLane = {
    id: 'lane3',
    height: 100,
    header: {
        annotation: { content: 'New Lane' },
        width: 50,
        style: { fill: '#4674CE', color: 'white' }
    }
};

diagram.addLanes(swimlane, [newLane]);
```

### Add Phases

```javascript
var newPhase = {
    id: 'phase3',
    offset: 600,
    header: {
        content: { content: 'Phase 3' },
        style: { fill: '#4674CE', color: 'white' }
    }
};

diagram.addPhase(swimlane, [newPhase]);
```

## Dynamic Updates

Update lane or phase styles at runtime using `dataBind()`:

```javascript
var diagram = document.getElementById('diagram').ej2_instances[0];
var swimlane = diagram.getObject('swimlane1');

// Update lane header fill color
swimlane.shape.lanes[0].header.style.fill = '#FF6347';
swimlane.shape.lanes[0].header.style.color = 'white';

diagram.dataBind();
```

Update swimlane header:

```javascript
swimlane.shape.header.style.fill = '#2E8B57';
diagram.dataBind();
```

## Interaction

| Interaction | Behavior |
|-------------|----------|
| Resize lane | Drag the lane's bottom (horizontal) or right (vertical) edge |
| Swap lanes | Drag a lane header onto another lane to reorder |
| Resize phase | Drag the phase boundary line |
| Add lane from header | Click the `+` icon on the swimlane header (if enabled) |

### Prevent Lane Movement

```csharp
// On a child node inside a lane
new DiagramNode()
{
    Id = "lockedTask",
    CanMove = false   // Prevents the node from being dragged out of the lane
}
```

### Swimlane Constraints

```csharp
// Allow/restrict interaction on the swimlane node itself
var swimlane = new DiagramNode
{
    Id = "swimlane1",
    Constraints = NodeConstraints.Default & ~NodeConstraints.Drag   // lock position
};
```

## Symbol Palette Integration

Swimlane shapes can be added to the symbol palette:

```csharp
var paletteLane = new DiagramNode
{
    Id = "paletteLane",
    Shape = new SwimLaneShape()
    {
        Type = "SwimLane",
        Orientation = "Horizontal",
        Header = new Header() 
        { 
            Annotation = new DiagramNodeAnnotation() { Content = "Swimlane" }, 
            Height = 30 
        },
        Lanes = new List<Lane>()
        {
            new Lane() 
            { 
                Id = "lane1", 
                Height = 60, 
                Header = new Header() 
                { 
                    Annotation = new DiagramNodeAnnotation() { Content = "Lane" }, 
                    Width = 40 
                } 
            }
        }
    },
    Height = 90,
    Width = 200
};

ViewBag.swimlanePalette = new List<DiagramNode> { paletteLane };
```

> **Drag Behavior:** If the diagram already contains a swimlane with the same orientation, dragging from the palette adds a new lane to the existing swimlane. Otherwise, a new swimlane is created.
