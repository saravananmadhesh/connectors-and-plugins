# SystemJS Setup for Syncfusion Angular Sidebar

## Table of Contents
- [Overview](#overview)
- [Installation and Configuration](#installation-and-configuration)
- [SystemJS Configuration](#systemjs-configuration)
- [Adding Styles](#adding-styles)
- [Creating a Sidebar Component](#creating-a-sidebar-component)
- [Running the Application](#running-the-application)
- [Comparison: SystemJS vs Angular CLI](#comparison-systemjs-vs-angular-cli)

## Overview

**SystemJS** is an alternative module loader for Angular applications that provides dynamic module loading and development flexibility. While modern Angular projects typically use **Webpack** (via Angular CLI), SystemJS remains a valid option for specific use cases:

- Legacy projects using SystemJS
- Development environments preferring dynamic module loading
- Projects requiring UMD bundle support
- Alternative build tooling workflows

> ⚠️ **Note:** Angular CLI is the **recommended and modern approach** for new projects. Use SystemJS only if you have specific requirements or legacy constraints.

## Installation and Configuration

### Step 1: Clone Angular QuickStart Repository

The Angular QuickStart repository provides a pre-configured SystemJS setup:

```bash
git clone https://github.com/angular/quickstart.git quickstart
cd quickstart
npm install
```

This sets up the basic Angular environment with SystemJS already configured.

### Step 2: Install Syncfusion Sidebar Package

Install the Syncfusion Angular Navigations package that includes the Sidebar component:

```bash
npm install @syncfusion/ej2-angular-navigations --save
```

This command installs:
- `@syncfusion/ej2-angular-navigations` - Sidebar and Navigation components
- `@syncfusion/ej2-base` - Base utilities and classes
- `@syncfusion/ej2-data` - Data management services
- `@syncfusion/ej2-angular-base` - Angular-specific wrappers
- Other dependent packages

All packages are installed with UMD bundles compatible with SystemJS.

## SystemJS Configuration

### Configure systemjs.config.js

The `systemjs.config.js` file in your project root tells SystemJS how to load modules. Add mappings for Syncfusion packages:

```javascript
/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/',
      "syncfusion:": "node_modules/@syncfusion/", // Syncfusion alias
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      'app': 'app',

      // Angular bundles - UMD format
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

      // Syncfusion bundles - UMD format
      "@syncfusion/ej2-base": "syncfusion:ej2-base/dist/ej2-base.umd.min.js",
      "@syncfusion/ej2-data": "syncfusion:ej2-data/dist/ej2-data.umd.min.js",
      "@syncfusion/ej2-navigations": "syncfusion:ej2-navigations/dist/ej2-navigations.umd.min.js",
      "@syncfusion/ej2-inputs": "syncfusion:ej2-inputs/dist/ej2-inputs.umd.min.js",
      "@syncfusion/ej2-lists": "syncfusion:ej2-lists/dist/ej2-lists.umd.min.js",
      "@syncfusion/ej2-popups": "syncfusion:ej2-popups/dist/ej2-popups.umd.min.js",
      "@syncfusion/ej2-buttons": "syncfusion:ej2-buttons/dist/ej2-buttons.umd.min.js",
      "@syncfusion/ej2-splitbuttons": "syncfusion:ej2-splitbuttons/dist/ej2-splitbuttons.umd.min.js",
      "@syncfusion/ej2-angular-base": "syncfusion:ej2-angular-base/dist/ej2-angular-base.umd.min.js",
      "@syncfusion/ej2-angular-navigations": "syncfusion:ej2-angular-navigations/dist/ej2-angular-navigations.umd.min.js",

      // other libraries
      'rxjs': 'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        defaultExtension: 'js',
        meta: {
          './*.js': {
            loader: 'systemjs-angular-loader.js'
          }
        }
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });
})(this);
```

### Key Configuration Points

| Element | Purpose |
|---------|---------|
| `paths` | Create aliases for commonly used folders (npm:, syncfusion:) |
| `map` | Map module names to their physical locations in node_modules |
| `packages` | Define how specific packages should be loaded |
| Syncfusion UMD paths | Point to pre-built `.umd.min.js` files in each package |

## Adding Styles

Import Syncfusion CSS themes in your main `styles.css` file:

```css
/* Material3 theme for Syncfusion components */
@import '../../node_modules/@syncfusion/ej2-base/styles/material3.css';

/* Navigation components theme (includes Sidebar) */
@import '../../node_modules/@syncfusion/ej2-angular-navigations/styles/material3.css';
```

### Available Themes

Replace `material3` with your preferred theme:
- `material` - Material Design
- `material3` - Material Design 3
- `bootstrap` - Bootstrap Theme
- `bootstrap5` - Bootstrap 5 Theme
- `fluent` - Fluent Design
- `tailwind` - Tailwind CSS Theme
- `highcontrast` - High Contrast Theme

### Using Custom Resource Generator (CRG)

For combined component styles and reduced file size, use [Syncfusion CRG](https://crg.syncfusion.com/):

1. Select components and themes you need
2. Download the combined CSS file
3. Add to your project and reference instead of individual imports

## Creating a Sidebar Component

### Step 1: Create Component Template

Create the Sidebar component in your `app.component.ts`:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
    <ejs-sidebar 
      id="default-sidebar" 
      #sidebar 
      (created)="onCreated($event)" 
      style="visibility: hidden">
      <div class="sidebar-header">
        <h3>Navigation</h3>
      </div>
      <ul class="sidebar-menu">
        <li><a href="#">Home</a></li>
        <li><a href="#">Products</a></li>
        <li><a href="#">Settings</a></li>
        <li><a href="#">About</a></li>
      </ul>
    </ejs-sidebar>
    
    <div>
      <div class="topbar">
        <button (click)="toggleSidebar()">☰ Menu</button>
        <h2>Main Content</h2>
      </div>
      <div class="content">
        <p>Welcome to Sidebar with SystemJS</p>
        <p>Click the menu button to toggle the sidebar.</p>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;

  onCreated(args: any) {
    // Make sidebar visible after creation
    (this.sidebar as SidebarComponent).element.style.visibility = '';
  }

  toggleSidebar() {
    this.sidebar?.toggle();
  }
}
```

### Step 2: Add Component Styles

Create `app.component.css`:

```css
.topbar {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.topbar button {
  padding: 8px 12px;
  font-size: 18px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.topbar button:hover {
  background-color: #0056b3;
}

.content {
  padding: 30px;
  font-size: 16px;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #f9f9f9;
}

.sidebar-header h3 {
  margin: 0;
  font-size: 18px;
}

.sidebar-menu {
  list-style: none;
  margin: 0;
  padding: 10px 0;
}

.sidebar-menu li {
  padding: 0;
}

.sidebar-menu a {
  display: block;
  padding: 12px 20px;
  text-decoration: none;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;
}

.sidebar-menu a:hover {
  background-color: #f5f5f5;
}
```

### Step 3: Create AppModule

Create the Angular module in `app.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SidebarModule } from '@syncfusion/ej2-angular-navigations';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    SidebarModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Step 4: Create Main Entry Point

Create `main.ts`:

```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
```

### Step 5: Create HTML Host File

Create `index.html` in the project root:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Syncfusion Sidebar with SystemJS</title>
  <base href="/">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
  <!-- Syncfusion Styles -->
  <link rel="stylesheet" href="styles.css">
  
  <!-- Zone.js for Angular -->
  <script src="node_modules/zone.js/bundles/zone.umd.js"></script>
</head>
<body>
  <app-root></app-root>
  
  <!-- SystemJS Configuration -->
  <script src="systemjs.config.js"></script>
  
  <!-- Bootstrap the Angular Module -->
  <script>
    System.import('app').catch(function(err) {
      console.error(err);
    });
  </script>
</body>
</html>
```

## Running the Application

### Development Server

Start the development server using npm:

```bash
npm start
```

This command:
- Starts a local web server (typically http://localhost:3000)
- Watches for file changes
- Automatically reloads the browser when changes are detected
- Shows compilation errors in console

### Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

You should see:
- A topbar with "Menu" button
- A sidebar that toggles when you click the button
- Main content area with welcome text

### Build for Production

Create an optimized build:

```bash
npm run build
```

This creates production-ready files in the `dist/` folder.

## Comparison: SystemJS vs Angular CLI

### SystemJS
| Aspect | Details |
|--------|---------|
| **Setup** | Clone QuickStart, configure systemjs.config.js |
| **Module Loading** | Dynamic module loading at runtime |
| **Bundle Format** | UMD (Universal Module Definition) |
| **Development** | Fast reload with System.import() |
| **Bundle Size** | Larger (UMD bundles unoptimized) |
| **Production** | Requires manual bundling and optimization |
| **Modern Support** | Limited, older Angular versions |
| **Learning Curve** | More manual configuration |

### Angular CLI (Recommended)
| Aspect | Details |
|--------|---------|
| **Setup** | `ng new` command, automated setup |
| **Module Loading** | Webpack-based static module bundling |
| **Bundle Format** | ES Modules with tree-shaking |
| **Development** | Fast rebuild with ng serve |
| **Bundle Size** | Optimized with tree-shaking |
| **Production** | Automated production optimization |
| **Modern Support** | Full support for latest Angular |
| **Learning Curve** | Convention-based, less configuration |

### When to Use Each

**Use SystemJS when:**
- Working with legacy projects already using SystemJS
- Requiring dynamic module loading capabilities
- Need quick development iteration with hot reload
- Working with specific hosting constraints

**Use Angular CLI when:**
- Starting new projects (default choice)
- Need modern tooling and optimization
- Want automated build and deployment
- Building production applications
- Team is using Angular CLI standards

## Next Steps

After setting up SystemJS:

1. **Customize the Sidebar** - Explore different sidebar types (Push, Slide, Over) from [Sidebar Positioning Guide](./sidebar-positioning.md)
2. **Add Content** - Use ListView or TreeView for structured navigation from [Sidebar Content Guide](./sidebar-content.md)
3. **Configure Interactions** - Control behavior with show(), hide(), toggle() from [Sidebar Interactions Guide](./sidebar-interactions.md)
4. **Apply Animations** - Add visual effects from [Animations and Styling Guide](./animations-and-styles.md)
5. **Troubleshoot Issues** - Refer to [Advanced Features Guide](./advanced-features.md) for common problems

## Related References

- [Angular CLI Setup (Recommended)](./getting-started.md) - Modern approach using Angular CLI
- [Sidebar Positioning](./sidebar-positioning.md) - Explore different sidebar types and positions
- [Sidebar Interactions](./sidebar-interactions.md) - Control methods and event handling
- [Official Angular SystemJS Guide](https://angular.io/guide/setup-local) - Angular documentation
- [SystemJS Official Repository](https://github.com/systemjs/systemjs) - SystemJS project

## Troubleshooting

### Module Not Found Errors

**Problem:** `System.import()` fails with "module not found"

**Solution:**
- Verify all Syncfusion modules are mapped in `systemjs.config.js`
- Check that npm packages are installed: `npm install`
- Ensure paths in systemjs.config.js match actual node_modules structure

### Styles Not Loading

**Problem:** Sidebar appears unstyled or broken

**Solution:**
- Verify CSS imports in `styles.css` are correct
- Check that theme files exist in node_modules
- Use browser DevTools to confirm CSS files are loaded
- Verify `<link>` tag references correct path

### Sidebar Not Displaying

**Problem:** Sidebar div or content doesn't appear

**Solution:**
- Check that `style="visibility: hidden"` is set and `onCreated()` removes it
- Verify SidebarModule is imported in AppModule
- Check browser console for JavaScript errors
- Confirm Sidebar component template is in app.component.ts

### Port Already in Use

**Problem:** `npm start` fails - port 3000 already in use

**Solution:**
```bash
# Kill process on port 3000 (Windows PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Or specify different port
npm start -- --port 3001
```
