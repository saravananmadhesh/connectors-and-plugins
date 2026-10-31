# Events & Callbacks

## Table of Contents
- [Change Event](#change-event)
- [Lifecycle Events](#lifecycle-events)
- [Popup Events](#popup-events)
- [Focus Events](#focus-events)
- [Calendar Navigation Events](#calendar-navigation-events)
- [Day Cell Rendering](#day-cell-rendering)
- [Event Handling Patterns](#event-handling-patterns)

## Change Event

The `change` event fires when the user selects a new datetime value. This is the most commonly used event.

### Basic Change Handling

```typescript
import { Component } from '@angular/core';
import { ChangedEventArgs } from '@syncfusion/ej2-datetimepickers';

export class AppComponent {
  selectedDateTime: Date = new Date();
  lastChangedValue: Date;
  changeCount: number = 0;
  
  onDateTimeChange(args: ChangedEventArgs): void {
    this.changeCount++;
    this.lastChangedValue = args.value as Date;
    
    console.log('Event Details:');
    console.log('- New value:', args.value);
    console.log('- Previous value:', args.previousValue);
    console.log('- Change count:', this.changeCount);
  }
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  (change)="onDateTimeChange($event)">
</ejs-datetimepicker>

<p>Last selected: {{ lastChangedValue | date:'medium' }}</p>
<p>Changed {{ changeCount }} times</p>
```

### ChangedEventArgs Properties

```typescript
// Available properties in ChangedEventArgs
export interface ChangedEventArgs {
  value: Date;              // The newly selected datetime
  previousValue: Date;      // The previously selected datetime
}
```

### Validation in Change Event

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  isValid: boolean = true;
  errorMessage: string = '';
  
  minDateTime: Date = new Date(2020, 0, 1);
  maxDateTime: Date = new Date(2030, 11, 31);
  
  onDateTimeChange(args: ChangedEventArgs): void {
    const newValue = args.value as Date;
    
    // Validate within range
    if (newValue < this.minDateTime || newValue > this.maxDateTime) {
      this.isValid = false;
      this.errorMessage = 'Selected date is outside valid range';
      this.selectedDateTime = args.previousValue; // Revert
    } else {
      this.isValid = true;
      this.errorMessage = '';
    }
  }
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [min]="minDateTime"
  [max]="maxDateTime"
  (change)="onDateTimeChange($event)">
</ejs-datetimepicker>

<span [style.color]="isValid ? 'green' : 'red'">
  {{ isValid ? 'Valid' : errorMessage }}
</span>
```

## Lifecycle Events

### Created Event

Fires when the DatetimePicker component is initialized and ready:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  isReady: boolean = false;
  
  onCreated(): void {
    this.isReady = true;
    console.log('DatetimePicker created and ready');
    
    // Initialize default values or perform setup
  }
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  (created)="onCreated()"
  [enabled]="isReady">
</ejs-datetimepicker>

<p>Component ready: {{ isReady }}</p>
```

### Destroyed Event

Fires when the DatetimePicker component is destroyed or disposed:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  onDestroyed(): void {
    console.log('DatetimePicker destroyed');
    
    // Clean up resources
    // Unsubscribe from observables
    // Save state
  }
  
  ngOnDestroy(): void {
    // Component cleanup
  }
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  (destroyed)="onDestroyed()">
</ejs-datetimepicker>
```

## Popup Events

### Open Event

Fires when the calendar and time picker popup is opened:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  popupOpenCount: number = 0;
  lastOpenedTime: Date;
  
  onPopupOpen(): void {
    this.popupOpenCount++;
    this.lastOpenedTime = new Date();
    
    console.log('Popup opened');
    console.log('Total opens:', this.popupOpenCount);
  }
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  (open)="onPopupOpen()">
</ejs-datetimepicker>

<p>Popup opened: {{ popupOpenCount }} times</p>
```

### Close Event

Fires when the calendar and time picker popup is closed:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  popupOpenTime: Date;
  popupOpenDuration: string;
  
  onPopupOpen(): void {
    this.popupOpenTime = new Date();
  }
  
  onPopupClose(): void {
    if (this.popupOpenTime) {
      const duration = new Date().getTime() - this.popupOpenTime.getTime();
      this.popupOpenDuration = `${duration}ms`;
      console.log('Popup closed after:', this.popupOpenDuration);
    }
  }
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  (open)="onPopupOpen()"
  (close)="onPopupClose()">
</ejs-datetimepicker>

<p>Last popup duration: {{ popupOpenDuration }}</p>
```

## Focus Events

### Focus Event

Fires when the DatetimePicker input receives focus:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  isFocused: boolean = false;
  
  onFocus(): void {
    this.isFocused = true;
    console.log('DatetimePicker focused');
  }
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  (focus)="onFocus()"
  placeholder="Click to focus">
</ejs-datetimepicker>

<span [style.color]="isFocused ? 'blue' : 'gray'">
  {{ isFocused ? 'Focused' : 'Not focused' }}
</span>
```

### Blur Event

Fires when the DatetimePicker input loses focus:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  isFocused: boolean = false;
  
  onFocus(): void {
    this.isFocused = true;
  }
  
  onBlur(): void {
    this.isFocused = false;
    console.log('DatetimePicker blurred');
    
    // Validate on blur
    if (!this.selectedDateTime) {
      console.log('Warning: No datetime selected');
    }
  }
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  (focus)="onFocus()"
  (blur)="onBlur()">
</ejs-datetimepicker>

<span>Status: {{ isFocused ? 'Focused' : 'Blurred' }}</span>
```

## Calendar Navigation Events

### Navigated Event

Fires when the calendar navigates to a different view or date:

```typescript
import { NavigatedEventArgs } from '@syncfusion/ej2-calendars';

export class AppComponent {
  selectedDateTime: Date = new Date();
  currentView: string = 'Month';
  navigationHistory: string[] = [];
  
  onNavigated(args: NavigatedEventArgs): void {
    this.currentView = args.view;
    
    console.log('Navigation event:');
    console.log('- New view:', args.view); // 'Month', 'Year', or 'Decade'
    console.log('- New date:', args.date);
    
    this.navigationHistory.push(`${args.view} at ${args.date}`);
  }
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  (navigated)="onNavigated($event)">
</ejs-datetimepicker>

<p>Current view: {{ currentView }}</p>
<div style="font-size: 12px; color: #666;">
  <div>Navigation history:</div>
  <div *ngFor="let entry of navigationHistory">
    → {{ entry }}
  </div>
</div>
```

### NavigatedEventArgs Properties

```typescript
// Available properties in NavigatedEventArgs
export interface NavigatedEventArgs {
  view: string;      // 'Month', 'Year', or 'Decade'
  date: Date;        // The date in the new view
}
```

## Day Cell Rendering

### RenderDayCell Event

The `renderDayCell` event fires for each day cell in the calendar, allowing custom styling and disabling of dates:

```typescript
import { RenderDayCellEventArgs } from '@syncfusion/ej2-calendars';

export class AppComponent {
  selectedDateTime: Date = new Date();
  disabledDates: number[] = [5, 15, 25]; // 5th, 15th, 25th of month
  
  onRenderDayCell(args: RenderDayCellEventArgs): void {
    const date = args.date as Date;
    const day = date.getDate();
    
    // Disable specific dates
    if (this.disabledDates.includes(day)) {
      args.isDisabled = true;
    }
    
    // Disable weekends
    if (date.getDay() === 0 || date.getDay() === 6) {
      args.isDisabled = true;
    }
  }
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  (renderDayCell)="onRenderDayCell($event)">
</ejs-datetimepicker>
```

### RenderDayCellEventArgs Properties

```typescript
// Available properties in RenderDayCellEventArgs
export interface RenderDayCellEventArgs {
  date: Date;           // The date of the cell
  element: HTMLElement; // The DOM element of the cell
  isDisabled: boolean;  // Set to true to disable the date
  isOtherMonth: boolean; // Whether date is from other month
  isSelected: boolean;  // Whether date is selected
}
```

### Custom Styling with RenderDayCell

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  onRenderDayCell(args: RenderDayCellEventArgs): void {
    const date = args.date as Date;
    
    // Highlight weekends with different color
    if (date.getDay() === 0 || date.getDay() === 6) {
      args.element.style.backgroundColor = '#ffe6e6';
      args.element.style.color = '#d32f2f';
    }
    
    // Highlight holidays
    const holidays = [25, 26]; // Dec 25-26
    if (date.getMonth() === 11 && holidays.includes(date.getDate())) {
      args.element.style.backgroundColor = '#fff9c4';
      args.element.style.fontWeight = 'bold';
    }
    
    // Disable past dates
    const today = new Date();
    if (date < today && !isSameDay(date, today)) {
      args.element.style.opacity = '0.5';
      args.element.style.cursor = 'not-allowed';
      args.isDisabled = true;
    }
  }
  
  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }
}
```

## Cleared Event

The `cleared` event fires when the user clicks the Clear button:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  clearCount: number = 0;
  
  onCleared(): void {
    this.clearCount++;
    console.log('Cleared button clicked');
    console.log('Times cleared:', this.clearCount);
  }
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [showClearButton]="true"
  (cleared)="onCleared()">
</ejs-datetimepicker>

<p>Clear button clicked: {{ clearCount }} times</p>
```

## Event Handling Patterns

### Multi-Event Coordination

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  eventLog: string[] = [];
  isBusySelecting: boolean = false;
  
  logEvent(eventName: string, details: string = ''): void {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.push(`[${timestamp}] ${eventName}: ${details}`);
  }
  
  onPopupOpen(): void {
    this.isBusySelecting = true;
    this.logEvent('OPEN', 'Popup opened');
  }
  
  onFocus(): void {
    this.logEvent('FOCUS', 'Input focused');
  }
  
  onNavigated(args: NavigatedEventArgs): void {
    this.logEvent('NAVIGATE', `Switched to ${args.view}`);
  }
  
  onDateTimeChange(args: ChangedEventArgs): void {
    this.logEvent('CHANGE', `Selected ${args.value}`);
  }
  
  onPopupClose(): void {
    this.isBusySelecting = false;
    this.logEvent('CLOSE', 'Popup closed');
  }
  
  onBlur(): void {
    this.logEvent('BLUR', 'Input blurred');
  }
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  (open)="onPopupOpen()"
  (focus)="onFocus()"
  (navigated)="onNavigated($event)"
  (change)="onDateTimeChange($event)"
  (close)="onPopupClose()"
  (blur)="onBlur()">
</ejs-datetimepicker>

<div style="margin-top: 20px; border: 1px solid #ccc; padding: 10px; font-size: 12px;">
  <strong>Event Log:</strong>
  <div *ngFor="let event of eventLog" style="color: #666;">
    {{ event }}
  </div>
</div>
```

### Dependent Event Handlers

```typescript
export class AppComponent {
  startDateTime: Date;
  endDateTime: Date;
  
  onStartDateChange(args: ChangedEventArgs): void {
    this.startDateTime = args.value as Date;
    
    // Auto-update end datetime
    this.endDateTime = new Date(this.startDateTime);
    this.endDateTime.setHours(this.endDateTime.getHours() + 2);
    
    console.log('Start updated, end auto-adjusted');
  }
  
  onEndDateChange(args: ChangedEventArgs): void {
    this.endDateTime = args.value as Date;
    
    // Validate that end is after start
    if (this.endDateTime <= this.startDateTime) {
      this.endDateTime = new Date(this.startDateTime);
      this.endDateTime.setHours(this.endDateTime.getHours() + 1);
      console.log('End adjusted to be after start');
    }
  }
}
```

```html
<div>
  <div>
    <label>Start DateTime:</label>
    <ejs-datetimepicker
      [(ngModel)]="startDateTime"
      (change)="onStartDateChange($event)">
    </ejs-datetimepicker>
  </div>
  
  <div>
    <label>End DateTime:</label>
    <ejs-datetimepicker
      [(ngModel)]="endDateTime"
      [min]="startDateTime"
      (change)="onEndDateChange($event)">
    </ejs-datetimepicker>
  </div>
  
  <p>Duration: {{ (endDateTime?.getTime() - startDateTime?.getTime()) / 3600000 }} hours</p>
</div>
```

