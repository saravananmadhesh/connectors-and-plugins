# Advanced Features & How-tos

**API Reference:** [references/api-reference.md](references/api-reference.md)

## Table of Contents
- [Table of Contents](#table-of-contents)
- [EJ1 to EJ2 Migration](#ej1-to-ej2-migration)
  - [Key Changes Summary](#key-changes-summary)
  - [Complete Migration Example](#complete-migration-example)
    - [EJ1 Code](#ej1-code)
    - [EJ2 Code](#ej2-code)
  - [Migration Checklist](#migration-checklist)
- [Custom Tooltip Templates](#custom-tooltip-templates)
  - [Basic Custom Template](#basic-custom-template)
  - [Tooltip with Calculated Values](#tooltip-with-calculated-values)
  - [Format Data in Tooltip](#format-data-in-tooltip)
- [Legend Customization](#legend-customization)
  - [Legend Configuration](#legend-configuration)
  - [Dynamic Legend Updates](#dynamic-legend-updates)
- [Performance Optimization](#performance-optimization)
  - [Data Aggregation](#data-aggregation)
  - [Canvas Rendering for Large Datasets](#canvas-rendering-for-large-datasets)
  - [Lazy Loading Pattern](#lazy-loading-pattern)
- [Selection with Data Updates](#selection-with-data-updates)
  - [Selection-Triggered Details](#selection-triggered-details)
- [Multi-dimensional Data](#multi-dimensional-data)
  - [3D Data via Bubble Size](#3d-data-via-bubble-size)
  - [Layered Heatmaps](#layered-heatmaps)

## EJ1 to EJ2 Migration

Guide for migrating from Syncfusion EJ1 HeatMap to EJ2.

### Key Changes Summary

| EJ1 | EJ2 | Notes |
|-----|-----|-------|
| `ej-heatmap` | `ejs-heatmap` | Component tag changed |
| `itemsSource` | `[dataSource]` | Property binding syntax |
| `colorMappingCollection` | `paletteSettings` | Color configuration restructured |
| `heatmapCell.showContent` | `cellSettings.showLabel` | Same property |
| Older templating | Interpolation syntax | Uses Angular template syntax |

### Complete Migration Example

#### EJ1 Code

```typescript
// EJ1 - Old approach
declare let ejHeatMap: any;

ngAfterViewInit() {
    $('#heatmap').ejHeatmap({
        datasource: this.data,
        colorMappings: [
            { value: 0, color: '#FF0000' },
            { value: 100, color: '#00FF00' }
        ]
    });
}
```

#### EJ2 Code

```typescript
// EJ2 - New approach
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HeatMapModule} from '@syncfusion/ej2-angular-heatmap'
import { LegendService} from '@syncfusion/ej2-angular-heatmap'
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
imports: [ HeatMapModule ],
providers: [ LegendService],
standalone: true,
selector: 'my-app',
template:
    `<ejs-heatmap id='container' style="display:block;" [dataSource]='dataSource' [xAxis]='xAxis' [yAxis]='yAxis'
    [titleSettings]='titleSettings' [paletteSettings]='paletteSettings' [legendSettings]='legendSettings'>
    </ejs-heatmap>`,
encapsulation: ViewEncapsulation.None
})
export class AppComponent{

dataSource: Object[] = [
    [73, 39, 26, 39, 94, 0],
    [93, 58, 53, 38, 26, 68],
    [99, 28, 22, 4, 66, 90],
    [14, 26, 97, 69, 69, 3],
    [7, 46, 47, 47, 88, 6],
    [41, 55, 73, 23, 3, 79],
    [56, 69, 21, 86, 3, 33],
    [45, 7, 53, 81, 95, 79],
    [60, 77, 74, 68, 88, 51],
    [25, 25, 10, 12, 78, 14],
    [25, 56, 55, 58, 12, 82],
    [74, 33, 88, 23, 86, 59]];

    titleSettings: Object = {
        text: 'Sales Revenue per Employee (in 1000 US$)',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'Segoe UI'
        }
    };
    xAxis: Object = {
        labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven',
        'Michael', 'Robert', 'Laura', 'Anne', 'Paul', 'Karin',   'Mario'],
    };
    yAxis: Object = {
        labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
    };
    public paletteSettings: Object = {
            palette: [
            { color: '#C06C84'},
            { color: '#6C5B7B'},
            { color: '#355C7D'}
        ],
        type: "Gradient"
    };
    public legendSettings: Object = {
        visible: true,
    };
 }
```

### Migration Checklist

- [ ] Update imports: `HeatMapModule` from `@syncfusion/ej2-angular-heatmap`
- [ ] Convert jQuery initialization to component template
- [ ] Update property binding: `itemsSource` → `[dataSource]`
- [ ] Migrate `colorMappingCollection` → `paletteSettings`
- [ ] Update event handlers: `cellClick` → `(cellClick)`
- [ ] Test data binding and rendering
- [ ] Verify accessibility features work
- [ ] Update component styling

## Custom Tooltip Templates

Create rich, interactive tooltips with custom templates.

### Basic Custom Template

```typescript
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HeatMapModule} from '@syncfusion/ej2-angular-heatmap'
import { TooltipService} from '@syncfusion/ej2-angular-heatmap'
import { Component, ViewEncapsulation } from '@angular/core';
import { ITooltipEventArgs } from '@syncfusion/ej2-angular-heatmap';

@Component({
imports: [ HeatMapModule ],
providers: [TooltipService],
standalone: true,
selector: 'my-app',
template:
    `<ejs-heatmap id='container' style="display:block;" [dataSource]='dataSource' [xAxis]='xAxis'  [yAxis]='yAxis'
    [titleSettings]='titleSettings' [cellSettings]='cellSettings' (tooltipRender)='tooltipRender($event)'>
    </ejs-heatmap>`,
encapsulation: ViewEncapsulation.None
})
export class AppComponent{
    dataSource: Object[] = [
        [0.72, 0.71, 0.71, 0.67, 0.72, 0.53, 0.53, 0.56, 0.58, 0.56],
        [2.28, 2.29, 2.09, 1.84, 1.64, 1.49, 1.49, 1.39, 1.32, 1.23],
        [2.02, 2.17, 2.30, 2.39, 2.36, 2.52, 2.62, 2.57, 2.57, 2.74],
        [3.21, 3.26, 3.45, 3.47, 3.42, 3.34, 3.14, 2.83, 2.64, 2.61],
        [3.22, 3.13, 3.04, 2.95, 2.69, 2.49, 2.27, 2.18, 2.06, 1.87],
        [3.30, 3.39, 3.40, 3.48, 3.60, 3.67, 3.73, 3.79, 3.79, 4.07],
        [5.80, 5.74, 5.64, 5.44, 5.18, 5.08, 5.07, 5.00, 5.35, 5.47],
        [6.91, 7.40, 8.13, 8.80, 9.04, 9.24, 9.43, 9.35, 9.49, 9.69]];

     titleSettings: Object = {
        text: 'Crude Oil Production of Non-OPEC Countries (in Million barrels per day)',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'Segoe UI'
        }
    };
    xAxis: Object = {
        labels: ['Canada', 'China', 'Egypt', 'Mexico', 'Norway', 'Russia', 'UK', 'USA']
    };
    yAxis: Object = {
            labels: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010'],
    };
    public cellSettings: Object = {
        showLabel: false,
    };
    public showTooltip: Boolean = true;
    public tooltipRender(args: ITooltipEventArgs): void {
        args.content = ['In ' + args.yLabel + ', the ' + args.xLabel + ' produced ' + args.value + ' million barrels per day'];
    };
 }
```

### Tooltip with Calculated Values

```typescript
tooltipSettings: Object = {
    template: '<div>' +
        '<b>${xValue} - ${yValue}</b><br/>' +
        'Revenue: $${value}<br/>' +
        'Growth: <span style="color: ${value > 45000 ? "green" : "red"}">' +
        '${value > 45000 ? "↑ High" : "↓ Low"}' +
        '</span>' +
        '</div>'
};
```

### Format Data in Tooltip

```typescript
tooltipSettings: Object = {
    template: (args: any) => {
        // Access raw data
        const dataItem = args.data;
        return `
            <div class='tooltip-content'>
                <p><strong>${args.xValue}</strong> - <strong>${args.yValue}</strong></p>
                <p>Sales: $${this.formatNumber(args.value)}</p>
                <p>Units: ${dataItem.Units}</p>
                <p>Avg: ${(args.value / dataItem.Units).toFixed(2)}</p>
            </div>
        `;
    }
};

formatNumber(num: number): string {
    return num.toLocaleString('en-US');
}
```

## Legend Customization

Advanced legend configuration and styling.

### Legend Configuration

```typescript
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HeatMapModule} from '@syncfusion/ej2-angular-heatmap'
import { LegendService} from '@syncfusion/ej2-angular-heatmap'
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
imports: [ HeatMapModule ],
providers: [ LegendService ],
standalone: true,
selector: 'my-app',
template:
    `<ejs-heatmap id='container' style="display:block;" [dataSource]='dataSource' [xAxis]='xAxis'  [yAxis]='yAxis' [titleSettings]='titleSettings' [paletteSettings}='paletteSettings' [legendSettings]='legendSettings' [cellSettings]='cellSettings'>
    </ejs-heatmap>`,
encapsulation: ViewEncapsulation.None
})
export class AppComponent{

    dataSource: Object[] = [
        [73, 39, 26, 39, 94, 0],
        [93, 58, 53, 38, 26, 68],
        [99, 28, 22, 4, 66, 90],
        [14, 26, 97, 69, 69, 3],
        [7, 46, 47, 47, 88, 6],
        [41, 55, 73, 23, 3, 79],
        [56, 69, 21, 86, 3, 33],
        [45, 7, 53, 81, 95, 79],
        [60, 77, 74, 68, 88, 51],
        [25, 25, 10, 12, 78, 14],
        [25, 56, 55, 58, 12, 82],
        [74, 33, 88, 23, 86, 59]
    ];

    titleSettings: Object = {
        text: 'Sales Revenue per Employee (in 1000 US$)',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'Segoe UI'
            }
        };
    xAxis: Object = {
        labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven',
        'Michael', 'Robert', 'Laura', 'Anne', 'Paul', 'Karin',   'Mario'],
    };
    yAxis: Object = {
        labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
    };
    public cellSettings: Object = {
        showLabel: false,
    };
    public paletteSettings: Object = {
    palette: [
        { value: 0, color: '#C2E7EC' },
        { value: 10, color: '#AEDFE6' },
        { value: 20, color: '#9AD7E0' },
        { value: 30, color: '#72C7D4' },
        { value: 40, color: '#5EBFCE' },
        { value: 50, color: '#4AB7C8' },
        { value: 60, color: '#309DAE' },
        { value: 70, color: '#2B8C9B' },
        { value: 80, color: '#206974' },
        { value: 90, color: '#15464D' },
        { value: 100, color: '#000000' },
    ],
    };
    public legendSettings: Object = {
        position: 'Right',
    };
}
```

### Dynamic Legend Updates

```typescript
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { HeatMapModule, LegendService } from '@syncfusion/ej2-angular-heatmap';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [HeatMapModule],
  providers: [LegendService],
  template: `
    <div>
      <button (click)="updateLegend()">Update Legend</button>
      <ejs-heatmap 
        #heatmap 
        [dataSource]="dataSource" 
        [xAxis]="xAxis"  
        [yAxis]="yAxis" 
        [legendSettings]="legendSettings">
      </ejs-heatmap>
    </div>
  `,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  dataSource: number[][] = [
    [73, 39, 26, 39, 94, 0],
    [93, 58, 53, 38, 26, 68],
    [99, 28, 22, 4, 66, 90],
    [14, 26, 97, 69, 69, 3],
    [7, 46, 47, 47, 88, 6],
    [41, 55, 73, 23, 3, 79],
    [56, 69, 21, 86, 3, 33],
    [45, 7, 53, 81, 95, 79],
    [60, 77, 74, 68, 88, 51],
    [25, 25, 10, 12, 78, 14],
    [25, 56, 55, 58, 12, 82],
    [74, 33, 88, 23, 86, 59]
  ];

  xAxis: Object = { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] };
  yAxis: Object = { labels: ['2010', '2011', '2012', '2013', '2014', '2015'] };

  legendSettings: Object = {
    position: 'Right'
  };

  updateLegend() {
    this.legendSettings = { position: 'Bottom' };
  }
}
```

## Performance Optimization

Optimize heatmap for large datasets.

### Data Aggregation

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMapModule, TooltipService } from '@syncfusion/ej2-angular-heatmap';

// ✅ Define interface for raw data points
interface DataPoint {
  category: string;
  value: number;
}

// ✅ Define interface for aggregated data points
interface AggregatedPoint {
  x: number;
  y: string;
  value: number;
}

@Component({
  selector: 'my-app',
  imports: [HeatMapModule],
  providers:[TooltipService],
  standalone: true, 
  template: `
    <ejs-heatmap id="heatmap"
      [dataSource]="aggregatedData"
      renderingMode="Canvas">
    </ejs-heatmap>
  `,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  rawData: DataPoint[] = [];
  aggregatedData: AggregatedPoint[] = [];

  ngOnInit() {
    // Load and aggregate large dataset
    this.rawData = this.loadLargeDataset();
    this.aggregatedData = this.aggregateData();
  }

  aggregateData(): AggregatedPoint[] {
    const aggregated: AggregatedPoint[] = [];
    const groupSize = 10;

    for (let i = 0; i < this.rawData.length; i += groupSize) {
      const group = this.rawData.slice(i, i + groupSize);
      const avg =
        group.reduce((sum, item) => sum + item.value, 0) / group.length;

      aggregated.push({
        x: Math.floor(i / groupSize),
        y: group[0].category,
        value: avg
      });
    }

    return aggregated;
  }

  loadLargeDataset(): DataPoint[] {
    // Simulate loading 100k+ records
    const data: DataPoint[] = [];
    for (let i = 0; i < 10000; i++) {
      data.push({
        category: `Cat${Math.floor(i / 1000)}`,
        value: Math.random() * 100
      });
    }
    return data;
  }
}
```

### Canvas Rendering for Large Datasets

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMapModule } from '@syncfusion/ej2-angular-heatmap';

@Component({
  selector: 'my-app',
  standalone: true,              // standalone component
  imports: [HeatMapModule],
  template: `
    <ejs-heatmap id="heatmap"
      [dataSource]="dataSource"
      renderingMode="Canvas"
      [xAxis]="xAxis"
      [yAxis]="yAxis">
    </ejs-heatmap>
  `,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  dataSource: { x: number; y: number; value: number }[] = [];

  // ✅ Moved axis configs into class
  xAxis = { type: 'Numeric', minimum: 0, maximum: 999 };
  yAxis = { type: 'Numeric', minimum: 0, maximum: 999 };

  ngOnInit() {
    // Generate 1 million data points
    for (let x = 0; x < 1000; x++) {
      for (let y = 0; y < 1000; y++) {
        this.dataSource.push({
          x: x,
          y: y,
          value: Math.random() * 100
        });
      }
    }
    // Canvas mode will be auto-selected for performance
  }
}
```

### Lazy Loading Pattern

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { HeatMapComponent, HeatMapModule, TooltipService, LegendService } from '@syncfusion/ej2-angular-heatmap';

@Component({
    selector: 'my-app',
    standalone: true, // Required for the imports array below
    imports: [HeatMapModule],
    providers: [TooltipService, LegendService],
    template: `
        <div class="control-section">
            <button (click)='loadMore()' style="margin-bottom: 10px;">Load More Data</button>
            <ejs-heatmap #heatmap 
                [dataSource]='displayData'
                [dataSourceSettings]='dataSourceSettings'
                [xAxis]='xAxis' 
                [yAxis]='yAxis'>
            </ejs-heatmap>
        </div>
    `
})
export class AppComponent implements OnInit {
    @ViewChild('heatmap') heatmapObj!: HeatMapComponent;

    allData: any[] = [];
    displayData: any[] = [];
    pageSize: number = 100;
    currentPage: number = 0;

    // Define data mapping for JSON objects
    public dataSourceSettings = {
        isJsonData: true,
        adaptorType: 'Cell',
        xDataMapping: 'x',
        yDataMapping: 'y',
        valueMapping: 'value'
    };

    public xAxis = { labels: ['0', '25', '50', '75', '99'] };
    public yAxis = { labels: ['0', '2', '4', '6', '8', '9'] };

    ngOnInit() {
        this.allData = this.generateData(1000);
        this.loadNextPage();
    }

    loadNextPage() {
        const start = 0; // Cumulative loading
        const end = (this.currentPage + 1) * this.pageSize;
        
        if (end <= this.allData.length) {
            // Update displayData with a new reference to trigger change detection
            this.displayData = [...this.allData.slice(start, end)];
            this.currentPage++;
            
            // Safety refresh if manual update is needed
            if (this.heatmapObj) {
                //this.heatmapObj.refresh();
            }
        }
    }

    loadMore() {
        this.loadNextPage();
    }

    generateData(count: number): any[] {
        const data = [];
        for (let i = 0; i < count; i++) {
            data.push({
                x: (i % 100).toString(),
                y: Math.floor(i / 100).toString(),
                value: Math.floor(Math.random() * 100)
            });
        }
        return data;
    }
}
```

## Selection with Data Updates

Handle cell selection and respond with data updates.

### Selection-Triggered Details

```typescript
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeatMapComponent, HeatMapModule, TooltipService, LegendService } from '@syncfusion/ej2-angular-heatmap';

@Component({
    selector: 'my-app',
    standalone: true,
    imports: [HeatMapModule, CommonModule],
    providers: [TooltipService, LegendService],
    template: `
        <div style='display: flex; gap: 20px; padding: 20px; font-family: Segoe UI, sans-serif;'>
            <div style='flex: 1; border: 1px solid #ddd; padding: 10px;'>
                <h3>Heatmap</h3>
                <ejs-heatmap #heatmap 
                    [dataSource]='dataSource'
                    [xAxis]='xAxis'
                    [yAxis]='yAxis'
                    [allowSelection]='true'
                    (cellSelected)='onCellSelect($event)'>
                </ejs-heatmap>
            </div>
            
            <div style='flex: 1; border: 1px solid #ddd; padding: 10px; background: #f9f9f9;'>
                <h3>Details for {{ selectedX || '...' }} - {{ selectedY || '...' }}</h3>
                <div *ngIf='selectedDetails; else noSelection'>
                    <p><strong>Value:</strong> {{ selectedDetails.value }}</p>
                    <p><strong>Status:</strong> {{ selectedDetails.status }}</p>
                    <p><strong>Trend:</strong> {{ selectedDetails.trend }}</p>
                </div>
                <ng-template #noSelection>
                    <p style="color: #666;">Click a cell to see specific details.</p>
                </ng-template>
            </div>
        </div>
    `,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    @ViewChild('heatmap') heatmapObj!: HeatMapComponent;

    // Use the provided 2D number array
    public dataSource: number[][] = [
        [73, 39, 26, 39, 94, 0],
        [93, 58, 53, 38, 26, 68],
        [99, 28, 22, 4, 66, 90],
        [14, 26, 97, 69, 69, 3],
        [7, 46, 47, 47, 88, 6],
        [41, 55, 73, 23, 3, 79],
        [56, 69, 21, 86, 3, 33],
        [45, 7, 53, 81, 95, 79],
        [60, 77, 74, 68, 88, 51],
        [25, 25, 10, 12, 78, 14],
        [25, 56, 55, 58, 12, 82],
        [74, 33, 88, 23, 86, 59]
    ];

    public xAxis: Object = { 
        valueType: 'Category', 
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] 
    };

    public yAxis: Object = { 
        valueType: 'Category', 
        labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'] 
    };

    selectedX: string = '';
    selectedY: string = '';
    selectedDetails: any = null;

    onCellSelect(event: any) {
        // Handle selection data from the event
        if (event.data && event.data.length > 0) {
            const cell = event.data[0];
            this.selectedX = cell.xLabel;
            this.selectedY = cell.yLabel;
            this.selectedDetails = this.getDetailedInfo(cell.value as number);
        }
    }

    getDetailedInfo(value: number): any {
        return {
            value: value,
            status: value > 50 ? 'High' : 'Low',
            trend: value > 75 ? '↑ Peaking' : '↓ Stable'
        };
    }
}
```

## Multi-dimensional Data

Represent more than 2 dimensions in a heatmap.

### 3D Data via Bubble Size

```typescript
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HeatMapModule} from '@syncfusion/ej2-angular-heatmap'
import { LegendService, AdaptorService, TooltipService} from '@syncfusion/ej2-angular-heatmap'
import { Component, ViewEncapsulation } from '@angular/core';
import { BubbleTooltipData, ITooltipEventArgs } from '@syncfusion/ej2-angular-heatmap';

@Component({
imports: [ HeatMapModule ],
providers: [ LegendService, AdaptorService, TooltipService],
standalone: true,
selector: 'my-app',
template:
    `<ejs-heatmap id='container' style="display:block;" [dataSource]='dataSource' [xAxis]='xAxis' [yAxis]='yAxis'
    [titleSettings]='titleSettings' [paletteSettings]='paletteSettings' [cellSettings]='cellSettings' [legendSettings]='legendSettings' (tooltipRender)='tooltipRender($event)'>
    </ejs-heatmap>`,
encapsulation: ViewEncapsulation.None
})
export class AppComponent {

    dataSource: Object[] = [
        [[4, 39], [3, 8], [1, 3], [1, 10], [4, 4], [2, 15]],
        [[4, 28], [5, 92], [5, 73], [3, 1], [3, 4], [4, 126]],
        [[4, 45], [5, 152], [0, 44], [4, 54], [5, 243], [2, 45]]
    ];

    titleSettings: Object = {
        text: 'Commercial Aviation Accidents and Fatalities by year 2012 - 2017',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'Segoe UI'
        }
    };
    xAxis: Object = {
        labels: ['2017', '2016', '2015'],
    };
    yAxis: Object = {
        labels: ['Jan-Feb', 'Mar-Apr', 'May-Jun', 'Jul-Aug', 'Sep-Oct', 'Nov-Dec'],
    };
    public paletteSettings: Object = {
        palette: [
            { color: '#C06C84' },
            { color: '#6C5B7B' },
            { color: '#355C7D' }
        ],
        type: "Gradient"
    };
    public cellSettings: Object = {
        border: {
            width: 1
        },
        tileType: 'Bubble',
        bubbleType: 'SizeAndColor'
    };
    public legendSettings: Object = {
        visible: true,
    };
    public tooltipRender(args: ITooltipEventArgs): void {
        args.content = ['Year ' + ' : ' + args.xLabel + '<br/>' + 'Months ' + ' : ' + args.yLabel + '<br/>'
            + 'Accidents ' + ' : ' + (args.value as BubbleTooltipData[])[0].bubbleData + '<br/>' + 'Fatalities ' + ' : '
            + (args.value as BubbleTooltipData[])[1].bubbleData];
    };
}
```

### Layered Heatmaps

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeatMapModule, TooltipService, LegendService } from '@syncfusion/ej2-angular-heatmap';

@Component({
    selector: 'my-app',
    standalone: true,
    imports: [HeatMapModule, CommonModule],
    providers: [TooltipService, LegendService],
    template: `
        <div style="padding: 20px; font-family: sans-serif;">
            <div style="margin-bottom: 20px;">
                <label style="font-weight: bold; margin-right: 10px;">Select Layer:</label>
                <select (change)='changeLayer($event)' style="padding: 5px; border-radius: 4px;">
                    <option *ngFor='let layer of layers' [value]='layer'>
                        {{ layer }}
                    </option>
                </select>
            </div>

            <div style="border: 1px solid #ddd; padding: 15px; border-radius: 8px;">
                <h3 style="margin-top: 0;">Layer: {{ selectedLayer }}</h3>
                <ejs-heatmap id='heatmap' 
                    [dataSource]='currentDataSource'
                    [xAxis]='xAxis'
                    [yAxis]='yAxis'>
                </ejs-heatmap>
            </div>
        </div>
    `,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    public layers: string[] = ['Revenue', 'Units', 'Profit'];
    public selectedLayer: string = 'Revenue';
    
    // 2D Array Data Source
    public allData: { [key: string]: number[][] } = {
        'Revenue': [
            [45000, 38000, 52000],
            [32000, 41000, 48000]
        ],
        'Units': [
            [150, 120, 180],
            [110, 140, 165]
        ],
        'Profit': [
            [15000, 12000, 19000],
            [9000, 13000, 15500]
        ]
    };

    public currentDataSource: number[][] = this.allData['Revenue'];

    public xAxis: Object = {
        labels: ['Q1', 'Q2', 'Q3']
    };

    public yAxis: Object = {
        labels: ['Product A', 'Product B']
    };

    changeLayer(event: any) {
        this.selectedLayer = event.target.value;
        // Trigger update by changing the reference
        this.currentDataSource = this.allData[this.selectedLayer];
    }
}
```

