# Annotations in Blazor Diagram

## Table of Contents
- [Overview](#overview)
- [Node Annotations](#node-annotations)
- [Connector Annotations](#connector-annotations)
- [Annotation Position and Alignment](#annotation-position-and-alignment)
- [Annotation Style](#annotation-style)
- [Multiple Annotations](#multiple-annotations)
- [Add / Remove / Update at Runtime](#add--remove--update-at-runtime)
- [Inline Editing](#inline-editing)
- [Common Gotchas](#common-gotchas)

---

## Overview

Annotations are text labels attached to nodes or connectors. They support positioning, alignment, font styling, and runtime editing. Each node/connector can have multiple annotations.

- **Node annotations:** Use `ShapeAnnotation`
- **Connector annotations:** Use `PathAnnotation`

---

## Node Annotations

```razor
@using Syncfusion.Blazor.Diagram

<SfDiagramComponent Height="600px" Nodes="@nodes" />

@code {
    DiagramObjectCollection<Node> nodes = new();

    protected override void OnInitialized()
    {
        nodes.Add(new Node
        {
            ID = "node1",
            OffsetX = 200, OffsetY = 200,
            Width = 120, Height = 60,
            Style = new ShapeStyle { Fill = "#6495ED", StrokeColor = "white" },
            Annotations = new DiagramObjectCollection<ShapeAnnotation>
            {
                new ShapeAnnotation { Content = "Process Step" }
            }
        });
    }
}
```

---

## Connector Annotations

```razor
connectors.Add(new Connector
{
    ID = "conn1",
    SourceID = "node1", TargetID = "node2",
    Type = ConnectorSegmentType.Orthogonal,
    Annotations = new DiagramObjectCollection<PathAnnotation>
    {
        new PathAnnotation
        {
            Content = "Yes",
            Offset = 0.5  // position along the path (0=source, 1=target, 0.5=middle)
        }
    }
});
```

---

## Annotation Position and Alignment

**Node annotation positioning via `Offset` (fraction of node width/height):**

| Offset | Position |
|--------|----------|
| `(0.5, 0.5)` | Center (default) |
| `(0.5, 0)` | Top center |
| `(0.5, 1)` | Bottom center |
| `(0, 0.5)` | Left center |
| `(1, 0.5)` | Right center |

```razor
new ShapeAnnotation
{
    Content = "Label",
    Offset = new DiagramPoint { X = 0.5, Y = 0 },  // top center
    HorizontalAlignment = HorizontalAlignment.Center,
    VerticalAlignment = VerticalAlignment.Bottom,
    Margin = new DiagramThickness { Top = 5 }
}
```

**Connector annotation positioning via `Offset` (0 to 1 along the path):**
```razor
new PathAnnotation
{
    Content = "Flow Label",
    Offset = 0.5,           // middle of connector
    Alignment = AnnotationAlignment.Center
}
```

---

## Annotation Style

```razor
new ShapeAnnotation
{
    Content = "Styled Label",
    Style = new TextStyle
    {
        FontSize = 14,
        Bold = true,
        Italic = false,
        Color = "#333333",
        TextDecoration = TextDecoration.Underline,
        TextAlign = TextAlign.Center
    }
}
```

---
## Interaction Constraints
`AnnotationConstraints` is a flags enum; combine values with `|`.
| Constraint | Description |
|---|---|
| `AnnotationConstraints.None` | No interactions allowed |
| `AnnotationConstraints.Select` | User can select the annotation |
| `AnnotationConstraints.Drag` | User can drag the annotation |
| `AnnotationConstraints.Resize` | User can resize the annotation |
| `AnnotationConstraints.Rotate` | User can rotate the annotation |
| `AnnotationConstraints.Interaction` | Enables all: Select + Drag + Resize + Rotate |
| `AnnotationConstraints.ReadOnly` | Prevents inline text editing |
| `AnnotationConstraints.InheritReadOnly` | Inherits the ReadOnly setting from the parent node/connector |
> **`Default` is NOT in this list** — there is no `AnnotationConstraints.Default`.
```razor
@* ❌ Wrong — AnnotationConstraints.Default does not exist *@
new ShapeAnnotation { Content = "Label", Constraints = AnnotationConstraints.Default }
@* ✅ Correct — use Interaction to enable all, or combine specific flags *@
new ShapeAnnotation { Content = "Draggable label", Constraints = AnnotationConstraints.Select | AnnotationConstraints.Drag }
@* ✅ Correct — use Interaction as the "full access" equivalent *@
new ShapeAnnotation { Content = "All interactions", Constraints = AnnotationConstraints.Interaction }
```
### DragLimit (PathAnnotation only)
Restricts how far (in pixels) a `PathAnnotation` can be dragged from its original position.  
**Drag must be enabled** — use `AnnotationConstraints.Interaction` or include `AnnotationConstraints.Select` and `AnnotationConstraints.Drag` in the flags.
> **⚠️ `DragLimit` type is `DiagramThickness` — NOT `Margin`.**  
> Using `new Margin { ... }` causes a compile error (`CS0029`). Always use `new DiagramThickness { ... }`:
> ```csharp
> // ❌ Wrong — Margin is the wrong type for DragLimit
> DragLimit = new Margin { Left = 30, Right = 30, Top = 10, Bottom = 10 }
>
> // ✅ Correct — DiagramThickness is the required type
> DragLimit = new DiagramThickness { Left = 30, Right = 30, Top = 10, Bottom = 10 }
> ```
```razor
new PathAnnotation()
{
    Content     = "Limited drag",
    // ✅ Interaction enables drag (required for DragLimit to take effect)
    Constraints = AnnotationConstraints.Interaction,
    // ✅ DiagramThickness — NOT Margin
    DragLimit   = new DiagramThickness { Left = 30, Right = 30, Top = 10, Bottom = 10 }
}
```
---
## Rotation
Control annotation rotation independently from the node.
### RotationAngle
Set a fixed rotation angle in degrees (0-360):
```razor
new ShapeAnnotation()
{
    Content       = "Rotated",
    RotationAngle = 45
}
```
### RotationReference
Determines the reference frame for rotation:
| `RotationReferenceDirection` | Description |
|---|---|
| `Page` | Rotation angle is relative to the canvas (absolute) |
| `Parent` | Rotation angle is relative to the parent node's rotation |
```razor
new ShapeAnnotation()
{
    Content            = "Always upright",
    RotationAngle      = 0,
    RotationReference  = RotationReferenceDirection.Page   // stays horizontal even when node rotates
}
```
---
## Multiple Annotations

A node can have many annotations at different positions:

```razor
Annotations = new DiagramObjectCollection<ShapeAnnotation>
{
    new ShapeAnnotation
    {
        Content = "Title",
        Offset = new DiagramPoint { X = 0.5, Y = 0 },
        VerticalAlignment = VerticalAlignment.Bottom
    },
    new ShapeAnnotation
    {
        Content = "Subtitle",
        Offset = new DiagramPoint { X = 0.5, Y = 1 },
        VerticalAlignment = VerticalAlignment.Top,
        Style = new TextStyle { FontSize = 10, Color = "#888" }
    }
}
```

---

## Add / Remove / Update at Runtime

**Add annotation at runtime:**
```csharp
_diagram.Nodes[0].Annotations.Add(new ShapeAnnotation
{
    Content = "New Label",
    Offset = new DiagramPoint { X = 0.5, Y = 0.5 }
});
```

**Remove annotation:**
```csharp
_diagram.Nodes[0].Annotations.RemoveAt(0);
```

**Update annotation text:**
```csharp
_diagram.BeginUpdate();
_diagram.Nodes[0].Annotations[0].Content = "Updated Text";
await _diagram.EndUpdateAsync();
```

---

## Inline Editing

Users can double-click an annotation to edit it inline (enabled by default).

**Disable editing for a specific annotation:**
```razor
new ShapeAnnotation
{
    Content = "Read Only",
    Constraints = AnnotationConstraints.ReadOnly
}
```

> **⚠️ `AllowEditing` does NOT exist** on `ShapeAnnotation` or `PathAnnotation`.  
> Inline editing is **on by default** — no property is needed to enable it.  
> To **disable** editing, set `Constraints = AnnotationConstraints.ReadOnly`.

**Handle annotation edit events:**
```razor
<SfDiagramComponent TextChanged="OnTextChanged" />
@code {
    private void OnTextChanged(TextChangeEventArgs args)
    {
        // args.OldValue — text before editing
        // args.NewValue — text after editing
        Console.WriteLine($"Changed from '{args.OldValue}' to '{args.NewValue}'");
    }
}
```

---
## Events
All annotation events are raised on `SfDiagramComponent`.
### SelectionChanging / SelectionChanged
Fires when the user selects or deselects an annotation (requires `AnnotationConstraints.Select`):
```razor
<SfDiagramComponent SelectionChanging="OnSelectionChanging" SelectionChanged="OnSelectionChanged" />
@code {
    void OnSelectionChanging(SelectionChangingEventArgs args)
    {
        // args.Cancel = true to prevent selection
    }
    void OnSelectionChanged(SelectionChangedEventArgs args) { }
}
```
### PositionChanging / PositionChanged
Fires when an annotation is dragged:
```razor
<SfDiagramComponent PositionChanging="OnPositionChanging" PositionChanged="OnPositionChanged" />
@code {
    void OnPositionChanging(PositionChangingEventArgs args)
    {
        // args.Cancel = true to prevent movement
        Console.WriteLine($"Moving to: {args.NewValue.OffsetX}, {args.NewValue.OffsetY}");
    }
    void OnPositionChanged(PositionChangedEventArgs args) { }
}
```
### SizeChanging / SizeChanged
Fires when an annotation is resized:
```razor
<SfDiagramComponent SizeChanging="OnSizeChanging" />
@code {
    void OnSizeChanging(SizeChangingEventArgs args)
    {
        // Enforce minimum width
        if (args.NewValue.Width < 50) args.Cancel = true;
    }
}
```
### RotationChanging / RotationChanged
Fires when an annotation is rotated:
```razor
<SfDiagramComponent RotationChanging="OnRotationChanging" />
@code {
    void OnRotationChanging(RotationChangingEventArgs args) { }
}
```

---
## Hyperlink
| Property | Type | Description |
|---|---|---|
| `Url` | `string` | Target URL |
| `Content` | `string` | Overrides annotation text as link label |
| `OpenMode` | `HyperlinkOpenMode` | `Self` (same tab) or `Blank` (new tab) |
| `Color` | `string` | Supports named colors, hex codes, and RGB values. |
| `TextDecoration` | `TextDecoration` | Defines the text decoration style for the hyperlink, such as None, underline, overline, or strikethrough. |

Use `Hyperlink` to make annotation text a clickable link.
```razor
new ShapeAnnotation()
{
    Content           = "Visit Documentation",
    Hyperlink = new HyperlinkSettings()
    {
        Url      = "https://blazor.syncfusion.com/documentation/diagram/",
        Content  = "Syncfusion Docs",
        Color = "Red",
        TextDecoration = TextDecoration.None,
        OpenMode = HyperlinkOpenMode.Blank   // Self | Blank
    }
}
```
> `Content` inside `HyperlinkSettings` overrides the annotation's own `Content` as the visible link text.
### Update Hyperlink at Runtime
```csharp
void UpdateLink()
{
    Node node = diagram.GetObject("node1") as Node;
    var ann = (node.Annotations as DiagramObjectCollection<ShapeAnnotation>)[0];
    ShapeAnnotation ann = (node.Annotations as DiagramObjectCollection<ShapeAnnotation>)[0];
    ann.Hyperlink = new HyperlinkSettings()
    {
        Url      = "https://www.example.com",
        OpenMode = HyperlinkOpenMode.Self
    };
}
```
---
## Common Gotchas
- **Node uses `ShapeAnnotation`, connector uses `PathAnnotation`** — using the wrong type causes no label to show
- **Annotation ID must be unique** and must not start with a number or contain underscores/spaces
- **Default position is center** (`Offset = (0.5, 0.5)` for nodes, `Offset = 0.5` for connectors)
- **`HorizontalAlignment` and `VerticalAlignment`** control which side of the offset point the text is anchored to
- **`PathAnnotation.Offset`** is a `double` (0-1), not a `DiagramPoint` like `ShapeAnnotation.Offset`
- **Inline editing is enabled by default** — use `AnnotationConstraints.ReadOnly` to prevent it
- **`AllowEditing` does NOT exist** on `ShapeAnnotation` or `PathAnnotation` — this property will cause a compile error. Editing is on by default; use `AnnotationConstraints.ReadOnly` to opt out
- **`DragLimit` type is `DiagramThickness`** — NOT `Margin`. Using `new Margin { ... }` causes `CS0029`. Use `new DiagramThickness { Left = 30, Right = 30, Top = 10, Bottom = 10 }`
- **`AnnotationConstraints.Default` does NOT exist** — use `AnnotationConstraints.Interaction` for full access, or combine flags like `AnnotationConstraints.Select | AnnotationConstraints.Drag`
