# DateRangePicker Customization and Styling

## CSS Classes

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const picker = new DateRangePicker({
  format: 'dd/MM/yyyy',
  cssClass: 'custom-range-picker'
});

picker.appendTo('#picker');
```

CSS:
```css
.e-daterangepicker.custom-range-picker {
  max-width: 400px;
}

.e-daterangepicker.custom-range-picker .e-input-group {
  border-radius: 8px;
  border: 2px solid #2196f3;
  padding: 10px;
}

.e-daterangepicker.custom-range-picker .e-input {
  font-size: 16px;
  color: #333;
}

.e-daterangepicker.custom-range-picker .e-selected {
  background-color: #2196f3;
  color: white;
}
```

## Themed Variants

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

// Material Theme
const material = new DateRangePicker({
  cssClass: 'material-theme'
});
material.appendTo('#material');

// Dark Theme
const dark = new DateRangePicker({
  cssClass: 'dark-theme'
});
dark.appendTo('#dark');

// Compact Theme
const compact = new DateRangePicker({
  cssClass: 'compact-theme'
});
compact.appendTo('#compact');
```

## Custom Range Highlight

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const picker = new DateRangePicker({
  format: 'yyyy-MM-dd',
  renderDayCell: (args: any) => {
    // Highlight dates in the selected range
    if (picker.startDate && picker.endDate) {
      if (args.date >= picker.startDate && args.date <= picker.endDate) {
        args.element.classList.add('range-highlight');
      }
    }
  }
});

picker.appendTo('#picker');
```

CSS:
```css
.range-highlight {
  background-color: #90caf9 !important;
  color: white;
}
```

## Placeholder and Labels

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const picker = new DateRangePicker({
  placeholder: 'Select check-in to check-out date',
  format: 'dd/MM/yyyy',
  separator: ' - '
});

picker.appendTo('#picker');
```

CSS:
```css
.e-daterangepicker .e-input::placeholder {
  color: #999;
  font-style: italic;
}
```

## Disabled State

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const picker = new DateRangePicker({
  startDate: new Date(2026, 5, 1),
  endDate: new Date(2026, 5, 30),
  enabled: false  // Disabled
});

picker.appendTo('#picker');

function toggleDisabled() {
  picker.enabled = !picker.enabled;
}
```

CSS:
```css
.e-daterangepicker:disabled,
.e-daterangepicker.e-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.e-daterangepicker:disabled .e-input,
.e-daterangepicker.e-disabled .e-input {
  background-color: #f5f5f5;
  color: #999;
}
```

## Responsive Styling

```css
/* Desktop */
.e-daterangepicker {
  max-width: 500px;
}

.e-daterangepicker .e-input-group {
  flex-direction: row;
}

/* Tablet */
@media (max-width: 768px) {
  .e-daterangepicker {
    max-width: 100%;
  }
  
  .e-daterangepicker .e-calendar-container {
    flex-direction: column;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .e-daterangepicker {
    width: 100%;
  }
  
  .e-daterangepicker .e-input {
    font-size: 14px;
    padding: 8px;
  }
}
```

## Dark Mode

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const picker = new DateRangePicker({
  cssClass: 'dark-mode'
});

picker.appendTo('#picker');
```

CSS:
```css
@media (prefers-color-scheme: dark) {
  .e-daterangepicker.dark-mode {
    background-color: #1e1e1e;
  }
  
  .e-daterangepicker.dark-mode .e-input-group {
    background-color: #2d2d2d;
    border-color: #444;
  }
  
  .e-daterangepicker.dark-mode .e-input {
    color: #e0e0e0;
    background-color: #2d2d2d;
  }
  
  .e-daterangepicker.dark-mode .e-selected {
    background-color: #1976d2;
  }
}
```
