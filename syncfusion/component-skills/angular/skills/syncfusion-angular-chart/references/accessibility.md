# Accessibility Reference for Syncfusion Angular Chart

## Table of Contents

- [Introduction](#introduction)
- [WCAG Compliance](#wcag-compliance)
  - [WCAG 2.2 Standards](#wcag-22-standards)
  - [Section 508 Compliance](#section-508-compliance)
- [Keyboard Navigation](#keyboard-navigation)
  - [Navigation Keys](#navigation-keys)
  - [Implementing Keyboard Support](#implementing-keyboard-support)
- [Screen Reader Support](#screen-reader-support)
  - [ARIA Attributes](#aria-attributes)
  - [Descriptive Labels](#descriptive-labels)
- [Color Contrast](#color-contrast)
  - [WCAG AA Requirements](#wcag-aa-requirements)
  - [High Contrast Mode](#high-contrast-mode)
- [Internationalization](#internationalization)
  - [Number Formatting](#number-formatting)
  - [Date Formatting](#date-formatting)
  - [Currency Display](#currency-display)
- [Localization](#localization)
  - [RTL Support](#rtl-support)
  - [Translating Text Content](#translating-text-content)
- [Testing Accessibility](#testing-accessibility)
- [Best Practices](#best-practices)
- [Accessibility Patterns](#accessibility-patterns)
- [Troubleshooting](#troubleshooting)

## Introduction

The Syncfusion Angular Chart component is designed with accessibility in mind, following industry standards including ADA, Section 508, WCAG 2.2, and WAI-ARIA guidelines. This ensures that charts are usable by everyone, including people with disabilities who rely on assistive technologies.

This reference guide covers all accessibility features, implementation details, and best practices for creating inclusive data visualizations.

## WCAG Compliance

### WCAG 2.2 Standards

The chart component meets WCAG 2.2 Level AA requirements:

| Accessibility Criteria | Compliance | Description |
|------------------------|------------|-------------|
| WCAG 2.2 Support | ✅ Full | Meets all Level AA success criteria |
| Section 508 Support | ✅ Full | Compliant with federal accessibility standards |
| Screen Reader Support | ✅ Full | Compatible with JAWS, NVDA, VoiceOver |
| RTL Support | ✅ Full | Right-to-left language support |
| Color Contrast | ✅ Full | Meets 4.5:1 minimum contrast ratio |
| Mobile Device Support | ✅ Full | Touch-friendly and responsive |
| Keyboard Navigation | ✅ Full | Full keyboard control support |
| Accessibility Checker | ✅ Validated | Tested with accessibility-checker |
| Axe-core Validation | ✅ Validated | Passes axe-core accessibility tests |

### Section 508 Compliance

The chart component adheres to Section 508 standards:

**§ 1194.21 Software Applications and Operating Systems:**
- ✅ Keyboard access to all functionality
- ✅ Focus indicators for all interactive elements
- ✅ Alternative text for non-text content
- ✅ Color not used as the only visual means of conveying information

**§ 1194.22 Web-based Intranet and Internet Information:**
- ✅ Text equivalents for every non-text element
- ✅ Equivalent alternatives for multimedia
- ✅ Organized layout without stylesheets
- ✅ Client-side image maps with text equivalents

## Keyboard Navigation

### Navigation Keys

The chart supports comprehensive keyboard navigation:

**General Navigation:**

| Key Combination | Action |
|-----------------|--------|
| <kbd>Alt + J</kbd> | Move focus to chart container |
| <kbd>Tab</kbd> | Move to next focusable element |
| <kbd>Shift + Tab</kbd> | Move to previous focusable element |
| <kbd>Enter / Space</kbd> | Activate/select focused element |
| <kbd>Esc</kbd> | Close tooltip or modal overlay |

**Series and Data Point Navigation:**

| Key | Action |
|-----|--------|
| <kbd>→</kbd> | Move to next data point |
| <kbd>←</kbd> | Move to previous data point |
| <kbd>↑</kbd> | Move to point above (if applicable) |
| <kbd>↓</kbd> | Move to point below (if applicable) |
| <kbd>Enter / Space</kbd> | Select focused data point |

**Legend Navigation:**

| Key | Action |
|-----|--------|
| <kbd>→</kbd> | Move to next legend item |
| <kbd>←</kbd> | Move to previous legend item |
| <kbd>↑</kbd> | Move up one legend item (vertical legend) |
| <kbd>↓</kbd> | Move down one legend item (vertical legend) |
| <kbd>Enter / Space</kbd> | Toggle series visibility |

**Zoom and Pan:**

| Key | Action |
|-----|--------|
| <kbd>Ctrl + +</kbd> | Zoom in |
| <kbd>Ctrl + -</kbd> | Zoom out |
| <kbd>←/→</kbd> | Pan horizontally (when enabled) |
| <kbd>↑/↓</kbd> | Pan vertically (when enabled) |
| <kbd>R</kbd> | Reset zoom/pan |

### Implementing Keyboard Support

**Basic Configuration:**

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { Component } from '@angular/core';
import { DateTimeService, StepLineSeriesService, LegendService, CategoryService, LineSeriesService } from '@syncfusion/ej2-angular-charts';

@Component({
  imports: [ChartModule],
  providers: [ CategoryService, DateTimeService, ColumnSeriesService],
  standalone: true,
  selector: 'app-accessible-chart',
  template: `
    <ejs-chart 
      id="chart-container"
      [title]='title'
      [primaryXAxis]='primaryXAxis'
      [primaryYAxis]='primaryYAxis'
      tabindex="0"
      role="img"
      [attr.aria-label]="chartAriaLabel">
      <e-series-collection>
        <e-series 
          [dataSource]='chartData' 
          xName='x' 
          yName='y'
          type='Column'
          name='Sales Data'>
        </e-series>
      </e-series-collection>
    </ejs-chart>
  `
})
export class AccessibleChartComponent {
  public title: string = 'Monthly Sales Report';
  public chartAriaLabel: string = 'Bar chart showing monthly sales data from January to December 2024';
  
  public chartData: Object[] = [
    { x: 'Jan', y: 35 },
    { x: 'Feb', y: 28 },
    { x: 'Mar', y: 34 }
  ];
  
  public primaryXAxis: Object = {
    title: 'Month',
    valueType: 'Category'
  };
  
  public primaryYAxis: Object = {
    title: 'Sales (in thousands)',
    labelFormat: '${value}K'
  };
}
```

**Custom Keyboard Handlers:**

```typescript
import { Component, HostListener, ViewChild } from '@angular/core';
import { ChartComponent } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-chart',
  template: `<ejs-chart #chart></ejs-chart>`
})
export class KeyboardChartComponent {
  @ViewChild('chart') chart: ChartComponent;
  private selectedPointIndex: number = 0;
  
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    // Alt + J to focus chart
    if (event.altKey && event.key === 'j') {
      event.preventDefault();
      this.focusChart();
    }
    
    // Arrow keys for navigation
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.navigateToNextPoint();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.navigateToPreviousPoint();
    }
    
    // Enter/Space to select
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.selectCurrentPoint();
    }
  }
  
  focusChart(): void {
    let chartElement = document.getElementById('chart-container');
    chartElement?.focus();
  }
  
  navigateToNextPoint(): void {
    this.selectedPointIndex = (this.selectedPointIndex + 1) % this.chartData.length;
    this.highlightPoint(this.selectedPointIndex);
    this.announcePoint(this.selectedPointIndex);
  }
  
  navigateToPreviousPoint(): void {
    this.selectedPointIndex = this.selectedPointIndex === 0 
      ? this.chartData.length - 1 
      : this.selectedPointIndex - 1;
    this.highlightPoint(this.selectedPointIndex);
    this.announcePoint(this.selectedPointIndex);
  }
  
  highlightPoint(index: number): void {
    // Visual highlight implementation
    this.chart.series[0].points[index].marker.visible = true;
    this.chart.refresh();
  }
  
  announcePoint(index: number): void {
    let point = this.chartData[index];
    let announcement = `${point.x}: ${point.y}`;
    this.updateAriaLive(announcement);
  }
  
  updateAriaLive(message: string): void {
    let liveRegion = document.getElementById('chart-live-region');
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  }
  
  selectCurrentPoint(): void {
    let point = this.chartData[this.selectedPointIndex];
    console.log('Selected point:', point);
    // Trigger selection logic
  }
}
```

**ARIA Live Region:**

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { Component } from '@angular/core';
import { DateTimeService, StepLineSeriesService, LegendService, CategoryService, LineSeriesService } from '@syncfusion/ej2-angular-charts';

@Component({
  imports: [ChartModule],
  providers: [ CategoryService, DateTimeService, ColumnSeriesService],
  standalone: true,
  selector: 'app-accessible-chart',
  template: `
    <div class="chart-wrapper">
      <ejs-chart #chart></ejs-chart>
      <div 
        id="chart-live-region" 
        class="sr-only" 
        role="status" 
        aria-live="polite" 
        aria-atomic="true">
      </div>
    </div>
  `,
  styles: [`
    .sr-only {
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    }
  `]
})

export class AccessibleChartComponent {
 
}
```

## Screen Reader Support

### ARIA Attributes

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

**Implementation Example:**

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { Component } from '@angular/core';
import { CategoryService, DateTimeService, ColumnSeriesService, LegendService } from '@syncfusion/ej2-angular-charts';

@Component({
  imports: [ChartModule],
  providers: [ CategoryService, DateTimeService, ColumnSeriesService, LegendService],
  standalone: true,
  selector: 'app-accessible-chart',
  template: `
    <ejs-chart
      role="img"
      [attr.aria-label]="chartDescription"
      [attr.aria-describedby]="'chart-details'">
      
      <e-series-collection>
        <e-series 
          [dataSource]='salesData'
          [attr.aria-label]="'Sales data series'">
        </e-series>
        <e-series 
          [dataSource]='targetData'
          [attr.aria-label]="'Target data series'">
        </e-series>
      </e-series-collection>
      
      <e-legendsettings
        visible='true'
        [attr.aria-label]="'Chart legend'">
      </e-legendsettings>
    </ejs-chart>
    
    <div id="chart-details" class="sr-only">
      <p>{{ detailedDescription }}</p>
      <ul>
        <li *ngFor="let item of accessibilityData">
          {{ item.label }}: {{ item.value }}
        </li>
      </ul>
    </div>
  `
})
export class ScreenReaderChartComponent {
  public chartDescription: string = 'Column chart comparing monthly sales versus targets for 2024';
  
  public detailedDescription: string = `
    This chart displays sales performance throughout the year.
    Sales are shown in blue columns, targets in red line.
    Use arrow keys to navigate between data points.
    Press Enter to select a data point for more details.
  `;
  
  public accessibilityData = [
    { label: 'Highest sales month', value: 'June with $85,000' },
    { label: 'Lowest sales month', value: 'February with $45,000' },
    { label: 'Average monthly sales', value: '$62,500' },
    { label: 'Target achievement', value: '94%' }
  ];
}
```

### Descriptive Labels

Provide meaningful descriptions for all chart elements:

```typescript
export class DescriptiveChartComponent {
  // Chart-level description
  public getChartLabel(): string {
    return `${this.title}. ${this.getChartType()} chart with ${this.seriesCount} series 
            showing data from ${this.startDate} to ${this.endDate}`;
  }
  
  // Series-level description
  public getSeriesLabel(series: any): string {
    return `${series.name} series. Type: ${series.type}. 
            ${series.data.length} data points from ${series.minValue} to ${series.maxValue}`;
  }
  
  // Point-level description
  public getPointLabel(point: any): string {
    return `${point.category}: ${point.value}. 
            ${this.getPointContext(point)}`;
  }
  
  private getPointContext(point: any): string {
    if (point.value === this.maxValue) {
      return 'Highest value in the series';
    } else if (point.value === this.minValue) {
      return 'Lowest value in the series';
    }
    return '';
  }
}
```

## Color Contrast

### WCAG AA Requirements

Ensure sufficient contrast ratios:

**Minimum Contrast Ratios:**
- Normal text: 4.5:1
- Large text (18pt+): 3:1
- UI components: 3:1
- Graphical objects: 3:1

**Implementation:**

```typescript
export class HighContrastChartComponent {
  // High contrast color palette
  public accessiblePalette: string[] = [
    '#0066CC',  // Blue (contrast: 8.59:1 on white)
    '#CC0000',  // Red (contrast: 5.25:1 on white)
    '#00AA00',  // Green (contrast: 4.51:1 on white)
    '#FF8800',  // Orange (contrast: 4.54:1 on white)
    '#6600CC'   // Purple (contrast: 6.22:1 on white)
  ];
  
  public chartArea: Object = {
    background: '#FFFFFF',  // White background
    border: {
      width: 2,
      color: '#000000'  // Black border (21:1 contrast)
    }
  };
  
  // Verify contrast programmatically
  verifyContrast(foreground: string, background: string): boolean {
    let ratio = this.calculateContrastRatio(foreground, background);
    return ratio >= 4.5;  // WCAG AA standard
  }
  
  calculateContrastRatio(fg: string, bg: string): number {
    let l1 = this.getLuminance(fg);
    let l2 = this.getLuminance(bg);
    let lighter = Math.max(l1, l2);
    let darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }
  
  getLuminance(color: string): number {
    // Convert color to RGB and calculate relative luminance
    // Implementation details...
    return 0;
  }
}
```

### High Contrast Mode

Support high contrast themes:

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { Component } from '@angular/core';
import { CategoryService, DateTimeService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts';

@Component({
  imports: [ChartModule],
  providers: [ CategoryService, DateTimeService, ColumnSeriesService],
  standalone: true,
  selector: 'app-accessible-chart',
  template: `
    <ejs-chart 
      [theme]='currentTheme'
      [palettes]='contrastPalette'>
      <!-- chart configuration -->
    </ejs-chart>
  `
})
export class HighContrastComponent implements OnInit {
  public currentTheme: string = 'Material';
  public contrastPalette: string[];
  
  ngOnInit() {
    this.detectHighContrastMode();
  }
  
  detectHighContrastMode(): void {
    // Check Windows high contrast mode
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      this.enableHighContrast();
    }
    
    // Listen for changes
    window.matchMedia('(prefers-contrast: high)').addEventListener('change', (e) => {
      if (e.matches) {
        this.enableHighContrast();
      } else {
        this.disableHighContrast();
      }
    });
  }
  
  enableHighContrast(): void {
    this.currentTheme = 'HighContrast';
    this.contrastPalette = [
      '#FFFFFF',  // White
      '#FFFF00',  // Yellow
      '#00FFFF',  // Cyan
      '#FF00FF',  // Magenta
      '#00FF00'   // Lime
    ];
  }
  
  disableHighContrast(): void {
    this.currentTheme = 'Material';
    this.contrastPalette = this.defaultPalette;
  }
}
```

**CSS for High Contrast:**

```css
/* High contrast mode styles */
@media (prefers-contrast: high) {
  .e-chart {
    border: 2px solid currentColor;
  }
  
  .e-chart .e-series-0 {
    fill: #FFFFFF;
    stroke: #000000;
    stroke-width: 2;
  }
  
  .e-chart .e-axis-line,
  .e-chart .e-grid-line {
    stroke: #FFFFFF;
    stroke-width: 2;
  }
  
  .e-chart .e-chart-title,
  .e-chart .e-axis-label {
    fill: #FFFFFF;
    font-weight: bold;
  }
}
```

## Internationalization

### Number Formatting

Format numbers according to locale:

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { Component } from '@angular/core';
import { CategoryService, DateTimeService, ColumnSeriesService, LegendService } from '@syncfusion/ej2-angular-charts';
import { loadCldr, L10n, setCulture } from '@syncfusion/ej2-base';

// Import CLDR data
import * as numberingSystems from 'cldr-data/supplemental/numberingSystems.json';
import * as gregorian from 'cldr-data/main/de/ca-gregorian.json';
import * as numbers from 'cldr-data/main/de/numbers.json';
import * as timeZoneNames from 'cldr-data/main/de/timeZoneNames.json';

loadCldr(numberingSystems, gregorian, numbers, timeZoneNames);

@Component({
  imports: [ChartModule],
  providers: [ CategoryService, DateTimeService, ColumnSeriesService],
  standalone: true,
  selector: 'app-intl-chart',
  template: `
    <select (change)="changeLocale($event.target.value)">
      <option value="en-US">English (US)</option>
      <option value="de-DE">German</option>
      <option value="fr-FR">French</option>
      <option value="ja-JP">Japanese</option>
    </select>
    
    <ejs-chart [locale]='locale'>
      <e-primaryyaxis [labelFormat]='labelFormat'></e-primaryyaxis>
      <e-series-collection>
        <e-series [dataSource]='data' [marker]='marker'></e-series>
      </e-series-collection>
    </ejs-chart>
  `
})
export class IntlChartComponent {
  public locale: string = 'en-US';
  public labelFormat: string = 'n2';  // Number format with 2 decimals
  
  public marker: Object = {
    dataLabel: {
      visible: true,
      format: 'n0'  // Number format without decimals
    }
  };
  
  changeLocale(locale: string): void {
    this.locale = locale;
    setCulture(locale);
    
    // Update format based on locale
    if (locale === 'de-DE') {
      this.labelFormat = 'n2';  // Uses German number format (1.234,56)
    } else if (locale === 'fr-FR') {
      this.labelFormat = 'n2';  // Uses French number format (1 234,56)
    }
  }
}
```

### Date Formatting

```typescript
export class DateIntlChartComponent {
  public primaryXAxis: Object = {
    valueType: 'DateTime',
    labelFormat: 'MMM yyyy',  // Will format according to locale
    skeleton: 'yMd'  // Use skeleton for locale-aware formatting
  };
  
  public locale: string = 'en-US';
  
  changeLocale(locale: string): void {
    this.locale = locale;
    setCulture(locale);
    // Date format automatically adapts to locale
    // en-US: 1/15/2024
    // de-DE: 15.1.2024
    // ja-JP: 2024/1/15
  }
}
```

### Currency Display

```typescript
export class CurrencyChartComponent {
  public locale: string = 'en-US';
  public currency: string = 'USD';
  
  public primaryYAxis: Object = {
    labelFormat: 'c2'  // Currency format with 2 decimals
  };
  
  public marker: Object = {
    dataLabel: {
      visible: true,
      format: 'c0'  // Currency without decimals
    }
  };
  
  changeRegion(locale: string, currency: string): void {
    this.locale = locale;
    this.currency = currency;
    setCulture(locale);
    
    // Currency symbols adapt to locale:
    // en-US, USD: $1,234.56
    // de-DE, EUR: 1.234,56 €
    // ja-JP, JPY: ¥1,235
  }
}
```

## Localization

### RTL Support

Support right-to-left languages:

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { Component } from '@angular/core';
import { CategoryService, DateTimeService, ColumnSeriesService, LegendService } from '@syncfusion/ej2-angular-charts';
import { enableRtl } from '@syncfusion/ej2-base';

@Component({
  imports: [ChartModule],
  providers: [ CategoryService, DateTimeService, ColumnSeriesService],
  standalone: true,
  selector: 'app-rtl-chart',
  template: `
    <div [dir]="direction">
      <ejs-chart 
        [enableRtl]='isRtl'
        [title]='title'>
        <e-series-collection>
          <e-series [dataSource]='data'></e-series>
        </e-series-collection>
      </ejs-chart>
    </div>
  `
})
export class RtlChartComponent {
  public isRtl: boolean = false;
  public direction: string = 'ltr';
  public title: string = 'Sales Report';
  
  enableRtlMode(): void {
    this.isRtl = true;
    this.direction = 'rtl';
    enableRtl(true);
    this.title = 'تقرير المبيعات';  // Arabic title
  }
  
  disableRtlMode(): void {
    this.isRtl = false;
    this.direction = 'ltr';
    enableRtl(false);
    this.title = 'Sales Report';
  }
}
```

### Translating Text Content

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { Component } from '@angular/core';
import { CategoryService, DateTimeService, ColumnSeriesService, LegendService } from '@syncfusion/ej2-angular-charts';
import { L10n } from '@syncfusion/ej2-base';

// Load German translations
L10n.load({
  'de': {
    'chart': {
      'Zoom': 'Zoomen',
      'ZoomIn': 'Hineinzoomen',
      'ZoomOut': 'Herauszoomen',
      'Reset': 'Zurücksetzen',
      'Pan': 'Schwenken',
      'ResetZoom': 'Zoom zurücksetzen'
    }
  }
});

// Load French translations
L10n.load({
  'fr': {
    'chart': {
      'Zoom': 'Zoom',
      'ZoomIn': 'Zoom avant',
      'ZoomOut': 'Zoom arrière',
      'Reset': 'Réinitialiser',
      'Pan': 'Panoramique',
      'ResetZoom': 'Réinitialiser le zoom'
    }
  }
});

@Component({
  imports: [ChartModule],
  providers: [ CategoryService, DateTimeService, ColumnSeriesService],
  standalone: true,
  selector: 'app-accessible-chart',
  template: `
    <ejs-chart [locale]='locale' [zoomSettings]='zoomSettings'>
    </ejs-chart>
  `
})
export class LocalizedChartComponent {
  public locale: string = 'de';
  
  public zoomSettings: Object = {
    enableSelectionZooming: true,
    enablePan: true,
    showToolbar: true  // Toolbar buttons will use localized text
  };
}
```

## Testing Accessibility

### Automated Testing

```typescript
import { TestBed } from '@angular/core/testing';
import { axe, toHaveNoViolations } from 'jest-axe';

describe('ChartComponent Accessibility', () => {
  beforeEach(() => {
    jasmine.addMatchers(toHaveNoViolations);
  });
  
  it('should have no accessibility violations', async () => {
    const fixture = TestBed.createComponent(ChartComponent);
    fixture.detectChanges();
    
    const results = await axe(fixture.nativeElement);
    expect(results).toHaveNoViolations();
  });
  
  it('should have proper ARIA labels', () => {
    const fixture = TestBed.createComponent(ChartComponent);
    const chartElement = fixture.nativeElement.querySelector('.e-chart');
    
    expect(chartElement.getAttribute('role')).toBe('img');
    expect(chartElement.getAttribute('aria-label')).toBeTruthy();
  });
  
  it('should be keyboard navigable', () => {
    const fixture = TestBed.createComponent(ChartComponent);
    const chartElement = fixture.nativeElement.querySelector('.e-chart');
    
    expect(chartElement.getAttribute('tabindex')).toBe('0');
  });
});
```

### Manual Testing Checklist

- [ ] Navigate chart using keyboard only
- [ ] Verify screen reader announces all data
- [ ] Test with high contrast mode
- [ ] Check color contrast ratios
- [ ] Verify focus indicators visible
- [ ] Test RTL layout if applicable
- [ ] Verify zoom/pan keyboard controls
- [ ] Test with different locales
- [ ] Check tooltip accessibility
- [ ] Verify legend keyboard interaction

## Best Practices

1. **Always Provide Text Alternatives:**
```typescript
<ejs-chart 
  [attr.aria-label]="comprehensiveDescription"
  [attr.aria-describedby]="'data-table'">
</ejs-chart>

<table id="data-table" class="sr-only">
  <!-- Tabular representation of chart data -->
</table>
```

2. **Use Semantic HTML:**
```html
<section aria-labelledby="chart-heading">
  <h2 id="chart-heading">Sales Analysis</h2>
  <ejs-chart></ejs-chart>
</section>
```

3. **Ensure Focus Management:**
```typescript
manageFocus(): void {
  // Save focus before modal/overlay
  this.previousFocus = document.activeElement;
  
  // Restore focus after closing
  setTimeout(() => {
    this.previousFocus?.focus();
  }, 0);
}
```

4. **Provide Data Table Alternative:**
```typescript
@Component({
  template: `
    <div class="chart-container">
      <ejs-chart [dataSource]='chartData'></ejs-chart>
      <button (click)="toggleDataTable()">
        {{ showTable ? 'Hide' : 'Show' }} Data Table
      </button>
      <table *ngIf="showTable" class="data-table">
        <caption>Chart Data in Table Format</caption>
        <thead>
          <tr>
            <th>Category</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of chartData">
            <td>{{ item.x }}</td>
            <td>{{ item.y }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
```

5. **Test with Real Users:**
   - Include users with disabilities in testing
   - Test with actual assistive technologies
   - Gather feedback and iterate

## Accessibility Patterns

### Pattern 1: Progressive Disclosure

```typescript
export class ProgressiveDisclosureChart {
  public summaryText: string = 'Sales increased by 15% in Q4';
  public showDetails: boolean = false;
  
  @Component({
    template: `
      <div class="chart-summary">
        <p>{{ summaryText }}</p>
        <button (click)="showDetails = !showDetails">
          {{ showDetails ? 'Hide' : 'Show' }} Detailed Chart
        </button>
      </div>
      
      <ejs-chart *ngIf="showDetails" 
        [attr.aria-label]="detailedDescription">
      </ejs-chart>
    `
  })
}
```

### Pattern 2: Sonification (Audio Charts)

```typescript
export class SonificationChart {
  playDataPoint(point: any): void {
    let audioContext = new AudioContext();
    let oscillator = audioContext.createOscillator();
    
    // Map data value to frequency
    let frequency = this.mapValueToFrequency(point.y);
    oscillator.frequency.value = frequency;
    
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
  }
  
  mapValueToFrequency(value: number): number {
    // Map value range to frequency range (200-800 Hz)
    let minFreq = 200;
    let maxFreq = 800;
    let normalized = (value - this.minValue) / (this.maxValue - this.minValue);
    return minFreq + (normalized * (maxFreq - minFreq));
  }
}
```

## Troubleshooting

### Screen Reader Not Announcing Data

**Issue:** Screen reader skips chart content
**Solutions:**
- Add `role="img"` to chart container
- Provide comprehensive `aria-label`
- Ensure chart is in DOM (not hidden)
- Check `aria-hidden` not set to true
- Add `tabindex="0"` for focus

### Keyboard Navigation Not Working

**Issue:** Cannot navigate with keyboard
**Solutions:**
- Verify `tabindex="0"` on chart
- Check for event handler conflicts
- Ensure focus styles visible
- Test without mouse
- Check z-index layering

### Low Color Contrast

**Issue:** Failing contrast checks
**Solutions:**
- Use contrast checker tool
- Apply high contrast palette
- Increase border widths
- Use patterns in addition to colors
- Test with high contrast mode

---
