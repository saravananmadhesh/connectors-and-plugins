# Axis Configuration

## Overview

The EJ2 SmithChart contains two configurable axes:

- `horizontalAxis`, rendered as a straight horizontal axis.
- `radialAxis`, rendered using circular paths.

Both axes support label positioning, label-overlap handling, text styling, major gridlines, minor gridlines, and axis-line customization.

The axis configuration does not require additional module imports or `Smithchart.Inject(...)` calls.

## Table of Contents

- #understanding-axes
  - #horizontal-axis-purpose
  - #radial-axis-purpose
  - #impedance-and-admittance-rendering
- #horizontal-axis
  - #typescript-horizontal-axis
  - #javascript-horizontal-axis
- #radial-axis
  - #typescript-radial-axis
  - #javascript-radial-axis
- #axis-labels
  - #label-position
  - #label-intersection
  - #label-style
  - #axis-label-render-event
- #gridlines-configuration
  - #major-gridlines
  - #minor-gridlines
  - #gridline-density
- #axis-lines
  - #axis-line-customization
  - #hiding-axis-lines
- #complete-typescript-example
- #complete-javascript-example
- #best-practices
- #combined-mistakes-and-future-references

## Understanding Axes

SmithChart uses two axis structures to help users interpret plotted resistance and reactance values.

### Horizontal Axis Purpose

The horizontal axis is rendered as a straight line across the SmithChart.

For impedance rendering, it helps represent resistance values.

For admittance rendering, it helps represent conductance values.

Configure it through:

```typescript
horizontalAxis: {
    visible: true
}
```

### Radial Axis Purpose

The radial axis is rendered as circular paths.

For impedance rendering, it helps represent reactance values.

For admittance rendering, it helps represent susceptance values.

Configure it through:

```typescript
radialAxis: {
    visible: true
}
```

The horizontal and radial axes form the coordinate structure used to interpret SmithChart points.

### Impedance and Admittance Rendering

Use the `renderType` property to select the SmithChart representation.

Impedance:

```typescript
renderType: 'Impedance'
```

Admittance:

```typescript
renderType: 'Admittance'
```

The datasource still uses numeric `resistance` and `reactance` fields:

```typescript
interface SmithChartPoint {
    resistance: number;
    reactance: number;
}
```

Example:

```typescript
const data: SmithChartPoint[] = [
    {
        resistance: 10,
        reactance: 25
    },
    {
        resistance: 8,
        reactance: 6
    },
    {
        resistance: 6,
        reactance: 4.5
    }
];
```

## Horizontal Axis

Configure the horizontal axis through the `horizontalAxis` property.

Supported axis settings include:

- `visible`
- `labelPosition`
- `labelIntersectAction`
- `labelStyle`
- `majorGridLines`
- `minorGridLines`
- `axisLine`

### TypeScript Horizontal Axis

```typescript
import {
    Smithchart
} from '@syncfusion/ej2-charts';

interface SmithChartPoint {
    resistance: number;
    reactance: number;
}

const data: SmithChartPoint[] = [
    {
        resistance: 10,
        reactance: 25
    },
    {
        resistance: 8,
        reactance: 6
    },
    {
        resistance: 6,
        reactance: 4.5
    },
    {
        resistance: 4.5,
        reactance: 2
    }
];

const smithchart: Smithchart =
    new Smithchart({
        width: '100%',
        height: '550px',
        renderType: 'Impedance',
        horizontalAxis: {
            visible: true,
            labelPosition: 'Inside',
            labelIntersectAction: 'Hide',
            labelStyle: {
                color: '#334155',
                size: '12px',
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: '500',
                opacity: 1
            },
            majorGridLines: {
                visible: true
            },
            minorGridLines: {
                visible: false
            },
            axisLine: {
                visible: true
            }
        },
        series: [
            {
                points: data,
                fill: '#2563EB',
                width: 2,
                marker: {
                    visible: true
                }
            }
        ]
    });

smithchart.appendTo(
    '#smithchart-container'
);
```

### JavaScript Horizontal Axis

```javascript
var data = [
    {
        resistance: 10,
        reactance: 25
    },
    {
        resistance: 8,
        reactance: 6
    },
    {
        resistance: 6,
        reactance: 4.5
    },
    {
        resistance: 4.5,
        reactance: 2
    }
];

var smithchart =
    new ej.charts.Smithchart({
        width: '100%',
        height: '550px',
        renderType: 'Impedance',
        horizontalAxis: {
            visible: true,
            labelPosition: 'Inside',
            labelIntersectAction: 'Hide',
            labelStyle: {
                color: '#334155',
                size: '12px',
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: '500',
                opacity: 1
            },
            majorGridLines: {
                visible: true
            },
            minorGridLines: {
                visible: false
            },
            axisLine: {
                visible: true
            }
        },
        series: [
            {
                points: data,
                fill: '#2563EB',
                width: 2,
                marker: {
                    visible: true
                }
            }
        ]
    });

smithchart.appendTo(
    '#smithchart-container'
);
```

## Radial Axis

Configure the radial axis through the `radialAxis` property.

The radial axis supports the same main customization groups as the horizontal axis:

- Visibility
- Label position
- Label-overlap handling
- Label styling
- Major gridlines
- Minor gridlines
- Axis-line appearance

### TypeScript Radial Axis

```typescript
import {
    Smithchart
} from '@syncfusion/ej2-charts';

const smithchart: Smithchart =
    new Smithchart({
        width: '100%',
        height: '550px',
        renderType: 'Impedance',
        radialAxis: {
            visible: true,
            labelPosition: 'Inside',
            labelIntersectAction: 'Hide',
            labelStyle: {
                color: '#334155',
                size: '12px',
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: '500',
                opacity: 1
            },
            majorGridLines: {
                visible: true
            },
            minorGridLines: {
                visible: false
            },
            axisLine: {
                visible: true
            }
        },
        series: [
            {
                points: data,
                fill: '#2563EB',
                width: 2
            }
        ]
    });

smithchart.appendTo(
    '#smithchart-container'
);
```

### JavaScript Radial Axis

```javascript
var smithchart =
    new ej.charts.Smithchart({
        width: '100%',
        height: '550px',
        renderType: 'Impedance',
        radialAxis: {
            visible: true,
            labelPosition: 'Inside',
            labelIntersectAction: 'Hide',
            labelStyle: {
                color: '#334155',
                size: '12px',
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: '500',
                opacity: 1
            },
            majorGridLines: {
                visible: true
            },
            minorGridLines: {
                visible: false
            },
            axisLine: {
                visible: true
            }
        },
        series: [
            {
                points: data,
                fill: '#2563EB',
                width: 2
            }
        ]
    });

smithchart.appendTo(
    '#smithchart-container'
);
```

## Axis Labels

Axis labels identify the resistance, conductance, reactance, or susceptance intervals represented by the SmithChart grid.

Both axes support:

```typescript
labelPosition
```

```typescript
labelIntersectAction
```

```typescript
labelStyle
```

These settings can be configured independently for the horizontal and radial axes.

### Label Position

The supported label positions are:

```text
Inside
Outside
```

Inside:

```typescript
horizontalAxis: {
    labelPosition: 'Inside'
},
radialAxis: {
    labelPosition: 'Inside'
}
```

Outside:

```typescript
horizontalAxis: {
    labelPosition: 'Outside'
},
radialAxis: {
    labelPosition: 'Outside'
}
```

Use `Inside` when:

- The layout is compact.
- The component is displayed on smaller screens.
- Labels remain readable inside the chart.

Use `Outside` when:

- Sufficient margin is available.
- Internal labels overlap the plotted series.
- A report-oriented layout is required.

Do not describe `Outside` as automatically more accessible. Accessibility depends on contrast, font size, surrounding text, keyboard support, and assistive-technology testing.

### Label Intersection

Use `labelIntersectAction` to control overlapping labels.

Hide intersecting labels:

```typescript
labelIntersectAction: 'Hide'
```

Display all labels:

```typescript
labelIntersectAction: 'None'
```

Recommended responsive configuration:

```typescript
horizontalAxis: {
    labelIntersectAction: 'Hide'
},
radialAxis: {
    labelIntersectAction: 'Hide'
}
```

`Hide` prevents overlapping labels from creating unreadable text in dense or responsive layouts.

### Label Style

Use `labelStyle` to customize axis-label text.

```typescript
labelStyle: {
    color: '#1F2937',
    size: '12px',
    fontFamily: 'Segoe UI',
    fontStyle: 'Normal',
    fontWeight: '600',
    opacity: 1
}
```

Complete configuration:

```typescript
horizontalAxis: {
    labelPosition: 'Inside',
    labelIntersectAction: 'Hide',
    labelStyle: {
        color: '#1D4ED8',
        size: '12px',
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: '600',
        opacity: 1
    }
},
radialAxis: {
    labelPosition: 'Inside',
    labelIntersectAction: 'Hide',
    labelStyle: {
        color: '#9F1239',
        size: '12px',
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: '600',
        opacity: 1
    }
}
```

Use consistent casing:

```typescript
fontStyle: 'Italic'
```

Use a validated font-weight value:

```typescript
fontWeight: '600'
```

or:

```typescript
fontWeight: 'Normal'
```

### Axis Label Render Event

Use the `axisLabelRender` event when individual labels require conditional customization.

```typescript
import {
    IAxisLabelRenderEventArgs,
    Smithchart
} from '@syncfusion/ej2-charts';

const smithchart: Smithchart =
    new Smithchart({
        axisLabelRender: (
            args: IAxisLabelRenderEventArgs
        ): void => {
            if (args.text === '0') {
                args.textStyle.color =
                    '#DC2626';

                args.textStyle.fontWeight =
                    '700';
            }
        },
        series: [
            {
                points: data
            }
        ]
    });
```

Use the event for scenarios such as:

- Emphasizing the zero label.
- Changing a particular label color.
- Conditionally hiding a label.
- Applying application-specific label text.

Validate the event argument fields against the installed EJ2 version before changing advanced values.

## Gridlines Configuration

SmithChart supports major and minor gridlines on both horizontal and radial axes.

Major gridlines are drawn at positions associated with rendered axis labels. Minor gridlines provide subdivisions between major gridlines.

### Major Gridlines

Horizontal major gridlines:

```typescript
horizontalAxis: {
    majorGridLines: {
        visible: true
    }
}
```

Radial major gridlines:

```typescript
radialAxis: {
    majorGridLines: {
        visible: true
    }
}
```

Customized major gridlines:

```typescript
horizontalAxis: {
    majorGridLines: {
        visible: true,
        color: '#94A3B8',
        width: 1,
        opacity: 0.7
    }
},
radialAxis: {
    majorGridLines: {
        visible: true,
        color: '#94A3B8',
        width: 1,
        opacity: 0.7
    }
}
```

Use major gridlines as the primary visual reference.

### Minor Gridlines

Enable minor gridlines:

```typescript
horizontalAxis: {
    minorGridLines: {
        visible: true,
        count: 2
    }
},
radialAxis: {
    minorGridLines: {
        visible: true,
        count: 2
    }
}
```

Customized minor gridlines:

```typescript
horizontalAxis: {
    minorGridLines: {
        visible: true,
        color: '#CBD5E1',
        width: 0.5,
        opacity: 0.45,
        count: 2
    }
},
radialAxis: {
    minorGridLines: {
        visible: true,
        color: '#CBD5E1',
        width: 0.5,
        opacity: 0.45,
        count: 2
    }
}
```

The `count` property controls the number of subdivisions represented between major grid intervals.

### Gridline Density

Use fewer minor gridlines for:

- Responsive layouts
- Presentation views
- Dashboards
- Small SmithChart dimensions
- Charts with many series

Use more minor gridlines for:

- Detailed engineering analysis
- Large technical reports
- High-resolution displays
- Precise visual estimation

Do not claim a universal performance limit such as:

```text
minorGridLines.count must be less than or equal to 5
```

The appropriate count depends on:

- Component dimensions
- Browser
- Device
- Number of series
- Number of points
- Label density
- Visual requirements

A support-safe starting point is:

```typescript
minorGridLines: {
    visible: true,
    count: 2
}
```

Increase the count only after validating readability and rendering performance.

## Axis Lines

The `axisLine` property controls the main line associated with each SmithChart axis.

### Axis Line Customization

```typescript
horizontalAxis: {
    axisLine: {
        visible: true,
        color: '#475569',
        width: 1
    }
},
radialAxis: {
    axisLine: {
        visible: true,
        color: '#475569',
        width: 1
    }
}
```

Use a stronger color than the minor gridlines so the main axis remains visually distinguishable.

### Hiding Axis Lines

Hide the horizontal axis line:

```typescript
horizontalAxis: {
    axisLine: {
        visible: false
    }
}
```

Hide the radial axis line:

```typescript
radialAxis: {
    axisLine: {
        visible: false
    }
}
```

Hiding the axis line does not automatically hide:

- Axis labels
- Major gridlines
- Minor gridlines
- Series
- Markers

Configure those features independently.

## Complete TypeScript Example

The following example includes:

- Impedance rendering
- Horizontal-axis configuration
- Radial-axis configuration
- Inside labels
- Label-intersection handling
- Separate label colors
- Major gridlines
- Minor gridlines
- Axis lines
- Markers
- Tooltip
- Legend
- Correct imports and module injection
- Responsive resizing

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

    <title>SmithChart Axis Configuration</title>

    <style>
        body {
            margin: 0;
            padding: 24px;
            background: #F8FAFC;
            color: #0F172A;
            font-family: "Segoe UI", sans-serif;
        }

        .smithchart-wrapper {
            width: 100%;
            max-width: 1100px;
            margin: 0 auto;
            padding: 20px;
            box-sizing: border-box;
            border: 1px solid #E2E8F0;
            border-radius: 12px;
            background: #FFFFFF;
        }

        #smithchart-container {
            width: 100%;
            min-height: 600px;
        }

        @media (max-width: 767px) {
            body {
                padding: 12px;
            }

            .smithchart-wrapper {
                padding: 12px;
            }

            #smithchart-container {
                min-height: 450px;
            }
        }
    </style>
</head>
<body>
    <main
        class="smithchart-wrapper"
        aria-labelledby="smithchart-heading"
    >
        <h1 id="smithchart-heading">
            Transmission-Line Impedance
        </h1>

        <p id="smithchart-description">
            The horizontal and radial axes provide
            reference values for the impedance series.
        </p>

        <div
            id="smithchart-container"
            aria-describedby="smithchart-description"
        ></div>
    </main>

   <script scr="index.js"></script>
</body>
</html>
```

### index.ts

```typescript
import {
    Smithchart,
    SmithchartLegend,
    TooltipRender
} from '@syncfusion/ej2-charts';

interface SmithChartPoint {
    resistance: number;
    reactance: number;
}

Smithchart.Inject(
    SmithchartLegend,
    TooltipRender
);

const inductiveData: SmithChartPoint[] = [
    {
        resistance: 10,
        reactance: 25
    },
    {
        resistance: 8,
        reactance: 6
    },
    {
        resistance: 6,
        reactance: 4.5
    },
    {
        resistance: 4.5,
        reactance: 2
    },
    {
        resistance: 3.5,
        reactance: 1.6
    },
    {
        resistance: 2.5,
        reactance: 1.3
    },
    {
        resistance: 2,
        reactance: 1.2
    },
    {
        resistance: 1.5,
        reactance: 1
    }
];

const capacitiveData: SmithChartPoint[] = [
    {
        resistance: 20,
        reactance: -50
    },
    {
        resistance: 10,
        reactance: -10
    },
    {
        resistance: 9,
        reactance: -4.5
    },
    {
        resistance: 8,
        reactance: -3.5
    },
    {
        resistance: 7,
        reactance: -2.5
    },
    {
        resistance: 6,
        reactance: -1.5
    },
    {
        resistance: 5,
        reactance: -1
    },
    {
        resistance: 4.5,
        reactance: -0.5
    }
];

const isSmallScreen = (): boolean => {
    return window.matchMedia(
        '(max-width: 767px)'
    ).matches;
};

const smithchart: Smithchart =
    new Smithchart({
        width: '100%',
        height: isSmallScreen()
            ? '450px'
            : '600px',
        renderType: 'Impedance',
        theme: 'Material',
        background: '#FFFFFF',
        title: {
            text: 'SmithChart Axis Configuration',
            visible: true,
            textStyle: {
                color: '#0F172A',
                size: '20px',
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: '600'
            },
            subtitle: {
                text:
                    'Inductive and capacitive impedance',
                visible: true,
                textStyle: {
                    color: '#475569',
                    size: '13px',
                    fontFamily: 'Segoe UI',
                    fontStyle: 'Normal',
                    fontWeight: '400'
                }
            }
        },
        horizontalAxis: {
            visible: true,
            labelPosition: 'Inside',
            labelIntersectAction: 'Hide',
            labelStyle: {
                color: '#1D4ED8',
                size: isSmallScreen()
                    ? '10px'
                    : '12px',
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: '600',
                opacity: 1
            },
            majorGridLines: {
                visible: true,
                color: '#94A3B8',
                width: 1,
                opacity: 0.75
            },
            minorGridLines: {
                visible: !isSmallScreen(),
                color: '#CBD5E1',
                width: 0.5,
                opacity: 0.45,
                count: 2
            },
            axisLine: {
                visible: true,
                color: '#475569',
                width: 1
            }
        },
        radialAxis: {
            visible: true,
            labelPosition: 'Inside',
            labelIntersectAction: 'Hide',
            labelStyle: {
                color: '#9F1239',
                size: isSmallScreen()
                    ? '10px'
                    : '12px',
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: '600',
                opacity: 1
            },
            majorGridLines: {
                visible: true,
                color: '#94A3B8',
                width: 1,
                opacity: 0.75
            },
            minorGridLines: {
                visible: !isSmallScreen(),
                color: '#CBD5E1',
                width: 0.5,
                opacity: 0.45,
                count: 2
            },
            axisLine: {
                visible: true,
                color: '#475569',
                width: 1
            }
        },
        legendSettings: {
            visible: true,
            position: 'Bottom',
            toggleVisibility: true,
            textStyle: {
                color: '#1F2937',
                size: '12px',
                fontFamily: 'Segoe UI',
                fontWeight: '600'
            }
        },
        series: [
            {
                name: 'Inductive',
                points: inductiveData,
                fill: '#2563EB',
                width: 2,
                marker: {
                    visible: true,
                    shape: 'Circle',
                    width: 9,
                    height: 9,
                    fill: '#3B82F6',
                    border: {
                        color: '#1E3A8A',
                        width: 2
                    }
                },
                tooltip: {
                    visible: true
                }
            },
            {
                name: 'Capacitive',
                points: capacitiveData,
                fill: '#DC2626',
                width: 2,
                marker: {
                    visible: true,
                    shape: 'Diamond',
                    width: 9,
                    height: 9,
                    fill: '#EF4444',
                    border: {
                        color: '#7F1D1D',
                        width: 2
                    }
                },
                tooltip: {
                    visible: true
                }
            }
        ]
    });

smithchart.appendTo(
    '#smithchart-container'
);

let resizeTimer: number | undefined;

window.addEventListener(
    'resize',
    (): void => {
        if (resizeTimer !== undefined) {
            window.clearTimeout(
                resizeTimer
            );
        }

        resizeTimer = window.setTimeout(
            (): void => {
                const mobile: boolean =
                    isSmallScreen();

                smithchart.height =
                    mobile
                        ? '450px'
                        : '600px';

                smithchart.horizontalAxis
                    .labelStyle.size =
                        mobile
                            ? '10px'
                            : '12px';

                smithchart.radialAxis
                    .labelStyle.size =
                        mobile
                            ? '10px'
                            : '12px';

                smithchart.horizontalAxis
                    .minorGridLines.visible =
                        !mobile;

                smithchart.radialAxis
                    .minorGridLines.visible =
                        !mobile;

                smithchart.refresh();
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

    <title>SmithChart Axis Configuration</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

    <style>
        body {
            margin: 0;
            padding: 24px;
            background: #F8FAFC;
            color: #0F172A;
            font-family: "Segoe UI", sans-serif;
        }

        .smithchart-wrapper {
            width: 100%;
            max-width: 1100px;
            margin: 0 auto;
            padding: 20px;
            box-sizing: border-box;
            border: 1px solid #E2E8F0;
            border-radius: 12px;
            background: #FFFFFF;
        }

        #smithchart-container {
            width: 100%;
            min-height: 600px;
        }

        @media (max-width: 767px) {
            body {
                padding: 12px;
            }

            .smithchart-wrapper {
                padding: 12px;
            }

            #smithchart-container {
                min-height: 450px;
            }
        }
    </style>
</head>
<body>
    <main
        class="smithchart-wrapper"
        aria-labelledby="smithchart-heading"
    >
        <h1 id="smithchart-heading">
            Transmission-Line Impedance
        </h1>

        <p id="smithchart-description">
            The horizontal and radial axes provide
            reference values for the impedance series.
        </p>

        <div
            id="smithchart-container"
            aria-describedby="smithchart-description"
        ></div>
    </main>

    <script>
        var inductiveData = [
            {
                resistance: 10,
                reactance: 25
            },
            {
                resistance: 8,
                reactance: 6
            },
            {
                resistance: 6,
                reactance: 4.5
            },
            {
                resistance: 4.5,
                reactance: 2
            },
            {
                resistance: 3.5,
                reactance: 1.6
            },
            {
                resistance: 2.5,
                reactance: 1.3
            },
            {
                resistance: 2,
                reactance: 1.2
            },
            {
                resistance: 1.5,
                reactance: 1
            }
        ];

        var capacitiveData = [
            {
                resistance: 20,
                reactance: -50
            },
            {
                resistance: 10,
                reactance: -10
            },
            {
                resistance: 9,
                reactance: -4.5
            },
            {
                resistance: 8,
                reactance: -3.5
            },
            {
                resistance: 7,
                reactance: -2.5
            },
            {
                resistance: 6,
                reactance: -1.5
            },
            {
                resistance: 5,
                reactance: -1
            },
            {
                resistance: 4.5,
                reactance: -0.5
            }
        ];

        function isSmallScreen() {
            return window.matchMedia(
                '(max-width: 767px)'
            ).matches;
        }

        var smithchart =
            new ej.charts.Smithchart({
                width: '100%',
                height: isSmallScreen()
                    ? '450px'
                    : '600px',
                renderType: 'Impedance',
                theme: 'Material',
                background: '#FFFFFF',
                title: {
                    text:
                        'SmithChart Axis Configuration',
                    visible: true,
                    textStyle: {
                        color: '#0F172A',
                        size: '20px',
                        fontFamily: 'Segoe UI',
                        fontWeight: '600'
                    },
                    subtitle: {
                        text:
                            'Inductive and capacitive impedance',
                        visible: true,
                        textStyle: {
                            color: '#475569',
                            size: '13px',
                            fontFamily: 'Segoe UI',
                            fontWeight: '400'
                        }
                    }
                },
                horizontalAxis: {
                    visible: true,
                    labelPosition: 'Inside',
                    labelIntersectAction: 'Hide',
                    labelStyle: {
                        color: '#1D4ED8',
                        size: isSmallScreen()
                            ? '10px'
                            : '12px',
                        fontFamily: 'Segoe UI',
                        fontStyle: 'Normal',
                        fontWeight: '600',
                        opacity: 1
                    },
                    majorGridLines: {
                        visible: true,
                        color: '#94A3B8',
                        width: 1,
                        opacity: 0.75
                    },
                    minorGridLines: {
                        visible:
                            !isSmallScreen(),
                        color: '#CBD5E1',
                        width: 0.5,
                        opacity: 0.45,
                        count: 2
                    },
                    axisLine: {
                        visible: true,
                        color: '#475569',
                        width: 1
                    }
                },
                radialAxis: {
                    visible: true,
                    labelPosition: 'Inside',
                    labelIntersectAction: 'Hide',
                    labelStyle: {
                        color: '#9F1239',
                        size: isSmallScreen()
                            ? '10px'
                            : '12px',
                        fontFamily: 'Segoe UI',
                        fontStyle: 'Normal',
                        fontWeight: '600',
                        opacity: 1
                    },
                    majorGridLines: {
                        visible: true,
                        color: '#94A3B8',
                        width: 1,
                        opacity: 0.75
                    },
                    minorGridLines: {
                        visible:
                            !isSmallScreen(),
                        color: '#CBD5E1',
                        width: 0.5,
                        opacity: 0.45,
                        count: 2
                    },
                    axisLine: {
                        visible: true,
                        color: '#475569',
                        width: 1
                    }
                },
                legendSettings: {
                    visible: true,
                    position: 'Bottom',
                    toggleVisibility: true,
                    textStyle: {
                        color: '#1F2937',
                        size: '12px',
                        fontFamily: 'Segoe UI',
                        fontWeight: '600'
                    }
                },
                series: [
                    {
                        name: 'Inductive',
                        points: inductiveData,
                        fill: '#2563EB',
                        width: 2,
                        marker: {
                            visible: true,
                            shape: 'Circle',
                            width: 9,
                            height: 9,
                            fill: '#3B82F6',
                            border: {
                                color: '#1E3A8A',
                                width: 2
                            }
                        },
                        tooltip: {
                            visible: true
                        }
                    },
                    {
                        name: 'Capacitive',
                        points: capacitiveData,
                        fill: '#DC2626',
                        width: 2,
                        marker: {
                            visible: true,
                            shape: 'Diamond',
                            width: 9,
                            height: 9,
                            fill: '#EF4444',
                            border: {
                                color: '#7F1D1D',
                                width: 2
                            }
                        },
                        tooltip: {
                            visible: true
                        }
                    }
                ]
            });

        smithchart.appendTo(
            '#smithchart-container'
        );

        var resizeTimer;

        window.addEventListener(
            'resize',
            function () {
                window.clearTimeout(
                    resizeTimer
                );

                resizeTimer =
                    window.setTimeout(
                        function () {
                            var mobile =
                                isSmallScreen();

                            smithchart.height =
                                mobile
                                    ? '450px'
                                    : '600px';

                            smithchart
                                .horizontalAxis
                                .labelStyle
                                .size =
                                    mobile
                                        ? '10px'
                                        : '12px';

                            smithchart
                                .radialAxis
                                .labelStyle
                                .size =
                                    mobile
                                        ? '10px'
                                        : '12px';

                            smithchart
                                .horizontalAxis
                                .minorGridLines
                                .visible =
                                    !mobile;

                            smithchart
                                .radialAxis
                                .minorGridLines
                                .visible =
                                    !mobile;

                            smithchart.refresh();
                        },
                        150
                    );
            }
        );
    </script>
</body>
</html>
```

## Best Practices

### Label Clarity

- Use `labelIntersectAction: 'Hide'` for responsive layouts.
- Use `Inside` when space is limited.
- Use `Outside` only after validating the available margins.
- Keep horizontal and radial label fonts visually consistent.
- Use sufficient text contrast.
- Avoid excessively small font sizes.
- Refresh the SmithChart after a hidden parent becomes visible.

### Gridline Balance

- Keep major gridlines visible for reference.
- Use minor gridlines only when additional precision is required.
- Use lighter colors and lower opacity for minor gridlines.
- Avoid making gridlines visually stronger than the plotted series.
- Reduce minor gridlines on small screens.
- Validate dense grids against all supported devices.

### Axis Customization

- Configure horizontal and radial axes separately.
- Use different label colors only when the distinction improves understanding.
- Keep axis lines stronger than minor gridlines.
- Use supported API properties instead of undocumented SVG selectors.
- Test impedance and admittance configurations independently.

### Performance

- Avoid unnecessarily high minor-gridline counts.
- Disable minor gridlines in compact layouts.
- Debounce manual resize refreshes.
- Avoid calling `refresh()` repeatedly during unrelated property updates.
- Destroy the SmithChart when its containing application view is removed.

## Combined Mistakes and Future References

### Incorrect Horizontal Axis Description

Avoid describing the horizontal axis as a normal linear axis extending from zero to one.

A SmithChart uses a normalized impedance or admittance coordinate system. The visible horizontal labels are not equivalent to a standard Cartesian zero-to-one axis.

### Incorrect Radial Axis Description

The radial axis is not a conventional y-axis.

It is represented by circular paths and helps identify nonresistive values such as reactance or susceptance.

### Assuming Label Position Defaults

Do not state that `Inside` is always the default without validating the installed EJ2 version.

Configure it explicitly when the position matters:

```typescript
labelPosition: 'Inside'
```

### Unsupported Label Position Values

Do not use:

```typescript
labelPosition: 'Top'
```

```typescript
labelPosition: 'Bottom'
```

Use:

```typescript
labelPosition: 'Inside'
```

or:

```typescript
labelPosition: 'Outside'
```

### Incorrect Label Intersection Value

Use supported casing:

```typescript
labelIntersectAction: 'Hide'
```

or:

```typescript
labelIntersectAction: 'None'
```

Avoid:

```typescript
labelIntersectAction: 'hide'
```

### Inconsistent Font Value Casing

Avoid:

```typescript
fontStyle: 'normal'
```

Prefer:

```typescript
fontStyle: 'Normal'
```

Avoid ambiguous font-weight values when strict typing rejects them.

Use:

```typescript
fontWeight: '600'
```

or:

```typescript
fontWeight: 'Normal'
```

### Unsupported Gridline dashArray Assumption

Do not add `dashArray` to SmithChart major or minor gridlines unless it has been validated against the installed EJ2 SmithChart gridline model.

Use validated properties such as:

```typescript
majorGridLines: {
    visible: true,
    color: '#94A3B8',
    width: 1,
    opacity: 0.75
}
```

```typescript
minorGridLines: {
    visible: true,
    color: '#CBD5E1',
    width: 0.5,
    opacity: 0.45,
    count: 2
}
```

### Unsupported Axis-Line dashArray Assumption

Avoid:

```typescript
axisLine: {
    dashArray: '5,5'
}
```

unless the target SmithChart axis-line model has been explicitly validated for that property.

Use:

```typescript
axisLine: {
    visible: true,
    color: '#475569',
    width: 1
}
```

### Arbitrary Minor-Gridline Performance Limit

Do not claim:

```text
minorGridLines.count must be 5 or less
```

Start with a small count and test rendering:

```typescript
minorGridLines: {
    visible: true,
    count: 2
}
```

### Missing Optional Module Injection

Axis customization itself requires no feature-module injection.

However, the complete example also uses a legend and tooltip.

Therefore, it must include:

```typescript
import {
    SmithchartLegend,
    TooltipRender
} from '@syncfusion/ej2-charts';

Smithchart.Inject(
    SmithchartLegend,
    TooltipRender
);
```

### Missing Legend Module

Incorrect:

```typescript
legendSettings: {
    visible: true
}
```

without:

```typescript
Smithchart.Inject(
    SmithchartLegend
);
```

### Missing Tooltip Module

Incorrect:

```typescript
series: [
    {
        tooltip: {
            visible: true
        }
    }
]
```

without:

```typescript
Smithchart.Inject(
    TooltipRender
);
```

### Plain String Title

Incorrect:

```typescript
title:
    'S-Parameter Analysis'
```

Correct:

```typescript
title: {
    text: 'S-Parameter Analysis',
    visible: true
}
```

### Invalid Point Fields

Incorrect:

```typescript
points: [
    {
        x: 10,
        y: 25
    }
]
```

Correct:

```typescript
points: [
    {
        resistance: 10,
        reactance: 25
    }
]
```

### Import and Injection Validation Checklist

Before generating a SmithChart axis example, verify:

1. `Smithchart` is imported from `@syncfusion/ej2-charts`.
2. The TypeScript class uses the exact `Smithchart` casing.
3. JavaScript uses `ej.charts.Smithchart`.
4. Axis customization uses `horizontalAxis` and `radialAxis`.
5. Axis customization itself does not require module injection.
6. `SmithchartLegend` is imported when a legend is visible.
7. `SmithchartLegend` is injected when a legend is visible.
8. `TooltipRender` is imported when a tooltip is visible.
9. `TooltipRender` is injected when a tooltip is visible.
10. `labelPosition` uses `Inside` or `Outside`.
11. `labelIntersectAction` uses a supported value.
12. `labelStyle` uses valid font properties.
13. Major gridlines are configured inside `majorGridLines`.
14. Minor gridlines are configured inside `minorGridLines`.
15. Minor gridline `count` is applied only to minor gridlines.
16. Undocumented gridline properties are not added.
17. Axis lines are configured through `axisLine`.
18. Every point contains numeric `resistance`.
19. Every point contains numeric `reactance`.
20. `renderType` matches the intended electrical representation.
21. The title uses a title object.
22. Tooltip configuration remains at series level.
23. Marker configuration uses `marker`.
24. The target HTML element exists before `appendTo()`.
25. The target selector matches the HTML element ID.
26. The component has an available width.
27. The component has a suitable height.
28. The EJ2 theme stylesheet is loaded.
29. Resize handlers are debounced.
30. The SmithChart is refreshed after a hidden parent becomes visible.
31. TypeScript and JavaScript examples are complete and runnable.
32. Vue, React, Angular, Composition API, provider, directive, and Single File Component syntax are not used.