# Formatting & Value Display

## Table of Contents
- [Formatting Overview](#formatting-overview)
- [Format API Basics](#format-api-basics)
- [Numeric Formatting](#numeric-formatting)
- [Percentage Formatting](#percentage-formatting)
- [Currency Formatting](#currency-formatting)
- [Custom Formatting with Events](#custom-formatting-with-events)
- [Internationalization](#internationalization)
- [Advanced Scenarios](#advanced-scenarios)
- [Troubleshooting](#troubleshooting)

---

## Formatting Overview

The Range Slider can format values displayed in **ticks** and **tooltips** to show percentages, currency, dates, or custom formats. Formatted values are also applied to ARIA attributes for accessibility.

### Two Approaches

1. **Format API** - Built-in internationalization support with predefined formats
2. **Events** - Custom logic via `renderingTicks` and `tooltipChange` events

---

## Format API Basics

The `format` property uses .NET-style format specifiers. Apply formatting to:

- **Ticks:** `[ticks]="{ format: 'P0' }"`
- **Tooltips:** `[tooltip]="{ format: 'P0' }"`

### Common Format Specifiers

| Format | Name | Example | Range |
|--------|------|---------|-------|
| **N** | Number (with separators) | N0, N1, N2 | 1,234.56 |
| **P** | Percentage | P0, P1, P2 | 25%, 25.5% |
| **C** | Currency | C, C0, C2 | $1,234.56 |
| **D** | Integer (zero-padded) | D2, D3 | 01, 002 |

### Precision Numbers

Add a digit after the format letter to specify decimal places:

- **P0** - Percentage with 0 decimals: 25%
- **P1** - Percentage with 1 decimal: 25.0%
- **P2** - Percentage with 2 decimals: 25.00%

---

## Numeric Formatting

Format values as numbers with thousand separators and specified decimals.

### Format: N (Number)

```typescript
// N0 - No decimals
[ticks]="{ format: 'N0' }"
// Output: 1,234

// N2 - Two decimals
[ticks]="{ format: 'N2' }"
// Output: 1,234.56
```

### Example: Numeric Formatting

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-numeric-format',
  template: `
    <div>
      <h3>Sales Commission (Numbers with Separator)</h3>
      <ejs-slider 
        id="commission-slider"
        type="Range"
        [min]="0"
        [max]="10000"
        [value]="[1000, 5000]"
        [step]="100"
        [ticks]="{ 
          placement: 'After',
          largeStep: 2000,
          format: 'N0'  // ← Numeric format
        }"
        [tooltip]="{ 
          isVisible: true, 
          format: 'N0' 
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
export class NumericFormatComponent {}
```

**Output:**
```
Ticks: 0, 2,000, 4,000, 6,000, 8,000, 10,000
Tooltip: 5,000 (while dragging)
```

---

## Percentage Formatting

Display values as percentages (0-100 becomes 0%-100%).

### Format: P (Percentage)

```typescript
// P0 - No decimals
[ticks]="{ format: 'P0' }"
// Output: 25%

// P1 - One decimal
[ticks]="{ format: 'P1' }"
// Output: 25.0%

// P2 - Two decimals
[ticks]="{ format: 'P2' }"
// Output: 25.00%
```

### Example: Percentage Formatting

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-percentage-format',
  template: `
    <div>
      <h3>Quality Setting (0-100%)</h3>
      <ejs-slider 
        id="quality-slider"
        type="Default"
        [value]="75"
        [min]="0"
        [max]="100"
        [ticks]="{ 
          placement: 'After',
          largeStep: 25,
          format: 'P0'  // ← Percentage format
        }"
        [tooltip]="{ 
          isVisible: true, 
          format: 'P0',
          showOn: 'Always'
        }">
      </ejs-slider>
      <p>Image quality: {{ 75 }}%</p>
    </div>
  `,
  styles: [`
    ejs-slider {
      width: 300px;
      margin-top: 20px;
    }

    p {
      margin-top: 15px;
      font-weight: bold;
    }
  `]
})
export class PercentageFormatComponent {}
```

**Output:**
```
Ticks: 0%, 25%, 50%, 75%, 100%
Tooltip: 75% (while dragging)
```

---

## Currency Formatting

Display values as currency with locale-specific symbols and formatting.

### Format: C (Currency)

```typescript
// C - Default currency (locale-dependent)
[ticks]="{ format: 'C' }"
// Output: $1,234.56 (US), £1,234.56 (UK), €1,234,56 (EU)

// C0 - No decimals
[ticks]="{ format: 'C0' }"
// Output: $1,235

// C2 - Two decimals (default)
[ticks]="{ format: 'C2' }"
// Output: $1,234.56
```

### Example: Currency Formatting

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-currency-format',
  template: `
    <div>
      <h3>Price Range (USD)</h3>
      <ejs-slider 
        id="price-slider"
        type="Range"
        [min]="0"
        [max]="10000"
        [value]="[1000, 5000]"
        [step]="100"
        [ticks]="{ 
          placement: 'After',
          largeStep: 2000,
          format: 'C0'  // ← Currency format (no decimals)
        }"
        [tooltip]="{ 
          isVisible: true, 
          format: 'C2'  // ← With 2 decimals in tooltip
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
export class CurrencyFormatComponent {}
```

**Output:**
```
Ticks: $0, $2,000, $4,000, $6,000, $8,000, $10,000
Tooltip: $1,000.00 (while dragging)
```

---

## Custom Formatting with Events

For complex formatting that the Format API can't handle, use events to transform tick labels and tooltip text.

### Using renderingTicks Event

The `renderingTicks` event fires for each tick mark and allows custom label transformation.

```typescript
(renderingTicks)="onRenderingTicks($event)"
```

**Event Handler:**
```typescript
onRenderingTicks(event: any) {
  // event.value: numeric value of the tick
  // event.text: default formatted text (can be overridden)
  
  event.text = this.customLabel(event.value);
}
```

### Example: Day of Week Labels

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-day-slider',
  template: `
    <div>
      <h3>Schedule (Day of Week)</h3>
      <ejs-slider 
        id="day-slider"
        type="Default"
        [value]="3"
        [min]="0"
        [max]="6"
        [ticks]="{ placement: 'After' }"
        [tooltip]="{ isVisible: true, showOn: 'Always' }"
        (renderingTicks)="onRenderingTicks($event)"
        (tooltipChange)="onTooltipChange($event)">
      </ejs-slider>
      <p>Selected day: {{ daysOfWeek[currentDay] }}</p>
    </div>
  `,
  styles: [`
    ejs-slider {
      width: 300px;
      margin-top: 20px;
    }

    p {
      margin-top: 15px;
      font-weight: bold;
    }
  `]
})
export class DaySliderComponent {
  daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  currentDay = 3;

  onRenderingTicks(event: any) {
    // Transform numeric value to day name
    event.text = this.daysOfWeek[parseInt(event.value)];
  }

  onTooltipChange(event: any) {
    // Format tooltip with day name
    event.text = this.daysOfWeek[parseInt(event.value)];
    this.currentDay = parseInt(event.value);
  }
}
```

**Output:**
```
Ticks: Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
Tooltip: Wednesday (while dragging)
```

### Example: Date Range Slider

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-date-slider',
  template: `
    <div>
      <h3>Select Date Range</h3>
      <ejs-slider 
        id="date-slider"
        type="Range"
        [min]="0"
        [max]="29"
        [value]="[5, 20]"
        [step]="1"
        [ticks]="{ placement: 'After', largeStep: 7 }"
        [tooltip]="{ isVisible: true, showOn: 'Always' }"
        (renderingTicks)="onRenderingTicks($event)"
        (tooltipChange)="onTooltipChange($event)">
      </ejs-slider>
      <p>Selected dates: {{ formatDate(selectedRange[0]) }} to {{ formatDate(selectedRange[1]) }}</p>
    </div>
  `,
  styles: [`
    ejs-slider {
      width: 300px;
      margin-top: 20px;
    }

    p {
      margin-top: 15px;
      font-weight: bold;
    }
  `]
})
export class DateSliderComponent {
  selectedRange: [number, number] = [5, 20];
  baseDate = new Date(2026, 2, 1); // March 1, 2026

  onRenderingTicks(event: any) {
    const date = this.getDateFromDay(parseInt(event.value));
    event.text = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  onTooltipChange(event: any) {
    const date = this.getDateFromDay(parseInt(event.value));
    event.text = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    this.selectedRange[event.handleIndex || 0] = parseInt(event.value);
  }

  getDateFromDay(dayOffset: number): Date {
    const date = new Date(this.baseDate);
    date.setDate(date.getDate() + dayOffset);
    return date;
  }

  formatDate(dayOffset: number): string {
    return this.getDateFromDay(dayOffset).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  }
}
```

**Output:**
```
Ticks: Mar 1, Mar 8, Mar 15, Mar 22, Mar 29
Tooltip: March 6, 2026 (while dragging)
```

### Using tooltipChange Event

The `tooltipChange` event fires when the tooltip value updates (while dragging).

```typescript
(tooltipChange)="onTooltipChange($event)"
```

**Event Handler:**
```typescript
onTooltipChange(event: any) {
  // event.value: current numeric value
  // event.text: default formatted text (can be overridden)
  
  event.text = this.customTooltipText(event.value);
}
```

---

## Internationalization

Syncfusion sliders respect browser locale settings for currency and number formatting.

### Locale Awareness

Currency formatting automatically uses the locale-specific symbol:

```typescript
// US (en-US)
[ticks]="{ format: 'C' }"  // Output: $1,234.56

// UK (en-GB)
[ticks]="{ format: 'C' }"  // Output: £1,234.56

// Germany (de-DE)
[ticks]="{ format: 'C' }"  // Output: 1.234,56 €
```

### Setting Application Locale

In `main.ts`, set the locale before bootstrapping:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app.component';
import { setDefaultLocale } from '@syncfusion/ej2-base';
import 'zone.js';

// Set locale (examples: 'en-US', 'de-DE', 'fr-FR', 'ja-JP')
setDefaultLocale('de-DE');

bootstrapApplication(App).catch((err) => console.error(err));
```

---

## Advanced Scenarios

### Scenario 1: Temperature with °F Symbol

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-temp-slider',
  template: `
    <div>
      <h3>Temperature Range (°F)</h3>
      <ejs-slider 
        id="temp-slider"
        type="Range"
        [min]="32"
        [max]="104"
        [value]="[68, 80]"
        [ticks]="{ placement: 'After', largeStep: 9 }"
        [tooltip]="{ isVisible: true, showOn: 'Always' }"
        (renderingTicks)="onRenderingTicks($event)"
        (tooltipChange)="onTooltipChange($event)">
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
export class TempSliderComponent {
  onRenderingTicks(event: any) {
    event.text = parseInt(event.value) + '°F';
  }

  onTooltipChange(event: any) {
    event.text = parseInt(event.value) + '°F';
  }
}
```

**Output:**
```
Ticks: 32°F, 41°F, 50°F, 59°F, 68°F, 77°F, 86°F, 95°F, 104°F
Tooltip: 74°F (while dragging)
```

### Scenario 2: Rating Stars (0-5 stars)

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-rating-slider',
  template: `
    <div>
      <h3>Rating Filter (Stars)</h3>
      <ejs-slider 
        id="rating-slider"
        type="Default"
        [value]="3"
        [min]="0"
        [max]="5"
        [step]="1"
        [ticks]="{ placement: 'After' }"
        [tooltip]="{ isVisible: true, showOn: 'Always' }"
        (renderingTicks)="onRenderingTicks($event)"
        (tooltipChange)="onTooltipChange($event)">
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
export class RatingSliderComponent {
  onRenderingTicks(event: any) {
    const rating = parseInt(event.value);
    event.text = '⭐'.repeat(rating) || 'None';
  }

  onTooltipChange(event: any) {
    const rating = parseInt(event.value);
    event.text = rating + ' star' + (rating !== 1 ? 's' : '');
  }
}
```

**Output:**
```
Ticks: None, ⭐, ⭐⭐, ⭐⭐⭐, ⭐⭐⭐⭐, ⭐⭐⭐⭐⭐
Tooltip: 4 stars (while dragging)
```

---

## Troubleshooting

### Format Not Applying to Ticks

**Problem:** Ticks show numeric values, not formatted.

**Solution:** Ensure `format` is set on `ticks` property:

```typescript
// ✅ CORRECT
[ticks]="{ largeStep: 20, format: 'P0' }"

// ❌ WRONG - format on wrong property
[format]="'P0'"
```

### Format Not Applying to Tooltip

**Problem:** Tooltip shows numeric values, not formatted.

**Solution:** Set `format` on `tooltip` property:

```typescript
// ✅ CORRECT
[tooltip]="{ isVisible: true, format: 'C2' }"

// ❌ WRONG - format not applied
[tooltip]="{ isVisible: true }"
```

### Custom Event Not Firing

**Problem:** `renderingTicks` or `tooltipChange` event handler defined but not called.

**Solution:**
1. Verify event binding syntax: `(eventName)="handler()"`
2. Ensure handler function exists in component class
3. Check browser console for errors

### Currency Symbol Wrong Locale

**Problem:** Currency shows $, but you need €

**Solution:** Set locale before bootstrap:

```typescript
import { setDefaultLocale } from '@syncfusion/ej2-base';
setDefaultLocale('de-DE');  // Euro symbol
```

---

## Next Steps

- Learn **styling** in [styling-and-customization.md](styling-and-customization.md)
- Integrate with **forms** in [form-integration-and-accessibility.md](form-integration-and-accessibility.md)
- Explore **advanced scenarios** in [advanced-scenarios.md](advanced-scenarios.md)
