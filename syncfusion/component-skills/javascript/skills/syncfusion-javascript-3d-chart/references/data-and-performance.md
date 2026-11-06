# Data Handling & Performance for 3D Charts

## Table of Contents

- [Data Binding Fundamentals](#data-binding-fundamentals)
  - [Static Data Binding](#static-data-binding)
  - [Property Mapping](#property-mapping)
  - [Remote Data Binding](#remote-data-binding)
- [Dynamic Data Updates](#dynamic-data-updates)
  - [Replacing the Data Source](#replacing-the-data-source)
  - [Adding and Removing Data Points](#adding-and-removing-data-points)
- [Real-Time Chart Updates](#real-time-chart-updates)
  - [Continuous Data Updates](#continuous-data-updates)
  - [WebSocket Integration](#websocket-integration)
- [Loading Large Datasets](#loading-large-datasets)
  - [Server-Side Data Loading](#server-side-data-loading)
  - [Client-Side Pagination](#client-side-pagination)
- [Performance Optimization](#performance-optimization)
  - [Disable Animation](#disable-animation)
  - [Limit Visible Points](#limit-visible-points)
  - [Preprocess Data](#preprocess-data)
  - [Avoid Unnecessary Refreshes](#avoid-unnecessary-refreshes)
- [Working with Various Data Sources](#working-with-various-data-sources)
  - [REST API](#rest-api)
  - [CSV Data](#csv-data)
  - [Database Query Results](#database-query-results)
- [Practical Examples](#practical-examples)
  - [Live Sales Chart](#live-sales-chart)
  - [Large Dataset with Pagination](#large-dataset-with-pagination)
  - [Remote Data with DataManager](#remote-data-with-datamanager)
- [Troubleshooting](#troubleshooting)
  - [Chart Is Not Rendering](#chart-is-not-rendering)
  - [Chart Is Not Updating](#chart-is-not-updating)
  - [Remote Data Is Not Displayed](#remote-data-is-not-displayed)
  - [CSV Values Are Not Rendering Correctly](#csv-values-are-not-rendering-correctly)
  - [Performance Degrades with Large Data](#performance-degrades-with-large-data)
  - [Memory Usage Continues to Increase](#memory-usage-continues-to-increase)
- [Next Steps](#next-steps)


Learn how to bind local and remote data, update EJ2 3D Charts dynamically, and improve rendering performance when working with frequently changing or large datasets.

## Data Binding Fundamentals

The EJ2 3D Chart accepts local arrays and remote data sources through the series `dataSource` property. Fields in the data source are mapped to the chart through the `xName` and `yName` properties.

The module required by the configured series type must be injected before creating the chart. When category values are used on the horizontal axis, the `Category3D` module must also be injected.

### Static Data Binding

Bind a local array to the series through `dataSource`.

**TypeScript:**

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D
);

interface SalesData {
  month: string;
  sales: number;
}

const data: SalesData[] = [
  { month: 'Jan', sales: 35 },
  { month: 'Feb', sales: 28 },
  { month: 'Mar', sales: 34 }
];

const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: data,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

**JavaScript:**

```javascript
ej.charts.Chart3D.Inject(
  ej.charts.ColumnSeries3D,
  ej.charts.Category3D
);

var data = [
  { month: 'Jan', sales: 35 },
  { month: 'Feb', sales: 28 },
  { month: 'Mar', sales: 34 }
];

var chart = new ej.charts.Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: data,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

### Property Mapping

Use `xName` and `yName` to identify the fields that contain the X-value and Y-value for each data point.

```typescript
interface ProductData {
  productName: string;
  totalSales: number;
}

const data: ProductData[] = [
  { productName: 'Laptop', totalSales: 45 },
  { productName: 'Tablet', totalSales: 32 },
  { productName: 'Phone', totalSales: 58 }
];

const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: data,
      xName: 'productName',
      yName: 'totalSales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

In this example:

- `productName` provides the category displayed on the horizontal axis.
- `totalSales` provides the numeric value displayed on the vertical axis.
- `ColumnSeries3D` renders the data as a 3D column series.
- `Category3D` processes the category values on the horizontal axis.

### Remote Data Binding

Use `DataManager` to bind data from a remote service. A `Query` can be assigned to the series to filter, sort, or limit the records requested from the service.

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D
} from '@syncfusion/ej2-charts';
import {
  DataManager,
  Query,
  WebApiAdaptor
} from '@syncfusion/ej2-data';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D
);

const dataManager: DataManager = new DataManager({
  url: '/api/orders',
  adaptor: new WebApiAdaptor(),
  crossDomain: true
});

const query: Query = new Query()
  .select(['CustomerID', 'Freight'])
  .take(20);

const chart: Chart3D = new Chart3D({
  title: 'Order Freight',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Customer'
  },
  primaryYAxis: {
    title: 'Freight'
  },
  series: [
    {
      dataSource: dataManager,
      query,
      xName: 'CustomerID',
      yName: 'Freight',
      type: 'Column',
      name: 'Freight'
    }
  ]
});

chart.appendTo('#chart');
```

## Dynamic Data Updates

The data assigned to a series can be replaced or modified after the chart has been created.

Call `refresh()` after changing the data source so the chart processes and renders the updated values. Assigning a new array or updating array values followed by `refresh()` is the supported general update pattern.

### Replacing the Data Source

**TypeScript:**

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D
);

interface SalesData {
  month: string;
  sales: number;
}

const initialData: SalesData[] = [
  { month: 'Jan', sales: 35 },
  { month: 'Feb', sales: 28 },
  { month: 'Mar', sales: 34 }
];

const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: initialData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');

const newData: SalesData[] = [
  { month: 'Jan', sales: 40 },
  { month: 'Feb', sales: 35 },
  { month: 'Mar', sales: 48 }
];

chart.series[0].dataSource = newData;
chart.refresh();
```

**JavaScript:**

```javascript
ej.charts.Chart3D.Inject(
  ej.charts.ColumnSeries3D,
  ej.charts.Category3D
);

var initialData = [
  { month: 'Jan', sales: 35 },
  { month: 'Feb', sales: 28 },
  { month: 'Mar', sales: 34 }
];

var chart = new ej.charts.Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: initialData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');

var newData = [
  { month: 'Jan', sales: 40 },
  { month: 'Feb', sales: 35 },
  { month: 'Mar', sales: 48 }
];

chart.series[0].dataSource = newData;
chart.refresh();
```

### Adding and Removing Data Points

When using a local array, add or remove data points through standard array operations and refresh the chart once after all changes are complete.

```typescript
interface SalesData {
  month: string;
  sales: number;
}

const chartData: SalesData[] =
  chart.series[0].dataSource as SalesData[];

chartData.push({
  month: 'Apr',
  sales: 42
});

if (chartData.length > 6) {
  chartData.shift();
}

chart.refresh();
```

To remove a specific data point:

```typescript
const chartData: SalesData[] =
  chart.series[0].dataSource as SalesData[];

const pointIndex: number = chartData.findIndex(
  (item: SalesData) => item.month === 'Feb'
);

if (pointIndex !== -1) {
  chartData.splice(pointIndex, 1);
  chart.refresh();
}
```

Avoid calling `refresh()` after every individual array operation. Complete the required changes first, and then call `refresh()` once.

## Real-Time Chart Updates

Real-time charts periodically update their series data to display values received from timers, devices, services, or streaming connections.

A 3D Chart performs a complete visual update when `refresh()` is called. Keep the visible data window small and use an appropriate update interval to avoid unnecessary rendering work.

### Continuous Data Updates

The following example maintains a maximum of 20 visible data points.

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D
);

interface LiveData {
  label: string;
  value: number;
}

const liveData: LiveData[] = [];
const maximumVisiblePoints: number = 20;
let counter: number = 1;

const chart: Chart3D = new Chart3D({
  title: 'Live Data',
  primaryXAxis: {
    valueType: 'Category',
    labelRotation: -45
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 100,
    interval: 20
  },
  series: [
    {
      dataSource: liveData,
      xName: 'label',
      yName: 'value',
      type: 'Column',
      animation: {
        enable: false
      }
    }
  ]
});

chart.appendTo('#chart');

const updateInterval: number = window.setInterval(() => {
  liveData.push({
    label: `Point ${counter}`,
    value: Math.round(Math.random() * 100)
  });

  if (liveData.length > maximumVisiblePoints) {
    liveData.shift();
  }

  chart[
Source: liveData,
Name: 'label',
Name: 'value',
: 'Column',
: {
: false
To('#chart')w.addEventListener('beforeunload', () => {
  window.clearInterval(updateInterval);
  chart.destroy();
});
```

### WebSocket Integration

The following example validates incoming WebSocket data before adding it to the chart.

```typescript
interface StreamData {
  category: string;
  value: number;
}

const streamData: StreamData[] = [];
const maximumVisiblePoints: number = 50;

const socket: WebSocket = new WebSocket(
  'wss://your-server.example/data'
);

socket.addEventListener('message', (event: MessageEvent) => {
  try {
    const receivedData: unknown = JSON.parse(
      String(event.data)
    );

    if (
      typeof receivedData === 'object' &&
      receivedData !== null &&
      'category' in receivedData &&
      'value' in receivedData &&
      typeof receivedData.category === 'string' &&
      typeof receivedData.value === 'number'
    ) {
      streamData.push({
        category: receivedData.category,
        value: receivedData.value
      });

      if (streamData.length > maximumVisiblePoints) {
        streamData.shift();
      }

      chart.series[0].dataSource = streamData;
      chart.refresh();
    }
  } catch (error: unknown) {
    console.error(
      'The WebSocket message could not be processed.',
      error
    );
  }
});

socket.addEventListener('error', () => {
  console.error('The WebSocket connection failed.');
});

window.addEventListener('beforeunload', () => {
  socket.close();
  chart.destroy();
});
```

Use `wss://` instead of `ws://` when the application is served over HTTPS.

## Loading Large Datasets

Rendering a very large number of 3D elements simultaneously can reduce responsiveness and make the visualization difficult to understand.

For large datasets:

- Request only the records required for the current view.
- Aggregate detailed records before binding them.
- Use paging to limit visible points.
- Disable animation.
- Avoid frequent full-chart refreshes.
- Cancel outdated network requests.
- Avoid keeping duplicate copies of large datasets in memory.

### Server-Side Data Loading

Use server-side pagination when the complete dataset should not be loaded into browser memory.

```typescript
interface SalesData {
  category: string;
  value: number;
}

interface SalesResponse {
  items: SalesData[];
  totalCount: number;
}

const pageSize: number = 25;
let currentPage: number = 0;
let currentRequest: AbortController | null = null;

async function loadPage(pageIndex: number): Promise<void> {
  currentRequest?.abort();
  currentRequest = new AbortController();

  try {
    const response: Response = await fetch(
      `/api/sales?page=${pageIndex}&pageSize=${pageSize}`,
      {
        signal: currentRequest.signal
      }
    );

    if (!response.ok) {
      throw new Error(
        `The server returned status ${response.status}.`
      );
    }

    const result: SalesResponse =
      await response.json() as SalesResponse;

    chart.series[0].dataSource = result.items;
    chart.refresh();

    currentPage = pageIndex;
  } catch (error: unknown) {
    if (
      error instanceof DOMException &&
      error.name === 'AbortError'
    ) {
      return;
    }

    console.error(
      'The chart data could not be loaded.',
      error
    );
  }
}

void loadPage(0);
```

### Client-Side Pagination

Client-side pagination is appropriate only when the complete dataset is already available in browser memory.

```typescript
interface SalesData {
  category: string;
  value: number;
}

const pageSize: number = 50;
let currentPage: number = 0;

function displayPage(pageIndex: number): void {
  const totalPages: number = Math.ceil(
    largeDataset.length / pageSize
  );

  if (pageIndex < 0 || pageIndex >= totalPages) {
    return;
  }

  const startIndex: number = pageIndex * pageSize;
  const endIndex: number = startIndex + pageSize;

  const pageData: SalesData[] = largeDataset.slice(
    startIndex,
    endIndex
  );

  chart.series[0].dataSource = pageData;
  chart.refresh();

  currentPage = pageIndex;
}
```

## Performance Optimization

### Disable Animation

Disable series animation when large datasets are displayed or when data is updated frequently.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: data,
      xName: 'category',
      yName: 'value',
      type: 'Column',
      animation: {
        enable: false
      }
    }
  ]
});

chart.appendTo('#chart');
```

### Limit Visible Points

Display only the number of points users can meaningfully inspect.

```typescript
const maximumVisiblePoints: number = 50;

const visibleData: SalesData[] = completeData.slice(
  Math.max(0, completeData.length - maximumVisiblePoints)
);

chart.series[0].dataSource = visibleData;
chart.refresh();
```

For detailed datasets, consider aggregating records before binding them.

```typescript
interface Transaction {
  category: string;
  amount: number;
}

interface AggregatedData {
  category: string;
  value: number;
}

const totals: Map<string, number> = new Map();

transactions.forEach((transaction: Transaction) => {
  const currentValue: number =
    totals.get(transaction.category) ?? 0;

  totals.set(
    transaction.category,
    currentValue + transaction.amount
  );
});

const aggregatedData: AggregatedData[] = Array.from(
  totals,
  ([category, value]: [string, number]) => ({
    category,
    value
  })
);

chart.series[0].dataSource = aggregatedData;
chart.refresh();
```

### Preprocess Data

Complete calculations before assigning data to the chart.

```typescript
interface RawData {
  date: Date;
  amount: number;
  quantity: number;
}

interface ProcessedData {
  dateLabel: string;
  value: number;
}

const processedData: ProcessedData[] = rawData.map(
  (item: RawData): ProcessedData => ({
    dateLabel: item.date.toLocaleDateString(),
    value: calculateComplexMetric(
      item.amount,
      item.quantity
    )
  })
);

const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: processedData,
      xName: 'dateLabel',
      yName: 'value',
      type: 'Column',
      animation: {
        enable: false
      }
    }
  ]
});

chart.appendTo('#chart');
```

This approach keeps data transformation separate from chart creation and prevents repeated calculations during chart updates.

### Avoid Unnecessary Refreshes

Do not refresh the chart after every minor update when multiple data changes can be applied together.

```typescript
const chartData: SalesData[] =
  chart.series[0].dataSource as SalesData[];

chartData.push({
  month: 'Apr',
  sales: 42
});

chartData.push({
  month: 'May',
  sales: 46
});

if (chartData.length > 12) {
  chartData.splice(0, chartData.length - 12);
}

chart.refresh();
```

When updates arrive more frequently than the chart should render, batch them and refresh at a controlled interval.

```typescript
const pendingData: SalesData[] = [];
let refreshScheduled: boolean = false;

function queueDataPoint(point: SalesData): void {
  pendingData.push(point);

  if (refreshScheduled) {
    return;
  }

  refreshScheduled = true;

  window.setTimeout(() => {
    chartData.push(...pendingData);
    pendingData.length = 0;

    if (chartData.length > 50) {
      chartData.splice(0, chartData.length - 50);
    }

    chart.series[0].dataSource = chartData;
    chart.refresh();

    refreshScheduled = false;
  }, 250);
}
```

## Working with Various Data Sources

### REST API

Create the chart before starting the request so loading and error states can be displayed in the same chart container.

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D
);

interface SalesData {
  month: string;
  sales: number;
}

const chart: Chart3D = new Chart3D({
  title: 'Loading Sales Data...',
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: [],
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      animation: {
        enable: false
      }
    }
  ]
});

chart.appendTo('#chart');

async function loadChartData(): Promise<void> {
  try {
    const response: Response = await fetch('/api/sales');

    if (!response.ok) {
      throw new Error(
        `The server returned status ${response.status}.`
      );
    }

    const data: SalesData[] =
      await response.json() as SalesData[];

    chart.series[0].dataSource = data;
    chart.title = 'Sales Report';
    chart.refresh();
  } catch (error: unknown) {
    chart.title = 'Unable to Load Sales Data';
    chart.refresh();

    console.error(
      'Failed to load chart data.',
      error
    );
  }
}

void loadChartData();
```

### CSV Data

A basic `split(',')` parser does not correctly process quoted fields, embedded commas, escaped quotation marks, or multiline values.

Use a production-ready CSV parser when external or complex CSV files must be supported. The following implementation is suitable only for simple CSV text without quoted commas or multiline fields.

```typescript
interface CsvSalesData {
  month: string;
  sales: number;
}

function parseSimpleCsv(csvText: string): CsvSalesData[] {
  const normalizedText: string = csvText
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim();

  if (!normalizedText) {
    return [];
  }

  const lines: string[] = normalizedText.split('\n');
  const headers: string[] = lines[0]
    .split(',')
    .map((header: string) => header.trim());

  const monthIndex: number = headers.indexOf('month');
  const salesIndex: number = headers.indexOf('sales');

  if (monthIndex === -1 || salesIndex === -1) {
    throw new Error(
      'The CSV data must contain month and sales columns.'
    );
  }

  return lines
    .slice(1)
    .filter((line: string) => line.trim().length > 0)
    .map((line: string): CsvSalesData => {
      const values: string[] = line
        .split(',')
        .map((value: string) => value.trim());

      const sales: number = Number(values[salesIndex]);

      if (!Number.isFinite(sales)) {
        throw new Error(
          `Invalid sales value: ${values[salesIndex]}`
        );
      }

      return {
        month: values[monthIndex],
        sales
      };
    });
}

const csvText: string =
  'month,sales\n' +
  'Jan,35\n' +
  'Feb,28\n' +
  'Mar,34';

const data: CsvSalesData[] = parseSimpleCsv(csvText);

const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: data,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

CSV values are strings by default. Numeric fields must be converted to numbers before they are mapped through `yName`.

### Database Query Results

Database access should occur on the server. The browser should receive a JSON response containing only the fields required by the chart.

```typescript
interface CategoryTotal {
  categoryName: string;
  totalValue: number;
}

async function loadDatabaseResults(): Promise<void> {
  try {
    const response: Response = await fetch(
      '/api/category-totals'
    );

    if (!response.ok) {
      throw new Error(
        `The server returned status ${response.status}.`
      );
    }

    const databaseQueryResults: CategoryTotal[] =
      await response.json() as CategoryTotal[];

    chart.series[0].dataSource = databaseQueryResults;
    chart.refresh();
  } catch (error: unknown) {
    console.error(
      'The database results could not be loaded.',
      error
    );
  }
}
```

The corresponding series mapping is:

```typescript
series: [
  {
    dataSource: [],
    xName: 'categoryName',
    yName: 'totalValue',
    type: 'Column'
  }
]
```

## Practical Examples

### Live Sales Chart

The following complete TypeScript example updates the chart every five seconds and maintains a maximum of ten visible points.

**index.ts:**

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D,
  Tooltip3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D,
  Tooltip3D
);

interface LiveSalesData {
  time: string;
  sales: number;
}

const chartData: LiveSalesData[] = [
  { time: '09:00', sales: 100 },
  { time: '09:30', sales: 120 }
];

const maximumVisiblePoints: number = 10;

const chart: Chart3D = new Chart3D({
  title: 'Live Sales',
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  wallColor: 'transparent',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Time',
    labelRotation: -45
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 250,
    interval: 50,
    title: 'Sales'
  },
  tooltip: {
    enable: true,
    format: '${point.x}: ${point.y}'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'time',
      yName: 'sales',
      type: 'Column',
      name: 'Sales',
      animation: {
        enable: false
      }
    }
  ]
});

chart.appendTo('#chart');

const updateInterval: number = window.setInterval(() => {
  const currentTime: string =
    new Date().toLocaleTimeString();

  const currentSales: number = Math.round(
    100 + Math.random() * 100
  );

  chartData.push({
    time: currentTime,
    sales: currentSales
  });

  if (chartData.length > maximumVisiblePoints) {
    chartData.shift();
  }

  chart.series[0].dataSource = chartData;
  chart.refresh();
}, 5000);

window.addEventListener('beforeunload', () => {
  window.clearInterval(updateInterval);
  chart.destroy();
});
```

**index.html:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >
  <title>Live Sales 3D Chart</title>
</head>
<body>
  <div id="chart" style="height: 450px;"></div>
  <script src="index.js"></script>
</body>
</html>
```

### Large Dataset with Pagination

The following example displays only 50 records at a time.

**index.ts:**

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D
);

interface LargeDataItem {
  category: string;
  value: number;
}

const largeDataset: LargeDataItem[] = Array.from(
  { length: 1000 },
  (_item: unknown, index: number): LargeDataItem => ({
    category: `Item ${index + 1}`,
    value: Math.round(Math.random() * 100)
  })
);

const pageSize: number = 50;
let currentPage: number = 0;

const pageStatusElement: HTMLElement | null =
  document.getElementById('page-status');

const previousButton: HTMLButtonElement | null =
  document.getElementById(
    'previous-button'
  ) as HTMLButtonElement | null;

const nextButton: HTMLButtonElement | null =
  document.getElementById(
    'next-button'
  ) as HTMLButtonElement | null;

const chart: Chart3D = new Chart3D({
  title: 'Large Dataset',
  primaryXAxis: {
    valueType: 'Category',
    labelRotation: -45
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 100,
    interval: 20
  },
  series: [
    {
      dataSource: [],
      xName: 'category',
      yName: 'value',
      type: 'Column',
      animation: {
        enable: false
      }
    }
  ]
});

chart.appendTo('#chart');

function displayPage(pageIndex: number): void {
  const totalPages: number = Math.ceil(
    largeDataset.length / pageSize
  );

  if (pageIndex < 0 || pageIndex >= totalPages) {
    return;
  }

  const startIndex: number = pageIndex * pageSize;
  const endIndex: number = startIndex + pageSize;

  chart.series[0].dataSource = largeDataset.slice(
    startIndex,
    endIndex
  );

  chart.refresh();
  currentPage = pageIndex;

  if (pageStatusElement) {
    pageStatusElement.textContent =
      `Page ${currentPage + 1} of ${totalPages}`;
  }

  if (previousButton) {
    previousButton.disabled = currentPage === 0;
  }

  if (nextButton) {
    nextButton.disabled =
      currentPage >= totalPages - 1;
  }
}

previousButton?.addEventListener('click', () => {
  displayPage(currentPage - 1);
});

nextButton?.addEventListener('click', () => {
  displayPage(currentPage + 1);
});

displayPage(0);
```

**index.html:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >
  <title>Paginated 3D Chart</title>
</head>
<body>
  <div id="chart" style="height: 450px;"></div>

  <div class="pagination-controls">
    <button id="previous-button" type="button">
      Previous
    </button>

    <span id="page-status"></span>

    <button id="next-button" type="button">
      Next
    </button>
  </div>

  <script src="index.js"></script>
</body>
</html>
```

### Remote Data with DataManager

The following example binds remote data through `DataManager` and limits the query to 20 records.

**index.ts:**

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D,
  Tooltip3D
} from '@syncfusion/ej2-charts';
import {
  DataManager,
  Query,
  WebApiAdaptor
} from '@syncfusion/ej2-data';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D,
  Tooltip3D
);

const dataManager: DataManager = new DataManager({
  url: '/api/orders',
  adaptor: new WebApiAdaptor(),
  crossDomain: true
});

const query: Query = new Query()
  .select(['CustomerID', 'Freight'])
  .take(20);

const chart: Chart3D = new Chart3D({
  title: 'Customer Freight',
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  wallColor: 'transparent',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Customer',
    labelRotation: -45
  },
  primaryYAxis: {
    title: 'Freight'
  },
  tooltip: {
    enable: true,
    format:
      '<b>${point.x}</b><br>' +
      'Freight: ${point.y}'
  },
  series: [
    {
      dataSource: dataManager,
      query,
      xName: 'CustomerID',
      yName: 'Freight',
      type: 'Column',
      name: 'Freight',
      animation: {
        enable: false
      }
    }
  ]
});

chart.appendTo('#chart');
```

**index.html:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >
  <title>Remote Data 3D Chart</title>
</head>
<body>
  <div id="chart" style="height: 450px;"></div>
  <script src="index.js"></script>
</body>
</html>
```

## Troubleshooting

### Chart Is Not Rendering

- Confirm that the target element exists before calling `appendTo`.
- Confirm that the chart container has a valid height.
- Import and inject the module required by the configured series type.
- Inject `Category3D` when using a category axis.
- Ensure that `xName` and `yName` match fields in the data source.
- Confirm that Y-values are valid numbers.

### Chart Is Not Updating

- Assign the updated array to `chart.series[0].dataSource`.
- Call `chart.refresh()` after completing the data changes.
- Confirm that the updated data uses the same field names configured through `xName` and `yName`.
- Check the browser console for runtime errors.
- Avoid replacing the chart variable with an unrelated object.
- Do not call `destroy()` before applying the update.

### Remote Data Is Not Displayed

- Confirm that the request URL is correct.
- Check the browser network panel for HTTP errors.
- Verify that the server response contains fields matching `xName` and `yName`.
- Configure the appropriate `DataManager` adaptor.
- Confirm that cross-origin requests are permitted when the API uses another origin.
- Verify that authentication headers or cookies are available when the endpoint is protected.

### CSV Values Are Not Rendering Correctly

- Convert numeric CSV values from strings to numbers.
- Remove empty rows.
- Normalize line endings.
- Validate required column names.
- Use a production-ready parser for quoted or multiline CSV values.
- Reject invalid numeric values instead of passing `NaN` to the chart.

### Performance Degrades with Large Data

- Disable animation.
- Reduce the number of simultaneously visible points.
- Aggregate records before binding them.
- Use server-side pagination.
- Avoid rendering thousands of 3D elements at once.
- Increase the interval between real-time updates.
- Batch multiple data changes into one refresh.
- Avoid recreating the entire chart for every update.

### Memory Usage Continues to Increase

- Limit the length of continuously updated arrays.
- Clear active intervals and timeouts when they are no longer required.
- Close WebSocket connections when leaving the page.
- Abort pending network requests when they become obsolete.
- Call `chart.destroy()` when the chart is permanently removed.
- Remove event listeners registered outside the chart.
- Avoid retaining unnecessary copies of large datasets.

## Next Steps

- **3D settings:** See `3d-settings-and-rotation.md`.
- **Interactions:** See `interaction-features-3d.md`.
- **Accessibility and export:** See `accessibility-export.md`.
