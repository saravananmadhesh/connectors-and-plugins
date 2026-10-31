# DateRangePicker Events and Methods

## Events

### Range Changed Event

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const picker = new DateRangePicker({
  rangeChanged: (args: any) => {
    console.log('Range changed');
    console.log('Start Date:', args.startDate);
    console.log('End Date:', args.endDate);
    
    const days = Math.ceil(
      (args.endDate.getTime() - args.startDate.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;
    
    console.log('Number of days:', days);
  }
});

picker.appendTo('#picker');
```

### Created Event

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const picker = new DateRangePicker({
  created: () => {
    console.log('DateRangePicker created and ready');
    document.getElementById('status')!.innerText = 'Picker loaded';
  }
});

picker.appendTo('#picker');
```

## Methods

### Get Range

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const picker = new DateRangePicker({
  startDate: new Date(2026, 5, 1),
  endDate: new Date(2026, 5, 30)
});

picker.appendTo('#picker');

function getRange() {
  const range = {
    start: picker.startDate,
    end: picker.endDate
  };
  console.log('Current range:', range);
  return range;
}

// Button click
document.getElementById('getBtn')!.addEventListener('click', getRange);
```

### Set Range

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const picker = new DateRangePicker();
picker.appendTo('#picker');

function setRange() {
  picker.startDate = new Date(2026, 6, 1);
  picker.endDate = new Date(2026, 6, 31);
  console.log('Range updated');
}

function resetToToday() {
  const today = new Date();
  picker.startDate = today;
  picker.endDate = today;
}

// Buttons
document.getElementById('setBtn')!.addEventListener('click', setRange);
document.getElementById('resetBtn')!.addEventListener('click', resetToToday);
```

### Get Days in Range

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const picker = new DateRangePicker({
  startDate: new Date(2026, 5, 1),
  endDate: new Date(2026, 5, 30)
});

picker.appendTo('#picker');

function getDaysCount(): number {
  const days = Math.ceil(
    (picker.endDate!.getTime() - picker.startDate!.getTime()) / (1000 * 60 * 60 * 24)
  ) + 1;
  return days;
}

console.log('Days in range:', getDaysCount());
```

### Destroy

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const picker = new DateRangePicker();
picker.appendTo('#picker');

function cleanup() {
  picker.destroy();
  console.log('Picker destroyed');
}

document.getElementById('destroyBtn')!.addEventListener('click', cleanup);
```

## Practical Patterns

### Hotel Booking

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const today = new Date();
const minCheckout = new Date(today);
minCheckout.setDate(minCheckout.getDate() + 1);

const picker = new DateRangePicker({
  min: today,
  minDays: 1,
  maxDays: 30,
  format: 'yyyy-MM-dd',
  rangeChanged: (args: any) => {
    const nights = Math.ceil(
      (args.endDate.getTime() - args.startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const pricePerNight = 100;
    const total = nights * pricePerNight;
    
    document.getElementById('info')!.innerText = 
      `${nights} nights × $${pricePerNight} = $${total}`;
  }
});

picker.appendTo('#dates');
```

### Leave Request

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

function isBusinessDay(date: Date): boolean {
  const day = date.getDay();
  return day !== 0 && day !== 6;
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
  format: 'yyyy-MM-dd',
  rangeChanged: (args: any) => {
    const businessDays = countBusinessDays(args.startDate, args.endDate);
    document.getElementById('days')!.innerText = 
      `${businessDays} business days requested`;
  }
});

picker.appendTo('#leavedate');
```
