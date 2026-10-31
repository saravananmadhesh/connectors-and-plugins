# Syncfusion EJ2 Maps - Complete API Reference

**Component:** Syncfusion Maps for ASP.NET Core  
**Namespace:** `Syncfusion.EJ2.Maps`  
**Assembly:** `Syncfusion.EJ2.dll`  
**Version:** 27.1.48+  
**Official Documentation:** https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.html

---

## Table of Contents

- [Maps Class API](#maps-class-api)
  - [Constructor](#constructor)
  - [Properties (63 Total)](#properties-63-total)
    - [Container & Display Properties](#container--display-properties)
    - [Positioning & View Properties](#positioning-view-properties)
    - [Styling & Theme Properties](#styling-theme-properties)
    - [Map Configuration Properties](#map-configuration-properties)
    - [UI Elements Configuration](#ui-elements-configuration)
    - [Export & Print Properties](#export--print-properties)
    - [Localization & Accessibility](#localization--accessibility)
    - [State Management](#state-management)
    - [Formatting Properties](#formatting-properties)
- [MapsLayer Configuration](#mapslayer-configuration)
  - [MapsLayer Properties](#mapslayer-properties)
    - [Data Source & Binding](#data-source--binding)
    - [Visualization Settings](#visualization-settings)
    - [Interaction Settings](#interaction-settings)
    - [Layer Control](#layer-control)
- [Data and Binding Classes](#data-and-binding-classes)
  - [MapsColorMapping](#mapscolormapping)
  - [MapsDataLabelSettings](#mapsdatalabelsettings)
  - [MapsMarker](#mapsmarker)
  - [MapsBubble](#mapsbubble)
  - [MapsNavigationLine](#mapsnavigationline)
- [Styling and Appearance Classes](#styling-and-appearance-classes)
  - [MapsZoomSettings](#mapszoomsettings)
  - [MapsShapeSettings](#mapsshapesettings)
  - [MapsLegendSettings](#mapslegendsettings)
  - [MapsTitleSettings](#mapstitlesettings)
  - [MapsTooltipSettings](#mapstooltipsettings)
  - [MapsAnnotation](#mapsannotation)
- [Events Reference](#events-reference)
  - [Rendering Lifecycle Events](#rendering-lifecycle-events)
  - [User Interaction Events](#user-interaction-events)
  - [Selection & Highlighting Events](#selection--highlighting-events)
  - [Marker Events](#marker-events)
  - [Bubble Events](#bubble-events)
  - [Legend & Tooltip Events](#legend--tooltip-events)
  - [Pan & Zoom Events](#pan--zoom-events)
  - [Other Events](#other-events)
- [Enumerations](#enumerations)
  - [ProjectionType](#projectiontype)
  - [MarkerType](#markertype)
  - [MapsTheme](#mapstheme)
  - [TooltipGesture](#tooltipgesture)
  - [LegendPosition](#legendposition)
  - [LegendType](#legendtype)
  - [LegendArrangement](#legendarrangement)
  - [LabelPosition](#labelposition)
  - [IntersectAction](#intersectaction)
  - [SmartLabelMode](#smartlabelmode)
  - [Alignment](#alignment)
  - [Type](#type)
- [Related Classes and Namespaces](#related-classes-and-namespaces)
  - [Core Supporting Classes](#core-supporting-classes)
  - [Shape & Interaction Classes](#shape--interaction-classes)
  - [Marker-Related Classes](#marker-related-classes)
  - [Area & Display Classes](#area--display-classes)
  - [Built-in Themes & Palettes](#built-in-themes--palettes)
- [Usage Patterns](#usage-patterns)
  - [Basic Map Configuration](#basic-map-configuration)
  - [Choropleth with Data Binding](#choropleth-with-data-binding)
  - [Markers with Tooltips](#markers-with-tooltips)
  - [Interactive Zoom and Pan](#interactive-zoom-and-pan)
- [Namespace Information](#namespace-information)
- [Additional Resources](#additional-resources)

---

## Maps Class API

**Primary component class for rendering interactive maps with SVG graphics support.**

**Namespace:** `Syncfusion.EJ2.Maps`  
**Inheritance:** EJTagHelper  
**[Full API Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html)**

### Constructor

```csharp
public Maps()
```

### Properties (63 Total)

#### Container & Display Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Width | string | null | Width of maps container (px, %, em) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Width) |
| Height | string | null | Height of maps container (px, %, em) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Height) |
| Background | string | null | Background color of map container | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Background) |
| TabIndex | double | 0 | Tab navigation index | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_TabIndex) |
| HtmlAttributes | object | - | Custom HTML attributes (title, data-*, etc.) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_HtmlAttributes) |

#### Positioning & View Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| CenterPosition | MapsCenterPosition | null | Map center coordinates (latitude, longitude) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_CenterPosition) |
| Margin | MapsMargin | null | Map margins (top, bottom, left, right) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Margin) |
| BaseLayerIndex | double | 0 | Index of base layer for visibility control | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_BaseLayerIndex) |

#### Styling & Theme Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Theme | MapsTheme | Material | Color theme (Material, Fabric, HighContrast, etc.) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Theme) |
| Border | MapsBorder | null | Border styling (width, color, opacity) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Border) |
| MapsArea | MapsMapsAreaSettings | null | Map area background and border settings | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_MapsArea) |

#### Map Configuration Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Layers | List<MapsLayer> | null | Collection of map layers (geometry, OSM, Bing Maps) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Layers) |
| ProjectionType | ProjectionType | Mercator | Map projection (Mercator, EquirectangularProjection, etc.) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_ProjectionType) |
| ZoomSettings | MapsZoomSettings | null | Zoom behavior and toolbar configuration | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_ZoomSettings) |

#### UI Elements Configuration

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| TitleSettings | MapsTitleSettings | null | Map title configuration (text, alignment, font) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_TitleSettings) |
| LegendSettings | MapsLegendSettings | null | Legend configuration (position, alignment, type) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_LegendSettings) |
| Annotations | List<MapsAnnotation> | null | Custom HTML/text overlays at coordinates | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Annotations) |
| TooltipDisplayMode | TooltipGesture | MouseMove | Tooltip trigger (MouseMove, Click, DoubleClick) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_TooltipDisplayMode) |

#### Export & Print Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| AllowImageExport | bool | false | Enable export to PNG, JPEG, SVG | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_AllowImageExport) |
| AllowPdfExport | bool | false | Enable export to PDF | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_AllowPdfExport) |
| AllowPrint | bool | false | Enable print functionality | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_AllowPrint) |

#### Localization & Accessibility

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Locale | string | "" | Language locale code for internationalization | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Locale) |
| Description | string | null | Accessibility description for screen readers | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Description) |
| Format | string | null | Format string for internationalized text | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Format) |
| EnableRtl | bool | false | Enable right-to-left rendering for RTL languages | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_EnableRtl) |

#### State Management

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| EnablePersistence | bool | false | Persist component state across page reloads | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_EnablePersistence) |

#### Formatting Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| UseGroupingSeparator | bool | false | Enable thousands separator in formatted numbers | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_UseGroupingSeparator) |

---

## MapsLayer Configuration

**Defines individual map layers supporting geometry data, map providers, and data visualization.**

**[Official API Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsLayer.html)**

### MapsLayer Properties

#### Data Source & Binding

| Property          | Type     | Default   | Description                                | API Link |
|-------------------|----------|-----------|--------------------------------------------|----------|
| DataSource        | object   | null      | Data to bind with shapes and elements      | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsLayer.html#Syncfusion_EJ2_Maps_MapsLayer_DataSource) |
| ShapeData         | object   | null      | GeoJSON or geometry data for shapes        | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsLayer.html#Syncfusion_EJ2_Maps_MapsLayer_ShapeData) |
| ShapeDataPath     | string   | "name"      | Data property path to match with shapes    | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsLayer.html#Syncfusion_EJ2_Maps_MapsLayer_ShapeDataPath) |
| ShapePropertyPath | object | null      | Shape property paths to match with data    | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsLayer.html#Syncfusion_EJ2_Maps_MapsLayer_ShapePropertyPath) |
| Type              | Type     | Layer     | Layer type (Layer, SubLayer)               | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsLayer.html#Syncfusion_EJ2_Maps_MapsLayer_Type) |

---

#### Visualization Settings

| Property              | Type                  | Default | Description                          | API Link |
|-----------------------|-----------------------|---------|--------------------------------------|----------|
| ShapeSettings         | MapsShapeSettings     | null    | Shape styling (fill, opacity, palette) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsLayer.html#Syncfusion_EJ2_Maps_MapsLayer_ShapeSettings) |
| MarkerSettings        | List<MapsMarker>      | null    | Marker visualization settings        | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsLayer.html#Syncfusion_EJ2_Maps_MapsLayer_MarkerSettings) |
| BubbleSettings        | List<MapsBubble>      | null    | Bubble visualization settings        | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsLayer.html#Syncfusion_EJ2_Maps_MapsLayer_BubbleSettings) |
| DataLabelSettings     | MapsDataLabelSettings | null    | Data label configuration             | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsLayer.html#Syncfusion_EJ2_Maps_MapsLayer_DataLabelSettings) |
| NavigationLineSettings| List<MapsNavigationLine> | null | Navigation line configuration        | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsLayer.html#Syncfusion_EJ2_Maps_MapsLayer_NavigationLineSettings) |

---

#### Interaction Settings

| Property          | Type                  | Default | Description                   | API Link |
|-------------------|-----------------------|---------|-------------------------------|----------|
| SelectionSettings | MapsSelectionSettings | null    | Shape selection on click      | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsLayer.html#Syncfusion_EJ2_Maps_MapsLayer_SelectionSettings) |
| HighlightSettings | MapsHighlightSettings | null    | Shape highlight on hover      | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsLayer.html#Syncfusion_EJ2_Maps_MapsLayer_HighlightSettings) |
| TooltipSettings   | MapsTooltipSettings   | null    | Tooltip configuration         | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsLayer.html#Syncfusion_EJ2_Maps_MapsLayer_TooltipSettings) |

---

#### Layer Control

| Property | Type | Default | Description          | API Link |
|----------|------|---------|----------------------|----------|
| Visible  | bool | true    | Show or hide layer   | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsLayer.html#Syncfusion_EJ2_Maps_MapsLayer_Visible) |

---

## Data and Binding Classes

### MapsColorMapping

Defines color mapping rules for data-driven visualization.

**[Official API Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsColorMapping.html)**

```csharp
public class MapsColorMapping
{
    public double From { get; set; }           // Minimum range value
    public double To { get; set; }             // Maximum range value
    public object Color { get; set; }          // Color to apply
    public string Value { get; set; }          // Specific value to match
    public string Label { get; set; }          // Legend label
    public double? MinOpacity { get; set; }    // Min opacity for desaturation
    public double? MaxOpacity { get; set; }    // Max opacity for desaturation
}
```

**Usage Types:**
- **Equality**: Match specific values with colors
- **Range**: Apply colors to value ranges (min-max)
- **Desaturation**: Gradient opacity based on values

### MapsDataLabelSettings

Configures labels displayed on shapes.

**[Official API Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsDataLabelSettings.html)**

```csharp
public class MapsDataLabelSettings
{
    public bool Visible { get; set; }                    // Show/hide labels
    public string LabelPath { get; set; }                // Data property for label text
    public string Fill { get; set; }                     // Label background color
    public double Rx { get; set; }                       // Gets or sets the x position for the data labels
    public double Ry { get; set; }                       // Gets or sets the y position for the data labels in maps
    public MapsFont TextStyle { get; set; }              // Label font styling
    public IntersectAction IntersectAction { get; set; } // Handle overlapping labels
    public SmartLabelMode SmartLabelMode { get; set; }   // Smart label mode
    public MapsBorder Border { get; set; }              // Border color
    public double AnimationDuration { get; set; }          // Animation duration
}
```

### MapsMarker

Defines point markers on the map.

**[Official API Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsMarker.html)**

```csharp
public class MapsMarker
{
    public object DataSource { get; set; }                    // Marker data
    public string LatitudeValuePath { get; set; }                      // Latitude coordinate
    public string LongitudeValuePath { get; set; }                     // Longitude coordinate
    public MarkerType Shape { get; set; }                     // Marker shape
    public double Width { get; set; }                         // Marker width
    public double Height { get; set; }                        // Marker height
    public string Fill { get; set; }                          // Fill color
    public string ImageUrl { get; set; }                      // Image URL for image markers
    public MapsBorder Border { get; set; }                        // Border styling
    public bool EnableDrag { get; set; }                       // Enable drag
    public object ClusterSettings { get; set; }                // Clustering config
    public MapsTooltipSettings TooltipSettings { get; set; }  // Tooltip config
}
```

### MapsBubble

Configures bubble visualization.

**[Official API Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsBubble.html)**

```csharp
public class MapsBubble
{
    public object DataSource { get; set; }                  // Bubble data
    public string ColorValuePath { get; set; }              // Property for color
    public string ValuePath { get; set; }                   // Property for size
    public double MinRadius { get; set; }                   // Minimum bubble radius
    public double MaxRadius { get; set; }                   // Maximum bubble radius
    public double Opacity { get; set; }                     // Opacity (0-1)
    public List<MapsColorMapping> ColorMapping { get; set; } // Color mapping rules
}
```

### MapsNavigationLine

Defines navigation lines connecting locations.

**[Official API Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsNavigationLine.html)**

```csharp
public class MapsNavigationLine
{
    public double[] Latitude { get; set; }              // Start latitude
    public double[] Longitude { get; set; }             // Start longitude
    public string Stroke { get; set; }                  // Line color
    public double StrokeWidth { get; set; }             // Line width
    public MapsArrow ArrowSettings { get; set; }        // Arrow configuration
    public bool Visible { get; set; }                   // Show/hide line
    public MapsSelectionSettings SelectionSettings { get; set; }  // selection settings of the navigation line
    public MapsHighlightSettings HighlightSettings { get; set; }  // highlight settings of the navigation line
}
```

---

## Styling and Appearance Classes

### MapsZoomSettings

Controls zoom behavior and toolbar.

**[Official API Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsZoomSettings.html)**

```csharp
public class MapsZoomSettings
{
    public bool Enable { get; set; }                    // Enable zoom
    public double ZoomFactor { get; set; }              // Zoom increment factor
    public double MinZoom { get; set; }                 // Minimum zoom level
    public double MaxZoom { get; set; }                 // Maximum zoom level
    public bool MouseWheelZoom { get; set; }            // Mouse wheel zoom
    public bool PinchZooming { get; set; }              // Touch pinch zoom
    public bool EnableSelectionZooming { get; set; }    // Draw-to-zoom
    public bool DoubleClickZoom { get; set; }           // Double tap zoom
    public object ToolbarSettings { get; set; }         // Toolbar buttons
}
```

### MapsShapeSettings

Configures shape styling and appearance.

**[Official API Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsShapeSettings.html)**

```csharp
public class MapsShapeSettings
{
    public string Fill { get; set; }                                  // Shape fill color
    public double Opacity { get; set; }                               // Opacity (0-1)
    public string BorderWidthValuePath { get; set; }                  // Border width
    public string BorderColorValuePath { get; set; }                  // Border color
    public string DashArray { get; set; }                             // Dash pattern
    public string[] Palette { get; set; }                             // Color palette
    public string ColorValuePath { get; set; }                        // Property for coloring
    public List<MapsColorMapping> ColorMapping { get; set; }          // Color mapping
}
```

### MapsLegendSettings

Configures legend display.

**[Official API Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsLegendSettings.html)**

```csharp
public class MapsLegendSettings
{
    public bool Visible { get; set; }                   // Show/hide legend
    public LegendType Type { get; set; }                // Legend type
    public LegendPosition Position { get; set; }        // Legend position
    public Alignment Alignment { get; set; }            // Horizontal/Vertical
    public string Height { get; set; }                  // Legend height
    public string Width { get; set; }                   // Legend width
    public LegendMode Mode { get; set; }                // Interactive mode
    public MapsFont TextStyle { get; set; }             // Text styling
    public MapsCommonTitleSettings Title { get; set; }  // Legend title
    public MapsFont TitleStyle { get; set; }            // Title styling
}
```

### MapsTitleSettings

Configures map title.

**[Official API Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsTitleSettings.html)**

```csharp
public class MapsTitleSettings
{
    public string Text { get; set; }                    // Title text
    public Alignment Alignment { get; set; }            // Text alignment
    public string Description { get; set; }             // Title description
    public MapsFont TextStyle { get; set; }             // Font styling
    public MapsSubTitleSettings SubTitleSettings { get; set; } // Subtitle
}
```

### MapsTooltipSettings

Configures tooltip display.

**[Official API Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsTooltipSettings.html)**

```csharp
public class MapsTooltipSettings
{
    public bool Visible { get; set; }                   // Show/hide tooltip
    public string ValuePath { get; set; }               // Data property for tooltip
    public string Template { get; set; }                // HTML template
    public MapsFont TextStyle { get; set; }             // Font styling
    public MapsBorder Border { get; set; }              // Border color
    public string Fill { get; set; }                    // Background color
}
```

### MapsAnnotation

Defines custom HTML overlays on map.

**[Official API Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsAnnotation.html)**

```csharp
public class MapsAnnotation
{
    public string Y { get; set; }                       // y position of the annotation in pixel or percentage
    public string X { get; set; }                       // x position of the annotation in pixel or percentage
    public string Content { get; set; }                 // HTML content
    public AnnotationAlignment VerticalAlignment { get; set; } // Vertical align
    public AnnotationAlignment HorizontalAlignment { get; set; } // Horizontal align
    public string ZIndex { get; set; }                  // Z-index for layering
}
```

---

## Events Reference

**All Maps events pass event argument objects with context-specific data.**

### Rendering Lifecycle Events

| Event              | Handler Signature                        | Description                        | API Link |
|--------------------|------------------------------------------|------------------------------------|----------|
| Load               | void(ILoadEventArgs args)                | Before maps initialization         | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Load) |
| Loaded             | void(ILoadedEventArgs args)              | After maps initialization complete | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Loaded) |
| LayerRendering     | void(ILayerRenderingEventArgs args)      | Before each layer renders          | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_LayerRendering) |
| ShapeRendering     | void(IShapeRenderingEventArgs args)      | Before shape element renders       | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_ShapeRendering) |
| DataLabelRendering | void(IDataLabelRenderingEventArgs args)  | Before data label renders          | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_DataLabelRendering) |
| MarkerRendering    | void(IMarkerRenderingEventArgs args)     | Before marker renders              | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_MarkerRendering) |
| BubbleRendering    | void(IBubbleRenderingEventArgs args)     | Before bubble renders              | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_BubbleRendering) |
| AnnotationRendering| void(IAnnotationRenderingEventArgs args) | Before annotation renders          | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_AnnotationRendering) |

### User Interaction Events

| Event       | Handler Signature                  | Description                     | API Link |
|-------------|------------------------------------|---------------------------------|----------|
| Click       | void(IClickEventArgs args)         | When clicking map element       | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Click) |
| DoubleClick | void(IDoubleClickEventArgs args)   | When double-clicking element    | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_DoubleClick) |
| RightClick  | void(IRightClickEventArgs args)    | When right-clicking element     | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_RightClick) |
| MouseMove   | void(IMouseMoveEventArgs args)     | When moving mouse over map      | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_MouseMove) |

### Selection & Highlighting Events

| Event          | Handler Signature                      | Description                          | API Link |
|----------------|----------------------------------------|--------------------------------------|----------|
| ItemSelection  | void(IItemSelectionEventArgs args)     | Before shape/marker/bubble selected  | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_ItemSelection) |
| ShapeSelected  | void(IShapeSelectedEventArgs args)     | After shape selected                 | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_ShapeSelected) |
| ItemHighlight  | void(IItemHighlightEventArgs args)     | Before highlighting element          | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_ItemHighlight) |
| ShapeHighlight | void(IShapeHighlightEventArgs args)    | Before shape highlight               | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_ShapeHighlight) |

### Marker Events

| Event                  | Handler Signature                        | Description                | API Link |
|-------------------------|------------------------------------------|----------------------------|----------|
| MarkerClick             | void(IMarkerClickEventArgs args)         | When clicking marker       | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_MarkerClick) |
| MarkerMouseMove         | void(IMarkerMouseMoveEventArgs args)     | When hovering marker       | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_MarkerMouseMove) |
| MarkerDragStart         | void(IMarkerDragStartEventArgs args)     | When starting marker drag  | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_MarkerDragStart) |
| MarkerDragEnd           | void(IMarkerDragEndEventArgs args)       | When ending marker drag    | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_MarkerDragEnd) |
| MarkerClusterClick      | void(IMarkerClusterClickEventArgs args)  | When clicking cluster      | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_MarkerClusterClick) |
| MarkerClusterMouseMove  | void(IMarkerClusterMouseMoveEventArgs args) | When hovering cluster   | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_MarkerClusterMouseMove) |
| MarkerClusterRendering  | void(IMarkerClusterRenderingEventArgs args) | Before cluster renders   | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_MarkerClusterRendering) |

### Bubble Events

| Event          | Handler Signature                  | Description           | API Link |
|----------------|------------------------------------|-----------------------|----------|
| BubbleClick    | void(IBubbleClickEventArgs args)   | When clicking bubble  | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_BubbleClick) |
| BubbleMouseMove| void(IBubbleMouseMoveEventArgs args)| When hovering bubble | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_BubbleMouseMove) |

### Legend & Tooltip Events

| Event                | Handler Signature                          | Description              | API Link |
|-----------------------|--------------------------------------------|--------------------------|----------|
| LegendRendering       | void(ILegendRenderingEventArgs args)       | Before legend renders    | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_LegendRendering) |
| TooltipRender         | void(ITooltipRenderEventArgs args)         | Before tooltip renders   | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_TooltipRender) |
| TooltipRenderComplete | void(ITooltipRenderCompleteEventArgs args) | After tooltip renders    | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_TooltipRenderComplete)

### Pan & Zoom Events

| Event        | Handler Signature              | Description                | API Link |
|--------------|--------------------------------|----------------------------|----------|
| Pan          | void(IPanEventArgs args)       | Before panning operation   | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Pan) |
| PanComplete  | void(IPanCompleteEventArgs args)| After panning completes   | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_PanComplete) |
| Zoom         | void(IZoomEventArgs args)      | Before zoom operation      | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Zoom) |
| ZoomComplete | void(IZoomCompleteEventArgs args)| After zoom completes     | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_ZoomComplete) |

### Other Events

| Event             | Handler Signature                        | Description                  | API Link |
|-------------------|------------------------------------------|------------------------------|----------|
| BeforePrint       | void(IBeforePrintEventArgs args)         | Before printing maps         | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_BeforePrint) |
| Resize            | void(IResizeEventArgs args)              | When window resizes          | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Resize) |
| AnimationComplete | void(IAnimationCompleteEventArgs args)   | After animation completes    | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_AnimationComplete) |

---

## Enumerations

### ProjectionType

Map projection types for different geographical representations.

```csharp
public enum ProjectionType
{
    Mercator,                    // Web Mercator (default)
    Equirectangular,             // Plate Carée
    Miller,                       // Miller cylindrical
    Eckert3,               
    Eckert5,  
    Eckert6,  
    Winkel3,
    AitOff             
}
```

### MarkerType

Available marker shapes.

```csharp
public enum MarkerType
{
    Circle,     // Circular marker
    Rectangle,  // Rectangular marker
    Triangle,   // Triangular marker
    Diamond,    // Diamond-shaped marker
    Image,      // Custom image
    HorizontalLine,     // HorizontalLine marker
    Cross        // Cross marker
}
```

### MapsTheme

Predefined theme styles.

```csharp
public enum MapsTheme
{
    Material,           // Material Design
    Fabric,             // Fabric Design
    HighContrast,       // High Contrast
    BootstrapDark,      // Bootstrap Dark
    BootstrapLight,     // Bootstrap Light
    TailwindDark,       // Tailwind Dark
    TailwindLight       // Tailwind Light
}
```

### TooltipGesture

Tooltip display trigger modes.

```csharp
public enum TooltipGesture
{
    MouseMove,    // Display on mouse move
    Click,        // Display on click
    DoubleClick   // Display on double click
}
```

### LegendPosition

Legend positioning options.

```csharp
public enum LegendPosition
{
    Top,
    Bottom,
    Left,
    Right,
    Float
}
```

### LegendType

Legend data source types.

```csharp
public enum LegendType
{
    Layers,   // Legend for layers
    Markers,  // Legend for markers
    Bubbles   // Legend for bubbles
}
```

### LegendArrangement

Legend arrangement direction.

```csharp
public enum LegendArrangement
{
    Horizontal,  // Horizontal layout
    Vertical,    // Vertical layout
    None
}
```

### LabelPosition

Data label positioning on shapes.

```csharp
public enum LabelPosition
{
    After,
    Before
}
```

### IntersectAction

Action when data labels intersect.

```csharp
public enum IntersectAction
{
    None,   // No action
    Trim,   // Trim overlapping text
    Hide    // Hide overlapping labels
}
```

### SmartLabelMode

Smart label handling mode.

```csharp
public enum SmartLabelMode
{
    None,   // No smart labeling
    Trim,   // Trim long labels
    Hide    // Hide labels that exceed bounds
}
```

### Alignment

Text alignment options.

```csharp
public enum Alignment
{
    Center,
    Near,
    Far
}
```

### Type

Layer type designation.

```csharp
public enum Type
{
    Layer,      // Base layer
    SubLayer    // Overlay layer
}
```

---

## Related Classes and Namespaces

### Core Supporting Classes

| Class | Namespace | Purpose | API Link |
|-------|-----------|---------|----------|
| MapsMargin | Syncfusion.EJ2.Maps | Margin configuration (top, bottom, left, right) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsMargin.html) |
| MapsBorder | Syncfusion.EJ2.Maps | Border styling (width, color, opacity) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsBorder.html) |
| MapsFont | Syncfusion.EJ2.Maps | Font configuration (family, size, weight, color) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsFont.html) |
| MapsCenterPosition | Syncfusion.EJ2.Maps | Center coordinates (latitude, longitude) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsCenterPosition.html) |

### Shape & Interaction Classes

| Class | Namespace | Purpose | API Link |
|-------|-----------|---------|----------|
| MapsSelectionSettings | Syncfusion.EJ2.Maps | Selection behavior on shapes | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsSelectionSettings.html) |
| MapsHighlightSettings | Syncfusion.EJ2.Maps | Hover highlight behavior | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsHighlightSettings.html) |
| MapsArrow | Syncfusion.EJ2.Maps | Arrow configuration for navigation lines | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsArrow.html) |
| MapsButtonSettings | Syncfusion.EJ2.Maps | Zoom toolbar button styling | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsButtonSettings.html) |

### Marker-Related Classes

| Class | Namespace | Purpose | API Link |
|-------|-----------|---------|----------|
| MapsMarkerClusterSettings | Syncfusion.EJ2.Maps | Marker clustering configuration | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsMarkerClusterSettings.html) |
| MapsInitialShapeSelection | Syncfusion.EJ2.Maps | Pre-select shapes on load | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsInitialShapeSelection.html) |

### Area & Display Classes

| Class | Namespace | Purpose | API Link |
|-------|-----------|---------|----------|
| MapsMapsAreaSettings | Syncfusion.EJ2.Maps | Map area styling (background, border) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsMapsAreaSettings.html) |
| MapsSubTitleSettings | Syncfusion.EJ2.Maps | Subtitle configuration | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.MapsSubTitleSettings.html) |

### Built-in Themes & Palettes

**Theme Colors:**
- Material (Default)
- Fabric
- HighContrast
- Bootstrap (Light/Dark)
- Tailwind (Light/Dark)

**Color Palettes:**
- Material (Default)
- Fluent
- Bootstrap
- Tailwind
- Custom arrays

---

## Usage Patterns

### Basic Map Configuration

```cshtml
<ejs-maps id="maps">
    <e-maps-layers>
        <e-maps-layer shapeData="@worldMapData">
            <e-layersettings-shapesettings fill="#E5E5E5"></e-layersettings-shapesettings>
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

### Choropleth with Data Binding

```cshtml
var colorMapping = new List<MapsColorMapping> {
    new MapsColorMapping { From = 0, To = 100, Color = "#F0E68C" },
    new MapsColorMapping { From = 100, To = 500, Color = "#CD853F" }
};

<e-maps-layer dataSource="@dataSource" shapeDataPath="Country">
    <e-layersettings-shapesettings colorValuePath="Value" colorMapping="@colorMapping">
    </e-layersettings-shapesettings>
</e-maps-layer>
```

### Markers with Tooltips

```cshtml
<e-layersettings-markers>
    <e-layersettings-marker dataSource="@cities" shape="Circle">
        <e-layersettings-markersetting-tooltipsettings visible="true" valuePath="Name">
        </e-layersettings-markersetting-tooltipsettings>
    </e-layersettings-marker>
</e-layersettings-markers>
```

### Interactive Zoom and Pan

```cshtml
<e-maps-zoomsettings enable="true" 
                     MouseWheelZoom="true" 
                     PinchZooming="true"
                     toolbars='new string[] {"Zoom", "ZoomIn", "ZoomOut", "Pan"}'>
</e-maps-zoomsettings>
```

---

## Namespace Information

**Primary Namespace:** `Syncfusion.EJ2.Maps`  
**Assembly:** `Syncfusion.EJ2.dll`  
**Version:** 27.1.48+  
**Supported .NET Versions:** 3.1, 5.0, 6.0, 7.0, 8.0

---

## Additional Resources

- **Official Documentation:** https://ej2.syncfusion.com/aspnetcore/documentation/maps/getting-started
- **API Reference (Complete):** https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Maps.html
- **Getting Started:** https://ej2.syncfusion.com/aspnetcore/documentation/maps/getting-started

