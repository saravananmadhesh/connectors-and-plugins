# Getting Started with Angular 3D Circular Chart

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
  - [Step 1: Add Syncfusion Charts Package](#step-1-add-syncfusion-charts-package)
  - [Step 2: Verify Installation](#step-2-verify-installation)
- [Create Your First Chart](#create-your-first-chart)
  - [Import Components](#import-components)
  - [Create Template](#create-template)
  - [Add Data](#add-data)
- [Basic Configuration](#basic-configuration)
  - [Chart Sizing](#chart-sizing)
  - [Enable Tooltips](#enable-tooltips)
  - [Add Legend](#add-legend)
- [Minimal Working Example](#minimal-working-example)
  - [Bootstrap Your Application](#bootstrap-your-application)
  - [Test Your Setup](#test-your-setup)
- [Troubleshooting](#troubleshooting)
  - [Chart Not Displaying](#chart-not-displaying)
  - [Missing Dependencies](#missing-dependencies)
  - [Performance Issues](#performance-issues)

---

## Overview

The Syncfusion Angular 3D Circular Chart component enables you to create interactive pie and donut chart visualizations. This guide covers the essential setup steps and basic implementation for Angular 21+ applications using standalone components.

**Prerequisites:**
- Angular 21 or later
- Node.js and npm installed
- Basic knowledge of TypeScript and Angular

---

## Installation

### Step 1: Add Syncfusion Charts Package

Install the Syncfusion Angular charts package using the Angular CLI:

```bash
ng add @syncfusion/ej2-angular-charts
```

This command automatically:
- Adds the package to `package.json` with peer dependencies
- Imports necessary modules in your application
- Sets up required configuration files

### Step 2: Verify Installation

Check that `@syncfusion/ej2-angular-charts` appears in your `package.json`:

```json
{
  "dependencies": {
    "@syncfusion/ej2-angular-charts": "^25.1.35",
    "@syncfusion/ej2-base": "^25.1.35"
  }
}
```

---

## Create Your First Chart

### Import Components

Import the required components and services in your component:

```typescript
import { Component } from '@angular/core';
import { CircularChart3DAllModule  } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-circular-chart',
  standalone: true,
  imports: [
    CircularChart3DAllModule ],
})
export class CircularChartComponent {}
```

### Create Template

Add the chart template to your component:

```typescript
@Component({
  template: `
    <ejs-circularchart3d id="chart-container" style="display: block;">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series [dataSource]="chartData" xName="x" yName="y" type="Pie">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  `,
  styles: [`
    #chart-container {
      width: 100%;
      height: 400px;
    }
  `]
})
```

### Add Data

Define sample data for your chart:

```typescript
export class CircularChartComponent {
  chartData = [
    { x: 'Product A', y: 25 },
    { x: 'Product B', y: 20 },
    { x: 'Product C', y: 30 },
    { x: 'Product D', y: 25 }
  ];
}
```

---

## Basic Configuration

### Chart Sizing

Configure chart dimensions via CSS styles or properties:

```typescript
@Component({
  template: `
    <ejs-circularchart3d 
      id="chart" 
      [width]="'100%'" 
      [height]="'400px'">
      ...
    </ejs-circularchart3d>
  `
})
```

Or in your stylesheet:

```css
#chart {
  width: 100%;
  height: 400px;
}
```

### Enable Tooltips

Add basic tooltip functionality:

```typescript
@Component({
  template: `
    <ejs-circularchart3d [tooltip]="{ enable: true }">
      ...
    </ejs-circularchart3d>
  `
})
```

### Add Legend

Enable and position the legend:

```typescript
@Component({
  template: `
    <ejs-circularchart3d [legendSettings]="{ visible: true, position: 'Bottom' }">
      ...
    </ejs-circularchart3d>
  `
})
```

---

## Minimal Working Example

Here's a complete working example:

```typescript
import { Component } from '@angular/core';
import { CircularChart3DAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CircularChart3DAllModule
  ],
  template: `
    <div style="text-align: center;">
      <h1>Sales Distribution</h1>
      <ejs-circularchart3d 
        id="chart-container"
        [tooltip]="{ enable: true }"
        [legendSettings]="{ visible: true, position: 'Bottom' }">
        <e-circularchart3d-series-collection>
          <e-circularchart3d-series 
            [dataSource]="chartData" 
            xName="x" 
            yName="y" 
            type="Pie">
          </e-circularchart3d-series>
        </e-circularchart3d-series-collection>
      </ejs-circularchart3d>
    </div>
  `,
  styles: [`
    #chart-container {
      width: 100%;
      height: 500px;
      margin: 20px 0;
    }
  `]
})
export class AppComponent {
  chartData = [
    { x: 'North', y: 35 },
    { x: 'South', y: 28 },
    { x: 'East', y: 34 },
    { x: 'West', y: 32 }
  ];
}
```

### Bootstrap Your Application

Create `main.ts`:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import 'zone.js';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

### Test Your Setup

Run the development server:

```bash
ng serve
```

Navigate to `http://localhost:4200` to see your 3D circular chart.

---

## Troubleshooting

### Chart Not Displaying
- Verify CSS imports are included in `styles.css`
- Check browser console for errors
- Ensure `data` property has valid data format
- Check that container has defined height and width

### Missing Dependencies
- Re-run `ng add @syncfusion/ej2-angular-charts`
- Verify all imports are correctly specified
- Check for typos in component selector names

### Performance Issues
- For large datasets (>1000 points), consider aggregating data
- Use `changeDetectionStrategy: ChangeDetectionStrategy.OnPush` for better performance
- Lazy-load chart component if not needed immediately

---
