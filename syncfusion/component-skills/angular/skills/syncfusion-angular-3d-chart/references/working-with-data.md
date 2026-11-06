# Working with Data

## Table of Contents

- [Overview](#overview)
- [Data Binding Approaches](#data-binding-approaches)
  - [Local Array Binding](#local-array-binding)
  - [Array of Objects](#array-of-objects)
  - [Typed Data Model](#typed-data-model)
- [Category Data](#category-data)
  - [Text Category Binding](#text-category-binding)
  - [Numeric Category](#numeric-category)
  - [DateTime Categories](#datetime-categories)
- [Remote Data Loading](#remote-data-loading)
  - [Load from HTTP API](#load-from-http-api)
  - [Load with Error Handling](#load-with-error-handling)
  - [Load with Loading State](#load-with-loading-state)
- [Data Updates](#data-updates)
  - [Update Series Data](#update-series-data)
  - [Add New Data Points](#add-new-data-points)
  - [Remove Data Points](#remove-data-points)
- [Data Refresh Patterns](#data-refresh-patterns)
  - [Auto-Refresh Pattern](#auto-refresh-pattern)
  - [Sliding Window Pattern](#sliding-window-pattern)
- [Common Data Patterns](#common-data-patterns)
  - [Pattern 1 Simple Sales Data](#pattern-1-simple-sales-data)
  - [Pattern 2 Multi-Series Comparison](#pattern-2-multi-series-comparison)
  - [Pattern 3 Filtering Data](#pattern-3-filtering-data)
  - [Pattern 4 Grouping Data](#pattern-4-grouping-data)
- [Performance Optimization](#performance-optimization)
- [Type-Safe Data Handling](#type-safe-data-handling)

## Overview

The 3D Chart component supports multiple data binding approaches to handle various data scenarios.

## Data Binding Approaches

### Local Array Binding

Bind chart to a local TypeScript array:

```typescript
import { Component } from '@angular/core';
import { Chart3DAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-working-with-data',
  standalone: true,
  imports: [Chart3DAllModule],
  template: `
    <ejs-chart3d [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="month" yName="sales" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class LocalDataComponent {

  primaryXAxis = {
        valueType: 'Category'
  }

  data = [
    { month: 'Jan', sales: 40 },
    { month: 'Feb', sales: 50 },
    { month: 'Mar', sales: 45 }
  ];
}
```

### Array of Objects

Structure data with multiple properties:

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="salesData" xName="product" yName="revenue" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class ObjectArrayComponent {
  salesData = [
    { product: 'Laptop', revenue: 45000, units: 150, category: 'Electronics' },
    { product: 'Monitor', revenue: 28000, units: 320, category: 'Electronics' },
    { product: 'Keyboard', revenue: 15000, units: 800, category: 'Accessories' }
  ];

  primaryXAxis = {
        valueType: 'Category'
  }
}
```

### Typed Data Model

Use TypeScript interfaces for type safety:

```typescript
interface SalesData {
  month: string;
  sales: number;
  forecast: number;
}

@Component({
  template: `
    <ejs-chart3d [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="salesData" xName="month" yName="sales" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class TypedDataComponent {
  salesData: SalesData[] = [
    { month: 'Jan', sales: 40, forecast: 45 },
    { month: 'Feb', sales: 50, forecast: 48 }
  ];

  primaryXAxis = {
        valueType: 'Category'
  }
}
```

## Category Data

### Text Category Binding

Bind text values to X-axis:

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryXAxis]="xAxis">
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="categoryData" xName="region" yName="sales" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class CategoryComponent {
  categoryData = [
    { region: 'North America', sales: 125 },
    { region: 'Europe', sales: 89 },
    { region: 'Asia Pacific', sales: 156 }
  ];

  xAxis = { valueType: 'Category' };
}
```

### Numeric Category

Use numbers as categories:

```typescript
categoryData = [
  { id: 1, value: 40 },
  { id: 2, value: 50 },
  { id: 3, value: 45 }
];

xAxis = { valueType: 'Category', title: 'ID' };
```

### DateTime Categories

Use dates as categories:

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryXAxis]="xAxis">
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="dateData" xName="date" yName="temperature" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class DateCategoryComponent {
  dateData = [
    { date: new Date(2024, 0, 1), temperature: 15 },
    { date: new Date(2024, 0, 2), temperature: 18 },
    { date: new Date(2024, 0, 3), temperature: 20 }
  ];

  xAxis = {
    valueType: 'DateTime',
    intervalType: 'Days',
    labelFormat: 'MMM dd'
  };
}
```

## Remote Data Loading

### Load from HTTP API

```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-remote-data',
  standalone: true,
  imports: [Chart3DComponent, Chart3DSeriesCollectionDirective, Chart3DSeriesDirective],
  template: `
    <ejs-chart3d>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="remoteData" xName="month" yName="sales" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class RemoteDataComponent implements OnInit {
  remoteData: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('/api/sales')
      .subscribe(data => {
        this.remoteData = data;
      });
  }
}
```

### Load with Error Handling

```typescript
ngOnInit() {
  this.http.get<any[]>('/api/sales')
    .subscribe({
      next: (data) => {
        this.remoteData = data;
      },
      error: (error) => {
        console.error('Error loading data:', error);
        this.remoteData = [];  // Default empty
      }
    });
}
```

### Load with Loading State

```typescript
@Component({
  template: `
    <div>
      <div *ngIf="isLoading">Loading...</div>
      <ejs-chart3d *ngIf="!isLoading">
        <e-chart3d-series-collection>
          <e-chart3d-series [dataSource]="remoteData" xName="x" yName="y" type="Column">
          </e-chart3d-series>
        </e-chart3d-series-collection>
      </ejs-chart3d>
    </div>
  `
})
export class LoadingStateComponent implements OnInit {
  remoteData: any[] = [];
  isLoading = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.isLoading = true;
    this.http.get<any[]>('/api/sales')
      .subscribe({
        next: (data) => {
          this.remoteData = data;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }
}
```

## Data Updates

### Update Series Data

Modify data after binding:

```typescript
@Component({
  template: `
    <div>
      <button (click)="updateData()">Update Data</button>
      <ejs-chart3d [primaryXAxis]='primaryXAxis'>
        <e-chart3d-series-collection>
          <e-chart3d-series [dataSource]="data" xName="x" yName="y" type="Column">
          </e-chart3d-series>
        </e-chart3d-series-collection>
      </ejs-chart3d>
    </div>
  `
})
export class DataUpdateComponent {
  data = [
    { x: 'A', y: 40 },
    { x: 'B', y: 50 }
  ];

  primaryXAxis = {
        valueType: 'Category'
  }

  updateData() {
    this.data = [
      { x: 'A', y: 45 },
      { x: 'B', y: 55 }
    ];
  }
}
```

### Add New Data Points

```typescript
addDataPoint() {
  this.data = [
    ...this.data,
    { x: 'C', y: 60 }
  ];
}
```

### Remove Data Points

```typescript
removeLastPoint() {
  this.data = this.data.slice(0, -1);
}
```

## Data Refresh Patterns

### Auto-Refresh Pattern

Update chart at intervals:

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="liveData" xName="time" yName="value" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class LiveDataComponent implements OnInit {
  liveData: any[] = [];

  primaryXAxis = {
        valueType: 'Category'
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
    // Refresh every 5 seconds
    setInterval(() => this.loadData(), 5000);
  }

  loadData() {
    this.http.get<any[]>('/api/live-data')
      .subscribe(data => {
        this.liveData = data;
      });
  }
}
```

### Sliding Window Pattern

Keep only recent data:

```typescript
ngOnInit() {
  setInterval(() => {
    this.http.get<any>('/api/latest-value')
      .subscribe(newPoint => {
        this.liveData.push(newPoint);
        
        // Keep only last 10 points
        if (this.liveData.length > 10) {
          this.liveData = this.liveData.slice(-10);
        }
      });
  }, 1000);
}
```

## Common Data Patterns

### Pattern 1: Simple Sales Data

```typescript
data = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 2000 }
];
```

### Pattern 2: Multi-Series Comparison

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="month" yName="sales2023" name="2023" type="Column">
        </e-chart3d-series>
        <e-chart3d-series [dataSource]="data" xName="month" yName="sales2024" name="2024" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class MultiSeriesComponent {

  primaryXAxis = {
        valueType: 'Category'
  }

  data = [
    { month: 'Jan', sales2023: 40, sales2024: 50 },
    { month: 'Feb', sales2023: 35, sales2024: 48 }
  ];
}
```

### Pattern 3: Filtering Data

```typescript
get filteredData() {
  return this.allData.filter(d => d.region === this.selectedRegion);
}
```

### Pattern 4: Grouping Data

```typescript
groupByCategory() {
  const grouped = this.data.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});
  return grouped;
}
```

## Performance Optimization

- **Batch updates:** Group multiple data changes
- **Virtual scrolling:** For large datasets (100k+ points)
- **Sampling:** Show representative data instead of all points
- **Lazy loading:** Load data on demand

## Type-Safe Data Handling

```typescript
interface ChartData {
  category: string;
  value: number;
  metadata?: Record<string, any>;
}

data: ChartData[] = [
  { category: 'A', value: 40 },
  { category: 'B', value: 50 }
];
```
