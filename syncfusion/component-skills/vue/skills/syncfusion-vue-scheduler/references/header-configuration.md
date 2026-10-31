# Header Configuration

## Table of Contents
- [Header Rows (Timeline Views Only)](#header-rows-timeline-views-only)
  - [Available Header Options](#available-header-options)
  - [Basic Header Rows](#basic-header-rows)
  - [Year and Month Headers](#year-and-month-headers)
  - [Week Numbers](#week-numbers)
  - [Custom Header Templates](#custom-header-templates)
- [Header Bar](#header-bar)
  - [Hide Header Bar](#hide-header-bar)
  - [Custom Header Bar](#custom-header-bar)
- [Date Header Template](#date-header-template)
- [Best Practices](#best-practices)

## Header Rows (Timeline Views Only)

Timeline views support multiple header rows showing Year, Month, Week, Date, and Hour.

### Available Header Options

- `Year` - Display year labels
- `Month` - Display month labels
- `Week` - Display week numbers
- `Date` - Display dates
- `Hour` - Display hour labels (not for Timeline Month)

### Basic Header Rows

```vue
<template>
  <ejs-schedule :headerRows="headerRows">
    <e-views>
      <e-view option="TimelineWeek"></e-view>
    </e-views>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { TimelineViews } from '@syncfusion/ej2-vue-schedule';

const headerRows = [
  { option: 'Year' },
  { option: 'Month' },
  { option: 'Week' },
  { option: 'Date' },
  { option: 'Hour' }
];

provide('schedule', [TimelineViews]);
</script>
```

### Year and Month Headers

```vue
<script setup>
const headerRows = [
  { option: 'Year' },
  { option: 'Month' }
];
</script>
```

### Week Numbers

```vue
<script setup>
const headerRows = [
  { option: 'Week' },
  { option: 'Date' }
];
</script>
```

### Custom Header Templates

```vue
<template>
  <ejs-schedule :headerRows="headerRows">
    <template v-slot:yearHeaderTemplate="{ data }">
      <div class="year-header">{{ data.date.getFullYear() }}</div>
    </template>
    <template v-slot:monthHeaderTemplate="{ data }">
      <div class="month-header">{{ formatMonth(data.date) }}</div>
    </template>
  </ejs-schedule>
</template>

<script setup>
const headerRows = [
  { option: 'Year', template: 'yearHeaderTemplate' },
  { option: 'Month', template: 'monthHeaderTemplate' }
];

const formatMonth = (date) => {
  return date.toLocaleDateString('en-US', { month: 'short' });
};
</script>
```

## Header Bar

The header bar contains:
- Date range display
- Navigation arrows
- View switcher
- Today button

### Hide Header Bar

```vue
<template>
  <ejs-schedule :showHeaderBar="false">
  </ejs-schedule>
</template>
```

### Custom Header Bar

Use `renderCell` event:

```vue
<template>
  <ejs-schedule :renderCell="onRenderCell">
  </ejs-schedule>
</template>

<script setup>
const onRenderCell = (args) => {
  if (args.elementType === 'dateHeader') {
    args.element.innerHTML = customHeaderContent(args.date);
  }
};

const customHeaderContent = (date) => {
  return `<div class="custom-header">${date.toDateString()}</div>`;
};
</script>
```

## Date Header Template

Customize date headers in all views:

```vue
<template>
  <ejs-schedule>
    <e-views>
      <e-view option="Week">
        <template v-slot:dateHeaderTemplate="{ data }">
          <div class="custom-date-header">
            <div class="day-name">{{ formatDayName(data.date) }}</div>
            <div class="date-num">{{ data.date.getDate() }}</div>
          </div>
        </template>
      </e-view>
    </e-views>
  </ejs-schedule>
</template>

<script setup>
const formatDayName = (date) => {
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};
</script>

<style>
.custom-date-header {
  text-align: center;
}
.day-name {
  font-size: 12px;
  color: #666;
}
.date-num {
  font-size: 18px;
  font-weight: bold;
}
</style>
```

## Best Practices

1. **Use appropriate headers** - Choose headers based on view type and date range
2. **Limit header rows** - Too many rows reduce space for events
3. **Test responsive design** - Ensure headers display well on mobile
4. **Style consistently** - Maintain visual hierarchy across header rows
5. **Consider performance** - Custom templates can impact render speed
