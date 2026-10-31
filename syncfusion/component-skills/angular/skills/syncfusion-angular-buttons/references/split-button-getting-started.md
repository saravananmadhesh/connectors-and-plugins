# Getting Started with SplitButton Component

## Table of Contents
- [Installation](#installation)
- [Module Setup](#module-setup)
- [CSS Imports](#css-imports)
- [Basic Implementation](#basic-implementation)
- [Component Registration](#component-registration)
- [Running the Application](#running-the-application)

## Installation

Install the Syncfusion SplitButton package using npm or ng add:

```bash
# Using npm
npm install @syncfusion/ej2-angular-splitbuttons

# Or using ng add (recommended)
ng add @syncfusion/ej2-angular-splitbuttons
```

### Dependencies

The SplitButton component requires the following:
- `@syncfusion/ej2-base` - Core utilities
- `@syncfusion/ej2-buttons` - Button base component
- `@syncfusion/ej2-popups` - Popup and positioning utilities
- `@syncfusion/ej2-splitbuttons` - SplitButton control
- Angular 12 or higher

```bash
npm install @syncfusion/ej2-base @syncfusion/ej2-buttons @syncfusion/ej2-popups @syncfusion/ej2-splitbuttons
```

## Module Setup

### Using SplitButtonModule (Recommended)

Import `SplitButtonModule` in your module:

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SplitButtonModule } from '@syncfusion/ej2-angular-splitbuttons';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    SplitButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Standalone Component Setup (Angular 14+)

For standalone components, import directly:

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { SplitButtonComponent, ItemModel } from '@syncfusion/ej2-angular-splitbuttons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SplitButtonComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];
}
```

## CSS Imports

Import the SplitButton theme CSS. Choose one of the available themes:

### In Component

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { }
```

```css
/* app.component.css */
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/split-button/index.css";
```

### Available Themes

- **material3.css** - Material Design 3 (default)
- **bootstrap5.css** - Bootstrap 5 theme
- **fluent.css** - Microsoft Fluent Design
- **tailwind.css** - Tailwind CSS theme
- **fabric.css** - Office Fabric theme

**⚠️ Choose one theme per application to avoid conflicts.** Do not import multiple themes simultaneously.

## Basic Implementation

### Simple SplitButton

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { ItemModel } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px;">
  <h2>Paste Options</h2>
  <ejs-splitbutton content="Paste" [items]="items"></ejs-splitbutton>
</div>
```

### SplitButton with Event Handlers

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { ItemModel } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];
  
  onPrimaryClick(): void {
    console.log('Primary button (Paste) clicked');
    // Execute default action
  }
  
  onItemSelect(args: any): void {
    console.log('Selected item:', args.item.text);
    // Handle based on selected item
  }
}
```

```html
<!-- app.component.html -->
<ejs-splitbutton 
  content="Paste"
  [items]="items"
  (click)="onPrimaryClick()"
  (select)="onItemSelect($event)">
</ejs-splitbutton>
```

## Component Registration

### Access SplitButton via ViewChild

```typescript
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { SplitButtonComponent, ItemModel } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('splitButtonRef') splitButtonInstance!: SplitButtonComponent;
  
  public items: ItemModel[] = [
    { text: 'Option 1' },
    { text: 'Option 2' }
  ];
  
  ngAfterViewInit(): void {
    // Access component instance after view initialization
    console.log('SplitButton instance:', this.splitButtonInstance);
  }
  
  onToggleClick(): void {
    // Programmatically toggle dropdown
    this.splitButtonInstance.toggle();
  }
}
```

```html
<ejs-splitbutton 
  #splitButtonRef
  content="Actions"
  [items]="items">
</ejs-splitbutton>

<button (click)="onToggleClick()">Toggle Menu</button>
```

## Running the Application

### Development Server

```bash
# Start the development server
ng serve

# Or with port specification
ng serve --port 4200

# Navigate to
http://localhost:4200
```

### Build for Production

```bash
# Create optimized production build
ng build --prod

# Output goes to dist/ folder
```

## Troubleshooting

**Issue: "Cannot find module '@syncfusion/ej2-angular-splitbuttons'"**
- Solution: Run `npm install @syncfusion/ej2-angular-splitbuttons`
- Verify package.json has the dependency
- Clear node_modules and reinstall if needed: `rm -r node_modules && npm install`

**Issue: "SplitButtonModule is not exported"**
- Solution: Check that SplitButtonModule is imported in app.module.ts
- Verify correct import path from '@syncfusion/ej2-angular-splitbuttons'
- For standalone components, import SplitButtonComponent directly

**Issue: Styles not applied**
- Solution: Verify CSS import path in component or global styles
- Check theme files exist in node_modules/@syncfusion/ej2-splitbuttons/styles/
- Ensure @import statements are at top of CSS file
- Check import order: base → buttons → popups → splitbuttons

**Issue: Dropdown not opening**
- Solution: Verify items array is populated with ItemModel objects
- Check that SplitButtonModule is imported
- Inspect browser console for JavaScript errors
- Verify CSS is loaded (check Network tab)

**Issue: Items not displaying**
- Solution: Ensure items array is properly defined with text property
- Check ItemModel interface is imported correctly
- Verify [(ngModel)] binding if used with data binding
- Console.log items array to verify structure

## Complete Example Project

```bash
# Create new Angular project
ng new splitbutton-demo

# Navigate to project
cd splitbutton-demo

# Add Syncfusion SplitButton
ng add @syncfusion/ej2-angular-splitbuttons

# Start development server
ng serve
```

### Working Example Files

**app.module.ts:**
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SplitButtonModule } from '@syncfusion/ej2-angular-splitbuttons';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, SplitButtonModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**app.component.ts:**
```typescript
import { Component } from '@angular/core';
import { ItemModel } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];
  
  onPrimaryClick(): void {
    console.log('Paste action executed');
  }
  
  onItemSelect(args: any): void {
    console.log('Selected:', args.item.text);
  }
}
```

**app.component.html:**
```html
<div style="padding: 20px; font-family: Arial, sans-serif;">
  <h1>SplitButton Component Demo</h1>
  <ejs-splitbutton 
    content="Paste"
    [items]="items"
    (click)="onPrimaryClick()"
    (select)="onItemSelect($event)">
  </ejs-splitbutton>
  <p>Click the main button or dropdown arrow to see actions</p>
</div>
```

**app.component.css:**
```css
@import '../node_modules/@syncfusion/ej2-base/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-splitbuttons/styles/material3.css';

:host ::ng-deep .e-split-button {
  margin: 20px 0;
  min-width: 120px;
}

:host ::ng-deep .e-dropdown-popup .e-list-item {
  padding: 10px 15px;
}
```

Your SplitButton is now ready to use!

## Next Steps

1. **Configure button items** → Read [button-items-configuration.md](button-items-configuration.md) to learn about ItemModel properties
2. **Handle events** → Read [events-and-methods.md](events-and-methods.md) for event handling patterns
3. **Customize appearance** → Read [styling-and-customization.md](styling-and-customization.md) for theming
4. **Use templates** → Read [templates-and-icons.md](templates-and-icons.md) for icon and template options
5. **Reference complete API** → Read [api-reference.md](api-reference.md) for all properties and methods
