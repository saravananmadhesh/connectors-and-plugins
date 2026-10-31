# Calendar Events and Methods

## Table of Contents
- [Events Overview](#events-overview)
- [Change Event](#change-event)
- [Navigation Events](#navigation-events)
- [Lifecycle Events](#lifecycle-events)
- [Methods Reference](#methods-reference)
- [Event Handler Patterns](#event-handler-patterns)

---

## Events Overview

The Calendar component emits the following events:

| Event | Fires When | Handler Returns |
|-------|-----------|-----------------|
| `change` | User selects a date | `{ previousValue, value }` |
| `navigated` | View changes or focused date changes | `{ view, date }` |
| `renderDayCell` | Each day cell renders | `{ date, isDisabled, element }` |
| `created` | Component initialization completes | `{}` |
| `destroyed` | Component is destroyed | `{}` |

---

## Change Event

Fires when the user selects a date (or dates if multi-selection is enabled).

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

let selectedDate: Date;

const calendar = new Calendar({
  value: new Date(),
  change: (args: any) => {
    console.log('Previous value:', args.previousValue);
    console.log('New value:', args.value);
    selectedDate = args.value;
    
    // Update UI
    document.getElementById('selected')!.innerText = selectedDate.toDateString();
  }
});

calendar.appendTo('#calendar');
```

### Multi-Select Change Event

When `isMultiSelection` is enabled, `args.values` contains the array of selected dates:

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  isMultiSelection: true,
  values: [new Date(2026, 5, 10), new Date(2026, 5, 15)],
  change: (args: any) => {
    console.log('Selected dates:', args.values); // Date[]
    const dateStrings = args.values.map((d: Date) => d.toDateString()).join(', ');
    document.getElementById('list')!.innerText = dateStrings;
  }
});

calendar.appendTo('#calendar');
```

---

## Navigation Events

### Navigated Event

Fires when the user navigates between views (Month ↔ Year ↔ Decade) or when focused date changes.

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  value: new Date(),
  navigated: (args: any) => {
    console.log('Current view:', args.view);     // 'Month' | 'Year' | 'Decade'
    console.log('Focused date:', args.date);     // Date object for that view
  }
});

calendar.appendTo('#calendar');
```

### Using Navigated to Track View State

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

let currentView = 'Month';

const calendar = new Calendar({
  start: 'Month',
  navigated: (args: any) => {
    currentView = args.view;
    updateViewIndicator();
  }
});

calendar.appendTo('#calendar');

function updateViewIndicator() {
  const indicator = document.getElementById('viewIndicator')!;
  indicator.innerText = `Current View: ${currentView}`;
  indicator.className = `view-${currentView.toLowerCase()}`;
}
```

---

## Lifecycle Events

### Created Event

Fires after the component is fully initialized.

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  value: new Date(),
  created: () => {
    console.log('Calendar created and ready');
    document.getElementById('status')!.innerText = 'Calendar loaded';
  }
});

calendar.appendTo('#calendar');
```

### Destroyed Event

Fires when the component is destroyed.

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  value: new Date(),
  destroyed: () => {
    console.log('Calendar destroyed');
    document.getElementById('status')!.innerText = 'Calendar removed';
  }
});

calendar.appendTo('#calendar');

function removeCalendar() {
  calendar.destroy();
}
```

---

## Methods Reference

### addDate(date: Date)

Add a date to the multi-selection list (only works if `isMultiSelection` is true).

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  isMultiSelection: true,
  values: [new Date(2026, 5, 10)]
});

calendar.appendTo('#calendar');

function addMoreDate() {
  calendar.addDate(new Date(2026, 5, 20));
  console.log('Added date. Current values:', calendar.values);
}

// <button onclick="addMoreDate()">Add Date</button>
```

### removeDate(date: Date)

Remove a specific date from the multi-selection list.

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  isMultiSelection: true,
  values: [
    new Date(2026, 5, 10),
    new Date(2026, 5, 15),
    new Date(2026, 5, 20)
  ]
});

calendar.appendTo('#calendar');

function removeSpecificDate() {
  calendar.removeDate(new Date(2026, 5, 15));
  console.log('Removed date. Remaining:', calendar.values);
}
```

### navigateTo(view: CalendarView, date: Date)

Navigate to a specific view and focused date.

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  start: 'Month'
});

calendar.appendTo('#calendar');

function goToDecember2027() {
  calendar.navigateTo('Month', new Date(2027, 11, 1));
}

function goToYear2026() {
  calendar.navigateTo('Year', new Date(2026, 0, 1));
}
```

### currentView(): string

Get the currently displayed view.

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  start: 'Month'
});

calendar.appendTo('#calendar');

function checkCurrentView() {
  const view = calendar.currentView();
  console.log('Viewing:', view); // 'Month', 'Year', or 'Decade'
}
```

### destroy()

Destroy the component and clean up resources.

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  value: new Date()
});

calendar.appendTo('#calendar');

function cleanup() {
  calendar.destroy();
  console.log('Calendar component destroyed');
}
```

---

## Event Handler Patterns

### Disabling Past Dates (renderDayCell)

Combine `renderDayCell` event with date logic to disable specific cells.

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const today = new Date();

const calendar = new Calendar({
  value: today,
  renderDayCell: (args: any) => {
    // Disable all dates before today
    if (args.date < today) {
      args.isDisabled = true;
    }
  }
});

calendar.appendTo('#calendar');
```

### Custom Cell Styling

Use `renderDayCell` to add custom CSS classes to specific dates.

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const specialDates = [
  new Date(2026, 5, 10),  // Birthday
  new Date(2026, 11, 25) // Christmas
];

const calendar = new Calendar({
  value: new Date(),
  renderDayCell: (args: any) => {
    if (specialDates.some(d => d.toDateString() === args.date.toDateString())) {
      args.element.classList.add('special-day');
    }
  }
});

calendar.appendTo('#calendar');
```

CSS:
```css
.special-day {
  background-color: #ffeb3b !important;
  font-weight: bold;
  border-radius: 50%;
}
```

### Limiting Selection Range

Use `renderDayCell` to visually mark a range while allowing only valid selection in `change` event.

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const minDate = new Date(2026, 5, 1);
const maxDate = new Date(2026, 5, 30);

const calendar = new Calendar({
  min: minDate,
  max: maxDate,
  renderDayCell: (args: any) => {
    if (args.date < minDate || args.date > maxDate) {
      args.isDisabled = true;
      args.element.classList.add('out-of-range');
    }
  }
});

calendar.appendTo('#calendar');
```

---

## Summary Table: Events and Use Cases

| Event | Use Case |
|-------|----------|
| `change` | Track selected date(s); update external state |
| `navigated` | Update breadcrumbs; track current view |
| `renderDayCell` | Disable dates; apply custom styling; highlight ranges |
| `created` | Initialize dependent components; fetch data |
| `destroyed` | Clean up external resources; unsubscribe from services |
