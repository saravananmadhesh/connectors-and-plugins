# Data Binding

## Table of Contents
- [Overview](#overview)
- [Local Data Binding](#local-data-binding)
- [Remote Data Binding](#remote-data-binding)
  - [Using ODataV4 Adaptor](#using-odatav4-adaptor)
  - [Using Web API Adaptor](#using-web-api-adaptor)
  - [Server-Side Filtering with includeFiltersInQuery](#server-side-filtering-with-includefiltersinquery)
- [Custom Adaptor](#custom-adaptor)

## Overview

The Scheduler supports data binding through the `DataManager`, allowing both local JavaScript array binding and remote RESTful service binding. Data is assigned to the `dataSource` property within `eventSettings`.

**Supported Data Sources:**
- Local JSON data
- Remote data via DataManager
- OData services
- Web API endpoints
- Custom adaptors

## Local Data Binding

Bind JavaScript object arrays directly to the Scheduler:

```vue
<template>
  <ejs-schedule 
    :selectedDate="selectedDate" 
    :eventSettings="eventSettings">
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-vue-schedule';

const scheduleData = [
  {
    Id: 1,
    Subject: 'Team Meeting',
    StartTime: new Date(2024, 0, 15, 9, 30),
    EndTime: new Date(2024, 0, 15, 11, 0),
    Location: 'Conference Room'
  },
  {
    Id: 2,
    Subject: 'Project Review',
    StartTime: new Date(2024, 0, 16, 14, 0),
    EndTime: new Date(2024, 0, 16, 15, 30),
    Location: 'Office'
  }
];

const selectedDate = new Date(2024, 0, 15);
const eventSettings = {
  dataSource: scheduleData
};

provide('schedule', [Day, Week, WorkWeek, Month, Agenda]);
</script>
```

**Note:** By default, `DataManager` uses `JsonAdaptor` for local data.

## Remote Data Binding

### Using ODataV4 Adaptor

Connect to OData V4 services:

```vue
<template>
  <ejs-schedule 
    :selectedDate="selectedDate" 
    :eventSettings="eventSettings"
    :readonly="true">
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-vue-schedule';

const dataManager = new DataManager({
  url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders/',
  adaptor: new ODataV4Adaptor(),
  crossDomain: true
});

const selectedDate = new Date(1996, 6, 9);
const eventSettings = {
  dataSource: dataManager,
  fields: {
    id: 'OrderID',
    subject: { name: 'ShipName' },
    location: { name: 'ShipCountry' },
    description: { name: 'ShipAddress' },
    startTime: { name: 'OrderDate' },
    endTime: { name: 'RequiredDate' }
  }
};

provide('schedule', [Day, Week, WorkWeek, Month, Agenda]);
</script>
```

### Using Web API Adaptor

Connect to RESTful Web APIs:

```vue
<script setup>
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  crossDomain: true
});

const eventSettings = {
  dataSource: dataManager
};
</script>
```

### Server-Side Filtering with includeFiltersInQuery

Enable automatic server-side filtering based on visible date range:

```vue
<script setup>
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: 'url',
  adaptor: new ODataV4Adaptor(),
  crossDomain: true
});

const eventSettings = {
  dataSource: dataManager,
  query: new Query(),
  includeFiltersInQuery: true, // Automatically filters by date range
  fields: {
    id: 'OrderID',
    subject: { name: 'ShipName' },
    startTime: { name: 'OrderDate' },
    endTime: { name: 'RequiredDate' }
  }
};
</script>
```

**Benefits of includeFiltersInQuery:**
- Reduces data transferred to client
- Improves performance for large datasets
- Automatically constructs filter query with start date, end date, and recurrence rule
- Only fetches relevant events for visible date range

**Query Parameters Generated:**
```
?$filter=((OrderDate ge 2024-01-01T00:00:00Z) and (RequiredDate le 2024-01-31T23:59:59Z))
```

## Custom Adaptor

Create custom adaptors by extending built-in ones to add custom processing:

```vue
<script setup>
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

class CustomAdaptor extends ODataV4Adaptor {
  processResponse() {
    // Call base class method
    let i = 0;
    const result = super.processResponse.apply(this, arguments);
    
    // Add custom field to each event
    result.forEach((item) => {
      item.EventID = ++i;
      item.CustomField = 'Custom Value';
    });
    
    return result;
  }
}

const dataManager = new DataManager({
  url: 'url',
  adaptor: new CustomAdaptor(),
  crossDomain: true
});

const eventSettings = {
  dataSource: dataManager,
  fields: {
    id: 'Id',
    subject: { name: 'ShipName' },
    startTime: { name: 'OrderDate' },
    endTime: { name: 'RequiredDate' }
  }
};
</script>
```

## Loading Data via AJAX Post

Fetch event data using AJAX and assign to Scheduler:

```vue
<script setup>
import { ref } from "vue";
import { Ajax } from '@syncfusion/ej2-base';

let dataManager = ref([]);
let ajax = new Ajax('Home/GetData', 'GET', false);
ajax.onSuccess = function (value) {
  dataManager.value = value;
};
ajax.send();

const eventSettings = { dataSource: dataManager.value };
</script>
```

## Passing Additional Parameters to the Server

Use `Query.addParams()` to send custom parameters with requests:

```vue
<script setup>
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: 'url',
  adaptor: new ODataV4Adaptor(),
  crossDomain: true
});

const dataQuery = new Query().addParams('readOnly', 'true');

const eventSettings = {
  dataSource: dataManager,
  query: dataQuery,
  fields: {
    id: 'Id',
    subject: { name: 'ShipName' },
    startTime: { name: 'OrderDate' },
    endTime: { name: 'RequiredDate' }
  }
};
</script>
```

**Note**: Parameters added using the `query` property are sent with every scheduler action request to the server.

## Handling Failure Actions

Handle server-side errors using the `actionFailure` event:

```vue
<template>
  <ejs-schedule 
    ref="scheduleObj"
    :eventSettings="eventSettings"
    :actionFailure="onActionFailure">
  </ejs-schedule>
</template>

<script setup>
import { ref } from "vue";
import { DataManager } from '@syncfusion/ej2-data';

const scheduleObj = ref(null);

const dataManager = new DataManager({
  url: 'http://invalid-url.com'
});

const eventSettings = { dataSource: dataManager };

const onActionFailure = function (args) {
  const span = document.createElement('span');
  const schedule = scheduleObj.value.ej2Instances;
  schedule.element.parentNode.insertBefore(span, schedule.element);
  span.style.color = '#FF0000';
  span.innerHTML = 'Server exception: ' + args.error.statusText;
};
</script>
```

**Note**: `actionFailure` triggers for both server errors and scheduler CRUD action exceptions.

## Scheduler CRUD Actions

Perform Create, Read, Update, and Delete operations automatically with `DataManager`:

```vue
<script setup>
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: 'Home/GetData',         // Read endpoint
  crudUrl: 'Home/UpdateData',  // CRUD endpoint
  adaptor: new UrlAdaptor()
});

const eventSettings = { dataSource: dataManager };
</script>
```

**Server-side CRUD Handler** (C# example):

```csharp
[HttpPost]
public JsonResult UpdateData(EditParams param)
{
  if (param.action == "insert") {
    // Insert new appointment
    var appointment = param.value;
    db.ScheduleEventDatas.InsertOnSubmit(appointment);
  }
  else if (param.action == "update") {
    // Update existing appointment
    var appointment = db.ScheduleEventDatas.Single(a => a.Id == param.value.Id);
    appointment.Subject = param.value.Subject;
    appointment.StartTime = param.value.StartTime;
  }
  else if (param.action == "remove") {
    // Delete appointment
    var appointment = db.ScheduleEventDatas.Where(c => c.Id == param.key).FirstOrDefault();
    if (appointment != null) 
      db.ScheduleEventDatas.DeleteOnSubmit(appointment);
  }
  
  db.SubmitChanges();
  return Json(db.ScheduleEventDatas.ToList());
}
```

## Google Calendar Integration

Integrate Google Calendar with Scheduler using custom data binding:

```vue
<template>
  <ejs-schedule 
    :eventSettings="eventSettings"
    :dataBinding="onDataBinding"
    readonly>
  </ejs-schedule>
</template>

<script setup>
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

const calendarId = 'en.usa%23holiday@group.v.calendar.google.com';
const publicKey = 'YOUR_GOOGLE_API_KEY';

const dataManager = new DataManager({
  url: 'url' + calendarId + 
         '/events?key=' + publicKey,
  adaptor: new WebApiAdaptor(),
  crossDomain: true
});

const eventSettings = {
  dataSource: dataManager
};

const onDataBinding = function (e) {
  const items = e.result.items || [];
  const scheduleData = items.map(event => ({
    Id: event.id,
    Subject: event.summary,
    StartTime: new Date(event.start.dateTime || event.start.date),
    EndTime: new Date(event.end.dateTime || event.end.date),
    IsAllDay: !event.start.dateTime
  }));
  e.result = scheduleData;
};
</script>
```

## Custom Field Mapping

Map custom field names from your data source:

```vue
<script setup>
const eventSettings = {
  dataSource: customData,
  fields: {
    id: 'EventId',
    subject: { name: 'Title', title: 'Event Title' },
    startTime: { name: 'From' },
    endTime: { name: 'To' },
    location: { name: 'Place' },
    description: { name: 'Notes' },
    isAllDay: { name: 'FullDay' },
    recurrenceRule: { name: 'RecRule' },
    recurrenceException: { name: 'RecException' },
    recurrenceID: { name: 'ParentId' }
  }
};
</script>
```

## Loading Indicator

Show loading indicator while fetching remote data:

```vue
<template>
  <ejs-schedule 
    :eventSettings="eventSettings"
    :dataBinding="onDataBinding"
    :dataBound="onDataBound">
  </ejs-schedule>
</template>

<script setup>
const onDataBinding = () => {
  console.log('Data binding started...');
  // Show loading indicator
};

const onDataBound = () => {
  console.log('Data binding completed');
  // Hide loading indicator
};
</script>
```

## Error Handling

Handle data binding errors:

```vue
<template>
  <ejs-schedule 
    :eventSettings="eventSettings"
    :actionFailure="onActionFailure">
  </ejs-schedule>
</template>

<script setup>
const onActionFailure = (args) => {
  console.error('Data operation failed:', args);
  alert(`Error: ${args.error.message || 'Failed to load data'}`);
};
</script>
```

## Best Practices

1. **Use includeFiltersInQuery** for remote data to reduce payload size
2. **Implement error handling** with `actionFailure` event
3. **Map custom fields** using the `fields` property in `eventSettings`
4. **Enable batch operations** for better performance with multiple changes
5. **Use appropriate adaptors** based on your backend (ODataV4, WebApi, URL adaptor)
6. **Implement loading indicators** for better UX during data operations
7. **Cache data** when possible to reduce server requests
8. **Validate data** on both client and server sides
9. **Handle CRUD failures** gracefully with user-friendly messages
10. **Test with large datasets** to ensure performance meets requirements
