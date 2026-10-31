# Formats and Styling NumericTextBox

## Table of Contents
- [Number Formats](#number-formats)
- [Standard Formats](#standard-formats)
- [Custom Formats](#custom-formats)
- [CSS Styling](#css-styling)
- [Icon Customization](#icon-customization)
- [Theme Customization](#theme-customization)

---

## Number Formats

The `format` property controls how numbers are displayed when the NumericTextBox is not focused. Formats are applied on blur, allowing users to type naturally while focused.

**When to apply formatting:**
- Currency inputs: Apply `c2` format with currency code
- Percentage fields: Apply `p` format with 0-100 range
- Decimal-heavy inputs: Apply `n` format with specific decimal count
- Grouped thousands: Use standard number format

---

## Standard Formats

Standard format specifiers follow .NET conventions. The most common are:

### Currency Format (`c`, `c2`)

Use `c` for currency with a specified precision (usually 2 decimals):

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  template: `
    <ejs-numerictextbox
      value="1000.50"
      format="c2"
      currency="USD"
      min="0"
      decimals="2">
    </ejs-numerictextbox>
  `
})
export class CurrencyComponent {}
```

**Output:**
- Display value (blur): `$1,000.50`
- Focused value: `1000.5`

**Currency codes:** USD, EUR, GBP, JPY, AUD, CAD, etc.

### Percentage Format (`p`)

Use `p` for percentage display (multiplies by 100):

```typescript
<ejs-numerictextbox
  value="0.25"
  format="p"
  step="0.01"
  min="0"
  max="1">
</ejs-numerictextbox>
```

**Output:**
- Display value (blur): `25%`
- Internal value: `0.25`

**Note:** Enter values as decimals (0.25 = 25%), not percentages.

### Number Format (`n`, `n2`, `n4`)

Use `n` with precision for rounded numbers:

```typescript
<ejs-numerictextbox
  value="1234.56789"
  format="n2"
  decimals="2">
</ejs-numerictextbox>
```

**Output:**
- Display value (blur): `1,234.57`
- Focused value: `1234.57`

---

## Custom Formats

Build custom formats by combining:
- `0` = Required digit (displays even if zero)
- `#` = Optional digit (omitted if zero)
- `,` = Thousand separator
- `.` = Decimal separator

### Examples

#### 5-Digit Format with Padding

```typescript
<ejs-numerictextbox
  value="123"
  format="00000"
  decimals="0">
</ejs-numerictextbox>
```

**Output:** `00123`

#### Thousands Separator

```typescript
<ejs-numerictextbox
  value="1234567.89"
  format="#,##0.##"
  decimals="2">
</ejs-numerictextbox>
```

**Output:** `1,234,567.89`

#### Optional Decimals

```typescript
<ejs-numerictextbox
  value="100"
  format="#,##0.##"
  min="0"
  decimals="2">
</ejs-numerictextbox>
```

**Output:** `100` (decimals omitted if zero)

#### Phone Number Simulation

```typescript
<ejs-numerictextbox
  value="5551234567"
  format="(###) ###-####"
  decimals="0"
  step="0">
</ejs-numerictextbox>
```

**Output:** `(555) 123-4567`

---

## CSS Styling

### NumericTextBox Wrapper

Customize height, font, and overall appearance:

```css
/* Increase height and font size */
.e-input-group input.e-input,
.e-input-group textarea.e-input {
  height: 40px;
  font-size: 18px;
  padding: 10px;
}

/* Custom color and border */
.e-control-wrapper.e-numeric.e-input-group {
  border: 2px solid #007bff;
  border-radius: 4px;
}

/* Focused state */
.e-control-wrapper.e-numeric.e-input-focus {
  border-color: #0056b3;
  box-shadow: 0 0 5px rgba(0, 86, 179, 0.5);
}
```

### Input Text Styling

```css
/* Custom text color and placeholder */
.e-numeric.e-control-wrapper input.e-input {
  color: #333;
}

.e-numeric.e-control-wrapper input.e-input::placeholder {
  color: #999;
}

/* Read-only state */
.e-numeric.e-control-wrapper input.e-input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}
```

### Component Example with Custom CSS

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  selector: 'app-styled-numeric',
  template: `
    <ejs-numerictextbox
      value="100"
      cssClass="custom-numeric"
      placeholder="Enter amount">
    </ejs-numerictextbox>
  `,
  styles: [`
    :host ::ng-deep .custom-numeric.e-control-wrapper {
      border: 2px solid #007bff;
      border-radius: 8px;
      background: #f9f9f9;
    }
    :host ::ng-deep .custom-numeric.e-control-wrapper.e-input-focus {
      border-color: #0056b3;
      background: white;
    }
  `]
})
export class StyledNumericComponent {}
```

---

## Icon Customization

### Spin Button Icons

Customize the up/down arrow icons by overriding CSS:

```css
/* Spin up icon */
.e-numeric .e-input-group-icon.e-spin-up:before {
  content: "\e823";  /* Custom icon code */
  color: rgba(0, 0, 0, 0.54);
  font-size: 18px;
}

/* Spin down icon */
.e-numeric .e-input-group-icon.e-spin-down:before {
  content: "\e934";  /* Custom icon code */
  color: rgba(0, 0, 0, 0.54);
  font-size: 18px;
}
```

### Icon Color on Hover

```css
.e-numeric .e-input-group-icon:hover {
  background-color: #e0e0e0;
  color: #007bff;
}

.e-numeric .e-input-group-icon:active {
  background-color: #d0d0d0;
}
```

### Example: Custom Icon and Background

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  selector: 'app-custom-icons',
  template: `
    <ejs-numerictextbox
      value="10"
      cssClass="custom-spinner"
      step="5">
    </ejs-numerictextbox>
  `,
  styles: [`
    :host ::ng-deep .custom-spinner .e-input-group-icon {
      font-size: 20px;
      background-color: #f0f0f0;
    }
    :host ::ng-deep .custom-spinner .e-spin-up:before {
      content: "▲";
      color: #28a745;
    }
    :host ::ng-deep .custom-spinner .e-spin-down:before {
      content: "▼";
      color: #dc3545;
    }
  `]
})
export class CustomIconsComponent {}
```

---

## Theme Customization

### Using Theme Studio

Syncfusion Theme Studio allows visual customization:

1. Visit [Syncfusion Theme Studio](https://ej2.syncfusion.com/angular/documentation/appearance/theme-studio)
2. Select NumericTextBox component
3. Customize colors, borders, shadows
4. Export and apply custom CSS

### CSS Variables (Material 3 Theme)

```css
:root {
  --e-primary: #007bff;
  --e-secondary: #6c757d;
  --e-error: #dc3545;
  --e-success: #28a745;
  --e-warning: #ffc107;
}

/* NumericTextBox specific */
.e-numeric {
  --input-border-color: var(--e-primary);
  --input-text-color: #333;
}
```

### Dark Mode Example

```css
@media (prefers-color-scheme: dark) {
  .e-numeric.e-control-wrapper {
    background-color: #1e1e1e;
    color: #ffffff;
    border-color: #404040;
  }
  
  .e-numeric.e-control-wrapper input.e-input {
    background-color: #2d2d2d;
    color: #ffffff;
  }
}
```

---

## Complete Styling Example

Combining multiple styling techniques:

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  selector: 'app-complete-styled',
  template: `
    <div class="numeric-container">
      <label for="price">Product Price</label>
      <ejs-numerictextbox
        id="price"
        [ngModel]="price"
        (change)="onPriceChange($event)"
        format="c2"
        currency="USD"
        min="0"
        decimals="2"
        cssClass="premium-input"
        placeholder="Enter price"
        [showClearButton]="true">
      </ejs-numerictextbox>
      <span class="price-display">{{ price | currency }}</span>
    </div>
  `,
  styles: [`
    .numeric-container {
      margin: 20px 0;
    }
    
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #333;
    }
    
    :host ::ng-deep .premium-input.e-control-wrapper {
      border: 2px solid #007bff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    :host ::ng-deep .premium-input.e-control-wrapper.e-input-focus {
      border-color: #0056b3;
      box-shadow: 0 0 8px rgba(0, 86, 179, 0.3);
    }
    
    .price-display {
      display: block;
      margin-top: 8px;
      font-size: 14px;
      color: #28a745;
      font-weight: bold;
    }
  `]
})
export class CompleteStyledComponent {
  price: number = 99.99;
  
  onPriceChange(event: any) {
    this.price = event.value;
  }
}
```

---

## Troubleshooting

**Issue:** Format not displaying after blur
- **Solution:** Verify format string is valid and theme CSS is imported

**Issue:** Custom CSS not applying
- **Solution:** Use `::ng-deep` for style encapsulation or apply `cssClass` with global styles

**Issue:** Icons not showing
- **Solution:** Check font icon codes and ensure Syncfusion icon font is loaded

---

## See Also

- [Getting Started](./getting-started.md)
- [Validation and Forms](./validation-and-forms.md)
- [Globalization](./globalization.md)
- [Accessibility and Migration](./accessibility-and-migration.md)
