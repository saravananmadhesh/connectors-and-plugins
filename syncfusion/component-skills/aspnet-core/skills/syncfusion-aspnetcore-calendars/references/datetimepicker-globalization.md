# DateTimePicker – Globalization

## Table of Contents
- [Overview](#overview)
- [Setting Culture (locale)](#1-setting-culture-locale)
- [Loading CLDR Data](#2-loading-cldr-data)
- [Localizing Placeholder and Today Button](#3-localizing-placeholder-and-today-button)
- [Right-to-Left (RTL) Support](#4-right-to-left-rtl-support)
- [German Culture Example](#5-german-culture-example)
- [Arabic RTL Example](#6-arabic-rtl-example)

---

## Overview

Globalization adapts the DateTimePicker for different cultures — formatting dates and times, translating UI text, and supporting RTL languages. By default, the component uses `American English (en-US)` culture.

---

## 1. Setting Culture (locale)

Use the `locale` property to switch cultures:

```cshtml
<ejs-datetimepicker id="datetimepicker" locale="de"></ejs-datetimepicker>
```

The component uses CLDR (Unicode Common Locale Data Repository) JSON data for parsing and formatting.

---

## 2. Loading CLDR Data

For cultures other than English, install and load CLDR JSON data:

**Install:**
```
npm install cldr-data --save
```

Copy culture files from `node_modules/cldr-data` to `wwwroot/scripts/cldr-data/`.

**Load in JavaScript:**
```javascript
function loadCultureFiles(name) {
    var files = ['ca-gregorian.json', 'numbers.json', 'timeZoneNames.json'];
    var loader = ej.base.loadCldr;
    var loadCulture = function (prop) {
        var val, ajax;
        ajax = new ej.base.Ajax(
            location.origin + location.pathname +
            '/../../scripts/cldr-data/main/' + name + '/' + files[prop],
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
```

---

## 3. Localizing Placeholder and Today Button

Use `L10n.load()` to translate static UI text:

| Locale Key | Text |
|---|---|
| `today` | Label for the "Today" button |
| `placeholder` | Hint text for the input element |

```javascript
var L10n = ej.base.L10n;
L10n.load({
    'de': {
        'datetimepicker': {
            placeholder: 'Wählen Sie ein Datum und eine Uhrzeit aus',
            today: 'heute'
        }
    }
});
```

---

## 4. Right-to-Left (RTL) Support

Use `enableRtl` to render the component in right-to-left layout for languages like Arabic or Hebrew:

```cshtml
<ejs-datetimepicker id="datetimepicker"
    locale="ar"
    enableRtl="true">
</ejs-datetimepicker>
```

---

## 5. German Culture Example

```javascript
// Load CLDR data
loadCultureFiles('de');

// Set localized text
ej.base.L10n.load({
    'de': {
        'datetimepicker': {
            placeholder: 'Wählen Sie ein Datum und eine Uhrzeit aus',
            today: 'heute'
        }
    }
});
```

```cshtml
<ejs-datetimepicker id="datetimepicker" locale="de"></ejs-datetimepicker>
```

---

## 6. Arabic RTL Example

```javascript
loadCultureFiles('ar');

ej.base.L10n.load({
    'ar': {
        'datetimepicker': {
            placeholder: 'حدد تاريخًا ووقتًا',
            today: 'اليوم'
        }
    }
});
```

```cshtml
<ejs-datetimepicker id="datetimepicker"
    locale="ar"
    enableRtl="true">
</ejs-datetimepicker>
```

---

## API Reference

| Property | Type | Default | Description |
|---|---|---|---|
| `locale` | `string` | `""` (en-US) | Culture code for globalization |
| `enableRtl` | `bool` | `false` | Enable right-to-left layout |
| `firstDayOfWeek` | `int` | `0` (culture-based) | First day of week in calendar |
