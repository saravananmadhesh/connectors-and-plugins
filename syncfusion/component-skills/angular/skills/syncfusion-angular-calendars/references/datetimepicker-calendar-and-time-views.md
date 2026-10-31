# Calendar & Time Views

## Table of Contents
- [Calendar View Modes](#calendar-view-modes)
- [Start Property](#start-property)
- [Depth Property](#depth-property)
- [Time Picker Configuration](#time-picker-configuration)
- [Step Intervals](#step-intervals)
- [ScrollTo Position](#scrollto-position)
- [Today and Clear Buttons](#today-and-clear-buttons)
- [View Navigation](#view-navigation)

## Calendar View Modes

The DatetimePicker's calendar displays in three view modes: Month, Year, and Decade. Users can navigate between these views.

### Month View (Default)

Month view shows individual days of a month with week numbers and day headers:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  startView: string = 'Month'; // Default
}
```

```html
<!-- Month view (default) -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [start]="startView"
  placeholder="Select date and time">
</ejs-datetimepicker>
```

**Features:**
- Navigate between months with arrow buttons
- Click on dates to select
- See weekends highlighted differently
- Week numbers displayed (optional)

### Year View

Year view shows 12 months in a grid. Click a month to navigate to that month in calendar:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  startView: string = 'Year';
}
```

```html
<!-- Start in year view -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [start]="startView"
  placeholder="Select date and time">
</ejs-datetimepicker>
```

**Navigation:**
- Shows 12 months in grid
- Click month to navigate to that month in calendar
- Use arrows to navigate to previous/next year
- Click year header to go to decade view

### Decade View

Decade view shows 10 years. Click a year to navigate to that year's months:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  startView: string = 'Decade';
}
```

```html
<!-- Start in decade view -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [start]="startView"
  placeholder="Select date and time">
</ejs-datetimepicker>
```

**Navigation:**
- Shows 10 years in grid
- Click year to navigate to months of that year
- Use arrows to navigate to previous/next decade
- Spans years like 2020-2029

## Start Property

The `start` property determines which view initially opens when the popup is opened:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  // Different starting views
  startMonth: string = 'Month';   // Opens to day selection
  startYear: string = 'Year';     // Opens to month selection
  startDecade: string = 'Decade'; // Opens to year selection
}
```

```html
<!-- Day selection (typical use case) -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [start]="startMonth">
</ejs-datetimepicker>

<!-- Month selection (useful for month-only selections) -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [start]="startYear">
</ejs-datetimepicker>

<!-- Year selection (useful for year-only selections) -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [start]="startDecade">
</ejs-datetimepicker>
```

## Depth Property

The `depth` property restricts navigation to a maximum view level. Depth must be equal to or lower than start view:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  // Restrict calendar navigation
  // Start: Month, Depth: Month = Can only view/select days
  start1: string = 'Month';
  depth1: string = 'Month';
  
  // Start: Year, Depth: Month = Can view years/months, but drill down to days
  start2: string = 'Year';
  depth2: string = 'Month';
  
  // Start: Decade, Depth: Year = Can view decades/years, but not drill down to months
  start3: string = 'Decade';
  depth3: string = 'Year';
}
```

```html
<!-- Only month view, cannot navigate to year/decade -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [start]="start1"
  [depth]="depth1"
  placeholder="Day selection only">
</ejs-datetimepicker>

<!-- Can navigate to years/months, but drills down to days -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [start]="start2"
  [depth]="depth2"
  placeholder="Month drill-down">
</ejs-datetimepicker>

<!-- Can navigate years in decade view only -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [start]="start3"
  [depth]="depth3"
  placeholder="Year drill-down">
</ejs-datetimepicker>
```

### Start vs Depth Table

| Scenario | Start | Depth | Behavior |
|----------|-------|-------|----------|
| Day selection only | Month | Month | Only view/select individual days |
| Month drill-down | Year | Month | Navigate years, click to view days |
| Year drill-down | Decade | Year | Navigate decades, click to view years |
| Free navigation | Month | Month | Full month navigation (default) |

## Time Picker Configuration

### Basic Time Picker

When DatetimePicker is opened, both calendar and time picker are shown:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date(2026, 2, 24, 14, 30); // 2:30 PM
  timeFormat: string = 'hh:mm a'; // 12-hour format
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [timeFormat]="timeFormat">
</ejs-datetimepicker>
```

**Time Picker Features:**
- Displays as list/popup of time values
- User scrolls to select desired time
- Configured via `step` property (interval between times)
- Format controlled by `timeFormat` property

### 24-Hour Format

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  timeFormat: string = 'HH:mm'; // 24-hour format
  step: number = 30; // 30-minute intervals
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [timeFormat]="timeFormat"
  [step]="step"
  placeholder="24-hour format">
</ejs-datetimepicker>
```

### 12-Hour Format with AM/PM

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  timeFormat: string = 'hh:mm a'; // 12-hour with AM/PM
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [timeFormat]="timeFormat"
  placeholder="12-hour format">
</ejs-datetimepicker>
```

## Step Intervals

The `step` property defines the time interval between values in the time picker popup:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  // Common step intervals
  step15min: number = 15;  // 15-minute intervals
  step30min: number = 30;  // 30-minute intervals
  step60min: number = 60;  // 60-minute intervals (1 hour)
  step90min: number = 90;  // 90-minute intervals (1.5 hours)
}
```

```html
<!-- 15-minute intervals (more granular) -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [step]="step15min"
  placeholder="15-minute increments">
</ejs-datetimepicker>

<!-- 30-minute intervals (typical for appointments) -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [step]="step30min"
  placeholder="30-minute increments">
</ejs-datetimepicker>

<!-- 60-minute intervals (hours only) -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [step]="step60min"
  placeholder="Hourly increments">
</ejs-datetimepicker>
```

### Dynamic Step Configuration

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  appointmentType: string = 'short';
  
  get stepInterval(): number {
    switch(this.appointmentType) {
      case 'short':
        return 15;   // Quick calls
      case 'medium':
        return 30;   // Standard meetings
      case 'long':
        return 60;   // Full-day slots
      default:
        return 30;
    }
  }
}
```

```html
<div>
  <label>Appointment Type:</label>
  <select [(ngModel)]="appointmentType">
    <option value="short">Quick Call (15 min)</option>
    <option value="medium">Standard (30 min)</option>
    <option value="long">Full Slot (60 min)</option>
  </select>
  
  <ejs-datetimepicker
    [(ngModel)]="selectedDateTime"
    [step]="stepInterval">
  </ejs-datetimepicker>
</div>
```

## ScrollTo Position

The `scrollTo` property sets the initial scroll position in the time picker popup:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  // Scroll to business hours (9 AM)
  scrollToTime: Date = new Date(2026, 2, 24, 9, 0);
}
```

```html
<!-- Time picker scrolls to 9 AM on open -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [scrollTo]="scrollToTime"
  placeholder="Time picker scrolls to 9 AM">
</ejs-datetimepicker>
```

### Business Hours ScrollTo

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  // Scroll to common times
  scrollMorning: Date = new Date(2026, 2, 24, 9, 0);   // 9 AM
  scrollAfternoon: Date = new Date(2026, 2, 24, 14, 0); // 2 PM
  scrollEvening: Date = new Date(2026, 2, 24, 18, 0);   // 6 PM
  
  currentScrollTime: Date = this.scrollMorning;
}
```

```html
<div>
  <button (click)="currentScrollTime = scrollMorning">
    Morning (9 AM)
  </button>
  <button (click)="currentScrollTime = scrollAfternoon">
    Afternoon (2 PM)
  </button>
  <button (click)="currentScrollTime = scrollEvening">
    Evening (6 PM)
  </button>
  
  <ejs-datetimepicker
    [(ngModel)]="selectedDateTime"
    [scrollTo]="currentScrollTime">
  </ejs-datetimepicker>
</div>
```

## Today and Clear Buttons

### Show Today Button

The `showTodayButton` property displays a "Today" button that sets the date to today:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  showToday: boolean = true;
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [showTodayButton]="showToday"
  placeholder="Click 'Today' button to set current date">
</ejs-datetimepicker>
```

### Show Clear Button

The `showClearButton` property displays a "Clear" button to clear the selection:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  showClear: boolean = true;
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [showClearButton]="showClear"
  placeholder="Click 'Clear' button to remove selection">
</ejs-datetimepicker>
```

### Both Buttons Together

```typescript
export class AppComponent {
  selectedDateTime: Date = null;
}
```

```html
<!-- Shows both Today and Clear buttons -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [showTodayButton]="true"
  [showClearButton]="true"
  placeholder="Select date and time">
</ejs-datetimepicker>
```

## View Navigation

### Navigating Between Views Programmatically

Use the `navigateTo()` method to switch between calendar views:

```typescript
import { Component, ViewChild } from '@angular/core';
import { DateTimePickerComponent } from '@syncfusion/ej2-angular-datetimepickers';

export class AppComponent {
  @ViewChild('datetimeRef') datetimeInstance: DateTimePickerComponent;
  
  navigateToYear(): void {
    this.datetimeInstance.navigateTo('Year', new Date());
  }
  
  navigateToMonth(): void {
    this.datetimeInstance.navigateTo('Month', new Date());
  }
  
  navigateToDecade(): void {
    this.datetimeInstance.navigateTo('Decade', new Date());
  }
  
  navigateToSpecificDate(): void {
    const targetDate = new Date(2025, 11, 25); // Dec 25, 2025
    this.datetimeInstance.navigateTo('Month', targetDate);
  }
}
```

```html
<div>
  <ejs-datetimepicker
    #datetimeRef
    placeholder="Select date and time">
  </ejs-datetimepicker>
  
  <button (click)="navigateToYear()">Go to Year</button>
  <button (click)="navigateToMonth()">Go to Month</button>
  <button (click)="navigateToDecade()">Go to Decade</button>
  <button (click)="navigateToSpecificDate()">Go to Dec 2025</button>
</div>
```

### Get Current View

```typescript
import { Component, ViewChild } from '@angular/core';
import { DateTimePickerComponent } from '@syncfusion/ej2-angular-datetimepickers';

export class AppComponent {
  @ViewChild('datetimeRef') datetimeInstance: DateTimePickerComponent;
  
  currentView: string;
  
  getView(): void {
    this.currentView = this.datetimeInstance.currentView();
    console.log('Current view:', this.currentView);
  }
}
```

```html
<ejs-datetimepicker
  #datetimeRef
  (open)="getView()">
</ejs-datetimepicker>

<p>Current view: {{ currentView }}</p>
```

### Navigate on Event

```typescript
export class AppComponent {
  @ViewChild('datetimeRef') datetimeInstance: DateTimePickerComponent;
  
  onPopupOpen(): void {
    // When popup opens, navigate to year view
    this.datetimeInstance.navigateTo('Year', new Date());
  }
  
  onNavigated(args: NavigatedEventArgs): void {
    console.log('Navigated to view:', args.view);
    console.log('Navigated date:', args.date);
  }
}
```

```html
<ejs-datetimepicker
  #datetimeRef
  (open)="onPopupOpen()"
  (navigated)="onNavigated($event)">
</ejs-datetimepicker>
```

## Complete Example: Smart Calendar Selection

```typescript
export class SmartAppointmentComponent {
  @ViewChild('datetimeRef') datetimeInstance: DateTimePickerComponent;
  
  selectedDateTime: Date;
  selectionMode: string = 'date'; // 'date', 'month', 'year'
  
  get startView(): string {
    switch(this.selectionMode) {
      case 'date':
        return 'Month';
      case 'month':
        return 'Year';
      case 'year':
        return 'Decade';
      default:
        return 'Month';
    }
  }
  
  get depthView(): string {
    switch(this.selectionMode) {
      case 'date':
        return 'Month';
      case 'month':
        return 'Year';
      case 'year':
        return 'Decade';
      default:
        return 'Month';
    }
  }
  
  get timeFormat(): string {
    return this.selectionMode === 'date' ? 'hh:mm a' : null;
  }
}
```

```html
<div>
  <div style="margin-bottom: 10px;">
    <label>
      <input
        type="radio"
        [(ngModel)]="selectionMode"
        value="date">
      Select Date & Time
    </label>
    <label>
      <input
        type="radio"
        [(ngModel)]="selectionMode"
        value="month">
      Select Month Only
    </label>
    <label>
      <input
        type="radio"
        [(ngModel)]="selectionMode"
        value="year">
      Select Year Only
    </label>
  </div>
  
  <ejs-datetimepicker
    #datetimeRef
    [(ngModel)]="selectedDateTime"
    [start]="startView"
    [depth]="depthView"
    [timeFormat]="timeFormat"
    placeholder="Smart selection based on mode">
  </ejs-datetimepicker>
</div>
```
