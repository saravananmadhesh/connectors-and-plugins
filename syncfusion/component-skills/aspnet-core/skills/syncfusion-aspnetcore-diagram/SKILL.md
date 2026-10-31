---
name: syncfusion-aspnetcore-diagram
description: "Implement Syncfusion ASP.NET Core Diagram component (EJ2 Tag Helper `ejs-diagram`) for building interactive diagrams in Razor Pages or MVC applications. Use this skill when working with org charts, flowcharts, BPMN process diagrams, UML diagrams, or swimlane charts. This skill covers node and connector configuration, layout options, shape styling, data binding, drawing tools, export/print functionality, and other diagram features."
metadata:
  author: "Syncfusion Inc"
  category: "data-visualization"
  version: "34.1.29"
---

# ⚠️ STRICT USAGE RULES — MANDATORY FOR ALL CODE GENERATION

These rules are **non-negotiable** and must be followed for **every** code generation request.

## Rule A — Use Only Provided Reference Files

1. **Always read** `references/getting-started.md` for every request
2. Read **additional** reference files **only if they match the user's query** (see Navigation Guide below)
3. **No external knowledge** allowed:
   - ❌ Do NOT use internet documentation
   - ❌ Do NOT use training-data assumptions about Syncfusion APIs
   - ❌ Do NOT reference older EJ1 APIs or non-Tag Helper syntax
   - ✅ If a feature cannot be confirmed from reference files, apply Rule B

## Rule B — No Guessing, No Inference

If a feature, property, API, or behavior is **not explicitly documented** in the reference files:

**You must NOT:**
- Invent class properties, subclasses, or constructor overloads
- Infer JavaScript callback signatures or method names
- Assume module injections exist beyond those documented
- Generalize from other Syncfusion components
- Use deprecated or undocumented shape types

**Instead, respond with:**
```
⚠️ NOT DOCUMENTED: [feature name] is not covered in the reference files.
Skipping this feature to avoid generating incorrect code.
```

## Rule C — Enforce Required Module Injections

Before generating code for these features, **always include** the corresponding injection:

| Feature | Required Injection |
|---|---|
| BPMN diagrams | `ej.diagrams.Diagram.Inject(ej.diagrams.BpmnDiagrams)` |
| Export / Print | `ej.diagrams.Diagram.Inject(ej.diagrams.PrintAndExport)` |
| Mind Map layout | `ej.diagrams.Diagram.Inject(ej.diagrams.MindMap)` |
| Complex Hierarchical layout | `ej.diagrams.Diagram.Inject(ej.diagrams.ComplexHierarchicalTree)` |

Do **NOT** assume any other injections exist unless confirmed in reference files.

---

# Navigation Guide

Use this table to identify which reference file to read (Rule A).  
**Always read `references/getting-started.md` first**, then read only files relevant to the request.

| Reference File | Read When the Query Involves |
|---|---|
| 📄 [getting-started.md](references/getting-started.md) | **Every request** — NuGet setup, tag helper registration, CDN, first diagram |
| 📄 [nodes.md](references/nodes.md) | Creating/styling nodes, offsetX/Y, width/height, gradients, shadow, expand/collapse, `getNodeDefaults` |
| 📄 [connectors.md](references/connectors.md) | Lines (Straight/Orthogonal/Bezier), arrows, routing, `sourceID`/`targetID`, segments, `getConnectorDefaults` |
| 📄 [labels-and-annotations.md](references/labels-and-annotations.md) | Text labels, font, alignment, hyperlinks |
| 📄 [ports.md](references/ports.md) | Connection points, port positioning, constraints |
| 📄 [shapes-and-styles.md](references/shapes-and-styles.md) | Flow/Basic/Path/Image/HTML/Native shapes, fill, stroke, gradient, opacity |
| 📄 [bpmn-diagrams.md](references/bpmn-diagrams.md) | BPMN events, gateways, activities, data objects |
| 📄 [uml-diagrams.md](references/uml-diagrams.md) | UML class/sequence/activity diagrams, classifiers, relationships |
| 📄 [layouts.md](references/layouts.md) | Hierarchical, org chart, mind map, radial, symmetric layouts, `getLayoutInfo` |
| 📄 [swimlanes.md](references/swimlanes.md) | Swimlane structure, lanes, phases, palette integration |
| 📄 [groups-and-containers.md](references/groups-and-containers.md) | Grouping nodes, Canvas/Stack containers |
| 📄 [symbol-palette.md](references/symbol-palette.md) | `ejs-symbolpalette`, palettes, drag-and-drop, tooltips |
| 📄 [data-binding.md](references/data-binding.md) | DataManager, `dataSourceSettings`, id/parentId mapping, `setNodeTemplate`, CRUD |
| 📄 [interaction-and-tools.md](references/interaction-and-tools.md) | Selection, drag/resize/rotate, drawing tools, constraints, undo/redo |
| 📄 [serialization-and-export.md](references/serialization-and-export.md) | `saveDiagram`/`loadDiagram`, export, print |
| 📄 [diagram-settings.md](references/diagram-settings.md) | Layers, virtualization, grid, ruler, scroll, page settings, tooltip |

---

# Quick Start

## 1. Install NuGet Package

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core
```

## 2. Register Tag Helper (`~/Pages/_ViewImports.cshtml`)

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

## 3. Add CDN Resources (`~/Pages/Shared/_Layout.cshtml`)

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

## 4. Add Diagram to Razor Page (`~/Pages/Index.cshtml`)

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px"
    nodes="@ViewBag.nodes"
    connectors="@ViewBag.connectors"
    getNodeDefaults="@ViewBag.getNodeDefaults"
    getConnectorDefaults="@ViewBag.getConnectorDefaults">
</ejs-diagram>
```

## 5. PageModel / Controller

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

---

# Key C# Classes

| Class | Purpose |
|-------|---------|
| `DiagramNode` | Node/shape element |
| `DiagramConnector` | Connection line between nodes |
| `DiagramNodeAnnotation` | Text label on a node |
| `DiagramConnectorAnnotation` | Text label on a connector |
| `DiagramPort` | Connection point on a node |
| `DiagramLayer` | Layer for organizing elements |
| `DiagramPageSettings` | Page size, orientation, background |
| `BpmnShapes` | BPMN shape configuration |
| `UmlClassifierShapeModel` | UML class diagram shape |

---

# Common Shape Types

### Flow Shapes
`Terminator`, `Process`, `Decision`, `Document`, `DirectData`, `MultiDocument`, `PreDefinedProcess`, `Delay`, `Annotation`, `ManualOperation`, `ManualInput`, `Card`, `Or`, `SummingJunction`, `Extract`, `Merge`, `Sort`, `OffPageReference`

**Usage:**
```csharp
Shape = new { type = "Flow", shape = "Process" }
```

### Basic Shapes
`Rectangle`, `Ellipse`, `Triangle`, `Pentagon`, `Hexagon`, `Heptagon`, `Octagon`, `Star`, `Cross`, `Diamond`, `CylindricalShape`, `Trapezoid`, `Parallelogram`, `Rhombus`

**Usage:**
```csharp
Shape = new { type = "Basic", shape = "Rectangle" }
```

## When to Use This Skill

✅ Creating any diagram in ASP.NET Core (Razor Pages / MVC)  
✅ Building flowcharts, org charts, network diagrams  
✅ Implementing BPMN or UML diagrams  
✅ Configuring node/connector shapes, styles, annotations  
✅ Setting up automatic layouts  
✅ Adding symbol palette for drag-and-drop  
✅ Binding diagram data from database  
✅ Exporting diagrams or printing  
✅ Enabling drawing tools, undo/redo, layers