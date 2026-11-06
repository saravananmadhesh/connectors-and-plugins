# Forms & Data Binding — Syncfusion Angular RadioButton

This reference covers grouping radio buttons, form submission behavior, two-way binding with `[(ngModel)]`, and syncing a RadioButton group with other components.

---

## Grouping with the `name` Attribute

The `name` property groups RadioButtons so that only one in the group can be selected at a time. All buttons sharing the same `name` form a mutually exclusive group.

```typescript
<!-- Payment method group -->
<ejs-radiobutton label="Credit Card" name="payment" value="credit" [checked]="true"></ejs-radiobutton>
<ejs-radiobutton label="Debit Card"  name="payment" value="debit"></ejs-radiobutton>
<ejs-radiobutton label="Net Banking" name="payment" value="netbanking"></ejs-radiobutton>

<!-- Separate delivery group — independent of payment -->
<ejs-radiobutton label="Standard" name="delivery" value="standard" [checked]="true"></ejs-radiobutton>
<ejs-radiobutton label="Express"  name="delivery" value="express"></ejs-radiobutton>
```

- **Type:** `string`
- **Default:** `''`
- Groups are identified purely by the `name` string — buttons with different names belong to different groups.

---

## The `value` Attribute and Form Submission

The `value` property defines what data is submitted to the server when the form is submitted.

```typescript
<form>
  <ejs-radiobutton label="Credit Card" name="payment" value="credit" [checked]="true"></ejs-radiobutton>
  <ejs-radiobutton label="Debit Card"  name="payment" value="debit"></ejs-radiobutton>
  <button type="submit">Submit</button>
</form>
```

**Form submission rules:**
- Only the **checked** RadioButton's `value` is sent under its `name` key
- **Disabled** RadioButtons are **never** sent, even if visually checked
- **Unchecked** RadioButtons are **never** sent

In the example above, if "Credit Card" is selected, the server receives `payment=credit`.

---

## Template-Driven Forms with ngModel

Two-way binding with `[(ngModel)]` keeps a component property in sync with the selected RadioButton.

```typescript
import { Component } from '@angular/core';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [RadioButtonModule, FormsModule],
  selector: 'app-root',
  template: `
    <ejs-radiobutton label="Monthly" name="plan" value="monthly" [(ngModel)]="selectedPlan"></ejs-radiobutton>
    <ejs-radiobutton label="Annual"  name="plan" value="annual"  [(ngModel)]="selectedPlan"></ejs-radiobutton>
    <p>Selected plan: {{ selectedPlan }}</p>
  `
})
export class AppComponent {
  selectedPlan = 'monthly';  // Pre-selects "Monthly"
}
```

> Import `FormsModule` when using `ngModel`. Each button in the group must share both the same `name` and the same `[(ngModel)]` binding variable.

### How ngModel Works with RadioButton

- When `selectedPlan` changes in the component, the matching RadioButton (where `value === selectedPlan`) becomes checked automatically.
- When the user selects a button, `selectedPlan` is updated to that button's `value`.

---

## Two-Way Binding with Another Component

You can sync a RadioButton group with another component such as a DropDownList. Both components share the same bound variable.

```typescript
import { Component } from '@angular/core';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [RadioButtonModule, DropDownListModule, FormsModule],
  selector: 'app-root',
  template: `
    <h4>Select via RadioButton:</h4>
    <ejs-radiobutton label="Credit" name="payment" value="credit" [(ngModel)]="selected"></ejs-radiobutton>
    <ejs-radiobutton label="Debit"  name="payment" value="debit"  [(ngModel)]="selected"></ejs-radiobutton>
    <ejs-radiobutton label="UPI"    name="payment" value="upi"    [(ngModel)]="selected"></ejs-radiobutton>

    <h4>Or select via DropDownList:</h4>
    <ejs-dropdownlist [dataSource]="paymentMethods" [(value)]="selected"></ejs-dropdownlist>

    <p>Current selection: {{ selected }}</p>
  `
})
export class AppComponent {
  selected = 'credit';
  paymentMethods = ['credit', 'debit', 'upi'];
}
```

Selecting a RadioButton updates the DropDownList, and vice versa — both stay in sync through the shared `selected` variable.

---

## Reactive Forms

For reactive forms, bind using `[checked]` with a computed expression or subscribe to form control value changes:

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ChangeArgs } from '@syncfusion/ej2-angular-buttons';

@Component({
  standalone: true,
  imports: [RadioButtonModule, ReactiveFormsModule],
  selector: 'app-root',
  template: `
    <form [formGroup]="form">
      <ejs-radiobutton label="Option A" name="choice" value="a"
        [checked]="form.get('choice')?.value === 'a'"
        (change)="onChoiceChange($event)">
      </ejs-radiobutton>
      <ejs-radiobutton label="Option B" name="choice" value="b"
        [checked]="form.get('choice')?.value === 'b'"
        (change)="onChoiceChange($event)">
      </ejs-radiobutton>
    </form>
    <p>Form value: {{ form.value | json }}</p>
  `
})
export class AppComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({ choice: ['a'] });
  }

  onChoiceChange(args: ChangeArgs): void {
    this.form.get('choice')?.setValue(args.value);
  }
}
```

---

## See Also

- [Label, Size & States](label-size-states.md)
- [Customization & Advanced](customization-and-advanced.md)
- [API Reference](api.md)
