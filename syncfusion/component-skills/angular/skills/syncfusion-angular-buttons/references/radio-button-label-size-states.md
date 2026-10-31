# Labels, Sizes & States — Syncfusion Angular RadioButton

This reference covers how to configure RadioButton captions, placement, visual size, checked/unchecked state, disabled state, and state persistence.

---

## Label

Use the `label` property to set the caption text displayed alongside the RadioButton. This eliminates the need for a separate `<label>` element.

```typescript
<ejs-radiobutton label="Subscribe to newsletter" name="subscribe" value="yes"></ejs-radiobutton>
```

- **Type:** `string`
- **Default:** `''`

---

## Label Position

By default, the label appears **after** (to the right of) the RadioButton. Use `labelPosition` to move it **before** (to the left).

```typescript
<!-- Label on the left -->
<ejs-radiobutton label="Option A" name="pos" labelPosition="Before"></ejs-radiobutton>

<!-- Label on the right (default) -->
<ejs-radiobutton label="Option B" name="pos" labelPosition="After"></ejs-radiobutton>
```

- **Type:** `RadioLabelPosition` — `'Before'` | `'After'`
- **Default:** `'After'`

**Example with binding:**
```typescript
import { Component } from '@angular/core';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  standalone: true,
  imports: [RadioButtonModule],
  selector: 'app-root',
  template: `
    <ejs-radiobutton label="Before Label" name="pos" value="b" labelPosition="Before"></ejs-radiobutton>
    <ejs-radiobutton label="After Label"  name="pos" value="a" labelPosition="After"></ejs-radiobutton>
  `
})
export class AppComponent {}
```

---

## Size

The RadioButton comes in two sizes:
- **Default** — standard touch-friendly size
- **Small** — reduced size for dense layouts

Apply small size by adding `e-small` to the `cssClass` property:

```typescript
<!-- Default size -->
<ejs-radiobutton label="Default" name="sz" value="default"></ejs-radiobutton>

<!-- Small size -->
<ejs-radiobutton label="Small" name="sz" value="small" cssClass="e-small"></ejs-radiobutton>
```

You can combine `e-small` with other custom classes:
```typescript
<ejs-radiobutton label="Small Custom" name="sz" cssClass="e-small my-compact-radio"></ejs-radiobutton>
```

---

## Checked and Unchecked States

### Static Pre-selection

Set `[checked]="true"` to render a button in the checked state on load:

```typescript
<ejs-radiobutton label="Yes" name="confirm" value="yes" [checked]="true"></ejs-radiobutton>
<ejs-radiobutton label="No"  name="confirm" value="no"></ejs-radiobutton>
```

Only one button per `name` group can be checked at a time — setting `checked` on a second one will de-check the first.

### Dynamic State via Component Property

```typescript
@Component({
  standalone: true,
  imports: [RadioButtonModule],
  template: `
    <ejs-radiobutton label="Option A" name="g" value="a" [checked]="selected === 'a'"></ejs-radiobutton>
    <ejs-radiobutton label="Option B" name="g" value="b" [checked]="selected === 'b'"></ejs-radiobutton>
  `
})
export class AppComponent {
  selected = 'a';
}
```

For reactive binding, prefer `[(ngModel)]` — see [forms-and-binding.md](forms-and-binding.md).

---

## Disabled State

Set `[disabled]="true"` to prevent user interaction. Disabled RadioButtons are rendered visually greyed out and cannot be selected.

```typescript
<ejs-radiobutton label="Available"   name="plan" value="basic"    [checked]="true"></ejs-radiobutton>
<ejs-radiobutton label="Unavailable" name="plan" value="premium"  [disabled]="true"></ejs-radiobutton>
```

> **Form behavior:** Disabled RadioButtons — even if checked — do **not** submit their `value` on form submit.

### Toggling Disabled Programmatically

```typescript
@Component({
  standalone: true,
  imports: [RadioButtonModule],
  template: `
    <ejs-radiobutton label="Option" name="g" value="v" [disabled]="isLocked"></ejs-radiobutton>
    <button (click)="isLocked = !isLocked">Toggle Disabled</button>
  `
})
export class AppComponent {
  isLocked = false;
}
```

### Show Selected Value with change Event

```typescript
@Component({
  standalone: true,
  imports: [RadioButtonModule],
  template: `
    <ejs-radiobutton label="Option A" name="g" value="a" (change)="onSelect($event)"></ejs-radiobutton>
    <ejs-radiobutton label="Disabled" name="g" value="b" [disabled]="true"></ejs-radiobutton>
    <p>Selected: {{ selected }}</p>
  `
})
export class AppComponent {
  selected = '';
  onSelect(args: ChangeArgs): void {
    this.selected = args.value;
  }
}
```

---

## State Persistence

Enable `enablePersistence` to save and restore the checked state across page reloads using browser local storage.

```typescript
<ejs-radiobutton id="rb1" label="Persist Me" name="persist" value="v1" [enablePersistence]="true"></ejs-radiobutton>
```

> Assign a unique `id` attribute when using `enablePersistence` — the `id` is used as the local storage key.

---

## See Also

- [Forms & Data Binding](forms-and-binding.md)
- [Customization & Advanced](customization-and-advanced.md)
- [API Reference](api.md)
