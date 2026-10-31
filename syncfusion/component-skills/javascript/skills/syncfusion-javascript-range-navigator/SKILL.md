---
name: syncfusion-javascript-range-navigator
description: Create interactive range navigators in Syncfusion TypeScript and JavaScript for data visualization and range selection. Immediately use this skill when user needs to build range selectors, filter large datasets, select date ranges, visualize time-series data, integrate with charts, configure period selectors, customize range appearance, handle user interactions, export visualizations, or implement lightweight range navigators. Works with TypeScript (module-based) and JavaScript (CDN/ES5).
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Data Visualization"
---

# Implementing Range Navigator in Syncfusion TypeScript and JavaScript

The Syncfusion EJ2 Range Navigator is a data visualization control for selecting a specific range from DateTime, numeric, category, or logarithmic data. It can display an overview series, provide predefined period buttons, show selection tooltips, synchronize with an EJ2 Chart, export the rendered visualization, and print the component.

This skill covers only the following implementations:

- EJ2 TypeScript using `@syncfusion/ej2-charts`
- EJ2 JavaScript using the global `ej.charts` namespace
- Package-based TypeScript projects
- CDN-based JavaScript projects

Do not generate Vue, React, Angular, Composition API, directive, provider, or Single File Component code when this skill is used.

## Platform Support

### TypeScript

Use TypeScript when the project requires:

- Static typing
- IDE IntelliSense
- Compile-time validation
- ES module imports
- Bundler-based application setup
- Explicit feature-module injection
- Type-safe event argument interfaces

Import the component and required modules from:

```typescript
import {
    AreaSeries,
    DateTime,
    RangeNavigator
} from '@syncfusion/ej2-charts';
```

Inject every required feature before creating the component:

```typescript
RangeNavigator.Inject(
    AreaSeries,
    DateTime
);
```

Create and render the component:

```typescript
const rangeNavigator: RangeNavigator =
    new RangeNavigator(configuration);

rangeNavigator.appendTo('#range-navigator');
```

### JavaScript

Use JavaScript when the project requires:

- Direct browser execution
- CDN-based script loading
- No TypeScript compilation
- No module bundler
- Global EJ2 namespace access

Create the component through:

```javascript
var rangeNavigator =
    new ej.charts.RangeNavigator(configuration);

rangeNavigator.appendTo('#range-navigator');
```

When the complete EJ2 global bundle is loaded, separate TypeScript-style imports and `RangeNavigator.Inject(...)` calls are not required.

## When to Use This Skill

Use this skill when the user needs to:

- Create an EJ2 Range Navigator.
- Install and initialize the Range Navigator.
- Bind local or remote data.
- Select DateTime or numeric ranges.
- Configure Line, Area, or StepLine series.
- Configure DateTime, Double, Category, or Logarithmic axes.
- Set the initial selected range.
- Update the selected range programmatically.
- Handle range-selection changes.
- Configure deferred range updates.
- Enable selection tooltips.
- Configure a Period Selector.
- Synchronize a Range Navigator with an EJ2 Chart.
- Customize labels, grid lines, ticks, regions, thumbs, or borders.
- Configure responsive rendering.
- Enable right-to-left rendering.
- Export the Range Navigator.
- Print the Range Navigator.
- Optimize large datasets through sampling or aggregation.
- Diagnose rendering, injection, data-binding, or interaction issues.

Do not use unsupported properties or features from other EJ2 controls merely because their names appear similar.

## Validation Workflow

Before generating any code, complete the following validation.

### Step 1: Identify the Implementation

Determine whether the requested output is:

- TypeScript
- JavaScript
- Both TypeScript and JavaScript

Do not substitute a framework-specific implementation.

### Step 2: Identify the Axis Type

Determine the correct `valueType`.

| Data | valueType | Required Axis Module |
|---|---|---|
| JavaScript `Date` objects | `DateTime` | `DateTime` |
| Numbers | `Double` | No additional axis module |
| Text categories | `Category` | `Category` |
| Positive logarithmic values | `Logarithmic` | `Logarithmic` |

Use `Double`, not `Numeric`, for a numeric axis.

### Step 3: Identify Every Series Type

The Range Navigator supports:

- `Line`
- `Area`
- `StepLine`

Required modules:

- `Line` requires `LineSeries`.
- `Area` requires `AreaSeries`.
- `StepLine` requires `StepLineSeries`.

Do not configure these unsupported Range Navigator series types:

- `Spline`
- `SplineArea`
- `Column`
- `Bar`
- `Scatter`
- `Candle`
- `Hilo`
- `HiloOpenClose`

Use the EJ2 Chart or Stock Chart when one of those visualization types is required.

### Step 4: Identify Optional Features

Validate every optional feature before generating the example.

| Feature | Required Module |
|---|---|
| Range tooltip | `RangeTooltip` |
| Period Selector | `PeriodSelector` |
| DateTime axis | `DateTime` |
| Category axis | `Category` |
| Logarithmic axis | `Logarithmic` |

### Step 5: Validate Imports Before Code Generation

For TypeScript, every feature used in the configuration must have its required import.

Example with an Area series, DateTime axis, tooltip, and Period Selector:

```typescript
import {
    AreaSeries,
    DateTime,
    IChangedEventArgs,
    PeriodSelector,
    RangeNavigator,
    RangeTooltip
} from '@syncfusion/ej2-charts';
```

### Step 6: Validate Module Injection Before Code Generation

The injection list must match the enabled features:

```typescript
RangeNavigator.Inject(
    AreaSeries,
    DateTime,
    PeriodSelector,
    RangeTooltip
);
```

Never generate the configuration first and verify its modules afterward.

### Step 7: Validate Data Mapping

Confirm that:

- `xName` matches the datasource x-field.
- `yName` matches the datasource y-field.
- The x-field type matches `valueType`.
- `value` contains values compatible with `valueType`.
- DateTime data uses valid JavaScript `Date` objects.
- Logarithmic x-values are positive.
- The selected range lies within the available data domain.

### Step 8: Validate Rendering

Confirm that:

- The target element exists.
- The target element ID matches `appendTo(...)`.
- The parent has an available width.
- A suitable height is configured.
- The EJ2 theme stylesheet is loaded.
- Hidden containers are refreshed after becoming visible.

## Reference Navigation

Choose the reference that matches the task.

### Getting Started and Setup

Read:

```text
references/getting-started.md
```

Use it for:

- Package installation
- Dependency setup
- Theme loading
- HTML container setup
- TypeScript initialization
- JavaScript initialization
- Local data binding
- Remote data binding
- Initial range selection
- Basic troubleshooting

### Series Types and Axes

Read:

```text
references/series-and-axes.md
```

Use it for:

- Line series
- Area series
- StepLine series
- DateTime axis
- Double axis
- Category axis
- Logarithmic axis
- Multiple series
- Runtime series switching
- Supported series properties
- Axis and data-type validation

### Range Selection and Interaction

Read:

```text
references/selection-and-interaction.md
```

Use it for:

- Initial range selection
- Programmatic range updates
- Slider interaction
- Deferred updates
- Snapping
- Interval selection
- Period Selector configuration
- Range tooltip configuration
- `changed` event handling
- Selection validation
- Chart synchronization

### Customization and Styling

Read:

```text
references/customization-and-styling.md
```

Use it for:

- Major grid lines
- Major tick lines
- Label formats
- Label position
- Label style
- Smart labels
- Grouped DateTime labels
- Selected and unselected region colors
- Slider thumb styling
- Navigator border
- Background
- Themes
- Right-to-left rendering
- Responsive design

### Advanced Features and Integration

Read:

```text
references/advanced-features.md
```

Use it for:

- PNG export
- JPEG export
- SVG export
- PDF export
- PDF orientation
- Printing
- Chart integration
- Accessibility-oriented markup
- Range announcements
- Large-data optimization
- Data sampling
- Data aggregation
- Real-time updates
- Component cleanup
- Advanced troubleshooting

## Installation

Install the charts package:

```bash
npm install @syncfusion/ej2-charts
```

The required package dependencies are resolved through the package installation process. Do not require users to install every transitive dependency separately unless their package manager reports a specific unresolved dependency.

## Theme Setup

The configured component theme should correspond.

Example:

```typescript
theme: 'Material'
```

## HTML Container

Create the target element before initializing the component.

```html
<div class="range-container">
    <div id="range-navigator"></div>
</div>
```

```css
.range-container {
    width: 100%;
    min-height: 250px;
}
```

The parent must have an available width when the component is rendered.

## Quick Start Example

### TypeScript

#### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>EJ2 Range Navigator</title>

    <style>
        #range-container {
            width: 100%;
            min-height: 250px;
        }
    </style>
</head>
<body>
    <div id="range-container">
        <div id="range-navigator"></div>
    </div>

   <script scr="index.js"></script>
</body>
</html>
```

#### index.ts

```typescript
import {
    AreaSeries,
    DateTime,
    RangeNavigator
} from '@syncfusion/ej2-charts';

interface RangeData {
    date: Date;
    value: number;
}

RangeNavigator.Inject(
    AreaSeries,
    DateTime
);

const data: RangeData[] = [
    { date: new Date(2023, 0, 1), value: 21 },
    { date: new Date(2023, 1, 1), value: 24 },
    { date: new Date(2023, 2, 1), value: 36 },
    { date: new Date(2023, 3, 1), value: 38 },
    { date: new Date(2023, 4, 1), value: 54 },
    { date: new Date(2023, 5, 1), value: 48 },
    { date: new Date(2023, 6, 1), value: 62 }
];

const rangeNavigator: RangeNavigator =
    new RangeNavigator({
        width: '100%',
        height: '250px',
        valueType: 'DateTime',
        value: [
            new Date(2023, 1, 1),
            new Date(2023, 5, 1)
        ],
        labelFormat: 'MMM-yy',
        series: [
            {
                dataSource: data,
                xName: 'date',
                yName: 'value',
                type: 'Area',
                fill: '#2563EB',
                width: 2
            }
        ]
    });

rangeNavigator.appendTo('#range-navigator');
```

### JavaScript

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>EJ2 Range Navigator</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

    <style>
        #range-container {
            width: 100%;
            min-height: 250px;
        }
    </style>
</head>
<body>
    <div id="range-container">
        <div id="range-navigator"></div>
    </div>

    <script>
        var data = [
            {
                date: new Date(2023, 0, 1),
                value: 21
            },
            {
                date: new Date(2023, 1, 1),
                value: 24
            },
            {
                date: new Date(2023, 2, 1),
                value: 36
            },
            {
                date: new Date(2023, 3, 1),
                value: 38
            },
            {
                date: new Date(2023, 4, 1),
                value: 54
            },
            {
                date: new Date(2023, 5, 1),
                value: 48
            },
            {
                date: new Date(2023, 6, 1),
                value: 62
            }
        ];

        var rangeNavigator =
            new ej.charts.RangeNavigator({
                width: '100%',
                height: '250px',
                valueType: 'DateTime',
                value: [
                    new Date(2023, 1, 1),
                    new Date(2023, 5, 1)
                ],
                labelFormat: 'MMM-yy',
                series: [
                    {
                        dataSource: data,
                        xName: 'date',
                        yName: 'value',
                        type: 'Area',
                        fill: '#2563EB',
                        width: 2
                    }
                ]
            });

        rangeNavigator.appendTo(
            '#range-navigator'
        );
    </script>
</body>
</html>
```

## Common Patterns

### DateTime Range Selection

Required modules:

```typescript
import {
    DateTime,
    LineSeries,
    RangeNavigator
} from '@syncfusion/ej2-charts';

RangeNavigator.Inject(
    DateTime,
    LineSeries
);
```

Configuration:

```typescript
const rangeNavigator: RangeNavigator =
    new RangeNavigator({
        valueType: 'DateTime',
        value: [
            new Date(2023, 0, 1),
            new Date(2023, 6, 1)
        ],
        labelFormat: 'MMM-yy',
        series: [
            {
                dataSource: data,
                xName: 'date',
                yName: 'value',
                type: 'Line',
                width: 2
            }
        ]
    });
```

### Numeric Range Selection

Use `Double`, not `Numeric`.

```typescript
import {
    LineSeries,
    RangeNavigator
} from '@syncfusion/ej2-charts';

RangeNavigator.Inject(LineSeries);

const numericData = [
    { x: 10, y: 21 },
    { x: 20, y: 24 },
    { x: 30, y: 36 },
    { x: 40, y: 38 },
    { x: 50, y: 54 }
];

const rangeNavigator: RangeNavigator =
    new RangeNavigator({
        valueType: 'Double',
        value: [20, 40],
        series: [
            {
                dataSource: numericData,
                xName: 'x',
                yName: 'y',
                type: 'Line',
                width: 2
            }
        ]
    });
```

### Period Selector

The `PeriodSelector` module is mandatory for the TypeScript modular implementation.

```typescript
import {
    AreaSeries,
    DateTime,
    PeriodSelector,
    RangeNavigator
} from '@syncfusion/ej2-charts';

RangeNavigator.Inject(
    AreaSeries,
    DateTime,
    PeriodSelector
);
```

Configuration:

```typescript
periodSelectorSettings: {
    position: 'Top',
    periods: [
        {
            text: '1M',
            interval: 1,
            intervalType: 'Months'
        },
        {
            text: '3M',
            interval: 3,
            intervalType: 'Months'
        },
        {
            text: '6M',
            interval: 6,
            intervalType: 'Months',
            selected: true
        },
        {
            text: '1Y',
            interval: 1,
            intervalType: 'Years'
        },
        {
            text: 'YTD'
        },
        {
            text: 'All'
        }
    ]
}
```

Supported interval types include:

```text
Auto
Years
Quarter
Months
Weeks
Days
Hours
Minutes
Seconds
```

### Range Tooltip

The `RangeTooltip` module is mandatory when the tooltip is enabled.

```typescript
import {
    AreaSeries,
    DateTime,
    RangeNavigator,
    RangeTooltip
} from '@syncfusion/ej2-charts';

RangeNavigator.Inject(
    AreaSeries,
    DateTime,
    RangeTooltip
);
```

Configuration:

```typescript
tooltip: {
    enable: true,
    displayMode: 'Always',
    fill: '#111827',
    opacity: 0.9,
    labelFormat: 'MMM d, yyyy',
    textStyle: {
        color: '#FFFFFF',
        size: '12px'
    }
}
```

The Range Navigator tooltip displays the slider selection values. It is not a Chart point tooltip.

Do not use:

```typescript
tooltip: {
    format: '{x}: {y}'
}
```

Do not use:

```typescript
tooltip: {
    backgroundColor: '#111827'
}
```

Use `fill` for the tooltip background.

### Range Change Event

Use the `changed` event.

```typescript
import {
    IChangedEventArgs
} from '@syncfusion/ej2-charts';
```

```typescript
changed: (
    args: IChangedEventArgs
): void => {
    console.log('Start:', args.start);
    console.log('End:', args.end);
    console.log(
        'Selected data:',
        args.selectedData
    );
    console.log(
        'Selected period:',
        args.selectedPeriod
    );
    console.log(
        'Zoom factor:',
        args.zoomFactor
    );
    console.log(
        'Zoom position:',
        args.zoomPosition
    );
}
```

Do not use:

```typescript
args.value
```

Construct an array if required:

```typescript
const selectedRange = [
    args.start,
    args.end
];
```

### Deferred Range Updates

For continuous updates while dragging:

```typescript
enableDeferredUpdate: false
```

For one update after dragging is complete:

```typescript
enableDeferredUpdate: true
```

Use deferred updates when the handler performs:

- Chart rebuilding
- Large data filtering
- Network requests
- Complex calculations
- Multiple dashboard updates

### Programmatic Range Update

Update `value` and call `dataBind()`.

```typescript
rangeNavigator.value = [
    new Date(2023, 2, 1),
    new Date(2023, 8, 1)
];

rangeNavigator.dataBind();
```

### Chart Integration

Validate Chart modules and Range Navigator modules independently.

```typescript
import {
    AreaSeries,
    Chart,
    DateTime,
    IChangedEventArgs,
    LineSeries,
    RangeNavigator
} from '@syncfusion/ej2-charts';

Chart.Inject(
    DateTime,
    LineSeries
);

RangeNavigator.Inject(
    AreaSeries,
    DateTime
);
```

Synchronize through the event-provided zoom values:

```typescript
changed: (
    args: IChangedEventArgs
): void => {
    chart.primaryXAxis.zoomFactor =
        args.zoomFactor;

    chart.primaryXAxis.zoomPosition =
        args.zoomPosition;

    chart.dataBind();
}
```

Do not create unnecessary helper calculations when `zoomFactor` and `zoomPosition` are already provided.

### Export

Supported formats:

```text
JPEG
PNG
SVG
PDF
```

PNG:

```typescript
rangeNavigator.export(
    'PNG',
    'range-navigator'
);
```

SVG:

```typescript
rangeNavigator.export(
    'SVG',
    'range-navigator'
);
```

PDF:

```typescript
rangeNavigator.export(
    'PDF',
    'range-navigator',
    'Landscape'
);
```

Do not inject `ImageExport` solely to use the Range Navigator public `export()` method.

Do not pass width and height as export arguments.

Incorrect:

```typescript
rangeNavigator.export(
    'PNG',
    'range-navigator',
    1200,
    400
);
```

### Print

Print the rendered Range Navigator:

```typescript
rangeNavigator.print();
```

Print a surrounding report:

```typescript
window.print();
```

Use print CSS to hide unrelated controls.

### RTL

Enable component-level right-to-left rendering:

```typescript
enableRtl: true
```

For a fully right-to-left page:

```html
<html lang="ar" dir="rtl">
```

### Responsive Rendering

Use percentage-based width:

```typescript
width: '100%'
```

Use smart-label handling:

```typescript
labelIntersectAction: 'Hide'
```

When manually refreshing on resize, debounce the event.

```typescript
let resizeTimer: number | undefined;

window.addEventListener(
    'resize',
    (): void => {
        if (resizeTimer !== undefined) {
            window.clearTimeout(resizeTimer);
        }

        resizeTimer = window.setTimeout(
            (): void => {
                rangeNavigator.refresh();
            },
            150
        );
    }
);
```

## Key Properties

### Range Navigator Properties

- `valueType`
- `value`
- `minimum`
- `maximum`
- `interval`
- `intervalType`
- `series`
- `dataSource`
- `xName`
- `yName`
- `labelFormat`
- `labelPosition`
- `labelStyle`
- `labelIntersectAction`
- `enableGrouping`
- `groupBy`
- `majorGridLines`
- `majorTickLines`
- `tooltip`
- `periodSelectorSettings`
- `navigatorStyleSettings`
- `navigatorBorder`
- `allowSnapping`
- `allowIntervalData`
- `enableDeferredUpdate`
- `disableRangeSelector`
- `enableRtl`
- `enablePersistence`
- `width`
- `height`
- `background`
- `theme`
- `animationDuration`

### Series Properties

Use validated Range Navigator series properties such as:

- `dataSource`
- `query`
- `xName`
- `yName`
- `type`
- `fill`
- `width`
- `dashArray`
- `border`
- `animation`

Do not assume regular Chart-series properties are supported.

Avoid unsupported Range Navigator series configuration such as:

```typescript
marker: {
    visible: true
}
```

```typescript
dataLabel: {
    visible: true
}
```

```typescript
opacity: 0.7
```

```typescript
name: 'Sales'
```

Use an RGBA fill when transparent color is required:

```typescript
fill: 'rgba(37, 99, 235, 0.70)'
```

## Performance Guidance

The Range Navigator does not expose:

```typescript
enableLightweightMode
```

Do not generate:

```typescript
enableLightweightMode: true
```

Use supported optimizations.

### Disable Animation

```typescript
animationDuration: 0
```

```typescript
series: [
    {
        animation: {
            enable: false,
            duration: 0
        }
    }
]
```

### Defer Expensive Updates

```typescript
enableDeferredUpdate: true
```

### Reduce Bound Data

Use:

- Interval sampling
- Average aggregation
- Minimum and maximum aggregation
- Server-side aggregation
- Time-bucket aggregation
- Controlled real-time update batching

Do not claim that Range Navigator supports virtual scrolling.

### Bound Real-Time History

Do not allow a live datasource to grow indefinitely.

```typescript
const maximumPoints: number = 500;

if (realtimeData.length > maximumPoints) {
    realtimeData.splice(
        0,
        realtimeData.length - maximumPoints
    );
}
```

Update the existing instance:

```typescript
rangeNavigator.series[0].dataSource =
    realtimeData;

rangeNavigator.dataBind();
```

## Accessibility Guidance

Use semantic surrounding markup:

```html
<section aria-labelledby="range-heading">
    <h2 id="range-heading">
        Sales date range
    </h2>

    <p id="range-instructions">
        Select a date range to update the sales chart.
    </p>

    <div
        id="range-navigator"
        aria-describedby="range-instructions"
    ></div>

    <p
        id="range-status"
        role="status"
        aria-live="polite"
    ></p>
</section>
```

Use the `changed` event to update the live status.

```typescript
changed: (
    args: IChangedEventArgs
): void => {
    if (
        !(args.start instanceof Date) ||
        !(args.end instanceof Date)
    ) {
        return;
    }

    rangeStatus.textContent =
        `Selected range from ` +
        `${args.start.toLocaleDateString()} to ` +
        `${args.end.toLocaleDateString()}.`;
}
```

Use native buttons for export, print, reset, and preset actions.

Do not automatically assign:

```html
role="application"
```

Do not promise specific keyboard commands unless they have been validated in the target EJ2 version, browser, and assistive technology combination.

## Output Requirements

When generating a final solution:

1. Use only TypeScript and JavaScript.
2. Do not generate framework wrappers.
3. Validate imports before writing the example.
4. Validate `RangeNavigator.Inject(...)` before writing the example.
5. Include complete data definitions.
6. Include the HTML container.
7. Include the required theme stylesheet.
8. Include every required module.
9. Use full runnable examples.
10. Use `appendTo(...)` consistently.
11. Preserve TypeScript typing.
12. Use `IChangedEventArgs` for typed change handlers.
13. Ensure `xName` and `yName` match the datasource.
14. Ensure `valueType` matches the x-value type.
15. Ensure `value` matches `valueType`.
16. Use only supported Range Navigator series types.
17. Use `RangeTooltip` when tooltip is enabled.
18. Use `PeriodSelector` when periods are configured.
19. Use `Double`, not `Numeric`.
20. Use `fill`, not `backgroundColor`, for the Range Tooltip.
21. Use `args.start` and `args.end`, not `args.value`.
22. Use `args.zoomFactor` and `args.zoomPosition` for Chart synchronization.
23. Do not use `enableLightweightMode`.
24. Do not claim virtual scrolling support.
25. Do not use unsupported minor grid or tick properties.
26. Do not use unsupported Chart-series properties.
27. Use `dataBind()` after property updates.
28. Use `refresh()` only when a complete rerender is needed.
29. Debounce manual resize refreshes.
30. Destroy instances and clear timers during teardown.
31. Keep the final output technical, concise, complete, and directly copyable.
32. Consolidate all corrections and unsupported patterns under `## Combined Mistakes and Future References`.

## Combined Mistakes and Future References

### Wrong Numeric Axis Value

Incorrect:

```typescript
valueType: 'Numeric'
```

Correct:

```typescript
valueType: 'Double'
```

### Unsupported Lightweight Mode

Incorrect:

```typescript
enableLightweightMode: true
```

Use:

```typescript
animationDuration: 0,
enableDeferredUpdate: true
```

### Unsupported Virtual Scrolling

Do not describe the Period Selector as virtual scrolling.

The Period Selector changes the selected interval. It does not virtualize the datasource.

### Missing Tooltip Module

Incorrect:

```typescript
RangeNavigator.Inject(
    AreaSeries,
    DateTime
);
```

when:

```typescript
tooltip: {
    enable: true
}
```

Correct:

```typescript
RangeNavigator.Inject(
    AreaSeries,
    DateTime,
    RangeTooltip
);
```

### Missing Period Selector Module

Incorrect:

```typescript
RangeNavigator.Inject(
    AreaSeries,
    DateTime
);
```

when `periodSelectorSettings` is configured.

Correct:

```typescript
RangeNavigator.Inject(
    AreaSeries,
    DateTime,
    PeriodSelector
);
```

### Unsupported Series Types

Incorrect:

```typescript
type: 'Spline'
```

```typescript
type: 'SplineArea'
```

```typescript
type: 'Column'
```

Supported:

```text
Line
Area
StepLine
```

### Unsupported Series Properties

Avoid:

```typescript
marker: {
    visible: true
}
```

```typescript
dataLabel: {
    visible: true
}
```

```typescript
name: 'Sales'
```

```typescript
opacity: 0.7
```

### Wrong Tooltip Properties

Incorrect:

```typescript
tooltip: {
    backgroundColor: '#111827',
    format: '{x}: {y}'
}
```

Correct:

```typescript
tooltip: {
    enable: true,
    fill: '#111827',
    labelFormat: 'MMM d, yyyy'
}
```

### Wrong Event Data

Incorrect:

```typescript
args.value
```

Correct:

```typescript
args.start
```

```typescript
args.end
```

### Unsupported thumbMove Event

Do not use:

```typescript
thumbMove: () => {
}
```

Use:

```typescript
enableDeferredUpdate: false,
changed: (
    args: IChangedEventArgs
): void => {
    console.log(args.start, args.end);
}
```

### Unsupported enabled Property

Do not use:

```typescript
enabled: false
```

`disableRangeSelector` has a different purpose. It hides the slider and allows the Period Selector to be displayed independently.

### Unsupported Period Selector Visibility

Do not use:

```typescript
periodSelectorSettings: {
    visible: false
}
```

Use a reduced period collection or initialize the mobile configuration without `periodSelectorSettings`.

### Unsupported Minor Lines

Do not use:

```typescript
minorGridLines
```

```typescript
minorTickLines
```

Use:

```typescript
majorGridLines
```

```typescript
majorTickLines
```

### Invalid Export Dimensions

Do not use:

```typescript
rangeNavigator.export(
    'PNG',
    'range-navigator',
    1200,
    400
);
```

The third parameter is PDF orientation, and the fourth parameter is a control collection.

### Unnecessary ImageExport Injection

Do not inject `ImageExport` solely for Range Navigator export.

Use:

```typescript
rangeNavigator.export(
    'PNG',
    'range-navigator'
);
```

### Recreating the Component Unnecessarily

Do not immediately destroy and recreate the Range Navigator when an update fails.

First validate:

- Property assignment
- `dataBind()`
- Module injection
- Field mapping
- Datasource type
- Container visibility
- Container dimensions
- Event configuration

### Final Runtime-Safety Checklist

Before returning any generated solution, verify:

1. The implementation is TypeScript or JavaScript.
2. The package or global namespace is correct.
3. The target element exists.
4. The target selector is correct.
5. The theme stylesheet is loaded.
6. `valueType` is valid.
7. The x-value data type matches `valueType`.
8. `value` contains compatible start and end values.
9. The series type is supported.
10. Every required TypeScript module is imported.
11. Every required TypeScript module is injected.
12. `RangeTooltip` is present when tooltip is enabled.
13. `PeriodSelector` is present when periods are configured.
14. `DateTime` is present for DateTime axes.
15. `Category` is present for Category axes.
16. `Logarithmic` is present for logarithmic axes.
17. `xName` matches the datasource.
18. `yName` matches the datasource.
19. Unsupported properties are removed.
20. Programmatic updates call `dataBind()`.
21. Expensive handlers use deferred updates.
22. Chart synchronization uses event-provided zoom values.
23. Export arguments follow the supported method signature.
24. Print behavior uses `print()` or `window.print()` appropriately.
25. Large datasets are sampled or aggregated.
26. Real-time datasource growth is bounded.
27. Timers and component instances are cleaned up.
28. The final example is complete, runnable, and directly copyable.
