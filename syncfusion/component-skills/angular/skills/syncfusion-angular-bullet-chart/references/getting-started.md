# Getting Started with Syncfusion Angular Bullet Chart

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup Angular Application](#setup-angular-application)
  - [Step 1: Install Angular CLI](#step-1-install-angular-cli)
  - [Step 2: Create a New Angular Project](#step-2-create-a-new-angular-project)
- [Add Syncfusion Angular Charts Package](#add-syncfusion-angular-charts-package)
  - [Option 1: Using Angular CLI (Recommended)](#option-1-using-angular-cli-recommended)
  - [Option 2: Manual npm Installation](#option-2-manual-npm-installation)
- [Import BulletChartModule](#import-bulletchartmodule)
- [Create Your First Bullet Chart](#create-your-first-bullet-chart)
  - [Basic Initialization](#basic-initialization)
  - [Add Sample Data](#add-sample-data)
- [Data Structure Requirements](#data-structure-requirements)
- [Add Title and Ranges](#add-title-and-ranges)
- [Enable Tooltips](#enable-tooltips)
  - [Step 1: Import BulletTooltipService](#step-1-import-bullettooltipservice)
  - [Step 2: Configure Tooltip](#step-2-configure-tooltip)
- [Run Your Application](#run-your-application)
- [Complete Getting Started Example](#complete-getting-started-example)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Ensure your development environment meets these requirements:
- **Node.js** and **npm** installed (latest LTS recommended)
- **Angular CLI 21+** (supports standalone components by default)
- **Angular 21+** (this guide focuses on standalone component architecture)
- Basic knowledge of Angular components and TypeScript

For detailed compatibility with other Angular versions, refer to the [Angular version support matrix](https://ej2.syncfusion.com/angular/documentation/system-requirement#angular-version-compatibility).

## Setup Angular Application

### Step 1: Install Angular CLI

Install Angular CLI globally:

```bash
npm install -g @angular/cli
```

To install a specific Angular CLI version (recommended for consistency):

```bash
npm install -g @angular/cli@21.0.0
```

### Step 2: Create a New Angular Project

Generate a new Angular application:

```bash
ng new syncfusion-bullet-chart-app
```

When prompted, configure:
- **Stylesheet format**: Choose CSS, SCSS, or Less (CSS is default)
- **Routing**: Enable if needed
- **Server-side rendering**: Choose based on your requirements
- **AI Tool**: Select or skip

Navigate to your project directory:

```bash
cd syncfusion-bullet-chart-app
```

> **Note:** In Angular 21+, the CLI generates simplified file structure with `src/app/app.ts`, `app.html`, and `app.css` (no `.component.` suffixes).

## Add Syncfusion Angular Charts Package

### Option 1: Using Angular CLI (Recommended)

Install the Bullet Chart package and its peer dependencies:

```bash
ng add @syncfusion/ej2-angular-charts
```

This command automatically:
- Adds `@syncfusion/ej2-angular-charts` to `package.json`
- Installs all peer dependencies
- Configures necessary imports

### Option 2: Manual npm Installation

```bash
npm install @syncfusion/ej2-angular-charts
```

## Import BulletChartModule

In your component file (e.g., `app.component.ts`), import the Bullet Chart module:

```typescript
import { Component } from '@angular/core';
import { BulletChartModule } from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [BulletChartModule],
    standalone: true,
    selector: 'app-root',
    template: `<ejs-bulletchart></ejs-bulletchart>`
})
export class AppComponent { }
```

## Create Your First Bullet Chart

### Basic Initialization

Create a minimal Bullet Chart component:

```typescript
import { Component } from '@angular/core';
import { BulletChartModule } from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [BulletChartModule],
    standalone: true,
    selector: 'app-root',
    template: `<ejs-bulletchart id='container'></ejs-bulletchart>`
})
export class AppComponent { }
```

### Add Sample Data

Modify your component to include data:

```typescript
import { Component, OnInit } from '@angular/core';
import { BulletChartModule } from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [BulletChartModule],
    standalone: true,
    selector: 'app-root',
    template: `<ejs-bulletchart 
        [dataSource]='data' 
        valueField='value' 
        targetField='target'>
    </ejs-bulletchart>`
})
export class AppComponent implements OnInit {
    public data: any;

    ngOnInit(): void {
        this.data = [
            { value: 100, target: 80 },
            { value: 200, target: 180 },
            { value: 300, target: 280 },
            { value: 400, target: 380 },
            { value: 500, target: 480 }
        ];
    }
}
```

## Data Structure Requirements

Each data object in your dataSource should contain:

```typescript
interface BulletChartData {
    value: number;          // Actual/feature measure value
    target: number;         // Target/comparative measure value
    category?: string;      // Optional: Label for each bullet (for categoryField)
    [key: string]: any;     // Any additional properties needed
}
```

**Example with Categories:**

```typescript
data = [
    { category: 'Q1', value: 25000, target: 30000 },
    { category: 'Q2', value: 28000, target: 30000 },
    { category: 'Q3', value: 35000, target: 30000 }
];
```

## Add Title and Ranges

Make the chart more informative:

```typescript
@Component({
    template: `<ejs-bulletchart 
        [dataSource]='data' 
        valueField='value' 
        targetField='target'
        title='Sales Performance'
        [ranges]='ranges'>
    </ejs-bulletchart>`
})
export class AppComponent implements OnInit {
    public data: any;
    public ranges: any;

    ngOnInit(): void {
        this.data = [
            { value: 100, target: 80 },
            { value: 200, target: 180 }
        ];
        
        this.ranges = [
            { end: 50, color: '#ffe0b2', opacity: 0.6 },    // Poor: Orange
            { end: 100, color: '#fff9c4', opacity: 0.6 },   // Satisfactory: Yellow
            { end: 150, color: '#c8e6c9', opacity: 0.6 }    // Good: Green
        ];
    }
}
```

## Enable Tooltips

To display information on hover:

### Step 1: Import BulletTooltipService

```typescript
import { BulletChartModule, BulletTooltipService } from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [BulletChartModule],
    standalone: true,
    providers: [BulletTooltipService],  // Add tooltip service
    template: `<ejs-bulletchart 
        [dataSource]='data' 
        valueField='value' 
        targetField='target'
        [tooltip]='{ enable: true }'>
    </ejs-bulletchart>`
})
export class AppComponent { }
```

### Step 2: Configure Tooltip

```typescript
tooltip = {
    enable: true,
    fill: '#ffffff',           // Tooltip background color
    border: { color: '#cccccc', width: 1 }
};
```

## Run Your Application

Start the development server:

```bash
ng serve
```

Open your browser and navigate to:
```
http://localhost:4200
```

## Complete Getting Started Example

Here's a complete, working component:

```typescript
import { Component, OnInit } from '@angular/core';
import { BulletChartModule, BulletTooltipService } from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [BulletChartModule],
    standalone: true,
    selector: 'app-root',
    template: `
        <div style="margin: 20px;">
            <h2>Sales Performance Dashboard</h2>
            <ejs-bulletchart 
                id='bulletChart'
                [dataSource]='chartData' 
                valueField='value' 
                targetField='target'
                categoryField='category'
                title='Quarterly Sales'
                subtitle='vs Target'
                [ranges]='ranges'
                [tooltip]='tooltipConfig'>
            </ejs-bulletchart>
        </div>
    `,
    providers: [BulletTooltipService]
})
export class AppComponent implements OnInit {
    public chartData: any;
    public ranges: any;
    public tooltipConfig: any;

    ngOnInit(): void {
        // Sample data with categories
        this.chartData = [
            { category: 'Q1 2024', value: 25000, target: 30000 },
            { category: 'Q2 2024', value: 28000, target: 30000 },
            { category: 'Q3 2024', value: 35000, target: 30000 },
            { category: 'Q4 2024', value: 32000, target: 30000 }
        ];

        // Define quality ranges
        this.ranges = [
            { end: 20000, color: '#ffe0b2', opacity: 0.6 },    // Below Target
            { end: 30000, color: '#fff9c4', opacity: 0.6 },    // On Target
            { end: 40000, color: '#c8e6c9', opacity: 0.6 }     // Above Target
        ];

        // Tooltip configuration
        this.tooltipConfig = {
            enable: true,
            fill: '#ffffff',
            border: { color: '#999999', width: 1 }
        };
    }
}
```

## Troubleshooting

### Issue: Multiple BulletChart Not Rendering

**Cause:** When multiple Bullet Chart components are rendered on the same page, each chart should use a **unique container `id`** to avoid DOM rendering conflicts.


```html
<!-- Correct: unique IDs -->
<ejs-bulletchart id="bullet-sales" [dataSource]="salesData"></ejs-bulletchart>
<ejs-bulletchart id="bullet-revenue" [dataSource]="revenueData"></ejs-bulletchart>
<ejs-bulletchart id="bullet-profit" [dataSource]="profitData"></ejs-bulletchart>

<!-- ✗ WRONG - No IDs -->
<ejs-bulletchart [dataSource]="salesData"></ejs-bulletchart>
<ejs-bulletchart [dataSource]="revenueData"></ejs-bulletchart>

<!-- ✗ WRONG: duplicate IDs -->
<ejs-bulletchart id="bulletchart" [dataSource]="salesData"></ejs-bulletchart>
<ejs-bulletchart id="bulletchart" [dataSource]="revenueData"></ejs-bulletchart>
```

**Package not found?**
```bash
npm install @syncfusion/ej2-angular-charts
npm install @syncfusion/ej2-base
```

**Module not recognized?**
Ensure `BulletChartModule` is in the `imports` array of your component.

**Empty chart?**
Verify that `dataSource`, `valueField`, and `targetField` are correctly configured.
