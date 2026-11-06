# Getting Started – Syncfusion Angular Floating Action Button

## Table of Contents
- [Prerequisites](#prerequisites)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Add CSS Reference](#add-css-reference)
- [Import FabModule](#import-fabmodule)
- [Basic FAB Component](#basic-fab-component)
- [Scoping FAB to a Container](#scoping-fab-to-a-container)
- [Click Event](#click-event)
- [Running the Application](#running-the-application)

---

## Prerequisites

- Angular 12+ (Angular 21 recommended; standalone components are the default from Angular 19+)
- Node.js and npm installed
- Angular CLI installed globally

```bash
npm install -g @angular/cli
```

---

## Dependencies

```
@syncfusion/ej2-angular-buttons
  └── @syncfusion/ej2-angular-base
  └── @syncfusion/ej2-buttons
        └── @syncfusion/ej2-base
```

---

## Installation

Use `ng add` to install the package and automatically configure the Material theme in `angular.json`:

```bash
ng add @syncfusion/ej2-angular-buttons
```

This command:
- Adds `@syncfusion/ej2-angular-buttons` and peer dependencies to `package.json`
- Imports the FAB module in your application
- Registers the default Syncfusion Material theme in `angular.json`

For manual installation:

```bash
npm install @syncfusion/ej2-angular-buttons --save
```

---

## Add CSS Reference

After `ng add`, Syncfusion's Material theme is registered automatically. To style only the FAB component, import the following in `styles.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/floating-action-button/index.css";
```

> Import order matters — base styles must come before component styles.

---

## Import FabModule

In a **standalone component** (Angular 19+, recommended):

```typescript
import { FabModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [FabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <button ejs-fab id="fab" content="Add"></button>
  `
})
export class AppComponent { }
```

In an **NgModule-based** application:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FabModule } from '@syncfusion/ej2-angular-buttons';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, FabModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

---

## Basic FAB Component

The simplest usage — render a FAB with a text label in the browser viewport:

```typescript
import { FabModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [FabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <button ejs-fab id="fab" content="Add"></button>
  `
})
export class AppComponent { }
```

FAB defaults to `BottomRight` of the viewport when no `target` is set.

---

## Scoping FAB to a Container

Use the `target` property to position the FAB relative to a specific container element. The target must have `position: relative`:

```typescript
import { FabModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [FabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative;min-height:350px;border:1px solid;"></div>
    <button ejs-fab id="fab" content="Add" target="#targetElement"></button>
  `
})
export class AppComponent { }
```

> If the target does not have `position: relative`, the FAB will be positioned relative to the nearest ancestor that does.

---

## Click Event

Use the `(click)` event binding to perform an action when the FAB is clicked:

```typescript
import { FabModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [FabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative;min-height:350px;border:1px solid;"></div>
    <button ejs-fab id="fab" iconCss="e-icons e-edit" content="Edit"
      (click)="onFabClick()" target="#targetElement"></button>
  `
})
export class AppComponent {
  onFabClick(): void {
    alert('Edit is clicked!');
  }
}
```

---

## Running the Application

```bash
ng serve
```

Open `http://localhost:4200` in a browser to see the FAB rendered in the bottom-right corner of the target container.
