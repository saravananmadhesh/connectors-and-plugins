````markdown
# Localization, RTL and Formatting in Angular Gantt Chart

## Table of Contents
- [Setting the Locale](#setting-the-locale)
- [Loading Translations (L10n)](#loading-translations-l10n)
- [Gantt Locale Key Reference](#gantt-locale-key-reference)
- [Right-to-Left (RTL)](#right-to-left-rtl)
- [Timezone Configuration](#timezone-configuration)
- [Column Date Formatting](#column-date-formatting)
- [Column Number Formatting](#column-number-formatting)

---

## Setting the Locale

Set the `locale` property to apply a language culture to Gantt UI strings:

```html
<ejs-gantt locale="fr" ...></ejs-gantt>
```

Combine with `setCulture` from `@syncfusion/ej2-base` for date/number formatting:

```typescript
import { setCulture } from '@syncfusion/ej2-base';
setCulture('fr');
```

---

## Loading Translations (L10n)

Call `L10n.load()` **before** the component is initialized to provide translated strings for all Gantt UI text:

```typescript
import { L10n, setCulture } from '@syncfusion/ej2-base';

// In main.ts or app.config.ts — before bootstrapping
L10n.load({
  'fr': {
    'gantt': {
      'id': 'Identifiant',
      'name': 'Nom de la tâche',
      'startDate': 'Date de début',
      'endDate': 'Date de fin',
      'duration': 'Durée',
      'progress': 'Progression',
      'dependency': 'Dépendances',
      'notes': 'Remarques',
      'baselines': 'Bases de référence',
      'baselineStartDate': 'Début de référence',
      'baselineEndDate': 'Fin de référence',
      'resourceName': 'Ressources',
      'resourceID': 'ID Ressource',
      'workUnit': 'Unité de travail',
      'taskType': 'Type de tâche',
      'add': 'Ajouter',
      'edit': 'Modifier',
      'update': 'Mettre à jour',
      'delete': 'Supprimer',
      'cancel': 'Annuler',
      'search': 'Rechercher',
      'task': 'Tâche',
      'tasks': 'Tâches',
      'zoomIn': 'Zoom avant',
      'zoomOut': 'Zoom arrière',
      'zoomToFit': 'Ajuster',
      'expandAll': 'Développer tout',
      'collapseAll': 'Réduire tout',
      'undo': 'Annuler',
      'redo': 'Rétablir',
      'excelExport': 'Export Excel',
      'pdfExport': 'Export PDF',
      'csvExport': 'Export CSV',
      'okText': 'OK',
      'confirmDelete': 'Voulez-vous supprimer l\'enregistrement ?',
      'from': 'De',
      'to': 'À',
      'taskBeforePredecessor_FS': 'Vous avez déplacé \"{0}\" avant que \"{1}\" se termine...',
      'taskAfterPredecessor_FS': '\"{0}\" a été déplacé et n\'est plus dépendant de \"{1}\".',
      'invalidLink': 'Lien invalide',
      'taskInformation': 'Informations sur la tâche',
      'deleteTask': 'Supprimer la tâche',
      'deleteDependency': 'Supprimer la dépendance',
      'convert': 'Convertir',
      'save': 'Enregistrer',
      'above': 'Au-dessus',
      'below': 'En dessous',
      'child': 'Enfant',
      'milestone': 'Jalon',
      'toTask': 'Vers tâche',
      'toMilestone': 'Vers jalon',
      'eventMarkers': 'Marqueurs d\'événements',
      'leftTaskLabel': 'Étiquette gauche',
      'rightTaskLabel': 'Étiquette droite',
      'timelineCell': 'Cellule chronologie',
      'collapseAllTasks': 'Réduire toutes les tâches',
      'expandAllTasks': 'Développer toutes les tâches',
      'durationUnit': {
        'day': 'Jour',
        'hour': 'Heure',
        'minute': 'Minute',
        'days': 'Jours',
        'hours': 'Heures',
        'minutes': 'Minutes'
      }
    }
  }
});

setCulture('fr');
```

---

## Gantt Locale Key Reference

Key strings available in the `'gantt'` namespace for translation:

| Key | Default (en) | Purpose |
|---|---|---|
| `id` | `'ID'` | Task ID column header |
| `name` | `'Name'` | Task name column header |
| `startDate` | `'Start Date'` | Start Date column header |
| `endDate` | `'End Date'` | End Date column header |
| `duration` | `'Duration'` | Duration column header |
| `progress` | `'Progress'` | Progress column header |
| `dependency` | `'Dependency'` | Dependency column header |
| `notes` | `'Notes'` | Notes tab label |
| `resourceName` | `'Resources'` | Resources column header |
| `add` | `'Add'` | Add toolbar button |
| `edit` | `'Edit'` | Edit toolbar button |
| `update` | `'Update'` | Update toolbar button |
| `delete` | `'Delete'` | Delete toolbar button |
| `cancel` | `'Cancel'` | Cancel toolbar button |
| `search` | `'Search'` | Search placeholder |
| `zoomIn` | `'Zoom In'` | Zoom In toolbar button |
| `zoomOut` | `'Zoom Out'` | Zoom Out toolbar button |
| `zoomToFit` | `'Zoom To Fit'` | Zoom To Fit toolbar button |
| `expandAll` | `'Expand All'` | Expand All toolbar button |
| `collapseAll` | `'Collapse All'` | Collapse All toolbar button |
| `undo` | `'Undo'` | Undo toolbar button |
| `redo` | `'Redo'` | Redo toolbar button |
| `excelExport` | `'Excel Export'` | Excel Export toolbar button |
| `pdfExport` | `'PDF Export'` | PDF Export toolbar button |
| `confirmDelete` | `'Are you sure...'` | Delete confirmation dialog text |
| `taskInformation` | `'Task Information'` | Context menu / dialog title |
| `deleteTask` | `'Delete Task'` | Context menu item |
| `deleteDependency` | `'Delete Dependency'` | Context menu item |
| `convert` | `'Convert'` | Convert context menu item |
| `save` | `'Save'` | Save context menu item |
| `above` | `'Above'` | Add above context menu item |
| `below` | `'Below'` | Add below context menu item |
| `child` | `'Child'` | Add child context menu item |
| `milestone` | `'Milestone'` | Milestone context menu item |
| `toTask` | `'To Task'` | Convert to task context menu item |
| `toMilestone` | `'To Milestone'` | Convert to milestone context menu item |
| `invalidLink` | `'Invalid Link'` | Dependency validation message |
| `durationUnit.day` | `'day'` | Duration unit label |
| `durationUnit.hour` | `'hour'` | Duration unit label |

---

## Right-to-Left (RTL)

Enable RTL layout for Arabic, Hebrew, and other right-to-left languages:

```html
<ejs-gantt [enableRtl]="true" locale="ar" ...></ejs-gantt>
```

**RTL effects:**
- Column headers render right-to-left
- TreeGrid expand/collapse icons shift to right side
- Taskbar connector arrows reverse direction
- Dialog and toolbar button layout reverses
- Scrollbar appears on left side

```typescript
import { L10n, setCulture } from '@syncfusion/ej2-base';

// Load Arabic translations
L10n.load({
  'ar': {
    'gantt': {
      'id': 'المعرف',
      'name': 'اسم المهمة',
      'startDate': 'تاريخ البدء',
      'duration': 'المدة',
      'progress': 'التقدم',
      'add': 'إضافة',
      'edit': 'تعديل',
      'delete': 'حذف',
      'cancel': 'إلغاء',
      'update': 'تحديث'
    }
  }
});

setCulture('ar');
```

```html
<ejs-gantt [enableRtl]="true" locale="ar"></ejs-gantt>
```

---

## Timezone Configuration

By default, the Gantt uses the browser's system timezone. Use `timezone` to fix all dates to a specific IANA timezone for consistent display across global users:

```html
<ejs-gantt [timezone]="'UTC'" ...></ejs-gantt>
```

```html
<ejs-gantt [timezone]="'America/New_York'" ...></ejs-gantt>
```

Common IANA timezone values:

| Timezone | String |
|---|---|
| UTC | `'UTC'` |
| US Eastern | `'America/New_York'` |
| US Central | `'America/Chicago'` |
| US Pacific | `'America/Los_Angeles'` |
| London | `'Europe/London'` |
| Paris | `'Europe/Paris'` |
| Berlin | `'Europe/Berlin'` |
| India | `'Asia/Kolkata'` |
| Tokyo | `'Asia/Tokyo'` |
| Sydney | `'Australia/Sydney'` |

> The `timezone` property is most useful when the timeline shows hours. Set `timelineViewMode: 'Hour'` or configure `bottomTier.unit: 'Hour'`.

---

## Column Date Formatting

Control how dates are displayed in columns using the `format` property:

```typescript
public columns: object[] = [
  {
    field: 'StartDate',
    headerText: 'Start Date',
    format: 'MM/dd/yyyy',    // Custom pattern
    type: 'date'
  },
  {
    field: 'EndDate',
    headerText: 'End Date',
    format: { type: 'date', skeleton: 'yMd' }  // Locale-aware skeleton
  }
];
```

Common date format tokens:

| Token | Example | Meaning |
|---|---|---|
| `MM/dd/yyyy` | `04/15/2024` | US date format |
| `dd/MM/yyyy` | `15/04/2024` | European format |
| `yyyy-MM-dd` | `2024-04-15` | ISO format |
| `MMM dd, yyyy` | `Apr 15, 2024` | Long format |
| `yMd` (skeleton) | Locale-aware | Adapts to locale |

---

## Column Number Formatting

Format numeric columns using standard format strings:

```typescript
public columns: object[] = [
  { field: 'Progress', format: 'N0', textAlign: 'Right' },  // Integer
  { field: 'Cost',     format: 'C2', textAlign: 'Right' },  // Currency
  { field: 'Rate',     format: 'P1', textAlign: 'Right' },  // Percentage
];
```

| Format | Example | Meaning |
|---|---|---|
| `'N0'` | `42` | Number, 0 decimals |
| `'N2'` | `42.50` | Number, 2 decimals |
| `'C0'` | `$42` | Currency, 0 decimals |
| `'C2'` | `$42.50` | Currency, 2 decimals |
| `'P0'` | `75%` | Percentage, 0 decimals |
| `'P1'` | `75.5%` | Percentage, 1 decimal |
````
