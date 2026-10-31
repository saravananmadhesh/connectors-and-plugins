# Date Selection Modes

## Table of Contents
- [Single Date Selection](#single-date-selection)
- [Multiple Date Selection](#multiple-date-selection)
- [Date Constraints](#date-constraints)
- [Programmatic Date Management](#programmatic-date-management)
- [Date Validation](#date-validation)
- [Resetting Selection](#resetting-selection)

## Single Date Selection

Single date selection is the default mode where only one date can be selected at a time.

### Basic Implementation

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  // Single date binding
  selectedDate: Date = new Date();
  
  onDateChange(args: any): void {
    console.log('Selected date:', this.selectedDate);
  }
}
```

```html
<!-- app.component.html -->
<ejs-calendar 
  [(ngModel)]="selectedDate"
  (change)="onDateChange($event)">
</ejs-calendar>

<p>Selected: {{ selectedDate | date:'fullDate' }}</p>
```

### Date Formatting

```typescript
export class AppComponent {
  selectedDate: Date = new Date();
  
  // Format date for display
  getFormattedDate(): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return this.selectedDate.toLocaleDateString('en-US', options);
  }
  
  // Get date components
  getDateDetails(): void {
    const date = this.selectedDate;
    console.log('Year:', date.getFullYear());
    console.log('Month:', date.getMonth() + 1); // 0-indexed
    console.log('Day:', date.getDate());
    console.log('Day of week:', date.getDay()); // 0-6
  }
}
```

### Initial Date Set

```typescript
export class AppComponent {
  // Set today
  todayDate: Date = new Date();
  
  // Set specific date
  specificDate: Date = new Date(2026, 5, 15); // June 15, 2026
  
  // Set to beginning of month
  monthStart: Date = new Date(2026, 5, 1);
  
  // Set to end of month
  monthEnd: Date = new Date(2026, 6, 0); // Last day of previous month
}
```

## Multiple Date Selection

Enable multiple date selection using `isMultiSelection` property.

### Basic Multi-Selection

```typescript
// app.component.ts
export class AppComponent {
  // Array of selected dates
  selectedDates: Date[] = [
    new Date(2026, 2, 15),
    new Date(2026, 2, 20),
    new Date(2026, 2, 25)
  ];
  
  enableMultiSelection: boolean = true;
  
  onDatesChange(args: any): void {
    console.log('Selected dates count:', this.selectedDates.length);
    console.log('Dates:', this.selectedDates);
  }
}
```

```html
<!-- app.component.html -->
<ejs-calendar 
  [(ngModel)]="selectedDates"
  [isMultiSelection]="enableMultiSelection"
  (change)="onDatesChange($event)">
</ejs-calendar>

<p>Total selected: {{ selectedDates.length }} dates</p>
<ul>
  <li *ngFor="let date of selectedDates">
    {{ date | date:'mediumDate' }}
  </li>
</ul>
```

### Adding/Removing Dates Programmatically

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
  
  // Add single date
  addDate(date: Date): void {
    // Check if date already exists
    if (!this.selectedDates.some(d => 
        d.toDateString() === date.toDateString())) {
      this.calendar.addDate(date);
    }
  }
  
  // Add multiple dates
  addMultipleDates(dates: Date[]): void {
    this.calendar.addDate(dates);
  }
  
  // Remove single date
  removeDate(date: Date): void {
    this.calendar.removeDate(date);
  }
  
  // Remove multiple dates
  removeMultipleDates(dates: Date[]): void {
    this.calendar.removeDate(dates);
  }
  
  // Clear all dates
  clearAllDates(): void {
    if (this.selectedDates.length > 0) {
      this.calendar.removeDate(this.selectedDates);
    }
  }
  
  // Add date range
  addDateRange(startDate: Date, endDate: Date): void {
    const dates: Date[] = [];
    const current = new Date(startDate);
    
    while (current <= endDate) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    this.calendar.addDate(dates);
  }
}
```

```html
<!-- app.component.html -->
<div style="margin-bottom: 20px;">
  <button (click)="addDate(new Date())" style="margin-right: 10px;">
    Add Today
  </button>
  <button (click)="clearAllDates()" style="margin-right: 10px;">
    Clear All
  </button>
  <button (click)="addDateRange(new Date(2026, 2, 1), new Date(2026, 2, 7))">
    Add Week
  </button>
</div>

<ejs-calendar 
  #calendar
  [(ngModel)]="selectedDates"
  [isMultiSelection]="true">
</ejs-calendar>

<p style="margin-top: 20px;">Selected: {{ selectedDates.length }} dates</p>
```

## Date Constraints

Restrict selectable date range using `min` and `max` properties.

### Min/Max Date Constraints

```typescript
// app.component.ts
export class AppComponent {
  selectedDate: Date = new Date();
  
  // Allow dates from 1 year ago to 1 year in future
  minDate: Date = new Date();
  maxDate: Date = new Date();
  
  constructor() {
    // Set min to 1 year ago
    this.minDate.setFullYear(this.minDate.getFullYear() - 1);
    
    // Set max to 1 year in future
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 1);
  }
  
  // Restrict to business days only
  disableWeekends: boolean = true;
  
  // Restrict to specific months
  allowedMonths: number[] = [5, 6, 7]; // June, July, August
}
```

```html
<!-- app.component.html -->
<ejs-calendar 
  [(ngModel)]="selectedDate"
  [min]="minDate"
  [max]="maxDate">
</ejs-calendar>

<p>Selectable from {{ minDate | date:'mediumDate' }} to {{ maxDate | date:'mediumDate' }}</p>
```

### Disable Specific Dates/Weekends

Use `renderDayCell` event to disable specific dates:

```typescript
import { Component } from '@angular/core';
import { RenderDayCellEventArgs } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedDate: Date = new Date();
  
  // Holidays to disable
  holidays: Date[] = [
    new Date(2026, 11, 25), // Christmas
    new Date(2026, 0, 1),   // New Year
    new Date(2026, 6, 4),   // Independence Day
  ];
  
  onRenderDayCell(args: RenderDayCellEventArgs): void {
    // Disable weekends (0 = Sunday, 6 = Saturday)
    if (args.date.getDay() === 0 || args.date.getDay() === 6) {
      args.isDisabled = true;
    }
    
    // Disable holidays
    if (this.isHoliday(args.date)) {
      args.isDisabled = true;
      args.cellData.className = 'holiday';
    }
    
    // Disable past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (args.date < today) {
      args.isDisabled = true;
    }
  }
  
  private isHoliday(date: Date): boolean {
    return this.holidays.some(holiday =>
      holiday.toDateString() === date.toDateString()
    );
  }
}
```

```html
<!-- app.component.html -->
<ejs-calendar 
  [(ngModel)]="selectedDate"
  (renderDayCell)="onRenderDayCell($event)">
</ejs-calendar>

<style>
  :host ::ng-deep .holiday {
    background-color: #ffcccc !important;
    color: #cc0000;
  }
</style>
```

## Programmatic Date Management

### Check If Date Is Selected

```typescript
export class AppComponent {
  selectedDates: Date[] = [];
  
  isDateSelected(date: Date): boolean {
    return this.selectedDates.some(d =>
      d.toDateString() === date.toDateString()
    );
  }
  
  toggleDate(date: Date): void {
    if (this.isDateSelected(date)) {
      // Remove if already selected
      this.selectedDates = this.selectedDates.filter(d =>
        d.toDateString() !== date.toDateString()
      );
    } else {
      // Add if not selected
      this.selectedDates.push(date);
    }
  }
}
```

### Find First/Last Selected Date

```typescript
export class AppComponent {
  selectedDates: Date[] = [];
  
  getFirstSelectedDate(): Date | null {
    if (this.selectedDates.length === 0) return null;
    return this.selectedDates.reduce((min, date) =>
      date < min ? date : min
    );
  }
  
  getLastSelectedDate(): Date | null {
    if (this.selectedDates.length === 0) return null;
    return this.selectedDates.reduce((max, date) =>
      date > max ? date : max
    );
  }
  
  getDateRange(): { start: Date, end: Date } | null {
    if (this.selectedDates.length === 0) return null;
    return {
      start: this.getFirstSelectedDate()!,
      end: this.getLastSelectedDate()!
    };
  }
}
```

## Date Validation

### Validate Date Selection

```typescript
export class AppComponent {
  selectedDate: Date | null = null;
  
  isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }
  
  isDateInFuture(date: Date): boolean {
    return date > new Date();
  }
  
  isDateInPast(date: Date): boolean {
    return date < new Date();
  }
  
  isDateToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }
  
  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6;
  }
  
  isBusinessDay(date: Date): boolean {
    return !this.isWeekend(date);
  }
}
```

## Resetting Selection

### Clear Selected Dates

```typescript
import { Component, ViewChild } from '@angular/core';
import { CalendarComponent } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('calendar') calendar!: CalendarComponent;
  
  selectedDate: Date | null = null;
  selectedDates: Date[] = [];
  
  // Clear single date
  clearSingleDate(): void {
    this.selectedDate = null;
  }
  
  // Clear multiple dates
  clearMultipleDates(): void {
    this.selectedDates = [];
  }
  
  // Reset to today
  resetToToday(): void {
    this.selectedDate = new Date();
  }
  
  // Reset to specific date
  resetToDate(date: Date): void {
    this.selectedDate = date;
  }
  
  // Check if any date is selected
  hasSelection(): boolean {
    return this.selectedDate !== null || this.selectedDates.length > 0;
  }
}
```

```html
<!-- app.component.html -->
<div style="margin-bottom: 20px;">
  <button (click)="resetToToday()" style="margin-right: 10px;">Reset to Today</button>
  <button (click)="clearSingleDate()" style="margin-right: 10px;">Clear</button>
  <button [disabled]="!hasSelection()">Submit</button>
</div>
```

## Complete Example

```typescript
// app.component.ts
import { Component, ViewChild } from '@angular/core';
import { CalendarComponent } from '@syncfusion/ej2-angular-calendars';
import { RenderDayCellEventArgs, ChangedEventArgs } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('calendar') calendar!: CalendarComponent;
  
  selectedDate: Date = new Date();
  selectedDates: Date[] = [];
  selectionMode: string = 'single'; // or 'multiple'
  
  minDate: Date = new Date(2020, 0, 1);
  maxDate: Date = new Date(2030, 11, 31);
  
  onRenderDayCell(args: RenderDayCellEventArgs): void {
    // Disable weekends
    if (args.date.getDay() === 0 || args.date.getDay() === 6) {
      args.isDisabled = true;
    }
  }
  
  onDateChange(args: ChangedEventArgs): void {
    console.log('Date changed:', args.value);
  }
  
  toggleSelectionMode(): void {
    this.selectionMode = this.selectionMode === 'single' ? 'multiple' : 'single';
    if (this.selectionMode === 'single') {
      this.selectedDates = [];
    }
  }
  
  clearSelection(): void {
    this.selectedDate = new Date();
    this.selectedDates = [];
  }
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px;">
  <div style="margin-bottom: 20px;">
    <label>
      Selection Mode:
      <select (change)="toggleSelectionMode()">
        <option value="single">Single Date</option>
        <option value="multiple">Multiple Dates</option>
      </select>
    </label>
  </div>
  
  <ejs-calendar 
    #calendar
    [(ngModel)]="selectionMode === 'single' ? selectedDate : selectedDates"
    [isMultiSelection]="selectionMode === 'multiple'"
    [min]="minDate"
    [max]="maxDate"
    (renderDayCell)="onRenderDayCell($event)"
    (change)="onDateChange($event)">
  </ejs-calendar>
  
  <div style="margin-top: 20px;">
    <p *ngIf="selectionMode === 'single'">
      Selected: {{ selectedDate | date:'fullDate' }}
    </p>
    <p *ngIf="selectionMode === 'multiple'">
      Selected: {{ selectedDates.length }} dates
    </p>
    <button (click)="clearSelection()" style="margin-top: 10px;">Clear</button>
  </div>
</div>
```

## Related References

- [Calendar Views](calendar-views.md) - View navigation and switching
- [Events & Methods](events-and-methods.md) - Event handling details
- [Calendar Navigation](calendar-navigation.md) - Month/year navigation
