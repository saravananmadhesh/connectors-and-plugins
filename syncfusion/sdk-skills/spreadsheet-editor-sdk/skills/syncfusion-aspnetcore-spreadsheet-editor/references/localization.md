# Localization & Globalization — Syncfusion ASP.NET Core Spreadsheet

The Syncfusion **ASP.NET Core Spreadsheet** supports localization (L10n), globalization, RTL layouts, and locale-based number/date formatting. These features use the same internationalization APIs as the EJ2 base framework but must be applied through **SpreadsheetComponent**.

## 1. Minimal ASP.NET Core Code (Localization + Locale + RTL)

```cshtml
@using Syncfusion.EJ2

<div class="control-pane">
    <div class="control-section spreadsheet-control">
        <ejs-spreadsheet id="spreadsheet" locale="fr" enableRtl="false">
            <e-spreadsheet-sheets>
                <e-spreadsheet-sheet name="Sheet1"></e-spreadsheet-sheet>
            </e-spreadsheet-sheets>
        </ejs-spreadsheet>
    </div>
</div>

<script>
    ej.base.L10n.load({
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
</script>
```

## 2. Changing Locale at Runtime

```cshtml
<script>
    // mirror ASP.NET Core's this with a simple variable reference

    function changeLocale(lang) {
      var spreadsheet =  document.getElementById('spreadsheet').ej2_instances[0];
      spreadsheet.locale = lang;
      spreadsheet.dataBind();
      spreadsheet.refresh(); // Required to apply locale changes
    }
</script>
```

## 3. Number Formatting According to Locale

```cshtml
@using Syncfusion.EJ2.Spreadsheet

@{
    var defaultData = new[] {
        new { Amount = 1234.56, Date = new DateTime(2024, 1, 15) },
        new { Amount = 9876.43, Date = new DateTime(2024, 2, 20) }
    };
}

<div class="control-pane">
    <div class="control-section spreadsheet-control">
        <ejs-spreadsheet id="spreadsheet" locale="de-DE">
            <e-spreadsheet-sheets>
                <e-spreadsheet-sheet name="Finances">
                    <e-spreadsheet-ranges>
                        <e-spreadsheet-range dataSource="defaultData"></e-spreadsheet-range>
                    </e-spreadsheet-ranges>
                </e-spreadsheet-sheet>
            </e-spreadsheet-sheets>
        </ejs-spreadsheet>
    </div>
</div>

```

Applying number formats:

```cshtml
spreadsheet.numberFormat("#,##0.00", "A2:A10");      // Standard numeric
spreadsheet.numberFormat("$#,##0.00", "B2:B10");     // USD currency
spreadsheet.numberFormat("0%", "C2:C10");            // Percent
```

---

## 4. Right‑to‑Left (RTL) Support

```cshtml
@using Syncfusion.EJ2

<ejs-spreadsheet id="spreadsheet-rtl" locale="ar-SA" enableRtl="true" created="onCreatedRtl">
    <e-spreadsheet-sheets>
        <e-spreadsheet-sheet name="ورقة1"></e-spreadsheet-sheet>
    </e-spreadsheet-sheets>
</ejs-spreadsheet>

<script>
    function onCreatedRtl() {
        // rtl spreadsheet instance is 'this'
        var rtlSheet = this;
    }
</script>
```

## 5. Loading Custom Translations

```cshtml

<ejs-spreadsheet id="spreadsheet" locale="es">
    <e-spreadsheet-sheets>
        <e-spreadsheet-sheet name="Hoja1"></e-spreadsheet-sheet>
    </e-spreadsheet-sheets>
</ejs-spreadsheet>

<script>
    ej.base.L10n.load({
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
</script>
```

---

## 6. Using Custom Date & Number Formats

### Date formats:

```cshtml
spreadsheet.numberFormat("dd/MM/yyyy", "B2:B50");   // French style
spreadsheet.numberFormat("MM/dd/yyyy", "C2:C50");   // US style
spreadsheet.numberFormat("yyyy-MM-dd", "D2:D50");   // ISO");
```

---

## 7. Currency Formats (Locale‑Aware)

```cshtml
spreadsheet.numberFormat("$#,##0.00", "A2:A50");       // USD
spreadsheet.numberFormat("€#,##0.00", "B2:B50");       // EUR
spreadsheet.numberFormat("¥#,##0", "C2:C50");          // JPY
```

---

## 8. Formula List Separator (Locale-Based)

```cshtml

<ejs-spreadsheet id="spreadsheet" locale="fr-FR" listSeparator=";" created="onCreatedList">
    <e-spreadsheet-sheets>
        <e-spreadsheet-sheet name="Sheet1"></e-spreadsheet-sheet>
    </e-spreadsheet-sheets>
</ejs-spreadsheet>
```

### Usage:

```cshtml
spreadsheet.updateCell({ value: "=SUM(A1;A2;A3)" }, "A4");
```

---

## 9. Detect Browser Locale Automatically

```cshtml
@using Syncfusion.EJ2.Spreadsheet

@{

    // Equivalent of navigator.language in ASP.NET Core
    var browserLang = Context.Request.Headers["Accept-Language"].ToString() || "en-US";
}

<div class="control-pane">
    <div class="control-section spreadsheet-control">
        <ejs-spreadsheet id="spreadsheet" locale="@browserLang">
            <e-spreadsheet-sheets>
                <e-spreadsheet-sheet name="Sheet1"></e-spreadsheet-sheet>
            </e-spreadsheet-sheets>
        </ejs-spreadsheet>
    </div>
</div>
```

## 10. RTL Examples

### Arabic

```cshtml
<script>
    ej.base.L10n.load({
      "ar-SA": {
        spreadsheet: {
          File: "ملف",
          Save: "حفظ",
          Open: "فتح"
        }
      }
    });
</script>

<ejs-spreadsheet id="spreadsheet-ar" locale="ar-SA" enableRtl="true">
    <e-spreadsheet-sheets>
        <e-spreadsheet-sheet name="ورقة1"></e-spreadsheet-sheet>
    </e-spreadsheet-sheets>
</ejs-spreadsheet>
```

## 11. Notes & Best Practices

- Set `locale` before rendering Spreadsheet.
- Changing locale requires calling `refresh()`.
- RTL requires both `locale` + `enableRtl={true}`.
- Load only needed translations to reduce bundle size.
- Custom number formats may override locale formatting.
- Date formatting depends on locale conventions.

