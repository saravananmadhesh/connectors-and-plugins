# Nodes in Syncfusion ASP.NET Core Diagram

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
var nodes = new List<DiagramNode>
{
    new DiagramNode()
    {
        Id = "node1",
        OffsetX = 200,
        OffsetY = 150,
        Width = 120,
        Height = 60,
        Annotations = new List<DiagramNodeAnnotation>
        {
            new DiagramNodeAnnotation() { Content = "My Node" }
        }
    }
};
ViewBag.nodes = nodes;
```

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px" nodes="@ViewBag.nodes">
</ejs-diagram>
```

### Inline Tag Helper Syntax

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px">
    <e-diagram-nodes>
        <e-diagram-node id="node1" offsetX="200" offsetY="150" width="120" height="60">
            <e-node-style fill="#6BA5D7" strokeColor="white"></e-node-style>
            <e-node-annotations>
                <e-node-annotation content="My Node"></e-node-annotation>
            </e-node-annotations>
        </e-diagram-node>
    </e-diagram-nodes>
</ejs-diagram>
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
| `ZIndex` | int | auto | Stacking order; higher = on top |

```csharp
new DiagramNode()
{
    Id = "node1",
    OffsetX = 300,
    OffsetY = 200,
    Width = 150,
    Height = 80,
    Pivot = new DiagramPoint() { X = 0.5, Y = 0.5 }  // centered (default)
}
```

## Node Style

Apply visual styling through the `Style` property (`NodeStyleNodes`):

```csharp
new DiagramNode()
{
    Id = "node1",
    OffsetX = 200, OffsetY = 150, Width = 120, Height = 60,
    Style = new NodeStyleNodes()
    {
        Fill = "#6BA5D7",
        StrokeColor = "#3A6EA5",
        StrokeWidth = 2,
        StrokeDashArray = "5,3",   // dashed border
        Opacity = 0.9,
        Visible = true
    }
}
```

| Style Property | Type | Description |
|---------------|------|-------------|
| `Fill` | string | Background color (hex/named) |
| `StrokeColor` | string | Border color |
| `StrokeWidth` | double | Border width in pixels |
| `StrokeDashArray` | string | Dash pattern for border (e.g., "5,3") |
| `Opacity` | double | Transparency (0.0–1.0) |
| `Visible` | bool | Show/hide the node |

## Gradient Fill

### Linear Gradient

```csharp
Style = new NodeStyleNodes()
{
    Gradient = new DiagramGradient
    {
        Type = GradientType.Linear,
        X1 = 0, Y1 = 0,
        X2 = 100, Y2 = 100,
        GradientStops = new List<DiagramGradientStop>
        {
            new DiagramGradientStop() { Color = "#6BA5D7", Offset = 0 },
            new DiagramGradientStop() { Color = "#3A6EA5", Offset = 100 }
        }
    }
}
```

### Radial Gradient

```csharp
Gradient = new DiagramRadialGradient()
{
    Type = GradientType.Radial,
    Cx = 50, Cy = 50,  // center
    Fx = 50, Fy = 50,  // focal point
    R = 50,            // radius
    GradientStops = new List<DiagramGradientStop>
    {
        new DiagramGradientStop() { Color = "#6BA5D7", Offset = 0 },
        new DiagramGradientStop() { Color = "#3A6EA5", Offset = 100 }
    }
}
```

## Shadow

Enable shadow on a node by adding `Shadow` to constraints and configuring the shadow shape:

```csharp
new DiagramNode
{
    Id = "node1",
    OffsetX = 200, OffsetY = 150, Width = 120, Height = 60,
    Constraints = NodeConstraints.Default | NodeConstraints.Shadow
}
```

```cshtml
<e-diagram-node id="node1" offsetX="200" offsetY="150" width="120" height="60"
    constraints="Default, Shadow">
    <e-node-shadow angle="50" opacity="0.9" distance="9"></e-node-shadow>
</e-diagram-node>
```

Shadow properties: `angle` (direction), `opacity` (0–1), `distance` (blur/spread).

## Expand and Collapse Icons

Add expand/collapse icons to nodes that have children (useful in tree layouts):

```cshtml
<e-diagram-node id="parent" offsetX="200" offsetY="100" width="100" height="60">
    <e-node-expandicon shape="ArrowDown" width="15" height="15">
        <e-expandicon-style fill="#6BA5D7" strokeColor="white"></e-expandicon-style>
    </e-node-expandicon>
    <e-node-collapseicon shape="ArrowUp" width="15" height="15">
        <e-collapseicon-style fill="gray" strokeColor="white"></e-collapseicon-style>
    </e-node-collapseicon>
</e-diagram-node>
```

Icon shapes: `ArrowDown`, `ArrowUp`, `ArrowLeft`, `ArrowRight`, `Plus`, `Minus`, `None`, `HalfCircleTop`, `HalfCircleBottom`.

Control expansion state:

```csharp
new DiagramNode() { Id = "node1", IsExpanded = false }  // collapsed on load
```

## Node Templates

Use an HTML template for custom node appearance. Requires injecting `DiagramHtmlContent`:

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px"
    setNodeTemplate="setNodeTemplate"
    nodes="@ViewBag.nodes">
</ejs-diagram>

<script type="text/x-template" id="nodeTemplate">
    <div style="background:#6BA5D7; color:white; padding:5px; border-radius:4px;">
        ${data.Name}
    </div>
</script>

<script>
    function setNodeTemplate(obj, diagram) {
        if (obj.data) {
            return document.getElementById('nodeTemplate').innerHTML
                .replace('${data.Name}', obj.data.Name);
        }
    }
</script>
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

// Add multiple elements at once
diagram.addElements([node1, node2, connector1]);
```

### Custom Data with addInfo

Attach custom metadata to nodes:

```csharp
new DiagramNode()
{
    Id = "node1",
    OffsetX = 200, OffsetY = 150,
    AddInfo = new { Department = "Engineering", Level = 2 }
}
```

Access in JavaScript: `diagram.nodes[0].addInfo.Department`

## Node Events

| Event | Description |
|-------|-------------|
| `positionChange` | Node moved |
| `sizeChange` | Node resized |
| `rotateChange` | Node rotated |
| `click` | Node or connector clicked |
| `doubleClick` | Node or connector double-clicked |
| `mouseEnter` | Mouse entered node |
| `mouseLeave` | Mouse left node |
| `collectionChange` | Nodes/connectors added or removed |
| `textEdit` | Annotation editing started/ended |
| `expandStateChange` | Node expanded or collapsed |

```cshtml
<ejs-diagram id="diagram"
    positionChange="onPositionChange"
    sizeChange="onSizeChange"
    collectionChange="onCollectionChange">
</ejs-diagram>

<script>
    function onPositionChange(args) {
        console.log('Node moved:', args.source.id,
            'to', args.newValue.offsetX, args.newValue.offsetY);
    }
    function onSizeChange(args) {
        console.log('Node resized:', args.source.id);
    }
    function onCollectionChange(args) {
        // args.type = 'Addition' | 'Removal'
        console.log(args.type, args.element.id);
    }
</script>
```

## getNodeDefaults

Apply shared defaults to every node via a JavaScript callback. The function receives the node object and should return it after modification:

```cshtml
<ejs-diagram id="diagram" getNodeDefaults="getNodeDefaults" nodes="@ViewBag.nodes">
</ejs-diagram>

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
| `IsExpanded` | bool | Expand/collapse state in layouts |
| `ZIndex` | int | Stacking order |
| `Flip` | `FlipDirection` | Horizontal/Vertical/Both/None |
| `AddInfo` | object | Custom metadata |
| `InEdges` | string[] | Read-only incoming connector IDs |
| `OutEdges` | string[] | Read-only outgoing connector IDs |
