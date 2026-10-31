# Resources and Grouping

## Table of Contents
- [Overview](#overview)
- [Resource Fields](#resource-fields)
- [Resource Data Binding](#resource-data-binding)
- [Single Resource](#single-resource)
- [Multiple Resources](#multiple-resources)
- [Resource Grouping](#resource-grouping)
- [Hierarchical Resources](#hierarchical-resources)

## Overview

Resources enable scheduling for multiple entities (people, rooms, equipment) in the Scheduler. Appointments can be assigned to one or more resources, and the scheduler displays appointments organized by resource columns or rows.

**Key Features:**
- Multiple resource assignment to appointments
- Hierarchical resource grouping
- Resource-based color coding
- Custom working hours per resource
- Resource templates for customization
- Local and remote data binding

## Resource Fields

Configure resources using these properties:

| Field | Type | Description |
|-------|------|-------------|
| `field` | string | Event object field name that binds to resource |
| `title` | string | Resource field title in event editor |
| `name` | string | Unique resource identifier for grouping |
| `allowMultiple` | boolean | Allow multiple resource selection per event |
| `dataSource` | array/DataManager | Resource data (local array or remote) |
| `query` | Query | Query to filter resources from dataSource |
| `idField` | string | Field name for resource ID |
| `textField` | string | Field name for resource display text |
| `groupIDField` | string | Field name for parent resource ID (hierarchy) |
| `colorField` | string | Field name for resource color |
| `startHourField` | string | Field name for resource-specific start hour |
| `endHourField` | string | Field name for resource-specific end hour |
| `workDaysField` | string | Field name for resource-specific work days |
| `cssClassField` | string | Field name for custom CSS class |
| `expandedField` | string | Field name for expanded/collapsed state (Timeline) |

## Resource Data Binding

### Local JSON Data

Bind local resource data:

```vue
<template>
  <ejs-schedule :eventSettings="eventSettings">
    <e-resources>
      <e-resource 
        field="OwnerId" 
        title="Owner" 
        name="Owners"
        :dataSource="resourceData"
        textField="OwnerText"
        idField="Id"
        colorField="OwnerColor">
      </e-resource>
    </e-resources>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { Week, Month, TimelineViews } from '@syncfusion/ej2-vue-schedule';

const resourceData = [
  { Id: 1, OwnerText: 'Nancy', OwnerColor: '#ffaa00' },
  { Id: 2, OwnerText: 'Steven', OwnerColor: '#f8a398' },
  { Id: 3, OwnerText: 'Michael', OwnerColor: '#7499e1' }
];

const eventSettings = {
  dataSource: [
    {
      Id: 1,
      Subject: 'Meeting',
      StartTime: new Date(2024, 0, 15, 10, 0),
      EndTime: new Date(2024, 0, 15, 11, 0),
      OwnerId: 1 // Assigned to Nancy
    }
  ]
};

provide('schedule', [Week, Month, TimelineViews]);
</script>
```

### Remote Data

Fetch resources from a remote endpoint:

```vue
<script setup>
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

const resourceDataSource = new DataManager({
  url: 'url',
  adaptor: new UrlAdaptor(),
  crossDomain: true
});
</script>
```

## Single Resource

Display scheduler with one resource type:

```vue
<template>
  <ejs-schedule 
    :eventSettings="eventSettings"
    :selectedDate="selectedDate">
    <e-views>
      <e-view option="Week"></e-view>
      <e-view option="Month"></e-view>
      <e-view option="TimelineWeek"></e-view>
    </e-views>
    <e-resources>
      <e-resource 
        field="RoomId" 
        title="Room" 
        name="Rooms"
        :dataSource="roomData"
        textField="RoomText"
        idField="Id"
        colorField="RoomColor">
      </e-resource>
    </e-resources>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { Week, Month, TimelineViews } from '@syncfusion/ej2-vue-schedule';

const selectedDate = new Date(2024, 0, 15);

const roomData = [
  { Id: 1, RoomText: 'Conference Room A', RoomColor: '#cb6bb2' },
  { Id: 2, RoomText: 'Conference Room B', RoomColor: '#56ca85' },
  { Id: 3, RoomText: 'Meeting Room', RoomColor: '#df5286' }
];

const eventSettings = {
  dataSource: [
    {
      Id: 1,
      Subject: 'Board Meeting',
      StartTime: new Date(2024, 0, 15, 9, 0),
      EndTime: new Date(2024, 0, 15, 11, 0),
      RoomId: 1
    }
  ]
};

const group = {
  resources: ['Rooms']
};

provide('schedule', [Week, Month, TimelineViews]);
</script>
```

## Multiple Resources

### Without Grouping

Allow selecting multiple resources without visual grouping:

```vue
<template>
  <ejs-schedule :eventSettings="eventSettings">
    <e-resources>
      <e-resource 
        field="OwnerId" 
        title="Owner" 
        name="Owners"
        :allowMultiple="true"
        :dataSource="ownerData"
        textField="OwnerText"
        idField="Id"
        colorField="OwnerColor">
      </e-resource>
    </e-resources>
  </ejs-schedule>
</template>

<script setup>
const ownerData = [
  { Id: 1, OwnerText: 'Nancy', OwnerColor: '#ffaa00' },
  { Id: 2, OwnerText: 'Steven', OwnerColor: '#f8a398' },
  { Id: 3, OwnerText: 'Michael', OwnerColor: '#7499e1' }
];

const eventSettings = {
  dataSource: [
    {
      Id: 1,
      Subject: 'Team Meeting',
      StartTime: new Date(2024, 0, 15, 10, 0),
      EndTime: new Date(2024, 0, 15, 11, 0),
      OwnerId: [1, 2] // Multiple resources assigned
    }
  ]
};
</script>
```

## Resource Grouping

Group scheduler by resources to show separate columns/rows:

```vue
<template>
  <ejs-schedule 
    :eventSettings="eventSettings"
    :group="group">
    <e-views>
      <e-view option="Week"></e-view>
      <e-view option="Month"></e-view>
      <e-view option="TimelineWeek"></e-view>
    </e-views>
    <e-resources>
      <e-resource 
        field="OwnerId" 
        title="Owner" 
        name="Owners"
        :dataSource="ownerData"
        textField="OwnerText"
        idField="Id"
        colorField="OwnerColor">
      </e-resource>
    </e-resources>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { Week, Month, TimelineViews } from '@syncfusion/ej2-vue-schedule';

const ownerData = [
  { Id: 1, OwnerText: 'Nancy', OwnerColor: '#ffaa00' },
  { Id: 2, OwnerText: 'Steven', OwnerColor: '#f8a398' },
  { Id: 3, OwnerText: 'Michael', OwnerColor: '#7499e1' }
];

const group = {
  resources: ['Owners'] // Enable grouping
};

const eventSettings = {
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

provide('schedule', [Week, Month, TimelineViews]);
</script>
```

### Grouping Options

Configure group behavior:

```vue
<script setup>
const group = {
  resources: ['Owners'],
  byDate: false, // false = group by resource, true = group by date
  allowGroupEdit: true, // Allow editing events across resource groups
  enableCompactView: false // Compact view for mobile
};
</script>
```

**byDate Property:**
- `false` (default): Resources in columns, dates in rows
- `true`: Dates in columns, resources in rows

## Hierarchical Resources

Create multi-level resource hierarchy:

```vue
<template>
  <ejs-schedule 
    :eventSettings="eventSettings"
    :group="group">
    <e-views>
      <e-view option="TimelineWeek"></e-view>
    </e-views>
    <e-resources>
      <!-- Level 1: Departments -->
      <e-resource 
        field="DepartmentId" 
        title="Department" 
        name="Departments"
        :dataSource="departmentData"
        textField="Text"
        idField="Id"
        colorField="Color">
      </e-resource>
      
      <!-- Level 2: Employees (child of Departments) -->
      <e-resource 
        field="EmployeeId" 
        title="Employee" 
        name="Employees"
        :dataSource="employeeData"
        textField="Text"
        idField="Id"
        groupIDField="GroupId"
        colorField="Color">
      </e-resource>
    </e-resources>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { TimelineViews } from '@syncfusion/ej2-vue-schedule';

const departmentData = [
  { Id: 1, Text: 'Engineering', Color: '#bbdc00' },
  { Id: 2, Text: 'Sales', Color: '#9e5fff' }
];

const employeeData = [
  { Id: 1, Text: 'Nancy', GroupId: 1, Color: '#ffaa00' },
  { Id: 2, Text: 'Steven', GroupId: 1, Color: '#f8a398' },
  { Id: 3, Text: 'Michael', GroupId: 2, Color: '#7499e1' },
  { Id: 4, Text: 'Janet', GroupId: 2, Color: '#df5286' }
];

const group = {
  resources: ['Departments', 'Employees'] // Hierarchical order
};

const eventSettings = {
  dataSource: [
    {
      Id: 1,
      Subject: 'Sprint Planning',
      StartTime: new Date(2024, 0, 15, 10, 0),
      EndTime: new Date(2024, 0, 15, 11, 0),
      DepartmentId: 1,
      EmployeeId: 1
    }
  ]
};

provide('schedule', [TimelineViews]);
</script>
```

## Resource Grouping Implementation

### Vertical Resource View (Calendar Views)

Display resources with vertical hierarchy in Week/Month views:

```vue
<template>
  <ejs-schedule 
    :eventSettings="eventSettings"
    :group="group">
    <e-views>
      <e-view option="Week"></e-view>
      <e-view option="Month"></e-view>
    </e-views>
    <e-resources>
      <e-resource 
        field="ProjectId" 
        title="Project" 
        name="Projects"
        :dataSource="projectData"
        textField="Text"
        idField="Id"
        colorField="Color">
      </e-resource>
      <e-resource 
        field="EmployeeId" 
        title="Employee" 
        name="Employees"
        :dataSource="employeeData"
        textField="Text"
        idField="Id"
        colorField="Color">
      </e-resource>
    </e-resources>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { Week, Month, Agenda } from '@syncfusion/ej2-vue-schedule';

const projectData = [
  { Id: 1, Text: 'Project Alpha', Color: '#cb6bb2' },
  { Id: 2, Text: 'Project Beta', Color: '#56ca85' }
];

const employeeData = [
  { Id: 1, Text: 'Nancy', Color: '#ffaa00' },
  { Id: 2, Text: 'Steven', Color: '#f8a398' },
  { Id: 3, Text: 'Michael', Color: '#7499e1' }
];

const group = {
  resources: ['Projects', 'Employees'],
  byGroupID: true // Default: resources grouped by their GroupId field
};

const eventSettings = { dataSource: [] };

provide('schedule', [Week, Month, Agenda]);
</script>
```

### Timeline Resource View

Display resources in expandable/collapsible groups in Timeline views:

```vue
<template>
  <ejs-schedule 
    :eventSettings="eventSettings"
    :group="group">
    <e-views>
      <e-view option="TimelineWeek"></e-view>
      <e-view option="TimelineMonth"></e-view>
    </e-views>
    <e-resources>
      <e-resource 
        field="RoomId" 
        title="Room" 
        name="Rooms"
        :dataSource="roomData"
        textField="RoomText"
        idField="Id"
        colorField="RoomColor">
      </e-resource>
      <e-resource 
        field="OwnerId" 
        title="Owner" 
        name="Owners"
        :allowMultiple="true"
        :dataSource="ownerData"
        textField="OwnerText"
        idField="Id"
        groupIDField="OwnerGroupId"
        colorField="OwnerColor">
      </e-resource>
    </e-resources>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { TimelineViews, TimelineMonth } from '@syncfusion/ej2-vue-schedule';

const roomData = [
  { RoomText: 'ROOM 1', Id: 1, RoomColor: '#cb6bb2' },
  { RoomText: 'ROOM 2', Id: 2, RoomColor: '#56ca85' }
];

const ownerData = [
  { OwnerText: 'Nancy', Id: 1, OwnerGroupId: 1, OwnerColor: '#ffaa00' },
  { OwnerText: 'Steven', Id: 2, OwnerGroupId: 2, OwnerColor: '#f8a398' },
  { OwnerText: 'Michael', Id: 3, OwnerGroupId: 1, OwnerColor: '#7499e1' }
];

const group = {
  resources: ['Rooms', 'Owners']
};

const eventSettings = { dataSource: [] };

provide('schedule', [TimelineViews, TimelineMonth]);
</script>
```

### Single-Level Resource Grouping

Group scheduler by a single resource type:

```vue
<template>
  <ejs-schedule 
    :eventSettings="eventSettings"
    :group="group">
    <e-views>
      <e-view option="TimelineWeek"></e-view>
      <e-view option="Month"></e-view>
    </e-views>
    <e-resources>
      <e-resource 
        field="OwnerId" 
        title="Owner" 
        name="Owners"
        :allowMultiple="true"
        :dataSource="ownerData"
        textField="OwnerText"
        idField="Id"
        colorField="OwnerColor">
      </e-resource>
    </e-resources>
  </ejs-schedule>
</template>

<script setup>
const group = {
  resources: ['Owners'] // Single resource type
};

const ownerData = [
  { OwnerText: 'Nancy', Id: 1, OwnerColor: '#ffaa00' },
  { OwnerText: 'Steven', Id: 2, OwnerColor: '#f8a398' },
  { OwnerText: 'Michael', Id: 3, OwnerColor: '#7499e1' }
];
</script>
```

### Multi-Level Resource Grouping

Create hierarchical grouping with multiple levels:

```vue
<script setup>
const group = {
  resources: ['Rooms', 'Owners'] // Parent -> Child hierarchy
};
</script>
```

### Grouping by Date

Group resources under dates instead of dates under resources:

```vue
<template>
  <ejs-schedule 
    :eventSettings="eventSettings"
    :group="group">
    <e-views>
      <e-view option="Week"></e-view>
      <e-view option="Month"></e-view>
      <e-view option="Agenda"></e-view>
    </e-views>
    <e-resources>
      <e-resource 
        field="OwnerId" 
        title="Owner" 
        name="Owners"
        :allowMultiple="true"
        :dataSource="ownerData"
        textField="Text"
        idField="Id"
        colorField="Color">
      </e-resource>
    </e-resources>
  </ejs-schedule>
</template>

<script setup>
const group = {
  byDate: true, // Resources grouped by date (calendar views only)
  resources: ['Owners']
};

const ownerData = [
  { Text: 'Alice', Id: 1, Color: '#1aaa55' },
  { Text: 'Smith', Id: 2, Color: '#7fa900' }
];
</script>
```

**Note:** `byDate` is only applicable to calendar views (Week, Month, Agenda), not timeline views.

### One-to-One Resource Grouping

Group all child resources with each parent resource (byGroupID: false):

```vue
<template>
  <ejs-schedule 
    :eventSettings="eventSettings"
    :group="group">
    <e-views>
      <e-view option="TimelineWeek"></e-view>
      <e-view option="Week"></e-view>
    </e-views>
    <e-resources>
      <e-resource 
        field="RoomId" 
        title="Room" 
        name="Rooms"
        :dataSource="roomData"
        textField="RoomText"
        idField="Id"
        colorField="RoomColor">
      </e-resource>
      <e-resource 
        field="OwnerId" 
        title="Owner" 
        name="Owners"
        :allowMultiple="true"
        :dataSource="ownerData"
        textField="OwnerText"
        idField="Id"
        groupIDField="OwnerGroupId"
        colorField="OwnerColor">
      </e-resource>
    </e-resources>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { TimelineViews, Week } from '@syncfusion/ej2-vue-schedule';

const group = {
  byGroupID: false, // All children assigned to each parent one-to-one
  resources: ['Rooms', 'Owners']
};

const roomData = [
  { RoomText: 'ROOM 1', Id: 1, RoomColor: '#cb6bb2' },
  { RoomText: 'ROOM 2', Id: 2, RoomColor: '#56ca85' }
];

const ownerData = [
  { OwnerText: 'Nancy', Id: 1, OwnerGroupId: 1, OwnerColor: '#ffaa00' },
  { OwnerText: 'Steven', Id: 2, OwnerGroupId: 2, OwnerColor: '#f8a398' },
  { OwnerText: 'Michael', Id: 3, OwnerGroupId: 1, OwnerColor: '#7499e1' }
];

provide('schedule', [TimelineViews, Week]);
</script>
```

**byGroupID Property:**
- `true` (default): Child resources grouped by their `groupIDField` value
- `false`: All child resources assigned to each parent resource one-to-one

## Shared Events Across Resources

Enable `allowGroupEdit` to share event instances across multiple resources:

```vue
<template>
  <ejs-schedule 
    :eventSettings="eventSettings"
    :group="group">
    <e-views>
      <e-view option="Week"></e-view>
      <e-view option="TimelineWeek"></e-view>
    </e-views>
    <e-resources>
      <e-resource 
        field="ConferenceId" 
        title="Conference" 
        name="Conferences"
        :allowMultiple="true"
        :dataSource="conferenceData"
        textField="Text"
        idField="Id"
        colorField="Color">
      </e-resource>
    </e-resources>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { Week, TimelineViews } from '@syncfusion/ej2-vue-schedule';

const group = {
  allowGroupEdit: true, // Edit affects all resource instances
  resources: ['Conferences']
};

const conferenceData = [
  { Text: 'Margaret', Id: 1, Color: '#1aaa55' },
  { Text: 'Robert', Id: 2, Color: '#357cd2' },
  { Text: 'Laura', Id: 3, Color: '#7fa900' }
];

const eventSettings = {
  dataSource: [
    {
      Id: 1,
      Subject: 'Annual Meet',
      StartTime: new Date(2024, 0, 15, 10, 0),
      EndTime: new Date(2024, 0, 15, 12, 0),
      ConferenceId: [1, 2, 3] // Shared by all conferences
    }
  ]
};

provide('schedule', [Week, TimelineViews]);
</script>
```

**With allowGroupEdit enabled:**
- Event object maintains single instance with array of resource IDs
- Edit/delete on any resource instance reflects across all resources
- Appointments show under all assigned resources with consistent data
