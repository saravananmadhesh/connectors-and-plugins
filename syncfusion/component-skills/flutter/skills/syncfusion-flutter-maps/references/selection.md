# Selection in Flutter Maps

Shape selection allows users to highlight and interact with specific regions on the map. Essential for interactive data exploration and filtering.

## Enable Selection

Handle selection with `onSelectionChanged` callback:

```dart
int? _selectedIndex;

MapShapeLayer(
  source: _dataSource,
  onSelectionChanged: (int index) {
    setState(() {
      _selectedIndex = index;
    });
  },
  selectionSettings: MapSelectionSettings(
    color: Colors.yellow,
    strokeColor: Colors.black,
    strokeWidth: 3,
  ),
)
```

## Selection Settings

Customize selection appearance:

```dart
MapSelectionSettings(
  color: Colors.orange.withOpacity(0.5),
  strokeColor: Colors.orange[900],
  strokeWidth: 2,
)
```

## Programmatic Selection

Select shapes programmatically by managing `selectedIndex` state and passing it to `MapShapeLayer`:

```dart
int _selectedIndex = -1;

// Select shape at index
setState(() {
  _selectedIndex = 5;
});

// Clear selection (pass -1 to deselect)
setState(() {
  _selectedIndex = -1;
});

MapShapeLayer(
  source: _dataSource,
  selectedIndex: _selectedIndex,
  onSelectionChanged: (int index) {
    setState(() {
      _selectedIndex = index;
    });
  },
  selectionSettings: MapSelectionSettings(
    color: Colors.yellow,
    strokeColor: Colors.black,
    strokeWidth: 3,
  ),
)
```

## Toggle Selection

Enable toggle on/off behavior:

```dart
int? _selectedIndex;

MapShapeLayer(
  source: _dataSource,
  onSelectionChanged: (int index) {
    setState(() {
      // Toggle: deselect if already selected
      _selectedIndex = (_selectedIndex == index) ? null : index;
    });
  },
)
```

## Common Patterns

### Pattern: Show Selected Region Data

```dart
int? _selectedIndex;

Column(
  children: [
    if (_selectedIndex != null)
      Card(
        child: Padding(
          padding: EdgeInsets.all(16),
          child: Text(
            'Selected: ${_data[_selectedIndex!].name}',
            style: TextStyle(fontSize: 18),
          ),
        ),
      ),
    Expanded(
      child: SfMaps(
        layers: [
          MapShapeLayer(
            source: _dataSource,
            onSelectionChanged: (index) {
              setState(() => _selectedIndex = index);
            },
            selectionSettings: MapSelectionSettings(
              color: Colors.blue.withOpacity(0.5),
            ),
          ),
        ],
      ),
    ),
  ],
)
```

## Use Cases

- Interactive election maps
- Region comparison tools
- Data filtering interfaces
- Geographic drill-down navigation
