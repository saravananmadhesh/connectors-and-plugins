# Getting Started with Dialog

## Table of Contents
- [Installation & Setup](#installation--setup)
- [Basic Implementation](#basic-implementation)
- [Minimal Example](#minimal-example)
- [CSS Imports & Themes](#css-imports--themes)
- [Running the Application](#running-the-application)
- [Troubleshooting](#troubleshooting)

## Installation & Setup

### Prerequisites

Ensure your development environment meets the [System Requirements for Syncfusion Angular UI Components](https://ej2.syncfusion.com/angular/documentation/system-requirement).

### Install Angular CLI

If you haven't already, install Angular CLI globally:

```bash
npm install -g @angular/cli
```

For a specific version (e.g., Angular 21):

```bash
npm install -g @angular/cli@21.0.0
```

### Create a New Angular Application

Generate a new Angular application:

```bash
ng new syncfusion-dialog-app
cd syncfusion-dialog-app
```

When prompted, select your preferred CSS framework and choose the appropriate configuration options.

### Install Syncfusion Popups Package

The Dialog component is part of the Syncfusion Popups package. Install it using:

```bash
ng add @syncfusion/ej2-angular-popups
```

This command automatically:
- Adds `@syncfusion/ej2-angular-popups` and dependencies to `package.json`
- Imports the Dialog component in your application
- Registers the default Material theme in `angular.json`

**Alternative Installation (Manual):**

```bash
npm install @syncfusion/ej2-angular-popups
npm install @syncfusion/ej2-base @syncfusion/ej2-buttons @syncfusion/ej2-popups
```

## Basic Implementation

### Import DialogModule

In your component, import the Dialog module:

```typescript
import { Component, ViewChild } from '@angular/core';
import { DialogModule, DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-root',
  imports: [DialogModule],
  template: `...`
})
export class AppComponent {
  // Component code
}
```

### Define the Dialog

Use the `<ejs-dialog>` selector to create a dialog:

```html
<div id="dialog-container">
  <button (click)="onOpenDialog()">Open Dialog</button>
  
  <ejs-dialog 
    #ejDialog
    target="#dialog-container"
    content="Hello from Dialog!"
  >
  </ejs-dialog>
</div>
```

### Control the Dialog

Use `@ViewChild` to reference the dialog and call its methods:

```typescript
export class AppComponent {
  @ViewChild('ejDialog') ejDialog!: DialogComponent;

  onOpenDialog(): void {
    this.ejDialog.show();
  }

  onCloseDialog(): void {
    this.ejDialog.hide();
  }
}
```

## Minimal Example

Here's a complete minimal example:

**Component (app.component.ts):**

```typescript
import { Component, ViewChild } from '@angular/core';
import { DialogModule, DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DialogModule],
  template: `
    <div id="dialog-container" style="height: 500px;">
      <button class="e-control e-btn" (click)="onOpenDialog()">
        Open Dialog
      </button>
      
      <ejs-dialog 
        #ejDialog
        target="#dialog-container"
        [showCloseIcon]="true"
        width="350px"
        content="This is a Dialog content"
      >
        <ng-template #header>
          <span>Simple Dialog</span>
        </ng-template>
      </ejs-dialog>
    </div>
  `,
  styles: [`
    #dialog-container {
      height: 500px;
      padding: 20px;
    }
  `]
})
export class AppComponent {
  @ViewChild('ejDialog') ejDialog!: DialogComponent;

  onOpenDialog(): void {
    this.ejDialog.show();
  }
}
```

**Bootstrap (main.ts):**

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import 'zone.js';

bootstrapApplication(AppComponent)
  .catch(err => console.error(err));
```

**CSS (styles.css):**

```css
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}
```

## CSS Imports & Themes

### Adding Theme Styles

Syncfusion Dialog requires theme styles to render correctly. Add the theme CSS to your `styles.css` or `angular.json`:

**Option 1: Import in styles.css (Recommended)**

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/dialog/index.css";
```

**Option 2: Configure in angular.json**

```json
"styles": [
  "node_modules/@syncfusion/ej2-base/styles/material3.css",
  "node_modules/@syncfusion/ej2-icons/styles/material3.css",
  "node_modules/@syncfusion/ej2-buttons/styles/material3.css",
  "node_modules/@syncfusion/ej2-angular-popups/styles/material3.css",
  "src/styles.css"
]
```

### Available Themes

- `material3.css` - Material Design 3 (recommended)
- `bootstrap5.css` - Bootstrap 5
- `tailwind.css` - Tailwind CSS
- `fluent.css` - Fluent Design

### Using SCSS

If your project uses SCSS, import SCSS variables:

```scss
@import '../node_modules/@syncfusion/ej2-base/styles/material3.scss';
@import '../node_modules/@syncfusion/ej2-icons/styles/material3.scss';
@import '../node_modules/@syncfusion/ej2-buttons/styles/material3.scss';
@import '../node_modules/@syncfusion/ej2-angular-popups/styles/material3.scss';
```

## Running the Application

### Start Development Server

Run the application:

```bash
ng serve
```

Or with a specific port:

```bash
ng serve --port 4200
```

### Open in Browser

Navigate to `http://localhost:4200` in your browser.

### Build for Production

Create a production build:

```bash
ng build --configuration production
```

The build output will be in the `dist/` folder.

## Important Notes

### Container Element

The Dialog must have a `target` element. If not specified, it uses `document.body`:

```html
<div id="dialog-container">
  <!-- Dialog needs this container -->
  <ejs-dialog target="#dialog-container">
    ...
  </ejs-dialog>
</div>
```

### Container Height

The dialog's max-height is calculated based on the target element's height. Set a `min-height` on the container:

```css
#dialog-container {
  height: 500px;  /* Required for proper dialog sizing */
}
```

If rendering against `body`, set CSS on html and body:

```css
html, body {
  height: 100%;
}
```

### Standalone Components

Angular 21+ uses standalone components by default. Always include `DialogModule` in your component's `imports`:

```typescript
@Component({
  imports: [DialogModule],
  ...
})
```

## Troubleshooting

### Dialog Not Showing

**Problem:** Dialog doesn't appear when calling `show()`

**Solutions:**
1. Verify the target element exists and has a height
2. Check that CSS imports are included
3. Ensure `@ViewChild` reference is correctly typed

```typescript
// Correct
@ViewChild('ejDialog') ejDialog!: DialogComponent;

// Incorrect
@ViewChild('ejDialog') ejDialog: any;  // Missing type
```

### Styles Not Applied

**Problem:** Dialog appears but styles are missing

**Solutions:**
1. Verify theme CSS is imported in the correct order
2. Check `angular.json` styles configuration
3. Ensure all dependencies are installed:

```bash
npm install @syncfusion/ej2-base
npm install @syncfusion/ej2-buttons
npm install @syncfusion/ej2-popups
```

### Module Import Error

**Problem:** `DialogModule is not defined`

**Solution:** Import from the correct package:

```typescript
// Correct
import { DialogModule } from '@syncfusion/ej2-angular-popups';

// Incorrect
import { DialogModule } from '@syncfusion/ej2-popups';  // Wrong package
```

### Content Not Rendering

**Problem:** Dialog opens but content is empty

**Solutions:**
1. Use `content` property for strings:

```html
<ejs-dialog content="Hello World"></ejs-dialog>
```

2. Or use ng-template for HTML:

```html
<ejs-dialog>
  <ng-template #content>
    <div>Hello World</div>
  </ng-template>
</ejs-dialog>
```

### Dialog Position Issues

**Problem:** Dialog appears offscreen or overlaps

**Solutions:**
1. Verify target element exists and is visible
2. Check window height is sufficient
3. Use custom positioning if needed:

```html
<ejs-dialog [position]="{ X: 100, Y: 100 }">
  ...
</ejs-dialog>
```

