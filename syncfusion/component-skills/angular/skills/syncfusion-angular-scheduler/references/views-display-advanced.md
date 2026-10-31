# Calendar Modes and Event Display Guidance

## Table of Contents
- [Calendar Mode (Gregorian and Islamic)](#calendar-mode-gregorian-and-islamic)
- [Gregorian Calendar (Default)](#gregorian-calendar-default)
- [Islamic Calendar](#islamic-calendar)
- [Limit Concurrent Events (maxEventStack)](#limit-concurrent-events-maxeventstack)
- [Configuring maxEventStack per View](#configuring-maxeventstack-per-view)
- [Updating maxEventStack Dynamically](#updating-maxeventstack-dynamically)
- [Best Practices](#best-practices)
- [Common Issues](#common-issues)

## Calendar Mode (Gregorian and Islamic)

The Scheduler supports both Gregorian and Islamic (Hijri) calendar modes.

### Gregorian Calendar (Default)

Standard solar calendar used globally.

```typescript
<ejs-schedule calendarMode='Gregorian'></ejs-schedule>
```

### Islamic Calendar

Lunar calendar with 354-355 days per year.

```typescript
import { Component } from '@angular/core';
import { loadCldr, L10n } from '@syncfusion/ej2-base';
import { Calendar, Islamic } from '@syncfusion/ej2-calendars';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService, AgendaService, MonthAgendaService, 
         TimelineViewsService, TimelineMonthService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';

// Import CLDR data
import arNumberData from '@syncfusion/ej2-cldr-data/main/ar/numbers.json';
import artimeZoneData from '@syncfusion/ej2-cldr-data/main/ar/timeZoneNames.json';
import arGregorian from '@syncfusion/ej2-cldr-data/main/ar/ca-gregorian.json';
import arIslamic from '@syncfusion/ej2-cldr-data/main/ar/ca-islamic.json';
import arNumberingSystem from '@syncfusion/ej2-cldr-data/supplemental/numberingSystems.json';

Calendar.Inject(Islamic);
loadCldr(arNumberData, artimeZoneData, arGregorian, arIslamic, arNumberingSystem);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [
    DayService, 
    WeekService, 
    MonthService, 
    AgendaService, 
    MonthAgendaService,
    TimelineViewsService, 
    TimelineMonthService
  ],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      calendarMode='Islamic'
      locale='ar'
      [enableRtl]="enableRtl"
      showQuickInfo="false"
      [selectedDate]="selectedDate"
      [eventSettings]="eventSettings">
      <e-views>
        <e-view option='Day'></e-view>
        <e-view option='Week'></e-view>
        <e-view option='Month'></e-view>
        <e-view option='Agenda'></e-view>
      </e-views>
    </ejs-schedule>
  `
})
export class AppComponent {
  public enableRtl: boolean = true;
  public selectedDate: Date = new Date(2024, 0, 15);
  public eventSettings: EventSettingsModel = { dataSource: [] };
}
```

**Requirements for Islamic Calendar**:
1. Import and inject `Islamic` module from `@syncfusion/ej2-calendars`
2. Load required CLDR data files using `loadCldr()`
3. Set `calendarMode='Islamic'`
4. Set `locale='ar'` for Arabic localization
5. Typically enable RTL with `enableRtl="true"`

**CLDR Files Needed**:
- `numbers.json`
- `timeZoneNames.json`
- `ca-gregorian.json`
- `ca-islamic.json`
- `numberingSystems.json`

## Limit Concurrent Events (maxEventStack)

Control the maximum number of overlapping (concurrent) events displayed per cell using the `maxEventStack` property on each view. When set to a value greater than `0`, only that many overlapping events are rendered and a `+ N more` indicator shows the hidden count. Setting it to `0` (default) displays all overlapping events.

**Important**: The `maxEventStack` property is only applicable to **Day**, **Week**, and **WorkWeek** views, and only takes effect when the `timeScale.enable` option is set to `true`. It has no effect on other views (Month, Year, Agenda, MonthAgenda, or any Timeline views).

### Configuring maxEventStack per View

Bind `maxEventStack` on each `<e-view>` to apply the limit individually. This is useful for time-based views (Day, Week, WorkWeek, and their Timeline counterparts) where overlapping appointments are most common.

```typescript
import { Component, ViewChild } from '@angular/core';
import { ScheduleComponent, ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, WorkWeekService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='650px'
      [selectedDate]="selectedDate"
      [eventSettings]="eventSettings"
      [currentView]="currentView">
      <e-views>
        <e-view option="Day" [maxEventStack]="maxStack"></e-view>
        <e-view option="Week" [maxEventStack]="maxStack"></e-view>
        <e-view option="WorkWeek" [maxEventStack]="maxStack"></e-view>
      </e-views>
    </ejs-schedule>
  `
})
export class AppComponent {
  @ViewChild('scheduleObj') public scheduleObj?: ScheduleComponent;

  public selectedDate: Date = new Date(2024, 0, 15);
  public currentView: string = 'Week';
  public maxStack: number = 1; // Show only 1 overlapping event per cell
  public eventSettings: EventSettingsModel = { dataSource: [] };
}
```

### Updating maxEventStack Dynamically

When the limit needs to change at runtime (for example, through a user setting), update the value on `activeViewOptions` and call `refreshEvents()` to re-render. To keep the limit consistent across all views, iterate over `scheduleObj.views`, apply the new value to each, then call `setProperties`, `dataBind`, and `refreshEvents`.

```typescript
import { Component, ViewChild } from '@angular/core';
import { ScheduleComponent, ScheduleModule, EventSettingsModel, NavigatingEventArgs } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, WorkWeekService],
  template: `
    <ejs-schedule 
      #scheduleObj
      width='100%' 
      height='650px'
      [selectedDate]="selectedDate"
      [eventSettings]="eventSettings"
      [currentView]="currentView"
      (navigating)="onNavigating($event)">
      <e-views>
        <e-view option="Day" [maxEventStack]="getMaxStack()"></e-view>
        <e-view option="Week" [maxEventStack]="getMaxStack()"></e-view>
        <e-view option="WorkWeek" [maxEventStack]="getMaxStack()"></e-view>
      </e-views>
    </ejs-schedule>
  `
})
export class AppComponent {
  @ViewChild('scheduleObj') public scheduleObj?: ScheduleComponent;

  public selectedDate: Date = new Date(2024, 0, 15);
  public currentView: string = 'Week';
  public displayMode: string = 'limited';
  public maxEventsLimit: number = 1;
  public eventSettings: EventSettingsModel = { dataSource: [] };

  // Return 0 to show all overlapping events, otherwise the configured limit
  public getMaxStack(): number {
    return this.displayMode === 'all' ? 0 : this.maxEventsLimit;
  }

  // Apply the new maxEventStack value to the active view and refresh
  public onDisplayModeChange(mode: string): void {
    this.displayMode = mode;
    if (this.scheduleObj) {
      this.scheduleObj.activeViewOptions.maxEventStack = mode === 'all' ? 0 : this.maxEventsLimit;
      this.scheduleObj.refreshEvents();
    }
  }

  public onLimitChange(value: number): void {
    this.maxEventsLimit = value;
    if (this.scheduleObj) {
      this.scheduleObj.activeViewOptions.maxEventStack = value;
      this.scheduleObj.refreshEvents();
    }
  }

  // When switching views, propagate the current maxEventStack to all view options
  public onNavigating(args: NavigatingEventArgs): void {
    if (args.action === 'view' && this.scheduleObj) {
      const value = this.displayMode === 'all' ? 0 : this.maxEventsLimit;
      const currentViews: any[] = this.scheduleObj.views as any[];
      const updatedViews = currentViews.map((view: any) => ({ ...view, maxEventStack: value }));
      this.scheduleObj.setProperties({ views: updatedViews }, true);
      this.scheduleObj.dataBind();
      this.scheduleObj.refreshEvents();
    }
  }
}
```

**Behavior**:
- `maxEventStack = 0` (default): All overlapping events are displayed with no limit
- `maxEventStack = N`: Only the first `N` overlapping events are shown per cell, followed by a `+ X more` indicator
- The limit applies per cell/time slot, not globally across the view
- Only effective on **Day**, **Week**, and **WorkWeek** views when `timeScale.enable` is set to `true`

**Note**: Use the `(navigating)` event with `args.action === 'view'` to reapply the `maxEventStack` value to all view options when the user switches between views, since changing the active view resets `activeViewOptions`.

## Best Practices

1. **Inject Required Services**: Always inject view services for the views you want to use
2. **Set Height**: Always specify scheduler height, especially for Agenda and MonthAgenda views
3. **View Configuration**: Use `<e-views>` for granular control over each view
4. **Performance**: Use `allowVirtualScrolling` for large datasets in Agenda and Timeline views
5. **Customize Per View**: Set different `startHour`, `endHour`, `workDays` for each view as needed
6. **CLDR Data**: Load CLDR data when using Islamic calendar or internationalization
7. **Limit Overlapping Events**: Use `maxEventStack` to control the number of concurrent events rendered per cell in time-based views

## Common Issues

### View not displaying
- **Solution**: Ensure the corresponding view service is injected in `providers`

### Timeline views not working
- **Solution**: Inject `TimelineViewsService` for Timeline Day/Week/WorkWeek; `TimelineMonthService` for Timeline Month; `TimelineYearService` for Timeline Year

### Islamic calendar not showing
- **Solution**: Import `Calendar` and `Islamic` modules, call `Calendar.Inject(Islamic)`, load required CLDR data files

### Events not visible in Month view
- **Solution**: Check if events fall within the displayed month; look for `+ more` indicator

### Agenda view empty
- **Solution**: Set `agendaDaysCount` appropriately; check `hideEmptyAgendaDays` setting

### maxEventStack not applying after view switch
- **Solution**: Handle the `(navigating)` event with `args.action === 'view'` to reapply the `maxEventStack` value across all view options, since changing the active view resets `activeViewOptions`.
