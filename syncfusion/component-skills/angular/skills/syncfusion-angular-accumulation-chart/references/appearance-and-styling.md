# Appearance and Styling

## Table of Contents
- [Color Palettes](#color-palettes)
- [Custom Colors](#custom-colors)
- [Themes](#themes)
- [Animation](#animation)
- [Gradients](#gradients)
- [Custom CSS Styling](#custom-css-styling)
- [Export and Print](#export-and-print)
- [Advanced Styling Examples](#advanced-styling-examples)

## Color Palettes

> ⚠️ **NG8002 Error — Do NOT use `[palette]` on `<ejs-accumulationchart>`**  
> In Angular strict template mode (`"strictTemplates": true` in `tsconfig.json`), binding
> `[palette]="myColors"` on the chart element triggers:  
> ```
> NG8002: Can't bind to 'palette' since it isn't a known property of 'ejs-accumulationchart'
> ```  
> **Use `pointColorMapping` on the series with a `fill` field in your data instead.**
> See [Custom Colors](#custom-colors) for the correct pattern.

### Built-in Theme Palettes

Apply Syncfusion's built-in color palettes via the `theme` attribute:

```html
<ejs-accumulationchart theme="Tailwind">
  <e-accumulation-series-collection>
    <e-accumulation-series [dataSource]="data" xName="x" yName="y">
    </e-accumulation-series>
  </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Available Theme Options

| Theme | Use Case | Style |
|-------|----------|-------|
| `Material` | Modern, professional | Material Design colors |
| `Bootstrap` | Web applications | Bootstrap palette |
| `Fabric` | Microsoft Office style | Fabric UI colors |
| `Bootstrap4` | Bootstrap 4 theme | Bootstrap 4 colors |
| `Tailwind` | Tailwind CSS | Tailwind palette |
| `Highcontrast` | Accessibility | High contrast colors |

### Apply Theme

```typescript
@Component({
  template: `
    <ejs-accumulationchart [theme]="selectedTheme">
      <e-accumulation-series-collection>
        <e-accumulation-series [dataSource]="data" xName="x" yName="y">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class ChartComponent {
  selectedTheme = 'Tailwind'; // Material, Bootstrap, Fabric, etc.
  data = [
    { x: 'A', y: 30 },
    { x: 'B', y: 25 }
  ];
}
```

## Custom Colors

There are two valid, strict-template-safe ways to apply custom colors to accumulation chart segments.

---

### Option A — `[palettes]` on the series (array of colors)

Pass a `string[]` to the `[palettes]` input on `<e-accumulation-series>`. Colors are
applied to points cyclically — the simplest approach when your data objects don't carry
color information:

```typescript
import { Component, OnInit } from '@angular/core';
import {
  AccumulationChartModule,
  PieSeriesService,
  AccumulationLegendService,
  AccumulationTooltipService,
  AccumulationDataLabelService,
  AccumulationAnnotationService
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [AccumulationChartModule],
  providers: [
    PieSeriesService, AccumulationLegendService, AccumulationTooltipService,
    AccumulationDataLabelService, AccumulationAnnotationService
  ],
  template: `
    <ejs-accumulationchart id="chart-container" [legendSettings]="legendSettings">
      <e-accumulation-series-collection>
        <e-accumulation-series
          [dataSource]="piedata"
          xName="x"
          yName="y"
          type="Pie"
          [palettes]="palette">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class AppComponent implements OnInit {
  piedata: object[] = [];
  legendSettings: object = { visible: false };
  palette: string[] = ['#E94649', '#F6B53F', '#6FAAB0', '#FF33F3', '#228B22', '#3399FF'];

  ngOnInit(): void {
    this.piedata = [
      { x: 'Chrome',  y: 37 },
      { x: 'Firefox', y: 28 },
      { x: 'Safari',  y: 18 },
      { x: 'Edge',    y: 10 },
      { x: 'IE',      y: 4  },
      { x: 'Others',  y: 3  }
    ];
  }
}
```

> ✅ `[palettes]` is a typed `@Input()` on `AccumulationSeriesDirective` — no NG8002 in strict mode.

---

### Option B — `pointColorMapping` on the series (color per data point)

Embed a `fill` field in each data object and reference it via `pointColorMapping="fill"`.
Use this when each data point needs an individually chosen color:

```typescript
@Component({
  template: `
    <ejs-accumulationchart>
      <e-accumulation-series-collection>
        <e-accumulation-series
          [dataSource]="data"
          xName="x"
          yName="y"
          pointColorMapping="fill">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class ChartComponent {
  data = [
    { x: 'A', y: 30, fill: '#FF6B6B' },  // Red
    { x: 'B', y: 25, fill: '#4ECDC4' },  // Teal
    { x: 'C', y: 20, fill: '#45B7D1' },  // Blue
    { x: 'D', y: 15, fill: '#FFA07A' },  // Light Salmon
    { x: 'E', y: 10, fill: '#98D8C8' }   // Mint
  ];
}
```

---

### Comparison

| Approach | Where | When to use |
|---|---|---|
| `[palettes]="palette"` | on `<e-accumulation-series>` | Fixed set of colors applied cyclically to all points |
| `pointColorMapping="fill"` | on `<e-accumulation-series>` | Different color per data point, stored in the data |
| ~~`[palette]` on chart~~ | ~~on `<ejs-accumulationchart>`~~ | ❌ Not a typed `@Input()` — causes **NG8002** in strict mode |

> **Why not `[palette]` on the chart element?**  
> `[palette]` (singular) is **not** a typed `@Input()` on the Syncfusion Angular chart wrapper.
> Angular's strict template checker raises **NG8002** and the build fails. Use `[palettes]`
> on the series or `pointColorMapping` instead.

### Per-Point Custom Color

Style individual data points with custom colors:

```typescript
@Component({
  template: `
    <ejs-accumulationchart (pointRender)="onPointRender($event)">
      <e-accumulation-series [dataSource]="data">
      </e-accumulation-series>
    </ejs-accumulationchart>
  `
})
export class ChartComponent {
  data = [
    { x: 'A', y: 30, color: '#FF6B6B' },
    { x: 'B', y: 25, color: '#4ECDC4' },
    { x: 'C', y: 20, color: '#45B7D1' },
    { x: 'D', y: 15, color: '#FFA07A' }
  ];

  onPointRender(args: IAccumulationEventArgs) {
    // Apply custom color from data
    if (args.point.color) {
      args.fill = args.point.color;
    }
  }
}
```

### Point Border Styling

Add borders and customize segment edges:

```typescript
onPointRender(args: IAccumulationEventArgs) {
  args.border = {
    color: '#FFFFFF',    // White border
    width: 2
  };

  // Different border for specific points
  if (args.pointIndex === 0) {
    args.border.color = '#333';
    args.border.width = 3;
  }
}
```

## Themes

### Applying Themes

Syncfusion charts support multiple themes. Apply via CSS or programmatically:

### Available Themes

- **Material** - Google Material Design
- **Bootstrap** - Bootstrap theme
- **Fabric** - Microsoft Office style
- **Bootstrap4** - Bootstrap 4
- **Tailwind** - Tailwind CSS
- **Highcontrast** - High contrast for accessibility

### Theme Configuration

```typescript
<ejs-accumulationchart 
  theme="Material"
  [background]="'#f5f5f5'">
  <e-accumulation-series [dataSource]="data">
  </e-accumulation-series>
</ejs-accumulationchart>
```

## Right‑to‑Left (RTL) Support
The chart supports RTL mode for languages read right-to-left.

**API:** `enableRtl: boolean`

```typescript
// Enable RTL
import { enableRtl } from '@syncfusion/ej2-base';
enableRtl(true);
```

RTL affects:
- Legend alignment  
- Tooltip direction  
- Label flow  

## Animation

### Enable Animation

Animate chart segments on load:

```typescript
<ejs-accumulationchart>
  <e-accumulation-series
    [dataSource]="data"
    [animation]="{ enable: true, duration: 1000 }">
  </e-accumulation-series>
</ejs-accumulationchart>
```

### Animation Properties

```typescript
interface AnimationProperties {
  enable: boolean;           // Enable/disable animation
  duration: number;          // Animation duration in ms (default: 1000)
  delay: number;            // Delay before animation starts
  option: 'Rotate' | 'Zoom' | 'SlideForward'; // Animation type
}
```

### Animation Options

**Rotate:** Segments rotate into place
```typescript
[animation]="{ enable: true, option: 'Rotate', duration: 1500 }"
```

**Zoom:** Segments zoom into place
```typescript
[animation]="{ enable: true, option: 'Zoom', duration: 1000 }"
```

**SlideForward:** Segments slide into place
```typescript
[animation]="{ enable: true, option: 'SlideForward', duration: 1200 }"
```

### Delayed Animation

```typescript
@Component({
  template: `
    <ejs-accumulationchart>
      <e-accumulation-series
        [dataSource]="data"
        [animation]="animationConfig">
      </e-accumulation-series>
    </ejs-accumulationchart>
  `
})
export class ChartComponent {
  animationConfig = {
    enable: true,
    duration: 1500,
    delay: 500,     // Wait 500ms before animating
    option: 'Zoom'
  };

  data = [
    { x: 'A', y: 30 },
    { x: 'B', y: 25 }
  ];
}
```

## Gradients

### Linear Gradient Fill

Apply linear gradients to chart segments:

```typescript
onPointRender(args: IAccumulationEventArgs) {
  args.fill = new LinearGradient(
    {
      colors: ['#FF6B6B', '#FFA07A']
    }
  );
}
```

### Custom Gradient Configuration

```typescript
@Component({
  template: `
    <ejs-accumulationchart (pointRender)="onPointRender($event)">
      <e-accumulation-series [dataSource]="data">
      </e-accumulation-series>
    </ejs-accumulationchart>
  `
})
export class GradientChartComponent {
  data = [
    { x: 'A', y: 30 },
    { x: 'B', y: 25 },
    { x: 'C', y: 20 }
  ];

  onPointRender(args: IAccumulationEventArgs) {
    // Apply gradient based on index
    const colors = [
      { startColor: '#FF6B6B', endColor: '#FF8E8E' },
      { startColor: '#4ECDC4', endColor: '#6FE5D8' },
      { startColor: '#45B7D1', endColor: '#6ECDE8' }
    ];

    const color = colors[args.pointIndex % colors.length];
    args.fill = new LinearGradient(
      {
        colors: [color.startColor, color.endColor],
        angle: 90
      }
    );
  }
}
```

### Radial Gradient

For radial (circular) gradient effects:

```typescript
onPointRender(args: IAccumulationEventArgs) {
  args.fill = new RadialGradient(
    {
      colors: ['#FF6B6B', '#FFFFFF'],
      angle: 45
    }
  );
}
```

## Custom CSS Styling

### Chart Container Styling

```css
#container {
  height: 420px;
  width: 100%;
  border: 2px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
```

### Style Chart Elements

```typescript
titleStyle = {
  color: '#333',
  fontFamily: 'Segoe UI',
  fontSize: '18px',
  fontWeight: 'bold',
  backgroundColor: '#F0F0F0',
  padding: { top: 10, bottom: 10, left: 10, right: 10 },
  borderRadius: 5
};

labelStyle = {
  color: '#666',
  fontFamily: 'Arial',
  fontSize: '12px',
  fontStyle: 'italic'
};
```

### Apply Text Styles to Elements

```typescript
<ejs-accumulationchart 
  [titleStyle]="titleStyle"
  [subTitleStyle]="subtitleStyle">
  <e-accumulation-legend [textStyle]="legendTextStyle">
  </e-accumulation-legend>
  <e-accumulation-series
    [dataLabel]="{ textStyle: labelStyle }">
  </e-accumulation-series>
</ejs-accumulationchart>
```

## Chart Margin and Border

### Margin
Controls the outer spacing around the chart.

**API:**  
`margin: { left: number, right: number, top: number, bottom: number }`

```html
<ejs-accumulationchart
  [margin]="{ top: 20, bottom: 20 }">
</ejs-accumulationchart>
```

### Border
Adds a border around the entire chart area.

**API:**  
`border: { width: number, color: string }`

```html
<ejs-accumulationchart
  [border]="{ width: 1, color: '#ccc' }">
</ejs-accumulationchart>
```

## Export and Print

### Imports and Providers

```typescript
import { Component, ViewChild } from '@angular/core';
import {
  AccumulationChartModule,
  PieSeriesService,
  AccumulationDataLabelService,
  ExportService
} from '@syncfusion/ej2-angular-charts';
```

```typescript
@Component({
  standalone: true,
  selector: 'app-container',
  imports: [AccumulationChartModule],
  providers: [PieSeriesService, AccumulationDataLabelService, ExportService],
  template: ``
})
export class AppComponent {}
```

### Export to Image

Export chart as PNG, JPEG, SVG, or PDF:

```typescript
import { Component, ViewChild } from '@angular/core';
import {
  AccumulationChartComponent,
  AccumulationChartModule,
  PieSeriesService,
  AccumulationDataLabelService,
  ExportService
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-export-chart',
  imports: [AccumulationChartModule],
  providers: [PieSeriesService, AccumulationDataLabelService, ExportService],
  template: `
    <button (click)="exportChart()">Export as PNG</button>

    <ejs-accumulationchart #chart id="container">
      <e-accumulation-series-collection>
        <e-accumulation-series
          [dataSource]="data"
          xName="x"
          yName="y">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class ExportChartComponent {
  @ViewChild('chart') chart!: AccumulationChartComponent;

  data = [
    { x: 'A', y: 30 },
    { x: 'B', y: 25 }
  ];

  exportChart() {
    this.chart?.export('PNG', 'accumulation-chart');
  }
}
```

### Export Types

```typescript
// PNG format
chart.export('PNG', 'chart-name');

// JPEG format
chart.export('JPEG', 'chart-name');

// SVG vector format
chart.export('SVG', 'chart-name');

// PDF format
chart.export('PDF', 'chart-name');
```

### Print Chart

```typescript
import { Component, ViewChild } from '@angular/core';
import {
  AccumulationChartComponent,
  AccumulationChartModule,
  PieSeriesService,
  AccumulationDataLabelService,
  ExportService
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-print-chart',
  imports: [AccumulationChartModule],
  providers: [PieSeriesService, AccumulationDataLabelService, ExportService],
  template: `
    <button (click)="printChart()">Print</button>

    <ejs-accumulationchart #chart id="container">
      <e-accumulation-series-collection>
        <e-accumulation-series
          [dataSource]="data"
          xName="x"
          yName="y">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class PrintChartComponent {
  @ViewChild('chart') chart!: AccumulationChartComponent;

  data = [
    { x: 'A', y: 30 },
    { x: 'B', y: 25 }
  ];

  printChart() {
    this.chart?.print();
  }
}
```

### Export Button Component

```typescript
import { Component, ViewChild } from '@angular/core';
import {
  AccumulationChartModule,
  PieSeriesService,
  AccumulationDataLabelService,
  ExportService,
  AccumulationChartComponent
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-export-buttons',
  imports: [AccumulationChartModule],
  providers: [PieSeriesService, AccumulationDataLabelService, ExportService],
  template: `
    <div class="export-buttons">
      <button (click)="exportPNG()" class="btn btn-primary">
        📥 Export PNG
      </button>
      <button (click)="exportJPEG()" class="btn btn-secondary">
        📥 Export JPEG
      </button>
      <button (click)="exportSVG()" class="btn btn-secondary">
        📥 Export SVG
      </button>
      <button (click)="exportPDF()" class="btn btn-danger">
        📥 Export PDF
      </button>
      <button (click)="printChart()" class="btn btn-info">
        🖨️ Print
      </button>
    </div>
    
    <ejs-accumulationchart #chart id="container">
      <e-accumulation-series-collection>
        <e-accumulation-series
          [dataSource]="data"
          xName="x"
          yName="y">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `,
  styles: [`
    .export-buttons { margin-bottom: 20px; }
    .btn { margin-right: 10px; padding: 8px 16px; }
  `]
})
export class ExportButtonsComponent {
  @ViewChild('chart') chart!: AccumulationChartComponent;

  data = [
    { x: 'Q1', y: 40 },
    { x: 'Q2', y: 50 },
    { x: 'Q3', y: 60 },
    { x: 'Q4', y: 75 }
  ];

  exportPNG() {
    this.chart?.export('PNG', 'quarterly-sales');
  }

  exportJPEG() {
    this.chart?.export('JPEG', 'quarterly-sales');
  }

  exportSVG() {
    this.chart?.export('SVG', 'quarterly-sales');
  }

  exportPDF() {
    this.chart?.export('PDF', 'quarterly-sales');
  }

  printChart() {
    this.chart?.print();
  }
}
```

## Advanced Styling Examples

### Example 1: Dashboard Style with Multiple Charts

```typescript
@Component({
  selector: 'app-styled-dashboard',
  template: `
    <div class="dashboard-container">
      <div class="chart-card">
        <h3>Sales by Region</h3>
        <!-- Use pointColorMapping="fill" — NOT [palette] on the chart element -->
        <ejs-accumulationchart>
          <e-accumulation-series-collection>
            <e-accumulation-series
              [dataSource]="regionData"
              xName="x" yName="y"
              type="Pie"
              pointColorMapping="fill">
            </e-accumulation-series>
          </e-accumulation-series-collection>
        </ejs-accumulationchart>
      </div>
      
      <div class="chart-card">
        <h3>Product Distribution</h3>
        <ejs-accumulationchart>
          <e-accumulation-series-collection>
            <e-accumulation-series
              [dataSource]="productData"
              xName="x" yName="y"
              type="Pie"
              innerRadius="40%"
              pointColorMapping="fill">
            </e-accumulation-series>
          </e-accumulation-series-collection>
        </ejs-accumulationchart>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      padding: 20px;
    }
    .chart-card {
      background: #fff;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .chart-card h3 {
      margin-top: 0;
      color: #333;
      font-size: 16px;
      font-weight: 600;
    }
  `]
})
export class StyledDashboardComponent {
  regionData = [
    { x: 'North', y: 45, fill: '#FF6B6B' },
    { x: 'South', y: 55, fill: '#4ECDC4' }
  ];

  productData = [
    { x: 'Product A', y: 35, fill: '#45B7D1' },
    { x: 'Product B', y: 30, fill: '#FFA07A' },
    { x: 'Product C', y: 35, fill: '#98D8C8' }
  ];
}
```

### Example 2: Interactive Styling with State

```typescript
@Component({
  template: `
    <ejs-accumulationchart
      (pointRender)="onPointRender($event)"
      (pointClick)="onPointClick($event)">
      <e-accumulation-series [dataSource]="styledData">
      </e-accumulation-series>
    </ejs-accumulationchart>
  `
})
export class InteractiveStyledComponent {
  selectedIndex: number | null = null;

  styledData = [
    { x: 'A', y: 30 },
    { x: 'B', y: 25 },
    { x: 'C', y: 20 }
  ];

  onPointRender(args: IAccumulationEventArgs) {
    const isSelected = args.pointIndex === this.selectedIndex;
    
    if (isSelected) {
      args.fill = '#FF6B6B';
      args.border = { color: '#333', width: 3 };
    } else {
      args.fill = args.pointIndex % 2 === 0 ? '#4ECDC4' : '#45B7D1';
    }
  }

  onPointClick(args: IAccumulationEventArgs) {
    this.selectedIndex = args.pointIndex;
  }
}
```

## Key Takeaways

- **Palettes**: Use predefined or custom color schemes
- **Themes**: Apply Material, Bootstrap, Fabric, or Tailwind themes
- **Animation**: Enhance UX with rotation, zoom, or slide animations
- **Gradients**: Add visual depth with linear or radial gradients
- **Styling**: Customize fonts, colors, backgrounds for all elements
- **Export**: Support PNG, JPEG, SVG, PDF export and printing
- **Responsive**: Combine CSS media queries for mobile-friendly styling

---

## API Reference Summary

### Appearance APIs

| API | Description | Documentation Link |
|-----|-------------|-------------------|
| `theme` | Built-in theme selection (on chart element) | [theme](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#theme) |
| `background` | Chart background color (on chart element) | [background](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#background) |
| `palettes` | **Series property** — `string[]` of hex/named colors applied cyclically to points. Use `[palettes]="palette"` on `<e-accumulation-series>`. ✅ Strict-mode safe. | [palettes](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#palettes) |
| `pointColorMapping` | **Series property** — field name in each data object that holds the point color (e.g., `"fill"`). Use `pointColorMapping="fill"` on `<e-accumulation-series>`. ✅ Strict-mode safe. | [pointColorMapping](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#pointcolormapping) |
| `border` | Chart border styling (on chart element) | [border](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#border) |
| `opacity` | Series opacity 0–1 (on series element) | [opacity](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#opacity) |

### Animation APIs

| API | Description | Documentation Link |
|-----|-------------|-------------------|
| `enableAnimation` | Enable chart animation | [enableAnimation](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#enableanimation) |
| `animation` | Animation settings | [animation](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationSeries#animation) |
| `AnimationModel` | Animation configuration interface | [AnimationModel](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/animationModel) |

### Export/Print APIs

| API | Description | Documentation Link |
|-----|-------------|-------------------|
| `export()` | Export chart as image/PDF | [export](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#export) |
| `print()` | Print chart | [print](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#print) |

**For complete API documentation, see:** [api-reference.md](references/api-reference.md)