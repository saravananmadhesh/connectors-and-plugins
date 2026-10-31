# Slider Types & Orientation

## Table of Contents
- [Slider Types Overview](#slider-types-overview)
- [Default Type](#default-type)
- [MinRange Type](#minrange-type)
- [Range Type](#range-type)
- [Type Comparison Matrix](#type-comparison-matrix)
- [Orientation](#orientation)
- [Horizontal Slider](#horizontal-slider)
- [Vertical Slider](#vertical-slider)
- [Choosing the Right Type](#choosing-the-right-type)

---

## Slider Types Overview

The Range Slider supports three distinct types, each serving different use cases. The type determines how many handles are displayed and how the selection range is visualized.

| Type | Handles | Selection Display | Best For |
|------|---------|-------------------|----------|
| **Default** | 1 | Single value (no range visual) | Single value input |
| **MinRange** | 1 | Start value to current handle | "From" scenarios |
| **Range** | 2 | Between two handles | Min/max selection |

---

## Default Type

The **Default** type displays a single handle for selecting one value. No range visualization is shown; only the current thumb position matters.

### When to Use Default

- **Volume/brightness control** - Single numeric setting
- **Quality slider** - Choose one quality level
- **Performance settings** - Adjust one parameter
- **Individual value input** - Replace numeric input with slider

### Implementation

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-default-slider',
  template: `
    <div>
      <h3>Volume Control</h3>
      <ejs-slider 
        id="volume-slider"
        type="Default"
        [value]="volumeLevel"
        [min]="0"
        [max]="100"
        (change)="onVolumeChange($event)">
      </ejs-slider>
      <p>Volume: {{ volumeLevel }}%</p>
    </div>
  `,
  styles: [`
    ejs-slider {
      width: 300px;
    }
  `]
})
export class DefaultSliderComponent {
  volumeLevel = 50;

  onVolumeChange(event: any) {
    this.volumeLevel = event.value;
  }
}
```

### Key Point

With Default type, `[value]` is a **single number**, not an array:

```typescript
// ✅ CORRECT
[value]="50"

// ❌ WRONG
[value]="[50]"
```

---

## MinRange Type

The **MinRange** type displays a single handle with a visual range from the slider's minimum value to the current handle position. The "filled" portion of the track shows the selection from min to the current value.

### When to Use MinRange

- **"From this value onwards"** - Starting price, minimum age, threshold setting
- **Visual commitment** - Show what's included from the start
- **Progressive disclosure** - "From $50 and up" scenarios
- **Single threshold input** - Establish a minimum boundary

### Implementation

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-minrange-slider',
  template: `
    <div>
      <h3>Minimum Price: ${{ minPrice }}</h3>
      <ejs-slider 
        id="price-slider"
        type="MinRange"
        [value]="minPrice"
        [min]="0"
        [max]="1000"
        [step]="50"
        (change)="onPriceChange($event)">
      </ejs-slider>
      <p>Showing products from ${{ minPrice }} and up</p>
    </div>
  `,
  styles: [`
    ejs-slider {
      width: 300px;
    }
  `]
})
export class MinRangeSliderComponent {
  minPrice = 250;

  onPriceChange(event: any) {
    this.minPrice = event.value;
  }
}
```

### Key Point

With MinRange type, `[value]` is also a **single number**:

```typescript
// ✅ CORRECT
[value]="250"

// ❌ WRONG
[value]="[250]"
```

---

## Range Type

The **Range** type displays two handles (thumbs) for selecting both minimum and maximum values. The track between the two handles is highlighted to show the selected range.

### When to Use Range

- **Price filters** - Min and max price selection
- **Date/time ranges** - From date to date
- **Age ranges** - Minimum and maximum age
- **Temperature ranges** - Low and high temperature
- **Salary ranges** - Minimum and maximum salary

### Implementation

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-range-slider',
  template: `
    <div>
      <h3>Price Range Filter</h3>
      <ejs-slider 
        id="price-range-slider"
        type="Range"
        [min]="0"
        [max]="1000"
        [value]="priceRange"
        [step]="50"
        (change)="onRangeChange($event)">
      </ejs-slider>
      <p>
        Filter products: ${{ priceRange[0] }} - ${{ priceRange[1] }}
      </p>
    </div>
  `,
  styles: [`
    ejs-slider {
      width: 300px;
    }
  `]
})
export class RangeSliderComponent {
  priceRange: [number, number] = [200, 800];

  onRangeChange(event: any) {
    this.priceRange = event.value;
  }
}
```

### Key Point

With Range type, `[value]` is an **array of two numbers**:

```typescript
// ✅ CORRECT
[value]="[200, 800]"

// ❌ WRONG
[value]="[200, 300, 400]"  // More than 2 values
[value]="200"              // Single value
```

---

## Type Comparison Matrix

| Feature | Default | MinRange | Range |
|---------|---------|----------|-------|
| **Number of Handles** | 1 | 1 | 2 |
| **Value Type** | `number` | `number` | `[number, number]` |
| **Track Highlight** | None | Min to handle | Between handles |
| **Use Ticks** | ✓ | ✓ | ✓ |
| **Use Tooltips** | ✓ | ✓ | ✓ (both handles) |
| **Form Binding** | ✓ | ✓ | ✓ |

---

## Orientation

Range Sliders can be oriented horizontally (default) or vertically. This affects how users interact with and perceive the slider.

---

## Horizontal Slider

Horizontal is the **default orientation**. The slider track runs left-to-right, and handles drag horizontally.

### When to Use Horizontal

- **Standard web UX** - Users expect horizontal sliders
- **Wide layouts** - Plenty of horizontal space
- **Desktop applications** - Natural mouse/trackpad interaction
- **Most use cases** - Default choice

### Implementation

```typescript
<ejs-slider 
  id="horizontal-slider"
  type="Range"
  [value]="[20, 80]"
  orientation="Horizontal">
</ejs-slider>
```

### Full Example

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-horizontal-slider',
  template: `
    <div>
      <h3>Horizontal Range Slider (Default)</h3>
      <ejs-slider 
        id="horizontal"
        type="Range"
        [min]="0"
        [max]="100"
        [value]="[30, 70]"
        orientation="Horizontal"
        (change)="onRangeChange($event)">
      </ejs-slider>
      <p>Range: {{ range[0] }} - {{ range[1] }}</p>
    </div>
  `,
  styles: [`
    ejs-slider {
      width: 400px;
      margin: 20px 0;
    }
  `]
})
export class HorizontalSliderComponent {
  range: [number, number] = [30, 70];

  onRangeChange(event: any) {
    this.range = event.value;
  }
}
```

---

## Vertical Slider

Vertical orientation displays the slider track from top-to-bottom. Handles drag vertically, and the slider occupies minimal horizontal space.

### When to Use Vertical

- **Space constraints** - Limited horizontal width
- **Volume/brightness sidebars** - Vertical UI elements
- **Dashboard layouts** - Multiple sliders in columns
- **Mobile vertical orientation** - Portrait mode on phones
- **Specialized controls** - Faders in music production tools

### Implementation

```typescript
<ejs-slider 
  id="vertical-slider"
  type="Range"
  [value]="[30, 70]"
  orientation="Vertical"
  style="height: 300px;">
</ejs-slider>
```

### Important: Set Explicit Height

Vertical sliders **require explicit height** via inline style or CSS:

```typescript
<ejs-slider 
  id="vertical"
  orientation="Vertical"
  style="height: 300px;">  // ← Required
</ejs-slider>
```

Or via CSS:
```css
#vertical-slider {
  height: 300px;
}
```

### Full Example

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-vertical-slider',
  template: `
    <div class="container">
      <h3>Vertical Sliders</h3>
      
      <div class="slider-group">
        <h4>Volume</h4>
        <ejs-slider 
          id="volume"
          type="Default"
          [value]="volume"
          orientation="Vertical"
          (change)="onVolumeChange($event)"
          style="height: 250px;">
        </ejs-slider>
        <p>{{ volume }}%</p>
      </div>

      <div class="slider-group">
        <h4>Brightness Range</h4>
        <ejs-slider 
          id="brightness"
          type="Range"
          [value]="brightnessRange"
          orientation="Vertical"
          (change)="onBrightnessChange($event)"
          style="height: 250px;">
        </ejs-slider>
        <p>{{ brightnessRange[0] }} - {{ brightnessRange[1] }}</p>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }

    .slider-group {
      display: inline-block;
      margin-right: 40px;
      text-align: center;
    }

    ejs-slider {
      display: block;
      margin: 20px auto;
    }

    p {
      font-weight: bold;
    }
  `]
})
export class VerticalSliderComponent {
  volume = 50;
  brightnessRange: [number, number] = [30, 80];

  onVolumeChange(event: any) {
    this.volume = event.value;
  }

  onBrightnessChange(event: any) {
    this.brightnessRange = event.value;
  }
}
```

---

## Choosing the Right Type

Use this decision tree to select the appropriate slider type:

```
Do you need to select a range (min AND max)?
├─ YES (two values needed)
│  └─ Use: Range type [value]="[min, max]"
│     Examples: Price filters, date ranges, age brackets
│
└─ NO (single value only)
   Do you want visual indication from the slider minimum?
   ├─ YES (show "from minimum to here")
   │  └─ Use: MinRange type [value]="number"
   │     Examples: Minimum price, age threshold
   │
   └─ NO (just show current value)
      └─ Use: Default type [value]="number"
         Examples: Volume, quality, individual parameter
```

### Quick Reference

| User Need | Type | Example |
|-----------|------|---------|
| Set price min/max | **Range** | `[value]="[100, 500]"` |
| Set minimum price | **MinRange** | `[value]="100"` |
| Adjust volume | **Default** | `[value]="50"` |
| Select date range | **Range** | `[value]="[date1, date2]"` |
| Choose start date | **MinRange** | `[value]="date1"` |
| Quality level | **Default** | `[value]="3"` |

---

## Combining Type & Orientation

You can combine any type with any orientation:

```typescript
// Range slider, vertical (e.g., for dashboard)
<ejs-slider 
  type="Range" 
  orientation="Vertical"
  style="height: 300px;">
</ejs-slider>

// MinRange slider, horizontal (e.g., price minimum)
<ejs-slider 
  type="MinRange" 
  orientation="Horizontal">
</ejs-slider>

// Default slider, horizontal (standard)
<ejs-slider 
  type="Default" 
  orientation="Horizontal">
</ejs-slider>
```

All combinations are equally valid—choose based on your UI layout and user interaction model.

---

## Troubleshooting

### Vertical Slider Not Appearing

**Problem:** Vertical slider appears but doesn't show properly.

**Solution:** Set explicit height:
```typescript
<ejs-slider 
  orientation="Vertical"
  style="height: 300px;">  // ← Must have height
</ejs-slider>
```

### Wrong Type Selected

**Problem:** Slider shows but doesn't behave as expected.

**Solution:** Verify type matches your value:
- `type="Default"` → `[value]="50"` (number)
- `type="MinRange"` → `[value]="50"` (number)
- `type="Range"` → `[value]="[20, 80]"` (array)

### Handles Not Draggable

**Problem:** Slider displays but handles don't respond to interaction.

**Solution:**
- Ensure orientation is set or defaults to "Horizontal"
- Check that slider has width (for horizontal) or height (for vertical)
- Verify CSS theme is imported

---

## Next Steps

- Learn about **ticks and labels** in [ticks-and-limits.md](ticks-and-limits.md)
- Add **tooltips and buttons** in [tooltips-and-buttons.md](tooltips-and-buttons.md)
- Format values in [formatting-and-values.md](formatting-and-values.md)
