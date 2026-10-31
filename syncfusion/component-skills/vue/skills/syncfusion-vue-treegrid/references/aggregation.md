# Aggregation

## Table of Contents
- [Overview](#overview)
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Built-in Aggregate Types](#built-in-aggregate-types)
- [Footer Aggregate](#footer-aggregate)
- [Child Aggregate](#child-aggregate)
- [Format Aggregate Value](#format-aggregate-value)
- [Custom Footer Template](#custom-footer-template)
- [Multiple Aggregates Per Column](#multiple-aggregates-per-column)
- [Real-World Examples](#real-world-examples)
- [Best Practices](#best-practices)
- [Module Import Checklist](#module-import-checklist)
- [Troubleshooting](#troubleshooting)
- [See Also](#see-also)

## Overview

Aggregate values are displayed in the TreeGrid footer and parent row footer for hierarchical data. The minimum required properties are `field` and `type`. Use the `footerTemplate` property to display aggregate values in footer cells.

## When to Use

Use aggregation when you need to:
- **Summary calculations** - Sum, average, count, min, max values
- **Footer totals** - Display aggregates in grid footer cells
- **Child aggregates** - Show subtotals in parent row footers
- **Financial reports** - Running totals, net calculations
- **KPI dashboards** - Key metrics display
- **Data analysis** - Grid-level statistics
- **Budget tracking** - Accumulated expenses/income

## Mandatory Rules

Before implementing aggregation:
- ✓ **Aggregate Module**: Import and provide Aggregate module
- ✓ **Proper Directives**: Use `e-aggregates`, `e-aggregate`, and `e-column` structure
- ✓ **Numeric Fields**: Must be number type for calculations
- ✓ **Field & Type**: Both properties are required for each aggregate

## Built-in Aggregate Types

TreeGrid supports 7 built-in aggregate types:

| Type | Description | Use Case |
|------|-------------|----------|
| **Sum** | Total of all values | Financial totals, quantities |
| **Average** | Mean of values | Performance averages, scores |
| **Min** | Minimum value | Lowest price, smallest quantity |
| **Max** | Maximum value | Highest price, peak usage |
| **Count** | Number of records | Total items, record count |
| **Truecount** | Count of true values | Boolean flag counting |
| **Falsecount** | Count of false values | Boolean flag counting |

## Footer Aggregate

Display aggregate values in the grid footer:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    childMapping="children" 
    :treeColumnIndex="1" 
    height="260px">
    <e-columns>
      <e-column field="FreightID" headerText="Freight ID" width=90 textAlign="Right"></e-column>
      <e-column field="FreightName" headerText="Freight Name" width=180></e-column>
      <e-column field="UnitWeight" headerText="Unit Weight" :type="'number'" width=90 textAlign="Right"></e-column>
      <e-column field="TotalUnits" headerText="Total Units" :type="'number'" width=80 textAlign="Right"></e-column>
    </e-columns>
    <e-aggregates>
      <e-aggregate :showChildSummary="false">
        <e-columns>
          <e-column type="Max" field="UnitWeight" :footerTemplate="footerMax"></e-column>
          <e-column type="Min" field="TotalUnits" :footerTemplate="footerMin"></e-column>
        </e-columns>
      </e-aggregate>
    </e-aggregates>
  </ejs-treegrid>
</template>

<script setup>
import { createApp, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, Aggregate, ColumnDirective as EColumn, ColumnsDirective as EColumns, AggregatesDirective as EAggregates, AggregateDirective as EAggregate } from '@syncfusion/ej2-vue-treegrid';

const app = createApp({});

const minTemplate = app.component('minTemplate', {
  template: `<span>Min: ${data.Min}</span>`,
  data() { return { data: {} }; }
});

const maxTemplate = app.component('maxTemplate', {
  template: `<span>Max: ${data.Max}</span>`,
  data() { return { data: {} }; }
});

const data = [
  {
    FreightID: 1,
    FreightName: 'Organic Beans',
    UnitWeight: 10,
    TotalUnits: 50,
    children: [
      { FreightID: 1.1, FreightName: 'Green Beans', UnitWeight: 5, TotalUnits: 30 },
      { FreightID: 1.2, FreightName: 'Black Beans', UnitWeight: 15, TotalUnits: 20 }
    ]
  }
];

const footerMin = function () {
  return { template: minTemplate };
};

const footerMax = function () {
  return { template: maxTemplate };
};

provide('treegrid', [Aggregate]);
</script>
```

## Child Aggregate

Display aggregate values in parent row footer for hierarchical data using `showChildSummary`:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    childMapping="children" 
    :treeColumnIndex="1" 
    height="300px">
    <e-columns>
      <e-column field="FreightID" headerText="Freight ID" width=90 textAlign="Right"></e-column>
      <e-column field="FreightName" headerText="Freight Name" width=180></e-column>
      <e-column field="UnitWeight" headerText="Unit Weight" :type="'number'" width=90 textAlign="Right"></e-column>
      <e-column field="TotalUnits" headerText="Total Units" :type="'number'" width=80 textAlign="Right"></e-column>
    </e-columns>
    <e-aggregates>
      <e-aggregate :showChildSummary="true">
        <e-columns>
          <e-column type="Max" field="UnitWeight" :footerTemplate="footerMaxWeight"></e-column>
          <e-column type="Min" field="TotalUnits" :footerTemplate="footerMinUnits"></e-column>
        </e-columns>
      </e-aggregate>
    </e-aggregates>
  </ejs-treegrid>
</template>

<script setup>
import { createApp, provide, ref } from 'vue';
import { Aggregate } from '@syncfusion/ej2-vue-treegrid';

const app = createApp({});

const maxWeightTemplate = app.component('maxWeightTemplate', {
  template: `<span>Max Weight: ${data.Max}</span>`,
  data() { return { data: {} }; }
});

const minUnitsTemplate = app.component('minUnitsTemplate', {
  template: `<span>Min Units: ${data.Min}</span>`,
  data() { return { data: {} }; }
});

const data = ref([
  {
    FreightID: 1,
    FreightName: 'Organic Produce',
    UnitWeight: 10,
    TotalUnits: 60,
    children: [
      { FreightID: 1.1, FreightName: 'Vegetables', UnitWeight: 8, TotalUnits: 40 },
      { FreightID: 1.2, FreightName: 'Fruits', UnitWeight: 12, TotalUnits: 20 }
    ]
  },
  {
    FreightID: 2,
    FreightName: 'Dairy',
    UnitWeight: 5,
    TotalUnits: 30,
    children: [
      { FreightID: 2.1, FreightName: 'Milk', UnitWeight: 5, TotalUnits: 20 },
      { FreightID: 2.2, FreightName: 'Cheese', UnitWeight: 5, TotalUnits: 10 }
    ]
  }
]);

const footerMaxWeight = function () {
  return { template: maxWeightTemplate };
};

const footerMinUnits = function () {
  return { template: minUnitsTemplate };
};

provide('treegrid', [Aggregate]);
</script>
```

## Format Aggregate Value

Use the `format` property to format aggregate values (currency, date, percentage, etc.):

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    childMapping="subtasks" 
    :treeColumnIndex="1" 
    height="300px">
    <e-columns>
      <e-column field="category" headerText="Category" width=160 textAlign="Right"></e-column>
      <e-column field="units" headerText="Total Units" :type="'number'" width=130></e-column>
      <e-column field="unitPrice" headerText="Unit Price($)" :type="'number'" format="C2" width=110 textAlign="Right"></e-column>
      <e-column field="price" headerText="Price($)" :type="'number'" format="C2" width=160 textAlign="Right"></e-column>
    </e-columns>
    <e-aggregates>
      <e-aggregate>
        <e-columns>
          <e-column type="Sum" field="price" format="C2" :footerTemplate="footerSumPrice"></e-column>
        </e-columns>
      </e-aggregate>
    </e-aggregates>
  </ejs-treegrid>
</template>

<script setup>
import { createApp, provide, ref } from 'vue';
import { Aggregate } from '@syncfusion/ej2-vue-treegrid';

const app = createApp({});

const sumPriceTemplate = app.component('sumPriceTemplate', {
  template: `<span>Total Price: ${data.Sum}</span>`,
  data() { return { data: {} }; }
});

const data = ref([
  {
    category: 'Electronics',
    units: 100,
    unitPrice: 50,
    price: 5000,
    subtasks: [
      { category: 'Laptop', units: 50, unitPrice: 80, price: 4000 },
      { category: 'Mouse', units: 50, unitPrice: 20, price: 1000 }
    ]
  }
]);

const footerSumPrice = function () {
  return { template: sumPriceTemplate };
};

provide('treegrid', [Aggregate]);
</script>
```

## Custom Footer Template

Customize aggregate display with rich templates:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    childMapping="children"
    height="300px">
    <e-columns>
      <e-column field="taskID" headerText="ID" width=80></e-column>
      <e-column field="taskName" headerText="Task Name" width=200></e-column>
      <e-column field="duration" headerText="Hours" :type="'number'" width=100 textAlign="Right"></e-column>
      <e-column field="cost" headerText="Cost ($)" :type="'number'" width=100 textAlign="Right"></e-column>
    </e-columns>
    <e-aggregates>
      <e-aggregate>
        <e-columns>
          <e-column type="Sum" field="duration" :footerTemplate="footerDurationTemplate"></e-column>
          <e-column type="Sum" field="cost" :footerTemplate="footerCostTemplate"></e-column>
        </e-columns>
      </e-aggregate>
    </e-aggregates>
  </ejs-treegrid>
</template>

<script setup>
import { createApp, provide, ref } from 'vue';
import { Aggregate } from '@syncfusion/ej2-vue-treegrid';

const app = createApp({});

const durationTemplate = app.component('durationTemplate', {
  template: `<div style="background: #e8f4f8; padding: 8px; font-weight: bold; border-radius: 4px;">
    ⏱️ Total Hours: <span style="color: #0078d4;">${data.Sum}</span>
  </div>`,
  data() { return { data: {} }; }
});

const costTemplate = app.component('costTemplate', {
  template: `<div style="background: #f0f0f0; padding: 8px; font-weight: bold; border-radius: 4px;">
    💰 Total Cost: <span style="color: green;">$${data.Sum}</span>
  </div>`,
  data() { return { data: {} }; }
});

const data = ref([
  {
    taskID: 1,
    taskName: 'Phase 1',
    duration: 60,
    cost: 6000,
    children: [
      { taskID: 1.1, taskName: 'Design', duration: 30, cost: 3000 },
      { taskID: 1.2, taskName: 'Testing', duration: 30, cost: 3000 }
    ]
  }
]);

const footerDurationTemplate = function () {
  return { template: durationTemplate };
};

const footerCostTemplate = function () {
  return { template: costTemplate };
};

provide('treegrid', [Aggregate]);
</script>
```

## Multiple Aggregates Per Column

Apply multiple aggregate types to single column using array format:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    childMapping="children"
    height="300px">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width=100></e-column>
      <e-column field="taskName" headerText="Task Name" width=200></e-column>
      <e-column field="duration" headerText="Duration (hrs)" width=120 :type="'number'" textAlign="Right"></e-column>
    </e-columns>
    <e-aggregates>
      <e-aggregate>
        <e-columns>
          <!-- Multiple aggregates for same field -->
          <e-column :type="['Sum', 'Average', 'Min', 'Max', 'Count']" field="duration" :footerTemplate="footerMultiple"></e-column>
        </e-columns>
      </e-aggregate>
    </e-aggregates>
  </ejs-treegrid>
</template>

<script setup>
import { createApp, provide, ref } from 'vue';
import { Aggregate } from '@syncfusion/ej2-vue-treegrid';

const app = createApp({});

const multipleTemplate = app.component('multipleTemplate', {
  template: `<div style="line-height: 1.8; font-size: 12px;">
    Sum: ${data.Sum} | Avg: ${data.Average} | Min: ${data.Min} | Max: ${data.Max} | Count: ${data.Count}
  </div>`,
  data() { return { data: {} }; }
});

const data = ref([
  {
    taskID: 1,
    taskName: 'Design',
    duration: 40,
    children: [
      { taskID: 1.1, taskName: 'UI', duration: 20 },
      { taskID: 1.2, taskName: 'UX', duration: 20 }
    ]
  },
  {
    taskID: 2,
    taskName: 'Development',
    duration: 100,
    children: [
      { taskID: 2.1, taskName: 'Frontend', duration: 50 },
      { taskID: 2.2, taskName: 'Backend', duration: 50 }
    ]
  }
]);

const footerMultiple = function () {
  return { template: multipleTemplate };
};

provide('treegrid', [Aggregate]);
</script>
```

## Real-World Examples

### Financial Report

```vue
<template>
  <ejs-treegrid 
    :dataSource="financialData" 
    :treeColumnIndex="1"
    childMapping="divisions"
    height="350px">
    <e-columns>
      <e-column field="category" headerText="Category" width=200></e-column>
      <e-column field="revenue" headerText="Revenue ($)" :type="'number'" format="C2" width=120 textAlign="Right"></e-column>
      <e-column field="expenses" headerText="Expenses ($)" :type="'number'" format="C2" width=120 textAlign="Right"></e-column>
      <e-column field="profit" headerText="Profit ($)" :type="'number'" format="C2" width=120 textAlign="Right"></e-column>
    </e-columns>
    <e-aggregates>
      <e-aggregate :showChildSummary="true">
        <e-columns>
          <e-column type="Sum" field="revenue" format="C2" :footerTemplate="footerRevenue"></e-column>
          <e-column type="Sum" field="expenses" format="C2" :footerTemplate="footerExpenses"></e-column>
          <e-column type="Sum" field="profit" format="C2" :footerTemplate="footerProfit"></e-column>
        </e-columns>
      </e-aggregate>
    </e-aggregates>
  </ejs-treegrid>
</template>

<script setup>
import { createApp, provide, ref } from 'vue';
import { Aggregate } from '@syncfusion/ej2-vue-treegrid';

const app = createApp({});

const revenueTemplate = app.component('revenueTemplate', {
  template: `<span>Total: ${data.Sum}</span>`,
  data() { return { data: {} }; }
});

const expensesTemplate = app.component('expensesTemplate', {
  template: `<span>Total: ${data.Sum}</span>`,
  data() { return { data: {} }; }
});

const profitTemplate = app.component('profitTemplate', {
  template: `<span>Total: ${data.Sum}</span>`,
  data() { return { data: {} }; }
});

const financialData = ref([
  {
    category: 'Q1 2024',
    revenue: 150000,
    expenses: 90000,
    profit: 60000,
    divisions: [
      { category: 'Sales', revenue: 100000, expenses: 60000, profit: 40000 },
      { category: 'Operations', revenue: 50000, expenses: 30000, profit: 20000 }
    ]
  },
  {
    category: 'Q2 2024',
    revenue: 200000,
    expenses: 110000,
    profit: 90000,
    divisions: [
      { category: 'Sales', revenue: 140000, expenses: 75000, profit: 65000 },
      { category: 'Operations', revenue: 60000, expenses: 35000, profit: 25000 }
    ]
  }
]);

const footerRevenue = function () {
  return { template: revenueTemplate };
};

const footerExpenses = function () {
  return { template: expensesTemplate };
};

const footerProfit = function () {
  return { template: profitTemplate };
};

provide('treegrid', [Aggregate]);
</script>
```

### Inventory Tracking

```vue
<template>
  <ejs-treegrid 
    :dataSource="inventoryData" 
    :treeColumnIndex="1"
    childMapping="items"
    height="350px">
    <e-columns>
      <e-column field="warehouse" headerText="Warehouse" width=200></e-column>
      <e-column field="itemCount" headerText="Item Count" :type="'number'" width=120 textAlign="Right"></e-column>
      <e-column field="unitCost" headerText="Unit Cost ($)" :type="'number'" format="C2" width=120 textAlign="Right"></e-column>
      <e-column field="totalValue" headerText="Total Value ($)" :type="'number'" format="C2" width=140 textAlign="Right"></e-column>
    </e-columns>
    <e-aggregates>
      <e-aggregate>
        <e-columns>
          <e-column type="Sum" field="itemCount" :footerTemplate="footerCount"></e-column>
          <e-column type="Average" field="unitCost" format="C2" :footerTemplate="footerAvgCost"></e-column>
          <e-column type="Sum" field="totalValue" format="C2" :footerTemplate="footerTotal"></e-column>
        </e-columns>
      </e-aggregate>
    </e-aggregates>
  </ejs-treegrid>
</template>

<script setup>
import { createApp, provide, ref } from 'vue';
import { Aggregate } from '@syncfusion/ej2-vue-treegrid';

const app = createApp({});

const countTemplate = app.component('countTemplate', {
  template: `<span>Total Items: ${data.Sum}</span>`,
  data() { return { data: {} }; }
});

const avgCostTemplate = app.component('avgCostTemplate', {
  template: `<span>Avg Cost: ${data.Average}</span>`,
  data() { return { data: {} }; }
});

const totalTemplate = app.component('totalTemplate', {
  template: `<span>Total Value: ${data.Sum}</span>`,
  data() { return { data: {} }; }
});

const inventoryData = ref([
  {
    warehouse: 'Warehouse A',
    itemCount: 500,
    unitCost: 25,
    totalValue: 12500,
    items: [
      { warehouse: 'Shelf 1', itemCount: 250, unitCost: 25, totalValue: 6250 },
      { warehouse: 'Shelf 2', itemCount: 250, unitCost: 25, totalValue: 6250 }
    ]
  }
]);

const footerCount = function () {
  return { template: countTemplate };
};

const footerAvgCost = function () {
  return { template: avgCostTemplate };
};

const footerTotal = function () {
  return { template: totalTemplate };
};

provide('treegrid', [Aggregate]);
</script>
```

## Best Practices

1. **Proper Module Injection** - Always provide Aggregate module to TreeGrid
2. **Directive Structure** - Use e-aggregates > e-aggregate > e-columns structure
3. **Field & Type Required** - Minimum required properties for each aggregate
4. **Child Summaries** - Use `showChildSummary` to display in parent row footers
5. **Formatting** - Apply format property for currency, dates, and percentages
6. **Footer Templates** - Use footerTemplate to customize aggregate display
7. **Multiple Types** - Use array syntax `['Sum', 'Average', 'Min', 'Max']` for multiple aggregates
8. **Boolean Columns** - Use Truecount and Falsecount for boolean fields
9. **Performance** - Large datasets work efficiently with aggregates
10. **Display Location** - Aggregates display in footer cells (footer and child summaries)

## Module Import Checklist

```javascript
import { 
  TreeGridComponent as EjsTreegrid,
  Aggregate,                      // ✓ Required for aggregates
  ColumnDirective as EColumn,
  ColumnsDirective as EColumns,
  AggregatesDirective as EAggregates,   // ✓ Required container
  AggregateDirective as EAggregate      // ✓ Required aggregate directive
} from '@syncfusion/ej2-vue-treegrid';

// Provide module
provide('treegrid', [Aggregate]);
```
