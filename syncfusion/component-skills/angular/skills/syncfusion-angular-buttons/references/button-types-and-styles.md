# Types and Styles — Syncfusion Angular Button

## Table of Contents
- [Button Styles (Color Classes)](#button-styles-color-classes)
- [Basic HTML Button Types](#basic-html-button-types)
- [Flat Button](#flat-button)
- [Outline Button](#outline-button)
- [Round Button](#round-button)
- [Toggle Button](#toggle-button)
- [Icons](#icons)
  - [Font Icons](#font-icons)
  - [SVG Icons](#svg-icons)
- [Button Size](#button-size)

---

## Button Styles (Color Classes)

Apply predefined styles using the `cssClass` property:

| Class | Purpose |
|---|---|
| `e-primary` | Primary action |
| `e-success` | Positive/success action |
| `e-info` | Informational action |
| `e-warning` | Cautionary action |
| `e-danger` | Negative/destructive action |
| `e-link` | Appears as a hyperlink |

```typescript
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <button ejs-button cssClass="e-primary">Primary</button>
      <button ejs-button cssClass="e-success">Success</button>
      <button ejs-button cssClass="e-info">Info</button>
      <button ejs-button cssClass="e-warning">Warning</button>
      <button ejs-button cssClass="e-danger">Danger</button>
      <button ejs-button cssClass="e-link">Link</button>
    </div>
  `
})
export class AppComponent { }
```

> Color styles are visual only. For accessibility, ensure the button's text or `aria-label` communicates intent to screen reader users — do not rely solely on color.

> **Alternative for primary:** Setting `[isPrimary]="true"` is equivalent to `cssClass="e-primary"`. Prefer `cssClass` for consistency with other color styles.

---

## Basic HTML Button Types

Use the standard HTML `type` attribute for form buttons:

| Type | Purpose |
|---|---|
| `button` | Default — triggers click event |
| `submit` | Submits the parent form |
| `reset` | Resets all form controls to initial values |

```typescript
@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <form>
        <button type="submit" ejs-button>Submit</button>
        <button type="reset" ejs-button>Reset</button>
      </form>
    </div>
  `
})
export class AppComponent { }
```

---

## Flat Button

A flat button has no background. Set `cssClass` to `e-flat`:

```html
<button ejs-button cssClass="e-flat">Flat</button>
```

---

## Outline Button

An outline button has a border with a transparent background. Set `cssClass` to `e-outline`:

```html
<button ejs-button cssClass="e-outline">Outline</button>
```

---

## Round Button

A round button is circular, typically icon-only. Set `cssClass` to `e-round` and provide an icon via `iconCss`. Use `[isPrimary]="true"` for the filled appearance:

```typescript
@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <button ejs-button cssClass="e-flat">Flat</button>
      <button ejs-button cssClass="e-outline">Outline</button>
      <!-- e-icons is the Syncfusion built-in icon class; e-plus is a custom icon -->
      <button ejs-button cssClass="e-round" iconCss="e-icons e-plus" [isPrimary]="true"></button>
    </div>
  `
})
export class AppComponent { }
```

---

## Toggle Button

A toggle button switches between a normal and active state on each click. The active state is indicated by the `e-active` CSS class applied to the element.

- Set `[isToggle]="true"` to enable toggle behavior
- Handle state changes in the click event

```typescript
import { ButtonModule, ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { Component, ViewChild, HostListener } from '@angular/core';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <button #togglebtn ejs-button cssClass="e-flat" iconCss="e-icons e-play"
        [isToggle]="true" content="Play"></button>
    </div>
  `
})
export class AppComponent {
  @ViewChild('togglebtn') togglebtn: ButtonComponent | any;

  @HostListener('click', ['togglebtn'])
  btnClick() {
    if (this.togglebtn.element.classList.contains('e-active')) {
      this.togglebtn.content = 'Pause';
      this.togglebtn.iconCss = 'e-icons e-pause';
    } else {
      this.togglebtn.content = 'Play';
      this.togglebtn.iconCss = 'e-icons e-play';
    }
  }
}
```

---

## Icons

### Font Icons

Use the `iconCss` property to specify icon CSS classes. By default, icons appear to the **left** of text. Use `iconPosition` to move them right:

```typescript
@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <!-- Icon on the left (default) -->
      <button ejs-button iconCss="e-icons e-play">Previous</button>

      <!-- Icon on the right -->
      <button ejs-button iconCss="e-icons e-pause" iconPosition="Right">Stop</button>
    </div>
  `
})
export class AppComponent { }
```

`iconPosition` accepts: `"Left"` (default) | `"Right"`

> Syncfusion provides built-in icons via the `e-icons` class. Third-party icon libraries (FontAwesome, Material Icons, etc.) are also supported through `iconCss`.

### SVG Icons

SVG images can be embedded using `iconCss` with a custom class that sets `background-image` or inline SVG via CSS:

```typescript
@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  // styleUrls points to CSS defining .e-search-icon with SVG background
  template: `
    <div class="e-section-control">
      <button ejs-button iconCss="e-search-icon"></button>
    </div>
  `
})
export class AppComponent { }
```

In your stylesheet, define the icon:

```css
.e-search-icon::before {
  content: url('path/to/search.svg');
  height: 16px;
  width: 16px;
}
```

---

## Button Size

Two sizes are available: **normal** (default) and **small**.

Set `cssClass` to `e-small` to render a smaller button:

```typescript
@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <button ejs-button cssClass="e-small">Small</button>
      <button ejs-button>Normal</button>
    </div>
  `
})
export class AppComponent { }
```

Combine size with style classes using space-separated values:

```html
<button ejs-button cssClass="e-small e-primary">Small Primary</button>
<button ejs-button cssClass="e-small e-outline">Small Outline</button>
```
