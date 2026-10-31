# Groups and Containers in Syncfusion ASP.NET Core Diagram

## Table of Contents
- [Groups](#groups)
- [Creating Groups in Controller](#creating-groups-in-controller)
- [Group Padding and Style](#group-padding-and-style)
- [Runtime Group Operations](#runtime-group-operations)
- [Nested Groups](#nested-groups)
- [Containers](#containers)
- [Container Events and Callbacks](#container-events-and-callbacks)

## Groups

A group is a special node whose `Children` property contains IDs of child nodes. Child nodes must be declared before the group node in the `nodes` list.

### Creating Groups in Controller

```csharp
// Controller
var node1 = new DiagramNode
{
    Id = "node1",
    OffsetX = 100, OffsetY = 200,
    Width = 100, Height = 60,
    Shape = new { type = "Basic", shape = "Rectangle" },
    Style = new NodeStyleNodes { Fill = "#6BA5D7" }
};

var node2 = new DiagramNode
{
    Id = "node2",
    OffsetX = 250, OffsetY = 200,
    Width = 100, Height = 60,
    Shape = new { type = "Basic", shape = "Ellipse" },
    Style = new NodeStyleNodes { Fill = "#FFA36C" }
};

// Group — Children must appear before the group in the list
var group = new DiagramNode
{
    Id = "group1",
    Children = new string[] { "node1", "node2" }
};

ViewBag.nodes = new List<DiagramNode> { node1, node2, group };
```

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px"
    nodes="@ViewBag.nodes">
</ejs-diagram>
```

### Group in Tag Helper Syntax

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px">
    <e-diagram-nodes>
        <e-diagram-node id="child1" offsetX="100" offsetY="200" width="100" height="60">
        </e-diagram-node>
        <e-diagram-node id="child2" offsetX="250" offsetY="200" width="100" height="60">
        </e-diagram-node>
        <!-- Group node must come after children -->
        <e-diagram-node id="group1">
            <e-node-children>
                <e-node-child>child1</e-node-child>
                <e-node-child>child2</e-node-child>
            </e-node-children>
        </e-diagram-node>
    </e-diagram-nodes>
</ejs-diagram>
```

## Group Padding and Style

```csharp
var group = new DiagramNode
{
    Id = "group1",
    Children = new string[] { "node1", "node2" },
    Padding = new DiagramPadding { Left = 10, Right = 10, Top = 10, Bottom = 10 },
    Style = new NodeStyleNodes
    {
        Fill = "transparent",
        StrokeColor = "#6BA5D7",
        StrokeWidth = 2,
        StrokeDashArray = "5 3"
    }
};
```

| Property | Description |
|----------|-------------|
| `Padding` | Space between group bounding box and children |
| `Style.Fill` | Background fill (usually transparent for groups) |
| `Style.StrokeColor` | Border color |

## Runtime Group Operations

### Group Selected Nodes

```javascript
var diagram = document.getElementById('diagram').ej2_instances[0];

// Select multiple nodes, then group them
diagram.selectAll();    // or select individual nodes
diagram.group();        // creates a group from selected nodes
```

### Ungroup

```javascript
// Select the group node, then ungroup
var group = diagram.getObject('group1');
diagram.select([group]);
diagram.unGroup();
```

### Add Node to Existing Group

```javascript
var newChild = {
    id: 'node3',
    offsetX: 350, offsetY: 200,
    width: 100, height: 60,
    shape: { type: 'Basic', shape: 'Rectangle' }
};

// Add to diagram first, then to group
diagram.add(newChild);
diagram.addElements([newChild]);  // or reference via group.children
```

### Create Group Programmatically

```javascript
var group = {
    id: 'dynamicGroup',
    children: ['node1', 'node2']
};
diagram.add(group);
```

## Nested Groups

Groups can contain other groups:

```csharp
var innerGroup = new DiagramNode
{
    Id = "innerGroup",
    Children = new string[] { "node1", "node2" }
};

var outerGroup = new DiagramNode
{
    Id = "outerGroup",
    Children = new string[] { "innerGroup", "node3" }
};

ViewBag.nodes = new List<DiagramNode> { node1, node2, node3, innerGroup, outerGroup };
```

## Containers

## Create container

```csharp
// Container Node
    nodes.Add(new Node()
    {
        Id = "container",
        Width = 350,
        Height = 280,
        OffsetX = 250,
        OffsetY = 250,
        Shape = new DiagramShapeStyle()
        {
            Type = "Container",
            Children = ["node1", "node2"]
        },
        Style = new NodeStyleNodes()
        {
            Fill = "#E9EEFF",
            StrokeColor = "#2546BB",
            StrokeWidth = 1
        },
    });

```

## Container Events and Callbacks

### setNodeTemplate Callback for Containers

Use `setNodeTemplate` in JavaScript to build custom container layouts:

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px"
    nodes="@ViewBag.nodes"
    setNodeTemplate="setNodeTemplate">
</ejs-diagram>
<ejs-scripts></ejs-scripts>
<script>
    function setNodeTemplate(obj, diagram) {
        if (obj.shape && obj.shape.type === 'Canvas') {
            var container = new ej.diagrams.Canvas();
            container.id = obj.id + '_template';
            container.style.fill = 'transparent';

            var textElement = new ej.diagrams.TextElement();
            textElement.id = obj.id + '_label';
            textElement.content = obj.data ? obj.data.name : obj.id;
            textElement.style.color = '#333';
            textElement.style.fontSize = 12;
            textElement.relativeMode = 'Point';
            textElement.offsetX = 0.5;
            textElement.offsetY = 0.1;

            container.children = [textElement];
            return container;
        }
        return null;
    }

    function getNodeDefaults(node) {
        node.width = 150;
        node.height = 80;
        return node;
    }
</script>
```

### Stack Panel Template

```javascript
function setNodeTemplate(obj, diagram) {
    if (obj.shape && obj.shape.type === 'Stack') {
        var stack = new ej.diagrams.StackPanel();
        stack.id = obj.id + '_stack';
        stack.orientation = 'Vertical';
        stack.style.strokeColor = '#4674CE';
        stack.style.fill = '#E8F0FE';

        // Header
        var header = new ej.diagrams.TextElement();
        header.id = obj.id + '_header';
        header.content = obj.data ? obj.data.title : 'Header';
        header.style.fill = '#4674CE';
        header.style.color = 'white';
        header.style.fontSize = 12;
        header.style.bold = true;
        header.height = 30;

        // Body
        var body = new ej.diagrams.TextElement();
        body.id = obj.id + '_body';
        body.content = obj.data ? obj.data.description : '';
        body.style.fill = 'transparent';
        body.style.color = '#333';

        stack.children = [header, body];
        return stack;
    }
    return null;
}
```

## collectionChange Event for Groups

```cshtml
<ejs-diagram id="diagram"
    collectionChange="onCollectionChange">
</ejs-diagram>
<script>
    function onCollectionChange(args) {
        // args.type = 'Addition' | 'Removal'
        // args.element = node or connector added/removed
        // args.cause = 'Draw' | 'Edit' | 'Undefined' | 'Load' | 'Undo' | 'Redo'
        if (args.element.shape && args.element.shape.type === 'Canvas') {
            console.log('Container changed:', args.type);
        }
    }
</script>
```

## Key Points

| Feature | Notes |
|---------|-------|
| Group children order | Child nodes must appear **before** the group node in the nodes list |
| Group bounds | Automatically calculated from children bounds + padding |
| Group selection | Click once selects group; click again selects individual child |
| Child constraints | Children inherit some constraints from parent group |
| `diagram.addElements()` | Preferred method when adding pre-built group objects |
