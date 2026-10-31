# Accessibility

Build accessible 3D charts that comply with WCAG 2.1 standards and support all users.

## Table of Contents

- [WCAG 2.1 Compliance](#wcag-21-compliance)
  - [Compliance Levels](#compliance-levels)
- [Keyboard Navigation](#keyboard-navigation)
  - [Enable Keyboard Support](#enable-keyboard-support)
  - [Keyboard Shortcuts](#keyboard-shortcuts)
  - [Navigation Example](#navigation-example)
- [ARIA Attributes](#aria-attributes)
  - [Add ARIA Labels](#add-aria-labels)
  - [ARIA Roles](#aria-roles)
- [Screen Reader Support](#screen-reader-support)
  - [Provide Text Alternatives](#provide-text-alternatives)
  - [Summary for Screen Readers](#summary-for-screen-readers)
- [Color Contrast](#color-contrast)
  - [Ensure Sufficient Contrast](#ensure-sufficient-contrast)
  - [Color-Blind Friendly Palettes](#color-blind-friendly-palettes)
- [Focus Indicators](#focus-indicators)
  - [Visible Focus States](#visible-focus-states)
- [Motion and Animation](#motion-and-animation)
  - [Respect Prefers-Reduced-Motion](#respect-prefers-reduced-motion)
- [Accessible Data Labels](#accessible-data-labels)
  - [Large Readable Labels](#large-readable-labels)
- [Accessibility Checklist](#accessibility-checklist)
  - [Pre-Implementation](#pre-implementation)
  - [Implementation](#implementation)
  - [Testing](#testing)
  - [Common Issues](#common-issues)
- [Testing Tools](#testing-tools)
- [Resources](#resources)
- [Accessibility Statement Example](#accessibility-statement-example)

## WCAG 2.1 Compliance

### Compliance Levels

- **Level A:** Basic compliance (minimal)
- **Level AA:** Recommended standard
- **Level AAA:** Enhanced accessibility (optional)

The Syncfusion 3D Chart aims for **WCAG 2.1 Level AA** compliance.

## Keyboard Navigation

### Enable Keyboard Support

```typescript
import { Component } from '@angular/core';
import { Chart3DAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-accessibility',
  standalone: true,
  imports: [Chart3DAllModule],
  template: `
    <ejs-chart3d [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="x" yName="y" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class AccessibilityComponent {
  primaryXAxis = {
        valueType: 'Category'
  }
  data = [
    { x: 'A', y: 40 },
    { x: 'B', y: 50 }
  ];
}
```

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Focus chart |
| `Arrow Keys` | Navigate between points |
| `Enter` | Select point |
| `Escape` | Clear selection |
| `Ctrl+G` | Focus legend |
| `Ctrl+Shift+E` | Export chart |

### Navigation Example

```typescript
@Component({
  template: `
    <ejs-chart3d 
      tabindex="0" [primaryXAxis]='primaryXAxis'
      (keydown)="handleKeyboard($event)">
      <e-chart3d-series-collection>
        <e-chart3d-series 
          [dataSource]="data" 
          xName="x" 
          yName="y" 
          type="Column"
          selectionMode="Point">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class KeyboardNavComponent {
  primaryXAxis = {
            valueType: 'Category'
  }
  data = [
    { x: 'A', y: 40 },
    { x: 'B', y: 50 }
  ];

  handleKeyboard(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      // Select next point
    } else if (event.key === 'ArrowLeft') {
      // Select previous point
    }
  }
}
```

## ARIA Attributes

### Add ARIA Labels

Provide meaningful labels for screen readers:

```typescript
@Component({
  template: `
    <div role="img" attr.aria-label="3D Chart showing sales by month">
      <ejs-chart3d 
        title="Monthly Sales"
        aria-label="Sales chart from January to December 2024">
        <e-chart3d-series-collection>
          <e-chart3d-series 
            [dataSource]="data" 
            xName="month" 
            yName="sales" 
            type="Column">
          </e-chart3d-series>
        </e-chart3d-series-collection>
      </ejs-chart3d>
      <p id="chart-desc">
        This chart displays monthly sales figures for 2024. 
        Total revenue across all months: $500,000.
      </p>
    </div>
  `
})
export class AriaLabelsComponent {
  data = [
    { month: 'Jan', sales: 40 },
    { month: 'Feb', sales: 50 }
  ];
}
```

### ARIA Roles

```html
<ejs-chart3d role="img" aria-label="Sales Chart"></ejs-chart3d>

<!-- Legend -->
<nav role="navigation" aria-label="Chart Legend">
  <!-- Legend items -->
</nav>

<!-- Data Points -->
<div role="button" tabindex="0" aria-label="January sales: $40,000"></div>
```

## Screen Reader Support

### Provide Text Alternatives

Create accessible data table alongside chart:

```typescript
@Component({
  template: `
    <div>
      <!-- Chart -->
      <ejs-chart3d #chart title="Sales Data" [primaryXAxis]='primaryXAxis'>
        <e-chart3d-series-collection>
          <e-chart3d-series [dataSource]="data" xName="month" yName="sales" type="Column">
          </e-chart3d-series>
        </e-chart3d-series-collection>
      </ejs-chart3d>
      
      <!-- Accessible Data Table -->
      <table role="presentation" [attr.aria-label]="'Data used in sales chart'">
        <caption>Monthly Sales Data</caption>
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">Sales ($)</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of data">
            <td>{{ item.month }}</td>
            <td>{{ item.sales | currency }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class ScreenReaderComponent {
  data = [
    { month: 'Jan', sales: 40000 },
    { month: 'Feb', sales: 50000 }
  ];
  primaryXAxis = {
    valueType: 'Category'
  }
}
```

### Summary for Screen Readers

```typescript
@Component({
  template: `
    <div>
      <ejs-chart3d [primaryXAxis]='primaryXAxis'>
        <e-chart3d-series-collection>
          <e-chart3d-series [dataSource]="data" xName="x" yName="y" type="Column">
          </e-chart3d-series>
        </e-chart3d-series-collection>
      </ejs-chart3d>
      
      <div class="sr-only" role="region" aria-live="polite">
        Sales chart showing 5 data points. 
        Highest value: 80 in May. 
        Lowest value: 40 in January.
      </div>
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
export class SummaryComponent {
  data = [{ x: 'A', y: 40 }];
  primaryXAxis = {
    valueType: 'Category'
  }
}
```

## Color Contrast

### Ensure Sufficient Contrast

Text and backgrounds must meet WCAG AA requirements (4.5:1 minimum):

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryXAxis]='primaryXAxis'
      [background]="'#ffffff'"
      [theme]="'Material'">
      <e-chart3d-series-collection>
        <e-chart3d-series 
          [dataSource]="data" 
          xName="x" 
          yName="y" 
          type="Column"
          [fill]="'#0066cc'">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class ContrastComponent {
  data = [{ x: 'A', y: 40 }];
  primaryXAxis = {
    valueType: 'Category'
  }
  
}
```

### Color-Blind Friendly Palettes

Use colors distinguishable by colorblind users:

```typescript
// Recommended palette (Protanopia-safe)
colors = [
  '#0173B2',  // Blue
  '#DE8F05',  // Orange
  '#CC78BC',  // Purple
  '#CA9161',  // Brown
  '#949494'   // Gray
];

// Avoid red-green contrast alone
// Add patterns or additional visual cues
```

## Focus Indicators

### Visible Focus States

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="x" yName="y" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `,
  styles: [`
    :host ::ng-deep .e-chart3d:focus {
      outline: 3px solid #4A90E2;
      outline-offset: 2px;
    }
    
    :host ::ng-deep .e-data-point:focus {
      stroke: #333;
      stroke-width: 2px;
    }
  `]
})
export class FocusIndicatorComponent {
  data = [{ x: 'A', y: 40 }];
  primaryXAxis = {
    valueType: 'Category'
  }
}
```

## Motion and Animation

### Respect Prefers-Reduced-Motion

```typescript
@Component({
  template: `
    <ejs-chart3d >
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="x" yName="y" type="Column" [animation]="shouldAnimate">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `,
  styles: [`
    @media (prefers-reduced-motion: reduce) {
      .e-chart3d {
        animation: none !important;
        transition: none !important;
      }
    }
  `]
})
export class MotionComponent implements OnInit {
  shouldAnimate = true;

  ngOnInit() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.shouldAnimate = !mediaQuery.matches;
  }
}
```

## Accessible Data Labels

### Large Readable Labels

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series 
          [dataSource]="data" 
          xName="x" 
          yName="y" 
          type="Column"
          [marker]="marker">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class AccessibleLabelsComponent {
  data = [{ x: 'A', y: 40 }];

  primaryXAxis = {
    valueType: 'Category'
  }

  marker = {
    dataLabel: {
      visible: true,
      font: {
        size: '14px',  // Min 12px
        color: '#333'  // High contrast
      }
    }
  };
}
```

## Accessibility Checklist

### Pre-Implementation
- [ ] Define WCAG target level (AA recommended)
- [ ] Plan keyboard navigation
- [ ] Design color palette (colorblind-safe)
- [ ] Create data summary

### Implementation
- [ ] Add ARIA labels and roles
- [ ] Implement keyboard shortcuts
- [ ] Ensure 4.5:1 contrast ratio
- [ ] Test focus indicators
- [ ] Respect prefers-reduced-motion

### Testing
- [ ] Test with keyboard only (no mouse)
- [ ] Test with screen reader (NVDA, JAWS)
- [ ] Check contrast ratios (WebAIM)
- [ ] Test with colorblind simulator
- [ ] Verify on mobile (touch + keyboard)

### Common Issues

| Issue | Solution |
|-------|----------|
| Can't navigate via keyboard | Add `tabindex="0"` and event handlers |
| Colors hard to distinguish | Use colorblind-friendly palette |
| Text too small | Use font-size ≥ 12px |
| Legend not labeled | Add `aria-label` to legend |
| No alternative text | Provide data table alongside chart |

## Testing Tools

- **WebAIM Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **WAVE Accessibility Tool:** Browser extension for testing
- **Axe DevTools:** Chrome DevTools extension
- **Screen Readers:** NVDA (free), JAWS, VoiceOver
- **Colorblind Simulator:** Chrome DevTools

## Resources

- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- ARIA Authoring Practices: https://www.w3.org/WAI/ARIA/apg/
- Accessible Data Visualizations: https://www.perceptualedge.com/

## Accessibility Statement Example

```html
<p>
  This 3D chart is designed to be accessible. It includes:
  - Keyboard navigation support
  - Screen reader compatible labels
  - High contrast color scheme
  - WCAG 2.1 Level AA compliance
  
  A data table alternative is provided below the chart.
  For accessibility issues, contact: accessibility@example.com
</p>
```

