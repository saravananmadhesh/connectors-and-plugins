# Chart Elements

Chart elements enhance data visualization by adding context, highlighting patterns, and improving readability. This guide covers legends, markers, data labels, annotations, trendlines, technical indicators, striplines, and gradient fills.

> **🔍 CRITICAL API ACCURACY NOTE:**  
> All property names use the **`Settings` suffix** when binding to templates (e.g., `[legendSettings]`, NOT `[legend]`).  
> For complete property naming conventions and type-safe implementation patterns, see **[Property Mapping Guide](./property-mapping-guide.md)** before implementing.

## Table of Contents

- [Legend](#legend)
- [Data Markers](#data-markers)
- [Data Labels](#data-labels)
- [Annotations](#annotations)
- [Trendlines](#trendlines)
- [Technical Indicators](#technical-indicators)
- [Striplines](#striplines)
- [Gradient Fills](#gradient-fills)

## Legend

Legends identify series in charts with multiple data sets, displaying names, colors, and symbols.

**API Reference:**
- [LegendSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/legendSettingsModel) - Complete legend configuration
- [LegendSettings](https://ej2.syncfusion.com/angular/documentation/api/chart/legendSettings) - Legend settings class
- [LegendPosition](https://ej2.syncfusion.com/angular/documentation/api/chart/legendPosition) - Legend position enum
- [LegendShape](https://ej2.syncfusion.com/angular/documentation/api/chart/legendShape) - Available legend icon shapes
- [LegendMode](https://ej2.syncfusion.com/angular/documentation/api/chart/legendMode) - Legend rendering modes (Series, Point, Range, Gradient)

### Basic Legend Configuration

**API Properties:**
- [visible](https://ej2.syncfusion.com/angular/documentation/api/chart/legendSettings#visible) (boolean, default: true)
- [position](https://ej2.syncfusion.com/angular/documentation/api/chart/legendSettings#position) - [LegendPosition](https://ej2.syncfusion.com/angular/documentation/api/chart/legendPosition) enum

#### ✅ Type-Safe Implementation (Recommended)

```typescript
import { LegendSettingsModel } from '@syncfusion/ej2-angular-charts';

// Explicitly typed property with IDE IntelliSense
public legendSettings: LegendSettingsModel = {
  visible: true  // Default: true, Type: boolean
};
```

#### ❌ Non-Type-Safe Implementation (Avoid)

```typescript
// Without type - no IDE support, harder to debug
public legendSettings = {
  visible: true
};
```

#### Template Binding

```html
<ejs-chart [legendSettings]="legendSettings">
  <e-series-collection>
    <e-series [dataSource]="data1" type="Line" xName="x" yName="y" name="Product A"></e-series>
    <e-series [dataSource]="data2" type="Line" xName="x" yName="y" name="Product B"></e-series>
  </e-series-collection>
</ejs-chart>
```

### Legend Positioning

#### ✅ Type-Safe Implementation

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
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' [title]='title' [legendSettings]='legendSettings'>
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
    public legendSettings?: Object;
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
        };
        this.legendSettings = { visible: true, position: 'Top',        // Type: LegendPosition enum
            alignment: 'Center' };
        this.title = 'Olympic Medals';
    }

}
```

#### Position Options

| Value | Description |
|-------|-------------|
| `'Top'` | Legend above chart area |
| `'Bottom'` | Legend below chart area (default) |
| `'Left'` | Legend on left side |
| `'Right'` | Legend on right side |
| `'Custom'` | Custom X,Y positioning |
| `'Auto'` | Places the legend according to the area type |

#### Custom Positioning

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
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' [title]='title' [legendSettings]='legendSettings'>
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
    public legendSettings?: Object;
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
        };
        this.legendSettings = { visible: true, position: 'Custom',
          location: { 
            x: 70,   // X position as percentage (0-100)
            y: 20    // Y position as percentage (0-100)
          } };
        this.title = 'Olympic Medals';
    }
}
```

**Common Position Combinations:**

```typescript
// Top-center (default aligned)
{ position: 'Top', alignment: 'Center' }

// Bottom-right
{ position: 'Bottom', alignment: 'Far' }

// Custom top-left corner
{ position: 'Custom', location: { x: 5, y: 5 } }
```

### Legend Shape and Style

#### ✅ Type-Safe Implementation

```typescript
import { LegendSettingsModel, BorderModel, FontModel } from '@syncfusion/ej2-angular-charts';
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
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' [title]='title' [legendSettings]='legendSettings'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='gold' name='Gold Medals'></e-series>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='silver' name='Silver Medals'></e-series>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='bronze' name='Bronze Medals'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    public legendSettings?: Object;
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
        };
        this.legendSettings = {
          visible: true,
          shapeHeight: 15,          // Type: number (pixels)
          shapeWidth: 15,           // Type: number (pixels)
          shapePadding: 5,          // Type: number (pixels)
          
          // Border configuration - Type: BorderModel
          border: {
            width: 1,               // Type: number
            color: '#000'           // Type: string (CSS color)
          },
          
          background: 'transparent',  // Type: string (CSS color)
          opacity: 1,                 // Type: number (0-1)
          
          // Text styling - Type: FontModel
          textStyle: {
            fontFamily: 'Arial',
            size: '14px',
            fontWeight: '400',
            color: '#333'
          }
        }
        this.title = 'Olympic Medals';
    }

}

```

**Legend Shapes:**

| Shape | Description | Usage | Example |
|-------|-------------|-------|---------|
| **Circle** | Renders a circular icon | Default for Line, Area, Scatter charts | ● |
| **Rectangle** | Renders a rectangular icon | Default for Column, Bar charts | ■ |
| **Triangle** | Renders a triangular icon | Used with triangular markers | ▲ |
| **InvertedTriangle** | Renders an inverted triangle-shaped icon | Alternative triangle variant | ▼ |
| **Diamond** | Renders a diamond-shaped icon | Used with diamond markers | ◆ |
| **Pentagon** | Renders a pentagon-shaped icon | Used with pentagon markers | ⬟ |
| **Cross** | Renders a cross-shaped icon | Used with cross markers | ✕ |
| **HorizontalLine** | Renders a horizontal line icon | Line-based visualization | ─ |
| **VerticalLine** | Renders a vertical line icon | Line-based visualization | \| |
| **Image** | Renders a custom image for the legend icon | Custom branding or icons | 🖼️ |
| **SeriesType** | Uses the default icon shape based on the series type | Automatic detection (default) | Auto |

#### Shape Selection Examples

```typescript
// Specific shape
public legendSettings: LegendSettingsModel = {
  visible: true,
  shape: 'Circle'  // Type: LegendShape enum
};

// Using custom image
public legendSettings: LegendSettingsModel = {
  visible: true,
  shape: 'Image',
  imageUrl: 'assets/custom-legend-icon.png'
};

// Series-type based (automatic)
public legendSettings: LegendSettingsModel = {
  visible: true,
  shape: 'SeriesType'  // Default: automatically uses shape for series type
};
```

#### Per-Series Shape Override

Override legend shape for specific series:

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
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' [title]='title' [legendSettings]='legendSettings'>
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
    public legendSettings?: Object;
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
        };
        this.legendSettings = { visible: true, position: 'Custom',
          location: { 
            x: 70,   // X position as percentage (0-100)
            y: 20    // Y position as percentage (0-100)
          } };
        this.title = 'Olympic Medals';
    }
}
```

**Common Position Combinations:**

```typescript
// Top-center (default aligned)
{ position: 'Top', alignment: 'Center' }

// Bottom-right
{ position: 'Bottom', alignment: 'Far' }

// Custom top-left corner
{ position: 'Custom', location: { x: 5, y: 5 } }
```

### Legend Shape and Style

#### ✅ Type-Safe Implementation

```typescript
import { LegendSettingsModel, BorderModel, FontModel } from '@syncfusion/ej2-angular-charts';
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
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' [title]='title' [legendSettings]='legendSettings'>
        <e-series-collection>
            <!-- Series 1: Custom circle -->
            <e-series 
              [dataSource]="data1" 
              type="Line" 
              xName="x" 
              yName="y" 
              name="Series A"
              legendShape="Circle">
            </e-series>
            
            <!-- Series 2: Custom rectangle -->
            <e-series 
              [dataSource]="data2" 
              type="Column" 
              xName="x" 
              yName="y" 
              name="Series B"
              legendShape="Rectangle">
            </e-series>
            
            <!-- Series 3: Custom image -->
            <e-series 
              [dataSource]="data3" 
              type="Line" 
              xName="x" 
              yName="y" 
              name="Series C"
              legendShape="Image"
              imageUrl="assets/series-c-icon.png">
            </e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    public legendSettings?: Object;
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
        };
        this.legendSettings = {
          visible: true,
          shapeHeight: 15,          // Type: number (pixels)
          shapeWidth: 15,           // Type: number (pixels)
          shapePadding: 5,          // Type: number (pixels)
          
          // Border configuration - Type: BorderModel
          border: {
            width: 1,               // Type: number
            color: '#000'           // Type: string (CSS color)
          },
          
          background: 'transparent',  // Type: string (CSS color)
          opacity: 1,                 // Type: number (0-1)
          
          // Text styling - Type: FontModel
          textStyle: {
            fontFamily: 'Arial',
            size: '14px',
            fontWeight: '400',
            color: '#333'
          }
        }
        this.title = 'Olympic Medals';
    }
}
```

### Legend Click Behavior

Toggle series visibility by clicking legend items:

```typescript
public legendSettings = {
  visible: true,
  toggleVisibility: true  // Enable/disable series on click
};
```

### Legend Paging

For charts with many series:

```typescript
public legendSettings = {
  visible: true,
  width: '200px',
  height: '100px',
  enablePages: true  // Add pagination for overflow
};
```

### Custom Legend Template

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartModule, ChartComponent, CategoryService, ColumnSeriesService, LegendService, TooltipService, DataLabelService } from '@syncfusion/ej2-angular-charts';
import {chinaData,indiaData,indonesiaData} from './datasource';


@Component({
  imports: [ChartModule],
  providers: [CategoryService, ColumnSeriesService, LegendService, TooltipService, DataLabelService],
  standalone: true,
  selector: 'app-container',
  template: `<ejs-chart id="chart-container" #chartRef [primaryXAxis]="primaryXAxis" [primaryYAxis]="primaryYAxis" [chartArea]="chartArea" [title]="title" [legendSettings]="legendSettings" (legendRender)="legendRender($event)">
        <e-series-collection>
            <e-series [dataSource]="chinaData" type="Column" xName="x" yName="y" name="China" [animation]="{enable:false}" [marker]="{dataLabel:{visible:true}}"></e-series>
            <e-series [dataSource]="indiaData" type="Column" xName="x" yName="y" name="India" [animation]="{enable:false}" [marker]="{dataLabel:{visible:true}}"></e-series>
            <e-series [dataSource]="indonesiaData" type="Column" xName="x" yName="y" name="Indonesia" [animation]="{enable:false}" [marker]="{dataLabel:{visible:true}}"></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    @ViewChild('chartRef') public chartObj!: ChartComponent;

    public primaryXAxis?: Object;
    public primaryYAxis?: Object;
    public chartArea?: Object;
    public title?: string;
    public legendSettings?: Object;
    public chinaData?:Object;
    public indiaData?:Object;
    public indonesiaData?:Object;
    public legendIcons: { [key: string]: string } = {
      China: 'https://img.icons8.com/color/100/china.png',
      India: 'https://img.icons8.com/color/100/india.png',
      Indonesia: 'https://img.icons8.com/color/100/indonesia.png'
    };
    ngOnInit(): void {
      this.chinaData = [
            { x: 2022, y: 4152.7 }, { x: 2023, y: 4362.1 }, { x: 2024, y: 4780.0 }
        ];
      this.indiaData = [
            { x: 2022, y: 863.2 }, { x: 2023, y: 968.8 }, { x: 2024, y: 1085.1 }
        ];
      this.indonesiaData = [
            { x: 2022, y: 693.4 }, { x: 2023, y: 781.3 }, { x: 2024, y: 836.1 }
        ];
      this.primaryXAxis = {
        interval: 1,
        edgeLabelPlacement: 'Shift',
        majorGridLines: { width: 0 }
      };

      this.primaryYAxis = {
        title: 'Coal Production (Million Tonnes)',
        labelFormat: '{value}t'
      };

      this.chartArea = { border: { width: 0 } };

      this.legendSettings = {
        visible: true,
        template:
          '<div class="coal-legend-item" style="display:flex;align-items:center;gap:8px;padding:4px 8px;opacity:1;transition:opacity .3s;cursor:pointer;">' +
          '<img class="e-icon" src="" width="24" height="24" style="border-radius:4px;object-fit:cover;" />' +
          '<span class="e-label" style="font-size:13px;font-weight:bold;color:;"></span>' +
          '</div>'
      };

      this.title = 'Top 3 Countries by Coal Production (2022–2024)';
    }

    public legendRender(args: any): void {
      const chart: any = (this.chartObj as any).chart || (this.chartObj as any);
      const matchedSeries = (chart.series || []).filter((s: any) => s.name === args.text)[0];
      const opacity = matchedSeries && matchedSeries.visible === false ? '0.5' : '1';
      args.template = args.template
        .replace('opacity:1;', 'opacity:' + opacity + ';')
        .replace('src=""', 'src="' + (this.legendIcons[args.text] || '') + '"')
        .replace('color:;', 'color:' + args.fill + ';')
        .replace('></span>', '>' + args.text + '</span>');
    }

}
```

## Data Markers

Markers highlight individual data points with shapes, making specific values stand out.

**API Reference:**
- [MarkerSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/markerSettingsModel) - Complete marker configuration
- [MarkerSettings](https://ej2.syncfusion.com/angular/documentation/api/chart/markerSettings) - Marker settings class
- [ChartShape](https://ej2.syncfusion.com/angular/documentation/api/chart/chartShape) - Available marker shapes enum

### Basic Marker Configuration

**API Properties:**
- [visible](https://ej2.syncfusion.com/angular/documentation/api/chart/markerSettings#visible) (boolean, default: false)
- [width](https://ej2.syncfusion.com/angular/documentation/api/chart/markerSettings#width) (number, default: 5)
- [height](https://ej2.syncfusion.com/angular/documentation/api/chart/markerSettings#height) (number, default: 5)
- [shape](https://ej2.syncfusion.com/angular/documentation/api/chart/markerSettings#shape) - [ChartShape](https://ej2.syncfusion.com/angular/documentation/api/chart/chartShape) enum
- [fill](https://ej2.syncfusion.com/angular/documentation/api/chart/markerSettings#fill) (string) - Marker fill color
- [border](https://ej2.syncfusion.com/angular/documentation/api/chart/markerSettings#border) - [BorderModel](https://ej2.syncfusion.com/angular/documentation/api/chart/borderModel)

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, LineSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { markerData } from './datasource';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, LineSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Line' xName='x' yName='y' name='December 2007' width=2 [marker]='marker'></e-series>
            <e-series [dataSource]='chartData' type='Line' xName='x' yName='y1' name='December 2008' width=2 [marker]='marker'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public marker?: Object;
    primaryYAxis: any;
    ngOnInit(): void {
        this.chartData = [
              { x: 'WW', y: 12, y1: 22, y2: 38.3, y3: 50 },
              { x: 'EU', y: 9.9, y1: 26, y2: 45.2, y3: 63.6 },
              { x: 'APAC', y: 4.4, y1: 9.3, y2: 18.2, y3: 20.9 },
              { x: 'LATAM', y: 6.4, y1: 28, y2: 46.7, y3: 65.1 },
              { x: 'MEA', y: 30, y1: 45.7, y2: 61.5, y3: 73 },
              { x: 'NA', y: 25.3, y1: 35.9, y2: 64, y3: 81.4 }
        ];
        this.primaryXAxis = {
            valueType: 'Category', interval: 1,
        };
        this.marker = { visible: true };
        this.title = 'FB Penetration of Internet Audience';
    }

}
```

### Marker Shapes

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, LineSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { markerData } from './datasource';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, LineSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Line' xName='x' yName='y' name='December 2007' width=2 [marker]='marker'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public marker?: Object;
    primaryYAxis: any;
    ngOnInit(): void {
        this.chartData = [
              { x: 'WW', y: 12, y1: 22, y2: 38.3, y3: 50 },
              { x: 'EU', y: 9.9, y1: 26, y2: 45.2, y3: 63.6 },
              { x: 'APAC', y: 4.4, y1: 9.3, y2: 18.2, y3: 20.9 },
              { x: 'LATAM', y: 6.4, y1: 28, y2: 46.7, y3: 65.1 },
              { x: 'MEA', y: 30, y1: 45.7, y2: 61.5, y3: 73 },
              { x: 'NA', y: 25.3, y1: 35.9, y2: 64, y3: 81.4 }
        ];
        this.primaryXAxis = {
            valueType: 'Category'
        };
        this.marker = { visible: true, width: 10, height: 10, shape: 'Diamond' };
        this.title = 'FB Penetration of Internet Audience';
    }

}
```

**Available Shapes:**
- Circle (default)
- Rectangle / Square
- Triangle
- Diamond
- Pentagon
- Cross / Plus
- Image (use imageUrl property)

### Marker Styling

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, LineSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { markerData } from './datasource';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, LineSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Line' xName='x' yName='y' name='December 2007' width=2 [marker]='marker'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public marker?: Object;
    primaryYAxis: any;
    ngOnInit(): void {
        this.chartData = [
              { x: 'WW', y: 12, y1: 22, y2: 38.3, y3: 50 },
              { x: 'EU', y: 9.9, y1: 26, y2: 45.2, y3: 63.6 },
              { x: 'APAC', y: 4.4, y1: 9.3, y2: 18.2, y3: 20.9 },
              { x: 'LATAM', y: 6.4, y1: 28, y2: 46.7, y3: 65.1 },
              { x: 'MEA', y: 30, y1: 45.7, y2: 61.5, y3: 73 },
              { x: 'NA', y: 25.3, y1: 35.9, y2: 64, y3: 81.4 }
        ];
        this.primaryXAxis = {
            valueType: 'Category'
        };
        this.marker = { visible: true,  fill: 'Red', height: 10, width: 10,
                    border:{width: 2, color: 'blue'} };
        this.title = 'FB Penetration of Internet Audience';
    }

}
```

### Image Markers

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, LineSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { imageData } from './datasource';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, LineSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Line' xName='x' yName='y' name='India' width=2 [marker]='marker'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public marker?: Object;
    primaryYAxis: any;
    ngOnInit(): void {
        this.chartData = [
              { x: "Jan", y: 60 }, { x: "Feb", y: 50 },
              { x: "Mar", y: 64 }, { x: "Apr", y: 63 },
              { x: "May", y: 81 }, { x: "Jun", y: 64 },
              { x: "Jul", y: 82 }, { x: "Aug", y: 96 },
              { x: "Sep", y: 78 }, { x: "Oct", y: 60 },
              { x: "Nov", y: 58 }, { x: "Dec", y: 56 }
        ];
        this.primaryXAxis = {
            valueType: 'Category'
        };
        this.marker = { visible: true,
                        width: 10, height: 10, shape: 'Image',
                        imageUrl:'./sun_annotation.png'
        };
        this.title = 'Temperature flow over months';
    }

}
```

### Marker for Specific Points

Show markers only at specific data points:

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, LineSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { markerData } from './datasource';
import { IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';

@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, LineSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' (pointRender)='pointRender($event)' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Line' xName='x' yName='y' name='December 2007' width=2 [marker]='marker'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public marker?: Object;
    primaryYAxis: any;
    public pointRender(args: IPointRenderEventArgs): void {
        if(args.point.index === 3) {
                args.fill = 'red'
        }
    };
    ngOnInit(): void {
        this.chartData = [
              { x: 'WW', y: 12, y1: 22, y2: 38.3, y3: 50 },
              { x: 'EU', y: 9.9, y1: 26, y2: 45.2, y3: 63.6 },
              { x: 'APAC', y: 4.4, y1: 9.3, y2: 18.2, y3: 20.9 },
              { x: 'LATAM', y: 6.4, y1: 28, y2: 46.7, y3: 65.1 },
              { x: 'MEA', y: 30, y1: 45.7, y2: 61.5, y3: 73 },
              { x: 'NA', y: 25.3, y1: 35.9, y2: 64, y3: 81.4 }
        ];
        this.primaryXAxis = {
            valueType: 'Category'
        };
        this.marker = {  visible: true,
                    height: 10, width: 10 };
        this.title = 'FB Penetration of Internet Audience';
    }

}
```

## Data Labels

Data labels display values directly on or near chart elements for immediate readability.

### Basic Data Labels

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateTimeService, CategoryService, LineSeriesService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts'
import { LegendService, DataLabelService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { columnData } from './datasource';
@Component({
imports: [
         ChartModule
    ],

providers: [ DateTimeService, LineSeriesService, LegendService, DataLabelService, ColumnSeriesService, CategoryService ],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' [title]='title'>
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
    ngOnInit(): void {
        this.chartData = [
              { x: 'Jan', y: -7.1 }, { x: 'Feb', y: -3.7 },
              { x: 'Mar', y: 2 }, { x: 'Apr', y: 6.3 },
              { x: 'May', y: 13.3 }, { x: 'Jun', y: 18.0 },
              { x: 'Jul', y: 19.8 }, { x: 'Aug', y: 18.1 },
              { x: 'Sep', y: 13.1 }, { x: 'Oct', y: 4.1 },
              { x: 'Nov', y: -3.8 }, { x: 'Dec', y: -6.8 }
        ];
        this.primaryXAxis = {
            valueType: 'Category'
        };
        this.marker = { dataLabel: { visible: true }
        };
        this.title = 'Alaska Weather Statistics - 2016';
    }

}
```

### Label Positioning

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateTimeService, CategoryService, LineSeriesService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts'
import { LegendService, DataLabelService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { columnData } from './datasource';
@Component({
imports: [
         ChartModule
    ],

providers: [ DateTimeService, LineSeriesService, LegendService, DataLabelService, ColumnSeriesService, CategoryService ],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' [title]='title'>
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
    ngOnInit(): void {
        this.chartData = [
              { x: 'Jan', y: -7.1 }, { x: 'Feb', y: -3.7 },
              { x: 'Mar', y: 2 }, { x: 'Apr', y: 6.3 },
              { x: 'May', y: 13.3 }, { x: 'Jun', y: 18.0 },
              { x: 'Jul', y: 19.8 }, { x: 'Aug', y: 18.1 },
              { x: 'Sep', y: 13.1 }, { x: 'Oct', y: 4.1 },
              { x: 'Nov', y: -3.8 }, { x: 'Dec', y: -6.8 }
        ];
        this.primaryXAxis = {
            valueType: 'Category'
        };
        this.marker = { dataLabel: { visible: true, position: 'Middle' }
        };
        this.title = 'Alaska Weather Statistics - 2016';
    }

}
```

**Position Options by Series Type:**

**Column/Bar:**
- `Top`: Above bars
- `Bottom`: Below bars
- `Middle`: Center of bars
- `Outer`: Outside bar ends

**Line/Scatter:**
- `Top`: Above points
- `Bottom`: Below points
- `Middle`: On points

**Pie/Donut:**
- `Inside`: Within slices
- `Outside`: Beyond slices

### Label Formatting

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateTimeService, CategoryService, LineSeriesService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts'
import { LegendService, DataLabelService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { columnData } from './datasource';
@Component({
imports: [
         ChartModule
    ],

providers: [ DateTimeService, LineSeriesService, LegendService, DataLabelService, ColumnSeriesService, CategoryService ],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='x' yName='y' name='Warmest' width=2 [marker]='marker'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public marker?: Object;
    primaryYAxis: any;
    ngOnInit(): void {
        this.chartData = [
              { x: 'Jan', y: -7.1 }, { x: 'Feb', y: -3.7 },
              { x: 'Mar', y: 2 }, { x: 'Apr', y: 6.3 },
              { x: 'May', y: 13.3 }, { x: 'Jun', y: 18.0 },
              { x: 'Jul', y: 19.8 }, { x: 'Aug', y: 18.1 },
              { x: 'Sep', y: 13.1 }, { x: 'Oct', y: 4.1 },
              { x: 'Nov', y: -3.8 }, { x: 'Dec', y: -6.8 }
        ];
        this.primaryXAxis = {
            title: 'Months',
            valueType: 'Category', labelFormat: 'yMMM',
            edgeLabelPlacement: 'Shift'
        };
        this.marker = { dataLabel: { visible: true, format: 'p1'}
        };
        this.title = 'Alaska Weather Statistics - 2016';
    }

}
```

**Format Patterns:**
- `${value}`: Raw value
- `${point.x}`: X-axis value
- `${point.y}`: Y-axis value
- `${series.name}`: Series name
- `${point.percentage}%`: Percentage (for pie charts)

### Label Border and Background

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateTimeService, CategoryService, LineSeriesService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts'
import { LegendService, DataLabelService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { columnData } from './datasource';
@Component({
imports: [
         ChartModule
    ],

providers: [ DateTimeService, LineSeriesService, LegendService, DataLabelService, ColumnSeriesService, CategoryService ],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' [title]='title'>
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
    ngOnInit(): void {
        this.chartData = [
              { x: 'Jan', y: -7.1 }, { x: 'Feb', y: -3.7 },
              { x: 'Mar', y: 2 }, { x: 'Apr', y: 6.3 },
              { x: 'May', y: 13.3 }, { x: 'Jun', y: 18.0 },
              { x: 'Jul', y: 19.8 }, { x: 'Aug', y: 18.1 },
              { x: 'Sep', y: 13.1 }, { x: 'Oct', y: 4.1 },
              { x: 'Nov', y: -3.8 }, { x: 'Dec', y: -6.8 }
        ];
        this.primaryXAxis = {
            valueType: 'Category'
        };
        this.marker = { dataLabel: {
            visible: true,
            border: { 
            width: 2, 
            color: '#FF5733' 
            },
            fill: 'white',
            margin: { left: 5, right: 5, top: 5, bottom: 5 }
        }
        };
        this.title = 'Alaska Weather Statistics - 2016';
    }

}
```

### Smart Labels

Use the `labelIntersectAction` property to specify how overlapping data labels are handled.

The following options are available:

- `None`: Displays all data labels without changing their positions, even when they overlap.
- `Hide`: Hides data labels that overlap.
- `Rotate90`: Rotates overlapping data labels by 90 degrees.
- `RelocateVertically`: Relocates overlapping data labels vertically.
- `RelocateHorizontally`: Relocates overlapping data labels horizontally.

The `RelocateVertically` and `RelocateHorizontally` options enable the Smart Data Label feature and are supported only for the following series types:

- `StackingColumn`
- `StackingColumn100`
- `StackingBar`
- `StackingBar100`

These options improve readability by relocating overlapping data labels and connecting them to their corresponding data points using connector lines.

Use the `smartLabelSettings` property to customize the appearance and position of relocated data labels. The following settings are available:

- `background`: Specifies the background color of the relocated data label.
- `pointerShape`: Specifies the pointer shape of the relocated data label.
- `border`: Customizes the color, width, and dash array of the relocated data label border.
- `connectorLineStyle`: Customizes the color, width, and dash array of the connector line.
- `offset`: Specifies the distance by which the data label is relocated. This property is applicable only when `labelIntersectAction` is set to `RelocateVertically`.

The following example demonstrates how to relocate overlapping data labels vertically in a stacking column chart:

```typescript
import { Component } from '@angular/core';
import { ChartModule, CategoryService, DataLabelService, LegendService, StackingColumnSeriesService } from '@syncfusion/ej2-angular-charts';

@Component({
  imports: [ChartModule],
  providers: [StackingColumnSeriesService, CategoryService, DataLabelService, LegendService],
  standalone: true,
  selector: 'app-container',
  template: `
    <ejs-chart id="chart-container" height="260px" [primaryXAxis]="primaryXAxis" [primaryYAxis]="primaryYAxis" [title]="title">
      <e-series-collection>
        <e-series [dataSource]="chartData" type="StackingColumn" xName="quarter" yName="productA" name="Product A" [marker]="marker"></e-series>
        <e-series [dataSource]="chartData" type="StackingColumn" xName="quarter" yName="productB" name="Product B" [marker]="marker"></e-series>
        <e-series [dataSource]="chartData" type="StackingColumn" xName="quarter" yName="productC" name="Product C" [marker]="marker"></e-series>
        <e-series [dataSource]="chartData" type="StackingColumn" xName="quarter" yName="productD" name="Product D" [marker]="marker"></e-series>
        <e-series [dataSource]="chartData" type="StackingColumn" xName="quarter" yName="productE" name="Product E" [marker]="marker"></e-series>
        <e-series [dataSource]="chartData" type="StackingColumn" xName="quarter" yName="productF" name="Product F" [marker]="marker"></e-series>
      </e-series-collection>
    </ejs-chart>
  `
})
export class AppComponent {
  public chartData: Object[] = [
    { quarter: 'Q1', productA: 1.1, productB: 1.2, productC: 1.1, productD: 1.2, productE: 1.1, productF: 1.2 },
    { quarter: 'Q2', productA: 1.2, productB: 1.1, productC: 1.2, productD: 1.1, productE: 1.2, productF: 1.1 },
    { quarter: 'Q3', productA: 1.1, productB: 1.1, productC: 1.2, productD: 1.2, productE: 1.1, productF: 1.2 },
    { quarter: 'Q4', productA: 1.2, productB: 1.2, productC: 1.1, productD: 1.1, productE: 1.2, productF: 1.1 }
  ];
  public primaryXAxis: Object = { valueType: 'Category', title: 'Quarter' };
  public primaryYAxis: Object = { title: 'Sales', minimum: 0, maximum: 8, interval: 1 };
  public marker: Object = {
    dataLabel: {
      visible: true,
      position: 'Middle',
      format: 'Value: {value}',
      font: { size: '14px' },
      labelIntersectAction: 'RelocateVertically',
      smartLabelSettings: {
        background: '#ffffff',
        pointerShape: 'Arrow',
        border: { color: '#808080', width: 1, dashArray: '2,2' },
        connectorLineStyle: { color: '#808080', width: 1, dashArray: '2,2' },
        offset: 10
      }
    }
  };
  public title: string = 'Quarterly Sales';
}
```

To relocate overlapping data labels horizontally, set `labelIntersectAction` to `RelocateHorizontally`:

```typescript
public marker: Object = {
  dataLabel: {
    visible: true,
    position: 'Middle',
    labelIntersectAction: 'RelocateHorizontally',
    smartLabelSettings: {
      background: '#ffffff',
      pointerShape: 'Arrow',
      border: {
        color: '#808080',
        width: 1,
        dashArray: '2,2'
      },
      connectorLineStyle: {
        color: '#808080',
        width: 1,
        dashArray: '2,2'
      }
    }
  }
};
```

### Stack Labels and Zero-Value Stack Handling

Stack labels are chart-level aggregate labels. Bind them through `[stackLabels]` on `<ejs-chart>`. Do not place `stackLabels` inside `marker.dataLabel` and do not treat point data labels as stack totals.

```html
<ejs-chart id="stack-label-chart" [stackLabels]="stackLabels">
</ejs-chart>
```

```ts
public stackLabels: Object = {
    visible: true,
    format: '${value}',
    position: 'Top',
    alignment: 'Center',
    fill: '#FFFFFF',
    border: { color: '#64748B', width: 1 },
    textStyle: { color: '#0F172A', size: '12px', fontWeight: '600' },
    margin: { left: 5, right: 5, top: 3, bottom: 3 }
};
```

Use these rules:

- `visible` must be `true`; a stacking-series type alone does not display totals.
- `format` formats the aggregate stack value, not the individual segment value.
- `position` controls whether the total is rendered at the top, bottom, or supported stack-label position.
- `alignment` controls horizontal alignment within the stack-label region.
- `fill`, `border`, `textStyle`, and `margin` configure the stack-label appearance.
- `marker.dataLabel` renders individual segment values. `stackLabels` renders one aggregate label for the completed stack.
- Positive and negative stacks use their resolved aggregate location.
- A zero-total category is anchored to the value-axis baseline, including totals produced by positive and negative cancellation.
- Null and undefined segment values must not produce an invalid total.
- Use `textRender` to customize or cancel stack-label text when event-level control is required.

Provide the correct stacking-series service, such as `StackingColumnSeriesService`, `StackingColumn100SeriesService`, `StackingBarSeriesService`, `StackingBar100SeriesService`, `StackingAreaSeriesService`, or `StackingLineSeriesService`. Also provide `DataLabelService` when individual segment data labels are enabled.



Stack labels are chart-level labels that display the total value of a stacked group for each x-axis category. They are different from series data labels:

- `stackLabels` belongs to the Chart and displays the aggregate total of each visible stack.
- `marker.dataLabel` belongs to an individual series and displays each point or segment value.
- Stack labels apply to stacking-series families such as `StackingColumn`, `StackingColumn100`, `StackingBar`, `StackingBar100`, `StackingArea`, and `StackingLine` where supported by the Chart stack-label rendering pipeline.
- Set `stackLabels.visible` to `true` to render totals. Merely using a stacking-series type does not display stack labels automatically.

```ts
public stackLabels: Object = {
    visible: true,
    format: 'Total: ${value}',
    font: { color: '#111827', size: '12px', fontWeight: '600' },
    fill: '#FFFFFF',
    border: { color: '#6B7280', width: 1 },
    margin: { left: 5, right: 5, top: 3, bottom: 3 }
};
```

The stack total is calculated separately for each x value and stacking group. Hidden series are excluded, and the labels are recalculated after visibility, data, zoom, or layout changes.

#### Zero-value behavior

A category whose resolved stack total is zero now receives a stack label at the value-axis baseline instead of being skipped. This includes:

- All visible stacked points explicitly containing `0`.
- Points containing `null` or `undefined`, which are normalized to zero for the zero-total calculation.
- Empty or mixed point combinations whose resolved visible-stack total is zero.
- Positive and negative values that cancel each other and resolve to a zero total.

For a zero-total stack, the Chart:

1. Tracks the category in the zero-point collection while collecting positive and negative stack points.
2. Resolves the total across the visible series in the same stacking group.
3. Falls back to matching points by x value when processed point indexes differ across series.
4. Uses `getPoint(xValue, 0, ...)` to anchor the label to the value-axis baseline.
5. Centers the label in the group's side-by-side reserved location so Category, DateTime, and numeric axes use the correct stack position.
6. Adjusts the offset for transposed charts and inversed value axes.
7. Triggers `textRender` with the tracked zero point and the first visible series in the group as the representative series.
8. Hides a nearby point data label when it collides with the zero stack label and marks the element with `data-collide="true"`.

The configured stack-label `format`, font, fill, border, and margin continue to apply to zero totals. For example, a format of `Total: ${value}` renders `Total: 0` at the baseline.

#### Complete stack-label sample with zero, null, and undefined values

This standalone Angular sample explicitly binds `[stackLabels]` to the Chart. It contains regular positive stacks and zero-total categories so the baseline behavior can be verified directly.

```ts
import { Component, OnInit } from '@angular/core';
import {
    CategoryService, ChartModule, DataLabelService, LegendService, StackingColumnSeriesService, TooltipService
} from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [ChartModule],
    providers: [CategoryService, StackingColumnSeriesService, DataLabelService, LegendService, TooltipService],
    standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="stack-label-chart" [primaryXAxis]="primaryXAxis" [primaryYAxis]="primaryYAxis"
        [stackLabels]="stackLabels" [legendSettings]="legendSettings" [tooltip]="tooltip" [title]="title"
        (textRender)="textRender($event)">
        <e-series-collection>
            <e-series [dataSource]="hardwareData" type="StackingColumn" xName="quarter" yName="value"
                name="Hardware" stackingGroup="Sales" [marker]="marker">
            </e-series>
            <e-series [dataSource]="softwareData" type="StackingColumn" xName="quarter" yName="value"
                name="Software" stackingGroup="Sales" [marker]="marker">
            </e-series>
            <e-series [dataSource]="serviceData" type="StackingColumn" xName="quarter" yName="value"
                name="Services" stackingGroup="Sales" [marker]="marker">
            </e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public hardwareData?: Object[];
    public softwareData?: Object[];
    public serviceData?: Object[];
    public primaryXAxis?: Object;
    public primaryYAxis?: Object;
    public stackLabels?: Object;
    public marker?: Object;
    public legendSettings?: Object;
    public tooltip?: Object;
    public title?: string;

    public textRender(args: any): void {
        if (args.point && Number(args.text) === 0) {
            args.color = '#FEF3C7';
            args.fontColor = '#92400E';
        }
    }

    public ngOnInit(): void {
        this.hardwareData = [
            { quarter: 'Q1', value: 30 },
            { quarter: 'Q2', value: 0 },
            { quarter: 'Q3', value: null },
            { quarter: 'Q4', value: 18 },
            { quarter: 'Q5', value: 10 }
        ];
        this.softwareData = [
            { quarter: 'Q1', value: 22 },
            { quarter: 'Q2', value: 0 },
            { quarter: 'Q3', value: undefined },
            { quarter: 'Q4', value: 15 },
            { quarter: 'Q5', value: -10 }
        ];
        this.serviceData = [
            { quarter: 'Q1', value: 18 },
            { quarter: 'Q2', value: 0 },
            { quarter: 'Q3', value: 0 },
            { quarter: 'Q4', value: 12 },
            { quarter: 'Q5', value: 0 }
        ];
        this.primaryXAxis = {
            valueType: 'Category',
            title: 'Quarter',
            majorGridLines: { width: 0 }
        };
        this.primaryYAxis = {
            title: 'Revenue',
            minimum: -20,
            maximum: 80,
            interval: 20,
            labelFormat: '${value}K'
        };
        this.stackLabels = {
            visible: true,
            format: '${value}',
            font: { color: '#111827', size: '12px', fontWeight: '600' },
            fill: '#FFFFFF',
            border: { color: '#6B7280', width: 1 },
            margin: { left: 5, right: 5, top: 3, bottom: 3 }
        };
        this.marker = {
            dataLabel: {
                visible: true,
                position: 'Middle',
                font: { color: '#FFFFFF', size: '11px' }
            }
        };
        this.legendSettings = { visible: true, position: 'Top' };
        this.tooltip = { enable: true, shared: true, format: '${series.name}: ${point.y}' };
        this.title = 'Quarterly Revenue with Stack Totals and Zero-Value Baseline Labels';
    }
}
```

**Expected result:**

- `Q1` and `Q4` render normal positive stack totals above their stacks.
- `Q2` renders a zero stack label at the value-axis baseline because all three values are zero.
- `Q3` also renders a zero label because `null` and `undefined` are normalized to zero and the remaining value is zero.
- `Q5` resolves to zero because `10 + (-10) + 0 = 0`, so its stack label is anchored to the baseline.
- The individual segment values come from `marker.dataLabel`; the aggregate values come from the chart-level `stackLabels` configuration.

#### Stack-label event behavior

The `textRender` event can customize or cancel both ordinary stack totals and zero-value stack labels. For standard positive or negative aggregate labels, the event can receive `point: null`. For the zero-value path, the actual tracked zero point is supplied, and the representative series is the first visible series in the stacking group.

```ts
public textRender(args: any): void {
    if (args.point && Number(args.text) === 0) {
        args.text = 'No total';
        args.color = '#FEF3C7';
        args.fontColor = '#92400E';
    }
}
```

#### Stack-label verification checklist

- [ ] `[stackLabels]` is bound on `<ejs-chart>` and `visible` is `true`.
- [ ] Normal positive and negative stack totals render for every visible category and stacking group.
- [ ] All-zero categories render a formatted zero label at the value-axis baseline.
- [ ] Null and undefined values are normalized to zero for the zero-total path.
- [ ] Positive and negative segments whose total cancels to zero render a baseline label.
- [ ] Hiding a series recalculates the visible-stack total and label.
- [ ] Category, DateTime, and numeric axes center zero labels in the correct side-by-side stack location.
- [ ] Transposed and inversed-axis configurations apply the correct baseline offset.
- [ ] `textRender` receives the tracked zero point and representative visible series for zero labels.
- [ ] A nearby colliding point data label is hidden and marked with `data-collide="true"`.

### Custom Label Template

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateTimeService, CategoryService, LineSeriesService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts'
import { LegendService, DataLabelService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { columnData } from './datasource';
@Component({
imports: [
         ChartModule
    ],

providers: [ DateTimeService, LineSeriesService, LegendService, DataLabelService, ColumnSeriesService, CategoryService ],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='x' yName='y' name='Warmest' width=2 [marker]='marker'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public marker?: Object;
    primaryYAxis: any;
    ngOnInit(): void {
        this.chartData = [
              { x: 'Jan', y: -7.1 }, { x: 'Feb', y: -3.7 },
              { x: 'Mar', y: 2 }, { x: 'Apr', y: 6.3 },
              { x: 'May', y: 13.3 }, { x: 'Jun', y: 18.0 },
              { x: 'Jul', y: 19.8 }, { x: 'Aug', y: 18.1 },
              { x: 'Sep', y: 13.1 }, { x: 'Oct', y: 4.1 },
              { x: 'Nov', y: -3.8 }, { x: 'Dec', y: -6.8 }
        ];
        this.primaryXAxis = {
            title: 'Months',
            valueType: 'Category', labelFormat: 'yMMM',
            edgeLabelPlacement: 'Shift'
        };
        this.marker = { dataLabel: { visible: true, position: 'Middle',
                        template: '<div>${point.x}</div><div>${point.y}</div>' }
        };
        this.title = 'Alaska Weather Statistics - 2016';
    }

}
```

## Annotations

Annotations add custom HTML elements, text, shapes, or images at specific chart coordinates.

### Text Annotation

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
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' [title]='title'>
        <e-annotations>
            <e-annotation  content='70 Gold Medals' region='Series' coordinateUnits='Point' x='Japan' y=75>
            </e-annotation>
        </e-annotations>
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
    }
}
```

### Coordinate Units

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
        <e-annotations>
            <e-annotation  content='<div style="border: 1px solid black; padidng: 5px 5px 5px 5px, backgrund:#f5f5f5">Annotation in Pixel</div>'
             coordinateUnits='Pixel' x=150 y=75>
            </e-annotation>
        </e-annotations>
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
    }

}
```

### Image Annotation

```typescript
public annotations = [{
  content: '<img src="assets/warning-icon.png" width="30" height="30"/>',
  x: 'Mar',
  y: 34,
  coordinateUnits: 'Point',
  region: 'Series'
}];
```

### Shape Annotation

```typescript
public annotations = [{
  content: '<div style="width: 100px; height: 50px; background: rgba(255,0,0,0.2); border: 2px solid red;"></div>',
  x: 'Feb',
  y: 28,
  coordinateUnits: 'Point',
  region: 'Series'
}];
```

### Multiple Annotations

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
    template: `<ejs-chart id="chart-container" [annotation]='annotations' [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' [title]='title'>
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
    public annotations = [
      {
        content: '<div>Annotation 1</div>',
        x: 'Jan',
        y: 35,
        coordinateUnits: 'Point'
      },
      {
        content: '<div>Annotation 2</div>',
        x: 'May',
        y: 40,
        coordinateUnits: 'Point'
      }
    ];
    ngOnInit(): void {
        this.chartData = columnData;
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

## Trendlines

Trendlines show overall patterns or directional trends in data.

### Linear Trendline

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { ScatterSeriesService, LineSeriesService, DateTimeService, TrendlinesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
let series1 : any[] =[];
let yValue = [7.66, 8.03, 8.41, 8.97, 8.77, 8.20, 8.16, 7.89, 8.68, 9.48, 10.11, 11.36, 12.34, 12.60, 12.95,
    13.91, 16.21, 17.50, 22.72, 28.14, 31.26, 31.39, 32.43, 35.52, 36.36,
    41.33, 43.12, 45.00, 47.23, 48.62, 46.60, 45.28, 44.01, 45.17, 41.20, 43.41, 48.32, 45.65, 46.61, 53.34, 58.53];
let point1; let i; let j = 0;
for (i = 1973; i <= 2013; i++) {
    point1 = { x: i, y: yValue[j] };
    series1.push(point1); j++;
}
@Component({
imports: [
         ChartModule
    ],

providers: [  ScatterSeriesService, LineSeriesService, DateTimeService, TrendlinesService],
standalone: true,
    selector: 'app-container',
    template:
            `<ejs-chart id='chartcontainer'  [title]='title' [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis'
                [chartArea]= 'chartArea'>
            <e-series-collection>
                <e-series [dataSource]='data' type='Scatter' xName='x' yName='y' fill="#0066FF">
                     <e-trendlines>
                        <e-trendline type='Linear' width=3  name='Linear' fill='#C64A75'>
                        </e-trendline>
                    </e-trendlines>
                    </e-series>
            </e-series-collection>
        </ejs-chart>`
})


export class AppComponent implements OnInit {
    public data: Object[] = series1;
    public primaryXAxis: Object = {
        title: 'Months',
        majorGridLines: { width : 0}
    };
    public primaryYAxis: Object = {
       title: 'Rupees against Dollars',
       interval: 10, lineStyle: {width: 0}, majorTickLines: { width: 0 }
    };
    public chartArea : Object = {
      border: { width : 0}
    };
    public title: string = 'Historical Indian Rupee Rate (INR USD)';
    constructor() {
        //code
    }ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
;
}
```

### Trendline Types

```typescript
public trendlines = [{
  type: 'Linear'  // Linear, Exponential, Logarithmic, Polynomial, Power, MovingAverage
}];
```

**Type Descriptions:**
- **Linear:** Straight line fit
- **Exponential:** Exponential curve
- **Logarithmic:** Logarithmic curve
- **Polynomial:** Polynomial fit (specify `polynomialOrder`)
- **Power:** Power function
- **MovingAverage:** Smoothed average (specify `period`)

### Polynomial Trendline

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { ScatterSeriesService, LineSeriesService, DateTimeService, TrendlinesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
let series1 : any[] =[];
let yValue = [7.66, 8.03, 8.41, 8.97, 8.77, 8.20, 8.16, 7.89, 8.68, 9.48, 10.11, 11.36, 12.34, 12.60, 12.95,
    13.91, 16.21, 17.50, 22.72, 28.14, 31.26, 31.39, 32.43, 35.52, 36.36,
    41.33, 43.12, 45.00, 47.23, 48.62, 46.60, 45.28, 44.01, 45.17, 41.20, 43.41, 48.32, 45.65, 46.61, 53.34, 58.53];
let point1; let i; let j = 0;
for (i = 1973; i <= 2013; i++) {
    point1 = { x: i, y: yValue[j] };
    series1.push(point1); j++;
}
@Component({
imports: [
         ChartModule
    ],

providers: [  ScatterSeriesService, LineSeriesService, DateTimeService, TrendlinesService],
standalone: true,
    selector: 'app-container',
    template:
            `<ejs-chart id='chartcontainer'  [title]='title' [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis'
                [chartArea]= 'chartArea'>
            <e-series-collection>
                <e-series [dataSource]='data' type='Scatter' xName='x' yName='y' fill="#0066FF">
                     <e-trendlines>
                        <e-trendline type='Linear' width=3  name='Linear' fill='#C64A75'>
                        </e-trendline>
                    </e-trendlines>
                    </e-series>
            </e-series-collection>
        </ejs-chart>`
})


export class AppComponent implements OnInit {
    public data: Object[] = series1;
    public primaryXAxis: Object = {
        title: 'Months',
        majorGridLines: { width : 0}
    };
    public primaryYAxis: Object = {
       title: 'Rupees against Dollars',
       interval: 10, lineStyle: {width: 0}, majorTickLines: { width: 0 }
    };
    public chartArea : Object = {
      border: { width : 0}
    };

    public title: string = 'Historical Indian Rupee Rate (INR USD)';
    constructor() {
        //code
    }ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
;
}
```

### Moving Average

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { ScatterSeriesService, LineSeriesService, DateTimeService, TrendlinesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
let series1 : any[] =[];
let yValue = [7.66, 8.03, 8.41, 8.97, 8.77, 8.20, 8.16, 7.89, 8.68, 9.48, 10.11, 11.36, 12.34, 12.60, 12.95,
    13.91, 16.21, 17.50, 22.72, 28.14, 31.26, 31.39, 32.43, 35.52, 36.36,
    41.33, 43.12, 45.00, 47.23, 48.62, 46.60, 45.28, 44.01, 45.17, 41.20, 43.41, 48.32, 45.65, 46.61, 53.34, 58.53];
let point1; let i; let j = 0;
for (i = 1973; i <= 2013; i++) {
    point1 = { x: i, y: yValue[j] };
    series1.push(point1); j++;
}
@Component({
imports: [
         ChartModule
    ],

providers: [  ScatterSeriesService, LineSeriesService, DateTimeService, TrendlinesService],
standalone: true,
    selector: 'app-container',
    template:
            `<ejs-chart id='chartcontainer'  [title]='title' [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis'
                [chartArea]= 'chartArea'>
            <e-series-collection>
                <e-series [dataSource]='data' type='Scatter' xName='x' yName='y' fill="#0066FF">
                     <e-trendlines>
                        <e-trendline type='MovingAverage' width=3  name='Linear' fill='#C64A75'>
                        </e-trendline>
                    </e-trendlines>
                    </e-series>
            </e-series-collection>
        </ejs-chart>`
})


export class AppComponent implements OnInit {
    public data: Object[] = series1;
    public primaryXAxis: Object = {
        title: 'Months',
        majorGridLines: { width : 0}
    };
    public primaryYAxis: Object = {
       title: 'Rupees against Dollars',
       interval: 10, lineStyle: {width: 0}, majorTickLines: { width: 0 }
    };
    public chartArea : Object = {
      border: { width : 0}
    };

    public title: string = 'Historical Indian Rupee Rate (INR USD)';
    constructor() {
        //code
    }ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
;
}
```

### Forward/Backward Forecast

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { ScatterSeriesService, LineSeriesService, DateTimeService, TrendlinesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
let series1 : any[] =[];
let yValue = [7.66, 8.03, 8.41, 8.97, 8.77, 8.20, 8.16, 7.89, 8.68, 9.48, 10.11, 11.36, 12.34, 12.60, 12.95,
    13.91, 16.21, 17.50, 22.72, 28.14, 31.26, 31.39, 32.43, 35.52, 36.36,
    41.33, 43.12, 45.00, 47.23, 48.62, 46.60, 45.28, 44.01, 45.17, 41.20, 43.41, 48.32, 45.65, 46.61, 53.34, 58.53];
let point1; let i; let j = 0;
for (i = 1973; i <= 2013; i++) {
    point1 = { x: i, y: yValue[j] };
    series1.push(point1); j++;
}
@Component({
imports: [
         ChartModule
    ],

providers: [  ScatterSeriesService, LineSeriesService, DateTimeService, TrendlinesService],
standalone: true,
    selector: 'app-container',
    template:
            `<ejs-chart id='chartcontainer'  [title]='title' [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis'
                [chartArea]= 'chartArea'>
            <e-series-collection>
                <e-series [dataSource]='data' type='Scatter' xName='x' yName='y' fill="#0066FF">
                     <e-trendlines>
                        <e-trendline type='MovingAverage' width=3  name='Linear' fill='#C64A75' [forwardForecast]='forwardForecast'>
                        </e-trendline>
                    </e-trendlines>
                    </e-series>
            </e-series-collection>
        </ejs-chart>`
})


export class AppComponent implements OnInit {
    public data: Object[] = series1;
    public primaryXAxis: Object = {
        title: 'Months',
        majorGridLines: { width : 0}
    };
    public primaryYAxis: Object = {
       title: 'Rupees against Dollars',
       interval: 10, lineStyle: {width: 0}, majorTickLines: { width: 0 }
    };
    public chartArea : Object = {
      border: { width : 0}
    };
    public forwardForecast: number = 5;
    public title: string = 'Historical Indian Rupee Rate (INR USD)';
    constructor() {
        //code
    }ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
;
}
```

### Trendline Styling

```typescript
public trendlines = [{
  type: 'Linear',
  width: 3,
  fill: '#e74c3c',
  dashArray: '10,5',  // Dash pattern
  opacity: 0.7,
  marker: {
    visible: true,
    width: 8,
    height: 8
  },
  intercept: 10  // Force specific intercept
}];
```

## Technical Indicators

Technical indicators for financial chart analysis (RSI, MACD, Bollinger Bands, etc.).

### RSI (Relative Strength Index)

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CandleSeriesService, LineSeriesService, RsiIndicatorService, DateTimeService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

let chartData: any[] = [
    {x: new Date('2012-10-15'), open: 90.3357, high: 93.2557, low: 87.0885,close: 87.12,volume: 646996264},
    {x: new Date('2012-10-22'), open: 87.4885, high: 90.7685, low: 84.4285,close: 86.2857,volume: 866040680 },
    {x: new Date('2012-10-29'), open: 84.9828, high: 86.1428, low: 82.1071,close: 82.4,volume: 367371310},
    {x: new Date('2012-11-05'), open: 83.3593, high: 84.3914, low: 76.2457,close: 78.1514,volume: 919719846},
    {x: new Date('2012-11-12'), open: 79.1643, high: 79.2143, low: 72.25,close: 75.3825,volume: 894382149},
    {x: new Date('2012-11-19'), open: 77.2443, high: 81.7143, low: 77.1257,close: 81.6428,volume: 527416747},
    {x: new Date('2012-11-26'), open: 82.2714, high: 84.8928, low: 81.7514,close: 83.6114,volume: 646467974},
    {x: new Date('2012-12-03'), open: 84.8071, high: 84.9414, low: 74.09,close: 76.1785,volume: 980096264},
    {x: new Date('2012-12-10'), open: 75, high: 78.5085, low: 72.2257,close: 72.8277,volume: 835016110},
    {x: new Date('2012-12-17'), open: 72.7043, high: 76.4143, low: 71.6043,close: 74.19,volume: 726150329},
    {x: new Date('2012-12-24'), open: 74.3357, high: 74.8928, low: 72.0943,close: 72.7984,volume: 321104733},
    {x: new Date('2012-12-31'), open: 72.9328, high: 79.2857, low: 72.7143,close: 75.2857,volume: 540854882},
    {x: new Date('2013-01-07'), open: 74.5714, high: 75.9843, low: 73.6,close: 74.3285,volume: 574594262},
    {x: new Date('2013-01-14'), open: 71.8114, high: 72.9643, low: 69.0543,close: 71.4285,volume: 803105621},
    {x: new Date('2013-01-21'), open: 72.08, high: 73.57, low: 62.1428,close: 62.84,volume: 971912560},
    {x: new Date('2013-01-28'), open: 62.5464, high: 66.0857, low: 62.2657,close: 64.8028,volume: 656549587},
    {x: new Date('2013-02-04'), open: 64.8443, high: 68.4014, low: 63.1428,close: 67.8543,volume: 743778993},
    {x: new Date('2013-02-11'), open: 68.0714, high: 69.2771, low: 65.7028,close: 65.7371,volume: 585292366},
    {x: new Date('2013-02-18'), open: 65.8714, high: 66.1043, low: 63.26,close: 64.4014,volume: 421766997},
    {x: new Date('2013-02-25'), open: 64.8357, high: 65.0171, low: 61.4257,close: 61.4957,volume: 582741215},
    {x: new Date('2013-03-04'), open: 61.1143, high: 62.2043, low: 59.8571,close: 61.6743,volume: 632856539},
    {x: new Date('2013-03-11'), open: 61.3928, high: 63.4614, low: 60.7343,close: 63.38,volume: 572066981},
    {x: new Date('2013-03-18'), open: 63.0643, high: 66.0143, low: 63.0286,close: 65.9871,volume: 552156035},
    {x: new Date('2013-03-25'), open: 66.3843, high: 67.1357, low: 63.0886,close: 63.2371,volume: 390762517},
    {x: new Date('2013-04-01'), open: 63.1286, high: 63.3854, low: 59.9543,close: 60.4571,volume: 505273732},
    {x: new Date('2013-04-08'), open: 60.6928, high: 62.57, low: 60.3557,close: 61.4,volume: 387323550},
    {x: new Date('2013-04-15'), open: 61, high: 61.1271, low: 55.0143,close: 55.79,volume: 709945604},
    {x: new Date('2013-04-22'), open: 56.0914, high: 59.8241, low: 55.8964,close: 59.6007,volume: 787007506},
    {x: new Date('2013-04-29'), open: 60.0643, high: 64.7471, low: 60,close: 64.2828,volume: 655020017},
    {x: new Date('2013-05-06'), open: 65.1014, high: 66.5357, low: 64.3543,close: 64.71,volume: 545488533},
    {x: new Date('2013-05-13'), open: 64.5014, high: 65.4143, low: 59.8428,close: 61.8943,volume: 633706550},
    {x: new Date('2013-05-20'), open: 61.7014, high: 64.05, low: 61.4428,close: 63.5928,volume: 494379068},
    {x: new Date('2013-05-27'), open: 64.2714, high: 65.3, low: 62.7714,close: 64.2478,volume: 362907830},
    {x: new Date('2013-06-03'), open: 64.39, high: 64.9186, low: 61.8243,close: 63.1158,volume: 443249793},
    {x: new Date('2013-06-10'), open: 63.5328, high: 64.1541, low: 61.2143,close: 61.4357,volume: 389680092},
    {x: new Date('2013-06-17'), open: 61.6343, high: 62.2428, low: 58.3,close: 59.0714,volume: 400384818},
    {x: new Date('2013-06-24'), open: 58.2, high: 58.38, low: 55.5528,close: 56.6471,volume: 519314826},
    {x: new Date('2013-07-01'), open: 57.5271, high: 60.47, low: 57.3171,close: 59.6314,volume: 343878841},
    {x: new Date('2013-07-08'), open: 60.0157, high: 61.3986, low: 58.6257,close: 60.93,volume: 384106977},
    {x: new Date('2013-07-15'), open: 60.7157, high: 62.1243, low: 60.5957,close: 60.7071,volume: 286035513},
    {x: new Date('2013-07-22'), open: 61.3514, high: 63.5128, low: 59.8157,close: 62.9986,volume: 395816827},
    {x: new Date('2013-07-29'), open: 62.9714, high: 66.1214, low: 62.8857,close: 66.0771,volume: 339668858},
    {x: new Date('2013-08-12'), open: 65.2657, high: 72.0357, low: 65.2328,close: 71.7614,volume: 711563584},
    {x: new Date('2013-08-19'), open: 72.0485, high: 73.3914, low: 71.1714,close: 71.5743,volume: 417119660},
    {x: new Date('2013-08-26'), open: 71.5357, high: 72.8857, low: 69.4286,close: 69.6023,volume: 392805888},
    {x: new Date('2013-09-02'), open: 70.4428, high: 71.7485, low: 69.6214,close: 71.1743,volume: 317244380},
    {x: new Date('2013-09-09'), open: 72.1428, high: 72.56, low: 66.3857,close: 66.4143,volume: 669376320},
    {x: new Date('2013-09-16'), open: 65.8571, high: 68.3643, low: 63.8886,close: 66.7728,volume: 625142677},
    {x: new Date('2013-09-23'), open: 70.8714, high: 70.9871, low: 68.6743,close: 68.9643,volume: 475274537},
    {x: new Date('2013-09-30'), open: 68.1786, high: 70.3357, low: 67.773,close: 69.0043,volume: 368198906},
    {x: new Date('2013-10-07'), open: 69.5086, high: 70.5486, low: 68.3257,close: 70.4017,volume: 361437661},
    {x: new Date('2013-10-14'), open: 69.9757, high: 72.7514, low: 69.9071,close: 72.6985,volume: 342694379},
    {x: new Date('2013-10-21'), open: 73.11, high: 76.1757, low: 72.5757,close: 75.1368,volume: 490458997},
    {x: new Date('2013-10-28'), open: 75.5771, high: 77.0357, low: 73.5057,close: 74.29,volume: 508130174},
    {x: new Date('2013-11-04'), open: 74.4428, high: 75.555, low: 73.1971,close: 74.3657,volume: 318132218},
    {x: new Date('2013-11-11'), open: 74.2843, high: 75.6114, low: 73.4871,close: 74.9987,volume: 306711021},
    {x: new Date('2013-11-18'), open: 74.9985, high: 75.3128, low: 73.3814,close: 74.2571,volume: 282778778},
];
@Component({
imports: [
         ChartModule
    ],

providers: [ CandleSeriesService, LineSeriesService, RsiIndicatorService, DateTimeService],
standalone: true,
    selector: 'app-container',
    template:
            `<ejs-chart id='chartcontainer' style="display:block;" [title]='title' [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis'
              [chartArea]= 'chartArea'>
            <e-series-collection>
                <e-series [dataSource]='data' type='Candle' xName='x' high='high' low='low' open='open' close='close' volume='volume' name='Apple Inc'> </e-series>
            </e-series-collection>
            <e-indicators>
                <e-indicator type='Rsi' xName='x' field="Close" fill="blue" seriesName='Apple Inc'> </e-indicator>
            </e-indicators>
        </ejs-chart>`
})
export class AppComponent implements OnInit {
 public data: Object[] = chartData;
    public primaryXAxis: Object = {
        title: 'Months',
        valueType: 'DateTime',
        intervalType: 'Months',
        majorGridLines: { width: 0},
    };
    public primaryYAxis: Object = {
        title: 'Price',
        labelFormat: '${value}',
        minimum: 30, maximum: 180,
        interval: 30,
    };
    public title: string = 'AAPL 2012-2017';
    public chartArea : Object = {
      border: { width : 0}
    };
    constructor() {
        //code
    }ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
;
}
```

### MACD (Moving Average Convergence Divergence)

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CandleSeriesService, LineSeriesService, MacdIndicatorService, DateTimeService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

let chartData: any[] = [
    {x: new Date('2012-10-15'), open: 90.3357, high: 93.2557, low: 87.0885,close: 87.12,volume: 646996264},
    {x: new Date('2012-10-22'), open: 87.4885, high: 90.7685, low: 84.4285,close: 86.2857,volume: 866040680 },
    {x: new Date('2012-10-29'), open: 84.9828, high: 86.1428, low: 82.1071,close: 82.4,volume: 367371310},
    {x: new Date('2012-11-05'), open: 83.3593, high: 84.3914, low: 76.2457,close: 78.1514,volume: 919719846},
    {x: new Date('2012-11-12'), open: 79.1643, high: 79.2143, low: 72.25,close: 75.3825,volume: 894382149},
    {x: new Date('2012-11-19'), open: 77.2443, high: 81.7143, low: 77.1257,close: 81.6428,volume: 527416747},
    {x: new Date('2012-11-26'), open: 82.2714, high: 84.8928, low: 81.7514,close: 83.6114,volume: 646467974},
    {x: new Date('2012-12-03'), open: 84.8071, high: 84.9414, low: 74.09,close: 76.1785,volume: 980096264},
    {x: new Date('2012-12-10'), open: 75, high: 78.5085, low: 72.2257,close: 72.8277,volume: 835016110},
    {x: new Date('2012-12-17'), open: 72.7043, high: 76.4143, low: 71.6043,close: 74.19,volume: 726150329},
    {x: new Date('2012-12-24'), open: 74.3357, high: 74.8928, low: 72.0943,close: 72.7984,volume: 321104733},
    {x: new Date('2012-12-31'), open: 72.9328, high: 79.2857, low: 72.7143,close: 75.2857,volume: 540854882},
    {x: new Date('2013-01-07'), open: 74.5714, high: 75.9843, low: 73.6,close: 74.3285,volume: 574594262},
    {x: new Date('2013-01-14'), open: 71.8114, high: 72.9643, low: 69.0543,close: 71.4285,volume: 803105621},
    {x: new Date('2013-01-21'), open: 72.08, high: 73.57, low: 62.1428,close: 62.84,volume: 971912560},
    {x: new Date('2013-01-28'), open: 62.5464, high: 66.0857, low: 62.2657,close: 64.8028,volume: 656549587},
    {x: new Date('2013-02-04'), open: 64.8443, high: 68.4014, low: 63.1428,close: 67.8543,volume: 743778993},
    {x: new Date('2013-02-11'), open: 68.0714, high: 69.2771, low: 65.7028,close: 65.7371,volume: 585292366},
    {x: new Date('2013-02-18'), open: 65.8714, high: 66.1043, low: 63.26,close: 64.4014,volume: 421766997},
    {x: new Date('2013-02-25'), open: 64.8357, high: 65.0171, low: 61.4257,close: 61.4957,volume: 582741215},
    {x: new Date('2013-03-04'), open: 61.1143, high: 62.2043, low: 59.8571,close: 61.6743,volume: 632856539},
    {x: new Date('2013-03-11'), open: 61.3928, high: 63.4614, low: 60.7343,close: 63.38,volume: 572066981},
    {x: new Date('2013-03-18'), open: 63.0643, high: 66.0143, low: 63.0286,close: 65.9871,volume: 552156035},
    {x: new Date('2013-03-25'), open: 66.3843, high: 67.1357, low: 63.0886,close: 63.2371,volume: 390762517},
    {x: new Date('2013-04-01'), open: 63.1286, high: 63.3854, low: 59.9543,close: 60.4571,volume: 505273732},
    {x: new Date('2013-04-08'), open: 60.6928, high: 62.57, low: 60.3557,close: 61.4,volume: 387323550},
    {x: new Date('2013-04-15'), open: 61, high: 61.1271, low: 55.0143,close: 55.79,volume: 709945604},
    {x: new Date('2013-04-22'), open: 56.0914, high: 59.8241, low: 55.8964,close: 59.6007,volume: 787007506},
    {x: new Date('2013-04-29'), open: 60.0643, high: 64.7471, low: 60,close: 64.2828,volume: 655020017},
    {x: new Date('2013-05-06'), open: 65.1014, high: 66.5357, low: 64.3543,close: 64.71,volume: 545488533},
    {x: new Date('2013-05-13'), open: 64.5014, high: 65.4143, low: 59.8428,close: 61.8943,volume: 633706550},
    {x: new Date('2013-05-20'), open: 61.7014, high: 64.05, low: 61.4428,close: 63.5928,volume: 494379068},
    {x: new Date('2013-05-27'), open: 64.2714, high: 65.3, low: 62.7714,close: 64.2478,volume: 362907830},
    {x: new Date('2013-06-03'), open: 64.39, high: 64.9186, low: 61.8243,close: 63.1158,volume: 443249793},
    {x: new Date('2013-06-10'), open: 63.5328, high: 64.1541, low: 61.2143,close: 61.4357,volume: 389680092},
    {x: new Date('2013-06-17'), open: 61.6343, high: 62.2428, low: 58.3,close: 59.0714,volume: 400384818},
    {x: new Date('2013-06-24'), open: 58.2, high: 58.38, low: 55.5528,close: 56.6471,volume: 519314826},
    {x: new Date('2013-07-01'), open: 57.5271, high: 60.47, low: 57.3171,close: 59.6314,volume: 343878841},
    {x: new Date('2013-07-08'), open: 60.0157, high: 61.3986, low: 58.6257,close: 60.93,volume: 384106977},
    {x: new Date('2013-07-15'), open: 60.7157, high: 62.1243, low: 60.5957,close: 60.7071,volume: 286035513},
    {x: new Date('2013-07-22'), open: 61.3514, high: 63.5128, low: 59.8157,close: 62.9986,volume: 395816827},
    {x: new Date('2013-07-29'), open: 62.9714, high: 66.1214, low: 62.8857,close: 66.0771,volume: 339668858},
    {x: new Date('2013-08-12'), open: 65.2657, high: 72.0357, low: 65.2328,close: 71.7614,volume: 711563584},
    {x: new Date('2013-08-19'), open: 72.0485, high: 73.3914, low: 71.1714,close: 71.5743,volume: 417119660},
    {x: new Date('2013-08-26'), open: 71.5357, high: 72.8857, low: 69.4286,close: 69.6023,volume: 392805888},
    {x: new Date('2013-09-02'), open: 70.4428, high: 71.7485, low: 69.6214,close: 71.1743,volume: 317244380},
    {x: new Date('2013-09-09'), open: 72.1428, high: 72.56, low: 66.3857,close: 66.4143,volume: 669376320},
    {x: new Date('2013-09-16'), open: 65.8571, high: 68.3643, low: 63.8886,close: 66.7728,volume: 625142677},
    {x: new Date('2013-09-23'), open: 70.8714, high: 70.9871, low: 68.6743,close: 68.9643,volume: 475274537},
    {x: new Date('2013-09-30'), open: 68.1786, high: 70.3357, low: 67.773,close: 69.0043,volume: 368198906},
    {x: new Date('2013-10-07'), open: 69.5086, high: 70.5486, low: 68.3257,close: 70.4017,volume: 361437661},
    {x: new Date('2013-10-14'), open: 69.9757, high: 72.7514, low: 69.9071,close: 72.6985,volume: 342694379},
    {x: new Date('2013-10-21'), open: 73.11, high: 76.1757, low: 72.5757,close: 75.1368,volume: 490458997},
    {x: new Date('2013-10-28'), open: 75.5771, high: 77.0357, low: 73.5057,close: 74.29,volume: 508130174},
    {x: new Date('2013-11-04'), open: 74.4428, high: 75.555, low: 73.1971,close: 74.3657,volume: 318132218},
    {x: new Date('2013-11-11'), open: 74.2843, high: 75.6114, low: 73.4871,close: 74.9987,volume: 306711021},
    {x: new Date('2013-11-18'), open: 74.9985, high: 75.3128, low: 73.3814,close: 74.2571,volume: 282778778},
];
@Component({
imports: [
         ChartModule
    ],

providers: [ CandleSeriesService, LineSeriesService, MacdIndicatorService, DateTimeService, ColumnSeriesService],
standalone: true,
    selector: 'app-container',
    template:
            `<ejs-chart id='chartcontainer' style="display:block;" [title]='title' [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis'
              [chartArea]= 'chartArea'>
            <e-series-collection>
                <e-series [dataSource]='data' type='Candle' xName='x' high='high' low='low' open='open' close='close' volume='volume' name='Apple Inc'> </e-series>
            </e-series-collection>
            <e-indicators>
                <e-indicator type='Macd' xName='x' field="Close" fill="blue"  seriesName='Apple Inc'> </e-indicator>
            </e-indicators>
        </ejs-chart>`
})
export class AppComponent implements OnInit {
 public data: Object[] = chartData;
    public primaryXAxis: Object = {
        title: 'Months',
        valueType: 'DateTime',
        intervalType: 'Months',
        majorGridLines: { width: 0},
    };
    public primaryYAxis: Object = {
        title: 'Price',
        labelFormat: '${value}',
        minimum: 30, maximum: 180,
        interval: 30,
    };
    public title: string = 'AAPL 2012-2017';
    public chartArea : Object = {
      border: { width : 0}
    };
    constructor() {
        //code
    };
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    };
}
```
```typescript
public indicators = [{
  type: 'Macd',
  field: 'Close',
  seriesName: 'Stock',
  yAxisName: 'secondary',
  fastPeriod: 12,
  slowPeriod: 26,
  trigger: 9,
  macdType: 'Both',  // Both, Line, Histogram
  fill: '#6063ff'
}];
```

### Bollinger Bands

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CandleSeriesService, LineSeriesService, BollingerBandsService, DateTimeService, RangeAreaSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

let chartData: any[] = [
    {x: new Date('2012-10-15'), open: 90.3357, high: 93.2557, low: 87.0885,close: 87.12,volume: 646996264},
    {x: new Date('2012-10-22'), open: 87.4885, high: 90.7685, low: 84.4285,close: 86.2857,volume: 866040680 },
    {x: new Date('2012-10-29'), open: 84.9828, high: 86.1428, low: 82.1071,close: 82.4,volume: 367371310},
    {x: new Date('2012-11-05'), open: 83.3593, high: 84.3914, low: 76.2457,close: 78.1514,volume: 919719846},
    {x: new Date('2012-11-12'), open: 79.1643, high: 79.2143, low: 72.25,close: 75.3825,volume: 894382149},
    {x: new Date('2012-11-19'), open: 77.2443, high: 81.7143, low: 77.1257,close: 81.6428,volume: 527416747},
    {x: new Date('2012-11-26'), open: 82.2714, high: 84.8928, low: 81.7514,close: 83.6114,volume: 646467974},
    {x: new Date('2012-12-03'), open: 84.8071, high: 84.9414, low: 74.09,close: 76.1785,volume: 980096264},
    {x: new Date('2012-12-10'), open: 75, high: 78.5085, low: 72.2257,close: 72.8277,volume: 835016110},
    {x: new Date('2012-12-17'), open: 72.7043, high: 76.4143, low: 71.6043,close: 74.19,volume: 726150329},
    {x: new Date('2012-12-24'), open: 74.3357, high: 74.8928, low: 72.0943,close: 72.7984,volume: 321104733},
    {x: new Date('2012-12-31'), open: 72.9328, high: 79.2857, low: 72.7143,close: 75.2857,volume: 540854882},
    {x: new Date('2013-01-07'), open: 74.5714, high: 75.9843, low: 73.6,close: 74.3285,volume: 574594262},
    {x: new Date('2013-01-14'), open: 71.8114, high: 72.9643, low: 69.0543,close: 71.4285,volume: 803105621},
    {x: new Date('2013-01-21'), open: 72.08, high: 73.57, low: 62.1428,close: 62.84,volume: 971912560},
    {x: new Date('2013-01-28'), open: 62.5464, high: 66.0857, low: 62.2657,close: 64.8028,volume: 656549587},
    {x: new Date('2013-02-04'), open: 64.8443, high: 68.4014, low: 63.1428,close: 67.8543,volume: 743778993},
    {x: new Date('2013-02-11'), open: 68.0714, high: 69.2771, low: 65.7028,close: 65.7371,volume: 585292366},
    {x: new Date('2013-02-18'), open: 65.8714, high: 66.1043, low: 63.26,close: 64.4014,volume: 421766997},
    {x: new Date('2013-02-25'), open: 64.8357, high: 65.0171, low: 61.4257,close: 61.4957,volume: 582741215},
    {x: new Date('2013-03-04'), open: 61.1143, high: 62.2043, low: 59.8571,close: 61.6743,volume: 632856539},
    {x: new Date('2013-03-11'), open: 61.3928, high: 63.4614, low: 60.7343,close: 63.38,volume: 572066981},
    {x: new Date('2013-03-18'), open: 63.0643, high: 66.0143, low: 63.0286,close: 65.9871,volume: 552156035},
    {x: new Date('2013-03-25'), open: 66.3843, high: 67.1357, low: 63.0886,close: 63.2371,volume: 390762517},
    {x: new Date('2013-04-01'), open: 63.1286, high: 63.3854, low: 59.9543,close: 60.4571,volume: 505273732},
    {x: new Date('2013-04-08'), open: 60.6928, high: 62.57, low: 60.3557,close: 61.4,volume: 387323550},
    {x: new Date('2013-04-15'), open: 61, high: 61.1271, low: 55.0143,close: 55.79,volume: 709945604},
    {x: new Date('2013-04-22'), open: 56.0914, high: 59.8241, low: 55.8964,close: 59.6007,volume: 787007506},
    {x: new Date('2013-04-29'), open: 60.0643, high: 64.7471, low: 60,close: 64.2828,volume: 655020017},
    {x: new Date('2013-05-06'), open: 65.1014, high: 66.5357, low: 64.3543,close: 64.71,volume: 545488533},
    {x: new Date('2013-05-13'), open: 64.5014, high: 65.4143, low: 59.8428,close: 61.8943,volume: 633706550},
    {x: new Date('2013-05-20'), open: 61.7014, high: 64.05, low: 61.4428,close: 63.5928,volume: 494379068},
    {x: new Date('2013-05-27'), open: 64.2714, high: 65.3, low: 62.7714,close: 64.2478,volume: 362907830},
    {x: new Date('2013-06-03'), open: 64.39, high: 64.9186, low: 61.8243,close: 63.1158,volume: 443249793},
    {x: new Date('2013-06-10'), open: 63.5328, high: 64.1541, low: 61.2143,close: 61.4357,volume: 389680092},
    {x: new Date('2013-06-17'), open: 61.6343, high: 62.2428, low: 58.3,close: 59.0714,volume: 400384818},
    {x: new Date('2013-06-24'), open: 58.2, high: 58.38, low: 55.5528,close: 56.6471,volume: 519314826},
    {x: new Date('2013-07-01'), open: 57.5271, high: 60.47, low: 57.3171,close: 59.6314,volume: 343878841},
    {x: new Date('2013-07-08'), open: 60.0157, high: 61.3986, low: 58.6257,close: 60.93,volume: 384106977},
    {x: new Date('2013-07-15'), open: 60.7157, high: 62.1243, low: 60.5957,close: 60.7071,volume: 286035513},
    {x: new Date('2013-07-22'), open: 61.3514, high: 63.5128, low: 59.8157,close: 62.9986,volume: 395816827},
    {x: new Date('2013-07-29'), open: 62.9714, high: 66.1214, low: 62.8857,close: 66.0771,volume: 339668858},
    {x: new Date('2013-08-12'), open: 65.2657, high: 72.0357, low: 65.2328,close: 71.7614,volume: 711563584},
    {x: new Date('2013-08-19'), open: 72.0485, high: 73.3914, low: 71.1714,close: 71.5743,volume: 417119660},
    {x: new Date('2013-08-26'), open: 71.5357, high: 72.8857, low: 69.4286,close: 69.6023,volume: 392805888},
    {x: new Date('2013-09-02'), open: 70.4428, high: 71.7485, low: 69.6214,close: 71.1743,volume: 317244380},
    {x: new Date('2013-09-09'), open: 72.1428, high: 72.56, low: 66.3857,close: 66.4143,volume: 669376320},
    {x: new Date('2013-09-16'), open: 65.8571, high: 68.3643, low: 63.8886,close: 66.7728,volume: 625142677},
    {x: new Date('2013-09-23'), open: 70.8714, high: 70.9871, low: 68.6743,close: 68.9643,volume: 475274537},
    {x: new Date('2013-09-30'), open: 68.1786, high: 70.3357, low: 67.773,close: 69.0043,volume: 368198906},
    {x: new Date('2013-10-07'), open: 69.5086, high: 70.5486, low: 68.3257,close: 70.4017,volume: 361437661},
    {x: new Date('2013-10-14'), open: 69.9757, high: 72.7514, low: 69.9071,close: 72.6985,volume: 342694379},
    {x: new Date('2013-10-21'), open: 73.11, high: 76.1757, low: 72.5757,close: 75.1368,volume: 490458997},
    {x: new Date('2013-10-28'), open: 75.5771, high: 77.0357, low: 73.5057,close: 74.29,volume: 508130174},
    {x: new Date('2013-11-04'), open: 74.4428, high: 75.555, low: 73.1971,close: 74.3657,volume: 318132218},
    {x: new Date('2013-11-11'), open: 74.2843, high: 75.6114, low: 73.4871,close: 74.9987,volume: 306711021},
    {x: new Date('2013-11-18'), open: 74.9985, high: 75.3128, low: 73.3814,close: 74.2571,volume: 282778778},
];
@Component({
imports: [
         ChartModule
    ],

providers: [ CandleSeriesService, LineSeriesService, BollingerBandsService, DateTimeService, RangeAreaSeriesService],
standalone: true,
    selector: 'app-container',
    template:
            `<ejs-chart id='chartcontainer' style="display:block;" [title]='title' [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis'
              [chartArea]= 'chartArea'>
            <e-series-collection>
                <e-series [dataSource]='data' type='Candle' xName='x' high='high' low='low' open='open' close='close' volume='volume' name='Apple Inc'> </e-series>
            </e-series-collection>
            <e-indicators>
                <e-indicator type='BollingerBands' xName='x' field="Close" fill="blue"  seriesName='Apple Inc'> </e-indicator>
            </e-indicators>
        </ejs-chart>`
})
export class AppComponent implements OnInit {
 public data: Object[] = chartData;
    public primaryXAxis: Object = {
        title: 'Months',
        valueType: 'DateTime',
        intervalType: 'Months',
        majorGridLines: { width: 0},
    };
    public primaryYAxis: Object = {
        title: 'Price',
        labelFormat: '${value}',
        minimum: 30, maximum: 180,
        interval: 30,
    };
    public title: string = 'AAPL 2012-2017';
    public chartArea : Object = {
      border: { width : 0}
    };
    constructor() {
        //code
    }ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
;
}
```


```typescript
public indicators = [{
  type: 'BollingerBands',
  field: 'Close',
  seriesName: 'Stock',
  period: 14,
  standardDeviation: 2,
  fill: '#6063ff',
  upperLine: { color: '#e74c3c', width: 1 },
  lowerLine: { color: '#3498db', width: 1 }
}];
```

### Other Indicators

**EMA (Exponential Moving Average):**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CandleSeriesService, LineSeriesService, EmaIndicatorService, DateTimeService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

let chartData: any[] = [
    {x: new Date('2012-10-15'), open: 90.3357, high: 93.2557, low: 87.0885,close: 87.12,volume: 646996264},
    {x: new Date('2012-10-22'), open: 87.4885, high: 90.7685, low: 84.4285,close: 86.2857,volume: 866040680 },
    {x: new Date('2012-10-29'), open: 84.9828, high: 86.1428, low: 82.1071,close: 82.4,volume: 367371310},
    {x: new Date('2012-11-05'), open: 83.3593, high: 84.3914, low: 76.2457,close: 78.1514,volume: 919719846},
    {x: new Date('2012-11-12'), open: 79.1643, high: 79.2143, low: 72.25,close: 75.3825,volume: 894382149},
    {x: new Date('2012-11-19'), open: 77.2443, high: 81.7143, low: 77.1257,close: 81.6428,volume: 527416747},
    {x: new Date('2012-11-26'), open: 82.2714, high: 84.8928, low: 81.7514,close: 83.6114,volume: 646467974},
    {x: new Date('2012-12-03'), open: 84.8071, high: 84.9414, low: 74.09,close: 76.1785,volume: 980096264},
    {x: new Date('2012-12-10'), open: 75, high: 78.5085, low: 72.2257,close: 72.8277,volume: 835016110},
    {x: new Date('2012-12-17'), open: 72.7043, high: 76.4143, low: 71.6043,close: 74.19,volume: 726150329},
    {x: new Date('2012-12-24'), open: 74.3357, high: 74.8928, low: 72.0943,close: 72.7984,volume: 321104733},
    {x: new Date('2012-12-31'), open: 72.9328, high: 79.2857, low: 72.7143,close: 75.2857,volume: 540854882},
    {x: new Date('2013-01-07'), open: 74.5714, high: 75.9843, low: 73.6,close: 74.3285,volume: 574594262},
    {x: new Date('2013-01-14'), open: 71.8114, high: 72.9643, low: 69.0543,close: 71.4285,volume: 803105621},
    {x: new Date('2013-01-21'), open: 72.08, high: 73.57, low: 62.1428,close: 62.84,volume: 971912560},
    {x: new Date('2013-01-28'), open: 62.5464, high: 66.0857, low: 62.2657,close: 64.8028,volume: 656549587},
    {x: new Date('2013-02-04'), open: 64.8443, high: 68.4014, low: 63.1428,close: 67.8543,volume: 743778993},
    {x: new Date('2013-02-11'), open: 68.0714, high: 69.2771, low: 65.7028,close: 65.7371,volume: 585292366},
    {x: new Date('2013-02-18'), open: 65.8714, high: 66.1043, low: 63.26,close: 64.4014,volume: 421766997},
    {x: new Date('2013-02-25'), open: 64.8357, high: 65.0171, low: 61.4257,close: 61.4957,volume: 582741215},
    {x: new Date('2013-03-04'), open: 61.1143, high: 62.2043, low: 59.8571,close: 61.6743,volume: 632856539},
    {x: new Date('2013-03-11'), open: 61.3928, high: 63.4614, low: 60.7343,close: 63.38,volume: 572066981},
    {x: new Date('2013-03-18'), open: 63.0643, high: 66.0143, low: 63.0286,close: 65.9871,volume: 552156035},
    {x: new Date('2013-03-25'), open: 66.3843, high: 67.1357, low: 63.0886,close: 63.2371,volume: 390762517},
    {x: new Date('2013-04-01'), open: 63.1286, high: 63.3854, low: 59.9543,close: 60.4571,volume: 505273732},
    {x: new Date('2013-04-08'), open: 60.6928, high: 62.57, low: 60.3557,close: 61.4,volume: 387323550},
    {x: new Date('2013-04-15'), open: 61, high: 61.1271, low: 55.0143,close: 55.79,volume: 709945604},
    {x: new Date('2013-04-22'), open: 56.0914, high: 59.8241, low: 55.8964,close: 59.6007,volume: 787007506},
    {x: new Date('2013-04-29'), open: 60.0643, high: 64.7471, low: 60,close: 64.2828,volume: 655020017},
    {x: new Date('2013-05-06'), open: 65.1014, high: 66.5357, low: 64.3543,close: 64.71,volume: 545488533},
    {x: new Date('2013-05-13'), open: 64.5014, high: 65.4143, low: 59.8428,close: 61.8943,volume: 633706550},
    {x: new Date('2013-05-20'), open: 61.7014, high: 64.05, low: 61.4428,close: 63.5928,volume: 494379068},
    {x: new Date('2013-05-27'), open: 64.2714, high: 65.3, low: 62.7714,close: 64.2478,volume: 362907830},
    {x: new Date('2013-06-03'), open: 64.39, high: 64.9186, low: 61.8243,close: 63.1158,volume: 443249793},
    {x: new Date('2013-06-10'), open: 63.5328, high: 64.1541, low: 61.2143,close: 61.4357,volume: 389680092},
    {x: new Date('2013-06-17'), open: 61.6343, high: 62.2428, low: 58.3,close: 59.0714,volume: 400384818},
    {x: new Date('2013-06-24'), open: 58.2, high: 58.38, low: 55.5528,close: 56.6471,volume: 519314826},
    {x: new Date('2013-07-01'), open: 57.5271, high: 60.47, low: 57.3171,close: 59.6314,volume: 343878841},
    {x: new Date('2013-07-08'), open: 60.0157, high: 61.3986, low: 58.6257,close: 60.93,volume: 384106977},
    {x: new Date('2013-07-15'), open: 60.7157, high: 62.1243, low: 60.5957,close: 60.7071,volume: 286035513},
    {x: new Date('2013-07-22'), open: 61.3514, high: 63.5128, low: 59.8157,close: 62.9986,volume: 395816827},
    {x: new Date('2013-07-29'), open: 62.9714, high: 66.1214, low: 62.8857,close: 66.0771,volume: 339668858},
    {x: new Date('2013-08-12'), open: 65.2657, high: 72.0357, low: 65.2328,close: 71.7614,volume: 711563584},
    {x: new Date('2013-08-19'), open: 72.0485, high: 73.3914, low: 71.1714,close: 71.5743,volume: 417119660},
    {x: new Date('2013-08-26'), open: 71.5357, high: 72.8857, low: 69.4286,close: 69.6023,volume: 392805888},
    {x: new Date('2013-09-02'), open: 70.4428, high: 71.7485, low: 69.6214,close: 71.1743,volume: 317244380},
    {x: new Date('2013-09-09'), open: 72.1428, high: 72.56, low: 66.3857,close: 66.4143,volume: 669376320},
    {x: new Date('2013-09-16'), open: 65.8571, high: 68.3643, low: 63.8886,close: 66.7728,volume: 625142677},
    {x: new Date('2013-09-23'), open: 70.8714, high: 70.9871, low: 68.6743,close: 68.9643,volume: 475274537},
    {x: new Date('2013-09-30'), open: 68.1786, high: 70.3357, low: 67.773,close: 69.0043,volume: 368198906},
    {x: new Date('2013-10-07'), open: 69.5086, high: 70.5486, low: 68.3257,close: 70.4017,volume: 361437661},
    {x: new Date('2013-10-14'), open: 69.9757, high: 72.7514, low: 69.9071,close: 72.6985,volume: 342694379},
    {x: new Date('2013-10-21'), open: 73.11, high: 76.1757, low: 72.5757,close: 75.1368,volume: 490458997},
    {x: new Date('2013-10-28'), open: 75.5771, high: 77.0357, low: 73.5057,close: 74.29,volume: 508130174},
    {x: new Date('2013-11-04'), open: 74.4428, high: 75.555, low: 73.1971,close: 74.3657,volume: 318132218},
    {x: new Date('2013-11-11'), open: 74.2843, high: 75.6114, low: 73.4871,close: 74.9987,volume: 306711021},
    {x: new Date('2013-11-18'), open: 74.9985, high: 75.3128, low: 73.3814,close: 74.2571,volume: 282778778},
];
@Component({
imports: [
         ChartModule
    ],

providers: [ CandleSeriesService, LineSeriesService, EmaIndicatorService, DateTimeService],
standalone: true,
    selector: 'app-container',
    template:
            `<ejs-chart id='chartcontainer' style="display:block;" [title]='title' [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis'
              [chartArea]= 'chartArea'>
            <e-series-collection>
                <e-series [dataSource]='data' type='Candle' xName='x' high='high' low='low' open='open' close='close' volume='volume' name='Apple Inc'> </e-series>
            </e-series-collection>
            <e-indicators>
                <e-indicator type='Ema' xName='x' field="Close" fill="blue" seriesName='Apple Inc'> </e-indicator>
            </e-indicators>
        </ejs-chart>`
})
export class AppComponent implements OnInit {
 public data: Object[] = chartData;
    public primaryXAxis: Object = {
        title: 'Months',
        valueType: 'DateTime',
        intervalType: 'Months',
        majorGridLines: { width: 0},
    };
    public primaryYAxis: Object = {
        title: 'Price',
        labelFormat: '${value}',
        minimum: 30, maximum: 180,
        interval: 30,
    };
    public title: string = 'AAPL 2012-2017';
    public chartArea : Object = {
      border: { width : 0}
    };
    constructor() {
        //code
    }ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
;
}
```

```typescript
public indicators = [{ type: 'Ema', field: 'Close', period: 14 }];
```

**SMA (Simple Moving Average):**
```typescript
public indicators = [{ type: 'Sma', field: 'Close', period: 14 }];
```

**ATR (Average True Range):**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CandleSeriesService, LineSeriesService, SmaIndicatorService, DateTimeService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

let chartData: any[] = [
    {x: new Date('2012-10-15'), open: 90.3357, high: 93.2557, low: 87.0885,close: 87.12,volume: 646996264},
    {x: new Date('2012-10-22'), open: 87.4885, high: 90.7685, low: 84.4285,close: 86.2857,volume: 866040680 },
    {x: new Date('2012-10-29'), open: 84.9828, high: 86.1428, low: 82.1071,close: 82.4,volume: 367371310},
    {x: new Date('2012-11-05'), open: 83.3593, high: 84.3914, low: 76.2457,close: 78.1514,volume: 919719846},
    {x: new Date('2012-11-12'), open: 79.1643, high: 79.2143, low: 72.25,close: 75.3825,volume: 894382149},
    {x: new Date('2012-11-19'), open: 77.2443, high: 81.7143, low: 77.1257,close: 81.6428,volume: 527416747},
    {x: new Date('2012-11-26'), open: 82.2714, high: 84.8928, low: 81.7514,close: 83.6114,volume: 646467974},
    {x: new Date('2012-12-03'), open: 84.8071, high: 84.9414, low: 74.09,close: 76.1785,volume: 980096264},
    {x: new Date('2012-12-10'), open: 75, high: 78.5085, low: 72.2257,close: 72.8277,volume: 835016110},
    {x: new Date('2012-12-17'), open: 72.7043, high: 76.4143, low: 71.6043,close: 74.19,volume: 726150329},
    {x: new Date('2012-12-24'), open: 74.3357, high: 74.8928, low: 72.0943,close: 72.7984,volume: 321104733},
    {x: new Date('2012-12-31'), open: 72.9328, high: 79.2857, low: 72.7143,close: 75.2857,volume: 540854882},
    {x: new Date('2013-01-07'), open: 74.5714, high: 75.9843, low: 73.6,close: 74.3285,volume: 574594262},
    {x: new Date('2013-01-14'), open: 71.8114, high: 72.9643, low: 69.0543,close: 71.4285,volume: 803105621},
    {x: new Date('2013-01-21'), open: 72.08, high: 73.57, low: 62.1428,close: 62.84,volume: 971912560},
    {x: new Date('2013-01-28'), open: 62.5464, high: 66.0857, low: 62.2657,close: 64.8028,volume: 656549587},
    {x: new Date('2013-02-04'), open: 64.8443, high: 68.4014, low: 63.1428,close: 67.8543,volume: 743778993},
    {x: new Date('2013-02-11'), open: 68.0714, high: 69.2771, low: 65.7028,close: 65.7371,volume: 585292366},
    {x: new Date('2013-02-18'), open: 65.8714, high: 66.1043, low: 63.26,close: 64.4014,volume: 421766997},
    {x: new Date('2013-02-25'), open: 64.8357, high: 65.0171, low: 61.4257,close: 61.4957,volume: 582741215},
    {x: new Date('2013-03-04'), open: 61.1143, high: 62.2043, low: 59.8571,close: 61.6743,volume: 632856539},
    {x: new Date('2013-03-11'), open: 61.3928, high: 63.4614, low: 60.7343,close: 63.38,volume: 572066981},
    {x: new Date('2013-03-18'), open: 63.0643, high: 66.0143, low: 63.0286,close: 65.9871,volume: 552156035},
    {x: new Date('2013-03-25'), open: 66.3843, high: 67.1357, low: 63.0886,close: 63.2371,volume: 390762517},
    {x: new Date('2013-04-01'), open: 63.1286, high: 63.3854, low: 59.9543,close: 60.4571,volume: 505273732},
    {x: new Date('2013-04-08'), open: 60.6928, high: 62.57, low: 60.3557,close: 61.4,volume: 387323550},
    {x: new Date('2013-04-15'), open: 61, high: 61.1271, low: 55.0143,close: 55.79,volume: 709945604},
    {x: new Date('2013-04-22'), open: 56.0914, high: 59.8241, low: 55.8964,close: 59.6007,volume: 787007506},
    {x: new Date('2013-04-29'), open: 60.0643, high: 64.7471, low: 60,close: 64.2828,volume: 655020017},
    {x: new Date('2013-05-06'), open: 65.1014, high: 66.5357, low: 64.3543,close: 64.71,volume: 545488533},
    {x: new Date('2013-05-13'), open: 64.5014, high: 65.4143, low: 59.8428,close: 61.8943,volume: 633706550},
    {x: new Date('2013-05-20'), open: 61.7014, high: 64.05, low: 61.4428,close: 63.5928,volume: 494379068},
    {x: new Date('2013-05-27'), open: 64.2714, high: 65.3, low: 62.7714,close: 64.2478,volume: 362907830},
    {x: new Date('2013-06-03'), open: 64.39, high: 64.9186, low: 61.8243,close: 63.1158,volume: 443249793},
    {x: new Date('2013-06-10'), open: 63.5328, high: 64.1541, low: 61.2143,close: 61.4357,volume: 389680092},
    {x: new Date('2013-06-17'), open: 61.6343, high: 62.2428, low: 58.3,close: 59.0714,volume: 400384818},
    {x: new Date('2013-06-24'), open: 58.2, high: 58.38, low: 55.5528,close: 56.6471,volume: 519314826},
    {x: new Date('2013-07-01'), open: 57.5271, high: 60.47, low: 57.3171,close: 59.6314,volume: 343878841},
    {x: new Date('2013-07-08'), open: 60.0157, high: 61.3986, low: 58.6257,close: 60.93,volume: 384106977},
    {x: new Date('2013-07-15'), open: 60.7157, high: 62.1243, low: 60.5957,close: 60.7071,volume: 286035513},
    {x: new Date('2013-07-22'), open: 61.3514, high: 63.5128, low: 59.8157,close: 62.9986,volume: 395816827},
    {x: new Date('2013-07-29'), open: 62.9714, high: 66.1214, low: 62.8857,close: 66.0771,volume: 339668858},
    {x: new Date('2013-08-12'), open: 65.2657, high: 72.0357, low: 65.2328,close: 71.7614,volume: 711563584},
    {x: new Date('2013-08-19'), open: 72.0485, high: 73.3914, low: 71.1714,close: 71.5743,volume: 417119660},
    {x: new Date('2013-08-26'), open: 71.5357, high: 72.8857, low: 69.4286,close: 69.6023,volume: 392805888},
    {x: new Date('2013-09-02'), open: 70.4428, high: 71.7485, low: 69.6214,close: 71.1743,volume: 317244380},
    {x: new Date('2013-09-09'), open: 72.1428, high: 72.56, low: 66.3857,close: 66.4143,volume: 669376320},
    {x: new Date('2013-09-16'), open: 65.8571, high: 68.3643, low: 63.8886,close: 66.7728,volume: 625142677},
    {x: new Date('2013-09-23'), open: 70.8714, high: 70.9871, low: 68.6743,close: 68.9643,volume: 475274537},
    {x: new Date('2013-09-30'), open: 68.1786, high: 70.3357, low: 67.773,close: 69.0043,volume: 368198906},
    {x: new Date('2013-10-07'), open: 69.5086, high: 70.5486, low: 68.3257,close: 70.4017,volume: 361437661},
    {x: new Date('2013-10-14'), open: 69.9757, high: 72.7514, low: 69.9071,close: 72.6985,volume: 342694379},
    {x: new Date('2013-10-21'), open: 73.11, high: 76.1757, low: 72.5757,close: 75.1368,volume: 490458997},
    {x: new Date('2013-10-28'), open: 75.5771, high: 77.0357, low: 73.5057,close: 74.29,volume: 508130174},
    {x: new Date('2013-11-04'), open: 74.4428, high: 75.555, low: 73.1971,close: 74.3657,volume: 318132218},
    {x: new Date('2013-11-11'), open: 74.2843, high: 75.6114, low: 73.4871,close: 74.9987,volume: 306711021},
    {x: new Date('2013-11-18'), open: 74.9985, high: 75.3128, low: 73.3814,close: 74.2571,volume: 282778778},
];
@Component({
imports: [
         ChartModule
    ],

providers: [ CandleSeriesService, LineSeriesService, SmaIndicatorService, DateTimeService],
standalone: true,
    selector: 'app-container',
    template:
            `<ejs-chart id='chartcontainer' style="display:block;" [title]='title' [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis'
              [chartArea]= 'chartArea'>
            <e-series-collection>
                <e-series [dataSource]='data' type='Candle' xName='x' high='high' low='low' open='open' close='close' volume='volume' name='Apple Inc'> </e-series>
            </e-series-collection>
            <e-indicators>
                <e-indicator type='Sma' xName='x' field="Close" fill="blue" seriesName='Apple Inc'> </e-indicator>
            </e-indicators>
        </ejs-chart>`
})
export class AppComponent implements OnInit {
 public data: Object[] = chartData;
    public primaryXAxis: Object = {
        title: 'Months',
        valueType: 'DateTime',
        intervalType: 'Months',
        majorGridLines: { width: 0}
    };
    public primaryYAxis: Object = {
        title: 'Price',
        labelFormat: '${value}',
        minimum: 30, maximum: 180,
        interval: 30,
    };
    public title: string = 'AAPL 2012-2017';
    public chartArea : Object = {
      border: { width : 0}
    };
    constructor() {
        //code
    }ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
;
}
```

```typescript
public indicators = [{ type: 'Atr', field: 'Close', period: 14 }];
```

**Stochastic:**
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CandleSeriesService, LineSeriesService, StochasticIndicatorService, DateTimeService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

let chartData: any[] = [
    {x: new Date('2012-10-15'), open: 90.3357, high: 93.2557, low: 87.0885,close: 87.12,volume: 646996264},
    {x: new Date('2012-10-22'), open: 87.4885, high: 90.7685, low: 84.4285,close: 86.2857,volume: 866040680 },
    {x: new Date('2012-10-29'), open: 84.9828, high: 86.1428, low: 82.1071,close: 82.4,volume: 367371310},
    {x: new Date('2012-11-05'), open: 83.3593, high: 84.3914, low: 76.2457,close: 78.1514,volume: 919719846},
    {x: new Date('2012-11-12'), open: 79.1643, high: 79.2143, low: 72.25,close: 75.3825,volume: 894382149},
    {x: new Date('2012-11-19'), open: 77.2443, high: 81.7143, low: 77.1257,close: 81.6428,volume: 527416747},
    {x: new Date('2012-11-26'), open: 82.2714, high: 84.8928, low: 81.7514,close: 83.6114,volume: 646467974},
    {x: new Date('2012-12-03'), open: 84.8071, high: 84.9414, low: 74.09,close: 76.1785,volume: 980096264},
    {x: new Date('2012-12-10'), open: 75, high: 78.5085, low: 72.2257,close: 72.8277,volume: 835016110},
    {x: new Date('2012-12-17'), open: 72.7043, high: 76.4143, low: 71.6043,close: 74.19,volume: 726150329},
    {x: new Date('2012-12-24'), open: 74.3357, high: 74.8928, low: 72.0943,close: 72.7984,volume: 321104733},
    {x: new Date('2012-12-31'), open: 72.9328, high: 79.2857, low: 72.7143,close: 75.2857,volume: 540854882},
    {x: new Date('2013-01-07'), open: 74.5714, high: 75.9843, low: 73.6,close: 74.3285,volume: 574594262},
    {x: new Date('2013-01-14'), open: 71.8114, high: 72.9643, low: 69.0543,close: 71.4285,volume: 803105621},
    {x: new Date('2013-01-21'), open: 72.08, high: 73.57, low: 62.1428,close: 62.84,volume: 971912560},
    {x: new Date('2013-01-28'), open: 62.5464, high: 66.0857, low: 62.2657,close: 64.8028,volume: 656549587},
    {x: new Date('2013-02-04'), open: 64.8443, high: 68.4014, low: 63.1428,close: 67.8543,volume: 743778993},
    {x: new Date('2013-02-11'), open: 68.0714, high: 69.2771, low: 65.7028,close: 65.7371,volume: 585292366},
    {x: new Date('2013-02-18'), open: 65.8714, high: 66.1043, low: 63.26,close: 64.4014,volume: 421766997},
    {x: new Date('2013-02-25'), open: 64.8357, high: 65.0171, low: 61.4257,close: 61.4957,volume: 582741215},
    {x: new Date('2013-03-04'), open: 61.1143, high: 62.2043, low: 59.8571,close: 61.6743,volume: 632856539},
    {x: new Date('2013-03-11'), open: 61.3928, high: 63.4614, low: 60.7343,close: 63.38,volume: 572066981},
    {x: new Date('2013-03-18'), open: 63.0643, high: 66.0143, low: 63.0286,close: 65.9871,volume: 552156035},
    {x: new Date('2013-03-25'), open: 66.3843, high: 67.1357, low: 63.0886,close: 63.2371,volume: 390762517},
    {x: new Date('2013-04-01'), open: 63.1286, high: 63.3854, low: 59.9543,close: 60.4571,volume: 505273732},
    {x: new Date('2013-04-08'), open: 60.6928, high: 62.57, low: 60.3557,close: 61.4,volume: 387323550},
    {x: new Date('2013-04-15'), open: 61, high: 61.1271, low: 55.0143,close: 55.79,volume: 709945604},
    {x: new Date('2013-04-22'), open: 56.0914, high: 59.8241, low: 55.8964,close: 59.6007,volume: 787007506},
    {x: new Date('2013-04-29'), open: 60.0643, high: 64.7471, low: 60,close: 64.2828,volume: 655020017},
    {x: new Date('2013-05-06'), open: 65.1014, high: 66.5357, low: 64.3543,close: 64.71,volume: 545488533},
    {x: new Date('2013-05-13'), open: 64.5014, high: 65.4143, low: 59.8428,close: 61.8943,volume: 633706550},
    {x: new Date('2013-05-20'), open: 61.7014, high: 64.05, low: 61.4428,close: 63.5928,volume: 494379068},
    {x: new Date('2013-05-27'), open: 64.2714, high: 65.3, low: 62.7714,close: 64.2478,volume: 362907830},
    {x: new Date('2013-06-03'), open: 64.39, high: 64.9186, low: 61.8243,close: 63.1158,volume: 443249793},
    {x: new Date('2013-06-10'), open: 63.5328, high: 64.1541, low: 61.2143,close: 61.4357,volume: 389680092},
    {x: new Date('2013-06-17'), open: 61.6343, high: 62.2428, low: 58.3,close: 59.0714,volume: 400384818},
    {x: new Date('2013-06-24'), open: 58.2, high: 58.38, low: 55.5528,close: 56.6471,volume: 519314826},
    {x: new Date('2013-07-01'), open: 57.5271, high: 60.47, low: 57.3171,close: 59.6314,volume: 343878841},
    {x: new Date('2013-07-08'), open: 60.0157, high: 61.3986, low: 58.6257,close: 60.93,volume: 384106977},
    {x: new Date('2013-07-15'), open: 60.7157, high: 62.1243, low: 60.5957,close: 60.7071,volume: 286035513},
    {x: new Date('2013-07-22'), open: 61.3514, high: 63.5128, low: 59.8157,close: 62.9986,volume: 395816827},
    {x: new Date('2013-07-29'), open: 62.9714, high: 66.1214, low: 62.8857,close: 66.0771,volume: 339668858},
    {x: new Date('2013-08-12'), open: 65.2657, high: 72.0357, low: 65.2328,close: 71.7614,volume: 711563584},
    {x: new Date('2013-08-19'), open: 72.0485, high: 73.3914, low: 71.1714,close: 71.5743,volume: 417119660},
    {x: new Date('2013-08-26'), open: 71.5357, high: 72.8857, low: 69.4286,close: 69.6023,volume: 392805888},
    {x: new Date('2013-09-02'), open: 70.4428, high: 71.7485, low: 69.6214,close: 71.1743,volume: 317244380},
    {x: new Date('2013-09-09'), open: 72.1428, high: 72.56, low: 66.3857,close: 66.4143,volume: 669376320},
    {x: new Date('2013-09-16'), open: 65.8571, high: 68.3643, low: 63.8886,close: 66.7728,volume: 625142677},
    {x: new Date('2013-09-23'), open: 70.8714, high: 70.9871, low: 68.6743,close: 68.9643,volume: 475274537},
    {x: new Date('2013-09-30'), open: 68.1786, high: 70.3357, low: 67.773,close: 69.0043,volume: 368198906},
    {x: new Date('2013-10-07'), open: 69.5086, high: 70.5486, low: 68.3257,close: 70.4017,volume: 361437661},
    {x: new Date('2013-10-14'), open: 69.9757, high: 72.7514, low: 69.9071,close: 72.6985,volume: 342694379},
    {x: new Date('2013-10-21'), open: 73.11, high: 76.1757, low: 72.5757,close: 75.1368,volume: 490458997},
    {x: new Date('2013-10-28'), open: 75.5771, high: 77.0357, low: 73.5057,close: 74.29,volume: 508130174},
    {x: new Date('2013-11-04'), open: 74.4428, high: 75.555, low: 73.1971,close: 74.3657,volume: 318132218},
    {x: new Date('2013-11-11'), open: 74.2843, high: 75.6114, low: 73.4871,close: 74.9987,volume: 306711021},
    {x: new Date('2013-11-18'), open: 74.9985, high: 75.3128, low: 73.3814,close: 74.2571,volume: 282778778},
];
@Component({
imports: [
         ChartModule
    ],

providers: [ CandleSeriesService, LineSeriesService, StochasticIndicatorService, DateTimeService],
standalone: true,
    selector: 'app-container',
    template:
            `<ejs-chart id='chartcontainer' style="display:block;" [title]='title' [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis'
              [chartArea]= 'chartArea'>
            <e-series-collection>
                <e-series [dataSource]='data' type='Candle' xName='x' high='high' low='low' open='open' close='close' volume='volume' name='Apple Inc'> </e-series>
            </e-series-collection>
            <e-indicators>
                <e-indicator type='Stochastic' xName='x' field="Close" fill="blue" [period]='period' seriesName='Apple Inc'> </e-indicator>
            </e-indicators>
        </ejs-chart>`
})
export class AppComponent implements OnInit {
 public data: Object[] = chartData;
    public primaryXAxis: Object = {
        title: 'Months',
        valueType: 'DateTime',
        intervalType: 'Months',
        majorGridLines: { width: 0}
    };
    public primaryYAxis: Object = {
        title: 'Price',
        labelFormat: '${value}',
        minimum: 30, maximum: 180,
        interval: 30,
    };
    public title: string = 'AAPL 2012-2017';
    public chartArea : Object = {
      border: { width : 0}
    };
period: any;
    constructor() {
        //code
    }ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
;
}
```

```typescript
public indicators = [{
  type: 'Stochastic',
  period: 14,
  kPeriod: 3,
  dPeriod: 3,
  field: 'Close'
}];
```

## Striplines

Striplines highlight specific axis ranges with colored bands and labels.

### Horizontal Stripline

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { StripLineService, ColumnSeriesService, DataLabelService, LineSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { stripData } from './datasource';
@Component({
imports: [
         ChartModule
    ],

providers: [ StripLineService, ColumnSeriesService, DataLabelService, LineSeriesService ],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='x' yName='y' name='Internet'></e-series>>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    ngOnInit(): void {
        this.chartData =  [{x: 1, y: 20},{x: 2, y: 22},{x: 3, y: 0},{x: 4, y: 12},{x: 5, y: 5},
                 {x: 6, y: 15},{x: 7, y: 6},{x: 8, y: 12},{x: 9, y: 20},{x: 10, y: 7}];
        this.primaryYAxis = {
           title: 'Runs',
            stripLines:[
            { start: 15, end: 22, text: 'Good', color: '#ff512f', visible: true, zIndex: 'Behind', opacity: 0.5 },
            { start: 8, end: 15, text: 'Medium', color: 'pink', opacity: 0.5, visible: true, zIndex: 'Behind' },
            { start: 0, end: 8, text:'Not enough', color: 'skyblue', opacity: 0.5, visible: true, zIndex: 'Behind' }]
        };
        this.primaryXAxis = {
            title: 'Overs'
        };
        this.title = 'India Vs Australia 1st match';
    }

}
```

```typescript
public primaryYAxis = {
  stripLines: [{
    start: 30,
    end: 40,
    text: 'Target Range',
    color: 'rgba(255, 0, 0, 0.1)',
    border: { width: 1, color: 'red' },
    textStyle: { 
      color: 'red', 
      size: '14px' 
    },
    horizontalAlignment: 'Start',
    verticalAlignment: 'Start',
    visible: true
  }]
};
```

### Vertical Stripline
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { StripLineService, ColumnSeriesService, DataLabelService, LineSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { stripData } from './datasource';
@Component({
imports: [
         ChartModule
    ],

providers: [ StripLineService, ColumnSeriesService, DataLabelService, LineSeriesService ],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='x' yName='y' name='Internet'></e-series>>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    ngOnInit(): void {
        this.chartData =  [{x: 1, y: 20},{x: 2, y: 22},{x: 3, y: 0},{x: 4, y: 12},{x: 5, y: 5},
                 {x: 6, y: 15},{x: 7, y: 6},{x: 8, y: 12},{x: 9, y: 20},{x: 10, y: 7}];
        this.primaryYAxis = {
           title: 'Runs',

        };
        this.primaryXAxis = {
           title: 'Overs',
            stripLines:[
            {start: 0, end: 5, text: 'powerplay 1', color: 'red', visible: true, opacity: 0.5, rotation: 45, textStyle: { size: 20, color: 'black'}},
            {start: 5, end: 10, text: 'powerplay 2', color: 'blue', visible: true, opacity: 0.5, rotation: 45, textStyle: { size: 20, color: 'black'}},
        ]
        };
        this.title = 'India Vs Australia 1st match';
    }

}
```

```typescript
public primaryXAxis = {
  valueType: 'Category',
  stripLines: [{
    start: 2,  // Index or value
    end: 4,
    text: 'Q2',
    color: 'rgba(0, 128, 255, 0.1)',
    border: { width: 2, color: 'blue' },
    textStyle: { color: 'blue' }
  }]
};
```

### Recurring Striplines
```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { StripLineService, ColumnSeriesService, DataLabelService, LineSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { stripData } from './datasource';

@Component({
imports: [
         ChartModule
    ],

providers: [ StripLineService, ColumnSeriesService, DataLabelService, LineSeriesService ],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Line' xName='x' yName='y' [marker]='marker'></e-series>>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public marker?: Object;
    ngOnInit(): void {
        this.chartData = [
            {x: 1, y: 5},{x: 2, y: 39},{x: 3, y: 21},{x: 4, y: 51},{x: 5, y: 30},
            {x: 6, y: 25},{x: 7, y: 10},{x: 8, y: 40},{x: 9, y: 50},{x: 10, y: 20}
            ];
        this.primaryXAxis = {
            stripLines:[
            {start: 1, size: 1, isRepeat: true, repeatEvery: 2, color: 'rgba(167,169,171, 0.3)'}
        ]
        };
        this.marker = { visible: true }
    }

}
```

```typescript
public primaryXAxis = {
  stripLines: [{
    startFromAxis: true,
    size: 1,
    sizeType: 'Auto',
    isRepeat: true,
    repeatEvery: 2,
    color: 'rgba(0, 0, 0, 0.05)'
  }]
};
```

### Line Stripline (Single Line)

```typescript
public stripLines = [{
  start: 35,
  size: 0,  // Zero size = single line
  color: 'red',
  border: { width: 2, color: 'red' },
  text: 'Average',
  textStyle: { color: 'red' }
}];
```

### Segment Stripline

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { StripLineService, ColumnSeriesService, DataLabelService, LineSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { stripData } from './datasource';

@Component({
imports: [
         ChartModule
    ],

providers: [ StripLineService, ColumnSeriesService, DataLabelService, LineSeriesService ],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryYAxis]='primaryYAxis'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Line' xName='x' yName='y' [marker]='marker'></e-series>>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public primaryYAxis?: Object;
    public marker?: Object;
    ngOnInit(): void {
        this.chartData = [
            {x: 1, y: 5},{x: 2, y: 39},{x: 3, y: 21},{x: 4, y: 51},{x: 5, y: 30},
            {x: 6, y: 25},{x: 7, y: 10},{x: 8, y: 40},{x: 9, y: 50},{x: 10, y: 20}
            ];
        this.primaryYAxis = {
        stripLines:[
            {start: 20, end: 40, isSegmented: true, segmentStart: 2, segmentEnd: 4,
            color: 'rgba(167,169,171, 0.3)'}
        ]

        };
        this.marker = { visible: true }
    }

}
```

## Gradient Fills

Apply gradient colors to series for visual depth.

### Linear Gradient Series

```typescript
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, ColumnSeriesService, DataLabelService, LegendService, TooltipService } from '@syncfusion/ej2-angular-charts';



import { Component, OnInit } from '@angular/core';
import { SalesData } from './datasource';

@Component({
	imports: [
		ChartModule
	],
	providers: [CategoryService, ColumnSeriesService, DataLabelService, LegendService, TooltipService],
	standalone: true,
	selector: 'app-container',
	template: `<ejs-chart id="chart-container" [primaryXAxis]="primaryXAxis" [primaryYAxis]="primaryYAxis" [title]="title" [tooltip]="tooltip" [legendSettings]="legendSettings">
		<e-series-collection>
			<e-series [dataSource]="salesData" type="Column" xName="Month" yName="Amount" name="Sales" [marker]="marker" [linearGradient]="linearGradient"></e-series>
		</e-series-collection>
	</ejs-chart>`
})

export class AppComponent implements OnInit {
	public primaryXAxis?: Object;
	public primaryYAxis?: Object;
	public salesData?: Object[];
	public marker?: Object;
	public linearGradient?: Object;
	public tooltip?: Object;
	public legendSettings?: Object;
	public title?: string;
	ngOnInit(): void {
		this.salesData = SalesData;
		this.primaryXAxis = { valueType: 'Category' };
		this.primaryYAxis = { labelFormat: '${value}k' };
		this.marker = { visible: true, isFilled: true };
		this.linearGradient = {
			x1: 0, y1: 0,
			x2: 0, y2: 1,
			gradientColorStop: [
				{ color: '#4F46E5', offset: 0, opacity: 1, lighten: 0, brighten: 0 },
				{ color: '#22D3EE', offset: 100, opacity: 0.95, lighten: 0, brighten: 0.9 }
			]
		};
		this.tooltip = { enable: true };
		this.legendSettings = { visible: true };
		this.title = 'Monthly Sales Performance';
	}
}
```

### Linear Gradient Trendlines

```typescript
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService,  LineSeriesService, TrendlinesService, SplineSeriesService, LegendService } from '@syncfusion/ej2-angular-charts';



import { Component, OnInit } from '@angular/core';
import { OrdersData } from './datasource';

@Component({
	imports: [ChartModule],
	providers: [CategoryService, LineSeriesService, SplineSeriesService, LegendService,TrendlinesService],
	standalone: true,
	selector: 'app-container',
	template: `<ejs-chart id="chart-container" [primaryXAxis]="primaryXAxis" [primaryYAxis]="primaryYAxis" [title]="title" [legendSettings]="legendSettings">
		<e-series-collection>
			<e-series [dataSource]="ordersData" type="Spline" xName="Month" name="Orders" yName="Orders" [marker]="marker">
				<e-trendlines>
					<e-trendline type="Linear" width="3" name="Trend" [linearGradient]="trendlineGradient"></e-trendline>
				</e-trendlines>
			</e-series>
		</e-series-collection>
	</ejs-chart>`
})
export class AppComponent implements OnInit {
	public primaryXAxis?: Object;
	public primaryYAxis?: Object;
	public ordersData?: Object[];
	public marker?: Object;
	public trendlineGradient?: Object;
	public legendSettings?: Object;
	public title?: string;
	ngOnInit(): void {
		this.ordersData = OrdersData;
		this.primaryXAxis = {
			valueType: 'Category',
			majorGridLines: { width: 0 }
		};
		this.primaryYAxis = {
			lineStyle: { width: 0 },
			majorTickLines: { width: 0 }
		};
		this.marker = { visible: true };
		this.trendlineGradient = {
			x1: 0, y1: 0,
			x2: 1, y2: 0,
			gradientColorStop: [
				{ color: '#F97316', offset: 0, opacity: 1 },
				{ color: '#4F46E5', offset: 100, opacity: 1 }
			]
		};
		this.legendSettings = { visible: true };
		this.title = 'Retail Orders Processed';
	}
}
```

### Linear Gradient Technical Indicator

```typescript
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateTimeService, CandleSeriesService, LineSeriesService, EmaIndicatorService, TooltipService, LegendService } from '@syncfusion/ej2-angular-charts';



import { Component, OnInit } from '@angular/core';
import { PriceSeries } from './datasource';

@Component({
    imports: [ChartModule],
    providers: [DateTimeService, CandleSeriesService, LineSeriesService, EmaIndicatorService, TooltipService, LegendService],
    standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]="primaryXAxis" [primaryYAxis]="primaryYAxis" [title]="title" [tooltip]="tooltip" [legendSettings]="legendSettings" [indicators]="indicators">
        <e-series-collection>
            <e-series [dataSource]="priceData" type="Candle" xName="Date" yName="y" low="Low" high="High" close="Close" open="Open" volume="Volume" name="Equity Price" [width]="2"></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public primaryYAxis?: Object;
    public priceData?: Object[];
    public indicatorGradient?: Object;
    public tooltip?: Object;
    public legendSettings?: Object;
    public title?: string;
	public indicators?: Object;
    ngOnInit(): void {
        this.priceData = PriceSeries;
        this.primaryXAxis = {
            title: 'Months',
            valueType: 'DateTime',
            intervalType: 'Months',
            labelFormat: 'MMM yyyy',
            edgeLabelPlacement: 'Shift',
            majorGridLines: { width: 0 }
        };
        this.primaryYAxis = {
            title: 'Price (USD)',
            labelFormat: '${value}',
            minimum: 90, maximum: 130,
            interval: 10,
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 }
        };
        this.indicatorGradient = {
            x1: 0, y1: 0,
            x2: 1, y2: 0,
            gradientColorStop: [
                { color: '#7C3AED', offset: 0, opacity: 1 },
                { color: '#F59E0B', offset: 100, opacity: 1 }
            ]
        };
		this.indicators=[
			{
				type: "Ema",
				field: "Close",
				seriesName: "Equity Price",
				xName: "Date",
				period: 3,
				linearGradient: this.indicatorGradient,
				width: 2
			}
		]
        this.tooltip = { enable: true };
        this.legendSettings = { visible: false };
        this.title = 'Equity Price - Jan-Nov 2025';
    }
}
```

### Radial Gradient Series

```typescript
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, ColumnSeriesService, DataLabelService, LegendService, TooltipService } from '@syncfusion/ej2-angular-charts';



import { Component, OnInit } from '@angular/core';
import { SalesData } from './datasource';

@Component({
    imports: [ChartModule],
    providers: [CategoryService, ColumnSeriesService, DataLabelService, LegendService, TooltipService],
    standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]="primaryXAxis" [primaryYAxis]="primaryYAxis" [title]="title" [tooltip]="tooltip" [legendSettings]="legendSettings">
        <e-series-collection>
            <e-series [dataSource]="salesData" type="Column" xName="Month" yName="Amount" name="Sales" [marker]="marker" [radialGradient]="radialGradient"></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public primaryYAxis?: Object;
    public salesData?: Object[];
    public marker?: Object;
    public radialGradient?: Object;
    public tooltip?: Object;
    public legendSettings?: Object;
    public title?: string;
    ngOnInit(): void {
        this.salesData = SalesData;
        this.primaryXAxis = { valueType: 'Category' };
        this.primaryYAxis = { labelFormat: '${value}k' };
        this.marker = { visible: true, isFilled: true, dataLabel: { visible: true } };
        this.radialGradient = {
            cx: 0.5, cy: 0.5,
            fx: 0.5, fy: 0.5, r: 0.5,
            gradientColorStop: [
                { color: '#FFFF00', offset: 0, opacity: 1, lighten: 0, brighten: 0 },
                { color: '#7C3AED', offset: 100, opacity: 0.95, lighten: 0, brighten: 0.9 }
            ]
        };
        this.tooltip = { enable: true };
        this.legendSettings = { visible: true };
        this.title = 'Monthly Sales Performance';
    }
}
```

### Radial Gradient Trendlines

```typescript
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService,  LineSeriesService, TrendlinesService, SplineSeriesService, LegendService } from '@syncfusion/ej2-angular-charts';



import { Component, OnInit } from '@angular/core';
import { OrdersData } from './datasource';

@Component({
	imports: [ChartModule],
	providers: [CategoryService, LineSeriesService, SplineSeriesService, LegendService,TrendlinesService],
	standalone: true,
	selector: 'app-container',
	template: `<ejs-chart id="chart-container" [primaryXAxis]="primaryXAxis" [primaryYAxis]="primaryYAxis" [title]="title" [legendSettings]="legendSettings">
		<e-series-collection>
			<e-series [dataSource]="ordersData" type="Spline" xName="Month" name="Orders" yName="Orders" [marker]="marker">
				<e-trendlines>
					<e-trendline type="Linear" width="3" name="Trend" [radialGradient]="radialGradient"></e-trendline>
				</e-trendlines>
			</e-series>
		</e-series-collection>
	</ejs-chart>`
})
export class AppComponent implements OnInit {
	public primaryXAxis?: Object;
	public primaryYAxis?: Object;
	public ordersData?: Object[];
	public marker?: Object;
	public radialGradient?: Object;
	public legendSettings?: Object;
	public title?: string;
	ngOnInit(): void {
		this.ordersData = OrdersData;
		this.primaryXAxis = {
			valueType: 'Category',
			majorGridLines: { width: 0 }
		};
		this.primaryYAxis = {
			lineStyle: { width: 0 },
			majorTickLines: { width: 0 }
		};
		this.marker = { visible: true };
		this.radialGradient = {
            cx: 0.5, cy: 0.5,
            fx: 0.5, fy: 0.5, r: 0.5,
            gradientColorStop: [
                { color: '#FFFF00', offset: 0, opacity: 1, lighten: 0, brighten: 0 },
                { color: '#7C3AED', offset: 100, opacity: 0.95, lighten: 0, brighten: 0.9 }
            ]
        };
		this.legendSettings = { visible: true };
		this.title = 'Retail Orders Processed';
	}
}
```

### Radial Gradient Technical Indicators

```typescript
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateTimeService, CandleSeriesService, LineSeriesService, EmaIndicatorService, TooltipService, LegendService } from '@syncfusion/ej2-angular-charts';



import { Component, OnInit } from '@angular/core';
import { PriceSeries } from './datasource';

@Component({
    imports: [ChartModule],
    providers: [DateTimeService, CandleSeriesService, LineSeriesService, EmaIndicatorService, TooltipService, LegendService],
    standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]="primaryXAxis" [primaryYAxis]="primaryYAxis" [title]="title" [tooltip]="tooltip" [legendSettings]="legendSettings" [indicators]="indicators">
        <e-series-collection>
            <e-series [dataSource]="priceData" type="Candle" xName="Date" yName="y" low="Low" high="High" close="Close" open="Open" volume="Volume" name="Equity Price" [width]="2"></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public primaryYAxis?: Object;
    public priceData?: Object[];
    public radialGradient?: Object;
    public tooltip?: Object;
    public legendSettings?: Object;
    public title?: string;
	public indicators?: Object;
    ngOnInit(): void {
        this.priceData = PriceSeries;
        this.primaryXAxis = {
            title: 'Months',
            valueType: 'DateTime',
            intervalType: 'Months',
            labelFormat: 'MMM yyyy',
            edgeLabelPlacement: 'Shift',
            majorGridLines: { width: 0 }
        };
        this.primaryYAxis = {
            title: 'Price (USD)',
            labelFormat: '${value}',
            minimum: 90, maximum: 130,
            interval: 10,
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 }
        };
        this.radialGradient = {
            cx: 0.5, cy: 0.5,
            fx: 0.5, fy: 0.5, r: 0.5,
            gradientColorStop: [
                { color: '#FFFF00', offset: 0, opacity: 1, lighten: 0, brighten: 0 },
                { color: '#7C3AED', offset: 100, opacity: 0.95, lighten: 0, brighten: 0.9 }
            ]
        };
		this.indicators=[
			{
				type: "Ema",
				field: "Close",
				seriesName: "Equity Price",
				xName: "Date",
				period: 3,
				radialGradient: this.radialGradient,
				width: 2
			}
		]
        this.tooltip = { enable: true };
        this.legendSettings = { visible: false };
        this.title = 'Equity Price - Jan-Nov 2025';
    }
}
```

## Best Practices

### Legend
- Position legends where they don't obscure data
- Use descriptive series names
- Enable toggle visibility for interactive exploration

### Markers
- Use sparingly on line charts (only key points)
- Consistent shapes across related series
- Larger markers for emphasis

### Data Labels
- Enable only when space permits
- Use formatting for readability ($, %, K, M)
- Smart labels to avoid overlap

### Annotations
- Highlight key insights or anomalies
- Keep text concise
- Use contrasting colors

### Trendlines
- Choose appropriate type for data pattern
- Use dashed lines for forecasts
- Match colors with series

### Striplines
- Highlight thresholds or goals
- Use subtle colors (low opacity)
- Label clearly

## Common Pitfalls

1. **Too Many Elements:** Cluttered charts with excessive markers, labels, annotations
2. **Poor Contrast:** Annotations/labels hard to read against chart background
3. **Overlapping Labels:** Not using smart labels or label rotation
4. **Inconsistent Styling:** Mixed marker shapes/sizes without purpose
5. **Missing Context:** Annotations without explanatory text

Refer to customization reference for detailed styling options.

## API Reference Summary

### Legend Configuration

| API | Description | Documentation |
|-----|-------------|---------------|
| LegendSettingsModel | Complete legend configuration interface | [legendSettingsModel.md](https://ej2.syncfusion.com/angular/documentation/api/chart/legendSettingsModel) |
| LegendSettings | Legend settings class | [legendSettings.md](https://ej2.syncfusion.com/angular/documentation/api/chart/legendSettings) |
| LegendPosition | Position enum (Top, Bottom, Left, Right, Custom) | [legendPosition.md](https://ej2.syncfusion.com/angular/documentation/api/chart/legendPosition) |
| LegendShape | Icon shape enum (Circle, Rectangle, Triangle, etc.) | [legendShape.md](https://ej2.syncfusion.com/angular/documentation/api/chart/legendShape) |
| LegendMode | Rendering mode (Series, Point, Range, Gradient) | [legendMode.md](https://ej2.syncfusion.com/angular/documentation/api/chart/legendMode) |

### Marker Configuration

| API | Description | Documentation |
|-----|-------------|---------------|
| MarkerSettingsModel | Complete marker configuration interface | [markerSettingsModel.md](https://ej2.syncfusion.com/angular/documentation/api/chart/markerSettingsModel) |
| MarkerSettings | Marker settings class | [markerSettings.md](https://ej2.syncfusion.com/angular/documentation/api/chart/markerSettings) |
| ChartShape | Marker shape enum (Circle, Rectangle, Diamond, etc.) | [chartShape.md](https://ej2.syncfusion.com/angular/documentation/api/chart/chartShape) |

### Data Label Configuration

| API | Description | Documentation |
|-----|-------------|---------------|
| DataLabelSettingsModel | Data label configuration interface | [dataLabelSettingsModel.md](https://ej2.syncfusion.com/angular/documentation/api/chart/dataLabelSettingsModel) |
| DataLabelSettings | Data label settings class | [dataLabelSettings.md](https://ej2.syncfusion.com/angular/documentation/api/chart/dataLabelSettings) |
| DataLabelIntersectAction | Overlap handling (None, Hide, Rotate, etc.) | [dataLabelIntersectAction.md](https://ej2.syncfusion.com/angular/documentation/api/chart/dataLabelIntersectAction) |
| LabelPosition | Label position enum | [labelPosition.md](https://ej2.syncfusion.com/angular/documentation/api/chart/labelPosition) |
| Alignment | Text alignment enum | [alignment.md](https://ej2.syncfusion.com/angular/documentation/api/chart/alignment) |

### Annotation Configuration

| API | Description | Documentation |
|-----|-------------|---------------|
| ChartAnnotationSettingsModel | Annotation configuration interface | [chartAnnotationSettingsModel.md](https://ej2.syncfusion.com/angular/documentation/api/chart/chartAnnotationSettingsModel) |
| ChartAnnotationSettings | Annotation settings class | [chartAnnotationSettings.md](https://ej2.syncfusion.com/angular/documentation/api/chart/chartAnnotationSettings) |
| AnnotationDirective | Annotation directive for declaring annotations | [annotationDirective.md](https://ej2.syncfusion.com/angular/documentation/api/chart/annotationDirective) |
| Anchor | Anchor point enum (Chart, Series, Point) | [anchor.md](https://ej2.syncfusion.com/angular/documentation/api/chart/anchor) |
| Position | Positioning enum | [position.md](https://ej2.syncfusion.com/angular/documentation/api/chart/position) |

### Trendline Configuration

| API | Description | Documentation |
|-----|-------------|---------------|
| TrendlineModel | Trendline configuration interface | [trendlineModel.md](https://ej2.syncfusion.com/angular/documentation/api/chart/trendlineModel) |
| Trendline | Trendline class | [trendline.md](https://ej2.syncfusion.com/angular/documentation/api/chart/trendline) |
| TrendlineDirective | Trendline directive | [trendlineDirective.md](https://ej2.syncfusion.com/angular/documentation/api/chart/trendlineDirective) |
| TrendlineTypes | Types enum (Linear, Exponential, Polynomial, etc.) | [trendlineTypes.md](https://ej2.syncfusion.com/angular/documentation/api/chart/trendlineTypes) |

### Technical Indicator Configuration

| API | Description | Documentation |
|-----|-------------|---------------|
| TechnicalIndicatorModel | Indicator configuration interface | [technicalIndicatorModel.md](https://ej2.syncfusion.com/angular/documentation/api/chart/technicalIndicatorModel) |
| TechnicalIndicator | Indicator class | [technicalIndicator.md](https://ej2.syncfusion.com/angular/documentation/api/chart/technicalIndicator) |
| IndicatorDirective | Indicator directive | [indicatorDirective.md](https://ej2.syncfusion.com/angular/documentation/api/chart/indicatorDirective) |
| TechnicalIndicators | Indicator types enum (SMA, EMA, RSI, MACD, etc.) | [technicalIndicators.md](https://ej2.syncfusion.com/angular/documentation/api/chart/technicalIndicators) |
| MacdType | MACD type enum | [macdType.md](https://ej2.syncfusion.com/angular/documentation/api/chart/macdType) |

### Stripline Configuration

| API | Description | Documentation |
|-----|-------------|---------------|
| StripLineSettingsModel | Stripline configuration interface | [stripLineSettingsModel.md](https://ej2.syncfusion.com/angular/documentation/api/chart/stripLineSettingsModel) |
| StripLineSettings | Stripline settings class | [stripLineSettings.md](https://ej2.syncfusion.com/angular/documentation/api/chart/stripLineSettings) |
| StripLineDirective | Stripline directive | [stripLineDirective.md](https://ej2.syncfusion.com/angular/documentation/api/chart/stripLineDirective) |

### Key Properties Reference

| Element | Important Properties | API Reference |
|---------|---------------------|---------------|
| **Legend** | visible, position, alignment, toggleVisibility | [LegendSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/legendSettingsModel) |
| **Marker** | visible, width, height, shape, fill, border | [MarkerSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/markerSettingsModel) |
| **Data Label** | visible, position, format, fill, border, angle | [DataLabelSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/dataLabelSettingsModel) |
| **Annotation** | content, coordinateUnits, x, y, region | [ChartAnnotationSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/chartAnnotationSettingsModel) |
| **Trendline** | type, forward, backward, polynomial Order | [TrendlineModel](https://ej2.syncfusion.com/angular/documentation/api/chart/trendlineModel) |
| **Indicator** | type, period, field, seriesName | [TechnicalIndicatorModel](https://ej2.syncfusion.com/angular/documentation/api/chart/technicalIndicatorModel) |
| **Stripline** | start, end, size, text, color, opacity | [StripLineSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/stripLineSettingsModel) |

### Events Related to Chart Elements

| Event | Interface | Description | API Reference |
|-------|-----------|-------------|---------------|
| legendRender | ILegendRenderEventArgs | Before legend rendering | [ChartModel.legendRender](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#legendRender), [ILegendRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iLegendRenderEventArgs) |
| legendClick | ILegendClickEventArgs | Legend item click | [ChartModel.legendClick](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#legendClick), [ILegendClickEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iLegendClickEventArgs) |
| pointRender | IPointRenderEventArgs | Before point rendering (markers) | [ChartModel.pointRender](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#pointRender), [IPointRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iPointRenderEventArgs) |
| textRender | ITextRenderEventArgs | Before text rendering (data labels) | [ChartModel.textRender](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#textRender), [ITextRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iTextRenderEventArgs) |
| annotationRender | IAnnotationRenderEventArgs | Before annotation rendering | [ChartModel.annotationRender](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#annotationRender), [IAnnotationRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iAnnotationRenderEventArgs) |
