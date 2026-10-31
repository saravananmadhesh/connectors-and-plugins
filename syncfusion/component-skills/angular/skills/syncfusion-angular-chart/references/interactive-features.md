# Interactive Chart Features

Interactive features enhance user engagement and data exploration. This guide covers zooming, panning, tooltips, crosshair, trackball, selection, data editing, and synchronized charts.

## Table of Contents

- [Zooming](#zooming)
- [Panning](#panning)
- [Tooltip](#tooltip)
- [Crosshair](#crosshair)
- [Trackball](#trackball)
- [Selection](#selection)
- [Data Editing](#data-editing)
- [Synchronized Charts](#synchronized-charts)

## Zooming

Zooming allows users to focus on specific data regions for detailed analysis.

**API Reference:**
- [ZoomSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/zoomSettingsModel) - Complete zoom configuration
- [ZoomSettings](https://ej2.syncfusion.com/angular/documentation/api/chart/zoomSettings) - Zoom settings class
- [ZoomMode](https://ej2.syncfusion.com/angular/documentation/api/chart/zoomMode) - Zoom mode enum (X, Y, XY)
- [ToolbarItems](https://ej2.syncfusion.com/angular/documentation/api/chart/toolbarItems) - Zoom toolbar items enum
- [IZoomingEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iZoomingEventArgs) - Zooming event interface
- [IZoomCompleteEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iZoomCompleteEventArgs) - Zoom complete event interface

**Key Events:**
- [onZooming](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#onZooming) - Triggered during zoom
- [zoomComplete](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#zoomComplete) - Triggered after zoom completes

### Enable Zooming

**API Properties:**
- [enableSelectionZooming](https://ej2.syncfusion.com/angular/documentation/api/chart/zoomSettings#enableSelectionZooming) (boolean, default: false)
- [enableMouseWheelZooming](https://ej2.syncfusion.com/angular/documentation/api/chart/zoomSettings#enableMouseWheelZooming) (boolean, default: false)
- [enablePinchZooming](https://ej2.syncfusion.com/angular/documentation/api/chart/zoomSettings#enablePinchZooming) (boolean, default: false)
- [enableScrollbar](https://ej2.syncfusion.com/angular/documentation/api/chart/zoomSettings#enableScrollbar) (boolean, default: false)
- [mode](https://ej2.syncfusion.com/angular/documentation/api/chart/zoomSettings#mode) - [ZoomMode](https://ej2.syncfusion.com/angular/documentation/api/chart/zoomMode) enum (default: 'XY')

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateTimeService, AreaSeriesService } from '@syncfusion/ej2-angular-charts'
import { LegendService, ZoomService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [ ChartModule ],
providers: [ DateTimeService, AreaSeriesService, LegendService, ZoomService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title' [zoomSettings]='zoom' [legendSettings]='legend'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Area' xName='x' yName='y' name='Product X' [border]='border' [animation]='animation' opacity=0.3></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    public border?: Object;
    public zoom?: Object;
    public animation?: Object;
    public legend?: Object;
    let series1: Object[] = [];
    let point1: Object;
    let value: number = 40;
    let i: number;
    for (i = 1; i < 500; i++) {
        if (Math.random() > .5) {
            value += Math.random();
        } else {
            value -= Math.random();
        }
        point1 = { x: new Date(1950, i + 2, i), y: value.toFixed(1) };
        series1.push(point1);
    }
    ngOnInit(): void {
        this.chartData = series1;
        this.primaryXAxis = {
            valueType: 'DateTime',
            labelFormat: 'yMMM',
        };
        this.zoom = {
            enableMouseWheelZooming: true,
            enablePinchZooming: true,
            enableSelectionZooming: true
        };
        this.animation = { enable: false};
        this.legend = { visible: false };
    }
}
```

### Zoom Types

**Selection Zooming:**
```typescript
public zoomSettings = {
  enableSelectionZooming: true,  // Drag to select region
  mode: 'XY'  // X, Y, or XY
};
```

**Mouse Wheel Zooming:**
```typescript
public zoomSettings = {
  enableMouseWheelZooming: true  // Scroll to zoom
};
```

**Pinch Zooming:**
```typescript
public zoomSettings = {
  enablePinchZooming: true  // Touch pinch gesture
};
```

### Zoom Toolbar

Display toolbar with zoom controls.

```typescript
public zoomSettings = {
  enableSelectionZooming: true,
  mode: 'XY',
  toolbarItems: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset']
};
```

**Toolbar Items:**
- `Zoom`: Enable selection zoom
- `ZoomIn`: Zoom in incrementally
- `ZoomOut`: Zoom out incrementally
- `Pan`: Enable panning mode
- `Reset`: Reset to original view

### Zoom Mode

Control which axes can be zoomed.

```typescript
public zoomSettings = {
  enableSelectionZooming: true,
  mode: 'X'  // X, Y, or XY
};
```

- `X`: Zoom only horizontally
- `Y`: Zoom only vertically
- `XY`: Zoom both directions (default)

### Zoom with Scrollbar

Add scrollbar for navigating zoomed area.

```typescript
public zoomSettings = {
  enableSelectionZooming: true,
  enableScrollbar: true
};
```

### Programmatic Zoom

```typescript
import { ViewChild } from '@angular/core';
import { ChartComponent as SyncfusionChart } from '@syncfusion/ej2-angular-charts';

export class AppComponent {
  @ViewChild('chart') public chart: SyncfusionChart;
  
  public zoomIn() {
    this.chart.zoomModule.zoomIn();
  }
  
  public zoomOut() {
    this.chart.zoomModule.zoomOut();
  }
  
  public zoomByRange(start: number, end: number) {
    this.chart.zoomModule.zoom(start, end);
  }
  
  public resetZoom() {
    this.chart.zoomModule.reset();
  }
}
```

```html
<ejs-chart #chart [zoomSettings]="zoomSettings">
  <!-- series -->
</ejs-chart>
<button (click)="zoomIn()">Zoom In</button>
<button (click)="zoomOut()">Zoom Out</button>
<button (click)="resetZoom()">Reset</button>
```

## Panning

Move the view within a zoomed chart.

### Enable Panning

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateTimeService, AreaSeriesService } from '@syncfusion/ej2-angular-charts'
import { LegendService, ZoomService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [ ChartModule ],
providers: [ DateTimeService, AreaSeriesService, LegendService, ZoomService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title' [zoomSettings]='zoom' [legendSettings]='legend'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Area' xName='x' yName='y' name='Product X' [border]='border' [animation]='animation' opacity=0.3></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    public border?: Object;
    public zoom?: Object;
    public animation?: Object;
    public legend?: Object;
    let series1: Object[] = [];
    let point1: Object;
    let value: number = 40;
    let i: number;
    for (i = 1; i < 500; i++) {
        if (Math.random() > .5) {
            value += Math.random();
        } else {
            value -= Math.random();
        }
        point1 = { x: new Date(1950, i + 2, i), y: value.toFixed(1) };
        series1.push(point1);
    }
    ngOnInit(): void {
        this.chartData = series1;
        this.primaryXAxis = {
            valueType: 'DateTime',
            labelFormat: 'yMMM',
        };
        this.zoom = {
            enablePan: true,
            enableSelectionZooming: true
        };
        this.animation = { enable: false};
        this.legend = { visible: false };
    }
}
```

**Usage:**
1. Zoom into chart
2. Click and drag to pan
3. Or use Pan button in toolbar

### Pan Mode

```typescript
public zoomSettings = {
  enablePan: true,
  mode: 'X'  // Pan only horizontally
};
```

## Tooltip

Tooltips display data point information on hover or touch.

### Basic Tooltip

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateTimeService, StepLineSeriesService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts'
import { LegendService, TooltipService, CategoryService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { toolData } from './datasource';
@Component({
imports: [ ChartModule ],
providers: [ DateTimeService, StepLineSeriesService, LegendService, TooltipService, CategoryService, ColumnSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title' [tooltip]='tooltip'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='StepLine' xName='x' yName='y' width=2 name='China' [marker]='marker'></e-series>
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
          valueType: 'DateTime',
      };
      this.tooltip = { enable: true };
      this.marker = { visible: true, width: 10, height: 10 };
      this.title = 'Unemployment Rates 1975-2010';
  }
}
```

### Tooltip Formatting

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateTimeService, StepLineSeriesService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts'
import { LegendService, TooltipService, CategoryService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { toolData } from './datasource';
@Component({
imports: [ ChartModule ],
providers: [ DateTimeService, StepLineSeriesService, LegendService, TooltipService, CategoryService, ColumnSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title' [tooltip]='tooltip'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='StepLine' xName='x' yName='y' width=2 name='China' [marker]='marker'></e-series>
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
          valueType: 'DateTime',
      };
      this.tooltip = {
        enable: true,
        format: '${series.name}: ${point.y}K',  // Custom format
        header: 'Month: ${point.x}'  // Tooltip header
      };
      this.marker = { visible: true, width: 10, height: 10 };
      this.title = 'Unemployment Rates 1975-2010';
  }
}
```

**Format Placeholders:**
- `${series.name}`: Series name
- `${point.x}`: X value
- `${point.y}`: Y value
- `${point.percentage}`: Percentage (pie charts)


#### Inline Tooltip Formatting

DateTime and numeric values can be formatted directly within the `header` or `format` property. Add a colon (`:`) followed by the required format specifier to a supported tooltip token.

```typescript
public tooltip: Object = {
    enable: true,
    header: '${point.x:MMM yyyy}',
    format: '${series.name}: ${point.y:n2}'
};
```

In this example:

- `${point.x:MMM yyyy}` formats the DateTime value as an abbreviated month and four-digit year.
- `${point.y:n2}` formats the numeric value with two decimal places.
- `${series.name}` displays the resolved series name.

Supported DateTime format specifiers include:

- `MMM yyyy`: Abbreviated month and four-digit year.
- `MM:yy`: Two-digit month and two-digit year.
- `dd MMM`: Two-digit day and abbreviated month.

Supported number format specifiers include:

- `n2`: Number with two decimal places.
- `n0`: Number without decimal places.
- `c2`: Currency with two decimal places.
- `p1`: Percentage with one decimal place.
- `e1`: Exponential notation with one decimal place.

```typescript
public tooltip: Object = {
    enable: true,
    header: 'Date: ${point.x:dd MMM}',
    format: 'Value: ${point.y:c2}'
};
```

##### Raw Datasource Record in the `tooltipRender` Event

The complete datasource record for the hovered point is available only through the `tooltipRender` event as `args.data.rawData`. This value is not a tooltip format token and must not be documented or generated as `${point.data.<field>}`.

Access fields from the original datasource record directly through `rawData`:

```ts
const x: string = args.data.rawData.x;
const high: number = args.data.rawData.high;
const low: number = args.data.rawData.low;
const open: number = args.data.rawData.open;
const close: number = args.data.rawData.close;
```

For a Hilo or HiloOpenClose datasource record such as the following:

```ts
public chartData: Object[] = [
    { x: 'Jan', open: 120, high: 160, low: 100, close: 140 },
    { x: 'Feb', open: 150, high: 190, low: 130, close: 170 },
    { x: 'Mar', open: 130, high: 170, low: 110, close: 150 },
    { x: 'Apr', open: 160, high: 180, low: 120, close: 140 },
    { x: 'May', open: 150, high: 170, low: 110, close: 130 }
];
```

The corresponding values can be accessed as `args.data.rawData.x`, `args.data.rawData.open`, `args.data.rawData.high`, `args.data.rawData.low`, and `args.data.rawData.close` inside `tooltipRender`.

The `rawData` value is a deep copy of the resolved datasource record. Modifying it inside the event does not modify the Chart datasource. When the source record cannot be resolved, `rawData` is `null`; therefore, generated event handlers must validate `args.data` and `args.data.rawData` before reading a field.

##### Complete HiloOpenClose sample using `args.data.rawData`

This standalone Angular sample reads all values from the original datasource record in `tooltipRender` and replaces the tooltip text with the month, open, high, low, and close values.

```ts
import { Component, OnInit } from '@angular/core';
import {
    CategoryService, ChartModule, HiloOpenCloseSeriesService, ITooltipRenderEventArgs, TooltipService
} from '@syncfusion/ej2-angular-charts';

interface HiloOpenCloseData {
    x: string;
    open: number;
    high: number;
    low: number;
    close: number;
}

@Component({
    imports: [ChartModule],
    providers: [CategoryService, HiloOpenCloseSeriesService, TooltipService],
    standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="raw-data-tooltip-chart" [primaryXAxis]="primaryXAxis"
        [primaryYAxis]="primaryYAxis" [tooltip]="tooltip" [title]="title"
        (tooltipRender)="tooltipRender($event)">
        <e-series-collection>
            <e-series [dataSource]="chartData" type="HiloOpenClose" xName="x" high="high" low="low"
                open="open" close="close" name="Price">
            </e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public chartData?: HiloOpenCloseData[];
    public primaryXAxis?: Object;
    public primaryYAxis?: Object;
    public tooltip?: Object;
    public title?: string;

    public tooltipRender(args: ITooltipRenderEventArgs): void {
        if (!args.data || !args.data.rawData) {
            return;
        }
        const rawData: HiloOpenCloseData = args.data.rawData as HiloOpenCloseData;
        args.headerText = `<b>${rawData.x}</b>`;
        args.text = [
            `Open: ${rawData.open}`,
            `High: ${rawData.high}`,
            `Low: ${rawData.low}`,
            `Close: ${rawData.close}`
        ];
    }

    public ngOnInit(): void {
        this.chartData = [
            { x: 'Jan', open: 120, high: 160, low: 100, close: 140 },
            { x: 'Feb', open: 150, high: 190, low: 130, close: 170 },
            { x: 'Mar', open: 130, high: 170, low: 110, close: 150 },
            { x: 'Apr', open: 160, high: 180, low: 120, close: 140 },
            { x: 'May', open: 150, high: 170, low: 110, close: 130 }
        ];
        this.primaryXAxis = {
            valueType: 'Category',
            title: 'Month',
            majorGridLines: { width: 0 }
        };
        this.primaryYAxis = {
            title: 'Price',
            minimum: 80,
            maximum: 200,
            interval: 20,
            labelFormat: '${value}'
        };
        this.tooltip = {
            enable: true
        };
        this.title = 'HiloOpenClose Tooltip Using the Raw Datasource Record';
    }
}
```

**Expected behavior:**

- Hovering a HiloOpenClose point triggers `tooltipRender`.
- `args.data.rawData` contains the complete record corresponding to the hovered point.
- `args.data.rawData.x` provides the month.
- `args.data.rawData.open`, `high`, `low`, and `close` provide the original financial values.
- The event changes `headerText` and `text` before the tooltip is rendered.
- The datasource remains unchanged because `rawData` is a copied record.

**AI sample-generation rules:**

- Use `args.data.rawData` only inside `tooltipRender`.
- Do not generate `${point.data.<field>}` in `tooltip.format` for this feature.
- Do not describe `rawData` as a nested tooltip-token feature.
- Guard against missing `args.data` or `args.data.rawData`.
- Cast `rawData` to the sample's datasource interface when strongly typed field access is required.
- Read fields using the datasource property names, such as `args.data.rawData.x` or `args.data.rawData.high`.


### Tooltip Styling

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateTimeService, StepLineSeriesService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts'
import { LegendService, TooltipService, CategoryService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { toolData } from './datasource';
@Component({
imports: [ ChartModule ],
providers: [ DateTimeService, StepLineSeriesService, LegendService, TooltipService, CategoryService, ColumnSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title' [tooltip]='tooltip'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='StepLine' xName='x' yName='y' width=2 name='China' [marker]='marker'></e-series>
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
          valueType: 'DateTime',
      };
      this.tooltip = {
        enable: true,
        fill: '#333',
        opacity: 0.9,
        textStyle: {
          color: 'white',
          size: '14px',
          fontWeight: 'Bold'
        },
        border: {
          width: 2,
          color: '#FF5733'
        }
      };
      this.marker = { visible: true, width: 10, height: 10 };
      this.title = 'Unemployment Rates 1975-2010';
  }
}
```

### Fixed Tooltip Position

By default, the tooltip follows the pointer. Use the `location` property to display the tooltip at a fixed position within the Chart.

```typescript
public tooltip: Object = {
    enable: true,
    location: {
        x: 120,
        y: 80
    }
};
```

In this example:

- `location.x` specifies the horizontal position relative to the Chart.
- `location.y` specifies the vertical position relative to the Chart.

> Ensure that the configured location provides sufficient space for the tooltip content and remains within the Chart area.

### Shared Tooltip

Enable the `shared` property to display values from all applicable series in a single tooltip at the same x-axis position.

```typescript
public tooltip: Object = {
    enable: true,
    shared: true
};
```

```html
<ejs-chart [tooltip]="tooltip">
    <e-series-collection>
        <e-series
            [dataSource]="salesData"
            type="Line"
            xName="x"
            yName="y"
            name="Sales">
        </e-series>
        <e-series
            [dataSource]="expenseData"
            type="Column"
            xName="x"
            yName="y"
            name="Expenses">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

When shared tooltip mode is enabled:

- Values from all applicable series are grouped by the corresponding x-axis position.
- The tooltip updates as the pointer moves between x-axis values.
- Only visible series with applicable points are included.
- The Chart automatically adjusts the tooltip to remain within the available chart area.

#### Positioning the Shared Tooltip

Use the `location` property with `shared: true` to display the shared tooltip at a fixed position.

```typescript
public tooltip: Object = {
    enable: true,
    shared: true,
    location: {
        x: 120,
        y: 80
    }
};
```

In this example:

- `shared: true` groups values from all applicable series.
- `location.x` specifies the fixed horizontal position.
- `location.y` specifies the fixed vertical position.

> A shared tooltip can contain values from multiple series and may require additional width or height. Verify that the configured location provides sufficient space for the complete tooltip content.

### Custom Tooltip Template

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateTimeService, StepLineSeriesService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts'
import { LegendService, TooltipService, CategoryService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { toolData } from './datasource';
@Component({
imports: [ ChartModule ],
providers: [ DateTimeService, StepLineSeriesService, LegendService, TooltipService, CategoryService, ColumnSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title' [tooltip]='tooltip'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='StepLine' xName='x' yName='y' width=2 name='China' [marker]='marker'></e-series>
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
          valueType: 'DateTime',
      };
      this.tooltip = {
        enable: true, template: '#Unemployment'
      };
      this.marker = { visible: true, width: 10, height: 10 };
      this.title = 'Unemployment Rates 1975-2010';
  }
}
```

```html
<div id='templateWrap'>
  <table style="width:100%;  border: 1px solid black;">
      <tr><th colspan="2" bgcolor="#00FFFF">Unemployment</th></tr>
      <tr><td bgcolor="#00FFFF">${x}:</td><td bgcolor="#00FFFF">${y}</td></tr>
  </table>
</div>
```

### Tooltip Events

```typescript
public tooltipRender(args: any) {
  // Customize tooltip before rendering
  args.text = `Custom: ${args.data.pointY}`;
}
```

```typescript
import { ChartModule, ChartAllModule, AccumulationChartAllModule } from '@syncfusion/ej2-angular-charts'
import { AccumulationChartModule } from '@syncfusion/ej2-angular-charts'
import { PieSeriesService, AccumulationTooltipService, AccumulationDataLabelService } from '@syncfusion/ej2-angular-charts'
import {
    LineSeriesService, DateTimeService, DataLabelService, StackingColumnSeriesService, CategoryService,
    StepAreaSeriesService, SplineSeriesService, ScrollBarService, ChartAnnotationService, LegendService, TooltipService, StripLineService,
    SelectionService, ScatterSeriesService, ZoomService, ColumnSeriesService, AreaSeriesService, RangeAreaSeriesService
} from '@syncfusion/ej2-angular-charts'


import { Component, OnInit } from '@angular/core';
import { ITooltipRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { Internationalization } from '@syncfusion/ej2-base';

@Component({
imports: [
         ChartModule, ChartAllModule, AccumulationChartAllModule, AccumulationChartModule
    ],

providers: [LineSeriesService, DateTimeService, ColumnSeriesService, DataLabelService, ZoomService, StackingColumnSeriesService, CategoryService,
        StepAreaSeriesService, SplineSeriesService, ChartAnnotationService, LegendService, TooltipService, StripLineService,
        PieSeriesService, AccumulationTooltipService, ScrollBarService, AccumulationDataLabelService, SelectionService, ScatterSeriesService,
        AreaSeriesService, RangeAreaSeriesService ],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title' [tooltip]='tooltip' (tooltipRender) = 'tooltipRender($event)'>
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
    public tooltip?: Object;
    public primaryYAxis?: Object;
    public tooltipRender(args: ITooltipRenderEventArgs | any): void {
        let intl: Internationalization = new Internationalization();
        let formattedString: string = intl.formatDate(new Date((args.point.x).toString()), { skeleton: 'MMMEd'});
        args.text = formattedString + ':' + args.text.split(':')[1];
    };
    ngOnInit(): void {
        this.chartData = [
             { x: new Date(2005, 0, 1), y: 21 }, { x: new Date(2006, 0, 1), y: 24 },
             { x: new Date(2007, 0, 1), y: 30 }, { x: new Date(2008, 0, 1), y: 38 },
             { x: new Date(2009, 0, 1), y: 54 }, { x: new Date(2010, 0, 1), y: 57 },
        ];
        this.primaryXAxis = {
           title: 'Year',
           valueType: 'DateTime'
        };
        this.primaryYAxis = {
           title: 'Efficiency',
        };
        this.marker = { visible: true, width: 10, height: 10, dataLabel: { visible: true}};
        this.title = 'Inflation - Consumer Price';
        this.tooltip = {enable: true}
    }
}
```

## Crosshair

Crosshair shows vertical and horizontal lines at cursor position for precise value reading.

### Basic Crosshair

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateTimeService, LineSeriesService } from '@syncfusion/ej2-angular-charts'
import { LegendService, CrosshairService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { ChartData } from './chartdata';

@Component({
imports: [
         ChartModule
    ],

providers: [ DateTimeService, LineSeriesService, LegendService, CrosshairService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title' [legendSettings]='legend' [crosshair]='crosshair'>
        <e-series-collection>
            <e-series [dataSource]='series1' type='Line' xName='x' yName='y' name='Temperature'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public series1?: Object[];
    public crosshair?: Object;
    public title?: string;
    public primaryYAxis?: Object;
    public legend?: Object;
    getCrosshairData(): any {
        let series1: Object[] = [];
        let series2: Object[] = [];
        let point1: Object;
        let point2: Object;
        let value: number = 60;
        let value1: number = 50;
        let i: number;
        for (i = 1; i < 250; i++) {
            if (Math.random() > .5) {
                value += Math.random();
            } else {
                value -= Math.random();
            }
            point1 = { x: new Date(2000, i, 1), y: value };
            series1.push(point1);
        }
        for (i = 1; i < 250; i++) {
            if (Math.random() > .5) {
                value1 += Math.random();
            } else {
                value1 -= Math.random();
            }
            point2 = { x: new Date(2000, i, 1), y: value1 };
            series2.push(point2);
        }
        return { 'series1': series1, 'series2': series2};
    }
    ngOnInit(): void {
        this.primaryXAxis = {
            valueType: 'DateTime',
            labelFormat: 'yMMM'
        };
        this.crosshair = { enable: true };
        this.series1 = this.getCrosshairData().series1;
        this.legend = { visible: true };
        this.title = 'Weather Condition';
    }
}
```

### Crosshair Line Style

```typescript
public crosshair = {
  enable: true,
  lineType: 'Both',  // Vertical, Horizontal, Both
  line: {
    width: 2,
    color: 'red',
    dashArray: '5,5'
  }
};
```

### Crosshair Label

```typescript
public crosshair = {
  enable: true,
  lineType: 'Both'
};

public primaryXAxis = {
  crosshairTooltip: {
    enable: true,
    fill: '#FF5733',
    textStyle: { color: 'white' }
  }
};

public primaryYAxis = {
  crosshairTooltip: {
    enable: true,
    fill: '#3498db',
    textStyle: { color: 'white' }
  }
};
```

## Trackball

Trackball highlights the nearest data point with tooltip as cursor moves.

### Basic Trackball

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateTimeService, LineSeriesService } from '@syncfusion/ej2-angular-charts'
import { LegendService, DataLabelService, TooltipService, CrosshairService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [ ChartModule ],
providers: [ DateTimeService, LineSeriesService, LegendService, DataLabelService,
                 TooltipService, CrosshairService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title' [crosshair]='crosshair' [tooltip]='tooltip'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Line' xName='x' yName='y' name='John' width=2 [marker]='marker'></e-series>
            <e-series [dataSource]='chartData' type='Line' xName='x' yName='y1' name='Andrew' width=2 [marker]='marker'></e-series>
            <e-series [dataSource]='chartData' type='Line' xName='x' yName='y2' name='Thomas' width=2 [marker]='marker'></e-series>
            <e-series [dataSource]='chartData' type='Line' xName='x' yName='y3' name='Mark' width=2 [marker]='marker'></e-series>
            <e-series [dataSource]='chartData' type='Line' xName='x' yName='y4' name='William' width=2 [marker]='marker'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public primaryYAxis?: Object;
    public chartData?: Object[];
    public crosshair?: Object;
    public title?: string;
    public tooltip?: Object;
    public marker?: Object;
    ngOnInit(): void {
        this.chartData = [
            { x: new Date(2000, 2, 11), y: 15, y1: 39, y2: 60, y3: 75, y4: 85 },
            { x: new Date(2000, 9, 14), y: 20, y1: 30, y2: 55, y3: 75, y4: 83 },
            { x: new Date(2001, 2, 11), y: 25, y1: 28, y2: 48, y3: 68, y4: 85 },
            { x: new Date(2001, 9, 16), y: 21, y1: 35, y2: 57, y3: 75, y4: 87 },
            { x: new Date(2002, 2, 7), y: 13, y1: 39, y2: 62, y3: 71, y4: 82 },
            { x: new Date(2002, 9, 7), y: 18, y1: 41, y2: 64, y3: 69, y4: 74 },
            { x: new Date(2003, 2, 11), y: 24, y1: 45, y2: 57, y3: 81, y4: 73 },
            { x: new Date(2003, 9, 14), y: 23, y1: 48, y2: 53, y3: 84, y4: 75 },
            { x: new Date(2004, 2, 6), y: 19, y1: 54, y2: 63, y3: 85, y4: 73 },
            { x: new Date(2004, 9, 6), y: 31, y1: 55, y2: 50, y3: 87, y4: 60 },
            { x: new Date(2005, 2, 11), y: 39, y1: 57, y2: 66, y3: 75, y4: 48 },
            { x: new Date(2005, 9, 11), y: 50, y1: 60, y2: 65, y3: 70, y4: 55 },
            { x: new Date(2006, 2, 11), y: 24, y1: 60, y2: 79, y3: 85, y4: 40 }
        ];
        this.primaryXAxis = {
            title: 'Years',
            minimum: new Date(2000, 1, 1), maximum: new Date(2006, 2, 11),
            intervalType: 'Years',
            valueType: 'DateTime',
        };
        this.tooltip = { enable: true, shared: true, format: '${series.name} : ${point.x} : ${point.y}' };
        this.crosshair = { enable: true, lineType: 'Vertical' };
        this.marker = { visible: true };
        this.title = 'Average Sales per Person';
    }
}
```

**Trackball shows:**
- Tooltip with all series values at x-position
- Marker on each series at nearest point
- Vertical crosshair line

## Selection

Select data points, series, or regions for highlighting or further actions.

### Point Selection

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts'
import { LegendService, SelectionService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { selectionData } from './datasource';
@Component({
imports: [
         ChartModule
    ],

providers: [ CategoryService, ColumnSeriesService, LegendService, SelectionService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryXAxis' [title]='title' selectionMode='Point'>
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
    ngOnInit(): void {
        this.chartData = selectionData;
        this.primaryXAxis = {
           valueType: 'Category',
           title: 'Countries'
        };
        this.title = 'Olympic Medals';
    }
}
```

### Selection Modes

**Point:** Select individual data points
```typescript
public selectionMode = 'Point';
```

**Series:** Select entire series
```typescript
public selectionMode = 'Series';
```

**Cluster:** Select all points at same x-value (column charts)
```typescript
public selectionMode = 'Cluster';
```

**Drag Selection:** Select region by dragging
```typescript
public selectionMode = 'DragXY';  // DragX, DragY, DragXY
```

### Selection Styling

```typescript
public selectionSettings = {
  enable: true,
  mode: 'Point',
  pattern: 'DiagonalForward'  // None, Dots, DiagonalForward, DiagonalBackward, etc.
};
```

**Selection Patterns:**
- None (solid fill)
- Dots
- DiagonalForward
- Cross
- HorizontalDash
- VerticalDash
- Rectangle
- Box
- VerticalStripe
- HorizontalStripe

### Programmatic Selection

```typescript
import { ViewChild } from '@angular/core';
import { ChartComponent as SyncfusionChart } from '@syncfusion/ej2-angular-charts';

export class AppComponent {
  @ViewChild('chart') public chart: SyncfusionChart;
  
  public selectDataPoint(seriesIndex: number, pointIndex: number) {
    this.chart.selectedDataIndexes = [{ series: seriesIndex, point: pointIndex }];
    this.chart.dataBind();
  }
}
```

### Selection Events

```typescript
public onChartClick(args: any) {
  console.log('Selected:', args.selectedDataValues);
}

public onSelectionComplete(args: any) {
  console.log('Selection completed:', args);
}
```

```html
<ejs-chart (chartMouseClick)="onChartClick($event)" 
           (selectionComplete)="onSelectionComplete($event)">
  <!-- series -->
</ejs-chart>
```

## Data Editing

Edit data by dragging points (line/scatter charts).

### Enable Data Editing

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { LineSeriesService, ColumnSeriesService, CategoryService, DataEditingService, TooltipService } from '@syncfusion/ej2-angular-charts'
import { LegendService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [ ChartModule ],
providers: [ LegendService, LineSeriesService, ColumnSeriesService, CategoryService, DataEditingService, TooltipService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' [title]='title'
            [chartArea]="chartArea" [tooltip]="tooltip">
        <e-series-collection>
            <e-series [dataSource]='columnData' type='Column' xName='x' yName='y' width="2" [marker]="marker" [dragSettings]="dragSettings"></e-series>
            <e-series [dataSource]='lineData' type='Line' xName='x' yName='y' width="2" [marker]="marker" [dragSettings]="dragSettings"></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public columnData?: Object[];
    public lineData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    public chartArea?: Object;
    public marker?: Object;
    public dragSettings?: Object;
    public tooltip?: Object;
    ngOnInit(): void {
        this.columnData = [
                 { x: '2005', y: 21 }, { x: '2006', y: 60 },
                 { x: '2007', y: 45 }, { x: '2008', y: 50 },
                { x: '2009', y: 74 }, { x: '2010', y: 65 },
                { x: '2011', y: 85 }
        ];
        this.lineData = [
                 { x: '2005', y: 21 }, { x: '2006', y: 22 },
                    { x: '2007', y: 36 }, { x: '2008', y: 34 },
                    { x: '2009', y: 54 }, { x: '2010', y: 55 },
                    { x: '2011', y: 60 }
        ];
        this.primaryXAxis = {
            valueType: 'Category',
            minimum: -0.5,
            maximum: 6.5,
            labelPlacement: 'OnTicks',
            majorGridLines: { width: 0 },
        };
        this.primaryYAxis = {
           rangePadding: 'None',
            minimum: 0,
            title : 'Sales',
            labelFormat: '{value}%',
            maximum: 100,
            interval: 20,
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 }
        };
        this.chartArea = {
            border: {
                width: 0
            }
        };
        this.title = 'Inflation - Consumer Price';
        this.marker = {
             visible: true,
             width: 10,
             height: 10
        };
        this.dragSettings = {
            enable: true
        };
        this.tooltip = {
            enable: true
        }
    }
}
```

### Drag Settings

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { LineSeriesService, ColumnSeriesService, CategoryService, DataEditingService, TooltipService } from '@syncfusion/ej2-angular-charts'
import { LegendService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [ ChartModule ],
providers: [ LegendService, LineSeriesService, ColumnSeriesService, CategoryService, DataEditingService, TooltipService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' [title]='title'
            [chartArea]="chartArea" [tooltip]="tooltip">
        <e-series-collection>
            <e-series [dataSource]='columnData' type='Column' xName='x' yName='y' width="2" [marker]="marker" [dragSettings]="dragSettings"></e-series>
            <e-series [dataSource]='lineData' type='Line' xName='x' yName='y' width="2" [marker]="marker" [dragSettings]="dragSettings"></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public columnData?: Object[];
    public lineData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    public chartArea?: Object;
    public marker?: Object;
    public dragSettings?: Object;
    public tooltip?: Object;
    ngOnInit(): void {
        this.columnData = [
                 { x: '2005', y: 21 }, { x: '2006', y: 60 },
                 { x: '2007', y: 45 }, { x: '2008', y: 50 },
                { x: '2009', y: 74 }, { x: '2010', y: 65 },
                { x: '2011', y: 85 }
        ];
        this.lineData = [
                 { x: '2005', y: 21 }, { x: '2006', y: 22 },
                    { x: '2007', y: 36 }, { x: '2008', y: 34 },
                    { x: '2009', y: 54 }, { x: '2010', y: 55 },
                    { x: '2011', y: 60 }
        ];
        this.primaryXAxis = {
            valueType: 'Category',
            minimum: -0.5,
            maximum: 6.5,
            labelPlacement: 'OnTicks',
            majorGridLines: { width: 0 },
        };
        this.primaryYAxis = {
           rangePadding: 'None',
            minimum: 0,
            title : 'Sales',
            labelFormat: '{value}%',
            maximum: 100,
            interval: 20,
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 }
        };
        this.chartArea = {
            border: {
                width: 0
            }
        };
        this.title = 'Inflation - Consumer Price';
        this.marker = {
             visible: true,
             width: 10,
             height: 10
        };
        this.dragSettings = {
          enable: true,
          minY: 0,  // Minimum Y value
          maxY: 100  // Maximum Y value
        };
        this.tooltip = {
            enable: true
        }
    }
}
```

### Drag Events

```typescript
public onDragStart(args: any) {
  console.log('Drag started:', args.data);
}

public onDragEnd(args: any) {
  console.log('New value:', args.data.y);
  // Update backend/state with new value
}
```

```html
<e-series [dragSettings]="dragSettings" 
          (dragStart)="onDragStart($event)"
          (dragEnd)="onDragEnd($event)">
</e-series>
```

## Synchronized Charts

Link multiple charts so interactions (zoom, tooltip, crosshair) affect all.

### Setup Synchronized Charts

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateTimeService, AreaSeriesService, LineSeriesService } from '@syncfusion/ej2-angular-charts'
import { TooltipService } from '@syncfusion/ej2-angular-charts'
import { Component, ViewChild, OnInit } from '@angular/core';
import { IMouseEventArgs, ChartComponent } from '@syncfusion/ej2-angular-charts';
import { synchronizedData } from './datasource';
import { Browser } from '@syncfusion/ej2-base';
@Component({
imports: [
         ChartModule
    ],

providers: [ DateTimeService, AreaSeriesService, LineSeriesService, TooltipService ],
standalone: true,
    selector: 'app-container',
    template: `<div class="control-section">
    <div class="row">
        <div class="col" >
            <ejs-chart #chart1 style='display:block;' id="container1" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis1'
                [title]='title1' [titleStyle]="titleStyle" [tooltip]="tooltip1"
                (chartMouseLeave)= 'chart1MouseLeave($event)' (chartMouseMove)='chart1MouseMove($event)' (chartMouseUp)='chart1MouseUp($event)'>
                <e-series-collection>
                    <e-series [dataSource]='chartData' type='Line' xName='USD' yName='EUR' [width]="width">
                    </e-series>
                </e-series-collection>
            </ejs-chart>
        </div>
        <div class="col" >
            <ejs-chart #chart2 style='display:block;' id="container2" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis2'
                [title]='title2' [titleStyle]="titleStyle" [tooltip]="tooltip2"
                (chartMouseLeave)= 'chart2MouseLeave($event)' (chartMouseMove)='chart2MouseMove($event)' (chartMouseUp)='chart2MouseUp($event)'>
                <e-series-collection>
                    <e-series [dataSource]='chartData' type='Area' xName='USD' yName='INR' opacity=0.6
                        [width]="width" [border]='border'>
                    </e-series>
                </e-series-collection>
            </ejs-chart>
        </div>
    </div>
</div>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public primaryYAxis1?: Object
    public primaryYAxis2?: Object;
    public chartData?: Object[];
    public title1?: string;
    public title2?: string;
    public titleStyle?: Object;
    public tooltip1?: Object;
    public tooltip2?: Object;
    public border?: Object;
    public width?: number;
    @ViewChild('chart1')
    public chart1: ChartComponent;

    @ViewChild('chart2')
    public chart2: ChartComponent;

    public chart1MouseLeave(args: IMouseEventArgs): void {
        this.chart2.hideTooltip();
    };
    public chart1MouseMove(args: IMouseEventArgs): void {
        if ((!Browser.isDevice && !this.chart1.isTouch && !this.chart1.isChartDrag) || this.chart1.startMove) {
            this.chart2.startMove = this.chart1.startMove;
            this.chart2.showTooltip(args.x, args.y);
        }
    };
    public chart1MouseUp(args: IMouseEventArgs): void {
        if (Browser.isDevice && this.chart1.startMove) {
            this.chart2.hideTooltip();
        }
    };
    public chart2MouseLeave(args: IMouseEventArgs): void {
        this.chart1.hideTooltip();
    };
    public chart2MouseMove(args: IMouseEventArgs): void {
        if ((!Browser.isDevice && !this.chart2.isTouch && !this.chart2.isChartDrag) || this.chart2.startMove) {
            this.chart2.startMove = this.chart1.startMove;
            this.chart1.showTooltip(args.x, args.y);
        }
    };
    public chart2MouseUp(args: IMouseEventArgs): void {
        if (Browser.isDevice && this.chart2.startMove) {
            this.chart1.hideTooltip();
        }
    };
    ngOnInit(): void {
        this.chartData = synchronizedData;
        this.primaryXAxis = {
            minimum: new Date(2023, 1, 18),
            maximum: new Date(2023, 7, 18),
            valueType: 'DateTime',
            labelFormat: 'MMM d',
            lineStyle: { width: 0 },
            majorGridLines: { width: 0 },
            edgeLabelPlacement: Browser.isDevice ? 'None' : 'Shift',
            labelRotation: Browser.isDevice ? -45 : 0,
            interval: Browser.isDevice ? 2 : 1
        };
        this.primaryYAxis1 = {
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            minimum: 0.86,
            maximum: 0.96,
            interval: 0.025
        };
        this.primaryYAxis2 = {
            labelFormat: 'n1',
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            minimum: 79,
            maximum: 85,
            interval: 1.5
        };
        this.title1 = 'US to Euro';
        this.title2 = 'US to INR';
        this.tooltip1 = {
            enable: true, fadeOutDuration: Browser.isDevice ? 2500 : 1000, shared: true, header: '', format: '<b>€${point.y}</b><br>${point.x} 2023', enableMarker: false
        };
        this.tooltip2 = {
            enable: true, fadeOutDuration: Browser.isDevice ? 2500 : 1000, shared: true, header: '', format: '<b>₹${point.y}</b><br>${point.x} 2023', enableMarker: false
        };
        this.border = {
            width: 2
        };
        this.width = 2;
        this.titleStyle = {
            textAlignment: 'Near'
        };
    }
}
```

### Sync Crosshair

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateTimeService, AreaSeriesService, SplineSeriesService } from '@syncfusion/ej2-angular-charts'
import { CrosshairService } from '@syncfusion/ej2-angular-charts'
import { Component, ViewChild, OnInit } from '@angular/core';
import { IMouseEventArgs, ChartComponent } from '@syncfusion/ej2-angular-charts';
import { synchronizedData } from './datasource';
import { Browser } from '@syncfusion/ej2-base';
@Component({
imports: [
         ChartModule
    ],

providers: [ DateTimeService, AreaSeriesService, SplineSeriesService, CrosshairService],
standalone: true,
    selector: 'app-container',
    template: `<div class="control-section">
    <div class="row">
        <div class="col" >
            <ejs-chart #chart1 style='display:block;' id="container1" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis1'
                [title]='title1' [titleStyle]="titleStyle" [crosshair]='crosshair'
                (chartMouseLeave)= 'chart1MouseLeave($event)' (chartMouseMove)='chart1MouseMove($event)' (chartMouseUp)='chart1MouseUp($event)'>
                <e-series-collection>
                    <e-series [dataSource]='chartData' type='Spline' xName='USD' yName='EUR' [width]="width">
                    </e-series>
                </e-series-collection>
            </ejs-chart>
        </div>
        <div class="col" >
            <ejs-chart #chart2 style='display:block;' id="container2" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis2'
                [title]='title2' [titleStyle]="titleStyle" [crosshair]='crosshair'
                (chartMouseLeave)= 'chart2MouseLeave($event)' (chartMouseMove)='chart2MouseMove($event)' (chartMouseUp)='chart2MouseUp($event)'>
                <e-series-collection>
                    <e-series [dataSource]='chartData' type='Area' xName='USD' yName='INR' opacity=0.6
                        [width]="width" [border]='border'>
                    </e-series>
                </e-series-collection>
            </ejs-chart>
        </div>
    </div>
</div>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public primaryYAxis1?: Object
    public primaryYAxis2?: Object;
    public chartData?: Object[];
    public title1?: string;
    public title2?: string;
    public titleStyle?: Object;
    public border?: Object;
    public width?: number;
    public crosshair?: Object;
    @ViewChild('chart1')
    public chart1: ChartComponent;

    @ViewChild('chart2')
    public chart2: ChartComponent;

    public chart1MouseLeave(args: IMouseEventArgs): void {
        this.chart2.hideCrosshair();
    };
    public chart1MouseMove(args: IMouseEventArgs): void {
        if ((!Browser.isDevice && !this.chart1.isTouch && !this.chart1.isChartDrag) || this.chart1.startMove) {
            this.chart2.startMove = this.chart1.startMove;
            this.chart2.showCrosshair(args.x, args.y);
        }
    };
    public chart1MouseUp(args: IMouseEventArgs): void {
        if (Browser.isDevice && this.chart1.startMove) {
            this.chart2.hideCrosshair();
        }
    };
    public chart2MouseLeave(args: IMouseEventArgs): void {
        this.chart1.hideCrosshair();
    };
    public chart2MouseMove(args: IMouseEventArgs): void {
        if ((!Browser.isDevice && !this.chart2.isTouch && !this.chart2.isChartDrag) || this.chart2.startMove) {
            this.chart2.startMove = this.chart1.startMove;
            this.chart1.showCrosshair(args.x, args.y);
        }
    };
    public chart2MouseUp(args: IMouseEventArgs): void {
        if (Browser.isDevice && this.chart2.startMove) {
            this.chart1.hideCrosshair();
        }
    };
    ngOnInit(): void {
        this.chartData = synchronizedData;
        this.primaryXAxis = {
            minimum: new Date(2023, 1, 18),
            maximum: new Date(2023, 7, 18),
            valueType: 'DateTime',
            labelFormat: 'MMM d',
            lineStyle: { width: 0 },
            majorGridLines: { width: 0 },
            edgeLabelPlacement: Browser.isDevice ? 'None' : 'Shift',
            labelRotation: Browser.isDevice ? -45 : 0,
            interval: Browser.isDevice ? 2 : 1,
            crosshairTooltip: { enable: true },
        };
        this.primaryYAxis1 = {
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            minimum: 0.86,
            maximum: 0.96,
            interval: 0.025
        };
        this.primaryYAxis2 = {
            labelFormat: 'n1',
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            minimum: 79,
            maximum: 85,
            interval: 1.5
        };
        this.title1 = 'US to Euro';
        this.title2 = 'US to INR';
        this.border = {
            width: 2
        };
        this.width = 2;
        this.titleStyle = {
            textAlignment: 'Near'
        };
        this.crosshair = {
            enable: true, lineType: 'Vertical', dashArray: '2,2'
        };
    }
}
```

### Sync Tooltip

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateTimeService, AreaSeriesService, LineSeriesService } from '@syncfusion/ej2-angular-charts'
import { TooltipService } from '@syncfusion/ej2-angular-charts'
import { Component, ViewChild, OnInit } from '@angular/core';
import { IMouseEventArgs, ChartComponent } from '@syncfusion/ej2-angular-charts';
import { synchronizedData } from './datasource';
import { Browser } from '@syncfusion/ej2-base';
@Component({
imports: [
         ChartModule
    ],

providers: [ DateTimeService, AreaSeriesService, LineSeriesService, TooltipService ],
standalone: true,
    selector: 'app-container',
    template: `<div class="control-section">
    <div class="row">
        <div class="col" >
            <ejs-chart #chart1 style='display:block;' id="container1" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis1'
                [title]='title1' [titleStyle]="titleStyle" [tooltip]="tooltip1"
                (chartMouseLeave)= 'chart1MouseLeave($event)' (chartMouseMove)='chart1MouseMove($event)' (chartMouseUp)='chart1MouseUp($event)'>
                <e-series-collection>
                    <e-series [dataSource]='chartData' type='Line' xName='USD' yName='EUR' [width]="width">
                    </e-series>
                </e-series-collection>
            </ejs-chart>
        </div>
        <div class="col" >
            <ejs-chart #chart2 style='display:block;' id="container2" [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis2'
                [title]='title2' [titleStyle]="titleStyle" [tooltip]="tooltip2"
                (chartMouseLeave)= 'chart2MouseLeave($event)' (chartMouseMove)='chart2MouseMove($event)' (chartMouseUp)='chart2MouseUp($event)'>
                <e-series-collection>
                    <e-series [dataSource]='chartData' type='Area' xName='USD' yName='INR' opacity=0.6
                        [width]="width" [border]='border'>
                    </e-series>
                </e-series-collection>
            </ejs-chart>
        </div>
    </div>
</div>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public primaryYAxis1?: Object
    public primaryYAxis2?: Object;
    public chartData?: Object[];
    public title1?: string;
    public title2?: string;
    public titleStyle?: Object;
    public tooltip1?: Object;
    public tooltip2?: Object;
    public border?: Object;
    public width?: number;
    @ViewChild('chart1')
    public chart1: ChartComponent;

    @ViewChild('chart2')
    public chart2: ChartComponent;

    public chart1MouseLeave(args: IMouseEventArgs): void {
        this.chart2.hideTooltip();
    };
    public chart1MouseMove(args: IMouseEventArgs): void {
        if ((!Browser.isDevice && !this.chart1.isTouch && !this.chart1.isChartDrag) || this.chart1.startMove) {
            this.chart2.startMove = this.chart1.startMove;
            this.chart2.showTooltip(args.x, args.y);
        }
    };
    public chart1MouseUp(args: IMouseEventArgs): void {
        if (Browser.isDevice && this.chart1.startMove) {
            this.chart2.hideTooltip();
        }
    };
    public chart2MouseLeave(args: IMouseEventArgs): void {
        this.chart1.hideTooltip();
    };
    public chart2MouseMove(args: IMouseEventArgs): void {
        if ((!Browser.isDevice && !this.chart2.isTouch && !this.chart2.isChartDrag) || this.chart2.startMove) {
            this.chart2.startMove = this.chart1.startMove;
            this.chart1.showTooltip(args.x, args.y);
        }
    };
    public chart2MouseUp(args: IMouseEventArgs): void {
        if (Browser.isDevice && this.chart2.startMove) {
            this.chart1.hideTooltip();
        }
    };
    ngOnInit(): void {
        this.chartData = synchronizedData;
        this.primaryXAxis = {
            minimum: new Date(2023, 1, 18),
            maximum: new Date(2023, 7, 18),
            valueType: 'DateTime',
            labelFormat: 'MMM d',
            lineStyle: { width: 0 },
            majorGridLines: { width: 0 },
            edgeLabelPlacement: Browser.isDevice ? 'None' : 'Shift',
            labelRotation: Browser.isDevice ? -45 : 0,
            interval: Browser.isDevice ? 2 : 1
        };
        this.primaryYAxis1 = {
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            minimum: 0.86,
            maximum: 0.96,
            interval: 0.025
        };
        this.primaryYAxis2 = {
            labelFormat: 'n1',
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            minimum: 79,
            maximum: 85,
            interval: 1.5
        };
        this.title1 = 'US to Euro';
        this.title2 = 'US to INR';
        this.tooltip1 = {
            enable: true, fadeOutDuration: Browser.isDevice ? 2500 : 1000, shared: true, header: '', format: '<b>€${point.y}</b><br>${point.x} 2023', enableMarker: false
        };
        this.tooltip2 = {
            enable: true, fadeOutDuration: Browser.isDevice ? 2500 : 1000, shared: true, header: '', format: '<b>₹${point.y}</b><br>${point.x} 2023', enableMarker: false
        };
        this.border = {
            width: 2
        };
        this.width = 2;
        this.titleStyle = {
            textAlignment: 'Near'
        };
    }
}
```

## Best Practices

### Zooming
- Enable selection + mouse wheel for flexibility
- Show zoom toolbar for user guidance
- Add scrollbar for long time-series data

### Tooltip
- Use shared tooltip for multi-series charts
- Format values for readability ($, %, K, M)
- Keep tooltip content concise

### Crosshair
- Combine with tooltip for maximum info
- Use trackball for multi-series comparison
- Style crosshair lines to stand out

### Selection
- Provide visual feedback (patterns, colors)
- Handle selection events to take action
- Clear instructions for drag selection

### Synchronized Charts
- Ensure same x-axis scale/range
- Sync only related interactions
- Test performance with many charts

## Common Pitfalls

1. **Missing Service Providers:** Forgetting to inject required services (ZoomService, TooltipService, etc.)
2. **Performance Issues:** Too many interactions on large datasets
3. **Conflicting Features:** Zoom + drag selection can interfere
4. **Poor UX:** No instructions for users on how to interact
5. **Tooltip Overlap:** Multiple tooltips competing for space

## Performance Tips

- Disable animations during zooming: `animation: { enable: false }`
- Use canvas rendering for large datasets: `enableCanvas: true`
- Debounce mouse events in synchronized charts
- Limit tooltip updates to necessary data only

Refer to the advanced-features reference for event handling and API methods.

## API Reference Summary

### Zoom Configuration

| API | Description | Documentation |
|-----|-------------|---------------|
| ZoomSettingsModel | Complete zoom configuration interface | [zoomSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/zoomSettingsModel) |
| ZoomSettings | Zoom settings class | [zoomSettings](https://ej2.syncfusion.com/angular/documentation/api/chart/zoomSettings) |
| ZoomMode | Zoom mode enum (X, Y, XY) | [zoomMode](https://ej2.syncfusion.com/angular/documentation/api/chart/zoomMode) |
| ToolbarItems | Toolbar items enum | [toolbarItems](https://ej2.syncfusion.com/angular/documentation/api/chart/toolbarItems) |
| ScrollbarSettings | Scrollbar configuration | [scrollbarSettings](https://ej2.syncfusion.com/angular/documentation/api/chart/scrollbarSettings) |
| ScrollbarSettingsModel | Scrollbar model interface | [scrollbarSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/scrollbarSettingsModel) |

### Tooltip Configuration

| API | Description | Documentation |
|-----|-------------|---------------|
| TooltipSettingsModel | Complete tooltip configuration interface | [tooltipSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/tooltipSettingsModel) |
| TooltipSettings | Tooltip settings class | [tooltipSettings](https://ej2.syncfusion.com/angular/documentation/api/chart/tooltipSettings) |
| TooltipPosition | Tooltip position enum | [tooltipPosition](https://ej2.syncfusion.com/angular/documentation/api/chart/tooltipPosition) |
| FadeOutMode | Tooltip fade-out behavior | [fadeOutMode](https://ej2.syncfusion.com/angular/documentation/api/chart/fadeOutMode) |

### Crosshair Configuration

| API | Description | Documentation |
|-----|-------------|---------------|
| CrosshairSettingsModel | Crosshair configuration interface | [crosshairSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/crosshairSettingsModel) |
| CrosshairSettings | Crosshair settings class | [crosshairSettings](https://ej2.syncfusion.com/angular/documentation/api/chart/crosshairSettings) |
| CrosshairTooltipModel | Crosshair tooltip configuration | [crosshairTooltipModel](https://ej2.syncfusion.com/angular/documentation/api/chart/crosshairTooltipModel) |

### Selection Configuration

| API | Description | Documentation |
|-----|-------------|---------------|
| SelectionMode | Selection mode enum (Point, Series, Cluster, DragXY, etc.) | [selectionMode](https://ej2.syncfusion.com/angular/documentation/api/chart/selectionMode) |
| SelectionPattern | Selection pattern enum (None, Dots, DiagonalForward, etc.) | [selectionPattern](https://ej2.syncfusion.com/angular/documentation/api/chart/selectionPattern) |
| HighlightMode | Highlight mode enum (None, Point, Series, etc.) | [highlightMode](https://ej2.syncfusion.com/angular/documentation/api/chart/highlightMode) |

### Key Properties Reference

| Feature | Important Properties | API Reference |
|---------|---------------------|---------------|
| **Zooming** | enableSelectionZooming, enableMouseWheelZooming, mode, toolbarItems | [ZoomSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/zoomSettingsModel) |
| **Panning** | enablePan (via ZoomSettings) | [ZoomSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/zoomSettingsModel) |
| **Tooltip** | enable, format, shared, fill, border, template | [TooltipSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/tooltipSettingsModel) |
| **Crosshair** | enable, line, lineType, dashArray | [CrosshairSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/crosshairSettingsModel) |
| **Selection** | selectionMode, selectionPattern, highlightMode | [ChartModel](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel) |
| **Data Editing** | allowDataEdit (via Series) | [Series](https://ej2.syncfusion.com/angular/documentation/api/chart/series) |

### Events for Interactive Features

| Event | Interface | Description | API Reference |
|-------|-----------|-------------|---------------|
| onZooming | IZoomingEventArgs | Triggered during zoom operation | [onZooming](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#onZooming), [IZoomingEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iZoomingEventArgs) |
| zoomComplete | IZoomCompleteEventArgs | Triggered after zoom completes | [zoomComplete](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#zoomComplete), [IZoomCompleteEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iZoomCompleteEventArgs) |
| tooltipRender | ITooltipRenderEventArgs | Before tooltip rendering | [tooltipRender](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#tooltipRender), [ITooltipRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iTooltipRenderEventArgs) |
| sharedTooltipRender | ISharedTooltipRenderEventArgs | Before shared tooltip rendering | [sharedTooltipRender](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#sharedTooltipRender), [ISharedTooltipRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iSharedTooltipRenderEventArgs) |
| pointClick | IPointEventArgs | Point click event | [pointClick](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#pointClick), [IPointEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iPointEventArgs) |
| pointDoubleClick | IPointEventArgs | Point double click | [pointDoubleClick](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#pointDoubleClick), [IPointEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iPointEventArgs) |
| pointMove | IPointEventArgs | Mouse move over point | [pointMove](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#pointMove), [IPointEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iPointEventArgs) |
| chartMouseClick | IMouseEventArgs | Chart mouse click | [chartMouseClick](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#chartMouseClick), [IMouseEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iMouseEventArgs) |
| chartMouseMove | IMouseEventArgs | Mouse move on chart | [chartMouseMove](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#chartMouseMove), [IMouseEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iMouseEventArgs) |
| chartMouseDown | IMouseEventArgs | Mouse down on chart | [chartMouseDown](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#chartMouseDown), [IMouseEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iMouseEventArgs) |
| chartMouseUp | IMouseEventArgs | Mouse up on chart | [chartMouseUp](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#chartMouseUp), [IMouseEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iMouseEventArgs) |
| selectionComplete | ISelectionCompleteEventArgs | After selection completes | [selectionComplete](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#selectionComplete), [ISelectionCompleteEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iSelectionCompleteEventArgs) |
| drag | IDragCompleteEventArgs | During drag operation | [drag](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#drag) |
| dragComplete | IDragCompleteEventArgs | After drag completes | [dragComplete](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#dragComplete), [IDragCompleteEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iDragCompleteEventArgs) |
| scrollStart | IScrollEventArgs | Scrollbar scroll start | [scrollStart](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#scrollStart), [IScrollEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iScrollEventArgs) |
| scrollEnd | IScrollEventArgs | Scrollbar scroll end | [scrollEnd](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#scrollEnd), [IScrollEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iScrollEventArgs) |
| scrollChanged | IScrollEventArgs | Scrollbar scroll change | [scrollChanged](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#scrollChanged), [IScrollEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iScrollEventArgs) |

### Required Services

| Feature | Service | Import |
|---------|---------|--------|
| Zooming, Panning | ZoomService | @syncfusion/ej2-angular-charts |
| Tooltip | TooltipService | @syncfusion/ej2-angular-charts |
| Crosshair | CrosshairService | @syncfusion/ej2-angular-charts |
| Selection | SelectionService | @syncfusion/ej2-angular-charts |
| Data Editing | DataEditingService | @syncfusion/ej2-angular-charts |

**Note:** When using `ChartAllModule`, all services are automatically provided.
