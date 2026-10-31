# Globalization – ASP.NET Core Calendar

## Table of Contents
- [Overview](#overview)
- [Setting the Culture with Locale](#setting-the-culture-with-locale)
- [Loading CLDR Data](#loading-cldr-data)
- [Localizing the Today Button Text](#localizing-the-today-button-text)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
- [Islamic Calendar Mode](#islamic-calendar-mode)
- [Examples](#examples)

---

## Overview

Globalization in the Calendar combines two aspects:
- **Internationalization (i18n):** Formatting and parsing dates based on a culture (CLDR data)
- **Localization (l10n):** Translating static text (e.g., "Today" button label)

By default, the Calendar uses **American English (`en-US`)** culture. All date formats, week and month names follow this culture unless overridden.

---

## Setting the Culture with Locale

Use the `locale` property to set the culture:

```cshtml
@* German culture *@
<ejs-calendar id="calendar" locale="de"></ejs-calendar>
```

```cshtml
@* Arabic culture *@
<ejs-calendar id="calendar" locale="ar"></ejs-calendar>
```

---

## Loading CLDR Data

For non-English cultures, you must load the CLDR JSON data. Install it via npm:

```
npm install cldr-data --save
```

Copy the CLDR culture files to `wwwroot/scripts/cldr-data/` and load them in JavaScript:

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

// Call before rendering the Calendar
loadCultureFiles('de');
```

---

## Localizing the Today Button Text

Use the `L10n` class to override static text for the current culture:

```javascript
var L10n = ej.base.L10n;

// German
L10n.load({
    "de": {
        "calendar": {
            "today": "heute"
        }
    }
});

// Arabic
L10n.load({
    "ar": {
        "calendar": {
            "today": "اليوم"
        }
    }
});
```

| Locale Key | Translatable Text |
|------------|------------------|
| `today` | Text for the Today button in the footer |

---

## Right-to-Left (RTL) Support

Enable right-to-left layout for languages like Arabic and Hebrew using `enableRtl`:

```cshtml
@* Arabic culture with RTL *@
<ejs-calendar id="calendar" locale="ar" enableRtl="true"></ejs-calendar>
```

RTL flips the Calendar layout: navigation arrows swap positions, month/year header is right-aligned, and day cells flow right-to-left.

---

## Islamic Calendar Mode

The Calendar can display the **Islamic (Hijri) lunar calendar** by setting `calendarMode` to `Islamic`:

```cshtml
<ejs-calendar id="calendar"
    calendarMode="Syncfusion.EJ2.Calendars.CalendarType.Islamic">
</ejs-calendar>
```

The Islamic calendar:
- Is a lunar calendar with 12 months in a year of 354 or 355 days
- Supports all Gregorian features: min/max, week numbers, start day, multi-selection, RTL, localization, start/depth view, and day cell customization
- Default mode is `Gregorian`

---

## Examples

### German Culture with Localized Today Button
```cshtml
@* Load CLDR in script, then render: *@
<ejs-calendar id="calendar" locale="de"></ejs-calendar>

<script>
    ej.base.L10n.load({
        "de": { "calendar": { "today": "heute" } }
    });
    loadCultureFiles('de');
</script>
```

### Arabic Culture with RTL
```cshtml
<ejs-calendar id="calendar" locale="ar" enableRtl="true"></ejs-calendar>

<script>
    ej.base.L10n.load({
        "ar": { "calendar": { "today": "اليوم" } }
    });
    loadCultureFiles('ar');
</script>
```

### Islamic Calendar (Hijri Mode)
```cshtml
<ejs-calendar id="calendar"
    calendarMode="Syncfusion.EJ2.Calendars.CalendarType.Islamic"
    locale="ar"
    enableRtl="true">
</ejs-calendar>
```

---

## Key Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `locale` | `string` | `""` (en-US) | Culture code for date formatting and month/day names |
| `enableRtl` | `bool` | `false` | Enables right-to-left layout |
| `calendarMode` | `CalendarType` | `Gregorian` | `Gregorian` or `Islamic` calendar display |

**CalendarType enum values:** `Gregorian`, `Islamic`
