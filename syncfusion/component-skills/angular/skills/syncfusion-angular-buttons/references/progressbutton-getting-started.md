# Getting Started — Angular ProgressButton

## Prerequisites

- Angular 12+ (Ivy). Angular 19+ defaults to standalone components.
- Node.js & npm compatible with your Angular version.

## Dependencies

```
@syncfusion/ej2-angular-splitbuttons
  ├── @syncfusion/ej2-angular-base
  └── @syncfusion/ej2-splitbuttons
        ├── @syncfusion/ej2-base
        ├── @syncfusion/ej2-popups
        └── @syncfusion/ej2-buttons
```

## Installation

### Recommended (ng add — auto-configures theme)

```bash
ng add @syncfusion/ej2-angular-splitbuttons
```

This command:
- Adds `@syncfusion/ej2-angular-splitbuttons` and peer dependencies to `package.json`
- Imports ProgressButton in your app
- Registers the default Material theme in `angular.json`

### Manual install (legacy/ngcc — Angular ≤15)

```bash
npm add @syncfusion/ej2-angular-splitbuttons@32.1.19-ngcc
```

> **Note:** From Angular 16+, ngcc support is removed. Use the Ivy package.

## CSS / Theme Setup

After manual install, add theme styles in `src/styles.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/progress-button/index.css";
```

> Import order must match the dependency chain.

Other available themes: `bootstrap5`, `bootstrap5.3`, `tailwind`, `fluent2`, `highcontrast`.

## Create a New Angular App (if needed)

```bash
npm install -g @angular/cli
ng new syncfusion-angular-app
cd syncfusion-angular-app
```

> **Angular 20+** generates `src/app/app.ts`, `app.html`, `app.css` (no `.component.` suffixes).  
> **Angular 19 and below** uses `app.component.ts`, `app.component.html`, etc.

## Basic Usage

### Standalone (Angular 19+, default)

```typescript
// src/app/app.ts
import { Component } from '@angular/core';
import { ProgressButtonModule } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [ProgressButtonModule],
  selector: 'app-root',
  template: `
    <button ejs-progressbutton content="Spin Left"></button>
  `
})
export class AppComponent {}
```

### NgModule-based (Angular 18 and below)

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProgressButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ProgressButtonModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<button ejs-progressbutton content="Spin Left"></button>`
})
export class AppComponent {}
```

## Enable Background Progress Filler

Set `[enableProgress]="true"` to show the background filler UI:

```typescript
template: `
  <button ejs-progressbutton content="Upload" [enableProgress]="true"></button>
`
```

## Run the Application

```bash
ng serve
```

## Styles, Types, and Sizes

ProgressButton inherits all Button styles, types, and sizes. Icon positions `top` and `bottom` are also supported in addition to `left` and `right`.

```typescript
// Primary button with right icon
template: `
  <button ejs-progressbutton content="Download"
          [isPrimary]="true"
          iconCss="e-icons e-download"
          iconPosition="Right">
  </button>
`
```
