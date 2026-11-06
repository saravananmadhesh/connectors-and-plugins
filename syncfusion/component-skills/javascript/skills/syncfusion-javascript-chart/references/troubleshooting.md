# Troubleshooting & Optimization

## Table of Contents

- [Troubleshooting & Optimization](#troubleshooting--optimization)
  - [Common Issues](#common-issues)
    - [Chart Is Not Rendering](#chart-is-not-rendering)
      - [Verify the Data](#verify-the-data)
      - [Verify the Container](#verify-the-container)
      - [Verify Field Mapping](#verify-field-mapping)
      - [Verify Module Injection](#verify-module-injection)
      - [Verify Chart Attachment](#verify-chart-attachment)
    - [Data Is Not Displayed](#data-is-not-displayed)
      - [Validate Data Types](#validate-data-types)
      - [Verify Axis Type](#verify-axis-type)
      - [Validate DateTime Values](#validate-datetime-values)
      - [Verify Axis Range](#verify-axis-range)
    - [Tooltip Is Not Displayed](#tooltip-is-not-displayed)
    - [Legend Is Not Working](#legend-is-not-working)
    - [Memory Usage Increases](#memory-usage-increases)
      - [Destroy the Chart](#destroy-the-chart)
      - [Clear Timers](#clear-timers)
      - [Remove Application-Owned Listeners](#remove-application-owned-listeners)
      - [Close Streaming Connections](#close-streaming-connections)
      - [Release Application-Owned References](#release-application-owned-references)
  - [Platform-Specific Issues](#platform-specific-issues)
    - [TypeScript Issues](#typescript-issues)
      - [Event Argument Type Errors](#event-argument-type-errors)
      - [Missing Module Errors](#missing-module-errors)
      - [Dependency Problems](#dependency-problems)
    - [JavaScript and CDN Issues](#javascript-and-cdn-issues)
      - [Global Namespace Is Undefined](#global-namespace-is-undefined)
      - [Script Execution Order](#script-execution-order)
      - [Network and Content Security Policy](#network-and-content-security-policy)
  - [Performance Optimization](#performance-optimization)
    - [Limit Visible Points](#limit-visible-points)
    - [Use Canvas Rendering](#use-canvas-rendering)
    - [Disable Unnecessary Features](#disable-unnecessary-features)
    - [Aggregate Data](#aggregate-data)
    - [Load Data in Chunks](#load-data-in-chunks)
    - [Zooming and Panning](#zooming-and-panning)
    - [Debounce Updates](#debounce-updates)
  - [Browser Compatibility](#browser-compatibility)
    - [Supported Browsers](#supported-browsers)
    - [Internet Explorer 11](#internet-explorer-11)
    - [Feature Detection](#feature-detection)
  - [Debugging Strategies](#debugging-strategies)
    - [Validate the Chart Configuration](#validate-the-chart-configuration)
    - [Inspect Data](#inspect-data)
    - [Visual Debugging](#visual-debugging)
    - [Network Debugging](#network-debugging)
    - [Event Debugging](#event-debugging)
  - [Optimization Checklist](#optimization-checklist)
    - [Configuration](#configuration)
    - [Performance](#performance)
    - [Resource Cleanup](#resource-cleanup)
    - [Browser Support](#browser-support)
    - [Accessibility](#accessibility)
    - [Debugging](#debugging)


## Common Issues

### Chart Is Not Rendering

**Symptoms:**

- The Chart container is empty.
- The Chart area is blank.
- No SVG or Canvas content is generated.
- A module-related error appears in the browser console.

#### Verify the Data

```typescript
interface SalesData {
  month: string;
  sales: number;
}

const seriesData =
  chart.series[0]
    .dataSource as SalesData[];

console.log(
  'Chart data:',
  seriesData
);

if (
  !Array.isArray(seriesData) ||
  seriesData.length === 0
) {
  console.error(
    'No data was provided to the Chart.'
  );
}
```

#### Verify the Container

```html
<div id="chart"></div>
```

```css
#chart {
  width: 100%;
  min-height: 420px;
}
```

Ensure that:

- The element exists before `appendTo()` is called.
- The ID matches the selector.
- The container or its parent is not hidden.
- The container has a resolved height.
- The Chart is not created before its host is added to the DOM.

#### Verify Field Mapping

```typescript
interface SalesData {
  month: string;
  sales: number;
}

const chartData: SalesData[] = [
  {
    month: 'Jan',
    sales: 35
  },
  {
    month: 'Feb',
    sales: 42
  }
];

series: [
  {
    dataSource: chartData,
    xName: 'month',
    yName: 'sales',
    type: 'Column'
  }
]
```

The fields configured through `xName` and `yName` must exist in every relevant data object.

#### Verify Module Injection

```typescript
import {
  Category,
  Chart,
  ColumnSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(
  ColumnSeries,
  Category
);
```

Inject:

- The module required by every series type.
- The module required by every nonnumeric axis.
- Every feature module used by the Chart.

#### Verify Chart Attachment

Use either a constructor target:

```typescript
const chart: Chart = new Chart(
  {
    series: [
      {
        dataSource: chartData,
        xName: 'month',
        yName: 'sales',
        type: 'Column'
      }
    ]
  },
  '#chart'
);
```

Or use `appendTo()`:

```typescript
const chart: Chart = new Chart({
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

Do not attach the same Chart instance twice.

### Data Is Not Displayed

**Symptoms:**

- Axes and title are displayed.
- The Chart renders, but no points appear.
- Some points are missing.

#### Validate Data Types

```typescript
interface ChartData {
  category: string;
  value: number;
}

const chartData: ChartData[] = [
  {
    category: 'Jan',
    value: 35
  },
  {
    category: 'Feb',
    value: 42
  }
];
```

Avoid numeric strings:

```typescript
const invalidData = [
  {
    category: 'Jan',
    value: '35'
  }
];
```

Convert incoming values explicitly:

```typescript
const normalizedData: ChartData[] =
  responseData
    .map(
      (item): ChartData => ({
        category:
          String(item.category),
        value:
          Number(item.value)
      })
    )
    .filter(
      (item: ChartData): boolean =>
        item.category.length > 0 &&
        Number.isFinite(item.value)
    );
```

An X-value of `null` or `undefined` may prevent a point from being mapped correctly.

#### Verify Axis Type

```typescript
primaryXAxis: {
  valueType: 'Category'
}
```

Use:

- `Category` for string categories.
- `DateTime` for continuous time data.
- `DateTimeCategory` for discrete dates without unused time gaps.
- `Logarithmic` for positive values spanning large ranges.
- The default numeric axis for numeric values.

Inject the corresponding axis module.

#### Validate DateTime Values

```typescript
interface TimeData {
  date: Date;
  value: number;
}

const chartData: TimeData[] =
  responseData
    .map(
      (item): TimeData => ({
        date:
          new Date(item.date),
        value:
          Number(item.value)
      })
    )
    .filter(
      (item: TimeData): boolean =>
        !Number.isNaN(
          item.date.getTime()
        ) &&
        Number.isFinite(item.value)
    );
```

#### Verify Axis Range

```typescript
primaryYAxis: {
  minimum: 0,
  maximum: 100,
  interval: 10
}
```

Values outside an explicitly configured range are not visible.

Remove the explicit range when automatic calculation is preferred:

```typescript
primaryYAxis: {
  title: 'Sales'
}
```

### Tooltip Is Not Displayed

Import and inject `Tooltip`.

```typescript
import {
  Chart,
  LineSeries,
  Tooltip
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  Tooltip
);
```

Enable it:

```typescript
tooltip: {
  enable: true,
  format:
    '<b>${point.x}</b><br>' +
    '${series.name}: ${point.y:n2}'
}
```

Check that:

- `Tooltip` is injected.
- `tooltip.enable` is `true`.
- The series contains valid points.
- No overlay blocks pointer interaction.
- CSS has not disabled pointer events.
- The tooltip tokens are valid for the series.
- HTML is written normally inside executable source code.

Do not leave encoded HTML inside TypeScript:

```typescript
format:
  '<b>${point.x}</b>'
```

Use:

```typescript
format:
  '<b>${point.x}</b>'
```

Avoid overriding undocumented internal tooltip selectors. Configure the tooltip through `fill`, `border`, `textStyle`, and supported Chart properties.

### Legend Is Not Working

Import and inject `Legend`.

```typescript
import {
  Chart,
  Legend,
  LineSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  Legend
);
```

Use `legendSettings`:

```typescript
legendSettings: {
  visible: true,
  position: 'Bottom',
  toggleVisibility: true
}
```

Ensure that every series has a meaningful name:

```typescript
series: [
  {
    dataSource: chartData,
    xName: 'month',
    yName: 'sales',
    type: 'Line',
    name: 'Sales'
  }
]
```

For legend hover highlighting, inject `Highlight`.

```typescript
import {
  Highlight
} from '@syncfusion/ej2-charts';

Chart.Inject(Highlight);
```

```typescript
legendSettings: {
  visible: true,
  enableHighlight: true
}
```

Do not use:

```typescript
legend: {
  visible: true
}
```

### Memory Usage Increases

#### Destroy the Chart

```typescript
chart.destroy();
```

Call `destroy()` when the Chart is permanently removed.

Do not clear the host before destroying the Chart.

Preferred order:

```typescript
chart.destroy();

const chartElement:
  HTMLElement | null =
  document.getElementById(
    'chart'
  );

if (chartElement) {
  chartElement.replaceChildren();
}
```

#### Clear Timers

```typescript
window.clearInterval(
  updateInterval
);

window.clearTimeout(
  updateTimeout
);
```

#### Remove Application-Owned Listeners

```typescript
window.removeEventListener(
  'resize',
  resizeHandler
);
```

#### Close Streaming Connections

```typescript
if (
  socket.readyState ===
    WebSocket.OPEN ||
  socket.readyState ===
    WebSocket.CONNECTING
) {
  socket.close();
}
```

#### Release Application-Owned References

```typescript
largeData = [];
```

Do not set a series data source to `null` and refresh merely to clean up a Chart that is about to be destroyed.

## Platform-Specific Issues

### TypeScript Issues

#### Event Argument Type Errors

Import the supported event interface.

```typescript
import {
  IPointRenderEventArgs
} from '@syncfusion/ej2-charts';

const chart: Chart = new Chart({
  pointRender: (
    args: IPointRenderEventArgs
  ): void => {
    args.fill = '#FF5733';
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

Avoid untyped callback parameters when a supported event interface is available.

#### Missing Module Errors

Incorrect:

```typescript
const chart: Chart = new Chart({
  series: [
    {
      type: 'Line'
    }
  ]
});
```

Correct:

```typescript
import {
  Chart,
  LineSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(LineSeries);
```

#### Dependency Problems

After pulling dependency changes:

```bash
npm install
```

Inspect package versions:

```bash
npm list @syncfusion/ej2-charts
npm list @syncfusion/ej2-base
npm list @syncfusion/ej2-data
npm list @syncfusion/ej2-svg-base
```

Ensure that directly installed EJ2 packages use compatible versions.

Clear only project-generated caches when necessary:

```bash
rm -rf dist
rm -rf node_modules/.cache
```

Do not delete `node_modules` or lock files as the first troubleshooting step.

Use strict TypeScript checking:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

### JavaScript and CDN Issues

#### Global Namespace Is Undefined

Check the namespace before creating the Chart:

```javascript
if (
  !window.ej ||
  !window.ej.charts
) {
  throw new Error(
    'The EJ2 Chart scripts were not loaded.'
  );
}
```

Use the consolidated script:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

Or use individual package scripts in dependency order:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-data/dist/global/ej2-data.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-svg-base/dist/global/ej2-svg-base.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-charts/dist/global/ej2-charts.min.js"></script>
```

Use the same version for each EJ2 script.

Do not load the consolidated script together with individual package scripts.

#### Script Execution Order

Create the Chart only after the EJ2 scripts and host element are available.

```html
<div id="chart"></div>

<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
<script src="index.js"></script>
```

#### Network and Content Security Policy

Use the browser Network panel to confirm that:

- Every script returns a successful status.
- No script is blocked by Content Security Policy.
- CDN URLs are valid.
- Mixed-content restrictions do not block resources.
- Script integrity settings are valid when used.

## Performance Optimization

Performance depends on the visible point count, series type, rendering mode, enabled features, update frequency, browser, and device. Do not define a universal optimal range such as 1,000 to 5,000 points without profiling the target scenario.

### Limit Visible Points

Use a fixed-size sliding window for real-time data.

```typescript
interface DataPoint {
  timestamp: Date;
  value: number;
}

const maximumVisiblePoints:
  number = 500;

let visibleData: DataPoint[] =
  completeData.slice(
    -maximumVisiblePoints
  );

chart.series[0].dataSource =
  visibleData;

chart.refresh();
```

For each real-time update:

```typescript
visibleData = [
  ...visibleData,
  nextPoint
].slice(-maximumVisiblePoints);

chart.series[0].dataSource =
  visibleData;

chart.refresh();
```

### Use Canvas Rendering

The Chart uses SVG by default. Set `enableCanvas` to `true` for scenarios involving very large datasets or high-frequency live updates. Animation is not supported in Canvas mode, and some SVG-specific behavior may differ.

```typescript
const chart: Chart = new Chart({
  enableCanvas: true,
  series: [
    {
      dataSource: visibleData,
      xName: 'timestamp',
      yName: 'value',
      type: 'Line',
      animation: {
        enable: false
      },
      marker: {
        visible: false
      }
    }
  ]
});

chart.appendTo('#chart');
```

Profile SVG and Canvas modes with the actual application data and required features.

WebGL detection is not relevant to the EJ2 Chart's SVG and Canvas rendering modes.

Do not use WebGL availability to select `enableCanvas`.

### Disable Unnecessary Features

```typescript
const chart: Chart = new Chart({
  enableCanvas: true,
  legendSettings: {
    visible: false
  },
  tooltip: {
    enable: false
  },
  annotations: [],
  series: [
    {
      dataSource: visibleData,
      xName: 'x',
      yName: 'y',
      type: 'Line',
      animation: {
        enable: false
      },
      marker: {
        visible: false,
        dataLabel: {
          visible: false
        }
      }
    }
  ]
});

chart.appendTo('#chart');
```

Use:

- `legendSettings`, not `legend`.
- `annotations`, not `annotation`.

Disable only features not required by the application.

### Aggregate Data

```typescript
interface TimeSeriesData {
  date: Date;
  value: number;
}

function aggregateData(
  data: TimeSeriesData[],
  groupSize: number
): TimeSeriesData[] {
  if (groupSize <= 0) {
    throw new Error(
      'The group size must be greater than zero.'
    );
  }

  const aggregated:
    TimeSeriesData[] = [];

  for (
    let index: number = 0;
    index < data.length;
    index += groupSize
  ) {
    const group:
      TimeSeriesData[] =
      data.slice(
        index,
        index + groupSize
      );

    if (group.length === 0) {
      continue;
    }

    const sum: number =
      group.reduce(
        (
          total: number,
          item: TimeSeriesData
        ): number =>
          total + item.value,
        0
      );

    aggregated.push({
      date: group[0].date,
      value:
        sum / group.length
    });
  }

  return aggregated;
}

const summaryData:
  TimeSeriesData[] =
  aggregateData(
    largeData,
    10
  );

chart.series[0].dataSource =
  summaryData;

chart.refresh();
```

This performs fixed-size grouping. It does not automatically represent calendar days, weeks, or months.

For calendar-aware aggregation, group records by an appropriate calendar key or perform aggregation on the server.

### Load Data in Chunks

Progressive loading does not improve performance if the Chart is refreshed after every record or small chunk.

```typescript
interface DataPoint {
  x: number;
  y: number;
}

async function loadDataInChunks(
  total: number,
  chunkSize: number
): Promise<void> {
  let loadedData: DataPoint[] = [];

  for (
    let offset: number = 0;
    offset < total;
    offset += chunkSize
  ) {
    const chunk: DataPoint[] =
      await fetchData(
        offset,
        chunkSize
      );

    loadedData = [
      ...loadedData,
      ...chunk
    ];

    chart.series[0].dataSource =
      loadedData;

    chart.refresh();

    await new Promise<void>(
      (
        resolve:
          () => void
      ): void => {
        window.requestAnimationFrame(
          (): void => resolve()
        );
      }
    );
  }
}
```

Use a reasonable chunk size. Refreshing for every small chunk can be slower than assigning the final dataset once.

For very large datasets, prefer server-side filtering, aggregation, paging, or range-based loading.

### Zooming and Panning

Zooming and panning help users inspect a subset of the visible data. They are not virtual scrolling.

Import and inject `Zoom`.

```typescript
import {
  Chart,
  LineSeries,
  Zoom
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  Zoom
);
```

```typescript
zoomSettings: {
  mode: 'X',
  enableSelectionZooming: true,
  enableMouseWheelZooming: true,
  enablePinchZooming: true,
  enablePan: true,
  showToolbar: true,
  toolbarItems: [
    'Zoom',
    'ZoomIn',
    'ZoomOut',
    'Pan',
    'Reset'
  ]
}
```

Do not use an unsupported `zoomSettings.enable` property.

### Debounce Updates

Use debouncing for resize, filtering, text input, or other events that can fire rapidly.

```typescript
interface DataPoint {
  x: number;
  y: number;
}

let updateTimeout:
  number | undefined;

function updateChartDebounced(
  nextData: DataPoint[]
): void {
  window.clearTimeout(
    updateTimeout
  );

  updateTimeout =
    window.setTimeout(
      (): void => {
        chart.series[0].dataSource =
          nextData;

        chart.refresh();
      },
      250
    );
}
```

Example with a filter input:

```typescript
const filterInput:
  HTMLInputElement | null =
  document.getElementById(
    'chart-filter'
  ) as HTMLInputElement | null;

const handleFilterInput =
  (): void => {
    if (!filterInput) {
      return;
    }

    const query: string =
      filterInput.value
        .trim()
        .toLowerCase();

    const filteredData:
      DataPoint[] =
      completeData.filter(
        (item: DataPoint): boolean =>
          String(item.x)
            .toLowerCase()
            .includes(query)
      );

    updateChartDebounced(
      filteredData
    );
  };

filterInput?.addEventListener(
  'input',
  handleFilterInput
);
```

Do not recalculate and replace Chart data on every `mousemove` event unless the interaction explicitly requires it.

## Browser Compatibility

### Supported Browsers

Syncfusion documents Essential JS 2 support for modern browsers and also lists legacy browser baselines including Chrome 63+, Firefox 58+, Opera 50+, Edge 13+, Safari 9+, iOS 9+, Android 4.4+, and Internet Explorer 11 with an ES6 Promise polyfill.

Because browser support policies and application dependencies can change:

- Validate against the browser-support documentation for the installed EJ2 version.
- Define the application's own supported browser matrix.
- Test every required interaction in the target browsers.
- Test touch, keyboard, zoom, export, print, and accessibility behavior.
- Avoid presenting an unverified static version matrix as permanently current.

### Internet Explorer 11

Syncfusion's browser documentation states that Internet Explorer 11 requires an ES6 Promise polyfill.

If IE 11 is part of the application's validated support policy, include the required Promise polyfill before EJ2 scripts.

```html
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>
```

Only load the polyfill version required by the application.

Do not include several versions of the same Promise polyfill simultaneously.

Do not assume that `core-js/stable` and `regenerator-runtime/runtime` alone represent the complete tested compatibility strategy for every build configuration.

### Feature Detection

Detect features that the application actually uses.

```typescript
const supportsSvg: boolean =
  Boolean(
    document.createElementNS &&
    document
      .createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      )
      .createSVGRect
  );

const canvas:
  HTMLCanvasElement =
  document.createElement(
    'canvas'
  );

const supportsCanvas: boolean =
  Boolean(
    canvas.getContext &&
    canvas.getContext('2d')
  );

console.log({
  supportsSvg,
  supportsCanvas
});
```

The EJ2 Chart uses SVG by default and can use Canvas through `enableCanvas`. WebGL detection is not required for choosing between these modes

## Debugging Strategies

### Validate the Chart Configuration

Keep a reference to the application-created Chart instance.

```typescript
const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');

console.log(
  'Chart instance:',
  chart
);
```

Do not rely on undocumented global instance collections such as:

```javascript
ej.charts.Chart.instances[0]
```

### Inspect Data

```typescript
console.log(
  'Series data:',
  chart.series[0].dataSource
);

console.log(
  'X mapping:',
  chart.series[0].xName
);

console.log(
  'Y mapping:',
  chart.series[0].yName
);

console.log(
  'X-axis:',
  chart.primaryXAxis
);

console.log(
  'Y-axis:',
  chart.primaryYAxis
);
```

Validate records systematically:

```typescript
interface SalesData {
  month: string;
  sales: number;
}

function validateData(
  data: unknown
): data is SalesData[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item: unknown): boolean => {
        if (
          typeof item !== 'object' ||
          item === null
        ) {
          return false;
        }

        const record =
          item as Partial<SalesData>;

        return (
          typeof record.month ===
            'string' &&
          Number.isFinite(
            record.sales
          )
        );
      }
    )
  );
}
```

### Visual Debugging

Temporarily add borders and visible axis lines.

```typescript
chart.chartArea = {
  border: {
    color: '#D13438',
    width: 2
  }
};

chart.primaryXAxis.lineStyle = {
  color: '#005A9C',
  width: 2
};

chart.primaryYAxis.lineStyle = {
  color: '#107C10',
  width: 2
};

chart.refresh();
```

Remove temporary debugging styles before release.

### Network Debugging

```typescript
interface SalesData {
  month: string;
  sales: number;
}

async function loadChartData():
  Promise<void> {
  try {
    const response: Response =
      await fetch(
        '/api/chart-data'
      );

    console.log(
      'Response status:',
      response.status
    );

    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}.`
      );
    }

    const responseData: unknown =
      await response.json();

    console.log(
      'Response data:',
      responseData
    );

    if (
      !validateData(
        responseData
      )
    ) {
      throw new Error(
        'The response does not match the expected Chart data schema.'
      );
    }

    chart.series[0].dataSource =
      responseData;

    chart.refresh();
  } catch (error: unknown) {
    console.error(
      'Chart data loading failed.',
      error
    );
  }
}

void loadChartData();
```

Use the browser Network panel to check:

- Request status.
- Response body.
- Content type.
- CORS errors.
- Authentication failures.
- Request duration.
- Cancelled or duplicated requests.

### Event Debugging

Assign supported events explicitly.

```typescript
import {
  IAxisLabelRenderEventArgs,
  ILoadedEventArgs,
  IPointRenderEventArgs,
  ISeriesRenderEventArgs,
  ITooltipRenderEventArgs
} from '@syncfusion/ej2-charts';

const chart: Chart = new Chart({
  loaded: (
    args: ILoadedEventArgs
  ): void => {
    console.log(
      'Loaded:',
      args
    );
  },
  pointRender: (
    args: IPointRenderEventArgs
  ): void => {
    console.log(
      'Point render:',
      args
    );
  },
  seriesRender: (
    args: ISeriesRenderEventArgs
  ): void => {
    console.log(
      'Series render:',
      args
    );
  },
  axisLabelRender: (
    args:
      IAxisLabelRenderEventArgs
  ): void => {
    console.log(
      'Axis label render:',
      args
    );
  },
  tooltipRender: (
    args:
      ITooltipRenderEventArgs
  ): void => {
    console.log(
      'Tooltip render:',
      args
    );
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

Avoid dynamically assigning many events through arbitrary string keys because it bypasses type checking and can overwrite existing handlers.

Remove verbose logging before release, especially from frequently invoked events such as:

- `pointRender`
- `axisLabelRender`
- `chartMouseMove`
- `tooltipRender`

## Optimization Checklist

### Configuration

- [ ] Inject only the required modules.
- [ ] Use valid `dataSource`, `xName`, and `yName` mappings.
- [ ] Convert numeric strings to numbers.
- [ ] Convert date strings to JavaScript `Date` objects.
- [ ] Avoid unnecessary explicit axis ranges.
- [ ] Give the Chart container a resolved height.

### Performance

- [ ] Profile with realistic production data.
- [ ] Limit the number of visible points.
- [ ] Aggregate dense data where appropriate.
- [ ] Filter data before assigning it.
- [ ] Disable unnecessary animation.
- [ ] Hide unnecessary markers and data labels.
- [ ] Disable unused tooltips and legends.
- [ ] Consider Canvas rendering for large or frequently updated datasets.
- [ ] Validate feature behavior in Canvas mode.
- [ ] Debounce resize, search, and filter updates.
- [ ] Refresh once after applying a group of changes.
- [ ] Treat zooming and panning as navigation, not virtualization.

### Resource Cleanup

- [ ] Clear intervals and timeouts.
- [ ] Close WebSocket connections.
- [ ] Remove application-owned event listeners.
- [ ] Release large application-owned data references.
- [ ] Call `chart.destroy()` when the Chart is removed.

### Browser Support

- [ ] Validate the browser matrix for the installed EJ2 version.
- [ ] Test every target browser.
- [ ] Test keyboard and touch interaction.
- [ ] Test SVG and Canvas behavior where used.
- [ ] Include the required Promise polyfill if IE 11 is supported.
- [ ] Do not use WebGL detection for an SVG or Canvas Chart.

### Accessibility

- [ ] Provide a clear Chart title and description.
- [ ] Preserve built-in keyboard navigation.
- [ ] Provide visible focus indicators.
- [ ] Use sufficient color contrast.
- [ ] Avoid color-only differentiation.
- [ ] Provide a text summary.
- [ ] Provide a semantic data table when all values are required.
- [ ] Test with keyboard and screen-reader workflows.

### Debugging

- [ ] Check the browser console.
- [ ] Check failed network requests.
- [ ] Validate data types and field names.
- [ ] Confirm module injection.
- [ ] Confirm that the container exists.
- [ ] Inspect the application-owned Chart reference.
- [ ] Add temporary visual boundaries.
- [ ] Log supported events selectively.
- [ ] Remove verbose logs before release.

## Next Steps

- **Data handling:** See `references/data-handling.md`.
- **Accessibility:** See `references/accessibility-rtl.md`.
- **Series configuration:** See `references/series-configuration.md`.
- **Axes customization:** See `references/axes-customization.md`.
- **Interactions:** See `references/features-interaction.md`.
- **Back to main:** See `SKILL.md`.
