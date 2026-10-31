# Appearance and Customization

## Table of Contents
- [Theming](#theming)
- [Legend Styling](#legend-styling)
- [Chart Dimensions](#chart-dimensions)
- [Label Formatting](#label-formatting)
- [Tooltip Styling](#tooltip-styling)

---

## Theming

### Theme Switching

Dynamically change themes:

```vue
<template>
  <div>
    <button @click="theme = 'Material'">Material</button>
    <button @click="theme = 'Bootstrap'">Bootstrap</button>
    <button @click="theme = 'Fabric'">Fabric</button>
    
    <ejs-chart3d :theme="theme">
      <!-- series -->
    </ejs-chart3d>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: 'Material'
    };
  }
};
</script>
```

---

## Legend Styling

### Basic Legend Configuration

```vue
<template>
  <ejs-chart3d 
    id="chart"
    :legend="legend">
    <e-chart3d-series-collection>
      <e-chart3d-series :dataSource="data" type="Column" xName="month" yName="sales" name="Sales"></e-chart3d-series>
      <e-chart3d-series :dataSource="data" type="Column" xName="month" yName="revenue" name="Revenue"></e-chart3d-series>
    </e-chart3d-series-collection>
  </ejs-chart3d>
</template>

<script>
export default {
  data() {
    return {
      legend: {
        visible: true,
        position: 'Bottom',  // Top, Bottom, Right, Left
        width: '200px',
        height: '100px'
      }
    };
  }
};
</script>
```

### Legend Positions

```vue
<script>
export default {
  data() {
    return {
      legend: {
        position: 'Right'    // Options: Top, Bottom, Right, Left, Custom
      }
    };
  }
};
</script>
```

### Legend Styling

```vue
<script>
export default {
  data() {
    return {
      legend: {
        visible: true,
        position: 'Bottom',
        background: '#f5f5f5',
        border: {
          color: '#cccccc',
          width: 1
        },
        textStyle: {
          color: '#333333',
          fontFamily: 'Arial',
          fontSize: '14px'
        },
        itemPadding: 15,
        padding: 10
      }
    };
  }
};
</script>
```

### Hide/Show Legend

```vue
<template>
  <button @click="showLegend = !showLegend">Toggle Legend</button>
  
  <ejs-chart3d :legend="{ visible: showLegend }">
    <!-- series -->
  </ejs-chart3d>
</template>

<script>
export default {
  data() {
    return {
      showLegend: true
    };
  }
};
</script>
```

---

## Chart Dimensions

### Set Fixed Dimensions

```vue
<template>
  <ejs-chart3d 
    id="chart"
    width="800px"
    height="500px">
    <e-chart3d-series-collection>
      <e-chart3d-series :dataSource="data" type="Column" xName="month" yName="sales"></e-chart3d-series>
    </e-chart3d-series-collection>
  </ejs-chart3d>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { month: 'Jan', sales: 35 },
        { month: 'Feb', sales: 28 }
      ]
    };
  }
};
</script>

<style scoped>
#chart {
  width: 800px;
  height: 500px;
}
</style>
```

### Responsive Dimensions

```vue
<style scoped>
#chart {
  width: 100%;
  height: 400px;
}

@media (max-width: 768px) {
  #chart {
    height: 300px;
  }
}
</style>
```

### Dynamic Sizing

```vue
<template>
  <input v-model.number="chartWidth" type="number" placeholder="Width">
  <input v-model.number="chartHeight" type="number" placeholder="Height">
  
  <ejs-chart3d 
    id="chart"
    :width="chartWidth + 'px'"
    :height="chartHeight + 'px'">
    <!-- series -->
  </ejs-chart3d>
</template>

<script>
export default {
  data() {
    return {
      chartWidth: 800,
      chartHeight: 500
    };
  }
};
</script>
```

---

## Label Formatting

### Data Labels

Display values directly on chart bars:

```vue
<template>
  <ejs-chart3d id="chart">
    <e-chart3d-series-collection>
      <e-chart3d-series 
        :dataSource="data" 
        type="Column" 
        xName="month" 
        yName="sales"
        :dataLabel="dataLabel">
      </e-chart3d-series>
    </e-chart3d-series-collection>
  </ejs-chart3d>
</template>

<script>
export default {
  data() {
    return {
      dataLabel: {
        visible: true,
        position: 'Top',  // Top, Center, Bottom, Outside
        format: '${point.y}K',
        font: {
          size: '12px',
          color: '#333'
        }
      }
    };
  }
};
</script>
```

### Axis Label Formatting

```vue
<script>
export default {
  data() {
    return {
      primaryYAxis: {
        labelFormat: '${value}K',  // $10K, $20K
        labelStyle: {
          size: '12px',
          color: '#666666'
        }
      }
    };
  }
};
</script>
```

### Custom Label Template

```vue
<script>
export default {
  data() {
    return {
      dataLabel: {
        visible: true,
        template: '<div>${point.y}%</div>'
      }
    };
  }
};
</script>
```

---

## Tooltip Styling

### Basic Tooltip

```vue
<template>
  <ejs-chart3d id="chart" :tooltip="tooltip">
    <e-chart3d-series-collection>
      <e-chart3d-series 
        :dataSource="data" 
        type="Column" 
        xName="month" 
        yName="sales"
        name="Sales">
      </e-chart3d-series>
    </e-chart3d-series-collection>
  </ejs-chart3d>
</template>

<script>
export default {
  data() {
    return {
      tooltip: {
        enable: true,
        format: '<b>${point.x}</b><br>Sales: $${point.y}K'
      }
    };
  }
};
</script>
```

### Tooltip Customization

```vue
<script>
export default {
  data() {
    return {
      tooltip: {
        enable: true,
        format: '${point.x}: ${point.y}%',
        shared: false,
        backgroundColor: '#000000',
        textStyle: {
          color: '#ffffff',
          fontSize: '14px'
        },
        border: {
          color: '#cccccc',
          width: 1
        }
      }
    };
  }
};
</script>
```

### Tooltip Position

```vue
<script>
export default {
  data() {
    return {
      tooltip: {
        enable: true,
        duration: 2000,  // Show for 2 seconds
        enableAnimation: true
      }
    };
  }
};
</script>
```

---

## Color Customization

### Series Colors

```vue
<template>
  <ejs-chart3d id="chart">
    <e-chart3d-series-collection>
      <e-chart3d-series 
        :dataSource="data" 
        type="Column" 
        xName="month" 
        yName="sales"
        interior="#FF6B6B"
        name="Sales">
      </e-chart3d-series>
      <e-chart3d-series 
        :dataSource="data" 
        type="Column" 
        xName="month" 
        yName="revenue"
        interior="#4ECDC4"
        name="Revenue">
      </e-chart3d-series>
    </e-chart3d-series-collection>
  </ejs-chart3d>
</template>
```

### Palette Colors

```vue
<script>
export default {
  data() {
    return {
      palette: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']
    };
  }
};
</script>
```

---

## Complete Example: Customized Chart

```vue
<template>
  <ejs-chart3d 
    id="chart"
    width="100%"
    height="500px"
    :theme="theme"
    :legend="legend"
    :tooltip="tooltip"
    :primaryXAxis="xAxis"
    :primaryYAxis="yAxis">
    <e-chart3d-series-collection>
      <e-chart3d-series 
        :dataSource="data" 
        type="Column" 
        xName="month" 
        yName="sales"
        interior="#4472C4"
        name="2024 Sales"
        :dataLabel="dataLabel">
      </e-chart3d-series>
    </e-chart3d-series-collection>
  </ejs-chart3d>
</template>

<script>
export default {
  data() {
    return {
      theme: 'Material',
      xAxis: {
        valueType: 'Category',
        title: 'Months',
        labelStyle: { angle: 45 }
      },
      yAxis: {
        title: 'Sales (USD)',
        labelFormat: '${value}K'
      },
      legend: {
        visible: true,
        position: 'Bottom'
      },
      tooltip: {
        enable: true,
        format: '<b>${point.x}</b><br>Sales: $${point.y}K'
      },
      dataLabel: {
        visible: true,
        position: 'Top',
        format: '${point.y}K'
      },
      data: [
        { month: 'Jan', sales: 35 },
        { month: 'Feb', sales: 28 },
        { month: 'Mar', sales: 34 },
        { month: 'Apr', sales: 32 },
        { month: 'May', sales: 40 }
      ]
    };
  }
};
</script>
```
