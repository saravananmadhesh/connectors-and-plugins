# Getting Started with Calendar Component

## Table of Contents
- [Installation](#installation)
- [Module Setup](#module-setup)
- [CSS Imports](#css-imports)
- [Basic Implementation](#basic-implementation)
- [Component Registration](#component-registration)
- [Running the Application](#running-the-application)

## Installation

Install the Syncfusion Calendar package using npm or ng add:

```bash
# Using npm
npm install @syncfusion/ej2-angular-calendars

# Or using ng add (recommended)
ng add @syncfusion/ej2-angular-calendars
```

### Dependencies

The Calendar component requires the following:
- `@syncfusion/ej2-base` - Core utilities
- `@syncfusion/ej2-calendars` - Calendar control
- Angular 12 or higher

```bash
npm install @syncfusion/ej2-base @syncfusion/ej2-calendars
```

## Module Setup

### Using CalendarModule (Recommended)

Import `CalendarModule` in your module:

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    CalendarModule
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
import { CalendarComponent } from '@syncfusion/ej2-angular-calendars';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalendarComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedDate: Date = new Date();
}
```

## CSS Imports

Import the Calendar theme CSS. Choose one of the available themes:

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
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/calendar/index.css";
```

### Available Themes

- **material3.css** - Material Design 3 (default)
- **bootstrap5.css** - Bootstrap 5 theme
- **fluent.css** - Microsoft Fluent Design
- **tailwind.css** - Tailwind CSS theme
- **fabric.css** - Office Fabric theme

**Choose one theme per application to avoid conflicts.**

## Basic Implementation

### Simple Calendar

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedDate: Date = new Date();
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px;">
  <h2>Select a Date</h2>
  <ejs-calendar [(ngModel)]="selectedDate"></ejs-calendar>
  <p>Selected Date: {{ selectedDate | date:'medium' }}</p>
</div>
```

### Calendar with Event Handling

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { ChangedEventArgs } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedDate: Date = new Date();
  
  onCalendarChange(args: ChangedEventArgs): void {
    console.log('Date changed:', args.value);
    console.log('Event type:', args.type);
  }
  
  onCalendarCreated(): void {
    console.log('Calendar component created');
  }
}
```

```html
<!-- app.component.html -->
<ejs-calendar 
  [(ngModel)]="selectedDate"
  (change)="onCalendarChange($event)"
  (created)="onCalendarCreated()">
</ejs-calendar>
```

## Component Registration

### Register with ViewChild (for imperative access)

```typescript
import { Component, ViewChild } from '@angular/core';
import { CalendarComponent } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('calendarRef') calendarInstance!: CalendarComponent;
  
  onButtonClick(): void {
    // Access calendar methods
    const currentView = this.calendarInstance.currentView();
    console.log('Current view:', currentView);
  }
}
```

```html
<ejs-calendar #calendarRef></ejs-calendar>
<button (click)="onButtonClick()">Get Current View</button>
```

### Register with ContentChild (for projected components)

```typescript
import { Component, ContentChild, AfterContentInit } from '@angular/core';
import { CalendarComponent } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-calendar-wrapper',
  template: `<ng-content></ng-content>`
})
export class CalendarWrapperComponent implements AfterContentInit {
  @ContentChild(CalendarComponent) calendar!: CalendarComponent;
  
  ngAfterContentInit(): void {
    if (this.calendar) {
      console.log('Calendar found:', this.calendar);
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

### Troubleshooting

**Issue: "Cannot find module '@syncfusion/ej2-angular-calendars'"**
- Solution: Run `npm install @syncfusion/ej2-angular-calendars`
- Verify package.json has the dependency
- Clear node_modules and reinstall if needed

**Issue: "CalendarModule is not exported"**
- Solution: Check that CalendarModule is imported in app.module.ts
- Verify correct import path from '@syncfusion/ej2-angular-calendars'

**Issue: Styles not applied**
- Solution: Verify CSS import path in component or global styles
- Check theme file exists in node_modules/@syncfusion/ej2-calendars/styles/
- Ensure @import statement comes before component styles

**Issue: ngModel not working**
- Solution: Import FormsModule in module imports
- For Reactive Forms, use formControl/formControlName instead

## Next Steps

Now that you have Calendar installed and running:

1. **Learn Calendar Views** → Read [calendar-views.md](calendar-views.md) to understand Month/Year/Decade navigation
2. **Handle Date Selection** → Read [date-selection.md](date-selection.md) for single/multiple dates
3. **Handle Events** → Read [events-and-methods.md](events-and-methods.md) for event handling
4. **Customize Styling** → Read [styling-and-customization.md](styling-and-customization.md) for theming

## Complete Example Project

```bash
# Create new Angular project
ng new calendar-demo

# Navigate to project
cd calendar-demo

# Add Syncfusion Calendar
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
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, CalendarModule],
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
  selectedDate: Date = new Date();
}
```

**app.component.html:**
```html
<div style="padding: 20px; font-family: Arial, sans-serif;">
  <h1>Calendar Component Demo</h1>
  <ejs-calendar [(ngModel)]="selectedDate"></ejs-calendar>
  <p>Selected: {{ selectedDate | date:'fullDate' }}</p>
</div>
```

**app.component.css:**
```css
@import '../node_modules/@syncfusion/ej2-base/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-calendars/styles/material3.css';

:host ::ng-deep .e-calendar {
  margin: 20px 0;
}
```

Your Calendar is now ready to use!
