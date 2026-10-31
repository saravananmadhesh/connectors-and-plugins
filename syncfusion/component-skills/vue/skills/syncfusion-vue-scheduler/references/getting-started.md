# Getting Started with Syncfusion Vue Scheduler

## Table of Contents
- [Installing Syncfusion Vue Schedule Package](#installing-syncfusion-vue-schedule-package)
- [Importing CSS Themes](#importing-css-themes)
  - [Available Themes](#available-themes)
  - [Import CSS for Material3 Theme](#import-css-for-material3-theme)
- [Module Injection](#module-injection)
  - [Available View Modules](#available-view-modules)
  - [Additional Modules](#additional-modules)
- [Basic Scheduler Implementation](#basic-scheduler-implementation)
  - [Vue 3 Composition API (Setup Script)](#vue-3-composition-api-setup-script)
  - [Vue 2 Options API](#vue-2-options-api)

This guide covers the essential steps to install, configure, and create your first Syncfusion Vue Scheduler component in both Vue 2 and Vue 3 applications.

## Installing Syncfusion Vue Schedule Package

Install the `@syncfusion/ej2-vue-schedule` package:

```bash
npm install @syncfusion/ej2-vue-schedule --save
```

Or using yarn:

```bash
yarn add @syncfusion/ej2-vue-schedule
```

The `--save` flag adds the package to the `dependencies` section in `package.json`.

## Install theme package and importing CSS themes

### Install theme package

Install the `@syncfusion/ej2-material3-theme` package:

```bash
npm install @syncfusion/ej2-material3-theme
```

Import the required CSS styles in your component's `<style>` section or in your main application file.

### Available Themes

Syncfusion provides multiple built-in themes:
- **material3** - Material Design 3
- **material** - Material Design
- **bootstrap5** - Bootstrap 5
- **bootstrap4** - Bootstrap 4
- **bootstrap** - Bootstrap 3
- **fabric** - Microsoft Fabric
- **highcontrast** - High Contrast
- **tailwind** - Tailwind CSS
- **fluent** - Microsoft Fluent

### Import CSS for Material3 Theme

```vue
<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/schedule/index.css";
</style>
```

**Note**: Replace `material3` with your preferred theme name (e.g., `bootstrap5`, `tailwind`, `fabric`).

## Module Injection

The Scheduler requires view modules to be injected. Only inject the views you plan to use to optimize bundle size.

### Available View Modules

- **Day** - Single day view
- **Week** - Week view (7 days)
- **WorkWeek** - Work week view (5 working days)
- **Month** - Month view
- **Year** - Year view
- **Agenda** - Agenda list view
- **MonthAgenda** - Month with agenda
- **TimelineViews** - Timeline day, week, work week views
- **TimelineMonth** - Timeline month view
- **TimelineYear** - Timeline year view

### Additional Modules

- **DragAndDrop** - Enables drag and drop functionality
- **Resize** - Enables event resizing
- **ExcelExport** - Excel export functionality
- **ICalendarExport** - ICS export functionality
- **ICalendarImport** - ICS import functionality
- **Print** - Print functionality

## Basic Scheduler Implementation

### Vue 3 Composition API (Setup Script)

```vue
<template>
  <div id='app'>
    <ejs-schedule 
      height='550px' 
      :selectedDate='selectedDate' 
      :eventSettings='eventSettings'>
    </ejs-schedule>
  </div>
</template>

<script setup>
import { provide } from "vue";
import { 
  ScheduleComponent as EjsSchedule, 
  Day, Week, WorkWeek, Month, Agenda 
} from '@syncfusion/ej2-vue-schedule';

const selectedDate = new Date(2024, 0, 15);
const eventSettings = {
  dataSource: []
};

// Inject required view modules
provide('schedule', [Day, Week, WorkWeek, Month, Agenda]);
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/schedule/index.css";
</style>
```

### Vue 2 Options API

```vue
<template>
  <div id='app'>
    <ejs-schedule 
      height='550px' 
      :selectedDate='selectedDate'
      :eventSettings='eventSettings'>
    </ejs-schedule>
  </div>
</template>

<script>
import { 
  ScheduleComponent, 
  Day, Week, WorkWeek, Month, Agenda 
} from '@syncfusion/ej2-vue-schedule';

export default {
  name: "App",
  components: {
    'ejs-schedule': ScheduleComponent
  },
  data() {
    return {
      selectedDate: new Date(2024, 0, 15),
      eventSettings: {
        dataSource: []
      }
    }
  },
  provide: {
    schedule: [Day, Week, WorkWeek, Month, Agenda]
  }
}
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/schedule/index.css";
</style>
```

## Adding Appointments

### Simple Appointment Data

```vue
<script setup>
import { provide } from "vue";
import { ScheduleComponent as EjsSchedule, Day, Week, Month } from '@syncfusion/ej2-vue-schedule';

const selectedDate = new Date(2024, 0, 15);
const eventSettings = {
  dataSource: [
    {
      Id: 1,
      Subject: 'Team Meeting',
      StartTime: new Date(2024, 0, 15, 10, 0),
      EndTime: new Date(2024, 0, 15, 11, 30),
      IsAllDay: false
    },
    {
      Id: 2,
      Subject: 'Conference',
      StartTime: new Date(2024, 0, 16, 14, 0),
      EndTime: new Date(2024, 0, 16, 16, 0),
      IsAllDay: false
    }
  ]
};

provide('schedule', [Day, Week, Month]);
</script>
```

### Required Event Fields

The minimum required fields for an event:
- **StartTime** (Date) - Event start time (required)
- **EndTime** (Date) - Event end time (required)

### Recommended Event Fields

- **Id** (number/string) - Unique identifier for CRUD operations
- **Subject** (string) - Event title/summary
- **IsAllDay** (boolean) - Whether event spans entire day
- **Location** (string) - Event location
- **Description** (string) - Event details

## Setting Initial Date

Use the `selectedDate` property to set the initial date displayed:

```vue
<script setup>
const selectedDate = new Date(2024, 0, 15); // January 15, 2024
</script>
```

## Setting Default View

Use the `currentView` property to set the initial view:

```vue
<template>
  <ejs-schedule 
    :selectedDate='selectedDate'
    :currentView='currentView'
    :eventSettings='eventSettings'>
  </ejs-schedule>
</template>

<script setup>
const currentView = 'Month'; // Options: Day, Week, WorkWeek, Month, Year, Agenda
</script>
```

## Customizing Views

Define specific views using the `views` property:

```vue
<template>
  <ejs-schedule 
    :selectedDate='selectedDate'
    :eventSettings='eventSettings'>
    <e-views>
      <e-view option='Day'></e-view>
      <e-view option='Week'></e-view>
      <e-view option='Month'></e-view>
    </e-views>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { 
  ScheduleComponent as EjsSchedule, 
  ViewsDirective as EViews,
  ViewDirective as EView,
  Day, Week, Month 
} from '@syncfusion/ej2-vue-schedule';

provide('schedule', [Day, Week, Month]);
</script>
```

## Complete Example

```vue
<template>
  <div id='app'>
    <ejs-schedule 
      height='550px'
      width='100%'
      :selectedDate='selectedDate'
      :currentView='currentView'
      :eventSettings='eventSettings'>
      <e-views>
        <e-view option='Day'></e-view>
        <e-view option='Week'></e-view>
        <e-view option='WorkWeek'></e-view>
        <e-view option='Month'></e-view>
        <e-view option='Agenda'></e-view>
      </e-views>
    </ejs-schedule>
  </div>
</template>

<script setup>
import { provide } from "vue";
import { 
  ScheduleComponent as EjsSchedule,
  ViewsDirective as EViews,
  ViewDirective as EView,
  Day, Week, WorkWeek, Month, Agenda 
} from '@syncfusion/ej2-vue-schedule';

const selectedDate = new Date(2024, 0, 15);
const currentView = 'Week';
const eventSettings = {
  dataSource: [
    {
      Id: 1,
      Subject: 'Morning Standup',
      StartTime: new Date(2024, 0, 15, 9, 0),
      EndTime: new Date(2024, 0, 15, 9, 30),
      Location: 'Conference Room A'
    },
    {
      Id: 2,
      Subject: 'Client Meeting',
      StartTime: new Date(2024, 0, 15, 14, 0),
      EndTime: new Date(2024, 0, 15, 15, 30),
      Location: 'Meeting Room B',
      Description: 'Quarterly review with ABC Corp'
    },
    {
      Id: 3,
      Subject: 'Team Lunch',
      StartTime: new Date(2024, 0, 16, 12, 0),
      EndTime: new Date(2024, 0, 16, 13, 0),
      IsAllDay: false
    }
  ]
};

provide('schedule', [Day, Week, WorkWeek, Month, Agenda]);
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/schedule/index.css";
</style>
```

## Next Steps

Once you have the basic scheduler running:
1. Learn about different event types (recurring, all-day, spanned) in `appointments.md`
2. Explore various view modes in `views.md`
3. Implement data binding with remote sources in `data-binding.md`
4. Add resource grouping in `resources.md`
5. Customize appearance with templates in `customization.md`

## Common Issues

**Events not displaying**: Ensure `StartTime` and `EndTime` are valid Date objects, not strings.

**Views not available**: Check that you've injected the required view modules via the `provide` method.

**Styling issues**: Verify all CSS imports are included in the correct order.

**Module import errors**: Ensure the package is installed correctly and import paths are accurate.
