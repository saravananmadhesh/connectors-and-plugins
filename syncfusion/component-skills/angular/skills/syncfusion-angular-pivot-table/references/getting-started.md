# Getting Started with Angular Pivot Grid

## ⚠️ Security Notice

This guide demonstrates using **local data binding**, which is the most secure approach for pivot table implementation. For remote data sources, always refer to the security guidelines in [references/core-concepts.md](./core-concepts.md#security-best-practices).

## Table of Contents
- [Setup Angular Environment](#setup-angular-environment)
- [Create Angular Application](#create-angular-application)
- [Dependencies](#dependencies)
- [Installing Syncfusion PivotView Package](#installing-syncfusion-pivotview-package)
- [Adding CSS Reference](#adding-css-reference)
- [Initializing Pivot Table Component](#initializing-pivot-table-component)
- [Run the Application](#run-the-application)
- [Assigning Sample Data](#assigning-sample-data)
- [Adding Fields to Axes](#adding-fields-to-row-column-value-and-filter-axes)
- [Module Injection](#module-injection)

## Setup Angular Environment

Setting up the Angular environment properly ensures smooth development and deployment of your Pivot Table application. Install Angular CLI globally on your system using the following command:

```bash
npm install -g @angular/cli
```

> **Angular 21 Standalone Architecture:** Standalone components are the default in Angular 21. This guide uses the modern standalone architecture. If you need more information, refer to the [Standalone Guide](https://ej2.syncfusion.com/angular/documentation/getting-started/angular-standalone).
>
> Note: In Angular 19 and below, projects use `app.component.ts`, `app.component.html`, `app.component.css`, etc. In Angular 20+, the CLI generates a simpler structure with `src/app/app.ts`, `app.html`, and `app.css` (no `.component.` suffixes).

### Installing a Specific Version

To install a particular version of Angular CLI:

```bash
npm install -g @angular/cli@21.0.0
```

For detailed compatibility with other Angular versions, see the [Angular version support matrix](https://ej2.syncfusion.com/angular/documentation/system-requirement#angular-version-compatibility).

## Create Angular Application

Creating a new Angular application provides the foundation for integrating the Syncfusion Angular Pivot Table component. With Angular CLI installed, generate a new project using the command below:

```bash
ng new my-app
```

This command will prompt you for a few settings:
- Stylesheet format (CSS, SCSS, Sass, Less)
- Server-side rendering (SSR) configuration
- AI tool selection

By default, a CSS-based application is created. To use SCSS:

```bash
ng new my-app --style=scss
```

Navigate to the project folder:

```bash
cd my-app
```

## Dependencies

Understanding the dependency structure helps identify the required packages for implementing the Pivot Table component. The Pivot Table component relies on a structured hierarchy of dependencies that provide essential functionality for data processing, user interface elements, and export capabilities.

The following dependency tree shows the required packages for the Angular Pivot Table component:

```javascript
|-- @syncfusion/ej2-angular-pivotview
    |-- @syncfusion/ej2-base
    |-- @syncfusion/ej2-data
    |-- @syncfusion/ej2-pivotview
        |-- @syncfusion/ej2-buttons
        |-- @syncfusion/ej2-dropdowns
        |-- @syncfusion/ej2-excel-export
          |-- @syncfusion/ej2-file-utils
          |-- @syncfusion/ej2-compression
        |-- @syncfusion/ej2-pdf-export
          |-- @syncfusion/ej2-file-utils
          |-- @syncfusion/ej2-compression
        |-- @syncfusion/ej2-grids
        |-- @syncfusion/ej2-inputs
        |-- @syncfusion/ej2-lists
        |-- @syncfusion/ej2-navigations
        |-- @syncfusion/ej2-popups
|-- @syncfusion/ej2-angular-base
```

The main package `@syncfusion/ej2-angular-pivotview` serves as the primary Angular wrapper for the Pivot Table component. This package automatically includes all the necessary sub-dependencies shown in the tree structure above.

## Installing Syncfusion PivotView Package

To build interactive PivotTable in Angular, install the Syncfusion PivotTable package from npm. Syncfusion packages are available as `@syncfusion` scoped packages.

Syncfusion offers two distinct package structures to accommodate different Angular development environments:

### 1. Ivy Library Distribution Package

The Ivy library distribution package is the modern approach to Angular development, designed for Angular 12 and later versions. Syncfusion Angular packages (version 20.2.36 and above) utilize the Ivy distribution format for improved performance and smaller bundle sizes.

```bash
npm install @syncfusion/ej2-angular-pivotview --save
```

### 2. Angular Compatibility Compiler (ngcc) Package

For projects using Angular versions below 12, use the ngcc-compatible package:

```bash
npm install @syncfusion/ej2-angular-pivotview@ngcc --save
```

Update your `package.json` file with the `-ngcc` suffix:

```json
"@syncfusion/ej2-angular-pivotview": "20.2.38-ngcc"
```

> **Note:** Installing without the `-ngcc` suffix will automatically install the Ivy package, which may generate compatibility warnings in Angular versions below 12.

## Adding CSS Reference

Syncfusion Angular component themes can be applied using CSS or SASS from the [npm theme packages](https://ej2.syncfusion.com/angular/documentation/appearance/overview#theme-packages). You can also use a CDN, CRG, or [Theme Studio](https://ej2.syncfusion.com/angular/documentation/appearance/theme-studio). For more information, refer to the [themes documentation](https://ej2.syncfusion.com/angular/documentation/appearance/overview).

This example uses the `Material 3` theme for the Pivot Table component. Install the [Material 3 theme package](https://www.npmjs.com/package/@syncfusion/ej2-material3-theme) with:

```bash
npm install @syncfusion/ej2-material3-theme --save
```

The required styles for the Pivot Table component are imported as shown below:

```css
@import '../node_modules/@syncfusion/ej2-material3-theme/styles/pivotview/index.css';
```

> The `material3-theme` package exposes a **single consolidated stylesheet per component** (here `pivotview/index.css`), so you no longer need to import every sub-dependency's theme CSS individually.

For using SCSS styles, refer to the [SASS guide](https://ej2.syncfusion.com/angular/documentation/common/how-to/sass).

**Other available theme packages:** `material3` (recommended), `material`, `bootstrap`, `bootstrap5`, `fabric`, `tailwind`, `highcontrast` — install the matching `@syncfusion/ej2-{theme}-theme` package and import the same `styles/pivotview/index.css` path.

## Browser Compatibility

The Pivot Table component provides broad browser compatibility to ensure your application works seamlessly across different environments. For optimal performance in Internet Explorer 11, you will need to include specific polyfills in your Angular application.

## Initializing Pivot Table Component

Setting up the Pivot Table component in your Angular application is straightforward and allows you to create powerful data analysis interfaces with minimal configuration.

> For Angular 20+ projects, the component code goes into `src/app/app.ts` (no `.component.` suffix). For Angular 19 and below, use `src/app/app.component.ts` instead.

Add the following code to your **src/app/app.ts** file:

```typescript
import { PivotViewModule } from '@syncfusion/ej2-angular-pivotview';
import { Component, OnInit } from '@angular/core';
import { IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { DataSourceSettingsModel } from '@syncfusion/ej2-pivotview/src/model/datasourcesettings-model';

@Component({
  imports: [
    PivotViewModule
  ],
  standalone: true,
  selector: 'app-root',
  template: `<div style="height: 480px;"><ejs-pivotview #pivotview id='PivotView' height='350' [dataSourceSettings]=dataSourceSettings [width]=width></ejs-pivotview></div>`
})
export class App implements OnInit {
  public dataSourceSettings?: DataSourceSettingsModel;
  public width?: string;
  public Pivot_Data: IDataSet[] = [
    { 'Sold': 31, 'Amount': 52824, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2025', 'Quarter': 'Q1' },
    { 'Sold': 51, 'Amount': 86904, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2025', 'Quarter': 'Q2' },
    { 'Sold': 90, 'Amount': 153360, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2025', 'Quarter': 'Q3' },
    { 'Sold': 25, 'Amount': 42600, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2025', 'Quarter': 'Q4' }
  ];
  ngOnInit(): void {
    this.dataSourceSettings = {
      dataSource: this.Pivot_Data as IDataSet[],
      columns: [{ name: 'Year' }, { name: 'Quarter' }],
      expandAll: true,
      formatSettings: [{ name: 'Amount', format: 'C0' }],
      rows: [{ name: 'Country' }, { name: 'Products' }],
      values: [{ name: 'Amount', caption: 'Sold Amount' }, { name: 'Sold', caption: 'Units Sold' }]
    };
    this.width = "100%";
  }
}
```

The application is then bootstrapped in **src/main.ts** with:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
```

> If you move the Pivot Table component template code into **src/app/app.html**, ensure to clear all auto-generated markup and styles from the file first. This prevents layout conflicts and helps ensure that Syncfusion components render correctly.

## Run the Application

```bash
ng serve --open
```

> You can also explore the [Angular Pivot Table example](https://ej2.syncfusion.com/angular/demos/#/tailwind3/pivot-table/default) for an interactive sample with drill-up and drill-down options, and the [API documentation](https://ej2.syncfusion.com/angular/documentation/api/pivotview/index-default) for more properties and methods.

## Assigning Sample Data

Providing appropriate data to the Pivot Table component enables users to perform meaningful analysis and generate actionable insights from datasets. The Pivot Table component requires a well-structured data source containing the information you want to analyze and visualize.

**🔒 Security Best Practice**: This example uses **local, in-memory data**, which is the most secure approach. Local data eliminates risks associated with remote data fetching, such as indirect prompt injection or data exfiltration.

For demonstration, we'll use a collection of objects containing sales details for various products across different periods and regions:

```typescript
import { PivotViewModule } from '@syncfusion/ej2-angular-pivotview'
import { Component, OnInit } from '@angular/core';
import { IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { DataSourceSettingsModel } from '@syncfusion/ej2-pivotview/src/model/datasourcesettings-model';

@Component({
  imports: [        
    PivotViewModule
  ],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-pivotview #pivotview id='PivotView' height='350' [dataSourceSettings]=dataSourceSettings></ejs-pivotview>`
})
export class App implements OnInit {
    public pivotData!: IDataSet[];
    public dataSourceSettings!: DataSourceSettingsModel;

    ngOnInit(): void {
        this.pivotData = [
            { 'Sold': 31, 'Amount': 52824, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q1' },
            { 'Sold': 51, 'Amount': 86904, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q2' }
        ];

        this.dataSourceSettings = {
            dataSource: this.pivotData
        };
    }
}
```

## Adding Fields to Row, Column, Value and Filter Axes

Organizing fields into appropriate axes transforms raw data into a structured, meaningful Pivot Table. The [`dataSourceSettings`](https://ej2.syncfusion.com/angular/documentation/api/pivotview/datasourcesettings) configuration contains four primary axes:

- **Rows:** Defines the row fields for grouping data vertically
- **Columns:** Defines the column fields for grouping data horizontally
- **Values:** Defines the value fields for data aggregation
- **Filters:** Defines the filter fields for filtering data across both row and column axes

Example configuration:

```typescript
this.dataSourceSettings = {
    dataSource: this.pivotData,
    rows: [{ name: 'Country' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'Amount', type: 'Sum' }],
    filters: []
};
```

## Module Injection

Angular Pivot View features are modular and require service injection to enable them. This approach reduces bundle size by loading only the features you need.

### Importing Specific Services

Inject only the services required for your features. Services must be added to the component's `providers` array:

```typescript
import { Component, OnInit } from '@angular/core';
import { PivotViewModule, GroupingBarService, FieldListService } from '@syncfusion/ej2-angular-pivotview';

@Component({
  imports: [PivotViewModule],
  standalone: true,
  selector: 'app-root',
  providers: [GroupingBarService, FieldListService],
  template: `<ejs-pivotview #pivotview id='PivotView' height='350' 
    [dataSourceSettings]=dataSourceSettings
    [showGroupingBar]='true'
    [showFieldList]='true'>
  </ejs-pivotview>`
})
export class App implements OnInit {
    public dataSourceSettings!: DataSourceSettingsModel;

    ngOnInit(): void {
        // Configuration
    }
}
```

### Common Services

| Service | Purpose | Import |
|---------|---------|--------|
| `GroupingBarService` | Enable grouping bar | `import { GroupingBarService } from '@syncfusion/ej2-angular-pivotview'` |
| `FieldListService` | Enable popup field list | `import { FieldListService } from '@syncfusion/ej2-angular-pivotview'` |
| `ConditionalFormattingService` | Enable conditional formatting | `import { ConditionalFormattingService } from '@syncfusion/ej2-angular-pivotview'` |
| `NumberFormattingService` | Enable number formatting | `import { NumberFormattingService } from '@syncfusion/ej2-angular-pivotview'` |
| `CalculatedFieldService` | Enable calculated field creation | `import { CalculatedFieldService } from '@syncfusion/ej2-angular-pivotview'` |
| `ToolbarService` | Enable toolbar with action buttons | `import { ToolbarService } from '@syncfusion/ej2-angular-pivotview'` |
| `ExcelExportService` | Enable Excel export functionality | `import { ExcelExportService } from '@syncfusion/ej2-angular-pivotview'` |
| `PDFExportService` | Enable PDF export functionality | `import { PDFExportService } from '@syncfusion/ej2-angular-pivotview'` |
| `VirtualScrollService` | Enable virtual scrolling for large datasets | `import { VirtualScrollService } from '@syncfusion/ej2-angular-pivotview'` |
| `PagerService` | Enable paging functionality | `import { PagerService } from '@syncfusion/ej2-angular-pivotview'` |
| `PivotChartService` | Enable pivot chart visualization | `import { PivotChartService } from '@syncfusion/ej2-angular-pivotview'` |
| `DrillThroughService` | Enable drill-through functionality | `import { DrillThroughService } from '@syncfusion/ej2-angular-pivotview'` |

> **Note:** For a static field list component (`ejs-pivotfieldlist`), use `PivotFieldListAllModule` as a separate component. Refer to [Field List documentation](./field-list.md) for details.

### Using All Services (Simplified)

For quick development or when you need all features, import `PivotViewAllModule`:

```typescript
import { PivotViewAllModule } from '@syncfusion/ej2-angular-pivotview';

@Component({
  imports: [PivotViewAllModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-pivotview #pivotview id='PivotView' height='350' [dataSourceSettings]=dataSourceSettings [showGroupingBar]='true' [showFieldList]='true'></ejs-pivotview>`
})
export class App implements OnInit {
    // Component logic
}
```

### Example with GroupingBar and Popup FieldList

This example demonstrates selective service injection for a feature-rich Pivot Table with grouping bar and popup field list:

```typescript
import { Component, OnInit } from '@angular/core';
import { PivotViewModule, GroupingBarService, FieldListService } from '@syncfusion/ej2-angular-pivotview';
import { IDataSet, DataSourceSettingsModel } from '@syncfusion/ej2-angular-pivotview';

@Component({
  imports: [PivotViewModule],
  standalone: true,
  selector: 'app-root',
  providers: [GroupingBarService, FieldListService],
  template: `<ejs-pivotview #pivotview id='PivotView' height='400'
    [dataSourceSettings]=dataSourceSettings
    [showGroupingBar]='true'
    [showFieldList]='true'>
  </ejs-pivotview>`
})
export class App implements OnInit {
    public pivotData!: IDataSet[];
    public dataSourceSettings!: DataSourceSettingsModel;

    ngOnInit(): void {
        this.pivotData = [
            { Country: 'USA', Region: 'North', Product: 'Laptops', Sales: 5000, Year: 2020 },
            { Country: 'USA', Region: 'South', Product: 'Desktops', Sales: 3000, Year: 2020 },
            { Country: 'Canada', Region: 'East', Product: 'Laptops', Sales: 2500, Year: 2020 },
            { Country: 'Canada', Region: 'West', Product: 'Mobiles', Sales: 1500, Year: 2020 }
        ];

        this.dataSourceSettings = {
            dataSource: this.pivotData,
            rows: [{ name: 'Country' }],
            columns: [{ name: 'Product' }],
            values: [{ name: 'Sales', caption: 'Total Sales' }],
            expandAll: false
        };
    }
}
```
