# Advanced Features Reference for Syncfusion Angular Chart

## Table of Contents

- [Introduction](#introduction)
- [Chart Events](#chart-events)
  - [Lifecycle Events](#lifecycle-events)
  - [Interaction Events](#interaction-events)
  - [Render Events](#render-events)
  - [Animation Events](#animation-events)
- [Export Functionality](#export-functionality)
  - [Image Export](#image-export)
  - [PDF Export](#pdf-export)
  - [Excel Export](#excel-export)
  - [Base64 Export](#base64-export)
- [Print Functionality](#print-functionality)
- [Render Methods](#render-methods)
  - [SVG Rendering](#svg-rendering)
  - [Canvas Rendering](#canvas-rendering)
- [Module Injection](#module-injection)
- [Animation Control](#animation-control)
- [Selection and Highlighting](#selection-and-highlighting)
- [Zooming and Panning](#zooming-and-panning)
- [Crosshair and Trackball](#crosshair-and-trackball)
- [Synchronized Charts](#synchronized-charts)
- [Best Practices](#best-practices)
- [Advanced Patterns](#advanced-patterns)
- [Troubleshooting](#troubleshooting)

## Introduction

The Syncfusion Angular Chart component offers advanced features that extend beyond basic visualization. These features include comprehensive event handling, export capabilities, print support, and interactive elements that enhance user experience and data analysis.

This reference covers all advanced features with practical examples and implementation guidance.

## Chart Events

### Lifecycle Events

**load Event:**
Triggered before the chart begins rendering. Use this to configure properties programmatically.

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService, LegendService, DataLabelService, MultiLevelLabelService, SelectionService } from '@syncfusion/ej2-angular-charts'
import { ILoadedEventArgs } from '@syncfusion/ej2-charts';

@Component({
  imports: [ ChartModule ],
  providers: [ CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService,LegendService, DataLabelService, MultiLevelLabelService, SelectionService],
  standalone: true,
  selector: 'app-chart',
  template: `
    <ejs-chart id="chart-container" (load)='onLoad($event)' [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='gold' name='Gold'></e-series>
        </e-series-collection>
    </ejs-chart>
  `
})
export class ChartComponent {
  public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    onLoad(args: ILoadedEventArgs): void {
    // Set theme based on user preference
    let savedTheme = localStorage.getItem('chartTheme');
    if (savedTheme) {
      args.chart.theme = savedTheme;
    }
    
    // Apply custom palettes
    args.chart.palettes = this.getCustomPalette();
    
    // Configure locale
    args.chart.locale = this.getCurrentLocale();
  };
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

**loaded Event:**
Triggered after chart rendering completes.

```typescript
onLoaded(args: ILoadedEventArgs): void {
  console.log('Chart loaded successfully');
  
  // Perform post-render operations
  this.hideLoadingSpinner();
  this.enableInteractions();
  this.trackAnalytics('chart_viewed');
  
  // Access rendered elements
  let svg = args.chart.svgObject;
  // Custom SVG manipulations if needed
}
```

**beforeResize Event:**
Triggered before chart resize. Can cancel the resize.

```typescript
import { IBeforeResizeEventArgs } from '@syncfusion/ej2-charts';

onBeforeResize(args: IBeforeResizeEventArgs): void {
  // Cancel resize if dimensions are too small
  if (args.currentSize.width < 300 || args.currentSize.height < 200) {
    args.cancel = true;
    this.showResizeWarning();
  }
  
  // Log resize event
  console.log('Resizing from', args.previousSize, 'to', args.currentSize);
}
```

**resized Event:**
Triggered after chart is resized.

```typescript
import { IResizeEventArgs } from '@syncfusion/ej2-charts';

onResized(args: IResizeEventArgs): void {
  console.log('Chart resized to:', args.currentSize);
  
  // Adjust elements based on new size
  if (args.currentSize.width < 500) {
    this.switchToMobileLayout();
  } else {
    this.switchToDesktopLayout();
  }
}
```

### Interaction Events

**pointClick Event:**
Triggered when a data point is clicked.

```typescript
import { IPointEventArgs } from '@syncfusion/ej2-charts';

onPointClick(args: IPointEventArgs): void {
  console.log('Point clicked:', args.point);
  
  // Show detailed information
  this.showPointDetails({
    series: args.seriesIndex,
    point: args.pointIndex,
    x: args.point.x,
    y: args.point.y
  });
  
  // Drill down to details
  if (args.point.x === 'Q1') {
    this.loadQuarterlyDetails('Q1');
  }
}
```

**pointDoubleClick Event:**
Triggered on double-clicking a data point.

```typescript
onPointDoubleClick(args: IPointEventArgs): void {
  // Open detailed view
  this.openDetailModal(args.point);
  
  // Or zoom to point
  this.zoomToPoint(args.point);
}
```

**pointMove Event:**
Triggered when hovering over a data point.

```typescript
onPointMove(args: IPointEventArgs): void {
  // Update external indicator
  this.updateSelectionIndicator(args.point);
  
  // Show preview
  this.showQuickPreview(args.point);
}
```

**chartMouseClick Event:**
Triggered when clicking anywhere on the chart.

```typescript
import { IMouseEventArgs } from '@syncfusion/ej2-charts';

onChartMouseClick(args: IMouseEventArgs): void {
  console.log('Clicked at:', args.x, args.y);
  
  // Get axis values at click position
  if (args.target.includes('Series')) {
    let xValue = args.axisData.primaryXAxis;
    let yValue = args.axisData.primaryYAxis;
    console.log('Axis values:', xValue, yValue);
  }
  
  // Clear selection if clicking empty area
  if (!args.target.includes('Point')) {
    this.clearSelection();
  }
}
```

**legendClick Event:**
Triggered when clicking a legend item.

```typescript
import { ILegendClickEventArgs } from '@syncfusion/ej2-charts';

onLegendClick(args: ILegendClickEventArgs): void {
  console.log('Legend clicked:', args.series.name);
  
  // Custom toggle behavior
  if (args.series.name === 'Critical Data') {
    args.cancel = true;  // Prevent default toggle
    this.showWarning('This series cannot be hidden');
  }
  
  // Track visibility
  this.trackSeriesVisibility(args.series.name, !args.series.visible);
}
```

### Render Events

**seriesRender Event:**
Triggered before a series renders.

```typescript
import { ISeriesRenderEventArgs } from '@syncfusion/ej2-charts';

onSeriesRender(args: ISeriesRenderEventArgs): void {
  // Conditional styling
  if (args.series.name === 'Actual') {
    args.fill = '#4CAF50';
  } else if (args.series.name === 'Forecast') {
    args.fill = '#FF9800';
    args.dashArray = '5,5';  // Dashed line for forecast
  }
  
  // Hide series based on condition
  if (this.hideProjections && args.series.name.includes('Projection')) {
    args.cancel = true;
  }
}
```

**pointRender Event:**
Triggered before each point renders.

```typescript
import { IPointRenderEventArgs } from '@syncfusion/ej2-charts';

onPointRender(args: IPointRenderEventArgs): void {
  // Color-code by value
  if (args.point.y > 80) {
    args.fill = '#4CAF50';  // Green for high
  } else if (args.point.y > 50) {
    args.fill = '#FFC107';  // Yellow for medium
  } else {
    args.fill = '#F44336';  // Red for low
  }
  
  // Highlight specific points
  if (args.point.x === this.selectedMonth) {
    args.border = { width: 3, color: '#000000' };
  }
  
  // Custom shapes
  if (args.point.y === this.maxValue) {
    args.shape = 'Diamond';
  }
}
```

**textRender Event:**
Triggered before data labels render.

```typescript
import { ITextRenderEventArgs } from '@syncfusion/ej2-charts';

onTextRender(args: ITextRenderEventArgs): void {
  // Format label text
  args.text = '$' + parseFloat(args.text).toLocaleString();
  
  // Conditional styling
  if (parseFloat(args.text) < 0) {
    args.color = '#FF0000';
    args.text = '(' + Math.abs(parseFloat(args.text)) + ')';
  }
  
  // Hide labels for small values
  if (parseFloat(args.text) < 10) {
    args.text = '';
  }
}
```

**axisLabelRender Event:**
Triggered before axis labels render.

```typescript
import { IAxisLabelRenderEventArgs } from '@syncfusion/ej2-charts';

onAxisLabelRender(args: IAxisLabelRenderEventArgs): void {
  // Abbreviate large numbers
  if (args.axis.name === 'primaryYAxis') {
    if (args.value >= 1000000) {
      args.text = (args.value / 1000000).toFixed(1) + 'M';
    } else if (args.value >= 1000) {
      args.text = (args.value / 1000).toFixed(0) + 'K';
    }
  }
  
  // Custom date formatting
  if (args.axis.valueType === 'DateTime') {
    let date = new Date(args.value);
    args.text = date.toLocaleDateString('en-US', { month: 'short' });
  }
}
```

**tooltipRender Event:**
Triggered before tooltip displays.

```typescript
import { ITooltipRenderEventArgs } from '@syncfusion/ej2-charts';

onTooltipRender(args: ITooltipRenderEventArgs): void {
  // Custom tooltip content
  args.text = `
    <div style="padding: 10px;">
      <strong>${args.point.x}</strong><br/>
      Sales: $${args.point.y.toLocaleString()}<br/>
      Growth: ${this.calculateGrowth(args.point)}%
    </div>
  `;
  
  // Custom styling
  args.headerText = '<strong>Sales Data</strong>';
  args.textStyle.color = '#FFFFFF';
}
```

### Animation Events

**animationComplete Event:**
Triggered when series animation completes.

```typescript
import { IAnimationCompleteEventArgs } from '@syncfusion/ej2-charts';

onAnimationComplete(args: IAnimationCompleteEventArgs): void {
  console.log('Animation completed for series:', args.series.name);
  
  // Enable interactions after animation
  this.enableUserInteractions();
  
  // Start next animation
  if (this.animationQueue.length > 0) {
    this.startNextAnimation();
  }
}
```

## Export Functionality

### Image Export

Export chart as PNG, JPEG, or SVG:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ChartComponent, ExportType } from '@syncfusion/ej2-angular-charts';
import { data } from './datasource';

@Component({
  imports: [ChartModule],
  providers: [ CategoryService, DateTimeService, ColumnSeriesService],
  standalone: true,
  selector: 'app-chart',
  template: `
    <button (click)="exportChart('PNG')">Export PNG</button>
    <button (click)="exportChart('JPEG')">Export JPEG</button>
    <button (click)="exportChart('SVG')">Export SVG</button>
    
    <ejs-chart #chart 
      [title]='title'
      (beforeExport)='onBeforeExport($event)'>
      <e-series-collection>
        <e-series [dataSource]='data'></e-series>
      </e-series-collection>
    </ejs-chart>
  `
})
export class ExportChartComponent {
  @ViewChild('chart') chart: ChartComponent;
  
  exportChart(type: ExportType): void {
    this.chart.export(type, 'ChartExport');
  }
  
  onBeforeExport(args: IExportEventArgs): void {
    // Customize export
    args.width = 1920;
    args.height = 1080;
  }
}
```

**Custom Export Settings:**

```typescript
exportWithSettings(): void {
  this.chart.export('PNG', 'SalesChart', null, [this.chart], 1920, 1080);
  //                 type   fileName    orientation controls  width  height
}
```

### PDF Export

Export chart to PDF with custom settings:

```typescript
exportToPDF(): void {
  this.chart.export('PDF', 'ChartReport', 'Portrait');
}

exportWithHeaderFooter(): void {
  this.chart.export(
    'PDF',
    'MonthlyReport',
    'Landscape',
    [this.chart],
    null,
    null,
    true,  // allowDownload
    {
      header: {
        fromTop: 0,
        height: 130,
        contents: [
          {
            type: 'Text',
            value: 'Sales Performance Report',
            position: { x: 250, y: 50 },
            style: { fontSize: 20, bold: true }
          }
        ]
      },
      footer: {
        fromBottom: 160,
        height: 150,
        contents: [
          {
            type: 'PageNumber',
            format: 'Page {$current} of {$total}',
            position: { x: 250, y: 50 },
            style: { fontSize: 12 }
          },
          {
            type: 'Text',
            value: '© 2024 Company Name',
            position: { x: 250, y: 80 }
          }
        ]
      }
    }
  );
}
```

**Multiple Charts in PDF:**

```typescript
@ViewChild('chart1') chart1: ChartComponent;
@ViewChild('chart2') chart2: ChartComponent;

exportMultipleCharts(): void {
  this.chart1.export(
    'PDF',
    'CombinedReport',
    'Portrait',
    [this.chart1, this.chart2],  // Multiple chart instances
    null,
    null,
    true,
    null,
    false  // exportToMultiplePage: false = same page
  );
}

exportToSeparatePages(): void {
  this.chart1.export(
    'PDF',
    'DetailedReport',
    'Portrait',
    [this.chart1, this.chart2],
    null,
    null,
    true,
    null,
    true  // exportToMultiplePage: true = separate pages
  );
}
```

### Excel Export

Export chart data to Excel:

```typescript
import { IExportEventArgs } from '@syncfusion/ej2-charts';
import { ChartModule, ChartComponent } from '@syncfusion/ej2-angular-charts';
import { Component } from '@angular/core';
import { CategoryService, DateTimeService, ColumnSeriesService, LegendService } from '@syncfusion/ej2-angular-charts';

@Component({
  imports: [ChartModule],
  providers: [ CategoryService, DateTimeService, ColumnSeriesService],
  standalone: true,
  selector: 'app-chart',
  template: `
    <button (click)="exportToExcel('XLSX')">Export to Excel</button>
    <button (click)="exportToExcel('CSV')">Export to CSV</button>
    
    <ejs-chart #chart (beforeExport)='onBeforeExport($event)'>
    </ejs-chart>
  `
})
export class ExcelExportComponent {
  @ViewChild('chart') chart: ChartComponent;
  
  exportToExcel(type: 'XLSX' | 'CSV'): void {
    this.chart.export(type, 'ChartData');
  }
  
  onBeforeExport(args: IExportEventArgs): void {
    if (args.type === 'XLSX' || args.type === 'CSV') {
      // Customize Excel export
      args.excelProperties = {
        header: {
          headerRows: 2,
          rows: [
            {
              cells: [
                {
                  colSpan: 4,
                  value: 'Sales Report 2024',
                  style: { fontSize: 20, bold: true }
                }
              ]
            },
            {
              cells: [
                { value: 'Generated on: ' + new Date().toLocaleDateString() }
              ]
            }
          ]
        },
        footer: {
          footerRows: 1,
          rows: [
            {
              cells: [
                { value: '© 2024 Company Name' }
              ]
            }
          ]
        }
      };
    }
  }
}
```

**Custom Excel Formatting:**

```typescript
onBeforeExport(args: IExportEventArgs): void {
  if (args.type === 'XLSX') {
    args.excelProperties = {
      dataSource: this.customDataFormat(),
      columns: [
        { field: 'month', headerText: 'Month', width: 120 },
        { field: 'sales', headerText: 'Sales ($)', width: 150 },
        { field: 'growth', headerText: 'Growth (%)', width: 120 }
      ],
      header: {
        headerRows: 3,
        rows: [
          { cells: [{ value: 'Annual Report', style: { fontSize: 24, bold: true } }] },
          { cells: [{ value: 'Fiscal Year 2024' }] },
          { cells: [{ value: '' }] }  // Empty row for spacing
        ]
      }
    };
  }
}

customDataFormat(): any[] {
  return this.chartData.map(item => ({
    month: item.x,
    sales: item.y,
    growth: this.calculateGrowth(item)
  }));
}
```

### Base64 Export

Export chart as base64 string for embedding or transmission:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ChartModule, ChartComponent } from '@syncfusion/ej2-angular-charts';
import { Component } from '@angular/core';
import { CategoryService, DateTimeService, ColumnSeriesService, LegendService } from '@syncfusion/ej2-angular-charts';

@Component({
  imports: [ChartModule],
  providers: [ CategoryService, DateTimeService, ColumnSeriesService],
  standalone: true,
  selector: 'app-chart',
  template: `
    <button (click)="getBase64()">Get Base64</button>
    <img [src]="base64Image" *ngIf="base64Image" />
    
    <ejs-chart #chart id="chartContainer">
    </ejs-chart>
  `
})
export class Base64ExportComponent {
  @ViewChild('chart') chart: ChartComponent;
  public base64Image: string;
  
  getBase64(): void {
    let chartElement = document.getElementById('chartContainer');
    let canvas = document.createElement('canvas');
    let svg = chartElement.querySelector('svg');
    
    if (svg) {
      let serializer = new XMLSerializer();
      let svgString = serializer.serializeToString(svg);
      
      canvas.width = svg.clientWidth;
      canvas.height = svg.clientHeight;
      
      let ctx = canvas.getContext('2d');
      let img = new Image();
      
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        this.base64Image = canvas.toDataURL('image/png');
        console.log('Base64:', this.base64Image);
        
        // Can now send to server or embed
        this.sendToServer(this.base64Image);
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
    }
  }
  
  sendToServer(base64: string): void {
    this.http.post('/api/save-chart', { image: base64 }).subscribe();
  }
}
```

## Print Functionality

Print charts directly from the browser:

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { Component } from '@angular/core';
import { CategoryService, ChartComponent, DateTimeService, ColumnSeriesService, LegendService } from '@syncfusion/ej2-angular-charts';

@Component({
  imports: [ChartModule],
  providers: [ CategoryService, DateTimeService, ColumnSeriesService],
  standalone: true,
  selector: 'app-chart',
  template: `
    <button (click)="printChart()">Print Chart</button>
    <button (click)="printMultiple()">Print All Charts</button>
    
    <ejs-chart #chart1 id="chart1" (beforePrint)='onBeforePrint($event)'>
    </ejs-chart>
    
    <ejs-chart #chart2 id="chart2">
    </ejs-chart>
  `
})
export class PrintChartComponent {
  @ViewChild('chart1') chart1: ChartComponent;
  @ViewChild('chart2') chart2: ChartComponent;
  
  printChart(): void {
    this.chart1.print();
  }
  
  printMultiple(): void {
    this.chart1.print(['chart1', 'chart2']);
  }
  
  onBeforePrint(args: IPrintEventArgs): void {
    // Customize print content
    console.log('Printing chart...');
    
    // Add custom header
    let header = document.createElement('div');
    header.innerHTML = '<h1>Sales Report</h1><p>Printed on: ' + new Date().toLocaleDateString() + '</p>';
    args.htmlContent.prepend(header);
  }
}
```

**Print with Custom Styling:**

```typescript
printWithStyles(): void {
  // Inject print styles
  let style = document.createElement('style');
  style.innerHTML = `
    @media print {
      @page {
        size: landscape;
        margin: 2cm;
      }
      .e-chart {
        page-break-inside: avoid;
      }
      .no-print {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(style);
  
  this.chart.print();
  
  // Clean up
  setTimeout(() => {
    document.head.removeChild(style);
  }, 1000);
}
```

## Render Methods

### SVG Rendering

SVG is the default rendering mode. Best for:
- Accessibility (DOM-based)
- Crisp vector output
- Small to moderate datasets
- Interactive features

```typescript
<ejs-chart>
  <!-- SVG rendering (default) -->
</ejs-chart>
```

**SVG Advantages:**
- Scalable without quality loss
- CSS and animation support
- Easy DOM manipulation
- Better accessibility

### Canvas Rendering

Enable canvas for better performance with large datasets:

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { Component } from '@angular/core';
import { CategoryService, DateTimeService, ColumnSeriesService, LegendService } from '@syncfusion/ej2-angular-charts';
import { largeDataset } from './datasource';

@Component({
  imports: [ChartModule],
  providers: [ CategoryService, DateTimeService, ColumnSeriesService],
  standalone: true,
  selector: 'app-chart',
  template: `
    <ejs-chart [enableCanvas]='true'>
      <e-series-collection>
        <e-series [dataSource]='largeDataset'></e-series>
      </e-series-collection>
    </ejs-chart>
  `
})
export class CanvasChartComponent {
  public largeDataset: Object[] = this.generateLargeDataset(50000);
  
  generateLargeDataset(count: number): Object[] {
    let data = [];
    for (let i = 0; i < count; i++) {
      data.push({ x: i, y: Math.random() * 100 });
    }
    return data;
  }
}
```

**When to Use Canvas:**
- Datasets > 5,000 points
- High-frequency updates
- Limited device resources
- Real-time data streaming

**Canvas Limitations:**
- No native tooltips (requires custom implementation)
- Limited animation support
- Lower accessibility
- Cannot export as SVG

**Performance Comparison:**

```typescript
export class RenderComparisonComponent {
  testPerformance(): void {
    // Test SVG
    let svgStart = performance.now();
    this.renderSVGChart(this.largeData);
    let svgTime = performance.now() - svgStart;
    
    // Test Canvas
    let canvasStart = performance.now();
    this.renderCanvasChart(this.largeData);
    let canvasTime = performance.now() - canvasStart;
    
    console.log('SVG render time:', svgTime, 'ms');
    console.log('Canvas render time:', canvasTime, 'ms');
    console.log('Performance gain:', ((svgTime - canvasTime) / svgTime * 100).toFixed(2), '%');
  }
}
```

## Module Injection

Inject feature modules as needed to reduce bundle size:

```typescript
import { Component } from '@angular/core';
import { 
  ChartModule, 
  LineSeriesService,
  ColumnSeriesService,
  CategoryService,
  LegendService,
  TooltipService,
  DataLabelService,
  ZoomService,
  ScrollBarService,
  DateTimeService
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [ChartModule],
  providers: [
    LineSeriesService,
    ColumnSeriesService,
    CategoryService,
    LegendService,
    TooltipService,
    DataLabelService,
    ZoomService,
    ScrollBarService,
    DateTimeService
  ],
  template: `<ejs-chart></ejs-chart>`
})
export class ChartComponent {}
```

**Available Services:**

| Service | Feature |
|---------|---------|
| LineSeriesService | Line chart |
| ColumnSeriesService | Column chart |
| AreaSeriesService | Area chart |
| BarSeriesService | Bar chart |
| StackingColumnSeriesService | Stacked column |
| StackingAreaSeriesService | Stacked area |
| ScatterSeriesService | Scatter chart |
| SplineSeriesService | Spline chart |
| CategoryService | Category axis |
| DateTimeService | DateTime axis |
| LogarithmicService | Logarithmic axis |
| LegendService | Legend |
| TooltipService | Tooltip |
| DataLabelService | Data labels |
| ZoomService | Zooming |
| ScrollBarService | Scrollbar |
| SelectionService | Selection |
| CrosshairService | Crosshair |
| ExportService | Export functionality |

## Animation Control

Fine-tune chart animations:

```typescript
export class AnimationComponent {
  // Global animation settings
  public animation: Object = {
    enable: true,
    duration: 1500,
    delay: 100
  };
  
  // Per-series animation
  public series1Animation: Object = {
    enable: true,
    duration: 1000,
    delay: 0
  };
  
  public series2Animation: Object = {
    enable: true,
    duration: 1200,
    delay: 400  // Staggered animation
  };
  
  // Disable for performance
  disableAnimation(): void {
    this.animation = { enable: false };
    this.chart.refresh();
  }
  
  // Custom animation sequence
  animateSequence(): void {
    this.chart.series.forEach((series, index) => {
      setTimeout(() => {
        series.animation.enable = true;
        series.animation.duration = 800;
        this.chart.refresh();
      }, index * 300);
    });
  }
}
```

## Selection and Highlighting

Enable data point and series selection:

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { Component } from '@angular/core';
import { CategoryService, DateTimeService, ColumnSeriesService, LegendService, SelectionService } from '@syncfusion/ej2-angular-charts';
import { ISelectionCompleteEventArgs } from '@syncfusion/ej2-charts';

@Component({
  imports: [ChartModule],
  providers: [ CategoryService, DateTimeService, ColumnSeriesService, LegendService, SelectionService],
  standalone: true,
  selector: 'app-chart',
  template: `
    <ejs-chart 
      [selectionMode]='selectionMode'
      (selectionComplete)='onSelectionComplete($event)'>
      <e-series-collection>
        <e-series 
          [dataSource]='data'
          [selectionStyle]='selectionStyle'>
        </e-series>
      </e-series-collection>
    </ejs-chart>
  `
})
export class SelectionComponent {
  public selectionMode: string = 'Point';  // Point, Series, Cluster, DragXY, DragX, DragY
  
  public selectionStyle: string = 'chartSelection1';  // CSS class
  
  onSelectionComplete(args: ISelectionCompleteEventArgs): void {
    console.log('Selected:', args.selectedDataValues);
    
    // Process selected data
    this.processSelection(args.selectedDataValues);
  }
  
  processSelection(selectedData: any[]): void {
    // Calculate statistics
    let total = selectedData.reduce((sum, item) => sum + item.y, 0);
    let average = total / selectedData.length;
    
    console.log('Selection total:', total);
    console.log('Selection average:', average);
  }
}
```

## Zooming and Panning

Enable interactive zooming and panning:

```typescript
export class ZoomChartComponent {
  public zoomSettings: Object = {
    enableSelectionZooming: true,
    enablePinchZooming: true,
    enableMouseWheelZooming: true,
    enableDeferredZooming: false,
    enableScrollbar: true,
    enablePan: true,
    mode: 'XY',  // X, Y, or XY
    showToolbar: true,
    toolbarItems: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset']
  };
  
  // Programmatic zoom
  zoomToRange(): void {
    this.chart.zoomModule.zoomByRange(
      this.chart.primaryXAxis,
      new Date(2024, 0, 1),  // Start
      new Date(2024, 5, 30)  // End
    );
  }
  
  // Reset zoom
  resetZoom(): void {
    this.chart.zoomModule.reset();
  }
}
```

## Crosshair and Trackball

Display crosshair or trackball for precise data reading:

```typescript
export class CrosshairComponent {
  public crosshair: Object = {
    enable: true,
    line: {
      width: 2,
      color: '#FF0000'
    },
    lineType: 'Vertical'  // Both, Horizontal, Vertical
  };
  
  public tooltip: Object = {
    enable: true,
    shared: true  // Show data from all series
  };
}
```

## Synchronized Charts

Synchronize interactions across multiple charts:

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { Component } from '@angular/core';
import { CategoryService, DateTimeService, ChartComponent, ColumnSeriesService, LegendService } from '@syncfusion/ej2-angular-charts';
import { IMouseEventArgs } from '@syncfusion/ej2-charts';

@Component({
  imports: [ChartModule],
  providers: [ CategoryService, DateTimeService, ColumnSeriesService],
  standalone: true,
  selector: 'app-chart',
  template: `
    <ejs-chart #chart1 
      (chartMouseMove)='synchronizeCharts($event)'
      (chartMouseLeave)='hideTooltips()'>
    </ejs-chart>
    
    <ejs-chart #chart2>
    </ejs-chart>
  `
})
export class SynchronizedChartsComponent {
  @ViewChild('chart1') chart1: ChartComponent;
  @ViewChild('chart2') chart2: ChartComponent;
  
  synchronizeCharts(args: IMouseEventArgs): void {
    if (args.target.includes('Series')) {
      let xValue = args.axisData.primaryXAxis;
      
      // Show tooltips on both charts
      this.showTooltipAtX(this.chart2, xValue);
    }
  }
  
  showTooltipAtX(chart: ChartComponent, xValue: any): void {
    // Implementation to show tooltip
  }
  
  hideTooltips(): void {
    this.chart2.hideTooltip();
  }
}
```

## Best Practices

1. **Event Handler Performance:**
```typescript
// Debounce frequent events
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

private mouseMoveSubject = new Subject<IMouseEventArgs>();

ngOnInit() {
  this.mouseMoveSubject.pipe(
    debounceTime(100)
  ).subscribe(args => {
    this.handleMouseMove(args);
  });
}

onChartMouseMove(args: IMouseEventArgs): void {
  this.mouseMoveSubject.next(args);
}
```

2. **Efficient Export:**
```typescript
// Cache export settings
private exportConfig = {
  type: 'PNG',
  width: 1920,
  height: 1080
};

exportOptimized(): void {
  this.chart.export(
    this.exportConfig.type,
    'chart',
    null,
    null,
    this.exportConfig.width,
    this.exportConfig.height
  );
}
```

3. **Memory Management:**
```typescript
ngOnDestroy() {
  // Clear event listeners
  this.subscriptions.forEach(sub => sub.unsubscribe());
  
  // Destroy chart
  if (this.chart) {
    this.chart.destroy();
  }
}
```

## Advanced Patterns

### Pattern 1: Event-Driven Updates

```typescript
export class EventDrivenChart {
  private dataUpdateSubject = new Subject<any[]>();
  
  ngOnInit() {
    this.dataUpdateSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(data => {
      this.chart.series[0].setData(data);
    });
  }
  
  updateData(newData: any[]): void {
    this.dataUpdateSubject.next(newData);
  }
}
```

### Pattern 2: Conditional Export

```typescript
onBeforeExport(args: IExportEventArgs): void {
  // Check data quality
  if (!this.validateDataQuality()) {
    args.cancel = true;
    this.showWarning('Data quality check failed');
    return;
  }
  
  // Add watermark for drafts
  if (this.isDraft) {
    args.chart.annotations = [{
      content: '<div style="opacity:0.3">DRAFT</div>',
      x: '50%',
      y: '50%',
      coordinateUnits: 'Pixel'
    }];
  }
}
```

## Troubleshooting

### Export Not Working

**Issue:** Export function not available
**Solutions:**
- Import ExportService in providers
- Verify chart is fully loaded
- Check browser compatibility
- Ensure CORS for remote images

### Events Not Firing

**Issue:** Event handlers not called
**Solutions:**
- Verify event name spelling
- Check event is supported by chart type
- Ensure proper binding syntax
- Test in loaded event

### Performance Issues

**Issue:** Slow rendering with events
**Solutions:**
- Debounce frequent events
- Use Canvas rendering
- Minimize DOM manipulation in handlers
- Profile with Chrome DevTools

## API Reference Summary

### Event Interfaces

| Event | Interface | Description | API Reference |
|-------|-----------|-------------|---------------|
| load | ILoadedEventArgs | Before chart loads | [ILoadedEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iLoadedEventArgs) |
| loaded | ILoadedEventArgs | After chart loads | [ILoadedEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iLoadedEventArgs) |
| pointRender | IPointRenderEventArgs | Before point rendering | [IPointRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iPointRenderEventArgs) |
| seriesRender | ISeriesRenderEventArgs | Before series rendering | [ISeriesRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iSeriesRenderEventArgs) |
| axisLabelRender | IAxisLabelRenderEventArgs | Before axis label rendering | [IAxisLabelRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iAxisLabelRenderEventArgs) |
| legendRender | ILegendRenderEventArgs | Before legend rendering | [ILegendRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iLegendRenderEventArgs) |
| tooltipRender | ITooltipRenderEventArgs | Before tooltip rendering | [ITooltipRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iTooltipRenderEventArgs) |
| pointClick | IPointEventArgs | Point click | [IPointEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iPointEventArgs) |
| chartMouseClick | IMouseEventArgs | Chart click | [IMouseEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iMouseEventArgs) |
| chartMouseMove | IMouseEventArgs | Mouse move | [IMouseEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iMouseEventArgs) |
| beforeExport | IExportEventArgs | Before export | [IExportEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iExportEventArgs) |
| afterExport | IExportEventArgs | After export | [IExportEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iExportEventArgs) |
| beforePrint | IPrintEventArgs | Before print | [IPrintEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iPrintEventArgs) |
| animationComplete | IAnimationCompleteEventArgs | After animation | [IAnimationCompleteEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iAnimationCompleteEventArgs) |

**All Event Interfaces:** See [ChartModel](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel) for complete event list (40+ events)

### Export and Print

| API | Description | Documentation |
|-----|-------------|---------------|
| ExportType | Export format enum (PNG, JPEG, SVG, PDF) | [exportType.md](https://ej2.syncfusion.com/angular/documentation/api/chart/exportType) |
| Export | Export utility class | [export.md](https://ej2.syncfusion.com/angular/documentation/api/chart/export) |
| PrintUtils | Print utility functions | [printUtils.md](https://ej2.syncfusion.com/angular/documentation/api/chart/printUtils) |
| IExportEventArgs | Export event interface | [iExportEventArgs.md](https://ej2.syncfusion.com/angular/documentation/api/chart/iExportEventArgs) |
| IPrintEventArgs | Print event interface | [iPrintEventArgs.md](https://ej2.syncfusion.com/angular/documentation/api/chart/iPrintEventArgs) |
| IPDFArgs | PDF export arguments | [iPDFArgs.md](https://ej2.syncfusion.com/angular/documentation/api/chart/iPDFArgs) |

### Rendering and Performance

| Property | Type | Description | API Reference |
|----------|------|-------------|---------------|
| enableCanvas | boolean | Enable canvas rendering | [ChartModel.enableCanvas](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#enableCanvas) |
| enableAnimation | boolean | Enable animations | [ChartModel.enableAnimation](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel#enableAnimation) |
| animation | AnimationModel | Animation configuration | [AnimationModel](https://ej2.syncfusion.com/angular/documentation/api/chart/animationModel) |

### Selection and Highlight

| API | Description | Documentation |
|-----|-------------|---------------|
| SelectionMode | Selection mode enum (Point, Series, Cluster, DragXY, etc.) | [selectionMode.md](https://ej2.syncfusion.com/angular/documentation/api/chart/selectionMode) |
| SelectionPattern | Selection pattern enum | [selectionPattern.md](https://ej2.syncfusion.com/angular/documentation/api/chart/selectionPattern) |
| HighlightMode | Highlight mode enum | [highlightMode.md](https://ej2.syncfusion.com/angular/documentation/api/chart/highlightMode) |
| Highlight | Highlight settings | [highlight.md](https://ej2.syncfusion.com/angular/documentation/api/chart/highlight) |
| Selection | Selection settings | [selection.md](https://ej2.syncfusion.com/angular/documentation/api/chart/selection) |
| ISelectionCompleteEventArgs | Selection complete event | [iSelectionCompleteEventArgs.md](https://ej2.syncfusion.com/angular/documentation/api/chart/iSelectionCompleteEventArgs) |

### Chart Methods

| Method | Description | API Reference |
|--------|-------------|---------------|
| export() | Export chart to image/PDF | [ChartModel](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel) |
| print() | Print chart | [ChartModel](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel) |
| refresh() | Refresh chart rendering | [ChartModel](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel) |
| destroy() | Destroy chart instance | [ChartModel](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel) |

### Animation Configuration

| API | Description | Documentation |
|-----|-------------|---------------|
| AnimationModel | Animation configuration interface | [animationModel.md](https://ej2.syncfusion.com/angular/documentation/api/chart/animationModel) |
| Animation | Animation class | [animation.md](https://ej2.syncfusion.com/angular/documentation/api/chart/animation) |

### Drag Settings

| API | Description | Documentation |
|-----|-------------|---------------|
| DragSettingsModel | Drag configuration interface | [dragSettingsModel.md](https://ej2.syncfusion.com/angular/documentation/api/chart/dragSettingsModel) |
| DragSettings | Drag settings class | [dragSettings.md](https://ej2.syncfusion.com/angular/documentation/api/chart/dragSettings) |
| IDragCompleteEventArgs | Drag complete event | [iDragCompleteEventArgs.md](https://ej2.syncfusion.com/angular/documentation/api/chart/iDragCompleteEventArgs) |

### All Chart Events

Complete list of events available in [ChartModel](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel):

**Lifecycle Events:** load, loaded, animationComplete
**Rendering Events:** seriesRender, pointRender, axisLabelRender, legendRender, textRender, annotationRender
**Interaction Events:** pointClick, pointDoubleClick, pointMove, chartMouseClick, chartMouseMove, chartMouseDown, chartMouseUp, chartMouseLeave, chartDoubleClick
**Feature Events:** tooltipRender, sharedTooltipRender, legendClick, axisLabelClick, multiLevelLabelClick
**Zoom Events:** onZooming, zoomComplete
**Scroll Events:** scrollStart, scrollEnd, scrollChanged
**Selection Events:** selectionComplete
**Drag Events:** drag, dragStart, dragEnd, dragComplete
**Export/Print Events:** beforeExport, afterExport, beforePrint
**Resize Events:** beforeResize, resized
**Data Events:** axisRangeCalculated

---
