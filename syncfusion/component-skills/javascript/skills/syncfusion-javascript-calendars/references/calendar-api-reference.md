# API Reference

Source: Syncfusion EJ2 Calendar API documentation — https://ej2.syncfusion.com/documentation/api/calendar/

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Enums](#enums)
- [Examples](#examples)

---

## Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `calendarMode` | `CalendarType` | `'Gregorian'` | Gets or sets the Calendar's type — `'Gregorian'` or `'Islamic'`. |
| `cssClass` | `string` | `null` | Root CSS class for the Calendar, used to override styles. |
| `dayHeaderFormat` | `DayHeaderFormats` | `'Short'` | Format of day names in the header. Options: `'Short'`, `'Narrow'`, `'Abbreviated'`, `'Wide'`. |
| `depth` | `CalendarView` | `'Month'` | Maximum navigation level. Must be ≤ `start`. Options: `'Month'`, `'Year'`, `'Decade'`. |
| `enablePersistence` | `boolean` | `false` | Persists the `value` state across page reloads. |
| `enableRtl` | `boolean` | `false` | Renders the component in right-to-left direction. |
| `enabled` | `boolean` | `true` | Enables or disables the component. |
| `firstDayOfWeek` | `number` | `0` | First day of the week (0 = Sunday). Defaults to current culture. |
| `isMultiSelection` | `boolean` | `false` | Enables multiple date selection. Use with the `values` property. |
| `keyConfigs` | `{ [key: string]: string }` | `null` | Customizes keyboard shortcut mappings. |
| `locale` | `string` | `''` | Overrides global culture/localization (e.g., `'en-US'`, `'fr-FR'`). |
| `max` | `Date` | `new Date(2099, 11, 31)` | Maximum selectable date. |
| `min` | `Date` | `new Date(1900, 00, 01)` | Minimum selectable date. |
| `serverTimezoneOffset` | `number` | `null` | Processes the initial date using a server time zone offset. |
| `showTodayButton` | `boolean` | `true` | Shows or hides the Today button. |
| `start` | `CalendarView` | `'Month'` | Initial view when the Calendar opens. Options: `'Month'`, `'Year'`, `'Decade'`. |
| `value` | `Date` | `null` | The selected date. |
| `values` | `Date[]` | `null` | Multiple selected dates. Used with `isMultiSelection: true`. |
| `weekNumber` | `boolean` | `false` | Shows the ISO week number of the year. |
| `weekRule` | `WeekRule` | `'FirstDay'` | Rule for defining the first week of the year. |

> **Tip:** For controlled usage, read the `value` property and listen to the `change` event to update values.

### `keyConfigs` Example

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const keyConfigs = {
  select: 'space',
  home: 'ctrl+home',
  end: 'ctrl+end',
};

const calendar = new Calendar({
  keyConfigs: keyConfigs
});

calendar.appendTo('#calendar');
```

### `isMultiSelection` + `values` Example

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const values = [
  new Date('11/20/2026'),
  new Date('11/28/2026'),
  new Date('11/02/2026')
];

const calendar = new Calendar({
  isMultiSelection: true,
  values: values
});

calendar.appendTo('#calendar');
```

---

## Methods

Call these methods directly on the component instance.

| Method | Signature | Returns | Description |
|---|---|---|---|
| `addDate` | `addDate(dates: Date \| Date[]): void` | `void` | Adds one or multiple dates to the `values` property. |
| `currentView` | `currentView(): string` | `string` | Returns the current view — `'Month'`, `'Year'`, or `'Decade'`. |
| `destroy` | `destroy(): void` | `void` | Destroys the widget and cleans up resources. |
| `getPersistData` | `getPersistData(): string` | `string` | Returns the properties maintained on browser refresh. |
| `navigateTo` | `navigateTo(view: CalendarView, date: Date, isCustomDate?: boolean): void` | `void` | Navigates to the specified view and focused date. |
| `removeDate` | `removeDate(dates: Date \| Date[]): void` | `void` | Removes one or multiple dates from the `values` property. |

### `navigateTo` Example

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  value: new Date()
});

calendar.appendTo('#calendar');

// Navigate to July 2026, Month view
calendar.navigateTo('Month', new Date(2026, 6, 1));

// Get current view
const currentView = calendar.currentView(); // Returns 'Month'

// Navigate to Year view for date selection
calendar.navigateTo('Year', new Date(2026, 0, 1));
```

### Multiple Date Selection Example

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  isMultiSelection: true,
  values: [new Date(2026, 11, 20)]
});

calendar.appendTo('#calendar');

// Add more dates
calendar.addDate(new Date(2026, 11, 25));
calendar.addDate(new Date(2026, 11, 30));

// Remove a date
calendar.removeDate(new Date(2026, 11, 20));

// Get all values
console.log(calendar.values); // Array of selected dates
```

---

## Events

| Event | Args Type | Description |
|---|---|---|
| `change` | `ChangedEventArgs` | Fires when the selected date(s) change. Returns `value` (selected date) or `values` (array of dates for multi-selection). |
| `created` | `Object` | Fires when the component is initialized and ready. |
| `destroyed` | `Object` | Fires when the component is destroyed. |
| `renderDayCell` | `RenderDayCellEventArgs` | Fires for each day cell during rendering. Use to customize day appearance or disable specific dates. |
| `navigated` | `NavigatedEventArgs` | Fires when the calendar view changes (Month → Year, etc.). |

### Event Handler Examples

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  change: (args: any) => {
    console.log('Selected date:', args.value);
  },
  created: () => {
    console.log('Calendar is ready');
  },
  destroyed: () => {
    console.log('Calendar destroyed');
  },
  navigated: (args: any) => {
    console.log('Navigated to view:', args.view);
  },
  renderDayCell: (args: any) => {
    // Disable weekends
    if (args.date.getDay() === 0 || args.date.getDay() === 6) {
      args.isDisabled = true;
    }
    // Highlight special dates
    if (args.date.getDate() === 10) {
      args.cellTemplate = '<span style="color: red;">10</span>';
    }
  }
});

calendar.appendTo('#calendar');
```

---

## Enums

### CalendarView
```typescript
type CalendarView = 'Month' | 'Year' | 'Decade';
```

### CalendarType
```typescript
type CalendarType = 'Gregorian' | 'Islamic';
```

### DayHeaderFormats
```typescript
type DayHeaderFormats = 'Short' | 'Narrow' | 'Abbreviated' | 'Wide';
```

### WeekRule
```typescript
type WeekRule = 'FirstDay' | 'FirstFullWeek' | 'FirstFourDayWeek';
```

---

## Examples

### Basic Calendar with Date Display

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  value: new Date(),
  change: (args: any) => {
    document.getElementById('result')!.innerText = `Selected: ${args.value.toDateString()}`;
  }
});

calendar.appendTo('#calendar');
```

### Calendar with Min/Max Range

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  min: new Date(2026, 0, 1),
  max: new Date(2026, 11, 31),
  value: new Date(2026, 6, 1),
  renderDayCell: (args: any) => {
    if (args.date < new Date(2026, 0, 1) || args.date > new Date(2026, 11, 31)) {
      args.isDisabled = true;
    }
  }
});

calendar.appendTo('#calendar');
```

### Calendar with Custom CSS

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  cssClass: 'my-custom-calendar',
  value: new Date()
});

calendar.appendTo('#calendar');
```

CSS:
```css
.my-custom-calendar .e-day {
  color: #0066cc;
}

.my-custom-calendar .e-today {
  background-color: #ffffcc;
}

.my-custom-calendar .e-selected {
  background-color: #0066cc;
  color: white;
}
```
