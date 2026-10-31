# Diagram Settings in Syncfusion ASP.NET Core Diagram

## Table of Contents
- [Page Settings](#page-settings)
- [Background](#background)
- [Grid Lines](#grid-lines)
- [Ruler](#ruler)
- [Scroll Settings](#scroll-settings)
- [Layers](#layers)
- [Virtualization](#virtualization)
- [Tooltip](#tooltip)
- [Accessibility](#accessibility)
- [Overview Panel](#overview-panel)
- [Zoom and Fit Page](#zoom-and-fit-page)

## Page Settings

Configure page size, orientation, and boundaries:

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px">
    <e-diagram-pagesettings
        width="816"
        height="1056"
        orientation="Portrait"
        showPageBreaks="true"
        multiplePage="true"
        boundaryConstraints="Page">
    </e-diagram-pagesettings>
</ejs-diagram>
```

Or via ViewBag:

```csharp
ViewBag.pageSettings = new DiagramPageSettings
{
    Width = 816,
    Height = 1056,
    Orientation = PageOrientation.Portrait,
    ShowPageBreaks = true,
    MultiplePage = true,
    BoundaryConstraints = BoundaryConstraints.Page
};
```

```cshtml
<ejs-diagram id="diagram" pageSettings="@ViewBag.pageSettings">
</ejs-diagram>
```

| Property | Values | Description |
|----------|--------|-------------|
| `width` | number | Page width in pixels |
| `height` | number | Page height in pixels |
| `orientation` | `Portrait`, `LandScape` | Page orientation |
| `showPageBreaks` | bool | Show page boundary lines |
| `multiplePage` | bool | Content can span multiple pages |
| `boundaryConstraints` | `Page`, `Diagram`, `Infinity` | Restrict dragging to page or allow freely |

### Page Margin

```cshtml
<e-diagram-pagesettings width="816" height="1056">
    <e-pagesettings-margin left="10" right="10" top="10" bottom="10">
    </e-pagesettings-margin>
</e-diagram-pagesettings>
```

## Background

Set a background color or image for the diagram:

```cshtml
<e-diagram-pagesettings width="816" height="1056">
    <e-pagesettings-background color="#F0F4FF">
    </e-pagesettings-background>
</e-diagram-pagesettings>
```

### Background Image

```cshtml
<e-diagram-pagesettings>
    <e-pagesettings-background
        source="/images/background.png"
        align="XMidYMid"
        scale="Meet">
    </e-pagesettings-background>
</e-diagram-pagesettings>
```

| Property | Values | Description |
|----------|--------|-------------|
| `source` | URL string | Background image URL |
| `align` | `XMinYMin`, `XMidYMid`, `XMaxYMax`, etc. | Image alignment (SVG preserveAspectRatio syntax) |
| `scale` | `None`, `Meet`, `Slice` | How image fits the page |

## Grid Lines

Display snap-to-grid guidelines:

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px"
    snapSettings="@ViewBag.snapSettings">
</ejs-diagram>
```

```csharp
ViewBag.snapSettings = new DiagramSnapSettings
{
    Constraints = SnapConstraints.ShowLines | SnapConstraints.SnapToLines,
    HorizontalGridLines = new DiagramGridlines
    {
        LineColor = "#E0E0E0",
        LineDashArray = "2 2",
        LineIntervals = new List<double> { 1, 14, 0.5, 15, 0.5, 15 }
    },
    VerticalGridLines = new DiagramGridlines
    {
        LineColor = "#E0E0E0",
        LineDashArray = "2 2",
        LineIntervals = new List<double> { 1, 14, 0.5, 15, 0.5, 15 }
    }
};
```

`SnapConstraints` values (combinable with `|`):

| Value | Description |
|-------|-------------|
| `ShowLines` | Show grid lines |
| `ShowDots` | Show grid dots |
| `SnapToLines` | Snap elements to grid lines |
| `SnapToObject` | Snap elements to other elements |
| `All` | Enable all snap features |
| `None` | Disable all snap |

## Ruler

Display rulers along the top and left edges:

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px"
    rulerSettings="@ViewBag.rulerSettings">
</ejs-diagram>
```

```csharp
ViewBag.rulerSettings = new DiagramRulerSettings
{
    ShowRulers = true,
    HorizontalRuler = new DiagramRuler
    {
        Interval = 10,
        SegmentWidth = 100,
        Thickness = 25
    },
    VerticalRuler = new DiagramRuler
    {
        Interval = 10,
        SegmentWidth = 100,
        Thickness = 25
    }
};
```

| Property | Description |
|----------|-------------|
| `ShowRulers` | Toggle ruler visibility |
| `Interval` | Minor tick interval (pixels) |
| `SegmentWidth` | Width of one major segment (pixels) |
| `Thickness` | Ruler thickness (pixels) |

## Scroll Settings

Configure scrolling limits and viewport:

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px"
    scrollSettings="@ViewBag.scrollSettings">
</ejs-diagram>
```

```csharp
ViewBag.scrollSettings = new DiagramScrollSettings
{
    MinZoom = 0.25,
    MaxZoom = 4,
    ScrollLimit = ScrollLimit.Diagram,   // 'Infinity' | 'Diagram' | 'Limited'
    HorizontalOffset = 0,
    VerticalOffset = 0
};
```

| Property | Values | Description |
|----------|--------|-------------|
| `MinZoom` | number | Minimum zoom level (e.g. 0.25 = 25%) |
| `MaxZoom` | number | Maximum zoom level (e.g. 4 = 400%) |
| `ScrollLimit` | `Infinity`, `Diagram`, `Limited` | How far scrolling extends |
| `HorizontalOffset` | number | Initial horizontal scroll offset |
| `VerticalOffset` | number | Initial vertical scroll offset |

### scrollChange Event

```cshtml
<ejs-diagram id="diagram" scrollChange="onScrollChange">
</ejs-diagram>
<script>
    function onScrollChange(args) {
        // args.newValue = { HorizontalOffset, VerticalOffset, ZoomFactor }
        console.log('Zoom:', args.newValue.ZoomFactor);
    }
</script>
```

## Layers

Layers allow organizing elements into groups that can be hidden or locked:

### Configure Layers via ViewBag

```csharp
ViewBag.layers = new List<DiagramLayer>
{
    new DiagramLayer
    {
        Id = "layer1",
        Visible = true,
        Lock = false,
        Objects = new List<string> { "node1", "connector1" }
    },
    new DiagramLayer
    {
        Id = "layer2",
        Visible = false,  // hidden layer
        Lock = true,      // locked — elements cannot be edited
        Objects = new List<string> { "node2" }
    }
};
```

```cshtml
<ejs-diagram id="diagram" layers="@ViewBag.layers">
</ejs-diagram>
```

### Runtime Layer Operations

```javascript
var diagram = document.getElementById('diagram').ej2_instances[0];

// Add a new layer
diagram.addLayer({ id: 'layer3', visible: true, lock: false, objects: [] });

// Remove a layer (elements are removed too)
diagram.removeLayer('layer3');

// Move elements to a different layer
diagram.moveObjects(['node1', 'connector1'], 'layer2');

// Set active layer (new elements are added to the active layer)
diagram.setActiveLayer('layer1');

// Get the current active layer
var activeLayer = diagram.getActiveLayer();
console.log('Active layer:', activeLayer.id);

// Reorder layers
diagram.bringLayerForward('layer2');   // move layer2 closer to front
diagram.sendLayerBackward('layer1');   // move layer1 further back

// Clone a layer (copies it with all its elements)
diagram.cloneLayer('layer1');
```

## Virtualization

Improve performance for large diagrams by rendering only visible elements:

```csharp
ViewBag.constraints = DiagramConstraints.Default | DiagramConstraints.Virtualization;
```

```cshtml
<ejs-diagram id="diagram" constraints="@ViewBag.constraints">
</ejs-diagram>
```

> Virtualization requires `ej.diagrams.Diagram.Inject(ej.diagrams.Virtualization)` if using as a standalone module. When using the bundled EJ2 script, it is available automatically.

## Tooltip

### Diagram-level Tooltip

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px"
    tooltip="@ViewBag.tooltip"
    nodes="@ViewBag.nodes">
</ejs-diagram>
```

```csharp
ViewBag.tooltip = new DiagramDiagramTooltip
{
    Content = "Diagram Area",
    Position = "BottomCenter",
    RelativeMode = "Mouse"
};
```

### Node-level Tooltip

```csharp
var node = new DiagramNode
{
    Id = "node1",
    Tooltip = new DiagramDiagramTooltip
    {
        Content = "Process Step",
        Position = "BottomRight"
    },
    Constraints = NodeConstraints.Default | NodeConstraints.Tooltip
};
```

| Property | Values | Description |
|----------|--------|-------------|
| `Content` | HTML string | Tooltip content (supports HTML markup) |
| `Position` | `TopLeft`, `TopCenter`, `BottomRight`, etc. | Where to show the tooltip |
| `RelativeMode` | `Object` / `Mouse` | Anchor to object or cursor |

## Accessibility

Set `accessibilityContent` on nodes/connectors for screen readers:

```csharp
var node = new DiagramNode
{
    Id = "node1",
    AccessibilityContent = "Start process step"
};
```

Or via `getDescription` JS callback:

```cshtml
<ejs-diagram id="diagram" getDescription="getDescription">
</ejs-diagram>
<script>
    function getDescription(element, diagram) {
        if (element.id === 'node1') {
            return 'Start: Begin the workflow here';
        }
        return element.id;
    }
</script>
```

## Overview Panel

Show a minimap/overview of the full diagram:

```cshtml
<ejs-overview id="overview"
    width="300px"
    height="150px"
    sourceID="diagram">
</ejs-overview>

<ejs-diagram id="diagram" width="100%" height="550px"
    nodes="@ViewBag.nodes">
</ejs-diagram>
```

## Zoom and Fit Page

```javascript
var diagram = document.getElementById('diagram').ej2_instances[0];

// Fit all content in the viewport
diagram.fitPage();

// Fit to specific region
diagram.fitPage({ mode: 'Page' });   // 'Page' | 'Width' | 'Height'

// Zoom in/out programmatically
diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });   // +20%
diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });  // -20%

// Set exact zoom level
diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 1, focusPoint: { x: 0.5, y: 0.5 } });

// Reset zoom to 100%
diagram.reset();
```
