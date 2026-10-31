# DateTimePicker Styling and Customization

## CSS Classes

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const picker = new DateTimePicker({
  format: 'MM/dd/yyyy hh:mm aa',
  cssClass: 'custom-datetime-picker'
});

picker.appendTo('#picker');
```

CSS:
```css
.e-datetimepicker.custom-datetime-picker .e-input-group {
  border-radius: 8px;
  border: 2px solid #2196f3;
}

.e-datetimepicker.custom-datetime-picker .e-input {
  padding: 12px;
  font-size: 16px;
}
```

## Dark Theme

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const picker = new DateTimePicker({
  cssClass: 'dark-theme'
});

picker.appendTo('#picker');
```

CSS:
```css
.e-datetimepicker.dark-theme .e-input-group {
  background-color: #2d2d2d;
  border-color: #444;
}

.e-datetimepicker.dark-theme .e-input {
  color: #e0e0e0;
  background-color: #2d2d2d;
}
```

## Custom Placeholder

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const picker = new DateTimePicker({
  placeholder: 'Select date and time (e.g., 06/15/2026 02:30 PM)',
  format: 'MM/dd/yyyy hh:mm aa'
});

picker.appendTo('#picker');
```

CSS:
```css
.e-datetimepicker .e-input::placeholder {
  color: #999;
  font-style: italic;
}
```

## Responsive Design

```css
@media (max-width: 768px) {
  .e-datetimepicker {
    max-width: 100%;
  }
  
  .e-datetimepicker .e-input {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .e-datetimepicker .e-input-group {
    flex-direction: column;
  }
}
```

## Disabled State

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const picker = new DateTimePicker({
  value: new Date(),
  enabled: false
});

picker.appendTo('#picker');
```

CSS:
```css
.e-datetimepicker:disabled .e-input {
  background-color: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}
```
