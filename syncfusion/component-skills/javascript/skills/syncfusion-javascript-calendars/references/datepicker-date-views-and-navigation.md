# DatePicker Date Views and Navigation

## Calendar Views

DatePicker displays calendar in three views:

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

// Month view (default)
const picker = new DatePicker({
  value: new Date(),
  start: 'Month'
});

picker.appendTo('#datepicker');
```

## View Depth Control

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

// Limit to month view only
const monthOnly = new DatePicker({
  start: 'Month',
  depth: 'Month'  // Cannot navigate to year/decade
});

monthOnly.appendTo('#monthonly');

// Allow month and year views
const monthYear = new DatePicker({
  start: 'Month',
  depth: 'Year'
});

monthYear.appendTo('#monthyear');

// Start in year view
const yearStart = new DatePicker({
  start: 'Year',
  depth: 'Decade'
});

yearStart.appendTo('#yearstart');
```

## Navigation Methods

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const picker = new DatePicker({
  value: new Date()
});

picker.appendTo('#datepicker');

function goToDate(year: number, month: number, day: number) {
  picker.value = new Date(year, month - 1, day);
}

function goToMonth(month: string) {
  const monthIndex = new Date(`${month} 1, 2026`).getMonth();
  picker.value = new Date(2026, monthIndex, 1);
}

// Usage
// goToDate(2026, 5, 15);  // May 15, 2026
// goToMonth('December');  // December 2026
```

## Programmatic Navigation

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const picker = new DatePicker({
  value: new Date()
});

picker.appendTo('#datepicker');

function navigateToNextMonth() {
  const currentValue = picker.value;
  const nextMonth = new Date(currentValue!.getFullYear(), currentValue!.getMonth() + 1, 1);
  picker.value = nextMonth;
}

function navigateToPreviousMonth() {
  const currentValue = picker.value;
  const prevMonth = new Date(currentValue!.getFullYear(), currentValue!.getMonth() - 1, 1);
  picker.value = prevMonth;
}

function navigateToToday() {
  picker.value = new Date();
}
```

HTML:
```html
<input id="datepicker" type="text" />
<button onclick="navigateToPreviousMonth()">← Previous</button>
<button onclick="navigateToToday()">Today</button>
<button onclick="navigateToNextMonth()">Next →</button>
```
