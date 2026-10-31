# DatePicker Customization and Styling

## CSS Classes and Theming

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const picker = new DatePicker({
  value: new Date(),
  cssClass: 'custom-theme dark-mode'
});

picker.appendTo('#datepicker');
```

CSS:
```css
.e-datepicker.custom-theme .e-input-group {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.e-datepicker.custom-theme .e-input {
  padding: 12px;
  font-size: 16px;
}

.e-datepicker.dark-mode .e-input-group {
  background-color: #333;
  border-color: #555;
}

.e-datepicker.dark-mode .e-input {
  color: #fff;
  background-color: #333;
}
```

## Custom Calendar Styling

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const picker = new DatePicker({
  value: new Date(),
  renderDayCell: (args: any) => {
    // Highlight weekends
    if (args.date.getDay() === 0 || args.date.getDay() === 6) {
      args.element.classList.add('weekend-cell');
    }
    
    // Disable past dates
    if (args.date < new Date()) {
      args.isDisabled = true;
    }
  }
});

picker.appendTo('#datepicker');
```

CSS:
```css
.weekend-cell {
  background-color: #e8f5e9;
  color: #2e7d32;
}
```

## Placeholder and Styling

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const picker = new DatePicker({
  placeholder: 'Select date (dd/MM/yyyy)',
  format: 'dd/MM/yyyy'
});

picker.appendTo('#datepicker');
```

CSS:
```css
.e-datepicker .e-input::placeholder {
  color: #999;
  font-style: italic;
}
```
