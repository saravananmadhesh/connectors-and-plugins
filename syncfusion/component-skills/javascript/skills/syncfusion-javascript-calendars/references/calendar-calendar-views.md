# Calendar Views and Navigation

## Table of Contents
- [View Types](#view-types)
- [Navigating Between Views](#navigating-between-views)
- [Controlling Initial View](#controlling-initial-view)
- [Limiting View Depth](#limiting-view-depth)
- [Month Year and Decade Selection](#month-year-and-decade-selection)
- [Programmatic Navigation](#programmatic-navigation)

---

## View Types

The Calendar component supports three hierarchical views:

1. **Month** (default) — Shows a single month calendar grid with dates.
2. **Year** — Shows all 12 months of a selected year.
3. **Decade** — Shows a 10-year range (e.g., 2020–2029).

Navigation flows: Decade → Year → Month → Date Selection

---

## Navigating Between Views

### Automatic Navigation via Clicking

- **Month view**: Click the month/year header to go up to Year view
- **Year view**: Click a month to return to Month view for that month
- **Decade view**: Click a year to navigate to Year view for that year

### Programmatic Navigation

Use the `navigateTo()` method to navigate to a specific view programmatically.

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  value: new Date()
});
calendar.appendTo('#calendar');

// Navigate to Month view (July 2026)
function goToMonth() {
  calendar.navigateTo('Month', new Date(2026, 6, 15));
}

// Navigate to Year view (2025)
function goToYear() {
  calendar.navigateTo('Year', new Date(2025, 0, 1));
}

// Navigate to Decade view (2020-2029)
function goToDecade() {
  calendar.navigateTo('Decade', new Date(2025, 0, 1));
}
```

HTML:
```html
<div id="calendar"></div>
<button onclick="goToMonth()">Go to Month</button>
<button onclick="goToYear()">Go to Year</button>
<button onclick="goToDecade()">Go to Decade</button>
```

---

## Controlling Initial View

Use the `start` property to set which view loads initially.

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

// Load in Month view (default)
const calMonth = new Calendar({
  start: 'Month',
  value: new Date()
});
calMonth.appendTo('#calMonth');

// Load in Year view
const calYear = new Calendar({
  start: 'Year',
  value: new Date()
});
calYear.appendTo('#calYear');

// Load in Decade view
const calDecade = new Calendar({
  start: 'Decade',
  value: new Date()
});
calDecade.appendTo('#calDecade');
```

---

## Limiting View Depth

The `depth` property restricts navigation to a maximum view level.

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

// Can navigate Month → Year (cannot go to Decade)
const calendar = new Calendar({
  start: 'Month',
  depth: 'Year',  // 'Year' | 'Month' | 'Decade'
  value: new Date()
});
calendar.appendTo('#calendar');
```

Valid `depth` values:
- `'Month'` — Only Month view available; cannot click header to go higher
- `'Year'` — Can navigate up to Year view; clicking year header doesn't work
- `'Decade'` — Can navigate to Decade view (allows full navigation)

---

## Month Year and Decade Selection

### Getting Current View

Use the `currentView()` method to check which view is currently displayed.

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  start: 'Month'
});
calendar.appendTo('#calendar');

function checkView() {
  const view = calendar.currentView();
  console.log('Current view:', view); // 'Month' | 'Year' | 'Decade'
  document.getElementById('viewInfo')!.innerText = `Viewing: ${view}`;
}

// Attach to button
document.getElementById('checkBtn')!.addEventListener('click', checkView);
```

### Detecting View Changes

Listen to the `navigated` event (fires when view changes).

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  value: new Date(),
  navigated: (args: any) => {
    console.log('View changed to:', args.view); // 'Month' | 'Year' | 'Decade'
    console.log('Focused date:', args.date);
  }
});
calendar.appendTo('#calendar');
```

---

## Programmatic Navigation

Navigate programmatically and respond to navigation events.

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  start: 'Decade',
  navigated: (args: any) => {
    updateBreadcrumb(args.view);
  }
});
calendar.appendTo('#calendar');

function updateBreadcrumb(view: string) {
  const breadcrumb = document.getElementById('breadcrumb')!;
  switch (view) {
    case 'Decade':
      breadcrumb.innerText = 'Decade Selection';
      break;
    case 'Year':
      breadcrumb.innerText = 'Year Selection';
      break;
    case 'Month':
      breadcrumb.innerText = 'Date Selection';
      break;
  }
}

// Navigate down hierarchy
function selectYear(year: number) {
  calendar.navigateTo('Year', new Date(year, 0, 1));
}

function selectMonth(month: number) {
  calendar.navigateTo('Month', new Date(new Date().getFullYear(), month, 1));
}
```

HTML:
```html
<div id="breadcrumb"></div>
<div id="calendar"></div>
```
