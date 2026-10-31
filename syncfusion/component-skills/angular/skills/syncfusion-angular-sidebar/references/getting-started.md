# Getting Started with Syncfusion Angular Sidebar

## Table of Contents
- [Setup Angular Environment](#setup-angular-environment)
- [Installing Syncfusion Packages](#installing-syncfusion-packages)
- [Adding Styles](#adding-styles)
- [Adding Sidebar Component](#adding-sidebar-component)
- [Basic Examples](#basic-examples)
- [Running the Application](#running-the-application)

## Setup Angular Environment

### Install Angular CLI

Install Angular CLI globally to create and manage Angular projects:

```bash
npm install -g @angular/cli
```

For a specific version:

```bash
npm install -g @angular/cli@21.0.0
```

### Create New Angular Project

Generate a new Angular application using the CLI:

```bash
ng new syncfusion-angular-app
```

The CLI will prompt you to choose:
- Stylesheet format (CSS, SCSS, Less)
- Server-side rendering (SSR)
- AI tools integration

Navigate to the project directory:

```bash
cd syncfusion-angular-app
```

> **Note:** Angular 20+ uses simplified structure with `app.ts`, `app.html`, `app.css` (no `.component` suffixes). Angular 19 and below use `app.component.ts`, `app.component.html`, `app.component.css`.

## Installing Syncfusion Packages

### Ivy Library Distribution (Recommended)

For Angular 12+, use the modern Ivy distribution package:

```bash
npm install @syncfusion/ej2-angular-navigations --save
```

This includes all Sidebar dependencies:
- @syncfusion/ej2-base
- @syncfusion/ej2-data
- @syncfusion/ej2-angular-base
- @syncfusion/ej2-navigations
- And supporting packages (buttons, inputs, lists, popups)

### Angular Compatibility Compiled Package (ngcc)

For Angular versions below 12, use the ngcc (Angular Compatibility Compiler) package:

```bash
npm install @syncfusion/ej2-angular-navigations@ngcc --save
```

Or specify in `package.json`:

```json
"@syncfusion/ej2-angular-navigations": "20.2.38-ngcc"
```

## Adding Styles

Import Sidebar and dependency styles in `src/styles.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/sidebar/index.css";
```

**Theme Options:** The example uses Material3 theme. Other available themes:
- `bootstrap5.css`
- `fluent.css`
- `highcontrast.css`
- `tailwind.css`

For combined component styles, use the [CRG (Custom Resource Generator)](https://crg.syncfusion.com/).

## Adding Sidebar Component

### In app.component.ts

Import the Sidebar module and create the component using standalone architecture:

```typescript
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [SidebarModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-sidebar id="default-sidebar" #sidebar>
              <div class="title">Sidebar content</div>
            </ejs-sidebar>
            <div>
              <div class="title">Main content</div>
              <div class="sub-title">Content goes here.</div>
            </div>`
})
export class AppComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;
}
```

### Main Entry Point (main.ts)

Bootstrap the standalone application:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import 'zone.js';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

## Basic Examples

### Example 1: Simple Sidebar with Toggle

```typescript
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [SidebarModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-sidebar id="default-sidebar" #sidebar 
              [width]="'280px'" (created)="onCreated($event)" 
              style="visibility: hidden">
              <div class="title">Sidebar content</div>
            </ejs-sidebar>
            <div>
              <div class="title">Main content</div>
              <button (click)="toggleClick()">Toggle Sidebar</button>
            </div>`
})
export class AppComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;

  onCreated(args: any) {
    // Show sidebar after creation
    (this.sidebar as SidebarComponent).element.style.visibility = '';
  }

  toggleClick() {
    this.sidebar?.toggle();
  }
}
```

### Example 2: Sidebar with Backdrop

```typescript
@Component({
  imports: [SidebarModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-sidebar id="default-sidebar" #sidebar 
              [width]="'280px'" 
              [showBackdrop]="true"
              [closeOnDocumentClick]="true"
              (created)="onCreated($event)" 
              style="visibility: hidden">
              <div class="title">Sidebar content</div>
              <button (click)="closeSidebar()">Close</button>
            </ejs-sidebar>
            <div>
              <div class="title">Main content</div>
              <button (click)="openSidebar()">Open</button>
            </div>`
})
export class AppComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;

  onCreated(args: any) {
    (this.sidebar as SidebarComponent).element.style.visibility = '';
  }

  openSidebar() {
    this.sidebar?.show();
  }

  closeSidebar() {
    this.sidebar?.hide();
  }
}
```

## Running the Application

### Development Server

Start the development server with auto-reload:

```bash
ng serve --open
```

The `--open` flag automatically opens the application in your browser at `http://localhost:4200`.

### Production Build

Build for production:

```bash
ng build --configuration production
```

Compiled files will be in the `dist/` directory.

### Key Points

- **ViewChild Setup**: Use `@ViewChild('sidebar') sidebar?: SidebarComponent;` to reference the sidebar for method calls
- **Visibility Hidden**: Set `style="visibility: hidden"` initially to prevent flashing before component initializes
- **onCreated Event**: Use `(created)="onCreated($event)"` to show the sidebar after initialization is complete
- **Standalone Components**: Modern Angular uses standalone mode (imports array instead of NgModule)
- **Zone.js**: Import 'zone.js' for Angular zone handling

## See Also

- Sidebar Types and Positioning: Reference the positioning guide for Push, Slide, Over, Auto types
- Content Integration: Use ListView or TreeView for rich sidebar content
- Responsive Behavior: Use mediaQuery for auto-close on different screen sizes
