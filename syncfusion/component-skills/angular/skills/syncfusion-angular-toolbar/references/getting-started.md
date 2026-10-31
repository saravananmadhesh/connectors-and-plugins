# Getting Started with Angular Toolbar

## Table of Contents
- [Installation](#installation)
- [Angular CLI Setup](#angular-cli-setup)
- [Syncfusion Package Installation](#syncfusion-package-installation)
- [Add Toolbar Component](#add-toolbar-component)
- [CSS Theme Import](#css-theme-import)
- [Run Application](#run-application)
- [Basic Example](#basic-example)

## Installation

The Syncfusion Angular Toolbar component requires the `@syncfusion/ej2-angular-navigations` package and its dependencies.

### Dependencies

The Toolbar component depends on the following Syncfusion packages:

```
@syncfusion/ej2-angular-navigations
  ├── @syncfusion/ej2-base
  ├── @syncfusion/ej2-angular-base
  └── @syncfusion/ej2-navigations
      ├── @syncfusion/ej2-buttons
      └── @syncfusion/ej2-popups
```

## Angular CLI Setup

### Install Angular CLI

If you haven't already installed Angular CLI, use the following command:

```bash
npm install -g @angular/cli
```

### Install Specific Angular Version

To install a particular version of Angular CLI:

```bash
npm install -g @angular/cli@21.0.0
```

### Create New Angular Project

Use the Angular CLI to create a new application:

```bash
ng new syncfusion-angular-app
```

**Configure during setup:**
- Choose stylesheet format (CSS, SCSS, LESS)
- Enable Angular routing if needed
- Configure Server-side rendering (SSR) if required
- Select AI tool preference

**Navigate to project directory:**

```bash
cd syncfusion-angular-app
```

> **Note:** Angular 20+ uses simplified structure (src/app/app.ts) instead of separate .component.ts files.

## Syncfusion Package Installation

### Modern Ivy Distribution (Angular 12+)

Syncfusion packages from version 20.2.36+ support Angular Ivy rendering engine. Install using:

```bash
npm install @syncfusion/ej2-angular-navigations --save
```

### Legacy `ngcc` Package (Angular <12)

For Angular versions below 12, install the legacy ngcc package:

```bash
npm install @syncfusion/ej2-angular-navigations@ngcc --save
```

Update `package.json` to include the ngcc suffix:

```json
"@syncfusion/ej2-angular-navigations": "20.2.38-ngcc"
```

> **Warning:** If ngcc tag is not specified, Ivy package installs and may throw warnings.

## Add Toolbar Component

### Import ToolbarModule

In your component file (e.g., `src/app/app.component.ts`), import the ToolbarModule:

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-toolbar>
    <e-items>
      <e-item text='Cut'></e-item>
      <e-item text='Copy'></e-item>
      <e-item text='Paste'></e-item>
      <e-item type='Separator'></e-item>
      <e-item text='Bold'></e-item>
      <e-item text='Italic'></e-item>
      <e-item text='Underline'></e-item>
    </e-items>
  </ejs-toolbar>`
})
export class AppComponent { }
```

### Standalone Component Setup

The Toolbar is configured as a standalone component by:
1. Importing `ToolbarModule` in the `imports` array
2. Setting `standalone: true`
3. Using `<ejs-toolbar>` selector with `<e-items>` and `<e-item>` directive elements

## CSS Theme Import

The Toolbar requires CSS theme files to display properly. Add the following imports to your **src/styles.css** file:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/toolbar/index.css";
```

**Available Theme Packages:**
- `material3.css` - Material Design 3 (Default)
- `bootstrap.css` - Bootstrap theme
- `tailwind.css` - Tailwind CSS theme

Choose one theme package based on your design requirements.

## Run Application

After setup and configuration, run the application using:

```bash
npm start
```

The application will open at `http://localhost:4200` by default. The Toolbar component will render with the configured items.

## Basic Example

### Minimal Toolbar

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item text='Cut'></e-item>
        <e-item text='Copy'></e-item>
        <e-item text='Paste'></e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent { }
```

### Complete Example with Bootstrap

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import 'zone.js';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

### Toolbar with Icons

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item text='Cut' prefixIcon='e-icons e-cut'></e-item>
        <e-item text='Copy' prefixIcon='e-icons e-copy'></e-item>
        <e-item text='Paste' prefixIcon='e-icons e-paste'></e-item>
        <e-item type='Separator'></e-item>
        <e-item text='Bold' prefixIcon='e-icons e-bold'></e-item>
        <e-item text='Italic' prefixIcon='e-icons e-italic'></e-item>
        <e-item text='Underline' prefixIcon='e-icons e-underline'></e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent { }
```

## Expected Output

After running the application, you should see a horizontal toolbar with buttons displaying:
- Cut, Copy, Paste buttons
- Separator divider
- Bold, Italic, Underline buttons

Each button is clickable and ready for event binding.

