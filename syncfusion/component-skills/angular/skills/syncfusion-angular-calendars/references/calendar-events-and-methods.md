# Calendar Events and Methods

## Table of Contents
- [Event Handlers](#event-handlers)
- [Change Event](#change-event)
- [Navigate Event](#navigate-event)
- [RenderDayCell Event](#renderdaycell-event)
- [Created Event](#created-event)
- [Destroyed Event](#destroyed-event)
- [Calendar Methods](#calendar-methods)
- [Event Handling Patterns](#event-handling-patterns)

## Event Handlers

Calendar component provides five main events:

| Event | Fired When | Arguments |
|-------|-----------|-----------|
| `change` | Date value changes | `ChangedEventArgs` |
| `navigated` | View changes (Month/Year/Decade) | `NavigatedEventArgs` |
| `renderDayCell` | Each day cell renders | `RenderDayCellEventArgs` |
| `created` | Calendar initialization complete | `Object` |
| `destroyed` | Calendar widget is destroyed | `Object` |

## Change Event

Triggered when the selected date changes.

### Event Handler Signature

```typescript
(change)="onCalendarChange($event)"
```

### ChangedEventArgs Interface

```typescript
interface ChangedEventArgs {
  value: Date;              // The selected date
  isInteracted: boolean;    // User interaction flag
}
```

### Implementation Example

```typescript
import { Component } from '@angular/core';
import { ChangedEventArgs } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedDate: Date = new Date();
  lastChangedDate: Date | null = null;
  
  onCalendarChange(args: ChangedEventArgs): void {
    console.log('Date changed:', args.value);
    console.log('User interaction:', args.isInteracted);
    
    this.lastChangedDate = args.value as Date;
  }
}
```

```html
<ejs-calendar 
  [(ngModel)]="selectedDate"
  (change)="onCalendarChange($event)">
</ejs-calendar>

<p>Last changed: {{ lastChangedDate | date:'medium' }}</p>
```

### Detecting Manual vs Programmatic Changes

```typescript
export class AppComponent {
  onCalendarChange(args: ChangedEventArgs): void {
    if (args.isInteracted) {
      // User clicked a date
      console.log('User selected:', args.value);
    } else {
      // Date changed programmatically
      console.log('Date changed via code:', args.value);
    }
  }
}
```

## Navigate Event

Triggered when calendar view changes (Month → Year → Decade).

### Event Handler Signature

```typescript
(navigated)="onCalendarNavigate($event)"
```

### NavigatedEventArgs Interface

```typescript
interface NavigatedEventArgs {
  view: string;        // 'Month', 'Year', or 'Decade'
  focusedDate: Date;   // The focused/centered date in the view
}
```

### Implementation Example

```typescript
import { Component } from '@angular/core';
import { NavigatedEventArgs } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  currentView: string = 'Month';
  viewHistory: string[] = [];
  
  onCalendarNavigate(args: NavigatedEventArgs): void {
    console.log('Navigated to view:', args.view);
    console.log('Focused date:', args.focusedDate);
    
    this.currentView = args.view;
    this.viewHistory.push(args.view);
  }
}
```

```html
<ejs-calendar (navigated)="onCalendarNavigate($event)"></ejs-calendar>

<p>Current View: {{ currentView }}</p>
<p>View History: {{ viewHistory.join(' → ') }}</p>
```

### Tracking Navigation Depth

```typescript
export class AppComponent {
  viewDepthLevel: number = 0;
  
  onCalendarNavigate(args: NavigatedEventArgs): void {
    // Calculate depth level
    switch (args.view) {
      case 'Month':
        this.viewDepthLevel = 1;
        break;
      case 'Year':
        this.viewDepthLevel = 2;
        break;
      case 'Decade':
        this.viewDepthLevel = 3;
        break;
    }
  }
}
```

## RenderDayCell Event

Triggered for each day cell during rendering. Use for custom styling, disabling, or formatting.

### Event Handler Signature

```typescript
(renderDayCell)="onRenderDayCell($event)"
```

### RenderDayCellEventArgs Interface

```typescript
interface RenderDayCellEventArgs {
  date: Date;                    // The day's date
  isDisabled: boolean;           // Disable this day
  isOtherMonth: boolean;         // True if day from other month
  cellData: CellData;            // Cell DOM properties
}

interface CellData {
  className: string;             // CSS classes to apply
  ariaLabel: string;             // ARIA label for accessibility
}
```

### Implementation Examples

**Example 1: Disable Weekends**

```typescript
import { Component } from '@angular/core';
import { RenderDayCellEventArgs } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedDate: Date = new Date();
  
  onRenderDayCell(args: RenderDayCellEventArgs): void {
    // Disable weekends (0 = Sunday, 6 = Saturday)
    if (args.date.getDay() === 0 || args.date.getDay() === 6) {
      args.isDisabled = true;
    }
  }
}
```

```html
<ejs-calendar 
  [(ngModel)]="selectedDate"
  (renderDayCell)="onRenderDayCell($event)">
</ejs-calendar>
```

**Example 2: Highlight Holidays**

```typescript
export class AppComponent {
  holidays: Date[] = [
    new Date(2026, 11, 25), // Christmas
    new Date(2026, 0, 1),   // New Year
  ];
  
  onRenderDayCell(args: RenderDayCellEventArgs): void {
    // Check if day is a holiday
    if (this.holidays.some(h => 
        h.toDateString() === args.date.toDateString())) {
      args.cellData.className = 'holiday';
      args.cellData.ariaLabel = 'Holiday';
    }
  }
}
```

```css
:host ::ng-deep .holiday {
  background-color: #ffcccc !important;
  color: #cc0000;
  font-weight: bold;
}
```

**Example 3: Disable Past Dates**

```typescript
export class AppComponent {
  onRenderDayCell(args: RenderDayCellEventArgs): void {
    // Get today's date (normalized to start of day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Disable if before today
    if (args.date < today) {
      args.isDisabled = true;
      args.cellData.className = 'past-date';
    }
  }
}
```

**Example 4: Custom Styling for Today**

```typescript
export class AppComponent {
  onRenderDayCell(args: RenderDayCellEventArgs): void {
    const today = new Date();
    
    if (args.date.toDateString() === today.toDateString()) {
      args.cellData.className = 'today-special';
    }
  }
}
```

```css
:host ::ng-deep .today-special {
  background-color: #3f51b5 !important;
  color: white;
  border-radius: 50%;
  font-weight: bold;
}
```

## Created Event

Triggered after calendar component is fully initialized.

### Event Handler Signature

```typescript
(created)="onCalendarCreated()"
```

### Implementation Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { CalendarComponent } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('calendar') calendar!: CalendarComponent;
  calendarReady: boolean = false;
  
  onCalendarCreated(): void {
    console.log('Calendar created and ready');
    this.calendarReady = true;
    
    // Now safe to call methods on calendar instance
    const currentView = this.calendar.currentView();
    console.log('Initial view:', currentView);
  }
}
```

```html
<ejs-calendar 
  #calendar
  (created)="onCalendarCreated()">
</ejs-calendar>

<p *ngIf="calendarReady">Calendar is ready!</p>
```

## Destroyed Event

Triggered when the calendar widget is destroyed.

### Event Handler Signature

```typescript
(destroyed)="onCalendarDestroyed()"
```

### Implementation Example

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  onCalendarDestroyed(): void {
    console.log('Calendar has been destroyed');
  }
}
```

```html
<ejs-calendar 
  (destroyed)="onCalendarDestroyed()">
</ejs-calendar>
```

## Calendar Methods

### addDate() - Add Dates to Selection

Add one or more dates to the selected dates array (for multi-selection).

```typescript
// Signature
addDate(dates: Date | Date[]): void

// Example
addDate(new Date(2026, 5, 15));
addDate([new Date(2026, 5, 15), new Date(2026, 5, 20)]);
```

**Implementation:**

```typescript
import { Component, ViewChild } from '@angular/core';
import { CalendarComponent } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('calendar') calendar!: CalendarComponent;
  selectedDates: Date[] = [];
  
  addToday(): void {
    this.calendar.addDate(new Date());
  }
  
  addWeek(): void {
    const dates: Date[] = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    
    this.calendar.addDate(dates);
  }
  
  addSpecificDates(): void {
    this.calendar.addDate([
      new Date(2026, 5, 10),
      new Date(2026, 5, 20),
      new Date(2026, 5, 30)
    ]);
  }
}
```

```html
<button (click)="addToday()">Add Today</button>
<button (click)="addWeek()">Add This Week</button>
<button (click)="addSpecificDates()">Add Specific Dates</button>

<ejs-calendar 
  #calendar
  [(ngModel)]="selectedDates"
  [isMultiSelection]="true">
</ejs-calendar>
```

### removeDate() - Remove Dates from Selection

Remove one or more dates from the selected dates array.

```typescript
// Signature
removeDate(dates: Date | Date[]): void

// Example
removeDate(new Date(2026, 5, 15));
removeDate([new Date(2026, 5, 15), new Date(2026, 5, 20)]);
```

**Implementation:**

```typescript
export class AppComponent {
  @ViewChild('calendar') calendar!: CalendarComponent;
  selectedDates: Date[] = [];
  
  removeToday(): void {
    this.calendar.removeDate(new Date());
  }
  
  removeSpecificDate(date: Date): void {
    this.calendar.removeDate(date);
  }
  
  removeAllDates(): void {
    if (this.selectedDates.length > 0) {
      this.calendar.removeDate(this.selectedDates);
    }
  }
  
  removePastDates(): void {
    const today = new Date();
    const pastDates = this.selectedDates.filter(d => d < today);
    
    if (pastDates.length > 0) {
      this.calendar.removeDate(pastDates);
    }
  }
}
```

### navigateTo() - Navigate to View Programmatically

Navigate to a specific calendar view (Month/Year/Decade).

```typescript
// Signature
navigateTo(view: CalendarView, date: Date, isCustomDate?: boolean): void

// Parameters
// view: CalendarView - Specifies the view of the Calendar
// date: Date - Specifies the focused date in the view
// isCustomDate (optional): boolean - Specifies whether the calendar is rendered with custom today date or not

// Examples
navigateTo('Month', new Date());
navigateTo('Year', new Date(2026, 0, 1));
navigateTo('Decade', new Date(2025, 0, 1));
```

**Implementation:**

```typescript
export class AppComponent {
  @ViewChild('calendar') calendar!: CalendarComponent;
  selectedDate: Date = new Date();
  
  goToMonthView(): void {
    this.calendar.navigateTo('Month', new Date());
  }
  
  goToYearView(): void {
    this.calendar.navigateTo('Year', new Date());
  }
  
  goToDecadeView(): void {
    this.calendar.navigateTo('Decade', new Date());
  }
  
  navigateToDate(year: number, month: number, day: number): void {
    const date = new Date(year, month, day);
    this.calendar.navigateTo('Month', date);
  }
  
  goToNextMonth(): void {
    const nextMonth = new Date(this.selectedDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    this.calendar.navigateTo('Month', nextMonth);
  }
  
  goToPreviousMonth(): void {
    const prevMonth = new Date(this.selectedDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    this.calendar.navigateTo('Month', prevMonth);
  }
}
```

```html
<div style="margin-bottom: 20px;">
  <button (click)="goToMonthView()">Month</button>
  <button (click)="goToYearView()">Year</button>
  <button (click)="goToDecadeView()">Decade</button>
  <button (click)="goToPreviousMonth()">← Previous</button>
  <button (click)="goToNextMonth()">Next →</button>
</div>

<ejs-calendar #calendar [(ngModel)]="selectedDate"></ejs-calendar>
```

### currentView() - Get Current View

Get the currently active view.

```typescript
// Signature
currentView(): string

// Returns: 'Month', 'Year', or 'Decade'
```

**Implementation:**

```typescript
export class AppComponent {
  @ViewChild('calendar') calendar!: CalendarComponent;
  
  checkCurrentView(): void {
    const view = this.calendar.currentView();
    console.log('Current view:', view);
    
    if (view === 'Month') {
      console.log('User is viewing month calendar');
    } else if (view === 'Year') {
      console.log('User is viewing year view');
    } else if (view === 'Decade') {
      console.log('User is viewing decade view');
    }
  }
}
```

### getPersistData() - Get Persistence Data

Gets the properties to be maintained upon browser refresh.

```typescript
// Signature
getPersistData(): string

// Returns: Serialized persistence data string
```

**Implementation:**

```typescript
export class AppComponent {
  @ViewChild('calendar') calendar!: CalendarComponent;
  
  savePersistData(): void {
    const persistData = this.calendar.getPersistData();
    console.log('Persist data:', persistData);
    // Store persistData in localStorage or session if needed
    localStorage.setItem('calendarState', persistData);
  }
}
```

### destroy() - Destroy Calendar

Destroys the calendar widget and all its event handlers.

```typescript
// Signature
destroy(): void
```

**Implementation:**

```typescript
export class AppComponent {
  @ViewChild('calendar') calendar!: CalendarComponent;
  
  destroyCalendar(): void {
    this.calendar.destroy();
    console.log('Calendar has been destroyed');
  }
}
```

```html
<ejs-calendar #calendar [(ngModel)]="selectedDate"></ejs-calendar>
<button (click)="destroyCalendar()">Destroy Calendar</button>
```

## Event Handling Patterns

### Pattern 1: Date Range Validation

```typescript
export class AppComponent {
  selectedDate: Date = new Date();
  minDate: Date = new Date(2020, 0, 1);
  maxDate: Date = new Date(2030, 11, 31);
  validationMessage: string = '';
  
  onCalendarChange(args: ChangedEventArgs): void {
    const date = args.value as Date;
    
    if (date < this.minDate || date > this.maxDate) {
      this.validationMessage = 'Date out of range!';
      // Reset to previous valid date
      this.selectedDate = this.minDate;
    } else {
      this.validationMessage = '';
    }
  }
}
```

### Pattern 2: Multi-Date Selection with Limits

```typescript
export class AppComponent {
  selectedDates: Date[] = [];
  maxSelectableDates: number = 5;
  
  onCalendarChange(args: ChangedEventArgs): void {
    // Limit number of selected dates
    if (this.selectedDates.length > this.maxSelectableDates) {
      // Remove oldest date
      this.selectedDates.shift();
    }
  }
}
```

### Pattern 3: Event Logging

```typescript
export class AppComponent {
  eventLog: string[] = [];
  
  onCalendarChange(args: ChangedEventArgs): void {
    const entry = `Changed: ${args.value} (User: ${args.isInteracted})`;
    this.eventLog.push(entry);
  }
  
  onCalendarNavigate(args: NavigatedEventArgs): void {
    const entry = `Navigated to ${args.view}`;
    this.eventLog.push(entry);
  }
  
  clearEventLog(): void {
    this.eventLog = [];
  }
}
```

### Pattern 4: Real-time Validation

```typescript
import { Component } from '@angular/core';
import { RenderDayCellEventArgs } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  businessDays: number[] = [1, 2, 3, 4, 5]; // Monday-Friday
  holidays: Date[] = [];
  
  onRenderDayCell(args: RenderDayCellEventArgs): void {
    const dayOfWeek = args.date.getDay();
    const isBusinessDay = this.businessDays.includes(dayOfWeek);
    const isHoliday = this.holidays.some(h =>
      h.toDateString() === args.date.toDateString()
    );
    
    if (!isBusinessDay || isHoliday) {
      args.isDisabled = true;
      args.cellData.className = 'non-business';
    }
  }
}
```

## Complete Event Example

```typescript
// app.component.ts
import { Component, ViewChild } from '@angular/core';
import { CalendarComponent } from '@syncfusion/ej2-angular-calendars';
import {
  ChangedEventArgs,
  NavigatedEventArgs,
  RenderDayCellEventArgs
} from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('calendar') calendar!: CalendarComponent;
  
  selectedDate: Date = new Date();
  currentView: string = 'Month';
  eventLog: string[] = [];
  
  onCalendarChange(args: ChangedEventArgs): void {
    const logEntry = `[Change] Date: ${args.value}, User Interaction: ${args.isInteracted}`;
    this.eventLog.push(logEntry);
  }
  
  onCalendarNavigate(args: NavigatedEventArgs): void {
    this.currentView = args.view;
    const logEntry = `[Navigate] View: ${args.view}, Focused: ${args.focusedDate}`;
    this.eventLog.push(logEntry);
  }
  
  onRenderDayCell(args: RenderDayCellEventArgs): void {
    if (args.date.getDay() === 0 || args.date.getDay() === 6) {
      args.isDisabled = true;
    }
  }
  
  onCalendarCreated(): void {
    const logEntry = '[Created] Calendar initialized';
    this.eventLog.push(logEntry);
  }
  
  onCalendarDestroyed(): void {
    const logEntry = '[Destroyed] Calendar destroyed';
    this.eventLog.push(logEntry);
  }
  
  clearLog(): void {
    this.eventLog = [];
  }
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px;">
  <h2>Calendar Events Demo</h2>
  
  <ejs-calendar 
    #calendar
    [(ngModel)]="selectedDate"
    (change)="onCalendarChange($event)"
    (navigated)="onCalendarNavigate($event)"
    (renderDayCell)="onRenderDayCell($event)"
    (created)="onCalendarCreated()"
    (destroyed)="onCalendarDestroyed()">
  </ejs-calendar>
  
  <div style="margin-top: 20px;">
    <h3>Current View: {{ currentView }}</h3>
    <button (click)="clearLog()">Clear Log</button>
    
    <div style="border: 1px solid #ccc; padding: 10px; margin-top: 10px; max-height: 200px; overflow-y: auto;">
      <div *ngFor="let log of eventLog" style="font-family: monospace; font-size: 12px;">
        {{ log }}
      </div>
    </div>
  </div>
</div>
```

## Related References

- [Date Selection](date-selection.md) - Managing selected dates
- [Calendar Views](calendar-views.md) - View navigation details
- [Calendar Navigation](calendar-navigation.md) - Month navigation
