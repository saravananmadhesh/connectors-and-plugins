# DateRangePicker API Reference

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `startDate` | Date | null | Start date of range |
| `endDate` | Date | null | End date of range |
| `format` | string | 'M/d/yyyy' | Date display format |
| `separator` | string | ' - ' | Range separator text |
| `placeholder` | string | 'Select date range' | Input placeholder text |
| `enabled` | boolean | true | Enable/disable picker |
| `readonly` | boolean | false | Read-only mode |
| `min` | Date | null | Minimum selectable date |
| `max` | Date | null | Maximum selectable date |
| `minDays` | number | 0 | Minimum days in range |
| `maxDays` | number | null | Maximum days in range |
| `cssClass` | string | '' | Custom CSS class |
| `locale` | string | 'en' | Locale for formatting |
| `enableRtl` | boolean | false | RTL support |
| `firstDayOfWeek` | number | 0 | First day of week (0=Sunday) |
| `presets` | object[] | [] | Predefined range presets |

## Methods

### setStartDate(date: Date)
```typescript
picker.startDate = new Date(2026, 5, 1);
```

### setEndDate(date: Date)
```typescript
picker.endDate = new Date(2026, 5, 30);
```

### getRange()
```typescript
const range = {
  start: picker.startDate,
  end: picker.endDate
};
```

### clear()
```typescript
picker.startDate = null;
picker.endDate = null;
```

### destroy()
```typescript
picker.destroy();
```

## Events

### rangeChanged

Fires when range selection changes:

```typescript
rangeChanged: (args: any) => {
  console.log('Start:', args.startDate);
  console.log('End:', args.endDate);
}
```

### created

Fires after component initialization:

```typescript
created: () => {
  console.log('DateRangePicker created');
}
```

## Examples

### Basic Setup

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const picker = new DateRangePicker({
  startDate: new Date(2026, 5, 1),
  endDate: new Date(2026, 5, 30),
  format: 'yyyy-MM-dd'
});

picker.appendTo('#picker');
```

### With Validation

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const picker = new DateRangePicker({
  min: new Date(2026, 0, 1),
  max: new Date(2026, 11, 31),
  minDays: 7,
  maxDays: 60,
  rangeChanged: (args: any) => {
    const days = Math.ceil(
      (args.endDate.getTime() - args.startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    if (days < 7 || days > 60) {
      document.getElementById('error')!.innerText = 'Invalid range';
    }
  }
});

picker.appendTo('#picker');
```

### With Presets

```typescript
const today = new Date();
const picker = new DateRangePicker({
  format: 'dd/MM/yyyy',
  presets: [
    {
      label: 'This Week',
      start: new Date(today.setDate(today.getDate() - today.getDay())),
      end: new Date()
    },
    {
      label: 'This Month',
      start: new Date(today.getFullYear(), today.getMonth(), 1),
      end: new Date(today.getFullYear(), today.getMonth() + 1, 0)
    }
  ]
});

picker.appendTo('#picker');
```
