# Advanced Features

## Table of Contents

- [Tooltips](#tooltips)
  - [Enable Tooltips](#enable-tooltips)
  - [Tooltip Formatting](#tooltip-formatting)
  - [Tooltip Styling](#tooltip-styling)
  - [Custom Tooltip Template](#custom-tooltip-template)
- [Print and Export](#print-and-export)
  - [Print Functionality](#print-functionality)
  - [Image Export](#image-export)
  - [Exporting SVG](#exporting-svg)
- [RTL Support](#rtl-support)
  - [Enable Right-to-Left Layout](#enable-right-to-left-layout)
  - [RTL Considerations](#rtl-considerations)
  - [CSS for RTL](#css-for-rtl)
  - [Component-Level Styling](#component-level-styling)
- [Responsive Sizing](#responsive-sizing)
  - [Percentage-Based Sizing](#percentage-based-sizing)
  - [Container Sizing](#container-sizing)
  - [Responsive with Media Queries](#responsive-with-media-queries)
- [Accessibility](#accessibility)
  - [WCAG Compliance](#wcag-compliance)
  - [Keyboard Navigation](#keyboard-navigation)
  - [ARIA Attributes](#aria-attributes)
  - [Screen Reader Support](#screen-reader-support)
  - [Font and Color Contrast](#font-and-color-contrast)
- [Event Handling](#event-handling)
  - [Tooltip Events](#tooltip-events)
  - [Series Events](#series-events)
  - [Legend Events](#legend-events)
  - [Load Event](#load-event)
- [Complete Advanced Example](#complete-advanced-example)

## Tooltips

Tooltips display detailed information when hovering over data points.

### Enable Tooltips

```typescript
import { Component } from '@angular/core';
import { SmithchartModule, TooltipRenderService } from '@syncfusion/ej2-angular-charts'

@Component({
  imports: [SmithchartModule],
  providers: [TooltipRenderService],
  standalone: true,
  template : `
    <ejs-smithchart
      [series]="series"
      style="display:block;height:350px">
    </ejs-smithchart> `
})
export class AppComponent {
  series = [
    {
      marker: { visible: true },       // ✅ required for tooltip
      tooltip: { visible: true },      // ✅ tooltip enabled per series
      points: [
        { resistance: 0.4, reactance: 0.2 }
      ]
    }
  ];
}
```

**Required:** Inject `TooltipRenderService` in providers.

### Tooltip Formatting

Customize tooltip content:

```typescript
tooltip = {
  visible: true,
  template: '<div style="color: red; border: 1px solid #000; padding: 4px; border-radius: 3px;">Value: ${resistance} - ${reactance}</div>'
}
```

**Template tokens:**
- `${resistance}` - X-axis value
- `${reactance}` - Y-axis value

**Example Template:**
```typescript
template: '<div>Resistance: ${resistance}<br>Reactance: ${reactance}</div>'
```

### Tooltip Styling

```typescript
tooltip = {
  visible: true,
  fill: '#FFFFCC',
  border: {
    color: '#FF6633',
    width: 1
  }
}
```

### Custom Tooltip Template

Create custom tooltip HTML:

```typescript
export class AppComponent {
  tooltip = {
    visible: true,
    template: '<div>${resistance} + j${reactance}</div>'
  }
}
```

## Print and Export

### Print Functionality

```typescript

import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SmithchartModule } from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [SmithchartModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <button (click)="print()">Print Smith Chart</button>

    <ejs-smithchart
      #smithchart
      style="display:block;height:400px">
    </ejs-smithchart>
  `
})
export class AppComponent {

  @ViewChild('smithchart')
  public smithchart!: any;

  print(): void {
    this.smithchart.print();
  }
}
```

### Image Export

```typescript
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SmithchartModule } from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [SmithchartModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <button (click)="exportAsImage()">Export as PNG</button>

    <ejs-smithchart
      #smithchart
      style="display:block;height:400px">
    </ejs-smithchart>
  `
})
export class AppComponent {

  @ViewChild('smithchart')
  public smithchart!: any;

  exportAsImage(): void {
    this.smithchart.export('PNG', 'smith-chart');
  }
}
```

**Supported formats:**
- `'PNG'` - Portable Network Graphics
- `'JPEG'` - Joint Photographic Experts Group
- `'SVG'` - Scalable Vector Graphics

### Exporting SVG

```typescript
exportAsSVG() {
  this.smithchart.export('SVG', 'smith-chart')
}
```

SVG format is ideal for:
- Embedding in web applications
- Editing in design software
- Scalable without quality loss

## RTL Support

### Enable Right-to-Left Layout

```typescript
@Component({
  standalone: true,
  selector: 'app-container',
  imports: [SmithchartModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ejs-smithchart 
      dir="rtl"
      [legendSettings]="legendSettings">
    </ejs-smithchart>
  `
})
export class AppComponent {
  legendSettings = {
    visible: true,
    position: 'Left'  // Legend on left in RTL
  }
}
```

### RTL Considerations

- **Legend position** - Adjust for RTL layout
- **Label alignment** - Text alignment adjusts automatically
- **Axis labels** - Rendered appropriately for RTL

### CSS for RTL

```css
[dir="rtl"] ejs-smithchart {
  direction: rtl;
  text-align: right;
}
```

### Component-Level Styling

```typescript
@Component({
  styles: [`
    :host ::ng-deep ejs-smithchart {
      background-color: #F5F5F5;
    }
    :host ::ng-deep .e-smithchart-legend {
      background-color: #FFFFFF;
      border: 1px solid #CCCCCC;
    }
  `]
})
export class AppComponent { }
```

## Responsive Sizing

### Percentage-Based Sizing

```typescript
@Component({
 template : `
    <ejs-smithchart 
      width="100%"
      height="500px">
    </ejs-smithchart>
  `
})
export class AppComponent {
}
```

### Container Sizing

```html
<div style="width: 600px; height: 500px;">
  <ejs-smithchart style="width: 100%; height: 100%;"></ejs-smithchart>
</div>
```

### Responsive with Media Queries

```typescript
@Component({
  styles: [`
    :host {
      display: block;
    }

    @media (max-width: 768px) {
      ejs-smithchart {
        height: 300px !important;
      }
    }

    @media (min-width: 1200px) {
      ejs-smithchart {
        height: 600px !important;
      }
    }
  `]
})
export class AppComponent { }
```

## Accessibility

The Syncfusion Smith Chart is built with accessibility in mind, supporting WCAG 2.1 Level AA standards.

### WCAG Compliance

Key accessibility features:
- **Semantic HTML** - Proper heading hierarchy and document structure
- **Color contrast** - Meets WCAG AA minimum ratios (4.5:1 for text)
- **Keyboard navigation** - All interactive elements accessible via keyboard
- **Screen reader support** - Proper ARIA labels and roles
- **Focus management** - Clear visual focus indicators
- **Responsive design** - Works well on all device sizes

**Recommended themes for accessibility:**
- `HighContrast` - Best for visually impaired users
- `Bootstrap5` - Good contrast ratios
- `Material3` - Modern and accessible

### Keyboard Navigation

Navigate chart elements using keyboard:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { SmithchartModule } from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [SmithchartModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ejs-smithchart
      tabindex="0"
      role="img"
      aria-label="Transmission line Smith chart showing impedance analysis"
      (keydown)="onKeyDown($event)"
      style="display:block; height:350px">
    </ejs-smithchart>
  `
})
export class AppComponent {
  onKeyDown(event: KeyboardEvent) {
    switch(event.key) {
      case 'Escape': 
        console.log('Chart focus cleared');
        break;
      case 'Enter':
        console.log('Chart activated');
        break;
    }
  }
}
```

**Supported keyboard shortcuts:**
- `Tab` - Navigate to next element
- `Shift + Tab` - Navigate to previous element
- `Enter` - Activate/select element
- `Escape` - Clear focus/exit interaction
- `Arrow keys` - Navigate within data points (when applicable)

### ARIA Attributes

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { SmithchartModule } from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [SmithchartModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div>
      <h2 id="chart-title">Device Impedance Analysis</h2>
      <p id="chart-description">
        This chart displays transmission line impedance measurements for three devices: Device A, Device B, and Device C.
        Each line shows resistance (horizontal axis) vs reactance (vertical axis).
      </p>
      
      <ejs-smithchart 
        role="img"
        [ariaLabel]="'Smith chart: Device impedance analysis showing three transmission lines'"
        aria-describedby="chart-description"
        style="display:block; height:400px">
        <e-seriesCollection>
          <e-series name="Device A" [points]="deviceA"></e-series>
          <e-series name="Device B" [points]="deviceB"></e-series>
          <e-series name="Device C" [points]="deviceC"></e-series>
        </e-seriesCollection>
      </ejs-smithchart>

      <!-- Data Table Alternative for Screen Readers -->
      <details>
        <summary>View impedance data in table format</summary>
        <table>
          <thead>
            <tr>
              <th>Device</th>
              <th>Resistance</th>
              <th>Reactance</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Device A</td><td>0.2</td><td>0.1</td></tr>
            <tr><td>Device B</td><td>0.3</td><td>0.15</td></tr>
          </tbody>
        </table>
      </details>
    </div>
  `
})
export class AppComponent {
  deviceA = [{ resistance: 0.2, reactance: 0.1 }];
  deviceB = [{ resistance: 0.3, reactance: 0.15 }];
  deviceC = [{ resistance: 0.4, reactance: 0.2 }];
}
```

### Screen Reader Support

**Best practices for screen reader users:**

1. **Always provide title and description:**
   ```typescript
   ariaLabel: 'Smith chart showing impedance data for three transmission lines'
   aria-describedby: 'chart-description'
   ```

2. **Include series names:**
   ```typescript
   series = [
     { name: 'Device A' },  // Will be announced
     { name: 'Device B' }
   ];
   ```

3. **Enable tooltips for detailed values:**
   ```typescript
   tooltip = {
     visible: true,
     template: 'Device: ${name}, R: ${resistance}, X: ${reactance}'
   }
   ```

4. **Provide data table alternative:**
   - Use `<details>/<summary>` to hide table by default
   - Makes all data available to screen readers
   - Improves SEO

5. **Legends with keyboard focus:**
   ```typescript
   legendSettings = {
     visible: true,
     tabindex: 0  // Makes legend keyboard accessible
   }
   ```

### Font and Color Contrast

Ensure readable text across all users:

```typescript
@Component({
  styles: [`
    :host ::ng-deep .e-smithchart-title {
      font-size: 18px !important;      /* Minimum 16px for accessibility */
      font-weight: 600 !important;
      fill: #000000 !important;        /* High contrast */
    }
    
    :host ::ng-deep .e-smithchart-legend {
      font-size: 14px !important;      /* Readable size */
      fill: #333333 !important;        /* Dark color */
    }
  `]
})
export class AppComponent {
  tooltip = {
    fill: '#FFFFFF',           // Light background
    textStyle: {
      color: '#000000'         // Dark text on light background
    }
  };

  // Use HighContrast theme for visually impaired users
  theme = 'HighContrast';
}
```

**Color contrast guidelines:**
- **Text on background**: Minimum 4.5:1 ratio
- **UI components**: Minimum 3:1 ratio
- **Focus indicators**: Clear and visible (minimum 2px border)

## Event Handling

### Tooltip Events

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import {
  SmithchartModule,
  TooltipRenderService
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [SmithchartModule],
  providers: [TooltipRenderService],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ejs-smithchart
      [series]="series"
      (tooltipRender)="onTooltipRender($event)"
      style="display:block;height:350px">
    </ejs-smithchart>
  `
})
export class AppComponent {

  series = [
    {
      marker: { visible: true },        // ✅ required for tooltip hover
      tooltip: { visible: true },       // ✅ enable tooltip per series
      points: [
        { resistance: 0.4, reactance: 0.2 }
      ]
    }
  ];

  onTooltipRender(args: any): void {
    console.log('Tooltip displaying for:', args);
  }
}
```

### Series Events

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import {
  SmithchartModule
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [SmithchartModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ejs-smithchart
      [series]="series"
      (seriesRender)="onSeriesRender($event)"
      style="display:block;height:350px">
    </ejs-smithchart>
  `
})
export class AppComponent {

  series = [
    {
      name: 'Device A',
      marker: { visible: true },
      points: [
        { resistance: 0.4, reactance: 0.2 },
        { resistance: 0.6, reactance: 0.4 }
      ]
    }
  ];

  onSeriesRender(args: any): void {
    console.log('Series rendering:', args.text);
  }
}
```

### Legend Events

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import {
  SmithchartModule,
  SmithchartLegendService
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [SmithchartModule],
  providers: [SmithchartLegendService],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ejs-smithchart
      [series]="series"
      [legendSettings]="legendSettings"
      (legendRender)="onLegendRender($event)"
      style="display:block;height:350px">
    </ejs-smithchart>
  `
})
export class AppComponent {

  legendSettings = { visible: true };

  series = [
    {
      name: 'Device A',
      marker: { visible: true },
      points: [{ resistance: 0.4, reactance: 0.2 }]
    }
  ];

  onLegendRender(args: any): void {
    console.log('Legend rendering:', args.text);
  }
}
```

### Load Event

Execute code when chart is fully loaded:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { SmithchartModule } from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [SmithchartModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ejs-smithchart
      [series]="series"
      (load)="onChartLoad($event)"
      style="display:block;height:350px">
    </ejs-smithchart>
  `
})
export class AppComponent {

  series = [
    {
      name: 'Device A',
      marker: { visible: true },
      points: [
        { resistance: 0.4, reactance: 0.2 }
      ]
    }
  ];

  onChartLoad(args: any): void {
    console.log('SmithChart load event triggered');
  }
}
```

## Complete Advanced Example

```typescript
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  SmithchartModule,
  TooltipRenderService,
  SmithchartLegendService,
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [SmithchartModule],
  providers: [
    TooltipRenderService,
    SmithchartLegendService
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="controls">
      <button (click)="print()">Print</button>
      <button (click)="exportAsImage()">Export PNG</button>
      <label>
        <input type="checkbox" (change)="toggleRTL()"> RTL Mode
      </label>
    </div>

    <ejs-smithchart
      #smithchart
      id="container"
      [series]="series"
      [legendSettings]="legendSettings"
      (tooltipRender)="onTooltipRender($event)"
      style="display:block;height:350px">
    </ejs-smithchart>
  `,
  styles: [`
    .controls {
      margin-bottom: 20px;
    }
    button, label {
      margin-right: 10px;
    }
  `]
})
export class AppComponent {

  @ViewChild('smithchart')
  public smithchart!: any;

  rtlMode = false;

  series = [
    {
      name: 'Device A',
      fill: '#0066CC',
      marker: { visible: true },
      tooltip: { visible: true },
      points: [
        { resistance: 0.4, reactance: 0.2 },
        { resistance: 0.6, reactance: 0.4 }
      ]
    }
  ];

  legendSettings = {
    visible: true,
    position: 'Bottom'
  };

  print(): void {
    this.smithchart.print();
  }

  exportAsImage(): void {
    this.smithchart.export('PNG', 'smith-chart');
  }

  toggleRTL(): void {
    this.rtlMode = !this.rtlMode;
    this.legendSettings = {
      ...this.legendSettings,
      position: this.rtlMode ? 'Left' : 'Bottom'
    };
  }

  onTooltipRender(args: any): void {
    console.log('Tooltip:', args);
  }
}
```
## Responsive Design

Create responsive smith charts that adapt to mobile, tablet, and desktop devices.

### Mobile-Optimized Layout

```	typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmithchartModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

@Component({
  standalone: true,
  imports: [CommonModule, SmithchartModule],
  template: 
    <ejs-smithchart
      [width]="chartWidth"
      [height]="chartHeight"
      [series]="series"
      [legendSettings]="legendSettings">
    </ejs-smithchart>
})
export class AppComponent {
  series = [{ name: 'Device A', points: [...] }];

  get chartWidth(): string {
    return Browser.isDevice ? '100%' : '800px';
  }

  get chartHeight(): string {
    return Browser.isDevice ? '300px' : '500px';
  }

  get legendSettings() {
    return {
      visible: true,
      position: Browser.isDevice ? 'Bottom' : 'Right'
    };
  }
}
```

## Performance Optimization

Optimize charts for better performance with large datasets.

### Large Dataset Pagination

```	typescript
@Component({
  template: 
    <button (click)="loadMore()" [disabled]="loadedCount >= totalSeries">
      Load More ({{ loadedCount }}/{{ totalSeries }})
    </button>
    <ejs-smithchart [series]="displayedSeries" style="display:block; height:500px">
    </ejs-smithchart>
  
})
export class AppComponent {
  displayedSeries: any[] = [];
  loadedCount = 0;
  totalSeries = 100;
  seriesPerPage = 10;

  loadMore() {
    const startIndex = this.loadedCount;
    const endIndex = Math.min(startIndex + this.seriesPerPage, this.totalSeries);

    for (let i = startIndex; i < endIndex; i++) {
      this.displayedSeries.push({
        name: Device,
        points: Array.from({ length: 10 }, (_, j) => ({
          resistance: Math.random() * 2,
          reactance: Math.random() * 2
        }))
      });
    }

    this.loadedCount = endIndex;
  }
}
```

## Best Practices Summary

| Category | Best Practice | Benefit |
|----------|---------------|---------|
| **Performance** | Use pagination for large datasets | Faster initial load and better memory usage |
| **Accessibility** | Provide ARIA labels and descriptions | Screen reader compatibility and WCAG compliance |
| **Responsive** | Use \Browser.isDevice\ detection | Optimized experience per device type |
| **UX** | Enable tooltips with templates | Contextual information on hover |
| **Export** | Use SVG format | Scalable and editable outputs |
