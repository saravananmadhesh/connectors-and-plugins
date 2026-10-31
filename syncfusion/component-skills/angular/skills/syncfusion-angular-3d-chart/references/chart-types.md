# Chart Types and Configuration

## Table of Contents

- [Overview](#overview)
  - [API Reference](#api-reference)
- [Column Chart](#column-chart)
  - [Basic Column Chart](#basic-column-chart)
  - [Column Chart with Multiple Series](#column-chart-with-multiple-series)
- [Bar Chart](#bar-chart)
  - [Basic Bar Chart](#basic-bar-chart)
  - [Bar Chart with Multiple Series](#bar-chart-with-multiple-series)
- [Stacked Column Chart](#stacked-column-chart)
  - [Basic Stacked Column](#basic-stacked-column)
  - [Stacked Column with Percentage](#stacked-column-with-percentage)
- [Stacked Bar Chart](#stacked-bar-chart)
  - [Basic Stacked Bar](#basic-stacked-bar)
  - [Stacked Bar 100% Normalized](#stacked-bar-100-normalized)
- [Switching Chart Types](#switching-chart-types)
- [Series Configuration](#series-configuration)
  - [Named Series](#named-series)
  - [Series with Custom Colors](#series-with-custom-colors)
- [Common Patterns](#common-patterns)
  - [Pattern: Comparative Analysis with Multiple Series](#pattern-comparative-analysis-with-multiple-series)
  - [Pattern: Composition Analysis](#pattern-composition-analysis)
  - [Pattern: Trend Comparison](#pattern-trend-comparison)
- [Selection Guidelines](#selection-guidelines)
- [Performance Notes](#performance-notes)

## Overview

### API Reference
📄 **Read:** [references/api-reference.md](references/api-reference.md)


The 3D Chart component supports multiple visualization types to represent data in different ways. Each type is optimized for specific use cases:

- **Column:** Vertical bars, ideal for comparing values across categories
- **Bar:** Horizontal bars, good for long category names
- **Stacked Column:** Multiple series stacked vertically, shows composition
- **Stacked Bar:** Multiple series stacked horizontally, shows composition

## Column Chart

The column chart displays vertical bars for each data point. Best for comparing values across categories.

### Basic Column Chart

```typescript
import { Component } from '@angular/core';
import { Chart3DAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-column-chart',
  standalone: true,
  imports: [Chart3DAllModule],
  template: `
    <ejs-chart3d [title]="'Quarterly Sales'" [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="quarter" yName="sales" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class ColumnChartComponent {

  primaryXAxis = {
            valueType: 'Category'
  }
  data = [
    { quarter: 'Q1', sales: 50 },
    { quarter: 'Q2', sales: 65 },
    { quarter: 'Q3', sales: 72 },
    { quarter: 'Q4', sales: 88 }
  ];
}
```

### Column Chart with Multiple Series

Display multiple data series side by side:

```typescript
@Component({
  template: `
    <ejs-chart3d [title]="'Sales by Region'" [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="month" yName="northSales" name="North" type="Column">
        </e-chart3d-series>
        <e-chart3d-series [dataSource]="data" xName="month" yName="southSales" name="South" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class MultiSeriesColumnComponent {
  data = [
    { month: 'Jan', northSales: 35, southSales: 28 },
    { month: 'Feb', northSales: 28, southSales: 35 },
    { month: 'Mar', northSales: 34, southSales: 32 }
  ];

  primaryXAxis = {
            valueType: 'Category'
  }
}
```

## Bar Chart

Bar charts display horizontal bars, useful when category names are long or you prefer horizontal orientation.

### Basic Bar Chart

```typescript
@Component({
  template: `
    <ejs-chart3d [title]="'Product Sales'" [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="product" yName="units" type="Bar">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class BarChartComponent {
  data = [
    { product: 'Laptop', units: 45 },
    { product: 'Desktop', units: 38 },
    { product: 'Monitor', units: 52 },
    { product: 'Keyboard', units: 61 }
  ];

  primaryXAxis = {
    valueType: 'Category'
  }
}
```

### Bar Chart with Multiple Series

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="product" yName="q1" name="Q1" type="Bar">
        </e-chart3d-series>
        <e-chart3d-series [dataSource]="data" xName="product" yName="q2" name="Q2" type="Bar">
        </e-chart3d-series>
        <e-chart3d-series [dataSource]="data" xName="product" yName="q3" name="Q3" type="Bar">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class MultiSeriesBarComponent {
  data = [
    { product: 'A', q1: 20, q2: 25, q3: 30 },
    { product: 'B', q1: 18, q2: 22, q3: 28 },
    { product: 'C', q1: 25, q2: 28, q3: 32 }
  ];

  primaryXAxis = {
    valueType: 'Category'
  }
}
```

## Stacked Column Chart

Stacked columns display multiple series on top of each other, showing both individual values and totals.

### Basic Stacked Column

```typescript
@Component({
  template: `
    <ejs-chart3d [title]="'Revenue Composition'" >
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="month" yName="licensing" name="Licensing" type="StackingColumn">
        </e-chart3d-series>
        <e-chart3d-series [dataSource]="data" xName="month" [primaryXAxis]='primaryXAxis'yName="support" name="Support" type="StackingColumn">
        </e-chart3d-series>
        <e-chart3d-series [dataSource]="data" xName="month" yName="consulting" name="Consulting" type="StackingColumn">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class StackedColumnComponent {
  data = [
    { month: 'Jan', licensing: 40, support: 30, consulting: 20 },
    { month: 'Feb', licensing: 45, support: 35, consulting: 25 },
    { month: 'Mar', licensing: 50, support: 38, consulting: 28 }
  ];

  primaryXAxis = {
    valueType: 'Category'
  }
}
```

### Stacked Column with Percentage

Display values as percentages of total:

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="category" yName="value1" name="Series1" type="StackingColumn100">
        </e-chart3d-series>
        <e-chart3d-series [dataSource]="data" xName="category" yName="value2" name="Series2" type="StackingColumn100">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class StackedColumn100Component {
  data = [
    { category: 'A', value1: 60, value2: 40 },
    { category: 'B', value1: 70, value2: 30 }
  ];

  primaryXAxis = {
    valueType: 'Category'
  }
}
```

## Stacked Bar Chart

Stacked bars display multiple series side by side (horizontally), showing composition.

### Basic Stacked Bar

```typescript
@Component({
  template: `
    <ejs-chart3d [title]="'Department Budget'" [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="department" yName="salaries" name="Salaries" type="StackingBar">
        </e-chart3d-series>
        <e-chart3d-series [dataSource]="data" xName="department" yName="equipment" name="Equipment" type="StackingBar">
        </e-chart3d-series>
        <e-chart3d-series [dataSource]="data" xName="department" yName="training" name="Training" type="StackingBar">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class StackedBarComponent {
  data = [
    { department: 'Engineering', salaries: 60, equipment: 20, training: 10 },
    { department: 'Marketing', salaries: 40, equipment: 30, training: 15 },
    { department: 'Sales', salaries: 50, equipment: 25, training: 12 }
  ];

  primaryXAxis = {
    valueType: 'Category'
  }
}
```

### Stacked Bar 100% (Normalized)

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="dept" yName="v1" type="StackingBar100">
        </e-chart3d-series>
        <e-chart3d-series [dataSource]="data" xName="dept" yName="v2" type="StackingBar100">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class StackedBar100Component {
  data = [
    { dept: 'A', v1: 30, v2: 70 },
    { dept: 'B', v1: 50, v2: 50 }
  ];

  primaryXAxis = {
    valueType: 'Category'
  }
}
```

## Switching Chart Types

Allow users to change chart type dynamically:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart3DAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-chart-type-switcher',
  standalone: true,
  imports: [Chart3DAllModule],
  template: `
    <div>
      <div style="margin-bottom: 20px;">
        <button (click)="changeType('Column')">Column</button>
        <button (click)="changeType('Bar')">Bar</button>
        <button (click)="changeType('StackingColumn')">Stacked Column</button>
        <button (click)="changeType('StackingBar')">Stacked Bar</button>
      </div>
      
      <ejs-chart3d [primaryXAxis]='primaryXAxis'>
        <e-chart3d-series-collection>
          <e-chart3d-series [dataSource]="data" xName="x" yName="y" [type]="currentType">
          </e-chart3d-series>
        </e-chart3d-series-collection>
      </ejs-chart3d>
    </div>
  `
})
export class ChartTypeSwitcherComponent {
  currentType = 'Column';
  data = [
    { x: 'A', y: 40 },
    { x: 'B', y: 50 },
    { x: 'C', y: 60 }
  ];

  changeType(type: string) {
    this.currentType = type;
  }

  primaryXAxis = {
    valueType: 'Category'
  }
}
```

## Series Configuration

### Named Series

Assign names to series for legend display:

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="month" yName="sales" name="2023 Sales" type="Column">
        </e-chart3d-series>
        <e-chart3d-series [dataSource]="data" xName="month" yName="forecast" name="2024 Forecast" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class NamedSeriesComponent {
  data = [
    { month: 'Jan', sales: 40, forecast: 45 },
    { month: 'Feb', sales: 35, forecast: 42 }
  ];

  primaryXAxis = {
    valueType: 'Category'
  }
}
```

### Series with Custom Colors

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series 
          [dataSource]="data" 
          xName="x" 
          yName="y" 
          type="Column"
          [fill]="'#FF6B6B'">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class ColoredSeriesComponent {
  data = [{ x: 'A', y: 50 }];

  primaryXAxis = {
    valueType: 'Category'
  }
}
```

## Common Patterns

### Pattern: Comparative Analysis with Multiple Series

When comparing multiple datasets across categories:

```typescript
data = [
  { month: 'Jan', product1: 35, product2: 28, product3: 40 },
  { month: 'Feb', product1: 28, product2: 35, product3: 38 }
];
```

Use **Column or Bar** type for easy side-by-side comparison.

### Pattern: Composition Analysis

When showing how parts make up a whole:

```typescript
data = [
  { quarter: 'Q1', revenue: 40, expenses: 30, profit: 20 }
];
```

Use **StackingColumn or StackingBar** to show composition stacked.

### Pattern: Trend Comparison

When showing trends of multiple series:

Use regular **Column or Bar** with multiple series, not stacked, so you can see each trend clearly.

## Selection Guidelines

| Use Case | Recommended Type |
|----------|-----------------|
| Compare values across categories | Column |
| Long category labels | Bar |
| Show composition (parts of whole) | Stacking Column |
| Show composition horizontally | Stacking Bar |
| Multiple trends side-by-side | Column with multiple series |
| Budget vs. Actual | Stacking Column |
| Market share over time | Stacking Column 100% |

## Performance Notes

- **Column/Bar:** Efficient for 100+ data points
- **Stacking Types:** Use with 3-5 series maximum for clarity
- **Many Series:** Consider grouping or filtering data
