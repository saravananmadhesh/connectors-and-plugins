# Tooltip, Trackball & Crosshair

## Table of Contents
- [Tooltip](#tooltip)
- [Tooltip Appearance](#tooltip-appearance)
- [Tooltip Format](#tooltip-format)
- [Shared Tooltip](#shared-tooltip)
- [Custom Tooltip Template](#custom-tooltip-template)
- [Trackball](#trackball)
- [Crosshair](#crosshair)

---

## Tooltip

Tooltip shows data values when the user taps a data point. Initialize `TooltipBehavior` in `initState` — avoid creating it inline in `build` to prevent recreation on every rebuild.

```dart
late TooltipBehavior _tooltip;

@override
void initState() {
  _tooltip = TooltipBehavior(enable: true);
  super.initState();
}

@override
Widget build(BuildContext context) {
  return SfCartesianChart(
    tooltipBehavior: _tooltip,
    series: <CartesianSeries>[
      LineSeries<ChartData, String>(
        enableTooltip: true,
        dataSource: chartData,
        xValueMapper: (d, _) => d.x,
        yValueMapper: (d, _) => d.y,
      ),
    ],
  );
}
```

> `TooltipBehavior(enable: true)` enables tooltip globally for the chart. `enableTooltip: true` on a series additionally opts that series in. Both must be set for the tooltip to show.

---

## Tooltip Appearance

```dart
TooltipBehavior(
  enable: true,
  color: Colors.black87,
  borderColor: Colors.white,
  borderWidth: 1,
  textStyle: const TextStyle(color: Colors.white, fontSize: 12),
  opacity: 0.9,
  duration: 4000,          
  animationDuration: 300,  
  elevation: 4,
  canShowMarker: true,     
  shouldAlwaysShow: false, 
  header: '',              
  shadowColor: Colors.grey,
)
```

---

## Tooltip Format

Use `format` to customize the tooltip text using placeholders:

```dart
TooltipBehavior(
  enable: true,
  format: 'point.x : point.y USD',
)
```

**Examples:**
- `'point.x — point.y'` → `Jan — 35`
- `'series.name\nX: point.x\nY: point.y'` → multi-line tooltip
- `'\$point.y'` → `$35`

---

## Shared Tooltip

Show one tooltip that displays values for all series at the same x position simultaneously:

```dart
TooltipBehavior(
  enable: true,
  shared: true,
)
```

---

## Custom Tooltip Template

Replace the default tooltip with a completely custom Flutter widget:

```dart
TooltipBehavior(
  enable: true,
  builder: (dynamic data, dynamic point, dynamic series, int pointIndex, int seriesIndex) {
    final ChartData chartPoint = data as ChartData;
    return Container(
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: Colors.black87,
        borderRadius: BorderRadius.circular(6),
      ),
      child: Text(
        '${chartPoint.x}: \$${chartPoint.y}',
        style: const TextStyle(color: Colors.white, fontSize: 12),
      ),
    );
  },
)
```

---

## Trackball

The trackball displays a vertical line that snaps to the nearest data point as the user drags across the chart. It's ideal for comparing multiple series at the same x position.

```dart
late TrackballBehavior _trackball;

@override
void initState() {
  _trackball = TrackballBehavior(
    enable: true,
    activationMode: ActivationMode.singleTap,
    // Options: singleTap | doubleTap | longPress
    tooltipSettings: const InteractiveTooltip(
      enable: true,
      color: Colors.black,
      textStyle: TextStyle(color: Colors.white),
    ),
    lineType: TrackballLineType.vertical,
    // Options: vertical | none
    lineColor: Colors.grey,
    lineWidth: 1,
    lineDashArray: <double>[5, 5],
    markerSettings: const TrackballMarkerSettings(
      markerVisibility: TrackballVisibilityMode.visible,
      height: 10,
      width: 10,
    ),
    tooltipDisplayMode: TrackballDisplayMode.groupAllPoints,
    // Options: floatAllPoints | groupAllPoints | nearestPoint | none
  );
  super.initState();
}

trackballBehavior: _trackball,
```

---

## Crosshair

The crosshair draws horizontal and vertical lines at the tapped/hovered position, with axis labels showing the exact value at that coordinate.

```dart
late CrosshairBehavior _crosshair;

@override
void initState() {
  _crosshair = CrosshairBehavior(
    enable: true,
    activationMode: ActivationMode.singleTap,
    lineType: CrosshairLineType.both,
    // Options: horizontal | vertical | both | none
    lineColor: Colors.grey,
    lineWidth: 1,
    lineDashArray: <double>[5, 5],
    shouldAlwaysShow: false,
  );
  super.initState();
}

crosshairBehavior: _crosshair,
```

---

## Choosing Between Tooltip, Trackball, and Crosshair

| Need | Use |
|------|-----|
| Show value on tap of a single point | `TooltipBehavior` |
| Compare all series values at an x position | `TrackballBehavior` |
| Show exact x/y coordinates at cursor/finger | `CrosshairBehavior` |
| Show a custom overlay widget | `TooltipBehavior` with `builder` |
