# Date Selection Patterns

## Table of Contents
- [Single Date Selection](#single-date-selection)
- [Multiple Date Selection](#multiple-date-selection)
- [Date Range Selection](#date-range-selection)
- [Min/Max Date Constraints](#minmax-date-constraints)
- [Disabling Specific Dates](#disabling-specific-dates)
- [Reading Selection State](#reading-selection-state)

---

## Single Date Selection

The default Calendar behavior. User clicks a date, and it becomes selected.

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

let selectedDate: Date = new Date();

const calendar = new Calendar({
  value: selectedDate,
  change: (args: any) => {
    console.log('Selected date:', args.value);
    selectedDate = args.value;
    document.getElementById('result')!.innerText = `You picked: ${selectedDate.toDateString()}`;
  }
});

calendar.appendTo('#calendar');
```

HTML:
```html
<div id="calendar"></div>
<p id="result">You picked: (nothing yet)</p>
```

**Key point:** The `value` property holds a single `Date` object. Listen to the `change` event to respond to user selection.

---

## Multiple Date Selection

Use the `isMultiSelection` and `values` properties to enable native multiple date selection. The `change` event returns `args.values` (array) when multi-selection is active.

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

let selectedDates: Date[] = [
  new Date(2026, 10, 5),
  new Date(2026, 10, 12),
];

const calendar = new Calendar({
  isMultiSelection: true,
  values: selectedDates,
  change: (args: any) => {
    // args.values contains the updated Date[] array
    if (args.values) {
      selectedDates = args.values;
      updateDateList(selectedDates);
    }
  }
});

calendar.appendTo('#calendar');

function updateDateList(dates: Date[]) {
  const list = document.getElementById('date-list')!;
  list.innerHTML = dates.map((d, i) => `<li key="${i}">${d.toDateString()}</li>`).join('');
}
```

HTML:
```html
<div id="calendar"></div>
<p>Selected dates:</p>
<ul id="date-list"></ul>
```

**Key points:**
- Set `isMultiSelection: true` to enable the built-in multi-date selection mode.
- Use the `values` property (not `value`) to provide the initial selection array.
- In the `change` handler, read `args.values` to get the full updated array.
- To add/remove dates imperatively, use the `addDate()` and `removeDate()` methods.

---

## Date Range Selection

For selecting a date range (start–end), use conditional logic to track both dates.

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

let startDate: Date | null = null;
let endDate: Date | null = null;

const calendar = new Calendar({
  value: startDate,
  change: (args: any) => {
    if (!startDate || (startDate && endDate)) {
      // First click or reset: set start date
      startDate = args.value;
      endDate = null;
    } else {
      // Second click: set end date
      const start = startDate!;
      const end = args.value;
      if (end < start) {
        startDate = end;
        endDate = start;
      } else {
        startDate = start;
        endDate = end;
      }
    }
    updateRangeDisplay();
  }
});

calendar.appendTo('#calendar');

function updateRangeDisplay() {
  document.getElementById('start-date')!.innerText = startDate ? startDate.toDateString() : 'Not selected';
  document.getElementById('end-date')!.innerText = endDate ? endDate.toDateString() : 'Not selected';
}

function resetRange() {
  startDate = null;
  endDate = null;
  updateRangeDisplay();
}
```

HTML:
```html
<div id="calendar"></div>
<p>Start: <span id="start-date">Not selected</span></p>
<p>End: <span id="end-date">Not selected</span></p>
<button onclick="resetRange()">Reset</button>
```

For a more polished UX with visual range highlighting, use the `renderDayCell` hook (see events-and-methods.md).

---

## Min/Max Date Constraints

Restrict selectable dates to a given range.

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const minDate = new Date(2026, 0, 1);   // Jan 1, 2026
const maxDate = new Date(2026, 11, 31); // Dec 31, 2026
let value = new Date(2026, 6, 15);

const calendar = new Calendar({
  value: value,
  min: minDate,
  max: maxDate,
  change: (args: any) => {
    value = args.value;
    document.getElementById('result')!.innerText = `Selected: ${value.toDateString()}`;
  }
});

calendar.appendTo('#calendar');
```

HTML:
```html
<div id="calendar"></div>
<p id="result">Selected: (date will appear here)</p>
```

**Result:** Dates outside the min/max range appear disabled (grayed out), and users cannot click them.

---

## Disabling Specific Dates

Use `renderDayCell` to disable individual dates (e.g., weekends, holidays).

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

let value = new Date();

// Disable weekends and specific holidays
const holidayDates = [
  new Date(2026, 11, 25), // Christmas
  new Date(2026, 0, 1),   // New Year
];

const renderDayCell = (args: any) => {
  const date = args.date;
  const dayOfWeek = date.getDay();

  // Disable weekends (0 = Sunday, 6 = Saturday)
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    args.isDisabled = true;
  }

  // Disable holidays
  if (holidayDates.some(h => h.toDateString() === date.toDateString())) {
    args.isDisabled = true;
  }
};

const calendar = new Calendar({
  value: value,
  change: (args: any) => {
    value = args.value;
  },
  renderDayCell: renderDayCell
});

calendar.appendTo('#calendar');
```

HTML:
```html
<div id="calendar"></div>
<p>Weekends and holidays disabled</p>
```

---

## Reading Selection State

### Direct from the component

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  value: new Date()
});

calendar.appendTo('#calendar');

function getSelected() {
  console.log('Current value:', calendar.value);
  document.getElementById('result')!.innerText = `Selected: ${calendar.value?.toDateString()}`;
}

// Attach to button click
document.getElementById('getButton')!.addEventListener('click', getSelected);
```

HTML:
```html
<div id="calendar"></div>
<button id="getButton">Get Selected Date</button>
<p id="result"></p>
```

### Via external state (recommended)

Always keep external state in sync with the component via the `change` event, as shown in the single-date example above. This is the idiomatic pattern for EJ2 components.

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

let currentSelection: Date | null = null;

const calendar = new Calendar({
  change: (args: any) => {
    currentSelection = args.value;
    console.log('State updated:', currentSelection);
  }
});

calendar.appendTo('#calendar');

// Later, access the state
function processDates() {
  if (currentSelection) {
    console.log('Processing:', currentSelection);
  }
}
```
