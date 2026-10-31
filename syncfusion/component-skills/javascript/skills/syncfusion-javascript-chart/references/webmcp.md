# WebMCP Chart Generation for TypeScript and JavaScript

## Table of Contents

- [Purpose](#purpose)
- [Required language rules](#required-language-rules)
- [Shared WebMCP rules](#shared-webmcp-rules)
- [How to use WebMCP in TypeScript](#how-to-use-webmcp-in-typescript)
- [How to use WebMCP in browser JavaScript](#how-to-use-webmcp-in-browser-javascript)
- [Complete TypeScript feature-tour sample](#complete-typescript-feature-tour-sample)
- [Complete browser JavaScript feature-tour sample](#complete-browser-javascript-feature-tour-sample)
- [Register all built-in tools](#register-all-built-in-tools)
- [Register specific built-in tools](#register-specific-built-in-tools)
- [Add a custom WebMCP tool](#add-a-custom-webmcp-tool)
- [Use built-in and custom tools together](#use-built-in-and-custom-tools-together)
- [Confirmation, cancellation, and validation](#confirmation-cancellation-and-validation)
- [Direct tool execution](#direct-tool-execution)
- [Exact built-in tool names](#exact-built-in-tool-names)
- [Tool-by-tool execution, dependencies, and setup](#tool-by-tool-execution-dependencies-and-setup)
- [Custom WebMCP requirements](#custom-webmcp-requirements)
- [Required generation scenarios](#required-generation-scenarios)
- [Final copy rules](#final-copy-rules)
- [Validation checklist](#validation-checklist)

## Purpose

Use this reference to generate complete EJ2 Chart WebMCP samples in package-based TypeScript or global browser JavaScript. Preserve the documented WebMCP behavior. The setup differs by language and loading model, so never mix the two patterns.

## Required language rules

### TypeScript

- Import `Chart` and every available Chart feature module from `@syncfusion/ej2-charts`.
- Call `Chart.Inject(...)` with every imported feature module.
- Always import and inject `WebMcpChart`.
- Do not reduce imports or injections based only on the initial series type or enabled features.
- Use typed interfaces for sample data where practical.
- Use package imports. Do not use the global `ej.charts.Chart` constructor.

### Browser JavaScript

- Do not generate ES module imports.
- Do not call `Chart.Inject(...)` or `ej.charts.Chart.Inject(...)`.
- Load the EJ2 stylesheet and all-in-one browser script before the sample script.
- Create the Chart with `new ej.charts.Chart(...)`.
- Do not mix package-based TypeScript setup with global JavaScript setup.

## Shared WebMCP rules

- Set `enableWebMcp: true`.
- Give the Chart container a stable, unique ID.
- Add `webMcpSettings` when a prefix, selected tools, custom tools, or exposure controls are required.
- Omit `webMcpSettings.tools` to register all built-in tools.
- Use exact, case-sensitive names to register selected built-in tools.
- Use the same `webMcpSettings.tools` property for custom tools. There is no separate `customTools` property.
- To combine built-in and custom tools, retrieve built-in tool objects with `getWebMcpTools()`, append custom tool objects, and assign the combined array to `webMcpSettings.tools`.
- Registration is automatic after rendering.
- Never call `registerWebMcpTools()` and never generate a registration button.
- Use `getWebMcpTools()` for diagnostics, testing, direct execution, or retrieving built-in tool objects before combining them with custom tools.
- Use `beforeWebMcpToolExecute` only for validation, cancellation, auditing, or confirmation control.
- Add `exposedTo` only when the host environment supplies valid exposure values. Do not invent them.
- Do not generate fake model-context UI, simulated results, or fabricated tool responses.

## How to use WebMCP in TypeScript

### Step 1: Install the Chart package

```bash
npm install @syncfusion/ej2-charts
```

### Step 2: Import and inject the required modules

```ts
import { Chart, LineSeries, WebMcpChart } from '@syncfusion/ej2-charts';

Chart.Inject(LineSeries, WebMcpChart);
```

For unrestricted AI-generated WebMCP samples, use the complete import and injection list in the feature-tour sample.

### Step 3: Add the Chart container

```html
<div id="sales-chart"></div>
```

### Step 4: Enable WebMCP and append the Chart

```ts
const chart: Chart = new Chart({
  enableWebMcp: true,
  webMcpSettings: { name: 'salesChart' },
  series: [{ type: 'Line', dataSource: [{ x: 1, y: 20 }], xName: 'x', yName: 'y' }]
});

chart.appendTo('#sales-chart');
```

Omitting `tools` registers all built-in tools automatically after rendering.

## How to use WebMCP in browser JavaScript

### Step 1: Load EJ2 styles and the all-in-one browser script

```html
<script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
```

### Step 2: Add the Chart container

```html
<div id="sales-chart"></div>
```

### Step 3: Create and append the Chart

```html
<script>
  var chart = new ej.charts.Chart({
    enableWebMcp: true,
    webMcpSettings: { name: 'salesChart' },
    series: [{ type: 'Line', dataSource: [{ x: 1, y: 20 }], xName: 'x', yName: 'y' }]
  });

  chart.appendTo('#sales-chart');
</script>
```

The all-in-one browser build supplies the modules globally. Do not generate imports or injection calls.

## Complete TypeScript feature-tour sample

```ts
import {
  Chart, AccumulationDistributionIndicator, AreaSeries, AtrIndicator, BarSeries, BollingerBands, BoxAndWhiskerSeries,
  BubbleSeries, CandleSeries, Category, ChartAnnotation, ColumnSeries, Crosshair, DataEditing, DataLabel, DateTime,
  DateTimeCategory, EmaIndicator, ErrorBar, Export, Highlight, HiloOpenCloseSeries, HiloSeries, HistogramSeries, LastValueLabel,
  Legend, LineSeries, Logarithmic, MacdIndicator, MomentumIndicator, MultiColoredAreaSeries, MultiColoredLineSeries,
  MultiLevelLabel, ParetoSeries, PolarSeries, RadarSeries, RangeAreaSeries, RangeColumnSeries, RangeStepAreaSeries,
  RsiIndicator, ScatterSeries, ScrollBar, Selection, SmaIndicator, SplineAreaSeries, SplineRangeAreaSeries,
  SplineSeries, StackingArea100Series, StackingAreaSeries, StackingBar100Series, StackingBarSeries,
  StackingColumn100Series, StackingColumnSeries, StackingLine100Series, StackingLineSeries, StackingStepAreaSeries,
  StepAreaSeries, StepLineSeries, StochasticIndicator, StripLine, TmaIndicator, Tooltip, Trendlines, WaterfallSeries,
  WebMcpChart, Zoom
} from '@syncfusion/ej2-charts';

Chart.Inject(
  AccumulationDistributionIndicator, AreaSeries, AtrIndicator, BarSeries, BollingerBands, BoxAndWhiskerSeries,
  BubbleSeries, CandleSeries, Category, ChartAnnotation, ColumnSeries, Crosshair, DataEditing, DataLabel, DateTime,
  DateTimeCategory, EmaIndicator, ErrorBar, Export, Highlight, HiloOpenCloseSeries, HiloSeries, HistogramSeries, LastValueLabel,
  Legend, LineSeries, Logarithmic, MacdIndicator, MomentumIndicator, MultiColoredAreaSeries, MultiColoredLineSeries,
  MultiLevelLabel, ParetoSeries, PolarSeries, RadarSeries, RangeAreaSeries, RangeColumnSeries, RangeStepAreaSeries,
  RsiIndicator, ScatterSeries, ScrollBar, Selection, SmaIndicator, SplineAreaSeries, SplineRangeAreaSeries,
  SplineSeries, StackingArea100Series, StackingAreaSeries, StackingBar100Series, StackingBarSeries,
  StackingColumn100Series, StackingColumnSeries, StackingLine100Series, StackingLineSeries, StackingStepAreaSeries,
  StepAreaSeries, StepLineSeries, StochasticIndicator, StripLine, TmaIndicator, Tooltip, Trendlines, WaterfallSeries,
  WebMcpChart, Zoom
);

interface ChartData {
  x: number;
  y: number;
  comparison: number;
}

const chartData: ChartData[] = [
  { x: 1, y: 32, comparison: 24 },
  { x: 2, y: 48, comparison: 36 },
  { x: 3, y: 42, comparison: 34 },
  { x: 4, y: 65, comparison: 52 },
  { x: 5, y: 58, comparison: 46 },
  { x: 6, y: 74, comparison: 61 }
];

const allToolNames: string[] = [
  'inspectChart', 'getSeriesData', 'addChartSeries', 'removeChartSeries', 'clearChartSeries',
  'updateChartAnnotation', 'showChartTooltip', 'showChartCrosshair', 'exportChart', 'printChart',
  'updateChartDataSource', 'toggleChartSeriesVisibility', 'configureChartZoom', 'resetChartZoom',
  'selectChartPoints', 'clearChartSelection', 'addChartAxis', 'updateChartAxis', 'updateChartTitle',
  'hideChartTooltip', 'hideChartCrosshair', 'updateChartProperties', 'updateChartSeries', 'updateChartPoint',
  'appendChartData', 'removeChartPoints', 'getChartPoint', 'getSelectedChartData', 'getChartAxes',
  'getChartIndicators', 'getChartStriplines', 'removeChartAxis', 'getChartAnnotations', 'addChartAnnotation',
  'removeChartAnnotation', 'animateChart', 'getChartLegend'
];

const chart: Chart = new Chart({
  enableWebMcp: true,
  enableExport: true,
  webMcpSettings: { name: 'featureTourChart', tools: allToolNames },
  beforeWebMcpToolExecute: (args: any): void => {
    if (args.toolName.endsWith('_printChart')) {
      args.showConfirmationDialog = true;
    }
  },
  dataSource: chartData,
  title: 'Chart WebMCP Feature Tour',
  primaryXAxis: { title: 'Sample index', minimum: 0, maximum: 8, interval: 1 },
  primaryYAxis: {
    title: 'Value', minimum: 0, maximum: 100, interval: 20,
    stripLines: [{ start: 60, end: 80, text: 'Target range', color: '#DCFCE7', opacity: 0.5, visible: true }]
  },
  tooltip: { enable: true, shared: true },
  crosshair: { enable: true, lineType: 'Both' },
  legendSettings: { visible: true },
  zoomSettings: { enableSelectionZooming: true, enableMouseWheelZooming: true, enablePan: true },
  selectionMode: 'Point',
  annotations: [{ content: '<div>Peak value</div>', x: 6, y: 74, coordinateUnits: 'Point', region: 'Series' }],
  series: [
    { type: 'Line', xName: 'x', yName: 'y', name: 'Observed values', marker: { visible: true }, animation: { enable: false } },
    { type: 'Column', xName: 'x', yName: 'comparison', name: 'Comparison values', animation: { enable: false } }
  ]
});

chart.appendTo('#feature-tour-chart');

async function executeTool(name: string, input: Object): Promise<Object> {
  const availableTools: any[] = chart.getWebMcpTools([name]);
  const tool: any = availableTools.find((item: any): boolean => item.name === name);
  if (!tool || typeof tool.execute !== 'function') {
    throw new Error(`WebMCP tool "${name}" is unavailable.`);
  }
  return tool.execute(input);
}
```

## Complete browser JavaScript feature-tour sample

```html
<link href="https://cdn.syncfusion.com/ej2/material.css" rel="stylesheet">
<script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
<div id="feature-tour-chart"></div>
<script>
  var chartData = [
    { x: 1, y: 32, comparison: 24 }, { x: 2, y: 48, comparison: 36 },
    { x: 3, y: 42, comparison: 34 }, { x: 4, y: 65, comparison: 52 },
    { x: 5, y: 58, comparison: 46 }, { x: 6, y: 74, comparison: 61 }
  ];
  var allToolNames = [
  'inspectChart', 'getSeriesData', 'addChartSeries', 'removeChartSeries', 'clearChartSeries',
  'updateChartAnnotation', 'showChartTooltip', 'showChartCrosshair', 'exportChart', 'printChart',
  'updateChartDataSource', 'toggleChartSeriesVisibility', 'configureChartZoom', 'resetChartZoom',
  'selectChartPoints', 'clearChartSelection', 'addChartAxis', 'updateChartAxis', 'updateChartTitle',
  'hideChartTooltip', 'hideChartCrosshair', 'updateChartProperties', 'updateChartSeries', 'updateChartPoint',
  'appendChartData', 'removeChartPoints', 'getChartPoint', 'getSelectedChartData', 'getChartAxes',
  'getChartIndicators', 'getChartStriplines', 'removeChartAxis', 'getChartAnnotations', 'addChartAnnotation',
  'removeChartAnnotation', 'animateChart', 'getChartLegend'
  ];
  var chart = new ej.charts.Chart({
    enableWebMcp: true,
    enableExport: true,
    webMcpSettings: { name: 'featureTourChart', tools: allToolNames },
    beforeWebMcpToolExecute: function (args) {
      if (args.toolName.endsWith('_printChart')) args.showConfirmationDialog = true;
    },
    dataSource: chartData,
    title: 'Chart WebMCP Feature Tour',
    primaryXAxis: { title: 'Sample index', minimum: 0, maximum: 8, interval: 1 },
    primaryYAxis: {
      title: 'Value', minimum: 0, maximum: 100, interval: 20,
      stripLines: [{ start: 60, end: 80, text: 'Target range', color: '#DCFCE7', opacity: 0.5, visible: true }]
    },
    tooltip: { enable: true, shared: true },
    crosshair: { enable: true, lineType: 'Both' },
    legendSettings: { visible: true },
    zoomSettings: { enableSelectionZooming: true, enableMouseWheelZooming: true, enablePan: true },
    selectionMode: 'Point',
    series: [
      { type: 'Line', xName: 'x', yName: 'y', name: 'Observed values', marker: { visible: true } },
      { type: 'Column', xName: 'x', yName: 'comparison', name: 'Comparison values' }
    ]
  });
  chart.appendTo('#feature-tour-chart');
  async function executeTool(name, input) {
    var availableTools = chart.getWebMcpTools([name]);
    var tool = availableTools.find(function (item) { return item.name === name; });
    if (!tool || typeof tool.execute !== 'function') throw new Error('WebMCP tool "' + name + '" is unavailable.');
    return tool.execute(input);
  }
</script>
```

## Register all built-in tools

Omit `tools`.

### TypeScript

```ts
const chart: Chart = new Chart({
  enableWebMcp: true,
  webMcpSettings: { name: 'allToolsChart' },
  series: [{ type: 'Line', dataSource: [{ x: 1, y: 32 }], xName: 'x', yName: 'y' }]
});
chart.appendTo('#all-tools-chart');
```

### JavaScript

```js
var chart = new ej.charts.Chart({
  enableWebMcp: true,
  webMcpSettings: { name: 'allToolsChart' },
  series: [{ type: 'Line', dataSource: [{ x: 1, y: 32 }], xName: 'x', yName: 'y' }]
});
chart.appendTo('#all-tools-chart');
```

## Register specific built-in tools

### TypeScript

```ts
const chart: Chart = new Chart({
  enableWebMcp: true,
  webMcpSettings: {
    name: 'specificToolsChart',
    tools: ['inspectChart', 'getSeriesData', 'showChartTooltip', 'hideChartTooltip', 'updateChartDataSource']
  },
  tooltip: { enable: true },
  series: [{ type: 'Line', dataSource: [{ x: 1, y: 32 }], xName: 'x', yName: 'y' }]
});
chart.appendTo('#specific-tools-chart');
```

### JavaScript

```js
var chart = new ej.charts.Chart({
  enableWebMcp: true,
  webMcpSettings: {
    name: 'specificToolsChart',
    tools: ['inspectChart', 'getSeriesData', 'showChartTooltip', 'hideChartTooltip', 'updateChartDataSource']
  },
  tooltip: { enable: true },
  series: [{ type: 'Line', dataSource: [{ x: 1, y: 32 }], xName: 'x', yName: 'y' }]
});
chart.appendTo('#specific-tools-chart');
```

## Add a custom WebMCP tool

### TypeScript

```ts
const customTools: any[] = [{
  name: 'getHighestPoint',
  description: 'Returns the highest point from the requested Chart series.',
  inputSchema: {
    type: 'object',
    properties: { seriesIndex: { type: 'number', description: 'Zero-based series index.' } },
    required: ['seriesIndex'],
    additionalProperties: false
  },
  execute: async (input: { seriesIndex: number }): Promise<Object> => {
    if (!Number.isInteger(input.seriesIndex) || input.seriesIndex < 0) return { success: false, message: 'Provide a valid non-negative series index.' };
    const targetSeries: any = chart.series[input.seriesIndex];
    const points: any[] = targetSeries?.points || [];
    if (!targetSeries) return { success: false, message: 'The requested series does not exist.' };
    if (points.length === 0) return { success: false, message: 'The requested series has no points.' };
    const point: any = points.reduce((highest: any, current: any): any => current.yValue > highest.yValue ? current : highest);
    return { success: true, seriesIndex: input.seriesIndex, point: { index: point.index, x: point.x, y: point.yValue } };
  }
}];
const chart: Chart = new Chart({ enableWebMcp: true, webMcpSettings: { name: 'customToolsChart', tools: customTools }, series: [] });
```

### JavaScript

```js
var customTools = [{
  name: 'getHighestPoint',
  description: 'Returns the highest point from the requested Chart series.',
  inputSchema: { type: 'object', properties: { seriesIndex: { type: 'number' } }, required: ['seriesIndex'], additionalProperties: false },
  execute: async function (input) {
    if (!Number.isInteger(input.seriesIndex) || input.seriesIndex < 0) return { success: false, message: 'Provide a valid non-negative series index.' };
    var targetSeries = chart.series[input.seriesIndex];
    var points = targetSeries && targetSeries.points ? targetSeries.points : [];
    if (!targetSeries) return { success: false, message: 'The requested series does not exist.' };
    if (points.length === 0) return { success: false, message: 'The requested series has no points.' };
    var point = points.reduce(function (highest, current) { return current.yValue > highest.yValue ? current : highest; });
    return { success: true, seriesIndex: input.seriesIndex, point: { index: point.index, x: point.x, y: point.yValue } };
  }
}];
var chart = new ej.charts.Chart({ enableWebMcp: true, webMcpSettings: { name: 'customToolsChart', tools: customTools }, series: [] });
```

Custom tools must use unique names, valid JSON schemas, runtime validation, and JSON-safe output. Never return Chart instances, DOM nodes, functions, events, circular objects, or EJ2 class instances.

## Use built-in and custom tools together

Use `webMcpSettings.tools` for both selected built-in tools and application-specific custom tools. There is no separate `customTools` property.

### TypeScript

Retrieve the selected built-in tool objects after creating the Chart, append the custom tool objects, and assign the combined array through `webMcpSettings.tools`.

```ts
const selectedToolNames: string[] = ['inspectChart', 'getSeriesData'];
const chart: Chart = new Chart({
  enableWebMcp: true,
  webMcpSettings: {
    name: 'combinedToolsChart',
    tools: []
  },
  series: []
});

chart.appendTo('#combined-tools-chart');

const tools: any[] = chart.getWebMcpTools(selectedToolNames);
tools.push(...customTools);
chart.setProperties({
  webMcpSettings: {
    name: 'combinedToolsChart',
    tools
  }
}, false);
```

### Browser JavaScript

```js
var selectedToolNames = ['inspectChart', 'getSeriesData'];
var chart = new ej.charts.Chart({
  enableWebMcp: true,
  webMcpSettings: {
    name: 'combinedToolsChart',
    tools: []
  },
  series: []
});

chart.appendTo('#combined-tools-chart');

var tools = chart.getWebMcpTools(selectedToolNames);
Array.prototype.push.apply(tools, customTools);
chart.setProperties({
  webMcpSettings: {
    name: 'combinedToolsChart',
    tools: tools
  }
}, false);
```

Rules for combining built-in and custom tools:

- Do not use or generate a `customTools` property.
- Initialize `webMcpSettings.tools` with an empty array to prevent registration before the combined list is ready.
- Call `getWebMcpTools(selectedToolNames)` after the Chart instance is available.
- Append custom tool objects to the returned built-in tool array.
- Assign the combined array through `webMcpSettings.tools` by using `setProperties()`.
- Use `tools: customTools` when registering only custom tools.

## Confirmation, cancellation, and validation

```ts
beforeWebMcpToolExecute: (args: any): void => {
  if (args.toolName.endsWith('_exportChart') || args.toolName.endsWith('_printChart')) args.showConfirmationDialog = true;
  if (args.toolName.endsWith('_clearChartSeries') && !canClearSeries) args.cancel = true;
}
```

```js
beforeWebMcpToolExecute: function (args) {
  if (args.toolName.endsWith('_exportChart') || args.toolName.endsWith('_printChart')) args.showConfirmationDialog = true;
  if (args.toolName.endsWith('_clearChartSeries') && !canClearSeries) args.cancel = true;
}
```

The registered tool name may include the prefix configured through `webMcpSettings.name`, so use `endsWith()` when matching an operation. Validate IDs, series indexes, point indexes, annotation indexes, axis names, field mappings, export types, configuration objects, and application permissions.

## Direct tool execution

```ts
async function executeTool(name: string, input: Object): Promise<Object> {
  const tools: any[] = chart.getWebMcpTools([name]);
  const tool: any = tools.find((item: any): boolean => item.name === name);
  if (!tool || typeof tool.execute !== 'function') throw new Error(`WebMCP tool "${name}" is unavailable.`);
  return tool.execute(input);
}
```

```js
async function executeTool(name, input) {
  var tools = chart.getWebMcpTools([name]);
  var tool = tools.find(function (item) { return item.name === name; });
  if (!tool || typeof tool.execute !== 'function') throw new Error('WebMCP tool "' + name + '" is unavailable.');
  return tool.execute(input);
}
```

Do not add a direct-execution button unless the requested UI explicitly needs one.

## Exact built-in tool names

- `inspectChart`
- `getSeriesData`
- `addChartSeries`
- `removeChartSeries`
- `clearChartSeries`
- `updateChartAnnotation`
- `showChartTooltip`
- `showChartCrosshair`
- `exportChart`
- `printChart`
- `updateChartDataSource`
- `toggleChartSeriesVisibility`
- `configureChartZoom`
- `resetChartZoom`
- `selectChartPoints`
- `clearChartSelection`
- `addChartAxis`
- `updateChartAxis`
- `updateChartTitle`
- `hideChartTooltip`
- `hideChartCrosshair`
- `updateChartProperties`
- `updateChartSeries`
- `updateChartPoint`
- `appendChartData`
- `removeChartPoints`
- `getChartPoint`
- `getSelectedChartData`
- `getChartAxes`
- `getChartIndicators`
- `getChartStriplines`
- `removeChartAxis`
- `getChartAnnotations`
- `addChartAnnotation`
- `removeChartAnnotation`
- `animateChart`
- `getChartLegend`

## Tool-by-tool execution, dependencies, and setup

For TypeScript, import each listed module from `@syncfusion/ej2-charts` and include the same modules in `Chart.Inject(...)`. For global browser JavaScript, do not import or inject modules because the all-in-one browser script supplies them.

### 1. `inspectChart`

**TypeScript imports and injection:**

```ts
import { Chart,
  WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('inspectChart', {});
```

**Precondition:** A rendered Chart is required.

### 2. `getSeriesData`

**TypeScript imports and injection:**

```ts
import { Chart,
  LineSeries, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('getSeriesData', { seriesIndex: 0 });
```

**Precondition:** The series index must exist.

### 3. `addChartSeries`

**TypeScript imports and injection:**

```ts
import { Chart,
  AccumulationDistributionIndicator, AreaSeries, AtrIndicator, BarSeries, BollingerBands, BoxAndWhiskerSeries,
  BubbleSeries, CandleSeries, Category, ChartAnnotation, ColumnSeries, Crosshair, DataEditing, DataLabel, DateTime,
  DateTimeCategory, EmaIndicator, ErrorBar, Export, Highlight, HiloOpenCloseSeries, HiloSeries, HistogramSeries,
  Legend, LineSeries, Logarithmic, MacdIndicator, MomentumIndicator, MultiColoredAreaSeries, MultiColoredLineSeries,
  MultiLevelLabel, ParetoSeries, PolarSeries, RadarSeries, RangeAreaSeries, RangeColumnSeries, RangeStepAreaSeries,
  RsiIndicator, ScatterSeries, ScrollBar, Selection, SmaIndicator, SplineAreaSeries, SplineRangeAreaSeries,
  SplineSeries, StackingArea100Series, StackingAreaSeries, StackingBar100Series, StackingBarSeries,
  StackingColumn100Series, StackingColumnSeries, StackingLine100Series, StackingLineSeries, StackingStepAreaSeries,
  StepAreaSeries, StepLineSeries, StochasticIndicator, StripLine, TmaIndicator, Tooltip, Trendlines, WaterfallSeries,
  WebMcpChart, Zoom
} from '@syncfusion/ej2-charts';

Chart.Inject(
  AccumulationDistributionIndicator, AreaSeries, AtrIndicator, BarSeries, BollingerBands, BoxAndWhiskerSeries,
  BubbleSeries, CandleSeries, Category, ChartAnnotation, ColumnSeries, Crosshair, DataEditing, DataLabel, DateTime,
  DateTimeCategory, EmaIndicator, ErrorBar, Export, Highlight, HiloOpenCloseSeries, HiloSeries, HistogramSeries,
  Legend, LineSeries, Logarithmic, MacdIndicator, MomentumIndicator, MultiColoredAreaSeries, MultiColoredLineSeries,
  MultiLevelLabel, ParetoSeries, PolarSeries, RadarSeries, RangeAreaSeries, RangeColumnSeries, RangeStepAreaSeries,
  RsiIndicator, ScatterSeries, ScrollBar, Selection, SmaIndicator, SplineAreaSeries, SplineRangeAreaSeries,
  SplineSeries, StackingArea100Series, StackingAreaSeries, StackingBar100Series, StackingBarSeries,
  StackingColumn100Series, StackingColumnSeries, StackingLine100Series, StackingLineSeries, StackingStepAreaSeries,
  StepAreaSeries, StepLineSeries, StochasticIndicator, StripLine, TmaIndicator, Tooltip, Trendlines, WaterfallSeries,
  WebMcpChart, Zoom
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('addChartSeries', { series: { type: 'Line', dataSource: [{ x: 1, y: 20 }], xName: 'x', yName: 'y' } });
```

**Precondition:** Keep the complete TypeScript module set for unrestricted series creation.

### 4. `removeChartSeries`

**TypeScript imports and injection:**

```ts
import { Chart,
  WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('removeChartSeries', { seriesIndex: 1 });
```

**Precondition:** The series must exist; retain modules required by remaining series.

### 5. `clearChartSeries`

**TypeScript imports and injection:**

```ts
import { Chart,
  WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('clearChartSeries', {});
```

**Precondition:** Retain modules required by the initial rendered series.

### 6. `updateChartAnnotation`

**TypeScript imports and injection:**

```ts
import { Chart,
  ChartAnnotation, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  ChartAnnotation, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('updateChartAnnotation', { annotationIndex: 0, annotation: { content: '<div>Updated</div>', x: 5, y: 58 } });
```

**Precondition:** The annotation index must exist.

### 7. `showChartTooltip`

**TypeScript imports and injection:**

```ts
import { Chart,
  Tooltip, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  Tooltip, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('showChartTooltip', { seriesIndex: 0, pointIndex: 2 });
```

**Precondition:** Enable tooltip and use valid indexes.

### 8. `showChartCrosshair`

**TypeScript imports and injection:**

```ts
import { Chart,
  Crosshair, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  Crosshair, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('showChartCrosshair', { x: 250, y: 180 });
```

**Precondition:** Enable crosshair and use valid coordinates.

### 9. `exportChart`

**TypeScript imports and injection:**

```ts
import { Chart,
  Export, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  Export, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('exportChart', { type: 'PNG', fileName: 'chart-export' });
```

**Precondition:** Set enableExport to true.

### 10. `printChart`

**TypeScript imports and injection:**

```ts
import { Chart,
  Export, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  Export, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('printChart', { elementIds: 'feature-tour-chart' });
```

**Precondition:** The element ID must exist.

### 11. `updateChartDataSource`

**TypeScript imports and injection:**

```ts
import { Chart,
  LineSeries, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('updateChartDataSource', { seriesIndex: 0, dataSource: [{ x: 1, y: 40 }] });
```

**Precondition:** Data fields must match xName and yName.

### 12. `toggleChartSeriesVisibility`

**TypeScript imports and injection:**

```ts
import { Chart,
  Legend, LineSeries, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  Legend, LineSeries, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('toggleChartSeriesVisibility', { seriesIndex: 0 });
```

**Precondition:** The series must exist.

### 13. `configureChartZoom`

**TypeScript imports and injection:**

```ts
import { Chart,
  Zoom, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  Zoom, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('configureChartZoom', { zoomSettings: { enableSelectionZooming: true, enablePan: true } });
```

**Precondition:** Zoom is required.

### 14. `resetChartZoom`

**TypeScript imports and injection:**

```ts
import { Chart,
  Zoom, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  Zoom, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('resetChartZoom', {});
```

**Precondition:** Zoom is required.

### 15. `selectChartPoints`

**TypeScript imports and injection:**

```ts
import { Chart,
  Selection, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  Selection, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('selectChartPoints', { points: [{ seriesIndex: 0, pointIndex: 1 }] });
```

**Precondition:** Selection mode and indexes must be valid.

### 16. `clearChartSelection`

**TypeScript imports and injection:**

```ts
import { Chart,
  Selection, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  Selection, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('clearChartSelection', {});
```

**Precondition:** Selection is required.

### 17. `addChartAxis`

**TypeScript imports and injection:**

```ts
import { Chart,
  Category, DateTime, DateTimeCategory, Logarithmic, MultiLevelLabel, ScrollBar, StripLine, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  Category, DateTime, DateTimeCategory, Logarithmic, MultiLevelLabel, ScrollBar, StripLine, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('addChartAxis', { axis: { name: 'secondaryAxis', opposedPosition: true } });
```

**Precondition:** Use a unique axis name.

### 18. `updateChartAxis`

**TypeScript imports and injection:**

```ts
import { Chart,
  Category, DateTime, DateTimeCategory, Logarithmic, MultiLevelLabel, ScrollBar, StripLine, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  Category, DateTime, DateTimeCategory, Logarithmic, MultiLevelLabel, ScrollBar, StripLine, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('updateChartAxis', { axisName: 'primaryYAxis', axis: { maximum: 120 } });
```

**Precondition:** The axis must exist.

### 19. `updateChartTitle`

**TypeScript imports and injection:**

```ts
import { Chart,
  WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('updateChartTitle', { title: 'Updated Chart title' });
```

**Precondition:** No additional precondition.

### 20. `hideChartTooltip`

**TypeScript imports and injection:**

```ts
import { Chart,
  Tooltip, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  Tooltip, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('hideChartTooltip', {});
```

**Precondition:** Tooltip must be enabled.

### 21. `hideChartCrosshair`

**TypeScript imports and injection:**

```ts
import { Chart,
  Crosshair, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  Crosshair, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('hideChartCrosshair', {});
```

**Precondition:** Crosshair must be enabled.

### 22. `updateChartProperties`

**TypeScript imports and injection:**

```ts
import { Chart,
  AccumulationDistributionIndicator, AreaSeries, AtrIndicator, BarSeries, BollingerBands, BoxAndWhiskerSeries,
  BubbleSeries, CandleSeries, Category, ChartAnnotation, ColumnSeries, Crosshair, DataEditing, DataLabel, DateTime,
  DateTimeCategory, EmaIndicator, ErrorBar, Export, Highlight, HiloOpenCloseSeries, HiloSeries, HistogramSeries,
  Legend, LineSeries, Logarithmic, MacdIndicator, MomentumIndicator, MultiColoredAreaSeries, MultiColoredLineSeries,
  MultiLevelLabel, ParetoSeries, PolarSeries, RadarSeries, RangeAreaSeries, RangeColumnSeries, RangeStepAreaSeries,
  RsiIndicator, ScatterSeries, ScrollBar, Selection, SmaIndicator, SplineAreaSeries, SplineRangeAreaSeries,
  SplineSeries, StackingArea100Series, StackingAreaSeries, StackingBar100Series, StackingBarSeries,
  StackingColumn100Series, StackingColumnSeries, StackingLine100Series, StackingLineSeries, StackingStepAreaSeries,
  StepAreaSeries, StepLineSeries, StochasticIndicator, StripLine, TmaIndicator, Tooltip, Trendlines, WaterfallSeries,
  WebMcpChart, Zoom
} from '@syncfusion/ej2-charts';

Chart.Inject(
  AccumulationDistributionIndicator, AreaSeries, AtrIndicator, BarSeries, BollingerBands, BoxAndWhiskerSeries,
  BubbleSeries, CandleSeries, Category, ChartAnnotation, ColumnSeries, Crosshair, DataEditing, DataLabel, DateTime,
  DateTimeCategory, EmaIndicator, ErrorBar, Export, Highlight, HiloOpenCloseSeries, HiloSeries, HistogramSeries,
  Legend, LineSeries, Logarithmic, MacdIndicator, MomentumIndicator, MultiColoredAreaSeries, MultiColoredLineSeries,
  MultiLevelLabel, ParetoSeries, PolarSeries, RadarSeries, RangeAreaSeries, RangeColumnSeries, RangeStepAreaSeries,
  RsiIndicator, ScatterSeries, ScrollBar, Selection, SmaIndicator, SplineAreaSeries, SplineRangeAreaSeries,
  SplineSeries, StackingArea100Series, StackingAreaSeries, StackingBar100Series, StackingBarSeries,
  StackingColumn100Series, StackingColumnSeries, StackingLine100Series, StackingLineSeries, StackingStepAreaSeries,
  StepAreaSeries, StepLineSeries, StochasticIndicator, StripLine, TmaIndicator, Tooltip, Trendlines, WaterfallSeries,
  WebMcpChart, Zoom
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('updateChartProperties', { properties: { title: 'Updated properties', tooltip: { enable: true } } });
```

**Precondition:** Keep the complete TypeScript module set for unrestricted changes.

### 23. `updateChartSeries`

**TypeScript imports and injection:**

```ts
import { Chart,
  AccumulationDistributionIndicator, AreaSeries, AtrIndicator, BarSeries, BollingerBands, BoxAndWhiskerSeries,
  BubbleSeries, CandleSeries, Category, ChartAnnotation, ColumnSeries, Crosshair, DataEditing, DataLabel, DateTime,
  DateTimeCategory, EmaIndicator, ErrorBar, Export, Highlight, HiloOpenCloseSeries, HiloSeries, HistogramSeries,
  Legend, LineSeries, Logarithmic, MacdIndicator, MomentumIndicator, MultiColoredAreaSeries, MultiColoredLineSeries,
  MultiLevelLabel, ParetoSeries, PolarSeries, RadarSeries, RangeAreaSeries, RangeColumnSeries, RangeStepAreaSeries,
  RsiIndicator, ScatterSeries, ScrollBar, Selection, SmaIndicator, SplineAreaSeries, SplineRangeAreaSeries,
  SplineSeries, StackingArea100Series, StackingAreaSeries, StackingBar100Series, StackingBarSeries,
  StackingColumn100Series, StackingColumnSeries, StackingLine100Series, StackingLineSeries, StackingStepAreaSeries,
  StepAreaSeries, StepLineSeries, StochasticIndicator, StripLine, TmaIndicator, Tooltip, Trendlines, WaterfallSeries,
  WebMcpChart, Zoom
} from '@syncfusion/ej2-charts';

Chart.Inject(
  AccumulationDistributionIndicator, AreaSeries, AtrIndicator, BarSeries, BollingerBands, BoxAndWhiskerSeries,
  BubbleSeries, CandleSeries, Category, ChartAnnotation, ColumnSeries, Crosshair, DataEditing, DataLabel, DateTime,
  DateTimeCategory, EmaIndicator, ErrorBar, Export, Highlight, HiloOpenCloseSeries, HiloSeries, HistogramSeries,
  Legend, LineSeries, Logarithmic, MacdIndicator, MomentumIndicator, MultiColoredAreaSeries, MultiColoredLineSeries,
  MultiLevelLabel, ParetoSeries, PolarSeries, RadarSeries, RangeAreaSeries, RangeColumnSeries, RangeStepAreaSeries,
  RsiIndicator, ScatterSeries, ScrollBar, Selection, SmaIndicator, SplineAreaSeries, SplineRangeAreaSeries,
  SplineSeries, StackingArea100Series, StackingAreaSeries, StackingBar100Series, StackingBarSeries,
  StackingColumn100Series, StackingColumnSeries, StackingLine100Series, StackingLineSeries, StackingStepAreaSeries,
  StepAreaSeries, StepLineSeries, StochasticIndicator, StripLine, TmaIndicator, Tooltip, Trendlines, WaterfallSeries,
  WebMcpChart, Zoom
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('updateChartSeries', { seriesIndex: 0, series: { type: 'Column' } });
```

**Precondition:** The series must exist; keep every permitted target module.

### 24. `updateChartPoint`

**TypeScript imports and injection:**

```ts
import { Chart,
  DataEditing, LineSeries, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  DataEditing, LineSeries, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('updateChartPoint', { seriesIndex: 0, pointIndex: 2, point: { x: 3, y: 70 } });
```

**Precondition:** Indexes and mappings must be valid.

### 25. `appendChartData`

**TypeScript imports and injection:**

```ts
import { Chart,
  LineSeries, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('appendChartData', { seriesIndex: 0, data: [{ x: 7, y: 80 }] });
```

**Precondition:** Data must match field mappings.

### 26. `removeChartPoints`

**TypeScript imports and injection:**

```ts
import { Chart,
  LineSeries, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('removeChartPoints', { seriesIndex: 0, pointIndexes: [1, 3] });
```

**Precondition:** Point indexes must exist.

### 27. `getChartPoint`

**TypeScript imports and injection:**

```ts
import { Chart,
  LineSeries, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('getChartPoint', { seriesIndex: 0, pointIndex: 2 });
```

**Precondition:** Indexes must exist.

### 28. `getSelectedChartData`

**TypeScript imports and injection:**

```ts
import { Chart,
  Selection, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  Selection, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('getSelectedChartData', {});
```

**Precondition:** A selection is required when data is expected.

### 29. `getChartAxes`

**TypeScript imports and injection:**

```ts
import { Chart,
  Category, DateTime, DateTimeCategory, Logarithmic, MultiLevelLabel, ScrollBar, StripLine, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  Category, DateTime, DateTimeCategory, Logarithmic, MultiLevelLabel, ScrollBar, StripLine, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('getChartAxes', {});
```

**Precondition:** Retain configured-axis modules.

### 30. `getChartIndicators`

**TypeScript imports and injection:**

```ts
import { Chart,
  AccumulationDistributionIndicator, AtrIndicator, BollingerBands, EmaIndicator, MacdIndicator, MomentumIndicator,
  RsiIndicator, SmaIndicator, StochasticIndicator, TmaIndicator, LineSeries, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  AccumulationDistributionIndicator, AtrIndicator, BollingerBands, EmaIndicator, MacdIndicator, MomentumIndicator,
  RsiIndicator, SmaIndicator, StochasticIndicator, TmaIndicator, LineSeries, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('getChartIndicators', {});
```

**Precondition:** Retain each indicator and source-series module.

### 31. `getChartStriplines`

**TypeScript imports and injection:**

```ts
import { Chart,
  StripLine, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  StripLine, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('getChartStriplines', {});
```

**Precondition:** Configure striplines when results are expected.

### 32. `removeChartAxis`

**TypeScript imports and injection:**

```ts
import { Chart,
  Category, DateTime, DateTimeCategory, Logarithmic, MultiLevelLabel, ScrollBar, StripLine, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  Category, DateTime, DateTimeCategory, Logarithmic, MultiLevelLabel, ScrollBar, StripLine, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('removeChartAxis', { axisName: 'secondaryAxis' });
```

**Precondition:** Target an existing additional axis.

### 33. `getChartAnnotations`

**TypeScript imports and injection:**

```ts
import { Chart,
  ChartAnnotation, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  ChartAnnotation, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('getChartAnnotations', {});
```

**Precondition:** ChartAnnotation is required.

### 34. `addChartAnnotation`

**TypeScript imports and injection:**

```ts
import { Chart,
  ChartAnnotation, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  ChartAnnotation, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('addChartAnnotation', { annotation: { content: '<div>New</div>', x: 4, y: 65 } });
```

**Precondition:** Coordinates must be valid.

### 35. `removeChartAnnotation`

**TypeScript imports and injection:**

```ts
import { Chart,
  ChartAnnotation, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  ChartAnnotation, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('removeChartAnnotation', { annotationIndex: 0 });
```

**Precondition:** The index must exist.

### 36. `animateChart`

**TypeScript imports and injection:**

```ts
import { Chart,
  LineSeries, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('animateChart', {});
```

**Precondition:** Retain rendered-series modules.

### 37. `getChartLegend`

**TypeScript imports and injection:**

```ts
import { Chart,
  Legend, WebMcpChart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  Legend, WebMcpChart
);
```

**Browser JavaScript setup:** No imports and no injection. Load the all-in-one browser script and use `new ej.charts.Chart(...)`.

**Direct execution:**

```ts
await executeTool('getChartLegend', {});
```

**Precondition:** Legend must be enabled.

## Custom WebMCP requirements

- Use a unique name that does not conflict with a built-in tool.
- Provide a precise description and valid JSON input schema.
- List mandatory inputs in `required`.
- Use `additionalProperties: false` when undeclared inputs must be rejected.
- Validate all input again inside `execute`.
- Return explicit JSON-safe success or failure objects.
- Never return Chart instances, DOM elements, functions, events, circular data, or EJ2 class instances.
- Do not expose sensitive application state.

## Required generation scenarios

1. TypeScript with every built-in tool.
2. JavaScript with every built-in tool.
3. TypeScript with selected built-in tools.
4. JavaScript with selected built-in tools.
5. TypeScript and JavaScript custom-tool samples.
6. Built-in and custom tools together.
7. Confirmation handling.
8. Cancellation and validation handling.
9. Direct diagnostic execution.
10. Unrestricted TypeScript setup with the complete import and injection list.

## Final copy rules

- TypeScript always uses package imports and `Chart.Inject(...)`.
- Browser JavaScript never uses imports or injection.
- TypeScript import and injection lists must stay synchronized.
- Always include `WebMcpChart` in TypeScript imports and injection.
- Always set `enableWebMcp: true`.
- Always append the Chart to an existing stable container ID.
- Keep automatic registration.
- Never add `registerWebMcpTools()` or a registration button.
- Do not invent `exposedTo` values.
- Do not generate a separate `customTools` property. Pass custom tools through `webMcpSettings.tools`.
- Keep modules required by the initial Chart and by all permitted runtime mutations.

## Validation checklist

### TypeScript

- [ ] `Chart` and all required features are imported from `@syncfusion/ej2-charts`.
- [ ] Every imported feature module appears in `Chart.Inject(...)`.
- [ ] `WebMcpChart` is imported and injected.
- [ ] Unrestricted samples retain the complete module set.
- [ ] No global `ej.charts.Chart` constructor is used.

### Browser JavaScript

- [ ] No import statement exists.
- [ ] No injection call exists.
- [ ] EJ2 styles and the all-in-one script load before sample code.
- [ ] The Chart is created through `new ej.charts.Chart(...)`.

### Shared

- [ ] The target container exists and has a stable ID.
- [ ] `enableWebMcp` is true.
- [ ] Registration remains automatic.
- [ ] Omitted `tools` means all built-in tools.
- [ ] Selected names are exact, verified, and case-sensitive.
- [ ] No registration method or button is generated.
- [ ] Tool-specific feature dependencies are available.
- [ ] Mutation tools retain every permitted target feature.
- [ ] IDs, indexes, axis names, annotation indexes, and data mappings are valid.
- [ ] Confirmation and cancellation are overridden only intentionally.
- [ ] Custom-tool input is schema-validated and runtime-validated.
- [ ] Custom-tool output is JSON-safe.
- [ ] Direct execution is limited to diagnostics, tests, or requested workflows.
- [ ] No fabricated response or fake model-context UI is generated.
