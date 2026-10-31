# Getting Started with Smith Chart

## Table of Contents

- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Install the Smith Chart Package](#install-the-smith-chart-package)
- [Basic Implementation](#basic-implementation)
  - [Step 1: Import SmithchartModule](#step-1-import-smithchartmodule)
  - [Step 2: Add HTML Template](#step-2-add-html-template)
  - [Step 3: Run the Application](#step-3-run-the-application)
- [Module Setup](#module-setup)
  - [SmithchartModule](#smithchartmodule)
  - [Optional Services](#optional-services)
- [Data Binding](#data-binding)
  - [Understanding Resistance and Reactance](#understanding-resistance-and-reactance)
  - [Basic Data Array](#basic-data-array)
  - [Template Binding](#template-binding)
  - [Using dataSource](#using-datasource)
- [Complete Example](#complete-example)


## Installation

### Prerequisites

Ensure your development environment meets the [System Requirements for Syncfusion Angular UI Components](https://ej2.syncfusion.com/angular/documentation/system-requirement).

### Install the Smith Chart Package

Syncfusion's Angular component packages are available on [npmjs.com](https://www.npmjs.com/search?q=ej2-angular). The Smith Chart component is part of the `@syncfusion/ej2-angular-charts` package.

Install the package using Angular CLI:

```bash
ng add @syncfusion/ej2-angular-charts
```

This command performs the following:
- Adds `@syncfusion/ej2-angular-charts` package to `package.json`
- Installs peer dependencies
- Updates your Angular configuration

For specific version installation:

```bash
npm add @syncfusion/ej2-angular-charts@32.1.19
```

## Basic Implementation

### Step 1: Import SmithchartModule

In your component file (e.g., `app.component.ts`), import the `SmithchartModule`:

```typescript
import { SmithchartModule } from '@syncfusion/ej2-angular-charts'
import { Component, ViewEncapsulation } from '@angular/core'

@Component({
  imports: [SmithchartModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-smithchart style='display: block;' id='container'></ejs-smithchart>`,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent { }
```

### Step 2: Add HTML Template

Use the app-root in the index.html instead of default one.

```html
<app-root></app-root>
```

### Step 3: Run the Application

Start your Angular development server:

```bash
npm start
```

The smith chart will render as a blank grid with horizontal and radial axes.

## Module Setup

### SmithchartModule

The `SmithchartModule` provides the core smith chart functionality. Import it in your standalone component:

```typescript
import { SmithchartModule } from '@syncfusion/ej2-angular-charts'

@Component({
  imports: [SmithchartModule],
  standalone: true
})
```

### Optional Services

Services are only needed for specific advanced features. By default, `SmithchartModule` alone is sufficient for most implementations.

| Feature | Service | When Needed |
|---------|---------|------------|
| **Tooltips** | `TooltipRenderService` | Only if using `tooltip: { visible: true }` in series configuration |
| **Legend Interaction** | `SmithchartLegendService` | Only if enabling legend clicks to toggle series visibility with custom events |

**Example: Using TooltipRenderService Only When Needed**

❌ **Don't include if not using tooltips:**
```typescript
import { SmithchartModule, TooltipRenderService } from '@syncfusion/ej2-angular-charts'

@Component({
  imports: [SmithchartModule],
  providers: [TooltipRenderService],  // ✗ Unnecessary if no tooltips
  standalone: true
})
export class AppComponent {
  series = [{ points: [...] }]  // No tooltip configuration
}
```

✅ **Include only when using tooltips:**
```typescript
import { SmithchartModule, TooltipRenderService } from '@syncfusion/ej2-angular-charts'

@Component({
  imports: [SmithchartModule],
  providers: [TooltipRenderService],  // ✓ Needed for tooltip rendering
  standalone: true
})
export class AppComponent {
  series = [{
    points: [...],
    tooltip: { visible: true }  // ✓ Tooltip is configured
  }]
}
```

**Example: Legend Service Only for Advanced Legend Features**

```typescript
import { SmithchartModule, SmithchartLegendService } from '@syncfusion/ej2-angular-charts'

@Component({
  imports: [SmithchartModule],
  providers: [SmithchartLegendService],  // Only for custom legend event handling
  standalone: true
})
export class AppComponent {
  series = [{ name: 'Line A', points: [...] }]
  legendSettings = { visible: true }  // Basic legend - service still optional
}
```

## Data Binding

### Understanding Resistance and Reactance

The Smith Chart uses two parameters:
- **Resistance (R)** - Real part of impedance (horizontal axis)
- **Reactance (X)** - Imaginary part of impedance (vertical axis)

Each data point represents a position on the smith chart corresponding to an impedance value.

### Basic Data Array

Create a data array with resistance and reactance values:

```typescript
export class AppComponent {
  series = [{
    points: [
      { resistance: 10, reactance: 10 },
      { resistance: 20, reactance: 15 },
      { resistance: 30, reactance: 5 },
      { resistance: 40, reactance: -5 },
      { resistance: 50, reactance: -15 }
    ]
  }]
}
```

### Template Binding

Bind the series to the smith chart component:

```html
<ejs-smithchart [series]="series"></ejs-smithchart>
```

### Using dataSource

Alternatively, use the `dataSource` property with property name mappings:

```typescript
export class AppComponent {
  data = [
    { r: 10, x: 10 },
    { r: 20, x: 15 },
    { r: 30, x: 5 }
  ]
  
  series = [{
    dataSource: this.data,
    resistance: 'r',
    reactance: 'x'
  }]
}
```

## Complete Example

Here's a complete working example with tooltips enabled:

```typescript
import { SmithchartModule, TooltipRenderService } from '@syncfusion/ej2-angular-charts';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [SmithchartModule],
  providers: [TooltipRenderService],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ejs-smithchart id="smithchart-container">
      <e-seriesCollection>
        <e-series
          [points]="points"
          [marker]="marker"
          [tooltip]="tooltip">
        </e-series>
      </e-seriesCollection>
    </ejs-smithchart>
  `,
  styles: [`
    ejs-smithchart {
      height: 400px;
      width: 100%;
      display: block;
    }
  `]
})
export class AppComponent {

  points = [
    { resistance: 10, reactance: 25 },
    { resistance: 8, reactance: 6 },
    { resistance: 6, reactance: 4.5 },
    { resistance: 4.5, reactance: 2 },
    { resistance: 3.5, reactance: 1.6 },
    { resistance: 2.5, reactance: 1.3 },
    { resistance: 2, reactance: 1.2 },
    { resistance: 1.5, reactance: 1 },
    { resistance: 1, reactance: 0.8 },
    { resistance: 0.5, reactance: 0.4 },
    { resistance: 0.3, reactance: 0.2 },
    { resistance: 0, reactance: 0.15 }
  ];

  marker = { visible: true };
  tooltip = { visible: true };
}
```


