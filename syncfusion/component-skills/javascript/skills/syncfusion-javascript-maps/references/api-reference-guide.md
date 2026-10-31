````markdown
# Maps API Reference Guide

## Table of Contents
- [Core Maps Class](#core-maps-class)
- [Configuration Interfaces](#configuration-interfaces)
- [Event Arguments](#event-arguments)
- [Enumerations](#enumerations)
- [Methods](#methods)

## Core Maps Class

### Maps Component

The main Maps component class for creating interactive geographical visualizations.

```typescript
import { Maps } from '@syncfusion/ej2-maps';

class Maps {
    // Constructor
    constructor(options?: MapsModel, element?: string | HTMLElement);
    
    // Key Properties
    centerPosition: CenterPosition;
    zoomSettings: ZoomSettings;
    layers: LayerSettings[];
    height: string;
    width: string;
    margin: Margin;
    border: Border;
    background: string;
    
    // Marker & Visualization
    markerSettings: MarkerSettings[];
    bubbleSettings: BubbleSettings[];
    navigationLineSettings: NavigationLineSettings[];
    
    // Legend & Annotations
    legendSettings: LegendSettings;
    annotations: Annotation[];
    
    // Selection & Interaction
    selectionSettings?: SelectionSettings;
    highlightSettings?: HighlightSettings;
    
    // Tooltip
    tooltipSettings: TooltipSettings;
    
    // Title & Subtitle
    titleSettings: TitleSettings;
    subtitleSettings: SubTitleSettings;

    projectionType?: ProjectionType;
    baseLayerIndex?: number;
    
    // Palette and theming
    palette?: string[];
    theme?: MapsTheme;
    
    // Methods (see Methods section)
    appendTo(selector: string | HTMLElement): void;
    refresh(): void;
    destroy(): void;
    export(type: ExportType, fileName: string): void;
    print(): void;
    
    // Events
    load?: (args: ILoadEventArgs) => void;
    loaded?: (args: ILoadedEventArgs) => void;
    markerClick?: (args: IMarkerClickEventArgs) => void;
    markerRender?: (args: IMarkerRenderingEventArgs) => void;
    markerClusterClick?: (args: IMarkerClusterClickEventArgs) => void;
    shapeSelected?: (args: IShapeSelectedEventArgs) => void;
    layerRender?: (args: ILayerRenderEventArgs) => void;
    zoomEnd?: (args: IMapZoomEventArgs) => void;
    panEnd?: (args: IMapPanEventArgs) => void;
    mouseMove?: (args: IMouseEventArgs) => void;
    tooltipRender?: (args: ITooltipRenderEventArgs) => void;
    click?: (args: IMouseEventArgs) => void;
    doubleClick?: (args: IMouseEventArgs) => void;
    resize?: (args: IResizeEventArgs) => void;
    annotationRendering?: (args: IAnnotationRenderingEventArgs) => void;
}
```

---

## Configuration Interfaces

### CenterPosition
Defines the center coordinates of the map.

```typescript
interface CenterPosition {
    latitude: number;      // Decimal degrees (-90 to 90)
    longitude: number;     // Decimal degrees (-180 to 180)
}
```

**Example:**
```typescript
centerPosition: { latitude: 37.6872, longitude: -122.0808 }
```

---

### ZoomSettings
Configures map zooming behavior.

```typescript
interface ZoomSettings {
    enable?: boolean;      // Enable/disable zoom (default: true)
    zoomFactor?: number;   // Current zoom level
    minZoom?: number;      // Minimum zoom level (default: 1)
    maxZoom?: number;      // Maximum zoom level (default: 20)
    enablePanning?: boolean;
    mouseWheelZoom?: boolean;
    doubleClickZoom?: boolean;
    pinchZooming?: boolean;
    toolbarSettings?: ZoomToolbarSettings;
    animationDuration?: number; // Animation duration in milliseconds
    enableSelectionZooming?: boolean;
    enableToolbar?: boolean;
    zoomOnClick?: boolean;
}
```

**Example:**
```typescript
zoomSettings: {
    enable: true,
    minZoom: 1,
    maxZoom: 13,
    zoomFactor: 4
}
```

---

### LayerSettings
Configuration for map layers.

```typescript
interface LayerSettings {
    type?: 'Layer' | 'SubLayer';
    visible?: boolean;

    // Tile layer
    urlTemplate?: string;

    // Data
    dataSource?: object[] | DataManager | MapAjax;
    query?: Query;

    // Shape
    shapeData?: object | DataManager | MapAjax;
    shapeDataPath?: string;
    shapePropertyPath?: string | string[];
    geometryType?: 'Geographic' | 'Normal';

    // Visualization
    markerSettings?: MarkerSettings[];
    markerClusterSettings?: MarkerClusterSettingsModel;
    bubbleSettings?: BubbleSettings[];
    navigationLineSettings?: NavigationLineSettings[];
    polygonSettings?: PolygonSettings;

    // Shape behavior
    shapeSettings?: ShapeSettings;
    selectionSettings?: SelectionSettings;
    highlightSettings?: HighlightSettings;
    toggleLegendSettings?: ToggleLegendSettings;

    // Labels
    dataLabelSettings?: DataLabelSettings;

    // Tooltip
    tooltipSettings?: TooltipSettingsModel;

    // Initial selection
    initialShapeSelection?: InitialShapeSelectionSettingsModel[];

    // Animation
    animationDuration?: number;
    
}
```

---

### MarkerSettings
Configures marker display and behavior.

```typescript
interface MarkerSettings {
    visible?: boolean;

    // Data
    dataSource?: object[] | DataManager;

    // Position mapping
    latitudeValuePath?: string;
    longitudeValuePath?: string;

    // Appearance
    width?: number;
    height?: number;
    widthValuePath?: string;
    heightValuePath?: string;

    shape?: 'Circle' | 'Rectangle' | 'Diamond' | 'Cross' | 'Plus' | 'Star';
    shapeValuePath?: string;

    fill?: string;
    colorValuePath?: string;
    opacity?: number;
    dashArray?: string;

    // Border
    border?: {
        color: string;
        width: number;
    };

    // Image / Template
    imageUrl?: string;
    imageUrlValuePath?: string;
    template?: string | Function;

    // Offset
    offset?: { x: number; y: number };

    // Animation
    animationDelay?: number;
    animationDuration?: number;

    // Clustering
    clusterSettings?: MarkerClusterSettingsModel;

    // Interaction
    enableDrag?: boolean;
    selectionSettings?: SelectionSettingsModel;
    highlightSettings?: HighlightSettingsModel;

    // Tooltip
    tooltipSettings?: TooltipSettingsModel;

    // Labels & legend
    legendText?: string;
    dataLabelSettings?: DataLabelSettingsModel;

    // Initial selection
    initialMarkerSelection?: InitialMarkerSelectionSettingsModel[];

    // Data query
    query?: Query;
}
```

**Example:**
```typescript
  markerSettings: [
        {
          dataSource: [
            { latitude: 37.6872, longitude: -122.0808, name: 'San Francisco' },
          ],
          visible: true,
          width: 30,
          height: 30,
          fill: '#FF0000',
          shape: 'Circle',
          tooltipSettings: {
            visible: true,
            valuePath: 'name',
          },
        },
      ],
```

---

### BubbleSettings
Configuration for bubble visualization.

```typescript
interface BubbleSettings {
    // Visibility
    visible?: boolean;

    // Data
    dataSource?: object[] | DataManager;
    valuePath?: string;
    colorValuePath?: string;

    // Sizing
    minRadius?: number;
    maxRadius?: number;

    // Appearance
    fill?: string;
    opacity?: number;

    // Border
    border?: {
        color: string;
        width: number;
    };

    // Bubble type
    bubbleType?: 'Circle' | 'Square';

    // Color mapping
    colorMapping?: ColorMappingSettingsModel[];

    // Animation
    animationDelay?: number;
    animationDuration?: number;

    // Interaction
    selectionSettings?: SelectionSettingsModel;
    highlightSettings?: HighlightSettingsModel;

    // Tooltip
    tooltipSettings?: TooltipSettingsModel;

    // Query
    query?: Query;
}
```

---

### ShapeSettings
Configuration for polygon/shape styling.

```typescript
interface ShapeSettings {
    // Fill
    fill?: string;

    // Appearance
    opacity?: number;

    // Border
    border?: {
        color: string;
        width: number;
    };

    // Dash style
    dashArray?: string;

    // Data-driven coloring
    colorValuePath?: string;
    colorMapping?: ColorMappingSettingsModel[];

    // Palette
    palette?: string[];

    // Auto fill
    autofill?: boolean;

    // Value mapping
    valuePath?: string;

    // Dynamic border styling
    borderColorValuePath?: string;
    borderWidthValuePath?: string;

    // Geometry support
    circleRadius?: number;
}
```

---

### NavigationLineSettings
Configuration for lines connecting locations.

```typescript
interface NavigationLineSettings {
    // Coordinates
    latitude: number[];
    longitude: number[];

    // Appearance
    color?: string;
    width?: number;
    dashArray?: string;

    // Curve
    angle?: number;

    // Arrow styling
    arrowSettings?: ArrowModel;

    // Interaction
    highlightSettings?: HighlightSettingsModel;
    selectionSettings?: SelectionSettingsModel;

    // Visibility
    visible?: boolean;
}
```

**Example:**
```typescript
navigationLineSettings: [
  {
    visible: true,
    latitude: [37.6872, 34.0522],
    longitude: [-122.0808, -118.2437],
    color: '#FF0000',
    width: 3,
    dashArray: '5,5',
    angle: 0.5
  }
]
```

---

### LegendSettings
Configuration for map legend.

```typescript
interface LegendSettings {
    // Visibility
    visible?: boolean;

    // Mode
    mode?: 'Default' | 'Interactive';

    // Positioning
    position?: 'Top' | 'Bottom' | 'Left' | 'Right' | 'Float';
    alignment?: 'Near' | 'Center' | 'Far';
    orientation?: 'Horizontal' | 'Vertical';
    location?: { x: number; y: number };

    // Dimensions
    width?: string;
    height?: string;

    // Appearance
    background?: string;
    fill?: string;
    opacity?: number;

    // Border
    border?: {
        color: string;
        width: number;
    };

    // Shape
    shape?: LegendShape;
    shapeWidth?: number;
    shapeHeight?: number;
    shapePadding?: number;
    shapeBorder?: {
        color: string;
        width: number;
    };

    // Labels
    valuePath?: string;
    labelDisplayMode?: 'None' | 'Trim' | 'Hide';
    labelPosition?: 'Before' | 'After';

    // Text styling
    textStyle?: FontSettings;

    // Title
    title?: {
        text: string;
    };
    titleStyle?: FontSettings;

    // Behavior
    toggleVisibility?: boolean;
    removeDuplicateLegend?: boolean;
    showLegendPath?: string;
    useMarkerShape?: boolean;
    invertedPointer?: boolean;

    // Advanced
    toggleLegendSettings?: ToggleLegendSettings;
    type?: string;
}
```
**Example:**
```typescript
legendSettings: {
  visible: true,
  position: 'Bottom',
  alignment: 'Center',

  title: {
    text: 'Cities'
  },

  shapeWidth: 15,
  shapeHeight: 15,

  textStyle: {
    size: '12px'
  }
}
```

---

### Annotation
Configuration for annotations on map.

```typescript
interface Annotation {
    // Content
    content?: string | Function;

    // Position
    x?: string;  // '50%' or '100px'
    y?: string;

    // Alignment
    horizontalAlignment?: 'None' | 'Near' | 'Center' | 'Far';
    verticalAlignment?: 'None' | 'Near' | 'Center' | 'Far';

    // Layering
    zIndex?: string;
}
```

---

### TooltipSettings
Configuration for tooltips.

```typescript
interface TooltipSettings {
    // Visibility
    visible?: boolean;

    // Content
    valuePath?: string;
    format?: string;
    template?: string | Function;

    // Styling
    textStyle?: FontSettings;
    fill?: string;
    border?: {
        color: string;
        width: number;
    };

    // Behavior
    duration?: number;
}
```

---

### SelectionSettings
Configuration for element selection on user interaction.

```typescript
interface SelectionSettings {
    // Enable/disable
    enable: boolean;                // Enable selection

    enableMultiSelect: boolean;     // Enable selection of multiple shapes in maps.
    
    // Appearance when selected
    fill?: string;                  // Fill color when selected
    
    // Appearance when not selected
    opacity?: number;               // Opacity of unselected items
    
    // Interaction
    border?: {
        color: string;
        opacity: number;
        width: number;
    };
}
```

---

### HighlightSettings
Configuration for hover highlighting.

```typescript
interface HighlightSettings {
    // Enable/disable
    enable: boolean;                // Enable highlighting
    
    // Appearance
    fill?: string;                  // Highlight fill color
    opacity?: number;               // Highlight opacity
    
    // Border
    border?: {
        color: string;
        opacity: number;
        width: number;
    };
}
```

---

### DataLabelSettings
Configuration for data labels on shapes/markers/bubbles.

```typescript
interface DataLabelSettings {
    // Visibility
    visible?: boolean;

    // Content
    labelPath?: string;
    template?: string | Function;

    // Appearance
    textStyle?: {
        color?: string;         // Text color
        fontFamily?: string;   // Font family (e.g., 'Arial')
        fontStyle?: string;    // Normal, Italic
        fontWeight?: string;   // Normal, Bold, etc.
        opacity?: number;      // Opacity (0-1)
        size?: string;         // Font size (e.g., '12px')
    };
    fill?: string;
    opacity?: number;

    // Border
    border?: {
        color: string;
        width: number;
    };

    // Positioning
    rx?: number;
    ry?: number;

    // Behavior
    intersectionAction?: 'None' | 'Hide' | 'Trim';
    smartLabelMode?: 'None' | 'Hide' | 'Trim';

    // Animation
    animationDuration?: number;
}
```

---

### ColorMappingSettings
Configuration for data-driven color mapping.

```typescript
interface ColorMappingSettings {
    // Range mapping
    from?: number;
    to?: number;

    // Equal / categorical mapping
    value?: string | number;

    // Color
    color?: string | string[];

    // Legend
    label?: string;
    showLegend?: boolean;

    // Opacity
    minOpacity?: number;
    maxOpacity?: number;
}
```

**Example - Range mapping:**
```typescript
colorMappings: [
    { from: 0, to: 1000000, color: '#FFF5E6' },
    { from: 1000000, to: 5000000, color: '#FF9999' },
    { from: 5000000, to: 10000000, color: '#FF0000' }
]
```

**Example - Categorical mapping:**
```typescript
colorMappings: [
    { value: 'High', color: '#FF0000' },
    { value: 'Medium', color: '#FFFF00' },
    { value: 'Low', color: '#00FF00' }
]
```

---

### TitleSettings
Configuration for map title.

```typescript
interface TitleSettings {
    // Text
    text?: string;

    // Styling
    textStyle?: FontSettings;

    // Alignment
    alignment?: 'Near' | 'Center' | 'Far';

    // Accessibility
    description?: string;

    // Subtitle
    subtitleSettings?: SubTitleSettings;
}
```

---

### SubTitleSettings
Configuration for map subtitle (similar to TitleSettings).

```typescript
interface SubTitleSettings {
    text?: string;
    textStyle?: FontSettings;
    alignment?: 'Near' | 'Center' | 'Far';
    description?: string;
}
```

---

### Margin
Configuration for margins.

```typescript
interface Margin {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
}
```

---

### Border
Configuration for borders.

```typescript
interface Border {
    color?: string;                 // Border color
    width?: number;                 // Border width
    opacity?: number;               // Border opacity
}
```

---

### FontSettings
Configuration for text styling.

```typescript
interface FontSettings {
    fontFamily?: string;            // Font name
    fontStyle?: 'Normal' | 'Italic' | 'Oblique';
    fontWeight?: 'Normal' | 'Bold' | '100' | '200' | ... | '900';
    size?: string;                  // Font size (e.g., '14px')
    opacity?: number;
    color?: string;                 // Text color
}
```

---

### MarkerClusterSettings
Configuration for marker clustering.

```typescript
interface MarkerClusterSettings {
    // Enable
    allowClustering?: boolean;
    allowClusterExpand?: boolean;
    allowDeepClustering?: boolean;

    // Appearance
    fill?: string;
    width?: number;
    height?: number;
    opacity?: number;
    shape?: string;
    imageUrl?: string;

    // Border
    border?: {
        color: string;
        width: number;
    };

    // Label
    labelStyle?: FontSettings;

    // Layout
    offset?: { x: number; y: number };

    // Line (when expanded)
    connectorLineSettings?: ConnectorLineSettings;

    // Styling
    dashArray?: string;
}
```

---

### PolygonSettings
Configuration for polygon shapes.

```typescript
interface PolygonSettings {
    // Visibility
    visible?: boolean;

    // Coordinates
    points?: { latitude: number; longitude: number }[];

    // Styling
    fill?: string;
    opacity?: number;

    // Border
    border?: {
        color: string;
        width: number;
    };

    // Line style
    dashArray?: string;

    // Interaction
    selectionSettings?: SelectionSettingsModel;
    highlightSettings?: HighlightSettingsModel;

    // Tooltip
    tooltipSettings?: TooltipSettingsModel;
}
```

---

## Event Arguments

### ILoadEventArgs
Fired when map is initializing.

```typescript
interface ILoadEventArgs {
    cancel: boolean;                //cancel state for the event
    name: string;                   // Event name
    maps: Maps;                     // Maps instance
}
```

---

### ILoadedEventArgs
Fired when map is fully loaded and rendered.

```typescript
interface ILoadedEventArgs {
    // Event name
    name?: string;

    // Maps instance
    maps?: Maps;

    // Control
    cancel?: boolean;

    // Resize info
    isResized?: boolean;

    // Visible bounds
    minLatitude?: number;
    maxLatitude?: number;
    minLongitude?: number;
    maxLongitude?: number;
}
```

---

### IMarkerClickEventArgs
Fired when marker is clicked.

```typescript
interface IMarkerClickEventArgs {
    // Event name
    name?: string;

    // Control
    cancel?: boolean;

    // Maps instance
    maps?: Maps;

    // Marker instance
    marker?: MarkerSettingsModel;

    // Marker data
    data?: object;
    value?: string;

    // Position
    latitude?: number;
    longitude?: number;

    // Mouse position
    x?: number;
    y?: number;

    // Target element
    target?: string;

    // Selection state
    isShapeSelected?: boolean;
}
```

---

### IMarkerRenderingEventArgs
Fired when marker is rendering.

```typescript
interface IMarkerRenderingEventArgs {
    // Event name
    name?: string;

    // Control
    cancel?: boolean;

    // Maps instance
    maps?: Maps;

    // Marker configuration
    marker?: MarkerSettingsModel;

    // Data
    data?: object;

    // Appearance
    fill?: string;
    width?: number;
    height?: number;
    shape?: string;

    // Image
    imageUrl?: string;
    imageUrlValuePath?: string;

    // Template
    template?: string | Function;

    // Border
    border?: {
        color: string;
        width: number;
    };

    // Data-driven styling
    colorValuePath?: string;
    shapeValuePath?: string;
}
```

---

### IShapeSelectedEventArgs
Fired when shape/polygon is selected.

```typescript
interface IShapeSelectedEventArgs {
    // Event name
    name?: string;

    // Control
    cancel?: boolean;

    // Maps instance
    maps?: Maps;

    // Selected shape data
    data?: object;

    // GeoJSON shape
    shapeData?: object;

    // Multiple selection
    shapeDataCollection?: object;

    // Styling
    fill?: string;
    opacity?: number;
    border?: {
        color: string;
        width: number;
    };

    // Target element
    target?: string;
}
```

---

### IBubbleClickEventArgs
Fired when bubble is clicked.

```typescript
interface IBubbleClickEventArgs {
    // Event name
    name?: string;

    // Control
    cancel?: boolean;

    // Maps instance
    maps?: Maps;

    // Bubble data
    data?: object;

    // Geo position
    latitude?: number;
    longitude?: number;

    // Mouse position
    x?: number;
    y?: number;

    // Target element
    target?: string;
}
```

---

### IMapZoomEventArgs
Fired during zoom operations.

```typescript
interface IMapZoomEventArgs {
    // Event name
    name?: string;

    // Control
    cancel?: boolean;

    // Maps instance
    maps?: Maps;

    // Zoom values
    previousZoomFactor?: number;
    zoomFactor?: number;

    // Mouse position
    x?: number;
    y?: number;

    // Target element
    target?: string;

    // Visible bounds
    minLatitude?: number;
    maxLatitude?: number;
    minLongitude?: number;
    maxLongitude?: number;
}
```

---

### IMapPanEventArgs
Fired during pan/drag operations.

```typescript
interface IMapPanEventArgs {
    // Event name
    name?: string;

    // Control
    cancel?: boolean;

    // Maps instance
    maps?: Maps;

    // Mouse position
    x?: number;
    y?: number;

    // Target element
    target?: string;

    // Visible bounds
    minLatitude?: number;
    maxLatitude?: number;
    minLongitude?: number;
    maxLongitude?: number;
}
```

---

### ITooltipRenderEventArgs
Fired when tooltip is rendering.

```typescript
interface ITooltipRenderEventArgs {
    // Event name
    name?: string;

    // Control
    cancel?: boolean;

    // Maps instance
    maps?: Maps;

    // Data
    data?: object;

    // Content
    content?: string;
    template?: string | Function;

    // Position
    location?: { x: number; y: number };

    // Styling
    fill?: string;
    border?: {
        color: string;
        width: number;
    };
    textStyle?: FontSettings;

    // Target element
    target?: string;
}
```

---

### IMouseEventArgs
Fired on mouse interactions.

```typescript
interface IMouseEventArgs {
    // Event name
    name?: string;

    // Control
    cancel?: boolean;

    // Maps instance
    maps?: Maps;

    // Absolute position (page)
    pageX?: number;
    pageY?: number;

    // Relative position (map container)
    x?: number;
    y?: number;

    // Target element id
    target?: string;
}
```

---

### ILayerRenderEventArgs
Fired when layer is rendering.

```typescript
interface ILayerRenderEventArgs {
    // Event name
    name?: string;

    // Control
    cancel?: boolean;

    // Maps instance
    maps?: Maps;

    // Layer configuration
    layer?: LayerSettingsModel;

    // Target element
    target?: string;

    visible?: boolean;
}
```

---

### IAnnotationRenderingEventArgs
Fired when annotation is rendering.

```typescript
interface IAnnotationRenderingEventArgs {
    name: string;
    annotation: Annotation;
    cancel: boolean;
    content: string|Function ;
    maps: Maps;
}
```

---

## Enumerations

### ExportType
Map export format.

```typescript
enum ExportType {
    PNG = 'PNG',
    SVG = 'SVG',
    PDF = 'PDF',
    JPEG = 'JPEG'
}
```

---

### MapsTheme
Built-in themes.

```typescript
/**
 * Defines the available built-in themes for Maps.
 */
enum MapsTheme {
    Material = 'Material',
    Fabric = 'Fabric',
    Bootstrap = 'Bootstrap',
    HighContrast = 'HighContrast',

    MaterialDark = 'MaterialDark',
    FabricDark = 'FabricDark',
    BootstrapDark = 'BootstrapDark',

    Bootstrap4 = 'Bootstrap4',

    Tailwind = 'Tailwind',
    TailwindDark = 'TailwindDark',

    Fluent = 'Fluent',
    FluentDark = 'FluentDark',

    // Latest themes
    Fluent2 = 'Fluent2',
    Fluent2Dark = 'Fluent2Dark',
    Fluent2HighContrast = 'Fluent2HighContrast',

    Material3 = 'Material3',
    Material3Dark = 'Material3Dark'
}
```

---

### ProjectionType
Map projection.

```typescript
enum ProjectionType {
    Mercator = 'Mercator',
    Winkel3 = 'Winkel3',
    Miller = 'Miller',
    Eckert3 = 'Eckert3',
    Eckert5 = 'Eckert5',
    Eckert6 = 'Eckert6',
    AitOff = 'AitOff',
    Equirectangular = 'Equirectangular'
}
```

---

### LegendPosition
Legend position on map.

```typescript
/**
 * Defines the position of the legend in the map.
 */
enum LegendPosition {
    Top = 'Top',
    Bottom = 'Bottom',
    Left = 'Left',
    Right = 'Right',
    Float = 'Float'
}
```

---

### LegendMode
Legend interaction mode.

```typescript
enum LegendMode {
    Default = 'Default',
    Interactive = 'Interactive'
}
```

---

### LegendShape
Legend item shape.

```typescript
/**
 * Defines the shape of the legend items.
 */
enum LegendShape {
    Circle = 'Circle',
    Rectangle = 'Rectangle',
    Triangle = 'Triangle',
    Diamond = 'Diamond',
    Cross = 'Cross',
    Star = 'Star',
    HorizontalLine = 'HorizontalLine',
    VerticalLine = 'VerticalLine',
    Pentagon = 'Pentagon',
    InvertedTriangle = 'InvertedTriangle',
    Balloon = 'Balloon'
}
```

---

## Methods

### appendTo(selector)
Render map in specified container.

```typescript
map.appendTo('#container');
// or
map.appendTo(document.getElementById('container'));
```

---

### refresh()
Refresh map after configuration changes.

```typescript
map.layers[0].dataSource = newData;
map.refresh();
```

---

### destroy()
Clean up and remove map from DOM.

```typescript
map.destroy();
```

---

### export(type, fileName)
Export map as image or PDF.

```typescript
map.export(ExportType.PNG, 'map.png');
map.export(ExportType.SVG, 'map.svg');
map.export(ExportType.PDF, 'map.pdf');
```

---

### print()
Print the map.

```typescript
map.print();
```

---


## Complete Example

```typescript
import {
    Maps,
    Marker,
    Legend,
    MapsTooltip,
    Zoom
  } from '@syncfusion/ej2-maps';
  
  Maps.Inject(Marker, Legend, MapsTooltip, Zoom);
  
  const mapData = [
    { latitude: 37.6872, longitude: -122.0808, name: 'San Francisco', value: 100 },
    { latitude: 34.0522, longitude: -118.2437, name: 'Los Angeles', value: 200 }
  ];
  
  const map = new Maps({
    width: '100%',
    height: '600px',
  
    centerPosition: { latitude: 37.6872, longitude: -122.0808 },
  
    zoomSettings: {
      enable: true,
      zoomFactor: 4,
      minZoom: 1,
      maxZoom: 15
    },
  
    titleSettings: {
      text: 'US Cities Map'
    },
  
    legendSettings: {
      visible: true,
      position: 'Bottom',
      title: {
        text: 'Cities'   
      }
    },
  
    layers: [
      {
        
        urlTemplate: 'your URL link',
  
        markerSettings: [
          {
            visible: true,
            dataSource: mapData,
            width: 30,
            height: 30,
            shape: 'Circle',
            fill: '#FF0000',
  
            tooltipSettings: {
              visible: true,
              valuePath: 'name',
              template: '<div>${name}: ${value}</div>'
            },
  
            selectionSettings: {
              enable: true,
              fill: '#FFFF00',
              opacity: 0.5
            }
          }
        ]
      }
    ],
  
    markerClick: (args: any) => {
      console.log('Marker clicked:', args.data);
    }
  });
  
  map.appendTo('#container');
```

---

## Key API Quick Reference

| Feature | Property | Type | Use |
|---------|----------|------|-----|
| Center | `centerPosition` | CenterPosition | Set initial map center |
| Zoom | `zoomSettings` | ZoomSettings | Configure zoom behavior |
| Layers | `layers` | LayerSettings[] | Add data layers |
| Markers | `markerSettings` | MarkerSettings | Add markers to map |
| Bubbles | `bubbleSettings` | BubbleSettings | Show data as bubbles |
| Lines | `navigationLineSettings` | NavigationLineSettings[] | Draw routes |
| Legend | `legendSettings` | LegendSettings | Configure legend |
| Tooltip | `tooltipSettings` | TooltipSettings | Show hover info |
| Selection | `selectionSettings` | SelectionSettings | Enable user selection |
| Colors | `colorMappings` | ColorMappingSettings[] | Data-driven coloring |
| Title | `titleSettings` | TitleSettings | Add map title |
| Events | `markerClick`, `zoomEnd`, etc. | Event handlers | Respond to interactions |

---

## Next Steps

- Implement features using the API reference
- Combine multiple settings for complex visualizations
- Handle events for interactive experiences
- Refer to specific reference documents for implementation patterns

````