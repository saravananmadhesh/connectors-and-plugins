# Responsive and Adaptive Design

## Table of Contents
- [Overview](#overview)
- [Built-in Responsive Behavior](#built-in-responsive-behavior)
- [Customizing Breakpoints](#customizing-breakpoints)
- [Cell Aspect Ratio](#cell-aspect-ratio)
- [Advanced Patterns](#advanced-patterns)
- [Testing Responsive Layouts](#testing-responsive-layouts)

## Overview

Dashboard Layout automatically adapts to different screen sizes. On mobile devices, the layout transforms into a stacked single-column view. Customize this behavior using the `mediaQuery` property and responsive design patterns.

### Key Responsive Features

- **Auto-stacking:** Panels stack vertically on small screens
- **Custom Breakpoints:** Define when stacking occurs
- **Aspect Ratio:** Control cell height/width ratio
- **Parent Sizing:** Responsive parent containers
- **Touch-Friendly:** Works on mobile devices

## Built-in Responsive Behavior

### Default Responsive Behavior

By default, Dashboard Layout stacks panels into a single column when screen width is **600px or less**:

```typescript
import { Component } from '@angular/core';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-responsive',
  standalone: true,
  imports: [DashboardLayoutModule],
  template: `
    <ejs-dashboardlayout 
      [columns]="5"
      [cellSpacing]="[10, 10]"
      [panels]="panels">
      <!-- Automatically stacks below 600px -->
    </ejs-dashboardlayout>
  `,
  styles: [`
    :host { display: block; width: 100%; height: 100vh; }
  `]
})
export class ResponsiveComponent {
  public panels: any = [
    { sizeX: 1, sizeY: 1, row: 0, col: 0, content: 'Panel 1' },
    { sizeX: 2, sizeY: 1, row: 0, col: 1, content: 'Panel 2' },
    { sizeX: 1, sizeY: 2, row: 0, col: 3, content: 'Panel 3' }
  ];
}
```

**Desktop (600px+):** Panels arranged in 5-column grid
**Mobile (<600px):** All panels stacked in single column

## Customizing Breakpoints

### Change Breakpoint to 768px (Tablet)

```typescript
@Component({
  template: `
    <ejs-dashboardlayout 
      [mediaQuery]="'max-width: 768px'"
      [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class TabletBreakpointComponent {
  public panels: any = [
    { sizeX: 2, sizeY: 1, row: 0, col: 0, content: 'Panel 1' },
    { sizeX: 2, sizeY: 1, row: 0, col: 2, content: 'Panel 2' }
  ];
}
```

### Responsive Breakpoints for Device Types

```typescript
@Component({
  template: `
    <ejs-dashboardlayout 
      [mediaQuery]="activeMediaQuery"
      [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class DeviceResponsiveComponent implements OnInit {
  public activeMediaQuery = '(max-width: 600px)';
  public panels: any = [];
  
  ngOnInit() {
    this.updateBreakpoint();
    window.addEventListener('resize', () => this.updateBreakpoint());
  }
  
  private updateBreakpoint() {
    const width = window.innerWidth;
    
    if (width < 480) {
      this.activeMediaQuery = '(max-width: 480px)';  // Extra small
    } else if (width < 768) {
      this.activeMediaQuery = '(max-width: 767px)';  // Small
    } else if (width < 1024) {
      this.activeMediaQuery = '(max-width: 1023px)'; // Medium
    } else {
      this.activeMediaQuery = '(max-width: 1439px)'; // Large
    }
  }
}
```

### Media Query Patterns

Common CSS media query patterns:

```typescript
// Mobile first (less than)
'(max-width: 600px)'

// Desktop only (greater than)
'(min-width: 1024px)'

// Range
'(min-width: 768px) and (max-width: 1023px)'

// Pixel ratios (high DPI screens)
'(min-width: 320px) and (-webkit-min-device-pixel-ratio: 2)'

// Landscape/Portrait
'(orientation: portrait) and (max-width: 600px)'

// Complex
'(max-width: 600px), (max-width: 1024px) and (orientation: landscape)'
```

## Cell Aspect Ratio

The `cellAspectRatio` property controls cell height relative to width.

### Default Cell Aspect Ratio

Default ratio is `Auto` (cells are square):

```typescript
@Component({
  template: `
    <ejs-dashboardlayout 
      [columns]="5"
      [panels]="panels">
      <!-- Cells are square (1:1 ratio) -->
    </ejs-dashboardlayout>
  `
})
export class DefaultAspectComponent {
  public panels: any = [
    { sizeX: 1, sizeY: 1, row: 0, col: 0, content: 'Square cell' }
  ];
}
```

### Custom Aspect Ratios

```typescript
@Component({
  template: `
    <ejs-dashboardlayout 
      [columns]="5"
      [cellAspectRatio]="aspectRatio"
      [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class CustomAspectComponent {
  // Wider, shorter cells (100px width, 50px height)
  public aspectRatio = 100 / 50; // 2:1 ratio
  
  public panels: any = [
    { sizeX: 1, sizeY: 1, row: 0, col: 0, content: 'Wide cell' }
  ];
}
```

### Common Aspect Ratios

| Ratio | Value | Use Case |
|-------|-------|----------|
| Square | 1 | General dashboards |
| Wide | 16/9 | Video/media content |
| Ultra-wide | 21/9 | Widescreen displays |
| Tall | 9/16 | Mobile portraits |
| Golden | 1.618 | Aesthetic layouts |
| Short | 100/50 | Compact dashboards |

```typescript
// Video aspect ratio
cellAspectRatio: 16/9

// Compact/dense
cellAspectRatio: 100/40

// Spacious
cellAspectRatio: 100/100
```

