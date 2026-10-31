# Globalization

## Table of Contents
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
- [Localization (l10n)](#localization-l10n)
- [Internationalization (i18n)](#internationalization-i18n)

## Right-to-Left (RTL) Support

RTL support is essential for languages like Arabic, Hebrew, and Persian where text flows from right to left.

### Enable RTL Globally

Use the `enableRtl` function to apply RTL rendering to all controls:

```typescript
import { enableRtl } from '@syncfusion/ej2-base';
import { ListView } from '@syncfusion/ej2-lists';

// Enable RTL for all controls
enableRtl(true);

const data: string[] = ["Artwork", "Abstract", "Modern Painting", "Ceramics", "Animation Art", "Oil Painting"];

const listView: ListView = new ListView({
  dataSource: data,
  showHeader: true,
  headerTitle: 'Painting types'
});

listView.appendTo('#list');
```

```html
<div id="list"></div>
```

### Enable RTL for Individual Controls

For selective RTL support, set the `enableRtl` property on specific controls:

```typescript
import { ListView } from '@syncfusion/ej2-lists';

const data: string[] = ["Artwork", "Abstract", "Modern Painting", "Ceramics"];

const listView: ListView = new ListView({
  dataSource: data,
  enableRtl: true,
  showHeader: true,
  headerTitle: 'أنواع الرسم'
});

listView.appendTo('#list');
```

```html
<div id="list"></div>
```

---

## Localization (l10n)

Localization translates static UI text in control into different languages.

### Install Locale Package

```bash
npm install @syncfusion/ej2-locale@latest
```

### Load Translations

Load pre-built locale files for common languages:

```typescript
import { L10n } from '@syncfusion/ej2-base';
import { Grid, Page } from '@syncfusion/ej2-grids';
import * as frLocale from '@syncfusion/ej2-locale/src/fr.json';

L10n.load({ 'fr-FR': frLocale });

// Inject required services
Grid.Inject(Page);

// Create grid with French locale
const grid: Grid = new Grid({
  dataSource: data,
  locale: 'fr-FR',
  allowPaging: true
});

grid.appendTo('#grid');
```

```html
<div id="grid"></div>
```

### Load Custom Translations

```typescript
import { L10n } from '@syncfusion/ej2-base';
import { Grid, Page, Group } from '@syncfusion/ej2-grids';
import { data } from './datasource';

L10n.load({
  'de-DE': {
    'grid': {
      'EmptyRecord': 'Keine Aufzeichnungen angezeigt',
      'GroupDropArea': 'Ziehen Sie einen Spaltenkopf hier, um die Gruppe ihre Spalte'
    },
    'pager': {
      'currentPageInfo': '{0} von {1} Seiten',
      'totalItemsInfo': '({0} Beiträge)'
    }
  }
});

// Inject required services
Grid.Inject(Page, Group);

const grid: Grid = new Grid({
  dataSource: data,
  locale: 'de-DE',  // specify the corresponding locale
  allowPaging: true,
  pageSettings: { pageSize: 6 },
  allowGrouping: true,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'Right' },
    { field: 'CustomerID', headerText: 'Customer ID', width: 150 },
    { field: 'ShipCity', headerText: 'Ship City', width: 150 },
    { field: 'ShipName', headerText: 'Ship Name', width: 150 }
  ]
});

grid.appendTo('#grid');
```

```html
<div id="grid"></div>
```

### Change Global Locale

```typescript
import { L10n, setCulture } from '@syncfusion/ej2-base';

L10n.load({
  'fr-BE': {
    'grid': {
      'EmptyRecord': 'Aucun enregistrement à afficher.',
      'InvalidFilterMessage': 'Données de filtrage invalides.'
    }
  }
});

// Change culture globally
setCulture('fr-BE');
```

---

## Internationalization (i18n)

Internationalization enables formatting of dates, numbers, and currencies according to culture-specific rules using CLDR data.

### Install CLDR Data

```bash
npm install @syncfusion/ej2-cldr-data@latest
```

### Load CLDR Data

```typescript
import { loadCldr } from "@syncfusion/ej2-base";
import enNumberData from "@syncfusion/ej2-cldr-data/main/en/numbers.json";
import enTimeZoneData from "@syncfusion/ej2-cldr-data/main/en/timeZoneNames.json";
import enGregorian from "@syncfusion/ej2-cldr-data/main/en/ca-gregorian.json";
import enCurrencies from "@syncfusion/ej2-cldr-data/main/en/currencies.json";
import numberingSystems from "@syncfusion/ej2-cldr-data/supplemental/numberingSystems.json";

// Load data for English (optional for en-US as it's preloaded)
loadCldr(enNumberData, enTimeZoneData, enGregorian, enCurrencies, numberingSystems);

// Load data for other cultures
import deNumberData from "@syncfusion/ej2-cldr-data/main/de/numbers.json";
import deGregorian from "@syncfusion/ej2-cldr-data/main/de/ca-gregorian.json";

loadCldr(deNumberData, deGregorian, numberingSystems);
```

### Set Global Culture and Currency

```typescript
import { setCulture, setCurrencyCode } from '@syncfusion/ej2-base';

// Set culture to German
setCulture('de-DE');

// Set currency to Euro
setCurrencyCode('EUR');
```

### Format Numbers

```typescript
import { Internationalization } from '@syncfusion/ej2-base';

const intl: Internationalization = new Internationalization();

// Standard number formatting
const numFormatted: string = intl.formatNumber(12345.65, { format: 'N2' });
console.log(numFormatted);  // 12,345.65

// Currency formatting
const currFormatted: string = intl.formatNumber(1234.56, { format: 'C2', currency: 'USD' });
console.log(currFormatted);  // $1,234.56

// Percentage formatting
const percFormatted: string = intl.formatNumber(0.80, { format: 'P2' });
console.log(percFormatted);  // 80.00%
```

### Parse Numbers

```typescript
import { Internationalization } from '@syncfusion/ej2-base';

const intl: Internationalization = new Internationalization();

// Parse formatted number back to numeric value
const parsed: number = intl.parseNumber('$1,234.56', { format: 'C2', currency: 'USD' });
console.log(parsed);  // 1234.56
```

### Date and Time Formatting

Format dates according to culture-specific rules:

```typescript
import { Internationalization } from '@syncfusion/ej2-base';

const intl: Internationalization = new Internationalization();

// Standard date formats
const shortDate: string = intl.formatDate(new Date(), { type: 'date', skeleton: 'short' });
// Output: 11/4/16

const mediumDate: string = intl.formatDate(new Date(), { type: 'date', skeleton: 'medium' });
// Output: Nov 4, 2016

const longDate: string = intl.formatDate(new Date(), { type: 'date', skeleton: 'long' });
// Output: November 4, 2016

const fullDate: string = intl.formatDate(new Date(), { type: 'date', skeleton: 'full' });
// Output: Friday, November 4, 2016

// Time formats
const shortTime: string = intl.formatDate(new Date(), { type: 'time', skeleton: 'short' });
// Output: 1:03 PM

const mediumTime: string = intl.formatDate(new Date(), { type: 'time', skeleton: 'medium' });
// Output: 1:03:04 PM

// DateTime formats
const dateTime: string = intl.formatDate(new Date(), { type: 'dateTime', skeleton: 'full' });
// Output: Friday, November 4, 2016 at 1:03:04 PM GMT+05:30
```

### Custom Date Formats

Use custom format patterns:

```typescript
import { Internationalization } from '@syncfusion/ej2-base';

const intl: Internationalization = new Internationalization();

// Custom patterns using symbols: y, M, d, h, m, s, a, z
const customFormat: string = intl.formatDate(new Date('1/12/2014 10:20:33'), { 
  format: "'year:' y 'month:' MM 'day:' dd" 
});
// Output: year: 2014 month: 01 day: 12
```

### Parse Dates

```typescript
import { Internationalization } from '@syncfusion/ej2-base';

const intl: Internationalization = new Internationalization();

// Parse formatted date string back to Date object
const parsed: Date = intl.parseDate('Nov 4, 2016', { skeleton: 'medium', type: 'date' });
console.log(parsed);  // Date object
```

### Format Specifiers

### Number Format Specifiers

| Specifier | Description | Example |
|-----------|-------------|---------|  
| `N` | Numeric format | `N4` → 1234.5600 |
| `C` | Currency format | `C2` → $1234.56 |
| `P` | Percentage format | `P2` → 80.00% |

### Date Format Symbols

| Symbol | Description | Example |
|--------|-------------|---------|  
| `y` | Year | `yyyy` → 2016, `yy` → 16 |
| `M` | Month | `MM` → 01-12, `MMM` → Jan |
| `d` | Day | `dd` → 01-31 |
| `h` | Hour (12-hour) | `hh` → 01-12 |
| `H` | Hour (24-hour) | `HH` → 00-23 |
| `m` | Minute | `mm` → 00-59 |
| `s` | Second | `ss` → 00-59 |
| `a` | AM/PM | `a` → AM/PM |
| `z` | Timezone | `z` → GMT+5 |
