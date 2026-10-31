# DatePicker Globalization and Localization

## Locale Support

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

// English (default)
const enPicker = new DatePicker({
  locale: 'en',
  format: 'MM/dd/yyyy'
});
enPicker.appendTo('#en');

// German
const dePicker = new DatePicker({
  locale: 'de',
  format: 'dd.MM.yyyy'
});
dePicker.appendTo('#de');

// Spanish
const esPicker = new DatePicker({
  locale: 'es',
  format: 'dd/MM/yyyy'
});
esPicker.appendTo('#es');

// French
const frPicker = new DatePicker({
  locale: 'fr',
  format: 'dd/MM/yyyy'
});
frPicker.appendTo('#fr');

// Japanese
const jaPicker = new DatePicker({
  locale: 'ja',
  format: 'yyyy/MM/dd'
});
jaPicker.appendTo('#ja');

// Arabic
const arPicker = new DatePicker({
  locale: 'ar',
  enableRtl: true,
  format: 'dd/MM/yyyy'
});
arPicker.appendTo('#ar');
```

## RTL Support

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const rtlPicker = new DatePicker({
  locale: 'ar',
  enableRtl: true,
  format: 'dd/MM/yyyy'
});

rtlPicker.appendTo('#rtl-datepicker');
```

HTML with RTL:
```html
<html dir="rtl">
  <body>
    <input id="rtl-datepicker" type="text" />
  </body>
</html>
```

CSS:
```css
body[dir="rtl"] .e-datepicker {
  direction: rtl;
  text-align: right;
}
```

## Locale-Specific Formatting

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const today = new Date(2026, 5, 15);

// US: 6/15/2026
const usFormat = new DatePicker({
  locale: 'en-US',
  value: today,
  format: 'MM/dd/yyyy'
});
usFormat.appendTo('#us');

// UK: 15/06/2026
const gbFormat = new DatePicker({
  locale: 'en-GB',
  value: today,
  format: 'dd/MM/yyyy'
});
gbFormat.appendTo('#gb');

// Germany: 15.06.2026
const deFormat = new DatePicker({
  locale: 'de-DE',
  value: today,
  format: 'dd.MM.yyyy'
});
deFormat.appendTo('#de');

// Italy: 15/06/2026
const itFormat = new DatePicker({
  locale: 'it-IT',
  value: today,
  format: 'dd/MM/yyyy'
});
itFormat.appendTo('#it');
```

## Week Start Configuration

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

// Week starts Sunday (US)
const usPicker = new DatePicker({
  value: new Date(),
  firstDayOfWeek: 0  // 0 = Sunday
});
usPicker.appendTo('#us-week');

// Week starts Monday (Europe)
const euPicker = new DatePicker({
  value: new Date(),
  firstDayOfWeek: 1  // 1 = Monday
});
euPicker.appendTo('#eu-week');
```

## Custom Locale

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';
import { load } from '@syncfusion/ej2-base';

// Register custom locale
const customLocale = {
  'en': {
    'datepicker': {
      'placeholder': 'Choose a date',
      'today': 'Today'
    }
  }
};

load(customLocale);

const picker = new DatePicker({
  locale: 'en'
});

picker.appendTo('#datepicker');
```
