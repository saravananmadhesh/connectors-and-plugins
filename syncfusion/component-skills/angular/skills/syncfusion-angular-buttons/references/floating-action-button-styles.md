# Styles and Appearance – Syncfusion Angular Floating Action Button

## Table of Contents
- [Predefined Styles](#predefined-styles)
- [CSS Class Overrides](#css-class-overrides)
- [Show Text on Hover](#show-text-on-hover)
- [Outline Color Customization](#outline-color-customization)
- [Theme Studio](#theme-studio)

---

## Predefined Styles

Apply predefined styles via the `cssClass` property to change the FAB's visual representation:

| `cssClass` | Description |
|------------|-------------|
| `e-primary` | Primary action (default style) |
| `e-outline` | Outlined button appearance |
| `e-info` | Informative action |
| `e-success` | Positive/success action |
| `e-warning` | Action requiring caution |
| `e-danger` | Negative/destructive action |

```typescript
import { FabModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [FabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative;min-height:350px;border:1px solid;"></div>
    <!-- Warning style FAB -->
    <button ejs-fab id="fab" iconCss="e-icons e-edit" cssClass="e-warning" target="#targetElement"></button>
  `
})
export class AppComponent { }
```

> Predefined styles are **visual only**. Use the `content` property to describe the FAB's purpose for assistive technologies (screen readers).

---

## CSS Class Overrides

Customize the FAB's appearance by overriding its default CSS classes:

| CSS Class | Purpose |
|-----------|---------|
| `.e-fab.e-btn` | Base FAB styles |
| `.e-fab.e-btn:hover` | FAB on hover |
| `.e-fab.e-btn:focus` | FAB on focus |
| `.e-fab.e-btn:active` | FAB on active/press |
| `.e-fab.e-btn-icon` | FAB icon styles |

Example — change the background color:

```css
/* styles.css */
.e-fab.e-btn {
  background-color: #6200ea;
  border-color: #6200ea;
}

.e-fab.e-btn:hover {
  background-color: #3700b3;
  border-color: #3700b3;
}
```

---

## Show Text on Hover

Use `cssClass` to apply a custom class that reveals the FAB's text label on hover with a CSS transition effect. The `content` property accepts HTML when `enableHtmlSanitizer` is `false`, but standard text works fine with sanitization enabled.

```typescript
import { FabModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [FabModule],
  standalone: true,
  selector: 'app-root',
  styles: [`
    .fab-hover .e-btn-content { overflow: hidden; max-width: 0; transition: max-width 0.3s ease; }
    .fab-hover:hover .e-btn-content { max-width: 100px; }
  `],
  template: `
    <div id="targetElement" style="position:relative;min-height:350px;border:1px solid;"></div>
    <button ejs-fab id="fab" iconCss="e-icons e-edit"
      content="<span class='text-container'><span class='textEle'>Edit</span></span>"
      cssClass="fab-hover" target="#targetElement"></button>
  `
})
export class AppComponent { }
```

> The `content` value renders consistently whether `enableHtmlSanitizer` is enabled or disabled, as long as only valid HTML tags are used.

---

## Outline Color Customization

Use `cssClass` with a custom CSS class to change the outline border color of the FAB:

```typescript
import { FabModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [FabModule],
  standalone: true,
  selector: 'app-root',
  styles: [`
    .custom-css.e-fab.e-btn {
      border-color: #6200ea;
      color: #6200ea;
    }
    .custom-css.e-fab.e-btn:hover {
      border-color: #3700b3;
      color: #3700b3;
    }
  `],
  template: `
    <div id="targetElement" style="position:relative;min-height:350px;border:1px solid;"></div>
    <button ejs-fab id="fab" iconCss="e-icons e-people" content="Contact"
      cssClass="custom-css e-outline" target="#targetElement"></button>
  `
})
export class AppComponent { }
```

---

## Theme Studio

Use [Syncfusion Theme Studio](https://ej2.syncfusion.com/themestudio/?theme=fluent) to generate a fully customized theme for all Syncfusion components, including the FAB. Export the generated CSS and import it in `styles.css`.
