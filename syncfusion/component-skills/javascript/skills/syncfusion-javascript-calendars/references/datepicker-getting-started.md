# DatePicker Getting Started

## Overview

The DatePicker component is a date input with a dropdown calendar. Users can type a date directly into the input field or select from a calendar picker. It supports date validation, formatting, masking, and keyboard navigation.

## Table of Contents
- [Installation and Setup](#installation-and-setup)
- [Quick Example](#quick-example)
- [Basic Properties](#basic-properties)
- [Date Formatting](#date-formatting)
- [Input Masking](#input-masking)
- [Events and Validation](#events-and-validation)
- [Accessibility](#accessibility)

---

## Installation and Setup

### Install the Package

```bash
npm install @syncfusion/ej2-calendars
```

### Import Required Modules

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';
```

### Include Theme CSS

```html
<!-- Material Theme -->
<link rel="stylesheet" href="node_modules/@syncfusion/ej2-fluent2-theme/styles/datepicker/index.css" />
```

---

## Quick Example

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const datepicker = new DatePicker({
  value: new Date(),
  format: 'dd/MM/yyyy'
});

datepicker.appendTo('#datepicker');
```

HTML:
```html
<input id="datepicker" type="text" />
```

Result: A text input that opens a calendar dropdown when clicked, with dates formatted as dd/MM/yyyy.

---

## Basic Properties

### Creating a Simple DatePicker

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const picker = new DatePicker({
  value: new Date(2026, 5, 15),           // Initial date
  format: 'yyyy-MM-dd',                   // Display format
  placeholder: 'Select a date',           // Hint text
  min: new Date(2026, 0, 1),             // Minimum selectable date
  max: new Date(2026, 11, 31),           // Maximum selectable date
  enabled: true,                          // Enable/disable
  readonly: false                         // Allow user input
});

picker.appendTo('#datepicker');
```

### Setting Value Programmatically

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const picker = new DatePicker();
picker.appendTo('#datepicker');

// Set value after initialization
picker.value = new Date(2026, 5, 20);

// Get current value
const selectedDate = picker.value;
console.log('Selected:', selectedDate);
```

### Enable/Disable DatePicker

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const picker = new DatePicker({
  value: new Date()
});

picker.appendTo('#datepicker');

function toggleEnabled() {
  picker.enabled = !picker.enabled;
}

// <button onclick="toggleEnabled()">Toggle</button>
```

---

## Date Formatting

### Common Format Strings

| Format | Example |
|--------|---------|
| `'yyyy-MM-dd'` | 2026-06-15 |
| `'dd/MM/yyyy'` | 15/06/2026 |
| `'MM/dd/yyyy'` | 06/15/2026 |
| `'MMM dd, yyyy'` | Jun 15, 2026 |
| `'MMMM d, yyyy'` | June 15, 2026 |
| `'ddd, MMM dd'` | Mon, Jun 15 |
| `'yyyy-MM-dd HH:mm'` | 2026-06-15 14:30 |

### Setting Custom Format

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const picker = new DatePicker({
  value: new Date(2026, 5, 15),
  format: 'dd-MMMM-yyyy'  // 15-June-2026
});

picker.appendTo('#datepicker');
```

### Localized Formatting

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

// German format
const pickerDE = new DatePicker({
  value: new Date(2026, 5, 15),
  locale: 'de',
  format: 'dd.MM.yyyy'  // 15.06.2026
});
pickerDE.appendTo('#pickerDE');

// French format
const pickerFR = new DatePicker({
  value: new Date(2026, 5, 15),
  locale: 'fr',
  format: 'dd/MM/yyyy'  // 15/06/2026
});
pickerFR.appendTo('#pickerFR');
```

---

## Input Masking

The `enableMask` property automatically formats user input as they type.

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const picker = new DatePicker({
  value: new Date(),
  format: 'MM/dd/yyyy',
  enableMask: true  // Enable input masking
});

picker.appendTo('#datepicker');
```

With masking enabled:
- User types: `1` → Input shows `1_/__/____`
- User types: `5` → Input shows `15/__/____`
- User types: `0626` → Input shows `15/06/____`
- User types: `2026` → Input shows `15/06/2026` (fully formatted)

### Strict Mode

The `strictMode` property validates input strictly during typing.

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const picker = new DatePicker({
  value: new Date(),
  format: 'MM/dd/yyyy',
  enableMask: true,
  strictMode: true  // Validate strictly
});

picker.appendTo('#datepicker');
```

With `strictMode: true`:
- Invalid characters are rejected
- Invalid dates are not accepted
- User must follow the exact format

---

## Events and Validation

### Change Event

Fires when user selects a date or modifies the input.

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

let selectedDate: Date | null = null;

const picker = new DatePicker({
  value: new Date(),
  change: (args: any) => {
    selectedDate = args.value;
    console.log('Date changed:', selectedDate);
    document.getElementById('result')!.innerText = selectedDate?.toDateString() || 'No date';
  }
});

picker.appendTo('#datepicker');
```

HTML:
```html
<input id="datepicker" type="text" />
<p>Selected: <span id="result"></span></p>
```

### Created Event

Fires after DatePicker is initialized.

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const picker = new DatePicker({
  value: new Date(),
  created: () => {
    console.log('DatePicker created');
    document.getElementById('status')!.innerText = 'Ready';
  }
});

picker.appendTo('#datepicker');
```

### Validation with Min/Max

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const minDate = new Date(2026, 0, 1);
const maxDate = new Date(2026, 11, 31);

const picker = new DatePicker({
  min: minDate,
  max: maxDate,
  change: (args: any) => {
    if (args.value < minDate || args.value > maxDate) {
      console.error('Date out of range');
    } else {
      console.log('Valid date:', args.value);
    }
  }
});

picker.appendTo('#datepicker');
```

---

## Accessibility

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Alt + Down` | Open calendar picker |
| `Escape` | Close calendar picker |
| `Tab` | Move to next field |
| `Arrow Keys` | Navigate in calendar (when open) |
| `Enter` | Select date in calendar |

### Screen Reader Support

```html
<label for="datepicker">Select Date:</label>
<input id="datepicker" type="text" aria-label="Date picker" />

<div id="status" aria-live="polite"></div>
```

### ARIA Attributes

The DatePicker automatically applies:
- `role="combobox"` — Identifies as date picker combo
- `aria-label` — Descriptive label
- `aria-expanded` — Indicates if picker is open
- `aria-haspopup="dialog"` — Calendar picker is popup

---

## Common Patterns

### Read-Only Date Display

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const picker = new DatePicker({
  value: new Date(),
  readonly: true  // User cannot type, only select from calendar
});

picker.appendTo('#datepicker');
```

### Controlled DatePicker

Manage value from external state:

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

let currentDate = new Date();

const picker = new DatePicker({
  value: currentDate,
  change: (args: any) => {
    currentDate = args.value;
    updateOtherComponents();
  }
});

picker.appendTo('#datepicker');

function updateOtherComponents() {
  console.log('Date updated:', currentDate);
  // Sync other components
}
```

### Display Selected Date in Custom Format

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const picker = new DatePicker({
  format: 'yyyy-MM-dd',
  change: (args: any) => {
    const longFormat = args.value.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    document.getElementById('display')!.innerText = longFormat;
  }
});

picker.appendTo('#datepicker');
```

HTML:
```html
<input id="datepicker" type="text" />
<p>You selected: <strong id="display"></strong></p>
```
