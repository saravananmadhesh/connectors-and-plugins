# Localization and Internationalization

## Table of Contents
- [Change Locale](#change-locale)
- [Right-to-Left (RTL)](#right-to-left-rtl)
- [Date and Time Formatting](#date-and-time-formatting)
- [First Day of Week](#first-day-of-week)
- [Best Practices](#best-practices)

Configure the Scheduler to display dates, times, and UI text in different languages and regional formats.

## Change Locale

Set the `locale` property to change the Scheduler's display language:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { L10n, loadCldr } from '@syncfusion/ej2-base';

// Import CLDR data
import * as numberingSystems from 'cldr-data/supplemental/numberingSystems.json';
import * as gregorian from 'cldr-data/main/de/ca-gregorian.json';
import * as numbers from 'cldr-data/main/de/numbers.json';
import * as timeZoneNames from 'cldr-data/main/de/timeZoneNames.json';

// Load CLDR data
loadCldr(numberingSystems, gregorian, numbers, timeZoneNames);

// Load localized text
L10n.load({
  'de': {
    'schedule': {
      'day': 'Tag',
      'week': 'Woche',
      'workWeek': 'Arbeitswoche',
      'month': 'Monat',
      'agenda': 'Agenda',
      'today': 'Heute',
      'noEvents': 'Keine Ereignisse',
      'allDay': 'Ganztägig',
      'start': 'Anfang',
      'end': 'Ende',
      'more': 'mehr',
      'close': 'Schließen',
      'cancel': 'Abbrechen',
      'noTitle': '(Kein Titel)',
      'delete': 'Löschen',
      'deleteEvent': 'Ereignis löschen',
      'deleteMultipleEvent': 'Mehrere Ereignisse löschen',
      'selectedItems': 'Ausgewählte Elemente',
      'deleteSeries': 'Serie löschen',
      'edit': 'Bearbeiten',
      'editSeries': 'Serie bearbeiten',
      'editEvent': 'Ereignis bearbeiten',
      'createEvent': 'Erstellen',
      'subject': 'Betreff',
      'addTitle': 'Titel hinzufügen',
      'moreDetails': 'Weitere Details',
      'save': 'Speichern',
      'editContent': 'Möchten Sie nur dieses Ereignis oder die gesamte Serie bearbeiten?',
      'deleteContent': 'Möchten Sie dieses Ereignis löschen?',
      'deleteMultipleContent': 'Möchten Sie die ausgewählten Ereignisse löschen?',
      'newEvent': 'Neues Ereignis',
      'title': 'Titel',
      'location': 'Ort',
      'description': 'Beschreibung',
      'timezone': 'Zeitzone',
      'startTimezone': 'Startzeitzone',
      'endTimezone': 'Endzeitzone',
      'repeat': 'Wiederholen',
      'saveButton': 'Speichern',
      'cancelButton': 'Abbrechen',
      'deleteButton': 'Löschen',
      'recurrence': 'Wiederholung',
      'wrongPattern': 'Wiederholungsmuster ist ungültig',
      'seriesChangeAlert': 'Möchten Sie die Änderungen nur für dieses Ereignis oder für die gesamte Serie übernehmen?',
      'createError': 'Die Dauer des Ereignisses muss kürzer sein als die Häufigkeit seines Auftretens',
      'recurrenceDateValidation': 'Einige Monate haben nicht genug Tage für das angegebene Datum',
      'sameDayAlert': 'Zwei Vorkommen desselben Ereignisses können nicht am selben Tag auftreten',
      'editRecurrence': 'Serie bearbeiten',
      'repeats': 'Wiederholt',
      'alert': 'Warnung',
      'startEndError': 'Das ausgewählte Enddatum liegt vor dem Startdatum',
      'invalidDateError': 'Der eingegebene Datumswert ist ungültig',
      'ok': 'Ok',
      'occurrence': 'Vorkommen',
      'series': 'Serie',
      'previous': 'Vorherige',
      'next': 'Nächste',
      'timelineDay': 'Zeitleisten Tag',
      'timelineWeek': 'Zeitleisten Woche',
      'timelineWorkWeek': 'Zeitleisten Arbeitswoche',
      'timelineMonth': 'Zeitleisten Monat'
    }
  }
});

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      locale='de'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public eventSettings: EventSettingsModel = { dataSource: [] };
}
```

## Right-to-Left (RTL)

Enable RTL layout for right-to-left languages (Arabic, Hebrew):

```typescript
<ejs-schedule 
  width='100%' 
  height='550px'
  locale='ar'
  [enableRtl]='true'
  [selectedDate]='selectedDate'
  [eventSettings]='eventSettings'>
</ejs-schedule>
```

## Date and Time Formatting

Customize date/time display using `dateFormat` and `timeFormat`:

```typescript
<ejs-schedule 
  width='100%' 
  height='550px'
  dateFormat='dd/MM/yyyy'
  timeFormat='HH:mm'
  [selectedDate]='selectedDate'
  [eventSettings]='eventSettings'>
</ejs-schedule>
```

**Date Format Patterns**:
- `dd/MM/yyyy` - 15/01/2024 (European)
- `MM/dd/yyyy` - 01/15/2024 (US)
- `yyyy-MM-dd` - 2024-01-15 (ISO)
- `MMMM dd, yyyy` - January 15, 2024

**Time Format Patterns**:
- `HH:mm` - 24-hour format (14:30)
- `hh:mm a` - 12-hour format (02:30 PM)
- `HH:mm:ss` - With seconds (14:30:45)

## First Day of Week

Set the week's starting day:

```typescript
<ejs-schedule 
  width='100%' 
  height='550px'
  [firstDayOfWeek]='1'
  [selectedDate]='selectedDate'
  [eventSettings]='eventSettings'>
</ejs-schedule>
```

**Values**:
- `0` - Sunday (US, Canada)
- `1` - Monday (Europe, Asia)
- `6` - Saturday (Middle East)

## Best Practices

1. **CLDR Data**: Always load required CLDR data for locale
2. **Complete Translation**: Translate all L10n keys for consistency
3. **Date Formats**: Match user's regional expectations
4. **Time Zone**: Display events in user's local time zone
5. **Testing**: Verify layouts with longest translated strings
6. **RTL Testing**: Test entire UI in RTL mode
7. **Number Formats**: Use locale-aware number formatting
8. **Currency**: Format prices according to locale
9. **Pluralization**: Handle plural forms correctly per language
10. **Cultural Sensitivity**: Respect local holidays and conventions
