---
name: syncfusion-aspnetmvc-maps
description: Implement Syncfusion Maps component for ASP.NET MVC to visualize geographical data with layers and markers. Always use this skill when user mentions maps, geographical data, geojson, map visualization, world maps, country maps, region maps, state maps, choropleth maps, markers, bubble, heat maps, spatial data visualization, bing maps, azure maps, openstreetmap, map layers, map projections, location markers, interactive maps, zoomable maps, map data binding, shape data and latitude longitude.
metadata:
  author: "Syncfusion"
  category: "Data Visualization"
  version: "34.1.29"
---

# Implementing Syncfusion Maps for ASP.NET MVC

The Syncfusion Maps component is a powerful data visualization control for rendering geographical data using Scalable Vector Graphics (SVG). It supports GeoJSON shapes, multiple layers, map providers (Bing, Azure, OpenStreetMap), and rich interactive features including zooming, panning, tooltips, markers, bubbles, and data-driven color mapping.

## When to Use This Skill

Use the Syncfusion Maps component when you need to:

- **Visualize geographical data** - Display country, state, or regional data on interactive maps
- **Create choropleth maps** - Show data distribution using color mapping across geographical regions
- **Plot location markers** - Display points of interest, offices, stores, or custom locations with markers
- **Render bubble maps** - Visualize quantitative data with size-based bubbles on geographical locations
- **Integrate map providers** - Use Bing Maps, Azure Maps, or OpenStreetMap as base layers
- **Show custom shapes** - Render custom GeoJSON shapes for specific regions or areas
- **Build interactive dashboards** - Create zoomable, pannable maps with tooltips and selection
- **Display navigation routes** - Show navigation lines connecting different locations
- **Overlay annotations** - Add custom HTML/text annotations on maps at specific coordinates
- **Create multi-layer visualizations** - Combine multiple data layers on a single map
- **Bind shape data** - Connect database or JSON data to geographical shapes
- **Export maps** - Generate PNG, JPEG, SVG, or PDF exports of maps

## Component Overview

**Component:** Maps  
**Helper:** `@Html.EJS().Maps("containerId")`  
**Package:** Syncfusion.EJ2.MVC5  
**Namespace:** Syncfusion.EJ2.Maps

**Key Capabilities:**

- 📍 **Multiple Layers** - Unlimited layers and sublayers with independent configuration
- 🗺️ **GeoJSON Support** - Load and render custom geographical shapes
- 🌐 **Map Providers** - Integration with Bing Maps, Azure Maps, and OpenStreetMap
- 🎨 **Color Mapping** - Equal, range, and desaturation color schemes for data visualization
- 📌 **Markers** - Plot locations with Circle, Image, Letter, or custom HTML templates
- 🫧 **Bubbles** - Size-based bubble visualization for quantitative data
- 🏷️ **Data Labels** - Display shape names and data values with smart positioning
- 🎯 **Interactivity** - Zoom, pan, tooltip, selection, and highlight features
- 📊 **Legend** - Default and interactive legends for color mapping, markers, and bubbles
- ✏️ **Annotations** - Custom HTML overlays at specific coordinates
- 🌍 **Projections** - Support for 6 map projection types (Mercator, Equirectangular, etc.)
- 🔗 **Navigation Lines** - Connect locations with styled lines
- 🎭 **Polygons** - Draw custom polygons on maps
- 🖨️ **Export** - Print and export to PNG, JPEG, SVG, PDF formats
- 🌐 **Globalization** - Internationalization (i18n) and localization (l10n) support
- ♿ **Accessibility** - WCAG 2.2 AA compliant with keyboard navigation and screen reader support

## Documentation and Navigation Guide

### Getting Started and Installation

📄 **Read:** [references/getting-started.md](references/getting-started.md)

**When to read this reference:**
- Setting up the Maps component for the first time
- Installing Syncfusion.EJ2.MVC5 NuGet package
- Configuring project dependencies and namespaces
- Adding script references and ScriptManager
- Creating your first map with GeoJSON data
- Understanding controller setup and ViewBag data binding
- Loading GeoJSON files from App_Data folder
- Basic map rendering and configuration

**What you'll learn:**
- Complete prerequisites and system requirements
- Step-by-step NuGet package installation
- Web.config namespace configuration
- CDN and local script reference options
- ScriptManager registration in layout
- Loading and deserializing GeoJSON files
- Controller action setup for map data
- Basic Html.EJS().Maps() implementation
- Theme integration

---

### Layers and Data Binding

📄 **Read:** [references/layers-and-data.md](references/layers-and-data.md)

**When to read this reference:**
- Understanding map layer architecture
- Working with GeoJSON format and structure
- Adding main layers and sublayers to maps
- Creating multi-layer visualizations
- Loading GeoJSON from files or URLs
- Binding data sources to map shapes
- Configuring ShapeDataPath and ShapePropertyPath
- Matching data records to geographical shapes
- Implementing drill-down functionality with BaseLayerIndex
- Populating shape data from databases or APIs
- Dynamic data updates and transformations
- Layer visibility and ordering control

**What you'll learn:**
- Complete layer system architecture
- GeoJSON format specifications
- Main layer vs sublayer configuration
- Multiple layer support and management
- Data source binding techniques
- Shape property mapping
- Controller data preparation
- ViewBag data passing patterns
- Layer-specific settings and customization

---

### Markers and Bubbles

📄 **Read:** [references/markers-and-bubbles.md](references/markers-and-bubbles.md)

**When to read this reference:**
- Adding location markers to maps
- Using different marker types (Circle, Image, Letter, Template)
- Customizing marker appearance (size, color, borders)
- Positioning markers using latitude and longitude
- Adding marker tooltips and handling marker events
- Creating custom marker templates with Razor
- Implementing marker clustering
- Adding bubble visualizations to show quantitative data
- Sizing bubbles based on data values
- Configuring bubble colors, opacity, and styling
- Working with multiple marker or bubble datasets
- Combining markers and bubbles on same map

**What you'll learn:**
- Complete marker implementation guide
- All marker types with examples
- Marker positioning and coordinate systems
- Marker data source configuration
- Tooltip configuration for markers
- Event handling (click, hover, selection)
- Custom HTML marker templates
- Bubble layer architecture
- Bubble data binding
- Size calculation and normalization
- Multiple dataset management
- Best practices for marker/bubble placement

---

### Data Visualization (Labels and Color Mapping)

📄 **Read:** [references/data-visualization.md](references/data-visualization.md)

**When to read this reference:**
- Enabling data labels on map shapes
- Configuring label positioning (smart, auto, manual)
- Creating custom label templates
- Styling data labels (font, color, borders)
- Handling label intersections and overlaps
- Showing/hiding labels based on data conditions
- Implementing color mapping for choropleth maps
- Using equal color mapping for categorical data
- Using range color mapping for numeric data
- Using desaturation color mapping
- Customizing color palettes and schemes
- Binding data values to colors
- Creating data-driven heat maps

**What you'll learn:**
- Complete data label system
- Label positioning algorithms
- Template-based label customization
- Smart label placement
- Intersection action strategies
- All color mapping types explained
- Equal vs range vs desaturation mapping
- Color palette configuration
- Data-to-color binding techniques
- Best practices for readable visualizations

---

### Legend and Map Overlays

📄 **Read:** [references/legend-and-overlays.md](references/legend-and-overlays.md)

**When to read this reference:**
- Adding legends to maps
- Configuring legend modes (Default, Interactive)
- Positioning and aligning legends
- Creating legends for color mapping
- Creating legends for markers and bubbles
- Customizing legend templates
- Implementing interactive legend features
- Adding annotations to maps
- Positioning annotations at specific coordinates
- Creating HTML annotation templates
- Adding navigation lines between locations
- Styling and animating navigation lines
- Drawing polygons on maps
- Configuring polygon data and styling
- Highlighting map features

**What you'll learn:**
- Complete legend system (default and interactive modes)
- Legend positioning and layout options
- Legend for different visualization types
- Custom legend item templates
- Inverted pointer for interactive legends
- Annotation system architecture
- Annotation alignment and positioning
- HTML template-based annotations
- Navigation line implementation
- Line styling and animation
- Polygon drawing and configuration
- Complete overlay management

---

### User Interactions

📄 **Read:** [references/user-interactions.md](references/user-interactions.md)

**When to read this reference:**
- Enabling zoom functionality (toolbar, pinch, mouse wheel, double-click)
- Configuring pan/panning features
- Setting zoom limits and constraints
- Adding tooltips for shapes, markers, and bubbles
- Implementing shape selection (single and multi-select)
- Enabling highlight on hover
- Handling map events (click, hover, zoom, pan, resize)
- Customizing zoom toolbar buttons
- Implementing keyboard navigation
- Disabling specific interaction types
- Configuring zoom factor and animation
- Creating custom interaction behaviors

**What you'll learn:**
- Complete zooming system (all types)
- Panning configuration
- Zoom settings and properties
- Tooltip system for all elements
- Selection modes and configuration
- Highlight settings
- Event handling patterns
- Zoom toolbar customization
- Keyboard shortcuts and accessibility
- Touch gesture support
- Best practices for interactive maps

---

### Map Providers Integration

📄 **Read:** [references/map-providers.md](references/map-providers.md)

**When to read this reference:**
- Integrating Bing Maps as base layer
- Integrating Azure Maps as base layer
- Integrating OpenStreetMap (OSM) as base layer
- Configuring tile layer settings
- Setting up API keys for map providers
- Using provider-specific map types (Road, Aerial, Hybrid)
- Combining map providers with shape layers
- Configuring tile URL patterns
- Handling provider authentication
- Working with provider-specific options
- Optimizing tile loading and caching

**What you'll learn:**
- Complete map provider integration guide
- Bing Maps setup and configuration
- Azure Maps setup and configuration
- OpenStreetMap implementation
- API key registration and usage
- Tile layer architecture
- Layer type configuration (Geometry vs Tile)
- URL pattern configuration
- Provider authentication methods
- Combining providers with GeoJSON layers
- Performance optimization for tiles

---

### Customization and Advanced Features

📄 **Read:** [references/customization-and-advanced.md](references/customization-and-advanced.md)

**When to read this reference:**
- Setting map dimensions (width, height)
- Adding map title and subtitle
- Customizing map background and borders
- Applying themes (Material, Bootstrap, Fabric, etc.)
- Custom CSS styling for map elements
- Implementing internationalization (i18n)
- Implementing localization (l10n) for map text
- Enabling RTL (right-to-left) support
- Printing maps
- Exporting maps to PNG, JPEG, SVG, or PDF formats
- Configuring print and export settings
- Ensuring WCAG 2.2 AA accessibility compliance
- Implementing keyboard navigation
- Adding screen reader support (ARIA attributes)
- Configuring high contrast themes
- Meeting Section 508 requirements

**What you'll learn:**
- Complete map customization options
- Size and dimension configuration
- Title and subtitle settings
- Background and border styling
- Theme system and CSS customization
- Globalization support (i18n/l10n)
- RTL implementation
- Print functionality with settings
- Export formats and configuration
- Complete accessibility implementation
- WCAG and Section 508 compliance
- ARIA attributes and roles
- Keyboard navigation patterns
- Screen reader compatibility

---

### Maps API Reference

📄 **Read:** [references/maps-api-reference.md](references/maps-api-reference.md)

**Complete Maps class API reference with 70+ properties:**
- Container & display properties (Width, Height, Background, HtmlAttributes)
- Positioning & layout properties (CenterPosition, Margin, MapsArea, TabIndex)
- Styling & theme properties (Theme options - Material, Bootstrap, Fluent, Tailwind; Border configuration)
- Data & layer properties (Layers collection, BaseLayerIndex for multi-layer drill-down, ProjectionType - Mercator, Equirectangular, Miller, etc.)
- Legend & annotation properties (LegendSettings for visibility/positioning, Annotations for custom HTML overlays)
- Zoom & pan properties (ZoomSettings for all zoom operations, TooltipDisplayMode gestures)
- Selection & interaction properties (Description for accessibility, UseGroupingSeparator for numbers)
- Export & print properties (AllowImageExport, AllowPdfExport, AllowPrint)
- Localization & accessibility (Locale for i18n/l10n, EnableRtl for right-to-left languages, Format for internationalization)
- All 30+ events organized by category (Lifecycle: Load, Loaded, Resize, AnimationComplete; Layer & Shape: LayerRendering, ShapeRendering, ShapeHighlight, ShapeSelected, DataLabelRendering; Marker & Bubble: MarkerClick, MarkerRendering, MarkerMouseMove, MarkerDragStart/End, MarkerClusterClick/MouseMove/Rendering, BubbleRendering, BubbleClick, BubbleMouseMove; Legend & Annotation: LegendRendering, AnnotationRendering; Mouse & Pointer: Click, DoubleClick, RightClick, MouseMove, ItemSelection, ItemHighlight; Zoom & Pan: Zoom, ZoomComplete, Pan, PanComplete; Tooltip & Print: TooltipRender, TooltipRenderComplete, BeforePrint)
- 9 major enumerations (MapsTheme, ProjectionType, TooltipGesture, MarkerType, SelectionMode, LegendMode, LegendPosition, Type for layer types, BingMapType)
- 15 related configuration classes (MapsLayer, MapsMarkerSettings, MapsBubbleSettings, MapsDataLabelSettings, MapsShapeSettings, MapsLegendSettings, MapsZoomSettings, MapsAnnotation, MapsColorMapping, MapsCenterPosition, MapsMargin, MapsBorder, MapsTitleSettings, MapsNavigationLineSettings, MapsMapsAreaSettings)
- 6 common usage patterns with complete code examples (Choropleth map, Markers with tooltips, Multi-layer drill-down, Bing Maps provider, OpenStreetMap provider, Annotations)
- Direct links to official Syncfusion API documentation for all properties and classes

---

## Quick Start Example

Here's a minimal example to get started with the Maps component:

**Controller (HomeController.cs):**

```csharp
using System.Web.Mvc;
using Newtonsoft.Json;

public class HomeController : Controller
{
    public ActionResult Index()
    {
        // Load GeoJSON data from App_Data folder
        ViewBag.MapData = GetWorldMap();
        return View();
    }

    public object GetWorldMap()
    {
        string jsonPath = Server.MapPath("~/App_Data/WorldMap.json");
        string jsonContent = System.IO.File.ReadAllText(jsonPath);
        return JsonConvert.DeserializeObject(jsonContent, typeof(object));
    }
}
```

**View (Views/Home/Index.cshtml):**

```cshtml
@using Syncfusion.EJ2

<div class="control-section">
    <div style="width:100%; height:500px;">
        @Html.EJS().Maps("container").Layers(layer =>
        {
            layer.ShapeData(ViewBag.MapData).Add();
        }).Render()
    </div>
</div>
```

**Result:** A basic world map rendered with GeoJSON data.

---

## Common Patterns

### Pattern 1: Choropleth Map with Color Mapping

**Controller:**

```csharp
public ActionResult Index()
{
    ViewBag.MapData = GetWorldMap();
    ViewBag.PopulationData = new[]
    {
        new { Country = "United States", Population = 331 },
        new { Country = "India", Population = 1380 },
        new { Country = "China", Population = 1439 }
    };
    return View();
}
```

**View:**

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
{
    layer.ShapeData(ViewBag.MapData)
        .ShapeDataPath("Country")
        .ShapePropertyPath(new[] { "name" })
        .DataSource(ViewBag.PopulationData)
        .ShapeSettings(settings => settings
            .ColorValuePath("Population")
            .ColorMapping(cm =>
            {
                cm.From(0).To(500).Color("#deebae").Add();
                cm.From(500).To(1000).Color("#7bc1ce").Add();
                cm.From(1000).To(1500).Color("#3a8fb7").Add();
            })
        ).Add();
}).Render()
```

### Pattern 2: Adding Markers for Locations

**Controller:**

```csharp
public ActionResult Index()
{
    ViewBag.MapData = GetWorldMap();
    ViewBag.Markers = new[]
    {
        new { Latitude = 40.7128, Longitude = -74.0060, Name = "New York" },
        new { Latitude = 51.5074, Longitude = -0.1278, Name = "London" },
        new { Latitude = 35.6762, Longitude = 139.6503, Name = "Tokyo" }
    };
    return View();
}
```

**View:**

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
{
    layer.ShapeData(ViewBag.MapData)
        .MarkerSettings(marker =>
        {
            marker.Visible(true)
                .DataSource(ViewBag.Markers)
                .Shape(Syncfusion.EJ2.Maps.MarkerType.Circle)
                .Fill("#FF0000")
                .Height(10)
                .Width(10)
                .TooltipSettings(tooltip => tooltip.Visible(true).ValuePath("Name"))
                .Add();
        }).Add();
}).Render()
```

### Pattern 3: Interactive Map with Zoom and Selection

```cshtml
@Html.EJS().Maps("container")
    .ZoomSettings(zoom => zoom
        .Enable(true)
        .EnablePanning(true)
        .ZoomFactor(1)
        .MaxZoom(10)
        .MinZoom(1)
    )
    .Layers(layer =>
    {
        layer.ShapeData(ViewBag.MapData)
            .SelectionSettings(selection => selection
                .Enable(true)
                .Fill("#00FF00")
                .Border(b => b.Color("#000000").Width(2))
            )
            .Add();
    }).Render()
```

### Pattern 4: Using Bing Maps Provider

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
{
    layer.LayerType(Syncfusion.EJ2.Maps.Type.Bing)
        .BingMapType(Syncfusion.EJ2.Maps.BingMapType.Aerial)
        .Key("YOUR_BING_MAPS_API_KEY")
        .Add();
}).Render()
```

---

## Key Configuration Properties

### Maps-Level Properties

| Property | Type | Description |
|----------|------|-------------|
| `Layers` | List | Collection of map layers (main and sub-layers) |
| `ZoomSettings` | Object | Zoom and pan configuration |
| `LegendSettings` | Object | Legend visibility and configuration |
| `TitleSettings` | Object | Map title and subtitle |
| `Width` | String | Map width (px, %, or em) |
| `Height` | String | Map height (px, %, or em) |
| `ProjectionType` | Enum | Map projection (Mercator, Equirectangular, etc.) |
| `Background` | String | Background color |
| `CenterPosition` | Object | Center latitude/longitude |

### Layer Properties

| Property | Type | Description |
|----------|------|-------------|
| `ShapeData` | Object | GeoJSON data for shapes |
| `DataSource` | IEnumerable | Data to bind to shapes |
| `ShapeDataPath` | String | Property in data matching shape |
| `ShapePropertyPath` | String[] | Property in GeoJSON to match |
| `ShapeSettings` | Object | Shape styling (fill, border) |
| `MarkerSettings` | List | Marker configurations |
| `BubbleSettings` | List | Bubble configurations |
| `DataLabelSettings` | Object | Data label configuration |
| `SelectionSettings` | Object | Selection behavior |
| `HighlightSettings` | Object | Highlight behavior |
| `TooltipSettings` | Object | Tooltip configuration |
| `NavigationLineSettings` | List | Navigation line configurations |

### Common Events

| Event | Description |
|-------|-------------|
| `OnLoad` | Fired before map loads |
| `Loaded` | Fired after map loads |
| `Click` | Fired on shape/marker/bubble click |
| `OnZoom` | Fired during zoom operations |
| `MarkerClick` | Fired when marker is clicked |
| `ShapeSelected` | Fired when shape is selected |
| `TooltipRender` | Fired before tooltip renders |

---

## Use Case Examples

**Use Case 1: Sales Dashboard by Region**
- Display sales data on country/state maps
- Color regions based on sales volume
- Add markers for top-performing stores
- Interactive tooltips showing sales metrics

**Use Case 2: COVID-19 Tracking Dashboard**
- Choropleth map showing case density by region
- Color mapping from low to high case counts
- Data labels showing exact numbers
- Time-series animation of spread

**Use Case 3: Office Location Map**
- World map with company office markers
- Custom marker templates showing office info
- Navigation lines connecting headquarters to branches
- Click events to show detailed office information

**Use Case 4: Real Estate Price Map**
- Bubble map showing property prices by location
- Bubble size representing price
- Color representing property type
- Zoom to neighborhood level for details

**Use Case 5: Election Results Map**
- State/district map with color coding by winner
- Interactive legend for party selection
- Tooltips showing vote percentages
- Drill-down from country to state to district

---

## Best Practices

1. **Optimize GeoJSON Files** - Use simplified GeoJSON for better performance
2. **Use Appropriate Projections** - Choose projection based on geographical area
3. **Lazy Load Data** - Load detailed data only when zooming in
4. **Cache Map Data** - Cache GeoJSON and tile data for faster loading
5. **Responsive Sizing** - Use percentage-based width/height for responsive maps
6. **Accessibility** - Always include ARIA labels and keyboard navigation
7. **Color Contrast** - Ensure sufficient contrast for color-coded regions
8. **Tooltip Content** - Keep tooltips concise and informative
9. **Layer Management** - Use sublayers for additional detail instead of cluttering main layer
10. **Event Throttling** - Throttle expensive operations in zoom/pan events

---

## Troubleshooting

**Map not rendering:**
- Verify ScriptManager is added to layout
- Check that GeoJSON data is valid
- Ensure ViewBag data is properly deserialized
- Check browser console for JavaScript errors

**GeoJSON not loading:**
- Verify file path in Server.MapPath()
- Check that file is in App_Data folder
- Ensure JSON is properly formatted
- Check file permissions

**Data not binding to shapes:**
- Verify ShapeDataPath matches data property names
- Ensure ShapePropertyPath matches GeoJSON properties
- Check that data types match (string vs number)
- Confirm data source is not null

**Performance issues:**
- Simplify GeoJSON geometry
- Reduce number of markers/bubbles
- Use marker clustering for dense datasets
- Disable animations for large datasets
- Optimize data source size

---

## Resources

- **Component Demo:** https://ej2.syncfusion.com/aspnetmvc/Maps/Default
- **API Reference:** https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html
- **Documentation:** https://ej2.syncfusion.com/aspnetmvc/documentation/maps/getting-started
- **GeoJSON Data:** https://github.com/johan/world.geo.json
