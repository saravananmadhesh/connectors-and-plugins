# Diagram Settings in Syncfusion ASP.NET MVC Diagram

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

```csharp
ViewBag.pageSettings = new DiagramPageSettings
{
    Width = 816,
    Height = 1056,
    Orientation = PageOrientation.Portrait,
    ShowPageBreaks = true,
    MultiplePage = true,
    BoundaryConstraints = BoundaryConstraints.Page,
    Margin = new DiagramMargin { Left = 10, Right = 10, Top = 10, Bottom = 10 }
};
```

```cshtml
@(Html.EJS().Diagram("diagram")
    .Width("100%")
    .Height("550px")
    .PageSettings(ViewBag.pageSettings)
    .Render())
```

| Property | Values | Description |
|----------|--------|-------------|
| `Width` | number | Page width in pixels |
| `Height` | number | Page height in pixels |
| `Orientation` | `Portrait`, `LandScape` | Page orientation |
| `ShowPageBreaks` | bool | Show page boundary lines |
| `MultiplePage` | bool | Content can span multiple pages |
| `BoundaryConstraints` | `Page`, `Diagram`, `Infinity` | Restrict dragging to page or allow freely |
| `Background` | DiagramBackground object (color, source, align, scale)| Background of Page |
| `Margin` | DiagramMargin object | Page margins (left, right, top, bottom) in pixels |

## Background

Set a background color or image for the diagram:

```csharp
ViewBag.pageSettings = new DiagramPageSettings
{
    Width = 816,
    Height = 1056,
    Background = new DiagramBackground
    {
        Color = "#F0F4FF"
    }
};
```

### Background Image

```csharp
ViewBag.pageSettings = new DiagramPageSettings
{
    Background = new DiagramBackground
    {
        Source = "/images/background.png",
        Align = ImageAlignment.XMidYMax,
        Scale = Scale.Meet
    }
};
```

| Property | Values | Description |
|----------|--------|-------------|
| `Source` | URL string | Background image URL |
| `Color`  | 'yellow' | Background Color |
| `Align` | `XMinYMin`, `XMidYMid`, `XMaxYMax`, etc. | Image alignment (SVG preserveAspectRatio syntax) |
| `Scale` | `None`, `Meet`, `Slice` | How image fits the page |

## Grid Lines

Display snap-to-grid guidelines:

```cshtml
@(Html.EJS().Diagram("diagram")
    .Width("100%")
    .Height("550px")
    .SnapSettings(s => s.Constraints(Syncfusion.EJ2.Diagrams.SnapConstraints.ShowLines | Syncfusion.EJ2.Diagrams.SnapConstraints.SnapToLines).HorizontalGridlines((DiagramGridlines)ViewData["gridLines"]).VerticalGridlines((DiagramGridlines)ViewData["gridLines"]))
    .Render())
```

```csharp
     double[] intervals = { 1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75 };
     DiagramGridlines grIdLines = new DiagramGridlines()
     { LineColor = "#e0e0e0", LineIntervals = intervals, LineDashArray = "2 2", };
     ViewData["gridLines"] = grIdLines;
```

`SnapConstraints` values (combinable with `|`):

| Value | Description |
|-------|-------------|
| `ShowLines` | Show grid lines |
| `ShowHorizontalLines` | Show Horizontal grid lines |
| `ShowVerticalLines` | Show Vertical grid lines |
| `SnapToHorizontalLines` | Snap elements to Horizontal grid lines |
| `SnapToVerticalLines` | Snap elements to Vertical grid lines |
| `SnapToLines` | Snap elements to grid lines |
| `SnapToObject` | Snap elements to other elements |
| `All` | Enable all snap features |
| `None` | Disable all snap |

## Ruler

Display rulers along the top and left edges:

```cshtml
@(Html.EJS().Diagram("diagram")
    .Width("100%")
    .Height("550px")
    .RulerSettings(ViewBag.rulerSettings)
    .Render())
```

```csharp
ViewBag.rulerSettings = new DiagramRulerSettings
{
    ShowRulers = true,
    HorizontalRuler = new DiagramDiagramRuler
    {
        Interval = 10,
        SegmentWidth = 100,
        Thickness = 25,
    },
    VerticalRuler = new DiagramDiagramRuler
    {
        Interval = 10,
        SegmentWidth = 100,
        Thickness = 25
    }
};
```


### Ruler Settings

| Property | Parent | Description |
|--------|--------|------------|
| `RulerSettings` | Diagram | Root object for ruler configuration |
| `ShowRulers` | `RulerSettings` | Enables or disables rulers |
| `HorizontalRuler` | `RulerSettings` | Horizontal ruler configuration |
| `VerticalRuler` | `RulerSettings` | Vertical ruler configuration |
| `DynamicGrid` | `RulerSettings` | Enables dynamic grid based on zoom |

### HorizontalRuler / VerticalRuler Properties

| Property | Parent | Description |
|--------|--------|------------|
| `Interval` | HorizontalRuler / VerticalRuler | Distance between minor ticks (in pixels) |
| `MarkerColor` | HorizontalRuler / VerticalRuler | Color of the marker line |
| `Orientation` | HorizontalRuler / VerticalRuler | Ruler orientation (`Horizontal` or `Vertical`) |
| `ArrangeTick` | HorizontalRuler / VerticalRuler | Tick label position (`Near` or `Far`) |
| `Thickness` | HorizontalRuler / VerticalRuler | Ruler thickness (in pixels) |
| `SegmentWidth` | HorizontalRuler / VerticalRuler | Width of one major segment (in pixels) |
| `TickAlignment` | HorizontalRuler / VerticalRuler | Tick alignment (`LeftOrTop`, `RightOrBottom`) |


## Scroll Settings

Configure scrolling limits and viewport:

```cshtml
@(Html.EJS().Diagram("diagram")
    .Width("100%")
    .Height("550px")
    .ScrollSettings(ViewBag.scrollSettings)
    .Render())
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

### ScrollSettings

| Property | Values | Description |
|--------|--------|------------|
| `ScrollLimit` | `Infinity`, `Diagram`, `Limited` | Defines how far the diagram can be scrolled |
| `CanAutoScroll` | boolean | Enables or disables auto-scrolling |
| `CurrentZoom` | number | Initial zoom level applied to the diagram |
| `ZoomFactor` | number | Zoom increment/decrement factor |
| `MinZoom` | number | Minimum zoom level (e.g. 0.25 = 25%) |
| `MaxZoom` | number | Maximum zoom level (e.g. 4 = 400%) |
| `HorizontalOffset` | number | Initial horizontal scroll offset |
| `VerticalOffset` | number | Initial vertical scroll offset |
| `AutoScrollFrequency` | number | Speed/frequency of auto-scroll movement |
| `ViewPortWidth` | number | Visible viewport width (pixels) |
| `ViewPortHeight` | number | Visible viewport height (pixels) |
| `Padding` | object | Padding applied around the diagram viewport |
| `AutoScrollBorder` | object | Border area that triggers auto-scrolling |
| `ScrollableArea` | `Rect` | Restricts scrolling to a specific rectangular region |

### scrollChange Event

```cshtml
@(Html.EJS().Diagram("diagram")
    .ScrollChange("onScrollChange")
    .Render())
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
        Objects = new[] { "node1", "connector1" }
    },
    new DiagramLayer
    {
        Id = "layer2",
        Visible = false,  // hidden layer
        Lock = true,      // locked — elements cannot be edited
        Objects = new[] { "node2" }
    }
};
```

```cshtml
@(Html.EJS().Diagram("diagram")
    .Layers(ViewBag.layers)
    .Render())
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
@(Html.EJS().Diagram("diagram")
    .Constraints(ViewBag.constraints)
    .Render())
```

> Virtualization requires `ej.diagrams.Diagram.Inject(ej.diagrams.Virtualization)` if using as a standalone module. When using the bundled EJ2 script, it is available automatically.

## Tooltip

### Diagram-level Tooltip

```cshtml
@(Html.EJS().Diagram("diagram")
    .Width("100%")
    .Height("550px")
    .Tooltip(ViewBag.tooltip)
    .Nodes(ViewBag.nodes)
    .Render())
```

```csharp
ViewBag.tooltip = new DiagramDiagramTooltip
{
    Content = "Diagram Area",
    Position = "BottomCenter",
    RelativeMode = TooltipRelativeMode.Mouse
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

### Tooltip Settings

| Property | Values | Description |
|--------|--------|------------|
| `Content` | HTML string | Tooltip content (supports HTML markup) |
| `ShowTipPointer` | boolean | Shows or hides the tooltip pointer/arrow |
| `Height` | number | Height of the tooltip (pixels) |
| `Width` | number | Width of the tooltip (pixels) |
| `IsSticky` | boolean | Keeps tooltip visible until explicitly closed |
| `Position` | `TopLeft`, `TopCenter`, `BottomCenter`, etc. | Placement of the tooltip relative to the target |
| `RelativeMode` | `Object`, `Mouse` | Anchors tooltip to object or mouse pointer |
| `Animation` | object | Animation settings for tooltip open and close |
| ↳ `Open` | object | Animation applied when tooltip opens |
| ↳ ↳ `Delay` | number | Delay before opening animation starts (ms) |
| ↳ ↳ `Duration` | number | Duration of opening animation (ms) |
| ↳ ↳ `Effect` | `FadeIn`, `FadeZoomIn`, etc. | Opening animation effect |
| ↳ `Close` | object | Animation applied when tooltip closes |
| ↳ ↳ `Delay` | number | Delay before closing animation starts (ms) |
| ↳ ↳ `Duration` | number | Duration of closing animation (ms) |
| ↳ ↳ `Effect` | `FadeOut`, `FadeIn`, etc. | Closing animation effect |


## Accessibility

Set `getDescription` JS callback:

```cshtml
@(Html.EJS().Diagram("diagram")
    .GetDescription("getDescription")
    .Render())
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
@(Html.EJS().Overview("overview")
    .Width("300px")
    .Height("150px")
    .SourceID("diagram")
    .Render())

@(Html.EJS().Diagram("diagram")
    .Width("100%")
    .Height("550px")
    .Nodes(ViewBag.nodes)
    .Render())
```

## Zoom and Fit Page

```javascript
var diagram = document.getElementById('diagram').ej2_instances[0];

// Fit all content in the viewport
diagram.fitToPage();

// Fit to specific region
diagram.fitToPage({ mode: 'Page' });   // 'Page' | 'Width' | 'Height'

// Zoom in/out programmatically
diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });   // +20%
diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });  // -20%

// Set exact zoom level
diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 1, focusPoint: { x: 50, y: 50 } });

// Resets the zoom and scroller offsets to their default values.
diagram.reset();
```
