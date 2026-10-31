# Connectors in Syncfusion ASP.NET MVC Diagram

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
@(Html.EJS().Diagram("diagram")
    .Width("100%")
    .Height("550px")
    .Connectors(ViewBag.connectors)
    .Render())
```

## Connector Types

Set the connector type via `Type` (uses the `Segments` enum):

| Type | Description |
|------|-------------|
| `Segments.Straight` | Straight line between source and target |
| `Segments.Orthogonal` | Right-angle (L-shaped / step) path |
| `Segments.Bezier` | Smooth curved path with control points |
| `Segments.Polyline` | Multi-point polyline |
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
        public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var connectors = new List<DiagramConnector>
            {
                new DiagramConnector
               {
                Id = "conn1",
                SourcePoint = new DiagramPoint() { X = 100, Y = 100 },
                TargetPoint = new DiagramPoint() { X = 200, Y = 100 },
                Type = Segments.Orthogonal,
                Segments = new List<OrthogonalSegment>()
                    {
                        new OrthogonalSegment()
                        {
                            Type = Segments.Orthogonal,
                            Direction = "Right",
                            Length = 50
                        },
                         new OrthogonalSegment()
                        {
                            Type = Segments.Orthogonal,
                            Direction = "Bottom",
                            Length = 50
                        }
                    }
                }
            };
            ViewBag.connectors = connectors;
         

            return View();
        }
    }

    public class OrthogonalSegment
    {
        [DefaultValue(Segments.Straight)]
        [HtmlAttributeName("type")]
        [JsonProperty("type")]
        public Segments Type
        {
            get;
            set;
        }
        [DefaultValue(null)]
        [HtmlAttributeName("direction")]
        [JsonProperty("direction")]
        public string Direction
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
    }
```

Direction values: `"Right"`, `"Left"`, `"Top"`, `"Bottom"`

### Straight Segments

```csharp
Segments = new List<ConnectorSegments>
{
    new ConnectorSegments
    {
        Type = Segments.Straight,
        Point = new DiagramPoint { X = 250, Y = 150 }
    }
}
```

### Corner Radius (Orthogonal)

```csharp
new DiagramConnector 
{
  Id = "conn1",
  SourcePoint = new DiagramPoint() { X = 100, Y = 100 },
  // Corner-radius of connector
  CornerRadius = 5,
  TargetPoint = new DiagramPoint() { X = 200, Y = 100 },
  Type = Segments.Orthogonal,
}
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

## Connector Decorator Shapes

| Decorator Shape     | Description |
|---------------------|-------------|
| `Arrow`             | Filled arrow (default) |
| `OpenArrow`         | Open arrow outline |
| `Circle`            | Circular decorator |
| `Square`            | Square-shaped decorator |
| `Diamond`           | Diamond-shaped decorator |
| `IndentedArrow`     | Arrow with inward indentation |
| `OutdentedArrow`    | Arrow with outward indentation |
| `Fletch`            | V-shaped filled arrow |
| `OpenFletch`        | V-shaped open arrow |
| `DoubleArrow`       | Double-ended arrow |
| `None`              | No decorator |
| `Custom`            | Custom SVG path using `PathData` |

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
@(Html.EJS().Diagram("diagram")
    .Constraints(Syncfusion.EJ2.Diagrams.DiagramConstraints.Default | Syncfusion.EJ2.Diagrams.DiagramConstraints.Bridging)
    .Render())
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
public class HomeController : Controller
{
    public ActionResult Index()
    {
    
        var connectors = new List<DiagramConnector>
        {
            new DiagramConnector
           {
            Id = "conn1",
            SourcePoint = new DiagramPoint() { X = 100, Y = 100 },
            TargetPoint = new DiagramPoint() { X = 200, Y = 100 },
            Type = Segments.Bezier,
            Segments = new List<BezierSegment>()
                {
                    new BezierSegment()
                    {
                        Type = Segments.Bezier,
                        Vector1 = new BezierVector() { Distance = 100, Angle= 45},
                        Vector2 = new BezierVector() {Distance = 100, Angle= 180 }
                    },
                }
            }
        };
        ViewBag.connectors = connectors;
     

        return View();
    }
}

 public class BezierSegment
 {
     [DefaultValue(Segments.Straight)]
     [HtmlAttributeName("type")]
     [JsonProperty("type")]
     public Segments Type
     {
         get;
         set;
     }
     [DefaultValue(null)]
     [HtmlAttributeName("point1")]
     [JsonProperty("point1")]
     public DiagramPoint Point1
     {
         get;
         set;
     }
     [DefaultValue(null)]
     [HtmlAttributeName("point2")]
     [JsonProperty("point2")]
     public DiagramPoint Point2
     {
         get;
         set;
     }
     [DefaultValue(null)]
     [HtmlAttributeName("vector1")]
     [JsonProperty("vector1")]
     public BezierVector Vector1
     {
         get;
         set;
     }
     [DefaultValue(null)]
     [HtmlAttributeName("vector2")]
     [JsonProperty("vector2")]
     public BezierVector Vector2
     {
         get;
         set;
     }

 }

 public class BezierVector {
     [DefaultValue(0)]
     [HtmlAttributeName("angle")]
     [JsonProperty("angle")]
     public double Angle
     {
         get;
         set;
     }
     [DefaultValue(0)]
     [HtmlAttributeName("distance")]
     [JsonProperty("distance")]
     public double Distance
     {
         get;
         set;
     }
 }
```

### Using Absolute Control Points

```csharp
Segments = new List<BezierSegment>()
    {
        new BezierSegment()
        {
            Type = Segments.Bezier,
            Point1 = new DiagramPoint() { X = 150, Y = 50 },
            Point2 = new DiagramPoint() { X = 150, Y = 150 },
        },
    }
```

## Automatic Line Routing

Enable automatic routing to avoid overlapping nodes:

```cshtml
@(Html.EJS().Diagram("diagram")
    .Constraints(Syncfusion.EJ2.Diagrams.DiagramConstraints.Default | Syncfusion.EJ2.Diagrams.DiagramConstraints.LineRouting)
    .Nodes(ViewBag.nodes)
    .Connectors(ViewBag.connectors)
    .Render())
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
@(Html.EJS().Diagram("diagram")
    .GetConnectorDefaults("getConnectorDefaults")
    .Render())

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
| `ConnectionChange` | Connector source/target changed |
| `SourcePointChange` | Source endpoint moved |
| `TargetPointChange` | Target endpoint moved |
| `SegmentCollectionChange` | Segment added/removed |
| `Click` | Connector clicked |
| `DoubleClick` | Connector double-clicked |

```cshtml
@(Html.EJS().Diagram("diagram")
    .ConnectionChange("onConnectionChange")
    .Render())

<script>
    function onConnectionChange(args) {
        console.log('Connector:', args.element.id,
            'connected from:', args.element.sourceID,
            'to:', args.element.targetID);
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
| `Segments` | `List<OrthogonalSegment | BezierSegment | StraightSegment>` | Segment config |
| `Style` | `DiagramStrokeStyle` | Visual style |
| `SourceDecorator` | `DiagramDecorator` | Source arrowhead |
| `TargetDecorator` | `DiagramDecorator` | Target arrowhead |
| `SourcePadding` | double | Gap from source node |
| `TargetPadding` | double | Gap from target node |
| `CornerRadius` | double | Rounding for orthogonal bends |
| `Constraints` | `ConnectorConstraints` | Enable/disable behaviors |
| `ZIndex` | int | Stacking order |
