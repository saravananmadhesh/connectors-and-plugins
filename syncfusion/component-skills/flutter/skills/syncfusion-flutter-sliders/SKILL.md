---
name: syncfusion-flutter-sliders
description: Implements Syncfusion Flutter Slider controls (SfSlider, SfRangeSlider, SfRangeSelector) for numeric value selection and range inputs. Use when working with single-value sliders, range selection, or chart-range controllers in Flutter apps. This skill covers thumb and tooltip customization, ticks, dividers, RTL support, drag modes, and chart integrations.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion Flutter Slider Controls

This skill groups three related Syncfusion Flutter components for value selection and range interaction: **SfSlider** (single value), **SfRangeSlider** (two-thumb range), and **SfRangeSelector** (range selector with child content such as charts). They share many visual and configuration features but have distinct responsibilities and integration patterns.

## When to Use This Skill

Use this skill when you need to:

- **Select a single numeric or date value** in a compact UI (use `SfSlider`).
- **Select a start/end range** with two thumbs (use `SfRangeSlider`).
- **Select a range that drives another widget** (chart zoom/selection) or shows child content (use `SfRangeSelector`).
- **Customize visual track, ticks, labels, thumbs, or tooltips** across slider controls.
- **Integrate slider range with charts** for selection or zooming.
- **Support RTL, accessibility, and keyboard navigation** for slider controls.

## Choosing the Right Component

### Use **SfSlider** when:
- You need a single value picker (volume, progress percentage, timeline scrubber).
- Simplicity and small surface area are required.

### Use **SfRangeSlider** when:
- You need the user to pick a numeric/date interval with two thumbs.
- You need drag modes that control thumb behavior (onThumb, betweenThumbs, both).

### Use **SfRangeSelector** when:
- You need a range control that contains or controls a child widget (commonly charts).
- You require a `RangeController` for programmatic updates and chart integrations.

### Key Differences Summary:

| Feature | SfSlider | SfRangeSlider | SfRangeSelector |
|---|---:|---:|---:|
| Primary purpose | Single value | Two-thumb range | Range with child (chart) |
| Value type | `value` | `values` (SfRangeValues) | `initialValues` / `controller` |
| Child content | ❌ | ❌ | ✅ (any widget, often charts) |
| Controller support | ❌ | ❌ | ✅ (`RangeController`) |
| Drag modes | — | ✅ (dragMode) | ✅ (dragMode) |
| Deferred updates | ❌ | ❌ | ✅ (enableDeferredUpdate) |

## Documentation and Navigation Guide

### Getting Started

📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installation and package setup for all three slider controls
- Basic SfSlider implementation (horizontal and vertical)
- Basic SfRangeSlider implementation
- Basic SfRangeSelector implementation with chart integration
- Package dependencies and imports
- Quick comparison and first examples
- Numeric and date-based slider examples

### Component Overview

📄 **For Slider:** [references/slider-overview.md](references/slider-overview.md)
- SfSlider widget overview and features
- When to use single-value slider vs range controls
- Numeric and date value support
- Horizontal and vertical orientations
- Slider-specific capabilities
- Basic slider configuration

📄 **For Range Slider:** [references/range-slider-overview.md](references/range-slider-overview.md)
- SfRangeSlider widget overview and features
- When to use Range Slider vs Range Selector
- SfRangeValues class for start/end values
- Introduction to drag modes
- Active and inactive track regions
- Range slider-specific examples

📄 **For Range Selector:** [references/range-selector-overview.md](references/range-selector-overview.md)
- SfRangeSelector widget overview and features
- When to use Range Selector for chart integration
- Child widget support (charts, graphs, custom content)
- RangeController introduction
- Difference between initialValues and controller
- Deferred updates pattern
- Chart integration patterns

### Value Configuration

📄 **Read:** [references/values-and-intervals.md](references/values-and-intervals.md)
- Minimum and maximum value configuration
- Value types (double, DateTime) for each widget
- Interval configuration and step values
- Numeric ranges with custom formatting
- Date and DateTime ranges
- DateIntervalType configuration
- NumberFormat and DateFormat usage
- Value constraints and validation

### Visual Customization

📄 **Read:** [references/track-and-shapes.md](references/track-and-shapes.md)
- Active and inactive track colors
- Track height and thickness customization
- Track corners and shapes
- Custom track styling patterns
- Region colors for RangeSelector
- Track appearance across all three widgets

📄 **Read:** [references/ticks-and-dividers.md](references/ticks-and-dividers.md)
- Enabling and configuring tick marks
- Major ticks configuration
- Minor ticks and intervals
- Divider configuration
- Tick and divider styling
- Complete examples for all three widgets

📄 **Read:** [references/labels-and-formatting.md](references/labels-and-formatting.md)
- Showing and positioning labels
- NumberFormat for numeric values (currency, percentage, compact)
- DateFormat for date values (various patterns)
- Custom label formatting with labelFormatterCallback
- Label text styling
- Label offset and positioning
- Edge label visibility

📄 **Read:** [references/thumbs-tooltips-overlay.md](references/thumbs-tooltips-overlay.md)
- Thumb size, color, and customization
- Thumb icons and custom widgets
- Thumb stroke (border) configuration
- Overlay (ripple) configuration
- Enabling and configuring tooltips
- Tooltip shapes (rectangular, paddle)
- Tooltip text formatting
- Always-visible tooltip option

### Advanced Features

📄 **Read:** [references/drag-modes.md](references/drag-modes.md)
- Drag mode functionality (RangeSlider and RangeSelector only)
- SliderDragMode.onThumb explanation
- SliderDragMode.betweenThumbs explanation
- SliderDragMode.both explanation
- Choosing the right drag mode
- Use cases and examples for each mode

📄 **Read:** [references/range-controller.md](references/range-controller.md)
- RangeController overview (RangeSelector only)
- When to use RangeController
- Creating and disposing controllers
- Deferred updates for performance
- Programmatic range updates
- Listening to range changes
- Chart integration with controller
- Controller vs initialValues comparison
- Advanced patterns (apply button, synchronized selectors)

### Event Handling

📄 **Read:** [references/callbacks-and-events.md](references/callbacks-and-events.md)
- onChanged callback (continuous updates)
- onChangeStart callback (interaction start)
- onChangeEnd callback (interaction complete)
- Complete lifecycle examples
- Validation and constraints in callbacks
- Async operations and debouncing
- Event handling patterns
- Best practices for callback usage

### Accessibility and States

📄 **Read:** [references/accessibility-and-states.md](references/accessibility-and-states.md)
- Accessibility overview and importance
- Semantic labels for screen readers
- Enabled and disabled states
- Keyboard navigation support
- Screen reader support (VoiceOver, TalkBack)
- Right-to-Left (RTL) language support
- WCAG compliance guidelines
- Color contrast considerations
- Touch target sizing
- Testing accessibility features

## Quick Start Examples

### SfSlider — Basic single-value slider

```dart
double _value = 40.0;

SfSlider(
  min: 0.0,
  max: 100.0,
  value: _value,
  interval: 20,
  showLabels: true,
  onChanged: (dynamic newValue) {
    setState(() { _value = newValue; });
  },
)
```

### SfRangeSlider — Basic range

```dart
SfRangeValues _values = const SfRangeValues(40.0, 60.0);

SfRangeSlider(
  min: 0.0,
  max: 100.0,
  values: _values,
  interval: 20,
  showLabels: true,
  onChanged: (SfRangeValues newValues) {
    setState(() { _values = newValues; });
  },
)
```

### SfRangeSelector — Range with chart child and controller

```dart
final SfRangeValues _initial = SfRangeValues(0.3, 0.7);
RangeController _controller = RangeController(start: 0.3, end: 0.7);

SfRangeSelector(
  min: 0,
  max: 1,
  initialValues: _initial,
  controller: _controller,
  child: SizedBox(height: 130, child: SfCartesianChart(...)),
)
```

## Common Patterns

### Pattern 1: Choose widget by need

- Single value → `SfSlider`
- Range selection → `SfRangeSlider`
- Range controlling chart/child → `SfRangeSelector`

### Pattern 2: Controlled vs Uncontrolled

- `SfSlider` and `SfRangeSlider` are typically controlled by parent state via `value`/`values` and `onChanged`.
- `SfRangeSelector` can be driven via `RangeController` for programmatic updates and chart integrations.

## Key Properties

### SfSlider Essential Properties

- `min` - Minimum value (double or DateTime)
- `max` - Maximum value (double or DateTime)
- `value` - Current slider value
- `interval` - Interval between divisions
- `stepSize` - Step interval for discrete values
- `onChanged` - Callback when value changes
- `onChangeStart` - Callback when drag starts
- `onChangeEnd` - Callback when drag ends
- `showLabels` - Display labels at intervals
- `showTicks` - Display tick marks
- `showDividers` - Display dividers
- `enableTooltip` - Enable tooltip on interaction
- `activeColor` - Active track color
- `inactiveColor` - Inactive track color
- `numberFormat` - NumberFormat for numeric values
- `dateFormat` - DateFormat for DateTime values
- `dateIntervalType` - Interval type for dates (years, months, days, etc.)
- `labelFormatterCallback` - Custom label formatting
- `tooltipTextFormatterCallback` - Custom tooltip formatting
- `semanticFormatterCallback` - Accessibility label formatting

### SfRangeSlider Essential Properties

- `min` - Minimum value (double or DateTime)
- `max` - Maximum value (double or DateTime)
- `values` - Current range values (SfRangeValues with start and end)
- `interval` - Interval between divisions
- `stepSize` - Step interval for discrete values
- `onChanged` - Callback when values change
- `onChangeStart` - Callback when drag starts
- `onChangeEnd` - Callback when drag ends
- `dragMode` - Drag interaction mode (onDragStart, onThumb, betweenThumbs, both)
- `showLabels` - Display labels at intervals
- `showTicks` - Display tick marks
- `showDividers` - Display dividers
- `enableTooltip` - Enable tooltips on interaction
- `activeColor` - Active track color (between thumbs)
- `inactiveColor` - Inactive track color
- `numberFormat` - NumberFormat for numeric values
- `dateFormat` - DateFormat for DateTime values
- `dateIntervalType` - Interval type for dates
- `labelFormatterCallback` - Custom label formatting
- `tooltipTextFormatterCallback` - Custom tooltip formatting
- `semanticFormatterCallback` - Accessibility label formatting

### SfRangeSelector Essential Properties

- `min` - Minimum value (double or DateTime)
- `max` - Maximum value (double or DateTime)
- `initialValues` - Initial range values (SfRangeValues)
- `controller` - RangeController for programmatic control
- `interval` - Interval between divisions
- `stepSize` - Step interval for discrete values
- `onChanged` - Callback when values change (optional with controller)
- `onChangeStart` - Callback when drag starts
- `onChangeEnd` - Callback when drag ends
- `dragMode` - Drag interaction mode (onDragStart, onThumb, betweenThumbs, both)
- `enableDeferredUpdate` - Enable deferred updates for performance
- `deferredUpdateDelay` - Delay for deferred updates
- `showLabels` - Display labels at intervals
- `showTicks` - Display tick marks
- `showDividers` - Display dividers
- `enableTooltip` - Enable tooltips on interaction
- `activeColor` - Active track color (between thumbs)
- `inactiveColor` - Inactive track color
- `child` - Child widget (typically charts)
- `numberFormat` - NumberFormat for numeric values
- `dateFormat` - DateFormat for DateTime values
- `dateIntervalType` - Interval type for dates
- `labelFormatterCallback` - Custom label formatting
- `tooltipTextFormatterCallback` - Custom tooltip formatting
- `semanticFormatterCallback` - Accessibility label formatting
- `enableIntervalSelection` - Enable selection by interval
- `showDivisors` - Show region dividers

## Common Use Cases

1. Volume or brightness controls — `SfSlider`
2. Date range filters — `SfRangeSlider`
3. Chart zoom/segment selection — `SfRangeSelector` + chart integration
4. Time-range pickers for analytics dashboards — `SfRangeSelector`
5. Two-ended price range filter in product lists — `SfRangeSlider`
