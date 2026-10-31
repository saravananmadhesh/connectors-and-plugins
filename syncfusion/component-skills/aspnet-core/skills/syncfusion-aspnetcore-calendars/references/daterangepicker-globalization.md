# DateRangePicker — Globalization

## Table of Contents
- [Locale Property](#locale-property)
- [Loading CLDR Data](#loading-cldr-data)
- [L10n Text Localization](#l10n-text-localization)
- [German Culture Example](#german-culture-example)
- [Right-to-Left (RTL)](#right-to-left-rtl)
- [Arabic Culture with RTL Example](#arabic-culture-with-rtl-example)

---

## Locale Property

By default, the DateRangePicker uses `en-US` culture for date formatting and week/month names. Set the `locale` property to apply a different culture.

```cshtml
<ejs-daterangepicker id="daterangepicker"
    locale="de"
    placeholder="Wählen Sie einen Bereich aus">
</ejs-daterangepicker>
```

---

## Loading CLDR Data

To display month/day names in a non-English culture, load CLDR JSON data using the `loadCldr` method. The required files are:

- `ca-gregorian.json`
- `numbers.json`
- `timeZoneNames.json`

**Install CLDR data via npm:**

```bash
npm install cldr-data --save
```

Copy the relevant culture folder from `node_modules/cldr-data/main/{culture}/` into `wwwroot/scripts/cldr-data/main/{culture}/`.

**Load CLDR data in your view script:**

```javascript
function loadCultureFiles(name) {
    var files = ['ca-gregorian.json', 'numbers.json', 'timeZoneNames.json'];
    var loader = ej.base.loadCldr;
    var loadCulture = function (prop) {
        var val, ajax;
        ajax = new ej.base.Ajax(
            location.origin + location.pathname +
            '/../../scripts/cldr-data/main/' + name + '/' + files[prop],
            'GET',
            false
        );
        ajax.onSuccess = function (value) { val = value; };
        ajax.send();
        loader(JSON.parse(val));
    };
    for (var prop = 0; prop < files.length; prop++) {
        loadCulture(prop);
    }
}
```

Call this before initializing the component: `loadCultureFiles('de');`

---

## L10n Text Localization

The DateRangePicker has static UI text that can be localized using `L10n.load`. Localizable keys:

| Key | Description |
|---|---|
| `placeholder` | Hint text in the input field |
| `startLabel` | Label for the start date |
| `endLabel` | Label for the end date |
| `applyText` | Text for the Apply button in the popup footer |
| `cancelText` | Text for the Cancel button in the popup footer |
| `selectedDays` | Label for the selected days count |
| `days` | Text representing "days" |
| `customRange` | Text for the custom range button in the presets panel |

**Example for German (`de`):**

```javascript
var L10n = ej.base.L10n;
L10n.load({
    'de': {
        'daterangepicker': {
            placeholder:   'Wählen Sie einen Bereich aus',
            startLabel:    'Wählen Sie Startdatum',
            endLabel:      'Wählen Sie Enddatum',
            applyText:     'Sich bewerben',
            cancelText:    'Stornieren',
            selectedDays:  'Ausgewählte Tage',
            days:          'Tage',
            customRange:   'benutzerdefinierten Bereich'
        }
    }
});
```

---

## German Culture Example

**View:**

```cshtml
<ejs-daterangepicker id="daterangepicker" locale="de"></ejs-daterangepicker>

<script>
    // Load L10n text for German
    var L10n = ej.base.L10n;
    L10n.load({
        'de': {
            'daterangepicker': {
                placeholder:  'Wählen Sie einen Bereich aus',
                startLabel:   'Wählen Sie Startdatum',
                endLabel:     'Wählen Sie Enddatum',
                applyText:    'Sich bewerben',
                cancelText:   'Stornieren',
                selectedDays: 'Ausgewählte Tage',
                days:         'Tage',
                customRange:  'benutzerdefinierten Bereich'
            }
        }
    });

    // Load CLDR data for German calendar/number formatting
    loadCultureFiles('de');
</script>
```

---

## Right-to-Left (RTL)

Set `enableRtl="true"` to render the DateRangePicker with a right-to-left layout. This is used for languages like Arabic and Hebrew.

```cshtml
<ejs-daterangepicker id="daterangepicker"
    locale="ar"
    enableRtl="true">
</ejs-daterangepicker>
```

---

## Arabic Culture with RTL Example

```cshtml
<ejs-daterangepicker id="daterangepicker"
    locale="ar"
    enableRtl="true">
</ejs-daterangepicker>

<script>
    var L10n = ej.base.L10n;
    L10n.load({
        'ar': {
            'daterangepicker': {
                placeholder:  'حدد نطاقًا',
                startLabel:   'تاريخ البدء',
                endLabel:     'تاريخ الانتهاء',
                applyText:    'تطبيق',
                cancelText:   'إلغاء',
                selectedDays: 'أيام محددة',
                days:         'أيام',
                customRange:  'نطاق مخصص'
            }
        }
    });

    loadCultureFiles('ar');
</script>
```
