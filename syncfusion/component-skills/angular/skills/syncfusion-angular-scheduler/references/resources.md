# Resources and Resource Grouping

## Table of Contents
- [Overview](#overview)
- [Resource Fields](#resource-fields)
- [Resource Data Binding](#resource-data-binding)
- [Multiple Resources Without Grouping](#multiple-resources-without-grouping)
- [Resource Grouping](#resource-grouping)
- [Shared Events Across Resources](#shared-events-across-resources)
- [Customizing Resource Headers](#customizing-resource-headers)

## Overview

Resources allow the Scheduler to be shared by multiple entities (users, rooms, equipment, etc.). Appointments can be assigned to one or more resources, and the Scheduler displays them under their respective resources. Resources support:
- Single and multiple levels of hierarchical grouping
- Vertical (calendar) and horizontal (timeline) layouts
- Expandable/collapsible groups in timeline views
- Different working hours and days per resource

## Resource Fields

Configure resources using the `<e-resources>` and `<e-resource>` directives with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `field` | string | Binds to the resource field in appointment objects |
| `title` | string | Displayed in the event editor window as label |
| `name` | string | Unique identifier used in grouping configuration |
| `allowMultiple` | boolean | Allows multiple resource selection (creates appointment copies) |
| `dataSource` | Object[] / DataManager | Resource data (local array or remote via DataManager) |
| `query` | Query | External query for data processing |
| `idField` | string | Maps to the resource ID field |
| `textField` | string | Maps to the resource display name field |
| `groupIDField` | string | Maps to parent resource ID for hierarchical grouping |
| `colorField` | string | Maps to color field (applied to appointments) |
| `startHourField` | string | Maps to custom start hour for the resource |
| `endHourField` | string | Maps to custom end hour for the resource |
| `workDaysField` | string | Maps to custom working days (array of day indexes 0-6) |
| `cssClassField` | string | Maps to custom CSS class for resource appointments |
| `expandedField` | string | Boolean field controlling initial expand/collapse state (timeline views) |

## Resource Data Binding

### Local JSON Data

Bind local data directly to the `dataSource` property:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { WeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [WeekService, MonthService, AgendaService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      [views]='views'
      [eventSettings]='eventSettings'>
      <e-resources>
        <e-resource 
          field='OwnerId' 
          title='Owner' 
          name='Owners'
          [dataSource]='ownerDataSource'
          [allowMultiple]='allowMultiple'
          textField='OwnerText' 
          idField='Id' 
          colorField='OwnerColor'>
        </e-resource>
      </e-resources>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public views: Array<string> = ['Week', 'Month', 'Agenda'];
  
  public eventSettings: EventSettingsModel = {
    dataSource: [
      {
        Id: 1,
        Subject: 'Team Meeting',
        StartTime: new Date(2024, 0, 15, 10, 0),
        EndTime: new Date(2024, 0, 15, 11, 30),
        OwnerId: 1 // Maps to resource
      },
      {
        Id: 2,
        Subject: 'Project Review',
        StartTime: new Date(2024, 0, 16, 14, 0),
        EndTime: new Date(2024, 0, 16, 15, 30),
        OwnerId: 2
      }
    ]
  };
  
  public allowMultiple: boolean = true;
  
  public ownerDataSource: Object[] = [
    { OwnerText: 'Nancy', Id: 1, OwnerColor: '#ffaa00' },
    { OwnerText: 'Steven', Id: 2, OwnerColor: '#f8a398' },
    { OwnerText: 'Michael', Id: 3, OwnerColor: '#7499e1' }
  ];
}
```

**Key Points**:
- The appointment's `OwnerId` field matches the resource `field` property
- Appointments are color-coded based on `colorField`
- Set `allowMultiple: true` to allow selecting multiple resources in the editor

### Remote Data Service

Bind remote data using `DataManager`:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [WeekService, MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'>
      <e-resources>
        <e-resource 
          field='OwnerId' 
          title='Owner' 
          name='Owners'
          [dataSource]='resourceDataManager'
          [allowMultiple]='allowMultiple'
          textField='OwnerText' 
          idField='Id' 
          colorField='OwnerColor'>
        </e-resource>
      </e-resources>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public resourceDataManager: DataManager = new DataManager({
    url: 'Home/GetResourceData',
    adaptor: new UrlAdaptor(),
    crossDomain: true
  });
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
  
  public allowMultiple: boolean = true;
}
```

## Multiple Resources Without Grouping

Display the Scheduler in default mode where all appointments from different resources appear together, differentiated only by color:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
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
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'>
      <e-resources>
        <e-resource 
          field='OwnerId' 
          title='Owner' 
          name='Owners'
          [dataSource]='ownerDataSource'
          [allowMultiple]='allowMultiple'
          textField='OwnerText' 
          idField='Id' 
          colorField='OwnerColor'>
        </e-resource>
      </e-resources>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public eventSettings: EventSettingsModel = {
    dataSource: [
      {
        Id: 1,
        Subject: 'Meeting',
        StartTime: new Date(2024, 0, 15, 10, 0),
        EndTime: new Date(2024, 0, 15, 11, 0),
        OwnerId: 1
      }
    ]
  };
  
  public allowMultiple: boolean = true;
  
  public ownerDataSource: Object[] = [
    { OwnerText: 'Nancy', Id: 1, OwnerColor: '#ffaa00' },
    { OwnerText: 'Steven', Id: 2, OwnerColor: '#f8a398' },
    { OwnerText: 'Michael', Id: 3, OwnerColor: '#7499e1' }
  ];
}
```

**Behavior**:
- No visual separation of resources
- All appointments visible in one view
- Resource selection available in event editor
- Color-coding distinguishes resource ownership

## Resource Grouping

Group resources to display them in separate columns/rows with their appointments.

### Single-Level Grouping

Display all resources at one level using the `group` property:

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
      height='550px'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'
      [group]='group'>
      <e-resources>
        <e-resource 
          field='OwnerId' 
          title='Owner' 
          name='Owners'
          [dataSource]='ownerDataSource'
          textField='OwnerText' 
          idField='Id' 
          colorField='OwnerColor'>
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
    resources: ['Owners'] // Matches resource 'name'
  };
  
  public ownerDataSource: Object[] = [
    { OwnerText: 'Nancy', Id: 1, OwnerColor: '#ffaa00' },
    { OwnerText: 'Steven', Id: 2, OwnerColor: '#f8a398' },
    { OwnerText: 'Michael', Id: 3, OwnerColor: '#7499e1' }
  ];
}
```

**Result**: Three separate columns (Nancy, Steven, Michael) each showing their appointments.

### Multi-Level Hierarchical Grouping

Create parent-child resource relationships using `groupIDField`:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel, GroupModel } from '@syncfusion/ej2-angular-schedule';
import { WeekService, MonthService, TimelineViewsService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [WeekService, MonthService, TimelineViewsService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      currentView='TimelineWeek'
      [eventSettings]='eventSettings'
      [group]='group'>
      <e-resources>
        <e-resource 
          field='RoomId' 
          title='Room' 
          name='Rooms'
          [dataSource]='roomDataSource'
          textField='RoomText' 
          idField='Id' 
          colorField='RoomColor'>
        </e-resource>
        <e-resource 
          field='OwnerId' 
          title='Owner' 
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
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public eventSettings: EventSettingsModel = {
    dataSource: [
      {
        Id: 1,
        Subject: 'Meeting',
        StartTime: new Date(2024, 0, 15, 10, 0),
        EndTime: new Date(2024, 0, 15, 11, 0),
        RoomId: 1,
        OwnerId: 1 // Nancy in Room 1
      }
    ]
  };
  
  public group: GroupModel = {
    resources: ['Rooms', 'Owners'] // Order matters: parent first
  };
  
  public roomDataSource: Object[] = [
    { RoomText: 'ROOM 1', Id: 1, RoomColor: '#cb6bb2' },
    { RoomText: 'ROOM 2', Id: 2, RoomColor: '#56ca85' }
  ];
  
  public allowMultiple: boolean = true;
  
  public ownerDataSource: Object[] = [
    { OwnerText: 'Nancy', Id: 1, OwnerGroupId: 1, OwnerColor: '#ffaa00' },  // Under Room 1
    { OwnerText: 'Steven', Id: 2, OwnerGroupId: 2, OwnerColor: '#f8a398' }, // Under Room 2
    { OwnerText: 'Michael', Id: 3, OwnerGroupId: 1, OwnerColor: '#7499e1' } // Under Room 1
  ];
}
```

**Result**: Timeline view shows ROOM 1 → Nancy, Michael | ROOM 2 → Steven

### One-to-One Grouping

Display all child resources under each parent resource (instead of grouping by `groupIDField`):

```typescript
public group: GroupModel = {
  byGroupID: false, // Disable parent-child filtering
  resources: ['Rooms', 'Owners']
};

public ownerDataSource: Object[] = [
  { OwnerText: 'Nancy', Id: 1, OwnerColor: '#ffaa00' },   // No OwnerGroupId
  { OwnerText: 'Steven', Id: 2, OwnerColor: '#f8a398' },
  { OwnerText: 'Michael', Id: 3, OwnerColor: '#7499e1' }
];
```

**Result**: ROOM 1 → Nancy, Steven, Michael | ROOM 2 → Nancy, Steven, Michael

### Grouping by Date

Show resources under each date (calendar views only):

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
      height='550px'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'
      [group]='group'>
      <e-resources>
        <e-resource 
          field='OwnerId' 
          title='Owner' 
          name='Owners'
          [dataSource]='ownerDataSource'
          textField='text' 
          idField='id' 
          colorField='color'>
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
    byDate: true, // Group by date first
    resources: ['Owners']
  };
  
  public ownerDataSource: Object[] = [
    { text: 'Alice', id: 1, color: '#1aaa55' },
    { text: 'Smith', id: 2, color: '#7fa900' }
  ];
}
```

**Result**: Monday → Alice, Smith | Tuesday → Alice, Smith | ...

**Note**: Not applicable to timeline views.

### Hiding Non-Working Days in Date Grouping

When grouping by date with custom working days per resource, hide non-working days:

```typescript
public group: GroupModel = {
  byDate: true,
  hideNonWorkingDays: true, // Show only working days
  resources: ['Owners']
};

public ownerDataSource: Object[] = [
  { text: 'Alice', id: 1, color: '#1aaa55', workDays: [1, 2, 3, 4] }, // Mon-Thu
  { text: 'Smith', id: 2, color: '#7fa900', workDays: [2, 3, 5] }     // Tue, Wed, Fri
];
```

**Result**: Only displays Mon, Tue, Wed, Thu, Fri (union of all working days).

## Shared Events Across Resources

Enable `allowGroupEdit` to maintain a single appointment object shared across multiple resources:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel, GroupModel } from '@syncfusion/ej2-angular-schedule';
import { WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [WeekService, MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'
      [group]='group'>
      <e-resources>
        <e-resource 
          field='ConferenceId' 
          title='Conference' 
          name='Conferences'
          [dataSource]='conferenceDataSource'
          [allowMultiple]='allowMultiple'
          textField='Text' 
          idField='Id' 
          colorField='Color'>
        </e-resource>
      </e-resources>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public eventSettings: EventSettingsModel = {
    dataSource: [
      {
        Id: 1,
        Subject: 'Shared Meeting',
        StartTime: new Date(2024, 0, 15, 10, 0),
        EndTime: new Date(2024, 0, 15, 11, 0),
        ConferenceId: [1, 2, 3] // Array of resource IDs
      }
    ]
  };
  
  public group: GroupModel = {
    allowGroupEdit: true, // Enable shared editing
    resources: ['Conferences']
  };
  
  public allowMultiple: boolean = true;
  
  public conferenceDataSource: Object[] = [
    { Text: 'Margaret', Id: 1, Color: '#1aaa55' },
    { Text: 'Robert', Id: 2, Color: '#357cd2' },
    { Text: 'Laura', Id: 3, Color: '#7fa900' }
  ];
}
```

**Behavior**:
- Single appointment appears under all selected resources
- Editing one instance updates all others simultaneously
- Appointment's resource field contains an array: `ConferenceId: [1, 2, 3]`

## Customizing Resource Headers

### Simple Template Customization

Add custom fields to resource headers using `resourceHeaderTemplate`:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel, GroupModel } from '@syncfusion/ej2-angular-schedule';
import { WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [WeekService, MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'
      [group]='group'>
      <e-resources>
        <e-resource 
          field='DoctorId' 
          title='Doctor' 
          name='Doctors'
          [dataSource]='doctorDataSource'
          textField='text' 
          idField='id' 
          colorField='color'
          designationField='designation'>
        </e-resource>
      </e-resources>
      <ng-template #resourceHeaderTemplate let-data>
        <div class='template-wrap'>
          <div class="resource-name">{{data.resourceData.text}}</div>
          <div class="resource-designation">{{data.resourceData.designation}}</div>
        </div>
      </ng-template>
    </ejs-schedule>
  `,
  styles: [`
    .resource-name { font-weight: bold; font-size: 14px; }
    .resource-designation { font-size: 11px; color: #666; }
  `]
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
    { text: 'Dr. Smith', id: 1, color: '#ea7a57', designation: 'Cardiologist' },
    { text: 'Dr. Alice', id: 2, color: '#7fa900', designation: 'Neurologist' },
    { text: 'Dr. Robson', id: 3, color: '#7fa900', designation: 'Orthopedic Surgeon' }
  ];
}
```

### Multi-Column Resource Headers (Timeline Views)

Display multiple attributes (Room, Type, Capacity) in resource headers:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel, GroupModel, RenderCellEventArgs } from '@syncfusion/ej2-angular-schedule';
import { TimelineViewsService, TimelineMonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [TimelineViewsService, TimelineMonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      [views]='views'
      [eventSettings]='eventSettings'
      [group]='group'
      (renderCell)='onRenderCell($event)'>
      <e-resources>
        <e-resource 
          field='RoomId' 
          title='Room' 
          name='MeetingRoom'
          [dataSource]='roomDataSource'
          textField='text' 
          idField='id' 
          colorField='color'>
        </e-resource>
      </e-resources>
      <ng-template #resourceHeaderTemplate let-data>
        <div class='template-wrap'>
          <div class="room-name">{{data.resourceData.text}}</div>
          <div class="room-type">{{data.resourceData.type}}</div>
          <div class="room-capacity">{{data.resourceData.capacity}}</div>
        </div>
      </ng-template>
    </ejs-schedule>
  `,
  styles: [`
    .room-name { font-weight: bold; }
    .room-type, .room-capacity { font-size: 11px; color: #666; }
  `]
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public views: Array<string> = ['TimelineWeek', 'TimelineMonth'];
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
  
  public group: GroupModel = {
    resources: ['MeetingRoom']
  };
  
  public roomDataSource: Object[] = [
    { text: 'Jammy', id: 1, color: '#ea7a57', capacity: 20, type: 'Conference' },
    { text: 'Tweety', id: 2, color: '#7fa900', capacity: 7, type: 'Cabin' },
    { text: 'Nestle', id: 3, color: '#5978ee', capacity: 5, type: 'Cabin' }
  ];
  
  onRenderCell(args: RenderCellEventArgs): void {
    if (args.elementType === 'emptyCells' && args.element.classList.contains('e-resource-left-td')) {
      let target: HTMLElement = args.element.children[0] as HTMLElement;
      target.innerHTML = '<div class="name">Rooms</div><div class="type">Type</div><div class="capacity">Capacity</div>';
    }
  }
}
```

### Resource Header Tooltips

Display tooltips on hover using `headerTooltipTemplate`:

```typescript
<ejs-schedule 
  [group]='group'>
  <e-resources>
    <e-resource 
      field='OwnerId' 
      name='Owners'
      [dataSource]='ownerDataSource'>
    </e-resource>
  </e-resources>
  <ng-template #groupHeaderTooltipTemplate let-data>
    <div>Name: {{data.resourceData.OwnerText}}</div>
    <div>Email: {{data.resourceData.email}}</div>
  </ng-template>
</ejs-schedule>
```

### Customizing Parent Resource Cells

Style parent resource work cells in timeline views using `renderCell` event:

```typescript
onRenderCell(args: RenderCellEventArgs): void {
  if (args.elementType === 'resourceGroupCells' && args.element.classList.contains('e-work-hours')) {
    (args.element as HTMLElement).style.background = '#FAFAE3';
  }
}
```
