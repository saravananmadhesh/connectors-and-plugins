# Syncfusion Vue Chart API Reference Additions

## Axis Label Intersection

### `LabelIntersectAction`

| Value | Description |
|---|---|
| `None` | Takes no action; labels may overlap. |
| `Hide` | Hides intersecting labels. |
| `Trim` | Trims labels with an ellipsis. |
| `Wrap` | Wraps labels onto multiple lines. |
| `MultipleRows` | Arranges labels in multiple rows. |
| `Rotate45` | Rotates intersecting labels by 45 degrees. |
| `Rotate90` | Rotates intersecting labels by 90 degrees. |
| `Rotate45WithTrim` | Rotates intersecting labels by 45 degrees and trims text exceeding the available bounds. |
| `Rotate90WithTrim` | Rotates intersecting labels by 90 degrees and trims text exceeding the available bounds. |

```ts
const primaryXAxis: Object = {
  valueType: 'Category',
  labelIntersectAction: 'Rotate45WithTrim',
  maximumLabelWidth: 90
};
```

## Data Label Settings

### `DataLabelSettingsModel`

```ts
interface DataLabelSettingsModel {
  visible?: boolean;
  position?: string;
  format?: string;
  labelIntersectAction?: DataLabelIntersectAction;
  smartLabelSettings?: SmartLabelSettingsModel;
}
```

### `DataLabelIntersectAction`

| Value | Description |
|---|---|
| `None` | Displays all data labels even when they overlap. |
| `Hide` | Hides overlapping data labels. |
| `Rotate90` | Rotates overlapping data labels by 90 degrees. |
| `RelocateVertically` | Relocates overlapping stacked-series labels vertically and connects them to their points. |
| `RelocateHorizontally` | Relocates overlapping stacked-series labels horizontally and wraps them when required. |

### `SmartLabelSettingsModel`

| Property | Type | Description |
|---|---|---|
| `background` | `string` | Background color of the relocated label. |
| `pointerShape` | `'Arrow' | 'None'` | Displays an arrow pointer or only the connector line. |
| `border` | `Object` | Border configuration for the relocated label. |
| `connectorLineStyle` | `Object` | Connector color, width, and dash array. |
| `offset` | `number` | Anchor position from 0 through 1 for vertical relocation. Horizontal relocation uses an effective offset of 0. |

```ts
const marker: Object = {
  dataLabel: {
    visible: true,
    labelIntersectAction: 'RelocateVertically',
    smartLabelSettings: {
      background: '#0F172A',
      pointerShape: 'Arrow',
      border: { color: '#334155', width: 1 },
      connectorLineStyle: { color: '#64748B', width: 1, dashArray: '3,2' },
      offset: 0.5
    }
  }
};
```

## Stack Labels

`stackLabels` is a Chart-level setting that displays aggregate totals for visible stacks. Zero-total stacks render at the value-axis baseline, including null values normalized to zero and positive/negative values that cancel.

## Tooltip Raw Data

The complete datasource record is available only in `tooltipRender` through `args.data.rawData`.

```ts
const tooltipRender = (args: any): void => {
  if (!args.data || !args.data.rawData) return;
  const high: number = args.data.rawData.high;
};
```

Do not use `${point.data.<field>}` for this feature.

## WebMCP

### Chart properties

| Property | Type | Default | Description |
|---|---|---|---|
| `enableWebMcp` | `boolean` | `false` | Enables automatic WebMCP tool registration after rendering. |
| `webMcpSettings` | `Object` | `null` | Configures the registration name, selected or custom tools, and exposure targets. |

### `webMcpSettings`

| Property | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | `null` | Prefix for registered tool names. The Chart ID is used when omitted or empty. |
| `tools` | `string[] | Object[]` | `null` | Built-in allowlist or custom tool definitions. Omit to register all built-ins. |
| `exposedTo` | `string[]` | `null` | Model contexts or origins permitted to access the tools. |

### Method

| Method | Returns | Description |
|---|---|---|
| `getWebMcpTools(tools?: string[])` | Executable tool definitions | Retrieves all or selected built-in tools for diagnostics, testing, or direct execution. |

### Event

| Event | Description |
|---|---|
| `beforeWebMcpToolExecute` | Runs before tool execution and can cancel or control confirmation. |

### Required Vue providers

```ts
provide('chart', [
  AccumulationDistributionIndicator, AreaSeries, AtrIndicator, BarSeries, BollingerBands,
  BoxAndWhiskerSeries, BubbleSeries, CandleSeries, Category, ChartAnnotation, ColumnSeries,
  Crosshair, DataEditing, DataLabel, DateTime, DateTimeCategory, EmaIndicator, ErrorBar,
  Export, Highlight, HiloOpenCloseSeries, HiloSeries, HistogramSeries, Legend, LineSeries,
  Logarithmic, MacdIndicator, MomentumIndicator, MultiColoredAreaSeries,
  MultiColoredLineSeries, MultiLevelLabel, ParetoSeries, PolarSeries, RadarSeries,
  RangeAreaSeries, RangeColumnSeries, RangeStepAreaSeries, RsiIndicator, ScatterSeries,
  ScrollBar, Selection, SmaIndicator, SplineAreaSeries, SplineRangeAreaSeries, SplineSeries,
  StackingArea100Series, StackingAreaSeries, StackingBar100Series, StackingBarSeries,
  StackingColumn100Series, StackingColumnSeries, StackingLine100Series,
  StackingLineSeries, StackingStepAreaSeries, StepAreaSeries, StepLineSeries,
  StochasticIndicator, StripLine, TmaIndicator, Tooltip, Trendlines, WaterfallSeries,
  WebMcpChart, Zoom
]);
```

For WebMCP samples, import and provide every available Chart feature module. Do not reduce the list based on the initially rendered series because WebMCP can change series types and enable additional features at runtime.

### WebMCP generation rules

- Import every available Chart feature module.
- Include every feature module in `provide('chart', [...])`.
- Always include `WebMcpChart`.
- Do not reduce providers based on the initial series type.
- Give the Chart a stable ID.
- Set `:enableWebMcp="true"`.
- Registration is automatic.
- Do not call `registerWebMcpTools()` or generate a registration button.
- Omit `tools` when all built-in tools are required.
- Use only verified tool names in an explicit allowlist.
- Use `getWebMcpTools()` only for retrieval, diagnostics, testing, or direct execution.
