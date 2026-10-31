# Form Integration & Accessibility

## Table of Contents
- [Reactive Forms Integration](#reactive-forms-integration)
- [FormControl Binding](#formcontrol-binding)
- [Template-Driven Forms](#template-driven-forms)
- [Form Validation](#form-validation)
- [Accessibility Overview](#accessibility-overview)
- [WCAG Compliance](#wcag-compliance)
- [Keyboard Navigation](#keyboard-navigation)
- [ARIA Attributes](#aria-attributes)
- [Screen Reader Support](#screen-reader-support)
- [Complete Examples](#complete-examples)
- [Troubleshooting](#troubleshooting)

---

## Reactive Forms Integration

Reactive Forms (FormGroup-based) provide explicit form state management using FormControl.

### FormControl Binding

Bind the slider to a FormControl:

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule, ReactiveFormsModule],
  standalone: true,
  selector: 'app-reactive-slider',
  template: `
    <form [formGroup]="form">
      <label for="volume">Volume Control:</label>
      <ejs-slider 
        id="volume"
        formControlName="volume"
        type="Default"
        [min]="0"
        [max]="100">
      </ejs-slider>
      <p>Current value: {{ form.get('volume')?.value }}</p>
    </form>
  `
})
export class ReactiveSliderComponent {
  form = new FormGroup({
    volume: new FormControl(50)
  });
}
```

### Complete Reactive Form Example

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule, ReactiveFormsModule],
  standalone: true,
  selector: 'app-complete-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="age">Age Range:</label>
        <ejs-slider 
          id="age"
          formControlName="ageRange"
          type="Range"
          [min]="18"
          [max]="65"
          [value]="[25, 60]">
        </ejs-slider>
        <p>Selected: {{ form.get('ageRange')?.value | json }}</p>
      </div>

      <div class="form-group">
        <label for="quality">Quality:</label>
        <ejs-slider 
          id="quality"
          formControlName="quality"
          type="Default"
          [min]="1"
          [max]="10">
        </ejs-slider>
        <p>Quality: {{ form.get('quality')?.value }}/10</p>
      </div>

      <button type="submit" [disabled]="form.invalid">Submit</button>
      <button type="button" (click)="reset()">Reset</button>
    </form>
  `,
  styles: [`
    .form-group {
      margin: 20px 0;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
    }

    ejs-slider {
      display: block;
      margin: 20px 0;
    }

    p {
      margin-top: 10px;
      color: #666;
    }

    button {
      padding: 8px 16px;
      margin-right: 10px;
      cursor: pointer;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class CompleteFormComponent {
  form = new FormGroup({
    ageRange: new FormControl([25, 60]),
    quality: new FormControl(7, [Validators.required, Validators.min(1), Validators.max(10)])
  });

  onSubmit() {
    if (this.form.valid) {
      console.log('Form value:', this.form.value);
    }
  }

  reset() {
    this.form.reset();
  }
}
```

### Setting Initial Values

```typescript
form = new FormGroup({
  // Set initial value to 50
  volume: new FormControl(50),
  
  // Set initial range [20, 80]
  priceRange: new FormControl([20, 80])
});
```

### Programmatic Value Changes

```typescript
// Update single value
this.form.get('volume')?.setValue(75);

// Update range value
this.form.get('priceRange')?.setValue([100, 500]);

// Reset to initial value
this.form.get('volume')?.reset(50);
```

---

## Template-Driven Forms

Template-driven forms use ngModel for simpler, less explicit form binding.

### ngModel Binding

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule, FormsModule],
  standalone: true,
  selector: 'app-template-slider',
  template: `
    <form>
      <label for="volume">Volume:</label>
      <ejs-slider 
        id="volume"
        [(ngModel)]="volume"
        name="volume"
        type="Default"
        [min]="0"
        [max]="100">
      </ejs-slider>
      <p>Current: {{ volume }}</p>
    </form>
  `
})
export class TemplateSliderComponent {
  volume = 50;
}
```

### Range Slider with ngModel

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule, FormsModule],
  standalone: true,
  selector: 'app-range-template',
  template: `
    <form>
      <h3>Price Range</h3>
      <ejs-slider 
        id="price"
        [(ngModel)]="priceRange"
        name="priceRange"
        type="Range"
        [min]="0"
        [max]="1000"
        (change)="onPriceChange()">
      </ejs-slider>
      <p>Selected: ${{ priceRange[0] }} - ${{ priceRange[1] }}</p>
      <p>Range size: ${{ priceRange[1] - priceRange[0] }}</p>
    </form>
  `,
  styles: [`
    p {
      margin: 10px 0;
    }
  `]
})
export class RangeTemplateComponent {
  priceRange: [number, number] = [200, 800];

  onPriceChange() {
    console.log('Price range changed:', this.priceRange);
  }
}
```

---

## Form Validation

Validate slider values against min/max constraints and custom rules.

### Validators

```typescript
import { FormControl, Validators } from '@angular/forms';

// Min value validator
new FormControl(50, Validators.min(0))

// Max value validator
new FormControl(50, Validators.max(100))

// Min AND max (range)
new FormControl([20, 80], [Validators.required])

// Custom validator
new FormControl(50, [
  Validators.required,
  Validators.min(10),
  Validators.max(90)
])
```

### Validation Example

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule, ReactiveFormsModule, CommonModule],
  standalone: true,
  selector: 'app-validated-slider',
  template: `
    <form [formGroup]="form">
      <div>
        <label for="budget">Budget ($1,000 - $50,000):</label>
        <ejs-slider 
          id="budget"
          formControlName="budget"
          type="Range"
          [min]="1000"
          [max]="50000"
          [step]="1000">
        </ejs-slider>
        
        <div class="validation-message" *ngIf="isBudgetInvalid()">
          <p *ngIf="form.get('budget')?.hasError('required')">Budget is required</p>
          <p *ngIf="form.get('budget')?.hasError('minBudget')">Minimum budget is $1,000</p>
          <p *ngIf="form.get('budget')?.hasError('maxBudget')">Maximum budget is $50,000</p>
        </div>

        <p class="valid-message" *ngIf="form.get('budget')?.valid">
          ✓ Valid range: ${{ form.get('budget')?.value[0] }} - ${{ form.get('budget')?.value[1] }}
        </p>
      </div>

      <button type="submit" [disabled]="form.invalid">Submit Budget</button>
    </form>
  `,
  styles: [`
    .validation-message {
      color: #d32f2f;
      margin-top: 8px;
      font-size: 14px;
    }

    .valid-message {
      color: #388e3c;
      margin-top: 8px;
      font-weight: bold;
    }

    button {
      padding: 10px 20px;
      margin-top: 20px;
      cursor: pointer;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class ValidatedSliderComponent {
  form = new FormGroup({
    budget: new FormControl([5000, 20000], [
      Validators.required,
      this.budgetRangeValidator.bind(this)
    ])
  });

  budgetRangeValidator(control: FormControl) {
    if (!control.value) return null;
    
    const [min, max] = control.value;
    
    if (min < 1000) return { minBudget: true };
    if (max > 50000) return { maxBudget: true };
    
    return null;
  }

  isBudgetInvalid() {
    const control = this.form.get('budget');
    return control && control.invalid && (control.dirty || control.touched);
  }
}
```

---

## Accessibility Overview

The Range Slider component is built with full accessibility support including:

- **WCAG 2.2** compliance (Web Content Accessibility Guidelines)
- **Section 508** compliance (US federal accessibility standard)
- **Keyboard navigation** support
- **Screen reader** support with ARIA attributes
- **Focus indicators** for keyboard users
- **Color contrast** ratios
- **Mobile/touch** support

---

## WCAG Compliance

The slider meets WCAG 2.2 Level AA standards:

| Criterion | Status |
|-----------|--------|
| **1.4.3 Contrast (Minimum)** | ✓ WCAG AA |
| **2.1.1 Keyboard** | ✓ WCAG A |
| **2.1.2 No Keyboard Trap** | ✓ WCAG A |
| **3.2.4 Consistent Identification** | ✓ WCAG AA |
| **4.1.2 Name, Role, Value** | ✓ WCAG A |
| **4.1.3 Status Messages** | ✓ WCAG AAA |

---

## Keyboard Navigation

Keyboard users can fully interact with the slider using these shortcuts:

| Key | Action | Context |
|-----|--------|---------|
| **Tab** | Focus slider | Moves to slider handle |
| **Shift+Tab** | Reverse focus | Moves back to previous element |
| **Right Arrow** ↑ **Up Arrow** | Increase value | When handle is focused |
| **Left Arrow** ↓ **Down Arrow** | Decrease value | When handle is focused |
| **Home** | Move to start | Sets to minimum value (Range: second handle → first) |
| **End** | Move to end | Sets to maximum value (Range: first handle → second) |
| **Page Up** | Increase by largeStep | Larger increments (default 10) |
| **Page Down** | Decrease by largeStep | Larger decrements (default 10) |

### Example: Keyboard Navigation

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-keyboard-slider',
  template: `
    <div>
      <h3>Keyboard-Accessible Range Slider</h3>
      <p>
        Use Tab to focus, arrow keys to adjust, Home/End for boundaries,
        Page Up/Down for larger steps.
      </p>
      
      <ejs-slider 
        id="keyboard-slider"
        type="Range"
        [min]="0"
        [max]="100"
        [value]="[25, 75]"
        [step]="5"
        (change)="onSliderChange($event)">
      </ejs-slider>

      <p>Current range: {{ currentRange[0] }} - {{ currentRange[1] }}</p>
    </div>
  `,
  styles: [`
    ejs-slider {
      width: 300px;
      margin: 20px 0;
    }

    p {
      margin: 10px 0;
    }
  `]
})
export class KeyboardSliderComponent {
  currentRange: [number, number] = [25, 75];

  onSliderChange(event: any) {
    this.currentRange = event.value;
  }
}
```

---

## ARIA Attributes

The slider automatically includes ARIA attributes for screen reader compatibility:

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `role` | `slider` | Identifies as a slider control |
| `aria-valuemin` | 0 | Minimum slider value |
| `aria-valuemax` | 100 | Maximum slider value |
| `aria-valuenow` | 50 | Current value |
| `aria-valuetext` | "50" | Current value as text |
| `aria-orientation` | "horizontal" / "vertical" | Slider direction |
| `aria-label` | "Volume slider" | Accessible name |

### Example: Adding ARIA Labels

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-aria-slider',
  template: `
    <div>
      <label id="volume-label" for="volume-slider">Volume Control</label>
      <ejs-slider 
        id="volume-slider"
        aria-labelledby="volume-label"
        aria-label="Volume control from 0 to 100 percent"
        type="Default"
        [value]="50">
      </ejs-slider>
    </div>
  `
})
export class AriaSliderComponent {}
```

---

## Screen Reader Support

Screen readers (NVDA, JAWS, VoiceOver) announce:

1. **Component type:** "Slider"
2. **Label:** "Volume Control" (from aria-label or aria-labelledby)
3. **Current value:** "50"
4. **Range:** "Range 0 to 100"
5. **Instructions:** "Use arrow keys to adjust"

### Testing with Screen Readers

Use free screen readers to test:
- **Windows:** NVDA (free)
- **Mac:** VoiceOver (built-in)
- **Chrome:** ChromeVox extension

---

## Complete Examples

### Example 1: Accessible Form with Validated Range Slider

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule, ReactiveFormsModule, CommonModule],
  standalone: true,
  selector: 'app-accessible-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="accessible-form">
      <fieldset>
        <legend>Product Preferences</legend>

        <div class="form-group">
          <label id="price-label" for="price-slider">
            Price Range ({{ form.get('priceRange')?.value[0] }}-{{ form.get('priceRange')?.value[1] }} USD)
          </label>
          <ejs-slider 
            id="price-slider"
            formControlName="priceRange"
            type="Range"
            [min]="0"
            [max]="1000"
            [step]="50"
            aria-labelledby="price-label"
            aria-describedby="price-help">
          </ejs-slider>
          <p id="price-help" class="help-text">
            Adjust your budget range using arrow keys or mouse
          </p>
        </div>

        <div class="form-group">
          <label id="rating-label" for="rating-slider">
            Minimum Rating ({{ form.get('minRating')?.value }} stars)
          </label>
          <ejs-slider 
            id="rating-slider"
            formControlName="minRating"
            type="Default"
            [min]="1"
            [max]="5"
            [step]="1"
            aria-labelledby="rating-label">
          </ejs-slider>
        </div>

        <div class="form-actions">
          <button type="submit" [disabled]="form.invalid">Apply Filters</button>
          <button type="button" (click)="resetForm()">Reset</button>
        </div>

        <div class="status-message" *ngIf="submitted">
          <p *ngIf="form.valid" class="success">✓ Preferences updated successfully</p>
          <p *ngIf="form.invalid" class="error">⚠ Please correct the errors above</p>
        </div>
      </fieldset>
    </form>
  `,
  styles: [`
    .accessible-form {
      max-width: 500px;
      padding: 20px;
    }

    fieldset {
      border: 1px solid #ccc;
      padding: 20px;
      border-radius: 8px;
    }

    legend {
      font-size: 18px;
      font-weight: bold;
      padding: 0 8px;
    }

    .form-group {
      margin: 20px 0;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
    }

    .help-text {
      font-size: 12px;
      color: #666;
      margin-top: 4px;
    }

    ejs-slider {
      display: block;
      margin: 15px 0;
    }

    .form-actions {
      margin-top: 20px;
      display: flex;
      gap: 10px;
    }

    button {
      padding: 10px 20px;
      cursor: pointer;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: #f5f5f5;
    }

    button:hover {
      background: #e0e0e0;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .status-message {
      margin-top: 15px;
      padding: 10px;
      border-radius: 4px;
    }

    .status-message.success {
      background: #e8f5e9;
      color: #2e7d32;
    }

    .status-message.error {
      background: #ffebee;
      color: #c62828;
    }
  `]
})
export class AccessibleFormComponent {
  form = new FormGroup({
    priceRange: new FormControl([100, 800], Validators.required),
    minRating: new FormControl(3, Validators.required)
  });

  submitted = false;

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    }
  }

  resetForm() {
    this.form.reset();
    this.submitted = false;
  }
}
```

---

## Troubleshooting

### ARIA Labels Not Announced

**Problem:** Screen reader doesn't announce the slider label.

**Solution:** Set aria-labelledby or aria-label:

```typescript
<label id="volume-label">Volume:</label>
<ejs-slider 
  aria-labelledby="volume-label">
</ejs-slider>
```

### Keyboard Navigation Not Working

**Problem:** Arrow keys don't change slider value.

**Solution:**
1. Ensure slider is focused (Tab to it)
2. Check that keyboard is not overridden by other listeners
3. Verify slider isn't disabled

### Form Value Not Updating

**Problem:** Slider moves but form value doesn't change.

**Solution:** For Reactive Forms, ensure formControlName is correct:

```typescript
// In template
formControlName="sliderName"

// In component
form = new FormGroup({
  sliderName: new FormControl(50)  // ← Must match
});
```

---

## Next Steps

- Explore **advanced scenarios** in [advanced-scenarios.md](advanced-scenarios.md)
- Review **styling** options in [styling-and-customization.md](styling-and-customization.md)
- Learn **formatting** in [formatting-and-values.md](formatting-and-values.md)
