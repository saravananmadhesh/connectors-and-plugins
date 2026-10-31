# DateTimePicker Date Time Selection

## Single Selection

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

let selectedDateTime: Date | null = null;

const picker = new DateTimePicker({
  value: new Date(),
  format: 'MM/dd/yyyy hh:mm aa',
  change: (args: any) => {
    selectedDateTime = args.value;
    console.log('Date:', selectedDateTime?.toDateString());
    console.log('Time:', selectedDateTime?.toLocaleTimeString());
  }
});

picker.appendTo('#picker');
```

## Getting Components Separately

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const picker = new DateTimePicker({
  value: new Date(2026, 5, 15, 14, 30),
  format: 'MM/dd/yyyy hh:mm aa',
  change: (args: any) => {
    const date = args.value;
    
    // Extract date
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    // Extract time
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    console.log('Date:', dateOnly);
    console.log('Time:', `${hours}:${minutes}:${seconds}`);
  }
});

picker.appendTo('#picker');
```

## Setting DateTime Programmatically

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const picker = new DateTimePicker();
picker.appendTo('#picker');

function setToNow() {
  picker.value = new Date();
}

function setToFutureTime() {
  const future = new Date();
  future.setHours(future.getHours() + 2);  // 2 hours from now
  future.setMinutes(0);
  future.setSeconds(0);
  picker.value = future;
}

function setToMidnight() {
  const midnight = new Date();
  midnight.setHours(0, 0, 0, 0);
  picker.value = midnight;
}
```

## Appointment Scheduling

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

let appointment: { start: Date; duration: number } = {
  start: new Date(),
  duration: 60  // minutes
};

const picker = new DateTimePicker({
  value: new Date(),
  format: 'MM/dd/yyyy hh:mm aa',
  step: 30,
  change: (args: any) => {
    appointment.start = args.value;
    updateAppointmentInfo();
  }
});

picker.appendTo('#appointment-time');

function updateAppointmentInfo() {
  const endTime = new Date(appointment.start);
  endTime.setMinutes(endTime.getMinutes() + appointment.duration);
  
  document.getElementById('info')!.innerHTML = `
    Start: ${appointment.start.toLocaleString()}<br/>
    End: ${endTime.toLocaleString()}<br/>
    Duration: ${appointment.duration} minutes
  `;
}

// Duration selector
document.getElementById('duration')!.addEventListener('change', (e: any) => {
  appointment.duration = parseInt(e.target.value);
  updateAppointmentInfo();
});
```

HTML:
```html
<label>Appointment Time:</label>
<input id="appointment-time" type="text" />

<label>Duration:</label>
<select id="duration">
  <option value="30">30 minutes</option>
  <option value="60" selected>1 hour</option>
  <option value="90">1.5 hours</option>
  <option value="120">2 hours</option>
</select>

<div id="info"></div>
```
