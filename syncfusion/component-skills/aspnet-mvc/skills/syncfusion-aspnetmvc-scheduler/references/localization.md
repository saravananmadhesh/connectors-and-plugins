# Localization

## Table of Contents
1. [Culture Configuration](#culture-configuration)
2. [Language Support](#language-support)
3. [Date and Time Formats](#date-and-time-formats)
4. [Custom Locale Strings](#custom-locale-strings)
5. [RTL Support](#rtl-support)

## Culture Configuration

Set scheduler culture/language:

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("550px")
    .Locale("hu")
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.datasource })
    .Render()
)
```
```csharp
<script>
    var L10n = ej.base.L10n;
    L10n.load({
        "hu": {
            "schedule": {
                "day": "Nap",
                "week": "Hét",
                "workWeek": "Munkahét",
                "month": "Hónap",
                "year": "Év",
                "agenda": "Napirend",
                "weekAgenda": "Hét menetrend",
                "workWeekAgenda": "Munkahét napirend",
                "monthAgenda": "Havi menetrend",
                "today": "Ma",
                "noEvents": "Nincs esemény",
                "emptyContainer": "Ezen a napon nincsenek események.",
                "allDay": "Egész nap",
                "start": "Rajt",
                "end": "vég",
                "more": "több",
                "close": "Bezárás",
                "cancel": "Megszünteti",
                "noTitle": "(Nincs cím)",
                "delete": "Töröl",
                "deleteEvent": "Esemény törlése",
                "deleteMultipleEvent": "Több esemény törlése",
                "selectedItems": "A kiválasztott elemek",
                "deleteSeries": "Sorozat törlése",
                "edit": "szerkesztése",
                "editSeries": "Szerkesztés",
                "editEvent": "Esemény szerkesztése",
                "createEvent": "teremt",
                "subject": "Tantárgy",
                "addTitle": "Cím hozzáadása",
                "moreDetails": "További részletek",
                "moreEvents": "Több esemény",
                "save": "Mentés",
                "editContent": "Csak ezt az eseményt vagy egész sorozatot szeretné szerkeszteni?",
                "deleteRecurrenceContent": "Csak ezt az eseményt vagy egész sorozatot szeretné törölni?",
                "deleteContent": "Biztosan törölni szeretné ezt az eseményt?",
                "deleteMultipleContent": "Biztosan törli a kiválasztott eseményeket?",
                "newEvent": "Új esemény",
                "title": "Cím",
                "location": "Elhelyezkedés",
                "description": "Leírás",
                "timezone": "Időzóna",
                "startTimezone": "Indítsa el az időzónát",
                "endTimezone": "Időzóna vége",
                "repeat": "Ismétlés",
                "saveButton": "Mentés",
                "cancelButton": "Megszünteti",
                "deleteButton": "Töröl",
                "recurrence": "Ismétlődés",
                "wrongPattern": "Az ismétlődési minta nem érvényes.",
                "seriesChangeAlert": "A sorozat egyes példányaiban végrehajtott módosítások törlésre kerülnek, és ezek az események ismét megegyeznek a sorozattal.",
                "createError": "Az esemény időtartamának rövidebbnek kell lennie, mint a gyakorisága. Rövidítse az időtartamot, vagy változtassa meg az ismétlődési esemény szerkesztőjének ismétlődési mintáját.",
                "recurrenceDateValidation": "Néhány hónap kevesebb, mint a kiválasztott dátum. Ezekben a hónapokban az esemény a hónap utolsó napjára esik.",
                "sameDayAlert": "Ugyanezen esemény két eseménye nem fordulhat elő ugyanazon a napon.",
                "occurenceAlert": "Nem lehet átütemezni az ismétlődő találkozó előfordulását, ha átugrik ugyanazon találkozó későbbi előfordulását.",
                "editRecurrence": "Ismétlés szerkesztése",
                "repeats": "ismétlődés",
                "alert": "Éber",
                "startEndError": "A kiválasztott befejezési dátum a kezdő dátum előtt történik.",
                "invalidDateError": "A megadott dátumérték érvénytelen.",
                "blockAlert": "Az eseményeket nem lehet ütemezni a blokkolt időtartományon belül.",
                "ok": "Rendben",
                "yes": "Igen",
                "no": "Nem",
                "occurrence": "Esemény",
                "series": "Sorozat",
                "previous": "Előző",
                "next": "Következő",
                "timelineDay": "Idővonal napja",
                "timelineWeek": "Idősor-hét",
                "timelineWorkWeek": "Idővonal munkahét",
                "timelineMonth": "Idővonal hónap",
                "timelineYear": "Idővonal év",
                "expandAllDaySection": "kiterjed",
                "collapseAllDaySection": "összeomlás",
                "editFollowingEvent": "Következő események",
                "deleteTitle": "Esemény törlése",
                "editTitle": "Esemény szerkesztése",
                "beginFrom": "Kezdje",
                "endAt": "Vége",
                "searchTimezone": "Időzóna keresése",
                "noRecords": "Nincs találat"
            },
            "recurrenceeditor": {
                "none": "Egyik sem",
                "daily": "Napi",
                "weekly": "Heti",
                "monthly": "Havi",
                "month": "Hónap",
                "yearly": "Évi",
                "never": "Soha",
                "until": "Amíg",
                "count": "Számol",
                "first": "Első",
                "second": "Második",
                "third": "Harmadik",
                "fourth": "Negyedik",
                "last": "Utolsó",
                "repeat": "Ismétlés",
                "repeatEvery": "Ismételje meg minden",
                "on": "Ismétlés",
                "end": "vég",
                "onDay": "Nap",
                "days": "Napok)",
                "weeks": "Hét (ok)",
                "months": "Hónap (ok)",
                "years": "Évek)",
                "every": "minden",
                "summaryTimes": "idő (s)",
                "summaryOn": "tovább",
                "summaryUntil": "amíg",
                "summaryRepeat": "ismétlődés",
                "summaryDay": "napok)",
                "summaryWeek": "heti (s)",
                "summaryMonth": "hónap (ok)",
                "summaryYear": "évek)",
                "monthWeek": "Hónap",
                "monthPosition": "Havi pozíció",
                "monthExpander": "Hónaposító",
                "yearExpander": "Év bővítő",
                "repeatInterval": "Ismételje meg az intervallumot"
            },
            "calendar": {
                "today": "Ma"
            }
        }
    });
    loadCultureFiles('hu');
    function loadCultureFiles(name) {
        var files = ['ca-gregorian.json', 'numberingSystems.json', 'numbers.json', 'timeZoneNames.json', 'ca-islamic.json'];
        var loader = ej.base.loadCldr;
        var loadCulture = function (prop) {
            var val, ajax;
            if (files[prop] === 'numberingSystems.json') {
                ajax = new ej.base.Ajax(location.origin + '/../Scripts/cldr-data/supplemental/' + files[prop], 'GET', false);
            } else {
                ajax = new ej.base.Ajax(location.origin + '/../Scripts/cldr-data/main/' + name + '/' + files[prop], 'GET', false);
            }
            ajax.onSuccess = function (value) {
                val = value;
            };
            ajax.send();
            loader(JSON.parse(val));
        };
        for (var prop = 0; prop < files.length; prop++) {
            loadCulture(prop);
        }
    }
</script>
```

### Culture Code Format
- `en-US` - English (United States)
- `en-GB` - English (Great Britain)
- `es-ES` - Spanish (Spain)
- `es-MX` - Spanish (Mexico)
- `fr-FR` - French (France)
- `de-DE` - German (Germany)
- `it-IT` - Italian (Italy)
- `pt-BR` - Portuguese (Brazil)
- `ja-JP` - Japanese
- `zh-CN` - Chinese (Simplified)
- `zh-TW` - Chinese (Traditional)
- `ru-RU` - Russian
- `ar-SA` - Arabic (Saudi Arabia)
- `hu` - Hungarian (Hungary)

## Language Support

Supported languages:

```cshtml
// English
.Locale("en-US")

// Spanish
.Locale("es-ES")

// French
.Locale("fr-FR")

// German
.Locale("de-DE")

// Portuguese
.Locale("pt-BR")

// Japanese
.Locale("ja-JP")

// Chinese
.Locale("zh-CN")

// Arabic
.Locale("ar-SA")

// Hungarian
.Locale("hu")
```

### Load Culture Files (CLDR)

The Internationalization library formats and parses numbers, dates, and times using the official Unicode CLDR JSON data and exposes `loadCldr` to load culture-specific CLDR data. By default, the Scheduler uses `en-US`; for any other culture, follow the short setup below.

1. **Install the CLDR-Data package** (it ships the culture-specific CLDR JSON files; see its README for details):
   ```bash
   npm install cldr-data --save
   ```
   After install, the culture JSON data lives under `node_modules/cldr-data`.

2. **Mirror the required JSON files into the project** under `Scripts/`:
   - Create the folders `Scripts/cldr-data/supplemental` and `Scripts/cldr-data/main`.
   - Copy `numberingSystems.json` from `node_modules/cldr-data/supplemental` into `Scripts/cldr-data/supplemental` (this file is shared by every culture).
   - From `node_modules/cldr-data/main/<culture_code>` (e.g. `de`, `hu`, `fr`, `es`, ...), create a matching folder under `Scripts/cldr-data/main` (e.g. `Scripts/cldr-data/main/hu`) and copy the culture's JSON files.

   Files required by the Scheduler (5 total per culture):
   - `numberingSystems.json` (supplemental — shared)
   - `ca-gregorian.json`
   - `numbers.json`
   - `timeZoneNames.json`
   - `ca-islamic.json`

3. **Load the files at runtime** with `ej.base.loadCldr` via a small `loadCultureFiles(name)` helper (see the *Custom Locale Strings* section — the Hungarian example ends with `loadCultureFiles('hu')`).

## Date and Time Formats

Localized date/time display:

```cshtml
@Html.EJS().Schedule("Schedule")
    .Locale("es-ES")
    .TimeFormat("HH:mm") // 24-hour format
    .DateFormat("dd/MM/yyyy")
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.datasource })
    .Render()
```

### Format Codes
| Code | Meaning | Example |
|------|---------|---------|
| dd | Day of month (2 digits) | 05 |
| ddd | Day name (abbreviated) | Mon |
| dddd | Day name (full) | Monday |
| MM | Month (2 digits) | 03 |
| MMM | Month name (abbreviated) | Mar |
| MMMM | Month name (full) | March |
| yy | Year (2 digits) | 24 |
| yyyy | Year (4 digits) | 2024 |
| HH | Hours (24-hour) | 14 |
| hh | Hours (12-hour) | 02 |
| mm | Minutes | 30 |
| ss | Seconds | 45 |
| a | AM/PM | PM |

## Custom Locale Strings

Override default translations:

```javascript
ej.base.L10n.load({
    'es': {
        'schedule': {
            'saveButton': 'Guardar',
            'cancelButton': 'Cancelar',
            'deleteButton': 'Eliminar',
            'newEvent': 'Nuevo Evento',
            'editEvent': 'Editar Evento',
            'subject': 'Asunto',
            'location': 'Ubicación',
            'startTime': 'Hora de inicio',
            'endTime': 'Hora de finalización'
        }
    }
});
```

### Set Custom Translations in C#
```csharp
var localeStrings = new Dictionary<string, object>
{
    { "saveButton", "Guardar" },
    { "cancelButton", "Cancelar" },
    { "deleteButton", "Eliminar" },
    { "newEvent", "Nuevo Evento" }
};
```

## RTL Support

Enable right-to-left layout:

```cshtml
@Html.EJS().Schedule("Schedule")
    .Locale("ar-SA") // Arabic
    .EnableRtl(true)
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.datasource })
    .Render()
```

### RTL Languages
- Arabic (ar-*)
- Hebrew (he-IL)
- Farsi (fa-IR)
- Urdu (ur-PK)

### RTL CSS
```css
.e-schedule.e-rtl {
    direction: rtl;
}

.e-schedule.e-rtl .e-sidebar {
    right: 0;
    left: auto;
}

.e-schedule.e-rtl .e-toolbar {
    flex-direction: row-reverse;
}
```

### Combined RTL Setup
```cshtml
@Html.EJS().Schedule("Schedule")
    .Locale("ar-SA")
    .EnableRtl(true)
    .Timezone("Asia/Dubai")
    .Views(new string[] { "Day", "Week", "Month" })
    .CurrentView(ScheduleView.Week)
    .Render()
```
