# Sparkline API Reference

## Table of Contents
- [Overview](#overview)
- [Properties](#properties)
  - [Dimensions & Layout](#dimensions--layout)
  - [Data & Series](#data--series)
  - [Styling & Appearance](#styling--appearance)
  - [Tooltip & Interaction](#tooltip--interaction)
- [Data Models](#data-models)
  - [SparklineMarkerSettingsModel](#sparklinemarkersettingsmodel)
  - [TooltipSettingsModel](#tooltipsettingsmodel)
  - [TrackLineSettingsModel](#tracklinesettingsmodel)
- [Events](#events)
- [Methods](#methods)
- [Enums](#enums)
- [Child Directives](#child-directives)
- [Modules/Services](#modulesservices)
  - [SparklineTooltip](#sparklinetooltip)
- [Common Usage Patterns](#common-usage-patterns)
  - [Basic Sparkline](#basic-sparkline)
  - [Interactive Sparkline with Tooltip](#interactive-sparkline-with-tooltip)
- [Additional Resources](#additional-resources)

## Overview
The Sparkline component renders compact charts for inline and dashboard visualizations.

**NPM Package:** `@syncfusion/ej2-vue-charts`
**Official Documentation:** https://ej2.syncfusion.com/vue/documentation/sparkline/

---

## Properties

### Dimensions & Layout

| Property | Type | Default | Description | Links |
|---|---|---|---|---|
| `height` | `string` | - | Height of the Sparkline container (e.g. `100px`, `100%`) | [Link](https://ej2.syncfusion.com/vue/documentation/api/sparkline/index-default#height) |
| `width` | `string` | - | Width of the Sparkline container (e.g. `200px`, `100%`) | [Link](https://ej2.syncfusion.com/vue/documentation/api/sparkline/index-default#width) |
| `padding` | [PaddingModel](https://ej2.syncfusion.com/vue/documentation/api/sparkline/paddingmodel) | - | Padding around the sparkline: `{ left, right, top, bottom }` | [Link](https://ej2.syncfusion.com/vue/documentation/api/sparkline/index-default#padding) |

### Data & Series

| Property | Type | Default | Description | Link |
|---|---|---|---|---|
| `dataSource` | `Object[]/DataManager` | `null` | Data array for the sparkline series | [Link](https://ej2.syncfusion.com/vue/documentation/api/sparkline/index-default#datasource) |
| `xName` | `string` | `null` | Field name for X values | [Link](https://ej2.syncfusion.com/vue/documentation/api/sparkline/index-default#xname) |
| `yName` | `string` | `null` | Field name for Y values | [Link](https://ej2.syncfusion.com/vue/documentation/api/sparkline/index-default#yname) |
| `type` | [SparklineType](https://ej2.syncfusion.com/vue/documentation/api/sparkline/sparklinetype) | `'Line'` | Sparkline type: `Line`, `Column`, `Area`, `Pie`, `WinLoss` | [Link](https://ej2.syncfusion.com/vue/documentation/api/sparkline/index-default#type) |
| `valueType` | [SparklineValueType](https://ej2.syncfusion.com/vue/documentation/api/sparkline/sparklinevaluetype) | `Numeric` | Value type: `Category`, `Numeric`, `DateTime` | [Link](https://ej2.syncfusion.com/vue/documentation/api/sparkline/index-default#valuetype) |

### Styling & Appearance

| Property | Type | Default | Description | Link |
|---|---|---|---|---|
| `fill` | `string` | `#00bdae` | Series fill color | [Link](https://ej2.syncfusion.com/vue/documentation/api/sparkline/index-default#fill) |
| `border` | [SparklineBorderModel](https://ej2.syncfusion.com/vue/documentation/api/sparkline/sparklinebordermodel) | - | Border settings: `{ color, width }` | [Link](https://ej2.syncfusion.com/vue/documentation/api/sparkline/index-default#border) |
| `containerArea` | [ContainerAreaModel](https://ej2.syncfusion.com/vue/documentation/api/sparkline/containerareamodel) | - | Container area styling: `{ background, border }` | [Link](https://ej2.syncfusion.com/vue/documentation/api/sparkline/index-default#containerarea) |
| `theme` | [SparklineTheme](https://ej2.syncfusion.com/vue/documentation/api/sparkline/sparklinetheme) | `'Material'` | Theme for sparkline colors and styles | [Link](https://ej2.syncfusion.com/vue/documentation/api/sparkline/index-default#theme) |

### Tooltip & Interaction

| Property | Type | Default | Description | Link |
|---|---|---|---|---|
| `tooltipSettings` | [SparklineTooltipSettingsModel](https://ej2.syncfusion.com/vue/documentation/api/sparkline/sparklinetooltipsettingsmodel) | - | Tooltip configuration for point details | [Link](https://ej2.syncfusion.com/vue/documentation/api/sparkline/index-default#tooltipsettings) |
| `enablePersistence` | `boolean` | `false` | Persist component state between reloads | [Link](https://ej2.syncfusion.com/vue/documentation/api/sparkline/index-default#enablepersistence) |
| `enableRtl` | `boolean` | `false` | Enable right-to-left rendering | [Link](https://ej2.syncfusion.com/vue/documentation/api/sparkline/index-default#enablertl) |

---

## Data Models

### SparklineMarkerSettingsModel
Configuration for markers on data points.
Link: https://ej2.syncfusion.com/vue/documentation/api/sparkline/sparklinemarkersettingsmodel

| Property | Type | Description | Link |
|---|---|---|---|
| `visible` | `VisibleType[]` | Show or hide markers | [Link](https://ej2.syncfusion.com/vue/documentation/api/sparkline/sparklinemarkersettingsmodel#visible) |
| `size` | `number` | To configure the marker size | [Link](https://ej2.syncfusion.com/vue/documentation/api/sparkline/sparklinemarkersettingsmodel#size) |
| `fill` | `string` | Marker fill color | [Link](https://ej2.syncfusion.com/vue/documentation/api/sparkline/sparklinemarkersettingsmodel#fill) |
| `opacity` | `number` | To configure the marker opacity | [Link](https://ej2.syncfusion.com/vue/documentation/api/sparkline/sparklinemarkersettingsmodel#opacity) |
| `border` | [SparklineBorderModel](https://ej2.syncfusion.com/vue/documentation/api/sparkline/sparklinebordermodel) | To configure Sparkline marker border color and width | [Link](https://ej2.syncfusion.com/vue/documentation/api/sparkline/sparklinemarkersettingsmodel#border) |


### TooltipSettingsModel
Link: https://ej2.syncfusion.com/vue/documentation/api/sparkline/sparklinetooltipsettingsmodel

| Property | Type | Description | Link |
|---|---|---|---|
| `visible` | `boolean` | Toggle the tooltip visibility | [Link](https://ej2.syncfusion.com/vue/documentation/api/sparkline/sparklinetooltipsettingsmodel#visible) |
| `format` | `string` | To customize the tooltip format | [Link](https://ej2.syncfusion.com/vue/documentation/api/sparkline/sparklinetooltipsettingsmodel#format) |
| `fill` | `string` | To customize the tooltip fill color | [Link](https://ej2.syncfusion.com/vue/documentation/api/sparkline/sparklinetooltipsettingsmodel#fill) |
| `template` | `string/Function` | To customize the tooltip template | [Link](https://ej2.syncfusion.com/vue/documentation/api/sparkline/sparklinetooltipsettingsmodel#template) |
| `border` | [SparklineBorderModel](https://ej2.syncfusion.com/vue/documentation/api/sparkline/sparklinebordermodel) | To configure tooltip border color and width | [Link](https://ej2.syncfusion.com/vue/documentation/api/sparkline/sparklinetooltipsettingsmodel#border) |


### TrackLineSettingsModel
Link: https://ej2.syncfusion.com/vue/documentation/api/sparkline/tracklinesettingsmodel

| Property | Type | Description | Link |
|---|---|---|---|
| `visible` | `boolean` | Toggle the tracker line visibility | [Link](https://ej2.syncfusion.com/vue/documentation/api/sparkline/tracklinesettingsmodel#visible) |
| `width` | `number` | To config the tracker line width| [Link](https://ej2.syncfusion.com/vue/documentation/api/sparkline/tracklinesettingsmodel#width) |
| `color` | `string` | To config the tracker line color | [Link](https://ej2.syncfusion.com/vue/documentation/api/sparkline/tracklinesettingsmodel#color) |

---

## Events
Link: https://ej2.syncfusion.com/vue/documentation/api/sparkline/index-default#events

- `load` — Fires before the sparkline is rendered.

```vue
<template>
  <ejs-sparkline @load="onLoad"></ejs-sparkline>
</template>
<script setup>
const onLoad = (args) => console.log('Sparkline loading', args)
</script>
```

- `loaded` — Fires after initial rendering completes.
- `tooltipInitialize` — Triggers before sparkline tooltip render.
- `sparklineMouseMove` — Triggers while mouse move on the sparkline container.

---

## Methods
Link: https://ej2.syncfusion.com/vue/documentation/api/sparkline/index-default#methods

- [renderSparkline(): void](https://ej2.syncfusion.com/vue/documentation/api/sparkline/index-default#rendersparkline) — To render sparkline elements.
- [destroy(): void](https://ej2.syncfusion.com/vue/documentation/api/sparkline/index-default#destroy) — Destroy the component and release resources.
- [getModuleName(): string](https://ej2.syncfusion.com/vue/documentation/api/sparkline/index-default#getmodulename) — Returns component module name.

---

## Enums

- [SparklineType](https://ej2.syncfusion.com/vue/documentation/api/sparkline/sparklinetype) — `Line`, `Column`, `Area`, `Pie`, `WinLoss`

---

## Child Directives

Sparklines typically do not use nested directive collections like full charts; the configuration is passed via props and options objects.

---

## Modules/Services

### SparklineTooltip
Module to enable and customize tooltip behavior.

**Registration example:**

```javascript
import { SparklineTooltip } from '@syncfusion/ej2-vue-charts'
import { SparklineComponent } from '@syncfusion/ej2-vue-charts'

provide:{
    sparkline:[SparklineTooltip]
}
```

---

## Common Usage Patterns

### Basic Sparkline

```vue
<template>
  <ejs-sparkline :dataSource="data" xName="x" yName="y" type="Line"></ejs-sparkline>
</template>
```

### Interactive Sparkline with Tooltip

```vue
<template>
  <ejs-sparkline :dataSource="data" xName="x" yName="y" :tooltipSettings="{ visible: true }"></ejs-sparkline>
</template>
```

---

## Additional Resources

- Official Sparkline docs: https://ej2.syncfusion.com/vue/documentation/sparkline/
- API reference: https://ej2.syncfusion.com/vue/documentation/api/sparkline/index-default
