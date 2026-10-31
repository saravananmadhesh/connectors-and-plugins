# Getting Started with DateRangePicker Component

## Table of Contents
- [Installation](#installation)
- [Module Setup](#module-setup)
- [CSS Imports](#css-imports)
- [Basic Implementation](#basic-implementation)
- [Component Registration](#component-registration)
- [Running the Application](#running-the-application)
- [Complete Example](#complete-example)

## Installation

Install the Syncfusion DateRangePicker package using npm or ng add:

```bash
# Using npm
npm install @syncfusion/ej2-angular-calendars

# Or using ng add (recommended)
ng add @syncfusion/ej2-angular-calendars
```

### Dependencies

The DateRangePicker component requires the following:
- `@syncfusion/ej2-base` - Core utilities
- `@syncfusion/ej2-calendars` - Calendar controls
- `@syncfusion/ej2-inputs` - Input components
- `@syncfusion/ej2-popups` - Popup functionality
- `@syncfusion/ej2-buttons` - Button controls
- Angular 12 or higher

```bash
npm install @syncfusion/ej2-base @syncfusion/ej2-calendars @syncfusion/ej2-inputs @syncfusion/ej2-popups @syncfusion/ej2-buttons
```

## Module Setup

### Using DateRangePickerModule (Recommended)

Import `DateRangePickerModule` in your module:

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    DateRangePickerModule
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
import { DateRangePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DateRangePickerComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  startDate: Date = new Date();
  endDate: Date = new Date();
}
```

## CSS Imports

Import the DateRangePicker theme CSS. Choose one of the available themes:

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
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/daterangepicker/index.css";
```

### Available Themes

- **material3.css** - Material Design 3 (default, recommended)
- **bootstrap5.css** - Bootstrap 5 theme
- **fluent.css** - Microsoft Fluent Design
- **fabric.css** - Office Fabric theme
- **tailwind.css** - Tailwind CSS theme

**Important:** Choose one theme per application to avoid conflicts.

## Basic Implementation

### Simple DateRangePicker

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Initialize with current month
  startDate: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
  
  endDate: Date = new Date();
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px;">
  <h2>Select Date Range</h2>
  <ejs-daterangepicker 
    [startDate]="startDate"
    [endDate]="endDate"
    placeholder="Select a date range">
  </ejs-daterangepicker>
  <p>Start: {{ startDate | date:'medium' }}</p>
  <p>End: {{ endDate | date:'medium' }}</p>
</div>
```

### DateRangePicker with Two-Way Binding

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Two-way binding using ngModel
  dateRange: any = {
    startDate: new Date(2026, 2, 1),
    endDate: new Date(2026, 2, 31)
  };
}
```

```html
<!-- app.component.html -->
<ejs-daterangepicker 
  [(ngModel)]="dateRange"
  placeholder="Select a date range">
</ejs-daterangepicker>

<p>Selected Range: 
  {{ dateRange.startDate | date:'medium' }} to {{ dateRange.endDate | date:'medium' }}
</p>
```

### DateRangePicker with Event Handling

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { RangeEventArgs } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  startDate: Date = new Date();
  endDate: Date = new Date();
  rangeInfo: string = '';
  
  onRangeChange(args: RangeEventArgs): void {
    console.log('Start Date:', args.startDate);
    console.log('End Date:', args.endDate);
    console.log('Days in range:', args.daySpan);
    
    const start = (args.startDate as Date).toLocaleDateString();
    const end = (args.endDate as Date).toLocaleDateString();
    this.rangeInfo = `Selected: ${start} to ${end} (${args.daySpan} days)`;
  }
  
  onDateRangePickerCreated(): void {
    console.log('DateRangePicker component created');
  }
}
```

```html
<!-- app.component.html -->
<ejs-daterangepicker 
  [startDate]="startDate"
  [endDate]="endDate"
  (change)="onRangeChange($event)"
  (created)="onDateRangePickerCreated()">
</ejs-daterangepicker>

<div *ngIf="rangeInfo" style="margin-top: 10px; padding: 10px; background-color: #f0f0f0;">
  {{ rangeInfo }}
</div>
```

## Component Registration

### Register with ViewChild (for imperative access)

```typescript
import { Component, ViewChild } from '@angular/core';
import { DateRangePickerComponent } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('daterangepickerRef') drpInstance!: DateRangePickerComponent;
  
  onButtonClick(): void {
    // Access DateRangePicker methods
    const selectedRange = this.drpInstance.getSelectedRange();
    console.log('Selected Range:', selectedRange);
  }
}
```

```html
<ejs-daterangepicker #daterangepickerRef></ejs-daterangepicker>
<button (click)="onButtonClick()">Get Selected Range</button>
```

### Register with ContentChild (for projected components)

```typescript
import { Component, ContentChild, AfterContentInit } from '@angular/core';
import { DateRangePickerComponent } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-daterangepicker-wrapper',
  template: `<ng-content></ng-content>`
})
export class DateRangePickerWrapperComponent implements AfterContentInit {
  @ContentChild(DateRangePickerComponent) drp!: DateRangePickerComponent;
  
  ngAfterContentInit(): void {
    if (this.drp) {
      console.log('DateRangePicker found:', this.drp);
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
- Clear node_modules and reinstall if needed: `rm -rf node_modules && npm install`

**Issue: "DateRangePickerModule is not exported"**
- Solution: Check that DateRangePickerModule is imported in app.module.ts
- Verify correct import path from '@syncfusion/ej2-angular-calendars'
- Ensure FormsModule is also imported for two-way binding

**Issue: Styles not applied**
- Solution: Verify CSS import path in component or global styles
- Check theme file exists in node_modules/@syncfusion/ej2-calendars/styles/
- Ensure @import statement comes before component styles
- Clear browser cache and rebuild: `ng build --prod`

**Issue: ngModel not working**
- Solution: Import FormsModule in module imports
- Ensure component uses [(ngModel)] syntax with proper variable
- For Reactive Forms, use formControl/formControlName instead

**Issue: "Calendar popup not showing"**
- Solution: Verify ejs-daterangepicker selector is correct
- Check that popup styles are imported
- Ensure component is not hidden by CSS (z-index issues)
- Verify click event on input triggers popup

## Complete Example Project

```bash
# Create new Angular project
ng new daterangepicker-demo

# Navigate to project
cd daterangepicker-demo

# Add Syncfusion DateRangePicker
ng add @syncfusion/ej2-angular-calendars

# Start development server
ng serve
```

### Working Example Files

**app.module.ts:**
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, DateRangePickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**app.component.ts:**
```typescript
import { Component } from '@angular/core';
import { RangeEventArgs } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  startDate: Date = new Date(2026, 2, 1);
  endDate: Date = new Date(2026, 2, 31);
  rangeInfo: string = '';
  
  onRangeChange(args: RangeEventArgs): void {
    const start = (args.startDate as Date).toLocaleDateString();
    const end = (args.endDate as Date).toLocaleDateString();
    this.rangeInfo = `Range: ${start} - ${end}`;
  }
}
```

**app.component.html:**
```html
<div style="padding: 30px; font-family: Arial, sans-serif;">
  <h1>DateRangePicker Demo</h1>
  
  <div style="margin-bottom: 20px;">
    <h3>Select Date Range:</h3>
    <ejs-daterangepicker 
      [startDate]="startDate"
      [endDate]="endDate"
      placeholder="Select a date range"
      (change)="onRangeChange($event)">
    </ejs-daterangepicker>
  </div>
  
  <div *ngIf="rangeInfo" style="padding: 10px; background-color: #e3f2fd;">
    <p><strong>{{ rangeInfo }}</strong></p>
  </div>
</div>
```

**app.component.css:**
```css
@import '../node_modules/@syncfusion/ej2-base/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-inputs/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-lists/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-splitbuttons/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-calendars/styles/material3.css';

:host ::ng-deep .e-daterangepicker {
  width: 100%;
  max-width: 400px;
}

:host ::ng-deep .e-input-group {
  margin: 10px 0;
}
```

## Next Steps

Now that you have DateRangePicker installed and running:

1. **Learn Date Range Selection** → Read [date-range-selection.md](date-range-selection.md) to understand start/end date handling
2. **Implement Preset Ranges** → Read [preset-ranges.md](preset-ranges.md) for quick selection buttons
3. **Handle Events** → Read [events-and-methods.md](events-and-methods.md) for event handling and programmatic control
4. **Format Dates** → Read [date-formatting-and-constraints.md](date-formatting-and-constraints.md) for custom date formats
5. **Customize Styling** → Read [styling-and-customization.md](styling-and-customization.md) for theming and CSS customization

Your DateRangePicker is now ready to use!
