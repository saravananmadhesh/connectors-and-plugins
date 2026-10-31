# DateRangePicker Date Range Formatting

## Format Strings

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

// ISO Format
const iso = new DateRangePicker({
  format: 'yyyy-MM-dd',
  separator: ' to '
});
iso.appendTo('#iso');
// Output: "2026-06-01 to 2026-06-30"

// US Format
const us = new DateRangePicker({
  format: 'MM/dd/yyyy',
  separator: ' - '
});
us.appendTo('#us');
// Output: "06/01/2026 - 06/30/2026"

// European Format
const eu = new DateRangePicker({
  format: 'dd/MM/yyyy',
  separator: ' → '
});
eu.appendTo('#eu');
// Output: "01/06/2026 → 30/06/2026"

// Verbose Format
const verbose = new DateRangePicker({
  format: 'MMMM d, yyyy',
  separator: ' through '
});
verbose.appendTo('#verbose');
// Output: "June 1, 2026 through June 30, 2026"
```

## Separator Options

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const pickerDash = new DateRangePicker({
  format: 'dd/MM/yyyy',
  separator: ' - '
});
pickerDash.appendTo('#dash');

const pickerArrow = new DateRangePicker({
  format: 'dd/MM/yyyy',
  separator: ' → '
});
pickerArrow.appendTo('#arrow');

const pickerRange = new DateRangePicker({
  format: 'dd/MM/yyyy',
  separator: '..'
});
pickerRange.appendTo('#range');

const pickerCustom = new DateRangePicker({
  format: 'dd/MM/yyyy',
  separator: ' | to | '
});
pickerCustom.appendTo('#custom');
```

## Localized Formatting

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

// German
const de = new DateRangePicker({
  locale: 'de',
  format: 'dd.MM.yyyy',
  separator: ' - '
});
de.appendTo('#de');

// French  
const fr = new DateRangePicker({
  locale: 'fr',
  format: 'dd/MM/yyyy',
  separator: ' au '
});
fr.appendTo('#fr');

// Japanese
const ja = new DateRangePicker({
  locale: 'ja',
  format: 'yyyy/MM/dd',
  separator: '～'
});
ja.appendTo('#ja');
```

## Custom Display Format

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const picker = new DateRangePicker({
  format: 'yyyy-MM-dd',
  rangeChanged: (args: any) => {
    const formatted = formatRangeCustom(args.startDate, args.endDate);
    document.getElementById('custom-display')!.innerText = formatted;
  }
});

picker.appendTo('#picker');

function formatRangeCustom(start: Date, end: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  };
  
  const startStr = start.toLocaleDateString('en-US', options);
  const endStr = end.toLocaleDateString('en-US', options);
  
  const days = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  ) + 1;
  
  return `${startStr} - ${endStr} (${days} days)`;
}
```

HTML:
```html
<input id="picker" type="text" />
<p>Formatted: <strong id="custom-display"></strong></p>
```
