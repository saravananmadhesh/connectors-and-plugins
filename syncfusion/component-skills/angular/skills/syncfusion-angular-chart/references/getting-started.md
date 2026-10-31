# Getting Started with Syncfusion Angular Chart

This guide covers the complete setup process for integrating the Syncfusion Angular Chart component into your Angular application, from installation through creating your first chart.

## Table of Contents

- [When to Use This Skill](#when-to-use-this-skill)
- [Installing Syncfusion Chart Package](#installing-syncfusion-chart-package)
- [Package Setup](#package-setup)
- [Creating Your First Chart](#creating-your-first-chart)
- [Service Injection Required for Full Functionality](#service-injection-required-for-full-functionality)
  - [Understanding Services](#understanding-services)
  - [Service Injection Pattern](#service-injection-pattern)
  - [Common Service Injection Mistakes](#common-service-injection-mistakes)
  - [Quick Reference Services by Chart Type](#quick-reference-services-by-chart-type)
  - [Complete Service List](#complete-service-list)
- [Code Snippet Standards for Sample Creation](#code-snippet-standards-for-sample-creation)
  - [1 Minimal Module Injection Principle](#1-minimal-module-injection-principle)
    - [Correct Line Chart with Minimal Services](#correct-line-chart-with-minimal-services)
    - [Incorrect Line Chart with Unnecessary Services](#incorrect-line-chart-with-unnecessary-services)
  - [2 Service Dependency Checklist](#2-service-dependency-checklist)
  - [3 Property Binding and Initialization Standards](#3-property-binding-and-initialization-standards)
    - [Correct Properties Declared in Component Class](#correct-properties-declared-in-component-class)
    - [Incorrect Properties Defined Inline in Template](#incorrect-properties-defined-inline-in-template)
  - [4 Data Source Configuration Standards](#4-data-source-configuration-standards)
    - [Correct Data in Component Class](#correct-data-in-component-class)
    - [Incorrect Data Hardcoded in Template](#incorrect-data-hardcoded-in-template)
  - [5 Template Formatting Standards](#5-template-formatting-standards)
    - [Correct Well-Formatted Template](#correct-well-formatted-template)
    - [Incorrect Cramped or Poorly Formatted Template](#incorrect-cramped-or-poorly-formatted-template)
  - [6 Component Structure Order](#6-component-structure-order)
  - [7 Naming Conventions](#7-naming-conventions)
  - [8 Sample Validation Checklist](#8-sample-validation-checklist)
  - [Example Complete Audit of Chart Sample](#example-complete-audit-of-chart-sample)
  - [Minimal Working Example](#minimal-working-example)
- [Running the Application](#running-the-application)
- [Understanding the Chart Structure](#understanding-the-chart-structure)
  - [Key Components](#key-components)
  - [Essential Properties](#essential-properties)
- [Module Injection](#module-injection)
  - [Inject Services](#inject-services)
  - [Series Services](#series-services)
  - [Axis Services](#axis-services)
  - [User Interaction Services](#user-interaction-services)
  - [Label and Annotation Services](#label-and-annotation-services)
  - [Legend Service](#legend-service)
  - [Technical Indicator Services](#technical-indicator-services)
  - [Analysis Services](#analysis-services)
  - [Export Service](#export-service)
  - [Example Full Chart Service Injection](#example-full-chart-service-injection)
- [Interfaces](#interfaces)
  - [Chart Configuration Interfaces](#chart-configuration-interfaces)
  - [Axis Interfaces](#axis-interfaces)
  - [Series Interfaces](#series-interfaces)
  - [Tooltip and Crosshair Interfaces](#tooltip-and-crosshair-interfaces)
  - [Legend Interface](#legend-interface)
  - [Zoom and Selection Interfaces](#zoom-and-selection-interfaces)
  - [Annotation Interface](#annotation-interface)
  - [Analysis Interfaces](#analysis-interfaces)
  - [Technical Indicator Interface](#technical-indicator-interface)
  - [Lifecycle Event Interfaces](#lifecycle-event-interfaces)
  - [Series and Point Event Interfaces](#series-and-point-event-interfaces)
  - [Axis Event Interfaces](#axis-event-interfaces)
  - [Tooltip Event Interfaces](#tooltip-event-interfaces)
  - [Legend Event Interfaces](#legend-event-interfaces)
  - [Interaction Event Interfaces](#interaction-event-interfaces)
  - [Annotation Event Interface](#annotation-event-interface)
  - [Export and Print Event Interfaces](#export-and-print-event-interfaces)
  - [Animation Event Interface](#animation-event-interface)
  - [Example Importing Interfaces](#example-importing-interfaces)
- [Common Initial Configurations](#common-initial-configurations)
  - [Setting Chart Dimensions](#setting-chart-dimensions)
  - [Adding Multiple Series](#adding-multiple-series)
  - [Basic Tooltip](#basic-tooltip)
- [Troubleshooting](#troubleshooting)
  - [Chart Not Rendering](#chart-not-rendering)
  - [Module Not Found Error](#module-not-found-error)
  - [Build Errors with Standalone Components](#build-errors-with-standalone-components)
- [API Reference Summary](#api-reference-summary)
  - [Core Interfaces and Classes](#core-interfaces-and-classes)
  - [Essential Events](#essential-events)
  - [Enumerations](#enumerations)

## When to Use This Skill

Use this skill when you need to:

- **Set up Angular Chart** — Install and configure Syncfusion Chart in Angular projects
- **Install packages** — Add required npm packages
- **Configure modules** — Import ChartModule in Angular modules
- **Add CSS styles** — Include required Syncfusion stylesheets
- **Initialize chart** — Create first working chart component
- **Configure data binding** — Show how to bind data to chart
- **CSS troubleshooting** — Fix unstyled pager and other components

## Installing Syncfusion Chart Package

Install Syncfusion Angular chart component via npm:

```bash
npm install @syncfusion/ej2-angular-charts
```

## Package Setup

Import the ChartModule in your Angular module:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ChartModule],
  providers: []
})
export class AppModule { }
```

## Creating Your First Chart

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { CategoryService, LineSeriesService } from '@syncfusion/ej2-angular-charts';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [ChartModule],
  providers: [CategoryService, LineSeriesService],
  template: `
    <ejs-chart id="chart-container" [primaryXAxis]="primaryXAxis" [primaryYAxis]="primaryYAxis" [title]="title">
      <e-series-collection>
        <e-series [dataSource]="chartData" type="Line" xName="month" yName="sales"></e-series>
      </e-series-collection>
    </ejs-chart>
  `
})
export class AppComponent implements OnInit {
  public chartData?: Object[];
  public title?: string;
  public primaryXAxis?: Object;
  public primaryYAxis?: Object;

  ngOnInit(): void {
    this.chartData = [
      { month: 'Jan', sales: 35 },
      { month: 'Feb', sales: 28 },
      { month: 'Mar', sales: 34 },
      { month: 'Apr', sales: 32 },
      { month: 'May', sales: 40 },
      { month: 'Jun', sales: 32 },
      { month: 'Jul', sales: 35 },
      { month: 'Aug', sales: 55 },
      { month: 'Sep', sales: 38 },
      { month: 'Oct', sales: 30 },
      { month: 'Nov', sales: 25 },
      { month: 'Dec', sales: 32 }
    ];
    this.primaryXAxis = {
      interval: 1,
      valueType: 'Category'
    };
    this.primaryYAxis = {
      title: 'Sales'
    };
    this.title = 'Monthly Sales Comparison';
  }
}
```

## Service Injection Required for Full Functionality

**Critical:** Syncfusion Charts use service injection to enable specific features. Without registering required services, features like tooltips, legends, and specialized chart types will not work.

### Understanding Services

Services in Syncfusion Charts are feature modules that must be injected into the component to enable:

- Series rendering (`LineSeriesService`, `ColumnSeriesService`, etc.)
- Axis types (`CategoryService`, `DateTimeService`, `LogarithmicService`)
- Interactive features (`TooltipService`, `ZoomService`, `SelectionService`)
- Chart elements (`LegendService`, `DataLabelService`)

**Key Principle:** Only inject services for features you actually use. This optimizes your bundle size.

### Service Injection Pattern

Add services to the component's `providers` array:

```typescript
import { Component } from '@angular/core';
import {
  ChartModule,
  LineSeriesService,
  CategoryService,
  LegendService,
  TooltipService,
  DataLabelService
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [ChartModule],
  providers: [
    LineSeriesService,
    CategoryService,
    LegendService,
    TooltipService,
    DataLabelService
  ],
  template: `
    <ejs-chart [tooltip]="tooltip">
      <e-series-collection>
        <e-series type="Line"></e-series>
      </e-series-collection>
    </ejs-chart>
  `
})
export class ChartComponent {
  public tooltip = { enable: true };
}
```

### Common Service Injection Mistakes

**Mistake 1: Forgetting `TooltipService`**

```typescript
// This won't work - tooltip won't display
@Component({
  providers: [LineSeriesService, CategoryService, LegendService]
  // Missing TooltipService!
})
export class ChartComponent {
  public tooltip = { enable: true };
}
```

Correct:

```typescript
@Component({
  providers: [
    LineSeriesService,
    CategoryService,
    LegendService,
    TooltipService
  ]
})
```

**Mistake 2: Forgetting `CategoryService` for category axes**

```typescript
// This will cause axis rendering errors
@Component({
  providers: [LineSeriesService, LegendService]
})
export class ChartComponent {
  public primaryXAxis = { valueType: 'Category' };
}
```

Correct:

```typescript
@Component({
  providers: [
    LineSeriesService,
    CategoryService,
    LegendService
  ]
})
```

**Mistake 3: Using the wrong service name**

```typescript
// Wrong - service name is incorrect
import { CategorySeriesService } from '@syncfusion/ej2-angular-charts';
providers: [CategorySeriesService]

// Correct names
import { CategoryService } from '@syncfusion/ej2-angular-charts';
import { LineSeriesService } from '@syncfusion/ej2-angular-charts';
providers: [CategoryService, LineSeriesService]
```

### Quick Reference Services by Chart Type

**Line Chart:**

```typescript
providers: [LineSeriesService, CategoryService, LegendService, TooltipService]
```

**Column Chart:**

```typescript
providers: [ColumnSeriesService, CategoryService, LegendService, TooltipService]
```

**Area Chart:**

```typescript
providers: [AreaSeriesService, CategoryService, LegendService, TooltipService]
```

**Bar Chart:**

```typescript
providers: [BarSeriesService, CategoryService, LegendService, TooltipService]
```

**DateTime-based Line Chart:**

```typescript
providers: [LineSeriesService, DateTimeService, LegendService, TooltipService]
// Use DateTimeService instead of CategoryService
```

### Complete Service List

| Service | Feature | When to Use |
|---------|---------|-------------|
| `LineSeriesService` | Line charts | Line, spline, step line series |
| `ColumnSeriesService` | Column charts | Vertical bar/column series |
| `BarSeriesService` | Horizontal bar charts | Horizontal bar series |
| `AreaSeriesService` | Area charts | Filled area series |
| `ScatterSeriesService` | Scatter plots | Scattered x,y data |
| `BubbleSeriesService` | Bubble charts | Multi-dimensional data |
| `PieSeriesService` | Pie charts | Pie/doughnut charts |
| `CategoryService` | Category axis | Text-based x-axis labels |
| `DateTimeService` | DateTime axis | Date-time x-axis values |
| `LogarithmicService` | Logarithmic axis | Log-scale y-axis |
| `LegendService` | Legend display | Show/hide series in legend |
| `TooltipService` | Hover tooltips | Data point details on hover |
| `DataLabelService` | Data labels | Labels on data points |
| `ZoomService` | Zooming | Selection/mouse wheel zoom |
| `ScrollBarService` | Scrollbar | Navigate zoomed chart |
| `SelectionService` | Point selection | Click to select points |
| `CrosshairService` | Crosshair | Vertical/horizontal line on hover |
| `ExportService` | Export charts | PDF, PNG, SVG, Excel export |
| `AnnotationService` | Annotations | Text/shapes on chart |
| `TrendlinesService` | Trendlines | Linear, polynomial trendlines |
| `TechnicalIndicatorService` | Technical indicators | RSI, MACD, Bollinger Bands |
| `StripLineService` | Striplines | Highlight axis ranges |

## Code Snippet Standards for Sample Creation

This section establishes strict guidelines for creating Syncfusion Angular Chart samples to ensure consistency, maintainability, and optimal performance across all documentation and examples.

### 1 Minimal Module Injection Principle

**Rule:** Inject only the modules and services required for the specific sample functionality. Do not inject unnecessary services.

#### Correct Line Chart with Minimal Services

```typescript
import { Component } from '@angular/core';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { CategoryService, LineSeriesService } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [ChartModule],
  providers: [CategoryService, LineSeriesService],
  template: `<ejs-chart>...</ejs-chart>`
})
export class LineChartComponent { }
```

#### Incorrect Line Chart with Unnecessary Services

```typescript
@Component({
  providers: [
    CategoryService,
    LineSeriesService,
    SplineSeriesService,
    StackingLineSeriesService,
    ColumnSeriesService,
    StepLineSeriesService,
    DateTimeService,
    SplineAreaSeriesService
  ]
})
export class LineChartComponent { }
```

### 2 Service Dependency Checklist

Before finalizing a sample, verify that each injected service is actually used:

| Service | Used? | Required in Template/Code |
|---------|-------|---------------------------|
| Series Services (Line, Column, Area, etc.) | Yes | Type must match the series type used |
| Axis Services (Category, DateTime, Logarithmic) | Yes | Required if that axis type is configured |
| Interactive Services (Tooltip, Zoom, Selection, Crosshair) | Yes | Required if the feature is enabled in the template |
| Display Services (Legend, DataLabel, Annotation) | Yes | Required if the element is visible in the template |
| Export/Print Services (Export, Print) | Yes | Required only if export/print functionality is implemented |

**Audit Script:**

```typescript
// Before committing sample code, verify:
// 1. For each @Component provider, find its usage in template or component class
// 2. If no usage found, remove the service from providers array
// 3. For each enabled feature (e.g., tooltip: { enable: true }), verify service is injected
```

### 3 Property Binding and Initialization Standards

**Rule:** All configuration values must be declared in the component class and bound to the template using property binding syntax. Never define property values inline in the template.

#### Correct Properties Declared in Component Class

```typescript
import { Component } from '@angular/core';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { CategoryService, LineSeriesService, TooltipService } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [ChartModule],
  providers: [CategoryService, LineSeriesService, TooltipService],
  template: `
    <ejs-chart
      [primaryXAxis]="primaryXAxis"
      [primaryYAxis]="primaryYAxis"
      [title]="title"
      [tooltip]="tooltip"
      [width]="chartWidth"
      [height]="chartHeight">
      <e-series-collection>
        <e-series
          [dataSource]="chartData"
          type="Line"
          xName="month"
          yName="sales"
          name="Monthly Sales"
          [marker]="marker">
        </e-series>
      </e-series-collection>
    </ejs-chart>
  `
})
export class ChartComponent {
  public chartData = [
    { month: 'Jan', sales: 35 },
    { month: 'Feb', sales: 28 },
    { month: 'Mar', sales: 34 }
  ];

  public title = 'Monthly Sales Report';
  public chartWidth = '100%';
  public chartHeight = '400px';

  public primaryXAxis = {
    valueType: 'Category',
    title: 'Month'
  };

  public primaryYAxis = {
    title: 'Sales Amount',
    minimum: 0,
    maximum: 50
  };

  public tooltip = {
    enable: true,
    format: '${point.x}: ${point.y}'
  };

  public marker = {
    visible: true,
    width: 8,
    height: 8
  };
}
```

#### Incorrect Properties Defined Inline in Template

```typescript
// Avoid this pattern
@Component({
  template: `
    <ejs-chart
      [primaryXAxis]="{ valueType: 'Category', title: 'Month' }"
      [primaryYAxis]="{ title: 'Sales', minimum: 0 }"
      [title]="'Monthly Sales Report'"
      [width]="'100%'"
      [height]="'400px'"
      [tooltip]="{ enable: true, format: '${point.x}: ${point.y}' }">
      <e-series-collection>
        <e-series
          [dataSource]="[
            { month: 'Jan', sales: 35 },
            { month: 'Feb', sales: 28 }
          ]"
          [marker]="{ visible: true, width: 8 }">
        </e-series>
      </e-series-collection>
    </ejs-chart>
  `
})
export class ChartComponent { }
```

**Why This Matters:**

- Improves readability and maintainability
- Enables easy updates to configuration
- Follows Angular best practices
- Simplifies template logic
- Better performance with change detection
- Easier to test and debug

### 4 Data Source Configuration Standards

**Rule:** All data arrays must be declared as component properties and initialized in the component class.

#### Correct Data in Component Class

```typescript
export class ChartComponent {
  public chartData: any[] = [];

  ngOnInit(): void {
    this.chartData = [
      { month: 'Jan', sales: 35, profit: 10 },
      { month: 'Feb', sales: 28, profit: 8 },
      { month: 'Mar', sales: 34, profit: 12 }
    ];
  }
}
```

#### Incorrect Data Hardcoded in Template

```typescript
// Avoid - Data hardcoded inline
@Component({
  template: `
    <e-series
      [dataSource]="[
        { month: 'Jan', sales: 35, profit: 10 },
        { month: 'Feb', sales: 28, profit: 8 }
      ]">
    </e-series>
  `
})
export class ChartComponent { }
```

### 5 Template Formatting Standards

**Rule:** Templates must be properly formatted with consistent indentation and whitespace for readability.

#### Correct Well-Formatted Template

```typescript
@Component({
  template: `
    <ejs-chart
      [primaryXAxis]="primaryXAxis"
      [primaryYAxis]="primaryYAxis"
      [title]="title"
      [tooltip]="tooltip">
      <e-series-collection>
        <e-series
          [dataSource]="chartData"
          type="Line"
          xName="month"
          yName="sales"
          name="Sales">
        </e-series>
      </e-series-collection>
    </ejs-chart>
  `
})
export class ChartComponent { }
```

#### Incorrect Cramped or Poorly Formatted Template

```typescript
@Component({
  template: `<ejs-chart [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis'[title]='title'><e-series-collection><e-series [dataSource]='chartData' type='Line' xName='month' yName='sales'></e-series></e-series-collection></ejs-chart>`
})
export class ChartComponent { }
```

### 6 Component Structure Order

**Rule:** Maintain consistent ordering of component members for clarity:

```typescript
@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [ChartModule],
  providers: [/* ONLY required services */],
  template: `<!-- Template here -->`
})
export class ChartComponent implements OnInit {
  // 1. Public properties for data
  public chartData?: any[];

  // 2. Chart configuration properties
  public title?: string;
  public primaryXAxis?: any;
  public primaryYAxis?: any;

  // 3. Feature-specific properties
  public tooltip?: any;
  public legend?: any;
  public marker?: any;

  // 4. Component methods
  constructor() { }

  ngOnInit(): void {
    this.initializeChart();
  }

  private initializeChart(): void {
    this.chartData = [ /* data */ ];
    this.title = 'Chart Title';
  }
}
```

### 7 Naming Conventions

**Rule:** Use consistent, descriptive naming for all properties and methods:

| Element | Convention | Example |
|---------|------------|---------|
| Chart data | `chartData`, `data`, `seriesData` | `public chartData: any[] = []` |
| Axis config | `primaryXAxis`, `primaryYAxis` | `public primaryXAxis = { ... }` |
| Series config | `seriesConfig`, `markerSettings` | `public marker = { visible: true }` |
| Chart title | `title`, `chartTitle` | `public title = 'Sales Chart'` |
| Width/Height | `chartWidth`, `chartHeight` | `public chartWidth = '100%'` |
| Feature settings | `tooltip`, `legend`, `annotation` | `public tooltip = { enable: true }` |

### 8 Sample Validation Checklist

Before publishing any sample, verify:

- [ ] Only required services are injected — No unnecessary service dependencies
- [ ] All properties are declared in component — No inline property definitions in template
- [ ] Template is properly formatted — Consistent indentation and whitespace
- [ ] Component member order is consistent — Data → Config → Methods
- [ ] Property names follow conventions — Descriptive and predictable names
- [ ] Data initialization is clear — Values assigned in `ngOnInit` or constructor
- [ ] All bound properties are declared — No undefined property errors
- [ ] Services match used features — Tooltip enabled requires `TooltipService`
- [ ] Code comments explain complex logic — Helpful for developers
- [ ] Sample runs without console errors — Verified in browser DevTools

### Example Complete Audit of Chart Sample

```typescript
import { Component, OnInit } from '@angular/core';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { CategoryService, ColumnSeriesService, TooltipService } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-column-chart',
  standalone: true,
  imports: [ChartModule],
  providers: [CategoryService, ColumnSeriesService, TooltipService],
  template: `
    <ejs-chart
      [primaryXAxis]="primaryXAxis"
      [primaryYAxis]="primaryYAxis"
      [title]="title"
      [tooltip]="tooltip"
      [width]="chartWidth"
      [height]="chartHeight">
      <e-series-collection>
        <e-series
          [dataSource]="chartData"
          type="Column"
          xName="product"
          yName="revenue"
          name="Revenue">
        </e-series>
      </e-series-collection>
    </ejs-chart>
  `
})
export class ColumnChartComponent implements OnInit {
  public chartData?: any[];

  public title = 'Product Revenue';
  public chartWidth = '100%';
  public chartHeight = '400px';

  public primaryXAxis = {
    valueType: 'Category',
    title: 'Products'
  };

  public primaryYAxis = {
    title: 'Revenue ($)',
    minimum: 0,
    maximum: 1000
  };

  public tooltip = {
    enable: true,
    format: '${point.x}: $${point.y}'
  };

  ngOnInit(): void {
    this.initializeChart();
  }

  private initializeChart(): void {
    this.chartData = [
      { product: 'Product A', revenue: 500 },
      { product: 'Product B', revenue: 750 },
      { product: 'Product C', revenue: 300 }
    ];
  }
}
```

**Audit Results:**

- Services: All injected services (`CategoryService`, `ColumnSeriesService`, `TooltipService`) are used
- Properties: All chart properties (`primaryXAxis`, `primaryYAxis`, `title`, `tooltip`, `width`, `height`) are declared in class
- Data: Chart data is initialized in `ngOnInit()` method in the component class
- Template: Clean, properly formatted with property binding syntax
- Features: Tooltip is enabled and corresponding service is injected
- Ready for production use

### Minimal Working Example

```typescript
import { Component } from '@angular/core';
import {
  ChartModule,
  LineSeriesService,
  CategoryService,
  LegendService,
  TooltipService
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [ChartModule],
  providers: [
    LineSeriesService,
    CategoryService,
    LegendService,
    TooltipService
  ],
  template: `
    <ejs-chart [tooltip]="tooltip">
      <e-series-collection>
        <e-series
          [dataSource]="data"
          type="Line"
          xName="month"
          yName="sales"
          name="Sales">
        </e-series>
      </e-series-collection>
    </ejs-chart>
  `
})
export class LineChartComponent {
  public tooltip = { enable: true };

  public data = [
    { month: 'Jan', sales: 35 },
    { month: 'Feb', sales: 28 },
    { month: 'Mar', sales: 34 }
  ];
}
```

## Running the Application

Start the development server:

```bash
ng serve
```

Open your browser and navigate to:

```text
http://localhost:4200
```

You should see your chart rendered with the sample data.

## Understanding the Chart Structure

### Key Components

**1. Chart Container (`<ejs-chart>`)**

- Main chart component
- Contains all chart configuration
- API Reference: See [ChartModel](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel) for all available properties

**2. Series Collection (`<e-series-collection>`)**

- Container for one or more series
- Each series represents a data set
- API Reference: See [SeriesDirective](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective)

**3. Individual Series (`<e-series>`)**

- Defines data source, type, and configuration
- Multiple series can be added for comparison
- API Reference: See [Series](https://ej2.syncfusion.com/angular/documentation/api/chart/series) for all series properties

### Essential Properties

**Chart Level Properties:**

| Property | Type | Description | API Reference |
|----------|------|-------------|---------------|
| `primaryXAxis` | AxisModel | X-axis configuration including valueType, title, range, labels | [AxisModel](https://ej2.syncfusion.com/angular/documentation/api/chart/axisModel) |
| `primaryYAxis` | AxisModel | Y-axis configuration including title, range, format, intervals | [AxisModel](https://ej2.syncfusion.com/angular/documentation/api/chart/axisModel) |
| `title` | string | Chart title text displayed at the top | [title](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#title) |
| `width` | string | Chart width, such as `100%` or `800px` | [width](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#width) |
| `height` | string | Chart height, such as `400px` | [height](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#height) |
| `dataSource` | Object[] \| DataManager | Data source for the chart | [dataSource](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#dataSource) |
| `tooltip` | TooltipSettingsModel | Tooltip configuration | [TooltipSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/tooltipSettingsModel) |
| `legend` | LegendSettingsModel | Legend configuration | [LegendSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/legendSettingsModel) |

**Series Level Properties:**

| Property | Type | Default | Description | API Reference |
|----------|------|---------|-------------|---------------|
| `dataSource` | Object[] \| DataManager | `''` | Data array or DataManager instance | [dataSource](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#dataSource) |
| `type` | ChartSeriesType | `Line` | Chart type: Line, Column, Bar, Area, Pie, etc. | [type](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#type) |
| `xName` | string | `''` | Property name for x-axis values in data objects | [xName](https://ej2.syncfusion.com/angular/documentation/api/chart/series#xName) |
| `yName` | string | `''` | Property name for y-axis values in data objects | [yName](https://ej2.syncfusion.com/angular/documentation/api/chart/series#yName) |
| `name` | string | `''` | Series name displayed in legend and tooltip | [name](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#name) |
| `width` | number | `2` | Line width for line-based series | [width](https://ej2.syncfusion.com/angular/documentation/api/chart/series#width) |
| `fill` | string | `null` | Series fill color | [fill](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#fill) |
| `opacity` | number | `1` | Series opacity from 0 to 1 | [opacity](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#opacity) |
| `marker` | MarkerSettingsModel | `-` | Marker configuration for data points | [MarkerSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/markerSettingsModel) |

## Module Injection

Angular Chart features are modular and require service injection to enable them. This reduces bundle size by loading only the required chart series, axis types, indicators, and interactive features.

### Inject Services

```typescript
import { Component } from '@angular/core';
import {
  ChartModule,
  LineSeriesService,
  ColumnSeriesService,
  CategoryService,
  LegendService,
  TooltipService,
  DataLabelService
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChartModule],
  providers: [
    LineSeriesService,
    ColumnSeriesService,
    CategoryService,
    LegendService,
    TooltipService,
    DataLabelService
  ],
  template: `
    <ejs-chart [primaryXAxis]="primaryXAxis">
      <e-series-collection>
        <e-series
          [dataSource]="data"
          xName="x"
          yName="y"
          type="Line"
          name="Sales">
        </e-series>
      </e-series-collection>
    </ejs-chart>
  `
})
export class AppComponent {
  public primaryXAxis: Object = {
    valueType: 'Category'
  };

  public data: Object[] = [
    { x: 'Jan', y: 35 },
    { x: 'Feb', y: 28 },
    { x: 'Mar', y: 34 },
    { x: 'Apr', y: 32 }
  ];
}
```

### Series Services

| Service | Purpose | Import package |
|---------|---------|----------------|
| `LineSeriesService` | Enable line chart series | `@syncfusion/ej2-angular-charts` |
| `ColumnSeriesService` | Enable column chart series | `@syncfusion/ej2-angular-charts` |
| `BarSeriesService` | Enable bar chart series | `@syncfusion/ej2-angular-charts` |
| `AreaSeriesService` | Enable area chart series | `@syncfusion/ej2-angular-charts` |
| `SplineSeriesService` | Enable spline chart series | `@syncfusion/ej2-angular-charts` |
| `SplineAreaSeriesService` | Enable spline area chart series | `@syncfusion/ej2-angular-charts` |
| `StepLineSeriesService` | Enable step line chart series | `@syncfusion/ej2-angular-charts` |
| `StepAreaSeriesService` | Enable step area chart series | `@syncfusion/ej2-angular-charts` |
| `ScatterSeriesService` | Enable scatter chart series | `@syncfusion/ej2-angular-charts` |
| `BubbleSeriesService` | Enable bubble chart series | `@syncfusion/ej2-angular-charts` |
| `RangeColumnSeriesService` | Enable range column chart series | `@syncfusion/ej2-angular-charts` |
| `RangeAreaSeriesService` | Enable range area chart series | `@syncfusion/ej2-angular-charts` |
| `SplineRangeAreaSeriesService` | Enable spline range area chart series | `@syncfusion/ej2-angular-charts` |
| `HiloSeriesService` | Enable high-low chart series | `@syncfusion/ej2-angular-charts` |
| `HiloOpenCloseSeriesService` | Enable high-low-open-close chart series | `@syncfusion/ej2-angular-charts` |
| `CandleSeriesService` | Enable candle chart series | `@syncfusion/ej2-angular-charts` |
| `WaterfallSeriesService` | Enable waterfall chart series | `@syncfusion/ej2-angular-charts` |
| `HistogramSeriesService` | Enable histogram chart series | `@syncfusion/ej2-angular-charts` |
| `BoxAndWhiskerSeriesService` | Enable box and whisker chart series | `@syncfusion/ej2-angular-charts` |
| `ParetoSeriesService` | Enable Pareto chart series | `@syncfusion/ej2-angular-charts` |
| `PolarSeriesService` | Enable polar chart series | `@syncfusion/ej2-angular-charts` |
| `RadarSeriesService` | Enable radar chart series | `@syncfusion/ej2-angular-charts` |
| `StackingLineSeriesService` | Enable stacked line and 100% stacked line chart series | `@syncfusion/ej2-angular-charts` |
| `StackingColumnSeriesService` | Enable stacked column and 100% stacked column chart series | `@syncfusion/ej2-angular-charts` |
| `StackingBarSeriesService` | Enable stacked bar and 100% stacked bar chart series | `@syncfusion/ej2-angular-charts` |
| `StackingAreaSeriesService` | Enable stacked area and 100% stacked area chart series | `@syncfusion/ej2-angular-charts` |
| `StackingStepAreaSeriesService` | Enable stacked step area and 100% stacked step area chart series | `@syncfusion/ej2-angular-charts` |
| `MultiColoredLineSeriesService` | Enable multi-colored line chart series | `@syncfusion/ej2-angular-charts` |
| `MultiColoredAreaSeriesService` | Enable multi-colored area chart series | `@syncfusion/ej2-angular-charts` |

### Axis Services

| Service | Purpose | Import package |
|---------|---------|----------------|
| `CategoryService` | Enable category axis | `@syncfusion/ej2-angular-charts` |
| `DateTimeService` | Enable date-time axis | `@syncfusion/ej2-angular-charts` |
| `DateTimeCategoryService` | Enable date-time category axis | `@syncfusion/ej2-angular-charts` |
| `LogarithmicService` | Enable logarithmic axis | `@syncfusion/ej2-angular-charts` |
| `MultiLevelLabelService` | Enable multi-level axis labels | `@syncfusion/ej2-angular-charts` |
| `StripLineService` | Enable strip line support in chart axes | `@syncfusion/ej2-angular-charts` |
| `ScrollBarService` | Enable scrollbar support for chart axes | `@syncfusion/ej2-angular-charts` |

### User Interaction Services

| Service | Purpose | Import package |
|---------|---------|----------------|
| `TooltipService` | Enable tooltip and trackball support | `@syncfusion/ej2-angular-charts` |
| `CrosshairService` | Enable crosshair interaction | `@syncfusion/ej2-angular-charts` |
| `ZoomService` | Enable zooming and panning | `@syncfusion/ej2-angular-charts` |
| `SelectionService` | Enable point or series selection | `@syncfusion/ej2-angular-charts` |
| `HighlightService` | Enable point or series highlighting | `@syncfusion/ej2-angular-charts` |
| `DataEditingService` | Enable interactive data editing by dragging chart points | `@syncfusion/ej2-angular-charts` |

### Label and Annotation Services

| Service | Purpose | Import package |
|---------|---------|----------------|
| `DataLabelService` | Enable data labels for chart points | `@syncfusion/ej2-angular-charts` |
| `LastValueLabelService` | Enable last value labels for chart series | `@syncfusion/ej2-angular-charts` |
| `ChartAnnotationService` | Enable annotations in chart | `@syncfusion/ej2-angular-charts` |

### Legend Service

| Service | Purpose | Import package |
|---------|---------|----------------|
| `LegendService` | Enable chart legend | `@syncfusion/ej2-angular-charts` |

### Technical Indicator Services

| Service | Purpose | Import package |
|---------|---------|----------------|
| `SmaIndicatorService` | Enable Simple Moving Average indicator | `@syncfusion/ej2-angular-charts` |
| `EmaIndicatorService` | Enable Exponential Moving Average indicator | `@syncfusion/ej2-angular-charts` |
| `TmaIndicatorService` | Enable Triangular Moving Average indicator | `@syncfusion/ej2-angular-charts` |
| `AtrIndicatorService` | Enable Average True Range indicator | `@syncfusion/ej2-angular-charts` |
| `AccumulationDistributionIndicatorService` | Enable Accumulation Distribution indicator | `@syncfusion/ej2-angular-charts` |
| `BollingerBandsService` | Enable Bollinger Bands indicator | `@syncfusion/ej2-angular-charts` |
| `MacdIndicatorService` | Enable MACD indicator | `@syncfusion/ej2-angular-charts` |
| `MomentumIndicatorService` | Enable Momentum indicator | `@syncfusion/ej2-angular-charts` |
| `RsiIndicatorService` | Enable Relative Strength Index indicator | `@syncfusion/ej2-angular-charts` |
| `StochasticIndicatorService` | Enable Stochastic indicator | `@syncfusion/ej2-angular-charts` |

### Analysis Services

| Service | Purpose | Import package |
|---------|---------|----------------|
| `TrendlinesService` | Enable trendline support | `@syncfusion/ej2-angular-charts` |
| `ErrorBarService` | Enable error bar support | `@syncfusion/ej2-angular-charts` |

### Export Service

| Service | Purpose | Import package |
|---------|---------|----------------|
| `ExportService` | Enable chart export support | `@syncfusion/ej2-angular-charts` |

### Example Full Chart Service Injection

```typescript
import { Component } from '@angular/core';
import {
  ChartModule,
  LineSeriesService,
  ColumnSeriesService,
  BarSeriesService,
  AreaSeriesService,
  SplineSeriesService,
  SplineAreaSeriesService,
  StepLineSeriesService,
  StepAreaSeriesService,
  ScatterSeriesService,
  BubbleSeriesService,
  RangeColumnSeriesService,
  RangeAreaSeriesService,
  SplineRangeAreaSeriesService,
  HiloSeriesService,
  HiloOpenCloseSeriesService,
  CandleSeriesService,
  WaterfallSeriesService,
  HistogramSeriesService,
  BoxAndWhiskerSeriesService,
  ParetoSeriesService,
  PolarSeriesService,
  RadarSeriesService,
  StackingLineSeriesService,
  StackingColumnSeriesService,
  StackingBarSeriesService,
  StackingAreaSeriesService,
  StackingStepAreaSeriesService,
  MultiColoredLineSeriesService,
  MultiColoredAreaSeriesService,
  CategoryService,
  DateTimeService,
  DateTimeCategoryService,
  LogarithmicService,
  MultiLevelLabelService,
  StripLineService,
  ScrollBarService,
  TooltipService,
  CrosshairService,
  ZoomService,
  SelectionService,
  HighlightService,
  DataEditingService,
  DataLabelService,
  LastValueLabelService,
  ChartAnnotationService,
  LegendService,
  SmaIndicatorService,
  EmaIndicatorService,
  TmaIndicatorService,
  AtrIndicatorService,
  AccumulationDistributionIndicatorService,
  BollingerBandsService,
  MacdIndicatorService,
  MomentumIndicatorService,
  RsiIndicatorService,
  StochasticIndicatorService,
  TrendlinesService,
  ErrorBarService,
  ExportService
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChartModule],
  providers: [
    LineSeriesService,
    ColumnSeriesService,
    BarSeriesService,
    AreaSeriesService,
    SplineSeriesService,
    SplineAreaSeriesService,
    StepLineSeriesService,
    StepAreaSeriesService,
    ScatterSeriesService,
    BubbleSeriesService,
    RangeColumnSeriesService,
    RangeAreaSeriesService,
    SplineRangeAreaSeriesService,
    HiloSeriesService,
    HiloOpenCloseSeriesService,
    CandleSeriesService,
    WaterfallSeriesService,
    HistogramSeriesService,
    BoxAndWhiskerSeriesService,
    ParetoSeriesService,
    PolarSeriesService,
    RadarSeriesService,
    StackingLineSeriesService,
    StackingColumnSeriesService,
    StackingBarSeriesService,
    StackingAreaSeriesService,
    StackingStepAreaSeriesService,
    MultiColoredLineSeriesService,
    MultiColoredAreaSeriesService,
    CategoryService,
    DateTimeService,
    DateTimeCategoryService,
    LogarithmicService,
    MultiLevelLabelService,
    StripLineService,
    ScrollBarService,
    TooltipService,
    CrosshairService,
    ZoomService,
    SelectionService,
    HighlightService,
    DataEditingService,
    DataLabelService,
    LastValueLabelService,
    ChartAnnotationService,
    LegendService,
    SmaIndicatorService,
    EmaIndicatorService,
    TmaIndicatorService,
    AtrIndicatorService,
    AccumulationDistributionIndicatorService,
    BollingerBandsService,
    MacdIndicatorService,
    MomentumIndicatorService,
    RsiIndicatorService,
    StochasticIndicatorService,
    TrendlinesService,
    ErrorBarService,
    ExportService
  ],
  template: `
    <ejs-chart>
      <e-series-collection>
        <e-series
          [dataSource]="data"
          xName="x"
          yName="y"
          type="Line"
          [lastValueLabel]="lastValueLabel">
        </e-series>
      </e-series-collection>
    </ejs-chart>
  `
})
export class AppComponent {
  public data: Object[] = [
    { x: 'Jan', y: 35 },
    { x: 'Feb', y: 28 },
    { x: 'Mar', y: 34 },
    { x: 'Apr', y: 32 }
  ];

  public lastValueLabel: Object = {
    enable: true
  };
}
```

## Interfaces

Angular Chart provides TypeScript interfaces to strongly type chart configuration, axis settings, series settings, labels, annotations, technical indicators, and event arguments.

### Chart Configuration Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `ChartModel` | Defines the complete configuration model for the Chart component | `@syncfusion/ej2-angular-charts` |
| `ChartAreaModel` | Defines chart area customization options such as background and border | `@syncfusion/ej2-angular-charts` |
| `MarginModel` | Defines margin settings for the chart | `@syncfusion/ej2-angular-charts` |
| `BorderModel` | Defines border color, width, and dash array settings | `@syncfusion/ej2-angular-charts` |
| `FontModel` | Defines font style, size, color, weight, and family settings | `@syncfusion/ej2-angular-charts` |
| `AnimationModel` | Defines animation duration, delay, and enable settings | `@syncfusion/ej2-angular-charts` |
| `ChartAccessibilityModel` | Defines accessibility settings for the chart | `@syncfusion/ej2-angular-charts` |

### Axis Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `AxisModel` | Defines configuration for primary and secondary chart axes | `@syncfusion/ej2-angular-charts` |
| `RowModel` | Defines row configuration for multi-row chart layout | `@syncfusion/ej2-angular-charts` |
| `ColumnModel` | Defines column configuration for multi-column chart layout | `@syncfusion/ej2-angular-charts` |
| `MajorGridLinesModel` | Defines major grid line settings for chart axes | `@syncfusion/ej2-angular-charts` |
| `MinorGridLinesModel` | Defines minor grid line settings for chart axes | `@syncfusion/ej2-angular-charts` |
| `MajorTickLinesModel` | Defines major tick line settings for chart axes | `@syncfusion/ej2-angular-charts` |
| `MinorTickLinesModel` | Defines minor tick line settings for chart axes | `@syncfusion/ej2-angular-charts` |
| `LineStyleModel` | Defines axis line style settings | `@syncfusion/ej2-angular-charts` |
| `LabelBorderModel` | Defines border settings for axis labels | `@syncfusion/ej2-angular-charts` |
| `StripLineSettingsModel` | Defines strip line settings for chart axes | `@syncfusion/ej2-angular-charts` |
| `MultiLevelLabelsModel` | Defines multi-level axis label settings | `@syncfusion/ej2-angular-charts` |
| `MultiLevelCategoriesModel` | Defines category range settings inside multi-level labels | `@syncfusion/ej2-angular-charts` |

### Series Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `SeriesModel` | Defines chart series configuration | `@syncfusion/ej2-angular-charts` |
| `MarkerSettingsModel` | Defines marker settings for chart series points | `@syncfusion/ej2-angular-charts` |
| `DataLabelSettingsModel` | Defines data label settings for chart points | `@syncfusion/ej2-angular-charts` |
| `LastValueLabelSettingsModel` | Defines last value label settings for chart series | `@syncfusion/ej2-angular-charts` |
| `EmptyPointSettingsModel` | Defines empty point behavior and appearance for chart series | `@syncfusion/ej2-angular-charts` |
| `CornerRadiusModel` | Defines corner radius settings for column-like series | `@syncfusion/ej2-angular-charts` |
| `ConnectorModel` | Defines connector line settings for labels | `@syncfusion/ej2-angular-charts` |
| `ParetoOptionsModel` | Defines Pareto chart-specific options | `@syncfusion/ej2-angular-charts` |
| `DragSettingsModel` | Defines data editing drag settings for chart series | `@syncfusion/ej2-angular-charts` |

### Tooltip and Crosshair Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `TooltipSettingsModel` | Defines chart tooltip settings | `@syncfusion/ej2-angular-charts` |
| `TooltipLocationModel` | Defines tooltip location settings | `@syncfusion/ej2-angular-charts` |
| `CrosshairSettingsModel` | Defines crosshair settings for chart interaction | `@syncfusion/ej2-angular-charts` |
| `CrosshairTooltipModel` | Defines tooltip settings displayed with the crosshair | `@syncfusion/ej2-angular-charts` |

### Legend Interface

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `LegendSettingsModel` | Defines chart legend settings | `@syncfusion/ej2-angular-charts` |

### Zoom and Selection Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `ZoomSettingsModel` | Defines zooming and panning behavior for chart | `@syncfusion/ej2-angular-charts` |
| `IndexesModel` | Defines series and point index information for selection and highlighting | `@syncfusion/ej2-angular-charts` |

### Annotation Interface

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `ChartAnnotationSettingsModel` | Defines annotation settings for chart | `@syncfusion/ej2-angular-charts` |

### Analysis Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `TrendlineModel` | Defines trendline settings for chart series | `@syncfusion/ej2-angular-charts` |
| `TrendlineMarkerModel` | Defines marker settings for trendline points | `@syncfusion/ej2-angular-charts` |
| `ErrorBarSettingsModel` | Defines error bar settings for chart series | `@syncfusion/ej2-angular-charts` |

### Technical Indicator Interface

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `TechnicalIndicatorModel` | Defines technical indicator settings such as SMA, EMA, RSI, MACD, Bollinger Bands, Momentum, ATR, TMA, Stochastic, and Accumulation Distribution indicators | `@syncfusion/ej2-angular-charts` |

### Lifecycle Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `ILoadEventArgs` | Defines event arguments for the chart load event | `@syncfusion/ej2-angular-charts` |
| `ILoadedEventArgs` | Defines event arguments after chart rendering is completed | `@syncfusion/ej2-angular-charts` |
| `IChartEventArgs` | Defines common chart event arguments | `@syncfusion/ej2-angular-charts` |
| `IResizeEventArgs` | Defines event arguments for chart resize events | `@syncfusion/ej2-angular-charts` |

### Series and Point Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IPointRenderEventArgs` | Defines event arguments used while rendering each chart point | `@syncfusion/ej2-angular-charts` |
| `ISeriesRenderEventArgs` | Defines event arguments used while rendering each chart series | `@syncfusion/ej2-angular-charts` |
| `IPointEventArgs` | Defines event arguments for chart point mouse and interaction events | `@syncfusion/ej2-angular-charts` |
| `ITextRenderEventArgs` | Defines event arguments used while rendering chart text such as data labels | `@syncfusion/ej2-angular-charts` |

### Axis Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IAxisLabelRenderEventArgs` | Defines event arguments used while rendering axis labels | `@syncfusion/ej2-angular-charts` |
| `IAxisMultiLabelRenderEventArgs` | Defines event arguments used while rendering multi-level axis labels | `@syncfusion/ej2-angular-charts` |
| `IAxisRangeCalculatedEventArgs` | Defines event arguments after axis range calculation | `@syncfusion/ej2-angular-charts` |

### Tooltip Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `ITooltipRenderEventArgs` | Defines event arguments used while rendering chart tooltip | `@syncfusion/ej2-angular-charts` |
| `ISharedTooltipRenderEventArgs` | Defines event arguments used while rendering shared tooltip content | `@syncfusion/ej2-angular-charts` |
| `ITooltipRenderCompleteEventArgs` | Defines event arguments after tooltip rendering is completed | `@syncfusion/ej2-angular-charts` |

### Legend Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `ILegendRenderEventArgs` | Defines event arguments used while rendering chart legend items | `@syncfusion/ej2-angular-charts` |
| `ILegendClickEventArgs` | Defines event arguments for legend click events | `@syncfusion/ej2-angular-charts` |

### Interaction Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IMouseEventArgs` | Defines event arguments for chart mouse events | `@syncfusion/ej2-angular-charts` |
| `ISelectionCompleteEventArgs` | Defines event arguments after point or series selection is completed | `@syncfusion/ej2-angular-charts` |
| `IZoomCompleteEventArgs` | Defines event arguments after zooming is completed | `@syncfusion/ej2-angular-charts` |
| `IScrollEventArgs` | Defines event arguments for chart scroll events | `@syncfusion/ej2-angular-charts` |
| `IScrollChangedEventArgs` | Defines event arguments after chart scroll position changes | `@syncfusion/ej2-angular-charts` |
| `IDragCompleteEventArgs` | Defines event arguments after chart point dragging is completed | `@syncfusion/ej2-angular-charts` |

### Annotation Event Interface

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IAnnotationRenderEventArgs` | Defines event arguments used while rendering chart annotations | `@syncfusion/ej2-angular-charts` |

### Export and Print Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IPrintEventArgs` | Defines event arguments for chart print events | `@syncfusion/ej2-angular-charts` |
| `IExportEventArgs` | Defines event arguments for chart export events | `@syncfusion/ej2-angular-charts` |

### Animation Event Interface

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IAnimationCompleteEventArgs` | Defines event arguments after chart animation is completed | `@syncfusion/ej2-angular-charts` |

### Example Importing Interfaces

```typescript
import {
  ChartModel,
  AxisModel,
  SeriesModel,
  TooltipSettingsModel,
  ILoadedEventArgs,
  IPointRenderEventArgs
} from '@syncfusion/ej2-angular-charts';

const primaryXAxis: AxisModel = {
  valueType: 'Category'
};

const tooltip: TooltipSettingsModel = {
  enable: true
};

const series: SeriesModel = {
  dataSource: [
    { x: 'Jan', y: 35 },
    { x: 'Feb', y: 28 },
    { x: 'Mar', y: 34 }
  ],
  xName: 'x',
  yName: 'y',
  type: 'Line'
};

const chartOptions: ChartModel = {
  primaryXAxis,
  tooltip,
  series: [series]
};

const loaded = (args: ILoadedEventArgs): void => {
  // Chart rendering completed.
};

const pointRender = (args: IPointRenderEventArgs): void => {
  // Customize each point before rendering.
};
```

## Common Initial Configurations

### Setting Chart Dimensions

The chart component supports flexible sizing through `width` and `height` properties.

**API Reference:** [width](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#width), [height](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#height)

```html
<!-- Fixed dimensions -->
<ejs-chart width="800px" height="400px">
</ejs-chart>

<!-- Responsive percentage width -->
<ejs-chart width="100%" height="350px">
</ejs-chart>
```

### Adding Multiple Series

Multiple series allow comparison of different data sets on the same chart.

**API Reference:** [SeriesDirective](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective), [name](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#name)

```typescript
public data1 = [{ x: 'Jan', y: 35 }, { x: 'Feb', y: 28 }];
public data2 = [{ x: 'Jan', y: 25 }, { x: 'Feb', y: 33 }];
```

```html
<ejs-chart>
  <e-series-collection>
    <e-series [dataSource]="data1" type="Column" xName="x" yName="y" name="Product A"></e-series>
    <e-series [dataSource]="data2" type="Column" xName="x" yName="y" name="Product B"></e-series>
  </e-series-collection>
</ejs-chart>
```

### Basic Tooltip

Enable tooltips to display data point information on hover.

**API Reference:** [TooltipSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/tooltipSettingsModel)

**Key Properties:**

- `enable` (boolean, default: false): Enable or disable tooltip
- `format` (string): Customize tooltip display format
- `shared` (boolean, default: false): Show all series data in one tooltip

```typescript
public tooltip = {
  enable: true,
  format: '${point.x}: ${point.y}',
  shared: false
};
```

```html
<ejs-chart [tooltip]="tooltip">
  <!-- series -->
</ejs-chart>
```

**Tooltip Example Code**

```typescript
import { Component, OnInit } from '@angular/core';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { DateTimeService, StepLineSeriesService, TooltipService } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [ChartModule],
  providers: [DateTimeService, StepLineSeriesService, TooltipService],
  template: `
    <ejs-chart
      id="chart-container"
      [primaryXAxis]="primaryXAxis"
      [primaryYAxis]="primaryYAxis"
      [title]="title"
      [tooltip]="tooltip">
      <e-series-collection>
        <e-series
          [dataSource]="chartData"
          type="StepLine"
          xName="x"
          yName="y"
          [width]="lineWidth"
          name="Unemployment Rate"
          [marker]="marker">
        </e-series>
      </e-series-collection>
    </ejs-chart>
  `
})
export class AppComponent implements OnInit {
  public chartData?: any[];
  public title?: string;
  public primaryXAxis?: any;
  public primaryYAxis?: any;
  public tooltip?: any;
  public marker?: any;
  public lineWidth: number = 2;

  ngOnInit(): void {
    this.chartData = [
      { x: new Date(1975, 0, 1), y: 16, y1: 10, y2: 4.5 },
      { x: new Date(1980, 0, 1), y: 12.5, y1: 7.5, y2: 5 },
      { x: new Date(1985, 0, 1), y: 19, y1: 11, y2: 6.5 },
      { x: new Date(1990, 0, 1), y: 14.4, y1: 7, y2: 4.4 },
      { x: new Date(1995, 0, 1), y: 11.5, y1: 8, y2: 5 },
      { x: new Date(2000, 0, 1), y: 14, y1: 6, y2: 1.5 },
      { x: new Date(2005, 0, 1), y: 10, y1: 3.5, y2: 2.5 },
      { x: new Date(2010, 0, 1), y: 16, y1: 7, y2: 3.7 }
    ];
    this.primaryXAxis = {
      valueType: 'DateTime',
      title: 'Year'
    };
    this.primaryYAxis = {
      title: 'Unemployment Rate (%)',
      minimum: 0,
      maximum: 25
    };
    this.tooltip = {
      enable: true,
      format: 'Year: ${point.x}, Rate: ${point.y}%'
    };
    this.marker = {
      visible: true,
      width: 10,
      height: 10
    };
    this.title = 'Unemployment Rates 1975-2010';
  }
}
```

## Troubleshooting

### Chart Not Rendering

**Issue:** Blank space where chart should appear.

**Solutions:**

1. Verify CSS theme is imported.
2. Check that the chart container has a height defined.
3. Ensure the license is registered and check the browser console for warnings.
4. Verify the data source has valid data.

### Module Not Found Error

**Issue:** `Cannot find module '@syncfusion/ej2-angular-charts'`

**Solution:**

```bash
npm install @syncfusion/ej2-angular-charts --save
```

### Build Errors with Standalone Components

**Issue:** Component not recognized.

**Solution:**

- Ensure `ChartModule` is imported in the `imports` array.
- Verify `standalone: true` is set in the component decorator.

## API Reference Summary

This section provides quick links to the most commonly used APIs when getting started with Syncfusion Angular Charts.

### Core Interfaces and Classes

| API | Description | Documentation |
|-----|-------------|---------------|
| ChartModel | Main chart component configuration with 40+ properties | [chartModel](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel) |
| AxisModel | Axis configuration with 50+ properties for X/Y axes | [axisModel](https://ej2.syncfusion.com/angular/documentation/api/chart/axisModel) |
| SeriesDirective | Series configuration with 60+ properties | [seriesDirective](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective) |
| TooltipSettingsModel | Tooltip appearance and behavior | [tooltipSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/tooltipSettingsModel) |
| LegendSettingsModel | Legend configuration | [legendSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/legendSettingsModel) |
| MarkerSettingsModel | Data point marker configuration | [markerSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/markerSettingsModel) |
| DataLabelSettingsModel | Data label configuration | [dataLabelSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/dataLabelSettingsModel) |

### Essential Events

| Event | Interface | Description | API Reference |
|-------|-----------|-------------|---------------|
| `load` | ILoadedEventArgs | Triggered before chart rendering | [load](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#load) |
| `loaded` | ILoadedEventArgs | Triggered after chart loads | [loaded](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#loaded) |
| `pointRender` | IPointRenderEventArgs | Triggered before rendering each point | [IPointRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iPointRenderEventArgs) |
| `seriesRender` | ISeriesRenderEventArgs | Triggered before rendering each series | [ISeriesRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iSeriesRenderEventArgs) |
| `tooltipRender` | ITooltipRenderEventArgs | Triggered before tooltip rendering | [ITooltipRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iTooltipRenderEventArgs) |
| `axisLabelRender` | IAxisLabelRenderEventArgs | Triggered before axis label rendering | [IAxisLabelRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iAxisLabelRenderEventArgs) |

### Enumerations

| Enum | Description | API Reference |
|------|-------------|---------------|
| ChartSeriesType | Available series types such as Line, Column, Bar, Area, etc. | [chartSeriesType](https://ej2.syncfusion.com/angular/documentation/api/chart/chartSeriesType) |
| ValueType | Axis value types such as Double, DateTime, Category, and Logarithmic | [valueType](https://ej2.syncfusion.com/angular/documentation/api/chart/valueType) |
| ChartTheme | Available themes such as Material, Bootstrap, Fabric, etc. | [chartTheme](https://ej2.syncfusion.com/angular/documentation/api/chart/chartTheme) |
| LegendPosition | Legend position options | [legendPosition](https://ej2.syncfusion.com/angular/documentation/api/chart/legendPosition) |
