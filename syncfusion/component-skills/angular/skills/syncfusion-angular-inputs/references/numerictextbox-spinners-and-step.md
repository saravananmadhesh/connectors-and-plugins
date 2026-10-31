# Spinners and Step Control

## Table of Contents
- [Overview](#overview)
- [Step Property](#step-property)
- [Spin Buttons](#spin-buttons)
- [Keyboard Interaction](#keyboard-interaction)
- [Customizing Appearance](#customizing-appearance)
- [Examples](#examples)

---

## Overview

NumericTextBox provides **spin buttons** (up/down arrows) for adjusting numeric values incrementally. The `step` property controls the increment/decrement amount, while `showSpinButton` toggles visibility.

**Use cases:**
- Quantity selectors (step=1)
- Price adjustments (step=0.01)
- Volume/brightness sliders (step=5)
- Percentage adjusters (step=1)
- Score input (step=0.5)

---

## Step Property

The `step` property defines how much the value changes when:
- Clicking spin up/down buttons
- Pressing Arrow Up/Down keys
- Calling `increment()` or `decrement()` methods

### Setting Step Value

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  template: `
    <!-- Increment by 1 -->
    <ejs-numerictextbox
      value="0"
      step="1"
      min="0"
      max="10">
    </ejs-numerictextbox>
  `
})
export class DefaultStepComponent {}
```

### Fractional Steps

For decimal values:

```typescript
<!-- Currency: increment by $0.01 -->
<ejs-numerictextbox
  value="10.00"
  step="0.01"
  decimals="2"
  format="c2"
  currency="USD">
</ejs-numerictextbox>

<!-- Percentage: increment by 0.5% -->
<ejs-numerictextbox
  value="50"
  step="0.5"
  decimals="1"
  format="p"
  min="0"
  max="100">
</ejs-numerictextbox>
```

### Large Steps

```typescript
<!-- Increment by 5 units -->
<ejs-numerictextbox
  value="0"
  step="5"
  min="0"
  max="100">
</ejs-numerictextbox>

<!-- Increment by 1000 -->
<ejs-numerictextbox
  value="1000"
  step="1000"
  min="0"
  max="100000">
</ejs-numerictextbox>
```

### Zero/No Step

Setting `step="0"` prevents keyboard/spinner increment:

```typescript
<ejs-numerictextbox
  value="50"
  step="0"
  [showSpinButton]="true">
  <!-- Spin buttons disabled, manual entry only -->
</ejs-numerictextbox>
```

---

## Spin Buttons

### Showing/Hiding Spin Buttons

```typescript
<!-- Spin buttons visible (default) -->
<ejs-numerictextbox
  value="10"
  step="1"
  [showSpinButton]="true">
</ejs-numerictextbox>

<!-- Spin buttons hidden -->
<ejs-numerictextbox
  value="10"
  step="1"
  [showSpinButton]="false">
</ejs-numerictextbox>
```

### When to Hide Spin Buttons

- Mobile/touch interfaces (use keyboard or custom buttons instead)
- Limited screen space
- Preference for direct input only
- Accessibility: keyboard-only input preferred

### Button Styling

```css
/* Hide only the up button */
.e-numeric .e-spin-up {
  display: none;
}

/* Hide only the down button */
.e-numeric .e-spin-down {
  display: none;
}

/* Custom button colors */
.e-numeric .e-spin-up,
.e-numeric .e-spin-down {
  background-color: #f0f0f0;
  color: #007bff;
}

.e-numeric .e-spin-up:hover,
.e-numeric .e-spin-down:hover {
  background-color: #e0e0e0;
}

.e-numeric .e-spin-up:active,
.e-numeric .e-spin-down:active {
  background-color: #d0d0d0;
}
```

---

## Keyboard Interaction

The NumericTextBox follows WAI-ARIA spinbutton guidelines:

| Key | Action |
|-----|--------|
| <kbd>Arrow Up</kbd> | Increment value by `step` |
| <kbd>Arrow Down</kbd> | Decrement value by `step` |

### Example: Keyboard-Only Input

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  template: `
    <ejs-numerictextbox
      value="50"
      step="1"
      min="0"
      max="100"
      [showSpinButton]="false"
      placeholder="Use arrow keys">
    </ejs-numerictextbox>
  `
})
export class KeyboardOnlyComponent {}
```

### Why Keyboard Matters

- **Accessibility**: Screen reader users navigate with arrow keys
- **Keyboard-only users**: No mouse input available
- **Consistency**: Standard spinbutton behavior across applications

---

## Customizing Appearance

### Custom Increment/Decrement Icons

```css
/* Replace default icons with custom characters */
.e-numeric .e-input-group-icon.e-spin-up:before {
  content: "▲";  /* Up triangle */
  color: #28a745;
  font-size: 16px;
}

.e-numeric .e-input-group-icon.e-spin-down:before {
  content: "▼";  /* Down triangle */
  color: #dc3545;
  font-size: 16px;
}
```

### Font Icons

```css
/* Using Font Awesome */
.e-numeric .e-spin-up:before {
  content: "\f062";  /* up-arrow */
}

.e-numeric .e-spin-down:before {
  content: "\f063";  /* down-arrow */
}
```

### Icon Size and Color

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  selector: 'app-styled-spinner',
  template: `
    <ejs-numerictextbox
      value="10"
      step="1"
      cssClass="large-spinner">
    </ejs-numerictextbox>
  `,
  styles: [`
    :host ::ng-deep .large-spinner .e-input-group-icon {
      font-size: 22px;
      padding: 8px 12px;
    }
    :host ::ng-deep .large-spinner .e-spin-up {
      color: #007bff;
    }
    :host ::ng-deep .large-spinner .e-spin-down {
      color: #007bff;
    }
  `]
})
export class StyledSpinnerComponent {}
```

---

## Programmatic Control

### Using Component Reference

Access spinner methods via `@ViewChild`:

```typescript
import { NumericTextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { ViewChild } from '@angular/core';

@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  selector: 'app-programmatic',
  template: `
    <ejs-numerictextbox
      #numericRef
      value="10"
      step="1"
      min="0"
      max="100">
    </ejs-numerictextbox>
    <button (click)="increment()">+</button>
    <button (click)="decrement()">-</button>
  `
})
export class ProgrammaticComponent {
  @ViewChild('numericRef') numeric!: NumericTextBoxComponent;

  increment() {
    this.numeric.increment();
  }

  decrement() {
    this.numeric.decrement();
  }
}
```

### Manual Increment/Decrement

```typescript
// Increment by 1 step (uses the step property value)
this.numeric.increment();

// Increment by a custom step
this.numeric.increment(10);

// Decrement by 1 step (uses the step property value)
this.numeric.decrement();

// Decrement by a custom step
this.numeric.decrement(5);

// Get text representation (formatted display value)
const text = this.numeric.getText();
```

---

## Examples

### Quantity Selector

```typescript
@Component({
  imports: [NumericTextBoxModule, CommonModule],
  standalone: true,
  selector: 'app-quantity',
  template: `
    <div class="quantity-control">
      <label>Quantity</label>
      <ejs-numerictextbox
        [(ngModel)]="quantity"
        value="1"
        step="1"
        min="1"
        max="999"
        decimals="0">
      </ejs-numerictextbox>
      <p>Total: ${{ (quantity * 10) | number: '1.2-2' }}</p>
    </div>
  `,
  styles: [`
    .quantity-control {
      border: 1px solid #ddd;
      padding: 15px;
      border-radius: 8px;
    }
  `]
})
export class QuantitySelectorComponent {
  quantity: number = 1;
}
```

### Score/Rating Input

```typescript
<ejs-numerictextbox
  value="5"
  step="0.5"
  min="1"
  max="5"
  decimals="1"
  format="n1"
  placeholder="Rate 1-5">
</ejs-numerictextbox>
```

### Volume Control

```typescript
<ejs-numerictextbox
  value="50"
  step="5"
  min="0"
  max="100"
  decimals="0"
  placeholder="Volume %">
</ejs-numerictextbox>
```

---

## Troubleshooting

**Issue:** Spin buttons not working
- **Solution:** Verify `step` > 0 and check keyboard focus

**Issue:** Step too large/small
- **Solution:** Adjust `step` value (e.g., 0.01 for cents, 5 for large increments)

**Issue:** Arrow keys not incrementing
- **Solution:** Ensure NumericTextBox has focus and `showSpinButton` is not affecting functionality

---

## See Also

- [Getting Started](./getting-started.md)
- [Accessibility and Migration](./accessibility-and-migration.md)
- [Advanced Patterns](./advanced-patterns.md)
