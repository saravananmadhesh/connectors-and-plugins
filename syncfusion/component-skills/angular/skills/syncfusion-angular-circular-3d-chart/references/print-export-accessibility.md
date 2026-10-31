# Print, Export & Accessibility

## Table of Contents

- [Export Charts](#export-charts)
  - [Export to PNG](#export-to-png)
  - [Export to SVG](#export-to-svg)
  - [Export to PDF](#export-to-pdf)
  - [Export Options](#export-options)
  - [Batch Export](#batch-export)
- [Print Functionality](#print-functionality)
  - [Enable Print Button](#enable-print-button)
  - [Print Multiple Elements](#print-multiple-elements)
  - [Print Styling](#print-styling)
- [Accessibility Guidelines](#accessibility-guidelines)
  - [WCAG 2.1 Compliance](#wcag-21-compliance)
- [Keyboard Navigation](#keyboard-navigation)
  - [Enable Tab Navigation](#enable-tab-navigation)
  - [Keyboard Shortcuts](#keyboard-shortcuts)
- [ARIA Support](#aria-support)
- [Screen Reader Optimization](#screen-reader-optimization)
  - [Data Table Fallback](#data-table-fallback)
  - [Descriptive Titles and Labels](#descriptive-titles-and-labels)
- [Troubleshooting](#troubleshooting)

---

## Export Charts

### Export to PNG

Export the chart as a PNG image:

```typescript
import { Component, ViewChild } from '@angular/core';
import { CircularChart3DAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-export-png',
  standalone: true,
  imports: [CircularChart3DAllModule],
  template: `
    <div>
      <button (click)="exportChart()">Export as PNG</button>
      <ejs-circularchart3d id="chart" #chart>
        <e-circularchart3d-series-collection>
          <e-circularchart3d-series 
            [dataSource]="chartData" 
            xName="x" 
            yName="y" 
            type="Pie">
          </e-circularchart3d-series>
        </e-circularchart3d-series-collection>
      </ejs-circularchart3d>
    </div>
  `,
  styles: [`
    button {
      padding: 10px 20px;
      margin-bottom: 20px;
      background-color: #5DADE2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #4A9FBE;
    }
  `]
})
export class ExportPNGComponent {
  @ViewChild('chart')
  chart!: CircularChart3DComponent;

  chartData = [
    { x: 'Product A', y: 35 },
    { x: 'Product B', y: 25 },
    { x: 'Product C', y: 40 }
  ];

  exportChart() {
    this.chart.export('PNG', 'sales-chart');
  }
}
```

### Export to SVG

Export as scalable vector graphics:

```typescript
export class ExportSVGComponent {
  @ViewChild('chart')
  chart!: CircularChart3DComponent;

  exportToSVG() {
    this.chart.export('SVG', 'sales-chart');
  }
}
```

### Export to PDF

Export as PDF document:

```typescript
export class ExportPDFComponent {
  @ViewChild('chart')
  chart!: CircularChart3DComponent;

  exportToPDF() {
    this.chart.export('PDF', 'sales-chart');
  }
}
```

### Export Options

Configure export behavior:

```typescript
@Component({
  template: `
    <div>
      <select (change)="selectedFormat = $event.target.value">
        <option value="PNG">PNG</option>
        <option value="SVG">SVG</option>
        <option value="PDF">PDF</option>
      </select>
      <input 
        type="text" 
        [(ngModel)]="fileName" 
        placeholder="Enter file name">
      <button (click)="exportChart()">Export</button>
    </div>
  `
})
export class ExportOptionsComponent {
  @ViewChild('chart')
  chart!: CircularChart3DComponent;

  selectedFormat = 'PNG';
  fileName = 'chart';

  exportChart() {
    // Export with specific filename
    this.chart.export(this.selectedFormat, this.fileName);
  }
}
```

### Batch Export

Export multiple charts at once:

```typescript
@Component({
  template: `
    <button (click)="exportAll()">Export All Charts</button>
    <div #charts></div>
  `
})
export class BatchExportComponent {
  @ViewChild('charts', { read: any })
  chartsContainer!: any;

  async exportAll() {
    const charts = this.chartsContainer.querySelectorAll('.chart-export');
    
    for (let i = 0; i < charts.length; i++) {
      // Get chart instance and export
      await new Promise(resolve => {
        setTimeout(() => {
          charts[i].ej2_instances[0].export('PNG', `chart-${i}`);
          resolve(null);
        }, 500);
      });
    }
  }
}
```

---

## Print Functionality

### Enable Print Button

Add print capability to charts:

```typescript
import { Component, ViewChild } from '@angular/core';
import { CircularChart3DComponent } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-print-chart',
  standalone: true,
  imports: [CircularChart3DComponent],
  template: `
    <div>
      <button (click)="printChart()">Print Chart</button>
      <ejs-circularchart3d id="chart" #chart>
        <e-circularchart3d-series-collection>
          <e-circularchart3d-series 
            [dataSource]="chartData" 
            xName="category" 
            yName="value" 
            type="Pie">
          </e-circularchart3d-series>
        </e-circularchart3d-series-collection>
      </ejs-circularchart3d>
    </div>
  `
})
export class PrintChartComponent {
  @ViewChild('chart')
  chart!: CircularChart3DComponent;

  chartData = [
    { category: 'Q1', value: 25 },
    { category: 'Q2', value: 28 },
    { category: 'Q3', value: 22 },
    { category: 'Q4', value: 25 }
  ];

  printChart() {
    this.chart.print();
  }
}
```

### Print Multiple Elements

Print chart with additional content:

```typescript
@Component({
  template: `
    <div id="printable-content">
      <h1>Quarterly Sales Report</h1>
      <p>Generated: {{ currentDate | date }}</p>
      
      <ejs-circularchart3d id="chart" #chart style="display: block; margin: 20px 0;">
        ...
      </ejs-circularchart3d>
      
      <table>
        <tr>
          <th>Quarter</th>
          <th>Sales</th>
        </tr>
        <tr *ngFor="let item of chartData">
          <td>{{ item.category }}</td>
          <td>{{ item.value }}</td>
        </tr>
      </table>
    </div>
    <button (click)="printContent()">Print Report</button>
  `
})
export class PrintReportComponent {
  currentDate = new Date();
  chartData = [
    { category: 'Q1', value: 25 },
    { category: 'Q2', value: 28 }
  ];

  printContent() {
    const printWindow = window.open('', '', 'height=600,width=800');
    const content = document.getElementById('printable-content')?.innerHTML;
    
    printWindow!.document.write(`
      <html>
        <head>
          <title>Sales Report</title>
          <link rel="stylesheet" href="styles.css">
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);
    printWindow!.document.close();
    printWindow!.print();
  }
}
```

### Print Styling

Optimize chart appearance for printing:

```css
@media print {
  .no-print {
    display: none;
  }
  
  #chart {
    width: 100%;
    height: 500px;
    page-break-inside: avoid;
  }
  
  body {
    font-family: Arial, sans-serif;
    color: #000;
    background: #fff;
  }
}
```

---

## Accessibility Guidelines

### WCAG 2.1 Compliance

Ensure charts meet Web Content Accessibility Guidelines (WCAG 2.1):

**Level A:**
- Provide text alternatives for charts
- Ensure keyboard accessible
- Support color-blind users (don't rely on color alone)

**Level AA:**
- Maintain sufficient contrast ratio (4.5:1 for text)
- Support screen readers
- Provide descriptive labels

**Level AAA:**
- Enhanced contrast (7:1)
- Extended keyboard support
- Multiple ways to navigate

---

## Keyboard Navigation

### Enable Tab Navigation

Make chart interactive via keyboard:

```typescript
@Component({
  template: `
    <div (keydown)="onKeyDown($event)">
      <ejs-circularchart3d 
        id="chart"
        tabindex="0"
        [selectionMode]="'Point'"
        (pointRender)="onPointRender($event)">
        ...
      </ejs-circularchart3d>
    </div>
  `
})
export class KeyboardNavigationComponent {
  selectedPointIndex = 0;
  data: any[] = [];

  onKeyDown(event: KeyboardEvent) {
    switch(event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        this.selectNextPoint();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        this.selectPreviousPoint();
        break;
      case 'Enter':
        this.togglePointSelection();
        break;
    }
  }

  selectNextPoint() {
    this.selectedPointIndex = (this.selectedPointIndex + 1) % this.data.length;
  }

  selectPreviousPoint() {
    this.selectedPointIndex = (this.selectedPointIndex - 1 + this.data.length) % this.data.length;
  }

  togglePointSelection() {
    // Toggle selection state
  }

  onPointRender(args: any) {
    if (args.point.index === this.selectedPointIndex) {
      args.border = { width: 2, color: '#000' };
    }
  }
}
```

### Keyboard Shortcuts

Define custom keyboard shortcuts:

```typescript
@Component({
  template: `
    <div (keydown)="handleKeyboard($event)">
      <ejs-circularchart3d #chart>
        ...
      </ejs-circularchart3d>
    </div>
  `
})
export class KeyboardShortcutsComponent {
  @ViewChild('chart')
  chart!: CircularChart3DComponent;

  handleKeyboard(event: KeyboardEvent) {
    // Ctrl+S: Save/Export
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      this.chart.export('PNG', 'chart');
    }
    
    // Ctrl+P: Print
    if (event.ctrlKey && event.key === 'p') {
      event.preventDefault();
      this.chart.print();
    }
  }
}
```

---

## ARIA Support

The chart component uses appropriate ARIA attributes:

**Applied ARIA Roles:**
- `role="img"` - Chart container
- `role="button"` - Interactive elements (legend items)
- `role="region"` - Chart areas
- `role="status"` - Live announcements

**ARIA Attributes:**
- `aria-label` - Descriptive labels
- `aria-hidden` - Hide decorative elements
- `aria-pressed` - Toggle state for legend items
- `aria-describedby` - Additional descriptions
- `aria-live` - Dynamic content announcements

---

## Screen Reader Optimization

### Data Table Fallback

Provide data in table format for screen readers:

```typescript
@Component({
  template: `
    <div role="tablist">
      <!-- Chart visualization -->
      <div role="tab" aria-selected="true">
        <ejs-circularchart3d>
          ...
        </ejs-circularchart3d>
      </div>
      
      <!-- Text alternative -->
      <div role="tab" aria-selected="false">
        <table aria-label="Chart data">
          <thead>
            <tr>
              <th>Category</th>
              <th>Value</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of tableData">
              <td>{{ item.x }}</td>
              <td>{{ item.y }}</td>
              <td>{{ (item.y / totalValue * 100).toFixed(1) }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class ScreenReaderTableComponent {
  tableData = [
    { x: 'Product A', y: 35 },
    { x: 'Product B', y: 25 },
    { x: 'Product C', y: 40 }
  ];

  get totalValue() {
    return this.tableData.reduce((sum, item) => sum + item.y, 0);
  }
}
```

### Descriptive Titles and Labels

Use descriptive text for clarity:

```typescript
@Component({
  template: `
    <h2 id="chart-title">Sales Distribution by Region - Q4 2025</h2>
    <p id="chart-description">
      This chart shows sales performance across four regions:
      North (35%), South (28%), East (34%), West (32%)
    </p>
    
    <ejs-circularchart3d 
      title="Sales by Region"
      aria-labelledby="chart-title"
      aria-describedby="chart-description">
      ...
    </ejs-circularchart3d>
  `
})
export class DescriptiveLabelsComponent {}
```

---

## Troubleshooting

**Export not working?**
- Verify `ImageExport3DService` is provided
- Check browser console for errors
- Ensure chart container is rendered

**Print blank?**
- Verify print CSS is applied
- Check that chart is fully rendered before printing
- Use `page-break-inside: avoid` in CSS

**Screen reader not announcing?**
- Check aria-labels are present and descriptive
- Use aria-live regions for dynamic updates
- Provide text alternatives in HTML

---
