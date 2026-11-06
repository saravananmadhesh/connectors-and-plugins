# Getting Started with Syncfusion ASP.NET MVC Diagram

This guide covers installing and configuring the Syncfusion EJ2 Diagram control in an ASP.NET MVC application using Tag Helpers.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Install NuGet Package](#1-install-nuget-package)
- [Register Tag Helper](#2-register-tag-helper)
- [Add Stylesheet and Script Resources](#3-add-stylesheet-and-script-resources)
- [Create Your First Diagram](#4-create-your-first-diagram)

## Prerequisites

- Visual Studio 2019 or later (or VS Code)
- ASP.NET MVC 5 (.NET Framework) Web Application
- Syncfusion EJ2 ASP.NET MVC NuGet packages

## 1. Install NuGet Package

Open **Tools → NuGet Package Manager → Manage NuGet Packages for Solution** in Visual Studio, search for `Syncfusion.EJ2.AspNet.MVC5`, and install it. Or use the Package Manager Console:

```powershell
Install-Package Syncfusion.EJ2.AspNet.MVC5
```

> The package includes `Syncfusion.Licensing` (license validation) and requires `Newtonsoft.Json` for JSON serialization.

## 2. Add namespace

Add Syncfusion.EJ2 namespace reference in `Web.config` under `Views` folder.

```js
<namespaces>
    <add namespace="Syncfusion.EJ2"/>
</namespaces>

```

## 3. Add Stylesheet and Script Resources

Here, the theme and script is referred using CDN inside the `<head>` of `~/Pages/Shared/_Layout.cshtml` file as follows,

```cshtml
<head>
    ...
    <!-- Syncfusion ASP.NET MVC controls styles (Fluent theme) -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
    <!-- Syncfusion ASP.NET MVC controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

## 4. Register Syncfusion® script manager

Also, register the script manager `EJS().ScriptManager()` at the end of `<body>` in the `~/Pages/Shared/_Layout.cshtml` file as follows.

```cshtml
<body>
...
    <!-- Syncfusion® ASP.NET MVC Script Manager -->
    @Html.EJS().ScriptManager()
</body>
```

This ensures all EJ2 scripts load correctly.


## 5. Create Your First Diagram

### Controller: **DiagramController.cs**

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Syncfusion.EJ2.Diagrams;
using System.Drawing;

namespace EJ2MVCSampleBrowser.Controllers.Diagram
{
    public partial class DiagramController : Controller
    {
        // GET: Nodes
        public ActionResult Nodes()
        {
            List<DiagramNode> nodes = new List<DiagramNode>();
            List<DiagramNodeAnnotation> Node1 = new List<DiagramNodeAnnotation>();
            Node1.Add(new DiagramNodeAnnotation() { Content = "node1", Style = new DiagramTextStyle() { Color = "White", StrokeColor = "None" } });
            nodes.Add(new Node()
            {
                Id = "node1",
                Width = 100,
                Height = 100,
                Style = new NodeStyleNodes() { Fill = "darkcyan" },
                text = "node1",
                OffsetX = 100,
                OffsetY = 100,
                Annotations = Node1
            });
            ViewBag.nodes = nodes;


            return View();
        }
    }
    public class Node : DiagramNode
    {
        public string text;
    }
}
```

### View: **Views/Diagram/Index.cshtml**

```cshtml
@(Html.EJS().Diagram("container")
    .Width("100%")
    .Height("700px")
    .Nodes(ViewBag.nodes).Render())
```

## 6. Using getNodeDefaults and getConnectorDefaults

Use these JavaScript callbacks to apply common defaults to all nodes or connectors, avoiding repetition:

```cshtml
@(Html.EJS().Diagram("diagram")
    .Width("100%")
    .Height("550px")
    .Nodes(ViewBag.nodes)
    .Connectors(ViewBag.connectors)
    .GetNodeDefaults("getNodeDefaults")
    .GetConnectorDefaults("getConnectorDefaults")
    .Render())

<script>
    function getNodeDefaults(node) {
        node.width = 120;
        node.height = 60;
        node.style = { fill: '#6BA5D7', strokeColor: 'white' };
        return node;
    }

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

## 7. Flow Diagram

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Syncfusion.EJ2.Diagrams;

namespace EJ2MVCSampleBrowser.Controllers.Diagram
{
    public partial class DiagramController : Controller
    {
        public ActionResult Connector()
        {
            List<DiagramNode> Nodes = new List<DiagramNode>();
            List<DiagramNodeAnnotation> Node1 = new List<DiagramNodeAnnotation>();
            Node1.Add(new DiagramNodeAnnotation() { Content = "node1" });
            List<DiagramNodeAnnotation> Node2 = new List<DiagramNodeAnnotation>();
            Node2.Add(new DiagramNodeAnnotation() { Content = "node2" });
            List<DiagramNodeAnnotation> Node3 = new List<DiagramNodeAnnotation>();
            Node3.Add(new DiagramNodeAnnotation() { Content = "i < 10?" });
            List<DiagramNodeAnnotation> Node4 = new List<DiagramNodeAnnotation>();
            Node4.Add(new DiagramNodeAnnotation() { Content = "print(hello!!)", Style = new DiagramTextStyle() { Fill = "White" } });
            List<DiagramNodeAnnotation> Node5 = new List<DiagramNodeAnnotation>();
            Node5.Add(new DiagramNodeAnnotation() { Content = "i++;" });
            List<DiagramNodeAnnotation> Node6 = new List<DiagramNodeAnnotation>();
            Node6.Add(new DiagramNodeAnnotation() { Content = "End" });
            List<DiagramConnectorAnnotation> connector1 = new List<DiagramConnectorAnnotation>();
            connector1.Add(new DiagramConnectorAnnotation() { Content = "Yes" });
            List<DiagramConnectorAnnotation> connector2 = new List<DiagramConnectorAnnotation>();
            connector2.Add(new DiagramConnectorAnnotation() { Content = "No" });
            Nodes.Add(new DiagramNode()
            {
                Id = "node1",
                Annotations = Node1,
                Style = new NodeStyleNodes() { Fill = "darkcyan" },
                Shape = new { type = "Flow", shape = "Terminator" },
                OffsetY = 50,
            });
            Nodes.Add(new DiagramNode()
            {
                Id = "node2",
                Annotations = Node2,
                Style = new NodeStyleNodes() { Fill = "darkcyan" },
                OffsetY = 140,
                Shape = new { type = "Flow", shape = "Process" },
            });
            Nodes.Add(new DiagramNode()
            {
                Id = "node3",
                Annotations = Node3,
                Style = new NodeStyleNodes() { Fill = "darkcyan" },
                OffsetY = 230,
                Shape = new { type = "Flow", shape = "Decision" },
            });
            Nodes.Add(new DiagramNode()
            {
                Id = "node4",
                Annotations = Node4,
                Style = new NodeStyleNodes() { Fill = "darkcyan" },
                OffsetY = 320,
                Shape = new { type = "Flow", shape = "PreDefinedProcess" },
            });
            Nodes.Add(new DiagramNode()
            {
                Id = "node5",
                Annotations = Node5,
                Style = new NodeStyleNodes() { Fill = "darkcyan" },
                OffsetY = 410,
                Shape = new { type = "Flow", shape = "Process" },
            });
            Nodes.Add(new DiagramNode()
            {
                Id = "node6",
                Annotations = Node6,
                Style = new NodeStyleNodes() { Fill = "darkcyan" },
                
                OffsetY = 500,
                Shape = new { type = "Flow", shape = "Terminator" },
            });
            List<DiagramConnector> Connectors = new List<DiagramConnector>();
            Connectors.Add(new DiagramConnector() { Id = "connector1", SourceID = "node1", TargetID = "node2", });
            Connectors.Add(new DiagramConnector() { Id = "connector2", SourceID = "node2", TargetID = "node3", });
            Connectors.Add(new DiagramConnector() { Id = "connector3", SourceID = "node3", TargetID = "node4", Annotations = connector1, });
            Connectors.Add(new DiagramConnector() { Id = "connector4", SourceID = "node3", TargetID = "node6", Annotations = connector2, });
            Connectors.Add(new DiagramConnector() { Id = "connector5", SourceID = "node4", TargetID = "node5" });
            Connectors.Add(new DiagramConnector() { Id = "connector6", SourceID = "node5", TargetID = "node3" });
            ViewBag.nodes = Nodes;
            ViewBag.connectors = Connectors;
            return View();
        }
    }

}
```

```cshtml
@(Html.EJS().Diagram("container")
    .Width("100%")
    .Height("580px")
    .GetNodeDefaults("getNodeDefaults")
    .GetConnectorDefaults("getConnectorDefaults")
    .Nodes(ViewBag.nodes)
    .Connectors(ViewBag.connectors).Render())

<script>
    function getNodeDefaults(node) {
        node.width = 100;
        node.height = 60;
        node.style = { fill: '#6BA5D7', strokeColor: 'white' };
        return node;
    }

    function getConnectorDefaults(connector) {
        connector.type = 'Orthogonal';
        return connector;
    }
</script>
```


## Key Diagram Properties

| Property | Type | Description |
|----------|------|-------------|
| `Id` | string | Unique ID for the diagram HTML element |
| `Width` | string | Width of the diagram canvas (e.g., "100%", "800px") |
| `Height` | string | Height of the diagram canvas (e.g., "550px") |
| `Nodes` | `@ViewBag` / inline | List of `DiagramNode` objects |
| `Connectors` | `@ViewBag` / inline | List of `DiagramConnector` objects |
| `GetNodeDefaults` | JS function name | Default properties applied to all nodes |
| `GetConnectorDefaults` | JS function name | Default properties applied to all connectors |
| `Tool` | `DiagramTools` | Active tool (SingleSelect, ZoomPan, DrawOnce, etc.) |
| `Constraints` | `DiagramConstraints` | Enable/disable features (Default, Bridging, etc.) |

