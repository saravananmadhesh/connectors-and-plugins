# Customization Reference for Syncfusion Angular Chart

## Table of Contents

- [Introduction](#introduction)
- [Color Palettes](#color-palettes)
  - [Built-in Palettes](#built-in-palettes)
  - [Custom Color Palettes](#custom-color-palettes)
  - [Per-Series Colors](#per-series-colors)
- [Themes](#themes)
  - [Available Themes](#available-themes)
  - [Applying Themes](#applying-themes)
  - [Theme Studio](#theme-studio)
- [Chart Area Customization](#chart-area-customization)
  - [Background and Border](#background-and-border)
  - [Chart Margin](#chart-margin)
  - [Plot Area Customization](#plot-area-customization)
- [Series Customization](#series-customization)
  - [Series Appearance](#series-appearance)
  - [Point-Level Customization](#point-level-customization)
  - [Marker Customization](#marker-customization)
- [Text and Label Customization](#text-and-label-customization)
  - [Data Labels](#data-labels)
  - [Axis Labels](#axis-labels)
  - [Title and Subtitle](#title-and-subtitle)
- [Animation Settings](#animation-settings)
- [Responsive Design](#responsive-design)
- [CSS Customization](#css-customization)
- [Dynamic Styling](#dynamic-styling)
- [Best Practices](#best-practices)
- [Advanced Customization](#advanced-customization)
- [Troubleshooting](#troubleshooting)

## Introduction

The Syncfusion Angular Chart component offers extensive customization options to match your application's design language. From built-in themes to granular styling at the point level, you can create visually appealing and consistent data visualizations.

This reference covers all aspects of chart customization including themes, colors, styling, animations, and responsive design.

## Color Palettes

### Built-in Palettes

The chart provides default color palettes that automatically cycle through colors for multiple series.

**Default Palette:**
```typescript
['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883', 
 '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb', '#ea7a57']
```

### Custom Color Palettes

Define custom color schemes using the `palettes` property:

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
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'[palettes]='palette'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='gold' name='Gold' ></e-series>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='silver' name='Silver'></e-series>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='bronze' name='Bronze' ></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    public palette?: string[];
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
           labelFormat: '${value}K'
        };
        this.palette = ["#E94649", "#F6B53F", "#6FAAB0", "#C4C24A"];
        this.title = 'Olympic Medals';
    }

}
```

### Per-Series Colors

Override palette colors for individual series:

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, LineSeriesService, StepLineSeriesService, SplineSeriesService, StackingLineSeriesService, DateTimeService,
    SplineAreaSeriesService, MultiColoredLineSeriesService, ParetoSeriesService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts'


import { Component, OnInit } from '@angular/core';
import { lineData } from './datasource';

@Component({
imports: [ ChartModule ],
providers: [ CategoryService, LineSeriesService, StepLineSeriesService, SplineSeriesService, StackingLineSeriesService, DateTimeService,
        SplineAreaSeriesService, MultiColoredLineSeriesService, ParetoSeriesService, ColumnSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis'
    [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Line' fill='#FF5733' xName='month' yName='sales'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public chartData?: Object[];
    public title?: string;
     public primaryXAxis?: Object;
      public primaryYAxis?: Object;
    ngOnInit(): void {
        this.chartData = lineData;
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

## Chart Area Customization

### Background and Border

Customize the entire chart background and border:

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

**Gradient Background:**
```typescript
ngAfterViewInit() {
  let chart = document.querySelector('.e-chart');
  if (chart) {
    chart.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  }
}
```

### Chart Margin

Control spacing around the chart:

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateFormatOptions } from '@syncfusion/ej2-base'
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

**Responsive Margins:**
```typescript
@HostListener('window:resize')
onResize() {
  if (window.innerWidth < 768) {
    this.margin = { left: 10, right: 10, top: 20, bottom: 20 };
  } else {
    this.margin = { left: 40, right: 40, top: 40, bottom: 40 };
  }
}
```

### Plot Area Customization

Style the area where data is plotted:

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

**With Custom Dimensions:**
```typescript
public chartArea: Object = {
  width: '90%',
  height: '80%',
  background: 'rgba(173, 216, 230, 0.3)',
  border: { width: 0 }
};
```

## Series Customization

### Series Appearance

Customize individual series appearance:

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, DateTimeService, ScrollBarService, ColumnSeriesService, LineSeriesService,
    ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService,LegendService, TooltipService
 } from '@syncfusion/ej2-angular-charts'


import { Component, OnInit } from '@angular/core';
import { columnData } from './datasource';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, DateTimeService, ScrollBarService, LineSeriesService, ColumnSeriesService,
        ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService,],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='gold' name='Gold' [border]='border' [cornerRadius]='cornerRadius'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public border?: Object;
    public border?: Object;
    primaryYAxis: any;
    ngOnInit(): void {
        this.chartData = columnData;
        this.primaryXAxis = {
           valueType: 'Category',
           title: 'Countries'
        };
        this.border = { width: 2, color: '#FFA500', dashArray: '2,5' };
        this.cornerRadius = {
          bottomLeft: 10,
          bottomRight: 10,
          topLeft: 10,
          topRight: 10
        };
        this.title = 'Olympic Medals';
    }

}

```

**Line Series Customization:**
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
            <e-series [dataSource]='chartData' type='Line' xName='x' yName='y' fill='#4169E1' width='3' dashArray='5,5'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public chartData?: Object[];
    public title?: string;
     public primaryXAxis?: Object;
      public primaryYAxis?: Object;
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
    }

}
```

**Area Series with Gradient:**
```typescript
import { ChartModule, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { AreaSeriesService, TooltipService, CategoryService, LegendService } from '@syncfusion/ej2-angular-charts';
import { Component, OnInit } from '@angular/core';
import { energyConsumptionData } from './datasource';

@Component({
    imports: [ChartModule, ChartAllModule],
    providers: [AreaSeriesService, CategoryService, LegendService, TooltipService],
    standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title' [legendSettings]='legendSettings' [tooltip]='tooltip'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Area' xName='year' yName='oil' name='Oil' fill='url(#oilGradient)'></e-series>
            <e-series [dataSource]='chartData' type='Area' xName='year' yName='coal' name='Coal' fill='url(#coalGradient)'></e-series>
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
        this.chartData = energyConsumptionData;
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

```html
    <svg>
        <defs>
            <linearGradient id="oilGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#2F1B14;stop-opacity:0.9" />
                <stop offset="40%" style="stop-color:#8B4513;stop-opacity:0.8" />
                <stop offset="80%" style="stop-color:#CD853F;stop-opacity:0.7" />
                <stop offset="100%" style="stop-color:#F4A460;stop-opacity:0.8" />
                </linearGradient>

            <linearGradient id="coalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#0F0F0F;stop-opacity:0.9" />
                <stop offset="30%" style="stop-color:#2F2F2F;stop-opacity:0.8" />
                <stop offset="70%" style="stop-color:#4F4F4F;stop-opacity:0.7" />
                <stop offset="100%" style="stop-color:#696969;stop-opacity:0.8" />
            </linearGradient>
        </defs>
    </svg>
```

### Point-Level Customization

Use `pointRender` event for dynamic point styling:

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService, LegendService, DataLabelService, MultiLevelLabelService, SelectionService } from '@syncfusion/ej2-angular-charts'
import { IPointRenderEventArgs } from '@syncfusion/ej2-charts';

@Component({
  imports: [ ChartModule ],
  providers: [ CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService,LegendService, DataLabelService, MultiLevelLabelService, SelectionService],
  standalone: true,
  template: `
    <ejs-chart id="chart-container" (pointRender)='pointRender($event)' [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='gold' name='Gold'></e-series>
        </e-series-collection>
    </ejs-chart>
  `
})
})
export class ChartComponent {
  public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    pointRender(args: IPointRenderEventArgs): void {
    // Conditional coloring based on value
    if (args.point.gold > 50) {
      args.fill = '#00C853';  // Green for high values
    } else if (args.point.gold < 20) {
      args.fill = '#FF1744';  // Red for low values
    } else {
      args.fill = '#FFC107';  // Yellow for medium values
    }
    
    // Custom border
    args.border = {
        width: 2,
        color: '#000000'
      };
    }
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

**Highlight Specific Points:**
```typescript
pointRender(args: IPointRenderEventArgs): void {
  // Highlight maximum value
  if (args.point.y === Math.max(...this.data.map(d => d.y))) {
    args.fill = '#FF4081';
    args.border = { width: 3, color: '#C51162' };
  }
  
  // Different shapes for ranges
  if (args.point.y > 75) {
    args.shape = 'Diamond';
  }
}
```

### Marker Customization

Enhance data points with custom markers:

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
            <e-series [dataSource]='chartData' type='Line' xName='x' yName='y' [marker]='markerSettings' [emptyPointSettings]='emptyPointSettings'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public chartData?: Object[];
    public title?: string;
     public primaryXAxis?: Object;
      public primaryYAxis?: Object;
      public emptyPointSettings?: Object;
      public markerSettings?: Object;
    ngOnInit(): void {
        this.chartData = lineData;
        this.primaryXAxis = {
            interval: 1, valueType: 'Category'
        };
        this.primaryYAxis =
        {
            title: 'Expense',
        },
        this.markerSettings = {
          visible: true,
          shape: 'Circle',  // Circle, Rectangle, Triangle, Diamond, Pentagon, etc.
          width: 10,
          height: 10,
          fill: '#FF6347',
          border: {
            width: 2,
            color: '#FFFFFF'
          },
          imageUrl: 'path/to/custom-marker.png'  // Use custom image
          };
        this.title = 'Efficiency of oil-fired power production';
        this.emptyPointSettings = {
            mode: 'Zero',
            fill: 'red'
        }
    }
}
```

**Dynamic Marker Shapes:**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, LineSeriesService, StepLineSeriesService, SplineSeriesService, StackingLineSeriesService, DateTimeService,
    SplineAreaSeriesService, MultiColoredLineSeriesService, ParetoSeriesService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts'
import { IPointRenderEventArgs } from '@syncfusion/ej2-charts';
import { Component, OnInit } from '@angular/core';
import { lineData } from './datasource';

@Component({
imports: [ ChartModule ],
providers: [ CategoryService, LineSeriesService, StepLineSeriesService, SplineSeriesService, StackingLineSeriesService, DateTimeService,
        SplineAreaSeriesService, MultiColoredLineSeriesService, ParetoSeriesService, ColumnSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" (pointRender)='pointRender($event)' [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis'
    [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='lineData' type='Line' xName='x' yName='y' [marker]='markerSettings' [emptyPointSettings]='emptyPointSettings'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public chartData?: Object[];
    public title?: string;
     public primaryXAxis?: Object;
      public primaryYAxis?: Object;
      public emptyPointSettings?: Object;
      public markerSettings?: Object;
      pointRender(args: IPointRenderEventArgs): void {
      // Different shapes based on data
      if (args.point.y > 60) {
        args.shape = 'Triangle';
      } else if (args.point.y > 30) {
        args.shape = 'Circle';
      } else {
        args.shape = 'InvertedTriangle';
      }
    }
    ngOnInit(): void {
        this.chartData = lineData;
        this.primaryXAxis = {
            interval: 1, valueType: 'Category'
        };
        this.primaryYAxis =
        {
            title: 'Expense',
        },
        this.markerSettings = {
          visible: true,
          shape: 'Circle',  // Circle, Rectangle, Triangle, Diamond, Pentagon, etc.
          width: 10,
          height: 10,
          fill: '#FF6347',
          border: {
            width: 2,
            color: '#FFFFFF'
          },
          imageUrl: 'path/to/custom-marker.png'  // Use custom image
          };
        this.title = 'Efficiency of oil-fired power production';
        this.emptyPointSettings = {
            mode: 'Zero',
            fill: 'red'
        }
    }
}
```

## Text and Label Customization

### Data Labels

Customize labels displayed on data points:

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
            <e-series [dataSource]='chartData' type='Line' xName='x' yName='y' [marker]='marker' [emptyPointSettings]='emptyPointSettings'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public chartData?: Object[];
    public title?: string;
    public primaryXAxis?: Object;
    public primaryYAxis?: Object;
    public emptyPointSettings?: Object;
    public marker?: Object;
    ngOnInit(): void {
      this.chartData = lineData;
      this.primaryXAxis = {
          interval: 1, valueType: 'Category'
      };
      this.primaryYAxis =
      {
          title: 'Expense',
      },
      this.marker = {
          dataLabel: {
          visible: true,
          template: '<div style="padding:5px; background:#4CAF50; color:white; border-radius:3px;">${point.y}K</div>'
        }
      };
      this.title = 'Efficiency of oil-fired power production';
      this.emptyPointSettings = {
          mode: 'Zero',
          fill: 'red'
      }
    }
}
```

**Custom Label Text:**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateTimeService, CategoryService, LineSeriesService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts'
import { LegendService, DataLabelService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { columnData } from './datasource';
import { ITextRenderEventArgs } from '@syncfusion/ej2-charts';
@Component({
imports: [ ChartModule ],
providers: [ DateTimeService, LineSeriesService, LegendService, DataLabelService, ColumnSeriesService, CategoryService ],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='x' yName='y' name='Warmest' width=2 [marker]='marker'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    public marker?: Object;
    textRender(args: ITextRenderEventArgs): void {
      // Add currency symbol
      args.text = '$' + args.text;
      
      // Format numbers
      args.text = parseFloat(args.text).toFixed(2) + '%';
      
      // Conditional formatting
      if (parseFloat(args.text) < 0) {
        args.color = '#FF0000';
        args.text = '(' + Math.abs(parseFloat(args.text)) + ')';
      }
    }
    ngOnInit(): void {
        this.chartData = columnData;
        this.primaryXAxis = {
            valueType: 'Category'
        };
        this.marker = { dataLabel: { visible: true, position: 'Middle' }
        };
        this.title = 'Alaska Weather Statistics - 2016';
    }

}
```

### Axis Labels

Style axis labels:

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
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'
    [legendSettings]='legendSettings'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='gold' name='Gold' ></e-series>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='silver' name='Silver'></e-series>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='bronze' name='Bronze' ></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    public legendSettings: Object = { visible: false};
    ngOnInit(): void {
        this.chartData = categoryData;
        this.primaryXAxis = {
           valueType: 'Category',
           title: 'Countries',
           labelStyle: {
            color: '#424242',
            size: '12px',
            fontFamily: 'Segoe UI',
            fontWeight: '500'
          },
          labelRotation: -45,  // Rotate labels
          labelIntersectAction: 'Rotate45'  // Handle overlapping
        };
        this.primaryYAxis = {
           minimum: 0, maximum: 80,
           interval: 20, title: 'Medals',
           labelFormat: '${value}K',
           titleStyle: {
            size: '16px', color: 'grey',
            fontFamily : 'Segoe UI', fontWeight : 'bold'
           },
           labelStyle: {
            size: '14px', color: 'blue',
            fontFamily : 'Segoe UI', fontWeight : 'bold'
           },
           edgeLabelPlacement: 'Shift'
        };
        this.title = 'Olympic Medals';
    }

}
```

**Custom Axis Label Rendering:**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService, LegendService, DataLabelService, MultiLevelLabelService, SelectionService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { categoryData } from './datasource';
import { IAxisLabelRenderEventArgs } from '@syncfusion/ej2-angular-charts';
@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService,LegendService, DataLabelService, MultiLevelLabelService, SelectionService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title' (axisLabelRender) = 'axisLabelRender($event)'
    [legendSettings]='legendSettings'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='gold' name='Gold' ></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public legendSettings: Object = { visible: false};
    primaryYAxis: any;
    public axisLabelRender(args : IAxisLabelRenderEventArgs ): void {
        if(args.text === 'France') {
            args.labelStyle.color = 'Red';
        }
    };
    ngOnInit(): void {
        this.chartData = categoryData;
        this.primaryXAxis = {
           valueType: 'Category',
           title: 'Countries'
        };
        this.title = 'Olympic Medals';
    }
}
```

### Title and Subtitle

Customize chart title and subtitle:

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateTimeService, StepLineSeriesService, LegendService, CategoryService, LineSeriesService } from '@syncfusion/ej2-angular-charts'
import { TooltipService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [ ChartModule ],
providers: [ TooltipService, DateTimeService, StepLineSeriesService, LegendService, CategoryService, LineSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title' [titleStyle]='titleStyle' [subTitle]='subTitle' [subTitleStyle]='subTitleStyle'>
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
    public subTitle?: string;
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
        this.titleStyle = {
            fontFamily: "Arial",
            fontStyle: 'italic',
            fontWeight: 'regular',
            color: "#E27F2D",
            size: '23px'
        }
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

## Animation Settings

Control chart animations:

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
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='gold' name='Gold' [border]='border' [animation]='animation'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    public border?: Object;
    public animation?: Object;
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
        this.animation = { enable: true, 
          duration: 1500,  // milliseconds
          delay: 100       // delay before animation starts};
    }

}
```

**Different Animations Per Series:**
```typescript
import { Component, OnInit } from '@angular/core';
import { ChartAllModule} from '@syncfusion/ej2-angular-charts';
import { LineSeriesService, CategoryService, DataLabelService, LegendService } from '@syncfusion/ej2-angular-charts';

import { vietnamData, indonesiaData, franceData, polandData, mexicoData } from './datasource';

@Component({
    imports: [
        ChartAllModule
    ],
    providers: [LineSeriesService, CategoryService, DataLabelService, LegendService],
    standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="charts" [primaryXAxis]="primaryXAxis" [legendSettings]="legendSettings">
        <e-series-collection>
            <e-series [dataSource]="vietnamData" type="Line" xName="x" yName="y" name="Vietnam"
                [marker]="marker" [labelSettings]="labelSettings">
                </e-series>
            <e-series [dataSource]="indonesiaData" type="Line" xName="x" yName="y" name="Indonesia"
                [marker]="marker" [labelSettings]="labelSettings">
                </e-series>
            <e-series [dataSource]="franceData" type="Line" xName="x" yName="y" name="France"
                [marker]="marker" [labelSettings]="labelSettings">
                </e-series>
            <e-series [dataSource]="polandData" type="Line" xName="x" yName="y" name="Poland"
                [marker]="marker" [labelSettings]="labelSettings">
                </e-series>
            <e-series [dataSource]="mexicoData" type="Line" xName="x" yName="y" name="Mexico"
                [marker]="marker" [labelSettings]="labelSettings">
                </e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public legendSettings?: Object;
    public marker?: Object;
    public labelSettings?: Object;

    public vietnamData?: Object[];
    public indonesiaData?: Object[];
    public franceData?: Object[];
    public polandData?: Object[];
    public mexicoData?: Object[];
    public series1Animation: Object;
    public series2Animation: Object;

    ngOnInit(): void {
        this.vietnamData = vietnamData;
        this.indonesiaData = indonesiaData;
        this.franceData = franceData;
        this.polandData = polandData;
        this.mexicoData = mexicoData;
        this.series1Animation = {
          enable: true,
          duration: 1000,
          delay: 0
        };
        this.series2Animation = {
          enable: true,
          duration: 1000,
          delay: 500  // Start after first series
        };

        this.primaryXAxis = {
            valueType: 'Category'
        };

        this.legendSettings = {
            visible: true
        };

        this.marker = {
            visible: true
        };

        this.labelSettings= {
            visible: true
        };
    }
}
```

**Disable Animation for Performance:**
```typescript
// For charts with many data points
public animation: Object = {
  enable: false
};
```

## Responsive Design

Make charts responsive to different screen sizes:

```typescript

import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, LineSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [ ChartModule ],
providers: [ CategoryService, LineSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' width='chartWidth' height='chartHeight'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Line' xName='month' yName='sales' name='Sales'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public chartWidth: string = '100%';
    public chartHeight: string = '400px';
     @HostListener('window:resize')
    onResize() {
      const width = window.innerWidth;
      
      if (width < 576) {
        // Mobile
        this.chartHeight = '300px';
        this.margin = { left: 10, right: 10, top: 20, bottom: 40 };
        this.primaryXAxis.labelRotation = -45;
      } else if (width < 768) {
        // Tablet
        this.chartHeight = '350px';
        this.margin = { left: 20, right: 20, top: 30, bottom: 40 };
        this.primaryXAxis.labelRotation = 0;
      } else {
        // Desktop
        this.chartHeight = '400px';
        this.margin = { left: 40, right: 40, top: 40, bottom: 40 };
        this.primaryXAxis.labelRotation = 0;
      }
    }
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
        this.onResize();  // Set initial size
    }
}
```

**CSS Media Queries:**
```css
/* chart.component.css */
.chart-container {
  width: 100%;
  padding: 20px;
}

@media (max-width: 768px) {
  .chart-container {
    padding: 10px;
  }
  
  .e-chart .e-chart-title {
    font-size: 14px !important;
  }
  
  .e-chart .e-axis-label {
    font-size: 10px !important;
  }
}

@media (max-width: 576px) {
  .chart-container {
    padding: 5px;
  }
  
  .e-chart .e-chart-title {
    font-size: 12px !important;
  }
}
```

## CSS Customization

### Global Chart Styles

Override default styles:

```css
/* styles.css or component.css */

/* Chart background */
.e-chart {
  background: linear-gradient(to bottom, #f5f7fa 0%, #c3cfe2 100%);
  font-family: 'Roboto', sans-serif;
}

/* Title styling */
.e-chart .e-chart-title {
  font-size: 20px;
  font-weight: 700;
  fill: #2c3e50;
}

/* Axis lines */
.e-chart .e-axis-line {
  stroke: #95a5a6;
  stroke-width: 1;
}

/* Grid lines */
.e-chart .e-grid-line {
  stroke: #ecf0f1;
  stroke-dasharray: 3, 3;
}

/* Legend */
.e-chart .e-legend-text {
  font-size: 12px;
  fill: #34495e;
}

/* Tooltip */
.e-chart .e-tooltip-wrap {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 4px;
  padding: 8px;
}
```

### Component-Level Styling

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { ChartAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [ChartAllModule],
    standalone: true,
    selector: 'app-container',
    // specifies the template string for the Charts component
    template: `<ejs-chart id='chart-container'></ejs-chart>`,
    encapsulation: ViewEncapsulation.None,
    styles: [`
    .custom-chart {
      border: 2px solid #3498db;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
  `]
})
export class AppComponent { }
```

## Dynamic Styling

Change styles programmatically:

```typescript
export class DynamicChartComponent {
  @ViewChild('chart') chart: ChartComponent;
  
  applyDarkMode(): void {
    this.chart.background = '#2C3E50';
    this.chart.primaryXAxis.labelStyle.color = '#ECF0F1';
    this.chart.primaryYAxis.labelStyle.color = '#ECF0F1';
    this.chart.titleStyle.color = '#FFFFFF';
    this.chart.refresh();
  }
  
  applyLightMode(): void {
    this.chart.background = '#FFFFFF';
    this.chart.primaryXAxis.labelStyle.color = '#2C3E50';
    this.chart.primaryYAxis.labelStyle.color = '#2C3E50';
    this.chart.titleStyle.color = '#2C3E50';
    this.chart.refresh();
  }
}
```

## Best Practices

1. **Maintain Consistency:**
   - Use consistent colors across related charts
   - Follow your brand guidelines
   - Keep font styles uniform

2. **Accessibility:**
   - Ensure sufficient color contrast (WCAG AA: 4.5:1 minimum)
   - Don't rely solely on color to convey information
   - Provide alternative text for screen readers

3. **Performance:**
   - Disable animations for charts with many points
   - Use CSS for static styles instead of inline styles
   - Minimize DOM manipulation

4. **Responsive Design:**
   - Test on multiple screen sizes
   - Use relative units (%, em) where appropriate
   - Adjust label rotations for mobile

5. **Theming:**
   - Use Theme Studio for cohesive themes
   - Keep custom themes in separate files
   - Document custom color codes

## Advanced Customization

### Custom Series Rendering

```typescript
import { ChartComponent } from '@syncfusion/ej2-angular-charts';

export class CustomChartComponent {
  @ViewChild('chart') chart: ChartComponent;
  
  ngAfterViewInit() {
    // Access SVG elements
    let seriesElements = document.querySelectorAll('.e-series-0');
    seriesElements.forEach((element: HTMLElement) => {
      element.style.filter = 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))';
    });
  }
}
```

### Conditional Rendering

```typescript
seriesRender(args: ISeriesRenderEventArgs): void {
  if (args.series.name === 'Actual') {
    args.fill = this.actualColor;
  } else if (args.series.name === 'Forecast') {
    args.fill = this.forecastColor;
    args.dashArray = '5,5';
  }
}
```

## Troubleshooting

### Theme Not Applying

**Issue:** Theme styles not visible
**Solutions:**
- Verify CSS import order
- Check for CSS specificity conflicts
- Ensure theme CSS is loaded before component
- Clear browser cache

### Colors Not Changing

**Issue:** Custom colors not applied
**Solutions:**
- Check property names (case-sensitive)
- Verify color format (hex, rgb, rgba)
- Use `refresh()` after programmatic changes
- Check event timing (use `loaded` event)

### Performance Issues

**Issue:** Slow rendering with custom styles
**Solutions:**
- Move styles to CSS instead of inline
- Reduce DOM manipulations
- Use CSS classes instead of inline styles
- Disable animations for large datasets

---
