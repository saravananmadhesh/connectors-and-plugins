# Appearance, Titles & Styling

## Table of Contents

- [Title Configuration](#title-configuration)
  - [Add Chart Title](#add-chart-title)
  - [Add Subtitle](#add-subtitle)
- [Color Palettes](#color-palettes)
  - [Apply Predefined Palettes](#apply-predefined-palettes)
  - [Common Palettes](#common-palettes)
  - [Map Colors from Data](#map-colors-from-data)
- [Point Customization](#point-customization)
  - [Customize Individual Points](#customize-individual-points)
  - [Point Opacity](#point-opacity)
- [Series Styling](#series-styling)
  - [Configure Series Appearance](#configure-series-appearance)
  - [Explode Slices](#explode-slices)
  - [Explode All Slices](#explode-all-slices)
- [Border and Fill Styling](#border-and-fill-styling)
  - [Chart Background](#chart-background)
- [Advanced Appearance](#advanced-appearance)
  - [Dynamic Styling Based on Data](#dynamic-styling-based-on-data)
- [Troubleshooting](#troubleshooting)

---

## Title Configuration

### Add Chart Title

Display a main title for your chart:

```typescript
import { Component } from '@angular/core';
import { CircularChart3DAllModule  } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-chart-title',
  standalone: true,
  imports: [
    CircularChart3DAllModule 
  ],
  template: `
    <ejs-circularchart3d 
      id="chart" 
      title="Sales Distribution by Region"
      [titleStyle]="{ 
        fontFamily: 'Arial',
        fontStyle: 'Normal',
        fontWeight: 'bold',
        size: '18px',
        color: '#333',
        opacity: 0.5,
        textAlignment: 'Center',
        textOverflow": 'Wrap'
      }">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          [dataSource]="data" 
          xName="region" 
          yName="sales" 
          type="Pie">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  `
})
export class ChartTitleComponent {
  data = [
    { region: 'North', sales: 35 },
    { region: 'South', sales: 28 },
    { region: 'East', sales: 34 },
    { region: 'West', sales: 32 }
  ];
}
```

### Add Subtitle

Display a subtitle below the main title:

```typescript
@Component({
  template: `
    <ejs-circularchart3d 
      title="Sales Distribution"
      subTitle="Q4 2025 Results"
      [subTitleStyle]="{ 
        size: '14px',
        color: '#666',
        fontStyle: 'Italic'
      }">
      ...
    </ejs-circularchart3d>
  `
})
export class SubtitleComponent {}
```

---

## Color Palettes

### Apply Predefined Palettes

Use built-in color schemes:

```typescript
@Component({
  template: `
    <ejs-circularchart3d [palettes]="['#5DADE2', '#F39C12', '#48C9B0', '#E74C3C', '#9B59B6']">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          [dataSource]="data" 
          xName="category" 
          yName="value" 
          type="Pie">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  `
})
export class PaletteComponent {
  data = [
    { category: 'A', value: 25 },
    { category: 'B', value: 20 },
    { category: 'C', value: 30 },
    { category: 'D', value: 15 },
    { category: 'E', value: 10 }
  ];
}
```

### Common Palettes

**Material Design Colors:**
```typescript
palettes = [
  '#2196F3', '#FF5722', '#00BCD4', '#FF9800', '#9C27B0', '#8BC34A'
]
```

**Pastel Colors:**
```typescript
palettes = [
  '#FFB3BA', '#FFCCCB', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF'
]
```

**Vibrant Colors:**
```typescript
palettes = [
  '#FF3333', '#FF6600', '#FFFF00', '#00CC00', '#0066FF', '#9933FF'
]
```

### Map Colors from Data

Assign colors from data source:

```typescript
@Component({
  template: `
    <ejs-circularchart3d 
      [palettes]="customPalette">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          [dataSource]="coloredData" 
          xName="item" 
          yName="value" 
          type="Pie"
          pointColorMapping="color">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  `
})
export class DataColorMappingComponent {
  customPalette = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];

  coloredData = [
    { item: 'Product A', value: 35, color: '#FF6B6B' },
    { item: 'Product B', value: 25, color: '#4ECDC4' },
    { item: 'Product C', value: 40, color: '#45B7D1' }
  ];
}
```

---

## Point Customization

### Customize Individual Points

Modify appearance of specific data points:

```typescript
@Component({
  template: `
    <ejs-circularchart3d 
      (pointRender)="onPointRender($event)">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          [dataSource]="data" 
          xName="x" 
          yName="y" 
          type="Pie">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  `
})
export class PointCustomizationComponent {
  data = [
    { x: 'Q1', y: 25 },
    { x: 'Q2', y: 28 },
    { x: 'Q3', y: 22 },
    { x: 'Q4', y: 35 }
  ];

  onPointRender(args: any) {
    // Highlight Q4 (highest value)
    if (args.point.y === 35) {
      args.fill = '#FF6B6B';
      args.border = { color: '#B00000', width: 2 };
    }
  }
}
```

### Point Opacity

Control transparency of individual points:

```typescript
onPointRender(args: any) {
  // Make smaller values more transparent
  if (args.point.y < 20) {
    args.opacity = 0.6;  // 60% opaque
  } else {
    args.opacity = 1;    // 100% opaque
  }
}
```

---

## Series Styling

### Configure Series Appearance

Style the entire series:

```typescript
@Component({
  template: `
    <ejs-circularchart3d id="chart">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          [dataSource]="data" 
          xName="category" 
          yName="value" 
          type="Pie"
          [cornerRadius]="5"
          [explode]="false"
          opacity="0.9"
          pointColorMapping="color">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  `
})
export class SeriesStyleComponent {
  data = [
    { category: 'A', value: 30, color: '#5DADE2' },
    { category: 'B', value: 25, color: '#F39C12' },
    { category: 'C', value: 20, color: '#48C9B0' }
  ];
}
```

### Explode Slices

Separate slices from center on click or interaction:

```typescript
@Component({
  template: `
    <ejs-circularchart3d 
      id="chart"
      (pointClick)="onPointClick($event)">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          [dataSource]="data" 
          xName="x" 
          yName="y" 
          type="Pie"
          [explodeAll]="false"
          explodeOffset="20px">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  `
})
export class ExplodeSlicesComponent {
  data = [
    { x: 'A', y: 30 },
    { x: 'B', y: 25 },
    { x: 'C', y: 20 }
  ];

  onPointClick(args: any) {
    // args.point is the clicked point
    args.point.explode = true;
  }
}
```

### Explode All Slices

Separate all slices automatically:

```typescript
@Component({
  template: `
    <ejs-circularchart3d>
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          [explodeAll]="true"
          explodeOffset="30px"
          type="Pie">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  `
})
```

---

## Border and Fill Styling

### Chart Background

Set chart background color and border:

```typescript
@Component({
  template: `
    <ejs-circularchart3d 
      id="chart"
      background="red"
      [border]="{
        color: 'yellow',
        width: 20
      }">
      ...
    </ejs-circularchart3d>
  `
})
```

---

## Advanced Appearance

### Dynamic Styling Based on Data

Apply styles conditionally:

```typescript
@Component({
  template: `
    <ejs-circularchart3d 
      (pointRender)="onPointRender($event)">
      ...
    </ejs-circularchart3d>
  `
})
export class DynamicStylingComponent {
  data = [
    { x: 'Excellent', y: 60 },
    { x: 'Good', y: 25 },
    { x: 'Poor', y: 15 }
  ];

  onPointRender(args: any) {
    // Color coding based on value
    if (args.point.y >= 50) {
      args.fill = '#48C9B0';  // Green for high values
    } else if (args.point.y >= 25) {
      args.fill = '#F39C12';  // Orange for medium
    } else {
      args.fill = '#E74C3C';  // Red for low
    }
  }
}
```

---

## Troubleshooting

**Title not showing?**
- Set `title` property on chart component
- Verify `titleStyle` is valid CSS
- Check that title text is not empty

**Colors not applying?**
- Check color values are valid hex or named colors
- Verify `pointColorMapping` property name matches data
- Ensure palette array is properly formatted

**Theme not changing?**
- Verify CSS import statement is correct
- Clear browser cache
- Check for CSS specificity issues
- Ensure theme CSS is loaded after default styles

---
