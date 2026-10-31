# Appointment Behavior and Validation

## Table of Contents
- [Setting Minimum Height](#setting-minimum-height)
- [Block Dates and Times](#block-dates-and-times)
- [Readonly Appointments](#readonly)
- [Make Specific Events Readonly](#make-specific-events-readonly)
- [Restricting Event Creation](#restricting-event-creation-on-specific-time-slots)
- [Differentiate Past Events](#differentiate-the-past-time-events)
- [Appointments Occupying Entire Cell](#appointments-occupying-entire-cell)
- [Limit Maximum Events](#how-to-limit-maximum-number-of-events-to-display)
- [Display Tooltip](#display-tooltip-for-appointments)
- [Appointment Filtering](#appointment-filtering)
- [Appointment Selection](#appointment-selection-and-deleting-multiple-appointments)
- [Preventing Overlaps](#preventing-overlaps)
  - [Custom Overlap Validation](#custom-overlap-validation)
- [Recurrence Validation](#recurrence-validation)

## Setting Minimum Height

Use `eventRendered` to calculate and set a minimum appointment height when duration is shorter than a slot.

```js
const onEventRendered = function (args) {
  const schedule = scheduleObj.value.ej2Instances;
  if (schedule.currentView !== 'Month') {
    const cellHeight = schedule.element.querySelector('.e-work-cells').offsetHeight;
    const appHeight = (args.data.EndTime - args.data.StartTime) / (60 * 1000) * (cellHeight * schedule.timeScale.slotCount) / schedule.timeScale.interval;
    args.element.style.height = appHeight + 'px';
  }
}
```

## Block Dates and Times

Define blocked time slots by creating events with `IsBlock: true`. Block events prevent creation in those ranges and can also be recurring.

**Vue 3:**
```vue
<script setup>
const blockEvent = {
  Subject: 'Blocked',
  StartTime: new Date(2024, 0, 15, 14, 0),
  EndTime: new Date(2024, 0, 15, 15, 30),
  IsBlock: true
};
</script>
```

**Vue 2:**
```js
data() {
  return {
    blockEvent: {
      Subject: 'Blocked',
      StartTime: new Date(2024, 0, 15, 14, 0),
      EndTime: new Date(2024, 0, 15, 15, 30),
      IsBlock: true
    }
  };
}
```

**Add block event to schedule:**
```vue
<script setup>
const scheduleObj = ref(null);

const addBlockEvent = () => {
  scheduleObj.value.ej2Instances.addEvent(blockEvent);
};
</script>
```

## Readonly

Set `readonly=true` on the Scheduler to prevent any CRUD operations.

**Vue 3:**
```vue
<template>
  <ejs-schedule 
    :readonly="true" 
    :eventSettings="eventSettings">
  </ejs-schedule>
</template>

<script setup>
const eventSettings = { dataSource: appointmentData };
</script>
```

**Vue 2:**
```vue
<template>
  <ejs-schedule 
    readonly="true" 
    :eventSettings="eventSettings">
  </ejs-schedule>
</template>

<script>
export default {
  data() {
    return {
      eventSettings: { dataSource: appointmentData }
    };
  }
}
</script>
```

## Make Specific Events Readonly

Set `isReadonly` on individual events to prevent editing for those items.

**Vue 3:**
```vue
<script setup>
const readonlyEvent = {
  Id: 1,
  Subject: 'Past Meeting',
  StartTime: new Date(2024, 0, 15, 10, 0),
  EndTime: new Date(2024, 0, 15, 11, 0),
  IsReadonly: true
};
</script>
```

**Vue 2:**
```js
data() {
  return {
    readonlyEvent: {
      Id: 1,
      Subject: 'Past Meeting',
      StartTime: new Date(2024, 0, 15, 10, 0),
      EndTime: new Date(2024, 0, 15, 11, 0),
      IsReadonly: true
    }
  };
}
```

## Restricting Event Creation on Specific Time Slots

Use the `isSlotAvailable` method inside `actionBegin` to prevent creating events on occupied slots.

**Vue 3 (Composition API):**
```vue
<template>
  <ejs-schedule 
    ref="scheduleObj"
    :actionBegin="onActionBegin"
    :eventSettings="eventSettings">
  </ejs-schedule>
</template>

<script setup>
import { ref } from 'vue';

const scheduleObj = ref(null);

const onActionBegin = (args) => {
  if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
    const schedule = scheduleObj.value.ej2Instances;
    const start = args.data[0][schedule.eventFields.startTime];
    const end = args.data[0][schedule.eventFields.endTime];
    // Cancel if slot is not available
    args.cancel = !schedule.isSlotAvailable(start, end);
  }
};
</script>
```

**Vue 2 (Options API):**
```vue
<script>
export default {
  methods: {
    onActionBegin(args) {
      if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
        const schedule = this.$refs.scheduleObj.ej2Instances;
        const start = args.data[0][schedule.eventFields.startTime];
        const end = args.data[0][schedule.eventFields.endTime];
        args.cancel = !schedule.isSlotAvailable(start, end);
      }
    }
  }
}
</script>
```

## Differentiate the Past Time Events

Use `eventRendered` to add classes/style for past events.

**Vue 3:**
```vue
<template>
  <ejs-schedule 
    ref="scheduleObj"
    :eventRendered="onEventRendered"
    :eventSettings="eventSettings">
  </ejs-schedule>
</template>

<script setup>
import { ref } from 'vue';

const scheduleObj = ref(null);

const onEventRendered = (args) => {
  const schedule = scheduleObj.value.ej2Instances;
  if (args.data.EndTime < schedule.selectedDate) {
    args.element.classList.add('e-past-app');
  }
};
</script>

<style>
.e-schedule .e-past-app {
  background-color: #f0f0f0;
  opacity: 0.6;
}
</style>
```

**Vue 2:**
```vue
<script>
export default {
  methods: {
    onEventRendered(args) {
      if (args.data.EndTime < this.$refs.scheduleObj.ej2Instances.selectedDate) {
        args.element.classList.add('e-past-app');
      }
    }
  }
}
</script>

<style>
.e-schedule .e-past-app {
  background-color: #f0f0f0;
  opacity: 0.6;
}
</style>
```

## Appointments Occupying Entire Cell

Enable `enableMaxHeight` in `eventSettings` to let events occupy full cell height. Use `enableIndicator` to show `+n` indicators when many events exist.

**Vue 3:**
```vue
<template>
  <ejs-schedule :eventSettings="eventSettings"></ejs-schedule>
</template>

<script setup>
const eventSettings = {
  dataSource: appointmentData,
  enableMaxHeight: true,
  enableIndicator: false
};
</script>
```

**Vue 2:**
```vue
<script>
export default {
  data() {
    return {
      eventSettings: {
        dataSource: appointmentData,
        enableMaxHeight: true,
        enableIndicator: false
      }
    };
  }
}
</script>
```

## How to Limit Maximum Number of Events to Display

Use `maxEventsPerRow` on view directives (Month/TimelineMonth/TimelineYear) or as part of `views` to constrain events shown per row.

**Vue 3:**
```vue
<template>
  <ejs-schedule :views="views"></ejs-schedule>
</template>

<script setup>
import { Month } from '@syncfusion/ej2-vue-schedule';

const views = [
  {
    option: 'Month',
    maxEventsPerRow: 3
  }
];
</script>
```

**Vue 2:**
```js
data() {
  return {
    views: [
      {
        option: 'Month',
        maxEventsPerRow: 3
      }
    ]
  };
}
```

## Display Tooltip for Appointments

Enable `enableTooltip` in `eventSettings` and supply a `tooltipTemplate` to customize content. Use `tooltipOpen` to cancel tooltips conditionally.

**Vue 3:**
```vue
<template>
  <ejs-schedule 
    :eventSettings="eventSettings"
    :tooltipOpen="onTooltipOpen">
  </ejs-schedule>
</template>

<script setup>
const eventSettings = {
  enableTooltip: true,
  tooltipTemplate: '#tooltipTemplate'
};

const onTooltipOpen = (args) => {
  if (args.data.Subject === 'Vacation') {
    args.cancel = true;
  }
};
</script>

<template id="tooltipTemplate">
  <div class='e-tooltip-header'>{{ data.Subject }}</div>
  <div class='e-tooltip-content'>
    <div>{{ data.StartTime | dateFormat }}</div>
    <div>{{ data.EndTime | dateFormat }}</div>
  </div>
</template>
```

**Vue 2:**
```vue
<script>
export default {
  data() {
    return {
      eventSettings: {
        enableTooltip: true,
        tooltipTemplate: '#tooltipTemplate'
      }
    };
  },
  methods: {
    onTooltipOpen(args) {
      if (args.data.Subject === 'Vacation') {
        args.cancel = true;
      }
    }
  }
}
</script>
```

## Appointment Filtering

Use `eventSettings.query` with `Query`/`Predicate` to filter displayed appointments. UI controls (checkboxes) can toggle predicates and update `eventSettings.query`.

**Vue 3 - Filter by Status:**
```vue
<template>
  <div>
    <input 
      type="checkbox" 
      v-model="filterConfirmed"
      @change="updateFilter"
    > Show Confirmed Only
    <ejs-schedule :eventSettings="eventSettings"></ejs-schedule>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { Query, Predicate, DataManager } from '@syncfusion/ej2-data';

const filterConfirmed = ref(false);
const eventSettings = reactive({
  dataSource: appointmentData,
  query: new Query()
});

const updateFilter = () => {
  if (filterConfirmed.value) {
    eventSettings.query = new Query().where('Status', 'equal', 'Confirmed');
  } else {
    eventSettings.query = new Query();
  }
};
</script>
```

**Vue 2 - Filter by Priority:**
```vue
<script>
import { Query, Predicate } from '@syncfusion/ej2-data';

export default {
  data() {
    return {
      filterHighPriority: false,
      eventSettings: {
        dataSource: appointmentData,
        query: new Query()
      }
    };
  },
  methods: {
    updateFilter() {
      if (this.filterHighPriority) {
        this.eventSettings.query = new Query()
          .where('Priority', 'equal', 'High');
      } else {
        this.eventSettings.query = new Query();
      }
    }
  }
}
</script>
```

## Appointment Selection and Deleting Multiple Appointments

Appointments support single and multi selection (Ctrl+click). Delete multiple selected appointments by listening for delete key and calling `deleteEvent` for selected items.

**Vue 3:**
```vue
<template>
  <ejs-schedule 
    ref="scheduleObj"
    @keyDown="onKeyDown"
    :eventSettings="eventSettings">
  </ejs-schedule>
</template>

<script setup>
import { ref } from 'vue';

const scheduleObj = ref(null);

const onKeyDown = (args) => {
  if (args.key === 'Delete') {
    const selected = scheduleObj.value.ej2Instances.getSelectedEvents();
    selected.forEach(event => {
      scheduleObj.value.ej2Instances.deleteEvent(event);
    });
  }
};
</script>
```

## Preventing Overlaps

Prevent overlapping events on the same time slot:

```vue
<template>
  <ejs-schedule 
    :allowOverlap="false"
    :eventSettings="eventSettings"
    :popupOpen="onPopupOpen">
  </ejs-schedule>
</template>

<script setup>
const onPopupOpen = (args) => {
  if (args.type === 'OverlapAlert') {
    console.log('Overlapping events:', args.overlapEvents);
    // args.cancel = true; // Cancel alert if needed
  }
};
</script>
```

**Limitations**: Overlap checking only works within the currently visible date range. Use the `promise` field in `actionBegin` event for validation beyond visible range.

### Custom Overlap Validation

```vue
<template>
  <div>
    <ejs-schedule 
      ref="scheduleObj"
      :allowOverlap="false"
      :actionBegin="onActionBegin"
      :eventSettings="eventSettings">
    </ejs-schedule>
    <div class="button-container">
      <button @click="addOverlapEvent">Add Overlap Event</button>
      <button @click="addNonOverlapEvent">Add Non-Overlap Event</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { extend } from '@syncfusion/ej2-base';
import { eventsData } from './datasource.js';

const scheduleObj = ref(null);

const eventSettings = {
  dataSource: extend([], eventsData, null, true)
};

const overlapEvent = {
  Id: 8,
  Subject: 'OverlapEvent',
  StartTime: new Date(2025, 2, 13, 10, 0),
  EndTime: new Date(2025, 2, 13, 11, 0)
};

const nonOverlapEvent = {
  Id: 9,
  Subject: 'Non-OverlapEvent',
  StartTime: new Date(2025, 2, 12, 10, 0),
  EndTime: new Date(2025, 2, 12, 11, 0)
};

const onActionBegin = (args) => {
  if ((args.requestType === 'eventCreate') || (args.requestType === 'eventChange')) {
    args.promise = checkOverlap(args);
  }
};

const checkOverlap = (args) => {
  return new Promise((resolve) => {
    const eventsToCheck = Array.isArray(args.data) ? args.data : [args.data];
    const overlappingEvents = eventsData.filter(event => 
      eventsToCheck.some(newEvent => 
        new Date(event.StartTime) < newEvent.EndTime &&
        new Date(event.EndTime) > newEvent.StartTime &&
        event.Id !== newEvent.Id
      )
    );

    const result = overlappingEvents.length === 0;

    if (!result) {
      const popupArgs = {
        type: 'OverlapAlert',
        data: eventsToCheck,
        overlapEvents: overlappingEvents,
        element: null,
        cancel: false
      };
      scheduleObj.value.ej2Instances.openOverlapAlert(popupArgs);
    }

    resolve(result);
  });
};

const addOverlapEvent = () => {
  scheduleObj.value.ej2Instances.addEvent(overlapEvent);
};

const addNonOverlapEvent = () => {
  scheduleObj.value.ej2Instances.addEvent(nonOverlapEvent);
};
</script>
```

## Recurrence Validation

Built-in validation prevents invalid recurrence patterns:

| Validation Message | Reason |
|--------------------|---------|
| "The recurrence pattern is not valid" | Invalid rule (e.g., end date before start) |
| "Changes to specific instances will be cancelled" | Editing series with modified occurrences |
| "Duration must be shorter than frequency" | Event duration exceeds interval |
| "Some months have fewer days" | BYMONTHDAY > days in month |
| "Two occurrences cannot occur on same day" | Moving occurrence conflicts with series |
