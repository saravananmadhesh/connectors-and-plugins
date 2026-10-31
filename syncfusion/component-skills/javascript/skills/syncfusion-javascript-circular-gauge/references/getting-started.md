# Getting Started with Circular Gauge

- #installation-and-setup
  - #prerequisites
  - #install-the-package
  - #dependencies
- [TypeScript-setup
  - [Create the HTML Container](#create-the-html-containergauge
  - [Understand the Configuration](##javascript-setup
  - #cdn-setup
  - #local-script-setup
- [basic-gauge-configuration
  - [Gauge Dimensions](#gauge-dimensionsation](#- #tick-configuration
  - #label-configuration
  - #pointer-configuration
- #module-injection
- #complete-typescript-example
- [complete-javascript-example
- [Running the Application](#running--validation-checklist
- [Combined Mistakes and Future-references

## Installation and Setup

### Purpose

The Syncfusion Essential JS 2 Circular Gauge displays numeric values on a circular scale.

Use Circular Gauge when the application requires:

- Speedometer-style visualization.
- Progress indication.
- Performance metrics.
- Temperature or pressure measurement.
- Range-based status visualization.
- Needle, marker, or range-bar pointers.
- Semi-circular, quarter-circular, or full-circular scales.

The Circular Gauge is available through the `@syncfusion/ej2-circulargauge` package. Its required package dependencies include `@syncfusion/ej2-base`, `@syncfusion/ej2-svg-base`, and `@syncfusion/ej2-pdf-export`.

### Prerequisites

For a TypeScript project, install:

```text
Node.js
npm
TypeScript
A module bundler such as Webpack
A code editor
A modern web browser
```

For a global JavaScript project, prepare:

```text
An HTML file
The Syncfusion EJ2 global script
A JavaScript file
A local HTTP server
A modern web browser
```

### Install the Package

Install Circular Gauge through npm:

```bash
npm install @syncfusion/ej2-circulargauge
```

The package manager installs the required dependencies automatically.

Keep all Syncfusion package versions consistent to avoid dependency conflicts.

### Dependencies

```text
|-- @syncfusion/ej2-circulargauge
    |-- @syncfusion/ej2-base
    |-- @syncfusion/ej2-svg-base
    |-- @syncfusion/ej2-pdf-export
```

Do not install every transitive dependency separately unless the project has a specific dependency-management requirement.

## TypeScript Setup

### Project Structure

A basic TypeScript Webpack project can use the following structure:

```text
circular-gauge-app/
|-- src/
|   |-- app/
|   |   |-- app.ts
|   |-- index.html
|-- package.json
|-- tsconfig.json
|-- webpack.config.js
```

File responsibilities:

```text
src/index.html    -> Contains the Circular Gauge host element.
src/app/app.ts    -> Imports and creates the Circular Gauge.
package.json      -> Contains packages and npm scripts.
tsconfig.json     -> Contains TypeScript compiler settings.
webpack.config.js -> Bundles and serves the application.
```

### Create the HTML Container

File: `src/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>Syncfusion Circular Gauge</title>
</head>
<body>
    <div id="gauge"></div>
</body>
</html>
```

The host element is:

```html
<div id="gauge"></div>
```

The same ID must be used when attaching the gauge:

```typescript
gauge.appendTo('#gauge');
```

### Create the TypeScript Gauge

File: `src/app/app.ts`

```typescript
import {
    CircularGauge
} from '@syncfusion/ej2-circulargauge';

const gauge: CircularGauge = new CircularGauge({
    width: '100%',
    height: '450px',

    axes: [{
        minimum: 0,
        maximum: 100,
        startAngle: 230,
        endAngle: 130,

        majorTicks: {
            interval: 20,
            width: 2
        },

        minorTicks: {
            interval: 5,
            width: 1
        },

        labelStyle: {
            position: 'Inside',

            font: {
                fontFamily: 'Segoe UI',
                size: '12px'
            }
        },

        pointers: [{
            value: 50,
            type: 'Needle',
            radius: '80%',

            cap: {
                radius: 8,
                color: '#0066cc'
            }
        }]
    }]
});

gauge.appendTo('#gauge');
```

### Understand the Configuration

The `CircularGauge` class creates the component.

```typescript
const gauge: CircularGauge = new CircularGauge({
    // Configuration
});
```

The `axes` collection defines one or more circular scales.

```typescript
axes: [{
    minimum: 0,
    maximum: 100
}]
```

The pointer displays the current value.

```typescript
pointers: [{
    value: 50,
    type: 'Needle'
}]
```

The gauge is attached to the host element after construction.

```typescript
gauge.appendTo('#gauge');
```

## JavaScript Setup

### CDN Configuration

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"/script>
```

For the Syncfusion Circular Gauge, use either the consolidated EJ2 bundle or the individual Circular Gauge package scripts. Do not combine both approaches on the same page. The official Circular Gauge setup identifies `ej2-base` and `ej2-svg-base` as required individual dependencies, while `ej2-pdf-export` is required only when PDF export is used.

#### Option 1: Consolidated EJ2 Bundle

Use this approach when bundle size is not a concern or when the page uses several Syncfusion components.

```html
<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"
    type="text/javascript"
></script>
```

Do not add the following individual scripts when the consolidated bundle is already loaded:

```text
ej2-base
ej2-svg-base
ej2-pdf-export
ej2-circulargauge
```

#### Complete Circular Gauge Example Using the Consolidated Bundle

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>Syncfusion Circular Gauge</title>

    <script
        src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"
        type="text/javascript"
    ></script>
</head>
<body>
    <div id="gauge"></div>

    <script>
        var gauge =
            new ej.circulargauge.CircularGauge({
                width: '100%',
                height: '450px',

                title: 'System Performance',

                axes: [{
                    minimum: 0,
                    maximum: 100,
                    startAngle: 230,
                    endAngle: 130,

                    majorTicks: {
                        interval: 20,
                        width: 2,
                        height: 10,
                        position: 'Inside'
                    },

                    minorTicks: {
                        interval: 5,
                        width: 1,
                        height: 5,
                        position: 'Inside'
                    },

                    labelStyle: {
                        position: 'Inside',

                        font: {
                            fontFamily: 'Segoe UI',
                            size: '12px',
                            color: '#333333'
                        }
                    },

                    ranges: [
                        {
                            start: 0,
                            end: 50,
                            radius: '90%',
                            startWidth: 10,
                            endWidth: 10,
                            color: '#107c10'
                        },
                        {
                            start: 50,
                            end: 80,
                            radius: '90%',
                            startWidth: 10,
                            endWidth: 10,
                            color: '#ffb900'
                        },
                        {
                            start: 80,
                            end: 100,
                            radius: '90%',
                            startWidth: 10,
                            endWidth: 10,
                            color: '#d13438'
                        }
                    ],

                    pointers: [{
                        value: 75,
                        type: 'Needle',
                        radius: '75%',
                        pointerWidth: 4,
                        color: '#0066cc',

                        cap: {
                            radius: 8,
                            color: '#0066cc'
                        },

                        needleTail: {
                            length: '20%',
                            color: '#0066cc'
                        }
                    }]
                }]
            });

        gauge.appendTo('#gauge');
    </script>
</body>
</html>
```

#### Option 2: Individual Circular Gauge Package Scripts

Use this approach when the page requires only Circular Gauge and reducing the loaded script size is important.

Load the scripts in dependency order:

```html
<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js"
    type="text/javascript"
></script>

<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-svg-base/dist/global/ej2-svg-base.min.js"
    type="text/javascript"
></script>

<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-circulargauge/dist/global/ej2-circulargauge.min.js"
    type="text/javascript"
></script>
```

The dependency order is:

```text
1. ej2-base
2. ej2-svg-base
3. ej2-circulargauge
4. Application script
```

Unlike EJ2 Chart, Circular Gauge does not require `ej2-data` for its basic rendering. The official individual-package setup lists `ej2-base`, `ej2-svg-base`, and `ej2-circulargauge` for a basic gauge.

#### Complete Circular Gauge Example Using Individual Scripts

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>Syncfusion Circular Gauge</title>

    <script
        src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js"
        type="text/javascript"
    ></script>

    <script
        src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-svg-base/dist/global/ej2-svg-base.min.js"
        type="text/javascript"
    ></script>
    <script
        src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-circulargauge/dist/global/ej2-circulargauge.min.js"
        type="text/javascript"
    ></script>

</head>
<body>
    <div id="gauge"></div>

    <script>
        var gauge =
            new ej.circulargauge.CircularGauge({
                width: '100%',
                height: '450px',

                title: 'System Performance',

                axes: [{
                    minimum: 0,
                    maximum: 100,
                    startAngle: 230,
                    endAngle: 130,

                    majorTicks: {
                        interval: 20,
                        width: 2,
                        height: 10,
                        position: 'Inside'
                    },

                    minorTicks: {
                        interval: 5,
                        width: 1,
                        height: 5,
                        position: 'Inside'
                    },

                    labelStyle: {
                        position: 'Inside',

                        font: {
                            fontFamily: 'Segoe UI',
                            size: '12px',
                            color: '#333333'
                        }
                    },

                    pointers: [{
                        value: 75,
                        type: 'Needle',
                        radius: '75%',

                        cap: {
                            radius: 8,
                            color: '#0066cc'
                        }
                    }]
                }]
            });

        gauge.appendTo('#gauge');
    </script>
</body>
</html>
```

#### Individual Scripts with PDF Export

When PDF export is required, load `ej2-pdf-export` after `ej2-svg-base` and before `ej2-circulargauge`.

```html
<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js"
    type="text/javascript"
></script>

<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-svg-base/dist/global/ej2-svg-base.min.js"
    type="text/javascript"
></script>

<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-pdf-export/dist/global/ej2-pdf-export.min.js"
    type="text/javascript"
></script>

<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-circulargauge/dist/global/ej2-circulargauge.min.js"
    type="text/javascript"
></script>
```

The dependency order for Circular Gauge with PDF export is:

```text
1. ej2-base
2. ej2-svg-base
3. ej2-pdf-export
4. ej2-circulargauge
5. Application script
```

#### Application Script in a Separate File

File: `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>Syncfusion Circular Gauge</title>

    <script
        src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js"
        type="text/javascript"
    ></script>

    <script
        src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-svg-base/dist/global/ej2-svg-base.min.js"
        type="text/javascript"
    ></script>

    <script
        src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-circulargauge/dist/global/ej2-circulargauge.min.js"
        type="text/javascript"
    ></script>
</head>
<body>
    <div id="gauge"></div>

    <script src="index.js"></script>
</body>
</html>
```

File: `index.js`

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        width: '100%',
        height: '450px',

        axes: [{
            minimum: 0,
            maximum: 100,
            startAngle: 230,
            endAngle: 130,

            majorTicks: {
                interval: 20
            },

            minorTicks: {
                interval: 5
            },

            pointers: [{
                value: 75,
                type: 'Needle'
            }]
        }]
    });

gauge.appendTo('#gauge');
```

#### Correct Circular Gauge CDN Rule

```text
Use either:

https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js

Or:

https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js
https://cdn.syncfusion.com/ej2/34.2.2/ej2-svg-base/dist/global/ej2-svg-base.min.js
https://cdn.syncfusion.com/ej2/34.2.2/ej2-circulargauge/dist/global/ej2-circulargauge.min.js

Add ej2-pdf-export before ej2-circulargauge only when PDF export is required.
```

#### Combined Mistakes and Future References

```text
❌ Using ej2.min.jsscript instead of ej2.min.js.
❌ Adding editor-generated anchor markup inside a script URL.
❌ Combining the consolidated bundle with individual package scripts.
❌ Loading ej2-circulargauge before ej2-base.
❌ Loading ej2-circulargauge before ej2-svg-base.
❌ Adding ej2-data even though a basic Circular Gauge does not require it.
❌ Omitting ej2-pdf-export when individual scripts are used with PDF export.
❌ Loading index.js before the Syncfusion scripts.
❌ Using different EJ2 versions for dependent scripts.
❌ Encoding executable script tags as <script>.
❌ Forgetting the Circular Gauge host element.
❌ Forgetting gauge.appendTo('#gauge').
```

Correct host:

```html
<div id="gauge"></div>
```

Correct global constructor:

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        axes: [{
            minimum: 0,
            maximum: 100,

            pointers: [{
                value: 50
            }]
        }]
    });

gauge.appendTo('#gauge');
```

The complete EJ2 global bundle exposes Circular Gauge through:

```javascript
ej.circulargauge.CircularGauge
```

File: `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>Syncfusion Circular Gauge</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
</head>
<body>
    <div id="gauge"></div>

    <script src="index.js"></script>
</body>
</html>
```

Load the Syncfusion script before `index.js`.

Correct order:

```text
1. Syncfusion EJ2 global script
2. HTML gauge container
3. Application script
```

File: `index.js`

```javascript
var gauge = new ej.circulargauge.CircularGauge({
    width: '100%',
    height: '450px',

    axes: [{
        minimum: 0,
        maximum: 100,
        startAngle: 230,
        endAngle: 130,

        majorTicks: {
            interval: 20,
            width: 2
        },

        minorTicks: {
            interval: 5,
            width: 1
        },

        labelStyle: {
            position: 'Inside',

            font: {
                fontFamily: 'Segoe UI',
                size: '12px'
            }
        },

        pointers: [{
            value: 50,
            type: 'Needle',
            radius: '80%',

            cap: {
                radius: 8,
                color: '#0066cc'
            }
        }]
    }]
});

gauge.appendTo('#gauge');
```

### Local Script Setup

A local JavaScript project can use the following structure:

```text
circular-gauge-app/
|-- resources/
|   |-- scripts/
|       |-- ej2.min.js
|-- index.html
|-- index.js
```

File: `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>Syncfusion Circular Gauge</title>

    <script src="resources/scripts/ej2.min.js"></script>
</head>
<body>
    <div id="gauge"></div>

    <script src="index.js"></script>
</body>
</html>
```

Use local scripts from the same Essential JS 2 release. Mixing scripts from different releases can cause missing-module or compatibility errors.

## Basic Gauge Configuration

A basic Circular Gauge requires:

```text
1. An existing HTML host element.
2. A CircularGauge instance.
3. At least one axis configuration.
4. An optional pointer for displaying a value.
5. An appendTo call.
```

### Gauge Dimensions

Use `width` and `height` to control the gauge dimensions.

```typescript
const gauge: CircularGauge = new CircularGauge({
    width: '500px',
    height: '500px',

    axes: [{
        minimum: 0,
        maximum: 100
    }]
});

gauge.appendTo('#gauge');
```

Responsive width:

```typescript
width: '100%'
```

Fixed height:

```typescript
height: '450px'
```

A percentage width requires a parent element with a measurable width.

### Axis Configuration

The axis defines the numeric scale.

```typescript
axes: [{
    minimum: 0,
    maximum: 100,
    startAngle: 230,
    endAngle: 130
}]
```

Property behavior:

```text
minimum    -> Defines the lowest axis value.
maximum    -> Defines the highest axis value.
startAngle -> Defines where the circular scale begins.
endAngle   -> Defines where the circular scale ends.
```

Example speedometer-style axis:

```typescript
axes: [{
    minimum: 0,
    maximum: 200,
    startAngle: 230,
    endAngle: 130
}]
```

Example full-circle axis:

```typescript
axes: [{
    minimum: 0,
    maximum: 100,
    startAngle: 0,
    endAngle: 360
}]
```

The pointer value should normally remain between the axis minimum and maximum.

### Tick Configuration

Major ticks identify primary scale intervals.

```typescript
majorTicks: {
    interval: 20,
    width: 2,
    height: 10,
    position: 'Inside'
}
```

Minor ticks subdivide the major intervals.

```typescript
minorTicks: {
    interval: 5,
    width: 1,
    height: 5,
    position: 'Inside'
}
```

Complete configuration:

```typescript
axes: [{
    minimum: 0,
    maximum: 100,

    majorTicks: {
        interval: 20,
        width: 2,
        height: 10,
        position: 'Inside'
    },

    minorTicks: {
        interval: 5,
        width: 1,
        height: 5,
        position: 'Inside'
    }
}]
```

Ensure that:

```text
minimum is less than maximum.
majorTicks.interval is greater than zero.
minorTicks.interval is greater than zero.
Minor intervals logically subdivide major intervals.
```

### Label Configuration

Use `labelStyle` to configure axis labels.

```typescript
labelStyle: {
    position: 'Inside',

    font: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: 'Normal',
        size: '12px',
        color: '#333333'
    }
}
```

Use labels to help users interpret the numeric scale.

Keep labels readable by validating:

- Font size.
- Text color.
- Tick placement.
- Start and end angles.
- Axis radius.
- Gauge container dimensions.

### Pointer Configuration

Pointers display values on an axis.

Circular Gauge supports pointer types including Needle, RangeBar, and Marker.

#### Needle Pointer

```typescript
pointers: [{
    value: 75,
    type: 'Needle',
    radius: '80%',

    cap: {
        radius: 8,
        color: '#0066cc'
    }
}]
```

Use a needle pointer for speedometer-style gauges.

#### Range-Bar Pointer

```typescript
pointers: [{
    value: 75,
    type: 'RangeBar',
    radius: '80%',
    pointerWidth: 12,
    color: '#0066cc'
}]
```

Use a range-bar pointer for progress and completion values.

#### Marker Pointer

```typescript
pointers: [{
    value: 75,
    type: 'Marker',
    markerShape: 'Triangle',
    radius: '90%',
    markerWidth: 12,
    markerHeight: 12,
    color: '#d83b01'
}]
```

Use a marker pointer when a compact indicator is preferable to a needle or range bar.

## Module Injection

### Purpose

Some Circular Gauge features are delivered through separate modules.

A feature module must be:

```text
1. Imported from @syncfusion/ej2-circulargauge.
2. Passed to CircularGauge.Inject(...).
3. Configured in the gauge.
```

Do not inject feature modules that are not used.

### Basic Gauge

A basic axis and pointer do not require the `Annotations` module.

```typescript
import {
    CircularGauge
} from '@syncfusion/ej2-circulargauge';
```

### Annotations

Annotations place text, shapes, images, or custom elements at specific gauge positions. The `Annotations` module must be injected when axis annotations are configured.

```typescript
import {
    CircularGauge,
    Annotations
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Annotations);
```

Example:

```typescript
import {
    CircularGauge,
    Annotations
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Annotations);

const gauge: CircularGauge = new CircularGauge({
    width: '100%',
    height: '450px',

    axes: [{
        minimum: 0,
        maximum: 100,

        annotations: [{
            content:
                '<div style="font-size:20px;font-weight:600;">' +
                '50%' +
                '</div>',
            angle: 0,
            radius: '0%',
            zIndex: '1'
        }],

        pointers: [{
            value: 50,
            type: 'RangeBar'
        }]
    }]
});

gauge.appendTo('#gauge');
```

Annotation positioning uses:

```text
angle  -> Angular location around the axis.
radius -> Distance relative to the axis radius.
```

The annotation `content` can contain text, HTML, images, or a selector for custom content.

### Feature Injection Rule

Incorrect:

```typescript
import {
    CircularGauge
} from '@syncfusion/ej2-circulargauge';

const gauge = new CircularGauge({
    axes: [{
        annotations: [{
            content: '50%'
        }]
    }]
});
```

Correct:

```typescript
import {
    CircularGauge,
    Annotations
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Annotations);
```

## Complete TypeScript Example

The following example includes:

- Explicit width and height.
- One numeric axis.
- Major and minor ticks.
- Axis labels.
- A needle pointer.
- Colored ranges.
- A central annotation.
- Correct module injection.
- Explicit DOM attachment.

### Required HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>Syncfusion Circular Gauge</title>
</head>
<body>
    <div id="gauge"></div>
</body>
</html>
```

### TypeScript

```typescript
import {
    CircularGauge,
    Annotations
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Annotations);

const gauge: CircularGauge = new CircularGauge({
    width: '100%',
    height: '500px',

    title: 'System Performance',

    titleStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: 'Bold',
        size: '18px',
        color: '#333333'
    },

    axes: [{
        minimum: 0,
        maximum: 100,
        startAngle: 230,
        endAngle: 130,
        radius: '90%',

        lineStyle: {
            width: 2,
            color: '#666666'
        },

        majorTicks: {
            interval: 20,
            width: 2,
            height: 10,
            color: '#333333',
            position: 'Inside'
        },

        minorTicks: {
            interval: 5,
            width: 1,
            height: 5,
            color: '#666666',
            position: 'Inside'
        },

        labelStyle: {
            position: 'Inside',

            font: {
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: 'Normal',
                size: '12px',
                color: '#333333'
            }
        },

        ranges: [
            {
                start: 0,
                end: 50,
                radius: '90%',
                startWidth: 10,
                endWidth: 10,
                color: '#107c10'
            },
            {
                start: 50,
                end: 80,
                radius: '90%',
                startWidth: 10,
                endWidth: 10,
                color: '#ffb900'
            },
            {
                start: 80,
                end: 100,
                radius: '90%',
                startWidth: 10,
                endWidth: 10,
                color: '#d13438'
            }
        ],

        pointers: [{
            value: 75,
            type: 'Needle',
            radius: '75%',
            pointerWidth: 4,
            color: '#0066cc',

            cap: {
                radius: 8,
                color: '#0066cc',

                border: {
                    width: 1,
                    color: '#004578'
                }
            },

            needleTail: {
                length: '20%',
                color: '#0066cc'
            },

            animation: {
                enable: true,
                duration: 1000
            }
        }],

        annotations: [{
            content:
                '<div style="' +
                'font-family:Segoe UI;' +
                'font-size:20px;' +
                'font-weight:600;' +
                'color:#333333;' +
                '">' +
                '75%' +
                '</div>',
            angle: 90,
            radius: '40%',
            zIndex: '1'
        }]
    }]
});

gauge.appendTo('#gauge');
```

### Expected Behavior

```text
1. The gauge renders from 0 to 100.
2. Major ticks appear every 20 units.
3. Minor ticks appear every 5 units.
4. Labels appear inside the axis.
5. Three colored ranges indicate normal, warning, and critical values.
6. The needle points to 75.
7. The pointer animates when the gauge loads.
8. The annotation displays the current value.
9. The gauge is attached to the element whose ID is gauge.
```

## Complete JavaScript Example

### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>Syncfusion Circular Gauge</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
</head>
<body>
    <div id="gauge"></div>

    <script src="index.js"></script>
</body>
</html>
```

### JavaScript

```javascript
var gauge = new ej.circulargauge.CircularGauge({
    width: '100%',
    height: '500px',

    title: 'System Performance',

    titleStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: 'Bold',
        size: '18px',
        color: '#333333'
    },

    axes: [{
        minimum: 0,
        maximum: 100,
        startAngle: 230,
        endAngle: 130,
        radius: '90%',

        lineStyle: {
            width: 2,
            color: '#666666'
        },

        majorTicks: {
            interval: 20,
            width: 2,
            height: 10,
            color: '#333333',
            position: 'Inside'
        },

        minorTicks: {
            interval: 5,
            width: 1,
            height: 5,
            color: '#666666',
            position: 'Inside'
        },

        labelStyle: {
            position: 'Inside',

            font: {
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: 'Normal',
                size: '12px',
                color: '#333333'
            }
        },

        ranges: [
            {
                start: 0,
                end: 50,
                radius: '90%',
                startWidth: 10,
                endWidth: 10,
                color: '#107c10'
            },
            {
                start: 50,
                end: 80,
                radius: '90%',
                startWidth: 10,
                endWidth: 10,
                color: '#ffb900'
            },
            {
                start: 80,
                end: 100,
                radius: '90%',
                startWidth: 10,
                endWidth: 10,
                color: '#d13438'
            }
        ],

        pointers: [{
            value: 75,
            type: 'Needle',
            radius: '75%',
            pointerWidth: 4,
            color: '#0066cc',

            cap: {
                radius: 8,
                color: '#0066cc',

                border: {
                    width: 1,
                    color: '#004578'
                }
            },

            needleTail: {
                length: '20%',
                color: '#0066cc'
            },

            animation: {
                enable: true,
                duration: 1000
            }
        }],

        annotations: [{
            content:
                '<div style="' +
                'font-family:Segoe UI;' +
                'font-size:20px;' +
                'font-weight:600;' +
                'color:#333333;' +
                '">' +
                '75%' +
                '</div>',
            angle: 90,
            radius: '40%',
            zIndex: '1'
        }]
    }]
});

gauge.appendTo('#gauge');
```

## Minimal Examples

### Minimal TypeScript

Required HTML:

```html
<div id="gauge"></div>
```

TypeScript:

```typescript
import {
    CircularGauge
} from '@syncfusion/ej2-circulargauge';

const gauge: CircularGauge = new CircularGauge({
    height: '400px',

    axes: [{
        minimum: 0,
        maximum: 100,

        pointers: [{
            value: 50,
            type: 'Needle'
        }]
    }]
});

gauge.appendTo('#gauge');
```

### Minimal JavaScript

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>Circular Gauge</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
</head>
<body>
    <div id="gauge"></div>

    <script>
        var gauge =
            new ej.circulargauge.CircularGauge({
                height: '400px',

                axes: [{
                    minimum: 0,
                    maximum: 100,

                    pointers: [{
                        value: 50,
                        type: 'Needle'
                    }]
                }]
            });

        gauge.appendTo('#gauge');
    </script>
</body>
</html>
```

## Running the Application

### TypeScript Application

Install dependencies:

```bash
npm install
```

Build the project:

```bash
npm run build
```

Start the development server according to the scripts defined in `package.json`.

Common command:

```bash
npm run start
```

Some projects use:

```bash
npm start
```

Use the command defined by the project's actual npm scripts.

The development-server URL and port depend on the Webpack or bundler configuration. Do not assume that every project uses port `8080`.

### JavaScript Application

Serve the application through a local HTTP server.

Using Python:

```bash
python -m http.server 8000
```

Using Node.js:

```bash
npx http-server
```

Open the address reported by the selected server.

A local server is preferred over directly opening the HTML file because browser security restrictions can affect scripts, modules, data loading, and local resources.

## Runtime Validation Checklist

```text
✅ @syncfusion/ej2-circulargauge is installed for TypeScript.
✅ CircularGauge is imported.
✅ Annotations is imported and injected only when annotations are used.
✅ The Syncfusion global script loads before JavaScript application code.
✅ The gauge host element exists.
✅ The appendTo selector matches the host element ID.
✅ The gauge has measurable width and height.
✅ At least one axis is configured.
✅ Axis minimum is less than axis maximum.
✅ Pointer values are within the intended axis range.
✅ Major tick interval is greater than zero.
✅ Minor tick interval is greater than zero.
✅ Tick intervals are appropriate for the axis range.
✅ Label text has sufficient contrast.
✅ Pointer color is visible against the gauge background.
✅ Range start and end values match the axis scale.
✅ Ranges do not unintentionally overlap.
✅ Annotation HTML is valid.
✅ No editor-generated anchor tags exist inside code.
✅ No encoded HTML replaces executable elements.
✅ Local script files use compatible EJ2 versions.
✅ TypeScript and JavaScript examples produce equivalent behavior.
```

## Combined Mistakes and Future References

### Unnecessary Annotation Injection

Incorrect for a basic gauge:

```typescript
import {
    CircularGauge,
    Annotations
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Annotations);
```

when no annotations are configured.

Preferred:

```typescript
import {
    CircularGauge
} from '@syncfusion/ej2-circulargauge';
```

Inject `Annotations` only when the gauge contains:

```typescript
annotations: [{
    content: '...'
}]
```

### Missing Annotation Injection

Incorrect:

```typescript
import {
    CircularGauge
} from '@syncfusion/ej2-circulargauge';

const gauge = new CircularGauge({
    axes: [{
        annotations: [{
            content: '50%'
        }]
    }]
});
```

Correct:

```typescript
import {
    CircularGauge,
    Annotations
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Annotations);
```

Annotations require module injection.

### Constructor Selector Pattern

Avoid relying on:

```typescript
const gauge = new CircularGauge({
    height: '400px'
}, '#gauge');
```

Preferred:

```typescript
const gauge: CircularGauge = new CircularGauge({
    height: '400px'
});

gauge.appendTo('#gauge');
```

This clearly separates instance creation from DOM attachment.

### Missing Host Element

Incorrect TypeScript:

```typescript
gauge.appendTo('#gauge');
```

when the HTML page does not contain:

```html
<div id="gauge"></div>
```

The host must exist before `appendTo` runs.

### Mismatched Element ID

Incorrect:

```html
<div id="circularGauge"></div>
```

```typescript
gauge.appendTo('#gauge');
```

Correct:

```html
<div id="gauge"></div>
```

```typescript
gauge.appendTo('#gauge');
```

### Encoded HTML

Incorrect executable HTML:

```html
<div id="gauge"></div>
```

Correct:

```html
<div id="gauge"></div>
```

HTML entities are appropriate when displaying source as prose, not inside a runnable HTML file.

### Rich-Text Editor Links

Incorrect:

```html
...</a>"></script>
```

Correct:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

Do not insert anchor elements into script URLs, commands, imports, or executable code.

### Incorrect Script Order

Incorrect:

```html
<script src="index.js"></script>
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

Correct:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
<script src="index.js"></script>
```

The EJ2 script must create the global `ej` namespace before the application accesses it.

### Assuming One Development Port

Do not state that every TypeScript application runs at:

```text
http://localhost:8080
```

The actual port is controlled by the project's development-server configuration.

Similarly, Live Server does not always use one fixed port.

### Invalid Pointer Value

Avoid:

```typescript
axes: [{
    minimum: 0,
    maximum: 100,

    pointers: [{
        value: 150
    }]
}]
```

Preferred:

```typescript
axes: [{
    minimum: 0,
    maximum: 100,

    pointers: [{
        value: 75
    }]
}]
```

Validate out-of-range handling if the business scenario intentionally allows values beyond the displayed axis range.

### Invalid Axis Range

Incorrect:

```typescript
axes: [{
    minimum: 100,
    maximum: 0
}]
```

Preferred:

```typescript
axes: [{
    minimum: 0,
    maximum: 100
}]
```

### Invalid Tick Interval

Incorrect:

```typescript
majorTicks: {
    interval: 0
}
```

Correct:

```typescript
majorTicks: {
    interval: 20
}
```

Tick intervals should be positive and suitable for the configured scale.

### Missing Gauge Dimensions

A gauge may not render as expected when its container has no measurable size.

Use:

```typescript
const gauge: CircularGauge = new CircularGauge({
    width: '100%',
    height: '450px'
});
```

Also ensure the parent element has measurable width.

### Confusing Package Products

Do not mix older Essential JavaScript 1 examples such as:

```javascript
$('#gauge').ejCircularGauge();
```

with Essential JS 2 code.

The EJ2 global JavaScript constructor is:

```javascript
new ej.circulargauge.CircularGauge({
    // Configuration
});
```

### Incomplete Examples

Avoid returning only:

```typescript
pointers: [{
    value: 50
}]
```

when a complete implementation is required.

A support-ready example should include:

```text
Import
Feature injection when required
Gauge configuration
Axis configuration
Pointer configuration
appendTo call
HTML host element
```