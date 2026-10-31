# Customization and Styling

## Overview

The EJ2 Range Navigator provides configuration options for axis lines, labels, series appearance, slider regions, thumbs, borders, themes, dimensions, right-to-left rendering, and responsive behavior.

The following technical corrections have been applied to the original material:

- `majorGridLines` and `majorTickLines` are supported.
- `minorGridLines` and `minorTickLines` are not Range Navigator properties.
- `labelPosition` supports `Inside` and `Outside`.
- `navigatorStyleSettings` controls the selected region, unselected region, and slider thumbs.
- `navigatorBorder` controls the outer Range Navigator border.
- `enableLightweightMode` is not a supported Range Navigator property.
- Range Navigator series do not support Chart-series properties such as `marker` or `opacity`.
- The Range Navigator tooltip uses `fill`, not `backgroundColor`.
- The tooltip requires the `RangeTooltip` module.
- The Period Selector requires the `PeriodSelector` module.
- `periodSelectorSettings.visible` is not supported.
- To hide the Period Selector responsively, update its configuration or recreate the component without periods.
- `enableRtl` enables right-to-left rendering.
- The component supports percentage-based width and height configuration.
- Resize handling should be debounced when `refresh()` is called manually.

The supported customization model includes `majorGridLines`, `majorTickLines`, `labelFormat`, `labelPosition`, `labelStyle`, `navigatorStyleSettings`, `navigatorBorder`, `background`, `theme`, `enableRtl`, `width`, and `height`.

## Table of Contents

- #grid-and-tick-lines
  - #major-grid-lines
  - #major-tick-lines
  - #hide-grid-and-tick-lines
- #label-customization
  - #label-format
  - #datetime-label-formats
  - #numeric-label-formats
  - #label-position
  - #label-style
  - #smart-labels
  - #grouped-labels
- #colors-and-themes
  - #theme-configuration
  - #series-colors
  - #selected-and-unselected-regions
  - #thumb-customization
  - #navigator-border
  - #background
- #performance-configuration
  - #animation
  - #deferred-updates
  - #large-dataset-guidance
- #rtl-support
  - #typescript-rtl-configuration
  - #javascript-rtl-configuration
- #responsive-design
  - #responsive-container
  - #responsive-typescript-configuration
  - #responsive-javascript-configuration
  - #debounced-resize-handling
  - #responsive-period-selector
- #complete-typescript-example
- #complete-javascript-example
- #combined-mistakes-and-future-references

## Grid and Tick Lines

The Range Navigator axis supports major grid-line and major tick-line customization.

Use:

```typescript
majorGridLines: {
    width: 1,
    color: '#D1D5DB',
    dashArray: '4,4'
},
majorTickLines: {
    width: 1,
    height: 6,
    color: '#6B7280'
}
```

Do not use `minorGridLines` or `minorTickLines` because they are not Range Navigator configuration properties.

### Major Grid Lines

The `majorGridLines` property controls the lines that extend from major axis intervals.

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
    intervalType: 'Months',
    interval: 1,
    labelFormat: 'MMM-yy',
    majorGridLines: {
        width: 1,
        color: '#D1D5DB',
        dashArray: '5,5'
    },
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

rangeNavigator.appendTo('#range');
```

The main properties are:

```typescript
majorGridLines: {
    width: 1,
    color: '#D1D5DB',
    dashArray: '5,5'
}
```

- `width` controls line thickness.
- `color` defines the CSS color.
- `dashArray` defines the repeating dash and gap pattern.

### Major Tick Lines

The `majorTickLines` property controls tick marks associated with major axis intervals.

```typescript
majorTickLines: {
    width: 1,
    height: 8,
    color: '#374151'
}
```

- `width` controls tick-line thickness.
- `height` controls tick-line length.
- `color` defines the tick-line color.

Complete configuration:

```typescript
const rangeNavigator: RangeNavigator = new RangeNavigator({
    valueType: 'DateTime',
    majorGridLines: {
        width: 1,
        color: '#E5E7EB',
        dashArray: '4,4'
    },
    majorTickLines: {
        width: 1,
        height: 8,
        color: '#4B5563'
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
```

### Hide Grid and Tick Lines

Set their widths to zero:

```typescript
majorGridLines: {
    width: 0
},
majorTickLines: {
    width: 0
}
```

Do not include unsupported minor-line configurations:

```typescript
minorGridLines: {
    width: 0
},
minorTickLines: {
    width: 0
}
```

## Label Customization

The Range Navigator provides settings for:

- Label text formatting
- Label position
- Font styling
- Label-overlap handling
- DateTime interval grouping
- Multi-level labels

Label positioning and overlap behavior are controlled through properties such as `labelPosition` and `labelIntersectAction`.

### Label Format

For a DateTime axis:

```typescript
const rangeNavigator: RangeNavigator = new RangeNavigator({
    valueType: 'DateTime',
    labelFormat: 'MMM-yy',
    series: [
        {
            dataSource: data,
            xName: 'date',
            yName: 'value',
            type: 'Area'
        }
    ]
});
```

For a Double axis:

```typescript
const rangeNavigator: RangeNavigator = new RangeNavigator({
    valueType: 'Double',
    labelFormat: '{value}%',
    series: [
        {
            dataSource: numericData,
            xName: 'x',
            yName: 'y',
            type: 'Line'
        }
    ]
});
```

The `{value}` placeholder represents the calculated axis label value.

### DateTime Label Formats

Common DateTime formats include:

```text
MMM-yy
MMM yyyy
MMM
MMMM
y
yMd
dd/MM/yyyy
d
hm
hms
```

Examples:

```typescript
labelFormat: 'MMM-yy'
```

Possible output:

```text
Jan-23
Feb-23
Mar-23
```

```typescript
labelFormat: 'MMM yyyy'
```

Possible output:

```text
Jan 2023
Feb 2023
Mar 2023
```

```typescript
labelFormat: 'yMd'
```

Possible output depends on the configured locale.

Use standard internationalization formats when locale-aware output is required.

### Numeric Label Formats

Plain value:

```typescript
labelFormat: '{value}'
```

Percentage suffix:

```typescript
labelFormat: '{value}%'
```

Currency prefix:

```typescript
labelFormat: '${value}'
```

Millions suffix:

```typescript
labelFormat: '${value}M'
```

Temperature suffix:

```typescript
labelFormat: '{value}°C'
```

### Label Position

The `labelPosition` property supports:

```text
Inside
Outside
```

Outside positioning:

```typescript
labelPosition: 'Outside'
```

Inside positioning:

```typescript
labelPosition: 'Inside'
```

Labels are positioned outside the Range Navigator by default.

Example:

```typescript
const rangeNavigator: RangeNavigator = new RangeNavigator({
    valueType: 'DateTime',
    labelPosition: 'Inside',
    labelFormat: 'MMM-yy',
    series: [
        {
            dataSource: data,
            xName: 'date',
            yName: 'value',
            type: 'Area'
        }
    ]
});
```

### Label Style

Use `labelStyle` to configure font appearance.

```typescript
labelStyle: {
    size: '14px',
    color: '#1F2937',
    fontFamily: 'Segoe UI',
    fontStyle: 'Normal',
    fontWeight: '600',
    opacity: 1
}
```

Complete example:

```typescript
const rangeNavigator: RangeNavigator = new RangeNavigator({
    valueType: 'DateTime',
    labelFormat: 'MMM-yy',
    labelPosition: 'Outside',
    labelStyle: {
        size: '14px',
        color: '#1F2937',
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: '600',
        opacity: 1
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
```

### Smart Labels

Use `labelIntersectAction` to control overlapping labels.

Hide overlapping labels:

```typescript
labelIntersectAction: 'Hide'
```

Display all calculated labels:

```typescript
labelIntersectAction: 'None'
```

Example:

```typescript
const rangeNavigator: RangeNavigator = new RangeNavigator({
    valueType: 'DateTime',
    labelFormat: 'MMM-yy',
    labelIntersectAction: 'Hide',
    series: [
        {
            dataSource: data,
            xName: 'date',
            yName: 'value',
            type: 'Area'
        }
    ]
});
```

`Hide` is useful for responsive layouts and dense datasets.

### Grouped Labels

DateTime labels can be grouped into a second level.

Enable grouping:

```typescript
enableGrouping: true
```

Set the first-level interval:

```typescript
intervalType: 'Months'
```

Set the second-level grouping interval:

```typescript
groupBy: 'Years'
```

Complete example:

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
    intervalType: 'Months',
    groupBy: 'Years',
    enableGrouping: true,
    labelPosition: 'Outside',
    value: [
        new Date(2022, 3, 1),
        new Date(2023, 8, 1)
    ],
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

Supported DateTime interval types include:

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

Grouped labels are intended for DateTime axes.

## Colors and Themes

The component appearance can be controlled through:

- `theme`
- `background`
- Series `fill`
- Series `border`
- `navigatorStyleSettings`
- `navigatorBorder`
- Tooltip `fill`
- Label and grid-line colors

### Theme Configuration

Set the theme using the `theme` property:

```typescript
theme: 'Material'
```

Other theme names depend on the installed EJ2 version.

Examples commonly include:

```typescript
theme: 'Material'
```

```typescript
theme: 'Bootstrap5'
```

```typescript
theme: 'Fluent2'
```

```typescript
theme: 'Tailwind3'
```

```typescript
theme: 'HighContrast'
```

The configured theme property must correspond.

For example:

```typescript
theme: 'Material'
```

Do not load theme stylesheet while configuring an theme unless that is intentional for other component.

### Series Colors

Use `fill` to define the series color:

```typescript
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
```

Use `border` to configure the series border:

```typescript
series: [
    {
        dataSource: data,
        xName: 'date',
        yName: 'value',
        type: 'Area',
        fill: '#60A5FA',
        border: {
            color: '#1D4ED8',
            width: 2
        }
    }
]
```

Range Navigator series support properties such as:

```text
animation
border
dashArray
dataSource
fill
query
type
width
xName
yName
```

Do not copy unsupported regular Chart-series settings such as `marker` and `opacity` into the Range Navigator series model.

### Selected and Unselected Regions

Use `navigatorStyleSettings` to customize the slider regions.

```typescript
navigatorStyleSettings: {
    selectedRegionColor: 'rgba(37, 99, 235, 0.20)',
    unselectedRegionColor: 'rgba(148, 163, 184, 0.28)'
}
```

- `selectedRegionColor` controls the region between the two thumbs.
- `unselectedRegionColor` controls the regions outside the selected range.

Example:

```typescript
const rangeNavigator: RangeNavigator = new RangeNavigator({
    navigatorStyleSettings: {
        selectedRegionColor: 'rgba(37, 99, 235, 0.20)',
        unselectedRegionColor: 'rgba(148, 163, 184, 0.28)'
    },
    series: [
        {
            dataSource: data,
            xName: 'date',
            yName: 'value',
            type: 'Area',
            fill: '#2563EB'
        }
    ]
});
```

These properties are the supported way to customize selection-region colors.

### Thumb Customization

Thumb settings are configured inside `navigatorStyleSettings`.

Circle thumb:

```typescript
navigatorStyleSettings: {
    thumb: {
        type: 'Circle',
        radius: 10,
        fill: '#FFFFFF',
        border: {
            color: '#2563EB',
            width: 2
        }
    }
}
```

Rectangle thumb:

```typescript
navigatorStyleSettings: {
    thumb: {
        type: 'Rectangle',
        width: 14,
        height: 24,
        fill: '#FFFFFF',
        border: {
            color: '#2563EB',
            width: 2
        }
    }
}
```

Supported thumb types are:

```text
Circle
Rectangle
```

Thumb fill, border, size, and shape can be customized through `navigatorStyleSettings.thumb`.

### Navigator Border

Use `navigatorBorder` to style the outer component border:

```typescript
navigatorBorder: {
    color: '#CBD5E1',
    width: 1
}
```

Example:

```typescript
const rangeNavigator: RangeNavigator = new RangeNavigator({
    navigatorBorder: {
        color: '#64748B',
        width: 2
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
```

The `navigatorBorder` property controls the Range Navigator border rather than the series border.

### Background

Use `background` to configure the component background:

```typescript
background: '#FFFFFF'
```

Transparent background:

```typescript
background: 'transparent'
```

Example:

```typescript
const rangeNavigator: RangeNavigator = new RangeNavigator({
    background: '#F8FAFC',
    navigatorBorder: {
        color: '#CBD5E1',
        width: 1
    },
    series: [
        {
            dataSource: data,
            xName: 'date',
            yName: 'value',
            type: 'Area',
            fill: '#2563EB'
        }
    ]
});
```

## Performance Configuration

The Range Navigator does not expose an `enableLightweightMode` property.

Do not use:

```typescript
enableLightweightMode: true
```

Instead, optimize performance through:

- Reduced animation duration
- Deferred range-change updates
- Data aggregation
- Data sampling
- Server-side filtering
- Restricting the displayed interval
- Avoiding unnecessary `refresh()` calls
- Debouncing resize handlers
- Avoiding expensive work during continuous dragging

### Animation

Use `animationDuration` to control component animation duration:

```typescript
animationDuration: 0
```

Disable series animation explicitly:

```typescript
series: [
    {
        dataSource: data,
        xName: 'date',
        yName: 'value',
        type: 'Area',
        animation: {
            enable: false,
            duration: 0
        }
    }
]
```

Performance-oriented configuration:

```typescript
const rangeNavigator: RangeNavigator = new RangeNavigator({
    animationDuration: 0,
    series: [
        {
            dataSource: largeDataset,
            xName: 'date',
            yName: 'value',
            type: 'Area',
            animation: {
                enable: false,
                duration: 0
            }
        }
    ]
});
```

### Deferred Updates

Set `enableDeferredUpdate` to `true` when the `changed` event performs expensive work:

```typescript
enableDeferredUpdate: true
```

When enabled, the `changed` event is triggered after the user completes the slider drag rather than continuously during movement.

```typescript
const rangeNavigator: RangeNavigator = new RangeNavigator({
    enableDeferredUpdate: true,
    changed: (args): void => {
        updateRelatedComponents(
            args.start,
            args.end
        );
    }
});
```

### Large Dataset Guidance

Do not assume that a specific number of points, such as 100,000 or 1,000,000, is universally safe. Performance depends on:

- Browser
- Device
- Point density
- Series type
- Event logic
- Responsive resizing
- Animation
- Tooltip usage
- Data transformation
- Other controls on the page

For very large datasets, aggregate data before binding:

```typescript
interface RangeData {
    date: Date;
    value: number;
}

const aggregateByInterval = (
    source: RangeData[],
    intervalSize: number
): RangeData[] => {
    const result: RangeData[] = [];

    for (
        let index: number = 0;
        index < source.length;
        index += intervalSize
    ) {
        const group: RangeData[] =
            source.slice(
                index,
                index + intervalSize
            );

        if (group.length === 0) {
            continue;
        }

        const total: number = group.reduce(
            (
                sum: number,
                item: RangeData
            ): number => {
                return sum + item.value;
            },
            0
        );

        result.push({
            date: group[0].date,
            value: total / group.length
        });
    }

    return result;
};
```

Bind the aggregated collection:

```typescript
const optimizedData: RangeData[] =
    aggregateByInterval(
        largeDataset,
        10
    );
```

## RTL Support

Set `enableRtl` to `true` for right-to-left rendering:

```typescript
enableRtl: true
```

The Range Navigator model supports `enableRtl` for right-to-left component rendering.

The document direction can also be set at HTML level:

```html
<html lang="ar" dir="rtl">
```

Use both when the entire page is right-to-left:

```html
<html lang="ar" dir="rtl">
```

```typescript
enableRtl: true
```

### TypeScript RTL Configuration

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

const rangeNavigator: RangeNavigator =
    new RangeNavigator({
        enableRtl: true,
        valueType: 'DateTime',
        value: [
            new Date(2023, 2, 1),
            new Date(2023, 9, 1)
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
                fill: '#2563EB'
            }
        ]
    });

rangeNavigator.appendTo('#range');
```

`PeriodSelector` is included because `periodSelectorSettings` is configured.

### JavaScript RTL Configuration

```javascript
var rangeNavigator =
    new ej.charts.RangeNavigator({
        enableRtl: true,
        valueType: 'DateTime',
        value: [
            new Date(2023, 2, 1),
            new Date(2023, 9, 1)
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
                fill: '#2563EB'
            }
        ]
    });

rangeNavigator.appendTo('#range');
```

## Responsive Design

Use a responsive parent container and percentage-based component width.

The parent must have an available width when the Range Navigator is rendered.

### Responsive Container

```html
<div class="range-container">
    <div id="range"></div>
</div>
```

```css
.range-container {
    width: 100%;
    max-width: 1200px;
    min-height: 250px;
    margin: 0 auto;
}
```

Component configuration:

```typescript
width: '100%',
height: '250px'
```

### Responsive TypeScript Configuration

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

const isSmallScreen = (): boolean => {
    return window.matchMedia(
        '(max-width: 767px)'
    ).matches;
};

const rangeNavigator: RangeNavigator =
    new RangeNavigator({
        width: '100%',
        height: isSmallScreen()
            ? '180px'
            : '250px',
        valueType: 'DateTime',
        labelFormat: isSmallScreen()
            ? 'MMM'
            : 'MMM-yy',
        labelIntersectAction: 'Hide',
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

rangeNavigator.appendTo('#range');
```

### Responsive JavaScript Configuration

```javascript
function isSmallScreen() {
    return window.matchMedia(
        '(max-width: 767px)'
    ).matches;
}

var rangeNavigator =
    new ej.charts.RangeNavigator({
        width: '100%',
        height: isSmallScreen()
            ? '180px'
            : '250px',
        valueType: 'DateTime',
        labelFormat: isSmallScreen()
            ? 'MMM'
            : 'MMM-yy',
        labelIntersectAction: 'Hide',
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

rangeNavigator.appendTo('#range');
```

### Debounced Resize Handling

Avoid calling `refresh()` for every raw resize event.

TypeScript:

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
                const mobile: boolean =
                    window.matchMedia(
                        '(max-width: 767px)'
                    ).matches;

                rangeNavigator.height =
                    mobile
                        ? '180px'
                        : '250px';

                rangeNavigator.labelFormat =
                    mobile
                        ? 'MMM'
                        : 'MMM-yy';

                rangeNavigator.refresh();
            },
            150
        );
    }
);
```

JavaScript:

```javascript
var resizeTimer;

window.addEventListener(
    'resize',
    function () {
        window.clearTimeout(resizeTimer);

        resizeTimer = window.setTimeout(
            function () {
                var mobile =
                    window.matchMedia(
                        '(max-width: 767px)'
                    ).matches;

                rangeNavigator.height =
                    mobile
                        ? '180px'
                        : '250px';

                rangeNavigator.labelFormat =
                    mobile
                        ? 'MMM'
                        : 'MMM-yy';

                rangeNavigator.refresh();
            },
            150
        );
    }
);
```

### Responsive Period Selector

This configuration is invalid:

```typescript
periodSelectorSettings: {
    visible: false
}
```

`periodSelectorSettings` does not expose a `visible` property.

A support-safe approach is to define different period collections for desktop and mobile.

```typescript
import {
    PeriodsModel
} from '@syncfusion/ej2-charts';

const desktopPeriods: PeriodsModel[] = [
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
        intervalType: 'Years'
    },
    {
        text: 'All'
    }
];

const mobilePeriods: PeriodsModel[] = [
    {
        text: '1M',
        interval: 1,
        intervalType: 'Months'
    },
    {
        text: '6M',
        interval: 6,
        intervalType: 'Months'
    },
    {
        text: 'All'
    }
];
```

Apply the appropriate collection during initialization:

```typescript
const mobile: boolean =
    window.matchMedia(
        '(max-width: 767px)'
    ).matches;

const rangeNavigator: RangeNavigator =
    new RangeNavigator({
        periodSelectorSettings: {
            position: 'Top',
            periods: mobile
                ? mobilePeriods
                : desktopPeriods
        }
    });
```

If the Period Selector must be completely removed on mobile, create the mobile configuration without `periodSelectorSettings` and do not depend on an unsupported `visible` flag.

## Complete TypeScript Example

The following example includes:

- Responsive width and height
- DateTime axis
- Area series
- Major grid and tick lines
- Label formatting and styling
- Smart labels
- Grouped DateTime labels
- Theme and background
- Series fill and border
- Selected and unselected region colors
- Rectangle thumb customization
- Navigator border
- Range Tooltip
- Period Selector
- RTL runtime switch
- Debounced responsive updates
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

    <title>Range Navigator Customization</title>

    <style>
        body {
            margin: 0;
            padding: 24px;
            background: #F8FAFC;
            color: #0F172A;
            font-family: "Segoe UI", sans-serif;
        }

        .range-wrapper {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            box-sizing: border-box;
            border: 1px solid #E2E8F0;
            border-radius: 12px;
            background: #FFFFFF;
        }

        .configuration-panel {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
        }

        .configuration-panel label {
            font-weight: 600;
        }

        .configuration-panel button {
            padding: 8px 14px;
            border: 1px solid #CBD5E1;
            border-radius: 6px;
            background: #FFFFFF;
            color: #0F172A;
            cursor: pointer;
        }

        .configuration-panel button:hover {
            background: #F1F5F9;
        }

        #range {
            width: 100%;
            min-height: 250px;
        }

        @media (max-width: 767px) {
            body {
                padding: 12px;
            }

            .range-wrapper {
                padding: 12px;
            }

            #range {
                min-height: 180px;
            }
        }
    </style>
</head>
<body>
    <div class="range-wrapper">
        <div class="configuration-panel">
            <label for="toggle-rtl">
                Layout direction
            </label>

            <button
                id="toggle-rtl"
                type="button"
            >
                Enable RTL
            </button>
        </div>

        <div id="range"></div>
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
    PeriodSelector,
    PeriodsModel,
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

const desktopPeriods: PeriodsModel[] = [
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
];

const mobilePeriods: PeriodsModel[] = [
    {
        text: '1M',
        interval: 1,
        intervalType: 'Months'
    },
    {
        text: '6M',
        interval: 6,
        intervalType: 'Months',
        selected: true
    },
    {
        text: 'All'
    }
];

const isMobileView = (): boolean => {
    return window.matchMedia(
        '(max-width: 767px)'
    ).matches;
};

const rangeNavigator: RangeNavigator =
    new RangeNavigator({
        width: '100%',
        height: isMobileView()
            ? '180px'
            : '250px',
        theme: 'Material',
        background: '#FFFFFF',
        animationDuration: 300,
        enableDeferredUpdate: true,
        valueType: 'DateTime',
        value: [
            new Date(2023, 0, 1),
            new Date(2023, 11, 1)
        ],
        intervalType: 'Months',
        interval: 1,
        enableGrouping: true,
        groupBy: 'Years',
        labelFormat: isMobileView()
            ? 'MMM'
            : 'MMM-yy',
        labelPosition: 'Outside',
        labelIntersectAction: 'Hide',
        labelStyle: {
            size: isMobileView()
                ? '11px'
                : '13px',
            color: '#334155',
            fontFamily: 'Segoe UI',
            fontStyle: 'Normal',
            fontWeight: '500',
            opacity: 1
        },
        majorGridLines: {
            width: 1,
            color: '#E2E8F0',
            dashArray: '4,4'
        },
        majorTickLines: {
            width: 1,
            height: 6,
            color: '#64748B'
        },
        navigatorBorder: {
            color: '#CBD5E1',
            width: 1
        },
        navigatorStyleSettings: {
            selectedRegionColor:
                'rgba(37, 99, 235, 0.18)',
            unselectedRegionColor:
                'rgba(148, 163, 184, 0.25)',
            thumb: {
                type: 'Rectangle',
                width: 14,
                height: 24,
                fill: '#FFFFFF',
                border: {
                    color: '#2563EB',
                    width: 2
                }
            }
        },
        tooltip: {
            enable: true,
            displayMode: 'Always',
            fill: '#0F172A',
            opacity: 0.92,
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
            periods: isMobileView()
                ? mobilePeriods
                : desktopPeriods
        },
        series: [
            {
                dataSource: data,
                xName: 'date',
                yName: 'value',
                type: 'Area',
                fill: '#3B82F6',
                width: 2,
                border: {
                    color: '#1D4ED8',
                    width: 1
                },
                animation: {
                    enable: true,
                    duration: 300
                }
            }
        ]
    });

rangeNavigator.appendTo('#range');

const rtlButton: HTMLButtonElement | null =
    document.querySelector('#toggle-rtl');

if (rtlButton) {
    rtlButton.addEventListener(
        'click',
        (): void => {
            rangeNavigator.enableRtl =
                !rangeNavigator.enableRtl;

            rtlButton.textContent =
                rangeNavigator.enableRtl
                    ? 'Disable RTL'
                    : 'Enable RTL';

            rangeNavigator.dataBind();
        }
    );
}

let resizeTimer: number | undefined;

window.addEventListener(
    'resize',
    (): void => {
        if (resizeTimer !== undefined) {
            window.clearTimeout(resizeTimer);
        }

        resizeTimer = window.setTimeout(
            (): void => {
                const mobile: boolean =
                    isMobileView();

                rangeNavigator.height =
                    mobile
                        ? '180px'
                        : '250px';

                rangeNavigator.labelFormat =
                    mobile
                        ? 'MMM'
                        : 'MMM-yy';

                rangeNavigator.labelStyle.size =
                    mobile
                        ? '11px'
                        : '13px';

                rangeNavigator.periodSelectorSettings.periods =
                    mobile
                        ? mobilePeriods
                        : desktopPeriods;

                rangeNavigator.refresh();
            },
            150
        );
    }
);
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

    <title>Range Navigator Customization</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

    <style>
        body {
            margin: 0;
            padding: 24px;
            background: #F8FAFC;
            color: #0F172A;
            font-family: "Segoe UI", sans-serif;
        }

        .range-wrapper {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            box-sizing: border-box;
            border: 1px solid #E2E8F0;
            border-radius: 12px;
            background: #FFFFFF;
        }

        .configuration-panel {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
        }

        .configuration-panel label {
            font-weight: 600;
        }

        .configuration-panel button {
            padding: 8px 14px;
            border: 1px solid #CBD5E1;
            border-radius: 6px;
            background: #FFFFFF;
            color: #0F172A;
            cursor: pointer;
        }

        .configuration-panel button:hover {
            background: #F1F5F9;
        }

        #range {
            width: 100%;
            min-height: 250px;
        }

        @media (max-width: 767px) {
            body {
                padding: 12px;
            }

            .range-wrapper {
                padding: 12px;
            }

            #range {
                min-height: 180px;
            }
        }
    </style>
</head>
<body>
    <div class="range-wrapper">
        <div class="configuration-panel">
            <label for="toggle-rtl">
                Layout direction
            </label>

            <button
                id="toggle-rtl"
                type="button"
            >
                Enable RTL
            </button>
        </div>

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
            { date: new Date(2023, 5, 1), value: 98 },
            { date: new Date(2023, 6, 1), value: 102 },
            { date: new Date(2023, 7, 1), value: 99 },
            { date: new Date(2023, 8, 1), value: 108 },
            { date: new Date(2023, 9, 1), value: 112 },
            { date: new Date(2023, 10, 1), value: 109 },
            { date: new Date(2023, 11, 1), value: 118 }
        ];

        var desktopPeriods = [
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
        ];

        var mobilePeriods = [
            {
                text: '1M',
                interval: 1,
                intervalType: 'Months'
            },
            {
                text: '6M',
                interval: 6,
                intervalType: 'Months',
                selected: true
            },
            {
                text: 'All'
            }
        ];

        function isMobileView() {
            return window.matchMedia(
                '(max-width: 767px)'
            ).matches;
        }

        var rangeNavigator =
            new ej.charts.RangeNavigator({
                width: '100%',
                height: isMobileView()
                    ? '180px'
                    : '250px',
                theme: 'Material',
                background: '#FFFFFF',
                animationDuration: 300,
                enableDeferredUpdate: true,
                valueType: 'DateTime',
                value: [
                    new Date(2023, 0, 1),
                    new Date(2023, 11, 1)
                ],
                intervalType: 'Months',
                interval: 1,
                enableGrouping: true,
                groupBy: 'Years',
                labelFormat: isMobileView()
                    ? 'MMM'
                    : 'MMM-yy',
                labelPosition: 'Outside',
                labelIntersectAction: 'Hide',
                labelStyle: {
                    size: isMobileView()
                        ? '11px'
                        : '13px',
                    color: '#334155',
                    fontFamily: 'Segoe UI',
                    fontStyle: 'Normal',
                    fontWeight: '500',
                    opacity: 1
                },
                majorGridLines: {
                    width: 1,
                    color: '#E2E8F0',
                    dashArray: '4,4'
                },
                majorTickLines: {
                    width: 1,
                    height: 6,
                    color: '#64748B'
                },
                navigatorBorder: {
                    color: '#CBD5E1',
                    width: 1
                },
                navigatorStyleSettings: {
                    selectedRegionColor:
                        'rgba(37, 99, 235, 0.18)',
                    unselectedRegionColor:
                        'rgba(148, 163, 184, 0.25)',
                    thumb: {
                        type: 'Rectangle',
                        width: 14,
                        height: 24,
                        fill: '#FFFFFF',
                        border: {
                            color: '#2563EB',
                            width: 2
                        }
                    }
                },
                tooltip: {
                    enable: true,
                    displayMode: 'Always',
                    fill: '#0F172A',
                    opacity: 0.92,
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
                    periods: isMobileView()
                        ? mobilePeriods
                        : desktopPeriods
                },
                series: [
                    {
                        dataSource: data,
                        xName: 'date',
                        yName: 'value',
                        type: 'Area',
                        fill: '#3B82F6',
                        width: 2,
                        border: {
                            color: '#1D4ED8',
                            width: 1
                        },
                        animation: {
                            enable: true,
                            duration: 300
                        }
                    }
                ]
            });

        rangeNavigator.appendTo('#range');

        var rtlButton =
            document.querySelector('#toggle-rtl');

        if (rtlButton) {
            rtlButton.addEventListener(
                'click',
                function () {
                    rangeNavigator.enableRtl =
                        !rangeNavigator.enableRtl;

                    rtlButton.textContent =
                        rangeNavigator.enableRtl
                            ? 'Disable RTL'
                            : 'Enable RTL';

                    rangeNavigator.dataBind();
                }
            );
        }

        var resizeTimer;

        window.addEventListener(
            'resize',
            function () {
                window.clearTimeout(resizeTimer);

                resizeTimer = window.setTimeout(
                    function () {
                        var mobile =
                            isMobileView();

                        rangeNavigator.height =
                            mobile
                                ? '180px'
                                : '250px';

                        rangeNavigator.labelFormat =
                            mobile
                                ? 'MMM'
                                : 'MMM-yy';

                        rangeNavigator.labelStyle.size =
                            mobile
                                ? '11px'
                                : '13px';

                        rangeNavigator
                            .periodSelectorSettings
                            .periods =
                                mobile
                                    ? mobilePeriods
                                    : desktopPeriods;

                        rangeNavigator.refresh();
                    },
                    150
                );
            }
        );
    </script>
</body>
</html>
```

## Combined Mistakes and Future References

### Unsupported Minor Grid and Tick Lines

Incorrect:

```typescript
minorGridLines: {
    width: 1
},
minorTickLines: {
    width: 1
}
```

Use only:

```typescript
majorGridLines: {
    width: 1
},
majorTickLines: {
    width: 1
}
```

### Unsupported Lightweight Mode

Incorrect:

```typescript
enableLightweightMode: true
```

This is not a Range Navigator property.

Use supported performance settings:

```typescript
animationDuration: 0,
enableDeferredUpdate: true
```

Disable series animation when needed:

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

### Unsupported Series Opacity

Incorrect:

```typescript
series: [
    {
        opacity: 0.7
    }
]
```

Use a CSS color with alpha transparency when needed:

```typescript
series: [
    {
        fill: 'rgba(37, 99, 235, 0.70)'
    }
]
```

### Unsupported Marker Configuration

Incorrect:

```typescript
series: [
    {
        marker: {
            visible: true
        }
    }
]
```

The Range Navigator series model is not the same as the regular Chart series model.

Do not add marker settings unless the target Range Navigator version explicitly supports them.

### Wrong Tooltip Background Property

Incorrect:

```typescript
tooltip: {
    backgroundColor: '#F5F5F5'
}
```

Correct:

```typescript
tooltip: {
    fill: '#F5F5F5'
}
```

### Unsupported Tooltip Border Assumption

Avoid adding Chart tooltip properties without validating the Range Navigator tooltip model.

Use validated Range Navigator tooltip properties:

```typescript
tooltip: {
    enable: true,
    displayMode: 'Always',
    fill: '#0F172A',
    opacity: 0.9,
    labelFormat: 'MMM d, yyyy',
    textStyle: {
        color: '#FFFFFF',
        size: '12px'
    }
}
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

### Missing PeriodSelector Injection

Incorrect:

```typescript
RangeNavigator.Inject(
    AreaSeries,
    DateTime
);
```

```typescript
periodSelectorSettings: {
    periods: periods
}
```

Correct:

```typescript
import {
    PeriodSelector
} from '@syncfusion/ej2-charts';

RangeNavigator.Inject(
    AreaSeries,
    DateTime,
    PeriodSelector
);
```

### Unsupported Period Selector Visibility

Incorrect:

```typescript
periodSelectorSettings: {
    visible: false
}
```

Use a reduced period collection for smaller screens:

```typescript
periodSelectorSettings: {
    periods: mobilePeriods
}
```

If the selector must not render, initialize the mobile version without `periodSelectorSettings`.

### Incorrect Label Position Values

Incorrect:

```typescript
labelPosition: 'Top'
```

Correct values:

```typescript
labelPosition: 'Inside'
```

```typescript
labelPosition: 'Outside'
```

### Incorrect Font Weight Casing

Avoid inconsistent CSS-like values:

```typescript
fontWeight: 'bold'
```

Use a validated font-weight value consistently:

```typescript
fontWeight: '600'
```

### Theme and Stylesheet Mismatch

Avoid:

```typescript
theme: 'HighContrast'
```
Don't Load the stylesheet that corresponds to the configured theme.

### Refreshing on Every Resize Event

Avoid:

```typescript
window.addEventListener(
    'resize',
    (): void => {
        rangeNavigator.refresh();
    }
);
```

Use a debounced handler:

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

### Rendering in a Hidden Container

Avoid initializing the Range Navigator while its parent has:

```css
display: none;
```

If the component is rendered inside a hidden tab, dialog, or panel, call `refresh()` after the container becomes visible:

```typescript
rangeNavigator.refresh();
```

### Missing Container Width

Avoid a parent whose available width is zero.

Use:

```css
.range-container {
    width: 100%;
    min-height: 250px;
}
```

### Import and Injection Validation Checklist

Before generating or running a customization example, verify:

1. `RangeNavigator` is imported from `@syncfusion/ej2-charts`.
2. Every configured series module is imported.
3. Every configured series module is passed to `RangeNavigator.Inject(...)`.
4. `DateTime` is imported and injected for a DateTime axis.
5. `Category` is imported and injected for a Category axis.
6. `Logarithmic` is imported and injected for a logarithmic axis.
7. `RangeTooltip` is imported and injected when the tooltip is enabled.
8. `PeriodSelector` is imported and injected when Period Selector settings are present.
9. Major grid lines use `majorGridLines`.
10. Major tick lines use `majorTickLines`.
11. `minorGridLines` is not used.
12. `minorTickLines` is not used.
13. `labelPosition` uses `Inside` or `Outside`.
14. `labelIntersectAction` uses a supported value.
15. `navigatorStyleSettings` is used for slider-region and thumb appearance.
16. `navigatorBorder` is used for the component border.
17. Series `fill` and `border` are used only with supported series properties.
18. Unsupported `marker` configuration is not added.
19. Unsupported series `opacity` is not added.
20. Tooltip background uses `fill`.
21. Unsupported `tooltip.backgroundColor` is not used.
22. Unsupported `periodSelectorSettings.visible` is not used.
23. Unsupported `enableLightweightMode` is not used.
24. `enableDeferredUpdate` is used for expensive range-change handlers.
25. Resize handling is debounced.
26. The parent container has an available width.
27. The Range Navigator is refreshed after a hidden parent becomes visible.
28. `enableRtl` is used when right-to-left rendering is required.
29. The HTML `dir` attribute is set when the entire document is right-to-left.
30. The loaded CSS stylesheet corresponds to the configured theme.
31. TypeScript examples use package imports and module injection.
32. JavaScript examples use `ej.charts.RangeNavigator` with the global EJ2 bundle.
33. Vue, React, Angular, Composition API, directive, and provider syntax are not used.