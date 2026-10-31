# Types and Styles — Syncfusion Angular ButtonGroup

## Table of Contents
- [Outline ButtonGroup](#outline-buttongroup)
- [Color Styles](#color-styles)
- [Rounded Corner](#rounded-corner)
- [Icon Buttons](#icon-buttons)
- [Unsupported Types](#unsupported-types)

---

## Outline ButtonGroup

An outline ButtonGroup has transparent background with a visible border. To create one:
1. Add `e-outline` class to the **container** `div`
2. Add `cssClass='e-outline'` to **each** `ejs-button`

Both are required — the container class sets the group border, and the per-button `cssClass` applies the outline style to individual buttons.

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <div class='e-btn-group e-outline'>
        <button ejs-button cssClass='e-outline'>HTML</button>
        <button ejs-button cssClass='e-outline'>CSS</button>
        <button ejs-button cssClass='e-outline'>JavaScript</button>
      </div>
    </div>`
})
export class AppComponent { }
```

---

## Color Styles

Apply predefined color styles to individual buttons using the `cssClass` property. Mix and match within the same group:

| Class | Purpose |
|---|---|
| `e-primary` | Primary / main action |
| `e-success` | Positive / success action |
| `e-info` | Informative action |
| `e-warning` | Cautionary action |
| `e-danger` | Destructive / negative action |

**Example — mixed styles in one group:**

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <div class='e-btn-group'>
        <button ejs-button cssClass='e-info'>View</button>
        <button ejs-button>Edit</button>
        <button ejs-button cssClass='e-danger'>Delete</button>
      </div>
    </div>`
})
export class AppComponent { }
```

> These styles are **visual only**. Always include meaningful text labels so users of assistive technologies (screen readers) understand the button's purpose — do not rely on color alone.

---

## Rounded Corner

Add the `e-round-corner` class to the container `div` to give the group rounded edges on both ends:

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <div class='e-btn-group e-round-corner'>
        <button ejs-button>HTML</button>
        <button ejs-button>CSS</button>
        <button ejs-button>JavaScript</button>
      </div>
    </div>`
})
export class AppComponent { }
```

The `e-round-corner` class only needs to be on the container — no per-button class required.

---

## Icon Buttons

Use the `iconCss` property on each `ejs-button` to add an icon. The value maps to a CSS class that defines the icon via a `::before` pseudo-element with a Unicode content value.

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <div class='e-btn-group'>
        <button ejs-button iconCss='e-icons e-left-icon'>Left</button>
        <button ejs-button iconCss='e-icons e-middle-icon'>Right</button>
        <button ejs-button iconCss='e-icons e-right-icon'>Middle</button>
      </div>
    </div>`
})
export class AppComponent { }
```

**Required CSS for custom icons** (add to `styles.css`):
```css
.e-left-icon::before   { content: '\e33a'; }
.e-right-icon::before  { content: '\e34d'; }
.e-middle-icon::before { content: '\e35e'; }
```

Also include the splitbuttons and popups CSS imports alongside the base imports:
```css
@import 'node_modules/@syncfusion/ej2-base/styles/material.css';
@import 'node_modules/@syncfusion/ej2-buttons/styles/material.css';
@import 'node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
@import 'node_modules/@syncfusion/ej2-angular-popups/styles/material.css';
@import 'node_modules/@syncfusion/ej2-angular-splitbuttons/styles/material.css';
```

---

## Unsupported Types

ButtonGroup does **not** support the `flat` or `round` button types. Use the outline pattern (`e-outline`) or the rounded corner class (`e-round-corner`) instead for visual variation.
