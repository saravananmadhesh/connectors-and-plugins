# Legend and Map Overlays

## Table of Contents
- [Overview](#overview)
- [Legend](#legend)
  - [Legend Modes](#legend-modes)
  - [Legend for Shapes](#legend-for-shapes)
  - [Legend for Bubbles](#legend-for-bubbles)
  - [Legend for Markers](#legend-for-markers)
  - [Legend Positioning](#legend-positioning)
  - [Legend Customization](#legend-customization)
  - [Legend Toggle](#legend-toggle)
  - [Advanced Legend Features](#advanced-legend-features)
- [Annotations](#annotations)
  - [Adding Annotations](#adding-annotations)
  - [Positioning Annotations](#positioning-annotations)
  - [Annotation Alignment](#annotation-alignment)
  - [Z-Index Control](#z-index-control)
  - [Multiple Annotations](#multiple-annotations)
- [Navigation Lines](#navigation-lines)
  - [Adding Navigation Lines](#adding-navigation-lines)
  - [Customizing Navigation Lines](#customizing-navigation-lines)
  - [Navigation Line Arrows](#navigation-line-arrows)
- [Polygons](#polygons)
  - [Adding Polygon Shapes](#adding-polygon-shapes)
  - [Polygon Customization](#polygon-customization)
  - [Polygon Tooltips](#polygon-tooltips)
- [Best Practices](#best-practices)
  - [Legend Best Practices](#legend-best-practices)
  - [Annotations Best Practices](#annotations-best-practices)
  - [Navigation Lines Best Practices](#navigation-lines-best-practices)
  - [Polygons Best Practices](#polygons-best-practices)
- [Common Issues](#common-issues)
  - [Issue 1: Legend Not Showing](#issue-1-legend-not-showing)
  - [Issue 2: Annotations Not Visible](#issue-2-annotations-not-visible)
  - [Issue 3: Navigation Lines Not Rendering](#issue-3-navigation-lines-not-rendering)
  - [Issue 4: Polygon Not Closing](#issue-4-polygon-not-closing)
  - [Issue 5: Legend Toggle Not Working](#issue-5-legend-toggle-not-working)
- [Summary](#summary)

## Overview

Map overlays enhance geographical data presentation with additional visual elements:

- **Legend** - Visual guide explaining map symbols, colors, and values
- **Annotations** - Custom HTML overlays positioned at specific coordinates or regions
- **Navigation Lines** - Lines connecting locations (flight paths, shipping routes)
- **Polygons** - Custom shapes drawn over map areas

**When to use each feature:**
- **Legend:** Always include when using color mapping, markers, or bubbles
- **Annotations:** Add contextual information, labels, or custom graphics
- **Navigation Lines:** Show connections, routes, or relationships between locations
- **Polygons:** Highlight specific areas, regions, or custom boundaries

## Legend

### Legend Modes

The Maps component supports two legend modes:

**1. Default Mode**
- Shows symbols with labels
- Static display
- Used for identification only

**2. Interactive Mode**
- Shows arrow pointer indicating exact value in legend range
- Updates on mouse hover over shapes
- Provides visual feedback for data exploration

**Example: Interactive Legend**

**Controller:**

```csharp
public ActionResult Index()
{
    ViewBag.MapData = GetWorldMap();
    ViewBag.DensityData = new[]
    {
        new { Country = "United States", Density = 36 },
        new { Country = "India", Density = 464 },
        new { Country = "China", Density = 153 }
    };
    return View();
}
```

**View:**

```cshtml
@Html.EJS().Maps("container").LegendSettings(legend => legend
        .Visible(true)
        .Mode(Syncfusion.EJ2.Maps.LegendMode.Interactive)
        .InvertedPointer(true)).Layers(layer =>
    {
        layer
        .ShapeSettings(settings => settings
            .ColorValuePath("Density")
            .ColorMapping(cm =>
            {
                cm.From(0).To(100).Color("#deebae").Label("Low").Add();
                cm.From(100).To(500).Color("#7bc1ce").Label("Medium").Add();
                cm.From(500).To(1500).Color("#005288").Label("High").Add();
            }))
        .ShapeData(ViewBag.MapData)
            .DataSource(ViewBag.DensityData)
            .ShapePropertyPath(new[] { "name" })
            .ShapeDataPath("Country")
            .Add();
    }).Render()
```

### Legend for Shapes

Legend automatically generates items based on color mapping configuration:

**Example: Legend with Range Color Mapping**

```cshtml
@Html.EJS().Maps("container").LegendSettings(legend => legend
        .Visible(true)
        .Position(Syncfusion.EJ2.Maps.LegendPosition.Bottom)).Layers(layer =>
    {
        layer
        .ShapeSettings(settings => settings
            .ColorValuePath("Population")
            .ColorMapping(cm =>
            {
                cm.From(0).To(100).Color("#E8F5E9").Label("0-100M").Add();
                cm.From(100).To(500).Color("#81C784").Label("100-500M").Add();
                cm.From(500).To(1500).Color("#2E7D32").Label("500M+").Add();
            }))
        .ShapeData(ViewBag.MapData)
            .DataSource(ViewBag.PopulationData)
            .ShapePropertyPath(new[] { "name" })
            .ShapeDataPath("Country")
            .Add();
    }).Render()
```

**Key Points:**
- Legend items automatically created from `ColorMapping`
- `Label` property in `ColorMapping` sets legend text
- Legend shows in configured position
- Colors match exactly what's applied to shapes

### Legend for Bubbles

Enable legend for bubbles by setting the legend `Type` property:

**Example:**

```cshtml
@Html.EJS().Maps("container").LegendSettings(legend => legend
        .Visible(true)
        .Type(Syncfusion.EJ2.Maps.LegendType.Bubbles)   // Set type to Bubbles
        .Position(Syncfusion.EJ2.Maps.LegendPosition.Top)).Layers(layer =>
    {
        layer
        .BubbleSettings(bubble =>
{
    bubble.Visible(true)
    .ColorMapping(cm =>
        {
            cm.From(0).To(100).Color("#7BC1CE").Label("Low Density").Add();
            cm.From(100).To(500).Color("#E03C31").Label("High Density").Add();
        })
        .DataSource(ViewBag.PopulationData)
        .ValuePath("population")
        .ColorValuePath("density")
        .MinRadius(5)
        .MaxRadius(40)
        .Add();
})
        .ShapeData(ViewBag.MapData)
            .Add();
    })
    .Render()
```

### Legend for Markers

Enable marker legend by setting the legend Type and using `LegendText` in markers:

**Controller:**

```csharp
public ActionResult Index()
{
    ViewBag.MapData = GetWorldMap();
    ViewBag.MarkerData = new[]
    {
        new { latitude = 40.7128, longitude = -74.0060, name = "New York", type = "City" },
        new { latitude = 51.5074, longitude = -0.1278, name = "London", type = "City" },
        new { latitude = 35.6762, longitude = 139.6503, name = "Tokyo", type = "Capital" }
    };
    return View();
}
```

**View:**

```cshtml
@Html.EJS().Maps("container").LegendSettings(legend => legend
        .Visible(true)
        .Type(Syncfusion.EJ2.Maps.LegendType.Markers)).Layers(layer =>
        {
            layer
            .MarkerSettings(marker =>
            {
                marker.Visible(true)
                    .DataSource(ViewBag.MarkerData)
                    .LegendText("type")                  // Field for legend text
                    .ColorValuePath("type")              // Field for color
                    .ShapeValuePath("type")              // Field for shape
                    .Add();
            })
            .ShapeData(ViewBag.MapData)
                .Add();
        }).Render()
```

**Imitate Marker Shape in Legend:**

```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .Type(Syncfusion.EJ2.Maps.LegendType.Markers)
    .UseMarkerShape(true))              // Legend items use marker shapes
```

### Legend Positioning

**Position Options:**

| Position | Description |
|----------|-------------|
| `Top` | Above the map |
| `Bottom` | Below the map |
| `Left` | Left side of map |
| `Right` | Right side of map |
| `Float` | Custom position using `Location` |

**Alignment Options (with Top/Bottom/Left/Right):**

| Alignment | Description |
|-----------|-------------|
| `Near` | Start of the edge |
| `Center` | Center of the edge |
| `Far` | End of the edge |

**Example: Dock Positioning**

```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .Position(Syncfusion.EJ2.Maps.LegendPosition.Right)
    .Alignment(Syncfusion.EJ2.Maps.Alignment.Center))
```

**Example: Float (Absolute) Positioning**

```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .Position(Syncfusion.EJ2.Maps.LegendPosition.Float)
    .Location(location => location
        .X(10)           // Pixels from left
        .Y(300)))        // Pixels from top
```

### Legend Customization

**Complete Customization Example:**

```cshtml
@{
    var data = new[]
        {
            new { Country= "China", Membership= "Permanent" },
            new { Country= "France", Membership= "Permanent" },
            new { Country= "Russia", Membership= "Permanent" },
            new { Country= "Kazakhstan", Membership= "Non-Permanent" },
            new { Country= "Poland", Membership= "Non-Permanent" },
            new { Country= "Sweden", Membership= "Non-Permanent" },
        };
    var colormapping = new List<Syncfusion.EJ2.Maps.MapsColorMapping> {
        new MapsColorMapping{ Color = "#D84444",Value= "Permanent"  },
        new MapsColorMapping { Color= "#316DB5", Value = "Non-Permanent" },
    };
    var text = new MapsFont
    {
        Size = "12px",
        Color = "red",
        FontStyle = "italic"
    };
    var title = new MapsCommonTitleSettings
    {
        Description = "Legend title",
        Text = "Legend"
    };
    var titleStyle = new TitleSettingsTextStyleTitleSettings
    {
        Size = "12px",
        Color = "#d6e341",
        FontStyle = "italic"
    };
    var border = new MapsBorder
    {
        Color = "blue",
        Width = 2,
        Opacity = 1
    };
}

@Html.EJS().Maps("maps").LegendSettings(legend => legend.Visible(true).Background("green").Fill("orange").LabelPosition(Syncfusion.EJ2.Maps.LabelPosition.Before).
Orientation(Syncfusion.EJ2.Maps.LegendArrangement.Vertical).TextStyle(text).Title(title).TitleStyle(titleStyle).Border(border)).Layers(l =>
{
    l.ShapeSettings(ss => ss.ColorValuePath("Membership").ColorMapping(colormapping)).ShapeData(ViewBag.worldMap)
    .ShapeDataPath("Country").ShapePropertyPath("name")
    .DataSource(data).Add();
}).Render()
```

**Customization Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `Background` | String | Legend background color |
| `Border` | Object | Border color, width, opacity |
| `Height` | String | Legend height (px, %) |
| `Width` | String | Legend width (px, %) |
| `Opacity` | Double | Legend transparency |
| `Orientation` | Enum | Horizontal or Vertical |
| `Shape` | Enum | Legend item shape (Circle, Rectangle, etc.) |
| `ShapeHeight` | Double | Legend item height |
| `ShapeWidth` | Double | Legend item width |
| `ShapePadding` | Double | Space between legend items |
| `TextStyle` | Object | Text font, size, color |
| `Title` | Object | Legend title configuration |

**Legend Shapes Available:**

- Circle
- Rectangle
- Triangle
- Diamond
- Cross
- Star
- HorizontalLine
- VerticalLine
- Pentagon
- InvertedTriangle

### Legend Toggle

Enable legend toggle to show/hide map elements by clicking legend items:

**Example:**

```cshtml
@Html.EJS().Maps("container").LegendSettings(legend => legend.Visible(true).ToggleLegendSettings(Tl => Tl.Enable(true)
.ApplyShapeSettings(false).Fill("green").Border(Br => Br.Color("green").Width(2).Opacity(1)))).Layers(layer =>
{
    layer.DataSource(ViewBag.populationDensity).ShapeDataPath("name")
    .ShapePropertyPath("name").ShapeSettings(new MapsShapeSettings
    {
        ColorValuePath = "density",
        ColorMapping = new List<MapsColorMapping> {
                 new MapsColorMapping { From = 1 , To = 100, Color="rgb(153,174,214)"},
                 new MapsColorMapping { From = 101 , To = 200, Color="rgb(115,143,199)" },
                 new MapsColorMapping { Color="rgb(77,112,184)" },
    }
    }).ShapeData(ViewBag.worldMap).Add();
}).Render()
```

**How It Works:**
1. Click legend item to toggle associated shapes
2. Toggled shapes change to specified `Fill` color and `Opacity`
3. Click again to restore original appearance
4. Interactive data exploration without code

**Toggle Properties:**

| Property | Description |
|----------|-------------|
| `Enable` | Enable/disable toggle functionality |
| `ApplyShapeSettings` | Use shape's own fill color when toggled |
| `Fill` | Color for toggled shapes |
| `Opacity` | Opacity for toggled shapes |
| `Border` | Border configuration for toggled shapes |

### Advanced Legend Features

**Hide Specific Legend Items:**

```cshtml
.ColorMapping(cm =>
{
    cm.From(0).To(100).Color("#deebae").Label("Low").ShowLegend(true).Add();
    cm.From(100).To(500).Color("#7bc1ce").Label("Medium").ShowLegend(false).Add(); // Hidden
    cm.From(500).To(1500).Color("#005288").Label("High").ShowLegend(true).Add();
})
```

**Hide Duplicate Legend Items:**

```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .RemoveDuplicateLegend(true))           // Remove duplicate entries
```

**Legend Text from Data Source:**

```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .ValuePath("legendText"))               // Use field from data for legend text
```

**Hide Legend Based on Data Source:**

**Controller:**

```csharp
ViewBag.Data = new[]
{
    new { Country = "USA", Value = 100, ShowInLegend = true },
    new { Country = "Canada", Value = 50, ShowInLegend = false }
};
```

**View:**

```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .ShowLegendPath("ShowInLegend"))        // Field controlling visibility
```

## Annotations

### Adding Annotations

Annotations overlay custom HTML content at specific positions on the map:

**Basic Annotation Example:**

```cshtml
@Html.EJS().Maps("maps").Annotations(new List<Syncfusion.EJ2.Maps.MapsAnnotation>{
    new Syncfusion.EJ2.Maps.MapsAnnotation
    {
        Content = "<div id='annotation' style='display:none'><img src=''~/App_Data/ballon.png'></div>",
        X = "0%",
        Y = "50%",
    }
}).Layers(layer =>
{
    layer.ShapeData(ViewBag.worldmap).Add();
}).Render()
```

### Positioning Annotations

**Positioning Methods:**

1. **Percentage Values** - Relative to map container
2. **Pixel Values** - Absolute positioning

**Example: Multiple Positioning Methods**

```cshtml
.Annotations(annotation =>
{
    // Percentage positioning (responsive)
    annotation.Content("<div class='annotation'>Center</div>")
        .X("50%")
        .Y("50%")
        .Add();
    
    // Pixel positioning (fixed)
    annotation.Content("<div class='annotation'>Top-Left</div>")
        .X("20")           // 20px from left
        .Y("20")           // 20px from top
        .Add();
})
```

### Annotation Alignment

Control annotation alignment relative to its position:

**Alignment Options:**

| Horizontal | Vertical | Description |
|------------|----------|-------------|
| `Near` | `Near` | Top-left corner at position |
| `Center` | `Center` | Center at position |
| `Far` | `Far` | Bottom-right corner at position |
| `None` | `None` | No alignment adjustment |

**Example:**

```cshtml
.Annotations(annotation =>
{
    annotation.Content("<div class='label'>New York</div>")
        .X("40.7128")           // Latitude-like position
        .Y("-74.0060")          // Longitude-like position
        .HorizontalAlignment(Syncfusion.EJ2.Maps.AnnotationAlignment.Center)
        .VerticalAlignment(Syncfusion.EJ2.Maps.AnnotationAlignment.Center)
        .Add();
})
```

### Z-Index Control

Control stacking order of annotations:

```cshtml
.Annotations(annotation =>
{
    // Background annotation (behind)
    annotation.Content("<div class='bg-annotation'>Background</div>")
        .X("50%")
        .Y("50%")
        .ZIndex("-1")
        .Add();
    
    // Foreground annotation (in front)
    annotation.Content("<div class='fg-annotation'>Foreground</div>")
        .X("50%")
        .Y("50%")
        .ZIndex("1")
        .Add();
})
```

### Multiple Annotations

Add multiple annotations for complex layouts:

**Example: Map Labels**

```cshtml
@Html.EJS().Maps("maps").Annotations(new List<Syncfusion.EJ2.Maps.MapsAnnotation>{
    new Syncfusion.EJ2.Maps.MapsAnnotation
    {
        Content = "<div id='first'><h1>Maps</h1></div>",
        X = "50%",
        Y = "0%",
        ZIndex = "-1"
    },
     new Syncfusion.EJ2.Maps.MapsAnnotation {
        Content = "<div id='first'><h1>Maps-Annotation</h1></div>",
        X = "20%",
        Y = "50%",
        ZIndex = "-1"
    }
}).Layers(layer =>
{
    layer.ShapeData(ViewBag.worldmap).Add();
}).Render()
```

## Navigation Lines

### Adding Navigation Lines

Navigation lines connect two geographical points:

**Controller:**

```csharp
public ActionResult Index()
{
    ViewBag.MapData = GetWorldMap();
    ViewBag.NavigationLines = new[]
    {
        new {
            latitude = new[] { 40.7128, 51.5074 },
            longitude = new[] { -74.0060, -0.1278 },
            name = "NY to London"
        },
        new {
            latitude = new[] { 51.5074, 35.6762 },
            longitude = new[] { -0.1278, 139.6503 },
            name = "London to Tokyo"
        }
    };
    return View();
}
```

**View:**

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
{
    layer
        .NavigationLineSettings(nav =>
        {
            nav.Visible(true)
                .Latitude(new[] { 40.7128, 51.5074 })
                .Longitude(new[] { -74.0060, -0.1278 })
                .Color("#0000FF")
                .Width(2)
                .Add();
        })
        .ShapeData(ViewBag.MapData)
        .Add();
}).Render()
```

### Customizing Navigation Lines

**Full Customization:**

```cshtml
.NavigationLineSettings(nav =>
{
    nav.Visible(true)
        .Latitude(new[] { 40.7128, 51.5074 })
        .Longitude(new[] { -74.0060, -0.1278 })
        .Color("#FF6347")                   // Tomato red
        .Width(3)                           // 3px width
        .DashArray("5,3")                   // Dashed line pattern
        .Angle(45)                          // Curved angle
        .SelectionSettings(selection => selection
            .Enable(true)
            .Fill("#FFD700")                // Gold when selected
            .Width(5))
        .HighlightSettings(highlight => highlight
            .Enable(true)
            .Fill("#FF0000")                // Red on hover
            .Width(4))
        .Add();
})
```

**Customization Properties:**

| Property | Description |
|----------|-------------|
| `Color` | Line color |
| `Width` | Line width in pixels |
| `DashArray` | Dash pattern (e.g., "5,3" = 5px dash, 3px gap) |
| `Angle` | Curvature angle of line |
| `SelectionSettings` | Appearance when selected |
| `HighlightSettings` | Appearance on hover |

### Navigation Line Arrows

Add directional arrows to navigation lines:

```cshtml
.NavigationLineSettings(nav =>
{
    nav.Visible(true)
        .Latitude(new[] { 40.7128, 51.5074 })
        .Longitude(new[] { -74.0060, -0.1278 })
        .Color("#0000FF")
        .Width(2)
        .ArrowSettings(arrow => arrow
            .ShowArrow(true)                // Enable arrow
            .Position(Syncfusion.EJ2.Maps.ArrowPosition.End)  // At end of line
            .Size(8)                        // Arrow size
            .Color("#FF0000")               // Arrow color
            .OffSet(10))                    // Offset from end point
        .Add();
})
```

**Arrow Positions:**
- `Start` - Arrow at beginning of line
- `End` - Arrow at end of line

## Polygons

### Adding Polygon Shapes

Polygons are custom shapes defined by coordinate points:

**Example: Highlight Specific Region**

**View:**

```cshtml
@{
    var data = new[]
    {
        new { longitude = 34.88539587371454, latitude = 28.181421087099537 },
        new { longitude = 37.50029619722466, latitude = 24.299419888989462 },
        ....
        new { longitude = 34.85774476486728, latitude = 29.3103032832622 },
        new { longitude = 34.64498583263142, latitude = 28.135787235699823 },
        new { longitude = 34.88539587371454, latitude = 28.181421087099537 }
    };


    var polygons = new List<Syncfusion.EJ2.Maps.MapsPolygon>
{
        new Syncfusion.EJ2.Maps.MapsPolygon{ Points=data, Fill="blue", Opacity=0.7, BorderColor="green", BorderOpacity=0.7, BorderWidth=2 }
    };
}

@(Html.EJS().Maps("maps").Layers(layers => { layers.PolygonSettings(polygon => { polygon.Polygons(polygons); }).ShapeData(ViewBag.world_map).Add(); }).Render())
```

### Polygon Customization

**Multiple Polygons:**

```cshtml
.PolygonSettings(polygon => polygon
    .Polygons(poly =>
    {
        // Polygon 1: West Coast
        poly.Points(ViewBag.WestCoastPoints)
            .Fill("#FF6347")
            .Opacity(0.4)
            .BorderColor("#8B0000")
            .BorderWidth(2)
            .TooltipText("West Coast Region")
            .Add();
        
        // Polygon 2: East Coast
        poly.Points(ViewBag.EastCoastPoints)
            .Fill("#4169E1")
            .Opacity(0.4)
            .BorderColor("#000080")
            .BorderWidth(2)
            .TooltipText("East Coast Region")
            .Add();
    }))
```

### Polygon Tooltips

**Enable Tooltips:**

```cshtml
@(Html.EJS().Maps("maps").Layers(layers => { layers.PolygonSettings(polygon => { polygon.Polygons(polygons).TooltipSettings(tooltipSettings); }).ShapeData(ViewBag.world_map).Add(); }).Render())
```

**Custom Tooltip Template:**

```cshtml
@(Html.EJS().Maps("maps").Layers(layers => { layers.PolygonSettings(polygon => { polygon.Polygons(polygons).TooltipSettings(tooltipSettings); }).ShapeData(ViewBag.world_map).Add(); }).Render())
```

## Best Practices

### Legend Best Practices

1. **Always Include Legend** - Use legend whenever data visualization involves colors, shapes, or sizes
2. **Clear Labels** - Use concise, descriptive legend labels
3. **Appropriate Positioning** - Place legend where it doesn't obscure important map areas
4. **Interactive for Exploration** - Use interactive mode for data-dense maps
5. **Limit Legend Items** - Keep to 5-10 items maximum for clarity
6. **Match Colors** - Ensure legend colors exactly match map element colors
7. **Use Toggle Wisely** - Enable toggle for maps with many categories

### Annotations Best Practices

1. **Minimal Annotations** - Use sparingly to avoid clutter
2. **Responsive Positioning** - Use percentage values for responsive layouts
3. **Z-Index Management** - Organize layers logically (background → content → overlays)
4. **Style Consistency** - Match annotation styles to overall map theme
5. **Accessibility** - Ensure text contrast meets WCAG standards
6. **Performance** - Limit complex HTML in annotations for large maps

### Navigation Lines Best Practices

1. **Use for Connections** - Best for flight routes, trade routes, relationships
2. **Color Coding** - Use different colors for different route types
3. **Avoid Overlap** - Minimize crossing lines for readability
4. **Add Arrows** - Use arrows to show direction when relevant
5. **Interactive Feedback** - Enable hover/selection for route details
6. **Curved Lines** - Use `Angle` property for visual separation of parallel routes

### Polygons Best Practices

1. **Highlight Regions** - Use for focusing attention on specific areas
2. **Semi-Transparent** - Use opacity 0.3-0.6 to show underlying map
3. **Border Contrast** - Use contrasting border color for definition
4. **Tooltips Always** - Provide context with tooltips or labels
5. **Performance** - Limit complex polygons (many points) for performance

## Common Issues

### Issue 1: Legend Not Showing

**Symptoms:** Legend doesn't appear on map

**Checklist:**

```cshtml
@* 1. Verify Visible is true *@
.LegendSettings(legend => legend.Visible(true))

@* 2. Check color mapping is configured *@
.ColorMapping(cm =>
{
    cm.From(0).To(100).Color("#AAA").Label("Low").Add();  // Must have Label
})

@* 3. Verify legend Type matches visualization type *@
.Type(Syncfusion.EJ2.Maps.LegendType.Layers)      // For shapes (default)
.Type(Syncfusion.EJ2.Maps.LegendType.Bubbles)     // For bubbles
.Type(Syncfusion.EJ2.Maps.LegendType.Markers)     // For markers

@* 4. Check if legend is positioned outside visible area *@
.Position(Syncfusion.EJ2.Maps.LegendPosition.Bottom)  // Try different position
```

### Issue 2: Annotations Not Visible

**Symptoms:** Annotations don't appear

**Solutions:**

```cshtml
@* 1. Check X/Y values are within map bounds *@
.X("50%")     // Must be 0-100% or valid pixel value
.Y("50%")

@* 2. Verify Z-Index is appropriate *@
.ZIndex("1")  // Positive value to appear above map

@* 3. Check Content is valid HTML *@
.Content("<div>Valid HTML</div>")  // Must be valid

@* 4. Ensure alignment doesn't push annotation offscreen *@
.HorizontalAlignment(Syncfusion.EJ2.Maps.AnnotationAlignment.Center)
```

### Issue 3: Navigation Lines Not Rendering

**Symptoms:** Lines don't show between locations

**Causes & Solutions:**

```cshtml
@* 1. Verify Visible is true *@
.Visible(true)

@* 2. Check coordinate arrays have same length *@
.Latitude(new[] { 40.7128, 51.5074 })   // 2 points
.Longitude(new[] { -74.0060, -0.1278 }) // Must also have 2 points

@* 3. Ensure coordinates are valid *@
@* Latitude: -90 to 90 *@
@* Longitude: -180 to 180 *@

@* 4. Check line width and color are visible *@
.Width(2)            // At least 1-2px
.Color("#FF0000")    // Contrasting color
```

### Issue 4: Polygon Not Closing

**Symptoms:** Polygon shape isn't closed/complete

**Solution:**

```csharp
// First and last points must be the same to close polygon
ViewBag.PolygonPoints = new[]
{
    new { latitude = 37.0, longitude = -122.0 },
    new { latitude = 32.0, longitude = -117.0 },
    new { latitude = 36.0, longitude = -119.0 },
    new { latitude = 37.0, longitude = -122.0 }    // ✅ Same as first point
};
```

### Issue 5: Legend Toggle Not Working

**Symptoms:** Clicking legend items doesn't toggle shapes

**Checklist:**

```cshtml
@* 1. Enable toggle *@
.ToggleLegendSettings(toggle => toggle.Enable(true))

@* 2. Ensure data binding is correct *@
@* Toggle only works with properly bound data *@
.DataSource(ViewBag.Data)
.ShapePropertyPath(new[] { "name" })
.ShapeDataPath("Country")

@* 3. Check browser console for JavaScript errors *@
```

## Summary

This reference covered:

- ✅ Legend modes (Default and Interactive)
- ✅ Legend for shapes, bubbles, and markers
- ✅ Legend positioning and customization
- ✅ Legend toggle for interactive data exploration
- ✅ Advanced legend features (hide items, remove duplicates)
- ✅ Adding and positioning annotations
- ✅ Annotation alignment and z-index control
- ✅ Multiple annotations for complex layouts
- ✅ Navigation lines for showing connections
- ✅ Customizing navigation lines and arrows
- ✅ Adding polygon shapes over maps
- ✅ Polygon customization and tooltips
- ✅ Best practices for each overlay type
- ✅ Common issues and troubleshooting

**Next Steps:**
- Explore user interactions (zoom, pan, selection, tooltips)
- Learn about map provider integration (Bing, Azure, OSM)
- Implement accessibility and customization features

---

**Example Code Repository:** Check `utils/code-snippet/legend/`, `utils/code-snippet/annotations/`, `utils/code-snippet/navigation-line/`, and `utils/code-snippet/polygon/` for complete working examples.
