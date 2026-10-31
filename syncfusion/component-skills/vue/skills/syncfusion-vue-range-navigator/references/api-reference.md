# Range Navigator API Reference

Complete API reference for the Syncfusion Vue 3 Range Navigator ([`RangeNavigatorComponent`](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/)) component, an interactive data visualization control that enables users to scroll, navigate, and select ranges across datasets.

- **Base API Documentation:** [Range Navigator](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/index-default)
- **Package:** `@syncfusion/ej2-vue-charts`
- **Component:** `RangeNavigatorComponent`

## Table of Contents

- [Component Registration](#component-registration)
  - [Vue 3 Composition API](#vue-3-composition-api)
  - [Vue 3 Options API](#vue-3-options-api)
- [Properties](#properties)
  - [Data Binding and Selection](#data-binding-and-selection)
  - [Axis and Scale](#axis-and-scale)
  - [Labeling and Axis Presentation](#labeling-and-axis-presentation)
  - [Layout and Appearance](#layout-and-appearance)
  - [Interactivity, Period Selection, and Tooltip](#interactivity-period-selection-and-tooltip)
  - [Localization, HTML, and State](#localization-html-and-state)
- [Data Models](#data-models)
  - [RangeNavigatorSeriesModel](#rangenavigatorseriesmodel)
  - [FontModel](#fontmodel)
  - [BorderModel](#bordermodel)
  - [MarginModel](#marginmodel)
  - [StyleSettingsModel](#stylesettingsmodel)
  - [ThumbSettings](#thumbsettings)
  - [PeriodSelectorSettingsModel](#periodselectorsettingsmodel)
  - [PeriodModel](#periodmodel)
  - [RangeTooltipSettingsModel](#rangetooltipsettingsmodel)
  - [MajorTickLinesModel](#majorticklinesmodel)
  - [AnimationModel](#animationmodel)
- [Events](#events)
  - [changed](#changed)
  - [load](#load)
  - [loaded](#loaded)
  - [labelRender](#labelrender)
  - [tooltipRender](#tooltiprender)
  - [selectorRender](#selectorrender)
  - [beforeResize](#beforeresize)
  - [resized](#resized)
  - [beforePrint](#beforeprint)
- [Methods](#methods)
  - [export()](#export)
  - [print()](#print)
  - [destroy()](#destroy)
  - [getModuleName()](#getmodulename)
  - [renderChart()](#renderchart)
- [Enums](#enums)
  - [RangeValueType](#rangevaluetype)
  - [RangeIntervalType](#rangeintervaltype)
  - [RangeNavigatorType](#rangenavigatortype)
  - [RangeLabelIntersectAction](#rangelabelintersectaction)
  - [NavigatorPlacement](#navigatorplacement)
  - [AxisPosition](#axisposition)
  - [TooltipDisplayMode](#tooltipdisplaymode)
  - [PeriodSelectorPosition](#periodselectorposition)
  - [ThumbType](#thumbtype)
  - [ChartTheme](#charttheme)
  - [ExportType](#exporttype)
- [Child Directives](#child-directives)
  - [RangenavigatorSeriesCollectionDirective](#rangenavigatorseriescollectiondirective)
  - [RangenavigatorSeriesDirective](#rangenavigatorseriesdirective)
- [Modules](#modules)
  - [DateTime](#datetime)
  - [AreaSeries](#areaseries)
  - [LineSeries](#lineseries)
  - [StepLineSeries](#steplineseries)
  - [PeriodSelector](#periodselector)
  - [Logarithmic](#logarithmic)
  - [Double](#double)
- [Common Usage Patterns](#common-usage-patterns)
  - [Pattern 1: Range Navigator with Period Selector](#pattern-1-range-navigator-with-period-selector)
  - [Pattern 2: Synchronizing Range Navigator with Chart](#pattern-2-synchronizing-range-navigator-with-chart)
  - [Pattern 3: Lightweight Mode (Mobile Optimization)](#pattern-3-lightweight-mode-mobile-optimization)
  - [Pattern 4: Custom Tooltip and Styling](#pattern-4-custom-tooltip-and-styling)
- [Additional Resources](#additional-resources)

---

## Component Registration

### Vue 3 Composition API

```vue
<template>
  <div class="app-container">
    <ejs-rangenavigator
      :valueType="valueType"
      :value="rangeValue"
      :labelFormat="labelFormat"
      @changed="onRangeChanged"
    >
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series
          :dataSource="data"
          xName="x"
          yName="y"
          type="Area"
          :width="2"
        />
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  AreaSeries,
  DateTime
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM-yy';

const rangeValue = ref([new Date(2023, 0, 1), new Date(2023, 11, 31)]);
const data = ref([
  { x: new Date(2023, 0, 1), y: 21 },
  { x: new Date(2023, 0, 2), y: 24 },
  { x: new Date(2023, 0, 3), y: 36 },
  { x: new Date(2023, 0, 4), y: 38 }
]);

const onRangeChanged = (args) => {
  console.log('Range changed:', args.start, args.end);
  rangeValue.value = [new Date(args.start), new Date(args.end)];
};

// Provide required modules for the Range Navigator
provide('rangeNavigator', [DateTime, AreaSeries]);
</script>
```

### Vue 3 Options API

```vue
<template>
  <div class="app-container">
    <ejs-rangenavigator
      :valueType="valueType"
      :value="rangeValue"
      :labelFormat="labelFormat"
      @changed="onRangeChanged"
    >
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series
          :dataSource="data"
          xName="x"
          yName="y"
          type="Area"
          :width="2"
        />
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  </div>
</template>

<script>
import {
  RangeNavigatorComponent,
  RangenavigatorSeriesCollectionDirective,
  RangenavigatorSeriesDirective,
  AreaSeries,
  DateTime
} from '@syncfusion/ej2-vue-charts';

export default {
  name: 'App',
  components: {
    'ejs-rangenavigator': RangeNavigatorComponent,
    'e-rangenavigator-series-collection': RangenavigatorSeriesCollectionDirective,
    'e-rangenavigator-series': RangenavigatorSeriesDirective
  },
  provide: {
    rangeNavigator: [DateTime, AreaSeries]
  },
  data() {
    return {
      valueType: 'DateTime',
      labelFormat: 'MMM-yy',
      rangeValue: [new Date(2023, 0, 1), new Date(2023, 11, 31)],
      data: [
        { x: new Date(2023, 0, 1), y: 21 },
        { x: new Date(2023, 0, 2), y: 24 },
        { x: new Date(2023, 0, 3), y: 36 },
        { x: new Date(2023, 0, 4), y: 38 }
      ]
    };
  },
  methods: {
    onRangeChanged(args) {
      console.log('Range changed:', args.start, args.end);
      this.rangeValue = [new Date(args.start), new Date(args.end)];
    }
  }
};
</script>
```

---

## Properties

### Data Binding and Selection

| Property | Type | Default | Description | Link |
|---|---|---|---|---|
| `dataSource` | `Object \| DataManager` | `null` | Defines the data source for root-level binding (used in lightweight mode or when no series is present). For series-based rendering, set `dataSource` on individual `<e-rangenavigator-series>` directives. | [dataSource](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#datasource) |
| `xName` | `string` | `null` | Identifies the field that provides x-axis values when using root-level data binding. For series, set on `<e-rangenavigator-series>`. | [xName](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#xname) |
| `yName` | `string` | `null` | Identifies the field that provides y-axis values when using root-level data binding. For series, set on `<e-rangenavigator-series>`. | [yName](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#yname) |
| `query` | `Query` | `null` | Applies a query to the bound data source before the navigator renders. | [query](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#query) |
| `value` | `number[] \| Date[]` | `[]` | Selected range as `[start, end]`. For DateTime, use Date objects. For numeric, use numbers. | [value](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#value) |
| `valueType` | `RangeValueType` | `'Double'` | Specifies the data type for the axis. Supported values: `'Double'`, `'DateTime'`, `'Logarithmic'`, `'DateTimeCategory'`. | [valueType](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#valuetype) |
| `allowIntervalData` | `boolean` | `false` | Allows users to select data for a specific interval by clicking the corresponding axis label. | [allowIntervalData](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#allowintervaldata) |
| `allowSnapping` | `boolean` | `false` | Enables snapping for range navigator slider handles to the nearest interval. | [allowSnapping](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#allowsnapping) |
| `series` | `RangeNavigatorSeriesModel[]` | `[]` | Defines the collection of series rendered inside the range navigator. Use `<e-rangenavigator-series-collection>` and `<e-rangenavigator-series>` directives. | [series](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#series) |

### Axis and Scale

| Property | Type | Default | Description | Link |
|---|---|---|---|---|
| `minimum` | `number \| Date` | `null` | Sets the minimum value for the axis. | [minimum](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#minimum) |
| `maximum` | `number \| Date` | `null` | Sets the maximum value for the axis. | [maximum](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#maximum) |
| `interval` | `number` | `null` | Sets the interval used to generate ticks and labels on the axis. | [interval](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#interval) |
| `intervalType` | `RangeIntervalType` | `'Auto'` | Sets the time unit for date-time axes. Supported values: `'Auto'`, `'Years'`, `'Months'`, `'Weeks'`, `'Days'`, `'Hours'`, `'Minutes'`, `'Seconds'`. | [intervalType](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#intervaltype) |
| `groupBy` | `RangeIntervalType` | `'Auto'` | Specifies how labels are grouped across the navigator axis. | [groupBy](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#groupby) |
| `logBase` | `number` | `10` | Defines the logarithmic base when using a logarithmic axis. | [logBase](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#logbase) |

### Labeling and Axis Presentation

| Property | Type | Default | Description | Link |
|---|---|---|---|---|
| `labelFormat` | `string` | `''` | Formats axis labels using standard format strings (e.g., `'C'`, `'n1'`, `'P'`) or placeholders (e.g., `'{value}°C'`). | [labelFormat](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#labelformat) |
| `labelPlacement` | `NavigatorPlacement` | `'Auto'` | Specifies label placement relative to ticks. Supported values: `'BetweenTicks'`, `'OnTicks'`, `'Auto'`. | [labelPlacement](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#labelplacement) |
| `labelPosition` | `AxisPosition` | `'Outside'` | Positions axis labels either `'Inside'` or `'Outside'` the navigator axis. | [labelPosition](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#labelposition) |
| `labelStyle` | `FontModel` | `{}` | Configures font appearance for axis labels. See [`FontModel`](#fontmodel). | [labelStyle](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#labelstyle) |
| `labelIntersectAction` | `RangeLabelIntersectAction` | `'Hide'` | Controls overlapping label behavior. Supported values: `'None'` (show all), `'Hide'` (hide overlapping). | [labelIntersectAction](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#labelintersectaction) |
| `skeleton` | `string` | `''` | Specifies the date-time skeleton format for label formatting. | [skeleton](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#skeleton) |
| `skeletonType` | `SkeletonType` | `'DateTime'` | Specifies whether the skeleton is applied as `'Date'`, `'Time'`, or `'DateTime'` formatting. | [skeletonType](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#skeletontype) |
| `enableGrouping` | `boolean` | `false` | Enables grouped label rendering for supported axis types. | [enableGrouping](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#enablegrouping) |
| `secondaryLabelAlignment` | `LabelAlignment` | `'Middle'` | Aligns secondary axis labels relative to available space. | [secondaryLabelAlignment](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#secondarylabelalignment) |
| `tickPosition` | `AxisPosition` | `'Outside'` | Positions tick marks either `'Inside'` or `'Outside'` the axis line. | [tickPosition](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#tickposition) |
| `majorTickLines` | `MajorTickLinesModel` | `{}` | Configures the major tick lines. See [`MajorTickLinesModel`](#majorticklines). | [majorTickLines](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#majorticklines) |
| `majorGridLines` | `MajorGridLinesModel` | `{}` | Configures the major grid lines. | [majorGridLines](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#majorgridlines) |

### Layout and Appearance

| Property | Type | Default | Description | Link |
|---|---|---|---|---|
| `width` | `string` | `null` | Sets the overall width of the range navigator (e.g., `'100%'`, `'500px'`). | [width](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#width) |
| `height` | `string` | `null` | Sets the overall height of the range navigator (e.g., `'100px'`, `'100%'`). | [height](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#height) |
| `margin` | `MarginModel` | `{}` | Defines outer spacing around the navigator. See [`MarginModel`](#marginmodel). | [margin](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#margin) |
| `navigatorBorder` | `BorderModel` | `{}` | Configures the border drawn around the navigator. See [`BorderModel`](#bordermodel). | [navigatorBorder](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#navigatorborder) |
| `background` | `string` | `null` | Sets the background color (accepts hex and rgba CSS color values). | [background](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#background) |
| `theme` | `ChartTheme` | `'Material'` | Applies a predefined visual theme. Supported values: `'Material'`, `'Fabric'`, `'Bootstrap'`, `'Highcontrast'`, `'MaterialDark'`, etc. | [theme](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#theme) |
| `animationDuration` | `number` | `500` | Sets the duration (in milliseconds) for component animation. | [animationDuration](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#animationduration) |
| `navigatorStyleSettings` | `StyleSettingsModel` | `{}` | Customizes selected region, unselected region, and thumb styling. See [`StyleSettingsModel`](#stylesettingsmodel). | [navigatorStyleSettings](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#navigatorstylesettings) |

### Interactivity, Period Selection, and Tooltip

| Property | Type | Default | Description | Link |
|---|---|---|---|---|
| `periodSelectorSettings` | `PeriodSelectorSettingsModel` | `{}` | Configures the preset period selector shown with the navigator. See [`PeriodSelectorSettingsModel`](#periodselectorsettingsmodel). | [periodSelectorSettings](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#periodselectorsettings) |
| `disableRangeSelector` | `boolean` | `false` | When `true`, renders the period selector without the interactive range selector surface. | [disableRangeSelector](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#disablerangeselector) |
| `enableDeferredUpdate` | `boolean` | `false` | When `true`, delays range updates until the user finishes dragging the slider. | [enableDeferredUpdate](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#enabledeferredupdate) |
| `tooltip` | `RangeTooltipSettingsModel` | `{}` | Configures the tooltip for the selected range. See [`RangeTooltipSettingsModel`](#rangetooltipsettingsmodel). | [tooltip](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#tooltip) |

### Localization, HTML, and State

| Property | Type | Default | Description | Link |
|---|---|---|---|---|
| `locale` | `string` | `'en-US'` | Overrides the global culture and localization for this instance. | [locale](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#locale) |
| `enableRtl` | `boolean` | `false` | Enables right-to-left layout and rendering behavior. | [enableRtl](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#enablertl) |
| `enablePersistence` | `boolean` | `false` | When `true`, persists component state (selected range, etc.) across page reloads. | [enablePersistence](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#enablepersistence) |
| `useGroupingSeparator` | `boolean` | `false` | When `true`, displays grouping separators in numeric value formatting. | [useGroupingSeparator](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#usegroupingseparator) |

---

## Data Models

### RangeNavigatorSeriesModel

Defines configuration for series rendered in the range navigator.

| Property | Type | Default | Description |
|---|---|---|---|
| `dataSource` | `Object \| DataManager` | `null` | Data source for this specific series. |
| `xName` | `string` | `null` | Field name for x-values. |
| `yName` | `string` | `null` | Field name for y-values. |
| `type` | `RangeNavigatorType` | `'Line'` | Series rendering type: `'Line'`, `'Area'`, `'StepLine'`. |
| `fill` | `string` | `null` | Fill color for the series (hex or rgba). |
| `width` | `number` | `1` | Stroke width of the series in pixels. |
| `opacity` | `number` | `1` | Opacity of the series (0-1). |
| `dashArray` | `string` | `''` | Dash pattern for line-type series (e.g., `'5,5'`). |
| `query` | `Query` | `null` | Query to apply to the series data source. |
| `animation` | `AnimationModel` | `{}` | Animation settings for the series. |

**API Reference:** [RangeNavigatorSeriesModel](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/rangenavigatorseriesmodel)

### FontModel

Configures font properties for labels, tooltips, and other text elements.

| Property | Type | Default | Description |
|---|---|---|---|
| `size` | `string` | `'16px'` | Font size (e.g., `'14px'`, `'1.5em'`). |
| `color` | `string` | `null` | Text color (hex, rgb, or named color). |
| `fontFamily` | `string` | `'Segoe UI'` | Font family name. |
| `fontStyle` | `string` | `'Normal'` | Font style: `'Normal'`, `'Italic'`, `'Oblique'`. |
| `fontWeight` | `string` | `'Normal'` | Font weight: `'Normal'`, `'Bold'`, `'100'` to `'900'`. |
| `opacity` | `number` | `1` | Text opacity (0-1). |
| `textAlignment` | `Alignment` | `'Center'` | Text alignment: `'Center'`, `'Left'`, `'Right'`. |
| `textOverflow` | `TextOverflow` | `'Trim'` | How overflowing text is handled: `'Trim'`, `'Wrap'`. |

**API Reference:** [FontModel](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/fontmodel)

### BorderModel

Configures border appearance.

| Property | Type | Default | Description |
|---|---|---|---|
| `color` | `string` | `'#000000'` | Border color (hex, rgb, or named). |
| `width` | `number` | `1` | Border width in pixels. |
| `dashArray` | `string` | `''` | Dash pattern (e.g., `'5,5'`). |

**API Reference:** [BorderModel](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/bordermodel)

### MarginModel

Configures outer spacing.

| Property | Type | Default | Description |
|---|---|---|---|
| `left` | `number` | `0` | Left margin in pixels. |
| `right` | `number` | `0` | Right margin in pixels. |
| `top` | `number` | `0` | Top margin in pixels. |
| `bottom` | `number` | `0` | Bottom margin in pixels. |

**API Reference:** [MarginModel](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/marginmodel)

### StyleSettingsModel

Customizes visual styling for the selected region, unselected region, and thumb handles.

| Property | Type | Default | Description |
|---|---|---|---|
| `selectedRegionColor` | `string` | `'#0078d4'` | Color of the selected range area. |
| `unselectedRegionColor` | `string` | `'#e3e3e3'` | Color of the unselected range area. |
| `thumb` | `ThumbSettings` | `{}` | Thumb handle styling. See [`ThumbSettings`](#thumbsettings). |
| `thumbBorder` | `BorderModel` | `{}` | Border styling for thumb handles. |

**API Reference:** [StyleSettingsModel](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/stylesettingsmodel)

### ThumbSettings

Configures the appearance of range selector thumb handles.

| Property | Type | Default | Description |
|---|---|---|---|
| `type` | `ThumbType` | `'Circle'` | Thumb shape: `'Circle'`, `'Rectangle'`. |
| `fill` | `string` | `'#ffffff'` | Thumb fill color. |
| `width` | `number` | `15` | Thumb width in pixels. |
| `height` | `number` | `15` | Thumb height in pixels. |
| `border` | `BorderModel` | `{}` | Thumb border styling. |

**API Reference:** [ThumbSettings](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/thumbsettings)

### PeriodSelectorSettingsModel

Configures the preset period selector UI.

| Property | Type | Default | Description |
|---|---|---|---|
| `periods` | `PeriodModel[]` | `[]` | Array of predefined period buttons. See [`PeriodModel`](#periodmodel). |
| `position` | `PeriodSelectorPosition` | `'Top'` | Period selector position: `'Top'`, `'Bottom'`. |
| `height` | `number` | `43` | Height of the period selector area in pixels. |

**API Reference:** [PeriodSelectorSettingsModel](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/periodselectorsettingsmodel)

### PeriodModel

Defines a single period button in the period selector.

| Property | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | `''` | Button label (e.g., `'1M'`, `'3M'`, `'1Y'`, `'All'`). |
| `interval` | `number` | `1` | Number of units (only used if `intervalType` is set). |
| `intervalType` | `RangeIntervalType` | `null` | Time unit: `'Years'`, `'Months'`, `'Weeks'`, `'Days'`, `'Hours'`, `'Minutes'`, `'Seconds'`. For `'All'`, omit this. |

**API Reference:** [PeriodModel](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/periodmodel)

### RangeTooltipSettingsModel

Configures the tooltip for the selected range.

| Property | Type | Default | Description |
|---|---|---|---|
| `enable` | `boolean` | `true` | Enables the tooltip. |
| `displayMode` | `TooltipDisplayMode` | `'OnDemand'` | Display behavior: `'OnDemand'`, `'Always'`. |
| `fill` | `string` | `'#ececec'` | Tooltip background color. |
| `border` | `BorderModel` | `{}` | Tooltip border styling. |
| `opacity` | `number` | `0.75` | Tooltip opacity (0-1). |
| `format` | `string` | `''` | Tooltip format string using placeholders like `{start}` and `{end}`. |
| `template` | `string` | `null` | Custom HTML template for tooltip content. |
| `textStyle` | `FontModel` | `{}` | Tooltip text font styling. |

**API Reference:** [RangeTooltipSettingsModel](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/rangetooltipsettingsmodel)

### MajorTickLinesModel

Configures major tick line appearance.

| Property | Type | Default | Description |
|---|---|---|---|
| `color` | `string` | `'#000000'` | Tick color. |
| `width` | `number` | `1` | Tick thickness in pixels. |
| `height` | `number` | `5` | Tick length in pixels. |

**API Reference:** [MajorTickLinesModel](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/majorticklines)

### AnimationModel

Configures series animation during rendering.

| Property | Type | Default | Description |
|---|---|---|---|
| `enable` | `boolean` | `true` | Enables animation. |
| `duration` | `number` | `1000` | Animation duration in milliseconds. |
| `delay` | `number` | `0` | Animation delay in milliseconds. |

**API Reference:** [AnimationModel](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/animationmodel)

---

## Events

### changed

Triggers after the selected range has changed (when the user finishes adjusting the slider).

**Event Arguments:** `IChangedEventArgs`

| Property | Type | Description |
|---|---|---|
| `start` | `number \| Date` | Start value of the selected range. |
| `end` | `number \| Date` | End value of the selected range. |

**Example:**

```vue
<template>
  <ejs-rangenavigator @changed="onRangeChanged" />
</template>

<script setup>
const onRangeChanged = (args) => {
  console.log('Range start:', args.start);
  console.log('Range end:', args.end);
};
</script>
```

**API Reference:** [changed](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/ichangedeventargs)

### load

Triggers before the range navigator starts rendering.

**Event Arguments:** `IRangeLoadedEventArgs`

**Example:**

```vue
<template>
  <ejs-rangenavigator @load="onLoad" />
</template>

<script setup>
const onLoad = (args) => {
  console.log('Range Navigator loading...');
};
</script>
```

**API Reference:** [load](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/irangeloadedeventargs)

### loaded

Triggers after the range navigator has finished rendering.

**Event Arguments:** `IRangeLoadedEventArgs`

**Example:**

```vue
<template>
  <ejs-rangenavigator @loaded="onLoaded" />
</template>

<script setup>
const onLoaded = (args) => {
  console.log('Range Navigator loaded and ready.');
};
</script>
```

**API Reference:** [loaded](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/irangeloadedeventargs)

### labelRender

Triggers before each axis label is rendered, allowing customization.

**Event Arguments:** `ILabelRenderEventsArgs`

| Property | Type | Description |
|---|---|---|
| `text` | `string` | The label text. |
| `value` | `number \| Date` | The axis value. |

**Example:**

```vue
<template>
  <ejs-rangenavigator @labelRender="onLabelRender" />
</template>

<script setup>
const onLabelRender = (args) => {
  console.log('Label:', args.text, 'Value:', args.value);
};
</script>
```

**API Reference:** [labelRender](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/ilabelrendereventsargs)

### tooltipRender

Triggers before tooltip content is rendered for the selected range.

**Event Arguments:** `IRangeTooltipRenderEventArgs`

**Example:**

```vue
<template>
  <ejs-rangenavigator @tooltipRender="onTooltipRender" />
</template>

<script setup>
const onTooltipRender = (args) => {
  console.log('Tooltip rendering...');
};
</script>
```

**API Reference:** [tooltipRender](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/irangetooltiprendereventargs)

### selectorRender

Triggers before the period selector UI is rendered.

**Event Arguments:** `IRangeSelectorRenderEventArgs`

**Example:**

```vue
<template>
  <ejs-rangenavigator @selectorRender="onSelectorRender" />
</template>

<script setup>
const onSelectorRender = (args) => {
  console.log('Period selector rendering...');
};
</script>
```

**API Reference:** [selectorRender](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/irangeselectorrendereventargs)

### beforeResize

Triggers before the component processes a resize event.

**Event Arguments:** `IRangeBeforeResizeEventArgs`

**Example:**

```vue
<template>
  <ejs-rangenavigator @beforeResize="onBeforeResize" />
</template>

<script setup>
const onBeforeResize = (args) => {
  console.log('Range Navigator resizing...');
};
</script>
```

**API Reference:** [beforeResize](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/irangebeforeresizeeventargs)

### resized

Triggers after the component has been resized.

**Event Arguments:** `IResizeRangeNavigatorEventArgs`

**Example:**

```vue
<template>
  <ejs-rangenavigator @resized="onResized" />
</template>

<script setup>
const onResized = (args) => {
  console.log('Range Navigator resized.');
};
</script>
```

**API Reference:** [resized](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/iresizerangenavigatoreventargs)

### beforePrint

Triggers before the print operation begins.

**Event Arguments:** `IPrintEventArgs`

**Example:**

```vue
<template>
  <ejs-rangenavigator @beforePrint="onBeforePrint" />
</template>

<script setup>
const onBeforePrint = (args) => {
  console.log('Preparing to print Range Navigator...');
};
</script>
```

**API Reference:** [beforePrint](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/#beforeprint)

---

## Methods

### export()

Exports the range navigator to PNG, JPG, SVG, or PDF format.

**Signature:**

```typescript
export(type: ExportType, fileName: string, orientation?: PdfPageOrientation, controls?: [], width?: number, height?: number, isVertical?: boolean): void
```

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `type` | `ExportType` | Export format: `'PNG'`, `'JPG'`, `'SVG'`, `'PDF'`. |
| `fileName` | `string` | Name of the exported file. |
| `orientation` | `PdfPageOrientation` | (Optional) PDF page orientation: `'Portrait'`, `'Landscape'`. |
| `controls` | `[]` | (Optional) Array of controls to export together. |
| `width` | `number` | (Optional) Export width in pixels. |
| `height` | `number` | (Optional) Export height in pixels. |
| `isVertical` | `boolean` | (Optional) Indicates vertical export layout. |

**Example:**

```vue
<script setup>
const exportRange = () => {
  rangeNavigatorRef.value.export('PNG', 'range-navigator');
};
</script>
```

**API Reference:** [export](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/index-default#export)

### print()

Prints the range navigator.

**Signature:**

```typescript
print(id?: string[] | string | Element): void
```

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `id` | `string[] \| string \| Element` | (Optional) Element ID or array of IDs to print. |

**Example:**

```vue
<script setup>
const printRange = () => {
  rangeNavigatorRef.value.print();
};
</script>
```

**API Reference:** [print](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/index-default#print)

### destroy()

Destroys the widget and releases resources.

**Signature:**

```typescript
destroy(): void
```

**Example:**

```vue
<script setup>
onUnmounted(() => {
  rangeNavigatorRef.value.destroy();
});
</script>
```

**API Reference:** [destroy](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/index-default#destroy)

### getModuleName()

Returns the module name of the widget.

**Signature:**

```typescript
getModuleName(): string
```

**Returns:** `string` - The module name (typically `'RangeNavigator'`).

### renderChart()

Renders or re-renders the chart.

**Signature:**

```typescript
renderChart(resize?: boolean): void
```

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `resize` | `boolean` | (Optional) If `true`, the chart is resized. |

---

## Enums

### RangeValueType

Specifies the data type for the axis.

| Value | Description |
|---|---|
| `'Double'` | Numeric axis for numeric data. |
| `'DateTime'` | Date-time axis for date/time data. |
| `'Logarithmic'` | Logarithmic axis for wide-range numeric data. |
| `'DateTimeCategory'` | Date-time category axis for business days. |

### RangeIntervalType

Specifies the time unit for date-time axes and grouping.

| Value | Description |
|---|---|
| `'Auto'` | Automatically determines interval. |
| `'Years'` | Year-based intervals. |
| `'Months'` | Month-based intervals. |
| `'Weeks'` | Week-based intervals. |
| `'Days'` | Day-based intervals. |
| `'Hours'` | Hour-based intervals. |
| `'Minutes'` | Minute-based intervals. |
| `'Seconds'` | Second-based intervals. |

### RangeNavigatorType

Specifies the series rendering type.

| Value | Description |
|---|---|
| `'Line'` | Renders as a line chart. |
| `'Area'` | Renders as an area chart. |
| `'StepLine'` | Renders as a step line chart. |

### RangeLabelIntersectAction

Specifies behavior for overlapping labels.

| Value | Description |
|---|---|
| `'None'` | Display all labels. |
| `'Hide'` | Hide overlapping labels. |

### NavigatorPlacement

Specifies label placement relative to ticks.

| Value | Description |
|---|---|
| `'BetweenTicks'` | Labels rendered between tick marks. |
| `'OnTicks'` | Labels rendered on tick marks. |
| `'Auto'` | Labels placed automatically based on data. |

### AxisPosition

Specifies axis element positioning.

| Value | Description |
|---|---|
| `'Inside'` | Elements rendered inside the axis. |
| `'Outside'` | Elements rendered outside the axis. |

### TooltipDisplayMode

Specifies tooltip display behavior.

| Value | Description |
|---|---|
| `'OnDemand'` | Tooltip appears on mouse hover. |
| `'Always'` | Tooltip is always visible. |

### PeriodSelectorPosition

Specifies period selector positioning.

| Value | Description |
|---|---|
| `'Top'` | Period selector above the navigator. |
| `'Bottom'` | Period selector below the navigator. |

### ThumbType

Specifies the shape of range selector thumb handles.

| Value | Description |
|---|---|
| `'Circle'` | Circular thumb handles. |
| `'Rectangle'` | Rectangular thumb handles. |

### ChartTheme

Specifies predefined visual themes.

| Value | Description |
|---|---|
| `'Material'` | Material design theme. |
| `'Fabric'` | Fabric theme. |
| `'Bootstrap'` | Bootstrap theme. |
| `'Highcontrast'` | High contrast theme. |
| `'MaterialDark'` | Material dark theme. |

### ExportType

Specifies the export format.

| Value | Description |
|---|---|
| `'PNG'` | Export as PNG image. |
| `'JPG'` | Export as JPEG image. |
| `'SVG'` | Export as SVG vector. |
| `'PDF'` | Export as PDF document. |

---

## Child Directives

### RangenavigatorSeriesCollectionDirective

Container directive for series definitions.

**Directive Name:** `e-rangenavigator-series-collection`

**Purpose:** Wraps one or more `<e-rangenavigator-series>` directives to define the series collection.

**Usage Example:**

```vue
<template>
  <ejs-rangenavigator>
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
        xName="x"
        yName="y"
        type="Area"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>
```

**API Reference:** [RangenavigatorSeriesCollectionDirective](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/rangenavigatorseriesmodel)

### RangenavigatorSeriesDirective

Individual series definition within the collection.

**Directive Name:** `e-rangenavigator-series`

**Purpose:** Defines a single series with data binding and styling options.

**Key Properties:**

- `dataSource`: Data source for this series.
- `xName`: X-axis field name.
- `yName`: Y-axis field name.
- `type`: Series type (`'Line'`, `'Area'`, `'StepLine'`).
- `fill`: Series fill color.
- `width`: Stroke width.
- `opacity`: Series opacity.

**Usage Example:**

```vue
<template>
  <e-rangenavigator-series
    :dataSource="chartData"
    xName="date"
    yName="value"
    type="Area"
    fill="#0078d4"
    :width="2"
    :opacity="0.8"
  />
</template>

<script setup>
const chartData = [
  { date: new Date(2023, 0, 1), value: 100 },
  { date: new Date(2023, 1, 1), value: 110 }
];
</script>
```

**API Reference:** [RangenavigatorSeriesDirective](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/rangenavigatorseriesmodel)

---

## Modules

Required modules must be provided to the Range Navigator component using Vue's `provide()` function in Composition API or `provide` option in Options API.

### DateTime

Enables date-time axis support.

**When to Use:** Use when `valueType` is `'DateTime'`.

**Import:**

```javascript
import { DateTime } from '@syncfusion/ej2-vue-charts';
```

**Registration (Composition API):**

```vue
<script setup>
import { provide } from 'vue';
import { DateTime, AreaSeries } from '@syncfusion/ej2-vue-charts';

provide('rangeNavigator', [DateTime, AreaSeries]);
</script>
```

**Registration (Options API):**

```vue
<script>
import { DateTime, AreaSeries } from '@syncfusion/ej2-vue-charts';

export default {
  provide: {
    rangeNavigator: [DateTime, AreaSeries]
  }
};
</script>
```

### AreaSeries

Enables area series rendering.

**When to Use:** Use when series `type` is `'Area'`.

**Import:**

```javascript
import { AreaSeries } from '@syncfusion/ej2-vue-charts';
```

### LineSeries

Enables line series rendering.

**When to Use:** Use when series `type` is `'Line'`.

**Import:**

```javascript
import { LineSeries } from '@syncfusion/ej2-vue-charts';
```

### StepLineSeries

Enables step line series rendering.

**When to Use:** Use when series `type` is `'StepLine'`.

**Import:**

```javascript
import { StepLineSeries } from '@syncfusion/ej2-vue-charts';
```

### PeriodSelector

Enables the period selector UI.

**When to Use:** Use when configuring `periodSelectorSettings`.

**Import:**

```javascript
import { PeriodSelector } from '@syncfusion/ej2-vue-charts';
```

**Example:**

```vue
<script setup>
import { provide } from 'vue';
import { DateTime, AreaSeries, PeriodSelector } from '@syncfusion/ej2-vue-charts';

provide('rangeNavigator', [DateTime, AreaSeries, PeriodSelector]);
</script>
```

### Logarithmic

Enables logarithmic axis support.

**When to Use:** Use when `valueType` is `'Logarithmic'`.

**Import:**

```javascript
import { Logarithmic } from '@syncfusion/ej2-vue-charts';
```

### Double

Enables numeric axis support (usually provided by default).

**When to Use:** Use when `valueType` is `'Double'`.

---

## Common Usage Patterns

### Pattern 1: Range Navigator with Period Selector

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    :periodSelectorSettings="periodSettings"
    @changed="onRangeChanged"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="chartData"
        xName="date"
        yName="value"
        type="Area"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective,
  RangenavigatorSeriesDirective,
  AreaSeries,
  DateTime,
  PeriodSelector
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM-yy';
const rangeValue = ref([new Date(2023, 0, 1), new Date(2023, 11, 31)]);

const periodSettings = ref({
  position: 'Top',
  periods: [
    { text: '1M', interval: 1, intervalType: 'Months' },
    { text: '3M', interval: 3, intervalType: 'Months' },
    { text: '6M', interval: 6, intervalType: 'Months' },
    { text: '1Y', interval: 1, intervalType: 'Years' },
    { text: 'All' }
  ]
});

const chartData = ref([
  { date: new Date(2023, 0, 1), value: 100 },
  { date: new Date(2023, 1, 1), value: 105 },
  { date: new Date(2023, 2, 1), value: 111 }
]);

const onRangeChanged = (args) => {
  console.log('Range:', args.start, args.end);
};

provide('rangeNavigator', [DateTime, AreaSeries, PeriodSelector]);
</script>
```

### Pattern 2: Synchronizing Range Navigator with Chart

```vue
<template>
  <div>
    <ejs-rangenavigator
      :valueType="valueType"
      :value="rangeValue"
      :labelFormat="labelFormat"
      @changed="onRangeChanged"
    >
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series
          :dataSource="allData"
          xName="date"
          yName="value"
          type="Area"
        />
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>

    <ejs-chart :primaryXAxis="primaryXAxis">
      <e-series-collection>
        <e-series
          :dataSource="filteredData"
          xName="date"
          yName="value"
          type="Line"
          name="Filtered Data"
        />
      </e-series-collection>
    </ejs-chart>
  </div>
</template>

<script setup>
import { computed, provide, ref } from 'vue';
import {
  RangeNavigatorComponent,
  RangenavigatorSeriesCollectionDirective,
  RangenavigatorSeriesDirective,
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  AreaSeries,
  LineSeries,
  DateTime
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM-yy';

const allData = ref([
  { date: new Date(2023, 0, 1), value: 100 },
  { date: new Date(2023, 0, 15), value: 110 },
  { date: new Date(2023, 1, 1), value: 105 },
  { date: new Date(2023, 1, 15), value: 120 },
  { date: new Date(2023, 2, 1), value: 130 }
]);

const rangeValue = ref([new Date(2023, 0, 1), new Date(2023, 1, 28)]);

const filteredData = computed(() => {
  const [start, end] = rangeValue.value;
  return allData.value.filter(item => item.date >= start && item.date <= end);
});

const primaryXAxis = { valueType: 'DateTime', labelFormat: 'MMM-yy' };

const onRangeChanged = (args) => {
  rangeValue.value = [new Date(args.start), new Date(args.end)];
};

provide('rangeNavigator', [DateTime, AreaSeries, LineSeries]);
</script>
```

### Pattern 3: Lightweight Mode (Mobile Optimization)

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :intervalType="intervalType"
    :value="rangeValue"
    :labelFormat="labelFormat"
    :dataSource="dataSource"
    xName="x"
    yName="y"
  />
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  DateTime
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const intervalType = 'Months';
const labelFormat = 'MMM';
const rangeValue = ref([new Date(2023, 5, 1), new Date(2023, 6, 1)]);

const dataSource = ref([
  { x: new Date(2023, 0, 1), y: 10 },
  { x: new Date(2023, 1, 1), y: 14 },
  { x: new Date(2023, 2, 1), y: 18 },
  { x: new Date(2023, 3, 1), y: 15 },
  { x: new Date(2023, 4, 1), y: 22 },
  { x: new Date(2023, 5, 1), y: 25 },
  { x: new Date(2023, 6, 1), y: 27 }
]);

provide('rangeNavigator', [DateTime]);
</script>
```

### Pattern 4: Custom Tooltip and Styling

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :tooltip="tooltipSettings"
    :navigatorStyleSettings="styleSettings"
    @changed="onRangeChanged"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
        xName="date"
        yName="value"
        type="Area"
        fill="#0078d4"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>

<script setup>
import { provide, ref } from 'vue';
import { DateTime, AreaSeries, RangeNavigatorComponent } from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const rangeValue = ref([new Date(2023, 0, 1), new Date(2023, 3, 30)]);

const tooltipSettings = ref({
  enable: true,
  displayMode: 'Always',
  fill: '#0078d4',
  textStyle: {
    color: '#ffffff',
    fontFamily: 'Segoe UI'
  }
});

const styleSettings = ref({
  selectedRegionColor: '#0078d4',
  unselectedRegionColor: '#e3e3e3',
  thumb: {
    type: 'Circle',
    fill: '#0078d4',
    width: 20,
    height: 20
  }
});

const data = ref([
  { date: new Date(2023, 0, 1), value: 100 },
  { date: new Date(2023, 1, 1), value: 105 },
  { date: new Date(2023, 2, 1), value: 111 },
  { date: new Date(2023, 3, 1), value: 120 }
]);

const onRangeChanged = (args) => {
  console.log('New range:', args.start, args.end);
};

provide('rangeNavigator', [DateTime, AreaSeries]);
</script>
```

---

## Additional Resources

- **Official Syncfusion Vue Documentation:** [Range Navigator](https://ej2.syncfusion.com/vue/documentation/range-navigator/)
- **Component API:** [RangeNavigatorComponent](https://ej2.syncfusion.com/vue/documentation/api/range-navigator/index-default)
- **Getting Started Guide:** [Getting Started](https://ej2.syncfusion.com/vue/documentation/range-navigator/vue-3-getting-started)
- **Series Types:** [Series Types](https://ej2.syncfusion.com/vue/documentation/range-navigator/series-types)
- **Period Selector:** [Period Selector](https://ej2.syncfusion.com/vue/documentation/range-navigator/period-selector)
- **Range Selection:** [Range Selection](https://ej2.syncfusion.com/vue/documentation/range-navigator/selecting-range)
- **Tooltips:** [Tooltip Customization](https://ej2.syncfusion.com/vue/documentation/range-navigator/tool-tip)
- **Lightweight Mode:** [Lightweight Mode](https://ej2.syncfusion.com/vue/documentation/range-navigator/lightweight)
- **Community Forum:** [Syncfusion Community](https://www.syncfusion.com/forums)

---