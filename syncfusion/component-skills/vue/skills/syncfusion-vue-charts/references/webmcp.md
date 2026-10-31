# Vue Chart WebMCP AI Sample Generation Guide

## Table of Contents

- [Purpose](#purpose)
- [Required rules](#required-rules)
- [React-to-Vue conversion map](#react-to-vue-conversion-map)
- [How to use WebMCP in Vue](#how-to-use-webmcp-in-vue)
- [Complete Vue 3 feature-tour SFC](#complete-vue-3-feature-tour-sfc)
- [Complete sample: Enable all built-in tools](#complete-sample-enable-all-built-in-tools)
- [Complete sample: Enable specific built-in tools](#complete-sample-enable-specific-built-in-tools)
- [Complete sample: Add a custom WebMCP tool](#complete-sample-add-a-custom-webmcp-tool)
- [Complete sample: Use built-in and custom tools together](#complete-sample-use-built-in-and-custom-tools-together)
- [Direct tool execution](#direct-tool-execution)
- [Confirmation, cancellation, and validation](#confirmation-cancellation-and-validation)
- [Exact built-in tool names](#exact-built-in-tool-names)
- [Spoon-fed tool-by-tool Vue implementation](#spoon-fed-tool-by-tool-vue-implementation)
- [Custom WebMCP requirements](#custom-webmcp-requirements)
- [Required generation scenarios](#required-generation-scenarios)
- [Final copy rules](#final-copy-rules)
- [AI validation checklist](#ai-validation-checklist)

## Purpose

Use this reference to generate complete Vue 3 Chart samples with WebMCP. Preserve the documented WebMCP behavior exactly. Registration is automatic after rendering. Do not generate a manual registration button or call `registerWebMcpTools()`.

## Required rules

- Generate a complete, runnable Vue 3 Single File Component with both `<template>` and `<script setup lang="ts">`.
- Import Chart components, directives, feature modules, and `WebMcpChart` from `@syncfusion/ej2-vue-charts`.
- Register `ChartComponent`, `SeriesCollectionDirective`, and `SeriesDirective` with `defineOptions`.
- Call `provide('chart', [...])` with every module required by the rendered Chart and every configuration that exposed tools may create.
- Always import and provide `WebMcpChart`.
- Add a stable Chart `id` and set `:enableWebMcp="true"`.
- Omit `webMcpSettings.tools` to register all built-in tools.
- Add exact, case-sensitive names to `webMcpSettings.tools` to expose only selected built-in tools.
- Use the same `webMcpSettings.tools` property for custom tools. There is no separate `customTools` setting.
- To combine selected built-in and custom tools, retrieve built-in tool objects with `getWebMcpTools()`, append custom tool objects, and assign the combined array to `webMcpSettings.tools`.
- Use `beforeWebMcpToolExecute` only for validation, cancellation, or intentional confirmation control.
- Use `getWebMcpTools()` for diagnostics, tests, direct execution, or retrieving built-in tool objects before combining them with custom tools.
- For unrestricted generation, preserve the complete provider list even when the initial Chart uses only Line and Column series.
- Do not fabricate tool output, model-context responses, or successful custom-tool results.

## React-to-Vue conversion map

- React `ChartComponent` JSX becomes Vue `<ejs-chart>`.
- React `SeriesCollectionDirective` becomes `<e-series-collection>`.
- React `SeriesDirective` becomes `<e-series>`.
- React `<Inject services={[...]} />` becomes `provide('chart', [...])`.
- React `useRef` becomes Vue `ref`.
- React `webMcpSettings={...}` becomes `:webMcpSettings="webMcpSettings"`.
- React event props become Vue bound props such as `:beforeWebMcpToolExecute="beforeWebMcpToolExecute"`.

## How to use WebMCP in Vue

### Step 1: Install the Vue Chart package

```bash
npm install @syncfusion/ej2-vue-charts
```

### Step 2: Import Vue APIs, Chart directives, feature modules, and `WebMcpChart`

```ts
import { provide } from 'vue';
import {
  ChartComponent, LineSeries, SeriesCollectionDirective, SeriesDirective, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```

### Step 3: Register the Vue Chart directives

```ts
defineOptions({
  components: {
    'ejs-chart': ChartComponent,
    'e-series-collection': SeriesCollectionDirective,
    'e-series': SeriesDirective
  }
});
```

### Step 4: Provide Chart modules

```ts
provide('chart', [LineSeries, WebMcpChart]);
```

`ChartComponent`, `SeriesCollectionDirective`, and `SeriesDirective` are Vue components/directives. Do not place them in the provider array. Only feature modules belong in `provide('chart', [...])`.

### Step 5: Enable WebMCP

```vue
<ejs-chart id="sales-chart" :enableWebMcp="true" :webMcpSettings="webMcpSettings">
  <e-series-collection>
    <e-series :dataSource="data" type="Line" xName="x" yName="y"></e-series>
  </e-series-collection>
</ejs-chart>
```

```ts
const webMcpSettings: Object = { name: 'salesChart' };
```

Omitting `tools` registers all built-in tools automatically after rendering.

## Complete Vue 3 feature-tour SFC

```vue
<template>
  <ejs-chart ref="chartRef" id="feature-tour-chart" title="Chart WebMCP Feature Tour"
    subTitle="All 37 built-in Chart WebMCP tools" :primaryXAxis="primaryXAxis"
    :primaryYAxis="primaryYAxis" :tooltip="tooltip" :crosshair="crosshair"
    :legendSettings="legendSettings" :zoomSettings="zoomSettings" selectionMode="Point"
    :annotations="annotations" :enableExport="true" :enableWebMcp="true"
    :webMcpSettings="webMcpSettings" :beforeWebMcpToolExecute="beforeWebMcpToolExecute">
    <e-series-collection>
      <e-series :dataSource="chartData" type="Line" xName="x" yName="y" name="Observed values"
        :marker="{ visible: true }" :animation="{ enable: false }"></e-series>
      <e-series :dataSource="chartData" type="Column" xName="x" yName="comparison"
        name="Comparison values" :animation="{ enable: false }"></e-series>
    </e-series-collection>
  </ejs-chart>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';
import {
  ChartComponent, SeriesCollectionDirective, SeriesDirective,
  AreaSeries, BarSeries, BoxAndWhiskerSeries, BubbleSeries, CandleSeries, ColumnSeries, HiloOpenCloseSeries,
  HiloSeries, HistogramSeries, LineSeries, MultiColoredAreaSeries, MultiColoredLineSeries, ParetoSeries, PolarSeries,
  RadarSeries, RangeAreaSeries, RangeColumnSeries, RangeStepAreaSeries, ScatterSeries, SplineAreaSeries,
  SplineRangeAreaSeries, SplineSeries, StackingArea100Series, StackingAreaSeries, StackingBar100Series,
  StackingBarSeries, StackingColumn100Series, StackingColumnSeries, StackingLine100Series, StackingLineSeries,
  StackingStepAreaSeries, StepAreaSeries, StepLineSeries, WaterfallSeries, AtrIndicator, BollingerBands, EmaIndicator,
  MacdIndicator, MomentumIndicator, RsiIndicator, SmaIndicator, StochasticIndicator, TmaIndicator, Category, DateTime,
  DateTimeCategory, Logarithmic, MultiLevelLabel, ScrollBar, StripLine, ChartAnnotation, Crosshair, DataEditing,
  DataLabel, ErrorBar, Export, Highlight, Legend, Selection, Tooltip, Trendlines, WebMcpChart, Zoom
} from '@syncfusion/ej2-vue-charts';

defineOptions({
  components: {
    'ejs-chart': ChartComponent,
    'e-series-collection': SeriesCollectionDirective,
    'e-series': SeriesDirective
  }
});

provide('chart', [
  AreaSeries, BarSeries, BoxAndWhiskerSeries, BubbleSeries, CandleSeries, ColumnSeries, HiloOpenCloseSeries,
  HiloSeries, HistogramSeries, LineSeries, MultiColoredAreaSeries, MultiColoredLineSeries, ParetoSeries, PolarSeries,
  RadarSeries, RangeAreaSeries, RangeColumnSeries, RangeStepAreaSeries, ScatterSeries, SplineAreaSeries,
  SplineRangeAreaSeries, SplineSeries, StackingArea100Series, StackingAreaSeries, StackingBar100Series,
  StackingBarSeries, StackingColumn100Series, StackingColumnSeries, StackingLine100Series, StackingLineSeries,
  StackingStepAreaSeries, StepAreaSeries, StepLineSeries, WaterfallSeries, AtrIndicator, BollingerBands, EmaIndicator,
  MacdIndicator, MomentumIndicator, RsiIndicator, SmaIndicator, StochasticIndicator, TmaIndicator, Category, DateTime,
  DateTimeCategory, Logarithmic, MultiLevelLabel, ScrollBar, StripLine, ChartAnnotation, Crosshair, DataEditing,
  DataLabel, ErrorBar, Export, Highlight, Legend, Selection, Tooltip, Trendlines, WebMcpChart, Zoom
]);

const chartRef = ref<any>(null);
const chartData: Object[] = [
  { x: 1, y: 32, comparison: 24 }, { x: 2, y: 48, comparison: 36 },
  { x: 3, y: 42, comparison: 34 }, { x: 4, y: 65, comparison: 52 },
  { x: 5, y: 58, comparison: 46 }, { x: 6, y: 74, comparison: 61 }
];
const primaryXAxis: Object = { title: 'Sample index', minimum: 0, maximum: 8, interval: 1 };
const primaryYAxis: Object = {
  title: 'Value', minimum: 0, maximum: 100, interval: 20,
  stripLines: [{ start: 60, end: 80, text: 'Target range', color: '#DCFCE7', opacity: 0.5, visible: true }]
};
const tooltip: Object = { enable: true, shared: true, header: '<b>${point.x}</b>', format: '${series.name}: ${point.y}' };
const crosshair: Object = { enable: true, lineType: 'Both' };
const legendSettings: Object = { visible: true };
const zoomSettings: Object = { enableSelectionZooming: true, enableMouseWheelZooming: true, enablePan: true };
const annotations: Object[] = [{
  content: '<div>Peak value</div>', x: 6, y: 74, coordinateUnits: 'Point', region: 'Series'
}];
const allToolNames: string[] = [
  'inspectChart', 'getSeriesData', 'addChartSeries', 'removeChartSeries', 'clearChartSeries', 'updateChartAnnotation',
  'showChartTooltip', 'showChartCrosshair', 'exportChart', 'printChart', 'updateChartDataSource',
  'toggleChartSeriesVisibility', 'configureChartZoom', 'resetChartZoom', 'selectChartPoints', 'clearChartSelection',
  'addChartAxis', 'updateChartAxis', 'updateChartTitle', 'hideChartTooltip', 'hideChartCrosshair',
  'updateChartProperties', 'updateChartSeries', 'updateChartPoint', 'appendChartData', 'removeChartPoints',
  'getChartPoint', 'getSelectedChartData', 'getChartAxes', 'getChartIndicators', 'getChartStriplines',
  'removeChartAxis', 'getChartAnnotations', 'addChartAnnotation', 'removeChartAnnotation', 'animateChart',
  'getChartLegend'
];
const webMcpSettings: Object = { name: 'featureTourChart', tools: allToolNames, exposedTo: ['assistant'] };
const beforeWebMcpToolExecute = (args: any): void => {
  if (args.toolName.endsWith('_printChart')) {
    args.showConfirmationDialog = true;
  }
};
const getChartInstance = (): any => chartRef.value?.ej2Instances || chartRef.value;
const executeTool = async (name: string, input: Object): Promise<Object> => {
  const chart: any = getChartInstance();
  if (!chart) throw new Error('Chart is not available.');
  const tools: any[] = chart.getWebMcpTools([name]);
  const tool: any = tools.find((item: any): boolean => item.name === name);
  if (!tool || typeof tool.execute !== 'function') throw new Error(`WebMCP tool "${name}" is unavailable.`);
  return tool.execute(input);
};
</script>
```

The complete provider list is intentional. It lets WebMCP add or update series, axes, indicators, annotations, interactions, selection, zoom, striplines, printing, and export behavior without missing-module errors.

## Complete sample: Enable all built-in tools

Omit `tools` from `webMcpSettings`.

```vue
<template>
  <ejs-chart id="all-tools-chart" :enableWebMcp="true" :webMcpSettings="webMcpSettings">
    <e-series-collection>
      <e-series :dataSource="data" type="Line" xName="x" yName="y" name="Sales"></e-series>
    </e-series-collection>
  </ejs-chart>
</template>
<script setup lang="ts">
import { provide } from 'vue';
import { ChartComponent, LineSeries, SeriesCollectionDirective, SeriesDirective, WebMcpChart } from '@syncfusion/ej2-vue-charts';
defineOptions({ components: { 'ejs-chart': ChartComponent, 'e-series-collection': SeriesCollectionDirective, 'e-series': SeriesDirective } });
provide('chart', [LineSeries, WebMcpChart]);
const data: Object[] = [{ x: 1, y: 32 }, { x: 2, y: 48 }, { x: 3, y: 42 }];
const webMcpSettings: Object = { name: 'allToolsChart' };
</script>
```

## Complete sample: Enable specific built-in tools

```vue
<template>
  <ejs-chart id="specific-tools-chart" :enableWebMcp="true" :webMcpSettings="webMcpSettings"
    :tooltip="tooltip" :beforeWebMcpToolExecute="beforeWebMcpToolExecute">
    <e-series-collection>
      <e-series :dataSource="data" type="Line" xName="x" yName="y" name="Sales"></e-series>
    </e-series-collection>
  </ejs-chart>
</template>
<script setup lang="ts">
import { provide } from 'vue';
import { ChartComponent, LineSeries, SeriesCollectionDirective, SeriesDirective, Tooltip, WebMcpChart } from '@syncfusion/ej2-vue-charts';
defineOptions({ components: { 'ejs-chart': ChartComponent, 'e-series-collection': SeriesCollectionDirective, 'e-series': SeriesDirective } });
provide('chart', [LineSeries, Tooltip, WebMcpChart]);
const data: Object[] = [{ x: 1, y: 32 }, { x: 2, y: 48 }, { x: 3, y: 42 }];
const tooltip: Object = { enable: true };
const webMcpSettings: Object = {
  name: 'specificToolsChart',
  tools: ['inspectChart', 'getSeriesData', 'showChartTooltip', 'hideChartTooltip', 'updateChartDataSource']
};
const beforeWebMcpToolExecute = (args: any): void => {
  if (args.toolName.endsWith('_updateChartDataSource')) args.showConfirmationDialog = true;
};
</script>
```

Tool names are exact and case-sensitive. Keep every module required by the rendered Chart, the selected tools, and every configuration mutation tools may create.

## Complete sample: Add a custom WebMCP tool

```vue
<template>
  <ejs-chart ref="chartRef" id="custom-tool-chart" :enableWebMcp="true" :webMcpSettings="webMcpSettings">
    <e-series-collection>
      <e-series :dataSource="data" type="Line" xName="x" yName="y" name="Sales"></e-series>
    </e-series-collection>
  </ejs-chart>
</template>
<script setup lang="ts">
import { provide, ref } from 'vue';
import { ChartComponent, LineSeries, SeriesCollectionDirective, SeriesDirective, WebMcpChart } from '@syncfusion/ej2-vue-charts';
defineOptions({ components: { 'ejs-chart': ChartComponent, 'e-series-collection': SeriesCollectionDirective, 'e-series': SeriesDirective } });
provide('chart', [LineSeries, WebMcpChart]);
const chartRef = ref<any>(null);
const data: Object[] = [{ x: 1, y: 32 }, { x: 2, y: 48 }, { x: 3, y: 42 }];
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
    const chart: any = chartRef.value?.ej2Instances || chartRef.value;
    if (!chart) return { success: false, message: 'The Chart is not available.' };
    if (!Number.isInteger(input.seriesIndex) || input.seriesIndex < 0) return { success: false, message: 'Provide a valid non-negative series index.' };
    const targetSeries: any = chart.series?.[input.seriesIndex];
    const points: any[] = targetSeries?.points || [];
    if (!targetSeries) return { success: false, message: 'The requested series does not exist.' };
    if (points.length === 0) return { success: false, message: 'The requested series has no points.' };
    const point: any = points.reduce((highest: any, current: any): any => current.yValue > highest.yValue ? current : highest);
    return { success: true, seriesIndex: input.seriesIndex, point: { index: point.index, x: point.x, y: point.yValue } };
  }
}];
const webMcpSettings: Object = { name: 'customToolsChart', tools: customTools };
</script>
```

Custom outputs must be JSON-safe. Never return Vue component instances, Chart instances, DOM elements, functions, events, circular objects, or EJ2 class instances.

## Complete sample: Use built-in and custom tools together

Use the `tools` property for both selected built-in tools and application-specific custom tools. There is no separate `customTools` property. Retrieve the selected built-in tool objects after the Chart loads, append the custom tool objects, and assign the combined array to `webMcpSettings.tools`.

```vue
<template>
  <ejs-chart ref="chartRef" id="combined-tools-chart" :enableWebMcp="true" :webMcpSettings="webMcpSettings"
    :loaded="configureTools">
    <e-series-collection>
      <e-series :dataSource="data" type="Line" xName="x" yName="y" name="Sales"></e-series>
    </e-series-collection>
  </ejs-chart>
</template>
<script setup lang="ts">
import { provide, ref } from 'vue';
import {
  ChartComponent, LineSeries, SeriesCollectionDirective, SeriesDirective, Tooltip, WebMcpChart
} from '@syncfusion/ej2-vue-charts';

defineOptions({
  components: {
    'ejs-chart': ChartComponent,
    'e-series-collection': SeriesCollectionDirective,
    'e-series': SeriesDirective
  }
});

provide('chart', [LineSeries, Tooltip, WebMcpChart]);

const chartRef = ref<any>(null);
const toolsInitialized = ref<boolean>(false);
const data: Object[] = [
  { x: 1, y: 32 },
  { x: 2, y: 48 },
  { x: 3, y: 42 }
];
const selectedToolNames: string[] = [
  'inspectChart',
  'getSeriesData',
  'showChartTooltip',
  'hideChartTooltip'
];
const webMcpSettings = ref<any>({
  name: 'combinedToolsChart',
  tools: []
});
const customTool: any = {
  name: 'getPointCount',
  description: 'Returns the number of points in the requested Chart series.',
  inputSchema: {
    type: 'object',
    properties: {
      seriesIndex: { type: 'number', description: 'Zero-based series index.' }
    },
    required: ['seriesIndex'],
    additionalProperties: false
  },
  execute: async (input: { seriesIndex: number }): Promise<Object> => {
    const chart: any = chartRef.value?.ej2Instances || chartRef.value;
    const targetSeries: any = chart?.series?.[input.seriesIndex];

    if (!targetSeries) {
      return { success: false, message: 'The requested series does not exist.' };
    }

    return {
      success: true,
      seriesIndex: input.seriesIndex,
      pointCount: targetSeries.points?.length || 0
    };
  }
};
const configureTools = (): void => {
  const chart: any = chartRef.value?.ej2Instances || chartRef.value;
  if (!chart || toolsInitialized.value) {
    return;
  }

  const tools: any[] = chart.getWebMcpTools(selectedToolNames);
  tools.push(customTool);
  toolsInitialized.value = true;

  chart.setProperties({
    webMcpSettings: {
      name: 'combinedToolsChart',
      tools
    }
  }, false);
};
</script>
```

Rules for combining built-in and custom tools:

- Do not use or generate a `customTools` property.
- Initialize `webMcpSettings.tools` with an empty array to prevent registration before the combined list is ready.
- Call `getWebMcpTools(selectedToolNames)` only after the Chart is loaded.
- Append custom tool objects to the returned built-in tool array.
- Assign the combined array through `webMcpSettings.tools` with `setProperties()`.
- Guard the loaded handler so tools are configured only once.

## Direct tool execution

Direct execution is optional and only for diagnostics, tests, or an explicitly requested UI workflow.

```ts
const getChartInstance = (): any => chartRef.value?.ej2Instances || chartRef.value;
const executeTool = async (name: string, input: Object): Promise<Object> => {
  const chart: any = getChartInstance();
  if (!chart) throw new Error('Chart is not available.');
  const tools: any[] = chart.getWebMcpTools([name]);
  const tool: any = tools.find((item: any): boolean => item.name === name);
  if (!tool || typeof tool.execute !== 'function') throw new Error(`WebMCP tool "${name}" is unavailable.`);
  return tool.execute(input);
};
```

Do not add an execution button unless the requested UI explicitly requires one.

## Confirmation, cancellation, and validation

```ts
const beforeWebMcpToolExecute = (args: any): void => {
  if (args.toolName.endsWith('_exportChart') || args.toolName.endsWith('_printChart')) {
    args.showConfirmationDialog = true;
  }
  if (args.toolName.endsWith('_clearChartSeries') && !canClearSeries) {
    args.cancel = true;
  }
};
```

The event name can include the `webMcpSettings.name` prefix, so match the operation with `endsWith()`. Validate Chart IDs, element IDs, series indexes, point indexes, annotation indexes, axis names, data mappings, export types, configuration objects, and application permissions.

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

## Spoon-fed tool-by-tool Vue implementation

For each tool, copy the package imports, add the same feature modules to `provide('chart', [...])`, add required Chart properties, and use the supplied direct-execution input. Also retain modules required by the rendered Chart.

### 1. `inspectChart`
**Copy these imports:**
```ts
import {
  WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  WebMcpChart
]);
```
**Additional Chart properties:** None beyond a stable `id`, `:enableWebMcp="true"`, and `:webMcpSettings="webMcpSettings"`.
**Direct execution:**
```ts
await executeTool('inspectChart', {});
```
**Precondition:** A rendered Chart is required.

### 2. `getSeriesData`
**Copy these imports:**
```ts
import {
  LineSeries, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  LineSeries, WebMcpChart
]);
```
**Additional Chart properties:** None beyond a stable `id`, `:enableWebMcp="true"`, and `:webMcpSettings="webMcpSettings"`.
**Direct execution:**
```ts
await executeTool('getSeriesData', { seriesIndex: 0 });
```
**Precondition:** The target series index must exist.

### 3. `addChartSeries`
**Copy these imports:**
```ts
import {
  AreaSeries, BarSeries, BoxAndWhiskerSeries, BubbleSeries, CandleSeries, ColumnSeries, HiloOpenCloseSeries,
  HiloSeries, HistogramSeries, LineSeries, MultiColoredAreaSeries, MultiColoredLineSeries, ParetoSeries, PolarSeries,
  RadarSeries, RangeAreaSeries, RangeColumnSeries, RangeStepAreaSeries, ScatterSeries, SplineAreaSeries,
  SplineRangeAreaSeries, SplineSeries, StackingArea100Series, StackingAreaSeries, StackingBar100Series,
  StackingBarSeries, StackingColumn100Series, StackingColumnSeries, StackingLine100Series, StackingLineSeries,
  StackingStepAreaSeries, StepAreaSeries, StepLineSeries, WaterfallSeries, AtrIndicator, BollingerBands, EmaIndicator,
  MacdIndicator, MomentumIndicator, RsiIndicator, SmaIndicator, StochasticIndicator, TmaIndicator, DataLabel, ErrorBar,
  Trendlines, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  AreaSeries, BarSeries, BoxAndWhiskerSeries, BubbleSeries, CandleSeries, ColumnSeries, HiloOpenCloseSeries,
  HiloSeries, HistogramSeries, LineSeries, MultiColoredAreaSeries, MultiColoredLineSeries, ParetoSeries, PolarSeries,
  RadarSeries, RangeAreaSeries, RangeColumnSeries, RangeStepAreaSeries, ScatterSeries, SplineAreaSeries,
  SplineRangeAreaSeries, SplineSeries, StackingArea100Series, StackingAreaSeries, StackingBar100Series,
  StackingBarSeries, StackingColumn100Series, StackingColumnSeries, StackingLine100Series, StackingLineSeries,
  StackingStepAreaSeries, StepAreaSeries, StepLineSeries, WaterfallSeries, AtrIndicator, BollingerBands, EmaIndicator,
  MacdIndicator, MomentumIndicator, RsiIndicator, SmaIndicator, StochasticIndicator, TmaIndicator, DataLabel, ErrorBar,
  Trendlines, WebMcpChart
]);
```
**Additional Chart properties:** None beyond a stable `id`, `:enableWebMcp="true"`, and `:webMcpSettings="webMcpSettings"`.
**Direct execution:**
```ts
await executeTool('addChartSeries', { series: { type: 'Line', dataSource: [{ x: 1, y: 20 }, { x: 2, y: 35 }], xName: 'x', yName: 'y', name: 'Added series' } });
```
**Precondition:** Keep every series and optional series-feature module the tool may use.

### 4. `removeChartSeries`
**Copy these imports:**
```ts
import {
  WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  WebMcpChart
]);
```
**Additional Chart properties:** None beyond a stable `id`, `:enableWebMcp="true"`, and `:webMcpSettings="webMcpSettings"`.
**Direct execution:**
```ts
await executeTool('removeChartSeries', { seriesIndex: 1 });
```
**Precondition:** The target series must exist; retain modules required by remaining rendered series.

### 5. `clearChartSeries`
**Copy these imports:**
```ts
import {
  WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  WebMcpChart
]);
```
**Additional Chart properties:** None beyond a stable `id`, `:enableWebMcp="true"`, and `:webMcpSettings="webMcpSettings"`.
**Direct execution:**
```ts
await executeTool('clearChartSeries', {});
```
**Precondition:** Retain modules required by the initial rendered series.

### 6. `updateChartAnnotation`
**Copy these imports:**
```ts
import {
  ChartAnnotation, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  ChartAnnotation, WebMcpChart
]);
```
**Additional Chart properties:** None beyond a stable `id`, `:enableWebMcp="true"`, and `:webMcpSettings="webMcpSettings"`.
**Direct execution:**
```ts
await executeTool('updateChartAnnotation', { annotationIndex: 0, annotation: { content: '<div>Updated peak</div>', x: 5, y: 58 } });
```
**Precondition:** The annotation index must exist.

### 7. `showChartTooltip`
**Copy these imports:**
```ts
import {
  Tooltip, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  Tooltip, WebMcpChart
]);
```
**Add these Chart properties/configuration:**
```vue
:tooltip="tooltip"
const tooltip: Object = { enable: true };
```
**Direct execution:**
```ts
await executeTool('showChartTooltip', { seriesIndex: 0, pointIndex: 2 });
```
**Precondition:** The series and point indexes must exist.

### 8. `showChartCrosshair`
**Copy these imports:**
```ts
import {
  Crosshair, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  Crosshair, WebMcpChart
]);
```
**Add these Chart properties/configuration:**
```vue
:crosshair="crosshair"
const crosshair: Object = { enable: true, lineType: 'Both' };
```
**Direct execution:**
```ts
await executeTool('showChartCrosshair', { x: 250, y: 180 });
```
**Precondition:** Use valid Chart coordinates.

### 9. `exportChart`
**Copy these imports:**
```ts
import {
  Export, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  Export, WebMcpChart
]);
```
**Add these Chart properties/configuration:**
```vue
:enableExport="true"
```
**Direct execution:**
```ts
await executeTool('exportChart', { type: 'PNG', fileName: 'chart-export' });
```
**Precondition:** Use a supported export type.

### 10. `printChart`
**Copy these imports:**
```ts
import {
  Export, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  Export, WebMcpChart
]);
```
**Additional Chart properties:** None beyond a stable `id`, `:enableWebMcp="true"`, and `:webMcpSettings="webMcpSettings"`.
**Direct execution:**
```ts
await executeTool('printChart', { elementIds: 'feature-tour-chart' });
```
**Precondition:** The element ID must exist.

### 11. `updateChartDataSource`
**Copy these imports:**
```ts
import {
  LineSeries, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  LineSeries, WebMcpChart
]);
```
**Additional Chart properties:** None beyond a stable `id`, `:enableWebMcp="true"`, and `:webMcpSettings="webMcpSettings"`.
**Direct execution:**
```ts
await executeTool('updateChartDataSource', { seriesIndex: 0, dataSource: [{ x: 1, y: 40 }, { x: 2, y: 55 }] });
```
**Precondition:** Data fields must match xName and yName.

### 12. `toggleChartSeriesVisibility`
**Copy these imports:**
```ts
import {
  Legend, LineSeries, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  Legend, LineSeries, WebMcpChart
]);
```
**Add these Chart properties/configuration:**
```vue
:legendSettings="legendSettings"
const legendSettings: Object = { visible: true };
```
**Direct execution:**
```ts
await executeTool('toggleChartSeriesVisibility', { seriesIndex: 0 });
```
**Precondition:** The target series must exist.

### 13. `configureChartZoom`
**Copy these imports:**
```ts
import {
  Zoom, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  Zoom, WebMcpChart
]);
```
**Additional Chart properties:** None beyond a stable `id`, `:enableWebMcp="true"`, and `:webMcpSettings="webMcpSettings"`.
**Direct execution:**
```ts
await executeTool('configureChartZoom', { zoomSettings: { enableSelectionZooming: true, enableMouseWheelZooming: true, enablePan: true } });
```
**Precondition:** Zoom must be provided.

### 14. `resetChartZoom`
**Copy these imports:**
```ts
import {
  Zoom, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  Zoom, WebMcpChart
]);
```
**Additional Chart properties:** None beyond a stable `id`, `:enableWebMcp="true"`, and `:webMcpSettings="webMcpSettings"`.
**Direct execution:**
```ts
await executeTool('resetChartZoom', {});
```
**Precondition:** Zoom must be provided.

### 15. `selectChartPoints`
**Copy these imports:**
```ts
import {
  Selection, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  Selection, WebMcpChart
]);
```
**Add these Chart properties/configuration:**
```vue
selectionMode="Point"
```
**Direct execution:**
```ts
await executeTool('selectChartPoints', { points: [{ seriesIndex: 0, pointIndex: 1 }, { seriesIndex: 0, pointIndex: 3 }] });
```
**Precondition:** All target indexes must exist.

### 16. `clearChartSelection`
**Copy these imports:**
```ts
import {
  Selection, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  Selection, WebMcpChart
]);
```
**Add these Chart properties/configuration:**
```vue
selectionMode="Point"
```
**Direct execution:**
```ts
await executeTool('clearChartSelection', {});
```
**Precondition:** Selection must be provided.

### 17. `addChartAxis`
**Copy these imports:**
```ts
import {
  Category, DateTime, DateTimeCategory, Logarithmic, MultiLevelLabel, ScrollBar, StripLine, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  Category, DateTime, DateTimeCategory, Logarithmic, MultiLevelLabel, ScrollBar, StripLine, WebMcpChart
]);
```
**Additional Chart properties:** None beyond a stable `id`, `:enableWebMcp="true"`, and `:webMcpSettings="webMcpSettings"`.
**Direct execution:**
```ts
await executeTool('addChartAxis', { axis: { name: 'secondaryAxis', title: 'Secondary value', opposedPosition: true } });
```
**Precondition:** Use a unique axis name and keep every permitted axis module.

### 18. `updateChartAxis`
**Copy these imports:**
```ts
import {
  Category, DateTime, DateTimeCategory, Logarithmic, MultiLevelLabel, ScrollBar, StripLine, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  Category, DateTime, DateTimeCategory, Logarithmic, MultiLevelLabel, ScrollBar, StripLine, WebMcpChart
]);
```
**Additional Chart properties:** None beyond a stable `id`, `:enableWebMcp="true"`, and `:webMcpSettings="webMcpSettings"`.
**Direct execution:**
```ts
await executeTool('updateChartAxis', { axisName: 'primaryYAxis', axis: { title: 'Updated value', minimum: 0, maximum: 120, interval: 20 } });
```
**Precondition:** The target axis must exist.

### 19. `updateChartTitle`
**Copy these imports:**
```ts
import {
  WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  WebMcpChart
]);
```
**Additional Chart properties:** None beyond a stable `id`, `:enableWebMcp="true"`, and `:webMcpSettings="webMcpSettings"`.
**Direct execution:**
```ts
await executeTool('updateChartTitle', { title: 'Updated Chart title', subTitle: 'Updated subtitle' });
```
**Precondition:** No additional tool-specific precondition.

### 20. `hideChartTooltip`
**Copy these imports:**
```ts
import {
  Tooltip, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  Tooltip, WebMcpChart
]);
```
**Add these Chart properties/configuration:**
```vue
:tooltip="tooltip"
const tooltip: Object = { enable: true };
```
**Direct execution:**
```ts
await executeTool('hideChartTooltip', {});
```
**Precondition:** Tooltip must be enabled.

### 21. `hideChartCrosshair`
**Copy these imports:**
```ts
import {
  Crosshair, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  Crosshair, WebMcpChart
]);
```
**Add these Chart properties/configuration:**
```vue
:crosshair="crosshair"
const crosshair: Object = { enable: true, lineType: 'Both' };
```
**Direct execution:**
```ts
await executeTool('hideChartCrosshair', {});
```
**Precondition:** Crosshair must be enabled.

### 22. `updateChartProperties`
**Copy these imports:**
```ts
import {
  AreaSeries, BarSeries, BoxAndWhiskerSeries, BubbleSeries, CandleSeries, ColumnSeries, HiloOpenCloseSeries,
  HiloSeries, HistogramSeries, LineSeries, MultiColoredAreaSeries, MultiColoredLineSeries, ParetoSeries, PolarSeries,
  RadarSeries, RangeAreaSeries, RangeColumnSeries, RangeStepAreaSeries, ScatterSeries, SplineAreaSeries,
  SplineRangeAreaSeries, SplineSeries, StackingArea100Series, StackingAreaSeries, StackingBar100Series,
  StackingBarSeries, StackingColumn100Series, StackingColumnSeries, StackingLine100Series, StackingLineSeries,
  StackingStepAreaSeries, StepAreaSeries, StepLineSeries, WaterfallSeries, AtrIndicator, BollingerBands, EmaIndicator,
  MacdIndicator, MomentumIndicator, RsiIndicator, SmaIndicator, StochasticIndicator, TmaIndicator, Category, DateTime,
  DateTimeCategory, Logarithmic, MultiLevelLabel, ScrollBar, StripLine, ChartAnnotation, Crosshair, DataEditing,
  DataLabel, ErrorBar, Export, Highlight, Legend, Selection, Tooltip, Trendlines, WebMcpChart, Zoom
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  AreaSeries, BarSeries, BoxAndWhiskerSeries, BubbleSeries, CandleSeries, ColumnSeries, HiloOpenCloseSeries,
  HiloSeries, HistogramSeries, LineSeries, MultiColoredAreaSeries, MultiColoredLineSeries, ParetoSeries, PolarSeries,
  RadarSeries, RangeAreaSeries, RangeColumnSeries, RangeStepAreaSeries, ScatterSeries, SplineAreaSeries,
  SplineRangeAreaSeries, SplineSeries, StackingArea100Series, StackingAreaSeries, StackingBar100Series,
  StackingBarSeries, StackingColumn100Series, StackingColumnSeries, StackingLine100Series, StackingLineSeries,
  StackingStepAreaSeries, StepAreaSeries, StepLineSeries, WaterfallSeries, AtrIndicator, BollingerBands, EmaIndicator,
  MacdIndicator, MomentumIndicator, RsiIndicator, SmaIndicator, StochasticIndicator, TmaIndicator, Category, DateTime,
  DateTimeCategory, Logarithmic, MultiLevelLabel, ScrollBar, StripLine, ChartAnnotation, Crosshair, DataEditing,
  DataLabel, ErrorBar, Export, Highlight, Legend, Selection, Tooltip, Trendlines, WebMcpChart, Zoom
]);
```
**Additional Chart properties:** None beyond a stable `id`, `:enableWebMcp="true"`, and `:webMcpSettings="webMcpSettings"`.
**Direct execution:**
```ts
await executeTool('updateChartProperties', { properties: { background: '#FFFFFF', title: 'Updated properties', legendSettings: { visible: true }, tooltip: { enable: true, shared: true } } });
```
**Precondition:** Use the complete feature list for unrestricted updates.

### 23. `updateChartSeries`
**Copy these imports:**
```ts
import {
  AreaSeries, BarSeries, BoxAndWhiskerSeries, BubbleSeries, CandleSeries, ColumnSeries, HiloOpenCloseSeries,
  HiloSeries, HistogramSeries, LineSeries, MultiColoredAreaSeries, MultiColoredLineSeries, ParetoSeries, PolarSeries,
  RadarSeries, RangeAreaSeries, RangeColumnSeries, RangeStepAreaSeries, ScatterSeries, SplineAreaSeries,
  SplineRangeAreaSeries, SplineSeries, StackingArea100Series, StackingAreaSeries, StackingBar100Series,
  StackingBarSeries, StackingColumn100Series, StackingColumnSeries, StackingLine100Series, StackingLineSeries,
  StackingStepAreaSeries, StepAreaSeries, StepLineSeries, WaterfallSeries, AtrIndicator, BollingerBands, EmaIndicator,
  MacdIndicator, MomentumIndicator, RsiIndicator, SmaIndicator, StochasticIndicator, TmaIndicator, DataLabel, ErrorBar,
  Trendlines, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  AreaSeries, BarSeries, BoxAndWhiskerSeries, BubbleSeries, CandleSeries, ColumnSeries, HiloOpenCloseSeries,
  HiloSeries, HistogramSeries, LineSeries, MultiColoredAreaSeries, MultiColoredLineSeries, ParetoSeries, PolarSeries,
  RadarSeries, RangeAreaSeries, RangeColumnSeries, RangeStepAreaSeries, ScatterSeries, SplineAreaSeries,
  SplineRangeAreaSeries, SplineSeries, StackingArea100Series, StackingAreaSeries, StackingBar100Series,
  StackingBarSeries, StackingColumn100Series, StackingColumnSeries, StackingLine100Series, StackingLineSeries,
  StackingStepAreaSeries, StepAreaSeries, StepLineSeries, WaterfallSeries, AtrIndicator, BollingerBands, EmaIndicator,
  MacdIndicator, MomentumIndicator, RsiIndicator, SmaIndicator, StochasticIndicator, TmaIndicator, DataLabel, ErrorBar,
  Trendlines, WebMcpChart
]);
```
**Additional Chart properties:** None beyond a stable `id`, `:enableWebMcp="true"`, and `:webMcpSettings="webMcpSettings"`.
**Direct execution:**
```ts
await executeTool('updateChartSeries', { seriesIndex: 0, series: { type: 'Column', name: 'Updated series', marker: { visible: true } } });
```
**Precondition:** The series must exist; keep every permitted target module.

### 24. `updateChartPoint`
**Copy these imports:**
```ts
import {
  DataEditing, LineSeries, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  DataEditing, LineSeries, WebMcpChart
]);
```
**Additional Chart properties:** None beyond a stable `id`, `:enableWebMcp="true"`, and `:webMcpSettings="webMcpSettings"`.
**Direct execution:**
```ts
await executeTool('updateChartPoint', { seriesIndex: 0, pointIndex: 2, point: { x: 3, y: 70 } });
```
**Precondition:** Indexes and field mappings must be valid.

### 25. `appendChartData`
**Copy these imports:**
```ts
import {
  LineSeries, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  LineSeries, WebMcpChart
]);
```
**Additional Chart properties:** None beyond a stable `id`, `:enableWebMcp="true"`, and `:webMcpSettings="webMcpSettings"`.
**Direct execution:**
```ts
await executeTool('appendChartData', { seriesIndex: 0, data: [{ x: 7, y: 80 }, { x: 8, y: 76 }] });
```
**Precondition:** Appended data must match field mappings.

### 26. `removeChartPoints`
**Copy these imports:**
```ts
import {
  LineSeries, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  LineSeries, WebMcpChart
]);
```
**Additional Chart properties:** None beyond a stable `id`, `:enableWebMcp="true"`, and `:webMcpSettings="webMcpSettings"`.
**Direct execution:**
```ts
await executeTool('removeChartPoints', { seriesIndex: 0, pointIndexes: [1, 3] });
```
**Precondition:** Every point index must exist.

### 27. `getChartPoint`
**Copy these imports:**
```ts
import {
  LineSeries, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  LineSeries, WebMcpChart
]);
```
**Additional Chart properties:** None beyond a stable `id`, `:enableWebMcp="true"`, and `:webMcpSettings="webMcpSettings"`.
**Direct execution:**
```ts
await executeTool('getChartPoint', { seriesIndex: 0, pointIndex: 2 });
```
**Precondition:** The series and point indexes must exist.

### 28. `getSelectedChartData`
**Copy these imports:**
```ts
import {
  Selection, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  Selection, WebMcpChart
]);
```
**Add these Chart properties/configuration:**
```vue
selectionMode="Point"
```
**Direct execution:**
```ts
await executeTool('getSelectedChartData', {});
```
**Precondition:** A selection is required when selected data is expected.

### 29. `getChartAxes`
**Copy these imports:**
```ts
import {
  Category, DateTime, DateTimeCategory, Logarithmic, MultiLevelLabel, ScrollBar, StripLine, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  Category, DateTime, DateTimeCategory, Logarithmic, MultiLevelLabel, ScrollBar, StripLine, WebMcpChart
]);
```
**Additional Chart properties:** None beyond a stable `id`, `:enableWebMcp="true"`, and `:webMcpSettings="webMcpSettings"`.
**Direct execution:**
```ts
await executeTool('getChartAxes', {});
```
**Precondition:** Retain modules required by configured axes.

### 30. `getChartIndicators`
**Copy these imports:**
```ts
import {
  AtrIndicator, BollingerBands, EmaIndicator, MacdIndicator, MomentumIndicator, RsiIndicator, SmaIndicator,
  StochasticIndicator, TmaIndicator, LineSeries, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  AtrIndicator, BollingerBands, EmaIndicator, MacdIndicator, MomentumIndicator, RsiIndicator, SmaIndicator,
  StochasticIndicator, TmaIndicator, LineSeries, WebMcpChart
]);
```
**Additional Chart properties:** None beyond a stable `id`, `:enableWebMcp="true"`, and `:webMcpSettings="webMcpSettings"`.
**Direct execution:**
```ts
await executeTool('getChartIndicators', {});
```
**Precondition:** Also provide each indicator source-series module.

### 31. `getChartStriplines`
**Copy these imports:**
```ts
import {
  StripLine, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  StripLine, WebMcpChart
]);
```
**Additional Chart properties:** None beyond a stable `id`, `:enableWebMcp="true"`, and `:webMcpSettings="webMcpSettings"`.
**Direct execution:**
```ts
await executeTool('getChartStriplines', {});
```
**Precondition:** Configure axis striplines when results are expected.

### 32. `removeChartAxis`
**Copy these imports:**
```ts
import {
  Category, DateTime, DateTimeCategory, Logarithmic, MultiLevelLabel, ScrollBar, StripLine, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  Category, DateTime, DateTimeCategory, Logarithmic, MultiLevelLabel, ScrollBar, StripLine, WebMcpChart
]);
```
**Additional Chart properties:** None beyond a stable `id`, `:enableWebMcp="true"`, and `:webMcpSettings="webMcpSettings"`.
**Direct execution:**
```ts
await executeTool('removeChartAxis', { axisName: 'secondaryAxis' });
```
**Precondition:** Target an existing removable additional axis.

### 33. `getChartAnnotations`
**Copy these imports:**
```ts
import {
  ChartAnnotation, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  ChartAnnotation, WebMcpChart
]);
```
**Additional Chart properties:** None beyond a stable `id`, `:enableWebMcp="true"`, and `:webMcpSettings="webMcpSettings"`.
**Direct execution:**
```ts
await executeTool('getChartAnnotations', {});
```
**Precondition:** Provide ChartAnnotation.

### 34. `addChartAnnotation`
**Copy these imports:**
```ts
import {
  ChartAnnotation, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  ChartAnnotation, WebMcpChart
]);
```
**Additional Chart properties:** None beyond a stable `id`, `:enableWebMcp="true"`, and `:webMcpSettings="webMcpSettings"`.
**Direct execution:**
```ts
await executeTool('addChartAnnotation', { annotation: { content: '<div>New annotation</div>', x: 4, y: 65, coordinateUnits: 'Point', region: 'Series' } });
```
**Precondition:** Coordinates and units must be valid.

### 35. `removeChartAnnotation`
**Copy these imports:**
```ts
import {
  ChartAnnotation, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  ChartAnnotation, WebMcpChart
]);
```
**Additional Chart properties:** None beyond a stable `id`, `:enableWebMcp="true"`, and `:webMcpSettings="webMcpSettings"`.
**Direct execution:**
```ts
await executeTool('removeChartAnnotation', { annotationIndex: 0 });
```
**Precondition:** The annotation index must exist.

### 36. `animateChart`
**Copy these imports:**
```ts
import {
  LineSeries, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  LineSeries, WebMcpChart
]);
```
**Additional Chart properties:** None beyond a stable `id`, `:enableWebMcp="true"`, and `:webMcpSettings="webMcpSettings"`.
**Direct execution:**
```ts
await executeTool('animateChart', {});
```
**Precondition:** Retain modules for all rendered series.

### 37. `getChartLegend`
**Copy these imports:**
```ts
import {
  Legend, WebMcpChart
} from '@syncfusion/ej2-vue-charts';
```
**Add these modules to the Chart provider:**
```ts
provide('chart', [
  Legend, WebMcpChart
]);
```
**Add these Chart properties/configuration:**
```vue
:legendSettings="legendSettings"
const legendSettings: Object = { visible: true };
```
**Direct execution:**
```ts
await executeTool('getChartLegend', {});
```
**Precondition:** Legend must be provided and enabled.

## Custom WebMCP requirements

- Use a unique custom-tool name that does not conflict with a built-in name.
- Provide a precise description and valid JSON input schema.
- Put mandatory names in `required` and use `additionalProperties: false` when appropriate.
- Validate inputs again inside `execute`.
- Return only JSON-safe values.
- Return explicit failure objects when validation fails.
- Do not expose sensitive application state.

## Required generation scenarios

A generator using this guide must be able to produce:

1. All built-in tools through omitted `tools`.
2. A selected built-in tool list.
3. One or more custom tools.
4. Built-in and custom tools together.
5. Validation, cancellation, and confirmation event handling.
6. Direct diagnostic execution with `getWebMcpTools()`.
7. An unrestricted sample with the complete provider list.
8. A focused sample with every module required by its current and permitted runtime configuration.

## Final copy rules

- Always generate a complete Vue 3 SFC.
- Always register the three Vue Chart directives used in the template.
- Always import and provide `WebMcpChart`.
- Keep package imports and `provide('chart', [...])` synchronized.
- Never add Vue components/directives to the provider list.
- Keep rendered-series modules even for read-only or removal tools.
- For mutation tools, keep every module for every permitted target configuration.
- Do not use Angular `*Service` names.
- Do not use React `<Inject>` syntax.
- Do not use `Chart.Inject(...)`.
- Do not add `registerWebMcpTools()` or a registration button.
- Do not invent `exposedTo` values unless the target environment supplies them.
- Do not generate a separate `customTools` property. Pass custom tools through `webMcpSettings.tools`.

## AI validation checklist

- [ ] The output contains both `<template>` and `<script setup lang="ts">`.
- [ ] `ChartComponent`, `SeriesCollectionDirective`, and `SeriesDirective` are imported and registered.
- [ ] Every used feature module is imported from `@syncfusion/ej2-vue-charts`.
- [ ] Every required feature module appears in `provide('chart', [...])`.
- [ ] `WebMcpChart` is imported and provided.
- [ ] The Chart has a stable ID.
- [ ] `:enableWebMcp="true"` is present.
- [ ] `:webMcpSettings="webMcpSettings"` is present when settings are configured.
- [ ] Omitting `tools` registers all built-ins.
- [ ] Selected tool names are verified and case-sensitive.
- [ ] Automatic registration is preserved.
- [ ] No registration method or registration button is generated.
- [ ] Mutation-tool dependencies include every permitted target feature.
- [ ] Tooltip, crosshair, zoom, selection, annotation, stripline, legend, export, axis, series, and indicator modules are present when required.
- [ ] Export uses `Export` and `:enableExport="true"`.
- [ ] All referenced IDs, indexes, names, and mappings are valid.
- [ ] `beforeWebMcpToolExecute` only validates, cancels, or controls confirmation intentionally.
- [ ] Custom-tool schemas and runtime inputs are validated.
- [ ] Custom-tool output is JSON-safe.
- [ ] Direct execution is used only for diagnostics, tests, or requested workflows.
- [ ] No fabricated output or fake model-context UI is generated.
