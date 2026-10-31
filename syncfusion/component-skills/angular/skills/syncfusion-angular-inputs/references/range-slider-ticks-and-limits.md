# Ticks, Marks & Limits

## Table of Contents
- [Ticks Overview](#ticks-overview)
- [Adding Tick Marks](#adding-tick-marks)
- [Tick Placement](#tick-placement)
- [Tick Formatting](#tick-formatting)
- [Step Configuration](#step-configuration)
- [Limits Overview](#limits-overview)
- [Configuring Limits](#configuring-limits)
- [Practical Examples](#practical-examples)
- [Troubleshooting](#troubleshooting)

---

## Ticks Overview

Ticks are visual markers along the slider track that help users understand the value scale. They can display as small marks, large marks, or labels at specific intervals.

### Tick Components

- **Small step ticks** - Minor divisions between major marks
- **Large step ticks** - Major interval markers
- **Tick labels** - Text labels at tick positions
- **Placement** - Where ticks appear relative to the track (Before, After, Both)

---

## Adding Tick Marks

Use the `[ticks]` property to configure tick display:

```typescript
<ejs-slider 
  id="slider-with-ticks"
  type="Range"
  [value]="[25, 75]"
  [ticks]="{ placement: 'Before' }">
</ejs-slider>
```

### Minimal Tick Configuration

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-ticks-slider',
  template: `
    <div>
      <h3>Slider with Ticks</h3>
      <ejs-slider 
        id="ticks-slider"
        type="Range"
        [value]="[20, 80]"
        [ticks]="{ placement: 'Before' }">
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
export class TicksSliderComponent {}
```

> **Note:** Add top margin to horizontal sliders when using `Before` placement to avoid tick overlap.

---

## Tick Placement

Control where ticks appear relative to the slider track:

### Placement: Before

Ticks appear **above** the track (for horizontal sliders).

```typescript
[ticks]="{ placement: 'Before' }"
```

**Use when:** Ticks shouldn't interfere with tooltip placement below.

**Example:**
```typescript
<ejs-slider 
  id="slider"
  type="Range"
  [ticks]="{ placement: 'Before' }"
  [style.marginTop]="'40px'">
</ejs-slider>
```

### Placement: After

Ticks appear **below** the track (for horizontal sliders).

```typescript
[ticks]="{ placement: 'After' }"
```

**Use when:** Default placement below the track works for your layout.

**Example:**
```typescript
<ejs-slider 
  id="slider"
  type="Range"
  [ticks]="{ placement: 'After' }">
</ejs-slider>
```

### Placement: Both

Ticks appear **both above and below** the track.

```typescript
[ticks]="{ placement: 'Both' }"
```

**Use when:** You want visual emphasis on the scale.

**Example:**
```typescript
<ejs-slider 
  id="slider"
  type="Range"
  [ticks]="{ placement: 'Both' }"
  [style.marginTop]="'40px'"
  [style.marginBottom]="'40px'">
</ejs-slider>
```

---

## Tick Formatting

Add labels to ticks and control their display format.

### Basic Label Formatting

```typescript
[ticks]="{ placement: 'After', largeStep: 20 }"
```

By default, labels show the numeric value at each large step.

### Using Format String

Format tick labels as percentages, currency, or custom formats:

```typescript
// Percentage format
[ticks]="{ placement: 'After', largeStep: 25, format: 'P0' }"

// Currency format (US dollars)
[ticks]="{ placement: 'After', largeStep: 100, format: 'C' }"

// Custom format with decimals
[ticks]="{ placement: 'After', largeStep: 10, format: 'N2' }"
```

### Complete Percentage Example

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-format-slider',
  template: `
    <div>
      <h3>Volume Control (0-100%)</h3>
      <ejs-slider 
        id="volume-slider"
        type="Default"
        [value]="50"
        [min]="0"
        [max]="100"
        [ticks]="{ 
          placement: 'After', 
          largeStep: 25, 
          format: 'P0' 
        }">
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
export class FormatSliderComponent {}
```

**Output:**
```
Ticks display as: 0%, 25%, 50%, 75%, 100%
```

### Custom Format with Event

For complex formatting, use the `renderingTicks` event:

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-custom-format',
  template: `
    <div>
      <h3>Day of Week Slider</h3>
      <ejs-slider 
        id="day-slider"
        type="Default"
        [value]="3"
        [min]="0"
        [max]="6"
        [ticks]="{ placement: 'After' }"
        (renderingTicks)="onRenderingTicks($event)">
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
export class CustomFormatComponent {
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  onRenderingTicks(event: any) {
    // Transform numeric tick value to day name
    event.text = this.days[parseInt(event.value)];
  }
}
```

**Output:**
```
Ticks display as: Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
```

---

## Step Configuration

Control the spacing between small and large ticks:

### largeStep

Distance between **major tick marks** (those with labels):

```typescript
[ticks]="{ largeStep: 20 }"  // Major tick every 20 units
```

### smallStep

Distance between **minor tick marks** (smaller marks between large steps):

```typescript
[ticks]="{ largeStep: 20, smallStep: 5 }"
```

This creates:
- Major ticks every 20 units (with labels)
- Minor ticks every 5 units (without labels)

### Full Configuration Example

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-step-slider',
  template: `
    <div>
      <h3>Temperature Slider (°F)</h3>
      <ejs-slider 
        id="temperature"
        type="Range"
        [min]="32"
        [max]="104"
        [value]="[68, 86]"
        [ticks]="{ 
          placement: 'After',
          largeStep: 9,      // Major tick every 9°F
          smallStep: 3       // Minor tick every 3°F
        }">
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
export class StepSliderComponent {}
```

---

## Limits Overview

Limits define restricted zones where handles cannot go. They create visual boundaries and prevent selection of certain value ranges.

### Why Use Limits

- **Prevent invalid ranges** - Ensure min never exceeds max
- **Define safe zones** - Restrict to acceptable value ranges
- **Visual boundaries** - Show locked-out areas
- **Business rules** - Enforce constraints (e.g., "price min must be at least $50")

---

## Configuring Limits

Use the `[limits]` property to define restricted zones:

```typescript
[limits]="{ 
  enabled: true,
  minStart: 10,      // First handle starts at position 10
  minEnd: 30,        // First handle cannot go beyond 30
  maxStart: 70,      // Second handle starts at position 70
  maxEnd: 90         // Second handle cannot go beyond 90
}"
```

### Limits on Range Slider

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-limits-slider',
  template: `
    <div>
      <h3>Price Range (Limited Zones)</h3>
      <ejs-slider 
        id="price-range"
        type="Range"
        [min]="0"
        [max]="1000"
        [value]="[200, 800]"
        [limits]="{ 
          enabled: true,
          minStart: 50,      // Min can't go below $50
          minEnd: 300,       // Min can't exceed $300
          maxStart: 700,     // Max can't go below $700
          maxEnd: 950        // Max can't go above $950
        }">
      </ejs-slider>
      <p>Valid range: $50-$300 for min, $700-$950 for max</p>
    </div>
  `,
  styles: [`
    ejs-slider {
      width: 300px;
    }
  `]
})
export class LimitsSliderComponent {}
```

### Asymmetric Limits (MinRange Slider)

For MinRange sliders, use `minStart` and `minEnd`:

```typescript
[limits]="{ 
  enabled: true,
  minStart: 100,     // Handle starts at 100
  minEnd: 500        // Handle can't exceed 500
}"
```

---

## Practical Examples

### Example 1: Age Range Filter (18-65 years)

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-age-filter',
  template: `
    <div>
      <h3>Age Range Filter</h3>
      <ejs-slider 
        id="age-slider"
        type="Range"
        [min]="0"
        [max]="100"
        [value]="[25, 65]"
        [step]="1"
        [ticks]="{ 
          placement: 'After',
          largeStep: 10
        }"
        [limits]="{ 
          enabled: true,
          minStart: 18,      // Min age: 18
          minEnd: 50,        // Min can't exceed 50
          maxStart: 50,      // Max starts at 50
          maxEnd: 100        // Max age: 100
        }"
        (change)="onAgeRangeChange($event)">
      </ejs-slider>
      <p>Age range: {{ ageRange[0] }} - {{ ageRange[1] }} years</p>
    </div>
  `,
  styles: [`
    ejs-slider {
      width: 300px;
      margin-top: 20px;
    }
  `]
})
export class AgeFilterComponent {
  ageRange: [number, number] = [25, 65];

  onAgeRangeChange(event: any) {
    this.ageRange = event.value;
  }
}
```

### Example 2: Disk Space Allocation (with Reserved Zones)

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-disk-space',
  template: `
    <div>
      <h3>Disk Space Allocation (GB)</h3>
      <ejs-slider 
        id="disk-slider"
        type="Range"
        [min]="0"
        [max]="1000"
        [value]="[100, 800]"
        [step]="50"
        [ticks]="{ 
          placement: 'After',
          largeStep: 200,
          format: 'N0'
        }"
        [limits]="{ 
          enabled: true,
          minStart: 50,      // Minimum allocation: 50GB
          minEnd: 400,       // Min can't exceed 400GB
          maxStart: 600,     // Max allocation starts at 600GB
          maxEnd: 950        // Max can't exceed 950GB
        }">
      </ejs-slider>
      <p>Reserved: 50GB System + Free: Remaining</p>
    </div>
  `,
  styles: [`
    ejs-slider {
      width: 300px;
      margin-top: 20px;
    }
  `]
})
export class DiskSpaceComponent {}
```

---

## Troubleshooting

### Ticks Not Showing

**Problem:** Slider has ticks configured but they don't appear.

**Solution:**
1. Add `[style.marginTop]="'40px'"` for `placement: 'Before'`
2. Check that `largeStep` value isn't too large
3. Ensure CSS theme is imported

```typescript
<ejs-slider 
  [ticks]="{ placement: 'Before' }"
  [style.marginTop]="'40px'">
</ejs-slider>
```

### Tick Labels Overlapping

**Problem:** Tick labels run together or overlap.

**Solution:** Increase `largeStep` to spread them out:

```typescript
// Too close (overlapping)
[ticks]="{ largeStep: 5 }"

// Better spacing
[ticks]="{ largeStep: 20 }"
```

### Limits Not Working

**Problem:** Handle still moves beyond limit boundaries.

**Solution:** Ensure `enabled: true` is set:

```typescript
[limits]="{ 
  enabled: true,  // ← Must be true
  minStart: 10,
  minEnd: 90
}"
```

### Custom Tick Labels Not Updating

**Problem:** `renderingTicks` event fires but labels don't change.

**Solution:** Modify `event.text` in the handler:

```typescript
onRenderingTicks(event: any) {
  event.text = this.customLabel(event.value);  // ← Must assign to event.text
}
```

---

## Next Steps

- Add **tooltips and buttons** in [tooltips-and-buttons.md](tooltips-and-buttons.md)
- Apply **value formatting** in [formatting-and-values.md](formatting-and-values.md)
- Learn **styling** in [styling-and-customization.md](styling-and-customization.md)
