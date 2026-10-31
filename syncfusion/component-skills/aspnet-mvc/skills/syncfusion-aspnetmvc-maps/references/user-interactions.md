# User Interactions in Syncfusion Maps

## Table of Contents
- [Overview](#overview)
- [Zooming](#zooming)
  - [Enable Zooming and Panning](#enable-zooming-and-panning)
  - [Zoom Types](#zoom-types)
  - [Zoom Limits and Animation](#zoom-limits-and-animation)
  - [Customize Zoom Toolbar](#customize-zoom-toolbar)
  - [Zoom to Specific Region](#zoom-to-specific-region)
  - [Marker Zooming](#marker-zooming)
- [Selection](#selection)
  - [Enable Shape Selection](#enable-shape-selection)
  - [Multi-Select](#multi-select)
  - [Selection for Bubbles](#selection-for-bubbles)
  - [Selection for Markers](#selection-for-markers)
  - [Selection for Polygons](#selection-for-polygons)
  - [Initial Selection](#initial-selection)
  - [Programmatic Selection](#programmatic-selection)
- [Highlight](#highlight)
  - [Enable Highlight](#enable-highlight)
  - [Highlight for Bubbles](#highlight-for-bubbles)
  - [Highlight for Markers](#highlight-for-markers)
  - [Highlight for Polygons](#highlight-for-polygons)
- [Tooltips](#tooltips)
  - [Basic Tooltip](#basic-tooltip)
  - [Tooltip Display Modes](#tooltip-display-modes)
  - [Customized Tooltip](#customized-tooltip)
  - [Tooltip Format](#tooltip-format)
  - [Tooltip Template](#tooltip-template)
  - [Tooltip Duration (Mobile)](#tooltip-duration-mobile)
  - [Tooltips for Bubbles](#tooltips-for-bubbles)
  - [Tooltips for Markers](#tooltips-for-markers)
- [Best Practices](#best-practices)
  - [Zooming Best Practices](#zooming-best-practices)
  - [Selection Best Practices](#selection-best-practices)
  - [Highlight Best Practices](#highlight-best-practices)
  - [Tooltip Best Practices](#tooltip-best-practices)
- [Common Issues](#common-issues)
  - [Issue 1: Zooming Not Working](#issue-1-zooming-not-working)
  - [Issue 2: Selection Not Visible](#issue-2-selection-not-visible)
  - [Issue 3: Tooltip Not Showing](#issue-3-tooltip-not-showing)
  - [Issue 4: Highlight Not Working](#issue-4-highlight-not-working)
  - [Issue 5: Panning Not Working](#issue-5-panning-not-working)
  - [Issue 6: Initial Selection Not Working](#issue-6-initial-selection-not-working)
- [Summary](#summary)

## Overview

User interactions make maps explorable and informative:

- **Zooming** - Zoom in/out to explore map details
- **Panning** - Navigate across the map by dragging
- **Selection** - Click shapes, markers, or bubbles to select them
- **Highlight** - Hover over elements to highlight them
- **Tooltips** - Display information on hover or touch

## Zooming

### Enable Zooming and Panning

**Basic Configuration:**

```cshtml
@using Syncfusion.EJ2.Maps

@Html.EJS().Maps("container").ZoomSettings(zoom => zoom
        .Enable(true)                    // Enable zooming
        .EnablePanning(true)).Layers(layer =>
    {
        layer.ShapeData(ViewBag.MapData).Add();
    }).Render()
```

### Zoom Types

**1. Zoom Toolbar** (Recommended)

Default zoom UI with buttons for zoom in/out, reset, and pan:

```cshtml
.ZoomSettings(zoom => zoom
    .Enable(true)
    .EnablePanning(true)
    .ZoomFactor(1)               // Initial zoom level (1 = no zoom)
    .MinZoom(1)                  // Minimum zoom level
    .MaxZoom(10))                // Maximum zoom level
```

**Toolbar Buttons:**
- **Zoom** - Rectangle zoom mode
- **Zoom In** - Zoom in one level
- **Zoom Out** - Zoom out one level
- **Pan** - Pan mode (drag to move)
- **Reset** - Return to initial view

**2. Mouse Wheel Zooming**

```cshtml
.ZoomSettings(zoom => zoom
    .Enable(true)
    .MouseWheelZoom(true))       // Enable mouse wheel zoom
```

**3. Pinch Zooming** (Touch devices)

```cshtml
.ZoomSettings(zoom => zoom
    .Enable(true)
    .PinchZooming(true))         // Enable pinch gestures
```

**4. Double-Click Zooming**

```cshtml
.ZoomSettings(zoom => zoom
    .Enable(true)
    .DoubleClickZoom(true))      // Zoom in on double-click
```

**5. Single-Click Zooming**

```cshtml
.ZoomSettings(zoom => zoom
    .Enable(true)
    .ZoomOnClick(true))          // Zoom in on single click
```

**6. Selection (Rectangle) Zooming**

```cshtml
.ZoomSettings(zoom => zoom
    .Enable(true)
    .EnablePanning(false)        // Must disable panning
    .EnableSelectionZooming(true))  // Drag to select zoom area
```

### Zoom Limits and Animation

**Complete Zoom Configuration:**

```cshtml
@Html.EJS().Maps("container").ZoomSettings(zoom => zoom
        .Enable(true)
        .EnablePanning(true)
        .ZoomFactor(1)              // Starting zoom (1-10)
        .MinZoom(1)                 // Cannot zoom out beyond this
        .MaxZoom(15)                // Cannot zoom in beyond this
        .MouseWheelZoom(true)
        .PinchZooming(true)
        .DoubleClickZoom(true)).Layers(layer =>
    {
        layer.ShapeData(ViewBag.MapData)
            .AnimationDuration(1000)  // Smooth zoom animation (1s)
            .Add();
    }).Render()
```

### Customize Zoom Toolbar

**Appearance Customization:**

```cshtml
.ZoomSettings(zoom => zoom
    .Enable(true)
    .ToolbarSettings(toolbar => toolbar
        .BackgroundColor("#F5F5F5")
        .BorderColor("#CCCCCC")
        .BorderWidth(1)
        .BorderOpacity(1.0)
        .HorizontalAlignment(Syncfusion.EJ2.Maps.Alignment.Near)
        .VerticalAlignment(Syncfusion.EJ2.Maps.Alignment.Top)
        .Orientation(Syncfusion.EJ2.Maps.Orientation.Horizontal)))
```

**Button Customization:**

```cshtml
.ZoomSettings(zoom => zoom
    .Enable(true)
    .ToolbarSettings(toolbar => toolbar
        .ButtonSettings(button => button
            .Fill("#FFFFFF")              // Button background
            .Color("#000000")             // Icon color
            .BorderColor("#CCCCCC")
            .BorderWidth(1)
            .Radius(20)                   // Button size
            .SelectionColor("#FF6347")    // Active button icon color
            .HighlightColor("#FFD700")    // Hover icon color
            .Padding(10)                  // Space between buttons
            .Opacity(1.0)
            .ToolbarItems(new[] {         // Custom button set
                Syncfusion.EJ2.Maps.ToolbarItem.ZoomIn,
                Syncfusion.EJ2.Maps.ToolbarItem.ZoomOut,
                Syncfusion.EJ2.Maps.ToolbarItem.Reset
            }))))
```

**Toolbar Tooltip Customization:**

```cshtml
.ZoomSettings(zoom => zoom
    .Enable(true)
    .ToolbarSettings(toolbar => toolbar
        .TooltipSettings(tooltip => tooltip
            .Visible(true)
            .Fill("#333333")
            .BorderColor("#000000")
            .BorderWidth(1)
            .FontColor("#FFFFFF")
            .FontSize("12px")
            .FontWeight("normal"))))
```

### Zoom to Specific Region

Use `CenterPosition` to focus on a specific area:

```cshtml
@Html.EJS().Maps("container").ZoomSettings(zoom => zoom
        .Enable(true)
        .ZoomFactor(4)              // Start zoomed in
    ).CenterPosition(center => center
        .Latitude(37.0902)           // California
        .Longitude(-95.7129)
    ).Layers(layer =>
    {
        layer.ShapeData(ViewBag.UsaMap).Add();
    }).Render()
```

### Marker Zooming

Auto-zoom to fit all markers:

```cshtml
.ZoomSettings(zoom => zoom
    .Enable(true)
    .ShouldZoomInitially(true))      // Zoom to fit markers on load
```

## Selection

### Enable Shape Selection

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
{
    layer
        .SelectionSettings(selection => selection
            .Enable(true)
            .Fill("#00FF00")             // Selection color
            .Opacity(1.0)
            .Border(b => b
                .Color("#000000")
                .Width(2)))
        .ShapeData(ViewBag.MapData)
        .Add();
}).Render()
```

### Multi-Select

```cshtml
.SelectionSettings(selection => selection
    .Enable(true)
    .EnableMultiSelect(true)         // Allow multiple selections
    .Fill("#00FF00"))
```

### Selection for Bubbles

```cshtml
.BubbleSettings(bubble =>
{
    bubble.Visible(true)
        .DataSource(ViewBag.PopulationData)
        .ValuePath("population")
        .SelectionSettings(selection => selection
            .Enable(true)
            .Fill("#FFD700")
            .Opacity(0.8))
        .Add();
})
```

### Selection for Markers

```cshtml
.MarkerSettings(marker =>
{
    marker.Visible(true)
        .DataSource(ViewBag.MarkerData)
        .SelectionSettings(selection => selection
            .Enable(true)
            .Fill("#FF0000")
            .Border(b => b
                .Color("#8B0000")
                .Width(3)))
        .Add();
})
```

### Selection for Polygons

```cshtml
.PolygonSettings(polygon => polygon
    .SelectionSettings(selection => selection
        .Enable(true)
        .EnableMultiSelect(true)
        .Fill("#4169E1")
        .Opacity(0.6))
    .Polygons(poly =>
    {
        poly.Points(ViewBag.PolygonPoints)
            .Fill("#FF6347")
            .Add();
    }))
```

### Initial Selection

**Pre-select Shapes:**

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
    {
        layer
            .SelectionSettings(selection => selection.Enable(true))
            .InitialShapeSelection(init =>
            {
                init.ShapePath("name")
                    .ShapeValue("United States")
                    .Add();
                init.ShapePath("name")
                    .ShapeValue("India")
                    .Add();
            })
            .ShapeData(ViewBag.MapData)
            .Add();
    })
    .Render()
```

**Pre-select Markers:**

```cshtml
.MarkerSettings(marker =>
{
    marker.Visible(true)
        .DataSource(ViewBag.MarkerData)
        .SelectionSettings(selection => selection.Enable(true))
        .InitialMarkerSelection(init =>
        {
            init.Latitude(40.7128)
                .Longitude(-74.0060)
                .Add();
        })
        .Add();
})
```

### Programmatic Selection

**JavaScript Method:**

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
{
    layer
        .SelectionSettings(selection => selection.Enable(true))
        .ShapeData(ViewBag.MapData)
        .Add();
}).Render()

<button onclick="selectShape()">Select USA</button>

<script>
    function selectShape() {
        var maps = document.getElementById("container").ej2_instances[0];
        // shapeSelection(layerIndex, propertyName, name, enable)
        maps.shapeSelection(0, "name", "United States", true);
    }
</script>
```

## Highlight

### Enable Highlight

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
{
    layer
        .HighlightSettings(highlight => highlight
            .Enable(true)
            .Fill("#FFFF00")             // Highlight color (yellow)
            .Opacity(0.7)
            .Border(b => b
                .Color("#FF6347")
                .Width(2)))
        .ShapeData(ViewBag.MapData)
        .Add();
}).Render()
```

### Highlight for Bubbles

```cshtml
.BubbleSettings(bubble =>
{
    bubble.Visible(true)
        .DataSource(ViewBag.PopulationData)
        .ValuePath("population")
        .HighlightSettings(highlight => highlight
            .Enable(true)
            .Fill("#FFA500")
            .Opacity(0.9))
        .Add();
})
```

### Highlight for Markers

```cshtml
.MarkerSettings(marker =>
{
    marker.Visible(true)
        .DataSource(ViewBag.MarkerData)
        .HighlightSettings(highlight => highlight
            .Enable(true)
            .Fill("#FF1493")
            .Border(b => b
                .Color("#8B008B")
                .Width(3)))
        .Add();
})
```

### Highlight for Polygons

```cshtml
.PolygonSettings(polygon => polygon
    .HighlightSettings(highlight => highlight
        .Enable(true)
        .Fill("#7FFF00")
        .Opacity(0.7)
        .Border(b => b
            .Color("#228B22")
            .Width(2)))
    .Polygons(poly =>
    {
        poly.Points(ViewBag.PolygonPoints)
            .Fill("#FF6347")
            .Add();
    }))
```

## Tooltips

### Basic Tooltip

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
{
    layer
        .TooltipSettings(tooltip => tooltip
            .Visible(true)
            .ValuePath("Country"))       // Show country name
        .DataSource(ViewBag.PopulationData)
        .ShapePropertyPath(new[] { "name" })
        .ShapeDataPath("Country")
        
        .ShapeData(ViewBag.MapData)
        .Add();
}).Render()
```

### Tooltip Display Modes

| Mode | Description |
|------|-------------|
| `MouseMove` | Show on hover (default) |
| `Click` | Show on click |
| `DoubleClick` | Show on double-click |

```cshtml
@Html.EJS().Maps("container").TooltipDisplayMode(Syncfusion.EJ2.Maps.TooltipGesture.Click).Layers(layer =>
    {
        layer
            .TooltipSettings(tooltip => tooltip
                .Visible(true)
                .ValuePath("name"))
            .ShapeData(ViewBag.MapData)
            .Add();
    }).Render()
```

### Customized Tooltip

```cshtml
.TooltipSettings(tooltip => tooltip
    .Visible(true)
    .ValuePath("Country")
    .Fill("#333333")                    // Background color
    .Border(b => b
        .Color("#FFFFFF")
        .Width(2))
    .TextStyle(style => style
        .Color("#FFFFFF")
        .Size("14px")
        .FontWeight("bold")))
```

### Tooltip Format

```cshtml
.TooltipSettings(tooltip => tooltip
    .Visible(true)
    .Format("Country: ${Country}<br/>Population: ${Population}M"))
```

### Tooltip Template

```cshtml
.TooltipSettings(tooltip => tooltip
    .Visible(true)
    .Template("<div class='custom-tooltip'>" +
             "<div class='tooltip-header'>${Country}</div>" +
             "<div class='tooltip-body'>" +
             "<div>Population: ${Population}M</div>" +
             "<div>Density: ${Density}/km²</div>" +
             "<div>GDP: $${GDP}B</div>" +
             "</div>" +
             "</div>"))

<style>
    .custom-tooltip {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 12px;
        border-radius: 8px;
        min-width: 200px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }
    .tooltip-header {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 8px;
        border-bottom: 1px solid rgba(255,255,255,0.3);
        padding-bottom: 6px;
    }
    .tooltip-body div {
        margin: 4px 0;
        font-size: 13px;
    }
</style>
```

### Tooltip Duration (Mobile)

```cshtml
.TooltipSettings(tooltip => tooltip
    .Visible(true)
    .ValuePath("name")
    .Duration(3000))                 // Show for 3 seconds (mobile only)
                                     // 0 = infinite, >0 = milliseconds
```

### Tooltips for Bubbles

```cshtml
.BubbleSettings(bubble =>
{
    bubble.Visible(true)
        .DataSource(ViewBag.PopulationData)
        .ValuePath("population")
        .TooltipSettings(tooltip => tooltip
            .Visible(true)
            .ValuePath("name")
            .Template("<div style='padding:10px; background:#fff; border:1px solid #ccc;'>" +
                     "<b>${name}</b><br/>" +
                     "Population: ${population}M" +
                     "</div>"))
        .Add();
})
```

### Tooltips for Markers

```cshtml
.MarkerSettings(marker =>
{
    marker.Visible(true)
        .DataSource(ViewBag.MarkerData)
        .TooltipSettings(tooltip => tooltip
            .Visible(true)
            .ValuePath("name"))
        .Add();
})
```

## Best Practices

### Zooming Best Practices

1. **Enable Multiple Zoom Types** - Provide toolbar, mouse wheel, and pinch for accessibility
2. **Set Reasonable Limits** - MinZoom=1, MaxZoom=8-15 depending on map detail
3. **Enable Panning** - Always enable panning with zoom for map navigation
4. **Add Animation** - Use AnimationDuration (500-1000ms) for smooth transitions
5. **Auto-Zoom to Markers** - Use ShouldZoomInitially(true) for marker-focused maps
6. **Customize Toolbar** - Position toolbar where it doesn't obscure important areas
7. **Mobile Optimization** - Enable pinch zooming for touch devices

**Example: Complete Zoom Setup**

```cshtml
.ZoomSettings(zoom => zoom
    .Enable(true)
    .EnablePanning(true)
    .ZoomFactor(1)
    .MinZoom(1)
    .MaxZoom(10)
    .MouseWheelZoom(true)
    .PinchZooming(true)
    .DoubleClickZoom(true))
```

### Selection Best Practices

1. **Visual Feedback** - Use contrasting colors for selected states
2. **Multi-Select When Needed** - Enable for comparison scenarios
3. **Combine with Tooltips** - Show details on selection
4. **Event Handling** - Use selection events for drill-down or filtering
5. **Initial Selection** - Pre-select relevant items for guided exploration
6. **Clear Selection State** - Provide UI to deselect (reset button)

### Highlight Best Practices

1. **Subtle Effect** - Use lighter opacity (0.5-0.8) for hover highlights
2. **Contrasting Color** - Choose highlight color that stands out but isn't jarring
3. **Combine with Tooltips** - Show tooltip on highlight for immediate feedback
4. **Performance** - Highlight is more performant than heavy tooltip rendering
5. **Distinguish from Selection** - Use different colors for highlight vs selection

### Tooltip Best Practices

1. **Keep Concise** - Show 3-5 key data points maximum
2. **Format Numbers** - Use thousand separators, currency symbols, units
3. **Responsive Design** - Ensure tooltips work on touch devices (set duration)
4. **Accessible Colors** - Maintain WCAG contrast ratios
5. **Template for Complex Data** - Use templates for rich formatting
6. **Display Mode** - Use MouseMove (default) for desktop, consider Click for mobile
7. **Positioning** - Tooltips auto-position to stay within viewport

## Common Issues

### Issue 1: Zooming Not Working

**Symptoms:** Cannot zoom in/out

**Solutions:**

```cshtml
@* 1. Verify Enable is true *@
.ZoomSettings(zoom => zoom.Enable(true))

@* 2. Check if specific zoom type is enabled *@
.MouseWheelZoom(true)         // For mouse wheel
.PinchZooming(true)           // For touch
.DoubleClickZoom(true)        // For double-click

@* 3. Ensure panning isn't conflicting with selection zoom *@
@* For selection zoom, disable panning: *@
.EnablePanning(false)
.EnableSelectionZooming(true)

@* 4. Check MinZoom and MaxZoom values *@
.MinZoom(1)      // Must be ≥ 1
.MaxZoom(10)     // Must be > MinZoom
```

### Issue 2: Selection Not Visible

**Symptoms:** Clicking shapes doesn't show selection

**Solutions:**

```cshtml
@* 1. Enable selection *@
.SelectionSettings(selection => selection.Enable(true))

@* 2. Set contrasting selection color *@
.SelectionSettings(selection => selection
    .Enable(true)
    .Fill("#FF0000")          // Must contrast with shape color
    .Opacity(1.0))

@* 3. Verify data binding for shapes *@
.DataSource(ViewBag.Data)
.ShapePropertyPath(new[] { "name" })
.ShapeDataPath("Country")

@* 4. Check if highlight is masking selection *@
@* Disable highlight temporarily to test: *@
.HighlightSettings(highlight => highlight.Enable(false))
```

### Issue 3: Tooltip Not Showing

**Symptoms:** No tooltip on hover/click

**Checklist:**

```cshtml
@* 1. Enable tooltip *@
.TooltipSettings(tooltip => tooltip.Visible(true))

@* 2. Set ValuePath or Template *@
.ValuePath("Country")         // Must match data field name

@* 3. Verify data binding *@
.DataSource(ViewBag.Data)
.ShapeDataPath("Country")

@* 4. Check display mode *@
.TooltipDisplayMode(Syncfusion.EJ2.Maps.TooltipGesture.MouseMove)  // Or Click

@* 5. Ensure tooltip isn't transparent *@
.TooltipSettings(tooltip => tooltip
    .Visible(true)
    .Fill("#333333")          // Visible background
    .TextStyle(style => style.Color("#FFFFFF")))  // Visible text
```

### Issue 4: Highlight Not Working

**Symptoms:** No hover effect on shapes

**Solutions:**

```cshtml
@* 1. Enable highlight *@
.HighlightSettings(highlight => highlight.Enable(true))

@* 2. Set visible highlight color *@
.HighlightSettings(highlight => highlight
    .Enable(true)
    .Fill("#FFFF00")          // Yellow or contrasting color
    .Opacity(0.7))            // Visible but not opaque

@* 3. Check if selection is overriding highlight *@
@* Selection takes precedence over highlight *@

@* 4. Verify mouse events aren't blocked *@
@* Check for CSS pointer-events: none *@
```

### Issue 5: Panning Not Working

**Symptoms:** Cannot drag map to pan

**Solutions:**

```cshtml
@* 1. Enable panning *@
.ZoomSettings(zoom => zoom
    .Enable(true)
    .EnablePanning(true))

@* 2. Ensure selection zoom isn't enabled *@
@* These are mutually exclusive: *@
.EnablePanning(true)          // ✅ For panning
.EnableSelectionZooming(false)  // ❌ Disable selection zoom

@* 3. Zoom in first *@
@* Panning only works when zoomed in (ZoomFactor > 1) *@

@* 4. Check toolbar Pan button *@
@* Click Pan button in toolbar to activate pan mode *@
```

### Issue 6: Initial Selection Not Working

**Symptoms:** Pre-selected shapes don't appear selected

**Solutions:**

```cshtml
@* 1. Verify ShapePath matches GeoJSON property *@
.InitialShapeSelection(init =>
{
    init.ShapePath("name")                    // Must match GeoJSON property
        .ShapeValue("United States")          // Exact value from GeoJSON
        .Add();
})

@* 2. Check SelectionSettings is enabled *@
.SelectionSettings(selection => selection.Enable(true))

@* 3. Ensure data binding is correct *@
.DataSource(ViewBag.Data)
.ShapePropertyPath(new[] { "name" })
.ShapeDataPath("Country")

@* 4. Case sensitivity matters *@
.ShapeValue("United States")  // ✅ Correct
.ShapeValue("united states")  // ❌ May not match
```

## Summary

This reference covered:

- ✅ All zoom types (toolbar, mouse wheel, pinch, double-click, selection)
- ✅ Zoom customization (limits, animation, toolbar styling)
- ✅ Panning configuration
- ✅ Selection for shapes, markers, bubbles, and polygons
- ✅ Multi-select and initial selection
- ✅ Programmatic selection methods
- ✅ Highlight for all map elements
- ✅ Tooltip configuration and customization
- ✅ Tooltip templates and display modes
- ✅ Best practices for each interaction type
- ✅ Common issues and troubleshooting

**Next Steps:**
- Integrate map providers (Bing, Azure, OpenStreetMap)
- Implement advanced customization (themes, accessibility, printing)
- Handle map events for custom interactions

---

**Example Code Repository:** Check `utils/code-snippet/user-interactions/` for complete working examples.
