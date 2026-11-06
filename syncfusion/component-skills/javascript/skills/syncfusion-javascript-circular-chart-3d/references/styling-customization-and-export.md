# Styling, Customization & Export

- #3d-effects
  - #tilt
  - #rotation
  - #depth
  - #interactive-rotation
- #themes
- #color-customization
  - #series-palette
  - #point-color-mapping
  - #background-and-border
- #rtl-support
- #animations
- #export-functionality
  - #required-export-module
  - #image-export
  - #pdf-export
  - #export-events
- #print
  - #print-events
- #complete-typescript-example
- #complete-javascript-example
- #runtime-validation-checklist
- #combined-mistakes-and-future-references

## 3D Effects

### Purpose

The 3D Circular Chart provides `tilt`, `rotation`, and `depth` properties to control its three-dimensional appearance.

Each property has a separate responsibility:

```text
tilt     -> Controls the vertical viewing angle.
rotation -> Rotates the chart around its vertical axis.
depth    -> Controls the thickness of the 3D chart.
```

These properties change only the chart presentation. They do not modify the data source or the value represented by each segment.

### Required Series Module

The chart requires `PieSeries3D` to render its circular series.

```typescript
import {
    CircularChart3D,
    PieSeries3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(PieSeries3D);
```

### Tilt

Use the chart-level `tilt` property to control the vertical viewing angle.

```typescript
tilt: -45
```

Example values:

```text
-45 -> Strong tilted perspective.
-30 -> Moderate tilted perspective.
-15 -> Shallow tilted perspective.
0   -> Straight viewing angle.
15  -> Shallow reverse perspective.
30  -> Moderate reverse perspective.
45  -> Strong reverse perspective.
```

A moderate tilt usually provides a clear 3D effect without significantly reducing segment readability.

#### Complete TypeScript Tilt Example

```typescript
import {
    CircularChart3D,
    PieSeries3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(PieSeries3D);

interface SalesData {
    category: string;
    value: number;
}

const data: SalesData[] = [
    { category: 'Hardware', value: 35 },
    { category: 'Software', value: 45 },
    { category: 'Services', value: 20 }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Sales Distribution',
    tilt: -45,
    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value'
    }]
});

chart.appendTo('#element');
```

#### Complete JavaScript Tilt Example

```javascript
var data = [
    { category: 'Hardware', value: 35 },
    { category: 'Software', value: 45 },
    { category: 'Services', value: 20 }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Sales Distribution',
    tilt: -45,
    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value'
    }]
});

chart.appendTo('#element');
```

### Rotation

Use the chart-level `rotation` property to rotate the chart around its vertical axis.

```typescript
rotation: 90
```

Common values:

```text
0   -> Default starting orientation.
90  -> Quarter rotation.
180 -> Half rotation.
270 -> Three-quarter rotation.
360 -> Full rotation, visually equivalent to the starting orientation.
```

Rotation changes which segments appear at the front of the chart. It does not change segment values or their proportional size.

Use rotation when:

- An important segment should appear closer to the front.
- Data labels overlap at the initial orientation.
- The chart must match a specific visual arrangement.
- The initial segment order needs a more readable presentation.

#### Complete TypeScript Rotation Example

```typescript
import {
    CircularChart3D,
    PieSeries3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(PieSeries3D);

interface BrowserData {
    browser: string;
    share: number;
}

const data: BrowserData[] = [
    { browser: 'Chrome', share: 62.92 },
    { browser: 'Firefox', share: 15.23 },
    { browser: 'Safari', share: 19.97 },
    { browser: 'Others', share: 2.88 }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Browser Market Share',
    tilt: -45,
    rotation: 90,
    series: [{
        dataSource: data,
        xName: 'browser',
        yName: 'share'
    }]
});

chart.appendTo('#element');
```

#### Complete JavaScript Rotation Example

```javascript
var data = [
    { browser: 'Chrome', share: 62.92 },
    { browser: 'Firefox', share: 15.23 },
    { browser: 'Safari', share: 19.97 },
    { browser: 'Others', share: 2.88 }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Browser Market Share',
    tilt: -45,
    rotation: 90,
    series: [{
        dataSource: data,
        xName: 'browser',
        yName: 'share'
    }]
});

chart.appendTo('#element');
```

### Depth

Use the chart-level `depth` property to control the thickness of the three-dimensional chart.

```typescript
depth: 50
```

A larger value creates a thicker 3D extrusion. A smaller value creates a shallower appearance.

Use moderate depth values because excessive depth can:

- Hide smaller segments behind larger segments.
- Reduce data-label readability.
- Increase visual distortion.
- Make tooltip targeting more difficult.
- Consume more vertical rendering space.

#### Complete 3D Configuration

```typescript
const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '450px',
    tilt: -45,
    rotation: 30,
    depth: 50,
    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value'
    }]
});

chart.appendTo('#element');
```

The properties produce the following behavior:

```text
tilt: -45    -> Applies a strong vertical viewing angle.
rotation: 30 -> Rotates the chart by 30 degrees.
depth: 50    -> Applies a moderate 3D thickness.
```

### Interactive Rotation

Set `enableRotation` to `true` when users should be able to rotate the chart through pointer interaction.

```typescript
enableRotation: true
```

Complete TypeScript example:

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartDataLabel3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D
);

interface BrowserData {
    browser: string;
    share: number;
}

const data: BrowserData[] = [
    { browser: 'Chrome', share: 62.92 },
    { browser: 'Firefox', share: 15.23 },
    { browser: 'Safari', share: 19.97 },
    { browser: 'Others', share: 2.88 }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'Interactive Browser Market Share',
    tilt: -45,
    rotation: 0,
    depth: 50,
    enableRotation: true,
    series: [{
        dataSource: data,
        xName: 'browser',
        yName: 'share',
        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'browser'
        }
    }]
});

chart.appendTo('#element');
```

Complete JavaScript example:

```javascript
var data = [
    { browser: 'Chrome', share: 62.92 },
    { browser: 'Firefox', share: 15.23 },
    { browser: 'Safari', share: 19.97 },
    { browser: 'Others', share: 2.88 }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'Interactive Browser Market Share',
    tilt: -45,
    rotation: 0,
    depth: 50,
    enableRotation: true,
    series: [{
        dataSource: data,
        xName: 'browser',
        yName: 'share',
        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'browser'
        }
    }]
});

chart.appendTo('#element');
```

Use interactive rotation only when it adds value. Disable it when pointer movement should be reserved for tooltip or selection interactions.

## Themes

### Purpose

Use the chart-level `theme` property to apply a built-in visual theme.

```typescript
theme: 'Material'
```

A theme can affect:

- Default segment colors.
- Title and subtitle colors.
- Legend appearance.
- Tooltip appearance.
- Background-aware contrast.
- Selection and highlight colors.

### Common Themes

Common theme families include:

```text
Material
MaterialDark
Material3
Material3Dark
Bootstrap
Bootstrap4
Bootstrap5
Bootstrap5Dark
Fabric
FabricDark
Fluent
FluentDark
Fluent2
Fluent2Dark
HighContrast
Tailwind
TailwindDark
Tailwind3
Tailwind3Dark
```

Use a theme value supported by the installed Essential JS 2 version. New theme families can be introduced in later releases.

### TypeScript Theme Example

```typescript
import {
    CircularChart3D,
    PieSeries3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(PieSeries3D);

interface SalesData {
    category: string;
    value: number;
}

const data: SalesData[] = [
    { category: 'Hardware', value: 35 },
    { category: 'Software', value: 45 },
    { category: 'Services', value: 20 }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Sales Distribution',
    theme: 'Material',
    tilt: -45,
    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value'
    }]
});

chart.appendTo('#element');
```

### JavaScript Theme Example

```javascript
var data = [
    { category: 'Hardware', value: 35 },
    { category: 'Software', value: 45 },
    { category: 'Services', value: 20 }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Sales Distribution',
    theme: 'Material',
    tilt: -45,
    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value'
    }]
});

chart.appendTo('#element');
```

### Theme Selection Guidance

```text
Material or Material3 -> General modern web applications.
Bootstrap              -> Bootstrap-based applications.
Fabric                 -> Applications using the older Fabric design language.
Fluent or Fluent2      -> Microsoft-aligned application experiences.
HighContrast           -> High-contrast presentation requirements.
Tailwind               -> Tailwind-oriented application designs.
Dark variants          -> Applications with dark backgrounds.
```

A theme supplies default styling. Explicit chart properties can override parts of the selected theme.

## Color Customization

### Purpose

The 3D Circular Chart supports two primary point-color strategies:

```text
Series palette     -> Colors are supplied as an ordered array.
Point color mapping -> Every data object supplies its own color.
```

Use a palette when category order is stable.

Use point color mapping when colors are driven by data or business rules.

### Series Palette

Use the series-level `palettes` property.

```typescript
series: [{
    dataSource: data,
    xName: 'category',
    yName: 'value',
    palettes: [
        '#ff6b6b',
        '#4ecdc4',
        '#45b7d1',
        '#ffa502'
    ]
}]
```

The first point uses the first color, the second point uses the second color, and so on.

#### Complete TypeScript Palette Example

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartLegend3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartLegend3D
);

interface BrowserData {
    browser: string;
    share: number;
}

const data: BrowserData[] = [
    { browser: 'Chrome', share: 62.92 },
    { browser: 'Firefox', share: 15.23 },
    { browser: 'Safari', share: 19.97 },
    { browser: 'Others', share: 2.88 }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Browser Market Share',
    tilt: -45,
    legendSettings: {
        visible: true,
        position: 'Right'
    },
    series: [{
        dataSource: data,
        xName: 'browser',
        yName: 'share',
        palettes: [
            '#ff6b6b',
            '#4ecdc4',
            '#45b7d1',
            '#ffa502'
        ]
    }]
});

chart.appendTo('#element');
```

#### Complete JavaScript Palette Example

```javascript
var data = [
    { browser: 'Chrome', share: 62.92 },
    { browser: 'Firefox', share: 15.23 },
    { browser: 'Safari', share: 19.97 },
    { browser: 'Others', share: 2.88 }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Browser Market Share',
    tilt: -45,
    legendSettings: {
        visible: true,
        position: 'Right'
    },
    series: [{
        dataSource: data,
        xName: 'browser',
        yName: 'share',
        palettes: [
            '#ff6b6b',
            '#4ecdc4',
            '#45b7d1',
            '#ffa502'
        ]
    }]
});

chart.appendTo('#element');
```

### Point Color Mapping

Add a color field to the data source.

```typescript
const data = [
    { browser: 'Chrome', share: 62.92, color: '#ff6b6b' },
    { browser: 'Firefox', share: 15.23, color: '#4ecdc4' },
    { browser: 'Safari', share: 19.97, color: '#45b7d1' },
    { browser: 'Others', share: 2.88, color: '#ffa502' }
];
```

Map the color field through `pointColorMapping`.

```typescript
series: [{
    dataSource: data,
    xName: 'browser',
    yName: 'share',
    pointColorMapping: 'color'
}]
```

#### Complete TypeScript Point Color Example

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartLegend3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartLegend3D
);

interface BrowserData {
    browser: string;
    share: number;
    color: string;
}

const data: BrowserData[] = [
    { browser: 'Chrome', share: 62.92, color: '#ff6b6b' },
    { browser: 'Firefox', share: 15.23, color: '#4ecdc4' },
    { browser: 'Safari', share: 19.97, color: '#45b7d1' },
    { browser: 'Others', share: 2.88, color: '#ffa502' }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Browser Market Share',
    tilt: -45,
    legendSettings: {
        visible: true,
        position: 'Right'
    },
    series: [{
        dataSource: data,
        xName: 'browser',
        yName: 'share',
        pointColorMapping: 'color'
    }]
});

chart.appendTo('#element');
```

#### Complete JavaScript Point Color Example

```javascript
var data = [
    { browser: 'Chrome', share: 62.92, color: '#ff6b6b' },
    { browser: 'Firefox', share: 15.23, color: '#4ecdc4' },
    { browser: 'Safari', share: 19.97, color: '#45b7d1' },
    { browser: 'Others', share: 2.88, color: '#ffa502' }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Browser Market Share',
    tilt: -45,
    legendSettings: {
        visible: true,
        position: 'Right'
    },
    series: [{
        dataSource: data,
        xName: 'browser',
        yName: 'share',
        pointColorMapping: 'color'
    }]
});

chart.appendTo('#element');
```

### Background and Border

Use the chart-level `background` property to set the chart background.

```typescript
background: '#ffffff'
```

Use the chart-level `border` property to style the chart boundary.

```typescript
border: {
    width: 1,
    color: '#dddddd'
}
```

Use `backgroundImage` when a validated image must appear behind the chart.

```typescript
backgroundImage: 'images/chart-background.png'
```

Complete configuration:

```typescript
const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '450px',
    background: '#ffffff',
    border: {
        width: 1,
        color: '#dddddd'
    },
    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value'
    }]
});

chart.appendTo('#element');
```

### CSS Container Styling

Use CSS to style the host element and surrounding layout.

```html
<div class="chart-wrapper">
    <div id="element"></div>
</div>
```

```css
.chart-wrapper {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 16px;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 8px;
    box-sizing: border-box;
}
```

Do not use an undocumented `customSeries` property to assign a CSS class to the series.

For segment colors, use:

```text
series.palettes
series.pointColorMapping
pointRender event
```

Use CSS primarily for the chart container, external controls, and application layout.

## RTL Support

### Purpose

Set `enableRtl` to `true` for right-to-left application layouts.

```typescript
enableRtl: true
```

RTL support is useful for languages such as Arabic and Hebrew.

It can affect the alignment and ordering of supporting chart content, including legends and text.

### Complete TypeScript RTL Example

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D,
    CircularChartTooltip3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D,
    CircularChartTooltip3D
);

interface SalesData {
    category: string;
    value: number;
}

const data: SalesData[] = [
    { category: 'الفئة الأولى', value: 35 },
    { category: 'الفئة الثانية', value: 30 },
    { category: 'الفئة الثالثة', value: 20 },
    { category: 'الفئة الرابعة', value: 15 }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'توزيع المبيعات',
    enableRtl: true,
    tilt: -45,

    legendSettings: {
        visible: true,
        position: 'Right'
    },

    tooltip: {
        enable: true,
        format: '${point.x}: <b>${point.y}</b>'
    },

    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value',
        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'category'
        }
    }]
});

chart.appendTo('#element');
```

### Complete JavaScript RTL Example

```javascript
var data = [
    { category: 'الفئة الأولى', value: 35 },
    { category: 'الفئة الثانية', value: 30 },
    { category: 'الفئة الثالثة', value: 20 },
    { category: 'الفئة الرابعة', value: 15 }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'توزيع المبيعات',
    enableRtl: true,
    tilt: -45,

    legendSettings: {
        visible: true,
        position: 'Right'
    },

    tooltip: {
        enable: true,
        format: '${point.x}: <b>${point.y}</b>'
    },

    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value',
        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'category'
        }
    }]
});

chart.appendTo('#element');
```

When implementing RTL:

- Use translated chart titles.
- Use translated category names.
- Verify legend alignment visually.
- Verify tooltip text direction.
- Verify data-label placement.
- Ensure the page or container also uses the appropriate text direction.

## Animations

### Purpose

The chart-level `enableAnimation` property controls whether the chart uses animation.

```typescript
enableAnimation: true
```

The series-level `animation` object controls animation details.

```typescript
animation: {
    enable: true,
    duration: 1000,
    delay: 0
}
```

The animation properties have the following responsibilities:

```text
enable   -> Enables or disables series animation.
duration -> Defines animation duration in milliseconds.
delay    -> Delays animation start in milliseconds.
```

The animation API defaults include an enabled state, a duration of 1000 milliseconds, and a delay of 0 milliseconds.

### Complete TypeScript Animation Example

```typescript
import {
    CircularChart3D,
    PieSeries3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(PieSeries3D);

interface SalesData {
    category: string;
    value: number;
}

const data: SalesData[] = [
    { category: 'Hardware', value: 35 },
    { category: 'Software', value: 45 },
    { category: 'Services', value: 20 }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Animated Sales Distribution',
    enableAnimation: true,
    tilt: -45,
    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value',
        animation: {
            enable: true,
            duration: 1000,
            delay: 0
        }
    }]
});

chart.appendTo('#element');
```

### Complete JavaScript Animation Example

```javascript
var data = [
    { category: 'Hardware', value: 35 },
    { category: 'Software', value: 45 },
    { category: 'Services', value: 20 }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Animated Sales Distribution',
    enableAnimation: true,
    tilt: -45,
    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value',
        animation: {
            enable: true,
            duration: 1000,
            delay: 0
        }
    }]
});

chart.appendTo('#element');
```

### Disable Animation

Disable chart animation:

```typescript
enableAnimation: false
```

Disable animation on a specific series:

```typescript
series: [{
    dataSource: data,
    xName: 'category',
    yName: 'value',
    animation: {
        enable: false
    }
}]
```

Disable or shorten animations when:

- The chart contains many segments.
- Data updates frequently.
- The application prioritizes immediate rendering.
- A reduced-motion experience is required.
- Automated visual testing requires stable output.

## Export Functionality

### Purpose

The 3D Circular Chart can export rendered content to image formats and PDF.

Image exports use the 3D Circular Chart export module. The supported image formats are PNG, JPEG, and SVG. PDF output is handled through the module's `pdfExport` method.

### Required Export Module

Import and inject `CircularChartExport3D`.

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartExport3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartExport3D
);
```

Enable export support on the chart:

```typescript
enableExport: true
```

The image export method is available through:

```typescript
chart.circularChartExport3DModule.export(
    'PNG',
    'browser-market-share'
);
```

The PDF export method is available through:

```typescript
chart.circularChartExport3DModule.pdfExport(
    'browser-market-share'
);
```

Do not use the standard two-dimensional Chart `ImageExport` or `PdfExport` modules as the primary module pattern for `CircularChart3D`.

### Image Export

Supported image formats:

```text
PNG
JPEG
SVG
```

The export method accepts:

```text
type     -> Export format.
fileName -> Output file name.
```

The export API exports PNG, JPEG, or SVG through `CircularChartExport3D`.

#### Required HTML

```html
<button id="exportPngButton" type="button">Export PNG</button>
<button id="exportJpegButton" type="button">Export JPEG</button>
<button id="exportSvgButton" type="button">Export SVG</button>
<div id="element"></div>
```

#### Complete TypeScript Image Export Example

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D,
    CircularChartExport3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D,
    CircularChartExport3D
);

interface BrowserData {
    browser: string;
    share: number;
}

const data: BrowserData[] = [
    { browser: 'Chrome', share: 62.92 },
    { browser: 'Firefox', share: 15.23 },
    { browser: 'Safari', share: 19.97 },
    { browser: 'Others', share: 2.88 }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'Browser Market Share',
    enableExport: true,
    tilt: -45,

    legendSettings: {
        visible: true,
        position: 'Right'
    },

    series: [{
        dataSource: data,
        xName: 'browser',
        yName: 'share',
        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'browser'
        }
    }]
});

chart.appendTo('#element');

const exportPngButton: HTMLElement | null =
    document.getElementById('exportPngButton');

const exportJpegButton: HTMLElement | null =
    document.getElementById('exportJpegButton');

const exportSvgButton: HTMLElement | null =
    document.getElementById('exportSvgButton');

if (exportPngButton) {
    exportPngButton.addEventListener('click', (): void => {
        chart.circularChartExport3DModule.export(
            'PNG',
            'browser-market-share'
        );
    });
}

if (exportJpegButton) {
    exportJpegButton.addEventListener('click', (): void => {
        chart.circularChartExport3DModule.export(
            'JPEG',
            'browser-market-share'
        );
    });
}

if (exportSvgButton) {
    exportSvgButton.addEventListener('click', (): void => {
        chart.circularChartExport3DModule.export(
            'SVG',
            'browser-market-share'
        );
    });
}
```

#### Complete JavaScript Image Export Example

```javascript
var data = [
    { browser: 'Chrome', share: 62.92 },
    { browser: 'Firefox', share: 15.23 },
    { browser: 'Safari', share: 19.97 },
    { browser: 'Others', share: 2.88 }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'Browser Market Share',
    enableExport: true,
    tilt: -45,

    legendSettings: {
        visible: true,
        position: 'Right'
    },

    series: [{
        dataSource: data,
        xName: 'browser',
        yName: 'share',
        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'browser'
        }
    }]
});

chart.appendTo('#element');

var exportPngButton =
    document.getElementById('exportPngButton');

var exportJpegButton =
    document.getElementById('exportJpegButton');

var exportSvgButton =
    document.getElementById('exportSvgButton');

if (exportPngButton) {
    exportPngButton.addEventListener('click', function () {
        chart.circularChartExport3DModule.export(
            'PNG',
            'browser-market-share'
        );
    });
}

if (exportJpegButton) {
    exportJpegButton.addEventListener('click', function () {
        chart.circularChartExport3DModule.export(
            'JPEG',
            'browser-market-share'
        );
    });
}

if (exportSvgButton) {
    exportSvgButton.addEventListener('click', function () {
        chart.circularChartExport3DModule.export(
            'SVG',
            'browser-market-share'
        );
    });
}
```

### Export Format Selection

Use each format for the following scenarios:

```text
PNG  -> Screenshots, documents, presentations, and raster output.
JPEG -> Smaller photographic-style raster files where transparency is unnecessary.
SVG  -> Scalable web graphics and resolution-independent output.
PDF  -> Reports, sharing, printing, and paginated documents.
```

Do not add the file extension manually unless the validated API usage requires it.

Preferred:

```typescript
chart.circularChartExport3DModule.export(
    'PNG',
    'browser-market-share'
);
```

### PDF Export

Use `pdfExport` for PDF output.

The PDF export method accepts a file name and supports optional settings such as orientation, controls, width, height, header, footer, and multiple-page export.

#### Required HTML

```html
<button id="exportPdfButton" type="button">Export PDF</button>
<div id="element"></div>
```

#### Complete TypeScript PDF Export Example

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartLegend3D,
    CircularChartExport3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartLegend3D,
    CircularChartExport3D
);

interface SalesData {
    category: string;
    value: number;
}

const data: SalesData[] = [
    { category: 'Hardware', value: 35 },
    { category: 'Software', value: 45 },
    { category: 'Services', value: 20 }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'Sales Distribution',
    enableExport: true,
    tilt: -45,
    legendSettings: {
        visible: true,
        position: 'Right'
    },
    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value'
    }]
});

chart.appendTo('#element');

const exportPdfButton: HTMLElement | null =
    document.getElementById('exportPdfButton');

if (exportPdfButton) {
    exportPdfButton.addEventListener('click', (): void => {
        chart.circularChartExport3DModule.pdfExport(
            'sales-distribution'
        );
    });
}
```

#### Complete JavaScript PDF Export Example

```javascript
var data = [
    { category: 'Hardware', value: 35 },
    { category: 'Software', value: 45 },
    { category: 'Services', value: 20 }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'Sales Distribution',
    enableExport: true,
    tilt: -45,
    legendSettings: {
        visible: true,
        position: 'Right'
    },
    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value'
    }]
});

chart.appendTo('#element');

var exportPdfButton =
    document.getElementById('exportPdfButton');

if (exportPdfButton) {
    exportPdfButton.addEventListener('click', function () {
        chart.circularChartExport3DModule.pdfExport(
            'sales-distribution'
        );
    });
}
```

### Export Events

The chart provides export lifecycle events:

```text
beforeExport -> Runs before export begins.
afterExport  -> Runs after export processing.
```

Use `beforeExport` to:

- Validate the requested export.
- Modify settings before export.
- Track export initiation.
- Cancel export when application rules require it.

Use `afterExport` to:

- Record successful export activity.
- Update application state.
- Display a completion message.
- Run post-export cleanup.

## Print

### Purpose

Use the chart's `print()` method to open the browser print workflow for the rendered chart.

The rendered 3D Circular Chart can be printed through its public `print` method.

The simplest call is:

```typescript
chart.print();
```

The method can also accept chart element IDs when a specific element collection must be printed.

Do not pass a width-and-height configuration object directly to `print()`. Print page size, margins, and orientation are normally controlled through browser print settings and print CSS.

### Required HTML

```html
<button id="printButton" type="button">Print Chart</button>
<div id="element"></div>
```

### Complete TypeScript Print Example

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D
);

interface BrowserData {
    browser: string;
    share: number;
}

const data: BrowserData[] = [
    { browser: 'Chrome', share: 62.92 },
    { browser: 'Firefox', share: 15.23 },
    { browser: 'Safari', share: 19.97 },
    { browser: 'Others', share: 2.88 }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'Browser Market Share',
    tilt: -45,

    legendSettings: {
        visible: true,
        position: 'Right'
    },

    series: [{
        dataSource: data,
        xName: 'browser',
        yName: 'share',
        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'browser'
        }
    }]
});

chart.appendTo('#element');

const printButton: HTMLElement | null =
    document.getElementById('printButton');

if (printButton) {
    printButton.addEventListener('click', (): void => {
        chart.print();
    });
}
```

### Complete JavaScript Print Example

```javascript
var data = [
    { browser: 'Chrome', share: 62.92 },
    { browser: 'Firefox', share: 15.23 },
    { browser: 'Safari', share: 19.97 },
    { browser: 'Others', share: 2.88 }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'Browser Market Share',
    tilt: -45,

    legendSettings: {
        visible: true,
        position: 'Right'
    },

    series: [{
        dataSource: data,
        xName: 'browser',
        yName: 'share',
        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'browser'
        }
    }]
});

chart.appendTo('#element');

var printButton = document.getElementById('printButton');

if (printButton) {
    printButton.addEventListener('click', function () {
        chart.print();
    });
}
```

### Print CSS

Use print CSS to hide application controls and optimize the chart container.

```css
@media print {
    .chart-actions {
        display: none;
    }

    .chart-wrapper {
        width: 100%;
        max-width: none;
        border: 0;
        padding: 0;
    }
}
```

Example HTML:

```html
<div class="chart-actions">
    <button id="printButton" type="button">Print Chart</button>
</div>

<div class="chart-wrapper">
    <div id="element"></div>
</div>
```

### Print Events

Use `beforePrint` to customize or validate content before printing.

Common scenarios:

- Hide interactive-only content.
- Temporarily update title text.
- Record print activity.
- Cancel printing when application rules require it.
- Apply print-specific state.

## Complete TypeScript Example

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
    <title>3D Circular Chart Styling and Export</title>
</head>
<body>
    <div class="chart-actions">
        <button id="exportPngButton" type="button">
            Export PNG
        </button>

        <button id="exportSvgButton" type="button">
            Export SVG
        </button>

        <button id="exportPdfButton" type="button">
            Export PDF
        </button>

        <button id="printButton" type="button">
            Print Chart
        </button>
    </div>

    <div class="chart-wrapper">
        <div id="element"></div>
    </div>
</body>
</html>
```

### CSS

```css
.chart-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
}

.chart-actions button {
    padding: 8px 14px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    background: #ffffff;
    cursor: pointer;
}

.chart-wrapper {
    width: 100%;
    max-width: 950px;
    margin: 0 auto;
    padding: 16px;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 8px;
    box-sizing: border-box;
}

@media print {
    .chart-actions {
        display: none;
    }

    .chart-wrapper {
        max-width: none;
        padding: 0;
        border: 0;
    }
}
```

### TypeScript

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D,
    CircularChartTooltip3D,
    CircularChartExport3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D,
    CircularChartTooltip3D,
    CircularChartExport3D
);

interface BrowserData {
    browser: string;
    share: number;
    color: string;
}

const data: BrowserData[] = [
    {
        browser: 'Chrome',
        share: 62.92,
        color: '#ff6b6b'
    },
    {
        browser: 'Firefox',
        share: 15.23,
        color: '#4ecdc4'
    },
    {
        browser: 'Safari',
        share: 19.97,
        color: '#45b7d1'
    },
    {
        browser: 'Others',
        share: 2.88,
        color: '#ffa502'
    }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '550px',
    title: 'Browser Market Share',
    subTitle: 'Styled 3D Circular Chart',
    theme: 'Material',

    background: '#ffffff',

    border: {
        width: 1,
        color: '#dddddd'
    },

    tilt: -45,
    rotation: 0,
    depth: 50,
    enableRotation: true,
    enableAnimation: true,
    enableRtl: false,
    enableExport: true,

    titleStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: 'Bold',
        size: '18px',
        color: '#333333',
        textAlignment: 'Center'
    },

    subTitleStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: 'Normal',
        size: '14px',
        color: '#666666',
        textAlignment: 'Center'
    },

    legendSettings: {
        visible: true,
        position: 'Right',
        alignment: 'Center',
        background: '#ffffff',
        border: {
            width: 1,
            color: '#dddddd'
        },
        textStyle: {
            fontFamily: 'Segoe UI',
            fontStyle: 'Normal',
            fontWeight: 'Normal',
            size: '12px',
            color: '#333333'
        }
    },

    tooltip: {
        enable: true,
        header: 'Browser Statistics',
        format: '${point.x}: <b>${point.y:n2}%</b>',
        fill: '#252423',
        opacity: 0.9,
        textStyle: {
            fontFamily: 'Segoe UI',
            fontStyle: 'Normal',
            fontWeight: 'Normal',
            size: '12px',
            color: '#ffffff'
        }
    },

    series: [{
        name: 'Market Share',
        dataSource: data,
        xName: 'browser',
        yName: 'share',
        pointColorMapping: 'color',
        radius: '80%',
        innerRadius: '0%',
        animation: {
            enable: true,
            duration: 1000,
            delay: 0
        },
        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'browser',
            connectorStyle: {
                length: '30px'
            },
            font: {
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: '500',
                size: '12px',
                color: '#333333'
            }
        }
    }]
});

chart.appendTo('#element');

const exportPngButton: HTMLElement | null =
    document.getElementById('exportPngButton');

const exportSvgButton: HTMLElement | null =
    document.getElementById('exportSvgButton');

const exportPdfButton: HTMLElement | null =
    document.getElementById('exportPdfButton');

const printButton: HTMLElement | null =
    document.getElementById('printButton');

if (exportPngButton) {
    exportPngButton.addEventListener('click', (): void => {
        chart.circularChartExport3DModule.export(
            'PNG',
            'browser-market-share'
        );
    });
}

if (exportSvgButton) {
    exportSvgButton.addEventListener('click', (): void => {
        chart.circularChartExport3DModule.export(
            'SVG',
            'browser-market-share'
        );
    });
}

if (exportPdfButton) {
    exportPdfButton.addEventListener('click', (): void => {
        chart.circularChartExport3DModule.pdfExport(
            'browser-market-share'
        );
    });
}

if (printButton) {
    printButton.addEventListener('click', (): void => {
        chart.print();
    });
}
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
    <title>3D Circular Chart Styling and Export</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js"></script>
    <script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-data/dist/global/ej2-data.min.js"></script>
    <script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-svg-base/dist/global/ej2-svg-base.min.js"></script>
    <script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-charts/dist/global/ej2-charts.min.js"></script>

    <style>
        .chart-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 16px;
        }

        .chart-actions button {
            padding: 8px 14px;
            border: 1px solid #cccccc;
            border-radius: 4px;
            background: #ffffff;
            cursor: pointer;
        }

        .chart-wrapper {
            width: 100%;
            max-width: 950px;
            margin: 0 auto;
            padding: 16px;
            background: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            box-sizing: border-box;
        }

        @media print {
            .chart-actions {
                display: none;
            }

            .chart-wrapper {
                max-width: none;
                padding: 0;
                border: 0;
            }
        }
    </style>
</head>
<body>
    <div class="chart-actions">
        <button id="exportPngButton" type="button">
            Export PNG
        </button>

        <button id="exportSvgButton" type="button">
            Export SVG
        </button>

        <button id="exportPdfButton" type="button">
            Export PDF
        </button>

        <button id="printButton" type="button">
            Print Chart
        </button>
    </div>

    <div class="chart-wrapper">
        <div id="element"></div>
    </div>

    <script src="index.js"></script>
</body>
</html>
```

### JavaScript

```javascript
var data = [
    {
        browser: 'Chrome',
        share: 62.92,
        color: '#ff6b6b'
    },
    {
        browser: 'Firefox',
        share: 15.23,
        color: '#4ecdc4'
    },
    {
        browser: 'Safari',
        share: 19.97,
        color: '#45b7d1'
    },
    {
        browser: 'Others',
        share: 2.88,
        color: '#ffa502'
    }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '550px',
    title: 'Browser Market Share',
    subTitle: 'Styled 3D Circular Chart',
    theme: 'Material',

    background: '#ffffff',

    border: {
        width: 1,
        color: '#dddddd'
    },

    tilt: -45,
    rotation: 0,
    depth: 50,
    enableRotation: true,
    enableAnimation: true,
    enableRtl: false,
    enableExport: true,

    titleStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: 'Bold',
        size: '18px',
        color: '#333333',
        textAlignment: 'Center'
    },

    subTitleStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: 'Normal',
        size: '14px',
        color: '#666666',
        textAlignment: 'Center'
    },

    legendSettings: {
        visible: true,
        position: 'Right',
        alignment: 'Center',
        background: '#ffffff',
        border: {
            width: 1,
            color: '#dddddd'
        },
        textStyle: {
            fontFamily: 'Segoe UI',
            fontStyle: 'Normal',
            fontWeight: 'Normal',
            size: '12px',
            color: '#333333'
        }
    },

    tooltip: {
        enable: true,
        header: 'Browser Statistics',
        format: '${point.x}: <b>${point.y:n2}%</b>',
        fill: '#252423',
        opacity: 0.9,
        textStyle: {
            fontFamily: 'Segoe UI',
            fontStyle: 'Normal',
            fontWeight: 'Normal',
            size: '12px',
            color: '#ffffff'
        }
    },

    series: [{
        name: 'Market Share',
        dataSource: data,
        xName: 'browser',
        yName: 'share',
        pointColorMapping: 'color',
        radius: '80%',
        innerRadius: '0%',
        animation: {
            enable: true,
            duration: 1000,
            delay: 0
        },
        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'browser',
            connectorStyle: {
                length: '30px'
            },
            font: {
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: '500',
                size: '12px',
                color: '#333333'
            }
        }
    }]
});

chart.appendTo('#element');

var exportPngButton =
    document.getElementById('exportPngButton');

var exportSvgButton =
    document.getElementById('exportSvgButton');

var exportPdfButton =
    document.getElementById('exportPdfButton');

var printButton =
    document.getElementById('printButton');

if (exportPngButton) {
    exportPngButton.addEventListener('click', function () {
        chart.circularChartExport3DModule.export(
            'PNG',
            'browser-market-share'
        );
    });
}

if (exportSvgButton) {
    exportSvgButton.addEventListener('click', function () {
        chart.circularChartExport3DModule.export(
            'SVG',
            'browser-market-share'
        );
    });
}

if (exportPdfButton) {
    exportPdfButton.addEventListener('click', function () {
        chart.circularChartExport3DModule.pdfExport(
            'browser-market-share'
        );
    });
}

if (printButton) {
    printButton.addEventListener('click', function () {
        chart.print();
    });
}
```

## Runtime Validation Checklist

```text
✅ CircularChart3D is imported in TypeScript.
✅ PieSeries3D is imported and injected.
✅ CircularChartDataLabel3D is imported and injected when labels are visible.
✅ CircularChartLegend3D is imported and injected when legends are visible.
✅ CircularChartTooltip3D is imported and injected when tooltips are enabled.
✅ CircularChartExport3D is imported and injected when export is used.
✅ enableExport is true when export functionality is required.
✅ The export method is called through circularChartExport3DModule.
✅ PNG, JPEG, or SVG is passed to the image export method.
✅ pdfExport is used for PDF output.
✅ print() is called on the chart instance.
✅ The host element exists before appendTo is called.
✅ tilt, rotation, and depth use valid numeric values.
✅ enableRotation is enabled only when interactive rotation is required.
✅ The selected theme is supported by the installed EJ2 version.
✅ palettes is configured on the series, not as chart-level palette.
✅ pointColorMapping matches a color field in every data object.
✅ Animation duration is configured through series.animation.duration.
✅ RTL labels, legends, and tooltips have been visually tested.
✅ Print controls are hidden with print CSS when required.
✅ No rich-text editor markup exists inside executable code.
✅ TypeScript and JavaScript examples provide equivalent behavior.
```

## Combined Mistakes and Future References

### Incorrect Constructor Attachment

Avoid:

```typescript
const chart = new CircularChart3D({
    series: []
}, '#element');
```

Preferred:

```typescript
const chart = new CircularChart3D({
    series: []
});

chart.appendTo('#element');
```

### Incorrect Chart-Level Palette

Incorrect:

```typescript
const chart = new CircularChart3D({
    palette: [
        '#ff6b6b',
        '#4ecdc4'
    ]
});
```

Correct:

```typescript
const chart = new CircularChart3D({
    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value',
        palettes: [
            '#ff6b6b',
            '#4ecdc4'
        ]
    }]
});
```

### Incorrect CSS Series Property

Incorrect:

```typescript
series: [{
    customSeries: 'custom-pie-slice'
}]
```

Do not use an undocumented `customSeries` property.

Use:

```text
series.palettes
series.pointColorMapping
pointRender event
container CSS
```

### Incorrect Animation Duration

Incorrect:

```typescript
const chart = new CircularChart3D({
    enableAnimation: true,
    animationDuration: 1000
});
```

Correct:

```typescript
const chart = new CircularChart3D({
    enableAnimation: true,
    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value',
        animation: {
            enable: true,
            duration: 1000,
            delay: 0
        }
    }]
});
```

### Incorrect Export Modules

Incorrect primary pattern:

```typescript
import {
    ImageExport,
    PdfExport
} from '@syncfusion/ej2-charts';
```

Correct 3D Circular Chart pattern:

```typescript
import {
    CircularChartExport3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartExport3D
);
```

The 3D Circular Chart export module provides image export and PDF export behavior.

### Incorrect Image Export Call

Incorrect:

```typescript
chart.export(
    'PNG',
    'chart.png',
    'Export',
    false,
    true
);
```

Correct:

```typescript
chart.circularChartExport3DModule.export(
    'PNG',
    'chart'
);
```

The image export method accepts the export type and desired file name for PNG, JPEG, or SVG output.

### Incorrect PDF Export Call

Avoid treating PDF as an image export type:

```typescript
chart.circularChartExport3DModule.export(
    'PDF',
    'chart'
);
```

Use:

```typescript
chart.circularChartExport3DModule.pdfExport(
    'chart'
);
```

The dedicated `pdfExport` method handles PDF output.

### Incorrect Print Options

Incorrect:

```typescript
chart.print({
    width: '800px',
    height: '600px'
});
```

Correct:

```typescript
chart.print();
```

Use browser print settings and `@media print` CSS for print layout.

### Incorrect Multiple-Chart Print Assumption

Do not use an undefined pattern such as:

```typescript
ChartBase.printElements([
    chart1,
    chart2
]);
```

Use the chart's validated `print` API and pass supported element IDs when the implementation requires selected chart elements.

### Missing Export Enablement

Incorrect:

```typescript
CircularChart3D.Inject(
    PieSeries3D,
    CircularChartExport3D
);
```

without enabling export when the implementation requires the export feature to be active.

Correct:

```typescript
const chart = new CircularChart3D({
    enableExport: true,
    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value'
    }]
});
```

### Missing Feature Modules

If the chart uses labels, legend, tooltip, and export, inject all related modules before creating the chart.

```typescript
CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D,
    CircularChartTooltip3D,
    CircularChartExport3D
);
```

### Excessive 3D Perspective

Avoid combining large tilt, rotation, and depth settings without visual validation.

Potential problems:

```text
Small segments become hidden.
Outside labels overlap.
Connector lines cross.
Tooltip targeting becomes difficult.
The chart appears distorted.
```

Start with:

```typescript
tilt: -45,
rotation: 0,
depth: 50
```

Then adjust one property at a time.

### Theme and Explicit Color Conflict

A series palette or point color mapping overrides the segment colors that would otherwise come from the selected theme.

Use:

```text
Theme only -> When theme-provided colors are sufficient.
Palette -> When an ordered custom color set is required.
Point color mapping -> When every point supplies its own color.
```

### RTL Assumptions

Do not assume that `enableRtl: true` translates text.

It changes right-to-left behavior, but the application must still provide translated:

- Titles.
- Subtitles.
- Category values.
- Tooltip labels.
- Legend descriptions.

### Accessibility Mistakes

Avoid:

```text
Low-contrast segment colors.
Tooltip text with insufficient contrast.
Color as the only category identifier.
Animation that cannot be disabled.
Missing chart title.
Untranslated RTL text.
Very small labels.
```

Prefer:

```text
Meaningful titles.
Readable labels.
Legend or tooltip support.
High-contrast colors.
Reduced animation when needed.
Localized content.
```