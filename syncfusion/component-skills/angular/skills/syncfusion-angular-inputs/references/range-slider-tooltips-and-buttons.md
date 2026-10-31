# Tooltips & Buttons

## Table of Contents
- [Tooltips Overview](#tooltips-overview)
- [Enabling Tooltips](#enabling-tooltips)
- [Tooltip Placement](#tooltip-placement)
- [Tooltip Visibility](#tooltip-visibility)
- [Buttons Overview](#buttons-overview)
- [Enabling Buttons](#enabling-buttons)
- [Button Behavior](#button-behavior)
- [Practical Examples](#practical-examples)
- [Troubleshooting](#troubleshooting)

---

## Tooltips Overview

Tooltips display the current slider value in a small popup near the handle. They help users understand the selected value while dragging or hovering.

### Tooltip Purpose

- **Display current value** - Show the numeric or formatted value
- **Assist during dragging** - Visible feedback while moving the handle
- **Improve UX** - Clear indication of the selection

---

## Enabling Tooltips

Use the `[tooltip]` property to configure tooltip display:

```typescript
[tooltip]="{ isVisible: true }"
```

### Minimal Tooltip Example

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-tooltip-slider',
  template: `
    <div>
      <h3>Slider with Tooltip</h3>
      <ejs-slider 
        id="tooltip-slider"
        type="Range"
        [value]="[20, 80]"
        [tooltip]="{ isVisible: true }">
      </ejs-slider>
    </div>
  `,
  styles: [`
    ejs-slider {
      width: 300px;
      margin-top: 20px;
    }
  `]
})
export class TooltipSliderComponent {}
```

### Tooltip Configuration

```typescript
[tooltip]="{ 
  isVisible: true,     // Show the tooltip
  placement: 'Before', // 'Before' (above/left) or 'After' (below/right)
  showOn: 'Focus'      // When to display: 'Focus', 'Hover', 'Always', 'Auto'
}"
```

---

## Tooltip Placement

The `placement` property of `TooltipDataModel` accepts two values:

- **`'Before'`** — Above the track (horizontal slider) or to the left (vertical slider)
- **`'After'`** — Below the track (horizontal slider) or to the right (vertical slider)

### Choosing Placement

**`'Before'` (default):**
```typescript
[tooltip]="{ isVisible: true, placement: 'Before' }"
```
Best for: General use; tooltip appears above the horizontal track.

**`'After'`:**
```typescript
[tooltip]="{ isVisible: true, placement: 'After' }"
```
Best for: When ticks use `'Before'` placement and you want the tooltip on the opposite side.

**Example with Placement**

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-placement-slider',
  template: `
    <div>
      <h3>Range Slider - Tooltip After (Below) Track</h3>
      <ejs-slider 
        id="placement-slider"
        type="Range"
        [value]="[30, 70]"
        [ticks]="{ placement: 'Before', largeStep: 20 }"
        [tooltip]="{ 
          isVisible: true, 
          placement: 'After' 
        }">
      </ejs-slider>
    </div>
  `,
  styles: [`
    ejs-slider {
      width: 300px;
      margin-top: 40px;
    }
  `]
})
export class PlacementSliderComponent {}
```

---

## Tooltip Visibility

Control when tooltips appear:

### showOn Options

- **`'Focus'`** — Shows when the handle has keyboard focus or is being dragged
- **`'Hover'`** — Shows on mouse hover (desktop) or tap-hold (touch)
- **`'Always'`** — Always visible
- **`'Auto'`** — Automatically determines based on device type (hover on desktop, touch on mobile)

### Focus (Default)

```typescript
[tooltip]="{ isVisible: true, showOn: 'Focus' }"
```

Tooltip appears when:
- Handle is focused via keyboard or mouse
- User drags the slider

### Hover

```typescript
[tooltip]="{ isVisible: true, showOn: 'Hover' }"
```

Tooltip appears only when mouse hovers over the handle.

### Always

```typescript
[tooltip]="{ isVisible: true, showOn: 'Always' }"
```

Tooltip is always visible.

**Example:**
```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-visibility-slider',
  template: `
    <div>
      <h3>Tooltip Visibility Modes</h3>

      <div class="slider-group">
        <h4>Focus (Default)</h4>
        <ejs-slider 
          id="focus-slider"
          type="Default"
          [value]="50"
          [tooltip]="{ isVisible: true, showOn: 'Focus' }">
        </ejs-slider>
        <p>Visible when focused or dragging</p>
      </div>

      <div class="slider-group">
        <h4>Hover</h4>
        <ejs-slider 
          id="hover-slider"
          type="Default"
          [value]="50"
          [tooltip]="{ isVisible: true, showOn: 'Hover' }">
        </ejs-slider>
        <p>Visible only when hovering</p>
      </div>

      <div class="slider-group">
        <h4>Always</h4>
        <ejs-slider 
          id="always-slider"
          type="Default"
          [value]="50"
          [tooltip]="{ isVisible: true, showOn: 'Always' }">
        </ejs-slider>
        <p>Always visible</p>
      </div>
    </div>
  `,
  styles: [`
    .slider-group {
      margin: 30px 0;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    ejs-slider {
      width: 300px;
      margin: 20px 0;
    }

    p {
      font-size: 12px;
      color: #666;
    }
  `]
})
export class VisibilitySliderComponent {}
```

---

## Buttons Overview

Buttons are interactive controls that allow users to increment or decrement the slider value without dragging the handle. They appear at the edges of the slider.

### Button Purpose

- **Keyboard-free adjustment** - Click buttons instead of dragging
- **Precise increments** - Advance by step value
- **Accessibility** - Easier for users with motor control issues
- **Mobile-friendly** - Larger tap targets than tiny handle

---

## Enabling Buttons

Use the `[showButtons]` property to show increment/decrement buttons:

```typescript
[showButtons]="true"
```

### Complete Button Example

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-buttons-slider',
  template: `
    <div>
      <h3>Slider with Buttons</h3>
      <ejs-slider 
        id="buttons-slider"
        type="Range"
        [value]="[20, 80]"
        [step]="5"
        [showButtons]="true"
        (change)="onValueChange($event)">
      </ejs-slider>
      <p>Current range: {{ sliderValue[0] }} - {{ sliderValue[1] }}</p>
      <p>Step: 5 (each click changes by 5)</p>
    </div>
  `,
  styles: [`
    ejs-slider {
      width: 300px;
      margin: 20px 0;
    }
  `]
})
export class ButtonsSliderComponent {
  sliderValue: [number, number] = [20, 80];

  onValueChange(event: any) {
    this.sliderValue = event.value;
  }
}
```

---

## Button Behavior

### In Default & MinRange Sliders

Buttons control the single handle:

```typescript
<ejs-slider 
  type="Default"
  [value]="50"
  [step]="10"
  [showButtons]="true">
</ejs-slider>
```

- **Left button** (or -) - Decreases value by step
- **Right button** (or +) - Increases value by step

### In Range Sliders

Buttons **default to the first handle** (minimum value):

```typescript
<ejs-slider 
  type="Range"
  [value]="[20, 80]"
  [step]="5"
  [showButtons]="true">
</ejs-slider>
```

Clicking buttons changes the first handle (20). To control the **second handle**, click on the second handle first to focus it, then buttons control it.

**Key Point:** Tab to second handle or click it directly to change which handle the buttons control.

---

## Practical Examples

### Example 1: Volume Control with Buttons

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-volume-control',
  template: `
    <div>
      <h3>Volume Control</h3>
      <div class="control-group">
        <button class="mute-btn" (click)="mute()">🔇 Mute</button>
        
        <ejs-slider 
          id="volume-slider"
          type="Default"
          [value]="volume"
          [min]="0"
          [max]="100"
          [step]="5"
          [showButtons]="true"
          [ticks]="{ largeStep: 25 }"
          [tooltip]="{ isVisible: true, showOn: 'Always' }"
          (change)="onVolumeChange($event)">
        </ejs-slider>
        
        <button class="max-btn" (click)="maximize()">🔊 Max</button>
      </div>
      <p>Volume: {{ volume }}%</p>
    </div>
  `,
  styles: [`
    .control-group {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 20px 0;
    }

    .mute-btn, .max-btn {
      padding: 8px 12px;
      cursor: pointer;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: #f5f5f5;
    }

    ejs-slider {
      flex: 1;
      width: 300px;
    }

    p {
      font-weight: bold;
      margin-top: 15px;
    }
  `]
})
export class VolumeControlComponent {
  volume = 50;

  onVolumeChange(event: any) {
    this.volume = event.value;
  }

  mute() {
    this.volume = 0;
  }

  maximize() {
    this.volume = 100;
  }
}
```

### Example 2: Price Range with Buttons

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-price-range',
  template: `
    <div>
      <h3>Price Range Filter</h3>
      <ejs-slider 
        id="price-slider"
        type="Range"
        [min]="0"
        [max]="1000"
        [value]="priceRange"
        [step]="50"
        [showButtons]="true"
        [ticks]="{ largeStep: 200, format: 'C' }"
        [tooltip]="{ isVisible: true, format: 'C' }"
        (change)="onPriceChange($event)">
      </ejs-slider>
      <p>
        Filter: ${{ priceRange[0] }} - ${{ priceRange[1] }}
      </p>
      <p style="font-size: 12px; color: #666;">
        Use buttons (or drag handles) to adjust range. Click second handle to adjust max price.
      </p>
    </div>
  `,
  styles: [`
    ejs-slider {
      width: 100%;
      max-width: 400px;
      margin: 20px 0;
    }

    p {
      margin-top: 15px;
    }
  `]
})
export class PriceRangeComponent {
  priceRange: [number, number] = [200, 800];

  onPriceChange(event: any) {
    this.priceRange = event.value;
  }
}
```

### Example 3: Responsive Range with Tooltips & Buttons

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-responsive-slider',
  template: `
    <div>
      <h3>Temperature Range (°F)</h3>
      <ejs-slider 
        id="temp-slider"
        type="Range"
        [min]="32"
        [max]="104"
        [value]="tempRange"
        [step]="2"
        [showButtons]="true"
        [ticks]="{ 
          placement: 'After',
          largeStep: 9,
          smallStep: 3
        }"
        [tooltip]="{ 
          isVisible: true, 
          placement: 'Before',
          showOn: 'Always'
        }"
        (change)="onTempChange($event)">
      </ejs-slider>
      <p>Comfortable range: {{ tempRange[0] }}°F - {{ tempRange[1] }}°F</p>
    </div>
  `,
  styles: [`
    ejs-slider {
      width: 100%;
      max-width: 500px;
      margin: 30px 0;
    }

    p {
      margin-top: 20px;
      font-weight: bold;
    }

    @media (max-width: 768px) {
      ejs-slider {
        max-width: 100%;
      }
    }
  `]
})
export class ResponsiveSliderComponent {
  tempRange: [number, number] = [68, 76];

  onTempChange(event: any) {
    this.tempRange = event.value;
  }
}
```

---

## Combining Tooltips + Buttons + Ticks

Here's a complete example with all features working together:

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-complete-slider',
  template: `
    <div>
      <h3>Complete Slider Example</h3>
      
      <div class="description">
        <p>Adjust the budget range. Use buttons for precise control or drag for quick adjustment.</p>
      </div>

      <ejs-slider 
        id="budget-slider"
        type="Range"
        [min]="0"
        [max]="50000"
        [value]="budgetRange"
        [step]="1000"
        [showButtons]="true"
        [ticks]="{ 
          placement: 'After',
          largeStep: 10000,
          format: 'C0'
        }"
        [tooltip]="{ 
          isVisible: true, 
          placement: 'Before',
          showOn: 'Always',
          format: 'C0'
        }"
        (change)="onBudgetChange($event)">
      </ejs-slider>

      <div class="info">
        <p><strong>Budget Range:</strong> {{ budgetRange[0] | currency }} - {{ budgetRange[1] | currency }}</p>
        <p><strong>Range Size:</strong> {{ (budgetRange[1] - budgetRange[0]) | currency }}</p>
      </div>
    </div>
  `,
  styles: [`
    ejs-slider {
      width: 100%;
      max-width: 600px;
      margin: 20px 0;
    }

    .description {
      padding: 15px;
      background: #f9f9f9;
      border-radius: 4px;
      margin-bottom: 20px;
    }

    .info {
      margin-top: 20px;
      padding: 15px;
      background: #e8f4f8;
      border-radius: 4px;
    }

    p {
      margin: 5px 0;
    }
  `]
})
export class CompleteSliderComponent {
  budgetRange: [number, number] = [10000, 40000];

  onBudgetChange(event: any) {
    this.budgetRange = event.value;
  }
}
```

---

## Troubleshooting

### Buttons Not Appearing

**Problem:** `showButtons="true"` but buttons don't show.

**Solution:**
1. Verify theme CSS is imported (buttons need stylesheet)
2. Check slider has proper dimensions set
3. Ensure no CSS hiding the buttons

### Buttons Not Working

**Problem:** Buttons visible but clicking doesn't change value.

**Solution:**
- Verify `[step]` is set (default is 1)
- Check for JavaScript errors in console
- Ensure slider isn't disabled

### Range Slider: Wrong Handle Changing

**Problem:** Buttons change the wrong handle in Range slider.

**Solution:** Click the second handle first to focus it:
```typescript
// After clicking second handle, buttons will control it
// Or use Tab key to navigate between handles
```

### Tooltip Not Showing Value

**Problem:** Tooltip appears but shows incorrect or no value.

**Solution:**
- Ensure `[tooltip]="{ isVisible: true }"` is set
- Check `format` property if using custom format
- Verify `showOn` property matches your interaction

---

## Next Steps

- Apply **value formatting** in [formatting-and-values.md](formatting-and-values.md)
- Learn **styling** in [styling-and-customization.md](styling-and-customization.md)
- Integrate with **forms** in [form-integration-and-accessibility.md](form-integration-and-accessibility.md)
