---
name: syncfusion-flutter-cartesian-charts
description: Implements Syncfusion Flutter Cartesian Charts (SfCartesianChart) for a wide range of 2D chart types in Flutter apps. Use when working with line, column, bar, area, spline, scatter, bubble, financial, stacked, or histogram charts. This skill covers axis types (NumericAxis, CategoryAxis, DateTimeAxis), zoom and pan, tooltip, trackball, legend, annotations, technical indicators, trendlines, and chart export.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Implementing Syncfusion Flutter Cartesian Charts

`SfCartesianChart` is a high-performance Flutter widget from the `syncfusion_flutter_charts` package that supports 30+ chart types plotted on Cartesian (X/Y) coordinates. It handles real-time data, rich interactivity, and deep customization.

## When to Use This Skill

Use this skill when you need to:
- Render any line, area, column, bar, spline, scatter, or financial chart in Flutter
- Configure axis types (numeric, category, date-time, logarithmic)
- Add zooming, panning, tooltip, trackball, or crosshair interaction
- Customize series appearance (colors, gradients, markers, data labels)
- Add annotations, technical indicators, or trendlines
- Export charts or respond to chart callbacks
- Support RTL, localization, or accessibility

## Component Overview

The **SfCartesianChart** widget is a comprehensive charting solution that displays data using Cartesian (X/Y) coordinates. It supports over 30 chart types across multiple categories:

- **Line Charts**: Line, fast line, spline (various tension types), step line
- **Area Charts**: Area, spline area, step area, range area, spline range area, stacked area (including 100%)
- **Column/Bar Charts**: Column, bar, range column, stacked column/bar (including 100%)
- **Scatter/Bubble**: Scatter, bubble charts
- **Financial Charts**: Candle, OHLC, HiLo, HiLoOpenClose with support for technical indicators
- **Statistical**: Histogram, box and whisker, error bar
- **Waterfall**: For cumulative effect visualization

The widget provides five axis types (Numeric, Category, DateTime, DateTimeCategory, Logarithmic), interactive features (zoom, pan, tooltip, trackball, crosshair), selection behaviors, rich customization (markers, data labels, gradients, animations), technical indicators (SMA, EMA, MACD, RSI, Bollinger Bands, etc.), trendlines, annotations, and chart export capabilities.

---

## Quick Start

```bash
# Always installs the latest compatible version automatically
flutter pub add syncfusion_flutter_charts
```
> Always install the package via terminal — do **not** edit `pubspec.yaml` directly.
> Run this command from the Flutter project root and wait for it to complete successfully before proceeding.

```dart
import 'package:syncfusion_flutter_charts/charts.dart';

class MyChart extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 300,
      child: SfCartesianChart(
        primaryXAxis: CategoryAxis(),
        title: ChartTitle(text: 'Monthly Sales'),
        legend: Legend(isVisible: true),
        tooltipBehavior: TooltipBehavior(enable: true),
        series: <CartesianSeries>[
          LineSeries<ChartData, String>(
            dataSource: [
              ChartData('Jan', 35),
              ChartData('Feb', 28),
              ChartData('Mar', 34),
              ChartData('Apr', 32),
              ChartData('May', 40),
            ],
            xValueMapper: (ChartData d, _) => d.x,
            yValueMapper: (ChartData d, _) => d.y,
            name: 'Sales',
            dataLabelSettings: DataLabelSettings(isVisible: true),
          ),
        ],
      ),
    );
  }
}

class ChartData {
  ChartData(this.x, this.y);
  final String x;
  final double? y;
}
```

---

## Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Package installation and import
- Initialize SfCartesianChart
- Bind data source and data model
- Add title, data labels, legend, tooltip
- Complete minimal working example

### Line, Area & Spline Chart Types
📄 **Read:** [references/chart-types-line-area.md](references/chart-types-line-area.md)
- Line, fast line, spline (with spline types)
- Step line, area, spline area
- Step area, range area, spline range area
- When to use each type

### Column, Bar & Other Cartesian Types
📄 **Read:** [references/chart-types-column-bar.md](references/chart-types-column-bar.md)
- Column, bar, range column
- Bubble, scatter, histogram
- Waterfall, error bar, box and whisker
- Key configuration for each type

### Stacked Chart Types
📄 **Read:** [references/chart-types-stacked.md](references/chart-types-stacked.md)
- Stacked area/bar/column/line
- 100% stacked variants
- When to choose stacked vs 100% stacked

### Financial Chart Types
📄 **Read:** [references/chart-types-financial.md](references/chart-types-financial.md)
- Candle, HILO, OHLC charts
- Financial data model (open/high/low/close mappers)
- Hollow candle and solid candle

### Axis Types
📄 **Read:** [references/axis-types.md](references/axis-types.md)
- NumericAxis, CategoryAxis, DateTimeAxis
- DateTimeCategoryAxis, LogarithmicAxis
- Choosing the right axis for your data

### Axis Customization
📄 **Read:** [references/axis-customization.md](references/axis-customization.md)
- Title, labels, label format
- Gridlines, tick marks, range (min/max/interval)
- Strip lines, multi-level labels
- Secondary axis, axis crossing, inversed axis

### Series Customization
📄 **Read:** [references/series-customization.md](references/series-customization.md)
- Color, border, opacity, gradient fill
- Dash array, width, point color mapper
- Animation, palette colors, empty point settings

### Legend
📄 **Read:** [references/legend.md](references/legend.md)
- Enable and position legend
- Toggle series visibility via legend
- Overflow modes (wrap, scroll)
- Custom legend items and icons

### Tooltip, Trackball & Crosshair
📄 **Read:** [references/tooltip-trackball.md](references/tooltip-trackball.md)
- TooltipBehavior — enable, format, custom template
- Shared tooltip across series
- TrackballBehavior — display modes
- CrosshairBehavior configuration

### Zooming, Panning & Selection
📄 **Read:** [references/zoom-pan-selection.md](references/zoom-pan-selection.md)
- ZoomPanBehavior — pinch, mouse wheel, directional
- ZoomMode (x, y, xy), panning
- Auto-scrolling for live data
- SelectionBehavior — point, series, cluster, box

### Annotations, Markers & Data Labels
📄 **Read:** [references/annotations-markers-datalabels.md](references/annotations-markers-datalabels.md)
- CartesianChartAnnotation — text and widget overlays
- Coordinate units (point vs pixel vs percent)
- MarkerSettings — shape, size, color
- DataLabelSettings — position, format, template, connector lines

### Technical Indicators & Trendlines
📄 **Read:** [references/technical-indicators-trendlines.md](references/technical-indicators-trendlines.md)
- SMA, EMA, TMA, WMA, MACD, RSI, Stochastic
- Bollinger Bands, ATR, CCI, Momentum, AD, ROC
- Trendline types (linear, exponential, polynomial, moving average, power, logarithmic)
- Forecasting periods

### Chart Appearance & Multiple Charts
📄 **Read:** [references/chart-appearance.md](references/chart-appearance.md)
- Background color/image, plot area customization
- Color palette, theme integration
- Rendering multiple charts on the same screen
- On-demand / lazy data loading

### Callbacks, Methods, Export & Accessibility
📄 **Read:** [references/callbacks-methods-export.md](references/callbacks-methods-export.md)
- Key callbacks (onTooltipRender, onDataLabelRender, onZooming, etc.)
- ChartSeriesController methods (updateDataSource, animate)
- Export to PNG, PDF, JPEG
- Localization, RTL, accessibility

---

## Common Patterns

### Pattern 1 — Live / Real-Time Data Update
```dart
late ChartSeriesController _controller;

onRendererCreated: (ChartSeriesController controller) {
  _controller = controller;
},

void addDataPoint(ChartData newPoint) {
  chartData.add(newPoint);
  _controller.updateDataSource(
    addedDataIndexes: [chartData.length - 1],
  );
}
```

### Pattern 2 — Multiple Series on One Chart
```dart
series: <CartesianSeries>[
  LineSeries<ChartData, String>(
    dataSource: data,
    xValueMapper: (d, _) => d.x,
    yValueMapper: (d, _) => d.y1,
    name: 'Revenue',
  ),
  ColumnSeries<ChartData, String>(
    dataSource: data,
    xValueMapper: (d, _) => d.x,
    yValueMapper: (d, _) => d.y2,
    name: 'Cost',
  ),
]
```

### Pattern 3 — Zoom + Tooltip Together
```dart
late ZoomPanBehavior _zoom;
late TooltipBehavior _tooltip;

@override
void initState() {
  _zoom = ZoomPanBehavior(enablePinching: true, enableDoubleTapZooming: true);
  _tooltip = TooltipBehavior(enable: true);
  super.initState();
}

zoomPanBehavior: _zoom,
tooltipBehavior: _tooltip,
```

---

## Key Widget Properties

| Property | Type | Purpose |
|----------|------|---------|
| `primaryXAxis` | `ChartAxis` | Horizontal axis type and config |
| `primaryYAxis` | `ChartAxis` | Vertical axis type and config |
| `series` | `List<CartesianSeries>` | One or more data series |
| `title` | `ChartTitle` | Chart heading text |
| `legend` | `Legend` | Legend visibility and position |
| `tooltipBehavior` | `TooltipBehavior` | Tooltip on tap |
| `zoomPanBehavior` | `ZoomPanBehavior` | Zoom and pan interaction |
| `selectionType` | `SelectionType` | Point/series/cluster selection |
| `annotations` | `List<CartesianChartAnnotation>` | Overlay widgets/text |
| `indicators` | `List<TechnicalIndicator>` | Technical analysis overlays |
| `onTooltipRender` | `ChartTooltipCallback` | Customize tooltip text |
| `onZooming` | `ChartZoomingCallback` | Respond to zoom events |
| `palette` | `List<Color>` | Custom series color palette |
