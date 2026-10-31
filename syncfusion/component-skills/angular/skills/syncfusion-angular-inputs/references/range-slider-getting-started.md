# Getting Started with Range Slider

## Installation & Setup

### Step 1: Install the Package

Use Angular CLI's `ng add` command to install the Range Slider package and configure your project:

```bash
ng add @syncfusion/ej2-angular-inputs
```

This command automatically:
- Adds `@syncfusion/ej2-angular-inputs` to `package.json`
- Installs peer dependencies
- Registers the default Material 3 theme in `angular.json`
- Imports necessary modules

### Step 2: Import the Component

In your Angular component file (Angular 21+ standalone):

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],  // Import SliderModule
  standalone: true,
  selector: 'app-root',
  template: `<ejs-slider id="slider"></ejs-slider>`
})
export class App {}
```

### Step 3: Add CSS Theme

Add the Material 3 theme to your global `styles.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/slider/index.css";
```

> **Why multiple imports?** The Range Slider depends on base, buttons, and popups components. Import all to ensure correct styling.

### Step 4: Run Your Application

```bash
ng serve
```

Navigate to `http://localhost:4200` to see your slider.

---

## Basic Implementation

### Minimal Default Slider

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="container">
      <h2>Single Value Slider</h2>
      <ejs-slider id="default-slider" [value]="50"></ejs-slider>
      <p>Value: {{ sliderValue }}</p>
    </div>
  `,
  styles: [`
    #container {
      padding: 20px;
    }
    ejs-slider {
      width: 300px;
    }
  `]
})
export class App {
  sliderValue = 50;
}
```

### Range Slider with Dual Handles

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="container">
      <h2>Range Slider (Dual Handles)</h2>
      <ejs-slider 
        id="range-slider"
        type="Range"
        [min]="0"
        [max]="100"
        [value]="[20, 80]"
        (change)="onRangeChange($event)">
      </ejs-slider>
      <p>Selected range: {{ rangeValue[0] }} - {{ rangeValue[1] }}</p>
    </div>
  `,
  styles: [`
    #container {
      padding: 20px;
    }
    ejs-slider {
      width: 300px;
    }
  `]
})
export class App {
  rangeValue: [number, number] = [20, 80];

  onRangeChange(event: any) {
    this.rangeValue = event.value;
  }
}
```

---

## Understanding Slider Types

The Range Slider supports three distinct types:

### Type 1: Default (Single Value)

Select a single value from the range. Uses one handle.

**When to use:**
- Volume control
- Single numeric input
- Quality/performance settings
- Individual value selection

**Example:**
```typescript
<ejs-slider 
  id="default"
  [value]="30"
  [min]="0"
  [max]="100">
</ejs-slider>
```

### Type 2: MinRange (Start-to-Current)

Shows selection from the minimum value to the current handle position. Uses one handle.

**When to use:**
- "From this value onwards" scenarios
- Visual indication of commitment from start point
- Sales range starting from a base value

**Example:**
```typescript
<ejs-slider 
  id="minrange"
  type="MinRange"
  [value]="50"
  [min]="0"
  [max]="100">
</ejs-slider>
```

### Type 3: Range (Dual Handles)

Select a range between two handles. Shows selection between min and max handles.

**When to use:**
- Date ranges
- Price filters
- Age ranges
- Temperature ranges
- Min/max value selection

**Example:**
```typescript
<ejs-slider 
  id="range"
  type="Range"
  [min]="0"
  [max]="100"
  [value]="[20, 80]">
</ejs-slider>
```

---

## First Working Example: Complete Application

Here's a complete, runnable example with all three slider types:

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule, CommonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="container">
      <h1>Range Slider Examples</h1>

      <!-- Default Slider -->
      <div class="slider-group">
        <h3>Default Slider (Single Value)</h3>
        <ejs-slider 
          id="default"
          [value]="defaultValue"
          [min]="0"
          [max]="100"
          (change)="onDefaultChange($event)">
        </ejs-slider>
        <p>Current value: {{ defaultValue }}</p>
      </div>

      <!-- MinRange Slider -->
      <div class="slider-group">
        <h3>MinRange Slider (Start-to-Current)</h3>
        <ejs-slider 
          id="minrange"
          type="MinRange"
          [value]="minrangeValue"
          [min]="0"
          [max]="100"
          (change)="onMinrangeChange($event)">
        </ejs-slider>
        <p>Current value: {{ minrangeValue }}</p>
      </div>

      <!-- Range Slider -->
      <div class="slider-group">
        <h3>Range Slider (Dual Handles)</h3>
        <ejs-slider 
          id="range"
          type="Range"
          [min]="0"
          [max]="100"
          [value]="rangeValue"
          (change)="onRangeChange($event)">
        </ejs-slider>
        <p>Range: {{ rangeValue[0] }} - {{ rangeValue[1] }}</p>
      </div>
    </div>
  `,
  styles: [`
    #container {
      padding: 30px;
      font-family: Arial, sans-serif;
    }

    .slider-group {
      margin: 30px 0;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    ejs-slider {
      width: 100%;
      max-width: 400px;
    }

    p {
      margin-top: 15px;
      font-weight: bold;
      color: #333;
    }
  `]
})
export class App {
  defaultValue = 30;
  minrangeValue = 50;
  rangeValue: [number, number] = [20, 80];

  onDefaultChange(event: any) {
    this.defaultValue = event.value;
    console.log('Default slider changed:', this.defaultValue);
  }

  onMinrangeChange(event: any) {
    this.minrangeValue = event.value;
    console.log('MinRange slider changed:', this.minrangeValue);
  }

  onRangeChange(event: any) {
    this.rangeValue = event.value;
    console.log('Range slider changed:', this.rangeValue);
  }
}
```

**Bootstrap in `main.ts`:**
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app.component';
import 'zone.js';

bootstrapApplication(App).catch((err) => console.error(err));
```

---

## Troubleshooting

### Slider Not Showing

**Problem:** Slider appears but isn't visible or has styling issues.

**Solution:**
1. Ensure CSS imports are in `styles.css` (not component CSS)
2. Check import order: base → buttons → popups → inputs
3. Verify `@syncfusion/ej2-angular-inputs` is installed

### Module Not Found

**Problem:** `SliderModule` not recognized.

**Solution:**
```bash
npm install @syncfusion/ej2-angular-inputs
```

### Slider Not Responding to Clicks

**Problem:** Slider is visible but doesn't respond to user interaction.

**Solution:**
- Ensure slider has width set (inline style or CSS)
- Check browser console for errors
- Verify Angular version compatibility (Angular 19+)

---

## Next Steps

Now that your slider is working:
1. Learn about **slider types** in [slider-types-and-orientation.md](slider-types-and-orientation.md)
2. Add **ticks and limits** in [ticks-and-limits.md](ticks-and-limits.md)
3. Configure **tooltips and buttons** in [tooltips-and-buttons.md](tooltips-and-buttons.md)
4. Apply **custom formatting** in [formatting-and-values.md](formatting-and-values.md)
5. **Customize appearance** in [styling-and-customization.md](styling-and-customization.md)
