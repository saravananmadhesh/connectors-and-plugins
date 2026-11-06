# How-To Patterns — Syncfusion Angular Button

## Table of Contents
- [Create a Block (Full-Width) Button](#create-a-block-full-width-button)
- [Create a Rounded-Corner Button](#create-a-rounded-corner-button)
- [Add a Navigation Link to a Button](#add-a-navigation-link-to-a-button)
- [Customize Button Appearance with CSS](#customize-button-appearance-with-css)
- [Style Native Input and Anchor Elements as Buttons](#style-native-input-and-anchor-elements-as-buttons)
- [Set the Disabled State](#set-the-disabled-state)
- [Enable Right-to-Left (RTL) Support](#enable-right-to-left-rtl-support)
- [Add a Tooltip on Hover](#add-a-tooltip-on-hover)
- [Implement a Repeat Button](#implement-a-repeat-button)

---

## Create a Block (Full-Width) Button

A block button spans the full width of its parent container. Set `cssClass` to `e-block`:

```typescript
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <button ejs-button cssClass="e-block">Block Button</button>
      <button ejs-button cssClass="e-block e-primary">Primary Block Button</button>
      <button ejs-button cssClass="e-block e-success">Success Block Button</button>
    </div>
  `
})
export class AppComponent { }
```

Combine `e-block` with any color style class using space-separated values in `cssClass`.

---

## Create a Rounded-Corner Button

Rounded corners are achieved by defining a custom CSS class with `border-radius` and applying it via `cssClass`:

```typescript
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  // Define .e-round-corner in your component styles or global styles.css
  template: `
    <div class="e-section-control">
      <button ejs-button cssClass="e-round-corner">Button</button>
    </div>
  `
})
export class AppComponent { }
```

CSS class definition:

```css
.e-round-corner {
  border-radius: 5px;
}
```

> This is different from `e-round` (which creates a fully circular button). `e-round-corner` just adds a subtle border radius to a regular button shape.

---

## Add a Navigation Link to a Button

Wrap an `<a>` tag with `href` inside the `<button>` element and apply `e-link` via `cssClass`:

```typescript
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <button ejs-button cssClass="e-link">
        <a href="https://www.google.com/" target="_blank">Go to Google</a>
      </button>
    </div>
  `
})
export class AppComponent { }
```

> For Angular navigation, use `[routerLink]` inside the `<a>` tag instead of `href`.

---

## Customize Button Appearance with CSS

Define a custom CSS class with your desired styles, and apply it via `cssClass`. The class targets button states: default, hover, focus, and active.

```typescript
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <!-- Apply your custom class via cssClass -->
      <button ejs-button cssClass="e-custom">Custom</button>
    </div>
  `
})
export class AppComponent { }
```

Example CSS (define in component `styles` or global `styles.css`):

```css
/* Default state */
.e-btn.e-custom {
  background-color: #4a148c;
  color: #fff;
  height: 36px;
  border-radius: 0;
  border: none;
}

/* Hover state */
.e-btn.e-custom:hover {
  background-color: #6a1cbc;
  color: #fff;
}

/* Focus state */
.e-btn.e-custom:focus {
  background-color: #4a148c;
  box-shadow: 0 0 0 2px #b39ddb;
}

/* Active state */
.e-btn.e-custom:active {
  background-color: #38006b;
  color: #fff;
}
```

> Always target `.e-btn.e-custom` (both classes together) to override Syncfusion's default button styles correctly.

---

## Style Native Input and Anchor Elements as Buttons

Apply `e-btn` plus a style class directly to `<input>` or `<a>` elements — no `ejs-button` directive needed:

```typescript
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <!-- Input styled as a link button -->
      <input type="button" value="Input Button" class="e-btn e-link">

      <!-- Anchor styled as a primary button -->
      <a class="e-btn e-primary" href="#">Go</a>
    </div>
  `
})
export class AppComponent { }
```

> Use this pattern when you need semantic HTML elements (for form submissions, anchors) with Syncfusion button styling.

---

## Set the Disabled State

Bind `[disabled]="true"` to prevent interaction. A disabled button cannot receive focus or trigger events:

```typescript
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <button ejs-button [disabled]="true">Disabled</button>
    </div>
  `
})
export class AppComponent { }
```

To toggle disabled state dynamically from the component class:

```typescript
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <button ejs-button [disabled]="isDisabled">Action</button>
    <button ejs-button (click)="toggleDisabled()">Toggle</button>
  `
})
export class AppComponent {
  isDisabled = false;

  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }
}
```

---

## Enable Right-to-Left (RTL) Support

Set `[enableRtl]="true"` to reverse the layout direction — useful for Arabic, Hebrew, and other RTL languages:

```typescript
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <button ejs-button iconCss="e-btn-icons e-setting-icon" [enableRtl]="true">Settings</button>
    </div>
  `
})
export class AppComponent { }
```

In RTL mode, the icon position flips: a left icon appears on the right in the visual layout.

---

## Add a Tooltip on Hover

Use the `created` event to set the native `title` attribute on the button element after rendering. The browser renders this as a native tooltip:

```typescript
import { ButtonModule, ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { Component, ViewChild } from '@angular/core';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <button #btn ejs-button [isPrimary]="true" (created)="onCreated()">Button</button>
    </div>
  `
})
export class AppComponent {
  @ViewChild('btn') private btn: ButtonComponent | any;

  onCreated() {
    this.btn.element.setAttribute('title', 'Primary Button');
  }
}
```

> For rich tooltip UI (HTML content, custom positioning), integrate the Syncfusion Tooltip component instead of relying on the native `title` attribute.

---

## Implement a Repeat Button

A repeat button fires click events at a regular interval while the button is held down, stopping when released. This is implemented via `mousedown`/`mouseup` (desktop) and `touchstart`/`touchend` (mobile) events with `setInterval`:

```typescript
import { ButtonModule, ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { Component, ViewChild } from '@angular/core';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <button #btn ejs-button
        (mousedown)="onMouseDown()"
        (mouseup)="onMouseUp()"
        (touchstart)="onTouchStart()"
        (touchend)="onTouchEnd()"
        (click)="onClick()">
        Hold Me
      </button>
      <p>Click count: {{ clickCount }}</p>
    </div>
  `
})
export class AppComponent {
  @ViewChild('btn') public btn: ButtonComponent | any;
  private timeout: any;
  clickCount = 0;

  onMouseDown() {
    this.timeout = setInterval(() => { this.clickCount++; }, 200);
  }

  onMouseUp() {
    clearInterval(this.timeout);
  }

  onTouchStart() {
    this.timeout = setInterval(() => { this.clickCount++; }, 200);
  }

  onTouchEnd() {
    clearInterval(this.timeout);
  }

  onClick() {
    this.clickCount++;
  }
}
```

> The interval delay (200ms above) controls how frequently the action fires while the button is held. Adjust to match your UX requirements.
