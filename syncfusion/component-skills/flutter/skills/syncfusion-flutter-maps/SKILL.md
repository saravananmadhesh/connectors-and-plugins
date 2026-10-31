---
name: syncfusion-flutter-maps
description: Implements Syncfusion Flutter Maps (SfMaps) for interactive geographical data visualization in Flutter apps. Use when working with shape layers, tile layers, choropleth maps, or map markers and overlays. This skill covers GeoJSON rendering, OpenStreetMap/Bing Maps integration, bubbles, legends, tooltips, zoom and pan, and spatial data visualization.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion Flutter Maps

This skill covers the Syncfusion Flutter Maps (SfMaps) widget for displaying and visualizing geographical and spatial data. The widget supports two primary layer types: **MapShapeLayer** (for GeoJSON-based shape rendering) and **MapTileLayer** (for web map tile services like OpenStreetMap and Bing Maps).

## When to Use This Skill

Use this skill when you need to:

- **Display interactive maps** with zoom, pan, and selection capabilities
- **Visualize geographical data** using shapes, colors, and bubbles
- **Render GeoJSON data** as maps (countries, states, regions, custom shapes)
- **Integrate tile-based maps** from providers.
- **Add markers to maps** for locations, points of interest, or custom coordinates
- **Create choropleth maps** with color-coded regions based on data values
- **Build bubble maps** showing data through size and color variations
- **Display data labels and legends** for map interpretation
- **Implement tooltips** for shapes, bubbles, and markers
- **Enable map interactions** including selection, zoom, pan, and navigation
- **Add vector layers** (arcs, circles, lines, polygons, polylines) for custom overlays
- **Visualize spatial relationships** with sublayers and hierarchical data
- **Create location-based applications** with coordinate mapping

## Component Overview

The **SfMaps** widget is a comprehensive mapping solution for Flutter that supports two primary layer types:

**MapShapeLayer** - GeoJSON-based shape rendering for statistical and geographical data visualization. Features include choropleth maps with color/range mapping, bubble visualizations, data labels, shape selection, legends, tooltips, sublayers for hierarchical data, vector layers (arcs, circles, lines, polygons, polylines), markers, zoom and pan gestures, and offline support. Ideal for election maps, sales territories, census data, and region-based analytics.

**MapTileLayer** - Web map tile service integration for OpenStreetMap, Bing Maps, Google Maps, and TomTom. Features include real-world street maps with detailed geography, markers for location pins, sublayers, vector layers, zoom and pan with configurable levels, initial focal point and zoom, and WMTS URL templates. Requires internet connectivity. Perfect for store locators, delivery tracking, and navigation apps.

Both layer types support markers (built-in symbols and custom widgets), zoom/pan behavior with pinch/mouse wheel/double-tap gestures, vector layer overlays, accessibility features, RTL support, and theming through `SfMapsTheme`.

## Choosing the Right Layer Type

### Use **MapShapeLayer** when:
- You have **GeoJSON data** defining geographical shapes
- You need **choropleth maps** (color-coded by region/country)
- Your data is **statistical** and tied to geographical boundaries
- You want **complete control** over shape appearance and data binding
- You need **offline maps** that don't require external tile services
- **Custom shapes** or specific regions need to be highlighted
- Building: election maps, sales territory maps, census data visualizations, region comparisons

### Use **MapTileLayer** when:
- You need **real-world street maps** from providers like OpenStreetMap
- Your app requires **detailed geographical features** (roads, landmarks, terrain)
- **Online connectivity** is available for tile loading
- You want **standard map views** without custom data rendering
- **Street-level detail** or satellite imagery is needed
- You need to show **precise locations** on familiar map backgrounds
- Building: store locators, delivery tracking, navigation apps, location pickers

### Key Differences Summary:

| Feature | MapShapeLayer | MapTileLayer |
|---------|---------------|--------------|
| **Data Source** | GeoJSON files | Web tile services (URLs) |
| **Offline Support** | ✅ Yes (embedded GeoJSON) | ❌ Requires internet |
| **Data Binding** | ✅ Full support | ❌ Limited to markers |
| **Choropleth Maps** | ✅ Yes | ❌ No |
| **Bubble Visualization** | ✅ Yes | ❌ No |
| **Data Labels** | ✅ Yes | ❌ No |
| **Shape Selection** | ✅ Yes | ❌ No |
| **Color Mapping** | ✅ Yes | ❌ No |
| **Legend** | ✅ Yes | ❌ No |
| **Markers** | ✅ Yes | ✅ Yes |
| **Zoom & Pan** | ✅ Yes | ✅ Yes |
| **Street Maps** | ❌ No | ✅ Yes |
| **Sublayers** | ✅ Yes | ✅ Yes |
| **Vector Layers** | ✅ Yes (arc, circle, line, etc.) | ✅ Yes (arc, circle, line, etc.) |
| **Tooltips** | ✅ Yes (shapes & bubbles) | ❌ Limited |
| **Real-world Detail** | ❌ Limited | ✅ High detail |

## Documentation and Navigation Guide

### Getting Started

📄 **Read:** [references/getting-started.md](references/getting-started.md)

When to read: First-time setup, installation, basic map creation

**Topics covered:**
- Installation and package setup
- Basic MapShapeLayer implementation
- Basic MapTileLayer implementation
- Loading GeoJSON data (asset, network, memory)
- OpenStreetMap quick start
- Package dependencies and imports

### Layer Overview

#### Shape Layer

📄 **Read:** [references/shape-layer.md](references/shape-layer.md)

When to read: Working with vector maps, GeoJSON data, choropleth maps, data binding

**Topics covered:**
- MapShapeLayer widget overview and features
- GeoJSON data source configuration
- Shape data field mapping
- Shape appearance (color, stroke)
- Loading progress indicator
- Basic shape rendering
- Color mapping strategies

#### Tile Layer

📄 **Read:** [references/tile-layer.md](references/tile-layer.md)

When to read: Integrating OpenStreetMap, Bing Maps, or other tile providers

**Topics covered:**
- MapTileLayer widget overview and features
- URL template format (WMTS specification)
- OpenStreetMap integration
- Bing Maps setup and API keys
- Other providers (TomTom, MapBox, Google Maps)
- Initial focal point configuration
- Initial zoom level setup

### Markers

📄 **Read:** [references/markers.md](references/markers.md)

When to read: Adding location markers, pins, or custom markers to maps

**Topics covered:**
- Adding markers to both layer types
- Built-in marker symbols (circle, diamond, triangle, etc.)
- Custom marker widgets
- Marker positioning (latitude/longitude)
- Marker appearance customization
- Dynamic marker management (add/update/remove)
- Marker controllers (MapShapeLayerController/MapTileLayerController)
- Marker alignment and offset
- Zoom markers to fit bounds

### Data Visualization Features (Shape Layer)

#### Data Labels

📄 **Read:** [references/data-labels.md](references/data-labels.md)

When to read: Displaying text labels on map shapes

**Topics covered:**
- Showing data labels on shapes
- Data label mapper configuration
- Label text customization
- Label trimming and overflow handling
- Label styling and positioning
- Smart label behavior

#### Legends

📄 **Read:** [references/legend.md](references/legend.md)

When to read: Adding legends for shapes or bubbles

**Topics covered:**
- Legend configuration and positioning
- Legend for shape colors
- Legend for bubbles
- Legend customization (icons, text, layout)
- Legend toggling feature
- Legend interactions
- Text style configuration

#### Tooltips

📄 **Read:** [references/tooltip.md](references/tooltip.md)

When to read: Adding interactive tooltips to map elements

**Topics covered:**
- Shape tooltips with builders
- Bubble tooltips
- Marker tooltips
- Tooltip customization
- Tooltip styling and positioning
- Tooltip settings (color, stroke, padding)

#### Bubbles

📄 **Read:** [references/bubble.md](references/bubble.md)

When to read: Visualizing data with size/color-coded bubbles on shapes

**Topics covered:**
- Bubble visualization overview
- Bubble size mapping based on data
- Bubble color mapping
- Bubble appearance customization
- Bubble tooltips
- Use cases for bubble maps

### Color and Data Mapping

📄 **Read:** [references/color-mapping.md](references/color-mapping.md)

When to read: Mapping data values to colors for shapes or bubbles

**Topics covered:**
- Equal color mapping (discrete values)
- Range color mapping (continuous ranges)
- Shape color value mapper
- Bubble color value mapper
- Color mappers configuration
- Opacity settings (min/max)
- Returning colors directly vs using mappers
- Color mapping patterns

### Selection and Interaction Features

#### Selection

📄 **Read:** [references/selection.md](references/selection.md)

When to read: Enabling shape selection and handling user interactions

**Topics covered:**
- Shape selection feature
- Selection callbacks
- Selection styling and decoration
- Single vs multi-selection
- Programmatic selection
- Toggling selection
- Selection events and handlers

#### Zoom and Pan

📄 **Read:** [references/zoom-pan.md](references/zoom-pan.md)

When to read: Enabling zoom, pan, and navigation features

**Topics covered:**
- MapZoomPanBehavior configuration
- Pinch zoom (mobile)
- Mouse wheel zoom (desktop)
- Zoom toolbar (web platform)
- Double-tap zoom
- Zoom level configuration
- Pan behavior and restrictions
- Focal latitude/longitude bounds
- Zoom callbacks and events

### Advanced Features

#### Vector Layers

📄 **Read:** [references/vector-layers.md](references/vector-layers.md)

When to read: Adding additional vector overlays to maps

**Topics covered:**
- MapArcLayer (arcs between two coordinates)
- MapCircleLayer (circles at specific coordinates)
- MapLineLayer (lines connecting coordinates)
- MapPolygonLayer (polygon shapes)
- MapPolylineLayer (connected line segments)
- Vector layer styling and customization
- Use cases for each vector type

#### Sublayers

📄 **Read:** [references/shape-sublayer.md](references/shape-sublayer.md)

When to read: Adding multiple layers and hierarchical data visualization

**Topics covered:**
- Adding sublayers to MapShapeLayer
- Sublayer configuration and nesting
- Sublayer markers and bubbles
- Hierarchical data visualization
- Use cases for sublayers
- Layer ordering and z-index

### Customization and Theming

#### Customization

📄 **Read:** [references/customization.md](references/customization.md)

When to read: Customizing map appearance and styling

**Topics covered:**
- SfMapsTheme integration
- Visual appearance customization
- Shape styling (colors, borders)
- Hover effects (web platform)
- Theme integration
- Responsive design patterns
- Custom map styling

#### Accessibility

📄 **Read:** [references/accessibility.md](references/accessibility.md)

When to read: Implementing accessible map features for all users

**Topics covered:**
- Screen reader support
- Semantic labels for shapes
- Keyboard navigation
- WCAG compliance
- Focus indicators
- Accessible map interactions

## Quick Start Examples

### Basic Shape Layer with GeoJSON

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_maps/maps.dart';

class MyShapeMap extends StatefulWidget {
  @override
  _MyShapeMapState createState() => _MyShapeMapState();
}

class _MyShapeMapState extends State<MyShapeMap> {
  late MapShapeSource _dataSource;
  
  @override
  void initState() {
    super.initState();
    _dataSource = MapShapeSource.asset(
      'assets/world_map.json',
      shapeDataField: 'name',
    );
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('World Map')),
      body: Padding(
        padding: EdgeInsets.all(15),
        child: SfMaps(
          layers: [
            MapShapeLayer(
              source: _dataSource,
              color: Colors.blue[100],
              strokeColor: Colors.blue,
              strokeWidth: 0.5,
            ),
          ],
        ),
      ),
    );
  }
}
```

### Basic Tile Layer with OpenStreetMap

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_maps/maps.dart';

class MyTileMap extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('OpenStreetMap')),
      body: SfMaps(
        layers: [
          MapTileLayer(
            urlTemplate: 'url',
            initialFocalLatLng: MapLatLng(27.1751, 78.0421),
            initialZoomLevel: 5,
          ),
        ],
      ),
    );
  }
}
```

### Choropleth Map with Color Mapping

```dart
class ChoroplethMap extends StatefulWidget {
  @override
  _ChoroplethMapState createState() => _ChoroplethMapState();
}

class _ChoroplethMapState extends State<ChoroplethMap> {
  late List<Model> _data;
  late MapShapeSource _dataSource;
  
  @override
  void initState() {
    super.initState();
    _data = [
      Model('India', 280),
      Model('United States of America', 190),
      Model('Brazil', 120),
    ];
    
    _dataSource = MapShapeSource.asset(
      'assets/world_map.json',
      shapeDataField: 'name',
      dataCount: _data.length,
      primaryValueMapper: (int index) => _data[index].country,
      shapeColorValueMapper: (int index) => _data[index].value,
      shapeColorMappers: [
        MapColorMapper(from: 0, to: 100, color: Colors.red),
        MapColorMapper(from: 101, to: 300, color: Colors.green),
      ],
    );
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SfMaps(
        layers: [
          MapShapeLayer(
            source: _dataSource,
            legend: MapLegend(MapElement.shape),
            showDataLabels: true,
          ),
        ],
      ),
    );
  }
}

class Model {
  Model(this.country, this.value);
  final String country;
  final double value;
}
```

### Map with Markers

```dart
class MapWithMarkers extends StatefulWidget {
  @override
  _MapWithMarkersState createState() => _MapWithMarkersState();
}

class _MapWithMarkersState extends State<MapWithMarkers> {
  late List<MarkerData> _markers;
  late MapShapeSource _dataSource;
  
  @override
  void initState() {
    super.initState();
    _markers = [
      MarkerData('New York', 40.7128, -74.0060),
      MarkerData('London', 51.5074, -0.1278),
      MarkerData('Tokyo', 35.6762, 139.6503),
    ];
    
    _dataSource = MapShapeSource.asset(
      'assets/world_map.json',
      shapeDataField: 'name',
    );
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SfMaps(
        layers: [
          MapShapeLayer(
            source: _dataSource,
            initialMarkersCount: _markers.length,
            markerBuilder: (BuildContext context, int index) {
              return MapMarker(
                latitude: _markers[index].latitude,
                longitude: _markers[index].longitude,
                iconColor: Colors.red,
                iconType: MapIconType.circle,
                size: Size(15, 15),
                child: null,
              );
            },
          ),
        ],
      ),
    );
  }
}

class MarkerData {
  MarkerData(this.city, this.latitude, this.longitude);
  final String city;
  final double latitude;
  final double longitude;
}
```

## Common Patterns

### Pattern 1: Interactive Choropleth Map with Selection

```dart
// Common pattern for election results, sales data by region, etc.
late MapShapeSource _dataSource;
int? _selectedIndex;

_dataSource = MapShapeSource.asset(
  'assets/usa_states.json',
  shapeDataField: 'name',
  dataCount: _statesData.length,
  primaryValueMapper: (index) => _statesData[index].state,
  shapeColorValueMapper: (index) => _statesData[index].value,
  shapeColorMappers: [
    MapColorMapper(from: 0, to: 50, color: Colors.red),
    MapColorMapper(from: 51, to: 100, color: Colors.blue),
  ],
);

MapShapeLayer(
  source: _dataSource,
  legend: MapLegend(MapElement.shape),
  showDataLabels: true,
  onSelectionChanged: (int index) {
    setState(() {
      _selectedIndex = index;
    });
  },
  selectionSettings: MapSelectionSettings(
    color: Colors.yellow,
    strokeColor: Colors.black,
    strokeWidth: 2,
  ),
)
```

### Pattern 2: Tile Layer with Custom Markers

```dart
// Common pattern for store locator, delivery tracking
late List<LocationData> _locations;
late MapTileLayerController _controller;

@override
void initState() {
  _controller = MapTileLayerController();
  _locations = [/* your location data */];
  super.initState();
}

MapTileLayer(
  urlTemplate: 'url',
  initialFocalLatLng: MapLatLng(37.7749, -122.4194),
  initialZoomLevel: 10,
  controller: _controller,
  initialMarkersCount: _locations.length,
  markerBuilder: (context, index) {
    return MapMarker(
      latitude: _locations[index].latitude,
      longitude: _locations[index].longitude,
      child: Icon(Icons.location_pin, color: Colors.red, size: 30),
    );
  },
  zoomPanBehavior: MapZoomPanBehavior(
    enableDoubleTapZooming: true,
    enablePinching: true,
    enablePanning: true,
  ),
)
```

### Pattern 3: Map with Bubbles and Tooltips

```dart
// Common pattern for population density, sales volume visualization
_dataSource = MapShapeSource.asset(
  'assets/world_map.json',
  shapeDataField: 'name',
  dataCount: _data.length,
  primaryValueMapper: (index) => _data[index].country,
  bubbleSizeMapper: (index) => _data[index].population,
  bubbleColorValueMapper: (index) => _data[index].density,
);

MapShapeLayer(
  source: _dataSource,
  showDataLabels: true,
  legend: MapLegend.bar(MapElement.bubble),
  bubbleSettings: MapBubbleSettings(
    maxRadius: 50,
    minRadius: 10,
    color: Colors.blue,
  ),
  shapeTooltipBuilder: (context, index) {
    return Padding(
      padding: EdgeInsets.all(8),
      child: Text(
        '${_data[index].country}: ${_data[index].population}M',
        style: TextStyle(color: Colors.white),
      ),
    );
  },
  bubbleTooltipBuilder: (context, index) {
    return Padding(
      padding: EdgeInsets.all(8),
      child: Text(
        'Density: ${_data[index].density}/km²',
        style: TextStyle(color: Colors.white),
      ),
    );
  },
)
```

### Pattern 4: Zoom to Fit Markers

```dart
// Show specific region with markers
late MapZoomPanBehavior _zoomPanBehavior;

@override
void initState() {
  _zoomPanBehavior = MapZoomPanBehavior(
    enableDoubleTapZooming: true,
    enablePinching: true,
    enablePanning: true,
  );
  super.initState();
}

// Button to fit bounds
void _fitToMarkers() {
  setState(() {
    // Define bounds to show all markers
    _zoomPanBehavior.latLngBounds = MapLatLngBounds(
      MapLatLng(southwestLat, southwestLng),
      MapLatLng(northeastLat, northeastLng),
    );
  });
}

MapShapeLayer(
  source: _dataSource,
  zoomPanBehavior: _zoomPanBehavior,
  // ... markers
)
```

### Pattern 5: Dynamic Marker Addition (Tap to Add)

```dart
// Add markers where user taps
late MapLatLng _markerPosition;
late MapShapeLayerController _controller;
late CustomZoomPanBehavior _zoomPanBehavior;

@override
void initState() {
  _controller = MapShapeLayerController();
  _zoomPanBehavior = CustomZoomPanBehavior()
    ..onTap = _handleTap;
  super.initState();
}

void _handleTap(Offset position) {
  _markerPosition = _controller.pixelToLatLng(position);
  if (_controller.markersCount > 0) {
    _controller.clearMarkers();
  }
  _controller.insertMarker(0);
}

MapShapeLayer(
  source: _dataSource,
  controller: _controller,
  zoomPanBehavior: _zoomPanBehavior,
  markerBuilder: (context, index) {
    return MapMarker(
      latitude: _markerPosition.latitude,
      longitude: _markerPosition.longitude,
      child: Icon(Icons.location_on, color: Colors.red),
    );
  },
)

class CustomZoomPanBehavior extends MapZoomPanBehavior {
  late Function(Offset) onTap;
  
  @override
  void handleEvent(PointerEvent event) {
    if (event is PointerUpEvent) {
      onTap(event.localPosition);
    }
    super.handleEvent(event);
  }
}
```

## Key Properties

### MapShapeLayer Essential Properties

- `source` - MapShapeSource with GeoJSON data and mappings
- `color` - Default color for all shapes
- `strokeColor` - Border color for shapes
- `strokeWidth` - Border width for shapes
- `legend` - Legend configuration (bar or default)
- `showDataLabels` - Show labels on shapes
- `initialMarkersCount` - Number of markers to display
- `markerBuilder` - Builder function for markers
- `controller` - MapShapeLayerController for dynamic updates
- `zoomPanBehavior` - Zoom and pan configuration
- `onSelectionChanged` - Callback when shape is selected
- `selectionSettings` - Selection appearance settings
- `shapeTooltipBuilder` - Custom tooltip for shapes
- `bubbleTooltipBuilder` - Custom tooltip for bubbles
- `markerTooltipBuilder` - Custom tooltip for markers
- `tooltipSettings` - Tooltip styling configuration
- `bubbleSettings` - Bubble appearance settings
- `dataLabelSettings` - Data label styling
- `legendSettings` - Legend appearance settings
- `sublayers` - List of MapSublayer widgets
- `loadingBuilder` - Widget shown while loading GeoJSON

### MapTileLayer Essential Properties

- `urlTemplate` - Tile provider URL in WMTS format
- `initialFocalLatLng` - Initial center point (latitude, longitude)
- `initialZoomLevel` - Initial zoom level (1-15+)
- `initialMarkersCount` - Number of markers to display
- `markerBuilder` - Builder function for markers
- `controller` - MapTileLayerController for dynamic updates
- `zoomPanBehavior` - Zoom and pan configuration
- `markerTooltipBuilder` - Custom tooltip for markers
- `initialLatLngBounds` - Bounds to fit on load

### MapShapeSource Essential Properties

- `shapeDataField` - Field name in GeoJSON to match with data
- `dataCount` - Number of data items
- `primaryValueMapper` - Maps data index to shape identifier
- `dataLabelMapper` - Maps data index to label text
- `shapeColorValueMapper` - Maps data index to color value
- `shapeColorMappers` - Color mappers for equal/range mapping
- `bubbleSizeMapper` - Maps data index to bubble size
- `bubbleColorValueMapper` - Maps data index to bubble color
- `bubbleColorMappers` - Color mappers for bubbles

### MapZoomPanBehavior Essential Properties

- `enableDoubleTapZooming` - Enable double-tap to zoom
- `enablePinching` - Enable pinch zoom (mobile)
- `enablePanning` - Enable pan gesture
- `enableMouseWheelZooming` - Enable mouse wheel zoom
- `showToolbar` - Show zoom toolbar (web)
- `toolbarSettings` - Toolbar appearance
- `zoomLevel` - Current zoom level (read/write)
- `focalLatLng` - Current center point (read/write)
- `latLngBounds` - Bounds to fit dynamically
- `minZoomLevel` - Minimum zoom level
- `maxZoomLevel` - Maximum zoom level
- `onZooming` - Callback during zoom
- `onPanning` - Callback during pan

## Common Use Cases

1. **Election Results Map** - Use MapShapeLayer with color mapping by state/region
2. **Store Locator** - Use MapTileLayer with custom marker icons
3. **Sales Territory Map** - Use MapShapeLayer with bubbles showing sales volume
4. **Population Density Map** - Use MapShapeLayer with choropleth coloring
5. **Delivery Tracking** - Use MapTileLayer with real-time marker updates
6. **Weather Map** - Use MapShapeLayer with color mapping for temperature/conditions
7. **Property Finder** - Use MapTileLayer with markers and zoom-to-fit
8. **Regional Analytics** - Use MapShapeLayer with legends, tooltips, and selection
9. **Route Planning** - Use MapTileLayer with polyline vector layers
10. **Census Data Visualization** - Use MapShapeLayer with data labels and legends
