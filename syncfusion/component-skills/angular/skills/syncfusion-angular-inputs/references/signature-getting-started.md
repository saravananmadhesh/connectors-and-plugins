# Getting Started with Angular Signature Component

## Table of Contents
- [Prerequisites](#prerequisites)
- [Angular Application Setup](#angular-application-setup)
- [Install Signature Package](#install-signature-package)
- [Import CSS Styles](#import-css-styles)
- [Add Signature Component](#add-signature-component)
- [Run Your Application](#run-your-application)

## Prerequisites

Ensure your development environment meets the System Requirements for Syncfusion Angular UI Components. This guide supports **Angular 21** and other recent Angular versions.

- **Node.js** installed (recommended latest LTS version)
- **npm** installed (comes with Node.js)
- **Angular CLI** installed globally

## Angular Application Setup

### Install Angular CLI

Install Angular CLI globally using npm:

```bash
npm install -g @angular/cli
```

To install a specific version of Angular CLI (e.g., Angular 21):

```bash
npm install -g @angular/cli@21.0.0
```

### Create New Angular Application

Generate a new Angular application with the following command:

```bash
ng new syncfusion-angular-app
```

During project creation, you'll be prompted to configure:

```bash
? Which stylesheet format would you like to use?
> CSS
  Sass (SCSS)
  Sass (Indented)
  Less
```

**Default:** CSS-based application is created

**For SCSS:** Run `ng new syncfusion-angular-app --style=scss`

Navigate to your application directory:

```bash
cd syncfusion-angular-app
```

> **Note:** Angular 20+ generates a simpler structure: `src/app/app.ts`, `app.html`, and `app.css` (without `.component.` suffixes).

## Install Signature Package

Syncfusion Angular packages are available on [npmjs.com](https://www.npmjs.com/search?q=ej2-angular). Install the Signature component package:

```bash
ng add @syncfusion/ej2-angular-inputs
```

This command automatically:
- Adds `@syncfusion/ej2-angular-inputs` package and peer dependencies to `package.json`
- Imports the Signature component in your application
- Registers the default Syncfusion material theme in `angular.json`

### Package Dependencies

The Signature module requires these dependencies:

```
@syncfusion/ej2-angular-inputs
├── @syncfusion/ej2-angular-base
├── @syncfusion/ej2-inputs
│   ├── @syncfusion/ej2-base
│   ├── @syncfusion/ej2-popups
│   ├── @syncfusion/ej2-buttons
│   └── @syncfusion/ej2-splitbuttons
```

## Import CSS Styles

Apply Syncfusion themes via CSS or SCSS. The Material theme is automatically added when you run `ng add`.

### CSS Import

Add to `styles.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/signature/index.css";
```

> **Important:** Maintain import order to respect component dependencies.

### SCSS Import

Use SCSS variables in `styles.scss`:

```scss
@import '../node_modules/@syncfusion/ej2-base/styles/material3.scss';
@import '../node_modules/@syncfusion/ej2-inputs/styles/material3.scss';
```

## Add Signature Component

### Basic Implementation (Angular 21 Standalone)

Modify your `app.ts` file to include the Signature component:

```typescript
import { Component, OnInit } from '@angular/core';
import { SignatureModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [SignatureModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <!-- To Render Signature -->
    <canvas ejs-signature #signature id="signature"></canvas>
  `
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
  }
}
```

### Complete Application Example

**app.ts:**

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignatureModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [FormsModule, SignatureModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <h4>Sign here</h4>
      <!-- To Render Signature -->
      <canvas ejs-signature #signature id="signature"></canvas>
    </div>
  `,
  styles: [`
    .e-section-control {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    h4 {
      margin-top: 0;
    }
    
    canvas {
      border: 1px solid #ccc;
      width: 100%;
      max-width: 600px;
      height: 400px;
    }
  `]
})
export class AppComponent {}
```

**main.ts (Bootstrap):**

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import 'zone.js';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

## Run Your Application

Start the development server:

```bash
ng serve --open
```

This command:
- Compiles the application
- Starts a local development server (default: http://localhost:4200)
- Opens the application in your default browser
- Enables hot module replacement for live updates

### Manual Browser Access

If the browser doesn't open automatically, navigate to: `http://localhost:4200`

## Next Steps

- **Customize strokes:** Read [Customization](./customization.md)
- **Implement undo/redo:** Read [User Interactions](./user-interactions.md)
- **Save signatures:** Read [Opening and Saving Signatures](./open-save.md)
- **Add toolbar:** Read [Toolbar Integration](./toolbar-integration.md)

## Troubleshooting

### Module Not Found Error

```
ERROR in node_modules/@syncfusion/ej2-angular-inputs/index.d.ts
```

**Solution:** Run `npm install` to install all dependencies:

```bash
npm install
```

### Styles Not Applying

Verify CSS imports in `styles.css` and check browser DevTools for import errors.

### Canvas Not Rendering

Ensure the canvas element has proper dimensions:

```typescript
canvas {
  width: 100%;
  height: 400px;
  border: 1px solid #ccc;
}
```

## Version Compatibility

For version compatibility with different Angular versions, refer to the [Version Compatibility Matrix](https://ej2.syncfusion.com/angular/documentation/upgrade/version-compatibility).

### Legacy ngcc Support

For projects using Angular CLI 15 and below (deprecated):

```bash
npm add @syncfusion/ej2-angular-inputs@32.1.19-ngcc
```

> **Note:** Starting from Angular 16, ngcc support has been removed.
