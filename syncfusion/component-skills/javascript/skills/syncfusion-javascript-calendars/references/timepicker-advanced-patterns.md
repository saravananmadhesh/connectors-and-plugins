# TimePicker Advanced Patterns

## Preset Times

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0),
  format: 'hh:mm aa'
});

picker.appendTo('#timepicker');

// Preset time buttons
const presets = [
  { label: '9:00 AM', hour: 9, minute: 0 },
  { label: '12:00 PM', hour: 12, minute: 0 },
  { label: '3:00 PM', hour: 15, minute: 0 },
  { label: '6:00 PM', hour: 18, minute: 0 }
];

presets.forEach((preset) => {
  const btn = document.createElement('button');
  btn.innerText = preset.label;
  btn.addEventListener('click', () => {
    picker.value = new Date(2026, 0, 1, preset.hour, preset.minute);
  });
  document.getElementById('presets')?.appendChild(btn);
});
```

## Interval Selection

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

// 15-minute intervals
const picker15 = new TimePicker({
  step: 15,
  value: new Date(2026, 0, 1, 14, 0),
  format: 'hh:mm aa'
});
picker15.appendTo('#picker15');

// 30-minute intervals
const picker30 = new TimePicker({
  step: 30,
  value: new Date(2026, 0, 1, 14, 0),
  format: 'hh:mm aa'
});
picker30.appendTo('#picker30');

// Hourly intervals
const pickerHourly = new TimePicker({
  step: 60,
  value: new Date(2026, 0, 1, 14, 0),
  format: 'hh:mm aa'
});
pickerHourly.appendTo('#hourly');
```

## Time Suggestions

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0),
  format: 'hh:mm aa'
});

picker.appendTo('#timepicker');

// Generate time suggestions
function generateTimeSuggestions(): Date[] {
  const suggestions: Date[] = [];
  const businessHourStart = 9;
  const businessHourEnd = 17;
  
  for (let hour = businessHourStart; hour < businessHourEnd; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      suggestions.push(new Date(2026, 0, 1, hour, minute));
    }
  }
  return suggestions;
}

// Display suggestions
const suggestions = generateTimeSuggestions();
const suggestionList = document.getElementById('suggestions');

suggestions.forEach((time) => {
  const option = document.createElement('div');
  option.innerText = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  option.addEventListener('click', () => {
    picker.value = time;
  });
  suggestionList?.appendChild(option);
});
```

## Duration Calculator

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const startTime = new TimePicker({
  value: new Date(2026, 0, 1, 9, 0),
  format: 'hh:mm aa'
});
startTime.appendTo('#startTime');

const endTime = new TimePicker({
  value: new Date(2026, 0, 1, 17, 0),
  format: 'hh:mm aa'
});
endTime.appendTo('#endTime');

// Calculate duration
function calculateDuration(): void {
  if (startTime.value && endTime.value) {
    const start = startTime.value.getTime();
    const end = endTime.value.getTime();
    const diffMs = end - start;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    document.getElementById('duration')!.innerText = 
      `Duration: ${hours}h ${minutes}m`;
  }
}

startTime.change = calculateDuration;
endTime.change = calculateDuration;
```

## Time Slot Booking

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

// Available slots (half-hour increments)
const availableSlots = [
  new Date(2026, 0, 1, 9, 0),
  new Date(2026, 0, 1, 9, 30),
  new Date(2026, 0, 1, 10, 0),
  new Date(2026, 0, 1, 10, 30),
  new Date(2026, 0, 1, 14, 0),
  new Date(2026, 0, 1, 14, 30),
  new Date(2026, 0, 1, 15, 0),
  new Date(2026, 0, 1, 15, 30)
];

// Booked slots
const bookedSlots = [
  new Date(2026, 0, 1, 10, 0),
  new Date(2026, 0, 1, 14, 30)
];

const picker = new TimePicker({
  format: 'hh:mm aa'
});

picker.appendTo('#timepicker');

// Filter available slots
function getAvailableSlots(): Date[] {
  return availableSlots.filter(slot => 
    !bookedSlots.some(booked => 
      booked.getHours() === slot.getHours() && 
      booked.getMinutes() === slot.getMinutes()
    )
  );
}

// Validate selection
picker.change = (args: any) => {
  const isAvailable = getAvailableSlots().some(slot =>
    slot.getHours() === args.value.getHours() && 
    slot.getMinutes() === args.value.getMinutes()
  );
  
  if (isAvailable) {
    document.getElementById('status')!.innerText = 'Slot available - Booking confirmed!';
  } else {
    document.getElementById('status')!.innerText = 'Slot unavailable - Please select another time';
    picker.value = null;
  }
};
```

## Time Range Validation

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const checkInTime = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0),
  min: new Date(2026, 0, 1, 10, 0),
  max: new Date(2026, 0, 1, 20, 0),
  format: 'hh:mm aa'
});
checkInTime.appendTo('#checkIn');

const checkOutTime = new TimePicker({
  value: new Date(2026, 0, 1, 18, 0),
  min: new Date(2026, 0, 1, 10, 0),
  max: new Date(2026, 0, 1, 20, 0),
  format: 'hh:mm aa'
});
checkOutTime.appendTo('#checkOut');

// Validate check-out is after check-in
function validateTimes(): boolean {
  if (checkInTime.value && checkOutTime.value) {
    const isValid = checkOutTime.value > checkInTime.value;
    document.getElementById('validationMsg')!.innerText = 
      isValid ? 'Valid time range' : 'Check-out must be after check-in';
    return isValid;
  }
  return false;
}

checkInTime.change = validateTimes;
checkOutTime.change = validateTimes;
```

## Business Hours Filter

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const businessStart = 9;
const businessEnd = 17;

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0),
  format: 'hh:mm aa',
  change: (args: any) => {
    const hour = args.value?.getHours();
    
    if (hour! < businessStart || hour! >= businessEnd) {
      document.getElementById('alert')!.innerText = 
        `Outside business hours (${businessStart}:00 AM - ${businessEnd}:00 PM)`;
      document.getElementById('alert')!.style.display = 'block';
    } else {
      document.getElementById('alert')!.style.display = 'none';
    }
  }
});

picker.appendTo('#timepicker');
```

## Meeting Duration Preset

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const startTime = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0),
  format: 'hh:mm aa'
});
startTime.appendTo('#startTime');

const endTime = new TimePicker({
  format: 'hh:mm aa'
});
endTime.appendTo('#endTime');

// Quick duration setters
document.getElementById('btn30min')?.addEventListener('click', () => {
  if (startTime.value) {
    const end = new Date(startTime.value);
    end.setMinutes(end.getMinutes() + 30);
    endTime.value = end;
  }
});

document.getElementById('btn1hour')?.addEventListener('click', () => {
  if (startTime.value) {
    const end = new Date(startTime.value);
    end.setHours(end.getHours() + 1);
    endTime.value = end;
  }
});

document.getElementById('btn2hours')?.addEventListener('click', () => {
  if (startTime.value) {
    const end = new Date(startTime.value);
    end.setHours(end.getHours() + 2);
    endTime.value = end;
  }
});
```
