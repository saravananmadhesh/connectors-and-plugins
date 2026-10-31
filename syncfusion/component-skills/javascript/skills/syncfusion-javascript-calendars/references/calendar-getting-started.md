# Getting Started (TypeScript)

## Table of Contents
- [Installation](#installation)
- [Quick App Example](#quick-app-example)
- [CSS / Themes](#css--themes)
- [Using methods](#using-methods)
- [Events and handlers](#events-and-handlers)
- [Troubleshooting](#troubleshooting)

## Installation

Install the Calendar package and base utilities:

```bash
npm install @syncfusion/ej2-calendars @syncfusion/ej2-base
```

Add the theme CSS (import once in your main CSS file or HTML):

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
  <link href="node_modules/@syncfusion/ej2-base/styles/material3.css" rel="stylesheet" />
  <link href="node_modules/@syncfusion/ej2-calendars/styles/material3.css" rel="stylesheet" />
</head>
<body>
  <div id="calendar"></div>
  <script src="app.ts"></script>
</body>
</html>
```

Or in TypeScript/CSS:

```css
/* styles.css */
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/calendar/index.css";
```

## Quick App Example

```typescript
// app.ts
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  value: new Date(),
  change: (args: any) => {
    console.log('Selected date:', args.value);
  }
});

calendar.appendTo('#calendar');
```

HTML:
```html
<div id="calendar"></div>
```

### Direct Value Access

- Read current value: `calendar.value`
- Update value programmatically: `calendar.value = new Date(2026, 6, 1);`
- Listen to changes: Use the `change` event callback.

## CSS / Themes

- Recommended to import one theme only (material3, bootstrap5, fluent, tailwind, etc.).
- Available themes: material3, bootstrap5, bootstrap4, fluent, fabric, highcontrast, tailwind.
- Theme CSS must be imported before component initialization.

## Using methods

You can call methods directly on the component instance to perform operations (navigate, focus, etc.).

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  value: new Date()
});

calendar.appendTo('#calendar');

// Navigate to a specific view and date
calendar.navigateTo('Month', new Date(2026, 6, 1));

// Get current calendar view
const currentView = calendar.currentView();

// Add multiple dates for selection
calendar.addDate(new Date(2026, 6, 5));
calendar.addDate(new Date(2026, 7, 10));
```

Available methods: `navigateTo()`, `currentView()`, `addDate()`, `removeDate()`, `destroy()`.

## Events and handlers

- `change` — user changed the active/selected date. Receives an args object with `value`.
- `created` — fired after the component is initialized.
- `destroyed` — fired when the component is removed.
- `renderDayCell` — hook to customize day cells before rendering.
- `navigated` — fired when view changes.

Examples:

```typescript
const calendar = new Calendar({
  change: (args: any) => {
    console.log('Selected:', args.value);
  },
  created: () => {
    console.log('Calendar is ready');
  },
  navigated: (args: any) => {
    console.log('Navigated to view:', args.view);
  },
  renderDayCell: (args: any) => {
    // Customize day cell rendering
    if (args.date.getDay() === 0 || args.date.getDay() === 6) {
      args.isDisabled = true; // Disable weekends
    }
  }
});

calendar.appendTo('#calendar');
```

## Troubleshooting

- **Styles not applied**: Check import paths. CSS must be imported before component initialization. Verify the CSS file is in `node_modules/@syncfusion/ej2-calendars/styles/`.
- **Events not firing**: Ensure event handlers are defined before calling `appendTo()`.
- **Cannot find module**: Run `npm install @syncfusion/ej2-calendars @syncfusion/ej2-base` and verify dependencies in `package.json`.
- **Value not updating**: Update via `calendar.value = newDate;` or listen to the `change` event.

## Next steps

- Read `references/calendar-api-reference.md` for a condensed list of properties, events, and methods.
- For date pickers and more complex date-range UX, consider `DateRangePicker` or `DatePicker` components in the same library.
