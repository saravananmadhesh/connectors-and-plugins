# Getting Started with Angular Dropdown Tree

## Table of Contents
- [Setup Angular Environment](#setup-angular-environment)
- [Installing Syncfusion Package](#installing-syncfusion-package)
- [Module Registration](#module-registration)
- [CSS Configuration](#css-configuration)
- [Basic Component Integration](#basic-component-integration)
- [Binding Local Data](#binding-local-data)
- [Running the Application](#running-the-application)
- [Minimal Setup Example](#minimal-setup-example)

These dependencies are automatically installed with the main package.

## Setup Angular Environment

### Install Angular CLI

First, install the Angular CLI globally:

```bash
npm install -g @angular/cli
```

To install a specific version:

```bash
npm install -g @angular/cli@21.0.0
```

### Create a New Application

Generate a new Angular application using the CLI:

```bash
ng new syncfusion-dropdown-tree-app
```

When prompted, configure:
- **Stylesheet format:** CSS, SCSS, or Less
- **Routing:** Enable if needed for your application
- **Server-side rendering (SSR):** Choose based on your deployment needs

Navigate to your project:

```bash
cd syncfusion-dropdown-tree-app
```

**Note:** Angular 20+ generates simpler file structures (`app.ts`, `app.html`, `app.css`). Earlier versions use `.component.ts` suffixes.

## Installing Syncfusion Package

### Ivy Library Distribution (Angular 12+)

For Angular 12 and above, use the Ivy library distribution package:

```bash
npm install @syncfusion/ej2-angular-dropdowns --save
```

This is compatible with modern Angular versions (20+) and recommended for new projects.

### Legacy ngcc Package (Angular < 12)

For Angular versions below 12, use the ngcc (Angular compatibility compiler) package:

```bash
npm install @syncfusion/ej2-angular-dropdowns@ngcc --save
```

Update your `package.json`:

```json
{
  "dependencies": {
    "@syncfusion/ej2-angular-dropdowns": "20.2.38-ngcc"
  }
}
```

## Module Registration

Import the `DropDownTreeModule` in your Angular component or module:

### Standalone Component (Angular 14+)

```typescript
import { Component } from '@angular/core';
import { DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown-tree',
  template: `<ejs-dropdowntree id='dropdowntree'></ejs-dropdowntree>`,
  standalone: true,
  imports: [DropDownTreeModule, FormsModule, ReactiveFormsModule]
})
export class AppComponent {}
```

### NgModule (Traditional)

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, DropDownTreeModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## CSS Configuration

Add Syncfusion CSS files to your `src/styles.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/drop-down-tree/index.css";
```

**Alternative themes:** Replace `material3.css` with:
- `bootstrap5.css`
- `tailwind.css`
- `fluent.css`
- `fabric.css`

**Using Custom Resource Generator (CRG):**

For optimized, combined styles, use Syncfusion's CRG.

## Basic Component Integration

Create a simple Dropdown Tree component in `src/app/app.component.ts`:

```typescript
import { Component } from '@angular/core';
import { DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `<ejs-dropdowntree id='dropdowntree'></ejs-dropdowntree>`,
  standalone: true,
  imports: [DropDownTreeModule, FormsModule, ReactiveFormsModule]
})
export class AppComponent {}
```

## Binding Local Data

The real power of Dropdown Tree is hierarchical data binding. Here's a complete example:

```typescript
import { Component } from '@angular/core';
import { DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `<ejs-dropdowntree id='dropdowntree' 
                [fields]='fields' 
                placeholder='Select a category'></ejs-dropdowntree>`,
  standalone: true,
  imports: [DropDownTreeModule, FormsModule, ReactiveFormsModule]
})
export class AppComponent {
  // Hierarchical data: each parent has a 'nodeChild' array
  public data = [
    {
      nodeId: '01', nodeText: 'Music',
      nodeChild: [
        { nodeId: '01-01', nodeText: 'Gouttes.mp3' }
      ]
    },
    {
      nodeId: '02', nodeText: 'Videos', expanded: true,
      nodeChild: [
        { nodeId: '02-01', nodeText: 'Naturals.mp4' },
        { nodeId: '02-02', nodeText: 'Wild.mpeg' }
      ]
    },
    {
      nodeId: '03', nodeText: 'Documents',
      nodeChild: [
        { nodeId: '03-01', nodeText: 'Environment Pollution.docx' },
        { nodeId: '03-02', nodeText: 'Global Warming.ppt' },
        { nodeId: '03-03', nodeText: 'Social Network.pdf' }
      ]
    }
  ];

  // Map data fields: value → nodeId, text → nodeText, child → nodeChild
  public fields = {
    dataSource: this.data,
    value: 'nodeId',
    text: 'nodeText',
    child: 'nodeChild'
  };
}
```

**Field mapping explained:**
- `value`: Unique identifier for each item (e.g., `nodeId`)
- `text`: Display text shown in the tree (e.g., `nodeText`)
- `child`: Array property containing child items (e.g., `nodeChild`)

## Running the Application

Start the development server:

```bash
ng serve --open
```

This will:
1. Compile your Angular application
2. Start a local development server (typically at `http://localhost:4200`)
3. Automatically open the application in your default browser

You should see the Dropdown Tree component rendered with the hierarchical data categories (Music, Videos, Documents).

**Tip:** The development server watches for file changes and automatically reloads when you modify code.

## Minimal Setup Example

For a quick start with minimal configuration:

```typescript
import { Component } from '@angular/core';
import { DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-minimal',
  template: `<ejs-dropdowntree [fields]='fields' placeholder='Select'></ejs-dropdowntree>`,
  standalone: true,
  imports: [DropDownTreeModule, FormsModule, ReactiveFormsModule]
})
export class MinimalComponent {
  public data = [
    { id: '1', text: 'Item 1', child: [{ id: '1-1', text: 'Item 1.1' }] },
    { id: '2', text: 'Item 2' }
  ];

  public fields = { dataSource: this.data, value: 'id', text: 'text', child: 'child' };
}
```

This is the bare minimum needed to render a functional Dropdown Tree component.

## Troubleshooting

**Issue:** "DropDownTreeModule not found"
- **Solution:** Verify `@syncfusion/ej2-angular-dropdowns` is installed: `npm list @syncfusion/ej2-angular-dropdowns`

**Issue:** Styles not applied
- **Solution:** Check CSS imports in `styles.css`. Ensure all required Syncfusion CSS files are imported.

**Issue:** Data not displaying
- **Solution:** Verify field mappings in the `fields` property match your data structure (value, text, child properties).

**Issue:** "Cannot find module '@syncfusion/ej2-data'"
- **Solution:** Install data module: `npm install @syncfusion/ej2-data --save`
