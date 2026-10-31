# Axes and Chart Layout

Axes define how data maps to visual space and provide context through labels, gridlines, and titles. This guide covers axis configuration, multiple axes, layout options, and chart structure.

## Table of Contents

- [Axis Types](#axis-types)
- [Primary and Secondary Axes](#primary-and-secondary-axes)
- [Multiple Axes](#multiple-axes)
- [Axis Labels](#axis-labels)
- [Gridlines and Tick Lines](#gridlines-and-tick-lines)
- [Axis Crossing and Inversion](#axis-crossing-and-inversion)
- [Multiple Panes](#multiple-panes)
- [Chart Title and Subtitle](#chart-title-and-subtitle)
- [Chart Dimensions](#chart-dimensions)
- [Margins and Padding](#margins-and-padding)

## Axis Types

The Syncfusion Chart supports four axis value types for mapping different data formats.

**API Reference:** 
- [AxisModel](https://ej2.syncfusion.com/angular/documentation/api/chart/axisModel) - Complete axis configuration with 50+ properties
- [Axis](https://ej2.syncfusion.com/angular/documentation/api/chart/axis) - Axis class documentation
- [ValueType](https://ej2.syncfusion.com/angular/documentation/api/chart/valueType) - Enum for axis value types

### Numeric Axis (Double)

For continuous numerical data (default type).

**API Properties:**
- [valueType](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#valueType) = 'Double' (default)
- [minimum](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#minimum) (Object, default: null) - Minimum axis value
- [maximum](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#maximum) (Object, default: null) - Maximum axis value
- [interval](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#interval) (number, default: null) - Label interval spacing
- [rangePadding](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#rangePadding) - [ChartRangePadding](https://ej2.syncfusion.com/angular/documentation/api/chart/chartRangePadding) enum (None, Normal, Additional, Round, Auto)
- [desiredIntervals](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#desiredIntervals) (number, default: null) - Desired number of intervals

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { ColumnSeriesService, AreaSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { chartData } from './datasource';

@Component({
imports: [
         ChartModule
    ],

providers: [ ColumnSeriesService, AreaSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Area' xName='x' yName='y' name='England'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    ngOnInit(): void {
        this.primaryXAxis = {
            valueType: 'Double',  // Default, can be omitted
            minimum: 1,
            maximum: 20,
            interval: 5,
            title: 'Overs'
        };
        this.chartData = [
             { x: 1, y: 7 }, { x: 2, y: 1 }, { x: 3, y: 1 },
             { x: 4, y: 14 }, { x: 5, y: 1 }, { x: 6, y: 10 },
             { x: 7, y: 8 }, { x: 8, y: 6 }, { x: 9, y: 10 },
             { x: 10, y: 10 }, { x: 11, y: 16 }, { x: 12, y: 6 },
             { x: 13, y: 14 }, { x: 14, y: 7 }, { x: 15, y: 5 },
             { x: 16, y: 2 }, { x: 17, y: 14 }, { x: 18, y: 7 },
             { x: 19, y: 7 }, { x: 20, y: 10 }
        ];
        this.title = 'England - Run Rate';
    }

}
```

### DateTime Axis

For time-series data with dates.

**API Properties:**
- [valueType](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#valueType) = 'DateTime'
- [labelFormat](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#labelFormat) (string, default: '') - Date/time format string
- [intervalType](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#intervalType) - [IntervalType](https://ej2.syncfusion.com/angular/documentation/api/chart/intervalType) enum (Years, Months, Days, Hours, Minutes, Seconds, Auto)
- [interval](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#interval) (number, default: null) - Number of intervals
- [skeleton](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#skeleton) (string, default: '') - Skeleton format for date labels
- [skeletonType](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#skeletonType) - [SkeletonType](https://ej2.syncfusion.com/angular/documentation/api/chart/skeletonType) enum (DateTime, Date, Time)

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateTimeService, LineSeriesService, DateTimeCategoryService, StripLineService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [
         ChartModule
    ],

providers: [ DateTimeService, LineSeriesService, DateTimeCategoryService, StripLineService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Line' xName='x' yName='y' name='Sales'></e-series>
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
                 { x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
                 { x: new Date(2004, 3, 6), y: 15 }, { x: new Date(2006, 3, 30), y: 65 },
                 { x: new Date(2008, 3, 8), y: 90 }, { x: new Date(2010, 3, 8), y: 85 }
        ];
        this.primaryXAxis = {
            valueType: 'DateTime',
            title: 'Sales Across Years',
            labelFormat: 'yMMM'
        };
        this.primaryYAxis = {
           title: 'Sales Amount in millions(USD)'
        };
        this.title = 'Average Sales Comparison';
    }

}
```

**Interval Types:** See [IntervalType](https://ej2.syncfusion.com/angular/documentation/api/chart/intervalType)
- `Years`, `Months`, `Days`, `Hours`, `Minutes`, `Seconds`, `Auto`

**Label Formats:**
- `'dd/MM/yyyy'`: 01/03/2024
- `'MMM yyyy'`: Mar 2024
- `'HH:mm'`: 14:30

### Category Axis

For discrete categories (strings or numbers treated as categories).

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService, LegendService, DataLabelService, MultiLevelLabelService, SelectionService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService,LegendService, DataLabelService, MultiLevelLabelService, SelectionService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='gold' name='Gold'></e-series>
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
             { country: "USA", gold: 50 },
             { country: "China", gold: 40 },
             { country: "Japan", gold: 70 },
             { country: "Australia", gold: 60 },
             { country: "France", gold: 50 },
             { country: "Germany", gold: 40 },
             { country: "Italy", gold: 40 },
             { country: "Sweden", gold: 30, silver: 25 }
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

**Features:**
- Automatically spaces categories evenly
- Supports label rotation for long names
- Ideal for bar/column charts

### Logarithmic Axis

For data spanning multiple orders of magnitude.

**API Properties:**
- [valueType](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#valueType) = 'Logarithmic'
- [logBase](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#logBase) (number, default: 10) - Base of logarithm (e.g., 2, 10, e)
- [interval](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#interval) (number, default: null) - Interval in log scale

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { LogarithmicService, DateTimeService, LineSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { logData } from './datasource';
@Component({
imports: [
         ChartModule
    ],

providers: [ LogarithmicService, LineSeriesService, DateTimeService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Line' xName='x' yName='y' name='Product X'></e-series>
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
            { x: new Date(1995, 0, 1), y: 80 }, { x: new Date(1996, 0, 1), y: 200 },
            { x: new Date(1997, 0, 1), y: 400 }, { x: new Date(1998, 0, 1), y: 600 },
            { x: new Date(1999, 0, 1), y: 700 }, { x: new Date(2000, 0, 1), y: 1400 },
            { x: new Date(2001, 0, 1), y: 2000 }, { x: new Date(2002, 0, 1), y: 4000 },
            { x: new Date(2003, 0, 1), y: 6000 }, { x: new Date(2004, 0, 1), y: 8000 },
            { x: new Date(2005, 0, 1), y: 11000 }
    ];
        this.primaryXAxis = {
            valueType: 'DateTime',
            title: 'Years',
            labelFormat: 'y'
        };
        this.primaryYAxis = {
           valueType: 'Logarithmic',
           title: 'Profit',
           logBase: 2
        };
        this.title = 'Product X Growth [1995-2005]';
    }
}
```

**Use Cases:**
- Exponential growth data
- Scientific measurements
- Financial data with wide ranges

## Primary and Secondary Axes

Charts have primary X and Y axes by default. Secondary axes allow different scales.

### Primary Axes

```typescript
public primaryXAxis = {
  valueType: 'Category',
  title: 'Month'
};

public primaryYAxis = {
  title: 'Sales (USD)',
  minimum: 0,
  maximum: 100
};
```

```html
<ejs-chart [primaryXAxis]="primaryXAxis" [primaryYAxis]="primaryYAxis">
  <e-series-collection>
    <e-series [dataSource]="data" type="Column" xName="month" yName="sales"></e-series>
  </e-series-collection>
</ejs-chart>
```

**Exmaple**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService, LegendService, DataLabelService, MultiLevelLabelService, SelectionService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService,LegendService, DataLabelService, MultiLevelLabelService, SelectionService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='gold' name='Gold'></e-series>
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
             { country: "USA", gold: 50 },
             { country: "China", gold: 40 },
             { country: "Japan", gold: 70 },
             { country: "Australia", gold: 60 },
             { country: "France", gold: 50 },
             { country: "Germany", gold: 40 },
             { country: "Italy", gold: 40 },
             { country: "Sweden", gold: 30, silver: 25 }
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

### Secondary Axes

Display series with different scales on opposite sides.

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService, LegendService, DataLabelService, MultiLevelLabelService, SelectionService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { multipleData } from './datasource';
@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService,LegendService, DataLabelService, MultiLevelLabelService, SelectionService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-axes>
            <e-axis rowIndex=0 name='yAxis1' opposedPosition='true' title='Temperature (Celsius)' [majorGridLines]='majorGridLines' labelFormat='{value}°C'
                   [minimum]='24' [maximum]='36' [interval]='2' [lineStyle]='lineStyle'>
            </e-axis>
        </e-axes>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='x' yName='y' name='Germany'></e-series>
            <e-series [dataSource]='chartData' type='Line' xName='x' yName='y1' yAxisName='yAxis1' name='Japan' [marker]='marker'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public marker?: Object;
    primaryYAxis: any;
    lineStyle: any;
    majorGridLines: any;
    ngOnInit(): void {
        this.chartData = [
            { x: 'Jan', y: 15, y1: 33 }, { x: 'Feb', y: 20, y1: 31 }, { x: 'Mar', y: 35, y1: 30 },
            { x: 'Apr', y: 40, y1: 28 }, { x: 'May', y: 80, y1: 29 }, { x: 'Jun', y: 70, y1: 30 },
            { x: 'Jul', y: 65, y1: 33 }, { x: 'Aug', y: 55, y1: 32 }, { x: 'Sep', y: 50, y1: 34 },
            { x: 'Oct', y: 30, y1: 32 }, { x: 'Nov', y: 35, y1: 32 }, { x: 'Dec', y: 35, y1: 31 }];
        this.primaryXAxis = {
            valueType: 'Category'
        };
        this.marker = {
            visible: true, width: 10, height: 10, border: { width: 2, color: '#F8AB1D' }
        }
        this.title = 'Weather Condition';
    }

}

```

**Key Points:**
- Use `opposedPosition: true` to place axis on right/top
- Bind series to axis using `yAxisName` property
- Different axis types allowed (e.g., Double + DateTime)

## Multiple Axes

Create charts with more than two Y-axes for complex comparisons.

### Multiple Y-Axes

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService, LegendService, DataLabelService, MultiLevelLabelService, SelectionService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { multipleData } from './datasource';
@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService,LegendService, DataLabelService, MultiLevelLabelService, SelectionService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-axes>
            <e-axis rowIndex=0 name='yAxis1' opposedPosition='true' title='Temperature (Celsius)' [majorGridLines]='majorGridLines' labelFormat='{value}°C'
                   [minimum]='24' [maximum]='36' [interval]='2' [lineStyle]='lineStyle'>
            </e-axis>
        </e-axes>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='x' yName='y' name='Germany'></e-series>
            <e-series [dataSource]='chartData' type='Line' xName='x' yName='y1' yAxisName='yAxis1' name='Japan' [marker]='marker'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public marker?: Object;
    primaryYAxis: any;
    lineStyle: any;
    majorGridLines: any;
    ngOnInit(): void {
        this.chartData = [
            { x: 'Jan', y: 15, y1: 33 }, { x: 'Feb', y: 20, y1: 31 }, { x: 'Mar', y: 35, y1: 30 },
            { x: 'Apr', y: 40, y1: 28 }, { x: 'May', y: 80, y1: 29 }, { x: 'Jun', y: 70, y1: 30 },
            { x: 'Jul', y: 65, y1: 33 }, { x: 'Aug', y: 55, y1: 32 }, { x: 'Sep', y: 50, y1: 34 },
            { x: 'Oct', y: 30, y1: 32 }, { x: 'Nov', y: 35, y1: 32 }, { x: 'Dec', y: 35, y1: 31 }]
    ;
        this.primaryXAxis = {
            valueType: 'Category'
        };
        this.marker = {
            visible: true, width: 10, height: 10, border: { width: 2, color: '#F8AB1D' }
        }
        this.title = 'Weather Condition';
    }

}

```

### Multiple X-Axes

```typescript
public primaryXAxis = {
  name: 'xAxis1',
  valueType: 'Category'
};

public axes = [{
  name: 'xAxis2',
  opposedPosition: true,
  valueType: 'Category'
}];
```

```html
<e-series [dataSource]="data1" type="Column" xName="x" yName="y" xAxisName="xAxis1"></e-series>
<e-series [dataSource]="data2" type="Line" xName="x" yName="y" xAxisName="xAxis2"></e-series>
```

## Axis Labels

Customize label appearance, rotation, and formatting.

**API Reference:**
- [labelFormat](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#labelFormat) - Label format string
- [labelStyle](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#labelStyle) - [FontModel](https://ej2.syncfusion.com/angular/documentation/api/chart/fontModel) for label styling
- [labelRotation](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#labelRotation) - Label rotation angle
- [labelIntersectAction](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#labelIntersectAction) - [LabelIntersectAction](https://ej2.syncfusion.com/angular/documentation/api/chart/labelIntersectAction) enum
- [labelPlacement](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#labelPlacement) - [LabelPlacement](https://ej2.syncfusion.com/angular/documentation/api/chart/labelPlacement) enum
- [labelPosition](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#labelPosition) - [AxisPosition](https://ej2.syncfusion.com/angular/documentation/api/chart/axisPosition) enum

### Label Formatting

**API Property:** [labelFormat](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#labelFormat) (string, default: '')

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService, LegendService, DataLabelService, MultiLevelLabelService, SelectionService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { categoryData } from './datasource';
@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService,LegendService, DataLabelService, MultiLevelLabelService, SelectionService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='gold' name='Gold' ></e-series>
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
           interval: 20, title: 'Medals',
           labelFormat: '${value}K',  // Format pattern
           titleStyle: {
            size: '16px', color: 'grey',
            fontFamily : 'Segoe UI', fontWeight : 'bold'
           }
        };
        this.title = 'Olympic Medals';
    }

}
```

**Format Patterns:**
- `'${value}K'`: Append K (35K)
- `'${value}%'`: Percentage (35%)
- `'${value}M'`: Millions
- `'n2'`: Number with 2 decimals (35.00)
- `'c2'`: Currency with 2 decimals ($35.00)

**For DateTime:**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateTimeService, LineSeriesService, DateTimeCategoryService, StripLineService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [
         ChartModule
    ],

providers: [ DateTimeService, LineSeriesService, DateTimeCategoryService, StripLineService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Line' xName='x' yName='y' name='Sales'></e-series>
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
                 { x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
                 { x: new Date(2004, 3, 6), y: 15 }, { x: new Date(2006, 3, 30), y: 65 },
                 { x: new Date(2008, 3, 8), y: 90 }, { x: new Date(2010, 3, 8), y: 85 }
        ];
        this.primaryXAxis = {
            valueType: 'DateTime',
            title: 'Sales Across Years',
            labelFormat: 'yMMM'
        };
        this.primaryYAxis = {
           title: 'Sales Amount in millions(USD)'
        };
        this.title = 'Average Sales Comparison';
    }
}
```

### Label Rotation

Rotate labels to fit long text or save space.

**API Properties:**
- [labelRotation](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#labelRotation) (number, default: 0) - Rotation angle in degrees (-90 to 90)
- [labelIntersectAction](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#labelIntersectAction) - [LabelIntersectAction](https://ej2.syncfusion.com/angular/documentation/api/chart/labelIntersectAction) enum (default: 'Trim')

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService, LegendService, DataLabelService, MultiLevelLabelService, SelectionService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService,LegendService, DataLabelService, MultiLevelLabelService, SelectionService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='gold' name='Gold'></e-series>
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
             { country: "USA", gold: 50 },
             { country: "China", gold: 40 },
             { country: "Japan", gold: 70 },
             { country: "Australia", gold: 60 },
             { country: "France", gold: 50 },
             { country: "Germany", gold: 40 },
             { country: "Italy", gold: 40 },
             { country: "Sweden", gold: 30, silver: 25 }
        ];
        this.primaryXAxis = {
            valueType: 'Category',
            title: 'Countries',
            labelRotation: -45,  // Degrees (-90 to 90)
            labelIntersectAction: 'Rotate45'
        };
        this.primaryYAxis = {
            minimum: 0, maximum: 80,
            interval: 20, title: 'Medals'
        };
        this.title = 'Olympic Medals';
    }
}
```

**labelIntersectAction Options:** See [LabelIntersectAction](https://ej2.syncfusion.com/angular/documentation/api/chart/labelIntersectAction)
- `None`: No action (may overlap)
- `Hide`: Hide overlapping labels
- `Trim`: Truncate with ellipsis
- `Wrap`: Wrap to multiple lines
- `MultipleRows`: Place in multiple rows
- `Rotate45`: Rotate labels by 45 degrees when they intersect
- `Rotate90`: Rotate labels by 90 degrees when they intersect
- `Rotate45WithTrim`: Rotate intersecting labels by 45 degrees and trim text that exceeds the available label bounds
- `Rotate90WithTrim`: Rotate intersecting labels by 90 degrees and trim text that exceeds the available label bounds

Use `Rotate45WithTrim` or `Rotate90WithTrim` when rotation is required but long labels must also remain within the available axis-label area. Unlike `Rotate45` and `Rotate90`, these options apply trimming after rotation.


##### Complete sample for `Rotate45WithTrim`

The following standalone Angular sample uses long category names so the combined rotation and trimming behavior is visible. The axis first rotates intersecting labels by 45 degrees and then trims labels that exceed the available label bounds.

```ts
import { Component, OnInit } from '@angular/core';
import {
    CategoryService, ChartModule, ColumnSeriesService, DataLabelService, LegendService, TooltipService
} from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [ChartModule],
    providers: [CategoryService, ColumnSeriesService, DataLabelService, LegendService, TooltipService],
    standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="rotate45-with-trim-chart" [primaryXAxis]="primaryXAxis" [primaryYAxis]="primaryYAxis"
        [title]="title" [tooltip]="tooltip" [legendSettings]="legendSettings">
        <e-series-collection>
            <e-series [dataSource]="chartData" type="Column" xName="department" yName="revenue" name="Revenue"
                [marker]="marker">
            </e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public chartData?: Object[];
    public primaryXAxis?: Object;
    public primaryYAxis?: Object;
    public marker?: Object;
    public tooltip?: Object;
    public legendSettings?: Object;
    public title?: string;

    public ngOnInit(): void {
        this.chartData = [
            { department: 'Consumer Electronics and Accessories', revenue: 72 },
            { department: 'Home Furniture and Interior Products', revenue: 58 },
            { department: 'Sports Equipment and Outdoor Recreation', revenue: 64 },
            { department: 'Personal Care and Beauty Products', revenue: 49 },
            { department: 'Books, Education and Office Supplies', revenue: 55 },
            { department: 'Automotive Parts and Maintenance', revenue: 46 }
        ];
        this.primaryXAxis = {
            valueType: 'Category',
            title: 'Department',
            labelIntersectAction: 'Rotate45WithTrim',
            maximumLabelWidth: 90,
            majorGridLines: { width: 0 }
        };
        this.primaryYAxis = {
            title: 'Revenue (Millions)',
            minimum: 0,
            maximum: 80,
            interval: 20,
            labelFormat: '${value}M'
        };
        this.marker = { dataLabel: { visible: true, position: 'Top' } };
        this.tooltip = { enable: true, format: '${point.x}: ${point.y}M' };
        this.legendSettings = { visible: false };
        this.title = 'Department Revenue with 45-Degree Rotation and Trimming';
    }
}
```

##### Complete sample for `Rotate90WithTrim`

This standalone Angular sample uses the 90-degree variant. It is useful when category labels are especially dense and rotating them vertically provides more horizontal separation. Labels that still exceed their available bounds are trimmed.

```ts
import { Component, OnInit } from '@angular/core';
import {
    CategoryService, ChartModule, ColumnSeriesService, DataLabelService, LegendService, TooltipService
} from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [ChartModule],
    providers: [CategoryService, ColumnSeriesService, DataLabelService, LegendService, TooltipService],
    standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="rotate90-with-trim-chart" [primaryXAxis]="primaryXAxis" [primaryYAxis]="primaryYAxis"
        [title]="title" [tooltip]="tooltip" [legendSettings]="legendSettings">
        <e-series-collection>
            <e-series [dataSource]="chartData" type="Column" xName="product" yName="units" name="Units Sold"
                [marker]="marker">
            </e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public chartData?: Object[];
    public primaryXAxis?: Object;
    public primaryYAxis?: Object;
    public marker?: Object;
    public tooltip?: Object;
    public legendSettings?: Object;
    public title?: string;

    public ngOnInit(): void {
        this.chartData = [
            { product: 'Professional Wireless Noise-Cancelling Headphones', units: 42 },
            { product: 'Ultra-Wide High-Resolution Desktop Monitor', units: 36 },
            { product: 'Ergonomic Adjustable Standing Workstation Desk', units: 31 },
            { product: 'Smart Home Security and Monitoring System', units: 39 },
            { product: 'Portable High-Capacity Power Station', units: 28 },
            { product: 'Automatic Robotic Floor Cleaning System', units: 34 }
        ];
        this.primaryXAxis = {
            valueType: 'Category',
            title: 'Product',
            labelIntersectAction: 'Rotate90WithTrim',
            maximumLabelWidth: 100,
            majorGridLines: { width: 0 }
        };
        this.primaryYAxis = {
            title: 'Units Sold',
            minimum: 0,
            maximum: 50,
            interval: 10
        };
        this.marker = { dataLabel: { visible: true, position: 'Top' } };
        this.tooltip = { enable: true, format: '${point.x}: ${point.y} units' };
        this.legendSettings = { visible: false };
        this.title = 'Product Sales with 90-Degree Rotation and Trimming';
    }
}
```



#### Axis label intersection configuration

`labelIntersectAction` belongs directly on the axis configuration. It controls collisions between axis labels and is not the same as data-label collision handling.

```ts
public primaryXAxis: Object = {
    valueType: 'Category',
    labelIntersectAction: 'Rotate45WithTrim',
    maximumLabelWidth: 90
};
```

Use the actions as follows:

- `None`: Leaves labels unchanged, even when they overlap.
- `Hide`: Hides labels that collide with previously rendered labels.
- `Trim`: Trims intersecting labels and displays an ellipsis.
- `Wrap`: Wraps intersecting labels into multiple lines.
- `MultipleRows`: Moves colliding horizontal-axis labels into additional rows.
- `Rotate45`: Rotates intersecting labels by 45 degrees.
- `Rotate90`: Rotates intersecting labels by 90 degrees.
- `Rotate45WithTrim`: Rotates labels by 45 degrees and trims text that exceeds the available label width.
- `Rotate90WithTrim`: Rotates labels by 90 degrees and trims text that exceeds the available label width.

Use `maximumLabelWidth` with trim or wrap actions when the label area must remain predictable. Use `labelRotation` only when a fixed angle must be applied regardless of whether labels intersect.

The setting must not be nested under a `label` object:

```ts
// Incorrect
public primaryXAxis: Object = {
    label: {
        labelIntersectAction: 'Rotate45WithTrim'
    }
};
```

For Angular, axis intersection does not require a separate intersection service. Provide `ChartModule`, the rendered series service, and the service required by the axis value type, such as `CategoryService`, `DateTimeService`, `DateTimeCategoryService`, or `LogarithmicService`.



### Label Styling

**API Property:** [labelStyle](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#labelStyle) - [FontModel](https://ej2.syncfusion.com/angular/documentation/api/chart/fontModel)

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService, LegendService, DataLabelService, MultiLevelLabelService, SelectionService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService,LegendService, DataLabelService, MultiLevelLabelService, SelectionService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='gold' name='Gold'></e-series>
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
             { country: "USA", gold: 50 },
             { country: "China", gold: 40 },
             { country: "Japan", gold: 70 },
             { country: "Australia", gold: 60 },
             { country: "France", gold: 50 },
             { country: "Germany", gold: 40 },
             { country: "Italy", gold: 40 },
             { country: "Sweden", gold: 30, silver: 25 }
        ];
        this.primaryXAxis = {
            valueType: 'Category',
            title: 'Countries',
            labelStyle: {
              fontFamily: 'Arial',
              size: '14px',
              fontWeight: 'Bold',
              color: '#333'
            }
        };
        this.primaryYAxis = {
            minimum: 0, maximum: 80,
            interval: 20, title: 'Medals'
        };
        this.title = 'Olympic Medals';
    }
}
```

### Label Placement

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService, LegendService, DataLabelService, MultiLevelLabelService, SelectionService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService,LegendService, DataLabelService, MultiLevelLabelService, SelectionService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='gold' name='Gold'></e-series>
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
             { country: "USA", gold: 50 },
             { country: "China", gold: 40 },
             { country: "Japan", gold: 70 },
             { country: "Australia", gold: 60 },
             { country: "France", gold: 50 },
             { country: "Germany", gold: 40 },
             { country: "Italy", gold: 40 },
             { country: "Sweden", gold: 30, silver: 25 }
        ];
        this.primaryXAxis = {
            valueType: 'Category',
            title: 'Countries',
            labelPlacement: 'OnTicks',  // BetweenTicks or OnTicks
            labelPosition: 'Outside',  // Inside or Outside
        };
        this.primaryYAxis = {
            minimum: 0, maximum: 80,
            interval: 20, title: 'Medals'
        };
        this.title = 'Olympic Medals';
    }
}
```

### Multilevel Labels

Group categories hierarchically.

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService, LegendService, DataLabelService, MultiLevelLabelService, SelectionService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService,LegendService, DataLabelService, MultiLevelLabelService, SelectionService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='gold' name='Gold'></e-series>
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
             { country: "USA", gold: 50 },
             { country: "China", gold: 40 },
             { country: "Japan", gold: 70 },
             { country: "Australia", gold: 60 },
             { country: "France", gold: 50 },
             { country: "Germany", gold: 40 },
             { country: "Italy", gold: 40 },
             { country: "Sweden", gold: 30, silver: 25 }
        ];
        this.primaryXAxis = {
            valueType: 'Category',
            title: 'Countries',
            multiLevelLabels: [
            {
              border: { type: 'Rectangle', color: '#333' },
              categories: [
                { start: 0, end: 2, text: 'Q1' },
                { start: 3, end: 5, text: 'Q2' },
                { start: 6, end: 8, text: 'Q3' },
                { start: 9, end: 11, text: 'Q4' }
              ]
            },
            {
              border: { type: 'Brace', color: '#666' },
              categories: [
                { start: 0, end: 5, text: 'H1' },
                { start: 6, end: 11, text: 'H2' }
              ]
            }
          ]
        };
        this.primaryYAxis = {
            minimum: 0, maximum: 80,
            interval: 20, title: 'Medals'
        };
        this.title = 'Olympic Medals';
    }
}
```

**Border Types:**
- `Rectangle`, `Brace`, `WithoutBorder`, `WithoutTopBorder`, `WithoutTopandBottomBorder`, `CurlyBrace`

### Custom Label Template

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService, LegendService, DataLabelService, MultiLevelLabelService, SelectionService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService,LegendService, DataLabelService, MultiLevelLabelService, SelectionService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
      <ng-template #axisLabelTemplate let-data>
        <div style="background: #f0f0f0; padding: 2px 5px; border-radius: 3px;">
          {{data.value}}
        </div>
      </ng-template>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='gold' name='Gold'></e-series>
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
             { country: "USA", gold: 50 },
             { country: "China", gold: 40 },
             { country: "Japan", gold: 70 },
             { country: "Australia", gold: 60 },
             { country: "France", gold: 50 },
             { country: "Germany", gold: 40 },
             { country: "Italy", gold: 40 },
             { country: "Sweden", gold: 30, silver: 25 }
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

## Gridlines and Tick Lines

Customize gridlines and tick marks for better readability.

### Major Gridlines

```typescript
public primaryYAxis = {
  majorGridLines: {
    width: 1,
    color: '#e0e0e0',
    dashArray: '5,5'  // Dashed line pattern
  }
};
```

**Example**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService, LegendService, DataLabelService, MultiLevelLabelService, SelectionService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { tickData } from './datasource';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService,LegendService, DataLabelService, MultiLevelLabelService, SelectionService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='x' yName='y' name='Sales'></e-series>
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
            { x: 'Jan', y: 60 }, { x: 'Feb', y: 50 }, { x: 'Mar', y: 64 },
            { x: 'Apr', y: 63 }, { x: 'May', y: 81 }, { x: 'Jun', y: 64 },
            { x: 'Jul', y: 82 }, { x: 'Aug', y: 96 }, { x: 'Sep', y: 78 },
            { x: 'Oct', y: 60 }, { x: 'Nov', y: 58 }, { x: 'Dec', y: 56 }
    ];
        this.primaryXAxis = {
            valueType: 'Category',
            majorGridLines : {
               color : 'blue',
               width : 1
            },
            minorGridLines : {
               color : 'red',
               width : 0
            }
        };
        this.primaryYAxis = {
           title: 'Temperature (Fahrenheit)',
           majorGridLines : {
              color : 'blue',
              width : 1
           },
           minorGridLines : {
              color : 'red',
              width : 0
           }
        };
        this.title = 'Temperature flow over months';
    }
}
```

### Minor Gridlines

```typescript
public primaryYAxis = {
  minorGridLines: {
    width: 1,
    color: '#f0f0f0'
  },
  minorTicksPerInterval: 4  // Number of minor ticks between major ticks
};
```

**Example**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService, LegendService, DataLabelService, MultiLevelLabelService, SelectionService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { tickData } from './datasource';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService,LegendService, DataLabelService, MultiLevelLabelService, SelectionService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='x' yName='y' name='Sales'></e-series>
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
            { x: 'Jan', y: 60 }, { x: 'Feb', y: 50 }, { x: 'Mar', y: 64 },
            { x: 'Apr', y: 63 }, { x: 'May', y: 81 }, { x: 'Jun', y: 64 },
            { x: 'Jul', y: 82 }, { x: 'Aug', y: 96 }, { x: 'Sep', y: 78 },
            { x: 'Oct', y: 60 }, { x: 'Nov', y: 58 }, { x: 'Dec', y: 56 }
    ];
        this.primaryXAxis = {
            valueType: 'Category',
            majorGridLines : {
               color : 'blue',
               width : 1
            },
            minorGridLines : {
               color : 'red',
               width : 0
            }
        };
        this.primaryYAxis = {
           title: 'Temperature (Fahrenheit)',
           majorGridLines : {
              color : 'blue',
              width : 1
           },
           minorGridLines : {
              color : 'red',
              width : 0
           }
        };
        this.title = 'Temperature flow over months';
    }
}
```

### Tick Lines

```typescript
public primaryYAxis = {
  majorTickLines: {
    width: 2,
    height: 10,
    color: '#333'
  },
  minorTickLines: {
    width: 1,
    height: 5,
    color: '#666'
  }
};
```

**Example**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService, LegendService, DataLabelService, MultiLevelLabelService, SelectionService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { tickData } from './datasource';
@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService,LegendService, DataLabelService, MultiLevelLabelService, SelectionService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='x' yName='y' name='Sales'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    ngOnInit(): void {
        this.chartData = tickData;
        this.primaryXAxis = {
            valueType: 'Category',
            majorTickLines : {
               color : 'blue',
               width : 5
            },
            minorTickLines : {
               color : 'red',
               width : 0
            }
        };
        this.primaryYAxis = {
           title: 'Temperature (Fahrenheit)',
           majorTickLines : {
              color : 'blue',
              width : 5
           },
           minorTickLines : {
              color : 'red',
              width : 0
           }
        };
        this.title = 'Temperature flow over months';
    }

}
```

### Hide Gridlines

```typescript
public primaryYAxis = {
  majorGridLines: { width: 0 },  // Hide major gridlines
  majorTickLines: { width: 0 }   // Hide tick lines
};
```

**Example**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService, LegendService, DataLabelService, MultiLevelLabelService, SelectionService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { tickData } from './datasource';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService,LegendService, DataLabelService, MultiLevelLabelService, SelectionService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='x' yName='y' name='Sales'></e-series>
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
            { x: 'Jan', y: 60 }, { x: 'Feb', y: 50 }, { x: 'Mar', y: 64 },
            { x: 'Apr', y: 63 }, { x: 'May', y: 81 }, { x: 'Jun', y: 64 },
            { x: 'Jul', y: 82 }, { x: 'Aug', y: 96 }, { x: 'Sep', y: 78 },
            { x: 'Oct', y: 60 }, { x: 'Nov', y: 58 }, { x: 'Dec', y: 56 }
    ];
        this.primaryXAxis = {
            valueType: 'Category',
            majorGridLines: { width: 0 },  // Hide major gridlines
            majorTickLines: { width: 0 }   // Hide tick lines
        };
        this.primaryYAxis = {
           title: 'Temperature (Fahrenheit)',
           majorGridLines: { width: 0 },  // Hide major gridlines
          majorTickLines: { width: 0 }   // Hide tick lines
        };
        this.title = 'Temperature flow over months';
    }
}
```


## Axis Crossing and Inversion

### Axis Crossing

Move axis origin to any value within the chart.

```typescript
public primaryXAxis = {
  crossesAt: 0  // Y-axis crosses X-axis at 0
};

public primaryYAxis = {
  crossesAt: 5  // X-axis crosses Y-axis at 5
};
```

**Example**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService, LegendService, DataLabelService, MultiLevelLabelService, SelectionService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { categoryData } from './datasource';
@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService,LegendService, DataLabelService, MultiLevelLabelService, SelectionService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='gold' name='Gold' ></e-series>
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
           crossesAt : 15
        };
        this.primaryYAxis = {
          crossesAt : 5
        };
        this.title = 'Olympic Medals';
    }

}
```

**Use Cases:**
- Zero-centered charts
- Positive/negative data visualization
- Custom axis positioning

### Inversed Axis

Reverse axis direction (high to low).

```typescript
public primaryYAxis = {
  isInversed: true  // Invert Y-axis (top to bottom)
};
```

**Example**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService, LegendService, DataLabelService, MultiLevelLabelService, SelectionService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { inverseData } from './datasource';
@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService,LegendService, DataLabelService, MultiLevelLabelService, SelectionService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [title]='title' [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis'
         [legendSettings]='legend'>
            <e-series-collection>
                <e-series [dataSource]='data' type='Column' xName='x' yName='y' name='Years' [marker]='marker'>
                </e-series>
           </e-series-collection>
       </ejs-chart>`
       })

 export class AppComponent {
    public primaryXAxis?: Object;
    public primaryYAxis?: Object;
    public data?: Object[];
    public title?: string
    public legend: any;
    public marker: any;

    ngOnInit(): void {
    this.primaryYAxis = {
        isInversed: true
    };
    this.data= inverseData;
    this.title= 'Exchange Rate';
    }
}
```

**Use Cases:**
- Rankings (1st place at top)
- Depth measurements
- Unconventional data presentation

### Opposed Position

Place axis on opposite side.

```typescript
public primaryYAxis = {
  opposedPosition: true  // Place Y-axis on right side
};
```

**Example**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService, LegendService, DataLabelService, MultiLevelLabelService, SelectionService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { tickData } from './datasource';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService,LegendService, DataLabelService, MultiLevelLabelService, SelectionService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='x' yName='y' name='Sales'></e-series>
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
                { x: 'Jan', y: 60 }, { x: 'Feb', y: 50 }, { x: 'Mar', y: 64 },
                { x: 'Apr', y: 63 }, { x: 'May', y: 81 }, { x: 'Jun', y: 64 },
                { x: 'Jul', y: 82 }, { x: 'Aug', y: 96 }, { x: 'Sep', y: 78 },
                { x: 'Oct', y: 60 }, { x: 'Nov', y: 58 }, { x: 'Dec', y: 56 }
        ];
        this.primaryXAxis = {
            valueType: 'Category'
        };
        this.primaryYAxis = {
           title: 'Temperature (Fahrenheit)',
           opposedPosition: true
        };
        this.title = 'Temperature flow over months';
    }

}
```

## Multiple Panes

Split chart area into multiple horizontal sections.

### Row Configuration

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, ColumnSeriesService, LineSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, ColumnSeriesService, LineSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-axes>
            <e-axis rowIndex=1 name='yAxis1' opposedPosition='true' title='Temperature (Celsius)' [majorGridLines]='majorGridLines' labelFormat='{value}°C'
                   [minimum]='24' [maximum]='36' [interval]='2' [lineStyle]='lineStyle'>
            </e-axis>
        </e-axes>
        <e-rows>
             <e-row height=50%></e-row>
             <e-row height=50%></e-row>
        </e-rows>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='x' yName='y' name='Germany'></e-series>
            <e-series [dataSource]='chartData' type='Line' xName='x' yName='y1' name='Japan' yAxisName='yAxis1' [marker]='marker'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public majorGridLines?: Object;
    public primaryYAxis?: Object;
    public lineStyle?: Object;
    public marker?: Object;
    public rows?: Object;
    ngOnInit(): void {
        this.chartData = [
                { x: 'Jan', y: 15, y1: 33 }, { x: 'Feb', y: 20, y1: 31 }, { x: 'Mar', y: 35, y1: 30 },
                { x: 'Apr', y: 40, y1: 28 }, { x: 'May', y: 80, y1: 29 }, { x: 'Jun', y: 70, y1: 30 },
                { x: 'Jul', y: 65, y1: 33 }, { x: 'Aug', y: 55, y1: 32 }, { x: 'Sep', y: 50, y1: 34 },
                { x: 'Oct', y: 30, y1: 32 }, { x: 'Nov', y: 35, y1: 32 }, { x: 'Dec', y: 35, y1: 31 }
        ];
        this.primaryXAxis = {
            title: 'Months',
            valueType: 'Category',
            interval: 1
        };
        this.primaryYAxis = {
            minimum: 0, maximum: 90, interval: 20,
            lineStyle: { width: 0 },
            title: 'Temperature (Fahrenheit)',
            labelFormat: '{value}°F'
        };
        this.majorGridLines = { width: 0};
        this.lineStyle = { width: 0};
        this.marker = {
            visible: true, width: 10, height: 10, border: { width: 2, color: '#F8AB1D' }
        }
        this.title = 'Weather Condition';
    }

}
```

### Column Configuration

Split vertically:

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, ColumnSeriesService, LineSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, ColumnSeriesService, LineSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-axes>
            <e-axis columnIndex=1 name='xAxis1' opposedPosition='true' [majorGridLines]='majorGridLines'
                  valueType='Category' [lineStyle]='lineStyle'>
            </e-axis>
        </e-axes>
        <e-columns>
             <e-column width=50%></e-column>
             <e-column width=50%></e-column>
        </e-columns>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='x' yName='y' name='Germany'></e-series>
            <e-series [dataSource]='chartData' type='Line' xName='x' yName='y1' name='Japan' xAxisName='xAxis1' [marker]='marker'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public majorGridLines?: Object;
    public primaryYAxis?: Object;
    public lineStyle?: Object;
    public marker?: Object;
    public rows?: Object;
    ngOnInit(): void {
        this.chartData = [
                { x: 'Jan', y: 15, y1: 33 }, { x: 'Feb', y: 20, y1: 31 }, { x: 'Mar', y: 35, y1: 30 },
                { x: 'Apr', y: 40, y1: 28 }, { x: 'May', y: 80, y1: 29 }, { x: 'Jun', y: 70, y1: 30 },
                { x: 'Jul', y: 65, y1: 33 }, { x: 'Aug', y: 55, y1: 32 }, { x: 'Sep', y: 50, y1: 34 },
                { x: 'Oct', y: 30, y1: 32 }, { x: 'Nov', y: 35, y1: 32 }, { x: 'Dec', y: 35, y1: 31 }
        ];
        this.primaryXAxis = {
            title: 'Months',
            valueType: 'Category',
            interval: 1
        };
        this.primaryYAxis = {
            minimum: 0, maximum: 90, interval: 20,
            lineStyle: { width: 0 },
            title: 'Temperature (Fahrenheit)',
            labelFormat: '{value}°F'
        };
        this.majorGridLines = { width: 0};
        this.lineStyle = { width: 0};
        this.marker = {
            visible: true, width: 10, height: 10, border: { width: 2, color: '#F8AB1D' }
        }
        this.title = 'Weather Condition';
    }

}
```

### Grid Layout (Rows + Columns)

```typescript
public rows = [
  { height: '50%' },
  { height: '50%' }
];

public columns = [
  { width: '50%' },
  { width: '50%' }
];

public axes = [
  { name: 'yAxis1', rowIndex: 0, columnIndex: 0 },
  { name: 'yAxis2', rowIndex: 0, columnIndex: 1 },
  { name: 'yAxis3', rowIndex: 1, columnIndex: 0 },
  { name: 'yAxis4', rowIndex: 1, columnIndex: 1 }
];
```

**Example**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, ColumnSeriesService, LineSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, ColumnSeriesService, LineSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-axes>
            <e-axis columnIndex=1 name='xAxis1' opposedPosition='true' [majorGridLines]='majorGridLines'
                  valueType='Category' [lineStyle]='lineStyle'>
            </e-axis>
        </e-axes>
        <e-rows>
             <e-row height=50%></e-row>
             <e-row height=50%></e-row>
        </e-rows>
        <e-columns>
             <e-column width=50%></e-column>
             <e-column width=50%></e-column>
        </e-columns>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='x' yName='y' name='Germany'></e-series>
            <e-series [dataSource]='chartData' type='Line' xName='x' yName='y1' xAxisName='xAxis1' name='Japan' [marker]='marker'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public majorGridLines?: Object;
    public primaryYAxis?: Object;
    public lineStyle?: Object;
    public marker?: Object;
    public rows?: Object;
    ngOnInit(): void {
        this.chartData = [
                { x: 'Jan', y: 15, y1: 33 }, { x: 'Feb', y: 20, y1: 31 }, { x: 'Mar', y: 35, y1: 30 },
                { x: 'Apr', y: 40, y1: 28 }, { x: 'May', y: 80, y1: 29 }, { x: 'Jun', y: 70, y1: 30 },
                { x: 'Jul', y: 65, y1: 33 }, { x: 'Aug', y: 55, y1: 32 }, { x: 'Sep', y: 50, y1: 34 },
                { x: 'Oct', y: 30, y1: 32 }, { x: 'Nov', y: 35, y1: 32 }, { x: 'Dec', y: 35, y1: 31 }
        ];
        this.primaryXAxis = {
            title: 'Months',
            valueType: 'Category',
            interval: 1,
            span: 2
        };
        this.primaryYAxis = {
            minimum: 0, maximum: 90, interval: 20,
            lineStyle: { width: 0 },
            title: 'Temperature (Fahrenheit)',
            labelFormat: '{value}°F'
        };
        this.majorGridLines = { width: 0};
        this.lineStyle = { width: 0};
        this.marker = {
            visible: true, width: 10, height: 10, border: { width: 2, color: '#F8AB1D' }
        }
        this.title = 'Weather Condition';
    }

}
```

### Axis Scrollbar Settings and Zoom Behavior

#### Required Angular services and configuration placement

Use `ScrollBarService` for the Chart scrollbar and `ZoomService` when scrolling participates in zooming or panning. Also provide the rendered series service and the service required by the axis value type.

```ts
import {
    CategoryService, ChartModule, LineSeriesService, ScrollBarService, ZoomService
} from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [ChartModule],
    providers: [CategoryService, LineSeriesService, ScrollBarService, ZoomService],
    standalone: true
})
```

There are two related configuration locations:

- `zoomSettings.enableScrollbar` enables the standard scrollbar that follows the Chart zoom state.
- `axis.scrollbarSettings` configures axis-specific appearance, placement, lazy-load range, and zoom behavior.

```ts
public zoomSettings: Object = {
    enableScrollbar: true,
    enableSelectionZooming: true,
    enableMouseWheelZooming: true,
    enablePan: true,
    mode: 'X'
};

public primaryXAxis: Object = {
    valueType: 'Category',
    zoomFactor: 0.5,
    zoomPosition: 0,
    scrollbarSettings: {
        enable: true,
        height: 16,
        enableZoom: true,
        position: 'PlaceNextToAxisLine',
        scrollbarRadius: 4,
        trackRadius: 4,
        scrollbarColor: '#6B7280',
        trackColor: '#E5E7EB',
        gripColor: '#FFFFFF'
    }
};
```

Use the scrollbar properties as follows:

- `enable`: Enables an axis scrollbar for lazy-loading workflows.
- `pointsLength`: Defines the complete logical point count for numeric or logarithmic lazy loading.
- `range`: Defines the complete minimum and maximum DateTime range.
- `height`: Sets scrollbar thickness. Use `12` or greater when the grip-circle visual and grab cursor are required.
- `enableZoom`: Enables thumb resizing, arrows, and scrollbar wheel zoom. Set it to `false` for pan-only behavior.
- `position`: Use `Top` or `Bottom` for horizontal axes, `Left` or `Right` for vertical axes, or `PlaceNextToAxisLine` for axis-relative placement.
- `scrollbarColor`, `trackColor`, and `gripColor`: Configure thumb, track, and grip colors.
- `scrollbarRadius` and `trackRadius`: Configure thumb and track corner radii.

For DateTime lazy loading, use `range`:

```ts
public primaryXAxis: Object = {
    valueType: 'DateTime',
    minimum: new Date(2025, 0, 1),
    maximum: new Date(2025, 2, 31),
    scrollbarSettings: {
        enable: true,
        range: {
            minimum: new Date(2024, 0, 1),
            maximum: new Date(2026, 11, 31)
        },
        enableZoom: true,
        height: 16
    }
};
```

For numeric or logarithmic lazy loading, use `pointsLength`:

```ts
public primaryXAxis: Object = {
    minimum: 0,
    maximum: 100,
    scrollbarSettings: {
        enable: true,
        pointsLength: 1000,
        enableZoom: false,
        height: 16
    }
};
```

Use `scrollStart` for interaction start, `scrollChanged` for continuous range changes, and `scrollEnd` to request or apply lazy-loaded data after the final range is known.


Axis scrollbars support styling, positioning, lazy-load ranges, grip interaction, and optional zooming through `ScrollbarSettings`.

```ts
import { Component } from '@angular/core';
// Import Chart module, components, and the necessary ScrollBar/Zoom services
import { ChartModule, ScrollBarService, ZoomService } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [ChartModule],
  providers: [ScrollBarService, ZoomService], // <-- Inject them here
  template: `
    <ejs-chart [primaryXAxis]="primaryXAxis"  [zoomSettings]="zoomSettings">
      <!-- series collections -->
    </ejs-chart>
  `
})
export class ChartComponent {
  // 1. Enable scrollbar via ZoomSettings
  public zoomSettings: Object = {
    enableScrollbar: true, 
    enableSelectionZooming: true 
  };
  public primaryXAxis: Object = {
    scrollbarSettings: {
      enable: true,
      height: 16,
      enableZoom: true,
      position: 'PlaceNextToAxisLine',
      scrollbarRadius: 4,
      trackRadius: 4,
      scrollbarColor: '#6B7280',
      trackColor: '#E5E7EB',
      gripColor: '#FFFFFF'
    }
  };

}


```

**Scrollbar settings:**
- `enable`: Enables the axis scrollbar for lazy loading.
- `pointsLength`: Defines the number of points used for numeric and logarithmic lazy-load ranges.
- `range`: Defines `minimum` and `maximum` for DateTime lazy-load ranges.
- `trackColor`: Sets the track fill.
- `scrollbarColor`: Sets the thumb fill.
- `scrollbarRadius`: Sets the thumb corner radius.
- `trackRadius`: Sets the track corner radius.
- `gripColor`: Sets the thumb grip-circle color.
- `height`: Sets scrollbar thickness. A height of 12 or greater enables the grip-circle visual and grab/grabbing cursors.
- `enableZoom`: Defaults to `true`. When enabled, resize circles and arrows support thumb resizing, and the mouse wheel zooms over the scrollbar. When disabled, the scrollbar is pan-only, resize handles are hidden, and scrollbar wheel zoom is ignored.
- `position`: Supports `Top` and `Bottom` for horizontal axes, `Left` and `Right` for vertical axes, and the default `PlaceNextToAxisLine` placement.

**Scrollbar events:**
- `scrollStart`: Fires once when a scrollbar gesture starts.
- `scrollChanged`: Fires continuously while the thumb is dragged.
- `scrollEnd`: In lazy-load workflows, fires when a track click or wheel interaction resolves to a changed data range.

Horizontal scrollbar zoom-position calculations are RTL-aware. With `enableZoom: true`, wheel zoom uses the pointer position as the zoom origin.

## Chart Title and Subtitle

### Title Configuration

```typescript
public title = 'Monthly Sales Analysis';

public titleStyle = {
  fontFamily: 'Arial',
  size: '20px',
  fontWeight: 'Bold',
  color: '#333',
  textAlignment: 'Center',  // Near, Center, Far
  textOverflow: 'Wrap'  // Wrap, Trim, None
};
```

```html
<ejs-chart [title]="title" [titleStyle]="titleStyle">
  <!-- series -->
</ejs-chart>
```

**Example**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateTimeService, StepLineSeriesService, LegendService, CategoryService, LineSeriesService } from '@syncfusion/ej2-angular-charts'
import { TooltipService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [
         ChartModule
    ],

providers: [ TooltipService, DateTimeService, StepLineSeriesService, LegendService, CategoryService, LineSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title' [titleStyle]='titleStyle'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='StepLine' xName='x' yName='y' width=2 name='China' [marker]='marker'></e-series>
            <e-series [dataSource]='chartData' type='StepLine' xName='x' yName='y1' width=2 name='Australia' [marker]='marker'></e-series>
            <e-series [dataSource]='chartData' type='StepLine' xName='x' yName='y2' width=2 name='Japan' [marker]='marker'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    public marker?: Object;
    public titleStyle?: Object;
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
            title: 'Years',
            lineStyle: { width: 0 },
            labelFormat: 'y',
            intervalType: 'Years',
            valueType: 'DateTime',
            edgeLabelPlacement: 'Shift'
        };
        this.primaryYAxis = {
            title: 'Percentage (%)',
            minimum: 0, maximum: 20, interval: 2,
            labelFormat: '{value}%'
        };
        this.marker = { visible: true, width: 10, height: 10 };
        this.title = 'Unemployment Rates 1975-2010';
        this.titleStyle = {
            fontFamily: "Arial",
            fontStyle: 'italic',
            fontWeight: 'regular',
            color: "#E27F2D",
            size: '23px'
        }
    }

}
```

### Subtitle

```typescript
public subTitle = 'January - December 2024';

public subTitleStyle = {
  size: '14px',
  color: '#666',
  textAlignment: 'Center'
};
```

```html
<ejs-chart [title]="title" [subTitle]="subTitle" 
           [titleStyle]="titleStyle" [subTitleStyle]="subTitleStyle">
  <!-- series -->
</ejs-chart>
```

**Example**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateTimeService, StepLineSeriesService, LegendService, CategoryService, LineSeriesService } from '@syncfusion/ej2-angular-charts'
import { TooltipService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [
         ChartModule
    ],

providers: [ TooltipService, DateTimeService, StepLineSeriesService, LegendService, CategoryService, LineSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title' [subTitle]='subTitle' [subTitleStyle]='subTitleStyle'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='StepLine' xName='x' yName='y' width=2 name='China' [marker]='marker'></e-series>
            <e-series [dataSource]='chartData' type='StepLine' xName='x' yName='y1' width=2 name='Australia' [marker]='marker'></e-series>
            <e-series [dataSource]='chartData' type='StepLine' xName='x' yName='y2' width=2 name='Japan' [marker]='marker'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public subTitle?: string;
    public primaryYAxis?: Object;
    public marker?: Object;
    public subTitleStyle?: Object;
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
            title: 'Years',
            lineStyle: { width: 0 },
            labelFormat: 'y',
            intervalType: 'Years',
            valueType: 'DateTime',
            edgeLabelPlacement: 'Shift'
        };
        this.primaryYAxis = {
            title: 'Percentage (%)',
            minimum: 0, maximum: 20, interval: 2,
            labelFormat: '{value}%'
        };
        this.marker = { visible: true, width: 10, height: 10 };
        this.title = 'Unemployment Rates 1975-2010';
        this.subTitle = '(1975-2010)';
        this.subTitleStyle = {
            fontFamily: "Arial",
            fontStyle: 'italic',
            fontWeight: 'regular',
            color: "#E27F2D",
            size: '20px'
        }
    }

}
```

### Title Position

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateTimeService, StepLineSeriesService, LegendService, CategoryService, LineSeriesService } from '@syncfusion/ej2-angular-charts'
import { TooltipService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [
         ChartModule
    ],

providers: [ TooltipService, DateTimeService, StepLineSeriesService, LegendService, CategoryService, LineSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title' [titleStyle]='titleStyle'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='StepLine' xName='x' yName='y' width=2 name='China' [marker]='marker'></e-series>
            <e-series [dataSource]='chartData' type='StepLine' xName='x' yName='y1' width=2 name='Australia' [marker]='marker'></e-series>
            <e-series [dataSource]='chartData' type='StepLine' xName='x' yName='y2' width=2 name='Japan' [marker]='marker'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    public marker?: Object;
    public titleStyle?: Object;
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
            title: 'Years',
            lineStyle: { width: 0 },
            labelFormat: 'y',
            intervalType: 'Years',
            valueType: 'DateTime',
            edgeLabelPlacement: 'Shift'
        };
        this.primaryYAxis = {
            title: 'Percentage (%)',
            minimum: 0, maximum: 20, interval: 2,
            labelFormat: '{value}%'
        };
        this.marker = { visible: true, width: 10, height: 10 };
        this.title = 'Unemployment Rates 1975-2010';
        this.titleStyle = {
            position: 'Bottom'
        }
    }

}
```

## Chart Dimensions

### Fixed Dimensions

```html
<ejs-chart width="800px" height="400px">
  <!-- series -->
</ejs-chart>
```

**Example**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, LineSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, LineSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' width='650' height='350'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Line' xName='month' yName='sales' name='Sales'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    ngOnInit(): void {
        this.chartData = [
            { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 },
            { month: 'Mar', sales: 34 }, { month: 'Apr', sales: 32 },
            { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
            { month: 'Jul', sales: 35 }, { month: 'Aug', sales: 55 },
            { month: 'Sep', sales: 38 }, { month: 'Oct', sales: 30 },
            { month: 'Nov', sales: 25 }, { month: 'Dec', sales: 32 }
        ];
        this.primaryXAxis = {
            valueType: 'Category'
        };
    }

}
```

### Responsive Dimensions

```html
<ejs-chart width="100%" height="450px">
  <!-- series -->
</ejs-chart>
```

**Example**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, LineSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, LineSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' width='80%' height='450px'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Line' xName='month' yName='sales' name='Sales'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    ngOnInit(): void {
        this.chartData = [
            { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 },
            { month: 'Mar', sales: 34 }, { month: 'Apr', sales: 32 },
            { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
            { month: 'Jul', sales: 35 }, { month: 'Aug', sales: 55 },
            { month: 'Sep', sales: 38 }, { month: 'Oct', sales: 30 },
            { month: 'Nov', sales: 25 }, { month: 'Dec', sales: 32 }
        ];
        this.primaryXAxis = {
            valueType: 'Category'
        };
    }

}
```

### Container-based Sizing

```html
<div style="width: 1200px; height: 600px;">
  <ejs-chart width="100%" height="100%">
    <!-- series -->
  </ejs-chart>
</div>
```

**Example**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, LineSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, LineSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<div style="width:650px; height:350px;">
        <ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'>
            <e-series-collection>
                <e-series [dataSource]='chartData' type='Line' xName='month' yName='sales' name='Sales'></e-series>
            </e-series-collection>
        </ejs-chart>
    </div>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    ngOnInit(): void {
        this.chartData = [
            { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 },
            { month: 'Mar', sales: 34 }, { month: 'Apr', sales: 32 },
            { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
            { month: 'Jul', sales: 35 }, { month: 'Aug', sales: 55 },
            { month: 'Sep', sales: 38 }, { month: 'Oct', sales: 30 },
            { month: 'Nov', sales: 25 }, { month: 'Dec', sales: 32 }
        ];
        this.primaryXAxis = {
            valueType: 'Category'
        };
    }

}
```

### Aspect Ratio

For responsive designs maintaining proportions:

```css
.chart-container {
  position: relative;
  width: 100%;
  padding-bottom: 50%; /* 2:1 aspect ratio */
}

.chart-container ejs-chart {
  position: absolute;
  width: 100%;
  height: 100%;
}
```

## Margins and Padding

### Chart Margin

Space outside chart area.

```typescript
public margin = {
  left: 40,
  right: 40,
  top: 40,
  bottom: 40
};
```

```html
<ejs-chart [margin]="margin">
  <!-- series -->
</ejs-chart>
```

**Example**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateFormatOptions } from '@syncfusion/ej2-base'
import { CategoryService, DateTimeService, ScrollBarService, ColumnSeriesService, LineSeriesService,
    ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService,LegendService, TooltipService
 } from '@syncfusion/ej2-angular-charts'


import { Component, OnInit } from '@angular/core';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, DateTimeService, ScrollBarService, LineSeriesService, ColumnSeriesService,
        ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService,],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title' background='skyblue' [border]='border' [margin]='margin'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='gold' name='Gold'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    public border?: Object;
    public margin?: Object;
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
        this.primaryYAxis = {
            minimum: 0, maximum: 80,
            interval: 20, title: 'Medals'
        };
        this.title = 'Olympic Medals';
        this.border = { width: 2, color: '#FF0000'};
        this.margin = { left: 40, right: 40, top: 40, bottom: 40 };
    }

}
```

### Chart Border

```typescript
public border = {
  width: 2,
  color: '#333'
};

public background = 'white';
```

```html
<ejs-chart [border]="border" [background]="background">
  <!-- series -->
</ejs-chart>
```

**Example**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateFormatOptions } from '@syncfusion/ej2-base'
import { CategoryService, DateTimeService, ScrollBarService, ColumnSeriesService, LineSeriesService,
    ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService,LegendService, TooltipService
 } from '@syncfusion/ej2-angular-charts'


import { Component, OnInit } from '@angular/core';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, DateTimeService, ScrollBarService, LineSeriesService, ColumnSeriesService,
        ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService,],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title' background='skyblue' [border]='border'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='gold' name='Gold'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    public border?: Object;
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
        this.primaryYAxis = {
            minimum: 0, maximum: 80,
            interval: 20, title: 'Medals'
        };
        this.title = 'Olympic Medals';
        this.border = { width: 2, color: '#FF0000'};
    }

}
```

### Chart Area Border

Border around plot area only (excluding axes, titles).

```typescript
public chartArea = {
  border: {
    width: 2,
    color: '#e0e0e0'
  },
  background: '#f9f9f9'
};
```

```html
<ejs-chart [chartArea]="chartArea">
  <!-- series -->
</ejs-chart>
```

**Example**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateFormatOptions } from '@syncfusion/ej2-base'
import { CategoryService, DateTimeService, ScrollBarService, ColumnSeriesService, LineSeriesService,
    ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService,LegendService, TooltipService
 } from '@syncfusion/ej2-angular-charts'


import { Component, OnInit } from '@angular/core';
import { IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, DateTimeService, ScrollBarService, LineSeriesService, ColumnSeriesService,
        ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService,],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'[chartArea]='chartArea'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='gold' name='Gold' [border]='border'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    public border?: Object;
    public chartArea?: Object;
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
        this.primaryYAxis = {
            minimum: 0, maximum: 80,
            interval: 20, title: 'Medals'
        };
        this.title = 'Olympic Medals';
        this.border = { width: 2, color: 'grey'};
        this.chartArea = { background: 'skyblue', width: '80%'};
    }

}
```


## Best Practices

### Axis Configuration
- Set appropriate `minimum`, `maximum`, and `interval` for clarity
- Use consistent axis types across related charts
- Format labels for readability (K, M, %, $)

### Multiple Axes
- Limit to 2-3 axes maximum to avoid confusion
- Use distinct colors for each axis
- Align scales logically

### Labels
- Rotate when labels overlap (45° or 90°)
- Use multilevel labels for hierarchical data
- Keep font sizes readable (12px minimum)

### Layout
- Use multiple panes for unrelated data series
- Maintain consistent pane sizing
- Add titles to clarify each pane's purpose

### Dimensions
- Set explicit height for proper rendering
- Use percentage width for responsiveness
- Test on various screen sizes

## Common Pitfalls

1. **No Axis Range:** Forgetting `minimum`/`maximum` can result in awkward scales
2. **Overlapping Labels:** Not using `labelIntersectAction` with many categories
3. **Wrong Axis Type:** Using Category axis for continuous numeric data
4. **Too Many Axes:** More than 3 axes creates confusion
5. **Missing Titles:** Unlabeled axes lack context
6. **Fixed Width:** Not responsive on mobile devices

## Troubleshooting

**Labels cut off:**
- Increase chart `margin`
- Use `labelIntersectAction: 'Wrap'` or `'Rotate45'`

**Axis not visible:**
- Check `lineStyle.width` is not 0
- Verify `visible: true` (default)

**Wrong scale:**
- Set explicit `minimum`, `maximum`, `interval`
- Check `valueType` matches data

**Multiple axes not showing:**
- Ensure `name` property is unique
- Bind series using correct `yAxisName`/`xAxisName`

Refer to interactive-features for axis-based interactions like zooming and panning.

## API Reference Summary

### Core Axis APIs

| API | Description | Documentation |
|-----|-------------|---------------|
| AxisModel | Complete axis configuration interface with 50+ properties | [axisModel.md](https://ej2.syncfusion.com/angular/documentation/api/chart/axisModel) |
| Axis | Axis class with methods and properties | [md](https://ej2.syncfusion.com/angular/documentation/api/chart/axis) |
| AxisDirective | Axis directive for declaring multiple axes | [axisDirective.md](https://ej2.syncfusion.com/angular/documentation/api/chart/axisDirective) |

### Axis Configuration Properties

| Property | Type | Default | Description | API Reference |
|----------|------|---------|-------------|---------------|
| valueType | ValueType | 'Double' | Axis value type: Double, DateTime, Category, Logarithmic | [valueType](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#valueType), [ValueType](https://ej2.syncfusion.com/angular/documentation/api/chart/valueType) |
| name | string | '' | Unique identifier for the axis | [name](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#name) |
| title | string | '' | Axis title text | [title](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#title) |
| minimum | Object | null | Minimum axis value | [minimum](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#minimum) |
| maximum | Object | null | Maximum axis value | [maximum](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#maximum) |
| interval | number | null | Axis label interval | [interval](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#interval) |
| intervalType | IntervalType | 'Auto' | DateTime interval type | [intervalType](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#intervalType), [IntervalType](https://ej2.syncfusion.com/angular/documentation/api/chart/intervalType) |
| logBase | number | 10 | Logarithmic base value | [logBase](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#logBase) |
| rangePadding | ChartRangePadding | 'Auto' | Padding at axis ends | [rangePadding](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#rangePadding), [ChartRangePadding](https://ej2.syncfusion.com/angular/documentation/api/chart/chartRangePadding) |
| opposedPosition | boolean | false | Place axis on opposite side | [opposedPosition](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#opposedPosition) |
| isInversed | boolean | false | Invert axis direction | [isInversed](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#isInversed) |
| crossesAt | Object | null | Axis crossing point | [crossesAt](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#crossesAt) |
| crossesInAxis | string | null | Cross at specific axis | [crossesInAxis](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#crossesInAxis) |
| rowIndex | number | 0 | Row index for multiple rows | [rowIndex](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#rowIndex) |
| columnIndex | number | 0 | Column index for multiple columns | [columnIndex](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#columnIndex) |
| span | number | 1 | Number of rows/columns to span | [span](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#span) |

### Label Configuration

| Property | Type | Default | Description | API Reference |
|----------|------|---------|-------------|---------------|
| labelFormat | string | '' | Label format string | [labelFormat](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#labelFormat) |
| labelStyle | FontModel | - | Label font styling | [labelStyle](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#labelStyle), [FontModel](https://ej2.syncfusion.com/angular/documentation/api/chart/fontModel) |
| labelRotation | number | 0 | Label rotation angle (-90 to 90) | [labelRotation](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#labelRotation) |
| labelIntersectAction | LabelIntersectAction | 'Trim' | Action for overlapping labels | [labelIntersectAction](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#labelIntersectAction), [LabelIntersectAction](https://ej2.syncfusion.com/angular/documentation/api/chart/labelIntersectAction) |
| labelPlacement | LabelPlacement | 'BetweenTicks' | Label placement relative to ticks | [labelPlacement](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#labelPlacement), [LabelPlacement](https://ej2.syncfusion.com/angular/documentation/api/chart/labelPlacement) |
| labelPosition | AxisPosition | 'Outside' | Label position (Inside/Outside) | [labelPosition](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#labelPosition), [AxisPosition](https://ej2.syncfusion.com/angular/documentation/api/chart/axisPosition) |
| labelPadding | number | 5 | Space between labels and axis | [labelPadding](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#labelPadding) |
| maximumLabelWidth | number | 34 | Maximum label width in pixels | [maximumLabelWidth](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#maximumLabelWidth) |
| enableTrim | boolean | false | Trim labels to fit | [enableTrim](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#enableTrim) |
| enableWrap | boolean | false | Wrap labels to multiple lines | [enableWrap](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#enableWrap) |
| labelTemplate | string/Function | null | Custom label template | [labelTemplate](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#labelTemplate) |

### Gridlines and Tick Lines

| Feature | API Reference |
|---------|---------------|
| Major Gridlines | [MajorGridLinesModel](https://ej2.syncfusion.com/angular/documentation/api/chart/majorGridLinesModel), [majorGridLines](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#majorGridLines) |
| Minor Gridlines | [MinorGridLinesModel](https://ej2.syncfusion.com/angular/documentation/api/chart/minorGridLinesModel), [minorGridLines](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#minorGridLines) |
| Major Tick Lines | [MajorTickLinesModel](https://ej2.syncfusion.com/angular/documentation/api/chart/majorTickLinesModel), [majorTickLines](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#majorTickLines) |
| Minor Tick Lines | [MinorTickLinesModel](https://ej2.syncfusion.com/angular/documentation/api/chart/minorTickLinesModel), [minorTickLines](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#minorTickLines) |
| Axis Line | [AxisLineModel](https://ej2.syncfusion.com/angular/documentation/api/chart/axisLineModel), [lineStyle](https://ej2.syncfusion.com/angular/documentation/api/chart/axis#lineStyle) |

### Chart Layout

| Property | Type | Description | API Reference |
|----------|------|-------------|---------------|
| title | string | Chart title | [ChartModel.title](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#title) |
| titleStyle | TitleStyleSettingsModel | Title styling | [TitleStyleSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/titleStyleSettingsModel) |
| width | string | Chart width | [ChartModel.width](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#width) |
| height | string | Chart height | [ChartModel.height](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#height) |
| margin | MarginModel | Chart margins | [ChartModel.margin](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#margin), [MarginModel](https://ej2.syncfusion.com/angular/documentation/api/chart/marginModel) |
| chartArea | ChartAreaModel | Plot area configuration | [ChartModel.chartArea](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#chartArea), [ChartAreaModel](https://ej2.syncfusion.com/angular/documentation/api/chart/chartAreaModel) |
| rows | RowModel[] | Row definitions for multiple panes | [ChartModel.rows](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#rows), [RowModel](https://ej2.syncfusion.com/angular/documentation/api/chart/rowModel) |
| columns | ColumnModel[] | Column definitions for multiple panes | [ChartModel.columns](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#columns), [ColumnModel](https://ej2.syncfusion.com/angular/documentation/api/chart/columnModel) |
| isTransposed | boolean | Transpose/invert chart | [ChartModel.isTransposed](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#isTransposed) |

### Enumerations

| Enum | Description | API Reference |
|------|-------------|---------------|
| ValueType | Axis value types (Double, DateTime, Category, Logarithmic) | [valueType.md](https://ej2.syncfusion.com/angular/documentation/api/chart/valueType) |
| IntervalType | DateTime interval types (Years, Months, Days, Hours, etc.) | [intervalType.md](https://ej2.syncfusion.com/angular/documentation/api/chart/intervalType) |
| ChartRangePadding | Axis padding modes (None, Normal, Additional, Round, Auto) | [chartRangePadding.md](https://ej2.syncfusion.com/angular/documentation/api/chart/chartRangePadding) |
| LabelIntersectAction | Label overlap handling (None, Hide, Trim, Wrap, etc.) | [labelIntersectAction.md](https://ej2.syncfusion.com/angular/documentation/api/chart/labelIntersectAction) |
| LabelPlacement | Label placement relative to ticks | [labelPlacement.md](https://ej2.syncfusion.com/angular/documentation/api/chart/labelPlacement) |
| AxisPosition | Label/title position (Inside, Outside) | [axisPosition.md](https://ej2.syncfusion.com/angular/documentation/api/chart/axisPosition) |
| SkeletonType | DateTime skeleton types | [skeletonType.md](https://ej2.syncfusion.com/angular/documentation/api/chart/skeletonType) |
| EdgeLabelPlacement | Edge label placement (None, Hide, Shift) | [edgeLabelPlacement.md](https://ej2.syncfusion.com/angular/documentation/api/chart/edgeLabelPlacement) |

