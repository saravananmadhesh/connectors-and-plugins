# Appearance and Styling

## Table of Contents

- [Overview](#overview)
- [Custom Color Palettes](#custom-color-palettes)
  - [Default Palettes](#default-palettes)
  - [Multiple Palette Options](#multiple-palette-options)
  - [Apply Palettes to Specific Series](#apply-palettes-to-specific-series)
- [Point Color Customization](#point-color-customization)
  - [Color by Property](#color-by-property)
  - [Conditional Point Colors](#conditional-point-colors)
- [Series Styling](#series-styling)
  - [Border and Fill](#border-and-fill)
  - [Opacity and Transparency](#opacity-and-transparency)
  - [Marker Styling](#marker-styling)
- [Theme Application](#theme-application)
  - [Built-in Themes](#built-in-themes)
  - [Dark Mode Theme](#dark-mode-theme)
- [Chart Area Styling](#chart-area-styling)
  - [Background Color](#background-color)
  - [Border Styling](#border-styling)
  - [Chart Wall](#chart-wall)
- [Common Styling Patterns](#common-styling-patterns)
  - [Pattern 1 Corporate Branding](#pattern-1-corporate-branding)
  - [Pattern 2 Heatmap-Style Colors](#pattern-2-heatmap-style-colors)
  - [Pattern 3 Accessibility-Compliant Colors](#pattern-3-accessibility-compliant-colors)
  - [Pattern 4 Dark Theme Support](#pattern-4-dark-theme-support)
- [CSS Styling](#css-styling)
  [Override Styles](#override-styles)
- [Accessibility Considerations](#accessibility-considerations)
- [Performance Notes](#performance-notes)


## Overview

The 3D Chart component offers extensive styling options to match your application's design and brand guidelines.

## Custom Color Palettes

### Default Palettes

```typescript
import { Component } from '@angular/core';
import { Chart3DAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-appearance',
  standalone: true,
  imports: [Chart3DAllModule],
  template: `
    <ejs-chart3d [palettes]="colors" [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="x" yName="y" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class AppearanceComponent {
  data = [
    { x: 'A', y: 40 },
    { x: 'B', y: 50 }
  ];

  primaryXAxis = {
        valueType: 'Category'
  }

  colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
}
```

### Multiple Palette Options

```typescript
// Modern palette
colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'];

// Pastel palette
colors = ['#FFB3B3', '#B3D9FF', '#B3FFB3', '#FFFFB3', '#FFD9B3'];

// Brand colors
colors = ['#0066cc', '#00cc66', '#cc0066', '#66cc00', '#cc6600'];
```

### Apply Palettes to Specific Series

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series 
          [dataSource]="data" 
          xName="x" 
          yName="series1" 
          type="Column"
          fill="#FF6B6B">
        </e-chart3d-series>
        <e-chart3d-series 
          [dataSource]="data" 
          xName="x" 
          yName="series2" 
          type="Column"
          fill="#4ECDC4">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class MultiSeriesColorComponent {
  data = [
    { x: 'A', series1: 40, series2: 35 }
  ];

  primaryXAxis = {
        valueType: 'Category'
  }
}
```

## Point Color Customization

### Color by Property

Map data property to colors:

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series 
          [dataSource]="data" 
          xName="product" 
          yName="sales" 
          type="Column"
          pointColorMapping="color">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class PointColorComponent {
  data = [
    { product: 'A', sales: 40, color: '#FF6B6B' },
    { product: 'B', sales: 50, color: '#4ECDC4' },
    { product: 'C', sales: 45, color: '#45B7D1' }
  ];

  primaryXAxis = {
        valueType: 'Category'
  }
}
```

### Conditional Point Colors

Color based on value ranges:

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series 
          [dataSource]="processedData" 
          xName="month" 
          yName="sales" 
          type="Column"
          pointColorMapping="color">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class ConditionalColorComponent {
  rawData = [
    { month: 'Jan', sales: 40 },
    { month: 'Feb', sales: 80 },
    { month: 'Mar', sales: 35 }
  ];

  primaryXAxis = {
        valueType: 'Category'
  }

  get processedData() {
    return this.rawData.map(item => ({
      ...item,
      color: item.sales > 50 ? '#00cc66' : '#ff6b6b'
    }));
  }
}
```

## Series Styling

### Border and Fill

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
          [fill]="'#4ECDC4'"
          [border]="border">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class BorderSeriesComponent {
  data = [{ x: 'A', y: 40 }];

  border = {
    color: '#333',
    width: 2
  };

  primaryXAxis = {
        valueType: 'Category'
  }
}
```

### Opacity and Transparency

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
          [fill]="'#4ECDC4'"
          [opacity]="0.7">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class OpacityComponent {
  data = [{ x: 'A', y: 40 }];

  primaryXAxis = {
        valueType: 'Category'
  }
}
```

### Marker Styling

```typescript
marker = {
  height: 10,
  width: 10,
  border: { color: '#333', width: 2 },
  fill: '#fff',
  shape: 'Circle',  // Circle, Rectangle, Triangle, Diamond
  visible: true
};
```

## Theme Application

### Built-in Themes

Apply Syncfusion themes:

```typescript
@Component({
  template: `
    <ejs-chart3d theme="Material" [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="x" yName="y" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class ThemedComponent {
  data = [{ x: 'A', y: 40 }];

  primaryXAxis = {
        valueType: 'Category'
  }
}
```

**Available Themes:**
- `'Material'` (default)
- `'MaterialDark'`
- `'Bootstrap'`
- `'BootstrapDark'`
- `'Tailwind'`
- `'TailwindDark'`
- `'Fabric'`
- `'FabricDark'`
- `'HighContrast'`

### Dark Mode Theme

```typescript
@Component({
  template: `
    <ejs-chart3d [theme]="'MaterialDark'">
      ...
    </ejs-chart3d>
  `
})
export class DarkModeComponent { }
```

## Chart Area Styling

### Background Color

```typescript
@Component({
  template: `
    <ejs-chart3d background="#f5f5f5" [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="x" yName="y" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class ChartBackgroundComponent {
  data = [{ x: 'A', y: 40 }];

  primaryXAxis = {
        valueType: 'Category'
  }
}
```

### Border Styling

```typescript
@Component({
  template: `
    <ejs-chart3d [chartBorder]="border">
      ...
    </ejs-chart3d>
  `
})
export class BorderComponent {
  border = {
    color: '#999',
    width: 2
  };
}
```

### Chart Wall

Customize the 3D chart wall appearance:

```typescript
@Component({
  template: `
    <ejs-chart3d wallColor="#f9f9f9" [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="x" yName="y" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class WallColorComponent {
  data = [{ x: 'A', y: 40 }];

  primaryXAxis = {
        valueType: 'Category'
  }
}
```

## Common Styling Patterns

### Pattern 1: Corporate Branding

Apply company colors:

```typescript
colors = ['#003366', '#0066cc', '#00cc99', '#cccc00', '#ff6600'];

border = {
  color: '#003366',
  width: 2
};
```

### Pattern 2: Heatmap-Style Colors

Use gradient-like colors for value representation:

```typescript
data = [
  { month: 'Jan', sales: 20, color: '#0066cc' },   // Low
  { month: 'Feb', sales: 50, color: '#ffcc00' },   // Medium
  { month: 'Mar', sales: 80, color: '#ff0000' }    // High
];
```

### Pattern 3: Accessibility-Compliant Colors

Use high-contrast, colorblind-friendly colors:

```typescript
colors = [
  '#0173B2',  // Blue
  '#DE8F05',  // Orange
  '#CC78BC',  // Purple
  '#CA9161',  // Brown
  '#949494'   // Gray
];
```

### Pattern 4: Dark Theme Support

```typescript
@Component({
  template: `
    <ejs-chart3d [theme]="isDarkMode ? 'MaterialDark' : 'Material'">
      ...
    </ejs-chart3d>
  `
})
export class ThemeSwitchComponent {
  isDarkMode = false;
}
```

## CSS Styling

### Override Styles

Add custom CSS for additional styling:

```css
.e-chart3d {
  font-family: 'Segoe UI', sans-serif;
}

.e-chart3d .e-series {
  filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.2));
}

.e-chart3d .e-data-label {
  font-weight: bold;
}
```

## Accessibility Considerations

Color choices should:
- **Contrast:** Min 4.5:1 ratio for text
- **Colorblind-friendly:** Avoid red-green only distinction
- **Intent support:** Don't rely on color alone to convey meaning

## Performance Notes

- Use theme-based styling over custom colors when possible
- Limit custom colors to 8-10 for optimal rendering
- Cache color mappings for large datasets
