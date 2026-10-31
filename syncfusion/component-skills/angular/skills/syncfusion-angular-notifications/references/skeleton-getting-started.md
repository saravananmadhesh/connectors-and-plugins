# Getting Started with Skeleton Component

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [CSS Theme Import](#css-theme-import)
- [Basic Setup](#basic-setup)
- [First Skeleton](#first-skeleton)
- [Running the Application](#running-the-application)

## Prerequisites

Ensure your development environment meets the following requirements:
- **Angular 19+** or compatible recent Angular versions
- **Node.js** and npm installed
- Angular CLI installed globally

For detailed Angular version compatibility, refer to the [Angular version support matrix](https://ej2.syncfusion.com/angular/documentation/system-requirement#angular-version-compatibility).

> **Note:** Starting from Angular 19, standalone components are the default. This guide uses the modern standalone architecture.

## Installation

### Step 1: Install Angular CLI

If you don't have Angular CLI installed, install it globally:

```bash
npm install -g @angular/cli
```

To install a specific version:

```bash
npm install -g @angular/cli@21.0.0
```

### Step 2: Create a New Angular Application

```bash
ng new syncfusion-skeleton-app
```

When prompted, choose your preferred settings:
- **Stylesheet format:** CSS (or SCSS if preferred)
- **Server-side rendering:** Select your preference
- **AI tool:** Optional based on your needs

Navigate to your project:

```bash
cd syncfusion-skeleton-app
```

> **Note:** In Angular 19 and below, files use `.component.ts` suffixes. In Angular 20+, the CLI generates a simpler structure with `src/app/app.ts`, `app.html`, and `app.css`.

### Step 3: Add Syncfusion Notifications Package

Install the Syncfusion Angular Notifications package which includes the Skeleton component:

```bash
ng add @syncfusion/ej2-angular-notifications
```

This command will automatically:
- Add `@syncfusion/ej2-angular-notifications` package and peer dependencies to `package.json`
- Import the Skeleton component in your application
- Register the default Material theme in `angular.json`

**For ngcc compatibility** (Angular 15 and below):

```bash
npm add @syncfusion/ej2-angular-notifications@32.1.19-ngcc
```

> **Note:** Starting from Angular 16, ngcc support has been removed. The IVY format packages are required for Angular 16+.

## Dependencies

The Skeleton component depends on the following packages:

```
@syncfusion/ej2-angular-notifications
└── @syncfusion/ej2-angular-base
```

These dependencies are automatically installed when you run `ng add`.

## CSS Theme Import

### Automatic Theme Setup

When you run `ng add @syncfusion/ej2-angular-notifications`, the Material theme is automatically added to your `styles.css` file.

### Manual Theme Import

To import themes manually, add the following to your `styles.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/skeleton/index.css";
```

**Available themes:**
- `material.css` - Material Design theme (default)
- `bootstrap5.css` - Bootstrap 5 theme
- `fabric.css` - Fabric theme
- `tailwind.css` - Tailwind CSS theme

**Theme import in correct order:**
1. Base styles first (`@syncfusion/ej2-base/styles/...`)
2. Component styles second (`@syncfusion/ej2-angular-notifications/styles/...`)

### Using SCSS

If your project uses SCSS, import themes as SCSS files:

```scss
@import '../node_modules/@syncfusion/ej2-base/styles/material.scss';
@import '../node_modules/@syncfusion/ej2-angular-notifications/styles/material.scss';
```

For detailed SCSS setup guide, refer to [SCSS configuration](https://ej2.syncfusion.com/angular/documentation/common/how-to/sass).

## Basic Setup

### Update Your App Component

Modify `src/app/app.ts` (or `src/app/app.component.ts` for older Angular versions):

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <h1>Angular Skeleton Component</h1>
    <ejs-skeleton height="15px"></ejs-skeleton>
  `
})
export class AppComponent {}
```

**Key points:**
- Import `SkeletonModule` from `@syncfusion/ej2-angular-notifications`
- Set `standalone: true` for modern Angular architecture
- Add `SkeletonModule` to the `imports` array
- Use `<ejs-skeleton>` template tag in your template

### Update Bootstrap

Your `src/main.ts` should look like this:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import 'zone.js';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

## First Skeleton

Here's a complete example of your first Skeleton component:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';
import { Component } from '@angular/core';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'my-app',
  template: `<ejs-skeleton height='15px'></ejs-skeleton>`
})
export class AppComponent {}
```

**Bootstrap the app:**

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import 'zone.js';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

## Running the Application

### Development Server

Run the development server:

```bash
ng serve
```

The application will be available at `http://localhost:4200/`. The page will automatically reload when you make changes to the source files.

### Building for Production

Create a production build:

```bash
ng build
```

The optimized build will be stored in the `dist/` folder.

### Compilation Options

For faster development, use:

```bash
ng serve --poll
```

Or with a specific poll interval:

```bash
ng serve --poll=2000
```

## Troubleshooting

**Issue: Module not found error for SkeletonModule**
- Ensure `@syncfusion/ej2-angular-notifications` is installed
- Run `npm install` if dependencies are missing
- Restart the dev server

**Issue: Theme not applying**
- Verify CSS import is in `styles.css`
- Check import order: base styles first, then component styles
- Clear browser cache and rebuild

**Issue: Skeleton not rendering**
- Verify `SkeletonModule` is in the `imports` array
- Check that you're using the `<ejs-skeleton>` tag with lowercase `ejs-`
- Ensure `standalone: true` is set in the component

