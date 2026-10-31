# Getting Started — Syncfusion Angular RadioButton

This guide walks through setting up and rendering the Syncfusion Angular RadioButton component from scratch.

---

## Prerequisites

Ensure your environment meets the [Syncfusion Angular system requirements](https://ej2.syncfusion.com/angular/documentation/system-requirement).

Required Node.js and Angular CLI must be installed. Supports Angular 12+ (Ivy); Angular 19+ uses standalone components by default.

---

## Dependencies

```
|-- @syncfusion/ej2-angular-buttons
    |-- @syncfusion/ej2-angular-base
    |-- @syncfusion/ej2-buttons
        |-- @syncfusion/ej2-base
```

---

## Step 1: Create Angular Application

```bash
npm install -g @angular/cli
ng new syncfusion-angular-app
cd syncfusion-angular-app
```

> Angular 20+ generates `src/app/app.ts`, `app.html`, `app.css` (no `.component.` suffixes).  
> Angular 19 and below uses `app.component.ts`, `app.component.html`.

---

## Step 2: Install Syncfusion RadioButton Package

```bash
ng add @syncfusion/ej2-angular-buttons
```

This command automatically:
- Adds `@syncfusion/ej2-angular-buttons` and peer dependencies to `package.json`
- Imports the RadioButton module in your app
- Registers the default Material3 theme in `angular.json`

For legacy (non-Ivy) builds targeting Angular 15 and below:

```bash
npm add @syncfusion/ej2-angular-buttons@32.1.19-ngcc
```

---

## Step 3: Add CSS Theme

The Material3 theme is added automatically by `ng add`. To control imports explicitly, add to `styles.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/radio-button/index.css";
```

> Import order matters — `ej2-base` styles must come before `ej2-buttons`.

For SCSS projects, use `.scss` equivalents and configure `angular.json` to use SCSS.

---

## Step 4: Add RadioButton to Your Component

### Angular 19+ Standalone (recommended)

```typescript
// src/app/app.ts
import { Component } from '@angular/core';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  standalone: true,
  imports: [RadioButtonModule],
  selector: 'app-root',
  template: `
    <ejs-radiobutton label="Option A" name="group1" value="a" [checked]="true"></ejs-radiobutton>
    <ejs-radiobutton label="Option B" name="group1" value="b"></ejs-radiobutton>
  `
})
export class AppComponent {}
```

### Angular 18 and Below (NgModule)

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RadioButtonModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ejs-radiobutton label="Option A" name="group1" value="a" [checked]="true"></ejs-radiobutton>
    <ejs-radiobutton label="Option B" name="group1" value="b"></ejs-radiobutton>
  `
})
export class AppComponent {}
```

---

## Step 5: Run the Application

```bash
ng serve
```

Open `http://localhost:4200` in your browser. You should see two radio buttons with "Option A" pre-selected.

---

## Change the RadioButton State

Use the `checked` property to pre-select a button at render time:

```typescript
<ejs-radiobutton label="Checked" name="demo" [checked]="true"></ejs-radiobutton>
<ejs-radiobutton label="Unchecked" name="demo"></ejs-radiobutton>
```

The `checked` property also works with two-way binding via `[(ngModel)]`. See [forms-and-binding.md](forms-and-binding.md) for details.

---

## Minimal Working Example

```typescript
import { Component } from '@angular/core';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ChangeArgs } from '@syncfusion/ej2-angular-buttons';

@Component({
  standalone: true,
  imports: [RadioButtonModule],
  selector: 'app-root',
  template: `
    <ejs-radiobutton label="Male"   name="gender" value="male"   [checked]="true" (change)="onGenderChange($event)"></ejs-radiobutton>
    <ejs-radiobutton label="Female" name="gender" value="female" (change)="onGenderChange($event)"></ejs-radiobutton>
  `
})
export class AppComponent {
  onGenderChange(args: ChangeArgs): void {
    console.log('Selected:', args.value);
  }
}
```

> `ChangeArgs.value` holds the `value` attribute of the newly checked RadioButton.

---

## See Also

- [Label, Size & States](label-size-states.md)
- [Forms & Data Binding](forms-and-binding.md)
- [API Reference](api.md)
