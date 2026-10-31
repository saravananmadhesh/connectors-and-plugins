# API Reference

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Interfaces & Types](#interfaces--types)
- [Key Configurations](#key-configurations)

---

## Properties

### value
**Type:** `Date`  
**Default:** `null`  
**Description:** Gets or sets the selected date and time value.

```typescript
export class AppComponent {
  // Set initial value
  selectedDateTime: Date = new Date(2026, 2, 24, 14, 30);
}
```

```html
<ejs-datetimepicker [(ngModel)]="selectedDateTime"></ejs-datetimepicker>
```

### format
**Type:** `string | FormatObject`  
**Default:** `null` (based on culture)  
**Description:** Specifies the datetime display format. Can be a format string or format object with skeleton property.

```typescript
// String format
dateFormat: string = 'dd/MM/yyyy hh:mm a';

// Format object
formatObj = {
  skeleton: 'medium'  // 'medium', 'short', 'long', 'full'
};
```

```html
<ejs-datetimepicker [format]="dateFormat"></ejs-datetimepicker>
<ejs-datetimepicker [format]="formatObj"></ejs-datetimepicker>
```

### timeFormat
**Type:** `string`  
**Default:** `null` (based on culture)  
**Description:** Specifies the time format in the time picker popup.

```typescript
timeFormat: string = 'hh:mm a';  // 12-hour with AM/PM
// OR
timeFormat: string = 'HH:mm';    // 24-hour format
```

### min
**Type:** `Date`  
**Default:** `new Date(1900, 0, 1)`  
**Description:** Sets the minimum selectable date.

```typescript
minDate: Date = new Date(2020, 0, 1);  // Jan 1, 2020
```

```html
<ejs-datetimepicker [min]="minDate"></ejs-datetimepicker>
```

### max
**Type:** `Date`  
**Default:** `new Date(2099, 11, 31)`  
**Description:** Sets the maximum selectable date.

```typescript
maxDate: Date = new Date(2030, 11, 31);  // Dec 31, 2030
```

```html
<ejs-datetimepicker [max]="maxDate"></ejs-datetimepicker>
```

### minTime
**Type:** `Date`  
**Default:** `null`  
**Description:** Sets the minimum selectable time.

```typescript
minTime: Date = new Date(2026, 0, 1, 9, 0);   // 9:00 AM
```

```html
<ejs-datetimepicker [minTime]="minTime"></ejs-datetimepicker>
```

### maxTime
**Type:** `Date`  
**Default:** `null`  
**Description:** Sets the maximum selectable time.

```typescript
maxTime: Date = new Date(2026, 0, 1, 17, 0);  // 5:00 PM
```

### step
**Type:** `number`  
**Default:** `30`  
**Description:** Specifies the time interval (in minutes) between values in the time picker.

```typescript
step: number = 15;   // 15-minute intervals
step: number = 30;   // 30-minute intervals
step: number = 60;   // 60-minute intervals
```

### start
**Type:** `CalendarView` (enum)  
**Default:** `'Month'`  
**Description:** Sets the initial calendar view when popup opens.

```typescript
// Values: 'Month' | 'Year' | 'Decade'
start: string = 'Month';  // Shows individual days
start: string = 'Year';   // Shows months
start: string = 'Decade'; // Shows years
```

### depth
**Type:** `CalendarView` (enum)  
**Default:** `'Month'`  
**Description:** Restricts the maximum calendar view level. Must be equal to or less than start.

```typescript
start: string = 'Decade';
depth: string = 'Year';   // Can navigate to year level, but not drill down to months
```

### enabled
**Type:** `boolean`  
**Default:** `true`  
**Description:** Enables or disables the component.

```typescript
isDisabled: boolean = false;

// Disable during processing
isDisabled = true;
// Process...
isDisabled = false;
```

```html
<ejs-datetimepicker [enabled]="!isDisabled"></ejs-datetimepicker>
```

### readonly
**Type:** `boolean`  
**Default:** `false`  
**Description:** Makes the input field readonly. Users can only select from popup.

```typescript
<ejs-datetimepicker [readonly]="true"></ejs-datetimepicker>
```

### allowEdit
**Type:** `boolean`  
**Default:** `true`  
**Description:** Controls whether the input textbox can be edited. When false, users can only select from popup.

```typescript
<ejs-datetimepicker [allowEdit]="false"></ejs-datetimepicker>
```

### placeholder
**Type:** `string`  
**Default:** `null`  
**Description:** Placeholder text displayed in the input field.

```typescript
<ejs-datetimepicker placeholder="Select date and time"></ejs-datetimepicker>
```

### showClearButton
**Type:** `boolean`  
**Default:** `true`  
**Description:** Shows or hides the clear icon in the input.

```typescript
<ejs-datetimepicker [showClearButton]="true"></ejs-datetimepicker>
```

### showTodayButton
**Type:** `boolean`  
**Default:** `true`  
**Description:** Shows or hides the today button in the calendar.

```typescript
<ejs-datetimepicker [showTodayButton]="true"></ejs-datetimepicker>
```

### enableMask
**Type:** `boolean`  
**Default:** `false`  
**Description:** Enables masked input mode with format guidance.

```typescript
<ejs-datetimepicker [enableMask]="true"></ejs-datetimepicker>
```

### maskPlaceholder
**Type:** `MaskPlaceholderModel`  
**Default:** `{ day: 'day', month: 'month', year: 'year', hour: 'hour', minute: 'minute', second: 'second', dayOfTheWeek: 'day of the week' }`  
**Description:** Specifies the mask placeholder text.

```typescript
maskPlaceholder = {
  day: 'dd',
  month: 'mm',
  year: 'yyyy',
  hour: 'hh',
  minute: 'mm',
  second: 'ss'
};

<ejs-datetimepicker [maskPlaceholder]="maskPlaceholder"></ejs-datetimepicker>
```

### strictMode
**Type:** `boolean`  
**Default:** `false`  
**Description:** When true, only valid datetime values within range are accepted.

```typescript
<ejs-datetimepicker [strictMode]="true" [min]="minDate" [max]="maxDate"></ejs-datetimepicker>
```

### enablePersistence
**Type:** `boolean`  
**Default:** `false`  
**Description:** Persists component state across page reloads.

```typescript
<ejs-datetimepicker [enablePersistence]="true"></ejs-datetimepicker>
```

### enableRtl
**Type:** `boolean`  
**Default:** `false`  
**Description:** Enables right-to-left text direction for RTL languages.

```typescript
<ejs-datetimepicker [enableRtl]="true" locale="ar-AE"></ejs-datetimepicker>
```

### locale
**Type:** `string`  
**Default:** `'en-US'`  
**Description:** Sets the locale for date/time formatting and translations.

```typescript
locale: string = 'de-DE';  // German
locale: string = 'fr-FR';  // French
locale: string = 'ja-JP';  // Japanese
locale: string = 'ar-AE';  // Arabic
```

### cssClass
**Type:** `string`  
**Default:** `null`  
**Description:** Applies custom CSS classes to the component.

```typescript
customClass: string = 'my-custom-picker primary-border';

<ejs-datetimepicker [cssClass]="customClass"></ejs-datetimepicker>
```

### width
**Type:** `string | number`  
**Default:** `null`  
**Description:** Sets the component width.

```typescript
width: string = '100%';
// OR
width: number = 400;
// OR
width: string = '50%';
```

### zIndex
**Type:** `number`  
**Default:** `1000`  
**Description:** Specifies the z-index of the popup.

```typescript
zIndex: number = 2000;
```

### firstDayOfWeek
**Type:** `number`  
**Default:** `0` (based on culture)  
**Description:** Sets which day is first in the calendar (0=Sunday, 1=Monday, etc).

```typescript
firstDayOfWeek: number = 0;  // Sunday
firstDayOfWeek: number = 1;  // Monday
```

### dayHeaderFormat
**Type:** `DayHeaderFormats` (enum)  
**Default:** `'Short'`  
**Description:** Specifies the format of day names in calendar header.

```typescript
// 'Short' (Su), 'Narrow' (S), 'Abbreviated' (Sun), 'Wide' (Sunday)
dayHeaderFormat: string = 'Short';
```

### weekNumber
**Type:** `boolean`  
**Default:** `false`  
**Description:** Shows week numbers in the calendar.

```typescript
<ejs-datetimepicker [weekNumber]="true"></ejs-datetimepicker>
```

### weekRule
**Type:** `WeekRule` (enum)  
**Default:** `'FirstDay'`  
**Description:** Defines the rule for the first week of the year.

```typescript
// 'FirstDay', 'FirstFullWeek', 'FirstFourDays' (ISO 8601)
weekRule: string = 'FirstFourDays';
```

### calendarMode
**Type:** `CalendarType` (enum)  
**Default:** `'Gregorian'`  
**Description:** Sets the calendar type.

```typescript
calendarMode: string = 'Gregorian';  // or 'Islamic'
```

### floatLabelType
**Type:** `FloatLabelType` (enum)  
**Default:** `'Never'`  
**Description:** Controls when the placeholder label floats.

```typescript
// 'Never' - Never floats
// 'Always' - Always floats
// 'Auto' - Floats on focus or value (recommended)
floatLabelType: string = 'Auto';
```

### inputFormats
**Type:** `string[] | FormatObject[]`  
**Default:** `null`  
**Description:** Specifies multiple acceptable input formats for parsing.

```typescript
inputFormats: string[] = [
  'dd/MM/yyyy hh:mm a',
  'MM/dd/yyyy hh:mm a',
  'yyyy-MM-dd HH:mm'
];
```

### keyConfigs
**Type:** `{ [key: string]: string }`  
**Default:** `null`  
**Description:** Customizes keyboard shortcuts for navigation.

```typescript
keyConfigs = {
  select: 'space',
  home: 'ctrl+home',
  end: 'ctrl+end',
  moveDown: 'downarrow',
  moveUp: 'uparrow'
};
```

### scrollTo
**Type:** `Date`  
**Default:** `null`  
**Description:** Sets the initial scroll position in the time picker.

```typescript
scrollTo: Date = new Date(2026, 0, 1, 9, 0);  // Scroll to 9 AM
```

### serverTimezoneOffset
**Type:** `number`  
**Default:** `null`  
**Description:** Processes dates based on server timezone offset (in minutes).

```typescript
serverTimezoneOffset: number = -300;  // EST (UTC-5)
```

### htmlAttributes
**Type:** `{ [key: string]: string }`  
**Default:** `{}`  
**Description:** Adds HTML attributes to the input element.

```typescript
htmlAttributes = {
  'aria-label': 'Select appointment date and time',
  'data-test-id': 'datetime-picker',
  'tabindex': '0'
};
```

### fullScreenMode
**Type:** `boolean`  
**Default:** `false`  
**Description:** Displays calendar as full screen on mobile devices.

```typescript
<ejs-datetimepicker [fullScreenMode]="true"></ejs-datetimepicker>
```

### openOnFocus
**Type:** `boolean`  
**Default:** `false`  
**Description:** Opens the popup when the input is focused (by default, opens on clicking the icon).

```typescript
<ejs-datetimepicker [openOnFocus]="true"></ejs-datetimepicker>
```

---

## Methods

### currentView()
**Returns:** `string`  
**Description:** Gets the currently displayed calendar view.

```typescript
export class AppComponent {
  @ViewChild('datetimeRef') datetimeInstance: DateTimePickerComponent;
  
  checkView(): void {
    const view = this.datetimeInstance.currentView();
    console.log('Current view:', view); // 'Month', 'Year', or 'Decade'
  }
}
```

### navigateTo(view: CalendarView, date: Date)
**Parameters:**
- `view`: `CalendarView` - Target view ('Month', 'Year', or 'Decade')
- `date`: `Date` - Date to navigate to

**Returns:** `void`  
**Description:** Navigates to a specific calendar view and date.

```typescript
@ViewChild('datetimeRef') datetimeInstance: DateTimePickerComponent;

navigateToMonth(): void {
  this.datetimeInstance.navigateTo('Month', new Date());
}

navigateToYear2025(): void {
  this.datetimeInstance.navigateTo('Year', new Date(2025, 0, 1));
}
```

### focusIn()
**Returns:** `void`  
**Description:** Sets focus to the component input.

```typescript
this.datetimeInstance.focusIn();
```

### focusOut()
**Returns:** `void`  
**Description:** Removes focus from the component input.

```typescript
this.datetimeInstance.focusOut();
```

### destroy()
**Returns:** `void`  
**Description:** Destroys the component and releases resources.

```typescript
this.datetimeInstance.destroy();
```

### getPersistData()
**Returns:** `string`  
**Description:** Gets component state for persistence.

```typescript
const stateData = this.datetimeInstance.getPersistData();
localStorage.setItem('datetimepickerState', stateData);
```

### onPropertyChanged(newProp: DateTimePickerModel, oldProp: DateTimePickerModel)
**Parameters:**
- `newProp`: `DateTimePickerModel` - Returns the dynamic property value of the component.
- `oldProp`: `DateTimePickerModel` - Returns the previous property value of the component.

**Returns:** `void`  
**Description:** Called internally if any of the property value changed.

```typescript
// This method is called internally by the framework when a property changes.
// It is not typically called directly in application code.
```

### removeDate(dates: Date | Date[])
**Parameters:**
- `dates`: `Date | Date[]` - Specifies the date or dates which need to be removed from the values property of the Calendar.

**Returns:** `void`  
**Description:** This method is used to remove the single or multiple dates from the values property of the Calendar.

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

---

## Events

### change
**Event Args:** `ChangedEventArgs`  
**Description:** Fires when the user selects a new datetime value.

```typescript
export interface ChangedEventArgs {
  value: Date;         // New selected value
  previousValue: Date; // Previous value
}

onDateTimeChange(args: ChangedEventArgs): void {
  console.log('New:', args.value, 'Previous:', args.previousValue);
}
```

```html
<ejs-datetimepicker (change)="onDateTimeChange($event)"></ejs-datetimepicker>
```

### focus
**Event Args:** `Object`  
**Description:** Fires when the component receives focus.

```typescript
onFocus(): void {
  console.log('Component focused');
}
```

### blur
**Event Args:** `Object`  
**Description:** Fires when the component loses focus.

```typescript
onBlur(): void {
  console.log('Component blurred');
}
```

### open
**Event Args:** `Object`  
**Description:** Fires when the calendar and time picker popup opens.

```typescript
onPopupOpen(): void {
  console.log('Popup opened');
}
```

```html
<ejs-datetimepicker (open)="onPopupOpen()"></ejs-datetimepicker>
```

### close
**Event Args:** `Object`  
**Description:** Fires when the popup closes.

```typescript
onPopupClose(): void {
  console.log('Popup closed');
}
```

```html
<ejs-datetimepicker (close)="onPopupClose()"></ejs-datetimepicker>
```

### created
**Event Args:** `Object`  
**Description:** Fires when the component is initialized.

```typescript
onCreated(): void {
  console.log('Component created and ready');
}
```

### destroyed
**Event Args:** `Object`  
**Description:** Fires when the component is destroyed.

```typescript
onDestroyed(): void {
  console.log('Component destroyed');
}
```

### navigated
**Event Args:** `NavigatedEventArgs`  
**Description:** Fires when calendar navigates to a different view.

```typescript
export interface NavigatedEventArgs {
  view: string;  // 'Month', 'Year', or 'Decade'
  date: Date;    // Navigated date
}

onNavigated(args: NavigatedEventArgs): void {
  console.log(`Navigated to ${args.view} on ${args.date}`);
}
```

### renderDayCell
**Event Args:** `RenderDayCellEventArgs`  
**Description:** Fires for each day cell in the calendar, allowing customization.

```typescript
export interface RenderDayCellEventArgs {
  date: Date;           // Cell date
  element: HTMLElement; // Cell DOM element
  isDisabled: boolean;  // Set to true to disable
  isOtherMonth: boolean;// Date from other month
  isSelected: boolean;  // Is date selected
}

onRenderDayCell(args: RenderDayCellEventArgs): void {
  // Disable weekends
  if ((args.date as Date).getDay() === 0 || (args.date as Date).getDay() === 6) {
    args.isDisabled = true;
  }
}
```

### cleared
**Event Args:** `ClearedEventArgs`  
**Description:** Fires when the clear button is clicked.

```typescript
export interface ClearedEventArgs {
  value: Date; // The cleared value
}

onCleared(args: ClearedEventArgs): void {
  console.log('Value cleared:', args.value);
}
```

---

## Interfaces & Types

### CalendarType
```typescript
type CalendarType = 'Gregorian' | 'Islamic';
```

### CalendarView
```typescript
type CalendarView = 'Month' | 'Year' | 'Decade';
```

### DayHeaderFormats
```typescript
type DayHeaderFormats = 'Short' | 'Narrow' | 'Abbreviated' | 'Wide';
```

### FloatLabelType
```typescript
type FloatLabelType = 'Never' | 'Always' | 'Auto';
```

### WeekRule
```typescript
type WeekRule = 'FirstDay' | 'FirstFullWeek' | 'FirstFourDays';
```

### FormatObject
```typescript
interface FormatObject {
  skeleton: 'short' | 'medium' | 'long' | 'full';
}
```

### MaskPlaceholderModel
```typescript
interface MaskPlaceholderModel {
  day?: string;
  month?: string;
  year?: string;
  hour?: string;
  minute?: string;
  second?: string;
  dayOfTheWeek?: string;
}
```

---

## Key Configurations

### Default Key Configurations

| Action | Default Key |
|--------|--------------|
| Select | Enter |
| Alt Up Arrow | Alt+↑ |
| Alt Down Arrow | Alt+↓ |
| Escape | Escape |
| Control Up | Ctrl+↑ |
| Control Down | Ctrl+↓ |
| Move Down | ↓ |
| Move Up | ↑ |
| Move Left | ← |
| Move Right | → |
| Home | Home |
| End | End |
| Page Up | PageUp |
| Page Down | PageDown |
| Shift Page Up | Shift+PageUp |
| Shift Page Down | Shift+PageDown |
| Control Home | Ctrl+Home |
| Control End | Ctrl+End |
| Alt Right Arrow | Alt+→ |
| Alt Left Arrow | Alt+← |
| Space | Space |

### Customizing Key Configuration

```typescript
keyConfigs = {
  select: 'space',           // Use Space to select
  home: 'ctrl+home',         // Use Ctrl+Home for home
  end: 'ctrl+end',           // Use Ctrl+End for end
  moveDown: 'downarrow',     // Navigate down with arrow
  moveUp: 'uparrow',         // Navigate up with arrow
  moveLeft: 'leftarrow',     // Navigate left with arrow
  moveRight: 'rightarrow'    // Navigate right with arrow
};
```

---

## Common Property Combinations

### Appointment Booking Configuration
```typescript
export class AppointmentPickerComponent {
  appointmentConfig = {
    format: 'dd/MM/yyyy hh:mm a',
    min: new Date(),
    max: new Date(Date.now() + 30*24*60*60*1000), // 30 days
    minTime: new Date(2026, 0, 1, 9, 0),   // 9 AM
    maxTime: new Date(2026, 0, 1, 17, 0),  // 5 PM
    step: 30,
    showTodayButton: true,
    showClearButton: true,
    strictMode: true
  };
}
```

### Globalized Configuration
```typescript
export class GlobalizedPickerComponent {
  globalConfig = {
    locale: 'de-DE',
    enableRtl: false,
    firstDayOfWeek: 1,
    dayHeaderFormat: 'Abbreviated',
    weekNumber: true,
    format: 'dd.MM.yyyy HH:mm',
    timeFormat: 'HH:mm'
  };
}
```

### Accessible Configuration
```typescript
export class AccessiblePickerComponent {
  accessibleConfig = {
    floatLabelType: 'Auto',
    placeholder: 'Select date and time',
    keyConfigs: {
      select: 'enter',
      altUpArrow: 'alt+uparrow',
      altDownArrow: 'alt+downarrow'
    },
    htmlAttributes: {
      'aria-label': 'Select date and time',
      'role': 'combobox'
    }
  };
}
```
