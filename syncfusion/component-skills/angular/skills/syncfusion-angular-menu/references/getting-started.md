# Getting Started with Syncfusion Angular Menu

## Table of Contents
- [Setup and Installation](#setup-and-installation)
- [Create Angular Application](#create-angular-application)
- [Install Menu Package](#install-menu-package)
- [Add Menu Component](#add-menu-component)
- [CSS Configuration](#css-configuration)
- [Basic Menu Example](#basic-menu-example)
- [Menu with Separators](#menu-with-separators)
- [Essential Properties](#essential-properties)
- [Running the Application](#running-the-application)

## Setup and Installation

### Angular CLI Installation

Use Angular CLI to set up your Angular applications. Install Angular CLI globally:

```bash
npm install -g @angular/cli
```

To install a specific version:
```bash
npm install -g @angular/cli@21.0.0
```

**Note:** For Angular 21 and above, standalone components are the default architecture.

### Create Angular Application

Generate a new Angular application with Angular CLI:

```bash
ng new syncfusion-angular-app
```

This command will prompt you to configure settings:
- Enable Angular routing (optional)
- Choose stylesheet format (CSS, SCSS, Less, etc.)
- Configure Server-side rendering (SSR) if needed
- Select AI tool integration (optional)

For SCSS support:
```bash
ng new syncfusion-angular-app --style=scss
```

Navigate to your project:
```bash
cd syncfusion-angular-app
```

## Install Menu Package

### Ivy Library Distribution Package

Syncfusion Angular packages (version 20.2.36+) use the Ivy distribution format and are compatible with Angular 12 and above. Install the navigations package:

```bash
npm install @syncfusion/ej2-angular-navigations --save
```

### Legacy Angular Compatibility Compiler (ngcc)

For Angular version below 12, use the ngcc package:

```bash
npm install @syncfusion/ej2-angular-navigations@ngcc --save
```

Update your `package.json`:
```json
"@syncfusion/ej2-angular-navigations": "20.2.38-ngcc"
```

**Note:** If ngcc tag is not specified, the Ivy library will be installed and may show a warning.

### Dependencies Structure

The Menu package includes the following dependencies:

```
@syncfusion/ej2-angular-navigations
  ├── @syncfusion/ej2-angular-base
  ├── @syncfusion/ej2-navigations
  │   ├── @syncfusion/ej2-base
  │   ├── @syncfusion/ej2-data
  │   ├── @syncfusion/ej2-lists
  │   ├── @syncfusion/ej2-inputs
  │   ├── @syncfusion/ej2-splitbuttons
  │   └── @syncfusion/ej2-popups
  │       └── @syncfusion/ej2-buttons
```

## Add Menu Component

### Basic Setup

Modify `app.component.ts` to render the Menu component using the `ejs-menu` directive. Import the required modules:

```typescript
import { Component } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <ejs-menu [items]="menuItems"></ejs-menu>
    </div>
  `
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    {
      text: 'File',
      items: [
        { text: 'Open' },
        { text: 'Save' },
        { text: 'Exit' }
      ]
    },
    {
      text: 'Edit',
      items: [
        { text: 'Cut' },
        { text: 'Copy' },
        { text: 'Paste' }
      ]
    },
    {
      text: 'View',
      items: [
        { text: 'Toolbar' },
        { text: 'Sidebar' }
      ]
    },
    {
      text: 'Tools',
      items: [
        { text: 'Spelling & Grammar' },
        { text: 'Customize' },
        { text: 'Options' }
      ]
    },
    { text: 'Go' },
    { text: 'Help' }
  ];
}
```

### Bootstrap Application

`main.ts`:
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import 'zone.js';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

## CSS Configuration

Add Menu component styles to your stylesheet. In `styles.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/menu/index.css";
```

**Available themes:**
- `material3.css` - Material Design 3
- `material.css` - Material Design
- `bootstrap5.css` - Bootstrap 5
- `fluent2.css` - Fluent 2
- `tailwind.css` - Tailwind CSS

## Basic Menu Example

Complete example with TypeScript, template, and bootstrap code:

```typescript
import { Component } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <ejs-menu [items]="menuItems"></ejs-menu>
    </div>
  `
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    {
      text: 'File',
      items: [
        { text: 'Open' },
        { text: 'Save' },
        { text: 'Exit' }
      ]
    },
    {
      text: 'Edit',
      items: [
        { text: 'Cut' },
        { text: 'Copy' },
        { text: 'Paste' }
      ]
    },
    {
      text: 'View',
      items: [
        { text: 'Toolbar' },
        { text: 'Sidebar' },
        { text: 'Full Screen' }
      ]
    },
    {
      text: 'Tools',
      items: [
        { text: 'Spelling & Grammar' },
        { text: 'Customize' },
        { text: 'Options' }
      ]
    },
    { text: 'Go' },
    { text: 'Help' }
  ];
}
```

Bootstrap in `main.ts`:
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import 'zone.js';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

## Menu with Separators

Separators are horizontal lines used to group menu items. Use the `separator` property:

```typescript
public menuItems: MenuItemModel[] = [
  {
    text: 'File',
    items: [
      { text: 'Open' },
      { text: 'Save' },
      { separator: true },
      { text: 'Exit' }
    ]
  },
  {
    text: 'Edit',
    items: [
      { text: 'Cut' },
      { text: 'Copy' },
      { text: 'Paste' }
    ]
  },
  {
    text: 'View',
    items: [
      { text: 'Toolbar' },
      { text: 'Sidebar' },
      { text: 'Full Screen' }
    ]
  },
  {
    text: 'Tools',
    items: [
      { text: 'Spelling & Grammar' },
      { text: 'Customize' },
      { text: 'Options' }
    ]
  },
  { text: 'Go' },
  { text: 'Help' }
];
```

**Note:** The `separator` property should not be used with other field properties like `text` or `items` in the same menu item.

You can also enable separators for **horizontal** menu items to group them visually.

## Essential Properties

Beyond the basic items array, the Menu component supports several important properties. Here are the most essential ones to get started:

### enablePersistence - State Persistence

Save and restore menu state between page reloads using localStorage:

```typescript
@Component({
  template: `
    <ejs-menu 
      [items]="menuItems"
      [enablePersistence]="true">
    </ejs-menu>
  `
})
export class MenuComponent { }
```

When enabled, if a user opens submenu items, closes the browser, and returns later, the same submenus will remain open.

### enableRtl - Right-to-Left Language Support

Enable RTL layout for Arabic, Hebrew, Persian, and other RTL languages:

```typescript
@Component({
  template: `
    <ejs-menu 
      [items]="menuItems"
      [enableRtl]="true">
    </ejs-menu>
  `
})
export class MenuComponent { }
```

Or toggle dynamically:

```typescript
@ViewChild('menu')
public menuObj?: MenuComponent;

public toggleRtl(): void {
  this.menuObj!.enableRtl = !this.menuObj!.enableRtl;
}
```

### cssClass - Custom Styling

Add custom CSS classes to the menu wrapper:

```typescript
@Component({
  template: `
    <ejs-menu 
      [items]="menuItems"
      [cssClass]="'dark-theme gradient-bg custom-menu'">
    </ejs-menu>
  `,
  styles: [`
    :host ::ng-deep .dark-theme.e-menu {
      background: #2c3e50;
      color: #ecf0f1;
    }
    :host ::ng-deep .dark-theme.e-menu-item:hover {
      background: #34495e;
    }
  `]
})
export class MenuComponent { }
```

### hoverDelay - Control Submenu Open Delay

Set delay (in milliseconds) before submenu opens on hover. Useful to prevent accidental opening:

```typescript
@Component({
  template: `
    <ejs-menu 
      [items]="menuItems"
      [hoverDelay]="400">
    </ejs-menu>
  `
})
export class MenuComponent { }
```

With 400ms delay, submenus open after 400ms of hovering over an item.

### enableScrolling - Large Menu Support

Enable scrollbar when menu items exceed available space:

```typescript
@Component({
  template: `
    <ejs-menu 
      [items]="largeMenuItems"
      [enableScrolling]="true"
      [cssClass]="'scrollable-menu'"
      style="height: 300px;">
    </ejs-menu>
  `,
  styles: [`
    :host ::ng-deep .scrollable-menu {
      max-height: 300px;
      overflow-y: auto;
    }
  `]
})
export class MenuComponent {
  public largeMenuItems: MenuItemModel[] = [
    // ... 50+ items
  ];
}
```

### locale - Localization

Set UI language/culture:

```typescript
@Component({
  template: `
    <ejs-menu 
      [items]="menuItems"
      [locale]="'es-ES'">
    </ejs-menu>
  `
})
export class MenuComponent { }
```

Supported locales: `en-US` (default), `es-ES`, `fr-FR`, `de-DE`, `ar-AE`, `ja-JP`, `zh-CN`, etc.

### Running the Application

Start your application:
```bash
ng serve
```

The application will be available at `http://localhost:4200/`.

---

**Next:** Once your basic menu is set up, explore data binding and templates in [references/data-source-binding.md](data-source-binding.md) for dynamic menu population.
