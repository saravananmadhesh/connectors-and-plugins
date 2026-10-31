# Getting Started — Syncfusion Angular Toast

## Table of Contents
- [Prerequisites and Dependencies](#prerequisites-and-dependencies)
- [Installation](#installation)
- [Adding CSS Themes](#adding-css-themes)
- [Standalone Component Setup](#standalone-component-setup)
- [NgModule Setup](#ngmodule-setup)
- [Showing a Toast](#showing-a-toast)
- [Running the Application](#running-the-application)

---

## Prerequisites and Dependencies

**Angular version:** Angular 12+ (Ivy). Angular 19+ uses standalone components by default.

**Package dependencies tree:**
```
@syncfusion/ej2-angular-notifications
  ├── @syncfusion/ej2-angular-base
  └── @syncfusion/ej2-notifications
        ├── @syncfusion/ej2-base
        ├── @syncfusion/ej2-button
        └── @syncfusion/ej2-popups
```

---

## Installation

The recommended installation method uses the Angular CLI `ng add` command, which automatically installs the package, registers components, and sets up the default Material3 theme:

```bash
ng add @syncfusion/ej2-angular-notifications
```

This command:
- Adds `@syncfusion/ej2-angular-notifications` and peer dependencies to `package.json`
- Registers the default Syncfusion Material3 theme in `angular.json`

**Manual install (alternative):**
```bash
npm install @syncfusion/ej2-angular-notifications
```

---

## Adding CSS Themes

When using `ng add`, the Material3 theme is added automatically. For manual setup or custom themes, add the CSS imports to `styles.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/toast/index.css";
```

> **Import order matters.** Toast depends on base, buttons, and popups styles. Always import them in this sequence.

**Available themes:** `material3`, `material3-dark`, `bootstrap5`, `bootstrap5-dark`, `tailwind`, `tailwind-dark`, `fluent`, `fluent-dark`, `fabric`, `highcontrast`

Replace `material3` with your chosen theme name for all four imports.

---

## Standalone Component Setup

Angular 19+ uses standalone components by default. Import `ToastModule` directly into your component:

```typescript
// src/app/app.ts
import { Component, ViewChild } from '@angular/core';
import { ToastModule, ToastComponent } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [ToastModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-toast #toast (created)="onCreated()">
      <ng-template #title>
        <div>Sample Toast Title</div>
      </ng-template>
      <ng-template #content>
        <div>Sample Toast Content</div>
      </ng-template>
    </ejs-toast>
  `
})
export class App {
  @ViewChild('toast') toast!: ToastComponent;

  onCreated(): void {
    this.toast.show();
  }
}
```

```typescript
// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import 'zone.js';
bootstrapApplication(App).catch((err) => console.error(err));
```

---

## NgModule Setup

For older Angular projects using NgModule:

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ToastModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

```typescript
// app.component.ts
import { Component, ViewChild } from '@angular/core';
import { ToastComponent } from '@syncfusion/ej2-angular-notifications';

@Component({
  selector: 'app-root',
  template: `
    <ejs-toast #toast (created)="onCreated()">
      <ng-template #title><div>Hello</div></ng-template>
      <ng-template #content><div>Welcome to Syncfusion Toast</div></ng-template>
    </ejs-toast>
  `
})
export class AppComponent {
  @ViewChild('toast') toast!: ToastComponent;

  onCreated(): void {
    this.toast.show();
  }
}
```

---

## Showing a Toast

The toast element must exist in the DOM before calling `show()`. The `(created)` event fires after the component initializes — this is the right place to auto-show a toast.

**Show immediately on load:**
```typescript
(created)="toastObj.show()"
```

**Show on user action (button click):**
```typescript
public showToast(): void {
  this.toast.show();
}
```
```html
<button (click)="showToast()">Show Notification</button>
<ejs-toast #toast [title]="'Alert'" [content]="'Action completed.'"></ejs-toast>
```

**Pass properties inline via `show()`:**
```typescript
this.toast.show({ title: 'Success', content: 'Record saved.', cssClass: 'e-toast-success' });
```

**Hide all visible toasts:**
```typescript
this.toast.hide('All');
```

---

## Running the Application

```bash
ng serve
```

Open `http://localhost:4200` in your browser. The toast will appear briefly then auto-dismiss after 5 seconds (default `timeOut`).

> **Angular version note:** Angular 20+ uses `app.ts`/`app.html` (no `.component.` suffix). Angular 19 and below uses `app.component.ts`/`app.component.html`. Both are functionally equivalent for Syncfusion components.

## See Also
- [Configuration](./configuration.md) — Title, content, close button, progress bar
- [API Reference](./api.md) — Full property and method list
