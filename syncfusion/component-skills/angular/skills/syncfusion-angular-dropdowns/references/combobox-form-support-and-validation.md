# Form Support & Validation

## Table of Contents
- [Template-Driven Forms](#template-driven-forms)
- [Reactive Forms](#reactive-forms)
- [Validation Rules](#validation-rules)
- [Custom Validators](#custom-validators)
- [Form State & Status](#form-state--status)
- [Error Display](#error-display)
- [Form Submission](#form-submission)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

---

## Template-Driven Forms

### Basic Template-Driven Form

**Use when:** Simple forms with basic validation, minimal setup

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ComboBoxComponent, ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-template-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ComboBoxModule],
  template: `
    <form #myForm="ngForm" (ngSubmit)="onSubmit(myForm)">
      <h2>Product Selection Form</h2>
      
      <label>Select a product:</label>
      <ejs-combobox
        name="product"
        #productCombo="ngModel"
        [(ngModel)]="selectedProduct"
        [dataSource]="products"
        required
        placeholder="Choose a product">
      </ejs-combobox>
      
      <button type="submit" [disabled]="myForm.invalid">
        Submit
      </button>
    </form>
  `
})
export class TemplateFormComponent {
  selectedProduct = '';
  products = ['Laptop', 'Monitor', 'Keyboard', 'Mouse'];

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form value:', form.value);
      console.log('Selected product:', this.selectedProduct);
    }
  }
}
```

**Key points:**
- Use `name` attribute to register control
- Use `[(ngModel)]` for two-way binding
- Template variable `#myForm="ngForm"` gives access to form
- `form.invalid` checks validation state

---

### Two-Way Binding

```typescript
@Component({
  template: `
    <ejs-combobox
      name="skill"
      [(ngModel)]="selectedSkill"
      [dataSource]="skills"
      placeholder="Select skill">
    </ejs-combobox>
    
    <p>Selected: {{ selectedSkill }}</p>
  `
})
export class TwoWayBindingComponent {
  selectedSkill = 'JavaScript';
  skills = ['JavaScript', 'Python', 'Java', 'C#'];
}
```

**Both directions:**
- Select item → `selectedSkill` updates
- Change `selectedSkill` in code → ComboBox updates

---

### Form-Level Validation

```typescript
@Component({
  template: `
    <form #form="ngForm" (ngSubmit)="onSubmit(form)">
      <ejs-combobox
        name="country"
        [(ngModel)]="formData.country"
        [dataSource]="countries"
        required
        placeholder="Country *">
      </ejs-combobox>
      
      <ejs-combobox
        name="state"
        [(ngModel)]="formData.state"
        [dataSource]="states"
        required
        [enabled]="formData.country"
        placeholder="State *">
      </ejs-combobox>
      
      <button type="submit" [disabled]="!form.valid">Submit</button>
    </form>
  `
})
export class FormLevelComponent {
  formData = { country: '', state: '' };
  countries = ['USA', 'Canada', 'Mexico'];
  states = ['California', 'Texas', 'Florida'];
}
```

---

## Reactive Forms

### Basic Reactive Form

**Use when:** Complex forms, advanced validation, dynamic controls

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComboBoxComponent, ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ComboBoxModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <h2>Job Application Form</h2>
      
      <div>
        <label>Select Position:</label>
        <ejs-combobox
          formControlName="position"
          [dataSource]="positions"
          placeholder="Choose position">
        </ejs-combobox>
      </div>
      
      <div>
        <label>Experience Level:</label>
        <ejs-combobox
          formControlName="experience"
          [dataSource]="levels"
          placeholder="Choose level">
        </ejs-combobox>
      </div>
      
      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>
  `
})
export class ReactiveFormComponent implements OnInit {
  form!: FormGroup;
  positions = ['Developer', 'Designer', 'Manager', 'QA'];
  levels = ['Junior', 'Mid-Level', 'Senior', 'Lead'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      position: ['', Validators.required],
      experience: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form value:', this.form.value);
    }
  }
}
```

**Key differences from template-driven:**
- Use `FormGroup` with `FormBuilder`
- Use `formControlName` instead of `name` and `[(ngModel)]`
- Validators in code, not template
- More control and testability

---

### FormControl for Individual Control

```typescript
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  template: `
    <ejs-combobox
      [formControl]="categoryControl"
      [dataSource]="categories"
      placeholder="Select category">
    </ejs-combobox>
    
    <div *ngIf="categoryControl.invalid && categoryControl.touched">
      Category is required
    </div>
  `
})
export class FormControlComponent {
  categoryControl = new FormControl('', Validators.required);
  categories = ['Electronics', 'Clothing', 'Food'];

  getValue() {
    console.log(this.categoryControl.value);
  }
}
```

---

## Validation Rules

### Built-In Validators

```typescript
import { Validators } from '@angular/forms';

form = this.fb.group({
  // Required field
  product: ['', Validators.required],
  
  // Min length (for custom values)
  tags: ['', Validators.minLength(2)],
  
  // Max length
  notes: ['', Validators.maxLength(100)],
  
  // Pattern (regex)
  code: ['', Validators.pattern(/^[A-Z0-9]+$/)],
  
  // Custom or required (one of them)
  skill: ['', Validators.required]
});
```

---

### Require Selection from List Only

**Use when:** Rejecting custom values not in the original list

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  template: `
    <form [formGroup]="form">
      <ejs-combobox
        formControlName="language"
        [dataSource]="languages"
        placeholder="Select language">
      </ejs-combobox>
      
      <div *ngIf="getError('language')">
        {{ getError('language') }}
      </div>
    </form>
  `
})
export class ListValidationComponent implements OnInit {
  form!: FormGroup;
  languages = ['JavaScript', 'TypeScript', 'Python'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      language: ['', [Validators.required, this.validateFromList.bind(this)]]
    });
  }

  validateFromList(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    
    if (!value) return null; // Let required validator handle empty
    
    if (this.languages.includes(value)) {
      return null; // Valid
    }
    
    return { invalidLanguage: true }; // Invalid - not in list
  }

  getError(fieldName: string) {
    const control = this.form.get(fieldName);
    if (control?.errors) {
      if (control.errors['required']) return 'This field is required';
      if (control.errors['invalidLanguage']) return 'Please select from the list';
    }
    return null;
  }
}
```

---

### Conditional Validation

```typescript
@Component({
  template: `
    <form [formGroup]="form">
      <ejs-combobox
        formControlName="country"
        [dataSource]="countries"
        (change)="onCountryChange()">
      </ejs-combobox>
      
      <ejs-combobox
        *ngIf="form.get('country')?.value === 'USA'"
        formControlName="state"
        [dataSource]="usStates"
        placeholder="Select state">
      </ejs-combobox>
      
      <ejs-combobox
        *ngIf="form.get('country')?.value === 'Canada'"
        formControlName="province"
        [dataSource]="caProvinces"
        placeholder="Select province">
      </ejs-combobox>
    </form>
  `
})
export class ConditionalValidationComponent implements OnInit {
  form!: FormGroup;
  countries = ['USA', 'Canada', 'Mexico'];
  usStates = ['California', 'Texas', 'New York'];
  caProvinces = ['Ontario', 'Quebec', 'British Columbia'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      country: ['', Validators.required],
      state: [''],
      province: ['']
    });
  }

  onCountryChange() {
    const countryControl = this.form.get('country');
    const stateControl = this.form.get('state');
    const provinceControl = this.form.get('province');

    if (countryControl?.value === 'USA') {
      stateControl?.setValidators([Validators.required]);
      provinceControl?.clearValidators();
    } else if (countryControl?.value === 'Canada') {
      provinceControl?.setValidators([Validators.required]);
      stateControl?.clearValidators();
    } else {
      stateControl?.clearValidators();
      provinceControl?.clearValidators();
    }

    stateControl?.updateValueAndValidity();
    provinceControl?.updateValueAndValidity();
  }
}
```

---

## Custom Validators

### Create Custom Validator Function

```typescript
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function notBlacklisted(control: AbstractControl): ValidationErrors | null {
  const blacklist = ['admin', 'test', 'demo'];
  const value = control.value?.toLowerCase();

  if (!value || !blacklist.includes(value)) {
    return null; // Valid
  }

  return { blacklisted: true }; // Invalid
}

// Usage
form = this.fb.group({
  username: ['', [Validators.required, notBlacklisted]]
});
```

---

### Async Validator (Server-Side Check)

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CodeValidator {
  constructor(private http: HttpClient) {}

  validate(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) return Promise.resolve(null);

      // Debounce: wait 500ms before checking
      return timer(500).pipe(
        switchMap(() =>
          this.http.get<any>(`/api/validate-code/${control.value}`)
        ),
        map(response => {
          return response.valid ? null : { codeExists: true };
        })
      );
    };
  }
}

// Usage
form = this.fb.group({
  code: ['', Validators.required, this.codeValidator.validate()]
});
```

---

## Form State & Status

### Access Form State

```typescript
@Component({
  template: `
    <form [formGroup]="form">
      <ejs-combobox
        formControlName="product"
        [dataSource]="products">
      </ejs-combobox>
      
      <div>
        <!-- Form-level status -->
        <p>Form valid: {{ form.valid }}</p>
        <p>Form touched: {{ form.touched }}</p>
        <p>Form dirty: {{ form.dirty }}</p>
        <p>Form pristine: {{ form.pristine }}</p>
        
        <!-- Control-level status -->
        <p *ngIf="control">
          Control value: {{ control.value }}
          Control valid: {{ control.valid }}
          Control touched: {{ control.touched }}
          Control errors: {{ control.errors | json }}
        </p>
      </div>
    </form>
  `
})
export class FormStateComponent implements OnInit {
  form!: FormGroup;
  products = ['Laptop', 'Monitor', 'Keyboard'];

  get control() {
    return this.form.get('product');
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      product: ['', Validators.required]
    });
  }
}
```

**Form States:**
- `valid`: All validators pass
- `invalid`: Any validator fails
- `touched`: User interacted with control
- `untouched`: No user interaction yet
- `dirty`: User changed value
- `pristine`: No changes from initial value
- `pending`: Async validators running

---

## Error Display

### Display Errors Conditionally

```typescript
@Component({
  template: `
    <ejs-combobox
      formControlName="email"
      [dataSource]="domains"
      placeholder="Select email domain">
    </ejs-combobox>
    
    <!-- Show errors only after interaction -->
    <div class="error-message" 
      *ngIf="emailControl.invalid && emailControl.touched">
      <span *ngIf="emailControl.errors?.['required']">
        Email domain is required
      </span>
      <span *ngIf="emailControl.errors?.['pattern']">
        Invalid format
      </span>
    </div>
  `,
  styles: [`
    .error-message {
      color: #dc3545;
      font-size: 12px;
      margin-top: 4px;
    }
  `]
})
export class ErrorDisplayComponent {
  form: FormGroup;
  domains = ['gmail.com', 'company.com', 'yahoo.com'];

  get emailControl() {
    return this.form.get('email')!;
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[\w\-\.]+@[\w\-\.]+\.\w+$/)]]
    });
  }
}
```

---

### Error Message Map

```typescript
getErrorMessage(controlName: string): string {
  const control = this.form.get(controlName);
  
  if (!control || !control.errors || !control.touched) {
    return '';
  }

  const errors = control.errors;

  if (errors['required']) return 'This field is required';
  if (errors['minlength']) return `Minimum ${errors['minlength'].requiredLength} characters`;
  if (errors['maxlength']) return `Maximum ${errors['maxlength'].requiredLength} characters`;
  if (errors['pattern']) return 'Invalid format';
  if (errors['email']) return 'Invalid email';

  return 'Invalid input';
}

template: `
  <div class="error" *ngIf="getErrorMessage('product')">
    {{ getErrorMessage('product') }}
  </div>
`
```

---

## Form Submission

### Submit with Validation

```typescript
@Component({
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <ejs-combobox
        formControlName="product"
        [dataSource]="products"
        required>
      </ejs-combobox>
      
      <ejs-combobox
        formControlName="category"
        [dataSource]="categories"
        required>
      </ejs-combobox>
      
      <button type="submit" [disabled]="form.invalid || isSubmitting">
        {{ isSubmitting ? 'Submitting...' : 'Submit' }}
      </button>
    </form>
  `
})
export class SubmitComponent {
  form: FormGroup;
  products = ['A', 'B', 'C'];
  categories = ['X', 'Y', 'Z'];
  isSubmitting = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      product: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isSubmitting = true;

    this.http.post('/api/submit', this.form.value).subscribe({
      next: (response) => {
        console.log('Success:', response);
        this.form.reset();
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.isSubmitting = false;
      }
    });
  }
}
```

---

### Mark as Touched for Validation Display

```typescript
onSubmit() {
  // Mark all fields as touched to show errors
  Object.keys(this.form.controls).forEach(key => {
    this.form.get(key)?.markAsTouched();
  });

  if (this.form.invalid) {
    return; // Don't submit
  }

  // Submit form
  this.submitData();
}
```

---

## Common Patterns

### Pattern 1: Dependent Field Validation

```typescript
@Component({
  template: `
    <form [formGroup]="form">
      <ejs-combobox
        formControlName="country"
        [dataSource]="countries"
        (change)="onCountryChange()">
      </ejs-combobox>
      
      <ejs-combobox
        formControlName="state"
        [dataSource]="filteredStates"
        [enabled]="form.get('country')?.value">
      </ejs-combobox>
    </form>
  `
})
export class DependentFieldComponent implements OnInit {
  form: FormGroup;
  countries = ['USA', 'Canada'];
  filteredStates: string[] = [];
  
  stateMap = {
    'USA': ['NY', 'TX', 'CA'],
    'Canada': ['ON', 'BC', 'QC']
  };

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      country: [''],
      state: [{ value: '', disabled: true }]
    });
  }

  onCountryChange() {
    const country = this.form.get('country')?.value;
    this.filteredStates = this.stateMap[country as keyof typeof this.stateMap] || [];
  }
}
```

---

### Pattern 2: Multi-Step Form with ComboBoxes

```typescript
@Component({
  template: `
    <form [formGroup]="form">
      <div *ngIf="currentStep === 1">
        <ejs-combobox
          formControlName="industry"
          [dataSource]="industries">
        </ejs-combobox>
        <button (click)="nextStep()">Next</button>
      </div>

      <div *ngIf="currentStep === 2">
        <ejs-combobox
          formControlName="role"
          [dataSource]="roles">
        </ejs-combobox>
        <button (click)="previousStep()">Back</button>
        <button (click)="submit()">Submit</button>
      </div>
    </form>
  `
})
export class MultiStepComponent implements OnInit {
  form: FormGroup;
  currentStep = 1;
  industries = ['Tech', 'Finance', 'Healthcare'];
  roles = ['Manager', 'Developer', 'Designer'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      industry: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  nextStep() {
    if (this.form.get('industry')?.valid) {
      this.currentStep = 2;
    }
  }

  previousStep() {
    this.currentStep = 1;
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
```

---

## Troubleshooting

### Issue: Form control not updating ComboBox value

**Cause:** Using `setValue` instead of `patchValue`, or incorrect field name

**Fix:**
```typescript
// ❌ Wrong - overrides entire form
this.form.setValue({ product: 'Laptop' });

// ✅ Correct - updates only this field
this.form.patchValue({ product: 'Laptop' });

// Or update control directly
this.form.get('product')?.setValue('Laptop');
```

---

### Issue: Validation not triggering / always valid

**Cause:** Validators not set or form/control not marked as touched

**Fix:**
```typescript
// ✅ Ensure validators are set
form = this.fb.group({
  product: ['', Validators.required]  // Add validators
});

// ✅ Mark as touched to show errors
this.form.get('product')?.markAsTouched();

// ✅ Check in template
*ngIf="control.invalid && control.touched"
```

---

### Issue: Async validator hanging/not completing

**Cause:** Request timeout or error not handled

**Fix:**
```typescript
validate(): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return this.http.get(`/api/check/${control.value}`).pipe(
      timeout(5000),  // Add timeout
      map(response => response.valid ? null : { exists: true }),
      catchError(() => of(null))  // Handle errors
    );
  };
}
```

---

Your form integration is complete! Move to [Accessibility & Localization](../accessibility-and-localization.md) to ensure compliance.
