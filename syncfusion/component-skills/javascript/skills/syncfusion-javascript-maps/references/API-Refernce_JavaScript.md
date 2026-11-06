# Maps API Reference (JavaScript)

Complete API reference for the Syncfusion JavaScript Maps ([`Syncfusion.EJ2.Maps.Maps`](https://ej2.syncfusion.com/javascript/documentation/api/maps/)) component.

- **Base API Documentation:** [Maps](https://ej2.syncfusion.com/javascript/documentation/api/maps/)
- **Namespace:** `Syncfusion.EJ2.Maps`
- **Assembly:** `Syncfusion.EJ2.dll`

- [Constructor](#constructor)
- [Core Configuration Properties](#core-configuration-properties)
- [Display and Layout Properties](#display-and-layout-properties)
- [Map Content Properties](#map-content-properties)
- [Interaction and Customization Properties](#interaction-and-customization-properties)
- [Advanced Features](#advanced-features)
- [Methods](#methods)
- [Events](#events)
- [Related Settings Classes](#related-settings-classes)
- [Common Usage Patterns](#common-usage-patterns)
- [Notes](#notes)

---

## Constructor

### [Maps()](https://ej2.syncfusion.com/javascript/documentation/api/maps/)
Creates a new instance of the Maps component.

---

## Core Configuration Properties

- **[`allowImageExport`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#allowimageexport)** (boolean): Enables or disables the export to image functionality in maps. **Default:** false
- **[`allowPdfExport`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#allowpdfexport)** (boolean): Enables or disables the export to PDF functionality in maps. **Default:** false
- **[`allowPrint`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#allowprint)** (boolean): Enables or disables the print functionality in maps. **Default:** false
- **[`baseLayerIndex`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#baselayerindex)** (number): Gets or sets the index of the layer of maps which will be the base layer. It provides the option to select which layer to be visible in the maps. **Default:** 0
- **[`enablePersistence`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#enablepersistence)** (boolean): Enable or disable persisting component's state between page reloads. **Default:** false
- **[`enableRtl`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#enablertl)** (boolean): Enable or disable rendering component in right to left direction. **Default:** false
- **[`tabIndex`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#tabindex)** (number): Gets or sets the tab index value for the maps. **Default:** 0
- **[`useGroupingSeparator`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#usegroupingseparator)** (boolean): Enables or disables the visibility state of the separator for grouping. **Default:** false
- **[`projectionType`](https://ej2.syncfusion.com/javascript/documentation/api/maps/projectiontype)** (ProjectionType): Gets or sets the projection with which the maps will be rendered to show the two-dimensional curved surface of a globe on a plane. **Default:** Mercator
- **[`theme`](https://ej2.syncfusion.com/javascript/documentation/api/maps/mapstheme)** (MapsTheme): Gets or sets the theme styles supported for maps. When the theme is set, the styles associated with the theme will be set in the maps. **Default:** Material
- **[`tooltipDisplayMode`](https://ej2.syncfusion.com/javascript/documentation/api/maps/tooltipgesture)** (TooltipGesture): Gets or sets the mode in which the tooltip is to be displayed. The tooltip can be rendered on mouse move, click or double clicking on the element on the map. **Default:** 'MouseMove'

---

## Display and Layout Properties

- **[`background`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#background)** (string): Gets or sets the background color of the maps container. **Default:** null
- **[`height`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#height)** (string): Gets or sets the height in which the maps is to be rendered. **Default:** null
- **[`width`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#width)** (string): Gets or sets the width in which the maps is to be rendered. **Default:** null
- **[`description`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#description)** (string): Gets or sets the description of the maps for assistive technology. **Default:** null
- **[`format`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#format)** (string): Gets or sets the format to apply internationalization for the text in the maps. **Default:** null
- **[`locale`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#locale)** (string): Overrides the global culture and localization value for this component. Default global culture is 'en-US'. **Default:** ''
- **[`border`](https://ej2.syncfusion.com/javascript/documentation/api/maps/bordermodel)** (BorderModel): Gets or sets the options for customizing the style properties of the maps border.
- **[`margin`](https://ej2.syncfusion.com/javascript/documentation/api/maps/marginmodel)** (MarginModel): Gets or sets the options to customize the margin of the maps.
- **[`mapsArea`](https://ej2.syncfusion.com/javascript/documentation/api/maps/mapsareasettingsmodel)** (MapsAreaSettingsModel): Gets or sets the options to customize the area around the map.

---

## Map Content Properties

- **[`centerPosition`](https://ej2.syncfusion.com/javascript/documentation/api/maps/centerpositionmodel)** (CenterPositionModel): Gets or sets the center position of the maps.
- **[`layers`](https://ej2.syncfusion.com/javascript/documentation/api/maps/layersettingsmodel)** (LayerSettingsModel[]): Gets or sets the options to customize the layers of the maps.
- **[`annotations`](https://ej2.syncfusion.com/javascript/documentation/api/maps/annotationmodel)** (AnnotationModel[]): Gets or sets the options for customizing the annotations in the maps.
- **[`legendSettings`](https://ej2.syncfusion.com/javascript/documentation/api/maps/legendsettingsmodel)** (LegendSettingsModel): Gets or sets the options to customize the legend of the maps.
- **[`titleSettings`](https://ej2.syncfusion.com/javascript/documentation/api/maps/titlesettingsmodel)** (TitleSettingsModel): Gets or sets the options to customize the title of the maps.
- **[`zoomSettings`](https://ej2.syncfusion.com/javascript/documentation/api/maps/zoomsettingsmodel)** (ZoomSettingsModel): Gets or sets the options to customize the zooming operations in maps.

---

## Interaction and Customization Properties

- **[`isShapeSelected`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#isshapeselected)** (boolean): Specifies whether the shape is selected in the maps or not. **Read-only**

---

## Advanced Features

Maps component supports various export, navigation, and rendering capabilities through its methods and events. All features are modular and can be dynamically injected using the Inject method.

---

## Methods

### [addLayer()](https://ej2.syncfusion.com/javascript/documentation/api/maps/#addlayer)
This method is used to add the layers dynamically to the maps.

**Parameters:**
- `layer` (Object): Specifies the layer to be added in the maps.

**Returns:** void

### [addMarker()](https://ej2.syncfusion.com/javascript/documentation/api/maps/#addmarker)
This method is used to add markers dynamically in the maps. If we provide the index value of the layer in which the marker to be added and the settings of the marker as parameters, the marker will be added in the location.

**Parameters:**
- `layerIndex` (optional) (number): Specifies the index number of the layer.
- `markerCollection` (optional) (MarkerSettingsModel[]): Specifies the settings of the marker to be added.

**Returns:** void

### [addEventListener()](https://ej2.syncfusion.com/javascript/documentation/api/maps/#addeventlistener)
Adds the handler to the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event
- `handler` (Function): Specifies the call to run when the event occurs.

**Returns:** void

### [appendTo()](https://ej2.syncfusion.com/javascript/documentation/api/maps/#appendto)
Appends the control within the given HTML element.

**Parameters:**
- `selector` (optional) (string | HTMLElement): Target element where control needs to be appended

**Returns:** void

### [dataBind()](https://ej2.syncfusion.com/javascript/documentation/api/maps/#databind)
When invoked, applies the pending property changes immediately to the component.

**Returns:** void

### [destroy()](https://ej2.syncfusion.com/javascript/documentation/api/maps/#destroy)
This method destroys the maps. This method removes the events associated with the maps and disposes the objects created for rendering and updating the maps.

**Returns:** void

### [export()](https://ej2.syncfusion.com/javascript/documentation/api/maps/#export)
This method handles the export functionality for the maps.

**Parameters:**
- `type` (ExportType): Specifies the type of the exported file.
- `fileName` (string): Specifies the name of the file with which the rendered maps need to be exported.
- `orientation` (optional) (PdfPageOrientation): Specifies the orientation of the PDF document while exporting.
- `allowDownload` (optional) (boolean): Specifies whether to download as a file or get as base64 string for the file.

**Returns:** Promise

### [getBingUrlTemplate()](https://ej2.syncfusion.com/javascript/documentation/api/maps/#getbingurltemplate)
This method is used to get the Bing maps URL.

**Parameters:**
- `url` (string): Specifies the URL of the Bing maps along with the API key.

**Returns:** Promise

### [getGeoLocation()](https://ej2.syncfusion.com/javascript/documentation/api/maps/#getgeolocation)
This method is used to get the geographical coordinates for location points in pixels when shape maps are rendered in the maps.

**Parameters:**
- `layerIndex` (number): Specifies the index number of the layer of the maps.
- `x` (number): Specifies the x value in pixel.
- `y` (number): Specifies the y value in pixel.

**Returns:** [GeoPosition](https://ej2.syncfusion.com/javascript/documentation/api/maps/geoPosition)

### [getRootElement()](https://ej2.syncfusion.com/javascript/documentation/api/maps/#getrootelement)
Returns the route element of the component.

**Returns:** HTMLElement

### [getTileGeoLocation()](https://ej2.syncfusion.com/javascript/documentation/api/maps/#gettilegeo location)
This method is used to get the geographical coordinates for location points in pixels when an online map provider is rendered in the maps.

**Parameters:**
- `x` (number): Specifies the x value in pixel.
- `y` (number): Specifies the y value in pixel.

**Returns:** [GeoPosition](https://ej2.syncfusion.com/javascript/documentation/api/maps/geoPosition)

### [panByDirection()](https://ej2.syncfusion.com/javascript/documentation/api/maps/#panbydirection)
This method is used to perform panning by specifying the direction.

**Parameters:**
- `direction` (PanDirection): Specifies the direction in which the panning must be performed.
- `mouseLocation` (optional) (PointerEvent | TouchEvent): Specifies the location of the mouse pointer in maps in pixels.

**Returns:** void

### [pointToLatLong()](https://ej2.syncfusion.com/javascript/documentation/api/maps/#pointtolatlong)
This method is used to convert the point in pixels to latitude and longitude in maps.

**Parameters:**
- `pageX` (number): Specifies the x position value in pixels.
- `pageY` (number): Specifies the y position value in pixels.

**Returns:** Object

### [print()](https://ej2.syncfusion.com/javascript/documentation/api/maps/#print)
This method handles the printing functionality for the maps.

**Parameters:**
- `id` (optional) (string[] | string | Element): Specifies the element to be printed.

**Returns:** void

### [refresh()](https://ej2.syncfusion.com/javascript/documentation/api/maps/#refresh)
Applies all the pending property changes and render the component again.

**Returns:** void

### [removeEventListener()](https://ej2.syncfusion.com/javascript/documentation/api/maps/#removeeventlistener)
Removes the handler from the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event to remove
- `handler` (Function): Specifies the function to remove

**Returns:** void

### [removeLayer()](https://ej2.syncfusion.com/javascript/documentation/api/maps/#removelayer)
This method is used to remove a layer from the maps.

**Parameters:**
- `index` (number): Specifies the index number of the layer to be removed.

**Returns:** void

### [shapeSelection()](https://ej2.syncfusion.com/javascript/documentation/api/maps/#shapeselection)
This method is used to select the geometric shape element in the maps.

**Parameters:**
- `layerIndex` (number): Specifies the index of the layer in maps.
- `propertyName` (string | string[]): Specifies the property name from the data source.
- `name` (string): Specifies the name of the shape, which is mapped from the data source, that is selected.
- `enable` (optional) (boolean): Specifies whether the shape should be selected or the selection should be removed.

**Returns:** void

### [zoomByPosition()](https://ej2.syncfusion.com/javascript/documentation/api/maps/#zoombyposition)
This method is used to zoom the map by specifying the center position.

**Parameters:**
- `centerPosition` (Object): Specifies the location of the maps to be zoomed as geographical coordinates.
- `zoomFactor` (number): Specifies the zoom factor for the maps.

**Returns:** void

### [zoomToCoordinates()](https://ej2.syncfusion.com/javascript/documentation/api/maps/#zoomtocoordinates)
This method is used to zoom the maps based on the provided coordinates.

**Parameters:**
- `minLatitude` (number): Specifies the minimum latitude of the location to be zoomed.
- `minLongitude` (number): Specifies the minimum longitude of the location to be zoomed.
- `maxLatitude` (number): Specifies the maximum latitude of the location to be zoomed.
- `maxLongitude` (number): Specifies the maximum longitude of the location to be zoomed.

**Returns:** void

### [Inject()](https://ej2.syncfusion.com/javascript/documentation/api/maps/#inject)
Dynamically injects the required modules to the component.

**Parameters:**
- `moduleList` (Function[]): List of modules to inject

**Returns:** void

---

## Events

### [animationComplete](https://ej2.syncfusion.com/javascript/documentation/api/maps/ianimationcompleteeventargs)
Triggers after the animation is completed in the maps.

### [annotationRendering](https://ej2.syncfusion.com/javascript/documentation/api/maps/iannotationrenderingeventargs)
Triggers before rendering an annotation in the maps. This event allows for customization of the annotation before it is rendered on the map.

### [beforePrint](https://ej2.syncfusion.com/javascript/documentation/api/maps/iprinteventargs)
Triggers before the print gets started. This event allows for customization of print settings before printing.

### [bubbleClick](https://ej2.syncfusion.com/javascript/documentation/api/maps/ibubbleclickeventargs)
Triggers when performing the click operation on the bubble element in maps.

### [bubbleMouseMove](https://ej2.syncfusion.com/javascript/documentation/api/maps/ibubblemoveeventargs)
Triggers when hovering the mouse on the bubble element in maps.

### [bubbleRendering](https://ej2.syncfusion.com/javascript/documentation/api/maps/ibubblerenderingeventargs)
Triggers before the bubble element gets rendered on the map. This event allows for customization of bubble appearance and properties.

### [click](https://ej2.syncfusion.com/javascript/documentation/api/maps/imouseeventargs)
Triggers when a user clicks on an element in Maps.

### [dataLabelRendering](https://ej2.syncfusion.com/javascript/documentation/api/maps/ilabelrenderingeventargs)
Triggers before the data-label gets rendered. This event allows for customization of data labels before rendering.

### [doubleClick](https://ej2.syncfusion.com/javascript/documentation/api/maps/imouseeventargs)
Triggers when performing the double click operation on an element in maps.

### [itemHighlight](https://ej2.syncfusion.com/javascript/documentation/api/maps/iselectioneventargs)
Trigger before the shape, bubble or marker gets highlighted.

### [itemSelection](https://ej2.syncfusion.com/javascript/documentation/api/maps/iselectioneventargs)
Triggers before the shape, bubble or marker gets selected.

### [layerRendering](https://ej2.syncfusion.com/javascript/documentation/api/maps/ilayerrenderingeventargs)
Triggers before the maps layer gets rendered. This event allows for customization of layers before they appear on the map.

### [legendRendering](https://ej2.syncfusion.com/javascript/documentation/api/maps/ilegendrenderingeventargs)
Triggers before the legend gets rendered. This event allows for customization of the legend appearance.

### [load](https://ej2.syncfusion.com/javascript/documentation/api/maps/iloadeventargs)
Triggers before the maps gets rendered. This event allows for pre-initialization configuration of the maps.

### [loaded](https://ej2.syncfusion.com/javascript/documentation/api/maps/iloadedeventargs)
Triggers after the maps gets rendered completely. This event occurs once the map has been fully initialized and displayed.

### [markerClick](https://ej2.syncfusion.com/javascript/documentation/api/maps/imarkerclickeventargs)
Triggers when clicking on a marker element.

### [markerClusterClick](https://ej2.syncfusion.com/javascript/documentation/api/maps/imarkerclusterclickeventargs)
Triggers when clicking the marker cluster in maps.

### [markerClusterMouseMove](https://ej2.syncfusion.com/javascript/documentation/api/maps/imarkerclustermoveeventargs)
Triggers when moving the mouse over the marker cluster element in maps.

### [markerClusterRendering](https://ej2.syncfusion.com/javascript/documentation/api/maps/imarkerclusterrenderingeventargs)
Triggers before the maps marker cluster gets rendered. This event allows for customization of marker clusters.

### [markerDragEnd](https://ej2.syncfusion.com/javascript/documentation/api/maps/imarkerdrageventargs)
When the marker has stopped dragging on the map, this event is triggered.

### [markerDragStart](https://ej2.syncfusion.com/javascript/documentation/api/maps/imarkerdrageventargs)
When the marker begins to drag on the map, this event is triggered.

### [markerMouseMove](https://ej2.syncfusion.com/javascript/documentation/api/maps/imarkermoveeventargs)
Triggers when moving the mouse over the marker element in maps.

### [markerRendering](https://ej2.syncfusion.com/javascript/documentation/api/maps/imarkerrenderingeventargs)
Triggers before the maps marker gets rendered. This event allows for customization of marker appearance and properties.

### [mouseMove](https://ej2.syncfusion.com/javascript/documentation/api/maps/imousemoveeventargs)
This event is triggered when the mouse pointer moves over the map.

### [onclick](https://ej2.syncfusion.com/javascript/documentation/api/maps/imouseeventargs)
Triggers when a user clicks on an element in Maps.

### [pan](https://ej2.syncfusion.com/javascript/documentation/api/maps/imappaneventargs)
Triggers before performing the panning operation. This event allows for control over panning behavior.

### [panComplete](https://ej2.syncfusion.com/javascript/documentation/api/maps/imappaneventargs)
This event is triggered after performing the panning action, signaling the completion of the pan operation.

### [resize](https://ej2.syncfusion.com/javascript/documentation/api/maps/iresizeeventargs)
Triggers to notify the resize of the maps when the window is resized.

### [rightClick](https://ej2.syncfusion.com/javascript/documentation/api/maps/imouseeventargs)
Triggers when performing the right click operation on an element in maps.

### [shapeHighlight](https://ej2.syncfusion.com/javascript/documentation/api/maps/ishapeselectedeventargs)
Triggers before the shape gets highlighted. This event allows for customization of shape highlighting.

### [shapeRendering](https://ej2.syncfusion.com/javascript/documentation/api/maps/ishaperenderingeventargs)
Triggers before the maps shape gets rendered. This event allows for customization of shape appearance.

### [shapeSelected](https://ej2.syncfusion.com/javascript/documentation/api/maps/ishapeselectedeventargs)
Triggers when a shape is selected in the maps.

### [tooltipRender](https://ej2.syncfusion.com/javascript/documentation/api/maps/itooltiprendereventargs)
Triggers before the maps tooltip gets rendered. This event allows for customization of tooltip content and styling.

### [tooltipRenderComplete](https://ej2.syncfusion.com/javascript/documentation/api/maps/itooltiprendercompleteeventargs)
Triggers after the maps tooltip gets rendered, indicating the tooltip is now visible.

### [zoom](https://ej2.syncfusion.com/javascript/documentation/api/maps/imapzoomeventargs)
Triggers before the zoom operations such as zoom in and zoom out in the maps. This event allows for control over zoom behavior.

### [zoomComplete](https://ej2.syncfusion.com/javascript/documentation/api/maps/imappaneventargs)
This event is triggered after the zooming operation is completed, signaling the end of the zoom action.

---

## Related Settings Classes

### Map Layers and Content
- **[`LayerSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/maps/layersettingsmodel)** - Configuration options for map layers
- **[`AnnotationModel`](https://ej2.syncfusion.com/javascript/documentation/api/maps/annotationmodel)** - Annotation configuration and settings
- **[`MarkerSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/maps/markersettingsmodel)** - Marker customization options
- **[`BubbleSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/maps/bubblesettingsmodel)** - Bubble visualization settings

### Map Position and Navigation
- **[`CenterPositionModel`](https://ej2.syncfusion.com/javascript/documentation/api/maps/centerpositionmodel)** - Center position configuration for the map
- **[`ZoomSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/maps/zoomsettingsmodel)** - Zoom functionality configuration

### Legend and Titles
- **[`LegendSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/maps/legendsettingsmodel)** - Legend customization options
- **[`TitleSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/maps/titlesettingsmodel)** - Map title configuration

### Visual and Layout
- **[`BorderModel`](https://ej2.syncfusion.com/javascript/documentation/api/maps/bordermodel)** - Border styling for maps
- **[`MarginModel`](https://ej2.syncfusion.com/javascript/documentation/api/maps/marginmodel)** - Margin configuration for maps layout
- **[`MapsAreaSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/maps/mapsareasettingsmodel)** - Area around the map customization

### Data and Styling
- **[`ColorMappingSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/maps/colormappingsettingsmodel)** - Color mapping for data visualization
- **[`ProjectionType`](https://ej2.syncfusion.com/javascript/documentation/api/maps/projectiontype)** - Available map projections (Mercator, Equirectangular, Miller, etc.)
- **[`MapsTheme`](https://ej2.syncfusion.com/javascript/documentation/api/maps/mapstheme)** - Available themes for styling

### Tooltips and Interaction
- **[`TooltipSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/maps/tooltipsettingsmodel)** - Tooltip configuration
- **[`TooltipGesture`](https://ej2.syncfusion.com/javascript/documentation/api/maps/tooltipgesture)** - Gesture mode for tooltip display (MouseMove, Click, DoubleClick)

### Event Arguments
- **[`IAnimationCompleteEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/maps/ianimationcompleteeventargs)** - Animation complete event data
- **[`IAnnotationRenderingEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/maps/iannotationrenderingeventargs)** - Annotation rendering event data
- **[`IBubbleClickEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/maps/ibubbleclickeventargs)** - Bubble click event data
- **[`IBubbleRenderingEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/maps/ibubblerenderingeventargs)** - Bubble rendering event data
- **[`IMarkerClickEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/maps/imarkerclickeventargs)** - Marker click event data
- **[`IMarkerRenderingEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/maps/imarkerrenderingeventargs)** - Marker rendering event data
- **[`IMarkerClusterClickEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/maps/imarkerclusterclickeventargs)** - Marker cluster click event data
- **[`IMarkerClusterRenderingEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/maps/imarkerclusterrenderingeventargs)** - Marker cluster rendering event data
- **[`ILayerRenderingEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/maps/ilayerrenderingeventargs)** - Layer rendering event data
- **[`IMouseEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/maps/imouseeventargs)** - Mouse event data (click, double-click, right-click)
- **[`IMouseMoveEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/maps/imousemoveeventargs)** - Mouse move event data
- **[`IMapPanEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/maps/imappaneventargs)** - Panning event data
- **[`IMapZoomEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/maps/imapzoomeventargs)** - Zoom event data
- **[`IShapeSelectedEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/maps/ishapeselectedeventargs)** - Shape selection and highlight event data
- **[`ISelectionEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/maps/iselectioneventargs)** - Generic selection event data for shapes, bubbles, markers
- **[`ITooltipRenderEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/maps/itooltiprendereventargs)** - Tooltip rendering event data
- **[`ILegendRenderingEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/maps/ilegendrenderingeventargs)** - Legend rendering event data
- **[`ILabelRenderingEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/maps/ilabelrenderingeventargs)** - Data label rendering event data
- **[`IPrintEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/maps/iprinteventargs)** - Print event data
- **[`IResizeEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/maps/iresizeeventargs)** - Resize event data
- **[`ILoadEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/maps/iloadeventargs)** - Load event data
- **[`ILoadedEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/maps/iloadedeventargs)** - Loaded event data
- **[`IMarkerDragEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/maps/imarkerdrageventargs)** - Marker drag event data

### Utility and Data Types
- **[`GeoPosition`](https://ej2.syncfusion.com/javascript/documentation/api/maps/geoPosition)** - Geographical position representation
- **[`ExportType`](https://ej2.syncfusion.com/javascript/documentation/api/maps/exporttype)** - Supported export formats (PNG, JPEG, PDF, SVG)
- **[`PdfPageOrientation`](https://ej2.syncfusion.com/javascript/documentation/api/maps/pdfpageorientation)** - PDF export orientation options
- **[`PanDirection`](https://ej2.syncfusion.com/javascript/documentation/api/maps/pandirection)** - Panning direction options

---

## Common Usage Patterns

- Initialize the maps with [`layers`](https://ej2.syncfusion.com/javascript/documentation/api/maps/layersettingsmodel) to define the geographic data source and visualization.
- Set [`centerPosition`](https://ej2.syncfusion.com/javascript/documentation/api/maps/centerpositionmodel) to specify the initial center location of the map view.
- Configure [`zoomSettings`](https://ej2.syncfusion.com/javascript/documentation/api/maps/zoomsettingsmodel) to enable and control zoom functionality for users.
- Add [`legendSettings`](https://ej2.syncfusion.com/javascript/documentation/api/maps/legendsettingsmodel) to display a legend for data visualization and color mapping.
- Use [`titleSettings`](https://ej2.syncfusion.com/javascript/documentation/api/maps/titlesettingsmodel) to add a title and description to the map.
- Customize appearance with [`theme`](https://ej2.syncfusion.com/javascript/documentation/api/maps/mapstheme), [`background`](https://ej2.syncfusion.com/javascript/documentation/api/maps/mapstheme), and [`border`](https://ej2.syncfusion.com/javascript/documentation/api/maps/bordermodel).
- Add interactive markers using [`addMarker()`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#addmarker) method for dynamic content.
- Use [`export()`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#export) to save maps as PNG, JPEG, PDF, or SVG formats.
- Configure tooltip behavior with [`tooltipDisplayMode`](https://ej2.syncfusion.com/javascript/documentation/api/maps/tooltipgesture) for MouseMove, Click, or DoubleClick interaction.
- Handle map events like [`layerRendering`](https://ej2.syncfusion.com/javascript/documentation/api/maps/ilayerrenderingeventargs), [`markerRendering`](https://ej2.syncfusion.com/javascript/documentation/api/maps/imarkerrenderingeventargs), and [`bubbleRendering`](https://ej2.syncfusion.com/javascript/documentation/api/maps/ibubblerenderingeventargs) for dynamic customization.
- Enable multiple layers with different data sources using [`layers`](https://ej2.syncfusion.com/javascript/documentation/api/maps/layersettingsmodel) array and manage with [`addLayer()`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#addlayer) and [`removeLayer()`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#removelayer).
- Select shapes programmatically using [`shapeSelection()`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#shapeselection) method.
- Convert pixel coordinates to geographic coordinates using [`getGeoLocation()`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#getgeolocation) and [`getTileGeoLocation()`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#gettilegeo location).
- Use [`panByDirection()`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#panbydirection) for programmatic map panning.
- Perform zoom operations with [`zoomByPosition()`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#zoombyposition) and [`zoomToCoordinates()`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#zoomtocoordinates).

---

## Notes

- The Maps component supports various projection types (Mercator, Equirectangular, Miller, etc.) via the [`projectionType`](https://ej2.syncfusion.com/javascript/documentation/api/maps/projectiontype) property to accurately represent geographic data.
- Markers, bubbles, and data labels can be dynamically added or customized through rendering events.
- The component supports multiple map providers including OpenStreetMap, Google Maps, Bing Maps, etc., through layer configuration.
- Enable [`enablePersistence`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#enablepersistence) to maintain the state of the maps (zoom level, center position) across page reloads.
- Use [`enableRtl`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#enablertl) to render the maps in right-to-left direction for RTL language support.
- The [`tooltipDisplayMode`](https://ej2.syncfusion.com/javascript/documentation/api/maps/tooltipgesture) property supports 'MouseMove', 'Click', and 'DoubleClick' for flexible tooltip interaction.
- Module injection through [`Inject()`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#inject) allows dynamic loading of maps functionality.
- GeoJSON data can be rendered through layer configuration for custom geographic visualizations.
- Export functionality supports high-quality outputs in multiple formats through the [`export()`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#export) method.
- Shape selection is read-only through the [`isShapeSelected`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#isshapeselected) property but can be controlled programmatically using [`shapeSelection()`](https://ej2.syncfusion.com/javascript/documentation/api/maps/#shapeselection).
