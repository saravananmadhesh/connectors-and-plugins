# Range Controller

This guide covers the `RangeController`, which is **exclusive to `SfRangeSelector`** and allows programmatic control and deferred updates.

**Important**: `RangeController` is **NOT available** for `SfSlider` or `SfRangeSlider`. Those widgets use direct value/values properties with `onChanged` callbacks.

## Table of Contents
- [Understanding RangeController](#understanding-rangecontroller)
- [When to Use RangeController](#when-to-use-rangecontroller)
- [Creating a RangeController](#creating-a-rangecontroller)
- [Deferred Updates](#deferred-updates)
- [Programmatic Control](#programmatic-control)
- [Listening to Changes](#listening-to-changes)
- [Chart Integration with Controller](#chart-integration-with-controller)
- [Controller vs initialValues](#controller-vs-initialvalues)

## Understanding RangeController

`RangeController` provides:
1. **Deferred updates**: Changes don't apply immediately—useful for expensive operations
2. **Programmatic control**: Update range from code (buttons, timers, etc.)
3. **Change notifications**: Listen to range changes via `addListener()`

### Basic Concept

```dart
// Without controller (immediate updates)
SfRangeSelector(
  initialValues: SfRangeValues(20.0, 80.0),  // Set once
  onChanged: (values) { /* called on every drag */ },
  child: Container(/* child */),
)

// With controller (deferred updates + programmatic control)
final controller = RangeController(start: 20.0, end: 80.0);
SfRangeSelector(
  controller: controller,  // Control programmatically
  onChanged: (values) { /* optional, for live feedback */ },
  child: Container(/* child */),
)
```

## When to Use RangeController

Use `RangeController` when you need:

| Scenario | Reason |
|----------|--------|
| **Expensive operations on range change** | Defer updates until user finishes dragging |
| **Chart re-rendering on every drag is slow** | Update chart only when dragging stops |
| **Programmatic range updates** | Change range from buttons, API responses, timers |
| **Need to listen to range changes** | React to changes from multiple sources |
| **Complex state management** | Integrate with state management solutions |
| **"Apply" button pattern** | User previews, then commits changes |

**Don't use** when:
- Simple `initialValues` + `onChanged` is sufficient
- Immediate updates are desired and performant
- No need for programmatic control

## Creating a RangeController

### Basic Creation

```dart
class ControllerExample extends StatefulWidget {
  @override
  _ControllerExampleState createState() => _ControllerExampleState();
}

class _ControllerExampleState extends State<ControllerExample> {
  late RangeController _controller;

  @override
  void initState() {
    super.initState();
    _controller = RangeController(
      start: 30.0,
      end: 70.0,
    );
  }

  @override
  Widget build(BuildContext context) {
    return SfRangeSelector(
      min: 0.0,
      max: 100.0,
      controller: _controller,
      interval: 20,
      showLabels: true,
      child: Container(
        height: 120,
        child: SfCartesianChart(/* chart */),
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();  // Important: dispose controller
    super.dispose();
  }
}
```

### Controller with Date Values

```dart
class DateRangeController extends StatefulWidget {
  @override
  _DateRangeControllerState createState() => _DateRangeControllerState();
}

class _DateRangeControllerState extends State<DateRangeController> {
  late RangeController _controller;

  @override
  void initState() {
    super.initState();
    _controller = RangeController(
      start: DateTime(2024, 03, 01),
      end: DateTime(2024, 09, 01),
    );
  }

  @override
  Widget build(BuildContext context) {
    return SfRangeSelector(
      min: DateTime(2024, 01, 01),
      max: DateTime(2024, 12, 31),
      controller: _controller,
      dateFormat: DateFormat.yMMM(),
      dateIntervalType: DateIntervalType.months,
      interval: 2,
      showLabels: true,
      enableTooltip: true,
      child: Container(
        height: 130,
        child: SfCartesianChart(/* time series chart */),
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}
```

## Deferred Updates

Deferred updates mean changes aren't immediately applied—useful when the child widget (e.g., chart) is expensive to update.

### Problem Without Controller

```dart
// Chart re-renders on EVERY drag movement (can be janky)
SfRangeSelector(
  initialValues: SfRangeValues(20.0, 80.0),
  onChanged: (SfRangeValues values) {
    // This fires continuously during drag
    print('Values: ${values.start} - ${values.end}');
    // If this triggers expensive operations, UI can lag
  },
  child: Container(
    height: 150,
    child: SfCartesianChart(/* re-renders on every call */),
  ),
)
```

### Solution With Controller (Deferred)

```dart
class DeferredUpdatesExample extends StatefulWidget {
  @override
  _DeferredUpdatesExampleState createState() => _DeferredUpdatesExampleState();
}

class _DeferredUpdatesExampleState extends State<DeferredUpdatesExample> {
  late RangeController _controller;
  late List<ChartData> _chartData;

  @override
  void initState() {
    super.initState();
    _controller = RangeController(start: 20.0, end: 80.0);
    _chartData = getFullChartData();
    
    // Listen to controller changes (fires when user finishes dragging)
    _controller.addListener(() {
      setState(() {
        // Update chart only when dragging stops
        _chartData = getFilteredChartData(_controller.start, _controller.end);
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return SfRangeSelector(
      min: 0.0,
      max: 100.0,
      controller: _controller,
      interval: 20,
      showLabels: true,
      enableTooltip: true,
      child: Container(
        height: 150,
        child: SfCartesianChart(
          primaryXAxis: NumericAxis(minimum: 0, maximum: 100),
          series: <ChartSeries>[
            ColumnSeries<ChartData, num>(
              dataSource: _chartData,  // Updates only when dragging stops
              xValueMapper: (ChartData data, _) => data.x,
              yValueMapper: (ChartData data, _) => data.y,
            ),
          ],
        ),
      ),
    );
  }

  List<ChartData> getFullChartData() {
    // Return full dataset
    return List.generate(100, (i) => ChartData(i.toDouble(), i * 2));
  }

  List<ChartData> getFilteredChartData(dynamic start, dynamic end) {
    // Filter data based on range
    return getFullChartData().where((data) {
      return data.x >= start && data.x <= end;
    }).toList();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}

class ChartData {
  ChartData(this.x, this.y);
  final double x;
  final double y;
}
```

### How Deferred Updates Work

1. User starts dragging → thumb moves, tooltip shows
2. User continues dragging → thumb follows, tooltip updates
3. User releases drag → `controller.addListener()` callback fires
4. Your code reacts → expensive operations execute once

## Programmatic Control

Update the range from code, not just user interaction.

### Update Range from Buttons

```dart
class ProgrammaticControlExample extends StatefulWidget {
  @override
  _ProgrammaticControlExampleState createState() => _ProgrammaticControlExampleState();
}

class _ProgrammaticControlExampleState extends State<ProgrammaticControlExample> {
  late RangeController _controller;

  @override
  void initState() {
    super.initState();
    _controller = RangeController(start: 30.0, end: 70.0);
  }

  void _setLastQuarter() {
    setState(() {
      _controller.start = 75.0;
      _controller.end = 100.0;
    });
  }

  void _setFirstHalf() {
    setState(() {
      _controller.start = 0.0;
      _controller.end = 50.0;
    });
  }

  void _reset() {
    setState(() {
      _controller.start = 30.0;
      _controller.end = 70.0;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SfRangeSelector(
          min: 0.0,
          max: 100.0,
          controller: _controller,
          interval: 25,
          showLabels: true,
          enableTooltip: true,
          child: Container(
            height: 120,
            child: SfCartesianChart(/* chart */),
          ),
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            ElevatedButton(
              onPressed: _setFirstHalf,
              child: Text('First Half'),
            ),
            ElevatedButton(
              onPressed: _setLastQuarter,
              child: Text('Last Quarter'),
            ),
            ElevatedButton(
              onPressed: _reset,
              child: Text('Reset'),
            ),
          ],
        ),
      ],
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}
```

### Animate Range Changes

```dart
class AnimatedRangeController extends StatefulWidget {
  @override
  _AnimatedRangeControllerState createState() => _AnimatedRangeControllerState();
}

class _AnimatedRangeControllerState extends State<AnimatedRangeController>
    with SingleTickerProviderStateMixin {
  late RangeController _controller;
  late AnimationController _animationController;
  late Animation<double> _startAnimation;
  late Animation<double> _endAnimation;

  @override
  void initState() {
    super.initState();
    _controller = RangeController(start: 30.0, end: 70.0);
    
    _animationController = AnimationController(
      duration: Duration(milliseconds: 800),
      vsync: this,
    );

    _startAnimation = Tween<double>(begin: 30.0, end: 10.0).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.easeInOut),
    )..addListener(() {
      setState(() {
        _controller.start = _startAnimation.value;
      });
    });

    _endAnimation = Tween<double>(begin: 70.0, end: 90.0).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.easeInOut),
    )..addListener(() {
      setState(() {
        _controller.end = _endAnimation.value;
      });
    });
  }

  void _animateExpand() {
    _animationController.forward();
  }

  void _animateContract() {
    _animationController.reverse();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SfRangeSelector(
          min: 0.0,
          max: 100.0,
          controller: _controller,
          interval: 20,
          showLabels: true,
          enableTooltip: true,
          child: Container(
            height: 120,
            child: SfCartesianChart(/* chart */),
          ),
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: _animateExpand,
              child: Text('Expand'),
            ),
            SizedBox(width: 10),
            ElevatedButton(
              onPressed: _animateContract,
              child: Text('Contract'),
            ),
          ],
        ),
      ],
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    _animationController.dispose();
    super.dispose();
  }
}
```

## Listening to Changes

React to range changes from any source (user drag, programmatic update, etc.).

### Add Listener

```dart
class ListenerExample extends StatefulWidget {
  @override
  _ListenerExampleState createState() => _ListenerExampleState();
}

class _ListenerExampleState extends State<ListenerExample> {
  late RangeController _controller;
  String _rangeText = '30.0 - 70.0';

  @override
  void initState() {
    super.initState();
    _controller = RangeController(start: 30.0, end: 70.0);
    
    // Listen to all changes
    _controller.addListener(_onRangeChanged);
  }

  void _onRangeChanged() {
    setState(() {
      _rangeText = '${_controller.start.toStringAsFixed(1)} - ${_controller.end.toStringAsFixed(1)}';
    });
    print('Range changed: $_rangeText');
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          'Current Range: $_rangeText',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        SfRangeSelector(
          min: 0.0,
          max: 100.0,
          controller: _controller,
          interval: 20,
          showLabels: true,
          enableTooltip: true,
          child: Container(
            height: 120,
            child: SfCartesianChart(/* chart */),
          ),
        ),
        ElevatedButton(
          onPressed: () {
            setState(() {
              _controller.start = 10.0;
              _controller.end = 90.0;
            });
          },
          child: Text('Set 10-90'),
        ),
      ],
    );
  }

  @override
  void dispose() {
    _controller.removeListener(_onRangeChanged);  // Clean up
    _controller.dispose();
    super.dispose();
  }
}
```

### Multiple Listeners

```dart
@override
void initState() {
  super.initState();
  _controller = RangeController(start: 20.0, end: 80.0);
  
  // Listener 1: Update chart
  _controller.addListener(_updateChart);
  
  // Listener 2: Log to analytics
  _controller.addListener(_logAnalytics);
  
  // Listener 3: Validate range
  _controller.addListener(_validateRange);
}

void _updateChart() {
  setState(() {
    _chartData = getFilteredData(_controller.start, _controller.end);
  });
}

void _logAnalytics() {
  print('Analytics: Range updated to ${_controller.start}-${_controller.end}');
}

void _validateRange() {
  double rangeWidth = _controller.end - _controller.start;
  if (rangeWidth < 10) {
    print('Warning: Range too narrow');
  }
}

@override
void dispose() {
  _controller.removeListener(_updateChart);
  _controller.removeListener(_logAnalytics);
  _controller.removeListener(_validateRange);
  _controller.dispose();
  super.dispose();
}
```

## Chart Integration with Controller

Optimize chart rendering by updating only when necessary.

### Stock Chart with Date Range

```dart
class StockChartSelector extends StatefulWidget {
  @override
  _StockChartSelectorState createState() => _StockChartSelectorState();
}

class _StockChartSelectorState extends State<StockChartSelector> {
  late RangeController _controller;
  late List<StockData> _displayedData;
  final List<StockData> _fullData = getStockData();  // All data

  @override
  void initState() {
    super.initState();
    DateTime start = DateTime(2024, 03, 01);
    DateTime end = DateTime(2024, 09, 01);
    
    _controller = RangeController(start: start, end: end);
    _displayedData = _filterData(start, end);
    
    _controller.addListener(() {
      setState(() {
        _displayedData = _filterData(_controller.start, _controller.end);
      });
    });
  }

  List<StockData> _filterData(dynamic start, dynamic end) {
    DateTime startDate = start as DateTime;
    DateTime endDate = end as DateTime;
    return _fullData.where((data) {
      return data.date.isAfter(startDate) && data.date.isBefore(endDate);
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Stock Price Range'),
        SizedBox(height: 10),
        // Main chart (only displayed data)
        Container(
          height: 200,
          child: SfCartesianChart(
            primaryXAxis: DateTimeAxis(
              dateFormat: DateFormat.MMMd(),
            ),
            series: <ChartSeries>[
              LineSeries<StockData, DateTime>(
                dataSource: _displayedData,  // Filtered data
                xValueMapper: (StockData data, _) => data.date,
                yValueMapper: (StockData data, _) => data.price,
              ),
            ],
          ),
        ),
        SizedBox(height: 20),
        // Range selector (full data)
        SfRangeSelector(
          min: DateTime(2024, 01, 01),
          max: DateTime(2024, 12, 31),
          controller: _controller,
          dateFormat: DateFormat.yMMM(),
          dateIntervalType: DateIntervalType.months,
          interval: 2,
          showLabels: true,
          enableTooltip: true,
          child: Container(
            height: 100,
            child: SfCartesianChart(
              primaryXAxis: DateTimeAxis(),
              series: <ChartSeries>[
                LineSeries<StockData, DateTime>(
                  dataSource: _fullData,  // Full data for overview
                  xValueMapper: (StockData data, _) => data.date,
                  yValueMapper: (StockData data, _) => data.price,
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}

class StockData {
  StockData(this.date, this.price);
  final DateTime date;
  final double price;
}

List<StockData> getStockData() {
  // Generate sample data
  return List.generate(365, (i) {
    return StockData(
      DateTime(2024, 01, 01).add(Duration(days: i)),
      100 + (i % 30) * 2.5,
    );
  });
}
```

## Controller vs initialValues

### When to Use Each

| Feature | `initialValues` | `controller` |
|---------|----------------|--------------|
| **Simplicity** | ✅ Simpler | ❌ More setup |
| **Immediate updates** | ✅ Direct | ❌ Requires listener |
| **Deferred updates** | ❌ Not supported | ✅ Built-in |
| **Programmatic control** | ❌ Limited | ✅ Full control |
| **Change notifications** | ❌ Only `onChanged` | ✅ `addListener()` |
| **Use case** | Simple selectors | Complex interactions |

### Example Comparison

```dart
// Using initialValues (simple)
SfRangeSelector(
  min: 0.0,
  max: 100.0,
  initialValues: SfRangeValues(20.0, 80.0),
  onChanged: (SfRangeValues values) {
    print('${values.start} - ${values.end}');
  },
  child: Container(/* child */),
)

// Using controller (advanced)
final controller = RangeController(start: 20.0, end: 80.0);
controller.addListener(() {
  print('${controller.start} - ${controller.end}');
});

SfRangeSelector(
  min: 0.0,
  max: 100.0,
  controller: controller,
  child: Container(/* child */),
)
```

## Best Practices

1. **Always dispose controllers**: Prevents memory leaks
2. **Use deferred updates for expensive operations**: Charts, API calls, complex computations
3. **Combine with `onChanged` for live feedback**: Show interim values in UI
4. **Validate programmatic updates**: Ensure `start < end`, within min/max
5. **Remove listeners before disposing**: Clean up properly
6. **Don't use controller for simple cases**: `initialValues` is sufficient for basic selectors
7. **Test performance**: Measure if deferred updates actually improve performance
8. **Document controller purpose**: Explain why controller is needed in comments

## Common Patterns

### Pattern 1: Apply Button

```dart
// User previews, then applies changes
final _controller = RangeController(start: 20.0, end: 80.0);
SfRangeValues _appliedRange = SfRangeValues(20.0, 80.0);

SfRangeSelector(
  controller: _controller,
  onChanged: (values) {
    // Show preview, don't apply yet
    print('Preview: ${values.start} - ${values.end}');
  },
  child: Container(/* child */),
)

ElevatedButton(
  onPressed: () {
    // Apply changes
    setState(() {
      _appliedRange = SfRangeValues(_controller.start, _controller.end);
    });
    // Trigger expensive operation with _appliedRange
  },
  child: Text('Apply'),
)
```

### Pattern 2: Synchronized Selectors

```dart
// Two selectors control same range
final _controller = RangeController(start: 30.0, end: 70.0);

Column(
  children: [
    SfRangeSelector(controller: _controller, child: ChartA()),
    SfRangeSelector(controller: _controller, child: ChartB()),
  ],
)
```

### Pattern 3: State Management Integration

```dart
// Provider example
class RangeProvider extends ChangeNotifier {
  final RangeController controller = RangeController(start: 20.0, end: 80.0);
  
  RangeProvider() {
    controller.addListener(notifyListeners);
  }
  
  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }
}

// In widget
final provider = Provider.of<RangeProvider>(context);
SfRangeSelector(
  controller: provider.controller,
  child: Container(/* child */),
)
```
