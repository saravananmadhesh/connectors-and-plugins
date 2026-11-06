# Trackball in Flutter Spark Charts

The trackball feature displays interactive tooltips showing data point information when users touch or interact with the chart area. This guide covers trackball configuration, activation modes, and customization.

## Overview

Trackball is especially useful for:
- Displaying precise values without data labels
- Interactive data exploration
- Touch-based data point inspection
- Responsive mobile interfaces
- Space-constrained visualizations

## Enable Trackball

Enable trackball using the `trackball` property with `SparkChartTrackball`:

```dart
SfSparkLineChart(
  axisLineWidth: 0,
  trackball: SparkChartTrackball(
    activationMode: SparkChartActivationMode.tap,
  ),
  data: <double>[5, 6, 5, 7, 4, 3, 9, 5, 6, 5, 7, 8, 4, 5, 3, 4, 11, 10, 2, 12, 4, 7, 6, 8],
)
```

## Activation Modes

Control how users activate the trackball using `activationMode`:

### Tap Activation (Default)

Activate trackball with a single tap:

```dart
SparkChartTrackball(
  activationMode: SparkChartActivationMode.tap,
)
```

### Double Tap Activation

Activate trackball with a double tap:

```dart
SparkChartTrackball(
  activationMode: SparkChartActivationMode.doubleTap,
)
```

### Long Press Activation

Activate trackball with a long press:

```dart
SparkChartTrackball(
  activationMode: SparkChartActivationMode.longPress,
)
```

### Activation Mode Comparison

```dart
// Quick interaction - best for dashboards
SfSparkLineChart(
  trackball: SparkChartTrackball(
    activationMode: SparkChartActivationMode.tap,
  ),
  data: chartData,
)

// Prevents accidental activation
SfSparkLineChart(
  trackball: SparkChartTrackball(
    activationMode: SparkChartActivationMode.doubleTap,
  ),
  data: chartData,
)

// Deliberate interaction
SfSparkLineChart(
  trackball: SparkChartTrackball(
    activationMode: SparkChartActivationMode.longPress,
  ),
  data: chartData,
)
```

---

## Trackball Customization

### Basic Styling

Customize trackball appearance with color properties:

```dart
SfSparkLineChart(
  axisLineWidth: 0,
  trackball: SparkChartTrackball(
    backgroundColor: Colors.blue,         // Tooltip background
    borderColor: Colors.blue,             // Tooltip border
    borderWidth: 2,                       // Tooltip border width
    color: Colors.blue,                   // Trackball line color
    activationMode: SparkChartActivationMode.tap,
  ),
  data: <double>[5, 6, 5, 7, 4, 3, 9, 5, 6, 5, 7, 8],
)
```

### Complete Customization

```dart
SfSparkLineChart(
  axisLineWidth: 0,
  trackball: SparkChartTrackball(
    // Tooltip styling
    backgroundColor: Colors.red.withOpacity(0.8),
    borderColor: Colors.red.withOpacity(0.8),
    borderWidth: 2,
    
    // Trackball line styling
    color: Colors.red,
    width: 2,
    
    // Label styling
    labelStyle: TextStyle(
      color: Colors.white,
      fontSize: 12,
      fontWeight: FontWeight.bold,
    ),
    
    // Activation
    activationMode: SparkChartActivationMode.tap,
  ),
  marker: SparkChartMarker(
    displayMode: SparkChartMarkerDisplayMode.all,
  ),
  data: <double>[5, 6, 5, 7, 4, 3, 9, 5, 6, 5, 7, 8, 4, 5, 3, 4, 11, 10, 2, 12, 4, 7, 6, 8],
)
```

---

## Trackball Properties

### Tooltip Properties

Control the tooltip (info box) appearance:

```dart
SparkChartTrackball(
  backgroundColor: Colors.black87,    // Tooltip background color
  borderColor: Colors.white,          // Tooltip border color
  borderWidth: 1,                     // Tooltip border width
  labelStyle: TextStyle(              // Tooltip text style
    color: Colors.white,
    fontSize: 12,
  ),
)
```

### Trackball Line Properties

Control the vertical line appearance:

```dart
SparkChartTrackball(
  color: Colors.blue,                 // Line color
  width: 1,                           // Line width
)
```

### Complete Property Example

```dart
SparkChartTrackball(
  // Activation
  activationMode: SparkChartActivationMode.tap,
  
  // Tooltip appearance
  backgroundColor: Colors.blue.withOpacity(0.9),
  borderColor: Colors.blue,
  borderWidth: 2,
  
  // Trackball line
  color: Colors.blue,
  width: 2,
  
  // Label styling
  labelStyle: TextStyle(
    color: Colors.white,
    fontSize: 11,
    fontWeight: FontWeight.w500,
  ),
)
```

---

## Trackball with Different Chart Types

### Line Chart with Trackball

```dart
SfSparkLineChart(
  axisLineWidth: 0,
  trackball: SparkChartTrackball(
    backgroundColor: Colors.blue,
    borderColor: Colors.blue,
    borderWidth: 2,
    color: Colors.blue,
    labelStyle: TextStyle(color: Colors.white),
    activationMode: SparkChartActivationMode.tap,
  ),
  marker: SparkChartMarker(
    displayMode: SparkChartMarkerDisplayMode.all,
  ),
  data: <double>[5, 6, 5, 7, 4, 3, 9, 5, 6, 5, 7, 8],
)
```

### Area Chart with Trackball

```dart
SfSparkAreaChart(
  trackball: SparkChartTrackball(
    backgroundColor: Colors.green.withOpacity(0.8),
    borderColor: Colors.green,
    borderWidth: 2,
    color: Colors.green,
    activationMode: SparkChartActivationMode.tap,
  ),
  data: <double>[34, 36, 32, 35, 40, 38, 33, 37, 34, 31, 30],
  color: Colors.green.withOpacity(0.3),
  borderColor: Colors.green,
  borderWidth: 2,
)
```

### Bar Chart with Trackball

```dart
SfSparkBarChart(
  trackball: SparkChartTrackball(
    backgroundColor: Colors.orange,
    borderColor: Colors.orange,
    borderWidth: 2,
    color: Colors.orange,
    labelStyle: TextStyle(color: Colors.white),
    activationMode: SparkChartActivationMode.tap,
  ),
  data: <double>[10, 6, 8, -5, 11, 5, -2, 7, -3, 6, 8, 10],
  highPointColor: Colors.red,
  lowPointColor: Colors.green,
)
```

### Win-Loss Chart with Trackball

```dart
SfSparkWinLossChart(
  trackball: SparkChartTrackball(
    backgroundColor: Colors.purple,
    borderColor: Colors.purple,
    borderWidth: 2,
    color: Colors.purple,
    activationMode: SparkChartActivationMode.tap,
  ),
  data: <double>[12, 15, -10, 13, 15, 6, -12, 17, 13, 0, 8, -10],
  color: Colors.green,
  negativePointColor: Colors.red,
  tiePointColor: Colors.grey,
)
```

---

## Practical Examples

### Example 1: Dashboard KPI with Trackball

```dart
class InteractiveKPICard extends StatelessWidget {
  final String title;
  final List<double> data;

  const InteractiveKPICard({
    required this.title,
    required this.data,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 16),
            Container(
              height: 80,
              child: SfSparkLineChart(
                axisLineWidth: 0,
                data: data,
                color: Colors.blue,
                width: 2,
                trackball: SparkChartTrackball(
                  backgroundColor: Colors.blue,
                  borderColor: Colors.blue,
                  borderWidth: 2,
                  color: Colors.blue,
                  labelStyle: TextStyle(
                    color: Colors.white,
                    fontSize: 12,
                  ),
                  activationMode: SparkChartActivationMode.tap,
                ),
                marker: SparkChartMarker(
                  displayMode: SparkChartMarkerDisplayMode.all,
                  color: Colors.blue,
                  borderColor: Colors.white,
                  borderWidth: 2,
                ),
              ),
            ),
            SizedBox(height: 8),
            Text(
              'Tap chart to view values',
              style: TextStyle(
                fontSize: 11,
                color: Colors.grey,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

### Example 2: Comparison Chart with Trackball

```dart
class ComparisonChart extends StatelessWidget {
  final String label1;
  final String label2;
  final List<double> data1;
  final List<double> data2;

  const ComparisonChart({
    required this.label1,
    required this.label2,
    required this.data1,
    required this.data2,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // First chart
        Row(
          children: [
            SizedBox(
              width: 100,
              child: Text(label1),
            ),
            Expanded(
              child: Container(
                height: 50,
                child: SfSparkLineChart(
                  axisLineWidth: 0,
                  data: data1,
                  color: Colors.blue,
                  trackball: SparkChartTrackball(
                    backgroundColor: Colors.blue,
                    color: Colors.blue,
                    activationMode: SparkChartActivationMode.tap,
                  ),
                ),
              ),
            ),
          ],
        ),
        SizedBox(height: 8),
        // Second chart
        Row(
          children: [
            SizedBox(
              width: 100,
              child: Text(label2),
            ),
            Expanded(
              child: Container(
                height: 50,
                child: SfSparkLineChart(
                  axisLineWidth: 0,
                  data: data2,
                  color: Colors.green,
                  trackball: SparkChartTrackball(
                    backgroundColor: Colors.green,
                    color: Colors.green,
                    activationMode: SparkChartActivationMode.tap,
                  ),
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}
```

### Example 3: Themed Trackball

```dart
class ThemedTrackballChart extends StatelessWidget {
  final List<double> data;
  final Color themeColor;

  const ThemedTrackballChart({
    required this.data,
    this.themeColor = Colors.blue,
  });

  @override
  Widget build(BuildContext context) {
    return SfSparkLineChart(
      axisLineWidth: 0,
      data: data,
      color: themeColor,
      width: 3,
      highPointColor: themeColor.withOpacity(0.7),
      trackball: SparkChartTrackball(
        backgroundColor: themeColor.withOpacity(0.9),
        borderColor: themeColor,
        borderWidth: 2,
        color: themeColor,
        width: 2,
        labelStyle: TextStyle(
          color: Colors.white,
          fontSize: 12,
          fontWeight: FontWeight.bold,
        ),
        activationMode: SparkChartActivationMode.tap,
      ),
      marker: SparkChartMarker(
        displayMode: SparkChartMarkerDisplayMode.high,
        color: themeColor,
        borderColor: Colors.white,
        borderWidth: 2,
        shape: SparkChartMarkerShape.circle,
      ),
    );
  }
}

// Usage
ThemedTrackballChart(
  data: salesData,
  themeColor: Colors.purple,
)
```

---

## Trackball Behavior

### How Trackball Works

1. User touches/taps the chart area
2. Trackball finds the nearest data point
3. Vertical line appears at the data point
4. Tooltip displays the data point value
5. Trackball follows finger movement
6. Trackball disappears when touch ends

### Touch Interaction

```dart
// Trackball appears on touch and follows movement
SfSparkLineChart(
  trackball: SparkChartTrackball(
    activationMode: SparkChartActivationMode.tap,
  ),
  data: data,
)
```

---

## Trackball Properties Summary

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `activationMode` | SparkChartActivationMode | How to activate | tap |
| `backgroundColor` | Color | Tooltip background color | null |
| `borderColor` | Color | Tooltip border color | null |
| `borderWidth` | double | Tooltip border width | 0 |
| `color` | Color | Trackball line color | null |
| `width` | double | Trackball line width | 1 |
| `labelStyle` | TextStyle | Tooltip text style | null |

## Activation Modes

| Mode | User Action | Best For |
|------|-------------|----------|
| `tap` | Single tap | Quick interaction |
| `doubleTap` | Double tap | Prevent accidental activation |
| `longPress` | Long press | Deliberate interaction |

## Chart Type Support

All spark chart types support trackball:
- ✅ SfSparkLineChart
- ✅ SfSparkAreaChart
- ✅ SfSparkBarChart
- ✅ SfSparkWinLossChart

## Best Practices

1. **Choose Appropriate Activation** - Use tap for quick access, double-tap or long-press to prevent accidental activation
2. **Maintain Color Consistency** - Match trackball colors with chart theme
3. **Readable Labels** - Ensure good contrast between label text and background
4. **Test on Devices** - Verify touch interaction on actual devices
5. **Consider Space** - Ensure tooltip doesn't overflow container
6. **Combine with Markers** - Use markers to indicate data points clearly

## Common Issues and Solutions

### Issue: Trackball not appearing
```dart
// ✅ Solution: Ensure activationMode is set
SparkChartTrackball(
  activationMode: SparkChartActivationMode.tap,
)
```

### Issue: Trackball too sensitive
```dart
// ✅ Solution: Use doubleTap or longPress
SparkChartTrackball(
  activationMode: SparkChartActivationMode.doubleTap,
)
```

### Issue: Label text not visible
```dart
// ✅ Solution: Set contrasting label color
SparkChartTrackball(
  backgroundColor: Colors.black87,
  labelStyle: TextStyle(color: Colors.white),
)
```

## Next Steps

- **Markers**: Combine trackball with markers for enhanced visualization
- **Data Labels**: Learn about static data labels
- **Customization**: Explore more styling options
- **Plot Bands**: Add threshold indicators to charts
