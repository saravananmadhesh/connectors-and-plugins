# Swimlane Diagrams in Syncfusion ASP.NET MVC Diagram

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
  DiagramNode swimlane = new DiagramNode
  {
      Id = "swimlane1",
      OffsetX = 400,
      OffsetY = 300,
      Width = 650,
      Height = 200
  };
  DiagramHeader swimlaneHeader = new DiagramHeader
  {
      Annotation = new DiagramAnnotation
      {
          Content = "SALES PROCESS",
          Style = new DiagramTextStyle
          {
              Color = "white",
              FontSize = 16,
              FontFamily = "Segoe UI"
          }
      },
      Height = 50,
      Style = new DiagramShapeStyle
      {
          Fill = "#4674CE",
      }
  };
  List<DiagramLane> lanes = new List<DiagramLane>();
  lanes.Add(new DiagramLane
  {
      Id = "lane1",
      Height = 100,
      Header = new DiagramHeader
      {
          Annotation = new DiagramAnnotation { Content = "Identify", Style =  new DiagramTextStyle { Color = "white" } },
          Width = 50,
          Style = new DiagramShapeStyle
          {
              Fill = "#4674CE",
          }
      },
  });
  lanes.Add(new DiagramLane
  {
      Id = "lane2",
      Height = 100,
      Header = new DiagramHeader
      {
          Annotation = new DiagramAnnotation { Content = "Research" , Style =  new DiagramTextStyle { Color = "white" } },
          Width = 50,
          Style = new DiagramShapeStyle
          {
              Fill = "#4674CE"
          }
      },
  });
  swimlane.Shape = new DiagramSwimLane
  {
      Type = Shapes.SwimLane,
      Orientation = Syncfusion.EJ2.Diagrams.Orientation.Horizontal,
      Header = swimlaneHeader,
      Lanes = lanes,
      PhaseSize = 20
  };
  ViewBag.nodes = new List<DiagramNode> { swimlane };
```

```cshtml
@(Html.EJS().Diagram("diagram")
    .Width("100%")
    .Height("550px")
    .Nodes(ViewBag.nodes)
    .Render())
```

## Swimlane Structure

A swimlane has:
- **Header** — title bar at the top or side
- **Lanes** — horizontal or vertical bands
- **Phases** — divisions within lanes (optional)

| Property | Type | Description |
|----------|------|-------------|
| `Type` | `"SwimLane"` | Required to create a swimlane |
| `Orientation` | `"Horizontal"` / `"Vertical"` | Lane direction |
| `Header` | object | Swimlane title bar config |
| `Lanes` | `object[]` | Array of lane definitions |
| `Phases` | `object[]` | Array of phase (column/row dividers) |
| `PhaseSize` | number | Width/height of phase header area |

## Lanes

Each lane defines its ID, size, header, and optional child nodes:

```csharp
 DiagramLane lane1 = new DiagramLane
{
            Id = "lane1",
            Height = 120,

            Header = new DiagramHeader
            {
                Annotation = new DiagramAnnotation
                {
                    Content = "Lane Title",
                    Style = new DiagramTextStyle
                    {
                        Color = "white",
                        Bold = true
                    }
                },
                Width = 50,
                Style = new DiagramShapeStyle
                {
                    Fill = "#4674CE",
                  
                }
            },

            Children = new List<DiagramNode>
            {
                new DiagramNode
                {
                    Id = "task1",
                    Shape = new { type = "Flow", shape = "Process" },
                    Width = 90,
                    Height = 50,
                    Margin = new DiagramMargin() { Left = 60, Top = 30 },
                    Annotations = new List<DiagramNodeAnnotation>
                    {
                        new DiagramNodeAnnotation
                        {
                            Content = "Task 1"
                        }
                    }
                }
            }
};
```

> **Note:** Child node offsets within a lane are relative to the lane's top-left corner.

## Phases

Phases divide the swimlane into sections along the primary axis:

```csharp
 List<DiagramPhase> phases = new List<DiagramPhase>();
 phases.Add(new DiagramPhase
 {
     Id = "phase1",
     Offset = 200,
     Header = new DiagramHeader
     {
         Annotation = new DiagramAnnotation { Content = "Phase 1", Style = new DiagramTextStyle { Color = "white" } },
         Style = new DiagramShapeStyle
         {
             Fill = "#4674CE",
         }
     }
 });
 phases.Add(new DiagramPhase
 {
     Id = "phase2",
     Offset = 400,
     Header = new DiagramHeader
     {
         Annotation = new DiagramAnnotation { Content = "Phase 2",Style = new DiagramTextStyle { Color = "white" } },
         Style = new DiagramShapeStyle
         {
             Fill = "#4674CE",
            
         }
     }
 });
 swimlane.Shape = new DiagramSwimLane
 {
     Type = Shapes.SwimLane,
     Orientation = Syncfusion.EJ2.Diagrams.Orientation.Horizontal,
     PhaseSize = 30,
     Phases = phases,
 };
 ViewBag.nodes = new List<DiagramNode> { swimlane };
```

| Property | Description |
|----------|-------------|
| `id` | Unique identifier for the phase |
| `offset` | Position along the primary axis (pixels from swimlane origin) |
| `header` | Phase header with annotation and style |

## Swimlane Header

Configure the main swimlane title bar:

```csharp

DiagramHeader swimlaneHeader = new DiagramHeader
{
    Annotation = new DiagramAnnotation
    {
        Content = "Process Name",
        Style = new DiagramTextStyle
        {
            Color = "white",
            FontSize = 14,
            FontFamily = "Segoe UI"
        }
    },
    Height = 50,
    Style = new DiagramShapeStyle
    {
        Fill = "#4674CE",
    }
};
```

## Orientation

| Value | Description |
|-------|-------------|
| `"Horizontal"` | Lanes stack vertically (top-to-bottom); phases run left-to-right |
| `"Vertical"` | Lanes stack horizontally (left-to-right); phases run top-to-bottom |

## Adding Nodes Inside Lanes

When adding nodes inside a lane, assign them to the lane via `parentId`:

```javascript
var diagram = document.getElementById('diagram').ej2_instances[0];

var newNode = {
    id: 'newTask',
    shape: { type: 'Flow', shape: 'Process' },
    width: 90,
    height: 50,
    margin: { left: 200, top: 20 },
    annotations: [{ content: 'New Task' }]
};

diagram.addNodeToLane(newNode, 'swimlane1', 'lane1');
```

## Runtime Operations

### Add Lanes

```javascript
let swimlane = diagram.getObject('swim1');
  let lane = [
    {
      height: 100,
      style: { fill: 'lightgrey' },
      header: {
        annotation: {
          content: 'New LANE',
          style: { fill: 'brown', color: 'white', fontSize: 15 },
        },
        style: { fill: 'pink' },
      },
    },
  ];

diagram.addLanes(swimlane, lane);
```

### Add Phases

```javascript
let swimlane = diagram.getObject('swim1');
  var phase = [
    {
      id: 'phase3',
      offset: 250,
      header: { annotation: { content: 'New Phase' } },
    },
  ];
diagram.addPhases(swimlane, phase);
```

## Dynamic Updates

Update lane or phase styles at runtime using `dataBind()`:

```javascript
let swimlane = diagram.nodes[0];
swimlane.shape.lanes[0].header.style.fill = 'blue';
swimlane.shape.lanes[0].header.annotation.style.color = 'white';
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
List<DiagramLane> lanes = new List<DiagramLane>();
lanes.Add(new DiagramLane
{
    Id = "lane1",
    CanMove = false, // Prevents the lane from being dragged or swapped
});
```

### Swimlane Constraints

```csharp
// Allow/restrict interaction on the swimlane node itself
var swimlane = new DiagramNode
{
    Id = "swimlane1",
    Constraints = NodeConstraints.Default & ~NodeConstraints.Drag   // lock position
    // ...
};
```

## Symbol Palette Integration

Swimlane shapes can be added to the symbol palette:

```csharp
DiagramNode paletteLane = new DiagramNode
{
    Id = "paletteLane",
    Width = 200,
    Height = 90
};
DiagramHeader paletteHeader = new DiagramHeader
{
    Annotation = new DiagramAnnotation
    {
        Content = "Swimlane"
    },
    Height = 30
};
List<DiagramLane> paletteLanes = new List<DiagramLane>();

paletteLanes.Add(new DiagramLane
{
    Id = "lane1",
    Height = 60,
    Header = new DiagramHeader
    {
        Annotation = new DiagramAnnotation
        {
            Content = "Lane"
        },
        Width = 40
    },
    Children = new List<DiagramNode>()
});
paletteLane.Shape = new DiagramSwimLane
{
    Type =Shapes.SwimLane,
    Orientation = Syncfusion.EJ2.Diagrams.Orientation.Horizontal,
    Header = paletteHeader,
    Lanes = paletteLanes,
    PhaseSize = 20
};
ViewBag.swimlanePalette = new List<DiagramNode> { paletteLane };
```

> **Drag Behavior:** If the diagram already contains a swimlane with the same orientation, dragging from the palette adds a new lane to the existing swimlane. Otherwise, a new swimlane is created.
