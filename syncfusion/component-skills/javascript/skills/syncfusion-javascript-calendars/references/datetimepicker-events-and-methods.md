# DateTimePicker Events and Methods

## Events

### Change Event

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const picker = new DateTimePicker({
  change: (args: any) => {
    console.log('DateTime changed:', args.value);
    document.getElementById('result')!.innerText = args.value.toLocaleString();
  }
});

picker.appendTo('#picker');
```

### Created Event

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const picker = new DateTimePicker({
  created: () => {
    console.log('DateTimePicker ready');
    document.getElementById('status')!.innerText = 'Loaded';
  }
});

picker.appendTo('#picker');
```

## Methods

### Get Value

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const picker = new DateTimePicker({
  value: new Date()
});

picker.appendTo('#picker');

function getValue() {
  const value = picker.value;
  console.log('Current value:', value);
  return value;
}
```

### Set Value

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const picker = new DateTimePicker();
picker.appendTo('#picker');

function setToNow() {
  picker.value = new Date();
}

function setCustom() {
  picker.value = new Date(2026, 5, 15, 14, 30, 0);
}

function clear() {
  picker.value = null;
}
```

### Destroy

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const picker = new DateTimePicker();
picker.appendTo('#picker');

function cleanup() {
  picker.destroy();
  console.log('Picker destroyed');
}
```

## Practical Patterns

### Appointment Validation

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const businessHoursStart = 9;
const businessHoursEnd = 17;

const picker = new DateTimePicker({
  format: 'MM/dd/yyyy hh:mm aa',
  change: (args: any) => {
    const hour = args.value.getHours();
    
    if (hour < businessHoursStart || hour >= businessHoursEnd) {
      document.getElementById('error')!.innerText = 
        'Please select within business hours (9 AM - 5 PM)';
      picker.value = null;
    } else {
      document.getElementById('error')!.innerText = '';
    }
  }
});

picker.appendTo('#appointment');
```

### Meeting Duration Calculator

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const startPicker = new DateTimePicker({
  value: new Date(),
  change: updateDuration
});
startPicker.appendTo('#start-time');

const endPicker = new DateTimePicker({
  value: new Date(new Date().getTime() + 3600000),
  change: updateDuration
});
endPicker.appendTo('#end-time');

function updateDuration() {
  if (startPicker.value && endPicker.value) {
    const durationMs = endPicker.value!.getTime() - startPicker.value!.getTime();
    const durationMins = Math.floor(durationMs / 60000);
    const hours = Math.floor(durationMins / 60);
    const mins = durationMins % 60;
    
    document.getElementById('duration')!.innerText = 
      `${hours}h ${mins}m`;
  }
}
```

HTML:
```html
<label>Start: <input id="start-time" type="text" /></label>
<label>End: <input id="end-time" type="text" /></label>
<p>Duration: <span id="duration"></span></p>
```
