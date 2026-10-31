# Customization and Legends

## Overview

The EJ2 SmithChart supports legend positioning, legend styling, series visibility toggling, series-level tooltips, built-in themes, printing, export, responsive sizing, and right-to-left rendering.

Before generating a SmithChart customization example, validate all optional modules:

- Import and inject `SmithchartLegend` when `legendSettings.visible` is `true`.
- Import and inject `TooltipRender` when a series tooltip is visible.
- Do not use `SmithchartTooltip`. The correct module is `TooltipRender`.
- Configure tooltips inside each series.
- Do not use a root-level `tooltip` property.
- The SmithChart public `print()` and `export()` methods do not require `Print` or `ImageExport` injection.
- Configure `title` and `subtitle` as objects, not plain strings.
- Keep the configured theme consistent with the loaded EJ2 stylesheet.

## Table of Contents

- #legend-configuration
  - #required-legend-module
  - #enabling-the-legend
  - #series-visibility-toggling
- #legend-positioning
  - #standard-positions
  - #custom-position
- #legend-customization
  - #legend-border-and-background
  - #legend-text-style
  - #legend-item-dimensions
- #tooltip-customization
  - #required-tooltip-module
  - #enabling-tooltips
  - #tooltip-styling
- #theme-application
  - #built-in-themes
  - #theme-and-stylesheet-matching
  - #component-level-styling
- #print-and-export
  - #printing
  - #exporting
  - #supported-export-formats
- #rtl-support
- #complete-typescript-example
- #complete-javascript-example
- #best-practices
- #combined-mistakes-and-future-references

## Legend Configuration

A legend associates each SmithChart series with a name, symbol, and color.

Legends are especially useful when:

- Multiple impedance series are displayed.
- Measured and simulated values are compared.
- Multiple devices or transmission lines are plotted.
- Users need to hide or show individual series.
- The SmithChart is included in a technical report.

The legend is hidden by default.

### Required Legend Module

In the TypeScript modular implementation, import and inject `SmithchartLegend` before enabling the legend.

```typescript
import {
    Smithchart,
    SmithchartLegend
} from '@syncfusion/ej2-charts';

Smithchart.Inject(
    SmithchartLegend
);
```

The injection must occur before the SmithChart instance is created.

### Enabling the Legend

```typescript
const smithchart: Smithchart =
    new Smithchart({
        legendSettings: {
            visible: true,
            position: 'Bottom'
        },
        series: [
            {
                name: 'Transmission Line 1',
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
    });

smithchart.appendTo(
    '#smithchart-container'
);
```

Every legend-enabled series should have a meaningful `name`.

```typescript
series: [
    {
        name: 'Measured',
        points: measuredData
    },
    {
        name: 'Simulated',
        points: simulatedData
    }
]
```

### Series Visibility Toggling

Enable legend-item interaction through `toggleVisibility`.

```typescript
legendSettings: {
    visible: true,
    toggleVisibility: true
}
```

When enabled, selecting a legend item toggles the corresponding series visibility.

Disable this behavior when the legend must remain informational:

```typescript
legendSettings: {
    visible: true,
    toggleVisibility: false
}
```

## Legend Positioning

The SmithChart legend supports these standard positions:

```text
Top
Bottom
Left
Right
Custom
```

### Standard Positions

Bottom:

```typescript
legendSettings: {
    visible: true,
    position: 'Bottom'
}
```

Top:

```typescript
legendSettings: {
    visible: true,
    position: 'Top'
}
```

Left:

```typescript
legendSettings: {
    visible: true,
    position: 'Left'
}
```

Right:

```typescript
legendSettings: {
    visible: true,
    position: 'Right'
}
```

Use `Bottom` or `Top` when horizontal space is limited.

Use `Left` or `Right` when:

- The component is wide.
- Series names are short.
- Vertical legend layout is preferred.
- The SmithChart has sufficient horizontal space.

### Custom Position

Use `Custom` with a location:

```typescript
legendSettings: {
    visible: true,
    position: 'Custom',
    location: {
        x: 720,
        y: 80
    }
}
```

Custom coordinates are relative to the component layout. Validate them at every supported viewport size.

Avoid fixed custom coordinates in responsive layouts unless the coordinates are recalculated when the component size changes.

## Legend Customization

Legend appearance can be customized through:

- Background
- Border
- Text style
- Item padding
- Shape dimensions
- Row count
- Column count
- Width and height
- Alignment
- Visibility toggling

### Legend Border and Background

```typescript
legendSettings: {
    visible: true,
    position: 'Bottom',
    background: '#F8FAFC',
    border: {
        color: '#CBD5E1',
        width: 1
    }
}
```

Use a transparent background when the legend should blend into the SmithChart:

```typescript
legendSettings: {
    visible: true,
    background: 'transparent'
}
```

### Legend Text Style

```typescript
legendSettings: {
    visible: true,
    textStyle: {
        color: '#1F2937',
        size: '12px',
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: '600',
        opacity: 1
    }
}
```

Use a valid string for `fontWeight`.

```typescript
fontWeight: '600'
```

A readable alternative is:

```typescript
fontWeight: 'Normal'
```

### Legend Item Dimensions

Configure spacing and symbol dimensions:

```typescript
legendSettings: {
    visible: true,
    itemPadding: 18,
    shapeWidth: 14,
    shapeHeight: 14
}
```

Use `itemPadding` to separate legend items.

Use `shapeWidth` and `shapeHeight` to control the legend symbol size.

Complete configuration:

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
        fontWeight: '600'
    }
}
```

Do not add `padding`, `opacity`, `width`, or `height` without validating their exact types and support in the installed SmithChart legend model.

## Tooltip Customization

SmithChart tooltips display information when users hover over series points.

Tooltip configuration belongs to each series.

Correct:

```typescript
series: [
    {
        points: data,
        tooltip: {
            visible: true
        }
    }
]
```

Incorrect:

```typescript
tooltip: {
    enable: true
}
```

### Required Tooltip Module

Import and inject `TooltipRender`.

```typescript
import {
    Smithchart,
    TooltipRender
} from '@syncfusion/ej2-charts';

Smithchart.Inject(
    TooltipRender
);
```

The correct module is:

```typescript
TooltipRender
```

Do not use:

```typescript
SmithchartTooltip
```

### Enabling Tooltips

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
                    }
                ],
                marker: {
                    visible: true
                },
                tooltip: {
                    visible: true
                }
            }
        ]
    });
```

Markers improve point identification and provide clear hover targets:

```typescript
marker: {
    visible: true,
    width: 10,
    height: 10
}
```

### Tooltip Styling

Configure the tooltip within the series:

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
                fontStyle: 'Normal',
                fontWeight: '500'
            }
        }
    }
]
```

Do not assume that Chart-style point placeholders are supported:

```typescript
format:
    'R: {point.resistance}, X: {point.reactance}'
```

Use the default SmithChart tooltip output unless the target version's SmithChart tooltip model has been explicitly validated for custom templates or formatting.

## Theme Application

Set the SmithChart theme using the `theme` property.

```typescript
theme: 'Material'
```

### Built-in Themes

Common theme values include:

```text
Material
Fabric
Bootstrap
HighContrast
```

Newer EJ2 versions may include additional theme variants. Always validate the theme name against the installed package version.

Example:

```typescript
const smithchart: Smithchart =
    new Smithchart({
        theme: 'Material',
        series: [
            {
                points: data
            }
        ]
    });
```

### Theme and Stylesheet Matching

The don't loaded theme stylesheet and the `theme` property is enough.


```typescript
theme: 'Material'
```

### Component-Level Styling

Prefer supported component properties over undocumented internal CSS selectors.

Use:

```typescript
background: '#FFFFFF'
```

```typescript
border: {
    color: '#CBD5E1',
    width: 1
}
```

```typescript
smithchartArea: {
    background: '#FFFFFF',
    border: {
        color: '#CBD5E1',
        width: 1
    }
}
```

Configure individual series:

```typescript
series: [
    {
        fill: '#2563EB',
        width: 2
    }
]
```

Avoid depending on undocumented selectors such as:

```css
.e-smithchart-series
```

```css
.e-smithchart-axis-label
```

```css
.e-smithchart-grid-line
```

Generated SVG element classes and IDs can change between versions. Supported API properties are safer for production and documentation examples.

## Print and Export

SmithChart exposes public `print()` and `export()` methods.

Do not inject `Print` or `ImageExport` into `Smithchart`.

### Printing

```typescript
const printButton: HTMLButtonElement | null =
    document.querySelector('#print-button');

if (printButton) {
    printButton.addEventListener(
        'click',
        (): void => {
            smithchart.print();
        }
    );
}
```

HTML:

```html
<button
    id="print-button"
    type="button"
>
    Print SmithChart
</button>
```

Use print-specific CSS to hide application controls:

```css
@media print {
    .smithchart-toolbar {
        display: none;
    }

    #smithchart-container {
        width: 100% !important;
        break-inside: avoid;
        page-break-inside: avoid;
    }
}
```

### Exporting

PNG:

```typescript
smithchart.export(
    'PNG',
    'smithchart-analysis'
);
```

JPEG:

```typescript
smithchart.export(
    'JPEG',
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

Prefer a file name without manually adding the extension:

```typescript
smithchart.export(
    'PNG',
    'smithchart-analysis'
);
```

Avoid:

```typescript
smithchart.export(
    'PNG',
    'smithchart-analysis.png'
);
```

### Supported Export Formats

```text
PNG
JPEG
SVG
PDF
```

Do not inject:

```typescript
Print
```

or:

```typescript
ImageExport
```

solely to call the SmithChart public methods.

Do not pass custom width and height as the third and fourth export arguments:

```typescript
smithchart.export(
    'PNG',
    'smithchart',
    1200,
    800
);
```

If a specific export size is required:

1. Store the current SmithChart width and height.
2. Set the required component dimensions.
3. Refresh the component.
4. Export after rendering completes.
5. Restore the original dimensions.
6. Refresh again.

Validate asynchronous export timing before using this approach in production.

## RTL Support

Enable right-to-left rendering through:

```typescript
enableRtl: true
```

Complete configuration:

```typescript
const smithchart: Smithchart =
    new Smithchart({
        enableRtl: true,
        legendSettings: {
            visible: true,
            position: 'Left'
        },
        series: [
            {
                name: 'Transmission Line',
                points: data
            }
        ]
    });
```

For an entirely right-to-left page:

```html
<html lang="ar" dir="rtl">
```

Do not rely only on a custom CSS direction rule:

```css
.e-smithchart {
    direction: rtl;
}
```

Use the supported component property:

```typescript
enableRtl: true
```

Set the HTML `dir` attribute when the surrounding document is also right-to-left.

## Complete TypeScript Example

The following example includes:

- Two series
- Correct title and subtitle objects
- Legend module injection
- Tooltip module injection
- Legend visibility toggling
- Legend styling
- Series-level tooltips
- Markers and data labels
- Theme configuration
- RTL switching
- PNG, SVG, and PDF export
- Printing
- Responsive rendering
- Complete HTML and TypeScript

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

    <title>SmithChart Customization and Legend</title>

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

        .smithchart-toolbar {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 16px;
        }

        .smithchart-toolbar button {
            padding: 8px 14px;
            border: 1px solid #CBD5E1;
            border-radius: 6px;
            background: #FFFFFF;
            color: #0F172A;
            cursor: pointer;
        }

        .smithchart-toolbar button:hover {
            background: #F1F5F9;
        }

        .smithchart-toolbar button:focus-visible {
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

            .smithchart-toolbar {
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
            impedance values.
        </p>

        <div class="smithchart-toolbar">
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
                id="export-pdf"
                type="button"
            >
                Export PDF
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
        height: '600px',
        renderType: 'Impedance',
        theme: 'Material',
        background: '#FFFFFF',
        title: {
            text:
                'Transmission-Line Network Analysis',
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
                    'Measured and simulated impedance',
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
        border: {
            color: '#CBD5E1',
            width: 1
        },
        smithchartArea: {
            background: '#FFFFFF',
            border: {
                color: '#E2E8F0',
                width: 1
            }
        },
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
    const button: HTMLButtonElement | null =
        document.querySelector(selector);

    if (button) {
        button.addEventListener(
            'click',
            handler
        );
    }
};

bindButton(
    '#toggle-rtl',
    (): void => {
        smithchart.enableRtl =
            !smithchart.enableRtl;

        const button: HTMLButtonElement | null =
            document.querySelector('#toggle-rtl');

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
            'transmission-line-analysis'
        );
    }
);

bindButton(
    '#export-svg',
    (): void => {
        smithchart.export(
            'SVG',
            'transmission-line-analysis'
        );
    }
);

bindButton(
    '#export-pdf',
    (): void => {
        smithchart.export(
            'PDF',
            'transmission-line-analysis'
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
        if (resizeTimer !== undefined) {
            window.clearTimeout(
                resizeTimer
            );
        }

        resizeTimer = window.setTimeout(
            (): void => {
                const mobile: boolean =
                    window.matchMedia(
                        '(max-width: 767px)'
                    ).matches;

                smithchart.height =
                    mobile
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

    <title>SmithChart Customization and Legend</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

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

        .smithchart-toolbar {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 16px;
        }

        .smithchart-toolbar button {
            padding: 8px 14px;
            border: 1px solid #CBD5E1;
            border-radius: 6px;
            background: #FFFFFF;
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

            .smithchart-toolbar {
                display: none;
            }

            .smithchart-report {
                max-width: none;
                padding: 0;
                border: 0;
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
            impedance values.
        </p>

        <div class="smithchart-toolbar">
            <button id="toggle-rtl" type="button">
                Enable RTL
            </button>

            <button id="export-png" type="button">
                Export PNG
            </button>

            <button id="export-svg" type="button">
                Export SVG
            </button>

            <button id="export-pdf" type="button">
                Export PDF
            </button>

            <button id="print-button" type="button">
                Print
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
                height: '600px',
                renderType: 'Impedance',
                theme: 'Material',
                background: '#FFFFFF',
                title: {
                    text:
                        'Transmission-Line Network Analysis',
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
                },
                border: {
                    color: '#CBD5E1',
                    width: 1
                },
                smithchartArea: {
                    background: '#FFFFFF',
                    border: {
                        color: '#E2E8F0',
                        width: 1
                    }
                },
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
                                visible: true,
                                fill: '#EFF6FF',
                                border: {
                                    color: '#2563EB',
                                    width: 1
                                },
                                textStyle: {
                                    color: '#1E3A8A',
                                    size: '11px',
                                    fontFamily:
                                        'Segoe UI',
                                    fontWeight: '600'
                                }
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
                                fontFamily:
                                    'Segoe UI',
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
                                fontFamily:
                                    'Segoe UI',
                                fontWeight: '500'
                            }
                        }
                    }
                ]
            });

        smithchart.appendTo(
            '#smithchart-container'
        );

        document
            .getElementById('toggle-rtl')
            .addEventListener(
                'click',
                function () {
                    smithchart.enableRtl =
                        !smithchart.enableRtl;

                    this.textContent =
                        smithchart.enableRtl
                            ? 'Disable RTL'
                            : 'Enable RTL';

                    smithchart.dataBind();
                }
            );

        document
            .getElementById('export-png')
            .addEventListener(
                'click',
                function () {
                    smithchart.export(
                        'PNG',
                        'transmission-line-analysis'
                    );
                }
            );

        document
            .getElementById('export-svg')
            .addEventListener(
                'click',
                function () {
                    smithchart.export(
                        'SVG',
                        'transmission-line-analysis'
                    );
                }
            );

        document
            .getElementById('export-pdf')
            .addEventListener(
                'click',
                function () {
                    smithchart.export(
                        'PDF',
                        'transmission-line-analysis'
                    );
                }
            );

        document
            .getElementById('print-button')
            .addEventListener(
                'click',
                function () {
                    smithchart.print();
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
                            var mobile =
                                window.matchMedia(
                                    '(max-width: 767px)'
                                ).matches;

                            smithchart.height =
                                mobile
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

### Legend

- Show the legend when multiple series are rendered.
- Hide the legend for a self-explanatory single series.
- Assign a meaningful `name` to every legend-enabled series.
- Use shape and color together to distinguish series.
- Use `Bottom` or `Top` on narrow screens.
- Use `Left` or `Right` only when sufficient horizontal space exists.
- Validate custom legend coordinates responsively.
- Enable `toggleVisibility` when users should compare selected series.

### Tooltips

- Import and inject `TooltipRender`.
- Configure the tooltip at series level.
- Keep markers visible to provide clear hover targets.
- Use high-contrast text and background colors.
- Avoid unsupported Chart-style tooltip formatting.
- Keep tooltip content concise.

### Themes

- Match the theme to the application.
- Load the corresponding EJ2 stylesheet.
- Validate every theme value against the installed version.
- Test the theme in both screen and print output.
- Avoid undocumented internal CSS selectors.

### Print and Export

- Render the SmithChart before calling `print()` or `export()`.
- Trigger export through an explicit user action.
- Use PNG for raster reports.
- Use SVG for scalable output.
- Use PDF for document workflows.
- Do not inject unrelated export modules.
- Do not pass width and height as unsupported export arguments.
- Test tooltip, legend, title, and marker appearance before deployment.

### Internationalization

- Set `enableRtl` for component-level RTL rendering.
- Set `dir="rtl"` for an entirely RTL document.
- Use fonts that support the target language.
- Verify title and legend alignment.
- Test the component at supported responsive widths.

## Combined Mistakes and Future References

### Incorrect Tooltip Module

Incorrect:

```typescript
import {
    SmithchartTooltip
} from '@syncfusion/ej2-charts';
```

Correct:

```typescript
import {
    TooltipRender
} from '@syncfusion/ej2-charts';
```

Correct injection:

```typescript
Smithchart.Inject(
    TooltipRender
);
```

### Incorrect Root Tooltip

Incorrect:

```typescript
const smithchart: Smithchart =
    new Smithchart({
        tooltip: {
            enable: true
        }
    });
```

Correct:

```typescript
const smithchart: Smithchart =
    new Smithchart({
        series: [
            {
                points: data,
                tooltip: {
                    visible: true
                }
            }
        ]
    });
```

### Missing Legend Injection

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

Correct:

```typescript
import {
    Smithchart,
    SmithchartLegend
} from '@syncfusion/ej2-charts';

Smithchart.Inject(
    SmithchartLegend
);
```

### Missing Tooltip Injection

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

without importing and injecting `TooltipRender`.

Correct:

```typescript
import {
    TooltipRender
} from '@syncfusion/ej2-charts';

Smithchart.Inject(
    TooltipRender
);
```

### Plain String Title

Incorrect:

```typescript
title:
    'Transmission Line Network Analysis'
```

Correct:

```typescript
title: {
    text:
        'Transmission Line Network Analysis',
    visible: true
}
```

### Plain String Subtitle

Incorrect:

```typescript
subtitle:
    'Frequency Sweep'
```

Use the subtitle object within the title model:

```typescript
title: {
    text: 'Network Analysis',
    subtitle: {
        text: 'Frequency Sweep',
        visible: true
    }
}
```

### Incorrect Tooltip Visibility Property

Incorrect:

```typescript
tooltip: {
    enable: true
}
```

Correct:

```typescript
tooltip: {
    visible: true
}
```

### Unsupported Tooltip Format Assumption

Avoid:

```typescript
tooltip: {
    format:
        'R: {point.resistance}, X: {point.reactance}'
}
```

Use the default SmithChart tooltip unless custom formatting has been validated against the installed version.

### Unnecessary Print Injection

Incorrect:

```typescript
import {
    Print
} from '@syncfusion/ej2-charts';

Smithchart.Inject(
    Print
);
```

Use:

```typescript
smithchart.print();
```

### Unnecessary ImageExport Injection

Incorrect:

```typescript
import {
    ImageExport
} from '@syncfusion/ej2-charts';

Smithchart.Inject(
    ImageExport
);
```

Use:

```typescript
smithchart.export(
    'PNG',
    'smithchart-analysis'
);
```

### Invalid Export Dimensions

Incorrect:

```typescript
smithchart.export(
    'PNG',
    'smithchart',
    1200,
    800
);
```

Do not treat the third and fourth arguments as export width and height.

### Manual File Extension

Avoid:

```typescript
smithchart.export(
    'PNG',
    'smithchart.png'
);
```

Preferred:

```typescript
smithchart.export(
    'PNG',
    'smithchart'
);
```

### Undocumented CSS Selectors

Avoid relying on:

```css
.e-smithchart-series
```

```css
.e-smithchart-axis-label
```

```css
.e-smithchart-grid-line
```

Use supported API properties for stable customization.

### Theme Mismatch

Avoid configuring:

```typescript
theme: 'HighContrast'
```

while loading only a Material stylesheet without validating the resulting appearance.

Keep the component theme and loaded stylesheet aligned.

### Missing Series Name

Avoid:

```typescript
legendSettings: {
    visible: true
},
series: [
    {
        points: data
    }
]
```

Preferred:

```typescript
legendSettings: {
    visible: true
},
series: [
    {
        name: 'Transmission Line',
        points: data
    }
]
```

### Custom Legend Location on Responsive Layouts

Avoid fixed coordinates without responsive validation:

```typescript
legendSettings: {
    position: 'Custom',
    location: {
        x: 900,
        y: 50
    }
}
```

Use a standard position for responsive layouts:

```typescript
legendSettings: {
    position: 'Bottom'
}
```

### Import and Injection Validation Checklist

Before generating a SmithChart customization example, verify:

1. `Smithchart` is imported from `@syncfusion/ej2-charts`.
2. The class uses the exact `Smithchart` casing.
3. JavaScript uses `ej.charts.Smithchart`.
4. `SmithchartLegend` is imported when the legend is visible.
5. `SmithchartLegend` is injected when the legend is visible.
6. `TooltipRender` is imported when a tooltip is visible.
7. `TooltipRender` is injected when a tooltip is visible.
8. `SmithchartTooltip` is not used.
9. `Print` is not unnecessarily imported or injected.
10. `ImageExport` is not unnecessarily imported or injected.
11. Tooltip configuration is placed inside each series.
12. Tooltip visibility uses `visible`.
13. A root-level Chart-style tooltip is not used.
14. Every legend-enabled series has a meaningful `name`.
15. The title is configured as an object.
16. The subtitle is configured within the title model.
17. The legend position is supported.
18. Custom legend coordinates are validated responsively.
19. `toggleVisibility` matches the intended interaction.
20. Marker configuration uses `marker`.
21. Data-label configuration uses `marker.dataLabel`.
22. Every point has numeric `resistance`.
23. Every point has numeric `reactance`.
24. The configured theme is supported by the installed EJ2 version.
25. The matching theme stylesheet is loaded.
26. Undocumented internal CSS selectors are avoided.
27. Export uses PNG, JPEG, SVG, or PDF.
28. Unsupported custom export dimensions are not passed.
29. Printing uses `smithchart.print()`.
30. RTL rendering uses `enableRtl`.
31. The HTML `dir` attribute is set when the entire document is RTL.
32. The target element exists before `appendTo()`.
33. The container has a usable width and height.
34. Resize refreshes are debounced.
35. The final TypeScript and JavaScript examples are complete and runnable.
36. Vue, React, Angular, Composition API, provider, directive, and Single File Component syntax are not used.