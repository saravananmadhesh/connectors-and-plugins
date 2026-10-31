# Styling and Customization

## Table of Contents
- [Overview](#overview)
- [CSS Customization](#css-customization)
- [Panel Styling](#panel-styling)
- [Grid Configuration](#grid-configuration)
- [Integrating Components](#integrating-components)
- [Advanced Customization](#advanced-customization)
- [SystemJS Setup](#systemjs-setup)

## Overview

Dashboard Layout provides extensive customization through CSS classes, component properties, and integration with Syncfusion components. Customize panel appearance, grid dimensions, and embed complex components like Charts, Grids, and Gauges.

## CSS Customization

### Panel Header Styling

Customize the header appearance of panels:

```css
.e-dashboardlayout.e-control .e-panel .e-panel-container .e-panel-header {
  color: #754131;
  background-color: #c9e2f7;
  text-align: center;
  font-weight: bold;
  padding: 12px;
  border-bottom: 2px solid #0078d4;
}
```

### Panel Content Styling

Customize the main content area:

```css
.e-dashboardlayout.e-control .e-panel .e-panel-container .e-panel-content {
  background-color: #ffffff;
  padding: 16px;
  overflow: auto;
}
```

### Resize Handle Styling

Customize the resize icon appearance:

```css
.e-dashboardlayout.e-control .e-panel .e-panel-container .e-resize.e-double {
  color: #0378d5;
  font-size: 20px;
  height: 20px;
  width: 20px;
  opacity: 0.7;
}

.e-dashboardlayout.e-control .e-panel .e-panel-container .e-resize.e-double:hover {
  opacity: 1;
}
```

### Dashboard Background

```css
.e-dashboardlayout.e-control.e-responsive {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 10px;
}
```

## Panel Styling

### Component-Level Styles

```typescript
import { Component } from '@angular/core';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-styled-dashboard',
  standalone: true,
  imports: [DashboardLayoutModule],
  template: `
    <ejs-dashboardlayout 
      [columns]="5"
      [panels]="panels">
    </ejs-dashboardlayout>
  `,
  styles: [`
    :host ::ng-deep {
      .e-dashboardlayout.e-control .e-panel {
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        border-radius: 8px;
        border: 1px solid #e0e0e0;
      }
      
      .e-dashboardlayout.e-control .e-panel .e-panel-container .e-panel-header {
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 8px 8px 0 0;
      }
      
      .e-dashboardlayout.e-control .e-panel .e-panel-container .e-panel-content {
        background: #fafafa;
      }
    }
  `]
})
export class StyledDashboardComponent {
  public panels: any = [
    { sizeX: 1, sizeY: 1, row: 0, col: 0, header: 'Dashboard', content: 'Content' }
  ];
}
```

### CSS Classes for Panels

Add custom CSS classes to panels for targeted styling:

```typescript
public panels: any = [
  {
    id: 'sales',
    sizeX: 1,
    sizeY: 1,
    row: 0,
    col: 0,
    cssClass: 'panel-important highlight',
    content: 'Sales Data'
  },
  {
    id: 'stats',
    sizeX: 1,
    sizeY: 1,
    row: 0,
    col: 1,
    cssClass: 'panel-secondary',
    content: 'Statistics'
  }
];
```

```css
.e-dashboardlayout .e-panel.panel-important {
  border: 2px solid #ff6b6b !important;
}

.e-dashboardlayout .e-panel.highlight {
  background: #fffacd;
}

.e-dashboardlayout .e-panel.panel-secondary {
  opacity: 0.8;
}
```

### Themed Panel States

```css
/* Active/Selected state */
.e-dashboardlayout .e-panel.active {
  border: 2px solid #0078d4;
  box-shadow: 0 0 8px rgba(0, 120, 212, 0.3);
}

/* Disabled state */
.e-dashboardlayout .e-panel.disabled {
  opacity: 0.5;
  pointer-events: none;
}

/* Error state */
.e-dashboardlayout .e-panel.error {
  border-left: 4px solid #d32f2f;
  background-color: #ffebee;
}

/* Success state */
.e-dashboardlayout .e-panel.success {
  border-left: 4px solid #388e3c;
  background-color: #f1f8e9;
}
```

## Grid Configuration

### Grid Structure

Control grid dimensions with component properties:

```typescript
@Component({
  template: `
    <ejs-dashboardlayout 
      [columns]="columns"
      [cellSpacing]="cellSpacing"
      [cellAspectRatio]="cellAspectRatio"
      [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class GridConfigComponent {
  // Number of columns
  public columns = 5;
  
  // [horizontal, vertical] spacing in pixels
  public cellSpacing = [10, 10];
  
  // Width/height ratio
  public cellAspectRatio = 100 / 100;
  
  public panels: any = [];
}
```

### Panel Positioning Properties

```typescript
{
  id: 'panel1',
  row: 0,           // Grid row (0-based)
  col: 1,           // Grid column (0-based)
  sizeX: 2,         // Width in cells
  sizeY: 1,         // Height in cells
  content: 'Panel'
}
```

## Integrating Components

### Embedding Syncfusion Charts

```typescript
import { Component } from '@angular/core';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';
import { ChartAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-chart-dashboard',
  standalone: true,
  imports: [DashboardLayoutModule, ChartAllModule],
  template: `
    <ejs-dashboardlayout [columns]="5" [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class ChartDashboardComponent {
  public chartData = [
    { x: 'Jan', y: 35 },
    { x: 'Feb', y: 28 },
    { x: 'Mar', y: 34 }
  ];
  
  public panels: any = [
    {
      id: 'chart-panel',
      sizeX: 3,
      sizeY: 2,
      row: 0,
      col: 0,
      header: '<div>Sales Chart</div>',
      content: `
        <ejs-chart style="height:100%; width:100%">
          <e-series-collection>
            <e-series [dataSource]="chartData" xName='x' yName='y' type='Column'>
            </e-series>
          </e-series-collection>
        </ejs-chart>
      `
    }
  ];
}
```

### Embedding Syncfusion Grids

```typescript
import { GridModule } from '@syncfusion/ej2-angular-grids';

@Component({
  standalone: true,
  imports: [DashboardLayoutModule, GridModule],
  template: `
    <ejs-dashboardlayout [columns]="5" [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class GridDashboardComponent {
  public gridData = [
    { OrderID: 10248, CustomerName: 'Acme Corp', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'Business Inc', Freight: 11.61 }
  ];
  
  public panels: any = [
    {
      id: 'grid-panel',
      sizeX: 4,
      sizeY: 3,
      row: 0,
      col: 0,
      header: '<div>Orders Grid</div>',
      content: `
        <ejs-grid [dataSource]="gridData">
          <e-columns>
            <e-column field='OrderID' headerText='Order ID' width='100'></e-column>
            <e-column field='CustomerName' headerText='Customer' width='150'></e-column>
            <e-column field='Freight' headerText='Freight' width='100'></e-column>
          </e-columns>
        </ejs-grid>
      `
    }
  ];
}
```

### Embedding Syncfusion Gauges

```typescript
import { LinearGaugeModule } from '@syncfusion/ej2-angular-lineargauge';

@Component({
  standalone: true,
  imports: [DashboardLayoutModule, LinearGaugeModule],
  template: `
    <ejs-dashboardlayout [columns]="5" [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class GaugeDashboardComponent {
  public panels: any = [
    {
      id: 'gauge-panel',
      sizeX: 1,
      sizeY: 1,
      row: 0,
      col: 0,
      header: '<div>Performance</div>',
      content: `
        <ejs-lineargauge>
          <e-axes>
            <e-axis minimum='0' maximum='100'>
              <e-pointers>
                <e-pointer value='75'></e-pointer>
              </e-pointers>
            </e-axis>
          </e-axes>
        </ejs-lineargauge>
      `
    }
  ];
}
```

## SystemJS Setup

For legacy Angular applications using SystemJS:

### 1. Install Dashboard Layout Package

```bash
npm install @syncfusion/ej2-angular-layouts --save
npm install @syncfusion/ej2-layouts --save
npm install @syncfusion/ej2-base --save
```

### 2. Configure systemjs.config.js

```javascript
(function (global) {
  System.config({
    paths: {
      'npm:': 'node_modules/',
      'syncfusion:': 'node_modules/@syncfusion/'
    },
    map: {
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      
      '@syncfusion/ej2-base': 'syncfusion:ej2-base/dist/ej2-base.umd.min.js',
      '@syncfusion/ej2-layouts': 'syncfusion:ej2-layouts/dist/ej2-layouts.umd.min.js',
      '@syncfusion/ej2-angular-base': 'syncfusion:ej2-angular-base/dist/ej2-angular-base.umd.min.js',
      '@syncfusion/ej2-angular-layouts': 'syncfusion:ej2-angular-layouts/dist/ej2-angular-layouts.umd.min.js'
    },
    packages: {
      '@syncfusion': { defaultExtension: 'js' }
    }
  });
})(this);
```

### 3. Import in Module

```typescript
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';

@NgModule({
  imports: [DashboardLayoutModule]
})
export class AppModule { }
```

### 4. Load Styles

```html
<!-- In index.html -->
<link rel="stylesheet" href="node_modules/@syncfusion/ej2-base/styles/material3.css">
<link rel="stylesheet" href="node_modules/@syncfusion/ej2-angular-layouts/styles/material3.css">
```

## Best Practices

### 1. Use CSS Variables

```css
--e-primary: Main color
--e-secondary: Secondary color
--e-surface: Background color
--e-text-on-primary: Text on primary color
```

### 2. Responsive Breakpoints

```css
/* Desktop */
@media (min-width: 1024px) {
  .e-dashboardlayout .e-panel { /* styles */ }
}

/* Tablet */
@media (min-width: 600px) and (max-width: 1023px) {
  .e-dashboardlayout .e-panel { /* styles */ }
}

/* Mobile */
@media (max-width: 599px) {
  .e-dashboardlayout .e-panel { /* styles */ }
}
```

### 3. Accessibility

```css
/* Focus visible for keyboard navigation */
.e-dashboardlayout .e-panel:focus-visible {
  outline: 2px solid #0078d4;
  outline-offset: 2px;
}

/* High contrast mode */
@media (prefers-contrast: more) {
  .e-dashboardlayout .e-panel {
    border: 2px solid;
  }
}
```

## Security & Content Configuration

### enableHtmlSanitizer - XSS Prevention

The Dashboard Layout component sanitizes HTML content by default to prevent Cross-Site Scripting (XSS) attacks.

#### Secure Configuration (Recommended)

Enable HTML sanitization for any user-generated or external content:

```typescript
import { Component } from '@angular/core';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-secure-dashboard',
  standalone: true,
  imports: [DashboardLayoutModule],
  template: `
    <ejs-dashboardlayout 
      [enableHtmlSanitizer]="true"
      [columns]="5"
      [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class SecureDashboardComponent {
  public panels = [
    {
      id: 'panel1',
      row: 0,
      col: 0,
      sizeX: 2,
      sizeY: 1,
      header: 'Secure Panel',
      content: '<h3>This content is sanitized</h3><p>XSS attempts are blocked</p>'
    },
    {
      id: 'panel2',
      row: 0,
      col: 2,
      sizeX: 2,
      sizeY: 1,
      header: 'User Content',
      content: this.getUserContent()  // User-supplied content is safe
    }
  ];
  
  getUserContent(): string {
    // Content from user input is automatically sanitized
    return '<p>User provided content here - XSS safe</p>';
  }
}
```

**Benefits:**
- ✅ Prevents XSS attacks and malicious HTML injection
- ✅ Blocks javascript: URLs and event handlers
- ✅ Sanitizes dangerous CSS properties
- ✅ Safe for all user-generated content
- ✅ Default and recommended setting for security

#### Performance Configuration (Use Only with Trusted Content)

Disable sanitization only when content is from trusted internal sources:

```typescript
<ejs-dashboardlayout 
  [enableHtmlSanitizer]="false"
  [columns]="5"
  [panels]="trustedPanels">
</ejs-dashboardlayout>
```

**Use Only When:**
- ⚠️ Content is from trusted internal sources only
- ⚠️ You absolutely need maximum performance
- ⚠️ Content is NOT from user input or external APIs
- ⚠️ You have alternative security measures in place

### When to Enable/Disable enableHtmlSanitizer

| Scenario | Setting | Reason |
|----------|---------|--------|
| User-generated content | `true` (Enable) | ✅ Prevents XSS attacks |
| External API content | `true` (Enable) | ✅ Blocks malicious injection |
| Public-facing dashboard | `true` (Enable) | ✅ Recommended for security |
| Customer portals | `true` (Enable) | ✅ Default and secure |
| Internal trusted content | `false` (Disable) | ⚠️ Only with absolute trust |
| Performance-critical internal | `false` (Disable) | ⚠️ With alternative security |

### Content Security Policy (CSP)

Work with Content Security Policy headers:

```typescript
// Enable sanitization for CSP compliance
[enableHtmlSanitizer]="true"  // Recommended with CSP

// Trust content only if you control the source
[enableHtmlSanitizer]="false" // Only for trusted internal content
```

### Common XSS Attack Prevention

The sanitizer automatically blocks:

```html
<!-- Blocked: Script tags -->
<script>alert('XSS')</script>

<!-- Blocked: Event handlers -->
<div onclick="maliciousCode()">Click me</div>

<!-- Blocked: Dangerous URLs -->
<a href="javascript:alert('XSS')">Link</a>

<!-- Blocked: Dangerous CSS -->
<div style="behavior:url(xss.htc)">

<!-- Allowed: Safe content -->
<h3>Title</h3>
<p>Paragraph content</p>
<strong>Bold text</strong>
```

