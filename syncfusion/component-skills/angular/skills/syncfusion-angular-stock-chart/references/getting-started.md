# Getting Started with Stock Chart

Learn how to install, set up, and create your first stock chart in an Angular application.

## Table of Contents

- [Installation](#installation)
  - [Step 1 Install the Syncfusion Charts Package](#step-1-install-the-syncfusion-charts-package)
  - [Alternative Manual NPM Installation](#alternative-manual-npm-installation)
  - [Step 2 Check Angular Version Compatibility](#step-2-check-angular-version-compatibility)
- [Basic Implementation](#basic-implementation)
  - [Minimal Stock Chart](#minimal-stock-chart)
- [Data Binding](#data-binding)
  - [Data Format](#data-format)
  - [Binding Data from Array](#binding-data-from-array)
  - [Binding with DataManager](#binding-with-datamanager)
- [Module Injection](#module-injection)
  - [Inject Services](#inject-services)
  - [Stock Chart Series Services](#stock-chart-series-services)
  - [Range Navigator Services](#range-navigator-services)
  - [Axis Services](#axis-services)
  - [User Interaction Services](#user-interaction-services)
  - [Legend Service](#legend-service)
  - [Technical Indicator Services](#technical-indicator-services)
  - [Analysis Services](#analysis-services)
  - [Period Selector Service](#period-selector-service)
  - [Export Service](#export-service)
  - [Example Full Stock Chart Service Injection](#example-full-stock-chart-service-injection)
- [Interfaces](#interfaces)
  - [Stock Chart Configuration Interfaces](#stock-chart-configuration-interfaces)
  - [Stock Chart Axis Interfaces](#stock-chart-axis-interfaces)
  - [Stock Chart Series Interfaces](#stock-chart-series-interfaces)
  - [Tooltip and Crosshair Interfaces](#tooltip-and-crosshair-interfaces)
  - [Legend Interface](#legend-interface)
  - [Technical Indicator Interfaces](#technical-indicator-interfaces)
  - [Trendline Interfaces](#trendline-interfaces)
  - [Period Selector Interfaces](#period-selector-interfaces)
  - [Stock Event Interfaces](#stock-event-interfaces)
  - [Annotation Interfaces](#annotation-interfaces)
  - [Range Navigator Configuration Interfaces](#range-navigator-configuration-interfaces)
  - [Range Navigator Style Interfaces](#range-navigator-style-interfaces)
  - [Shared Chart Layout Interfaces](#shared-chart-layout-interfaces)
  - [Stock Chart Lifecycle Event Interfaces](#stock-chart-lifecycle-event-interfaces)
  - [Stock Chart Series and Point Event Interfaces](#stock-chart-series-and-point-event-interfaces)
  - [Stock Chart Axis Event Interfaces](#stock-chart-axis-event-interfaces)
  - [Stock Chart Tooltip Event Interfaces](#stock-chart-tooltip-event-interfaces)
  - [Stock Chart Legend Event Interfaces](#stock-chart-legend-event-interfaces)
  - [Stock Chart Interaction Event Interfaces](#stock-chart-interaction-event-interfaces)
  - [Stock Chart Range Selector Event Interfaces](#stock-chart-range-selector-event-interfaces)
  - [Stock Event Render Interface](#stock-event-render-interface)
  - [Export and Print Event Interfaces](#export-and-print-event-interfaces)
  - [Range Navigator Event Interfaces](#range-navigator-event-interfaces)
  - [Example Importing Interfaces](#example-importing-interfaces)
- [Verifying Your Setup](#verifying-your-setup)
  - [Check 1 Module Imports](#check-1-module-imports)
  - [Check 2 Template Structure](#check-2-template-structure)
  - [Check 3 Data Format](#check-3-data-format)
  - [Check 4 Visible Chart](#check-4-visible-chart)
- [Common Initialization Issues](#common-initialization-issues)

## Installation

### Step 1 Install the Syncfusion Charts Package

Use Angular CLI's `ng add` command to install the package and automatically configure your project:

```bash
ng add @syncfusion/ej2-angular-charts
```

This command:

- Adds `@syncfusion/ej2-angular-charts` to your `package.json`
- Installs peer dependencies automatically
- Imports necessary modules in your application
- Configures theme CSS imports

### Alternative Manual NPM Installation

If `ng add` is not available in your environment:

```bash
npm install @syncfusion/ej2-angular-charts
npm install @syncfusion/ej2-base @syncfusion/ej2-calendars @syncfusion/ej2-dropdowns
```

### Step 2 Check Angular Version Compatibility

Stock Chart requires:

- **Angular 19+:** Uses standalone components by default
- **Angular 12-18:** Uses the legacy NgModule approach

Verify your version:

```bash
ng version
```

## Basic Implementation

### Minimal Stock Chart

Create a standalone component that imports the chart modules:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { ChartAllModule, StockChartAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
  imports: [ChartAllModule, StockChartAllModule],
  standalone: true,
  selector: 'app-stock',
  template: `<ejs-stockchart id="chart-container"></ejs-stockchart>`,
  encapsulation: ViewEncapsulation.None
})
export class StockChartComponent {}
```

Add the component selector to your page:

```html
<app-stock></app-stock>
```

Run your application:

```bash
ng serve
```

The chart renders with default styling and empty data.

## Data Binding

Stock Chart needs data in an array of objects with OHLC (Open, High, Low, Close) values and a date field.

### Data Format

```typescript
interface StockData {
  x: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}
```

### Binding Data from Array

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { ChartAllModule, StockChartAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
  imports: [ChartAllModule, StockChartAllModule],
  standalone: true,
  selector: 'app-stock',
  template: `
    <ejs-stockchart id="chart-container" [dataSource]="chartData">
      <e-stockchart-series-collection>
        <e-stockchart-series
          [dataSource]="chartData"
          type="Candle"
          xName="x"
          high="high"
          low="low"
          open="open"
          close="close">
        </e-stockchart-series>
      </e-stockchart-series-collection>
    </ejs-stockchart>
  `,
  encapsulation: ViewEncapsulation.None
})
export class StockChartComponent {
  public chartData = [
    { x: new Date(2023, 0, 1), open: 100, high: 105, low: 95, close: 102 },
    { x: new Date(2023, 0, 2), open: 102, high: 108, low: 100, close: 105 },
    { x: new Date(2023, 0, 3), open: 105, high: 110, low: 103, close: 108 }
  ];
}
```

**Key Points:**

- `dataSource` can be configured at the chart or series level.
- The series `xName` property maps the date field.
- OHLC fields such as `high`, `low`, `open`, and `close` are specified in the series configuration.
- Data should be sorted by date in ascending order.

**Tips:**

- Parse date strings from APIs to JavaScript `Date` objects.
- Handle async loading with observables.
- Consider filtering large datasets because 10k+ points may impact performance.

### Binding with DataManager

For server-side data operations such as filtering and sorting:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { ChartAllModule, StockChartAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
  imports: [ChartAllModule, StockChartAllModule],
  standalone: true,
  selector: 'app-stock',
  template: `
    <ejs-stockchart
      id="stockChartSpline"
      [enablePeriodSelector]="enable"
      [chartArea]="chartArea"
      [primaryXAxis]="primaryXAxis"
      [primaryYAxis]="primaryYAxis"
      [seriesType]="seriesType"
      [indicatorType]="indicatorType">
      <e-stockchart-series-collection>
        <e-stockchart-series
          [dataSource]="dataManager"
          [query]="query"
          type="Line"
          xName="OrderDate"
          yName="Freight">
        </e-stockchart-series>
      </e-stockchart-series-collection>
    </ejs-stockchart>
  `,
  encapsulation: ViewEncapsulation.None
})
export class StockChartComponent {
  public dataManager: DataManager = new DataManager({
    url: 'https://services.syncfusion.com/angular/production/api/orders'
  });

  public query: Query = new Query().take(50);
  public seriesType: string[] = ['Spline'];
  public indicatorType: string[] = [];
  public enable: boolean = true;

  public chartArea: object = {
    border: { width: 0 }
  };

  public primaryXAxis: object = {
    valueType: 'DateTime',
    crosshairTooltip: { enable: true },
    majorGridLines: { width: 0 }
  };

  public primaryYAxis: object = {
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 }
  };
}
```

## Module Injection

Angular Stock Chart features are modular and require service injection to enable them. This reduces bundle size by loading only the required stock chart series, range navigator series, axis types, indicators, and interactive features.

Stock Chart includes financial charting with range selection behavior, so injectable services can include both Stock Chart and Range Navigator-related services.

### Inject Services

```typescript
import { Component } from '@angular/core';
import {
  StockChartModule,
  LineSeriesService,
  SplineSeriesService,
  AreaSeriesService,
  StepLineSeriesService,
  HiloSeriesService,
  HiloOpenCloseSeriesService,
  CandleSeriesService,
  ColumnSeriesService,
  DateTimeService,
  DateTimeCategoryService,
  CategoryService,
  LogarithmicService,
  TooltipService,
  RangeTooltipService,
  CrosshairService,
  ZoomService,
  StockLegendService,
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
  PeriodSelectorService,
  ExportService
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StockChartModule],
  providers: [
    LineSeriesService,
    SplineSeriesService,
    AreaSeriesService,
    StepLineSeriesService,
    HiloSeriesService,
    HiloOpenCloseSeriesService,
    CandleSeriesService,
    ColumnSeriesService,
    DateTimeService,
    DateTimeCategoryService,
    CategoryService,
    LogarithmicService,
    TooltipService,
    RangeTooltipService,
    CrosshairService,
    ZoomService,
    StockLegendService,
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
    PeriodSelectorService,
    ExportService
  ],
  template: `
    <ejs-stockchart [primaryXAxis]="primaryXAxis">
      <e-stockchart-series-collection>
        <e-stockchart-series
          [dataSource]="data"
          type="Candle"
          xName="date"
          high="high"
          low="low"
          open="open"
          close="close"
          volume="volume"
          name="Stock">
        </e-stockchart-series>
      </e-stockchart-series-collection>
    </ejs-stockchart>
  `
})
export class AppComponent {
  public primaryXAxis: Object = {
    valueType: 'DateTime'
  };

  public data: Object[] = [
    { date: new Date('2024-01-01'), open: 120, high: 125, low: 118, close: 123, volume: 1000 },
    { date: new Date('2024-01-02'), open: 123, high: 128, low: 121, close: 126, volume: 1200 },
    { date: new Date('2024-01-03'), open: 126, high: 130, low: 124, close: 129, volume: 1400 }
  ];
}
```

### Stock Chart Series Services

| Service | Purpose | Import package |
|---------|---------|----------------|
| `LineSeriesService` | Enable line series in Stock Chart | `@syncfusion/ej2-angular-charts` |
| `SplineSeriesService` | Enable spline series in Stock Chart | `@syncfusion/ej2-angular-charts` |
| `AreaSeriesService` | Enable area series in Stock Chart | `@syncfusion/ej2-angular-charts` |
| `HiloSeriesService` | Enable high-low financial series in Stock Chart | `@syncfusion/ej2-angular-charts` |
| `HiloOpenCloseSeriesService` | Enable high-low-open-close financial series in Stock Chart | `@syncfusion/ej2-angular-charts` |
| `CandleSeriesService` | Enable candle and hollow candle financial series in Stock Chart | `@syncfusion/ej2-angular-charts` |
| `ColumnSeriesService` | Enable column rendering for volume or chart-based stock visualization | `@syncfusion/ej2-angular-charts` |

### Range Navigator Services

| Service | Purpose | Import package |
|---------|---------|----------------|
| `LineSeriesService` | Enable line series rendering in the range navigator | `@syncfusion/ej2-angular-charts` |
| `AreaSeriesService` | Enable area series rendering in the range navigator | `@syncfusion/ej2-angular-charts` |
| `StepLineSeriesService` | Enable step line series rendering in the range navigator | `@syncfusion/ej2-angular-charts` |
| `RangeTooltipService` | Enable tooltip support in the range navigator | `@syncfusion/ej2-angular-charts` |
| `PeriodSelectorService` | Enable period selector support for range filtering | `@syncfusion/ej2-angular-charts` |

### Axis Services

| Service | Purpose | Import package |
|---------|---------|----------------|
| `DateTimeService` | Enable date-time axis support for stock data | `@syncfusion/ej2-angular-charts` |
| `DateTimeCategoryService` | Enable date-time category axis support | `@syncfusion/ej2-angular-charts` |
| `CategoryService` | Enable category axis support | `@syncfusion/ej2-angular-charts` |
| `LogarithmicService` | Enable logarithmic axis support | `@syncfusion/ej2-angular-charts` |

### User Interaction Services

| Service | Purpose | Import package |
|---------|---------|----------------|
| `TooltipService` | Enable tooltip and trackball support in Stock Chart | `@syncfusion/ej2-angular-charts` |
| `RangeTooltipService` | Enable tooltip support in the range navigator | `@syncfusion/ej2-angular-charts` |
| `CrosshairService` | Enable crosshair interaction in Stock Chart | `@syncfusion/ej2-angular-charts` |
| `ZoomService` | Enable zooming and panning support in Stock Chart | `@syncfusion/ej2-angular-charts` |

### Legend Service

| Service | Purpose | Import package |
|---------|---------|----------------|
| `StockLegendService` | Enable legend support in Stock Chart | `@syncfusion/ej2-angular-charts` |

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
| `TrendlinesService` | Enable trendline support in Stock Chart | `@syncfusion/ej2-angular-charts` |

### Period Selector Service

| Service | Purpose | Import package |
|---------|---------|----------------|
| `PeriodSelectorService` | Enable period selector support for Stock Chart range filtering | `@syncfusion/ej2-angular-charts` |

### Export Service

| Service | Purpose | Import package |
|---------|---------|----------------|
| `ExportService` | Enable Stock Chart export and print support | `@syncfusion/ej2-angular-charts` |

### Example Full Stock Chart Service Injection

```typescript
import { Component } from '@angular/core';
import {
  StockChartModule,
  LineSeriesService,
  SplineSeriesService,
  AreaSeriesService,
  StepLineSeriesService,
  HiloSeriesService,
  HiloOpenCloseSeriesService,
  CandleSeriesService,
  ColumnSeriesService,
  DateTimeService,
  DateTimeCategoryService,
  CategoryService,
  LogarithmicService,
  TooltipService,
  RangeTooltipService,
  CrosshairService,
  ZoomService,
  StockLegendService,
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
  PeriodSelectorService,
  ExportService
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StockChartModule],
  providers: [
    LineSeriesService,
    SplineSeriesService,
    AreaSeriesService,
    StepLineSeriesService,
    HiloSeriesService,
    HiloOpenCloseSeriesService,
    CandleSeriesService,
    ColumnSeriesService,
    DateTimeService,
    DateTimeCategoryService,
    CategoryService,
    LogarithmicService,
    TooltipService,
    RangeTooltipService,
    CrosshairService,
    ZoomService,
    StockLegendService,
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
    PeriodSelectorService,
    ExportService
  ],
  template: `
    <ejs-stockchart>
      <e-stockchart-series-collection>
        <e-stockchart-series
          [dataSource]="data"
          type="Candle"
          xName="date"
          high="high"
          low="low"
          open="open"
          close="close"
          volume="volume"
          name="Stock">
        </e-stockchart-series>
      </e-stockchart-series-collection>
    </ejs-stockchart>
  `
})
export class AppComponent {
  public data: Object[] = [
    { date: new Date('2024-01-01'), open: 120, high: 125, low: 118, close: 123, volume: 1000 },
    { date: new Date('2024-01-02'), open: 123, high: 128, low: 121, close: 126, volume: 1200 },
    { date: new Date('2024-01-03'), open: 126, high: 130, low: 124, close: 129, volume: 1400 }
  ];
}
```

## Interfaces

Angular Stock Chart provides TypeScript interfaces to strongly type stock chart configuration, range navigator configuration, axis settings, series settings, indicators, trendlines, stock events, annotations, tooltips, legends, and event arguments.

### Stock Chart Configuration Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `StockChartModel` | Defines the complete configuration model for the Stock Chart component | `@syncfusion/ej2-angular-charts` |
| `StockChartAreaModel` | Defines stock chart area customization options such as background and border | `@syncfusion/ej2-angular-charts` |
| `StockChartBorderModel` | Defines stock chart border color and width settings | `@syncfusion/ej2-angular-charts` |
| `StockChartFontModel` | Defines font style, size, color, weight, and family settings used in Stock Chart | `@syncfusion/ej2-angular-charts` |
| `StockChartMarginModel` | Defines margin settings for the Stock Chart | `@syncfusion/ej2-angular-charts` |

### Stock Chart Axis Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `StockChartAxisModel` | Defines configuration for primary and secondary Stock Chart axes | `@syncfusion/ej2-angular-charts` |
| `StockChartRowModel` | Defines row configuration for multi-row Stock Chart layout | `@syncfusion/ej2-angular-charts` |
| `StockChartColumnModel` | Defines column configuration for multi-column Stock Chart layout | `@syncfusion/ej2-angular-charts` |
| `MajorGridLinesModel` | Defines major grid line settings for chart axes | `@syncfusion/ej2-angular-charts` |
| `MinorGridLinesModel` | Defines minor grid line settings for chart axes | `@syncfusion/ej2-angular-charts` |
| `MajorTickLinesModel` | Defines major tick line settings for chart axes | `@syncfusion/ej2-angular-charts` |
| `MinorTickLinesModel` | Defines minor tick line settings for chart axes | `@syncfusion/ej2-angular-charts` |
| `AxisLineModel` | Defines axis line style settings | `@syncfusion/ej2-angular-charts` |
| `CrosshairTooltipModel` | Defines crosshair tooltip settings for Stock Chart axes | `@syncfusion/ej2-angular-charts` |
| `StripLineSettingsModel` | Defines strip line settings for Stock Chart axes | `@syncfusion/ej2-angular-charts` |

### Stock Chart Series Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `StockChartSeriesModel` | Defines Stock Chart series configuration | `@syncfusion/ej2-angular-charts` |
| `StockChartEmptyPointSettingsModel` | Defines empty point behavior and appearance for Stock Chart series | `@syncfusion/ej2-angular-charts` |
| `StockChartConnectorModel` | Defines connector line settings used by labels and related Stock Chart elements | `@syncfusion/ej2-angular-charts` |
| `StockChartIndexesModel` | Defines series and point index information used for selection or highlighting | `@syncfusion/ej2-angular-charts` |
| `AnimationModel` | Defines animation duration, delay, and enable settings for chart rendering | `@syncfusion/ej2-angular-charts` |
| `BorderModel` | Defines border color, width, and dash array settings used by series and chart elements | `@syncfusion/ej2-angular-charts` |
| `MarkerSettingsModel` | Defines marker settings for chart series points | `@syncfusion/ej2-angular-charts` |
| `DataLabelSettingsModel` | Defines data label settings for chart points | `@syncfusion/ej2-angular-charts` |
| `EmptyPointSettingsModel` | Defines empty point behavior and appearance for chart series | `@syncfusion/ej2-angular-charts` |

### Tooltip and Crosshair Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `TooltipSettingsModel` | Defines Stock Chart tooltip settings | `@syncfusion/ej2-angular-charts` |
| `TooltipLocationModel` | Defines tooltip location settings | `@syncfusion/ej2-angular-charts` |
| `CrosshairSettingsModel` | Defines crosshair settings for Stock Chart interaction | `@syncfusion/ej2-angular-charts` |
| `CrosshairTooltipModel` | Defines tooltip settings displayed with the crosshair | `@syncfusion/ej2-angular-charts` |

### Legend Interface

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `StockChartLegendSettingsModel` | Defines Stock Chart legend settings | `@syncfusion/ej2-angular-charts` |
| `LegendSettingsModel` | Defines shared chart legend settings | `@syncfusion/ej2-angular-charts` |

### Technical Indicator Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `StockChartIndicatorModel` | Defines Stock Chart technical indicator settings such as SMA, EMA, RSI, MACD, Bollinger Bands, Momentum, ATR, TMA, Stochastic, and Accumulation Distribution indicators | `@syncfusion/ej2-angular-charts` |
| `TechnicalIndicatorModel` | Defines shared technical indicator settings | `@syncfusion/ej2-angular-charts` |

### Trendline Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `StockChartTrendlineModel` | Defines trendline settings for Stock Chart series | `@syncfusion/ej2-angular-charts` |
| `TrendlineModel` | Defines shared trendline settings for chart series | `@syncfusion/ej2-angular-charts` |
| `TrendlineMarkerModel` | Defines marker settings for trendline points | `@syncfusion/ej2-angular-charts` |

### Period Selector Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `StockChartPeriodModel` | Defines period selector button configuration for Stock Chart | `@syncfusion/ej2-angular-charts` |
| `PeriodSelectorSettingsModel` | Defines period selector configuration used for range filtering | `@syncfusion/ej2-angular-charts` |
| `PeriodModel` | Defines individual period button settings | `@syncfusion/ej2-angular-charts` |

### Stock Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `StockEventsSettingsModel` | Defines stock event marker settings such as date, text, description, type, background, border, and series indexes | `@syncfusion/ej2-angular-charts` |
| `StockChartStockEventsModel` | Defines Stock Chart stock event collection settings | `@syncfusion/ej2-angular-charts` |

### Annotation Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `StockChartAnnotationSettingsModel` | Defines annotation settings for Stock Chart | `@syncfusion/ej2-angular-charts` |
| `ChartAnnotationSettingsModel` | Defines shared annotation settings for chart | `@syncfusion/ej2-angular-charts` |

### Range Navigator Configuration Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `RangeNavigatorModel` | Defines the complete configuration model for the Range Navigator component | `@syncfusion/ej2-angular-charts` |
| `RangeNavigatorSeriesModel` | Defines Range Navigator series configuration | `@syncfusion/ej2-angular-charts` |
| `RangeNavigatorMajorGridLinesModel` | Defines major grid line settings for Range Navigator | `@syncfusion/ej2-angular-charts` |
| `RangeNavigatorMajorTickLinesModel` | Defines major tick line settings for Range Navigator | `@syncfusion/ej2-angular-charts` |
| `RangeNavigatorLabelStyleModel` | Defines label style settings for Range Navigator axis labels | `@syncfusion/ej2-angular-charts` |
| `RangeNavigatorMarginModel` | Defines margin settings for Range Navigator | `@syncfusion/ej2-angular-charts` |

### Range Navigator Style Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `RangeNavigatorStyleSettingsModel` | Defines selected region, unselected region, thumb, grid, and background style settings | `@syncfusion/ej2-angular-charts` |
| `RangeNavigatorThumbSettingsModel` | Defines thumb border, fill, size, and type settings | `@syncfusion/ej2-angular-charts` |
| `RangeNavigatorBorderModel` | Defines border settings for Range Navigator elements | `@syncfusion/ej2-angular-charts` |
| `RangeNavigatorFontModel` | Defines font settings for Range Navigator labels and text | `@syncfusion/ej2-angular-charts` |

### Shared Chart Layout Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `ChartAreaModel` | Defines chart area customization options such as background and border | `@syncfusion/ej2-angular-charts` |
| `MarginModel` | Defines margin settings for chart components | `@syncfusion/ej2-angular-charts` |
| `FontModel` | Defines font style, size, color, weight, and family settings | `@syncfusion/ej2-angular-charts` |
| `BorderModel` | Defines border color, width, and dash array settings | `@syncfusion/ej2-angular-charts` |

### Stock Chart Lifecycle Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IStockChartEventArgs` | Defines common Stock Chart event arguments for load, loaded, and stock chart lifecycle events | `@syncfusion/ej2-angular-charts` |
| `ILoadEventArgs` | Defines event arguments for chart load event | `@syncfusion/ej2-angular-charts` |
| `ILoadedEventArgs` | Defines event arguments after chart rendering is completed | `@syncfusion/ej2-angular-charts` |
| `IResizeEventArgs` | Defines event arguments for chart resize events | `@syncfusion/ej2-angular-charts` |

### Stock Chart Series and Point Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IPointEventArgs` | Defines event arguments for point mouse and interaction events | `@syncfusion/ej2-angular-charts` |
| `IPointRenderEventArgs` | Defines event arguments used while rendering each chart point | `@syncfusion/ej2-angular-charts` |
| `ISeriesRenderEventArgs` | Defines event arguments used while rendering each Stock Chart series | `@syncfusion/ej2-angular-charts` |
| `ITextRenderEventArgs` | Defines event arguments used while rendering chart text such as labels | `@syncfusion/ej2-angular-charts` |

### Stock Chart Axis Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IAxisLabelRenderEventArgs` | Defines event arguments used while rendering axis labels | `@syncfusion/ej2-angular-charts` |
| `IAxisRangeCalculatedEventArgs` | Defines event arguments after axis range calculation | `@syncfusion/ej2-angular-charts` |

### Stock Chart Tooltip Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `ITooltipRenderEventArgs` | Defines event arguments used while rendering Stock Chart tooltip | `@syncfusion/ej2-angular-charts` |
| `ISharedTooltipRenderEventArgs` | Defines event arguments used while rendering shared tooltip content | `@syncfusion/ej2-angular-charts` |
| `ITooltipRenderCompleteEventArgs` | Defines event arguments after tooltip rendering is completed | `@syncfusion/ej2-angular-charts` |

### Stock Chart Legend Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IStockLegendRenderEventArgs` | Defines event arguments used while rendering Stock Chart legend items | `@syncfusion/ej2-angular-charts` |
| `IStockLegendClickEventArgs` | Defines event arguments for Stock Chart legend click events | `@syncfusion/ej2-angular-charts` |
| `ILegendRenderEventArgs` | Defines shared chart legend render event arguments | `@syncfusion/ej2-angular-charts` |
| `ILegendClickEventArgs` | Defines shared chart legend click event arguments | `@syncfusion/ej2-angular-charts` |

### Stock Chart Interaction Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IMouseEventArgs` | Defines event arguments for Stock Chart mouse events | `@syncfusion/ej2-angular-charts` |
| `IZoomingEventArgs` | Defines event arguments while zooming is performed | `@syncfusion/ej2-angular-charts` |
| `IZoomCompleteEventArgs` | Defines event arguments after zooming is completed | `@syncfusion/ej2-angular-charts` |
| `ISelectionCompleteEventArgs` | Defines event arguments after point or series selection is completed | `@syncfusion/ej2-angular-charts` |

### Stock Chart Range Selector Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IRangeChangeEventArgs` | Defines event arguments when the Stock Chart range is changed | `@syncfusion/ej2-angular-charts` |
| `IRangeSelectorRenderEventArgs` | Defines event arguments before the range selector is rendered | `@syncfusion/ej2-angular-charts` |

### Stock Event Render Interface

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IStockEventRenderArgs` | Defines event arguments used while rendering stock event markers | `@syncfusion/ej2-angular-charts` |

### Export and Print Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IPrintEventArgs` | Defines event arguments for Stock Chart print events | `@syncfusion/ej2-angular-charts` |
| `IExportEventArgs` | Defines event arguments for Stock Chart export events | `@syncfusion/ej2-angular-charts` |

### Range Navigator Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IRangeLoadedEventArgs` | Defines event arguments for Range Navigator load and loaded events | `@syncfusion/ej2-angular-charts` |
| `IRangeBeforeResizeEventArgs` | Defines event arguments before Range Navigator resize | `@syncfusion/ej2-angular-charts` |
| `IResizeRangeNavigatorEventArgs` | Defines event arguments after Range Navigator resize | `@syncfusion/ej2-angular-charts` |
| `IChangedEventArgs` | Defines event arguments after the selected Range Navigator range changes | `@syncfusion/ej2-angular-charts` |
| `ILabelRenderEventsArgs` | Defines event arguments before Range Navigator labels are rendered | `@syncfusion/ej2-angular-charts` |
| `IRangeSelectorRenderEventArgs` | Defines event arguments before the Range Navigator selector is rendered | `@syncfusion/ej2-angular-charts` |
| `IRangeTooltipRenderEventArgs` | Defines event arguments before Range Navigator tooltip rendering | `@syncfusion/ej2-angular-charts` |

### Example Importing Interfaces

```typescript
import {
  StockChartModel,
  StockChartAxisModel,
  StockChartSeriesModel,
  StockChartIndicatorModel,
  StockChartTrendlineModel,
  StockChartPeriodModel,
  StockEventsSettingsModel,
  StockChartAnnotationSettingsModel,
  TooltipSettingsModel,
  CrosshairSettingsModel,
  StockChartLegendSettingsModel,
  RangeNavigatorModel,
  RangeNavigatorSeriesModel,
  IStockChartEventArgs,
  IStockLegendClickEventArgs,
  IStockLegendRenderEventArgs,
  IStockEventRenderArgs,
  IRangeChangeEventArgs,
  IRangeSelectorRenderEventArgs,
  ITooltipRenderEventArgs,
  IAxisLabelRenderEventArgs,
  ISeriesRenderEventArgs,
  IPointEventArgs,
  IMouseEventArgs,
  IExportEventArgs,
  IPrintEventArgs
} from '@syncfusion/ej2-angular-charts';

const primaryXAxis: StockChartAxisModel = {
  valueType: 'DateTime'
};

const tooltip: TooltipSettingsModel = {
  enable: true
};

const crosshair: CrosshairSettingsModel = {
  enable: true
};

const series: StockChartSeriesModel = {
  dataSource: [
    { date: new Date('2024-01-01'), open: 120, high: 125, low: 118, close: 123, volume: 1000 },
    { date: new Date('2024-01-02'), open: 123, high: 128, low: 121, close: 126, volume: 1200 },
    { date: new Date('2024-01-03'), open: 126, high: 130, low: 124, close: 129, volume: 1400 }
  ],
  xName: 'date',
  type: 'Candle',
  high: 'high',
  low: 'low',
  open: 'open',
  close: 'close',
  volume: 'volume',
  name: 'Stock'
};

const indicator: StockChartIndicatorModel = {
  type: 'Sma',
  field: 'Close',
  seriesName: 'Stock'
};

const trendline: StockChartTrendlineModel = {
  type: 'Linear'
};

const period: StockChartPeriodModel = {
  intervalType: 'Months',
  interval: 1,
  text: '1M'
};

const stockEvent: StockEventsSettingsModel = {
  date: new Date('2024-01-02'),
  text: 'E',
  description: 'Stock event',
  type: 'Flag'
};

const annotation: StockChartAnnotationSettingsModel = {
  content: '<div>Annotation</div>',
  coordinateUnits: 'Point',
  x: new Date('2024-01-02'),
  y: 126
};

const legendSettings: StockChartLegendSettingsModel = {
  visible: true,
  position: 'Top'
};

const stockChartOptions: StockChartModel = {
  primaryXAxis,
  tooltip,
  crosshair,
  series: [series],
  indicators: [indicator],
  trendlines: [trendline],
  periods: [period],
  stockEvents: [stockEvent],
  annotations: [annotation],
  legendSettings
};

const rangeNavigatorSeries: RangeNavigatorSeriesModel = {
  dataSource: [
    { x: new Date('2024-01-01'), y: 123 },
    { x: new Date('2024-01-02'), y: 126 },
    { x: new Date('2024-01-03'), y: 129 }
  ],
  xName: 'x',
  yName: 'y',
  type: 'Line'
};

const rangeNavigatorOptions: RangeNavigatorModel = {
  valueType: 'DateTime',
  series: [rangeNavigatorSeries],
  tooltip: {
    enable: true
  }
};

const load = (args: IStockChartEventArgs): void => {
  // Stock Chart loading.
};

const legendClick = (args: IStockLegendClickEventArgs): void => {
  // Stock Chart legend clicked.
};

const legendRender = (args: IStockLegendRenderEventArgs): void => {
  // Stock Chart legend rendering.
};

const stockEventRender = (args: IStockEventRenderArgs): void => {
  // Stock event marker rendering.
};

const rangeChange = (args: IRangeChangeEventArgs): void => {
  // Stock Chart selected range changed.
};

const selectorRender = (args: IRangeSelectorRenderEventArgs): void => {
  // Range selector rendering.
};

const tooltipRender = (args: ITooltipRenderEventArgs): void => {
  // Tooltip rendering.
};

const axisLabelRender = (args: IAxisLabelRenderEventArgs): void => {
  // Axis label rendering.
};

const seriesRender = (args: ISeriesRenderEventArgs): void => {
  // Series rendering.
};

const pointClick = (args: IPointEventArgs): void => {
  // Point clicked.
};

const stockChartMouseMove = (args: IMouseEventArgs): void => {
  // Stock Chart mouse move.
};

const beforeExport = (args: IExportEventArgs): void => {
  // Before Stock Chart export.
};

const beforePrint = (args: IPrintEventArgs): void => {
  // Before Stock Chart print.
};
```

## Verifying Your Setup

### Check 1 Module Imports

Ensure both `ChartAllModule` and `StockChartAllModule` are in your `imports` array:

```typescript
imports: [ChartAllModule, StockChartAllModule]
```

### Check 2 Template Structure

Verify your template has:

- `<ejs-stockchart>` root element
- `<e-stockchart-series-collection>` container
- At least one `<e-stockchart-series>` with type and data fields

### Check 3 Data Format

Confirm your data includes:

- `x` property with `Date` objects
- `high`, `low`, `open`, and `close` numeric values
- Data sorted by date in ascending order

### Check 4 Visible Chart

After `ng serve`, your browser should show a chart container with candlestick series.

**If you see a blank container:**

- Check the browser console for errors.
- Verify CSS imports are loaded, including Syncfusion theme CSS.
- Ensure data has non-zero values.

**If you see a "No data" message:**

- Verify data is assigned to the `chartData` property.
- Check that the `[dataSource]` binding is correct.
- Ensure property names match exactly because they are case-sensitive.

## Common Initialization Issues

**Issue: `Cannot find module '@syncfusion/ej2-angular-charts'`**

- Run `npm install @syncfusion/ej2-angular-charts`.
- Or use `ng add @syncfusion/ej2-angular-charts`.

**Issue: Chart appears but no data renders**

- Verify `xName` and OHLC field names match your data.
- Check that data values are not `null` or `undefined`.

**Issue: Dates not formatting correctly**

- Ensure the date field uses JavaScript `Date` objects, not strings.
- Use `new Date(dateString)` to convert strings.

**Issue: Chart is too small or not visible**

- Set explicit `height` and `width` on `ejs-stockchart`.

```html
<ejs-stockchart height="400px" width="100%"></ejs-stockchart>
```
