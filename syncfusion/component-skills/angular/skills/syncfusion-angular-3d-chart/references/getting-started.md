# Getting Started with Angular 3D Chart

This guide walks through setting up a Syncfusion 3D Chart in an Angular application.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Step 1: Install Syncfusion Charts Package](#step-1-install-syncfusion-charts-package)
  - [Step 2: Import Required Modules](#step-2-import-required-modules)
- [Create Your First 3D Chart](#create-your-first-3d-chart)
  - [Basic Column Chart](#basic-column-chart)
- [Component Configuration](#component-configuration)
  - [Adding Axis Labels](#adding-axis-labels)
  - [Adding a Title](#adding-a-title)
- [Minimal Working Example](#minimal-working-example)
- [Common Setup Issues](#common-setup-issues)

## Prerequisites

- Angular 21+ (standalone architecture)
- Node.js and npm installed
- Basic Angular knowledge

## Installation

### Step 1: Install Syncfusion Charts Package

```bash
npm install @syncfusion/ej2-angular-charts
```

### Step 2: Import Required Modules

In your component file, import the Chart3D component and related directives:

```typescript
import { Component } from '@angular/core';
import { Chart3DComponent, Chart3DSeriesCollectionDirective, Chart3DSeriesDirective } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Chart3DComponent, Chart3DSeriesCollectionDirective, Chart3DSeriesDirective],
  template: ``
})
export class AppComponent {}
```

## Create Your First 3D Chart

### Basic Column Chart

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { Chart3DAllModule} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [Chart3DAllModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ejs-chart3d [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]='data' xName="x" yName="y" type='Column'>
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class ChartComponent {
  public primaryXAxis = {
        valueType: 'Category'
    }
  public data = [
    { x: 'USA', y: 46 },
    { x: 'GBR', y: 27 },
    { x: 'CHN', y: 26 }
  ];
}
```

This creates a basic 3D column chart displaying three data points.

## Component Configuration

### Adding Axis Labels

Configure X and Y axes to display labels:

```typescript
@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [Chart3DAllModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ejs-chart3d [primaryXAxis]="xAxis" [primaryYAxis]="yAxis">
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="country" yName="gold" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class ChartComponent {
  data = [
    { country: 'USA', gold: 46 },
    { country: 'GBR', gold: 27 },
    { country: 'CHN', gold: 26 }
  ];

  xAxis = { valueType: 'Category', title: 'Countries' };
  yAxis = { title: 'Gold Medals' };
}
```

### Adding a Title

Add a title to your chart:

```typescript
@Component({
  template: `
    <ejs-chart3d [title]="Olympic Gold Medals">
      ...
    </ejs-chart3d>
  `
})
export class ChartComponent { }
```

## Minimal Working Example

Create a new component with this complete example:

```typescript
import { Component } from '@angular/core';
import { Chart3DAllModule} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-minimal-chart',
  standalone: true,
  imports: [Chart3DAllModule],
  template: `
    <div style="width: 100%; height: 500px;">
      <ejs-chart3d [title]="Sales by Quarter" [primaryXAxis]='primaryXAxis'>
        <e-chart3d-series-collection>
          <e-chart3d-series [dataSource]="sales" xName="quarter" yName="amount" type="Column">
          </e-chart3d-series>
        </e-chart3d-series-collection>
      </ejs-chart3d>
    </div>
  `
})
export class MinimalChartComponent {
    primaryXAxis = {
        valueType: 'Category'
    }
  sales = [
    { quarter: 'Q1', amount: 18 },
    { quarter: 'Q2', amount: 28 },
    { quarter: 'Q3', amount: 30 },
    { quarter: 'Q4', amount: 35 }
  ];
}
```

Add this to your app component, and you'll see a working 3D column chart.

## Common Setup Issues

**Issue:** Chart not displaying
- **Solution:** Ensure styles are imported in `styles.css` or component styles
- **Check:** Data source is not empty
- **Verify:** `xName` and `yName` properties match data object keys

**Issue:** "Chart3DComponent not found"
- **Solution:** Import in component's `imports` array: `imports: [Chart3DComponent, ...]`
- **Ensure:** Package is installed: `npm install @syncfusion/ej2-angular-charts`

**Issue:** Styling looks broken
- **Solution:** Import theme CSS before Syncfusion CSS
- **Try:** Material theme as default for testing
