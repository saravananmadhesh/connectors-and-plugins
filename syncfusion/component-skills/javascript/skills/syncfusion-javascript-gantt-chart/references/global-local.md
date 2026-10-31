# Globalization & Localization in Syncfusion Gantt Chart

## Table of Contents
- [Localization](#localization)
- [Internationalization](#internationalization)
- [Right-to-Left (RTL)](#right-to-left-rtl)

---

## Localization

Use `L10n.load()` with the `locale` property to translate Gantt's static text into other languages.

```typescript
import { L10n, setCulture } from '@syncfusion/ej2-base';
import { Gantt } from '@syncfusion/ej2-gantt';

setCulture('de-DE');

L10n.load({
    'de-DE': {
        'gantt': {
            'id': 'Ich würde',
            'name': 'Name',
            'startDate': 'Anfangsdatum',
            'duration': 'Dauer',
            'progress': 'Fortschritt',
            'add': 'Hinzufügen',
            'edit': 'Bearbeiten',
            'update': 'Aktualisieren',
            'delete': 'Löschen',
            'cancel': 'Abbrechen',
            'search': 'Suchen',
            'expandAll': 'Alle erweitern',
            'collapseAll': 'Alle reduzieren'
        }
    }
});

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    locale: 'de-DE',
    taskFields: {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        duration: 'Duration',
        progress: 'Progress',
        child: 'subtasks'
    }
});
gantt.appendTo('#Gantt');
```

### Complete Locale Key Reference

**Task fields & columns:**

| Key | Default Text |
|-----|-------------|
| `emptyRecord` | No records to display |
| `id` | ID |
| `name` | Name |
| `startDate` | Start Date |
| `endDate` | End Date |
| `duration` | Duration |
| `progress` | Progress |
| `dependency` | Dependency |
| `notes` | Notes |
| `baselineStartDate` | Baseline Start Date |
| `baselineEndDate` | Baseline End Date |
| `type` | Type |
| `offset` | Offset |
| `resourceName` | Resources |
| `resourceID` | Resource ID |
| `day` / `days` | day / days |
| `hour` / `hours` | hour / hours |
| `minute` / `minutes` | minute / minutes |
| `unit` | Unit |
| `work` | Work |
| `taskType` | Task Type |
| `unassignedTask` | Unassigned Task |
| `group` | Group |
| `FF` / `FS` / `SF` / `SS` | FF / FS / SF / SS |

**Dialog & tabs:**

| Key | Default Text |
|-----|-------------|
| `generalTab` | General |
| `customTab` | Custom Columns |
| `writeNotes` | Write Notes |
| `addDialogTitle` | New Task |
| `editDialogTitle` | Task Information |
| `taskInformation` | Task Information |
| `taskMode` | Task Mode |
| `changeScheduleMode` | Change Schedule Mode |
| `subTasksStartDate` | SubTasks Start Date |
| `subTasksEndDate` | SubTasks End Date |
| `scheduleStartDate` | Schedule Start Date |
| `scheduleEndDate` | Schedule End Date |
| `auto` / `manual` | Auto / Manual |

**Toolbar & actions:**

| Key | Default Text |
|-----|-------------|
| `add` / `edit` / `update` / `delete` / `cancel` | Add / Edit / Update / Delete / Cancel |
| `search` | Search |
| `saveButton` / `save` | Save |
| `task` / `tasks` | task / tasks |
| `zoomIn` / `zoomOut` / `zoomToFit` | Zoom in / Zoom out / Zoom to fit |
| `expandAll` / `collapseAll` | Expand all / Collapse all |
| `nextTimeSpan` / `prevTimeSpan` | Next timespan / Previous timespan |
| `excelExport` / `csvExport` / `pdfExport` | Excel export / CSV export / Pdf export |

**Context menu & dependency:**

| Key | Default Text |
|-----|-------------|
| `above` / `below` / `child` | Above / Below / Child |
| `milestone` | Milestone |
| `toTask` / `toMilestone` | To Task / To Milestone |
| `deleteTask` / `deleteDependency` | Delete Task / Delete Dependency |
| `convert` | Convert |
| `from` / `to` | From / To |
| `taskLink` | Task Link |
| `lag` | Lag |
| `start` / `finish` | Start / Finish |
| `enterValue` | Enter the value |
| `okText` | Ok |
| `confirmDelete` | Are you sure you want to Delete Record? |
| `confirmPredecessorDelete` | Are you sure you want to remove dependency link? |

**Labels & timeline:**

| Key | Default Text |
|-----|-------------|
| `eventMarkers` | Event markers |
| `leftTaskLabel` | Left task label |
| `rightTaskLabel` | Right task label |
| `timelineCell` | Timeline cell |

**Predecessor validation messages** (placeholders: `{0}` = moved task, `{1}` = predecessor):

| Key | Default Text |
|-----|-------------|
| `taskBeforePredecessor_FS` | You moved "{0}" to start before "{1}" finishes and the two tasks are linked… |
| `taskAfterPredecessor_FS` | You moved "{0}" away from "{1}" and the two tasks are linked… |
| `taskBeforePredecessor_SS` | You moved "{0}" to start before "{1}" starts and the two tasks are linked… |
| `taskAfterPredecessor_SS` | You moved "{0}" to start after "{1}" starts and the two tasks are linked… |
| `taskBeforePredecessor_FF` | You moved "{0}" to finish before "{1}" finishes and the two tasks are linked… |
| `taskAfterPredecessor_FF` | You moved "{0}" to finish after "{1}" finishes and the two tasks are linked… |
| `taskBeforePredecessor_SF` | You moved "{0}" away from "{1}" to starts and the two tasks are linked… |
| `taskAfterPredecessor_SF` | You moved "{0}" to finish after "{1}" starts and the two tasks are linked… |

---

## Internationalization

To globalize number and date formatting (e.g., German number separators, locale-specific date formats), load CLDR data alongside localization:

```typescript
import { L10n, loadCldr, setCulture } from '@syncfusion/ej2-base';
import * as cagregorian from './ca-gregorian.js';
import * as numbers from './numbers.js';
import { Gantt } from '@syncfusion/ej2-gantt';

loadCldr(cagregorian, numbers);
setCulture('de-DE');

L10n.load({ 'de-DE': { 'gantt': { /* ... locale keys */ } } });

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    locale: 'de-DE',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' }
});
gantt.appendTo('#Gantt');
```

> Default locale is `'en-US'`. CLDR data files can be found in the `@syncfusion/ej2-cldr-data` package.

---

## Right-to-Left (RTL)

Enable RTL layout for Arabic, Urdu, Hebrew and other RTL languages using `enableRtl: true` together with a matching locale:

```typescript
import { L10n, setCulture } from '@syncfusion/ej2-base';
import { Gantt, Toolbar } from '@syncfusion/ej2-gantt';

Gantt.Inject(Toolbar);

setCulture('ar-AE');

L10n.load({
    'ar-AE': {
        'gantt': {
            'emptyRecord': 'لا سجلات لعرضها',
            'id': 'هوية شخصية',
            'name': 'اسم',
            'startDate': 'تاريخ البدء',
            'endDate': 'تاريخ الانتهاء',
            'duration': 'المدة الزمنية',
            'progress': 'تقدم',
            'dependency': 'الاعتماد',
            'notes': 'ملاحظات',
            'baselineStartDate': 'تاريخ البدء الأساسي',
            'baselineEndDate': 'تاريخ نهاية خط الأساس',
            'type': 'اكتب',
            'offset': 'عوض',
            'resourceName': 'مصادر',
            'resourceID': 'معرف المورد',
            'day': 'يوم', 'hour': 'ساعة', 'minute': 'دقيقة',
            'days': 'أيام', 'hours': 'ساعات', 'minutes': 'الدقائق',
            'generalTab': 'جنرال لواء',
            'customTab': 'أعمدة مخصصة',
            'writeNotes': 'اكتب ملاحظات',
            'addDialogTitle': 'مهمة جديدة',
            'editDialogTitle': 'معلومات المهمة',
            'saveButton': 'حفظ', 'save': 'حفظ',
            'add': 'إضافة', 'edit': 'تعديل', 'update': 'تحديث',
            'delete': 'حذف', 'cancel': 'إلغاء', 'search': 'بحث',
            'task': ' مهمة', 'tasks': ' مهام',
            'zoomIn': 'تكبير', 'zoomOut': 'تصغير', 'zoomToFit': 'تكبير لتناسب',
            'expandAll': 'توسيع الكل', 'collapseAll': 'انهيار جميع',
            'nextTimeSpan': 'الجدول الزمني التالي',
            'prevTimeSpan': 'الجدول الزمني السابق',
            'excelExport': 'اكسل التصدير', 'csvExport': 'تصدير CSV',
            'okText': 'حسنا',
            'confirmDelete': 'هل أنت متأكد أنك تريد حذف السجل؟',
            'confirmPredecessorDelete': 'هل أنت متأكد أنك تريد إزالة رابط التبعية؟',
            'from': 'من عند', 'to': 'إلى',
            'taskLink': 'رابط المهمة', 'lag': 'بطئ',
            'start': 'بداية', 'finish': 'إنهاء',
            'enterValue': 'أدخل القيمة',
            'taskInformation': 'معلومات المهمة',
            'deleteTask': 'حذف المهمة', 'deleteDependency': 'حذف التبعية',
            'convert': 'تحويل',
            'above': 'في الاعلى', 'below': 'أدناه', 'child': 'طفل',
            'milestone': 'معلما', 'toTask': 'لمهمة', 'toMilestone': 'إلى معلم',
            'eventMarkers': 'علامات الحدث',
            'leftTaskLabel': 'تسمية المهمة اليسرى',
            'rightTaskLabel': 'تسمية المهمة الصحيحة',
            'timelineCell': 'خلية الجدول الزمني',
            'taskMode': 'وضع المهام', 'changeScheduleMode': 'تغيير وضع الجدول',
            'auto': 'تلقاءي', 'manual': 'كتيب',
            'unit': 'وحدة', 'work': 'عمل', 'taskType': 'نوع المهمة',
            'unassignedTask': 'مهمة غير محددة', 'group': 'مجموعة'
        }
    }
});

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    locale: 'ar-AE',
    enableRtl: true,        // reverses text direction and layout
    height: '450px',
    toolbar: ['ExpandAll', 'CollapseAll'],
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' }
});
gantt.appendTo('#Gantt');
```
