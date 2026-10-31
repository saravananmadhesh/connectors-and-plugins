# Getting Started with 3D Chart

## Installation and Setup

### Prerequisites

Ensure you have a Vue 2 project with the following system requirements:
- Node.js v12.0 or higher
- npm v5.6 or higher
- Vue 2.x

### Install Syncfusion 3D Chart Package

Install the `@syncfusion/ej2-vue-charts` package:

```bash
npm install @syncfusion/ej2-vue-charts
```

or using yarn:

```bash
yarn add @syncfusion/ej2-vue-charts
```

**Dependencies included:**
- `@syncfusion/ej2-base` - Base utilities
- `@syncfusion/ej2-charts` - Core chart functionality
- `@syncfusion/ej2-vue-base` - Vue integration
- `@syncfusion/ej2-svg-base` - SVG rendering

### Import Required Modules

In your Vue component, import the necessary classes:

```vue
<script>
import { 
  Chart3DComponent, 
  Chart3DSeriesCollectionDirective, 
  Chart3DSeriesDirective,
  ColumnSeries3D,
  Category3D
} from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-chart3d': Chart3DComponent,
    'e-chart3d-series-collection': Chart3DSeriesCollectionDirective,
    'e-chart3d-series': Chart3DSeriesDirective
  },
  provide: {
    chart3d: [ColumnSeries3D, Category3D]
  }
};
</script>
```

---

## Basic 3D Chart Implementation

### Minimal Example: Column Chart

```vue
<template>
  <div>
    <ejs-chart3d id="chart-container">
      <e-chart3d-series-collection>
        <e-chart3d-series 
          :dataSource="data" 
          type="Column" 
          xName="month" 
          yName="sales"
          name="Monthly Sales">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  </div>
</template>

<script>
import { 
  Chart3DComponent, 
  Chart3DSeriesCollectionDirective, 
  Chart3DSeriesDirective,
  ColumnSeries3D,
  Category3D
} from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-chart3d': Chart3DComponent,
    'e-chart3d-series-collection': Chart3DSeriesCollectionDirective,
    'e-chart3d-series': Chart3DSeriesDirective
  },
  data() {
    return {
      data: [
        { month: 'January', sales: 35 },
        { month: 'February', sales: 28 },
        { month: 'March', sales: 34 },
        { month: 'April', sales: 32 },
        { month: 'May', sales: 40 },
        { month: 'June', sales: 38 }
      ]
    };
  },
  provide: {
    chart3d: [ColumnSeries3D, Category3D]
  }
};
</script>

<style scoped>
#chart-container {
  width: 100%;
  height: 400px;
}
</style>
```

---

## Data Binding

### Array Data Source

Bind data by passing an array to the `dataSource` prop:

```vue
<e-chart3d-series 
  :dataSource="[
    { category: 'Q1', value: 50 },
    { category: 'Q2', value: 65 },
    { category: 'Q3', value: 72 },
    { category: 'Q4', value: 85 }
  ]"
  type="Column"
  xName="category"
  yName="value">
</e-chart3d-series>
```

### Dynamic Data Updates

Update chart data reactively:

```vue
<script>
export default {
  data() {
    return {
      chartData: [
        { month: 'Jan', value: 35 },
        { month: 'Feb', value: 28 }
      ]
    };
  },
  methods: {
    updateData() {
      this.chartData.push({ month: 'Mar', value: 45 });
      // Chart updates automatically
    }
  }
};
</script>
```

---

## CSS Imports and Theming

### Supported Themes
- **material** - Material Design theme (default)
- **bootstrap** - Bootstrap theme
- **fabric** - Fabric theme
- **highcontrast** - High contrast theme
- **tailwind** - Tailwind CSS theme

---

## Multiple Series Example

Render multiple data series in a single 3D chart:

```vue
<template>
  <ejs-chart3d id="chart">
    <e-chart3d-series-collection>
      <e-chart3d-series 
        :dataSource="data" 
        type="Column" 
        xName="month" 
        yName="sales"
        name="Sales">
      </e-chart3d-series>
      <e-chart3d-series 
        :dataSource="data" 
        type="Column" 
        xName="month" 
        yName="revenue"
        name="Revenue">
      </e-chart3d-series>
    </e-chart3d-series-collection>
  </ejs-chart3d>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { month: 'Jan', sales: 20, revenue: 50 },
        { month: 'Feb', sales: 25, revenue: 60 },
        { month: 'Mar', sales: 30, revenue: 75 }
      ]
    };
  }
};
</script>
```

---

## Common Setup Issues

### Issue: Chart Not Rendering
**Solution:** Ensure the container div has explicit width and height:
```vue
<style>
#chart-container {
  width: 100%;
  height: 400px;
}
</style>
```

### Issue: Data Not Displaying
**Solution:** Verify `xName` and `yName` properties match your data object keys exactly.

### Issue: Theme Not Applied
**Solution:** Import theme CSS before component initialization in your main Vue file.

### Issue: Series Not Appearing
**Solution:** Ensure series types are provided to the chart via the `provide` option.
