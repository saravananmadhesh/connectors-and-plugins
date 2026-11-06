# Getting Started with Flutter TreeMap

This guide covers the essential steps to add the Syncfusion Flutter TreeMap widget to your application and implement basic features.

## Installation

### 1. Add Dependency

Add the Syncfusion Flutter TreeMap package by running:

```bash
# Always installs the latest compatible version automatically
flutter pub add syncfusion_flutter_treemap
```
> Always install the package via terminal — do **not** edit `pubspec.yaml` directly.
> Run this command from the Flutter project root and wait for it to complete successfully before proceeding.

### 2. Import the Package

Import the treemap package in your Dart file:

```dart
import 'package:syncfusion_flutter_treemap/treemap.dart';
```

## Basic TreeMap Implementation

### Minimal Example

Here's the simplest way to create a treemap:

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_treemap/treemap.dart';

class BasicTreemapPage extends StatefulWidget {
  @override
  _BasicTreemapPageState createState() => _BasicTreemapPageState();
}

class _BasicTreemapPageState extends State<BasicTreemapPage> {
  late List<PopulationData> _data;

  @override
  void initState() {
    _data = [
      PopulationData(country: 'China', population: 1439),
      PopulationData(country: 'India', population: 1380),
      PopulationData(country: 'USA', population: 331),
      PopulationData(country: 'Indonesia', population: 273),
      PopulationData(country: 'Pakistan', population: 220),
      PopulationData(country: 'Brazil', population: 212),
    ];
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Population by Country')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: SfTreemap(
          dataCount: _data.length,
          weightValueMapper: (int index) {
            return _data[index].population;
          },
          levels: [
            TreemapLevel(
              groupMapper: (int index) {
                return _data[index].country;
              },
            ),
          ],
        ),
      ),
    );
  }
}

class PopulationData {
  PopulationData({required this.country, required this.population});
  
  final String country;
  final double population;
}
```

## Essential Properties

### 1. dataCount

Specifies the number of data items in your data source.

```dart
SfTreemap(
  dataCount: _data.length, // Required
  // ...
)
```

### 2. weightValueMapper

Returns the numeric value that determines the tile size. Tiles with larger values occupy more space.

```dart
weightValueMapper: (int index) {
  return _data[index].population; // Must return a number
}
```

### 3. levels

Defines how data is grouped and displayed. Must have at least one level.

```dart
levels: [
  TreemapLevel(
    groupMapper: (int index) {
      return _data[index].country; // Groups by country
    },
  ),
]
```

## Data Source Structure

### Simple Data Model

```dart
class DataModel {
  DataModel({
    required this.category,
    required this.value,
  });
  
  final String category;  // For grouping
  final double value;     // For sizing
}
```

### Preparing Data

Initialize your data in `initState()`:

```dart
@override
void initState() {
  _data = _prepareData();
  super.initState();
}

List<DataModel> _prepareData() {
  return [
    DataModel(category: 'Category A', value: 100),
    DataModel(category: 'Category B', value: 200),
    DataModel(category: 'Category C', value: 150),
  ];
}
```

## Complete Working Example

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_treemap/treemap.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'TreeMap Demo',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: TreemapPage(),
    );
  }
}

class TreemapPage extends StatefulWidget {
  @override
  _TreemapPageState createState() => _TreemapPageState();
}

class _TreemapPageState extends State<TreemapPage> {
  late List<SalesData> _salesData;

  @override
  void initState() {
    _salesData = [
      SalesData(product: 'Laptop', sales: 45000),
      SalesData(product: 'Desktop', sales: 28000),
      SalesData(product: 'Tablet', sales: 32000),
      SalesData(product: 'Phone', sales: 55000),
      SalesData(product: 'Monitor', sales: 18000),
      SalesData(product: 'Keyboard', sales: 8000),
    ];
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Product Sales'),
      ),
      body: Center(
        child: Container(
          padding: EdgeInsets.all(20),
          child: SfTreemap(
            dataCount: _salesData.length,
            weightValueMapper: (int index) {
              return _salesData[index].sales;
            },
            levels: [
              TreemapLevel(
                groupMapper: (int index) {
                  return _salesData[index].product;
                },
                color: Colors.blue[200],
                border: RoundedRectangleBorder(
                  side: BorderSide(color: Colors.white, width: 2),
                ),
                padding: EdgeInsets.all(2),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class SalesData {
  SalesData({required this.product, required this.sales});
  
  final String product;
  final double sales;
}
```

## Common Pitfalls

### Issue: No tiles visible

**Cause:** `weightValueMapper` returns zero or negative values

**Solution:** Ensure all weight values are positive numbers:
```dart
weightValueMapper: (int index) {
  return _data[index].value.abs(); // Ensure positive
}
```

### Issue: Tiles are all the same size

**Cause:** All weight values are identical

**Solution:** Verify your data has varying values:
```dart
// Check your data
print(_data.map((e) => e.value).toList());
```

### Issue: dataCount mismatch error

**Cause:** `dataCount` doesn't match actual data length

**Solution:** Always use the data source length:
```dart
dataCount: _data.length, // Dynamic, always correct
```

### Issue: Null values cause errors

**Cause:** Data contains null values

**Solution:** Filter or provide defaults:
```dart
weightValueMapper: (int index) {
  return _data[index].value ?? 0; // Provide default
}
```

## Next Steps

Now that you have a basic treemap running:

- **Add labels** to display category names on tiles
- **Configure layouts** (squarified, slice, dice)
- **Implement hierarchical data** with multiple levels
- **Add colors** using color mappers
- **Enable tooltips** for additional information
- **Add legends** for color scales
- **Implement selection** for interactivity

Each of these features is covered in detail in the other reference guides.
