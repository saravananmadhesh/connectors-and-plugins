# Callbacks, Methods, Export & Accessibility

## Table of Contents
- [Key Callbacks](#key-callbacks)
- [ChartSeriesController Methods](#chartseriescontroller-methods)
- [Export (PNG, PDF, JPEG)](#export-png-pdf-jpeg)
- [Localization](#localization)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
- [Accessibility](#accessibility)

---

## Key Callbacks

Callbacks on `SfCartesianChart` allow you to intercept and customize rendering events:

### onTooltipRender
Customize tooltip content before it displays:
```dart
SfCartesianChart(
  onTooltipRender: (TooltipArgs args) {
    args.text = 'Custom: ${args.text}';
    args.header = 'My Header';
    // args.locationX, args.locationY — tooltip position
    // args.seriesIndex, args.pointIndex — which series/point
  },
)
```

### onDataLabelRender
Customize data label text before rendering:
```dart
SfCartesianChart(
  onDataLabelRender: (DataLabelRenderArgs args) {
    args.text = '\$${args.text}';
    args.textStyle = const TextStyle(color: Colors.blue, fontWeight: FontWeight.bold);
  },
)
```

### onLegendItemRender
Customize legend item appearance:
```dart
SfCartesianChart(
  onLegendItemRender: (LegendRenderArgs args) {
    if (args.seriesIndex == 0) {
      args.legendIconType = LegendIconType.diamond;
      args.color = Colors.purple;
    }
  },
)
```

### onAxisLabelRender
Customize axis label text:
```dart
SfCartesianChart(
  onAxisLabelRender: (AxisLabelRenderDetails args) {
    if (args.axis is NumericAxis) {
      args.text = '${args.text}K';
    }
  },
)
```

### onActualRangeChanged
React to axis range changes (fired on zoom/pan or initial render):
```dart
SfCartesianChart(
  onActualRangeChanged: (ActualRangeChangedArgs args) {
    // args.axisName, args.actualMin, args.actualMax
    // args.visibleMin, args.visibleMax
    // Override visible range
    // args.visibleMin = 10;
    // args.visibleMax = 100;
  },
)
```

### onZooming / onZoomEnd / onZoomReset
```dart
SfCartesianChart(
  onZooming: (ZoomPanArgs args) {
    // Fires continuously while zooming
    // args.axis, args.currentZoomPosition, args.currentZoomFactor
  },
  onZoomEnd: (ZoomPanArgs args) {
    // Fires when zoom gesture ends
  },
  onZoomReset: (ZoomPanArgs args) {
    // Fires when chart is reset to original zoom level
  },
)
```

### onSelectionChanged
```dart
SfCartesianChart(
  onSelectionChanged: (SelectionArgs args) {
    final selectedIndex = args.pointIndex;
    final selectedSeriesIndex = args.seriesIndex;
  },
)
```

### onMarkerRender
Customize individual marker appearance per data point:
```dart
SfCartesianChart(
  onMarkerRender: (MarkerRenderArgs args) {
    if (args.pointIndex == 2) {
      args.color = Colors.red;
      args.markerHeight = 14;
      args.markerWidth = 14;
    }
  },
)
```

---

## ChartSeriesController Methods

Get a controller in `onRendererCreated` to manipulate a series programmatically:

```dart
late ChartSeriesController _seriesController;

LineSeries<ChartData, String>(
  dataSource: chartData,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  onRendererCreated: (ChartSeriesController controller) {
    _seriesController = controller;
  },
)
```

**updateDataSource** — efficiently add/remove/update points without full rebuild:
```dart
chartData.add(ChartData('Jun', 45));
_seriesController.updateDataSource(
  addedDataIndexes: [chartData.length - 1],
);

chartData.removeAt(0);
_seriesController.updateDataSource(
  removedDataIndexes: [0],
);

chartData[2] = ChartData('Mar', 99);
_seriesController.updateDataSource(
  updatedDataIndexes: [2],
);
```

**animate** — re-trigger the series entry animation:
```dart
_seriesController.animate();
```

---

## Export (PNG, PDF, JPEG)

Use `SfCartesianChartState` via a `GlobalKey` to export the chart:

```dart
final GlobalKey<SfCartesianChartState> _chartKey = GlobalKey();

SfCartesianChart(
  key: _chartKey,
)

Future<void> exportChart() async {
  final Uint8List imageBytes = await _chartKey.currentState!.toImage(pixelRatio: 2.0);
}

Future<void> exportToPdf() async {
  final PdfDocument document = PdfDocument();
  final PdfPage page = document.pages.add();
  final PdfBitmap bitmap = PdfBitmap(
    await _chartKey.currentState!.toImage(pixelRatio: 2.0),
  );
  page.graphics.drawImage(bitmap, Rect.fromLTWH(0, 0, page.getClientSize().width, 300));
  final List<int> bytes = document.saveSync();
  document.dispose();
}
```

> Requires `syncfusion_flutter_pdf` package for PDF export.

---

## Localization

Syncfusion chart uses the `syncfusion_localizations` package for text localization:

```yaml
dependencies:
  syncfusion_localizations: ^xx.x.xx
  flutter_localizations:
    sdk: flutter
```

```dart
MaterialApp(
  localizationsDelegates: const [
    GlobalMaterialLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
    SfGlobalLocalizations.delegate,
  ],
  supportedLocales: const [
    Locale('en'),
    Locale('fr'),
    Locale('de'),
  ],
  locale: const Locale('fr'),
)
```

---

## Right-to-Left (RTL) Support

Enable RTL layout — the chart mirrors axis positions and renders right-to-left:

```dart
Directionality(
  textDirection: TextDirection.rtl,
  child: SfCartesianChart(
  ),
)
```

Or set at the app level:
```dart
MaterialApp(
  locale: const Locale('ar'),
)
```

---

## Accessibility

`SfCartesianChart` supports screen readers (TalkBack on Android, VoiceOver on iOS):

- Enable accessibility by wrapping with Flutter's `Semantics` widget if custom descriptions are needed
- The chart renders with semantic labels for data points automatically
- Use `enableAxisAnimation: false` on lower-end devices to improve accessibility performance