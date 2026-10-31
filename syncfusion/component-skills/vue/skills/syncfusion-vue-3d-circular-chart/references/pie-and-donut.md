# Pie and Donut Charts

## Table of Contents
- [Pie Charts](#pie-charts)
- [Donut Charts](#donut-charts)
- [Radius Customization](#radius-customization)
- [Various Radius Pie](#various-radius-pie)
- [Color Mapping](#color-mapping)
- [Text Mapping](#text-mapping)

## Pie Charts

### Basic Pie Chart

A pie series is rendered by default when you assign data to the 3D Circular Chart without specifying an explicit series type.

```vue
<template>
  <div id="app">
    <ejs-circularchart3d id="container" :tilt="-45">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series :dataSource="data" xName="x" yName="y"></e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  </div>
</template>

<script>
import { CircularChart3DComponent, CircularChart3DSeriesCollectionDirective, CircularChart3DSeriesDirective, PieSeries3D } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-circularchart3d': CircularChart3DComponent,
    'e-circularchart3d-series-collection': CircularChart3DSeriesCollectionDirective,
    'e-circularchart3d-series': CircularChart3DSeriesDirective
  },
  data() {
    return {
      data: [
        { x: 'Jan', y: 35 },
        { x: 'Feb', y: 28 },
        { x: 'Mar', y: 34 },
        { x: 'Apr', y: 32 },
        { x: 'May', y: 40 }
      ]
    };
  },
  provide: {
    circularchart3d: [PieSeries3D]
  }
};
</script>

<style>
#container { height: 350px; }
</style>
```

**Key Property:**
- `tilt`: Controls the 3D perspective angle (range: -90 to 90 degrees). Default is -45°.

### Understanding Pie Data Format

Each data point requires an `x` (category) and `y` (value) field:

```javascript
data: [
  { x: 'Category', y: numericValue },
  { x: 'Q1 Sales', y: 15000 },  // ✅ Valid
  { x: 'Q2 Sales' }             // ❌ Missing y - will be treated as 0 or ignored
]
```

## Donut Charts

### Basic Donut Chart

Transform a pie chart into a donut (ring shape) by setting the `innerRadius` property. This creates a hollow center.

```vue
<template>
  <div id="app">
    <ejs-circularchart3d id="container" :tilt="-45">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          :dataSource="data" 
          xName="x" 
          yName="y"
          innerRadius="40%">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  </div>
</template>

<script>
import { CircularChart3DComponent, CircularChart3DSeriesCollectionDirective, CircularChart3DSeriesDirective, PieSeries3D } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-circularchart3d': CircularChart3DComponent,
    'e-circularchart3d-series-collection': CircularChart3DSeriesCollectionDirective,
    'e-circularchart3d-series': CircularChart3DSeriesDirective
  },
  data() {
    return {
      data: [
        { x: 'Jan', y: 35 },
        { x: 'Feb', y: 28 },
        { x: 'Mar', y: 34 },
        { x: 'Apr', y: 32 },
        { x: 'May', y: 40 }
      ]
    };
  },
  provide: {
    circularchart3d: [PieSeries3D]
  }
};
</script>

<style>
#container { height: 350px; }
</style>
```

**Key Property:**
- `innerRadius`: Percentage of the pie radius to create the hollow center (0%-100%)
  - `0%` or omitted: Pie chart (no hole)
  - `40%`: Donut with 40% hole
  - `80%`: Very thin ring with large hole

### Donut with Center Content (Pattern)

While 3D Circular Chart doesn't natively support center labels, you can add custom content using CSS:

```vue
<template>
  <div class="donut-container">
    <ejs-circularchart3d id="container" :tilt="-45">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series :dataSource="data" xName="x" yName="y" innerRadius="50%"></e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
    <div class="center-content">
      <div class="total">Total</div>
      <div class="value">145K</div>
    </div>
  </div>
</template>

<style scoped>
.donut-container {
  position: relative;
  width: 100%;
}

#container {
  height: 350px;
}

.center-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
}

.total {
  font-size: 14px;
  color: #999;
}

.value {
  font-size: 28px;
  font-weight: bold;
  color: #333;
}
</style>
```

## Radius Customization

### Default Radius

By default, the pie radius is set to 80% of the chart container's minimum dimension (width or height).

```vue
<!-- Default: 80% of container -->
<e-circularchart3d-series :dataSource="data" xName="x" yName="y"></e-circularchart3d-series>

<!-- Custom: 100% of container -->
<e-circularchart3d-series :dataSource="data" xName="x" yName="y" radius="100%"></e-circularchart3d-series>

<!-- Custom: Fixed pixel value -->
<e-circularchart3d-series :dataSource="data" xName="x" yName="y" radius="200px"></e-circularchart3d-series>
```

### Full-Screen Pie Chart

```vue
<template>
  <div id="app">
    <ejs-circularchart3d id="container" :tilt="-45">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          :dataSource="data" 
          xName="x" 
          yName="y"
          radius="100%">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  </div>
</template>

<style>
#container {
  width: 100%;
  height: 100vh; /* Full viewport height */
}
</style>
```

## Various Radius Pie

### Data-Driven Radii

Create a pie chart where each slice has a different radius based on a data field. This is useful for emphasizing certain segments.

```vue
<template>
  <div id="app">
    <ejs-circularchart3d id="container" :tilt="-15" title="Countries by Population Density & Area">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          :dataSource="countryData" 
          xName="x" 
          yName="y"
          radius="r"
          innerRadius="20%"
          :dataLabel="{ visible: true, position: 'Outside', name: 'x' }">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  </div>
</template>

<script>
import { CircularChart3DComponent, CircularChart3DSeriesCollectionDirective, CircularChart3DSeriesDirective, PieSeries3D, CircularChartDataLabel3D } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-circularchart3d': CircularChart3DComponent,
    'e-circularchart3d-series-collection': CircularChart3DSeriesCollectionDirective,
    'e-circularchart3d-series': CircularChart3DSeriesDirective
  },
  data() {
    return {
      countryData: [
        { x: 'Belgium', y: 551500, r: '110.7' },
        { x: 'Cuba', y: 312685, r: '124.6' },
        { x: 'Dominican Republic', y: 350000, r: '137.5' },
        { x: 'Egypt', y: 301000, r: '150.8' },
        { x: 'Kazakhstan', y: 300000, r: '155.5' },
        { x: 'Somalia', y: 357022, r: '160.6' },
        { x: 'Argentina', y: 505370, r: '100' }
      ]
    };
  },
  provide: {
    circularchart3d: [PieSeries3D, CircularChartDataLabel3D]
  }
};
</script>

<style>
#container { height: 400px; }
</style>
```

**How it works:**
- `radius="r"` tells the chart to read the radius from the `r` field in each data point
- The `r` value is a percentage or pixel value (e.g., '110.7' for 110.7 pixels, or '100%' for percentage)
- Each slice can have a unique radius for emphasis or to represent multiple dimensions

**Use cases:**
- Bubble charts with circles instead of dots
- Emphasizing high-value segments with larger radius
- Multi-dimensional data visualization (y = one metric, r = another metric)

## Color Mapping

### Point Color Mapping

Map colors from your data to chart segments using `pointColorMapping`:

```vue
<template>
  <div id="app">
    <ejs-circularchart3d id="container" :tilt="-45">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          :dataSource="data" 
          xName="x" 
          yName="y"
          pointColorMapping="fill"
          :dataLabel="{ visible: true, name: 'x' }">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  </div>
</template>

<script>
import { CircularChart3DComponent, CircularChart3DSeriesCollectionDirective, CircularChart3DSeriesDirective, PieSeries3D, CircularChartDataLabel3D } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-circularchart3d': CircularChart3DComponent,
    'e-circularchart3d-series-collection': CircularChart3DSeriesCollectionDirective,
    'e-circularchart3d-series': CircularChart3DSeriesDirective
  },
  data() {
    return {
      data: [
        { x: 'Jan', y: 35, fill: '#498fff' },   // Blue
        { x: 'Feb', y: 28, fill: '#ffa060' },   // Orange
        { x: 'Mar', y: 34, fill: '#ff68b6' },   // Pink
        { x: 'Apr', y: 32, fill: '#81e2a1' },   // Green
        { x: 'May', y: 40, fill: '#ffd700' }    // Gold
      ]
    };
  },
  provide: {
    circularchart3d: [PieSeries3D, CircularChartDataLabel3D]
  }
};
</script>

<style>
#container { height: 350px; }
</style>
```

### Default Color Palette

If colors aren't specified, the chart uses a built-in palette:

```javascript
// Default palette (if no pointColorMapping or fill)
['#498fff', '#ffa060', '#ff68b6', '#81e2a1', '#ffc371', ...]
```

To apply custom colors to all segments uniformly, use CSS or the `pointRender` event (see Advanced Features).

## Text Mapping

### Map Text Fields to Data Labels

Use the `name` property in `dataLabel` to map custom text fields:

```vue
<template>
  <div id="app">
    <ejs-circularchart3d id="container" :tilt="-45" title="Product Sales">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          :dataSource="data" 
          xName="x" 
          yName="y"
          :dataLabel="{ visible: true, name: 'text' }">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  </div>
</template>

<script>
import { CircularChart3DComponent, CircularChart3DSeriesCollectionDirective, CircularChart3DSeriesDirective, PieSeries3D, CircularChartDataLabel3D } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-circularchart3d': CircularChart3DComponent,
    'e-circularchart3d-series-collection': CircularChart3DSeriesCollectionDirective,
    'e-circularchart3d-series': CircularChart3DSeriesDirective
  },
  data() {
    return {
      data: [
        { x: 'Jan', y: 35, text: 'January: $35K', fill: '#498fff' },
        { x: 'Feb', y: 28, text: 'February: $28K', fill: '#ffa060' },
        { x: 'Mar', y: 34, text: 'March: $34K', fill: '#ff68b6' },
        { x: 'Apr', y: 32, text: 'April: $32K', fill: '#81e2a1' }
      ]
    };
  },
  provide: {
    circularchart3d: [PieSeries3D, CircularChartDataLabel3D]
  }
};
</script>

<style>
#container { height: 350px; }
</style>
```

**Result:** Labels show "January: $35K", "February: $28K", etc.

### Combining Color and Text Mapping

```vue
<!-- Multiple mappings in one series -->
<e-circularchart3d-series 
  :dataSource="data" 
  xName="x" 
  yName="y"
  pointColorMapping="fill"
  :dataLabel="{ visible: true, name: 'customLabel' }">
</e-circularchart3d-series>
```

### Dynamic Text with Computed Properties

```javascript
// Vue 2
computed: {
  dataWithLabels() {
    return this.data.map(d => ({
      ...d,
      text: `${d.x}: ${(d.y / 1000).toFixed(1)}K units`
    }));
  }
}

// Then use in template
:dataSource="dataWithLabels"
```

## Summary

| Feature | Property | Example |
|---------|----------|---------|
| **Chart type** | Series type | Pie (default) or Donut |
| **3D effect** | `tilt` | `:tilt="-45"` |
| **Donut hole** | `innerRadius` | `innerRadius="40%"` |
| **Pie size** | `radius` | `radius="100%"` |
| **Dynamic sizes** | `radius="fieldName"` | `radius="r"` (reads from data) |
| **Slice colors** | `pointColorMapping` | `pointColorMapping="fill"` |
| **Label text** | `dataLabel.name` | `:dataLabel="{ name: 'text' }"` |
