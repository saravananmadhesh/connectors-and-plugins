# Customization

## Table of Contents
- [Cell Dimensions](#cell-dimensions)
- [Cell Templates](#cell-templates)
- [RenderCell Event](#rendercell-event)
- [Slot Availability Check](#slot-availability-check)
- [Cell Header Template (Month View)](#cell-header-template-month-view)
- [Date Header Customization](#date-header-customization)
- [Minimum and Maximum Dates](#minimum-and-maximum-dates)
- [Weekend Cell Customization](#weekend-cell-customization)
- [Working Hours and Days](#working-hours-and-days)
- [Disable Multiple Cell and Row Selection](#disable-multiple-cell-and-row-selection)
- [Best Practices](#best-practices)

## Cell Dimensions

Customize cell height and width using CSS with `cssClass`:

```vue
<template>
  <ejs-schedule 
    width="100%" 
    height="550px"
    cssClass="schedule-cell-dimension"
    :selectedDate="selectedDate"
    :eventSettings="eventSettings">
    <e-views>
      <e-view option="Day"></e-view>
      <e-view option="Week"></e-view>
      <e-view option="WorkWeek"></e-view>
      <e-view option="Month"></e-view>
    </e-views>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { Day, Week, WorkWeek, Month } from '@syncfusion/ej2-vue-schedule';

const selectedDate = new Date(2024, 0, 15);
const eventSettings = { dataSource: [] };

provide('schedule', [Day, Week, WorkWeek, Month]);
</script>

<style>
/* Customize vertical view (Week/Day) cell width */
.schedule-cell-dimension.e-schedule .e-vertical-view .e-date-header-wrap table col,
.schedule-cell-dimension.e-schedule .e-vertical-view .e-content-wrap table col {
  width: 200px;
}

/* Customize vertical view cell height */
.schedule-cell-dimension.e-schedule .e-vertical-view .e-time-cells-wrap table td,
.schedule-cell-dimension.e-schedule .e-vertical-view .e-work-cells {
  height: 100px;
}

/* Customize month view cell width and height */
.schedule-cell-dimension.e-schedule .e-month-view .e-work-cells {
  height: 200px;
}

.schedule-cell-dimension.e-schedule .e-month-view .e-date-header-wrap table col {
  width: 200px;
}
</style>
```

**Note:** Apply custom CSS class using `cssClass` property and override the default Syncfusion styles.

## Cell Templates

Customize work cells using `cellTemplate`:

```vue
<template>
  <ejs-schedule :cellTemplate="'cellTemplate'">
    <template v-slot:cellTemplate="{ data }">
      <div v-if="data.type === 'workCells'">
        <div v-html="formatCell(data.date)"></div>
      </div>
    </template>
  </ejs-schedule>
</template>

<script setup>
const formatCell = (date) => {
  if (date.getDay() === 0 || date.getDay() === 6) {
    return '<img src="weekend-icon.svg" />';
  }
  return date.getDate();
};
</script>
```

## RenderCell Event

Customize cells using `renderCell` event:

```vue
<template>
  <ejs-schedule :renderCell="onRenderCell">
  </ejs-schedule>
</template>

<script setup>
const onRenderCell = (args) => {
  if (args.elementType === 'workCells' || args.elementType === 'monthCells') {
    // Highlight weekends
    if (args.date.getDay() === 0 || args.date.getDay() === 6) {
      args.element.style.backgroundColor = '#f0f0f0';
    }
    
    // Block specific dates
    const today = new Date();
    if (args.date < today) {
      args.element.classList.add('e-disable-dates');
    }
  }
};
</script>

<style>
.e-disable-dates {
  pointer-events: none;
  opacity: 0.5;
}
</style>
```

## Slot Availability Check

Use `isSlotAvailable` method to prevent double booking:

```vue
<template>
  <ejs-schedule 
    ref="scheduleObj"
    :actionBegin="onActionBegin">
  </ejs-schedule>
</template>

<script setup>
import { ref } from "vue";

const scheduleObj = ref(null);

const onActionBegin = (args) => {
  if (args.requestType === 'eventCreate' && args.data.length > 0) {
    const eventData = args.data[0];
    const schedule = scheduleObj.value.ej2Instances;
    const startDate = eventData[schedule.eventFields.startTime];
    const endDate = eventData[schedule.eventFields.endTime];
    
    // Prevent event creation if slot is occupied
    args.cancel = !schedule.isSlotAvailable(startDate, endDate);
  }
};
</script>
```

## Cell Header Template (Month View)

Customize month view cell headers:

```vue
<template>
  <ejs-schedule 
    width="100%" 
    height="550px"
    :cellHeaderTemplate="'cellHeaderTemplate'"
    cssClass="schedule-cell-header-template">
    <template v-slot:cellHeaderTemplate="{ data }">
      <div v-html="getDateHeaderText(data.date)"></div>
    </template>
    <e-views>
      <e-view option="Month"></e-view>
    </e-views>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { Internationalization } from '@syncfusion/ej2-base';
import { Month } from '@syncfusion/ej2-vue-schedule';

const instance = new Internationalization();

const getDateHeaderText = (date) => {
  return instance.formatDate(date, { skeleton: "Ed" });
};

provide('schedule', [Month]);
</script>
```

## Date Header Customization

Customize date headers in Week/Day views:

```vue
<template>
  <ejs-schedule>
    <e-views>
      <e-view option="Week">
        <template v-slot:dateHeaderTemplate="{ data }">
          <div class="date-text">
            <div>{{ formatDay(data.date) }}</div>
            <div class="date-number">{{ data.date.getDate() }}</div>
          </div>
        </template>
      </e-view>
    </e-views>
  </ejs-schedule>
</template>

<script setup>
const formatDay = (date) => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return days[date.getDay()];
};
</script>

<style>
.date-text {
  text-align: center;
}
.date-number {
  font-size: 20px;
  font-weight: bold;
}
</style>
```

## Minimum and Maximum Dates

Restrict date navigation within a range:

```vue
<template>
  <ejs-schedule 
    height="550px"
    :selectedDate="selectedDate"
    :minDate="minDate"
    :maxDate="maxDate"
    :currentView="currentView"
    :eventSettings="eventSettings">
    <e-views>
      <e-view option="Day"></e-view>
      <e-view option="Week"></e-view>
      <e-view option="Month"></e-view>
    </e-views>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { Day, Week, Month } from '@syncfusion/ej2-vue-schedule';

const selectedDate = new Date(2024, 0, 17);
const minDate = new Date(2023, 9, 17); // Oct 17, 2023
const maxDate = new Date(2024, 5, 17); // Jun 17, 2024
const currentView = 'Month';
const eventSettings = { dataSource: [] };

provide('schedule', [Day, Week, Month]);
</script>
```

**Note:** Default `minDate` is `new Date(1900, 0, 1)` and `maxDate` is `new Date(2099, 11, 31)`. Dates outside this range are disabled for navigation.

## Weekend Cell Customization

Highlight and customize weekend cells:

```vue
<template>
  <ejs-schedule 
    width="100%" 
    height="550px"
    cssClass="schedule-cell-customization"
    :selectedDate="selectedDate"
    :eventSettings="eventSettings"
    :renderCell="onRenderCell">
    <e-views>
      <e-view option="Day"></e-view>
      <e-view option="Week"></e-view>
      <e-view option="Month"></e-view>
    </e-views>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { Day, Week, Month } from '@syncfusion/ej2-vue-schedule';

const selectedDate = new Date(2024, 0, 15);
const eventSettings = { dataSource: [] };

const onRenderCell = (args) => {
  if (args.elementType === 'workCells') {
    // Highlight Saturdays and Sundays (day 6 and 0)
    if (args.date.getDay() === 6 || args.date.getDay() === 0) {
      args.element.style.background = '#ffdea2';
    }
  }
};

provide('schedule', [Day, Week, Month]);
</script>

<style>
/* Alternative approach for month view using CSS */
.schedule-cell-customization.e-schedule .e-month-view .e-work-cells:not(.e-work-days) {
  background-color: #f08080;
}
</style>
```

## Working Hours and Days

Set working hours and working days for the scheduler:

```vue
<template>
  <ejs-schedule 
    startHour="09:00"
    endHour="18:00"
    :workDays="[1, 2, 3, 4, 5]">
  </ejs-schedule>
</template>
```

**Properties:**
- `startHour`: First hour to display (default: '00:00')
- `endHour`: Last hour to display (default: '24:00')
- `workDays`: Array of work days (0=Sunday through 6=Saturday)

## Disable Multiple Cell and Row Selection

Disable multi-cell and multi-row selection:

```vue
<template>
  <ejs-schedule 
    :allowMultiCellSelection="false"
    :allowMultiRowSelection="false">
  </ejs-schedule>
</template>

<script setup>
// allowMultiCellSelection: default true - allows selecting multiple cells
// allowMultiRowSelection: default true - allows selecting multiple rows
</script>
```

## Best Practices

1. **Use CSS for styling** - Prefer CSS classes over inline styles
2. **Test cell templates** - Ensure templates don't impact performance
3. **Validate slot availability** - Prevent conflicts with `isSlotAvailable`
4. **Keep templates simple** - Complex templates can slow rendering
5. **Apply consistent styling** - Maintain visual consistency across views
