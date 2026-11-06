# Tooltip and Selection in Flutter TreeMap

## Table of Contents
- [Tooltips](#tooltips)
- [Tooltip Builder](#tooltip-builder)
- [Tooltip Customization](#tooltip-customization)
- [Selection](#selection)
- [Selection Customization](#selection-customization)
- [Combined Tooltip and Selection](#combined-tooltip-and-selection)

## Tooltips

Tooltips display additional information about tiles when users tap (touch devices) or hover (mouse devices).

### Adding Tooltips

Use the `tooltipBuilder` callback in `TreemapLevel` to create tooltips.

```dart
TreemapLevel(
  groupMapper: (int index) => _data[index].category,
  tooltipBuilder: (BuildContext context, TreemapTile tile) {
    return Padding(
      padding: EdgeInsets.all(8),
      child: Text(
        '${tile.group}: ${tile.weight}',
        style: TextStyle(color: Colors.white),
      ),
    );
  },
)
```

## Tooltip Builder

The `tooltipBuilder` receives:
- `BuildContext context`
- `TreemapTile tile` - tile information (group, weight, indices)

Return a widget to display in the tooltip.

### Complete Tooltip Example

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_treemap/treemap.dart';

class TooltipExample extends StatefulWidget {
  @override
  _TooltipExampleState createState() => _TooltipExampleState();
}

class _TooltipExampleState extends State<TooltipExample> {
  late List<SalesData> _data;

  @override
  void initState() {
    _data = [
      SalesData(region: 'North America', product: 'Laptop', sales: 450000),
      SalesData(region: 'Europe', product: 'Phone', sales: 380000),
      SalesData(region: 'Asia', product: 'Tablet', sales: 520000),
      SalesData(region: 'South America', product: 'Desktop', sales: 220000),
    ];
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Sales with Tooltips')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: SfTreemap(
          dataCount: _data.length,
          weightValueMapper: (int index) => _data[index].sales,
          levels: [
            TreemapLevel(
              groupMapper: (int index) => _data[index].region,
              tooltipBuilder: (BuildContext context, TreemapTile tile) {
                final index = tile.indices[0];
                return Container(
                  padding: EdgeInsets.all(10),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        _data[index].region,
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                      SizedBox(height: 4),
                      Text(
                        'Product: ${_data[index].product}',
                        style: TextStyle(color: Colors.white70),
                      ),
                      Text(
                        'Sales: \$${tile.weight.toStringAsFixed(0)}',
                        style: TextStyle(color: Colors.white70),
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
}

class SalesData {
  SalesData({
    required this.region,
    required this.product,
    required this.sales,
  });
  
  final String region;
  final String product;
  final double sales;
}
```

## Tooltip Customization

Customize tooltip appearance using `tooltipSettings`.

### Background Color

```dart
SfTreemap(
  dataCount: _data.length,
  weightValueMapper: (int index) => _data[index].value,
  tooltipSettings: TreemapTooltipSettings(
    color: Colors.orange[300], // Background color
  ),
  levels: [
    TreemapLevel(
      groupMapper: (int index) => _data[index].category,
      tooltipBuilder: (context, tile) => Padding(
        padding: EdgeInsets.all(6),
        child: Text(tile.group),
      ),
    ),
  ],
)
```

### Border Customization

```dart
tooltipSettings: TreemapTooltipSettings(
  color: Colors.white,
  borderColor: Colors.blue,
  borderWidth: 2,
)
```

### Border Radius

```dart
tooltipSettings: TreemapTooltipSettings(
  color: Colors.black87,
  borderRadius: BorderRadius.circular(12),
)
```

### Hide Delay

Control how long the tooltip stays visible (in seconds).

```dart
tooltipSettings: TreemapTooltipSettings(
  hideDelay: 5, // Tooltip hides after 5 seconds
)

// Always visible
tooltipSettings: TreemapTooltipSettings(
  hideDelay: double.infinity, // Never auto-hide
)
```

## Selection

Enable tile selection to highlight tiles and perform actions when users tap them.

### Enabling Selection

Use the `onSelectionChanged` callback.

```dart
SfTreemap(
  dataCount: _data.length,
  weightValueMapper: (int index) => _data[index].value,
  onSelectionChanged: (TreemapTile tile) {
    print('Selected: ${tile.group}');
    // Perform actions on selection
  },
  levels: [
    TreemapLevel(
      groupMapper: (int index) => _data[index].category,
    ),
  ],
)
```

### Complete Selection Example

```dart
class SelectionExample extends StatefulWidget {
  @override
  _SelectionExampleState createState() => _SelectionExampleState();
}

class _SelectionExampleState extends State<SelectionExample> {
  late List<RegionData> _data;
  String? _selectedRegion;
  double? _selectedValue;

  @override
  void initState() {
    _data = [
      RegionData(region: 'North', value: 850),
      RegionData(region: 'South', value: 620),
      RegionData(region: 'East', value: 450),
      RegionData(region: 'West', value: 280),
    ];
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Select a Region')),
      body: Column(
        children: [
          if (_selectedRegion != null)
            Container(
              padding: EdgeInsets.all(16),
              color: Colors.blue[50],
              child: Text(
                'Selected: $_selectedRegion (\$$_selectedValue)',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ),
          Expanded(
            child: Padding(
              padding: EdgeInsets.all(16),
              child: SfTreemap(
                dataCount: _data.length,
                weightValueMapper: (int index) => _data[index].value,
                onSelectionChanged: (TreemapTile tile) {
                  setState(() {
                    _selectedRegion = tile.group;
                    _selectedValue = tile.weight;
                  });
                },
                levels: [
                  TreemapLevel(
                    groupMapper: (int index) => _data[index].region,
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class RegionData {
  RegionData({required this.region, required this.value});
  final String region;
  final double value;
}
```

## Selection Customization

Customize the appearance of selected tiles using `selectionSettings`.

### Selection Color

```dart
SfTreemap(
  dataCount: _data.length,
  weightValueMapper: (int index) => _data[index].value,
  onSelectionChanged: (TreemapTile tile) {},
  selectionSettings: TreemapSelectionSettings(
    color: Colors.orange, // Selected tile color
  ),
  levels: [
    TreemapLevel(
      groupMapper: (int index) => _data[index].category,
    ),
  ],
)
```

### Selection Border

```dart
selectionSettings: TreemapSelectionSettings(
  color: Colors.orange[200],
  border: RoundedRectangleBorder(
    side: BorderSide(
      color: Colors.deepOrange,
      width: 3,
    ),
    borderRadius: BorderRadius.circular(8),
  ),
)
```

## Combined Tooltip and Selection

Use both features together for rich interactions.

```dart
class InteractiveTreemap extends StatefulWidget {
  @override
  _InteractiveTreemapState createState() => _InteractiveTreemapState();
}

class _InteractiveTreemapState extends State<InteractiveTreemap> {
  late List<ProductData> _data;
  String? _selectedProduct;

  @override
  void initState() {
    _data = [
      ProductData(product: 'Laptop', category: 'Electronics', sales: 45000),
      ProductData(product: 'Phone', category: 'Electronics', sales: 55000),
      ProductData(product: 'Shirt', category: 'Clothing', sales: 12000),
      ProductData(product: 'Shoes', category: 'Clothing', sales: 18000),
      ProductData(product: 'Book', category: 'Media', sales: 8000),
    ];
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Interactive Product Sales'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: SfTreemap(
          dataCount: _data.length,
          weightValueMapper: (int index) => _data[index].sales,
          // Selection
          onSelectionChanged: (TreemapTile tile) {
            setState(() {
              _selectedProduct = tile.group;
            });
            
            // Show dialog or navigate
            showDialog(
              context: context,
              builder: (context) => AlertDialog(
                title: Text(tile.group),
                content: Text('Sales: \$${tile.weight.toStringAsFixed(0)}'),
                actions: [
                  TextButton(
                    onPressed: () => Navigator.pop(context),
                    child: Text('OK'),
                  ),
                ],
              ),
            );
          },
          selectionSettings: TreemapSelectionSettings(
            color: Colors.blue[100],
            border: RoundedRectangleBorder(
              side: BorderSide(color: Colors.blue, width: 2),
            ),
          ),
          // Tooltip
          tooltipSettings: TreemapTooltipSettings(
            color: Colors.black87,
            borderRadius: BorderRadius.circular(8),
          ),
          levels: [
            TreemapLevel(
              groupMapper: (int index) => _data[index].product,
              tooltipBuilder: (BuildContext context, TreemapTile tile) {
                final index = tile.indices[0];
                return Padding(
                  padding: EdgeInsets.all(8),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        _data[index].product,
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text(
                        'Category: ${_data[index].category}',
                        style: TextStyle(color: Colors.white70),
                      ),
                      Text(
                        'Tap to view details',
                        style: TextStyle(
                          color: Colors.white54,
                          fontSize: 11,
                        ),
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
}

class ProductData {
  ProductData({
    required this.product,
    required this.category,
    required this.sales,
  });
  
  final String product;
  final String category;
  final double sales;
}
```

## Best Practices

1. **Keep tooltips concise** - show only essential information.

2. **Use consistent styling** - match app theme.

3. **Provide feedback** - always show visual feedback on selection.

4. **Handle tap actions** - perform meaningful actions on selection.

5. **Accessibility** - ensure sufficient contrast in tooltips.

6. **Performance** - keep tooltip builders lightweight.

## Troubleshooting

**Issue: Tooltips not appearing**

**Solution:** Ensure `tooltipBuilder` is defined and returns a widget:
```dart
tooltipBuilder: (context, tile) {
  return Text(tile.group); // Must return a widget
}
```

**Issue: Selection not working**

**Solution:** Add `onSelectionChanged` callback:
```dart
onSelectionChanged: (TreemapTile tile) {
  // Must be present, even if empty
}
```

**Issue: Tooltip shows behind other widgets**

**Solution:** TreeMap handles tooltip overlay automatically - ensure TreeMap has sufficient z-index in your widget tree.

**Issue: Selection highlights children in hierarchical treemap**

**Behavior:** This is intentional - selecting a parent tile also selects its descendants. To select only the parent, handle selection at a specific level.
