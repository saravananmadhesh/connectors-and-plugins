# Getting Started with DatetimePicker Component

## Table of Contents
- [Installation](#installation)
- [Module Setup](#module-setup)
- [CSS Imports](#css-imports)
- [Basic Implementation](#basic-implementation)
- [Running the Application](#running-the-application)
- [Troubleshooting](#troubleshooting)

## Installation

Install the Syncfusion DatetimePicker package using npm or ng add:

```bash
# Using npm
npm install @syncfusion/ej2-angular-datetimepickers

# Or using ng add (recommended)
ng add @syncfusion/ej2-angular-datetimepickers
```

### Dependencies

The DatetimePicker component requires the following packages:
- `@syncfusion/ej2-base` - Core utilities and helpers
- `@syncfusion/ej2-calendars` - Calendar component base
- `@syncfusion/ej2-inputs` - Input control utilities
- `@syncfusion/ej2-popups` - Popup and dropdown support
- Angular 12 or higher

```bash
npm install @syncfusion/ej2-base @syncfusion/ej2-calendars @syncfusion/ej2-inputs @syncfusion/ej2-popups
```

## Module Setup

### Using DatetimePickerModule (Recommended for Traditional Projects)

Import `DateTimePickerModule` in your module:

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-datetimepickers';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DateTimePickerModule
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
import { DateTimePickerComponent } from '@syncfusion/ej2-angular-datetimepickers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    DateTimePickerComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedDateTime: Date = new Date();
}
```

## CSS Imports

Import the DatetimePicker theme CSS. Choose one of the available themes:

### In Component CSS

```css
/* app.component.css */
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/datetimepicker/index.css";
```

### Available Themes

- **material3.css** - Material Design 3 (default, modern)
- **bootstrap5.css** - Bootstrap 5 theme
- **fluent.css** - Microsoft Fluent Design System
- **tailwind.css** - Tailwind CSS theme
- **fabric.css** - Office Fabric theme
- **bootstrap.css** - Bootstrap 4 theme

**Note:** Each theme has dark variants available (e.g., `material3-dark.css`). Choose one theme per application to avoid conflicts.

### Dark Mode Example

```css
/* Global Styles with Dark Mode */
@import '../node_modules/@syncfusion/ej2-base/styles/material3-dark.css';
@import '../node_modules/@syncfusion/ej2-calendars/styles/material3-dark.css';
@import '../node_modules/@syncfusion/ej2-inputs/styles/material3-dark.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/material3-dark.css';
```

## Basic Implementation

### Simple DatetimePicker

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Initialize with current date and time
  selectedDateTime: Date = new Date();
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px; font-family: Arial, sans-serif;">
  <h2>Select Date and Time</h2>
  
  <!-- Basic datetimepicker with two-way binding -->
  <ejs-datetimepicker
    [(ngModel)]="selectedDateTime"
    placeholder="Select date and time">
  </ejs-datetimepicker>
  
  <!-- Display selected value -->
  <p *ngIf="selectedDateTime">
    Selected: {{ selectedDateTime | date:'medium' }}
  </p>
</div>
```

### DatetimePicker with Events

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { ChangedEventArgs } from '@syncfusion/ej2-datetimepickers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  onDateTimeChange(args: ChangedEventArgs): void {
    console.log('Date changed:', args.value);
    console.log('Event type:', args.type);
  }
  
  onPopupOpen(): void {
    console.log('Calendar and time picker popup opened');
  }
  
  onPopupClose(): void {
    console.log('Calendar and time picker popup closed');
  }
  
  onComponentCreated(): void {
    console.log('DatetimePicker component created');
  }
}
```

```html
<!-- app.component.html -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  format="dd/MM/yyyy hh:mm a"
  placeholder="Select date and time"
  (change)="onDateTimeChange($event)"
  (open)="onPopupOpen()"
  (close)="onPopupClose()"
  (created)="onComponentCreated()">
</ejs-datetimepicker>
```

### DatetimePicker with Configuration

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  // Constraints
  minDateTime: Date = new Date(2020, 0, 1, 0, 0);
  maxDateTime: Date = new Date(2030, 11, 31, 23, 59);
  
  // Formatting
  dateTimeFormat: string = 'dd/MM/yyyy hh:mm a';
  timeFormat: string = 'hh:mm a';
  
  // Time picker behavior
  timeStep: number = 30; // 30-minute intervals
}
```

```html
<!-- app.component.html -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [format]="dateTimeFormat"
  [timeFormat]="timeFormat"
  [min]="minDateTime"
  [max]="maxDateTime"
  [step]="timeStep"
  placeholder="Select date and time">
</ejs-datetimepicker>
```

## Running the Application

### Development Server

```bash
# Start the development server
ng serve

# Or with port specification
ng serve --port 4200

# Or with host specification
ng serve --host 0.0.0.0 --port 4200

# Navigate to
http://localhost:4200
```

### Build for Production

```bash
# Create optimized production build
ng build --prod

# Output in dist/ folder
# For Angular 12+
ng build

# Serve production build locally
ng serve --prod
```

### Using ng add Command

The Syncfusion ng add schematic automatically configures:
- Module imports
- CSS theme imports in styles.css
- Package dependencies in package.json

```bash
ng add @syncfusion/ej2-angular-datetimepickers
```

After running `ng add`, verify:
1. `DateTimePickerModule` appears in your app.module.ts
2. Theme CSS imports appear in styles.css
3. Packages appear in package.json

## Troubleshooting

### Issue: "Cannot find module '@syncfusion/ej2-angular-datetimepickers'"

**Solution:**
```bash
# Reinstall package
npm install @syncfusion/ej2-angular-datetimepickers

# Clear node_modules and reinstall all dependencies
rm -r node_modules package-lock.json
npm install
```

**Verify:** Check that `package.json` includes the dependency:
```json
{
  "dependencies": {
    "@syncfusion/ej2-angular-datetimepickers": "latest"
  }
}
```

### Issue: "DateTimePickerModule is not exported"

**Solution:** Check that `DateTimePickerModule` is imported in your module:
```typescript
import { DateTimePickerModule } from '@syncfusion/ej2-angular-datetimepickers';

@NgModule({
  imports: [DateTimePickerModule]
})
export class AppModule { }
```

For standalone components, import `DateTimePickerComponent` directly:
```typescript
import { DateTimePickerComponent } from '@syncfusion/ej2-angular-datetimepickers';

@Component({
  standalone: true,
  imports: [DateTimePickerComponent]
})
export class AppComponent { }
```

### Issue: Styles Not Applied

**Solution:** Verify CSS imports:
1. Check theme CSS path in component or global styles
2. Ensure theme file exists in node_modules/@syncfusion/ej2-calendars/styles/
3. Verify @import statements are syntactically correct
4. Check for conflicting CSS rules

```css
/* Correct import */
@import '../node_modules/@syncfusion/ej2-base/styles/material3.css';

/* Verify file exists */
node_modules/@syncfusion/ej2-base/styles/material3.css
```

### Issue: ngModel or formControl Not Working

**Solution:** Import required Angular modules:
```typescript
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,      // For ngModel
    ReactiveFormsModule // For formControl/formGroup
  ]
})
export class AppModule { }
```

### Issue: TypeScript Type Errors

**Solution:** Ensure types are properly imported:
```typescript
import { DateTimePickerComponent, ChangedEventArgs } from '@syncfusion/ej2-angular-datetimepickers';
import { RenderDayCellEventArgs } from '@syncfusion/ej2-calendars';

// Now types are available for intellisense
onDateChange(args: ChangedEventArgs): void {
  console.log(args.value);
}

onDayRender(args: RenderDayCellEventArgs): void {
  console.log(args.date);
}
```

### Issue: DatetimePicker Not Visible in Browser

**Solution:**
1. Verify component selector in template: `<ejs-datetimepicker></ejs-datetimepicker>`
2. Check module imports in app.module.ts
3. Clear browser cache (F12 → Settings → Clear cache)
4. Check browser console for errors
5. Verify CSS theme imports

## Next Steps

Now that you have DatetimePicker installed and running:

1. **Learn Basic Implementation** → Read [basic-implementation.md](basic-implementation.md) to understand datetime binding and events
2. **Configure Date & Time** → Read [date-time-configuration.md](date-time-configuration.md) for format customization
3. **Handle Calendar Views** → Read [calendar-and-time-views.md](calendar-and-time-views.md) for view modes
4. **Work with Events** → Read [events-and-callbacks.md](events-and-callbacks.md) for event handling
5. **Implement Advanced Features** → Read [advanced-features.md](advanced-features.md) for masked input and persistence

## Complete Example Project

**Create a new Angular project with DatetimePicker:**

```bash
# Create new Angular project
ng new datetimepicker-demo
cd datetimepicker-demo

# Add Syncfusion DatetimePicker
ng add @syncfusion/ej2-angular-datetimepickers

# Start development server
ng serve
```

**app.module.ts:**
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-datetimepickers';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, DateTimePickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**app.component.ts:**
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedDateTime: Date = new Date();
}
```

**app.component.html:**
```html
<div style="padding: 20px; font-family: Arial, sans-serif;">
  <h1>DatetimePicker Component Demo</h1>
  <ejs-datetimepicker
    [(ngModel)]="selectedDateTime"
    format="dd/MM/yyyy hh:mm a"
    placeholder="Select date and time">
  </ejs-datetimepicker>
  <p>Selected: {{ selectedDateTime | date:'medium' }}</p>
</div>
```

**styles.css:**
```css
@import '../node_modules/@syncfusion/ej2-base/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-calendars/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-inputs/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/material3.css';
```

Your DatetimePicker is now ready to use!
