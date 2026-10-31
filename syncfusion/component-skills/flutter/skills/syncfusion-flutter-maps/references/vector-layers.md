# Vector Layers in Flutter Maps

Vector layers add custom geometric overlays on maps - arcs, circles, lines, polygons, and polylines. Perfect for showing routes, boundaries, regions, or connections.

## Overview

Five vector layer types:
- **MapArcLayer** - Curved arcs between two points
- **MapCircleLayer** - Circles at specific coordinates
- **MapLineLayer** - Straight lines between two points
- **MapPolygonLayer** - Closed polygon shapes
- **MapPolylineLayer** - Connected line segments

## MapArcLayer

Draw curved arcs between coordinates:

```dart
MapShapeLayer(
  source: _dataSource,
  sublayers: [
    MapArcLayer(
      arcs: [
        MapArc(
          from: MapLatLng(28.7041, 77.1025),  // Delhi
          to: MapLatLng(40.7128, -74.0060),    // New York
        ),
        MapArc(
          from: MapLatLng(51.5074, -0.1278),   // London
          to: MapLatLng(35.6762, 139.6503),    // Tokyo
        ),
      ],
      color: Colors.blue,
      width: 2,
    ),
  ],
)
```

**Use cases:** Flight routes, trade connections, migration patterns

## MapCircleLayer

Draw circles at coordinates:

```dart
MapShapeLayer(
  source: _dataSource,
  sublayers: [
    MapCircleLayer(
      circles: [
        MapCircle(
          center: MapLatLng(40.7128, -74.0060),
          radius: 50,  // kilometers
        ),
        MapCircle(
          center: MapLatLng(34.0522, -118.2437),
          radius: 30,
        ),
      ],
      color: Colors.red.withOpacity(0.3),
      strokeColor: Colors.red,
      strokeWidth: 2,
    ),
  ],
)
```

**Use cases:** Delivery zones, impact radius, coverage areas

## MapLineLayer

Draw straight lines between points:

```dart
MapShapeLayer(
  source: _dataSource,
  sublayers: [
    MapLineLayer(
      lines: [
        MapLine(
          from: MapLatLng(40.7128, -74.0060),
          to: MapLatLng(34.0522, -118.2437),
        ),
      ],
      color: Colors.green,
      width: 3,
    ),
  ],
)
```

**Use cases:** Direct routes, connections, borders

## MapPolygonLayer

Draw filled polygon shapes:

```dart
MapShapeLayer(
  source: _dataSource,
  sublayers: [
    MapPolygonLayer(
      polygons: [
        MapPolygon(
          points: [
            MapLatLng(40.0, -75.0),
            MapLatLng(40.0, -74.0),
            MapLatLng(41.0, -74.0),
            MapLatLng(41.0, -75.0),
          ],
        ),
      ],
      color: Colors.yellow.withOpacity(0.5),
      strokeColor: Colors.orange,
      strokeWidth: 2,
    ),
  ],
)
```

**Use cases:** Custom regions, zones, restricted areas

## MapPolylineLayer

Draw connected line segments:

```dart
MapShapeLayer(
  source: _dataSource,
  sublayers: [
    MapPolylineLayer(
      polylines: [
        MapPolyline(
          points: [
            MapLatLng(37.7749, -122.4194),  // San Francisco
            MapLatLng(36.7783, -119.4179),  // Fresno
            MapLatLng(34.0522, -118.2437),  // Los Angeles
            MapLatLng(32.7157, -117.1611),  // San Diego
          ],
        ),
      ],
      color: Colors.purple,
      width: 4,
    ),
  ],
)
```

**Use cases:** Routes, paths, trails, pipelines

## Common Patterns

### Flight Routes Map

```dart
MapArcLayer(
  arcs: _flights.map((flight) {
    return MapArc(
      from: MapLatLng(flight.originLat, flight.originLng),
      to: MapLatLng(flight.destLat, flight.destLng),
    );
  }).toList(),
  color: Colors.blue.withOpacity(0.6),
  width: 2,
)
```

### Delivery Zones

```dart
MapCircleLayer(
  circles: _stores.map((store) {
    return MapCircle(
      center: MapLatLng(store.lat, store.lng),
      radius: store.deliveryRadius,
    );
  }).toList(),
  color: Colors.green.withOpacity(0.2),
  strokeColor: Colors.green,
)
```

### Route Visualization

```dart
MapPolylineLayer(
  polylines: [
    MapPolyline(
      points: _routeCoordinates,
    ),
  ],
  color: Colors.blue,
  width: 5,
  dashArray: [5, 3],  // Dashed line
)
```

## Best Practices

1. **Use appropriate layer type** - Arc for long distances, line for short
2. **Limit complexity** - Too many vectors reduce performance
3. **Use opacity** - Make overlapping vectors visible
4. **Combine with markers** - Show start/end points
5. **Color code** - Use different colors for different categories
