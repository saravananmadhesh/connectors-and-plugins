# Getting Started with Angular Accumulation Chart

This guide explains how to install, set up, and create your first Syncfusion Angular Accumulation Chart.

## Table of Contents

- [Installation](#installation)
  - [Install Package via ng add](#install-package-via-ng-add)
  - [Manual Installation](#manual-installation)
- [Setup Angular Project](#setup-angular-project)
  - [Create New Angular Project](#create-new-angular-project)
  - [Install Chart Package](#install-chart-package)
- [Basic Chart Creation](#basic-chart-creation)
  - [Import AccumulationChartModule](#import-accumulationchartmodule)
  - [Minimal Chart Template](#minimal-chart-template)
- [Data Binding](#data-binding)
  - [Array Data Format](#array-data-format)
  - [Dynamic Data Binding](#dynamic-data-binding)
  - [JSON Data Source](#json-data-source)
- [Module Injection](#module-injection)
  - [Inject Services](#inject-services)
  - [Series Services](#series-services)
  - [Label and Legend Services](#label-and-legend-services)
  - [User Interaction Services](#user-interaction-services)
  - [Annotation Service](#annotation-service)
  - [Export Service](#export-service)
  - [Example Full Accumulation Chart Service Injection](#example-full-accumulation-chart-service-injection)
- [Interfaces](#interfaces)
  - [Accumulation Chart Configuration Interfaces](#accumulation-chart-configuration-interfaces)
  - [Accumulation Series Interfaces](#accumulation-series-interfaces)
  - [Pie and Doughnut Interfaces](#pie-and-doughnut-interfaces)
  - [Funnel and Pyramid Interfaces](#funnel-and-pyramid-interfaces)
  - [Legend Interface](#legend-interface)
  - [Tooltip Interface](#tooltip-interface)
  - [Annotation Interfaces](#annotation-interfaces)
  - [Selection and Highlight Interfaces](#selection-and-highlight-interfaces)
  - [Export and Print Interfaces](#export-and-print-interfaces)
  - [Accumulation Chart Lifecycle Event Interfaces](#accumulation-chart-lifecycle-event-interfaces)
  - [Accumulation Chart Series and Point Event Interfaces](#accumulation-chart-series-and-point-event-interfaces)
  - [Accumulation Chart Tooltip Event Interfaces](#accumulation-chart-tooltip-event-interfaces)
  - [Accumulation Chart Legend Event Interfaces](#accumulation-chart-legend-event-interfaces)
  - [Accumulation Chart Interaction Event Interfaces](#accumulation-chart-interaction-event-interfaces)
  - [Accumulation Chart Annotation Event Interfaces](#accumulation-chart-annotation-event-interfaces)
  - [Example Importing Interfaces](#example-importing-interfaces)
- [Complete Example](#complete-example)
  - [Full Working Component](#full-working-component)
  - [Add to App Component](#add-to-app-component)
  - [Run the Application](#run-the-application)
- [Key Takeaways](#key-takeaways)
- [API Reference Summary](#api-reference-summary)
  - [Core Setup APIs](#core-setup-apis)
  - [Essential Events](#essential-events)

## Installation

### Install Package via ng add

The easiest way to set up the Accumulation Chart is using the Angular CLI `ng add` command:

```bash
ng add @syncfusion/ej2-angular-charts
```

This command automatically:

- Adds the `@syncfusion/ej2-angular-charts` package and dependencies to `package.json`
- Imports required modules
- Configures theme setup

### Manual Installation

If you prefer manual installation:

```bash
npm install @syncfusion/ej2-angular-charts
```

## Setup Angular Project

### Create New Angular Project

```bash
ng new accumulation-chart-app
cd accumulation-chart-app
```

### Install Chart Package

```bash
ng add @syncfusion/ej2-angular-charts
```

## Basic Chart Creation

### Import AccumulationChartModule

In a standalone component using Angular 19+:

```typescript
import { Component } from '@angular/core';
import { AccumulationChartModule } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccumulationChartModule],
  template: `<ejs-accumulationchart></ejs-accumulationchart>`,
  styles: [`#container { height: 420px; width: 100%; }`]
})
export class AppComponent {}
```

In a module-based component using Angular 18 and below:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AccumulationChartModule } from '@syncfusion/ej2-angular-charts';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AccumulationChartModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### Minimal Chart Template

```typescript
@Component({
  template: `
    <ejs-accumulationchart id="container">
      <e-accumulation-series-collection>
        <e-accumulation-series
          [dataSource]="data"
          xName="x"
          yName="y"
          type="Pie">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `,
  styles: [`#container { height: 420px; width: 100%; }`]
})
export class AppComponent {
  public data = [
    { x: 'Item1', y: 30 },
    { x: 'Item2', y: 25 },
    { x: 'Item3', y: 20 },
    { x: 'Item4', y: 25 }
  ];
}
```

## Data Binding

### Array Data Format

Bind data as an array of objects with properties for x-axis category and y-axis value:

```typescript
export class AppComponent {
  public data = [
    { x: 'Chrome', y: 37, text: '37%' },
    { x: 'Firefox', y: 28, text: '28%' },
    { x: 'Safari', y: 18, text: '18%' },
    { x: 'Others', y: 17, text: '17%' }
  ];
}
```

Specify data binding properties on the series:

```html
<e-accumulation-series-collection>
  <e-accumulation-series
    [dataSource]="data"
    xName="x"
    yName="y"
    type="Pie">
  </e-accumulation-series>
</e-accumulation-series-collection>
```

### Dynamic Data Binding

Update data at runtime and the chart refreshes automatically:

```typescript
addData(): void {
  this.data.push({ x: 'NewItem', y: 15 });
}

replaceData(): void {
  this.data = [
    { x: 'A', y: 40 },
    { x: 'B', y: 60 }
  ];
}
```

### JSON Data Source

Load data from external JSON:

```typescript
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';

export class AppComponent implements OnInit {
  public data: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('assets/data.json').subscribe((result: any) => {
      this.data = result;
    });
  }
}
```

## Module Injection

Angular Accumulation Chart features are modular and require service injection to enable them. This reduces bundle size by loading only the required accumulation chart series types, labels, legends, annotations, tooltip, selection, highlight, and export features.

Accumulation Chart supports Pie, Doughnut, Funnel, and Pyramid chart types. Doughnut chart is rendered by using `PieSeriesService` with the `innerRadius` property.

### Inject Services

```typescript
import { Component } from '@angular/core';
import {
  AccumulationChartModule,
  PieSeriesService,
  FunnelSeriesService,
  PyramidSeriesService,
  AccumulationLegendService,
  AccumulationDataLabelService,
  AccumulationTooltipService,
  AccumulationSelectionService,
  AccumulationHighlightService,
  AccumulationAnnotationService,
  ExportService
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccumulationChartModule],
  providers: [
    PieSeriesService,
    FunnelSeriesService,
    PyramidSeriesService,
    AccumulationLegendService,
    AccumulationDataLabelService,
    AccumulationTooltipService,
    AccumulationSelectionService,
    AccumulationHighlightService,
    AccumulationAnnotationService,
    ExportService
  ],
  template: `
    <ejs-accumulationchart
      id="accumulation-chart"
      title="Browser Market Share"
      [legendSettings]="legendSettings"
      [tooltip]="tooltip">
      <e-accumulation-series-collection>
        <e-accumulation-series
          [dataSource]="data"
          xName="x"
          yName="y"
          type="Pie"
          [dataLabel]="dataLabel">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class AppComponent {
  public data: Object[] = [
    { x: 'Chrome', y: 61.3, text: 'Chrome: 61.3%' },
    { x: 'Safari', y: 24.6, text: 'Safari: 24.6%' },
    { x: 'Edge', y: 5.0, text: 'Edge: 5.0%' },
    { x: 'Firefox', y: 2.7, text: 'Firefox: 2.7%' }
  ];

  public legendSettings: Object = {
    visible: true
  };

  public tooltip: Object = {
    enable: true
  };

  public dataLabel: Object = {
    visible: true,
    name: 'text',
    position: 'Outside'
  };
}
```

### Series Services

| Service | Purpose | Import package |
|---------|---------|----------------|
| `PieSeriesService` | Enable pie and doughnut accumulation chart series | `@syncfusion/ej2-angular-charts` |
| `FunnelSeriesService` | Enable funnel accumulation chart series | `@syncfusion/ej2-angular-charts` |
| `PyramidSeriesService` | Enable pyramid accumulation chart series | `@syncfusion/ej2-angular-charts` |

### Label and Legend Services

| Service | Purpose | Import package |
|---------|---------|----------------|
| `AccumulationDataLabelService` | Enable data labels for accumulation chart points | `@syncfusion/ej2-angular-charts` |
| `AccumulationLegendService` | Enable legend support in accumulation chart | `@syncfusion/ej2-angular-charts` |

### User Interaction Services

| Service | Purpose | Import package |
|---------|---------|----------------|
| `AccumulationTooltipService` | Enable tooltip support in accumulation chart | `@syncfusion/ej2-angular-charts` |
| `AccumulationSelectionService` | Enable point selection in accumulation chart | `@syncfusion/ej2-angular-charts` |
| `AccumulationHighlightService` | Enable point highlighting in accumulation chart | `@syncfusion/ej2-angular-charts` |

### Annotation Service

| Service | Purpose | Import package |
|---------|---------|----------------|
| `AccumulationAnnotationService` | Enable annotations in accumulation chart | `@syncfusion/ej2-angular-charts` |

### Export Service

| Service | Purpose | Import package |
|---------|---------|----------------|
| `ExportService` | Enable accumulation chart export and print support | `@syncfusion/ej2-angular-charts` |

### Example Full Accumulation Chart Service Injection

```typescript
import { Component } from '@angular/core';
import {
  AccumulationChartModule,
  PieSeriesService,
  FunnelSeriesService,
  PyramidSeriesService,
  AccumulationLegendService,
  AccumulationDataLabelService,
  AccumulationTooltipService,
  AccumulationSelectionService,
  AccumulationHighlightService,
  AccumulationAnnotationService,
  ExportService
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccumulationChartModule],
  providers: [
    PieSeriesService,
    FunnelSeriesService,
    PyramidSeriesService,
    AccumulationLegendService,
    AccumulationDataLabelService,
    AccumulationTooltipService,
    AccumulationSelectionService,
    AccumulationHighlightService,
    AccumulationAnnotationService,
    ExportService
  ],
  template: `
    <ejs-accumulationchart
      id="accumulation-chart"
      title="Expense Breakdown"
      [legendSettings]="legendSettings"
      [tooltip]="tooltip"
      [enableSmartLabels]="true"
      [enableAnimation]="true">
      <e-accumulation-series-collection>
        <e-accumulation-series
          [dataSource]="data"
          xName="x"
          yName="y"
          type="Pie"
          innerRadius="40%"
          [explode]="true"
          [explodeIndex]="0"
          [dataLabel]="dataLabel">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class AppComponent {
  public data: Object[] = [
    { x: 'Food', y: 35, text: 'Food: 35%' },
    { x: 'Transport', y: 25, text: 'Transport: 25%' },
    { x: 'Rent', y: 20, text: 'Rent: 20%' },
    { x: 'Utilities', y: 12, text: 'Utilities: 12%' },
    { x: 'Others', y: 8, text: 'Others: 8%' }
  ];

  public legendSettings: Object = {
    visible: true
  };

  public tooltip: Object = {
    enable: true
  };

  public dataLabel: Object = {
    visible: true,
    name: 'text',
    position: 'Outside'
  };
}
```

## Interfaces

Angular Accumulation Chart provides TypeScript interfaces to strongly type accumulation chart configuration, series settings, data labels, annotations, legends, tooltips, center labels, borders, margins, accessibility settings, and event arguments.

### Accumulation Chart Configuration Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `AccumulationChartModel` | Defines the complete configuration model for the Accumulation Chart component | `@syncfusion/ej2-angular-charts` |
| `ChartAreaModel` | Defines chart area customization options such as background and border | `@syncfusion/ej2-angular-charts` |
| `BorderModel` | Defines border color, width, and dash array settings | `@syncfusion/ej2-angular-charts` |
| `MarginModel` | Defines margin settings for the accumulation chart | `@syncfusion/ej2-angular-charts` |
| `FontModel` | Defines font style, size, color, weight, opacity, and family settings | `@syncfusion/ej2-angular-charts` |
| `TitleStyleSettingsModel` | Defines title text style settings | `@syncfusion/ej2-angular-charts` |
| `TitleBorderModel` | Defines title border customization settings | `@syncfusion/ej2-angular-charts` |
| `TitleSettingsModel` | Defines title configuration settings | `@syncfusion/ej2-angular-charts` |
| `AccessibilityModel` | Defines accessibility settings for accumulation chart elements | `@syncfusion/ej2-angular-charts` |

### Accumulation Series Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `AccumulationSeriesModel` | Defines accumulation chart series configuration | `@syncfusion/ej2-angular-charts` |
| `AccumulationDataLabelSettingsModel` | Defines data label settings for accumulation chart points | `@syncfusion/ej2-angular-charts` |
| `EmptyPointSettingsModel` | Defines empty point behavior and appearance for accumulation chart series | `@syncfusion/ej2-angular-charts` |
| `ConnectorModel` | Defines connector line settings for accumulation chart data labels | `@syncfusion/ej2-angular-charts` |
| `AnimationModel` | Defines animation duration, delay, and enable settings | `@syncfusion/ej2-angular-charts` |
| `SeriesAccessibilityModel` | Defines accessibility settings for accumulation chart series | `@syncfusion/ej2-angular-charts` |
| `IndexesModel` | Defines point index information used for selection or highlighting | `@syncfusion/ej2-angular-charts` |

### Pie and Doughnut Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `PieCenterModel` | Defines center position settings for pie and doughnut charts | `@syncfusion/ej2-angular-charts` |
| `CenterLabelModel` | Defines center label settings for doughnut chart | `@syncfusion/ej2-angular-charts` |
| `LocationModel` | Defines x and y location settings | `@syncfusion/ej2-angular-charts` |

### Funnel and Pyramid Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `AccumulationSeriesModel` | Defines funnel and pyramid series settings such as neck width, neck height, gap ratio, and mode | `@syncfusion/ej2-angular-charts` |
| `BorderModel` | Defines border settings for funnel and pyramid segments | `@syncfusion/ej2-angular-charts` |

### Legend Interface

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `LegendSettingsModel` | Defines legend settings for accumulation chart | `@syncfusion/ej2-angular-charts` |

### Tooltip Interface

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `TooltipSettingsModel` | Defines tooltip settings for accumulation chart | `@syncfusion/ej2-angular-charts` |
| `LocationModel` | Defines tooltip location settings | `@syncfusion/ej2-angular-charts` |
| `BorderModel` | Defines tooltip border settings | `@syncfusion/ej2-angular-charts` |
| `FontModel` | Defines tooltip text style settings | `@syncfusion/ej2-angular-charts` |

### Annotation Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `AccumulationAnnotationSettingsModel` | Defines annotation settings for accumulation chart | `@syncfusion/ej2-angular-charts` |
| `LocationModel` | Defines annotation location settings | `@syncfusion/ej2-angular-charts` |

### Selection and Highlight Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IndexesModel` | Defines selected or highlighted point index information | `@syncfusion/ej2-angular-charts` |
| `BorderModel` | Defines border settings applied during selection or highlight customization | `@syncfusion/ej2-angular-charts` |

### Export and Print Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IExportEventArgs` | Defines event arguments for accumulation chart export events | `@syncfusion/ej2-angular-charts` |
| `IAfterExportEventArgs` | Defines event arguments after export is completed | `@syncfusion/ej2-angular-charts` |
| `IPrintEventArgs` | Defines event arguments for accumulation chart print events | `@syncfusion/ej2-angular-charts` |
| `IPDFArgs` | Defines PDF export event arguments | `@syncfusion/ej2-angular-charts` |

### Accumulation Chart Lifecycle Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IAccLoadedEventArgs` | Defines event arguments for accumulation chart load and loaded events | `@syncfusion/ej2-angular-charts` |
| `IAccBeforeResizeEventArgs` | Defines event arguments before accumulation chart resize | `@syncfusion/ej2-angular-charts` |
| `IAccResizeEventArgs` | Defines event arguments after accumulation chart resize | `@syncfusion/ej2-angular-charts` |
| `IAccAnimationCompleteEventArgs` | Defines event arguments after accumulation chart animation is completed | `@syncfusion/ej2-angular-charts` |

### Accumulation Chart Series and Point Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IAccSeriesRenderEventArgs` | Defines event arguments used while rendering accumulation chart series | `@syncfusion/ej2-angular-charts` |
| `IAccPointRenderEventArgs` | Defines event arguments used while rendering each accumulation chart point | `@syncfusion/ej2-angular-charts` |
| `IPointEventArgs` | Defines event arguments for accumulation chart point click and point move events | `@syncfusion/ej2-angular-charts` |
| `IAccTextRenderEventArgs` | Defines event arguments used while rendering accumulation chart data labels | `@syncfusion/ej2-angular-charts` |

### Accumulation Chart Tooltip Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IAccTooltipRenderEventArgs` | Defines event arguments used while rendering accumulation chart tooltip | `@syncfusion/ej2-angular-charts` |

### Accumulation Chart Legend Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IAccLegendRenderEventArgs` | Defines event arguments used while rendering accumulation chart legend items | `@syncfusion/ej2-angular-charts` |
| `IAccLegendClickEventArgs` | Defines event arguments for accumulation chart legend click events | `@syncfusion/ej2-angular-charts` |
| `ILegendRenderEventArgs` | Defines shared legend render event arguments | `@syncfusion/ej2-angular-charts` |

### Accumulation Chart Interaction Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IMouseEventArgs` | Defines event arguments for accumulation chart mouse events | `@syncfusion/ej2-angular-charts` |
| `IAccSelectionCompleteEventArgs` | Defines event arguments after accumulation chart selection is completed | `@syncfusion/ej2-angular-charts` |

### Accumulation Chart Annotation Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IAnnotationRenderEventArgs` | Defines event arguments used while rendering accumulation chart annotations | `@syncfusion/ej2-angular-charts` |

### Example Importing Interfaces

```typescript
import {
  AccumulationChartModel,
  AccumulationSeriesModel,
  AccumulationDataLabelSettingsModel,
  AccumulationAnnotationSettingsModel,
  PieCenterModel,
  CenterLabelModel,
  LegendSettingsModel,
  TooltipSettingsModel,
  BorderModel,
  FontModel,
  MarginModel,
  ChartAreaModel,
  AnimationModel,
  EmptyPointSettingsModel,
  ConnectorModel,
  IndexesModel,
  AccessibilityModel,
  IAccLoadedEventArgs,
  IAccBeforeResizeEventArgs,
  IAccResizeEventArgs,
  IAccAnimationCompleteEventArgs,
  IAccSeriesRenderEventArgs,
  IAccPointRenderEventArgs,
  IPointEventArgs,
  IAccTextRenderEventArgs,
  IAccTooltipRenderEventArgs,
  IAccLegendRenderEventArgs,
  IAccLegendClickEventArgs,
  IAccSelectionCompleteEventArgs,
  IAnnotationRenderEventArgs,
  IMouseEventArgs,
  IExportEventArgs,
  IAfterExportEventArgs,
  IPrintEventArgs
} from '@syncfusion/ej2-angular-charts';

const border: BorderModel = {
  color: '#ffffff',
  width: 1
};

const titleStyle: FontModel = {
  size: '16px',
  fontWeight: '600'
};

const margin: MarginModel = {
  left: 10,
  right: 10,
  top: 10,
  bottom: 10
};

const chartArea: ChartAreaModel = {
  border: {
    width: 0
  }
};

const animation: AnimationModel = {
  enable: true,
  duration: 1000
};

const emptyPointSettings: EmptyPointSettingsModel = {
  mode: 'Drop'
};

const connector: ConnectorModel = {
  type: 'Curve',
  length: '20px'
};

const dataLabel: AccumulationDataLabelSettingsModel = {
  visible: true,
  name: 'text',
  position: 'Outside',
  connectorStyle: connector
};

const pieCenter: PieCenterModel = {
  x: '50%',
  y: '50%'
};

const centerLabel: CenterLabelModel = {
  text: 'Total'
};

const legendSettings: LegendSettingsModel = {
  visible: true,
  position: 'Bottom'
};

const tooltip: TooltipSettingsModel = {
  enable: true,
  format: '${point.x}: ${point.y}%'
};

const selectionIndex: IndexesModel = {
  point: 0,
  series: 0
};

const accessibility: AccessibilityModel = {
  accessibilityDescription: 'Browser market share accumulation chart',
  accessibilityRole: 'img'
};

const annotation: AccumulationAnnotationSettingsModel = {
  content: '<div>Annotation</div>',
  region: 'Chart',
  x: '50%',
  y: '50%'
};

const series: AccumulationSeriesModel = {
  dataSource: [
    { x: 'Chrome', y: 61.3, text: 'Chrome: 61.3%' },
    { x: 'Safari', y: 24.6, text: 'Safari: 24.6%' },
    { x: 'Edge', y: 5.0, text: 'Edge: 5.0%' },
    { x: 'Firefox', y: 2.7, text: 'Firefox: 2.7%' }
  ],
  xName: 'x',
  yName: 'y',
  type: 'Pie',
  innerRadius: '40%',
  explode: true,
  explodeIndex: 0,
  border,
  animation,
  emptyPointSettings,
  dataLabel
};

const accumulationChartOptions: AccumulationChartModel = {
  title: 'Browser Market Share',
  titleStyle,
  margin,
  chartArea,
  center: pieCenter,
  centerLabel,
  legendSettings,
  tooltip,
  annotations: [annotation],
  selectedDataIndexes: [selectionIndex],
  accessibility,
  series: [series]
};

const load = (args: IAccLoadedEventArgs): void => {
  // Accumulation Chart loading.
};

const loaded = (args: IAccLoadedEventArgs): void => {
  // Accumulation Chart loaded.
};

const beforeResize = (args: IAccBeforeResizeEventArgs): void => {
  // Before Accumulation Chart resize.
};

const resized = (args: IAccResizeEventArgs): void => {
  // Accumulation Chart resized.
};

const animationComplete = (args: IAccAnimationCompleteEventArgs): void => {
  // Accumulation Chart animation completed.
};

const seriesRender = (args: IAccSeriesRenderEventArgs): void => {
  // Accumulation Chart series rendering.
};

const pointRender = (args: IAccPointRenderEventArgs): void => {
  // Accumulation Chart point rendering.
};

const pointClick = (args: IPointEventArgs): void => {
  // Accumulation Chart point clicked.
};

const textRender = (args: IAccTextRenderEventArgs): void => {
  // Accumulation Chart data label rendering.
};

const tooltipRender = (args: IAccTooltipRenderEventArgs): void => {
  // Accumulation Chart tooltip rendering.
};

const legendRender = (args: IAccLegendRenderEventArgs): void => {
  // Accumulation Chart legend rendering.
};

const legendClick = (args: IAccLegendClickEventArgs): void => {
  // Accumulation Chart legend clicked.
};

const selectionComplete = (args: IAccSelectionCompleteEventArgs): void => {
  // Accumulation Chart selection completed.
};

const annotationRender = (args: IAnnotationRenderEventArgs): void => {
  // Accumulation Chart annotation rendering.
};

const chartMouseMove = (args: IMouseEventArgs): void => {
  // Accumulation Chart mouse move.
};

const beforeExport = (args: IExportEventArgs): void => {
  // Before Accumulation Chart export.
};

const afterExport = (args: IAfterExportEventArgs): void => {
  // After Accumulation Chart export.
};

const beforePrint = (args: IPrintEventArgs): void => {
  // Before Accumulation Chart print.
};
```

## Complete Example

### Full Working Component

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AccumulationChartModule,
  PieSeriesService,
  AccumulationTooltipService,
  AccumulationDataLabelService
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule, AccumulationChartModule],
  providers: [PieSeriesService, AccumulationTooltipService, AccumulationDataLabelService],
  template: `
    <div style="width: 100%; max-width: 800px; margin: 0 auto;">
      <h1>Browser Market Share</h1>
      <ejs-accumulationchart
        id="container"
        [title]="title"
        [tooltip]="tooltip">
        <e-accumulation-series-collection>
          <e-accumulation-series
            [dataSource]="chartData"
            xName="browser"
            yName="percentage"
            type="Pie"
            [dataLabel]="dataLabel">
          </e-accumulation-series>
        </e-accumulation-series-collection>
      </ejs-accumulationchart>
    </div>
  `,
  styles: [`#container { height: 420px; width: 100%; }`]
})
export class PieChartComponent {
  public title = 'Browser Usage Statistics';

  public tooltip = {
    enable: true
  };

  public dataLabel = {
    visible: true,
    position: 'Inside',
    name: 'percentage'
  };

  public chartData = [
    { browser: 'Chrome', percentage: 37 },
    { browser: 'Firefox', percentage: 28 },
    { browser: 'Safari', percentage: 18 },
    { browser: 'Edge', percentage: 12 },
    { browser: 'Others', percentage: 5 }
  ];
}
```

### Add to App Component

```typescript
import { Component } from '@angular/core';
import { PieChartComponent } from './pie-chart/pie-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PieChartComponent],
  template: `<app-pie-chart></app-pie-chart>`
})
export class AppComponent {}
```

### Run the Application

```bash
ng serve
```

Open your browser to `http://localhost:4200` and view the pie chart.

## Key Takeaways

- Use `ng add @syncfusion/ej2-angular-charts` for quick setup.
- Import `AccumulationChartModule` in standalone or module components.
- Bind data using `dataSource`, `xName`, and `yName` properties.
- Include Syncfusion theme CSS for proper styling.
- Update data at runtime for dynamic charts.
- Always set chart container height and width in CSS.

## API Reference Summary

### Core Setup APIs

| API | Description | Documentation Link |
|-----|-------------|--------------------|
| `AccumulationChart` | Main chart component | [AccumulationChart](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart) |
| `AccumulationSeries` | Series configuration | [AccumulationSeries](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries) |
| `dataSource` | Data binding property | [dataSource](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#datasource) |
| `xName` | X-axis field name | [xName](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#xname) |
| `yName` | Y-axis field name | [yName](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#yname) |
| `type` | Chart type such as Pie, Doughnut, Pyramid, or Funnel | [type](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#type) |
| `title` | Chart title text | [title](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#title) |
| `tooltip` | Tooltip configuration | [tooltip](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#tooltip) |
| `width` | Chart width | [width](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#width) |
| `height` | Chart height | [height](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#height) |

### Essential Events

| Event | Description | Documentation Link |
|-------|-------------|--------------------|
| `load` | Fires before chart loads | [load](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#load) |
| `loaded` | Fires after chart loads | [loaded](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#loaded) |
| `pointClick` | Fires on point click | [pointClick](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#pointclick) |

For complete API documentation, see [api-reference.md](references/api-reference.md).
