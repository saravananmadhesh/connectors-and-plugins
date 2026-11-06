# Axis Customization

## Table of Contents

- [Overview](#overview)
  - [API Reference](#api-reference)
- [Category Axis](#category-axis)
  - [Basic Category Axis](#basic-category-axis)
  - [Category Axis with Label Rotation](#category-axis-with-label-rotation)
  - [Category Axis with Custom Range](#category-axis-with-custom-range)
- [Numeric Axis](#numeric-axis)
  - [Basic Numeric Axis](#basic-numeric-axis)
  - [Numeric Axis with Fixed Range](#numeric-axis-with-fixed-range)
  - [Numeric Axis with Logarithmic Scale](#numeric-axis-with-logarithmic-scale)
- [DateTime Axis](#datetime-axis)
  - [Basic DateTime Axis](#basic-datetime-axis)
  - [DateTime Axis with Custom Interval](#datetime-axis-with-custom-interval)
- [Logarithmic Axis](#logarithmic-axis)
  - [Basic Logarithmic Axis](#basic-logarithmic-axis)
  - [Logarithmic Axis with Custom Base](#logarithmic-axis-with-custom-base)
- [Multi-Pane Configuration](#multi-pane-configuration)
  - [Basic Multi-Pane](#basic-multi-pane)
- [Axis Common Properties](#axis-common-properties)
  - [Title Configuration](#title-configuration)
  - [Label Formatting](#label-formatting)
  - [Grid Lines and Ticks](#grid-lines-and-ticks)
  - [Axis Range and Intervals](#axis-range-and-intervals)
  - [Axis Visibility and Position](#axis-visibility-and-position)
- [Common Axis Patterns](#common-axis-patterns)
  - [Pattern: Multiple Time Series](#pattern-multiple-time-series)
  - [Pattern: Percentage Comparison](#pattern-percentage-comparison)
  - [Pattern: Scientific Data](#pattern-scientific-data)
- [Selection Guidelines](#selection-guidelines)

## Overview

### API Reference
📄 **Read:** [references/api-reference.md](references/api-reference.md)


The 3D Chart supports multiple axis types to handle different data scenarios. Choose the appropriate axis type based on your data:

- **Category:** Text labels (products, regions, months)
- **Numeric:** Numerical values (quantities, prices)
- **DateTime:** Date/time values (trends over time)
- **Logarithmic:** Scientific/large range data (exponential growth)

## Category Axis

Category axis displays text labels for each data point.

### Basic Category Axis

```typescript
import { Component } from '@angular/core';
import {Chart3DAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-category-axis',
  standalone: true,
  imports: [Chart3DAllModule],
  template: `
    <ejs-chart3d [primaryXAxis]="xAxis">
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="product" yName="sales" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class CategoryAxisComponent {
  data = [
    { product: 'Laptop', sales: 45 },
    { product: 'Desktop', sales: 38 },
    { product: 'Monitor', sales: 52 }
  ];

  xAxis = { valueType: 'Category', title: 'Products' };
}
```

### Category Axis with Label Rotation

Rotate labels to avoid overlap:

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryXAxis]="xAxis">
      ...
    </ejs-chart3d>
  `
})
export class RotatedCategoryAxisComponent {
  xAxis = {
    valueType: 'Category',
    labelRotationAngle: 45,
    title: 'Products'
  };
}
```

### Category Axis with Custom Range

```typescript
xAxis = {
  valueType: 'Category',
  startAngle: 0,
  endAngle: 360
};
```

## Numeric Axis

Numeric axis displays numerical values with automatic scaling.

### Basic Numeric Axis

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryYAxis]="yAxis">
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="month" yName="revenue" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class NumericAxisComponent {
  data = [
    { month: 'Jan', revenue: 10000 },
    { month: 'Feb', revenue: 15000 },
    { month: 'Mar', revenue: 12000 }
  ];

  yAxis = {
    valueType: 'Double',
    title: 'Revenue ($)',
    labelFormat: '${value}'
  };
}
```

### Numeric Axis with Fixed Range

```typescript
yAxis = {
  valueType: 'Double',
  minimum: 0,
  maximum: 50000,
  interval: 10000,
  title: 'Amount'
};
```

### Numeric Axis with Logarithmic Scale

For large value ranges, use logarithmic scale:

```typescript
yAxis = {
  valueType: 'Double',
  isInversed: false,
  majorGridLines: { width: 1 }
};
```

## DateTime Axis

DateTime axis handles date and time values.

### Basic DateTime Axis

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryXAxis]="xAxis">
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="date" yName="sales" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class DateTimeAxisComponent {
  data = [
    { date: new Date(2024, 0, 1), sales: 40 },
    { date: new Date(2024, 1, 1), sales: 50 },
    { date: new Date(2024, 2, 1), sales: 55 }
  ];

  xAxis = {
    valueType: 'DateTime',
    intervalType: 'Months',
    interval: 1,
    labelFormat: 'MMM'
  };
}
```

### DateTime Axis with Custom Interval

```typescript
xAxis = {
  valueType: 'DateTime',
  intervalType: 'Days',
  interval: 5,
  labelFormat: 'dd/MM/yyyy'
};
```

**IntervalType Options:** Years, Months, Weeks, Days, Hours, Minutes, Seconds

## Logarithmic Axis

Logarithmic axis is ideal for data with exponential growth or large value ranges.

### Basic Logarithmic Axis

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryYAxis]="yAxis" [primaryXAxis]="xAxis">
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="month" yName="value" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class LogarithmicAxisComponent {
  data = [
    { month: 'Jan', value: 100 },
    { month: 'Feb', value: 1000 },
    { month: 'Mar', value: 10000 },
    { month: 'Apr', value: 100000 }
  ];

  xAxis = {
    valueType: 'Category'
  };

  yAxis = {
    valueType: 'Logarithmic',
    logBase: 10,
    title: 'Value (log scale)'
  };
}
```

### Logarithmic Axis with Custom Base

```typescript
yAxis = {
  valueType: 'Logarithmic',
  logBase: 2,  // Binary logarithm
  minimum: 0,
  maximum: 8
};
```

## Multi-Pane Configuration

Display multiple axes and series in separate panes.

### Basic Multi-Pane

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryXAxis]="xAxis">
      <!-- First pane with primary Y axis -->
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="series1Data" xName="x" yName="y1" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
      
      <!-- Second pane with secondary Y axis -->
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="series2Data" xName="x" yName="y2" yAxisName="secondary" type="Bar">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class MultiPaneComponent {
  series1Data = [{ x: 'A', y1: 40 }];
  series2Data = [{ x: 'A', y2: 50 }];

  xAxis = {
    valueType: 'Category'
  };
}
```

## Axis Common Properties

### Title Configuration

```typescript
xAxis = {
  title: 'Category Label',
  titleStyle: {
    fontFamily: 'Arial',
    fontStyle: 'Normal',
    fontWeight: '600',
    size: '16px',
    color: '#0066cc'
  }
};
```

### Label Formatting

```typescript
yAxis = {
  labelFormat: '${value}K',  // Custom format
  // OR
  labelFormat: '{value:N2}'   // Decimal places
};
```

### Grid Lines and Ticks

```typescript
xAxis = {
  majorGridLines: { width: 1, color: '#d3d3d3' },
  minorGridLines: { width: 1, color: '#f0f0f0' },
  majorTickLines: { width: 2, color: '#333' },
  minorTickLines: { width: 1, color: '#999' }
};
```

### Axis Range and Intervals

```typescript
yAxis = {
  valueType: 'Double',
  minimum: 0,           // Start value
  maximum: 100,         // End value
  interval: 10,         // Major tick interval
  minorTicksPerInterval: 4  // Minor ticks between majors
};
```

### Axis Visibility and Position

```typescript
xAxis = {
  visible: true,
  opposedPosition: false,  // Position below chart
  placeNextToAxisLine: true
};
```

## Common Axis Patterns

### Pattern: Multiple Time Series

When displaying trend data over time:

```typescript
xAxis = { valueType: 'DateTime', intervalType: 'Months' };
yAxis = { valueType: 'Double', labelFormat: '${value}' };
```

### Pattern: Percentage Comparison

When showing percentages:

```typescript
yAxis = {
  valueType: 'Double',
  minimum: 0,
  maximum: 100,
  interval: 20,
  labelFormat: '{value}%'
};
```

### Pattern: Scientific Data

When showing exponential growth:

```typescript
yAxis = { valueType: 'Logarithmic', logBase: 10 };
```

## Selection Guidelines

| Data Type | Axis Type | Use When |
|-----------|-----------|----------|
| Product names, regions | Category | Data are discrete text labels |
| Quantity, price, percentage | Numeric | Data are numerical values |
| Daily, monthly, yearly | DateTime | Data points across time periods |
| 1, 10, 100, 1000 | Logarithmic | Values span multiple orders of magnitude |
