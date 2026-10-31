# Empty Points & Accessibility

- #empty-points
  - #data-requirements
  - #required-modules
  - #complete-typescript-empty-point-example
  - #complete-javascript-empty-point-example
- #empty-point-display-modes
  - #gap-mode
  - #drop-mode
  - #zero-mode
  - #average-mode
- #empty-point-customization
  - #fill-color
  - #border
  - #runtime-mode-switching
- #accessibility-configuration
  - #chart-accessibility
  - #series-accessibility
- #keyboard-navigation
- #aria-attributes
- #screen-reader-support
- #color-and-non-text-contrast
- #complete-typescript-accessibility-example
- #complete-javascript-accessibility-example
- #accessibility-validation-checklist
- #combined-mistakes-and-future-references

## Empty Points

### Purpose

An empty point is a data point whose mapped numeric value is `null` or `undefined`.

Example:

```typescript
const data = [
    { month: 'Jan', value: 100 },
    { month: 'Feb', value: null },
    { month: 'Mar', value: 150 },
    { month: 'Apr', value: undefined },
    { month: 'May', value: 200 }
];
```

In this data:

```text
Jan -> Valid point
Feb -> Empty point because value is null
Mar -> Valid point
Apr -> Empty point because value is undefined
May -> Valid point
```

The 3D Circular Chart uses `emptyPointSettings` inside the series to determine how empty values are processed.

The supported empty-point modes are:

```text
Gap
Drop
Zero
Average
```

The default mode is `Gap`. Empty-point appearance can be customized through `fill` and `border`.

### Important Circular Chart Behavior

A 3D Circular Chart does not contain a Cartesian axis or a continuous line.

Therefore:

```text
Gap     -> Leaves the empty point without a rendered segment.
Drop    -> Ignores the empty point while rendering.
Zero    -> Treats the empty point as zero.
Average -> Replaces the empty value with an average value.
```

Descriptions such as “maintaining axis continuity” or “smoothing a trend line” apply to Cartesian charts and should not be used to explain 3D Circular Chart behavior.

### Data Requirements

Each data object should contain:

```text
Category field -> Mapped through xName.
Numeric field  -> Mapped through yName.
```

Example:

```typescript
interface MonthlyData {
    month: string;
    value: number | null | undefined;
}
```

Data:

```typescript
const data: MonthlyData[] = [
    { month: 'Jan', value: 100 },
    { month: 'Feb', value: null },
    { month: 'Mar', value: 150 },
    { month: 'Apr', value: undefined },
    { month: 'May', value: 200 }
];
```

Series mapping:

```typescript
series: [{
    dataSource: data,
    xName: 'month',
    yName: 'value'
}]
```

The field names do not need to be `x` and `y`. They only need to match `xName` and `yName`.

### Required Modules

A basic 3D pie series requires `PieSeries3D`.

```typescript
import {
    CircularChart3D,
    PieSeries3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(PieSeries3D);
```

If data labels are visible, also import and inject `CircularChartDataLabel3D`.

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
```

If the legend is visible, also import and inject `CircularChartLegend3D`.

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
```

If tooltips are enabled, also import and inject `CircularChartTooltip3D`.

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartTooltip3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartTooltip3D
);
```

No separate module is required for `emptyPointSettings`.

### Empty Point Configuration

Configure empty points inside the series.

```typescript
emptyPointSettings: {
    mode: 'Average',
    fill: '#e3165b',
    border: {
        width: 2,
        color: '#333333'
    }
}
```

The properties have the following responsibilities:

```text
mode         -> Determines how the missing value is processed.
fill         -> Sets the color of a rendered empty point.
border.width -> Sets the empty-point border width.
border.color -> Sets the empty-point border color.
```

There is no supported `visible` property in the EJ2 CircularChart3D `emptyPointSettings` model. To change empty-point rendering, use `mode`. The API documents `mode`, `fill`, and `border`.

### Complete TypeScript Empty Point Example

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

interface MonthlyData {
    month: string;
    value: number | null | undefined;
}

const data: MonthlyData[] = [
    { month: 'Jan', value: 100 },
    { month: 'Feb', value: null },
    { month: 'Mar', value: 150 },
    { month: 'Apr', value: undefined },
    { month: 'May', value: 200 }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'Monthly Sales',
    subTitle: 'Empty points use Average mode',
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
        name: 'Sales',
        dataSource: data,
        xName: 'month',
        yName: 'value',

        emptyPointSettings: {
            mode: 'Average',
            fill: '#e3165b',
            border: {
                width: 2,
                color: '#333333'
            }
        },

        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'month',
            connectorStyle: {
                length: '30px'
            }
        }
    }]
});

chart.appendTo('#element');
```

Required HTML:

```html
<div id="element"></div>
```

### Complete JavaScript Empty Point Example

```javascript
var data = [
    { month: 'Jan', value: 100 },
    { month: 'Feb', value: null },
    { month: 'Mar', value: 150 },
    { month: 'Apr', value: undefined },
    { month: 'May', value: 200 }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'Monthly Sales',
    subTitle: 'Empty points use Average mode',
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
        name: 'Sales',
        dataSource: data,
        xName: 'month',
        yName: 'value',

        emptyPointSettings: {
            mode: 'Average',
            fill: '#e3165b',
            border: {
                width: 2,
                color: '#333333'
            }
        },

        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'month',
            connectorStyle: {
                length: '30px'
            }
        }
    }]
});

chart.appendTo('#element');
```

## Empty Point Display Modes

### Gap Mode

`Gap` is the default mode.

```typescript
emptyPointSettings: {
    mode: 'Gap'
}
```

Behavior:

```text
The empty point does not produce a normal segment.
Its category remains part of the source data.
No replacement numeric value is calculated.
```

Use `Gap` when a missing value must remain explicitly unknown.

Recommended scenario:

```text
The value was not collected.
The value cannot be estimated.
The application must not treat missing data as zero.
```

### Drop Mode

Use `Drop` to ignore an empty point during rendering.

```typescript
emptyPointSettings: {
    mode: 'Drop'
}
```

Behavior:

```text
The empty point is excluded from rendered segment calculations.
No replacement segment is created for that point.
```

Use `Drop` when the missing category should not participate in the visible chart.

Do not use `Drop` when users must be informed that data is missing. In that scenario, provide a textual data summary or use a deliberate replacement strategy.

### Zero Mode

Use `Zero` to replace an empty value with zero.

```typescript
emptyPointSettings: {
    mode: 'Zero',
    fill: '#cccccc'
}
```

Behavior:

```text
null or undefined -> 0
```

In a circular chart, a zero-value point has no meaningful angular size. Therefore, its fill may not create a visible segment.

Use `Zero` only when missing data is semantically equivalent to zero.

Valid scenario:

```text
No sales occurred for the category.
A missing entry is defined by the business as zero.
```

Invalid scenario:

```text
The value was not collected.
```

Missing data and zero data are not automatically equivalent.

### Average Mode

Use `Average` to replace an empty value with an average calculated from surrounding values.

```typescript
emptyPointSettings: {
    mode: 'Average',
    fill: '#e3165b'
}
```

Example data:

```text
Jan -> 100
Feb -> null
Mar -> 150
```

Conceptual replacement:

```text
Feb -> Average of neighboring values
Feb -> (100 + 150) / 2
Feb -> 125
```

The resulting value participates in the circular chart's segment calculation.

Use `Average` only when estimating the value is appropriate for the dataset.

Do not use it for:

- Financial statements requiring exact values.
- Compliance data.
- Audit data.
- Categories with no logical neighboring relationship.
- Data where interpolation would mislead users.

### Mode Decision Guide

```text
Use Gap:
The value is unknown and must remain unknown.

Use Drop:
The missing point must be excluded from rendering.

Use Zero:
The missing value is explicitly defined as zero.

Use Average:
A calculated replacement is valid for the dataset.
```

### Mode Comparison Example

```typescript
// Preserve the missing point as a gap.
emptyPointSettings: {
    mode: 'Gap'
}
```

```typescript
// Ignore the missing point.
emptyPointSettings: {
    mode: 'Drop'
}
```

```typescript
// Treat the missing point as zero.
emptyPointSettings: {
    mode: 'Zero',
    fill: '#cccccc'
}
```

```typescript
// Replace the missing point with an average.
emptyPointSettings: {
    mode: 'Average',
    fill: '#e3165b'
}
```

## Empty Point Customization

### Fill Color

Use `fill` to set the color used when the selected mode renders an empty-point replacement.

```typescript
emptyPointSettings: {
    mode: 'Average',
    fill: '#e3165b'
}
```

Choose a color that:

- Has adequate contrast against the chart background.
- Is visually distinct from normal points.
- Does not imply an unrelated status such as success or failure.
- Is explained through a legend, label, tooltip, or supporting text.

### Border

Use `border.width` and `border.color`.

```typescript
emptyPointSettings: {
    mode: 'Average',
    fill: '#e3165b',
    border: {
        width: 2,
        color: '#333333'
    }
}
```

The CircularChart3D empty-point border model expects color and width. Do not add an unsupported `dashArray` property to this configuration.

### Runtime Mode Switching

The empty-point mode can be changed at runtime.

Required HTML:

```html
<button id="gapButton" type="button">Gap</button>
<button id="dropButton" type="button">Drop</button>
<button id="zeroButton" type="button">Zero</button>
<button id="averageButton" type="button">Average</button>
<div id="element"></div>
```

#### TypeScript

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartDataLabel3D,
    EmptyPointMode
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D
);

interface MonthlyData {
    month: string;
    value: number | null;
}

const data: MonthlyData[] = [
    { month: 'Jan', value: 100 },
    { month: 'Feb', value: null },
    { month: 'Mar', value: 150 },
    { month: 'Apr', value: null },
    { month: 'May', value: 200 }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'Empty Point Modes',
    tilt: -45,

    series: [{
        dataSource: data,
        xName: 'month',
        yName: 'value',

        emptyPointSettings: {
            mode: 'Gap',
            fill: '#e3165b',
            border: {
                width: 1,
                color: '#333333'
            }
        },

        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'month'
        }
    }]
});

chart.appendTo('#element');

const setEmptyPointMode = (mode: EmptyPointMode): void => {
    chart.series[0].emptyPointSettings.mode = mode;
    chart.refresh();
};

document
    .getElementById('gapButton')
    ?.addEventListener('click', (): void => {
        setEmptyPointMode('Gap');
    });

document
    .getElementById('dropButton')
    ?.addEventListener('click', (): void => {
        setEmptyPointMode('Drop');
    });

document
    .getElementById('zeroButton')
    ?.addEventListener('click', (): void => {
        setEmptyPointMode('Zero');
    });

document
    .getElementById('averageButton')
    ?.addEventListener('click', (): void => {
        setEmptyPointMode('Average');
    });
```

#### JavaScript

```javascript
var data = [
    { month: 'Jan', value: 100 },
    { month: 'Feb', value: null },
    { month: 'Mar', value: 150 },
    { month: 'Apr', value: null },
    { month: 'May', value: 200 }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'Empty Point Modes',
    tilt: -45,

    series: [{
        dataSource: data,
        xName: 'month',
        yName: 'value',

        emptyPointSettings: {
            mode: 'Gap',
            fill: '#e3165b',
            border: {
                width: 1,
                color: '#333333'
            }
        },

        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'month'
        }
    }]
});

chart.appendTo('#element');

function setEmptyPointMode(mode) {
    chart.series[0].emptyPointSettings.mode = mode;
    chart.refresh();
}

var gapButton = document.getElementById('gapButton');
var dropButton = document.getElementById('dropButton');
var zeroButton = document.getElementById('zeroButton');
var averageButton = document.getElementById('averageButton');

if (gapButton) {
    gapButton.addEventListener('click', function () {
        setEmptyPointMode('Gap');
    });
}

if (dropButton) {
    dropButton.addEventListener('click', function () {
        setEmptyPointMode('Drop');
    });
}

if (zeroButton) {
    zeroButton.addEventListener('click', function () {
        setEmptyPointMode('Zero');
    });
}

if (averageButton) {
    averageButton.addEventListener('click', function () {
        setEmptyPointMode('Average');
    });
}
```

## Accessibility Configuration

### Purpose

Accessibility configuration supplies semantic information for assistive technologies and controls whether chart elements can receive keyboard focus.

Accessibility is not created by a single `ariaLabel` or `screenReaderMode` chart property.

The supported accessibility model includes properties such as:

```text
accessibilityDescription
accessibilityRole
focusable
tabIndex
```

Series accessibility also supports `accessibilityDescriptionFormat`.

### Chart Accessibility

Use the chart-level `accessibility` object.

```typescript
accessibility: {
    accessibilityDescription:
        'Browser market share shown as a 3D circular chart.',
    accessibilityRole: 'region',
    focusable: true,
    tabIndex: 0
}
```

Property behavior:

```text
accessibilityDescription -> Provides chart context to assistive technology.
accessibilityRole        -> Defines the semantic role.
focusable                -> Controls whether the chart can receive focus.
tabIndex                 -> Controls keyboard focus order.
```

Do not use undocumented chart-level properties such as:

```typescript
ariaLabel: '...'
```

or:

```typescript
accessibility: {
    screenReaderMode: true
}
```

The validated accessibility model uses `accessibilityDescription`, `accessibilityRole`, `focusable`, and `tabIndex`.

### Series Accessibility

Configure series-specific accessibility through the series `accessibility` object.

```typescript
series: [{
    dataSource: data,
    xName: 'browser',
    yName: 'share',

    accessibility: {
        accessibilityDescription:
            'Browser market share data series.',
        accessibilityDescriptionFormat:
            '${point.x}: ${point.y} percent',
        accessibilityRole: 'region',
        focusable: true,
        tabIndex: 0
    }
}]
```

The series accessibility API supports:

```text
accessibilityDescription
accessibilityDescriptionFormat
accessibilityRole
focusable
tabIndex
```

These properties provide descriptions and focus settings for chart series elements.

### Accessibility Description Guidance

A useful description should explain:

- The chart purpose.
- The chart type.
- The represented measure.
- Important missing-data behavior.
- Where a complete textual data summary is available.

Example:

```text
Browser market share shown as a 3D pie chart.
Chrome has the largest share.
Missing values are omitted using Gap mode.
A complete data table follows the chart.
```

Avoid descriptions that:

- Repeat the visible title without adding context.
- Contain unrelated instructions.
- Claim keyboard interactions that were not tested.
- Claim exact screen-reader output.
- Become excessively long.

## Keyboard Navigation

### Native Focus Configuration

Use the chart accessibility `tabIndex` property instead of an undocumented chart-level `tabIndex`.

```typescript
accessibility: {
    focusable: true,
    tabIndex: 0
}
```

Use `0` to place the chart in the natural tab order.

Use a negative value only when the element should be programmatically focusable but excluded from sequential keyboard navigation.

Avoid positive tab-index values such as:

```typescript
tabIndex: 1
```

Positive values can create an unexpected focus order across the page.

### Keyboard Behavior

Keyboard support must be validated against the exact chart version, enabled features, and rendered elements.

Do not universally state that every segment supports:

```text
Tab
Shift+Tab
Arrow keys
Enter
Space
```

unless each interaction has been tested with the current implementation.

A safe accessibility implementation should guarantee that:

- The chart host can receive focus when required.
- External controls use native `button` elements.
- Every button has visible focus styling.
- Actions do not require pointer input only.
- Keyboard order follows the page's visual order.
- Custom controls respond to Enter and Space through native button behavior.

### Native Control Example

```html
<div class="chart-actions">
    <button id="gapButton" type="button">
        Use Gap mode
    </button>

    <button id="averageButton" type="button">
        Use Average mode
    </button>
</div>

<div id="element"></div>
```

Native buttons automatically provide standard keyboard activation behavior.

### Programmatic Focus

If the application must move focus to the chart host, focus the DOM element rather than calling an undocumented `chart.focus()` method.

```typescript
const chartElement: HTMLElement | null =
    document.getElementById('element');

chartElement?.focus();
```

The host must be focusable.

```html
<div id="element" tabindex="0"></div>
```

Prefer configuring focus through the chart accessibility API when supported by the implementation.

## ARIA Attributes

### API-Generated Accessibility

Use the chart and series accessibility models first.

```typescript
accessibility: {
    accessibilityDescription:
        'Browser market share shown as a 3D pie chart.',
    accessibilityRole: 'region',
    focusable: true,
    tabIndex: 0
}
```

### Host-Level ARIA

A surrounding region can provide an accessible name and description.

```html
<section
    aria-labelledby="browser-chart-title"
    aria-describedby="browser-chart-summary"
>
    <h2 id="browser-chart-title">
        Browser Market Share
    </h2>

    <p id="browser-chart-summary">
        Chrome has the largest share, followed by Safari and Firefox.
        A complete data table is provided after the chart.
    </p>

    <div id="element"></div>
</section>
```

This pattern is preferable to relying only on a long `aria-label`.

### Choosing an ARIA Role

Use roles carefully.

```text
region -> Suitable when the chart is a meaningful page landmark.
img    -> Suitable when the visualization is treated as one graphic.
```

Do not assign multiple conflicting roles to the same element.

The chart does not simultaneously need:

```text
role="img"
role="region"
role="document"
```

Choose the role that matches the actual interaction and semantic purpose.

### Accessible Data Alternative

A chart should not be the only representation of important data.

Provide a table:

```html
<table>
    <caption>Browser market share values</caption>
    <thead>
        <tr>
            <th scope="col">Browser</th>
            <th scope="col">Market share</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Chrome</th>
            <td>62.92%</td>
        </tr>
        <tr>
            <th scope="row">Firefox</th>
            <td>15.23%</td>
        </tr>
        <tr>
            <th scope="row">Safari</th>
            <td>19.97%</td>
        </tr>
        <tr>
            <th scope="row">Others</th>
            <td>2.88%</td>
        </tr>
    </tbody>
</table>
```

The table provides:

- Exact values.
- A predictable reading order.
- Copyable data.
- A non-visual alternative.
- Better support for users who cannot interpret spatial graphics.

## Screen Reader Support

### Chart Description

Configure a concise chart description:

```typescript
accessibility: {
    accessibilityDescription:
        'Browser market share shown as a 3D pie chart. ' +
        'Chrome has the largest share.',
    accessibilityRole: 'region',
    focusable: true,
    tabIndex: 0
}
```

### Series Description Format

Configure a reusable description format:

```typescript
accessibility: {
    accessibilityDescriptionFormat:
        '${point.x}: ${point.y} percent'
}
```

Example intended announcements:

```text
Chrome: 62.92 percent
Firefox: 15.23 percent
Safari: 19.97 percent
Others: 2.88 percent
```

Actual announcement wording depends on:

- Browser.
- Operating system.
- Screen reader.
- Screen-reader verbosity settings.
- Chart version.
- Focused element.
- Configured accessibility role.

Do not guarantee one exact announcement string for every screen reader.

### Screen Reader Testing

Test with more than one combination where possible:

```text
Windows -> NVDA with Firefox or Chrome.
Windows -> JAWS with Chrome or Edge.
macOS   -> VoiceOver with Safari.
iOS     -> VoiceOver with Safari.
Android -> TalkBack with Chrome.
```

Validate:

- The chart has an understandable name.
- The chart purpose is announced.
- Focus does not become trapped.
- Interactive controls have meaningful labels.
- Categories and values can be obtained.
- Empty-value handling is explained.
- The alternative data table is reachable.

## Color and Non-Text Contrast

### Purpose

Color must not be the only method used to distinguish data.

Combine colors with:

- Legend labels.
- Data labels.
- Tooltip text.
- A textual summary.
- An accessible data table.
- Selection or highlight patterns when supported.

### Series Palettes

For CircularChart3D, use the series-level `palettes` property.

```typescript
series: [{
    dataSource: data,
    xName: 'browser',
    yName: 'share',

    palettes: [
        '#005a9c',
        '#c43e00',
        '#107c10',
        '#5c2d91'
    ]
}]
```

Do not use an unsupported chart-level `palette` property.

Incorrect:

```typescript
const chart = new CircularChart3D({
    palette: [
        '#005a9c',
        '#c43e00'
    ]
});
```

Correct:

```typescript
const chart = new CircularChart3D({
    series: [{
        dataSource: data,
        xName: 'browser',
        yName: 'share',
        palettes: [
            '#005a9c',
            '#c43e00'
        ]
    }]
});
```

### Data-Driven Colors

Use `pointColorMapping` when every data object supplies its own color.

```typescript
const data = [
    {
        browser: 'Chrome',
        share: 62.92,
        color: '#005a9c'
    },
    {
        browser: 'Firefox',
        share: 15.23,
        color: '#c43e00'
    },
    {
        browser: 'Safari',
        share: 19.97,
        color: '#107c10'
    },
    {
        browser: 'Others',
        share: 2.88,
        color: '#5c2d91'
    }
];
```

```typescript
series: [{
    dataSource: data,
    xName: 'browser',
    yName: 'share',
    pointColorMapping: 'color'
}]
```

### Text Contrast

Use readable foreground and background combinations.

```typescript
background: '#ffffff'
```

```typescript
titleStyle: {
    color: '#1a1a1a',
    fontWeight: 'Bold'
}
```

```typescript
legendSettings: {
    visible: true,
    textStyle: {
        color: '#1a1a1a'
    }
}
```

```typescript
tooltip: {
    enable: true,
    fill: '#1a1a1a',
    textStyle: {
        color: '#ffffff'
    }
}
```

The commonly applied WCAG AA targets are:

```text
Normal text -> At least 4.5:1 contrast.
Large text  -> At least 3:1 contrast.
UI and meaningful graphical objects -> At least 3:1 against adjacent colors.
```

Do not assume that two saturated colors have sufficient contrast only because they look different.

### Empty Point Communication

Do not communicate an empty or calculated point only through color.

Use additional content such as:

```text
February: Missing value, calculated using Average mode.
```

A supporting table can include status:

```html
<table>
    <caption>Monthly sales and data status</caption>
    <thead>
        <tr>
            <th scope="col">Month</th>
            <th scope="col">Value</th>
            <th scope="col">Status</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">January</th>
            <td>100</td>
            <td>Reported</td>
        </tr>
        <tr>
            <th scope="row">February</th>
            <td>Not available</td>
            <td>Missing</td>
        </tr>
    </tbody>
</table>
```

## Complete TypeScript Accessibility Example

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
    <title>Accessible 3D Circular Chart</title>
</head>
<body>
    <main>
        <section
            aria-labelledby="chart-heading"
            aria-describedby="chart-summary"
        >
            <h1 id="chart-heading">
                Browser Market Share 2023
            </h1>

            <p id="chart-summary">
                The chart compares browser market share.
                Chrome has the largest share.
                Exact values are available in the table after the chart.
            </p>

            <div id="element"></div>

            <table>
                <caption>
                    Browser market share values
                </caption>
                <thead>
                    <tr>
                        <th scope="col">Browser</th>
                        <th scope="col">Market share</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Chrome</th>
                        <td>62.92%</td>
                    </tr>
                    <tr>
                        <th scope="row">Firefox</th>
                        <td>15.23%</td>
                    </tr>
                    <tr>
                        <th scope="row">Safari</th>
                        <td>19.97%</td>
                    </tr>
                    <tr>
                        <th scope="row">Others</th>
                        <td>2.88%</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </main>
</body>
</html>
```

### TypeScript

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

interface BrowserData {
    browser: string;
    share: number | null;
    color: string;
}

const data: BrowserData[] = [
    {
        browser: 'Chrome',
        share: 62.92,
        color: '#005a9c'
    },
    {
        browser: 'Firefox',
        share: 15.23,
        color: '#c43e00'
    },
    {
        browser: 'Safari',
        share: 19.97,
        color: '#107c10'
    },
    {
        browser: 'Others',
        share: 2.88,
        color: '#5c2d91'
    }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '550px',
    title: 'Browser Market Share',
    subTitle: '2023',
    background: '#ffffff',
    tilt: -45,

    accessibility: {
        accessibilityDescription:
            'Browser market share shown as a 3D pie chart. ' +
            'Chrome has the largest market share. ' +
            'A complete data table follows the chart.',
        accessibilityRole: 'region',
        focusable: true,
        tabIndex: 0
    },

    titleStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: 'Bold',
        size: '18px',
        color: '#1a1a1a'
    },

    subTitleStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: 'Normal',
        size: '14px',
        color: '#333333'
    },

    legendSettings: {
        visible: true,
        position: 'Right',
        description: 'Browser market share categories',
        textStyle: {
            fontFamily: 'Segoe UI',
            fontStyle: 'Normal',
            fontWeight: 'Normal',
            size: '12px',
            color: '#1a1a1a'
        }
    },

    tooltip: {
        enable: true,
        header: 'Market Share',
        format: '${point.x}: <b>${point.y:n2}%</b>',
        fill: '#1a1a1a',
        textStyle: {
            fontFamily: 'Segoe UI',
            fontStyle: 'Normal',
            fontWeight: 'Normal',
            size: '12px',
            color: '#ffffff'
        }
    },

    series: [{
        name: 'Browser Market Share',
        dataSource: data,
        xName: 'browser',
        yName: 'share',
        pointColorMapping: 'color',

        accessibility: {
            accessibilityDescription:
                'Browser market share data series.',
            accessibilityDescriptionFormat:
                '${point.x}: ${point.y} percent',
            accessibilityRole: 'region',
            focusable: true,
            tabIndex: 0
        },

        emptyPointSettings: {
            mode: 'Gap',
            fill: '#767676',
            border: {
                width: 2,
                color: '#1a1a1a'
            }
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
                fontWeight: '600',
                size: '12px',
                color: '#1a1a1a'
            }
        }
    }]
});

chart.appendTo('#element');
```

Expected behavior:

```text
1. The chart contains a descriptive title.
2. The chart accessibility object supplies context and focus settings.
3. The series accessibility object describes point content.
4. Data labels provide visible category information.
5. The legend provides category identification.
6. Tooltips provide exact values.
7. Point colors are supplemented by labels and a data table.
8. The table provides a non-visual representation of the chart.
9. Missing values use Gap mode.
10. Text uses high-contrast foreground and background colors.
```

## Complete JavaScript Accessibility Example

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
    <title>Accessible 3D Circular Chart</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js"></script>
    <script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-data/dist/global/ej2-data.min.js"></script>
    <script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-svg-base/dist/global/ej2-svg-base.min.js"></script>
    <script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-charts/dist/global/ej2-charts.min.js"></script>
</head>
<body>
    <main>
        <section
            aria-labelledby="chart-heading"
            aria-describedby="chart-summary"
        >
            <h1 id="chart-heading">
                Browser Market Share 2023
            </h1>

            <p id="chart-summary">
                The chart compares browser market share.
                Chrome has the largest share.
                Exact values are available in the table after the chart.
            </p>

            <div id="element"></div>

            <table>
                <caption>
                    Browser market share values
                </caption>
                <thead>
                    <tr>
                        <th scope="col">Browser</th>
                        <th scope="col">Market share</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Chrome</th>
                        <td>62.92%</td>
                    </tr>
                    <tr>
                        <th scope="row">Firefox</th>
                        <td>15.23%</td>
                    </tr>
                    <tr>
                        <th scope="row">Safari</th>
                        <td>19.97%</td>
                    </tr>
                    <tr>
                        <th scope="row">Others</th>
                        <td>2.88%</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </main>

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
        color: '#005a9c'
    },
    {
        browser: 'Firefox',
        share: 15.23,
        color: '#c43e00'
    },
    {
        browser: 'Safari',
        share: 19.97,
        color: '#107c10'
    },
    {
        browser: 'Others',
        share: 2.88,
        color: '#5c2d91'
    }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '550px',
    title: 'Browser Market Share',
    subTitle: '2023',
    background: '#ffffff',
    tilt: -45,

    accessibility: {
        accessibilityDescription:
            'Browser market share shown as a 3D pie chart. ' +
            'Chrome has the largest market share. ' +
            'A complete data table follows the chart.',
        accessibilityRole: 'region',
        focusable: true,
        tabIndex: 0
    },

    titleStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: 'Bold',
        size: '18px',
        color: '#1a1a1a'
    },

    subTitleStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: 'Normal',
        size: '14px',
        color: '#333333'
    },

    legendSettings: {
        visible: true,
        position: 'Right',
        description: 'Browser market share categories',
        textStyle: {
            fontFamily: 'Segoe UI',
            fontStyle: 'Normal',
            fontWeight: 'Normal',
            size: '12px',
            color: '#1a1a1a'
        }
    },

    tooltip: {
        enable: true,
        header: 'Market Share',
        format: '${point.x}: <b>${point.y:n2}%</b>',
        fill: '#1a1a1a',
        textStyle: {
            fontFamily: 'Segoe UI',
            fontStyle: 'Normal',
            fontWeight: 'Normal',
            size: '12px',
            color: '#ffffff'
        }
    },

    series: [{
        name: 'Browser Market Share',
        dataSource: data,
        xName: 'browser',
        yName: 'share',
        pointColorMapping: 'color',

        accessibility: {
            accessibilityDescription:
                'Browser market share data series.',
            accessibilityDescriptionFormat:
                '${point.x}: ${point.y} percent',
            accessibilityRole: 'region',
            focusable: true,
            tabIndex: 0
        },

        emptyPointSettings: {
            mode: 'Gap',
            fill: '#767676',
            border: {
                width: 2,
                color: '#1a1a1a'
            }
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
                fontWeight: '600',
                size: '12px',
                color: '#1a1a1a'
            }
        }
    }]
});

chart.appendTo('#element');
```

## Accessibility Validation Checklist

```text
✅ CircularChart3D is imported in TypeScript.
✅ PieSeries3D is imported and injected.
✅ CircularChartDataLabel3D is imported and injected when labels are visible.
✅ CircularChartLegend3D is imported and injected when the legend is visible.
✅ CircularChartTooltip3D is imported and injected when tooltips are enabled.
✅ The data source explicitly represents missing values as null or undefined.
✅ emptyPointSettings.mode uses Gap, Drop, Zero, or Average.
✅ Missing data is not automatically treated as zero.
✅ Average mode is used only when estimation is valid.
✅ The empty-point fill is not the only indication of missing data.
✅ The chart has a meaningful title.
✅ The chart accessibility object contains a concise description.
✅ The chart uses a suitable accessibility role.
✅ focusable and tabIndex are configured through accessibility.
✅ Series accessibility describes the represented data.
✅ Native buttons are used for external actions.
✅ Focus order follows the page's visual order.
✅ Visible focus styling is preserved.
✅ The chart does not rely on color alone.
✅ Data labels, a legend, or a tooltip identify categories.
✅ A text summary or accessible table provides exact values.
✅ Text and meaningful graphics have adequate contrast.
✅ Keyboard operation is tested with the installed EJ2 version.
✅ Screen-reader behavior is tested in real browser combinations.
✅ The target HTML element exists.
✅ chart.appendTo('#element') is called.
✅ No editor-generated HTML exists inside executable code.
✅ TypeScript and JavaScript examples provide equivalent behavior.
```

## Combined Mistakes and Future References

### Incorrect Empty Point Default

Incorrect:

```text
Drop is the default empty-point mode.
```

Correct:

```text
Gap is the default empty-point mode.
```

The documented modes are Gap, Zero, Drop, and Average.

### Unsupported Empty Point Visibility

Incorrect:

```typescript
emptyPointSettings: {
    visible: true,
    mode: 'Zero'
}
```

Correct:

```typescript
emptyPointSettings: {
    mode: 'Zero'
}
```

Use `mode` to determine how an empty point is handled.

### Unsupported Empty Point Border Property

Incorrect:

```typescript
emptyPointSettings: {
    border: {
        width: 1,
        color: '#666666',
        dashArray: '2,2'
    }
}
```

Correct:

```typescript
emptyPointSettings: {
    border: {
        width: 1,
        color: '#666666'
    }
}
```

### Incorrect Accessibility Properties

Incorrect:

```typescript
const chart = new CircularChart3D({
    ariaLabel: 'Browser market share',
    tabIndex: 1,
    accessibility: {
        screenReaderMode: true
    }
});
```

Correct:

```typescript
const chart = new CircularChart3D({
    accessibility: {
        accessibilityDescription:
            'Browser market share shown as a 3D pie chart.',
        accessibilityRole: 'region',
        focusable: true,
        tabIndex: 0
    }
});
```

The supported accessibility model exposes description, role, focusability, and tab-index properties. Series accessibility additionally supports a description format.

### Incorrect Focus Method

Incorrect:

```typescript
chart.focus();
```

Unless specifically exposed and validated by the installed version, do not assume the chart instance has a public `focus()` method.

Use the DOM host when programmatic focus is required:

```typescript
document.getElementById('element')?.focus();
```

### Unverified Keyboard Claims

Do not state that all points support specific keyboard commands without testing.

Potentially incorrect claim:

```text
Arrow keys navigate all segments.
Enter always selects a segment.
Space always toggles a legend item.
```

Instead:

```text
Configure focusability.
Use native controls for external actions.
Test actual chart keyboard behavior with the installed EJ2 version.
```

### Incorrect ARIA Role Claims

Do not state that the chart automatically uses all of these roles:

```text
img
region
document
```

A UI element has one computed role at a time.

Configure a role that matches the chart's purpose:

```typescript
accessibilityRole: 'region'
```

### Incorrect Screen Reader Guarantee

Do not promise an exact announcement such as:

```text
Browser Market Share, pie chart, four series...
```

Actual announcements vary by browser, operating system, screen reader, role, and configuration.

### Incorrect Chart-Level Palette

Incorrect:

```typescript
const chart = new CircularChart3D({
    palette: [
        '#005a9c',
        '#c43e00'
    ]
});
```

Correct:

```typescript
const chart = new CircularChart3D({
    series: [{
        dataSource: data,
        xName: 'browser',
        yName: 'share',
        palettes: [
            '#005a9c',
            '#c43e00'
        ]
    }]
});
```

### Color-Only Communication

Incorrect approach:

```text
Red segment means missing.
No label, legend, tooltip, or summary explains it.
```

Correct approach:

```text
Use a distinct color.
Provide a label or tooltip.
Explain missing-value behavior.
Provide a data table or textual summary.
```

### Treating Zero as Missing

Incorrect assumption:

```text
0 always means missing.
```

Correct:

```text
null or undefined -> Empty point.
0                 -> Valid numeric value unless business rules state otherwise.
```

### Unjustified Average Mode

Do not use `Average` merely to prevent a visual gap.

Use it only when calculated replacement values are valid and disclosed to users.

### Inaccessible Alternative Content

A visible chart title alone does not provide full data access.

Add:

- A concise summary.
- Exact values in a table.
- Missing-value status.
- Accessible names for interactive controls.

### Missing Modules

If labels, legend, and tooltip are enabled, inject all required modules.

```typescript
CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D,
    CircularChartTooltip3D
);
```

### Incorrect Constructor Pattern

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