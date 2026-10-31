# How-To Guides — Syncfusion Angular CheckBox

## Table of Contents
- [Name and Value in Form Submission](#name-and-value-in-form-submission)
- [Two-Way Binding with ngModel](#two-way-binding-with-ngmodel)
- [Enable Right-to-Left](#enable-right-to-left)
- [Customize CheckBox Appearance](#customize-checkbox-appearance)
- [Programmatic Access with ViewChild](#programmatic-access-with-viewchild)

---

## Name and Value in Form Submission

Use the `name` and `value` properties to group checkboxes and submit their values in an HTML form.

**Rules:**
- Only **checked** and **non-disabled** checkboxes send their `value` to the server on form submit
- `disabled` and **unchecked** checkboxes are excluded from the submitted data
- Multiple checkboxes sharing the same `name` form a group; all selected values are submitted

```typescript
import { CheckBoxModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [CheckBoxModule, ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <form>
        <ul>
          <!-- Checked: Cricket value will be submitted -->
          <li><ejs-checkbox name="Sport" value="Cricket" label="Cricket" [checked]="true"></ejs-checkbox></li>

          <!-- Checked: Hockey value will be submitted -->
          <li><ejs-checkbox name="Sport" value="Hockey" label="Hockey" [checked]="true"></ejs-checkbox></li>

          <!-- Disabled: Tennis value will NOT be submitted -->
          <li><ejs-checkbox name="Sport" value="Tennis" label="Tennis" [disabled]="true"></ejs-checkbox></li>

          <!-- Unchecked: Basketball value will NOT be submitted -->
          <li><ejs-checkbox name="Sport" value="Basketball" label="Basketball"></ejs-checkbox></li>

          <li><button ejs-button [isPrimary]="true">Submit</button></li>
        </ul>
      </form>
    </div>`
})
export class AppComponent { }
```

> **Result:** On submit, the form sends `Sport=Cricket&Sport=Hockey`.

---

## Two-Way Binding with ngModel

Use Angular's `[(ngModel)]` syntax ("banana in a box") to bind the checkbox state to a component property. Changes in the checkbox reflect immediately in the bound variable, and programmatic changes to the variable update the checkbox.

**Requirements:** Import `FormsModule` alongside `CheckBoxModule`.

```typescript
import { CheckBoxModule, SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  imports: [CheckBoxModule, SwitchModule, FormsModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <table>
        <tr>
          <td><label>Wi-Fi</label></td>
          <td><ejs-checkbox [(ngModel)]="checkedWifi"></ejs-checkbox></td>
          <td><ejs-switch [(checked)]="checkedWifi"></ejs-switch></td>
        </tr>
        <tr>
          <td><label>Bluetooth</label></td>
          <td><ejs-checkbox [(ngModel)]="checkedBluetooth"></ejs-checkbox></td>
          <td><ejs-switch [(checked)]="checkedBluetooth"></ejs-switch></td>
        </tr>
      </table>
    </div>`
})
export class AppComponent {
  public checkedWifi: boolean = true;
  public checkedBluetooth: boolean = false;
}
```

> **How it works:** When the CheckBox changes state, `checkedWifi` updates, which in turn updates the Switch, and vice versa.

---

## Enable Right-to-Left

Set `enableRtl` to `true` for right-to-left locales (Arabic, Hebrew, Persian, etc.). The checkbox frame and label mirror horizontally:

```typescript
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [CheckBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <ejs-checkbox label="Default" [enableRtl]="true"></ejs-checkbox>
    </div>`
})
export class AppComponent { }
```

---

## Customize CheckBox Appearance

Provide custom CSS classes via `cssClass` to override the default visual style.

### Color Variants

```typescript
@Component({
  imports: [CheckBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ul>
      <li><ejs-checkbox label="Primary" cssClass="e-primary" [checked]="true"></ejs-checkbox></li>
      <li><ejs-checkbox label="Success" cssClass="e-success" [checked]="true"></ejs-checkbox></li>
      <li><ejs-checkbox label="Info" cssClass="e-info" [checked]="true"></ejs-checkbox></li>
      <li><ejs-checkbox label="Warning" cssClass="e-warning" [checked]="true"></ejs-checkbox></li>
      <li><ejs-checkbox label="Danger" cssClass="e-danger" [checked]="true"></ejs-checkbox></li>
    </ul>`
})
export class AppComponent { }
```

Define matching CSS rules in `styles.css` targeting `.e-checkbox-wrapper.{class} .e-frame`.

### Round Frame

```typescript
@Component({
  imports: [CheckBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ul>
      <li><ejs-checkbox label="Buy Groceries" cssClass="e-custom" [checked]="true"></ejs-checkbox></li>
      <li><ejs-checkbox label="Pay Rent" cssClass="e-custom"></ejs-checkbox></li>
    </ul>`
})
export class AppComponent { }
```

```css
/* styles.css */
.e-checkbox-wrapper.e-custom .e-frame {
  border-radius: 100%;
}
.e-checkbox-wrapper.e-custom .e-frame.e-check {
  background-color: #05b510;
  border-color: #05b510;
  border-radius: 100%;
}
```

---

## Programmatic Access with ViewChild

Use Angular's `@ViewChild` to call CheckBox methods programmatically:

```typescript
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { Component, ViewChild } from '@angular/core';

@Component({
  imports: [CheckBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-checkbox #checkbox label="Option"></ejs-checkbox>
    <button (click)="focusCheckbox()">Focus</button>
    <button (click)="clickCheckbox()">Toggle</button>`
})
export class AppComponent {
  @ViewChild('checkbox') public checkbox!: CheckBoxComponent;

  focusCheckbox(): void {
    this.checkbox.focusIn();
  }

  clickCheckbox(): void {
    this.checkbox.click();
  }
}
```

**Available methods:**
| Method | Description |
|--------|-------------|
| `click()` | Programmatically toggles the checkbox (native click) |
| `focusIn()` | Sets focus on the checkbox |
| `destroy()` | Destroys the component and cleans up DOM/events |
