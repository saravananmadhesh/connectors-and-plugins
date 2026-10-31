---
name: syncfusion-aspnetmvc-diagram
description: Use this skill whenever the user asks to create, configure, customize, or troubleshoot interactive diagrams using the Syncfusion ASP.NET MVC Diagram component with EJ2 Tag Helpers. Trigger this skill for requests involving flowcharts, organizational charts, BPMN diagrams, UML diagrams, swimlane diagrams, or mind maps, including node and connector definitions, shapes, styles, layouts, data binding, drawing tools, serialization, export, or advanced customization in ASP.NET MVC applications.
metadata:
  author: "Syncfusion Inc"
  category: "data-visualization"
  version: "34.1.29"
---

# Syncfusion ASP.NET MVC Diagram Component

A comprehensive skill for implementing the Syncfusion EJ2 Diagram control in ASP.NET MVC applications using Tag Helpers. Covers everything from basic flowcharts to complex BPMN, UML, swimlane, and auto-layout diagrams.

## When to Use This Skill

- Creating any diagram in an ASP.NET MVC (Razor Pages / MVC) application
- Building flowcharts, org charts, network diagrams, process maps
- Implementing BPMN or UML diagrams
- Configuring node/connector shapes, styles, annotations, and ports
- Setting up automatic layouts (hierarchical, org chart, radial, mind map)
- Adding a symbol palette for drag-and-drop diagramming
- Binding diagram data from a database or remote source
- Exporting diagrams to image/SVG or printing
- Enabling drawing tools, undo/redo, layers, and virtualization

## Important: API Verification Required

**API Verification Required**: Always verify API class names, properties, and signatures by reading reference files (`references/*.md`) BEFORE generating code examples. Do not assume or infer class names.

## Navigation Guide

### Setup and First Diagram
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- NuGet installation, tag helper registration, CDN resources, basic diagram, first node/connector

### Nodes (Shapes, Position, Styling)
📄 **Read:** [references/nodes.md](references/nodes.md)
- Creating nodes, offsetX/Y, width/height, style, gradient, shadow, expand/collapse icons, events, getNodeDefaults

### Connectors (Lines, Arrows, Routing)
📄 **Read:** [references/connectors.md](references/connectors.md)
- Straight/Orthogonal/Bezier connectors, sourceID/targetID, decorators, segments, routing, events

### Labels and Annotations
📄 **Read:** [references/labels-and-annotations.md](references/labels-and-annotations.md)
- Adding text to nodes and connectors, font, alignment, hyperlinks, interaction, events

### Ports (Connection Points)
📄 **Read:** [references/ports.md](references/ports.md)
- Port types, positioning, appearance, connecting via ports, port constraints

### Shapes and Styles
📄 **Read:** [references/shapes-and-styles.md](references/shapes-and-styles.md)
- Flow/Basic/Path/Image/HTML/Native shapes, fill, stroke, gradient, opacity

### BPMN Diagrams
📄 **Read:** [references/bpmn-diagrams.md](references/bpmn-diagrams.md)
- Module injection, events/triggers, gateways, activities, data objects, BPMN connectors

### UML Diagrams
📄 **Read:** [references/uml-diagrams.md](references/uml-diagrams.md)
- Class diagrams, classifier shapes, relationships, UML activity diagrams, sequence diagrams

### Automatic Layouts
📄 **Read:** [references/layouts.md](references/layouts.md)
- Hierarchical tree, org chart, mind map, radial tree, symmetric layout, getLayoutInfo, expand/collapse

### Swimlane Diagrams
📄 **Read:** [references/swimlanes.md](references/swimlanes.md)
- Swimlane structure, lanes, phases, children, headers, runtime add, palette integration

### Groups and Containers
📄 **Read:** [references/groups-and-containers.md](references/groups-and-containers.md)
- Grouping nodes, add/remove children, Canvas and Stack container types

### Symbol Palette
📄 **Read:** [references/symbol-palette.md](references/symbol-palette.md)
- SymbolPalette component, defining palettes, drag-and-drop, tooltips, customization

### Data Binding
📄 **Read:** [references/data-binding.md](references/data-binding.md)
- DataManager integration, dataSourceSettings, id/parentId mapping, setNodeTemplate, CRUD

### Interaction and Drawing Tools
📄 **Read:** [references/interaction-and-tools.md](references/interaction-and-tools.md)
- Selection, drag/resize/rotate, drawing tools, constraints, undo/redo, commands, keyboard

### Serialization and Export
📄 **Read:** [references/serialization-and-export.md](references/serialization-and-export.md)
- saveDiagram/loadDiagram, exportDiagram (image/SVG), print, preventDefaults

### Diagram Settings
📄 **Read:** [references/diagram-settings.md](references/diagram-settings.md)
- Layers, virtualization, grid lines, ruler, scroll settings, page settings, tooltip, accessibility

## Quick Start

### 1. Install NuGet Package

```powershell
Install-Package Syncfusion.EJ2.AspNet.MVC
```

### 2. Register Tag Helper (`~/Pages/_ViewImports.cshtml`)

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

### 3. Add CDN Resources (`~/Pages/Shared/_Layout.cshtml`)

```cshtml
<head>
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
<body>
    ...
    <ejs-scripts></ejs-scripts>
</body>
```

### 4. Add Diagram to a Razor Page (`~/Pages/Index.cshtml`)

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px"
    nodes="@ViewBag.nodes"
    connectors="@ViewBag.connectors"
    getNodeDefaults="@ViewBag.getNodeDefaults"
    getConnectorDefaults="@ViewBag.getConnectorDefaults">
</ejs-diagram>
```

### 5. Controller / PageModel

```csharp
public IActionResult OnGet()
{
    List<DiagramNode> nodes = new List<DiagramNode>
    {
        new DiagramNode { Id = "node1", OffsetX = 100, OffsetY = 100, Width = 100, Height = 60,
            Annotations = new List<DiagramNodeAnnotation> {
                new DiagramNodeAnnotation { Content = "Start" }
            },
            Shape = new { type = "Flow", shape = "Terminator" }
        },
        new DiagramNode { Id = "node2", OffsetX = 300, OffsetY = 100, Width = 100, Height = 60,
            Annotations = new List<DiagramNodeAnnotation> {
                new DiagramNodeAnnotation { Content = "Process" }
            },
            Shape = new { type = "Flow", shape = "Process" }
        }
    };
    List<DiagramConnector> connectors = new List<DiagramConnector>
    {
        new DiagramConnector { Id = "conn1", SourceID = "node1", TargetID = "node2" }
    };
    ViewBag.nodes = nodes;
    ViewBag.connectors = connectors;
    ViewBag.getNodeDefaults = "getNodeDefaults";
    ViewBag.getConnectorDefaults = "getConnectorDefaults";
    return Page();
}
```

```javascript
function getNodeDefaults(node) {
    node.height = 60;
    node.width = 120;
    return node;
}
function getConnectorDefaults(connector) {
    connector.type = 'Orthogonal';
    return connector;
}
```

## Module Injections

Some features require explicit module injection via JavaScript:

```javascript
// For BPMN diagrams
ej.diagrams.Diagram.Inject(ej.diagrams.BpmnDiagrams);

// For export/print
ej.diagrams.Diagram.Inject(ej.diagrams.PrintAndExport);

// For mind map layout
ej.diagrams.Diagram.Inject(ej.diagrams.MindMap);

// For complex hierarchical layout
ej.diagrams.Diagram.Inject(ej.diagrams.ComplexHierarchicalTree);
```

## Key C# Classes

| Class | Purpose |
|-------|---------|
| `DiagramNode` | Diagram node/shape |
| `DiagramConnector` | Connection line between nodes |
| `DiagramNodeAnnotation` | Text label on a node |
| `DiagramConnectorAnnotation` | Text label on a connector |
| `DiagramPort` | Connection point on a node |
| `DiagramLayer` | Layer for organizing diagram elements |
| `DiagramPageSettings` | Page size, orientation, background |
| `BpmnShapes` | BPMN-specific shape config |
| `UmlClassifierShapeModel` | UML class diagram shape |

## Common Patterns

### Flow Diagram Shape Types
```csharp
// Flow shapes: Terminator, Process, Decision, Document, DirectData,
// MultiDocument, PreDefinedProcess, Delay, Annotation, Annotation2,
// ManualOperation, ManualInput, Card, PaperTap, Or, SummingJunction,
// Sort, Extract, Merge, Offline, Start1, Start2, End1, End2,
// Preparation, SequentialAccessStorage, PunchedCard, PunchedTape,
// StoredData, InternalStorage, DirectAccessStorage, Display,
// ManualOperation, Connector, OffPageReference, ExternalOrganization
Shape = new { type = "Flow", shape = "Process" }
```

### Basic Shapes
```csharp
// Basic shapes: Rectangle, Ellipse, Triangle, Pentagon, Hexagon,
// Heptagon, Octagon, Decagon, Dodecagon, Star, Cross, Diamond,
// CylindricalShape, Trapezoid, Parallelogram, Rhombus
Shape = new { type = "Basic", shape = "Rectangle" }
```
