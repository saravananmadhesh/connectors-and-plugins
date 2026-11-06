# Automatic Layouts in Syncfusion ASP.NET Core Diagram

## Table of Contents
- [Hierarchical Tree Layout](#hierarchical-tree-layout)
- [Organizational Chart Layout](#organizational-chart-layout)
- [Radial Tree Layout](#radial-tree-layout)
- [Mind Map Layout](#mind-map-layout)
- [Symmetric Layout](#symmetric-layout)
- [Complex Hierarchical Layout](#complex-hierarchical-layout)
- [Layout Configuration](#layout-configuration)
- [Expand and Collapse](#expand-and-collapse)
- [Data Binding with Layouts](#data-binding-with-layouts)

## Hierarchical Tree Layout

Arranges nodes in layers with parent nodes above their children:

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px"
    nodes="@ViewBag.nodes"
    connectors="@ViewBag.connectors"
    getNodeDefaults="getNodeDefaults"
    getConnectorDefaults="getConnectorDefaults">
    <e-diagram-layout type="HierarchicalTree"
        horizontalSpacing="40"
        verticalSpacing="40"
        orientation="TopToBottom">
    </e-diagram-layout>
</ejs-diagram>
```

Or via ViewBag:

```csharp
ViewBag.layout = new DiagramLayout
{
    Type = LayoutType.HierarchicalTree,
    HorizontalSpacing = 40,
    VerticalSpacing = 40,
    Orientation = LayoutOrientation.TopToBottom
};
```

`orientation` values: `TopToBottom`, `BottomToTop`, `LeftToRight`, `RightToLeft`

## Organizational Chart Layout

The org chart layout supports custom assistant/children assignment and orientation per subtree:

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px"
    nodes="@ViewBag.nodes"
    connectors="@ViewBag.connectors"
    getLayoutInfo="getLayoutInfo"
    getNodeDefaults="getNodeDefaults">
    <e-diagram-layout type="OrganizationalChart"
        horizontalSpacing="40"
        verticalSpacing="40">
    </e-diagram-layout>
</ejs-diagram>
```

**Note*: For organizational charts, set `layout.type` to `OrganizationalChart`. This layout is built on top of the `HierarchicalTree` module, so you must still inject the `HierarchicalTree` module for it to work correctly.

### getLayoutInfo Callback

Use `getLayoutInfo` to customize per-subtree orientation and assistants:

```javascript
function getLayoutInfo(node, options) {
    // options.children — array of child node IDs at this level
    // options.assistants — nodes displayed as assistants
    // options.type — 'center', 'left', 'right', 'alternate', 'balanced'
    // options.orientation — 'Horizontal' | 'Vertical'
    // options.offset — horizontal offset for alternate orientation

    if (node.data && node.data.Role === 'Director') {
        options.assistants.push(options.children[0]);
        options.children.splice(0, 1);
    }
    return options;
}
```

Orientation options for `options.type`:
- Horizontal: `"center"`, `"left"`, `"right"`, `"balanced"`
- Vertical: `"left"`, `"right"`, `"alternate"`

## Radial Tree Layout

Positions nodes in concentric circles around a root:

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px"
    nodes="@ViewBag.nodes"
    connectors="@ViewBag.connectors">
    <e-diagram-layout type="RadialTree"
        horizontalSpacing="40"
        verticalSpacing="40">
    </e-diagram-layout>
</ejs-diagram>
```

## Mind Map Layout

Arranges nodes around a central root, branching left and right:

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px"
    nodes="@ViewBag.nodes"
    connectors="@ViewBag.connectors">
    <e-diagram-layout type="MindMap"
        horizontalSpacing="40"
        verticalSpacing="40">
    </e-diagram-layout>
</ejs-diagram>
<ejs-scripts></ejs-scripts>
<script>
    // MindMap requires the MindMap module
    ej.diagrams.Diagram.Inject(ej.diagrams.MindMap);
</script>
```

### Mind Map Branch Direction

Control which side of the root a node appears on via `Branch` in node data:

```csharp
// In data records
new { Name = "Topic A", ReportingTo = "Root", Branch = "Right" }
new { Name = "Topic B", ReportingTo = "Root", Branch = "Left" }
new { Name = "Sub-Topic", ReportingTo = "Topic A", Branch = "subRight" }
```

`Branch` values: `"Root"`, `"Right"`, `"Left"`, `"subRight"`, `"subLeft"`

## Symmetric Layout

Distributes nodes with equal spacing — useful for network/graph diagrams:

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px"
    nodes="@ViewBag.nodes"
    connectors="@ViewBag.connectors">
    <e-diagram-layout type="SymmetricalLayout"
        springLength="80"
        springFactor="0.8"
        maxIteration="500">
    </e-diagram-layout>
</ejs-diagram>
```

| Property | Description |
|----------|-------------|
| `springLength` | Ideal edge length (pixels) |
| `springFactor` | Repulsion/attraction factor (0–1) |
| `maxIteration` | Maximum layout iterations |

## Complex Hierarchical Layout

For trees where nodes can have multiple parents (DAG-style):

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px"
    nodes="@ViewBag.nodes"
    connectors="@ViewBag.connectors">
    <e-diagram-layout type="ComplexHierarchicalTree"
        horizontalSpacing="40"
        verticalSpacing="40">
    </e-diagram-layout>
</ejs-diagram>
<ejs-scripts></ejs-scripts>
<script>
    ej.diagrams.Diagram.Inject(ej.diagrams.ComplexHierarchicalTree);
</script>
```

### Multiple Parent Nodes (ReportingPersons)

```csharp
// Data record with multiple reporting persons
new { Id = "node1", ReportingPersons = new[] { "parentA", "parentB" } }
```

### Connection Point Options

```cshtml
<e-diagram-layout type="ComplexHierarchicalTree"
    connectionPointOrigin="SamePoint">
</e-diagram-layout>
```

`connectionPointOrigin` values:
- `SamePoint` — all edges from a node share one connection point
- `DifferentPoint` — each edge has its own connection point

### Arrangement

```cshtml
<e-diagram-layout type="ComplexHierarchicalTree" arrangement="Linear">
</e-diagram-layout>
```

`arrangement` values: `"Linear"`, `"Nonlinear"`

## Layout Configuration

### Common Layout Properties

| Property | Description |
|----------|-------------|
| `horizontalSpacing` | Horizontal gap between nodes |
| `verticalSpacing` | Vertical gap between nodes |
| `orientation` | Tree flow direction (TopToBottom, etc.) |
| `margin` | Margin for layout bounds |
| `fixedNode` | ID of node kept in place when layout runs |
| `root` | ID of the root node |
| `bounds` | Explicit bounding rect for layout |
| `horizontalAlignment` | Align layout within bounds (Left/Center/Right) |
| `verticalAlignment` | Align layout within bounds (Top/Center/Bottom) |

### Margin Example

```csharp
ViewBag.layoutMargin = new DiagramMargin { Left = 20, Top = 20, Right = 20, Bottom = 20 };
```

```cshtml
<e-diagram-layout type="HierarchicalTree"
    horizontalSpacing="40" verticalSpacing="40"
    margin="@ViewBag.layoutMargin">
</e-diagram-layout>
```

### Fixed Node (Prevent Root Repositioning)

```javascript
var diagram = document.getElementById('diagram').ej2_instances[0];
// After collapse/expand, anchor layout to this node
diagram.layout.fixedNode = 'rootNodeId';
diagram.dataBind();
```

## Expand and Collapse

Control which nodes start collapsed and handle expand/collapse events:

```csharp
// Set node expanded state
new DiagramNode
{
    Id = "manager",
    IsExpanded = false    // starts collapsed
}
```

```cshtml
<ejs-diagram id="diagram"
    expandStateChange="onExpandStateChange">
    <e-diagram-nodes>
        <e-diagram-node id="manager" isExpanded="false">
            <e-node-expandicon shape="ArrowDown" width="12" height="12">
            </e-node-expandicon>
            <e-node-collapseicon shape="ArrowUp" width="12" height="12">
            </e-node-collapseicon>
        </e-diagram-node>
    </e-diagram-nodes>
</ejs-diagram>

<script>
    function onExpandStateChange(args) {
        // args.element = the node
        // args.state = 'Expanded' | 'Collapsed'
        console.log(args.element.id, 'is now', args.state);
    }
</script>
```

## Data Binding with Layouts

Combine `<e-diagram-datasourcesettings>` with a layout to auto-generate the diagram from data:

```csharp
// Controller
ViewBag.employees = EmployeeData.GetAll();  // List<EmployeeModel>
```

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px"
    getNodeDefaults="getNodeDefaults"
    getConnectorDefaults="getConnectorDefaults"
    setNodeTemplate="setNodeTemplate">
    <e-diagram-datasourcesettings
        id="Id"
        parentId="ReportingPerson"
        dataManager="new DataManager(){ Data = (List<EmployeeModel>)ViewBag.employees }">
    </e-diagram-datasourcesettings>
    <e-diagram-layout type="OrganizationalChart"
        horizontalSpacing="40" verticalSpacing="40">
    </e-diagram-layout>
</ejs-diagram>

<script>
    function getNodeDefaults(node) {
        node.width = 140;
        node.height = 60;
        return node;
    }
    function getConnectorDefaults(connector) {
        connector.type = 'Orthogonal';
        return connector;
    }
    function setNodeTemplate(obj, diagram) {
        // Customize node appearance from obj.data
        return null;  // return null to use default rendering
    }
</script>
```
