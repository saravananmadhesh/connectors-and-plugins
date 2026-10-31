# Localization & Globalization — Syncfusion ASP.NET MVC Spreadsheet

The Syncfusion **ASP.NET MVC Spreadsheet** supports localization (L10n), globalization, RTL layouts, and locale-based number/date formatting. These features use the same internationalization APIs as the EJ2 base framework but must be applied through **SpreadsheetComponent**.

## 1. Minimal ASP.NET MVC Code (Localization + Locale + RTL)

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Spreadsheet

@Html.EJS().Spreadsheet("spreadsheet").Locale("fr").EnableRtl(false).Sheets(sheet =>
{
    sheet.Name("Sheet1").Add();
}).Render()
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
    // mirror ASP.NET MVC's this with a simple variable reference

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

@Html.EJS().Spreadsheet("spreadsheet").Locale("de-DE").Sheets(sheet =>
{
    sheet.Name("Finances").Ranges(ranges =>
    {
        ranges.DataSource((IEnumerable<object>)ViewBag.DefaultData).Add();
    }).Add();
}).Render()

```

Applying number formats:

```cshtml
spreadsheet.numberFormat("#,##0.00", "A2:A10");      // Standard numeric
spreadsheet.numberFormat("$#,##0.00", "B2:B10");     // USD currency
spreadsheet.numberFormat("0%", "C2:C10");            // Percent
```

---

## 4. Right-to-Left (RTL) Support

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Spreadsheet

@Html.EJS().Spreadsheet("spreadsheet-rtl").Locale("ar-SA").EnableRtl(true).Created("onCreatedRtl").Sheets(sheet =>
{
    sheet.Name("ورقة1").Add();
}).Render()

<script>
    function onCreatedRtl() {
        // rtl spreadsheet instance is 'this'
        var rtlSheet = this;
    }
</script>
```

## 5. Loading Custom Translations

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Spreadsheet

@Html.EJS().Spreadsheet("spreadsheet").Locale("es").Sheets(sheet =>
{
    sheet.Name("Hoja1").Add();
}).Render()

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

## 7. Currency Formats (Locale-Aware)

```cshtml
spreadsheet.numberFormat("$#,##0.00", "A2:A50");       // USD
spreadsheet.numberFormat("€#,##0.00", "B2:B50");       // EUR
spreadsheet.numberFormat("¥#,##0", "C2:C50");          // JPY
```

---

## 8. Formula List Separator (Locale-Based)

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Spreadsheet

@Html.EJS().Spreadsheet("spreadsheet").Locale("fr-FR").ListSeparator(";").Created("onCreatedList").Sheets(sheet =>
{
    sheet.Name("Sheet1").Add();
}).Render()
```

### Usage:

```cshtml
spreadsheet.updateCell({ value: "=SUM(A1;A2;A3)" }, "A4");
```

---

## 9. Detect Browser Locale Automatically

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Spreadsheet

@{

    // Equivalent of navigator.language in ASP.NET MVC
    var browserLang = Context.Request.Headers["Accept-Language"].ToString() || "en-US";
}

@Html.EJS().Spreadsheet("spreadsheet").Locale(browserLang).Sheets(sheet =>
{
    sheet.Name("Sheet1").Add();
}).Render()
```

## 10. RTL Examples

### Arabic

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Spreadsheet

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

@Html.EJS().Spreadsheet("spreadsheet-ar").Locale("ar-SA").EnableRtl(true).Sheets(sheet =>
{
    sheet.Name("ورقة1").Add();
}).Render()
```

## 11. Notes & Best Practices

- Set `locale` before rendering Spreadsheet.
- Changing locale requires calling `refresh()`.
- RTL requires both `locale` + `enableRtl={true}`.
- Load only needed translations to reduce bundle size.
- Custom number formats may override locale formatting.
- Date formatting depends on locale conventions.

