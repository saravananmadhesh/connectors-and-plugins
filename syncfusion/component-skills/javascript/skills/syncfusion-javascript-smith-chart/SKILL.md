---
name: syncfusion-javascript-smith-chart
description: "Guide to implementing Syncfusion SmithChart in TypeScript and JavaScript for visualizing transmission line parameters and impedance/admittance data. Use this skill ALWAYS when user needs to create smith charts, visualize network parameters, display impedance plots, configure axes and gridlines, add markers and data labels, customize legends and tooltips, or handle high-frequency circuit data visualization. Works with TypeScript (module-based) and JavaScript (CDN/ES5)."
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Data Visualization"
---

# Implementing Syncfusion SmithChart in TypeScript and JavaScript

The Syncfusion EJ2 SmithChart is a specialized visualization component for plotting normalized complex impedance or admittance data in high-frequency circuit, transmission-line, antenna, matching-network, and network-analysis applications.

This skill covers only:

- EJ2 TypeScript using `@syncfusion/ej2-charts`
- EJ2 JavaScript using `ej.charts.Smithchart`
- npm and bundler-based TypeScript applications
- Global CDN-based JavaScript applications

Do not generate Vue, React, Angular, Composition API, directive, provider, or Single File Component examples when this skill is used.

## Platform Support

### TypeScript

Use TypeScript when the project requires:

- Static type checking
- IDE IntelliSense
- ES module imports
- npm package management
- Webpack or another bundler
- Typed event arguments
- Explicit optional-feature module injection

Import SmithChart from:

```typescript
import {
    Smithchart
} from '@syncfusion/ej2-charts';
```

Create and render the component:

```typescript
const smithchart: Smithchart =
    new Smithchart(configuration);

smithchart.appendTo(
    '#smithchart-container'
);
```

The basic SmithChart does not require module injection.

Optional features require injection:

```typescript
import {
    Smithchart,
    SmithchartLegend,
    TooltipRender
} from '@syncfusion/ej2-charts';

Smithchart.Inject(
    SmithchartLegend,
    TooltipRender
);
```

### JavaScript

Use JavaScript when the project requires:

- Direct browser execution
- CDN-based dependency loading
- No compilation
- No module bundler
- Global EJ2 namespace access

Create SmithChart through:

```javascript
var smithchart =
    new ej.charts.Smithchart(
        configuration
    );

smithchart.appendTo(
    '#smithchart-container'
);
```

When the complete EJ2 global bundle is loaded, TypeScript-style imports and explicit feature injection are not required.

## When to Use This Skill

Use this skill when the user needs to:

- Create an EJ2 SmithChart.
- Plot normalized complex impedance.
- Plot normalized complex admittance.
- Visualize transmission-line parameters.
- Display RF network measurements.
- Display antenna or matching-network measurements.
- Compare measured and simulated data.
- Configure horizontal and radial axes.
- Customize major and minor gridlines.
- Configure axis labels and intersection behavior.
- Plot multiple series.
- Bind inline points.
- Map custom datasource fields.
- Add markers and data labels.
- Enable point tooltips.
- Display and customize a legend.
- Toggle series through legend items.
- Apply built-in themes.
- Configure responsive rendering.
- Enable right-to-left rendering.
- Print or export SmithChart.
- Update SmithChart data dynamically.
- Convert absolute impedance to normalized impedance.
- Convert normalized impedance to admittance.
- Convert reflection-coefficient values to normalized impedance.
- Diagnose rendering, data-binding, tooltip, legend, or sizing issues.

## Validation Workflow

Before generating SmithChart code, complete each validation step.

### Step 1: Identify the Implementation

Determine whether the requested solution is:

- TypeScript
- JavaScript
- Both TypeScript and JavaScript

Do not substitute a framework wrapper.

### Step 2: Identify the Rendering Mode

SmithChart supports two root-level rendering modes:

```text
Impedance
Admittance
```

Impedance:

```typescript
renderType: 'Impedance'
```

Admittance:

```typescript
renderType: 'Admittance'
```

Do not place the rendering mode inside an individual series.

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

### Step 3: Validate the Electrical Data

Determine whether the input contains:

- Normalized impedance
- Absolute impedance in ohms
- Normalized admittance
- Reflection coefficient
- S-parameter real and imaginary values
- Already transformed SmithChart coordinates

Do not map raw S11 real and imaginary values directly as normalized impedance unless the data has already been converted.

### Step 4: Validate Point Fields

Inline SmithChart points require:

```typescript
{
    resistance: number,
    reactance: number
}
```

Both values must be finite numbers.

```typescript
const isValidPoint = (
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

### Step 5: Identify Optional Features

Validate every optional feature before generating imports.

| Feature | Required TypeScript Module |
|---|---|
| Basic SmithChart | No optional module |
| Marker | No optional module |
| Data label | No optional module |
| Tooltip | `TooltipRender` |
| Legend | `SmithchartLegend` |
| Axis customization | No optional module |
| Print | No optional module |
| Export | No optional module |

### Step 6: Validate Imports Before Code Generation

For tooltip and legend:

```typescript
import {
    Smithchart,
    SmithchartLegend,
    TooltipRender
} from '@syncfusion/ej2-charts';
```

### Step 7: Validate Injection Before Code Generation

```typescript
Smithchart.Inject(
    SmithchartLegend,
    TooltipRender
);
```

Do not generate the component configuration first and verify modules afterward.

### Step 8: Validate Configuration Hierarchy

Use:

```typescript
marker
```

not:

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

not:

```typescript
dataLabelSettings: {
    visible: true
}
```

Use the tooltip at series level:

```typescript
series: [
    {
        tooltip: {
            visible: true
        }
    }
]
```

Do not use a Chart-style root tooltip:

```typescript
tooltip: {
    enable: true
}
```

### Step 9: Validate the Container

Confirm that:

- The host element exists.
- The selector matches `appendTo(...)`.
- The parent has an available width.
- SmithChart has a suitable height.
- The EJ2 theme stylesheet is loaded.
- A hidden parent is refreshed after becoming visible.

## Documentation and Navigation Guide

### Getting Started and Setup

Read:

```text
references/getting-started.md
```

Use it for:

- Installation
- npm package setup
- TypeScript setup
- JavaScript setup
- CDN setup
- Container configuration
- Initial component creation
- Theme loading
- License registration
- Basic troubleshooting

### Series and Data

Read:

```text
references/series-and-data.md
```

Use it for:

- Impedance rendering
- Admittance rendering
- Inline points
- Datasource mapping
- Multiple series
- Series styling
- Dynamic updates
- Normalization
- Reflection-coefficient conversion
- Remote data
- Real-time data

### Axis Configuration

Read:

```text
references/axis-configuration.md
```

Use it for:

- Horizontal axis
- Radial axis
- Axis-label positioning
- Label-overlap handling
- Major gridlines
- Minor gridlines
- Axis lines
- Axis-label rendering
- Responsive axis styling

### Markers and Labels

Read:

```text
references/markers-and-labels.md
```

Use it for:

- Marker visibility
- Marker dimensions
- Marker shape
- Marker fill and border
- Marker opacity
- Data-label visibility
- Data-label text style
- Data-label fill and border
- Connector lines
- Data-label templates

### Customization and Legends

Read:

```text
references/customization-and-legends.md
```

Use it for:

- Legend module injection
- Legend visibility
- Legend positioning
- Legend styling
- Series visibility toggling
- Tooltip module injection
- Tooltip styling
- Theme configuration
- Print
- Export
- RTL
- Responsive behavior

## Installation

Install the EJ2 Charts package:

```bash
npm install @syncfusion/ej2-charts
```

Do not require separate installation of every transitive dependency unless the package manager reports a specific unresolved dependency.

## Theme Setup

Don't Load an EJ2 theme stylesheet:

Keep the configured theme aligned:

```typescript
theme: 'Material'
```

## Container Setup

Create the host element before initializing SmithChart.

```html
<div class="smithchart-wrapper">
    <div id="smithchart-container"></div>
</div>
```

```css
.smithchart-wrapper {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
}

#smithchart-container {
    width: 100%;
    min-height: 550px;
}
```

The component can also define dimensions:

```typescript
width: '100%',
height: '550px'
```

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

    <title>EJ2 SmithChart</title>

    <style>
        #smithchart-container {
            width: 100%;
            min-height: 500px;
        }
    </style>
</head>
<body>
    <div id="smithchart-container"></div>

   <script scr="index.js"></script>
</body>
</html>
```

#### index.ts

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

    <title>EJ2 JavaScript SmithChart</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

    <style>
        #smithchart-container {
            width: 100%;
            min-height: 500px;
        }
    </style>
</head>
<body>
    <div id="smithchart-container"></div>

    <script>
        var data = [
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
    </script>
</body>
</html>
```

## SmithChart Rendering Modes

### Impedance

Use:

```typescript
renderType: 'Impedance'
```

A normalized impedance point represents:

```text
z = r + jx
```

where:

- `r` is normalized resistance.
- `x` is normalized reactance.
- Positive reactance is inductive.
- Negative reactance is capacitive.

The normalized matched-load point is:

```typescript
{
    resistance: 1,
    reactance: 0
}
```

It is not:

```typescript
{
    resistance: 0,
    reactance: 0
}
```

### Admittance

Use:

```typescript
renderType: 'Admittance'
```

A normalized admittance point represents:

```text
y = g + jb
```

The SmithChart point fields remain:

```typescript
{
    resistance: number,
    reactance: number
}
```

In admittance mode, these mapped fields represent the real and imaginary admittance coordinates used for rendering.

### Separate Impedance and Admittance Views

A single SmithChart has one rendering mode.

Do not mix rendering modes per series.

Use separate components:

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

## Data Normalization

### Absolute Impedance to Normalized Impedance

For reference impedance `Z0`:

```text
r = R / Z0
x = X / Z0
```

TypeScript:

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
    value: AbsoluteImpedance,
    referenceImpedance: number
): SmithChartPoint => {
    if (
        !Number.isFinite(
            referenceImpedance
        ) ||
        referenceImpedance <= 0
    ) {
        throw new Error(
            'Reference impedance must be positive.'
        );
    }

    return {
        resistance:
            value.resistanceOhms /
            referenceImpedance,
        reactance:
            value.reactanceOhms /
            referenceImpedance
    };
};
```

For a 50-ohm system:

```typescript
const normalizedPoint: SmithChartPoint =
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

### Impedance to Admittance

For:

```text
z = r + jx
```

the normalized admittance is:

```text
g = r / (r² + x²)
b = -x / (r² + x²)
```

```typescript
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

### Reflection Coefficient to Impedance

Raw S11 real and imaginary values are reflection-coefficient values.

For:

```text
Γ = a + jb
```

normalized impedance is:

```text
z = (1 + Γ) / (1 - Γ)
```

```typescript
interface ReflectionCoefficient {
    real: number;
    imaginary: number;
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

## Data Binding Patterns

### Inline Points

```typescript
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
```

### Datasource Mapping

Use mapping when the source fields have custom names:

```typescript
interface Measurement {
    frequencyGHz: number;
    normalizedResistance: number;
    normalizedReactance: number;
}

const measurements: Measurement[] = [
    {
        frequencyGHz: 1,
        normalizedResistance: 2,
        normalizedReactance: 1
    },
    {
        frequencyGHz: 1.5,
        normalizedResistance: 1.5,
        normalizedReactance: 0.5
    },
    {
        frequencyGHz: 2,
        normalizedResistance: 1,
        normalizedReactance: 0
    }
];
```

```typescript
series: [
    {
        dataSource: measurements,
        resistance:
            'normalizedResistance',
        reactance:
            'normalizedReactance'
    }
]
```

Choose either inline `points` or mapped `dataSource` for each series.

## Multiple Series

A SmithChart can render multiple series within the same rendering mode.

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
                    shape: 'Circle'
                }
            },
            {
                name: 'Simulated',
                points: simulatedData,
                fill: '#DC2626',
                width: 2,
                marker: {
                    visible: true,
                    shape: 'Diamond'
                }
            }
        ]
    });
```

## Axis Configuration

SmithChart has:

- `horizontalAxis`
- `radialAxis`

Axis customization does not require an optional injected module.

### Horizontal Axis

```typescript
horizontalAxis: {
    visible: true,
    labelPosition: 'Inside',
    labelIntersectAction: 'Hide',
    labelStyle: {
        color: '#1D4ED8',
        size: '12px',
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
        visible: true,
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
}
```

### Radial Axis

```typescript
radialAxis: {
    visible: true,
    labelPosition: 'Inside',
    labelIntersectAction: 'Hide',
    labelStyle: {
        color: '#9F1239',
        size: '12px',
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
        visible: true,
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
}
```

Valid label positions:

```text
Inside
Outside
```

Valid label intersection values include:

```text
Hide
None
```

Do not add unvalidated `dashArray` properties to SmithChart axis lines or gridlines.

## Markers and Data Labels

### Marker

Use:

```typescript
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
    }
}
```

Do not use:

```typescript
markerSettings
```

### Data Label

Data labels are nested inside `marker`.

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
}
```

Do not use:

```typescript
dataLabelSettings
```

Do not assume `position`, `alignment`, or Chart-style `format` properties are supported by SmithChart data labels.

## Tooltip

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

Configure the tooltip inside each series:

```typescript
series: [
    {
        points: data,
        marker: {
            visible: true
        },
        tooltip: {
            visible: true,
            fill: '#111827',
            opacity: 0.95,
            border: {
                color: '#374151',
                width: 1
            },
            textStyle: {
                color: '#FFFFFF',
                size: '12px',
                fontFamily: 'Segoe UI',
                fontWeight: '500'
            }
        }
    }
]
```

Do not use:

```typescript
SmithchartTooltip
```

Do not use:

```typescript
tooltip: {
    enable: true
}
```

at SmithChart root level.

## Legend

Legends require `SmithchartLegend` in TypeScript.

```typescript
import {
    Smithchart,
    SmithchartLegend
} from '@syncfusion/ej2-charts';

Smithchart.Inject(
    SmithchartLegend
);
```

Configure:

```typescript
legendSettings: {
    visible: true,
    position: 'Bottom',
    alignment: 'Center',
    background: '#F8FAFC',
    itemPadding: 18,
    shapeWidth: 14,
    shapeHeight: 14,
    toggleVisibility: true,
    border: {
        color: '#CBD5E1',
        width: 1
    },
    textStyle: {
        color: '#1F2937',
        size: '12px',
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: '600'
    }
}
```

Common positions:

```text
Top
Bottom
Left
Right
Custom
```

Every legend-enabled series should have a meaningful `name`.

## Title and Subtitle

Configure the title as an object:

```typescript
title: {
    text: 'Transmission-Line Analysis',
    visible: true,
    textStyle: {
        color: '#0F172A',
        size: '20px',
        fontFamily: 'Segoe UI',
        fontWeight: '600'
    },
    subtitle: {
        text:
            'Measured and simulated impedance',
        visible: true,
        textStyle: {
            color: '#475569',
            size: '13px',
            fontFamily: 'Segoe UI',
            fontWeight: '400'
        }
    }
}
```

Do not use a plain title string:

```typescript
title:
    'Transmission-Line Analysis'
```

## Dynamic Data Updates

Replace the existing collection:

```typescript
smithchart.series[0].points =
    updatedData;
```

Apply the update:

```typescript
smithchart.dataBind();
```

Use `refresh()` only when a complete rerender is required, such as:

- Responsive dimension changes
- Hidden-container recovery
- Major structural changes

## Responsive Rendering

```typescript
const isSmallScreen = (): boolean => {
    return window.matchMedia(
        '(max-width: 767px)'
    ).matches;
};
```

```typescript
const smithchart: Smithchart =
    new Smithchart({
        width: '100%',
        height: isSmallScreen()
            ? '450px'
            : '600px',
        series: [
            {
                points: data
            }
        ]
    });
```

Debounce manual resize refreshes:

```typescript
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

## RTL Support

Enable component-level right-to-left rendering:

```typescript
enableRtl: true
```

For an entirely RTL document:

```html
<html lang="ar" dir="rtl">
```

Use the supported `enableRtl` property instead of relying only on CSS direction rules.

## Print

Use the public method:

```typescript
smithchart.print();
```

Do not import or inject a `Print` module solely for this method.

Example:

```typescript
const printButton:
    HTMLButtonElement | null =
        document.querySelector(
            '#print-button'
        );

if (printButton) {
    printButton.addEventListener(
        'click',
        (): void => {
            smithchart.print();
        }
    );
}
```

## Export

Supported formats include:

```text
PNG
JPEG
SVG
PDF
```

PNG:

```typescript
smithchart.export(
    'PNG',
    'smithchart-analysis'
);
```

SVG:

```typescript
smithchart.export(
    'SVG',
    'smithchart-analysis'
);
```

PDF:

```typescript
smithchart.export(
    'PDF',
    'smithchart-analysis'
);
```

Do not import or inject `ImageExport` solely for the SmithChart public export method.

Do not pass width and height as export arguments:

```typescript
smithchart.export(
    'PNG',
    'smithchart',
    1200,
    800
);
```

## Complete Runtime-Safe TypeScript Example

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

    <title>Complete EJ2 SmithChart</title>

    <style>
        body {
            margin: 0;
            padding: 24px;
            background: #F8FAFC;
            color: #0F172A;
            font-family: "Segoe UI", sans-serif;
        }

        .smithchart-report {
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

        .toolbar button:focus-visible {
            outline: 3px solid #93C5FD;
            outline-offset: 2px;
        }

        #smithchart-container {
            width: 100%;
            min-height: 600px;
        }

        @media (max-width: 767px) {
            body {
                padding: 12px;
            }

            .smithchart-report {
                padding: 12px;
            }

            #smithchart-container {
                min-height: 450px;
            }
        }

        @media print {
            body {
                padding: 0;
                background: #FFFFFF;
            }

            .toolbar {
                display: none;
            }

            .smithchart-report {
                max-width: none;
                padding: 0;
                border: 0;
            }

            #smithchart-container {
                width: 100% !important;
                break-inside: avoid;
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <main
        class="smithchart-report"
        aria-labelledby="smithchart-heading"
    >
        <h1 id="smithchart-heading">
            Transmission-Line Analysis
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
                Update Data
            </button>

            <button
                id="reset-data"
                type="button"
            >
                Reset Data
            </button>

            <button
                id="toggle-rtl"
                type="button"
            >
                Enable RTL
            </button>

            <button
                id="export-png"
                type="button"
            >
                Export PNG
            </button>

            <button
                id="export-svg"
                type="button"
            >
                Export SVG
            </button>

            <button
                id="print-button"
                type="button"
            >
                Print
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
    SmithChartPoint[] = [
        {
            resistance: 2.4,
            reactance: 1.2
        },
        {
            resistance: 1.95,
            reactance: 0.9
        },
        {
            resistance: 1.45,
            reactance: 0.45
        },
        {
            resistance: 1.1,
            reactance: 0.08
        },
        {
            resistance: 1,
            reactance: 0
        },
        {
            resistance: 0.82,
            reactance: -0.18
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
            text:
                'Measured and Simulated Impedance',
            visible: true,
            textStyle: {
                color: '#0F172A',
                size: '20px',
                fontFamily: 'Segoe UI',
                fontWeight: '600'
            },
            subtitle: {
                text:
                    'Normalized to a common reference impedance',
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
            alignment: 'Center',
            toggleVisibility: true,
            itemPadding: 18,
            shapeWidth: 14,
            shapeHeight: 14,
            textStyle: {
                color: '#1F2937',
                size: '12px',
                fontFamily: 'Segoe UI',
                fontWeight: '600'
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
                    border: {
                        color: '#1E3A8A',
                        width: 2
                    },
                    dataLabel: {
                        visible: false
                    }
                },
                tooltip: {
                    visible: true,
                    fill: '#111827',
                    opacity: 0.95,
                    border: {
                        color: '#374151',
                        width: 1
                    },
                    textStyle: {
                        color: '#FFFFFF',
                        size: '12px',
                        fontFamily: 'Segoe UI',
                        fontWeight: '500'
                    }
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
                    border: {
                        color: '#7F1D1D',
                        width: 2
                    },
                    dataLabel: {
                        visible: false
                    }
                },
                tooltip: {
                    visible: true,
                    fill: '#111827',
                    opacity: 0.95,
                    border: {
                        color: '#374151',
                        width: 1
                    },
                    textStyle: {
                        color: '#FFFFFF',
                        size: '12px',
                        fontFamily: 'Segoe UI',
                        fontWeight: '500'
                    }
                }
            }
        ]
    });

smithchart.appendTo(
    '#smithchart-container'
);

const bindButton = (
    selector: string,
    handler: () => void
): void => {
    const button:
        HTMLButtonElement | null =
            document.querySelector(
                selector
            );

    if (button) {
        button.addEventListener(
            'click',
            handler
        );
    }
};

bindButton(
    '#update-data',
    (): void => {
        smithchart.series[0].points =
            updatedMeasuredData;

        smithchart.dataBind();
    }
);

bindButton(
    '#reset-data',
    (): void => {
        smithchart.series[0].points =
            measuredData;

        smithchart.dataBind();
    }
);

bindButton(
    '#toggle-rtl',
    (): void => {
        smithchart.enableRtl =
            !smithchart.enableRtl;

        const button:
            HTMLButtonElement | null =
                document.querySelector(
                    '#toggle-rtl'
                );

        if (button) {
            button.textContent =
                smithchart.enableRtl
                    ? 'Disable RTL'
                    : 'Enable RTL';
        }

        smithchart.dataBind();
    }
);

bindButton(
    '#export-png',
    (): void => {
        smithchart.export(
            'PNG',
            'smithchart-analysis'
        );
    }
);

bindButton(
    '#export-svg',
    (): void => {
        smithchart.export(
            'SVG',
            'smithchart-analysis'
        );
    }
);

bindButton(
    '#print-button',
    (): void => {
        smithchart.print();
    }
);

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
                    const mobile:
                        boolean =
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
```

## Output Requirements

When generating a final SmithChart solution:

1. Use only EJ2 TypeScript or JavaScript.
2. Do not generate framework wrappers.
3. Validate imports before generating code.
4. Validate `Smithchart.Inject(...)` before generating code.
5. Use the exact `Smithchart` casing.
6. Use `ej.charts.Smithchart` for JavaScript.
7. Include complete data definitions.
8. Include the HTML container.
9. Include a usable component height.
10. Include the EJ2 theme stylesheet.
11. Use `renderType` at SmithChart root level.
12. Do not add rendering `type` to individual series.
13. Keep all series in the same rendering mode.
14. Use separate SmithCharts for impedance and admittance comparisons.
15. Validate whether input data is normalized.
16. Convert absolute impedance when necessary.
17. Convert reflection coefficient when necessary.
18. Use `points` for inline data.
19. Use `dataSource`, `resistance`, and `reactance` for mapped data.
20. Use `marker`, not `markerSettings`.
21. Use `marker.dataLabel`, not `dataLabelSettings`.
22. Use series-level tooltip configuration.
23. Import and inject `TooltipRender` when tooltip is visible.
24. Import and inject `SmithchartLegend` when legend is visible.
25. Give legend-enabled series meaningful names.
26. Configure title as an object.
27. Configure subtitle within the title model.
28. Use supported axis properties.
29. Avoid unvalidated gridline and axis-line properties.
30. Use `dataBind()` for ordinary data or property updates.
31. Use `refresh()` only for complete rerender scenarios.
32. Debounce manual resize handling.
33. Use `smithchart.print()` for printing.
34. Use `smithchart.export()` for export.
35. Do not inject `Print` or `ImageExport` solely for public methods.
36. Do not pass unsupported export dimensions.
37. Keep live data bounded.
38. Batch frequent updates.
39. Destroy the component and clear timers during teardown.
40. Return complete, runnable, directly copyable examples.

## Combined Mistakes and Future References

### Series-Level Rendering Type

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
renderType: 'Impedance'
```

### Mixed Impedance and Admittance Series

Incorrect:

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

Use separate SmithChart instances.

### Incorrect Marker Property

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

### Incorrect Data-Label Property

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

### Incorrect Tooltip Module

Incorrect:

```typescript
SmithchartTooltip
```

Correct:

```typescript
TooltipRender
```

### Incorrect Root Tooltip

Incorrect:

```typescript
tooltip: {
    enable: true
}
```

Correct:

```typescript
series: [
    {
        tooltip: {
            visible: true
        }
    }
]
```

### Missing Tooltip Injection

Correct setup:

```typescript
import {
    Smithchart,
    TooltipRender
} from '@syncfusion/ej2-charts';

Smithchart.Inject(
    TooltipRender
);
```

### Missing Legend Injection

Correct setup:

```typescript
import {
    Smithchart,
    SmithchartLegend
} from '@syncfusion/ej2-charts';

Smithchart.Inject(
    SmithchartLegend
);
```

### Plain String Title

Incorrect:

```typescript
title:
    'Network Analysis'
```

Correct:

```typescript
title: {
    text: 'Network Analysis',
    visible: true
}
```

### Incorrect Matched Point

Incorrect for normalized impedance:

```typescript
{
    resistance: 0,
    reactance: 0
}
```

Correct matched normalized impedance:

```typescript
{
    resistance: 1,
    reactance: 0
}
```

### Raw S11 Mapping

Do not map raw reflection-coefficient values directly as normalized impedance.

Convert them first when impedance coordinates are required.

### Assuming label Is Displayed Automatically

Do not assume this automatically renders custom text:

```typescript
{
    resistance: 1,
    reactance: 0,
    label: '2.4 GHz'
}
```

Use a validated data-label or tooltip template.

### Unsupported Marker Shape Assumption

Do not copy every Chart marker shape into SmithChart without validation.

Prefer a validated shape such as:

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

### Unsupported Data-Label Position

Do not assume SmithChart data labels support:

```typescript
position: 'Top'
```

```typescript
alignment: 'Center'
```

Use the validated data-label model and connector lines.

### Unsupported Gridline Dash Pattern

Do not add `dashArray` to SmithChart axis gridlines unless the installed API has been explicitly validated for that property.

### Unsupported Axis-Line Dash Pattern

Do not add `dashArray` to SmithChart axis lines without validation.

### Unnecessary Print Injection

Do not use:

```typescript
Smithchart.Inject(
    Print
);
```

Use:

```typescript
smithchart.print();
```

### Unnecessary ImageExport Injection

Do not use:

```typescript
Smithchart.Inject(
    ImageExport
);
```

Use:

```typescript
smithchart.export(
    'PNG',
    'smithchart'
);
```

### Invalid Export Dimensions

Do not use:

```typescript
smithchart.export(
    'PNG',
    'smithchart',
    1200,
    800
);
```

### Unnecessary Full Refresh

For a normal property update:

```typescript
smithchart.series[0].points =
    updatedData;

smithchart.dataBind();
```

Use `refresh()` only when a complete rerender is required.

### Arbitrary Performance Limits

Do not present fixed values such as 500 points or 10 series as SmithChart API limits.

Performance depends on:

- Point count
- Series count
- Marker visibility
- Data-label visibility
- Tooltip configuration
- Component size
- Browser
- Device
- Update rate
- Surrounding controls

### Final Runtime-Safety Checklist

Before returning a SmithChart solution, verify:

1. The implementation is TypeScript or JavaScript.
2. `Smithchart` uses the correct casing.
3. The TypeScript package is `@syncfusion/ej2-charts`.
4. JavaScript uses `ej.charts.Smithchart`.
5. The host element exists.
6. The selector matches `appendTo(...)`.
7. The component has sufficient dimensions.
8. The EJ2 theme stylesheet is loaded.
9. `renderType` is configured at root level.
10. Every series uses the same rendering mode.
11. Every point contains finite numeric values.
12. Absolute impedance is normalized consistently.
13. Reflection-coefficient data is converted when required.
14. The matched normalized impedance is `1 + j0`.
15. Inline data uses `points`.
16. Mapped data uses `dataSource`.
17. Mapped data includes resistance-field mapping.
18. Mapped data includes reactance-field mapping.
19. Marker configuration uses `marker`.
20. Data labels use `marker.dataLabel`.
21. Tooltip configuration is series-level.
22. `TooltipRender` is imported when required.
23. `TooltipRender` is injected when required.
24. `SmithchartLegend` is imported when required.
25. `SmithchartLegend` is injected when required.
26. Legend-enabled series have meaningful names.
27. The title uses an object.
28. The subtitle is nested within the title model.
29. Axis properties belong to `horizontalAxis` or `radialAxis`.
30. Unsupported properties are excluded.
31. Dynamic updates call `dataBind()`.
32. Responsive refreshes are debounced.
33. Print and export use public methods.
34. Unsupported export dimensions are not passed.
35. Live data is bounded.
36. Timers and component instances are cleaned up.
37. The final example is complete and runnable.
38. Vue, React, Angular, Composition API, provider, directive, and Single File Component syntax are not used.