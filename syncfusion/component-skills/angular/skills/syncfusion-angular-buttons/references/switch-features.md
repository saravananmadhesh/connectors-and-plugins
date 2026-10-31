# Switch Features — Syncfusion Angular Switch

## Table of Contents
- [Disabled State](#disabled-state)
- [Size Variants](#size-variants)
- [RTL Support](#rtl-support)
- [Two-Way Data Binding](#two-way-data-binding)
- [Toggle Programmatically](#toggle-programmatically)
- [State Persistence](#state-persistence)
- [Locale](#locale)

---

## Disabled State

Set `disabled` to `true` to make the Switch non-interactive. A disabled Switch is visually greyed out and cannot be toggled by the user.

```html
<ejs-switch [disabled]="true"></ejs-switch>
```

**Dynamic disable:**
```typescript
export class AppComponent {
  isDisabled = false;

  disableSwitch(): void {
    this.isDisabled = true;
  }
}
```
```html
<ejs-switch [disabled]="isDisabled"></ejs-switch>
<button (click)="disableSwitch()">Disable</button>
```

> **Note:** A disabled Switch value is **not** submitted in HTML forms, even if it is checked.

---

## Size Variants

The Switch supports two sizes: **default** and **small**.

To render a small Switch, set `cssClass` to `'e-small'`:

```html
<!-- Default size -->
<ejs-switch [checked]="true"></ejs-switch>

<!-- Small size -->
<ejs-switch [checked]="true" cssClass="e-small"></ejs-switch>
```

Combine with other classes if needed:
```html
<ejs-switch cssClass="e-small my-custom-class"></ejs-switch>
```

---

## RTL Support

Enable right-to-left rendering with `enableRtl`. Useful for Arabic, Hebrew, and other RTL languages.

```html
<ejs-switch [checked]="true" [enableRtl]="true"></ejs-switch>
```

**Dynamic RTL:**
```typescript
export class AppComponent {
  isRtl = true;
}
```
```html
<ejs-switch [enableRtl]="isRtl"></ejs-switch>
```

When RTL is enabled, the Switch flips its visual layout — the handle starts on the right and moves left when toggled on.

---

## Two-Way Data Binding

Use Angular's `[(ngModel)]` syntax (banana-in-a-box) for two-way binding. Import `FormsModule` to use `ngModel`.

```typescript
import { Component } from '@angular/core';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [SwitchModule, FormsModule],
  selector: 'app-root',
  template: `
    <ejs-switch [(ngModel)]="isEnabled"></ejs-switch>
    <p>Switch is: {{ isEnabled ? 'ON' : 'OFF' }}</p>
  `
})
export class AppComponent {
  isEnabled = false;
}
```

**Syncing Switch with a CheckBox:**

Two-way binding allows the Switch and CheckBox to stay in sync via a shared model variable:

```html
<ejs-switch [(ngModel)]="checked"></ejs-switch>
<ejs-checkbox [(checked)]="checked" label="Sync with Switch"></ejs-checkbox>
```

When either component changes, the other reflects the new state automatically.

---

## Toggle Programmatically

Use the `toggle()` method to flip the Switch state without user interaction.

```typescript
import { Component, ViewChild } from '@angular/core';
import { SwitchComponent, SwitchModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  standalone: true,
  imports: [SwitchModule],
  selector: 'app-root',
  template: `
    <ejs-switch #switchRef [checked]="false"></ejs-switch>
    <button (click)="toggleSwitch()">Toggle</button>
  `
})
export class AppComponent {
  @ViewChild('switchRef') switchRef!: SwitchComponent;

  toggleSwitch(): void {
    this.switchRef.toggle();
  }
}
```

> `toggle()` fires the `change` event, just like a user interaction. Use `beforeChange` if you need to intercept it.

---

## State Persistence

When `enablePersistence` is `true`, the Switch remembers its last checked state across page reloads using browser local storage.

```html
<ejs-switch [enablePersistence]="true" [checked]="false"></ejs-switch>
```

The persisted key is generated from the component's `id`. Assign an explicit `id` to make persistence reliable across app changes:

```html
<ejs-switch id="wifi-toggle" [enablePersistence]="true"></ejs-switch>
```

---

## Locale

Override the component's locale independently from the global app locale:

```html
<ejs-switch locale="fr-FR"></ejs-switch>
```

Defaults to `'en-US'`. Rarely needed for Switch since it has minimal localized text.
