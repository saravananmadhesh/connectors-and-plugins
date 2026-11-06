# MapTileLayer Overview

MapTileLayer represents the tile-based map rendering capability provided by Syncfusion Flutter Maps. It's ideal for applications requiring real-world street maps and detailed geographical features.

## Table of Contents
- [Overview](#overview)
- [URL Template Format](#url-template-format)
- [OpenStreetMap Setup](#openstreetmap-setup)
- [Bing Maps Integration](#bing-maps-integration)
- [Other Map Providers](#other-map-providers)
- [Initial Configuration](#initial-configuration)
- [Best Practices](#best-practices)

## Overview

MapTileLayer provides:
- **Street maps** with roads, buildings, and landmarks
- **Online tile loading** from web services
- **Markers** for locations and points of interest
- **Zoom and pan** for interactive navigation
- **Real-time updates** if provider supports it

**Requirements:**
- Internet connectivity for tile loading
- API key (for some providers)
- HTTPS support

## URL Template Format

The `urlTemplate` property defines the tile addressing pattern used by map tile services.

### Standard Format

```dart
MapTileLayer(
  urlTemplate: 'url',
)
```

### Placeholders

- `{z}` - Zoom level (0-20+)
- `{x}` - Tile X coordinate
- `{y}` - Tile Y coordinate

### Common Variations

```dart
// Format 1: Direct
'https://tile.openstreetmap.org/{z}/{x}/{y}.png'

// Format 2: With parameters
'https://api.provider.com/tiles/z={z}/x={x}/y={y}.png'

// Format 3: With API key
'https://api.provider.com/{z}/{x}/{y}.png?key=YOUR_API_KEY'

// Format 4: With multiple parameters
'https://api.provider.com/maps/{z}/{x}/{y}.png?key=API_KEY&style=streets'
```

## OpenStreetMap Setup

OpenStreetMap is free and doesn't require an API key.

### Basic Implementation

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_maps/maps.dart';

class OSMMap extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('OpenStreetMap')),
      body: SfMaps(
        layers: [
          MapTileLayer(
            urlTemplate: 'url',
          ),
        ],
      ),
    );
  }
}
```

### With Custom Location

```dart
MapTileLayer(
  urlTemplate: 'url',
  initialFocalLatLng: MapLatLng(40.7128, -74.0060), // New York
  initialZoomLevel: 12,
)
```

### OpenStreetMap Tiles Attribution

OpenStreetMap requires attribution. Add to your UI:

```dart
Stack(
  children: [
    SfMaps(
      layers: [
        MapTileLayer(
          urlTemplate: 'url',
        ),
      ],
    ),
    Positioned(
      bottom: 0,
      right: 0,
      child: Container(
        padding: EdgeInsets.all(4),
        color: Colors.white70,
        child: Text(
          '© OpenStreetMap contributors',
          style: TextStyle(fontSize: 10),
        ),
      ),
    ),
  ],
)
```

### License Note

OpenStreetMap is free but requires:
- Attribution in your app
- Compliance with [OSM Tile Usage Policy](https://operations.osmfoundation.org/policies/tiles/)
- Consider self-hosting for high-traffic apps

## Bing Maps Integration

Bing Maps requires an API key and special URL handling.

### Getting a Bing Maps Key

1. Go to [Bing Maps Dev Center](https://www.bingmapsportal.com/)
2. Sign in with Microsoft account
3. Click "My Account" → "My Keys"
4. Create a new key

### Implementation

Bing Maps requires the `getBingUrlTemplate` helper function:

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_maps/maps.dart';

class BingMapWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: getBingUrlTemplate(
        'url'
      ),
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          return SfMaps(
            layers: [
              MapTileLayer(
                urlTemplate: snapshot.data as String,
                initialFocalLatLng: MapLatLng(40.7128, -74.0060),
                initialZoomLevel: 10,
              ),
            ],
          );
        }
        return Center(child: CircularProgressIndicator());
      },
    );
  }
}
```

### Bing Map Types

Replace `RoadOnDemand` in the URL with:

```dart
// Aerial (satellite imagery)
'https://dev.virtualearth.net/REST/V1/Imagery/Metadata/Aerial?output=json&uriScheme=https&include=ImageryProviders&key=YOUR_KEY'

// Aerial with labels
'https://dev.virtualearth.net/REST/V1/Imagery/Metadata/AerialWithLabels?output=json&uriScheme=https&include=ImageryProviders&key=YOUR_KEY'

// Road (street map)
'https://dev.virtualearth.net/REST/V1/Imagery/Metadata/RoadOnDemand?output=json&uriScheme=https&include=ImageryProviders&key=YOUR_KEY'
```

### Bing Maps with Loading State

```dart
class BingMap extends StatefulWidget {
  @override
  _BingMapState createState() => _BingMapState();
}

class _BingMapState extends State<BingMap> {
  late Future<String> _bingUrlFuture;
  
  @override
  void initState() {
    super.initState();
    _bingUrlFuture = getBingUrlTemplate(
      'url'
    );
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FutureBuilder<String>(
        future: _bingUrlFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          }
          
          if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          }
          
          return SfMaps(
            layers: [
              MapTileLayer(
                urlTemplate: snapshot.data!,
                initialFocalLatLng: MapLatLng(47.6062, -122.3321),
                initialZoomLevel: 12,
              ),
            ],
          );
        },
      ),
    );
  }
}
```

## Other Map Providers

### TomTom Maps

Requires API key from [TomTom Developer Portal](https://developer.tomtom.com/).

```dart
MapTileLayer(
  urlTemplate: 'url',
  initialFocalLatLng: MapLatLng(51.5074, -0.1278), // London
  initialZoomLevel: 10,
)
```

### Google Maps

Requires API key from [Google Cloud Console](https://console.cloud.google.com/).

```dart
MapTileLayer(
  urlTemplate: 'url',
  initialFocalLatLng: MapLatLng(37.7749, -122.4194),
  initialZoomLevel: 12,
)
```

**Google Maps tile types (lyrs parameter):**
- `m` - Standard roadmap
- `s` - Satellite
- `y` - Hybrid (satellite with labels)
- `t` - Terrain
- `p` - Terrain with labels
- `h` - Roads only

### MapBox

Requires API token from [MapBox](https://www.mapbox.com/).

```dart
MapTileLayer(
  urlTemplate: '<USER_PROVIDED_TILE_URL>',
  initialFocalLatLng: MapLatLng(40.7128, -74.0060),
  initialZoomLevel: 11,
)
```

**MapBox styles:**
- `mapbox.streets` - Standard streets
- `mapbox.satellite` - Satellite imagery
- `mapbox.outdoors` - Outdoor/terrain
- `mapbox.light` - Light theme
- `mapbox.dark` - Dark theme

### Stadia Maps

Free tier available at [Stadia Maps](https://stadiamaps.com/).

```dart
MapTileLayer(
  urlTemplate: '<USER_PROVIDED_TILE_URL>',
  initialFocalLatLng: MapLatLng(48.8566, 2.3522), // Paris
  initialZoomLevel: 12,
)
```

## Initial Configuration

### Setting Initial Focal Point

The `initialFocalLatLng` sets the map's center on load:

```dart
MapTileLayer(
  urlTemplate: '<USER_PROVIDED_TILE_URL>',
  initialFocalLatLng: MapLatLng(
    34.0522,  // Latitude (North/South)
    -118.2437 // Longitude (East/West)
  ),
)
```

**Common Cities:**
```dart
// New York
MapLatLng(40.7128, -74.0060)

// London
MapLatLng(51.5074, -0.1278)

// Tokyo
MapLatLng(35.6762, 139.6503)

// Sydney
MapLatLng(-33.8688, 151.2093)

// Mumbai
MapLatLng(19.0760, 72.8777)
```

**Note:** Cannot be changed dynamically. Use `MapZoomPanBehavior.focalLatLng` for runtime changes.

### Setting Initial Zoom Level

The `initialZoomLevel` controls the initial zoom:

```dart
MapTileLayer(
  urlTemplate: '<USER_PROVIDED_TILE_URL>',
  initialZoomLevel: 10,
)
```

**Zoom Level Guide:**
- `1-3` - World view
- `4-6` - Continental view
- `7-10` - Country/state view
- `11-14` - City view
- `15-18` - Street/neighborhood view
- `19+` - Building level

**Note:** Actual zoom range depends on tile provider. Most support 0-18 or 0-20.

### Initial Bounds

Show a specific region by defining bounds:

```dart
MapTileLayer(
  urlTemplate: '<USER_PROVIDED_TILE_URL>',
  initialLatLngBounds: MapLatLngBounds(
    MapLatLng(40.4774, -74.2591),  // Southwest corner
    MapLatLng(40.9176, -73.7004),  // Northeast corner
  ),
)
```

Map automatically calculates center and zoom to fit bounds.

## Best Practices

### 1. Handle Loading States

```dart
class TileMapWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        SfMaps(
          layers: [
            MapTileLayer(
              urlTemplate: '<USER_PROVIDED_TILE_URL>',
            ),
          ],
        ),
        // Show loading overlay while tiles load
        Center(child: CircularProgressIndicator()),
      ],
    );
  }
}
```

### 2. Cache Tiles (Advanced)

Implement tile caching to reduce network requests:

```dart
// Use packages like flutter_cache_manager
// Store tiles in device storage
// Load from cache when available
```

### 3. Error Handling

```dart
class SafeTileMap extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SfMaps(
      layers: [
        MapTileLayer(
          urlTemplate: '<USER_PROVIDED_TILE_URL>',
          // Add error boundary
        ),
      ],
    );
  }
}
```

### 4. API Key Security

**Never hardcode API keys:**

```dart
// ❌ BAD
urlTemplate: '<USER_PROVIDED_TILE_URL>'

// ✅ GOOD - Use environment variables
import 'package:flutter_dotenv/flutter_dotenv.dart';

String get apiKey => dotenv.env['MAP_API_KEY'] ?? '';

urlTemplate: '<USER_PROVIDED_TILE_URL>'
```

### 5. Respect Usage Limits

- Check provider's terms of service
- Implement rate limiting if needed
- Monitor API usage
- Consider caching for frequently accessed tiles

### 6. Responsive Zoom Levels

```dart
// Adjust initial zoom based on device
double _getInitialZoom() {
  final width = MediaQuery.of(context).size.width;
  if (width > 1200) return 14;  // Desktop
  if (width > 600) return 12;   // Tablet
  return 10;                     // Mobile
}

MapTileLayer(
  urlTemplate: _urlTemplate,
  initialZoomLevel: _getInitialZoom(),
)
```

## Common Patterns

### Pattern: Multiple Provider Support

```dart
enum MapProvider { openStreetMap, googleMaps, bingMaps }

class MultiProviderMap extends StatefulWidget {
  @override
  _MultiProviderMapState createState() => _MultiProviderMapState();
}

class _MultiProviderMapState extends State<MultiProviderMap> {
  MapProvider _provider = MapProvider.openStreetMap;
  
  String get _urlTemplate {
    switch (_provider) {
      case MapProvider.openStreetMap:
        return '<USER_PROVIDED_TILE_URL>';
      case MapProvider.googleMaps:
        return '<USER_PROVIDED_TILE_URL>';
      case MapProvider.bingMaps:
        // Handle Bing URL separately with FutureBuilder
        return '';
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        DropdownButton<MapProvider>(
          value: _provider,
          items: MapProvider.values.map((provider) {
            return DropdownMenuItem(
              value: provider,
              child: Text(provider.toString().split('.').last),
            );
          }).toList(),
          onChanged: (value) {
            setState(() {
              _provider = value!;
            });
          },
        ),
        Expanded(
          child: SfMaps(
            layers: [
              MapTileLayer(urlTemplate: _urlTemplate),
            ],
          ),
        ),
      ],
    );
  }
}
```

## Troubleshooting

### Issue: Tiles Not Loading

**Causes & Solutions:**
1. **No internet** - Check connectivity
2. **Wrong URL format** - Verify {z}/{x}/{y} placeholders
3. **Invalid API key** - Check key is valid and has permissions
4. **CORS issues (web)** - Ensure provider allows web access
5. **Rate limit exceeded** - Wait or upgrade plan

### Issue: Blurry Tiles

**Cause:** Low zoom level for the view

**Solution:** Increase `initialZoomLevel` or check provider's max zoom

### Issue: Tiles Load Slowly

**Solutions:**
- Implement tile caching
- Use CDN-backed tile provider
- Reduce initial zoom to load fewer tiles
- Pre-load tiles for common areas

### Issue: Provider URL Changed

**Solution:** Check provider's documentation for current URL format
