# Series Types in Range Navigator

## Table of Contents

- [Overview](#overview)
- [Line Series](#line-series)
  - [Basic Line Series](#basic-line-series)
  - [Line Series with Styling](#line-series-with-styling)
  - [Use Cases](#use-cases)
- [Area Series](#area-series)
  - [Basic Area Series](#basic-area-series)
  - [Area Series with Styling](#area-series-with-styling)
  - [Use Cases](#use-cases-1)
- [StepLine Series](#stepline-series)
  - [Basic StepLine Series](#basic-stepline-series)
  - [StepLine with Styling](#stepline-with-styling)
  - [Use Cases](#use-cases-2)
- [Spline Series](#spline-series)
  - [Basic Spline Series](#basic-spline-series)
  - [Spline Series with Styling](#spline-series-with-styling)
  - [Use Cases](#use-cases-3)
- [SplineArea Series](#splinearea-series)
  - [Basic SplineArea Series](#basic-splinearea-series)
  - [SplineArea with Styling](#Splinearea-series-with-styling)
  - [Use Cases](#use-cases-4)
- [Column Series](#column-series)
  - [Basic Column Series](#basic-column-series)
  - [Column Series with Styling](#column-series-with-styling)
  - [Use Cases](#use-cases-5)
- [Series Customization](#series-customization)
  - [Common Customization Properties](#common-customization-properties)
  - [Multiple Series Example](#multiple-series-example)
- [Choosing Series Types](#choosing-series-types)
  - [Decision Matrix](#decision-matrix)
  - [Data Format Requirements](#data-format-requirements)
  - [Performance Considerations](#performance-considerations)

## Overview

Range Navigator supports **three documented series types** for data rendering: `Line`, `Area`, `StepLine`, `Spline`, `SplineArea` and `Column`. The official Vue documentation shows that `Line` is the default series type, while `Area`, `StepLine`, `Spline`, `SplineArea` and `Column` require their corresponding injected modules. 

**Available Series Types:**

- `Line` - Continuous line for trend visualization.
- `Area` - Filled region below the trend line to emphasize magnitude.
- `StepLine` - Step-style rendering for discrete value transitions.
- `Spline` - Smooth curved line for gradually changing trends.
- `SplineArea` - Smooth curved line with a filled region to emphasize magnitude.
- `Column` - Vertical columns for discrete value comparisons.

## Line Series

Use **Line** series when you want to show trends clearly with connected points and no filled area. The official Syncfusion documentation explicitly documents `Line` as a supported Range Navigator series type and notes that it is the default rendering type. 

### Basic Line Series

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
        xName="date"
        yName="value"
        type="Line"
        :width="2"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  LineSeries,
  DateTime
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM d';
const rangeValue = ref([new Date(2023, 0, 1), new Date(2023, 0, 7)]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 21 },
  { date: new Date(2023, 0, 2), value: 24 },
  { date: new Date(2023, 0, 3), value: 36 },
  { date: new Date(2023, 0, 4), value: 38 },
  { date: new Date(2023, 0, 5), value: 54 },
  { date: new Date(2023, 0, 6), value: 57 },
  { date: new Date(2023, 0, 7), value: 70 }
]);

provide('rangeNavigator', [DateTime, LineSeries]);
</script>
```

This corrected Vue 3 Composition API example adds the required module injection and root settings (`valueType`, `value`, and `labelFormat`) that Syncfusion uses throughout its official Range Navigator examples. Since a series is rendered, the `dataSource` is correctly bound on `<e-rangenavigator-series>`. 

### Line Series with Styling

For line-series customization, the Range Navigator series API documents `fill`, `width`, `dashArray`, `opacity`, `xName`, `yName`, `type`, and `dataSource` as valid series properties. 

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
        xName="date"
        yName="value"
        type="Line"
        :fill="'#FF0000'"
        :width="2"
        :dashArray="'5,5'"
        :opacity="0.9"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  LineSeries,
  DateTime
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM d';
const rangeValue = ref([new Date(2023, 0, 1), new Date(2023, 0, 7)]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 21 },
  { date: new Date(2023, 0, 2), value: 24 },
  { date: new Date(2023, 0, 3), value: 36 },
  { date: new Date(2023, 0, 4), value: 38 },
  { date: new Date(2023, 0, 5), value: 54 },
  { date: new Date(2023, 0, 6), value: 57 },
  { date: new Date(2023, 0, 7), value: 70 }
]);

provide('rangeNavigator', [DateTime, LineSeries]);
</script>
```

**Key Properties:**  
- `fill` - sets the series color. 
- `width` - controls stroke thickness. 
- `dashArray` - controls the line dash pattern. 
- `opacity` - controls overall series opacity. 

### Use Cases

**When to use Line Series:**  
- Stock-price or trend-style numeric time-series displays. 
- Temperature and weather trends over time. 
- Revenue or traffic trends where the shape matters more than filled magnitude. 

## Area Series

Use **Area** series when you want to emphasize the value magnitude as well as the trend direction. The official Vue Range Navigator documentation documents `Area` as a supported series type and shows it rendered through the `AreaSeries` module. 

### Basic Area Series

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
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
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  AreaSeries,
  DateTime
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM d';
const rangeValue = ref([new Date(2023, 0, 1), new Date(2023, 0, 7)]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 21 },
  { date: new Date(2023, 0, 2), value: 24 },
  { date: new Date(2023, 0, 3), value: 36 },
  { date: new Date(2023, 0, 4), value: 38 },
  { date: new Date(2023, 0, 5), value: 54 },
  { date: new Date(2023, 0, 6), value: 57 },
  { date: new Date(2023, 0, 7), value: 70 }
]);

provide('rangeNavigator', [DateTime, AreaSeries]);
</script>
```

This corrected version adds the required Vue 3 `script setup` imports and Syncfusion `provide('rangeNavigator', ...)` injection pattern shown in the official documentation. 

### Area Series with Styling

For area-series styling, the documented Range Navigator series properties include `fill`, `opacity`, and `border`. The series API explicitly documents `border` for color and width customization. 

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
        xName="date"
        yName="value"
        type="Area"
        :fill="'#69D2E7'"
        :opacity="0.7"
        :border="{ width: 2, color: '#0288D1' }"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
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
const labelFormat = 'MMM d';
const rangeValue = ref([new Date(2023, 0, 1), new Date(2023, 0, 7)]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 21 },
  { date: new Date(2023, 0, 2), value: 24 },
  { date: new Date(2023, 0, 3), value: 36 },
  { date: new Date(2023, 0, 4), value: 38 },
  { date: new Date(2023, 0, 5), value: 54 },
  { date: new Date(2023, 0, 6), value: 57 },
  { date: new Date(2023, 0, 7), value: 70 }
]);

provide('rangeNavigator', [DateTime, AreaSeries]);
</script>
```

**Key Properties:**  
- `fill` - area fill color. 
- `opacity` - area transparency. 
- `border.width` - outline thickness. 
- `border.color` - outline color. 

### Use Cases

**When to use Area Series:**  
- Usage metrics such as memory, CPU, and energy consumption. 
- Volume-oriented measures where filled magnitude helps readability. 
- Sales or cumulative trends where occupied area is meaningful. 

## StepLine Series

Use **StepLine** series when the values change in discrete jumps rather than continuous slopes. Syncfusion documents `StepLine` as one of the supported Range Navigator series types and shows it as a separate injected series module. 

### Basic StepLine Series

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
        xName="date"
        yName="value"
        type="StepLine"
        :width="2"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  StepLineSeries,
  DateTime
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM d';
const rangeValue = ref([new Date(2023, 0, 1), new Date(2023, 0, 7)]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 10 },
  { date: new Date(2023, 0, 2), value: 10 },
  { date: new Date(2023, 0, 3), value: 20 },
  { date: new Date(2023, 0, 4), value: 20 },
  { date: new Date(2023, 0, 5), value: 30 },
  { date: new Date(2023, 0, 6), value: 40 },
  { date: new Date(2023, 0, 7), value: 40 }
]);

provide('rangeNavigator', [DateTime, StepLineSeries]);
</script>
```

This version corrects the original snippet by adding the required `StepLineSeries` injection and complete Vue 3 component structure. 

### StepLine with Styling

The same documented series properties such as `fill`, `width`, and `opacity` can be applied while using the `StepLine` type. 

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
        xName="date"
        yName="value"
        type="StepLine"
        :fill="'#FFA500'"
        :width="2"
        :opacity="1"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  StepLineSeries,
  DateTime
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM d';
const rangeValue = ref([new Date(2023, 0, 1), new Date(2023, 0, 7)]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 10 },
  { date: new Date(2023, 0, 2), value: 10 },
  { date: new Date(2023, 0, 3), value: 20 },
  { date: new Date(2023, 0, 4), value: 20 },
  { date: new Date(2023, 0, 5), value: 30 },
  { date: new Date(2023, 0, 6), value: 40 },
  { date: new Date(2023, 0, 7), value: 40 }
]);

provide('rangeNavigator', [DateTime, StepLineSeries]);
</script>
```

### Use Cases

**When to use StepLine Series:**  
- Discrete operational-state changes such as server states or alert levels. 
- Value transitions that should not be visually interpolated as smooth slopes. 
- Event or state-series dashboards with categorical transitions over time. 

## Spline Series

Use the **Spline** series to display data using smooth, curved segments between data points. Set the series `type` to `Spline` and inject the `SplineSeries` module through `provide('rangeNavigator', [...])`.

### Basic Spline Series

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
        xName="date"
        yName="value"
        type="Spline"
        :width="2"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  SplineSeries,
  DateTime
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM d';
const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 0, 7)
]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 20 },
  { date: new Date(2023, 0, 2), value: 36 },
  { date: new Date(2023, 0, 3), value: 28 },
  { date: new Date(2023, 0, 4), value: 44 },
  { date: new Date(2023, 0, 5), value: 38 },
  { date: new Date(2023, 0, 6), value: 52 },
  { date: new Date(2023, 0, 7), value: 46 }
]);

provide('rangeNavigator', [
  DateTime,
  SplineSeries
]);
</script>
```

### Spline Series with Styling

The `fill`, `width`, `dashArray`, and `opacity` properties can be used to customize the appearance of the Spline series.

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
        xName="date"
        yName="value"
        type="Spline"
        :fill="'#7C3AED'"
        :width="3"
        :dashArray="'5,3'"
        :opacity="0.9"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  SplineSeries,
  DateTime
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM d';
const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 0, 7)
]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 20 },
  { date: new Date(2023, 0, 2), value: 36 },
  { date: new Date(2023, 0, 3), value: 28 },
  { date: new Date(2023, 0, 4), value: 44 },
  { date: new Date(2023, 0, 5), value: 38 },
  { date: new Date(2023, 0, 6), value: 52 },
  { date: new Date(2023, 0, 7), value: 46 }
]);

provide('rangeNavigator', [
  DateTime,
  SplineSeries
]);
</script>
```

**Key Properties:**

- `fill` - Sets the color of the Spline series.
- `width` - Controls the thickness of the spline curve.
- `dashArray` - Controls the dash pattern of the curve.
- `opacity` - Controls the transparency of the series.

### Use Cases

**When to use Spline Series:**

- Smoothly varying temperature, pressure, or environmental measurements.
- Trends where gradual transitions between data points should be emphasized.
- Time-series data where a curved representation improves readability.

## SplineArea Series

Use the **SplineArea** series to combine a smooth spline curve with a filled area. It is useful when both the trend direction and the value magnitude need to be emphasized. Set the series `type` to `SplineArea` and inject the `SplineAreaSeries` module.

### Basic SplineArea Series

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
        xName="date"
        yName="value"
        type="SplineArea"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  SplineAreaSeries,
  DateTime
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM d';
const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 0, 7)
]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 32 },
  { date: new Date(2023, 0, 2), value: 46 },
  { date: new Date(2023, 0, 3), value: 40 },
  { date: new Date(2023, 0, 4), value: 54 },
  { date: new Date(2023, 0, 5), value: 49 },
  { date: new Date(2023, 0, 6), value: 62 },
  { date: new Date(2023, 0, 7), value: 57 }
]);

provide('rangeNavigator', [
  DateTime,
  SplineAreaSeries
]);
</script>
```

### SplineArea Series with Styling

The `fill`, `opacity`, and `border` properties can be used to customize the filled region and its outline.

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
        xName="date"
        yName="value"
        type="SplineArea"
        :fill="'#0EA5E9'"
        :opacity="0.65"
        :border="{ color: '#0369A1', width: 2 }"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  SplineAreaSeries,
  DateTime
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM d';
const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 0, 7)
]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 32 },
  { date: new Date(2023, 0, 2), value: 46 },
  { date: new Date(2023, 0, 3), value: 40 },
  { date: new Date(2023, 0, 4), value: 54 },
  { date: new Date(2023, 0, 5), value: 49 },
  { date: new Date(2023, 0, 6), value: 62 },
  { date: new Date(2023, 0, 7), value: 57 }
]);

provide('rangeNavigator', [
  DateTime,
  SplineAreaSeries
]);
</script>
```

**Key Properties:**

- `fill` - Sets the fill color of the SplineArea series.
- `opacity` - Controls the transparency of the filled area.
- `border.width` - Controls the thickness of the area outline.
- `border.color` - Sets the color of the area outline.

### Use Cases

**When to use SplineArea Series:**

- Smooth trends where value magnitude should also be emphasized.
- Resource-usage, traffic, or consumption data with gradual changes.
- Time-series data where both the occupied area and the curved trend are meaningful.

## Column Series

Use the **Column** series to display values as vertical columns. It is suitable for highlighting discrete values and comparing the magnitude of individual data points. Set the series `type` to `Column` and inject the `ColumnSeries` module.

### Basic Column Series

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
        xName="date"
        yName="value"
        type="Column"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  ColumnSeries,
  DateTime
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM d';
const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 0, 7)
]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 18 },
  { date: new Date(2023, 0, 2), value: 30 },
  { date: new Date(2023, 0, 3), value: 24 },
  { date: new Date(2023, 0, 4), value: 41 },
  { date: new Date(2023, 0, 5), value: 35 },
  { date: new Date(2023, 0, 6), value: 48 },
  { date: new Date(2023, 0, 7), value: 44 }
]);

provide('rangeNavigator', [
  DateTime,
  ColumnSeries
]);
</script>
```

### Column Series with Styling

The `fill`, `opacity`, and `border` properties can be used to customize the appearance of the columns.

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
        xName="date"
        yName="value"
        type="Column"
        :fill="'#F97316'"
        :opacity="0.8"
        :border="{ color: '#9A3412', width: 1 }"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  ColumnSeries,
  DateTime
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM d';
const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 0, 7)
]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 18 },
  { date: new Date(2023, 0, 2), value: 30 },
  { date: new Date(2023, 0, 3), value: 24 },
  { date: new Date(2023, 0, 4), value: 41 },
  { date: new Date(2023, 0, 5), value: 35 },
  { date: new Date(2023, 0, 6), value: 48 },
  { date: new Date(2023, 0, 7), value: 44 }
]);

provide('rangeNavigator', [
  DateTime,
  ColumnSeries
]);
</script>
```

**Key Properties:**

- `fill` - Sets the fill color of the columns.
- `opacity` - Controls the transparency of the columns.
- `border.width` - Controls the column border thickness.
- `border.color` - Sets the column border color.

### Use Cases

**When to use Column Series:**

- Discrete values measured at specific dates or intervals.
- Category-based comparisons where individual values should be emphasized.
- Sales, volume, transaction, or event-count data.

## Series Customization

### Common Customization Properties

The Range Navigator series API documents `dataSource`, `type`, `xName`, `yName`, `fill`, `opacity`, `width`, `dashArray`, and `border` as supported series properties. The original snippet’s `cornerRadius` and `border.dashArray` are **not documented** in the current Range Navigator series API and should therefore be removed for a corrected, supportable example. 

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="data"
        xName="date"
        yName="value"
        type="Area"
        :fill="'#FF6B6B'"
        :opacity="0.8"
        :border="{ width: 1, color: '#FF0000' }"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
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
const labelFormat = 'MMM d';
const rangeValue = ref([new Date(2023, 0, 1), new Date(2023, 0, 7)]);

const data = ref([
  { date: new Date(2023, 0, 1), value: 21 },
  { date: new Date(2023, 0, 2), value: 24 },
  { date: new Date(2023, 0, 3), value: 36 },
  { date: new Date(2023, 0, 4), value: 38 },
  { date: new Date(2023, 0, 5), value: 54 },
  { date: new Date(2023, 0, 6), value: 57 },
  { date: new Date(2023, 0, 7), value: 70 }
]);

provide('rangeNavigator', [DateTime, AreaSeries]);
</script>
```

| Property | Values | Purpose |
|---|---|---|
| `fill` | CSS color string | Sets the series color.  |
| `width` | Number | Sets stroke width for line-based series.  |
| `opacity` | Number from 0 to 1 | Sets series opacity.  |
| `type` | `Line`, `Area`, `StepLine` | Chooses the series rendering type.  |
| `xName` | Field name | Binds X-axis data field.  |
| `yName` | Field name | Binds Y-axis data field.  |
| `border.width` | Number | Sets border thickness for supported series borders.  |
| `border.color` | CSS color string | Sets border color.  |
| `dashArray` | Pattern string | Controls dash pattern for line-type stroke rendering.  |

### Multiple Series Example

The official series-type documentation shows one series at a time for clarity, but the `e-rangenavigator-series-collection` structure allows you to declare multiple series directives in the same template. If you choose to use more than one series, validate the rendering in your target version because the documentation examples focus on single-series scenarios. 

```vue
<template>
  <ejs-rangenavigator
    :valueType="valueType"
    :value="rangeValue"
    :labelFormat="labelFormat"
  >
    <e-rangenavigator-series-collection>
      <e-rangenavigator-series
        :dataSource="lineData"
        xName="date"
        yName="value"
        type="Line"
        :fill="'#FF0000'"
        :width="2"
      />
      <e-rangenavigator-series
        :dataSource="areaData"
        xName="date"
        yName="value"
        type="Area"
        :fill="'#00AA55'"
        :opacity="0.45"
        :border="{ width: 1, color: '#008844' }"
      />
    </e-rangenavigator-series-collection>
  </ejs-rangenavigator>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  LineSeries,
  AreaSeries,
  DateTime
} from '@syncfusion/ej2-vue-charts';

const valueType = 'DateTime';
const labelFormat = 'MMM d';
const rangeValue = ref([new Date(2023, 0, 1), new Date(2023, 0, 7)]);

const lineData = ref([
  { date: new Date(2023, 0, 1), value: 10 },
  { date: new Date(2023, 0, 2), value: 15 },
  { date: new Date(2023, 0, 3), value: 18 },
  { date: new Date(2023, 0, 4), value: 20 },
  { date: new Date(2023, 0, 5), value: 24 },
  { date: new Date(2023, 0, 6), value: 26 },
  { date: new Date(2023, 0, 7), value: 30 }
]);

const areaData = ref([
  { date: new Date(2023, 0, 1), value: 8 },
  { date: new Date(2023, 0, 2), value: 12 },
  { date: new Date(2023, 0, 3), value: 14 },
  { date: new Date(2023, 0, 4), value: 16 },
  { date: new Date(2023, 0, 5), value: 18 },
  { date: new Date(2023, 0, 6), value: 21 },
  { date: new Date(2023, 0, 7), value: 22 }
]);

provide('rangeNavigator', [DateTime, LineSeries, AreaSeries]);
</script>
```

## Choosing Series Types

### Decision Matrix

| Scenario | Recommended | Reason |
|---|---|---|
| Stock-price trend | Line | Best when the trend line matters more than the filled magnitude.  |
| CPU or memory usage | Area | Filled rendering helps emphasize usage magnitude over time.  |
| Server or alert status | StepLine | Discrete changes are clearer as steps than as sloped lines.  |
| Website traffic volume | Area | Area rendering better emphasizes changing magnitude.  |
| Continuous temperature trend | Line | Smooth trend-style data is most readable as a line.  |
| State transitions / discrete levels | StepLine | Discontinuous state changes should not be visually interpolated.  |
| Smoothly varying trend | Spline | Curved segments emphasize gradual transitions between values. |
| Smooth trend with magnitude | SplineArea | Combines a smooth curve with a filled region. |
| Discrete value comparison | Column | Vertical columns emphasize individual values and their differences. |

### Data Format Requirements

All documented Range Navigator series types use the same field-mapping model: `dataSource` provides the records, while `xName` and `yName` identify the X and Y fields. For DateTime scenarios, the official examples use Date objects on the X field and numeric values on the Y field. 

```javascript
data = [
  { date: new Date(2023, 0, 1), value: 100 },
  { date: new Date(2023, 0, 2), value: 120 }
]
```

**Critical:**  
- Ensure `xName` matches the property that holds your X values. 
- Ensure `yName` matches the numeric property used for plotting. 
- For `valueType: 'DateTime'`, use JavaScript `Date` objects rather than plain strings in your bound data. 
- Provide enough data points to make the selected range meaningful. 

### Performance Considerations

The official documentation does not rank series types by performance, so the original “fastest / good / good” table has been removed as an unsupported claim. What the documentation does confirm is that Range Navigator supports a **lightweight mode** when no series is present, and that data binding can be done either on the series or directly on the root Range Navigator in lightweight mode. 

For very large datasets, consider:  
- Using **lightweight mode** if you do not need a rendered series preview. In that mode, bind `dataSource` on the root `<ejs-rangenavigator>` instead of inside `<e-rangenavigator-series>`. 
- Aggregating or reducing the source data before binding when your time range is very large. This is an application best practice; the official docs do not prescribe a fixed threshold. 
- Keeping `dataSource` on the series whenever a visual series is rendered, because that is how the documented charted examples are structured. 
