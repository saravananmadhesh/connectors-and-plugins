# Appearance, Export, and RTL

## Table of Contents
- [Chart Title](#chart-title)
- [Chart Sizing](#chart-sizing)
- [Chart Margin](#chart-margin)
- [Background Color and Image](#background-color-and-image)
- [Export as PNG Image](#export-as-png-image)
- [Export as PDF](#export-as-pdf)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
- [Accessibility](#accessibility)
- [pixelToPoint Method](#pixeltopoint-method)

---

## Chart Title

```dart
SfPyramidChart(
  title: ChartTitle(
    text: 'Sales Pipeline Q1 2026',
    alignment: ChartAlignment.center,  // near, center (default), far
    backgroundColor: Colors.blue.shade50,
    borderColor: Colors.blue,
    borderWidth: 1.0,
    textStyle: TextStyle(
      color: Colors.blue.shade900,
      fontSize: 16,
      fontWeight: FontWeight.bold,
      fontFamily: 'Roboto',
      fontStyle: FontStyle.normal,
    ),
  ),
  series: PyramidSeries<ChartData, String>(...),
)
```

---

## Chart Sizing

`SfPyramidChart` fills its parent container. Constrain it using a `Container` or `SizedBox`:

```dart
Container(
  height: 400,
  width: 350,
  child: SfPyramidChart(
    series: PyramidSeries<ChartData, String>(
      dataSource: chartData,
      xValueMapper: (ChartData data, _) => data.x,
      yValueMapper: (ChartData data, _) => data.y,
    ),
  ),
)
```

---

## Chart Margin

Add padding between the chart border and its content:

```dart
SfPyramidChart(
  margin: const EdgeInsets.all(15),
  borderColor: Colors.grey,
  borderWidth: 1.0,
  series: PyramidSeries<ChartData, String>(...),
)
```

---

## Background Color and Image

```dart
SfPyramidChart(
  backgroundColor: Colors.lightBlue.shade50,
  backgroundImage: const AssetImage('assets/chart_bg.png'),
  series: PyramidSeries<ChartData, String>(...),
)
```

> `backgroundImage` appears behind the series. Useful for branded or themed dashboards.

---

## Export as PNG Image

Use a `GlobalKey<SfPyramidChartState>` to access the chart's render state and export it:

```dart
import 'dart:typed_data';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_charts/charts.dart';

class ExportPyramidPage extends StatefulWidget {
  const ExportPyramidPage({super.key});
  @override
  State<ExportPyramidPage> createState() => _ExportPyramidPageState();
}

class _ExportPyramidPageState extends State<ExportPyramidPage> {
  final GlobalKey<SfPyramidChartState> _chartKey = GlobalKey();

  Future<void> _exportAsPng() async {
    final ui.Image? image = await _chartKey.currentState!.toImage(pixelRatio: 3.0);
    final ByteData? bytes = await image!.toByteData(format: ui.ImageByteFormat.png);
    final Uint8List imageBytes = bytes!.buffer.asUint8List();

    if (!mounted) return;
    await Navigator.push(context, MaterialPageRoute(
      builder: (context) => Scaffold(
        appBar: AppBar(title: const Text('Exported Chart')),
        body: Image.memory(imageBytes),
      ),
    ));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          SfPyramidChart(
            key: _chartKey,
            series: PyramidSeries<ChartData, String>(
              dataSource: chartData,
              xValueMapper: (ChartData data, _) => data.x,
              yValueMapper: (ChartData data, _) => data.y,
            ),
          ),
          ElevatedButton(
            onPressed: _exportAsPng,
            child: const Text('Export as PNG'),
          ),
        ],
      ),
    );
  }
}
```

---

## Export as PDF

Requires additional packages. Run the following to add them (always resolves latest compatible versions):

```bash
flutter pub add syncfusion_flutter_pdf path_provider open_file
```

```dart
import 'dart:io';
import 'dart:typed_data';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'package:open_file/open_file.dart';
import 'package:path_provider/path_provider.dart';
import 'package:syncfusion_flutter_charts/charts.dart';
import 'package:syncfusion_flutter_pdf/pdf.dart';

// In your state class:
final GlobalKey<SfPyramidChartState> _chartKey = GlobalKey();

Future<void> _exportAsPdf() async {
  // 1. Get raw image bytes from the chart
  final ui.Image image = await _chartKey.currentState!.toImage(pixelRatio: 3.0);
  final ByteData? byteData = await image.toByteData(format: ui.ImageByteFormat.png);
  final List<int> imageBytes = byteData!.buffer.asUint8List();

  // 2. Create a PDF document sized to the image
  final PdfBitmap bitmap = PdfBitmap(imageBytes);
  final PdfDocument document = PdfDocument();
  document.pageSettings.size = Size(bitmap.width.toDouble(), bitmap.height.toDouble());
  final PdfPage page = document.pages.add();
  final Size pageSize = page.getClientSize();
  page.graphics.drawImage(bitmap, Rect.fromLTWH(0, 0, pageSize.width, pageSize.height));

  // 3. Save and open
  final List<int> pdfBytes = document.saveSync();
  document.dispose();

  final Directory dir = await getApplicationSupportDirectory();
  final File file = File('${dir.path}/pyramid_chart.pdf');
  await file.writeAsBytes(pdfBytes, flush: true);
  OpenFile.open(file.path);
}
```

---

## Right-to-Left (RTL) Support

RTL rendering affects legend and tooltip layout. Series segments themselves render identically in LTR and RTL.

**Method 1: Wrap with Directionality widget**

```dart
Directionality(
  textDirection: TextDirection.rtl,
  child: SfPyramidChart(
    legend: Legend(isVisible: true),
    series: PyramidSeries<ChartData, String>(...),
  ),
)
```

**Method 2: Change app locale**

```dart
import 'package:flutter_localizations/flutter_localizations.dart';

MaterialApp(
  localizationsDelegates: const [
    GlobalMaterialLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
  ],
  supportedLocales: const [Locale('en'), Locale('ar')],
  locale: const Locale('ar'),  // Arabic triggers RTL
  home: Scaffold(body: SfPyramidChart(...)),
)
```

**RTL effects:**
- **Legend:** Items render right-to-left (text appears left, icon appears right)
- **Tooltip:** Default format flips to `point.y : point.x`

To override tooltip format in RTL mode:

```dart
SfPyramidChart(
  onTooltipRender: (TooltipArgs args) {
    // Force your custom format regardless of text direction
    args.text = '${args.dataPoints![args.pointIndex!].x}: ${args.dataPoints![args.pointIndex!].y}';
  },
  ...
)
```

---

## Accessibility

`SfPyramidChart` supports accessibility out of the box:

**Sufficient contrast:** Use theming or manual color customization on chart title, palette, data labels, legend text, tooltip, and selected segments to meet WCAG contrast requirements.

**Large fonts:** Font sizes scale automatically with the device's `MediaQueryData.textScaler`. To set custom font sizes, use `textStyle` on `ChartTitle`, `DataLabelSettings`, `Legend.textStyle`, and `TooltipBehavior`.

**Easily tappable targets:** The following elements fire tap callbacks for interaction:
- Data points → `onPointTap` on `PyramidSeries`
- Data labels → `onDataLabelTapped` on `SfPyramidChart`
- Legend items → `onLegendTapped` on `SfPyramidChart`

---

## pixelToPoint Method

Converts screen pixel coordinates to the logical chart data point at that location. Available via `PyramidSeriesController` after `onRendererCreated`.

```dart
PyramidSeriesController? _seriesController;

// In PyramidSeries:
onRendererCreated: (PyramidSeriesController controller) {
  _seriesController = controller;
},

// In SfPyramidChart:
onChartTouchInteractionDown: (ChartTouchInteractionArgs args) {
  final Offset tapPosition = Offset(args.position.dx, args.position.dy);
  final PointInfo<dynamic>? chartPoint = _seriesController?.pixelToPoint(tapPosition);
  if (chartPoint != null) {
    print('Tapped segment center: x=${chartPoint.x}, y=${chartPoint.y}');
  }
},
```

> `pixelToPoint` returns the **center value** of the tapped segment, not an exact coordinate.
