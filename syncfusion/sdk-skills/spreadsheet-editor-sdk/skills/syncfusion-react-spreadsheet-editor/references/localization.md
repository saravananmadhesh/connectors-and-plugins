# Localization & Globalization — Syncfusion React Spreadsheet

The Syncfusion **React Spreadsheet** supports localization (L10n), globalization, RTL layouts, and locale-based number/date formatting. These features use the same internationalization APIs as the EJ2 base framework but must be applied through **SpreadsheetComponent**.

## 1. Minimal React Code (Localization + Locale + RTL)

```jsx
import * as React from "react";
import { SpreadsheetComponent } from "@syncfusion/ej2-react-spreadsheet";
import { L10n } from "@syncfusion/ej2-base";

// === Register translations ===
L10n.load({
  fr: {
    spreadsheet: {
      File: "Fichier",
      Save: "Enregistrer",
      Undo: "Annuler"
    }
  }
});

export default function App() {
  return (
    <SpreadsheetComponent
      locale="fr"          // French UI text
      enableRtl={false}
      sheets={[{ name: "Sheet1" }]}
    />
  );
}
```

## 2. Changing Locale at Runtime

```jsx
const spreadsheetRef = useRef(null);

const changeLocale = (lang) => {
  const spreadsheet = spreadsheetRef.current;
  if (!spreadsheet) return;

  spreadsheet.locale = lang;
  spreadsheet.dataBind();
  spreadsheet.refresh(); // Required to apply locale changes
};
```

---

## 3. Right to Left (RTL) Support

```jsx
<SpreadsheetComponent locale="ar-SA" ref={spreadsheetRef} enableRtl={true}>
      <SheetsDirective>
          <SheetDirective name="Sheet1">
          <RangesDirective>
                <RangeDirective dataSource={defaultData}></RangeDirective>
            </RangesDirective>
          </SheetDirective>
      </SheetsDirective>
</SpreadsheetComponent>
```

## 4. Loading Custom Translations

```jsx
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

<SpreadsheetComponent locale="es" sheets={[{ name: "Hoja1" }]} />;
```
---

## 5. Using Custom Date & Number Formats

### Date formats:

```jsx
spreadsheet.numberFormat("dd/MM/yyyy", "B2:B50");   // French style
spreadsheet.numberFormat("MM/dd/yyyy", "C2:C50");   // US style
spreadsheet.numberFormat("yyyy-MM-dd", "D2:D50");   // ISO");
```
---

## 6. Formula List Separator (Locale-Based)

```jsx
<SpreadsheetComponent
  locale="fr-FR"
  listSeparator=";"
/>
```
### Usage:

```jsx
spreadsheet.updateCell({ value: "=SUM(A1;A2;A3)" }, "A4");
```
---

## 7. Detect Browser Locale Automatically

```jsx
const browserLang = navigator.language || "en-US";

<SpreadsheetComponent
  locale={browserLang}
  sheets={[{ name: "Sheet1" }]}
/>
```

## 8. RTL Examples

### Arabic

```jsx
L10n.load({
  "ar-SA": {
    spreadsheet: {
      File: "ملف",
      Save: "حفظ",
      Open: "فتح"
    }
  }
});

<SpreadsheetComponent
  locale="ar-SA"
  enableRtl={true}
  sheets={[{ name: "ورقة1" }]}
/>;
```
