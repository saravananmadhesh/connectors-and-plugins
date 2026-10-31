# Data Binding and CRUD Operations

## Table of Contents
- [Overview](#overview)
- [Local Data Binding](#local-data-binding)
- [Basic Local Data Binding](#basic-local-data-binding)
- [Using DataManager with Local Data](#using-datamanager-with-local-data)
- [Remote Data Binding](#remote-data-binding)
- [Using ODataV4 Adaptor](#using-odatav4-adaptor)
- [Using Web API Adaptor](#using-web-api-adaptor)
- [Filter Events with Built-in Query](#filter-events-with-built-in-query)
- [Using URL Adaptor for CRUD](#using-url-adaptor-for-crud)
- [Loading Data via AJAX](#loading-data-via-ajax)
- [CRUD Operations](#crud-operations)
- [Adding Events](#adding-events)
- [Updating Events](#updating-events)
- [Deleting Events](#deleting-events)
- [Server-Side CRUD Actions](#server-side-crud-actions)
- [Server-Side Insert](#server-side-insert)
- [Server-Side Update](#server-side-update)
- [Server-Side Delete](#server-side-delete)
- [Custom Adaptor](#custom-adaptor)
- [Additional Parameters](#additional-parameters)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)
- [Common Issues](#common-issues)
- [Events not loading](#events-not-loading)
- [CRUD operations not working](#crud-operations-not-working)
- [Events not updating in UI](#events-not-updating-in-ui)
- [Cross-origin errors](#cross-origin-errors)
- [Custom fields not saving](#custom-fields-not-saving)

## Overview

The Scheduler supports binding to local and remote data sources using the `DataManager`, which provides a unified interface for data operations. The `dataSource` property in `eventSettings` accepts either a JavaScript array or a `DataManager` instance.

**Supported Data Binding Methods:**
- Local data (JavaScript arrays)
- Remote data (REST APIs, OData services)
- CRUD operations (Create, Read, Update, Delete)

## Local Data Binding

Bind JavaScript object arrays directly to the Scheduler.

### Basic Local Data Binding

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
      [selectedDate]='selectedDate' 
      [eventSettings]='eventSettings'>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public eventSettings: EventSettingsModel = {
    dataSource: [
      {
        Id: 1,
        Subject: 'Team Meeting',
        StartTime: new Date(2024, 0, 15, 9, 30),
        EndTime: new Date(2024, 0, 15, 11, 0)
      },
      {
        Id: 2,
        Subject: 'Project Review',
        StartTime: new Date(2024, 0, 16, 12, 0),
        EndTime: new Date(2024, 0, 16, 14, 0)
      },
      {
        Id: 3,
        Subject: 'Client Presentation',
        StartTime: new Date(2024, 0, 17, 9, 30),
        EndTime: new Date(2024, 0, 17, 11, 0)
      },
      {
        Id: 4,
        Subject: 'Code Review',
        StartTime: new Date(2024, 0, 18, 13, 0),
        EndTime: new Date(2024, 0, 18, 14, 30)
      }
    ]
  };
}
```

**Note**: By default, `DataManager` uses `JsonAdaptor` for local data.

### Using DataManager with Local Data

```typescript
import { DataManager } from '@syncfusion/ej2-data';

export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  private localData: object[] = [
    {
      Id: 1,
      Subject: 'Meeting',
      StartTime: new Date(2024, 0, 15, 10, 0),
      EndTime: new Date(2024, 0, 15, 11, 0)
    }
  ];
  
  private dataManager: DataManager = new DataManager(this.localData);
  
  public eventSettings: EventSettingsModel = {
    dataSource: this.dataManager
  };
}
```

## Remote Data Binding

Connect to remote services using `DataManager` with appropriate adaptors.

### Using ODataV4 Adaptor

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [readonly]="readonly"
      [selectedDate]="selectedDate"
      [eventSettings]="eventSettings">
    </ejs-schedule>
  `
})
export class AppComponent {
  public readonly: boolean = true;
  public selectedDate: Date = new Date(2020, 9, 20);
  
  private dataManager: DataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
  });
  
  public eventSettings: EventSettingsModel = {
    dataSource: this.dataManager
  };
}
```

### Using Web API Adaptor

```typescript
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  private dataManager: DataManager = new DataManager({
    url: 'url',
    adaptor: new WebApiAdaptor(),
    crossDomain: true
  });
  
  public eventSettings: EventSettingsModel = {
    dataSource: this.dataManager
  };
}
```

### Filter Events with Built-in Query

Enable server-side filtering using `includeFiltersInQuery`:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [readonly]="readonly"
      [selectedDate]="selectedDate"
      [eventSettings]="eventSettings">
    </ejs-schedule>
  `
})
export class AppComponent {
  public readonly: boolean = true;
  public selectedDate: Date = new Date(1996, 6, 9);
  
  private dataManager: DataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
  });
  
  public eventSettings: EventSettingsModel = {
    includeFiltersInQuery: true, // Enable server-side filtering
    dataSource: this.dataManager,
    fields: {
      id: 'Id',
      subject: { name: 'ShipName' },
      location: { name: 'ShipCountry' },
      description: { name: 'ShipAddress' },
      startTime: { name: 'OrderDate' },
      endTime: { name: 'RequiredDate' },
      recurrenceRule: { name: 'ShipRegion' }
    }
  };
}
```

**Benefits**:
- Reduces data transfer to client
- Improves performance with large datasets
- Filters by start date, end date, and recurrence rule

**Considerations**:
- May result in longer query strings
- Check server limitations on query string length

### Using URL Adaptor for CRUD

```typescript
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  private dataManager: DataManager = new DataManager({
    url: 'Home/GetData', // GET endpoint
    crudUrl: 'Home/UpdateData', // CRUD endpoint
    adaptor: new UrlAdaptor()
  });
  
  public eventSettings: EventSettingsModel = {
    dataSource: this.dataManager
  };
}
```

### Loading Data via AJAX

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { Ajax } from '@syncfusion/ej2-base';
import { ScheduleComponent, ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      #scheduleObj
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      (created)="onCreate()">
    </ejs-schedule>
  `
})
export class AppComponent implements OnInit {
  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;
  
  public selectedDate: Date = new Date(2024, 0, 15);
  
  ngOnInit(): void {}
  
  onCreate() {
    const ajax = new Ajax(
      'url',
      'GET'
    );
    
    ajax.send();
    
    ajax.onSuccess = (data: string) => {
      this.scheduleObj.eventSettings.dataSource = JSON.parse(data);
    };
  }
}
```

## CRUD Operations

The Scheduler supports full CRUD (Create, Read, Update, Delete) operations on events.

### Adding Events

#### Method 1: Using Editor Window

**Double-click** on a cell to open the default editor window with fields:
- Subject
- Location
- Start Time / End Time
- All-Day checkbox
- Timezone
- Description
- Recurrence settings

**Single-click** on a cell for quick popup (Subject only).

**Select multiple cells** and press **Enter** for quick popup with time range.

#### Method 2: Using `addEvent()` Method

Add events programmatically:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ScheduleComponent, ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <button (click)="onAddClick()">Add Events</button>
    <ejs-schedule 
      #scheduleObj
      width='100%' 
      height='520px'
      [selectedDate]="selectedDate"
      [eventSettings]="eventSettings">
    </ejs-schedule>
  `
})
export class AppComponent {
  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;
  
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public eventSettings: EventSettingsModel = {
    dataSource: [
      {
        Id: 1,
        Subject: 'Existing Event',
        StartTime: new Date(2024, 0, 11, 9, 0),
        EndTime: new Date(2024, 0, 11, 10, 0)
      }
    ]
  };
  
  onAddClick(): void {
    const data: Object[] = [
      {
        Id: 2,
        Subject: 'Conference',
        StartTime: new Date(2024, 0, 12, 9, 0),
        EndTime: new Date(2024, 0, 12, 10, 0),
        IsAllDay: false
      },
      {
        Id: 3,
        Subject: 'Meeting',
        StartTime: new Date(2024, 0, 15, 10, 0),
        EndTime: new Date(2024, 0, 15, 11, 30),
        IsAllDay: false
      }
    ];
    
    this.scheduleObj.addEvent(data);
  }
}
```

**Add Single Event**:
```typescript
this.scheduleObj.addEvent({
  Id: 4,
  Subject: 'New Meeting',
  StartTime: new Date(2024, 0, 16, 14, 0),
  EndTime: new Date(2024, 0, 16, 15, 0)
});
```

### Updating Events

#### Method 1: Using Editor Window

**Click** on an event to open quick popup, then click **Edit** to open full editor.

Or **double-click** an event to directly open the editor.

#### Method 2: Using `saveEvent()` Method

```typescript
import { Component, ViewChild } from '@angular/core';
import { ScheduleComponent } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="onUpdateClick()">Update Event</button>
    <ejs-schedule #scheduleObj></ejs-schedule>
  `
})
export class AppComponent {
  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;
  
  onUpdateClick(): void {
    const event = {
      Id: 1,
      Subject: 'Updated Meeting Title',
      StartTime: new Date(2024, 0, 15, 10, 0),
      EndTime: new Date(2024, 0, 15, 12, 0), // Extended duration
      Location: 'Updated Location'
    };
    
    this.scheduleObj.saveEvent(event);
  }
}
```

**Update Multiple Events**:
```typescript
this.scheduleObj.saveEvent([event1, event2, event3]);
```

### Deleting Events

#### Method 1: Using Editor/Quick Popup

Click event → Quick Popup → Click **Delete** button.

Or open editor and click **Delete** button.

#### Method 2: Using `deleteEvent()` Method

**Delete by ID**:
```typescript
this.scheduleObj.deleteEvent(1); // Delete event with Id = 1
```

**Delete by Event Object**:
```typescript
const event = {
  Id: 2,
  Subject: 'Meeting to Delete',
  StartTime: new Date(2024, 0, 15, 10, 0),
  EndTime: new Date(2024, 0, 15, 11, 0)
};

this.scheduleObj.deleteEvent(event);
```

**Delete Multiple Events**:
```typescript
this.scheduleObj.deleteEvent([1, 2, 3]); // Delete by IDs

// Or by objects
this.scheduleObj.deleteEvent([event1, event2, event3]);
```

**Delete Recurring Event Occurrence**:
```typescript
// Delete single occurrence from recurring series
this.scheduleObj.deleteEvent(eventObject, 'DeleteOccurrence');

// Delete all following occurrences
this.scheduleObj.deleteEvent(eventObject, 'DeleteFollowingEvents');

// Delete entire series
this.scheduleObj.deleteEvent(eventObject, 'DeleteSeries');
```

## Server-Side CRUD Actions

### Server-Side Insert

```csharp
if (param.action == "insert" || (param.action == "batch" && param.added != null))
{
    var value = (param.action == "insert") ? param.value : param.added[0];
    int intMax = db.ScheduleEventDatas.ToList().Count > 0 
        ? db.ScheduleEventDatas.ToList().Max(p => p.Id) : 1;
    
    DateTime startTime = Convert.ToDateTime(value.StartTime);
    DateTime endTime = Convert.ToDateTime(value.EndTime);
    
    ScheduleEventData appointment = new ScheduleEventData()
    {
        Id = intMax + 1,
        StartTime = startTime.ToLocalTime(),
        EndTime = endTime.ToLocalTime(),
        Subject = value.Subject,
        IsAllDay = value.IsAllDay,
        StartTimezone = value.StartTimezone,
        EndTimezone = value.EndTimezone,
        RecurrenceRule = value.RecurrenceRule,
        RecurrenceID = value.RecurrenceID,
        RecurrenceException = value.RecurrenceException
    };
    
    db.ScheduleEventDatas.InsertOnSubmit(appointment);
    db.SubmitChanges();
}
```

### Server-Side Update

```csharp
if (param.action == "update" || (param.action == "batch" && param.changed != null))
{
    var value = (param.action == "update") ? param.value : param.changed[0];
    var filterData = db.ScheduleEventDatas.Where(c => c.Id == Convert.ToInt32(value.Id));
    
    if (filterData.Count() > 0)
    {
        DateTime startTime = Convert.ToDateTime(value.StartTime);
        DateTime endTime = Convert.ToDateTime(value.EndTime);
        
        ScheduleEventData appointment = db.ScheduleEventDatas.Single(A => A.Id == Convert.ToInt32(value.Id));
        appointment.StartTime = startTime.ToLocalTime();
        appointment.EndTime = endTime.ToLocalTime();
        appointment.StartTimezone = value.StartTimezone;
        appointment.EndTimezone = value.EndTimezone;
        appointment.Subject = value.Subject;
        appointment.IsAllDay = value.IsAllDay;
        appointment.RecurrenceRule = value.RecurrenceRule;
        appointment.RecurrenceID = value.RecurrenceID;
        appointment.RecurrenceException = value.RecurrenceException;
    }
    
    db.SubmitChanges();
}
```

### Server-Side Delete

```csharp
if (param.action == "remove" || (param.action == "batch" && param.deleted != null))
{
    if (param.action == "remove")
    {
        int key = Convert.ToInt32(param.key);
        ScheduleEventData appointment = db.ScheduleEventDatas.Where(c => c.Id == key).FirstOrDefault();
        if (appointment != null) db.ScheduleEventDatas.DeleteOnSubmit(appointment);
    }
    else
    {
        foreach (var apps in param.deleted)
        {
            ScheduleEventData appointment = db.ScheduleEventDatas.Where(c => c.Id == apps.Id).FirstOrDefault();
            if (appointment != null) db.ScheduleEventDatas.DeleteOnSubmit(appointment);
        }
    }
    
    db.SubmitChanges();
}
```

## Custom Adaptor

Create custom adaptors by extending built-in adaptors:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

class CustomAdaptor extends ODataV4Adaptor {
  override processResponse(): Object {
    let i: number = 0;
    // Call base class processResponse
    let original: any = super.processResponse.apply(this, arguments as any);
    
    // Add custom field
    original.forEach((item: any) => item['EventID'] = ++i);
    
    return original;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [readonly]="readonly"
      [selectedDate]="selectedDate"
      [eventSettings]="eventSettings">
    </ejs-schedule>
  `
})
export class AppComponent {
  public readonly: boolean = true;
  public selectedDate: Date = new Date(1996, 6, 9);
  
  private dataManager: DataManager = new DataManager({
    url: 'url',
    adaptor: new CustomAdaptor()
  });
  
  public eventSettings: EventSettingsModel = {
    dataSource: this.dataManager,
    fields: {
      id: 'Id',
      subject: { name: 'ShipName' },
      location: { name: 'ShipCountry' },
      description: { name: 'ShipAddress' },
      startTime: { name: 'OrderDate' },
      endTime: { name: 'RequiredDate' },
      recurrenceRule: { name: 'ShipRegion' }
    }
  };
}
```

## Additional Parameters

Pass custom parameters to the server using `Query.addParams()`:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [readonly]="readonly"
      [selectedDate]="selectedDate"
      [eventSettings]="eventSettings">
    </ejs-schedule>
  `
})
export class AppComponent {
  public readonly: boolean = true;
  public selectedDate: Date = new Date(2024, 0, 15);
  
  private dataManager: DataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor()
  });
  
  private dataQuery: Query = new Query()
    .from('Events')
    .addParams('readOnly', 'true')
    .addParams('userId', '12345');
  
  public eventSettings: EventSettingsModel = {
    dataSource: this.dataManager,
    query: this.dataQuery
  };
}
```

**Note**: Parameters added via `query` are sent with every data request.

## Error Handling

Handle server-side errors using the `actionFailure` event:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ScheduleComponent, ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { DataManager } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <span style="color: #FF0000">{{errorMessage}}</span>
    <ejs-schedule 
      #scheduleObj
      width='100%' 
      height='530px'
      [readonly]="readonly"
      [selectedDate]="selectedDate"
      [eventSettings]="eventSettings"
      (actionFailure)="onActionFailure($event)">
    </ejs-schedule>
  `
})
export class AppComponent {
  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;
  
  public readonly: boolean = false;
  public selectedDate: Date = new Date(2024, 0, 15);
  public errorMessage: string = '';
  
  private dataManager: DataManager = new DataManager({
    url: 'http://invalid-url.com/api/schedule' // Invalid URL for demo
  });
  
  public eventSettings: EventSettingsModel = {
    dataSource: this.dataManager
  };
  
  onActionFailure(eventData: any): void {
    this.errorMessage = `Server exception: ${eventData.error.status} ${eventData.error.statusText}`;
    console.error('Action failed:', eventData);
  }
}
```

**actionFailure triggers when**:
- Server returns HTTP error (404, 500, etc.)
- Network failure occurs
- Exception happens during CRUD operations

## Best Practices

1. **Use DataManager for Remote Data**: Provides unified interface for CRUD operations
2. **Enable Server Filtering**: Use `includeFiltersInQuery` for large datasets
3. **Handle Errors Gracefully**: Always implement `actionFailure` event handler
4. **Validate Data**: Validate on both client and server side
5. **Use Appropriate Adaptor**: Choose adaptor matching your server API (ODataV4, WebApi, UrlAdaptor)
6. **Batch Operations**: Use `addEvent([])`, `saveEvent([])`, `deleteEvent([])` for multiple events
7. **Custom Parameters**: Use `Query.addParams()` for filtering or authentication tokens

## Common Issues

### Events not loading
- **Solution**: Check network tab for API errors; verify URL and adaptor configuration

### CRUD operations not working
- **Solution**: Ensure `crudUrl` is set for UrlAdaptor; verify server endpoints accept correct HTTP methods

### Events not updating in UI
- **Solution**: Ensure server returns updated data; check `dataSource` is properly bound

### Cross-origin errors
- **Solution**: Set `crossDomain: true` in DataManager; configure CORS on server

### Custom fields not saving
- **Solution**: Map custom fields using `fields` property; ensure server accepts custom fields
