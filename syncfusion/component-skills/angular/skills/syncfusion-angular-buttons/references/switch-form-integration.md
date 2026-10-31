# Form Integration — Syncfusion Angular Switch

## Table of Contents
- [name and value Attributes](#name-and-value-attributes)
- [Form Submission Rules](#form-submission-rules)
- [Submit name and value in an HTML Form](#submit-name-and-value-in-an-html-form)
- [Two-Way Binding with ngModel](#two-way-binding-with-ngmodel)
- [Template-Driven Forms](#template-driven-forms)
- [Reactive Forms](#reactive-forms)

---

## name and value Attributes

The `name` attribute groups Switches in a form, and the `value` attribute defines what is sent to the server when the Switch is checked.

```html
<ejs-switch name="wifi" value="enabled" [checked]="true"></ejs-switch>
```

- `name`: Groups the Switch within a form. Used as the form field key in the POST body.
- `value`: The string value submitted when the Switch is in a checked state.

---

## Form Submission Rules

**What gets submitted:**
- Only **checked** Switches submit their `value`
- **Disabled** Switches are **never** submitted, regardless of checked state
- **Unchecked** Switches are **not** submitted

```html
<form>
  <!-- Submitted: name=usb, value=on -->
  <ejs-switch name="usb" value="on" [checked]="true"></ejs-switch>

  <!-- Submitted: name=wifi, value=active -->
  <ejs-switch name="wifi" value="active" [checked]="true"></ejs-switch>

  <!-- NOT submitted: disabled -->
  <ejs-switch name="bluetooth" value="on" [checked]="true" [disabled]="true"></ejs-switch>

  <!-- NOT submitted: unchecked -->
  <ejs-switch name="nfc" value="on" [checked]="false"></ejs-switch>

  <button type="submit">Submit</button>
</form>
```

**On submit**, only `usb=on` and `wifi=active` are sent to the server.

---

## Submit name and value in an HTML Form

Full working example with multiple Switches in a form:

```typescript
import { Component } from '@angular/core';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  standalone: true,
  imports: [SwitchModule],
  selector: 'app-root',
  template: `
    <form #settingsForm="ngForm" (ngSubmit)="onSubmit(settingsForm)">
      <label>USB
        <ejs-switch name="usb" value="on" [checked]="true"></ejs-switch>
      </label>
      <label>Wi-Fi
        <ejs-switch name="wifi" value="on" [checked]="true"></ejs-switch>
      </label>
      <label>Bluetooth (disabled)
        <ejs-switch name="bluetooth" value="on" [checked]="true" [disabled]="true"></ejs-switch>
      </label>
      <button type="submit">Save Settings</button>
    </form>
  `
})
export class AppComponent {
  onSubmit(form: any): void {
    console.log('Form data:', form.value);
    // Only usb and wifi values are captured; bluetooth is excluded (disabled)
  }
}
```

---

## Two-Way Binding with ngModel

Use `[(ngModel)]` to keep a component property synchronized with the Switch state. Import `FormsModule`.

```typescript
import { Component } from '@angular/core';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [SwitchModule, FormsModule],
  selector: 'app-root',
  template: `
    <ejs-switch [(ngModel)]="darkMode" name="theme"></ejs-switch>
    <p>Dark mode is {{ darkMode ? 'enabled' : 'disabled' }}</p>
  `
})
export class AppComponent {
  darkMode = false;
}
```

Setting `darkMode = true` in code automatically checks the Switch; toggling the Switch updates `darkMode`.

---

## Template-Driven Forms

Use `ngModel` within an `<form>` to integrate Switch with Angular template-driven forms:

```typescript
import { Component } from '@angular/core';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [SwitchModule, FormsModule],
  selector: 'app-root',
  template: `
    <form #prefsForm="ngForm" (ngSubmit)="save(prefsForm.value)">
      <ejs-switch name="notifications" [(ngModel)]="prefs.notifications"></ejs-switch>
      <ejs-switch name="newsletter" [(ngModel)]="prefs.newsletter"></ejs-switch>
      <button type="submit">Save Preferences</button>
    </form>
  `
})
export class AppComponent {
  prefs = { notifications: true, newsletter: false };

  save(values: any): void {
    console.log('Preferences:', values);
  }
}
```

---

## Reactive Forms

Bind the Switch's `checked` property to a `FormControl`:

```typescript
import { Component } from '@angular/core';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  standalone: true,
  imports: [SwitchModule, ReactiveFormsModule],
  selector: 'app-root',
  template: `
    <form [formGroup]="settingsForm" (ngSubmit)="onSubmit()">
      <ejs-switch formControlName="darkMode"
                  [checked]="settingsForm.get('darkMode')?.value"
                  (change)="settingsForm.get('darkMode')?.setValue($event.checked)">
      </ejs-switch>
      <button type="submit">Apply</button>
    </form>
  `
})
export class AppComponent {
  settingsForm = new FormGroup({
    darkMode: new FormControl(false)
  });

  onSubmit(): void {
    console.log('Settings:', this.settingsForm.value);
  }
}
```

> The Switch does not natively support `ControlValueAccessor` via `formControlName`. Use the `(change)` event to manually sync the value to the `FormControl`.
