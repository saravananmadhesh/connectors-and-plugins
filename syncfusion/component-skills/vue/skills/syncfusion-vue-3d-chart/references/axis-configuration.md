# Axis Configuration

## Table of Contents
- [Axis Titles](#axis-titles)
- [Category Axis](#category-axis)
- [Numeric Axis](#numeric-axis)
- [Date-Time Axis](#date-time-axis)
- [Logarithmic Axis](#logarithmic-axis)
- [Multiple Panes](#multiple-panes)

---

## Axis Titles

### Adding Axis Titles

Add descriptive titles to both X and Y axes:

```vue
<template>
  <ejs-chart3d 
    id="chart"
    :primaryXAxis="xAxis"
    :primaryYAxis="yAxis">
    <e-chart3d-series-collection>
      <e-chart3d-series :dataSource="data" type="Column" xName="month" yName="sales"></e-chart3d-series>
    </e-chart3d-series-collection>
  </ejs-chart3d>
</template>

<script>
export default {
  data() {
    return {
      xAxis: {
        valueType: 'Category',
        title: 'Months'
      },
      yAxis: {
        title: 'Sales (in USD)',
        labelFormat: '${value}K'
      },
      data: [
        { month: 'Jan', sales: 35 },
        { month: 'Feb', sales: 28 },
        { month: 'Mar', sales: 34 }
      ]
    };
  }
};
</script>
```

### Customizing Title Style

```vue
<script>
export default {
  data() {
    return {
      yAxis: {
        title: 'Sales Revenue',
        titleStyle: {
          size: '14px',
          fontFamily: 'Arial',
          fontStyle: 'italic',
          fontWeight: 'bold',
          color: '#0066cc'
        }
      }
    };
  }
};
</script>
```

---

## Category Axis

Category axis displays text labels for discrete categories (months, regions, products).

### Basic Category Axis

```vue
<template>
  <ejs-chart3d id="chart" :primaryXAxis="xAxis">
    <e-chart3d-series-collection>
      <e-chart3d-series 
        :dataSource="data" 
        type="Column" 
        xName="region" 
        yName="revenue">
      </e-chart3d-series>
    </e-chart3d-series-collection>
  </ejs-chart3d>
</template>

<script>
import { Category3D } from '@syncfusion/ej2-vue-charts';

export default {
  data() {
    return {
      xAxis: {
        valueType: 'Category',
        title: 'Sales Regions',
        labelFormat: '{value}'
      },
      data: [
        { region: 'North', revenue: 2500 },
        { region: 'South', revenue: 1800 },
        { region: 'East', revenue: 2200 },
        { region: 'West', revenue: 1900 }
      ]
    };
  },
  provide: {
    chart3d: [Category3D]
  }
};
</script>
```

### Label Customization

```vue
<script>
export default {
  data() {
    return {
      xAxis: {
        valueType: 'Category',
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        labelStyle: {
          angle: 45,
          size: '12px',
          color: '#333'
        }
      }
    };
  }
};
</script>
```

---

## Numeric Axis

Numeric axis displays numeric values for continuous data ranges.

### Basic Numeric Axis

```vue
<template>
  <ejs-chart3d id="chart" :primaryXAxis="xAxis" :primaryYAxis="yAxis">
    <e-chart3d-series-collection>
      <e-chart3d-series 
        :dataSource="data" 
        type="Column" 
        xName="temperature" 
        yName="humidity">
      </e-chart3d-series>
    </e-chart3d-series-collection>
  </ejs-chart3d>
</template>

<script>
export default {
  data() {
    return {
      xAxis: {
        valueType: 'Double',
        title: 'Temperature (°C)',
        minimum: 0,
        maximum: 50,
        interval: 10
      },
      yAxis: {
        title: 'Humidity (%)',
        minimum: 0,
        maximum: 100,
        interval: 20
      },
      data: [
        { temperature: 5, humidity: 55 },
        { temperature: 15, humidity: 65 },
        { temperature: 25, humidity: 45 },
        { temperature: 35, humidity: 35 },
        { temperature: 45, humidity: 50 }
      ]
    };
  }
};
</script>
```

### Formatting Numeric Labels

```vue
<script>
export default {
  data() {
    return {
      yAxis: {
        valueType: 'Double',
        labelFormat: '${value}K',  // Prefix: $
        minimum: 0,
        maximum: 100
      }
    };
  }
};
</script>
```

---

## Date-Time Axis

Date-time axis displays date/time values on a continuous scale, perfect for time-series data.

### Basic Date-Time Axis

```vue
<template>
  <ejs-chart3d id="chart" :primaryXAxis="xAxis">
    <e-chart3d-series-collection>
      <e-chart3d-series 
        :dataSource="data" 
        type="Column" 
        xName="date" 
        yName="sales">
      </e-chart3d-series>
    </e-chart3d-series-collection>
  </ejs-chart3d>
</template>

<script>
import { DateTime3D } from '@syncfusion/ej2-vue-charts';

export default {
  data() {
    return {
      xAxis: {
        valueType: 'DateTime',
        title: 'Date',
        labelFormat: 'MMM dd, yyyy',
        intervalType: 'Months',
        interval: 1
      },
      data: [
        { date: new Date(2024, 0, 1), sales: 3000 },
        { date: new Date(2024, 1, 1), sales: 3500 },
        { date: new Date(2024, 2, 1), sales: 4200 },
        { date: new Date(2024, 3, 1), sales: 3800 }
      ]
    };
  },
  provide: {
    chart3d: [DateTime3D]
  }
};
</script>
```

### Date Format Options

```vue
<script>
export default {
  data() {
    return {
      xAxis: {
        valueType: 'DateTime',
        labelFormat: 'dd/MM/yyyy',  // 25/03/2024
        // or 'MMM dd, yyyy'         // Mar 25, 2024
        // or 'dd-MMM-yy'            // 25-Mar-24
        intervalType: 'Months',
        interval: 1
      }
    };
  }
};
</script>
```

---

## Logarithmic Axis

Logarithmic axis displays data on a logarithmic scale, useful for exponential or wide-range data.

### Basic Logarithmic Axis

```vue
<template>
  <ejs-chart3d id="chart" :primaryYAxis="yAxis">
    <e-chart3d-series-collection>
      <e-chart3d-series 
        :dataSource="data" 
        type="Column" 
        xName="label" 
        yName="value">
      </e-chart3d-series>
    </e-chart3d-series-collection>
  </ejs-chart3d>
</template>

<script>
import { Logarithmic3D } from '@syncfusion/ej2-vue-charts';

export default {
  data() {
    return {
      yAxis: {
        valueType: 'Logarithmic',
        title: 'Value (Log Scale)',
        labelFormat: '{value}'
      },
      data: [
        { label: 'A', value: 10 },
        { label: 'B', value: 100 },
        { label: 'C', value: 1000 },
        { label: 'D', value: 10000 },
        { label: 'E', value: 100000 }
      ]
    };
  },
  provide: {
    chart3d: [Logarithmic3D]
  }
};
</script>
```

**Use Case:** Displaying website traffic, population growth, or financial data spanning multiple orders of magnitude.

### Logarithmic Base

```vue
<script>
export default {
  data() {
    return {
      yAxis: {
        valueType: 'Logarithmic',
        logBase: 10,  // Default: 10
        title: 'Value (Log Base 10)'
      }
    };
  }
};
</script>
```

---

## Multiple Panes

Display multiple Y-axes with separate series data ranges:

### Two Panes Setup

```vue
<template>
  <ejs-chart3d id="chart" :primaryXAxis="xAxis" :primaryYAxis="primaryYAxis" :axes="axes">
    <e-chart3d-series-collection>
      <e-chart3d-series 
        :dataSource="data" 
        type="Column" 
        xName="month" 
        yName="temperature"
        yAxisName="yAxis1"
        name="Temperature">
      </e-chart3d-series>
      <e-chart3d-series 
        :dataSource="data" 
        type="Column" 
        xName="month" 
        yName="rainfall"
        yAxisName="yAxis2"
        name="Rainfall">
      </e-chart3d-series>
    </e-chart3d-series-collection>
  </ejs-chart3d>
</template>

<script>
export default {
  data() {
    return {
      xAxis: {
        valueType: 'Category',
        title: 'Months'
      },
      primaryYAxis: {
        title: 'Temperature (°C)',
        minimum: -20,
        maximum: 40
      },
      axes: [
        {
          name: 'yAxis2',
          title: 'Rainfall (mm)',
          minimum: 0,
          maximum: 400,
          opposedPosition: true
        }
      ],
      data: [
        { month: 'Jan', temperature: 5, rainfall: 50 },
        { month: 'Feb', temperature: 8, rainfall: 45 },
        { month: 'Mar', temperature: 15, rainfall: 60 },
        { month: 'Apr', temperature: 22, rainfall: 80 },
        { month: 'May', temperature: 28, rainfall: 120 }
      ]
    };
  }
};
</script>
```

**Use Case:** Comparing two metrics with different scales and units (temperature vs rainfall, revenue vs expenses).

---

## Axis Label Formatting

### Number Formatting

```vue
<script>
export default {
  data() {
    return {
      yAxis: {
        labelFormat: '{value}K',      // 10K, 20K
        // or '{value:n2}'             // 10.00, 20.00
        // or '${value}'               // $10, $20
        // or '{value}%'               // 10%, 20%
      }
    };
  }
};
</script>
```

### Interval Customization

```vue
<script>
export default {
  data() {
    return {
      xAxis: {
        interval: 5,           // Show every 5th label
        labelPosition: 'Outside',
        minorTicksPerInterval: 2
      }
    };
  }
};
</script>
```
