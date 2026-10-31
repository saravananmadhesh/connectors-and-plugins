# Print and Export

Export 3D charts as images or PDFs, and enable printing functionality.

## Table of Contents

- [Export Formats](#export-formats)
  - [Export as Image](#export-as-image)
- [Export Configuration](#export-configuration)
  - [Export with Custom Filename](#export-with-custom-filename)
  - [Export with Size Options](#export-with-size-options)
- [Print Functionality](#print-functionality)
  - [Basic Print](#basic-print)
  - [Print with Title](#print-with-title)
- [Export Events](#export-events)
  - [Handle Export Completion](#handle-export-completion)
- [Common Export Patterns](#common-export-patterns)
  - [Pattern 1: Export with Multiple Formats](#pattern-1-export-with-multiple-formats)
  - [Pattern 2: Batch Export Multiple Charts](#pattern-2-batch-export-multiple-charts)
  - [Pattern 3: Export with Metadata](#pattern-3-export-with-metadata)
- [Export Format Guidelines](#export-format-guidelines)
  - [PNG Export](#png-export)
  - [SVG Export](#svg-export)
  - [PDF Export](#pdf-export)
- [Print Considerations](#print-considerations)
  - [Print-Friendly Styling](#print-friendly-styling)
  - [Print Multiple Pages](#print-multiple-pages)
- [Mobile Export Considerations](#mobile-export-considerations)
- [Performance Notes](#performance-notes)
- [Accessibility in Exports](#accessibility-in-exports)

## Export Formats

### Export as Image

Export chart as PNG, SVG, or PDF:

```typescript
import { Component, ViewChild } from '@angular/core';
import { Chart3DAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-print-export',
  standalone: true,
  imports: [Chart3DAllModule],
  template: `
    <div>
      <button (click)="exportPNG()">Export as PNG</button>
      <button (click)="exportSVG()">Export as SVG</button>
      <button (click)="exportPDF()">Export as PDF</button>
      <button (click)="printChart()">Print</button>
      
      <ejs-chart3d #chart [primaryXAxis]='primaryXAxis'>
        <e-chart3d-series-collection>
          <e-chart3d-series [dataSource]="data" xName="x" yName="y" type="Column">
          </e-chart3d-series>
        </e-chart3d-series-collection>
      </ejs-chart3d>
    </div>
  `
})
export class PrintExportComponent {
  @ViewChild('chart') chart!: Chart3DComponent;

  primaryXAxis = {
        valueType: 'Category'
  }

  data = [
    { x: 'A', y: 40 },
    { x: 'B', y: 50 }
  ];

  exportPNG() {
    this.chart.export('PNG', 'chart');
  }

  exportSVG() {
    this.chart.export('SVG', 'chart');
  }

  exportPDF() {
    this.chart.export('PDF', 'chart');
  }

  printChart() {
    this.chart.print();
  }
}
```

## Export Configuration

### Export with Custom Filename

```typescript
exportPNG() {
  this.chart.export('PNG', 'sales-chart-2024');  // Creates 'sales-chart-2024.png'
}

exportPDF() {
  this.chart.export('PDF', 'quarterly-report');  // Creates 'quarterly-report.pdf'
}
```

### Export with Size Options

```typescript
@Component({
  template: `
    <ejs-chart3d #chart [width]="'1000px'" [height]="'600px'" [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="x" yName="y" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class CustomSizeExportComponent {
  @ViewChild('chart') chart!: Chart3DComponent;

  primaryXAxis = {
        valueType: 'Category'
  }

  data = [{ x: 'A', y: 40 }];

  exportHighResolution() {
    // Export at current size
    this.chart.export('PNG', 'chart-hires');
  }
}
```

## Print Functionality

### Basic Print

```typescript
printChart() {
  this.chart.print();
}
```

### Print with Title

```typescript
@Component({
  template: `
    <div #printArea>
      <h2>Sales Report - Q1 2024</h2>
      <ejs-chart3d #chart [primaryXAxis]='primaryXAxis'>
        <e-chart3d-series-collection>
          <e-chart3d-series [dataSource]="data" xName="x" yName="y" type="Column">
          </e-chart3d-series>
        </e-chart3d-series-collection>
      </ejs-chart3d>
    </div>
    <button (click)="printWithTitle()">Print Report</button>
  `
})
export class PrintWithTitleComponent {
  @ViewChild('chart') chart!: Chart3DComponent;
  data = [{ x: 'A', y: 40 }];

  primaryXAxis = {
        valueType: 'Category'
  }

  printWithTitle() {
    this.chart.print();
  }
}
```

## Export Events

### Handle Export Completion

```typescript
@Component({
  template: `
    <ejs-chart3d 
      #chart [primaryXAxis]='primaryXAxis'
      (beforePrint)="onBeforeExport($event)"
      (afterExport)="onAfterExport($event)">
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="x" yName="y" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class ExportEventComponent {
  @ViewChild('chart') chart!: Chart3DComponent;
  primaryXAxis = {
        valueType: 'Category'
  }

  data = [{ x: 'A', y: 40 }];

  onBeforeExport(args: any) {
    console.log('Export starting...', args);
  }

  onAfterExport(args: any) {
    console.log('Export completed!', args);
  }
}
```

## Common Export Patterns

### Pattern 1: Export with Multiple Formats

Create buttons for different formats:

```typescript
@Component({
  template: `
    <div>
      <div style="margin-bottom: 20px;">
        <button (click)="exportPNG()">📥 PNG Image</button>
        <button (click)="exportSVG()">📥 SVG Vector</button>
        <button (click)="exportPDF()">📥 PDF Document</button>
        <button (click)="printChart()">🖨️ Print</button>
      </div>
      
      <ejs-chart3d #chart [primaryXAxis]='primaryXAxis'>
        <e-chart3d-series-collection>
          <e-chart3d-series [dataSource]="data" xName="x" yName="y" type="Column">
          </e-chart3d-series>
        </e-chart3d-series-collection>
      </ejs-chart3d>
    </div>
  `
})
export class ExportButtonsComponent {
  @ViewChild('chart') chart!: Chart3DComponent;
  data = [{ x: 'A', y: 40 }];

  primaryXAxis = {
        valueType: 'Category'
  }

  exportPNG() {
    const timestamp = new Date().toISOString().split('T')[0];
    this.chart.export('PNG', `chart-${timestamp}`);
  }

  exportSVG() {
    this.chart.export('SVG', `chart-${Date.now()}`);
  }

  exportPDF() {
    this.chart.export('PDF', `chart-report`);
  }

  printChart() {
    this.chart.print();
  }
}
```

### Pattern 2: Batch Export Multiple Charts

```typescript
@Component({
  template: `
    <div>
      <button (click)="exportAll()">Export All Charts</button>
      
      <div>
        <h3>Chart 1</h3>
        <ejs-chart3d #chart1 [primaryXAxis]='primaryXAxis'>
          <e-chart3d-series-collection>
            <e-chart3d-series [dataSource]="data1" xName="x" yName="y" type="Column">
            </e-chart3d-series>
          </e-chart3d-series-collection>
        </ejs-chart3d>
      </div>
      
      <div>
        <h3>Chart 2</h3>
        <ejs-chart3d #chart2 [primaryXAxis]='primaryXAxis'>
          <e-chart3d-series-collection>
            <e-chart3d-series [dataSource]="data2" xName="x" yName="y" type="Column">
            </e-chart3d-series>
          </e-chart3d-series-collection>
        </ejs-chart3d>
      </div>
    </div>
  `
})
export class BatchExportComponent {
  @ViewChild('chart1') chart1!: Chart3DComponent;
  @ViewChild('chart2') chart2!: Chart3DComponent;

  primaryXAxis = {
        valueType: 'Category'
  }

  data1 = [{ x: 'A', y: 40 }];
  data2 = [{ x: 'B', y: 50 }];

  exportAll() {
    this.chart1.export('PNG', 'chart-1');
    setTimeout(() => {
      this.chart2.export('PNG', 'chart-2');
    }, 500);
  }
}
```

### Pattern 3: Export with Metadata

Add context when exporting:

```typescript
exportWithMetadata() {
  const timestamp = new Date().toLocaleString();
  const filename = `sales-chart-${timestamp.split(' ')[0]}`;
  this.chart.export('PDF', filename);
  
  // Log export
  console.log(`Exported: ${filename}`);
}
```

## Export Format Guidelines

| Format | Use Case | Quality |
|--------|----------|---------|
| **PNG** | Web, presentations | Raster, lossy |
| **SVG** | Web, scaling | Vector, lossless |
| **PDF** | Reports, printing | Document, portable |

### PNG Export

- Best for: Web display, screenshots
- Quality: Good for most uses
- Size: Smaller file size

### SVG Export

- Best for: Scaling to any size
- Quality: Crisp at any resolution
- Size: Larger file size, scalable

### PDF Export

- Best for: Reports, documents
- Quality: High quality, printable
- Size: Depends on complexity

## Print Considerations

### Print-Friendly Styling

```css
@media print {
  .no-print {
    display: none;
  }
  
  .e-chart3d {
    page-break-inside: avoid;
  }
}
```

### Print Multiple Pages

```typescript
printMultipleCharts() {
  const printWindow = window.open('', '', 'height=600,width=800');
  if (printWindow) {
    printWindow.document.write('<html><body>');
    printWindow.document.write('<h1>Report</h1>');
    
    // Add charts
    this.chart1.print();
    this.chart2.print();
    
    printWindow.document.write('</body></html>');
    printWindow.print();
  }
}
```

## Mobile Export Considerations

- SVG: Best for responsive scaling
- PNG: Ensure sufficient resolution
- PDF: May be constrained by screen size

## Performance Notes

- Export operations are CPU-intensive
- Disable animations before export for faster processing
- Large charts may take longer to export
- Consider compression for PNG files

## Accessibility in Exports

- Exported files should maintain readability
- Use high contrast for printing
- Include alt text in PDFs when possible
- Test exported files for accessibility
