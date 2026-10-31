# Series Types & Data Binding

The Range Navigator supports six series types for different data visualization needs. This guide covers the available series types, data-binding methods, configuration options, styling, and required service providers.

## Table of Contents

- [Available Series Types](#available-series-types)
- [Area Series](#area-series)
  - [Basic Area Series](#basic-area-series)
  - [Area Series with Styling](#area-series-with-styling)
- [Line Series](#line-series)
  - [Basic Line Series](#basic-line-series)
  - [Line Series with Custom Styling](#line-series-with-custom-styling)
- [StepLine Series](#stepline-series)
- [Spline Series](#spline-series)
- [SplineArea Series](#splinearea-series)
- [Column Series](#column-series)
- [Multiple Series](#multiple-series)
  - [Two Series Configuration](#two-series-configuration)
- [Data Binding](#data-binding)
  - [Local Array Binding](#local-array-binding)
  - [Remote Data Binding](#remote-data-binding)
  - [Dynamic Data Update](#dynamic-data-update)
- [Series Configuration](#series-configuration)
  - [xName and yName Mapping](#xname-and-yname-mapping)
  - [Custom Series Naming](#custom-series-naming)
- [Series Styling](#series-styling)
  - [Color and Fill](#color-and-fill)
  - [Gradient Fill](#gradient-fill)
- [Range Navigator with Chart](#range-navigator-with-chart)
  - [Basic Chart Synchronization](#basic-chart-synchronization)
- [Best Practices](#best-practices)
- [Service Provider Reference](#service-provider-reference)

## Available Series Types

| Type | Purpose | Best For |
|------|---------|----------|
| `Area` | Filled area visualization | Continuous trends and cumulative values |
| `Line` | Straight line segments | Time-series trends and direct comparisons |
| `StepLine` | Step-wise line segments | State changes and step-function data |
| `Spline` | Smooth curved line | Gradual trends and smoothly varying data |
| `SplineArea` | Smooth curve with a filled area | Smooth trends where magnitude should be emphasized |
| `Column` | Vertical columns | Discrete values and category-based comparisons |

## Area Series

Area series displays a line with the region beneath it filled. To render it, set `type="Area"` and inject `AreaSeriesService`.

### Basic Area Series

```typescript
import { Component } from '@angular/core';
import {
  AreaSeriesService,
  DateTimeService,
  RangeNavigatorModule
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-area-series',
  standalone: true,
  imports: [RangeNavigatorModule],
  providers: [AreaSeriesService, DateTimeService],
  template: `
    <ejs-rangenavigator
      id="area-range-navigator"
      valueType="DateTime">
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series
          [dataSource]="areaData"
          xName="date"
          yName="value"
          type="Area">
        </e-rangenavigator-series>
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  `
})
export class AreaSeriesComponent {
  public areaData: Object[] = [
    { date: new Date(2023, 0, 1), value: 50 },
    { date: new Date(2023, 0, 2), value: 55 },
    { date: new Date(2023, 0, 3), value: 60 },
    { date: new Date(2023, 0, 4), value: 58 }
  ];
}
```

### Area Series with Styling

```html
<e-rangenavigator-series
  [dataSource]="areaData"
  xName="date"
  yName="value"
  type="Area"
  fill="#3498db"
  [opacity]="0.7"
  [border]="{ color: '#2c3e50', width: 2 }">
</e-rangenavigator-series>
```

## Line Series

Line series displays data using straight line segments without an area fill. Set `type="Line"` and inject `LineSeriesService`.

### Basic Line Series

```typescript
import { Component } from '@angular/core';
import {
  DateTimeService,
  LineSeriesService,
  RangeNavigatorModule
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-line-series',
  standalone: true,
  imports: [RangeNavigatorModule],
  providers: [LineSeriesService, DateTimeService],
  template: `
    <ejs-rangenavigator valueType="DateTime">
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series
          [dataSource]="lineData"
          xName="date"
          yName="value"
          type="Line">
        </e-rangenavigator-series>
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  `
})
export class LineSeriesComponent {
  public lineData: Object[] = [
    { date: new Date(2023, 0, 1), value: 100 },
    { date: new Date(2023, 0, 2), value: 110 },
    { date: new Date(2023, 0, 3), value: 105 },
    { date: new Date(2023, 0, 4), value: 115 }
  ];
}
```

### Line Series with Custom Styling

```html
<e-rangenavigator-series
  [dataSource]="lineData"
  xName="date"
  yName="value"
  type="Line"
  [width]="3"
  fill="#e74c3c">
</e-rangenavigator-series>
```

## StepLine Series

StepLine series connects points with horizontal and vertical segments. Set `type="StepLine"` and inject `StepLineSeriesService`.

### Basic StepLine Series

```typescript
import { Component } from '@angular/core';
import {
  DateTimeService,
  RangeNavigatorModule,
  StepLineSeriesService
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-step-line-series',
  standalone: true,
  imports: [RangeNavigatorModule],
  providers: [StepLineSeriesService, DateTimeService],
  template: `
    <ejs-rangenavigator
      id="step-line-range-navigator"
      valueType="DateTime"
      [value]="value">
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series
          [dataSource]="chartData"
          xName="date"
          yName="value"
          type="StepLine"
          [width]="2">
        </e-rangenavigator-series>
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  `
})
export class StepLineSeriesComponent {
  public value: Date[] = [
    new Date(2023, 0, 1),
    new Date(2023, 0, 4)
  ];

  public chartData: Object[] = [
    { date: new Date(2023, 0, 1), value: 12 },
    { date: new Date(2023, 0, 2), value: 30 },
    { date: new Date(2023, 0, 3), value: 18 },
    { date: new Date(2023, 0, 4), value: 35 }
  ];
}
```

## Spline Series

Spline series uses smooth, curved segments between data points. Set `type="Spline"` and inject `SplineSeriesService`.

### Basic Spline Series

```typescript
import { Component } from '@angular/core';
import {
  DateTimeService,
  RangeNavigatorModule,
  SplineSeriesService
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-spline-series',
  standalone: true,
  imports: [RangeNavigatorModule],
  providers: [SplineSeriesService, DateTimeService],
  template: `
    <ejs-rangenavigator valueType="DateTime">
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series
          [dataSource]="splineData"
          xName="date"
          yName="value"
          type="Spline"
          [width]="2"
          fill="#7c3aed">
        </e-rangenavigator-series>
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  `
})
export class SplineSeriesComponent {
  public splineData: Object[] = [
    { date: new Date(2023, 0, 1), value: 20 },
    { date: new Date(2023, 1, 1), value: 36 },
    { date: new Date(2023, 2, 1), value: 28 },
    { date: new Date(2023, 3, 1), value: 44 },
    { date: new Date(2023, 4, 1), value: 38 }
  ];
}
```

### Spline Series with Styling

```html
<e-rangenavigator-series
  [dataSource]="splineData"
  xName="date"
  yName="value"
  type="Spline"
  [width]="3"
  fill="#7c3aed">
</e-rangenavigator-series>
```

## SplineArea Series

SplineArea combines a smooth spline curve with a filled area. Set `type="SplineArea"` and inject `SplineAreaSeriesService`.

### Basic SplineArea Series

```typescript
import { Component } from '@angular/core';
import {
  DateTimeService,
  RangeNavigatorModule,
  SplineAreaSeriesService
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-spline-area-series',
  standalone: true,
  imports: [RangeNavigatorModule],
  providers: [SplineAreaSeriesService, DateTimeService],
  template: `
    <ejs-rangenavigator valueType="DateTime">
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series
          [dataSource]="splineAreaData"
          xName="date"
          yName="value"
          type="SplineArea"
          fill="#0ea5e9"
          [opacity]="0.65"
          [border]="{ color: '#0369a1', width: 2 }">
        </e-rangenavigator-series>
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  `
})
export class SplineAreaSeriesComponent {
  public splineAreaData: Object[] = [
    { date: new Date(2023, 0, 1), value: 32 },
    { date: new Date(2023, 1, 1), value: 46 },
    { date: new Date(2023, 2, 1), value: 40 },
    { date: new Date(2023, 3, 1), value: 54 },
    { date: new Date(2023, 4, 1), value: 49 }
  ];
}
```

### SplineArea Series with Styling

```html
<e-rangenavigator-series
  [dataSource]="splineAreaData"
  xName="date"
  yName="value"
  type="SplineArea"
  fill="#0ea5e9"
  [opacity]="0.6"
  [border]="{ color: '#075985', width: 2 }">
</e-rangenavigator-series>
```

## Column Series

Column series displays each value as a vertical column. Set `type="Column"` and inject `ColumnSeriesService`.

### Basic Column Series

```typescript
import { Component } from '@angular/core';
import {
  ColumnSeriesService,
  DateTimeService,
  RangeNavigatorModule
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-column-series',
  standalone: true,
  imports: [RangeNavigatorModule],
  providers: [ColumnSeriesService, DateTimeService],
  template: `
    <ejs-rangenavigator valueType="DateTime">
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series
          [dataSource]="columnData"
          xName="date"
          yName="value"
          type="Column"
          fill="#f97316"
          [border]="{ color: '#c2410c', width: 1 }">
        </e-rangenavigator-series>
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  `
})
export class ColumnSeriesComponent {
  public columnData: Object[] = [
    { date: new Date(2023, 0, 1), value: 18 },
    { date: new Date(2023, 1, 1), value: 30 },
    { date: new Date(2023, 2, 1), value: 24 },
    { date: new Date(2023, 3, 1), value: 41 }
  ];
}
```

### Column Series with Styling

```html
<e-rangenavigator-series
  [dataSource]="columnData"
  xName="date"
  yName="value"
  type="Column"
  fill="#f97316"
  [opacity]="0.8"
  [border]="{ color: '#9a3412', width: 1 }">
</e-rangenavigator-series>
```

## Multiple Series

Range Navigator supports multiple series for comparative analysis. Inject the service for every series type used in the collection.

### Two Series Configuration

```typescript
import { Component } from '@angular/core';
import {
  AreaSeriesService,
  DateTimeService,
  RangeNavigatorModule,
  SplineSeriesService
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-multiple-series',
  standalone: true,
  imports: [RangeNavigatorModule],
  providers: [
    AreaSeriesService,
    SplineSeriesService,
    DateTimeService
  ],
  template: `
    <ejs-rangenavigator valueType="DateTime">
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series
          [dataSource]="multiSeriesData"
          xName="date"
          yName="series1"
          name="Revenue"
          type="Area"
          fill="#3498db">
        </e-rangenavigator-series>
        <e-rangenavigator-series
          [dataSource]="multiSeriesData"
          xName="date"
          yName="series2"
          name="Target"
          type="Spline"
          fill="#e74c3c"
          [width]="2">
        </e-rangenavigator-series>
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  `
})
export class MultiSeriesComponent {
  public multiSeriesData: Object[] = [
    { date: new Date(2023, 0, 1), series1: 50, series2: 40 },
    { date: new Date(2023, 0, 2), series1: 60, series2: 45 },
    { date: new Date(2023, 0, 3), series1: 55, series2: 50 }
  ];
}
```

## Data Binding

Bind data through the `dataSource` property of each series. Map the data fields using `xName` and `yName`.

### Local Array Binding

```typescript
import { Component } from '@angular/core';
import {
  AreaSeriesService,
  DateTimeService,
  RangeNavigatorModule
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-local-data',
  standalone: true,
  imports: [RangeNavigatorModule],
  providers: [AreaSeriesService, DateTimeService],
  template: `
    <ejs-rangenavigator valueType="DateTime">
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series
          [dataSource]="localData"
          xName="date"
          yName="value"
          type="Area">
        </e-rangenavigator-series>
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  `
})
export class LocalDataComponent {
  public localData: Object[] = [
    { date: new Date(2023, 0, 1), value: 21 },
    { date: new Date(2023, 0, 2), value: 24 },
    { date: new Date(2023, 0, 3), value: 36 }
  ];
}
```

### Remote Data Binding

The following example uses Angular `HttpClient`. Configure `provideHttpClient()` in the application configuration before using it.

```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AreaSeriesService,
  DateTimeService,
  RangeNavigatorModule
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-remote-data',
  standalone: true,
  imports: [RangeNavigatorModule],
  providers: [AreaSeriesService, DateTimeService],
  template: `
    <ejs-rangenavigator valueType="DateTime">
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series
          [dataSource]="remoteData"
          xName="date"
          yName="close"
          type="Area">
        </e-rangenavigator-series>
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  `
})
export class RemoteDataComponent implements OnInit {
  public remoteData: Object[] = [];

  public constructor(private http: HttpClient) {}

  public ngOnInit(): void {
    this.http
      .get<Object[]>('https://api.example.com/stock-data')
      .subscribe((data: Object[]) => {
        this.remoteData = data;
      });
  }
}
```

### Dynamic Data Update

Replace the bound array with a new array when data changes.

```typescript
public chartData: Object[] = [
  { date: new Date(2023, 0, 1), value: 50 }
];

public updateData(): void {
  this.chartData = [
    { date: new Date(2023, 0, 1), value: 50 },
    { date: new Date(2023, 0, 2), value: 65 },
    { date: new Date(2023, 0, 3), value: 75 }
  ];
}
```

```html
<button type="button" (click)="updateData()">
  Update data
</button>

<ejs-rangenavigator valueType="DateTime">
  <e-rangenavigator-series-collection>
    <e-rangenavigator-series
      [dataSource]="chartData"
      xName="date"
      yName="value"
      type="Area">
    </e-rangenavigator-series>
  </e-rangenavigator-series-collection>
</ejs-rangenavigator>
```

## Series Configuration

### `xName` and `yName` Mapping

Always map the actual data-object property names to `xName` and `yName`.

```typescript
public data: Object[] = [
  { timestamp: new Date(2023, 0, 1), measurement: 100 },
  { timestamp: new Date(2023, 0, 2), measurement: 120 }
];
```

```html
<e-rangenavigator-series
  [dataSource]="data"
  xName="timestamp"
  yName="measurement"
  type="Area">
</e-rangenavigator-series>
```

When the x-values are JavaScript `Date` objects, set `valueType="DateTime"` on the Range Navigator and inject `DateTimeService`.

### Custom Series Naming

```html
<e-rangenavigator-series
  [dataSource]="data"
  xName="date"
  yName="value"
  type="Area"
  name="Revenue">
</e-rangenavigator-series>
```

## Series Styling

### Color, Fill, Width, Border, and Opacity

```html
<e-rangenavigator-series
  [dataSource]="data"
  xName="x"
  yName="y"
  type="Area"
  fill="#2ecc71"
  [width]="2"
  [opacity]="0.7"
  [border]="{ color: '#27ae60', width: 2 }">
</e-rangenavigator-series>
```

### Gradient Fill

A gradient fill must reference an SVG gradient definition available in the rendered document.

```html
<svg width="0" height="0" aria-hidden="true">
  <defs>
    <linearGradient id="rangeGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.9"></stop>
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.1"></stop>
    </linearGradient>
  </defs>
</svg>

<e-rangenavigator-series
  [dataSource]="data"
  xName="x"
  yName="y"
  type="Area"
  fill="url(#rangeGradient)">
</e-rangenavigator-series>
```

## Best Practices

1. **Choose the appropriate series type:**
   - Use `Area` for filled continuous trends.
   - Use `Line` for direct trend visualization.
   - Use `StepLine` for discrete state changes.
   - Use `Spline` for smoothly varying trends.
   - Use `SplineArea` when both smoothness and magnitude need emphasis.
   - Use `Column` for discrete or category-based comparisons.

2. **Map data fields correctly:** Ensure that `xName` and `yName` match the source-object property names exactly.

3. **Inject required services:** Provide the service for every series type and axis value type used by the component.

4. **Keep multiple-series displays readable:** Use a small number of visually distinct series and avoid excessive overlap.

5. **Handle empty values intentionally:** Clean, interpolate, or otherwise process null and undefined values according to the application's requirements.

6. **Optimize large datasets:** Aggregate or sample very large datasets before binding them when full data-point density is unnecessary.

7. **Use immutable updates:** Assign a new array when dynamically updating data so Angular change detection can identify the update reliably.

## Service Provider Reference

Each series type requires its corresponding service.

| Series Type | Required Service |
|-------------|------------------|
| `Area` | `AreaSeriesService` |
| `Line` | `LineSeriesService` |
| `StepLine` | `StepLineSeriesService` |
| `Spline` | `SplineSeriesService` |
| `SplineArea` | `SplineAreaSeriesService` |
| `Column` | `ColumnSeriesService` |

```typescript
import {
  AreaSeriesService,
  ColumnSeriesService,
  DateTimeService,
  LineSeriesService,
  RangeTooltipService,
  SplineAreaSeriesService,
  SplineSeriesService,
  StepLineSeriesService
} from '@syncfusion/ej2-angular-charts';

@Component({
  providers: [
    AreaSeriesService,
    LineSeriesService,
    StepLineSeriesService,
    SplineSeriesService,
    SplineAreaSeriesService,
    ColumnSeriesService,
    DateTimeService,
    RangeTooltipService
  ]
})
export class MyComponent {}
```

Only include `DateTimeService` when using a DateTime axis and `RangeTooltipService` when Range Navigator tooltips are enabled.
