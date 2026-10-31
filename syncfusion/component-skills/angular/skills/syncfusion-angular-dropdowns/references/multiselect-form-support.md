# Form Integration — Syncfusion Angular MultiSelect Dropdown

## Table of Contents
- [Overview](#overview)
- [Template-Driven Forms](#template-driven-forms)
- [Reactive Forms](#reactive-forms)
- [Validation](#validation)
- [Common Patterns](#common-patterns)

---

## Overview

The MultiSelect integrates with both Angular form strategies:

| Strategy | Module | Binding | Best For |
|---|---|---|---|
| Template-driven | `FormsModule` | `ngModel` two-way | Simple forms, rapid prototyping |
| Reactive | `ReactiveFormsModule` | `FormControl` / `formControlName` | Complex forms, dynamic validation |

Both approaches allow reading the selected values, applying validators, and displaying error messages with standard Angular patterns.

---

## Template-Driven Forms

Import `FormsModule` and use `ngModel` for two-way binding:

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  standalone: true,
  imports: [MultiSelectModule, FormsModule],
  template: `
    <form #skillForm="ngForm" (ngSubmit)="onSubmit(skillForm)">
      <ejs-multiselect
        name="skills"
        [dataSource]="availableSkills"
        [(ngModel)]="selectedSkills"
        placeholder="Select your skills"
        required>
      </ejs-multiselect>

      <div *ngIf="skillForm.submitted && skillForm.controls['skills']?.invalid">
        <small class="error">Please select at least one skill.</small>
      </div>

      <button type="submit">Submit</button>
    </form>
    <p>Selected: {{ selectedSkills | json }}</p>
  `
})
export class AppComponent {
  public availableSkills: string[] = ['Angular', 'React', 'TypeScript', 'Node.js', 'Python'];
  public selectedSkills: string[] = [];

  onSubmit(form: any): void {
    if (form.valid) {
      console.log('Skills submitted:', this.selectedSkills);
    }
  }
}
```

**Key points:**
- The `name` attribute is required for the MultiSelect to register with `ngForm`
- `[(ngModel)]` provides two-way binding — the model updates on every change
- Add `required` directly on the element for built-in required validation
- `FormsModule` must be in the component `imports` array (standalone) or `AppModule`

---

## Reactive Forms

Use `FormControl` or `FormGroup` for model-driven form management:

### With `FormControl` Directly

```typescript
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  standalone: true,
  imports: [MultiSelectModule, ReactiveFormsModule],
  template: `
    <ejs-multiselect
      [dataSource]="categories"
      [fields]="fields"
      [formControl]="categoryControl"
      placeholder="Select categories">
    </ejs-multiselect>

    <div *ngIf="categoryControl.invalid && categoryControl.touched">
      <small class="error">At least one category is required.</small>
    </div>
    <p>Value: {{ categoryControl.value | json }}</p>
  `
})
export class AppComponent {
  public categories = [
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Business'   },
    { id: 3, name: 'Design'     },
  ];
  public fields = { text: 'name', value: 'id' };

  // Initialize with pre-selected values and required validator
  public categoryControl = new FormControl([1], Validators.required);
}
```

### Within a `FormGroup`

```typescript
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  standalone: true,
  imports: [MultiSelectModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
      <div>
        <label>Full Name</label>
        <input formControlName="name" />
      </div>

      <div>
        <label>Skills</label>
        <ejs-multiselect
          [dataSource]="skills"
          formControlName="skills"
          placeholder="Select skills">
        </ejs-multiselect>
        <div *ngIf="profileForm.get('skills')?.invalid && profileForm.get('skills')?.touched">
          <small class="error">Please select at least one skill.</small>
        </div>
      </div>

      <button type="submit" [disabled]="profileForm.invalid">Save Profile</button>
    </form>
  `
})
export class AppComponent {
  public skills: string[] = ['Angular', 'React', 'TypeScript', 'CSS', 'Node.js'];

  public profileForm = new FormGroup({
    name:   new FormControl('', Validators.required),
    skills: new FormControl([], Validators.required) // [] = no pre-selection
  });

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
      // { name: 'Jane', skills: ['Angular', 'TypeScript'] }
    }
  }
}
```

---

## Validation

### Built-in Required Validation

For template-driven forms, apply `required` directly. For reactive forms, use `Validators.required`.

> **Note:** `Validators.required` checks for non-null/non-empty. For arrays, an empty `[]` passes the required check. Use a custom validator if you need "at least one item selected."

### Custom Validator: Minimum Selection Count

```typescript
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minSelectionValidator(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as any[];
    if (!value || value.length < min) {
      return { minSelection: { required: min, actual: value?.length ?? 0 } };
    }
    return null;
  };
}

// Usage in FormControl:
public skillsControl = new FormControl([], minSelectionValidator(2));

// In template:
// <div *ngIf="skillsControl.errors?.['minSelection']">
//   Select at least {{ skillsControl.errors?.['minSelection'].required }} skills.
// </div>
```

### Maximum Selection Validation

```typescript
export function maxSelectionValidator(max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as any[];
    if (value && value.length > max) {
      return { maxSelection: { limit: max, actual: value.length } };
    }
    return null;
  };
}
```

---

## Common Patterns

### Read Form Values on Submit

```typescript
onSubmit(): void {
  const selected: string[] = this.form.get('skills')?.value ?? [];
  // Process selected array
}
```

### Reset the MultiSelect Programmatically

```typescript
// Reset form control to empty selection
this.profileForm.patchValue({ skills: [] });

// Or reset the entire form
this.profileForm.reset();
```

### Disable/Enable Dynamically

```typescript
// Disable
this.profileForm.get('skills')?.disable();

// Enable
this.profileForm.get('skills')?.enable();
```

### Two-way Value Sync with External State

```typescript
// Subscribe to value changes for reactive side effects
this.profileForm.get('skills')?.valueChanges.subscribe((selected: string[]) => {
  this.updateDependentField(selected);
});
```
