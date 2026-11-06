# Globalization – Syncfusion TypeScript NumericTextBox

## Table of Contents
- [Localization](#localization)
- [Internationalization (CLDR)](#internationalization-cldr)
- [Right-to-Left (RTL)](#right-to-left-rtl)

---

## Localization

The `locale` property sets the culture for the NumericTextBox. Localization affects:
- Number grouping and decimal separators
- Spin button tooltip text (via `L10n`)

Default locale: `'en-US'`.

Locale keys available for override:

| Key | Default (en-US) |
|---|---|
| `incrementTitle` | Increment value |
| `decrementTitle` | Decrement value |

### Overriding Spin Button Tooltips

Use `L10n.load()` from `@syncfusion/ej2-base` to provide translated tooltip text:

```ts
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
  'de': {
    'numerictextbox': {
      incrementTitle: 'Wert erhöhen',
      decrementTitle: 'Dekrementwert'
    }
  }
});

let numeric: NumericTextBox = new NumericTextBox({
  locale: 'de',
  value: 10
});

numeric.appendTo('#numeric');
```

---

## Internationalization (CLDR)

For full number formatting based on Unicode CLDR data (grouping separators, currency symbols, etc.), load CLDR data before rendering the component.

### Step 1: Install CLDR Data

```bash
npm install cldr-data --save
npm install systemjs-plugin-json --save-dev
```

### Step 2: Configure SystemJS (system.config.js)

```ts
System.config({
  paths: { 'syncfusion:': 'npm:@syncfusion/' },
  map: {
    app: 'app',
    '@syncfusion/ej2-base': 'syncfusion:ej2-base/dist/ej2-base.umd.min.js',
    '@syncfusion/ej2-inputs': 'syncfusion:ej2-inputs/dist/ej2-inputs.umd.min.js',
    'cldr-data': 'npm:cldr-data',
    'plugin-json': 'npm:systemjs-plugin-json/json.js'
  },
  meta: { '*.json': { loader: 'plugin-json' } },
  packages: {
    'app': { main: 'app', defaultExtension: 'js' },
    'cldr-data': { main: 'index.js', defaultExtension: 'js' }
  }
});
System.import('app');
```

### Step 3: Load CLDR JSON Data

```ts
declare var require: any;
import { loadCldr } from '@syncfusion/ej2-base';

loadCldr(
  require('cldr-data/main/de/numbers.json'),
  require('cldr-data/main/de/currencies.json'),
  require('cldr-data/supplemental/numberingSystems.json'),
  require('cldr-data/supplemental/currencyData.json')
);
```

### Step 4: Render with Locale and Currency

```ts
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { loadCldr, L10n } from '@syncfusion/ej2-base';
// In a real project, import from node_modules/cldr-data paths
import * as numberingSystems from './numberingSystems.json';
import * as currencyData from './currencyData.json';
import * as numbers from './numbers.json';
import * as currencies from './currencies.json';

loadCldr(numberingSystems, currencyData, numbers, currencies);

L10n.load({
  'de': {
    'numerictextbox': {
      incrementTitle: 'Wert erhöhen',
      decrementTitle: 'Dekrementwert'
    }
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

---

## Right-to-Left (RTL)

Set `enableRtl: true` to flip the text direction and component layout for right-to-left languages (Arabic, Farsi, Hebrew, Urdu, etc.).

```ts
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
  'ar-AE': {
    'numerictextbox': {
      incrementTitle: 'قيمة الزيادة',
      decrementTitle: 'قيمة تناقص'
    }
  }
});

let numeric: NumericTextBox = new NumericTextBox({
  locale: 'ar-AE',
  value: 100,
  placeholder: 'أدخل القيمة',
  enableRtl: true,
  floatLabelType: 'Auto'
});

numeric.appendTo('#numeric');
```

**Key notes:**
- Always pair `enableRtl` with the appropriate `locale` for correct number formatting.
- Provide translated tooltip strings via `L10n.load()` for the target locale's `incrementTitle` / `decrementTitle`.
