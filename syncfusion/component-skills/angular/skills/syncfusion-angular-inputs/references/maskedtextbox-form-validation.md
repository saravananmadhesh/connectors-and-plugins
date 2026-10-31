# Form Validation with MaskedTextBox

Integrate MaskedTextBox with Angular's validation system and Syncfusion FormValidator to enforce validation rules, display custom error messages, and check for complete vs. partial masked input.

## Setup

Install FormValidator from Syncfusion:

```bash
npm install @syncfusion/ej2-inputs --save
```

## Built-in Angular Validators

Use Angular's built-in validators with reactive forms:

### Component

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [MaskedTextBoxModule]
})
export class AppComponent implements OnInit {
  form: FormGroup;
  phoneMask: string = '000-000-0000';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      phone: ['', [Validators.required, Validators.minLength(14)]]
    });
  }

  ngOnInit(): void {
    // Monitor form changes
    this.form.valueChanges.subscribe(() => {
      console.log('Form is valid:', this.form.valid);
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    }
  }

  get phoneControl() {
    return this.form.get('phone');
  }
}
```

### Template

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <div class="form-group">
    <label for="phone">Mobile Number</label>
    <ejs-maskedtextbox
      id="phone"
      formControlName="phone"
      [mask]="phoneMask"
      placeholder="Enter your mobile number"
      floatLabelType="Always">
    </ejs-maskedtextbox>

    <!-- Show validation errors -->
    <div *ngIf="phoneControl?.invalid && phoneControl?.touched" class="error">
      <p *ngIf="phoneControl?.hasError('required')">Mobile number is required</p>
      <p *ngIf="phoneControl?.hasError('minlength')">Mobile number must be complete</p>
    </div>
  </div>

  <button type="submit" [disabled]="!form.valid">Submit</button>
</form>
```

## Custom Validation with Validators

Create custom validators to check for complete masked input:

### Custom Validator

```typescript
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';

export function maskedInputValidator(promptChar: string = '_'): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    // Check if value is empty
    if (!value) {
      return null; // Let required validator handle this
    }

    // Check if mask is completely filled (no prompt characters remaining)
    if (value.indexOf(promptChar) !== -1) {
      return { incompleteMask: { value: value } };
    }

    return null;
  };
}
```

### Component Using Custom Validator

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { maskedInputValidator } from './validators/masked-input.validator';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [MaskedTextBoxModule]
})
export class AppComponent implements OnInit {
  form: FormGroup;
  phoneMask: string = '000-000-0000';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      phone: ['', [Validators.required, maskedInputValidator('_')]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    }
  }

  get phoneControl() {
    return this.form.get('phone');
  }
}
```

### Template with Custom Validator Errors

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <div class="form-group">
    <ejs-maskedtextbox
      formControlName="phone"
      [mask]="phoneMask"
      placeholder="Enter mobile number"
      floatLabelType="Always">
    </ejs-maskedtextbox>

    <div *ngIf="phoneControl?.invalid && phoneControl?.touched" class="error-messages">
      <p *ngIf="phoneControl?.hasError('required')">
        Mobile number is required
      </p>
      <p *ngIf="phoneControl?.hasError('incompleteMask')">
        Please enter a complete mobile number
      </p>
    </div>
  </div>

  <button type="submit" [disabled]="!form.valid">Submit</button>
</form>
```

## Multi-Field Form Validation

Validate multiple masked inputs together:

### Component

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [MaskedTextBoxModule]
})
export class AppComponent implements OnInit {
  form: FormGroup;
  phoneMask: string = '000-000-0000';
  postalMask: string = '00000-0000';
  ssnMask: string = '000-00-0000';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      phone: ['', Validators.required],
      postal: ['', Validators.required],
      ssn: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => {
      console.log('All fields are valid:', this.form.valid);
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form data:', this.form.value);
      // Process form submission
    }
  }

  getFieldError(fieldName: string, errorType: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field?.hasError(errorType) && field?.touched);
  }
}
```

### Template

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <div class="form-group">
    <label>Phone Number</label>
    <ejs-maskedtextbox
      formControlName="phone"
      [mask]="phoneMask"
      placeholder="Enter phone"
      floatLabelType="Always">
    </ejs-maskedtextbox>
    <div *ngIf="getFieldError('phone', 'required')" class="error">
      Phone number is required
    </div>
  </div>

  <div class="form-group">
    <label>Postal Code</label>
    <ejs-maskedtextbox
      formControlName="postal"
      [mask]="postalMask"
      placeholder="Enter postal code"
      floatLabelType="Always">
    </ejs-maskedtextbox>
    <div *ngIf="getFieldError('postal', 'required')" class="error">
      Postal code is required
    </div>
  </div>

  <div class="form-group">
    <label>Social Security Number</label>
    <ejs-maskedtextbox
      formControlName="ssn"
      [mask]="ssnMask"
      placeholder="Enter SSN"
      floatLabelType="Always">
    </ejs-maskedtextbox>
    <div *ngIf="getFieldError('ssn', 'required')" class="error">
      SSN is required
    </div>
  </div>

  <button type="submit" [disabled]="!form.valid">Submit</button>
</form>
```

## Conditional Validation

Apply different validation rules based on component state:

### Component

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [MaskedTextBoxModule]
})
export class AppComponent implements OnInit {
  form: FormGroup;
  phoneMask: string = '000-000-0000';
  isPhoneRequired: boolean = true;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      phone: ['']
    });
  }

  ngOnInit(): void {
    // Update phone validation based on isPhoneRequired flag
    this.form.get('phone')?.setValidators(
      this.isPhoneRequired ? [Validators.required] : []
    );
    this.form.get('phone')?.updateValueAndValidity();
  }

  togglePhoneRequired(): void {
    this.isPhoneRequired = !this.isPhoneRequired;
    const phoneControl = this.form.get('phone');
    
    if (this.isPhoneRequired) {
      phoneControl?.setValidators([Validators.required]);
    } else {
      phoneControl?.setValidators([]);
    }
    
    phoneControl?.updateValueAndValidity();
  }

  get phoneControl() {
    return this.form.get('phone');
  }
}
```

### Template

```html
<form [formGroup]="form">
  <div class="form-group">
    <label>
      <input type="checkbox" [checked]="isPhoneRequired" (change)="togglePhoneRequired()">
      Phone number is required
    </label>

    <ejs-maskedtextbox
      formControlName="phone"
      [mask]="phoneMask"
      placeholder="Enter phone number"
      floatLabelType="Always">
    </ejs-maskedtextbox>

    <div *ngIf="phoneControl?.invalid && phoneControl?.touched" class="error">
      <p *ngIf="phoneControl?.hasError('required')">
        Phone number is required
      </p>
    </div>
  </div>
</form>
```

## CSS for Error Messages

```css
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.error-messages {
  color: #d32f2f;
  font-size: 12px;
  margin-top: 5px;
  padding: 5px;
  background-color: #ffebee;
  border-radius: 4px;
}

.error {
  color: #d32f2f;
  font-size: 12px;
  margin-top: 5px;
}

.form-group ejs-maskedtextbox:has(+ .error) {
  border-color: #d32f2f;
}

button[type="submit"]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

## Key Validation Concepts

### Checking for Incomplete Mask Input

After user input, verify all mask positions are filled:

```typescript
isCompleteMask(value: string, promptChar: string = '_'): boolean {
  return value !== '' && value.indexOf(promptChar) === -1;
}

// In template:
// *ngIf="!isCompleteMask(phoneControl?.value)"
```

### Accessing Form Control Values

```typescript
// Get raw value without literals
const rawValue = this.form.get('phone')?.value;

// In template with pipe if needed
```

### Form Status Tracking

```typescript
ngOnInit(): void {
  this.form.statusChanges.subscribe((status) => {
    console.log('Form status:', status); // VALID or INVALID
  });

  this.form.valueChanges.subscribe((value) => {
    console.log('Form value changed:', value);
  });
}
```

## Reference Documentation

For form validation documentation, visit:
https://ej2.syncfusion.com/angular/documentation/maskedtextbox/how-to/perform-custom-validation-using-form-validator
