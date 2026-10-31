# Labels and Annotations in Syncfusion ASP.NET MVC Diagram

## Table of Contents
- [Adding Annotations to Nodes](#adding-annotations-to-nodes)
- [Adding Annotations to Connectors](#adding-annotations-to-connectors)
- [Annotation Styling](#annotation-styling)
- [Text Alignment and Wrapping](#text-alignment-and-wrapping)
- [Hyperlink Annotations](#hyperlink-annotations)
- [Annotation Interaction](#annotation-interaction)
- [Runtime Operations](#runtime-operations)
- [Annotation Events](#annotation-events)
- [Key Properties Reference](#key-properties-reference)

## Adding Annotations to Nodes

Annotations are text labels attached to nodes. Add them via the `Annotations` list on `DiagramNode`:

```csharp
// Controller / PageModel
var nodes = new List<DiagramNode>
{
    new DiagramNode
    {
        Id = "node1",
        OffsetX = 200, OffsetY = 150, Width = 120, Height = 60,
        Annotations = new List<DiagramNodeAnnotation>
        {
            new DiagramNodeAnnotation { Content = "Order Processing" }
        }
    }
};
ViewBag.nodes = nodes;
```

```cshtml
@(Html.EJS().Diagram("diagram")
    .Width("100%")
    .Height("550px")
    .Nodes(ViewBag.nodes)
    .Render())
```
### Multiple Annotations on One Node

```csharp
Annotations = new List<DiagramNodeAnnotation>
{
    new DiagramNodeAnnotation
    {
        Content = "Process",
        Offset = new DiagramPoint { X = 0.5, Y = 0.3 }
    },
    new DiagramNodeAnnotation
    {
        Content = "ID: 001",
        Offset = new DiagramPoint { X = 0.5, Y = 0.75 },
        Style = new DiagramTextStyle { FontSize = 11, Color = "gray" }
    }
}
```

### Annotation Positioning (Offset)

`Offset` uses normalized 0–1 coordinates relative to the node bounds:

| Offset | Position |
|--------|----------|
| `{ X=0.5, Y=0.5 }` | Center (default) |
| `{ X=0.5, Y=0 }` | Top center |
| `{ X=0.5, Y=1 }` | Bottom center |
| `{ X=0, Y=0.5 }` | Left center |
| `{ X=1, Y=0.5 }` | Right center |
| `{ X=0, Y=0 }` | Top-left corner |

```csharp
new DiagramNodeAnnotation
{
    Content = "Status",
    Offset = new DiagramPoint { X = 0.5, Y = 1 },
    VerticalAlignment = VerticalAlignment.Top,
    Margin = new DiagramMargin { Top = 5 }
}
```

## Adding Annotations to Connectors

Use `DiagramConnectorAnnotation`. `Offset` is 0 (source end) to 1 (target end):

```csharp
var connectors = new List<DiagramConnector>
{
    new DiagramConnector
    {
        Id = "conn1",
        SourceID = "node1", TargetID = "node2",
        Annotations = new List<DiagramConnectorAnnotation>
        {
            new DiagramConnectorAnnotation { Content = "Yes", Offset = 0.5 }
        }
    }
};
ViewBag.connectors = connectors;
```


| Offset | Position on connector |
|--------|-----------------------|
| `0` | At source end |
| `0.5` | Midpoint (default) |
| `1` | At target end |

## Annotation Styling

Apply styling via `Style` (`DiagramTextStyle`):

```csharp
new DiagramNodeAnnotation
{
    Content = "Critical",
    Style = new DiagramTextStyle
    {
        Bold = true,
        Italic = false,
        FontSize = 14,
        FontFamily = "Segoe UI",
        Color = "#CC0000",
        Fill = "#FFF3CD",      // background fill
        StrokeColor = "#CC0000",
        StrokeWidth = 1,
        Opacity = 1.0,
        TextDecoration = TextDecoration.Underline
    }
}
```

| Style Property | Type | Description |
|---------------|------|-------------|
| `Bold` | bool | Bold text |
| `Italic` | bool | Italic text |
| `FontSize` | double | Font size in pixels |
| `FontFamily` | string | Font family name |
| `Color` | string | Text color |
| `Fill` | string | Background fill |
| `StrokeColor` | string | Border color |
| `StrokeWidth` | double | Border width |
| `Opacity` | double | Transparency (0–1) |
| `TextDecoration` | TextDecoration | "Underline", "LineThrough", "Overline", "None" |

## Text Alignment and Wrapping

```csharp
new DiagramNodeAnnotation
{
    Content = "Left top label",
    HorizontalAlignment = HorizontalAlignment.Left,
    VerticalAlignment = VerticalAlignment.Top,
    Offset = new DiagramPoint { X = 0, Y = 0 }
}
```

`HorizontalAlignment`: `Left`, `Center`, `Right`, `Stretch`  
`VerticalAlignment`: `Top`, `Center`, `Bottom`, `Stretch`

### Text Wrapping and Overflow

```csharp
new DiagramNodeAnnotation
{
    Content = "Long text that wraps inside bounds",
    Width = 80,
    Height = 40,   
    Style = new DiagramTextStyle
    {
        TextWrapping = Syncfusion.EJ2.Diagrams.TextWrap.Wrap, // Wrap | WrapWithOverflow | NoWrap
        TextOverflow = Syncfusion.EJ2.Diagrams.TextOverflow.Ellipsis, // Ellipsis | Clip | Visible
        TextAlign = TextAlign.Left     // Left | Center | Right | Justify

    }
}
```

## Hyperlink Annotations

```csharp
new DiagramNodeAnnotation
{
    Content = "Open Docs",
    Hyperlink = new DiagramHyperlink
    {
        Link = "https://ej2.syncfusion.com/aspnetmvc/documentation/diagram/",
        Content = "Open Docs",
        TextDecoration = TextDecoration.Underline,
    }
}
```

Handle link open in JavaScript:

```cshtml
@(Html.EJS().Diagram("diagram")
    .Render())
```

## Annotation Interaction

### Read-Only vs Editable

```csharp
// Editable (default)
new DiagramNodeAnnotation
{
    Content = "Double-click to edit",
    Constraints = AnnotationConstraints.Default
}

// Read-only
new DiagramNodeAnnotation
{
    Content = "Read only label",
    Constraints = AnnotationConstraints.ReadOnly
}
```

### Draggable Annotations

```csharp
new DiagramNodeAnnotation
{
    Content = "Movable",
    Constraints = AnnotationConstraints.Default | AnnotationConstraints.Drag,
    DragLimit = new DiagramMargin { Left = 20, Right = 20, Top = 10, Bottom = 10 }
}
```

### Rotation Reference

```csharp
// Annotation stays upright even when node is rotated
new DiagramNodeAnnotation
{
    Content = "Fixed angle",
    RotationReference = RotationReference.Page
}
// Default: RotationReferenceType.Parent (rotates with node)
```

## Runtime Operations

```javascript
var diagram = document.getElementById('diagram').ej2_instances[0];

// Add annotation to existing node
var node = diagram.getObject('node1');
diagram.addLabels(node, [{ id: 'lbl2', content: 'New Label' }]);

// Remove annotation
diagram.removeLabels(node,node.annotations);

// Update content
diagram.nodes[0].annotations[0].content = 'Updated Text';
diagram.dataBind();
```

## Annotation Events

| Event | Trigger |
|-------|---------|
| `textEdit` | Annotation text editing starts/ends |
| `click` | Annotation clicked |
| `doubleClick` | Annotation double-clicked (enters edit mode) |

```cshtml
@(Html.EJS().Diagram("diagram")
    .TextEdit("onTextEdit")
    .Render())
<script>
    function onTextEdit(args) {
        // Reject empty labels
        if (args.newValue.trim() === '') {
            args.cancel = true;
        }
    }
</script>
```

## Key Properties Reference

### DiagramNodeAnnotation

| Property | C# Type | Description |
|----------|---------|-------------|
| `Id` | string | Unique annotation ID |
| `Content` | string | Display text |
| `Offset` | `DiagramPoint` | Position (0–1 relative to node) |
| `HorizontalAlignment` | `HorizontalAlignment` | Horizontal anchor |
| `VerticalAlignment` | `VerticalAlignment` | Vertical anchor |
| `Margin` | `DiagramThickness` | Outer spacing |
| `Width` | double | Annotation box width |
| `Height` | double | Annotation box height |
| `Style` | `DiagramTextStyle` | Font, color, fill |
| `Constraints` | `AnnotationConstraints` | Interaction flags |
| `Hyperlink` | `HyperlinkSettings` | Clickable link |
| `RotationReference` | `RotationReferenceType` | Rotation behavior |
| `DragLimit` | `DiagramMargin` | Drag bounds |

### DiagramConnectorAnnotation

| Property | C# Type | Description |
|----------|---------|-------------|
| `Id` | string | Unique annotation ID |
| `Content` | string | Display text |
| `Offset` | double | Position along connector (0–1) |
| `Style` | `DiagramTextStyle` | Font, color, fill |
| `Alignment` | `AnnotationAlignment` | Center/Before/After path alignment |
| `Displacement` | `DiagramPoint` | Pixel offset from path |
| `SegmentAngle` | bool | Rotate label with connector segment |
