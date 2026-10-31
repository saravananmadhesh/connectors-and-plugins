# Customization and Appearance

## Table of Contents

- [Container Styling](#container-styling)
  - [Container Properties](#container-properties)
  - [Container Types](#container-types)
  - [Sizing](#sizing)
- [Color Schemes and Themes](#color-schemes-and-themes)
  - [Built-in Themes](#built-in-themes)
  - [Custom Color Palette](#custom-color-palette)
  - [Range Colors](#range-colors)
- [Font and Label Customization](#font-and-label-customization)
  - [Label Styling](#label-styling)
  - [Font Properties](#font-properties)
  - [Format Examples](#format-examples)
  - [Font Sizing Responsive](#font-sizing-responsive)
- [Borders and Effects](#borders-and-effects)
  - [Axis Border](#axis-border)
  - [Dashed Axis Line](#dashed-axis-line)
  - [Range Borders](#range-borders)
- [Background and Gradients](#background-and-gradients)
  - [Solid Background](#solid-background)
- [Custom Templates](#custom-templates)
  - [Pointer Image Template](#pointer-image-template)
  - [Label Template](#label-template)
  - [Range Template with Labels](#range-template-with-labels)
- [Practical Examples](#practical-examples)
  - [Professional Dashboard Gauge](#professional-dashboard-gauge)
  - [Minimal Clean Gauge](#minimal-clean-gauge)

## Container Styling

### Container Properties

The container holds the entire gauge and can be customized:

```typescript
<ejs-lineargauge [container]="containerConfig">
  ...
</ejs-lineargauge>

containerConfig = {
  width: '100',
  height: '200px',
  type: 'Normal',
  border: {
    color: '#ddd',
    width: 2
  },
  backgroundColor: '#f5f5f5'
};
```

### Container Types

**Normal:** Standard rectangular container
```typescript
type: 'Normal'
```

**RoundedRectangle:** Rounded corners
```typescript
type: 'RoundedRectangle'
```

### Sizing

```typescript
// Fixed size
containerConfig = {
  width: '500', //type -> number
  height: '150' //type -> number
};

```

## Color Schemes

### Custom Color Palette

Override theme colors:

```css
/* In component styles */
::ng-deep .e-gauge {
  --primary-color: #0066cc;
  --secondary-color: #ff6600;
  --danger-color: #e74c3c;
  --success-color: #27ae60;
  --warning-color: #f39c12;
}
```

### Range Colors

Use semantic color naming:

```typescript
statusColors = {
  'critical': '#e74c3c',   // Red
  'warning': '#f39c12',    // Orange
  'normal': '#27ae60',     // Green
  'info': '#3498db'        // Blue
};

<e-ranges>
  <e-range [start]="0" [end]="30" [color]="statusColors.critical"></e-range>
  <e-range [start]="30" [end]="70" [color]="statusColors.warning"></e-range>
  <e-range [start]="70" [end]="100" [color]="statusColors.normal"></e-range>
</e-ranges>
```

## Font and Label Customization

### Label Styling

```typescript
labelStyle = {
  font: {
    fontFamily: 'Arial, sans-serif',
    size: '14px',
    color: '#333',
    fontStyle: 'normal',
    fontWeight: 'normal'
  },
  format: '{value}',
  offset: 0,
};
```

### Font Properties

| Property | Type | Example |
|----------|------|---------|
| `fontFamily` | string | 'Arial', 'Georgia', 'sans-serif' |
| `size` | string | '12px', '1em', '14px' |
| `color` | string | '#333', 'rgb(51,51,51)', 'darkgray' |
| `fontStyle` | string | 'normal', 'italic', 'oblique' |
| `fontWeight` | string | 'normal', 'bold', '600', '700' |

### Format Examples

```typescript
// Temperature
labelStyle = { format: '{value}°C' };

// Currency
labelStyle = { format: '${value}K' };

// Percentage
labelStyle = { format: '{value}%' };

// Custom decimal places
labelStyle = { format: '{value:.2f}' };

// Thousands separator
labelStyle = { format: '{value:n0}' };
```

### Font Sizing Responsive

```typescript
export class ResponsiveGaugeComponent {
  getLabelSize(): string {
    const width = window.innerWidth;
    return width < 768 ? '10px' : '14px';
  }

  labelStyle = {
    font: {
      size: this.getLabelSize()
    }
  };

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      this.labelStyle.font.size = this.getLabelSize();
    });
  }
}
```

## Borders and Effects

### Axis Border

```typescript
<e-axis [line]="axisLine">
  ...
</e-axis>

axisLine = {
  width: 2,
  color: '#333',
  dashArray: '0' // Solid line
};
```

### Dashed Axis Line

```typescript
axisLine = {
  width: 1,
  color: '#999',
  dashArray: '5,5' // 5px dash, 5px gap
};
```

### Range Borders

```typescript
<e-range 
  [start]="0" 
  [end]="50" 
  [color]="'#3498db'"
  [border]="{ 
    color: '#1a1a1a', 
    width: 2 
  }">
</e-range>
```

## Background and Gradients

### Solid Background

```typescript
containerConfig = {
  backgroundColor: '#f5f5f5'
};
```

## Custom Templates

### Pointer Image Template

Use custom images as pointers:

```typescript
<ejs-lineargauge [pointerEventArgs]="onPointerRender">
  <e-axes>
    <e-axis>
      <e-pointers>
        <e-pointer 
          [value]="50" 
          [type]="'Marker'"
          [markerType]="'Image'"
          [imageUrl]="'assets/pointer-arrow.png'"
          [width]="30"
          [height]="30">
        </e-pointer>
      </e-pointers>
    </e-axis>
  </e-axes>
</ejs-lineargauge>
```

### Label Template

Custom label rendering:

```typescript
export class CustomLabelGaugeComponent {
  onAxisLabelRender(args: any): void {
    // Modify label based on value
    const value = parseInt(args.text);
    
    if (value > 70) {
      args.labelStyle.font.color = '#e74c3c';
      args.text = `${value}⚠️`;
    } else if (value > 40) {
      args.labelStyle.font.color = '#f39c12';
    } else {
      args.labelStyle.font.color = '#27ae60';
    }
  }
}
```

### Range Template with Labels

```typescript
export class RangeTemplateComponent {
  ranges = [
    { start: 0, end: 30, label: 'Low', color: '#27ae60' },
    { start: 30, end: 70, label: 'Med', color: '#f39c12' },
    { start: 70, end: 100, label: 'High', color: '#e74c3c' }
  ];
}
```

## Practical Examples

### Professional Dashboard Gauge

```typescript
export class DashboardGaugeComponent {
  containerConfig = {
    width: '100',
    height: '200',
    type: 'RoundedRectangle',
    border: { color: '#ddd', width: 1 }
  };

  labelStyle = {
    font: {
      fontFamily: 'Segoe UI, sans-serif',
      size: '12px',
      color: '#4a4a4a',
      fontWeight: '500'
    },
    format: '{value}%'
  };

  ranges = [
    { start: 0, end: 30, color: '#e74c3c' },
    { start: 30, end: 70, color: '#f39c12' },
    { start: 70, end: 100, color: '#27ae60' }
  ];
}
```

### Minimal Clean Gauge

```typescript
export class MinimalGaugeComponent {
  containerConfig = {
    width: '100',
    height: '120',
    backgroundColor: '#fafafa'
  };

  axisLine = {
    width: 1,
    color: '#e0e0e0'
  };

  labelStyle = {
    font: {
      size: '11px',
      color: '#999'
    }
  };
}
```
