# Accessibility and Export

## Table of Contents
- [Accessibility](#accessibility)
- [RTL Support](#rtl-support)
- [Export as PNG Image](#export-as-png-image)
- [Export as PDF](#export-as-pdf)

---

## Accessibility

`SfCircularChart` is built with accessibility in mind and supports:

### Sufficient Contrast

Customize colors for all chart elements to meet WCAG contrast requirements:
- Chart title text color via `ChartTitle.textStyle`
- Series palette via `SfCircularChart.palette`
- Per-point colors via `pointColorMapper`
- Data label text via `DataLabelSettings.textStyle`
- Legend text via `Legend.textStyle`
- Tooltip background via `TooltipBehavior.color`
- Selected segment color via `SelectionBehavior.selectedColor`

### Large Fonts

All text elements scale automatically with the device's `MediaQueryData.textScaler` (system font size). You can also explicitly set font sizes on:
- `ChartTitle.textStyle.fontSize`
- `DataLabelSettings.textStyle.fontSize`
- `Legend.textStyle.fontSize`
- `TooltipBehavior` text

### Tappable Targets

The chart provides callback support to respond to user taps on key elements:
- **Data points** — `onPointTap` callback on `SfCircularChart`
- **Data labels** — `onDataLabelTapped` callback on `SfCircularChart`
- **Legend items** — `onLegendTapped` callback on `SfCircularChart`

Example:

```dart
SfCircularChart(
  onPointTap: (ChartPointDetails details) {
    print('Tapped point index: ${details.pointIndex}');
    print('Series index: ${details.seriesIndex}');
  },
  series: <CircularSeries>[...],
)
```

---

## RTL Support

Wrap the chart in a `Directionality` widget to enable right-to-left layout:

```dart
Directionality(
  textDirection: TextDirection.rtl,
  child: SfCircularChart(
    series: <CircularSeries>[
      PieSeries<ChartData, String>(
        dataSource: chartData,
        xValueMapper: (d, _) => d.x,
        yValueMapper: (d, _) => d.y,
      ),
    ],
  ),
)
```

---

## Export as PNG Image

Use a `GlobalKey<SfCircularChartState>` to capture the chart as a PNG image:

```dart
import 'dart:typed_data';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_charts/charts.dart';

class ExportChartPage extends StatefulWidget {
  @override
  _ExportChartPageState createState() => _ExportChartPageState();
}

class _ExportChartPageState extends State<ExportChartPage> {
  final GlobalKey<SfCircularChartState> _chartKey = GlobalKey();

  final List<ChartData> _data = [
    ChartData('Jan', 35),
    ChartData('Feb', 28),
    ChartData('Mar', 34),
  ];

  Future<void> _exportImage() async {
    final ui.Image? image = await _chartKey.currentState!.toImage(pixelRatio: 3.0);
    final ByteData? bytes = await image!.toByteData(
      format: ui.ImageByteFormat.png,
    );
    final Uint8List imageBytes = bytes!.buffer.asUint8List(
      bytes.offsetInBytes,
      bytes.lengthInBytes,
    );

    await Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => Scaffold(body: Image.memory(imageBytes)),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          SfCircularChart(
            key: _chartKey,
            series: <CircularSeries>[
              PieSeries<ChartData, String>(
                dataSource: _data,
                xValueMapper: (d, _) => d.x,
                yValueMapper: (d, _) => d.y,
              ),
            ],
          ),
          ElevatedButton(
            onPressed: _exportImage,
            child: const Text('Export as PNG'),
          ),
        ],
      ),
    );
  }
}

class ChartData {
  ChartData(this.x, this.y);
  final String x;
  final double y;
}
```

> `pixelRatio: 3.0` produces a high-resolution image. Adjust as needed.

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
import 'package:path_provider/path_provider.dart';
import 'package:open_file/open_file.dart';
import 'package:syncfusion_flutter_charts/charts.dart';
import 'package:syncfusion_flutter_pdf/pdf.dart';

class _ExportPageState extends State<ExportChartToPdf> {
  final GlobalKey<SfCircularChartState> _chartKey = GlobalKey();

  Future<void> _exportPDF() async {
    final ui.Image image = await _chartKey.currentState!.toImage(pixelRatio: 3.0);
    final ByteData? byteData = await image.toByteData(
      format: ui.ImageByteFormat.png,
    );
    final List<int> imageBytes = byteData!.buffer.asUint8List(
      byteData.offsetInBytes,
      byteData.lengthInBytes,
    );

    final PdfBitmap bitmap = PdfBitmap(imageBytes);
    final PdfDocument document = PdfDocument();
    document.pageSettings.size = Size(
      bitmap.width.toDouble(),
      bitmap.height.toDouble(),
    );
    final PdfPage page = document.pages.add();
    final Size pageSize = page.getClientSize();
    page.graphics.drawImage(
      bitmap,
      Rect.fromLTWH(0, 0, pageSize.width, pageSize.height),
    );

    final List<int> pdfBytes = document.saveSync();
    document.dispose();

    final Directory dir = await getApplicationSupportDirectory();
    final File file = File('${dir.path}/chart_export.pdf');
    await file.writeAsBytes(pdfBytes, flush: true);
    OpenFile.open(file.path);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SfCircularChart(
        key: _chartKey,
        series: <CircularSeries>[
          PieSeries<ChartData, String>(
            dataSource: chartData,
            xValueMapper: (d, _) => d.x,
            yValueMapper: (d, _) => d.y,
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _exportPDF,
        child: const Icon(Icons.picture_as_pdf),
      ),
    );
  }
}
```

> The pattern is the same for both PNG and PDF: capture via `toImage`, convert to bytes, then use those bytes however you need (display, save, share, embed in PDF).
