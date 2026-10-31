# Shapes and Styles in Syncfusion ASP.NET Core Diagram

## Overview

The diagram component supports a rich set of built-in shapes (Flow, Basic, Path, Image, HTML, Native/SVG) plus comprehensive styling options for fill, stroke, gradient, opacity, and shadow. Shapes are set via the `Shape` property on `DiagramNode`.

## Flow Shapes

Flow shapes represent standard flowchart elements:

```csharp
new DiagramNode
{
    Id = "start",
    OffsetX = 150, OffsetY = 100, Width = 120, Height = 50,
    Shape = new { type = "Flow", shape = "Terminator" }
}
```

Common flow shape values:

| Shape | Typical Use |
|-------|------------|
| `Terminator` | Start / End ovals |
| `Process` | Default rectangle |
| `Decision` | Diamond for branching |
| `Document` | Document shape |
| `DirectData` | Cylinder / database |
| `PreDefinedProcess` | Pre-defined process |
| `Delay` | Delay shape |
| `ManualOperation` | Manual operation trapezoid |
| `Preparation` | Hexagon |
| `Or` | Circle with cross — OR gateway |
| `SummingJunction` | Circle with plus — AND junction |
| `Sort` | Sort shape |
| `Extract` | Extract triangle |
| `Merge` | Merge diamond |
| `Annotation` | Bracket annotation |
| `OffPageReference` | Pentagon page reference |
| `StoredData` | Stored data ribbon |
| `Display` | Display parallelogram |
| `InternalStorage` | Internal storage |
| `PunchedCard` | Punched card shape |
| `Start1` / `Start2` | Alternate start nodes |
| `End1` / `End2` | Alternate end nodes |

## Basic Shapes

Geometric shapes for general use:

```csharp
Shape = new { type = "Basic", shape = "Rectangle" }
Shape = new { type = "Basic", shape = "Ellipse" }
Shape = new { type = "Basic", shape = "Triangle" }
Shape = new { type = "Basic", shape = "Diamond" }
Shape = new { type = "Basic", shape = "Pentagon" }
Shape = new { type = "Basic", shape = "Hexagon" }
Shape = new { type = "Basic", shape = "Heptagon" }
Shape = new { type = "Basic", shape = "Octagon" }
Shape = new { type = "Basic", shape = "Star" }
Shape = new { type = "Basic", shape = "Cross" }
Shape = new { type = "Basic", shape = "Trapezoid" }
Shape = new { type = "Basic", shape = "Parallelogram" }
Shape = new { type = "Basic", shape = "Rhombus" }
Shape = new { type = "Basic", shape = "Cylinder" }
```

### Rounded Rectangle

```csharp
new DiagramNode
{
    Id = "rounded",
    OffsetX = 200, OffsetY = 150, Width = 120, Height = 60,
    Shape = new { type = "Basic", shape = "Rectangle", cornerRadius = 10 }
}
```

## Path Shapes

Define a node with a custom SVG path:

```csharp
new DiagramNode
{
    Id = "pathNode",
    OffsetX = 200, OffsetY = 200, Width = 100, Height = 100,
    Shape = new { type = "Path", data = "M35.2441,36 L36.9971,27.79 ..." }
}
```

## Text Nodes

A node that only displays text (no border by default):

```csharp
new DiagramNode
{
    Id = "textNode",
    OffsetX = 200, OffsetY = 100, Width = 100, Height = 50,
    Shape = new { type = "Text", content = "Hello World" }
}
```

## Image Nodes

Display an image as a node:

```csharp
new DiagramNode
{
    Id = "imageNode",
    OffsetX = 200, OffsetY = 200, Width = 100, Height = 100,
    Shape = new { type = "Image", source = "/images/photo.png", scale = "Meet" }
}
```

`scale` values: `"None"`, `"Meet"` (proportional fit), `"Slice"` (crop), `"Stretch"` (fill)  
`align` values: `"XMinYMin"`, `"XMidYMid"` (default), `"XMaxYMax"`, etc.

## HTML Nodes

Embed arbitrary HTML content inside a node:

```csharp
new DiagramNode
{
    Id = "htmlNode",
    OffsetX = 200, OffsetY = 200, Width = 200, Height = 100,
    Shape = new { type = "HTML", content = "<div style='padding:10px;background:#6BA5D7;color:white;'>HTML Node</div>" }
}
```

Or reference an HTML template by ID:

```cshtml
<e-diagram-node id="tmplNode" offsetX="200" offsetY="200" width="200" height="100"
    shape-type="HTML">
</e-diagram-node>

<script type="text/x-template" id="nodeTemplate">
    <div style="background:#6BA5D7;color:white;padding:8px;border-radius:4px;">
        ${model.addInfo.Name}
    </div>
</script>
```

> **Note:** HTML nodes cannot be exported to image/SVG format.

## Native (SVG) Nodes

Embed raw SVG elements:

```csharp
new DiagramNode
{
    Id = "svgNode",
    OffsetX = 200, OffsetY = 200, Width = 100, Height = 100,
    Shape = new
    {
        type = "Native",
        scale = "Stretch",
        content = "<g><circle cx='50' cy='50' r='45' fill='#6BA5D7'/></g>"
    }
}
```

## Node Style Properties

Apply visual styling via `Style` (`DiagramShapeStyle`):

```csharp
new DiagramNode
{
    Id = "styled",
    OffsetX = 200, OffsetY = 150, Width = 120, Height = 60,
    Style = new DiagramShapeStyle
    {
        Fill = "#6BA5D7",
        StrokeColor = "#3A6EA5",
        StrokeWidth = 2,
        StrokeDashArray = "5,3",
        Opacity = 0.9
    }
}
```

| Property | Type | Description |
|----------|------|-------------|
| `Fill` | string | Background fill color |
| `StrokeColor` | string | Border color |
| `StrokeWidth` | double | Border width |
| `StrokeDashArray` | string | Dash pattern e.g. `"5,3"` |
| `Opacity` | double | Node opacity 0–1 |
| `Gradient` | `DiagramGradient` | Linear or radial gradient |

## Gradient Fill

### Linear Gradient

```csharp
Style = new DiagramShapeStyle
{
    Gradient = new DiagramGradient
    {
        Type = "Linear",
        X1 = 0, Y1 = 0, X2 = 100, Y2 = 0,  // left-to-right
        GradientStops = new List<DiagramGradientStop>
        {
            new DiagramGradientStop { Color = "#6BA5D7", Offset = 0 },
            new DiagramGradientStop { Color = "#3A6EA5", Offset = 100 }
        }
    }
}
```

### Radial Gradient

```csharp
Gradient = new DiagramGradient
{
    Type = "Radial",
    Cx = 50, Cy = 50,   // center
    Fx = 50, Fy = 50,   // focal point
    R = 50,             // radius
    GradientStops = new List<DiagramGradientStop>
    {
        new DiagramGradientStop { Color = "#6BA5D7", Offset = 0 },
        new DiagramGradientStop { Color = "#003366", Offset = 100 }
    }
}
```

## Shadow

Enable shadow by adding it to node constraints, then configure it:

```csharp
new DiagramNode
{
    Id = "shadowNode",
    OffsetX = 200, OffsetY = 150, Width = 120, Height = 60,
    Constraints = NodeConstraints.Default | NodeConstraints.Shadow
}
```

```cshtml
<e-diagram-node id="node1" offsetX="200" offsetY="150" width="120" height="60"
    constraints="Default, Shadow">
    <e-node-shadow angle="50" opacity="0.8" distance="9"></e-node-shadow>
</e-diagram-node>
```

Shadow properties: `angle` (light direction degrees), `opacity` (0–1), `distance` (spread pixels).

## Connector Style Properties

```csharp
new DiagramConnector
{
    Style = new DiagramConnectorShapeStyle
    {
        StrokeColor = "#6BA5D7",
        StrokeWidth = 2,
        StrokeDashArray = "5,3",
        Opacity = 1.0
    }
}
```

## Applying Styles at Runtime

```javascript
var diagram = document.getElementById('diagram').ej2_instances[0];

// Update node fill
diagram.nodes[0].style.fill = '#FF6B6B';
diagram.dataBind();

// Update connector stroke
diagram.connectors[0].style.strokeColor = '#28A745';
diagram.connectors[0].style.strokeWidth = 3;
diagram.dataBind();
```
