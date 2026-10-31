# Pie and Doughnut Charts in 3D Circular Chart

- #pie-chart-fundamentals
  - #required-module
  - #data-requirements
  - #complete-typescript-pie-chart
  - #complete-javascript-pie-chart
- #doughnut-charts
  - #how-doughnut-rendering-works
  - #complete-typescript-doughnut-chart
  - #complete-javascript-doughnut-chart
- #radius-customization
  - #outer-radius
  - #inner-radius
  - #radius-and-container-size
- #various-radius-pie-chart
  - #complete-typescript-various-radius-chart
  - #complete-javascript-various-radius-chart
- #chart-type-switching
  - #complete-typescript-runtime-switching
  - #complete-javascript-runtime-switching
- #series-customization
  - #point-colors
  - #exploding-segments
  - #series-opacity
- #selection-guide
- #runtime-validation-checklist
- #combined-mistakes-and-future-references

## Pie Chart Fundamentals

### Purpose

A 3D pie chart displays how individual values contribute to a whole. Each data point is rendered as a segment, and the segment angle is calculated from its numeric value.

Use a pie chart when:

- The data represents parts of a whole.
- Users need to compare category proportions.
- The chart contains a small number of categories.
- Every category has a meaningful positive value.
- The complete dataset represents one logical total.

A pie chart is not recommended when:

- The data contains many categories.
- Values are very close and difficult to compare visually.
- Negative values must be represented.
- Multiple independent totals must be compared.
- Precise comparison is more important than proportion.

### Required Module

The `PieSeries3D` module renders both pie and doughnut series.

A doughnut is not a separate series type. It is created from `PieSeries3D` by configuring `innerRadius`.

TypeScript applications must import and inject `PieSeries3D`.

```typescript
import {
    CircularChart3D,
    PieSeries3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(PieSeries3D);
```

Module responsibilities:

```text
CircularChart3D -> Creates and manages the 3D Circular Chart.
PieSeries3D     -> Renders both 3D pie and 3D doughnut series.
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

### Data Requirements

Each data point requires:

```text
Category field -> Mapped through xName.
Numeric field  -> Mapped through yName.
```

Example data:

```typescript
const data = [
    { month: 'January', value: 3 },
    { month: 'February', value: 3.5 },
    { month: 'March', value: 7 },
    { month: 'April', value: 13.5 }
];
```

Correct series mapping:

```typescript
series: [{
    dataSource: data,
    xName: 'month',
    yName: 'value'
}]
```

The mapping means:

```text
xName: 'month' -> Uses the month field as the segment category.
yName: 'value' -> Uses the value field to calculate the segment size.
```

The data property names do not need to be `x` and `y`. They only need to match the configured `xName` and `yName`.

Incorrect mapping:

```typescript
const data = [
    { month: 'January', value: 3 }
];

series: [{
    dataSource: data,
    xName: 'x',
    yName: 'y'
}]
```

Correct mapping:

```typescript
const data = [
    { month: 'January', value: 3 }
];

series: [{
    dataSource: data,
    xName: 'month',
    yName: 'value'
}]
```

### How Segment Size Is Calculated

Each segment represents its value as a proportion of the sum of all valid values.

For this data:

```typescript
const data = [
    { x: 'A', y: 25 },
    { x: 'B', y: 30 },
    { x: 'C', y: 20 },
    { x: 'D', y: 25 }
];
```

The total is:

```text
25 + 30 + 20 + 25 = 100
```

The approximate contribution of each point is:

```text
A -> 25%
B -> 30%
C -> 20%
D -> 25%
```

The `yName` value controls the segment angle. It does not control the outer radius unless the series `radius` property is mapped to a separate data field.

### Required HTML Container

The chart requires an existing HTML host element.

```html
<div id="element"></div>
```

The host ID must match the selector used by `appendTo`.

```typescript
chart.appendTo('#element');
```

### Complete TypeScript Pie Chart

This example includes:

- Strongly typed data.
- 3D pie rendering.
- Data labels.
- Legend support.
- Tooltip support.
- Required module injection.
- Explicit chart dimensions.
- Correct `appendTo` usage.

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
    value: number;
}

const data: MonthlyData[] = [
    { month: 'Jan', value: 3 },
    { month: 'Feb', value: 3.5 },
    { month: 'Mar', value: 7 },
    { month: 'Apr', value: 13.5 },
    { month: 'May', value: 19 },
    { month: 'Jun', value: 23.5 },
    { month: 'Jul', value: 26 },
    { month: 'Aug', value: 25 },
    { month: 'Sep', value: 21 },
    { month: 'Oct', value: 15 }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'Monthly Distribution',
    tilt: -45,
    depth: 50,
    rotation: 0,

    legendSettings: {
        visible: true,
        position: 'Right'
    },

    tooltip: {
        enable: true,
        format: '${point.x}: <b>${point.y}</b>'
    },

    series: [{
        name: 'Monthly Values',
        dataSource: data,
        xName: 'month',
        yName: 'value',
        innerRadius: '0%',
        radius: '80%',
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

Expected behavior:

```text
1. PieSeries3D renders a solid 3D pie.
2. innerRadius: '0%' keeps the center filled.
3. radius: '80%' controls the outer pie size.
4. The month field supplies category names.
5. The value field controls segment angles.
6. Data labels appear outside the segments.
7. The legend identifies each category.
8. The tooltip displays category and value.
```

### Complete JavaScript Pie Chart

```javascript
var data = [
    { month: 'Jan', value: 3 },
    { month: 'Feb', value: 3.5 },
    { month: 'Mar', value: 7 },
    { month: 'Apr', value: 13.5 },
    { month: 'May', value: 19 },
    { month: 'Jun', value: 23.5 },
    { month: 'Jul', value: 26 },
    { month: 'Aug', value: 25 },
    { month: 'Sep', value: 21 },
    { month: 'Oct', value: 15 }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'Monthly Distribution',
    tilt: -45,
    depth: 50,
    rotation: 0,

    legendSettings: {
        visible: true,
        position: 'Right'
    },

    tooltip: {
        enable: true,
        format: '${point.x}: <b>${point.y}</b>'
    },

    series: [{
        name: 'Monthly Values',
        dataSource: data,
        xName: 'month',
        yName: 'value',
        innerRadius: '0%',
        radius: '80%',
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

## Doughnut Charts

### Purpose

A 3D doughnut chart displays the same proportional information as a 3D pie chart but reserves an empty area in the center.

Use a doughnut chart when:

- A ring-shaped presentation is preferred.
- The visual design needs more whitespace.
- A dashboard uses compact visual summaries.
- The center must remain visually open.
- The distinction between segments is more important than maximizing segment area.

Do not assume that creating a doughnut requires another module. Both pie and doughnut charts use `PieSeries3D`.

### How Doughnut Rendering Works

Set the series `innerRadius` to a percentage greater than `0%`.

Pie configuration:

```typescript
innerRadius: '0%'
```

Doughnut configuration:

```typescript
innerRadius: '40%'
```

The percentage is calculated relative to the outer pie radius.

For example:

```text
Outer radius = 200 pixels
innerRadius  = 40%
Inner hole   = approximately 80 pixels
```

Supported usage:

```text
0%            -> Solid pie.
Greater than 0% -> Doughnut.
Up to 100%    -> Increasingly thin ring.
```

Practical values:

```text
0%  -> Solid pie.
20% -> Small center opening.
40% -> Balanced doughnut.
60% -> Large center opening and thinner ring.
```

A very large `innerRadius` creates a thin ring. Thin rings reduce the visible area of small segments and can make interaction and labels harder to interpret.

### Complete TypeScript Doughnut Chart

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
    subTitle: '3D Doughnut View',
    tilt: -45,
    depth: 50,

    legendSettings: {
        visible: true,
        position: 'Right'
    },

    tooltip: {
        enable: true,
        format: '${point.x}: <b>${point.y}%</b>'
    },

    series: [{
        name: 'Market Share',
        dataSource: data,
        xName: 'browser',
        yName: 'share',
        radius: '80%',
        innerRadius: '40%',
        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'browser',
            connectorStyle: {
                length: '30px'
            }
        }
    }]
});

chart.appendTo('#element');
```

Expected behavior:

```text
1. PieSeries3D renders the circular series.
2. innerRadius: '40%' creates the center opening.
3. radius: '80%' controls the outer chart size.
4. The difference between radius and innerRadius forms the ring.
5. The share field controls each segment angle.
6. Labels and tooltips display the mapped data.
```

### Complete JavaScript Doughnut Chart

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
    subTitle: '3D Doughnut View',
    tilt: -45,
    depth: 50,

    legendSettings: {
        visible: true,
        position: 'Right'
    },

    tooltip: {
        enable: true,
        format: '${point.x}: <b>${point.y}%</b>'
    },

    series: [{
        name: 'Market Share',
        dataSource: data,
        xName: 'browser',
        yName: 'share',
        radius: '80%',
        innerRadius: '40%',
        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'browser',
            connectorStyle: {
                length: '30px'
            }
        }
    }]
});

chart.appendTo('#element');
```

## Radius Customization

### Purpose

The series supports two different radius properties:

```text
radius      -> Controls the outer size of the pie or doughnut.
innerRadius -> Controls the size of the center opening.
```

They are not interchangeable.

### Outer Radius

Use the series `radius` property to control the outer size.

```typescript
series: [{
    dataSource: data,
    xName: 'x',
    yName: 'y',
    radius: '100%'
}]
```

The default radius is based on approximately 80 percent of the chart's minimum available dimension.

Example:

```text
Available width  = 600 pixels
Available height = 400 pixels
Minimum dimension = 400 pixels
Default radius is calculated relative to that available size.
```

Common radius values:

```text
'50%'  -> Smaller chart with more surrounding space.
'80%'  -> Typical default-sized chart.
'100%' -> Uses more of the available chart area.
'150'  -> Numeric string interpreted as an absolute radius value.
```

Use percentage values for responsive layouts.

Use absolute values only when the chart container has predictable dimensions.

### Complete Outer Radius Example

#### TypeScript

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
    width: '600px',
    height: '450px',
    title: 'Sales Distribution',
    tilt: -45,
    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value',
        radius: '100%',
        innerRadius: '0%'
    }]
});

chart.appendTo('#element');
```

#### JavaScript

```javascript
var data = [
    { category: 'Hardware', value: 35 },
    { category: 'Software', value: 45 },
    { category: 'Services', value: 20 }
];

var chart = new ej.charts.CircularChart3D({
    width: '600px',
    height: '450px',
    title: 'Sales Distribution',
    tilt: -45,
    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value',
        radius: '100%',
        innerRadius: '0%'
    }]
});

chart.appendTo('#element');
```

### Inner Radius

Use `innerRadius` to change a pie into a doughnut.

```typescript
series: [{
    dataSource: data,
    xName: 'x',
    yName: 'y',
    radius: '80%',
    innerRadius: '40%'
}]
```

The relationship is:

```text
radius      -> Outer edge.
innerRadius -> Inner edge.
Ring width  -> Area between inner and outer edges.
```

A larger `innerRadius` creates:

```text
Larger center opening.
Thinner ring.
Less visible segment area.
```

A smaller `innerRadius` creates:

```text
Smaller center opening.
Thicker ring.
More visible segment area.
```

### Radius and Container Size

The final chart size is affected by:

- Chart width.
- Chart height.
- Title and subtitle.
- Legend position and dimensions.
- Outside data labels.
- Connector length.
- Outer radius.
- Inner radius.

Example:

```typescript
const chart: CircularChart3D = new CircularChart3D({
    width: '600px',
    height: '450px',
    title: 'Sales Distribution',
    legendSettings: {
        visible: true,
        position: 'Right'
    },
    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value',
        radius: '80%',
        innerRadius: '40%'
    }]
});

chart.appendTo('#element');
```

If the chart has an outside legend and outside labels, avoid using an unnecessarily large radius. Otherwise, the chart, labels, and legend can compete for the same space.

## Various Radius Pie Chart

### Purpose

A various-radius pie chart assigns a different outer radius to each segment.

This creates a second visual encoding:

```text
Segment angle  -> Determined by yName.
Segment radius -> Determined by the field mapped through radius.
```

Use this variation only when the radius field represents another meaningful measure.

Do not use arbitrary radii only for decoration, because users may interpret the radius as additional data.

### Radius Field Mapping

Add a radius field to each data object.

```typescript
const data = [
    { country: 'Belgium', value: 551500, segmentRadius: '110.7' },
    { country: 'Cuba', value: 312685, segmentRadius: '124.6' },
    { country: 'Egypt', value: 301000, segmentRadius: '150.8' }
];
```

Map the field through the series `radius` property.

```typescript
series: [{
    dataSource: data,
    xName: 'country',
    yName: 'value',
    radius: 'segmentRadius'
}]
```

In this configuration:

```text
xName: 'country'        -> Category.
yName: 'value'          -> Segment angle.
radius: 'segmentRadius' -> Individual segment radius.
```

### Complete TypeScript Various Radius Chart

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

interface CountryData {
    country: string;
    density: number;
    segmentRadius: string;
}

const data: CountryData[] = [
    { country: 'Belgium', density: 551500, segmentRadius: '110.7' },
    { country: 'Cuba', density: 312685, segmentRadius: '124.6' },
    { country: 'Dominican Republic', density: 350000, segmentRadius: '137.5' },
    { country: 'Egypt', density: 301000, segmentRadius: '150.8' },
    { country: 'Kazakhstan', density: 300000, segmentRadius: '155.5' },
    { country: 'Somalia', density: 357022, segmentRadius: '160.6' },
    { country: 'Argentina', density: 505370, segmentRadius: '100' }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '550px',
    title: 'Country Comparison',
    subTitle: 'Segment angle and radius represent separate values',
    tilt: -15,
    depth: 50,
    enableAnimation: true,

    legendSettings: {
        visible: true,
        position: 'Right'
    },

    tooltip: {
        enable: true,
        format:
            '${point.x}<br>' +
            'Value: <b>${point.y:n0}</b>'
    },

    series: [{
        name: 'Country Data',
        dataSource: data,
        xName: 'country',
        yName: 'density',
        radius: 'segmentRadius',
        innerRadius: '20%',
        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'country',
            connectorStyle: {
                length: '30px'
            }
        }
    }]
});

chart.appendTo('#element');
```

Expected behavior:

```text
1. The density field determines segment angles.
2. The segmentRadius field determines each outer radius.
3. innerRadius: '20%' adds a small center opening.
4. Segments with larger radius values extend farther outward.
5. The chart visually represents two dimensions of data.
```

### Complete JavaScript Various Radius Chart

```javascript
var data = [
    { country: 'Belgium', density: 551500, segmentRadius: '110.7' },
    { country: 'Cuba', density: 312685, segmentRadius: '124.6' },
    { country: 'Dominican Republic', density: 350000, segmentRadius: '137.5' },
    { country: 'Egypt', density: 301000, segmentRadius: '150.8' },
    { country: 'Kazakhstan', density: 300000, segmentRadius: '155.5' },
    { country: 'Somalia', density: 357022, segmentRadius: '160.6' },
    { country: 'Argentina', density: 505370, segmentRadius: '100' }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '550px',
    title: 'Country Comparison',
    subTitle: 'Segment angle and radius represent separate values',
    tilt: -15,
    depth: 50,
    enableAnimation: true,

    legendSettings: {
        visible: true,
        position: 'Right'
    },

    tooltip: {
        enable: true,
        format:
            '${point.x}<br>' +
            'Value: <b>${point.y:n0}</b>'
    },

    series: [{
        name: 'Country Data',
        dataSource: data,
        xName: 'country',
        yName: 'density',
        radius: 'segmentRadius',
        innerRadius: '20%',
        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'country',
            connectorStyle: {
                length: '30px'
            }
        }
    }]
});

chart.appendTo('#element');
```

## Chart Type Switching

### Purpose

A pie and doughnut chart use the same `PieSeries3D` module. Runtime switching requires changing only the series `innerRadius`.

Switch to doughnut:

```typescript
chart.series[0].innerRadius = '40%';
chart.refresh();
```

Switch to pie:

```typescript
chart.series[0].innerRadius = '0%';
chart.refresh();
```

The data source, `xName`, `yName`, colors, labels, legend, and tooltip can remain unchanged.

### Complete TypeScript Runtime Switching

Required HTML:

```html
<button id="pieButton" type="button">Show Pie</button>
<button id="doughnutButton" type="button">Show Doughnut</button>
<div id="element"></div>
```

TypeScript:

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
    subTitle: 'Pie View',
    tilt: -45,

    legendSettings: {
        visible: true,
        position: 'Right'
    },

    tooltip: {
        enable: true,
        format: '${point.x}: <b>${point.y}%</b>'
    },

    series: [{
        name: 'Market Share',
        dataSource: data,
        xName: 'browser',
        yName: 'share',
        radius: '80%',
        innerRadius: '0%',
        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'browser',
            connectorStyle: {
                length: '30px'
            }
        }
    }]
});

chart.appendTo('#element');

const pieButton: HTMLElement | null =
    document.getElementById('pieButton');

const doughnutButton: HTMLElement | null =
    document.getElementById('doughnutButton');

if (pieButton) {
    pieButton.addEventListener('click', (): void => {
        chart.series[0].innerRadius = '0%';
        chart.subTitle = 'Pie View';
        chart.refresh();
    });
}

if (doughnutButton) {
    doughnutButton.addEventListener('click', (): void => {
        chart.series[0].innerRadius = '40%';
        chart.subTitle = 'Doughnut View';
        chart.refresh();
    });
}
```

Runtime behavior:

```text
Show Pie button:
innerRadius becomes 0%.
The center is filled.
The chart refreshes.

Show Doughnut button:
innerRadius becomes 40%.
A center opening appears.
The chart refreshes.
```

### Complete JavaScript Runtime Switching

Required HTML:

```html
<button id="pieButton" type="button">Show Pie</button>
<button id="doughnutButton" type="button">Show Doughnut</button>
<div id="element"></div>
```

JavaScript:

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
    subTitle: 'Pie View',
    tilt: -45,

    legendSettings: {
        visible: true,
        position: 'Right'
    },

    tooltip: {
        enable: true,
        format: '${point.x}: <b>${point.y}%</b>'
    },

    series: [{
        name: 'Market Share',
        dataSource: data,
        xName: 'browser',
        yName: 'share',
        radius: '80%',
        innerRadius: '0%',
        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'browser',
            connectorStyle: {
                length: '30px'
            }
        }
    }]
});

chart.appendTo('#element');

var pieButton = document.getElementById('pieButton');
var doughnutButton = document.getElementById('doughnutButton');

if (pieButton) {
    pieButton.addEventListener('click', function () {
        chart.series[0].innerRadius = '0%';
        chart.subTitle = 'Pie View';
        chart.refresh();
    });
}

if (doughnutButton) {
    doughnutButton.addEventListener('click', function () {
        chart.series[0].innerRadius = '40%';
        chart.subTitle = 'Doughnut View';
        chart.refresh();
    });
}
```

## Series Customization

### Point Colors

Use `palettes` to provide an ordered collection of segment colors.

```typescript
series: [{
    dataSource: data,
    xName: 'x',
    yName: 'y',
    palettes: [
        '#0066cc',
        '#00a651',
        '#ffb900',
        '#d83b01'
    ]
}]
```

Use `pointColorMapping` when each data object contains its own color.

```typescript
const data = [
    { x: 'Chrome', y: 62.92, color: '#0066cc' },
    { x: 'Firefox', y: 15.23, color: '#ff7139' },
    { x: 'Safari', y: 19.97, color: '#1b88ca' },
    { x: 'Others', y: 2.88, color: '#808080' }
];
```

```typescript
series: [{
    dataSource: data,
    xName: 'x',
    yName: 'y',
    pointColorMapping: 'color'
}]
```

Use `pointColorMapping` when colors carry business meaning or are provided by the data source.

### Exploding Segments

Use `explode` to allow segment explosion through interaction.

```typescript
series: [{
    dataSource: data,
    xName: 'x',
    yName: 'y',
    explode: true
}]
```

Use `explodeIndex` to explode one segment when the chart loads.

```typescript
series: [{
    dataSource: data,
    xName: 'x',
    yName: 'y',
    explode: true,
    explodeIndex: 0
}]
```

Use `explodeAll` to explode all segments.

```typescript
series: [{
    dataSource: data,
    xName: 'x',
    yName: 'y',
    explode: true,
    explodeAll: true
}]
```

Use `explodeOffset` to control the distance between an exploded segment and the chart center.

```typescript
series: [{
    dataSource: data,
    xName: 'x',
    yName: 'y',
    explode: true,
    explodeIndex: 0,
    explodeOffset: '20%'
}]
```

Use explosion sparingly. Exploding many segments reduces the visual relationship between the parts and the whole.

### Series Opacity

Use `opacity` to control the transparency of the series.

```typescript
series: [{
    dataSource: data,
    xName: 'x',
    yName: 'y',
    opacity: 0.9
}]
```

Use a value close to `1` for standard presentation. Lower opacity allows the background to show through and can reduce color contrast.

## Selection Guide

### Use a Pie Chart When

```text
The center should be filled.
Segment area should be maximized.
The chart contains a small number of categories.
Simple part-to-whole comparison is required.
```

Recommended configuration:

```typescript
series: [{
    dataSource: data,
    xName: 'x',
    yName: 'y',
    radius: '80%',
    innerRadius: '0%'
}]
```

### Use a Doughnut Chart When

```text
A ring-shaped presentation is required.
The center should remain visually open.
The dashboard requires a lighter visual appearance.
A moderate center opening improves the design.
```

Recommended configuration:

```typescript
series: [{
    dataSource: data,
    xName: 'x',
    yName: 'y',
    radius: '80%',
    innerRadius: '40%'
}]
```

### Use a Various Radius Chart When

```text
The segment angle represents one measure.
The segment radius represents another measure.
The second measure is meaningful and must be explained.
The chart title or supporting text explains both encodings.
```

Recommended configuration:

```typescript
series: [{
    dataSource: data,
    xName: 'category',
    yName: 'primaryValue',
    radius: 'radiusValue',
    innerRadius: '20%'
}]
```

### Readability Recommendations

```text
Use a small number of categories.
Use outside labels for small segments.
Use a legend when labels are hidden.
Use a tooltip for exact values.
Use meaningful and distinct colors.
Keep tilt and depth moderate.
Avoid unexplained various-radius effects.
Avoid a very large inner radius when segments are small.
```

## Runtime Validation Checklist

```text
✅ CircularChart3D is imported in TypeScript.
✅ PieSeries3D is imported and injected.
✅ CircularChartDataLabel3D is imported and injected when labels are visible.
✅ CircularChartLegend3D is imported and injected when the legend is visible.
✅ CircularChartTooltip3D is imported and injected when the tooltip is enabled.
✅ The global EJ2 JavaScript bundle loads before application code.
✅ A valid HTML host element exists.
✅ The appendTo selector matches the host ID.
✅ The data source is defined before chart creation.
✅ xName matches a category field in every data object.
✅ yName matches a numeric field in every data object.
✅ innerRadius is 0% for a solid pie.
✅ innerRadius is greater than 0% for a doughnut.
✅ innerRadius uses a percentage value.
✅ radius uses a valid fixed value or mapped data field.
✅ A mapped radius field exists in every applicable data object.
✅ Runtime type switching calls chart.refresh().
✅ Chart width and height provide sufficient rendering space.
✅ Outside labels and legends do not compete for the same space.
✅ No editor-generated HTML appears inside executable code.
✅ TypeScript and JavaScript examples provide equivalent behavior.
```

## Combined Mistakes and Future References

### Missing PieSeries3D Module

Incorrect:

```typescript
import {
    CircularChart3D
} from '@syncfusion/ej2-charts';
```

Correct:

```typescript
import {
    CircularChart3D,
    PieSeries3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(PieSeries3D);
```

Both pie and doughnut charts require `PieSeries3D`.

### Treating Doughnut as a Separate Series Type

Incorrect assumption:

```text
A doughnut requires a DoughnutSeries3D module.
```

Correct behavior:

```text
PieSeries3D + innerRadius: '0%'  -> Pie
PieSeries3D + innerRadius: '40%' -> Doughnut
```

### Missing Feature Modules

Incorrect:

```typescript
legendSettings: {
    visible: true
},
tooltip: {
    enable: true
},
series: [{
    dataLabel: {
        visible: true
    }
}]
```

when only `PieSeries3D` is injected.

Correct:

```typescript
CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D,
    CircularChartTooltip3D
);
```

### Passing the Selector to the Constructor

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

### Incorrect innerRadius Usage

Incorrect:

```typescript
innerRadius: '40px'
```

Use a percentage:

```typescript
innerRadius: '40%'
```

A value of `0%` creates a pie.

A value greater than `0%` creates a doughnut.

### Confusing radius and innerRadius

Incorrect assumption:

```text
radius controls the center opening.
```

Correct:

```text
radius      -> Controls the outer size.
innerRadius -> Controls the center opening.
```

### Incorrect Radius Field Mapping

Incorrect:

```typescript
const data = [
    { x: 'A', y: 25, size: '100' }
];

series: [{
    dataSource: data,
    xName: 'x',
    yName: 'y',
    radius: 'radius'
}]
```

The data does not contain a `radius` field.

Correct:

```typescript
const data = [
    { x: 'A', y: 25, size: '100' }
];

series: [{
    dataSource: data,
    xName: 'x',
    yName: 'y',
    radius: 'size'
}]
```

### Misinterpreting Various Radius Data

In a various-radius chart:

```text
yName value       -> Controls segment angle.
Mapped radius value -> Controls segment length from the center.
```

Do not describe the radius field as controlling the data value or percentage.

### Missing Refresh During Runtime Switching

Incorrect:

```typescript
chart.series[0].innerRadius = '40%';
```

Correct:

```typescript
chart.series[0].innerRadius = '40%';
chart.refresh();
```

The refresh applies the changed series configuration to the rendered chart.

### Excessive Inner Radius

A very large inner radius creates a thin ring.

Potential effects:

```text
Small segments become harder to see.
Hover interaction becomes more difficult.
Labels appear visually disconnected.
The three-dimensional shape becomes less clear.
```

Start with:

```typescript
innerRadius: '40%'
```

Then adjust after validating the actual container and dataset.

### Excessive Outer Radius

Using:

```typescript
radius: '100%'
```

can reduce the space available for:

- Outside labels.
- Connector lines.
- Legends.
- Titles.
- Tooltips near chart boundaries.

Start with:

```typescript
radius: '80%'
```

Increase it only after checking the complete layout.

### Too Many Categories

A pie or doughnut chart with many categories can become difficult to interpret.

Prefer:

```text
A small number of meaningful categories.
An "Others" category for minor values.
Outside labels for small slices.
A legend or tooltip for additional details.
```

Use another chart type when precise comparison across many categories is required.

### Arbitrary Various-Radius Effects

Do not assign different radii only to make the chart look decorative.

The radius field should represent meaningful data.

Explain the visual mapping:

```text
Segment angle  -> Primary measure.
Segment radius -> Secondary measure.
```

Without this explanation, the chart can mislead users.

### Missing Host Element

Required HTML:

```html
<div id="element"></div>
```

Required attachment:

```typescript
chart.appendTo('#element');
```

Both IDs must match exactly.

### Editor-Generated HTML in Code

Incorrect:

```typescript
<br><br>
const chart = new CircularChart3D({});
```

Correct:

```typescript
const chart = new CircularChart3D({});
```

Do not place `<br>`, `<strong>`, anchor elements, or other editor-generated markup inside TypeScript or JavaScript code.