# Maps API Reference

**Component:** Syncfusion.EJ2.Maps  
**Class:** Maps  
**Namespace:** Syncfusion.EJ2.Maps  
**Assembly:** Syncfusion.EJ2.dll  
**Official API Reference:** [Maps Class](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html)

---

## Table of Contents

- [Maps Class API](#maps-class-api)
  - [Constructor](#constructor)
    - [Maps()](#maps)
- [Properties by Category](#properties-by-category)
  - [Container & Display Properties](#container--display-properties)
  - [Positioning & Layout Properties](#positioning--layout-properties)
  - [Styling & Theme Properties](#styling--theme-properties)
  - [Data & Layer Properties](#data--layer-properties)
  - [Legend & Annotation Properties](#legend--annotation-properties)
  - [Zoom & Pan Properties](#zoom--pan-properties)
  - [Selection & Interaction Properties](#selection--interaction-properties)
  - [Export & Print Properties](#export--print-properties)
  - [Localization & Accessibility Properties](#localization--accessibility-properties)
  - [Tooltip & Display Properties](#tooltip--display-properties)
  - [State Management & Advanced Properties](#state-management--advanced-properties)
- [Events by Category](#events-by-category)
  - [Lifecycle Events](#lifecycle-events)
  - [Layer & Shape Events](#layer--shape-events)
  - [Marker & Bubble Events](#marker--bubble-events)
  - [Legend & Annotation Events](#legend--annotation-events)
  - [Mouse & Pointer Events](#mouse--pointer-events)
  - [Zoom & Pan Events](#zoom--pan-events)
  - [Tooltip & Print Events](#tooltip--print-events)
- [Related Classes](#related-classes)
  - [MapsLayer](#mapslayer)
  - [MapsMarker](#mapsmarker)
  - [MapsBubble](#mapsbubble)
  - [MapsDataLabelSettings](#mapsdatalabelsettings)
  - [MapsShapeSettings](#mapsshapesettings)
  - [MapsLegendSettings](#mapslegendsettings)
  - [MapsZoomSettings](#mapszoomsettings)
  - [MapsAnnotation](#mapsannotation)
  - [MapsColorMapping](#mapscolormapping)
  - [MapsCenterPosition](#mapscenterposition)
  - [MapsMargin](#mapsmargin)
  - [MapsBorder](#mapsborder)
  - [MapsTitleSettings](#mapstitlesettings)
  - [MapsNavigationLine](#mapsnavigationline)
- [Common Usage Patterns](#common-usage-patterns)
  - [Pattern 1: Basic Choropleth Map with Color Mapping](#pattern-1-basic-choropleth-map-with-color-mapping)
  - [Pattern 2: Adding Markers to Locations](#pattern-2-adding-markers-to-locations)
  - [Pattern 3: Interactive Map with Zoom and Pan](#pattern-3-interactive-map-with-zoom-and-pan)
  - [Pattern 4: Bing Maps Provider](#pattern-4-bing-maps-provider)
  - [Pattern 5: OpenStreetMap Provider](#pattern-5-openstreetmap-provider)
  - [Pattern 6: Map with Annotations](#pattern-6-map-with-annotations)
- [Resources](#resources)
  - [Official Documentation](#official-documentation)
  - [External Resources](#external-resources)

---

## Maps Class API

### Constructor

#### Maps()

Creates a new instance of the Maps component.

**Declaration:**

```csharp
public Maps()
```

**Usage Example:**

```csharp
@Html.EJS().Maps("mapContainer").Render()
```

---

## Properties by Category

### Container & Display Properties

Manage the physical dimensions and HTML container of the map.

| Property | Type | Default | Description | API Reference |
|----------|------|---------|-------------|----------------|
| **Width** | `string` | `null` | Map width (px, %, or em) | [Width](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Width) |
| **Height** | `string` | `null` | Map height (px, %, or em) | [Height](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Height) |
| **Background** | `string` | `null` | Background color of the map container | [Background](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Background) |
| **HtmlAttributes** | `object` | - | Additional HTML attributes in key-value format | [HtmlAttributes](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_HtmlAttributes) |

---

### Positioning & Layout Properties

Control map positioning, centering, and geographical center point.

| Property | Type | Default | Description | API Reference |
|----------|------|---------|-------------|----------------|
| **CenterPosition** | [MapsCenterPosition](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_CenterPosition) | `null` | Center position using latitude and longitude | [CenterPosition](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_CenterPosition) |
| **Margin** | [MapsMargin](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.MapsMargin.html) | `null` | Margin customization for the map container | [Margin](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Margin) |
| **MapsArea** | [MapsMapsAreaSettings](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.MapsMapsAreaSettings.html) | `null` | Customize the area around the map | [MapsArea](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_MapsArea) |
| **TabIndex** | `double` | `0` | Tab index value for accessibility | [TabIndex](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_TabIndex) |

---

### Styling & Theme Properties

Apply visual themes and customize overall appearance.

| Property | Type | Default | Description | API Reference |
|----------|------|---------|-------------|----------------|
| **Theme** | [MapsTheme](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.MapsTheme.html) | `Material` | Theme style (Material, Bootstrap, Fluent, Tailwind, etc.) | [Theme](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Theme) |
| **Border** | [MapsBorder](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.MapsBorder.html) | `null` | Border customization for the map container | [Border](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Border) |

**Theme Options:**
- `MapsTheme.Material` - Default Material Design theme
- `MapsTheme.MaterialDark` - Material dark variant
- `MapsTheme.Bootstrap4` - Bootstrap 4 theme
- `MapsTheme.Bootstrap5` - Bootstrap 5 theme
- `MapsTheme.Fluent` - Fluent UI theme
- `MapsTheme.TailwindDark` - Tailwind CSS dark theme

---

### Data & Layer Properties

Configure map layers, GeoJSON data, and data binding.

| Property | Type | Default | Description | API Reference |
|----------|------|---------|-------------|----------------|
| **Layers** | [List<MapsLayer>](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.MapsLayer.html) | `null` | Collection of layers (main and sublayers) | [Layers](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Layers) |
| **BaseLayerIndex** | `double` | `0` | Index of the base layer to be visible first | [BaseLayerIndex](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_BaseLayerIndex) |
| **ProjectionType** | [ProjectionType](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.ProjectionType.html) | `Mercator` | Map projection type (Mercator, Equirectangular, Miller, etc.) | [ProjectionType](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_ProjectionType) |

**Projection Types:**
- `ProjectionType.Mercator` - Standard Web Mercator projection (default)
- `ProjectionType.Equirectangular` - Equirectangular/Plate Carrée projection
- `ProjectionType.Miller` - Miller cylindrical projection
- `ProjectionType.AitOff` - Modified azimuthal compromise projection with an elliptical outline
- `ProjectionType.Eckert3` - Compromise pseudocylindrical projection for world maps
- `ProjectionType.Eckert5` - Compromise pseudocylindrical projection
- `ProjectionType.Eckert6` - Equal‑area pseudocylindrical projection
- `ProjectionType.Winkel3` -  Winkel Tripel (Winkel III), a compromise modified azimuthal projection

---

### Legend & Annotation Properties

Control legend visibility and annotation configuration.

| Property | Type | Default | Description | API Reference |
|----------|------|---------|-------------|----------------|
| **LegendSettings** | `MapsLegendSettings` | `null` | Customize the legend (visibility, positioning, mode) | [LegendSettings](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_LegendSettings) |
| **Annotations** | `List<MapsAnnotation>` | `null` | Custom HTML overlays at specific coordinates | [Annotations](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Annotations) |

---

### Zoom & Pan Properties

Configure zooming, panning, and navigation controls.

| Property | Type | Default | Description | API Reference |
|----------|------|---------|-------------|----------------|
| **ZoomSettings** | `MapsZoomSettings` | `null` | Configure zoom operations (enable, factor, limits) | [ZoomSettings](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.MapsZoomSettings.html) |
| **TooltipDisplayMode** | `TooltipGesture` | `MouseMove` | Tooltip display mode (MouseMove, Click, DoubleClick) | [TooltipDisplayMode](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_TooltipDisplayMode) |

**Tooltip Gesture Options:**
- `TooltipGesture.MouseMove` - Display on mouse hover (default)
- `TooltipGesture.Click` - Display on element click
- `TooltipGesture.DoubleClick` - Display on element double click

---

### Selection & Interaction Properties

Configure shape and element selection behavior.

| Property | Type | Default | Description | API Reference |
|----------|------|---------|-------------|----------------|
| **Description** | `string` | `null` | Description for assistive technology (accessibility) | [Description](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Description) |
| **UseGroupingSeparator** | `bool` | `false` | Enable/disable separator for grouping numbers | [UseGroupingSeparator](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_UseGroupingSeparator) |

---

### Export & Print Properties

Control export and print functionality.

| Property | Type | Default | Description | API Reference |
|----------|------|---------|-------------|----------------|
| **AllowImageExport** | `bool` | `false` | Enable/disable export to image (PNG, JPEG) | [AllowImageExport](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_AllowImageExport) |
| **AllowPdfExport** | `bool` | `false` | Enable/disable export to PDF | [AllowPdfExport](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_AllowPdfExport) |
| **AllowPrint** | `bool` | `false` | Enable/disable print functionality | [AllowPrint](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_AllowPrint) |

---

### Localization & Accessibility Properties

Support for internationalization, localization, and accessibility.

| Property | Type | Default | Description | API Reference |
|----------|------|---------|-------------|----------------|
| **Locale** | `string` | `""` | Override culture and localization value | [Locale](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Locale) |
| **EnableRtl** | `bool` | `false` | Render component in right-to-left direction | [EnableRtl](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_EnableRtl) |
| **Format** | `string` | `null` | Apply internationalization format for map text | [Format](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Format) |

**Common Locale Values:**
- `"en-US"` - English (US)
- `"ar-AE"` - Arabic
- `"de-DE"` - German
- `"es-ES"` - Spanish
- `"fr-FR"` - French
- `"ja-JP"` - Japanese
- `"zh-CN"` - Chinese (Simplified)

---

### Tooltip & Display Properties

Configure tooltip display and content.

| Property | Type | Default | Description | API Reference |
|----------|------|---------|-------------|----------------|
| **TooltipRender** | `string` | `null` | Event triggered before tooltip renders | [TooltipRender](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_TooltipRender) |
| **TooltipRenderComplete** | `string` | `null` | Event triggered after tooltip renders | [TooltipRenderComplete](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_TooltipRenderComplete) |

---

### State Management & Advanced Properties

Control component state persistence and other advanced features.

| Property | Type | Default | Description | API Reference |
|----------|------|---------|-------------|----------------|
| **EnablePersistence** | `bool` | `false` | Enable component state persistence across reloads | [EnablePersistence](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_EnablePersistence) |
| **TitleSettings** | `MapsTitleSettings` | `null` | Customize the title of the map | [TitleSettings](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_TitleSettings) |

---

## Events by Category

### Lifecycle Events

Events related to component initialization and lifecycle.

| Event | Description | API Reference |
|-------|-------------|---------------|
| **Load** | Triggers before the maps gets rendered | [Load](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Load) |
| **Loaded** | Triggers after the maps gets rendered | [Loaded](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Loaded) |
| **Resize** | Notifies when map window/container is resized | [Resize](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Resize) |
| **AnimationComplete** | Triggers after animation completes | [AnimationComplete](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_AnimationComplete) |

---

### Layer & Shape Events

Events related to layer rendering and shape interactions.

| Event | Description | API Reference |
|-------|-------------|---------------|
| **LayerRendering** | Triggers before the layer gets rendered | [LayerRendering](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_LayerRendering) |
| **ShapeRendering** | Triggers before the shape gets rendered | [ShapeRendering](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_ShapeRendering) |
| **ShapeHighlight** | Triggers before shape gets highlighted | [ShapeHighlight](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_ShapeHighlight) |
| **ShapeSelected** | Triggers when a shape is selected | [ShapeSelected](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_ShapeSelected) |
| **DataLabelRendering** | Triggers before data-label gets rendered | [DataLabelRendering](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_DataLabelRendering) |

---

### Marker & Bubble Events

Events related to markers, marker clusters, and bubbles.

| Event | Description | API Reference |
|-------|-------------|---------------|
| **MarkerClick** | Triggers when clicking on a marker | [MarkerClick](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_MarkerClick) |
| **MarkerRendering** | Triggers before marker gets rendered | [MarkerRendering](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_MarkerRendering) |
| **MarkerMouseMove** | Triggers when moving mouse over marker | [MarkerMouseMove](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_MarkerMouseMove) |
| **MarkerDragStart** | Triggers when marker begins dragging | [MarkerDragStart](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_MarkerDragStart) |
| **MarkerDragEnd** | Triggers when marker stops dragging | [MarkerDragEnd](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_MarkerDragEnd) |
| **MarkerClusterClick** | Triggers when clicking marker cluster | [MarkerClusterClick](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_MarkerClusterClick) |
| **MarkerClusterMouseMove** | Triggers when moving mouse over cluster | [MarkerClusterMouseMove](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_MarkerClusterMouseMove) |
| **MarkerClusterRendering** | Triggers before marker cluster gets rendered | [MarkerClusterRendering](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_MarkerClusterRendering) |
| **BubbleRendering** | Triggers before bubble element gets rendered | [BubbleRendering](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_BubbleRendering) |
| **BubbleClick** | Triggers when clicking bubble element | [BubbleClick](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_BubbleClick) |
| **BubbleMouseMove** | Triggers when hovering over bubble element | [BubbleMouseMove](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_BubbleMouseMove) |

---

### Legend & Annotation Events

Events related to legend and annotation rendering.

| Event | Description | API Reference |
|-------|-------------|---------------|
| **LegendRendering** | Triggers before the legend gets rendered | [LegendRendering](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_LegendRendering) |
| **AnnotationRendering** | Triggers before annotation gets rendered | [AnnotationRendering](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_AnnotationRendering) |

---

### Mouse & Pointer Events

Events related to mouse and pointer interactions.

| Event | Description | API Reference |
|-------|-------------|---------------|
| **Click** | Triggers when user clicks on element | [Click](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Click) |
| **Onclick** | Triggers when a user clicks on an element in Maps | [Onclick](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Onclick) |
| **DoubleClick** | Triggers on double click operation | [DoubleClick](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_DoubleClick) |
| **RightClick** | Triggers on right click operation | [RightClick](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_RightClick) |
| **MouseMove** | Triggers when mouse pointer moves over map | [MouseMove](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_MouseMove) |
| **ItemSelection** | Triggers before shape/bubble/marker gets selected | [ItemSelection](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_ItemSelection) |
| **ItemHighlight** | Triggers before shape/bubble/marker gets highlighted | [ItemHighlight](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_ItemHighlight) |

---

### Zoom & Pan Events

Events related to zoom and pan operations.

| Event | Description | API Reference |
|-------|-------------|------------|---------------|
| **Zoom** | Triggers before zoom in/out operations | [Zoom](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Zoom) |
| **ZoomComplete** | Triggers after zooming operation completes | [ZoomComplete](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_ZoomComplete) |
| **Pan** | Triggers before panning operation | [Pan](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_Pan) |
| **PanComplete** | Triggers after panning action completes | [PanComplete](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_PanComplete) |

---

### Tooltip & Print Events

Events related to tooltips and printing.

| Event | Description | API Reference |
|-------|-------------|---------------|
| **TooltipRender** | Triggers before tooltip gets rendered | [TooltipRender](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_TooltipRender) |
| **TooltipRenderComplete** | Triggers after tooltip gets rendered | [TooltipRenderComplete](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_TooltipRenderComplete) |
| **BeforePrint** | Triggers before the print gets started | [BeforePrint](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html#Syncfusion_EJ2_Maps_Maps_BeforePrint) |

---

## Related Classes

### MapsLayer

Represents a single layer in the Maps component.

**Key Properties:**
- `ShapeData` - GeoJSON data for shapes
- `DataSource` - Data to bind to shapes
- `ShapeDataPath` - Property in data matching shapes
- `ShapePropertyPath` - Property in GeoJSON to match
- `Type` - Layer type (Geometry, OSM, Bing, etc.)
- `UrlTemplate` - URL template for tile layers
- `Visible` - Layer visibility

**API Reference:** [MapsLayer Class](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.MapsLayer.html)

---

### MapsMarker

Configures marker appearance, positioning, and behavior.

**Key Properties:**
- `Visible` - Enable/disable markers
- `Shape` - Marker shape (Circle, Image, Triangle, Diamond, Cross, Rectangle)
- `DataSource` - Marker location data
- `Fill` - Marker fill color
- `Width` - Marker width in pixels
- `Height` - Marker height in pixels
- `TooltipSettings` - Tooltip configuration for markers

**API Reference:** [MapsMarker Class](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.MapsMarker.html)

---

### MapsBubble

Configures bubble visualization for quantitative data.

**Key Properties:**
- `Visible` - Enable/disable bubbles
- `DataSource` - Bubble data source
- `MinRadius` - Minimum bubble radius in pixels
- `MaxRadius` - Maximum bubble radius in pixels
- `ColorMapping` - Bubble color mapping configuration
- `TooltipSettings` - Tooltip configuration for bubbles

**API Reference:** [MapsBubble Class](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.MapsBubble.html)

---

### MapsDataLabelSettings

Configures data labels displayed on shapes.

**Key Properties:**
- `Visible` - Enable/disable data labels
- `LabelPath` - Property path for label text
- `Template` - Custom label template
- `SmartLabelMode` - Smart label positioning (None, Trim, Hide)
- `AnimationDuration` - Duration time for animating the data label
- `Border` - Options for customizing the style properties of the border of the data labels
- `Rx` -  x position for the data labels
- `Ry` -  y position for the data labels
- `IntersectionAction` - Gets or sets the action to be performed when a data-label intersect with other data labels in maps
- `TextStyle` -  Options for customizing the styles of the text in data labels

**API Reference:** [MapsDataLabelSettings Class](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.MapsDataLabelSettings.html)

---

### MapsShapeSettings

Configures shape appearance and color mapping.

**Key Properties:**
- `Fill` - Shape fill color
- `DashArray` - Gets or sets the dash-array for the shapes in maps
- `Border` - Gets or sets the options for customizing the style properties of the border for the shapes in maps.
- `ColorValuePath` - Property for color mapping
- `ColorMapping` - Color mapping configuration

**API Reference:** [MapsShapeSettings Class](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.MapsShapeSettings.html)

---

### MapsLegendSettings

Configures the legend for the map.

**Key Properties:**
- `Visible` - Show/hide legend
- `Type` - Legend type (Layers, Markers, Bubbles)
- `Mode` - Legend mode (Default or Interactive)
- `Position` - Legend position (Top, Bottom, Left, Right, Float)
- `Background` - Legend background color
- `Title` - Legend title text
- `ToggleVisibility` - Enables or disables the toggle visibility of the legend in maps
- `ShapeBorder` - options for customizing the style properties of the border of the shapes of the legend items
- `ShapeHeight` - Gets or sets the height of the shapes in legend
- `ShapePadding` - Gets or sets the padding for the shapes in legend
- `ShapeWidth` - Gets or sets the width of the shapes in legend
- `TextStyle` - Options for customizing the text styles of the legend item text in maps
- `Alignment` - Alignment of the legend in maps
- `LabelPosition` - Position of the label in legend
- `Border` - Options for customizing the style properties of the legend border
- `TitleStyle` - Options for customizing the style of the title of the legend in maps

**API Reference:** [MapsLegendSettings Class](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.MapsLegendSettings.html)

---

### MapsZoomSettings

Configures zoom and pan functionality.

**Key Properties:**
- `Enable` - Enable/disable zoom
- `EnablePanning` - Enable/disable panning
- `ZoomFactor` - Default zoom factor
- `MaxZoom` - Maximum zoom level
- `MinZoom` - Minimum zoom level
- `ZoomOnClick` - Zoom on click toggle
- `EnableSelectionZooming` - Enables or disables the selection zooming operation in the maps
- `MouseWheelZoom` - Enables or disables the mouse wheel zooming in maps
- `PinchZooming` - Enables or disables the pinch zooming in maps
- `ToolbarSettings` - Gets or sets the detailed options to customize the entire zoom toolbar

**API Reference:** [MapsZoomSettings Class](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.MapsZoomSettings.html)

---

### MapsAnnotation

Represents a custom annotation (HTML overlay) on the map.

**Key Properties:**
- `X` - x position of the annotation in pixel or percentage format
- `Y` - y position of the annotation in pixel or percentage format
- `Content` - HTML content of annotation
- `HorizontalAlignment` - Horizontal alignment
- `VerticalAlignment` - Vertical alignment
- `ZIndex` - Gets or sets the z-index of the annotation in maps

**API Reference:** [MapsAnnotation Class](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.MapsAnnotation.html)

---

### MapsColorMapping

Defines color mapping for shape data visualization.

**Key Properties:**
- `From` - Start value for range mapping
- `To` - End value for range mapping
- `Color` - Color for this range
- `Label` - Label for legend
- `ShowLegend` - Enables or disables the visibility of legend for the corresponding color-mapped shapes in maps
- `MaxOpacity` - Gets or sets the maximum opacity for the color-mapping in maps
- `MinOpacity` - Gets or sets the minimum opacity for the color-mapping in maps
- `Value` - Gets or sets the value from the data source to map the corresponding colors to the shapes

**API Reference:** [MapsColorMapping Class](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.MapsColorMapping.html)

---

### MapsCenterPosition

Specifies the center position of the map.

**Key Properties:**
- `Latitude` - Center latitude coordinate
- `Longitude` - Center longitude coordinate

**API Reference:** [MapsCenterPosition Class](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.MapsCenterPosition.html)

---

### MapsMargin

Configures the margin around the map.

**Key Properties:**
- `Top` - Top margin in pixels
- `Bottom` - Bottom margin in pixels
- `Left` - Left margin in pixels
- `Right` - Right margin in pixels

**API Reference:** [MapsMargin Class](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.MapsMargin.html)

---

### MapsBorder

Configures the border style of the map container.

**Key Properties:**
- `Color` - Border color
- `Width` - Border width in pixels
- `Opacity` - Border opacity (0-1)

**API Reference:** [MapsBorder Class](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.MapsBorder.html)

---

### MapsTitleSettings

Configures the map title.

**Key Properties:**
- `Text` - Title text
- `Description` - Subtitle text
- `Alignment` - Title alignment (Far, Near, Center)
- `SubtitleSettings` - Gets or sets the options to customize the subtitle of the maps
- `TextStyle` - Gets or sets the options for customizing the text of the title in maps

**API Reference:** [MapsTitleSettings Class](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.MapsTitleSettings.html)

---

### MapsNavigationLine

Configures navigation lines connecting locations.

**Key Properties:**
- `Visible` - Show/hide navigation lines
- `Color` - Line color
- `Width` - Line width
- `Latitude` - Array of latitude coordinates
- `Longitude` - Array of longitude coordinates
- `HighlightSettings` - Gets or sets the highlight settings of the navigation line in maps
- `SelectionSettings` - Gets or sets the selection settings of the navigation line in maps
- `ArrowSettings` - Gets or sets the options to customize the arrow for the navigation line in maps
- `DashArray` - Gets or sets the dash-array for the navigation lines drawn in maps
- `Angle` - Gets or sets the angle of the curve connecting different locations in maps

**API Reference:** [MapsNavigationLine Class](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.MapsNavigationLine.html)

---

## Common Usage Patterns

### Pattern 1: Basic Choropleth Map with Color Mapping

Display population data across countries with color-coded regions.

**Controller:**

```csharp
public ActionResult Index()
{
    ViewBag.MapData = GetWorldGeoJSON();
    ViewBag.PopulationData = new[]
    {
        new { Country = "United States", Population = 331_000_000 },
        new { Country = "China", Population = 1_412_000_000 },
        new { Country = "India", Population = 1_380_000_000 }
    };
    return View();
}
```

**View:**

```cshtml
@Html.EJS().Maps("container")
    .Layers(layer =>
    {
        layer.ShapeSettings(settings => settings
                .ColorValuePath("Population")
                .ColorMapping(cm =>
                {
                    cm.From(0).To(500_000_000).Color("#deebae").Add();
                    cm.From(500_000_000).To(1_000_000_000).Color("#7bc1ce").Add();
                    cm.From(1_000_000_000).To(1_500_000_000).Color("#3a8fb7").Add();
                })
            ).ShapeData(ViewBag.MapData)
            .DataSource(ViewBag.PopulationData)
            .ShapeDataPath("Country")
            .ShapePropertyPath(new[] { "name" })
            .Add();
    }).LegendSettings(legend => legend.Visible(true).Position(Syncfusion.EJ2.Maps.LegendPosition.Bottom)).Render()
```

---

### Pattern 2: Adding Markers to Locations

Plot office locations with markers and tooltips.

**Controller:**

```csharp
public ActionResult Index()
{
    ViewBag.MapData = GetWorldGeoJSON();
    ViewBag.Offices = new[]
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
@{
    var data = new[]
    {
        new {latitude =  49.95121990866204, longitude = 18.468749999999998, name="Europe", color="red",
        shape="Triangle"},
        new {latitude =  59.88893689676585, longitude = -109.3359375, name="North America", color="blue",
        shape="Pentagon"},
        new {latitude =  -6.64607562172573, longitude = -55.54687499999999, name="South America", color="green",
        shape="InvertedTriangle"}
    };
}
@Html.EJS().Maps("container").Layers(new List<Syncfusion.EJ2.Maps.MapsLayer>
    {
        new Syncfusion.EJ2.Maps.MapsLayer
            {
                ShapeData = ViewBag.world_map,
                MarkerSettings  = new List<Syncfusion.EJ2.Maps.MapsMarker>
                    {
                        new Syncfusion.EJ2.Maps.MapsMarker
                            {
                                Visible = true,
                                DataSource = data,
                                LatitudeValuePath = "latitude",
                                LongitudeValuePath = "longitude",
                                ShapeValuePath = "shape",
                                ColorValuePath = "color"
                            }
                    }}}).Render()
```

---

### Pattern 3: Interactive Map with Zoom and Pan

Enable user interaction with zoom controls and panning.

**View:**

```cshtml
@Html.EJS().Maps("container").CenterPosition(center => center.Latitude(39.8283).Longitude(-98.5795)).ZoomSettings(zoom => zoom
        .Enable(true)
        .EnablePanning(true)
        .MaxZoom(15)
        .MinZoom(1)
        .ZoomFactor(2)
    ).Layers(layer => layer.ShapeData(ViewBag.MapData).Add()).Render()
```

---

### Pattern 4: Bing Maps Provider

Use Bing Maps as the base layer with satellite imagery.

**View:**

```cshtml
<div class="control-section">
    <div id="outer" style="width:100%">
        @Html.EJS().Maps("container").Load("mapsLoad").Layers(l =>
        {
            l.Add();
        }).Render()
    </div>
</div>
<style>
    #container {
        display: block;
    }
</style>

<script type="text/javascript">
    function mapsLoad(args) {
        args.maps.getBingUrlTemplate("//Bing Map URL>").then(function (url) {
            args.maps.layers[0].urlTemplate = url;
        });
    }
</script>
```

---

### Pattern 5: OpenStreetMap Provider

Use OpenStreetMap tile layer (free alternative).

**View:**

```cshtml
@Html.EJS().Maps("maps").Layers(l=> {
    l.UrlTemplate("// Tile map URL").Add();
}).Render()
```

---

### Pattern 6: Map with Annotations

Add custom HTML annotations at specific coordinates.

**View:**

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

---

## Resources

### Official Documentation

- **Component Demo:** https://ej2.syncfusion.com/aspnetmvc/Maps/Default
- **API Reference:** https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.Maps.html
- **Getting Started Guide:** https://ej2.syncfusion.com/aspnetmvc/documentation/maps/getting-started
- **Maps Namespace:** https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Maps.html

### External Resources

- **GeoJSON Format:** https://geojson.org/
- **World GeoJSON Data:** https://github.com/johan/world.geo.json
- **US States GeoJSON:** https://github.com/PublicaMundi/MappingAPI

---

**Document Version:** 1.0  
**Last Updated:** April 9, 2026  
**Syncfusion EJ2 Version:** 27.1.48+  
**Namespace:** Syncfusion.EJ2.Maps  
**Assembly:** Syncfusion.EJ2.dll
