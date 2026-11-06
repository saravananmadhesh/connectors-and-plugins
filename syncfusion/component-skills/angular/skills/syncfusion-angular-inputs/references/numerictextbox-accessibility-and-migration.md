# Accessibility and EJ1 Migration

## Table of Contents
- [WCAG Compliance](#wcag-compliance)
- [ARIA Attributes](#aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Color Contrast](#color-contrast)
- [Mobile Accessibility](#mobile-accessibility)
- [EJ1 to EJ2 Migration](#ej1-to-ej2-migration)

---

## WCAG Compliance

NumericTextBox is certified for **WCAG 2.2 Level AA** compliance, ensuring accessibility for all users.

### Supported Standards

| Standard | Status | Details |
|----------|--------|---------|
| WCAG 2.2 Level A | ✓ Full | Basic accessibility compliance |
| WCAG 2.2 Level AA | ✓ Full | Enhanced contrast and labeling |
| WCAG 2.2 Level AAA | ✓ Partial | Advanced features supported |
| Section 508 (ADA) | ✓ Full | U.S. accessibility standard |
| EN 301 549 | ✓ Full | EU accessibility standard |

### Implementing Accessible NumericTextBox

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  selector: 'app-accessible-numeric',
  template: `
    <div class="form-group">
      <label for="quantity">Order Quantity:</label>
      <ejs-numerictextbox
        id="quantity"
        value="1"
        min="1"
        max="999"
        step="1"
        placeholder="Enter quantity"
        [htmlAttributes]="quantityAttrs">
      </ejs-numerictextbox>
      <small id="quantity-help">Enter between 1 and 999 units</small>
    </div>
  `,
  styles: [`
    label { display: block; margin-bottom: 5px; font-weight: bold; }
    small { display: block; margin-top: 3px; color: #666; }
  `]
})
export class AccessibleNumericComponent {
  quantityAttrs = { 'aria-label': 'Order quantity in units', 'aria-describedby': 'quantity-help' };
}
```

---

## ARIA Attributes

NumericTextBox automatically includes ARIA attributes. You can enhance them:

### Standard ARIA Roles and Properties

The NumericTextBox automatically applies the following ARIA attributes to its internal `<input>` element. These are rendered by the component itself based on the properties you configure — do **not** add them directly to `<ejs-numerictextbox>`:

| Attribute | Source property | Value |
|-----------|----------------|-------|
| `role` | Auto-applied | `"spinbutton"` |
| `aria-valuenow` | `value` | Current numeric value |
| `aria-valuemin` | `min` | Minimum value |
| `aria-valuemax` | `max` | Maximum value |
| `aria-readonly` | `readonly` | `true` \| `false` |
| `aria-disabled` | `enabled` | `true` \| `false` |
| `aria-invalid` | Set via `htmlAttributes` | `true` \| `false` |
| `aria-live` | Set via `htmlAttributes` | `"polite"` \| `"assertive"` |

Use the `htmlAttributes` property to pass additional ARIA attributes:

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  selector: 'app-aria-numeric',
  template: `
    <ejs-numerictextbox
      value="50"
      min="0"
      max="100"
      [htmlAttributes]="ariaAttrs">
    </ejs-numerictextbox>
  `
})
export class AriaNumericComponent {
  ariaAttrs = { 'aria-label': 'Volume level', 'aria-describedby': 'volume-help' };
}
```

### Error State with ARIA

Use `htmlAttributes` to pass `aria-invalid` and `aria-describedby` to the underlying input element:

```typescript
@Component({
  imports: [NumericTextBoxModule, NgIf],
  standalone: true,
  template: `
    <ejs-numerictextbox
      [(ngModel)]="price"
      (blur)="validatePrice()"
      min="0"
      max="10000"
      [htmlAttributes]="ariaAttrs">
    </ejs-numerictextbox>
    <span *ngIf="hasError" id="price-error" role="alert" class="error">
      Price must be between $0 and $10,000
    </span>
  `,
  styles: [`
    .error { color: #dc3545; font-size: 12px; }
    :host ::ng-deep .e-control-wrapper.error-state {
      border-color: #dc3545;
    }
  `]
})
export class AccessibleErrorComponent {
  price: number = 0;
  hasError = false;

  get ariaAttrs(): { [key: string]: string } {
    return {
      'aria-invalid': String(this.hasError),
      'aria-describedby': this.hasError ? 'price-error' : ''
    };
  }

  validatePrice() {
    this.hasError = this.price < 0 || this.price > 10000;
  }
}
```

---

## Keyboard Navigation

### Standard Keyboard Support

NumericTextBox follows WAI-ARIA spinbutton guidelines:

| Key | Action | Support |
|-----|--------|---------|
| <kbd>Tab</kbd> | Focus input | ✓ Full |
| <kbd>Shift+Tab</kbd> | Unfocus (reverse) | ✓ Full |
| <kbd>Arrow Up</kbd> | Increment value by `step` | ✓ Full |
| <kbd>Arrow Down</kbd> | Decrement value by `step` | ✓ Full |

### Keyboard-Only Example

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  template: `
    <div class="keyboard-demo">
      <label for="price">Price (Keyboard Only)</label>
      <ejs-numerictextbox
        id="price"
        value="100"
        min="0"
        max="1000"
        step="10"
        placeholder="Use arrow keys"
        [showSpinButton]="false">
      </ejs-numerictextbox>
      <ul class="instructions">
        <li>↑ Arrow Up — Increase price by step</li>
        <li>↓ Arrow Down — Decrease price by step</li>
      </ul>
    </div>
  `
})
export class KeyboardOnlyComponent {}
```

---

## Screen Reader Support

### Accessible Form Integration

```typescript
@Component({
  imports: [NumericTextBoxModule, ReactiveFormsModule],
  standalone: true,
  selector: 'app-sr-form',
  template: `
    <form [formGroup]="form" (submit)="onSubmit()">
      <fieldset>
        <legend>Order Form</legend>
        
        <div class="form-group">
          <label for="qty">Order Quantity</label>
          <ejs-numerictextbox
            id="qty"
            formControlName="quantity"
            min="1"
            max="100"
            placeholder="Enter 1-100"
            [htmlAttributes]="qtyAttrs">
          </ejs-numerictextbox>
          <span *ngIf="form.get('quantity')?.invalid" 
                class="error" role="alert">
            Quantity is required
          </span>
        </div>

        <button type="submit">Submit Order</button>
      </fieldset>
    </form>
  `
})
export class ScreenReaderFormComponent {
  qtyAttrs = { 'aria-label': 'Order quantity', 'aria-required': 'true' };

  form = new FormGroup({
    quantity: new FormControl<number | null>(null, Validators.required)
  });

  onSubmit() {
    if (this.form.valid) {
      console.log('Order:', this.form.value);
    }
  }
}
```

### NVDA/JAWS Compatibility

NumericTextBox announces:
- Label on focus: "Order Quantity"
- Role: "spinbutton"
- Current value and range: "50 of 0 to 100"
- Validation errors: Reads aria-describedby content

---

## Color Contrast

### WCAG AA Contrast (4.5:1 minimum)

```css
/* Ensure adequate contrast for all states */
.e-numeric.e-control-wrapper {
  background-color: #ffffff;  /* WCAG AA against text */
  border-color: #333333;      /* Dark border for visibility */
}

.e-numeric.e-control-wrapper input.e-input {
  color: #000000;             /* Maximum contrast */
  background-color: #ffffff;
}

/* Hover state */
.e-numeric.e-control-wrapper:hover {
  background-color: #f5f5f5;
  border-color: #0066cc;
}

/* Focus state (must meet 3:1 minimum) */
.e-numeric.e-control-wrapper.e-input-focus {
  border-color: #0066cc;
  box-shadow: 0 0 3px 2px rgba(0, 102, 204, 0.5);
}

/* Disabled state */
.e-numeric.e-control-wrapper:disabled {
  background-color: #f5f5f5;
  border-color: #cccccc;
  color: #999999;
}
```

### Testing Contrast

Use tools:
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Contrast Checker](https://www.tpgi.com/color-contrast-checker/)

---

## Mobile Accessibility

### Touch-Friendly Input

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  template: `
    <ejs-numerictextbox
      value="1"
      min="1"
      max="100"
      step="1"
      [showSpinButton]="true"
      placeholder="Tap to enter"
      (focus)="onMobileFocus()"
      cssClass="touch-friendly">
    </ejs-numerictextbox>
  `,
  styles: [`
    :host ::ng-deep .touch-friendly.e-control-wrapper {
      min-height: 44px;  /* WCAG touch target size */
    }
    :host ::ng-deep .touch-friendly .e-input-group-icon {
      min-width: 44px;   /* Minimum touch target */
      min-height: 44px;
    }
  `]
})
export class MobileAccessibleComponent {
  onMobileFocus() {
    // Mobile-specific handling if needed
  }
}
```

### Voice Input Support

NumericTextBox supports voice input through browser native features.

---

## EJ1 to EJ2 Migration

### API Comparison

| Feature | EJ1 | EJ2 |
|---------|-----|-----|
| Component | `ej-numerictextbox` | `ejs-numerictextbox` |
| Value | `value` | `value` |
| Min | `minValue` | `min` |
| Max | `maxValue` | `max` |
| Decimals | `decimalPlaces` | `decimals` |
| Step | `incrementStep` | `step` |
| Disabled | `enabled=false` | `[enabled]="false"` |
| Format | `format` (string) | `format` (string) |
| Events | `create`, `destroy` | `created`, `destroyed` |

### Migration Examples

#### Basic Setup

**EJ1:**
```html
<input id="numeric" type="text" ej-numerictextbox value="120" />
```

**EJ2:**
```html
<ejs-numerictextbox value="120"></ejs-numerictextbox>
```

#### Validation

**EJ1:**
```html
<input id="numeric" type="text" ej-numerictextbox 
       minValue="10" maxValue="100" enableStrictMode=true />
```

**EJ2:**
```html
<ejs-numerictextbox value="50" min="10" max="100" 
                     [strictMode]="true">
</ejs-numerictextbox>
```

#### Events

**EJ1:**
```html
<input id="numeric" type="text" ej-numerictextbox 
       (create)="onCreate()" (destroy)="onDestroy()" />
```

**EJ2:**
```html
<ejs-numerictextbox (created)="onCreate()" 
                    (destroyed)="onDestroy()">
</ejs-numerictextbox>
```

#### Formatting

**EJ1:**
```html
<input id="currency" type="text" ej-currencytextbox 
       currencySymbol="USD" />
```

**EJ2:**
```html
<ejs-numerictextbox format="c2" currency="USD">
</ejs-numerictextbox>
```

### Breaking Changes

1. **Event names changed:**
   - `create` → `created`
   - `destroy` → `destroyed`
   - `focusIn` → `focus`
   - `focusOut` → `blur`

2. **Property renames:**
   - `minValue` → `min`
   - `maxValue` → `max`
   - `decimalPlaces` → `decimals`
   - `incrementStep` → `step`
   - `enableStrictMode` → `strictMode`

3. **Removed features:**
   - `groupSize`, `groupSeparator` (use format instead)
   - `watermarkText` (use `placeholder`)

### Migration Checklist

- [ ] Update component syntax from `ej-numerictextbox` to `ejs-numerictextbox`
- [ ] Rename all properties (min/max, decimals, step)
- [ ] Update event handlers (created, destroyed)
- [ ] Replace format approach if using currency
- [ ] Test form validation with new API
- [ ] Verify accessibility compliance
- [ ] Test on mobile devices
- [ ] Update unit tests

---

## Accessibility Testing

### Automated Tools

```bash
# Using axe-core
npm install --save-dev @axe-core/angular

# Using accessibility-checker
npm install --save-dev accessibility-checker
```

### Manual Testing Checklist

- [ ] Navigate with keyboard only (Tab, Arrow keys)
- [ ] Test with screen reader (NVDA, JAWS)
- [ ] Verify color contrast ratios
- [ ] Check focus indicators visible
- [ ] Test error states with aria-describedby
- [ ] Verify label associations
- [ ] Test on mobile with TalkBack/VoiceOver

---

## See Also

- [Getting Started](./getting-started.md)
- [Validation and Forms](./validation-and-forms.md)
- [Advanced Patterns](./advanced-patterns.md)
- [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22/)
