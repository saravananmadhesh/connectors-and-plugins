# Syncfusion Angular Accumulation Chart - API Reference Guide

This comprehensive guide catalogs all API references for the Syncfusion Angular Accumulation Chart component. All API documentation is available at **https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/**.

## Table of Contents

- [Core Component APIs](#core-component-apis)
- [Series Configuration APIs](#series-configuration-apis)
- [Data Label APIs](#data-label-apis)
- [Legend APIs](#legend-apis)
- [Tooltip APIs](#tooltip-apis)
- [Annotation APIs](#annotation-apis)
- [Selection APIs](#selection-apis)
- [Animation and Appearance APIs](#animation-and-appearance-apis)
- [Event APIs](#event-apis)
- [Enum Types](#enum-types)
- [Interface Types](#interface-types)

---

## Core Component APIs

### AccumulationChart

The main chart component that renders accumulation visualizations.

| API | Type | Description | Documentation Link |
|-----|------|-------------|-------------------|
| `AccumulationChart` | Class | Main accumulation chart component | [AccumulationChart](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart) |
| `series` | Property | Collection of series to render | [series](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#series) |
| `title` | Property | Chart title text | [title](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#title) |
| `background` | Property | Chart background color | [background](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#background) |
| `theme` | Property | Built-in theme selection | [theme](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#theme) |
| `width` | Property | Chart width | [width](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#width) |
| `height` | Property | Chart height | [height](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#height) |
| `enableSmartLabels` | Property | Automatic label arrangement | [enableSmartLabels](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#enablesmartlabels) |
| `enableAnimation` | Property | Enable series animation | [enableAnimation](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#enableanimation) |
| `legendSettings` | Property | Legend configuration | [legendSettings](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#legendsettings) |
| `tooltip` | Property | Tooltip configuration | [tooltip](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#tooltip) |
| `selectionMode` | Property | Selection behavior mode | [selectionMode](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#selectionmode) |
| `highlightMode` | Property | Highlight interaction mode | [highlightMode](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#highlightmode) |
| `isMultiSelect` | Property | Enable multiple selection | [isMultiSelect](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#ismultiselect) |
| `center` | Property | Chart center point position | [center](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#center) |
| `enablePersistence` | Property | Persist component state | [enablePersistence](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#enablepersistence) |
| `enableBorderOnMouseMove` | Property | Border highlight on hover | [enableBorderOnMouseMove](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#enableborderonmousemove) |
| `print()` | Method | Print chart | [print](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#print) |
| `export()` | Method | Export chart as image/PDF | [export](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#export) |
| `refresh()` | Method | Refresh chart rendering | [refresh](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#refresh) |

---

## Series Configuration APIs

### AccumulationSeries

Configuration for individual accumulation series (Pie, Doughnut, Pyramid, Funnel).

| API | Type | Description | Documentation Link |
|-----|------|-------------|-------------------|
| `AccumulationSeries` | Class | Series model | [AccumulationSeries](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries) |
| `dataSource` | Property | Series data array | [dataSource](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#datasource) |
| `xName` | Property | Data field for x values | [xName](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#xname) |
| `yName` | Property | Data field for y values | [yName](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#yname) |
| `type` | Property | Chart type (Pie/Doughnut/Pyramid/Funnel) | [type](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#type) |
| `name` | Property | Series name | [name](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#name) |
| `radius` | Property | Series radius | [radius](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#radius) |
| `innerRadius` | Property | Inner radius for doughnut | [innerRadius](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#innerradius) |
| `startAngle` | Property | Starting angle (0-360) | [startAngle](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#startangle) |
| `endAngle` | Property | Ending angle (0-360) | [endAngle](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#endangle) |
| `explode` | Property | Enable point explosion | [explode](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#explode) |
| `explodeAll` | Property | Explode all points | [explodeAll](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#explodeall) |
| `explodeIndex` | Property | Index of point to explode | [explodeIndex](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#explodeindex) |
| `explodeOffset` | Property | Explosion distance | [explodeOffset](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#explodeoffset) |
| `groupTo` | Property | Group small values threshold | [groupTo](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#groupto) |
| `groupMode` | Property | Grouping mode (Value/Point) | [groupMode](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#groupmode) |
| `pointColorMapping` | Property | Color mapping field | [pointColorMapping](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#pointcolormapping) |
| `palettes` | Property | Custom color palette | [palettes](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#palettes) |
| `dataLabel` | Property | Data label configuration | [dataLabel](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#datalabel) |
| `border` | Property | Series border styling | [border](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#border) |
| `opacity` | Property | Series opacity (0-1) | [opacity](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#opacity) |
| `emptyPointSettings` | Property | Empty point configuration | [emptyPointSettings](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#emptypointsettings) |
| `animation` | Property | Animation settings | [animation](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#animation) |

### Pyramid/Funnel Specific

| API | Type | Description | Documentation Link |
|-----|------|-------------|-------------------|
| `pyramidMode` | Property | Pyramid shape mode | [pyramidMode](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#pyramidmode) |
| `neckWidth` | Property | Pyramid neck width | [neckWidth](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#neckwidth) |
| `neckHeight` | Property | Pyramid neck height | [neckHeight](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#neckheight) |
| `gapRatio` | Property | Gap between segments | [gapRatio](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#gapratio) |

---

## Data Label APIs

### AccumulationDataLabelSettings

Configuration for data labels on accumulation points.

| API | Type | Description | Documentation Link |
|-----|------|-------------|-------------------|
| `AccumulationDataLabelSettings` | Class | Data label model | [AccumulationDataLabelSettings](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationDataLabelSettings) |
| `visible` | Property | Show/hide data labels | [visible](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationDataLabelSettings#visible) |
| `name` | Property | Data field for label text | [name](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationDataLabelSettings#name) |
| `position` | Property | Label position (Inside/Outside) | [position](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationDataLabelSettings#position) |
| `connectorStyle` | Property | Connector line styling | [connectorStyle](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationDataLabelSettings#connectorstyle) |
| `template` | Property | Custom label template | [template](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationDataLabelSettings#template) |
| `font` | Property | Label font settings | [font](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationDataLabelSettings#font) |
| `fill` | Property | Label background color | [fill](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationDataLabelSettings#fill) |
| `border` | Property | Label border styling | [border](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationDataLabelSettings#border) |
| `rx` | Property | Label border radius X | [rx](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationDataLabelSettings#rx) |
| `ry` | Property | Label border radius Y | [ry](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationDataLabelSettings#ry) |
| `angle` | Property | Label rotation angle | [angle](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationDataLabelSettings#angle) |
| `enableRotation` | Property | Enable smart rotation | [enableRotation](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationDataLabelSettings#enablerotation) |
| `maxWidth` | Property | Maximum label width | [maxWidth](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationDataLabelSettings#maxwidth) |

---

## Legend APIs

### AccumulationLegendSettings

Legend configuration for accumulation charts.

| API | Type | Description | Documentation Link |
|-----|------|-------------|-------------------|
| `LegendSettings` | Class | Legend model | [LegendSettings](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/legendSettings) |
| `visible` | Property | Show/hide legend | [visible](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/legendSettings#visible) |
| `position` | Property | Legend position | [position](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/legendSettings#position) |
| `alignment` | Property | Legend alignment | [alignment](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/legendSettings#alignment) |
| `height` | Property | Legend height | [height](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/legendSettings#height) |
| `width` | Property | Legend width | [width](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/legendSettings#width) |
| `location` | Property | Legend custom location | [location](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/legendSettings#location) |
| `shapeHeight` | Property | Legend icon height | [shapeHeight](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/legendSettings#shapeheight) |
| `shapeWidth` | Property | Legend icon width | [shapeWidth](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/legendSettings#shapewidth) |
| `shapePadding` | Property | Icon-text spacing | [shapePadding](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/legendSettings#shapepadding) |
| `border` | Property | Legend border styling | [border](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/legendSettings#border) |
| `background` | Property | Legend background color | [background](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/legendSettings#background) |
| `opacity` | Property | Legend opacity | [opacity](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/legendSettings#opacity) |
| `textStyle` | Property | Legend text styling | [textStyle](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/legendSettings#textstyle) |
| `toggleVisibility` | Property | Enable legend click toggle | [toggleVisibility](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/legendSettings#togglevisibility) |

---

## Tooltip APIs

### TooltipSettings

Tooltip configuration for accumulation charts.

| API | Type | Description | Documentation Link |
|-----|------|-------------|-------------------|
| `TooltipSettings` | Class | Tooltip model | [TooltipSettings](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/tooltipSettings) |
| `enable` | Property | Enable/disable tooltip | [enable](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/tooltipSettings#enable) |
| `format` | Property | Tooltip text format | [format](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/tooltipSettings#format) |
| `template` | Property | Custom tooltip template | [template](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/tooltipSettings#template) |
| `fill` | Property | Tooltip background color | [fill](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/tooltipSettings#fill) |
| `border` | Property | Tooltip border styling | [border](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/tooltipSettings#border) |
| `opacity` | Property | Tooltip opacity | [opacity](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/tooltipSettings#opacity) |
| `textStyle` | Property | Tooltip text styling | [textStyle](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/tooltipSettings#textstyle) |
| `shared` | Property | Share tooltip across series | [shared](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/tooltipSettings#shared) |
| `enableAnimation` | Property | Animate tooltip appearance | [enableAnimation](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/tooltipSettings#enableanimation) |

---

## Annotation APIs

### AccumulationAnnotationSettings

Configuration for chart annotations.

| API | Type | Description | Documentation Link |
|-----|------|-------------|-------------------|
| `AccumulationAnnotationSettings` | Class | Annotation model | [AccumulationAnnotationSettings](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationAnnotationSettings) |
| `content` | Property | Annotation HTML content | [content](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationAnnotationSettings#content) |
| `region` | Property | Annotation region | [region](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationAnnotationSettings#region) |
| `coordinateUnits` | Property | Coordinate system | [coordinateUnits](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationAnnotationSettings#coordinateunits) |
| `x` | Property | X position | [x](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationAnnotationSettings#x) |
| `y` | Property | Y position | [y](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationAnnotationSettings#y) |
| `description` | Property | Accessibility description | [description](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationAnnotationSettings#description) |

---

## Selection APIs

### SelectionSettings

Configuration for point/series selection.

| API | Type | Description | Documentation Link |
|-----|------|-------------|-------------------|
| `selectionMode` | Property | Selection mode | [selectionMode](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#selectionmode) |
| `isMultiSelect` | Property | Multi-selection support | [isMultiSelect](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#ismultiselect) |
| `selectionPattern` | Property | Selection pattern style | [selectionPattern](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#selectionpattern) |

---

## Animation and Appearance APIs

### Animation

| API | Type | Description | Documentation Link |
|-----|------|-------------|-------------------|
| `AnimationModel` | Interface | Animation configuration | [AnimationModel](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/animationModel) |
| `enable` | Property | Enable animation | [enable](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/animationModel#enable) |
| `duration` | Property | Animation duration (ms) | [duration](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/animationModel#duration) |
| `delay` | Property | Animation delay (ms) | [delay](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/animationModel#delay) |

### Appearance

| API | Type | Description | Documentation Link |
|-----|------|-------------|-------------------|
| `theme` | Property | Built-in themes | [theme](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#theme) |
| `background` | Property | Chart background | [background](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#background) |
| `border` | Property | Chart border | [border](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#border) |
| `margin` | Property | Chart margins | [margin](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#margin) |

---

## Event APIs

### Chart Events

| Event | Description | Event Args | Documentation Link |
|-------|-------------|------------|-------------------|
| `load` | Fires before chart loads | `IAccLoadedEventArgs` | [load](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#load) |
| `loaded` | Fires after chart loads | `IAccLoadedEventArgs` | [loaded](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#loaded) |
| `pointClick` | Fires on point click | `IAccPointEventArgs` | [pointClick](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#pointclick) |
| `pointMove` | Fires on point hover | `IAccPointEventArgs` | [pointMove](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#pointmove) |
| `seriesRender` | Fires before series renders | `IAccSeriesRenderEventArgs` | [seriesRender](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#seriesrender) |
| `pointRender` | Fires before point renders | `IAccPointRenderEventArgs` | [pointRender](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#pointrender) |
| `textRender` | Fires before text renders | `IAccTextRenderEventArgs` | [textRender](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#textrender) |
| `legendRender` | Fires before legend renders | `IAccLegendRenderEventArgs` | [legendRender](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#legendrender) |
| `legendClick` | Fires on legend click | `IAccLegendClickEventArgs` | [legendClick](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#legendclick) |
| `tooltipRender` | Fires before tooltip renders | `IAccTooltipRenderEventArgs` | [tooltipRender](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#tooltiprender) |
| `chartMouseClick` | Fires on chart click | `IAccMouseEventArgs` | [chartMouseClick](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#chartmouseclick) |
| `chartMouseMove` | Fires on chart mouse move | `IAccMouseEventArgs` | [chartMouseMove](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#chartmousemove) |
| `chartMouseUp` | Fires on mouse up | `IAccMouseEventArgs` | [chartMouseUp](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#chartmouseup) |
| `chartMouseDown` | Fires on mouse down | `IAccMouseEventArgs` | [chartMouseDown](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#chartmousedown) |
| `chartMouseLeave` | Fires when mouse leaves chart | `IAccMouseEventArgs` | [chartMouseLeave](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#chartmouseleave) |
| `animationComplete` | Fires after animation completes | `IAccAnimationCompleteEventArgs` | [animationComplete](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#animationcomplete) |
| `beforePrint` | Fires before print | `IPrintEventArgs` | [beforePrint](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#beforeprint) |
| `afterExport` | Fires after export | `IAfterExportEventArgs` | [afterExport](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#afterexport) |
| `selectionComplete` | Fires after selection | `IAccSelectionCompleteEventArgs` | [selectionComplete](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#selectioncomplete) |
| `resized` | Fires on chart resize | `IAccResizeEventArgs` | [resized](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#resized) |

---

## Enum Types

### AccumulationType

Chart series types.

| Value | Description | Documentation Link |
|-------|-------------|-------------------|
| `Pie` | Pie chart | [AccumulationType](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationType) |
| `Doughnut` | Doughnut chart | [AccumulationType](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationType) |
| `Pyramid` | Pyramid chart | [AccumulationType](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationType) |
| `Funnel` | Funnel chart | [AccumulationType](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationType) |

### AccumulationLabelPosition

Data label positioning.

| Value | Description | Documentation Link |
|-------|-------------|-------------------|
| `Inside` | Labels inside segments | [AccumulationLabelPosition](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationLabelPosition) |
| `Outside` | Labels outside segments | [AccumulationLabelPosition](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationLabelPosition) |

### LegendPosition

Legend placement options.

| Value | Description | Documentation Link |
|-------|-------------|-------------------|
| `Top` | Top of chart | [LegendPosition](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/legendPosition) |
| `Bottom` | Bottom of chart | [LegendPosition](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/legendPosition) |
| `Left` | Left side of chart | [LegendPosition](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/legendPosition) |
| `Right` | Right side of chart | [LegendPosition](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/legendPosition) |
| `Custom` | Custom position | [LegendPosition](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/legendPosition) |

### SelectionMode

Selection interaction modes.

| Value | Description | Documentation Link |
|-------|-------------|-------------------|
| `None` | No selection | [SelectionMode](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/selectionMode) |
| `Point` | Select individual points | [SelectionMode](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/selectionMode) |

### PyramidMode

Pyramid rendering modes.

| Value | Description | Documentation Link |
|-------|-------------|-------------------|
| `Linear` | Linear pyramid shape | [PyramidMode](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/pyramidMode) |
| `Surface` | Surface area-based pyramid | [PyramidMode](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/pyramidMode) |

### GroupMode

Data grouping modes.

| Value | Description | Documentation Link |
|-------|-------------|-------------------|
| `Value` | Group by value threshold | [GroupMode](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/groupMode) |
| `Point` | Group by point count | [GroupMode](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/groupMode) |

---

## Interface Types

### Event Argument Interfaces

| Interface | Purpose | Documentation Link |
|-----------|---------|-------------------|
| `IAccLoadedEventArgs` | Load event arguments | [IAccLoadedEventArgs](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/iAccLoadedEventArgs) |
| `IAccPointEventArgs` | Point interaction arguments | [IAccPointEventArgs](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/iAccPointEventArgs) |
| `IAccPointRenderEventArgs` | Point render customization | [IAccPointRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/iAccPointRenderEventArgs) |
| `IAccSeriesRenderEventArgs` | Series render customization | [IAccSeriesRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/iAccSeriesRenderEventArgs) |
| `IAccTextRenderEventArgs` | Text render customization | [IAccTextRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/iAccTextRenderEventArgs) |
| `IAccLegendRenderEventArgs` | Legend render customization | [IAccLegendRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/iAccLegendRenderEventArgs) |
| `IAccLegendClickEventArgs` | Legend click event | [IAccLegendClickEventArgs](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/iAccLegendClickEventArgs) |
| `IAccTooltipRenderEventArgs` | Tooltip render customization | [IAccTooltipRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/iAccTooltipRenderEventArgs) |
| `IAccMouseEventArgs` | Mouse event arguments | [IAccMouseEventArgs](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/iAccMouseEventArgs) |
| `IAccAnimationCompleteEventArgs` | Animation complete event | [IAccAnimationCompleteEventArgs](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/iAccAnimationCompleteEventArgs) |
| `IAccResizeEventArgs` | Resize event arguments | [IAccResizeEventArgs](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/iAccResizeEventArgs) |
| `IAccSelectionCompleteEventArgs` | Selection complete event | [IAccSelectionCompleteEventArgs](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/iAccSelectionCompleteEventArgs) |

### Model Interfaces

| Interface | Purpose | Documentation Link |
|-----------|---------|-------------------|
| `AccumulationChartModel` | Chart model interface | [AccumulationChartModel](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChartModel) |
| `AccumulationSeriesModel` | Series model interface | [AccumulationSeriesModel](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeriesModel) |
| `AccumulationDataLabelSettingsModel` | Data label model | [AccumulationDataLabelSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationDataLabelSettingsModel) |
| `LegendSettingsModel` | Legend model | [LegendSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/legendSettingsModel) |
| `TooltipSettingsModel` | Tooltip model | [TooltipSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/tooltipSettingsModel) |
| `AnimationModel` | Animation model | [AnimationModel](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/animationModel) |
| `BorderModel` | Border styling model | [BorderModel](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/borderModel) |
| `FontModel` | Font styling model | [FontModel](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/fontModel) |
| `MarginModel` | Margin settings model | [MarginModel](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/marginModel) |
| `CenterModel` | Center positioning model | [CenterModel](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/centerModel) |
| `ConnectorModel` | Connector line model | [ConnectorModel](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/connectorModel) |
| `EmptyPointSettingsModel` | Empty point handling | [EmptyPointSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/emptyPointSettingsModel) |

---

## Quick Reference Links

### Essential APIs
- **AccumulationChart**: https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart
- **AccumulationSeries**: https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries
- **Data Labels**: https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationDataLabelSettings
- **Legend**: https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/legendSettings
- **Tooltip**: https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/tooltipSettings

### Getting Started
- **Main Index**: https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/index-default
- **Getting Started Guide**: https://ej2.syncfusion.com/angular/documentation/accumulation-chart/getting-started

---

**Navigation Tips:**
- All links point to the official Syncfusion EJ2 Angular documentation
- Use Ctrl+F to search this document for specific APIs
- Click any "Documentation Link" to open the full API reference online
- Refer to interface types for TypeScript type definitions

