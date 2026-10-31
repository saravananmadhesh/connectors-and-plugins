# Globalization and Localization — Syncfusion ASP.NET MVC Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Setting the Locale](#setting-the-locale)
- [Loading Locale Strings](#loading-locale-strings)
- [Full Locale Key Reference](#full-locale-key-reference)
- [Internationalization](#internationalization)
- [Loading CLDR Data](#loading-cldr-data)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)

---

## Overview

The Syncfusion ASP.NET MVC Gantt component supports globalization through two mechanisms:

1. **Localization** — translates UI strings (toolbar labels, dialog headings, button text, validation messages) into the target language using `ej.base.L10n.load()`.
2. **Internationalization** — formats dates and numbers according to locale rules. The Gantt component uses Syncfusion's EJ2 internationalization engine, which reads CLDR data for formatting.

---

## Setting the Locale

Set the `Locale` property on the Gantt builder to apply a BCP 47 language tag. This affects all UI text, date formatting, and number formatting.

**View (`Index.cshtml`):**

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .Locale("de-DE")
    .TaskFields(tf => tf
        .Id("TaskId")
        .Name("TaskName")
        .StartDate("StartDate")
        .Duration("Duration")
        .Progress("Progress")
        .Child("SubTasks"))
    .Render()
```

**Controller (`HomeController.cs`):**

```csharp
public ActionResult Index()
{
    ViewBag.DataSource = GanttData.ProjectNewData();
    return View();
}
```

---

## Loading Locale Strings

Call `ej.base.L10n.load()` in a script block on the view page, before the Gantt renders. Supply an object keyed by locale code containing a `gantt` entry with all string keys.

```html
<script>
    ej.base.L10n.load({
        'de-DE': {
            'gantt': {
                'emptyRecord': 'Keine Einträge vorhanden',
                'id': 'ID',
                'name': 'Name',
                'startDate': 'Startdatum',
                'endDate': 'Enddatum',
                'duration': 'Dauer',
                'progress': 'Fortschritt',
                'dependency': 'Abhängigkeit',
                'notes': 'Notizen',
                'baselineStartDate': 'Basis-Startdatum',
                'baselineEndDate': 'Basis-Enddatum',
                'taskMode': 'Aufgabenmodus',
                'changeScheduleMode': 'Planungsmodus ändern',
                'subTasksStartDate': 'Unteraufgaben-Startdatum',
                'subTasksEndDate': 'Unteraufgaben-Enddatum',
                'scheduleStartDate': 'Geplantes Startdatum',
                'scheduleEndDate': 'Geplantes Enddatum',
                'auto': 'Automatisch',
                'manual': 'Manuell',
                'type': 'Typ',
                'offset': 'Versatz',
                'resourceName': 'Ressourcen',
                'resourceID': 'Ressourcen-ID',
                'day': 'Tag',
                'hour': 'Stunde',
                'minute': 'Minute',
                'days': 'Tage',
                'hours': 'Stunden',
                'minutes': 'Minuten',
                'generalTab': 'Allgemein',
                'customTab': 'Benutzerdefinierte Spalten',
                'writeNotes': 'Notizen schreiben',
                'addDialogTitle': 'Neue Aufgabe',
                'editDialogTitle': 'Aufgabeninformationen',
                'saveButton': 'Speichern',
                'add': 'Hinzufügen',
                'edit': 'Bearbeiten',
                'update': 'Aktualisieren',
                'delete': 'Löschen',
                'cancel': 'Abbrechen',
                'search': 'Suchen',
                'task': 'Aufgabe',
                'tasks': 'Aufgaben',
                'zoomIn': 'Vergrößern',
                'zoomOut': 'Verkleinern',
                'zoomToFit': 'An Bildschirm anpassen',
                'excelExport': 'Excel exportieren',
                'csvExport': 'CSV exportieren',
                'pdfExport': 'PDF exportieren',
                'expandAll': 'Alle aufklappen',
                'collapseAll': 'Alle zuklappen',
                'nextTimeSpan': 'Nächste Zeitspanne',
                'prevTimeSpan': 'Vorherige Zeitspanne',
                'okText': 'OK',
                'confirmDelete': 'Möchten Sie den Eintrag wirklich löschen?',
                'from': 'Von',
                'to': 'Bis',
                'taskLink': 'Aufgabenverknüpfung',
                'lag': 'Verzögerung',
                'start': 'Start',
                'finish': 'Ende',
                'enterValue': 'Wert eingeben',
                'taskBeforePredecessor_FS': 'Sie haben "{0}" auf einen Zeitpunkt vor dem Ende von "{1}" verschoben, aber sie sind über einen Fertigstellung-Start-Vorgang verknüpft...',
                'taskAfterPredecessor_FS': 'Sie haben "{0}" nach "{1}" verschoben, aber sie sind über einen Fertigstellung-Start-Vorgang verknüpft...',
                'taskBeforePredecessor_SS': 'Sie haben "{0}" auf einen Zeitpunkt vor dem Start von "{1}" verschoben, aber sie sind über einen Start-Start-Vorgang verknüpft...',
                'taskAfterPredecessor_SS': 'Sie haben "{0}" nach "{1}" verschoben, aber sie sind über einen Start-Start-Vorgang verknüpft...',
                'taskBeforePredecessor_FF': 'Sie haben "{0}" auf einen Zeitpunkt vor dem Ende von "{1}" verschoben, aber sie sind über einen Fertigstellung-Fertigstellung-Vorgang verknüpft...',
                'taskAfterPredecessor_FF': 'Sie haben "{0}" nach "{1}" verschoben, aber sie sind über einen Fertigstellung-Fertigstellung-Vorgang verknüpft...',
                'taskBeforePredecessor_SF': 'Sie haben "{0}" auf einen Zeitpunkt vor dem Start von "{1}" verschoben, aber sie sind über einen Start-Fertigstellung-Vorgang verknüpft...',
                'taskAfterPredecessor_SF': 'Sie haben "{0}" nach "{1}" verschoben, aber sie sind über einen Start-Fertigstellung-Vorgang verknüpft...',
                'okButton': 'OK',
                'confirmDeleteTitle': 'Löschen bestätigen',
                'predecessorEditingTooltipMessage': 'Typ und Verzögerung des Vorgängers eingeben',
                'predecessor': 'Vorgänger',
                'month': 'Monat',
                'week': 'Woche',
                'year': 'Jahr',
                'work': 'Arbeit',
                'taskType': 'Aufgabentyp',
                'unassignedTask': 'Nicht zugewiesene Aufgabe',
                'group': 'Gruppe'
            }
        }
    });
</script>
```

---

## Full Locale Key Reference

The following table lists all supported Gantt locale keys. Supply only the keys whose default values need to be changed.

| Key | Default (English) | Description |
|---|---|---|
| `emptyRecord` | `No records to display` | Empty grid message |
| `id` | `ID` | Task ID column header |
| `name` | `Name` | Task name column header |
| `startDate` | `Start Date` | Start date column header |
| `endDate` | `End Date` | End date column header |
| `duration` | `Duration` | Duration column header |
| `progress` | `Progress` | Progress column header |
| `dependency` | `Dependency` | Dependency column header |
| `notes` | `Notes` | Notes column header |
| `baselineStartDate` | `Baseline Start Date` | Baseline start date column header |
| `baselineEndDate` | `Baseline End Date` | Baseline end date column header |
| `taskMode` | `Task Mode` | Task mode column header |
| `changeScheduleMode` | `Change Schedule Mode` | Context menu item |
| `subTasksStartDate` | `SubTasks Start Date` | Sub-tasks start date |
| `subTasksEndDate` | `SubTasks End Date` | Sub-tasks end date |
| `scheduleStartDate` | `Schedule Start Date` | Scheduled start date |
| `scheduleEndDate` | `Schedule End Date` | Scheduled end date |
| `auto` | `Auto` | Auto mode label |
| `manual` | `Manual` | Manual mode label |
| `type` | `Type` | Dependency type |
| `offset` | `Offset` | Dependency offset |
| `resourceName` | `Resources` | Resources column header |
| `resourceID` | `Resource ID` | Resource ID column header |
| `day` | `day` | Day unit |
| `hour` | `hour` | Hour unit |
| `minute` | `minute` | Minute unit |
| `days` | `days` | Days (plural) |
| `hours` | `hours` | Hours (plural) |
| `minutes` | `minutes` | Minutes (plural) |
| `generalTab` | `General` | Dialog General tab label |
| `customTab` | `Custom Columns` | Dialog Custom Columns tab label |
| `writeNotes` | `Write Notes` | Notes tab placeholder |
| `addDialogTitle` | `New Task` | Add dialog title |
| `editDialogTitle` | `Task Information` | Edit dialog title |
| `saveButton` | `Save` | Save button text |
| `add` | `Add` | Add button / toolbar label |
| `edit` | `Edit` | Edit toolbar label |
| `update` | `Update` | Update button text |
| `delete` | `Delete` | Delete toolbar label |
| `cancel` | `Cancel` | Cancel button text |
| `search` | `Search` | Search toolbar placeholder |
| `task` | `task` | Singular task text |
| `tasks` | `tasks` | Plural task text |
| `zoomIn` | `Zoom In` | Toolbar Zoom In label |
| `zoomOut` | `Zoom Out` | Toolbar Zoom Out label |
| `zoomToFit` | `Zoom To Fit` | Toolbar Zoom To Fit label |
| `excelExport` | `Excel Export` | Toolbar Excel export label |
| `csvExport` | `CSV Export` | Toolbar CSV export label |
| `pdfExport` | `PDF Export` | Toolbar PDF export label |
| `expandAll` | `Expand All` | Toolbar Expand All label |
| `collapseAll` | `Collapse All` | Toolbar Collapse All label |
| `nextTimeSpan` | `Next Timespan` | Toolbar Next Timespan label |
| `prevTimeSpan` | `Previous Timespan` | Toolbar Previous Timespan label |
| `okText` | `OK` | Confirmation dialog OK text |
| `confirmDelete` | `Are you sure you want to Delete Record?` | Delete confirmation message |
| `from` | `From` | Dependency dialog From label |
| `to` | `To` | Dependency dialog To label |
| `taskLink` | `Task Link` | Dependency dialog title |
| `lag` | `Lag` | Dependency lag field label |
| `start` | `Start` | Start label |
| `finish` | `Finish` | Finish label |
| `enterValue` | `Enter the value` | Inline input placeholder |
| `month` | `Month` | Month unit |
| `week` | `Week` | Week unit |
| `year` | `Year` | Year unit |
| `work` | `Work` | Work column header |
| `taskType` | `Task Type` | Task type label |
| `unassignedTask` | `Unassigned Task` | Unassigned task label |
| `group` | `Group` | Group label |

---

## Internationalization

The Syncfusion Internationalization library (ej.base) is used to format numbers, dates, and times in the Gantt component according to the active locale. Setting the locale property activates culture-specific formatting automatically.

```cshtml
<script>
    ej.base.L10n.load({
        'de-DE': {
            'gantt': {
                'id': 'Ich würde',
                'name': 'Name',
                'startDate': 'Anfangsdatum',
                'duration': 'Dauer',
                'progress': 'Fortschritt'
            }
        }
    });

    // Load required CLDR JSON files before the Gantt is initialized.
    loadCultureFiles('de-DE');
    function loadCultureFiles(name) {
        var files = ['numberingSystems.json', 'ca-gregorian.json', 'numbers.json'];
        var loader = ej.base.loadCldr;

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var url = (file === 'numberingSystems.json')
                ? (location.origin + '/../Scripts/cldr-data/supplemental/' + file)
                : (location.origin + '/../Scripts/cldr-data/main/' + name + '/' + file);

            var ajax = new ej.base.Ajax(url, 'GET', false);
            var val;
            ajax.onSuccess = function (value) {
                val = value;
            };
            ajax.send();
            loader(JSON.parse(val));
        }

        ej.base.setCulture(name);
    }
</script>

@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .TaskFields(ts =>
        ts.Id("TaskId")
            .Name("TaskName")
            .StartDate("StartDate")
            .EndDate("EndDate")
            .Duration("Duration")
            .Progress("Progress")
            .Child("SubTasks"))
    .Locale("de-DE")
    .Render()
```


> The timeline uses NumberFormatOptions and DateFormatOptions internally. Changing the locale will update number separators, date formats, and time notation accordingly.

---

## Loading CLDR Data

For full date and number formatting in non-English locales, load the relevant CLDR JSON files. Use an AJAX call to load the CLDR data before the Gantt initializes.

```html
<script>
    // Load CLDR data via fetch (or jQuery AJAX)
    var cldrData = {};
    var cldrFiles = [
        '/Scripts/cldr-data/supplemental/numberingSystems.json',
        '/Scripts/cldr-data/main/de/ca-gregorian.json',
        '/Scripts/cldr-data/main/de/numbers.json',
        '/Scripts/cldr-data/main/de/timeZoneNames.json',
        '/Scripts/cldr-data/supplemental/weekData.json'
    ];

    Promise.all(cldrFiles.map(url => fetch(url).then(r => r.json())))
        .then(responses => {
            responses.forEach(data => ej.base.loadCldr(data));
            ej.base.setCulture('de-DE');
            ej.base.setCurrencyCode('EUR');
        });
</script>
```

> The CLDR JSON files are available via the `cldr-data` npm package. Copy the required locale folder to your `Scripts` directory.

---

## Right-to-Left (RTL) Support

Enable RTL for right-to-left language locales (e.g., Arabic, Hebrew) by combining `EnableRtl(true)` with the appropriate `Locale()`.

**View (`Index.cshtml`):**

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .EnableRtl(true)
    .Locale("ar-AE")
    .TaskFields(tf => tf
        .Id("TaskId")
        .Name("TaskName")
        .StartDate("StartDate")
        .Duration("Duration")
        .Progress("Progress")
        .Child("SubTasks"))
    .Render()
```

**Load Arabic locale strings:**

```html
<script>
    ej.base.L10n.load({
        'ar-AE': {
            'gantt': {
                'emptyRecord': 'لا توجد سجلات للعرض',
                'id': 'المعرف',
                'name': 'الاسم',
                'startDate': 'تاريخ البدء',
                'endDate': 'تاريخ الانتهاء',
                'duration': 'المدة',
                'progress': 'التقدم',
                'saveButton': 'حفظ',
                'add': 'إضافة',
                'edit': 'تعديل',
                'update': 'تحديث',
                'delete': 'حذف',
                'cancel': 'إلغاء',
                'search': 'بحث',
                'expandAll': 'توسيع الكل',
                'collapseAll': 'طي الكل'
            }
        }
    });
</script>
```

> **Note:** When `EnableRtl(true)` is set, the Gantt chart's layout is mirrored. The grid panel appears on the right and the chart panel on the left.

