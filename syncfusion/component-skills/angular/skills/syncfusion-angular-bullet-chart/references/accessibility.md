# Accessibility in Syncfusion Angular Bullet Chart

## Table of Contents
- [Overview](#overview)
    - [Compliance Standards](#compliance-standards)
    - [Accessibility Features](#accessibility-features)
- [Wcag Compliance](#wcag-compliance)
    - [Wcag 22 Levels](#wcag-22-levels)
    - [Key Wcag Principles](#key-wcag-principles)
- [Keyboard Navigation](#keyboard-navigation)
    - [Keyboard Shortcuts](#keyboard-shortcuts)
    - [Example Keyboard Navigation Implementation](#example-keyboard-navigation-implementation)
    - [Best Practice: Trap Tab Within Chart](#best-practice-trap-tab-within-chart)
- [Screen Reader Support](#screen-reader-support)
    - [Aria Attributes](#aria-attributes)
    - [Implementation With Ariaobile Accessibility](#mobile-accessibility)
    - [Responsive Text Sizing](#responsive-text-sizing)
- [Color Contrast](#color-contrast)
  - [WCAG AA Color Contrast Requirements](#wcag-aa-color-contrast-requirements)
  - [Testing Color Contrast](#testing-color-contrast)
  - [Accessible Color Palette](#accessible-color-palette)
  - [High Contrast Theme](#high-contrast-theme)
- [Mobile Accessibility](#mobile-accessibility)
    - [Touch Interactions](#touch-interactions)
    - [Responsive Text Sizing](#responsive-text-sizing)
    - [Touch Friendly Tooltips](#touch-friendly-tooltips)
- [Wai Aria Attributes](#wai-aria-attributes)
    - [Complete Aria Implementation](#complete-aria-implementation)
- [Implementation Guidelines](#implementation-guidelines)
    - [Step 1 Semantic Html](#step-1-semantic-html)
    - [Step 2 Descriptive Labels](#step-2-descriptive-labels)
    - [Step 3 Focus Management](#step-3-focus-management)
    - [Step 4 Alternative Content](#step-4-alternative-content)
- [Testing Accessibility](#testing-accessibility)
    - [Tools to Use](#tools-to-use)
    - [Manual Testing Checklist](#manual-testing-checklist)
- [Best Practices Summary](#best-practices-summary)
- [Resources](#resources)

## Overview

The Syncfusion Angular Bullet Chart follows accessibility standards and guidelines to ensure that all users, including those with disabilities, can effectively use the component.

### Compliance Standards

The Bullet Chart is compliant with:
- **WCAG 2.2** - Web Content Accessibility Guidelines Level AA
- **Section 508** - Federal accessibility standard
- **ADA** - Americans with Disabilities Act
- **WAI-ARIA 1.2** - Web Accessibility Initiative - Accessible Rich Internet Applications

### Accessibility Features

| Feature | Support | Details |
|---------|---------|---------|
| Screen Reader Support | ✓ Yes | Full ARIA support for assistive technologies |
| Keyboard Navigation | ✓ Yes | Tab, Shift+Tab, Ctrl+P navigation |
| Color Contrast | ✓ Yes | Meets WCAG AA standard (4.5:1 minimum) |
| Keyboard-Only Access | ✓ Yes | No mouse required for full functionality |
| Mobile Support | ✓ Yes | Touch-friendly on mobile devices |
| Focus Indicators | ✓ Yes | Clear focus management |
| RTL Support | ✓ Yes | Right-to-left language support |
| Text Scaling | ✓ Yes | Responsive to user font size preferences |

---

## WCAG Compliance

### WCAG 2.2 Levels

The Bullet Chart meets these levels:

- **Level A**: Basic accessibility features
- **Level AA**: Enhanced accessibility (recommended minimum)
- **Level AAA**: Enhanced accessibility (advanced)

### Key WCAG Principles

1. **Perceivable**: Information is visible and perceivable
2. **Operable**: Users can navigate with keyboard or assistive devices
3. **Understandable**: Content is clear and predictable
4. **Robust**: Compatible with assistive technologies

---

## Keyboard Navigation

### Keyboard Shortcuts

The Bullet Chart supports these keyboard interactions:

| Key | Action | Purpose |
|-----|--------|---------|
| <kbd>Tab</kbd> | Move forward | Navigate to next interactive element |
| <kbd>Shift + Tab</kbd> | Move backward | Navigate to previous interactive element |
| <kbd>Ctrl + P</kbd> | Print | Print the Bullet Chart |
| <kbd>Enter</kbd> | Select | Activate focused element |
| <kbd>Space</kbd> | Toggle | Toggle focused element state |

### Example: Keyboard Navigation Implementation

```typescript
import { Component, ViewChild , HostListener} from '@angular/core';
import { BulletChartModule } from '@syncfusion/ej2-angular-charts';
import { BulletChartComponent } from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [BulletChartModule],
    standalone: true,
    selector:'app-container',
    template: `
        <div>
            <button (click)="printChart()" aria-label="Print chart">
                Print Chart (Ctrl+P)
            </button>
            <ejs-bulletchart 
                #bulletChart
                [dataSource]='data'
                valueField='value'
                targetField='target'
                role='img'
                [attr.aria-label]='chartAriaLabel'>
            </ejs-bulletchart>
        </div>
    `,

})
export class AppComponent {
    @ViewChild('bulletChart') chart!: BulletChartComponent;

    public data = [
        { value: 100, target: 80 },
        { value: 200, target: 180 }
    ];

    public chartAriaLabel = 'Bullet Chart showing sales performance: actual vs target';
    @HostListener('window:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.ctrlKey && (event.key === 'p' || event.key === 'P')) {
            event.preventDefault();
            this.printChart();
        }
    }
    printChart(): void {
        this.chart.print();
    }
}
```

### Best Practice: Trap Tab Within Chart

```typescript
export class AppComponent {
    // Ensure keyboard focus cycles within the chart container
    hostElement.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            // Manage focus order within chart
            this.manageFocusOrder();
        }
    });
    manageFocusOrder(){
            // Get all focusable items: the button + the internal SVG elements
        const focusableSelectors = '[tabindex="0"]';
        const focusableElements = Array.from(document.querySelectorAll(focusableSelectors)) as HTMLElement[];
        
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) { // Shift + Tab (Backward)
            if (document.activeElement === first) {
                last.focus();
                event.preventDefault();
            }
        } else { // Tab (Forward)
            if (document.activeElement === last) {
                first.focus();
                event.preventDefault();
            }
        }
    }
}
```

---

## Screen Reader Support

### ARIA Attributes

The component uses these ARIA attributes:

```typescript
// Role attributes
role="img"                          // Chart is an image
role="button"                       // Interactive elements
role="tablist"                      // Tab groups
role="table"                        // Tabular data

// Label attributes
aria-label="Chart description"      // Descriptive label
aria-labelledby="chartTitle"        // References title element
aria-describedby="chartDesc"        // Detailed description

// State attributes
aria-pressed="true/false"           // Toggle states
aria-expanded="true/false"          // Expanded/collapsed state
aria-disabled="true/false"          // Disabled state
```

### Implementation with ARIA

```typescript
import { Component } from '@angular/core';
import { BulletChartModule } from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [BulletChartModule],
    standalone: true,
    template: `
        <div role="region" [attr.aria-labelledby]="'chart-title'">
            <h2 id="chart-title">Sales Performance Dashboard</h2>
            <p id="chart-description">
                This Bullet Chart displays quarterly sales performance 
                compared to targets. Green indicates good performance, 
                yellow indicates fair, and red indicates poor performance.
            </p>
            
            <ejs-bulletchart 
                [dataSource]='data'
                valueField='value'
                targetField='target'
                role='img'
                [attr.aria-label]='generateAriaLabel()'
                [attr.aria-describedby]="'chart-description'">
            </ejs-bulletchart>
        </div>
    `
})
export class AccessibleDashboardComponent {
    public data = [
        { category: 'Q1', value: 25000, target: 30000 },
        { category: 'Q2', value: 28000, target: 30000 }
    ];

    generateAriaLabel(): string {
        return `Bullet Chart: ${this.data.length} quarters of sales data. ` +
               `Q1 actual 25000 vs target 30000. ` +
               `Q2 actual 28000 vs target 30000.`;
    }
}
```

### Screen Reader Best Practices

1. **Provide meaningful labels**: Use descriptive aria-labels
2. **Include context**: Describe what the chart shows
3. **Explain ranges**: Help users understand Good/Fair/Poor zones
4. **Use semantic HTML**: Use `<h2>`, `<p>`, `<table>` appropriately
5. **Add alternative text**: Provide textual alternatives to visual data

---

## Color Contrast

### WCAG AA Color Contrast Requirements

- **Normal text**: Minimum 4.5:1 ratio (foreground to background)
- **Large text**: Minimum 3:1 ratio
- **Graphics**: Minimum 3:1 ratio

### Testing Color Contrast

```typescript
// Example: Ensure good color contrast
const colorSchemes = {
    good: {
        background: '#ffffff',      // White
        text: '#000000',            // Black (21:1 ratio)
        accent: '#0066cc'           // Blue (8.59:1 ratio)
    },
    fair: {
        background: '#f0f0f0',      // Light gray
        text: '#333333',            // Dark gray (12.6:1 ratio)
        accent: '#0066cc'           // Blue (5.19:1 ratio)
    },
    accessible: {
        background: '#ffffff',
        text: '#000000',
        accent: '#004080'           // Darker blue for higher contrast
    }
};
```

### Accessible Color Palette

```typescript
// Range colors meeting WCAG AA contrast requirements
import { Component } from '@angular/core';
import { BulletChartModule, BulletRangeCollectionDirective, BulletRangeDirective } from '@syncfusion/ej2-angular-charts';
import { CommonModule } from '@angular/common';

@Component({
    imports: [BulletChartModule, CommonModule],
    selector: 'app-container',
    standalone: true,
    template: `
        <div [style.backgroundColor]="activeScheme.background" [style.color]="activeScheme.text" role="region">
            <h2 id="chart-title">Sales Performance Dashboard</h2>
            
            <ejs-bulletchart 
                [dataSource]='data'
                valueField='value'
                targetField='target'
                [valueFill]='activeScheme.accent'
                [targetColor]='activeScheme.text'
                [titleStyle]="{ color: activeScheme.text }"
                [labelStyle]="{ color: activeScheme.text }">
                
                <e-bullet-range-collection>
                    <!-- Loop through your accessible ranges -->
                    <e-bullet-range 
                        *ngFor="let range of accessibleRanges" 
                        [end]="range.end" 
                        [color]="range.color"
                        [opacity]="range.opacity">
                    </e-bullet-range>
                </e-bullet-range-collection>

            </ejs-bulletchart>
        </div>
    `
})
export class AppComponent {
    public data = [{ value: 120, target: 100 }];

    public accessibleRanges = [
        { end: 50, color: '#cc3333', opacity: 0.8 },   // Red (Poor)
        { end: 100, color: '#ff9900', opacity: 0.8 },  // Orange (Fair)
        { end: 150, color: '#009933', opacity: 0.8 }   // Green (Good)
    ];

    public activeScheme = {
        background: '#ffffff',
        text: '#000000',
        accent: '#004080'
    };
}

```

### High Contrast Theme

```typescript
<ejs-bulletchart 
    theme='Highcontrast'
    [dataSource]='data'
    valueField='value'
    targetField='target'>
</ejs-bulletchart>
```

---

## Mobile Accessibility

### Touch Interactions

The Bullet Chart supports accessible touch interactions:

```typescript
import { Component } from '@angular/core';
import { BulletChartModule } from '@syncfusion/ej2-angular-charts';
import { BulletTooltipService} from '@syncfusion/ej2-angular-charts'

@Component({
    imports: [BulletChartModule],
    providers: [ BulletTooltipService ],
    standalone: true,
    selector: 'app-container',
    template: `<ejs-bulletchart 
        [dataSource]='data'
        valueField='value'
        targetField='target'
        [tooltip]='{ enable: true }'>
    </ejs-bulletchart>`
    
})
export class AppComponent {
    public data = [
        { value: 100, target: 80 },
        { value: 200, target: 180 }
    ];
}

```

### Responsive Text Sizing

```css
/* Ensure text scales with device size */
.e-bulletchart .e-title-text {
    font-size: clamp(16px, 4vw, 24px);  /* Responsive font size */
}

.e-bulletchart .e-axis-label {
    font-size: clamp(12px, 2vw, 16px);
}

.e-bulletchart .e-data-label {
    font-size: clamp(11px, 1.8vw, 14px);
}
```

### Touch-Friendly Tooltips

```typescript
public tooltipConfig = {
    enable: true,
    template: '<div style="padding: 12px; font-size: 14px;">' +
        '<b>${category}</b><br/>' +
        'Value: ${value}<br/>' +
        'Target: ${target}</div>',
    fill: '#ffffff',
    border: { color: '#000000', width: 2 }  // Thicker border for touch
};
```

---

## WAI-ARIA Attributes

### Complete ARIA Implementation

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { BulletChartModule } from '@syncfusion/ej2-angular-charts';
import { CommonModule } from '@angular/common';

@Component({
    imports: [BulletChartModule,CommonModule],
    standalone: true,
    selector: 'app-container',
    template: `
        <div role="region" [attr.aria-labelledby]="'chart-title'">
            <h2 id="chart-title" class="sr-only">Performance Dashboard</h2>
            
            <div id="chart-live" aria-live="polite" aria-atomic="true">
                <ejs-bulletchart 
                    #bulletChart
                    [dataSource]='data'
                    valueField='value'
                    targetField='target'
                    categoryField='category' 
                    role='img'
                    [attr.aria-label]='getChartLabel()'
                    [attr.aria-describedby]="'chart-description'">
                </ejs-bulletchart>
            </div>
            
            <p id="chart-description" class="sr-only">
                Bullet Chart showing quarterly sales performance. 
                Each bullet displays actual sales (blue bar) vs target (red line).
                Green range indicates good performance (above 80% of target),
                yellow indicates fair (60-80%), and red indicates poor (below 60%).
            </p>
          
            <!-- Data table for screen readers -->
            <table class="sr-only">
                <caption>Sales Performance Data</caption>
                <thead>
                    <tr>
                        <th>Quarter</th>
                        <th>Actual</th>
                        <th>Target</th>
                        <th>Performance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let item of data">
                        <td>{{ item.category }}</td>
                        <td>{{ item.value }}</td>
                        <td>{{ item.target }}</td>
                        <td>{{ getPerformanceLevel(item) }}</td>
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
            border: 0;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    public data = [
        { category: 'Q1', value: 25000, target: 30000 },
        { category: 'Q2', value: 28000, target: 30000 },
        { category: 'Q3', value: 35000, target: 30000 }
    ];

    getChartLabel(): string {
        return 'Performance Dashboard with quarterly sales data. ' +
               'Bullet chart showing actual vs target performance.';
    }

    getPerformanceLevel(item: any): string {
        const percentage = (item.value / item.target) * 100;
        if (percentage >= 80) return 'Good';
        if (percentage >= 60) return 'Fair';
        return 'Poor';
    }
}
```

---

## Implementation Guidelines

### Step 1: Semantic HTML

```typescript
<section role="region" aria-labelledby="chart-title">
    <h2 id="chart-title">Performance Metrics</h2>
    <!-- Chart content -->
</section>
```

### Step 2: Descriptive Labels

```typescript
// Provide clear, descriptive labels
template = `<ejs-bulletchart 
    title='Q4 Sales Performance'
    subtitle='Actual Performance vs Target Goals'
    [attr.aria-label]='describeChart()'>
</ejs-bulletchart>`

describeChart(): string {
    return 'Bullet chart comparing actual sales to quarterly targets. ' +
           'Green indicates exceeding targets, yellow on-target, red below target.';
}
```

### Step 3: Focus Management

```typescript
// Ensure proper focus order
import { Component, ViewChild, AfterViewInit } from '@angular/core';

@Component({
    template: `
        <button #printBtn (click)="print()" tabindex="0">Print</button>
        <ejs-bulletchart #chart tabindex="0"></ejs-bulletchart>
    `
})
export class FocusManagementComponent implements AfterViewInit {
    @ViewChild('chart') chart: any;

    ngAfterViewInit(): void {
        // Ensure logical tab order
        this.chart.focusTo(0);  // Set initial focus
    }

    print(): void {
        // Keyboard accessible print function
    }
}
```

### Step 4: Alternative Content

```typescript
// Provide text alternative to visual representation
template = `
    <ejs-bulletchart [dataSource]='data' #chart></ejs-bulletchart>
    
    <details>
        <summary>View Chart Data as Table</summary>
        <table>
            <tr *ngFor="let item of data">
                <td>{{ item.category }}</td>
                <td>{{ item.value }}</td>
                <td>{{ item.target }}</td>
            </tr>
        </table>
    </details>
`
```


---

## Testing Accessibility

### Tools to Use

1. **Screen Readers**: NVDA (free), JAWS, VoiceOver
2. **Color Contrast**: WebAIM Contrast Checker, Axe DevTools
3. **ARIA Validation**: ARIA Authoring Practices Guide (APG)
4. **Automated Testing**: Axe-core, WebAIM accessibility checker

### Manual Testing Checklist

- [ ] Navigate using only keyboard (Tab, Shift+Tab, Enter)
- [ ] Test with screen reader enabled
- [ ] Verify color contrast meets WCAG AA
- [ ] Check focus indicators are visible
- [ ] Test with zoom at 200%
- [ ] Verify on mobile with accessibility features
- [ ] Test RTL mode if supported
- [ ] Validate all ARIA attributes

---

## Best Practices Summary

1. **Always use descriptive aria-labels** - Help screen reader users understand purpose
2. **Ensure keyboard access** - All features must work without mouse
3. **Maintain high contrast** - Meet WCAG AA minimum ratios
4. **Test with real AT** - Use actual screen readers during testing
5. **Provide alternatives** - Include data tables for complex visualizations
6. **Use semantic HTML** - Improves accessibility automatically
7. **Document accessibility** - Inform users of accessibility features
8. **Test on devices** - Check mobile and tablet accessibility
9. **Follow WCAG guidelines** - Aim for Level AA compliance minimum
10. **User feedback** - Include users with disabilities in testing

## Resources

- [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Section 508 Standards](https://www.section508.gov/)
- [WebAIM Accessibility Articles](https://webaim.org/)
- [Syncfusion Accessibility Documentation](https://ej2.syncfusion.com/angular/documentation/common/accessibility)
