# Getting Started with Angular Range Navigator

This guide covers the initial setup and basic configuration of the Syncfusion Range Navigator component in Angular applications.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Step 1: Create a New Angular Application](#step-1-create-a-new-angular-application)
  - [Step 2: Install Syncfusion Packages](#step-2-install-syncfusion-packages)
  - [Step 3: Import Required Modules](#step-3-import-required-modules)
- [Basic Component Setup](#basic-component-setup)
  - [Minimal Example](#minimal-example)
- [Service Providers](#service-providers)
- [Data Binding](#data-binding)
  - [Local Array Binding](#local-array-binding)
  - [Remote Data Binding](#remote-data-binding)
- [Axis Configuration](#axis-configuration)
  - [DateTime Axis](#datetime-axis)
  - [Numeric Axis](#numeric-axis)
- [Enable Tooltip](#enable-tooltip)
- [Running Your Application](#running-your-application)
- [Troubleshooting](#troubleshooting)
  - [Module Not Found Error](#module-not-found-error)
  - [Data Not Rendering](#data-not-rendering)

## Prerequisites

- Angular 21+ (Angular 19+ with standalone components support)
- Node.js and npm installed
- Basic knowledge of Angular components and TypeScript
- Syncfusion license (trial or commercial)

## Installation

### Step 1: Create a New Angular Application

Using Angular CLI:

```bash
ng new my-range-navigator-app
cd my-range-navigator-app
```

### Step 2: Install Syncfusion Packages

Install the Syncfusion Angular Charts package (which includes Range Navigator):

**Option 1: Using Angular Schematic (Recommended)**
```bash
ng add @syncfusion/ej2-angular-charts
```

This command automatically:
- Adds `@syncfusion/ej2-angular-charts` to your `package.json`
- Imports required modules and styles
- Sets up theming and dependencies

**Option 2: Using npm/yarn**
```bash
# Install latest stable version
npm install @syncfusion/ej2-angular-charts

# Or using yarn
yarn add @syncfusion/ej2-angular-charts
```

**Option 3: Install Specific Version**
```bash
# Replace VERSION with your desired version (e.g., 32.1.19, 33.1.44)
npm install @syncfusion/ej2-angular-charts@VERSION

# Example for a specific version
npm install @syncfusion/ej2-angular-charts@33.1.44
```

> **Note**: Check the [Syncfusion release notes](https://ej2.syncfusion.com/angular/documentation/release-notes/) for the latest version compatible with your Angular version.

### Step 3: Import Required Modules

In your component file:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { 
  RangeNavigatorModule,
  AreaSeriesService,
  DateTimeService,
  RangeTooltipService 
} from '@syncfusion/ej2-angular-charts';
import 'zone.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RangeNavigatorModule
  ],
  providers: [AreaSeriesService, DateTimeService, RangeTooltipService],
  encapsulation: ViewEncapsulation.None,
  template: `<ejs-rangenavigator id="rn-container"></ejs-rangenavigator>`,
  styleUrls: []
})
export class AppComponent { }
```

## Basic Component Setup

### Minimal Example

Create a simple Range Navigator with area series:

```typescript
import { Component } from '@angular/core';
import { 
  RangeNavigatorModule,
  AreaSeriesService,
  DateTimeService
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RangeNavigatorModule
  ],
  providers: [AreaSeriesService, DateTimeService],
  template: `
    <ejs-rangenavigator 
      id="rn-container"
      valueType="DateTime">
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series 
          [dataSource]="data"
          xName="date"
          yName="value"
          type="Area">
        </e-rangenavigator-series>
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  `
})
export class AppComponent {
  data = [
    { date: new Date(2023, 0, 1), value: 21 },
    { date: new Date(2023, 1, 1), value: 24 },
    { date: new Date(2023, 2, 1), value: 36 },
    { date: new Date(2023, 3, 1), value: 38 },
    { date: new Date(2023, 4, 1), value: 54 },
    { date: new Date(2023, 5, 1), value: 57 }
  ];
}
```

## Service Providers

Range Navigator requires specific services for different features. Import and provide them:

```typescript
import {
  AreaSeriesService,      // For area series rendering
  LineSeriesService,      // For line series rendering
  SplineSeriesService,    // For spline series rendering
  DateTimeService,        // For datetime axis support
  RangeTooltipService     // For tooltip functionality
} from '@syncfusion/ej2-angular-charts';

@Component({
  providers: [
    AreaSeriesService, 
    DateTimeService, 
    RangeTooltipService
  ]
})
export class MyComponent { }
```

## Data Binding

### Local Array Binding

```typescript
import { Component, OnInit } from '@angular/core';
import { ChartModule, RangeNavigatorModule, AreaSeriesService, DateTimeService } from '@syncfusion/ej2-angular-charts';
import { datasrc } from './datasource';

@Component({
    imports: [ChartModule, RangeNavigatorModule],
    providers: [AreaSeriesService, DateTimeService],
    standalone: true,
    selector: 'app-root',
    template = `
    <ejs-rangenavigator >
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series 
          [dataSource]="rangeData"
          xName="x" 
          yName="yValue" 
          type="Area">
        </e-rangenavigator-series>
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  `,
})
export class LocalDataComponent {
  rangeData = [
    { x: 1, yValue: 2 },
    { x: 2, yValue: 4 },
    { x: 3, yValue: 3 },
    { x: 4, yValue: 5 }
  ];  
}
```

### Remote Data Binding

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RangeNavigatorModule, AreaSeriesService, DateTimeService } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-remote-data',
  standalone: true,
  // 1. Include modules for the template
  imports: [RangeNavigatorModule, CommonModule],
  // 2. Inject required Syncfusion services
  providers: [AreaSeriesService, DateTimeService],
  template: `
    <!-- 3. Added valueType="DateTime" to handle date fields -->
    <ejs-rangenavigator 
      *ngIf="remoteData" 
      valueType="DateTime">
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
  remoteData: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Replace with your actual API endpoint
    this.http.get('https://api.example.com/data')
      .subscribe(data => {
        this.remoteData = data;
      });
  }
}

```

## Axis Configuration

### DateTime Axis

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      valueType="DateTime"
      [intervalType]="'Months'">
      <!-- series -->
    </ejs-rangenavigator>
  `
})
export class DateTimeAxisComponent { }
```

### Numeric Axis

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      valueType="Double"
      [minimum]="0"
      [maximum]="100">
      <!-- series -->
    </ejs-rangenavigator>
  `
})
export class NumericAxisComponent { }
```

## Enable Tooltip

```typescript
@Component({
  providers: [RangeTooltipService],
  template: `
    <ejs-rangenavigator 
      [tooltip]="{ enable: true }">
      <!-- series -->
    </ejs-rangenavigator>
  `
})
export class TooltipComponent { }
```

## Running Your Application

```bash
ng serve
```

Navigate to `http://localhost:4200/` to see your Range Navigator in action.

## Troubleshooting

### Module Not Found Error

Ensure all required services are provided:

```typescript
providers: [
  AreaSeriesService, 
  DateTimeService, 
  RangeTooltipService
]
```

### Data Not Rendering

Check that:
1. `dataSource` is properly assigned
2. `xName` and `yName` match your data properties
3. Series `type` is valid (Area, Line, Spline, etc.)
4. Data contains valid values
