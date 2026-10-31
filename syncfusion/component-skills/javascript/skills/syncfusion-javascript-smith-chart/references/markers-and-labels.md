# Markers and Data Labels

## Overview

Markers identify individual impedance or admittance points in a SmithChart series. Data labels display information next to those markers so users can read important measurements without relying only on tooltips.

Both markers and data labels are disabled by default. In EJ2 SmithChart, the correct configuration hierarchy is:

```typescript
series: [
    {
        marker: {
            visible: true,
            dataLabel: {
                visible: true
            }
        }
    }
]
```

The originally provided `markerSettings` and `dataLabelSettings` properties are not the correct EJ2 TypeScript and JavaScript SmithChart series properties.

Use:

```typescript
marker
```

instead of:

```typescript
markerSettings
```

Use:

```typescript
marker: {
    dataLabel: {
        visible: true
    }
}
```

instead of:

```typescript
dataLabelSettings: {
    visible: true
}
```

Marker customization supports visibility, dimensions, fill, opacity, border, and shape. Data labels are configured within the marker settings.

## Table of Contents

- #understanding-markers
  - #why-use-markers
  - #marker-configuration-hierarchy
- #adding-markers-to-a-series
  - #typescript-marker-example
  - #javascript-marker-example
- #marker-styling
  - #marker-shape
  - #marker-dimensions
  - #marker-fill-and-opacity
  - #marker-border
- #data-labels
  - #enabling-data-labels
  - #data-label-styling
  - #data-label-border
  - #connector-lines
  - #data-label-templates
- #markers-with-tooltips
- #multiple-series
- #complete-typescript-example
- #complete-javascript-example
- #best-practices
- #combined-mistakes-and-future-references

## Understanding Markers

Markers are visual symbols rendered at each SmithChart data point.

A standard SmithChart point contains:

```typescript
{
    resistance: 10,
    reactance: 25
}
```

When markers are enabled, a symbol is rendered at the calculated location of every point in the series.

### Why Use Markers

Use markers to:

- Identify exact measurement locations.
- Distinguish points along an impedance or admittance path.
- Differentiate multiple series by shape and color.
- Improve hover targets for tooltips.
- Highlight changes during a frequency sweep.
- Improve readability in technical reports.
- Avoid relying only on color when displaying multiple series.

### Marker Configuration Hierarchy

The marker belongs to the series:

```typescript
series: [
    {
        points: data,
        marker: {
            visible: true
        }
    }
]
```

The data label belongs inside the marker:

```typescript
series: [
    {
        points: data,
        marker: {
            visible: true,
            dataLabel: {
                visible: true
            }
        }
    }
]
```

The tooltip remains a separate series-level property:

```typescript
series: [
    {
        points: data,
        marker: {
            visible: true
        },
        tooltip: {
            visible: true
        }
    }
]
```

## Adding Markers to a Series

Set `marker.visible` to `true`.

```typescript
marker: {
    visible: true
}
```

Markers do not require an additional injected module.

### TypeScript Marker Example

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
        height: '500px',
        renderType: 'Impedance',
        series: [
            {
                points: data,
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

### JavaScript Marker Example

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
        height: '500px',
        renderType: 'Impedance',
        series: [
            {
                points: data,
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

## Marker Styling

A marker can be customized separately for each SmithChart series.

Validated marker properties include:

- `visible`
- `shape`
- `width`
- `height`
- `fill`
- `opacity`
- `border`
- `dataLabel`

Marker width, height, fill, opacity, border, and shape can be configured independently for each series.

### Marker Shape

Set the marker shape through:

```typescript
marker: {
    visible: true,
    shape: 'Diamond'
}
```

Common SmithChart marker shapes include:

```text
Circle
Rectangle
Triangle
Diamond
Pentagon
```

Use a shape supported by the installed EJ2 version. Do not copy marker-shape values from another EJ2 control without validating them against the SmithChart marker model.

Example:

```typescript
series: [
    {
        points: data,
        marker: {
            visible: true,
            shape: 'Diamond',
            width: 10,
            height: 10
        }
    }
]
```

### Marker Dimensions

Use `width` and `height`:

```typescript
marker: {
    visible: true,
    width: 10,
    height: 10
}
```

For a square marker:

```typescript
marker: {
    visible: true,
    shape: 'Rectangle',
    width: 10,
    height: 10
}
```

Marker dimensions are numeric pixel values.

### Marker Fill and Opacity

Configure the fill color:

```typescript
marker: {
    visible: true,
    fill: '#DC2626'
}
```

Configure opacity between zero and one:

```typescript
marker: {
    visible: true,
    fill: '#DC2626',
    opacity: 0.85
}
```

A value of `1` is fully opaque:

```typescript
opacity: 1
```

A value of `0` is fully transparent:

```typescript
opacity: 0
```

Avoid very low opacity when markers are required for point identification.

### Marker Border

Configure the border within the marker:

```typescript
marker: {
    visible: true,
    fill: '#FCA5A5',
    border: {
        color: '#991B1B',
        width: 2
    }
}
```

Complete marker configuration:

```typescript
marker: {
    visible: true,
    shape: 'Circle',
    width: 10,
    height: 10,
    fill: '#EF4444',
    opacity: 0.9,
    border: {
        color: '#991B1B',
        width: 2
    }
}
```

Do not add an `opacity` property inside `border` unless it has been explicitly validated against the installed SmithChart border model.

Avoid:

```typescript
border: {
    color: '#991B1B',
    width: 2,
    opacity: 0.9
}
```

Use opacity at the marker level:

```typescript
marker: {
    opacity: 0.9,
    border: {
        color: '#991B1B',
        width: 2
    }
}
```

## Data Labels

Data labels display information near SmithChart points.

Data labels are disabled by default and are enabled through `marker.dataLabel.visible`.

### Enabling Data Labels

Correct:

```typescript
marker: {
    visible: true,
    dataLabel: {
        visible: true
    }
}
```

Full example:

```typescript
const smithchart: Smithchart =
    new Smithchart({
        series: [
            {
                points: [
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
                ],
                marker: {
                    visible: true,
                    dataLabel: {
                        visible: true
                    }
                }
            }
        ]
    });

smithchart.appendTo(
    '#smithchart-container'
);
```

Do not use:

```typescript
dataLabelSettings: {
    visible: true
}
```

### Data Label Styling

Use `textStyle` inside `dataLabel`.

```typescript
marker: {
    visible: true,
    dataLabel: {
        visible: true,
        textStyle: {
            color: '#111827',
            size: '12px',
            fontFamily: 'Segoe UI',
            fontStyle: 'Normal',
            fontWeight: '600',
            opacity: 1
        }
    }
}
```

Recommended font styling:

```typescript
textStyle: {
    color: '#111827',
    size: '12px',
    fontFamily: 'Segoe UI',
    fontStyle: 'Normal',
    fontWeight: '600'
}
```

Use a font size that remains readable against the SmithChart grid.

### Data Label Border

Configure the label border:

```typescript
marker: {
    visible: true,
    dataLabel: {
        visible: true,
        fill: '#EFF6FF',
        opacity: 0.95,
        border: {
            color: '#2563EB',
            width: 1
        }
    }
}
```

The data-label model supports options such as visibility, fill, opacity, border, connector line, template, and text style.

### Connector Lines

When labels are offset from their points, connector lines can help users associate each label with the corresponding marker.

```typescript
marker: {
    visible: true,
    dataLabel: {
        visible: true,
        connectorLine: {
            color: '#64748B',
            width: 1
        }
    }
}
```

Complete configuration:

```typescript
marker: {
    visible: true,
    shape: 'Circle',
    width: 9,
    height: 9,
    dataLabel: {
        visible: true,
        fill: '#FFFFFF',
        border: {
            color: '#94A3B8',
            width: 1
        },
        connectorLine: {
            color: '#64748B',
            width: 1
        },
        textStyle: {
            color: '#0F172A',
            size: '11px',
            fontFamily: 'Segoe UI',
            fontWeight: '500'
        }
    }
}
```

### Data Label Templates

Use the SmithChart data-label `template` property when custom HTML content is required.

HTML template:

```html
<script
    id="smithchart-label-template"
    type="text/x-template"
>
    <div class="smithchart-label">
        <span>${point.resistance}</span>
        <span>${point.reactance}</span>
    </div>
</script>
```

Series configuration:

```typescript
marker: {
    visible: true,
    dataLabel: {
        visible: true,
        template: '#smithchart-label-template'
    }
}
```

Template property names and context must be validated against the installed EJ2 version before using a complex template.

Do not assume that a regular Chart-style `format` property is available.

Avoid:

```typescript
dataLabel: {
    visible: true,
    format:
        '(R:{point.resistance}, X:{point.reactance})'
}
```

Use the default SmithChart label rendering or a validated template.

## Markers with Tooltips

Markers and tooltips are commonly used together.

Tooltips require the `TooltipRender` module in TypeScript. The tooltip is enabled at series level.

Correct import and injection:

```typescript
import {
    Smithchart,
    TooltipRender
} from '@syncfusion/ej2-charts';

Smithchart.Inject(
    TooltipRender
);
```

Correct configuration:

```typescript
series: [
    {
        points: data,
        marker: {
            visible: true,
            width: 10,
            height: 10
        },
        tooltip: {
            visible: true
        }
    }
]
```

Do not place the tooltip inside `marker`:

```typescript
marker: {
    tooltip: {
        visible: true
    }
}
```

Do not configure a Chart-style root tooltip:

```typescript
tooltip: {
    enable: true
}
```

## Multiple Series

Use different marker shapes and colors to distinguish separate measurement series.

If a legend is visible, import and inject `SmithchartLegend`.

```typescript
import {
    Smithchart,
    SmithchartLegend
} from '@syncfusion/ej2-charts';

Smithchart.Inject(
    SmithchartLegend
);
```

Example:

```typescript
const smithchart: Smithchart =
    new Smithchart({
        legendSettings: {
            visible: true,
            position: 'Bottom'
        },
        series: [
            {
                name: 'Measured',
                points: [
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
                ],
                fill: '#2563EB',
                marker: {
                    visible: true,
                    shape: 'Circle',
                    width: 9,
                    height: 9,
                    fill: '#2563EB',
                    border: {
                        color: '#1E3A8A',
                        width: 2
                    }
                }
            },
            {
                name: 'Simulated',
                points: [
                    {
                        resistance: 20,
                        reactance: -50
                    },
                    {
                        resistance: 10,
                        reactance: -10
                    },
                    {
                        resistance: 8,
                        reactance: -3.5
                    }
                ],
                fill: '#DC2626',
                marker: {
                    visible: true,
                    shape: 'Diamond',
                    width: 10,
                    height: 10,
                    fill: '#DC2626',
                    border: {
                        color: '#7F1D1D',
                        width: 2
                    }
                }
            }
        ]
    });

smithchart.appendTo(
    '#smithchart-container'
);
```

The `SmithchartLegend` module is required when `legendSettings.visible` is enabled.

## Complete TypeScript Example

This example includes:

- Correct `marker` configuration
- Nested `marker.dataLabel`
- Marker dimensions
- Marker shape
- Fill and opacity
- Border styling
- Data-label styling
- Connector lines
- Tooltip support
- Legend support
- Correct imports
- Correct module injection
- Responsive HTML container

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

    <title>SmithChart Markers and Labels</title>

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
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            box-sizing: border-box;
            border: 1px solid #E2E8F0;
            border-radius: 12px;
            background: #FFFFFF;
        }

        #smithchart-container {
            width: 100%;
            min-height: 550px;
        }

        @media (max-width: 767px) {
            body {
                padding: 12px;
            }

            .smithchart-wrapper {
                padding: 12px;
            }

            #smithchart-container {
                min-height: 420px;
            }
        }
    </style>
</head>
<body>
    <main class="smithchart-wrapper">
        <div id="smithchart-container"></div>
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

const measuredData: SmithChartPoint[] = [
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

const simulatedData: SmithChartPoint[] = [
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

const smithchart: Smithchart =
    new Smithchart({
        width: '100%',
        height: '550px',
        renderType: 'Impedance',
        title: {
            text:
                'Measured and Simulated Impedance',
            visible: true,
            textStyle: {
                color: '#0F172A',
                size: '18px',
                fontFamily: 'Segoe UI',
                fontWeight: '600'
            }
        },
        legendSettings: {
            visible: true,
            position: 'Bottom'
        },
        smithchartArea: {
            background: '#FFFFFF',
            border: {
                color: '#CBD5E1',
                width: 1
            }
        },
        series: [
            {
                name: 'Measured',
                points: measuredData,
                fill: '#2563EB',
                width: 2,
                marker: {
                    visible: true,
                    shape: 'Circle',
                    width: 10,
                    height: 10,
                    fill: '#3B82F6',
                    opacity: 1,
                    border: {
                        color: '#1E3A8A',
                        width: 2
                    },
                    dataLabel: {
                        visible: true,
                        fill: '#EFF6FF',
                        opacity: 0.95,
                        border: {
                            color: '#2563EB',
                            width: 1
                        },
                        connectorLine: {
                            color: '#64748B',
                            width: 1
                        },
                        textStyle: {
                            color: '#1E3A8A',
                            size: '11px',
                            fontFamily: 'Segoe UI',
                            fontStyle: 'Normal',
                            fontWeight: '600',
                            opacity: 1
                        }
                    }
                },
                tooltip: {
                    visible: true
                }
            },
            {
                name: 'Simulated',
                points: simulatedData,
                fill: '#DC2626',
                width: 2,
                marker: {
                    visible: true,
                    shape: 'Diamond',
                    width: 10,
                    height: 10,
                    fill: '#EF4444',
                    opacity: 1,
                    border: {
                        color: '#7F1D1D',
                        width: 2
                    },
                    dataLabel: {
                        visible: false
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

    <title>SmithChart Markers and Labels</title>


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
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            box-sizing: border-box;
            border: 1px solid #E2E8F0;
            border-radius: 12px;
            background: #FFFFFF;
        }

        #smithchart-container {
            width: 100%;
            min-height: 550px;
        }

        @media (max-width: 767px) {
            body {
                padding: 12px;
            }

            .smithchart-wrapper {
                padding: 12px;
            }

            #smithchart-container {
                min-height: 420px;
            }
        }
    </style>
</head>
<body>
    <main class="smithchart-wrapper">
        <div id="smithchart-container"></div>
    </main>

    <script>
        var measuredData = [
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

        var simulatedData = [
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

        var smithchart =
            new ej.charts.Smithchart({
                width: '100%',
                height: '550px',
                renderType: 'Impedance',
                title: {
                    text:
                        'Measured and Simulated Impedance',
                    visible: true,
                    textStyle: {
                        color: '#0F172A',
                        size: '18px',
                        fontFamily: 'Segoe UI',
                        fontWeight: '600'
                    }
                },
                legendSettings: {
                    visible: true,
                    position: 'Bottom'
                },
                smithchartArea: {
                    background: '#FFFFFF',
                    border: {
                        color: '#CBD5E1',
                        width: 1
                    }
                },
                series: [
                    {
                        name: 'Measured',
                        points: measuredData,
                        fill: '#2563EB',
                        width: 2,
                        marker: {
                            visible: true,
                            shape: 'Circle',
                            width: 10,
                            height: 10,
                            fill: '#3B82F6',
                            opacity: 1,
                            border: {
                                color: '#1E3A8A',
                                width: 2
                            },
                            dataLabel: {
                                visible: true,
                                fill: '#EFF6FF',
                                opacity: 0.95,
                                border: {
                                    color: '#2563EB',
                                    width: 1
                                },
                                connectorLine: {
                                    color: '#64748B',
                                    width: 1
                                },
                                textStyle: {
                                    color: '#1E3A8A',
                                    size: '11px',
                                    fontFamily:
                                        'Segoe UI',
                                    fontStyle:
                                        'Normal',
                                    fontWeight:
                                        '600',
                                    opacity: 1
                                }
                            }
                        },
                        tooltip: {
                            visible: true
                        }
                    },
                    {
                        name: 'Simulated',
                        points: simulatedData,
                        fill: '#DC2626',
                        width: 2,
                        marker: {
                            visible: true,
                            shape: 'Diamond',
                            width: 10,
                            height: 10,
                            fill: '#EF4444',
                            opacity: 1,
                            border: {
                                color: '#7F1D1D',
                                width: 2
                            },
                            dataLabel: {
                                visible: false
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
    </script>
</body>
</html>
```

## Best Practices

### Marker Selection

For a single series:

- Use a simple shape such as `Circle`.
- Use a consistent marker size.
- Keep the marker border visible against the chart grid.

For multiple series:

- Use different shapes as well as different colors.
- Keep marker dimensions visually balanced.
- Enable the legend and assign a meaningful series name.
- Avoid using color as the only differentiator.

### Label Strategy

Use data labels when:

- The chart has a small number of points.
- Specific measurements must be visible in a report.
- Users need values without hovering.
- The chart is intended for static printing.

Hide data labels when:

- The series contains many closely spaced points.
- Labels overlap extensively.
- Tooltips provide sufficient interactive detail.
- The SmithChart is rendered in a compact layout.

Example:

```typescript
marker: {
    visible: true,
    dataLabel: {
        visible: false
    }
},
tooltip: {
    visible: true
}
```

### Performance

For data-intensive SmithCharts:

- Keep marker dimensions reasonable.
- Disable data labels when they create excessive visual elements.
- Avoid complex HTML templates for every point.
- Avoid repeatedly calling `refresh()` for individual updates.
- Batch datasource changes before updating the component.
- Destroy the SmithChart when its containing view is removed.

### Accessibility

Use:

- Distinct marker shapes.
- Sufficient color contrast.
- Readable label text.
- A visible legend.
- Descriptive surrounding HTML.
- A textual summary of important measurements.

Example:

```html
<section aria-labelledby="smithchart-heading">
    <h2 id="smithchart-heading">
        Transmission-line impedance measurements
    </h2>

    <p id="smithchart-description">
        The SmithChart compares measured and simulated
        impedance values.
    </p>

    <div
        id="smithchart-container"
        aria-describedby="smithchart-description"
    ></div>
</section>
```

## Combined Mistakes and Future References

### Incorrect markerSettings Property

Incorrect:

```typescript
markerSettings: {
    visible: true
}
```

Correct:

```typescript
marker: {
    visible: true
}
```

### Incorrect dataLabelSettings Property

Incorrect:

```typescript
dataLabelSettings: {
    visible: true
}
```

Correct:

```typescript
marker: {
    dataLabel: {
        visible: true
    }
}
```

### Incorrect Data Label Position

Avoid undocumented Chart-style position configuration:

```typescript
dataLabel: {
    position: 'Top'
}
```

Do not assume SmithChart data labels support:

```text
Top
Bottom
Left
Right
Middle
```

Use the supported SmithChart data-label model, connector line, or template configuration.

### Incorrect Data Label Alignment

Avoid:

```typescript
dataLabel: {
    alignment: 'Center'
}
```

Do not claim that this automatically prevents label overlap unless the behavior and property are validated against the installed EJ2 version.

### Incorrect Format Property

Avoid:

```typescript
dataLabel: {
    format:
        '(R:{point.resistance}, X:{point.reactance})'
}
```

Use default label rendering or a validated data-label template.

### Assuming a label Field Is Automatically Rendered

Do not assume that adding this field automatically changes the data-label text:

```typescript
{
    resistance: 10,
    reactance: 25,
    label: 'Point A'
}
```

The required SmithChart point fields are:

```text
resistance
reactance
```

Use a validated template when custom label content is required.

### Incorrect Border Opacity

Avoid:

```typescript
border: {
    color: '#991B1B',
    width: 2,
    opacity: 0.9
}
```

Use marker-level opacity:

```typescript
marker: {
    opacity: 0.9,
    border: {
        color: '#991B1B',
        width: 2
    }
}
```

### Unsupported Marker Shapes

Do not assume every marker shape available in another EJ2 Chart component is supported by SmithChart.

Validate shapes such as:

```text
Cross
StarFour
StarFive
InvertedTriangle
```

before documenting them as SmithChart marker values.

Use a validated common shape:

```typescript
shape: 'Circle'
```

```typescript
shape: 'Rectangle'
```

```typescript
shape: 'Triangle'
```

```typescript
shape: 'Diamond'
```

### Missing Tooltip Module

Incorrect TypeScript configuration:

```typescript
series: [
    {
        tooltip: {
            visible: true
        }
    }
]
```

without `TooltipRender`.

Correct:

```typescript
import {
    Smithchart,
    TooltipRender
} from '@syncfusion/ej2-charts';

Smithchart.Inject(
    TooltipRender
);
```

### Missing Legend Module

Incorrect TypeScript configuration:

```typescript
legendSettings: {
    visible: true
}
```

without `SmithchartLegend`.

Correct:

```typescript
import {
    SmithchartLegend
} from '@syncfusion/ej2-charts';

Smithchart.Inject(
    SmithchartLegend
);
```

### Tooltip Placed Inside Marker

Incorrect:

```typescript
marker: {
    tooltip: {
        visible: true
    }
}
```

Correct:

```typescript
marker: {
    visible: true
},
tooltip: {
    visible: true
}
```

### Invalid Plain String Title

Incorrect:

```typescript
title: 'Network Parameter Measurements'
```

Correct:

```typescript
title: {
    text: 'Network Parameter Measurements',
    visible: true
}
```

### Import and Injection Validation Checklist

Before generating a SmithChart marker and data-label example, verify:

1. `Smithchart` is imported from `@syncfusion/ej2-charts`.
2. The class uses the exact `Smithchart` casing.
3. JavaScript uses `ej.charts.Smithchart`.
4. Basic markers do not require an injected module.
5. Basic data labels do not require an injected module.
6. Tooltip usage imports `TooltipRender`.
7. Tooltip usage injects `TooltipRender`.
8. Legend usage imports `SmithchartLegend`.
9. Legend usage injects `SmithchartLegend`.
10. Marker configuration uses `marker`.
11. Data-label configuration uses `marker.dataLabel`.
12. `markerSettings` is not used.
13. `dataLabelSettings` is not used.
14. Every point has numeric `resistance`.
15. Every point has numeric `reactance`.
16. Marker width and height are valid positive numbers.
17. Marker opacity is between zero and one.
18. Marker shape is supported by the installed EJ2 version.
19. Border configuration uses color and width.
20. Unsupported border opacity is not added.
21. Data-label styling is nested inside `marker.dataLabel`.
22. Custom label content uses a validated template.
23. Tooltip configuration remains at series level.
24. Each legend-enabled series has a meaningful name.
25. The HTML container exists before `appendTo()`.
26. The selector matches the container ID.
27. The container has a usable width and height.
28. The EJ2 theme stylesheet is loaded.
29. TypeScript and JavaScript examples are complete and runnable.
30. Vue, React, Angular, Composition API, provider, directive, and Single File Component syntax are not used.