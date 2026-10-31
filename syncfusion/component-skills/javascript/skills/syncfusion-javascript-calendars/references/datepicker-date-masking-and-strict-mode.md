# DatePicker Date Masking and Strict Mode

## Input Masking

Enable automatic formatting as user types:

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const picker = new DatePicker({
  value: new Date(),
  format: 'MM/dd/yyyy',
  enableMask: true
});

picker.appendTo('#datepicker');
```

With masking:
- Type `1` → Shows `1_/__/____`
- Type `5` → Shows `15/__/____`
- Type `0` → Shows `15/0_/____`
- Type `6` → Shows `15/06/____`
- Type `2026` → Shows `15/06/2026`

## Strict Mode Validation

Enforce strict format compliance:

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const picker = new DatePicker({
  format: 'MM/dd/yyyy',
  enableMask: true,
  strictMode: true  // Validate strictly
});

picker.appendTo('#datepicker');
```

With `strictMode: true`:
- Rejects invalid characters
- Rejects invalid dates (e.g., 02/30/2026)
- Requires exact format compliance
- Invalid input is not accepted

## Combined Masking + Strict Example

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

let dateValue: Date | null = null;

const picker = new DatePicker({
  format: 'dd-MMM-yyyy',
  enableMask: true,
  strictMode: true,
  change: (args: any) => {
    dateValue = args.value;
    console.log('Valid date entered:', dateValue);
  }
});

picker.appendTo('#datepicker');
```

HTML:
```html
<input id="datepicker" type="text" />
<p id="status"></p>
```
