# Quick Info and Overflow Popup Customization

## Table of Contents
- [Quick Info Popups](#quick-info-popups)
- [Disable Quick Info](#disable-quick-info)
- [Customize Quick Info Templates](#customize-quick-info-templates)
- [More Events Indicator](#more-events-indicator)
- [Disable More Indicator Popup](#disable-more-indicator-popup)
- [Customize More Indicator Popup](#customize-more-indicator-popup)
- [Navigate to Day View on More Click](#navigate-to-day-view-on-more-click)
- [Best Practices](#best-practices)
- [Common Scenarios](#common-scenarios)
- [Read-Only Scheduler](#read-only-scheduler)
- [Minimal Editor (Subject Only)](#minimal-editor-subject-only)
- [Custom Event Categories](#custom-event-categories)
- [Approval Workflow](#approval-workflow)
- [Required Attendees](#required-attendees)
- [Priority/Urgency Fields](#priorityurgency-fields)

## Quick Info Popups

### Disable Quick Info

Hide all quick popups:

```typescript
<ejs-schedule 
  width='100%' 
  height='550px'
  [showQuickInfo]='false'
  [eventSettings]='eventSettings'>
</ejs-schedule>
```

### Customize Quick Info Templates

Use `quickInfoTemplates` to customize quick popup content:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ScheduleComponent, ScheduleModule, EventSettingsModel, CurrentAction } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      #schedule
      width='100%' 
      height='550px'
      [eventSettings]='eventSettings'>
      <ng-template #quickInfoTemplatesHeader let-data>
        <div class="quick-info-header">
          <span class="e-subject">{{data.Subject}}</span>
        </div>
      </ng-template>
      <ng-template #quickInfoTemplatesContent let-data>
        <div class="quick-info-content">
          <div><strong>Time:</strong> {{formatTime(data.StartTime)}} - {{formatTime(data.EndTime)}}</div>
          <div *ngIf="data.Location"><strong>Location:</strong> {{data.Location}}</div>
          <div *ngIf="data.Description"><strong>Description:</strong> {{data.Description}}</div>
        </div>
      </ng-template>
      <ng-template #quickInfoTemplatesFooter let-data>
        <div class="quick-info-footer">
          <button class="e-btn e-flat" (click)="onEditClick()">Edit</button>
          <button class="e-btn e-flat" (click)="onDeleteClick()">Delete</button>
          <button class="e-btn e-flat" (click)="onCloseClick()">Close</button>
        </div>
      </ng-template>
    </ejs-schedule>
  `
})
export class AppComponent {
  @ViewChild('schedule') public scheduleObj!: ScheduleComponent;
  
  private selectionTarget: Element | null = null;
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
  
  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
  
  onEditClick(): void {
    this.onCloseClick();
    if (this.selectionTarget) {
      const eventData = this.scheduleObj.getEventDetails(this.selectionTarget);
      this.scheduleObj.openEditor(eventData, 'Save');
    }
  }
  
  onDeleteClick(): void {
    this.onCloseClick();
    if (this.selectionTarget) {
      const eventData = this.scheduleObj.getEventDetails(this.selectionTarget);
      this.scheduleObj.deleteEvent(eventData, 'Delete');
    }
  }
  
  onCloseClick(): void {
    this.scheduleObj.quickPopup.quickPopupHide();
  }
}
```

**Template Properties**:
- `quickInfoTemplatesHeader`: Custom header content
- `quickInfoTemplatesContent`: Custom body content
- `quickInfoTemplatesFooter`: Custom footer buttons

## More Events Indicator

### Disable More Indicator Popup

Prevent the "+N more" popup from opening:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel, PopupOpenEventArgs } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      currentView='Month'
      [eventSettings]='eventSettings'
      (popupOpen)='onPopupOpen($event)'>
    </ejs-schedule>
  `
})
export class AppComponent {
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data with many events
  };
  
  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'EventContainer') {
      args.cancel = true;
    }
  }
}
```

### Customize More Indicator Popup

Modify the popup header to show event count:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel, PopupOpenEventArgs } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { Internationalization } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      currentView='Month'
      [eventSettings]='eventSettings'
      (popupOpen)='onPopupOpen($event)'>
    </ejs-schedule>
  `
})
export class AppComponent {
  private instance: Internationalization = new Internationalization();
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
  
  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'EventContainer') {
      const dateStr = this.instance.formatDate((args.data as any).date, { skeleton: 'MMMEd' });
      const eventCount = (args.data as any).event.length;
      
      (args.element.querySelector('.e-header-date') as HTMLElement).innerText = dateStr;
      (args.element.querySelector('.e-header-day') as HTMLElement).innerText = `Event count: ${eventCount}`;
    }
  }
}
```

### Navigate to Day View on More Click

Replace popup with navigation:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel, MoreEventsClickArgs } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      #schedule
      width='100%' 
      height='550px'
      currentView='Month'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'
      (moreEventsClick)='onMoreEventsClick($event)'>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
  
  onMoreEventsClick(args: MoreEventsClickArgs): void {
    args.cancel = true; // Prevent popup
    args.isPopupOpen = false;
    
    // Navigate to Day view for the clicked date
    (args.event.currentTarget as HTMLElement).classList.add('e-navigate');
  }
}
```

## Best Practices

1. **e-field Class**: Always add for automatic data processing in templates
2. **Validation**: Apply validation rules to prevent invalid data
3. **PopupOpen Event**: Use for dynamic customization based on context
4. **PopupClose Event**: Handle manual data extraction when not using e-field
5. **Localization**: Use L10n for multi-language support
6. **Timezone**: Provide limited, relevant timezone options
7. **Quick Info**: Disable if using custom editors for consistency
8. **More Indicator**: Customize or disable based on UX requirements
9. **Mobile**: Test quick info behavior on touch devices
10. **Performance**: Avoid heavy processing in popupOpen event

## Common Scenarios

### Read-Only Scheduler
```typescript
[readonly]='true'
```

### Minimal Editor (Subject Only)
```typescript
fields: {
  subject: { name: 'Subject', validation: { required: true } }
}
```

### Custom Event Categories
Add dropdown with predefined categories using additional fields.

### Approval Workflow
Use custom footer template with "Approve" and "Reject" buttons.

### Required Attendees
Add MultiSelect for attendees with validation.

### Priority/Urgency Fields
Add DropDownList or Rating component for priority levels.
