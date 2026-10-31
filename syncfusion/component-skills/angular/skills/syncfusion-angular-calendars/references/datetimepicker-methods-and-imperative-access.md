# Methods & Imperative Access

## Table of Contents
- [ViewChild Access](#viewchild-access)
- [currentView Method](#currentview-method)
- [navigateTo Method](#navigateto-method)
- [Focus Methods](#focus-methods)
- [Destroy Method](#destroy-method)
- [getPersistData Method](#getpersistdata-method)
- [Practical Examples](#practical-examples)

## ViewChild Access

### Getting Component Reference

Use `@ViewChild` decorator to get a reference to the DatetimePicker component instance:

```typescript
import { Component, ViewChild } from '@angular/core';
import { DateTimePickerComponent } from '@syncfusion/ej2-angular-datetimepickers';

export class AppComponent {
  @ViewChild('datetimeRef') datetimeInstance: DateTimePickerComponent;
  
  // Now you can access component methods and properties
  componentReady(): boolean {
    return !!this.datetimeInstance;
  }
}
```

```html
<!-- Add template reference #datetimeRef -->
<ejs-datetimepicker
  #datetimeRef
  placeholder="Select date and time">
</ejs-datetimepicker>
```

### Accessing After Component Initialization

Use `AfterViewInit` lifecycle hook to ensure component is initialized:

```typescript
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DateTimePickerComponent } from '@syncfusion/ej2-angular-datetimepickers';

export class AppComponent implements AfterViewInit {
  @ViewChild('datetimeRef') datetimeInstance: DateTimePickerComponent;
  
  ngAfterViewInit(): void {
    // Component is now initialized and accessible
    if (this.datetimeInstance) {
      console.log('DatetimePicker ready');
      const view = this.datetimeInstance.currentView();
      console.log('Current view:', view);
    }
  }
}
```

### Multiple DatetimePicker References

```typescript
import { Component, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { DateTimePickerComponent } from '@syncfusion/ej2-angular-datetimepickers';

export class AppComponent implements AfterViewInit {
  @ViewChildren('datetimeRef') datetimeInstances: QueryList<DateTimePickerComponent>;
  
  ngAfterViewInit(): void {
    // Access all datetimepicker instances
    this.datetimeInstances.forEach((picker, index) => {
      console.log(`DatetimePicker ${index + 1} view:`, picker.currentView());
    });
  }
}
```

```html
<div *ngFor="let item of [1, 2, 3]">
  <ejs-datetimepicker #datetimeRef></ejs-datetimepicker>
</div>
```

## currentView Method

The `currentView()` method returns the currently displayed calendar view:

```typescript
import { Component, ViewChild } from '@angular/core';
import { DateTimePickerComponent } from '@syncfusion/ej2-angular-datetimepickers';

export class AppComponent {
  @ViewChild('datetimeRef') datetimeInstance: DateTimePickerComponent;
  
  currentViewType: string;
  
  checkView(): void {
    // Returns 'Month', 'Year', or 'Decade'
    this.currentViewType = this.datetimeInstance.currentView();
    console.log('Current view:', this.currentViewType);
  }
}
```

```html
<div>
  <ejs-datetimepicker
    #datetimeRef
    (open)="checkView()">
  </ejs-datetimepicker>
  
  <p>Calendar is showing: {{ currentViewType }}</p>
</div>
```

### View Type Detection

```typescript
export class AppComponent {
  @ViewChild('datetimeRef') datetimeInstance: DateTimePickerComponent;
  
  get isMonthView(): boolean {
    return this.datetimeInstance?.currentView() === 'Month';
  }
  
  get isYearView(): boolean {
    return this.datetimeInstance?.currentView() === 'Year';
  }
  
  get isDecadeView(): boolean {
    return this.datetimeInstance?.currentView() === 'Decade';
  }
  
  getViewDescription(): string {
    switch(this.datetimeInstance?.currentView()) {
      case 'Month':
        return 'Viewing individual days';
      case 'Year':
        return 'Viewing months of the year';
      case 'Decade':
        return 'Viewing years of the decade';
      default:
        return 'Unknown view';
    }
  }
}
```

```html
<ejs-datetimepicker #datetimeRef></ejs-datetimepicker>

<div>
  <p *ngIf="isMonthView">📅 Month View - Select specific day</p>
  <p *ngIf="isYearView">📆 Year View - Select month</p>
  <p *ngIf="isDecadeView">📊 Decade View - Select year</p>
  <p>{{ getViewDescription() }}</p>
</div>
```

## navigateTo Method

The `navigateTo()` method programmatically navigates to a specific calendar view and date:

### Method Signature

```typescript
navigateTo(view: CalendarView, date: Date): void
```

- **view**: Target view ('Month', 'Year', or 'Decade')
- **date**: The date to navigate to within that view

### Navigate to Month View

```typescript
export class AppComponent {
  @ViewChild('datetimeRef') datetimeInstance: DateTimePickerComponent;
  
  goToMonthView(): void {
    // Navigate to current month
    this.datetimeInstance.navigateTo('Month', new Date());
  }
  
  goToSpecificDate(): void {
    // Navigate to December 25, 2025
    const targetDate = new Date(2025, 11, 25);
    this.datetimeInstance.navigateTo('Month', targetDate);
  }
}
```

```html
<div>
  <ejs-datetimepicker #datetimeRef></ejs-datetimepicker>
  
  <button (click)="goToMonthView()">Go to Current Month</button>
  <button (click)="goToSpecificDate()">Go to Dec 25, 2025</button>
</div>
```

### Navigate to Year View

```typescript
export class AppComponent {
  @ViewChild('datetimeRef') datetimeInstance: DateTimePickerComponent;
  
  goToYearView(): void {
    // Show months of current year
    this.datetimeInstance.navigateTo('Year', new Date());
  }
  
  goToYear2025(): void {
    // Show months of 2025
    const date2025 = new Date(2025, 0, 1);
    this.datetimeInstance.navigateTo('Year', date2025);
  }
}
```

### Navigate to Decade View

```typescript
export class AppComponent {
  @ViewChild('datetimeRef') datetimeInstance: DateTimePickerComponent;
  
  goToDecadeView(): void {
    // Show years of current decade
    this.datetimeInstance.navigateTo('Decade', new Date());
  }
  
  goToDecade2030(): void {
    // Show years 2030-2039
    const date2035 = new Date(2035, 0, 1);
    this.datetimeInstance.navigateTo('Decade', date2035);
  }
}
```

### Navigation Workflow

```typescript
export class AppComponent {
  @ViewChild('datetimeRef') datetimeInstance: DateTimePickerComponent;
  
  navigateToMonth(year: number, month: number): void {
    // Navigate to Month view for specific year/month
    const targetDate = new Date(year, month, 1);
    this.datetimeInstance.navigateTo('Month', targetDate);
  }
  
  navigateToYear(year: number): void {
    // Navigate to Year view for specific year
    const targetDate = new Date(year, 0, 1);
    this.datetimeInstance.navigateTo('Year', targetDate);
  }
  
  navigateToDecade(startYear: number): void {
    // Navigate to Decade view (decade starting with startYear)
    const targetDate = new Date(startYear, 0, 1);
    this.datetimeInstance.navigateTo('Decade', targetDate);
  }
}
```

## Focus Methods

### focusIn Method

Sets focus to the DatetimePicker input element:

```typescript
import { Component, ViewChild } from '@angular/core';
import { DateTimePickerComponent } from '@syncfusion/ej2-angular-datetimepickers';

export class AppComponent {
  @ViewChild('datetimeRef') datetimeInstance: DateTimePickerComponent;
  
  setFocus(): void {
    this.datetimeInstance.focusIn();
    console.log('Focus set to DatetimePicker');
  }
}
```

```html
<div>
  <ejs-datetimepicker
    #datetimeRef
    placeholder="Select date and time">
  </ejs-datetimepicker>
  
  <button (click)="setFocus()">Focus DatetimePicker</button>
</div>
```

### focusOut Method

Removes focus from the DatetimePicker input element:

```typescript
export class AppComponent {
  @ViewChild('datetimeRef') datetimeInstance: DateTimePickerComponent;
  
  removeFocus(): void {
    this.datetimeInstance.focusOut();
    console.log('Focus removed from DatetimePicker');
  }
}
```

```html
<ejs-datetimepicker #datetimeRef></ejs-datetimepicker>
<button (click)="removeFocus()">Remove Focus</button>
```

### Focus Management

```typescript
export class AppComponent {
  @ViewChild('datetimeRef') datetimeInstance: DateTimePickerComponent;
  
  isFocused: boolean = false;
  
  toggleFocus(): void {
    if (this.isFocused) {
      this.datetimeInstance.focusOut();
      this.isFocused = false;
    } else {
      this.datetimeInstance.focusIn();
      this.isFocused = true;
    }
  }
}
```

```html
<ejs-datetimepicker
  #datetimeRef
  (focus)="isFocused = true"
  (blur)="isFocused = false">
</ejs-datetimepicker>

<button (click)="toggleFocus()">
  {{ isFocused ? 'Remove Focus' : 'Set Focus' }}
</button>
```

## Destroy Method

The `destroy()` method completely destroys and cleans up the DatetimePicker component:

```typescript
import { Component, ViewChild } from '@angular/core';
import { DateTimePickerComponent } from '@syncfusion/ej2-angular-datetimepickers';

export class AppComponent {
  @ViewChild('datetimeRef') datetimeInstance: DateTimePickerComponent;
  
  isDestroyed: boolean = false;
  
  destroyComponent(): void {
    this.datetimeInstance.destroy();
    this.isDestroyed = true;
    console.log('DatetimePicker destroyed');
  }
}
```

```html
<ejs-datetimepicker
  #datetimeRef
  [enabled]="!isDestroyed"
  placeholder="Select date and time">
</ejs-datetimepicker>

<button
  (click)="destroyComponent()"
  [disabled]="isDestroyed">
  {{ isDestroyed ? 'Destroyed' : 'Destroy Component' }}
</button>
```

### Cleanup Pattern

```typescript
import { Component, ViewChild, OnDestroy } from '@angular/core';
import { DateTimePickerComponent } from '@syncfusion/ej2-angular-datetimepickers';

export class AppComponent implements OnDestroy {
  @ViewChild('datetimeRef') datetimeInstance: DateTimePickerComponent;
  
  ngOnDestroy(): void {
    // Clean up when component is destroyed
    if (this.datetimeInstance) {
      this.datetimeInstance.destroy();
    }
  }
}
```

## getPersistData Method

The `getPersistData()` method returns component state data for persistence:

```typescript
import { Component, ViewChild } from '@angular/core';
import { DateTimePickerComponent } from '@syncfusion/ej2-angular-datetimepickers';

export class AppComponent {
  @ViewChild('datetimeRef') datetimeInstance: DateTimePickerComponent;
  
  saveState(): void {
    // Get state data for persistence
    const stateData = this.datetimeInstance.getPersistData();
    console.log('State data:', stateData);
    
    // Save to localStorage
    localStorage.setItem('datetimepickerState', stateData);
  }
}
```

```html
<ejs-datetimepicker
  #datetimeRef
  [enablePersistence]="true">
</ejs-datetimepicker>

<button (click)="saveState()">Save State</button>
```

## onPropertyChanged Method

The `onPropertyChanged(newProp: DateTimePickerModel, oldProp: DateTimePickerModel)` method is called internally when one or more component properties change. This is mainly used by the library lifecycle and is not typically invoked directly in application code.

```typescript
// Signature (for reference only)
onPropertyChanged(newProp: DateTimePickerModel, oldProp: DateTimePickerModel): void;

// Example: listen for changes via setter or component lifecycle (not commonly called directly)
// The framework calls this method when bound properties change.
```

## removeDate Method

The `removeDate(dates: Date | Date[])` method removes one or multiple dates from the component's internal values (when using a calendar with values collection).

```typescript
@ViewChild('datetimeRef') datetimeInstance: DateTimePickerComponent;

removeSpecificDate(): void {
  this.datetimeInstance.removeDate(new Date(2026, 2, 15));
}

removeMultipleDates(): void {
  this.datetimeInstance.removeDate([
    new Date(2026, 2, 15),
    new Date(2026, 2, 20)
  ]);
}
```

## Practical Examples

### Example 1: Form with Datetime Controls

```typescript
export class AppointmentFormComponent {
  @ViewChild('startDateRef') startDateInstance: DateTimePickerComponent;
  @ViewChild('endDateRef') endDateInstance: DateTimePickerComponent;
  
  startDateTime: Date;
  endDateTime: Date;
  formSubmitted: boolean = false;
  
  submitForm(): void {
    // Validate dates
    if (!this.startDateTime || !this.endDateTime) {
      console.log('Dates are required');
      return;
    }
    
    if (this.endDateTime <= this.startDateTime) {
      alert('End date must be after start date');
      return;
    }
    
    this.formSubmitted = true;
    console.log('Form submitted:', {
      start: this.startDateTime,
      end: this.endDateTime
    });
  }
  
  resetForm(): void {
    this.startDateTime = null;
    this.endDateTime = null;
    this.formSubmitted = false;
    
    // Reset focus
    this.startDateInstance?.focusIn();
  }
}
```

### Example 2: Time-based Navigation

```typescript
export class SmartNavigationComponent {
  @ViewChild('datetimeRef') datetimeInstance: DateTimePickerComponent;
  
  selectedYear: number = new Date().getFullYear();
  
  goToYear(year: number): void {
    const targetDate = new Date(year, 0, 1);
    this.datetimeInstance.navigateTo('Year', targetDate);
    this.selectedYear = year;
  }
  
  goToPreviousYear(): void {
    this.goToYear(this.selectedYear - 1);
  }
  
  goToNextYear(): void {
    this.goToYear(this.selectedYear + 1);
  }
  
  goToCurrentYear(): void {
    this.goToYear(new Date().getFullYear());
  }
}
```

```html
<div>
  <div style="margin-bottom: 10px;">
    <button (click)="goToPreviousYear()">← Previous Year</button>
    <span style="margin: 0 10px;">{{ selectedYear }}</span>
    <button (click)="goToNextYear()">Next Year →</button>
    <button (click)="goToCurrentYear()">Today</button>
  </div>
  
  <ejs-datetimepicker
    #datetimeRef
    [start]="'Year'"
    placeholder="Select month and time">
  </ejs-datetimepicker>
</div>
```

### Example 3: Interactive Navigation UI

```typescript
export class InteractivePickerComponent {
  @ViewChild('datetimeRef') datetimeInstance: DateTimePickerComponent;
  
  currentView: string = 'Month';
  navigationStack: string[] = [];
  
  navigateToView(view: string): void {
    this.datetimeInstance.navigateTo(view as any, new Date());
    this.navigationStack.push(view);
    this.currentView = view;
  }
  
  goBack(): void {
    if (this.navigationStack.length > 1) {
      this.navigationStack.pop();
      const previousView = this.navigationStack[this.navigationStack.length - 1];
      this.navigateToView(previousView);
    }
  }
  
  canGoBack(): boolean {
    return this.navigationStack.length > 1;
  }
}
```

```html
<div>
  <div style="margin-bottom: 10px;">
    <button (click)="goBack()" [disabled]="!canGoBack()">← Back</button>
    
    <button (click)="navigateToView('Month')">Day View</button>
    <button (click)="navigateToView('Year')">Month View</button>
    <button (click)="navigateToView('Decade')">Year View</button>
    
    <span style="margin-left: 10px;">Current: {{ currentView }}</span>
  </div>
  
  <ejs-datetimepicker
    #datetimeRef
    placeholder="Select date and time">
  </ejs-datetimepicker>
</div>
```
