# Bubbles in Flutter Maps

Bubbles visualize data through size and color variations on geographical shapes. Perfect for showing proportional data like population, sales volume, or density.

## Table of Contents
- [Overview](#overview)
- [Enable Bubbles](#enable-bubbles)
- [Bubble Size Mapping](#bubble-size-mapping)
- [Bubble Color Mapping](#bubble-color-mapping)
- [Bubble Customization](#bubble-customization)
- [Bubble Tooltips](#bubble-tooltips)

## Overview

Bubbles add a third dimension to map visualizations, allowing you to show both regional data (through shape colors) and proportional data (through bubble size) simultaneously.

## Enable Bubbles

Enable bubbles using `bubbleSizeMapper`:

```dart
late List<CountryData> _data;
late MapShapeSource _dataSource;

@override
void initState() {
  super.initState();
  
  _data = [
    CountryData('India', 280),
    CountryData('United States of America', 190),
    CountryData('Brazil', 120),
  ];
  
  _dataSource = MapShapeSource.asset(
    'assets/world_map.json',
    shapeDataField: 'name',
    dataCount: _data.length,
    primaryValueMapper: (index) => _data[index].country,
    bubbleSizeMapper: (index) => _data[index].population,
  );
}

MapShapeLayer(
  source: _dataSource,
)
```

## Bubble Size Mapping

Control bubble size range with `bubbleSettings`:

```dart
MapShapeLayer(
  source: _dataSource,
  bubbleSettings: MapBubbleSettings(
    minRadius: 10,
    maxRadius: 50,
    color: Colors.blue.withOpacity(0.8),
    strokeWidth: 2,
    strokeColor: Colors.white,
  ),
)
```

## Bubble Color Mapping

Color bubbles based on data values:

```dart
_dataSource = MapShapeSource.asset(
  'assets/world_map.json',
  shapeDataField: 'name',
  dataCount: _data.length,
  primaryValueMapper: (index) => _data[index].country,
  bubbleSizeMapper: (index) => _data[index].population,
  bubbleColorValueMapper: (index) => _data[index].density,
  bubbleColorMappers: [
    MapColorMapper(from: 0, to: 100, color: Colors.red),
    MapColorMapper(from: 101, to: 300, color: Colors.green),
  ],
);
```

## Bubble Customization

```dart
MapBubbleSettings(
  minRadius: 15,
  maxRadius: 60,
  color: Colors.purple.withOpacity(0.6),
  strokeWidth: 1,
  strokeColor: Colors.purple[900],
)
```

## Bubble Tooltips

Show bubble information on interaction:

```dart
MapShapeLayer(
  source: _dataSource,
  bubbleTooltipBuilder: (context, index) {
    return Padding(
      padding: EdgeInsets.all(8),
      child: Text(
        '${_data[index].country}: ${_data[index].population}M',
        style: TextStyle(color: Colors.white),
      ),
    );
  },
)
```

## Common Use Cases

- Population density maps
- Sales volume by region
- Disease spread visualization
- Economic indicators by country
