# Data Labels in Flutter Maps

Data labels provide identification for shapes by displaying their names. You can trim or hide labels if they exceed shape bounds.

## Table of Contents
- [Overview](#overview)
- [Show Data Labels](#show-data-labels)
- [Customizing Label Text](#customizing-label-text)
- [Label Styling](#label-styling)
- [Label Overflow Handling](#label-overflow-handling)

## Overview

Data labels help users identify geographical regions by displaying text on shapes. They're essential for choropleth maps, election results, and statistical visualizations.

## Show Data Labels

Enable data labels using the `showDataLabels` property:

```dart
late MapShapeSource _dataSource;

@override
void initState() {
  super.initState();
  _dataSource = MapShapeSource.asset(
    'assets/world_map.json',
    shapeDataField: 'continent',
  );
}

@override
Widget build(BuildContext context) {
  return SfMaps(
    layers: [
      MapShapeLayer(
        source: _dataSource,
        showDataLabels: true,  // Show labels
      ),
    ],
  );
}
```

By default, labels display the value from the `shapeDataField` property.

## Customizing Label Text

Use `dataLabelMapper` to customize label text:

```dart
late List<CountryModel> _data;
late MapShapeSource _dataSource;

@override
void initState() {
  super.initState();
  
  _data = [
    CountryModel('United States of America', 'USA'),
    CountryModel('United Kingdom', 'UK'),
    CountryModel('United Arab Emirates', 'UAE'),
  ];
  
  _dataSource = MapShapeSource.asset(
    'assets/world_map.json',
    shapeDataField: 'name',
    dataCount: _data.length,
    primaryValueMapper: (index) => _data[index].fullName,
    dataLabelMapper: (index) => _data[index].abbreviation,
  );
}

MapShapeLayer(
  source: _dataSource,
  showDataLabels: true,
)
```

## Label Styling

Customize label appearance with `dataLabelSettings`:

```dart
MapShapeLayer(
  source: _dataSource,
  showDataLabels: true,
  dataLabelSettings: MapDataLabelSettings(
    textStyle: TextStyle(
      color: Colors.black,
      fontSize: 12,
      fontWeight: FontWeight.bold,
      fontFamily: 'Roboto',
    ),
  ),
)
```

### Using SfMapsTheme

```dart
import 'package:syncfusion_flutter_core/theme.dart';

SfMapsTheme(
  data: SfMapsThemeData(
    dataLabelTextStyle: TextStyle(
      color: Colors.red,
      fontSize: 14,
      fontWeight: FontWeight.w600,
    ),
  ),
  child: SfMaps(
    layers: [
      MapShapeLayer(
        source: _dataSource,
        showDataLabels: true,
      ),
    ],
  ),
)
```

## Label Overflow Handling

### Trimming Labels

Labels automatically trim when they exceed shape bounds:

```dart
MapShapeLayer(
  source: _dataSource,
  showDataLabels: true,
  dataLabelSettings: MapDataLabelSettings(
    overflowMode: MapLabelOverflow.ellipsis,  // Default
  ),
)
```

### Overflow Modes

- `MapLabelOverflow.visible` - Show full label (may overlap)
- `MapLabelOverflow.ellipsis` - Trim with "..."
- `MapLabelOverflow.hide` - Hide overflowing labels

### Example: Hide Overflowing Labels

```dart
MapShapeLayer(
  source: _dataSource,
  showDataLabels: true,
  dataLabelSettings: MapDataLabelSettings(
    overflowMode: MapLabelOverflow.hide,
    textStyle: TextStyle(fontSize: 10),
  ),
)
```

## Common Patterns

### Pattern 1: State Abbreviations

```dart
late List<StateData> _states;
late MapShapeSource _dataSource;

@override
void initState() {
  super.initState();
  
  _states = [
    StateData('California', 'CA'),
    StateData('Texas', 'TX'),
    StateData('New York', 'NY'),
  ];
  
  _dataSource = MapShapeSource.asset(
    'assets/usa_states.json',
    shapeDataField: 'name',
    dataCount: _states.length,
    primaryValueMapper: (index) => _states[index].fullName,
    dataLabelMapper: (index) => _states[index].code,
  );
}

Widget build(BuildContext context) {
  return SfMaps(
    layers: [
      MapShapeLayer(
        source: _dataSource,
        showDataLabels: true,
        dataLabelSettings: MapDataLabelSettings(
          textStyle: TextStyle(
            fontSize: 11,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    ],
  );
}
```

### Pattern 2: Population Numbers

```dart
_dataSource = MapShapeSource.asset(
  'assets/world_map.json',
  shapeDataField: 'name',
  dataCount: _countries.length,
  primaryValueMapper: (index) => _countries[index].name,
  dataLabelMapper: (index) => '${_countries[index].population}M',
);

MapShapeLayer(
  source: _dataSource,
  showDataLabels: true,
  dataLabelSettings: MapDataLabelSettings(
    textStyle: TextStyle(fontSize: 9, color: Colors.white),
    overflowMode: MapLabelOverflow.hide,
  ),
)
```

## Best Practices

1. **Keep labels short** - Use abbreviations for long names
2. **Choose appropriate font size** - Balance visibility and clutter
3. **Handle overflow** - Use hide or ellipsis for small shapes
4. **Ensure contrast** - Make labels readable against shape colors
5. **Test at different zooms** - Verify labels work at various zoom levels

## Troubleshooting

### Issue: Labels Not Showing

**Check:**
1. `showDataLabels` is set to `true`
2. `shapeDataField` matches GeoJSON property
3. Font size isn't too small
4. Labels aren't hidden by overflow mode

### Issue: Labels Overlapping

**Solutions:**
- Reduce font size
- Use `MapLabelOverflow.hide` to hide small shape labels
- Implement zoom-based label visibility

### Issue: Labels Cut Off

**Solution:** Use `MapLabelOverflow.ellipsis` or reduce font size
