# TimePicker Time Range and Selection

## Setting Time Range

The `min` and `max` properties define the selectable time range.

## Basic Range

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 12, 0),
  min: new Date(2026, 0, 1, 9, 0),    // 9:00 AM
  max: new Date(2026, 0, 1, 17, 0),   // 5:00 PM
  format: 'hh:mm aa'
});

picker.appendTo('#timepicker');
```

**Result:** Only times between 9:00 AM and 5:00 PM are selectable.

## Office Hours Range

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 9, 0),
  min: new Date(2026, 0, 1, 8, 30),   // 8:30 AM
  max: new Date(2026, 0, 1, 18, 30),  // 6:30 PM
  step: 30,
  format: 'hh:mm aa'
});

picker.appendTo('#officeHours');
```

## Business Hours with Break

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 10, 0),
  min: new Date(2026, 0, 1, 9, 0),    // 9:00 AM
  max: new Date(2026, 0, 1, 17, 0),   // 5:00 PM
  step: 15,
  format: 'hh:mm aa'
});

picker.appendTo('#business');

// Note: For lunch break exclusion, use renderCellTemplate
```

## 24-Hour Range

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

// Full 24-hour range
const picker = new TimePicker({
  value: new Date(2026, 0, 1, 12, 0),
  min: new Date(2026, 0, 1, 0, 0),    // 00:00
  max: new Date(2026, 0, 1, 23, 59),  // 23:59
  format: 'HH:mm'
});

picker.appendTo('#full24h');
```

## Restricted Hours

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

// Afternoon only (1:00 PM - 6:00 PM)
const afternoonOnly = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0),
  min: new Date(2026, 0, 1, 13, 0),
  max: new Date(2026, 0, 1, 18, 0),
  format: 'hh:mm aa'
});
afternoonOnly.appendTo('#afternoon');

// Morning only (7:00 AM - 12:00 PM)
const morningOnly = new TimePicker({
  value: new Date(2026, 0, 1, 9, 0),
  min: new Date(2026, 0, 1, 7, 0),
  max: new Date(2026, 0, 1, 12, 0),
  format: 'hh:mm aa'
});
morningOnly.appendTo('#morning');
```

## Current Selection

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 30),
  format: 'hh:mm aa'
});

picker.appendTo('#timepicker');

// Get current value
function getSelectedTime(): Date | null {
  return picker.value;
}

// Set current value
function setSelectedTime(hour: number, minute: number): void {
  picker.value = new Date(2026, 0, 1, hour, minute);
}

// Clear selection
function clearSelection(): void {
  picker.value = null;
}

// Display selected time
function displaySelection(): void {
  if (picker.value) {
    const time = picker.value.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    document.getElementById('display')!.innerText = `Selected: ${time}`;
  }
}
```

## Programmatic Selection

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  format: 'hh:mm aa'
});

picker.appendTo('#timepicker');

// Select specific times
document.getElementById('btn9am')?.addEventListener('click', () => {
  picker.value = new Date(2026, 0, 1, 9, 0);
});

document.getElementById('btn12pm')?.addEventListener('click', () => {
  picker.value = new Date(2026, 0, 1, 12, 0);
});

document.getElementById('btn3pm')?.addEventListener('click', () => {
  picker.value = new Date(2026, 0, 1, 15, 0);
});

document.getElementById('btn6pm')?.addEventListener('click', () => {
  picker.value = new Date(2026, 0, 1, 18, 0);
});
```

## Default Selection

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

// Default to current time
const pickerDefault = new TimePicker({
  value: new Date(),
  format: 'hh:mm aa'
});
pickerDefault.appendTo('#default');

// Default to specific time
const pickerSpecific = new TimePicker({
  value: new Date(2026, 0, 1, 9, 0),  // Default to 9:00 AM
  format: 'hh:mm aa'
});
pickerSpecific.appendTo('#specific');

// No default (empty)
const pickerEmpty = new TimePicker({
  value: null,
  placeholder: 'Select a time',
  format: 'hh:mm aa'
});
pickerEmpty.appendTo('#empty');
```

## Validation with Range

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0),
  min: new Date(2026, 0, 1, 9, 0),
  max: new Date(2026, 0, 1, 17, 0),
  format: 'hh:mm aa'
});

picker.appendTo('#timepicker');

// Validate selection
function validateSelection(): boolean {
  const selected = picker.value;
  const min = picker.min as Date;
  const max = picker.max as Date;
  
  if (!selected) return false;
  return selected >= min && selected <= max;
}

// On change validation
picker.change = (args: any) => {
  if (validateSelection()) {
    document.getElementById('status')!.innerText = 'Valid time selected';
  } else {
    document.getElementById('status')!.innerText = 'Time out of range';
    picker.value = null;
  }
};
```
