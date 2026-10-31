# Layout Algorithms in Flutter TreeMap

The TreeMap widget supports three layout algorithms that determine how tiles are arranged and sized. Choose the layout based on your data visualization needs and aesthetic preferences.

## Table of Contents

- [Available Layouts](#available-layouts)
- [Squarified Layout](#squarified-layout)
  - [When to Use](#when-to-use)
  - [Implementation](#implementation)
  - [Example](#example)
  - [Layout Direction](#layout-direction)
- [Slice Layout](#slice-layout)
  - [When to Use](#when-to-use-1)
  - [Implementation](#implementation-1)
  - [Example](#example-1)
- [Dice Layout](#dice-layout)
  - [When to Use](#when-to-use-2)
  - [Implementation](#implementation-2)
  - [Example](#example-2)
- [Sorting Tiles](#sorting-tiles)
  - [Sorting Example](#sorting-example)
- [Layout Comparison](#layout-comparison)
- [Choosing the Right Layout](#choosing-the-right-layout)
- [Performance Considerations](#performance-considerations)
- [Responsive Design](#responsive-design)
- [Common Patterns](#common-patterns)
  - [Pattern: Switching Layouts Dynamically](#pattern-switching-layouts-dynamically)
- [Troubleshooting](#troubleshooting)

## Available Layouts

1. **Squarified** (default) - Balanced rectangles, best aspect ratios
2. **Slice** - Horizontal divisions, all tiles span full height
3. **Dice** - Vertical divisions, all tiles span full width

## Squarified Layout

The squarified layout arranges tiles to maintain aspect ratios as close to 1:1 as possible, creating more square-like rectangles. This is the default and most commonly used layout.

### When to Use

- General-purpose data visualization
- When readability is the priority
- Mixed value ranges (some large, some small)
- Default choice for most use cases

### Implementation

Simply use `SfTreemap()` constructor (no special configuration needed):

```dart
SfTreemap(
  dataCount: _data.length,
  weightValueMapper: (int index) => _data[index].value,
  levels: [
    TreemapLevel(
      groupMapper: (int index) => _data[index].category,
    ),
  ],
)
```

### Example

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_treemap/treemap.dart';

class SquarifiedExample extends StatefulWidget {
  @override
  _SquarifiedExampleState createState() => _SquarifiedExampleState();
}

class _SquarifiedExampleState extends State<SquarifiedExample> {
  late List<PopulationModel> _data;

  @override
  void initState() {
    _data = [
      PopulationModel(continent: 'Asia', population: 4641),
      PopulationModel(continent: 'Africa', population: 1340),
      PopulationModel(continent: 'Europe', population: 747),
      PopulationModel(continent: 'North America', population: 592),
      PopulationModel(continent: 'South America', population: 430),
      PopulationModel(continent: 'Australia', population: 43),
    ];
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Squarified Layout')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: SfTreemap(
          dataCount: _data.length,
          weightValueMapper: (int index) => _data[index].population,
          levels: [
            TreemapLevel(
              groupMapper: (int index) => _data[index].continent,
              color: Colors.teal[200],
              padding: EdgeInsets.all(1.5),
            ),
          ],
        ),
      ),
    );
  }
}

class PopulationModel {
  PopulationModel({required this.continent, required this.population});
  final String continent;
  final double population;
}
```

### Layout Direction

Control where tiles start laying out using `layoutDirection`:

```dart
SfTreemap(
  dataCount: _data.length,
  weightValueMapper: (int index) => _data[index].value,
  layoutDirection: TreemapLayoutDirection.bottomRight,
  levels: [/* ... */],
)
```

**Available directions:**
- `TreemapLayoutDirection.topLeft` (default)
- `TreemapLayoutDirection.topRight`
- `TreemapLayoutDirection.bottomLeft`
- `TreemapLayoutDirection.bottomRight`

## Slice Layout

The slice layout arranges tiles horizontally in rows. Each tile spans the full available height, with width proportional to its value.

### When to Use

- Comparing values side-by-side
- Timeline or sequential data
- When horizontal comparison is important
- Lists that need visual weight representation

### Implementation

Use `SfTreemap.slice()` constructor:

```dart
SfTreemap.slice(
  dataCount: _data.length,
  weightValueMapper: (int index) => _data[index].value,
  levels: [
    TreemapLevel(
      groupMapper: (int index) => _data[index].category,
    ),
  ],
)
```

### Example

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_treemap/treemap.dart';

class SliceExample extends StatefulWidget {
  @override
  _SliceExampleState createState() => _SliceExampleState();
}

class _SliceExampleState extends State<SliceExample> {
  late List<BudgetModel> _data;

  @override
  void initState() {
    _data = [
      BudgetModel(department: 'Engineering', budget: 450),
      BudgetModel(department: 'Sales', budget: 320),
      BudgetModel(department: 'Marketing', budget: 180),
      BudgetModel(department: 'HR', budget: 90),
      BudgetModel(department: 'Operations', budget: 210),
    ];
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Slice Layout - Budget by Department')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: SfTreemap.slice(
          dataCount: _data.length,
          weightValueMapper: (int index) => _data[index].budget,
          levels: [
            TreemapLevel(
              groupMapper: (int index) => _data[index].department,
              color: Colors.blue[300],
              padding: EdgeInsets.all(1.5),
            ),
          ],
        ),
      ),
    );
  }
}

class BudgetModel {
  BudgetModel({required this.department, required this.budget});
  final String department;
  final double budget;
}
```

## Dice Layout

The dice layout arranges tiles vertically in columns. Each tile spans the full available width, with height proportional to its value.

### When to Use

- Stacked or layered data visualization
- Vertical hierarchies
- When vertical comparison is important
- Progress or stage-based data

### Implementation

Use `SfTreemap.dice()` constructor:

```dart
SfTreemap.dice(
  dataCount: _data.length,
  weightValueMapper: (int index) => _data[index].value,
  levels: [
    TreemapLevel(
      groupMapper: (int index) => _data[index].category,
    ),
  ],
)
```

### Example

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_treemap/treemap.dart';

class DiceExample extends StatefulWidget {
  @override
  _DiceExampleState createState() => _DiceExampleState();
}

class _DiceExampleState extends State<DiceExample> {
  late List<TaskModel> _data;

  @override
  void initState() {
    _data = [
      TaskModel(stage: 'Planning', hours: 120),
      TaskModel(stage: 'Development', hours: 480),
      TaskModel(stage: 'Testing', hours: 240),
      TaskModel(stage: 'Deployment', hours: 80),
      TaskModel(stage: 'Maintenance', hours: 160),
    ];
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Dice Layout - Project Stages')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: SfTreemap.dice(
          dataCount: _data.length,
          weightValueMapper: (int index) => _data[index].hours,
          levels: [
            TreemapLevel(
              groupMapper: (int index) => _data[index].stage,
              color: Colors.purple[300],
              padding: EdgeInsets.all(1.5),
            ),
          ],
        ),
      ),
    );
  }
}

class TaskModel {
  TaskModel({required this.stage, required this.hours});
  final String stage;
  final double hours;
}
```

## Sorting Tiles

For **slice** and **dice** layouts, you can sort tiles by their weight value using the `sortAscending` property.

```dart
SfTreemap.slice(
  dataCount: _data.length,
  weightValueMapper: (int index) => _data[index].value,
  sortAscending: true, // Sort from smallest to largest
  levels: [/* ... */],
)
```

**Options:**
- `sortAscending: true` - Smallest to largest
- `sortAscending: false` - Largest to smallest (default)

**Note:** Sorting is NOT available for squarified layout.

### Sorting Example

```dart
SfTreemap.slice(
  dataCount: _salesData.length,
  weightValueMapper: (int index) => _salesData[index].revenue,
  sortAscending: true, // Smallest tiles first
  levels: [
    TreemapLevel(
      groupMapper: (int index) => _salesData[index].region,
      labelBuilder: (BuildContext context, TreemapTile tile) {
        return Padding(
          padding: EdgeInsets.all(4),
          child: Text(tile.group),
        );
      },
    ),
  ],
)
```

## Layout Comparison

| Feature | Squarified | Slice | Dice |
|---------|-----------|-------|------|
| **Tile Shape** | Balanced rectangles | Horizontal bars | Vertical bars |
| **Aspect Ratio** | Near 1:1 | Varies (width) | Varies (height) |
| **Layout Direction** | ✅ Yes | ❌ No | ❌ No |
| **Sorting** | ❌ No | ✅ Yes | ✅ Yes |
| **Best For** | General use | Side-by-side comparison | Stacked/layered data |
| **Readability** | High | Medium | Medium |

## Choosing the Right Layout

### Use Squarified When:
- You want the most balanced, readable visualization
- Data has widely varying values
- You need good label readability
- You're not sure which layout to choose (best default)

### Use Slice When:
- Comparing categories horizontally
- Data represents sequential or timeline information
- You want a bar-chart-like appearance
- Horizontal screen space is available

### Use Dice When:
- Comparing categories vertically
- Data represents stages or layers
- You want a stacked appearance
- Vertical screen space is available

## Performance Considerations

All three layouts have similar performance characteristics. However:

- **Squarified** performs more calculations to optimize aspect ratios
- **Slice/Dice** are simpler algorithms, slightly faster for large datasets
- For datasets with <1000 items, performance differences are negligible

## Responsive Design

Layouts behave differently when the container size changes:

```dart
LayoutBuilder(
  builder: (context, constraints) {
    // Use slice for wide screens, dice for tall screens
    final isWide = constraints.maxWidth > constraints.maxHeight;
    
    return isWide
        ? SfTreemap.slice(/* ... */)
        : SfTreemap.dice(/* ... */);
  },
)
```

## Common Patterns

### Pattern: Switching Layouts Dynamically

```dart
enum LayoutType { squarified, slice, dice }

class DynamicLayoutExample extends StatefulWidget {
  @override
  _DynamicLayoutExampleState createState() => _DynamicLayoutExampleState();
}

class _DynamicLayoutExampleState extends State<DynamicLayoutExample> {
  LayoutType _selectedLayout = LayoutType.squarified;
  late List<DataModel> _data;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Layout Switcher'),
        actions: [
          PopupMenuButton<LayoutType>(
            onSelected: (type) => setState(() => _selectedLayout = type),
            itemBuilder: (context) => [
              PopupMenuItem(value: LayoutType.squarified, child: Text('Squarified')),
              PopupMenuItem(value: LayoutType.slice, child: Text('Slice')),
              PopupMenuItem(value: LayoutType.dice, child: Text('Dice')),
            ],
          ),
        ],
      ),
      body: _buildTreemap(),
    );
  }

  Widget _buildTreemap() {
    switch (_selectedLayout) {
      case LayoutType.slice:
        return SfTreemap.slice(
          dataCount: _data.length,
          weightValueMapper: (int index) => _data[index].value,
          levels: _buildLevels(),
        );
      case LayoutType.dice:
        return SfTreemap.dice(
          dataCount: _data.length,
          weightValueMapper: (int index) => _data[index].value,
          levels: _buildLevels(),
        );
      default:
        return SfTreemap(
          dataCount: _data.length,
          weightValueMapper: (int index) => _data[index].value,
          levels: _buildLevels(),
        );
    }
  }

  List<TreemapLevel> _buildLevels() {
    return [
      TreemapLevel(
        groupMapper: (int index) => _data[index].category,
      ),
    ];
  }
}
```

## Troubleshooting

**Issue: Tiles overlap or render incorrectly**

**Solution:** Ensure container has defined size:
```dart
Container(
  height: 400,
  width: 400,
  child: SfTreemap(/* ... */),
)
```

**Issue: Slice/dice layout looks too compressed**

**Solution:** Adjust padding between tiles:
```dart
TreemapLevel(
  padding: EdgeInsets.all(2), // Increase spacing
  // ...
)
```
