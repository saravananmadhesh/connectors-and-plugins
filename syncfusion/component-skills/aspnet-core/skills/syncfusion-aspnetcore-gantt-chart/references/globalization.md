``markdown
# Globalization — Syncfusion ASP.NET Core Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Localization](#localization)
- [Locale Key Reference](#locale-key-reference)
- [Loading a Translation (Deutsch Example)](#loading-a-translation-deutsch-example)
- [Internationalization](#internationalization)
- [Loading CLDR Culture Files](#loading-cldr-culture-files)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)

---

## Overview

Syncfusion ASP.NET Core Gantt Chart supports full globalization through three capabilities:

| Feature | Purpose |
|---|---|
| **Localization** | Translate static UI text (toolbar labels, dialog buttons, messages) |
| **Internationalization** | Format numbers, dates, and times according to a culture |
| **RTL** | Reverse layout direction for right-to-left languages (Arabic, Urdu, etc.) |

The default locale is **en-US**.

---

## Localization

Use the locale property on <ejs-gantt> to specify the target culture code. Provide the translated strings by calling ej.base.L10n.load() before the component renders.

`cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.DataSource" height="450px" locale="de-DE">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
        duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
ej.base.L10n.load({
    'de-DE': {
        'gantt': {
            "id": "Ich würde",
            "name": "Name",
            "startDate": "Anfangsdatum",
            "duration": "Dauer",
            "progress": "Fortschritt"
        }
    }
});
</script>
`

| Property | Type | Default | Description |
|---|---|---|---|
| locale | string | "en-US" | BCP 47 language tag for the target culture |

---

## Locale Key Reference

The following table lists all localizable keys used by the Gantt component. Provide values for any keys you want to override for a custom culture.

| Locale Key | Default (en-US) |
|---|---|
| emptyRecord | No records to display |
| id | ID |
| name | Name |
| startDate | Start Date |
| endDate | End Date |
| duration | Duration |
| progress | Progress |
| dependency | Dependency |
| notes | Notes |
| baselineStartDate | Baseline Start Date |
| baselineEndDate | Baseline End Date |
| type | Type |
| offset | Offset |
| resourceName | Resources |
| resourceID | Resource ID |
| day | day |
| hour | hour |
| minute | minute |
| days | days |
| hours | hours |
| minutes | minutes |
| generalTab | General |
| customTab | Custom Columns |
| writeNotes | Write Notes |
| addDialogTitle | New Task |
| editDialogTitle | Task Information |
| add | Add |
| edit | Edit |
| update | Update |
| delete | Delete |
| cancel | Cancel |
| search | Search |
| task | task |
| tasks | tasks |
| zoomIn | Zoom in |
| zoomOut | Zoom out |
| zoomToFit | Zoom to fit |
| expandAll | Expand all |
| collapseAll | Collapse all |
| nextTimeSpan | Next timespan |
| prevTimeSpan | Previous timespan |
| saveButton | Save |
| okText | Ok |
| confirmDelete | Are you sure you want to Delete Record? |
| from | From |
| to | To |
| taskLink | Task Link |
| lag | Lag |
| start | Start |
| finish | Finish |
| enterValue | Enter the value |
| taskInformation | Task Information |
| deleteTask | Delete Task |
| deleteDependency | Delete Dependency |
| convert | Convert |
| save | Save |
| above | Above |
| below | Below |
| child | Child |
| milestone | Milestone |
| toTask | To Task |
| toMilestone | To Milestone |
| eventMarkers | Event markers |
| leftTaskLabel | Left task label |
| rightTaskLabel | Right task label |
| timelineCell | Timeline cell |
| changeScheduleMode | Change Schedule Mode |
| subTasksStartDate | SubTasks Start Date |
| subTasksEndDate | SubTasks End Date |
| scheduleStartDate | Schedule Start Date |
| scheduleEndDate | Schedule End Date |
| auto | Auto |
| manual | Manual |
| excelExport | Excel export |
| csvExport | CSV export |
| pdfExport | Pdf export |
| unit | Unit |
| work | Work |
| taskType | Task Type |
| unassignedTask | Unassigned Task |
| group | Group |
| FF | FF |
| FS | FS |
| SF | SF |
| SS | SS |
| confirmPredecessorDelete | Are you sure you want to remove dependency link? |

---

## Loading a Translation (Deutsch Example)

The example below demonstrates the Gantt rendering in **Deutsch (de-DE)** culture by loading translations and CLDR data.

`cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.DataSource" height="450px" locale="de-DE">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
        duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
ej.base.L10n.load({
    'de-DE': {
        'gantt': {
            "id": "Ich würde",
            "name": "Name",
            "startDate": "Anfangsdatum",
            "duration": "Dauer",
            "progress": "Fortschritt"
        }
    }
});

loadCultureFiles('de-DE');

function loadCultureFiles(name) {
    var files = ['ca-gregorian.json', 'numbers.json'];
    var loader = ej.base.loadCldr;
    var loadCulture = function (prop) {
        var val, ajax;
        if (files[prop] === 'numberingSystems.json') {
            ajax = new ej.base.Ajax(location.origin + '/../Scripts/cldr-data/supplemental/' + files[prop], 'GET', false);
        } else {
            ajax = new ej.base.Ajax(location.origin + '/../Scripts/cldr-data/main/' + name + '/' + files[prop], 'GET', false);
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
`

---

## Internationalization

The Syncfusion Internationalization library (ej.base) is used to format numbers, dates, and times in the Gantt component according to the active locale. Setting the locale property activates culture-specific formatting automatically.

`cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.DataSource" height="450px" locale="de-DE">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
        duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
`

> The timeline uses NumberFormatOptions and DateFormatOptions internally. Changing the locale will update number separators, date formats, and time notation accordingly.

---

## Loading CLDR Culture Files

For full internationalization support (calendar formats, number systems, etc.) you need to load CLDR (Common Locale Data Repository) JSON files for the target culture. These files are available from the cldr-data npm package.

**Required CLDR files per culture:**

| File | Location |
|---|---|
| ca-gregorian.json | cldr-data/main/<culture>/ |
| numbers.json | cldr-data/main/<culture>/ |
| numberingSystems.json | cldr-data/supplemental/ |

**Loading pattern:**
`javascript
loadCultureFiles('de-DE');

function loadCultureFiles(name) {
    var files = ['ca-gregorian.json', 'numbers.json'];
    // ... load each file via AJAX and call ej.base.loadCldr(json)
}
`

---

## Right-to-Left (RTL) Support

Set enableRtl="true" to reverse the component layout for right-to-left languages such as Arabic or Hebrew. Combine with the appropriate locale value and translated strings.

`cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.DataSource" height="450px"
           enableRtl="true" locale="ar-AE"
           toolbar="@(new List<string>() { "CollapseAll", "ExpandAll" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
        duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
ej.base.L10n.load({
    'ar-AE': {
        "gantt": {
            "emptyRecord": "لا سجلات لعرضها",
            "name": "اسم",
            "startDate": "تاريخ البدء",
            "endDate": "تاريخ الانتهاء",
            "duration": "المدة الزمنية",
            "progress": "تقدم",
            "add": "إضافة",
            "edit": "تعديل",
            "update": "تحديث",
            "delete": "حذف",
            "cancel": "إلغاء",
            "expandAll": "توسيع الكل",
            "collapseAll": "انهيار جميع",
            "zoomIn": "تكبير",
            "zoomOut": "تصغير",
            "zoomToFit": "تكبير لتناسب"
        }
    }
});
</script>
`

**RTL key properties:**

| Property | Type | Default | Description |
|---|---|---|---|
| enableRtl | boolean | false | Enables right-to-left layout for the entire component |
| locale | string | "en-US" | Culture code for RTL language (e.g., "ar-AE") |

> When enableRtl is enabled, the splitter, toolbar, grid columns, and chart timeline all flip to a right-to-left layout.

---
