# Chart Series Types

The Syncfusion Angular Chart component supports 25+ series types for visualizing different kinds of data. This guide covers all available series types, their use cases, and implementation examples.

## Table of Contents

- [Overview](#overview)
- [Line Series](#line-series)
  - [Line](#line)
  - [Step Line](#step-line)
  - [Spline](#spline)
  - [Stacked Line](#stacked-line)
  - [Multi-colored Line](#multi-colored-line)
- [Area Series](#area-series)
  - [Area](#area)
  - [Stacked Area](#stacked-area)
  - [100% Stacked Area](#100-stacked-area)
  - [Range Area](#range-area)
  - [Spline Range Area](#spline-range-area)
- [Column and Bar Series](#column-and-bar-series)
  - [Column](#column)
  - [Bar](#bar)
  - [Stacked Column/Bar](#stacked-columnbar)
  - [100% Stacked Column/Bar](#100-stacked-columnbar)
  - [Range Column](#range-column)
- [Financial Series](#financial-series)
  - [Candlestick](#candlestick)
  - [Hilo](#hilo)
  - [HiloOpenClose](#hiloopenclose)
- [Statistical Series](#statistical-series)
  - [Box and Whisker](#box-and-whisker)
  - [Histogram](#histogram)
  - [Pareto](#pareto)
  - [Error Bar](#error-bar)
- [Specialized Series](#specialized-series)
  - [Scatter](#scatter)
  - [Bubble](#bubble)
  - [Polar](#polar)
  - [Radar](#radar)
  - [Waterfall](#waterfall)
  - [Vertical Chart](#vertical-chart)
- [Choosing the Right Series Type](#choosing-the-right-series-type)
- [Combining Multiple Series](#combining-multiple-series)

## Overview

Each series type is optimized for specific data visualization scenarios. The `type` property on the `<e-series>` element determines which series type to render.

**API Reference:** 
- [type](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#type) - ChartSeriesType enum with all available series types
- [ChartSeriesType](https://ej2.syncfusion.com/angular/documentation/api/chart/chartSeriesType) - Enum listing all 25+ series types
- [SeriesDirective](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective) - Complete series configuration properties

**Basic Syntax:**
```html
<e-series [dataSource]="data" type="Line" xName="x" yName="y"></e-series>
```

**Common Series Properties:**

| Property | Type | Default | Description | API Reference |
|----------|------|---------|-------------|---------------|
| `type` | ChartSeriesType | 'Line' | Series type (Line, Column, Bar, Area, etc.) | [type](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#type) |
| `dataSource` | Object[] | '' | Series data array or DataManager | [dataSource](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#dataSource) |
| `xName` | string | '' | X-axis field name | [xName](https://ej2.syncfusion.com/angular/documentation/api/chart/series#xName) |
| `yName` | string | '' | Y-axis field name | [yName](https://ej2.syncfusion.com/angular/documentation/api/chart/series#yName) |
| `name` | string | '' | Series name for legend | [name](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#name) |
| `fill` | string | null | Series fill color | [fill](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#fill) |
| `width` | number | 2 | Line/border width | [width](https://ej2.syncfusion.com/angular/documentation/api/chart/series#width) |
| `opacity` | number | 1 | Series opacity (0-1) | [opacity](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#opacity) |
| `marker` | MarkerSettingsModel | - | Data point markers | [MarkerSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/markerSettingsModel) |

## Line Series

Line series visualize trends and changes over continuous data.

### Line

Classic line chart connecting data points with straight lines.

**Use Case:** Trend analysis, time-series data, continuous data tracking

**Example:**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, LineSeriesService, DateTimeService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { lineData } from './datasource';

@Component({
imports: [ ChartModule ],
providers: [ CategoryService, LineSeriesService, DateTimeService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis'
    [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Line' xName='month' yName='sales'></e-series>
        </e-series-collection>
    </ejs-chart>`
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
            valueType: 'Category',
        };
        this.primaryYAxis =
        {
            title: 'Sales',
        },
        this.title = 'Monthly Sales Comparison';
    }
}
```

### Step Line

Connects points with horizontal and vertical segments, emphasizing discrete changes.

**Use Case:** Step functions, discrete value changes, inventory levels

**Example:**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, StepLineSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [ ChartModule ],
providers: [ CategoryService, StepLineSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='StepLine' xName='x' yName='y'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public chartData?: Object[];
    public title?: string;
    ngOnInit(): void {
        this.chartData = [
            { x: 2005, y: 370 },
            { x: 2006, y: 378 },
            { x: 2007, y: 416 },
            { x: 2008, y: 404 },
            { x: 2009, y: 390 },
            { x: 2010, y: 376 },
            { x: 2011, y: 365 },
            { x: 2012, y: 350 }
        ];
        this.title = 'Monthly Sales Comparison';
    }
}
```

### Spline

Smoothed line using spline interpolation for elegant curves.

**Use Case:** Smooth trend visualization, predictions, aesthetic presentations

**Example:**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, SplineSeriesService,} from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [ ChartModule ],
providers: [ CategoryService, SplineSeriesService ],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Spline' xName='x' yName='y' name='London' width=2 [marker]='marker'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    public marker?: Object;
    ngOnInit(): void {
        this.chartData = [
            { x: 'Jan', y: -1 },
            { x: 'Feb', y: -1 },
            { x: 'Mar', y: 2 },
            { x: 'Apr', y: 8 },
            { x: 'May', y: 13 },
            { x: 'Jun', y: 18 },
            { x: 'Jul', y: 21 },
            { x: 'Aug', y: 20 },
            { x: 'Sep', y: 16 },
            { x: 'Oct', y: 10 },
            { x: 'Nov', y: 4 },
            { x: 'Dec', y: 0 }
        ];
        this.primaryXAxis = {
           title: 'Month',
           valueType: 'Category'
        };
        this.marker = { visible: true, width: 10, height: 10 };
        this.title = 'Climate Graph-2012';
    }
}
```

### Stacked Line

Multiple line series stacked vertically to show cumulative values.

**Use Case:** Cumulative trends, part-to-whole over time

**Example:**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, StackingLineSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [ ChartModule ],
providers: [ CategoryService, StackingLineSeriesService ],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='StackingLine' xName='x' yName='y' name='John' width='2' [marker]='marker'> </e-series>
            <e-series [dataSource]='chartData' type='StackingLine' xName='x' yName='y1' name='Peter' width='2' [marker]='marker'> </e-series>
            <e-series [dataSource]='chartData' type='StackingLine' xName='x' yName='y2' name='Steve' width='2' [marker]='marker'> </e-series>
            <e-series [dataSource]='chartData' type='StackingLine' xName='x' yName='y3' name='Charle' width='2' [marker]='marker'> </e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public title?: string;
    public primaryYAxis?: Object;
    public marker?: Object;
    public series?: Object;
    public chartData?: Object[];
    ngOnInit(): void {
        this.primaryXAxis = {
            interval: 1, valueType: 'Category'
        };
        this.primaryYAxis =
        {
            title: 'Expense',
            interval: 100,
            labelFormat: '${value}',
        },
       this.chartData = [
        { x: 'Food', y: 90, y1: 40, y2: 70, y3: 120 },
        { x: 'Transport', y: 80, y1: 90, y2: 110, y3: 70 },
        { x: 'Medical', y: 50, y1: 80, y2: 120, y3: 50 },
        { x: 'Clothes', y: 70, y1: 30, y2: 60, y3: 180 },
        { x: 'Personal Care', y: 30, y1: 80, y2: 80, y3: 30 },
        { x: 'Books', y: 10, y1: 40, y2: 30, y3: 270 },
        { x: 'Fitness', y: 100, y1: 30, y2: 70, y3: 40 },
        { x: 'Electricity', y: 55, y1: 95, y2: 55, y3: 75 },
        { x: 'Tax', y: 20, y1: 50, y2: 40, y3: 65 },
        { x: 'Pet Care', y: 40, y1: 20, y2: 80, y3: 95 },
        { x: 'Education', y: 45, y1: 15, y2: 45, y3: 195 },
        { x: 'Entertainment', y: 75, y1: 45, y2: 65, y3: 115 }
    ];
        this.marker = { visible: true };
    }
}
```

### Multi-colored Line

Line segments colored based on value ranges or conditions.

**Use Case:** Highlighting thresholds, color-coding performance zones

**Example:**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, MultiColoredLineSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [ ChartModule ],
providers: [ CategoryService, MultiColoredLineSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='MultiColoredLine' xName='x' yName='y' name='London' width=2 [marker]='marker'
            pointColorMapping= 'color'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public chartData?: Object[];
    public title?: string;
    public marker?: Object;
    primaryXAxis: any;
    primaryYAxis: any;
    ngOnInit(): void {
        this.chartData = [
            { x: 2005, y: 28, color: 'red' }, { x: 2006, y: 25, color: 'green' },
            { x: 2007, y: 26, color: '#ff0097' }, { x: 2008, y: 27, color: 'crimson' },
            { x: 2009, y: 32, color: 'blue' }, { x: 2010, y: 35, color: 'darkorange' }
        ];
        this.marker = { visible: true, width: 10, height: 10 };
        this.title = 'Climate Graph-2012';
    }
}
```

## Area Series

Area series show magnitude with filled regions beneath lines.

### Area

Fills the area between the line and axis.

**Use Case:** Volume visualization, magnitude emphasis, filled trends

**Example:**
```typescript
import { ChartModule, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { AreaSeriesService, TooltipService, CategoryService, LegendService } from '@syncfusion/ej2-angular-charts';
import { Component, OnInit } from '@angular/core';

@Component({
    imports: [ChartModule, ChartAllModule],
    providers: [AreaSeriesService, CategoryService, LegendService, TooltipService],
    standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title' [legendSettings]='legendSettings' [tooltip]='tooltip'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Area' xName='year' yName='oil' name='Oil'></e-series>
            <e-series [dataSource]='chartData' type='Area' xName='year' yName='coal' name='Coal'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    public legendSettings?: Object;
    public tooltip?: Object;
    ngOnInit(): void {
        this.chartData = [
            { year: 2000, oil: 43017, coal: 27456 },
            { year: 2001, oil: 43398, coal: 27880 },
            { year: 2002, oil: 43697, coal: 28982 },
            { year: 2003, oil: 44611, coal: 31520 },
            { year: 2004, oil: 46413, coal: 33709 },
            { year: 2005, oil: 47017, coal: 36201 },
            { year: 2006, oil: 47437, coal: 38087 },
            { year: 2007, oil: 48088, coal: 40242 },
            { year: 2008, oil: 47693, coal: 40797 },
            { year: 2009, oil: 46634, coal: 40219 },
            { year: 2010, oil: 48193, coal: 42016 },
            { year: 2011, oil: 48578, coal: 43983 },
            { year: 2012, oil: 49362, coal: 44099 },
            { year: 2013, oil: 49923, coal: 44745 },
            { year: 2014, oil: 50336, coal: 44912 },
            { year: 2015, oil: 51294, coal: 43695 },
            { year: 2016, oil: 52315, coal: 42768 },
            { year: 2017, oil: 53263, coal: 43226 },
            { year: 2018, oil: 53793, coal: 43897 },
            { year: 2019, oil: 53997, coal: 43628 },
            { year: 2020, oil: 49101, coal: 42316 },
            { year: 2021, oil: 51847, coal: 44642 },
            { year: 2022, oil: 53562, coal: 44927 },
            { year: 2023, oil: 54839, coal: 45319 },
            { year: 2024, oil: 55292, coal: 45851 }
        ];
        this.primaryXAxis = {
            minimum: 2000, maximum: 2024,
            interval: 4, edgeLabelPlacement: 'Shift'
        };
        this.primaryYAxis = {
            title: 'Energy (TWh)',
            labelFormat: '{value} TWh'
        };
        this.title = 'Global primary energy consumption by source';
        this.legendSettings = { visible: true, enableHighlight: true };
        this.tooltip = { enable: true };
    }
}
```

### Stacked Area

Multiple area series stacked to show cumulative contribution.

**Use Case:** Part-to-whole trends, market share over time

**Example:**
```typescript
import { ChartModule, ChartAllModule } from '@syncfusion/ej2-angular-charts'
import { AreaSeriesService, CategoryService, StackingAreaSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [ChartModule, ChartAllModule],
providers: [ AreaSeriesService , CategoryService, StackingAreaSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='StackingArea' xName='x' yName='y' name='Organic'></e-series>
            <e-series [dataSource]='chartData' type='StackingArea' xName='x' yName='y1' name='Fair-trade'></e-series>
            <e-series [dataSource]='chartData' type='StackingArea' xName='x' yName='y2' name='Veg Alternatives'></e-series>
            <e-series [dataSource]='chartData' type='StackingArea' xName='x' yName='y3' name='Others'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    ngOnInit(): void {
        this.chartData = [
            { x: new Date(2000, 0, 1), y: 0.61, y1: 0.03, y2: 0.48, y3: 0.23 },
            { x: new Date(2001, 0, 1), y: 0.81, y1: 0.05, y2: 0.53, y3: 0.17 },
            { x: new Date(2002, 0, 1), y: 0.91, y1: 0.06, y2: 0.57, y3: 0.17 },
            { x: new Date(2003, 0, 1), y: 1,    y1: 0.09, y2: 0.61, y3: 0.20 },
            { x: new Date(2004, 0, 1), y: 1.19, y1: 0.14, y2: 0.63, y3: 0.23 },
            { x: new Date(2005, 0, 1), y: 1.47, y1: 0.20, y2: 0.64, y3: 0.36 },
            { x: new Date(2006, 0, 1), y: 1.74, y1: 0.29, y2: 0.66, y3: 0.43 },
            { x: new Date(2007, 0, 1), y: 1.98, y1: 0.46, y2: 0.76, y3: 0.52 },
            { x: new Date(2008, 0, 1), y: 1.99, y1: 0.64, y2: 0.77, y3: 0.72 },
            { x: new Date(2009, 0, 1), y: 1.70, y1: 0.75, y2: 0.55, y3: 1.29 },
            { x: new Date(2010, 0, 1), y: 1.48, y1: 1.06, y2: 0.54, y3: 1.38 },
            { x: new Date(2011, 0, 1), y: 1.38, y1: 1.25, y2: 0.57, y3: 1.82 },
            { x: new Date(2012, 0, 1), y: 1.66, y1: 1.55, y2: 0.61, y3: 2.16 },
            { x: new Date(2013, 0, 1), y: 1.66, y1: 1.55, y2: 0.67, y3: 2.51 },
            { x: new Date(2014, 0, 1), y: 1.67, y1: 1.65, y2: 0.67, y3: 2.61 }
        ];
        this.primaryXAxis = {
            valueType: 'DateTime'
        };
        this.title = 'Trend in Sales of Ethical Produce';
    }

}
```

### 100% Stacked Area

Normalized stacked areas scaled to 100% for proportional comparison.

**Use Case:** Percentage composition over time, relative proportions

**Example:**
```typescript
import { ChartModule, ChartAllModule } from '@syncfusion/ej2-angular-charts'
import { AreaSeriesService, StackingAreaSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
@Component({
imports: [ChartModule, ChartAllModule],
providers: [ AreaSeriesService, StackingAreaSeriesService ],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='StackingArea100' xName='x' yName='y' name='USA'></e-series>
            <e-series [dataSource]='chartData' type='StackingArea100' xName='x' yName='y1' name='UK'></e-series>
            <e-series [dataSource]='chartData' type='StackingArea100' xName='x' yName='y2' name='Canada'></e-series>
            <e-series [dataSource]='chartData' type='StackingArea100' xName='x' yName='y3' name='China'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    ngOnInit(): void {
        this.chartData = [
            { x: new Date(2006, 0, 1), y: 34, y1: 51, y2: 14, y3: 37 },
            { x: new Date(2007, 0, 1), y: 20, y1: 26, y2: 34, y3: 15 },
            { x: new Date(2008, 0, 1), y: 40, y1: 37, y2: 73, y3: 53 },
            { x: new Date(2009, 0, 1), y: 51, y1: 51, y2: 51, y3: 51 },
            { x: new Date(2010, 0, 1), y: 26, y1: 26, y2: 26, y3: 26 },
            { x: new Date(2011, 0, 1), y: 37, y1: 37, y2: 37, y3: 37 },
            { x: new Date(2012, 0, 1), y: 54, y1: 43, y2: 12, y3: 54 },
            { x: new Date(2013, 0, 1), y: 44, y1: 23, y2: 16, y3: 44 },
            { x: new Date(2014, 0, 1), y: 48, y1: 55, y2: 34, y3: 23 }
        ];
        this.primaryXAxis = {
            valueType: 'DateTime'
        };
        this.title = 'Annual Temperature Comparison';
    }
}
```

### Range Area

Displays min-max value ranges as filled areas.

**Use Case:** Temperature ranges, confidence intervals, variability bands

**Example:**
```typescript
import { ChartModule, ChartAllModule } from '@syncfusion/ej2-angular-charts'
import {  RangeAreaSeriesService, CategoryService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [ ChartModule, ChartAllModule ],
providers: [ RangeAreaSeriesService, CategoryService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='RangeArea' xName='x' high='high' low='low' name='India' ></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    ngOnInit(): void {
        this.chartData = [
            { x: 'Jan', high: 14, low: 4 },
            { x: 'Feb', high: 17, low: 7 },
            { x: 'Mar', high: 20, low: 10 },
            { x: 'Apr', high: 22, low: 12 },
            { x: 'May', high: 20, low: 10 },
            { x: 'Jun', high: 17, low: 7 },
            { x: 'Jul', high: 15, low: 5 },
            { x: 'Aug', high: 17, low: 7 },
            { x: 'Sep', high: 20, low: 10 },
            { x: 'Oct', high: 22, low: 12 },
            { x: 'Nov', high: 20, low: 10 },
            { x: 'Dec', high: 17, low: 7 }
        ];
        this.primaryXAxis = {
           title: 'Month',valueType: 'Category',
           edgeLabelPlacement: 'Shift'
        };
        this.primaryYAxis = {
            title: 'Temperature(Celsius)',
            minimum: 0, maximum: 20
        };
        this.title = 'Maximum and Minimum Temperature'
    }
}
```

### Spline Range Area

Smooth (spline) version of range area for refined presentation.

**Example:**
```typescript
import { ChartModule, ChartAllModule } from '@syncfusion/ej2-angular-charts'
import { StackingAreaSeriesService, CategoryService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [ ChartModule, ChartAllModule ],
providers: [ StackingAreaSeriesService, CategoryService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='SplineRangeArea' xName='x' high='high' low='low' name='England'></e-series>
            <e-series [dataSource]='chartData' type='SplineRangeArea' xName='x' high='high1' low='low1' name='India'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    ngOnInit(): void {
        this.chartData = [
            { x: 'Jan', high: 14, low: 4,  high1: 29, low1: 19 },
            { x: 'Feb', high: 17, low: 7,  high1: 32, low1: 22 },
            { x: 'Mar', high: 20, low: 10, high1: 35, low1: 25 },
            { x: 'Apr', high: 22, low: 12, high1: 37, low1: 27 },
            { x: 'May', high: 20, low: 10, high1: 35, low1: 25 },
            { x: 'Jun', high: 17, low: 7,  high1: 32, low1: 22 },
            { x: 'Jul', high: 15, low: 5,  high1: 30, low1: 20 },
            { x: 'Aug', high: 17, low: 7,  high1: 32, low1: 22 },
            { x: 'Sep', high: 20, low: 10, high1: 35, low1: 25 },
            { x: 'Oct', high: 22, low: 12, high1: 37, low1: 27 },
            { x: 'Nov', high: 20, low: 10, high1: 35, low1: 25 },
            { x: 'Dec', high: 17, low: 7,  high1: 32, low1: 22 }
        ];
        this.primaryXAxis = {
           valueType: 'Category',
            edgeLabelPlacement: 'Shift',
            majorGridLines: { width: 0 }
        };
        this.primaryYAxis = {
            labelFormat: '{value}˚C',
            lineStyle: { width: 0 },
            minimum: 0,
            maximum: 40,
            majorTickLines: { width: 0 }
        };
        this.title = 'Monthly Temperature Range'
    }
}
```

## Column and Bar Series

Vertical (column) and horizontal (bar) series for categorical comparisons.

### Column

Vertical bars for straightforward category comparison.

**Use Case:** Category comparison, period-over-period analysis

**API Properties:**
- [type](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#type) = 'Column'
- [columnWidth](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#columnWidth) - Column width (default: null, auto-calculated as 0.7)
- [columnSpacing](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#columnSpacing) - Space between columns (default: 0, range: 0-1)
- [columnFacet](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#columnFacet) - Column shape: 'Rectangle' or 'Cylinder' (default: 'Rectangle')
- [columnWidthInPixel](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#columnWidthInPixel) - Column width in pixels (default: null)
- [cornerRadius](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#cornerRadius) - Rounded corners configuration ([CornerRadiusModel](https://ej2.syncfusion.com/angular/documentation/api/chart/cornerRadiusModel))
- [border](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#border) - Column border settings ([BorderModel](https://ej2.syncfusion.com/angular/documentation/api/chart/borderModel))

**Example:**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, ColumnSeriesService
 } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [ ChartModule ],
providers: [ CategoryService, ColumnSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='gold' name='Gold'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    primaryYAxis: any;
    ngOnInit(): void {
        this.chartData = [
            { country: "USA", gold: 50 },
            { country: "China", gold: 40 },
            { country: "Japan", gold: 70 },
            { country: "Australia", gold: 60 },
            { country: "France", gold: 50 },
            { country: "Germany", gold: 40 },
            { country: "Italy", gold: 40 },
            { country: "Sweden", gold: 30 }
       ];
        this.primaryXAxis = {
           valueType: 'Category',
           title: 'Countries'
        };
        this.title = 'Olympic Medals';
    }
}
```

### Bar

Horizontal bars, ideal for long category labels.

**Use Case:** Rankings, long labels, horizontal comparisons

**Example:**
```typescript
import { ChartModule, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { BarSeriesService, TooltipService, CategoryService, LegendService } from '@syncfusion/ej2-angular-charts';
import { Component, OnInit } from '@angular/core';

@Component({
    imports: [ChartModule, ChartAllModule],
    providers: [BarSeriesService, CategoryService, LegendService, TooltipService],
    standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title' [legendSettings]='legendSettings' [tooltip]='tooltip' [chartArea]='chartArea'>
        <e-series-collection>
            <e-series [dataSource]='appleChartData' type='Bar' xName='year' yName='count' name='Apple' columnSpacing=0.3 legendShape='Rectangle' [cornerRadius]='cornerRadius'></e-series>
            <e-series [dataSource]='xiaomiChartData' type='Bar' xName='year' yName='count' name='Xiaomi' columnSpacing=0.3 legendShape='Rectangle' [cornerRadius]='cornerRadius'></e-series>
            <e-series [dataSource]='oppoChartData' type='Bar' xName='year' yName='count' name='Oppo' columnSpacing=0.3 legendShape='Rectangle' [cornerRadius]='cornerRadius'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public appleChartData?: Object[];
    public xiaomiChartData?: Object[];
    public oppoChartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    public legendSettings?: Object;
    public tooltip?: Object;
    public cornerRadius?: Object;
    public chartArea?: Object;
    ngOnInit(): void {
        this.appleChartData = [
            { year: '2022', count: 226.4 },
            { year: '2023', count: 234.6 },
            { year: '2024', count: 232.1 }
          ];
        this.xiaomiChartData = [
            { year: '2022', count: 153.1 },
            { year: '2023', count: 145.9 },
            { year: '2024', count: 168.5 }
          ];
        this.oppoChartData = [
            { year: '2022', count: 103.3 },
            { year: '2023', count: 103.1 },
            { year: '2024', count: 104.8 }
          ];
        this.primaryXAxis = {
            valueType: 'Category',
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 }
        };
        this.primaryYAxis = {
            labelFormat: '{value}M',
            title: 'Units Sold (in Millions)',
            maximum: 300,
            edgeLabelPlacement: 'Shift',
            majorTickLines: { width: 0 },
            majorGridLines: { width: 0 },
            lineStyle: { width: 0 }
        };
        this.title = 'Global Smartphone Sales Trends by Brand (2022-2024)';
        this.legendSettings = {
            visible: true,
            enableHighlight: true,
            shapeWidth: 9,
            shapeHeight: 9
        };
        this.tooltip = {
            enable: true,
            enableHighlight: true,
            header: '<b>${series.name}</b>',
            format: '${point.x} : <b>${point.y}</b>'
        };
        this.cornerRadius = {
            topRight: 4,
            bottomRight: 4
        };
        this.chartArea = {
            border: {
                width: 0
            },
            margin: {
                bottom: 12
            }
        };
    }
}
```

### Stacked Column/Bar

Multiple series stacked within single bars to show component contributions.

**Use Case:** Component breakdown, segment analysis

**Example: Stacked Column**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, DateTimeService,
    StackingColumnSeriesService, LegendService, TooltipService
 } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
@Component({
imports: [ ChartModule ],
providers: [ CategoryService, DateTimeService,
        StackingColumnSeriesService, LegendService, TooltipService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='StackingColumn' xName='x' yName='y' name='UK'></e-series>
            <e-series [dataSource]='chartData' type='StackingColumn' xName='x' yName='y1' name='Germany'></e-series>
            <e-series [dataSource]='chartData' type='StackingColumn' xName='x' yName='y2' name='France'></e-series>
            <e-series [dataSource]='chartData' type='StackingColumn' xName='x' yName='y3' name='Italy'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    primaryYAxis: any;
    ngOnInit(): void {
        this.chartData = [
            { x: '2014', y: 111.1, y1: 76.9,  y2: 66.1,  y3: 34.1 },
            { x: '2015', y: 127.3, y1: 99.5,  y2: 79.3,  y3: 38.2 },
            { x: '2016', y: 143.4, y1: 121.7, y2: 91.3,  y3: 44.0 },
            { x: '2017', y: 159.9, y1: 142.5, y2: 102.4, y3: 51.6 },
            { x: '2018', y: 175.4, y1: 166.7, y2: 112.9, y3: 61.9 },
            { x: '2019', y: 189.0, y1: 182.9, y2: 122.4, y3: 71.5 },
            { x: '2020', y: 202.7, y1: 197.3, y2: 120.9, y3: 82.0 }
        ];
        this.primaryXAxis = {
            title: 'Years',
            interval: 1,
            valueType: 'Category'
        };
        this.title = 'Mobile Game Market by Country';
    }

}
```

**For horizontal stacking:**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { BarSeriesService, StackingBarSeriesService, CategoryService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { stackedData } from './datasource';
@Component({
imports: [ ChartModule ],
providers: [ BarSeriesService, StackingBarSeriesService, CategoryService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='StackingBar' xName='x' yName='y' name='Apple'></e-series>
            <e-series [dataSource]='chartData' type='StackingBar' xName='x' yName='y1' name='Orange'></e-series>
            <e-series [dataSource]='chartData' type='StackingBar' xName='x' yName='y2' name='Wastage'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    primaryYAxis: any;
    ngOnInit(): void {
        this.chartData = [
            { x: 'Jan', y: 6,  y1: 6,  y2: -1 },
            { x: 'Feb', y: 8 , y1: 8,  y2: -1.5 },
            { x: 'Mar', y: 12, y1: 11, y2: -2 },
            { x: 'Apr', y: 15, y1: 16, y2: -2.5 },
            { x: 'May', y: 20, y1: 21, y2: -3 },
            { x: 'Jun', y: 24, y1: 25, y2: -3.5 },
            { x: 'Jul', y: 28, y1: 27, y2: -4 },
            { x: 'Aug', y: 32, y1: 31, y2: -4.5 },
            { x: 'Sep', y: 33, y1: 34, y2: -5 },
            { x: 'Oct', y: 35, y1: 34, y2: -5.5 },
            { x: 'Nov', y: 40, y1: 41, y2: -6 },
            { x: 'Dec', y: 42, y1: 42, y2: -6.5 }
        ];
        this.primaryXAxis = {
            valueType: 'Category',
            title: 'Months'
        };
        this.title = 'Sales Comparison';
   }
}
```

### 100% Stacked Column/Bar

Normalized to 100% for proportional comparison.

**Example: 100% Stacked Column**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, StackingColumnSeriesService, LegendService, TooltipService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
@Component({
imports: [ ChartModule ],
providers: [ CategoryService, StackingColumnSeriesService, LegendService, TooltipService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='StackingColumn100' xName='x' yName='y' name='UK'></e-series>
            <e-series [dataSource]='chartData' type='StackingColumn100' xName='x' yName='y1' name='Germany'></e-series>
            <e-series [dataSource]='chartData' type='StackingColumn100' xName='x' yName='y2' name='France'></e-series>
            <e-series [dataSource]='chartData' type='StackingColumn100' xName='x' yName='y3' name='Italy'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    primaryYAxis: any;
    ngOnInit(): void {
        this.chartData = [
            { x: '2006', y: 900, y1: 190, y2: 250, y3: 150 },
            { x: '2007', y: 544, y1: 226, y2: 145, y3: 120 },
            { x: '2008', y: 880, y1: 194, y2: 190, y3: 115 },
            { x: '2009', y: 675, y1: 250, y2: 220, y3: 125 },
            { x: '2010', y: 765, y1: 222, y2: 225, y3: 132 },
            { x: '2011', y: 679, y1: 181, y2: 135, y3: 137 },
            { x: '2012', y: 770, y1: 128, y2: 152, y3: 110 },
       ];
        this.primaryXAxis = {
            title: 'Years',
            interval: 1,
            valueType: 'Category'
        };
        this.title = 'Gross Domestic Product Growth';
    }

}

```
**Example: 100% Stacked Bar**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { BarSeriesService, StackingBarSeriesService, CategoryService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
@Component({
imports: [ ChartModule ],
providers: [ BarSeriesService, StackingBarSeriesService, CategoryService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='StackingBar100' xName='x' yName='y' name='Apple'></e-series>
            <e-series [dataSource]='chartData' type='StackingBar100' xName='x' yName='y1' name='Orange'></e-series>
            <e-series [dataSource]='chartData' type='StackingBar100' xName='x' yName='y2' name='Wastage'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
primaryYAxis: any;
    ngOnInit(): void {
        this.chartData = [
            { x: 2000, y: 0.61, y1: 0.03, y2: 0.48},
            { x: 2001, y: 0.81, y1: 0.05, y2: 0.53 },
            { x: 2002, y: 0.91, y1: 0.06, y2: 0.57 },
            { x: 2003, y: 1,    y1: 0.09, y2: 0.61 },
            { x: 2004, y: 1.19, y1: 0.14, y2: 0.63 },
            { x: 2005, y: 1.47, y1: 0.20, y2: 0.64 },
            { x: 2006, y: 1.74, y1: 0.29, y2: 0.66 },
            { x: 2007, y: 1.98, y1: 0.46, y2: 0.76 },
            { x: 2008, y: 1.99, y1: 0.64, y2: 0.77 },
            { x: 2009, y: 1.70, y1: 0.75, y2: 0.55 }
        ];
        this.primaryXAxis = {
            valueType: 'Category',
            title: 'Months'
        };
        this.title = 'Sales Comparison';
    }

}

```

### Range Column

Shows high-low value ranges as columns.

**Use Case:** Temperature ranges, price ranges, min-max comparisons

**Example:**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, RangeColumnSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
@Component({
imports: [ ChartModule ],
providers: [ CategoryService,RangeColumnSeriesService ],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='data1' type='RangeColumn' xName='x' low='low' high='high'></e-series>
            <e-series [dataSource]='data2' type='RangeColumn' xName='x' low='low' high='high'></e-series>
        </e-series-collection>
    </ejs-chart>`
})

export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public title?: string;
    public data1?: Object[];
    public data2?: Object[];
    primaryYAxis: any;
    ngOnInit(): void {
        this.data1 = [
            { x: 'Jan', low: 0.7, high: 6.1 }, { x: 'Feb', low: 1.3, high: 6.3 }, { x: 'Mar', low: 1.9, high: 8.5 },
            { x: 'Apr', low: 3.1, high: 10.8 }, { x: 'May', low: 5.7, high: 14.40 }, { x: 'Jun', low: 8.4, high: 16.90 },
            { x: 'Jul', low: 10.6, high: 19.20 }, { x: 'Aug', low: 10.5, high: 18.9 }, { x: 'Sep', low: 8.5, high: 16.1 },
            { x: 'Oct', low: 6.0, high: 12.5 }, { x: 'Nov', low: 1.5, high: 6.9 }, { x: 'Dec', low: 5.1, high: 12.1 }
        ];
        this.data2 = [
            { x: 'Jan', low: 1.7, high: 7.1 }, { x: 'Feb', low: 1.9, high: 7.7 }, { x: 'Mar', low: 1.2, high: 7.5 },
            { x: 'Apr', low: 2.5, high: 9.8 }, { x: 'May', low: 4.7, high: 11.4 }, { x: 'Jun', low: 6.4, high: 14.4 },
            { x: 'Jul', low: 9.6, high: 17.2 }, { x: 'Aug', low: 10.7, high: 17.9 }, { x: 'Sep', low: 7.5, high: 15.1 },
            { x: 'Oct', low: 3.0, high: 10.5 }, { x: 'Nov', low: 1.2, high: 7.9 }, { x: 'Dec', low: 4.1, high: 9.1 }
        ];
        this.primaryXAxis = {
            title: 'month',
            valueType: 'Category'
        };
        this.title = 'Maximum and minimum Temperature';
    }
}
```

## Financial Series

Specialized series for financial and stock market data.

**API Reference:** [FinancialDataFields](https://ej2.syncfusion.com/angular/documentation/api/chart/financialDataFields) - Interface for OHLC data fields

### Candlestick

OHLC bars with color coding for price direction (bullish/bearish).

**Use Case:** Stock price analysis, OHLC data visualization

**API Properties:**
- [Series.type](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#type) = 'Candle'
- [Series.open](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#open) - Open price field name
- [Series.high](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#high) - High price field name  
- [Series.low](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#low) - Low price field name
- [Series.close](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#close) - Close price field name
- [Series.bearFillColor](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#bearFillColor) - Color for bearish candles (default: null)
- [Series.bullFillColor](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#bullFillColor) - Color for bullish candles (default: null)
- [Series.enableSolidCandles](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#enableSolidCandles) - Enable solid candle rendering (default: false)

**Example:**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, CandleSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [ ChartModule ],
providers: [CategoryService, CandleSeriesService],
standalone: true,
    selector: 'app-container',
    template: ` <ejs-chart style='display:block;' id='chart-container' [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' [title]='title' >
                <e-series-collection>
                    <e-series [dataSource]='data' type='Candle' xName='x' high='high' low='low' open='open' close='close' name='SHIRPUR-G'> </e-series>
                </e-series-collection>
     </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public title?: string;
    public primaryYAxis?: Object;
    public data?: Object[];
    ngOnInit(): void {
        this.data = [
            { x: 'Jan', open: 120, high: 160, low: 100, close: 140 },
            { x: 'Feb', open: 150, high: 190, low: 130, close: 170 },
            { x: 'Mar', open: 130, high: 170, low: 110, close: 150 },
            { x: 'Apr', open: 160, high: 180, low: 120, close: 140 },
            { x: 'May', open: 150, high: 170, low: 110, close: 130 }
            ];
        this.primaryXAxis = {
            title: 'Date',
            valueType: 'Category',
            };
        this.primaryYAxis = {
            title: 'Price', minimum: 100, maximum: 200, interval: 20,
            };
        this.title = 'Shirpur Gold Refinery Share Price';
    }
}
```

### Hilo

Shows only high and low values per period for compact volatility view.

**Use Case:** Price volatility, range visualization

**Example:**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, HiloSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [ ChartModule ],
providers: [CategoryService,HiloSeriesService],
standalone: true,
    selector: 'app-container',
    template: ` <ejs-chart style='display:block;' id='chart-container' [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis'
                [title]='title' >
                <e-series-collection>
                    <e-series [dataSource]='data' type='Hilo' xName='x' high='high' low='low' name='India'> </e-series>
                </e-series-collection>
     </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public title?: string;
    public primaryYAxis?: Object;
    public data?: Object[];
    ngOnInit(): void {
        this.data = [
            { x: 'Jan', low: 87, high: 200 },  { x: 'Feb', low: 45, high: 135 },
            { x: 'Mar', low: 19, high: 85 },   { x: 'Apr', low: 31, high: 108 },
            { x: 'May', low: 27, high: 80 },   { x: 'Jun', low: 84, high: 130 },
            { x: 'Jul', low: 77, high: 150 },  { x: 'Aug', low: 54, high: 125 },
            { x: 'Sep', low: 60, high: 155 },  { x: 'Oct', low: 60, high: 180 },
            { x: 'Nov', low: 88, high: 180 },  { x: 'Dec', low: 84, high: 230 }
        ];
        this.primaryXAxis = {
            valueType: 'Category',
            title: 'Months'
            };
        this.primaryYAxis = {
            labelFormat: '{value}mm',
            edgeLabelPlacement: 'Shift',
            title: 'Rainfall',
            };
        this.title = 'Maximum and Minimum Rainfall';
    }
}

```

### HiloOpenClose

Full OHLC representation with open/close markers.

**Example:**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, HiloOpenCloseSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [ ChartModule ],
providers: [CategoryService, HiloOpenCloseSeriesService],
standalone: true,
    selector: 'app-container',
    template: ` <ejs-chart style='display:block;' id='chart-container' [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis'
                [title]='title' >
                <e-series-collection>
                    <e-series [dataSource]='data' type='HiloOpenClose' xName='x' high='high' low='low' open='open' close='close' name='SHIRPUR-G'> </e-series>
                </e-series-collection>
     </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public title?: string;
    public primaryYAxis?: Object;
    public data?: Object[];
    ngOnInit(): void {
        this.data = [
            { x: 'Jan', open: 120, high: 160, low: 100, close: 140 },
            { x: 'Feb', open: 150, high: 190, low: 130, close: 170 },
            { x: 'Mar', open: 130, high: 170, low: 110, close: 150 },
            { x: 'Apr', open: 160, high: 180, low: 120, close: 140 },
            { x: 'May', open: 150, high: 170, low: 110, close: 130 }
            ];
        this.primaryXAxis = {
            title: 'Date',
            valueType: 'Category',
            };
        this.primaryYAxis = {
            title: 'Price in Dollar', minimum: 100, maximum: 200, interval: 20,
            };
        this.title = 'Financial Analysis';
    }
}
```

## Statistical Series

Series types for statistical analysis and distributions.

### Box and Whisker

Displays distribution with median, quartiles, and outliers.

**Use Case:** Statistical comparison, distribution analysis, outlier detection

**Example:**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { CategoryService, BoxAndWhiskerSeriesService, TooltipService } from '@syncfusion/ej2-angular-charts';
import { Component, OnInit } from '@angular/core';

@Component({
    imports: [ChartModule],
    providers: [CategoryService, BoxAndWhiskerSeriesService, TooltipService],
    standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id='chart-container' [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' [title]='title' [tooltip]='tooltip'>
            <e-series-collection>
                <e-series [dataSource]='data' type='BoxAndWhisker' xName='x' yName='y' [marker]='marker'> </e-series>
            </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public primaryYAxis?: Object;
    public title?: string;
    public data?: Object[];
    public marker?: Object;
    public tooltip?: Object;
    ngOnInit(): void {
        this.data = [
            { x: 'Development', y: [22, 22, 23, 25, 25, 25, 26, 27, 27, 28, 28, 29, 30, 32, 34, 32, 34, 36, 35, 38] },
            { x: 'Testing', y: [22, 33, 23, 25, 26, 28, 29, 30, 34, 33, 32, 31, 50] },
            { x: 'Finance', y: [26, 27, 28, 30, 32, 34, 35, 37, 35, 37, 45] },
            { x: 'R&D', y: [26, 27, 29, 32, 34, 35, 36, 37, 38, 39, 41, 43, 58] },
            { x: 'Sales', y: [27, 26, 28, 29, 29, 29, 32, 35, 32, 38, 53] },
            { x: 'Inventory', y: [21, 23, 24, 25, 26, 27, 28, 30, 34, 36, 38] },
            { x: 'Graphics', y: [26, 28, 29, 30, 32, 33, 35, 36, 52] },
            { x: 'Training', y: [28, 29, 30, 31, 32, 34, 35, 36] },
            { x: 'HR', y: [22, 24, 25, 30, 32, 34, 36, 38, 39, 41, 35, 36, 40, 56] },
    ];
        this.primaryXAxis = { valueType: 'Category' };
        this.primaryYAxis = { title: 'Age', maximum: 60 };
        this.title = 'Employee Age Group in Various Departments';
        this.marker = { visible: true };
        this.tooltip = { enable: true };
    }
}
```

### Histogram

Displays frequency distribution of numeric data bins.

**Use Case:** Distribution shape, frequency analysis, data spread

**API Properties:**
- [Series.type](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#type) = 'Histogram'
- [Series.binInterval](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#binInterval) - Histogram bin width (default: null, auto-calculated)
- [Series.showNormalDistribution](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#showNormalDistribution) - Show normal distribution curve (default: false)
- [Series.columnWidth](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#columnWidth) - Column width (default: 1 for histogram)

**Example:**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { HistogramSeriesService } from '@syncfusion/ej2-angular-charts'
import { points } from './datasource'
import { Component, OnInit } from '@angular/core';
import { ILoadedEventArgs } from '@syncfusion/ej2-angular-charts';

@Component({
imports: [ ChartModule ],
providers: [HistogramSeriesService],
standalone: true,
    selector: 'app-container',
    template: ` <ejs-chart style='display:block;' align='center' id='chart-container' [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' (load)='load($event)'>
            <e-series-collection>
                <e-series [dataSource]='data' type='Histogram' yName='y' name='Score' width=2 [binInterval]='binInterval' showNormalDistribution='showNormalDistribution'
                [columnWidth]='columnWidth'> </e-series>
            </e-series-collection>
        </ejs-chart>`
})
export class AppComponent implements OnInit {
    public data: Object[] = [];
    public primaryXAxis: Object = {
        minimum: 0, maximum: 100
    };
    public primaryYAxis: Object = {
            minimum: 0, maximum: 50, interval: 10,
    };
    public points: number[] = [5.250, 7.750, 0, 8.275, 9.750, 7.750, 8.275, 6.250, 5.750,
        5.250, 23.000, 26.500, 27.750, 25.025, 26.500, 26.500, 28.025, 29.250, 26.750, 27.250,
        26.250, 25.250, 34.500, 25.625, 25.500, 26.625, 36.275, 36.250, 26.875, 40.000, 43.000,
        46.500, 47.750, 45.025, 56.500, 56.500, 58.025, 59.250, 56.750, 57.250,
        46.250, 55.250, 44.500, 45.525, 55.500, 46.625, 46.275, 56.250, 46.875, 43.000,
        46.250, 55.250, 44.500, 45.425, 55.500, 56.625, 46.275, 56.250, 46.875, 43.000,
        46.250, 55.250, 44.500, 45.425, 55.500, 46.625, 56.275, 46.250, 56.875, 41.000, 63.000,
        66.500, 67.750, 65.025, 66.500, 76.500, 78.025, 79.250, 76.750, 77.250,
        66.250, 75.250, 74.500, 65.625, 75.500, 76.625, 76.275, 66.250, 66.875, 80.000, 85.250,
        87.750, 89.000, 88.275, 89.750, 97.750, 98.275, 96.250, 95.750, 95.250
    ];
    public load(args: ILoadedEventArgs): void {
    points.map((value: number) => {
        this.data.push({
            y: value
        });
    });
    };
    public binInterval: number = 20;
    public columnWidth: number = 0.99;
    public showNormalDistribution: boolean = true;

    ngOnInit(): void {

    }
}
```

### Pareto

Bar chart plus cumulative line for 80/20 analysis.

**Use Case:** Quality control, identifying vital few, prioritization

**Example:**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, LineSeriesService, StepLineSeriesService, SplineSeriesService, StackingLineSeriesService, DateTimeService,
    SplineAreaSeriesService, MultiColoredLineSeriesService, ParetoSeriesService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [ ChartModule ],
providers: [ CategoryService, LineSeriesService, StepLineSeriesService, SplineSeriesService, StackingLineSeriesService, DateTimeService,
        SplineAreaSeriesService, MultiColoredLineSeriesService, ParetoSeriesService, ColumnSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title' [tooltip]='tooltip'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Pareto' xName='x' yName='y' name='Defect' width=2 [marker]='marker'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    public marker?: Object;
    public tooltip?: Object;
    ngOnInit(): void {
        this.chartData = [
            { x: 'Button Defect', y: 23 },
            { x: 'Pocket Defect', y: 16 },
            { x: 'Coller Defect', y: 10 },
            { x: 'Cuff Defect', y: 7 },
            { x: 'Sleeve Defect', y: 6 },
            { x: 'Other Defect', y: 2 }
        ];
        this.primaryXAxis = {
            title: 'Defects',
            valueType: 'Category',
        };
        this.marker = { visible: true, width: 10, height: 10 };
        this.primaryYAxis = {
         title: 'Frequency of Occurence',
            minimum: 0,
            maximum: 150,
            interval: 30,

        };
        this.tooltip = { enable: true, shared: true }
        this.title = 'Pareto chart - Defects in Shirts';
    }
}
```

### Error Bar

Adds error/uncertainty ranges to data points.

**Use Case:** Measurement uncertainty, confidence intervals, variance display

**Example:**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { ColumnSeriesService, LineSeriesService, ErrorBarService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [ ChartModule ],
providers: [ColumnSeriesService, LineSeriesService, ErrorBarService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Line' xName='x' yName='y' name='India' width=2 [marker]='marker' [errorBar]='errorBar'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public marker?: Object;
    public errorBar?: Object;
    primaryYAxis: any;
    ngOnInit(): void {
        this.chartData = [
            { x: 2006, y: 7.8 }, { x: 2007, y: 7.2 },
            { x: 2008, y: 6.8 }, { x: 2009, y: 10.7 },
            { x: 2010, y: 10.8 }, { x: 2011, y: 9.8 }
        ];
        this.primaryXAxis = {
            minimum: 2005, maximum: 2012, interval: 1,
            title: 'Year'
        };
        this.marker = { visible: true };
        this.errorBar = { visible: true };
        this.title = 'Unemployment rate (%)';
    }
}
```

## Specialized Series

Unique series types for specific visualization needs.

### Scatter

Individual x/y points showing correlation or clusters.

**Use Case:** Correlation analysis, cluster identification, relationship visualization

**Example:**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { ScatterSeriesService, LegendService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
@Component({
imports: [ ChartModule ],
providers: [ ScatterSeriesService, LegendService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='series1' type='Scatter' xName='x' yName='y' name='Male' opacity=0.7 [marker]='marker'></e-series>
            <e-series [dataSource]='series2' type='Scatter' xName='x' yName='y' name='Female' opacity=0.7 [marker]='marker'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    public series1?: Object;
    public series2?: Object;
    public marker?: Object;
    getScatterData(): any {
        let series1: Object[] = [];
        let series2: Object[] = [];
        let point1: Object;
        let value: number = 80;
        let value1: number = 70;
        let i: number;
        for (i = 1; i < 120; i++) {
            if (Math.random() > 0.5) {
                value += Math.random();
            } else {
                value -= Math.random();
            }
            value = value < 60 ? 60 : value > 90 ? 90 : value;
            point1 = { x: 120 + (i / 2), y: value.toFixed(1) };
            series1.push(point1);
        }
        for (i = 1; i < 120; i++) {
            if (Math.random() > 0.5) {
                value1 += Math.random();
            } else {
                value1 -= Math.random();
            }
            value1 = value1 < 60 ? 60 : value1 > 90 ? 90 : value1;
            point1 = { x: 120 + (i / 2), y: value1.toFixed(1) };
            series2.push(point1);
        }
        return { 'series1':series1, 'series2': series2};
    };
    ngOnInit(): void {
        this.primaryXAxis = {
            title: 'Height (cm)',
            minimum: 120, maximum: 180,
            edgeLabelPlacement: 'Shift',
            labelFormat: '{value}cm'
        };
        this.primaryYAxis = {
            title: 'Weight (kg)',
            minimum: 60, maximum: 90,
            labelFormat: '{value}kg',
            rangePadding: 'None'
        };
        this.title = 'Height Vs Weight';
        this.marker = {  width: 10, height: 10 };
        this.series1 = this.getScatterData().series1;
        this.series2 = this.getScatterData().series2;
    }
}
```

### Bubble

Scatter with point size encoding a third dimension.

**Use Case:** Three-variable visualization, size-encoded data

**Example:**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { BubbleSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
@Component({
imports: [ ChartModule ],
providers: [ BubbleSeriesService],
standalone: true,
    selector: 'app-container',
    template: ` <ejs-chart style='display:block;' id='chart-container' [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis'
                [title]='title' >
                <e-series-collection>
                    <e-series [dataSource]='data' type='Bubble' xName='x' yName='y' size='size' name='pound'> </e-series>
                </e-series-collection>
     </ejs-chart>`
})
export class AppComponent implements OnInit {
    public title?: string;
    public data?: Object[];
    primaryXAxis: any;
    primaryYAxis: any;
    ngOnInit(): void {
    this.data = [
        { x: 92.2, y: 7.8, size: 1.347, text: 'China' },
        { x: 74, y: 6.5, size: 1.241, text: 'India' },
        { x: 90.4, y: 6.0, size: 0.238, text: 'Indonesia' },
        { x: 99.4, y: 2.2, size: 0.312, text: 'US' },
        { x: 88.6, y: 1.3, size: 0.197, text: 'Brazil' },
        { x: 99, y: 0.7, size: 0.0818, text: 'Germany' },
        { x: 72, y: 2.0, size: 0.0826, text: 'Egypt' },
        { x: 99.6, y: 3.4, size: 0.143, text: 'Russia' },
        { x: 99, y: 0.2, size: 0.128, text: 'Japan' },
        { x: 86.1, y: 4.0, size: 0.115, text: 'Mexico' },
        { x: 92.6, y: 6.6, size: 0.096, text: 'Philippines' },
        { x: 61.3, y: 14.5, size: 0.162, text: 'Nigeria' }];
    this.title = 'GDP vs Literacy Rate';
    }
}
```

### Polar

Circular chart with radial axes from center.

**Use Case:** Cyclical data, directional data, circular patterns

**Example:**
```typescript
import { ChartModule, ChartAllModule } from '@syncfusion/ej2-angular-charts'
import { ButtonModule } from '@syncfusion/ej2-angular-buttons'
import { AreaSeriesService, LineSeriesService, ExportService, ColumnSeriesService, StackingColumnSeriesService, StackingAreaSeriesService, RangeColumnSeriesService, ScatterSeriesService, PolarSeriesService, CategoryService, RadarSeriesService, SplineSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
@Component({
imports: [ChartModule, ButtonModule, ChartAllModule],
providers: [ AreaSeriesService, LineSeriesService, ExportService, ColumnSeriesService, StackingColumnSeriesService, StackingAreaSeriesService, RangeColumnSeriesService, ScatterSeriesService, PolarSeriesService, CategoryService, RadarSeriesService, SplineSeriesService],
standalone: true,
    selector: 'app-container',
    template: ` <ejs-chart id='chartcontainer' [primaryXAxis]='primaryXAxis'
            [title]='title' >
            <e-series-collection>
                <e-series [dataSource]='data' type='Polar' xName='x' yName='y' drawType='Line'> </e-series>
            </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public title?: string;
    public primaryYAxis?: Object;
    public data?: Object[];
    ngOnInit(): void {
        this.data = [{ x: 2005, y: 28 },
            { x: 2006, y: 25 },
            { x: 2007, y: 26 },
            { x: 2008, y: 27 },
            { x: 2009, y: 32 },
            { x: 2010, y: 35 },
            { x: 2011, y: 30 }
            ];
        this.primaryXAxis = {
            title: 'Year', startAngle: 90,
            minimum: 2004, maximum: 2012, interval: 1
            };
        this.title = 'Efficiency of oil-fired power production';

    }
}

```

**drawType options:** Line, Column, Area, Scatter, Spline, StackingArea, StackingColumn

### Radar

Similar to polar but with straight lines from center.

**Use Case:** Multi-variable comparison, skill assessments, radar plots

**Example:**
```typescript
import { ChartModule, ChartAllModule } from '@syncfusion/ej2-angular-charts'
import { ButtonModule } from '@syncfusion/ej2-angular-buttons'
import { AreaSeriesService, LineSeriesService, ExportService, ColumnSeriesService, StackingColumnSeriesService, StackingAreaSeriesService, RangeColumnSeriesService, ScatterSeriesService, PolarSeriesService, CategoryService, RadarSeriesService, SplineSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [ ChartModule, ButtonModule, ChartAllModule ],
providers: [ AreaSeriesService, LineSeriesService, ExportService, ColumnSeriesService, StackingColumnSeriesService, StackingAreaSeriesService, RangeColumnSeriesService, ScatterSeriesService, PolarSeriesService, CategoryService, RadarSeriesService, SplineSeriesService],
standalone: true,
    selector: 'app-container',
    template: ` <ejs-chart id='chartcontainer' [title]='title' >
            <e-series-collection>
                <e-series [dataSource]='data' type='Radar' xName='x' yName='y' drawType='Line'> </e-series>
            </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public title?: string;
    public data?: Object[];
    ngOnInit(): void {
        this.data = [
            { x: 2005, y: 28 },
            { x: 2006, y: 25 },
            { x: 2007, y: 26 },
            { x: 2008, y: 27 },
            { x: 2009, y: 32 },
            { x: 2010, y: 35 },
            { x: 2011, y: 30 }
        ];
        this.title = 'Efficiency of oil-fired power production';
    }
}

```

### Waterfall

Shows sequential positive/negative contributions to cumulative total.

**Use Case:** Financial reconciliations, cumulative effects, bridge charts

**Example:**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, WaterfallSeriesService, DataLabelService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [ ChartModule ],
providers: [CategoryService,WaterfallSeriesService,DataLabelService],
standalone: true,
    selector: 'app-container',
    template: ` <ejs-chart style='display:block;' id='chart-container' [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis'
                [title]='title' >
                <e-series-collection>
                    <e-series [dataSource]='data' type='Waterfall' xName='x' yName='y' name='USA' [columnWidth]='columnWidth'
                [connector]='connector' [intermediateSumIndexes]='intermediate' [sumIndexes]='sum' [marker]='marker'> </e-series>
                </e-series-collection>
     </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public title?: string;
    public primaryYAxis?: Object;
    public data?: Object[];
    public marker?: Object;
    public connector?: Object;
    public sum: number[] = [8];
    public intermediate: number[] = [4, 7];
    public columnWidth: number = 0.6;

    ngOnInit(): void {
        this.data = [
            { x: 'Income', y: 4711 }, { x: 'Sales', y: -1015 },
            { x: 'Development', y: -688 },
            { x: 'Revenue', y: 1030 }, {x: 'Balance'},
            { x: 'Administrative', y: -780 },
            { x: 'Expense', y: -361 }, { x: 'Tax', y: -695 },
            { x: 'Net Profit'}
            ];
        this.primaryXAxis = {
            majorGridLines: {width: 0},
            valueType: 'Category',
            };
        this.primaryYAxis = {
            labelFormat: '${value}M',
            minimum: 0, maximum: 5500, interval: 500,
            majorGridLines: {width: 0},
            lineStyle: { width: 0},
            majorTickLines: { width: 0}
            };
        this.marker = {
            dataLabel: { visible: true, position: 'Outer' }
            };
        this.connector = { color: '#5F6A6A', width: 1.5 };
        this.title = 'Company Revenue and Profit';
    }
}
```

### Vertical Chart

Inverts chart orientation (rotates axes).

**Use Case:** Alternative perspective, specific layout requirements

**Example:**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, LineSeriesService, StepLineSeriesService, SplineSeriesService, StackingLineSeriesService, DateTimeService,
    SplineAreaSeriesService, MultiColoredLineSeriesService, ParetoSeriesService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [ ChartModule ],
providers: [ CategoryService, LineSeriesService, StepLineSeriesService, SplineSeriesService, StackingLineSeriesService, DateTimeService,
        SplineAreaSeriesService, MultiColoredLineSeriesService, ParetoSeriesService, ColumnSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title' isTransposed='true'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Spline' xName='x' yName='y' name='London' width=2 [marker]='marker'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    public marker?: Object;
    ngOnInit(): void {
        this.chartData = [
            { x: 'Jan', y: -1 }, { x: 'Feb', y: -1 },
            { x: 'Mar', y: 2 }, { x: 'Apr', y: 8 },
            { x: 'May', y: 13 }, { x: 'Jun', y: 18 },
            { x: 'Jul', y: 21 }, { x: 'Aug', y: 20 },
            { x: 'Sep', y: 16 }, { x: 'Oct', y: 10 },
            { x: 'Nov', y: 4 }, { x: 'Dec', y: 0 }
        ];
        this.primaryXAxis = {
           title: 'Month',
           valueType: 'Category'
        };
        this.marker = { visible: true, width: 10, height: 10 };
        this.primaryYAxis = {
            minimum: -5, maximum: 35, interval: 5,
            title: 'Temperature in Celsius',
            labelFormat: '{value}C'
        };
        this.title = 'Climate Graph-2012';
    }
}
```

## Choosing the Right Series Type

| Data Type | Recommended Series |
|-----------|-------------------|
| **Trend over time** | Line, Spline, Area |
| **Category comparison** | Column, Bar |
| **Part-to-whole** | Stacked Column, Stacked Area, 100% Stacked |
| **Distribution** | Histogram, Box & Whisker |
| **Correlation** | Scatter, Bubble |
| **Financial/Stock** | Candlestick, Hilo, HiloOpenClose |
| **Range/Min-Max** | Range Area, Range Column |
| **Prioritization** | Pareto |
| **Sequential changes** | Waterfall |
| **Cyclical patterns** | Polar, Radar |

## Combining Multiple Series

Mix different series types in one chart for rich visualizations:

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService, LegendService, DataLabelService, MultiLevelLabelService, SelectionService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [ ChartModule ],
providers: [ CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService,LegendService, DataLabelService, MultiLevelLabelService, SelectionService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='gold' name='gold'></e-series>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='silver' name='Silver'></e-series>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='bronze' name='Bronze'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    ngOnInit(): void {
        this.chartData = [
              { country: "USA", gold: 50, silver: 70, bronze: 45 },
              { country: "China", gold: 40, silver: 60, bronze: 55 },
              { country: "Japan", gold: 70, silver: 60, bronze: 50 },
              { country: "Australia", gold: 60, silver: 56, bronze: 40 },
              { country: "France", gold: 50, silver: 45, bronze: 35 },
              { country: "Germany", gold: 40, silver: 30, bronze: 22 },
              { country: "Italy", gold: 40, silver: 35, bronze: 37 },
              { country: "Sweden", gold: 30, silver: 25, bronze: 27 }
        ];
        this.primaryXAxis = {
            valueType: 'Category',
            title: 'Countries'
        };
        this.primaryYAxis = {
            minimum: 0, maximum: 80,
            interval: 20, title: 'Medals'
        };
        this.title = 'Olympic Medals';
    }
}
```

**Best Practices:**
- Limit to 2-3 different series types per chart
- Ensure visual hierarchy (emphasize primary data)
- Use consistent color schemes
- Consider axis scaling when combining types

## Common Pitfalls

1. **Wrong Series for Data Type:** Using line charts for categorical comparisons
2. **Too Many Series:** Cluttered charts with 5+ series
3. **Inconsistent Data Structure:** Different data formats across series
4. **Missing Required Properties:** Forgetting `low`/`high` for range series, `open`/`close` for financial

## Performance Considerations

- **Large Datasets:** Use `enableCanvas` rendering for 10,000+ points
- **Many Series:** Limit to 10-15 series per chart
- **Animation:** Disable for real-time updates: `animation: { enable: false }`

Refer to the data-binding reference for optimization techniques.

## API Reference Summary

### Core Series Configuration

| API | Description | Documentation |
|-----|-------------|---------------|
| ChartSeriesType | Enum defining all 25+ series types | [chartSeriesType](https://ej2.syncfusion.com/angular/documentation/api/chart/chartSeriesType) |
| SeriesDirective | Main series configuration with 60+ properties | [seriesDirectived](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective) |
| Series | Series class with methods and properties | [series](https://ej2.syncfusion.com/angular/documentation/api/chart/series) |
| SeriesModel | Series interface/model definition | [seriesModel](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesModel) |

### Series Type-Specific Properties

| Series Type | Key Properties | API Reference |
|-------------|----------------|---------------|
| **Line/Spline** | width, dashArray, splineType | [width](https://ej2.syncfusion.com/angular/documentation/api/chart/series#width), [SplineType](https://ej2.syncfusion.com/angular/documentation/api/chart/splineType) |
| **Column/Bar** | columnWidth, columnSpacing, columnFacet, cornerRadius | [columnWidth](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#columnWidth), [ColumnFacet](https://ej2.syncfusion.com/angular/documentation/api/chart/columnFacet) |
| **Area** | opacity, fill, border | [opacity](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#opacity), [BorderModel](https://ej2.syncfusion.com/angular/documentation/api/chart/borderModel) |
| **Financial** | open, high, low, close, bearFillColor, bullFillColor, enableSolidCandles | [FinancialDataFields](https://ej2.syncfusion.com/angular/documentation/api/chart/financialDataFields) |
| **Range** | low, high | [low](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#low), [high](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#high) |
| **Bubble** | size, minRadius, maxRadius | [size](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#size) |
| **Polar/Radar** | drawType, isClosed | [ChartDrawType](https://ej2.syncfusion.com/angular/documentation/api/chart/chartDrawType), [isClosed](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#isClosed) |
| **Waterfall** | intermediateSumIndexes, sumIndexes, connector | [connector](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#connector), [ConnectorModel](https://ej2.syncfusion.com/angular/documentation/api/chart/connectorModel) |
| **Box & Whisker** | showMean, showOutliers, boxPlotMode | [showMean](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#showMean), [BoxPlotMode](https://ej2.syncfusion.com/angular/documentation/api/chart/boxPlotMode) |
| **Histogram** | binInterval, showNormalDistribution | [binInterval](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#binInterval) |
| **Pareto** | paretoOptions | [ParetoOptions](https://ej2.syncfusion.com/angular/documentation/api/chart/paretoOptions), [ParetoOptionsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/paretoOptionsModel) |

### Styling and Appearance

| Property | Type | Default | API Reference |
|----------|------|---------|---------------|
| fill | string | null | [fill](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#fill) |
| opacity | number | 1 | [opacity](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#opacity) |
| border | BorderModel | - | [BorderModel](https://ej2.syncfusion.com/angular/documentation/api/chart/borderModel) |
| dashArray | string | '' | [dashArray](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#dashArray) |
| animation | AnimationModel | - | [AnimationModel](https://ej2.syncfusion.com/angular/documentation/api/chart/animationModel) |

### Data Point Customization

| Feature | API Reference |
|---------|---------------|
| Markers | [MarkerSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/markerSettingsModel) |
| Data Labels | [DataLabelSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/dataLabelSettingsModel) |
| Point Colors | [RangeColorSettingModel](https://ej2.syncfusion.com/angular/documentation/api/chart/rangeColorSettingModel) |
| Empty Points | [EmptyPointSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/emptyPointSettingsModel) |

### Enumerations

| Enum | Description | API Reference |
|------|-------------|---------------|
| ChartSeriesType | All series type values | [chartSeriesType](https://ej2.syncfusion.com/angular/documentation/api/chart/chartSeriesType) |
| ChartDrawType | Draw types for Polar/Radar | [chartDrawType](https://ej2.syncfusion.com/angular/documentation/api/chart/chartDrawType) |
| SplineType | Spline interpolation types | [splineType](https://ej2.syncfusion.com/angular/documentation/api/chart/splineType) |
| BoxPlotMode | Box plot calculation modes | [boxPlotMode](https://ej2.syncfusion.com/angular/documentation/api/chart/boxPlotMode) |
