# Ports in Syncfusion ASP.NET MVC Diagram

## Table of Contents
- [Creating Ports](#creating-ports)
- [Port Positioning](#port-positioning)
- [Port Appearance](#port-appearance)
- [Connecting Via Ports](#connecting-via-ports)
- [Port Constraints](#port-constraints)
- [Port Visibility](#port-visibility)
- [Runtime Operations](#runtime-operations)
- [Key Properties Reference](#key-properties-reference)

## Creating Ports

Ports are named connection points on a node. Define them via the `Ports` list on `DiagramNode`:

```csharp
// Controller / PageModel
var nodes = new List<DiagramNode>
{
    new DiagramNode
    {
        Id = "node1",
        OffsetX = 200, OffsetY = 150, Width = 120, Height = 60,
        Ports = new List<DiagramPort>
        {
            new DiagramPort
            {
                Id = "portTop",
                Shape = PortShapes.Circle,
                Offset = new DiagramPoint { X = 0.5, Y = 0 },
                Visibility = PortVisibility.Visible
            },
            new DiagramPort
            {
                Id = "portBottom",
                Shape = PortShapes.Circle,
                Offset = new DiagramPoint { X = 0.5, Y = 1 },
                Visibility = PortVisibility.Visible
            }
        }
    }
};
ViewBag.nodes = nodes;
```

```cshtml
@(Html.EJS().Diagram("diagram")
    .Width("100%")
    .Height("550px")
    .Nodes(ViewBag.nodes)
    .Render())
```

## Port Positioning

Port `Offset` uses normalized coordinates (0–1) relative to the node's bounds:

| Offset | Position |
|--------|---------|
| `{ X=0.5, Y=0 }` | Top center |
| `{ X=0.5, Y=1 }` | Bottom center |
| `{ X=0, Y=0.5 }` | Left center |
| `{ X=1, Y=0.5 }` | Right center |
| `{ X=0, Y=0 }` | Top-left corner |
| `{ X=1, Y=0 }` | Top-right corner |
| `{ X=0, Y=1 }` | Bottom-left corner |
| `{ X=1, Y=1 }` | Bottom-right corner |

### Standard Four-Port Layout

```csharp
Ports = new List<DiagramPort>
{
    new DiagramPort { Id = "top",    Offset = new DiagramPoint { X = 0.5, Y = 0   }, Shape = PortShapes.Circle },
    new DiagramPort { Id = "bottom", Offset = new DiagramPoint { X = 0.5, Y = 1   }, Shape = PortShapes.Circle },
    new DiagramPort { Id = "left",   Offset = new DiagramPoint { X = 0,   Y = 0.5 }, Shape = PortShapes.Circle },
    new DiagramPort { Id = "right",  Offset = new DiagramPoint { X = 1,   Y = 0.5 }, Shape = PortShapes.Circle }
}
```

### Connection Direction

Force connectors through a port to go in a specific direction:

```csharp
new DiagramPort
{
    Id = "rightOut",
    Offset = new DiagramPoint { X = 1, Y = 0.5 },
    ConnectionDirection = PortConnectionDirection.Right  // outgoing connectors exit to the right
}
```

`ConnectionDirection` values: `"Right"`, `"Left"`, `"Top"`, `"Bottom"`, `"Auto"`

## Port Appearance

```csharp
new DiagramPort
{
    Id = "styledPort",
    Shape = PortShapes.Circle,
    Width = 12,
    Height = 12,
    Offset = new DiagramPoint { X = 0.5, Y = 0 },
    Style = new DiagramShapeStyle
    {
        Fill = "white",
        StrokeColor = "#6BA5D7",
        StrokeWidth = 2
    },
    Visibility = PortVisibility.Visible
}
```

### Port Shapes

| Shape | Description |
|-------|-------------|
| `PortShapes.Circle` | Circle port (default) |
| `PortShapes.Square` | Square port |
| `PortShapes.X` | X marker |
| `PortShapes.Custom` | Custom SVG path |

Custom shape:

```csharp
new DiagramPort
{
    Id = "custom",
    Shape = PortShapes.Custom,
    PathData = "M 0 0 L 10 5 L 0 10 Z",
    Offset = new DiagramPoint { X = 1, Y = 0.5 }
}
```

## Connecting Via Ports

Connect a connector to specific ports using `SourcePortID` / `TargetPortID`:

```csharp
var connectors = new List<DiagramConnector>
{
    new DiagramConnector
    {
        Id = "conn1",
        SourceID = "node1",
        SourcePortID = "portBottom",  // exit from this port
        TargetID = "node2",
        TargetPortID = "portTop"      // enter this port
    }
};
ViewBag.connectors = connectors;
```

## Port Constraints

Control what connections a port allows:

```csharp
new DiagramPort
{
    Id = "inOnly",
    Offset = new DiagramPoint { X = 0.5, Y = 0 },
    Constraints = PortConstraints.InConnect   // only accept incoming
},
new DiagramPort
{
    Id = "outOnly",
    Offset = new DiagramPoint { X = 0.5, Y = 1 },
    Constraints = PortConstraints.OutConnect  // only allow outgoing
},
new DiagramPort
{
    Id = "both",
    Offset = new DiagramPoint { X = 1, Y = 0.5 },
    Constraints = PortConstraints.Default     // both directions
},
new DiagramPort
{
    Id = "disabled",
    Offset = new DiagramPoint { X = 0, Y = 0.5 },
    Constraints = PortConstraints.None        // no connections
}
```

### Allow Drag Connections

Allow a port to drag:

```csharp
Constraints = PortConstraints.Default | PortConstraints.Drag
```

## Port Visibility

```csharp
// Always visible
new DiagramPort { Visibility = PortVisibility.Visible }

// Visible only on hover
new DiagramPort { Visibility = PortVisibility.Hover }

// Visible only when connector is being connected
new DiagramPort { Visibility = PortVisibility.Connect }

// Combined
new DiagramPort { Visibility = PortVisibility.Hover | PortVisibility.Connect }

// Hidden
new DiagramPort { Visibility = PortVisibility.Hidden }
```

### Automatic Port Creation

Allow users to create ports dynamically by Ctrl+clicking a node:

```cshtml
@(Html.EJS().Diagram("diagram")
    .Constraints(DiagramConstraints.Default | DiagramConstraints.AutomaticPortCreation)
    .Render())
```
```

## Runtime Operations

```javascript
var diagram = document.getElementById('diagram').ej2_instances[0];

// Add ports to an existing node
var node = diagram.getObject('node1');
diagram.addPorts(node, [
    { id: 'newPort', shape: 'Circle', offset: { x: 0.25, y: 0 },
      visibility: ej.diagrams.PortVisibility.Visible }
]);

// Remove ports
diagram.removePorts(node, [node.ports[0]]);

// Update port style
diagram.nodes[0].ports[0].style.fill = 'red';
diagram.dataBind();
```

## Key Properties Reference

| Property | C# Type | Description |
|----------|---------|-------------|
| `Id` | string | Unique port identifier |
| `Shape` | `PortShapes` | Visual shape of the port |
| `PathData` | string | SVG path for Custom shape |
| `Offset` | `DiagramPoint` | Position (0–1 relative to node) |
| `Width` | double | Port width in pixels |
| `Height` | double | Port height in pixels |
| `Style` | `DiagramShapeStyle` | Fill, stroke, etc. |
| `Visibility` | `PortVisibility` | When port is shown |
| `Constraints` | `PortConstraints` | InConnect/OutConnect/None/Draw/Drag/Default/InheritTooltip/Tooltip |
| `ConnectionDirection` | string | Forced direction of connections |
| `Margin` | `DiagramMargin` | Offset from the computed position |
