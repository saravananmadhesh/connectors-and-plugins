# Localization and Accessibility

## Table of Contents
- [Localization](#localization)
  - [Setting Locale](#setting-locale)
  - [Load Translation Text](#load-translation-text)
  - [Common Locales](#common-locales)
- [Date and Time Formatting](#date-and-time-formatting)
  - [Setting Date Format](#setting-date-format)
  - [Setting Time Format](#setting-time-format)
  - [Date Format Patterns](#date-format-patterns)
  - [Time Format Patterns](#time-format-patterns)
- [Accessibility (ARIA)](#accessibility-aria)
  - [Keyboard Navigation](#keyboard-navigation)
  - [Screen Reader Support](#screen-reader-support)
  - [Enable Keyboard Interaction](#enable-keyboard-interaction)
  - [High Contrast Theme](#high-contrast-theme)

## Localization

### Setting Locale

Set scheduler to different culture:

```vue
<template>
  <ejs-schedule :locale="locale">
  </ejs-schedule>
</template>

<script setup>
import { loadCldr, L10n } from '@syncfusion/ej2-base';
import frNumberData from '@syncfusion/ej2-cldr-data/main/fr-CH/numbers.json';
import frTimeZoneData from '@syncfusion/ej2-cldr-data/main/fr-CH/timeZoneNames.json';
import frGregorian from '@syncfusion/ej2-cldr-data/main/fr-CH/ca-gregorian.json';
import frNumberingSystem from '@syncfusion/ej2-cldr-data/supplemental/numberingSystems.json';

// Load CLDR data
loadCldr(frNumberData, frTimeZoneData, frGregorian, frNumberingSystem);

const locale = 'fr-CH'; // French (Switzerland)
</script>
```

### Load Translation Text

Translate static scheduler text:

```vue
<script setup>
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
  'fr-CH': {
    'schedule': {
      'day': 'Jour',
      'week': 'Semaine',
      'workWeek': 'Semaine de travail',
      'month': 'Mois',
      'agenda': 'Ordre du jour',
      'today': "Aujourd'hui",
      'noEvents': 'Aucun événement',
      'allDay': 'Toute la journée',
      'start': 'Début',
      'end': 'Fin',
      'more': 'plus',
      'close': 'Fermer',
      'cancel': 'Annuler',
      'noTitle': '(Aucun titre)',
      'delete': 'Supprimer',
      'deleteEvent': "Supprimer l'événement",
      'deleteMultipleEvent': 'Supprimer plusieurs événements',
      'selectedItems': 'Articles sélectionnés',
      'deleteSeries': 'Série complète',
      'edit': 'Modifier',
      'editSeries': 'Série complète',
      'editEvent': "Modifier l'événement",
      'createEvent': 'Créer',
      'subject': 'Assujettir',
      'addTitle': 'Ajouter un titre',
      'moreDetails': 'Plus de détails',
      'save': 'Sauvegarder',
      'editContent': 'Voulez-vous modifier uniquement cet événement ou toute la série?',
      'deleteContent': 'Êtes-vous sûr de vouloir supprimer cet événement?',
      'deleteMultipleContent': 'Êtes-vous sûr de vouloir supprimer les événements sélectionnés?',
      'newEvent': 'Nouvel événement',
      'title': 'Titre',
      'location': 'Emplacement',
      'description': 'Description',
      'timezone': 'Fuseau horaire',
      'startTimezone': 'Fuseau horaire de début',
      'endTimezone': 'Fuseau horaire de fin',
      'repeat': 'Répéter',
      'saveButton': 'Sauvegarder',
      'cancelButton': 'Annuler',
      'deleteButton': 'Supprimer',
      'recurrence': 'Récurrence',
      'wrongPattern': 'Le modèle de récurrence n est pas valide.',
      'seriesChangeAlert': 'Les modifications apportées à des instances spécifiques de cette série seront annulées et ces événements correspondront à nouveau à la série.',
      'createError': 'La durée de l événement doit être plus courte que sa fréquence. Raccourcissez la durée ou modifiez le modèle de récurrence dans l éditeur d événements de récurrence.',
      'recurrenceDateValidation': 'Certains mois ont moins de dates que la date sélectionnée. Pour ces mois, l occurrence tombera le dernier jour du mois.',
      'sameDayAlert': 'Deux occurrences du même événement ne peuvent pas se produire le même jour.',
      'editRecurrence': 'Modifier la récurrence',
      'repeats': 'Répétitions',
      'alert': 'Alerte',
      'startEndError': 'La date de fin sélectionnée a lieu avant la date de début.',
      'invalidDateError': 'La valeur de date saisie n est pas valide.',
      'ok': 'D accord',
      'occurrence': 'Occurrence',
      'series': 'Séries',
      'previous': 'Précédent',
      'next': 'Prochain',
      'timelineDay': 'Chronologie Jour',
      'timelineWeek': 'Chronologie Semaine',
      'timelineWorkWeek': 'Chronologie Semaine de travail',
      'timelineMonth': 'Chronologie Mois'
    },
    'recurrenceeditor': {
      'none': 'Aucun',
      'daily': 'Du quotidien',
      'weekly': 'Hebdomadaire',
      'monthly': 'Mensuel',
      'month': 'Mois',
      'yearly': 'Annuel',
      'never': 'Jamais',
      'until': 'Jusqu à',
      'count': 'Compter',
      'first': 'Premier',
      'second': 'Seconde',
      'third': 'Troisième',
      'fourth': 'Quatrième',
      'last': 'Dernier',
      'repeat': 'Répéter',
      'repeatEvery': 'Répéter tous les',
      'on': 'Répéter sur',
      'end': 'Fin',
      'onDay': 'Jour',
      'days': 'Journées',
      'weeks': 'Semaines',
      'months': 'Mois',
      'years': 'Années',
      'every': 'chaque',
      'summaryTimes': 'fois)',
      'summaryOn': 'sur',
      'summaryUntil': 'jusqu à',
      'summaryRepeat': 'Répétitions',
      'summaryDay': 'journées)',
      'summaryWeek': 'semaines)',
      'summaryMonth': 'mois)',
      'summaryYear': 'années)'
    }
  }
});
</script>
```

### Common Locales

| Culture | Code | Description |
|---------|------|-------------|
| English (US) | `en-US` | Default |
| French | `fr-FR` | French (France) |
| German | `de-DE` | German (Germany) |
| Spanish | `es-ES` | Spanish (Spain) |
| Chinese | `zh-CN` | Chinese (Simplified) |
| Japanese | `ja-JP` | Japanese |
| Arabic | `ar-AE` | Arabic (UAE) |

## Date and Time Formatting

The Scheduler exposes two top-level properties — `dateFormat` and `timeFormat` — that control how dates and times are rendered across the header, date cells, event editor, and popup. If both are left unset, the Scheduler falls back to the format associated with the current `locale` (for example, `en-US` uses `MM/dd/yyyy` for dates and 12-hour time).

### Setting Date Format

The `dateFormat` property accepts any standard Syncfusion date pattern. The example below uses a `yyyy/MM/dd` pattern which is common in East-Asian locales:

```vue
<template>
  <div id="app">
    <ejs-schedule
      :dateFormat="dateFormat"
      height="550px"
      :selectedDate="selectedDate">
      <e-views>
        <e-view option="Day"></e-view>
        <e-view option="Week"></e-view>
        <e-view option="WorkWeek"></e-view>
        <e-view option="Month"></e-view>
      </e-views>
    </ejs-schedule>
  </div>
</template>

<script>
import { ScheduleComponent, ViewDirective, ViewsDirective,
         Day, Week, WorkWeek, Month } from '@syncfusion/ej2-vue-schedule';

export default {
  name: 'App',
  components: {
    'ejs-schedule': ScheduleComponent,
    'e-views': ViewsDirective,
    'e-view': ViewDirective
  },
  data() {
    return {
      dateFormat: 'yyyy/MM/dd',
      selectedDate: new Date(2024, 0, 15),
    };
  },
  provide: {
    schedule: [Day, Week, WorkWeek, Month]
  }
};
</script>
```

> The default `dateFormat` is `MM/dd/yyyy` because the default `locale` is `en-US`. If you set a different locale, set `dateFormat` explicitly so the format always matches the user's expectations.

### Setting Time Format

The `timeFormat` property controls the slot labels in Day/Week/WorkWeek/Timeline views and the time fields inside the editor. The example below switches the Scheduler to a 24-hour clock:

```vue
<template>
  <div id="app">
    <ejs-schedule
      :timeFormat="timeFormat"
      height="550px"
      :selectedDate="selectedDate">
      <e-views>
        <e-view option="Day"></e-view>
        <e-view option="Week"></e-view>
        <e-view option="WorkWeek"></e-view>
        <e-view option="Month"></e-view>
      </e-views>
    </ejs-schedule>
  </div>
</template>

<script>
import { ScheduleComponent, ViewDirective, ViewsDirective,
         Day, Week, WorkWeek, Month } from '@syncfusion/ej2-vue-schedule';

export default {
  name: 'App',
  components: {
    'ejs-schedule': ScheduleComponent,
    'e-views': ViewsDirective,
    'e-view': ViewDirective
  },
  data() {
    return {
      timeFormat: 'HH:mm',
      selectedDate: new Date(2024, 0, 15),
    };
  },
  provide: {
    schedule: [Day, Week, WorkWeek, Month]
  }
};
</script>
```

> The default time mode is 12-hour because the default `locale` is `en-US`. Use `HH:mm` to force 24-hour format regardless of locale.

### Date Format Patterns

Common `dateFormat` patterns and their rendered output for `15 January 2024`:

| Pattern | Output | Notes |
|---------|--------|-------|
| `dd/MM/yyyy` | `15/01/2024` | European style |
| `MM/dd/yyyy` | `01/15/2024` | US default |
| `yyyy/MM/dd` | `2024/01/15` | East-Asian / ISO-style |
| `yyyy-MM-dd` | `2024-01-15` | ISO 8601 short |
| `dd-MMM-yy` | `15-Jan-24` | Compact with abbreviated month |
| `dd MMMM yyyy` | `15 January 2024` | Long month name |
| `d MMM, yyyy` | `15 Jan, 2024` | Single-digit day, abbreviated month |
| `EEEE, MMM dd, yyyy` | `Monday, Jan 15, 2024` | Full weekday name |

### Time Format Patterns

Common `timeFormat` patterns and their rendered output for `14:30:45`:

| Pattern | Output | Notes |
|---------|--------|-------|
| `HH:mm` | `14:30` | 24-hour, no seconds |
| `hh:mm a` | `02:30 PM` | 12-hour with AM/PM |
| `h:mm a` | `2:30 PM` | 12-hour, no leading zero |
| `HH:mm:ss` | `14:30:45` | 24-hour with seconds |
| `hh:mm:ss a` | `02:30:45 PM` | 12-hour with seconds and AM/PM |
| `H:mm` | `14:30` | 24-hour, no leading zero |

## Accessibility (ARIA)

Scheduler is WCAG 2.0 compliant with ARIA attributes.

### Keyboard Navigation

| Key | Action |
|-----|--------|
| **Arrow Keys** | Navigate between cells/events |
| **Enter** | Open quick popup or editor |
| **Escape** | Close popup or editor |
| **Tab** | Navigate through focusable elements |
| **Delete** | Delete selected event |
| **Home** | Go to first cell |
| **End** | Go to last cell |
| **Page Up** | Navigate to previous view |
| **Page Down** | Navigate to next view |
| **Ctrl+Home** | Navigate to first event |
| **Ctrl+End** | Navigate to last event |

### Screen Reader Support

ARIA attributes provide context:

```html
<!-- Cell -->
<td role="gridcell" aria-selected="false" aria-label="Sunday, January 15, 2024">

<!-- Appointment -->
<div role="button" aria-label="Meeting, January 15, 2024, 10:00 AM to 11:00 AM">

<!-- Editor -->
<div role="dialog" aria-labelledby="event-editor-title" aria-modal="true">
```

### Enable Keyboard Interaction

```vue
<template>
  <ejs-schedule 
    :allowKeyboardInteraction="true">
  </ejs-schedule>
</template>
```

### High Contrast Theme

Support for high contrast mode:

```vue
<template>
  <ejs-schedule cssClass="e-high-contrast">
  </ejs-schedule>
</template>
```

## RTL Support

Enable right-to-left layout:

```vue
<template>
  <ejs-schedule :enableRtl="true">
  </ejs-schedule>
</template>
```

Useful for Arabic, Hebrew, and other RTL languages.

## Best Practices

1. **Load correct CLDR data** - Ensure all required culture files are loaded
2. **Provide translations** - Translate all static text for target locale
3. **Test keyboard navigation** - Verify all features accessible via keyboard
4. **Support screen readers** - Test with NVDA, JAWS, or VoiceOver
5. **Enable RTL when needed** - For right-to-left languages
6. **Use semantic HTML** - Maintain proper ARIA roles and labels
7. **Test high contrast** - Ensure visibility in high contrast mode
8. **Document shortcuts** - Provide keyboard shortcut reference to users
