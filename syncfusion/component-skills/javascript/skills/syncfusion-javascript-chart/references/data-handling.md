# Data Handling & Updates

## Table of Contents

- [Data Handling & Updates](#data-handling--updates)
  - [Overview](#overview)
  - [Dynamic Data Updates](#dynamic-data-updates)
    - [Replace the Data Source](#replace-the-data-source)
    - [Add a Data Point](#add-a-data-point)
    - [Remove a Data Point](#remove-a-data-point)
    - [Update a Specific Point](#update-a-specific-point)
    - [Batch Updates](#batch-updates)
    - [Animation During Updates](#animation-during-updates)
  - [Real-Time Charts](#real-time-charts)
    - [Interval-Based Updates](#interval-based-updates)
    - [WebSocket Updates](#websocket-updates)
    - [API Polling](#api-polling)
    - [Real-Time Cleanup](#real-time-cleanup)
  - [Data Editing](#data-editing)
    - [Enable Drag Editing](#enable-drag-editing)
    - [Restrict Editable Values](#restrict-editable-values)
    - [Handle Drag Events](#handle-drag-events)
    - [Update Data from a Form](#update-data-from-a-form)
    - [Delete Selected Points](#delete-selected-points)
  - [Large Datasets](#large-datasets)
    - [Choose an Appropriate Rendering Mode](#choose-an-appropriate-rendering-mode)
    - [Limit Visible Points](#limit-visible-points)
    - [Aggregate Data](#aggregate-data)
    - [Disable Expensive Features](#disable-expensive-features)
    - [Zooming and Panning](#zooming-and-panning)
  - [Data Sources](#data-sources)
    - [Local Array](#local-array)
    - [Remote Data with DataManager](#remote-data-with-datamanager)
    - [Asynchronous Data Loading](#asynchronous-data-loading)
    - [CSV Data](#csv-data)
    - [Server-Side Database Data](#server-side-database-data)
  - [Common Configurations](#common-configurations)
    - [Real-Time Stock Data](#real-time-stock-data)
    - [User-Editable Data Table](#user-editable-data-table)
    - [Large Dataset Filtering](#large-dataset-filtering)


## Overview

The EJ2 Chart supports local arrays, asynchronously loaded data, remote data through `DataManager`, dynamic data replacement, real-time updates, draggable point editing, filtering, aggregation, SVG rendering, and Canvas rendering.

The Chart can bind an array of objects, OData data, or a Syncfusion `DataManager` instance. It also supports zooming, panning, tooltips, selection, and Canvas rendering for data-intensive scenarios.

When updating chart data:

- Keep the fields mapped through `xName` and `yName` consistent.
- Ensure that Y-values are numeric.
- Use valid JavaScript `Date` objects with DateTime axes.
- Apply related changes together.
- Refresh the chart only after all changes are complete.
- Limit retained data in continuously updating charts.
- Clean up intervals, WebSocket connections, and event listeners.

## Dynamic Data Updates

### Replace the Data Source

Assign a new collection to the series `dataSource` and call `refresh()`.

```typescript
import {
  Category,
  Chart,
  LineSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  Category
);

interface SalesData {
  month: string;
  sales: number;
}

const initialData: SalesData[] = [
  {
    month: 'Jan',
    sales: 35
  },
  {
    month: 'Feb',
    sales: 28
  },
  {
    month: 'Mar',
    sales: 34
  }
];

const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: initialData,
      xName: 'month',
      yName: 'sales',
      type: 'Line',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');

const updatedData: SalesData[] = [
  {
    month: 'Jan',
    sales: 42
  },
  {
    month: 'Feb',
    sales: 38
  },
  {
    month: 'Mar',
    sales: 48
  },
  {
    month: 'Apr',
    sales: 45
  }
];

chart.series[0].dataSource =
  updatedData;

chart.refresh();
```

Create a new array when practical. This makes application state changes easier to track and avoids depending on internal references.

### Add a Data Point

Create a new array containing the existing data and the new point.

```typescript
const currentData: SalesData[] =
  chart.series[0].dataSource as SalesData[];

const nextData: SalesData[] = [
  ...currentData,
  {
    month: 'May',
    sales: 45
  }
];

chart.series[0].dataSource =
  nextData;

chart.refresh();
```

Validate the new point before adding it.

```typescript
function addSalesPoint(
  point: SalesData
): void {
  if (
    !point.month.trim() ||
    !Number.isFinite(point.sales)
  ) {
    return;
  }

  const currentData: SalesData[] =
    chart.series[0].dataSource as SalesData[];

  chart.series[0].dataSource = [
    ...currentData,
    point
  ];

  chart.refresh();
}
```

### Remove a Data Point

Remove the last point without mutating the original array.

```typescript
const currentData: SalesData[] =
  chart.series[0].dataSource as SalesData[];

chart.series[0].dataSource =
  currentData.slice(0, -1);

chart.refresh();
```

Remove a point by index:

```typescript
function removePoint(
  pointIndex: number
): void {
  const currentData: SalesData[] =
    chart.series[0].dataSource as SalesData[];

  if (
    pointIndex < 0 ||
    pointIndex >= currentData.length
  ) {
    return;
  }

  chart.series[0].dataSource =
    currentData.filter(
      (
        _item: SalesData,
        index: number
      ): boolean => index !== pointIndex
    );

  chart.refresh();
}
```

### Update a Specific Point

Replace the target object rather than mutating it directly.

```typescript
function updateSalesPoint(
  pointIndex: number,
  nextSales: number
): void {
  if (!Number.isFinite(nextSales)) {
    return;
  }

  const currentData: SalesData[] =
    chart.series[0].dataSource as SalesData[];

  if (
    pointIndex < 0 ||
    pointIndex >= currentData.length
  ) {
    return;
  }

  const nextData: SalesData[] =
    currentData.map(
      (
        item: SalesData,
        index: number
      ): SalesData => {
        if (index !== pointIndex) {
          return item;
        }

        return {
          ...item,
          sales: nextSales
        };
      }
    );

  chart.series[0].dataSource =
    nextData;

  chart.refresh();
}
```

### Batch Updates

Apply multiple changes before calling `refresh()`.

```typescript
function updateChart(
  nextData: SalesData[],
  nextTitle: string
): void {
  chart.series[0].dataSource =
    nextData;

  chart.title =
    nextTitle;

  chart.primaryYAxis.maximum =
    100;

  chart.refresh();
}
```

Avoid calling `refresh()` after every individual property assignment.

### Animation During Updates

Series animation is configured through the series `animation` property.

```typescript
series: [
  {
    dataSource: initialData,
    xName: 'month',
    yName: 'sales',
    type: 'Line',
    animation: {
      enable: true,
      duration: 600,
      delay: 0
    }
  }
]
```

Frequent updates should normally disable animation.

```typescript
series: [
  {
    dataSource: initialData,
    xName: 'month',
    yName: 'sales',
    type: 'Line',
    animation: {
      enable: false
    }
  }
]
```

Do not assume that every call to `refresh()` should animate. Animation behavior depends on the configured series and update path.

## Real-Time Charts

### Interval-Based Updates

The following example appends one point every five seconds and retains only the latest 50 points.

```typescript
import {
  Chart,
  DateTime,
  LineSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  DateTime
);

interface RealTimeData {
  timestamp: Date;
  value: number;
}

let realTimeData: RealTimeData[] = [];

const chart: Chart = new Chart({
  title: 'Real-Time Data',
  primaryXAxis: {
    valueType: 'DateTime',
    labelFormat: 'HH:mm:ss'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 100,
    interval: 20
  },
  series: [
    {
      dataSource: realTimeData,
      xName: 'timestamp',
      yName: 'value',
      type: 'Line',
      name: 'Value',
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

const maximumPoints: number = 50;

const updateInterval: number =
  window.setInterval(() => {
    const nextPoint: RealTimeData = {
      timestamp: new Date(),
      value:
        Math.round(
          Math.random() * 10000
        ) / 100
    };

    realTimeData = [
      ...realTimeData,
      nextPoint
    ].slice(-maximumPoints);

    chart.series[0].dataSource =
      realTimeData;

    chart.refresh();
  }, 5000);
```

Use an update frequency appropriate for the application. Updating every animation frame is normally unnecessary for business dashboards.

### WebSocket Updates

Use a secure WebSocket endpoint in production.

```typescript
interface StreamData {
  timestamp: string;
  value: number;
}

interface ChartStreamData {
  timestamp: Date;
  value: number;
}

let streamData: ChartStreamData[] = [];

const socket: WebSocket =
  new WebSocket(
    'wss://stream.example.com/data'
  );

socket.addEventListener(
  'message',
  (event: MessageEvent<string>): void => {
    try {
      const incomingData: StreamData =
        JSON.parse(event.data) as StreamData;

      const timestamp: Date =
        new Date(incomingData.timestamp);

      const value: number =
        Number(incomingData.value);

      if (
        Number.isNaN(timestamp.getTime()) ||
        !Number.isFinite(value)
      ) {
        return;
      }

      streamData = [
        ...streamData,
        {
          timestamp,
          value
        }
      ].slice(-100);

      chart.series[0].dataSource =
        streamData;

      chart.refresh();
    } catch (error: unknown) {
      console.error(
        'Unable to process the WebSocket message.',
        error
      );
    }
  }
);

socket.addEventListener(
  'error',
  (): void => {
    console.error(
      'The WebSocket connection encountered an error.'
    );
  }
);
```

Do not push data directly into an untyped `dataSource` without validating the payload.

Use `wss://` rather than `ws://` when the page is served over HTTPS.

### API Polling

Prevent overlapping requests by scheduling the next request only after the current request completes.

```typescript
interface ApiData {
  timestamp: string;
  value: number;
}

interface ChartApiData {
  timestamp: Date;
  value: number;
}

let pollingTimer: number | undefined;
let isDisposed: boolean = false;

async function pollChartData():
  Promise<void> {
  try {
    const response: Response =
      await fetch('/api/latest-data');

    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}.`
      );
    }

    const responseData: ApiData[] =
      await response.json() as ApiData[];

    const nextData: ChartApiData[] =
      responseData
        .map(
          (item: ApiData): ChartApiData => ({
            timestamp:
              new Date(item.timestamp),
            value:
              Number(item.value)
          })
        )
        .filter(
          (item: ChartApiData): boolean =>
            !Number.isNaN(
              item.timestamp.getTime()
            ) &&
            Number.isFinite(item.value)
        );

    chart.series[0].dataSource =
      nextData;

    chart.refresh();
  } catch (error: unknown) {
    console.error(
      'Unable to load the latest chart data.',
      error
    );
  } finally {
    if (!isDisposed) {
      pollingTimer =
        window.setTimeout(
          (): void => {
            void pollChartData();
          },
          5000
        );
    }
  }
}

void pollChartData();
```

A recursive timeout is safer than an asynchronous `setInterval` because it avoids starting another request while the previous request is still running.

### Real-Time Cleanup

Clear timers, close sockets, remove listeners, and destroy the chart when it is permanently removed.

```typescript
window.addEventListener(
  'beforeunload',
  (): void => {
    isDisposed = true;

    window.clearInterval(
      updateInterval
    );

    window.clearTimeout(
      pollingTimer
    );

    if (
      socket.readyState ===
        WebSocket.OPEN ||
      socket.readyState ===
        WebSocket.CONNECTING
    ) {
      socket.close();
    }

    chart.destroy();
  }
);
```

In a component framework, perform equivalent cleanup in the component's unmount or destroy lifecycle.

## Data Editing

The EJ2 Chart supports interactive data editing by dragging rendered points. Import and inject `DataEditing`, then enable the series `dragSettings`. The drag settings can also restrict editing with `minY` and `maxY`.

### Enable Drag Editing

```typescript
import {
  Category,
  Chart,
  ColumnSeries,
  DataEditing,
  Tooltip
} from '@syncfusion/ej2-charts';

Chart.Inject(
  ColumnSeries,
  Category,
  DataEditing,
  Tooltip
);

interface EditableData {
  category: string;
  value: number;
}

const chartData: EditableData[] = [
  {
    category: 'A',
    value: 35
  },
  {
    category: 'B',
    value: 48
  },
  {
    category: 'C',
    value: 42
  }
];

const chart: Chart = new Chart({
  title: 'Editable Values',
  primaryXAxis: {
    valueType: 'Category'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 100,
    interval: 20
  },
  tooltip: {
    enable: true
  },
  series: [
    {
      dataSource: chartData,
      xName: 'category',
      yName: 'value',
      type: 'Column',
      name: 'Value',
      marker: {
        visible: true
      },
      dragSettings: {
        enable: true
      }
    }
  ]
});

chart.appendTo('#chart');
```

Point rendering and point-click events do not enable editing by themselves.

### Restrict Editable Values

Use `minY` and `maxY` to restrict the editable Y-value range.

```typescript
dragSettings: {
  enable: true,
  minY: 0,
  maxY: 100,
  fill: '#0F6CBD'
}
```

These settings provide visual feedback and prevent values from being dragged outside the permitted range.

### Handle Drag Events

Use the supported drag events to respond to editing.

```typescript
const chart: Chart = new Chart({
  dragStart: (args): void => {
    console.log(
      'Point editing started.',
      args
    );
  },
  drag: (args): void => {
    console.log(
      'Point is being edited.',
      args
    );
  },
  dragComplete: (args): void => {
    console.log(
      'Point editing completed.',
      args
    );
  },
  series: [
    {
      dataSource: chartData,
      xName: 'category',
      yName: 'value',
      type: 'Column',
      dragSettings: {
        enable: true,
        minY: 0,
        maxY: 100
      }
    }
  ]
});

chart.appendTo('#chart');
```

When edited values must be saved, validate and send the final value after `dragComplete`.

### Update Data from a Form

Use typed form elements and validate the input.

```html
<label for="category">
  Category
</label>
<input id="category" type="text">

<label for="value">
  Value
</label>
<input
  id="value"
  type="number"
  min="0"
  step="any"
>

<button id="add-point" type="button">
  Add point
</button>

<p id="form-status" aria-live="polite"></p>
```

```typescript
const categoryInput:
  HTMLInputElement | null =
  document.getElementById(
    'category'
  ) as HTMLInputElement | null;

const valueInput:
  HTMLInputElement | null =
  document.getElementById(
    'value'
  ) as HTMLInputElement | null;

const addButton:
  HTMLButtonElement | null =
  document.getElementById(
    'add-point'
  ) as HTMLButtonElement | null;

const statusElement:
  HTMLElement | null =
  document.getElementById(
    'form-status'
  );

const handleAddPoint = (): void => {
  if (
    !categoryInput ||
    !valueInput
  ) {
    return;
  }

  const category: string =
    categoryInput.value.trim();

  const value: number =
    Number(valueInput.value);

  if (
    !category ||
    !Number.isFinite(value)
  ) {
    if (statusElement) {
      statusElement.textContent =
        'Enter a category and a valid numeric value.';
    }

    return;
  }

  const currentData: EditableData[] =
    chart.series[0].dataSource
      as EditableData[];

  chart.series[0].dataSource = [
    ...currentData,
    {
      category,
      value
    }
  ];

  chart.refresh();

  categoryInput.value = '';
  valueInput.value = '';

  if (statusElement) {
    statusElement.textContent =
      `${category} was added to the chart.`;
  }
};

addButton?.addEventListener(
  'click',
  handleAddPoint
);
```

### Delete Selected Points

Do not use a document-level context-menu handler that always deletes the final item. It does not reliably identify the clicked chart point and overrides expected browser behavior.

Use the Chart `pointClick` event to track a point, then provide a keyboard-accessible Delete button.

```html
<button id="delete-point" type="button">
  Delete selected point
</button>

<p id="selection-status" aria-live="polite">
  Select a chart point.
</p>
```

```typescript
import {
  IPointEventArgs
} from '@syncfusion/ej2-charts';

let selectedPointIndex:
  number | null = null;

const selectionStatus:
  HTMLElement | null =
  document.getElementById(
    'selection-status'
  );

const deleteButton:
  HTMLButtonElement | null =
  document.getElementById(
    'delete-point'
  ) as HTMLButtonElement | null;

chart.pointClick = (
  args: IPointEventArgs
): void => {
  selectedPointIndex =
    args.pointIndex;

  if (selectionStatus) {
    selectionStatus.textContent =
      `Selected ${String(args.point.x)}.`;
  }
};

const handleDeletePoint = (): void => {
  if (selectedPointIndex === null) {
    return;
  }

  const currentData: EditableData[] =
    chart.series[0].dataSource
      as EditableData[];

  if (
    selectedPointIndex < 0 ||
    selectedPointIndex >=
      currentData.length
  ) {
    return;
  }

  chart.series[0].dataSource =
    currentData.filter(
      (
        _item: EditableData,
        index: number
      ): boolean =>
        index !== selectedPointIndex
    );

  selectedPointIndex = null;
  chart.refresh();

  if (selectionStatus) {
    selectionStatus.textContent =
      'The selected point was deleted.';
  }
};

deleteButton?.addEventListener(
  'click',
  handleDeletePoint
);
```

## Large Datasets

Chart performance depends on the series type, rendering mode, visible point count, enabled features, browser, and device.

Do not assume that every dataset with more than 1,000 points requires the same optimization.

### Choose an Appropriate Rendering Mode

The Chart supports SVG and Canvas rendering. SVG is the default, while Canvas can be useful for data-intensive charts with many simple points.

```typescript
const chart: Chart = new Chart({
  enableCanvas: true,
  series: [
    {
      dataSource: largeData,
      xName: 'x',
      yName: 'y',
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

Test Canvas rendering with the required features because rendering behavior and feature support can differ from SVG.

### Limit Visible Points

Retain only the points needed for the current view.

```typescript
const maximumVisiblePoints: number =
  500;

const visibleData: DataPoint[] =
  largeData.slice(
    -maximumVisiblePoints
  );

chart.series[0].dataSource =
  visibleData;

chart.refresh();
```

For live charts, use a fixed-size sliding window.

```typescript
liveData = [
  ...liveData,
  nextPoint
].slice(-maximumVisiblePoints);
```

### Aggregate Data

Aggregate dense time-series data before binding it.

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
    const group: TimeSeriesData[] =
      data.slice(
        index,
        index + groupSize
      );

    if (group.length === 0) {
      continue;
    }

    const total: number =
      group.reduce(
        (
          sum: number,
          item: TimeSeriesData
        ): number =>
          sum + item.value,
        0
      );

    aggregated.push({
      date: group[0].date,
      value:
        total / group.length
    });
  }

  return aggregated;
}

const summaryData: TimeSeriesData[] =
  aggregateData(
    largeData,
    7
  );

chart.series[0].dataSource =
  summaryData;

chart.refresh();
```

This function performs fixed-size grouping. It is not automatically calendar-aware weekly aggregation.

For calendar weeks, group data by a calculated week key or perform aggregation on the server.

### Disable Expensive Features

Disable features that are not required.

```typescript
const chart: Chart = new Chart({
  enableCanvas: true,
  legendSettings: {
    visible: false
  },
  tooltip: {
    enable: false
  },
  series: [
    {
      dataSource: largeData,
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

Use `legendSettings`, not `legend`.

Annotations are configured through `annotations`, not `annotation`.

### Zooming and Panning

Zooming and panning help users inspect a subset of a large dataset. They do not provide DOM virtual scrolling.

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

Configure zooming:

```typescript
zoomSettings: {
  enableSelectionZooming: true,
  enableMouseWheelZooming: true,
  enablePinchZooming: true,
  enablePan: true,
  mode: 'X'
}
```

Do not describe zooming as virtual scrolling.

## Data Sources

### Local Array

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
    sales: 28
  },
  {
    month: 'Mar',
    sales: 34
  }
];

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
```

### Remote Data with DataManager

Do not assign a URL string directly to `series.dataSource`.

Incorrect:

```typescript
series: [
  {
    dataSource:
      'https://api.example.com/data',
    xName: 'month',
    yName: 'sales'
  }
]
```

Use Syncfusion `DataManager` with an appropriate adaptor.

```typescript
import {
  DataManager,
  WebApiAdaptor
} from '@syncfusion/ej2-data';

const remoteData:
  DataManager = new DataManager({
    url:
      'https://api.example.com/data',
    adaptor:
      new WebApiAdaptor(),
    crossDomain: true
  });

const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: remoteData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

The Chart supports local and remote binding through arrays and `DataManager`.

Choose the adaptor that matches the remote service.

### Asynchronous Data Loading

Use `fetch` when the application needs direct control over the request and response transformation.

```typescript
interface ApiSalesData {
  month: string;
  sales: string | number;
}

interface SalesData {
  month: string;
  sales: number;
}

const statusElement:
  HTMLElement | null =
  document.getElementById(
    'chart-status'
  );

async function loadChartData():
  Promise<void> {
  try {
    const response: Response =
      await fetch('/api/chart-data');

    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}.`
      );
    }

    const responseData:
      ApiSalesData[] =
      await response.json()
        as ApiSalesData[];

    const chartData: SalesData[] =
      responseData
        .map(
          (
            item: ApiSalesData
          ): SalesData => ({
            month:
              String(item.month),
            sales:
              Number(item.sales)
          })
        )
        .filter(
          (
            item: SalesData
          ): boolean =>
            item.month.length > 0 &&
            Number.isFinite(item.sales)
        );

    chart.series[0].dataSource =
      chartData;

    chart.refresh();

    if (statusElement) {
      statusElement.textContent =
        'The chart data was loaded.';
    }
  } catch (error: unknown) {
    console.error(
      'Unable to load chart data.',
      error
    );

    if (statusElement) {
      statusElement.textContent =
        'Unable to load the chart data.';
    }
  }
}

void loadChartData();
```

### CSV Data

A simple `split(',')` parser does not correctly handle quoted commas, escaped quotes, or multiline fields.

Use a validated CSV parser for general CSV files.

For a controlled CSV format without quoted values, use a typed parser and document the limitation.

```typescript
interface CsvSalesData {
  month: string;
  sales: number;
}

function parseSimpleCsv(
  csvText: string
): CsvSalesData[] {
  const lines: string[] =
    csvText
      .trim()
      .split(/\r?\n/);

  if (lines.length < 2) {
    return [];
  }

  const headers: string[] =
    lines[0]
      .split(',')
      .map(
        (header: string): string =>
          header.trim()
      );

  const monthIndex: number =
    headers.indexOf('month');

  const salesIndex: number =
    headers.indexOf('sales');

  if (
    monthIndex === -1 ||
    salesIndex === -1
  ) {
    throw new Error(
      'The CSV must contain month and sales columns.'
    );
  }

  return lines
    .slice(1)
    .map(
      (line: string): CsvSalesData | null => {
        const values: string[] =
          line
            .split(',')
            .map(
              (value: string): string =>
                value.trim()
            );

        const month: string =
          values[monthIndex] ?? '';

        const sales: number =
          Number(
            values[salesIndex]
          );

        if (
          !month ||
          !Number.isFinite(sales)
        ) {
          return null;
        }

        return {
          month,
          sales
        };
      }
    )
    .filter(
      (
        item: CsvSalesData | null
      ): item is CsvSalesData =>
        item !== null
    );
}
```

Apply the parsed data:

```typescript
const csvData: CsvSalesData[] =
  parseSimpleCsv(csvText);

chart.series[0].dataSource =
  csvData;

chart.refresh();
```

### Server-Side Database Data

Browser code should call a server endpoint rather than connecting directly to a database or accepting arbitrary SQL queries.

Do not send raw user-supplied SQL from the browser.

Use a defined request contract.

```typescript
interface SalesQueryRequest {
  startDate: string;
  endDate: string;
  region?: string;
}

interface SalesResponse {
  date: string;
  amount: number;
}

interface SalesChartData {
  date: Date;
  amount: number;
}

async function getSalesData(
  request: SalesQueryRequest
): Promise<SalesChartData[]> {
  const response: Response =
    await fetch('/api/sales/query', {
      method: 'POST',
      headers: {
        'Content-Type':
          'application/json'
      },
      body:
        JSON.stringify(request)
    });

  if (!response.ok) {
    throw new Error(
      `Request failed with status ${response.status}.`
    );
  }

  const responseData:
    SalesResponse[] =
    await response.json()
      as SalesResponse[];

  return responseData
    .map(
      (
        item: SalesResponse
      ): SalesChartData => ({
        date:
          new Date(item.date),
        amount:
          Number(item.amount)
      })
    )
    .filter(
      (
        item: SalesChartData
      ): boolean =>
        !Number.isNaN(
          item.date.getTime()
        ) &&
        Number.isFinite(
          item.amount
        )
    );
}

const databaseData:
  SalesChartData[] =
  await getSalesData({
    startDate: '2026-01-01',
    endDate: '2026-06-30',
    region: 'South'
  });

chart.series[0].dataSource =
  databaseData;

chart.refresh();
```

The server must validate the request, enforce authorization, parameterize database queries, and return only the required fields.

## Common Configurations

### Real-Time Stock Data

```typescript
import {
  Chart,
  DateTime,
  LineSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  DateTime
);

interface StockMessage {
  timestamp: string;
  price: number;
}

interface StockChartData {
  timestamp: Date;
  price: number;
}

let stockData: StockChartData[] = [];

const stockChart: Chart =
  new Chart({
    title: 'Real-Time Stock Price',
    primaryXAxis: {
      valueType: 'DateTime',
      intervalType: 'Minutes',
      interval: 1,
      labelFormat: 'HH:mm'
    },
    primaryYAxis: {
      title: 'Price'
    },
    series: [
      {
        dataSource: stockData,
        xName: 'timestamp',
        yName: 'price',
        type: 'Line',
        name: 'Price',
        animation: {
          enable: false
        },
        marker: {
          visible: false
        }
      }
    ]
  });

stockChart.appendTo('#stock-chart');

const stockSocket: WebSocket =
  new WebSocket(
    'wss://stream.example.com/stock'
  );

stockSocket.addEventListener(
  'message',
  (event: MessageEvent<string>): void => {
    try {
      const message: StockMessage =
        JSON.parse(
          event.data
        ) as StockMessage;

      const timestamp: Date =
        new Date(
          message.timestamp
        );

      const price: number =
        Number(message.price);

      if (
        Number.isNaN(
          timestamp.getTime()
        ) ||
        !Number.isFinite(price)
      ) {
        return;
      }

      stockData = [
        ...stockData,
        {
          timestamp,
          price
        }
      ].slice(-100);

      stockChart.series[0].dataSource =
        stockData;

      stockChart.refresh();
    } catch (error: unknown) {
      console.error(
        'Unable to process stock data.',
        error
      );
    }
  }
);

window.addEventListener(
  'beforeunload',
  (): void => {
    stockSocket.close();
    stockChart.destroy();
  }
);
```

### User-Editable Data Table

When a Grid and Chart share data, maintain a single application-owned data collection and update both controls from it.

```typescript
interface EditableData {
  category: string;
  value: number;
}

let sharedData: EditableData[] = [
  {
    category: 'A',
    value: 35
  },
  {
    category: 'B',
    value: 42
  }
];

function updateChartFromGrid(
  records: EditableData[]
): void {
  sharedData = records.map(
    (
      item: EditableData
    ): EditableData => ({
      ...item,
      value:
        Number(item.value)
    })
  );

  chart.series[0].dataSource =
    sharedData;

  chart.refresh();
}
```

If using the Syncfusion Grid, import the Grid from its corresponding package and follow its editing lifecycle. Do not assume that `getCurrentViewRecords()` contains every record when paging, filtering, or virtualization is enabled.

### Large Dataset Filtering

```typescript
interface LargeDataPoint {
  category: string;
  date: Date;
  value: number;
}

const categorySelector:
  HTMLSelectElement | null =
  document.getElementById(
    'category-filter'
  ) as HTMLSelectElement | null;

const handleCategoryChange =
  (): void => {
    if (!categorySelector) {
      return;
    }

    const selectedCategory: string =
      categorySelector.value;

    const filteredData:
      LargeDataPoint[] =
      largeDataset.filter(
        (
          item: LargeDataPoint
        ): boolean =>
          selectedCategory === 'All' ||
          item.category ===
            selectedCategory
      );

    chart.series[0].dataSource =
      filteredData;

    chart.refresh();
  };

categorySelector?.addEventListener(
  'change',
  handleCategoryChange
);
```

Filter and aggregate before assigning data when the selected subset remains too large.

```typescript
function updateWithAggregation(
  predicate: (
    item: LargeDataPoint
  ) => boolean
): void {
  const filteredData:
    LargeDataPoint[] =
    largeDataset.filter(
      predicate
    );

  const aggregatedData:
    TimeSeriesData[] =
    aggregateData(
      filteredData,
      7
    );

  chart.series[0].dataSource =
    aggregatedData;

  chart.refresh();
}
```

## Troubleshooting

### Updated Data Is Not Displayed

- Assign the updated collection to the series `dataSource`.
- Ensure that the fields still match `xName` and `yName`.
- Ensure that Y-values are numeric.
- Call `refresh()` after applying all changes.
- Ensure that the Chart has not been destroyed.
- Check the browser console for errors.

### Added Point Is Not Displayed

- Ensure that the new point contains the mapped fields.
- Ensure that its Y-value is numeric.
- Ensure that its X-value is compatible with the axis type.
- Use a JavaScript `Date` object for a DateTime axis.
- Assign the resulting collection back to `dataSource`.
- Refresh the Chart.

### Real-Time Chart Becomes Slow

- Reduce the update frequency.
- Retain a fixed number of points.
- Disable animation.
- Hide unnecessary markers and data labels.
- Disable the tooltip if it is not required.
- Consider Canvas rendering.
- Aggregate data before binding.
- Refresh only once per update batch.

### WebSocket Data Is Not Displayed

- Use a valid `ws://` or `wss://` endpoint.
- Prefer `wss://` on HTTPS pages.
- Validate the incoming JSON.
- Convert date strings to JavaScript `Date` objects.
- Convert numeric strings to numbers.
- Handle WebSocket errors.
- Close the socket during cleanup.

### API Polling Requests Overlap

- Do not use asynchronous `setInterval` calls without overlap protection.
- Schedule the next request after the current request completes.
- Handle non-success HTTP responses.
- Stop polling when the Chart is removed.
- Use an `AbortController` when requests must be cancelled explicitly.

### Drag Editing Is Not Working

- Import and inject `DataEditing`.
- Set `series.dragSettings.enable` to `true`.
- Use a supported series type.
- Ensure that another element is not covering the Chart.
- Ensure that pointer events are enabled.
- Set `minY` and `maxY` when values must be restricted.
- Do not expect `pointRender` or `pointClick` to enable drag editing.

### Remote URL Data Is Not Loaded

- Do not assign a URL string directly to `dataSource`.
- Use `DataManager` with an appropriate adaptor.
- Alternatively, load the data with `fetch`.
- Check CORS configuration.
- Check authentication and authorization.
- Check the browser network panel.
- Validate the response schema.

### CSV Values Are Incorrect

- Use a proper CSV parser for quoted or multiline fields.
- Do not rely on `split(',')` for general CSV input.
- Trim headers and values.
- Convert numeric fields explicitly.
- Validate required columns.
- Remove or report invalid rows.

### Large Dataset Is Difficult to Navigate

- Aggregate or filter the dataset.
- Use zooming and panning.
- Do not describe zooming as virtual scrolling.
- Consider Canvas rendering.
- Limit visible points.
- Use an appropriate series type.
- Avoid markers and data labels on every point.

## Next Steps

- **Accessibility:** See `references/accessibility-rtl.md`.
- **Troubleshooting:** See `references/troubleshooting.md`.
- **Configure series:** See `references/series-configuration.md`.
- **Configure axes:** See `references/axes-customization.md`.
- **Add interactions:** See `references/features-interaction.md`.
- **Style appearance:** See `references/styling-appearance.md`.

## Combined Mistakes and Future References

- Import Chart modules from `@syncfusion/ej2-charts`.
- Call `Chart.Inject(...)` before creating the Chart.
- Inject the module required by every configured series type.
- Inject the module required by every configured axis type.
- Inject `DataEditing` when drag editing is enabled.
- Inject `Zoom` when zooming and panning are enabled.
- Use `dataSource` to bind local arrays or `DataManager`.
- Use `xName` to map X-values.
- Use `yName` to map numeric Y-values.
- Ensure that mapped fields remain consistent after updates.
- Ensure that mapped Y-values are finite numbers.
- Use JavaScript `Date` objects with DateTime axes.
- Assign the updated collection to `series[index].dataSource`.
- Call `refresh()` after applying all required changes.
- Apply related changes before calling `refresh()`.
- Avoid refreshing after every individual property assignment.
- Prefer immutable array updates when practical.
- Validate a point before adding it.
- Validate an index before updating or deleting a point.
- Retain a fixed-size window for real-time data.
- Disable animation for frequently updated charts.
- Avoid rendering a data label for every point in a dense series.
- Reduce real-time update frequency when necessary.
- Prevent overlapping API polling requests.
- Handle failed HTTP responses.
- Validate API and WebSocket payloads.
- Convert numeric strings to numbers.
- Convert date strings to JavaScript `Date` objects.
- Prefer `wss://` for secure production WebSocket connections.
- Close WebSocket connections during cleanup.
- Clear intervals and timeouts during cleanup.
- Remove application-owned event listeners during cleanup.
- Use `series.dragSettings.enable` for point drag editing.
- Use `dragSettings.minY` and `dragSettings.maxY` to restrict editing.
- Use `dragComplete` to save a final edited value.
- Do not expect `pointRender` to enable point editing.
- Do not use a document-level context-menu handler to guess the selected point.
- Use `pointClick` to identify the selected point.
- Provide a keyboard-accessible Delete button.
- Use an ARIA live region to announce important edit results.
- Use `enableCanvas` for data-intensive scenarios only after validating required features.
- The default rendering mode is SVG.
- Zooming and panning are not virtual scrolling.
- Use `legendSettings`, not `legend`.
- Use `annotations`, not `annotation`.
- Disable unnecessary tooltips, markers, labels, legends, and animations for large datasets.
- Aggregate or filter dense datasets before binding.
- Document whether aggregation is fixed-size or calendar-aware.
- Do not claim that fixed groups of seven records always represent calendar weeks.
- Do not assign a URL string directly to `series.dataSource`.
- Use `DataManager` with an appropriate adaptor for remote binding.
- Alternatively, use `fetch` and assign the transformed result.
- Do not send arbitrary raw SQL from browser code.
- Use defined server request contracts.
- Validate requests and parameterize database queries on the server.
- Do not parse general CSV files with only `split(',')`.
- Use a validated CSV parser for quoted, escaped, or multiline CSV data.
- Ensure that the Chart container exists and has a valid height.
- Use either the constructor target or `appendTo`.
- Do not attach the same Chart instance twice.
- Call `chart.destroy()` when the Chart is permanently removed.