# Getting Started — Angular OTP Input

## Overview

The Syncfusion Angular OTP Input (`ejs-otpinput`) renders a series of individual input boxes for one-time password and verification code entry. It supports auto-focus, clipboard paste, keyboard navigation, and input masking out of the box.

---

## Dependencies

```
|-- @syncfusion/ej2-angular-inputs
    |-- @syncfusion/ej2-angular-base
    |-- @syncfusion/ej2-base
    |-- @syncfusion/ej2-inputs
```

---

## Installation

Use the Angular CLI `ng add` command to install and auto-configure the package:

```bash
ng add @syncfusion/ej2-angular-inputs
```

This command:
- Adds `@syncfusion/ej2-angular-inputs` and peer dependencies to `package.json`
- Registers the default Syncfusion Material theme in `angular.json`

For manual npm installation:

```bash
npm install @syncfusion/ej2-angular-inputs
```

> **Angular version note:** Angular 19+ uses standalone components by default. Angular 18 and below use NgModule-based architecture. Both are supported.

---

## Import CSS Styles

Add the following to `styles.css` (or `styles.scss`):

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/otp-input/index.css";
```

Other available themes: `bootstrap5`, `tailwind`, `fluent2`, `highcontrast`. Import order matters — base styles before component styles.

---

## Basic Setup — Angular Standalone (Angular 19+)

```typescript
// app.ts
import { Component } from '@angular/core';
import { OtpInputModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [OtpInputModule],
  selector: 'app-root',
  template: `
    <div id="otp-container" style="width: 350px;">
      <div ejs-otpinput id="otpinput"></div>
    </div>
  `
})
export class AppComponent { }
```

```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app';
import 'zone.js';

bootstrapApplication(AppComponent).catch(err => console.error(err));
```

---

## Basic Setup — NgModule Architecture (Angular 12–18)

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OtpInputModule } from '@syncfusion/ej2-angular-inputs';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, OtpInputModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div id="otp-container" style="width: 350px;">
      <div ejs-otpinput id="otpinput"></div>
    </div>
  `
})
export class AppComponent { }
```

---

## Auto Focus on Load

Use the `autoFocus` property to move focus to the first OTP field automatically when the page loads. Ideal for dedicated OTP entry screens.

```html
<div ejs-otpinput id="otpinput" [autoFocus]="true"></div>
```

> Default: `false`. Only set to `true` when the OTP input is the primary action on the page to avoid disrupting general page navigation.

---

## Pre-filling the OTP Value

Use the `value` property to populate OTP fields programmatically (e.g., from a deep link or query parameter):

```typescript
@Component({
  standalone: true,
  imports: [OtpInputModule],
  selector: 'app-root',
  template: `
    <div ejs-otpinput id="otpinput" [length]="6" [value]="prefillValue"></div>
  `
})
export class AppComponent {
  public prefillValue: string = '123456';
}
```

---

## Run the Application

```bash
ng serve
```

Navigate to `http://localhost:4200` to see the OTP Input component rendered with the default 4-field layout.

---

## See Also

- [Input Types & Value](./input-types-and-value.md) — Number, text, password, textTransform
- [Appearance](./appearance.md) — Length, styling modes, separator, placeholder
- [Events](./events.md) — Handle OTP completion and field focus
