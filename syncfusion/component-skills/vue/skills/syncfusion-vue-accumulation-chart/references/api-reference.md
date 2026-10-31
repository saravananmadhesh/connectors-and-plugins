# accumulation-chart API Reference

## Table of Contents
- [Properties](#properties)
  - [Layout & Dimensions](#layout--dimensions)
  - [Data](#data)
  - [Styling & Appearance](#styling--appearance)
  - [Interaction & Events](#interaction--events)
  - [Legend](#legend)
  - [Accessibility](#accessibility)
  - [Print & Export](#print--export)
- [Data Models](#data-models)
  - [AccumulationSeriesModel](#accumulationseriesmodel)
  - [DataLabelSettingsModel](#datalabelsettingsmodel)
  - [TooltipSettingsModel](#tooltipsettingsmodel)
  - [LegendSettingsModel](#legendsettingsmodel)
- [Events](#events)
  - [pointRender](#pointrender)
  - [seriesRender](#seriesrender)
  - [tooltipRender](#tooltiprender)
  - [chartMouseClick](#chartmouseclick)
  - [chartMouseMove](#chartmousemove)
  - [legendRender](#legendrender)
  - [load](#load)
  - [loaded](#loaded)
  - [resized](#resized)
- [Methods](#methods)
  - [export(type, fileName)](#exporttype-filename)
  - [print()](#print)
  - [calculateBounds()](#calculatebounds)
  - [setAnnotationValue()](#setannotationvalue)
- [Enums](#enums)
  - [AccumulationType](#accumulationtype)
  - [AccumulationLabelPosition](#accumulationlabelposition)
  - [LegendPosition](#legendposition)
  - [TitlePosition](#titleposition)
  - [AccumulationSelectionMode](#accumulationselectionmode)
  - [AccumulationHighlightMode](#accumulationhighlightmode)
- [Child Directives](#child-directives)
  - [AccumulationSeriesDirective (e-accumulation-series)](#accumulationseriesdirective-e-accumulation-series)
  - [AccumulationSeriesCollectionDirective (e-accumulation-series-collection)](#accumulationseriescollectiondirective-e-accumulation-series-collection)
- [Modules / Services](#modules--services)
- [Common Usage Patterns](#common-usage-patterns)
  - [1. Basic Pie Chart with Sample Data](#1-basic-pie-chart-with-sample-data)
  - [2. Donut Chart with Custom Styling and Data Labels](#2-donut-chart-with-custom-styling-and-data-labels)
  - [3. Interactive Chart with Events and Export](#3-interactive-chart-with-events-and-export)
- [Additional Resources](#additional-resources)

**Component Name:** accumulation-chart  
**NPM Package:** @syncfusion/ej2-vue-charts 
**Official API:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/)  
**Documentation:** [https://ej2.syncfusion.com/vue/documentation/accumulation-chart/](https://ej2.syncfusion.com/vue/documentation/accumulation-chart/)

---

## Properties

### Layout & Dimensions

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| [width](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#width) | string | `null` | The width of the accumulation chart component | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#width) |
| [height](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#height) | string | `null` | The height of the accumulation chart component | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#height) |
| [margin](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#margin) | [ChartMarginModel](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/marginmodel) | `-` | Options to customize the margins of the chart | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#margin) |
| [enableSmartLabels](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#enablesmartlabels) | boolean | `true` | Enable smart labels to avoid overlapping | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#enablesmartlabels) |

### Data

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| [dataSource](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#datasource) | Object / DataManager | `null` | Specifies the dataSource for the chart | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#datasource) |
| [series](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#series) | [AccumulationSeriesModel[]](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel) | `[]` | Options for customizing the data series | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#series) |

### Styling & Appearance

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| [background](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#background) | string | `null` | The background color for the accumulation chart | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#background) |
| [border](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#border) | [BorderModel](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/bordermodel) | `-` | Options to customize the border of the chart | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#border) |
| [palettes](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#palettes) | string[] | `Material palette` | The colors for series data points | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#palettes) |
| [centerLabel](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#centerlabel) | [CenterLabelModel](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/centerlabelmodel) | `-` | Options to customize the center label in donut chart | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#centerlabel) |
| [theme](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#theme) | AccumulationTheme | `'Material'` | The theme for the accumulation chart component | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#theme) |

### Interaction & Events

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| [selectionMode](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#selectionmode) |  AccumulationSelectionMode | `'None'` | Selection mode for the chart series | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#selectionmode) |
| [selectedDataIndexes](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#selecteddataindexes) | [IndexesModel[]](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/indexesmodel) | `[]` | Array of selected data point indexes | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#selecteddataindexes) |
| [tooltip](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#tooltip) | [TooltipSettingsModel](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/tooltipsettingsmodel) | `-` | Options to customize the tooltip | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#tooltip) |
| [pointRender](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#pointrender) | [EmitType<IAccPointRenderEventArgs>](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/iaccpointrendereventargs) | `-` | Fires when a data point is rendering | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#pointrender) |

### Legend

| Property | Type | Description | API Link |
|----------|------|-------------|----------|
| [legendSettings](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#legendsettings) | [LegendSettingsModel](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/legendsettingsmodel) | Options to customize the legend | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#legendsettings) |

### Accessibility

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| [useGroupingSeparator](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#usegroupingseparator) | boolean | `false` | Enable or disable grouping separator for axis labels | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#usegroupingseparator) |

### Print & Export

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| [enableExport](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#enableexport) | boolean | `true` | Enable or disable export functionality | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#enableexport) |
| [allowExport](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/index-default#allowexport) | boolean | `false` | controls whether exporting is allowedfunctionality functionality | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/index-default#allowexport) |

---

## Data Models

### AccumulationSeriesModel

**Purpose:** Configures a single data series within the accumulation chart.

**API Reference:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel)

| Property | Type | Description | API Link |
|----------|------|---------|-------------|
| [dataSource](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#datasource) | Object/DataManager | Specifies the dataSource for the series | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#datasource) |
| [xName](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#xname) | string | The property in dataSource that contains the x-values | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#xname) |
| [yName](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#yname) | string | The property in dataSource that contains the y-values | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#yname) |
| [name](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#name) | string | The name of the series | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#name) |
| [type](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#type) | AccumulationType | The chart type (Pie, Pyramid, Funnel) | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#type) |
| [explode](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#explode) | boolean | Explode a slice away from the center | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#explode) |
| [explodeIndex](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#explodeindex) | number | Index of the slice to explode | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#explodeindex) |
| [explodeOffset](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#explodeoffset) | string | The distance of exploded slice from center | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#explodeoffset) |
| [startAngle](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#startangle) | number | The starting angle for drawing the series | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#startangle) |
| [endAngle](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#endangle) | number  | The ending angle for drawing the series | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#endangle) |
| [innerRadius](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#innerradius) | string | The inner radius for donut chart | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#innerradius) |
| [radius](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#radius) | string | The radius of the pie/donut chart | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#radius) |
| [dataLabel](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#datalabel) | [AccumulationDataLabelSettingsModel](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationdatalabelsettingsmodel)  | Options to customize data labels | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#datalabel) |
| [emptyPointSettings](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#emptypointsettings) | [EmptyPointSettingsModel](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/emptypointsettingsmodel) | Options to customize empty data points | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#emptypointsettings) |
| [animation](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#animation) | [AnimationModel](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/animationmodel)  | Animation duration in milliseconds | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#animation) |
| [tooltipMappingName](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#tooltipmappingname) | string | Format of the tooltip template | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#tooltipmappingname) |

### DataLabelSettingsModel

**Purpose:** Configures data labels for data points.

**API Reference:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationdatalabelsettingsmodel](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationdatalabelsettingsmodel)

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| [visible](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationdatalabelsettingsmodel#visible) | boolean | `false` | Enable or disable data labels | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationdatalabelsettingsmodel#visible) |
| [position](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationdatalabelsettingsmodel#position) |  AccumulationLabelPosition | `-` | Position of the data label | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationdatalabelsettingsmodel#position) |
| [name](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationdatalabelsettingsmodel#name) | string | `-` | Name of the data label field | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationdatalabelsettingsmodel#name) |
| [template](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationdatalabelsettingsmodel#template) | string/Function | `null` | Template for custom data label | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationdatalabelsettingsmodel#template) |
| [font](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationdatalabelsettingsmodel#font) | [FontModel](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/fontmodel) | `-` | Font settings for data labels | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationdatalabelsettingsmodel#font) |
| [format](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationdatalabelsettingsmodel#format) | string | `-` | Format string for data labels | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationdatalabelsettingsmodel#format) |
| [rx](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationdatalabelsettingsmodel#rx) | number | `-` | Border radius X value for data label background | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationdatalabelsettingsmodel#rx) |
| [ry](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationdatalabelsettingsmodel#ry) | number | `-` | Border radius Y value for data label background | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationdatalabelsettingsmodel#ry) |

### TooltipSettingsModel

**Purpose:** Configures tooltips for the chart.

**API Reference:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/tooltipsettingsmodel/](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/tooltipsettingsmodel)

| Property | Type | Description | API Link |
|----------|------|-------------|----------|
| [enable](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/tooltipsettingsmodel#enable) | boolean | Enable or disable tooltips | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/tooltipsettingsmodel#enable) |
| [format](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/tooltipsettingsmodel#format) | string | Format string for tooltip | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/tooltipsettingsmodel#format) |
| [template](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/tooltipsettingsmodel#template) | string/Function | Custom tooltip template | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/tooltipsettingsmodel#template) |
| [shared](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/tooltipsettingsmodel#shared) | boolean | Enable shared tooltip | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/tooltipsettingsmodel#shared) |
| [enableMarker](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/tooltipsettingsmodel#enablemarker) | boolean | Enable marker in tooltip | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/tooltipsettingsmodel#enablemarker) |

### LegendSettingsModel

**Purpose:** Configures the legend display and behavior.

**API Reference:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/legendsettingsmodel](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/legendsettingsmodel)

| Property | Type | Description | API Link |
|----------|------|-------------|----------|
| [visible](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/legendsettingsmodel#visible) | boolean | Enable or disable the legend | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/legendsettingsmodel#visible) |
| [position](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/legendsettingsmodel#position) | [LegendPosition](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/legendposition) | Position of the legend (Right, Left, Top, Bottom) | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/legendsettingsmodel#position) |
| [alignment](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/legendsettingsmodel#alignment) | [alignment](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/alignment) | Alignment of the legend items | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/legendsettingsmodel#alignment) |
| [width](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/legendsettingsmodel#width) | string | Width of the legend area | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/legendsettingsmodel#width) |
| [height](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/legendsettingsmodel#height) | string | Height of the legend area | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/legendsettingsmodel#height) |
| [mode](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/legendsettingsmodel#mode) | [LegendMode](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/index-default) | Legend mode (Series, Point, Range, Gradient) | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/legendsettingsmodel#mode) |
| [background](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/legendsettingsmodel#background) | string | Background color of legend | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/legendsettingsmodel#background) |
| [opacity](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/legendsettingsmodel#opacity) | number | Opacity of the legend | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/legendsettingsmodel#opacity) |
| [textStyle](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/legendsettingsmodel#textstyle) | [FontModel](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/fontmodel) | Font settings for legend text | [Link](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/legendsettingsmodel#textstyle) |

---

## Events

### pointRender

**Description:** Fires when a data point is rendering. Useful for customizing individual points before they appear.

**Event Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `pointRenderArgs` | [IAccPointRenderEventArgs](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/iaccpointrendereventargs) | Event arguments containing point data |
| `pointRenderArgs.point` | [AccPoints](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accpoints) | XDefines the point |
| `pointRenderArgs.width` | number | Defines the point width |
| `pointRenderArgs.fill` | string | Color of the point |
| `pointRenderArgs.height` | number | Defines the point height |
| `pointRenderArgs.border` | [BorderModel](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/bordermodel) | Border settings |

**API Reference:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/index-default#pointrender](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/index-default#pointrender)

**Usage Example:**

```vue
<template>
  <ejs-accumulationchart @pointRender="onPointRender">
    <e-accumulation-series-collection>
      <e-accumulation-series :dataSource="chartData" xName="x" yName="y"></e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script setup>
const onPointRender = (args) => {
    args.fill = '#FF6B6B'
}
</script>
```

### seriesRender

**Description:** Fires when a series is rendering.

**Event Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `seriesRenderArgs` | [IAccSeriesRenderEventArgs](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/iaccseriesrendereventargs) | Event arguments containing series data |
| `seriesRenderArgs.series` | [AccumulationSeries](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseries) | Series model |
| `seriesRenderArgs.name` | string | Name of the series |
| `seriesRenderArgs.data` | object | Defines the series data object |

**API Reference:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/index-default#seriesrender](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/index-default#seriesrender)

**Usage Example:**

```vue
<template>
  <ejs-accumulationchart @seriesRender="onSeriesRender">
    <e-accumulation-series-collection>
      <e-accumulation-series :dataSource="chartData" xName="x" yName="y"></e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script setup>
const onSeriesRender = (args) => {
  console.log('Series rendering:', args.series.name)
}
</script>
```

### tooltipRender

**Description:** Fires when tooltip is rendering.

**Event Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `tooltipArgs` | [IAccTooltipRenderEventArgs](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/iacctooltiprendereventargs) | Event arguments |
| `tooltipArgs.text` | string | Tooltip text |
| `tooltipArgs.content` | string/HTMLElement | Defines the tooltip content |
| `tooltipArgs.point` | [AccPoints](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accpoints) | Index of the point |

**API Reference:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/index-default#tooltiprender](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/index-default#tooltiprender)

**Usage Example:**

```vue
<template>
  <ejs-accumulationchart :tooltip="{ enable: true }" @tooltipRender="onTooltipRender">
    <e-accumulation-series-collection>
      <e-accumulation-series :dataSource="chartData" xName="x" yName="y"></e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script setup>
const onTooltipRender = (args) => {
  args.text = args.text + ' (Custom)'
}
</script>
```

### chartMouseClick

**Description:** Fires when chart is clicked.

**Event Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `mouseEventArgs` | IMouseEventArgs | Mouse event arguments |
| `mouseEventArgs.x` | number | X coordinate |
| `mouseEventArgs.y` | number | Y coordinate |

**API Reference:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/index-default#chartmouseclick](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/index-default#chartmouseclick)

**Usage Example:**

```vue
<template>
  <ejs-accumulationchart @chartMouseClick="onChartClick">
    <e-accumulation-series-collection>
      <e-accumulation-series :dataSource="chartData" xName="x" yName="y"></e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script setup>
const onChartClick = (args) => {
  console.log('Chart clicked at:', args.x, args.y)
}
</script>
```

### chartMouseMove

**Description:** Fires when mouse moves over the chart.

**Event Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `mouseEventArgs` | IMouseEventArgs | Mouse event arguments |

**API Reference:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/index-default#chartmousemove](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/index-default#chartmousemove)

### legendRender

**Description:** Fires when a legend item is rendering.

**Event Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `legendRenderArgs` | [IAccLegendRenderEventArgs](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/iacclegendrendereventargs) | Legend render arguments |
| `legendRenderArgs.text` | string | Legend text |
| `legendRenderArgs.fill` | string | Fill color |

**API Reference:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/index-default#legendrender](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/index-default#legendrender)

### load

**Description:** Fires when chart is loading.

**API Reference:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/index-default#load](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/index-default#load)

**Usage Example:**

```vue
<template>
  <ejs-accumulationchart @load="onChartLoad">
    <e-accumulation-series-collection>
      <e-accumulation-series :dataSource="chartData" xName="x" yName="y"></e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script setup>
const onChartLoad = (args) => {
  console.log('Chart loaded')
}
</script>
```

### loaded

**Description:** Fires after chart is loaded.

**API Reference:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/index-default#loaded](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/index-default#loaded)

### resized

**Description:** Fires when chart is resized.

**Event Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `resizeArgs` | object | Resize event arguments |

**API Reference:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/index-default#resized](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/index-default#resized)

---

## Methods

### export(type, fileName)

**Signature:** `export(type: ExportType, fileName: string): void`

**Description:** Export the chart as an image or PDF.

**Parameters:**

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | [ExportType](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/exportType) | - | Export type: 'PDF', 'PNG', 'SVG', 'JPEG' |
| `fileName` | string | - | Name of the exported file |

**API Reference:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/index-default#export](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/index-default#export)

**Usage Example:**

```vue
<template>
  <div id="app">
    <ejs-button id='togglebtn' @click='exportIcon'>Export</ejs-button>
    <ejs-accumulationchart ref="chart" id="container">
      <e-accumulation-series-collection>
        <e-accumulation-series :dataSource='seriesData' xName='x' yName='y' radius='70%'> </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  </div>
</template>
<script setup>
import { provide, ref } from "vue";
import { AccumulationChartComponent as EjsAccumulationchart, AccumulationSeriesCollectionDirective as EAccumulationSeriesCollection, AccumulationSeriesDirective as EAccumulationSeries, PieSeries, Export } from "@syncfusion/ej2-vue-charts";
import { ButtonComponent as EjsButton } from "@syncfusion/ej2-vue-buttons";

const chart=ref(null);
const seriesData = [
  { x: 'Jan', y: 3, text: 'Jan: 3' }, { x: 'Feb', y: 3.5, text: 'Feb: 3.5' },
  { x: 'Mar', y: 7, text: 'Mar: 7' }, { x: 'Apr', y: 13.5, text: 'Apr: 13.5' },
  { x: 'May', y: 19, text: 'May: 19' }, { x: 'Jun', y: 23.5, text: 'Jun: 23.5' },
  { x: 'Jul', y: 26, text: 'Jul: 26' }, { x: 'Aug', y: 25, text: 'Aug: 25' },
  { x: 'Sep', y: 21, text: 'Sep: 21' }, { x: 'Oct', y: 15, text: 'Oct: 15' }];
provide('accumulationchart', [PieSeries, Export]);
const exportIcon = () => {
  chart.value.export('PNG', 'export');
}

</script>
<style>
#container {
  height: 350px;
}
</style>
```

### print()

**Signature:** `print(): void`

**Description:** Print the chart.

**API Reference:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#print](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/#print)

**Usage Example:**

```vue
<template>
  <button @click="printChart">Print Chart</button>
</template>

<script setup>
const printChart = () => {
  chartRef.value?.print()
}
</script>
```

### calculateBounds()

**Signature:** `calculateBounds(): void`

**Description:** Method to calculate bounds for accumulation chart..

**API Reference:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/index-default#calculatebounds](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/index-default#calculatebounds)

### setAnnotationValue()

**Signature:** `getSeriesCollection(annotationIndex: number, content: string): void`

**Description:** Method to set the annotation content dynamically for accumulation.

**Parameters:**

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `annotationIndex` | number | - | The index of the annotation |
| `content` | string | - | The content to set for the annotation |

**API Reference:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/index-default#setannotationvalue](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/index-default#setannotationvalue)

---

## Enums

### AccumulationType

**Purpose:** Specifies the type of accumulation chart series.

**API Reference:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationtype](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationtype)

| Value | Description |
|-------|-------------|
| `'Pie'` | Pie chart series |
| `'Pyramid'` | Pyramid chart series |
| `'Funnel'` | Funnel chart series |

### AccumulationLabelPosition

**Purpose:** Specifies the position of data labels.

**API Reference:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationlabelposition](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationlabelposition)

| Value | Description |
|-------|-------------|
| `'Inside'` | Display labels inside the data point |
| `'Outside'` | Display labels outside the data point |

### LegendPosition

**Purpose:** Specifies the position of the legend.

**API Reference:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/legendposition](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/legendposition)

| Value | Description |
|-------|-------------|
| `'Auto'` | Places the legend based on the area type |
| `'Right'` | Legend positioned on the right |
| `'Left'` | Legend positioned on the left |
| `'Top'` | Legend positioned at the top |
| `'Bottom'` | Legend positioned at the bottom |
| `'Custom'` | Displays the legend based on the given x and y value |

### TitlePosition

**Purpose:** Defines the position of the title.

**API Reference:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/titleposition](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/titleposition)

| Value | Description |
|-------|-------------|
| `'Top'` | Displays the title on the top of chart |
| `'Bottom'` | Displays the title on the bottom of chart |
| `'Right'` | Displays the title on the right of chart |
| `'Left'` | Displays the title on the left of chart |
| `'Custom'` | Displays the title based on given x and y value |

### AccumulationSelectionMode

**Purpose:** Specifies selection mode for data points.

**API Reference:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationselectionmode](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationselectionmode)

| Value | Description |
|-------|-------------|
| `'None'` | No selection |
| `'Point'` | Select individual data points |

### AccumulationHighlightMode

**Purpose:** Specifies highlight behavior on mouse hover.

**API Reference:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationhighlightmode](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationhighlightmode)

| Value | Description |
|-------|-------------|
| `'None'` | No highlight on hover |
| `'Point'` | Highlight individual points |

---

## Child Directives

### AccumulationSeriesDirective (e-accumulation-series)

**Purpose:** Defines a data series within the accumulation chart.

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| [dataSource](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#datasource) | Object/DataManager | Data for this series |
| [xName](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#xname) | string | Field name for x-axis values |
| [yName](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#yname) | string | Field name for y-axis values |
| [name](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#name) | string | Series name |
| [type](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseriesmodel#type) | string | Series type |

**API Reference:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseries](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseries)

**Usage Example:**

```vue
<template>
  <ejs-accumulationchart>
    <e-accumulation-series-collection>
      <e-accumulation-series
        :dataSource="chartData"
        xName="x"
        yName="y"
        name="Sales"
        type="Pie">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script setup>
const chartData = ref([
  { x: 'Q1', y: 100 },
  { x: 'Q2', y: 200 },
  { x: 'Q3', y: 150 }
])
</script>
```

### AccumulationSeriesCollectionDirective (e-accumulation-series-collection)

**Purpose:** Container for multiple accumulation series directives.

**Usage Example:**

```vue
<template>
  <ejs-accumulationchart>
    <e-accumulation-series-collection>
      <e-accumulation-series :dataSource="series1" xName="x" yName="y"></e-accumulation-series>
      <e-accumulation-series :dataSource="series2" xName="x" yName="y"></e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>
```

**API Reference:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseries](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationseries)

---

## Modules / Services

The following modules are available for registration to enable specific features:

| Module | Purpose | Registration |
|--------|---------|--------------|
| [LegendSettings](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/legendsettingsmodel) | Legend display | AccumulationLegend injected |
| [Tooltip](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/tooltipsettingsmodel) | Tooltip display | AccumulationTooltip injected |
| [DataLabel](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationdatalabelsettingsmodel) | Data labels | AccumulationDataLabel injected |

---

## Common Usage Patterns

### 1. Basic Pie Chart with Sample Data

```vue
<template>
  <div>
    <h3>Sales Distribution</h3>
    <ejs-accumulationchart :tooltip="{ enable: true }">
      <e-accumulation-series-collection>
        <e-accumulation-series
          :dataSource="chartData"
          xName="region"
          yName="sales">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AccumulationChartComponent as EjsAccumulationchart, AccumulationSeriesCollectionDirective as EAccumulationSeriesCollection, AccumulationSeriesDirective as EAccumulationSeries } from "@syncfusion/ej2-vue-charts"

const chartData = ref([
  { region: 'North America', sales: 2500 },
  { region: 'Europe', sales: 1800 },
  { region: 'Asia', sales: 3200 },
  { region: 'South America', sales: 1100 },
  { region: 'Africa', sales: 900 }
])
</script>
```

### 2. Donut Chart with Custom Styling and Data Labels

```vue
<template>
  <ejs-accumulationchart
    :width="width"
    :height="height"
    :legendSettings="legendSettings"
    :theme="'Fabric'">
    <e-accumulation-series-collection>
      <e-accumulation-series
        :dataSource="chartData"
        xName="category"
        yName="value"
        type="Pie"
        :dataLabel="dataLabel"
        :innerRadius="innerRadius">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script setup>
import { ref, provide } from 'vue'
import { AccumulationChartComponent as EjsAccumulationchart, AccumulationSeriesCollectionDirective as EAccumulationSeriesCollection, AccumulationSeriesDirective as EAccumulationSeries,
AccumulationLegend, PieSeries, AccumulationDataLabel } from "@syncfusion/ej2-vue-charts"

const width = ref('600px')
const height = ref('400px')

const chartData = ref([
  { category: 'Product A', value: 45 },
  { category: 'Product B', value: 30 },
  { category: 'Product C', value: 25 }
])

const legendSettings = ref({
  visible: true,
  position: 'Bottom',
  alignment: 'Center'
})

const dataLabel = ref({
  visible: true,
  position: 'Inside',
  name: 'category'
})

const innerRadius = ref('50%')
provide('accumulationchart', [AccumulationLegend, PieSeries, AccumulationDataLabel]);
</script>
```

### 3. Interactive Chart with Events and Export

```vue
<template>
  <div class="page">
    <div class="toolbar">
      <button class="btn" @click="exportChart">Export as PNG</button>
      <button class="btn" @click="printChart">Print Chart</button>
      <span class="hint">Click a slice to select it</span>
    </div>

    <EjsAccumulationChart
      ref="chartRef"
      id="container"
      :title="title"
      :tooltip="tooltip"
      :legendSettings="legendSettings"
      :enableSmartLabels="true"
      @pointClick="onPointClick"
      @pointRender="onPointRender"
    >
      <EAccumulationSeriesCollection>
        <EAccumulationSeries
          :dataSource="chartData"
          xName="x"
          yName="y"
          type="Pie"
          :selectionMode="'Point'"
          :dataLabel="dataLabel"
        />
      </EAccumulationSeriesCollection>
    </EjsAccumulationChart>

    <p v-if="selectedPoint" class="selected">
      Selected: <b>{{ selectedPoint }}</b>
    </p>
  </div>
</template>

<script setup>
import { ref, provide } from "vue";
import {
  AccumulationChartComponent as EjsAccumulationChart,
  AccumulationSeriesCollectionDirective as EAccumulationSeriesCollection,
  AccumulationSeriesDirective as EAccumulationSeries,
  PieSeries,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationTooltip,
  AccumulationSelection,
  Export
} from "@syncfusion/ej2-vue-charts";

provide("accumulationchart", [
  PieSeries,
  AccumulationLegend,
  AccumulationTooltip,
  AccumulationSelection,
  AccumulationDataLabel,
  Export
]);

const chartRef = ref(null);
const selectedPoint = ref(null);

const title = "Browser Market Share";
const tooltip = { enable: true };
const legendSettings = { visible: true };

const dataLabel = {
  visible: true,
  position: "Outside",
  name: "text"
};

const chartData = ref([
  { x: "Chrome", y: 61.1, text: "Chrome: 61.1%" },
  { x: "Firefox", y: 11.8, text: "Firefox: 11.8%" },
  { x: "Edge", y: 9.8, text: "Edge: 9.8%" },
  { x: "Others", y: 17.3, text: "Others: 17.3%" }
]);

const onPointClick = (args) => {
  const idx = args?.point?.index ?? args?.pointIndex;
  if (idx == null) return;

  const point = chartData.value[idx];
  selectedPoint.value = `${point.x}: ${point.y}%`;
};

const onPointRender = (args) => {
  const y = args?.point?.y ?? args?.y;
  if (y > 30) args.fill = "#00C292"; // green for big slices
};

const exportChart = () => {
  if (chartRef.value?.export) {
    chartRef.value.export("PNG", "accumulation-chart");
    return;
  }
  chartRef.value?.ej2Instances?.export("PNG", "accumulation-chart");
};

const printChart = () => {
  if (chartRef.value?.print) {
    chartRef.value.print();
    return;
  }
  chartRef.value?.ej2Instances?.print();
};
</script>
```

---

## Additional Resources

- **Official API Documentation:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/)
- **Component Guide:** [https://ej2.syncfusion.com/vue/documentation/accumulation-chart/](https://ej2.syncfusion.com/vue/documentation/accumulation-chart/)
- **Accumulation Series API:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-series/](https://ej2.syncfusion.com/vue/documentation/api/accumulation-series/)
- **Data Label API:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationdatalabelsettingsmodel](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/accumulationdatalabelsettingsmodel)
- **Legend Settings API:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/legendsettingsmodel](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/legendsettingsmodel)
- **Tooltip API:** [https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/tooltipsettingsmodel](https://ej2.syncfusion.com/vue/documentation/api/accumulation-chart/tooltipsettingsmodel)
- **Community Forum:** [https://www.syncfusion.com/forums/](https://www.syncfusion.com/forums/)

---
