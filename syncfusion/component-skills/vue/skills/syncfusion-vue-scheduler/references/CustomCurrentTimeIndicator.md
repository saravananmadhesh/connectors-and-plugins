# Custom Current Time Indicator

## Table of Contents
- [Feature Overview](#feature-overview)
- [When to Use CustomCurrentTimeIndicator](#when-to-use-customcurrenttimeindicator)
- [When Not to Use CustomCurrentTimeIndicator](#when-not-to-use-customcurrenttimeindicator)
- [Required Scheduler Configuration](#required-scheduler-configuration)
- [Scheduler Properties](#scheduler-properties)
- [CurrentTimeIndicatorSettings Configuration](#currenttimeindicatorsettings-configuration)
- [View Support](#view-support)
- [Dependencies and Prerequisites](#dependencies-and-prerequisites)
- [Minimal Working Example](#minimal-working-example)
- [Reactive / Runtime Toggles](#reactive--runtime-toggles)
- [Constraints and Limitations](#constraints-and-limitations)
- [Validation Guidance](#validation-guidance)
- [AI Generation Guidance](#ai-generation-guidance)
- [Best Practices](#best-practices)

## Feature Overview

The Custom Current Time Indicator feature controls the appearance and behavior of the line that marks the current time on the Scheduler. Two Scheduler-level properties work together to drive the feature:

- `showTimeIndicator` toggles the indicator on or off.
- `currentTimeIndicatorSettings` configures how the indicator is rendered (label, line behavior on previous dates, and stacking order).

The default current time indicator is a single line on the current date. With `currentTimeIndicatorSettings` the indicator can be extended to show a custom label with the current time, persist the indicator across previous dates, and decide whether it sits above or below the appointment cells (z-order / stacking order).

This is useful when the default indicator is too subtle, when the current time must remain visible while users scroll back to earlier dates, or when the line must follow a brand style (color, label format) provided through the Scheduler theme.

## When to Use CustomCurrentTimeIndicator

Use the Custom Current Time Indicator feature when:

- The current time must remain visible while the user scrolls back to view previous dates, by enabling `showPreviousDates`.
- A custom label showing the current time needs to be rendered alongside the indicator line (`showTime: true`).
- The indicator must sit above appointments and other cells so the line is never hidden behind them (`onTop: true`).
- The indicator must yield to the appointments and stay below them so events visually overlap the line (`onTop: false`).
- The Scheduler is in a Timeline view and the indicator must track the user's current position across the horizontal time axis.
- The Scheduler is in a time-grid view (Day, Week, WorkWeek) and the indicator must move downward as the day progresses.
- The default indicator is sufficient but the application needs to expose a runtime toggle (for example, a settings panel) to hide or show it without rebuilding the component.

## When Not to Use CustomCurrentTimeIndicator

Do not use the Custom Current Time Indicator feature when:

- The default indicator is enough and no runtime toggle, label, or stacking change is needed. In that case leave both `showTimeIndicator` and `currentTimeIndicatorSettings` at their defaults.
- The desired customization is purely visual styling (color, width) that can be done with CSS. The `currentTimeIndicatorSettings` object is a behavior toggle, not a styling API.
- The Scheduler is in a view that does not visualize time on a vertical or horizontal axis (for example, an all-day Month or Year view) where a current-time line has no meaningful position.
- The application is read-only and the user does not need a real-time cue. Hiding the indicator (`showTimeIndicator: false`) is a valid choice.
- The same effect can be achieved with the Scheduler's CSS variables and theming without changing behavior.

## Required Scheduler Configuration

To enable the Custom Current Time Indicator:

1. Set `showTimeIndicator` on `<ejs-schedule>` to `true` (or to a reactive `ref` for runtime control).
2. Pass a `currentTimeIndicatorSettings` object with the desired behavior flags (`showTime`, `showPreviousDates`, `onTop`).
3. Make sure the timescale is enabled (`timeScale: { enable: true }`) so the indicator has a visible time axis to anchor to.
4. Inject the view modules that the indicator will be rendered on (Day, Week, WorkWeek, TimelineViews).
5. Provide a `selectedDate` so the Scheduler knows which date the "current" marker starts on.

```vue
<ejs-schedule
  :selectedDate="currentDate"
  currentView="TimelineWeek"
  :showTimeIndicator="showTimeIndicator"
  :currentTimeIndicatorSettings="currentTimeIndicatorSettings"
  :timeScale="{ enable: true }"
  :eventSettings="eventSettings">
  <e-views>
    <e-view option="Day"></e-view>
    <e-view option="Week"></e-view>
    <e-view option="WorkWeek"></e-view>
    <e-view option="TimelineDay"></e-view>
    <e-view option="TimelineWeek"></e-view>
    <e-view option="TimelineWorkWeek"></e-view>
  </e-views>
</ejs-schedule>
```

## Scheduler Properties

The Scheduler-level properties that participate in the feature:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `showTimeIndicator` | boolean | Yes (when customizing) | Master toggle for the current time indicator. Set to `false` to hide it entirely. |
| `currentTimeIndicatorSettings` | object | Yes (when customizing) | Behavior configuration object. See [CurrentTimeIndicatorSettings Configuration](#currenttimeindicatorsettings-configuration). |
| `timeScale` | object | Recommended | Should have `enable: true` so the indicator has an axis to render on. |
| `selectedDate` | Date | Recommended | Anchor date used to position the indicator on the timeline. |
| `currentView` | string | Optional | Active view. The indicator renders only in views that show time on an axis. |

## CurrentTimeIndicatorSettings Configuration

The `currentTimeIndicatorSettings` object accepts the following boolean flags:

| Setting | Type | Description |
|---------|------|-------------|
| `showTime` | boolean | When `true`, a custom label with the current time is rendered alongside the indicator line. |
| `showPreviousDates` | boolean | When `true`, the indicator is shown on previous dates as well, not only on the current date. |
| `onTop` | boolean | When `true`, the indicator is rendered on top of the appointment cells (higher z-order). When `false`, the indicator renders below the appointment cells. |

All three flags default to behavior that matches the standard current time indicator; explicitly setting them switches the behavior to a custom one.

### Shape of the Object

```js
const currentTimeIndicatorSettings = {
  showTime: true,
  showPreviousDates: true,
  onTop: true
};
```

The object is passed to `<ejs-schedule>` through the `:currentTimeIndicatorSettings` binding. When using the Composition API, a `computed` wrapper is the recommended way to derive the object from reactive toggles so the Scheduler re-renders when any flag changes.

## View Support

The Custom Current Time Indicator is rendered in time-grid views and in timeline views:

- `Day`
- `Week`
- `WorkWeek`
- `TimelineDay`
- `TimelineWeek`
- `TimelineWorkWeek`

These are the views where time is laid out on a visible axis (vertical in time-grid, horizontal in timeline). Views that do not have a time axis (Month, Year, Agenda) do not render the indicator.

## Dependencies and Prerequisites

- `@syncfusion/ej2-vue-schedule` (Schedule, ViewsDirective, ViewDirective).
- One or more view modules registered through `provide('schedule', [...])` from the list of supported views.
- The Scheduler theme stylesheet (for example `@syncfusion/ej2-vue-schedule/styles/material3.css`) so the indicator and its label pick up the theme styling.
- A valid `selectedDate` so the Scheduler can position the indicator.
- The `timeScale` must be enabled for the indicator to have an axis to render on.

## Minimal Working Example

```vue
<template>
  <ejs-schedule
    width="100%"
    height="550px"
    :selectedDate="currentDate"
    currentView="TimelineWeek"
    :showTimeIndicator="true"
    :currentTimeIndicatorSettings="currentTimeIndicatorSettings"
    :timeScale="{ enable: true }"
    :eventSettings="eventSettings">
    <e-views>
      <e-view option="Day"></e-view>
      <e-view option="Week"></e-view>
      <e-view option="WorkWeek"></e-view>
      <e-view option="TimelineDay"></e-view>
      <e-view option="TimelineWeek"></e-view>
      <e-view option="TimelineWorkWeek"></e-view>
    </e-views>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import {
  ScheduleComponent as EjsSchedule,
  ViewsDirective as EViews,
  ViewDirective as EView,
  Day,
  Week,
  WorkWeek,
  TimelineViews
} from '@syncfusion/ej2-vue-schedule';

const currentDate = new Date();

const currentTimeIndicatorSettings = {
  showTime: true,
  showPreviousDates: true,
  onTop: true
};

const eventSettings = { dataSource: [] };

provide('schedule', [Day, Week, WorkWeek, TimelineViews]);
</script>
```

## Reactive / Runtime Toggles

When the application needs to expose the indicator settings to the user (for example, through a settings panel), wrap the four properties in reactive variables and bind them to `<ejs-schedule>`. The Scheduler picks up changes automatically.

```vue
<script setup>
import { ref, computed, provide } from "vue";
import {
  ScheduleComponent as EjsSchedule,
  ViewsDirective as EViews,
  ViewDirective as EView,
  Day,
  Week,
  WorkWeek,
  TimelineViews
} from '@syncfusion/ej2-vue-schedule';

const currentDate = new Date();
const showTimeIndicator = ref(true);
const showTime = ref(true);
const showPreviousDates = ref(true);
const onTop = ref(true);

const currentTimeIndicatorSettings = computed(() => ({
  showTime: showTime.value,
  showPreviousDates: showPreviousDates.value,
  onTop: onTop.value
}));

const eventSettings = { dataSource: [] };

provide('schedule', [Day, Week, WorkWeek, TimelineViews]);
</script>

<template>
  <ejs-schedule
    width="100%"
    height="550px"
    :selectedDate="currentDate"
    currentView="TimelineWeek"
    :showTimeIndicator="showTimeIndicator"
    :currentTimeIndicatorSettings="currentTimeIndicatorSettings"
    :timeScale="{ enable: true }"
    :eventSettings="eventSettings">
    <e-views>
      <e-view option="Day"></e-view>
      <e-view option="Week"></e-view>
      <e-view option="WorkWeek"></e-view>
      <e-view option="TimelineDay"></e-view>
      <e-view option="TimelineWeek"></e-view>
      <e-view option="TimelineWorkWeek"></e-view>
    </e-views>
  </ejs-schedule>
</template>
```

## Constraints and Limitations

- The `currentTimeIndicatorSettings` object is a behavior configuration. It does not accept color, line width, or label format overrides. Use the Scheduler theme or CSS for visual customization.
- The indicator renders only in views that have a time axis. Month, Year, and Agenda views do not render it.
- `showPreviousDates: true` extends the indicator to previous dates; it does not extend it to future dates beyond the visible range.
- Toggling `onTop` only changes the z-order between the indicator and the appointment cells. Other layers (header, all-day row) are unaffected.
- `showTimeIndicator` is the master switch. Setting it to `false` hides the indicator regardless of `currentTimeIndicatorSettings`.
- The indicator updates in real time only while the Scheduler is in a time-grid view; in Timeline views the indicator position is updated based on the visible time range and the user's scroll position.

## Validation Guidance

Validate at the data layer when the indicator is part of a larger settings object:

- `showTimeIndicator`, `showTime`, `showPreviousDates`, and `onTop` must be booleans. Non-boolean values fall back to default behavior.
- When the four settings come from a remote source, sanitize them to booleans before passing them to `<ejs-schedule>`.
- If the application only needs the indicator to appear on a subset of views, validate that the active view is in the supported list before showing the settings.
- The reactive bindings (`ref`, `computed`) must return a new object reference when a flag changes. Reassigning a primitive inside a non-reactive object will not trigger a Scheduler re-render.

## AI Generation Guidance

When generating a Custom Current Time Indicator implementation, follow this checklist:

1. **Bind `showTimeIndicator` and `currentTimeIndicatorSettings` on `<ejs-schedule>`.** Both are part of the feature surface; only setting one is incomplete.
2. **Use the correct flag names** in `currentTimeIndicatorSettings`: `showTime`, `showPreviousDates`, `onTop`. Do not invent or rename them.
3. **Wrap reactive flags in `ref` and derive the settings object with `computed`** so the Scheduler re-renders when the user toggles a setting at runtime.
4. **Enable the timescale** with `timeScale: { enable: true }` so the indicator has an axis to render on.
5. **Inject the right view modules.** Register `Day`, `Week`, `WorkWeek` for time-grid views and `TimelineViews` for timeline views through `provide('schedule', [...])`.
6. **Restrict the `<e-views>` block to views that show a time axis** (Day, Week, WorkWeek, TimelineDay, TimelineWeek, TimelineWorkWeek). Do not list Month, Year, or Agenda.
7. **Provide a `selectedDate`** so the Scheduler can position the indicator correctly on the timeline.
8. **Use `currentView`** to set the initial view (for example `currentView="TimelineWeek"`) when the application is timeline-first.
9. **Do not invent** styling properties inside `currentTimeIndicatorSettings` (color, width, font, format). They are not part of the feature surface. Use CSS for that.
10. **Do not treat `currentTimeIndicatorSettings` as a style API.** It is a behavior toggle only.
11. **Do not place `currentTimeIndicatorSettings` on `eventSettings` or on `<e-resource>`.** It belongs only on `<ejs-schedule>`.
12. **Document the toggle in the user-facing settings panel** so users understand the impact of each flag (label, previous dates, stacking order).

## Best Practices

1. **Default `showPreviousDates` to `false`** when the application is a single-day dashboard; only enable it for multi-day navigation.
2. **Default `onTop` to `true`** in time-grid views so the indicator is never hidden behind an event; only flip to `false` for a specific visual style.
3. **Bind the four flags to a `computed` object** instead of a plain object so the Scheduler re-renders on toggle.
4. **Pair `showTime: true` with `onTop: true`** so the custom label is never covered by an event.
5. **Use `currentView="TimelineWeek"` as the default** when the application is timeline-first; the indicator is most useful there.
6. **Validate boolean inputs** at the data layer when the settings are user-controlled.
7. **Hide the indicator on read-only screens** (`showTimeIndicator: false`) when the time is not actionable.
8. **Restrict the `<e-views>` list** to time-axis views when the application is built around the current time indicator; this avoids loading view modules that will never render it.
9. **Do not rely on `currentTimeIndicatorSettings` for color or line width.** Use the Scheduler theme or CSS for those customizations.
10. **Document the four flags** (`showTimeIndicator`, `showTime`, `showPreviousDates`, `onTop`) in the application's settings panel so users know what each toggle does.
