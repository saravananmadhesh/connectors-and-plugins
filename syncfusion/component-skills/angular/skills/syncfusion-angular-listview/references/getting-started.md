# Getting Started with Syncfusion Angular ListView

## Table of Contents
- [Setup Angular Environment](#setup-angular-environment)
- [Create a New Application](#create-a-new-application)
- [Using Angular Schematics (Quick Setup)](#using-angular-schematics-quick-setup)
- [Installing ListView Package](#installing-listview-package)
- [Adding CSS Styles](#adding-css-styles)
- [Creating Your First ListView](#creating-your-first-listview)
- [Running the Application](#running-the-application)

---

## Setup Angular Environment

**Install Angular CLI globally:**
```bash
npm install -g @angular/cli
```

To install a specific version of Angular CLI:
```bash
npm install -g @angular/cli@21.0.0
```

> **Angular 21 Standalone Architecture:** Standalone components are the default in Angular 21+, providing a simpler development model without the need for NgModule declarations. This guide uses the modern standalone architecture.

---

## Create a New Application

**Generate a new Angular application:**
```bash
ng new syncfusion-angular-app
```

This command will prompt you to configure settings:
- **Stylesheet format:** Choose CSS, SCSS, LESS, or Sass
- **Routing:** Enable if you need routing
- **Server-side rendering (SSR):** Configure as needed
- **AI tools:** Select optional AI tooling

**Example with SCSS styling:**
```bash
ng new syncfusion-angular-app --style=scss
```

**Navigate to your project:**
```bash
cd syncfusion-angular-app
```

> **Note:** Angular 20+ uses simplified file names (`app.ts`, `app.html`, `app.css`) without the `.component.` suffix, while Angular 19 and below use `app.component.ts`, `app.component.html`, etc.

---

## Using Angular Schematics (Quick Setup)

Angular schematics automate the setup process, handling dependency installation, module injection, and style imports in a single command.

> **Requirement:** Angular CLI v6 or later (check version: `ng --version`)

### Quick Start with Schematics

**Step 1: Add ListView package with schematics:**
```bash
ng add @syncfusion/ej2-angular-lists
```

This command automatically:
- Installs the `@syncfusion/ej2-angular-lists` package
- Updates `package.json` with dependencies
- Imports `ListViewModule` into your module/standalone configuration
- Adds required CSS theme imports

**Step 2: Generate a pre-configured ListView component:**

Generate a default ListView:
```bash
ng generate @syncfusion/ej2-angular-lists:listview-default --name=my-listview
```

Generate specific features:

| Feature | Command |
|---------|---------|
| **Checklist** | `ng generate @syncfusion/ej2-angular-lists:listview-checklist --name=my-checklist` |
| **Nested List** | `ng generate @syncfusion/ej2-angular-lists:listview-nestedlist --name=my-nested-list` |
| **Remote Data** | `ng generate @syncfusion/ej2-angular-lists:listview-remotelist --name=my-remote-list` |
| **Templates** | `ng generate @syncfusion/ej2-angular-lists:listview-template --name=my-template-list` |
| **Virtualization** | `ng generate @syncfusion/ej2-angular-lists:listview-virtualization --name=my-virtual-list` |

**Step 3: Run your application:**
```bash
ng serve --open
```

**Benefits of Schematics:**
✅ Zero manual configuration  
✅ Automatic dependency resolution  
✅ Pre-configured components with best practices  
✅ Consistent project structure  
✅ Reduced setup time from 10+ minutes to < 1 minute  

---

## Installing ListView Package

### Ivy Library Distribution (Recommended for Angular 12+)

**Install the Syncfusion ListView package:**
```bash
npm install @syncfusion/ej2-angular-lists --save
```

This package includes:
- ListView component with all features
- Supporting components and utilities
- Type definitions for TypeScript

### Legacy ngcc Package (For Angular Below 12)

**For older Angular versions, install the ngcc package:**
```bash
npm install @syncfusion/ej2-angular-lists@ngcc --save
```

**Update package.json manually if needed:**
```json
{
  "dependencies": {
    "@syncfusion/ej2-angular-lists": "20.2.38-ngcc"
  }
}
```

> The ngcc package supports older Angular compilation pipelines. If installing without explicit tag, the Ivy package will be installed by default.

---

## Adding CSS Styles

**Add ListView component styles to `src/styles.css` or `styles.scss`:**

```css
/* Import base theme */
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/list-view/index.css";
```

**Available theme options:**
- `material3.css` - Material Design 3 (recommended)
- `bootstrap5.css` - Bootstrap 5 theme
- `fabric.css` - Microsoft Fabric theme
- `tailwind.css` - Tailwind CSS theme

**For CheckList functionality, also add Button styles:**
```css
@import "../node_modules/@syncfusion/ej2-angular-buttons/styles/material3.css";
```

> **Alternative:** Use [CRG (Syncfusion Custom Resource Generator)](https://crg.syncfusion.com/) to generate combined component styles.

---

## Creating Your First ListView

### Basic ListView with String Data

**Modify `src/app/app.component.ts` (or `app.ts` for Angular 20+):**

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-listview 
      id='sample-list' 
      [dataSource]='data'>
    </ejs-listview>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Simple array of strings
  public data: string[] = [
    'Artwork',
    'Abstract',
    'Modern Painting',
    'Ceramics',
    'Animation Art',
    'Oil Painting'
  ];
}
```

### ListView with Object Data and Field Mapping

**When working with complex objects:**

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-listview 
      id='device-list' 
      [dataSource]='data' 
      [fields]='fields'
      [showHeader]='true'
      [headerTitle]='headerTitle'>
    </ejs-listview>
  `
})
export class AppComponent {
  public data: Object[] = [
    { 'Name': 'Display', 'id': 'list-01' },
    { 'Name': 'Notification', 'id': 'list-02' },
    { 'Name': 'Sound', 'id': 'list-03' },
    { 'Name': 'Apps', 'id': 'list-04' },
    { 'Name': 'Storage', 'id': 'list-05' },
    { 'Name': 'Battery', 'id': 'list-06' }
  ];

  // Map object properties to ListView fields
  public fields: Object = { 
    text: 'Name',      // Map Name property to display text
    id: 'id',          // Map id for unique identification
    tooltip: 'Name'    // Show Name as tooltip on hover
  };

  public headerTitle: string = 'Device Settings';
}
```

### ListView with Headers and Custom Styling

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-listview 
      id='fruits-list' 
      [dataSource]='data'
      [showHeader]='true'
      [headerTitle]='headerTitle'
      cssClass='custom-listview'>
    </ejs-listview>
  `,
  styles: [`
    .custom-listview {
      max-width: 400px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  `]
})
export class AppComponent {
  public data: string[] = [
    'Date', 'Fig', 'Apple', 'Apricot', 'Grape',
    'Strawberry', 'Pineapple', 'Melon', 'Lemon', 'Cherry'
  ];

  public headerTitle: string = 'Fruits';
}
```

---

## Running the Application

**Start the development server:**
```bash
ng serve --open
```

The `--open` flag automatically opens the application in your default browser at `http://localhost:4200`.

**Output will display your ListView component** with the data items rendered in a list format.

---

## Common Setup Issues and Solutions

### Issue: Styles Not Loading
**Solution:** Ensure CSS imports are in the main `styles.css` file, not component-level CSS files.

### Issue: Module Not Found Error
**Solution:** Verify the package is installed:
```bash
npm list @syncfusion/ej2-angular-lists
```

### Issue: Standalone Component Errors
**Solution:** Ensure you're importing `ListViewModule` in the component's `imports` array (not `declarations`).

### Issue: Theme Looks Different
**Solution:** Make sure you're importing the correct theme CSS file matching your needs (Material3, Bootstrap5, etc.).

---

## Next Steps

- **Display data dynamically:** See [Data Binding](./data-binding.md)
- **Customize appearance:** See [Customization and Templates](./customization-and-templates.md)
- **Add interactivity:** See [Selection and Items](./selection-and-items.md)
- **Improve performance:** See [Advanced Features](./advanced-features.md)

---

## Key Takeaways

✅ Install `@syncfusion/ej2-angular-lists` package  
✅ Import styles in main `styles.css` file  
✅ Import `ListViewModule` in component's `imports` array  
✅ Use standalone components (Angular 21+ default)  
✅ Bind data via `[dataSource]` property  
✅ Map complex objects using `[fields]` property  
