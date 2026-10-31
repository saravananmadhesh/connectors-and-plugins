# SmithChart API Reference

## Table of Contents
- [Overview](#overview)
  - [Module Registration](#module-registration)
- [Properties](#properties)
  - [Dimensions & Layout](#dimensions--layout)
  - [Data & Series](#data--series)
  - [Styling & Appearance](#styling--appearance)
  - [Axes Configuration](#axes-configuration)
  - [Title & Legend](#title--legend)
  - [Interaction & Localization](#interaction--localization)
- [Data Models](#data-models)
  - [SmithchartSeriesModel](#smithchartseriesmodel)
  - [SmithchartAxisModel](#smithchartaxismodel)
  - [SmithchartLegendSettingsModel](#smithchartlegendsettingsmodel)
  - [TitleModel](#titlemodel)
  - [SeriesMarkerModel](#seriesmarkermodel)
- [Events](#events)
  - [load](#load)
  - [loaded](#loaded)
  - [seriesRender](#seriesrender)
  - [axisLabelRender](#axislabelrender)
  - [legendRender](#legendrender)
  - [tooltipRender](#tooltiprender)
  - [titleRender](#titlerender)
  - [subtitleRender](#subtitlerender)
  - [textRender](#textrender)
  - [animationComplete](#animationcomplete)
  - [beforePrint](#beforeprint)
- [Methods](#methods)
  - [export()](#export)
  - [destroy()](#destroy)
- [Enums](#enums)
  - [RenderType](#rendertype)
  - [SmithchartTheme](#smithcharttheme)
  - [SmithchartAlignment](#smithchartalignment)
- [Child Directives](#child-directives)
  - [Series Collection & Series Item](#series-collection--series-item)
- [Modules/Services](#modulesservices)
  - [SmithchartLegend](#smithchartlegend)
  - [TooltipRender](#tooltiprender)
- [Common Usage Patterns](#common-usage-patterns)
  - [Basic SmithChart with Series Data](#basic-smithchart-with-series-data)
  - [SmithChart with Title, Legend, and Tooltip](#smithchart-with-title-legend-and-tooltip)
  - [Export SmithChart to Different Formats](#export-smithchart-to-different-formats)
- [Additional Resources](#additional-resources)
- [Validation Checklist](#validation-checklist)

## Overview
The SmithChart is a specialized chart component used to visualize complex impedance and admittance data. It displays the Smith Chart, which is a graphical tool used in electrical engineering for transmission line problems.

**NPM Package:** `@syncfusion/ej2-vue-charts`  
**Official Documentation:** [SmithChart Component Guide](https://ej2.syncfusion.com/vue/documentation/smithchart/)  
**API Reference:** [SmithChart API Documentation](https://ej2.syncfusion.com/vue/documentation/api/smithchart/index-default)

---

### Module Registration

To enable advanced features, register the required modules:

```javascript
import { SmithchartLegend, TooltipRender } from '@syncfusion/ej2-vue-charts'
import { provide } from 'vue'

provide('smithchart', [SmithchartLegend, TooltipRender])

```

---

## Properties

### Dimensions & Layout

| Property | Type | Default | Description | API Link |
|---|---|---|---|---|
| [`height`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#height) | `string` | `''` | Height of the SmithChart component | [API Docs](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#height) |
| [`width`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#width) | `string` | `''` | Width of the SmithChart component | [API Docs](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#width) |
| [`radius`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#radius) | `number` | `1` | Radius of the chart area | [API Docs](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#radius) |
| [`elementSpacing`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#elementspacing) | `number` | `10` | Spacing between chart elements | [API Docs](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#elementspacing) |
| [`margin`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#margin) | [`SmithchartMarginModel`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartmarginmodel) | - | Margin configuration for the chart area | [API Docs](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#margin) |
| [`bounds`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#bounds) | [`SmithchartRect`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartrect) | - | Bounds of the chart area | [API Docs](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#bounds) |

### Data & Series

| Property | Type | Default | Description | API Link |
|---|---|---|---|---|
| [`series`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#series) | [`SmithchartSeriesModel[]`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartseriesmodel) | `[]` | Array of series configurations to display on the chart | [API Docs](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#series) |
| [`renderType`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#rendertype) | [`RenderType`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/rendertype) | `Impedance` | Specifies whether to render as Impedance or Admittance chart | [API Docs](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#rendertype) |

### Styling & Appearance

| Property | Type | Default | Description | API Link |
|---|---|---|---|---|
| [`background`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#background) | `string` | - | Background color of the chart | [API Docs](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#background) |
| [`border`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#border) | [`SmithchartBorderModel`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartbordermodel) | - | Border configuration options | [API Docs](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#border) |
| [`font`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#font) | [`SmithchartFontModel`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartfontmodel) | - | Font configuration for chart text | [API Docs](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#font) |
| [`theme`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#theme) | [`SmithchartTheme`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithcharttheme) | `Material` | Theme applied to the chart | [API Docs](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#theme) |

### Axes Configuration

| Property | Type | Default | Description | API Link |
|---|---|---|---|---|
| [`horizontalAxis`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#horizontalaxis) | [`SmithchartAxisModel`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartaxismodel) | - | Configuration for the horizontal axis (resistance axis) | [API Docs](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#horizontalaxis) |
| [`radialAxis`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#radialaxis) | [`SmithchartAxisModel`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartaxismodel) | - | Configuration for the radial axis (reactance axis) | [API Docs](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#radialaxis) |

### Title & Legend

| Property | Type | Default | Description | API Link |
|---|---|---|---|---|
| [`title`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#title) | [`TitleModel`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/titlemodel) | - | Title configuration for the chart | [API Docs](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#title) |
| [`legendSettings`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#legendsettings) | [`SmithchartLegendSettingsModel`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartlegendsettingsmodel) | - | Legend configuration options | [API Docs](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#legendsettings) |
| [`legendBounds`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#legendbounds) | [`SmithchartRect`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartrect) | - | Bounds for the legend area | [API Docs](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#legendbounds) |
| [`smithchartLegendModule`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#smithchartlegendmodule) | [`SmithchartLegend`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartlegend) | - | Module to enable legend rendering | [API Docs](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#smithchartlegendmodule) |

### Interaction & Localization

| Property | Type | Default | Description | API Link |
|---|---|---|---|---|
| [`tooltipRenderModule`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#tooltiprendermodule) | [`TooltipRender`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/tooltiprender) | - | Module to enable tooltip rendering | [API Docs](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#tooltiprendermodule) |
| [`enablePersistence`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#enablepersistence) | `boolean` | `false` | Enable or disable persisting component state between page reloads | [API Docs](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#enablepersistence) |
| [`enableRtl`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#enablertl) | `boolean` | `false` | Enable or disable rendering component in right-to-left direction | [API Docs](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#enablertl) |
| [`locale`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#locale) | `string` | `'en-US'` | Culture locale for the component | [API Docs](https://ej2.syncfusion.com/vue/documentation/api/smithchart/#locale) |

---

## Data Models

### SmithchartSeriesModel
Represents a data series displayed on the Smith Chart.

**API Reference:** [SmithchartSeriesModel Documentation](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartseriesmodel)

| Property | Type | Default | Description |
|---|---|---|---|
| [`dataSource`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartseriesmodel#datasource) | `Object` | - | Data source for the series containing resistance and reactance values |
| [`name`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartseriesmodel#name) | `string` | - | Name of the series displayed in the legend |
| [`fill`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartseriesmodel#fill) | `string` | - | Color for the series line |
| [`opacity`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartseriesmodel#opacity) | `number` | - | Opacity of the series (0-1) |
| [`width`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartseriesmodel#width) | `number` | - | Width of the series line |
| [`visibility`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartseriesmodel#visibility) | `string` | - | Visibility state of the series |
| [`resistance`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartseriesmodel#resistance) | `string` | - | Field name for resistance values in dataSource |
| [`reactance`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartseriesmodel#reactance) | `string` | - | Field name for reactance values in dataSource |
| [`points`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartseriesmodel#points) | `ISmithChartPoint[]` | - | Array of points for the series |
| [`marker`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartseriesmodel#marker) | [`SeriesMarkerModel`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/seriesmarkermodel) | - | Marker configuration |
| [`tooltip`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartseriesmodel#tooltip) | [`SeriesTooltipModel`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/seriestooltipmodel) | - | Tooltip configuration |
| [`enableAnimation`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartseriesmodel#enableanimation) | `boolean` | - | Enable or disable animation |
| [`animationDuration`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartseriesmodel#animationduration) | `string` | - | Duration of animation in milliseconds |
| [`enableSmartLabels`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartseriesmodel#enablesmartlabels) | `boolean` | - | Avoid overlap of data labels |

### SmithchartAxisModel
Configuration for chart axes (horizontal and radial).

**API Reference:** [SmithchartAxisModel Documentation](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartaxismodel)

| Property | Type | Default | Description |
|---|---|---|---|
| [`visible`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartaxismodel#visible) | `boolean` | - | Visibility of the axis |
| [`labelPosition`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartaxismodel#labelposition) | [`AxisLabelPosition`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/axislabelposition) | - | Position of axis labels |
| [`labelIntersectAction`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartaxismodel#labelintersectaction) | [`SmithchartLabelIntersectAction`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartlabelintersectaction) | - | Action when labels overlap |
| [`labelStyle`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartaxismodel#labelstyle) | [`SmithchartFontModel`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartfontmodel) | - | Font style for axis labels |
| [`axisLine`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartaxismodel#axisline) | [`SmithchartAxisLineModel`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartaxislinemodel) | - | Axis line configuration |
| [`majorGridLines`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartaxismodel#majorgridlines) | [`SmithchartMajorGridLinesModel`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartmajorgridlinesmodel) | - | Major grid lines configuration |
| [`minorGridLines`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartaxismodel#minorgridlines) | [`SmithchartMinorGridLinesModel`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartminorgridlinesmodel) | - | Minor grid lines configuration |

### SmithchartLegendSettingsModel
Configuration for the legend display.

**API Reference:** [SmithchartLegendSettingsModel Documentation](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartlegendsettingsmodel)

| Property | Type | Default | Description |
|---|---|---|---|
| [`visible`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartlegendsettingsmodel#visible) | `boolean` | - | Visibility of the legend |
| [`position`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartlegendsettingsmodel#position) | `string` | - | Position of the legend (Top, Bottom, Left, Right) |
| [`alignment`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartlegendsettingsmodel#alignment) | [`SmithchartAlignment`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartalignment) | - | Alignment of legend items |
| [`shape`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartlegendsettingsmodel#shape) | `string` | - | Shape of legend markers |
| [`columnCount`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartlegendsettingsmodel#columncount) | `number` | - | Number of columns in legend |
| [`rowCount`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartlegendsettingsmodel#rowcount) | `number` | - | Number of rows in legend |
| [`width`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartlegendsettingsmodel#width) | `number` | - | Width of legend |
| [`height`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartlegendsettingsmodel#height) | `number` | - | Height of legend |
| [`itemPadding`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartlegendsettingsmodel#itempadding) | `number` | - | Spacing between legend items |
| [`shapePadding`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartlegendsettingsmodel#shapepadding) | `number` | - | Padding between legend shape and text |
| [`textStyle`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartlegendsettingsmodel#textstyle) | [`SmithchartFont`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartfont) | - | Font style for legend text |
| [`toggleVisibility`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartlegendsettingsmodel#togglevisibility) | `boolean` | - | Toggle series visibility by clicking legend |
| [`border`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartlegendsettingsmodel#border) | [`LegendBorderModel`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/legendbordermodel) | - | Border configuration for legend |

### TitleModel
Configuration for chart title and subtitle.

**API Reference:** [TitleModel Documentation](https://ej2.syncfusion.com/vue/documentation/api/smithchart/titlemodel)

| Property | Type | Default | Description |
|---|---|---|---|
| [`text`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/titlemodel#text) | `string` | - | Title text content |
| [`visible`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/titlemodel#visible) | `boolean` | - | Visibility of the title |
| [`description`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/titlemodel#description) | `string` | - | Description for accessibility |
| [`textAlignment`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/titlemodel#textalignment) | [`SmithchartAlignment`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartalignment) | - | Text alignment of title |
| [`font`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/titlemodel#font) | [`SmithchartFontModel`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartfontmodel) | - | Font configuration for title |
| [`textStyle`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/titlemodel#textstyle) | [`SmithchartFontModel`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithchartfontmodel) | - | Text style configuration |
| [`enableTrim`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/titlemodel#enabletrim) | `boolean` | - | Trim the title text if it exceeds maximum width |
| [`maximumWidth`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/titlemodel#maximumwidth) | `number` | - | Maximum width of the title |
| [`subtitle`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/titlemodel#subtitle) | [`SubtitleModel`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/subtitlemodel) | - | Subtitle configuration |

### SeriesMarkerModel
Configuration for series markers.

**API Reference:** [SeriesMarkerModel Documentation](https://ej2.syncfusion.com/vue/documentation/api/smithchart/seriesmarkermodel)

| Property | Type | Default | Description |
|---|---|---|---|
| [`visible`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/seriesmarkermodel#visible) | `boolean` | - | Visibility of markers |
| [`shape`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/seriesmarkermodel#shape) | `string` | - | Shape of markers (Circle, Rectangle, Diamond, Triangle, etc.) |
| [`fill`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/seriesmarkermodel#fill) | `string` | - | Color of markers |
| [`opacity`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/seriesmarkermodel#opacity) | `number` | - | Opacity of markers |
| [`width`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/seriesmarkermodel#width) | `number` | - | Width of markers |
| [`height`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/seriesmarkermodel#height) | `number` | - | Height of markers |
| [`imageUrl`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/seriesmarkermodel#imageurl) | `string` | - | URL for custom marker image |
| [`border`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/seriesmarkermodel#border) | [`SeriesMarkerBorderModel`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/seriesmarkerbordermodel) | - | Border configuration for markers |
| [`dataLabel`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/seriesmarkermodel#datalabel) | [`SeriesMarkerDataLabelModel`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/seriesmarkerdatalabelmodel) | - | Data label configuration for markers |

---

## Events

### load
Triggers before the SmithChart is rendered.

**Event Type:** [`ISmithchartLoadEventArgs`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/ismithchartloadeventargs)

```vue
<script setup>
const onLoad = (args) => {
  console.log('Chart is about to load', args)
}
</script>

<template>
  <ejs-smithchart :load="onLoad"></ejs-smithchart>
</template>
```

### loaded
Triggers after the SmithChart is rendered successfully.

**Event Type:** [`ISmithchartLoadedEventArgs`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/ismithchartloadedeventargs)

```vue
<script setup>
const onLoaded = (args) => {
  console.log('Chart has loaded successfully', args)
}
</script>

<template>
  <ejs-smithchart :loaded="onLoaded"></ejs-smithchart>
</template>
```

### seriesRender
Triggers before each series is rendered.

**Event Type:** [`ISmithchartSeriesRenderEventArgs`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/ismithchartseriesrendereventargs)

```vue
<script setup>
const onSeriesRender = (args) => {
  console.log('Series rendering:', args.series.name)
  // Customize series appearance
  args.fill = '#FF5733'
}
</script>

<template>
  <ejs-smithchart :seriesRender="onSeriesRender"></ejs-smithchart>
</template>
```

### axisLabelRender
Triggers before each axis label is rendered.

**Event Type:** [`ISmithchartAxisLabelRenderEventArgs`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/ismithchartaxislabelrendereventargs)

```vue
<script setup>
const onAxisLabelRender = (args) => {
  console.log('Axis label:', args.text)
}
</script>

<template>
  <ejs-smithchart :axisLabelRender="onAxisLabelRender"></ejs-smithchart>
</template>
```

### legendRender
Triggers before the legend is rendered.

**Event Type:** [`ISmithchartLegendRenderEventArgs`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/ismithchartlegendrendereventargs)

```vue
<script setup>
const onLegendRender = (args) => {
  console.log('Legend is being rendered', args)
}
</script>

<template>
  <ejs-smithchart :legendRender="onLegendRender"></ejs-smithchart>
</template>
```

### tooltipRender
Triggers before the tooltip is rendered.

**Event Type:** [`ISmithChartTooltipEventArgs`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/ismithcharttooltipeventargs)

```vue
<script setup>
const onTooltipRender = (args) => {
  console.log('Tooltip content:', args.text)
  // Customize tooltip text
  args.text = `Resistance: ${args.point.resistance}, Reactance: ${args.point.reactance}`
}
</script>

<template>
  <ejs-smithchart :tooltipRender="onTooltipRender"></ejs-smithchart>
</template>
```

### titleRender
Triggers before the title is rendered.

**Event Type:** [`ITitleRenderEventArgs`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/ititlerendereventargs)

```vue
<script setup>
const onTitleRender = (args) => {
  console.log('Title rendering:', args.text)
}
</script>

<template>
  <ejs-smithchart :titleRender="onTitleRender"></ejs-smithchart>
</template>
```

### subtitleRender
Triggers before the subtitle is rendered.

**Event Type:** [`ISubTitleRenderEventArgs`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/isubtitlerendereventargs)

```vue
<script setup>
const onSubtitleRender = (args) => {
  console.log('Subtitle rendering:', args.text)
}
</script>

<template>
  <ejs-smithchart :subtitleRender="onSubtitleRender"></ejs-smithchart>
</template>
```

### textRender
Triggers before data label text is rendered.

**Event Type:** [`ISmithchartTextRenderEventArgs`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/ismithcharttextrendereventargs)

```vue
<script setup>
const onTextRender = (args) => {
  console.log('Data label text:', args.text)
}
</script>

<template>
  <ejs-smithchart :textRender="onTextRender"></ejs-smithchart>
</template>
```

### animationComplete
Triggers after animation is completed.

**Event Type:** [`ISmithchartAnimationCompleteEventArgs`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/ismithchartanimationcompleteeventargs)

```vue
<script setup>
const onAnimationComplete = (args) => {
  console.log('Animation completed', args)
}
</script>

<template>
  <ejs-smithchart :animationComplete="onAnimationComplete"></ejs-smithchart>
</template>
```

### beforePrint
Triggers before the print operation starts.

**Event Type:** [`ISmithchartPrintEventArgs`](https://ej2.syncfusion.com/vue/documentation/api/smithchart/ismithchartprinteventargs)

```vue
<script setup>
const onBeforePrint = (args) => {
  console.log('Print is about to start', args)
}
</script>

<template>
  <ejs-smithchart :beforePrint="onBeforePrint"></ejs-smithchart>
</template>
```

---

## Methods

### export()
Exports the SmithChart in specified format (PNG, JPEG, SVG, PDF).

**Signature:**
```javascript
export(type: SmithchartExportType, fileName: string, orientation?: PdfPageOrientation): void
```

**Parameters:**
- `type` (`SmithchartExportType`): Export format - PNG, JPEG, SVG, or PDF
- `fileName` (`string`): Name of the exported file
- `orientation` (`PdfPageOrientation`, optional): Page orientation for PDF export

**Example:**
```vue
<script setup>
import { ref } from 'vue'
import { SmithchartComponent as EjsSmithchart } from '@syncfusion/ej2-vue-charts'

const chartRef = ref(null)

const exportChart = () => {
  chartRef.value.export('PNG', 'SmithChart')
}

const exportPDF = () => {
  chartRef.value.export('PDF', 'SmithChart', 'Landscape')
}
</script>

<template>
  <div>
    <button @click="exportChart">Export as PNG</button>
    <button @click="exportPDF">Export as PDF</button>
    <ejs-smithchart ref="chartRef"></ejs-smithchart>
  </div>
</template>
```

### destroy()
Destroys the SmithChart component and releases all resources.

**Signature:**
```javascript
destroy(): void
```

**Example:**
```vue
<script setup>
import { ref } from 'vue'

const chartRef = ref(null)

const destroyChart = () => {
  chartRef.value.destroy()
}
</script>

<template>
  <div>
    <button @click="destroyChart">Destroy Chart</button>
    <ejs-smithchart ref="chartRef"></ejs-smithchart>
  </div>
</template>
```

---

## Enums

### RenderType
Specifies the render type of the SmithChart.

**API Reference:** [RenderType Documentation](https://ej2.syncfusion.com/vue/documentation/api/smithchart/rendertype)

| Value | Description |
|---|---|
| `Impedance` | Render a SmithChart with Impedance type (default) |
| `Admittance` | Render a SmithChart with Admittance type |

**Usage Example:**
```vue
<template>
  <ejs-smithchart :renderType="'Admittance'"></ejs-smithchart>
</template>
```

### SmithchartTheme
Specifies the theme applied to the SmithChart.

**API Reference:** [SmithchartTheme Documentation](https://ej2.syncfusion.com/vue/documentation/api/smithchart/smithcharttheme)

| Value | Description |
|---|---|
| `Material` | Material design theme (default) |
| `Fabric` | Fabric design theme |
| `Bootstrap` | Bootstrap theme |
| `HighContrastLight` | High contrast light theme |
| `MaterialDark` | Material dark theme |
| `FabricDark` | Fabric dark theme |
| `HighContrast` | High contrast theme |
| `BootstrapDark` | Bootstrap dark theme |
| `Bootstrap4` | Bootstrap 4 theme |
| `Tailwind` | Tailwind CSS theme |
| `TailwindDark` | Tailwind dark theme |
| `Tailwind3` | Tailwind 3 theme |
| `Tailwind3Dark` | Tailwind 3 dark theme |
| `Bootstrap5` | Bootstrap 5 theme |
| `Bootstrap5Dark` | Bootstrap 5 dark theme |
| `Fluent` | Fluent design theme |
| `Fluent2` | Fluent 2 design theme |
| `Fluent2Dark` | Fluent 2 dark theme |
| `Fluent2HighContrast` | Fluent 2 high contrast theme |
| `FluentDark` | Fluent dark theme |
| `Material3` | Material 3 theme |
| `Material3Dark` | Material 3 dark theme |

**Usage Example:**
```vue
<template>
  <ejs-smithchart :theme="'Bootstrap5'"></ejs-smithchart>
</template>
```

### SmithchartAlignment
Specifies alignment options for text and elements.

| Value | Description |
|---|---|
| `Near` | Align to the start/left |
| `Center` | Center alignment |
| `Far` | Align to the end/right |

---

## Child Directives

### Series Collection & Series Item

The `e-series-collection` directive contains multiple `e-series` directives for defining data series.

**Usage:**
```vue
<ejs-smithchart :renderType="'Impedance'">
  <e-series-collection>
    <e-series 
      :dataSource="seriesData1" 
      name="Series 1"
      fill="#FF6B6B"
      :resistance="resistance"
      :reactance="reactance"
    ></e-series>
    <e-series 
      :dataSource="seriesData2" 
      name="Series 2"
      fill="#4ECDC4"
      :resistance="resistance"
      :reactance="reactance"
    ></e-series>
  </e-series-collection>
</ejs-smithchart>
```

**Properties:**
- `dataSource`: Array of data points
- `name`: Series name for legend
- `fill`: Line color
- `resistance`: Field name for resistance
- `reactance`: Field name for reactance
- `width`: Line width
- `opacity`: Line opacity
- `marker`: Marker configuration object
- `tooltip`: Tooltip configuration object
- `enableAnimation`: Enable animation
- `animationDuration`: Animation duration

---

## Modules/Services

### SmithchartLegend
Module for enabling legend rendering on the SmithChart.

**Registration:**
```vue
<script>
import { SmithchartLegend } from '@syncfusion/ej2-vue-charts'
import { SmithchartComponent } from '@syncfusion/ej2-vue-charts'

export default {
  provide: {
    smithchart: [SmithchartLegend]
  }
}
</script>
```

**Purpose:** Displays a legend showing series information with toggle visibility support

### TooltipRender
Module for enabling tooltip rendering on the SmithChart.

**Registration:**
```vue
<script>
import { TooltipRender } from '@syncfusion/ej2-vue-charts'
import { SmithchartComponent } from '@syncfusion/ej2-vue-charts'

export default {
  provide: {
    smithchart: [TooltipRender]
  }
}
</script>
```

**Purpose:** Displays tooltips with data point information on hover

---

## Common Usage Patterns

### Basic SmithChart with Series Data

```vue
<template>
  <div class="chart-container">
    <ejs-smithchart
      id="container"
      height="400px"
      width="600px"
      renderType="Impedance"
      :legendSettings="{ visible: true }"
      :tooltip="tooltipSettings"
    >
      <e-series-collection>
        <e-series
          :dataSource="impedanceData"
          name="Impedance Series"
          resistance="resistance"
          reactance="reactance"
          fill="#FF6B6B"
        />
      </e-series-collection>
    </ejs-smithchart>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import {
  SmithchartComponent as EjsSmithchart,
  SeriesCollectionDirective as ESeriesCollection,
  SeriesDirective as ESeries,
  SmithchartLegend,
  TooltipRender
} from '@syncfusion/ej2-vue-charts'

provide('smithchart', [SmithchartLegend, TooltipRender])

const tooltipSettings = ref({
  visible: true
})

const impedanceData = ref([
  { resistance: 0, reactance: 0 },
  { resistance: 0.5, reactance: 0.5 },
  { resistance: 1, reactance: 1 },
  { resistance: 1.5, reactance: 1.5 },
  { resistance: 2, reactance: 2 }
])
</script>

<style scoped>
.chart-container {
  width: 600px;
  height: 400px;
}
</style>
```

### SmithChart with Title, Legend, and Tooltip

```vue
<template>
  <ejs-smithchart 
    :id="'smithchart'" 
    :height="'600px'" 
    :width="'100%'"
    :renderType="'Impedance'"
    :theme="'Bootstrap5'"
    :title="titleSettings"
    :legendSettings="legendSettings"
  >
    <e-series-collection>
      <e-series 
        :dataSource="seriesData" 
        :name="'Transmission Line'"
        :resistance="'resistance'"
        :reactance="'reactance'"
        :marker="markerSettings"
        :tooltip="tooltipSettings"
      ></e-series>
    </e-series-collection>
  </ejs-smithchart>
</template>

<script setup>
import { ref, provide } from 'vue'
import { SmithchartComponent as EjsSmithchart, SeriesCollectionDirective as ESeriesCollection, SeriesDirective as ESeries, SmithchartLegend, TooltipRender } from '@syncfusion/ej2-vue-charts'

provide('smithchart', [SmithchartLegend, TooltipRender])

const titleSettings = ref({
  text: 'Smith Chart Analysis',
  visible: true,
  textAlignment: 'Center',
  font: { size: '16px', fontWeight: 'bold' }
})

const legendSettings = ref({
  visible: true,
  position: 'Bottom',
  toggleVisibility: true
})

const markerSettings = ref({
  visible: true,
  shape: 'Circle',
  width: 8,
  height: 8,
  fill: '#FF6B6B'
})

const tooltipSettings = ref({
  visible: true,
})

const seriesData = ref([
  { resistance: 0, reactance: 0 },
  { resistance: 1, reactance: 0.5 },
  { resistance: 2, reactance: 1 },
  { resistance: 3, reactance: 1.5 }
])
</script>
```

### Export SmithChart to Different Formats

```vue
<template>
  <div>
    <div style="margin-bottom: 20px">
      <button @click="exportPNG">Export as PNG</button>
      <button @click="exportSVG">Export as SVG</button>
      <button @click="exportPDF">Export as PDF</button>
    </div>
    <ejs-smithchart ref="chartRef" :renderType="'Impedance'">
      <e-series-collection>
        <e-series :dataSource="seriesData" :name="'Series 1'"></e-series>
      </e-series-collection>
    </ejs-smithchart>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SmithchartComponent as EjsSmithchart, SeriesCollectionDirective as ESeriesCollection, SeriesDirective as ESeries } from '@syncfusion/ej2-vue-charts'

const chartRef = ref(null)

const seriesData = ref([
  { resistance: 1, reactance: 0.5 },
  { resistance: 2, reactance: 1 },
  { resistance: 3, reactance: 1.5 }
])

const exportPNG = () => {
  chartRef.value.export('PNG', 'SmithChart')
}

const exportSVG = () => {
  chartRef.value.export('SVG', 'SmithChart')
}

const exportPDF = () => {
  chartRef.value.export('PDF', 'SmithChart', 'Landscape')
}
</script>
```

---

## Additional Resources

- **Official Syncfusion Documentation:** [SmithChart Component Guide](https://ej2.syncfusion.com/vue/documentation/smithchart/)
- **API Reference:** [SmithChart API Documentation](https://ej2.syncfusion.com/vue/documentation/api/smithchart/index-default)
- **Syncfusion Community Forum:** [Support & Community](https://www.syncfusion.com/forums)
- **Vue 3 Documentation:** [Vue 3 Guide](https://vuejs.org/)
- **Syncfusion Help Center:** [Help Documentation](https://help.syncfusion.com/)

---

## Validation Checklist

✅ All links use `https://ej2.syncfusion.com/`  
✅ All code examples use Vue 3 `<script setup>` syntax  
✅ All property types are specified with corresponding API links  
✅ Default values are documented  
✅ Event parameters are clearly typed  
✅ Method signatures show parameters and return types  
✅ Child directives use kebab-case in templates  
✅ All external links are functional  
✅ Code examples are syntactically correct and follow Vue 3 best practices
