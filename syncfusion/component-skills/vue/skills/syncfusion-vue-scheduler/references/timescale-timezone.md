# Timescale and Timezone

## Table of Contents
- [Timescale Configuration](#timescale-configuration)
  - [Timescale Properties](#timescale-properties)
  - [Setting Slot Duration](#setting-slot-duration)
  - [Hiding Timescale](#hiding-timescale)
  - [Custom Timescale Templates](#custom-timescale-templates)
- [Timezone Configuration](#timezone-configuration)
  - [Scheduler Timezone](#scheduler-timezone)
  - [Common Timezones](#common-timezones)
  - [Display Same Time Everywhere (UTC)](#display-same-time-everywhere-utc)
  - [Per-Event Timezone](#per-event-timezone)

## Timescale Configuration

The timescale controls how time slots appear in Day, Week, WorkWeek, and Timeline views.

### Timescale Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `enable` | boolean | Show/hide time grid lines | `true` |
| `interval` | number | Time interval in minutes | `60` |
| `slotCount` | number | Number of slots per interval | `2` |
| `majorSlotTemplate` | string/function | Template for major time slots | - |
| `minorSlotTemplate` | string/function | Template for minor time slots | - |

### Setting Slot Duration

Configure time slot intervals:

```vue
<template>
  <ejs-schedule :timeScale="timeScale">
    <e-views>
      <e-view option="Day"></e-view>
      <e-view option="Week"></e-view>
    </e-views>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { Day, Week } from '@syncfusion/ej2-vue-schedule';

// Creates 6 slots per hour (10-minute intervals)
const timeScale = {
  enable: true,
  interval: 60, // 1 hour
  slotCount: 6   // 6 divisions = 10 min each
};

provide('schedule', [Day, Week]);
</script>
```

**Common Configurations:**
- **30-minute slots**: `interval: 60, slotCount: 2`
- **15-minute slots**: `interval: 60, slotCount: 4`
- **10-minute slots**: `interval: 60, slotCount: 6`
- **5-minute slots**: `interval: 60, slotCount: 12`
- **2-hour slots**: `interval: 120, slotCount: 1`

### Hiding Timescale

Remove time grid lines:

```vue
<script setup>
const timeScale = {
  enable: false // Hides time grid, shows appointments without alignment
};
</script>
```

### Custom Timescale Templates

Customize time cell appearance:

```vue
<template>
  <ejs-schedule :timeScale="timeScale">
    <template v-slot:majorSlotTemplate="{ data }">
      <div>{{ formatMajorSlot(data.date) }}</div>
    </template>
    <template v-slot:minorSlotTemplate="{ data }">
      <div style="text-align: right; margin-right: 15px">
        {{ formatMinorSlot(data.date) }}
      </div>
    </template>
  </ejs-schedule>
</template>

<script setup>
import { Internationalization } from '@syncfusion/ej2-base';

const intl = new Internationalization();

const timeScale = {
  enable: true,
  interval: 60,
  slotCount: 6,
  majorSlotTemplate: 'majorSlotTemplate',
  minorSlotTemplate: 'minorSlotTemplate'
};

const formatMajorSlot = (date) => {
  return intl.formatDate(date, { skeleton: 'hm' }); // "9:00 AM"
};

const formatMinorSlot = (date) => {
  return intl.formatDate(date, { skeleton: 'ms' }).replace(':00', ''); // "30"
};
</script>
```

## Timezone Configuration

Scheduler supports global timezone and per-event timezone settings.

### Scheduler Timezone

Set scheduler-wide timezone:

```vue
<template>
  <ejs-schedule 
    :timezone="timezone"
    :eventSettings="eventSettings">
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { Day, Week, Month } from '@syncfusion/ej2-vue-schedule';

const timezone = 'America/New_York'; // Eastern Time

const eventSettings = {
  dataSource: [
    {
      Id: 1,
      Subject: 'Meeting',
      StartTime: new Date(2024, 0, 15, 10, 0),
      EndTime: new Date(2024, 0, 15, 11, 0)
    }
  ]
};

provide('schedule', [Day, Week, Month]);
</script>
```

### Common Timezones

**Format**: IANA timezone database names

| Timezone | Value |
|----------|-------|
| UTC | `UTC` |
| Eastern Time (US) | `America/New_York` |
| Pacific Time (US) | `America/Los_Angeles` |
| Central Time (US) | `America/Chicago` |
| Mountain Time (US) | `America/Denver` |
| London | `Europe/London` |
| Paris | `Europe/Paris` |
| Tokyo | `Asia/Tokyo` |
| Sydney | `Australia/Sydney` |
| Mumbai | `Asia/Kolkata` |

### Display Same Time Everywhere (UTC)

Show events at same time globally without timezone conversion:

```vue
<script setup>
import { Timezone } from '@syncfusion/ej2-schedule';

const timezoneInstance = new Timezone();

// Remove local timezone offset from events
const data = [
  {
    Id: 1,
    Subject: 'Conference',
    StartTime: new Date(2024, 0, 15, 10, 0),
    EndTime: new Date(2024, 0, 15, 11, 0)
  }
];

// Convert to UTC
data.forEach(event => {
  event.StartTime = timezoneInstance.removeLocalOffset(event.StartTime);
  event.EndTime = timezoneInstance.removeLocalOffset(event.EndTime);
});

const timezone = 'UTC';
const eventSettings = { dataSource: data };
</script>
```

### Per-Event Timezone

Set different timezones for individual events:

```vue
<script setup>
const eventSettings = {
  dataSource: [
    {
      Id: 1,
      Subject: 'Paris Meeting',
      StartTime: new Date(2024, 0, 15, 10, 0),
      EndTime: new Date(2024, 0, 15, 11, 0),
      StartTimezone: 'Europe/Paris',
      EndTimezone: 'Europe/Paris'
    },
    {
      Id: 2,
      Subject: 'New York Call',
      StartTime: new Date(2024, 0, 15, 14, 0),
      EndTime: new Date(2024, 0, 15, 15, 0),
      StartTimezone: 'America/New_York',
      EndTimezone: 'America/New_York'
    }
  ],
  fields: {
    startTimezone: { name: 'StartTimezone' },
    endTimezone: { name: 'EndTimezone' }
  }
};
</script>
```

**Note**: Events with specific timezones display converted to scheduler timezone.

### Timezone Helper Methods

Use the `Timezone` class for conversions:

```vue
<script setup>
import { Timezone } from '@syncfusion/ej2-schedule';

const timezoneInstance = new Timezone();

// Convert date to specific timezone
const toTimezone = (date, fromZone, toZone) => {
  return timezoneInstance.convert(date, fromZone, toZone);
};

// Example: Convert NY time to Paris time
const nyTime = new Date(2024, 0, 15, 10, 0); // 10 AM NY
const parisTime = toTimezone(nyTime, 'America/New_York', 'Europe/Paris');
console.log(parisTime); // 4 PM Paris (6 hour difference)

// Remove local offset to get UTC
const utcTime = timezoneInstance.removeLocalOffset(nyTime);

// Add local offset from UTC
const localTime = timezoneInstance.addLocalOffset(utcTime);
</script>
```

### Timezone in Event Editor

Enable timezone dropdown in event editor:

```vue
<template>
  <ejs-schedule 
    :timezone="timezone"
    :eventSettings="eventSettings">
  </ejs-schedule>
</template>

<script setup>
// Timezone dropdown appears automatically when:
// 1. Scheduler has timezone set
// 2. Event fields include startTimezone/endTimezone

const timezone = 'America/New_York';

const eventSettings = {
  dataSource: [],
  fields: {
    startTimezone: { name: 'StartTimezone' },
    endTimezone: { name: 'EndTimezone' }
  }
};
</script>
```

### No Timezone (Browser Local)

When no timezone is set, scheduler uses browser's local timezone:

```vue
<script setup>
// No timezone property = uses browser local timezone
const eventSettings = {
  dataSource: [
    {
      Id: 1,
      Subject: 'Meeting',
      // Times interpreted in user's local timezone
      StartTime: new Date(2024, 0, 15, 10, 0),
      EndTime: new Date(2024, 0, 15, 11, 0)
    }
  ]
};
</script>
```

## Best Practices

### Timescale
1. **Choose appropriate intervals** - Balance detail vs. performance
2. **Limit slot count** - Maximum 1000 slots per day for Timeline views
3. **Use templates sparingly** - Custom templates impact render performance
4. **Test different configurations** - Ensure slots align with business needs
5. **Hide timescale for agenda-like views** - Set `enable: false` when times aren't critical

### Timezone
1. **Use UTC for global apps** - Store times in UTC, display in user timezone
2. **Always specify timezone** - Avoid ambiguity with explicit timezone settings
3. **Validate timezone names** - Use IANA standard names only
4. **Test across timezones** - Verify DST transitions and edge cases
5. **Convert before storage** - Store UTC in database, convert on display
6. **Handle DST changes** - Be aware of daylight saving time transitions
7. **Document timezone behavior** - Clarify timezone handling to users
8. **Use Timezone helper** - Leverage built-in `Timezone` class for conversions
