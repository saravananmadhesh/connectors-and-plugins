# Annotations and Interaction

## Table of Contents

- [Annotations Overview](#annotations-overview)
  - [API Reference](#api-reference)
- [Basic Annotation](#basic-annotation)
  - [Simple Text Annotation](#simple-text-annotation)
- [Annotation Positioning](#annotation-positioning)
  - [Angle Property](#angle-property)
  - [Radius Property](#radius-property)
  - [Combined: Positioning Examples](#combined-positioning-examples)
- [Sub-Gauges](#sub-gauges)
- [Tooltips](#tooltips)
  - [Enable Tooltip](#enable-tooltip)
  - [Tooltip Configuration](#tooltip-configuration)
- [User Interaction](#user-interaction)
  - [Handle Pointer Drag Events](#handle-pointer-drag-events)
  - [Handle Gauge Click](#handle-gauge-click)
  - [Value Change Detection](#value-change-detection)
- [Print and Export](#print-and-export)
  - [Print Gauge](#print-gauge)
  - [Export as Image](#export-as-image)
- [Internationalization](#internationalization)
  - [Date/Number Localization](#datenumber-localization)
  - [Custom Localization](#custom-localization)
  - [Number Formats by Locale](#number-formats-by-locale)
- [Accessibility](#accessibility)
  - [WCAG Compliance](#wcag-compliance)
  - [Enable Accessibility](#enable-accessibility)
  - [Screen Reader Support](#screen-reader-support)
- [Complete Interactive Example](#complete-interactive-example)

## Annotations Overview

### API Reference
📄 **Read:** [references/api-reference.md](references/api-reference.md)


Annotations allow you to place custom HTML elements, text, or shapes at specific positions on the gauge. Use them for labels, icons, status indicators, or nested gauges.

**Common uses:**
- Display unit labels (°C, mph, %)
- Show current/target value text
- Place status icons
- Embed sub-gauges for hierarchical data
- Display tooltips with context

## Basic Annotation

### Simple Text Annotation

```typescript
import { AnnotationsService } from '@syncfusion/ej2-angular-circulargauge';

@Component({
  imports: [CircularGaugeModule],
  providers: [AnnotationsService],  // ← Required for annotations
  selector: 'app-gauge',
  template: `
    <ejs-circulargauge id="circular-container">
        <e-axes>
            <e-axis>
                <e-annotations>
                    <e-annotation zIndex='1'>
						          <ng-template #content>
							          <div>
							            <div><span>Pointer Value : 50</span>
                          </div>
                        </div>
                      </ng-template>
                    </e-annotation>
                </e-annotations>
            </e-axis>
        </e-axes>
    </ejs-circulargauge>
  `,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent { }
```

**Result:** "°C" text appears 110% from gauge center at 90° angle (right side).

## Annotation Positioning

### Angle Property

Position annotation around the gauge using angle (0-360°):

```typescript
[angle]='0'    // Top
[angle]='90'   // Right
[angle]='180'  // Bottom
[angle]='270'  // Left
```

### Radius Property

Distance from gauge center:

```typescript
radius='50%'   // Inside: 50% of axis radius
radius='100%'  // On axis: at axis radius (default)
radius='150%'  // Outside: beyond axis radius
```

### Combined: Positioning Examples

```html
<!-- Top center -->
<e-annotation [angle]='0' radius='110%'></e-annotation>

<!-- Right side, outer -->
<e-annotation [angle]='90' radius='130%'></e-annotation>

<!-- Bottom center -->
<e-annotation [angle]='180' radius='110%'></e-annotation>

<!-- Left side, inner -->
<e-annotation [angle]='270' radius='70%'></e-annotation>

<!-- Top-right diagonal -->
<e-annotation [angle]='45' radius='120%'></e-annotation>
```

## Sub-Gauges

Embed a gauge within another gauge to display hierarchical data:

```typescript
export class AppComponent {
  subGaugeContent = `
    <ejs-circulargauge>
      <e-axes>
        <e-axis [minimum]='0' [maximum]='100'>
          <e-pointers>
            <e-pointer [value]='75' type='Needle'></e-pointer>
          </e-pointers>
        </e-axis>
      </e-axes>
    </ejs-circulargauge>
  `;
}
```

**Limitation:** Sub-gauges require manual DOM integration with Angular components.

## Tooltips

Display information when user hovers over gauge elements.

### Enable Tooltip

```typescript
import { GaugeTooltipService } from '@syncfusion/ej2-angular-circulargauge';

@Component({
  imports: [CircularGaugeModule],
  providers: [GaugeTooltipService],  // ← Required for tooltips
  template: `
    <ejs-circulargauge id='gauge' [tooltip]='tooltip'>
      <!-- gauge content -->
    </ejs-circulargauge>
  `,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  tooltip = {
    enable: true,
    type: ['Pointer'],  // Show on pointer hover
    template: '<div>Value: ${value}</div>'  // Custom template
  };
}
```

### Tooltip Configuration

```typescript
tooltip = {
  enable: true,
  type: ['Pointer'],     // Tooltip on pointer
  showAtMousePosition: true,  // Show at mouse location
  format: 'Value: {value}',   // Format string
  textStyle: {
    color: '#FFFFFF',
    fontFamily: 'Arial',
    fontSize: '14px'
  }
};
```

## User Interaction

### Handle Pointer Drag Events

Detect when user drags pointer:

```typescript
import { CircularGaugeComponent } from '@syncfusion/ej2-angular-circulargauge';

@Component({
  imports: [CircularGaugeModule],
  selector: 'app-gauge',
  template: `
    <ejs-circulargauge [enablePointerDrag]='true'
                       (dragMove)='onPointerMove($event)'>
      <!-- gauge content -->
    </ejs-circulargauge>
  `
})
export class AppComponent {
  onPointerMove(event: any) {
    console.log('Pointer value:', event.value);
    // Update external state, validate value, etc.
  }
}
```

### Handle Gauge Click

Detect clicks on gauge elements:

```typescript
export class AppComponent {
  onGaugeClick(event: any) {
    console.log('Gauge clicked at:', event.location);
    // Respond to user click
  }
}
```

### Value Change Detection

React to pointer value changes:

```typescript
<ejs-circulargauge (dragEnd)='onValueChange($event)'>
  <!-- gauge content -->
</ejs-circulargauge>
```

Component:
```typescript
export class AppComponent {
  onValueChange(event: any) {
    this.currentValue = event.value;
    this.updateDisplay();
  }

  private updateDisplay() {
    if (this.currentValue > 80) {
      this.status = 'HIGH';
    } else if (this.currentValue > 50) {
      this.status = 'MEDIUM';
    } else {
      this.status = 'LOW';
    }
  }
}
```

## Print and Export

### Print Gauge

```typescript
import { CircularGaugeComponent } from '@syncfusion/ej2-angular-circulargauge';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-gauge',
  template: `
    <ejs-circulargauge id="circular-container" [allowPrint]=true #gauge>
    </ejs-circulargauge><div> <button id='print' (click)='print()'>Print</button></div>
  `,
   providers: [PrintService]
})
export class AppComponent {
   @ViewChild('gauge')
  public gaugeObj?: CircularGaugeComponent;
  ngOnInit(): void {
      // ngOnInit code here
    }

  public print(): void {
    (this.gaugeObj as any).print(); 
  }
}
```

### Export as Image

```typescript
export class AppComponent {
  @ViewChild('gauge') gauge: CircularGaugeComponent;

  exportGauge() {
    // Export as PNG
    this.gauge.export('PNG', 'gauge-image');
    
    // Export as PDF
    this.gauge.export('PDF', 'gauge-document');
    
    // Export as SVG
    this.gauge.export('SVG', 'gauge-vector');
  }
}
```

Template:
```html
<ejs-circulargauge id="circular-container" [allowImageExport]=true #gauge>
    </ejs-circulargauge>
<button (click)='exportGauge()'>Export as Image</button>
```

## Internationalization

### Date/Number Localization

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';

registerLocaleData(fr);

@Component({
  selector: 'app-gauge',
  template: `
    <ejs-circulargauge [locale]="'fr'">
      <!-- Content displays in French -->
    </ejs-circulargauge>
  `
})
export class AppComponent { }
```

### Custom Localization

```typescript
import { L10n } from '@syncfusion/ej2-base';

// Define custom locale
L10n.load({
  'de': {
    'circulargauge': {
      'seriesType': 'Art',
      'performance': 'Leistung'
    }
  }
});

@Component({
  selector: 'app-gauge',
  template: `<ejs-circulargauge [locale]="'de'"></ejs-circulargauge>`
})
export class AppComponent { }
```

### Number Formats by Locale

Different locales affect label formatting:
- `en-US`: 1,000.00 (comma separator)
- `de-DE`: 1.000,00 (period for thousands)
- `fr-FR`: 1 000,00 (space and comma)

## Accessibility

### WCAG Compliance

The Circular Gauge supports accessible features:

- **Keyboard navigation:** Tab through elements
- **ARIA labels:** Screen reader support
- **High contrast:** Visible in high-contrast themes
- **Semantic HTML:** Proper element structure

### Enable Accessibility

```typescript
@Component({
  selector: 'app-gauge',
  template: `
    <ejs-circulargauge id='gauge'
                       [ariaLabel]="'Performance gauge showing 65% usage'"
                       role='img'>
      <e-axes>
        <e-axis>
          <e-pointers>
            <e-pointer [value]='65' 
                       [ariaLabel]="'Current value 65 percent'">
            </e-pointer>
          </e-pointers>
        </e-axis>
      </e-axes>
    </ejs-circulargauge>
  `,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent { }
```

### Screen Reader Support

```typescript
// Descriptions for screen readers
ariaLabel = 'CPU Usage Gauge displaying real-time system performance';

// Pointer-specific descriptions
pointerAriaLabel = 'Current CPU usage 65 percent out of 100';

// Range descriptions
rangeAriaLabel = 'Warning zone from 75 to 90 percent usage';
```

## Complete Interactive Example

```typescript
import { GaugeTooltipService, AnnotationsService } from '@syncfusion/ej2-angular-circulargauge';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { CircularGaugeComponent } from '@syncfusion/ej2-angular-circulargauge';

@Component({
  imports: [CircularGaugeModule],
  providers: [GaugeTooltipService, AnnotationsService],
  selector: 'app-gauge',
  template: `
    <div>
      <h3>{{ title }}</h3>
      <button (click)='printGauge()'>Print</button>
      <button (click)='exportAsImage()'>Export</button>
      <button (click)='resetValue()'>Reset</button>
      
      <ejs-circulargauge #gauge
                         [title]='title'
                         [enablePointerDrag]='true'
                         [tooltip]='tooltipConfig'
                         (dragMove)='onPointerMove($event)'
                         (dragEnd)='onValueChange($event)'
                         [animationDuration]='1500'>
        <e-axes>
          <e-axis [minimum]='0' [maximum]='100'>
            <e-ranges>
              <e-range [start]='0' [end]='40' color='#F44336'></e-range>
              <e-range [start]='40' [end]='70' color='#FFC107'></e-range>
              <e-range [start]='70' [end]='100' color='#4CAF50'></e-range>
            </e-ranges>
            <e-pointers>
              <e-pointer [value]='currentValue' type='Needle'>
              </e-pointer>
            </e-pointers>
          </e-axis>
        </e-axes>
        <e-annotations>
          <e-annotation [content]="statusDisplay" 
                        [angle]='180' 
                        radius='70%'></e-annotation>
        </e-annotations>
      </ejs-circulargauge>
      
      <p>Current: {{ currentValue }}% - {{ status }}</p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @ViewChild('gauge') gauge: CircularGaugeComponent;

  title = 'System Performance';
  currentValue = 65;
  status = 'MEDIUM';
  
  tooltipConfig = {
    enable: true,
    type: ['Pointer'],
    format: 'Usage: {value}%'
  };

  get statusDisplay() {
    return `<div style='font-weight: bold; font-size: 16px;'>${this.status}</div>`;
  }

  onPointerMove(event: any) {
    console.log('Pointer moved:', event.value);
  }

  onValueChange(event: any) {
    this.currentValue = Math.round(event.value);
    this.updateStatus();
  }

  private updateStatus() {
    if (this.currentValue >= 70) {
      this.status = 'HIGH';
    } else if (this.currentValue >= 40) {
      this.status = 'MEDIUM';
    } else {
      this.status = 'LOW';
    }
  }

  printGauge() {
    this.gauge.print();
  }

  exportAsImage() {
    this.gauge.export('PNG', 'performance-gauge');
  }

  resetValue() {
    this.gauge.setPointerValue(0, 0, 50);
  }
}
```

---
