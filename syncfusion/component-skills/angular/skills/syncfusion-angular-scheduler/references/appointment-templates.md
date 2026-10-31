# Event Templates and Guidance

## Table of Contents
- [Event Template](#event-template)
- [Tooltip Template](#tooltip-template)
- [Best Practices](#best-practices)
- [Common Issues](#common-issues)

## Event Template

Customize the visual appearance of events using an `ng-template` inside the `ejs-schedule`. The template context (`let-data`) provides access to all event fields and any custom fields from the data source, allowing you to bind data-driven styles, content, and layout.

**Important**: The template reference variable **must be named `#eventSettingsTemplate`**. The Scheduler component looks up the event template by this exact name, so it cannot be changed to any other name.

### Custom Event Template

Define an `ng-template` with the required reference variable `#eventSettingsTemplate` inside `ejs-schedule`. Use `let-data` to capture the event context and bind its properties to your custom markup with Angular bindings.

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]="selectedDate"
      [eventSettings]="eventSettings">
      <ng-template #eventSettingsTemplate let-data>
        <div class='template-wrap'>
          <div class="subject">{{data.Subject}}</div>
          <div class="time">{{data.StartTime | date:'shortTime'}} - {{data.EndTime | date:'shortTime'}}</div>
        </div>
      </ng-template>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public data: object[] = [
    {
      Id: 1,
      Subject: 'Team Meeting',
      StartTime: new Date(2024, 0, 15, 10, 0),
      EndTime: new Date(2024, 0, 15, 12, 30)
    }
  ];
  
  public eventSettings: EventSettingsModel = {
    dataSource: this.data
  };
}
```

### Template with Custom Fields

Add custom fields to the data source to render data-driven styling inside the template. Bind the custom field values directly in the template using property bindings.

```typescript
public data: object[] = [
  {
    Id: 1,
    Subject: 'Webinar on Data Science',
    StartTime: new Date(2024, 0, 15, 9, 30),
    EndTime: new Date(2024, 0, 15, 11, 0),
    PrimaryColor: '#1aaa55',
    SecondaryColor: '#8fdba0'
  },
  {
    Id: 2,
    Subject: 'JavaScript Workshop',
    StartTime: new Date(2024, 0, 15, 14, 0),
    EndTime: new Date(2024, 0, 15, 16, 0),
    PrimaryColor: '#357cd2',
    SecondaryColor: '#9dc5e8'
  }
];
```

```html
<ejs-schedule 
  width='100%' 
  height='550px'
  [selectedDate]="selectedDate"
  [eventSettings]="eventSettings">
  <ng-template #eventSettingsTemplate let-data>
    <div class='template-wrap' [style.background]="data.SecondaryColor">
      <div class="subject" [style.background]="data.PrimaryColor">{{data.Subject}}</div>
    </div>
  </ng-template>
</ejs-schedule>
```

**Note**: Custom fields added to the data source are accessible in the template through the `data` context without any extra mapping.

## Tooltip Template

Customize the tooltip that appears on event hover by defining an `ng-template` inside `ejs-schedule`. The template context (`let-data`) provides access to all event fields, allowing you to display rich content such as images, custom fields, and formatted times. Enable tooltips by setting `enableTooltip: true` in `eventSettings`.

**Important**: The template reference variable **must be named `#eventSettingsTooltipTemplate`**. The Scheduler component looks up the tooltip template by this exact name, so it cannot be changed to any other name.

### Custom Tooltip Template

Define a tooltip template inside `ejs-schedule` using `ng-template` with the required reference variable `#eventSettingsTooltipTemplate`. Use `let-data` to capture the event context and bind properties to your custom tooltip layout.

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule, CommonModule],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]="selectedDate"
      [eventSettings]="eventSettings">
      <ng-template #eventSettingsTooltipTemplate let-data>
        <div class="tooltip-wrap">
          <div class="subject">{{data.Subject}}</div>
          <div class="time">From&nbsp;:&nbsp;{{data.StartTime | date:'short'}}</div>
          <div class="time">To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;{{data.EndTime | date:'short'}}</div>
        </div>
      </ng-template>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public data: object[] = [
    {
      Id: 1,
      Subject: 'Team Meeting',
      StartTime: new Date(2024, 0, 15, 10, 0),
      EndTime: new Date(2024, 0, 15, 12, 30)
    }
  ];
  
  public eventSettings: EventSettingsModel = {
    dataSource: this.data,
    enableTooltip: true
  };
}
```

### Tooltip with Custom Fields

Add custom fields to the data source to display additional information (such as an image, location, or city) in the tooltip. Use Angular directives like `*ngIf` from `CommonModule` to conditionally render content based on field availability.

```typescript
public data: object[] = [
  {
    Id: 1,
    Subject: 'Paris Trip',
    StartTime: new Date(2024, 0, 15, 10, 0),
    EndTime: new Date(2024, 0, 17, 12, 30),
    City: 'Paris',
    Image: 'paris.png'
  }
];

public eventSettings: EventSettingsModel = {
  dataSource: this.data,
  enableTooltip: true
};
```

```html
<ejs-schedule 
  width='100%' 
  height='550px'
  cssClass='e-schedule-event-tooltip'
  [selectedDate]="selectedDate"
  [eventSettings]="eventSettings">
  <ng-template #eventSettingsTooltipTemplate let-data>
    <div class="tooltip-wrap">
      <div class="image"></div>
      <div class="content-area">
        <div class="name"></div>
        <div *ngIf="data.City">
          <div class="city"></div>
        </div>
        <div class="time">From&nbsp;:&nbsp;</div>
        <div class="time">To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</div>
      </div>
    </div>
  </ng-template>
</ejs-schedule>
```

**Note**: The tooltip template only renders when `enableTooltip: true` is set in `eventSettings`. Import `CommonModule` in standalone components to use Angular directives like `*ngIf` and `*ngFor` inside the tooltip template.

## Best Practices

1. **Always Provide Required Fields**: `Id`, `StartTime`, and `EndTime` are mandatory
2. **Use ISO Format for Exceptions**: Format exception dates as `YYYYMMDDTHHmmssZ`
3. **Test Recurrence Rules**: Validate rules using iCalendar standards
4. **Handle Timezones**: Use `StartTimezone` and `EndTimezone` for multi-timezone scenarios
5. **Map Custom Fields**: Use `fields` property when data structure differs from defaults
6. **Validate Edit Operations**: Be aware of validation messages when editing recurring events
7. **Use COUNT or UNTIL**: Always specify an end condition for recurring events
8. **Block Time Slots**: Use `IsBlock: true` to prevent event creation on specific slots

## Common Issues

### Events not displaying
- **Solution**: Verify `Id`, `StartTime`, and `EndTime` are provided and valid

### Recurrence not working
- **Solution**: Check `RecurrenceRule` syntax; must follow iCalendar RFC 5545 format

### Custom fields not mapping
- **Solution**: Ensure `fields` property in `eventSettings` maps all custom field names

### Exception dates not excluding occurrences
- **Solution**: Use correct ISO format without hyphens (e.g., `20240129T100000Z`)

### Edited occurrences not displaying
- **Solution**: Verify `RecurrenceID` matches parent event's `Id` and exception date is added to parent

### Custom event templates not rendering
- **Solution**: Ensure the `ng-template` is placed inside the `ejs-schedule` element, the template reference variable is **exactly** `#eventSettingsTemplate` (this name is required by the Scheduler and cannot be changed), and custom field names referenced in the template (like `PrimaryColor`) exist on each event in the data source.

### Tooltip template not displaying
- **Solution**: Verify `enableTooltip: true` is set in `eventSettings` and the `ng-template` uses the **exact** `#eventSettingsTooltipTemplate` reference (this name is required by the Scheduler and cannot be changed). Ensure `CommonModule` is imported for `*ngIf` and other Angular directives.
