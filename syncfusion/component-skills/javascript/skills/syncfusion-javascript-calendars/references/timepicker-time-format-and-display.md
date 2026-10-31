# TimePicker Time Format and Display

## Time Format Patterns

The `format` property controls how time is displayed and parsed in the input field.

## Standard Format Strings

| Format | Pattern | Example | Description |
|--------|---------|---------|-------------|
| `H` | Hour (0-23) | 9, 14 | 24-hour, no padding |
| `HH` | Hour (00-23) | 09, 14 | 24-hour with padding |
| `h` | Hour (1-12) | 9, 2 | 12-hour, no padding |
| `hh` | Hour (01-12) | 09, 02 | 12-hour with padding |
| `m` | Minutes (0-59) | 5, 30 | No padding |
| `mm` | Minutes (00-59) | 05, 30 | With padding |
| `s` | Seconds (0-59) | 5, 45 | No padding |
| `ss` | Seconds (00-59) | 05, 45 | With padding |
| `a` | AM/PM | AM, PM | Lowercase indicator |
| `A` | AM/PM | AM, PM | Uppercase indicator |
| `tt` | AM/PM | am, pm | Lowercase with period |
| `TT` | AM/PM | AM, PM | Uppercase with period |

## 12-Hour Formats

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

// 12-hour with AM/PM
const picker1 = new TimePicker({
  value: new Date(2026, 0, 1, 14, 30),
  format: 'hh:mm aa'  // Result: 02:30 pm
});
picker1.appendTo('#picker1');

// 12-hour without padding
const picker2 = new TimePicker({
  value: new Date(2026, 0, 1, 14, 30),
  format: 'h:mm aa'   // Result: 2:30 pm
});
picker2.appendTo('#picker2');

// With seconds
const picker3 = new TimePicker({
  value: new Date(2026, 0, 1, 14, 30, 45),
  format: 'hh:mm:ss aa'  // Result: 02:30:45 pm
});
picker3.appendTo('#picker3');
```

## 24-Hour Formats

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

// 24-hour with padding
const picker1 = new TimePicker({
  value: new Date(2026, 0, 1, 14, 30),
  format: 'HH:mm'  // Result: 14:30
});
picker1.appendTo('#picker1');

// 24-hour without padding
const picker2 = new TimePicker({
  value: new Date(2026, 0, 1, 14, 30),
  format: 'H:mm'   // Result: 14:30
});
picker2.appendTo('#picker2');

// With seconds
const picker3 = new TimePicker({
  value: new Date(2026, 0, 1, 14, 30, 45),
  format: 'HH:mm:ss'  // Result: 14:30:45
});
picker3.appendTo('#picker3');
```

## Custom Display Formats

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

// US Format with AM/PM
const usFormat = new TimePicker({
  value: new Date(2026, 0, 1, 14, 30),
  format: 'hh:mm aa'
});
usFormat.appendTo('#us');

// European 24-hour format
const euFormat = new TimePicker({
  value: new Date(2026, 0, 1, 14, 30),
  format: 'HH:mm'
});
euFormat.appendTo('#eu');

// ISO 8601 style with seconds
const isoFormat = new TimePicker({
  value: new Date(2026, 0, 1, 14, 30, 45),
  format: 'HH:mm:ss'
});
isoFormat.appendTo('#iso');
```

## Parsing and Formatting

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 30, 45),
  format: 'hh:mm:ss aa'
});

picker.appendTo('#timepicker');

// Get formatted value
const formatted = picker.getFormattedValue(picker.value!);
console.log('Formatted:', formatted);  // "02:30:45 pm"

// Get value object
console.log('Value:', picker.value);   // Date object
```

## Time Display Modes

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

// Compact mode - time only
const compact = new TimePicker({
  value: new Date(2026, 0, 1, 14, 30),
  format: 'HH:mm',
  placeholder: 'HH:mm'
});
compact.appendTo('#compact');

// Extended mode - with seconds
const extended = new TimePicker({
  value: new Date(2026, 0, 1, 14, 30, 45),
  format: 'HH:mm:ss',
  placeholder: 'HH:mm:ss'
});
extended.appendTo('#extended');

// Verbose mode - with AM/PM
const verbose = new TimePicker({
  value: new Date(2026, 0, 1, 14, 30),
  format: 'hh:mm aa',
  placeholder: 'hh:mm aa'
});
verbose.appendTo('#verbose');
```

## Changing Format at Runtime

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 30),
  format: 'hh:mm aa'
});

picker.appendTo('#timepicker');

// Change format
function switchFormat(newFormat: string): void {
  picker.format = newFormat;
  picker.refresh();
}

// Switch to 24-hour format
document.getElementById('btn24h')?.addEventListener('click', () => {
  switchFormat('HH:mm');
});

// Switch to 12-hour format
document.getElementById('btn12h')?.addEventListener('click', () => {
  switchFormat('hh:mm aa');
});
```
