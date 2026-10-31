# Accessibility and Responsive Design

## Table of Contents
- [Accessibility Overview](#accessibility-overview)
- [WCAG Compliance](#wcag-compliance)
- [Keyboard Navigation](#keyboard-navigation)
- [ARIA Attributes](#aria-attributes)
- [Screen Reader Support](#screen-reader-support)
- [Color Contrast](#color-contrast)
- [Responsive Design](#responsive-design)
- [Mobile Considerations](#mobile-considerations)
- [Accessible Component Example](#accessible-component-example)

## Accessibility Overview

Accumulation charts must be accessible to all users, including those using assistive technologies. This guide covers WCAG 2.1 Level AA compliance standards.

### Key Accessibility Principles

1. **Perceivable** - Content must be presented in accessible ways
2. **Operable** - Users must be able to navigate using keyboard
3. **Understandable** - Content must be clear and predictable
4. **Robust** - Content must work with assistive technologies

## WCAG Compliance

### Level AA Compliance Checklist

- [ ] Alternative text for chart (title, description)
- [ ] Keyboard accessible (no mouse-only interactions)
- [ ] Sufficient color contrast (4.5:1 for text)
- [ ] Readable font sizes (minimum 12px, 1.2em line-height)
- [ ] No flashing content (max 3 times/second)
- [ ] Descriptive labels and legends
- [ ] ARIA labels and descriptions
- [ ] Focus visible indicators
- [ ] Logical tab order

### Accessibility Configuration

```typescript
@Component({
  template: `
    <ejs-accumulationchart 
      id="container"
      [title]="'Sales Distribution Chart'"
      [description]="chartDescription"
      role="img"
      [attr.aria-label]="ariaLabel">
      <e-accumulation-series-collection>
        <e-accumulation-series [dataSource]="data">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class AccessibleChartComponent {
  chartDescription = 'Pie chart showing Q4 sales by product category. Product A: 35%, Product B: 28%, Product C: 20%, Product D: 17%.';
  ariaLabel = 'Q4 2024 Sales Distribution by Product Category';

  data = [
    { x: 'Product A', y: 35, text: '35%' },
    { x: 'Product B', y: 28, text: '28%' },
    { x: 'Product C', y: 20, text: '20%' },
    { x: 'Product D', y: 17, text: '17%' }
  ];
}
```

## Keyboard Navigation

### Enable Keyboard Support

```typescript
<ejs-accumulationchart 
  [enableExport]="true"
  [tooltip]="{ enable: true }"
  [highlightMode]="'Point'"
  selectionMode="Point">
  <e-accumulation-series-collection>
    <e-accumulation-series [dataSource]="data">
    </e-accumulation-series>
  </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Navigate through chart elements |
| `Enter` | Select focused point |
| `Space` | Activate focused element |
| `Arrow Keys` | Navigate between points |
| `Escape` | Clear selection/focus |
| `Ctrl+S` | Save/Export chart (if enabled) |

### Keyboard Event Handlers

```typescript
@Component({
  template: `
    <ejs-accumulationchart 
      (keyDown)="onKeyDown($event)"
      (keyUp)="onKeyUp($event)"
      tabIndex="0">
      <e-accumulation-series-collection>
        <e-accumulation-series [dataSource]="data">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class KeyboardAccessibleComponent {
  focusedIndex = 0;
  data = [
    { x: 'A', y: 30 },
    { x: 'B', y: 25 },
    { x: 'C', y: 20 }
  ];

  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        this.focusedIndex = (this.focusedIndex + 1) % this.data.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        this.focusedIndex = (this.focusedIndex - 1 + this.data.length) % this.data.length;
        break;
      case 'Enter':
      case ' ':
        this.selectCurrentPoint();
        break;
    }
  }

  onKeyUp(event: KeyboardEvent) {
    // Handle additional key up events if needed
  }

  selectCurrentPoint() {
    console.log('Selected:', this.data[this.focusedIndex]);
  }
}
```

## ARIA Attributes

### ARIA Labels

Provide descriptive labels for assistive technologies:

```typescript
<ejs-accumulationchart 
  role="img"
  [attr.aria-label]="'Sales pie chart'"
  [attr.aria-describedby]="'chart-description'">
  <span id="chart-description" style="display:none;">
    {{ chartDescription }}
  </span>
  <e-accumulation-series-collection>
    <e-accumulation-series [dataSource]="data">
    </e-accumulation-series>
  </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### ARIA Live Regions

Announce chart changes for screen reader users:

```typescript
@Component({
  template: `
    <div [attr.aria-live]="'polite'" [attr.aria-atomic]="'true'">
      {{ screenReaderAnnouncement }}
    </div>
    <ejs-accumulationchart (pointClick)="onPointClick($event)">
      <e-accumulation-series-collection>
        <e-accumulation-series [dataSource]="data">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class ARIAChartComponent {
  screenReaderAnnouncement = '';
  data = [
    { x: 'A', y: 30 },
    { x: 'B', y: 25 },
    { x: 'C', y: 20 }
  ];

  onPointClick(args: IPointEventArgs) {
    this.screenReaderAnnouncement = 
      `Selected ${args.point.x}: ${args.point.y} units, 
       which is ${args.point.percentage.toFixed(1)}% of total`;
  }
}
```

### ARIA Roles and Properties

```typescript
<ejs-accumulationchart 
  role="img"
  [attr.aria-label]="'Interactive sales chart'"
  [attr.aria-expanded]="true"
  [attr.aria-controls]="'chart-legend'">
  <e-accumulation-legend id="chart-legend">
  </e-accumulation-legend>
  <e-accumulation-series-collection>
    <e-accumulation-series [dataSource]="data">
    </e-accumulation-series>
  </e-accumulation-series-collection>
</ejs-accumulationchart>
```

## Screen Reader Support

### Semantic HTML Structure

```typescript
@Component({
  template: `
    <article class="chart-section">
      <h2 id="chart-title">Sales Performance Dashboard</h2>
      <p id="chart-desc">
        This chart displays quarterly sales distribution 
        across product categories for 2024.
      </p>
      
      <ejs-accumulationchart 
        role="img"
        [attr.aria-labelledby]="'chart-title'"
        [attr.aria-describedby]="'chart-desc'">
        <e-accumulation-series-collection>
          <e-accumulation-series [dataSource]="data">
          </e-accumulation-series>
        </e-accumulation-series-collection>
      </ejs-accumulationchart>
      
      <section aria-label="Chart data table">
        <table>
          <thead>
            <tr>
              <th>Quarter</th>
              <th>Sales</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of data">
              <td>{{ item.x }}</td>
              <td>{{ item.y | number }}</td>
              <td>{{ item.percentage | number: '1.1-2' }}%</td>
            </tr>
          </tbody>
        </table>
      </section>
    </article>
  `
})
export class ScreenReaderComponent {
  data = [
    { x: 'Q1', y: 150000, percentage: 25 },
    { x: 'Q2', y: 180000, percentage: 30 },
    { x: 'Q3', y: 210000, percentage: 35 },
    { x: 'Q4', y: 60000, percentage: 10 }
  ];
}
```

### Alternative Data Representation

Provide a data table as fallback for screen readers:

```typescript
@Component({
  template: `
    <div [attr.aria-hidden]="false">
      <!-- Chart for visual users -->
      <ejs-accumulationchart id="visual-chart">
        <e-accumulation-series-collection>
          <e-accumulation-series [dataSource]="data">
          </e-accumulation-series>
        </e-accumulation-series-collection>
      </ejs-accumulationchart>
      
      <!-- Data table for assistive technology -->
      <table class="sr-only" aria-label="Chart data">
        <caption>Sales by Region - Detailed Data</caption>
        <thead>
          <tr>
            <th>Region</th>
            <th>Sales ($)</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of data">
            <td>{{ item.x }}</td>
            <td>{{ item.y | currency }}</td>
            <td>{{ item.percentage }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
  `]
})
export class AccessibleDataComponent {
  data = [
    { x: 'North', y: 450000, percentage: 38 },
    { x: 'South', y: 350000, percentage: 29 },
    { x: 'East', y: 280000, percentage: 23 },
    { x: 'West', y: 70000, percentage: 6 }
  ];
}
```

## Color Contrast

### Minimum Contrast Ratios

- **Text and graphics**: 4.5:1 (normal), 3:1 (large)
- **UI components**: 3:1

### Accessible Color Palettes

```typescript
// High contrast palette
highContrastPalette = [
  '#000000',  // Black
  '#FFFFFF',  // White
  '#FF6B00',  // Orange
  '#003DA5',  // Blue
  '#00B050'   // Green
];

// Colorblind-friendly palette
colorblindPalette = [
  '#0173B2',  // Blue
  '#DE8F05',  // Orange
  '#CC78BC',  // Purple
  '#CA9161',  // Brown
  '#949494'   // Gray
];
```

### Checking Contrast

```typescript
onPointRender(args: IAccumulationEventArgs) {
  // Use colors with sufficient contrast
  const accessibleColors = [
    '#1F77B4',  // Blue (contrast: 4.5:1)
    '#FF7F0E',  // Orange (contrast: 3.1:1)
    '#2CA02C',  // Green (contrast: 5.2:1)
    '#D62728'   // Red (contrast: 3.3:1)
  ];
  
  args.fill = accessibleColors[args.pointIndex % accessibleColors.length];
}
```

## Responsive Design

### Responsive Container

```typescript
@Component({
  template: `
    <div class="chart-container">
      <ejs-accumulationchart 
        id="container"
        [width]="'100%'"
        [height]="'100%'">
        <e-accumulation-series-collection>
          <e-accumulation-series [dataSource]="data">
          </e-accumulation-series>
        </e-accumulation-series-collection>
      </ejs-accumulationchart>
    </div>
  `,
  styles: [`
    .chart-container {
      width: 100%;
      height: 400px;
      max-width: 1200px;
      margin: 0 auto;
    }

    @media (max-width: 768px) {
      .chart-container {
        height: 300px;
      }
    }

    @media (max-width: 480px) {
      .chart-container {
        height: 250px;
      }
    }
  `]
})
export class ResponsiveChartComponent {
  data = [
    { x: 'A', y: 30 },
    { x: 'B', y: 25 },
    { x: 'C', y: 20 }
  ];
}
```

### Responsive Legend Placement

```typescript
@Component({
  template: `
    <ejs-accumulationchart 
      [legendPosition]="legendPosition">
      <e-accumulation-legend 
        [visible]="true"
        [position]="legendPosition">
      </e-accumulation-legend>
      <e-accumulation-series-collection>
        <e-accumulation-series [dataSource]="data">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class ResponsiveLegendComponent {
  @HostListener('window:resize', ['$event'])
  onResize(event: IAccResizeEventArgs) {
    this.updateLegendPosition();
  }

  legendPosition = 'Right';

  updateLegendPosition() {
    if (window.innerWidth < 768) {
      this.legendPosition = 'Bottom';
    } else {
      this.legendPosition = 'Right';
    }
  }
}
```

## Mobile Considerations

### Touch-Friendly Interactions

```typescript
@Component({
  template: `
    <ejs-accumulationchart 
      [tooltip]="{ enable: true }"
      [selectionMode]="'Point'"
      (chartMouseClick)="onTouchPoint($event)">
      <e-accumulation-series-collection>
        <e-accumulation-series [dataSource]="data">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  `
})
export class MobileChartComponent {
  data = [
    { x: 'A', y: 30 },
    { x: 'B', y: 25 },
    { x: 'C', y: 20 }
  ];

  onTouchPoint(args: IPointEventArgs) {
    // Larger touch targets for mobile
    console.log('Touch/click detected:', args);
  }
}
```

### Mobile-Optimized Labels

```typescript
labelConfig = {
  visible: true,
  position: 'Inside',
  textStyle: {
    fontSize: '16px',  // Larger for readability
    fontWeight: '500'
  }
};
```

## Accessible Component Example

### Complete Accessible Chart

```typescript
@Component({
  selector: 'app-accessible-chart',
  template: `
    <section class="accessible-chart-section">
      <h2 id="chart-heading">Q4 Sales Analysis</h2>
      <p id="chart-summary">
        Interactive pie chart showing sales distribution across 
        four regions. Use arrow keys to navigate, Enter to select.
      </p>

      <ejs-accumulationchart 
        id="accessible-chart"
        role="img"
        tabIndex="0"
        [attr.aria-labelledby]="'chart-heading'"
        [attr.aria-describedby]="'chart-summary'"
        [width]="'100%'"
        [height]="'100%'"
        [title]="'Sales by Region'"
        [tooltip]="tooltipConfig"
        selectionMode="Point"
        (keyDown)="handleKeyboard($event)"
        (pointClick)="onPointSelected($event)">
        
        <e-accumulation-legend 
          [visible]="true"
          position="Right"
          [enableHighlight]="true">
        </e-accumulation-legend>
        
        <e-accumulation-series-collection>
          <e-accumulation-series
            [dataSource]="chartData"
            xName="region"
            yName="sales"
            type="Pie"
            [dataLabel]="labelConfig"
            (pointRender)="onPointRender($event)">
          </e-accumulation-series>
        </e-accumulation-series-collection>
      </ejs-accumulationchart>

      <div class="sr-announcement" 
           [attr.aria-live]="'polite'" 
           [attr.aria-atomic]="'true'">
        {{ announcement }}
      </div>

      <!-- Alternative data representation -->
      <table class="data-table" aria-label="Sales data details">
        <caption>Detailed Sales Information</caption>
        <thead>
          <tr>
            <th>Region</th>
            <th>Sales</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of chartData">
            <td>{{ item.region }}</td>
            <td>{{ item.sales | currency }}</td>
            <td>{{ (item.sales / getTotalSales() * 100) | number: '1.1-2' }}%</td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  styles: [`
    .accessible-chart-section {
      padding: 20px;
      max-width: 900px;
      margin: 0 auto;
    }

    #accessible-chart {
      height: 450px;
      margin: 20px 0;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    .data-table th,
    .data-table td {
      padding: 12px;
      text-align: left;
      border: 1px solid #ddd;
    }

    .data-table th {
      background: #f5f5f5;
      font-weight: 600;
    }

    .sr-announcement {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
    }

    @media (max-width: 768px) {
      #accessible-chart {
        height: 350px;
      }

      .data-table {
        font-size: 14px;
      }
    }
  `]
})
export class AccessibleChartExampleComponent {
  chartData = [
    { region: 'North', sales: 450000 },
    { region: 'South', sales: 350000 },
    { region: 'East', sales: 280000 },
    { region: 'West', sales: 120000 }
  ];

  announcement = '';
  focusedIndex = 0;

  tooltipConfig = {
    enable: true,
    format: '${point.x}: ${point.y | currency}'
  };

  labelConfig = {
    visible: true,
    position: 'Inside',
    format: '${point.percentage}%'
  };

  handleKeyboard(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        this.focusedIndex = (this.focusedIndex + 1) % this.chartData.length;
        this.updateAnnouncement();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        this.focusedIndex = (this.focusedIndex - 1 + this.chartData.length) % this.chartData.length;
        this.updateAnnouncement();
        break;
    }
  }

  onPointSelected(args: IPointEventArgs) {
    const item = this.chartData[args.pointIndex];
    this.announcement = `${item.region}: ${item.sales} in sales`;
  }

  onPointRender(args: IAccumulationEventArgs) {
    // Use accessible colors
    const colors = ['#0173B2', '#DE8F05', '#CC78BC', '#CA9161'];
    args.fill = colors[args.pointIndex % colors.length];
  }

  updateAnnouncement() {
    const item = this.chartData[this.focusedIndex];
    this.announcement = `${item.region} region selected`;
  }

  getTotalSales(): number {
    return this.chartData.reduce((sum, item) => sum + item.sales, 0);
  }
}
```

## Key Takeaways

- **WCAG 2.1 AA**: Meet accessibility standards for all users
- **Keyboard Navigation**: Support full keyboard control
- **ARIA Labels**: Provide semantic information for screen readers
- **Color Contrast**: Ensure 4.5:1 minimum ratio for text
- **Responsive**: Adapt to all screen sizes and devices
- **Alternative Content**: Provide data tables for assistive tech
- **Testing**: Validate with accessibility tools and real users

---

## API Reference Summary

### Accessibility APIs

| API | Description | Documentation Link |
|-----|-------------|-------------------|
| `enablePersistence` | Persist component state | [enablePersistence](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#enablepersistence) |
| `enableSmartLabels` | Automatic label arrangement | [enableSmartLabels](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#enablesmartlabels) |

### Responsive APIs

| API | Description | Documentation Link |
|-----|-------------|-------------------|
| `width` | Chart width (responsive: '100%') | [width](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#width) |
| `height` | Chart height | [height](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#height) |
| `resized` | Fires on chart resize | [resized](https://ej2.syncfusion.com/angular/documentation/api/accumulation-chart/accumulationChart#resized) |

**For complete API documentation, see:** [api-reference.md](references/api-reference.md)