# DateTimePicker Advanced Features

## Timezone Support

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

let selectedDateTime: Date | null = null;

const picker = new DateTimePicker({
  value: new Date(),
  format: 'MM/dd/yyyy hh:mm aa',
  change: (args: any) => {
    selectedDateTime = args.value;
    
    // Convert to UTC
    const utcTime = selectedDateTime!.toUTCString();
    
    // Convert to specific timezone
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    console.log('Local:', selectedDateTime);
    console.log('UTC:', utcTime);
    console.log('EST:', formatter.format(selectedDateTime));
  }
});

picker.appendTo('#picker');
```

## Localized Time Display

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const formatter = new Intl.DateTimeFormat('de-DE', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});

const picker = new DateTimePicker({
  locale: 'de',
  change: (args: any) => {
    console.log('German format:', formatter.format(args.value));
  }
});

picker.appendTo('#picker');
```

## Military Time Display

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const picker = new DateTimePicker({
  timeFormat: 'HH:mm',
  format: 'MM/dd/yyyy HH:mm',
  change: (args: any) => {
    const hours = String(args.value.getHours()).padStart(2, '0');
    const minutes = String(args.value.getMinutes()).padStart(2, '0');
    console.log(`Military time: ${hours}${minutes}`);
  }
});

picker.appendTo('#picker');
```

## Custom Separator

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const picker = new DateTimePicker({
  format: 'MM/dd/yyyy @ hh:mm aa',
  value: new Date()
});

picker.appendTo('#picker');
```

## Validation with Range

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const today = new Date();
today.setHours(0, 0, 0, 0);

const minDateTime = new Date(today);
minDateTime.setHours(9, 0, 0, 0);  // 9 AM

const maxDateTime = new Date(today);
maxDateTime.setHours(17, 0, 0, 0);  // 5 PM

const picker = new DateTimePicker({
  min: minDateTime,
  max: maxDateTime,
  format: 'MM/dd/yyyy hh:mm aa',
  step: 30
});

picker.appendTo('#picker');
```

## Pre-defined Time Slots

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

function getTimeSlots(): Date[] {
  const slots: Date[] = [];
  for (let i = 9; i < 17; i++) {
    for (let j = 0; j < 60; j += 30) {
      const slot = new Date();
      slot.setHours(i, j, 0, 0);
      slots.push(slot);
    }
  }
  return slots;
}

const picker = new DateTimePicker({
  format: 'MM/dd/yyyy hh:mm aa',
  step: 30,
  change: (args: any) => {
    const slots = getTimeSlots();
    const isValidSlot = slots.some(s => 
      s.getHours() === args.value.getHours() &&
      s.getMinutes() === args.value.getMinutes()
    );
    
    if (!isValidSlot) {
      console.error('Invalid time slot selected');
    }
  }
});

picker.appendTo('#picker');
```

## Countdown Timer Integration

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

let targetDateTime: Date | null = null;

const picker = new DateTimePicker({
  value: new Date(),
  format: 'MM/dd/yyyy hh:mm aa',
  change: (args: any) => {
    targetDateTime = args.value;
    startCountdown();
  }
});

picker.appendTo('#picker');

function startCountdown() {
  const interval = setInterval(() => {
    if (!targetDateTime) {
      clearInterval(interval);
      return;
    }
    
    const now = new Date();
    const diff = targetDateTime.getTime() - now.getTime();
    
    if (diff <= 0) {
      document.getElementById('countdown')!.innerText = 'Time reached!';
      clearInterval(interval);
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('countdown')!.innerText = 
      `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
}
```

HTML:
```html
<input id="picker" type="text" />
<div id="countdown"></div>
```
