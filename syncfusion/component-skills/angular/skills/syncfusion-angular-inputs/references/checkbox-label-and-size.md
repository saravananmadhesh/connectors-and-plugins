# Label and Size — Syncfusion Angular CheckBox

## Table of Contents
- [Label](#label)
- [Label Position](#label-position)
- [Size Variants](#size-variants)

---

## Label

The `label` property defines the caption displayed next to the CheckBox. It eliminates the need for a separate `<label>` HTML element:

```typescript
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [CheckBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-checkbox label="Accept Terms and Conditions"></ejs-checkbox>`
})
export class AppComponent { }
```

**Default:** `''` (no label rendered)

---

## Label Position

Use the `labelPosition` property to place the label **before** or **after** the checkbox frame.

| Value | Description |
|-------|-------------|
| `'After'` | Label appears to the **right** (default) |
| `'Before'` | Label appears to the **left** |

```typescript
@Component({
  imports: [CheckBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <ul>
        <!-- Label on the left -->
        <li><ejs-checkbox label="Left Side Label" labelPosition="Before"></ejs-checkbox></li>

        <!-- Label on the right (default) -->
        <li><ejs-checkbox label="Right Side Label" [checked]="true"></ejs-checkbox></li>
      </ul>
    </div>`
})
export class AppComponent { }
```

> **Gotcha:** `labelPosition="Before"` physically places the label before the checkbox in the DOM, so tab order and screen readers follow the label first.

---

## Size Variants

The CheckBox comes in two sizes: **default** and **small**. Control size via the `cssClass` property:

| Size | `cssClass` value | Description |
|------|-----------------|-------------|
| Default | `''` (empty) | Standard size |
| Small | `'e-small'` | Reduced size checkbox |

```typescript
@Component({
  imports: [CheckBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <ul>
        <!-- Small CheckBox -->
        <li><ejs-checkbox label="Small" cssClass="e-small"></ejs-checkbox></li>

        <!-- Default CheckBox -->
        <li><ejs-checkbox label="Default"></ejs-checkbox></li>
      </ul>
    </div>`
})
export class AppComponent { }
```

> **Tip:** Combine size with other custom classes: `cssClass="e-small e-primary"` applies both small size and primary color.
