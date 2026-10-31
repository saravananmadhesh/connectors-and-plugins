# Form Support & Validation in Angular AutoComplete

## Table of Contents
- [Overview](#overview)
- [Template-Driven Forms (ngModel)](#template-driven-forms-ngmodel)
- [Reactive Forms (FormControl)](#reactive-forms-formcontrol)

---

## Overview

The Angular AutoComplete supports both Angular form approaches:

| Approach | Module Required | Binding Syntax |
|----------|----------------|----------------|
| Template-driven | `FormsModule` | `[(ngModel)]="value"` |
| Reactive | `ReactiveFormsModule` | `[formControlName]="'fieldName'"` |

---

## Template-Driven Forms (ngModel)

Import `FormsModule` and use `ngModel` with a `name` attribute on the `<ejs-autocomplete>` element.
The AutoComplete value is automatically included in the form model.

```typescript
import { Component } from '@angular/core';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [AutoCompleteModule, FormsModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <form #skillForm="ngForm" (ngSubmit)="onSubmit(skillForm)">
      <div>
        <label>Name</label>
        <input type="text" name="sname" [(ngModel)]="formData.sname" required />
      </div>

      <div>
        <label>Skill</label>
        <ejs-autocomplete
          id="skillField"
          name="skillname"
          [dataSource]="skillset"
          [placeholder]="placeholder"
          [(ngModel)]="formData.skillname"
          required>
        </ejs-autocomplete>
      </div>

      <div>
        <label>Email</label>
        <input type="email" name="smail" [(ngModel)]="formData.smail" required />
      </div>

      <button type="submit" [disabled]="skillForm.invalid">Submit</button>
    </form>

    <div *ngIf="submitted">
      <p>Submitted: {{ formData | json }}</p>
    </div>
  `
})
export class AppComponent {
  public skillset: string[] = [
    'ASP.NET', 'ActionScript', 'Basic', 'C++', 'C#',
    'dBase', 'Delphi', 'ESPOL', 'F#', 'FoxPro',
    'Java', 'J#', 'Lisp', 'Logo', 'PHP'
  ];
  public placeholder: string = 'e.g: ActionScript';
  public submitted = false;

  public formData = {
    skillname: null as string | null,
    sname: '',
    smail: ''
  };

  public onSubmit(form: any): void {
    if (form.valid) {
      this.submitted = true;
    }
  }
}
```

**Key points:**
- Add `name` attribute on `<ejs-autocomplete>` so Angular's form tracking works
- Use `[(ngModel)]` for two-way binding to the form model
- Form validity (`skillForm.invalid`) reflects whether the AutoComplete has a value when `required`

---

## Reactive Forms (FormControl)

Import `ReactiveFormsModule` and use `FormGroup` + `FormControl` (or `FormBuilder`) to manage the AutoComplete value programmatically:

```typescript
import { Component, Inject } from '@angular/core';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  imports: [AutoCompleteModule, ReactiveFormsModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <form [formGroup]="skillForm" (ngSubmit)="onSubmit()">
      <div>
        <label>Name</label>
        <input type="text" formControlName="sname" />
        <span *ngIf="skillForm.get('sname')?.invalid && skillForm.get('sname')?.touched">
          Name is required.
        </span>
      </div>

      <div>
        <label>Skill</label>
        <ejs-autocomplete
          id="skillField"
          [dataSource]="skillset"
          [placeholder]="placeholder"
          formControlName="skillname">
        </ejs-autocomplete>
        <span *ngIf="skillForm.get('skillname')?.invalid && skillForm.get('skillname')?.touched">
          Skill is required.
        </span>
      </div>

      <div>
        <label>Email</label>
        <input type="email" formControlName="smail" />
        <span *ngIf="skillForm.get('smail')?.invalid && skillForm.get('smail')?.touched">
          Email is required.
        </span>
      </div>

      <button type="submit" [disabled]="skillForm.invalid">Submit</button>
    </form>

    <div *ngIf="submitted">
      <p>Form Value: {{ skillForm.value | json }}</p>
    </div>
  `
})
export class AppComponent {
  public skillset: string[] = [
    'ASP.NET', 'ActionScript', 'Basic', 'C++', 'C#',
    'dBase', 'Delphi', 'ESPOL', 'F#', 'FoxPro',
    'Java', 'J#', 'Lisp', 'Logo', 'PHP'
  ];
  public placeholder: string = 'e.g: ActionScript';
  public submitted = false;
  public skillForm: FormGroup;

  constructor(@Inject(FormBuilder) private builder: FormBuilder) {
    this.skillForm = this.builder.group({
      skillname: ['', Validators.required],
      sname: ['', Validators.required],
      smail: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    if (this.skillForm.valid) {
      this.submitted = true;
    }
  }
}
```

**Key points:**
- Use `formControlName="skillname"` to bind the AutoComplete to a `FormControl`
- Set initial value in the `FormGroup` definition to pre-select a value
- Access the current value via `skillForm.get('skillname')?.value`
- Validators (e.g., `Validators.required`) work the same as with native inputs

---

## Tips & Common Patterns

| Scenario | Solution |
|----------|----------|
| Pre-select a value in reactive form | Set default in `FormBuilder`: `skillname: ['Java', ...]` |
| Clear the AutoComplete from code | `skillForm.patchValue({ skillname: null })` |
| Disable the field in reactive form | `skillForm.get('skillname')?.disable()` |
| Read current value | `skillForm.value.skillname` or `skillForm.get('skillname')?.value` |
| Validate on submit only | Mark all controls touched: `skillForm.markAllAsTouched()` |
