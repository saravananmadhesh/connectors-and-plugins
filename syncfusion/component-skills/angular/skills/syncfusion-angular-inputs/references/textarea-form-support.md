# Form Support — Syncfusion Angular TextArea

## Table of Contents
- [HTML Form Integration](#html-form-integration)
- [Template-Driven Forms with ngModel](#template-driven-forms-with-ngmodel)
- [Reactive Forms with FormControl](#reactive-forms-with-formcontrol)
- [FormValidator Integration](#formvalidator-integration)
- [State Persistence](#state-persistence)
- [Custom HTML Attributes](#custom-html-attributes)

---

## HTML Form Integration

The TextArea integrates seamlessly with native HTML forms. Place `ejs-textarea` inside a `<form>` tag. The component renders as a standard `<textarea>` element in the DOM, so it submits normally with the form:

```typescript
import { Component } from '@angular/core';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule],
  selector: 'app-root',
  template: `
    <form id="feedback-form" method="post">
      <ejs-textarea
        id="feedback"
        name="feedback"
        placeholder="Your feedback"
        [rows]="5"
        floatLabelType="Auto">
      </ejs-textarea>
      <button type="submit" class="e-btn e-primary">Submit</button>
    </form>
  `
})
export class App {}
```

---

## Template-Driven Forms with ngModel

Use `[(ngModel)]` with `name` attribute for two-way binding in template-driven forms:

```typescript
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule, FormsModule],
  selector: 'app-root',
  template: `
    <form #form="ngForm" (ngSubmit)="onSubmit(form)">
      <ejs-textarea
        id="message"
        name="message"
        [(ngModel)]="formData.message"
        placeholder="Message"
        floatLabelType="Auto"
        [rows]="4"
        required>
      </ejs-textarea>
      <button type="submit" class="e-btn e-primary" [disabled]="form.invalid">Send</button>
    </form>
    <p>Value: {{ formData.message }}</p>
  `
})
export class App {
  formData = { message: '' };

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Submitted:', this.formData);
    }
  }
}
```

---

## Reactive Forms with FormControl

Use `formControlName` within a `ReactiveFormsModule`-powered form:

```typescript
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule, ReactiveFormsModule],
  selector: 'app-root',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <ejs-textarea
        id="description"
        formControlName="description"
        placeholder="Description"
        floatLabelType="Auto"
        [rows]="5">
      </ejs-textarea>
      <div *ngIf="form.get('description')?.invalid && form.get('description')?.touched">
        <small style="color:red;">Description is required (min 10 characters)</small>
      </div>
      <button type="submit" class="e-btn e-primary" [disabled]="form.invalid">Submit</button>
    </form>
  `
})
export class App {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form value:', this.form.value);
    }
  }
}
```

---

## FormValidator Integration

Use Syncfusion's `FormValidator` from `@syncfusion/ej2-inputs` to enforce custom validation rules:

```typescript
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule],
  selector: 'app-root',
  template: `
    <form id="validated-form" #validForm>
      <ejs-textarea
        id="description"
        name="description"
        placeholder="Enter description (10–500 chars)"
        floatLabelType="Auto"
        [rows]="5">
      </ejs-textarea>
      <button type="button" class="e-btn e-primary" (click)="validate()">Validate</button>
    </form>
  `
})
export class App implements OnInit {
  private formValidator!: FormValidator;

  ngOnInit() {
    const options: FormValidatorModel = {
      rules: {
        description: {
          required: [true, 'Description is required'],
          minLength: [10, 'Minimum 10 characters required'],
          maxLength: [500, 'Maximum 500 characters allowed']
        }
      }
    };
    this.formValidator = new FormValidator('#validated-form', options);
  }

  validate() {
    const isValid = this.formValidator.validate();
    if (isValid) {
      console.log('Form is valid');
    }
  }
}
```

**Supported `FormValidator` rule types:**
- `required` — field must have a value
- `minLength` — minimum character count
- `maxLength` — maximum character count
- `regex` / `pattern` — custom pattern matching
- `rangeLength` — min and max length combined

---

## State Persistence

Enable `enablePersistence` to preserve the textarea's `value` across page reloads (stored in localStorage):

```html
<ejs-textarea
  id="persistent"
  [enablePersistence]="true"
  placeholder="Content persists on reload"
  [rows]="4">
</ejs-textarea>
```

> **Note:** Persistence is keyed by the component `id`. Ensure each persisted TextArea has a unique `id`.

---

## Custom HTML Attributes

Use `htmlAttributes` to pass additional native HTML attributes to the textarea element. If both `htmlAttributes` and a matching component property are set, the component property takes precedence:

```typescript
import { Component } from '@angular/core';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule],
  selector: 'app-root',
  template: `
    <ejs-textarea
      id="attributed"
      placeholder="With custom attributes"
      [htmlAttributes]="customAttrs"
      [rows]="4">
    </ejs-textarea>
  `
})
export class App {
  customAttrs: { [key: string]: string } = {
    'aria-label': 'Feedback textarea',
    'data-testid': 'feedback-input',
    'autocomplete': 'off',
    'spellcheck': 'true'
  };
}
```
