# Range Selection and User Interaction

## Overview

The EJ2 Range Navigator allows users to select a specific portion of DateTime, numeric, category, or logarithmic data.

A range can be selected by:

- Setting the `value` property during initialization.
- Updating the `value` property programmatically.
- Dragging the left or right slider thumb.
- Dragging the selected region.
- Selecting an axis label when interval selection is enabled.
- Choosing a predefined period from the Period Selector.

The original material contained several unsupported or inaccurate configurations that have been corrected:

- Use `valueType: 'Double'`, not `valueType: 'Numeric'`.
- Inject `PeriodSelector` when the Period Selector is enabled.
- Inject `RangeTooltip` when the Range Navigator tooltip is enabled.
- Use `fill`, not `backgroundColor`, for the tooltip background.
- `changed` is the supported range-change event.
- `thumbMove` is not a Range Navigator event.
- `enabled: false` is not a Range Navigator property.
- `disableRangeSelector` hides the Range Navigator and displays only the Period Selector. It does not make the component read-only.
- The `changed` event arguments expose `start`, `end`, `selectedData`, `selectedPeriod`, `zoomFactor`, and `zoomPosition`. They do not expose an `args.value` property.
- The Range Navigator tooltip displays the selected start and end slider values. It is not a point-hover tooltip.

## Table of Contents

- #setting-range-programmatically
  - #datetime-range
  - #double-range
  - #updating-the-range-after-rendering
- #default-range-selection
  - #typescript-default-selection
  - #javascript-default-selection
- #user-range-selection
  - #slider-thumb-selection
  - #deferred-range-updates
  - #snapping-selection-to-intervals
  - #selecting-data-through-labels
  - #displaying-only-the-period-selector
- #period-selector
  - #required-period-selector-module
  - #typescript-period-selector
  - #javascript-period-selector
  - #period-configuration
  - #supported-interval-types
  - #selected-period
  - #period-selector-position
- #tooltip-configuration
  - #required-tooltip-module
  - #typescript-tooltip
  - #javascript-tooltip
  - #tooltip-appearance
  - #tooltip-display-mode
  - #tooltip-label-format
- #events-and-callbacks
  - #changed-event
  - #load-event
  - #loaded-event
  - #changed-event-arguments
- #handling-range-changes
  - #filtering-data-by-the-selected-range
  - #synchronizing-a-chart
  - #validating-the-selected-duration
  - #identifying-period-selection
- #complete-typescript-example
- #complete-javascript-example
- #combined-mistakes-and-future-references

## Setting Range Programmatically

The `value` property accepts two values:

```typescript
value: [startValue, endValue]
```

The values must be compatible with the configured `valueType`.

| valueType | Valid value elements |
|---|---|
| `DateTime` | JavaScript `Date` objects |
| `Double` | Numbers |
| `Category` | Category values |
| `Logarithmic` | Positive numbers |

### DateTime Range

For a DateTime range:

1. Set `valueType` to `DateTime`.
2. Use JavaScript `Date` objects in the datasource.
3. Use JavaScript `Date` objects in the `value` array.
4. Import and inject `DateTime`.
5. Import and inject the configured series module.

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

const rangeNavigator: RangeNavigator = new RangeNavigator({
    valueType: 'DateTime',
    value: [
        new Date(2023, 0, 1),
        new Date(2023, 3, 1)
    ],
    labelFormat: 'MMM-yy',
    series: [
        {
            dataSource: data,
            xName: 'date',
            yName: 'value',
            type: 'Area',
            width: 2
        }
    ]
});

rangeNavigator.appendTo('#range');
```

JavaScript month indexes begin at zero:

```typescript
new Date(2023, 0, 1)
```

This represents January 1, 2023.

```typescript
new Date(2023, 3, 1)
```

This represents April 1, 2023.

### Double Range

Use `Double` for numeric x-values.

Do not use:

```typescript
valueType: 'Numeric'
```

Use:

```typescript
valueType: 'Double'
```

Complete TypeScript configuration:

```typescript
import {
    LineSeries,
    RangeNavigator
} from '@syncfusion/ej2-charts';

interface NumericData {
    x: number;
    y: number;
}

RangeNavigator.Inject(LineSeries);

const data: NumericData[] = [
    { x: 10, y: 21 },
    { x: 20, y: 24 },
    { x: 30, y: 36 },
    { x: 40, y: 38 },
    { x: 50, y: 54 },
    { x: 60, y: 58 }
];

const rangeNavigator: RangeNavigator = new RangeNavigator({
    valueType: 'Double',
    value: [10, 40],
    series: [
        {
            dataSource: data,
            xName: 'x',
            yName: 'y',
            type: 'Line',
            width: 2
        }
    ]
});

rangeNavigator.appendTo('#range');
```

The Double axis does not require an additional axis module. The `LineSeries` module is still required because the series type is `Line`.

### Updating the Range After Rendering

Update the `value` property and call `dataBind()` to apply the change.

```typescript
rangeNavigator.value = [
    new Date(2023, 2, 1),
    new Date(2023, 5, 1)
];

rangeNavigator.dataBind();
```

For a Double axis:

```typescript
rangeNavigator.value = [20, 50];
rangeNavigator.dataBind();
```

A complete button-driven example:

```typescript
const updateButton: HTMLButtonElement | null =
    document.querySelector('#update-range');

if (updateButton) {
    updateButton.addEventListener('click', (): void => {
        rangeNavigator.value = [
            new Date(2023, 2, 1),
            new Date(2023, 5, 1)
        ];

        rangeNavigator.dataBind();
    });
}
```

## Default Range Selection

Set `value` during initialization to define the initially selected range.

### TypeScript Default Selection

```typescript
import {
    AreaSeries,
    DateTime,
    RangeNavigator
} from '@syncfusion/ej2-charts';

RangeNavigator.Inject(
    AreaSeries,
    DateTime
);

const rangeNavigator: RangeNavigator = new RangeNavigator({
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
            type: 'Area',
            width: 2
        }
    ]
});

rangeNavigator.appendTo('#range');
```

### JavaScript Default Selection

```javascript
var data = [
    { date: new Date(2023, 0, 1), value: 21 },
    { date: new Date(2023, 1, 1), value: 24 },
    { date: new Date(2023, 2, 1), value: 36 },
    { date: new Date(2023, 3, 1), value: 38 },
    { date: new Date(2023, 4, 1), value: 54 },
    { date: new Date(2023, 5, 1), value: 48 },
    { date: new Date(2023, 6, 1), value: 62 }
];

var rangeNavigator = new ej.charts.RangeNavigator({
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
            type: 'Area',
            width: 2
        }
    ]
});

rangeNavigator.appendTo('#range');
```

## User Range Selection

Users can change the selected range through the slider thumbs, selected region, labels, and Period Selector.

### Slider Thumb Selection

The left thumb controls the start value.

The right thumb controls the end value.

When the user moves either thumb, the Range Navigator updates its selected range and triggers the `changed` event according to the `enableDeferredUpdate` configuration.

### Deferred Range Updates

The `enableDeferredUpdate` property controls when the `changed` event is triggered during slider movement. Its default value is `false`.

When it is `false`, the event is triggered continuously while the slider is being dragged:

```typescript
enableDeferredUpdate: false
```

When it is `true`, the event is triggered after the user completes the drag operation:

```typescript
enableDeferredUpdate: true
```

Use deferred updates when the event performs expensive work such as:

- Filtering a large dataset.
- Making a network request.
- Rebuilding a Chart.
- Updating multiple dashboard components.
- Running complex calculations.

Example:

```typescript
const rangeNavigator: RangeNavigator = new RangeNavigator({
    enableDeferredUpdate: true,
    changed: (args: IChangedEventArgs): void => {
        updateDashboard(args.start, args.end);
    }
});
```

### Snapping Selection to Intervals

Set `allowSnapping` to `true` to align slider values with axis intervals:

```typescript
const rangeNavigator: RangeNavigator = new RangeNavigator({
    allowSnapping: true,
    valueType: 'DateTime',
    intervalType: 'Months',
    interval: 1
});
```

This is useful when the selected range should align with whole days, months, or years rather than arbitrary positions.

### Selecting Data Through Labels

The `allowIntervalData` property allows the corresponding interval data to be selected when the user selects an axis label.

```typescript
const rangeNavigator: RangeNavigator = new RangeNavigator({
    allowIntervalData: true,
    intervalType: 'Months',
    valueType: 'DateTime'
});
```

This behavior is useful when each label represents an entire interval.

### Displaying Only the Period Selector

The Range Navigator does not provide an `enabled` property for disabling all interactions.

The `disableRangeSelector` property has a different purpose. It renders the Period Selector without displaying the Range Navigator slider.

```typescript
const rangeNavigator: RangeNavigator = new RangeNavigator({
    disableRangeSelector: true,
    valueType: 'DateTime',
    periodSelectorSettings: {
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
                text: 'YTD',
                selected: true
            },
            {
                text: 'All'
            }
        ]
    }
});
```

This does not make the component read-only. It removes the slider UI and leaves the Period Selector available for interaction.

## Period Selector

The Period Selector displays buttons that allow users to select predefined ranges.

Examples include:

- One month
- Three months
- Six months
- One year
- Year to date
- All available data

### Required Period Selector Module

The `PeriodSelector` module must be imported and injected before the Range Navigator is created.

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

If `periodSelectorSettings` is present but `PeriodSelector` is not injected, the feature is not runtime-safe.

### TypeScript Period Selector

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
    <title>Range Navigator Period Selector</title>

</head>
<body>
    <div id="container">
        <div id="range"></div>
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
    IChangedEventArgs,
    PeriodSelector,
    RangeNavigator
} from '@syncfusion/ej2-charts';

interface RangeData {
    date: Date;
    value: number;
}

RangeNavigator.Inject(
    AreaSeries,
    DateTime,
    PeriodSelector
);

const data: RangeData[] = [
    { date: new Date(2022, 0, 1), value: 21 },
    { date: new Date(2022, 1, 1), value: 24 },
    { date: new Date(2022, 2, 1), value: 36 },
    { date: new Date(2022, 3, 1), value: 38 },
    { date: new Date(2022, 4, 1), value: 54 },
    { date: new Date(2022, 5, 1), value: 48 },
    { date: new Date(2022, 6, 1), value: 62 },
    { date: new Date(2022, 7, 1), value: 58 },
    { date: new Date(2022, 8, 1), value: 70 },
    { date: new Date(2022, 9, 1), value: 76 },
    { date: new Date(2022, 10, 1), value: 72 },
    { date: new Date(2022, 11, 1), value: 85 },
    { date: new Date(2023, 0, 1), value: 82 },
    { date: new Date(2023, 1, 1), value: 88 },
    { date: new Date(2023, 2, 1), value: 91 },
    { date: new Date(2023, 3, 1), value: 95 },
    { date: new Date(2023, 4, 1), value: 90 },
    { date: new Date(2023, 5, 1), value: 98 }
];

const rangeNavigator: RangeNavigator = new RangeNavigator({
    valueType: 'DateTime',
    value: [
        new Date(2023, 0, 1),
        new Date(2023, 5, 1)
    ],
    labelFormat: 'MMM-yy',
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
    },
    series: [
        {
            dataSource: data,
            xName: 'date',
            yName: 'value',
            type: 'Area',
            width: 2
        }
    ],
    changed: (args: IChangedEventArgs): void => {
        console.log('Start:', args.start);
        console.log('End:', args.end);
        console.log('Selected period:', args.selectedPeriod);
    }
});

rangeNavigator.appendTo('#range');
```

### JavaScript Period Selector

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Range Navigator Period Selector</title>
    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
</head>
<body>
    <div id="container">
        <div id="range"></div>
    </div>

    <script>
        var data = [
            { date: new Date(2022, 0, 1), value: 21 },
            { date: new Date(2022, 1, 1), value: 24 },
            { date: new Date(2022, 2, 1), value: 36 },
            { date: new Date(2022, 3, 1), value: 38 },
            { date: new Date(2022, 4, 1), value: 54 },
            { date: new Date(2022, 5, 1), value: 48 },
            { date: new Date(2022, 6, 1), value: 62 },
            { date: new Date(2022, 7, 1), value: 58 },
            { date: new Date(2022, 8, 1), value: 70 },
            { date: new Date(2022, 9, 1), value: 76 },
            { date: new Date(2022, 10, 1), value: 72 },
            { date: new Date(2022, 11, 1), value: 85 },
            { date: new Date(2023, 0, 1), value: 82 },
            { date: new Date(2023, 1, 1), value: 88 },
            { date: new Date(2023, 2, 1), value: 91 },
            { date: new Date(2023, 3, 1), value: 95 },
            { date: new Date(2023, 4, 1), value: 90 },
            { date: new Date(2023, 5, 1), value: 98 }
        ];

        var rangeNavigator = new ej.charts.RangeNavigator({
            valueType: 'DateTime',
            value: [
                new Date(2023, 0, 1),
                new Date(2023, 5, 1)
            ],
            labelFormat: 'MMM-yy',
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
            },
            series: [
                {
                    dataSource: data,
                    xName: 'date',
                    yName: 'value',
                    type: 'Area',
                    width: 2
                }
            ],
            changed: function (args) {
                console.log('Start:', args.start);
                console.log('End:', args.end);
                console.log('Selected period:', args.selectedPeriod);
            }
        });

        rangeNavigator.appendTo('#range');
    </script>
</body>
</html>
```

The JavaScript CDN bundle exposes the required functionality through the `ej.charts` global namespace. ES module injection is required for the TypeScript package-based implementation.

### Period Configuration

A standard interval-based period contains:

```typescript
{
    text: '3M',
    interval: 3,
    intervalType: 'Months'
}
```

Property purposes:

- `text` defines the text displayed on the button.
- `interval` defines the number of intervals.
- `intervalType` defines the unit.
- `selected` defines the initially selected period button.

Example:

```typescript
periodSelectorSettings: {
    periods: [
        {
            text: '1M',
            interval: 1,
            intervalType: 'Months'
        },
        {
            text: '3M',
            interval: 3,
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

Do not label a one-day interval as `Today` unless that meaning is acceptable for the application:

```typescript
{
    text: 'Today',
    interval: 1,
    intervalType: 'Days'
}
```

The preceding configuration selects a one-day interval relative to the current range endpoint. The button text itself does not create a special calendar-today behavior.

### Supported Interval Types

The Period Selector supports the following interval types: 

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

Use the exact casing:

```typescript
intervalType: 'Months'
```

Avoid:

```typescript
intervalType: 'months'
```

### Selected Period

Use `selected: true` to identify the period selected during initialization:

```typescript
periodSelectorSettings: {
    periods: [
        {
            text: '1M',
            interval: 1,
            intervalType: 'Months'
        },
        {
            text: '3M',
            interval: 3,
            intervalType: 'Months',
            selected: true
        }
    ]
}
```

Only one period should be configured as initially selected.

The `changed` event exposes the selected period text through:

```typescript
args.selectedPeriod
```

### Period Selector Position

The Period Selector supports `Top` and `Bottom` positions. The default position is `Bottom`.

Top:

```typescript
periodSelectorSettings: {
    position: 'Top',
    periods: periods
}
```

Bottom:

```typescript
periodSelectorSettings: {
    position: 'Bottom',
    periods: periods
}
```

The Period Selector height can also be configured:

```typescript
periodSelectorSettings: {
    height: 43,
    position: 'Top',
    periods: periods
}
```

## Tooltip Configuration

The Range Navigator tooltip displays the selected start and end values associated with the slider thumbs.

It is not a series point-hover tooltip.

### Required Tooltip Module

Import and inject `RangeTooltip` before enabling the tooltip.

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

Using `tooltip.enable` without injecting `RangeTooltip` is not runtime-safe in the TypeScript modular implementation.

### TypeScript Tooltip

```typescript
import {
    AreaSeries,
    DateTime,
    RangeNavigator,
    RangeTooltip
} from '@syncfusion/ej2-charts';

interface RangeData {
    date: Date;
    value: number;
}

RangeNavigator.Inject(
    AreaSeries,
    DateTime,
    RangeTooltip
);

const data: RangeData[] = [
    { date: new Date(2023, 0, 1), value: 21 },
    { date: new Date(2023, 1, 1), value: 24 },
    { date: new Date(2023, 2, 1), value: 36 },
    { date: new Date(2023, 3, 1), value: 38 },
    { date: new Date(2023, 4, 1), value: 54 },
    { date: new Date(2023, 5, 1), value: 48 }
];

const rangeNavigator: RangeNavigator = new RangeNavigator({
    valueType: 'DateTime',
    value: [
        new Date(2023, 1, 1),
        new Date(2023, 4, 1)
    ],
    tooltip: {
        enable: true,
        displayMode: 'Always',
        labelFormat: 'MMM d, yyyy'
    },
    series: [
        {
            dataSource: data,
            xName: 'date',
            yName: 'value',
            type: 'Area',
            width: 2
        }
    ]
});

rangeNavigator.appendTo('#range');
```

### JavaScript Tooltip

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Range Navigator Tooltip</title>
    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
</head>
<body>
    <div id="range"></div>

    <script>
        var data = [
            { date: new Date(2023, 0, 1), value: 21 },
            { date: new Date(2023, 1, 1), value: 24 },
            { date: new Date(2023, 2, 1), value: 36 },
            { date: new Date(2023, 3, 1), value: 38 },
            { date: new Date(2023, 4, 1), value: 54 },
            { date: new Date(2023, 5, 1), value: 48 }
        ];

        var rangeNavigator = new ej.charts.RangeNavigator({
            valueType: 'DateTime',
            value: [
                new Date(2023, 1, 1),
                new Date(2023, 4, 1)
            ],
            tooltip: {
                enable: true,
                displayMode: 'Always',
                labelFormat: 'MMM d, yyyy'
            },
            series: [
                {
                    dataSource: data,
                    xName: 'date',
                    yName: 'value',
                    type: 'Area',
                    width: 2
                }
            ]
        });

        rangeNavigator.appendTo('#range');
    </script>
</body>
</html>
```

### Tooltip Appearance

Use `fill`, not `backgroundColor`, to configure the tooltip background.

```typescript
tooltip: {
    enable: true,
    displayMode: 'Always',
    fill: '#F3E5AB',
    opacity: 0.9,
    textStyle: {
        color: '#000000',
        size: '14px',
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: '400'
    }
}
```

The documented Range Navigator tooltip customization includes `enable`, `fill`, `opacity`, and `textStyle`.

Do not use this unsupported Chart-style configuration:

```typescript
tooltip: {
    backgroundColor: '#F3E5AB'
}
```

Use:

```typescript
tooltip: {
    fill: '#F3E5AB'
}
```

### Tooltip Display Mode

Use `displayMode` to control tooltip visibility.

Always display the slider tooltips:

```typescript
tooltip: {
    enable: true,
    displayMode: 'Always'
}
```

Display them during interaction:

```typescript
tooltip: {
    enable: true,
    displayMode: 'OnDemand'
}
```

### Tooltip Label Format

Use `labelFormat` to format the selected values displayed by the tooltip.

```typescript
tooltip: {
    enable: true,
    labelFormat: 'MMM d, yyyy'
}
```

Other DateTime format examples:

```typescript
tooltip: {
    enable: true,
    labelFormat: 'yMd'
}
```

```typescript
tooltip: {
    enable: true,
    labelFormat: 'MMM'
}
```

```typescript
tooltip: {
    enable: true,
    labelFormat: 'hm'
}
```

The Range Navigator tooltip does not use Chart point placeholders such as `{x}` and `{y}`. Its purpose is to show the slider selection values.

## Events and Callbacks

The two most important lifecycle and interaction events for this scenario are:

- `load`
- `loaded`
- `changed`

There is no `thumbMove` event in the EJ2 Range Navigator model.

Use `changed` with `enableDeferredUpdate: false` when continuous updates during dragging are required.

Use `changed` with `enableDeferredUpdate: true` when the update should occur only after dragging is completed.

### Changed Event

Import the event argument interface for a type-safe TypeScript handler:

```typescript
import {
    IChangedEventArgs
} from '@syncfusion/ej2-charts';
```

Configure the handler:

```typescript
const rangeNavigator: RangeNavigator = new RangeNavigator({
    changed: (args: IChangedEventArgs): void => {
        console.log('Start:', args.start);
        console.log('End:', args.end);
        console.log('Selected data:', args.selectedData);
        console.log('Selected period:', args.selectedPeriod);
        console.log('Zoom factor:', args.zoomFactor);
        console.log('Zoom position:', args.zoomPosition);
    }
});
```

### Load Event

The `load` event runs before rendering is completed and can be used to customize the component configuration before final rendering.

```typescript
import {
    ILoadEventArgs
} from '@syncfusion/ej2-charts';

const rangeNavigator: RangeNavigator = new RangeNavigator({
    load: (args: ILoadEventArgs): void => {
        console.log('Range Navigator is loading.');
    }
});
```

Do not perform export logic inside `load` as part of a basic range-selection example.

The original pattern was not appropriate:

```typescript
load: (args) => {
    args.rangeNavigator.export('PNG', 'chart');
}
```

Exporting during component loading is unrelated to selection behavior and may run before the component is in the intended rendered state.

### Loaded Event

The `loaded` event runs after the Range Navigator finishes rendering.

```typescript
const rangeNavigator: RangeNavigator = new RangeNavigator({
    loaded: (): void => {
        console.log('Range Navigator rendering completed.');
    }
});
```

Use `loaded` for logic that depends on the component having completed its initial render.

### Changed Event Arguments

The `IChangedEventArgs` interface includes these important values: 

#### start

The selected range start:

```typescript
args.start
```

Its type is:

```typescript
number | Date
```

#### end

The selected range end:

```typescript
args.end
```

Its type is:

```typescript
number | Date
```

#### selectedData

The data points contained within the selected range:

```typescript
args.selectedData
```

#### selectedPeriod

The text of the selected Period Selector item:

```typescript
args.selectedPeriod
```

#### zoomFactor

The selected range represented as a proportional zoom factor:

```typescript
args.zoomFactor
```

#### zoomPosition

The selected range starting position represented as a proportional zoom position:

```typescript
args.zoomPosition
```

#### cancel

Indicates the event cancellation status:

```typescript
args.cancel
```

Do not use:

```typescript
args.value
```

To reconstruct the selected range, use:

```typescript
const selectedRange = [
    args.start,
    args.end
];
```

## Handling Range Changes

### Filtering Data by the Selected Range

Use DateTime comparisons through `getTime()` for explicit, type-safe filtering.

```typescript
import {
    IChangedEventArgs
} from '@syncfusion/ej2-charts';

const handleRangeChange = (
    args: IChangedEventArgs
): void => {
    if (
        !(args.start instanceof Date) ||
        !(args.end instanceof Date)
    ) {
        return;
    }

    const startTime: number = args.start.getTime();
    const endTime: number = args.end.getTime();

    const filteredData: RangeData[] = data.filter(
        (item: RangeData): boolean => {
            const currentTime: number = item.date.getTime();

            return (
                currentTime >= startTime &&
                currentTime <= endTime
            );
        }
    );

    console.log(filteredData);
};
```

Register the handler:

```typescript
const rangeNavigator: RangeNavigator = new RangeNavigator({
    changed: handleRangeChange
});
```

### Synchronizing a Chart

The Range Navigator provides `zoomFactor` and `zoomPosition`, which can be applied to a related Chart x-axis.

Required Chart and Range Navigator modules must be imported and injected before either component is created.

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

Create the Chart first:

```typescript
const chart: Chart = new Chart({
    primaryXAxis: {
        valueType: 'DateTime'
    },
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

chart.appendTo('#chart');
```

Create the Range Navigator:

```typescript
const rangeNavigator: RangeNavigator = new RangeNavigator({
    valueType: 'DateTime',
    value: [
        new Date(2023, 1, 1),
        new Date(2023, 5, 1)
    ],
    enableDeferredUpdate: false,
    changed: (args: IChangedEventArgs): void => {
        chart.primaryXAxis.zoomFactor = args.zoomFactor;
        chart.primaryXAxis.zoomPosition = args.zoomPosition;
        chart.dataBind();
    },
    series: [
        {
            dataSource: data,
            xName: 'date',
            yName: 'value',
            type: 'Area'
        }
    ]
});

rangeNavigator.appendTo('#range');
```

This approach avoids repeatedly creating a new filtered datasource during slider movement.

### Validating the Selected Duration

For DateTime ranges, first verify that the event values are `Date` objects.

```typescript
const millisecondsPerDay: number =
    1000 * 60 * 60 * 24;

const handleRangeValidation = (
    args: IChangedEventArgs
): void => {
    if (
        !(args.start instanceof Date) ||
        !(args.end instanceof Date)
    ) {
        return;
    }

    const duration: number =
        args.end.getTime() - args.start.getTime();

    const rangeInDays: number =
        duration / millisecondsPerDay;

    if (rangeInDays > 365) {
        console.warn(
            'The selected range exceeds one year.'
        );
    }

    if (rangeInDays < 1) {
        console.warn(
            'The selected range is less than one day.'
        );
    }
};
```

To restore a valid range, guard against recursive event updates:

```typescript
let isRestoringRange: boolean = false;

const handleRangeValidation = (
    args: IChangedEventArgs
): void => {
    if (
        isRestoringRange ||
        !(args.start instanceof Date) ||
        !(args.end instanceof Date)
    ) {
        return;
    }

    const maximumDuration: number =
        365 * 24 * 60 * 60 * 1000;

    const selectedDuration: number =
        args.end.getTime() - args.start.getTime();

    if (selectedDuration <= maximumDuration) {
        return;
    }

    const adjustedStart: Date = new Date(
        args.end.getTime() - maximumDuration
    );

    isRestoringRange = true;

    rangeNavigator.value = [
        adjustedStart,
        args.end
    ];

    rangeNavigator.dataBind();

    isRestoringRange = false;
};
```

### Identifying Period Selection

Use `args.selectedPeriod` inside the `changed` event:

```typescript
const rangeNavigator: RangeNavigator = new RangeNavigator({
    periodSelectorSettings: {
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
                text: 'All'
            }
        ]
    },
    changed: (args: IChangedEventArgs): void => {
        if (args.selectedPeriod) {
            console.log(
                'Selected period:',
                args.selectedPeriod
            );
        }

        loadReportForPeriod(
            args.start,
            args.end
        );
    }
});
```

The `changed` event is used for Period Selector changes. A separate period-button-click event is not required for this workflow.

## Complete TypeScript Example

The following example combines:

- DateTime data
- Area series
- Initial range selection
- Programmatic range updates
- Range Tooltip
- Period Selector
- Deferred range updates
- Snapping
- `changed`, `load`, and `loaded` events
- Selected range reporting
- Correct imports and module injection

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Range Selection and User Interaction</title>

    <style>
        body {
            font-family: "Segoe UI", sans-serif;
            margin: 24px;
        }

        #container {
            width: 100%;
            min-height: 360px;
        }

        .configuration-panel {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
        }

        #selection-output {
            margin-top: 16px;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div id="container">
        <div class="configuration-panel">
            <button
                id="update-range"
                type="button"
            >
                Select March to September
            </button>

            <button
                id="reset-range"
                type="button"
            >
                Reset Selection
            </button>
        </div>

        <div id="range"></div>

        <div
            id="selection-output"
            aria-live="polite"
        ></div>
    </div>

   <script scr="index.js"></script>
</body>
</html>
```

### index.ts

```typescript
import {
    AreaSeries,
    DateTime,
    IChangedEventArgs,
    ILoadEventArgs,
    PeriodSelector,
    RangeNavigator,
    RangeTooltip
} from '@syncfusion/ej2-charts';

interface RangeData {
    date: Date;
    value: number;
}

RangeNavigator.Inject(
    AreaSeries,
    DateTime,
    PeriodSelector,
    RangeTooltip
);

const data: RangeData[] = [
    { date: new Date(2022, 0, 1), value: 21 },
    { date: new Date(2022, 1, 1), value: 24 },
    { date: new Date(2022, 2, 1), value: 36 },
    { date: new Date(2022, 3, 1), value: 38 },
    { date: new Date(2022, 4, 1), value: 54 },
    { date: new Date(2022, 5, 1), value: 48 },
    { date: new Date(2022, 6, 1), value: 62 },
    { date: new Date(2022, 7, 1), value: 58 },
    { date: new Date(2022, 8, 1), value: 70 },
    { date: new Date(2022, 9, 1), value: 76 },
    { date: new Date(2022, 10, 1), value: 72 },
    { date: new Date(2022, 11, 1), value: 85 },
    { date: new Date(2023, 0, 1), value: 82 },
    { date: new Date(2023, 1, 1), value: 88 },
    { date: new Date(2023, 2, 1), value: 91 },
    { date: new Date(2023, 3, 1), value: 95 },
    { date: new Date(2023, 4, 1), value: 90 },
    { date: new Date(2023, 5, 1), value: 98 },
    { date: new Date(2023, 6, 1), value: 102 },
    { date: new Date(2023, 7, 1), value: 99 },
    { date: new Date(2023, 8, 1), value: 108 },
    { date: new Date(2023, 9, 1), value: 112 },
    { date: new Date(2023, 10, 1), value: 109 },
    { date: new Date(2023, 11, 1), value: 118 }
];

const initialStart: Date =
    new Date(2023, 0, 1);

const initialEnd: Date =
    new Date(2023, 11, 1);

const selectionOutput: HTMLElement | null =
    document.querySelector('#selection-output');

const formatDate = (value: Date): string => {
    return new Intl.DateTimeFormat(
        'en-US',
        {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }
    ).format(value);
};

const displaySelection = (
    args: IChangedEventArgs
): void => {
    if (
        !selectionOutput ||
        !(args.start instanceof Date) ||
        !(args.end instanceof Date)
    ) {
        return;
    }

    const periodText: string =
        args.selectedPeriod || 'Custom range';

    selectionOutput.textContent =
        `Start: ${formatDate(args.start)} | ` +
        `End: ${formatDate(args.end)} | ` +
        `Period: ${periodText} | ` +
        `Selected points: ${args.selectedData.length}`;
};

const rangeNavigator: RangeNavigator =
    new RangeNavigator({
        valueType: 'DateTime',
        value: [
            initialStart,
            initialEnd
        ],
        intervalType: 'Months',
        interval: 1,
        labelFormat: 'MMM-yy',
        allowSnapping: true,
        enableDeferredUpdate: true,
        tooltip: {
            enable: true,
            displayMode: 'Always',
            fill: '#1F2937',
            opacity: 0.9,
            labelFormat: 'MMM d, yyyy',
            textStyle: {
                color: '#FFFFFF',
                size: '12px',
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: '400'
            }
        },
        periodSelectorSettings: {
            position: 'Top',
            height: 43,
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
                    intervalType: 'Months'
                },
                {
                    text: '1Y',
                    interval: 1,
                    intervalType: 'Years',
                    selected: true
                },
                {
                    text: 'YTD'
                },
                {
                    text: 'All'
                }
            ]
        },
        series: [
            {
                dataSource: data,
                xName: 'date',
                yName: 'value',
                type: 'Area',
                fill: '#4472C4',
                width: 2
            }
        ],
        load: (_args: ILoadEventArgs): void => {
            console.log(
                'Range Navigator is loading.'
            );
        },
        loaded: (): void => {
            console.log(
                'Range Navigator rendering completed.'
            );
        },
        changed: (
            args: IChangedEventArgs
        ): void => {
            displaySelection(args);

            console.log('Start:', args.start);
            console.log('End:', args.end);
            console.log(
                'Selected period:',
                args.selectedPeriod
            );
            console.log(
                'Selected data:',
                args.selectedData
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
    });

rangeNavigator.appendTo('#range');

const updateRangeButton: HTMLButtonElement | null =
    document.querySelector('#update-range');

if (updateRangeButton) {
    updateRangeButton.addEventListener(
        'click',
        (): void => {
            rangeNavigator.value = [
                new Date(2023, 2, 1),
                new Date(2023, 8, 1)
            ];

            rangeNavigator.dataBind();
        }
    );
}

const resetRangeButton: HTMLButtonElement | null =
    document.querySelector('#reset-range');

if (resetRangeButton) {
    resetRangeButton.addEventListener(
        'click',
        (): void => {
            rangeNavigator.value = [
                initialStart,
                initialEnd
            ];

            rangeNavigator.dataBind();
        }
    );
}
```

## Complete JavaScript Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Range Selection and User Interaction</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

    <style>
        body {
            font-family: "Segoe UI", sans-serif;
            margin: 24px;
        }

        #container {
            width: 100%;
            min-height: 360px;
        }

        .configuration-panel {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
        }

        #selection-output {
            margin-top: 16px;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div id="container">
        <div class="configuration-panel">
            <button
                id="update-range"
                type="button"
            >
                Select March to September
            </button>

            <button
                id="reset-range"
                type="button"
            >
                Reset Selection
            </button>
        </div>

        <div id="range"></div>

        <div
            id="selection-output"
            aria-live="polite"
        ></div>
    </div>

    <script>
        var data = [
            { date: new Date(2022, 0, 1), value: 21 },
            { date: new Date(2022, 1, 1), value: 24 },
            { date: new Date(2022, 2, 1), value: 36 },
            { date: new Date(2022, 3, 1), value: 38 },
            { date: new Date(2022, 4, 1), value: 54 },
            { date: new Date(2022, 5, 1), value: 48 },
            { date: new Date(2022, 6, 1), value: 62 },
            { date: new Date(2022, 7, 1), value: 58 },
            { date: new Date(2022, 8, 1), value: 70 },
            { date: new Date(2022, 9, 1), value: 76 },
            { date: new Date(2022, 10, 1), value: 72 },
            { date: new Date(2022, 11, 1), value: 85 },
            { date: new Date(2023, 0, 1), value: 82 },
            { date: new Date(2023, 1, 1), value: 88 },
            { date: new Date(2023, 2, 1), value: 91 },
            { date: new Date(2023, 3, 1), value: 95 },
            { date: new Date(2023, 4, 1), value: 90 },
            { date: new Date(2023, 5, 1), value: 98 },
            { date: new Date(2023, 6, 1), value: 102 },
            { date: new Date(2023, 7, 1), value: 99 },
            { date: new Date(2023, 8, 1), value: 108 },
            { date: new Date(2023, 9, 1), value: 112 },
            { date: new Date(2023, 10, 1), value: 109 },
            { date: new Date(2023, 11, 1), value: 118 }
        ];

        var initialStart =
            new Date(2023, 0, 1);

        var initialEnd =
            new Date(2023, 11, 1);

        var selectionOutput =
            document.querySelector('#selection-output');

        function formatDate(value) {
            return new Intl.DateTimeFormat(
                'en-US',
                {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }
            ).format(value);
        }

        function displaySelection(args) {
            if (
                !selectionOutput ||
                !(args.start instanceof Date) ||
                !(args.end instanceof Date)
            ) {
                return;
            }

            var periodText =
                args.selectedPeriod || 'Custom range';

            selectionOutput.textContent =
                'Start: ' + formatDate(args.start) +
                ' | End: ' + formatDate(args.end) +
                ' | Period: ' + periodText +
                ' | Selected points: ' +
                args.selectedData.length;
        }

        var rangeNavigator =
            new ej.charts.RangeNavigator({
                valueType: 'DateTime',
                value: [
                    initialStart,
                    initialEnd
                ],
                intervalType: 'Months',
                interval: 1,
                labelFormat: 'MMM-yy',
                allowSnapping: true,
                enableDeferredUpdate: true,
                tooltip: {
                    enable: true,
                    displayMode: 'Always',
                    fill: '#1F2937',
                    opacity: 0.9,
                    labelFormat: 'MMM d, yyyy',
                    textStyle: {
                        color: '#FFFFFF',
                        size: '12px',
                        fontFamily: 'Segoe UI',
                        fontStyle: 'Normal',
                        fontWeight: '400'
                    }
                },
                periodSelectorSettings: {
                    position: 'Top',
                    height: 43,
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
                            intervalType: 'Months'
                        },
                        {
                            text: '1Y',
                            interval: 1,
                            intervalType: 'Years',
                            selected: true
                        },
                        {
                            text: 'YTD'
                        },
                        {
                            text: 'All'
                        }
                    ]
                },
                series: [
                    {
                        dataSource: data,
                        xName: 'date',
                        yName: 'value',
                        type: 'Area',
                        fill: '#4472C4',
                        width: 2
                    }
                ],
                load: function () {
                    console.log(
                        'Range Navigator is loading.'
                    );
                },
                loaded: function () {
                    console.log(
                        'Range Navigator rendering completed.'
                    );
                },
                changed: function (args) {
                    displaySelection(args);

                    console.log('Start:', args.start);
                    console.log('End:', args.end);
                    console.log(
                        'Selected period:',
                        args.selectedPeriod
                    );
                    console.log(
                        'Selected data:',
                        args.selectedData
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
            });

        rangeNavigator.appendTo('#range');

        var updateRangeButton =
            document.querySelector('#update-range');

        if (updateRangeButton) {
            updateRangeButton.addEventListener(
                'click',
                function () {
                    rangeNavigator.value = [
                        new Date(2023, 2, 1),
                        new Date(2023, 8, 1)
                    ];

                    rangeNavigator.dataBind();
                }
            );
        }

        var resetRangeButton =
            document.querySelector('#reset-range');

        if (resetRangeButton) {
            resetRangeButton.addEventListener(
                'click',
                function () {
                    rangeNavigator.value = [
                        initialStart,
                        initialEnd
                    ];

                    rangeNavigator.dataBind();
                }
            );
        }
    </script>
</body>
</html>
```

## Combined Mistakes and Future References

### Using Numeric as valueType

Incorrect:

```typescript
valueType: 'Numeric'
```

Correct:

```typescript
valueType: 'Double'
```

### Missing PeriodSelector Injection

Incorrect:

```typescript
import {
    AreaSeries,
    DateTime,
    RangeNavigator
} from '@syncfusion/ej2-charts';

RangeNavigator.Inject(
    AreaSeries,
    DateTime
);
```

The preceding injection is incomplete when `periodSelectorSettings` is configured.

Correct:

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

### Missing RangeTooltip Injection

Incorrect:

```typescript
RangeNavigator.Inject(
    AreaSeries,
    DateTime
);
```

```typescript
tooltip: {
    enable: true
}
```

Correct:

```typescript
import {
    RangeTooltip
} from '@syncfusion/ej2-charts';

RangeNavigator.Inject(
    AreaSeries,
    DateTime,
    RangeTooltip
);
```

### Incorrect Tooltip Background Property

Incorrect:

```typescript
tooltip: {
    backgroundColor: '#F3E5AB'
}
```

Correct:

```typescript
tooltip: {
    fill: '#F3E5AB'
}
```

### Treating the Tooltip as a Point Tooltip

Incorrect assumption:

```typescript
tooltip: {
    format: '{x}: {y}'
}
```

The Range Navigator tooltip displays slider selection values.

Use:

```typescript
tooltip: {
    enable: true,
    labelFormat: 'MMM d, yyyy'
}
```

### Using args.value

Incorrect:

```typescript
changed: (args) => {
    console.log(args.value);
}
```

Correct:

```typescript
changed: (
    args: IChangedEventArgs
): void => {
    console.log(args.start);
    console.log(args.end);
}
```

If an array is required:

```typescript
const selectedRange = [
    args.start,
    args.end
];
```

### Using thumbMove

Incorrect:

```typescript
thumbMove: (args) => {
    console.log(args.start, args.end);
}
```

Use `changed`.

For continuous updates:

```typescript
enableDeferredUpdate: false,
changed: (
    args: IChangedEventArgs
): void => {
    console.log(args.start, args.end);
}
```

For an update after dragging finishes:

```typescript
enableDeferredUpdate: true,
changed: (
    args: IChangedEventArgs
): void => {
    console.log(args.start, args.end);
}
```

### Using enabled to Disable Interaction

Incorrect:

```typescript
enabled: false
```

The Range Navigator does not expose this property.

Do not replace it with `disableRangeSelector` unless the requirement is to hide the slider and show only the Period Selector.

```typescript
disableRangeSelector: true
```

### Misunderstanding disableRangeSelector

`disableRangeSelector` does not make the displayed slider read-only.

It removes the Range Navigator slider and allows the Period Selector to be rendered independently.

### Invalid Special Period Labels

This configuration does not automatically mean the current calendar day:

```typescript
{
    text: 'Today',
    interval: 1,
    intervalType: 'Days'
}
```

It defines a one-day period button with custom text.

For standard special periods, use:

```typescript
{
    text: 'YTD'
}
```

```typescript
{
    text: 'All'
}
```

### Invalid This Week or This Month Assumption

This configuration creates an interval of one week:

```typescript
{
    text: 'This Week',
    interval: 1,
    intervalType: 'Weeks'
}
```

The text does not add special calendar-boundary behavior.

Use clear labels such as:

```typescript
{
    text: '1W',
    interval: 1,
    intervalType: 'Weeks'
}
```

### Event Handler Assigned After Initialization

Avoid mutating event properties after rendering unless there is a specific need.

Less clear:

```typescript
rangeNavigator.changed = (
    args: IChangedEventArgs
): void => {
    console.log(args.start, args.end);
};
```

Preferred:

```typescript
const rangeNavigator: RangeNavigator =
    new RangeNavigator({
        changed: (
            args: IChangedEventArgs
        ): void => {
            console.log(
                args.start,
                args.end
            );
        }
    });
```

### Exporting During load

Avoid:

```typescript
load: (args) => {
    args.rangeNavigator.export(
        'PNG',
        'chart'
    );
}
```

The `load` event occurs as the component is being prepared. Export behavior is unrelated to basic range selection and should be triggered explicitly after rendering when required.

### Date Arithmetic Without Type Validation

Unsafe:

```typescript
const rangeInDays =
    (args.end - args.start) /
    (1000 * 60 * 60 * 24);
```

Type-safe:

```typescript
if (
    args.start instanceof Date &&
    args.end instanceof Date
) {
    const rangeInDays: number =
        (
            args.end.getTime() -
            args.start.getTime()
        ) /
        (1000 * 60 * 60 * 24);
}
```

### Updating value Without dataBind

Incomplete:

```typescript
rangeNavigator.value = [
    new Date(2023, 2, 1),
    new Date(2023, 5, 1)
];
```

Correct:

```typescript
rangeNavigator.value = [
    new Date(2023, 2, 1),
    new Date(2023, 5, 1)
];

rangeNavigator.dataBind();
```

### Using Date Strings

Avoid environment-dependent date parsing:

```typescript
value: [
    new Date('01/02/2023'),
    new Date('06/02/2023')
]
```

Use explicit numeric Date construction:

```typescript
value: [
    new Date(2023, 0, 2),
    new Date(2023, 5, 2)
]
```

### Import and Injection Validation Checklist

Before generating or running a Range Navigator interaction example, verify:

1. `RangeNavigator` is imported from `@syncfusion/ej2-charts`.
2. The configured series module is imported.
3. The configured series module is passed to `RangeNavigator.Inject(...)`.
4. `DateTime` is imported and injected when `valueType` is `DateTime`.
5. `Category` is imported and injected when `valueType` is `Category`.
6. `Logarithmic` is imported and injected when `valueType` is `Logarithmic`.
7. No axis module is required for `Double`.
8. `PeriodSelector` is imported and injected when `periodSelectorSettings` is used.
9. `RangeTooltip` is imported and injected when `tooltip.enable` is true.
10. `value` contains values compatible with `valueType`.
11. `DateTime` values are JavaScript `Date` objects.
12. `valueType: 'Double'` is used for numeric x-values.
13. `changed` is used for range-change processing.
14. `enableDeferredUpdate` is selected based on the required event frequency.
15. `args.start` and `args.end` are used instead of `args.value`.
16. `args.selectedPeriod` is used to identify a Period Selector choice.
17. `args.selectedData` is used when the selected records are required.
18. `args.zoomFactor` and `args.zoomPosition` are used for Chart synchronization.
19. Tooltip background customization uses `fill`.
20. Tooltip date formatting uses `labelFormat`.
21. `thumbMove` is not used.
22. `enabled: false` is not used.
23. `disableRangeSelector` is used only when the slider must be hidden.
24. Programmatic property updates are followed by `dataBind()`.
25. The Range Navigator is attached to an existing HTML element.
26. TypeScript handlers use the relevant event argument interfaces.
27. JavaScript CDN examples use `ej.charts.RangeNavigator`.
28. Vue, Angular, React, Composition API, provider, and directive syntax are not used.