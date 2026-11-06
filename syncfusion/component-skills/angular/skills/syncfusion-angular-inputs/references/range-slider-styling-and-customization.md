# Styling & Customization

## Table of Contents
- [CSS Structure Overview](#css-structure-overview)
- [Track Customization](#track-customization)
- [Handle Customization](#handle-customization)
- [Button Styling](#button-styling)
- [Limits Styling](#limits-styling)
- [Tick Styling](#tick-styling)
- [RTL Support](#rtl-support)
- [Theme Customization](#theme-customization)
- [Complete Examples](#complete-examples)
- [Troubleshooting](#troubleshooting)

---

## CSS Structure Overview

The Range Slider generates the following HTML structure that can be targeted with CSS:

```html
<div class="e-control-wrapper e-slider-container">
  <div class="e-slider">
    <div class="e-slider-track"></div>
    <div class="e-slider-limits"></div>
    <div class="e-handle"></div>
    <div class="e-handle"></div>  <!-- Range slider only -->
    <div class="e-scale">
      <div class="e-tick"></div>
      <div class="e-tick"></div>
    </div>
  </div>
  <button class="e-slider-button"></button>
  <button class="e-slider-button"></button>
</div>
```

Each part can be styled individually with CSS.

---

## Track Customization

The track is the background bar where the slider runs.

### CSS Classes

- `.e-control-wrapper.e-slider-container` - Main container
- `.e-slider-track` - The track bar
- `.e-horizontal` / `.e-vertical` - Orientation class

### Basic Track Styling

```css
/* Horizontal slider track */
.e-control-wrapper.e-slider-container.e-horizontal .e-slider-track {
  background: #007bff;
  height: 3px;
}

/* Vertical slider track */
.e-control-wrapper.e-slider-container.e-vertical .e-slider-track {
  background: #28a745;
  width: 3px;
}
```

### Advanced Track Styling

```css
/* Gradient track */
.e-slider-track {
  background: linear-gradient(to right, #ff6b6b, #ffd93d, #6bcf7f);
  height: 5px;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Rounded track */
.e-slider-track {
  background: #e0e0e0;
  height: 6px;
  border-radius: 3px;
}
```

### Example: Custom Track Color

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-track-style',
  template: `
    <div>
      <h3>Custom Track Styling</h3>
      <ejs-slider 
        id="custom-track"
        type="Range"
        [value]="[25, 75]">
      </ejs-slider>
    </div>
  `,
  styles: [`
    :host ::ng-deep .e-slider-track {
      background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
      height: 6px;
      border-radius: 3px;
    }
  `]
})
export class TrackStyleComponent {}
```

---

## Handle Customization

The handle (thumb) is the draggable element on the slider.

### CSS Classes

- `.e-handle` - Single handle element
- `.e-slider .e-handle` - Handle within slider

### Basic Handle Styling

```css
/* Default handle styling */
.e-control-wrapper.e-slider-container .e-slider .e-handle {
  background-color: #f9920b;
  border-radius: 50%;
  border: 0;
  height: 20px;
  width: 20px;
}

/* Larger, outlined handle */
.e-handle {
  background-color: #007bff;
  border: 3px solid #fff;
  border-radius: 50%;
  height: 24px;
  width: 24px;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
}

/* Square handle */
.e-handle {
  background-color: #28a745;
  border-radius: 0;
  height: 18px;
  width: 18px;
}
```

### Handle States

```css
/* Default state */
.e-handle {
  background: #007bff;
  transition: all 0.2s ease;
}

/* Hover state */
.e-slider:hover .e-handle {
  box-shadow: 0 2px 12px rgba(0, 123, 255, 0.4);
  transform: scale(1.1);
}

/* Focus state (keyboard navigation) */
.e-handle:focus {
  outline: 2px solid #0056b3;
  outline-offset: 2px;
}
```

### Example: Colorful Handles

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-handle-style',
  template: `
    <div>
      <h3>Colorful Handles</h3>
      <ejs-slider 
        id="colorful-slider"
        type="Range"
        [value]="[30, 70]">
      </ejs-slider>
    </div>
  `,
  styles: [`
    :host ::ng-deep .e-slider .e-handle {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      height: 24px;
      width: 24px;
      border: 3px solid #fff;
      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
    }

    :host ::ng-deep .e-slider:hover .e-handle {
      transform: scale(1.15);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.6);
    }
  `]
})
export class HandleStyleComponent {}
```

---

## Button Styling

Customize the increment/decrement buttons.

### CSS Classes

- `.e-slider-button` - Button element
- `.e-slider-button.e-dec` - Decrement button
- `.e-slider-button.e-inc` - Increment button

### Basic Button Styling

```css
/* All buttons */
.e-control-wrapper.e-slider-container .e-slider-button {
  background: #007bff;
  border: 1px solid #0056b3;
  color: #fff;
  height: 25px;
  width: 25px;
  border-radius: 50%;
}

/* Decrease button specifically */
.e-slider-button.e-dec {
  background: #dc3545;
}

/* Increase button specifically */
.e-slider-button.e-inc {
  background: #28a745;
}

/* Button hover effect */
.e-slider-button:hover {
  opacity: 0.8;
  transform: scale(1.1);
}
```

### Example: Modern Button Styling

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-button-style',
  template: `
    <div>
      <h3>Modern Button Styling</h3>
      <ejs-slider 
        id="button-slider"
        type="Range"
        [value]="[30, 70]"
        [showButtons]="true">
      </ejs-slider>
    </div>
  `,
  styles: [`
    :host ::ng-deep .e-slider-button {
      background: linear-gradient(135deg, #667eea, #764ba2);
      border: none;
      color: #fff;
      height: 32px;
      width: 32px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: bold;
      font-size: 18px;
    }

    :host ::ng-deep .e-slider-button:hover {
      transform: scale(1.15);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    :host ::ng-deep .e-slider-button:active {
      transform: scale(0.95);
    }
  `]
})
export class ButtonStyleComponent {}
```

---

## Limits Styling

The limits define the non-selectable zone boundaries.

### CSS Classes

- `.e-limits` - Limits container
- `.e-horizontal` / `.e-vertical` - Orientation

### Basic Limits Styling

```css
/* Horizontal slider limits */
.e-control-wrapper.e-slider-container.e-horizontal .e-limits {
  background-color: rgba(69, 100, 233, 0.46);
  height: 2px;
}

/* Vertical slider limits */
.e-control-wrapper.e-slider-container.e-vertical .e-limits {
  background-color: rgba(69, 100, 233, 0.3);
  width: 2px;
}
```

### Example: Highlighting Limits

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-limits-style',
  template: `
    <div>
      <h3>Slider with Styled Limits</h3>
      <ejs-slider 
        id="limits-slider"
        type="Range"
        [min]="0"
        [max]="100"
        [value]="[30, 70]"
        [limits]="{ 
          enabled: true,
          minStart: 20,
          minEnd: 40,
          maxStart: 60,
          maxEnd: 80
        }">
      </ejs-slider>
    </div>
  `,
  styles: [`
    :host ::ng-deep .e-limits {
      background: rgba(255, 107, 107, 0.3);
      height: 3px;
    }
  `]
})
export class LimitsStyleComponent {}
```

---

## Tick Styling

Customize tick marks and labels.

### CSS Classes

- `.e-scale` - Tick container
- `.e-tick` - Individual tick mark
- `.e-tick.e-custom` - Custom tick styling

### Basic Tick Styling

```css
/* Scale container */
.e-scale {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

/* Individual ticks */
.e-scale .e-tick {
  background: #999;
  height: 4px;
  width: 1px;
}

/* Large step ticks */
.e-scale .e-tick.e-large {
  height: 8px;
  width: 2px;
  background: #333;
}

/* Tick labels */
.e-scale .e-tick::before {
  font-size: 12px;
  margin-top: 4px;
}
```

### Example: Colored Ticks

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-tick-style',
  template: `
    <div>
      <h3>Custom Tick Styling</h3>
      <ejs-slider 
        id="tick-slider"
        type="Range"
        [value]="[25, 75]"
        [ticks]="{ 
          placement: 'After',
          largeStep: 20
        }">
      </ejs-slider>
    </div>
  `,
  styles: [`
    :host ::ng-deep .e-scale .e-tick {
      background: #667eea;
      height: 4px;
      width: 2px;
    }

    :host ::ng-deep .e-scale .e-tick.e-large {
      background: #764ba2;
      height: 8px;
    }
  `]
})
export class TickStyleComponent {}
```

---

## RTL Support

Right-to-left (RTL) language support for Arabic, Hebrew, and other RTL languages.

### Enabling RTL

Add `dir="rtl"` to the slider container or parent element:

```typescript
<div dir="rtl">
  <ejs-slider 
    id="rtl-slider"
    type="Range"
    [value]="[20, 80]">
  </ejs-slider>
</div>
```

### CSS for RTL

Syncfusion automatically applies RTL styling, but you can customize further:

```css
/* RTL specific styling */
.e-control-wrapper.e-rtl .e-slider {
  direction: rtl;
}

.e-control-wrapper.e-rtl .e-slider-track {
  right: 0;
}
```

### Example: RTL Slider (Arabic)

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-rtl-slider',
  template: `
    <div dir="rtl">
      <h3>منزلق النطاق</h3>
      <ejs-slider 
        id="rtl-slider"
        type="Range"
        [value]="[20, 80]"
        [ticks]="{ placement: 'After', largeStep: 20 }">
      </ejs-slider>
    </div>
  `,
  styles: [`
    :host {
      direction: rtl;
    }

    :host ::ng-deep .e-slider {
      width: 100%;
    }
  `]
})
export class RtlSliderComponent {}
```

---

## Theme Customization

Syncfusion sliders support multiple themes and theme customization.

### Built-in Themes

Import different themes in `styles.css`:

```css
/* Material 3 (Default) */
@import 'node_modules/@syncfusion/ej2-base/styles/material3.css';
@import 'node_modules/@syncfusion/ej2-buttons/styles/material3.css';
@import 'node_modules/@syncfusion/ej2-popups/styles/material3.css';
@import 'node_modules/@syncfusion/ej2-angular-inputs/styles/material3.css';

/* Or Bootstrap 5 */
@import 'node_modules/@syncfusion/ej2-base/styles/bootstrap5.css';
@import 'node_modules/@syncfusion/ej2-buttons/styles/bootstrap5.css';
@import 'node_modules/@syncfusion/ej2-popups/styles/bootstrap5.css';
@import 'node_modules/@syncfusion/ej2-angular-inputs/styles/bootstrap5.css';
```

### Available Themes

- `material3` - Modern Material Design
- `bootstrap5` - Bootstrap 5 design
- `fabric` - Microsoft Fabric design
- `tailwind` - Tailwind CSS compatible
- `fluent` - Microsoft Fluent design

---

## Complete Examples

### Example 1: Premium Volume Slider

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-premium-volume',
  template: `
    <div class="premium-container">
      <h3>🔊 Premium Audio Control</h3>
      <ejs-slider 
        id="premium-volume"
        type="Default"
        [value]="volume"
        [min]="0"
        [max]="100"
        [step]="1"
        [showButtons]="true"
        [ticks]="{ 
          placement: 'After',
          largeStep: 25,
          format: 'P0'
        }"
        [tooltip]="{ 
          isVisible: true,
          showOn: 'Always',
          format: 'P0'
        }"
        (change)="onVolumeChange($event)">
      </ejs-slider>
    </div>
  `,
  styles: [`
    .premium-container {
      padding: 30px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 12px;
      color: #fff;
      max-width: 400px;
    }

    h3 {
      margin-top: 0;
      text-align: center;
    }

    :host ::ng-deep .e-slider-track {
      background: rgba(255, 255, 255, 0.3);
      height: 4px;
    }

    :host ::ng-deep .e-slider .e-handle {
      background: #fff;
      border: 3px solid #667eea;
      height: 24px;
      width: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    :host ::ng-deep .e-scale .e-tick {
      background: rgba(255, 255, 255, 0.5);
    }

    :host ::ng-deep .e-slider-button {
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.4);
    }

    :host ::ng-deep .e-slider-button:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  `]
})
export class PremiumVolumeComponent {
  volume = 60;

  onVolumeChange(event: any) {
    this.volume = event.value;
  }
}
```

### Example 2: Dashboard Price Range Filter

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-price-filter',
  template: `
    <div class="filter-card">
      <h4>Price Range</h4>
      <ejs-slider 
        id="price-filter"
        type="Range"
        [min]="0"
        [max]="5000"
        [value]="[500, 3000]"
        [step]="100"
        [showButtons]="true"
        [ticks]="{ 
          placement: 'After',
          largeStep: 1000,
          format: 'C0'
        }"
        [tooltip]="{ 
          isVisible: true,
          format: 'C2'
        }"
        (change)="onPriceChange($event)">
      </ejs-slider>
      <div class="price-display">
        <span>Min: {{ priceRange[0] | currency }}</span>
        <span>Max: {{ priceRange[1] | currency }}</span>
      </div>
    </div>
  `,
  styles: [`
    .filter-card {
      padding: 20px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: #fafafa;
    }

    h4 {
      margin-top: 0;
      margin-bottom: 15px;
    }

    .price-display {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px solid #e0e0e0;
      font-weight: bold;
      color: #333;
    }

    :host ::ng-deep .e-slider-track {
      background: #42a5f5;
      height: 3px;
    }

    :host ::ng-deep .e-slider .e-handle {
      background: #1e88e5;
      border: 2px solid #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class PriceFilterComponent {
  priceRange: [number, number] = [500, 3000];

  onPriceChange(event: any) {
    this.priceRange = event.value;
  }
}
```

---

## Troubleshooting

### Styles Not Applying

**Problem:** Custom CSS not affecting slider.

**Solution:** Use `::ng-deep` for component styling:

```typescript
styles: [`
  :host ::ng-deep .e-slider-track {
    background: red;
  }
`]
```

### Theme Not Loading

**Problem:** Slider appears unstyled or broken.

**Solution:** Verify CSS imports in `styles.css`:

```css
@import 'node_modules/@syncfusion/ej2-base/styles/material3.css';
@import 'node_modules/@syncfusion/ej2-buttons/styles/material3.css';
@import 'node_modules/@syncfusion/ej2-popups/styles/material3.css';
@import 'node_modules/@syncfusion/ej2-angular-inputs/styles/material3.css';
```

Import order matters! Follow the order above.

### RTL Not Working

**Problem:** Added `dir="rtl"` but slider still appears LTR.

**Solution:**
1. Add `dir="rtl"` to parent container, not slider
2. Verify parent language is set: `<html lang="ar">`
3. Check browser console for errors

---

## Next Steps

- Integrate with **forms** in [form-integration-and-accessibility.md](form-integration-and-accessibility.md)
- Explore **advanced scenarios** in [advanced-scenarios.md](advanced-scenarios.md)
- Review **getting started** for basic setup
