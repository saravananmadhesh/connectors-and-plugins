# Getting Started with NumericTextBox

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup](#setup)
- [Basic Usage](#basic-usage)
- [Range Validation](#range-validation)
- [Precision and Decimals](#precision-and-decimals)
- [Two-Way Binding](#two-way-binding)
- [Reactive Forms](#reactive-forms)

---

## Prerequisites

Ensure your Angular development environment supports:
- **Angular 21+** (latest standalone components recommended)
- **Node.js 18.x or higher**
- **npm 9.x or higher**

Check your Angular version compatibility in the [Syncfusion Version Compatibility Matrix](https://ej2.syncfusion.com/angular/documentation/system-requirement#angular-version-compatibility).

---

## Installation

### Step 1: Install the NumericTextBox Package

Use Angular CLI to install the Syncfusion inputs package:

```bash
ng add @syncfusion/ej2-angular-inputs
```

This command:
- Adds `@syncfusion/ej2-angular-inputs` and peer dependencies to `package.json`
- Automatically imports the Material theme in `angular.json`
- Sets up necessary Syncfusion configurations

### Step 2: Verify Dependencies

The NumericTextBox requires:
```
@syncfusion/ej2-angular-inputs
  ├── @syncfusion/ej2-angular-base
  ├── @syncfusion/ej2-angular-popups
  ├── @syncfusion/ej2-angular-buttons
  ├── @syncfusion/ej2-angular-splitbuttons
  └── @syncfusion/ej2-inputs
```

### Step 3: Add CSS Imports

Add Syncfusion theme styles to `styles.css` or import within your component:

```css
/* Material 3 Theme (recommended) */
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/numerictextbox/index.css";
```

**Alternative themes:** `bootstrap5.css`, `fabric.css`, `highcontrast.css`

---

## Setup

### Standalone Component (Angular 19+, Recommended)

```typescript
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  imports: [NumericTextBoxModule, FormsModule],
  standalone: true,
  selector: 'app-numeric',
  template: `<ejs-numerictextbox value="10"></ejs-numerictextbox>`
})
export class NumericComponent {}
```

### NgModule (Angular 18 and below)

```typescript
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NumericComponent],
  imports: [CommonModule, NumericTextBoxModule]
})
export class NumericModule {}
```

---

## Basic Usage

### Simple NumericTextBox

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-numerictextbox 
      value="100" 
      placeholder="Enter a number">
    </ejs-numerictextbox>
  `
})
export class AppComponent {}
```

### Running the Application

```bash
ng serve
```

Navigate to `http://localhost:4200` to see the component.

---

## Range Validation

### Using min and max Properties

Control the numeric range with `min` and `max`:

```typescript
<ejs-numerictextbox
  value="50"
  min="10"
  max="100"
  placeholder="Enter value between 10-100">
</ejs-numerictextbox>
```

### Strict Mode Validation

Enable `strictMode` to prevent values outside the range from being accepted:

```typescript
<ejs-numerictextbox
  value="50"
  min="10"
  max="100"
  [strictMode]="true">
</ejs-numerictextbox>
```

**Behavior:**
- **strictMode=true**: User cannot type or paste values outside the range
- **strictMode=false**: Values outside range are corrected on blur

---

## Precision and Decimals

### Limiting Decimal Places

Use `decimals` to restrict the number of decimal places allowed:

```typescript
<ejs-numerictextbox
  value="10.50"
  decimals="2"
  placeholder="Allows max 2 decimals">
</ejs-numerictextbox>
```

### Validation on Type

Control whether decimals are validated while typing:

```typescript
<ejs-numerictextbox
  value="10"
  decimals="2"
  [validateDecimalOnType]="true">
</ejs-numerictextbox>
```

**Behavior:**
- **validateDecimalOnType=true**: Decimals restricted while typing
- **validateDecimalOnType=false**: Decimals validated only on blur

### Example: Currency Input

```typescript
<ejs-numerictextbox
  value="100.00"
  format="c2"
  decimals="2"
  currency="USD"
  min="0">
</ejs-numerictextbox>
```

---

## Two-Way Binding

### With ngModel

Bind NumericTextBox value to a component property:

```typescript
export class AppComponent {
  numericValue: number = 50;
}

// Template
<ejs-numerictextbox 
  [(ngModel)]="numericValue" 
  value="50">
</ejs-numerictextbox>

<p>Current value: {{ numericValue }}</p>
```

### Display alongside HTML Input

```typescript
export class AppComponent {
  numericValue: number = 100;
}

// Template
<ejs-numerictextbox 
  [(ngModel)]="numericValue" 
  min="1" 
  max="1000">
</ejs-numerictextbox>

<input type="text" [(ngModel)]="numericValue" disabled />
<p>Value: {{ numericValue }}</p>
```

---

## Reactive Forms

### FormControl Integration

Use NumericTextBox with reactive forms for validation:

```typescript
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [NumericTextBoxModule, ReactiveFormsModule],
  standalone: true,
  selector: 'app-numeric-form',
  template: `
    <form [formGroup]="form">
      <ejs-numerictextbox
        formControlName="quantity"
        min="1"
        max="100"
        step="1"
        placeholder="Enter quantity">
      </ejs-numerictextbox>
      <button [disabled]="form.invalid">Submit</button>
    </form>
  `
})
export class NumericFormComponent {
  form = new FormGroup({
    quantity: new FormControl<number | null>(1, { nonNullable: true })
  });
}
```

### With Validators

```typescript
import { Validators } from '@angular/forms';

form = new FormGroup({
  price: new FormControl<number | null>(
    null,
    [Validators.required, Validators.min(0), Validators.max(10000)]
  )
});
```

---

## Common Patterns

### Percentage Input (0-100)

```typescript
<ejs-numerictextbox
  value="50"
  format="p"
  min="0"
  max="100"
  step="1"
  decimals="0">
</ejs-numerictextbox>
```

### Currency Input

```typescript
<ejs-numerictextbox
  value="1000.00"
  format="c2"
  currency="USD"
  min="0"
  decimals="2">
</ejs-numerictextbox>
```

### Quantity Selector

```typescript
<ejs-numerictextbox
  value="1"
  min="1"
  max="999"
  step="1"
  [showSpinButton]="true">
</ejs-numerictextbox>
```

---

## Troubleshooting

**Issue:** NumericTextBox not rendering
- **Solution:** Ensure CSS imports are included in `styles.css` or component

**Issue:** Value not updating on form submission
- **Solution:** Verify `formControlName` is correctly bound

**Issue:** Decimal validation not working
- **Solution:** Set `validateDecimalOnType=true` for real-time validation

---

## See Also

- [Formats and Styling](./formats-styling.md)
- [Spinners and Step Control](./spinners-and-step.md)
- [Validation and Forms](./validation-and-forms.md)
- [Reactive Forms in Angular](https://angular.dev/guide/forms/reactive-forms)
