# Calendar Navigation & Controls

## Table of Contents
- [Today Button](#today-button)
- [Navigation Arrows](#navigation-arrows)
- [First Day of Week](#first-day-of-week)
- [Week Numbers](#week-numbers)
- [Keyboard Navigation](#keyboard-navigation)
- [Navigation Best Practices](#navigation-best-practices)

## Today Button

The Today button allows users to quickly jump to the current date in Month view.

### Enabling/Disabling Today Button

```typescript
// app.component.ts
export class AppComponent {
  selectedDate: Date = new Date();
  showTodayButton: boolean = true;
}
```

```html
<!-- app.component.html -->
<ejs-calendar 
  [(ngModel)]="selectedDate"
  [showTodayButton]="showTodayButton">
</ejs-calendar>

<label>
  <input 
    type="checkbox" 
    [(ngModel)]="showTodayButton">
  Show Today Button
</label>
```

### Today Button Behavior

- **Default:** Visible (showTodayButton = true)
- **Action:** Clicking navigates to today's date
- **View:** Only available in Month view
- **Result:** Selects today's date and updates calendar

### Implementation with Custom Logic

```typescript
export class AppComponent {
  selectedDate: Date = new Date();
  showTodayButton: boolean = true;
  
  getTodayDate(): Date {
    return new Date();
  }
  
  isSelectedDateToday(): boolean {
    const today = new Date();
    return this.selectedDate.toDateString() === today.toDateString();
  }
}
```

## Navigation Arrows

Navigation arrows in the calendar header allow month-by-month navigation.

### Arrow Controls

```
[←] [Month/Year Header] [→]
 ↑   Clickable header    ↑
Previous month arrow    Next month arrow
```

### User Navigation Flow

```
March 2026
   ↓ (click ←)
February 2026
   ↓ (click →)
March 2026
   ↓ (click →)
April 2026
```

### Programmatic Navigation with Arrows

```typescript
import { Component, ViewChild } from '@angular/core';
import { CalendarComponent } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('calendar') calendar!: CalendarComponent;
  currentMonth: Date = new Date();
  
  goToPreviousMonth(): void {
    const prevMonth = new Date(this.currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    this.calendar.navigateTo('Month', prevMonth);
    this.currentMonth = prevMonth;
  }
  
  goToNextMonth(): void {
    const nextMonth = new Date(this.currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    this.calendar.navigateTo('Month', nextMonth);
    this.currentMonth = nextMonth;
  }
  
  goToMonth(year: number, month: number): void {
    const targetDate = new Date(year, month - 1, 1);
    this.calendar.navigateTo('Month', targetDate);
    this.currentMonth = targetDate;
  }
  
  getMonthName(): string {
    return this.currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }
}
```

```html
<div style="margin-bottom: 20px;">
  <button (click)="goToPreviousMonth()">← Previous</button>
  <span style="margin: 0 20px;">{{ getMonthName() }}</span>
  <button (click)="goToNextMonth()">Next →</button>
</div>

<ejs-calendar #calendar [(ngModel)]="selectedDate"></ejs-calendar>
```

### Month Picker

```typescript
export class AppComponent {
  @ViewChild('calendar') calendar!: CalendarComponent;
  selectedDate: Date = new Date();
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  jumpToMonth(monthIndex: number): void {
    const date = new Date(this.selectedDate.getFullYear(), monthIndex, 1);
    this.calendar.navigateTo('Month', date);
  }
}
```

```html
<div>
  <label>Jump to Month:</label>
  <select (change)="jumpToMonth($event.target.value)">
    <option *ngFor="let month of months; let i = index" [value]="i">
      {{ month }}
    </option>
  </select>
</div>
```

## First Day of Week

Control which day appears first in the calendar (Sunday, Monday, etc.).

### Setting First Day of Week

```typescript
// app.component.ts
export class AppComponent {
  selectedDate: Date = new Date();
  
  // 0 = Sunday, 1 = Monday, 2 = Tuesday, etc.
  firstDayOfWeek: number = 0; // Default: Sunday
}
```

```html
<!-- app.component.html -->
<!-- Sunday as first day (default) -->
<ejs-calendar 
  [(ngModel)]="selectedDate"
  [firstDayOfWeek]="0">
</ejs-calendar>

<!-- Monday as first day -->
<ejs-calendar 
  [(ngModel)]="selectedDate"
  [firstDayOfWeek]="1">
</ejs-calendar>
```

### Dynamic First Day Selection

```typescript
export class AppComponent {
  selectedDate: Date = new Date();
  firstDayOfWeek: number = 0;
  
  weekDays: Array<{ name: string, value: number }> = [
    { name: 'Sunday', value: 0 },
    { name: 'Monday', value: 1 },
    { name: 'Tuesday', value: 2 },
    { name: 'Wednesday', value: 3 },
    { name: 'Thursday', value: 4 },
    { name: 'Friday', value: 5 },
    { name: 'Saturday', value: 6 }
  ];
  
  setFirstDay(day: number): void {
    this.firstDayOfWeek = day;
  }
  
  getFirstDayName(): string {
    const day = this.weekDays.find(d => d.value === this.firstDayOfWeek);
    return day?.name || 'Sunday';
  }
}
```

```html
<div style="margin-bottom: 20px;">
  <label>First Day of Week:</label>
  <select (change)="setFirstDay($event.target.value)">
    <option *ngFor="let day of weekDays" [value]="day.value">
      {{ day.name }}
    </option>
  </select>
</div>

<p>First day: {{ getFirstDayName() }}</p>

<ejs-calendar 
  [(ngModel)]="selectedDate"
  [firstDayOfWeek]="firstDayOfWeek">
</ejs-calendar>
```

### Locale-Specific First Day

```typescript
export class AppComponent {
  selectedDate: Date = new Date();
  locale: string = 'en-US';
  
  // Get first day of week from locale
  getFirstDayFromLocale(): number {
    // Different regions use different first day
    const arabicLocales = ['ar-SA', 'ar-AE', 'ar-KW'];
    const europeanLocales = ['de-DE', 'fr-FR', 'es-ES'];
    
    if (arabicLocales.includes(this.locale)) {
      return 6; // Saturday
    } else if (europeanLocales.includes(this.locale)) {
      return 1; // Monday
    }
    return 0; // Sunday (default)
  }
}
```

## Week Numbers

Display ISO week numbers on the left side of the calendar.

### Enabling Week Numbers

```typescript
// app.component.ts
export class AppComponent {
  selectedDate: Date = new Date();
  showWeekNumbers: boolean = true;
}
```

```html
<!-- app.component.html -->
<ejs-calendar 
  [(ngModel)]="selectedDate"
  [weekNumber]="showWeekNumbers">
</ejs-calendar>

<label>
  <input 
    type="checkbox" 
    [(ngModel)]="showWeekNumbers">
  Show Week Numbers
</label>
```

### Week Number Rules

The `weekRule` property determines how the first week of year is defined:

```typescript
export class AppComponent {
  selectedDate: Date = new Date();
  weekRule: string = 'FirstDay'; // or 'FirstFullWeek', 'FirstFourDayWeek'
}
```

```html
<!-- FirstDay: Week containing January 1st is week 1 -->
<ejs-calendar 
  [(ngModel)]="selectedDate"
  [weekNumber]="true"
  weekRule="FirstDay">
</ejs-calendar>

<!-- FirstFullWeek: First full week is week 1 -->
<ejs-calendar 
  [(ngModel)]="selectedDate"
  [weekNumber]="true"
  weekRule="FirstFullWeek">
</ejs-calendar>

<!-- FirstFourDayWeek: Week with 4+ days is week 1 (ISO 8601) -->
<ejs-calendar 
  [(ngModel)]="selectedDate"
  [weekNumber]="true"
  weekRule="FirstFourDayWeek">
</ejs-calendar>
```

### Getting Week Number Programmatically

```typescript
export class AppComponent {
  selectedDate: Date = new Date();
  
  getWeekNumber(date: Date = this.selectedDate): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNum = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    
    return weekNum;
  }
  
  showWeekNumber(): void {
    console.log(`Week ${this.getWeekNumber()} of ${this.selectedDate.getFullYear()}`);
  }
}
```

## Keyboard Navigation

Users can navigate and select dates using keyboard shortcuts.

### Default Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Arrow Up` | Move focus to previous week (month view) or previous year (year view) |
| `Arrow Down` | Move focus to next week (month view) or next year (year view) |
| `Arrow Left` | Move focus to previous day (month view) or previous month (year view) |
| `Arrow Right` | Move focus to next day (month view) or next month (year view) |
| `Enter` or `Space` | Select focused date or navigate to month view |
| `Page Up` | Navigate to previous month |
| `Page Down` | Navigate to next month |
| `Ctrl + Page Up` | Navigate to previous year |
| `Ctrl + Page Down` | Navigate to next year |
| `Home` | Move focus to the first day of month |
| `End` | Move focus to the last day of month |

### Custom Key Configuration

```typescript
export class AppComponent {
  selectedDate: Date = new Date();
  
  // Custom key configuration
  keyConfigs: { [key: string]: string } = {
    select: 'enter',           // Select date
    home: 'home',              // First day
    end: 'end',                // Last day
    pageUp: 'pageup',          // Previous month
    pageDown: 'pagedown',      // Next month
    controlUp: 'ctrl+38',      // Custom zoom out
    controlDown: 'ctrl+40',    // Custom zoom in
    moveUp: 'uparrow',         // Move up
    moveDown: 'downarrow',     // Move down
    moveLeft: 'leftarrow',     // Move left
    moveRight: 'rightarrow'    // Move right
  };
}
```

```html
<ejs-calendar 
  [(ngModel)]="selectedDate"
  [keyConfigs]="keyConfigs">
</ejs-calendar>

<p style="margin-top: 20px;">
  <strong>Keyboard Shortcuts:</strong>
  <ul>
    <li>Arrow Keys: Navigate</li>
    <li>Enter: Select</li>
    <li>Page Up/Down: Change month</li>
  </ul>
</p>
```

### Testing Keyboard Navigation

Use the `keyConfigs` property to verify and customize key actions. Refer to the API reference for all supported key configuration keys.

## Navigation Best Practices

### Pattern 1: Month Range Navigation

```typescript
export class AppComponent {
  @ViewChild('calendar') calendar!: CalendarComponent;
  selectedDate: Date = new Date();
  currentMonthStart: Date = new Date();
  
  constructor() {
    this.currentMonthStart.setDate(1);
  }
  
  goToNextMonth(): void {
    const nextMonth = new Date(this.currentMonthStart);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    this.calendar.navigateTo('Month', nextMonth);
    this.currentMonthStart = nextMonth;
  }
  
  goToPreviousMonth(): void {
    const prevMonth = new Date(this.currentMonthStart);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    this.calendar.navigateTo('Month', prevMonth);
    this.currentMonthStart = prevMonth;
  }
  
  isCurrentMonth(): boolean {
    const today = new Date();
    return this.currentMonthStart.getMonth() === today.getMonth() &&
           this.currentMonthStart.getFullYear() === today.getFullYear();
  }
  
  getMonthLabel(): string {
    return this.currentMonthStart.toLocaleDateString('en-US', 
      { month: 'long', year: 'numeric' });
  }
}
```

### Pattern 2: Year/Decade Quick Navigation

```typescript
export class AppComponent {
  @ViewChild('calendar') calendar!: CalendarComponent;
  selectedDate: Date = new Date();
  selectedYear: number = this.selectedDate.getFullYear();
  
  jumpToYear(year: number): void {
    this.selectedYear = year;
    this.calendar.navigateTo('Year', new Date(year, 0, 1));
  }
  
  jumpToDecade(decadeStart: number): void {
    this.calendar.navigateTo('Decade', new Date(decadeStart, 0, 1));
  }
  
  getYearRange(decadeStart: number): string {
    const end = decadeStart + 9;
    return `${decadeStart}-${end}`;
  }
}
```

### Pattern 3: Navigation State Management

```typescript
export class AppComponent {
  @ViewChild('calendar') calendar!: CalendarComponent;
  
  navigationState = {
    currentView: 'Month',
    currentMonth: new Date(),
    selectedDate: new Date(),
    navigationHistory: []
  };
  
  recordNavigation(view: string, date: Date): void {
    this.navigationState.navigationHistory.push({
      view,
      date,
      timestamp: new Date()
    });
  }
  
  canGoBack(): boolean {
    return this.navigationState.navigationHistory.length > 0;
  }
  
  goBack(): void {
    if (this.canGoBack()) {
      const previous = this.navigationState.navigationHistory.pop();
      if (previous) {
        this.calendar.navigateTo(previous.view, previous.date);
      }
    }
  }
}
```

## Related References

- [Calendar Views](calendar-views.md) - View switching and navigation
- [Events & Methods](events-and-methods.md) - Navigation events
- [Date Selection](date-selection.md) - Date constraint options
