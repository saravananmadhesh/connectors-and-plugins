# Validation and Forms

## Table of Contents
- [Range Validation](#range-validation)
- [Strict Mode](#strict-mode)
- [Reactive Forms](#reactive-forms)
- [FormValidator Component](#formvalidator-component)
- [Custom Validation](#custom-validation)
- [Error States](#error-states)
- [Examples](#examples)

---

## Range Validation

### Using min and max Properties

Restrict numeric values to a specified range:

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  template: `
    <ejs-numerictextbox
      value="50"
      min="10"
      max="100"
      placeholder="Enter 10-100">
    </ejs-numerictextbox>
  `
})
export class RangeComponent {}
```

**Behavior:**
- User can type values outside range
- Values are corrected on blur to nearest boundary
- Arrow keys respect min/max

### Why Use Range Validation

- Enforce business logic (e.g., 1-999 for quantities)
- Prevent invalid data submission
- Provide user feedback on acceptable ranges
- Combine with `strictMode` for stricter control

---

## Strict Mode

Enable `strictMode` to prevent out-of-range input **while typing**:

```typescript
<ejs-numerictextbox
  value="50"
  min="10"
  max="100"
  [strictMode]="true"
  placeholder="Can't type outside range">
</ejs-numerictextbox>
```

### Comparison: strictMode vs. Non-Strict

| Behavior | strictMode=false | strictMode=true |
|----------|-----------------|-----------------|
| Type "5" (below min 10) | Allowed, corrects to 10 on blur | Rejected, value stays at 50 |
| Type "150" (above max 100) | Allowed, corrects to 100 on blur | Rejected, value stays at 50 |
| Paste value | Works, corrects on blur | Works, corrects immediately |
| Arrow keys | Respect min/max | Respect min/max |

### When to Use strictMode

✓ **Use strictMode=true for:**
- Critical ranges (age: 18-65)
- System-enforced limits (storage: 0-100GB)
- Real-time validation needed

✗ **Don't use strictMode=true for:**
- User-friendly forms (too restrictive)
- Cases where correction on blur is acceptable
- Financial data (allow editing then correct)

### Example: Age Validator

```typescript
<ejs-numerictextbox
  value="25"
  min="18"
  max="120"
  [strictMode]="true"
  decimals="0"
  placeholder="Enter age (18-120)">
</ejs-numerictextbox>
```

---

## Reactive Forms

### FormControl with NumericTextBox

```typescript
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [NumericTextBoxModule, ReactiveFormsModule],
  standalone: true,
  selector: 'app-form',
  template: `
    <form [formGroup]="form">
      <ejs-numerictextbox
        formControlName="quantity"
        min="1"
        max="100">
      </ejs-numerictextbox>
      <button [disabled]="form.invalid">Submit</button>
    </form>
  `
})
export class FormComponent {
  form = new FormGroup({
    quantity: new FormControl<number | null>(1, { nonNullable: true })
  });
}
```

### FormControl with Validators

```typescript
import { Validators, FormControl } from '@angular/forms';

form = new FormGroup({
  price: new FormControl<number | null>(
    null,
    [
      Validators.required,      // Value must be present
      Validators.min(0),         // Value >= 0
      Validators.max(10000)      // Value <= 10000
    ]
  )
});
```

### Displaying Validation Errors

```typescript
@Component({
  imports: [NumericTextBoxModule, ReactiveFormsModule, NgIf],
  standalone: true,
  template: `
    <form [formGroup]="form">
      <ejs-numerictextbox
        formControlName="amount"
        min="0"
        max="1000"
        placeholder="Enter amount">
      </ejs-numerictextbox>

      <div *ngIf="form.get('amount')?.invalid && form.get('amount')?.touched"
           class="error">
        <p *ngIf="form.get('amount')?.getError('required')">
          Amount is required
        </p>
        <p *ngIf="form.get('amount')?.getError('min')">
          Amount must be at least $0
        </p>
        <p *ngIf="form.get('amount')?.getError('max')">
          Amount cannot exceed $1000
        </p>
      </div>
    </form>
  `,
  styles: [`
    .error { color: #dc3545; margin-top: 5px; }
  `]
})
export class ValidatedFormComponent {
  form = new FormGroup({
    amount: new FormControl<number | null>(
      null,
      [Validators.required, Validators.min(0), Validators.max(1000)]
    )
  });
}
```

---

## FormValidator Component

Use FormValidator for complex validation scenarios:

### Basic FormValidator Setup

```typescript
import { FormValidatorModel, FormValidator } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  selector: 'app-form-validator',
  template: `
    <form #myForm class="form-horizontal">
      <ejs-numerictextbox
        id="numericRange"
        placeholder="Enter number"
        (created)="onCreate()">
      </ejs-numerictextbox>
      <span id="validation-message"></span>
      <button type="submit" class="btn">Submit</button>
    </form>
  `
})
export class FormValidatorComponent {
  @ViewChild('myForm') formElement!: ElementRef;
  formValidator!: FormValidator;

  onCreate() {
    const options: FormValidatorModel = {
      rules: {
        numericRange: { required: [true, 'Number is required'] }
      }
    };

    this.formValidator = new FormValidator(this.formElement.nativeElement, options);
  }
}
```

### Custom Validation Rules

```typescript
const options: FormValidatorModel = {
  rules: {
    'numericInput': {
      required: [true, 'This field is required'],
      min: [10, 'Minimum value is 10'],
      max: [100, 'Maximum value is 100']
    }
  },
  customPlacement: (inputElement: HTMLElement, errorElement: HTMLElement) => {
    inputElement.parentElement?.appendChild(errorElement);
  }
};

this.formValidator = new FormValidator(form, options);
```

---

## Custom Validation

### Change Event Validation

```typescript
import { ChangeEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  template: `
    <ejs-numerictextbox
      [ngModel]="value"
      (change)="onNumericChange($event)"
      min="0"
      max="1000">
    </ejs-numerictextbox>
    <div class="validation-result">{{ validationMessage }}</div>
  `,
  styles: [`
    .validation-result {
      margin-top: 10px;
      padding: 8px;
      border-radius: 4px;
    }
    .success { background: #d4edda; color: #155724; }
    .error { background: #f8d7da; color: #721c24; }
  `]
})
export class CustomValidationComponent {
  value: number = 0;
  validationMessage: string = '';

  onNumericChange(args: ChangeEventArgs) {
    const value = args.value;

    // Custom rule: value must be even
    if (value % 2 !== 0) {
      this.validationMessage = '❌ Value must be even';
    } else {
      this.validationMessage = '✓ Valid';
    }
  }
}
```

### Async Validation (Server Check)

```typescript
import { NumericBlurEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  template: `
    <ejs-numerictextbox
      (blur)="checkAvailability($event)"
      placeholder="Enter ID">
    </ejs-numerictextbox>
    <p *ngIf="isChecking">Checking...</p>
    <p *ngIf="!isChecking && validationStatus">
      {{ validationStatus }}
    </p>
  `
})
export class AsyncValidationComponent {
  isChecking = false;
  validationStatus = '';

  constructor(private http: HttpClient) {}

  checkAvailability(args: NumericBlurEventArgs) {
    const value = args.value;
    this.isChecking = true;

    this.http.get(`/api/check-id/${value}`).subscribe(
      (response: any) => {
        this.validationStatus = response.available
          ? '✓ ID available'
          : '✗ ID already taken';
        this.isChecking = false;
      }
    );
  }
}
```

---

## Error States

### Displaying Error Messages

```typescript
@Component({
  imports: [NumericTextBoxModule, NgClass, NgIf],
  standalone: true,
  template: `
    <div [ngClass]="{ 'form-group error': hasError }">
      <label>Price</label>
      <ejs-numerictextbox
        [(ngModel)]="price"
        (blur)="validatePrice()"
        format="c2"
        min="0"
        max="10000"
        cssClass="input-field">
      </ejs-numerictextbox>
      <span class="error-message" *ngIf="hasError">
        {{ errorMessage }}
      </span>
    </div>
  `,
  styles: [`
    .form-group.error .input-field {
      border-color: #dc3545;
    }
    .error-message {
      color: #dc3545;
      font-size: 12px;
      margin-top: 4px;
      display: block;
    }
  `]
})
export class ErrorStateComponent {
  price: number = 0;
  hasError = false;
  errorMessage = '';

  validatePrice(args: NumericBlurEventArgs) {
    const val = args.value;
    if (val < 0) {
      this.hasError = true;
      this.errorMessage = 'Price must be positive';
    } else if (val > 10000) {
      this.hasError = true;
      this.errorMessage = 'Price cannot exceed $10,000';
    } else {
      this.hasError = false;
      this.errorMessage = '';
    }
  }
}
```

### Warning State

```typescript
<ejs-numerictextbox
  value="50"
  min="0"
  max="100"
  [ngClass]="{ 'warning': value > 80 }"
  placeholder="Enter value">
</ejs-numerictextbox>

<p *ngIf="value > 80" class="warning-text">
  ⚠ Value is high ({{ value }}/100)
</p>

<style>
  :host ::ng-deep .warning.e-control-wrapper {
    border-color: #ffc107;
  }
  .warning-text {
    color: #ff6600;
    font-size: 12px;
  }
</style>
```

---

## Examples

### Complete Form Example

```typescript
@Component({
  imports: [NumericTextBoxModule, ReactiveFormsModule, CommonModule],
  standalone: true,
  selector: 'app-product-form',
  template: `
    <form [formGroup]="form" (submit)="onSubmit()">
      <div class="form-group">
        <label>Product Price</label>
        <ejs-numerictextbox
          formControlName="price"
          format="c2"
          min="0"
          max="10000"
          decimals="2">
        </ejs-numerictextbox>
        <span class="error" *ngIf="isFieldInvalid('price')">
          Price is required and must be between 0-10000
        </span>
      </div>

      <div class="form-group">
        <label>Quantity</label>
        <ejs-numerictextbox
          formControlName="quantity"
          min="1"
          max="999"
          decimals="0">
        </ejs-numerictextbox>
        <span class="error" *ngIf="isFieldInvalid('quantity')">
          Quantity must be 1-999
        </span>
      </div>

      <button type="submit" [disabled]="form.invalid">
        Submit Order
      </button>
    </form>
  `,
  styles: [`
    form { padding: 20px; max-width: 400px; }
    .form-group { margin-bottom: 20px; }
    label { display: block; margin-bottom: 5px; font-weight: bold; }
    .error { color: #dc3545; font-size: 12px; }
    button { padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; }
    button:disabled { background: #ccc; cursor: not-allowed; }
  `]
})
export class ProductFormComponent {
  form = new FormGroup({
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(0), Validators.max(10000)]),
    quantity: new FormControl<number | null>(1, [Validators.required, Validators.min(1), Validators.max(999)])
  });

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form value:', this.form.value);
    }
  }
}
```

---

## Troubleshooting

**Issue:** Validation not triggering
- **Solution:** Ensure `(change)` or `(blur)` event handler is attached

**Issue:** Form invalid despite valid values
- **Solution:** Check Validators in FormControl definition

**Issue:** Error message not disappearing
- **Solution:** Reset error flag when value becomes valid

---

## See Also

- [Getting Started](./getting-started.md)
- [Advanced Patterns](./advanced-patterns.md)
- [Accessibility and Migration](./accessibility-and-migration.md)
