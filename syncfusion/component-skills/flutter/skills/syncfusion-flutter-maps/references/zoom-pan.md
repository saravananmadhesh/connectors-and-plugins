# Zoom and Pan in Flutter Maps

Enable interactive map navigation with zoom and pan gestures. Essential for exploring large geographical areas and detailed map features.

## Table of Contents
- [Overview](#overview)
- [Enable Zoom and Pan](#enable-zoom-and-pan)
- [Zoom Methods](#zoom-methods)
- [Pan Behavior](#pan-behavior)
- [Zoom Level Configuration](#zoom-level-configuration)
- [Zoom Callbacks](#zoom-callbacks)

## Overview

MapZoomPanBehavior provides:
- **Pinch zoom** (mobile/touch devices)
- **Mouse wheel zoom** (desktop)
- **Double-tap zoom**
- **Toolbar zoom** (web platform)
- **Pan/drag** to navigate
- **Programmatic zoom** control

## Enable Zoom and Pan

Create and assign `MapZoomPanBehavior`:

```dart
late MapZoomPanBehavior _zoomPanBehavior;

@override
void initState() {
  super.initState();
  _zoomPanBehavior = MapZoomPanBehavior(
    enableDoubleTapZooming: true,
    enablePinching: true,
    enablePanning: true,
  );
}

@override
Widget build(BuildContext context) {
  return SfMaps(
    layers: [
      MapShapeLayer(
        source: _dataSource,
        zoomPanBehavior: _zoomPanBehavior,
      ),
    ],
  );
}
```

## Zoom Methods

### Pinch Zoom (Mobile)

```dart
MapZoomPanBehavior(
  enablePinching: true,  // Pinch to zoom on mobile
)
```

### Mouse Wheel Zoom (Desktop)

```dart
MapZoomPanBehavior(
  enableMouseWheelZooming: true,  // Scroll to zoom
)
```

### Double-Tap Zoom

```dart
MapZoomPanBehavior(
  enableDoubleTapZooming: true,  // Double-tap to zoom in
)
```

### Zoom Toolbar (Web)

```dart
MapZoomPanBehavior(
  showToolbar: true,  // Show zoom +/- buttons
  toolbarSettings: MapToolbarSettings(
    position: MapToolbarPosition.topRight,
    iconColor: Colors.blue,
    itemBackgroundColor: Colors.white,
    itemHoverColor: Colors.blue[50],
  ),
)
```

## Pan Behavior

Enable panning (dragging) to navigate:

```dart
MapZoomPanBehavior(
  enablePanning: true,  // Drag to pan
)
```

## Zoom Level Configuration

### Set Zoom Range

```dart
MapZoomPanBehavior(
  minZoomLevel: 1,   // Minimum zoom (world view)
  maxZoomLevel: 15,  // Maximum zoom (close-up)
  zoomLevel: 5,      // Current zoom level
)
```

### Programmatic Zoom

```dart
late MapZoomPanBehavior _zoomPanBehavior;

// Zoom in
void _zoomIn() {
  setState(() {
    _zoomPanBehavior.zoomLevel += 1;
  });
}

// Zoom out
void _zoomOut() {
  setState(() {
    _zoomPanBehavior.zoomLevel -= 1;
  });
}

// Set specific zoom
void _setZoom(double level) {
  setState(() {
    _zoomPanBehavior.zoomLevel = level;
  });
}
```

### Set Focal Point

```dart
_zoomPanBehavior.focalLatLng = MapLatLng(40.7128, -74.0060);  // New York
```

### Zoom to Bounds

```dart
_zoomPanBehavior.latLngBounds = MapLatLngBounds(
  MapLatLng(25.0, -125.0),  // Southwest corner
  MapLatLng(49.0, -66.0),   // Northeast corner  
);
```

## Zoom Callbacks

Track zoom and pan events:

```dart
MapZoomPanBehavior(
  onZooming: (MapZoomDetails details) {
    print('Zooming: ${details.newZoomLevel}');
  },
  onPanning: (MapPanDetails details) {
    print('Panning: ${details.delta}');
  },
)
```

## Common Patterns

### Pattern 1: Custom Zoom Controls

```dart
Column(
  children: [
    Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        IconButton(
          icon: Icon(Icons.zoom_in),
          onPressed: () {
            setState(() {
              _zoomPanBehavior.zoomLevel += 1;
            });
          },
        ),
        IconButton(
          icon: Icon(Icons.zoom_out),
          onPressed: () {
            setState(() {
              _zoomPanBehavior.zoomLevel -= 1;
            });
          },
        ),
        IconButton(
          icon: Icon(Icons.my_location),
          onPressed: _resetToInitialPosition,
        ),
      ],
    ),
    Expanded(
      child: SfMaps(
        layers: [
          MapTileLayer(
            urlTemplate: 'url',
            zoomPanBehavior: _zoomPanBehavior,
          ),
        ],
      ),
    ),
  ],
)
```

### Pattern 2: Zoom to Fit Markers

```dart
void _fitMarkersInView(List<MapLatLng> markerPositions) {
  double minLat = markerPositions.map((m) => m.latitude).reduce(min);
  double maxLat = markerPositions.map((m) => m.latitude).reduce(max);
  double minLng = markerPositions.map((m) => m.longitude).reduce(min);
  double maxLng = markerPositions.map((m) => m.longitude).reduce(max);
  
  setState(() {
    _zoomPanBehavior.latLngBounds = MapLatLngBounds(
      MapLatLng(minLat, minLng),
      MapLatLng(maxLat, maxLng),
    );
  });
}
```

### Pattern 3: Zoom Level Indicator

```dart
Stack(
  children: [
    SfMaps(
      layers: [
        MapTileLayer(
          urlTemplate: 'url',
          zoomPanBehavior: _zoomPanBehavior,
        ),
      ],
    ),
    Positioned(
      top: 10,
      right: 10,
      child: Container(
        padding: EdgeInsets.all(8),
        color: Colors.white,
        child: Text('Zoom: ${_zoomPanBehavior.zoomLevel.toStringAsFixed(1)}'),
      ),
    ),
  ],
)
```

## Best Practices

1. **Set appropriate zoom ranges** - Prevent over-zoom or excessive zoom-out
2. **Enable multiple zoom methods** - Support different devices (mobile, desktop, web)
3. **Provide reset button** - Let users return to initial view
4. **Show zoom level** - Help users understand current view scale
5. **Smooth transitions** - Use programmatic zoom for better UX

## Troubleshooting

### Issue: Zoom Not Working

**Check:**
1. `zoomPanBehavior` is assigned to layer
2. Appropriate zoom method is enabled
3. Zoom level is within min/max range

### Issue: Jerky Zoom/Pan

**Solution:** Reduce complexity of rendered shapes or use tile layer for better performance

### Issue: Can't Zoom Far Enough

**Solution:** Increase `maxZoomLevel` property
