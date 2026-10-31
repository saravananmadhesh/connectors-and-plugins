# DateTimePicker Time Configuration

## Time Format Options

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

// 12-hour with AM/PM
const picker12 = new DateTimePicker({
  timeFormat: 'hh:mm aa',
  format: 'MM/dd/yyyy hh:mm aa'
});
picker12.appendTo('#12h');

// 24-hour format
const picker24 = new DateTimePicker({
  timeFormat: 'HH:mm',
  format: 'MM/dd/yyyy HH:mm'
});
picker24.appendTo('#24h');

// With seconds
const pickerSec = new DateTimePicker({
  timeFormat: 'hh:mm:ss aa',
  format: 'MM/dd/yyyy hh:mm:ss aa'
});
pickerSec.appendTo('#seconds');
```

## Step Intervals

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

// 5-minute intervals
const picker5 = new DateTimePicker({
  step: 5
});
picker5.appendTo('#5min');

// 15-minute intervals
const picker15 = new DateTimePicker({
  step: 15
});
picker15.appendTo('#15min');

// 30-minute intervals
const picker30 = new DateTimePicker({
  step: 30
});
picker30.appendTo('#30min');

// Hourly
const pickerHourly = new DateTimePicker({
  step: 60
});
pickerHourly.appendTo('#hourly');
```

## Time Range (Min/Max)

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

// Business hours: 8 AM to 6 PM
const picker = new DateTimePicker({
  value: new Date(),
  min: new Date(2026, 0, 1, 8, 0),    // 8:00 AM
  max: new Date(2026, 0, 1, 18, 0),   // 6:00 PM
  format: 'MM/dd/yyyy hh:mm aa'
});

picker.appendTo('#picker');
```

## Separate Time Configuration

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const picker = new DateTimePicker({
  value: new Date(),
  format: 'MM/dd/yyyy',           // Date format
  timeFormat: 'HH:mm:ss',         // Time format
  step: 15,
  change: (args: any) => {
    const time = args.value;
    console.log(`Selected: ${time.toLocaleString()}`);
  }
});

picker.appendTo('#picker');
```
