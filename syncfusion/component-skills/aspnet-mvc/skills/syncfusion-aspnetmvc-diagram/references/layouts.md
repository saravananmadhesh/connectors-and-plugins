# Automatic Layouts in Syncfusion ASP.NET MVC Diagram

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

```csharp
ViewBag.layout = new DiagramLayout
{
    Type = LayoutType.HierarchicalTree,
    HorizontalSpacing = 40,
    VerticalSpacing = 40,
    Orientation = LayoutOrientation.TopToBottom
};
```

```cshtml
@(Html.EJS().Diagram("diagram")
    .Width("100%")
    .Height("550px")
    .Nodes(ViewBag.nodes)
    .Connectors(ViewBag.connectors)
    .GetNodeDefaults("getNodeDefaults")
    .GetConnectorDefaults("getConnectorDefaults")
    .Layout(ViewBag.layout)
    .Render())
```
`orientation` values: `TopToBottom`, `BottomToTop`, `LeftToRight`, `RightToLeft`

## Organizational Chart Layout

The org chart layout supports custom assistant/children assignment and orientation per subtree:

```csharp
ViewBag.layout = new DiagramLayout
{
    Type = LayoutType.OrganizationalChart,
    HorizontalSpacing = 40,
    VerticalSpacing = 40
};
```

```cshtml
@(Html.EJS().Diagram("diagram")
    .Width("100%")
    .Height("550px")
    .Nodes(ViewBag.nodes)
    .Connectors(ViewBag.connectors)
    .GetLayoutInfo("getLayoutInfo")
    .GetNodeDefaults("getNodeDefaults")
    .Layout(ViewBag.layout)
    .Render())

**Note*: For organizational charts, set `layout.type` to `OrganizationalChart`. This layout is built on top of the `HierarchicalTree` module, so you must still inject the `HierarchicalTree` module for it to work correctly.

### getLayoutInfo Callback

Use `getLayoutInfo` to customize per-subtree orientation and assistants:

```javascript
function getLayoutInfo(node, options) {
    // options.children — array of child node IDs at this level
    // options.assistants — array of nodes displayed as assistants
    // options.type — 'center', 'left', 'right', 'alternate', 'balanced'
    // options.hasSubTree — Boolean to check the subtree
    // options.type — Type of arrangement
    // options.orientation — 'Horizontal' | 'Vertical'
    // options.offset — horizontal offset for alternate orientation
}
```

Orientation options for `options.type`:
- Horizontal: `"center"`, `"left"`, `"right"`, `"balanced"`
- Vertical: `"left"`, `"right"`, `"alternate"`

## Radial Tree Layout

Positions nodes in concentric circles around a root:

```csharp
ViewBag.layout = new DiagramLayout
{
    Type = LayoutType.RadialTree,
    HorizontalSpacing = 40,
    VerticalSpacing = 40
};
```

```cshtml
@(Html.EJS().Diagram("diagram")
    .Width("100%")
    .Height("550px")
    .Nodes(ViewBag.nodes)
    .Connectors(ViewBag.connectors)
    .Layout(ViewBag.layout)
    .Render())
```

## Mind Map Layout

Arranges nodes around a central root, branching left and right:

```csharp
ViewBag.layout = new DiagramLayout
{
    Type = LayoutType.MindMap,
    HorizontalSpacing = 40,
    VerticalSpacing = 40
};
```

```cshtml
@(Html.EJS().Diagram("diagram")
    .Width("100%")
    .Height("550px")
    .Nodes(ViewBag.nodes)
    .Connectors(ViewBag.connectors)
    .Layout(ViewBag.layout)
    .Render())
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

```csharp
ViewBag.layout = new DiagramLayout
{
    Type = LayoutType.SymmetricalLayout,
    SpringLength = 80,
    SpringFactor = 0.8,
    MaxIteration = 500
};
```

```cshtml
@(Html.EJS().Diagram("diagram")
    .Width("100%")
    .Height("550px")
    .Nodes(ViewBag.nodes)
    .Connectors(ViewBag.connectors)
    .Layout(ViewBag.layout)
    .Render())

| Property | Description |
|----------|-------------|
| `springLength` | Ideal edge length (pixels) |
| `springFactor` | Repulsion/attraction factor (0–1) |
| `maxIteration` | Maximum layout iterations |
```
## Complex Hierarchical Layout

For trees where nodes can have multiple parents (DAG-style):

```csharp
ViewBag.layout = new DiagramLayout
{
    Type = LayoutType.ComplexHierarchicalTree,
    HorizontalSpacing = 40,
    VerticalSpacing = 40
};
```

```cshtml
@(Html.EJS().Diagram("diagram")
    .Width("100%")
    .Height("550px")
    .Nodes(ViewBag.nodes)
    .Connectors(ViewBag.connectors)
    .Layout(ViewBag.layout)
    .Render())
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
| `HorizontalSpacing` | Horizontal gap between nodes |
| `VerticalSpacing` | Vertical gap between nodes |
| `Orientation` | Tree flow direction (TopToBottom, etc.) |
| `Margin` | Margin for layout bounds |
| `FixedNode` | ID of node kept in place when layout runs |
| `Root` | ID of the root node |
| `Bounds` | Explicit bounding rect for layout |
| `HorizontalAlignment` | Align layout within bounds (Left/Center/Right) |
| `VerticalAlignment` | Align layout within bounds (Top/Center/Bottom) |

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
@(Html.EJS().Diagram("diagram")
    .ExpandStateChange("onExpandStateChange")
    .Render())
    
<script>
    function onExpandStateChange(args) {
        // args.element = the node
        // args.state = 'Expanded' | 'Collapsed'
        console.log(args.element.id, 'is now', args.state);
    }
</script>
```

## Data Binding with Layouts

Combine data source settings with a layout to auto-generate the diagram from data:

```csharp
// Controller
ViewBag.employees = EmployeeData.GetAll();  // List<EmployeeModel>

// Configure DataSource and Layout
ViewBag.dataSourceSettings = new DiagramDataSourceSettings
{
    Id = "Id",
    ParentId = "ReportingPerson",
    DataSource = new DataManager { Data = (List<EmployeeModel>)ViewBag.employees }
};

ViewBag.layout = new DiagramLayout
{
    Type = LayoutType.OrganizationalChart,
    HorizontalSpacing = 40,
    VerticalSpacing = 40
};
```

```cshtml
@(Html.EJS().Diagram("diagram")
    .Width("100%")
    .Height("550px")
    .GetNodeDefaults("getNodeDefaults")
    .GetConnectorDefaults("getConnectorDefaults")
    .SetNodeTemplate("setNodeTemplate")
    .DataSourceSettings(ViewBag.dataSourceSettings)
    .Layout(ViewBag.layout)
    .Render())

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
