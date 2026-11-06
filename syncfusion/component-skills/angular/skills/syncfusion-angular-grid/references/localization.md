# Localization & Globalization in Angular Grid

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Localization Setup](#localization-setup)
- [Culture Configuration](#culture-configuration)
- [Number Formatting](#number-formatting)
- [Date Formatting](#date-formatting)
- [Currency Formatting](#currency-formatting)
- [RTL Support](#rtl-support)
- [Custom Localization](#custom-localization)

## When to Use This Skill

Use this skill when you need to:
- **Multi-language support** — Translate grid UI strings and messages
- **Locale formatting** — Format dates, numbers, currency by culture
- **Number formatting** — Display numbers with locale-specific separators
- **Currency display** — Show amounts in different currency formats
- **Date formatting** — Display dates in culture-appropriate formats
- **RTL support** — Support right-to-left languages like Arabic, Hebrew
- **Custom translations** — Provide custom localization strings
- **International applications** — Build grids for global audiences

## Overview

Syncfusion React Grid supports 60+ languages and locales, providing automatic formatting based on culture settings.

---

## Localization Setup

### Set Grid Locale

```typescript
import { Component } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { setLocale } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-grid',
  template: `
    <ejs-grid #grid [dataSource]="data" locale="de">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridComponent {
  data = [];
  
  constructor() {
    // Set locale for all Syncfusion components
    setLocale('de');  // German
  }
}
```

### Available Locales

```typescript
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

const handleLocaleChange = (locale) => {
  setLocale(locale);
  // Grid updates automatically
};
```

---

## Culture Configuration

### Date Culture Settings

```typescript
import { Component } from '@angular/core';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page } from '@syncfusion/ej2-angular-grids';
import { setCulture } from '@syncfusion/ej2-base';

// Set culture (automatically sets locale, date/number format)
setCulture('de-DE');  // German - Germany
setCulture('en-US');  // English - United States
setCulture('ja-JP');  // Japanese - Japan
setCulture('zh-CN');  // Chinese - China

// In component template:
<ejs-grid [dataSource]="data" locale="de-DE">
  <e-columns>
    <e-column field="OrderDate" headerText="Order Date" type="date" format="dd/MM/yyyy"></e-column>
  </e-columns>
</ejs-grid>

// In component class:
export class LocalizedGridComponent implements OnInit {
  data: any[] = [];

  ngOnInit() {
    setCulture('de-DE');
    }
  }

```

### Browser Locale Auto-Detection

```typescript
import { Component } from '@angular/core';
import { getCulture } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-grid',
  template: `
    <ejs-grid [dataSource]="data" [locale]="browserLocale">
      <e-columns>
        <e-column field="OrderDate" type="date" format="short"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridComponent {
  browserLocale = navigator.language;  // e.g., 'en-US'
  data = [];
}
```

---

## Number Formatting

### Automatic Culture-Based Formatting

```typescript
// German (de-DE): Uses comma as decimal separator
// En-US: Uses period as decimal separator

<e-column
  field='Freight'
  headerText='Freight'
  type='number'
  format='N2'  // 2 decimal places
/>

// Results:
// de-DE: 1.234,56 EUR
// en-US: 1,234.56 USD
// fr-FR: 1 234,56 €
```

### Number Format Examples

```typescript
export class NumberFormatGridComponent implements OnInit {
  data: any[] = [];
  locale = 'de-DE';
  
  ngOnInit() {
    setCulture(this.locale);
    this.loadData();
  }
  
  loadData() {
    this.data = [
      // Percentage: 15,50% (German format)
      // Currency: €1.234,56 (German format)
      // Large numbers: 1.234.567 (German thousands separator)
    ];
  }
}

// In template:
<ejs-grid [dataSource]="data" [locale]="locale">
  <e-columns>
    <e-column field="Discount" type="number" format="P2"></e-column>
    <e-column field="Freight" type="number" format="C2"></e-column>
    <e-column field="Amount" type="number" format="N0"></e-column>
  </e-columns>
</ejs-grid>
```

---

## Date Formatting

### Culture-Aware Date Formats

```typescript
export class DateFormatGridComponent implements OnInit {
  dataUS: any[] = [];
  dataDE: any[] = [];
  dataJP: any[] = [];
  
  ngOnInit() {
    this.loadData();
  }
  
  loadData() {
    // Grid with en-US locale: 3/15/2023
    // Grid with de-DE locale: 15.03.2023
    // Grid with ja-JP locale: 2023/3/15
  }
}

// In template:
<ejs-grid [dataSource]="dataUS" locale="en-US">
  <e-columns>
    <e-column field="OrderDate" type="date" format="short"></e-column>
  </e-columns>
</ejs-grid>

<ejs-grid [dataSource]="dataDE" locale="de-DE">
  <e-columns>
    <e-column field="OrderDate" type="date" format="short"></e-column>
  </e-columns>
</ejs-grid>

<ejs-grid [dataSource]="dataJP" locale="ja-JP">
  <e-columns>
    <e-column field="OrderDate" type="date" format="short"></e-column>
  </e-columns>
</ejs-grid>
```

### Date Format Codes

```typescript
export class DateFormatCodesGridComponent implements OnInit {
  data: any[] = [];
  
  ngOnInit() {
    this.loadData();
  }
  
  loadData() {
    // Data loaded from service
  }
}

// In template:
<ejs-grid [dataSource]="data">
  <e-columns>
    <e-column field="OrderDate" type="date" format="yMd"></e-column>
    <e-column field="OrderDate" type="date" format="MMM/dd/yyyy"></e-column>
    <e-column field="OrderDate" type="datetime" format="MM/dd/yyyy hh:mm a"></e-column>
  </e-columns>
</ejs-grid>
```

### Date Picker Locale

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-date-picker-locale-grid',
  template: `
    <ejs-grid #grid [dataSource]="data" locale="de-DE" [editSettings]="editSettings">
      <e-columns>
        <e-column field="OrderDate" headerText="Order Date" type="date" 
                  [editParams]="getEditParams()"></e-column>
      </e-columns>
      <e-inject [services]="[Edit]"></e-inject>
    </ejs-grid>
  `
})
export class DatePickerLocaleGridComponent implements OnInit {
  @ViewChild('grid') gridInstance: GridComponent;
  data: any[] = [];
  editSettings: any = { mode: 'Dialog' };
  
  ngOnInit() {
    this.loadData();
  }
  
  getEditParams() {
    return { params: { locale: 'de-DE' } };
  }
  
  loadData() {
    // Load data from service
  }
}
```

---

## Currency Formatting

### Automatic Currency by Locale

```typescript
export class CurrencyFormatGridComponent implements OnInit {
  data: any[] = [];
  
  ngOnInit() {
    this.loadData();
  }
  
  loadData() {
    // Automatic currency formatting by locale
    // en-US: $1,234.56
    // de-DE: 1.234,56 €
    // fr-FR: 1 234,56 €
    // ja-JP: ¥1234
    // gb: £1,234.56
    this.data = [];
  }
}

// In template:
<ejs-grid [dataSource]="data">
  <e-columns>
    <e-column field="Freight" type="number" format="C2"></e-column>
  </e-columns>
</ejs-grid>
```

### Custom Currency Format

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-currency-grid',
  template: `
    <ejs-grid [dataSource]="data">
      <e-columns>
        <e-column field="Freight" headerText="Freight" 
                  [template]="currencyTemplate"></e-column>
      </e-columns>
      <e-inject [services]="[Page]"></e-inject>
    </ejs-grid>
  `
})
export class CustomCurrencyGridComponent implements OnInit {
  data: any[] = [];
  userCurrency = 'USD';
  
  ngOnInit() {
    this.loadData();
  }
  
  currencyFormat(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: this.userCurrency,
      minimumFractionDigits: 2
    }).format(value);
  }
  
  loadData() {
    this.data = [];
  }
}
```

---

## RTL Support

### Enable Right-to-Left Layout

```typescript
import { Component, OnInit } from '@angular/core';
import { enableRtl } from '@syncfusion/ej2-base';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

// Enable RTL globally
enableRtl(true);

@Component({
  selector: 'app-rtl-grid',
  template: `
    <ejs-grid [dataSource]="data" 
              locale="ar"
              [enableRtl]="true">
      <e-columns>
        <e-column field="OrderID" headerText="معرّف الطلب" width="100"></e-column>
        <e-column field="CustomerID" headerText="معرّف العميل" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class RtlGridComponent {
  data: any[] = [];
}
```

### Conditional RTL

```typescript
import { Component } from '@angular/core';
import { enableRtl } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-grid',
  template: `
    <div>
      <button (click)="toggleRTL()">{{isRTL ? 'LTR' : 'RTL'}}</button>
      <ejs-grid [dataSource]="data" [enableRtl]="isRTL" [locale]="isRTL ? 'ar' : 'en">
        <!-- columns -->
      </ejs-grid>
    </div>
  `
})
export class GridComponent {
  isRTL = false;
  data = [];

  toggleRTL() {
    enableRtl(!this.isRTL);
    this.isRTL = !this.isRTL;
  }
}
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

```typescript
import { Component, OnInit } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
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

@Component({
  selector: 'app-custom-locale-grid',
  template: `
    <ejs-grid [dataSource]="data" locale="de">
      <e-columns>
        <!-- columns -->
      </e-columns>
    </ejs-grid>
  `
})
export class CustomLocaleGridComponent {
  data: any[] = [];
}
```

### Custom Messages Examples

```typescript
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

```typescript
import { Component, OnInit } from '@angular/core';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page } from '@syncfusion/ej2-angular-grids';
import { setLocale } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-grid-language',
  template: `
    <div>
      <select [(ngModel)]="language" (change)="handleLanguageChange(language)">
        <option *ngFor="let item of languages | keyvalue" [value]="item.key">{{item.value}}</option>
      </select>

      <ejs-grid [dataSource]="data" [locale]="language">
        <!-- columns -->
      </ejs-grid>
    </div>
  `,
  providers: [PageService]
})
export class GridWithLanguageSelectorComponent {
  data: any[] = [];
  language: string = 'en';
  languages: any = {};

  handleLanguageChange(lang: string) {
    this.language = lang;
  }
}
```

---

## Translation Object Structure

```typescript
const translations = {
  'de': {
    'grid': {
      // Grid-level strings
      'EmptyRecord': 'Keine Datensätze',
      'Grouptext': 'Gruppieren nach ',
      'Pagerformat': '{0} bis {1} von {2}',
      'GroupCaption': 'Gruppieren nach',
      'SerialNumberColumn': '#',
      'Edit': 'Bearbeiten',
      'Delete': 'Löschen',
      'Cancel': 'Abbrechen',
      'Save': 'Speichern',
      'Add': 'Hinzufügen'
    }
  },
  'fr': {
    'grid': {
      'EmptyRecord': 'Aucun enregistrement',
      'Grouptext': 'Grouper par ',
      'Pagerformat': '{0} à {1} sur {2}',
      'Edit': 'Modifier',
      'Delete': 'Supprimer'
    }
  }
};
```
