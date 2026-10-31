# TimePicker Events and Methods

## Events

### Change Event

Fires when the selected time value changes.

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

let previousValue: Date | null = null;

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0),
  format: 'hh:mm aa',
  change: (args: any) => {
    console.log('Time changed from:', previousValue);
    console.log('Time changed to:', args.value);
    previousValue = args.value;
  }
});

picker.appendTo('#timepicker');
```

### Open Event

Fires when the time picker popup opens.

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0),
  open: (args: any) => {
    console.log('TimePicker opened');
  }
});

picker.appendTo('#timepicker');
```

### Close Event

Fires when the time picker popup closes.

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0),
  close: (args: any) => {
    console.log('TimePicker closed');
    console.log('Final value:', args.value);
  }
});

picker.appendTo('#timepicker');
```

### Multiple Events

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0),
  format: 'hh:mm aa',
  open: (args: any) => {
    console.log('Popup opened');
  },
  close: (args: any) => {
    console.log('Popup closed');
  },
  change: (args: any) => {
    console.log('Value changed to:', args.value);
  }
});

picker.appendTo('#timepicker');
```

## Methods

### setValue

Sets the value of the TimePicker.

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker();
picker.appendTo('#timepicker');

// Set time to 10:30 AM
picker.value = new Date(2026, 0, 1, 10, 30);
```

### getValue

Gets the current value of the TimePicker.

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 30)
});

picker.appendTo('#timepicker');

// Get current value
const currentValue = picker.value;
console.log('Current time:', currentValue?.toLocaleTimeString());
```

### show

Shows the time picker popup.

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0)
});

picker.appendTo('#timepicker');

// Show popup programmatically
document.getElementById('btnShow')?.addEventListener('click', () => {
  picker.show();
});
```

### hide

Hides the time picker popup.

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0)
});

picker.appendTo('#timepicker');

// Hide popup programmatically
document.getElementById('btnHide')?.addEventListener('click', () => {
  picker.hide();
});
```

### enable

Enables or disables the TimePicker.

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0)
});

picker.appendTo('#timepicker');

// Disable
document.getElementById('btnDisable')?.addEventListener('click', () => {
  picker.enabled = false;
});

// Enable
document.getElementById('btnEnable')?.addEventListener('click', () => {
  picker.enabled = true;
});
```

### focus

Sets focus to the TimePicker input element.

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0)
});

picker.appendTo('#timepicker');

// Focus the input
document.getElementById('btnFocus')?.addEventListener('click', () => {
  picker.focus();
});
```

## Complete Event Handler Example

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0),
  min: new Date(2026, 0, 1, 9, 0),
  max: new Date(2026, 0, 1, 17, 0),
  format: 'hh:mm aa',
  open: (args: any) => {
    console.log('Picker opened at:', new Date().toLocaleTimeString());
    document.getElementById('status')!.innerText = 'Picker is open';
  },
  close: (args: any) => {
    console.log('Picker closed at:', new Date().toLocaleTimeString());
    document.getElementById('status')!.innerText = 'Picker is closed';
  },
  change: (args: any) => {
    const oldValue = args.previousValue?.toLocaleTimeString();
    const newValue = args.value?.toLocaleTimeString();
    console.log(`Changed from ${oldValue} to ${newValue}`);
    document.getElementById('selectedTime')!.innerText = newValue || 'No time selected';
  }
});

picker.appendTo('#timepicker');

// Control methods
document.getElementById('btnShow')?.addEventListener('click', () => {
  picker.show();
});

document.getElementById('btnHide')?.addEventListener('click', () => {
  picker.hide();
});

document.getElementById('btnGetValue')?.addEventListener('click', () => {
  console.log('Current value:', picker.value);
});

document.getElementById('btnSetValue')?.addEventListener('click', () => {
  picker.value = new Date(2026, 0, 1, 15, 0);
});
```

## Chaining Methods

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0)
});

picker.appendTo('#timepicker');

// Perform multiple operations
function updatePicker(): void {
  picker.value = new Date(2026, 0, 1, 16, 0);
  picker.focus();
  picker.show();
}

document.getElementById('btnUpdate')?.addEventListener('click', updatePicker);
```
