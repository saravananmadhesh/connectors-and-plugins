# Chart Types

## Table of Contents
- [Column 3D](#column-3d)
- [Bar 3D](#bar-3d)
- [Stacking Column 3D](#stacking-column-3d)
- [Stacking Bar 3D](#stacking-bar-3d)
- [Choosing the Right Type](#choosing-the-right-type)

---

## Column 3D

Column 3D charts display vertical bars arranged along the x-axis, ideal for comparing values across categories.

### Basic Column 3D Implementation

```vue
<template>
  <ejs-chart3d id="chart">
    <e-chart3d-series-collection>
      <e-chart3d-series 
        :dataSource="data" 
        type="Column" 
        xName="country" 
        yName="gold"
        name="Gold Medals">
      </e-chart3d-series>
    </e-chart3d-series-collection>
  </ejs-chart3d>
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
        { country: 'USA', gold: 46 },
        { country: 'China', gold: 51 },
        { country: 'Japan', gold: 17 },
        { country: 'Germany', gold: 17 },
        { country: 'France', gold: 10 }
      ]
    };
  },
  provide: {
    chart3d: [ColumnSeries3D, Category3D]
  }
};
</script>
```

### Multiple Column Series

Compare multiple metrics side-by-side:

```vue
<e-chart3d-series-collection>
  <e-chart3d-series :dataSource="data" type="Column" xName="country" yName="gold" name="Gold"></e-chart3d-series>
  <e-chart3d-series :dataSource="data" type="Column" xName="country" yName="silver" name="Silver"></e-chart3d-series>
  <e-chart3d-series :dataSource="data" type="Column" xName="country" yName="bronze" name="Bronze"></e-chart3d-series>
</e-chart3d-series-collection>
```

**Use Case:** Displaying multiple medal types across countries, showing performance comparison.

---

## Bar 3D

Bar 3D charts display horizontal bars, useful for long category names and horizontal space optimization.

### Basic Bar 3D Implementation

```vue
<template>
  <ejs-chart3d id="chart">
    <e-chart3d-series-collection>
      <e-chart3d-series 
        :dataSource="data" 
        type="Bar" 
        xName="region" 
        yName="sales"
        name="Sales Revenue">
      </e-chart3d-series>
    </e-chart3d-series-collection>
  </ejs-chart3d>
</template>

<script>
import { 
  BarSeries3D,
  Category3D
} from '@syncfusion/ej2-vue-charts';

export default {
  data() {
    return {
      data: [
        { region: 'North America', sales: 2500 },
        { region: 'Europe', sales: 1800 },
        { region: 'Asia Pacific', sales: 2200 },
        { region: 'Latin America', sales: 1200 },
        { region: 'Middle East & Africa', sales: 900 }
      ]
    };
  },
  provide: {
    chart3d: [BarSeries3D, Category3D]
  }
};
</script>
```

**Advantage:** Better for displaying long category names like "North America" and "Latin America".

---

## Stacking Column 3D

Stacking Column 3D charts display multiple series stacked vertically, showing cumulative totals and individual contributions.

### Basic Stacking Column 3D

```vue
<template>
  <ejs-chart3d id="chart">
    <e-chart3d-series-collection>
      <e-chart3d-series 
        :dataSource="data" 
        type="StackingColumn3D" 
        xName="quarter" 
        yName="product1"
        name="Product A">
      </e-chart3d-series>
      <e-chart3d-series 
        :dataSource="data" 
        type="StackingColumn3D" 
        xName="quarter" 
        yName="product2"
        name="Product B">
      </e-chart3d-series>
      <e-chart3d-series 
        :dataSource="data" 
        type="StackingColumn3D" 
        xName="quarter" 
        yName="product3"
        name="Product C">
      </e-chart3d-series>
    </e-chart3d-series-collection>
  </ejs-chart3d>
</template>

<script>
import { 
  StackingColumnSeries3D,
  Category3D
} from '@syncfusion/ej2-vue-charts';

export default {
  data() {
    return {
      data: [
        { quarter: 'Q1', product1: 100, product2: 150, product3: 120 },
        { quarter: 'Q2', product1: 120, product2: 165, product3: 135 },
        { quarter: 'Q3', product1: 150, product2: 180, product3: 160 },
        { quarter: 'Q4', product1: 180, product2: 200, product3: 190 }
      ]
    };
  },
  provide: {
    chart3d: [StackingColumnSeries3D, Category3D]
  }
};
</script>
```

### Key Properties

```vue
<e-chart3d-series 
  type="StackingColumn3D"
  :marker="{ visible: true, width: 10, height: 10 }"
  :dataLabel="{ visible: true, format: '${point.y}' }">
</e-chart3d-series>
```

**Use Case:** Showing product revenue breakdown where you want to see both individual product performance and total revenue.

---

## Stacking Bar 3D

Stacking Bar 3D charts display series stacked horizontally, combining the benefits of bar charts with cumulative visualization.

### Basic Stacking Bar 3D

```vue
<template>
  <ejs-chart3d id="chart">
    <e-chart3d-series-collection>
      <e-chart3d-series 
        :dataSource="data" 
        type="StackingBar3D" 
        xName="department" 
        yName="male"
        name="Male">
      </e-chart3d-series>
      <e-chart3d-series 
        :dataSource="data" 
        type="StackingBar3D" 
        xName="department" 
        yName="female"
        name="Female">
      </e-chart3d-series>
    </e-chart3d-series-collection>
  </ejs-chart3d>
</template>

<script>
import { 
  StackingBarSeries3D,
  Category3D
} from '@syncfusion/ej2-vue-charts';

export default {
  data() {
    return {
      data: [
        { department: 'Engineering', male: 180, female: 90 },
        { department: 'Sales', male: 120, female: 110 },
        { department: 'Marketing', male: 70, female: 85 },
        { department: 'HR', male: 45, female: 55 },
        { department: 'Finance', male: 95, female: 105 }
      ]
    };
  },
  provide: {
    chart3d: [StackingBarSeries3D, Category3D]
  }
};
</script>
```

**Advantage:** Ideal for gender distribution, cost breakdown by category, or any stacked horizontal comparison.

---

## Choosing the Right Type

| Chart Type | Best For | Example |
|-----------|----------|---------|
| **Column 3D** | Vertical comparison across categories | Sales by month, student grades by class |
| **Bar 3D** | Horizontal comparison with long labels | Regional revenue, department performance |
| **Stacking Column 3D** | Cumulative totals with vertical emphasis | Product revenue breakdown, budget allocation |
| **Stacking Bar 3D** | Cumulative totals with horizontal labels | Employee distribution, expense categories |

### Decision Tree

1. **Are categories with long names?** → Use **Bar** or **Stacking Bar**
2. **Need to show parts of a whole?** → Use **Stacking Column** or **Stacking Bar**
3. **Simple comparison preferred?** → Use **Column** or **Bar**
4. **Want maximum visual impact?** → All types work equally in 3D

---

## Switching Between Types

Change chart type dynamically:

```vue
<template>
  <div>
    <button @click="chartType = 'Column'">Column</button>
    <button @click="chartType = 'Bar'">Bar</button>
    <button @click="chartType = 'StackingColumn3D'">Stacked Column</button>
    
    <ejs-chart3d id="chart">
      <e-chart3d-series-collection>
        <e-chart3d-series 
          :dataSource="data" 
          :type="chartType"
          xName="category" 
          yName="value">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartType: 'Column',
      data: [/* your data */]
    };
  }
};
</script>
```

This allows users to toggle between chart types for different perspectives on the same data.
