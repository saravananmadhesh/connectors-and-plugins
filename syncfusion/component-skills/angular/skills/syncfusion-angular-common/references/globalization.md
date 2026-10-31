# Globalization

## Table of Contents
- [Right-to-Left Support](#right-to-left-support)
- [Localization (l10n)](#localization-l10n)
- [Internationalization (i18n)](#internationalization-i18n)

## Right-to-Left Support

Right-to-Left (RTL) support enables applications to display content correctly for languages written from right to left, such as Arabic, Hebrew, Persian, and Urdu.

### Global RTL Enablement

Enable RTL for all Syncfusion components in your application:

```typescript
// In main.ts
import { enableRtl } from '@syncfusion/ej2-base';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

enableRtl(true);

bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

### Per-Component RTL

Enable RTL only for specific components:

```typescript
import { Component } from '@angular/core';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';

@Component({
  selector: 'app-rtl-list',
  standalone: true,
  imports: [ListViewModule],
  template: `
    <ejs-listview 
      [dataSource]="data" 
      [fields]="fields" 
      enableRtl="true"
      headerTitle="قائمة"
    >
    </ejs-listview>
  `
})
export class RtlListComponent {
  public data: Object[] = [
    { id: 1, text: 'أحمد' },
    { id: 2, text: 'فاطمة' },
    { id: 3, text: 'محمد' }
  ];
  
  public fields: Object = { text: 'text' };
}
```

### RTL with Localization

Combine RTL with proper language settings:

```typescript
import { L10n, setCulture, enableRtl } from '@syncfusion/ej2-base';

// Load locale resources
L10n.load({
  'ar': {
    'Button': {
      'id': 'معرف',
      'date': 'تاريخ'
    }
  }
});

// Set culture
setCulture('ar');

// Enable RTL
enableRtl(true);
```

## Localization (l10n)

### Loading Translations

Load translation strings for different languages:

```typescript
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
  'en': {
    'Button': {
      'id': 'ID',
      'text': 'Submit'
    }
  },
  'fr': {
    'Button': {
      'id': 'Identifiant',
      'text': 'Soumettre'
    }
  },
  'ar': {
    'Button': {
      'id': 'معرف',
      'text': 'إرسال'
    }
  }
});
```

### Using Localized Strings

In component templates:

```typescript
import { Component } from '@angular/core';
import { GridModule } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-localized-grid',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data">
      <e-columns>
        <e-column field="id" headerText="ID" width=90></e-column>
        <e-column field="name" headerText="Name" width=120></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class LocalizedGridComponent {
  data = [
    { id: 1, name: 'Product A' },
    { id: 2, name: 'Product B' }
  ];
}
```

### Culture & Language Switching

### Setting Global Culture

```typescript
import { setCulture } from '@syncfusion/ej2-base';

// Switch to French
setCulture('fr-FR');

// Switch to Arabic
setCulture('ar-SA');

// Switch to German
setCulture('de-DE');
```

### Runtime Culture Switching

```typescript
import { Component } from '@angular/core';
import { setCulture } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-culture-switcher',
  template: `
    <div>
      <select (change)="changeCulture($event)">
        <option value="en-US">English</option>
        <option value="fr-FR">Français</option>
        <option value="de-DE">Deutsch</option>
        <option value="ar-SA">العربية</option>
      </select>
      <p>Current Culture: {{ currentCulture }}</p>
    </div>
  `
})
export class CultureSwitcherComponent {
  currentCulture = 'en-US';

  changeCulture(event: any) {
    const culture = event.target.value;
    setCulture(culture);
    this.currentCulture = culture;
  }
}
```

## Internationalization (i18n)

Internationalization (i18n) enables formatting numbers, dates, and currencies according to different cultures.

### CLDR Data Installation

Install the CLDR data package:

```bash
npm install @syncfusion/ej2-cldr-data@latest
```

### Loading CLDR Data

```typescript
import { loadCldr } from '@syncfusion/ej2-base';
import enNumberData from '@syncfusion/ej2-cldr-data/main/en/numbers.json';
import enTimeZoneData from '@syncfusion/ej2-cldr-data/main/en/timeZoneNames.json';

loadCldr(enNumberData, enTimeZoneData);
```

### Multiple Culture Setup

```typescript
import { loadCldr } from '@syncfusion/ej2-base';
import enData from '@syncfusion/ej2-cldr-data/main/en/all.json';
import frData from '@syncfusion/ej2-cldr-data/main/fr/all.json';
import arData from '@syncfusion/ej2-cldr-data/main/ar/all.json';
import numbersData from '@syncfusion/ej2-cldr-data/supplemental/numberingSystems.json';

loadCldr(enData, frData, arData, numbersData);
```

### Number Formatting

#### Basic Number Formatting

```typescript
import { Component } from '@angular/core';
import { formatNumber } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-number-format',
  template: `<p>{{ formattedNumber }}</p>`
})
export class NumberFormatComponent {
  formattedNumber: string;

  ngOnInit() {
    // Format as currency
    this.formattedNumber = formatNumber(1234.56, { format: 'C2' });
    // Output: $1,234.56 (in en-US)
  }
}
```

#### Number Format Types

| Format | Example | Output |
|--------|---------|--------|
| `N` (Numeric) | `formatNumber(1234.56, {format: 'N2'})` | 1,234.56 |
| `C` (Currency) | `formatNumber(1234.56, {format: 'C2'})` | $1,234.56 |
| `P` (Percentage) | `formatNumber(0.456, {format: 'P2'})` | 45.60% |

#### Custom Number Formats

```typescript
import { formatNumber } from '@syncfusion/ej2-base';

// Define minimum and maximum decimal digits
const options = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: true
};

const formatted = formatNumber(1234567.89, options);
// Output: 1,234,567.89
```

#### Currency Formatting

```typescript
import { formatNumber, setCurrencyCode } from '@syncfusion/ej2-base';

// Set global currency
setCurrencyCode('EUR');

const amount = formatNumber(1234.56, { format: 'C2' });
// Output: €1,234.56 (in compatible locales)
```

### Date & Time Formatting

#### Basic Date Formatting

```typescript
import { Component } from '@angular/core';
import { formatDate } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-date-format',
  template: `<p>{{ formattedDate }}</p>`
})
export class DateFormatComponent {
  formattedDate: string;

  ngOnInit() {
    const date = new Date(2024, 2, 20); // March 20, 2024
    
    // Format with skeleton
    this.formattedDate = formatDate(date, { type: 'date', skeleton: 'long' });
    // Output: March 20, 2024 (in en-US)
  }
}
```

#### Date Format Skeletons

| Skeleton | Example | Output |
|----------|---------|--------|
| `short` | `{type: 'date', skeleton: 'short'}` | 3/20/24 |
| `medium` | `{type: 'date', skeleton: 'medium'}` | Mar 20, 2024 |
| `long` | `{type: 'date', skeleton: 'long'}` | March 20, 2024 |
| `full` | `{type: 'date', skeleton: 'full'}` | Wednesday, March 20, 2024 |

#### Time Format Skeletons

```typescript
import { formatDate } from '@syncfusion/ej2-base';

const now = new Date();

// Short time
const shortTime = formatDate(now, { type: 'time', skeleton: 'short' });
// Output: 2:45 PM

// Medium time
const mediumTime = formatDate(now, { type: 'time', skeleton: 'medium' });
// Output: 2:45:30 PM

// Long time
const longTime = formatDate(now, { type: 'time', skeleton: 'long' });
// Output: 2:45:30 PM GMT+5
```

#### DateTime Formatting

```typescript
import { formatDate } from '@syncfusion/ej2-base';

const date = new Date(2024, 2, 20, 14, 30, 0);

// Short datetime
const shortDt = formatDate(date, { type: 'dateTime', skeleton: 'short' });
// Output: 3/20/24, 2:30 PM

// Long datetime
const longDt = formatDate(date, { type: 'dateTime', skeleton: 'long' });
// Output: March 20, 2024 at 2:30:00 PM GMT+5
```

#### Custom Date Formats

```typescript
import { formatDate } from '@syncfusion/ej2-base';

// Custom format pattern
const customFormat = formatDate(new Date(), { 
  format: "'Date:' dd/MM/yyyy 'Time:' HH:mm:ss" 
});
// Output: Date: 20/03/2024 Time: 14:30:00
```

