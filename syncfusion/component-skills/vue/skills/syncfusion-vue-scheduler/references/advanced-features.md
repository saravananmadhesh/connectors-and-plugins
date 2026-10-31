# Advanced Features

## Table of Contents
- [Virtual Scrolling](#virtual-scrolling)
- [Lazy Loading](#lazy-loading)
- [Exporting](#exporting)
- [Printing](#printing)
- [State Persistence](#state-persistence)
- [Row Auto Height](#row-auto-height)
- [Event Template](#event-template)
- [Quick Info Template](#quick-info-template)
- [Block Time Slots](#block-time-slots)
- [Tooltip](#tooltip)
- [Inline Editing](#inline-editing)
- [Responsive Design](#responsive-design)

## Virtual Scrolling

Enable for large datasets in Agenda and Timeline views:

```vue
<template>
  <ejs-schedule :eventSettings="eventSettings">
    <e-views>
      <e-view 
        option="Agenda" 
        :allowVirtualScrolling="true">
      </e-view>
      <e-view 
        option="TimelineMonth" 
        :allowVirtualScrolling="true">
      </e-view>
    </e-views>
  </ejs-schedule>
</template>
```

**Benefits**:
- Improved performance with thousands of events
- Smooth scrolling experience
- Reduced initial load time

## Lazy Loading

Enable lazy loading to fetch events on-demand from the server as users scroll. This is ideal for very large datasets with resource grouping enabled:

```vue
<template>
  <ejs-schedule 
    :eventSettings="eventSettings"
    :group="group">
    <e-views>
      <e-view 
        option="TimelineMonth" 
        :enableLazyLoad="true"
        :allowVirtualScrolling="true">
      </e-view>
    </e-views>
    <e-resources>
      <e-resource 
        field="ResourceId" 
        title="Resource" 
        name="Resources" 
        :dataSource="resourceDataSource"
        textField="text" 
        idField="id">
      </e-resource>
    </e-resources>
  </ejs-schedule>
</template>

<script setup>
import { provide, ref } from "vue";
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { ScheduleComponent as EjsSchedule, ViewDirective as EView, ViewsDirective as EViews, 
         TimelineMonth, ResourcesDirective as EResources, ResourceDirective as EResource } from '@syncfusion/ej2-vue-schedule';

const eventSettings = {
  dataSource: new DataManager({
    url: 'url',
    adaptor: new WebApiAdaptor(),
    crossDomain: true
  }),
  fields: {
    id: 'Id',
    subject: { name: 'Subject', title: 'Summary' },
    startTime: { name: 'StartTime', title: 'From' },
    endTime: { name: 'EndTime', title: 'To' },
    resourceIdField: 'ResourceId'
  }
};

const group = {
  resources: ['Resources']
};

const resourceDataSource = [
  { id: 1, text: 'Resource 1' },
  { id: 2, text: 'Resource 2' },
  { id: 3, text: 'Resource 3' }
];

provide('schedule', [TimelineMonth]);
</script>
```

### Vue 2 Options API Example:

```vue
<script>
export default {
  data() {
    return {
      eventSettings: {
        dataSource: new DataManager({
          url: 'url',
          adaptor: new WebApiAdaptor(),
          crossDomain: true
        }),
        fields: {
          id: 'Id',
          subject: { name: 'Subject', title: 'Summary' },
          startTime: { name: 'StartTime', title: 'From' },
          endTime: { name: 'EndTime', title: 'To' },
          resourceIdField: 'ResourceId'
        }
      },
      group: {
        resources: ['Resources']
      }
    }
  }
}
</script>
```

### Server-Side Implementation (C# ASP.NET Core):

```csharp
[HttpGet]
[EnableQuery]
[Route("api/VirtualEventData")]
public IActionResult GetData([FromQuery] VirtualEventParams param)
{
    IQueryable<EventData> query = dbContext.Events;
    
    // Filter by ResourceId if provided
    if (!string.IsNullOrEmpty(param.ResourceId))
    {
        string[] resourceIds = param.ResourceId.Split(',');
        query = query.Where(data => resourceIds.Contains(data.ResourceId.ToString()));
    }
    
    // Filter by date range if needed
    if (param.StartDate.HasValue)
    {
        query = query.Where(data => data.StartTime >= param.StartDate);
    }
    if (param.EndDate.HasValue)
    {
        query = query.Where(data => data.EndTime <= param.EndDate);
    }
    
    return Ok(query.ToList());
}

public class VirtualEventParams
{
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string ResourceId { get; set; }
}

public class EventData
{
    public int Id { get; set; }
    public string Subject { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public int ResourceId { get; set; }
    public string Location { get; set; }
    public string Description { get; set; }
}
```

**Lazy Loading Characteristics**:
- Fetches events on-demand as users scroll through resources
- Works only with resource grouping enabled
- Not supported in MonthAgenda, Year, and TimelineYear (Horizontal) views
- Significantly improves performance with thousands of events
- Reduces initial load time and memory usage

## Exporting

Export scheduler events to Excel (`.xlsx`, `.csv`) and ICS calendar files:

### Excel Export with Custom Fields:

```vue
<template>
  <button @click="exportToExcel">Export to Excel</button>
  
  <ejs-schedule ref="scheduleObj" :eventSettings="eventSettings">
  </ejs-schedule>
</template>

<script setup>
import { ref, provide } from "vue";
import { ExcelExport } from '@syncfusion/ej2-vue-schedule';

const scheduleObj = ref(null);

provide('schedule', [ExcelExport]);

const exportToExcel = () => {
  const exportOptions = {
    fileName: 'SchedulerEvents',
    fields: ['Id', 'Subject', 'StartTime', 'EndTime', 'Location'],
    fieldsInfo: [
      { name: 'Subject', text: 'Event Title' },
      { name: 'StartTime', text: 'Start Date' },
      { name: 'EndTime', text: 'End Date' },
      { name: 'Location', text: 'Venue' }
    ]
  };
  scheduleObj.value.exportToExcel(exportOptions);
};
</script>
```

### Export with Custom Data:

```vue
<script setup>
const exportCustomEvents = () => {
  const customData = [
    {
      Id: 1,
      Subject: 'Conference',
      StartTime: new Date(2024, 0, 15, 9, 0),
      EndTime: new Date(2024, 0, 15, 11, 0),
      Location: 'Hall A'
    },
    {
      Id: 2,
      Subject: 'Training',
      StartTime: new Date(2024, 0, 15, 14, 0),
      EndTime: new Date(2024, 0, 15, 16, 0),
      Location: 'Hall B'
    }
  ];
  
  const exportOptions = {
    customData: customData,
    fileName: 'CustomEvents'
  };
  
  scheduleObj.value.exportToExcel(exportOptions);
};
</script>
```

### CSV Export with Custom Separator:

```vue
<script setup>
const exportToCSV = () => {
  const exportOptions = {
    exportType: 'csv',
    fileName: 'events',
    separator: ';'  // Use semicolon instead of comma
  };
  
  scheduleObj.value.exportToExcel(exportOptions);
};
</script>
```

### ICS Calendar Export:

```vue
<template>
  <button @click="exportToICS">Export to ICS</button>
  
  <ejs-schedule ref="scheduleObj" :eventSettings="eventSettings">
  </ejs-schedule>
</template>

<script setup>
import { ref, provide } from "vue";
import { ICalendarExport } from '@syncfusion/ej2-vue-schedule';

const scheduleObj = ref(null);

provide('schedule', [ICalendarExport]);

const exportToICS = () => {
  // Export with default name 'Calendar.ics'
  scheduleObj.value.exportToICalendar();
  
  // OR export with custom name
  // scheduleObj.value.exportToICalendar('MySchedule');
};
</script>
```

### ICS Import:

```vue
<template>
  <input 
    type="file" 
    accept=".ics" 
    @change="handleFileSelect">
  
  <ejs-schedule ref="scheduleObj">
  </ejs-schedule>
</template>

<script setup>
import { ref, provide } from "vue";
import { ICalendarImport } from '@syncfusion/ej2-vue-schedule';

const scheduleObj = ref(null);

provide('schedule', [ICalendarImport]);

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    scheduleObj.value.importICalendar(file);
  }
};
</script>
```

### Customize Export Before Download:

```vue
<script setup>
const onExcelExport = (args) => {
  const worksheet = args.worksheets[0];
  
  // Add custom header
  worksheet.rows.unshift({
    index: 1,
    cells: [{
      index: 1,
      value: 'Event Schedule Report',
      colSpan: worksheet.columns.length,
      style: {
        bold: true,
        fontSize: 18,
        hAlign: 'Center',
        fill: { color: '#1E90FF' },
        color: '#FFFFFF'
      }
    }]
  });
  
  // Update row indices
  worksheet.rows.forEach((row, idx) => {
    row.index = idx + 1;
  });
};
</script>
```

**Export Options**:
- `.xlsx` format (default)
- `.csv` format with custom separator
- `.ics` calendar format (for compatibility with Google Calendar, Outlook)
- Custom fields selection
- Field name customization
- Include/exclude recurring event occurrences

## Printing

Print scheduler:

```vue
<script setup>
import { Print } from '@syncfusion/ej2-vue-schedule';

provide('schedule', [Print]);

const printScheduler = () => {
  scheduleObj.value.print();
};
</script>
```

## State Persistence

Save and restore scheduler state:

```vue
<template>
  <ejs-schedule 
    :enablePersistence="true"
    id="schedule">
  </ejs-schedule>
</template>
```

**Persisted State**:
- Current view
- Selected date
- Scroll position
- Resource selection

## Row Auto Height

Auto-adjust row height based on overlapping events. Works on Timeline views, Month view, and with resource grouping:

```vue
<template>
  <ejs-schedule 
    :rowAutoHeight="true"
    :eventSettings="eventSettings">
    <e-views>
      <e-view option="TimelineMonth"></e-view>
      <e-view option="TimelineWeek"></e-view>
      <e-view option="Month"></e-view>
    </e-views>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { ScheduleComponent as EjsSchedule, ViewDirective as EView, 
         ViewsDirective as EViews, TimelineMonth, TimelineViews, Month } from '@syncfusion/ej2-vue-schedule';
import { scheduleData } from './datasource.js';

const eventSettings = { dataSource: scheduleData };

provide('schedule', [TimelineMonth, TimelineViews, Month]);
</script>
```

### With Multiple Resources:

```vue
<template>
  <ejs-schedule 
    :rowAutoHeight="true"
    :group="group"
    :eventSettings="eventSettings">
    <e-views>
      <e-view option="TimelineWeek"></e-view>
    </e-views>
    <e-resources>
      <e-resource 
        field="ResourceId" 
        title="Room" 
        name="Rooms" 
        :dataSource="roomDataSource"
        textField="text" 
        idField="id">
      </e-resource>
    </e-resources>
  </ejs-schedule>
</template>

<script setup>
const group = {
  resources: ['Rooms']
};

const roomDataSource = [
  { id: 1, text: 'Room A' },
  { id: 2, text: 'Room B' },
  { id: 3, text: 'Room C' }
];
</script>
```

### Remove Whitespace in Auto-Height Rows:

```vue
<template>
  <ejs-schedule 
    :rowAutoHeight="true"
    :eventSettings="eventSettings">
  </ejs-schedule>
</template>

<script setup>
const eventSettings = {
  dataSource: scheduleData,
  ignoreWhitespace: true  // Appointments fill entire cell
};
</script>
```

**Features**:
- Dynamically expands row height for overlapping events
- Applicable to Timeline and Month views
- Works with resource grouping (each resource row expands independently)
- `ignoreWhitespace` property removes bottom padding when enabled
- Eliminates need for "+n more" indicators

## Event Template

Customize event appearance:

```vue
<template>
  <ejs-schedule :eventSettings="eventSettings">
    <template v-slot:eventTemplate="{ data }">
      <div class="custom-event">
        <div class="subject">{{ data.Subject }}</div>
        <div class="time">
          {{ formatTime(data.StartTime) }} - {{ formatTime(data.EndTime) }}
        </div>
        <div class="location" v-if="data.Location">
          <i class="e-icons e-location"></i> {{ data.Location }}
        </div>
      </div>
    </template>
  </ejs-schedule>
</template>

<script setup>
const formatTime = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};
</script>

<style>
.custom-event {
  padding: 5px;
}
.subject {
  font-weight: bold;
  margin-bottom: 3px;
}
.time {
  font-size: 12px;
  color: #666;
}
.location {
  font-size: 11px;
  margin-top: 3px;
}
</style>
```

## Quick Info Template

Customize quick info popup:

```vue
<template>
  <ejs-schedule :quickInfoTemplates="quickInfoTemplates">
  </ejs-schedule>
</template>

<script setup>
const quickInfoTemplates = {
  header: (props) => {
    return `<div>${props.Subject || 'New Event'}</div>`;
  },
  content: (props) => {
    return `<div>
      <div>Time: ${formatDateTime(props.StartTime)}</div>
      <div>Location: ${props.Location || 'N/A'}</div>
      <div>Description: ${props.Description || 'N/A'}</div>
    </div>`;
  },
  footer: (props) => {
    return `<button class="e-btn">More Details</button>`;
  }
};
</script>
```

## Block Time Slots

Mark time slots as unavailable:

```vue
<script setup>
const eventSettings = {
  dataSource: [
    {
      Id: 1,
      Subject: 'Lunch Break',
      StartTime: new Date(2024, 0, 15, 12, 0),
      EndTime: new Date(2024, 0, 15, 13, 0),
      IsBlock: true // Blocks this time slot
    }
  ]
};
</script>
```

**Blocked slots**:
- Display with different styling
- Prevent event creation
- Show as unavailable time

## Tooltip

Show tooltip on hover:

```vue
<template>
  <ejs-schedule 
    :eventRendered="onEventRendered">
  </ejs-schedule>
</template>

<script setup>
import { Tooltip } from '@syncfusion/ej2-popups';

const onEventRendered = (args) => {
  const tooltip = new Tooltip({
    content: `${args.data.Subject}<br>
              ${formatDateTime(args.data.StartTime)} - ${formatDateTime(args.data.EndTime)}<br>
              ${args.data.Location || ''}`,
    target: args.element
  });
  tooltip.appendTo(args.element);
};
</script>
```

## Inline Editing

Enable quick inline editing:

```vue
<template>
  <ejs-schedule 
    :allowInline="true"
    :eventClick="onEventClick">
  </ejs-schedule>
</template>

<script setup>
const onEventClick = (args) => {
  // Enable inline editing by selecting event
  args.element.focus();
};
</script>
```

## Responsive Design

Scheduler adapts automatically to screen size. For custom responsive behavior:

```vue
<template>
  <ejs-schedule 
    :enableAdaptiveUI="true">
  </ejs-schedule>
</template>
```

**Mobile Features**:
- Touch-friendly interface
- Swipe navigation
- Optimized popups
- Compact view toggle

