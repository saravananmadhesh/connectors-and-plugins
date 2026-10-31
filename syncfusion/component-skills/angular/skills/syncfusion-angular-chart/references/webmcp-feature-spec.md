# Chart WebMCP AI Sample Generation Guide
### Table of Contents

- [Purpose](#purpose)
- [Verified WebMCP behavior](#verified-webmcp-behavior)
- [Strict AI-generation-rules](#strict-ai-generation-rules)
- [Complete Feature-Tour Sample](#complete-angular-sample-exposing-all-37-built-in-tools)
  - [Angular Service Injection Rule](#angular-service-injection-rule)
- [Minimal Angular sample registering all built-ins](#minimal-angular-sample-registering-all-built-ins)
- [Exact built-in tool list](#exact-built-in-tool-list)
  - [Read-only by default](#read-only-by-default)
  - [Confirmation required by default](#confirmation-required-by-default)
- [Correct direct-execution input for every tool](#correct-direct-execution-input-for-every-tool)
- [Important dependencies and preconditions](#important-dependencies-and-preconditions)
- [Confirmation and cancellation sample](#confirmation-and-cancellation-sample)
- [AI Validation Checklist](#ai-validation-checklist)
- [Import and Provider Guidance for All 37 Built-In Tools](#import-and-provider-guidance-for-all-37-built-in-tools)
- [Focused Limited-Tool Angular Sample](#focused-limited-tool-angular-sample)
- [Custom WebMCP Tool Sample](#custom-webmcp-tool-sample)

## Purpose

Use this file as source guidance for AI-generated EJ2 Chart WebMCP samples. A generated sample must be complete, executable, and based on the actual 37 built-in tools. Do not reproduce this file as visible application content.

## Verified WebMCP behavior

- Set `enableWebMcp: true` to enable integration.
- Tool registration is automatic after rendering when `WebMcpChart` is injected and `document.modelContext.registerTool` is available.
- `webMcpSettings.name` is the registration prefix. A null, undefined, or empty name falls back to the Chart element ID.
- Omitting `webMcpSettings.tools` registers all built-in tools.
- A string array selects built-in tools. An object array supplies custom tool definitions.
- An explicit empty `tools` array aborts the old registration and registers nothing.
- Re-registration aborts the previous `AbortController`, preventing stale tool names.
- `getWebMcpTools()` returns deep-copied built-in definitions with executable handlers.
- `beforeWebMcpToolExecute` can cancel execution, override confirmation behavior, and provide a cancellation response.
- Read-only hints control the default confirmation behavior, but the event can override `showConfirmationDialog`.
- Destroying the Chart aborts active registration.

## Strict AI Generation Rules

1. In Angular WebMCP samples, import `ChartModule` from `@syncfusion/ej2-angular-charts` and add it to the standalone component's `imports`.
2. Import and provide every service required by the rendered Chart, selected tools, and permitted mutations. Always provide `WebMcpChartService`.
3. Always give the `<ejs-chart>` element a stable and unique ID.
4. Set `[enableWebMcp]` to `true`.
5. Treat WebMCP tool registration as automatic after the Chart is rendered.
6. Never call `registerWebMcpTools()`.
7. Never generate a button or other UI control whose only purpose is to register WebMCP tools.
8. Do not call `getWebMcpTools()` merely to register tools. Use it only for diagnostics, testing, tool retrieval, or direct execution.
9. When all built-in tools are required, omit `webMcpSettings.tools`.
10. For a WebMCP feature-tour sample, an explicit tool-name list is allowed so every supported built-in tool is visible.
11. When the user requests only selected tools, include only the verified tool names required for that scenario.
12. Use only the 37 verified built-in Chart WebMCP tool names. Do not invent or infer additional tool names.
13. Use `webMcpSettings.name` when a custom tool-name prefix is required. Otherwise, allow the stable Chart element ID to be used as the prefix.
14. Add `webMcpSettings.exposedTo` only when the user or target environment provides the required model-context or origin values. Do not invent exposure values.
15. Use `beforeWebMcpToolExecute` only when execution validation, cancellation, auditing, or confirmation control is required.
16. Keep the default confirmation behavior for write operations unless the user explicitly requests a different behavior.
17. When checking `args.toolName` in `beforeWebMcpToolExecute`, account for the configured registration prefix. Use a suffix check such as `endsWith('_printChart')` when appropriate.
18. Custom WebMCP tools must include a valid `execute` callback and return JSON-safe content.
19. Direct tool execution must retrieve the tool through `getWebMcpTools([name])`, validate that the tool exists, and verify that `execute` is a function before invoking it.
20. Tool arguments must match the selected tool's verified input schema.
21. Series indexes, point indexes, annotation indexes, and named axes used in examples must exist when the tool is executed.
22. Mutating tool examples must not be treated as order-independent because an earlier operation can change indexes or Chart state used by a later operation.
23. Do not generate fake browser model-context support, simulated registrations, fabricated tool responses, or unrelated WebMCP controls.
24. Preserve `ChartModule` in the Angular WebMCP sample so customers can modify the generated Chart configuration without first adding individual Chart feature services.
25. Do not omit a service required by the rendered Chart or by a selected tool.

## Complete Angular sample exposing all 37 built-in tools

This is the preferred Angular feature-tour sample. It uses a standalone component and provides all services already represented by this WebMCP source content. The complete provider list is intentional so customers can change the existing Line and Column setup and use tooltip, legend, crosshair, zoom, selection, annotations, striplines, export, and WebMCP without encountering a missing-module warning.

```ts
import { Component, OnInit, ViewChild } from '@angular/core';
import {
    CategoryService, ChartAnnotationService, ChartComponent, ChartModule, ColumnSeriesService,
    CrosshairService, ExportService, LegendService, LineSeriesService, SelectionService,
    StripLineService, TooltipService, WebMcpChartService, WebMcpTool,
    WebMcpToolExecuteEventArgs, WebMcpToolResponse, ZoomService
} from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [ChartModule],
    providers: [
        CategoryService, LineSeriesService, ColumnSeriesService, TooltipService, LegendService,
        CrosshairService, ZoomService, SelectionService, ChartAnnotationService,
        StripLineService, ExportService, WebMcpChartService
    ],
    standalone: true,
    selector: 'app-container',
    template: `<ejs-chart #chart id="feature-tour-chart" [dataSource]="chartData" [title]="title"
        [subTitle]="subTitle" [primaryXAxis]="primaryXAxis" [primaryYAxis]="primaryYAxis"
        [tooltip]="tooltip" [crosshair]="crosshair" [legendSettings]="legendSettings"
        [zoomSettings]="zoomSettings" [selectionMode]="selectionMode" [annotations]="annotations"
        [enableExport]="enableExport" [enableWebMcp]="enableWebMcp"
        [webMcpSettings]="webMcpSettings"
        (beforeWebMcpToolExecute)="beforeWebMcpToolExecute($event)">
        <e-series-collection>
            <e-series type="Line" xName="x" yName="y" name="Observed values"
                [marker]="lineMarker" [animation]="animation">
            </e-series>
            <e-series type="Column" xName="x" yName="comparison" name="Comparison values"
                [animation]="animation">
            </e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    @ViewChild('chart')
    public chart?: ChartComponent;

    public chartData?: Object[];
    public allToolNames?: string[];
    public primaryXAxis?: Object;
    public primaryYAxis?: Object;
    public tooltip?: Object;
    public crosshair?: Object;
    public legendSettings?: Object;
    public zoomSettings?: Object;
    public annotations?: Object[];
    public lineMarker?: Object;
    public animation?: Object;
    public webMcpSettings?: Object;
    public title?: string;
    public subTitle?: string;
    public selectionMode?: string;
    public enableExport?: boolean;
    public enableWebMcp?: boolean;

    public beforeWebMcpToolExecute(args: WebMcpToolExecuteEventArgs): void {
        if (args.toolName.endsWith('_printChart')) {
            args.showConfirmationDialog = true;
        }
    }

    public async executeTool(name: string, input: Object): Promise<WebMcpToolResponse> {
        if (!this.chart) {
            throw new Error('Chart is not available.');
        }
        const tools: WebMcpTool[] = this.chart.getWebMcpTools([name]);
        const tool: WebMcpTool | undefined = tools.find((item: WebMcpTool): boolean => item.name === name);
        if (!tool || typeof tool.execute !== 'function') {
            throw new Error(`WebMCP tool "${name}" is unavailable.`);
        }
        return tool.execute(input);
    }

    public ngOnInit(): void {
        this.chartData = [
            { x: 1, y: 32, comparison: 24 },
            { x: 2, y: 48, comparison: 36 },
            { x: 3, y: 42, comparison: 34 },
            { x: 4, y: 65, comparison: 52 },
            { x: 5, y: 58, comparison: 46 },
            { x: 6, y: 74, comparison: 61 }
        ];
        this.allToolNames = [
            'inspectChart',
            'getSeriesData',
            'addChartSeries',
            'removeChartSeries',
            'clearChartSeries',
            'updateChartAnnotation',
            'showChartTooltip',
            'showChartCrosshair',
            'exportChart',
            'printChart',
            'updateChartDataSource',
            'toggleChartSeriesVisibility',
            'configureChartZoom',
            'resetChartZoom',
            'selectChartPoints',
            'clearChartSelection',
            'addChartAxis',
            'updateChartAxis',
            'updateChartTitle',
            'hideChartTooltip',
            'hideChartCrosshair',
            'updateChartProperties',
            'updateChartSeries',
            'updateChartPoint',
            'appendChartData',
            'removeChartPoints',
            'getChartPoint',
            'getSelectedChartData',
            'getChartAxes',
            'getChartIndicators',
            'getChartStriplines',
            'removeChartAxis',
            'getChartAnnotations',
            'addChartAnnotation',
            'removeChartAnnotation',
            'animateChart',
            'getChartLegend'
        ];
        this.primaryXAxis = { title: 'Sample index', minimum: 0, maximum: 8, interval: 1 };
        this.primaryYAxis = {
            title: 'Value',
            minimum: 0,
            maximum: 100,
            interval: 20,
            stripLines: [
                { start: 60, end: 80, text: 'Target range', color: '#DCFCE7', opacity: 0.5, visible: true }
            ]
        };
        this.tooltip = {
            enable: true,
            shared: true,
            header: '<b>${point.x}</b>',
            format: '${series.name}: ${point.y}'
        };
        this.crosshair = { enable: true, lineType: 'Both' };
        this.legendSettings = { visible: true };
        this.zoomSettings = {
            enableSelectionZooming: true,
            enableMouseWheelZooming: true,
            enablePan: true
        };
        this.annotations = [
            { content: '<div>Peak value</div>', x: 6, y: 74, coordinateUnits: 'Point', region: 'Series' }
        ];
        this.lineMarker = { visible: true };
        this.animation = { enable: false };
        this.selectionMode = 'Point';
        this.enableExport = true;
        this.enableWebMcp = true;
        this.webMcpSettings = {
            name: 'featureTourChart',
            tools: this.allToolNames,
            exposedTo: ['assistant']
        };
        this.title = 'Chart WebMCP Feature Tour';
        this.subTitle = 'All 37 built-in Chart WebMCP tools';
    }
}
```

### Angular service injection rule

The following services must remain in the full Angular WebMCP feature-tour sample:

- `CategoryService`
- `LineSeriesService`
- `ColumnSeriesService`
- `TooltipService`
- `LegendService`
- `CrosshairService`
- `ZoomService`
- `SelectionService`
- `ChartAnnotationService`
- `StripLineService`
- `ExportService`
- `WebMcpChartService`

Do not remove a service merely because the initial chart renders only Line and Column series. Each listed service corresponds to a feature already configured or demonstrated by this source sample. Do not add unrelated services that are not represented in the source content.

## Minimal Angular sample registering all built-ins

When the user only asks to enable all built-in tools, omit `tools`. Registration remains automatic.

```ts
public enableWebMcp: boolean = true;
public webMcpSettings: Object = {
    name: 'salesChart'
};
```

```html
<ejs-chart id="salesChart" [enableWebMcp]="enableWebMcp" [webMcpSettings]="webMcpSettings">
</ejs-chart>
```

`WebMcpChartService` must still be included in the component `providers` array.

## Limited-tool Angular sample

Use an allowlist when the request names only selected capabilities.

```ts
public enableWebMcp: boolean = true;
public webMcpSettings: Object = {
    name: 'limitedChart',
    tools: [
        'inspectChart',
        'getSeriesData',
        'showChartTooltip',
        'hideChartTooltip',
        'updateChartSeries'
    ]
};

public beforeWebMcpToolExecute(args: WebMcpToolExecuteEventArgs): void {
    args.showConfirmationDialog = true;
}
```

The limited-tool sample should preserve the services required by the rendered chart and selected tools. For the full feature-tour sample, always retain the complete provider list shown above.

## Exact built-in tool list

### Read-only by default

- `inspectChart`
- `getSeriesData`
- `showChartTooltip`
- `showChartCrosshair`
- `hideChartTooltip`
- `hideChartCrosshair`
- `getChartPoint`
- `getSelectedChartData`
- `getChartAxes`
- `getChartIndicators`
- `getChartStriplines`
- `getChartAnnotations`
- `animateChart`
- `getChartLegend`

### Confirmation required by default

- `addChartSeries`
- `removeChartSeries`
- `clearChartSeries`
- `updateChartAnnotation`
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
- `updateChartProperties`
- `updateChartSeries`
- `updateChartPoint`
- `appendChartData`
- `removeChartPoints`
- `removeChartAxis`
- `addChartAnnotation`
- `removeChartAnnotation`

## Correct direct-execution input for every tool

The following snippets assume the `executeTool()` helper from the complete feature-tour sample. Run state-changing examples independently or reset the sample between operations because earlier mutations can change indexes used by later examples.

### `1. inspectChart`

```ts
await executeTool('inspectChart', { includeSeries: true });
```

### `2. getSeriesData`

```ts
await executeTool('getSeriesData', { seriesIndex: 0, maxPoints: 100, includeHiddenPoints: false });
```

### `3. addChartSeries`

```ts
await executeTool('addChartSeries', { series: [{ type: 'Line', name: 'Target', dataSource: [{ x: 1, y: 40 }], xName: 'x', yName: 'y' }] });
```

### `4. removeChartSeries`

```ts
await executeTool('removeChartSeries', { seriesIndex: 1 });
```

### `5. clearChartSeries`

```ts
await executeTool('clearChartSeries', {});
```

### `6. updateChartAnnotation`

```ts
await executeTool('updateChartAnnotation', { annotationIndex: 0, content: '<div>Updated annotation</div>' });
```

### `7. showChartTooltip`

```ts
await executeTool('showChartTooltip', { x: 4, y: 65, isPoint: true });
```

### `8. showChartCrosshair`

```ts
await executeTool('showChartCrosshair', { x: 320, y: 180 });
```

### `9. exportChart`

```ts
await executeTool('exportChart', { type: 'PNG', fileName: 'sales-chart' });
```

### `10. printChart`

```ts
await executeTool('printChart', { elementIds: 'full-chart-container' });
```

### `11. updateChartDataSource`

```ts
await executeTool('updateChartDataSource', { series: [{ index: 0, dataSource: [{ x: 1, y: 35 }, { x: 2, y: 52 }] }] });
```

### `12. toggleChartSeriesVisibility`

```ts
await executeTool('toggleChartSeriesVisibility', { seriesIndex: 1, visible: false });
```

### `13. configureChartZoom`

```ts
await executeTool('configureChartZoom', { axis: 'x', zoomFactor: 0.5, zoomPosition: 0.25 });
```

### `14. resetChartZoom`

```ts
await executeTool('resetChartZoom', {});
```

### `15. selectChartPoints`

```ts
await executeTool('selectChartPoints', { indexes: [{ series: 0, point: 2 }], selectionMode: 'Point' });
```

### `16. clearChartSelection`

```ts
await executeTool('clearChartSelection', {});
```

### `17. addChartAxis`

```ts
await executeTool('addChartAxis', { axes: [{ name: 'webmcpAxis', opposedPosition: true, title: 'Secondary value' }] });
```

### `18. updateChartAxis`

```ts
await executeTool('updateChartAxis', { axis: 'y', properties: { title: 'Updated value', maximum: 120 } });
```

### `19. updateChartTitle`

```ts
await executeTool('updateChartTitle', { title: 'Updated Sales Chart', subTitle: 'Changed through WebMCP' });
```

### `20. hideChartTooltip`

```ts
await executeTool('hideChartTooltip', {});
```

### `21. hideChartCrosshair`

```ts
await executeTool('hideChartCrosshair', {});
```

### `22. updateChartProperties`

```ts
await executeTool('updateChartProperties', { properties: { title: 'Updated Chart', tooltip: { enable: true }, legendSettings: { visible: true } } });
```

### `23. updateChartSeries`

```ts
await executeTool('updateChartSeries', { seriesIndex: 0, properties: { name: 'Updated observed values', width: 4, marker: { visible: true } } });
```

### `24. updateChartPoint`

```ts
await executeTool('updateChartPoint', { seriesIndex: 0, pointIndex: 2, properties: { y: 56, color: '#E11D48' } });
```

### `25. appendChartData`

```ts
await executeTool('appendChartData', { seriesIndex: 0, data: [{ x: 7, y: 82 }], maxPoints: 20 });
```

### `26. removeChartPoints`

```ts
await executeTool('removeChartPoints', { seriesIndex: 0, startIndex: 0, count: 1 });
```

### `27. getChartPoint`

```ts
await executeTool('getChartPoint', { seriesIndex: 0, pointIndex: 2 });
```

### `28. getSelectedChartData`

```ts
await executeTool('getSelectedChartData', {});
```

### `29. getChartAxes`

```ts
await executeTool('getChartAxes', {});
```

### `30. getChartIndicators`

```ts
await executeTool('getChartIndicators', {});
```

### `31. getChartStriplines`

```ts
await executeTool('getChartStriplines', { axisName: 'primaryYAxis' });
```

### `32. removeChartAxis`

```ts
await executeTool('removeChartAxis', { axisName: 'webmcpAxis', resetSeriesBindings: true });
```

### `33. getChartAnnotations`

```ts
await executeTool('getChartAnnotations', {});
```

### `34. addChartAnnotation`

```ts
await executeTool('addChartAnnotation', { annotations: [{ content: '<div>Peak</div>', x: 6, y: 74, coordinateUnits: 'Point', region: 'Series' }] });
```

### `35. removeChartAnnotation`

```ts
await executeTool('removeChartAnnotation', { annotationIndex: 0 });
```

### `36. animateChart`

```ts
await executeTool('animateChart', { duration: 500, seriesIndexes: [0, 1] });
```

### `37. getChartLegend`

```ts
await executeTool('getChartLegend', {});
```

## Important dependencies and preconditions

- Tooltip tools require `Tooltip` injection and `tooltip.enable: true`.
- Crosshair tools require `Crosshair` injection and `crosshair.enable: true`.
- Export requires `Export` injection and `enableExport` or `allowExport`.
- Annotation updates require `ChartAnnotation` injection and an existing annotation index.
- Selection tools require a compatible `selectionMode`; accepted requested modes are `Point`, `Series`, and `Cluster`.
- Zoom tools operate on primary axes or a valid named secondary axis and require values from 0 through 1.
- Axis removal applies only to secondary axes and requires exactly one of `axisName` or `axisIndex`.
- Point and series indexes are zero-based and must exist at execution time.
- File names for export must not contain path separators or control characters.
- Custom tool definitions must provide an `execute` function; invalid custom tools are skipped.

## Confirmation and cancellation sample

```ts
beforeWebMcpToolExecute: (args: WebMcpToolExecuteEventArgs): void => {
    if (args.toolName.endsWith('_clearChartSeries')) {
        args.showConfirmationDialog = true;
    }
    if (args.toolName.endsWith('_printChart')) {
        args.cancel = true;
        args.cancellationResponse = 'Printing is disabled in this sample.';
    }
}
```

Tool names received by the event can include the configured registration prefix. Use `endsWith('_<baseToolName>')` when testing a registered tool name.

## AI Validation Checklist

- [ ] `ChartModule` is imported from `@syncfusion/ej2-angular-charts`.
- [ ] `ChartModule` is included in the standalone component's `imports`.
- [ ] The component `providers` list contains every service required by the rendered Chart, selected tools, and permitted mutations.
- [ ] `WebMcpChartService` is imported and included in `providers`.
- [ ] The `<ejs-chart>` element has a stable and unique ID.
- [ ] `[enableWebMcp]` is bound to a value of `true`.
- [ ] `webMcpSettings` is included only when a custom prefix, selected tools, custom tools, or exposure restrictions are required.
- [ ] Automatic WebMCP registration is used.
- [ ] No `registerWebMcpTools()` call is generated.
- [ ] No manual WebMCP registration button is generated.
- [ ] `getWebMcpTools()` is not used merely to register tools.
- [ ] When all built-in tools are required, `webMcpSettings.tools` is omitted.
- [ ] An explicit tool list is used only for a feature tour or a selected-tool scenario.
- [ ] Every explicitly listed tool name belongs to the verified 37-tool list.
- [ ] No unsupported or invented tool name is included.
- [ ] `webMcpSettings.name` is used only when a custom prefix is required.
- [ ] The stable Chart element ID can act as the fallback prefix when `name` is omitted.
- [ ] `exposedTo` values come from the user or target environment and are not invented.
- [ ] `beforeWebMcpToolExecute` is generated only when execution handling is required.
- [ ] Write operations preserve their confirmation behavior unless an intentional override is requested.
- [ ] Prefixed tool names are handled correctly in `beforeWebMcpToolExecute`.
- [ ] Cancellation sets `args.cancel = true`.
- [ ] A custom cancellation response is provided only when required.
- [ ] Every custom tool includes a valid `execute` callback.
- [ ] Custom tool input and output remain JSON-safe.
- [ ] Direct invocation uses `getWebMcpTools([name])`.
- [ ] Direct invocation verifies that the requested tool exists.
- [ ] Direct invocation verifies that `tool.execute` is a function.
- [ ] Tool arguments match the verified input schema.
- [ ] Referenced series, points, annotations, and axes exist before execution.
- [ ] Mutating examples are not assumed to be order-independent.
- [ ] The sample does not include fake model-context UI.
- [ ] The sample does not fabricate registrations or tool responses.
- [ ] Existing Chart data, series, axes, interactions, and styling requested by the user are preserved.
- [ ] `ChartModule` remains in `imports`, and required feature services remain in `providers`.


## Import and Provider Guidance for All 37 Built-In Tools

Use this section as the source of truth for focused Angular WebMCP samples. Every sample requires `ChartModule` in `imports` and `WebMcpChartService` in `providers`. Also retain the service required by the rendered series even when the selected tool itself is read-only.

A mutation tool must include services for every feature it is allowed to create or enable. For example, if `updateChartSeries` may switch from Line to Column and Spline, provide `LineSeriesService`, `ColumnSeriesService`, and `SplineSeriesService`.

### 1. `inspectChart`

**Required:** `WebMcpChartService`, plus all services used by the rendered Chart.

This tool reads the current configuration. It does not independently require a new feature service, but the Chart must still provide each configured series, axis, tooltip, legend, annotation, indicator, and interaction service.

### 2. `getSeriesData`

**Required:** `WebMcpChartService` and the service for every series type that can be queried.

For a Line-only Chart:

```ts
providers: [LineSeriesService, WebMcpChartService]
```

### 3. `addChartSeries`

**Required:** `WebMcpChartService` and all supported Chart series services because the tool can add a series of any supported type.

Import and provide:

- `LineSeriesService`
- `ColumnSeriesService`
- `BarSeriesService`
- `AreaSeriesService`
- `SplineSeriesService`
- `SplineAreaSeriesService`
- `StepLineSeriesService`
- `StepAreaSeriesService`
- `StackingLineSeriesService`
- `StackingLine100SeriesService`
- `StackingColumnSeriesService`
- `StackingColumn100SeriesService`
- `StackingBarSeriesService`
- `StackingBar100SeriesService`
- `StackingAreaSeriesService`
- `StackingArea100SeriesService`
- `StackingStepAreaSeriesService`
- `RangeAreaSeriesService`
- `RangeColumnSeriesService`
- `RangeStepAreaSeriesService`
- `SplineRangeAreaSeriesService`
- `ScatterSeriesService`
- `BubbleSeriesService`
- `HiloSeriesService`
- `HiloOpenCloseSeriesService`
- `CandleSeriesService`
- `HistogramSeriesService`
- `BoxAndWhiskerSeriesService`
- `WaterfallSeriesService`
- `ParetoSeriesService`
- `PolarSeriesService`
- `RadarSeriesService`
- `MultiColoredLineSeriesService`
- `MultiColoredAreaSeriesService`
- `WebMcpChartService`

Also import and provide the following services because an added series can use axes, markers, data labels, error bars, trendlines, or technical indicators:

- `CategoryService`
- `DateTimeService`
- `DateTimeCategoryService`
- `LogarithmicService`
- `DataLabelService`
- `ErrorBarService`
- `TrendlinesService`
- `SmaIndicatorService`
- `EmaIndicatorService`
- `TmaIndicatorService`
- `AtrIndicatorService`
- `RsiIndicatorService`
- `MacdIndicatorService`
- `MomentumIndicatorService`
- `StochasticIndicatorService`
- `BollingerBandsService`
- `AccumulationDistributionIndicatorService`

```ts
import {
    AccumulationDistributionIndicatorService, AreaSeriesService, AtrIndicatorService,
    BarSeriesService, BollingerBandsService, BoxAndWhiskerSeriesService,
    BubbleSeriesService, CandleSeriesService, CategoryService, ChartModule,
    ColumnSeriesService, DataLabelService, DateTimeCategoryService, DateTimeService,
    EmaIndicatorService, ErrorBarService, HiloOpenCloseSeriesService,
    HiloSeriesService, HistogramSeriesService, LineSeriesService,
    LogarithmicService, MacdIndicatorService, MomentumIndicatorService,
    MultiColoredAreaSeriesService, MultiColoredLineSeriesService,
    ParetoSeriesService, PolarSeriesService, RadarSeriesService,
    RangeAreaSeriesService, RangeColumnSeriesService, RangeStepAreaSeriesService,
    RsiIndicatorService, ScatterSeriesService, SmaIndicatorService,
    SplineAreaSeriesService, SplineRangeAreaSeriesService, SplineSeriesService,
    StackingArea100SeriesService, StackingAreaSeriesService,
    StackingBar100SeriesService, StackingBarSeriesService,
    StackingColumn100SeriesService, StackingColumnSeriesService,
    StackingLine100SeriesService, StackingLineSeriesService,
    StackingStepAreaSeriesService, StepAreaSeriesService, StepLineSeriesService,
    StochasticIndicatorService, TmaIndicatorService, TrendlinesService,
    WaterfallSeriesService, WebMcpChartService
} from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [ChartModule],
    providers: [
        AccumulationDistributionIndicatorService, AreaSeriesService,
        AtrIndicatorService, BarSeriesService, BollingerBandsService,
        BoxAndWhiskerSeriesService, BubbleSeriesService, CandleSeriesService,
        CategoryService, ColumnSeriesService, DataLabelService,
        DateTimeCategoryService, DateTimeService, EmaIndicatorService,
        ErrorBarService, HiloOpenCloseSeriesService, HiloSeriesService,
        HistogramSeriesService, LineSeriesService, LogarithmicService,
        MacdIndicatorService, MomentumIndicatorService,
        MultiColoredAreaSeriesService, MultiColoredLineSeriesService,
        ParetoSeriesService, PolarSeriesService, RadarSeriesService,
        RangeAreaSeriesService, RangeColumnSeriesService,
        RangeStepAreaSeriesService, RsiIndicatorService, ScatterSeriesService,
        SmaIndicatorService, SplineAreaSeriesService,
        SplineRangeAreaSeriesService, SplineSeriesService,
        StackingArea100SeriesService, StackingAreaSeriesService,
        StackingBar100SeriesService, StackingBarSeriesService,
        StackingColumn100SeriesService, StackingColumnSeriesService,
        StackingLine100SeriesService, StackingLineSeriesService,
        StackingStepAreaSeriesService, StepAreaSeriesService,
        StepLineSeriesService, StochasticIndicatorService,
        TmaIndicatorService, TrendlinesService, WaterfallSeriesService,
        WebMcpChartService
    ],
    standalone: true
})
```

### 4. `removeChartSeries`

**Required:** `WebMcpChartService` and the service for each rendered series type.

The series services must remain available while the Chart refreshes after removal.

### 5. `clearChartSeries`

**Required:** `WebMcpChartService` and all services used by the rendered series.

### 6. `updateChartAnnotation`

**Required:** `WebMcpChartService`, `ChartAnnotationService`.

```ts
providers: [ChartAnnotationService, WebMcpChartService]
```

### 7. `showChartTooltip`

**Required:** `WebMcpChartService`, `TooltipService`, and the rendered series service.

The Chart must also configure `tooltip.enable: true`.

### 8. `showChartCrosshair`

**Required:** `WebMcpChartService`, `CrosshairService`, and the rendered series service.

The Chart must configure `crosshair.enable: true`.

### 9. `exportChart`

**Required:** `WebMcpChartService`, `ExportService`, and the rendered Chart services.

The Chart must enable export through the supported export property.

### 10. `printChart`

**Required:** `WebMcpChartService`, `ExportService`, and the services used by the rendered Chart.

The Chart must enable export through the supported print property.

### 11. `updateChartDataSource`

**Required:** `WebMcpChartService` and every series service whose datasource may be updated.

If the tool can update Line and Column series:

```ts
providers: [LineSeriesService, ColumnSeriesService, WebMcpChartService]
```

### 12. `toggleChartSeriesVisibility`

**Required:** `WebMcpChartService`, the target series service, and `LegendService` when legend state is displayed or synchronized.

### 13. `configureChartZoom`

**Required:** `WebMcpChartService`, `ZoomService`, and the rendered series service.

### 14. `resetChartZoom`

**Required:** `WebMcpChartService`, `ZoomService`, and the rendered series service.

### 15. `selectChartPoints`

**Required:** `WebMcpChartService`, `SelectionService`, and the target series service.

The requested mode must be compatible with `Point`, `Series`, or `Cluster` selection.

### 16. `clearChartSelection`

**Required:** `WebMcpChartService`, `SelectionService`, and the rendered series service.

### 17. `addChartAxis`

**Required:** `WebMcpChartService` and every axis feature service the new axis may use.

Possible axis services include:

```ts
CategoryService, DateTimeService, DateTimeCategoryService, LogarithmicService,
MultiLevelLabelService, StripLineService, ScrollBarService
```

Do not provide all axis services unless the tool is allowed to use all corresponding axis features.

### 18. `updateChartAxis`

**Required:** `WebMcpChartService` and services for every axis feature the tool is permitted to enable or modify, including value-type, multilevel-label, stripline, and scrollbar services.

### 19. `updateChartTitle`

**Required:** `WebMcpChartService` and the services used by the rendered Chart.

No separate title service is required.

### 20. `hideChartTooltip`

**Required:** `WebMcpChartService`, `TooltipService`, and the rendered series service.

### 21. `hideChartCrosshair`

**Required:** `WebMcpChartService`, `CrosshairService`, and the rendered series service.

### 22. `updateChartProperties`

**Required:** `WebMcpChartService` and every Chart feature service that the tool is permitted to enable or modify.

For an unrestricted `updateChartProperties` sample, import and provide the complete supported feature set. Do not reduce the list based on the initial series because the tool can dynamically enable Chart-level features.

A complete EJ2 TypeScript import and injection set is:

```ts
import {
    AccumulationDistributionIndicator, AreaSeries, AtrIndicator, BarSeries, BollingerBands,
    BoxAndWhiskerSeries, BubbleSeries, CandleSeries, Category, Chart, ChartAnnotation,
    ColumnSeries, Crosshair, DataEditing, DataLabel, DateTime, DateTimeCategory,
    EmaIndicator, ErrorBar, Export, Highlight, HiloOpenCloseSeries, HiloSeries,
    HistogramSeries, Legend, LineSeries, Logarithmic, MacdIndicator, MomentumIndicator,
    MultiColoredAreaSeries, MultiColoredLineSeries, MultiLevelLabel, ParetoSeries,
    PolarSeries, RadarSeries, RangeAreaSeries, RangeColumnSeries, RangeStepAreaSeries,
    RsiIndicator, ScatterSeries, ScrollBar, Selection, SmaIndicator, SplineAreaSeries,
    SplineRangeAreaSeries, SplineSeries, StackingArea100Series, StackingAreaSeries,
    StackingBar100Series, StackingBarSeries, StackingColumn100Series,
    StackingColumnSeries, StackingLine100Series, StackingLineSeries,
    StackingStepAreaSeries, StepAreaSeries, StepLineSeries, StochasticIndicator,
    StripLine, TmaIndicator, Tooltip, Trendlines, WaterfallSeries, WebMcpChart, Zoom
} from '../../../src/chart/index';

Chart.Inject(
    AccumulationDistributionIndicator, AreaSeries, AtrIndicator, BarSeries, BollingerBands,
    BoxAndWhiskerSeries, BubbleSeries, CandleSeries, Category, ChartAnnotation,
    ColumnSeries, Crosshair, DataEditing, DataLabel, DateTime, DateTimeCategory,
    EmaIndicator, ErrorBar, Export, Highlight, HiloOpenCloseSeries, HiloSeries,
    HistogramSeries, Legend, LineSeries, Logarithmic, MacdIndicator, MomentumIndicator,
    MultiColoredAreaSeries, MultiColoredLineSeries, MultiLevelLabel, ParetoSeries,
    PolarSeries, RadarSeries, RangeAreaSeries, RangeColumnSeries, RangeStepAreaSeries,
    RsiIndicator, ScatterSeries, ScrollBar, Selection, SmaIndicator, SplineAreaSeries,
    SplineRangeAreaSeries, SplineSeries, StackingArea100Series, StackingAreaSeries,
    StackingBar100Series, StackingBarSeries, StackingColumn100Series,
    StackingColumnSeries, StackingLine100Series, StackingLineSeries,
    StackingStepAreaSeries, StepAreaSeries, StepLineSeries, StochasticIndicator,
    StripLine, TmaIndicator, Tooltip, Trendlines, WaterfallSeries, WebMcpChart, Zoom
);
```

For Angular, use the corresponding `*Service` imports in `providers`, including `WebMcpChartService`.

### 23. `updateChartSeries`

### 3. `addChartSeries`

**Required:** `WebMcpChartService` and all supported Chart series services because the tool can change an existing series from its current type to any other supported series type.

Import and provide:

- `LineSeriesService`
- `ColumnSeriesService`
- `BarSeriesService`
- `AreaSeriesService`
- `SplineSeriesService`
- `SplineAreaSeriesService`
- `StepLineSeriesService`
- `StepAreaSeriesService`
- `StackingLineSeriesService`
- `StackingLine100SeriesService`
- `StackingColumnSeriesService`
- `StackingColumn100SeriesService`
- `StackingBarSeriesService`
- `StackingBar100SeriesService`
- `StackingAreaSeriesService`
- `StackingArea100SeriesService`
- `StackingStepAreaSeriesService`
- `RangeAreaSeriesService`
- `RangeColumnSeriesService`
- `RangeStepAreaSeriesService`
- `SplineRangeAreaSeriesService`
- `ScatterSeriesService`
- `BubbleSeriesService`
- `HiloSeriesService`
- `HiloOpenCloseSeriesService`
- `CandleSeriesService`
- `HistogramSeriesService`
- `BoxAndWhiskerSeriesService`
- `WaterfallSeriesService`
- `ParetoSeriesService`
- `PolarSeriesService`
- `RadarSeriesService`
- `MultiColoredLineSeriesService`
- `MultiColoredAreaSeriesService`
- `WebMcpChartService`

Also import and provide the following services because an added series can use axes, markers, data labels, error bars, trendlines, or technical indicators:

- `CategoryService`
- `DateTimeService`
- `DateTimeCategoryService`
- `LogarithmicService`
- `DataLabelService`
- `ErrorBarService`
- `TrendlinesService`
- `SmaIndicatorService`
- `EmaIndicatorService`
- `TmaIndicatorService`
- `AtrIndicatorService`
- `RsiIndicatorService`
- `MacdIndicatorService`
- `MomentumIndicatorService`
- `StochasticIndicatorService`
- `BollingerBandsService`
- `AccumulationDistributionIndicatorService`

Use the same complete import and provider configuration shown for addChartSeries.

Do not import only the current and expected target series services. WebMCP can generate a different valid target series type at runtime. Keeping every supported series service available ensures that changes such as Column to Line, Line to Spline, Area to StackingArea, or Hilo to Candle do not fail because of a missing service.

```ts
import {
    AccumulationDistributionIndicatorService, AreaSeriesService, AtrIndicatorService,
    BarSeriesService, BollingerBandsService, BoxAndWhiskerSeriesService,
    BubbleSeriesService, CandleSeriesService, CategoryService, ChartModule,
    ColumnSeriesService, DataLabelService, DateTimeCategoryService, DateTimeService,
    EmaIndicatorService, ErrorBarService, HiloOpenCloseSeriesService,
    HiloSeriesService, HistogramSeriesService, LineSeriesService,
    LogarithmicService, MacdIndicatorService, MomentumIndicatorService,
    MultiColoredAreaSeriesService, MultiColoredLineSeriesService,
    ParetoSeriesService, PolarSeriesService, RadarSeriesService,
    RangeAreaSeriesService, RangeColumnSeriesService, RangeStepAreaSeriesService,
    RsiIndicatorService, ScatterSeriesService, SmaIndicatorService,
    SplineAreaSeriesService, SplineRangeAreaSeriesService, SplineSeriesService,
    StackingArea100SeriesService, StackingAreaSeriesService,
    StackingBar100SeriesService, StackingBarSeriesService,
    StackingColumn100SeriesService, StackingColumnSeriesService,
    StackingLine100SeriesService, StackingLineSeriesService,
    StackingStepAreaSeriesService, StepAreaSeriesService, StepLineSeriesService,
    StochasticIndicatorService, TmaIndicatorService, TrendlinesService,
    WaterfallSeriesService, WebMcpChartService
} from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [ChartModule],
    providers: [
        AccumulationDistributionIndicatorService, AreaSeriesService,
        AtrIndicatorService, BarSeriesService, BollingerBandsService,
        BoxAndWhiskerSeriesService, BubbleSeriesService, CandleSeriesService,
        CategoryService, ColumnSeriesService, DataLabelService,
        DateTimeCategoryService, DateTimeService, EmaIndicatorService,
        ErrorBarService, HiloOpenCloseSeriesService, HiloSeriesService,
        HistogramSeriesService, LineSeriesService, LogarithmicService,
        MacdIndicatorService, MomentumIndicatorService,
        MultiColoredAreaSeriesService, MultiColoredLineSeriesService,
        ParetoSeriesService, PolarSeriesService, RadarSeriesService,
        RangeAreaSeriesService, RangeColumnSeriesService,
        RangeStepAreaSeriesService, RsiIndicatorService, ScatterSeriesService,
        SmaIndicatorService, SplineAreaSeriesService,
        SplineRangeAreaSeriesService, SplineSeriesService,
        StackingArea100SeriesService, StackingAreaSeriesService,
        StackingBar100SeriesService, StackingBarSeriesService,
        StackingColumn100SeriesService, StackingColumnSeriesService,
        StackingLine100SeriesService, StackingLineSeriesService,
        StackingStepAreaSeriesService, StepAreaSeriesService,
        StepLineSeriesService, StochasticIndicatorService,
        TmaIndicatorService, TrendlinesService, WaterfallSeriesService,
        WebMcpChartService
    ],
    standalone: true
})
```
for example
```ts
await executeTool('updateChartSeries', {
    seriesIndex: 0,
    properties: {
        type: 'Spline',
        name: 'Updated values',
        width: 3,
        marker: {
            visible: true
        }
    }
});
```
### Important distinction

Use **all series services** for:

- `addChartSeries`
- `updateChartSeries`

For tools that only read or modify data in an existing series, such as `getSeriesData`, `updateChartPoint`, `appendChartData`, or `removeChartPoints`, retain only the service for the rendered series type unless that tool is also allowed to change the series type.

### 24. `updateChartPoint`

**Required:** `WebMcpChartService` and the target series service.

### 25. `appendChartData`

**Required:** `WebMcpChartService` and the target series service.

### 26. `removeChartPoints`

**Required:** `WebMcpChartService` and the target series service.

### 27. `getChartPoint`

**Required:** `WebMcpChartService` and the target series service.

### 28. `getSelectedChartData`

**Required:** `WebMcpChartService`, `SelectionService`, and the target series service.

### 29. `getChartAxes`

**Required:** `WebMcpChartService` and the axis services used by the rendered Chart.

### 30. `getChartIndicators`

**Required:** `WebMcpChartService` and the indicator services used by the rendered Chart.

Possible indicator services include:

```ts
SmaIndicatorService, EmaIndicatorService, TmaIndicatorService, AtrIndicatorService,
RsiIndicatorService, MacdIndicatorService, MomentumIndicatorService,
StochasticIndicatorService, BollingerBandsService,
AccumulationDistributionIndicatorService
```

### 31. `getChartStriplines`

**Required:** `WebMcpChartService`, `StripLineService`.

### 32. `removeChartAxis`

**Required:** `WebMcpChartService` and the services used by the target secondary axis.

### 33. `getChartAnnotations`

**Required:** `WebMcpChartService`, `ChartAnnotationService`.

### 34. `addChartAnnotation`

**Required:** `WebMcpChartService`, `ChartAnnotationService`.

### 35. `removeChartAnnotation`

**Required:** `WebMcpChartService`, `ChartAnnotationService`.

### 36. `animateChart`

**Required:** `WebMcpChartService` and the rendered series services.

No separate animation service is required.

### 37. `getChartLegend`

**Required:** `WebMcpChartService`, `LegendService`, and the rendered series services.

## Focused Limited-Tool Angular Sample

```ts
import { Component } from '@angular/core';
import {
    ChartModule, ColumnSeriesService, LineSeriesService, TooltipService,
    WebMcpChartService, WebMcpToolExecuteEventArgs
} from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [ChartModule],
    providers: [
        LineSeriesService, ColumnSeriesService, TooltipService, WebMcpChartService
    ],
    standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="limitedChart" [enableWebMcp]="true"
        [webMcpSettings]="webMcpSettings" [tooltip]="tooltip"
        (beforeWebMcpToolExecute)="beforeWebMcpToolExecute($event)">
        <e-series-collection>
            <e-series [dataSource]="chartData" type="Line" xName="x" yName="y"></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent {
    public chartData: Object[] = [
        { x: 1, y: 32 },
        { x: 2, y: 48 },
        { x: 3, y: 42 }
    ];
    public tooltip: Object = { enable: true };
    public webMcpSettings: Object = {
        name: 'limitedChart',
        tools: [
            'inspectChart',
            'getSeriesData',
            'showChartTooltip',
            'hideChartTooltip',
            'updateChartSeries'
        ]
    };

    public beforeWebMcpToolExecute(args: WebMcpToolExecuteEventArgs): void {
        args.showConfirmationDialog = true;
    }
}
```

`ColumnSeriesService` is included because `updateChartSeries` may switch the Line series to Column. Category, legend, crosshair, and zoom services are intentionally omitted.

## Custom WebMCP Tool Sample

```ts
import { Component } from '@angular/core';
import {
    ChartModule, LineSeriesService, WebMcpChartService, WebMcpToolExecuteEventArgs
} from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [ChartModule],
    providers: [LineSeriesService, WebMcpChartService],
    standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="salesChart" [enableWebMcp]="true"
        [webMcpSettings]="webMcpSettings"
        (beforeWebMcpToolExecute)="beforeWebMcpToolExecute($event)">
        <e-series-collection>
            <e-series [dataSource]="chartData" type="Line" xName="x" yName="y"></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent {
    public chartData: Array<{ x: number; y: number }> = [
        { x: 1, y: 32 },
        { x: 2, y: 48 },
        { x: 3, y: 42 },
        { x: 4, y: 65 }
    ];
    public webMcpSettings: Object = {
        name: 'salesChart',
        tools: [{
            name: 'getHighestChartPoint',
            description: 'Returns the point with the highest Y value.',
            inputSchema: {
                type: 'object',
                properties: {},
                additionalProperties: false
            },
            execute: async (): Promise<Object> => {
                const point = this.chartData.reduce(
                    (current, item) => item.y > current.y ? item : current
                );
                return { success: true, point };
            }
        }]
    };

    public beforeWebMcpToolExecute(args: WebMcpToolExecuteEventArgs): void {
        if (args.toolName.endsWith('_getHighestChartPoint')) {
            args.showConfirmationDialog = false;
        }
    }
}
```

This custom tool reads Line-series data only, so `LineSeriesService` and `WebMcpChartService` are sufficient.
