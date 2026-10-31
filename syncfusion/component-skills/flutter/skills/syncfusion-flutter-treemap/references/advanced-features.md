# Advanced Features in Flutter TreeMap

## Table of Contents
- [Custom Tile Widgets (itemBuilder)](#custom-tile-widgets-itembuilder)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
- [Accessibility](#accessibility)
- [Performance Optimization](#performance-optimization)
- [Responsive Design](#responsive-design)

## Custom Tile Widgets (itemBuilder)

Use `itemBuilder` to add custom widgets like images or icons as tile backgrounds.

### Adding Images to Tiles

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_treemap/treemap.dart';

class ImageTileExample extends StatefulWidget {
  @override
  _ImageTileExampleState createState() => _ImageTileExampleState();
}

class _ImageTileExampleState extends State<ImageTileExample> {
  late List<AppData> _data;

  @override
  void initState() {
    _data = [
      AppData(name: 'Facebook', category: 'Social', users: 254),
      AppData(name: 'Instagram', category: 'Social', users: 191),
      AppData(name: 'Twitter', category: 'Social', users: 75),
      AppData(name: 'WhatsApp', category: 'Messaging', users: 200),
    ];
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Social Media Usage')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: SfTreemap(
          dataCount: _data.length,
          weightValueMapper: (int index) => _data[index].users,
          levels: [
            TreemapLevel(
              groupMapper: (int index) => _data[index].name,
              itemBuilder: (BuildContext context, TreemapTile tile) {
                final index = tile.indices[0];
                return Center(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Image.asset(
                        _getImagePath(_data[index].name),
                        width: 40,
                        height: 40,
                      ),
                      SizedBox(height: 8),
                      Text(
                        _data[index].name,
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }

  String _getImagePath(String name) {
    return 'assets/images/${name.toLowerCase()}.png';
  }
}

class AppData {
  AppData({required this.name, required this.category, required this.users});
  final String name;
  final String category;
  final double users;
}
```

### Custom Icon Tiles

```dart
TreemapLevel(
  groupMapper: (int index) => _data[index].category,
  itemBuilder: (BuildContext context, TreemapTile tile) {
    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [Colors.blue[300]!, Colors.blue[600]!],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              _getIconForCategory(tile.group),
              size: 40,
              color: Colors.white,
            ),
            SizedBox(height: 8),
            Text(
              tile.group,
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),
    );
  },
)

IconData _getIconForCategory(String category) {
  switch (category) {
    case 'Sales':
      return Icons.attach_money;
    case 'Marketing':
      return Icons.campaign;
    case 'Engineering':
      return Icons.build;
    default:
      return Icons.business;
  }
}
```

### Gradient Backgrounds

```dart
TreemapLevel(
  groupMapper: (int index) => _data[index].category,
  itemBuilder: (BuildContext context, TreemapTile tile) {
    return Container(
      decoration: BoxDecoration(
        gradient: RadialGradient(
          colors: [
            _getColorForTile(tile).withOpacity(0.6),
            _getColorForTile(tile),
          ],
        ),
      ),
      child: Center(
        child: Text(
          tile.group,
          style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
            fontSize: 16,
          ),
        ),
      ),
    );
  },
)
```

## Right-to-Left (RTL) Support

TreeMap automatically supports RTL layouts based on the app's text direction.

### Enabling RTL

```dart
MaterialApp(
  // Set app-wide text direction
  locale: Locale('ar'), // Arabic
  localizationsDelegates: [
    GlobalMaterialLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
  ],
  supportedLocales: [
    Locale('en'),
    Locale('ar'),
  ],
  home: TreemapPage(),
)
```

### RTL-Aware Widget

```dart
@override
Widget build(BuildContext context) {
  final isRTL = Directionality.of(context) == TextDirection.rtl;
  
  return SfTreemap(
    dataCount: _data.length,
    weightValueMapper: (int index) => _data[index].value,
    levels: [
      TreemapLevel(
        groupMapper: (int index) => _data[index].category,
        labelBuilder: (context, tile) {
          return Align(
            alignment: isRTL ? Alignment.centerRight : Alignment.centerLeft,
            child: Padding(
              padding: EdgeInsets.all(8),
              child: Text(tile.group),
            ),
          );
        },
      ),
    ],
  );
}
```

## Accessibility

### Screen Reader Support

Wrap TreeMap in a `Semantics` widget for screen reader accessibility.

```dart
Semantics(
  label: 'Sales Treemap',
  value: 'Shows sales data by region and product category',
  child: SfTreemap(
    dataCount: _data.length,
    weightValueMapper: (int index) => _data[index].sales,
    levels: [
      TreemapLevel(
        groupMapper: (int index) => _data[index].region,
      ),
    ],
  ),
)
```

### Sufficient Color Contrast

Ensure labels have good contrast with tile backgrounds.

```dart
TreemapLevel(
  groupMapper: (int index) => _data[index].category,
  color: Colors.blue[700], // Dark background
  labelBuilder: (context, tile) {
    return Text(
      tile.group,
      style: TextStyle(
        color: Colors.white, // High contrast
        fontSize: 14,
        fontWeight: FontWeight.bold,
      ),
    );
  },
)
```

### Large Font Support

TreeMap automatically scales with device font settings. You can also use relative font sizes:

```dart
TreemapLevel(
  groupMapper: (int index) => _data[index].category,
  labelBuilder: (context, tile) {
    final textScaleFactor = MediaQuery.of(context).textScaleFactor;
    
    return Text(
      tile.group,
      style: TextStyle(
        fontSize: 12 * textScaleFactor, // Scales with user settings
      ),
    );
  },
)
```

### Touch Target Size

TreeMap provides 48x48 pixel touch targets following accessibility guidelines. For very small tiles, consider:

```dart
// Option 1: Minimum tile size via data filtering
List<Data> _filterSmallTiles(List<Data> data) {
  final minValue = data.map((e) => e.value).reduce((a, b) => a + b) * 0.05;
  return data.where((item) => item.value >= minValue).toList();
}

// Option 2: Show labels only on larger tiles
labelBuilder: (context, tile) {
  if (tile.weight < _minimumTileSize) {
    return SizedBox.shrink(); // No label for very small tiles
  }
  return Text(tile.group);
}
```

## Performance Optimization

### Optimize for Large Datasets

```dart
class OptimizedTreemap extends StatefulWidget {
  @override
  _OptimizedTreemapState createState() => _OptimizedTreemapState();
}

class _OptimizedTreemapState extends State<OptimizedTreemap> {
  late List<DataModel> _data;
  
  @override
  void initState() {
    _data = _loadData();
    super.initState();
  }

  List<DataModel> _loadData() {
    // 1. Load data once in initState
    // 2. Filter out very small values (< 1% of total)
    final allData = _loadAllData();
    final total = allData.fold<double>(0, (sum, item) => sum + item.value);
    final threshold = total * 0.01;
    
    return allData.where((item) => item.value >= threshold).toList();
  }

  @override
  Widget build(BuildContext context) {
    return SfTreemap(
      dataCount: _data.length,
      weightValueMapper: (int index) => _data[index].value,
      levels: [
        TreemapLevel(
          groupMapper: (int index) => _data[index].category,
          // Use const constructors where possible
          padding: const EdgeInsets.all(2),
          // Keep builders simple
          labelBuilder: (context, tile) => Text(tile.group),
        ),
      ],
    );
  }
}
```

### Lazy Loading with Drilldown

```dart
// Load detailed data only when drilling down
class LazyDrilldown extends StatefulWidget {
  @override
  _LazyDrilldownState createState() => _LazyDrilldownState();
}

class _LazyDrilldownState extends State<LazyDrilldown> {
  late List<DataModel> _currentData;
  String? _currentLevel;

  @override
  void initState() {
    _currentData = _loadTopLevelData(); // Load only top level initially
    super.initState();
  }

  Future<void> _drillDown(String category) async {
    // Load detailed data on demand
    final detailedData = await _loadDetailedData(category);
    setState(() {
      _currentData = detailedData;
      _currentLevel = category;
    });
  }

  @override
  Widget build(BuildContext context) {
    return SfTreemap(
      dataCount: _currentData.length,
      weightValueMapper: (int index) => _currentData[index].value,
      onSelectionChanged: (TreemapTile tile) {
        _drillDown(tile.group);
      },
      levels: [/* ... */],
    );
  }
}
```

### Reduce Redraws

```dart
// Use const constructors and cached values
class _TreemapPageState extends State<TreemapPage> {
  late final List<DataModel> _data;
  late final List<TreemapLevel> _levels;

  @override
  void initState() {
    _data = _loadData();
    _levels = _buildLevels(); // Build once
    super.initState();
  }

  List<TreemapLevel> _buildLevels() {
    return [
      TreemapLevel(
        groupMapper: (int index) => _data[index].category,
        color: Colors.blue[200],
        padding: const EdgeInsets.all(2), // const
      ),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return SfTreemap(
      dataCount: _data.length,
      weightValueMapper: (int index) => _data[index].value,
      levels: _levels, // Reuse the same list
    );
  }
}
```

## Responsive Design

### Adaptive Layout

```dart
@override
Widget build(BuildContext context) {
  final size = MediaQuery.of(context).size;
  final isWide = size.width > size.height;

  return SfTreemap(
    dataCount: _data.length,
    weightValueMapper: (int index) => _data[index].value,
    // Use slice for wide screens, dice for tall
    // (Note: Would need to use SfTreemap.slice() or .dice())
    levels: [
      TreemapLevel(
        groupMapper: (int index) => _data[index].category,
        labelBuilder: (context, tile) {
          // Adjust font size based on screen size
          final fontSize = isWide ? 14.0 : 12.0;
          return Text(
            tile.group,
            style: TextStyle(fontSize: fontSize),
          );
        },
      ),
    ],
  );
}
```

### Breakpoint-Based Styling

```dart
@override
Widget build(BuildContext context) {
  final width = MediaQuery.of(context).size.width;
  
  // Define breakpoints
  final isMobile = width < 600;
  final isTablet = width >= 600 && width < 1024;
  final isDesktop = width >= 1024;

  return SfTreemap(
    dataCount: _data.length,
    weightValueMapper: (int index) => _data[index].value,
    legend: isDesktop
        ? TreemapLegend(position: TreemapLegendPosition.right)
        : TreemapLegend(position: TreemapLegendPosition.bottom),
    levels: [
      TreemapLevel(
        groupMapper: (int index) => _data[index].category,
        padding: EdgeInsets.all(isMobile ? 1 : 2),
        labelBuilder: (context, tile) {
          final fontSize = isMobile ? 10.0 : (isTablet ? 12.0 : 14.0);
          return Text(
            tile.group,
            style: TextStyle(fontSize: fontSize),
            overflow: TextOverflow.ellipsis,
          );
        },
      ),
    ],
  );
}
```

### Orientation-Aware

```dart
@override
Widget build(BuildContext context) {
  final orientation = MediaQuery.of(context).orientation;
  final isPortrait = orientation == Orientation.portrait;

  return SfTreemap(
    dataCount: _data.length,
    weightValueMapper: (int index) => _data[index].value,
    legend: TreemapLegend(
      position: isPortrait
          ? TreemapLegendPosition.bottom
          : TreemapLegendPosition.right,
    ),
    levels: [/* ... */],
  );
}
```

## Best Practices Summary

1. **Performance:**
   - Filter out very small data points
   - Use const constructors
   - Cache computed values
   - Limit dataset size (< 1000 items recommended)

2. **Accessibility:**
   - Provide semantic labels
   - Ensure color contrast
   - Support device font scaling
   - Maintain 48x48 touch targets

3. **Responsiveness:**
   - Adapt layout to screen size
   - Adjust font sizes for different devices
   - Consider orientation changes
   - Test on multiple screen sizes

4. **Custom Widgets:**
   - Keep itemBuilder simple
   - Optimize image assets
   - Use appropriate widget caching

5. **RTL Support:**
   - Test with RTL locales
   - Use Directionality-aware alignment
   - Verify label positioning

## Troubleshooting

**Issue: Poor performance with large datasets**

**Solution:** Filter data and limit tile count:
```dart
final filteredData = _data.where((item) => item.value > threshold).toList();
```

**Issue: Images not loading in itemBuilder**

**Solution:** Ensure assets are declared in `pubspec.yaml`:
```yaml
flutter:
  assets:
    - assets/images/
```

**Issue: Labels not scaling with device font settings**

**Solution:** Use relative font sizes:
```dart
fontSize: 12 * MediaQuery.of(context).textScaleFactor
```
