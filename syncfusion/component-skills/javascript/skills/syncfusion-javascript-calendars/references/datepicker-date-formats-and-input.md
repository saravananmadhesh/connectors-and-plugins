# DatePicker Date Formats and Input

## Format Strings

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

// ISO Format (yyyy-MM-dd)
const isoFormat = new DatePicker({ format: 'yyyy-MM-dd' });
isoFormat.appendTo('#iso');

// US Format (MM/dd/yyyy)
const usFormat = new DatePicker({ format: 'MM/dd/yyyy' });
usFormat.appendTo('#us');

// European Format (dd/MM/yyyy)
const euFormat = new DatePicker({ format: 'dd/MM/yyyy' });
euFormat.appendTo('#eu');

// Long Format (MMMM d, yyyy)
const longFormat = new DatePicker({ format: 'MMMM d, yyyy' });
longFormat.appendTo('#long');

// Date with Time (yyyy-MM-dd HH:mm)
const dateTime = new DatePicker({ format: 'yyyy-MM-dd HH:mm' });
dateTime.appendTo('#datetime');
```

## Localized Formats

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

// German (de-DE): 15.06.2026
const pickerDE = new DatePicker({
  locale: 'de',
  format: 'dd.MM.yyyy'
});
pickerDE.appendTo('#de');

// French (fr-FR): 15/06/2026
const pickerFR = new DatePicker({
  locale: 'fr',
  format: 'dd/MM/yyyy'
});
pickerFR.appendTo('#fr');

// Japanese (ja-JP): 2026/06/15
const pickerJA = new DatePicker({
  locale: 'ja',
  format: 'yyyy/MM/dd'
});
pickerJA.appendTo('#ja');
```

## Input Validation

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const picker = new DatePicker({
  format: 'MM/dd/yyyy',
  change: (args: any) => {
    const input = picker.element as HTMLInputElement;
    
    if (!args.value) {
      input.classList.add('invalid');
      document.getElementById('error')!.innerText = 'Date is required';
    } else if (isNaN(args.value.getTime())) {
      input.classList.add('invalid');
      document.getElementById('error')!.innerText = 'Invalid date format';
    } else {
      input.classList.remove('invalid');
      document.getElementById('error')!.innerText = '';
    }
  }
});

picker.appendTo('#datepicker');
```

CSS:
```css
.e-input.invalid {
  border-color: #f44336 !important;
  background-color: #ffebee;
}
```
