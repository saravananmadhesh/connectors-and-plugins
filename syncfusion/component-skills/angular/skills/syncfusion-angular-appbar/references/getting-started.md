# Getting Started with Angular AppBar

## Table of Contents
- [Prerequisites](#prerequisites)
- [Angular CLI Setup](#angular-cli-setup)
- [Creating a New Application](#creating-a-new-application)
- [Installing Syncfusion AppBar Package](#installing-syncfusion-appbar-package)
- [Adding AppBar Component](#adding-appbar-component)
- [Adding CSS References](#adding-css-references)
- [Running the Application](#running-the-application)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js and npm package manager
- Basic understanding of Angular and TypeScript
- An Angular development environment

## Angular CLI Setup

Install Angular CLI globally on your machine:

```bash
npm install -g @angular/cli
```

To install a specific version of Angular CLI (e.g., Angular 21):

```bash
npm install -g @angular/cli@21.0.0
```

## Creating a New Application

Create a new Angular application using the Angular CLI:

```bash
ng new syncfusion-angular-app
```

During project setup, you'll be prompted to:
1. Configure stylesheet format (CSS, SCSS, LESS, or Sass)
2. Choose Server-side rendering (SSR) configuration
3. Select an AI tool integration (or 'none')

By default, a CSS-based application is created. To use SCSS:

```bash
ng new syncfusion-angular-app --style=scss
```

Navigate to your new project directory:

```bash
cd syncfusion-angular-app
```

**Note**: In Angular 20+, the CLI generates simpler structure with `src/app/app.ts`, `app.html`, and `app.css`. In Angular 19 and below, files use the `.component.ts` suffix.

## Installing Syncfusion AppBar Package

Syncfusion packages are distributed as scoped `@syncfusion` npm packages. Currently, two package structures are available:

### Ivy Library Distribution (Angular 12+)

For Angular 12 and above, install the modern Ivy library distribution:

```bash
npm install @syncfusion/ej2-angular-navigations --save
```

This package includes all navigation components and is compatible with Angular 12+.

### Angular Compatibility Compiler Package (Angular <12)

For Angular versions below 12, use the legacy ngcc (Angular compatibility compiler) package:

```bash
npm install @syncfusion/ej2-angular-navigations@ngcc --save
```

Update your `package.json` to include the ngcc suffix:

```json
{
  "dependencies": {
    "@syncfusion/ej2-angular-navigations": "20.2.38-ngcc"
  }
}
```

**Note**: If the ngcc tag is not specified during installation, the Ivy Library Package will be installed and may throw a warning.

## Dependencies

The AppBar module has the following dependency structure:

```
@syncfusion/ej2-angular-navigations
├── @syncfusion/ej2-angular-base
├── @syncfusion/ej2-navigations
│   └── @syncfusion/ej2-base
```

These dependencies are installed automatically with the navigations package.

## Adding AppBar Component

Modify your component file to import and use the AppBar:

```typescript
import { AppBarModule } from '@syncfusion/ej2-angular-navigations'
import { Component } from "@angular/core";
import { ButtonModule } from '@syncfusion/ej2-angular-buttons'

@Component({
  imports: [AppBarModule, ButtonModule],
  standalone: true,
  selector: "app-root",
  template: `
    <div class="control-container">
      <ejs-appbar colorMode="Primary">
        <button #regularBtn ejs-button cssClass="e-inherit menu" iconCss="e-icons e-menu"></button>
        <span class="regular" style="margin: 0 5px">Angular AppBar</span>
        <div class="e-appbar-spacer"></div>
        <button ejs-button cssClass="e-inherit login">FREE TRIAL</button>
      </ejs-appbar>
    </div>
  `
})
export class AppComponent { }
```

### Key Implementation Points

1. **Import AppBarModule**: Required to use the `ejs-appbar` component
2. **Standalone: true**: Modern Angular uses standalone components
3. **cssClass="e-inherit"**: Buttons inside AppBar inherit the AppBar's theme styling
4. **colorMode="Primary"**: Sets the AppBar to use primary theme colors
5. **e-appbar-spacer**: Creates flexible space to push content apart

## Adding CSS References

Add the required Syncfusion CSS imports to your global `style.css` file:

```css
@import "../node_modules/@syncfusion/ej2-base/styles/material3";
@import "../node_modules/@syncfusion/ej2-navigations/styles/material3";
```

**Available Theme Options:**
- `material3` (Material Design 3 - modern default)
- `material` (Material Design)
- `bootstrap5` (Bootstrap 5 theme)
- `bootstrap4` (Bootstrap 4 theme)
- `fluent2` (Microsoft Fluent 2 theme)
- `tailwindcss` (Tailwind CSS theme)
- `highcontrast` (High contrast for accessibility)

Choose one theme based on your design requirements. If needed, you can import multiple theme files for different components.

## Running the Application

Start the development server:

```bash
ng serve
```

Open your browser and navigate to:

```
http://localhost:4200
```

The application will automatically reload when you make code changes.

## Complete Example

Here's a complete, production-ready AppBar example:

```typescript
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppBarModule } from '@syncfusion/ej2-angular-navigations'
import { ButtonModule } from '@syncfusion/ej2-angular-buttons'
import { Component } from "@angular/core";

@Component({
  imports: [AppBarModule, ButtonModule],
  standalone: true,
  selector: "app-root",
  template: `
    <div class="control-container">
      <ejs-appbar colorMode="Primary">
        <button #regularBtn ejs-button cssClass="e-inherit" iconCss="e-icons e-menu"></button>
        <span class="regular" style="margin: 0 5px">Angular AppBar</span>
        <div class="e-appbar-spacer"></div>
        <button ejs-button cssClass="e-inherit">FREE TRIAL</button>
      </ejs-appbar>
    </div>
  `,
})
export class AppComponent { }
```

Bootstrap the application:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import 'zone.js';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

## Production Example with Properties

Real-world example demonstrating key properties and events:

```typescript
import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { AppBarModule } from '@syncfusion/ej2-angular-navigations'
import { ButtonModule } from '@syncfusion/ej2-angular-buttons'

@Component({
  imports: [AppBarModule, ButtonModule],
  standalone: true,
  selector: "app-root",
  template: `
    <div class="control-container">
      <ejs-appbar 
        #appbar
        colorMode="Primary"
        mode="Regular"
        position="Top"
        [isSticky]="true"
        [enableRtl]="false"
        [enablePersistence]="true"
        (created)="onAppBarCreated()"
        (destroyed)="onAppBarDestroyed()">
        <button ejs-button cssClass="e-inherit" iconCss="e-icons e-menu" (click)="toggleMenu()"></button>
        <span class="app-title">My Application</span>
        <div class="e-appbar-spacer"></div>
        <button ejs-button cssClass="e-inherit" iconCss="e-icons e-user"></button>
      </ejs-appbar>
      
      <div class="page-content">
        <p>Your page content here</p>
      </div>
    </div>
  `,
  styles: [`
    .app-title {
      margin: 0 12px;
      font-weight: 600;
      color: white;
    }
  `]
})
export class AppComponent implements AfterViewInit {
  @ViewChild('appbar') appbar: any;

  ngAfterViewInit() {
    console.log('AppBar component initialized');
  }

  onAppBarCreated() {
    console.log('AppBar created event triggered');
    // Initialize any AppBar-specific logic
  }

  onAppBarDestroyed() {
    console.log('AppBar destroyed event triggered');
    // Clean up resources
  }

  toggleMenu() {
    console.log('Menu toggled');
  }
}
```

## Code Examples for Each Feature

### Spacer Example
```typescript
<ejs-appbar colorMode="Primary">
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-home"></button>
  <div class="e-appbar-spacer"></div>
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-cut"></button>
  <div class="e-appbar-spacer"></div>
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-pan"></button>
</ejs-appbar>
```

### Separator Example
```typescript
<ejs-appbar colorMode="Primary">
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-cut"></button>
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-copy"></button>
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-paste"></button>
  <div class="e-appbar-separator"></div>
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-bold"></button>
</ejs-appbar>
```

### Dense Mode Example
```typescript
<ejs-appbar colorMode="Primary" mode="Dense">
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-menu"></button>
  <span>Compact AppBar</span>
</ejs-appbar>
```

### Prominent Mode Example
```typescript
<ejs-appbar colorMode="Primary" mode="Prominent">
  <span class="prominent">Large AppBar Component</span>
</ejs-appbar>
```

### Sticky AppBar Example
```typescript
<ejs-appbar colorMode="Primary" [isSticky]="true">
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-menu"></button>
  <div class="e-appbar-spacer"></div>
  <button ejs-button cssClass="e-inherit">FREE TRIAL</button>
</ejs-appbar>
<div class="page-content">
  <!-- Scrollable content -->
</div>
```

## Troubleshooting Common Issues

**Issue**: Module not found errors for `@syncfusion/ej2-angular-navigations`
- **Solution**: Run `npm install` again to ensure packages are correctly installed

**Issue**: Styles not loading
- **Solution**: Verify CSS imports are in your global `style.css` file and the theme path is correct

**Issue**: Icons not displaying
- **Solution**: Ensure icon CSS class names (e.g., `e-icons e-menu`) match available icon names in Syncfusion icon library

**Issue**: Component not rendering
- **Solution**: Confirm `AppBarModule` is imported in the component's imports array and the component is standalone or part of an NgModule
