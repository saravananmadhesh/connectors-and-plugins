# Getting Started with Angular Timeline

## Table of Contents
- [Installation](#installation)
- [Angular Environment Setup](#angular-environment-setup)
- [Creating Your First Timeline](#creating-your-first-timeline)
- [Adding Items](#adding-items)
- [CSS Imports](#css-imports)
- [Complete Working Example](#complete-working-example)

## Installation

### Step 1: Install Required Package

Install the `@syncfusion/ej2-angular-layouts` package which contains the Timeline component:

```bash
npm install @syncfusion/ej2-angular-layouts
```

### Step 2: Verify Dependencies

The Timeline module depends on:
```
@syncfusion/ej2-angular-layouts
    |-- @syncfusion/ej2-base
    |-- @syncfusion/ej2-layouts
    |-- @syncfusion/ej2-angular-base
```

All dependencies are automatically installed with the main package.

## Angular Environment Setup

### Using Angular 21 (Standalone Architecture)

Angular 21 uses standalone components by default. Here's the recommended setup:

```bash
npm install -g @angular/cli@21.0.0
ng new my-timeline-app
cd my-timeline-app
```

> **Note:** If you need traditional NgModule architecture, configure your component with `@NgModule()` decorator instead of standalone components.

## Creating Your First Timeline

### Step 1: Import TimelineModule

In your component, import the required modules:

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModule, TimelineAllModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  imports: [CommonModule, TimelineModule, TimelineAllModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="container">
      <ejs-timeline>
        <e-items>
          <e-item></e-item>
        </e-items>
      </ejs-timeline>
    </div>
  `
})
export class AppComponent { }
```

**Key imports:**
- `TimelineModule` - Main Timeline component
- `TimelineAllModule` - Includes all Timeline-related modules
- `CommonModule` - For `*ngFor` and structural directives

### Step 2: Add Container Styling

Set container height and spacing:

```css
.container {
  height: 330px;
  margin-top: 30px;
  width: 100%;
}
```

## Adding Items

### Basic Items with Content

Add items using the `<e-item>` directive with content:

```ts
import { TimelineItemModel } from '@syncfusion/ej2-angular-layouts';

export class AppComponent {
  public items: TimelineItemModel[] = [
    { content: 'Event 1' },
    { content: 'Event 2' },
    { content: 'Event 3' },
    { content: 'Event 4' }
  ];
}
```

```html
<ejs-timeline>
  <e-items>
    <e-item *ngFor="let item of items" [content]="item.content"></e-item>
  </e-items>
</ejs-timeline>
```

### Items with Opposite Content

Display content on both sides:

```ts
public items: TimelineItemModel[] = [
  { content: 'Q1 2024', oppositeContent: 'Planning' },
  { content: 'Q2 2024', oppositeContent: 'Development' },
  { content: 'Q3 2024', oppositeContent: 'Testing' },
  { content: 'Q4 2024', oppositeContent: 'Launch' }
];
```

```html
<ejs-timeline>
  <e-items>
    <e-item *ngFor="let item of items" 
            [content]="item.content" 
            [oppositeContent]="item.oppositeContent"></e-item>
  </e-items>
</ejs-timeline>
```

## CSS Imports

### Required Styles

Add Timeline styles to your global `styles.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/timeline/index.css";
```

### Available Themes

Choose one theme:
- `material.css` - Material Design theme
- `bootstrap.css` - Bootstrap theme
- `fabric.css` - Fabric theme

Place the import at the top of `styles.css` before other styles.

### Component-level Styles

You can also import in component `styleUrls`:

```ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
```

```css
/* app.component.css */
@import '@syncfusion/ej2-angular-layouts/styles/timeline/material.css';
```

## Complete Working Example

### app.component.ts

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineItemModel, TimelineModule, TimelineAllModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  imports: [CommonModule, TimelineModule, TimelineAllModule],
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public productReleases: TimelineItemModel[] = [
    { content: 'v1.0.0', oppositeContent: 'Initial release' },
    { content: 'v1.1.0', oppositeContent: 'Bug fixes and improvements' },
    { content: 'v2.0.0', oppositeContent: 'Major feature update' },
    { content: 'v2.1.0', oppositeContent: 'Performance optimization' }
  ];
}
```

### app.component.html

```html
<div class="container">
  <h2>Product Release Timeline</h2>
  <ejs-timeline orientation="Vertical" align="Before">
    <e-items>
      <e-item *ngFor="let item of productReleases" 
              [content]="item.content" 
              [oppositeContent]="item.oppositeContent"></e-item>
    </e-items>
  </ejs-timeline>
</div>
```

### app.component.css

```css
@import '@syncfusion/ej2-angular-layouts/styles/timeline/material.css';

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px 20px;
  font-family: Arial, sans-serif;
}

.container h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}
```

### main.ts

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import 'zone.js';

bootstrapApplication(AppComponent)
  .catch((err) => console.error(err));
```

## Troubleshooting

**Issue:** Timeline items not displaying

**Solution:** 
- Ensure `TimelineModule` is imported in the component
- Verify CSS theme is imported in `styles.css`
- Check that `e-items` and `e-item` directives are used correctly

**Issue:** Styles not applying

**Solution:**
- Confirm theme CSS import path is correct
- Clear browser cache and rebuild
- Check console for CSS import errors

**Issue:** Items not binding from data

**Solution:**
- Verify `*ngFor` loop syntax is correct
- Ensure data array is properly initialized
- Check property bindings with `[content]` format
