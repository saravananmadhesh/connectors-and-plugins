# Advanced Resource Management

## Table of Contents
- [Dynamic Resource Management](#dynamic-resource-management)
- [Adding Resources Dynamically](#adding-resources-dynamically)
- [Different Working Hours and Days](#different-working-hours-and-days)
- [Custom Working Days Per Resource](#custom-working-days-per-resource)
- [Custom Working Hours Per Resource](#custom-working-hours-per-resource)
- [Collapse/Expand Resources in Timeline Views](#collapseexpand-resources-in-timeline-views)
- [Choosing Resource Colors for Appointments](#choosing-resource-colors-for-appointments)
- [Mobile and Responsive Behavior](#mobile-and-responsive-behavior)
- [Compact View on Mobile](#compact-view-on-mobile)
- [Adaptive UI in Desktop](#adaptive-ui-in-desktop)
- [Best Practices](#best-practices)
- [Common Scenarios](#common-scenarios)

## Dynamic Resource Management

Add or remove resources at runtime using `addResource()` and `removeResource()` methods.

### Adding Resources Dynamically

```typescript
import { Component, ViewChild } from '@angular/core';
import { ScheduleComponent, ScheduleModule, EventSettingsModel, GroupModel } from '@syncfusion/ej2-angular-schedule';
import { CheckBoxModule, ChangeEventArgs } from '@syncfusion/ej2-angular-buttons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule, CheckBoxModule],
  template: `
    <div>
      <ejs-checkbox 
        label="Room 1" 
        [checked]="true" 
        (change)="onRoom1Change($event)">
      </ejs-checkbox>
      <ejs-checkbox 
        label="Room 2" 
        [checked]="false" 
        (change)="onRoom2Change($event)">
      </ejs-checkbox>
    </div>
    <ejs-schedule 
      #scheduleObj
      width='100%' 
      height='550px'
      [group]='group'>
      <e-resources>
        <e-resource 
          field='RoomId' 
          name='Rooms'
          [dataSource]='roomDataSource'
          textField='text' 
          idField='id' 
          colorField='color'>
        </e-resource>
      </e-resources>
    </ejs-schedule>
  `
})
export class AppComponent {
  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;
  
  public group: GroupModel = {
    resources: ['Rooms']
  };
  
  public roomDataSource: Object[] = [
    { text: 'Room 1', id: 1, color: '#cb6bb2' }
  ];
  
  private allRooms: Object[] = [
    { text: 'Room 1', id: 1, color: '#cb6bb2' },
    { text: 'Room 2', id: 2, color: '#56ca85' }
  ];
  
  onRoom2Change(args: ChangeEventArgs): void {
    if (args.checked) {
      this.scheduleObj.addResource(this.allRooms[1], 'Rooms', 1);
    } else {
      this.scheduleObj.removeResource(2, 'Rooms');
    }
  }
}
```

**Methods**:
- `addResource(resourceData, resourceName, index)`: Adds resource at specified position
- `removeResource(resourceId, resourceName)`: Removes resource by ID

## Different Working Hours and Days

### Custom Working Days Per Resource

Set different working days using `workDaysField`:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel, GroupModel } from '@syncfusion/ej2-angular-schedule';
import { WeekService, WorkWeekService, MonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [WeekService, WorkWeekService, MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      currentView='WorkWeek'
      [eventSettings]='eventSettings'
      [group]='group'>
      <e-resources>
        <e-resource 
          field='DoctorId' 
          name='Doctors'
          [dataSource]='doctorDataSource'
          textField='text' 
          idField='id' 
          colorField='color'
          workDaysField='workDays'>
        </e-resource>
      </e-resources>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
  
  public group: GroupModel = {
    resources: ['Doctors']
  };
  
  public doctorDataSource: Object[] = [
    { text: 'Dr. Smith', id: 1, color: '#ea7a57', workDays: [1, 2, 4, 5] },    // Mon, Tue, Thu, Fri
    { text: 'Dr. Alice', id: 2, color: '#7fa900', workDays: [1, 3, 5] },       // Mon, Wed, Fri
    { text: 'Dr. Robson', id: 3, color: '#56ca85', workDays: [2, 6] }          // Tue, Sat
  ];
}
```

**Note**: Day indexes: Sunday=0, Monday=1, ..., Saturday=6

### Custom Working Hours Per Resource

Set different work hours using `startHourField` and `endHourField`:

```typescript
public doctorDataSource: Object[] = [
  { 
    text: 'Dr. Smith', 
    id: 1, 
    color: '#ea7a57', 
    startHour: '08:00', 
    endHour: '15:00' // 8 AM - 3 PM
  },
  { 
    text: 'Dr. Alice', 
    id: 2, 
    color: '#7fa900', 
    startHour: '10:00', 
    endHour: '18:00' // 10 AM - 6 PM
  },
  { 
    text: 'Dr. Robson', 
    id: 3, 
    color: '#56ca85', 
    startHour: '06:00', 
    endHour: '13:00' // 6 AM - 1 PM
  }
];
```

```typescript
<e-resource 
  field='DoctorId' 
  name='Doctors'
  [dataSource]='doctorDataSource'
  startHourField='startHour'
  endHourField='endHour'>
</e-resource>
```

## Collapse/Expand Resources in Timeline Views

Control initial expand/collapse state using `expandedField`:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel, GroupModel } from '@syncfusion/ej2-angular-schedule';
import { TimelineViewsService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [TimelineViewsService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      currentView='TimelineWeek'
      [group]='group'>
      <e-resources>
        <e-resource 
          field='RoomId' 
          name='Rooms'
          [dataSource]='roomDataSource'
          textField='RoomText' 
          idField='Id' 
          colorField='RoomColor'
          expandedField='IsExpand'>
        </e-resource>
        <e-resource 
          field='OwnerId' 
          name='Owners'
          [dataSource]='ownerDataSource'
          [allowMultiple]='allowMultiple'
          textField='OwnerText' 
          idField='Id' 
          groupIDField='OwnerGroupId'
          colorField='OwnerColor'>
        </e-resource>
      </e-resources>
    </ejs-schedule>
  `
})
export class AppComponent {
  public group: GroupModel = {
    resources: ['Rooms', 'Owners']
  };
  
  public roomDataSource: Object[] = [
    { RoomText: 'ROOM 1', Id: 1, RoomColor: '#cb6bb2', IsExpand: false }, // Collapsed
    { RoomText: 'ROOM 2', Id: 2, RoomColor: '#56ca85', IsExpand: true }   // Expanded
  ];
  
  public allowMultiple: boolean = true;
  
  public ownerDataSource: Object[] = [
    { OwnerText: 'Nancy', Id: 1, OwnerGroupId: 1, OwnerColor: '#ffaa00' },
    { OwnerText: 'Steven', Id: 2, OwnerGroupId: 2, OwnerColor: '#f8a398' }
  ];
}
```

**Note**: Users can toggle expand/collapse by clicking the resource header.

## Choosing Resource Colors for Appointments

By default, top-level resource colors apply to appointments. Use `resourceColorField` to specify which level's colors to use:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ScheduleComponent, ScheduleModule, EventSettingsModel, GroupModel } from '@syncfusion/ej2-angular-schedule';
import { RadioButtonModule, ChangeArgs } from '@syncfusion/ej2-angular-buttons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule, RadioButtonModule],
  template: `
    <div>
      <ejs-radiobutton 
        label="Rooms" 
        name="colorField" 
        value="Rooms" 
        [checked]="true" 
        (change)="onChange($event)">
      </ejs-radiobutton>
      <ejs-radiobutton 
        label="Owners" 
        name="colorField" 
        value="Owners" 
        (change)="onChange($event)">
      </ejs-radiobutton>
    </div>
    <ejs-schedule 
      #scheduleObj
      width='100%' 
      height='550px'
      [eventSettings]='eventSettings'
      [group]='group'>
      <e-resources>
        <e-resource field='RoomId' name='Rooms' [dataSource]='roomDataSource'></e-resource>
        <e-resource field='OwnerId' name='Owners' [dataSource]='ownerDataSource'></e-resource>
      </e-resources>
    </ejs-schedule>
  `
})
export class AppComponent {
  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;
  
  public eventSettings: EventSettingsModel = {
    dataSource: [],
    resourceColorField: 'Rooms' // Use Room colors initially
  };
  
  public group: GroupModel = {
    resources: ['Rooms', 'Owners']
  };
  
  public roomDataSource: Object[] = [
    { text: 'Room 1', id: 1, color: '#cb6bb2' },
    { text: 'Room 2', id: 2, color: '#56ca85' }
  ];
  
  public ownerDataSource: Object[] = [
    { text: 'Nancy', id: 1, groupId: 1, color: '#ffaa00' },
    { text: 'Steven', id: 2, groupId: 2, color: '#f8a398' }
  ];
  
  onChange(args: ChangeArgs): void {
    this.scheduleObj.eventSettings.resourceColorField = args.value;
  }
}
```

## Mobile and Responsive Behavior

### Compact View on Mobile

By default, the Scheduler displays in compact mode on mobile devices when using multiple resources:

**Features**:
- Displays one resource at a time
- TreeView navigation to switch resources
- Automatic activation on mobile devices

**Disable Compact View**:
```typescript
public group: GroupModel = {
  enableCompactView: false, // Show desktop layout on mobile
  resources: ['Owners']
};
```

### Adaptive UI in Desktop

Enable mobile-like adaptive UI on desktop:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel, GroupModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='650px'
      [enableAdaptiveUI]='true'
      [group]='group'
      [eventSettings]='eventSettings'>
      <e-resources>
        <e-resource 
          field='ProjectId' 
          name='Projects'
          [dataSource]='projectDataSource'>
        </e-resource>
        <e-resource 
          field='TaskId' 
          name='Categories'
          [dataSource]='categoryDataSource'
          groupIDField='groupId'>
        </e-resource>
      </e-resources>
    </ejs-schedule>
  `
})
export class AppComponent {
  public group: GroupModel = {
    resources: ['Projects', 'Categories']
  };
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
  
  public projectDataSource: Object[] = [
    { text: 'Project 1', id: 1, color: '#cb6bb2' },
    { text: 'Project 2', id: 2, color: '#56ca85' }
  ];
  
  public categoryDataSource: Object[] = [
    { text: 'Development', id: 1, groupId: 1, color: '#df5286' },
    { text: 'Testing', id: 2, groupId: 1, color: '#7fa900' },
    { text: 'Design', id: 3, groupId: 2, color: '#ea7a57' }
  ];
}
```

**Adaptive Features**:
- Navigation drawer for view options
- Plus icon for quick event creation
- Today icon instead of button
- TreeView for resource navigation
- Touch-optimized interface

## Best Practices

1. **Resource Naming**: Use unique, descriptive `name` values for resources (referenced in `group.resources`)
2. **Color Coding**: Always provide `colorField` for visual distinction
3. **Hierarchical Design**: Use `groupIDField` for parent-child relationships
4. **Performance**: Use `DataManager` for large remote datasets with pagination
5. **Working Hours**: Define `startHourField`/`endHourField` for resources with different schedules
6. **Working Days**: Use `workDaysField` with day indexes (0-6) for custom schedules
7. **Shared Events**: Enable `allowGroupEdit` when appointments span multiple resources
8. **Mobile Experience**: Keep `enableCompactView: true` (default) for better mobile UX
9. **Expandable Groups**: Use `expandedField` to control initial timeline group states
10. **Template Context**: Access full resource data via `data.resourceData` in templates

## Common Scenarios

### Booking System (Rooms + Staff)
```typescript
// Two-level: Rooms → Staff per room
resources: ['Rooms', 'Staff']
// Staff has groupIDField linking to Room IDs
```

### Team Scheduler (Departments + Employees)
```typescript
// Group by department, then employees
resources: ['Departments', 'Employees']
// Or group by date to show daily team availability
byDate: true, resources: ['Employees']
```

### Multi-Calendar View (My Calendar, Team, Holidays)
```typescript
// Single-level, no grouping visual
resources: ['Calendars']
// No group property = overlay view with color distinction
```

### Equipment Scheduling
```typescript
// Timeline view with equipment resources
currentView: 'TimelineWeek'
resources: ['Equipment']
// Use startHourField/endHourField for maintenance windows
```
