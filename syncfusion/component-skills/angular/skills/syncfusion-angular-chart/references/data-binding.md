# Data Binding Reference for Syncfusion Angular Chart

## Table of Contents

- [Introduction](#introduction)
- [Data Binding Approaches Overview](#data-binding-approaches-overview)
- [Local Data Binding](#local-data-binding)
  - [Simple Local Data](#simple-local-data)
  - [Common DataSource](#common-datasource)
  - [Complex JSON Structures](#complex-json-structures)
- [Remote Data Binding](#remote-data-binding)
  - [Using DataManager](#using-datamanager)
  - [OData Services](#odata-services)
  - [ODataV4 Services](#odatav4-services)
  - [Web API Adaptor](#web-api-adaptor)
  - [Custom Adaptor](#custom-adaptor)
- [Lazy Loading](#lazy-loading)
- [Dynamic Data Updates](#dynamic-data-updates)
  - [Adding Data Points](#adding-data-points)
  - [Removing Data Points](#removing-data-points)
  - [Replacing Entire Dataset](#replacing-entire-dataset)
  - [Interactive Add/Remove](#interactive-addremove)
- [Handling Empty Points](#handling-empty-points)
- [Offline Mode](#offline-mode)
- [No Data Template](#no-data-template)
- [Performance Optimization](#performance-optimization)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Advanced Scenarios](#advanced-scenarios)

## Introduction

The Syncfusion Angular Chart component provides flexible data binding capabilities to accommodate various application scenarios. Whether you're working with local JSON arrays, fetching data from remote services, or handling real-time data streams, the chart component offers multiple approaches to suit your needs.

This reference guide covers all data binding methods, performance considerations, and best practices for working with data in Angular Chart components.

## Data Binding Approaches Overview

The chart supports the following data binding methods:

| Method | Best For | Advantages | Considerations |
|--------|----------|------------|-----------------|
| Local data | Small to medium datasets | Simple setup, no network latency, instant rendering | All data must be in memory |
| Common datasource | Multiple series sharing data | Reduces redundancy, single update point | Limited to data common across series |
| Lazy loading | Large datasets with scrolling | Loads only visible data, better performance | Requires server-side pagination |
| Remote data (OData/WebAPI) | Backend-driven data | Scalable, centralized data management, real-time updates | Network latency, requires service setup |
| Offline mode | Data caching with client-side actions | Eliminates repeated requests, faster interactions | Initial load time, memory constraints |

## Local Data Binding

### Simple Local Data

Bind JSON data directly to chart series using the `dataSource` property. Map JSON fields to x and y axes using `xName` and `yName` properties.

**Basic Example:**

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, DateTimeService, ScrollBarService, ColumnSeriesService, LineSeriesService,
    ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService,LegendService, TooltipService
 } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
    imports: [ ChartModule ],
    providers: [ CategoryService, DateTimeService, ScrollBarService, LineSeriesService, ColumnSeriesService,
            ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService,],
    standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='month' yName='sales' name='Sales'></e-series>
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

### Common DataSource

Share a single data source across multiple series by setting `dataSource` at the chart level instead of the series level.

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
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
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [dataSource]='chartData'>
        <e-series-collection>
            <e-series type='Column' xName='month' yName='sales' name='Sales'></e-series>
            <e-series type='Column' xName='month' yName='sales1' name='Sales'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    ngOnInit(): void {
        this.chartData = [
      { month: 'Jan', sales: 35, sales1: 28 }, { month: 'Feb', sales: 28, sales1: 35 },
      { month: 'Mar', sales: 34, sales1: 32 }, { month: 'Apr', sales: 32, sales1: 34 },
      { month: 'May', sales: 40, sales1: 32 }, { month: 'Jun', sales: 32, sales1: 40 },
      { month: 'Jul', sales: 35, sales1: 55 }, { month: 'Aug', sales: 55, sales1: 35 },
      { month: 'Sep', sales: 38, sales1: 30 }, { month: 'Oct', sales: 30, sales1: 38 },
      { month: 'Nov', sales: 25, sales1: 32 }, { month: 'Dec', sales: 32, sales1: 25 }

        ];
        this.primaryXAxis = {
            valueType: 'Category'
        };
    }

}
```

**Benefits:**
- Single source of truth for data updates
- Reduced code duplication
- Easier maintenance for multi-series charts

### Complex JSON Structures

Handle nested JSON data by mapping to nested properties:

```typescript
public complexData: Object[] = [
  { 
    date: '2024-01', 
    metrics: { 
      revenue: 50000, 
      expenses: 35000,
      profit: 15000 
    },
    metadata: {
      region: 'North',
      category: 'Electronics'
    }
  },
  // ... more data
];

// Map nested properties
<e-series 
  [dataSource]='complexData' 
  xName='date' 
  yName='metrics.revenue'
  type='Column'>
</e-series>
```

## Remote Data Binding

### Using DataManager

The `DataManager` class simplifies communication with REST APIs, OData services, and custom web endpoints.

**Basic Remote Data Example:**

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, DateTimeService, ScrollBarService, ColumnSeriesService, LineSeriesService,
    ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService,LegendService, TooltipService
 } from '@syncfusion/ej2-angular-charts'


import { Component, OnInit } from '@angular/core';
import { DataManager, Query } from '@syncfusion/ej2-data';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, DateTimeService, ScrollBarService, LineSeriesService, ColumnSeriesService,
        ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService,],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis'>
        <e-series-collection>
            <e-series [dataSource]='dataManager' type='Column' [query]='query' xName='CustomerID' yName='Freight' name='Sales'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public primaryYAxis?: Object;
    public dataManager: DataManager = new DataManager({
    url: 'https://services.syncfusion.com/angular/production/api/orders'
    });
    public query: Query = new Query().take(5).where('Estimate', 'lessThan', 3, false);
    ngOnInit(): void {
        this.primaryXAxis = {
            rangePadding: 'Additional',
            valueType: 'Category',
            title: 'Assignee'
        };
        this.primaryYAxis = {
            title: 'Estimate'
        };
    }

}
```

### OData Services

OData (Open Data Protocol) is a standardized protocol for creating and consuming data APIs.

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { DataManager, Query, ODataAdaptor } from '@syncfusion/ej2-data';
@Component({
imports: [
        ChartModule
    ],

providers: [ CategoryService, ColumnSeriesService ],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='dataManager' type='Column' [query]='query' xName='CustomerID' yName='Freight'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public title?: string;
    public dataManager: DataManager = new DataManager({
        url: 'https://services.odata.org/V3/Northwind/Northwind.svc/Orders/',
        adaptor: new ODataAdaptor(),
        crossDomain: true
    });
    public query: Query = new Query();
    ngOnInit(): void {
        this.primaryXAxis = {
            valueType: 'Category'
        };
        this.title = 'Order Details';
    }

}
```

**Query Operations:**
- `.select()` - Specify fields to retrieve
- `.where()` - Filter data
- `.sortBy()` - Sort results
- `.take()` - Limit number of records
- `.skip()` - Skip records (pagination)

### ODataV4 Services

ODataV4 is the latest version with enhanced query capabilities:

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';
@Component({
imports: [
        ChartModule
    ],

providers: [ CategoryService, ColumnSeriesService ],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='dataManager' type='Column' [query]='query' xName='CustomerID' yName='Freight'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public title?: string;
    public dataManager: DataManager = new DataManager({
        url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders',
        adaptor: new ODataV4Adaptor()
    });
    public query: Query = new Query();
    ngOnInit(): void {
        this.primaryXAxis = {
            valueType: 'Category'
        };
        this.title = 'Order Details';
    }

}
```

### Web API Adaptor

For custom REST APIs that don't follow OData conventions:

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data';
@Component({
imports: [
        ChartModule
    ],

providers: [ CategoryService, ColumnSeriesService ],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='dataManager' type='Column' [query]='query' xName='CustomerID' yName='Freight'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public title?: string;
    public dataManager: DataManager = new DataManager({
        url: 'https://services.syncfusion.com/angular/production/api/orders',
        adaptor: new WebApiAdaptor()
    });
    public query: Query = new Query();
    ngOnInit(): void {
        this.primaryXAxis = {
            valueType: 'Category'
        };
        this.title = 'Order Details';
    }

}
```

**Expected Response Format:**

```json
{
  "Items": [
    { "id": 1, "month": "Jan", "sales": 50000 },
    { "id": 2, "month": "Feb", "sales": 55000 }
  ],
  "Count": 830
}
```

### Custom Adaptor

Create custom adaptors for specialized data transformations:

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { DataManager, Query, ODataAdaptor } from '@syncfusion/ej2-data';
@Component({
imports: [
        ChartModule
    ],

providers: [ CategoryService, ColumnSeriesService ],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='data' type='Column' [query]='query' xName='CustomerID' yName='Sno'></e-series>
        </e-series-collection>
    </ejs-chart>`
})

export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public title?: string;
    public data?: DataManager;
    public query: Query = new Query();
    ngOnInit(): void {
        class SerialNoAdaptor extends ODataAdaptor {
            public override processResponse(): Object[] {
                let i: number = 0;
                // calling base class processResponse function
                let original: Object[] | any = super.processResponse.apply(this, arguments as any);
                // adding serial number
                original.forEach((item: Object | any) => (item['Sno'] = ++i));
                return original;
            }
        }
        this.data = new DataManager({
            url: 'https://services.syncfusion.com/angular/production/api/orders',
            adaptor: new SerialNoAdaptor(),
            offline: true
        });
        this.primaryXAxis = {
            valueType: 'Category',
        };
        this.title = 'Order Details';
    }

}
```

## Lazy Loading

Lazy loading enables on-demand data retrieval for large datasets, loading only visible data ranges.

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, DateTimeService, ScrollBarService, ColumnSeriesService, LineSeriesService,
    ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService,LegendService, TooltipService
 } from '@syncfusion/ej2-angular-charts'


import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from '@syncfusion/ej2-angular-charts';
import { Internationalization } from '@syncfusion/ej2-base';
import { NumericTextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { IScrollEventArgs } from '@syncfusion/ej2-charts';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, DateTimeService, ScrollBarService, LineSeriesService, ColumnSeriesService,
        ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService,],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart style='display:block;' #chart [legendSettings]='legend' id='container' [primaryXAxis]='primaryXAxis'
            [tooltip]='tooltip' [height]='height' [width]='width' (scrollEnd)='scrollEnd($event)'
            [primaryYAxis]='primaryYAxis' [crosshair]='crosshair' [chartArea]='chartArea' [title]='title'>
            <e-series-collection>
                <e-series [dataSource]='data' [animation]='animation' type='Line' xName='x' yName='y'>
                </e-series>
            </e-series-collection>
        </ejs-chart>`
})
export class AppComponent implements OnInit {
    ngOnInit(): void {
    }
    public intl: Internationalization = new Internationalization();
    @ViewChild('point')
    private pointslength?: NumericTextBoxComponent;
    public value: number = 1000;
    public step: number = 100;
    public enabled: boolean = false;
    public format: string = 'n';
    public dropValue: string = 'Range';
    public minValue: Date = new Date(2009, 0, 1);
    public maxValue: Date = new Date(2014, 0, 1);
    public dropDownData: Object = [
        { value: 'Range' },
        { value: 'Points Length' }

    ];
    public fields: Object = { text: 'value', value: 'value' };
    public data: Object[] = this.GetNumericData(new Date(2009, 0, 1));
    @ViewChild('chart')
    public chart?: ChartComponent;
    // Initializing Primary X Axis
    public primaryXAxis: Object = {
        title: 'Day',
        valueType: 'DateTime',
        edgeLabelPlacement: 'Shift',
        skeleton: 'yMMM',
        skeletonType: 'Date',
        scrollbarSettings: {
            range: {
                minimum: new Date(2009, 0, 1),
                maximum: new Date(2014, 0, 1)
            },
            enable: true,
            pointsLength: 1000
        }
    };
    public height: string = '450';
    public width: string = '100%';
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Server Load',
        labelFormat: '{value}MB'
    };
    public tooltip: Object = {
        enable: true, shared: true,
        header : "<b>${point.x}</b>", format : "Server load : <b>${point.y}</b>"
    };
    public legend: Object = {
        visible: false
    };
    public title: string = 'Network Load';
    public animation: Object = { enable: false };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
crosshair: any;
    public scrollEnd(args: IScrollEventArgs | any): void {
        (this.chart as ChartComponent).series[0].dataSource = this.GetNumericData(new Date(args.currentRange.maximum));
        (this.chart as ChartComponent).dataBind();
    };
    public GetNumericData(date: Date): {x: Date, y: number}[] {
        var series1 = [];
        var value = 30;
        for (var i = 0; i <= 60; i++) {
            if (Math.random() > .5) {
                value += (Math.random() * 10 - 5);
            }
            else {
                value -= (Math.random() * 10 - 5);
            }
            if (value < 0) {
                value = this.getRandomInt(20, 40);
            }
            date = new Date(date.setMinutes(date.getMinutes() + 1));
            var point = { x: date, y: Math.round(value) };
            series1.push(point);
        }
        return series1;
    }
    public getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};
```

## Dynamic Data Updates

### Adding Data Points

Use the `addPoint` method to append new data points:

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { ChartComponent, SplineSeriesService, CategoryService, LegendService, DataLabelService } from '@syncfusion/ej2-angular-charts';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
imports: [
         ChartModule, ButtonModule
    ],

providers: [ SplineSeriesService, CategoryService, LegendService, DataLabelService ],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart #chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title' [legendSettings]='legendSettings' [chartArea]='chartArea'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Spline' xName='x' yName='y' name='Users' width=2 [marker]='marker'></e-series>
        </e-series-collection>
    </ejs-chart>
    <button ej-button id='add' (click)='click()'>Add Point</button>`
})
export class AppComponent implements OnInit {
    @ViewChild('chart')
    public chart?: ChartComponent;
    public primaryXAxis?: Object;
    public primaryYAxis?: Object;
    public chartData?: Object[] = [
        { x: "Germany", y: 72 },
        { x: "Russia", y: 103.1 },
        { x: "Brazil", y: 139.1 },
        { x: "India", y: 462.1 },
        { x: "China", y: 721.4 },
        { x: "USA", y: 286.9 },
        { x: "Great Britain", y: 115.1 },
        { x: "Nigeria", y: 97.2 }
    ];
    public title?: string;
    public marker?: Object;
    public legendSettings?: Object;
    public chartArea?: Object;
    ngOnInit(): void {
        this.primaryXAxis = {
            valueType: 'Category',
            enableTrim: false,
            majorTickLines: { width: 0 },
            majorGridLines: { width: 0 }
        };
        this.primaryYAxis = {
            minimum: 0,
            maximum: 800,
            labelFormat: '{value}M',
            edgeLabelPlacement: 'Shift'
        };
        this.title = 'Internet Users - 2016';
        this.marker = {
            visible: true,
            dataLabel: {
                visible: true,
                position: 'Top',
                font: { fontWeight: '600' }
            }
        };
        this.legendSettings = { visible: false };
        this.chartArea = {
            border: { width: 1 }
        };
    }
    click() {
        if (this.chart?.series?.length) {
            if (typeof this.chart.series[0].addPoint === 'function') {
            this.chart?.series[0].addPoint({ x: 'Japan', y: 118.2 });
            }
        }
    }
}
```

### Removing Data Points

Use `removePoint` to delete data points by index:

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { ChartComponent, SplineSeriesService, CategoryService, LegendService, DataLabelService } from '@syncfusion/ej2-angular-charts';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
imports: [
         ChartModule, ButtonModule
    ],

providers: [ SplineSeriesService, CategoryService, LegendService, DataLabelService ],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart #chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title' [legendSettings]='legendSettings' [chartArea]='chartArea'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Spline' xName='x' yName='y' name='Users' width=2 [marker]='marker'></e-series>
        </e-series-collection>
    </ejs-chart>
    <button ej-button id='remove' (click)='click()'>Remove Point</button>`
})
export class AppComponent implements OnInit {
    @ViewChild('chart')
    public chart?: ChartComponent;
    public primaryXAxis?: Object;
    public primaryYAxis?: Object;
    public chartData?: Object[] = [
        { x: "Germany", y: 72 },
        { x: "Russia", y: 103.1 },
        { x: "Brazil", y: 139.1 },
        { x: "India", y: 462.1 },
        { x: "China", y: 721.4 },
        { x: "USA", y: 286.9 },
        { x: "Great Britain", y: 115.1 },
        { x: "Nigeria", y: 97.2 }
    ];
    public title?: string;
    public marker?: Object;
    public legendSettings?: Object;
    public chartArea?: Object;
    ngOnInit(): void {
        this.primaryXAxis = {
            valueType: 'Category',
            enableTrim: false,
            majorTickLines: { width: 0 },
            majorGridLines: { width: 0 }
        };
        this.primaryYAxis = {
            minimum: 0,
            maximum: 800,
            labelFormat: '{value}M',
            edgeLabelPlacement: 'Shift'
        };
        this.title = 'Internet Users - 2016';
        this.marker = {
            visible: true,
            dataLabel: {
                visible: true,
                position: 'Top',
                font: { fontWeight: '600' }
            }
        };
        this.legendSettings = { visible: false };
        this.chartArea = {
            border: { width: 1 }
        };
    }
    click() {
        if (this.chart?.series?.length) {
            if (typeof this.chart.series[0].removePoint === 'function') {
        this.chart?.series[0].removePoint(0);
            }
        }
    }
}
```

### Replacing Entire Dataset

Use `setData` for complete data refresh:

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { ChartComponent, ColumnSeriesService, CategoryService, IAxisRangeCalculatedEventArgs } from '@syncfusion/ej2-angular-charts';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
imports: [
         ChartModule, ButtonModule
    ],

providers: [ ColumnSeriesService, CategoryService ],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart #chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title' [chartArea]='chartArea' (axisRangeCalculated)="axisRangeCalculated($event)">
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='x' yName='y' columnWidth=0.5 [cornerRadius]='cornerRadius'></e-series>
        </e-series-collection>
    </ejs-chart>
    <button ej-button id='update' (click)='click()'>Update Data</button>`
})
export class AppComponent implements OnInit {
    @ViewChild('chart')
    public chart?: ChartComponent;
    public primaryXAxis?: Object;
    public primaryYAxis?: Object;
    public chartData?: Object[] = [
        { x: 'Jewellery', y: 75 },
        { x: 'Shoes', y: 45 },
        { x: 'Footwear', y: 73 },
        { x: 'Pet Services', y: 53 },
        { x: 'Business Clothing', y: 85 },
        { x: 'Office Supplies', y: 68 },
        { x: 'Food', y: 45 }
    ];
    public title?: string;
    public cornerRadius?: Object;
    public chartArea?: Object;
    public getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    ngOnInit(): void {
        this.primaryXAxis = {
            valueType: 'Category',
            majorGridLines: { width: 0 },
            labelStyle: { size: '12px' },
            labelIntersectAction: 'Rotate90'
        };
        this.primaryYAxis = {
            title: 'Sales (in percentage)',
            labelFormat: '{value}%',
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            interval: 5,
            minimum: 0,
            maximum: 100
        };
        this.title = 'Sales by product';
        this.cornerRadius = { topLeft: 15, topRight: 15 };
        this.chartArea = {
            border: { width: 0 }
        };
    }
    click() {
        if (this.chart && this.chart.series && this.chart.series.length > 0 && this.chart.series[0].dataSource) {
            const newData = (
                this.chart.series[0].dataSource as { x: string; y: number }[]
            ).map((item) => {
                const value: number = this.getRandomInt(10, 90);
                return { x: item.x, y: value };
            });
            if (typeof this.chart.series[0].setData === 'function') {
                this.chart.series[0].setData(newData, 500);
            }
        }
    }
    public axisRangeCalculated (args: IAxisRangeCalculatedEventArgs): void {
        if (args.axis.name === 'primaryYAxis') {
            args.maximum = args.maximum as number > 100 ? 100 : args.maximum;
            if (args.maximum > 80) {
                args.interval = 20;
            } else if(args.maximum > 40){
                args.interval = 10;
            }
        }
    }
}
```

### Interactive Add/Remove

Enable users to add/remove points by clicking:

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { ChartComponent, LineSeriesService, CategoryService, TooltipService, DataLabelService, IAxisRangeCalculatedEventArgs, Series, IMouseEventArgs } from '@syncfusion/ej2-angular-charts';
import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
imports: [
         ChartModule
    ],

providers: [ LineSeriesService, CategoryService, TooltipService, DataLabelService ],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart #chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title' [chartArea]='chartArea' [tooltip]='tooltip' (chartMouseClick)='chartMouseClick($event)' (axisRangeCalculated)="axisRangeCalculated($event)">
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Line' xName='x' yName='y' width=3 [marker]='marker'></e-series>
        </e-series-collection>
    </ejs-chart>
   `
})
export class AppComponent implements OnInit {
    @ViewChild('chart')
    public chart?: ChartComponent;
    public primaryXAxis?: Object;
    public primaryYAxis?: Object;
    public chartData?: Object[] = [
        { x: 20, y: 20 },
        { x: 80, y: 80 }
    ];
    public title?: string;
    public marker?: Object;
    public chartArea?: Object;
    public tooltip?: Object;
    ngOnInit(): void {
        this.primaryXAxis = {
            edgeLabelPlacement: 'Shift',
            rangePadding: 'Additional',
            majorGridLines: { width: 0 }
        };
        this.primaryYAxis = {
            title: 'Value',
            interval: 20,
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 }
        };
        this.title = 'User supplied data';
        this.marker = {
            visible: true,
            isFilled: true,
            border: {
                width: 2,
                color: 'White'
            },
            width: 13,
            height: 13
        };
        this.chartArea = {
            border: { width: 0 }
        };
        this.tooltip = { enable: true };
    }
    public chartMouseClick(args: IMouseEventArgs): void {
        let isRemoved: boolean = false;
        if (args.axisData && this.chart?.series) {
            for (let i: number = 0; i < (this.chart.series[0] as Series).points.length; i++) {
                let markerWidth: number = (this.chart.series[0] as Series).marker?.width ?? 0 / 2;
                let roundedX: number = Math.round(args.axisData['primaryXAxis']) + markerWidth;
                let roundedY: number = Math.round(args.axisData['primaryYAxis']) + markerWidth;
                let pointX: number = Math.round((this.chart.series[0] as Series).points[i].x as number) + markerWidth;
                let pointY: number = Math.round((this.chart.series[0] as Series).points[i].y as number) + markerWidth;
                if ((roundedX === pointX || roundedX + 1 === pointX || roundedX - 1 === pointX) &&
                    (roundedY === pointY || roundedY + 1 === pointY || roundedY - 1 === pointY)) {
                    if ((this.chart.series[0] as Series).points.length > 1) {
                        const points = (this.chart.series[0] as Series).points;
                        const duration: number = i === 0 || i === points[points.length - 1].index ? 500 : 0;
                        if (this.chart?.series?.length) {
                            if (typeof this.chart.series[0].removePoint === 'function') {
                                this.chart.series[0].removePoint(i, duration);
                            }
                        }
                    }
                    isRemoved = true;
                }
            }
            if (!isRemoved) {
                if (this.chart?.series?.length) {
                    if (typeof this.chart.series[0].addPoint === 'function') {
                        this.chart.series[0].addPoint({
                            x: Math.round(args.axisData['primaryXAxis']),
                            y: Math.round(args.axisData['primaryYAxis'])
                        });
                    }
                }
            }
        }
    };
    public axisRangeCalculated(args: IAxisRangeCalculatedEventArgs): void {
        if (args.axis.name === 'primaryXAxis') {
            if (args.interval < 10) {
                args.maximum = args.maximum + 10;
                args.minimum = args.minimum - 10;
                args.interval = 10;
            }
        }
        if (args.axis.name === 'primaryYAxis') {
            if (args.maximum <= 60) {
                args.interval = 10;
            }
        }
    };
}
```

## Handling Empty Points

Data points with `null` or `undefined` values are treated as empty points.

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, LineSeriesService, StepLineSeriesService, SplineSeriesService, StackingLineSeriesService, DateTimeService,
    SplineAreaSeriesService, MultiColoredLineSeriesService, ParetoSeriesService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts'


import { Component, OnInit } from '@angular/core';
import { lineData } from './datasource';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, LineSeriesService, StepLineSeriesService, SplineSeriesService, StackingLineSeriesService, DateTimeService,
        SplineAreaSeriesService, MultiColoredLineSeriesService, ParetoSeriesService, ColumnSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis'
    [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Line' xName='x' yName='y' [emptyPointSettings]='emptyPointSettings'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public chartData?: Object[];
    public title?: string;
     public primaryXAxis?: Object;
      public primaryYAxis?: Object;
      public emptyPointSettings?: Object;
    ngOnInit(): void {
        this.chartData = lineData;
        this.primaryXAxis = {
            interval: 1, valueType: 'Category'
        };
        this.primaryYAxis =
        {
            title: 'Expense',
        },
        this.title = 'Efficiency of oil-fired power production';
        this.emptyPointSettings = {
            mode: 'Zero'
        }
    }

}
```

**Empty Point Modes:**
- `Gap` - Leave blank space (default)
- `Zero` - Treat as zero value
- `Average` - Calculate average of adjacent points
- `Drop` - Remove from series entirely

## Offline Mode

Enable offline mode to load all data once and handle operations client-side:

```typescript
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';

public offlineData: DataManager = new DataManager({
  url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders/',
  adaptor: new ODataAdaptor(),
  offline: true  // Enable offline mode
});
```

**Use Cases:**
- Small to medium datasets
- Reducing server load
- Improving responsiveness
- Working with intermittent connectivity

**Considerations:**
- Entire dataset loaded at initialization
- Higher initial load time
- Increased memory usage

## No Data Template

Display custom content when no data is available:

```typescript
import { ViewChild } from '@angular/core'
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, DateTimeService, ScrollBarService, ColumnSeriesService, LineSeriesService,
    ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService,LegendService, TooltipService
 } from '@syncfusion/ej2-angular-charts'


import { Component, OnInit } from '@angular/core';
import { ChartComponent } from '@syncfusion/ej2-angular-charts'

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, DateTimeService, ScrollBarService, LineSeriesService, ColumnSeriesService,
        ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService,],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [noDataTemplate]='noDataTemplate' #chart [primaryXAxis]='primaryXAxis'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='x' yName='y' name='Sales'></e-series>
        </e-series-collection>
        <ng-template #noDataTemplate>
                <div id="noDataTemplateContainer">
                    <div class="template-align">
                        <img src="./no-data.png" alt="No Data"/>
                    </div>
                    <div class="template-align">
                        <p style="font-size: 15px; margin: 10px 0 0;"><strong>No data available to display.</strong></p>
                    </div>
                    <div class="template-align" style="margin-top: 15px;">
                        <button ejs-button class="load-data-btn" (click)="loadData()" iconCss="e-icons e-refresh">Load Data</button>
                    </div>
                </div>
            </ng-template>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    @ViewChild('chart')
    public chart?: ChartComponent;
    public primaryXAxis?: Object;
    public data: Object[] = [];
    public chartData?: Object[];

    ngOnInit(): void {
        this.chartData = [];
        this.primaryXAxis = {
            valueType: 'Category'
        };
    }

    public loadData(): void {
        this.chartData = [
            { x: 'January', y: 19173 },
            { x: 'February', y: 17726 },
            { x: 'March', y: 19874 },
            { x: 'April', y: 19391 },
            { x: 'May', y: 20072 },
            { x: 'June', y: 19233 }
        ];
        this.chart?.refresh();
    }
}
```

## Performance Optimization

### Large Datasets

For datasets with thousands of points:

1. **Use Canvas Rendering:**
```typescript
<ejs-chart [enableCanvas]='true'>
```

2. **Disable Animations:**
```typescript
public animation: Object = { enable: false };
```

3. **Implement Data Virtualization:**
```typescript
// Load data in chunks
public chartData: Object[] = [];

ngOnInit() {
  this.loadDataChunk(0, 1000); // Load first 1000 points
}

loadDataChunk(start: number, count: number) {
  let chunk = this.fetchDataRange(start, count);
  this.chartData = [...this.chartData, ...chunk];
}
```

4. **Use Aggregation:**
```typescript
// Aggregate data before binding
public aggregatedData = this.aggregateByMonth(rawData);
```

### Throttling Updates

For real-time data streams:

```typescript
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

export class RealTimeChartComponent {
  private dataStream = new Subject<any>();
  
  ngOnInit() {
    this.dataStream.pipe(
      throttleTime(1000) // Update chart max once per second
    ).subscribe(data => {
      this.updateChart(data);
    });
  }
  
  onDataReceived(newData: any) {
    this.dataStream.next(newData);
  }
}
```

## Best Practices

1. **Choose the Right Data Binding Method:**
   - Local data for small, static datasets
   - Remote data for large, server-managed data
   - Lazy loading for very large scrollable datasets

2. **Optimize Data Structure:**
   - Keep JSON flat when possible
   - Use consistent field naming
   - Remove unnecessary fields

3. **Handle Loading States:**
```typescript
public isLoading: boolean = true;

fetchData() {
  this.isLoading = true;
  this.dataService.getData().subscribe(
    data => {
      this.chartData = data;
      this.isLoading = false;
    },
    error => {
      console.error('Error loading data:', error);
      this.isLoading = false;
    }
  );
}
```

4. **Implement Error Handling:**
```typescript
public errorMessage: string = '';

loadRemoteData() {
  this.dataManager.executeQuery(this.query)
    .then((e: any) => {
      this.chartData = e.result;
    })
    .catch(error => {
      this.errorMessage = 'Failed to load data: ' + error.message;
      console.error(error);
    });
}
```

5. **Memory Management:**
```typescript
ngOnDestroy() {
  // Clear large datasets
  this.chartData = [];
  // Unsubscribe from observables
  this.subscription?.unsubscribe();
}
```

## Troubleshooting

### Data Not Displaying

**Issue:** Chart shows no data
**Solutions:**
- Verify `xName` and `yName` match data field names (case-sensitive)
- Check browser console for errors
- Ensure data is not null or undefined
- Verify data format matches series type

```typescript
// Debug data binding
console.log('Chart Data:', this.chartData);
console.log('X Field:', this.xName);
console.log('Y Field:', this.yName);
```

### CORS Errors with Remote Data

**Issue:** Cross-origin request blocked
**Solutions:**
- Enable CORS on server
- Use proxy configuration in development
- Set `crossDomain: true` in DataManager

```typescript
public remoteData: DataManager = new DataManager({
  url: 'https://api.example.com/data',
  adaptor: new WebApiAdaptor(),
  crossDomain: true,
  headers: [{ 'Content-Type': 'application/json' }]
});
```

### Performance Issues

**Issue:** Chart slow with large datasets
**Solutions:**
- Enable canvas rendering
- Implement data aggregation
- Use lazy loading
- Reduce point count through sampling

### Empty Points Not Working

**Issue:** Empty points not rendered as expected
**Solutions:**
- Ensure values are exactly `null` or `undefined`
- Check `emptyPointSettings.mode` configuration
- Verify series type supports empty points

## Advanced Scenarios

### Real-Time Data Streaming

```typescript
import { WebSocketSubject } from 'rxjs/webSocket';

export class RealTimeChartComponent {
  private socket$: WebSocketSubject<any>;
  public chartData: Object[] = [];
  private maxPoints: number = 50;
  
  ngOnInit() {
    this.socket$ = new WebSocketSubject('ws://localhost:8080/data');
    
    this.socket$.subscribe(
      data => {
        this.chartData.push(data);
        
        // Keep only last N points
        if (this.chartData.length > this.maxPoints) {
          this.chartData.shift();
        }
        
        this.chart.series[0].setData(this.chartData);
      }
    );
  }
  
  ngOnDestroy() {
    this.socket$.complete();
  }
}
```

### Combining Multiple Data Sources

```typescript
import { forkJoin } from 'rxjs';

loadMultipleDataSources() {
  forkJoin({
    sales: this.api.getSalesData(),
    forecast: this.api.getForecastData(),
    targets: this.api.getTargetsData()
  }).subscribe(results => {
    this.chartData = this.combineData(results);
  });
}

combineData(results: any): Object[] {
  return results.sales.map((item: any, index: number) => ({
    month: item.month,
    sales: item.value,
    forecast: results.forecast[index]?.value,
    target: results.targets[index]?.value
  }));
}
```

### Caching Strategy

```typescript
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ChartDataService {
  private cache = new Map<string, any>();
  private cacheDuration = 5 * 60 * 1000; // 5 minutes
  
  getData(key: string): Observable<any> {
    let cached = this.cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
      return of(cached.data);
    }
    
    return this.http.get(`/api/data/${key}`).pipe(
      tap(data => {
        this.cache.set(key, {
          data: data,
          timestamp: Date.now()
        });
      })
    );
  }
}
```

## API Reference Summary

### Data Binding Properties

| Property | Type | Description | API Reference |
|----------|------|-------------|---------------|
| dataSource | Object[] \| DataManager | Chart data source | [ChartModel.dataSource](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#dataSource), [Series.dataSource](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#dataSource) |
| xName | string | X-axis field name | [Series.xName](https://ej2.syncfusion.com/angular/documentation/api/chart/series#xName) |
| yName | string | Y-axis field name | [Series.yName](https://ej2.syncfusion.com/angular/documentation/api/chart/series#yName) |
| query | Query | DataManager query | [Series.query](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#query) |
| high | string | High value field (financial/range series) | [Series.high](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#high) |
| low | string | Low value field (financial/range series) | [Series.low](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#low) |
| open | string | Open value field (financial series) | [Series.open](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#open) |
| close | string | Close value field (financial series) | [Series.close](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#close) |
| size | string | Size field (bubble series) | [Series.size](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#size) |
| pointColorMapping | string | Color field for point coloring | [Series.pointColorMapping](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#pointColorMapping) |
| colorName | string | Color mapping field for range colors | [Series.colorName](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#colorName) |

### Empty Point Handling

| API | Description | Documentation |
|-----|-------------|---------------|
| EmptyPointSettingsModel | Empty point configuration interface | [emptyPointSettingsModel.md](https://ej2.syncfusion.com/angular/documentation/api/chart/emptyPointSettingsModel) |
| EmptyPointSettings | Empty point settings class | [emptyPointSettings.md](https://ej2.syncfusion.com/angular/documentation/api/chart/emptyPointSettings) |
| EmptyPointMode | Empty point handling modes (Gap, Zero, Average, Drop) | [emptyPointMode.md](https://ej2.syncfusion.com/angular/documentation/api/chart/emptyPointMode) |

**Series Property:** [Series.emptyPointSettings](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#emptyPointSettings)

### Financial Data Fields

| API | Description | Documentation |
|-----|-------------|---------------|
| FinancialDataFields | Interface for OHLC data structure | [financialDataFields.md](https://ej2.syncfusion.com/angular/documentation/api/chart/financialDataFields) |

### Data Events

| Event | Interface | Description | API Reference |
|-------|-----------|-------------|---------------|
| load | ILoadedEventArgs | Before chart loads - ideal for data preparation | [ChartModel.load](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#load) |
| loaded | ILoadedEventArgs | After chart loads with data | [ChartModel.loaded](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#loaded) |

### Performance Properties

| Property | Type | Default | Description | API Reference |
|----------|------|---------|-------------|---------------|
| enableCanvas | boolean | false | Use canvas rendering for large datasets | [ChartModel.enableCanvas](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#enableCanvas) |
| enableAnimation | boolean | true | Enable/disable animations | [ChartModel.enableAnimation](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#enableAnimation) |
| enableComplexProperty | boolean | false | Improve performance through data mapping | [Series.enableComplexProperty](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective#enableComplexProperty) |

### Data Manager Integration

**External Library:** @syncfusion/ej2-data

**Key Classes:**
- DataManager - Main data management class
- Query - Query builder for filtering, sorting, paging
- Predicate - Condition builder
- ODataAdaptor - OData service adapter
- WebApiAdaptor - ASP.NET Web API adapter
- UrlAdaptor - Generic REST API adapter
- CustomDataAdaptor - Custom adapter implementation

**Documentation:** See [ej2-data documentation](https://ej2.syncfusion.com/angular/documentation/data/)

---
