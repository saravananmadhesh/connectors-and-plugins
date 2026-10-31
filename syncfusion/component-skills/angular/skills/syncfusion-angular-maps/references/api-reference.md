# Syncfusion Angular Maps - API Reference Guide

This comprehensive guide catalogs all API references for the Syncfusion Angular Maps component. All API documentation is available at **https://ej2.syncfusion.com/angular/documentation/api/maps/**.

## Table of Contents

- [Core Component APIs](#core-component-apis)
- [Layer Configuration APIs](#layer-configuration-apis)
- [Marker APIs](#marker-apis)
- [Bubble APIs](#bubble-apis)
- [Data Label APIs](#data-label-apis)
- [Legend APIs](#legend-apis)
- [Tooltip APIs](#tooltip-apis)
- [Zoom Settings APIs](#zoom-settings-apis)
- [Selection and Highlight APIs](#selection-and-highlight-apis)
- [Color Mapping APIs](#color-mapping-apis)
- [Navigation Line APIs](#navigation-line-apis)
- [Annotation APIs](#annotation-apis)
- [Event APIs](#event-apis)
- [Enum Types](#enum-types)
- [Interface Types](#interface-types)

---

## Core Component APIs

### MapsComponent

The main Maps component that renders geographical visualizations.

| API | Type | Description | Documentation Link |
|-----|------|-------------|-------------------|
| `MapsComponent` | Class | Main maps component | [MapsComponent](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent) |
| `layers` | Property | Collection of map layers | [layers](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#layers) |
| `titleSettings` | Property | Title configuration | [titleSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#titlesettings) |
| `zoomSettings` | Property | Zoom configuration | [zoomSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#zoomsettings) |
| `legendSettings` | Property | Legend configuration | [legendSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#legendsettings) |
| `background` | Property | Map background color | [background](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#background) |
| `theme` | Property | Built-in theme selection | [theme](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#theme) |
| `width` | Property | Map width | [width](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#width) |
| `height` | Property | Map height | [height](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#height) |
| `centerPosition` | Property | Map center point | [centerPosition](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#centerposition) |
| `baseLayerIndex` | Property | Active base layer index | [baseLayerIndex](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#baselayerindex) |
| `mapsArea` | Property | Map area border and background | [mapsArea](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#mapsarea) |
| `margin` | Property | Map margins | [margin](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#margin) |
| `border` | Property | Map border styling | [border](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#border) |
| `projectionType` | Property | Map projection type | [projectionType](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#projectiontype) |
| `enablePersistence` | Property | Persist component state | [enablePersistence](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#enablepersistence) |
| `enableRtl` | Property | Right-to-left rendering | [enableRtl](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#enablertl) |
| `locale` | Property | Localization culture | [locale](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#locale) |
| `print()` | Method | Print map | [print](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#print) |
| `export()` | Method | Export map as image/PDF | [export](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#export) |
| `refresh()` | Method | Refresh map rendering | [refresh](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#refresh) |
| `addLayer()` | Method | Add new layer dynamically | [addlayer](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#addlayer) |
| `removeLayer()` | Method | Remove layer by index | [removelayer](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#removelayer) |

---

## Layer Configuration APIs

### LayerSettings

Configuration for map layers (base layer and sublayers).

| API | Type | Description | Documentation Link |
|-----|------|-------------|-------------------|
| `LayerSettings` | Class | Layer configuration model | [LayerSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings) |
| `shapeData` | Property | GeoJSON shape data | [shapeData](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#shapedata) |
| `dataSource` | Property | External data source | [dataSource](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#datasource) |
| `shapeDataPath` | Property | Data field for shape matching | [shapeDataPath](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#shapedatapath) |
| `shapePropertyPath` | Property | GeoJSON property for matching | [shapePropertyPath](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#shapepropertypath) |
| `type` | Property | Layer type (Layer/SubLayer) | [type](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#type) |
| `geometryType` | Property | Geometry type (Geographic/Normal) | [geometryType](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#geometrytype) |
| `urlTemplate` | Property | Map tile URL template | [urlTemplate](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#urltemplate) |
| `visible` | Property | Show/hide layer | [visible](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#visible) |
| `shapeSettings` | Property | Shape styling configuration | [shapeSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#shapesettings) |
| `markerSettings` | Property | Marker configuration array | [markerSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#markersettings) |
| `bubbleSettings` | Property | Bubble configuration array | [bubbleSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#bubblesettings) |
| `dataLabelSettings` | Property | Data label configuration | [dataLabelSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#datalabelsettings) |
| `navigationLineSettings` | Property | Navigation line array | [navigationLineSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#navigationlinesettings) |
| `tooltipSettings` | Property | Tooltip configuration | [tooltipSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#tooltipsettings) |
| `selectionSettings` | Property | Selection configuration | [selectionSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#selectionsettings) |
| `highlightSettings` | Property | Highlight configuration | [highlightSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#highlightsettings) |
| `animationDuration` | Property | Animation duration (ms) | [animationDuration](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#animationduration) |

### ShapeSettings

Shape styling and color mapping configuration.

| API | Type | Description | Documentation Link |
|-----|------|-------------|-------------------|
| `ShapeSettings` | Class | Shape configuration model | [ShapeSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/shapeSettings) |
| `fill` | Property | Shape fill color | [fill](https://ej2.syncfusion.com/angular/documentation/api/maps/shapeSettings#fill) |
| `palette` | Property | Color palette array | [palette](https://ej2.syncfusion.com/angular/documentation/api/maps/shapeSettings#palette) |
| `border` | Property | Shape border styling | [border](https://ej2.syncfusion.com/angular/documentation/api/maps/shapeSettings#border) |
| `dashArray` | Property | Border dash pattern | [dashArray](https://ej2.syncfusion.com/angular/documentation/api/maps/shapeSettings#dasharray) |
| `opacity` | Property | Shape opacity (0-1) | [opacity](https://ej2.syncfusion.com/angular/documentation/api/maps/shapeSettings#opacity) |
| `colorValuePath` | Property | Data field for color mapping | [colorValuePath](https://ej2.syncfusion.com/angular/documentation/api/maps/shapeSettings#colorvaluepath) |
| `valuePath` | Property | Data field for shape values | [valuePath](https://ej2.syncfusion.com/angular/documentation/api/maps/shapeSettings#valuepath) |
| `colorMapping` | Property | Color mapping configuration | [colorMapping](https://ej2.syncfusion.com/angular/documentation/api/maps/shapeSettings#colormapping) |
| `autofill` | Property | Automatic palette coloring | [autofill](https://ej2.syncfusion.com/angular/documentation/api/maps/shapeSettings#autofill) |

---

## Marker APIs

### MarkerSettings

Configuration for map markers.

| API | Type | Description | Documentation Link |
|-----|------|-------------|-------------------|
| `MarkerSettings` | Class | Marker configuration model | [MarkerSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/markerSettings) |
| `dataSource` | Property | Marker data array | [dataSource](https://ej2.syncfusion.com/angular/documentation/api/maps/markerSettings#datasource) |
| `visible` | Property | Show/hide markers | [visible](https://ej2.syncfusion.com/angular/documentation/api/maps/markerSettings#visible) |
| `shape` | Property | Marker shape (Balloon, Circle, etc.) | [shape](https://ej2.syncfusion.com/angular/documentation/api/maps/markerSettings#shape) |
| `width` | Property | Marker width | [width](https://ej2.syncfusion.com/angular/documentation/api/maps/markerSettings#width) |
| `height` | Property | Marker height | [height](https://ej2.syncfusion.com/angular/documentation/api/maps/markerSettings#height) |
| `fill` | Property | Marker fill color | [fill](https://ej2.syncfusion.com/angular/documentation/api/maps/markerSettings#fill) |
| `border` | Property | Marker border styling | [border](https://ej2.syncfusion.com/angular/documentation/api/maps/markerSettings#border) |
| `offset` | Property | Marker offset position | [offset](https://ej2.syncfusion.com/angular/documentation/api/maps/markerSettings#offset) |
| `latitudeValuePath` | Property | Data field for latitude | [latitudeValuePath](https://ej2.syncfusion.com/angular/documentation/api/maps/markerSettings#latitudevaluepath) |
| `longitudeValuePath` | Property | Data field for longitude | [longitudeValuePath](https://ej2.syncfusion.com/angular/documentation/api/maps/markerSettings#longitudevaluepath) |
| `template` | Property | Custom marker template | [template](https://ej2.syncfusion.com/angular/documentation/api/maps/markerSettings#template) |
| `tooltipSettings` | Property | Marker tooltip configuration | [tooltipSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/markerSettings#tooltipsettings) |
| `animationDuration` | Property | Marker animation duration | [animationDuration](https://ej2.syncfusion.com/angular/documentation/api/maps/markerSettings#animationduration) |
| `animationDelay` | Property | Marker animation delay | [animationDelay](https://ej2.syncfusion.com/angular/documentation/api/maps/markerSettings#animationdelay) |
| `imageUrl` | Property | Image URL for Image marker | [imageUrl](https://ej2.syncfusion.com/angular/documentation/api/maps/markerSettings#imageurl) |
| `legendText` | Property | Legend text for marker | [legendText](https://ej2.syncfusion.com/angular/documentation/api/maps/markerSettings#legendtext) |

---

## Bubble APIs

### BubbleSettings

Configuration for data bubbles on the map.

| API | Type | Description | Documentation Link |
|-----|------|-------------|-------------------|
| `BubbleSettings` | Class | Bubble configuration model | [BubbleSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/bubbleSettings) |
| `dataSource` | Property | Bubble data array | [dataSource](https://ej2.syncfusion.com/angular/documentation/api/maps/bubbleSettings#datasource) |
| `visible` | Property | Show/hide bubbles | [visible](https://ej2.syncfusion.com/angular/documentation/api/maps/bubbleSettings#visible) |
| `valuePath` | Property | Data field for bubble size | [valuePath](https://ej2.syncfusion.com/angular/documentation/api/maps/bubbleSettings#valuepath) |
| `minRadius` | Property | Minimum bubble radius | [minRadius](https://ej2.syncfusion.com/angular/documentation/api/maps/bubbleSettings#minradius) |
| `maxRadius` | Property | Maximum bubble radius | [maxRadius](https://ej2.syncfusion.com/angular/documentation/api/maps/bubbleSettings#maxradius) |
| `fill` | Property | Bubble fill color | [fill](https://ej2.syncfusion.com/angular/documentation/api/maps/bubbleSettings#fill) |
| `border` | Property | Bubble border styling | [border](https://ej2.syncfusion.com/angular/documentation/api/maps/bubbleSettings#border) |
| `opacity` | Property | Bubble opacity (0-1) | [opacity](https://ej2.syncfusion.com/angular/documentation/api/maps/bubbleSettings#opacity) |
| `bubbleType` | Property | Bubble type (Circle/Square) | [bubbleType](https://ej2.syncfusion.com/angular/documentation/api/maps/bubbleSettings#bubbletype) |
| `colorValuePath` | Property | Data field for color mapping | [colorValuePath](https://ej2.syncfusion.com/angular/documentation/api/maps/bubbleSettings#colorvaluepath) |
| `colorMapping` | Property | Color mapping configuration | [colorMapping](https://ej2.syncfusion.com/angular/documentation/api/maps/bubbleSettings#colormapping) |
| `tooltipSettings` | Property | Bubble tooltip configuration | [tooltipSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/bubbleSettings#tooltipsettings) |
| `selectionSettings` | Property | Bubble selection settings | [selectionSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/bubbleSettings#selectionsettings) |
| `highlightSettings` | Property | Bubble highlight settings | [highlightSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/bubbleSettings#highlightsettings) |

---

## Data Label APIs

### DataLabelSettings

Configuration for data labels on shapes.

| API | Type | Description | Documentation Link |
|-----|------|-------------|-------------------|
| `DataLabelSettings` | Class | Data label model | [DataLabelSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/dataLabelSettings) |
| `visible` | Property | Show/hide data labels | [visible](https://ej2.syncfusion.com/angular/documentation/api/maps/dataLabelSettings#visible) |
| `labelPath` | Property | Data field for label text | [labelPath](https://ej2.syncfusion.com/angular/documentation/api/maps/dataLabelSettings#labelpath) |
| `smartLabelMode` | Property | Label overlap handling | [smartLabelMode](https://ej2.syncfusion.com/angular/documentation/api/maps/dataLabelSettings#smartlabelmode) |
| `intersectionAction` | Property | Overlap intersection action | [intersectionAction](https://ej2.syncfusion.com/angular/documentation/api/maps/dataLabelSettings#intersectionaction) |
| `fill` | Property | Label background color | [fill](https://ej2.syncfusion.com/angular/documentation/api/maps/dataLabelSettings#fill) |
| `border` | Property | Label border styling | [border](https://ej2.syncfusion.com/angular/documentation/api/maps/dataLabelSettings#border) |
| `opacity` | Property | Label opacity | [opacity](https://ej2.syncfusion.com/angular/documentation/api/maps/dataLabelSettings#opacity) |
| `textStyle` | Property | Label text styling | [textStyle](https://ej2.syncfusion.com/angular/documentation/api/maps/dataLabelSettings#textstyle) |
| `template` | Property | Custom label template | [template](https://ej2.syncfusion.com/angular/documentation/api/maps/dataLabelSettings#template) |

---

## Legend APIs

### LegendSettings

Legend configuration for maps.

| API | Type | Description | Documentation Link |
|-----|------|-------------|-------------------|
| `LegendSettings` | Class | Legend model | [LegendSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/legendSettings) |
| `visible` | Property | Show/hide legend | [visible](https://ej2.syncfusion.com/angular/documentation/api/maps/legendSettings#visible) |
| `position` | Property | Legend position | [position](https://ej2.syncfusion.com/angular/documentation/api/maps/legendSettings#position) |
| `alignment` | Property | Legend alignment | [alignment](https://ej2.syncfusion.com/angular/documentation/api/maps/legendSettings#alignment) |
| `orientation` | Property | Legend orientation | [orientation](https://ej2.syncfusion.com/angular/documentation/api/maps/legendSettings#orientation) |
| `height` | Property | Legend height | [height](https://ej2.syncfusion.com/angular/documentation/api/maps/legendSettings#height) |
| `width` | Property | Legend width | [width](https://ej2.syncfusion.com/angular/documentation/api/maps/legendSettings#width) |
| `type` | Property | Legend type (Layers/Bubbles/Markers) | [type](https://ej2.syncfusion.com/angular/documentation/api/maps/legendSettings#type) |
| `mode` | Property | Legend mode (Default/Interactive) | [mode](https://ej2.syncfusion.com/angular/documentation/api/maps/legendSettings#mode) |
| `shape` | Property | Legend icon shape | [shape](https://ej2.syncfusion.com/angular/documentation/api/maps/legendSettings#shape) |
| `shapeHeight` | Property | Legend icon height | [shapeHeight](https://ej2.syncfusion.com/angular/documentation/api/maps/legendSettings#shapeheight) |
| `shapeWidth` | Property | Legend icon width | [shapeWidth](https://ej2.syncfusion.com/angular/documentation/api/maps/legendSettings#shapewidth) |
| `shapePadding` | Property | Icon-text spacing | [shapePadding](https://ej2.syncfusion.com/angular/documentation/api/maps/legendSettings#shapepadding) |
| `background` | Property | Legend background | [background](https://ej2.syncfusion.com/angular/documentation/api/maps/legendSettings#background) |
| `border` | Property | Legend border styling | [border](https://ej2.syncfusion.com/angular/documentation/api/maps/legendSettings#border) |
| `textStyle` | Property | Legend text styling | [textStyle](https://ej2.syncfusion.com/angular/documentation/api/maps/legendSettings#textstyle) |
| `title` | Property | Legend title | [title](https://ej2.syncfusion.com/angular/documentation/api/maps/legendSettings#title) |
| `titleStyle` | Property | Title text styling | [titleStyle](https://ej2.syncfusion.com/angular/documentation/api/maps/legendSettings#titlestyle) |
| `toggleLegendSettings` | Property | Interactive legend settings | [toggleLegendSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/legendSettings#togglelegendsettings) |

---

## Tooltip APIs

### TooltipSettings

Tooltip configuration for maps.

| API | Type | Description | Documentation Link |
|-----|------|-------------|-------------------|
| `TooltipSettings` | Class | Tooltip model | [TooltipSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/tooltipSettings) |
| `visible` | Property | Show/hide tooltip | [visible](https://ej2.syncfusion.com/angular/documentation/api/maps/tooltipSettings#visible) |
| `format` | Property | Tooltip text format | [format](https://ej2.syncfusion.com/angular/documentation/api/maps/tooltipSettings#format) |
| `template` | Property | Custom tooltip template | [template](https://ej2.syncfusion.com/angular/documentation/api/maps/tooltipSettings#template) |
| `fill` | Property | Tooltip background color | [fill](https://ej2.syncfusion.com/angular/documentation/api/maps/tooltipSettings#fill) |
| `border` | Property | Tooltip border styling | [border](https://ej2.syncfusion.com/angular/documentation/api/maps/tooltipSettings#border) |
| `textStyle` | Property | Tooltip text styling | [textStyle](https://ej2.syncfusion.com/angular/documentation/api/maps/tooltipSettings#textstyle) |
| `valuePath` | Property | Data field for tooltip | [valuePath](https://ej2.syncfusion.com/angular/documentation/api/maps/tooltipSettings#valuepath) |

---

## Zoom Settings APIs

### ZoomSettings

Zoom and pan configuration.

| API | Type | Description | Documentation Link |
|-----|------|-------------|-------------------|
| `ZoomSettings` | Class | Zoom configuration model | [ZoomSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/zoomSettings) |
| `enable` | Property | Enable/disable zooming | [enable](https://ej2.syncfusion.com/angular/documentation/api/maps/zoomSettings#enable) |
| `zoomFactor` | Property | Zoom level factor | [zoomFactor](https://ej2.syncfusion.com/angular/documentation/api/maps/zoomSettings#zoomfactor) |
| `minZoom` | Property | Minimum zoom level | [minZoom](https://ej2.syncfusion.com/angular/documentation/api/maps/zoomSettings#minzoom) |
| `maxZoom` | Property | Maximum zoom level | [maxZoom](https://ej2.syncfusion.com/angular/documentation/api/maps/zoomSettings#maxzoom) |
| `mouseWheelZoom` | Property | Enable mouse wheel zoom | [mouseWheelZoom](https://ej2.syncfusion.com/angular/documentation/api/maps/zoomSettings#mousewheelzoom) |
| `doubleClickZoom` | Property | Enable double-click zoom | [doubleClickZoom](https://ej2.syncfusion.com/angular/documentation/api/maps/zoomSettings#doubleclickzoom) |
| `pinchZoom` | Property | Enable pinch zoom | [pinchZoom](https://ej2.syncfusion.com/angular/documentation/api/maps/zoomSettings#pinchzoom) |
| `zoomOnClick` | Property | Enable click-to-zoom | [zoomOnClick](https://ej2.syncfusion.com/angular/documentation/api/maps/zoomSettings#zoomonclick) |
| `toolbars` | Property | Zoom toolbar buttons | [toolbars](https://ej2.syncfusion.com/angular/documentation/api/maps/zoomSettings#toolbars) |
| `horizontalAlignment` | Property | Toolbar horizontal position | [horizontalAlignment](https://ej2.syncfusion.com/angular/documentation/api/maps/zoomSettings#horizontalalignment) |
| `verticalAlignment` | Property | Toolbar vertical position | [verticalAlignment](https://ej2.syncfusion.com/angular/documentation/api/maps/zoomSettings#verticalalignment) |
| `toolBarOrientation` | Property | Toolbar orientation | [toolBarOrientation](https://ej2.syncfusion.com/angular/documentation/api/maps/zoomSettings#toolbarorientation) |
| `color` | Property | Toolbar button color | [color](https://ej2.syncfusion.com/angular/documentation/api/maps/zoomSettings#color) |
| `highlightColor` | Property | Toolbar highlight color | [highlightColor](https://ej2.syncfusion.com/angular/documentation/api/maps/zoomSettings#highlightcolor) |
| `selectionColor` | Property | Toolbar selection color | [selectionColor](https://ej2.syncfusion.com/angular/documentation/api/maps/zoomSettings#selectioncolor) |

---

## Selection and Highlight APIs

### SelectionSettings

Shape selection configuration.

| API | Type | Description | Documentation Link |
|-----|------|-------------|-------------------|
| `SelectionSettings` | Class | Selection model | [SelectionSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/selectionSettings) |
| `enable` | Property | Enable/disable selection | [enable](https://ej2.syncfusion.com/angular/documentation/api/maps/selectionSettings#enable) |
| `fill` | Property | Selection fill color | [fill](https://ej2.syncfusion.com/angular/documentation/api/maps/selectionSettings#fill) |
| `opacity` | Property | Selection opacity | [opacity](https://ej2.syncfusion.com/angular/documentation/api/maps/selectionSettings#opacity) |
| `enableMultiSelect` | Property | Enable multiple selection | [enableMultiSelect](https://ej2.syncfusion.com/angular/documentation/api/maps/selectionSettings#enablemultiselect) |
| `border` | Property | Selection border styling | [border](https://ej2.syncfusion.com/angular/documentation/api/maps/selectionSettings#border) |

### HighlightSettings

Shape highlight configuration.

| API | Type | Description | Documentation Link |
|-----|------|-------------|-------------------|
| `HighlightSettings` | Class | Highlight model | [HighlightSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/highlightSettings) |
| `enable` | Property | Enable/disable highlight | [enable](https://ej2.syncfusion.com/angular/documentation/api/maps/highlightSettings#enable) |
| `fill` | Property | Highlight fill color | [fill](https://ej2.syncfusion.com/angular/documentation/api/maps/highlightSettings#fill) |
| `opacity` | Property | Highlight opacity | [opacity](https://ej2.syncfusion.com/angular/documentation/api/maps/highlightSettings#opacity) |
| `border` | Property | Highlight border styling | [border](https://ej2.syncfusion.com/angular/documentation/api/maps/highlightSettings#border) |

---

## Color Mapping APIs

### ColorMapping

Color mapping configuration for choropleth maps.

| API | Type | Description | Documentation Link |
|-----|------|-------------|-------------------|
| `ColorMappingSettings` | Class | Color mapping model | [ColorMappingSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/colorMappingSettings) |
| `from` | Property | Range start value | [from](https://ej2.syncfusion.com/angular/documentation/api/maps/colorMappingSettings#from) |
| `to` | Property | Range end value | [to](https://ej2.syncfusion.com/angular/documentation/api/maps/colorMappingSettings#to) |
| `value` | Property | Equal color mapping value | [value](https://ej2.syncfusion.com/angular/documentation/api/maps/colorMappingSettings#value) |
| `color` | Property | Mapping color | [color](https://ej2.syncfusion.com/angular/documentation/api/maps/colorMappingSettings#color) |
| `label` | Property | Legend label text | [label](https://ej2.syncfusion.com/angular/documentation/api/maps/colorMappingSettings#label) |
| `minOpacity` | Property | Minimum opacity (desaturation) | [minOpacity](https://ej2.syncfusion.com/angular/documentation/api/maps/colorMappingSettings#minopacity) |
| `maxOpacity` | Property | Maximum opacity (desaturation) | [maxOpacity](https://ej2.syncfusion.com/angular/documentation/api/maps/colorMappingSettings#maxopacity) |
| `showLegend` | Property | Show in legend | [showLegend](https://ej2.syncfusion.com/angular/documentation/api/maps/colorMappingSettings#showlegend) |

---

## Navigation Line APIs

### NavigationLineSettings

Configuration for drawing lines between locations.

| API | Type | Description | Documentation Link |
|-----|------|-------------|-------------------|
| `NavigationLineSettings` | Class | Navigation line model | [NavigationLineSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/navigationLineSettings) |
| `visible` | Property | Show/hide navigation line | [visible](https://ej2.syncfusion.com/angular/documentation/api/maps/navigationLineSettings#visible) |
| `latitude` | Property | Start latitude array | [latitude](https://ej2.syncfusion.com/angular/documentation/api/maps/navigationLineSettings#latitude) |
| `longitude` | Property | Start longitude array | [longitude](https://ej2.syncfusion.com/angular/documentation/api/maps/navigationLineSettings#longitude) |
| `color` | Property | Line color | [color](https://ej2.syncfusion.com/angular/documentation/api/maps/navigationLineSettings#color) |
| `width` | Property | Line width | [width](https://ej2.syncfusion.com/angular/documentation/api/maps/navigationLineSettings#width) |
| `angle` | Property | Line angle/curve | [angle](https://ej2.syncfusion.com/angular/documentation/api/maps/navigationLineSettings#angle) |
| `dashArray` | Property | Line dash pattern | [dashArray](https://ej2.syncfusion.com/angular/documentation/api/maps/navigationLineSettings#dasharray) |
| `highlightSettings` | Property | Line highlight settings | [highlightSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/navigationLineSettings#highlightsettings) |
| `selectionSettings` | Property | Line selection settings | [selectionSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/navigationLineSettings#selectionsettings) |

---

## Annotation APIs

### Annotation

Configuration for custom HTML annotations.

| API | Type | Description | Documentation Link |
|-----|------|-------------|-------------------|
| `Annotation` | Class | Annotation model | [Annotation](https://ej2.syncfusion.com/angular/documentation/api/maps/annotation) |
| `content` | Property | Annotation HTML content | [content](https://ej2.syncfusion.com/angular/documentation/api/maps/annotation#content) |
| `x` | Property | X position | [x](https://ej2.syncfusion.com/angular/documentation/api/maps/annotation#x) |
| `y` | Property | Y position | [y](https://ej2.syncfusion.com/angular/documentation/api/maps/annotation#y) |
| `verticalAlignment` | Property | Vertical alignment | [verticalAlignment](https://ej2.syncfusion.com/angular/documentation/api/maps/annotation#verticalalignment) |
| `horizontalAlignment` | Property | Horizontal alignment | [horizontalAlignment](https://ej2.syncfusion.com/angular/documentation/api/maps/annotation#horizontalalignment) |
| `zIndex` | Property | Z-index ordering | [zIndex](https://ej2.syncfusion.com/angular/documentation/api/maps/annotation#zindex) |

---

## Event APIs

### Map Events

| Event | Description | Event Args | Documentation Link |
|-------|-------------|------------|-------------------|
| `load` | Fires before map loads | `ILoadEventArgs` | [load](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#load) |
| `loaded` | Fires after map loads | `ILoadedEventArgs` | [loaded](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#loaded) |
| `shapeSelected` | Fires on shape selection | `IShapeSelectedEventArgs` | [shapeSelected](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#shapeselected) |
| `shapeHighlight` | Fires on shape highlight | `IShapeSelectedEventArgs` | [shapeHighlight](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#shapehighlight) |
| `itemSelection` | Fires on legend item selection | `ILegendItemRenderingEventArgs` | [itemSelection](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#itemselection) |
| `itemHighlight` | Fires on legend item highlight | `ILegendItemRenderingEventArgs` | [itemHighlight](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#itemhighlight) |
| `markerClick` | Fires on marker click | `IMarkerClickEventArgs` | [markerClick](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#markerclick) |
| `markerMouseMove` | Fires on marker hover | `IMarkerMoveEventArgs` | [markerMouseMove](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#markermousemove) |
| `bubbleClick` | Fires on bubble click | `IBubbleClickEventArgs` | [bubbleClick](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#bubbleclick) |
| `bubbleMouseMove` | Fires on bubble hover | `IBubbleMoveEventArgs` | [bubbleMouseMove](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#bubblemousemove) |
| `click` | Fires on map click | `IMouseEventArgs` | [click](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#click) |
| `doubleClick` | Fires on double-click | `IMouseEventArgs` | [doubleClick](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#doubleclick) |
| `rightClick` | Fires on right-click | `IMouseEventArgs` | [rightClick](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#rightclick) |
| `zoom` | Fires during zoom | `IMapZoomEventArgs` | [zoom](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#zoom) |
| `pan` | Fires during pan | `IMapPanEventArgs` | [pan](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#pan) |
| `tooltipRender` | Fires before tooltip renders | `ITooltipRenderEventArgs` | [tooltipRender](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#tooltiprender) |
| `layerRendering` | Fires before layer renders | `ILayerRenderingEventArgs` | [layerRendering](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#layerrendering) |
| `shapeRendering` | Fires before shape renders | `IShapeRenderingEventArgs` | [shapeRendering](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#shaperendering) |
| `markerRendering` | Fires before marker renders | `IMarkerRenderingEventArgs` | [markerRendering](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#markerrendering) |
| `bubbleRendering` | Fires before bubble renders | `IBubbleRenderingEventArgs` | [bubbleRendering](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#bubblerendering) |
| `dataLabelRendering` | Fires before label renders | `IDataLabelRenderingEventArgs` | [dataLabelRendering](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#datalabelrendering) |
| `legendRendering` | Fires before legend renders | `ILegendRenderingEventArgs` | [legendRendering](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#legendrendering) |
| `annotationRendering` | Fires before annotation renders | `IAnnotationRenderingEventArgs` | [annotationRendering](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#annotationrendering) |
| `beforePrint` | Fires before print | `IPrintEventArgs` | [beforePrint](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#beforeprint) |
| `resize` | Fires on map resize | `IResizeEventArgs` | [resize](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#resize) |

---

## Enum Types

### Projection Types

Map projection options.

| Value | Description | Documentation Link |
|-------|-------------|-------------------|
| `Mercator` | Mercator projection | [ProjectionType](https://ej2.syncfusion.com/angular/documentation/api/maps/projectionType) |
| `Equirectangular` | Equirectangular projection | [ProjectionType](https://ej2.syncfusion.com/angular/documentation/api/maps/projectionType) |
| `Miller` | Miller projection | [ProjectionType](https://ej2.syncfusion.com/angular/documentation/api/maps/projectionType) |
| `Eckert3` | Eckert III projection | [ProjectionType](https://ej2.syncfusion.com/angular/documentation/api/maps/projectionType) |
| `Eckert5` | Eckert V projection | [ProjectionType](https://ej2.syncfusion.com/angular/documentation/api/maps/projectionType) |
| `Eckert6` | Eckert VI projection | [ProjectionType](https://ej2.syncfusion.com/angular/documentation/api/maps/projectionType) |
| `Winkel3` | Winkel Tripel projection | [ProjectionType](https://ej2.syncfusion.com/angular/documentation/api/maps/projectionType) |
| `AitOff` | Aitoff projection | [ProjectionType](https://ej2.syncfusion.com/angular/documentation/api/maps/projectionType) |

### MarkerType

Marker shape options.

| Value | Description | Documentation Link |
|-------|-------------|-------------------|
| `Balloon` | Balloon marker | [MarkerType](https://ej2.syncfusion.com/angular/documentation/api/maps/markerType) |
| `Circle` | Circle marker | [MarkerType](https://ej2.syncfusion.com/angular/documentation/api/maps/markerType) |
| `Cross` | Cross marker | [MarkerType](https://ej2.syncfusion.com/angular/documentation/api/maps/markerType) |
| `Diamond` | Diamond marker | [MarkerType](https://ej2.syncfusion.com/angular/documentation/api/maps/markerType) |
| `Image` | Image marker | [MarkerType](https://ej2.syncfusion.com/angular/documentation/api/maps/markerType) |
| `Rectangle` | Rectangle marker | [MarkerType](https://ej2.syncfusion.com/angular/documentation/api/maps/markerType) |
| `Star` | Star marker | [MarkerType](https://ej2.syncfusion.com/angular/documentation/api/maps/markerType) |
| `Triangle` | Triangle marker | [MarkerType](https://ej2.syncfusion.com/angular/documentation/api/maps/markerType) |

### LayerType

Layer type options.

| Value | Description | Documentation Link |
|-------|-------------|-------------------|
| `Layer` | Base layer | [LayerType](https://ej2.syncfusion.com/angular/documentation/api/maps/layerType) |
| `SubLayer` | Sublayer | [LayerType](https://ej2.syncfusion.com/angular/documentation/api/maps/layerType) |

### GeometryType

Geometry type for rendering.

| Value | Description | Documentation Link |
|-------|-------------|-------------------|
| `Geographic` | Geographic coordinates | [GeometryType](https://ej2.syncfusion.com/angular/documentation/api/maps/geometryType) |
| `Normal` | Normal coordinates (for custom shapes) | [GeometryType](https://ej2.syncfusion.com/angular/documentation/api/maps/geometryType) |

### LegendMode

Legend interaction modes.

| Value | Description | Documentation Link |
|-------|-------------|-------------------|
| `Default` | Default legend | [LegendMode](https://ej2.syncfusion.com/angular/documentation/api/maps/legendMode) |
| `Interactive` | Interactive legend with toggle | [LegendMode](https://ej2.syncfusion.com/angular/documentation/api/maps/legendMode) |

### LegendType

Legend element type.

| Value | Description | Documentation Link |
|-------|-------------|-------------------|
| `Layers` | Layer shapes legend | [LegendType](https://ej2.syncfusion.com/angular/documentation/api/maps/legendType) |
| `Bubbles` | Bubble legend | [LegendType](https://ej2.syncfusion.com/angular/documentation/api/maps/legendType) |
| `Markers` | Marker legend | [LegendType](https://ej2.syncfusion.com/angular/documentation/api/maps/legendType) |

---

## Interface Types

### Event Argument Interfaces

| Interface | Purpose | Documentation Link |
|-----------|---------|-------------------|
| `ILoadEventArgs` | Load event arguments | [ILoadEventArgs](https://ej2.syncfusion.com/angular/documentation/api/maps/iLoadEventArgs) |
| `ILoadedEventArgs` | Loaded event arguments | [ILoadedEventArgs](https://ej2.syncfusion.com/angular/documentation/api/maps/iLoadedEventArgs) |
| `IShapeSelectedEventArgs` | Shape selection/highlight event | [IShapeSelectedEventArgs](https://ej2.syncfusion.com/angular/documentation/api/maps/iShapeSelectedEventArgs) |
| `IMarkerClickEventArgs` | Marker click event | [IMarkerClickEventArgs](https://ej2.syncfusion.com/angular/documentation/api/maps/iMarkerClickEventArgs) |
| `IMarkerMoveEventArgs` | Marker mouse move event | [IMarkerMoveEventArgs](https://ej2.syncfusion.com/angular/documentation/api/maps/iMarkerMoveEventArgs) |
| `IBubbleClickEventArgs` | Bubble click event | [IBubbleClickEventArgs](https://ej2.syncfusion.com/angular/documentation/api/maps/iBubbleClickEventArgs) |
| `IBubbleMoveEventArgs` | Bubble mouse move event | [IBubbleMoveEventArgs](https://ej2.syncfusion.com/angular/documentation/api/maps/iBubbleMoveEventArgs) |
| `IMouseEventArgs` | Mouse event arguments | [IMouseEventArgs](https://ej2.syncfusion.com/angular/documentation/api/maps/iMouseEventArgs) |
| `IMapZoomEventArgs` | Zoom event arguments | [IMapZoomEventArgs](https://ej2.syncfusion.com/angular/documentation/api/maps/iMapZoomEventArgs) |
| `IMapPanEventArgs` | Pan event arguments | [IMapPanEventArgs](https://ej2.syncfusion.com/angular/documentation/api/maps/iMapPanEventArgs) |
| `ITooltipRenderEventArgs` | Tooltip render customization | [ITooltipRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/maps/iTooltipRenderEventArgs) |
| `IShapeRenderingEventArgs` | Shape render customization | [IShapeRenderingEventArgs](https://ej2.syncfusion.com/angular/documentation/api/maps/iShapeRenderingEventArgs) |
| `IMarkerRenderingEventArgs` | Marker render customization | [IMarkerRenderingEventArgs](https://ej2.syncfusion.com/angular/documentation/api/maps/iMarkerRenderingEventArgs) |
| `ILegendRenderingEventArgs` | Legend render customization | [ILegendRenderingEventArgs](https://ej2.syncfusion.com/angular/documentation/api/maps/iLegendRenderingEventArgs) |

### Model Interfaces

| Interface | Purpose | Documentation Link |
|-----------|---------|-------------------|
| `MapsModel` | Maps model interface | [MapsModel](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsModel) |
| `LayerSettingsModel` | Layer model interface | [LayerSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettingsModel) |
| `MarkerSettingsModel` | Marker model interface | [MarkerSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/maps/markerSettingsModel) |
| `BubbleSettingsModel` | Bubble model interface | [BubbleSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/maps/bubbleSettingsModel) |
| `ZoomSettingsModel` | Zoom model interface | [ZoomSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/maps/zoomSettingsModel) |
| `LegendSettingsModel` | Legend model interface | [LegendSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/maps/legendSettingsModel) |
| `TooltipSettingsModel` | Tooltip model interface | [TooltipSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/maps/tooltipSettingsModel) |

---

## Quick Reference Links

### Essential APIs
- **MapsComponent**: https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent
- **LayerSettings**: https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings
- **MarkerSettings**: https://ej2.syncfusion.com/angular/documentation/api/maps/markerSettings
- **BubbleSettings**: https://ej2.syncfusion.com/angular/documentation/api/maps/bubbleSettings
- **ZoomSettings**: https://ej2.syncfusion.com/angular/documentation/api/maps/zoomSettings
- **LegendSettings**: https://ej2.syncfusion.com/angular/documentation/api/maps/legendSettings

### Getting Started
- **Main Index**: https://ej2.syncfusion.com/angular/documentation/api/maps/index-default
- **Getting Started Guide**: https://ej2.syncfusion.com/angular/documentation/maps/getting-started

---

**Navigation Tips:**
- All links point to the official Syncfusion EJ2 Angular documentation
- Use Ctrl+F to search this document for specific APIs
- Click any "Documentation Link" to open the full API reference online
- Refer to interface types for TypeScript type definitions
