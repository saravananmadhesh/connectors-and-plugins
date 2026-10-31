# Adornments and Templates

## Table of Contents
- [Overview](#overview)
- [Using prependTemplate](#using-prependtemplate)
- [Using appendTemplate](#using-appendtemplate)
- [Common Patterns](#common-patterns)
- [Examples](#examples)

---

## Overview

Adornments allow you to add custom content **before** or **after** the NumericTextBox input field without affecting numeric validation. Use cases:

- **Currency symbols**: $, €, ¥ before amount
- **Unit labels**: kg, m, cm, mph after value
- **Action icons**: Clear, reset, or calculate buttons
- **Status indicators**: Success, error, or warning icons
- **Helper text**: Inline labels or icons

### Key Features

- ✓ Any inline HTML or component
- ✓ Preserves numeric validation
- ✓ Works with floating labels
- ✓ Fully accessible (ARIA-compliant)
- ✓ Responsive design

---

## Using prependTemplate

The `prependTemplate` renders content **before** the numeric input field.

### Simple Text Prefix

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  selector: 'app-currency',
  template: `
    <ejs-numerictextbox
      value="100"
      format="c2"
      decimals="2"
      [prependTemplate]="currencySymbol">
    </ejs-numerictextbox>

    <ng-template #currencySymbol>
      <span class="currency">$</span>
    </ng-template>
  `,
  styles: [`
    .currency {
      padding: 0 8px;
      font-weight: bold;
      color: #007bff;
    }
  `]
})
export class CurrencyComponent {}
```

### Icon Prefix

```typescript
<ejs-numerictextbox
  value="50"
  [prependTemplate]="iconTemplate">
</ejs-numerictextbox>

<ng-template #iconTemplate>
  <i class="material-icons">attach_money</i>
</ng-template>
```

### Label Prefix

```typescript
<ejs-numerictextbox
  value="10"
  [prependTemplate]="labelTemplate">
</ejs-numerictextbox>

<ng-template #labelTemplate>
  <label class="input-label">Value:</label>
</ng-template>
```

---

## Using appendTemplate

The `appendTemplate` renders content **after** the numeric input field.

### Unit Suffix

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  selector: 'app-units',
  template: `
    <ejs-numerictextbox
      value="100"
      format="n2"
      [appendTemplate]="unitTemplate">
    </ejs-numerictextbox>

    <ng-template #unitTemplate>
      <span class="unit">kg</span>
    </ng-template>
  `,
  styles: [`
    .unit {
      padding: 0 8px;
      color: #666;
      font-size: 14px;
    }
  `]
})
export class UnitsComponent {}
```

### Status Icon Suffix

```typescript
<ejs-numerictextbox
  value="50"
  [appendTemplate]="statusTemplate">
</ejs-numerictextbox>

<ng-template #statusTemplate>
  <span class="status-icon success">✓</span>
</ng-template>
```

### Action Button Suffix

```typescript
<ejs-numerictextbox
  value="1000"
  format="c2"
  [appendTemplate]="actionTemplate">
</ejs-numerictextbox>

<ng-template #actionTemplate>
  <button class="clear-btn" (click)="clearValue()">×</button>
</ng-template>
```

---

## Common Patterns

### Currency with Symbol

```typescript
<ejs-numerictextbox
  value="1250.00"
  format="c2"
  currency="USD"
  [prependTemplate]="currencyPrefix">
</ejs-numerictextbox>

<ng-template #currencyPrefix>
  <span class="currency-symbol">$</span>
</ng-template>
```

### Measurement Input

```typescript
<div class="measurement-group">
  <label>Distance</label>
  <ejs-numerictextbox
    value="100"
    format="n2"
    [appendTemplate]="distanceUnit">
  </ejs-numerictextbox>
</div>

<ng-template #distanceUnit>
  <span class="unit-select">
    <select class="unit-dropdown" (change)="changeUnit($event)">
      <option>m</option>
      <option>km</option>
      <option>mi</option>
    </select>
  </span>
</ng-template>
```

### Discount/Premium Calculator

```typescript
<ejs-numerictextbox
  [(ngModel)]="originalPrice"
  format="c2"
  decimals="2"
  [prependTemplate]="original"
  value="100">
</ejs-numerictextbox>

<ejs-numerictextbox
  [ngModel]="discountedPrice"
  format="c2"
  decimals="2"
  [appendTemplate]="discount">
</ejs-numerictextbox>

<ng-template #original>
  <span>Original:</span>
</ng-template>

<ng-template #discount>
  <span class="discount-badge">-{{ discountPercent }}%</span>
</ng-template>
```

---

## Examples

### Email/Username Prefix

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  template: `
    <ejs-numerictextbox
      value="123"
      placeholder="User ID"
      [prependTemplate]="idPrefix">
    </ejs-numerictextbox>

    <ng-template #idPrefix>
      <span class="input-prefix">ID:</span>
    </ng-template>
  `,
  styles: [`
    .input-prefix {
      padding: 8px;
      background: #f5f5f5;
      border-right: 1px solid #ddd;
    }
  `]
})
export class UserIdComponent {}
```

### Percentage Calculator

```typescript
@Component({
  imports: [NumericTextBoxModule, CommonModule],
  standalone: true,
  selector: 'app-percentage',
  template: `
    <div class="calc-group">
      <label>Base Amount</label>
      <ejs-numerictextbox
        [(ngModel)]="baseAmount"
        value="1000"
        format="c2"
        decimals="2"
        [prependTemplate]="dollar">
      </ejs-numerictextbox>

      <label>Percentage</label>
      <ejs-numerictextbox
        [(ngModel)]="percentage"
        value="10"
        format="p"
        [appendTemplate]="percent">
      </ejs-numerictextbox>

      <p class="result">
        Result: {{ (baseAmount * (1 + percentage / 100)) | currency }}
      </p>
    </div>
  `,
  styles: [`
    .calc-group { padding: 20px; }
    label { display: block; margin-top: 10px; }
    .result { margin-top: 15px; font-weight: bold; color: #28a745; }
  `]
})
export class PercentageCalculatorComponent {
  baseAmount: number = 1000;
  percentage: number = 10;
}

<ng-template #dollar>
  <span class="symbol">$</span>
</ng-template>

<ng-template #percent>
  <span class="symbol">%</span>
</ng-template>
```

### Temperature Converter

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  template: `
    <div class="temp-converter">
      <div class="input-group">
        <label>Celsius</label>
        <ejs-numerictextbox
          [(ngModel)]="celsius"
          (change)="onCelsiusChange()"
          [appendTemplate]="celsiusUnit">
        </ejs-numerictextbox>
      </div>

      <div class="input-group">
        <label>Fahrenheit</label>
        <ejs-numerictextbox
          [(ngModel)]="fahrenheit"
          (change)="onFahrenheitChange()"
          [appendTemplate]="fahrenheitUnit">
        </ejs-numerictextbox>
      </div>
    </div>
  `,
  styles: [`
    .temp-converter { padding: 20px; }
    .input-group { margin: 15px 0; }
    label { display: block; margin-bottom: 5px; }
  `]
})
export class TemperatureConverterComponent {
  celsius: number = 0;
  fahrenheit: number = 32;

  onCelsiusChange() {
    this.fahrenheit = (this.celsius * 9/5) + 32;
  }

  onFahrenheitChange() {
    this.celsius = (this.fahrenheit - 32) * 5/9;
  }
}

<ng-template #celsiusUnit>
  <span class="unit">°C</span>
</ng-template>

<ng-template #fahrenheitUnit>
  <span class="unit">°F</span>
</ng-template>
```

### Price Range Selector

```typescript
@Component({
  imports: [NumericTextBoxModule, CommonModule],
  standalone: true,
  selector: 'app-price-range',
  template: `
    <div class="price-range">
      <label>Min Price</label>
      <ejs-numerictextbox
        [(ngModel)]="minPrice"
        format="c2"
        [prependTemplate]="dollarMin">
      </ejs-numerictextbox>

      <label>Max Price</label>
      <ejs-numerictextbox
        [(ngModel)]="maxPrice"
        format="c2"
        [prependTemplate]="dollarMax">
      </ejs-numerictextbox>

      <p>Range: ${{ minPrice }} - ${{ maxPrice }}</p>
    </div>
  `
})
export class PriceRangeComponent {
  minPrice: number = 0;
  maxPrice: number = 1000;
}

<ng-template #dollarMin>
  <span class="currency">$</span>
</ng-template>

<ng-template #dollarMax>
  <span class="currency">$</span>
</ng-template>
```

---

## Best Practices

1. **Keep templates simple**: Use small, lightweight content
2. **Preserve accessibility**: Ensure templates don't break screen reader flow
3. **Consistent styling**: Match adornment colors to your theme
4. **Avoid functionality**: Don't add complex logic in templates
5. **Test focus/blur**: Ensure templates work with floating labels

---

## Troubleshooting

**Issue:** Adornment content overflows
- **Solution:** Use CSS padding/overflow properties on template

**Issue:** Validation affected by adornment
- **Solution:** Adornments don't affect validation; check your code logic

**Issue:** Template not rendering
- **Solution:** Verify template reference name matches property binding

---

## See Also

- [Getting Started](./getting-started.md)
- [Formats and Styling](./formats-styling.md)
- [Validation and Forms](./validation-and-forms.md)
