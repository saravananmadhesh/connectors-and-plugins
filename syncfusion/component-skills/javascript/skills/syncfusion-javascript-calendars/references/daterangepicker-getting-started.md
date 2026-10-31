# DateRangePicker Getting Started

## Overview

The DateRangePicker component allows users to select a date range (start and end dates) through an intuitive dual-calendar picker interface. It supports presets, validation, localization, and various customization options.

## Installation

```bash
npm install @syncfusion/ej2-calendars
```

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';
```

## Quick Example

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const startDate = new Date(2026, 5, 1);
const endDate = new Date(2026, 5, 30);

const picker = new DateRangePicker({
  startDate: startDate,
  endDate: endDate,
  format: 'dd/MM/yyyy'
});

picker.appendTo('#daterangepicker');
```

HTML:
```html
<input id="daterangepicker" type="text" />
```

Result: Input showing date range "01/06/2026 - 30/06/2026"

## Basic Properties

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const picker = new DateRangePicker({
  startDate: new Date(2026, 5, 1),
  endDate: new Date(2026, 5, 15),
  format: 'dd/MM/yyyy',
  separator: ' - ',
  placeholder: 'Select date range',
  enabled: true,
  readonly: false,
  minDays: 1,
  maxDays: 30
});

picker.appendTo('#daterangepicker');
```

## Setting Range Programmatically

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const picker = new DateRangePicker();
picker.appendTo('#daterangepicker');

// Set dates after initialization
picker.startDate = new Date(2026, 5, 1);
picker.endDate = new Date(2026, 5, 30);

// Get current range
const range = {
  start: picker.startDate,
  end: picker.endDate
};
console.log('Selected range:', range);
```

## Events

### Range Change Event

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

let selectedRange: { start: Date; end: Date } | null = null;

const picker = new DateRangePicker({
  format: 'yyyy-MM-dd',
  rangeChanged: (args: any) => {
    selectedRange = {
      start: args.startDate,
      end: args.endDate
    };
    
    const days = Math.ceil(
      (args.endDate.getTime() - args.startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    console.log(`Selected ${days + 1} days`);
    document.getElementById('result')!.innerText = 
      `${args.startDate.toDateString()} to ${args.endDate.toDateString()}`;
  }
});

picker.appendTo('#daterangepicker');
```

HTML:
```html
<input id="daterangepicker" type="text" />
<p id="result"></p>
```

## Presets

Pre-defined ranges for quick selection:

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);
const nextMonth = new Date(today);
nextMonth.setMonth(nextMonth.getMonth() + 1);

const picker = new DateRangePicker({
  format: 'dd/MM/yyyy',
  presets: [
    {
      label: 'Today',
      start: today,
      end: today
    },
    {
      label: 'Tomorrow',
      start: tomorrow,
      end: tomorrow
    },
    {
      label: 'This Week',
      start: today,
      end: nextWeek
    },
    {
      label: 'Next 30 Days',
      start: today,
      end: nextMonth
    }
  ]
});

picker.appendTo('#daterangepicker');
```

## Constraints

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const picker = new DateRangePicker({
  startDate: new Date(2026, 5, 1),
  endDate: new Date(2026, 5, 15),
  min: new Date(2026, 0, 1),      // Cannot select before
  max: new Date(2026, 11, 31),    // Cannot select after
  minDays: 1,                      // At least 1 day
  maxDays: 60,                     // At most 60 days
  format: 'yyyy-MM-dd'
});

picker.appendTo('#daterangepicker');
```

## Mobile Responsive

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const picker = new DateRangePicker({
  format: 'dd/MM/yyyy',
  cssClass: window.innerWidth < 768 ? 'mobile-picker' : ''
});

picker.appendTo('#daterangepicker');
```

CSS:
```css
@media (max-width: 768px) {
  .e-daterangepicker.mobile-picker {
    width: 100%;
  }
  
  .e-daterangepicker.mobile-picker .e-input-group {
    flex-direction: column;
  }
}
```
