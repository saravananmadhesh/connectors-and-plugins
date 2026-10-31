# Advanced Features

## Table of Contents

- [Print and Export](#print-and-export)
  - [Export to PNG](#export-to-png)
  - [Export to PDF](#export-to-pdf)
  - [Export to SVG](#export-to-svg)
  - [Print the Gauge](#print-the-gauge)
  - [Programmatic Export with Custom Filename](#programmatic-export-with-custom-filename)
- [Annotations](#annotations)
  - [Adding Text Annotations](#adding-text-annotations)
  - [Annotation Properties](#annotation-properties)
  - [HTML Content in Annotations](#html-content-in-annotations)
- [Animations](#animations)
  - [Enable/Disable Animations](#enabledisable-animations)
  - [Animation on Pointer](#animation-on-pointer)
  - [Range Animation](#range-animation)
- [Internationalization (i18n)](#internationalization-i18n)
  - [Number Formatting for Different Locales](#number-formatting-for-different-locales)
  - [Custom Locale Strings](#custom-locale-strings)
  - [Currency Formatting](#currency-formatting)
  - [Date/Time in Annotations](#datetime-in-annotations)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
  - [Enable RTL](#enable-rtl)
- [Accessibility (WCAG)](#accessibility-wcag)
  - [Semantic HTML and ARIA](#semantic-html-and-aria)
  - [Keyboard Navigation](#keyboard-navigation)
  - [Color Contrast](#color-contrast)
  - [Focus Management](#focus-management)
- [Migration from ej1](#migration-from-ej1)
  - [Breaking Changes from ej1 to ej2+](#breaking-changes-from-ej1-to-ej2)
  - [Migration Example](#migration-example)
  - [Feature Mapping](#feature-mapping)
  - [Migration Checklist](#migration-checklist)

## Print and Export

### Export to PNG

Export gauge as a PNG image:

```typescript
export class ExportGaugeComponent {
  @ViewChild('gauge') gaugeRef: LinearGaugeComponent;

  exportToPNG(): void {
    if (this.gaugeRef) {
      this.gaugeRef.export('PNG', 'LinearGauge');
    }
  }
}
```

**Template:**

```typescript
<button (click)="exportToPNG()">Export as PNG</button>
```

### Export to PDF

Export gauge as a PDF document:

```typescript
export class ExportPdfComponent {
  @ViewChild('gauge') gaugeRef: LinearGaugeComponent;

  exportToPDF(): void {
    if (this.gaugeRef) {
      this.gaugeRef.export('PDF', 'LinearGauge');
    }
  }
}
```

### Export to SVG

Export as vector graphic (scalable):

```typescript
exportToSVG(): void {
  if (this.gaugeRef) {
    this.gaugeRef.export('SVG', 'LinearGauge');
  }
}
```

### Print the Gauge

Print directly to printer:

```typescript
export class PrintGaugeComponent {
  @ViewChild('gauge') gaugeRef: LinearGaugeComponent;

  printGauge(): void {
    if (this.gaugeRef) {
      this.gaugeRef.print();
    }
  }
}
```

### Programmatic Export with Custom Filename

```typescript
export class CustomExportComponent {
  @ViewChild('gauge') gaugeRef: LinearGaugeComponent;

  exportWithTimestamp(format: string): void {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `gauge-${timestamp}`;
    
    if (this.gaugeRef) {
      this.gaugeRef.export(format, filename);
    }
  }
}
```

## Annotations

### Adding Text Annotations

Add text labels to the gauge:

```typescript
<ejs-lineargauge id="gauge-container">
    <e-annotations>
        <e-annotation zIndex='1' content='<div id="first"><h1>Gauge</h1></div>' x=100 y=-70 ></e-annotation>
    </e-annotations>
</ejs-lineargauge>
```

### Annotation Properties

| Property | Type | Description |
|----------|------|-------------|
| `content` | string | Annotation text or HTML |
| `x` | number | X-position |
| `y` | number | Y-position |
| `zIndex` | string | Stacking order |
| `font` | object | Font styling |
| `axisIndex` | number | Sets and gets the axis index which places the annotation in the specified axis in the linear gauge. |
| `axisValue` | number | Sets and gets the value of axis which places the annotation near the specified axis value |
| `horizontalAlignment` | Placement | Sets and gets the horizontal alignment of annotation. |
| `verticalAlignment` | Placement | Sets and gets the vertical alignment of annotation |

### HTML Content in Annotations

```typescript
htmlAnnotation = `
  <div style="padding: 5px; background: #f0f0f0; border-radius: 4px;">
    <strong>Status:</strong> <span style="color: #27ae60;">OK</span>
  </div>
`;

<e-annotation 
  [content]="htmlAnnotation"
  [x]=50
  [y]=20>
</e-annotation>
```

## Animations

### Enable/Disable Animations

```typescript
<ejs-lineargauge animationDuration="3000">
  ...
</ejs-lineargauge>

```

### Animation on Pointer

```typescript
<e-pointer 
  [value]=50
  [type]="'Bar'"
  animationDuration="3000">
</e-pointer>
```

### Range Animation

Animation is not supported for ranges.

```typescript
<e-range 
  [start]=0 
  [end]=50
  [color]="'#3498db'"
</e-range>
```

## Internationalization (i18n)

### Number Formatting for Different Locales

```typescript
import { setCulture, setCurrencyCode } from '@syncfusion/ej2-base';

setCulture('ar');
setCurrencyCode('QAR');
```

### Custom Locale Strings

```typescript
L10n.load({
  'de': {
    'lineargauge': {
      'range': 'Bereich'
    }
  },
  'fr': {
    'lineargauge': {
      'range': 'Plage'
    }
  }
});
```

### Currency Formatting

```typescript
// US English (USD)
labelStyle = {
  format: '${value}',
};

// German (EUR)
labelStyle = {
  format: '€{value}',
};

// French (EUR)
labelStyle = {
  format: '{value} €',
};
```

### Date/Time in Annotations

```typescript
const timestamp = new Date().toLocaleString('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit'
});

<e-annotation [content]="timestamp"></e-annotation>
```

## Right-to-Left (RTL) Support

### Enable RTL

```typescript
<ejs-lineargauge [enableRtl]="true">
  ...
</ejs-lineargauge>
```

**Component:**

```typescript
export class RTLGaugeComponent {
  enableRtl: boolean = true;
}
```

## Accessibility (WCAG)

### Semantic HTML and ARIA

Ensure gauge is accessible to screen readers:

```typescript
<ejs-lineargauge 
  [title]="'System Temperature Monitor'">
  <e-axes>
    <e-axis [minimum]="0" [maximum]="100">
      <e-pointers>
        <e-pointer 
          [value]="currentTemp">
        </e-pointer>
      </e-pointers>
    </e-axis>
  </e-axes>
</ejs-lineargauge>
```

### Keyboard Navigation

```typescript
export class AccessibleGaugeComponent {
  gaugeValue: number = 50;

  onKeyDown(event: KeyboardEvent): void {
    const step = 5;
    
    switch(event.key) {
      case 'ArrowUp':
      case 'ArrowRight':
        this.gaugeValue = Math.min(100, this.gaugeValue + step);
        event.preventDefault();
        break;
      
      case 'ArrowDown':
      case 'ArrowLeft':
        this.gaugeValue = Math.max(0, this.gaugeValue - step);
        event.preventDefault();
        break;
    }
  }
}
```

### Color Contrast

Ensure sufficient color contrast:

```typescript
// High contrast colors for accessibility
const accessibleColors = {
  safe: '#006400',      // Dark green (>7:1 contrast)
  warning: '#FF8800',   // Dark orange (>4.5:1 contrast)
  danger: '#CC0000',    // Dark red (>4.5:1 contrast)
  text: '#000000'       // Black
};
```

### Focus Management

```typescript
export class FocusableGaugeComponent {
  @ViewChild('gauge') gaugeRef: LinearGaugeComponent;

  focusGauge(): void {
    if (this.gaugeRef) {
      // Ensure gauge can receive focus
      const element = this.gaugeRef.element;
      if (element) {
        element.tabIndex = 0;
        element.focus();
      }
    }
  }
}
```

## Migration from ej1

### Breaking Changes from ej1 to ej2+

| Feature | ej1 | ej2+ |
|---------|-----|------|
| LinearGauge tag | ej-lineargauge | ejs-lineargauge |
| Axes | e-scales | e-axes |
| Ticks | scales.ticks | axes.majorTicks |
| Labels | labels | labelStyle |
| Annotation | customLabels | annotations |
| Container | - | container |
| Marker Pointers array | e-markerpointers | e-pointers |
| Bar Pointers array | e-barpointers | e-pointers |

### Migration Example

**ej1 (Old):**
```typescript
$(selector).ejLinearGauge({
  value: 50,
  orientation: 'Horizontal',
  pointers: [{ value: 50 }],
  ranges: [{ start: 0, end: 50, color: 'green' }]
});
```

**ej2+ (New):**
```typescript
<ejs-lineargauge [orientation]="'Horizontal'">
  <e-axes>
    <e-axis [minimum]="0" [maximum]="100">
      <e-ranges>
        <e-range [start]="0" [end]="50" [color]="'green'"></e-range>
      </e-ranges>
      <e-pointers>
        <e-pointer [value]="50"></e-pointer>
      </e-pointers>
    </e-axis>
  </e-axes>
</ejs-lineargauge>
```

### Feature Mapping

```
ej1 Property → ej2+ Property

pointerValue         → setPointerValue() method
rangeValue           → setRangeValue() method (if available)
labelFormat          → labelStyle.format
tickSize             → majorTicks.height / minorTicks.height
markerPointers       → e-pointers with type="Marker"
```

### Migration Checklist

- [ ] Update module imports (LinearGaugeModule)
- [ ] Update template syntax (e-axes, e-ranges, e-pointers)
- [ ] Replace `$().ejLinearGauge()` with component binding
- [ ] Update property names to camelCase equivalents
- [ ] Update event handlers to Angular event binding syntax
- [ ] Test pointer animation and interaction behavior
- [ ] Verify theme CSS imports
- [ ] Test accessibility features
- [ ] Update print/export functionality
