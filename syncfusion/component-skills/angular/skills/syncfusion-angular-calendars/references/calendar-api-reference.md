# Calendar API Reference

Complete reference documentation for the Syncfusion Angular Calendar component, including all properties, methods, events, and interfaces with usage examples.

**Package:** `@syncfusion/ej2-angular-calendars`  
**Component:** `CalendarComponent` (Template: `<ejs-calendar>`)  
**Import:** `import { CalendarComponent } from '@syncfusion/ej2-angular-calendars';`

## Table of Contents
- [Quick Property Reference](#quick-property-reference)
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Interfaces & Types](#interfaces--types)
- [Enumerations](#enumerations)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Complete API Example](#complete-api-example)
- [Property Configuration Guide](#property-configuration-guide)

## Quick Property Reference

| Category | Properties | Purpose |
|----------|-----------|---------|
| **Selection** | `value`, `values`, `isMultiSelection` | Date selection modes and values |
| **Constraints** | `min`, `max` | Selectable date range |
| **Views** | `start`, `depth` | Calendar view levels (Month/Year/Decade) |
| **Display** | `showTodayButton`, `weekNumber`, `dayHeaderFormat` | UI display options |
| **Localization** | `locale`, `firstDayOfWeek`, `weekRule`, `calendarMode` | Language and format settings |
| **Styling** | `cssClass`, `enableRtl` | Visual appearance and RTL |
| **State** | `enabled`, `enablePersistence`, `serverTimezoneOffset` | Component state and persistence |
| **Keyboard** | `keyConfigs` | Custom keyboard shortcuts |

## Properties

### Selection Properties

#### value

Gets or sets the selected date of the calendar.

```typescript
// Syntax
value: Date

// Example
selectedDate: Date = new Date(2026, 5, 15);
```

```html
<ejs-calendar [value]="selectedDate"></ejs-calendar>
<ejs-calendar [(ngModel)]="selectedDate"></ejs-calendar>
```

#### values

Gets or sets multiple selected dates of the calendar. Used with `isMultiSelection: true`.

```typescript
// Syntax
values: Date[]

// Example
selectedDates: Date[] = [
  new Date(2026, 2, 15),
  new Date(2026, 2, 20),
  new Date(2026, 2, 25)
];
```

```html
<ejs-calendar 
  [values]="selectedDates" 
  [isMultiSelection]="true">
</ejs-calendar>
```

#### isMultiSelection

Specifies whether multiple dates can be selected. Default: `false`

```typescript
// Syntax
isMultiSelection: boolean

// Default: false

// Example
<ejs-calendar [isMultiSelection]="true"></ejs-calendar>
```

**Use with:** `values` property, `addDate()` and `removeDate()` methods

---

### Date Constraint Properties

#### min

Gets or sets the minimum date that can be selected in the calendar.

```typescript
// Syntax
min: Date

// Default: new Date(1900, 0, 1)

// Example
minDate: Date = new Date(2020, 0, 1);
```

```html
<ejs-calendar [min]="minDate"></ejs-calendar>
```

#### max

Gets or sets the maximum date that can be selected in the calendar.

```typescript
// Syntax
max: Date

// Default: new Date(2099, 11, 31)

// Example
maxDate: Date = new Date(2030, 11, 31);
```

```html
<ejs-calendar [max]="maxDate"></ejs-calendar>
```

---

### View Properties

#### start

Specifies the initial view of the calendar when it is opened.

```typescript
// Syntax
start: CalendarView

// Values: 'Month' | 'Year' | 'Decade'

// Default: Month

// Examples
<ejs-calendar start="Month"></ejs-calendar>
<ejs-calendar start="Year"></ejs-calendar>
<ejs-calendar start="Decade"></ejs-calendar>
```

#### depth

Sets the maximum level of view such as month, year, and decade.

```typescript
// Syntax
depth: CalendarView

// Values: 'Month' | 'Year' | 'Decade'

// Default: Month

// Examples
<ejs-calendar start="Decade" depth="Month"></ejs-calendar>
<ejs-calendar start="Year" depth="Year"></ejs-calendar>
```

---

### Display & UI Properties

#### showTodayButton

Specifies whether the today button is displayed or not.

```typescript
// Syntax
showTodayButton: boolean

// Default: true

// Example
<ejs-calendar [showTodayButton]="true"></ejs-calendar>
```

---

### Localization & Format Properties

#### locale

Overrides the global culture and localization value for this component.

```typescript
// Syntax
locale: string

// Default: 'en-US'

// Examples
<ejs-calendar locale="en-US"></ejs-calendar>
<ejs-calendar locale="fr-FR"></ejs-calendar>
<ejs-calendar locale="de-DE"></ejs-calendar>
<ejs-calendar locale="ar-SA"></ejs-calendar>
```

#### dayHeaderFormat

Specifies the format of the day that is displayed in the header.

```typescript
// Syntax
dayHeaderFormat: DayHeaderFormats

// Values: 'Short' | 'Narrow' | 'Abbreviated' | 'Wide'

// Default: 'Short'

// Examples
<ejs-calendar dayHeaderFormat="Short"></ejs-calendar>         <!-- Su, Mo, Tu -->
<ejs-calendar dayHeaderFormat="Narrow"></ejs-calendar>       <!-- S, M, T -->
<ejs-calendar dayHeaderFormat="Abbreviated"></ejs-calendar>  <!-- Sun, Mon, Tue -->
<ejs-calendar dayHeaderFormat="Wide"></ejs-calendar>        <!-- Sunday, Monday, Tuesday -->
```

#### weekNumber

Determines whether the week number of the year is displayed.

```typescript
// Syntax
weekNumber: boolean

// Default: false

// Example
<ejs-calendar [weekNumber]="true"></ejs-calendar>
```

#### weekRule

Specifies the rule for defining the first week of the year.

```typescript
// Syntax
weekRule: WeekRule

// Values: 'FirstDay' | 'FirstFullWeek' | 'FirstFourDayWeek'

// Default: 'FirstDay'

// Examples
<ejs-calendar [weekNumber]="true" weekRule="FirstDay"></ejs-calendar>
<ejs-calendar [weekNumber]="true" weekRule="FirstFourDayWeek"></ejs-calendar>
```

#### firstDayOfWeek

Gets or sets the calendar's first day of the week.

```typescript
// Syntax
firstDayOfWeek: number

// Values: 0-6 (0 = Sunday, 6 = Saturday)

// Default: 0 (Sunday) or based on locale

// Examples
<ejs-calendar [firstDayOfWeek]="0"></ejs-calendar>  <!-- Sunday -->
<ejs-calendar [firstDayOfWeek]="1"></ejs-calendar>  <!-- Monday -->
```

---

### Styling & State Properties

#### enableRtl

Enable or disable rendering component in right-to-left direction.

```typescript
// Syntax
enableRtl: boolean

// Default: false

// Example
<ejs-calendar [enableRtl]="true"></ejs-calendar>
```

#### enabled

Specifies whether the component is enabled or disabled.

```typescript
// Syntax
enabled: boolean

// Default: true

// Example
<ejs-calendar [enabled]="isActive"></ejs-calendar>
```

#### cssClass

Specifies custom CSS classes for styling the calendar.

```typescript
// Syntax
cssClass: string

// Example
<ejs-calendar cssClass="custom-calendar"></ejs-calendar>
```

#### calendarMode

Gets or sets the calendar mode (Gregorian or Islamic).

```typescript
// Syntax
calendarMode: CalendarType

// Values: 'Gregorian' | 'Islamic'

// Default: 'Gregorian'

// Example
<ejs-calendar calendarMode="Islamic"></ejs-calendar>
```

#### keyConfigs

Customizes the key actions in Calendar.

```typescript
// Syntax
keyConfigs: { [key: string]: string }

// Example
export class AppComponent {
  keyConfigs: { [key: string]: string } = {
    select: 'enter',
    home: 'home',
    end: 'end',
    pageUp: 'pageup',
    pageDown: 'pagedown',
    controlUp: 'ctrl+38',
    controlDown: 'ctrl+40',
    moveUp: 'uparrow',
    moveDown: 'downarrow',
    moveLeft: 'leftarrow',
    moveRight: 'rightarrow'
  };
}
```

#### enablePersistence

Enable or disable persisting component's state between page reloads.

```typescript
// Syntax
enablePersistence: boolean

// Default: false

// Example
<ejs-calendar [enablePersistence]="true"></ejs-calendar>
```

#### serverTimezoneOffset

Specifies the time zone offset for processing initial date value.

```typescript
// Syntax
serverTimezoneOffset: number | null

// Default: null

// Example
<ejs-calendar [serverTimezoneOffset]="330"></ejs-calendar> <!-- IST offset -->
```

## Methods

### addDate()

Add one or more dates to the selected dates array (multi-selection).

```typescript
// Syntax
addDate(dates: Date | Date[]): void

// Examples
calendar.addDate(new Date(2026, 5, 15));
calendar.addDate([new Date(2026, 5, 15), new Date(2026, 5, 20)]);
```

### removeDate()

Remove one or more dates from the selected dates array.

```typescript
// Syntax
removeDate(dates: Date | Date[]): void

// Examples
calendar.removeDate(new Date(2026, 5, 15));
calendar.removeDate([new Date(2026, 5, 15), new Date(2026, 5, 20)]);
```

### navigateTo()

Navigate to the month/year/decade view of the calendar.

```typescript
// Syntax
navigateTo(view: CalendarView, date: Date, isCustomDate?: boolean): void

// Parameters
// view: 'Month' | 'Year' | 'Decade'
// date: Specifies the focused date in the view
// isCustomDate (optional): Specifies whether the calendar is rendered with custom today date or not

// Examples
calendar.navigateTo('Month', new Date(2026, 5, 15));
calendar.navigateTo('Year', new Date(2026, 0, 1));
calendar.navigateTo('Decade', new Date(2020, 0, 1));
```

### currentView()

Gets the current view of the calendar.

```typescript
// Syntax
currentView(): string

// Returns: 'Month' | 'Year' | 'Decade'

// Example
const view = calendar.currentView();
console.log(view); // 'Month', 'Year', or 'Decade'
```

### getPersistData()

Gets the properties to be maintained upon browser refresh.

```typescript
// Syntax
getPersistData(): string

// Returns: Serialized persistence data

// Example
const persistData = calendar.getPersistData();
```

### destroy()

Destroys the calendar widget and all its event handlers.

```typescript
// Syntax
destroy(): void

// Example
calendar.destroy();
```

## Events

### change

Triggers when the calendar value is changed.

```typescript
// Event Type
(change)="onCalendarChange($event)"

// Arguments: ChangedEventArgs

// Example
onCalendarChange(args: ChangedEventArgs): void {
  console.log('Date selected:', args.value);
  console.log('User interaction:', args.isInteracted);
}
```

### navigated

Triggers when the calendar is navigated to another level or within the same level.

```typescript
// Event Type
(navigated)="onCalendarNavigate($event)"

// Arguments: NavigatedEventArgs

// Example
onCalendarNavigate(args: NavigatedEventArgs): void {
  console.log('Navigated to:', args.view);
  console.log('Focused date:', args.focusedDate);
}
```

### renderDayCell

Triggers when each day cell of the calendar is rendered.

```typescript
// Event Type
(renderDayCell)="onRenderDayCell($event)"

// Arguments: RenderDayCellEventArgs

// Example
onRenderDayCell(args: RenderDayCellEventArgs): void {
  // Disable weekends
  if (args.date.getDay() === 0 || args.date.getDay() === 6) {
    args.isDisabled = true;
  }
  
  // Custom styling
  args.cellData.className = 'custom-day';
}
```

### created

Triggers after the calendar is created and initialized.

```typescript
// Event Type
(created)="onCalendarCreated()"

// Example
onCalendarCreated(): void {
  console.log('Calendar initialized');
  // Safe to call methods on calendar instance
}
```

### destroyed

Triggers when the calendar is destroyed.

```typescript
// Event Type
(destroyed)="onCalendarDestroyed()"

// Example
onCalendarDestroyed(): void {
  console.log('Calendar destroyed');
}
```

## Enumerations

### CalendarView

Enumeration for calendar views.

```typescript
enum CalendarView {
  Month = 'Month',
  Year = 'Year',
  Decade = 'Decade'
}
```

### CalendarType

Enumeration for calendar types.

```typescript
enum CalendarType {
  Gregorian = 'Gregorian',
  Islamic = 'Islamic'
}
```

### DayHeaderFormats

Enumeration for day header format.

```typescript
enum DayHeaderFormats {
  Short = 'Short',           // Su, Mo, Tu...
  Narrow = 'Narrow',         // S, M, T...
  Abbreviated = 'Abbreviated', // Sun, Mon, Tue...
  Wide = 'Wide'              // Sunday, Monday, Tuesday...
}
```

### WeekRule

Enumeration for week numbering rules.

```typescript
enum WeekRule {
  FirstDay = 'FirstDay',              // Week 1 = week containing Jan 1
  FirstFullWeek = 'FirstFullWeek',    // Week 1 = first full week
  FirstFourDayWeek = 'FirstFourDayWeek' // ISO 8601: Week 1 has 4+ days
}
```

## Keyboard Shortcuts

The Calendar component supports keyboard navigation for accessibility. These are the default keyboard shortcuts:

### Navigation Keys

| Shortcut | Action | Description |
|----------|--------|-------------|
| `Arrow Up` | Move Up | Move focus to previous week (month view) or previous year (year view) |
| `Arrow Down` | Move Down | Move focus to next week (month view) or next year (year view) |
| `Arrow Left` | Move Left | Move focus to previous day (month view) or previous month (year view) |
| `Arrow Right` | Move Right | Move focus to next day (month view) or next month (year view) |
| `Home` | First Day | Move focus to the first day of month |
| `End` | Last Day | Move focus to the last day of month |
| `Page Up` | Previous Month | Navigate to previous month |
| `Page Down` | Next Month | Navigate to next month |
| `Ctrl + Page Up` | Previous Year | Navigate to previous year |
| `Ctrl + Page Down` | Next Year | Navigate to next year |

### Selection & View Keys

| Shortcut | Action | Description |
|----------|--------|-------------|
| `Enter` or `Space` | Select Date | Select focused date or navigate to month view |
| `Escape` | Close | Close any dropdown or navigation (if applicable) |

### Customizing Keyboard Shortcuts

Override default keyboard shortcuts using the `keyConfigs` property:

```typescript
export class AppComponent {
  keyConfigs: { [key: string]: string } = {
    select: 'enter',
    home: 'home',
    end: 'end',
    pageUp: 'pageup',
    pageDown: 'pagedown',
    controlUp: 'ctrl+38',      // Ctrl + Up Arrow
    controlDown: 'ctrl+40',    // Ctrl + Down Arrow
    moveUp: 'uparrow',
    moveDown: 'downarrow',
    moveLeft: 'leftarrow',
    moveRight: 'rightarrow'
  };
}
```

**Apply to Calendar:**

```html
<ejs-calendar [keyConfigs]="keyConfigs"></ejs-calendar>
```

**Supported Key Combinations:**
- Single keys: `'enter'`, `'tab'`, `'space'`, etc.
- Arrow keys: `'uparrow'`, `'downarrow'`, `'leftarrow'`, `'rightarrow'`
- Modifiers: `'ctrl+key'`, `'alt+key'`, `'shift+key'`
- Function keys: `'f1'` through `'f12'`

---

## Interfaces & Types

### ChangedEventArgs

Argument passed to the `change` event handler.

```typescript
interface ChangedEventArgs {
  value: Date;              // The selected date
  isInteracted: boolean;    // Whether user interacted
}
```

### NavigatedEventArgs

Argument passed to the `navigated` event handler.

```typescript
interface NavigatedEventArgs {
  view: string;             // Calendar view: 'Month', 'Year', 'Decade'
  focusedDate: Date;        // The focused date in the view
}
```

### RenderDayCellEventArgs

Argument passed to the `renderDayCell` event handler.

```typescript
interface RenderDayCellEventArgs {
  date: Date;                    // The day's date
  isDisabled: boolean;           // Whether day is disabled
  isOtherMonth: boolean;         // Whether from prev/next month
  cellData: CellData;            // Cell DOM properties
}

interface CellData {
  className: string;             // CSS classes to apply
  ariaLabel: string;             // Accessibility label
}
```

---

## Complete API Example

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
  selector: 'app-calendar-api-demo',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class CalendarApiDemoComponent {
  @ViewChild('calendar') calendar!: CalendarComponent;
  
  // Properties
  selectedDate: Date = new Date();
  selectedDates: Date[] = [];
  minDate: Date = new Date(2020, 0, 1);
  maxDate: Date = new Date(2030, 11, 31);
  
  // Configuration
  isMultiSelection: boolean = true;
  startView: string = 'Month';
  depthView: string = 'Month';
  showTodayButton: boolean = true;
  locale: string = 'en-US';
  dayHeaderFormat: string = 'Wide';
  firstDayOfWeek: number = 0;
  weekNumber: boolean = true;
  enableRtl: boolean = false;
  cssClass: string = 'custom-calendar';
  
  // Keyboard configuration
  keyConfigs: { [key: string]: string } = {
    select: 'enter',
    home: 'home',
    end: 'end',
    pageUp: 'pageup',
    pageDown: 'pagedown'
  };
  
  // Event handlers
  onCalendarChange(args: ChangedEventArgs): void {
    console.log('Date changed:', args.value);
    console.log('User interaction:', args.isInteracted);
  }
  
  onCalendarNavigate(args: NavigatedEventArgs): void {
    console.log('Navigated to:', args.view);
    console.log('Focused:', args.focusedDate);
  }
  
  onRenderDayCell(args: RenderDayCellEventArgs): void {
    if (args.date.getDay() === 0 || args.date.getDay() === 6) {
      args.isDisabled = true;
    }
  }
  
  onCalendarCreated(): void {
    console.log('Calendar created');
  }
  
  // Method calls
  addDateToSelection(date: Date): void {
    this.calendar.addDate(date);
  }
  
  removeDateFromSelection(date: Date): void {
    this.calendar.removeDate(date);
  }
  
  navigateToView(view: string, date: Date = new Date()): void {
    this.calendar.navigateTo(view as any, date);
  }
  
  getCurrentView(): string {
    return this.calendar.currentView();
  }
  
  destroyCalendar(): void {
    this.calendar.destroy();
  }
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px;">
  <h2>Calendar API Demo</h2>
  
  <!-- Properties section -->
  <div style="margin-bottom: 20px;">
    <h3>Configuration</h3>
    <label>
      <input 
        type="checkbox" 
        [(ngModel)]="isMultiSelection">
      Multi-Selection
    </label>
    
    <label style="margin-left: 20px;">
      Start View:
      <select [(ngModel)]="startView" style="margin-left: 10px;">
        <option value="Month">Month</option>
        <option value="Year">Year</option>
        <option value="Decade">Decade</option>
      </select>
    </label>
  </div>
  
  <!-- Calendar -->
  <ejs-calendar
    #calendar
    [(ngModel)]="isMultiSelection ? selectedDates : selectedDate"
    [isMultiSelection]="isMultiSelection"
    [min]="minDate"
    [max]="maxDate"
    [start]="startView"
    [depth]="depthView"
    [showTodayButton]="showTodayButton"
    [locale]="locale"
    [dayHeaderFormat]="dayHeaderFormat"
    [firstDayOfWeek]="firstDayOfWeek"
    [weekNumber]="weekNumber"
    [enableRtl]="enableRtl"
    cssClass="cssClass"
    [keyConfigs]="keyConfigs"
    (change)="onCalendarChange($event)"
    (navigated)="onCalendarNavigate($event)"
    (renderDayCell)="onRenderDayCell($event)"
    (created)="onCalendarCreated()">
  </ejs-calendar>
  
  <!-- Methods section -->
  <div style="margin-top: 20px;">
    <h3>Methods</h3>
    <button (click)="navigateToView('Month')" style="margin-right: 10px;">
      Go to Month
    </button>
    <button (click)="navigateToView('Year')" style="margin-right: 10px;">
      Go to Year
    </button>
    <button (click)="navigateToView('Decade')" style="margin-right: 10px;">
      Go to Decade
    </button>
    <button (click)="addDateToSelection(new Date())" style="margin-right: 10px;">
      Add Today
    </button>
    <button (click)="getCurrentView()">
      Get Current View
    </button>
  </div>
  
  <!-- Display results -->
  <div style="margin-top: 20px;">
    <h3>Results</h3>
    <p *ngIf="!isMultiSelection">
      Single Selection: {{ selectedDate | date:'fullDate' }}
    </p>
    <p *ngIf="isMultiSelection">
      Multi-Selection: {{ selectedDates.length }} dates
    </p>
  </div>
</div>
```

## Related References

- [Getting Started](getting-started.md) - Installation and setup
- [Date Selection](date-selection.md) - Date management
- [Events & Methods](events-and-methods.md) - Detailed event and method usage
- [Calendar Views](calendar-views.md) - View navigation
