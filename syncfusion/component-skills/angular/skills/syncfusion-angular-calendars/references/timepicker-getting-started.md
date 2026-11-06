# Getting Started with TimePicker Component

## Table of Contents
- [Installation](#installation)
- [Module Setup](#module-setup)
- [CSS Imports](#css-imports)
- [Basic Implementation](#basic-implementation)
- [Component Registration](#component-registration)
- [Running the Application](#running-the-application)
- [Troubleshooting](#troubleshooting)

## Installation

Install the Syncfusion TimePicker package using npm or ng add:

```bash
# Using npm
npm install @syncfusion/ej2-angular-calendars

# Or using ng add (recommended)
ng add @syncfusion/ej2-angular-calendars
```

### Dependencies

The TimePicker component requires the following:
- `@syncfusion/ej2-base` - Core utilities
- `@syncfusion/ej2-calendars` - Calendar controls including TimePicker
- Angular 12 or higher

```bash
npm install @syncfusion/ej2-base @syncfusion/ej2-calendars
```

## Module Setup

### Using TimePickerModule (Recommended)

Import `TimePickerModule` in your module:

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    TimePickerModule
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
import { TimePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TimePickerComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedTime: Date = new Date();
}
```

## CSS Imports

Import the TimePicker theme CSS. Choose one of the available themes:

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
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/timepicker/index.css";
```

### Available Themes

- **material3.css** - Material Design 3 (default)
- **bootstrap5.css** - Bootstrap 5 theme
- **fluent.css** - Microsoft Fluent Design
- **tailwind.css** - Tailwind CSS theme
- **fabric.css** - Office Fabric theme

**Choose one theme per application to avoid conflicts.**

## Basic Implementation

### Simple TimePicker

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedTime: Date = new Date();
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px;">
  <h2>Select a Time</h2>
  <ejs-timepicker [(ngModel)]="selectedTime"></ejs-timepicker>
  <p>Selected Time: {{ selectedTime | date:'shortTime' }}</p>
</div>
```

### TimePicker with Event Handling

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { ChangeEventArgs } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedTime: Date = new Date();
  
  onTimeChange(args: ChangeEventArgs): void {
    console.log('Time changed:', args.value);
    console.log('Time as text:', args.text);
    console.log('Is user interaction:', args.isInteracted);
  }
  
  onTimeCreated(): void {
    console.log('TimePicker component created');
  }
}
```

```html
<!-- app.component.html -->
<ejs-timepicker 
  [(ngModel)]="selectedTime"
  (change)="onTimeChange($event)"
  (created)="onTimeCreated()">
</ejs-timepicker>
```

## Component Registration

### Register with ViewChild (for imperative access)

```typescript
import { Component, ViewChild } from '@angular/core';
import { TimePickerComponent } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('timePickerRef') timePickerInstance!: TimePickerComponent;
  
  onButtonClick(): void {
    // Access timepicker methods
    this.timePickerInstance.show();
  }
}
```

```html
<ejs-timepicker #timePickerRef></ejs-timepicker>
<button (click)="onButtonClick()">Open TimePicker</button>
```

### Register with ContentChild (for projected components)

```typescript
import { Component, ContentChild, AfterContentInit } from '@angular/core';
import { TimePickerComponent } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-timepicker-wrapper',
  template: `<ng-content></ng-content>`
})
export class TimePickerWrapperComponent implements AfterContentInit {
  @ContentChild(TimePickerComponent) timePicker!: TimePickerComponent;
  
  ngAfterContentInit(): void {
    if (this.timePicker) {
      console.log('TimePicker found:', this.timePicker);
    }
  }
}
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

### Issue: "Cannot find module '@syncfusion/ej2-angular-calendars'"
**Solution:** 
- Run `npm install @syncfusion/ej2-angular-calendars`
- Verify package.json has the dependency
- Clear node_modules and reinstall if needed: `rm -rf node_modules && npm install`

### Issue: "TimePickerModule is not exported"
**Solution:** 
- Check that TimePickerModule is imported in app.module.ts
- Verify correct import path from '@syncfusion/ej2-angular-calendars'
- Ensure you're using TimePickerModule, not TimePickerComponent

### Issue: Styles not applied
**Solution:** 
- Verify CSS import path in component or global styles
- Check theme file exists in node_modules/@syncfusion/ej2-calendars/styles/
- Ensure @import statement comes before component styles
- Try a different theme if current one doesn't load
- Clear browser cache

### Issue: ngModel not working
**Solution:** 
- Import FormsModule in module imports
- For Reactive Forms, use formControl/formControlName instead
- Verify component is standalone or part of module with FormsModule

### Issue: TimePicker not displaying
**Solution:** 
- Ensure TimePickerComponent or TimePickerModule is imported
- Check that ejs-timepicker selector is used in template
- Verify component has id attribute or template reference
- Check browser console for errors

## Next Steps

Now that you have TimePicker installed and running:

1. **Learn Basic Implementation** → Read [basic-implementation.md](basic-implementation.md) for simple usage patterns
2. **Configure Time** → Read [time-configuration.md](time-configuration.md) for format and step options
3. **Handle Events** → Read [events-and-callbacks.md](events-and-callbacks.md) for event handling
4. **Use Methods** → Read [methods-and-imperative-access.md](methods-and-imperative-access.md) for method calls
5. **Advanced Features** → Read [advanced-features.md](advanced-features.md) for masked input, persistence, RTL
6. **Customize Styling** → Read [styling-and-customization.md](styling-and-customization.md) for theming

## Complete Example Project

```bash
# Create new Angular project
ng new timepicker-demo

# Navigate to project
cd timepicker-demo

# Add Syncfusion TimePicker
ng add @syncfusion/ej2-angular-calendars

# Start development server
ng serve
```

### Basic Working Example

**app.module.ts:**
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, TimePickerModule],
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
  selectedTime: Date = new Date();
}
```

**app.component.html:**
```html
<div style="padding: 20px; font-family: Arial, sans-serif;">
  <h1>TimePicker Component Demo</h1>
  <ejs-timepicker [(ngModel)]="selectedTime"></ejs-timepicker>
  <p>Selected: {{ selectedTime | date:'shortTime' }}</p>
</div>
```

**app.component.css:**
```css
@import '../node_modules/@syncfusion/ej2-base/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-calendars/styles/material3.css';

:host ::ng-deep .e-timepicker {
  margin: 20px 0;
}
```

Your TimePicker is now ready to use!
