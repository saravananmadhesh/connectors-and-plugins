# Maps API Reference

## Table of Contents
- [Properties](#properties)
  - [Layout & Dimensions](#layout--dimensions)
  - [Data](#data)
  - [Styling & Appearance](#styling--appearance)
  - [Interaction & Accessibility](#interaction--accessibility)
  - [Export & Print](#export--print)
- [Data Models](#data-models)
  - [CenterPositionModel](#centerpositionmodel)
  - [MarginModel](#marginmodel)
  - [AnnotationModel](#annotationmodel)
  - [BorderModel](#bordermodel)
  - [MapsAreaSettingsModel](#mapsareasettingsmodel)
  - [TitleSettingsModel](#titlesettingsmodel)
  - [LayerSettingsModel](#layersettingsmodel)
  - [LegendSettingsModel](#legendsettingsmodel)
  - [ZoomSettingsModel](#zoomsettingsmodel)
  - [ShapeSettingsModel](#shapesettingsmodel)
  - [MarkerSettingsModel](#markersettingsmodel)
  - [BubbleSettingsModel](#bubblesettingsmodel)
  - [DataLabelSettingsModel](#datalabelsettingsmodel)
  - [TooltipSettingsModel](#tooltipsettingsmodel)
  - [MarkerClusterSettingsModel](#markerclustersettingsmodel)
  - [NavigationLineSettingsModel](#navigationlinesettingsmodel)
  - [PolygonSettingsModel](#polygonsettingsmodel)
  - [HighlightSettingsModel](#highlightsettingsmodel)
  - [SelectionSettingsModel](#selectionsettingsmodel)
  - [ToggleLegendSettingsModel](#togglelegendsettingsmodel)
- [Events](#events)
  - [click](#click)
  - [loaded](#loaded)
  - [shapeSelected](#shapeselected)
- [Methods](#methods)
- [Enums](#enums)
  - [ProjectionType](#projectiontype)
  - [MapsTheme](#mapstheme)
  - [TooltipGesture](#tooltipgesture)
  - [PanDirection](#pandirection)
- [Child Directives](#child-directives)
- [Modules / Services](#modules--services)
- [Common Usage Patterns](#common-usage-patterns)
- [Additional Resources](#additional-resources)

## Properties

All Maps component properties are linked to their official API anchors.

### Layout & Dimensions

| Property | Type | Default | Description | Link |
|---|----|---|---|---|
| `height` | string | null | Sets the rendered height of the map container. | https://ej2.syncfusion.com/vue/documentation/api/maps/#height |
| `width` | string | null | Sets the rendered width of the map container. | https://ej2.syncfusion.com/vue/documentation/api/maps/#width |
| `margin` | [MarginModel](https://ej2.syncfusion.com/vue/documentation/api/maps/marginmodel) | — | Margin around the map (top/right/bottom/left). | https://ej2.syncfusion.com/vue/documentation/api/maps/#margin |
| `mapsArea` | [MapsAreaSettingsModel](https://ej2.syncfusion.com/vue/documentation/api/maps/mapsareasettingsmodel) | — | Settings for the area surrounding the map (background, border). | https://ej2.syncfusion.com/vue/documentation/api/maps/#mapsarea |
| `background` | string | null | Background color of the maps container. | https://ej2.syncfusion.com/vue/documentation/api/maps/#background |
| `border` | [BorderModel](https://ej2.syncfusion.com/vue/documentation/api/maps/bordermodel) | — | Border style for the map container. | https://ej2.syncfusion.com/vue/documentation/api/maps/#border |

### Data

| Property | Type | Default | Description | Link |
|---|----|---|---|---|
| `layers` | [LayerSettingsModel[]](https://ej2.syncfusion.com/vue/documentation/api/maps/layersettingsmodel) | — | Collection of layer configuration objects (shape/bubble/marker settings). | https://ej2.syncfusion.com/vue/documentation/api/maps/#layers |
| `annotations` | [AnnotationModel[]](https://ej2.syncfusion.com/vue/documentation/api/maps/annotationmodel) | — | Collection of annotations to render over the map. | https://ej2.syncfusion.com/vue/documentation/api/maps/#annotations |
| `centerPosition` | [CenterPositionModel](https://ej2.syncfusion.com/vue/documentation/api/maps/centerpositionmodel) | — | Geographic center position (latitude/longitude) of the map. | https://ej2.syncfusion.com/vue/documentation/api/maps/#centerposition |
| `baseLayerIndex` | number | 0 | Index of the layer used as base/visible layer. | https://ej2.syncfusion.com/vue/documentation/api/maps/#baselayerindex |
| `isShapeSelected` | boolean | — | Indicates whether a shape is selected. | https://ej2.syncfusion.com/vue/documentation/api/maps/#isshapeselected |

### Styling & Appearance

| Property | Type | Default | Description | Link |
|---|----|---|---|---|
| `theme` | [MapsTheme](https://ej2.syncfusion.com/vue/documentation/api/maps/mapstheme) | Material | Map theme (Material, Fabric, Bootstrap, Dark variants, etc.). | https://ej2.syncfusion.com/vue/documentation/api/maps/#theme |
| `titleSettings` | [TitleSettingsModel](https://ej2.syncfusion.com/vue/documentation/api/maps/titlesettingsmodel) | — | Title text and style settings for the map. | https://ej2.syncfusion.com/vue/documentation/api/maps/#titlesettings |
| `legendSettings` | [LegendSettingsModel](https://ej2.syncfusion.com/vue/documentation/api/maps/legendsettingsmodel) | — | Legend configuration for the map. | https://ej2.syncfusion.com/vue/documentation/api/maps/#legendsettings |
| `useGroupingSeparator` | boolean | false | Enables grouping separators for values displayed in the map. | https://ej2.syncfusion.com/vue/documentation/api/maps/#usegroupingseparator |
| `format` | string | null | Localization format for numeric/date text in the maps. | https://ej2.syncfusion.com/vue/documentation/api/maps/#format |

### Interaction & Accessibility

| Property | Type | Default | Description | Link |
|---|----|---|---|---|
| `zoomSettings` | [ZoomSettingsModel](https://ej2.syncfusion.com/vue/documentation/api/maps/zoomsettingsmodel) | — | Configuration for zooming/panning behavior. | https://ej2.syncfusion.com/vue/documentation/api/maps/#zoomsettings |
| `tooltipDisplayMode` | [TooltipGesture](https://ej2.syncfusion.com/vue/documentation/api/maps/tooltipgesture) | MouseMove | Mode for showing tooltips (MouseMove, Click, DoubleClick). | https://ej2.syncfusion.com/vue/documentation/api/maps/#tooltipdisplaymode |
| `enableRtl` | boolean | false | Enable right-to-left rendering. | https://ej2.syncfusion.com/vue/documentation/api/maps/#enablertl |
| `enablePersistence` | boolean | false | Persist component state between reloads. | https://ej2.syncfusion.com/vue/documentation/api/maps/#enablepersistence |
| `tabIndex` | number | 0 | Tab index for keyboard navigation. | https://ej2.syncfusion.com/vue/documentation/api/maps/#tabindex |
| `description` | string | null | Description for assistive technologies. | https://ej2.syncfusion.com/vue/documentation/api/maps/#description |
| `locale` | string | '' | Locale override for component (default `'en-US'`). | https://ej2.syncfusion.com/vue/documentation/api/maps/#locale |

### Export & Print

| Property | Type | Default | Description | Link |
|---|----|---|---|---|
| `allowImageExport` | boolean | false | Enable exporting the map as an image. | https://ej2.syncfusion.com/vue/documentation/api/maps/#allowimageexport |
| `allowPdfExport` | boolean | false | Enable exporting the map as PDF. | https://ej2.syncfusion.com/vue/documentation/api/maps/#allowpdfexport |
| `allowPrint` | boolean | false | Enable printing the map. | https://ej2.syncfusion.com/vue/documentation/api/maps/#allowprint |

## Data Models

Each model below links to its official model page.

### CenterPositionModel
Link: https://ej2.syncfusion.com/vue/documentation/api/maps/centerpositionmodel

Purpose: Defines a geographic center position for the map.

Properties:
- `latitude` (number) — Latitude of the center position. — https://ej2.syncfusion.com/vue/documentation/api/maps/centerpositionmodel/#latitude
- `longitude` (number) — Longitude of the center position. — https://ej2.syncfusion.com/vue/documentation/api/maps/centerpositionmodel/#longitude

### MarginModel
Link: https://ej2.syncfusion.com/vue/documentation/api/maps/marginmodel

Purpose: Defines margins around the map container.

Properties:
- `top` (number) — Top margin. — https://ej2.syncfusion.com/vue/documentation/api/maps/marginmodel/#top
- `bottom` (number) — Bottom margin. — https://ej2.syncfusion.com/vue/documentation/api/maps/marginmodel/#bottom
- `left` (number) — Left margin. — https://ej2.syncfusion.com/vue/documentation/api/maps/marginmodel/#left
- `right` (number) — Right margin. — https://ej2.syncfusion.com/vue/documentation/api/maps/marginmodel/#right

### AnnotationModel
Link: https://ej2.syncfusion.com/vue/documentation/api/maps/annotationmodel

Purpose: Configure a single annotation rendered over the map.

Properties:
- `content` (string | Function) — HTML/string or function returning content. — https://ej2.syncfusion.com/vue/documentation/api/maps/annotationmodel/#content
- `horizontalAlignment` (AnnotationAlignment) — Horizontal alignment of the annotation. — https://ej2.syncfusion.com/vue/documentation/api/maps/annotationmodel/#horizontalalignment
- `verticalAlignment` (AnnotationAlignment) — Vertical alignment. — https://ej2.syncfusion.com/vue/documentation/api/maps/annotationmodel/#verticalalignment
- `x` (string) — X position (px or %). — https://ej2.syncfusion.com/vue/documentation/api/maps/annotationmodel/#x
- `y` (string) — Y position (px or %). — https://ej2.syncfusion.com/vue/documentation/api/maps/annotationmodel/#y
- `zIndex` (string) — Z-index for layering order. — https://ej2.syncfusion.com/vue/documentation/api/maps/annotationmodel/#zindex

### BorderModel
Link: https://ej2.syncfusion.com/vue/documentation/api/maps/bordermodel

Purpose: Border styling config used for maps and legend.

Properties:
- `color` (string) — CSS color (hex or rgba). — https://ej2.syncfusion.com/vue/documentation/api/maps/bordermodel/#color
- `opacity` (number) — Border opacity. — https://ej2.syncfusion.com/vue/documentation/api/maps/bordermodel/#opacity
- `width` (number) — Border width in pixels. — https://ej2.syncfusion.com/vue/documentation/api/maps/bordermodel/#width

### MapsAreaSettingsModel
Link: https://ej2.syncfusion.com/vue/documentation/api/maps/mapsareasettingsmodel

Purpose: Configures the area surrounding the map (outside the shapes).

Properties:
- `background` (string) — Background color for the maps area. — https://ej2.syncfusion.com/vue/documentation/api/maps/mapsareasettingsmodel/#background
- `border` (BorderModel) — Border settings for the maps area. — https://ej2.syncfusion.com/vue/documentation/api/maps/mapsareasettingsmodel/#border

### TitleSettingsModel
Link: https://ej2.syncfusion.com/vue/documentation/api/maps/titlesettingsmodel

Purpose: Title and subtitle configuration for the map.

Properties:
- `text` (string) — Title text. — https://ej2.syncfusion.com/vue/documentation/api/maps/titlesettingsmodel/#text
- `alignment` (Alignment) — Title alignment. — https://ej2.syncfusion.com/vue/documentation/api/maps/titlesettingsmodel/#alignment
- `textStyle` (FontModel) — Font styling for the title text. — https://ej2.syncfusion.com/vue/documentation/api/maps/titlesettingsmodel/#textstyle
- `subtitleSettings` (SubTitleSettingsModel) — Subtitle config. — https://ej2.syncfusion.com/vue/documentation/api/maps/titlesettingsmodel/#subtitlesettings
- `description` (string) — Assistive description for the title. — https://ej2.syncfusion.com/vue/documentation/api/maps/titlesettingsmodel/#description

### LayerSettingsModel
Link: https://ej2.syncfusion.com/vue/documentation/api/maps/layersettingsmodel

Purpose: Configuration for an individual layer or sublayer.

Key Properties (overview):
- `shapeData` (Object | DataManager | MapAjax) — GeoJSON / shape data source. — https://ej2.syncfusion.com/vue/documentation/api/maps/layersettingsmodel/#shapedata
- `dataSource` (Object[] | DataManager | MapAjax) — Data bound to shapes (for tooltips, legends). — https://ej2.syncfusion.com/vue/documentation/api/maps/layersettingsmodel/#datasource
- `shapeDataPath` (string) — Field in dataSource identifying shapes. — https://ej2.syncfusion.com/vue/documentation/api/maps/layersettingsmodel/#shapedatapath
- `shapePropertyPath` (string | string[]) — Field in shapeData identifying shapes. — https://ej2.syncfusion.com/vue/documentation/api/maps/layersettingsmodel/#shapepropertypath
- `shapeSettings` (ShapeSettingsModel) — Visual settings for shapes (color mapping). — https://ej2.syncfusion.com/vue/documentation/api/maps/layersettingsmodel/#shapesettings
- `markerSettings` (MarkerSettingsModel[]) — Marker collection for the layer. — https://ej2.syncfusion.com/vue/documentation/api/maps/layersettingsmodel/#markersettings
- `bubbleSettings` (BubbleSettingsModel[]) — Bubble collection for the layer. — https://ej2.syncfusion.com/vue/documentation/api/maps/layersettingsmodel/#bubblesettings
- `tooltipSettings` (TooltipSettingsModel) — Tooltip config for this layer. — https://ej2.syncfusion.com/vue/documentation/api/maps/layersettingsmodel/#tooltipsettings
- `visible` (boolean) — Layer visibility. — https://ej2.syncfusion.com/vue/documentation/api/maps/layersettingsmodel/#visible
- `geometryType` (GeometryType) — 'Geographic' or 'Normal' geometry type. — https://ej2.syncfusion.com/vue/documentation/api/maps/layersettingsmodel/#geometrytype
(For full property list see the model page.)

### LegendSettingsModel
Link: https://ej2.syncfusion.com/vue/documentation/api/maps/legendsettingsmodel

Purpose: Controls legend appearance and behavior.

Key Properties:
- `visible` (boolean) — Show/hide legend. — https://ej2.syncfusion.com/vue/documentation/api/maps/legendsettingsmodel/#visible
- `position` (LegendPosition) — Legend position. — https://ej2.syncfusion.com/vue/documentation/api/maps/legendsettingsmodel/#position
- `orientation` (LegendArrangement) — Orientation (Horizontal/Vertical). — https://ej2.syncfusion.com/vue/documentation/api/maps/legendsettingsmodel/#orientation
- `shape` (LegendShape) — Shape used for legend items. — https://ej2.syncfusion.com/vue/documentation/api/maps/legendsettingsmodel/#shape
- `width` / `height` (string) — Size of legend. — https://ej2.syncfusion.com/vue/documentation/api/maps/legendsettingsmodel/#width
- `title` (CommonTitleSettingsModel) — Legend title settings. — https://ej2.syncfusion.com/vue/documentation/api/maps/legendsettingsmodel/#title
(See model page for full list.)

### ZoomSettingsModel
Link: https://ej2.syncfusion.com/vue/documentation/api/maps/zoomsettingsmodel

Purpose: Configure zooming and panning behaviors.

Properties:
- `enable` (boolean) — Enable zooming. — https://ej2.syncfusion.com/vue/documentation/api/maps/zoomsettingsmodel/#enable
- `enablePanning` (boolean) — Enable panning. — https://ej2.syncfusion.com/vue/documentation/api/maps/zoomsettingsmodel/#enablepanning
- `doubleClickZoom` (boolean) — Enable double-click zoom. — https://ej2.syncfusion.com/vue/documentation/api/maps/zoomsettingsmodel/#doubleclickzoom
- `mouseWheelZoom` (boolean) — Enable wheel zoom. — https://ej2.syncfusion.com/vue/documentation/api/maps/zoomsettingsmodel/#mousewheelzoom
- `pinchZooming` (boolean) — Enable pinch-to-zoom gestures. — https://ej2.syncfusion.com/vue/documentation/api/maps/zoomsettingsmodel/#pinchzooming
- `maxZoom` / `minZoom` (number) — Zoom limits. — https://ej2.syncfusion.com/vue/documentation/api/maps/zoomsettingsmodel/#maxzoom
- `zoomFactor` (number) — Initial zoom factor. — https://ej2.syncfusion.com/vue/documentation/api/maps/zoomsettingsmodel/#zoomfactor
- `toolbarSettings` (ZoomToolbarSettingsModel) — Toolbar options. — https://ej2.syncfusion.com/vue/documentation/api/maps/zoomsettingsmodel/#toolbarsettings

### ShapeSettingsModel
Link: https://ej2.syncfusion.com/vue/documentation/api/maps/shapesettingsmodel

Purpose: Visual and color mapping settings for shapes in a layer.

Properties:
- `autofill` (boolean) — Auto-fill shape colors from palette. — https://ej2.syncfusion.com/vue/documentation/api/maps/shapesettingsmodel/#autofill
- `border` (BorderModel) — Border settings for shapes. — https://ej2.syncfusion.com/vue/documentation/api/maps/shapesettingsmodel/#border
- `dashArray` (string) — Dash array for shape borders. — https://ej2.syncfusion.com/vue/documentation/api/maps/shapesettingsmodel/#dasharray
- `fill` (string) — Fill color for shapes. — https://ej2.syncfusion.com/vue/documentation/api/maps/shapesettingsmodel/#fill
- `opacity` (number) — Shape opacity. — https://ej2.syncfusion.com/vue/documentation/api/maps/shapesettingsmodel/#opacity
- `colorMapping` (ColorMappingSettingsModel[]) — Color mapping array. — https://ej2.syncfusion.com/vue/documentation/api/maps/shapesettingsmodel/#colormapping
- `colorValuePath` (string) — Field name for color values. — https://ej2.syncfusion.com/vue/documentation/api/maps/shapesettingsmodel/#colorvaluepath
- `valuePath` (string) — Field used to determine shape value. — https://ej2.syncfusion.com/vue/documentation/api/maps/shapesettingsmodel/#valuepath
- `palette` (string[]) — Color palette. — https://ej2.syncfusion.com/vue/documentation/api/maps/shapesettingsmodel/#palette

### MarkerSettingsModel
Link: https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel

Purpose: Defines marker rendering and data-binding settings.

Key properties:
- `dataSource` (Object[] | DataManager) — Marker data array with lat/long. — https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel/#datasource
- `latitudeValuePath` / `longitudeValuePath` (string) — Field names for geo coords. — https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel/#latitudevaluepath
- `visible` (boolean) — Marker visibility. — https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel/#visible
- `template` (string | Function) — Custom template for markers. — https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel/#template
- `tooltipSettings` (TooltipSettingsModel) — Tooltip config for markers. — https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel/#tooltipsettings
- `clusterSettings` (MarkerClusterSettingsModel) — Cluster behavior/settings. — https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel/#clustersettings
- `animationDelay` (number) — Delay time for marker animations. — https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel/#animationdelay
- `animationDuration` (number) — Duration for marker animations. — https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel/#animationduration
- `border` (BorderModel) — Border options for the marker. — https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel/#border
- `colorValuePath` (string) — Field name to set marker color from data. — https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel/#colorvaluepath
- `dashArray` (string) — Dash-array for marker border. — https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel/#dasharray
- `enableDrag` (boolean) — Enable marker drag-and-drop. — https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel/#enabledrag
- `fill` (string) — Fill color for the marker. — https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel/#fill
- `height` (number) — Marker height. — https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel/#height
- `heightValuePath` (string) — Field name to set marker height from data. — https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel/#heightvaluepath
- `highlightSettings` (HighlightSettingsModel) — Hover highlight options. — https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel/#highlightsettings
- `imageUrl` (string) — Image URL when marker type is image. — https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel/#imageurl
- `imageUrlValuePath` (string) — Field name for per-marker image URL. — https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel/#imageurlvaluepath
- `initialMarkerSelection` (InitialMarkerSelectionSettingsModel[]) — Initial selection options for markers. — https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel/#initialmarkerselection
- `legendText` (string) — Field name to render legend text for the marker. — https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel/#legendtext
- `offset` (Point) — Offset position for the marker. — https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel/#offset
- `opacity` (number) — Marker opacity. — https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel/#opacity
- `query` (Query) — Query to select marker data when using DataManager. — https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel/#query
- `selectionSettings` (SelectionSettingsModel) — Selection options for markers. — https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel/#selectionsettings
- `shape` (MarkerType) — Shape type of the marker. — https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel/#shape
- `shapeValuePath` (string) — Field name to set marker shape per data record. — https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel/#shapevaluepath
- `width` (number) — Marker width. — https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel/#width
- `widthValuePath` (string) — Field name to set marker width from data. — https://ej2.syncfusion.com/vue/documentation/api/maps/markersettingsmodel/#widthvaluepath

### BubbleSettingsModel
Link: https://ej2.syncfusion.com/vue/documentation/api/maps/bubblesettingsmodel

Purpose: Bubble rendering configuration for a layer.

Key properties:
- `dataSource` (Object[] | DataManager) — Bubble data array. — https://ej2.syncfusion.com/vue/documentation/api/maps/bubblesettingsmodel/#datasource
- `valuePath` (string) — Field name used for bubble size. — https://ej2.syncfusion.com/vue/documentation/api/maps/bubblesettingsmodel/#valuepath
- `minRadius` / `maxRadius` (number) — Radius bounds. — https://ej2.syncfusion.com/vue/documentation/api/maps/bubblesettingsmodel/#minradius
- `tooltipSettings` (TooltipSettingsModel) — Tooltip config for bubbles. — https://ej2.syncfusion.com/vue/documentation/api/maps/bubblesettingsmodel/#tooltipsettings
- `animationDelay` (number) — Animation delay for bubbles. — https://ej2.syncfusion.com/vue/documentation/api/maps/bubblesettingsmodel/#animationdelay
- `animationDuration` (number) — Animation duration for bubbles. — https://ej2.syncfusion.com/vue/documentation/api/maps/bubblesettingsmodel/#animationduration
- `border` (BorderModel) — Border for the bubbles. — https://ej2.syncfusion.com/vue/documentation/api/maps/bubblesettingsmodel/#border
- `bubbleType` (BubbleType) — Bubble rendering type. — https://ej2.syncfusion.com/vue/documentation/api/maps/bubblesettingsmodel/#bubbletype
- `colorMapping` (ColorMappingSettingsModel[]) — Color mapping for bubbles. — https://ej2.syncfusion.com/vue/documentation/api/maps/bubblesettingsmodel/#colormapping
- `colorValuePath` (string) — Field for bubble color values. — https://ej2.syncfusion.com/vue/documentation/api/maps/bubblesettingsmodel/#colorvaluepath
- `fill` (string) — Fill color for bubbles. — https://ej2.syncfusion.com/vue/documentation/api/maps/bubblesettingsmodel/#fill
- `highlightSettings` (HighlightSettingsModel) — Highlight options for bubbles. — https://ej2.syncfusion.com/vue/documentation/api/maps/bubblesettingsmodel/#highlightsettings
- `opacity` (number) — Bubble opacity. — https://ej2.syncfusion.com/vue/documentation/api/maps/bubblesettingsmodel/#opacity
- `query` (Query) — Query when using DataManager. — https://ej2.syncfusion.com/vue/documentation/api/maps/bubblesettingsmodel/#query
- `selectionSettings` (SelectionSettingsModel) — Selection options for bubbles. — https://ej2.syncfusion.com/vue/documentation/api/maps/bubblesettingsmodel/#selectionsettings
- `visible` (boolean) — Bubble visibility. — https://ej2.syncfusion.com/vue/documentation/api/maps/bubblesettingsmodel/#visible

### DataLabelSettingsModel
Link: https://ej2.syncfusion.com/vue/documentation/api/maps/datalabelsettingsmodel

Purpose: Data label display and styling options.

Key properties include:
- `visible` (boolean) — Enable/disable data labels. — https://ej2.syncfusion.com/vue/documentation/api/maps/datalabelsettingsmodel/#visible
- `labelPath` (string) — Field name for label text. — https://ej2.syncfusion.com/vue/documentation/api/maps/datalabelsettingsmodel/#labelpath
- `textStyle` (FontModel) — Font styling for labels. — https://ej2.syncfusion.com/vue/documentation/api/maps/datalabelsettingsmodel/#textstyle
- `smartLabelMode` (SmartLabelMode) — Behavior when labels overlap. — https://ej2.syncfusion.com/vue/documentation/api/maps/datalabelsettingsmodel/#smartlabelmode
- `template` (string | Function) — Template for custom labels. — https://ej2.syncfusion.com/vue/documentation/api/maps/datalabelsettingsmodel/#template
- `opacity` (number) — Label opacity. — https://ej2.syncfusion.com/vue/documentation/api/maps/datalabelsettingsmodel/#opacity
- `fill` (string) — Background fill for labels. — https://ej2.syncfusion.com/vue/documentation/api/maps/datalabelsettingsmodel/#fill
- `border` (BorderModel) — Border options for labels. — https://ej2.syncfusion.com/vue/documentation/api/maps/datalabelsettingsmodel/#border
- `animationDuration` (number) — Animation duration for label rendering. — https://ej2.syncfusion.com/vue/documentation/api/maps/datalabelsettingsmodel/#animationduration
- `rx` (number) — x-radius for label rounded corners. — https://ej2.syncfusion.com/vue/documentation/api/maps/datalabelsettingsmodel/#rx
- `ry` (number) — y-radius for label rounded corners. — https://ej2.syncfusion.com/vue/documentation/api/maps/datalabelsettingsmodel/#ry

### TooltipSettingsModel
Link: https://ej2.syncfusion.com/vue/documentation/api/maps/tooltipsettingsmodel

Purpose: Tooltip appearance and behavior for layer/marker/bubble.

Key properties include:
- `visible` (boolean) — Enable/disable tooltip. — https://ej2.syncfusion.com/vue/documentation/api/maps/tooltipsettingsmodel/#visible
- `template` (string | Function) — Tooltip template. — https://ej2.syncfusion.com/vue/documentation/api/maps/tooltipsettingsmodel/#template
- `duration` (number) — Duration before the tooltip disappears (ms). — https://ej2.syncfusion.com/vue/documentation/api/maps/tooltipsettingsmodel/#duration
- `textStyle` (FontModel) — Font styling for tooltip text. — https://ej2.syncfusion.com/vue/documentation/api/maps/tooltipsettingsmodel/#textstyle
- `format` (string) — Format string for tooltip values. — https://ej2.syncfusion.com/vue/documentation/api/maps/tooltipsettingsmodel/#format
- `border` (BorderModel) — Tooltip border options. — https://ej2.syncfusion.com/vue/documentation/api/maps/tooltipsettingsmodel/#border
- `fill` (string) — Tooltip background color. — https://ej2.syncfusion.com/vue/documentation/api/maps/tooltipsettingsmodel/#fill
- `valuePath` (string) — Field to use for tooltip values. — https://ej2.syncfusion.com/vue/documentation/api/maps/tooltipsettingsmodel/#valuepath

### MarkerClusterSettingsModel
Link: https://ej2.syncfusion.com/vue/documentation/api/maps/markerclustersettingsmodel

Purpose: Marker clustering behavior and visual options.

Key properties:
- `allowClustering` (boolean) — Enable marker clustering. — https://ej2.syncfusion.com/vue/documentation/api/maps/markerclustersettingsmodel/#allowclustering
- `allowClusterExpand` (boolean) — Enable expanding clusters. — https://ej2.syncfusion.com/vue/documentation/api/maps/markerclustersettingsmodel/#allowclusterexpand
- `allowDeepClustering` (boolean) — Enable deep clustering for accuracy. — https://ej2.syncfusion.com/vue/documentation/api/maps/markerclustersettingsmodel/#allowdeepclustering
- `fill` (string) — Fill color for cluster shape. — https://ej2.syncfusion.com/vue/documentation/api/maps/markerclustersettingsmodel/#fill
- `width` (number) — Cluster width. — https://ej2.syncfusion.com/vue/documentation/api/maps/markerclustersettingsmodel/#width
- `height` (number) — Cluster height. — https://ej2.syncfusion.com/vue/documentation/api/maps/markerclustersettingsmodel/#height
- `border` (BorderModel) — Cluster border options. — https://ej2.syncfusion.com/vue/documentation/api/maps/markerclustersettingsmodel/#border
- `labelStyle` (FontModel) — Style for cluster label text. — https://ej2.syncfusion.com/vue/documentation/api/maps/markerclustersettingsmodel/#labelstyle
- `imageUrl` (string) — URL for cluster image when using image shape. — https://ej2.syncfusion.com/vue/documentation/api/maps/markerclustersettingsmodel/#imageurl
- `offset` (Point) — Offset for cluster position. — https://ej2.syncfusion.com/vue/documentation/api/maps/markerclustersettingsmodel/#offset
- `opacity` (number) — Cluster opacity. — https://ej2.syncfusion.com/vue/documentation/api/maps/markerclustersettingsmodel/#opacity
- `dashArray` (string) — Dash array for cluster border. — https://ej2.syncfusion.com/vue/documentation/api/maps/markerclustersettingsmodel/#dasharray

### NavigationLineSettingsModel
Link: https://ej2.syncfusion.com/vue/documentation/api/maps/navigationlinesettingsmodel

Purpose: Settings for navigation lines between locations.

Key properties:
- `latitude` (number[]) — Latitude array for navigation path. — https://ej2.syncfusion.com/vue/documentation/api/maps/navigationlinesettingsmodel/#latitude
- `longitude` (number[]) — Longitude array for navigation path. — https://ej2.syncfusion.com/vue/documentation/api/maps/navigationlinesettingsmodel/#longitude
- `color` (string) — Line color. — https://ej2.syncfusion.com/vue/documentation/api/maps/navigationlinesettingsmodel/#color
- `width` (number) — Line width. — https://ej2.syncfusion.com/vue/documentation/api/maps/navigationlinesettingsmodel/#width
- `arrowSettings` (ArrowModel) — Arrow configuration for the line. — https://ej2.syncfusion.com/vue/documentation/api/maps/navigationlinesettingsmodel/#arrowsettings
- `highlightSettings` (HighlightSettingsModel) — Highlight options for the line. — https://ej2.syncfusion.com/vue/documentation/api/maps/navigationlinesettingsmodel/#highlightsettings
- `angle` (number) — Angle for curved lines. — https://ej2.syncfusion.com/vue/documentation/api/maps/navigationlinesettingsmodel/#angle
- `dashArray` (string) — Dash-array for the navigation line. — https://ej2.syncfusion.com/vue/documentation/api/maps/navigationlinesettingsmodel/#dasharray
- `selectionSettings` (SelectionSettingsModel) — Selection options for navigation lines. — https://ej2.syncfusion.com/vue/documentation/api/maps/navigationlinesettingsmodel/#selectionsettings
- `visible` (boolean) — Visibility of navigation line. — https://ej2.syncfusion.com/vue/documentation/api/maps/navigationlinesettingsmodel/#visible

### PolygonSettingsModel
Link: https://ej2.syncfusion.com/vue/documentation/api/maps/polygonsettingsmodel

Purpose: Configure custom polygon shapes (points, fill, border) and per-polygon tooltips/selections.

Key properties:
- `polygons` (PolygonSettingModel[]) — Array of polygon definitions. — https://ej2.syncfusion.com/vue/documentation/api/maps/polygonsettingsmodel/#polygons
- `selectionSettings` (SelectionSettingsModel) — Selection options for polygons. — https://ej2.syncfusion.com/vue/documentation/api/maps/polygonsettingsmodel/#selectionsettings
- `highlightSettings` (HighlightSettingsModel) — Highlight options for polygons. — https://ej2.syncfusion.com/vue/documentation/api/maps/polygonsettingsmodel/#highlightsettings
- `tooltipSettings` (PolygonTooltipSettingsModel) — Tooltip options for polygons. — https://ej2.syncfusion.com/vue/documentation/api/maps/polygonsettingsmodel/#tooltipsettings
- `polygons[].points` (Coordinate[]) — Points array defining each polygon. — https://ej2.syncfusion.com/vue/documentation/api/maps/polygonsettingmodel#points
- `polygons[].fill` (string) — Fill color per polygon. — https://ej2.syncfusion.com/vue/documentation/api/maps/polygonsettingmodel#fill
- `polygons[].borderWidth` (number) — Border width per polygon. — https://ej2.syncfusion.com/vue/documentation/api/maps/polygonsettingmodel#borderwidth

### HighlightSettingsModel
Link: https://ej2.syncfusion.com/vue/documentation/api/maps/highlightsettingsmodel

Purpose: Settings applied when hovering over shapes/markers/bubbles.

Key properties:
- `enable` (boolean) — Enable highlight. — https://ej2.syncfusion.com/vue/documentation/api/maps/highlightsettingsmodel/#enable
- `fill` (string) — Fill color used on highlight. — https://ej2.syncfusion.com/vue/documentation/api/maps/highlightsettingsmodel/#fill
- `opacity` (number) — Opacity for highlight. — https://ej2.syncfusion.com/vue/documentation/api/maps/highlightsettingsmodel/#opacity
- `border` (BorderModel) — Border options for highlighted element. — https://ej2.syncfusion.com/vue/documentation/api/maps/highlightsettingsmodel/#border

### SelectionSettingsModel
Link: https://ej2.syncfusion.com/vue/documentation/api/maps/selectionsettingsmodel

Purpose: Settings applied when selecting shapes/markers/bubbles.

Key properties:
- `enable` (boolean) — Enable selection. — https://ej2.syncfusion.com/vue/documentation/api/maps/selectionsettingsmodel/#enable
- `enableMultiSelect` (boolean) — Enable multiple selection. — https://ej2.syncfusion.com/vue/documentation/api/maps/selectionsettingsmodel/#enablemultiselect
- `fill` (string) — Fill color when selected. — https://ej2.syncfusion.com/vue/documentation/api/maps/selectionsettingsmodel/#fill
- `opacity` (number) — Opacity for selected element. — https://ej2.syncfusion.com/vue/documentation/api/maps/selectionsettingsmodel/#opacity
- `border` (BorderModel) — Border options for selected element. — https://ej2.syncfusion.com/vue/documentation/api/maps/selectionsettingsmodel/#border

### ToggleLegendSettingsModel
Link: https://ej2.syncfusion.com/vue/documentation/api/maps/togglelegendsettingsmodel

Purpose: Settings to configure legend toggle behavior and shape appearance on toggle.

Key properties:
- `enable` (boolean) — Enable legend toggle. — https://ej2.syncfusion.com/vue/documentation/api/maps/togglelegendsettingsmodel/#enable
- `applyShapeSettings` (boolean) — Apply shape settings when toggled. — https://ej2.syncfusion.com/vue/documentation/api/maps/togglelegendsettingsmodel/#applyshapesettings
- `fill` (string) — Fill color applied on toggle. — https://ej2.syncfusion.com/vue/documentation/api/maps/togglelegendsettingsmodel/#fill
- `opacity` (number) — Opacity applied on toggle. — https://ej2.syncfusion.com/vue/documentation/api/maps/togglelegendsettingsmodel/#opacity
- `border` (BorderModel) — Border applied on toggle. — https://ej2.syncfusion.com/vue/documentation/api/maps/togglelegendsettingsmodel/#border

## Events

Each event below links to the event-args interface where available.

### click
- Params: `args: IMouseEventArgs` — click event arguments (target element, coordinates).
- Description: Fired when user clicks a map element (shape/marker/bubble).
- Example:

```vue
<script setup>
import { ref } from 'vue';
const mapsRef = ref(null);

function onClickHandler(args) {
  console.log('Map clicked', args);
}
</script>

<template>
  <ejs-maps ref="mapsRef" @click="onClickHandler">
    <!-- layers -->
  </ejs-maps>
</template>
```

Link: https://ej2.syncfusion.com/vue/documentation/api/maps/imouseeventargs

### loaded
- Params: `args: ILoadedEventArgs`
- Description: Fired after the map is rendered.
- Example:

```vue
<script setup>
function onLoaded(args) {
  console.log('Maps loaded', args);
}
</script>

<template>
  <ejs-maps @loaded="onLoaded"></ejs-maps>
</template>
```

Link: https://ej2.syncfusion.com/vue/documentation/api/maps/iloadedeventargs

### shapeSelected
- Params: `args: IShapeSelectedEventArgs`
- Description: Fired when a shape is selected.
- Link: https://ej2.syncfusion.com/vue/documentation/api/maps/ishapeselectedeventargs

(Other events and their args are documented on the main API page.)

## Methods

Call methods via a component ref (Composition API example below).

Common public methods (signatures and return types as documented):

- `addLayer(layer: Object): void` — Add a layer dynamically. https://ej2.syncfusion.com/vue/documentation/api/maps/#addlayer
- `removeLayer(index: number): void` — Remove a layer by index. https://ej2.syncfusion.com/vue/documentation/api/maps/#removelayer
- `addMarker(layerIndex?: number, markerCollection?: MarkerSettingsModel[]): void` — Add marker(s) to a layer. https://ej2.syncfusion.com/vue/documentation/api/maps/#addmarker
- `destroy(): void` — Dispose the maps instance. https://ej2.syncfusion.com/vue/documentation/api/maps/#destroy
- `export(type: ExportType, fileName: string, orientation?: PdfPageOrientation, allowDownload?: boolean): Promise<any>` — Export maps to image/PDF. Returns Promise. https://ej2.syncfusion.com/vue/documentation/api/maps/#export
- `print(id?: string[]|string|Element): void` — Print the maps. https://ej2.syncfusion.com/vue/documentation/api/maps/#print
- `getGeoLocation(layerIndex: number, x: number, y: number): GeoPosition` — Convert pixel to geographic coords when shape maps rendered. https://ej2.syncfusion.com/vue/documentation/api/maps/#getgeolocation
- `getTileGeoLocation(x: number, y: number): GeoPosition` — Convert pixel to geographic coords when online map provider rendered. https://ej2.syncfusion.com/vue/documentation/api/maps/#gettilegeolocation
- `zoomByPosition(centerPosition: Object, zoomFactor: number): void` — Zoom by geographic center. https://ej2.syncfusion.com/vue/documentation/api/maps/#zoombyposition
- `zoomToCoordinates(minLatitude: number, minLongitude: number, maxLatitude: number, maxLongitude: number): void` — Zoom by bounding coordinates. https://ej2.syncfusion.com/vue/documentation/api/maps/#zoomtocoordinates
- `shapeSelection(layerIndex: number, propertyName: string|string[], name: string, enable?: boolean): void` — Programmatically select/unselect shapes. https://ej2.syncfusion.com/vue/documentation/api/maps/#shapeselection
- `panByDirection(direction: PanDirection, mouseLocation?: PointerEvent | TouchEvent): void` — Pan map by direction. https://ej2.syncfusion.com/vue/documentation/api/maps/#panbydirection
- `getBingUrlTemplate(url: string): Promise<any>` — Helper for Bing maps URL. https://ej2.syncfusion.com/vue/documentation/api/maps/#getbingurltemplate

Usage example (Options API):

```vue
<script>
import { ImageExport } from '@syncfusion/ej2-vue-maps';

methods: {
     exportPNG: function() {
        let map=document.getElementById('container');
        map.ej2_instances[0].export("PNG", "Maps");
    }
}
provide: { maps: [ImageExport] },
</script>

<template>
  <ejs-maps ref="mapsRef"></ejs-maps>
  <button @click="exportPNG">Export PNG</button>
</template>
```

## Enums

### ProjectionType
Link: https://ej2.syncfusion.com/vue/documentation/api/maps/projectiontype

Values:
- Mercator
- Winkel3
- Miller
- Eckert3
- Eckert5
- Eckert6
- AitOff
- Equirectangular

### MapsTheme
Link: https://ej2.syncfusion.com/vue/documentation/api/maps/mapstheme

Common values:
- Material, Fabric, HighContrastLight, Bootstrap, MaterialDark, FabricDark, HighContrast, BootstrapDark, Bootstrap4, Tailwind, TailwindDark, Tailwind3, Tailwind3Dark, Bootstrap5, Bootstrap5Dark, Fluent, FluentDark, Material3, Material3Dark, Fluent2, Fluent2Dark, Fluent2HighContrast

### TooltipGesture
Link: https://ej2.syncfusion.com/vue/documentation/api/maps/tooltipgesture

Values:
- MouseMove, Click, DoubleClick

### PanDirection
Link: https://ej2.syncfusion.com/vue/documentation/api/maps/pandirection

Values:
- Left, Right, Top, Bottom, None

## Child Directives

Syncfusion Maps uses child directives for collections. Examples and usage:

- `LayersDirective` / `e-layers` — Collection wrapper for one or more `LayerDirective` items.
  - Usage:

```vue
<template>
  <ejs-maps>
    <e-layers>
      <e-layer :shapeData="shapeData" :shapeSettings="shapeSettings"></e-layer>
    </e-layers>
  </ejs-maps>
</template>
```

- `LayerDirective` / `e-layer` — Single layer configuration; properties include `shapeData`, `shapeSettings`, `dataSource`, `markerSettings`, `tooltipSettings`, etc.

- Marker/Annotation/Bubble child directives exist as collection items inside layers (refer to the API model pages for each directive's available properties and nesting).

## Modules / Services

- Register modules either by `Maps.Inject(...)` (Composition API) or via `provide: { maps: [ ... ] }` (Options API).
- Common modules and purposes:
  - `Legend` — Show legend for color/value mapping.
  - `DataLabel` — Show labels on shapes.
  - `MapsTooltip` — Enable tooltips.
  - `Marker` — Place marker points.
  - `Zoom` — Enable zoom/pan behaviors.
  - `Highlight` / `Selection` — Visual highlight and selection features.
  - `Bubble` — Bubble rendering for value-based bubbles.
  - `NavigationLine` — Draw navigation lines.
  - `Annotations` — Map annotations.
  - `Polygon` — Polygon support module.

## Common Usage Patterns

1) Basic map with a single layer

```vue
<script setup>
import {
  MapsComponent as EjsMaps,
  LayersDirective as ELayers,
  LayerDirective as ELayer
} from '@syncfusion/ej2-vue-maps';
import { MapAjax } from '@syncfusion/ej2-vue-maps';

const shapeData = new MapAjax('https://cdn.syncfusion.com/maps/map-data/world-map.json');
const titleSettings = { text: 'World Map' };
</script>

<template>
  <ejs-maps :titleSettings="titleSettings">
    <e-layers>
      <e-layer :shapeData="shapeData"></e-layer>
    </e-layers>
  </ejs-maps>
</template>
```

2) Map with markers and tooltips

```vue
<script setup>
import { provide } from 'vue';
import { MapsComponent as EjsMaps, LayersDirective as ELayers, LayerDirective as ELayer, MapAjax, Marker, MapsTooltip, Legend } from '@syncfusion/ej2-vue-maps';

provide('maps', [ Marker, MapsTooltip, Legend]);

const shapeData = new MapAjax('https://cdn.syncfusion.com/maps/map-data/world-map.json');

const markers = [
  { latitude: 51.5074, longitude: -0.1278, name: 'London' },
  { latitude: 48.8566, longitude: 2.3522, name: 'Paris' }
];

const markerSettings = [
  {
    visible: true,
    dataSource: markers,
    template: '<div style="color:red;font-size:18px">⬤</div>',
    tooltipSettings: {
      visible: true,
      valuePath: 'city'
    }
  }
];

const titleSettings = { text: 'Markers & Tooltips' };
</script>

<template>
  <div style="padding: 16px">
    <ejs-maps
      id="maps"
      height="450px"
      :titleSettings="titleSettings"
      :legendSettings="{ visible: false }"
    >
      <e-layers>
        <e-layer
          :shapeData="shapeData"
          :markerSettings="markerSettings"
          :tooltipSettings="{ visible: true, valuePath: 'name' }"
        />
      </e-layers>
    </ejs-maps>
  </div>
</template>
```

3) Map with legend + zoom/pan enabled

```vue
<script setup>
import {
  MapsComponent as EjsMaps,
  LayersDirective as ELayers,
  LayerDirective as ELayer,
  Legend,
  Zoom
} from '@syncfusion/ej2-vue-maps';
import { Maps } from '@syncfusion/ej2-maps';
Maps.Inject(Legend, Zoom);

const legendSettings = { visible: true };
const zoomSettings = { enable: true, enablePanning: true };
</script>

<template>
  <ejs-maps :legendSettings="legendSettings" :zoomSettings="zoomSettings">
    <e-layers>
      <e-layer :shapeData="/* shapeData */"></e-layer>
    </e-layers>
  </ejs-maps>
</template>
```

## Additional Resources

- Official Syncfusion Documentation: https://ej2.syncfusion.com/vue/documentation/
- Component Docs: https://ej2.syncfusion.com/vue/documentation/maps/
- API Reference: https://ej2.syncfusion.com/vue/documentation/api/maps/
- Getting started (Vue 3): https://ej2.syncfusion.com/vue/documentation/maps/getting-started-vue-3
