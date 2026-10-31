# Getting Started with Syncfusion ASP.NET Core Diagram

This guide covers installing and configuring the Syncfusion EJ2 Diagram control in an ASP.NET Core application using Tag Helpers.

## Prerequisites

- Visual Studio 2019 or later (or VS Code)
- .NET 6 / .NET 7 / .NET 8 SDK
- An existing ASP.NET Core Razor Pages or MVC project

## 1. Install NuGet Package

Open **Tools → NuGet Package Manager → Manage NuGet Packages for Solution** in Visual Studio, search for `Syncfusion.EJ2.AspNet.Core`, and install it. Or use the Package Manager Console:

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core
```

> The package includes `Syncfusion.Licensing` (license validation) and requires `Newtonsoft.Json` for JSON serialization.

## 2. Register Tag Helper

Open `~/Pages/_ViewImports.cshtml` (Razor Pages) or `~/Views/_ViewImports.cshtml` (MVC) and add:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

## 3. Add Stylesheet and Script Resources

In `~/Pages/Shared/_Layout.cshtml`, add the CDN references inside `<head>` and the script manager at the end of `<body>`:

```cshtml
<head>
    ...
    <!-- Syncfusion ASP.NET Core controls styles (Fluent theme) -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
<body>
    ...
    <!-- Syncfusion Script Manager — must be at end of body -->
    <ejs-scripts></ejs-scripts>
</body>
```

> **Available themes:** `fluent.css`, `material.css`, `material3.css`, `bootstrap5.css`, `tailwind.css`, `highcontrast.css`. Replace `fluent` with any theme name.

## 4. Create Your First Diagram

### Razor Page (`~/Pages/Index.cshtml`)

```cshtml
@page
@model IndexModel

<ejs-diagram id="diagram"
    width="100%"
    height="550px"
    nodes="@ViewBag.nodes"
    connectors="@ViewBag.connectors">
</ejs-diagram>
```

### PageModel (`~/Pages/Index.cshtml.cs`)

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using Syncfusion.EJ2.Diagrams;
using System.Collections.Generic;

public class IndexModel : PageModel
{
    public void OnGet()
    {
        var nodes = new List<DiagramNode>
        {
            new DiagramNode
            {
                Id = "node1",
                OffsetX = 150,
                OffsetY = 100,
                Width = 100,
                Height = 60,
                Style = new NodeStyleNodes { Fill = "#6BA5D7", StrokeColor = "white" },
                Annotations = new List<DiagramNodeAnnotation>
                {
                    new DiagramNodeAnnotation { Content = "Start" }
                }
            },
            new DiagramNode
            {
                Id = "node2",
                OffsetX = 350,
                OffsetY = 100,
                Width = 100,
                Height = 60,
                Style = new NodeStyleNodes { Fill = "#6BA5D7", StrokeColor = "white" },
                Annotations = new List<DiagramNodeAnnotation>
                {
                    new DiagramNodeAnnotation { Content = "Process" }
                }
            }
        };

        var connectors = new List<DiagramConnector>
        {
            new DiagramConnector { Id = "conn1", SourceID = "node1", TargetID = "node2" }
        };

        ViewBag.nodes = nodes;
        ViewBag.connectors = connectors;
    }
}
```

## 5. Using getNodeDefaults and getConnectorDefaults

Use these JavaScript callbacks to apply common defaults to all nodes or connectors, avoiding repetition:

```cshtml
<ejs-diagram id="diagram"
    width="100%"
    height="550px"
    nodes="@ViewBag.nodes"
    connectors="@ViewBag.connectors"
    getNodeDefaults="getNodeDefaults"
    getConnectorDefaults="getConnectorDefaults">
</ejs-diagram>

<script>
    function getNodeDefaults(node) {
        node.height = 60;
        node.width = 120;
        node.style = { fill: '#6BA5D7', strokeColor: 'white' };
        return node;
    }
    function getConnectorDefaults(connector) {
        connector.type = 'Orthogonal';
        connector.style = { strokeColor: '#6BA5D7', strokeWidth: 2 };
        connector.targetDecorator = { shape: 'Arrow', style: { fill: '#6BA5D7', strokeColor: '#6BA5D7' } };
        return connector;
    }
</script>
```

> When `getNodeDefaults` is set, individual node properties override the defaults. Pass `ViewBag.getNodeDefaults = "getNodeDefaults"` or use the string directly.

## 6. MVC Controller Example

```csharp
// Controllers/DiagramController.cs
using Syncfusion.EJ2.Diagrams;

public class DiagramController : Controller
{
    public IActionResult Index()
    {
        var nodes = new List<DiagramNode>
        {
            new DiagramNode
            {
                Id = "node1", OffsetX = 150, OffsetY = 100, Width = 100, Height = 60,
                Annotations = new List<DiagramNodeAnnotation>
                {
                    new DiagramNodeAnnotation { Content = "node1" }
                }
            }
        };
        ViewBag.nodes = nodes;
        return View();
    }
}
```

```cshtml
@* Views/Diagram/Index.cshtml *@
<ejs-diagram id="diagram" width="100%" height="550px" nodes="@ViewBag.nodes">
</ejs-diagram>
```

## 7. Tag Helper Inline Nodes

You can also define nodes inline using Tag Helpers instead of ViewBag:

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px">
    <e-diagram-nodes>
        <e-diagram-node id="node1" offsetX="100" offsetY="100" width="100" height="60">
            <e-node-style fill="#6BA5D7" strokeColor="white"></e-node-style>
            <e-node-annotations>
                <e-node-annotation content="Hello"></e-node-annotation>
            </e-node-annotations>
        </e-diagram-node>
         <e-diagram-node id="node2" offsetX="100" offsetY="300" width="100" height="60">
            <e-node-style fill="#6BA5D7" strokeColor="white"></e-node-style>
            <e-node-annotations>
                <e-node-annotation content="User"></e-node-annotation>
            </e-node-annotations>
        </e-diagram-node>
    </e-diagram-nodes>
    <e-diagram-connectors>
        <e-diagram-connector id="conn1" sourceID="node1" targetID="node2">
        </e-diagram-connector>
    </e-diagram-connectors>
</ejs-diagram>
```

## 8. Diagram Events

Listen to diagram events using JavaScript:

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px"
    nodes="@ViewBag.nodes"
    created="diagramCreated"
    click="diagramClicked">
</ejs-diagram>

<script>
    function diagramCreated(args) {
        console.log('Diagram created');
    }
    function diagramClicked(args) {
        if (args.element) {
            console.log('Clicked element:', args.element.id);
        }
    }
</script>
```

## Key Diagram Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Unique ID for the diagram HTML element |
| `width` | string | Width of the diagram canvas (e.g., "100%", "800px") |
| `height` | string | Height of the diagram canvas (e.g., "550px") |
| `nodes` | `@ViewBag` / inline | List of `DiagramNode` objects |
| `connectors` | `@ViewBag` / inline | List of `DiagramConnector` objects |
| `getNodeDefaults` | JS function name | Default properties applied to all nodes |
| `getConnectorDefaults` | JS function name | Default properties applied to all connectors |
| `tool` | `DiagramTools` | Active tool (SingleSelect, ZoomPan, DrawOnce, etc.) |
| `constraints` | `DiagramConstraints` | Enable/disable features (Default, Bridging, etc.) |

## Accessing the Diagram Instance (JavaScript)

```javascript
var diagram = document.getElementById('diagram').ej2_instances[0];
// Now call diagram methods: diagram.add(), diagram.remove(), diagram.select(), etc.
```
