# Connectors in Syncfusion ASP.NET Core Diagram

## Table of Contents
- [Creating Connectors](#creating-connectors)
- [Connector Types](#connector-types)
- [Connecting Nodes](#connecting-nodes)
- [Segments Configuration](#segments-configuration)
- [Decorators (Arrowheads)](#decorators-arrowheads)
- [Connector Style](#connector-style)
- [Bezier Connectors](#bezier-connectors)
- [Automatic Line Routing](#automatic-line-routing)
- [Runtime Operations](#runtime-operations)
- [getConnectorDefaults](#getconnectordefaults)
- [Connector Events](#connector-events)
- [Key Properties Reference](#key-properties-reference)

## Creating Connectors

Connectors are the lines linking nodes. Define them as `List<DiagramConnector>` and pass via `ViewBag`:

```csharp
var connectors = new List<DiagramConnector>
{
    new DiagramConnector
    {
        Id = "conn1",
        SourcePoint = new DiagramPoint { X = 100, Y = 100 },
        TargetPoint = new DiagramPoint { X = 300, Y = 200 }
    }
};
ViewBag.connectors = connectors;
```

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px" connectors="@ViewBag.connectors">
</ejs-diagram>
```

### Inline Tag Helper Syntax

```cshtml
<e-diagram-connectors>
    <e-diagram-connector id="conn1">
        <e-connector-sourcepoint x="100" y="100"></e-connector-sourcepoint>
        <e-connector-targetpoint x="300" y="200"></e-connector-targetpoint>
    </e-diagram-connector>
</e-diagram-connectors>
```

## Connector Types

Set the connector type via `Type` (uses the `Segments` enum):

| Type | Description |
|------|-------------|
| `Segments.Straight` | Straight line between source and target |
| `Segments.Orthogonal` | Right-angle (L-shaped / step) path |
| `Segments.Bezier` | Smooth curved path with control points |
| `Segments.PolyLine` | Multi-point polyline |
| `Segments.Freehand` | Freehand drawn path |

```csharp
new DiagramConnector
{
    Id = "conn1",
    SourceID = "node1",
    TargetID = "node2",
    Type = Segments.Orthogonal
}
```

## Connecting Nodes

### By Node ID

```csharp
new DiagramConnector
{
    Id = "conn1",
    SourceID = "node1",   // must match a node's Id
    TargetID = "node2"
}
```

### By Port ID

```csharp
new DiagramConnector
{
    Id = "conn1",
    SourceID = "node1",
    SourcePortID = "port1",   // connect to specific port
    TargetID = "node2",
    TargetPortID = "port2"
}
```

### By Coordinates (Free-floating)

```csharp
new DiagramConnector
{
    Id = "conn1",
    SourcePoint = new DiagramPoint { X = 100, Y = 200 },
    TargetPoint = new DiagramPoint { X = 400, Y = 300 }
}
```

### Padding

```csharp
new DiagramConnector
{
    SourceID = "node1",
    TargetID = "node2",
    SourcePadding = 5,   // gap from source node border
    TargetPadding = 5    // gap from target node border
}
```

## Segments Configuration

### Orthogonal Segments

Control the direction and length of each bend:

```csharp
new DiagramConnector
{
    Id = "conn1",
    SourceID = "node1",
    TargetID = "node2",
    Type = Segments.Orthogonal,
    Segments = new Segments
    {
        Type = Segments.Orthogonal,
        Direction = "Right",
        Length = 100
    }
}
```

Direction values: `"Right"`, `"Left"`, `"Top"`, `"Bottom"`

### Straight Segments

```csharp
new DiagramConnector
{
    Id = "conn1",
    SourceID = "node1",
    TargetID = "node2",
    Type = Segments.Straight
}
```

### Corner Radius (Orthogonal)

```csharp
new DiagramConnector { CornerRadius = 5 }
```

## Decorators (Arrowheads)

Configure the source and target end arrows:

```csharp
new DiagramConnector
{
    SourceDecorator = new DiagramDecorator
    {
        Shape = DecoratorShapes.Circle,
        Style = new DiagramShapeStyle { Fill = "white", StrokeColor = "#6BA5D7" }
    },
    TargetDecorator = new DiagramDecorator
    {
        Shape = DecoratorShapes.Arrow,
        Style = new DiagramShapeStyle { Fill = "#6BA5D7", StrokeColor = "#6BA5D7" }
    }
}
```

| Decorator Shape | Description |
|----------------|-------------|
| `Arrow` | Filled arrow (default) |
| `OpenArrow` | Open arrow outline |
| `Circle` | Circle end |
| `Square` | Square end |
| `Diamond` | Diamond end |
| `IndentedArrow` | Indented arrow |
| `OutdentedArrow` | Outdented arrow |
| `None` | No decorator |
| `Custom` | Custom SVG path via `PathData` |

Custom decorator example:

```csharp
TargetDecorator = new DiagramDecorator
{
    Shape = DecoratorShapes.Custom,
    PathData = "M 376.892,225.284L 371.588,219.998L 376.892,214.723L 382.192,219.998L 376.892,225.284Z"
}
```

## Connector Style

```csharp
new DiagramConnector
{
    Style = new DiagramStrokeStyle
    {
        StrokeColor = "#6BA5D7",
        StrokeWidth = 2,
        StrokeDashArray = "5,3",  // dashed line
        Opacity = 0.8
    }
}
```

### Bridging

When connectors cross, you can show a bridge arc. Enable bridging via `DiagramConstraints`:

```cshtml
<ejs-diagram id="diagram" constraints="Default,Bridging">
</ejs-diagram>
```

Also enable `ConnectorConstraints.Bridging` on the connector:

```csharp
new DiagramConnector
{
    Constraints = ConnectorConstraints.Default | ConnectorConstraints.Bridging
}
```

## Bezier Connectors

Bezier connectors support control points for custom curves.

### Using Vectors (Distance + Angle)

```csharp
new DiagramConnector
{
    Id = "bezierConn",
    Type = Segments.Bezier,
    SourceID = "node1",
    TargetID = "node2",
    Segments = new Segments
    {
        Type = Segments.Bezier,
        Vector1 = new Vector { Distance = 100, Angle = 0 },
        Vector2 = new Vector { Distance = 100, Angle = 180 }
    }
}
```

### Using Absolute Control Points

```csharp
Segments = new Segments
{
    Type = Segments.Bezier,
    Point1 = new DiagramPoint { X = 150, Y = 50 },
    Point2 = new DiagramPoint { X = 250, Y = 250 }
}
```

## Automatic Line Routing

Enable automatic routing to avoid overlapping nodes:

```cshtml
<ejs-diagram id="diagram"
    constraints="Default,LineRouting"
    nodes="@ViewBag.nodes"
    connectors="@ViewBag.connectors">
</ejs-diagram>
```

Or in JavaScript:

```javascript
var diagram = document.getElementById('diagram').ej2_instances[0];
diagram.constraints = ej.diagrams.DiagramConstraints.Default |
                      ej.diagrams.DiagramConstraints.LineRouting;
diagram.dataBind();
```

## Runtime Operations

```javascript
var diagram = document.getElementById('diagram').ej2_instances[0];

// Add a connector
diagram.add({
    id: 'newConn',
    sourceID: 'node1',
    targetID: 'node3',
    type: 'Orthogonal'
});

// Update connector style
diagram.connectors[0].style.strokeColor = '#6BA5D7';
diagram.connectors[0].style.strokeWidth = 2;
diagram.dataBind();

// Remove a connector
var conn = diagram.connectors[0];
diagram.remove(conn);
```

## getConnectorDefaults

Apply shared defaults to every connector:

```cshtml
<ejs-diagram id="diagram" getConnectorDefaults="getConnectorDefaults">
</ejs-diagram>

<script>
    function getConnectorDefaults(connector) {
        connector.type = 'Orthogonal';
        connector.style = { strokeColor: '#6BA5D7', strokeWidth: 2 };
        connector.targetDecorator = {
            shape: 'Arrow',
            style: { fill: '#6BA5D7', strokeColor: '#6BA5D7' }
        };
        return connector;
    }
</script>
```

## Connector Events

| Event | Description |
|-------|-------------|
| `connectionChange` | Connector source/target changed |
| `sourcePointChange` | Source endpoint moved |
| `targetPointChange` | Target endpoint moved |
| `segmentCollectionChange` | Segment added/removed |
| `click` | Connector clicked |
| `doubleClick` | Connector double-clicked |

```cshtml
<ejs-diagram id="diagram" connectionChange="onConnectionChange">
</ejs-diagram>

<script>
    function onConnectionChange(args) {
        console.log('Connector:', args.connector.id,
            'connected from:', args.connector.sourceID,
            'to:', args.connector.targetID);
    }
</script>
```

## Key Properties Reference

| Property | C# Type | Description |
|----------|---------|-------------|
| `Id` | string | Unique connector identifier |
| `SourceID` | string | Source node ID |
| `TargetID` | string | Target node ID |
| `SourcePortID` | string | Source port ID |
| `TargetPortID` | string | Target port ID |
| `SourcePoint` | `DiagramPoint` | Free-floating source coordinate |
| `TargetPoint` | `DiagramPoint` | Free-floating target coordinate |
| `Type` | `Segments` | Connector type (Straight/Orthogonal/Bezier) |
| `Segments` | `Segments` | Segment config |
| `Style` | `DiagramStrokeStyle` | Visual style |
| `SourceDecorator` | `DiagramDecorator` | Source arrowhead |
| `TargetDecorator` | `DiagramDecorator` | Target arrowhead |
| `SourcePadding` | double | Gap from source node |
| `TargetPadding` | double | Gap from target node |
| `CornerRadius` | double | Rounding for orthogonal bends |
| `Constraints` | `ConnectorConstraints` | Enable/disable behaviors |
| `ZIndex` | int | Stacking order |
