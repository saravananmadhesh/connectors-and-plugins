---
name: syncfusion-angular-calendars
description: Comprehensive guide for implementing Syncfusion Angular Calendar components including Calendar, DatePicker, DateRangePicker, DateTimePicker, and TimePicker. Covers installation, data binding, date/time selection, range selection, formatting, localization, masking, validation, customization, templates, accessibility, and controlled component patterns in Angular applications.
metadata:
  author: "Syncfusion Inc"
  category: "Calendars"
  version: "34.1.29"
---

# Implementing Syncfusion Angular Calendars

## Calendars

A comprehensive guide for implementing the Syncfusion Essential JS 2 Calendar component in Angular applications. Learn to create date pickers, manage calendar views, handle events, and customize styling.

### Calendar Overview

The Syncfusion Angular Calendar component is a date selection widget that provides:

- **Multiple calendar views:** Month (default), Year, and Decade views with smooth navigation
- **Date selection modes:** Single date or multiple dates with `isMultiSelection` property
- **Navigation control:** `navigateTo()` method for programmatic view switching
- **Date manipulation methods:** `addDate()` and `removeDate()` for multi-selection management
- **Comprehensive event system:** change, created, navigated, renderDayCell, destroyed events
- **Localization support:** Locale-specific formatting, day header formats, first day of week
- **Accessibility:** Full WCAG 2.2 compliance, keyboard navigation, RTL support
- **Rich customization:** CSS classes, custom rendering, day cell customization
- **Persistence:** Optional state persistence across page reloads

**Package:** `@syncfusion/ej2-angular-calendars`

### Documentation Navigation

Read the following references based on your specific needs:

#### Getting Started
📄 **Read:** [references/getting-started.md](references/calendar-getting-started.md)
- Package installation and module setup
- CSS theme imports and dependencies
- Basic calendar implementation
- Component initialization in Angular
- Running and testing setup

#### Calendar Views
📄 **Read:** [references/calendar-views.md](references/calendar-views.md)
- Month view (default display)
- Year view implementation
- Decade view implementation
- View navigation and transitions
- `start` property usage
- `depth` property for restricting views

#### Date Selection
📄 **Read:** [references/date-selection.md](references/calendar-date-selection.md)
- Single date selection
- Multiple date selection (`isMultiSelection`)
- `value` property for single dates
- `values` array for multiple dates
- Min/max date constraints
- Date range validation

#### Events & Methods
📄 **Read:** [references/events-and-methods.md](references/calendar-events-and-methods.md)
- Event handlers (change, created, navigated, renderDayCell, destroyed)
- `addDate()` method for multi-selection
- `removeDate()` method for multi-selection
- `navigateTo()` for programmatic navigation
- `currentView()` to get active view
- `getPersistData()` to retrieve persistence data
- `destroy()` to destroy the calendar widget
- RenderDayCell for custom day styling

#### Calendar Navigation
📄 **Read:** [references/calendar-navigation.md](references/calendar-navigation.md)
- Month navigation controls
- Year and Decade view switching
- Today button (`showTodayButton`)
- `firstDayOfWeek` property
- Week number display (`weekNumber`)
- Keyboard shortcuts and navigation

#### Accessibility & Globalization
📄 **Read:** [references/accessibility-and-globalization.md](references/calendar-accessibility-and-globalization.md)
- WCAG 2.2 and Section 508 compliance
- WAI-ARIA attributes and roles
- Keyboard navigation (arrows, enter, spacebar)
- Screen reader compatibility
- Localization (locale property)
- Day header formats (Short, Narrow, Abbreviated, Wide)
- RTL (Right-to-Left) support

#### Styling & Customization
📄 **Read:** [references/styling-and-customization.md](references/calendar-styling-and-customization.md)
- CSS class customization (.e-calendar, .e-day-cell, .e-selected)
- Theme selection (Material, Bootstrap, Tailwind, Fabric)
- Dark mode implementation
- Custom day cell styling via renderDayCell
- Disabled dates styling
- Hover and focus states

#### API Reference
📄 **Read:** [references/api-reference.md](references/calendar-api-reference.md)
- Complete property reference (value, values, isMultiSelection, min, max, start, depth, showTodayButton, locale, dayHeaderFormat, weekNumber, weekRule, firstDayOfWeek, cssClass, enableRtl, enabled, calendarMode, keyConfigs, enablePersistence, serverTimezoneOffset)
- All method signatures with examples (addDate, removeDate, navigateTo, currentView, getPersistData, destroy)
- Event argument types (ChangedEventArgs, NavigatedEventArgs, RenderDayCellEventArgs)
- Key configurations for keyboard shortcuts
- Calendar modes (Gregorian, Islamic)
- Return types and descriptions

### Quick Start Example

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { ChangedEventArgs } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Single date selection
  selectedDate: Date = new Date();
  
  // Multiple date selection
  selectedDates: Date[] = [
    new Date(2026, 2, 15),
    new Date(2026, 2, 20),
    new Date(2026, 2, 25)
  ];
  
  // Calendar configuration
  minDate: Date = new Date(2020, 0, 1);
  maxDate: Date = new Date(2030, 11, 31);
  
  // Event handler
  onCalendarChange(args: ChangedEventArgs): void {
    console.log('Selected date:', args.value);
  }
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px; font-family: Arial, sans-serif;">
  <h2>Single Date Selection</h2>
  <ejs-calendar 
    [(ngModel)]="selectedDate"
    [min]="minDate"
    [max]="maxDate"
    (change)="onCalendarChange($event)">
  </ejs-calendar>
  <p>Selected: {{ selectedDate | date:'medium' }}</p>

  <h2>Multiple Date Selection</h2>
  <ejs-calendar 
    [(ngModel)]="selectedDates"
    [isMultiSelection]="true"
    [showTodayButton]="true">
  </ejs-calendar>
  <p>Selected dates: {{ selectedDates.length }} dates</p>
</div>
```

```css
/* app.component.css */
@import '../node_modules/@syncfusion/ej2-base/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-calendars/styles/material3.css';

:host ::ng-deep .e-calendar {
  margin: 20px 0;
}

:host ::ng-deep .e-selected {
  background-color: #3f51b5;
  color: white;
}
```

### Common Patterns

#### Pattern 1: Custom Date Range (Two Calendar Instances)

The Calendar component does not have built-in range selection. Use two separate Calendar instances with `min`/`max` constraints and the `change` event to implement a custom date range picker:

```typescript
export class AppComponent {
  startDate: Date = new Date();
  endDate: Date = new Date();
  
  onStartDateChange(args: ChangedEventArgs): void {
    this.startDate = args.value;
    // Ensure end date is not before start date
    if (this.endDate < this.startDate) {
      this.endDate = this.startDate;
    }
  }
  
  onEndDateChange(args: ChangedEventArgs): void {
    this.endDate = args.value;
  }
  
  getDaysInRange(): number {
    const timeDiff = this.endDate.getTime() - this.startDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
  }
}
```

```html
<!-- Two separate Calendar instances for range selection -->
<ejs-calendar [(ngModel)]="startDate" (change)="onStartDateChange($event)"></ejs-calendar>
<ejs-calendar [(ngModel)]="endDate" [min]="startDate" (change)="onEndDateChange($event)"></ejs-calendar>
```

#### Pattern 2: Calendar with Disabled Dates

Disable specific dates (weekends, holidays) using renderDayCell event:

```typescript
export class AppComponent {
  holidays: Date[] = [
    new Date(2026, 11, 25), // Christmas
    new Date(2026, 0, 1),   // New Year
  ];
  
  onRenderDayCell(args: RenderDayCellEventArgs): void {
    // Disable weekends
    if (args.date.getDay() === 0 || args.date.getDay() === 6) {
      args.isDisabled = true;
    }
    
    // Disable holidays
    if (this.isHoliday(args.date)) {
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

#### Pattern 3: Multi-Selection with Add/Remove

Manage multiple selected dates programmatically:

```typescript
export class AppComponent {
  @ViewChild('calendar') calendarRef!: CalendarComponent;
  selectedDates: Date[] = [];
  
  addDateToSelection(date: Date): void {
    // Check if already selected
    if (!this.selectedDates.some(d => 
        d.toDateString() === date.toDateString())) {
      this.calendarRef.addDate(date);
    }
  }
  
  removeDateFromSelection(date: Date): void {
    this.calendarRef.removeDate(date);
  }
  
  clearAllDates(): void {
    if (this.selectedDates.length > 0) {
      this.calendarRef.removeDate(this.selectedDates);
    }
  }
}
```

#### Pattern 4: Year/Decade View Navigation

Implement navigation to different calendar views:

```typescript
export class AppComponent {
  @ViewChild('calendar') calendarRef!: CalendarComponent;
  
  navigateToYear(year: number): void {
    const dateInYear = new Date(year, 0, 1);
    this.calendarRef.navigateTo('Year', dateInYear);
  }
  
  navigateToDecade(startYear: number): void {
    const dateInDecade = new Date(startYear, 0, 1);
    this.calendarRef.navigateTo('Decade', dateInDecade);
  }
  
  getCurrentView(): string {
    return this.calendarRef.currentView();
  }
}
```

#### Pattern 5: Reactive Form Integration

Integrate Calendar with Angular Reactive Forms:

```typescript
export class AppComponent implements OnInit {
  dateForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.dateForm = this.fb.group({
      eventDate: [new Date(), Validators.required],
      eventName: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    // Subscribe to date changes
    this.dateForm.get('eventDate')?.valueChanges.subscribe(date => {
      console.log('Event date changed:', date);
    });
  }
  
  submitForm(): void {
    if (this.dateForm.valid) {
      console.log('Form values:', this.dateForm.value);
    }
  }
}
```

```html
<form [formGroup]="dateForm" (ngSubmit)="submitForm()">
  <div>
    <label for="eventDate">Event Date:</label>
    <ejs-calendar 
      id="eventDate"
      formControlName="eventDate">
    </ejs-calendar>
  </div>
  
  <div>
    <label for="eventName">Event Name:</label>
    <input 
      id="eventName"
      type="text"
      formControlName="eventName">
  </div>
  
  <button type="submit" [disabled]="!dateForm.valid">Submit</button>
</form>
```

### Key Props Reference

| Prop | Type | Description | Example |
|------|------|-------------|---------|
| `value` | `Date` | Single selected date | `[value]="selectedDate"` |
| `values` | `Date[]` | Multiple selected dates | `[values]="selectedDates"` |
| `isMultiSelection` | `boolean` | Enable multiple date selection | `[isMultiSelection]="true"` |
| `min` | `Date` | Minimum selectable date | `[min]="minDate"` |
| `max` | `Date` | Maximum selectable date | `[max]="maxDate"` |
| `start` | `CalendarView` | Initial view (Month/Year/Decade) | `start="Month"` |
| `depth` | `CalendarView` | Maximum view level | `depth="Month"` |
| `showTodayButton` | `boolean` | Display today button | `[showTodayButton]="true"` |
| `locale` | `string` | Culture/language code | `locale="fr-FR"` |
| `dayHeaderFormat` | `DayHeaderFormats` | Day format (Short/Narrow/Abbreviated/Wide) | `dayHeaderFormat="Abbreviated"` |
| `weekNumber` | `boolean` | Show week numbers | `[weekNumber]="true"` |
| `weekRule` | `WeekRule` | Rule for first week of year (FirstDay/FirstFullWeek/FirstFourDayWeek) | `weekRule="FirstFourDayWeek"` |
| `firstDayOfWeek` | `number` | First day (0=Sunday, 1=Monday) | `[firstDayOfWeek]="1"` |
| `cssClass` | `string` | Custom CSS classes | `cssClass="custom-calendar"` |
| `enableRtl` | `boolean` | Enable RTL layout | `[enableRtl]="true"` |
| `enabled` | `boolean` | Enable/disable component | `[enabled]="true"` |
| `calendarMode` | `CalendarType` | Calendar mode (Gregorian/Islamic) | `calendarMode="Islamic"` |
| `keyConfigs` | `{ [key: string]: string }` | Custom keyboard shortcuts | `[keyConfigs]="keyConfigs"` |
| `enablePersistence` | `boolean` | Persist state across page reloads | `[enablePersistence]="true"` |
| `serverTimezoneOffset` | `number \| null` | Server timezone offset for initial date processing | `[serverTimezoneOffset]="330"` |

### Common Use Cases

**Use Case 1: Event Booking System**
- User selects start and end dates for event
- Disable past dates and weekends
- Solution: Combine min/max dates with renderDayCell for disable logic
- Reference: [Calendar Views](references/calendar-views.md) + [Events & Methods](references/calendar-events-and-methods.md)

**Use Case 2: Conference Schedule**
- Display multiple highlighted dates (conference days)
- Allow year/decade navigation for planning
- Solution: Use isMultiSelection, highlight dates, navigate between views
- Reference: [Date Selection](references/calendar-date-selection.md) + [Calendar Navigation](references/calendar-navigation.md)

**Use Case 3: Accessible Booking Form**
- Calendar integrated in form with keyboard navigation
- Screen reader compatible, WCAG 2.2 compliant
- Solution: Use Reactive Forms + Calendar events
- Reference: [Accessibility & Globalization](references/calendar-accessibility-and-globalization.md)

**Use Case 4: International Date Picker**
- Support multiple languages and date formats
- Show RTL for Arabic, Hebrew
- Solution: Use locale property and localization
- Reference: [Accessibility & Globalization](references/calendar-accessibility-and-globalization.md)

**Use Case 5: Dynamic Date Constraints**
- Disable dates based on business logic (availability, holidays)
- Update constraints based on user selections
- Solution: Use renderDayCell with dynamic logic
- Reference: [Events & Methods](references/calendar-events-and-methods.md) + [Calendar Views](references/calendar-views.md)

## DatePicker

The Syncfusion Angular DatePicker provides a user-friendly calendar interface for selecting individual dates with support for formatting, validation, date ranges, and complete accessibility (WCAG 2.2). This skill guides you through all essential implementation patterns and advanced features.

### Component Overview

The DatePicker combines a text input with a popup calendar picker. Users can type dates directly or use the calendar to select. Key capabilities:

- **Date selection** via calendar UI or text input
- **Multiple date formats** (culture-aware, custom patterns)
- **Date range validation** (min/max, strict mode)
- **Input masking** for guided date entry
- **Multiple calendar views** (month → year → decade navigation)
- **Accessibility** (WCAG 2.2, ARIA, keyboard support, RTL)
- **Internationalization** (CLDR data, 100+ cultures)
- **Form integration** (FormValidator, reactive forms, template-driven forms)

### Documentation and Navigation Guide

#### Getting Started
📄 **Read:** [references/getting-started.md](references/datepicker-getting-started.md)
- Installation and setup for Angular 21+ standalone architecture
- Package dependencies and imports
- Basic DatePicker implementation
- CSS theme imports
- Minimal working example

#### Date Formats and Parsing
📄 **Read:** [references/date-formats-and-parsing.md](references/datepicker-date-formats-and-parsing.md)
- Standard date format patterns (yyyy-MM-dd, dd/MM/yyyy, etc.)
- Culture-specific default formats
- Custom date format creation
- parseDate and formatDate methods
- Dynamic format switching

#### Date Range and Validation
📄 **Read:** [references/date-range-and-validation.md](references/datepicker-date-range-and-validation.md)
- Setting date range constraints (min/max properties)
- Out-of-range date handling and error states
- Null date validation and strictMode
- Invalid date detection
- Real-world date constraint patterns

#### Date Views and Navigation
📄 **Read:** [references/date-views-and-navigation.md](references/datepicker-date-views-and-navigation.md)
- Start view configuration (month/year/decade)
- Depth view restrictions for limited selection
- Navigating between calendar views
- Month and year selection patterns
- Use cases for different view configurations

#### Masking and Editing
📄 **Read:** [references/masking-and-editing.md](references/datepicker-masking-and-editing.md)
- Enabling date input masking for guided entry
- Mask patterns based on date format
- Keyboard navigation in masked input (up/down/left/right arrows)
- Custom mask placeholders
- Locale-aware mask placeholder text

#### Styling and Customization
📄 **Read:** [references/styling-and-customization.md](references/datepicker-styling-and-customization.md)
- CSS customization for wrapper and input elements
- DatePicker icon styling and customization
- Full-screen mode on mobile devices
- Placeholder and readonly state customization
- Dark mode and Theme Studio integration

#### Accessibility and Forms
📄 **Read:** [references/accessibility-and-forms.md](references/datepicker-accessibility-and-forms.md)
- WCAG 2.2 compliance and accessibility standards
- ARIA attributes (aria-expanded, aria-disabled, aria-activedescendant)
- Keyboard navigation support (arrow keys, Enter, Escape)
- Screen reader support and semantic markup
- FormValidator integration for date validation
- Reactive forms and template-driven forms patterns
- Custom validation rules

#### Globalization and Localization
📄 **Read:** [references/globalization-and-localization.md](references/datepicker-globalization-and-localization.md)
- CLDR data loading for culture-specific formatting
- Culture-aware date parsing and formatting
- Locale configuration and L10n setup
- First day of week by culture (week data)
- Right-to-Left (RTL) language support
- Multi-language examples
- Timezone-aware date handling

#### Testing & Quality Assurance
📄 **Read:** [references/testing-guide.md](references/datepicker-testing-guide.md)
- Unit testing with Jasmine/Karma: parsing, validators, events
- E2E testing with Cypress: calendar interactions, form flows
- Accessibility testing with axe-core and keyboard navigation checks

### Advanced Patterns
📄 **Read:** [references/advanced-patterns.md](references/datepicker-advanced-patterns.md)
- Cascading date pickers (dependent availability)
- Dynamic date ranges driven by business logic
- Blackout/unavailable dates and recurring date handling
- Testing and validation patterns for advanced scenarios

### Quick Start Example

Basic DatePicker implementation in Angular 21+ standalone component:

```typescript
import { Component } from '@angular/core';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-datepicker-demo',
  standalone: true,
  imports: [DatePickerModule],
  template: `
    <ejs-datepicker
      placeholder="Select date"
      [(ngModel)]="selectedDate"
      (change)="onDateChange($event)">
    </ejs-datepicker>
    <p>Selected: {{ selectedDate | date:'fullDate' }}</p>
  `
})
export class DatePickerDemoComponent {
  selectedDate: Date | null = null;

  onDateChange(event: any) {
    console.log('Date changed:', event.value);
  }
}
```

**Setup Steps:**
1. Install `@syncfusion/ej2-angular-calendars` package
2. Import `DatePickerModule` in component
3. Add `<ejs-datepicker>` element with properties
4. Bind to component variable with `[(ngModel)]` (two-way binding)

**What happens:**
- DatePicker displays with calendar icon
- Click to open popup calendar
- Select date from calendar or type directly
- Selected date updates component variable
- change event fires on date selection

### Common Patterns

#### 1. Date Range Validation
Restrict user to select dates between specific start and end dates:

```typescript
minDate = new Date(2024, 0, 1);  // Jan 1, 2024
maxDate = new Date(2024, 11, 31); // Dec 31, 2024
```

```html
<ejs-datepicker
  [min]="minDate"
  [max]="maxDate"
  placeholder="Select date in 2024">
</ejs-datepicker>
```

**Use case:** Flight booking, hotel reservations, appointment scheduling

#### 2. Custom Date Format
Display dates in application-specific format:

```typescript
dateFormat = 'dd/MM/yyyy';  // European format
```

```html
<ejs-datepicker
  [format]="dateFormat"
  placeholder="DD/MM/YYYY">
</ejs-datepicker>
```

#### 3. Masked Date Input
Guide user with visual masks and arrow key navigation:

```html
<ejs-datepicker
  [enableMask]="true"
  [maskPlaceholder]="'day'"
  format="dd/MM/yyyy">
</ejs-datepicker>
```

**Keyboard navigation:** Up/Down arrows increment/decrement segments, Left/Right navigate between segments

#### 4. Date Range Selection (With Min/Max)
Prevent past dates in booking scenarios:

```typescript
minDate = new Date(); // Today
maxDate: Date;

constructor() {
  // Set max to 90 days from today
  this.maxDate = new Date();
  this.maxDate.setDate(this.maxDate.getDate() + 90);
}
```

#### 5. Reactive Forms Integration
DatePicker with reactive form validation:

```typescript
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

export class FormComponent {
  form = this.fb.group({
    birthDate: [null, [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}
}
```

```html
<form [formGroup]="form">
  <ejs-datepicker
    formControlName="birthDate"
    placeholder="Birth date">
  </ejs-datepicker>
  <span *ngIf="form.get('birthDate')?.hasError('required')">
    Birth date is required
  </span>
</form>
```

### API Reference (Properties, Methods, Events)

#### Properties

| Property | Type | Notes |
|---|---:|---|
| `allowEdit` | boolean | Whether textbox is editable (defaults true) |
| `calendarMode` | CalendarType | Calendar type (e.g., Gregorian, Islamic) |
| `cssClass` | string | Root CSS class for custom styling |
| `dayHeaderFormat` | DayHeaderFormats | Day header format (Short/Narrow/Abbreviated/Wide) |
| `depth` | CalendarView | Deepest allowed calendar view (Month/Year/Decade) |
| `enableMask` | boolean | Enable masked date input |
| `enablePersistence` | boolean | Persist component state between reloads |
| `enableRtl` | boolean | Enable right-to-left rendering |
| `enabled` | boolean | Enable or disable the component (set `false` to disable) |
| `firstDayOfWeek` | number | First day of week (0-6) |
| `floatLabelType` | FloatLabelType|string | Floating label behavior for input |
| `format` | string\|FormatObject | Display format for the value |
| `fullScreenMode` | boolean | Popup full-screen mode on mobile |
| `htmlAttributes` | { [key:string]: string } | Additional HTML attributes for root element |
| `inputFormats` | string[]\|FormatObject[] | Acceptable input formats for parsing |
| `keyConfigs` | { [key:string]: string } | Custom key action mappings |
| `locale` | string | Override global culture (e.g., 'en-US') |
| `maskPlaceholder` | MaskPlaceholderModel | Placeholder text for masked input |
| `max` | Date | Maximum selectable date |
| `min` | Date | Minimum selectable date |
| `openOnFocus` | boolean | Open popup on input focus |
| `placeholder` | string | Input placeholder text |
| `readonly` | boolean | Make input readonly (no typing) |
| `serverTimezoneOffset` | number | Server timezone offset in minutes (optional) |
| `showClearButton` | boolean | Show/hide clear icon |
| `showTodayButton` | boolean | Show/hide today button in popup |
| `start` | CalendarView | Initial view when popup opens |
| `strictMode` | boolean | Enforce strict parsing/validation |
| `value` | Date | Selected date value |
| `weekNumber` | boolean | Show week numbers in calendar |
| `weekRule` | WeekRule | Rule for first week of year |
| `width` | number\|string | Component width |
| `zIndex` | number | Z-index for popup |

#### Methods

- `currentView()` — Returns current calendar view name
- `destroy()` — Destroy the component instance
- `focusIn()` — Focus the input
- `focusOut()` — Blur the input
- `getPersistData()` — Returns persisted properties string
- `hide()` — Hide the calendar popup
- `navigateTo(view: CalendarView, date?: Date)` — Navigate to specific view/date
- `removeDate(dates: Date|Date[])` — Remove date(s) from values
- `show()` — Show the calendar popup

#### Events

- `blur` — Emits when input loses focus
- `change` — Emits when the value changes (provides `ChangedEventArgs`)
- `cleared` — Emits when clear button is used
- `close` — Emits when popup closes (preventable)
- `created` — Component created lifecycle
- `destroyed` — Component destroyed lifecycle
- `focus` — Emits when input gets focus
- `navigated` — Emits when calendar navigates to another view
- `open` — Emits when popup opens (preventable)
- `renderDayCell` — Emits for each day cell render (useful to disable/customize cells)

### Common Use Cases

1. **Birthday/Birth Date Selection:** Min/Max validation, masked input, decade start view for quick year selection
2. **Meeting Scheduler:** Date range (today + 90 days), custom working day validation, form integration
3. **Hotel/Flight Booking:** Min/Max dates, two-way date binding, reactive forms with validation
4. **Application Forms:** Date of birth, license expiry, appointment dates with accessibility compliance
5. **International Applications:** Locale-aware formatting, RTL support, culture-specific calendars

## DateRangePicker

A comprehensive guide for implementing the Syncfusion Essential JS 2 DateRangePicker component in Angular applications. Learn to create date range pickers, handle range selection, manage events, and customize styling.

### DateRangePicker Overview

The Syncfusion Angular DateRangePicker component is a specialized date selection widget that provides:

- **Dual calendar display:** Start and end date selection with synchronized calendars
- **Preset ranges:** Predefined options like "Last 7 Days", "This Month", "Last Month", "Custom"
- **Range validation:** Min/max dates, disabled ranges, required range length
- **Date formatting:** Customizable date format with separators and pattern support
- **Event system:** Created, destroyed, change, select, rangeSelected, open, close, renderDayCell events
- **Keyboard shortcuts:** Tab, arrow keys, enter, escape for full keyboard accessibility
- **Localization support:** Locale-specific formatting, day headers, month names
- **Accessibility:** Full WCAG 2.2 compliance, ARIA attributes, screen reader support
- **Rich customization:** CSS classes, custom templates, day cell rendering
- **Mobile optimization:** Touch-friendly interface, responsive design, full-screen mode

**Package:** `@syncfusion/ej2-angular-calendars`

### Documentation Navigation

Read the following references based on your specific needs:

#### Getting Started
📄 **Read:** [references/getting-started.md](references/daterangepicker-getting-started.md)
- Package installation and module setup
- CSS theme imports and dependencies
- Basic DateRangePicker implementation
- Component initialization in Angular
- Start and end date configuration
- Running and testing setup

#### Date Range Selection
📄 **Read:** [references/date-range-selection.md](references/daterangepicker-date-range-selection.md)
- Single click range selection
- Sequential date selection (click start, then end)
- Date range value binding (`startDate`, `endDate` properties)
- Min/max date constraints
- Range validation and error handling
- Disabled date ranges
- Clearing selections

#### Preset Ranges
📄 **Read:** [references/preset-ranges.md](references/daterangepicker-preset-ranges.md)
- Predefined range options (Last 7 Days, Last Month, etc.)
- Custom preset configuration
- Programmatic preset application
- Dynamic preset generation
- Preset change events
- Combining presets with constraints

#### Events & Methods
📄 **Read:** [references/events-and-methods.md](references/daterangepicker-events-and-methods.md)
- Event handlers (change, select, rangeSelected, open, close)
- Range selection event details (startDate, endDate, daySpan)
- Programmatic methods (show(), hide(), getSelectedRange())
- Created and destroyed lifecycle events
- RenderDayCell for custom styling
- Method return types and parameters

#### Date Formatting & Constraints
📄 **Read:** [references/date-formatting-and-constraints.md](references/daterangepicker-date-formatting-and-constraints.md)
- Date format patterns and separators
- Multiple format support (format and inputFormats)
- Min/max date constraints
- Min/max days validation
- Disabled dates configuration
- Format error handling
- Locale-specific formats

#### Keyboard Navigation & Accessibility
📄 **Read:** [references/keyboard-navigation-and-accessibility.md](references/daterangepicker-keyboard-navigation-and-accessibility.md)
- Tab and Shift+Tab navigation
- Arrow keys for date navigation
- Enter for range selection and confirmation
- Escape to close picker
- Alt key shortcuts
- Screen reader compatibility
- ARIA labels and roles
- WCAG 2.2 AA compliance
- Focus management

#### Styling & Customization
📄 **Read:** [references/styling-and-customization.md](references/daterangepicker-styling-and-customization.md)
- CSS class customization (.e-daterangepicker, .e-calendar, .e-range-header)
- Theme selection (Material, Bootstrap, Tailwind, Fabric)
- Dark mode implementation
- Custom day cell styling via renderDayCell
- Disabled date styling
- Preset button styling
- Hover and focus states
- Responsive layout customization

#### Globalization & Localization
📄 **Read:** [references/globalization-and-localization.md](references/daterangepicker-globalization-and-localization.md)
- Locale property for date formatting
- RTL (Right-to-Left) support for Arabic, Hebrew
- Day header formats (Short, Narrow, Abbreviated, Wide)
- Month names and day names localization
- Custom locale support
- Timezone handling
- Date format localization

#### API Reference
📄 **Read:** [references/api-reference.md](references/daterangepicker-api-reference.md)
- Complete property reference with descriptions
- All method signatures with return types
- Event argument types and structures
- Type interfaces (RangeEventArgs, NavigatingEventArgs, etc.)
- CSS classes and styling hooks
- Browser support matrix

### Quick Start Example

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
  // Date range properties
  startDate: Date = new Date(2026, 2, 1);  // March 1, 2026
  endDate: Date = new Date(2026, 2, 31);   // March 31, 2026
  
  // Constraints
  minDate: Date = new Date(2020, 0, 1);
  maxDate: Date = new Date(2030, 11, 31);
  
  // Range display
  selectedRange: string = '';
  
  // Event handler
  onRangeChange(args: RangeEventArgs): void {
    console.log('Start Date:', args.startDate);
    console.log('End Date:', args.endDate);
    console.log('Days in range:', args.daySpan);
    this.updateRangeDisplay();
  }
  
  updateRangeDisplay(): void {
    if (this.startDate && this.endDate) {
      const start = this.startDate.toLocaleDateString();
      const end = this.endDate.toLocaleDateString();
      this.selectedRange = `${start} - ${end}`;
    }
  }
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px; font-family: Arial, sans-serif;">
  <h2>DateRangePicker Example</h2>
  
  <div style="margin-bottom: 20px;">
    <label for="dateRange">Select Date Range:</label>
    <ejs-daterangepicker 
      id="dateRange"
      placeholder="Select a date range"
      [startDate]="startDate"
      [endDate]="endDate"
      [min]="minDate"
      [max]="maxDate"
      (change)="onRangeChange($event)">
    </ejs-daterangepicker>
  </div>
  
  <div *ngIf="selectedRange" style="padding: 10px; background-color: #f0f0f0;">
    <p><strong>Selected Range:</strong> {{ selectedRange }}</p>
  </div>
</div>
```

```css
/* app.component.css */
@import '../node_modules/@syncfusion/ej2-base/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-inputs/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-calendars/styles/material3.css';

:host ::ng-deep .e-daterangepicker {
  margin: 10px 0;
  width: 100%;
}

:host ::ng-deep .e-range-header {
  background-color: #3f51b5;
  color: white;
}
```

### Common Patterns

#### Pattern 1: Preset Date Ranges

Quick selection buttons for common date ranges:

```typescript
export class AppComponent {
  presets: any[] = [
    { label: 'Today', start: new Date(), end: new Date() },
    { label: 'Last 7 Days', start: this.getDateDaysAgo(7), end: new Date() },
    { label: 'Last 30 Days', start: this.getDateDaysAgo(30), end: new Date() },
    { label: 'This Month', start: this.getFirstDayOfMonth(), end: new Date() },
    { label: 'Last Month', start: this.getFirstDayOfLastMonth(), end: this.getLastDayOfLastMonth() }
  ];
  
  startDate: Date = new Date();
  endDate: Date = new Date();
  
  selectPreset(preset: any): void {
    this.startDate = preset.start;
    this.endDate = preset.end;
  }
  
  private getDateDaysAgo(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  }
  
  private getFirstDayOfMonth(): Date {
    return new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  }
  
  private getFirstDayOfLastMonth(): Date {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
  }
  
  private getLastDayOfLastMonth(): Date {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 0);
  }
}
```

```html
<div>
  <div style="margin-bottom: 10px;">
    <button *ngFor="let preset of presets" 
            (click)="selectPreset(preset)"
            style="margin-right: 5px; padding: 8px 12px;">
      {{ preset.label }}
    </button>
  </div>
  
  <ejs-daterangepicker 
    [startDate]="startDate"
    [endDate]="endDate">
  </ejs-daterangepicker>
</div>
```

#### Pattern 2: Date Range Validation

Validate date ranges with custom constraints:

```typescript
export class AppComponent {
  @ViewChild('daterangepicker') drp!: DateRangePickerComponent;
  
  startDate: Date = new Date();
  endDate: Date = new Date();
  rangeError: string = '';
  
  minDate: Date = new Date(2020, 0, 1);
  maxDate: Date = new Date(2030, 11, 31);
  minDays: number = 1;      // At least 1 day
  maxDays: number = 90;     // At most 90 days
  
  onRangeChange(args: RangeEventArgs): void {
    this.rangeError = '';
    
    // Validate date range
    if (args.daySpan < this.minDays) {
      this.rangeError = `Range must be at least ${this.minDays} day(s)`;
      return;
    }
    
    if (args.daySpan > this.maxDays) {
      this.rangeError = `Range cannot exceed ${this.maxDays} days`;
      return;
    }
    
    this.startDate = args.startDate;
    this.endDate = args.endDate;
  }
  
  isRangeValid(): boolean {
    return this.rangeError === '';
  }
}
```

#### Pattern 3: Reactive Form Integration

Integrate DateRangePicker with Reactive Forms:

```typescript
export class AppComponent implements OnInit {
  reportForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.reportForm = this.fb.group({
      reportName: ['', Validators.required],
      startDate: [new Date(2026, 0, 1), Validators.required],
      endDate: [new Date(), Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.reportForm.get('startDate')?.valueChanges.subscribe(date => {
      console.log('Start date changed:', date);
      this.validateDateRange();
    });
    
    this.reportForm.get('endDate')?.valueChanges.subscribe(date => {
      console.log('End date changed:', date);
      this.validateDateRange();
    });
  }
  
  validateDateRange(): void {
    const start = this.reportForm.get('startDate')?.value;
    const end = this.reportForm.get('endDate')?.value;
    
    if (start && end && start > end) {
      this.reportForm.get('endDate')?.setErrors({ 'invalidRange': true });
    } else {
      this.reportForm.get('endDate')?.setErrors(null);
    }
  }
  
  submitForm(): void {
    if (this.reportForm.valid) {
      console.log('Form values:', this.reportForm.value);
    }
  }
}
```

```html
<form [formGroup]="reportForm" (ngSubmit)="submitForm()">
  <div>
    <label>Report Name:</label>
    <ejs-textbox 
      formControlName="reportName"
      placeholder="Enter report name">
    </ejs-textbox>
  </div>
  
  <div>
    <label>Report Period:</label>
    <ejs-daterangepicker 
      [formControl]="reportForm.get('startDate')"
      [endDate]="reportForm.get('endDate')?.value">
    </ejs-daterangepicker>
  </div>
  
  <button type="submit" [disabled]="!reportForm.valid">Generate Report</button>
</form>
```

#### Pattern 4: Dynamic Range Constraints

Update range constraints based on business logic:

```typescript
export class AppComponent {
  startDate: Date = new Date();
  endDate: Date = new Date();
  
  // Dynamic constraints
  minDate: Date = new Date();
  maxDate: Date = new Date();
  
  reportType: string = 'daily';
  
  onReportTypeChange(type: string): void {
    this.reportType = type;
    this.updateConstraints();
  }
  
  private updateConstraints(): void {
    const today = new Date();
    
    switch (this.reportType) {
      case 'daily':
        // Last 7 days only
        this.minDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        this.maxDate = today;
        break;
      
      case 'monthly':
        // Last 12 months
        this.minDate = new Date(today.getFullYear() - 1, today.getMonth(), 1);
        this.maxDate = today;
        break;
      
      case 'yearly':
        // Last 5 years
        this.minDate = new Date(today.getFullYear() - 5, 0, 1);
        this.maxDate = today;
        break;
    }
  }
}
```

#### Pattern 5: Disabled Date Ranges

Disable specific date ranges (holidays, blackout dates):

```typescript
export class AppComponent {
  disabledRanges: Array<{start: Date, end: Date}> = [
    { start: new Date(2026, 11, 20), end: new Date(2026, 11, 31) }, // Christmas season
    { start: new Date(2026, 0, 1), end: new Date(2026, 0, 3) }      // New Year
  ];
  
  startDate: Date = new Date();
  endDate: Date = new Date();
  
  onRenderDayCell(args: RenderDayCellEventArgs): void {
    // Disable dates in disabled ranges
    for (const range of this.disabledRanges) {
      if (args.date >= range.start && args.date <= range.end) {
        args.isDisabled = true;
        break;
      }
    }
  }
}
```

### Key Props Reference

| Prop | Type | Description | Example |
|------|------|-------------|---------|
| `startDate` | `Date` | Start date of the range | `[startDate]="start"` |
| `endDate` | `Date` | End date of the range | `[endDate]="end"` |
| `value` | `Date[]` or `DateRange` | Selected date range (array or object) | `[(ngModel)]="dateRange"` |
| `min` | `Date` | Minimum selectable date | `[min]="minDate"` |
| `max` | `Date` | Maximum selectable date | `[max]="maxDate"` |
| `minDays` | `number` | Minimum days in range | `[minDays]="1"` |
| `maxDays` | `number` | Maximum days in range | `[maxDays]="90"` |
| `format` | `string` | Date display format | `format="dd/MM/yyyy"` |
| `separator` | `string` | Range separator character | `separator=" to "` |
| `placeholder` | `string` | Placeholder text | `placeholder="Select date range"` |
| `presets` | `PresetsModel[]` | Predefined range options | `[presets]="presets"` |
| `strictMode` | `boolean` | Strict date validation | `[strictMode]="true"` |
| `readonly` | `boolean` | Read-only input field | `[readonly]="false"` |
| `enabled` | `boolean` | Enable/disable component | `[enabled]="true"` |
| `locale` | `string` | Culture/language code | `locale="en-US"` |
| `enableRtl` | `boolean` | Enable RTL layout | `[enableRtl]="false"` |
| `cssClass` | `string` | Custom CSS classes | `cssClass="custom-drp"` |
| `width` | `number \| string` | Component width | `width="300px"` |
| `allowEdit` | `boolean` | Allow manual text input | `[allowEdit]="true"` |
| `openOnFocus` | `boolean` | Open picker on input focus | `[openOnFocus]="true"` |
| `showClearButton` | `boolean` | Show clear button | `[showClearButton]="true"` |
| `depth` | `CalendarView` | Calendar view depth | `depth="Month"` |

### Common Use Cases

**Use Case 1: Report Date Range Selection**
- User selects date range for report generation
- Apply min/max date constraints
- Support preset ranges (Last 7 Days, Last Month, etc.)
- Solution: Combine startDate/endDate with presets and min/max constraints
- Reference: [Preset Ranges](references/daterangepicker-preset-ranges.md) + [Date Formatting & Constraints](references/daterangepicker-date-formatting-and-constraints.md)

**Use Case 2: Booking System Range**
- Select check-in and check-out dates for booking
- Disable past dates and blackout dates
- Show day count in range
- Solution: Use min date constraint, renderDayCell for disabled ranges, calculate daySpan
- Reference: [Date Range Selection](references/daterangepicker-date-range-selection.md) + [Events & Methods](references/daterangepicker-events-and-methods.md)

**Use Case 3: Analytics Date Filter**
- Select date range for analytics dashboard
- Multiple preset options for quick selection
- Responsive mobile-friendly interface
- Solution: Use presets with responsive styling and touch optimization
- Reference: [Preset Ranges](references/daterangepicker-preset-ranges.md) + [Styling & Customization](references/daterangepicker-styling-and-customization.md)

**Use Case 4: Accessible Form Field**
- DateRangePicker integrated in form with full keyboard accessibility
- Screen reader compatible, WCAG 2.2 compliant
- Solution: Use with Reactive Forms, proper ARIA labels
- Reference: [Keyboard Navigation & Accessibility](references/daterangepicker-keyboard-navigation-and-accessibility.md)

**Use Case 5: International Date Picker**
- Support multiple languages and date formats
- Show RTL for Arabic, Hebrew
- Locale-specific formatting
- Solution: Use locale property and format customization
- Reference: [Globalization & Localization](references/daterangepicker-globalization-and-localization.md)

## DatetimePicker

A comprehensive guide for implementing the Syncfusion Essential JS 2 DatetimePicker component in Angular applications. Learn to create date and time selection interfaces, manage calendars and time pickers, handle events, and customize styling.

### DatetimePicker Overview

The Syncfusion Angular DatetimePicker component is a combined date and time selection widget that provides:

- **Integrated Date & Time Selection:** Calendar popup for dates + time picker dropdown for time selection
- **Flexible Formatting:** Custom date formats, time formats, and locale-aware formatting
- **Calendar Views:** Month (default), Year, and Decade views with smooth navigation
- **Time Intervals:** Configurable step intervals (15, 30, 60 minutes, etc.) for time selection
- **Range Constraints:** Min/max dates and min/max time with strict validation
- **Comprehensive Event System:** change, focus, blur, open, close, created, destroyed, navigated, renderDayCell events
- **Masked Input Support:** Optional masked input format for guided user entry
- **Persistence & RTL:** State persistence across reloads and right-to-left language support
- **Advanced Features:** Strict mode validation, floating labels, keyboard customization, timezone support
- **Accessibility:** Full WCAG 2.2 compliance, keyboard navigation, WAI-ARIA support
- **Theme Support:** Material, Bootstrap, Tailwind, Fabric with light/dark variants
- **Mobile Optimized:** Full screen mode on mobile devices, touch-friendly interface

**Package:** `@syncfusion/ej2-angular-datetimepickers`

### Documentation Navigation

Read the following references based on your specific needs:

#### Getting Started
📄 **Read:** [references/getting-started.md](references/datetimepicker-getting-started.md)
- Package installation via npm and ng add
- NgModule vs Standalone component setup
- CSS theme imports and dependencies
- Basic datetimepicker implementation
- Component initialization and running the application
- Development server setup

#### Basic Implementation
📄 **Read:** [references/basic-implementation.md](references/datetimepicker-basic-implementation.md)
- Simple datetime picker with ngModel
- Two-way data binding patterns
- Readonly and disabled states
- Basic validation and constraints
- Event handling fundamentals
- ViewChild component access

#### Date & Time Configuration
📄 **Read:** [references/date-time-configuration.md](references/datetimepicker-date-time-configuration.md)
- Date format customization (format property)
- Time format configuration (timeFormat property)
- ISO date string handling
- Date range constraints (min/max dates)
- Time range constraints (minTime/maxTime)
- Parsing multiple input formats (inputFormats)

#### Calendar & Time Views
📄 **Read:** [references/calendar-and-time-views.md](references/datetimepicker-calendar-and-time-views.md)
- Calendar view modes (month, year, decade)
- Start and depth properties for view control
- Time picker popup configuration
- Time step intervals and granularity
- ScrollTo position for time scrolling
- Today button and clear button behavior

#### Events & Callbacks
📄 **Read:** [references/events-and-callbacks.md](references/datetimepicker-events-and-callbacks.md)
- Change event with ChangedEventArgs
- Focus/blur event handling
- Open/close popup events
- Created/destroyed lifecycle events
- Navigate event for calendar navigation
- RenderDayCell for custom day styling
- Cleared event when clear button is used

#### Methods & Imperative Access
📄 **Read:** [references/methods-and-imperative-access.md](references/datetimepicker-methods-and-imperative-access.md)
- ViewChild access and component references
- currentView() to get active calendar view
- navigateTo() for programmatic navigation
- focusIn/focusOut for focus management
- destroy() for cleanup and resource release
- getPersistData() for state persistence

#### Advanced Features
📄 **Read:** [references/advanced-features.md](references/datetimepicker-advanced-features.md)
- Masked input mode with mask placeholders
- State persistence across page reloads
- RTL (Right-to-Left) language support
- Floating label types and behavior
- Strict mode validation and error states
- Keyboard shortcuts and key configuration
- Timezone offset handling
- Full screen mode for mobile devices
- Clear button visibility and behavior

#### Styling & Customization
📄 **Read:** [references/styling-and-customization.md](references/datetimepicker-styling-and-customization.md)
- CSS class customization (cssClass property)
- Theme selection and switching
- Dark mode implementation
- Component width and z-index configuration
- HTML attribute injection (htmlAttributes)
- Calendar mode selection (Gregorian vs Islamic)
- Day header format options
- Disabled dates and styling states

#### Accessibility & Globalization
📄 **Read:** [references/accessibility-and-globalization.md](references/datetimepicker-accessibility-and-globalization.md)
- WCAG 2.2 and Section 508 compliance standards
- WAI-ARIA attributes and roles
- Keyboard navigation (arrows, enter, space, escape)
- Screen reader compatibility and announcements
- Localization and locale property usage
- Day header format variations
- First day of week customization
- Week numbers and week rules
- RTL text direction support

#### API Reference
📄 **Read:** [references/api-reference.md](references/datetimepicker-api-reference.md)
- Complete property reference with types and defaults
- All method signatures with parameters and return types
- All events with event argument types
- Property descriptions and use cases
- Method examples and common patterns
- Type interfaces and enums
- Key configuration for keyboard shortcuts
- Comprehensive property-by-property guide

### Quick Start Example

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { ChangedEventArgs } from '@syncfusion/ej2-datetimepickers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Simple datetime value
  dateTimeValue: Date = new Date();
  
  // Configuration
  minDate: Date = new Date(2020, 0, 1);
  maxDate: Date = new Date(2030, 11, 31);
  dateFormat: string = 'dd/MM/yyyy hh:mm a';
  timeFormat: string = 'hh:mm a';
  
  // Event handler
  onDateTimeChange(args: ChangedEventArgs): void {
    console.log('Selected DateTime:', args.value);
    console.log('Event Type:', args.type);
  }
  
  onPopupOpen(): void {
    console.log('Popup opened');
  }
  
  onPopupClose(): void {
    console.log('Popup closed');
  }
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px;">
  <h2>Select Date & Time</h2>
  
  <ejs-datetimepicker
    id="datetimepicker"
    [value]="dateTimeValue"
    [format]="dateFormat"
    [timeFormat]="timeFormat"
    [min]="minDate"
    [max]="maxDate"
    placeholder="Select date and time"
    (change)="onDateTimeChange($event)"
    (open)="onPopupOpen()"
    (close)="onPopupClose()">
  </ejs-datetimepicker>
  
  <p *ngIf="dateTimeValue">
    Selected: {{ dateTimeValue | date:'medium' }}
  </p>
</div>
```

### Common Patterns

#### Pattern 1: Datetime Range Selection

Select a start and end datetime for appointments, bookings, or events:

```typescript
export class AppComponent {
  startDateTime: Date = new Date();
  endDateTime: Date = new Date(Date.now() + 3600000); // +1 hour
  
  onStartChange(args: ChangedEventArgs): void {
    // Ensure end is after start
    if (this.endDateTime <= args.value) {
      this.endDateTime = new Date((args.value as Date).getTime() + 3600000);
    }
  }
}
```

#### Pattern 2: Business Hours Only

Restrict time selection to business hours (9 AM - 5 PM):

```typescript
export class AppComponent {
  minTime: Date = new Date(2026, 2, 24, 9, 0);  // 9:00 AM
  maxTime: Date = new Date(2026, 2, 24, 17, 0); // 5:00 PM
  
  datetimeValue: Date = new Date(2026, 2, 24, 10, 0);
}
```

```html
<ejs-datetimepicker
  [value]="datetimeValue"
  [minTime]="minTime"
  [maxTime]="maxTime"
  timeFormat="hh:mm a">
</ejs-datetimepicker>
```

#### Pattern 3: Masked Input for Guided Entry

Use masked input to guide users through the datetime format:

```typescript
export class AppComponent {
  datetimeValue: Date;
  maskPlaceholder = {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
    hour: 'hh',
    minute: 'mm',
    second: 'ss'
  };
}
```

```html
<ejs-datetimepicker
  [value]="datetimeValue"
  [enableMask]="true"
  [maskPlaceholder]="maskPlaceholder"
  format="dd/MM/yyyy hh:mm:ss">
</ejs-datetimepicker>
```

### Pattern 4: Reactive Forms Integration

Integrate datetimepicker with Angular Reactive Forms:

```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class AppComponent {
  appointmentForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.appointmentForm = this.fb.group({
      appointmentDateTime: [
        new Date(),
        [Validators.required]
      ]
    });
  }
  
  submitForm(): void {
    if (this.appointmentForm.valid) {
      console.log(this.appointmentForm.value);
    }
  }
}
```

```html
<form [formGroup]="appointmentForm">
  <ejs-datetimepicker
    formControlName="appointmentDateTime"
    format="dd/MM/yyyy hh:mm a">
  </ejs-datetimepicker>
  
  <button (click)="submitForm()" [disabled]="!appointmentForm.valid">
    Submit
  </button>
</form>
```

#### Pattern 5: Disabled Dates

Disable weekends and specific dates:

```typescript
export class AppComponent {
  datetimeValue: Date;
  
  onRenderDayCell(args: RenderDayCellEventArgs): void {
    // Disable weekends (0 = Sunday, 6 = Saturday)
    if ((args.date as Date).getDay() === 0 || (args.date as Date).getDay() === 6) {
      args.isDisabled = true;
    }
    
    // Disable specific dates
    const disabledDates = [5, 15, 25]; // 5th, 15th, 25th of each month
    if (disabledDates.includes((args.date as Date).getDate())) {
      args.isDisabled = true;
    }
  }
}
```

```html
<ejs-datetimepicker
  [value]="datetimeValue"
  (renderDayCell)="onRenderDayCell($event)">
</ejs-datetimepicker>
```

### Key Properties Reference

| Property | Type | Purpose |
|----------|------|---------|
| `value` | Date | Selected datetime value for two-way binding |
| `format` | string | Date display format (e.g., 'dd/MM/yyyy hh:mm a') |
| `timeFormat` | string | Time display format in popup (e.g., 'hh:mm a') |
| `min` | Date | Minimum selectable date |
| `max` | Date | Maximum selectable date |
| `minTime` | Date | Minimum selectable time |
| `maxTime` | Date | Maximum selectable time |
| `step` | number | Time interval in minutes (15, 30, 60) |
| `enabled` | boolean | Enable/disable the component |
| `readonly` | boolean | Make input readonly (select from popup only) |
| `placeholder` | string | Placeholder text in input |
| `enableMask` | boolean | Enable masked input mode |
| `strictMode` | boolean | Enforce valid values only |
| `enableRtl` | boolean | Right-to-left language support |
| `enablePersistence` | boolean | Persist value across page reloads |
| `start` | CalendarView | Initial calendar view (Month/Year/Decade) |
| `depth` | CalendarView | Maximum calendar view level |
| `locale` | string | Locale for formatting (e.g., 'en-US', 'de-DE') |

### Common Use Cases

#### Appointment Booking System
- Use date range selection with business hours time constraints
- Display available time slots based on min/max time
- Handle form validation with required validators
- Show selected datetime confirmation

#### Event Scheduling
- Select start and end datetimes for events
- Disable weekend dates with renderDayCell
- Use step intervals for common durations (30, 60 min)
- Format output for API submission

#### Shift Management
- Select shift start and end times
- Apply shift time constraints (min/max time)
- Handle date transitions (shifts spanning midnight)
- Support multiple timezone offsets

#### Billing & Invoicing
- Select invoice date and time
- Restrict to past dates only
- Display in user's locale format
- Export with ISO format

### Next Steps

1. **Start with Getting Started** → Install and configure the component
2. **Build Basic Implementation** → Create simple datetime pickers
3. **Add Event Handling** → Respond to user interactions
4. **Implement Advanced Features** → Add masked input, persistence, RTL
5. **Customize Appearance** → Apply themes and custom styles
6. **Ensure Accessibility** → Support keyboard and screen readers
7. **Reference API** → Consult complete API documentation as needed

## TimePicker

A comprehensive guide for implementing the Syncfusion Essential JS 2 TimePicker component in Angular applications. Learn to create time selection interfaces, manage time inputs, handle events, and customize styling.

### TimePicker Overview

The Syncfusion Angular TimePicker component is a dedicated time selection widget that provides:

- **Time Selection:** Popup list with configurable time intervals for selection
- **Flexible Formatting:** Custom time formats, skeleton options, and locale-aware formatting
- **Time Intervals:** Configurable step intervals (15, 30, 60 minutes, etc.) for time selection
- **Range Constraints:** Min/max time with strict validation and boundary enforcement
- **Comprehensive Event System:** change, focus, blur, open, close, created, destroyed, cleared, itemRender events
- **Masked Input Support:** Optional masked input format for guided user entry
- **Persistence & RTL:** State persistence across reloads and right-to-left language support
- **Advanced Features:** Strict mode validation, floating labels, keyboard customization, timezone support
- **Accessibility:** Full WCAG 2.2 compliance, keyboard navigation, WAI-ARIA support
- **Theme Support:** Material, Bootstrap, Tailwind, Fabric with light/dark variants
- **Mobile Optimized:** Full screen mode on mobile devices, touch-friendly interface

**Package:** `@syncfusion/ej2-angular-calendars`

### Documentation Navigation

Read the following references based on your specific needs:

#### Getting Started
📄 **Read:** [references/getting-started.md](references/timepicker-getting-started.md)
- Package installation via npm and ng add
- NgModule vs Standalone component setup
- CSS theme imports and dependencies
- Basic timepicker implementation
- Component initialization and running the application
- Development server setup

#### Basic Implementation
📄 **Read:** [references/basic-implementation.md](references/timepicker-basic-implementation.md)
- Simple time picker with ngModel
- Two-way data binding patterns
- Readonly and disabled states
- Basic validation and constraints
- Event handling fundamentals
- ViewChild component access

#### Time Configuration
📄 **Read:** [references/time-configuration.md](references/timepicker-time-configuration.md)
- Time format customization (format property)
- TimeFormatObject and skeleton options
- Step intervals and time granularity
- Min/max time constraints
- ScrollTo position for time scrolling
- Popup list configuration

#### Events & Callbacks
📄 **Read:** [references/events-and-callbacks.md](references/timepicker-events-and-callbacks.md)
- Change event with ChangeEventArgs
- Focus/blur event handling
- Open/close popup events
- Created/destroyed lifecycle events
- Cleared event when clear button is used
- ItemRender for custom time formatting

#### Methods & Imperative Access
📄 **Read:** [references/methods-and-imperative-access.md](references/timepicker-methods-and-imperative-access.md)
- ViewChild access and component references
- show() to open the time popup
- hide() to close the time popup
- focusIn/focusOut for focus management
- getPersistData() for state persistence

### Advanced Features
📄 **Read:** [references/advanced-features.md](references/timepicker-advanced-features.md)
- Masked input mode with mask placeholders
- State persistence across page reloads
- RTL (Right-to-Left) language support
- Floating label types and behavior
- Strict mode validation and error states
- Keyboard shortcuts and key configuration
- Timezone offset handling
- Full screen mode for mobile devices
- Clear button visibility and behavior
- OpenOnFocus popup trigger

#### Styling & Customization
📄 **Read:** [references/styling-and-customization.md](references/timepicker-styling-and-customization.md)
- CSS class customization (cssClass property)
- Theme selection and switching
- Dark mode implementation
- Component width and z-index configuration
- HTML attribute injection (htmlAttributes)
- Placeholder and enabled state styling
- Disabled date styling and appearance

#### Accessibility & Globalization
📄 **Read:** [references/accessibility-and-globalization.md](references/timepicker-accessibility-and-globalization.md)
- WCAG 2.2 and Section 508 compliance standards
- WAI-ARIA attributes and roles
- Keyboard navigation (arrows, enter, space, escape)
- Screen reader compatibility and announcements
- Localization and locale property usage
- Time format variations
- RTL text direction support

#### API Reference
📄 **Read:** [references/api-reference.md](references/timepicker-api-reference.md)
- Complete property reference with types and defaults
- All method signatures with parameters and return types
- All events with event argument types
- Property descriptions and use cases
- Method examples and common patterns
- Type interfaces and enums
- Key configuration for keyboard shortcuts
- Comprehensive property-by-property guide

### Quick Start Example

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { ChangeEventArgs } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Simple time value
  timeValue: Date = new Date();
  
  // Configuration
  minTime: Date = new Date(2026, 2, 24, 8, 0);   // 8:00 AM
  maxTime: Date = new Date(2026, 2, 24, 20, 0);  // 8:00 PM
  format: string = 'hh:mm a';
  step: number = 30;  // 30-minute intervals
  
  // Event handler
  onTimeChange(args: ChangeEventArgs): void {
    console.log('Selected Time:', args.value);
    console.log('Selected Text:', args.text);
    console.log('Is User Interaction:', args.isInteracted);
  }
  
  onPopupOpen(): void {
    console.log('Time popup opened');
  }
  
  onPopupClose(): void {
    console.log('Time popup closed');
  }
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px;">
  <h2>Select a Time</h2>
  
  <ejs-timepicker
    id="timepicker"
    [value]="timeValue"
    [format]="format"
    [min]="minTime"
    [max]="maxTime"
    [step]="step"
    placeholder="Select time"
    (change)="onTimeChange($event)"
    (open)="onPopupOpen()"
    (close)="onPopupClose()">
  </ejs-timepicker>
  
  <p *ngIf="timeValue">
    Selected Time: {{ timeValue | date:'shortTime' }}
  </p>
</div>
```

### Common Patterns

#### Pattern 1: Business Hours Time Selection

Select time within business hours (9 AM - 6 PM):

```typescript
export class AppComponent {
  minTime: Date = new Date(2026, 2, 24, 9, 0);   // 9:00 AM
  maxTime: Date = new Date(2026, 2, 24, 18, 0);  // 6:00 PM
  timeValue: Date = new Date(2026, 2, 24, 10, 0);
  format: string = 'hh:mm a';
  step: number = 15;  // 15-minute intervals
}
```

```html
<ejs-timepicker
  [value]="timeValue"
  [min]="minTime"
  [max]="maxTime"
  [step]="step"
  [format]="format"
  placeholder="Select appointment time">
</ejs-timepicker>
```

#### Pattern 2: 24-Hour Format

Display time in 24-hour military format:

```typescript
export class AppComponent {
  timeValue: Date = new Date();
  format: string = 'HH:mm';  // 24-hour format
  step: number = 30;
}
```

```html
<ejs-timepicker
  [value]="timeValue"
  [format]="format"
  [step]="step"
  placeholder="Select time (24-hour)">
</ejs-timepicker>
```

#### Pattern 3: Masked Input for Guided Entry

Use masked input to guide users through time entry:

```typescript
export class AppComponent {
  timeValue: Date;
  enableMask: boolean = true;
  maskPlaceholder = {
    hour: 'hh',
    minute: 'mm',
    second: 'ss'
  };
  format: string = 'hh:mm:ss a';
}
```

```html
<ejs-timepicker
  [value]="timeValue"
  [enableMask]="enableMask"
  [maskPlaceholder]="maskPlaceholder"
  format="hh:mm:ss a">
</ejs-timepicker>
```

#### Pattern 4: Reactive Forms Integration

Integrate timepicker with Angular Reactive Forms:

```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class AppComponent {
  appointmentForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.appointmentForm = this.fb.group({
      appointmentTime: [
        new Date(),
        [Validators.required]
      ]
    });
  }
  
  submitForm(): void {
    if (this.appointmentForm.valid) {
      console.log(this.appointmentForm.value);
    }
  }
}
```

```html
<form [formGroup]="appointmentForm">
  <ejs-timepicker
    formControlName="appointmentTime"
    format="hh:mm a"
    placeholder="Select time">
  </ejs-timepicker>
  
  <button (click)="submitForm()" [disabled]="!appointmentForm.valid">
    Submit
  </button>
</form>
```

#### Pattern 5: Time Range Selection

Select start and end times for a duration:

```typescript
export class AppComponent {
  startTime: Date = new Date();
  endTime: Date = new Date(Date.now() + 3600000);  // +1 hour
  
  onStartTimeChange(args: ChangeEventArgs): void {
    // Ensure end time is after start time
    if (args.value && this.endTime <= args.value) {
      this.endTime = new Date(args.value.getTime() + 3600000);  // +1 hour
    }
  }
}
```

```html
<div>
  <label>Start Time:</label>
  <ejs-timepicker
    [value]="startTime"
    format="hh:mm a"
    (change)="onStartTimeChange($event)">
  </ejs-timepicker>
  
  <label>End Time:</label>
  <ejs-timepicker
    [value]="endTime"
    [min]="startTime"
    format="hh:mm a">
  </ejs-timepicker>
</div>
```

### Key Properties Reference

| Property | Type | Purpose |
|----------|------|---------|
| `value` | Date | Selected time value for two-way binding |
| `format` | string | Time display format (e.g., 'hh:mm a') |
| `min` | Date | Minimum selectable time |
| `max` | Date | Maximum selectable time |
| `step` | number | Time interval in minutes (15, 30, 60) |
| `enabled` | boolean | Enable/disable the component |
| `readonly` | boolean | Make input readonly (select from popup only) |
| `placeholder` | string | Placeholder text in input |
| `enableMask` | boolean | Enable masked input mode |
| `strictMode` | boolean | Enforce valid values only |
| `enableRtl` | boolean | Right-to-left language support |
| `enablePersistence` | boolean | Persist value across page reloads |
| `scrollTo` | Date | Default scroll position in time list |
| `locale` | string | Locale for formatting (e.g., 'en-US', 'de-DE') |
| `cssClass` | string | Custom CSS class for styling |
| `width` | string | Component width |
| `zIndex` | number | Z-index for popup |
| `showClearButton` | boolean | Show/hide clear icon |
| `openOnFocus` | boolean | Open popup on input focus |
| `floatLabelType` | string | Floating label behavior (Never/Always/Auto) |

### Common Use Cases

#### Appointment Booking System
- Select available time slots from a list
- Restrict to business hours with min/max time
- Use 15 or 30-minute step intervals
- Handle form validation with required validators
- Display selected time confirmation

#### Shift Management
- Select shift start and end times
- Apply shift time constraints
- Support multiple timezone offsets
- Handle shift transitions (spanning midnight)
- Export times in ISO format

#### Meeting Scheduling
- Select meeting time with business hours constraint
- Use 30-minute step intervals for standard durations
- Display time in user's locale format
- Prevent double bookings with validation
- Sync with calendar component for availability

#### Time Tracking
- Record clock-in and clock-out times
- Restrict to business hours
- Use masked input for quick entry
- Persist times for audit trail
- Export times for payroll integration

#### Event Registration
- Select event attendance time slot
- Show available time ranges
- Use clear button for corrections
- Support multiple time formats
- Accessibility for assistive technologies

### Next Steps

1. **Start with Getting Started** → Install and configure the component
2. **Build Basic Implementation** → Create simple time pickers
3. **Add Event Handling** → Respond to user interactions
4. **Implement Advanced Features** → Add masked input, persistence, RTL
5. **Customize Appearance** → Apply themes and custom styles
6. **Ensure Accessibility** → Support keyboard and screen readers
7. **Reference API** → Consult complete API documentation as needed
