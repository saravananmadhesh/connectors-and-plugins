---
name: localization
description: 'Localization and Internationalization in Syncfusion Grid: multi-language support, locale setup, number/date/currency formatting, RTL support.'
---

# Localization & Internationalization

## Table of Contents
- [Overview](#overview)
- [Localization Setup](#localization-setup)
- [Culture Configuration](#culture-configuration)
- [Number Formatting](#number-formatting)
- [Date Formatting](#date-formatting)
- [Currency Formatting](#currency-formatting)
- [RTL Support](#rtl-support)
- [Custom Localization](#custom-localization)
- [Best Practices](#best-practices)

## When to Use This Reference

- Translate grid UI text and labels to different languages
- Configure locale-specific date and number formats
- Support multiple language switching
- Customize localization strings for the grid
- Implement right-to-left language support

## Overview

Syncfusion JavaScript Grid supports 60+ languages and locales, providing automatic formatting based on culture settings. All UI text, pager messages, and validation errors adapt to the selected locale.

---

## Localization Setup

### Set Grid Locale

```ts
import { Grid, Page } from '@syncfusion/ej2-grids';
import { setLocale } from '@syncfusion/ej2-base';

Grid.Inject(Page);

// Set locale for all Syncfusion components
setLocale('de');  // German
// setLocale('fr');  // French
// setLocale('es');  // Spanish
// setLocale('ja');  // Japanese
// setLocale('zh');  // Chinese
// setLocale('ar');  // Arabic
// setLocale('pt');  // Portuguese

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 }
  ],
  locale: 'de',
  allowPaging: true
});

grid.appendTo('#grid');
```

### Available Locales

```ts
// Common locales
const locales = [
  'en',      // English
  'de',      // German
  'fr',      // French
  'es',      // Spanish
  'it',      // Italian
  'pt-BR',   // Portuguese (Brazil)
  'ja',      // Japanese
  'zh',      // Chinese Simplified
  'zh-TW',   // Chinese Traditional
  'ko',      // Korean
  'ru',      // Russian
  'ar',      // Arabic
  'he',      // Hebrew
  'fa',      // Farsi
  'hi',      // Hindi
  'vi',      // Vietnamese
  'th',      // Thai
  'tr',      // Turkish
  'pl',      // Polish
  'nl',      // Dutch
];

const handleLocaleChange = (locale: string) => {
  setLocale(locale);
  gridInstance.locale = locale;
  // Grid updates automatically
};

document.getElementById('localeSelect')?.addEventListener('change', (e: any) => {
  handleLocaleChange(e.target.value);
});
```

---

## Culture Configuration

### Date Culture Settings

```ts
import { Grid, Page } from '@syncfusion/ej2-grids';
import { setCulture } from '@syncfusion/ej2-base';

Grid.Inject(Page);

// Set culture (automatically sets locale, date/number format)
setCulture('de-DE');  // German - Germany
setCulture('en-US');  // English - United States
setCulture('ja-JP');  // Japanese - Japan
setCulture('zh-CN');  // Chinese - China

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    {
      field: 'OrderDate',
      headerText: 'Order Date',
      type: 'date',
      format: 'dd/MM/yyyy'  // German format
    }
  ],
  locale: 'de-DE',
  allowPaging: true
});

grid.appendTo('#grid');
```

### Browser Locale Auto-Detection

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    {
      field: 'OrderDate',
      headerText: 'Order Date',
      type: 'date',
      format: 'short'
    }
  ],
  locale: navigator.language,  // e.g., 'en-US'
  allowPaging: true
});

grid.appendTo('#grid');
```

---

## Number Formatting

### Automatic Culture-Based Formatting

```ts
// German (de-DE): Uses comma as decimal separator
// En-US: Uses period as decimal separator

const grid = new Grid({
  dataSource: data,
  columns: [
    {
      field: 'Freight',
      headerText: 'Freight',
      type: 'number',
      format: 'N2'  // 2 decimal places
    }
  ],
  locale: 'de-DE'
});

grid.appendTo('#grid');

// Results:
// de-DE: 1.234,56
// en-US: 1,234.56
// fr-FR: 1 234,56
```

### Number Format Examples

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    {
      field: 'Discount',
      headerText: 'Discount',
      type: 'number',
      format: 'P2'  // 15,50% (German format)
    },
    {
      field: 'Freight',
      headerText: 'Freight',
      type: 'number',
      format: 'C2'  // €1.234,56 (German format)
    },
    {
      field: 'Amount',
      headerText: 'Amount',
      type: 'number',
      format: 'N0'  // 1.234.567 (German thousands separator)
    }
  ],
  locale: 'de-DE'
});

grid.appendTo('#grid');
```

---

## Date Formatting

### Culture-Aware Date Formats

```ts
// English - US format
const gridUS = new Grid({
  dataSource: data,
  columns: [
    {
      field: 'OrderDate',
      headerText: 'Order Date',
      type: 'date',
      format: 'short'
      // Result: 3/15/2023
    }
  ],
  locale: 'en-US'
});
gridUS.appendTo('#gridUS');

// German format
const gridDE = new Grid({
  dataSource: data,
  columns: [
    {
      field: 'OrderDate',
      headerText: 'Order Date',
      type: 'date',
      format: 'short'
      // Result: 15.03.2023
    }
  ],
  locale: 'de-DE'
});
gridDE.appendTo('#gridDE');

// Japanese format
const gridJA = new Grid({
  dataSource: data,
  columns: [
    {
      field: 'OrderDate',
      headerText: 'Order Date',
      type: 'date',
      format: 'short'
      // Result: 2023/3/15
    }
  ],
  locale: 'ja-JP'
});
gridJA.appendTo('#gridJA');
```

### Date Format Codes

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    {
      field: 'OrderDate',
      headerText: 'Order Date',
      type: 'date',
      format: 'yMd'  // Combined format code
    },
    {
      field: 'DeliveryDate',
      headerText: 'Delivery Date',
      type: 'date',
      format: 'MMM/dd/yyyy'  // Custom pattern
    },
    {
      field: 'CreatedAt',
      headerText: 'Created At',
      type: 'datetime',
      format: 'MM/dd/yyyy hh:mm a'  // Date + time
    }
  ],
  locale: 'en-US'
});

grid.appendTo('#grid');
```

### Date Picker Locale

```ts
import { Grid, Edit } from '@syncfusion/ej2-grids';

Grid.Inject(Edit);

const grid = new Grid({
  dataSource: data,
  columns: [
    {
      field: 'OrderDate',
      headerText: 'Order Date',
      type: 'date',
      editParams: {
        locale: 'de-DE'  // DatePicker uses German locale
      }
    }
  ],
  editSettings: { mode: 'Dialog' },
  locale: 'de-DE'
});

grid.appendTo('#grid');
```

---

## Currency Formatting

### Automatic Currency by Locale

```ts
// Format as currency with automatic symbol
const grid = new Grid({
  dataSource: data,
  columns: [
    {
      field: 'Freight',
      headerText: 'Freight',
      type: 'number',
      format: 'C2'  // Currency with 2 decimals
    }
  ],
  locale: 'en-US'
});

grid.appendTo('#grid');

// Results by locale:
// en-US: $1,234.56
// de-DE: 1.234,56 €
// fr-FR: 1 234,56 €
// ja-JP: ¥1234
// gb: £1,234.56
```

### Custom Currency Format

```ts
import { Grid } from '@syncfusion/ej2-grids';

const grid = new Grid({
  dataSource: data,
  columns: [
    {
      field: 'Freight',
      headerText: 'Freight',
      template: (props: any) => {
        const userCurrency = getUserCurrency();  // 'USD', 'EUR', 'GBP', etc.
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: userCurrency,
          minimumFractionDigits: 2
        }).format(props.Freight);
        return formatted;
      }
    }
  ]
});

grid.appendTo('#grid');

function getUserCurrency(): string {
  return 'USD';  // Get from user settings
}
```

---

## RTL Support

### Enable Right-to-Left Layout

```ts
import { Grid } from '@syncfusion/ej2-grids';
import { enableRtl } from '@syncfusion/ej2-base';

// Enable RTL globally
enableRtl(true);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'معرّف الطلب', width: 100 },
    { field: 'CustomerID', headerText: 'معرّف العميل', width: 120 }
  ],
  locale: 'ar',  // Arabic
  enableRtl: true
});

grid.appendTo('#grid');
```

### Conditional RTL

```ts
import { Grid } from '@syncfusion/ej2-grids';
import { enableRtl } from '@syncfusion/ej2-base';

let isRTL = false;
let gridInstance: Grid;

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 }
  ],
  locale: 'en',
  enableRtl: false
});

grid.appendTo('#grid');
gridInstance = grid;

function toggleRTL() {
  isRTL = !isRTL;
  enableRtl(isRTL);
  gridInstance.locale = isRTL ? 'ar' : 'en';
  gridInstance.enableRtl = isRTL;
}

document.getElementById('rtlToggle')?.addEventListener('click', toggleRTL);
```

### RTL CSS

```css
/* Apply RTL styles */
[data-rtl='true'] .e-grid {
  direction: rtl;
  text-align: right;
}

[data-rtl='true'] .e-grid .e-gridheader {
  text-align: right;
}

[data-rtl='true'] .e-grid .e-gridcontent td {
  text-align: right;
}

[data-rtl='true'] .e-grid .e-sortindicator::before {
  left: auto;
  right: 2px;
}
```

---

## Custom Localization

### Override Default Messages

```ts
import { Grid } from '@syncfusion/ej2-grids';
import { L10n } from '@syncfusion/ej2-base';

// Define custom locale strings
L10n.load({
  'de': {
    'grid': {
      'EmptyRecord': 'Keine Datensätze gefunden',
      'Pagerformat': '{0} to {1} von {2} Elementen',
      'BatchSaveConfirm': 'Möchten Sie die Änderungen speichern?',
      'BatchDeleteConfirm': 'Möchten Sie die ausgewählten Datensätze löschen?'
    }
  }
});

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 }
  ],
  locale: 'de'
});

grid.appendTo('#grid');
```

### Custom Messages Examples

```ts
L10n.load({
  'en': {
    'grid': {
      // Paging
      'Pagerformat': 'Showing {0} to {1} of {2} records',
      'PagerItemsPerPage': 'Items per page',
      
      // Sorting
      'SortAscending': 'Sort Ascending',
      'SortDescending': 'Sort Descending',
      
      // Filtering
      'NoRecordsToDisplay': 'No records to display',
      'SerialNumberColumn': '#',
      
      // Editing
      'EditOperationAlert': 'No records selected for edit operation',
      'DeleteOperationAlert': 'No records selected for delete operation',
      'SaveButton': 'Save',
      'CancelButton': 'Cancel',
      'EditButton': 'Edit',
      'DeleteButton': 'Delete',
      
      // Grouping  
      'GroupDropArea': 'Drag a column header here to group its column',
      
      // Export
      'ExcelExport': 'Excel Export',
      'PdfExport': 'PDF Export',
      'CsvExport': 'CSV Export'
    }
  }
});
```

### Language Switcher

```ts
import { Grid, Page } from '@syncfusion/ej2-grids';
import { setLocale } from '@syncfusion/ej2-base';

Grid.Inject(Page);

let currentLanguage = 'en';
let gridInstance: Grid;

const languages = {
  'en': 'English',
  'de': 'Deutsch',
  'fr': 'Français',
  'es': 'Español',
  'ja': '日本語',
  'ar': 'العربية'
};

// Initialize grid
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'Freight', headerText: 'Freight', width: 120, format: 'C2' }
  ],
  locale: currentLanguage,
  allowPaging: true,
  pageSettings: { pageSize: 10 }
});

grid.appendTo('#grid');
gridInstance = grid;

// Create language selector
const languageSelect = document.getElementById('languageSelect') as HTMLSelectElement;

if (languageSelect) {
  // Populate options
  Object.entries(languages).forEach(([code, name]) => {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = name;
    languageSelect.appendChild(option);
  });

  // Handle language change
  languageSelect.addEventListener('change', (e: any) => {
    currentLanguage = e.target.value;
    setLocale(currentLanguage);
    gridInstance.locale = currentLanguage;
  });
}

// HTML
const html = `
  <select id="languageSelect">
    <option value="en">English</option>
  </select>
  <div id="grid"></div>
`;
```

---

## Best Practices

1. **Use locale codes** (en-US, de-DE, etc.)
2. **Set culture early** in application
3. **Test all locales** with real data
4. **Use format codes** for automatic locale formatting
5. **Provide language switcher** if needed
6. **Support RTL languages** properly
7. **Test with special characters** in each locale
8. **Document locale support** for users
9. **Use browser locale** as default
10. **Cache locale settings** in user preferences
