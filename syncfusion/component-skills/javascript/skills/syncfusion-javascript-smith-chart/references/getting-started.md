# Getting Started with SmithChart

## Overview

The Syncfusion EJ2 SmithChart is designed to visualize complex impedance and admittance values in high-frequency electrical and transmission-line applications.

SmithChart data points use:

- `resistance` for the real component.
- `reactance` for the imaginary component.

The EJ2 TypeScript class name is:

```typescript
Smithchart
```

The JavaScript global constructor is:

```javascript
ej.charts.Smithchart
```

SmithChart is included in the `@syncfusion/ej2-charts` package. Its tooltip and legend are optional modular features that require `TooltipRender` and `SmithchartLegend`, respectively, in TypeScript applications.

## Table of Contents

- #setup-typescript
  - #prerequisites
  - #package-installation
  - #dependencies
  - #typescript-project-setup
- #setup-javascript
  - #javascript-cdn-setup
  - #javascript-local-files
- #creating-your-first-smithchart
  - #complete-typescript-example
  - #complete-javascript-example
- #container-setup
  - #responsive-container
  - #hidden-container-handling
- #basic-configuration
  - #render-type
  - #title-configuration
  - #series-configuration
  - #marker-configuration
  - #tooltip-configuration
  - #legend-configuration
- #license-registration
  - #typescript-license-registration
  - #javascript-license-registration
- #common-setup-issues
- #combined-mistakes-and-future-references

## Setup TypeScript

### Prerequisites

Before creating a TypeScript SmithChart application, ensure the development environment includes:

- Node.js
- npm
- TypeScript
- A module bundler such as webpack
- A modern web browser
- A code editor
- Git when using the Syncfusion quickstart repository

The current Syncfusion TypeScript getting-started workflow uses the EJ2 webpack quickstart repository and the `@syncfusion/ej2-charts` package.

### Package Installation

For an existing TypeScript application, install the Chart package:

```bash
npm install @syncfusion/ej2-charts
```

Do not install every transitive dependency separately unless the package manager reports a specific unresolved dependency.

For a fresh quickstart application:

```bash
git clone https://github.com/SyncfusionExamples/ej2-quickstart-webpack ej2-quickstart
cd ej2-quickstart
npm install
npm start
```

The quickstart application contains the webpack and TypeScript configuration required to compile and serve the project.

### Dependencies

SmithChart is included in:

```text
@syncfusion/ej2-charts
```

The package uses core and optional dependencies such as:

```text
@syncfusion/ej2-charts
├── @syncfusion/ej2-base
├── @syncfusion/ej2-data
├── @syncfusion/ej2-svg-base
├── @syncfusion/ej2-pdf-export
├── @syncfusion/ej2-compression
└── @syncfusion/ej2-file-utils
```

Export-related packages are relevant when export functionality is used. The package manager resolves these dependencies as part of the `@syncfusion/ej2-charts` installation.

### TypeScript Project Setup

Create the SmithChart host element in the application HTML file:

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

Create the component in `index.ts`:

```typescript
import {
    Smithchart
} from '@syncfusion/ej2-charts';

const smithchart: Smithchart =
    new Smithchart({
        width: '100%',
        height: '500px',
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
                ]
            }
        ]
    });

smithchart.appendTo(
    '#smithchart-container'
);
```

The basic SmithChart does not require feature-module injection.

Injection becomes necessary when modular features such as tooltip or legend are enabled.

## Setup JavaScript

### JavaScript CDN Setup

For a JavaScript application without a build process, use the EJ2 global bundle.

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
        var smithchart =
            new ej.charts.Smithchart({
                width: '100%',
                height: '500px',
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
                        ]
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

Using the complete EJ2 global bundle is simpler and less error-prone than manually loading several individual dependency scripts.

### JavaScript Local Files

When hosting the EJ2 files locally, preserve the same global namespace behavior.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Local EJ2 SmithChart</title>

    lib/material.css

    <script src="lib/ej2.min.js"></script>

    <style>
        #smithchart-container {
            width: 100%;
            min-height: 500px;
        }
    </style>
</head>
<body>
    <div id="smithchart-container"></div>

    <script src="app.js"></script>
</body>
</html>
```

`app.js`:

```javascript
var smithchart =
    new ej.charts.Smithchart({
        width: '100%',
        height: '500px',
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
                ]
            }
        ]
    });

smithchart.appendTo(
    '#smithchart-container'
);
```

The locally hosted script and stylesheet versions must match.

## Creating Your First SmithChart

### Complete TypeScript Example

This complete example includes:

- TypeScript interfaces
- Complete impedance data
- A title
- Impedance rendering
- Series styling
- Visible markers
- Tooltip support
- Legend support
- Correct feature imports
- Correct feature injection
- Responsive dimensions

SmithChart tooltip requires `TooltipRender`, and the legend requires `SmithchartLegend`.

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

    <title>Transmission Line SmithChart</title>
    <style>
        body {
            margin: 0;
            padding: 24px;
            background: #F8FAFC;
            font-family: "Segoe UI", sans-serif;
        }

        .smithchart-wrapper {
            width: 100%;
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            box-sizing: border-box;
            border: 1px solid #E2E8F0;
            border-radius: 10px;
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
                min-height: 400px;
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

#### index.ts

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

const transmissionData: SmithChartPoint[] = [
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
    },
    {
        resistance: 1,
        reactance: 0.8
    },
    {
        resistance: 0.5,
        reactance: 0.4
    },
    {
        resistance: 0.3,
        reactance: 0.2
    },
    {
        resistance: 0,
        reactance: 0.15
    }
];

const smithchart: Smithchart =
    new Smithchart({
        width: '100%',
        height: '550px',
        renderType: 'Impedance',
        title: {
            text: 'Transmission Line Analysis',
            visible: true
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
                name: 'Transmission Line',
                points: transmissionData,
                fill: '#2563EB',
                width: 2,
                marker: {
                    visible: true,
                    width: 8,
                    height: 8,
                    shape: 'Circle'
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

### Complete JavaScript Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>JavaScript SmithChart</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

    <style>
        body {
            margin: 0;
            padding: 24px;
            background: #F8FAFC;
            font-family: "Segoe UI", sans-serif;
        }

        .smithchart-wrapper {
            width: 100%;
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            box-sizing: border-box;
            border: 1px solid #E2E8F0;
            border-radius: 10px;
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
                min-height: 400px;
            }
        }
    </style>
</head>
<body>
    <main class="smithchart-wrapper">
        <div id="smithchart-container"></div>
    </main>

    <script>
        var transmissionData = [
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
            },
            {
                resistance: 1,
                reactance: 0.8
            },
            {
                resistance: 0.5,
                reactance: 0.4
            },
            {
                resistance: 0.3,
                reactance: 0.2
            },
            {
                resistance: 0,
                reactance: 0.15
            }
        ];

        var smithchart =
            new ej.charts.Smithchart({
                width: '100%',
                height: '550px',
                renderType: 'Impedance',
                title: {
                    text:
                        'Transmission Line Analysis',
                    visible: true
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
                        name: 'Transmission Line',
                        points: transmissionData,
                        fill: '#2563EB',
                        width: 2,
                        marker: {
                            visible: true,
                            width: 8,
                            height: 8,
                            shape: 'Circle'
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

## Container Setup

The SmithChart must be appended to an existing HTML element.

```html
<div id="smithchart-container"></div>
```

Recommended sizing:

```css
#smithchart-container {
    width: 100%;
    min-height: 500px;
}
```

The component can also define its own dimensions:

```typescript
const smithchart: Smithchart =
    new Smithchart({
        width: '100%',
        height: '500px'
    });
```

Using both a responsive parent width and an explicit component height produces predictable rendering.

### Responsive Container

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

@media (max-width: 767px) {
    #smithchart-container {
        min-height: 400px;
    }
}
```

Responsive TypeScript configuration:

```typescript
const isSmallScreen = (): boolean => {
    return window.matchMedia(
        '(max-width: 767px)'
    ).matches;
};

const smithchart: Smithchart =
    new Smithchart({
        width: '100%',
        height: isSmallScreen()
            ? '400px'
            : '550px',
        series: [
            {
                points: transmissionData
            }
        ]
    });

smithchart.appendTo(
    '#smithchart-container'
);
```

Debounced resize handling:

```typescript
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
                smithchart.height =
                    window.matchMedia(
                        '(max-width: 767px)'
                    ).matches
                        ? '400px'
                        : '550px';

                smithchart.refresh();
            },
            150
        );
    }
);
```

### Hidden Container Handling

If the SmithChart is initialized inside a hidden tab, dialog, or panel, the available dimensions may be zero.

After the parent becomes visible, call:

```typescript
smithchart.refresh();
```

Do not repeatedly destroy and recreate the SmithChart solely to resolve a hidden-container sizing issue.

## Basic Configuration

### Render Type

SmithChart supports impedance and admittance rendering.

Impedance:

```typescript
renderType: 'Impedance'
```

Admittance:

```typescript
renderType: 'Admittance'
```

Choose the mode that matches the electrical values represented by the application.

### Title Configuration

The title is an object configuration.

Correct:

```typescript
title: {
    text: 'Transmission Line Analysis',
    visible: true
}
```

Do not use a plain string:

```typescript
title: 'Transmission Line Analysis'
```

Title styling:

```typescript
title: {
    text: 'Transmission Line Analysis',
    visible: true,
    textStyle: {
        color: '#111827',
        size: '18px',
        fontFamily: 'Segoe UI',
        fontWeight: '600'
    }
}
```

### Series Configuration

A series can be configured with inline points:

```typescript
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
        ]
    }
]
```

For reusable data:

```typescript
const data: SmithChartPoint[] = [
    {
        resistance: 10,
        reactance: 25
    },
    {
        resistance: 8,
        reactance: 6
    }
];
```

```typescript
series: [
    {
        points: data,
        name: 'Transmission Line',
        fill: '#2563EB',
        width: 2
    }
]
```

Each point must provide numeric `resistance` and `reactance` values.

### Marker Configuration

Show markers at each SmithChart point:

```typescript
marker: {
    visible: true,
    width: 8,
    height: 8,
    shape: 'Circle'
}
```

Example:

```typescript
series: [
    {
        points: transmissionData,
        marker: {
            visible: true,
            width: 8,
            height: 8,
            shape: 'Circle'
        }
    }
]
```

### Tooltip Configuration

Tooltips are disabled by default. To enable them in TypeScript, import and inject `TooltipRender`, then set the series tooltip `visible` property to `true`.

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
        points: transmissionData,
        marker: {
            visible: true
        },
        tooltip: {
            visible: true
        }
    }
]
```

Do not use Chart-style tooltip configuration at the SmithChart root:

```typescript
tooltip: {
    enable: true
}
```

Use:

```typescript
series: [
    {
        tooltip: {
            visible: true
        }
    }
]
```

### Legend Configuration

Legend visibility is disabled by default. Import and inject `SmithchartLegend` before setting `legendSettings.visible` to `true`.

```typescript
import {
    Smithchart,
    SmithchartLegend
} from '@syncfusion/ej2-charts';

Smithchart.Inject(
    SmithchartLegend
);
```

Enable the legend:

```typescript
legendSettings: {
    visible: true,
    position: 'Bottom'
}
```

Common positions include:

```text
Top
Bottom
Left
Right
Custom
```

Provide a series name so that the legend has descriptive text:

```typescript
series: [
    {
        name: 'Transmission Line',
        points: transmissionData
    }
]
```

## License Registration

Register a valid Syncfusion license key when required by the project and license terms.

Do not commit a production license key to a public repository.

### TypeScript License Registration

Register the key before creating any EJ2 component.

```typescript
import {
    registerLicense
} from '@syncfusion/ej2-base';

registerLicense(
    'YOUR_SYNCFUSION_LICENSE_KEY'
);
```

Then create the SmithChart:

```typescript
import {
    Smithchart
} from '@syncfusion/ej2-charts';

const smithchart: Smithchart =
    new Smithchart({
        series: [
            {
                points: [
                    {
                        resistance: 10,
                        reactance: 25
                    }
                ]
            }
        ]
    });

smithchart.appendTo(
    '#smithchart-container'
);
```

### JavaScript License Registration

When using the EJ2 global bundle:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

<script>
    ej.base.registerLicense(
        'YOUR_SYNCFUSION_LICENSE_KEY'
    );
</script>
```

Register the license before initializing the SmithChart.

## Common Setup Issues

### SmithChart Does Not Render

Validate the container before initialization:

```typescript
const container: HTMLElement | null =
    document.querySelector(
        '#smithchart-container'
    );

if (!container) {
    throw new Error(
        'SmithChart container was not found.'
    );
}
```

Render after validation:

```typescript
smithchart.appendTo(container);
```

Also verify:

- The selector matches the HTML ID.
- The parent has a nonzero width.
- The component has a usable height.
- The script runs after the host element is created.
- The imported class is `Smithchart`.
- The package is installed.
- No runtime error occurs before `appendTo()`.

### Incorrect Class Name

Incorrect:

```typescript
import {
    SmithChart
} from '@syncfusion/ej2-charts';
```

Correct:

```typescript
import {
    Smithchart
} from '@syncfusion/ej2-charts';
```

Incorrect JavaScript:

```javascript
new ej.charts.SmithChart({});
```

Correct JavaScript:

```javascript
new ej.charts.Smithchart({});
```

### Module Import Error

Install the correct package:

```bash
npm install @syncfusion/ej2-charts
```

Use the correct import:

```typescript
import {
    Smithchart
} from '@syncfusion/ej2-charts';
```

Optional feature imports must come from the same package:

```typescript
import {
    Smithchart,
    SmithchartLegend,
    TooltipRender
} from '@syncfusion/ej2-charts';
```

### Tooltip Does Not Render

Ensure the module is imported:

```typescript
import {
    TooltipRender
} from '@syncfusion/ej2-charts';
```

Ensure it is injected:

```typescript
Smithchart.Inject(
    TooltipRender
);
```

Ensure the series configuration enables it:

```typescript
tooltip: {
    visible: true
}
```

Ensure a marker is visible when clear point interaction is required:

```typescript
marker: {
    visible: true
}
```

### Legend Does Not Render

Ensure the module is imported:

```typescript
import {
    SmithchartLegend
} from '@syncfusion/ej2-charts';
```

Ensure it is injected:

```typescript
Smithchart.Inject(
    SmithchartLegend
);
```

Enable the legend:

```typescript
legendSettings: {
    visible: true
}
```

Provide a series name:

```typescript
series: [
    {
        name: 'Transmission Line',
        points: transmissionData
    }
]
```

### Data Does Not Display

Use valid numeric point properties:

```typescript
const points: SmithChartPoint[] = [
    {
        resistance: 10,
        reactance: 25
    },
    {
        resistance: 8,
        reactance: 6
    }
];
```

Incorrect:

```typescript
const points = [
    {
        resistance: 10
    }
];
```

Incorrect:

```typescript
const points = [
    {
        x: 10,
        y: 25
    }
];
```

SmithChart inline points require:

```text
resistance
reactance
```

### JavaScript Global Namespace Is Undefined

If this fails:

```javascript
new ej.charts.Smithchart({});
```

verify that the EJ2 script is loaded first:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

Then initialize the component:

```html
<script>
    var smithchart =
        new ej.charts.Smithchart({});
</script>
```

### Component Is Clipped

Use an appropriate component height:

```typescript
height: '500px'
```

Use a parent with sufficient space:

```css
#smithchart-container {
    width: 100%;
    min-height: 500px;
}
```

Avoid rendering the component initially inside a zero-width or hidden parent.

## Combined Mistakes and Future References

### Plain String Title

Incorrect:

```typescript
title: 'Transmission Line Analysis'
```

Correct:

```typescript
title: {
    text: 'Transmission Line Analysis',
    visible: true
}
```

### Unnecessary Injection for Basic Rendering

A basic SmithChart does not require:

```typescript
Smithchart.Inject();
```

Only inject enabled modular features.

Tooltip:

```typescript
Smithchart.Inject(
    TooltipRender
);
```

Legend:

```typescript
Smithchart.Inject(
    SmithchartLegend
);
```

Tooltip and legend:

```typescript
Smithchart.Inject(
    TooltipRender,
    SmithchartLegend
);
```

### Missing Tooltip Module

Incorrect:

```typescript
const smithchart: Smithchart =
    new Smithchart({
        series: [
            {
                tooltip: {
                    visible: true
                }
            }
        ]
    });
```

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

Incorrect:

```typescript
legendSettings: {
    visible: true
}
```

without importing and injecting `SmithchartLegend`.

Correct:

```typescript
import {
    SmithchartLegend
} from '@syncfusion/ej2-charts';

Smithchart.Inject(
    SmithchartLegend
);
```

### Incorrect Root Tooltip Syntax

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

### Incorrect Point Field Names

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

### Manually Installing Every Dependency

Avoid requiring separate installation of each transitive dependency for a normal package-based setup.

Preferred:

```bash
npm install @syncfusion/ej2-charts
```

Let npm resolve its dependency graph.

### Version-Mismatched CDN Files

Do not mix different EJ2 versions:

```html
.../33.2.3/ej2-base/...script>
.../34.1.0/ej2-charts/...script>
```

Use the complete global bundle or keep every individual package at the same EJ2 version.

### Loading Optional PDF Scripts for Basic Rendering

Do not load PDF-export scripts in a basic SmithChart example unless PDF export is required.

Basic rendering requires only the SmithChart-capable EJ2 bundle.

### Assuming the Container Must Always Be 600 Pixels

An explicit height is recommended for predictable rendering, but it does not always need to be exactly `600px`.

Valid examples include:

```typescript
height: '400px'
```

```typescript
height: '500px'
```

```typescript
height: '600px'
```

Choose a value appropriate for the layout and available viewport.

### Invalid License-Key Handling

Do not include a real production key in source control:

```typescript
registerLicense(
    'REAL_PRODUCTION_KEY'
);
```

Use secure environment-specific configuration and register the key before creating EJ2 components.

### Final Runtime-Safety Checklist

Before returning a SmithChart solution, verify:

1. The implementation is TypeScript or JavaScript.
2. `Smithchart` uses the correct casing.
3. The package import is `@syncfusion/ej2-charts`.
4. The JavaScript constructor is `ej.charts.Smithchart`.
5. The host element exists.
6. The host selector matches `appendTo(...)`.
7. The container has an available width.
8. The component has a suitable height.
9. The theme stylesheet is loaded.
10. Every point contains numeric `resistance`.
11. Every point contains numeric `reactance`.
12. `renderType` is appropriate for the data.
13. The title uses the title object.
14. `TooltipRender` is imported when tooltip is enabled.
15. `TooltipRender` is injected when tooltip is enabled.
16. Tooltip visibility is configured at series level.
17. `SmithchartLegend` is imported when legend is enabled.
18. `SmithchartLegend` is injected when legend is enabled.
19. A series name is provided when a legend is used.
20. CDN files use compatible versions.
21. A hidden parent is refreshed after becoming visible.
22. Resize handling is debounced when manual refresh is used.
23. The license is registered before component initialization when required.
24. No real license key is exposed in public source.
25. The final example is complete, runnable, and directly copyable.