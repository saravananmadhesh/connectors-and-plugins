# Localization & Globalization

Customize language, locale, date/time formats, and number formatting in the Spreadsheet Editor.

## Table of Contents

- [Minimal Code](#minimal-code)
- [Placeholders](#placeholders)
- [Key Properties](#key-properties)
  - [locale Property](#locale-property)
  - [enableRtl Property](#enablertl-property)
- [Locale Configuration](#locale-configuration)
  - [Load Custom Translations](#load-custom-translations)
- [Number & Date Formatting by Locale](#number--date-formatting-by-locale)
  - [Number Formatting](#number-formatting)
  - [Common Locale Number Formats](#common-locale-number-formats)
  - [Date Formatting](#date-formatting)
- [Currency Symbols by Locale](#currency-symbols-by-locale)
  - [Currency Formatting](#currency-formatting)
- [Runtime Locale Switching](#runtime-locale-switching)
- [RTL (Right-to-Left) Language Support](#rtl-right-to-left-language-support)
  - [Arabic Example](#arabic-example)
  - [Hebrew Example](#hebrew-example)
- [HTML lang Attribute](#html-lang-attribute)
- [Browser Locale Detection](#browser-locale-detection)
- [Notes](#notes)

---

## Minimal Code

```typescript
import { Spreadsheet, L10n } from '@syncfusion/ej2-spreadsheet';

// === Register translations ===
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

// === Create spreadsheet with specific locale ===
const spreadsheet = new Spreadsheet({
  locale: 'fr',           // Use French UI strings
  sheets: [{ name: 'Sheet1' }]
});

spreadsheet.appendTo('#spreadsheet');

// Apply number format after rendering
spreadsheet.numberFormat('#,##0.00', 'B1:B10');  // ✅ Method call, not constructor property

// === Number formatting by locale ===
const spreadsheet2 = new Spreadsheet({
  locale: 'de-DE',        // German (Germany) locale
  sheets: [{
    name: 'Finances',
    ranges: [{
      dataSource: [
        { Amount: 1234.56, Date: new Date(2024, 0, 15) },
        { Amount: 9876.43, Date: new Date(2024, 1, 20) }
      ]
    }]
  }]
});

spreadsheet2.appendTo('#spreadsheet2');

// === Right-to-Left (RTL) support ===
const spreadsheet3 = new Spreadsheet({
  locale: 'ar-SA',        // Arabic locale
  enableRtl: true,        // Enable RTL layout
  sheets: [{ name: 'ورقة1' }]  // Arabic sheet name
});

spreadsheet3.appendTo('#spreadsheet3');
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[LOCALE]` | Language-region code | `'en-US'`, `'fr-FR'`, `'de-DE'`, `'ar-SA'`, `'ja-JP'` |
| `[DATE_FORMAT]` | Date format string | `'mm/dd/yyyy'`, `'dd/mm/yyyy'`, `'yyyy-mm-dd'` |
| `[NUMBER_FORMAT]` | Number format code | `'#,##0.00'`, `'0.0%'`, `'$#,##0.00'` |
| `[CURRENCY]` | Currency symbol | `'$'`, `'€'`, `'¥'`, `'£'` |

---

## Key Properties

### `locale` Property
Sets the UI language and regional formatting.

```typescript
const spreadsheet = new Spreadsheet({
  locale: 'fr-FR',  // French (France)
  sheets: [{ name: 'Sheet1' }]
});
```

| Locale Code | Language | Region |
|---|---|---|
| `'en-US'` | English | United States |
| `'en-GB'` | English | Great Britain |
| `'fr-FR'` | French | France |
| `'de-DE'` | German | Germany |
| `'es-ES'` | Spanish | Spain |
| `'it-IT'` | Italian | Italy |
| `'pt-BR'` | Portuguese | Brazil |
| `'ja-JP'` | Japanese | Japan |
| `'zh-CN'` | Chinese | China (Simplified) |
| `'zh-TW'` | Chinese | Taiwan (Traditional) |
| `'ar-SA'` | Arabic | Saudi Arabia |
| `'he-IL'` | Hebrew | Israel |
| `'ru-RU'` | Russian | Russia |
| `'ko-KR'` | Korean | Korea |

### `enableRtl` Property
Enables right-to-left layout for RTL languages.

```typescript
const spreadsheet = new Spreadsheet({
  locale: 'ar-SA',
  enableRtl: true,
  sheets: [{ name: 'ورقة1' }]
});
```

---

## Locale Configuration

### Load Custom Translations

```typescript
import { L10n } from '@syncfusion/ej2-spreadsheet';

L10n.load({
  'es': {  // Spanish
    'spreadsheet': {
      'File': 'Archivo',
      'Edit': 'Editar',
      'View': 'Ver',
      'Insert': 'Insertar',
      'Delete': 'Eliminar',
      'Save': 'Guardar',
      'SaveAs': 'Guardar como',
      'Open': 'Abrir',
      'Copy': 'Copiar',
      'Cut': 'Cortar',
      'Paste': 'Pegar'
    }
  },
  'pt-BR': {  // Portuguese (Brazil)
    'spreadsheet': {
      'File': 'Arquivo',
      'Edit': 'Editar',
      'View': 'Visualizar',
      'Insert': 'Inserir',
      'Save': 'Salvar'
    }
  }
});

const spreadsheet = new Spreadsheet({
  locale: 'es',
  sheets: [{ name: 'Hoja1' }]
});
```

---

## Number & Date Formatting by Locale

### Number Formatting

```typescript
const spreadsheet = new Spreadsheet({
  locale: 'de-DE',  // German format: 1.234,56
  sheets: [{
    name: 'Numbers',
    ranges: [{
      dataSource: [
        { Value: 1234.56 },
        { Value: 9876.43 }
      ]
    }]
  }]
});

spreadsheet.appendTo('#spreadsheet');

// Format specific cells after rendering
spreadsheet.numberFormat('$#,##0.00', 'B1:B10');  // USD currency
spreadsheet.numberFormat('€ #,##0.00', 'C1:C10'); // EUR currency
spreadsheet.numberFormat('0%', 'D1:D10');          // Percentage
```

### Common Locale Number Formats

| Locale | Thousands | Decimal | Example |
|---|---|---|---|
| `en-US` | `,` | `.` | `1,234.56` |
| `de-DE` | `.` | `,` | `1.234,56` |
| `fr-FR` | ` ` | `,` | `1 234,56` |
| `es-ES` | `.` | `,` | `1.234,56` |
| `pt-BR` | `.` | `,` | `1.234,56` |
| `zh-CN` | `,` | `.` | `1,234.56` |
| `ja-JP` | `,` | `.` | `1,234.56` |
| `ar-SA` | `,` | `.` | `1,234.56` |

### Date Formatting

```typescript
const spreadsheet = new Spreadsheet({
  locale: 'fr-FR',
  sheets: [{
    name: 'Dates',
    ranges: [{
      dataSource: [
        { EventDate: new Date(2024, 0, 15) },
        { EventDate: new Date(2024, 11, 25) }
      ]
    }]
  }]
});

spreadsheet.appendTo('#spreadsheet');

// Apply date formats after rendering
spreadsheet.numberFormat('dd/mm/yyyy', 'B1:B10');  // 15/01/2024
spreadsheet.numberFormat('mm/dd/yyyy', 'C1:C10');  // 01/15/2024
spreadsheet.numberFormat('yyyy-mm-dd', 'D1:D10');  // 2024-01-15
```

---

## Currency Symbols by Locale

| Locale | Symbol | Code |
|---|---|---|
| `en-US` | `$` | `USD` |
| `de-DE` | `€` | `EUR` |
| `ja-JP` | `¥` | `JPY` |
| `en-GB` | `£` | `GBP` |
| `hi-IN` | `₹` | `INR` |
| `zh-CN` | `¥` | `CNY` |
| `pt-BR` | `R$` | `BRL` |
| `de-CH` | `Fr.` | `CHF` |

### Currency Formatting

```typescript
const spreadsheet = new Spreadsheet({
  locale: 'en-US',
  sheets: [{
    name: 'Sales',
    ranges: [{
      dataSource: [
        { Price: 99.99 },
        { Price: 299.50 }
      ]
    }]
  }]
});

spreadsheet.appendTo('#spreadsheet');

spreadsheet.numberFormat('$#,##0.00', 'B1:B10');      // USD: $99.99
spreadsheet.numberFormat('€ #,##0.00', 'C1:C10');     // EUR: € 99.99
spreadsheet.numberFormat('¥ #,##0', 'D1:D10');        // JPY: ¥ 100
```

---

## Runtime Locale Switching

```typescript
// Best Practice: Re-initialize spreadsheet for reliable locale switching
function switchLocale(lang: string): void {
  spreadsheet.destroy();
  const newSpreadsheet = new Spreadsheet({
    locale: lang,
    sheets: [{ name: 'Data' }]
  });
  newSpreadsheet.appendTo('#spreadsheet');
}

document.getElementById('lang-en')?.addEventListener('click', () => switchLocale('en-US'));
document.getElementById('lang-fr')?.addEventListener('click', () => switchLocale('fr-FR'));
document.getElementById('lang-de')?.addEventListener('click', () => switchLocale('de-DE'));
```

---

## RTL (Right-to-Left) Language Support

### Arabic Example

```typescript
L10n.load({
  'ar-SA': {
    'spreadsheet': {
      'File': 'ملف',
      'Edit': 'تحرير',
      'Save': 'حفظ',
      'Open': 'فتح'
    }
  }
});

const spreadsheet = new Spreadsheet({
  locale: 'ar-SA',
  enableRtl: true,
  sheets: [{
    name: 'ورقة1',
    ranges: [{
      dataSource: [
        { Name: 'أحمد', Amount: 1000 },
        { Name: 'فاطمة', Amount: 2000 }
      ]
    }]
  }]
});

spreadsheet.appendTo('#spreadsheet');
```

### Hebrew Example

```typescript
const spreadsheet = new Spreadsheet({
  locale: 'he-IL',
  enableRtl: true,
  sheets: [{ name: 'גיליון1' }]
});

spreadsheet.appendTo('#spreadsheet');
```

---

## HTML lang Attribute

```html
<!-- Set page language for accessibility -->
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <title>Spreadsheet - Français</title>
  </head>
  <body>
    <div id="spreadsheet"></div>
  </body>
</html>
```

---

## Browser Locale Detection

```typescript
// Detect browser language and set Spreadsheet accordingly
const browserLanguage = navigator.language || (navigator as any).userLanguage;

const spreadsheet = new Spreadsheet({
  locale: browserLanguage,  // e.g., 'fr-FR'
  sheets: [{ name: 'Sheet1' }]
});

spreadsheet.appendTo('#spreadsheet');
```

---

## Notes

- **Best Practice**: Match HTML `lang` attribute to spreadsheet `locale` for accessibility
- **Best Practice**: Provide language switcher UI for multi-language apps
- **Best Practice**: Pre-load all needed locales via `L10n.load()` before creating spreadsheet
- **Best Practice**: Re-initialize spreadsheet when switching locale for reliable results
- **Gotcha**: `numberFormat` is an **instance method** — not a constructor property
- **Gotcha**: RTL languages require both `locale` and `enableRtl: true`
- **Gotcha**: Custom number formats may conflict with locale-specific formatting
- **Gotcha**: Dates in formulas must match the locale's date format
- **Performance**: Loading many locales increases bundle size; load only needed ones