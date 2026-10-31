# Formats – Syncfusion TypeScript NumericTextBox

## Table of Contents
- [Overview](#overview)
- [Standard Formats](#standard-formats)
- [Custom Formats](#custom-formats)
- [Currency Format with currency Property](#currency-format-with-currency-property)

---

## Overview

The `format` property controls how the NumericTextBox displays its value when the component is **unfocused** (blurred). When the user focuses the component, the raw numeric value is shown. The format string supports both standard numeric format strings and custom numeric format strings.

Default format: `'n2'` (number with 2 decimal places).

---

## Standard Formats

Standard format specifiers supported in NumericTextBox:

| Specifier | Meaning | Example value | Example output |
|---|---|---|---|
| `n` | Number | `1234.5` with `'n2'` | `1,234.50` |
| `c` | Currency | `10` with `'c2'` | `$10.00` |
| `p` | Percentage | `0.5` with `'p2'` | `50.00%` |

> For percentage format, the stored `value` is the raw decimal (e.g., `0.5`), and it is displayed as `50.00%`. Set `min: 0` and `max: 1` to constrain the range.

### Percentage Format

```ts
import { NumericTextBox } from '@syncfusion/ej2-inputs';

let percent: NumericTextBox = new NumericTextBox({
  format: 'p2',
  value: 0.5,
  min: 0,
  max: 1,
  step: 0.01,
  placeholder: 'Percentage format',
  floatLabelType: 'Auto'
});

percent.appendTo('#percent');
```

### Currency Format

```ts
import { NumericTextBox } from '@syncfusion/ej2-inputs';

let currency: NumericTextBox = new NumericTextBox({
  format: 'c2',
  value: 10,
  placeholder: 'Currency format',
  floatLabelType: 'Auto'
});

currency.appendTo('#currency');
```

---

## Custom Formats

Custom format strings are built by combining specifiers like `#` and `0`.

| Specifier | Behavior |
|---|---|
| `#` | Digit placeholder – omits leading/trailing zeros |
| `0` | Zero placeholder – pads with zeros if digit is absent |

### Using `#` specifier

```ts
import { NumericTextBox } from '@syncfusion/ej2-inputs';

let numeric: NumericTextBox = new NumericTextBox({
  format: '###.##',   // up to 3 integer digits, up to 2 decimal places
  value: 10,
  placeholder: 'Custom format string #',
  floatLabelType: 'Auto'
});

numeric.appendTo('#numeric');
```

### Using `0` specifier

```ts
import { NumericTextBox } from '@syncfusion/ej2-inputs';

let numeric1: NumericTextBox = new NumericTextBox({
  format: '000.00',   // pads to 3 integer digits and 2 decimal places
  value: 10,
  placeholder: 'Custom format string 0',
  floatLabelType: 'Auto'
});

numeric1.appendTo('#numeric1');
```

---

## Currency Format with `currency` Property

The `currency` property sets an ISO 4217 currency code (e.g., `'USD'`, `'EUR'`, `'GBP'`) to override the default currency symbol used by the `c` format specifier. This is most useful when combined with internationalization (CLDR data).

```ts
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { loadCldr, L10n } from '@syncfusion/ej2-base';
// Import CLDR data (German culture example)
import * as numberingSystems from './numberingSystems.json';
import * as currencyData from './currencyData.json';
import * as numbers from './numbers.json';
import * as currencies from './currencies.json';

loadCldr(numberingSystems, currencyData, numbers, currencies);

L10n.load({
  'de': {
    'numerictextbox': { incrementTitle: 'Wert erhöhen', decrementTitle: 'Dekrementwert' }
  }
});

let currency: NumericTextBox = new NumericTextBox({
  locale: 'de',
  currency: 'EUR',
  format: 'c2',
  value: 100
});

currency.appendTo('#numeric');
```

**Tip:** Always pair `currency` with `format: 'c2'` (or similar `c` specifier) and the appropriate `locale` for correct symbol and grouping.
