# Kanban Localization and RTL

## Table of Contents
- [Locale Keys Reference](#locale-keys-reference)
- [Loading a Translation](#loading-a-translation)
- [Right-to-Left (RTL) Mode](#right-to-left-rtl-mode)

## Locale Keys Reference

The following text strings in the Kanban UI can be localized. The default locale is `en-US`.

| Locale Key | Default (en-US) | Used In |
|---|---|---|
| `items` | `items` | Column/swimlane card count badge |
| `min` | `Min` | Min-count constraint tooltip |
| `max` | `Max` | Max-count constraint tooltip |
| `cardsSelected` | `Cards Selected` | Multi-selection popup |
| `addTitle` | `Add New Card` | Dialog title for new card |
| `editTitle` | `Edit Card Details` | Dialog title for editing |
| `deleteTitle` | `Delete Card` | Confirmation dialog title |
| `deleteContent` | `Are you sure you want to delete this card?` | Confirmation message |
| `save` | `Save` | Dialog Save button |
| `delete` | `Delete` | Dialog Delete button |
| `cancel` | `Cancel` | Dialog Cancel button |
| `yes` | `Yes` | Confirmation yes button |
| `no` | `No` | Confirmation no button |
| `close` | `Close` | Dialog close icon tooltip |
| `noCard` | `No cards to display` | Empty column message |
| `unassigned` | `Unassigned` | Swimlane label for cards with no swimlane value |

## Loading a Translation

Use `L10n.load()` from `@syncfusion/ej2-base` to register translations **before** the component renders, then pass the locale code to the `locale` prop:

```vue
<template>
  <ejs-kanban keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings" :swimlaneSettings="swimlaneSettings"
    locale="de">
    <e-columns>
      <e-column headerText="To Do"       keyField="Open"       minCount="6"></e-column>
      <e-column headerText="In Progress" keyField="InProgress" maxCount="3"></e-column>
      <e-column headerText="Done"        keyField="Close"></e-column>
    </e-columns>
  </ejs-kanban>
</template>

<script setup>
import { KanbanComponent as EjsKanban, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-kanban';
import { extend, L10n } from '@syncfusion/ej2-base';
import { kanbanData } from './datasource.js';

// Register German translations — call BEFORE mounting
L10n.load({
  'de': {
    'kanban': {
      'items':          'Artikel',
      'min':            'Min',
      'max':            'Max',
      'cardsSelected':  'Karten ausgewählt',
      'addTitle':       'Neue Karte hinzufügen',
      'editTitle':      'Kartendetails bearbeiten',
      'deleteTitle':    'Karte löschen',
      'deleteContent':  'Möchten Sie diese Karte wirklich löschen?',
      'save':           'speichern',
      'delete':         'Löschen',
      'cancel':         'Stornieren',
      'yes':            'Ja',
      'no':             'Nein',
      'close':          'Schließen',
      'noCard':         'Keine Karten zum Anzeigen',
      'unassigned':     'nicht zugewiesen',
    },
  },
});

const data             = extend([], kanbanData, null, true);
const cardSettings     = { contentField: 'Summary', headerField: 'Id' };
const swimlaneSettings = { keyField: 'Assignee' };
</script>
```

`L10n.load` is global — you can call it once in `main.js` / `main.ts` for app-wide effect.

## Right-to-Left (RTL) Mode

Enable RTL layout for Arabic, Farsi, Urdu, and other right-to-left languages by setting `enableRtl` to `true` and providing the matching `locale`:

```vue
<template>
  <ejs-kanban keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings" :swimlaneSettings="swimlaneSettings"
    locale="ar" :enableRtl="true">
    <e-columns>
      <e-column headerText="To Do"       keyField="Open"       minCount="2"></e-column>
      <e-column headerText="In Progress" keyField="InProgress" maxCount="3"></e-column>
      <e-column headerText="Done"        keyField="Close"></e-column>
    </e-columns>
  </ejs-kanban>
</template>

<script setup>
import { KanbanComponent as EjsKanban, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-kanban';
import { extend, L10n } from '@syncfusion/ej2-base';
import { kanbanData } from './datasource.js';

L10n.load({
  'ar': {
    'kanban': {
      'items':          'العناصر',
      'min':            'أنا',
      'max':            'ماكس',
      'cardsSelected':  'تم تحديد البطاقات',
      'addTitle':       'إضافة بطاقة جديدة',
      'editTitle':      'تحرير تفاصيل البطاقة',
      'deleteTitle':    'حذف البطاقة',
      'deleteContent':  'هل أنت متأكد أنك تريد حذف هذه البطاقة؟',
      'save':           'حفظ',
      'delete':         'حذف',
      'cancel':         'إلغاء',
      'yes':            'نعم',
      'no':             'لا',
      'close':          'قريب',
      'noCard':         'لا توجد بطاقات لعرضها',
      'unassigned':     'غير معين',
    },
  },
});

const data             = extend([], kanbanData, null, true);
const cardSettings     = { contentField: 'Summary', headerField: 'Id' };
const swimlaneSettings = { keyField: 'Assignee' };
</script>
```

RTL mode mirrors the entire board layout — column order, card alignment, and swimlane direction are all reversed.
