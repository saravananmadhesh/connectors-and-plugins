# Markers in Flutter Maps

Markers denote specific locations on maps using built-in symbols or custom widgets at latitude/longitude coordinates. They work with both MapShapeLayer and MapTileLayer.

## Table of Contents
- [Overview](#overview)
- [Adding Markers](#adding-markers)
- [Built-in Marker Icons](#built-in-marker-icons)
- [Custom Marker Widgets](#custom-marker-widgets)
- [Marker Customization](#marker-customization)
- [Dynamic Marker Management](#dynamic-marker-management)
- [Marker Controllers](#marker-controllers)
- [Zoom to Fit Markers](#zoom-to-fit-markers)

## Overview

Markers provide:
- **Location pins** for points of interest
- **Built-in symbols** (circle, diamond, triangle, square, star)
- **Custom widgets** (icons, images, text)
- **Dynamic updates** (add, update, remove)
- **Tooltips** for marker information
- **Click handling** for interactions

## Adding Markers

### Shape Layer Markers

```dart
late List<MarkerModel> _markers;
late MapShapeSource _dataSource;

@override
void initState() {
  super.initState();
  
  _markers = [
    MarkerModel('New York', 40.7128, -74.0060),
    MarkerModel('London', 51.5074, -0.1278),
    MarkerModel('Tokyo', 35.6762, 139.6503),
  ];
  
  _dataSource = MapShapeSource.asset(
    'assets/world_map.json',
    shapeDataField: 'name',
  );
}

@override
Widget build(BuildContext context) {
  return SfMaps(
    layers: [
      MapShapeLayer(
        source: _dataSource,
        initialMarkersCount: _markers.length,
        markerBuilder: (BuildContext context, int index) {
          return MapMarker(
            latitude: _markers[index].latitude,
            longitude: _markers[index].longitude,
            iconColor: Colors.red,
          );
        },
      ),
    ],
  );
}

class MarkerModel {
  MarkerModel(this.city, this.latitude, this.longitude);
  final String city;
  final double latitude;
  final double longitude;
}
```

### Tile Layer Markers

```dart
late List<MarkerModel> _markers;

@override
void initState() {
  super.initState();
  
  _markers = [
    MarkerModel('Store 1', 37.7749, -122.4194),
    MarkerModel('Store 2', 37.8044, -122.2712),
    MarkerModel('Store 3', 37.6879, -122.4702),
  ];
}

@override
Widget build(BuildContext context) {
  return SfMaps(
    layers: [
      MapTileLayer(
        urlTemplate: 'url',
        initialFocalLatLng: MapLatLng(37.7749, -122.4194),
        initialZoomLevel: 10,
        initialMarkersCount: _markers.length,
        markerBuilder: (BuildContext context, int index) {
          return MapMarker(
            latitude: _markers[index].latitude,
            longitude: _markers[index].longitude,
            child: Icon(Icons.location_on, color: Colors.red),
          );
        },
      ),
    ],
  );
}
```

## Built-in Marker Icons

### Icon Types

```dart
MapMarker(
  latitude: 40.7128,
  longitude: -74.0060,
  iconType: MapIconType.circle,    // Default
  iconColor: Colors.blue,
  iconStrokeColor: Colors.white,
  iconStrokeWidth: 2,
  size: Size(20, 20),
)
```

### Available Icon Types

```dart
// Circle (default)
iconType: MapIconType.circle

// Diamond
iconType: MapIconType.diamond

// Triangle
iconType: MapIconType.triangle

// Rectangle/Square
iconType: MapIconType.rectangle

// Inverted Triangle
iconType: MapIconType.invertedTriangle
```

### Icon Styling Examples

```dart
// Red circle marker
MapMarker(
  latitude: lat,
  longitude: lng,
  iconType: MapIconType.circle,
  iconColor: Colors.red,
  size: Size(15, 15),
)

// Blue diamond with white border
MapMarker(
  latitude: lat,
  longitude: lng,
  iconType: MapIconType.diamond,
  iconColor: Colors.blue,
  iconStrokeColor: Colors.white,
  iconStrokeWidth: 2,
  size: Size(18, 18),
)

// Green triangle
MapMarker(
  latitude: lat,
  longitude: lng,
  iconType: MapIconType.triangle,
  iconColor: Colors.green,
  size: Size(20, 20),
)
```

## Custom Marker Widgets

### Using Flutter Icons

```dart
MapMarker(
  latitude: 40.7128,
  longitude: -74.0060,
  child: Icon(
    Icons.location_on,
    color: Colors.red,
    size: 30,
  ),
)
```

### Custom Icon Library

```dart
late List<Widget> _customIcons;

@override
void initState() {
  super.initState();
  
  _customIcons = [
    Icon(Icons.restaurant, color: Colors.orange, size: 25),
    Icon(Icons.local_hospital, color: Colors.red, size: 25),
    Icon(Icons.school, color: Colors.blue, size: 25),
    Icon(Icons.shopping_cart, color: Colors.green, size: 25),
  ];
}

markerBuilder: (context, index) {
  return MapMarker(
    latitude: _locations[index].lat,
    longitude: _locations[index].lng,
    child: _customIcons[_locations[index].type],
  );
}
```

### Image Markers

```dart
MapMarker(
  latitude: 40.7128,
  longitude: -74.0060,
  child: Image.asset(
    'assets/marker_pin.png',
    width: 30,
    height: 30,
  ),
)
```

### Network Image Markers

```dart
MapMarker(
  latitude: 40.7128,
  longitude: -74.0060,
  child: CircleAvatar(
    backgroundImage: NetworkImage('url'), 
    radius: 15,
  ),
)
```

### Complex Custom Widgets

```dart
MapMarker(
  latitude: 40.7128,
  longitude: -74.0060,
  child: Container(
    padding: EdgeInsets.all(8),
    decoration: BoxDecoration(
      color: Colors.white,
      borderRadius: BorderRadius.circular(8),
      boxShadow: [
        BoxShadow(
          color: Colors.black26,
          blurRadius: 4,
          offset: Offset(0, 2),
        ),
      ],
    ),
    child: Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(Icons.location_city, color: Colors.blue, size: 20),
        SizedBox(height: 4),
        Text('NYC', style: TextStyle(fontSize: 10)),
      ],
    ),
  ),
)
```

## Marker Customization

### Alignment

Position the marker relative to its coordinates:

```dart
MapMarker(
  latitude: 40.7128,
  longitude: -74.0060,
  child: Icon(Icons.location_on, size: 30),
  alignment: Alignment.bottomCenter,  // Pin points to location
)
```

**Alignment Options:**
- `Alignment.center` (default)
- `Alignment.topLeft`
- `Alignment.topCenter`
- `Alignment.topRight`
- `Alignment.centerLeft`
- `Alignment.centerRight`
- `Alignment.bottomLeft`
- `Alignment.bottomCenter`
- `Alignment.bottomRight`

### Offset

Fine-tune marker position:

```dart
MapMarker(
  latitude: 40.7128,
  longitude: -74.0060,
  child: Icon(Icons.location_on),
  offset: Offset(0, -15),  // Move up 15 pixels
)
```

### Combining Alignment and Offset

```dart
// Pin marker that points exactly to location
MapMarker(
  latitude: 40.7128,
  longitude: -74.0060,
  child: Icon(Icons.location_on, size: 40, color: Colors.red),
  alignment: Alignment.bottomCenter,
  offset: Offset(0, -20),
)
```

## Dynamic Marker Management

### Adding Markers

Use controller to add markers dynamically:

```dart
late MapShapeLayerController _controller;
late List<MarkerModel> _markers;

@override
void initState() {
  super.initState();
  _controller = MapShapeLayerController();
  _markers = [];
}

void _addMarker(double lat, double lng) {
  setState(() {
    _markers.add(MarkerModel('New Location', lat, lng));
    _controller.insertMarker(_markers.length - 1);
  });
}

MapShapeLayer(
  source: _dataSource,
  controller: _controller,
  initialMarkersCount: _markers.length,
  markerBuilder: (context, index) {
    return MapMarker(
      latitude: _markers[index].latitude,
      longitude: _markers[index].longitude,
      child: Icon(Icons.place, color: Colors.red),
    );
  },
)
```

### Updating Markers

```dart
late MapShapeLayerController _controller;
late List<MarkerModel> _markers;

void _updateMarker(int index, double newLat, double newLng) {
  setState(() {
    _markers[index].latitude = newLat;
    _markers[index].longitude = newLng;
    _controller.updateMarkers([index]);
  });
}

// Update multiple markers
void _updateMultipleMarkers(List<int> indices) {
  setState(() {
    for (int index in indices) {
      // Update marker data
      _markers[index].latitude = newLatitude;
    }
    _controller.updateMarkers(indices);
  });
}
```

### Removing Markers

```dart
void _removeMarker(int index) {
  setState(() {
    _markers.removeAt(index);
    _controller.removeMarkerAt(index);
  });
}
```

### Clearing All Markers

```dart
void _clearAllMarkers() {
  setState(() {
    _markers.clear();
    _controller.clearMarkers();
  });
}
```

## Marker Controllers

### MapShapeLayerController

```dart
late MapShapeLayerController _controller;

@override
void initState() {
  super.initState();
  _controller = MapShapeLayerController();
}

MapShapeLayer(
  source: _dataSource,
  controller: _controller,
  // ... marker configuration
)

// Controller methods:
_controller.insertMarker(index);           // Add marker
_controller.updateMarkers([indices]);      // Update markers
_controller.removeMarkerAt(index);         // Remove marker
_controller.clearMarkers();                // Clear all
_controller.markersCount;                  // Get count
```

### MapTileLayerController

```dart
late MapTileLayerController _controller;

@override
void initState() {
  super.initState();
  _controller = MapTileLayerController();
}

MapTileLayer(
  urlTemplate: 'url',
  controller: _controller,
  // ... marker configuration
)

// Same methods as MapShapeLayerController
```

### Tap to Add Marker Pattern

```dart
late MapLatLng _markerPosition;
late MapShapeLayerController _controller;
late CustomZoomPanBehavior _zoomPanBehavior;

@override
void initState() {
  super.initState();
  _controller = MapShapeLayerController();
  _zoomPanBehavior = CustomZoomPanBehavior()
    ..onTap = _handleTap;
}

void _handleTap(Offset position) {
  setState(() {
    _markerPosition = _controller.pixelToLatLng(position);
    
    // Remove existing marker
    if (_controller.markersCount > 0) {
      _controller.clearMarkers();
    }
    
    // Add new marker
    _controller.insertMarker(0);
  });
}

MapShapeLayer(
  source: _dataSource,
  controller: _controller,
  zoomPanBehavior: _zoomPanBehavior,
  markerBuilder: (context, index) {
    return MapMarker(
      latitude: _markerPosition.latitude,
      longitude: _markerPosition.longitude,
      child: Icon(Icons.location_on, color: Colors.red, size: 30),
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

## Zoom to Fit Markers

Show all markers within view by setting bounds:

```dart
late MapZoomPanBehavior _zoomPanBehavior;
late List<MarkerModel> _markers;

@override
void initState() {
  super.initState();
  
  _markers = [
    MarkerModel('NYC', 40.7128, -74.0060),
    MarkerModel('LA', 34.0522, -118.2437),
    MarkerModel('Chicago', 41.8781, -87.6298),
  ];
  
  _zoomPanBehavior = MapZoomPanBehavior();
}

void _fitMarkersInView() {
  // Calculate bounds from markers
  double minLat = _markers.map((m) => m.latitude).reduce((a, b) => a < b ? a : b);
  double maxLat = _markers.map((m) => m.latitude).reduce((a, b) => a > b ? a : b);
  double minLng = _markers.map((m) => m.longitude).reduce((a, b) => a < b ? a : b);
  double maxLng = _markers.map((m) => m.longitude).reduce((a, b) => a > b ? a : b);
  
  setState(() {
    _zoomPanBehavior.latLngBounds = MapLatLngBounds(
      MapLatLng(minLat, minLng),  // Southwest
      MapLatLng(maxLat, maxLng),  // Northeast
    );
  });
}

MapTileLayer(
  urlTemplate: 'url',
  zoomPanBehavior: _zoomPanBehavior,
  // ... markers
)
```

### Initial Bounds

Fit markers on initial load:

```dart
MapTileLayer(
  urlTemplate: 'url',
  initialLatLngBounds: MapLatLngBounds(
    MapLatLng(southwestLat, southwestLng),
    MapLatLng(northeastLat, northeastLng),
  ),
  // ... markers
)
```

## Common Patterns

### Pattern 1: Store Locator

```dart
class StoreLocator extends StatefulWidget {
  @override
  _StoreLocatorState createState() => _StoreLocatorState();
}

class _StoreLocatorState extends State<StoreLocator> {
  late List<Store> _stores;
  
  @override
  void initState() {
    super.initState();
    _stores = [
      Store('Store 1', 'Address 1', 37.7749, -122.4194),
      Store('Store 2', 'Address 2', 37.8044, -122.2712),
    ];
  }
  
  @override
  Widget build(BuildContext context) {
    return SfMaps(
      layers: [
        MapTileLayer(
          urlTemplate: 'url',
          initialFocalLatLng: MapLatLng(37.7749, -122.4194),
          initialZoomLevel: 11,
          initialMarkersCount: _stores.length,
          markerBuilder: (context, index) {
            return MapMarker(
              latitude: _stores[index].latitude,
              longitude: _stores[index].longitude,
              child: GestureDetector(
                onTap: () => _showStoreDetails(_stores[index]),
                child: Icon(
                  Icons.store,
                  color: Colors.blue,
                  size: 30,
                ),
              ),
            );
          },
          markerTooltipBuilder: (context, index) {
            return Container(
              padding: EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(4),
              ),
              child: Text(_stores[index].name),
            );
          },
        ),
      ],
    );
  }
  
  void _showStoreDetails(Store store) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(store.name),
        content: Text(store.address),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Close'),
          ),
        ],
      ),
    );
  }
}

class Store {
  Store(this.name, this.address, this.latitude, this.longitude);
  final String name;
  final String address;
  final double latitude;
  final double longitude;
}
```

### Pattern 2: Different Marker Types

```dart
enum LocationType { restaurant, hospital, school, park }

class LocationMarker {
  LocationMarker(this.name, this.type, this.lat, this.lng);
  final String name;
  final LocationType type;
  final double lat;
  final double lng;
}

Widget _buildMarkerIcon(LocationType type) {
  switch (type) {
    case LocationType.restaurant:
      return Icon(Icons.restaurant, color: Colors.orange, size: 25);
    case LocationType.hospital:
      return Icon(Icons.local_hospital, color: Colors.red, size: 25);
    case LocationType.school:
      return Icon(Icons.school, color: Colors.blue, size: 25);
    case LocationType.park:
      return Icon(Icons.park, color: Colors.green, size: 25);
  }
}

markerBuilder: (context, index) {
  return MapMarker(
    latitude: _locations[index].lat,
    longitude: _locations[index].lng,
    child: _buildMarkerIcon(_locations[index].type),
  );
}
```

## Troubleshooting

### Issue: Markers Not Visible

**Causes:**
1. Coordinates outside map bounds
2. `initialMarkersCount` is 0 or not set
3. Marker size is too small
4. Layer rendering issue

**Solutions:**
- Verify latitude/longitude values
- Set `initialMarkersCount` correctly
- Increase marker size
- Check layer configuration

### Issue: Marker Position Incorrect

**Solution:** Use `alignment` and `offset` properties to adjust positioning

### Issue: Too Many Markers Slow Performance

**Solutions:**
- Implement marker clustering
- Show/hide markers based on zoom level
- Limit visible markers
- Use marker icons instead of complex widgets
