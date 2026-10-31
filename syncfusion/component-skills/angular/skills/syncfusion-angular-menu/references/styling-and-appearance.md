# Styling and Appearance

## Table of Contents
- [Theme Selection](#theme-selection)
- [CSS Customization](#css-customization)
- [Custom CSS Classes](#custom-css-classes)
- [Rounded Corners](#rounded-corners)
- [Title and Icon Styling](#title-and-icon-styling)
- [Advanced Styling](#advanced-styling)

## Theme Selection

Syncfusion Menu supports multiple built-in themes. Include the appropriate CSS file in your `styles.css`:

### Available Themes

```css
/* Material Design 3 (Recommended) */
@import '../node_modules/@syncfusion/ej2-base/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-navigations/styles/material3.css';

/* Material Design */
@import '../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../node_modules/@syncfusion/ej2-navigations/styles/material.css';

/* Bootstrap 5 */
@import '../node_modules/@syncfusion/ej2-base/styles/bootstrap5.css';
@import '../node_modules/@syncfusion/ej2-navigations/styles/bootstrap5.css';

/* Fluent 2 */
@import '../node_modules/@syncfusion/ej2-base/styles/fluent2.css';
@import '../node_modules/@syncfusion/ej2-navigations/styles/fluent2.css';

/* Tailwind CSS */
@import '../node_modules/@syncfusion/ej2-base/styles/tailwind.css';
@import '../node_modules/@syncfusion/ej2-navigations/styles/tailwind.css';

/* Fabric Theme */
@import '../node_modules/@syncfusion/ej2-base/styles/fabric.css';
@import '../node_modules/@syncfusion/ej2-navigations/styles/fabric.css';

/* High Contrast */
@import '../node_modules/@syncfusion/ej2-base/styles/highcontrast.css';
@import '../node_modules/@syncfusion/ej2-navigations/styles/highcontrast.css';
```

### Complete Theme Setup

```typescript
// app.component.ts
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
      items: [{ text: 'Open' }, { text: 'Save' }]
    },
    { text: 'Edit' }
  ];
}
```

`styles.css`:
```css
@import '../node_modules/@syncfusion/ej2-base/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-navigations/styles/material3.css';
```

## CSS Customization

### Global Menu Styling

Override default styles in your component or global CSS:

```css
/* Menu container */
.e-menu {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
}

/* Menu items */
.e-menu .e-menu-item {
  padding: 10px 16px;
  font-size: 14px;
  color: #333;
}

/* Hover state */
.e-menu .e-menu-item:hover {
  background-color: #e8f4f8;
  color: #0078d4;
}

/* Active state */
.e-menu .e-menu-item.e-active {
  background-color: #0078d4;
  color: white;
}

/* Submenu */
.e-menu .e-ul {
  background-color: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

/* Icons in menu items */
.e-menu .e-menu-item::before {
  margin-right: 8px;
}
```

### Component-Level Styling

Style the menu within a specific component:

```typescript
import { Component } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="custom-menu-container">
      <ejs-menu [items]="menuItems" cssClass="custom-menu"></ejs-menu>
    </div>
  `,
  styles: [`
    .custom-menu-container {
      padding: 10px;
    }

    .custom-menu {
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    }

    .custom-menu .e-menu-item {
      color: white;
      font-weight: 500;
    }

    .custom-menu .e-menu-item:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  `]
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    { text: 'File' },
    { text: 'Edit' },
    { text: 'View' }
  ];
}
```

## Custom CSS Classes

Apply custom CSS classes to menu items using the `htmlAttributes` property:

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
  `,
  styles: [`
    .menu-danger {
      color: #e74c3c !important;
    }

    .menu-success {
      color: #27ae60 !important;
    }

    .menu-warning {
      color: #f39c12 !important;
    }

    .menu-special {
      font-weight: bold;
      font-size: 16px;
    }
  `]
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    {
      text: 'File',
      htmlAttributes: { class: 'menu-special' },
      items: [
        { text: 'Delete', htmlAttributes: { class: 'menu-danger' } },
        { text: 'Save', htmlAttributes: { class: 'menu-success' } }
      ]
    },
    {
      text: 'Edit',
      items: [
        { text: 'Warning', htmlAttributes: { class: 'menu-warning' } }
      ]
    }
  ];
}
```

## Rounded Corners

Apply rounded corners to the menu container and items:

```css
/* Rounded menu container */
.e-menu {
  border-radius: 8px;
  overflow: hidden;
}

/* Rounded menu items */
.e-menu .e-menu-item {
  border-radius: 4px;
  margin: 2px;
}

/* Rounded submenu */
.e-menu .e-ul {
  border-radius: 8px;
}
```

### Complete Rounded Corner Example

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
      <ejs-menu [items]="menuItems" cssClass="rounded-menu"></ejs-menu>
    </div>
  `,
  styles: [`
    .rounded-menu {
      border-radius: 12px;
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      overflow: hidden;
    }

    .rounded-menu .e-menu-item {
      border-radius: 6px;
      margin: 4px 8px;
      transition: all 0.3s ease;
    }

    .rounded-menu .e-menu-item:hover {
      background-color: #e9ecef;
      border-radius: 6px;
    }

    .rounded-menu .e-ul {
      border-radius: 8px;
      margin-top: 4px;
    }
  `]
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    {
      text: 'File',
      items: [
        { text: 'New' },
        { text: 'Open' },
        { text: 'Save' }
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
    { text: 'Help' }
  ];
}
```

## Title and Icon Styling

### Icon Styling

```css
/* Icon color */
.e-menu .e-menu-item .e-icon {
  color: #667eea;
  font-size: 16px;
}

/* Icon spacing */
.e-menu .e-menu-item .e-icon {
  margin-right: 10px;
}

/* Hover icon color */
.e-menu .e-menu-item:hover .e-icon {
  color: #764ba2;
}
```

### Title Styling

```css
/* Menu title text */
.e-menu .e-menu-item {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;
  letter-spacing: 0.5px;
}

/* Submenu title emphasis */
.e-menu .e-menu-item.e-level-1 {
  font-weight: 700;
  font-size: 15px;
}

/* Menu item text alignment */
.e-menu .e-menu-item {
  text-align: left;
  justify-content: flex-start;
}
```

### Combined Icon and Title Example

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
      <ejs-menu [items]="menuItems" cssClass="styled-menu"></ejs-menu>
    </div>
  `,
  styles: [`
    .styled-menu {
      background-color: #2c3e50;
      border-radius: 8px;
    }

    .styled-menu .e-menu-item {
      color: #ecf0f1;
      padding: 12px 16px;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .styled-menu .e-menu-item:hover {
      background-color: #34495e;
      color: #3498db;
      padding-left: 20px;
    }

    .styled-menu .e-menu-item .e-icon {
      color: #3498db;
      margin-right: 12px;
      font-size: 18px;
    }

    .styled-menu .e-menu-item:hover .e-icon {
      color: #2ecc71;
    }

    .styled-menu .e-ul {
      background-color: #34495e;
      border-left: 3px solid #3498db;
    }
  `]
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    {
      text: 'Dashboard',
      iconCss: 'e-icons e-dashboard',
      items: [
        { text: 'Analytics', iconCss: 'e-icons e-chart' },
        { text: 'Reports', iconCss: 'e-icons e-report' }
      ]
    },
    {
      text: 'Settings',
      iconCss: 'e-icons e-settings',
      items: [
        { text: 'General', iconCss: 'e-icons e-settings' },
        { text: 'Security', iconCss: 'e-icons e-lock' }
      ]
    }
  ];
}
```

## Advanced Styling

### Dark Theme

```css
.dark-theme {
  background-color: #1e1e1e;
  color: #e0e0e0;
}

.dark-theme .e-menu-item {
  color: #e0e0e0;
  border-color: #333;
}

.dark-theme .e-menu-item:hover {
  background-color: #333;
  color: #fff;
}

.dark-theme .e-ul {
  background-color: #262626;
  border-color: #404040;
}
```

### Light Theme with Accent

```css
.light-accent {
  background-color: #ffffff;
  border: 1px solid #e8e8e8;
}

.light-accent .e-menu-item {
  color: #424242;
  border-radius: 4px;
}

.light-accent .e-menu-item:hover {
  background-color: #f5f5f5;
  color: #1976d2;
  border-left: 3px solid #1976d2;
}

.light-accent .e-ul {
  background-color: #fafafa;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
```

### Gradient Background

```css
.gradient-menu {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.gradient-menu .e-menu-item {
  color: white;
  font-weight: 500;
}

.gradient-menu .e-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
}

.gradient-menu .e-ul {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}
```

### Complete Advanced Styling Example

```typescript
@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <ejs-menu [items]="menuItems" cssClass="premium-menu"></ejs-menu>
    </div>
  `,
  styles: [`
    .premium-menu {
      background: linear-gradient(90deg, #1e3a8a 0%, #1e40af 100%);
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      padding: 8px;
    }

    .premium-menu .e-menu-item {
      color: #ffffff;
      padding: 12px 16px;
      margin: 4px 0;
      border-radius: 8px;
      font-weight: 500;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .premium-menu .e-menu-item:hover {
      background-color: rgba(255, 255, 255, 0.2);
      transform: translateX(4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .premium-menu .e-menu-item .e-icon {
      color: #60a5fa;
      margin-right: 12px;
    }

    .premium-menu .e-ul {
      background-color: rgba(30, 64, 175, 0.95);
      border-radius: 8px;
      backdrop-filter: blur(10px);
    }
  `]
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    {
      text: 'Home',
      iconCss: 'e-icons e-home'
    },
    {
      text: 'Services',
      iconCss: 'e-icons e-settings',
      items: [
        { text: 'Consulting', iconCss: 'e-icons e-info' },
        { text: 'Development', iconCss: 'e-icons e-code' }
      ]
    }
  ];
}
```

---

**Next:** For advanced features like RTL support and scrolling, see [references/advanced-features.md](advanced-features.md).
