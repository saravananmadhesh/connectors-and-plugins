# Series and Data Configuration

## Overview

An EJ2 SmithChart series represents an ordered collection of impedance or admittance coordinates. Each series is rendered as a connected path, and each point contains a real component and an imaginary component.

The SmithChart supports:

- Any number of series and points.
- Impedance rendering.
- Admittance rendering.
- Inline point collections.
- Datasource field mapping.
- Independent styling for each series.
- Markers, data labels, and tooltips.
- Legend-based series identification and visibility toggling.

The following corrections have been applied to the supplied material:

- `Impedance` and `Admittance` are SmithChart-level rendering modes, not individual series types.
- Use the root-level `renderType` property.
- Do not use `type: 'Impedance'` or `type: 'Admittance'` inside a series.
- A single SmithChart cannot mix impedance and admittance rendering modes per series.
- Use separate SmithChart instances when both representations must be displayed simultaneously.
- Inline data uses the series `points` property.
- Mapped data uses `dataSource`, `resistance`, and `reactance`.
- An arbitrary `label` field is not automatically displayed.
- Custom point text requires a validated data-label template or tooltip template.
- For normalized impedance, the matched-load point is `1 + j0`, not `0 + j0`.
- Raw S-parameter real and imaginary values must not automatically be treated as normalized impedance.
- If the input contains reflection-coefficient values, convert them to normalized impedance before plotting them as impedance.
- Use `dataBind()` after replacing series data.
- Use `refresh()` only when a complete rerender is necessary.
- Do not impose arbitrary universal limits such as 500 points or 10 series. Validate performance with the actual data and target devices.

## Table of Contents

- #understanding-smithchart-series
  - #series-fundamentals
  - #smithchart-rendering-mode
- #impedance-rendering
- #admittance-rendering
- #data-point-structure
  - #inline-point-structure
  - #normalized-impedance
  - #normalized-admittance
  - #reflection-coefficient-conversion
- #creating-a-series
  - #typescript-inline-points
  - #javascript-inline-points
- #datasource-field-mapping
  - #typescript-mapped-data
  - #javascript-mapped-data
- #multiple-series
  - #required-legend-module
  - #typescript-multiple-series
  - #javascript-multiple-series
- #series-customization
  - #line-appearance
  - #marker-configuration
  - #data-label-configuration
  - #tooltip-configuration
- #data-binding-patterns
  - #static-data
  - #transformed-data
  - #dynamic-data-updates
  - #remote-data
  - #real-time-data
- #complete-typescript-example
- #complete-javascript-example
- #best-practices
- #combined-mistakes-and-future-references

## Understanding SmithChart Series

A series groups related SmithChart measurements.

Typical series include:

- Measured impedance
- Simulated impedance
- Device A measurements
- Device B measurements
- Input impedance
- Output impedance
- Measurements from separate frequency sweeps
- Measurements captured under different operating conditions

Each series can have its own:

- Name
- Point collection
- Line color
- Line width
- Line opacity
- Visibility
- Marker settings
- Data-label settings
- Tooltip settings

### Series Fundamentals

A basic inline series has this structure:

```typescript
series: [
    {
        name: 'Measured Impedance',
        points: [
            {
                resistance: 10,
                reactance: 25
            },
            {
                resistance: 8,
                reactance: 6
            }
        ]
    }
]
```

The order of points matters because the SmithChart connects them in collection order.

For a frequency sweep, sort the records by frequency before converting them into SmithChart points.

```typescript
measurements.sort(
    (
        first: Measurement,
        second: Measurement
    ): number => {
        return (
            first.frequencyGHz -
            second.frequencyGHz
        );
    }
);
```

### SmithChart Rendering Mode

The rendering mode belongs to the SmithChart, not to an individual series.

Impedance:

```typescript
const smithchart: Smithchart =
    new Smithchart({
        renderType: 'Impedance',
        series: seriesCollection
    });
```

Admittance:

```typescript
const smithchart: Smithchart =
    new Smithchart({
        renderType: 'Admittance',
        series: seriesCollection
    });
```

The supported rendering modes are `Impedance` and `Admittance`.

Do not configure the mode inside a series:

```typescript
series: [
    {
        type: 'Impedance'
    }
]
```

## Impedance Rendering

Use impedance rendering for normalized impedance coordinates.

```typescript
renderType: 'Impedance'
```

A point represents:

```text
z = r + jx
```

where:

- `r` is normalized resistance.
- `x` is normalized reactance.
- Positive reactance is inductive.
- Negative reactance is capacitive.

Example:

```typescript
const impedanceData = [
    {
        resistance: 2,
        reactance: 1
    },
    {
        resistance: 1.5,
        reactance: 0.5
    },
    {
        resistance: 1,
        reactance: 0
    },
    {
        resistance: 0.8,
        reactance: -0.3
    }
];
```

The normalized matched-load point is:

```typescript
{
    resistance: 1,
    reactance: 0
}
```

For a 50-ohm system, normalize an absolute impedance using:

```text
z = Z / 50
```

Example:

```typescript
interface AbsoluteImpedance {
    resistanceOhms: number;
    reactanceOhms: number;
}

interface SmithChartPoint {
    resistance: number;
    reactance: number;
}

const normalizeImpedance = (
    impedance: AbsoluteImpedance,
    referenceImpedance: number
): SmithChartPoint => {
    if (
        !Number.isFinite(referenceImpedance) ||
        referenceImpedance <= 0
    ) {
        throw new Error(
            'Reference impedance must be a positive number.'
        );
    }

    return {
        resistance:
            impedance.resistanceOhms /
            referenceImpedance,
        reactance:
            impedance.reactanceOhms /
            referenceImpedance
    };
};
```

Usage:

```typescript
const point: SmithChartPoint =
    normalizeImpedance(
        {
            resistanceOhms: 75,
            reactanceOhms: 25
        },
        50
    );
```

Result:

```typescript
{
    resistance: 1.5,
    reactance: 0.5
}
```

## Admittance Rendering

Use admittance rendering for normalized admittance coordinates.

```typescript
renderType: 'Admittance'
```

A normalized admittance point represents:

```text
y = g + jb
```

where:

- `g` is normalized conductance.
- `b` is normalized susceptance.

The EJ2 SmithChart point model still uses the field names:

```typescript
{
    resistance: 1,
    reactance: 0
}
```

In an admittance-rendered SmithChart, these mapped values represent the real and imaginary admittance components for plotting purposes.

Example:

```typescript
const admittanceData = [
    {
        resistance: 0.5,
        reactance: -0.8
    },
    {
        resistance: 0.6,
        reactance: -0.4
    },
    {
        resistance: 0.8,
        reactance: -0.2
    },
    {
        resistance: 1,
        reactance: 0
    }
];

const smithchart: Smithchart =
    new Smithchart({
        renderType: 'Admittance',
        series: [
            {
                name: 'Normalized Admittance',
                points: admittanceData
            }
        ]
    });
```

Do not mix impedance and admittance modes inside one SmithChart:

```typescript
series: [
    {
        type: 'Impedance'
    },
    {
        type: 'Admittance'
    }
]
```

Use separate SmithChart instances when both views are required:

```typescript
const impedanceChart: Smithchart =
    new Smithchart({
        renderType: 'Impedance',
        series: impedanceSeries
    });

const admittanceChart: Smithchart =
    new Smithchart({
        renderType: 'Admittance',
        series: admittanceSeries
    });

impedanceChart.appendTo(
    '#impedance-smithchart'
);

admittanceChart.appendTo(
    '#admittance-smithchart'
);
```

## Data Point Structure

### Inline Point Structure

An inline SmithChart point contains:

```typescript
interface SmithChartPoint {
    resistance: number;
    reactance: number;
}
```

Example:

```typescript
const point: SmithChartPoint = {
    resistance: 1.5,
    reactance: 0.5
};
```

Validation function:

```typescript
const isValidSmithChartPoint = (
    point: SmithChartPoint
): boolean => {
    return (
        Number.isFinite(
            point.resistance
        ) &&
        Number.isFinite(
            point.reactance
        )
    );
};
```

Filter invalid records:

```typescript
const validPoints: SmithChartPoint[] =
    points.filter(
        (
            point: SmithChartPoint
        ): boolean => {
            return (
                isValidSmithChartPoint(
                    point
                )
            );
        }
    );
```

### Normalized Impedance

Normalized impedance is calculated using:

```text
r = R / Z0
x = X / Z0
```

where:

- `R` is resistance in ohms.
- `X` is reactance in ohms.
- `Z0` is the reference impedance.
- `r` and `x` are normalized values.

TypeScript conversion:

```typescript
interface ImpedanceMeasurement {
    frequencyGHz: number;
    resistanceOhms: number;
    reactanceOhms: number;
}

interface NormalizedImpedancePoint {
    frequencyGHz: number;
    resistance: number;
    reactance: number;
}

const normalizeMeasurements = (
    measurements: ImpedanceMeasurement[],
    referenceImpedance: number
): NormalizedImpedancePoint[] => {
    if (
        !Number.isFinite(referenceImpedance) ||
        referenceImpedance <= 0
    ) {
        throw new Error(
            'Reference impedance must be positive.'
        );
    }

    return measurements.map(
        (
            measurement:
                ImpedanceMeasurement
        ): NormalizedImpedancePoint => {
            return {
                frequencyGHz:
                    measurement.frequencyGHz,
                resistance:
                    measurement.resistanceOhms /
                    referenceImpedance,
                reactance:
                    measurement.reactanceOhms /
                    referenceImpedance
            };
        }
    );
};
```

### Normalized Admittance

Normalized admittance is the reciprocal of normalized impedance:

```text
y = 1 / z
```

For:

```text
z = r + jx
```

normalized admittance is:

```text
g = r / (r² + x²)
b = -x / (r² + x²)
```

TypeScript conversion:

```typescript
interface SmithChartPoint {
    resistance: number;
    reactance: number;
}

const impedanceToAdmittance = (
    impedance: SmithChartPoint
): SmithChartPoint => {
    const denominator: number =
        (
            impedance.resistance *
            impedance.resistance
        ) +
        (
            impedance.reactance *
            impedance.reactance
        );

    if (denominator === 0) {
        throw new Error(
            'Zero impedance cannot be converted to finite admittance.'
        );
    }

    return {
        resistance:
            impedance.resistance /
            denominator,
        reactance:
            -impedance.reactance /
            denominator
    };
};
```

### Reflection Coefficient Conversion

Raw S11 real and imaginary values are reflection-coefficient values, not normalized impedance coordinates.

If:

```text
Γ = a + jb
```

then normalized impedance is:

```text
z = (1 + Γ) / (1 - Γ)
```

TypeScript conversion:

```typescript
interface ReflectionCoefficient {
    real: number;
    imaginary: number;
}

interface SmithChartPoint {
    resistance: number;
    reactance: number;
}

const reflectionToImpedance = (
    reflection: ReflectionCoefficient
): SmithChartPoint => {
    const denominatorReal: number =
        1 - reflection.real;

    const denominatorImaginary: number =
        -reflection.imaginary;

    const numeratorReal: number =
        1 + reflection.real;

    const numeratorImaginary: number =
        reflection.imaginary;

    const denominatorMagnitudeSquared:
        number =
            (
                denominatorReal *
                denominatorReal
            ) +
            (
                denominatorImaginary *
                denominatorImaginary
            );

    if (
        denominatorMagnitudeSquared === 0
    ) {
        throw new Error(
            'The reflection coefficient produces infinite impedance.'
        );
    }

    return {
        resistance:
            (
                numeratorReal *
                denominatorReal +
                numeratorImaginary *
                denominatorImaginary
            ) /
            denominatorMagnitudeSquared,
        reactance:
            (
                numeratorImaginary *
                denominatorReal -
                numeratorReal *
                denominatorImaginary
            ) /
            denominatorMagnitudeSquared
    };
};
```

Do not directly map:

```typescript
{
    resistance: record.s11Real,
    reactance: record.s11Imaginary
}
```

unless the input values have already been converted into the coordinate representation expected by the SmithChart.

## Creating a Series

### TypeScript Inline Points

```typescript
import {
    Smithchart
} from '@syncfusion/ej2-charts';

interface SmithChartPoint {
    resistance: number;
    reactance: number;
}

const impedanceData: SmithChartPoint[] = [
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
    },
    {
        resistance: 1,
        reactance: 0
    },
    {
        resistance: 0.8,
        reactance: -0.2
    }
];

const smithchart: Smithchart =
    new Smithchart({
        width: '100%',
        height: '500px',
        renderType: 'Impedance',
        series: [
            {
                name: 'Transmission Line',
                points: impedanceData,
                fill: '#2563EB',
                width: 2
            }
        ]
    });

smithchart.appendTo(
    '#smithchart-container'
);
```

### JavaScript Inline Points

```javascript
var impedanceData = [
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
    },
    {
        resistance: 1,
        reactance: 0
    },
    {
        resistance: 0.8,
        reactance: -0.2
    }
];

var smithchart =
    new ej.charts.Smithchart({
        width: '100%',
        height: '500px',
        renderType: 'Impedance',
        series: [
            {
                name: 'Transmission Line',
                points: impedanceData,
                fill: '#2563EB',
                width: 2
            }
        ]
    });

smithchart.appendTo(
    '#smithchart-container'
);
```

## Datasource Field Mapping

Use datasource mapping when the original field names are not `resistance` and `reactance`.

The SmithChart supports datasource-based series mapping in addition to inline points.

### TypeScript Mapped Data

```typescript
import {
    Smithchart
} from '@syncfusion/ej2-charts';

interface Measurement {
    frequencyGHz: number;
    normalizedResistance: number;
    normalizedReactance: number;
}

const measurements: Measurement[] = [
    {
        frequencyGHz: 1,
        normalizedResistance: 2.5,
        normalizedReactance: 1.3
    },
    {
        frequencyGHz: 1.5,
        normalizedResistance: 2,
        normalizedReactance: 1.2
    },
    {
        frequencyGHz: 2,
        normalizedResistance: 1.5,
        normalizedReactance: 1
    },
    {
        frequencyGHz: 2.5,
        normalizedResistance: 1,
        normalizedReactance: 0
    }
];

const smithchart: Smithchart =
    new Smithchart({
        width: '100%',
        height: '500px',
        renderType: 'Impedance',
        series: [
            {
                name: 'Frequency Sweep',
                dataSource: measurements,
                resistance:
                    'normalizedResistance',
                reactance:
                    'normalizedReactance',
                fill: '#2563EB',
                width: 2
            }
        ]
    });

smithchart.appendTo(
    '#smithchart-container'
);
```

### JavaScript Mapped Data

```javascript
var measurements = [
    {
        frequencyGHz: 1,
        normalizedResistance: 2.5,
        normalizedReactance: 1.3
    },
    {
        frequencyGHz: 1.5,
        normalizedResistance: 2,
        normalizedReactance: 1.2
    },
    {
        frequencyGHz: 2,
        normalizedResistance: 1.5,
        normalizedReactance: 1
    },
    {
        frequencyGHz: 2.5,
        normalizedResistance: 1,
        normalizedReactance: 0
    }
];

var smithchart =
    new ej.charts.Smithchart({
        width: '100%',
        height: '500px',
        renderType: 'Impedance',
        series: [
            {
                name: 'Frequency Sweep',
                dataSource: measurements,
                resistance:
                    'normalizedResistance',
                reactance:
                    'normalizedReactance',
                fill: '#2563EB',
                width: 2
            }
        ]
    });

smithchart.appendTo(
    '#smithchart-container'
);
```

Choose one binding pattern per series:

Inline points:

```typescript
points: impedanceData
```

Mapped datasource:

```typescript
dataSource: measurements,
resistance: 'normalizedResistance',
reactance: 'normalizedReactance'
```

Do not unnecessarily provide both `points` and `dataSource` for the same series.

## Multiple Series

A SmithChart can render multiple series and points.

Use multiple series to compare:

- Measured and simulated results
- Devices
- Ports
- Operating temperatures
- Matching-network configurations
- Frequency bands
- Calibration states

### Required Legend Module

When a visible legend is used in TypeScript, import and inject `SmithchartLegend`.

```typescript
import {
    Smithchart,
    SmithchartLegend
} from '@syncfusion/ej2-charts';

Smithchart.Inject(
    SmithchartLegend
);
```

### TypeScript Multiple Series

```typescript
import {
    Smithchart,
    SmithchartLegend
} from '@syncfusion/ej2-charts';

interface SmithChartPoint {
    resistance: number;
    reactance: number;
}

Smithchart.Inject(
    SmithchartLegend
);

const measuredData: SmithChartPoint[] = [
    {
        resistance: 2.5,
        reactance: 1.3
    },
    {
        resistance: 2,
        reactance: 1
    },
    {
        resistance: 1.5,
        reactance: 0.5
    },
    {
        resistance: 1,
        reactance: 0
    }
];

const simulatedData: SmithChartPoint[] = [
    {
        resistance: 2.3,
        reactance: 1.1
    },
    {
        resistance: 1.9,
        reactance: 0.8
    },
    {
        resistance: 1.4,
        reactance: 0.4
    },
    {
        resistance: 1.05,
        reactance: 0.02
    }
];

const smithchart: Smithchart =
    new Smithchart({
        width: '100%',
        height: '550px',
        renderType: 'Impedance',
        legendSettings: {
            visible: true,
            position: 'Bottom',
            toggleVisibility: true
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
                    width: 9,
                    height: 9
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
                    width: 9,
                    height: 9
                }
            }
        ]
    });

smithchart.appendTo(
    '#smithchart-container'
);
```

### JavaScript Multiple Series

```javascript
var measuredData = [
    {
        resistance: 2.5,
        reactance: 1.3
    },
    {
        resistance: 2,
        reactance: 1
    },
    {
        resistance: 1.5,
        reactance: 0.5
    },
    {
        resistance: 1,
        reactance: 0
    }
];

var simulatedData = [
    {
        resistance: 2.3,
        reactance: 1.1
    },
    {
        resistance: 1.9,
        reactance: 0.8
    },
    {
        resistance: 1.4,
        reactance: 0.4
    },
    {
        resistance: 1.05,
        reactance: 0.02
    }
];

var smithchart =
    new ej.charts.Smithchart({
        width: '100%',
        height: '550px',
        renderType: 'Impedance',
        legendSettings: {
            visible: true,
            position: 'Bottom',
            toggleVisibility: true
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
                    width: 9,
                    height: 9
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
                    width: 9,
                    height: 9
                }
            }
        ]
    });

smithchart.appendTo(
    '#smithchart-container'
);
```

## Series Customization

### Line Appearance

Use `fill` for the series color:

```typescript
fill: '#2563EB'
```

Use `width` for line thickness:

```typescript
width: 2
```

Use `opacity` to make the complete series transparent:

```typescript
opacity: 0.85
```

Complete line configuration:

```typescript
series: [
    {
        name: 'Measured',
        points: measuredData,
        fill: '#2563EB',
        width: 2,
        opacity: 0.9
    }
]
```

Do not add `dashArray` without validating it against the installed SmithChart series model.

### Marker Configuration

Markers are configured through `marker`, not `markerSettings`.

```typescript
marker: {
    visible: true,
    shape: 'Circle',
    width: 9,
    height: 9,
    fill: '#3B82F6',
    opacity: 1,
    border: {
        color: '#1E3A8A',
        width: 2
    }
}
```

### Data Label Configuration

Data labels are nested inside `marker`.

```typescript
marker: {
    visible: true,
    dataLabel: {
        visible: true,
        fill: '#EFF6FF',
        border: {
            color: '#2563EB',
            width: 1
        },
        textStyle: {
            color: '#1E3A8A',
            size: '11px',
            fontFamily: 'Segoe UI',
            fontWeight: '600'
        }
    }
}
```

Do not use:

```typescript
dataLabelSettings: {
    visible: true
}
```

### Tooltip Configuration

Tooltips require `TooltipRender` in TypeScript.

```typescript
import {
    Smithchart,
    TooltipRender
} from '@syncfusion/ej2-charts';

Smithchart.Inject(
    TooltipRender
);
```

Configure the tooltip at series level:

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

Do not configure a root-level Chart tooltip:

```typescript
tooltip: {
    enable: true
}
```

## Data Binding Patterns

### Static Data

```typescript
const smithchart: Smithchart =
    new Smithchart({
        series: [
            {
                points: [
                    {
                        resistance: 2,
                        reactance: 1
                    },
                    {
                        resistance: 1.5,
                        reactance: 0.5
                    },
                    {
                        resistance: 1,
                        reactance: 0
                    }
                ]
            }
        ]
    });
```

### Transformed Data

```typescript
interface RawMeasurement {
    frequencyGHz: number;
    resistanceOhms: number;
    reactanceOhms: number;
}

interface SmithChartPoint {
    resistance: number;
    reactance: number;
}

const referenceImpedance: number = 50;

const measurements: RawMeasurement[] = [
    {
        frequencyGHz: 1,
        resistanceOhms: 100,
        reactanceOhms: 50
    },
    {
        frequencyGHz: 1.5,
        resistanceOhms: 75,
        reactanceOhms: 25
    },
    {
        frequencyGHz: 2,
        resistanceOhms: 50,
        reactanceOhms: 0
    }
];

const smithChartData: SmithChartPoint[] =
    measurements.map(
        (
            measurement:
                RawMeasurement
        ): SmithChartPoint => {
            return {
                resistance:
                    measurement.resistanceOhms /
                    referenceImpedance,
                reactance:
                    measurement.reactanceOhms /
                    referenceImpedance
            };
        }
    );
```

Bind the transformed data:

```typescript
const smithchart: Smithchart =
    new Smithchart({
        renderType: 'Impedance',
        series: [
            {
                points: smithChartData
            }
        ]
    });
```

### Dynamic Data Updates

Create the component with an initial collection:

```typescript
const initialData: SmithChartPoint[] = [
    {
        resistance: 2,
        reactance: 1
    },
    {
        resistance: 1.5,
        reactance: 0.5
    }
];

const smithchart: Smithchart =
    new Smithchart({
        series: [
            {
                name: 'Live Measurements',
                points: initialData
            }
        ]
    });

smithchart.appendTo(
    '#smithchart-container'
);
```

Replace the data:

```typescript
const updatedData: SmithChartPoint[] = [
    {
        resistance: 2.2,
        reactance: 1.1
    },
    {
        resistance: 1.7,
        reactance: 0.6
    },
    {
        resistance: 1.2,
        reactance: 0.2
    },
    {
        resistance: 1,
        reactance: 0
    }
];

smithchart.series[0].points =
    updatedData;

smithchart.dataBind();
```

Use `dataBind()` after a property update.

Use `refresh()` when a complete rerender is specifically required:

```typescript
smithchart.refresh();
```

### Remote Data

Remote data must be validated and transformed before it is assigned to the SmithChart.

```typescript
interface ApiMeasurement {
    resistanceOhms: number;
    reactanceOhms: number;
}

interface SmithChartPoint {
    resistance: number;
    reactance: number;
}

const loadSmithChartData =
    async (): Promise<void> => {
        try {
            const response: Response =
                await fetch(
                    '/api/measurements'
                );

            if (!response.ok) {
                throw new Error(
                    `Request failed with ` +
                    `status ${response.status}.`
                );
            }

            const measurements:
                ApiMeasurement[] =
                    await response.json();

            const referenceImpedance:
                number = 50;

            const points:
                SmithChartPoint[] =
                    measurements
                        .filter(
                            (
                                measurement:
                                    ApiMeasurement
                            ): boolean => {
                                return (
                                    Number.isFinite(
                                        measurement
                                            .resistanceOhms
                                    ) &&
                                    Number.isFinite(
                                        measurement
                                            .reactanceOhms
                                    )
                                );
                            }
                        )
                        .map(
                            (
                                measurement:
                                    ApiMeasurement
                            ): SmithChartPoint => {
                                return {
                                    resistance:
                                        measurement
                                            .resistanceOhms /
                                        referenceImpedance,
                                    reactance:
                                        measurement
                                            .reactanceOhms /
                                        referenceImpedance
                                };
                            }
                        );

            smithchart.series[0].points =
                points;

            smithchart.dataBind();
        } catch (error: unknown) {
            console.error(
                'Unable to load SmithChart data.',
                error
            );
        }
    };
```

Do not create a second SmithChart instance every time new data is loaded.

### Real-Time Data

Maintain a bounded collection:

```typescript
const liveData: SmithChartPoint[] = [];

const maximumPoints: number = 500;

const appendMeasurement = (
    point: SmithChartPoint
): void => {
    if (
        !Number.isFinite(
            point.resistance
        ) ||
        !Number.isFinite(
            point.reactance
        )
    ) {
        return;
    }

    liveData.push(point);

    if (
        liveData.length >
        maximumPoints
    ) {
        liveData.splice(
            0,
            liveData.length -
            maximumPoints
        );
    }

    smithchart.series[0].points =
        liveData;

    smithchart.dataBind();
};
```

When records arrive frequently, batch them instead of rendering after every point.

## Complete TypeScript Example

This example includes:

- Impedance rendering
- Inline points
- Datasource field mapping
- Multiple series
- Markers
- Data labels
- Tooltips
- Legend
- Dynamic data replacement
- Correct imports
- Correct module injection
- Complete HTML container
- Responsive rendering

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

    <title>SmithChart Series and Data</title>

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

        .toolbar {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 16px;
        }

        .toolbar button {
            padding: 8px 14px;
            border: 1px solid #CBD5E1;
            border-radius: 6px;
            background: #FFFFFF;
            color: #0F172A;
            cursor: pointer;
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
            Impedance Comparison
        </h1>

        <p id="smithchart-description">
            Comparison of measured and simulated
            normalized impedance.
        </p>

        <div class="toolbar">
            <button
                id="update-data"
                type="button"
            >
                Load Updated Measurements
            </button>

            <button
                id="reset-data"
                type="button"
            >
                Reset Measurements
            </button>
        </div>

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

interface SimulatedMeasurement {
    normalizedResistance: number;
    normalizedReactance: number;
}

Smithchart.Inject(
    SmithchartLegend,
    TooltipRender
);

const measuredData:
    SmithChartPoint[] = [
        {
            resistance: 2.5,
            reactance: 1.3
        },
        {
            resistance: 2,
            reactance: 1
        },
        {
            resistance: 1.5,
            reactance: 0.5
        },
        {
            resistance: 1.2,
            reactance: 0.2
        },
        {
            resistance: 1,
            reactance: 0
        },
        {
            resistance: 0.8,
            reactance: -0.2
        }
    ];

const updatedMeasuredData:
    SmithChartPoint[] = [
        {
            resistance: 2.3,
            reactance: 1.1
        },
        {
            resistance: 1.9,
            reactance: 0.8
        },
        {
            resistance: 1.5,
            reactance: 0.4
        },
        {
            resistance: 1.15,
            reactance: 0.1
        },
        {
            resistance: 1,
            reactance: 0
        },
        {
            resistance: 0.85,
            reactance: -0.15
        }
    ];

const simulatedData:
    SimulatedMeasurement[] = [
        {
            normalizedResistance: 2.4,
            normalizedReactance: 1.2
        },
        {
            normalizedResistance: 1.95,
            normalizedReactance: 0.9
        },
        {
            normalizedResistance: 1.45,
            normalizedReactance: 0.45
        },
        {
            normalizedResistance: 1.1,
            normalizedReactance: 0.08
        },
        {
            normalizedResistance: 1,
            normalizedReactance: 0
        },
        {
            normalizedResistance: 0.82,
            normalizedReactance: -0.18
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
        title: {
            text:
                'Measured and Simulated Impedance',
            visible: true,
            subtitle: {
                text:
                    'Normalized to a common reference impedance',
                visible: true
            }
        },
        legendSettings: {
            visible: true,
            position: 'Bottom',
            toggleVisibility: true
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
                    border: {
                        color: '#1E3A8A',
                        width: 2
                    },
                    dataLabel: {
                        visible: false
                    }
                },
                tooltip: {
                    visible: true
                }
            },
            {
                name: 'Simulated',
                dataSource: simulatedData,
                resistance:
                    'normalizedResistance',
                reactance:
                    'normalizedReactance',
                fill: '#DC2626',
                width: 2,
                marker: {
                    visible: true,
                    shape: 'Diamond',
                    width: 10,
                    height: 10,
                    fill: '#EF4444',
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

const updateButton:
    HTMLButtonElement | null =
        document.querySelector(
            '#update-data'
        );

if (updateButton) {
    updateButton.addEventListener(
        'click',
        (): void => {
            smithchart.series[0].points =
                updatedMeasuredData;

            smithchart.dataBind();
        }
    );
}

const resetButton:
    HTMLButtonElement | null =
        document.querySelector(
            '#reset-data'
        );

if (resetButton) {
    resetButton.addEventListener(
        'click',
        (): void => {
            smithchart.series[0].points =
                measuredData;

            smithchart.dataBind();
        }
    );
}

let resizeTimer: number | undefined;

window.addEventListener(
    'resize',
    (): void => {
        if (
            resizeTimer !== undefined
        ) {
            window.clearTimeout(
                resizeTimer
            );
        }

        resizeTimer =
            window.setTimeout(
                (): void => {
                    smithchart.height =
                        isSmallScreen()
                            ? '450px'
                            : '600px';

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

    <title>SmithChart Series and Data</title>

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

        .toolbar {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 16px;
        }

        .toolbar button {
            padding: 8px 14px;
            border: 1px solid #CBD5E1;
            border-radius: 6px;
            background: #FFFFFF;
            color: #0F172A;
            cursor: pointer;
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
            Impedance Comparison
        </h1>

        <p id="smithchart-description">
            Comparison of measured and simulated
            normalized impedance.
        </p>

        <div class="toolbar">
            <button
                id="update-data"
                type="button"
            >
                Load Updated Measurements
            </button>

            <button
                id="reset-data"
                type="button"
            >
                Reset Measurements
            </button>
        </div>

        <div
            id="smithchart-container"
            aria-describedby="smithchart-description"
        ></div>
    </main>

    <script>
        var measuredData = [
            {
                resistance: 2.5,
                reactance: 1.3
            },
            {
                resistance: 2,
                reactance: 1
            },
            {
                resistance: 1.5,
                reactance: 0.5
            },
            {
                resistance: 1.2,
                reactance: 0.2
            },
            {
                resistance: 1,
                reactance: 0
            },
            {
                resistance: 0.8,
                reactance: -0.2
            }
        ];

        var updatedMeasuredData = [
            {
                resistance: 2.3,
                reactance: 1.1
            },
            {
                resistance: 1.9,
                reactance: 0.8
            },
            {
                resistance: 1.5,
                reactance: 0.4
            },
            {
                resistance: 1.15,
                reactance: 0.1
            },
            {
                resistance: 1,
                reactance: 0
            },
            {
                resistance: 0.85,
                reactance: -0.15
            }
        ];

        var simulatedData = [
            {
                normalizedResistance: 2.4,
                normalizedReactance: 1.2
            },
            {
                normalizedResistance: 1.95,
                normalizedReactance: 0.9
            },
            {
                normalizedResistance: 1.45,
                normalizedReactance: 0.45
            },
            {
                normalizedResistance: 1.1,
                normalizedReactance: 0.08
            },
            {
                normalizedResistance: 1,
                normalizedReactance: 0
            },
            {
                normalizedResistance: 0.82,
                normalizedReactance: -0.18
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
                title: {
                    text:
                        'Measured and Simulated Impedance',
                    visible: true,
                    subtitle: {
                        text:
                            'Normalized to a common reference impedance',
                        visible: true
                    }
                },
                legendSettings: {
                    visible: true,
                    position: 'Bottom',
                    toggleVisibility: true
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
                            border: {
                                color: '#1E3A8A',
                                width: 2
                            },
                            dataLabel: {
                                visible: false
                            }
                        },
                        tooltip: {
                            visible: true
                        }
                    },
                    {
                        name: 'Simulated',
                        dataSource: simulatedData,
                        resistance:
                            'normalizedResistance',
                        reactance:
                            'normalizedReactance',
                        fill: '#DC2626',
                        width: 2,
                        marker: {
                            visible: true,
                            shape: 'Diamond',
                            width: 10,
                            height: 10,
                            fill: '#EF4444',
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

        document
            .getElementById(
                'update-data'
            )
            .addEventListener(
                'click',
                function () {
                    smithchart
                        .series[0]
                        .points =
                            updatedMeasuredData;

                    smithchart.dataBind();
                }
            );

        document
            .getElementById(
                'reset-data'
            )
            .addEventListener(
                'click',
                function () {
                    smithchart
                        .series[0]
                        .points =
                            measuredData;

                    smithchart.dataBind();
                }
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
                            smithchart.height =
                                isSmallScreen()
                                    ? '450px'
                                    : '600px';

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

### Data Organization

- Keep points in logical sequence.
- Sort frequency-sweep data by frequency.
- Use meaningful series names.
- Validate every numeric field.
- Remove invalid records before binding.
- Use consistent normalization across every series.
- Clearly document the reference impedance.
- Do not mix absolute ohms and normalized values in the same chart.
- Preserve source metadata separately when required for reports.

### Multiple Series

- Use multiple series only when comparison adds value.
- Assign distinct colors and marker shapes.
- Enable a legend for identification.
- Keep all series in the same rendering mode.
- Use separate SmithCharts for impedance and admittance views.
- Avoid relying only on color to distinguish measurements.

### Dynamic Updates

- Replace the existing `points` or `dataSource`.
- Call `dataBind()` after property assignment.
- Batch frequent updates.
- Bound live-data history.
- Avoid creating a new SmithChart for every response.
- Destroy the component when its containing page is removed.

### Performance

Do not enforce arbitrary universal limits such as:

```text
100 to 500 points per series
```

or:

```text
No more than 10 series
```

Performance depends on:

- Number of points
- Number of series
- Marker visibility
- Data-label visibility
- Tooltip configuration
- Component dimensions
- Browser
- Device
- Update frequency
- Surrounding controls

For dense datasets:

- Disable data labels.
- Reduce marker dimensions.
- Disable markers when individual points do not need emphasis.
- Sample or aggregate measurements.
- Batch live updates.
- Avoid unnecessary `refresh()` calls.
- Test using production-scale data.

## Combined Mistakes and Future References

### Series-Level Impedance Type

Incorrect:

```typescript
series: [
    {
        type: 'Impedance'
    }
]
```

Correct:

```typescript
const smithchart: Smithchart =
    new Smithchart({
        renderType: 'Impedance',
        series: [
            {
                points: data
            }
        ]
    });
```

### Series-Level Admittance Type

Incorrect:

```typescript
series: [
    {
        type: 'Admittance'
    }
]
```

Correct:

```typescript
const smithchart: Smithchart =
    new Smithchart({
        renderType: 'Admittance',
        series: [
            {
                points: data
            }
        ]
    });
```

### Mixing Impedance and Admittance Series

Incorrect:

```typescript
series: [
    {
        type: 'Impedance',
        points: impedanceData
    },
    {
        type: 'Admittance',
        points: admittanceData
    }
]
```

Use separate SmithChart instances:

```typescript
new Smithchart({
    renderType: 'Impedance',
    series: impedanceSeries
});
```

```typescript
new Smithchart({
    renderType: 'Admittance',
    series: admittanceSeries
});
```

### Incorrect Matched-Load Point

Incorrect for normalized impedance:

```typescript
{
    resistance: 0,
    reactance: 0
}
```

Matched normalized impedance:

```typescript
{
    resistance: 1,
    reactance: 0
}
```

### Raw S-Parameter Mapping

Incorrect assumption:

```typescript
points: sParameters.map(
    (item) => {
        return {
            resistance: item.s11Real,
            reactance: item.s11Imaginary
        };
    }
)
```

Convert reflection-coefficient values into normalized impedance when impedance coordinates are required.

### Automatically Displaying label

Do not assume:

```typescript
{
    resistance: 1,
    reactance: 0,
    label: '2.4 GHz'
}
```

automatically changes the displayed data label.

Use a validated data-label template or tooltip template for custom metadata.

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

### Arbitrary Negative Resistance

Avoid documenting negative normalized resistance as a normal passive impedance value.

Validate negative resistance against the electrical model and application requirements before plotting it.

Negative reactance is valid for capacitive behavior:

```typescript
{
    resistance: 1,
    reactance: -0.5
}
```

### Mixing Absolute and Normalized Values

Avoid:

```typescript
const data = [
    {
        resistance: 50,
        reactance: 25
    },
    {
        resistance: 1,
        reactance: 0.5
    }
];
```

Normalize every absolute impedance to the same reference impedance before binding.

### Incorrect Dynamic Update

Incomplete:

```typescript
smithchart.series[0].points =
    updatedData;
```

Correct:

```typescript
smithchart.series[0].points =
    updatedData;

smithchart.dataBind();
```

### Unnecessary Full Refresh

Avoid using:

```typescript
smithchart.refresh();
```

for every ordinary property change.

Use:

```typescript
smithchart.dataBind();
```

Reserve `refresh()` for a complete rerender, responsive dimension change, or hidden-container recovery.

### Unsupported Universal Limits

Do not state that SmithChart always supports only:

```text
500 points
```

or:

```text
10 series
```

The component supports multiple series and points, and practical limits depend on the actual runtime scenario.

### Missing Legend Module

Incorrect TypeScript configuration:

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

without:

```typescript
Smithchart.Inject(
    TooltipRender
);
```

### Wrong Marker Property

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

### Wrong Data-Label Property

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

### Import and Injection Validation Checklist

Before generating a SmithChart series and data example, verify:

1. `Smithchart` is imported from `@syncfusion/ej2-charts`.
2. The TypeScript class uses the exact `Smithchart` casing.
3. JavaScript uses `ej.charts.Smithchart`.
4. `renderType` is configured at SmithChart level.
5. `type` is not added to individual series.
6. Impedance and admittance modes are not mixed in one SmithChart.
7. Inline data uses `points`.
8. Mapped data uses `dataSource`.
9. Mapped data specifies `resistance`.
10. Mapped data specifies `reactance`.
11. Every plotted value is finite.
12. Absolute impedance is normalized consistently.
13. The normalization reference is documented.
14. Raw S-parameter values are not assumed to be normalized impedance.
15. Reflection coefficients are converted when required.
16. The matched normalized impedance point is `1 + j0`.
17. Point order matches the intended sweep order.
18. Every visible legend series has a meaningful name.
19. `SmithchartLegend` is imported when the legend is visible.
20. `SmithchartLegend` is injected when the legend is visible.
21. `TooltipRender` is imported when a tooltip is visible.
22. `TooltipRender` is injected when a tooltip is visible.
23. Tooltip configuration remains at series level.
24. Marker configuration uses `marker`.
25. Data labels use `marker.dataLabel`.
26. Custom labels use a validated template.
27. Dynamic property changes call `dataBind()`.
28. `refresh()` is reserved for complete rerender scenarios.
29. Real-time data collections are bounded.
30. Frequent updates are batched.
31. Arbitrary point and series limits are not presented as API limits.
32. The target HTML element exists before `appendTo()`.
33. The selector matches the target element ID.
34. The component has an available width and suitable height.
35. The EJ2 theme stylesheet is loaded.
36. TypeScript and JavaScript examples are complete and runnable.
37. Vue, React, Angular, Composition API, provider, directive, and Single File Component syntax are not used.