# Advanced Scenarios

## Table of Contents
- [Date Range Slider](#date-range-slider)
- [Time Range Slider](#time-range-slider)
- [Numeric Range Slider with Currency](#numeric-range-slider-with-currency)
- [Hidden to Visible Reveal Pattern](#hidden-to-visible-reveal-pattern)
- [Dependent Sliders](#dependent-sliders)
- [Performance Optimization](#performance-optimization)
- [Common Pitfalls & Gotchas](#common-pitfalls--gotchas)
- [Troubleshooting](#troubleshooting)

---

## Date Range Slider

Create a slider for selecting date ranges where the slider values represent days or dates.

### Concept

Map numeric slider values (0-365) to actual dates, displaying date labels on ticks.

### Complete Implementation

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule, CommonModule],
  standalone: true,
  selector: 'app-date-range-slider',
  template: `
    <div class="date-slider-container">
      <h3>Select Date Range</h3>
      
      <ejs-slider 
        id="date-range-slider"
        type="Range"
        [min]="0"
        [max]="365"
        [value]="[90, 270]"
        [step]="1"
        [ticks]="{ placement: 'After', largeStep: 30 }"
        [tooltip]="{ isVisible: true, showOn: 'Always' }"
        (renderingTicks)="onRenderingTicks($event)"
        (tooltipChange)="onTooltipChange($event)">
      </ejs-slider>

      <div class="date-display">
        <div class="date-box">
          <p class="label">Start Date</p>
          <p class="date">{{ getDateFromDay(selectedRange[0]) | date: 'MMM dd, yyyy' }}</p>
        </div>
        <div class="date-box">
          <p class="label">End Date</p>
          <p class="date">{{ getDateFromDay(selectedRange[1]) | date: 'MMM dd, yyyy' }}</p>
        </div>
        <div class="date-box">
          <p class="label">Duration</p>
          <p class="date">{{ selectedRange[1] - selectedRange[0] }} days</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .date-slider-container {
      padding: 30px;
      max-width: 600px;
      background: #f9f9f9;
      border-radius: 8px;
    }

    h3 {
      text-align: center;
      margin-bottom: 30px;
    }

    ejs-slider {
      width: 100%;
      margin: 30px 0;
    }

    .date-display {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      margin-top: 30px;
    }

    .date-box {
      background: #fff;
      padding: 15px;
      border-radius: 4px;
      border: 1px solid #ddd;
      text-align: center;
    }

    .date-box .label {
      font-size: 12px;
      color: #999;
      margin: 0 0 5px 0;
      text-transform: uppercase;
    }

    .date-box .date {
      font-size: 16px;
      font-weight: bold;
      color: #333;
      margin: 0;
    }

    @media (max-width: 600px) {
      .date-display {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DateRangeSliderComponent {
  baseDate = new Date(2026, 0, 1); // Jan 1, 2026
  selectedRange: [number, number] = [90, 270];

  getDateFromDay(dayOffset: number): Date {
    const date = new Date(this.baseDate);
    date.setDate(date.getDate() + dayOffset);
    return date;
  }

  onRenderingTicks(event: any) {
    const date = this.getDateFromDay(parseInt(event.value));
    event.text = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  onTooltipChange(event: any) {
    const date = this.getDateFromDay(parseInt(event.value));
    event.text = date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  }
}
```

### Key Points

- **Base date:** Set the starting date (e.g., Jan 1, 2026)
- **Map values:** Convert day offset to actual dates
- **Format labels:** Use `renderingTicks` for tick labels, `tooltipChange` for tooltips
- **Display duration:** Calculate difference between selected dates

---

## Time Range Slider

Create a slider for selecting time ranges (hours/minutes).

### Complete Implementation

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule, CommonModule],
  standalone: true,
  selector: 'app-time-range-slider',
  template: `
    <div class="time-slider-container">
      <h3>Select Available Hours</h3>

      <ejs-slider 
        id="time-range"
        type="Range"
        [min]="0"
        [max]="1440"
        [value]="[480, 1020]"
        [step]="15"
        [ticks]="{ placement: 'After', largeStep: 180 }"
        [tooltip]="{ isVisible: true, showOn: 'Always' }"
        (renderingTicks)="onRenderingTicks($event)"
        (tooltipChange)="onTooltipChange($event)">
      </ejs-slider>

      <div class="time-display">
        <div class="time-box">
          <p class="label">Start Time</p>
          <p class="time">{{ formatMinutesToTime(selectedRange[0]) }}</p>
        </div>
        <div class="time-box">
          <p class="label">End Time</p>
          <p class="time">{{ formatMinutesToTime(selectedRange[1]) }}</p>
        </div>
        <div class="time-box">
          <p class="label">Duration</p>
          <p class="time">{{ formatDuration(selectedRange[1] - selectedRange[0]) }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .time-slider-container {
      padding: 30px;
      max-width: 600px;
      background: #f9f9f9;
      border-radius: 8px;
    }

    h3 {
      text-align: center;
      margin-bottom: 30px;
    }

    ejs-slider {
      width: 100%;
      margin: 30px 0;
    }

    .time-display {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      margin-top: 30px;
    }

    .time-box {
      background: #fff;
      padding: 15px;
      border-radius: 4px;
      border: 1px solid #ddd;
      text-align: center;
    }

    .time-box .label {
      font-size: 12px;
      color: #999;
      margin: 0 0 5px 0;
      text-transform: uppercase;
    }

    .time-box .time {
      font-size: 18px;
      font-weight: bold;
      color: #333;
      margin: 0;
      font-family: monospace;
    }
  `]
})
export class TimeRangeSliderComponent {
  selectedRange: [number, number] = [480, 1020]; // 8 AM to 5 PM

  formatMinutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${mins.toString().padStart(2, '0')} ${ampm}`;
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins} min`;
    if (mins === 0) return `${hours} hr`;
    return `${hours}h ${mins}m`;
  }

  onRenderingTicks(event: any) {
    event.text = this.formatMinutesToTime(parseInt(event.value));
  }

  onTooltipChange(event: any) {
    event.text = this.formatMinutesToTime(parseInt(event.value));
  }
}
```

### Time Mapping

- **0 minutes** = 12:00 AM
- **480 minutes** = 8:00 AM (480 / 60 = 8)
- **1020 minutes** = 5:00 PM
- **1440 minutes** = 12:00 AM (next day, 24 * 60)

### Use Cases

- Booking appointment time slots
- Setting office hours
- Scheduling availability
- Activity time ranges

---

## Numeric Range Slider with Currency

Create a price/budget slider with currency formatting, limits, and validation.

### Complete Implementation

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule, ReactiveFormsModule, CommonModule],
  standalone: true,
  selector: 'app-currency-slider',
  template: `
    <form [formGroup]="form" class="currency-form">
      <h3>Budget Allocation</h3>

      <div class="slider-group">
        <label for="budget">Select Budget Range</label>
        <ejs-slider 
          id="budget"
          formControlName="budget"
          type="Range"
          [min]="0"
          [max]="100000"
          [value]="[10000, 50000]"
          [step]="1000"
          [showButtons]="true"
          [ticks]="{ 
            placement: 'After',
            largeStep: 20000,
            format: 'C0'
          }"
          [tooltip]="{ 
            isVisible: true,
            format: 'C2'
          }"
          [limits]="{ 
            enabled: true,
            minStart: 5000,
            minEnd: 30000,
            maxStart: 70000,
            maxEnd: 95000
          }">
        </ejs-slider>
      </div>

      <div class="budget-summary">
        <div class="summary-item">
          <span class="label">Min Budget:</span>
          <span class="value">{{ form.get('budget')?.value[0] | currency }}</span>
        </div>
        <div class="summary-item">
          <span class="label">Max Budget:</span>
          <span class="value">{{ form.get('budget')?.value[1] | currency }}</span>
        </div>
        <div class="summary-item">
          <span class="label">Total Range:</span>
          <span class="value">{{ (form.get('budget')?.value[1] - form.get('budget')?.value[0]) | currency }}</span>
        </div>
      </div>

      <div class="allocation">
        <h4>Proposed Allocation</h4>
        <div class="allocation-item">
          <span>Marketing (30%)</span>
          <span>{{ getRangePercent(0.3) | currency }}</span>
        </div>
        <div class="allocation-item">
          <span>Operations (50%)</span>
          <span>{{ getRangePercent(0.5) | currency }}</span>
        </div>
        <div class="allocation-item">
          <span>Reserve (20%)</span>
          <span>{{ getRangePercent(0.2) | currency }}</span>
        </div>
      </div>

      <button type="submit" [disabled]="form.invalid">Approve Budget</button>
    </form>
  `,
  styles: [`
    .currency-form {
      max-width: 600px;
      padding: 30px;
      background: #f9f9f9;
      border-radius: 8px;
    }

    h3 {
      text-align: center;
      margin-bottom: 30px;
    }

    .slider-group {
      margin: 30px 0;
    }

    label {
      display: block;
      margin-bottom: 15px;
      font-weight: bold;
    }

    ejs-slider {
      width: 100%;
      margin: 20px 0;
    }

    .budget-summary {
      background: #fff;
      padding: 20px;
      border-radius: 4px;
      border: 1px solid #ddd;
      margin: 20px 0;
    }

    .summary-item {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      font-weight: bold;
    }

    .label {
      color: #666;
    }

    .value {
      color: #333;
    }

    .allocation {
      background: #fff;
      padding: 20px;
      border-radius: 4px;
      border: 1px solid #ddd;
      margin: 20px 0;
    }

    h4 {
      margin-top: 0;
      margin-bottom: 15px;
    }

    .allocation-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #eee;
    }

    .allocation-item:last-child {
      border-bottom: none;
    }

    button {
      width: 100%;
      padding: 12px;
      background: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      font-weight: bold;
    }

    button:hover:not(:disabled) {
      background: #0056b3;
    }

    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class CurrencySliderComponent {
  form = new FormGroup({
    budget: new FormControl([10000, 50000], Validators.required)
  });

  getRangePercent(percent: number): number {
    const budget = this.form.get('budget')?.value;
    if (!budget) return 0;
    const rangeSize = budget[1] - budget[0];
    return budget[0] + (rangeSize * percent);
  }
}
```

---

## Hidden to Visible Reveal Pattern

Show a slider only when a certain condition is met.

### Complete Implementation

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule, CommonModule],
  standalone: true,
  selector: 'app-reveal-slider',
  template: `
    <div class="settings-panel">
      <h3>Advanced Settings</h3>

      <div class="setting-group">
        <label>
          <input 
            type="checkbox" 
            [(ngModel)]="enableAdvanced"
            (change)="onToggleAdvanced()">
          Enable Advanced Configuration
        </label>
      </div>

      <!-- Revealed Section -->
      <div class="advanced-section" [@revealAnimation]="enableAdvanced">
        <p class="info">⚙️ Customize performance parameters</p>

        <div class="setting-group">
          <label for="performance">Performance Level:</label>
          <ejs-slider 
            id="performance"
            type="Default"
            [value]="performanceLevel"
            [min]="1"
            [max]="10"
            [ticks]="{ largeStep: 3, placement: 'After' }"
            (change)="onPerformanceChange($event)"
            [disabled]="!enableAdvanced">
          </ejs-slider>
          <p class="description">
            {{ getPerformanceLabel(performanceLevel) }}
          </p>
        </div>

        <div class="setting-group">
          <label for="memory">Memory Allocation (%):</label>
          <ejs-slider 
            id="memory"
            type="Range"
            [value]="memoryAllocation"
            [min]="0"
            [max]="100"
            [step]="10"
            [showButtons]="true"
            [ticks]="{ largeStep: 25, placement: 'After', format: 'P0' }"
            (change)="onMemoryChange($event)"
            [disabled]="!enableAdvanced">
          </ejs-slider>
          <p class="description">
            Allocated: {{ memoryAllocation[0] }}% - {{ memoryAllocation[1] }}%
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .settings-panel {
      max-width: 500px;
      padding: 30px;
      background: #f9f9f9;
      border-radius: 8px;
    }

    h3 {
      margin-top: 0;
    }

    .setting-group {
      margin: 20px 0;
    }

    label {
      display: block;
      margin-bottom: 10px;
      font-weight: bold;
    }

    input[type="checkbox"] {
      margin-right: 8px;
      cursor: pointer;
    }

    .advanced-section {
      background: #fff;
      padding: 20px;
      border-radius: 4px;
      border-left: 4px solid #007bff;
      margin-top: 20px;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .advanced-section[style*="display: none"] {
      display: none;
    }

    .info {
      margin: 0 0 15px 0;
      font-size: 14px;
      color: #666;
    }

    ejs-slider {
      width: 100%;
      margin: 15px 0;
    }

    .description {
      font-size: 12px;
      color: #999;
      margin: 8px 0 0 0;
    }
  `]
})
export class RevealSliderComponent {
  enableAdvanced = false;
  performanceLevel = 5;
  memoryAllocation: [number, number] = [30, 70];

  onToggleAdvanced() {
    console.log('Advanced settings:', this.enableAdvanced ? 'enabled' : 'disabled');
  }

  onPerformanceChange(event: any) {
    this.performanceLevel = event.value;
  }

  onMemoryChange(event: any) {
    this.memoryAllocation = event.value;
  }

  getPerformanceLabel(level: number): string {
    const labels = [
      'Minimum',
      'Very Low',
      'Low',
      'Below Average',
      'Average',
      'Good',
      'Very Good',
      'High',
      'Very High',
      'Maximum'
    ];
    return labels[level - 1] || 'Unknown';
  }
}
```

---

## Dependent Sliders

Two sliders where the second depends on the first (e.g., max can't be less than min).

### Complete Implementation

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule, CommonModule],
  standalone: true,
  selector: 'app-dependent-sliders',
  template: `
    <div class="slider-container">
      <h3>Price Range (Dependent Sliders)</h3>

      <div class="slider-group">
        <label for="min-price">Minimum Price: ${{ minPrice }}</label>
        <ejs-slider 
          id="min-price"
          type="Default"
          [(ngModel)]="minPrice"
          [min]="0"
          [max]="maxPrice"
          [step]="10"
          [ticks]="{ placement: 'After', largeStep: 500 }"
          (change)="onMinPriceChange()">
        </ejs-slider>
      </div>

      <div class="slider-group">
        <label for="max-price">Maximum Price: ${{ maxPrice }}</label>
        <ejs-slider 
          id="max-price"
          type="Default"
          [(ngModel)]="maxPrice"
          [min]="minPrice"
          [max]="5000"
          [step]="10"
          [ticks]="{ placement: 'After', largeStep: 500 }"
          (change)="onMaxPriceChange()">
        </ejs-slider>
      </div>

      <div class="range-summary">
        <p>Price Range: ${{ minPrice }} - ${{ maxPrice }}</p>
        <p>Difference: ${{ maxPrice - minPrice }}</p>
      </div>
    </div>
  `,
  styles: [`
    .slider-container {
      max-width: 500px;
      padding: 30px;
    }

    .slider-group {
      margin: 30px 0;
    }

    label {
      display: block;
      margin-bottom: 15px;
      font-weight: bold;
    }

    ejs-slider {
      width: 100%;
    }

    .range-summary {
      background: #e3f2fd;
      padding: 15px;
      border-radius: 4px;
      margin-top: 20px;
    }

    .range-summary p {
      margin: 5px 0;
    }
  `]
})
export class DependentSlidersComponent {
  minPrice = 500;
  maxPrice = 3000;

  onMinPriceChange() {
    if (this.minPrice > this.maxPrice) {
      this.maxPrice = this.minPrice;
    }
  }

  onMaxPriceChange() {
    if (this.maxPrice < this.minPrice) {
      this.minPrice = this.maxPrice;
    }
  }
}
```

---

## Performance Optimization

### Debouncing Change Events

For sliders that trigger expensive operations (API calls, calculations), debounce the change event:

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-debounce-slider',
  template: `
    <ejs-slider 
      id="debounce-slider"
      type="Range"
      [value]="[20, 80]"
      (change)="onSliderChange($event)">
    </ejs-slider>
    <p>Last update: {{ lastUpdate | date: 'HH:mm:ss' }}</p>
  `
})
export class DebounceSliderComponent {
  private sliderChange$ = new Subject<any>();
  lastUpdate = new Date();

  constructor() {
    this.sliderChange$
      .pipe(debounceTime(500)) // Wait 500ms after last change
      .subscribe((event) => {
        this.handleSliderChange(event);
      });
  }

  onSliderChange(event: any) {
    this.sliderChange$.next(event);
  }

  handleSliderChange(event: any) {
    this.lastUpdate = new Date();
    console.log('Debounced value:', event.value);
    // Perform expensive operation here
  }
}
```

---

## Common Pitfalls & Gotchas

### Pitfall 1: Range Type with Single Value

**Wrong:**
```typescript
type="Range"
[value]="50"  // ❌ String with single number
```

**Correct:**
```typescript
type="Range"
[value]="[50, 100]"  // ✓ Array with two values
```

### Pitfall 2: Forgetting CSS Imports

**Symptom:** Slider appears but has no styling.

**Solution:** Ensure all theme CSS is imported in `styles.css`:
```css
@import 'node_modules/@syncfusion/ej2-base/styles/material3.css';
@import 'node_modules/@syncfusion/ej2-buttons/styles/material3.css';
@import 'node_modules/@syncfusion/ej2-popups/styles/material3.css';
@import 'node_modules/@syncfusion/ej2-angular-inputs/styles/material3.css';
```

### Pitfall 3: Vertical Slider Without Height

**Wrong:**
```typescript
orientation="Vertical"
// ❌ No height - won't display properly
```

**Correct:**
```typescript
orientation="Vertical"
style="height: 300px"  // ✓ Explicit height required
```

### Pitfall 4: Event Binding Errors

**Wrong:**
```typescript
(change)="onSliderChange"  // ❌ Missing ()
```

**Correct:**
```typescript
(change)="onSliderChange($event)"  // ✓ Method call with event
```

### Pitfall 5: FormControl Value Type Mismatch

**Wrong:**
```typescript
// Default slider
type="Default"
[value]="[50]"  // ❌ Array with single element
```

**Correct:**
```typescript
type="Default"
[value]="50"  // ✓ Single number
```

---

## Troubleshooting

### Slider Not Responding to Clicks

**Problem:** Slider displays but doesn't respond to interaction.

**Solution:**
1. Check that slider has width (for horizontal) or height (for vertical)
2. Verify CSS imports are correct
3. Check for JavaScript errors in console
4. Ensure slider isn't disabled: `[disabled]="false"`

### Value Not Updating When Bound to FormControl

**Problem:** Slider moves but form value doesn't change.

**Solution:**
```typescript
// Add formControlName to slider
<ejs-slider formControlName="sliderName"></ejs-slider>

// Ensure FormGroup has matching FormControl
form = new FormGroup({
  sliderName: new FormControl(50)
});
```

### Limits Not Restricting Movement

**Problem:** Handles move beyond specified limits.

**Solution:** Verify `enabled: true` is set:

```typescript
[limits]="{ 
  enabled: true,  // ← MUST be true
  minStart: 10,
  minEnd: 90
}"
```

### Custom Tick Labels Not Showing

**Problem:** `renderingTicks` event fires but labels don't update.

**Solution:** Ensure `event.text` is assigned:

```typescript
onRenderingTicks(event: any) {
  event.text = this.customLabel(event.value);  // ← Must assign to event.text
}
```

---

## Next Steps

- Review **accessibility** in [form-integration-and-accessibility.md](form-integration-and-accessibility.md)
- Go back to **SKILL.md** for navigation to other topics
- Explore **styling** in [styling-and-customization.md](styling-and-customization.md)
