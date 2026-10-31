# Customization & Advanced Features — Syncfusion Angular RadioButton

## Table of Contents
- [Custom CSS with cssClass](#custom-css-with-cssclass)
- [Custom Appearance (Color Variants)](#custom-appearance-color-variants)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
- [HTML Attributes](#html-attributes)
- [HTML Sanitizer](#html-sanitizer)
- [Locale and Globalization](#locale-and-globalization)
- [Methods](#methods)

---

## Custom CSS with cssClass

Use the `cssClass` property to apply one or more CSS classes to the RadioButton element. This is the primary way to override default styles.

```typescript
<ejs-radiobutton label="Custom Style" name="g" cssClass="my-radio"></ejs-radiobutton>
```

Combine multiple classes with spaces:
```typescript
<ejs-radiobutton label="Small Danger" name="g" cssClass="e-small e-danger-radio"></ejs-radiobutton>
```

Built-in utility class:
- `e-small` — renders the RadioButton at reduced size

---

## Custom Appearance (Color Variants)

You can replicate Bootstrap-style semantic colors (primary, success, warning, danger, info) by combining `cssClass` with custom CSS rules that target the Syncfusion RadioButton's internal elements.

### Component Template

```typescript
import { Component } from '@angular/core';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  standalone: true,
  imports: [RadioButtonModule],
  selector: 'app-root',
  styleUrls: ['./app.css'],
  template: `
    <ejs-radiobutton label="Primary" name="style" value="primary" cssClass="e-primary" [checked]="true"></ejs-radiobutton>
    <ejs-radiobutton label="Success" name="style" value="success" cssClass="e-success"></ejs-radiobutton>
    <ejs-radiobutton label="Warning" name="style" value="warning" cssClass="e-warning"></ejs-radiobutton>
    <ejs-radiobutton label="Danger"  name="style" value="danger"  cssClass="e-danger"></ejs-radiobutton>
    <ejs-radiobutton label="Info"    name="style" value="info"    cssClass="e-info"></ejs-radiobutton>
  `
})
export class AppComponent {}
```

### styles.css / app.css

```css
/* Primary */
.e-radio-wrapper.e-primary .e-radio:checked + label::before {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

/* Success */
.e-radio-wrapper.e-success .e-radio:checked + label::before {
  background-color: #198754;
  border-color: #198754;
}

/* Warning */
.e-radio-wrapper.e-warning .e-radio:checked + label::before {
  background-color: #ffc107;
  border-color: #ffc107;
}

/* Danger */
.e-radio-wrapper.e-danger .e-radio:checked + label::before {
  background-color: #dc3545;
  border-color: #dc3545;
}

/* Info */
.e-radio-wrapper.e-info .e-radio:checked + label::before {
  background-color: #0dcaf0;
  border-color: #0dcaf0;
}
```

> The `cssClass` value is applied to the `.e-radio-wrapper` container. Target child elements using descendant CSS selectors.

---

## Right-to-Left (RTL) Support

Set `[enableRtl]="true"` to render the RadioButton in a right-to-left layout. The label and radio circle are mirrored to support RTL languages like Arabic and Hebrew.

```typescript
import { Component } from '@angular/core';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  standalone: true,
  imports: [RadioButtonModule],
  selector: 'app-root',
  template: `
    <ejs-radiobutton label="RTL Option A" name="rtl" value="a" [enableRtl]="true" [checked]="true"></ejs-radiobutton>
    <ejs-radiobutton label="RTL Option B" name="rtl" value="b" [enableRtl]="true"></ejs-radiobutton>
  `
})
export class AppComponent {}
```

- **Type:** `boolean`
- **Default:** `false`
- Can be applied globally via Syncfusion's `L10n` configuration if all components in the app need RTL.

---

## HTML Attributes

Use `htmlAttributes` to pass additional HTML attributes — such as `aria-*`, `data-*`, or `tabindex` — directly to the underlying `<input>` element.

```typescript
@Component({
  standalone: true,
  imports: [RadioButtonModule],
  template: `
    <ejs-radiobutton
      label="Accessible Option"
      name="a11y"
      value="opt1"
      [htmlAttributes]="rbAttributes">
    </ejs-radiobutton>
  `
})
export class AppComponent {
  rbAttributes: { [key: string]: string } = {
    'aria-label': 'Accessible radio option',
    'data-testid': 'radio-opt1',
    'tabindex': '0'
  };
}
```

- **Type:** `{ [key: string]: string }`
- **Default:** `{}`
- If a property is set both via `htmlAttributes` and a component property (e.g., `disabled`), the **component property takes precedence**.

---

## HTML Sanitizer

By default, `enableHtmlSanitizer` is `true`, which means any untrusted HTML in the `label` value is sanitized before rendering — preventing XSS attacks.

```typescript
<!-- Safe: label is plain text, sanitizer has no effect -->
<ejs-radiobutton label="Normal Label" name="g" value="v"></ejs-radiobutton>

<!-- If label contains HTML, it will be sanitized by default -->
<ejs-radiobutton [label]="untrustedLabel" name="g" value="v"></ejs-radiobutton>

<!-- Disable sanitizer only if you fully trust the HTML source -->
<ejs-radiobutton [label]="trustedHtml" name="g" value="v" [enableHtmlSanitizer]="false"></ejs-radiobutton>
```

- **Type:** `boolean`
- **Default:** `true`
- Leave as `true` in production unless you control all label content.

---

## Locale and Globalization

The `locale` property overrides the global culture for this component instance. Useful when individual components need a different locale than the app default.

```typescript
<ejs-radiobutton label="Localized" name="g" value="v" locale="fr-FR"></ejs-radiobutton>
```

- **Type:** `string`
- **Default:** `''` (inherits the global `'en-US'` culture)

For app-wide locale changes, configure Syncfusion's `L10n`:

```typescript
import { L10n } from '@syncfusion/ej2-base';
L10n.load({ 'fr-FR': { /* locale strings */ } });
```

---

## Methods

Access methods via a `@ViewChild` reference to the `RadioButtonComponent`.

### getSelectedValue()

Returns the `value` of the currently selected RadioButton **in the same name group**.

```typescript
import { Component, ViewChild } from '@angular/core';
import { RadioButtonModule, RadioButtonComponent } from '@syncfusion/ej2-angular-buttons';

@Component({
  standalone: true,
  imports: [RadioButtonModule],
  template: `
    <ejs-radiobutton #rb label="Option A" name="g" value="a" [checked]="true"></ejs-radiobutton>
    <ejs-radiobutton       label="Option B" name="g" value="b"></ejs-radiobutton>
    <button (click)="showSelected()">Get Selected</button>
    <p>{{ result }}</p>
  `
})
export class AppComponent {
  @ViewChild('rb') rb!: RadioButtonComponent;
  result = '';

  showSelected(): void {
    this.result = this.rb.getSelectedValue();  // Returns 'a' or 'b'
  }
}
```

### focusIn()

Sets keyboard focus on the RadioButton element. The user can then press arrow keys to navigate and select.

```typescript
this.rb.focusIn();
```

### click()

Simulates a native click on the RadioButton — checks it if unchecked. Fires the `change` event.

```typescript
this.rb.click();
```

### destroy()

Destroys the RadioButton widget — removes event listeners and cleans up DOM references.

```typescript
this.rb.destroy();
```

> Angular manages component lifecycle automatically via `ngOnDestroy`. Only call `destroy()` explicitly in non-Angular or manual rendering contexts.

---

## See Also

- [Label, Size & States](label-size-states.md)
- [Accessibility](accessibility.md)
- [API Reference](api.md)
