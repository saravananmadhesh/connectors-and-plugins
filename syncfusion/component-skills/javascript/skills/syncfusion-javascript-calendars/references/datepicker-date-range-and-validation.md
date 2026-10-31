# DatePicker Date Range and Validation

## Min and Max Date Constraints

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const minDate = new Date(2026, 0, 1);    // Jan 1, 2026
const maxDate = new Date(2026, 11, 31);  // Dec 31, 2026
const value = new Date(2026, 6, 15);     // Jul 15, 2026

const picker = new DatePicker({
  value: value,
  min: minDate,
  max: maxDate,
  format: 'yyyy-MM-dd'
});

picker.appendTo('#datepicker');
```

Result: Only dates between Jan 1 and Dec 31, 2026 can be selected. Out-of-range dates appear disabled in calendar.

## Validation Patterns

### Age Verification

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const minAge = 18;

function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const picker = new DatePicker({
  format: 'MM/dd/yyyy',
  change: (args: any) => {
    const age = calculateAge(args.value);
    const errorDiv = document.getElementById('error')!;

    if (age < minAge) {
      errorDiv.innerText = `Must be ${minAge} or older`;
    } else {
      errorDiv.innerText = '';
    }
  }
});

picker.appendTo('#datepicker');
```

### Date Range Validation (Check-In/Check-Out)

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

let checkInDate: Date | null = null;
let checkOutDate: Date | null = null;

const checkInPicker = new DatePicker({
  value: new Date(),
  min: new Date(),
  format: 'yyyy-MM-dd',
  change: (args: any) => {
    checkInDate = args.value;
    // Update checkout min to be after checkin
    if (checkOutDate && checkOutDate <= checkInDate) {
      checkOutDate = null;
      checkOutPicker.value = null;
    }
    checkOutPicker.min = new Date(checkInDate.getTime() + 86400000); // +1 day
  }
});

checkInPicker.appendTo('#checkin');

const checkOutPicker = new DatePicker({
  format: 'yyyy-MM-dd',
  change: (args: any) => {
    checkOutDate = args.value;
    if (checkOutDate && checkOutDate <= checkInDate!) {
      document.getElementById('error')!.innerText = 'Check-out must be after check-in';
    } else {
      document.getElementById('error')!.innerText = '';
    }
  }
});

checkOutPicker.appendTo('#checkout');
```

HTML:
```html
<div>
  <label>Check-in: <input id="checkin" type="text" /></label>
  <label>Check-out: <input id="checkout" type="text" /></label>
  <div id="error" style="color: red;"></div>
</div>
```

### Custom Validation Rules

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const picker = new DatePicker({
  format: 'yyyy-MM-dd',
  change: (args: any) => {
    if (!validateDate(args.value)) {
      document.getElementById('error')!.innerText = 'Invalid date selection';
      picker.value = null;
    }
  }
});

picker.appendTo('#datepicker');

function validateDate(date: Date): boolean {
  // No Fridays the 13th
  if (date.getDate() === 13 && date.getDay() === 5) {
    return false;
  }
  // No holidays (example)
  const holidays = ['12-25', '01-01'];
  const dateStr = `${date.getMonth() + 1}-${date.getDate()}`;
  if (holidays.includes(dateStr)) {
    return false;
  }
  return true;
}
```
