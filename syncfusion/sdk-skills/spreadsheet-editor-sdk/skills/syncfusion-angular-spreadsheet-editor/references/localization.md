# Localization & Globalization

Configure language, locale, and RTL layout using `locale`, `enableRtl`, and `L10n`.

## Minimal Angular Code

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';
import { L10n } from '@syncfusion/ej2-base';

// Register translations before component loads
L10n.load({
  'fr': {
    'spreadsheet': {
      'File': 'Fichier',
      'Save': 'Enregistrer',
      'Undo': 'Annuler'
    }
  },
  'de': {
    'spreadsheet': {
      'File': 'Datei',
      'Save': 'Speichern',
      'Undo': 'Rückgängig'
    }
  }
});

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template:
  `<ejs-spreadsheet #spreadsheet [locale]="'fr-FR'">
    <e-sheets>
      <e-sheet name="Sheet1">
        <e-ranges>
          <e-range [dataSource]="data"></e-range>
        </e-ranges>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  data: object[] = [
    { Amount: 1234.56, Date: new Date(2024, 0, 15) },
    { Amount: 9876.43, Date: new Date(2024, 1, 20) }
  ];

  // Apply number and date formats after render
  onCreated(): void {
    this.spreadsheet.numberFormat('$#,##0.00',   'B1:B10'); // Currency
    this.spreadsheet.numberFormat('€ #,##0.00',  'C1:C10'); // EUR
    this.spreadsheet.numberFormat('dd/mm/yyyy',  'D1:D10'); // Date
    this.spreadsheet.numberFormat('0%',          'E1:E10'); // Percentage
  }

  // Detect browser locale
  getBrowserLocale(): string {
    return navigator.language; // e.g. 'fr-FR'
  }
}
```

## RTL Support (Arabic / Hebrew)

```typescript
L10n.load({
  'ar-SA': {
    'spreadsheet': {
      'File': 'ملف',
      'Save': 'حفظ',
      'Open': 'فتح'
    }
  }
});

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template: `
    <ejs-spreadsheet #spreadsheet [locale]="'ar-SA'" [enableRtl]="true">
      <e-sheets>
        <e-sheet name="ورقة1">
          <e-ranges>
            <e-range [dataSource]="rtlData"></e-range>
          </e-ranges>
        </e-sheet>
      </e-sheets>
    </ejs-spreadsheet>
  `
})
export class AppComponent {
  rtlData: object[] = [
    { Name: 'أحمد',  Amount: 1000 },
    { Name: 'فاطمة', Amount: 2000 }
  ];
}
```

```typescript
L10n.load({
  'ar-SA': {
    'spreadsheet': {
      'File': 'ملف',
      'Save': 'حفظ',
      'Open': 'فتح'
    }
  }
});

rtlData: object[] = [
  { Name: 'أحمد',  Amount: 1000 },
  { Name: 'فاطمة', Amount: 2000 }
];
```

## API Reference

### Locale Properties

| Property | Type | Description | Example |
|---|---|---|---|
| `[locale]` | `string` | Language-region code | `'en-US'`, `'fr-FR'`, `'de-DE'`, `'ar-SA'` |
| `[enableRtl]` | `boolean` | Enable right-to-left layout | `true`, `false` |

### L10n.load(translations)

| Parameter | Type | Description |
|---|---|---|
| `translations` | `object` | Key-value map of locale code to UI strings |

### Common Locale Codes

| Locale | Language | Region |
|---|---|---|
| `en-US` | English | United States |
| `fr-FR` | French | France |
| `de-DE` | German | Germany |
| `es-ES` | Spanish | Spain |
| `ar-SA` | Arabic | Saudi Arabia |
| `he-IL` | Hebrew | Israel |
| `ja-JP` | Japanese | Japan |
| `zh-CN` | Chinese | China |

### Locale Number Formats

| Locale | Thousands | Decimal | Example |
|---|---|---|---|
| `en-US` | `,` | `.` | `1,234.56` |
| `de-DE` | `.` | `,` | `1.234,56` |
| `fr-FR` | ` ` | `,` | `1 234,56` |

### Currency Symbols

| Locale | Symbol | Code |
|---|---|---|
| `en-US` | `$` | USD |
| `de-DE` | `€` | EUR |
| `ja-JP` | `¥` | JPY |
| `en-GB` | `£` | GBP |
| `hi-IN` | `₹` | INR |

## Notes

- Call `L10n.load()` **before** the component initializes
- `numberFormat()` is an instance method — call it in `(created)` event
- RTL requires both `[locale]` and `[enableRtl]="true"`
- Re-initialize the component when switching locale for reliable results
- Load only needed locales to keep bundle size small