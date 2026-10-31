# Disabled Items and Forms in Angular DropDownList

## Table of Contents
- [Disabling Specific Items](#disabling-specific-items)
- [Dynamic disableItem() Method](#dynamic-disableitem-method)
- [Disabling the Entire Component](#disabling-the-entire-component)
- [Template-Driven Forms](#template-driven-forms)
- [Reactive Forms](#reactive-forms)
- [Form Validation](#form-validation)
- [Common Patterns](#common-patterns)

---

## Disabling Specific Items

Mark individual items as non-selectable by mapping a boolean field to `fields.disabled`:

```typescript
import { Component } from '@angular/core';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist
      [dataSource]="statuses"
      [fields]="fields"
      placeholder="Select a status">
    </ejs-dropdownlist>
  `
})
export class AppComponent {
  public statuses: { Text: string; State: boolean }[] = [
    { Text: 'Add to KB',      State: false },
    { Text: 'Crisis',         State: false },  // Will be disabled dynamically
    { Text: 'Enhancement',    State: false },
    { Text: 'Presale',        State: false },
    { Text: 'Internal Issue', State: true  },  // Disabled via data
    { Text: 'New Feature',    State: true  },  // Disabled via data
    { Text: 'Breaking Issue', State: false },
    { Text: 'New Component',  State: false }
  ];

  // 'State: true' means disabled
  public fields = { text: 'Text', value: 'Text', disabled: 'State' };
}
```

Items with `State: true` are rendered as non-interactive in the popup. They cannot be selected.

---

## Dynamic disableItem() Method

Use `disableItem()` to disable items at runtime (after component creation). Access the component via `@ViewChild`:

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { DropDownListModule, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist
      #ddl
      [dataSource]="statuses"
      [fields]="fields"
      (created)="onCreated()"
      placeholder="Select a status">
    </ejs-dropdownlist>
  `
})
export class AppComponent {
  @ViewChild('ddl') public ddl?: DropDownListComponent;

  public statuses = [
    { Text: 'Add to KB', State: false },
    { Text: 'Crisis',    State: false },
    { Text: 'Enhancement', State: false },
    { Text: 'Presale',   State: false }
  ];
  public fields = { text: 'Text', value: 'Text', disabled: 'State' };

  onCreated(): void {
    // Disable by value (string)
    this.ddl?.disableItem('Crisis');
  }
}
```

**Three ways to call `disableItem()`:**

```typescript
// 1. By value (string, number, boolean, or object)
this.ddl?.disableItem('Crisis');
this.ddl?.disableItem(42);

// 2. By index (zero-based)
this.ddl?.disableItem(1); // disables second item

// 3. By HTML LI element
const liEl = document.querySelector('.e-list-item') as HTMLLIElement;
this.ddl?.disableItem(liEl);
```

**Behavior notes:**
- The `disabled` field in the data source is updated to reflect the change
- If the currently selected item is disabled, the selection is cleared
- To disable multiple items, call `disableItem()` in a loop

```typescript
// Disable multiple items
['Crisis', 'Internal Issue'].forEach(item => this.ddl?.disableItem(item));
```

---

## Disabling the Entire Component

Set `[enabled]="false"` to make the entire DropDownList non-interactive:

```html
<!-- Disabled via property binding -->
<ejs-dropdownlist
  [dataSource]="sports"
  [enabled]="false"
  placeholder="Disabled">
</ejs-dropdownlist>

<!-- Toggle enabled state -->
<ejs-dropdownlist
  [dataSource]="sports"
  [enabled]="isEnabled"
  placeholder="Select">
</ejs-dropdownlist>
<button (click)="isEnabled = !isEnabled">Toggle</button>
```

```typescript
public isEnabled = true;
```

A disabled DropDownList is grayed out and does not respond to user interaction, but its value is still accessible in code.

---

## Template-Driven Forms

Use `[(ngModel)]` to integrate DropDownList with Angular template-driven forms. Requires `FormsModule`:

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  standalone: true,
  imports: [DropDownListModule, FormsModule],
  selector: 'app-root',
  template: `
    <form #form="ngForm" (ngSubmit)="onSubmit(form)">
      <ejs-dropdownlist
        name="sport"
        [dataSource]="sports"
        [(ngModel)]="selectedSport"
        required
        placeholder="Select a sport">
      </ejs-dropdownlist>

      <div *ngIf="form.submitted && !selectedSport" style="color: red;">
        Please select a sport.
      </div>

      <button type="submit">Submit</button>
    </form>
    <p>Selected: {{ selectedSport }}</p>
  `
})
export class AppComponent {
  public sports = ['Cricket', 'Football', 'Tennis', 'Golf'];
  public selectedSport: string = '';

  onSubmit(form: any): void {
    if (form.valid) {
      console.log('Form submitted:', this.selectedSport);
    }
  }
}
```

> Always set the `name` attribute when using `ngModel` inside a form — this registers the control with `ngForm`.

---

## Reactive Forms

Use `formControlName` or `[formControl]` for model-driven reactive forms. Requires `ReactiveFormsModule`:

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [DropDownListModule, ReactiveFormsModule, CommonModule],
  selector: 'app-root',
  template: `
    <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">

      <ejs-dropdownlist
        formControlName="sport"
        [dataSource]="sports"
        placeholder="Select a sport">
      </ejs-dropdownlist>

      <div *ngIf="profileForm.get('sport')?.invalid && profileForm.get('sport')?.touched"
           style="color: red;">
        Sport is required.
      </div>

      <button type="submit" [disabled]="profileForm.invalid">Submit</button>
    </form>
  `
})
export class AppComponent {
  public sports = ['Cricket', 'Football', 'Tennis', 'Golf'];

  public profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      sport: ['Cricket', Validators.required] // 'Cricket' = default pre-selected value
    });
  }

  onSubmit(): void {
    console.log('Form value:', this.profileForm.value);
    // { sport: 'Cricket' }
  }
}
```

**Programmatic control:**

```typescript
// Set value programmatically
this.profileForm.patchValue({ sport: 'Football' });

// Reset
this.profileForm.reset();

// Disable/enable
this.profileForm.get('sport')?.disable();
this.profileForm.get('sport')?.enable();
```

---

## Form Validation

**Custom validator example** (value must not be a specific item):

```typescript
import { AbstractControl, ValidationErrors } from '@angular/forms';

function notAllowedValue(disallowed: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value === disallowed
      ? { notAllowed: true }
      : null;
  };
}

// Usage:
this.profileForm = this.fb.group({
  sport: ['', [Validators.required, notAllowedValue('Golf')]]
});
```

---

## Common Patterns

### Pre-select from Server Data
```typescript
// After loading data from API, set the form value
this.apiService.getSports().subscribe(sports => {
  this.sports = sports;
  this.profileForm.patchValue({ sport: sports[0]?.id });
});
```

### Reset Dropdown on Another Control Change
```typescript
// When country changes, reset city dropdown
this.profileForm.get('country')?.valueChanges.subscribe(() => {
  this.profileForm.get('city')?.reset();
});
```

### Read-Only Dropdown
```typescript
// Disable the FormControl to make it read-only
this.profileForm.get('sport')?.disable();
// Note: disabled controls are excluded from form.value — use form.getRawValue()
const allValues = this.profileForm.getRawValue();
```

---

## See Also

- [Data Binding](data-binding.md) — loading dropdown data
- [How-To](how-to.md) — cascading dropdowns with reactive forms
- [Getting Started](getting-started.md) — initial setup and imports
