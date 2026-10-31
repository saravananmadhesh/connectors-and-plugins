# Nodes in Syncfusion ASP.NET MVC Diagram

## Table of Contents
- [Creating Nodes](#creating-nodes)
- [Position and Size](#position-and-size)
- [Node Style](#node-style)
- [Gradient Fill](#gradient-fill)
- [Shadow](#shadow)
- [Expand and Collapse Icons](#expand-and-collapse-icons)
- [Node Templates](#node-templates)
- [Runtime Operations](#runtime-operations)
- [Node Events](#node-events)
- [getNodeDefaults](#getnodedefaults)
- [Key Properties Reference](#key-properties-reference)

## Creating Nodes

Nodes are the visual elements of the diagram. Define them as a `List<DiagramNode>` and pass to the diagram via `ViewBag`:

```csharp
// Controller / PageModel

List < DiagramNode > nodes = new List < DiagramNode > ();
List < DiagramNodeAnnotation > Node1 = new List < DiagramNodeAnnotation > ();
Node1.Add(new DiagramNodeAnnotation() {
    Content = "node1", Style = new DiagramTextStyle() {
        Color = "White", StrokeColor = "None",
        Bold = true, FontFamily = "Arial",
        FontSize = 15, Italic = false, Fill = "transparent",
        Opacity = 0.7,  // 0 to 1.
        TextAlign = Syncfusion.EJ2.Diagrams.TextAlign.Center,   // Left | Right | Center | Justify
        TextDecoration = Syncfusion.EJ2.Diagrams.TextDecoration.None,   // None | Overline | Underline | LineThrough
        TextOverflow = Syncfusion.EJ2.Diagrams.TextOverflow.Wrap,   // Wrap | Ellipsis | Clip
        TextWrapping = Syncfusion.EJ2.Diagrams.TextWrap.WrapWithOverflow,   // WrapWithOverflow | Wrap | NoWrap
        WhiteSpace = Syncfusion.EJ2.Diagrams.WhiteSpace.CollapseSpace,    // PreserveAll | CollapseSpace | CollapseAll
    }
});
nodes.Add(new DiagramNode() {
    Id = "node1",
        Width = 100,
        Height = 100,
        BorderWidth=2,
        Style = new NodeStyleNodes() {
            Fill = "darkcyan"
        },
        OffsetX = 100,
        OffsetY = 100,
        Annotations = Node1
});
ViewBag.nodes = nodes;
```

```cshtml
@(Html.EJS().Diagram("diagram")
    .Width("100%")
    .Height("550px")
    .Nodes(ViewBag.nodes)
    .Render())
```

## Position and Size

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `OffsetX` | double | 0 | X coordinate of node center |
| `OffsetY` | double | 0 | Y coordinate of node center |
| `Width` | double | 100 | Node width in pixels |
| `Height` | double | 60 | Node height in pixels |
| `Pivot` | `DiagramPoint` | {0.5, 0.5} | Anchor point for position (0–1 range) |
| `Flip` | `FlipDirection` | None | Flip: Horizontal / Vertical / Both |

```csharp
List < DiagramNode > nodes = new List < DiagramNode > ();
nodes.Add(new DiagramNode() {
    Id = "node1",
    Width = 100,
    Height = 100,
    OffsetX = 100,
    OffsetY = 100,
    Pivot = new DiagramPoint { X = 0.5, Y = 0.5 }  // centered (default)
    Flip = Syncfusion.EJ2.Diagrams.FlipDirection.None,
});
```

## Node Style

Apply visual styling through the `Style` property (`NodeStyleNodes`):

| Style Property | Type | Description |
|---------------|------|-------------|
| `Fill` | string | Background color (hex/named) |
| `StrokeColor` | string | Border color |
| `StrokeWidth` | double | Border width in pixels |
| `StrokeDashArray` | string | Dash pattern for border (e.g., "5,3") |
| `Opacity` | double | Transparency (0.0–1.0) |

```csharp
List < DiagramNode > nodes = new List < DiagramNode > ();
nodes.Add(new DiagramNode() {
    Id = "node1",
    Width = 100, Height = 100,
    OffsetX = 100, OffsetY = 100,
    Style = new NodeStyleNodes()
    {
        Fill = "#6BA5D7",
        StrokeColor = "#3A6EA5",
        StrokeWidth = 2,
        StrokeDashArray = "5,3",   // dashed border
        Opacity = 0.9,
    }
});
```

## Gradient Fill

### Linear Gradient

```csharp
public class HomeController : Controller
{
     public ActionResult Index()
     {
         List<DiagramNode> nodes = new List<DiagramNode>();
         nodes.Add(new DiagramNode()
         {
             Id = "node1",
             Width = 100,
             Height = 100,
             OffsetX = 100,
             OffsetY = 100,
             Style = new NodeStyleNodes()
             {
                 Fill = "#6BA5D7",
                 StrokeColor = "#3A6EA5",
                 StrokeWidth = 2,
                 StrokeDashArray = "5,3",   // dashed border
                 Opacity = 0.9,
                 Gradient = new DiagramGradient()
                 {
                     Type = Syncfusion.EJ2.Diagrams.GradientType.Linear,
                     X1 = 0,
                     Y1 = 0,
                     X2 = 100,
                     Y2 = 100,
                     Stops = new List<DiagramStop>()
                     {
                         new DiagramStop() { Color = "#6BA5D7", Offset = 0, Opacity = 1 },
                         new DiagramStop() { Color = "#3A6EA5", Offset = 100, Opacity = 1 }
                     }
                 }
             }
         });
         ViewBag.nodes = nodes;
         return View();
     }
 }

 public class DiagramGradient
{
    [DefaultValue(null)]
    [HtmlAttributeName("type")]
    [JsonProperty("type")]
    public Syncfusion.EJ2.Diagrams.GradientType Type { get; set; }
    [DefaultValue(null)]
    [HtmlAttributeName("x1")]
    [JsonProperty("x1")]
    public double X1 { get; set; }
    [DefaultValue(null)]
    [HtmlAttributeName("y1")]
    [JsonProperty("y1")]
    public double Y1 { get; set; }
    [DefaultValue(null)]
    [HtmlAttributeName("x2")]
    [JsonProperty("x2")]
    public double X2 { get; set; }
    [DefaultValue(null)]
    [HtmlAttributeName("y2")]
    [JsonProperty("y2")]
    public double Y2 { get; set; }
    [DefaultValue(null)]
    [HtmlAttributeName("stops")]
    [JsonProperty("stops")]
    public List<DiagramStop> Stops { get; set; }
    [DefaultValue(null)]
    [HtmlAttributeName("cx")]
    [JsonProperty("cx")]
    public double Cx { get; set; }
    [DefaultValue(null)]
    [HtmlAttributeName("cy")]
    [JsonProperty("cy")]
    public double Cy { get; set; }
    [DefaultValue(null)]
    [HtmlAttributeName("fx")]
    [JsonProperty("fx")]
    public double Fx { get; set; }

    [DefaultValue(null)]
    [HtmlAttributeName("fy")]
    [JsonProperty("fy")]
    public double Fy { get; set; }

    [DefaultValue(null)]
    [HtmlAttributeName("r")]
    [JsonProperty("r")]
    public double R { get; set; }

}


```

### Radial Gradient

```csharp
Gradient = new DiagramGradient()
{
    Type = Syncfusion.EJ2.Diagrams.GradientType.Radial,
    Cx = 50, Cy = 50,  // center
    Fx = 50, Fy = 50,  // focal point
    R = 50,            // radius
    Stops = new List<DiagramStop> ()
    {
        new DiagramStop() { Color = "#6BA5D7", Offset = 0, Opacity = 1 },
        new DiagramStop() { Color = "#3A6EA5", Offset = 100, Opacity = 1 }
    }
}
```

## Shadow

Enable shadow on a node by adding `Shadow` to constraints and configuring the shadow shape:

```csharp
List < DiagramNode > nodes = new List < DiagramNode > ()
{
    new DiagramNode()
    {
        Id = "node1",
        OffsetX = 200, OffsetY = 150, Width = 120, Height = 60,
        Constraints = NodeConstraints.Default | NodeConstraints.Shadow,
        Shadow = new DiagramShadow()
        {
            Angle = 45, Color = "#6BA5D7", Distance = 5, Opacity = 0.7
        }
    }
};

```

Shadow properties: `angle` (direction), `opacity` (0–1), `distance` (blur/spread).

## Expand and Collapse Icons

Add expand/collapse icons to nodes that have children (useful in tree layouts):

```csharp
List < DiagramNode > nodes = new List < DiagramNode > ()
{
    new DiagramNode()
    {
        Id = "node1",
        OffsetX = 200, OffsetY = 150, Width = 120, Height = 60,
        ExpandIcon = new DiagramIconShape() { Shape = Syncfusion.EJ2.Diagrams.IconShapes.ArrowDown, Height = 10, Width = 10},
        CollapseIcon = new DiagramIconShape() { Shape = Syncfusion.EJ2.Diagrams.IconShapes.ArrowUp, Height = 10, Width = 10}
    }
};

```

Icon shapes: `ArrowDown`, `ArrowUp`,`Plus`, `Minus`, `None`, `Path`, `Template`.


## Node Templates

Use an HTML template for custom node appearance.

```cshtml

@(Html.EJS().Diagram("container")
    .Width("100%")
    .Height("580px")
    .NodeTemplate("#nodeTemplate")
    .Nodes(ViewBag.nodes).Render())
<script type="text/x-template" id="nodeTemplate">
        <div style="background:#6BA5D7; color:white; padding:5px; border-radius:4px;">
            Template
        </div>
</script>

<script>
</script>
```
```csharp
 List<DiagramNode> nodes = new List<DiagramNode>()
 {
     new DiagramNode()
     {
        Id = "node1",
        Shape = new DiagramHtml(){ Type = Shapes.HTML},
        OffsetX = 200, OffsetY = 150, Width = 120, Height = 60
     }
 };

 ViewBag.nodes = nodes;
```

## Runtime Operations

Access the diagram instance via JavaScript to add, remove, or update nodes:

```javascript
var diagram = document.getElementById('diagram').ej2_instances[0];

// Add a node
diagram.add({
    id: 'newNode',
    offsetX: 400, offsetY: 200,
    width: 100, height: 60,
    annotations: [{ content: 'New Node' }]
});

// Remove a node by reference
var node = diagram.nodes[0];
diagram.remove(node);

// Update node properties and refresh
diagram.nodes[0].style.fill = 'red';
diagram.dataBind();

var nodes = [
    {
        id: 'node1',
        offsetX: 400, offsetY: 200,
        width: 100, height: 60,
        annotations: [{ content: 'New Node' }]
    },
    {
        id: 'node2',
        offsetX: 400, offsetY: 200,
        width: 100, height: 60,
        annotations: [{ content: 'New Node' }]
    }
];
// Add multiple elements at once
diagram.addElements(nodes);
```

### Custom Data with addInfo

Attach custom metadata to nodes:

```csharp
List < DiagramNode > nodes = new List < DiagramNode > ()
{
    new DiagramNode()
    {
        Id = "node1",
        OffsetX = 200, OffsetY = 150,
        AddInfo = new { Department = "Engineering", Level = 2 } 
    }
};
```

Access in JavaScript: `diagram.nodes[0].addInfo.Department`

## Node Events

| Event | Description |
|-------|-------------|
| `PositionChange` | Node moved |
| `SizeChange` | Node resized |
| `RotateChange` | Node rotated |
| `Click` | Node or connector clicked |
| `DoubleClick` | Node or connector double-clicked |
| `MouseEnter` | Mouse entered node |
| `MouseLeave` | Mouse left node |
| `CollectionChange` | Nodes/connectors added or removed |
| `TextEdit` | Annotation editing started/ended |
| `ExpandStateChange` | Node expanded or collapsed |

```cshtml
@(Html.EJS().Diagram("diagram")
    .PositionChange("onPositionChange")
    .SizeChange("onSizeChange")
    .CollectionChange("onCollectionChange")
    .Render())

<script>
    function onPositionChange(args) {
        console.log('Node moved:', args);
    }
    function onSizeChange(args) {
        console.log('Node resized:', args);
    }
    function onCollectionChange(args) {
        // args.type = 'Addition' | 'Removal'
        console.log('Collection Change', args);
    }
</script>
```

## getNodeDefaults

Apply shared defaults to every node via a JavaScript callback. The function receives the node object and should return it after modification:

```cshtml
@(Html.EJS().Diagram("diagram")
    .GetNodeDefaults("getNodeDefaults")
    .Nodes(ViewBag.nodes)
    .Render())

<script>
    function getNodeDefaults(node) {
        node.height = 60;
        node.width = 120;
        node.style = {
            fill: '#6BA5D7',
            strokeColor: 'white',
            strokeWidth: 1
        };
        return node;
    }
</script>
```

> Individual node properties override `getNodeDefaults` values.

## Key Properties Reference

| Property | C# Type | Description |
|----------|---------|-------------|
| `Id` | string | Unique node identifier |
| `OffsetX` | double | Center X position |
| `OffsetY` | double | Center Y position |
| `Width` | double | Node width |
| `Height` | double | Node height |
| `Shape` | object | Shape type and configuration |
| `Style` | `NodeStyleNodes` | Visual appearance |
| `Annotations` | `List<DiagramNodeAnnotation>` | Text labels |
| `Ports` | `List<DiagramPort>` | Connection points |
| `Constraints` | `NodeConstraints` | Enable/disable behaviors |
| `Flip` | `FlipDirection` | Horizontal/Vertical/Both/None |
| `AddInfo` | object | Custom metadata |
| `InEdges` | string[] | Read-only incoming connector IDs |
| `OutEdges` | string[] | Read-only outgoing connector IDs |
