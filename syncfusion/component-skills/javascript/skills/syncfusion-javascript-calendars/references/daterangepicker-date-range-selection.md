# DateRangePicker Date Range Selection

## Single Selection Pattern

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

let rangeStart: Date | null = null;
let rangeEnd: Date | null = null;

const picker = new DateRangePicker({
  startDate: new Date(2026, 5, 1),
  endDate: new Date(2026, 5, 30),
  rangeChanged: (args: any) => {
    rangeStart = args.startDate;
    rangeEnd = args.endDate;
    updateDisplay();
  }
});

picker.appendTo('#picker');

function updateDisplay() {
  if (rangeStart && rangeEnd) {
    const days = Math.ceil(
      (rangeEnd.getTime() - rangeStart.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;
    
    document.getElementById('display')!.innerHTML = `
      Start: ${rangeStart.toDateString()}<br/>
      End: ${rangeEnd.toDateString()}<br/>
      Duration: ${days} days
    `;
  }
}
```

## Two-Step Selection

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const picker = new DateRangePicker({
  format: 'yyyy-MM-dd',
  rangeChanged: (args: any) => {
    console.log('Range selected');
    console.log('Start:', args.startDate);
    console.log('End:', args.endDate);
  }
});

picker.appendTo('#picker');
```

## Reversed Range

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const picker = new DateRangePicker({
  rangeChanged: (args: any) => {
    // If end is before start, swap them
    if (args.endDate < args.startDate) {
      picker.startDate = args.endDate;
      picker.endDate = args.startDate;
    }
  }
});

picker.appendTo('#picker');
```

## Range Validation

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const picker = new DateRangePicker({
  minDays: 7,    // At least 7 days
  maxDays: 90,   // At most 90 days
  rangeChanged: (args: any) => {
    const days = Math.ceil(
      (args.endDate.getTime() - args.startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    const error = document.getElementById('error')!;
    if (days < 7) {
      error.innerText = 'Range must be at least 7 days';
    } else if (days > 90) {
      error.innerText = 'Range must not exceed 90 days';
    } else {
      error.innerText = '';
    }
  }
});

picker.appendTo('#picker');
```

## Preset Ranges

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const today = new Date();

function getLastNDays(n: number) {
  const start = new Date(today);
  start.setDate(start.getDate() - n);
  return { start, end: today };
}

function getMonthRange() {
  const start = new Date(today.getFullYear(), today.getMonth(), 1);
  const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  return { start, end };
}

const picker = new DateRangePicker({
  format: 'dd/MM/yyyy',
  presets: [
    {
      label: 'Last 7 Days',
      start: getLastNDays(7).start,
      end: getLastNDays(7).end
    },
    {
      label: 'Last 30 Days',
      start: getLastNDays(30).start,
      end: getLastNDays(30).end
    },
    {
      label: 'This Month',
      start: getMonthRange().start,
      end: getMonthRange().end
    }
  ]
});

picker.appendTo('#picker');
```

## Business Days Only

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

function isBusinessDay(date: Date): boolean {
  const day = date.getDay();
  return day !== 0 && day !== 6; // Not Saturday or Sunday
}

function countBusinessDays(start: Date, end: Date): number {
  let count = 0;
  const current = new Date(start);
  
  while (current <= end) {
    if (isBusinessDay(current)) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }
  
  return count;
}

const picker = new DateRangePicker({
  rangeChanged: (args: any) => {
    const businessDays = countBusinessDays(args.startDate, args.endDate);
    document.getElementById('info')!.innerText = 
      `${businessDays} business days selected`;
  }
});

picker.appendTo('#picker');
```
