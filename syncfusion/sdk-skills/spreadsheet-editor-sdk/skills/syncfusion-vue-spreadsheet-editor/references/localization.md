
# Localization & Globalization — Syncfusion Vue Spreadsheet

The Syncfusion **Vue Spreadsheet** supports localization (L10n), globalization, RTL layouts, and locale-based number/date formatting. These features use the same internationalization APIs as the EJ2 base framework but must be applied through **SpreadsheetComponent**.

## 1. Minimal Vue Code (Localization + Locale + RTL)

```vue
<template>
  <ejs-spreadsheet
    locale="fr"
    :enableRtl="false"
    :sheets="[{ name: 'Sheet1' }]"
  />
</template>

<script>
import { SpreadsheetComponent } from "@syncfusion/ej2-vue-spreadsheet";
import { L10n } from "@syncfusion/ej2-base";

// === Register translations ===
L10n.load({
  fr: {
    spreadsheet: {
      File: "Fichier",
      Save: "Enregistrer",
      Undo: "Annuler"
    }
  },
  de: {
    spreadsheet: {
      File: "Datei",
      Save: "Speichern",
      Undo: "Rückgängig"
    }
  }
});

export default {
  components: {
    "ejs-spreadsheet": SpreadsheetComponent
  }
};
</script>
```

## 2. Changing Locale at Runtime

```vue
// In your Vue component methods:
changeLocale(lang) {
  const spreadsheet = this.$refs.spreadsheet;
  if (!spreadsheet) return;
  spreadsheet.locale = lang;
  spreadsheet.dataBind();
  spreadsheet.refresh(); // Required to apply locale changes
}
```


## 3. Number Formatting According to Locale

```vue
<template>
  <ejs-spreadsheet locale="de-DE" ref="spreadsheet">
    <e-sheets>
      <e-sheet name="Finances">
        <e-ranges>
          <e-range :dataSource="defaultData"></e-range>
        </e-ranges>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>
</template>

<script>
import { SpreadsheetComponent, SheetsDirective, SheetDirective, RangesDirective, RangeDirective } from "@syncfusion/ej2-vue-spreadsheet";

export default {
  components: {
    "ejs-spreadsheet": SpreadsheetComponent,
    "e-sheets": SheetsDirective,
    "e-sheet": SheetDirective,
    "e-ranges": RangesDirective,
    "e-range": RangeDirective
  },
  data() {
    return {
      defaultData: [
        { Amount: 1234.56, Date: new Date(2024, 0, 15) },
        { Amount: 9876.43, Date: new Date(2024, 1, 20) }
      ]
    };
  }
};
</script>
```

**Applying number formats:**

```vue
spreadsheet.numberFormat("#,##0.00", "A2:A10");      // Standard numeric
spreadsheet.numberFormat("$#,##0.00", "B2:B10");     // USD currency
spreadsheet.numberFormat("0%", "C2:C10");            // Percent
```


## 4. Right to Left (RTL) Support

```vue
<ejs-spreadsheet locale="ar-SA" ref="spreadsheet" :enableRtl="true">
  <e-sheets>
    <e-sheet name="ورقة1">
      <e-ranges>
        <e-range :dataSource="defaultData"></e-range>
      </e-ranges>
    </e-sheet>
  </e-sheets>
</ejs-spreadsheet>
```

## 5. Loading Custom Translations

```vue
L10n.load({
  es: {
    spreadsheet: {
      File: "Archivo",
      Edit: "Editar",
      Copy: "Copiar",
      Paste: "Pegar",
      Save: "Guardar"
    }
  }
});

// In template:
<ejs-spreadsheet locale="es" :sheets="[{ name: 'Hoja1' }]" />
```

## 6. Using Custom Date & Number Formats

### Date formats:

```vue
spreadsheet.numberFormat("dd/MM/yyyy", "B2:B50");   // French style
spreadsheet.numberFormat("MM/dd/yyyy", "C2:C50");   // US style
spreadsheet.numberFormat("yyyy-MM-dd", "D2:D50");   // ISO
```

## 7. Currency Formats (Locale Aware)

```vue
spreadsheet.numberFormat("$#,##0.00", "A2:A50");       // USD
spreadsheet.numberFormat("€#,##0.00", "B2:B50");       // EUR
spreadsheet.numberFormat("¥#,##0", "C2:C50");          // JPY
```

## 8. Formula List Separator (Locale-Based)

```vue
<ejs-spreadsheet locale="fr-FR" listSeparator=";" />
```

### Usage:

```vue
spreadsheet.updateCell({ value: "=SUM(A1;A2;A3)" }, "A4");
```

## 9. Detect Browser Locale Automatically

```vue
const browserLang = navigator.language || "en-US";
```

```vue
<ejs-spreadsheet :locale="browserLang" :sheets="[{ name: 'Sheet1' }]" />
```

## 10. RTL Examples

### Arabic

```vue
L10n.load({
  "ar-SA": {
    spreadsheet: {
      File: "ملف",
      Save: "حفظ",
      Open: "فتح"
    }
  }
});
```

```vue
<ejs-spreadsheet
  locale="ar-SA"
  :enableRtl="true"
  :sheets="[{ name: 'ورقة1' }]"
/>
```

### Hebrew

```vue
<ejs-spreadsheet
  locale="he-IL"
  :enableRtl="true"
  :sheets="[{ name: 'Sheet1' }]"
/>
```

### 11. Notes & Best Practices

- Set `locale` before rendering Spreadsheet.
- Changing locale requires calling `refresh()`.
- RTL requires both `locale` + `enableRtl={true}`.
- Load only needed translations to reduce bundle size.
- Custom number formats may override locale formatting.
- Date formatting depends on locale conventions.