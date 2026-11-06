# DatePicker — Globalization

## Table of Contents
- [Overview](#overview)
- [Setting a Locale](#setting-a-locale)
- [Loading CLDR Data](#loading-cldr-data)
- [Localizing Static Text](#localizing-static-text)
- [German Culture Example](#german-culture-example)
- [Right-To-Left (RTL) Support](#right-to-left-rtl-support)
- [Arabic Culture with RTL Example](#arabic-culture-with-rtl-example)

---

## Overview

Globalization combines **internationalization** (parsing/formatting dates per culture) and **localization** (translating static UI text). By default, the DatePicker uses the `en-US` (American English) culture. Use the `locale` property and CLDR data to switch to other cultures.

---

## Setting a Locale

```cshtml
<ejs-datepicker id="datepicker" locale="de"></ejs-datepicker>
```

This changes date format, month/day names, and week start day to match the German culture.

---

## Loading CLDR Data

For cultures other than English, load the CLDR JSON data in JavaScript. Place the CLDR files under `wwwroot/scripts/cldr-data/` (copy from the `cldr-data` npm package).

```javascript
function loadCultureFiles(name) {
    var files = ['ca-gregorian.json', 'numbers.json', 'timeZoneNames.json', 'weekData.json'];
    var loader = ej.base.loadCldr;
    var loadCulture = function (prop) {
        var val, ajax;
        ajax = new ej.base.Ajax(
            location.origin + location.pathname + '/../../scripts/cldr-data/main/' + name + '/' + files[prop],
            'GET', false
        );
        ajax.onSuccess = function (value) { val = value; };
        ajax.send();
        loader(JSON.parse(val));
    };
    for (var prop = 0; prop < files.length; prop++) {
        loadCulture(prop);
    }
}

loadCultureFiles('de');
```

---

## Localizing Static Text

Translate the built-in `today` button label and `placeholder` hint using `L10n.load`:

```javascript
var L10n = ej.base.L10n;
L10n.load({
    'de': {
        'datepicker': {
            placeholder: 'Wählen Sie ein Datum',
            today: 'heute'
        }
    }
});
```

Supported locale keys for DatePicker:

| Key | Description |
|---|---|
| `today` | Label for the "Today" button |
| `placeholder` | Input placeholder hint |

---

## German Culture Example

```html
<script>
    var L10n = ej.base.L10n;
    L10n.load({
        'de': {
            'datepicker': {
                placeholder: 'Wählen Sie ein Datum',
                today: 'heute'
            }
        }
    });
    loadCultureFiles('de');
</script>
```

```cshtml
<ejs-datepicker id="datepicker"
    locale="de"
    placeholder="Wählen Sie ein Datum">
</ejs-datepicker>
```

---

## Right-To-Left (RTL) Support

Use `enableRtl="true"` to render the DatePicker in right-to-left direction for languages such as Arabic and Hebrew.

```cshtml
<ejs-datepicker id="datepicker"
    locale="ar"
    enableRtl="true"
    placeholder="اختر تاريخاً">
</ejs-datepicker>
```

---

## Arabic Culture with RTL Example

```html
<script>
    var L10n = ej.base.L10n;
    L10n.load({
        'ar': {
            'datepicker': {
                placeholder: 'اختر تاريخاً',
                today: 'اليوم'
            }
        }
    });
    loadCultureFiles('ar');
</script>
```

```cshtml
<ejs-datepicker id="datepicker"
    locale="ar"
    enableRtl="true">
</ejs-datepicker>
```

The calendar popup and input will be rendered right-to-left with Arabic month/day names.
