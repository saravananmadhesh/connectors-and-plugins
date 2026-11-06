# DateTimePicker Accessibility

## Keyboard Navigation

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const picker = new DateTimePicker({
  value: new Date(),
  format: 'MM/dd/yyyy hh:mm aa'
});

picker.appendTo('#picker');
```

Supported keyboard shortcuts:
- `Alt + Down` — Open picker
- `Escape` — Close picker
- `Arrow Keys` — Navigate in calendar
- `Tab` — Move to next field
- `Enter` — Select time

## ARIA Labels

```html
<label for="appointment">Appointment Date and Time:</label>
<input id="appointment" type="text" aria-label="Select appointment date and time" />

<div id="status" aria-live="polite" role="status"></div>
```

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const picker = new DateTimePicker({
  change: (args: any) => {
    const status = document.getElementById('status')!;
    status.innerText = `Appointment set for ${args.value.toLocaleString()}`;
  }
});

picker.appendTo('#appointment');
```

## Screen Reader Support

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const picker = new DateTimePicker({
  created: () => {
    const input = picker.element as HTMLInputElement;
    input.setAttribute('aria-label', 'Date and time picker for appointment scheduling');
  },
  change: (args: any) => {
    // Announce selection to screen readers
    const announcement = document.getElementById('announcement')!;
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    
    const formatted = args.value.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) + ' at ' + args.value.toLocaleTimeString();
    
    announcement.innerText = `Date and time selected: ${formatted}`;
  }
});

picker.appendTo('#picker');
```

HTML:
```html
<div id="announcement" class="sr-only"></div>
```

CSS:
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

## Focus Management

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const picker = new DateTimePicker({
  created: () => {
    // Auto-focus on creation
    (picker.element as HTMLInputElement).focus();
  }
});

picker.appendTo('#picker');
```

## High Contrast Mode

```css
@media (prefers-contrast: more) {
  .e-datetimepicker .e-input-group {
    border: 2px solid;
    border-color: currentColor;
  }
  
  .e-datetimepicker .e-input {
    font-weight: bold;
  }
  
  .e-datetimepicker:focus-within .e-input-group {
    outline: 3px solid currentColor;
    outline-offset: 2px;
  }
}
```

## Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  .e-datetimepicker,
  .e-datetimepicker * {
    animation: none !important;
    transition: none !important;
  }
}
```

## Accessible Form Integration

```html
<form>
  <div class="form-group">
    <label for="appointment-date">Appointment Date and Time:</label>
    <p id="appointment-help">Select your preferred appointment date and time (working hours: 9 AM - 5 PM)</p>
    <input id="appointment-date" 
           type="text" 
           aria-describedby="appointment-help"
           aria-required="true" />
    <div id="appointment-error" role="alert" aria-live="polite"></div>
  </div>
  
  <button type="submit">Book Appointment</button>
</form>
```

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const businessStart = 9;
const businessEnd = 17;

const picker = new DateTimePicker({
  format: 'MM/dd/yyyy hh:mm aa',
  change: (args: any) => {
    const hour = args.value.getHours();
    const errorDiv = document.getElementById('appointment-error')!;
    const input = picker.element as HTMLInputElement;
    
    if (hour < businessStart || hour >= businessEnd) {
      input.setAttribute('aria-invalid', 'true');
      errorDiv.innerText = 'Please select a time between 9 AM and 5 PM';
    } else {
      input.setAttribute('aria-invalid', 'false');
      errorDiv.innerText = '';
    }
  }
});

picker.appendTo('#appointment-date');
```
