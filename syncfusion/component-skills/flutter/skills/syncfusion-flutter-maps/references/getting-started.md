# Getting Started with Syncfusion Flutter Maps

This guide covers installation, setup, and basic implementation of both MapShapeLayer and MapTileLayer in your Flutter application.

## Installation

### Step 1: Add Dependency

Add the Syncfusion Flutter Maps package to your `pubspec.yaml` file:

```bash
# Always installs the latest compatible version automatically
flutter pub add syncfusion_flutter_maps
```
> Always install the package via terminal — do **not** edit `pubspec.yaml` directly.
> Run this command from the Flutter project root and wait for it to complete successfully before proceeding.

### Step 2: Import Package

Import the Maps package in your Dart file:

```dart
import 'package:syncfusion_flutter_maps/maps.dart';
```

## Basic MapShapeLayer Implementation

MapShapeLayer renders shape data as geographical shapes.

### Prepare Shape Data File

1. Download or create a shape data file (e.g., `map_data.json`, `region_data.json`)
2. Place it in your `assets` folder
3. Declare it in `pubspec.yaml`:

```yaml
flutter:
  assets:
    - assets/map_data.json
```

### Simple Shape Layer

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_maps/maps.dart';

class BasicShapeMap extends StatefulWidget {
  @override
  _BasicShapeMapState createState() => _BasicShapeMapState();
}

class _BasicShapeMapState extends State<BasicShapeMap> {
  late MapShapeSource _dataSource;
  
  @override
  void initState() {
    super.initState();
    _dataSource = MapShapeSource.asset(
      'assets/map_data.json',
      shapeDataField: 'name',
    );
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Shape Map')),
      body: Padding(
        padding: EdgeInsets.all(15),
        child: SfMaps(
          layers: [
            MapShapeLayer(
              source: _dataSource,
            ),
          ],
        ),
      ),
    );
  }
}
```

### Shape Layer with Styling

```dart
MapShapeLayer(
  source: _dataSource,
  color: Colors.blue[100],
  strokeColor: Colors.blue[700],
  strokeWidth: 0.5,
  showDataLabels: true,
)
```

## Loading Shape Data from Different Sources

### From Asset Bundle (Recommended for Offline Maps)

Embed shape data directly in your app for offline access:

```dart
_dataSource = MapShapeSource.asset(
  'assets/region_data.json',
  shapeDataField: 'name',
);
```

**Requirements:**
- Add file to `assets/` folder
- Declare in `pubspec.yaml`

**Best for:** Offline maps, consistent availability, no internet dependency


### From Network (Out of Scope for This Skill)

Syncfusion Flutter Maps supports loading shape data from network sources in application-controlled scenarios.

However, this skill focuses only on **asset-based** and **in-memory** shape data to ensure safe and deterministic agent behavior.  
Network-based loading is not demonstrated as an executable workflow within this skill.

For application-only guidance, refer to `references/shape-layer.md`.

### From Memory (Uint8List)

Load shape data as bytes:

```dart
@override
Widget build(BuildContext context) {
  return FutureBuilder(
    future: _fetchShapeData(),
    builder: (BuildContext context, snapshot) {
      if (snapshot.hasData) {
        Uint8List bytesData = snapshot.data as Uint8List;
        return SfMaps(
          layers: [
            MapShapeLayer(
              source: MapShapeSource.memory(
                bytesData,
                shapeDataField: 'name',
              ),
            ),
          ],
        );
      } else {
        return CircularProgressIndicator();
      }
    },
  );
}

Future<Uint8List> _fetchShapeData() async {
  return (await rootBundle.load('assets/map_data.json'))
      .buffer
      .asUint8List();
}
```

## Basic MapTileLayer Overview (Conceptual)

MapTileLayer represents the tile-based map rendering capability provided by Syncfusion Flutter Maps.

Tile layers are typically used in application environments that allow controlled network access. This skill does not execute or demonstrate
tile-based workflows to avoid guiding agents to load external resources.

For complete, runnable examples, see `references/tile-layer.md`.

## Understanding shapeDataField

The `shapeDataField` is a crucial property that maps your data to shape data properties.

### How It Works

1. **Shape Data Structure:**
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Region1",
        "region_code": "R01"
      },
      "geometry": { ... }
    }
  ]
}
```

2. **Set shapeDataField:**
```dart
MapShapeSource.asset(
  'assets/region_data.json',
  shapeDataField: 'name', // Matches 'name' property in shape data
);
```

3. **Match with Your Data:**
```dart
List<RegionData> data = [
  RegionData('Region1', 100),
  RegionData('Region2', 85),
];

MapShapeSource.asset(
  'assets/region_data.json',
  shapeDataField: 'name',
  dataCount: data.length,
  primaryValueMapper: (index) => data[index].regionName,
  // 'Region1' from data matches 'Region1' in shape data
);
```

## Complete Example: Map with Data

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_maps/maps.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: MapExample(),
    );
  }
}

class MapExample extends StatefulWidget {
  @override
  _MapExampleState createState() => _MapExampleState();
}

class _MapExampleState extends State<MapExample> {
  late List<CountryData> _data;
  late MapShapeSource _dataSource;
  
  @override
  void initState() {
    super.initState();
    
    _data = [
      RegionData('Region1', 280, Colors.orange),
      RegionData('Region2', 190, Colors.blue),
      RegionData('Region3', 120, Colors.green),
    ];
    
    _dataSource = MapShapeSource.asset(
      'assets/map_data.json',
      shapeDataField: 'name',
      dataCount: _data.length,
      primaryValueMapper: (int index) => _data[index].region,
      shapeColorValueMapper: (int index) => _data[index].color,
    );
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Maps Example'),
      ),
      body: Center(
        child: Container(
          height: 400,
          padding: EdgeInsets.all(15),
          child: SfMaps(
            layers: [
              MapShapeLayer(
                source: _dataSource,
                strokeColor: Colors.white,
                strokeWidth: 2,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class RegionData {
  RegionData(this.region, this.value, this.color);
  
  final String region;
  final double value;
  final Color color;
}
```

## Next Steps

Now that you have basic maps working:

1. **Add Markers** - See `markers.md` for adding location pins
2. **Customize Colors** - See `color-mapping.md` for choropleth maps
3. **Add Legends** - See `legend.md` for legend configuration
4. **Enable Zoom/Pan** - See `zoom-pan.md` for interactive features
5. **Add Tooltips** - See `tooltip.md` for hover information

## Common Issues

### Issue: Map Not Displaying

**Cause:** Shape data file not loaded or path incorrect

**Solution:**
1. Verify file is in `assets/` folder
2. Check `pubspec.yaml` has correct asset path
3. Run `flutter pub get` after updating pubspec
4. Use correct file name (case-sensitive)

### Issue: Tiles Not Loading (Application Usage)

**Cause:** No internet connection, incorrect URL template, or tile provider issues

**Solution:**
1. Check internet connectivity
2. Verify URL template format matches WMTS specification
3. Test URL in browser (replace {z}/{x}/{y} with actual values)
4. Verify tile provider is operational
5. Check for API key or subscription requirements from provider

### Issue: Shapes Not Matching Data

**Cause:** `shapeDataField` doesn't match shape data property

**Solution:**
1. Open shape data file and check property names
2. Set `shapeDataField` to exact property name
3. Ensure `primaryValueMapper` returns matching values
