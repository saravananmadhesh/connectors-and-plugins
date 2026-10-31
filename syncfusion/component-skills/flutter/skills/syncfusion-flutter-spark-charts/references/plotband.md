# Plot Band in Flutter Spark Charts

Plot bands highlight specific value ranges along the Y-axis, making it easy to visualize thresholds, target zones, or acceptable ranges. This guide covers plot band configuration and customization.

## Overview

Plot bands are useful for:
- Highlighting target or goal ranges
- Showing acceptable/unacceptable value zones
- Visualizing thresholds or limits
- Indicating normal operating ranges
- Marking critical levels

## Enable Plot Band

Enable plot band using the `plotBand` property with `SparkChartPlotBand`:

```dart
SfSparkLineChart(
  axisLineWidth: 0,
  plotBand: SparkChartPlotBand(
    start: 7,
    end: 8,
  ),
  data: <double>[5, 6, 5, 7, 4, 3, 9, 5, 6, 5, 7, 8, 4, 5, 3, 4, 11, 10, 2, 12, 4, 7, 6, 8],
)
```

## Basic Configuration

### Define Range

Set the Y-axis range to highlight using `start` and `end` properties:

```dart
SparkChartPlotBand(
  start: 5,     // Lower bound
  end: 10,      // Upper bound
)
```

### Basic Example

```dart
SfSparkLineChart(
  axisLineWidth: 0,
  data: <double>[5, 6, 5, 7, 4, 3, 9, 5, 6, 5, 7, 8, 4, 5, 3, 4, 11, 10, 2, 12, 4, 7, 6, 8],
  plotBand: SparkChartPlotBand(
    start: 7,
    end: 8,
    color: Colors.green.withOpacity(0.2),
  ),
)
```

---

## Plot Band Customization

### Color Customization

Set the plot band fill color using the `color` property:

```dart
SparkChartPlotBand(
  start: 5,
  end: 10,
  color: Colors.green.withOpacity(0.2),    // Semi-transparent fill
)
```

### Border Customization

Add borders to the plot band using `borderColor` and `borderWidth`:

```dart
SparkChartPlotBand(
  start: 5,
  end: 10,
  color: Colors.green.withOpacity(0.2),
  borderColor: Colors.green,
  borderWidth: 2,
)
```

### Complete Customization Example

```dart
SfSparkLineChart(
  axisLineWidth: 0,
  data: <double>[5, 6, 5, 7, 4, 3, 9, 5, 6, 5, 7, 8, 4, 5, 3, 4, 11, 10, 2, 12, 4, 7, 6, 8],
  color: Colors.blue,
  width: 2,
  plotBand: SparkChartPlotBand(
    start: 7,
    end: 9,
    color: Colors.green.withOpacity(0.2),
    borderColor: Colors.green,
    borderWidth: 1,
  ),
)
```

---

## Plot Band Use Cases

### Example 1: Target Zone

Highlight a target performance range:

```dart
SfSparkLineChart(
  axisLineWidth: 1,
  axisLineColor: Colors.grey[300],
  data: salesData,
  color: Colors.blue,
  plotBand: SparkChartPlotBand(
    start: 80,      // Target minimum
    end: 100,       // Target maximum
    color: Colors.green.withOpacity(0.15),
    borderColor: Colors.green,
    borderWidth: 1,
  ),
)
```

### Example 2: Acceptable Range

Show acceptable value range for quality metrics:

```dart
SfSparkBarChart(
  data: qualityScores,
  color: Colors.blue,
  plotBand: SparkChartPlotBand(
    start: 60,      // Minimum acceptable
    end: 100,       // Maximum acceptable
    color: Colors.green.withOpacity(0.1),
  ),
  negativePointColor: Colors.red,
)
```

### Example 3: Critical Threshold

Mark critical levels to avoid:

```dart
SfSparkAreaChart(
  data: temperatureData,
  color: Colors.orange.withOpacity(0.3),
  borderColor: Colors.orange,
  borderWidth: 2,
  plotBand: SparkChartPlotBand(
    start: 30,      // Critical high temperature start
    end: 40,        // Critical high temperature end
    color: Colors.red.withOpacity(0.2),
    borderColor: Colors.red,
    borderWidth: 2,
  ),
)
```

### Example 4: Normal Operating Range

Indicate normal operating conditions:

```dart
SfSparkLineChart(
  data: machineReadings,
  color: Colors.blue,
  highPointColor: Colors.red,
  lowPointColor: Colors.red,
  plotBand: SparkChartPlotBand(
    start: 50,      // Normal range start
    end: 75,        // Normal range end
    color: Colors.green.withOpacity(0.15),
    borderColor: Colors.green.withOpacity(0.5),
    borderWidth: 1,
  ),
  marker: SparkChartMarker(
    displayMode: SparkChartMarkerDisplayMode.high,
  ),
)
```

---

## Multiple Plot Bands Pattern

While Syncfusion Spark Charts support only one plot band per chart, you can create multiple visualizations:

### Workaround: Multiple Charts

```dart
Column(
  children: [
    // Chart 1: Low range highlighted
    Container(
      height: 60,
      child: SfSparkLineChart(
        data: data,
        plotBand: SparkChartPlotBand(
          start: 0,
          end: 5,
          color: Colors.red.withOpacity(0.2),
        ),
      ),
    ),
    // Chart 2: Medium range highlighted
    Container(
      height: 60,
      child: SfSparkLineChart(
        data: data,
        plotBand: SparkChartPlotBand(
          start: 5,
          end: 8,
          color: Colors.yellow.withOpacity(0.2),
        ),
      ),
    ),
    // Chart 3: High range highlighted
    Container(
      height: 60,
      child: SfSparkLineChart(
        data: data,
        plotBand: SparkChartPlotBand(
          start: 8,
          end: 12,
          color: Colors.green.withOpacity(0.2),
        ),
      ),
    ),
  ],
)
```

---

## Plot Band with Different Chart Types

### Line Chart with Plot Band

```dart
SfSparkLineChart(
  axisLineWidth: 0,
  data: <double>[5, 6, 5, 7, 4, 3, 9, 5, 6, 5, 7, 8],
  color: Colors.blue,
  width: 2,
  plotBand: SparkChartPlotBand(
    start: 6,
    end: 8,
    color: Colors.green.withOpacity(0.2),
    borderColor: Colors.green,
    borderWidth: 1,
  ),
)
```

### Area Chart with Plot Band

```dart
SfSparkAreaChart(
  data: <double>[34, 36, 32, 35, 40, 38, 33, 37, 34, 31, 30],
  color: Colors.blue.withOpacity(0.3),
  borderColor: Colors.blue,
  borderWidth: 2,
  plotBand: SparkChartPlotBand(
    start: 32,
    end: 36,
    color: Colors.green.withOpacity(0.15),
    borderColor: Colors.green,
    borderWidth: 1,
  ),
)
```

### Bar Chart with Plot Band

```dart
SfSparkBarChart(
  data: <double>[10, 6, 8, -5, 11, 5, -2, 7, -3, 6, 8, 10],
  color: Colors.blue,
  plotBand: SparkChartPlotBand(
    start: 0,
    end: 8,
    color: Colors.yellow.withOpacity(0.2),
    borderColor: Colors.orange,
    borderWidth: 1,
  ),
  highPointColor: Colors.green,
  lowPointColor: Colors.red,
)
```

### Win-Loss Chart with Plot Band

```dart
SfSparkWinLossChart(
  data: <double>[12, 15, -10, 13, 15, 6, -12, 17, 13, 0, 8, -10],
  color: Colors.green,
  negativePointColor: Colors.red,
  tiePointColor: Colors.grey,
  plotBand: SparkChartPlotBand(
    start: 0,
    end: 10,
    color: Colors.grey.withOpacity(0.1),
  ),
)
```

---

## Practical Examples

### Example 1: KPI with Target Range

```dart
class KPIWithTarget extends StatelessWidget {
  final String title;
  final List<double> data;
  final double targetMin;
  final double targetMax;

  const KPIWithTarget({
    required this.title,
    required this.data,
    required this.targetMin,
    required this.targetMax,
  });

  @override
  Widget build(BuildContext context) {
    final currentValue = data.last;
    final isInTarget = currentValue >= targetMin && currentValue <= targetMax;

    return Card(
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: TextStyle(fontSize: 14, color: Colors.grey)),
            SizedBox(height: 8),
            Row(
              children: [
                Text(
                  currentValue.toStringAsFixed(1),
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: isInTarget ? Colors.green : Colors.red,
                  ),
                ),
                SizedBox(width: 8),
                Icon(
                  isInTarget ? Icons.check_circle : Icons.warning,
                  color: isInTarget ? Colors.green : Colors.red,
                  size: 20,
                ),
              ],
            ),
            SizedBox(height: 12),
            Container(
              height: 50,
              child: SfSparkLineChart(
                axisLineWidth: 1,
                axisLineColor: Colors.grey[300],
                data: data,
                color: Colors.blue,
                width: 2,
                plotBand: SparkChartPlotBand(
                  start: targetMin,
                  end: targetMax,
                  color: Colors.green.withOpacity(0.15),
                  borderColor: Colors.green,
                  borderWidth: 1,
                ),
              ),
            ),
            SizedBox(height: 4),
            Text(
              'Target: $targetMin - $targetMax',
              style: TextStyle(fontSize: 11, color: Colors.grey),
            ),
          ],
        ),
      ),
    );
  }
}
```

### Example 2: Performance Monitor

```dart
class PerformanceMonitor extends StatelessWidget {
  final List<double> performanceData;

  const PerformanceMonitor({required this.performanceData});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('System Performance', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
        SizedBox(height: 8),
        Container(
          height: 80,
          child: SfSparkLineChart(
            axisLineWidth: 1,
            axisLineColor: Colors.grey[300],
            data: performanceData,
            color: Colors.blue,
            width: 2,
            highPointColor: Colors.red,
            lowPointColor: Colors.green,
            plotBand: SparkChartPlotBand(
              start: 70,      // Optimal performance zone
              end: 90,
              color: Colors.green.withOpacity(0.1),
              borderColor: Colors.green.withOpacity(0.5),
              borderWidth: 1,
            ),
            trackball: SparkChartTrackball(
              activationMode: SparkChartActivationMode.tap,
            ),
          ),
        ),
        SizedBox(height: 8),
        Row(
          children: [
            _buildLegend(Colors.green, 'Optimal (70-90%)'),
            SizedBox(width: 16),
            _buildLegend(Colors.red, 'Critical'),
          ],
        ),
      ],
    );
  }

  Widget _buildLegend(Color color, String label) {
    return Row(
      children: [
        Container(
          width: 12,
          height: 12,
          color: color.withOpacity(0.3),
          margin: EdgeInsets.only(right: 4),
        ),
        Text(label, style: TextStyle(fontSize: 11)),
      ],
    );
  }
}
```

### Example 3: Temperature Monitor with Zones

```dart
class TemperatureMonitor extends StatelessWidget {
  final List<double> temperatures;

  const TemperatureMonitor({required this.temperatures});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Temperature Monitor', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            SizedBox(height: 16),
            // Safe zone highlighted
            Text('Safe Zone (15-25°C)', style: TextStyle(fontSize: 12, color: Colors.green)),
            Container(
              height: 60,
              child: SfSparkAreaChart(
                data: temperatures,
                color: Colors.orange.withOpacity(0.3),
                borderColor: Colors.orange,
                borderWidth: 2,
                plotBand: SparkChartPlotBand(
                  start: 15,
                  end: 25,
                  color: Colors.green.withOpacity(0.15),
                  borderColor: Colors.green,
                  borderWidth: 1,
                ),
              ),
            ),
            SizedBox(height: 8),
            Text('Current: ${temperatures.last.toStringAsFixed(1)}°C', 
                style: TextStyle(fontSize: 12)),
          ],
        ),
      ),
    );
  }
}
```

---

## Plot Band Properties Summary

| Property | Type | Description | Required |
|----------|------|-------------|----------|
| `start` | double | Lower bound of Y-axis range | ✅ |
| `end` | double | Upper bound of Y-axis range | ✅ |
| `color` | Color | Fill color for plot band | ❌ |
| `borderColor` | Color | Border color | ❌ |
| `borderWidth` | double | Border width | ❌ |

## Chart Type Support

All spark chart types support plot bands:
- ✅ SfSparkLineChart
- ✅ SfSparkAreaChart
- ✅ SfSparkBarChart
- ✅ SfSparkWinLossChart

## Best Practices

1. **Use Semi-Transparent Colors** - Set opacity to 0.1-0.3 for better visibility
2. **Match Color Semantics** - Green for good, yellow for warning, red for critical
3. **Meaningful Ranges** - Choose start/end values based on actual thresholds
4. **Add Context** - Use labels or legends to explain plot band meaning
5. **Border for Emphasis** - Add borders to make ranges more visible
6. **Single Focus** - Use one plot band per chart for clarity

## Common Patterns

### Pattern 1: Target Achievement
```dart
// Highlight target zone in green
plotBand: SparkChartPlotBand(
  start: targetMin,
  end: targetMax,
  color: Colors.green.withOpacity(0.15),
  borderColor: Colors.green,
  borderWidth: 1,
)
```

### Pattern 2: Danger Zone
```dart
// Highlight critical levels in red
plotBand: SparkChartPlotBand(
  start: dangerThreshold,
  end: maxValue,
  color: Colors.red.withOpacity(0.15),
  borderColor: Colors.red,
  borderWidth: 1,
)
```

### Pattern 3: Normal Range
```dart
// Highlight normal operating range
plotBand: SparkChartPlotBand(
  start: normalMin,
  end: normalMax,
  color: Colors.blue.withOpacity(0.1),
  borderColor: Colors.blue.withOpacity(0.5),
  borderWidth: 1,
)
```

## Next Steps

- **Customization**: Learn more styling options
- **Trackball**: Add interactive tooltips
- **Markers**: Highlight specific data points
- **Special Points**: Use color-coded points with plot bands
