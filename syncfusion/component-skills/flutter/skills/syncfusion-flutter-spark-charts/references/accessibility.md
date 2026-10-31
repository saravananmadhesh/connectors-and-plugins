# Accessibility in Flutter Spark Charts

This guide covers accessibility features and best practices for Syncfusion Flutter Spark Charts, ensuring your charts are usable by all users, including those with disabilities.

## Overview

Accessibility in spark charts involves:
- **Sufficient contrast** - Colors that meet WCAG standards
- **Large font support** - Text scaling for readability
- **Theme integration** - Support for system themes and preferences
- **Color customization** - Ability to adjust for visual needs

---

## Sufficient Contrast

Ensuring sufficient color contrast helps users with visual impairments and in various lighting conditions.

### WCAG Guidelines

- **Minimum contrast ratio**: 3:1 for large text and graphics
- **Enhanced contrast ratio**: 4.5:1 for normal text
- **High contrast**: 7:1 for optimal accessibility

### Chart Element Contrast

#### Chart Lines and Data

```dart
SfSparkLineChart(
  data: data,
  color: Colors.blue[800],      // Dark blue on light background
  width: 2,
)

SfSparkLineChart(
  data: data,
  color: Colors.blue[300],      // Light blue on dark background
  width: 2,
)
```

#### Special Point Colors

```dart
SfSparkLineChart(
  data: data,
  color: Colors.blue[700],
  highPointColor: Colors.red[700],      // High contrast red
  lowPointColor: Colors.green[700],     // High contrast green
  marker: SparkChartMarker(
    displayMode: SparkChartMarkerDisplayMode.high,
    borderColor: Colors.white,          // White border for definition
    borderWidth: 2,
  ),
)
```

#### Data Labels

```dart
SfSparkLineChart(
  data: data,
  labelDisplayMode: SparkChartLabelDisplayMode.high,
  labelStyle: TextStyle(
    color: Colors.black,                // High contrast
    fontSize: 14,
    fontWeight: FontWeight.bold,        // Improved visibility
  ),
)
```

#### Trackball Tooltips

```dart
SfSparkLineChart(
  data: data,
  trackball: SparkChartTrackball(
    backgroundColor: Colors.black87,    // Dark background
    borderColor: Colors.white,          // White border
    borderWidth: 2,
    labelStyle: TextStyle(
      color: Colors.white,              // White text on dark background
      fontSize: 12,
      fontWeight: FontWeight.w500,
    ),
    activationMode: SparkChartActivationMode.tap,
  ),
)
```

---

## Theme Support

Syncfusion Spark Charts integrate with Flutter's theming system for consistent, accessible appearance.

### Using Material Theme

```dart
class ThemedSparkChart extends StatelessWidget {
  final List<double> data;

  const ThemedSparkChart({required this.data});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final primaryColor = theme.colorScheme.primary;
    final errorColor = theme.colorScheme.error;
    final surfaceColor = theme.colorScheme.surface;

    return SfSparkLineChart(
      data: data,
      color: primaryColor,
      highPointColor: errorColor,
      axisLineColor: theme.dividerColor,
      axisLineWidth: 1,
      marker: SparkChartMarker(
        displayMode: SparkChartMarkerDisplayMode.high,
        color: errorColor,
        borderColor: surfaceColor,
        borderWidth: 2,
      ),
    );
  }
}
```

### Dark Mode Support

```dart
class AdaptiveSparkChart extends StatelessWidget {
  final List<double> data;

  const AdaptiveSparkChart({required this.data});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    return SfSparkLineChart(
      data: data,
      color: isDark ? Colors.blue[300] : Colors.blue[700],
      width: 2,
      highPointColor: isDark ? Colors.red[300] : Colors.red[700],
      lowPointColor: isDark ? Colors.green[300] : Colors.green[700],
      axisLineWidth: 1,
      axisLineColor: isDark ? Colors.grey[700] : Colors.grey[300],
      marker: SparkChartMarker(
        displayMode: SparkChartMarkerDisplayMode.high,
        borderColor: isDark ? Colors.grey[900] : Colors.white,
        borderWidth: 2,
      ),
      trackball: SparkChartTrackball(
        backgroundColor: isDark ? Colors.grey[800] : Colors.grey[900],
        borderColor: isDark ? Colors.grey[600] : Colors.white,
        borderWidth: 2,
        labelStyle: TextStyle(
          color: isDark ? Colors.grey[100] : Colors.white,
        ),
        activationMode: SparkChartActivationMode.tap,
      ),
    );
  }
}
```

### High Contrast Mode

```dart
class HighContrastSparkChart extends StatelessWidget {
  final List<double> data;

  const HighContrastSparkChart({required this.data});

  @override
  Widget build(BuildContext context) {
    // Use high contrast colors
    return SfSparkLineChart(
      data: data,
      color: Colors.black,
      width: 3,
      highPointColor: Colors.red[900],
      lowPointColor: Colors.green[900],
      axisLineWidth: 2,
      axisLineColor: Colors.black,
      marker: SparkChartMarker(
        displayMode: SparkChartMarkerDisplayMode.all,
        color: Colors.black,
        borderColor: Colors.white,
        borderWidth: 3,
      ),
    );
  }
}
```

---

## Large Font Support

Spark charts automatically scale with Flutter's text scaling settings.

### Text Scaling with MediaQuery

```dart
class ScalableSparkChart extends StatelessWidget {
  final List<double> data;

  const ScalableSparkChart({required this.data});

  @override
  Widget build(BuildContext context) {
    final textScaleFactor = MediaQuery.of(context).textScaleFactor;
    
    return SfSparkLineChart(
      data: data,
      labelDisplayMode: SparkChartLabelDisplayMode.high,
      labelStyle: TextStyle(
        fontSize: 12 * textScaleFactor,      // Scales with system settings
        fontWeight: FontWeight.bold,
      ),
      trackball: SparkChartTrackball(
        labelStyle: TextStyle(
          fontSize: 12 * textScaleFactor,    // Scales with system settings
        ),
        activationMode: SparkChartActivationMode.tap,
      ),
    );
  }
}
```

### Responsive Font Sizes

```dart
class ResponsiveFontSparkChart extends StatelessWidget {
  final List<double> data;

  const ResponsiveFontSparkChart({required this.data});

  double _getScaledFontSize(BuildContext context, double baseSize) {
    final textScaleFactor = MediaQuery.of(context).textScaleFactor;
    // Limit scaling to prevent overflow
    final clampedScale = textScaleFactor.clamp(1.0, 1.5);
    return baseSize * clampedScale;
  }

  @override
  Widget build(BuildContext context) {
    return SfSparkLineChart(
      data: data,
      labelDisplayMode: SparkChartLabelDisplayMode.high,
      labelStyle: TextStyle(
        fontSize: _getScaledFontSize(context, 12),
        fontWeight: FontWeight.w600,
      ),
      trackball: SparkChartTrackball(
        labelStyle: TextStyle(
          fontSize: _getScaledFontSize(context, 12),
        ),
        activationMode: SparkChartActivationMode.tap,
      ),
    );
  }
}
```

---

## Color Customization for Accessibility

### Customizable Color Palette

```dart
class AccessibleSparkChart extends StatelessWidget {
  final List<double> data;
  final Color primaryColor;
  final Color highColor;
  final Color lowColor;

  const AccessibleSparkChart({
    required this.data,
    this.primaryColor = Colors.blue,
    this.highColor = Colors.red,
    this.lowColor = Colors.green,
  });

  @override
  Widget build(BuildContext context) {
    return SfSparkLineChart(
      data: data,
      color: primaryColor,
      width: 2,
      highPointColor: highColor,
      lowPointColor: lowColor,
      marker: SparkChartMarker(
        displayMode: SparkChartMarkerDisplayMode.high,
        borderWidth: 2,
        borderColor: Colors.white,
      ),
      trackball: SparkChartTrackball(
        backgroundColor: primaryColor,
        borderColor: primaryColor,
        borderWidth: 2,
        color: primaryColor,
        labelStyle: TextStyle(color: Colors.white),
        activationMode: SparkChartActivationMode.tap,
      ),
    );
  }
}

// Usage with custom colors
AccessibleSparkChart(
  data: data,
  primaryColor: Colors.indigo[700]!,
  highColor: Colors.orange[700]!,
  lowColor: Colors.teal[700]!,
)
```

### Color-Blind Friendly Palettes

```dart
class ColorBlindFriendlyChart extends StatelessWidget {
  final List<double> data;

  const ColorBlindFriendlyChart({required this.data});

  @override
  Widget build(BuildContext context) {
    // Color-blind friendly colors (blue-orange palette)
    return SfSparkLineChart(
      data: data,
      color: Color(0xFF0173B2),           // Blue
      width: 2,
      highPointColor: Color(0xFFDE8F05),  // Orange
      lowPointColor: Color(0xFF029E73),   // Teal
      firstPointColor: Color(0xFFCC78BC), // Purple
      lastPointColor: Color(0xFFCC78BC),  // Purple
      marker: SparkChartMarker(
        displayMode: SparkChartMarkerDisplayMode.all,
        borderWidth: 2,
        borderColor: Colors.white,
      ),
    );
  }
}
```

---

## Accessibility Best Practices

### 1. Provide Multiple Visual Cues

Don't rely solely on color:

```dart
// ✅ Good - uses color, markers, and labels
SfSparkLineChart(
  data: data,
  color: Colors.blue,
  highPointColor: Colors.red,
  lowPointColor: Colors.green,
  labelDisplayMode: SparkChartLabelDisplayMode.high,  // Labels
  marker: SparkChartMarker(                           // Markers
    displayMode: SparkChartMarkerDisplayMode.high,
    shape: SparkChartMarkerShape.circle,
  ),
)

// ❌ Avoid - relies only on color
SfSparkLineChart(
  data: data,
  highPointColor: Colors.red,
  lowPointColor: Colors.green,
)
```

### 2. Ensure Touch Target Size

Make interactive elements large enough:

```dart
// ✅ Good - chart has adequate height for touch
Container(
  height: 80,      // Minimum 44-48px for touch targets
  child: SfSparkLineChart(
    data: data,
    trackball: SparkChartTrackball(
      activationMode: SparkChartActivationMode.tap,
    ),
  ),
)
```

### 3. Use Semantic Labels

Provide context for screen readers:

```dart
Semantics(
  label: 'Sales trend chart showing upward trend',
  child: SfSparkLineChart(
    data: salesData,
    color: Colors.blue,
  ),
)
```

### 4. Include Alternative Text

```dart
class AccessibleChartCard extends StatelessWidget {
  final String title;
  final List<double> data;
  final String description;

  const AccessibleChartCard({
    required this.title,
    required this.data,
    required this.description,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: TextStyle(fontWeight: FontWeight.bold)),
            SizedBox(height: 8),
            Semantics(
              label: description,
              child: Container(
                height: 60,
                child: SfSparkLineChart(data: data),
              ),
            ),
            SizedBox(height: 8),
            Text(
              description,
              style: TextStyle(fontSize: 12, color: Colors.grey),
            ),
          ],
        ),
      ),
    );
  }
}

// Usage
AccessibleChartCard(
  title: 'Monthly Revenue',
  data: revenueData,
  description: 'Revenue increased from 50K to 75K over 12 months',
)
```

---

## Testing Accessibility

### Test with Different Text Scales

```dart
// Test your charts with different text scales
MaterialApp(
  builder: (context, child) {
    return MediaQuery(
      data: MediaQuery.of(context).copyWith(
        textScaleFactor: 1.5,  // Test with 150% scale
      ),
      child: child!,
    );
  },
  home: MyHomePage(),
)
```

### Test Dark Mode

```dart
// Test charts in dark mode
MaterialApp(
  theme: ThemeData.light(),
  darkTheme: ThemeData.dark(),
  themeMode: ThemeMode.dark,  // Force dark mode for testing
  home: MyHomePage(),
)
```

### Test Color Contrast

Use tools like:
- Chrome DevTools Accessibility Panel
- WCAG Color Contrast Checker
- Color Oracle (color blindness simulator)

---

## Accessibility Checklist

- [ ] Colors have sufficient contrast (minimum 3:1)
- [ ] Charts work in both light and dark themes
- [ ] Text scales with system font size settings
- [ ] Interactive elements have adequate touch target size (48px minimum)
- [ ] Semantic labels provided for screen readers
- [ ] Alternative text descriptions available
- [ ] Multiple visual cues used (not just color)
- [ ] Color-blind friendly palette considered
- [ ] Tested with text scaling at 150-200%
- [ ] Tested in high contrast mode
- [ ] Works without relying solely on color

---

## Resources

### WCAG Guidelines
- [WCAG 2.1 - Use of Color](https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html)
- [WCAG 2.1 - Contrast](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [WCAG 2.1 - Text Spacing](https://www.w3.org/WAI/WCAG21/Understanding/text-spacing.html)

### Flutter Accessibility
- [Flutter Accessibility Documentation](https://docs.flutter.dev/development/accessibility-and-localization/accessibility)
- [Flutter Semantics Widget](https://api.flutter.dev/flutter/widgets/Semantics-class.html)

### Color Tools
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Color Oracle](https://colororacle.org/) - Color blindness simulator
- [Coolors Contrast Checker](https://coolors.co/contrast-checker)

## Next Steps

- **Customization**: Learn more styling options
- **Theme Integration**: Implement comprehensive theming
- **Trackball**: Enable interactive data access
- **Data Labels**: Add readable value displays
