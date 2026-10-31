# Calendar Views Navigation

## Table of Contents
- [Month View](#month-view)
- [Year View](#year-view)
- [Decade View](#decade-view)
- [View Navigation](#view-navigation)
- [Setting Initial View](#setting-initial-view)
- [Restricting View Depth](#restricting-view-depth)
- [Programmatic Navigation](#programmatic-navigation)
- [View Change Events](#view-change-events)

## Month View

The Month view is the default calendar view showing all days of a specific month.

### Features

- Display current month with all dates
- Navigate between months using previous/next arrows
- Select single or multiple dates within the month
- Show week numbers (optional)
- Highlight today's date
- Today button to jump to current date

### Basic Implementation

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedDate: Date = new Date();
  showTodayButton: boolean = true;
}
```

```html
<!-- app.component.html -->
<!-- Month view is default -->
<ejs-calendar 
  [(ngModel)]="selectedDate"
  [showTodayButton]="showTodayButton">
</ejs-calendar>

<!-- Explicit Month view specification -->
<ejs-calendar 
  start="Month"
  [(ngModel)]="selectedDate">
</ejs-calendar>
```

### Month View with Week Numbers

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
```

### Navigating Between Months

Users can navigate using:
- **Previous arrow button** - Shows previous month
- **Next arrow button** - Shows next month
- **Today button** - Jumps to current date (if showTodayButton is true)

```typescript
export class AppComponent {
  selectedDate: Date = new Date(2026, 5, 15); // June 15, 2026
  
  // Calendar will show June 2026
  // User can click arrows to go to May or July
  // Click today button to return to current month
}
```

## Year View

The Year view displays all 12 months of a specific year for quick month selection.

### Accessing Year View

Users can click on the year header in Month view to switch to Year view.

### Year View Features

- Show all 12 months in a 3x4 grid
- Click any month to return to Month view
- Navigate between years using previous/next arrows
- Select year for quick navigation to that year

### Implementation

```typescript
// app.component.ts
import { Component, ViewChild } from '@angular/core';
import { CalendarComponent } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('calendarRef') calendar!: CalendarComponent;
  selectedDate: Date = new Date();
  
  // Start in Year view
  startView: string = 'Year';
  
  // Allow navigation down to Month view only
  depthView: string = 'Month';
}
```

```html
<!-- app.component.html -->
<ejs-calendar 
  #calendarRef
  [(ngModel)]="selectedDate"
  start="Year"
  depth="Month">
</ejs-calendar>

<!-- User can click months to switch to Month view -->
<!-- User can click year header to switch to Decade view -->
```

### Year View Example

```typescript
export class AppComponent {
  selectedDate: Date = new Date(2026, 0, 1); // January 2026
  
  navigateToYear(year: number): void {
    const dateInYear = new Date(year, 0, 1);
    this.calendar.navigateTo('Year', dateInYear);
  }
}
```

## Decade View

The Decade view shows a 10-year range (e.g., 2020-2029) for quick year selection.

### Decade View Features

- Display 10 years in a grid (e.g., 2020-2029)
- Click any year to return to Year view
- Navigate between decades using previous/next arrows
- Useful for setting dates far in future/past

### Implementation

```typescript
// app.component.ts
export class AppComponent {
  selectedDate: Date = new Date();
  
  // Start in Decade view
  startView: string = 'Decade';
  
  // Allow navigation down to Month view
  depthView: string = 'Month';
}
```

```html
<!-- app.component.html -->
<ejs-calendar 
  [(ngModel)]="selectedDate"
  start="Decade"
  depth="Month">
</ejs-calendar>

<!-- User can click years to switch to Year view -->
<!-- User can click decade header to stay in Decade view or zoom out -->
```

### Decade Navigation Example

```typescript
export class AppComponent {
  selectedDate: Date = new Date();
  
  navigateToDecade(startYear: number): void {
    const dateInDecade = new Date(startYear, 0, 1);
    this.calendar.navigateTo('Decade', dateInDecade);
  }
  
  // Navigate to 2030-2039 decade
  goToFutureDecade(): void {
    this.navigateToDecade(2030);
  }
}
```

## View Navigation

### Manual View Switching

Users navigate between views by:

1. **Month → Year**: Click on month/year header
2. **Year → Month**: Click on a month
3. **Year → Decade**: Click on decade header
4. **Decade → Year**: Click on a year

### View Hierarchy

```
Month View
    ↓ (click month/year header)
Year View
    ↓ (click year header)
Decade View
    ↑ (click year)
    ↑ (click month)
```

## Setting Initial View

### Start Property

Use the `start` property to set the initial calendar view:

```typescript
// Default: Month view
<ejs-calendar></ejs-calendar>

// Start in Year view
<ejs-calendar start="Year"></ejs-calendar>

// Start in Decade view
<ejs-calendar start="Decade"></ejs-calendar>
```

### Examples

```typescript
export class AppComponent {
  // For date picker - start in Month view
  datePickerDate: Date = new Date();
  
  // For year selection - start in Year view
  yearSelectionDate: Date = new Date();
  
  // For decade selection - start in Decade view
  decadeSelectionDate: Date = new Date();
}
```

```html
<div>
  <h3>Date Picker (Month View)</h3>
  <ejs-calendar [(ngModel)]="datePickerDate"></ejs-calendar>

  <h3>Year Selector (Year View)</h3>
  <ejs-calendar [(ngModel)]="yearSelectionDate" start="Year"></ejs-calendar>

  <h3>Decade Selector (Decade View)</h3>
  <ejs-calendar [(ngModel)]="decadeSelectionDate" start="Decade"></ejs-calendar>
</div>
```

## Restricting View Depth

Use the `depth` property to limit how far down users can navigate:

### Depth Options

```typescript
// depth="Month" - Restrict to Year and Month views only
<ejs-calendar 
  start="Decade"
  depth="Month">
</ejs-calendar>

// depth="Year" - Restrict to Decade and Year views only
<ejs-calendar 
  start="Decade"
  depth="Year">
</ejs-calendar>

// depth="Decade" - Stay only in Decade view
<ejs-calendar 
  start="Decade"
  depth="Decade">
</ejs-calendar>
```

### Use Cases

**Case 1: Date Selection Only**
```typescript
// Allow Month and Year views, but not Decade
<ejs-calendar 
  start="Month"
  depth="Month">
</ejs-calendar>
```

**Case 2: Year Selection Only**
```typescript
// Allow Year and Decade views, but not Month
<ejs-calendar 
  start="Year"
  depth="Year">
</ejs-calendar>
```

**Case 3: Decade Selection Only**
```typescript
// Stay in Decade view
<ejs-calendar 
  start="Decade"
  depth="Decade">
</ejs-calendar>
```

## Programmatic Navigation

Use the `navigateTo()` method to programmatically switch views:

### navigateTo() Method Signature

```typescript
calendar.navigateTo(view: CalendarView, date: Date, isCustomDate?: boolean): void
```

**Parameters:**
- `view`: 'Month', 'Year', or 'Decade'
- `date`: Specifies the focused date in the view
- `isCustomDate` (optional): Specifies whether the calendar is rendered with custom today date or not

### Navigation Examples

```typescript
import { Component, ViewChild } from '@angular/core';
import { CalendarComponent } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('calendar') calendar!: CalendarComponent;
  selectedDate: Date = new Date();
  
  // Navigate to Month view
  goToMonthView(): void {
    this.calendar.navigateTo('Month', new Date(2026, 5, 15));
  }
  
  // Navigate to Year view
  goToYearView(): void {
    this.calendar.navigateTo('Year', new Date(2026, 0, 1));
  }
  
  // Navigate to Decade view
  goToDecadeView(): void {
    this.calendar.navigateTo('Decade', new Date(2025, 0, 1));
  }
  
  // Navigate to specific year
  navigateToYear(year: number): void {
    this.calendar.navigateTo('Year', new Date(year, 0, 1));
  }
  
  // Navigate to specific decade
  navigateToDecade(decadeStart: number): void {
    this.calendar.navigateTo('Decade', new Date(decadeStart, 0, 1));
  }
  
  // Navigate to today
  navigateToToday(): void {
    this.calendar.navigateTo('Month', new Date());
  }
}
```

```html
<!-- Navigation Buttons -->
<div style="margin: 20px 0;">
  <button (click)="goToMonthView()">Go to Month View</button>
  <button (click)="goToYearView()">Go to Year View</button>
  <button (click)="goToDecadeView()">Go to Decade View</button>
  <button (click)="navigateToYear(2030)">Navigate to Year 2030</button>
  <button (click)="navigateToDecade(2030)">Navigate to 2030s Decade</button>
  <button (click)="navigateToToday()">Navigate to Today</button>
</div>

<ejs-calendar #calendar [(ngModel)]="selectedDate"></ejs-calendar>
```

## View Change Events

The `navigated` event fires when the view changes:

### Event Handler Example

```typescript
import { Component } from '@angular/core';
import { NavigatedEventArgs } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  currentView: string = 'Month';
  
  onCalendarNavigate(args: NavigatedEventArgs): void {
    this.currentView = args.view;
    console.log('Calendar navigated to:', args.view);
    console.log('Focused date:', args.focusedDate);
  }
}
```

```html
<ejs-calendar 
  (navigated)="onCalendarNavigate($event)">
</ejs-calendar>
<p>Current View: {{ currentView }}</p>
```

## Complete Navigation Example

```typescript
// app.component.ts
import { Component, ViewChild } from '@angular/core';
import { CalendarComponent } from '@syncfusion/ej2-angular-calendars';
import { NavigatedEventArgs } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('calendar') calendar!: CalendarComponent;
  
  selectedDate: Date = new Date();
  currentView: string = 'Month';
  startView: string = 'Month';
  depthView: string = 'Month';
  
  onCalendarNavigate(args: NavigatedEventArgs): void {
    this.currentView = args.view;
    console.log(`Navigated to ${args.view} view`);
  }
  
  navigateToView(view: string, date: Date = new Date()): void {
    this.calendar.navigateTo(view as any, date);
  }
  
  setStartView(view: string): void {
    this.startView = view;
  }
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px;">
  <h2>Calendar View Navigation</h2>
  
  <div style="margin-bottom: 20px;">
    <strong>Current View:</strong> {{ currentView }}
  </div>
  
  <div style="margin-bottom: 20px;">
    <label>Start View:</label>
    <select (change)="setStartView($event.target.value)" style="margin-left: 10px;">
      <option value="Month">Month</option>
      <option value="Year">Year</option>
      <option value="Decade">Decade</option>
    </select>
  </div>
  
  <div style="margin-bottom: 20px;">
    <button (click)="navigateToView('Month')" style="margin-right: 10px;">Month View</button>
    <button (click)="navigateToView('Year')" style="margin-right: 10px;">Year View</button>
    <button (click)="navigateToView('Decade')">Decade View</button>
  </div>
  
  <ejs-calendar 
    #calendar
    [(ngModel)]="selectedDate"
    [start]="startView"
    [depth]="depthView"
    (navigated)="onCalendarNavigate($event)">
  </ejs-calendar>
  
  <p style="margin-top: 20px;">Selected Date: {{ selectedDate | date:'fullDate' }}</p>
</div>
```

## Related References

- [Date Selection](date-selection.md) - Single and multiple date selection
- [Events & Methods](events-and-methods.md) - Complete event handling guide
- [Calendar Navigation](calendar-navigation.md) - Month navigation controls
