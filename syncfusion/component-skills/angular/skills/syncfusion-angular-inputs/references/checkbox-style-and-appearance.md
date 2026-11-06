# Style and Appearance — Syncfusion Angular CheckBox

## Table of Contents
- [Overview](#overview)
- [Color Variants](#color-variants)
- [Custom Frame Shape](#custom-frame-shape)
- [Custom Check Icon](#custom-check-icon)

---

## Overview

CheckBox appearance is customized using the `cssClass` property combined with CSS rules. Define custom CSS classes targeting the Syncfusion CheckBox elements and pass the class names via `cssClass`.

---

## Color Variants

Create themed checkboxes (primary, success, info, warning, danger) by defining CSS rules that override the background and border colors:

**Component template:**
```typescript
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [CheckBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <ul>
        <li><ejs-checkbox label="Primary" cssClass="e-primary" [checked]="true"></ejs-checkbox></li>
        <li><ejs-checkbox label="Success" cssClass="e-success" [checked]="true"></ejs-checkbox></li>
        <li><ejs-checkbox label="Info" cssClass="e-info" [checked]="true"></ejs-checkbox></li>
        <li><ejs-checkbox label="Warning" cssClass="e-warning" [checked]="true"></ejs-checkbox></li>
        <li><ejs-checkbox label="Danger" cssClass="e-danger" [checked]="true"></ejs-checkbox></li>
      </ul>
    </div>`
})
export class AppComponent { }
```

**styles.css — example CSS for color variants:**
```css
/* Primary */
.e-checkbox-wrapper.e-primary .e-frame.e-check,
.e-checkbox-wrapper.e-primary .e-frame:hover {
  background-color: #e3165b;
  border-color: #e3165b;
}

/* Success */
.e-checkbox-wrapper.e-success .e-frame.e-check,
.e-checkbox-wrapper.e-success .e-frame:hover {
  background-color: #4CAF50;
  border-color: #4CAF50;
}

/* Info */
.e-checkbox-wrapper.e-info .e-frame.e-check,
.e-checkbox-wrapper.e-info .e-frame:hover {
  background-color: #03A9F4;
  border-color: #03A9F4;
}

/* Warning */
.e-checkbox-wrapper.e-warning .e-frame.e-check,
.e-checkbox-wrapper.e-warning .e-frame:hover {
  background-color: #FF9800;
  border-color: #FF9800;
}

/* Danger */
.e-checkbox-wrapper.e-danger .e-frame.e-check,
.e-checkbox-wrapper.e-danger .e-frame:hover {
  background-color: #F44336;
  border-color: #F44336;
}
```

> **Tip:** Target `.e-checkbox-wrapper.{your-class} .e-frame` selectors to override the checkbox frame without affecting other components.

---

## Custom Frame Shape

Customize the checkbox frame shape by overriding the `border-radius` CSS property. The following example creates round (circular) checkboxes using an `e-custom` class:

**Component template:**
```typescript
@Component({
  imports: [CheckBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <ul>
        <li><ejs-checkbox label="Buy Groceries" cssClass="e-custom" [checked]="true"></ejs-checkbox></li>
        <li><ejs-checkbox label="Pay Rent" cssClass="e-custom"></ejs-checkbox></li>
        <li><ejs-checkbox label="Make Dinner" cssClass="e-custom"></ejs-checkbox></li>
        <li><ejs-checkbox label="Finish To-do List Article" cssClass="e-custom"></ejs-checkbox></li>
      </ul>
    </div>`
})
export class AppComponent { }
```

**styles.css — round frame:**
```css
.e-checkbox-wrapper.e-custom .e-frame {
  border-radius: 100%;
}

.e-checkbox-wrapper.e-custom .e-frame.e-check {
  background-color: #05b510;
  border-color: #05b510;
  border-radius: 100%;
}
```

> **Use case:** Round checkboxes work well for to-do lists and task management UIs.

---

## Custom Check Icon

Override the check icon appearance — including the icon content, background color, and border color — by targeting the `.e-check` pseudo-element. The following example uses an `e-checkicon` class:

**Component template:**
```typescript
@Component({
  imports: [CheckBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <ul>
        <li><ejs-checkbox label="Buy Groceries" cssClass="e-checkicon" [checked]="true"></ejs-checkbox></li>
        <li><ejs-checkbox label="Pay Rent" cssClass="e-checkicon"></ejs-checkbox></li>
        <li><ejs-checkbox label="Make Dinner" cssClass="e-checkicon"></ejs-checkbox></li>
        <li><ejs-checkbox label="Finish To-do List Article" cssClass="e-checkicon"></ejs-checkbox></li>
      </ul>
    </div>`
})
export class AppComponent { }
```

**styles.css — custom icon:**
```css
.e-checkbox-wrapper.e-checkicon .e-frame.e-check::before {
  content: '\e7ff';  /* Use any supported icon code */
}

.e-checkbox-wrapper.e-checkicon:hover .e-frame,
.e-checkbox-wrapper.e-checkicon .e-frame.e-check {
  background-color: #f44336;
  border-color: #f44336;
}
```

> **Tip:** You can use Syncfusion icon codes from the `e-icons` font or replace with Font Awesome / Material Icons by adjusting `font-family` and `content`.
