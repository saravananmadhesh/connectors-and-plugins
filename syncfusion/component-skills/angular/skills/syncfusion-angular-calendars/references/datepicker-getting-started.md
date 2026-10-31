# Getting Started with Angular DatePicker

## Table of Contents
- [Installation](#installation)
- [Setup and Dependencies](#setup-and-dependencies)
- [Basic Implementation](#basic-implementation)
- [Angular 21+ Standalone Architecture](#angular-21-standalone-architecture)
- [Theme Imports](#theme-imports)
- [Minimal Working Example](#minimal-working-example)
- [Troubleshooting](#troubleshooting)

## Installation

### Prerequisites

Ensure your development environment meets Syncfusion requirements:
- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher
- **Angular:** v21.0.0 or higher (v19+ for standalone components)
- **TypeScript:** v5.2 or higher

### Install DatePicker Package

Install the Syncfusion Angular Calendars package (includes DatePicker):

```bash
npm install @syncfusion/ej2-angular-calendars
```

This automatically installs required dependencies:
- `@syncfusion/ej2-angular-base`
- `@syncfusion/ej2-base`
- `@syncfusion/ej2-calendars`
- `@syncfusion/ej2-lists`
- `@syncfusion/ej2-inputs`
- `@syncfusion/ej2-popups`

### Install Specific Version

To use a specific version:

```bash
npm install @syncfusion/ej2-angular-calendars@22.1.0
```

Check [npm Syncfusion packages](https://www.npmjs.com/org/syncfusion) for latest versions.

## Setup and Dependencies

### Import in Standalone Component

Angular 21+ uses standalone components by default. Import `DatePickerModule` directly:

```typescript
import { Component } from '@angular/core';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [DatePickerModule],
  template: `<ejs-datepicker></ejs-datepicker>`
})
export class DatePickerComponent {}
```

### Import in NgModule (Pre-Angular 19)

For module-based applications:

```typescript
import { NgModule } from '@angular/core';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
  declarations: [AppComponent],
  imports: [DatePickerModule],
  providers: []
})
export class AppModule { }
```

## Basic Implementation

### Minimal DatePicker

Simplest implementation with default settings:

```typescript
import { Component } from '@angular/core';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [DatePickerModule],
  template: `
    <ejs-datepicker placeholder="Select date"></ejs-datepicker>
  `
})
export class DatePickerComponent {}
```

**Output:** Gray input field with calendar icon, shows English month calendar on click

### With Two-Way Binding

Bind selected date to component property:

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [DatePickerModule, FormsModule, CommonModule],
  template: `
    <ejs-datepicker
      placeholder="Select date"
      [(ngModel)]="selectedDate">
    </ejs-datepicker>
    <p *ngIf="selectedDate">Selected: {{ selectedDate | date:'fullDate' }}</p>
  `
})
export class DatePickerComponent {
  selectedDate: Date | null = null;
}
```

**Important:** Import `FormsModule` for `[(ngModel)]` two-way binding

### With Event Handling

Listen to date change events:

```typescript
import { Component } from '@angular/core';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [DatePickerModule],
  template: `
    <ejs-datepicker
      (change)="onDateChange($event)"
      (open)="onOpen()"
      (close)="onClose()">
    </ejs-datepicker>
  `
})
export class DatePickerComponent {
  onDateChange(event: any) {
    console.log('Selected date:', event.value);
  }

    <ejs-datepicker
      [enabled]="false"
      placeholder="Disabled DatePicker">
    </ejs-datepicker>
  onClose() {
    console.log('Calendar closed');
  }
}
```

**Events:**
- `change`: Fires when date is selected
- `open`: Fires when calendar popup opens
- `close`: Fires when calendar popup closes
- `blur`: Fires when input loses focus

## Angular 21+ Standalone Architecture

Angular 21 makes standalone components the default. Key differences from older versions:

### Old Way (NgModule-based)
```typescript
// app.module.ts
@NgModule({
  declarations: [AppComponent],
  imports: [DatePickerModule, BrowserModule]
})
export class AppModule { }

// main.ts
platformBrowserDynamic().bootstrapModule(AppModule);
```

### New Way (Standalone, Angular 21+)
```typescript
// app.component.ts
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DatePickerModule],
  template: `<ejs-datepicker></ejs-datepicker>`
})
export class AppComponent {}

// main.ts
bootstrapApplication(AppComponent);
```

**Key points:**
- No `NgModule` wrapper needed
- Imports directly in `@Component` decorator
- Cleaner, more direct dependency declaration
- Better tree-shaking and lazy loading support

## Theme Imports

DatePicker requires a theme stylesheet. Choose one based on design needs:

### Material Theme (Default)

```typescript
@import "../node_modules/@syncfusion/ej2-material-theme/styles/datepicker/index.css";
```

### Bootstrap Theme

```typescript
@import "../node_modules/@syncfusion/ej2-bootstrap-theme/styles/datepicker/index.css";
```

### Tailwind Theme

```typescript
@import "../node_modules/@syncfusion/ej2-tailwind-theme/styles/datepicker/index.css";
```

### Fluent Theme

```typescript
@import "../node_modules/@syncfusion/ej2-fluent-theme/styles/datepicker/index.css";
```

### Dark Theme

```typescript
@import "../node_modules/@syncfusion/ej2-material-dark-theme/styles/datepicker/index.css";
```

**Placement:** Import in `main.ts` or component's `styles`:

**Option 1: main.ts (global)**
```typescript
// main.ts
import '@syncfusion/ej2-angular-calendars/styles/material.css';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent);
```

**Option 2: Component styles (scoped)**
```typescript
@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [DatePickerModule],
  styles: [`@import '@syncfusion/ej2-angular-calendars/styles/material.css';`],
  template: `<ejs-datepicker></ejs-datepicker>`
})
export class DatePickerComponent {}
```

## Minimal Working Example

Complete working example with all setup:

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { CommonModule } from '@angular/common';
import '@syncfusion/ej2-angular-calendars/styles/material.css';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DatePickerModule, FormsModule, CommonModule],
  template: `
    <div style="margin: 20px;">
      <h2>Angular DatePicker Demo</h2>
      
      <label for="datepicker">Select Date:</label>
      <ejs-datepicker
        id="datepicker"
        placeholder="Select date"
        [(ngModel)]="selectedDate"
        (change)="onDateChange($event)">
      </ejs-datepicker>
      
      <p *ngIf="selectedDate">
        You selected: {{ selectedDate | date:'fullDate' }}
      </p>
    </div>
  `
})
export class AppComponent {
  selectedDate: Date | null = null;

  onDateChange(event: any) {
    console.log('Date selected:', event.value);
  }
}
```

```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent).catch(err => console.error(err));
```

**To run:**
```bash
ng serve
# Navigate to http://localhost:4200/
```

## Troubleshooting

### DatePicker not appearing
**Issue:** Component renders but DatePicker element is blank

**Solution:** 
1. Ensure `DatePickerModule` is imported
2. Check that theme CSS is imported (see Theme Imports)
3. Verify Syncfusion license if required

**Example fix:**
```typescript
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import '@syncfusion/ej2-angular-calendars/styles/material.css';

@Component({
  imports: [DatePickerModule],
  // ...
})
```

### Two-way binding not working
**Issue:** `[(ngModel)]` doesn't update when selecting date

**Solution:**
1. Import `FormsModule` in component
2. Use `ngModelChange` event if needed

**Example:**
```typescript
import { FormsModule } from '@angular/forms';

@Component({
  imports: [DatePickerModule, FormsModule],
  // ...
})
```

### Calendar not opening on click
**Issue:** Clicking calendar icon doesn't open popup

**Solution:**
1. Check browser console for errors
2. Verify Syncfusion license
3. Ensure theme CSS is loaded

### ngModel undefined error
**Issue:** Error: "Can't resolve '@angular/forms'"

**Solution:** Install FormsModule
```bash
npm install @angular/forms
```

Then import:
```typescript
import { FormsModule } from '@angular/forms';

@Component({
  imports: [DatePickerModule, FormsModule],
  // ...
})
```

---

**Related References:**
- [Date Formats and Parsing](date-formats-and-parsing.md)
- [Date Range and Validation](date-range-and-validation.md)
- [Accessibility and Forms](accessibility-and-forms.md)
