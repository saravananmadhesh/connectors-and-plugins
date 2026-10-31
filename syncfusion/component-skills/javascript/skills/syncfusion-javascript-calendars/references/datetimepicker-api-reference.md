# DateTimePicker API Reference

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | Date | null | Selected date-time value |
| `format` | string | 'M/d/yyyy hh:mm aa' | Date display format |
| `timeFormat` | string | 'hh:mm aa' | Time display format |
| `placeholder` | string | 'Select date time' | Input placeholder |
| `step` | number | 30 | Time interval in minutes |
| `min` | Date | null | Minimum selectable date-time |
| `max` | Date | null | Maximum selectable date-time |
| `enabled` | boolean | true | Enable/disable picker |
| `readonly` | boolean | false | Read-only mode |
| `cssClass` | string | '' | Custom CSS class |
| `locale` | string | 'en' | Locale for formatting |
| `enableRtl` | boolean | false | RTL support |

## Methods

### getValue()
```typescript
const value = picker.value;
```

### setValue(date: Date)
```typescript
picker.value = new Date(2026, 5, 15, 14, 30);
```

### destroy()
```typescript
picker.destroy();
```

## Events

### change
```typescript
change: (args: any) => {
  console.log('Value:', args.value);
}
```

### created
```typescript
created: () => {
  console.log('Picker initialized');
}
```

## Examples

### Basic Setup
```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const picker = new DateTimePicker({
  value: new Date(),
  format: 'MM/dd/yyyy hh:mm aa'
});

picker.appendTo('#datetimepicker');
```

### Business Hours
```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const picker = new DateTimePicker({
  min: new Date(2026, 0, 1, 8, 0),
  max: new Date(2026, 0, 1, 18, 0),
  step: 30,
  format: 'MM/dd/yyyy hh:mm aa'
});

picker.appendTo('#picker');
```

### 24-Hour Format
```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const picker = new DateTimePicker({
  format: 'MM/dd/yyyy HH:mm',
  timeFormat: 'HH:mm'
});

picker.appendTo('#picker');
```
