# Globalization – ASP.NET Core TimePicker

## Table of Contents
- [Overview](#overview)
- [Setting the Locale](#setting-the-locale)
- [Loading CLDR Data](#loading-cldr-data)
- [L10n Placeholder Localization](#l10n-placeholder-localization)
- [German Culture Example](#german-culture-example)
- [Right-To-Left (RTL) Support](#right-to-left-rtl-support)
- [Arabic Culture with RTL Example](#arabic-culture-with-rtl-example)

---

## Overview

Globalization allows the TimePicker to adapt to different cultures by formatting time values and supporting locale-specific text. By default, the component uses `American English (en-US)` culture. It uses the [EJ2 Internationalization](https://ej2.syncfusion.com/aspnetcore/documentation/common/internationalization) package and official UNICODE CLDR data.

---

## Setting the Locale

Set the `Locale` property to switch the culture:

```cshtml
<ejs-timepicker id="timepicker" locale="de" placeholder="Wählen Sie Zeit"></ejs-timepicker>
```

The culture affects how the time format and meridian names (AM/PM) are displayed.

---

## Loading CLDR Data

For cultures other than English, you must load the CLDR JSON data files. Install the `cldr-data` npm package:

```
npm install cldr-data --save
```

Copy the culture-specific JSON files from `/node_modules/cldr-data` to `wwwroot/scripts/cldr-data`.

Required files for each culture:
- `ca-gregorian.json`
- `numbers.json`
- `timeZoneNames.json`

For Arabic, also include:
- `numberingSystems.json` (from the `supplemental` folder)

**Loading CLDR files in JavaScript:**
```javascript
function loadCultureFiles(name) {
    var files = ['ca-gregorian.json', 'numbers.json', 'timeZoneNames.json'];
    var loader = ej.base.loadCldr;
    var loadCulture = function (prop) {
        var val, ajax;
        if (name === 'ar' && prop === files.length - 1) {
            ajax = new ej.base.Ajax(
                location.origin + location.pathname +
                '/../../scripts/cldr-data/supplemental/' + files[prop],
                'GET', false
            );
        } else {
            ajax = new ej.base.Ajax(
                location.origin + location.pathname +
                '/../../scripts/cldr-data/main/' + name + '/' + files[prop],
                'GET', false
            );
        }
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

## L10n Placeholder Localization

Use `L10n.load` to set localized placeholder text before switching the locale:

```javascript
var L10n = ej.base.L10n;
L10n.load({
    'de': {
        'timepicker': { placeholder: 'Wählen Sie Zeit' }
    }
});
```

---

## German Culture Example

```cshtml
<ejs-timepicker id="timepicker" placeholder="Select Time"></ejs-timepicker>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        var timepicker = document.getElementById('timepicker').ej2_instances[0];
        var L10n = ej.base.L10n;
        L10n.load({
            'de': {
                'timepicker': { placeholder: 'Wählen Sie Zeit' }
            }
        });
        loadCultureFiles('de');
        timepicker.locale = 'de';
    });

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
</script>
```

---

## Right-To-Left (RTL) Support

Set `EnableRtl="true"` to render the TimePicker in right-to-left direction, used for languages like Arabic and Hebrew.

```cshtml
<ejs-timepicker id="timepicker" placeholder="Select a time" enableRtl="true"></ejs-timepicker>
```

This changes the layout direction of the input and popup elements to RTL.

---

## Arabic Culture with RTL Example

```cshtml
<ejs-timepicker id="timepicker" placeHolder="Select a time" enableRtl="true"></ejs-timepicker>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        var timepicker = document.getElementById('timepicker').ej2_instances[0];
        var L10n = ej.base.L10n;
        L10n.load({
            'ar': {
                'timepicker': { placeholder: 'حدد الوقت' }
            }
        });
        loadCultureFiles('ar');
        timepicker.locale = 'ar';
    });

    function loadCultureFiles(name) {
        var files = ['ca-gregorian.json', 'numbers.json', 'timeZoneNames.json'];
        if (name === 'ar') {
            files.push('numberingSystems.json');
        }
        var loader = ej.base.loadCldr;
        var loadCulture = function (prop) {
            var val, ajax;
            if (name === 'ar' && prop === files.length - 1) {
                ajax = new ej.base.Ajax(
                    location.origin + location.pathname +
                    '/../../scripts/cldr-data/supplemental/' + files[prop],
                    'GET', false
                );
            } else {
                ajax = new ej.base.Ajax(
                    location.origin + location.pathname +
                    '/../../scripts/cldr-data/main/' + name + '/' + files[prop],
                    'GET', false
                );
            }
            ajax.onSuccess = function (value) { val = value; };
            ajax.send();
            loader(JSON.parse(val));
        };
        for (var prop = 0; prop < files.length; prop++) {
            loadCulture(prop);
        }
    }
</script>
```

> When using `EnableRtl` with Arabic, always load the `numberingSystems.json` supplemental file as well.
