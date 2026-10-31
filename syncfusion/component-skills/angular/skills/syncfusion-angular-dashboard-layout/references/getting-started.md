# Getting Started with Dashboard Layout

## Table of Contents
- [Angular Environment Setup](#angular-environment-setup)
- [Installing the Package](#installing-the-package)
- [Adding CSS Stylesheets](#adding-css-stylesheets)
- [Creating Your First Dashboard](#creating-your-first-dashboard)
- [Understanding Panel Properties](#understanding-panel-properties)
- [Next Steps](#next-steps)

## Angular Environment Setup

The Dashboard Layout component requires an Angular environment with proper tooling. Begin by installing the Angular CLI, which streamlines project creation and development.

### Install Angular CLI

```bash
npm install -g @angular/cli
```

### Create a New Angular Project

```bash
ng new dashboard-layout-app
cd dashboard-layout-app
```

During setup, you'll be prompted to choose a stylesheet format (CSS, SCSS, LESS). The default CSS is sufficient for this guide.

### Angular 21 Standalone Architecture

Dashboard Layout works with both module-based and standalone component architectures. The examples here use **standalone components** (default in Angular 21+), which is the recommended modern approach.

## Installing the Package

### Step 1: Add Syncfusion Dashboard Layout Package

Install the `@syncfusion/ej2-angular-layouts` package via npm:

```bash
npm install @syncfusion/ej2-angular-layouts --save
```

This package includes:
- Core layout library (@syncfusion/ej2-layouts)
- Base utilities (@syncfusion/ej2-base)
- Angular bindings (@syncfusion/ej2-angular-base)

### Step 2: Verify Package Installation

Check your `package.json` file to confirm the package is listed:

```json
{
  "dependencies": {
    "@syncfusion/ej2-angular-layouts": "^20.2.38"
  }
}
```

**Note:** For Angular versions below 12, use the ngcc (Angular Compatibility Compiler) package:

```bash
npm install @syncfusion/ej2-angular-layouts@ngcc --save
```

## Adding CSS Stylesheets

Dashboard Layout requires CSS imports to display properly. Import both the base and layout component styles.

### Add to Your Global Styles

Edit `src/styles.css` and add these imports at the top:

```css
@import "../node_modules/@syncfusion/ej2-base/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-angular-layouts/styles/material3.css";
```

**Available Themes:**
- `material3.css` - Modern Material Design 3
- `bootstrap5.css` - Bootstrap 5 styling
- `fabric.css` - Microsoft Fabric design
- `tailwind.css` - Tailwind CSS theme

Choose the theme that matches your project's design system.

### Alternative: Component-Level Styles

You can also import styles within your component:

```typescript
import { Component } from '@angular/core';
import '@syncfusion/ej2-base/styles/material3.css';
import '@syncfusion/ej2-angular-layouts/styles/material3.css';

@Component({
  selector: 'app-root',
  template: `...`
})
export class AppComponent { }
```

## Creating Your First Dashboard

### Approach 1: HTML Attributes (Simple)

Define panels directly in the template using data attributes:

```typescript
import { Component } from '@angular/core';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardLayoutModule],
  template: `
    <div class="control-section">
      <ejs-dashboardlayout id="defaultLayout" [columns]="5" [cellSpacing]="[10, 10]">
        <div id="panel1" class="e-panel" data-row="0" data-col="0" data-sizeX="1" data-sizeY="1">
          <span id="close" class="e-template-icon e-clear-icon"></span>
          <div class="e-panel-container">
            <div class="content">Panel 1</div>
          </div>
        </div>
        <div id="panel2" class="e-panel" data-row="0" data-col="1" data-sizeX="2" data-sizeY="1">
          <span id="close" class="e-template-icon e-clear-icon"></span>
          <div class="e-panel-container">
            <div class="content">Panel 2</div>
          </div>
        </div>
      </ejs-dashboardlayout>
    </div>
  `,
  styles: [`
    .control-section { width: 100%; height: 100vh; }
    .e-panel { background: #f5f5f5; }
    .content { padding: 20px; text-align: center; font-weight: bold; }
  `]
})
export class AppComponent { }
```

### Approach 2: Property Binding (Recommended)

Define panels in the component class for better control and dynamic updates:

```typescript
import { Component } from '@angular/core';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardLayoutModule],
  template: `
    <div class="control-section">
      <ejs-dashboardlayout 
        id="defaultLayout" 
        [columns]="5" 
        [cellSpacing]="[10, 10]"
        [panels]="panels">
      </ejs-dashboardlayout>
    </div>
  `,
  styles: [`
    .control-section { width: 100%; height: 100vh; }
    .e-panel { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    .content { padding: 30px; text-align: center; color: white; font-weight: bold; }
  `]
})
export class AppComponent {
  public panels: any = [
    {
      id: 'panel1',
      sizeX: 1,
      sizeY: 1,
      row: 0,
      col: 0,
      header: '<div class="header">Sales</div>',
      content: '<div class="content">$45,000</div>'
    },
    {
      id: 'panel2',
      sizeX: 2,
      sizeY: 1,
      row: 0,
      col: 1,
      header: '<div class="header">Revenue</div>',
      content: '<div class="content">$120,000</div>'
    },
    {
      id: 'panel3',
      sizeX: 1,
      sizeY: 2,
      row: 0,
      col: 3,
      header: '<div class="header">Growth</div>',
      content: '<div class="content">+25%</div>'
    }
  ];
}
```

## Understanding Panel Properties

### Basic Properties

```typescript
{
  id: 'unique-panel-id',        // Unique identifier for this panel
  row: 0,                        // Starting grid row (0-based)
  col: 0,                        // Starting grid column (0-based)
  sizeX: 1,                      // Width in grid cells
  sizeY: 1,                      // Height in grid cells
  header: '<div>Title</div>',    // Optional header content
  content: '<div>Body</div>'     // Panel content (HTML string)
}
```



## Running Your Application

Start the development server:

```bash
npm start
```

This runs `ng serve` by default. Open your browser to `http://localhost:4200` to see your dashboard.

### Hot Reloading

Angular CLI watches for file changes and automatically reloads the browser, making development fast and interactive.

## Key Concepts

### Grid System

The Dashboard Layout uses a **grid-based coordinate system**:
- **Columns:** Total grid columns (e.g., 5 columns divides width into 5 equal parts)
- **Rows:** Auto-calculated based on panel positions
- **Cells:** Individual grid units where panels snap to positions

**Example:** With 5 columns, each cell takes 20% of the dashboard width.

### Cell Spacing

Defined as `[horizontal, vertical]` spacing in pixels:

```typescript
[cellSpacing]="[10, 10]"  // 10px horizontal, 10px vertical spacing
```

### Panel Positioning

Panels are positioned using grid coordinates:
- `row: 0, col: 0` = Top-left
- `row: 0, col: 1` = Next to it horizontally
- `row: 1, col: 0` = Below first panel

### Panel Sizing

Size is measured in **grid cells**, not pixels:
- `sizeX: 1` = 1 cell width (20% with 5 columns)
- `sizeX: 2` = 2 cells width (40% with 5 columns)
- `sizeY: 1` = 1 cell height

## Quick Start Example

Here's a complete working example to get started immediately:

```typescript
import { Component } from '@angular/core';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardLayoutModule],
  template: `
    <div class="control-section">
      <ejs-dashboardlayout 
        id="defaultLayout"
        [columns]="5"
        [cellSpacing]="[10, 10]"
        [panels]="panels">
      </ejs-dashboardlayout>
    </div>
  `,
  styles: [`
    .control-section { width: 100%; height: 100vh; }
    .content { padding: 20px; text-align: center; }
  `]
})
export class AppComponent {
  public panels = [
    { sizeX: 1, sizeY: 1, row: 0, col: 0, content: '<div class="content">Panel 1</div>' },
    { sizeX: 2, sizeY: 1, row: 0, col: 1, content: '<div class="content">Panel 2</div>' },
    { sizeX: 1, sizeY: 2, row: 0, col: 3, content: '<div class="content">Panel 3</div>' }
  ];
}
```

## Common Patterns

### Pattern 1: Basic Dashboard with 5 Columns
Start with a 5-column grid layout. Each column represents one unit. Set `cellSpacing` to create separation between panels for better visual organization.

```typescript
<ejs-dashboardlayout 
  [columns]="5"
  [cellSpacing]="[10, 10]"
  [panels]="panels">
</ejs-dashboardlayout>
```

### Pattern 2: Draggable and Resizable Dashboard
Enable user interaction with drag-drop and resize capabilities for full dashboard customization. See `dragging-and-dropping.md` and `resizing-and-floating.md` for detailed configuration.

```typescript
<ejs-dashboardlayout 
  [allowDragging]="true"
  [allowResizing]="true"
  [resizableHandles]="['e-south-east', 'e-east', 'e-west']"
  [panels]="panels">
</ejs-dashboardlayout>
```

### Pattern 3: Responsive Mobile Dashboard
Automatically stack panels into a single column on mobile devices using media queries. See `responsive-and-adaptive.md` for more responsive strategies.

```typescript
<ejs-dashboardlayout 
  [mediaQuery]="'max-width: 768px'"
  [panels]="panels">
</ejs-dashboardlayout>
```

### Pattern 4: Persistent Dashboard State
Save and restore dashboard configurations using serialization. See `save-restore-state.md` for full state management examples.

```typescript
// Save
const layoutState = this.dashboard.serialize();
localStorage.setItem('dashboardLayout', JSON.stringify(layoutState));

// Restore
const saved = JSON.parse(localStorage.getItem('dashboardLayout'));
this.dashboard.panels = saved;
```

## Next Steps

Now that you've created a basic dashboard:

1. **Add Interaction:** Enable drag-drop and resizing (see `dragging-and-dropping.md`)
2. **Dynamic Panels:** Add/remove panels at runtime (see `adding-removing-panels.md`)
3. **Responsive Design:** Handle mobile screens (see `responsive-and-adaptive.md`)
4. **Persist State:** Save user layouts (see `save-restore-state.md`)
5. **Add Charts:** Embed Syncfusion Charts as panel content (see `styling-and-customization.md`)

## Troubleshooting

**Issue:** Styles not applied
- **Solution:** Ensure CSS imports are in `styles.css`, not in component CSS
- **Check:** Browser DevTools → Inspect dashboard element → Verify `.e-dashboardlayout` class is present

**Issue:** Panels appearing stacked vertically
- **Solution:** Check parent container height. Dashboard expands to fill parent.
- **Fix:** Set `height: 100vh` on parent container

**Issue:** Module import errors
- **Solution:** Ensure `DashboardLayoutModule` is imported in the `imports` array
- **Modern:** Use standalone components (shown above)
- **Legacy:** Import in `NgModule` declarations

