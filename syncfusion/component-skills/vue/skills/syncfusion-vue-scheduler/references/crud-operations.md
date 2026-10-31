# CRUD Operations

## Table of Contents
- [Add Events](#add-events)
  - [Via Editor](#via-editor)
  - [Via addEvent Method](#via-addevent-method)
  - [Add Multiple Events](#add-multiple-events)
- [Edit Events](#edit-events)
  - [Via Editor](#via-editor-1)
  - [Via saveEvent Method](#via-saveevent-method)
- [Delete Events](#delete-events)
  - [Via deleteEvent Method](#via-deleteevent-method)
- [Drag and Drop](#drag-and-drop)
- [Resize Events](#resize-events)
- [Event Handling](#event-handling)

## Add Events

### Via Editor

Double-click cells to open editor in add mode.

### Via addEvent Method

```vue
<template>
  <ejs-schedule ref="scheduleObj">
  </ejs-schedule>
  <button @click="addNewEvent">Add Event</button>
</template>

<script setup>
import { ref } from "vue";

const scheduleObj = ref(null);

const addNewEvent = () => {
  const newEvent = {
    Subject: 'New Meeting',
    StartTime: new Date(2024, 0, 15, 10, 0),
    EndTime: new Date(2024, 0, 15, 11, 0),
    Location: 'Conference Room'
  };
  scheduleObj.value.addEvent(newEvent);
};
</script>
```

### Add Multiple Events

```vue
<script setup>
const addMultipleEvents = () => {
  const events = [
    {
      Subject: 'Meeting 1',
      StartTime: new Date(2024, 0, 15, 10, 0),
      EndTime: new Date(2024, 0, 15, 11, 0)
    },
    {
      Subject: 'Meeting 2',
      StartTime: new Date(2024, 0, 16, 14, 0),
      EndTime: new Date(2024, 0, 16, 15, 0)
    }
  ];
  scheduleObj.value.addEvent(events);
};
</script>
```

## Edit Events

### Via Editor

Double-click events to open editor in edit mode.

### Via saveEvent Method

```vue
<script setup>
const editEvent = () => {
  const updatedEvent = {
    Id: 1,
    Subject: 'Updated Meeting',
    StartTime: new Date(2024, 0, 15, 11, 0),
    EndTime: new Date(2024, 0, 15, 12, 0)
  };
  scheduleObj.value.saveEvent(updatedEvent);
};
</script>
```

## Delete Events

### Via deleteEvent Method

```vue
<script setup>
const deleteEvent = () => {
  const eventId = 1;
  scheduleObj.value.deleteEvent(eventId);
};

// Delete by event object
const deleteEventByObject = () => {
  const event = {
    Id: 1,
    Subject: 'Meeting',
    StartTime: new Date(2024, 0, 15, 10, 0),
    EndTime: new Date(2024, 0, 15, 11, 0)
  };
  scheduleObj.value.deleteEvent(event);
};

// Delete multiple events
const deleteMultipleEvents = () => {
  const eventIds = [1, 2, 3];
  scheduleObj.value.deleteEvent(eventIds);
};
</script>
```

## Drag and Drop

Enable drag-and-drop for events:

```vue
<template>
  <ejs-schedule 
    :allowDragAndDrop="true"
    :dragStart="onDragStart"
    :dragStop="onDragStop">
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { DragAndDrop } from '@syncfusion/ej2-vue-schedule';

provide('schedule', [DragAndDrop]);

const onDragStart = (args) => {
  console.log('Drag started:', args.data);
  // Cancel drag if needed
  // args.cancel = true;
};

const onDragStop = (args) => {
  console.log('Drag stopped:', args.data);
  // Modify event before saving
  args.data.Location = 'Updated Location';
};
</script>
```

## Resize Events

Enable resizing:

```vue
<template>
  <ejs-schedule 
    :allowResizing="true"
    :resizeStart="onResizeStart"
    :resizeStop="onResizeStop">
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { Resize } from '@syncfusion/ej2-vue-schedule';

provide('schedule', [Resize]);

const onResizeStart = (args) => {
  console.log('Resize started:', args.data);
};

const onResizeStop = (args) => {
  console.log('Resize stopped:', args.data);
};
</script>
```

## Event Handling

### actionBegin Event

Intercept CRUD operations before they execute:

```vue
<template>
  <ejs-schedule :actionBegin="onActionBegin">
  </ejs-schedule>
</template>

<script setup>
const onActionBegin = (args) => {
  // Event creation
  if (args.requestType === 'eventCreate') {
    console.log('Creating event:', args.addedRecords);
    // Cancel creation
    // args.cancel = true;
  }
  
  // Event update
  if (args.requestType === 'eventChange') {
    console.log('Updating event:', args.changedRecords);
  }
  
  // Event deletion
  if (args.requestType === 'eventRemove') {
    console.log('Deleting event:', args.deletedRecords);
  }
};
</script>
```

### actionComplete Event

Handle post-CRUD operations:

```vue
<script setup>
const onActionComplete = (args) => {
  if (args.requestType === 'eventCreated') {
    console.log('Event created successfully');
  }
  
  if (args.requestType === 'eventChanged') {
    console.log('Event updated successfully');
  }
  
  if (args.requestType === 'eventRemoved') {
    console.log('Event deleted successfully');
  }
};
</script>
```

### actionFailure Event

Handle errors:

```vue
<script setup>
const onActionFailure = (args) => {
  console.error('Operation failed:', args.error);
  alert('Failed to save changes. Please try again.');
};
</script>
```

## Readonly Mode

Disable all CRUD operations:

```vue
<template>
  <ejs-schedule :readonly="true">
  </ejs-schedule>
</template>
```

Disable specific events from editing:

```vue
<script setup>
const eventSettings = {
  dataSource: [
    {
      Id: 1,
      Subject: 'Readonly Event',
      StartTime: new Date(2024, 0, 15, 10, 0),
      EndTime: new Date(2024, 0, 15, 11, 0),
      IsReadonly: true // This event cannot be edited
    }
  ]
};
</script>
```

## Validation

Prevent invalid operations:

```vue
<script setup>
const onActionBegin = (args) => {
  if (args.requestType === 'eventCreate') {
    const event = args.addedRecords[0];
    
    // Validate time range
    if (event.EndTime <= event.StartTime) {
      args.cancel = true;
      alert('End time must be after start time');
      return;
    }
    
    // Validate required fields
    if (!event.Subject || event.Subject.trim() === '') {
      args.cancel = true;
      alert('Subject is required');
      return;
    }
    
    // Check for overlaps
    if (!scheduleObj.value.isSlotAvailable(event.StartTime, event.EndTime)) {
      args.cancel = true;
      alert('Time slot is already occupied');
    }
  }
};
</script>
```

## Best Practices

1. **Validate before saving** - Use `actionBegin` to validate data
2. **Handle errors gracefully** - Implement `actionFailure` event
3. **Provide feedback** - Show success/error messages to users
4. **Enable appropriate modules** - Import DragAndDrop, Resize as needed
5. **Prevent conflicts** - Use `isSlotAvailable` to check overlaps
6. **Test CRUD workflows** - Verify add, edit, delete operations work correctly
7. **Implement undo/redo** - Consider adding undo functionality for better UX
