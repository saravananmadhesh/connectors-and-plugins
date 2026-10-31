# Customization — Syncfusion Angular Switch

## Table of Contents
- [cssClass Property](#cssclass-property)
- [Customize Bar and Handle Shape](#customize-bar-and-handle-shape)
- [Custom Bar Colors (ON / OFF)](#custom-bar-colors-on--off)
- [Enable Ripple Effect for Labels](#enable-ripple-effect-for-labels)
- [htmlAttributes — Extra HTML Attributes](#htmlattributes--extra-html-attributes)

---

## cssClass Property

Use the `cssClass` property to apply one or more CSS classes to the Switch's root element. This is the primary hook for custom styling.

```html
<ejs-switch cssClass="my-switch"></ejs-switch>
```

```css
/* Target the Switch bar */
.my-switch .e-switch-inner { background-color: #4caf50; }

/* Target the handle */
.my-switch .e-switch-handle { background-color: white; }
```

Multiple classes are space-separated:
```html
<ejs-switch cssClass="e-small my-custom-theme"></ejs-switch>
```

**Key CSS selectors inside a Switch:**
| Selector | Element |
|---|---|
| `.e-switch-wrapper` | Outer wrapper |
| `.e-switch-inner` | The bar (track) |
| `.e-switch-handle` | The circular handle |
| `.e-switch-on` | Bar in ON (checked) state |
| `.e-switch-off` | Bar in OFF (unchecked) state |

---

## Customize Bar and Handle Shape

To change the default rounded/pill shape to a square (or any custom shape), override `border-radius` via `cssClass`:

```html
<ejs-switch cssClass="square-switch" [checked]="true"></ejs-switch>
```

```css
/* Square bar */
.square-switch .e-switch-inner,
.square-switch .e-switch-inner.e-switch-on {
  border-radius: 0;
}

/* Square handle */
.square-switch .e-switch-handle {
  border-radius: 0;
}
```

**Rounded rectangle (softer corners):**
```css
.rounded-switch .e-switch-inner { border-radius: 4px; }
.rounded-switch .e-switch-handle { border-radius: 2px; }
```

---

## Custom Bar Colors (ON / OFF)

Override the Switch bar's background and border colors for both ON and OFF states:

```html
<ejs-switch cssClass="custom-color-switch" [checked]="false"></ejs-switch>
```

```css
/* OFF state: custom color */
.custom-color-switch .e-switch-inner.e-switch-off {
  background-color: #f44336;
  border-color: #f44336;
}

/* ON state: custom color */
.custom-color-switch .e-switch-inner.e-switch-on {
  background-color: #4caf50;
  border-color: #4caf50;
}
```

**Contextual colors example (danger → success):**
```css
.danger-success .e-switch-inner.e-switch-off {
  background-color: #e53935;
  border-color: #e53935;
}
.danger-success .e-switch-inner.e-switch-on {
  background-color: #43a047;
  border-color: #43a047;
}
```

```html
<ejs-switch cssClass="danger-success" [checked]="true"></ejs-switch>
```

---

## Enable Ripple Effect for Labels

By default, Switch labels do not have a ripple (click wave) effect. Add ripple using Syncfusion's `rippleMouseHandler` utility from `@syncfusion/ej2-base`.

```typescript
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { rippleMouseHandler } from '@syncfusion/ej2-base';

@Component({
  standalone: true,
  imports: [SwitchModule],
  selector: 'app-root',
  template: `
    <label #labelRef class="e-switch-label">
      <ejs-switch [checked]="false"></ejs-switch>
      <span>Enable Feature</span>
    </label>
  `
})
export class AppComponent implements AfterViewInit {
  @ViewChild('labelRef') labelRef!: ElementRef;

  ngAfterViewInit(): void {
    const labelEl = this.labelRef.nativeElement;
    labelEl.addEventListener('mouseup', (e: MouseEvent) => {
      rippleMouseHandler(e, labelEl);
    });
  }
}
```

```css
.e-switch-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
```

---

## htmlAttributes — Extra HTML Attributes

Pass additional HTML attributes (such as `aria-label`, `data-*`, `tabindex`) directly to the Switch's underlying `<input>` element using the `htmlAttributes` property.

```html
<ejs-switch [htmlAttributes]="switchAttributes"></ejs-switch>
```

```typescript
export class AppComponent {
  switchAttributes: { [key: string]: string } = {
    'aria-label': 'Dark mode toggle',
    'data-testid': 'dark-mode-switch',
    'tabindex': '1'
  };
}
```

> If the same attribute is set via both `htmlAttributes` and a dedicated property (e.g., `disabled`), the **component property takes precedence** over `htmlAttributes`.

**Inline example:**
```html
<ejs-switch [htmlAttributes]="{'aria-label': 'Wi-Fi toggle', 'data-id': 'wifi'}">
</ejs-switch>
```
