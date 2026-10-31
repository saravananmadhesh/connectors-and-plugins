# DateRangePicker API Reference (Vue 3)

## Component: `ejs-daterangepicker`

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | Object | null | Selected range {startDate, endDate} |
| `startDateFormat` | string | "M/d/y" | Start date display format |
| `endDateFormat` | string | "M/d/y" | End date display format |
| `separator` | string | "-" | Range separator character |
| `min` | Date | null | Minimum selectable date |
| `max` | Date | null | Maximum selectable date |
| `locale` | string | "en" | Locale for date labels |
| `enableRtl` | boolean | false | Enable RTL layout |
| `disabled` | boolean | false | Disable component |
| `readonly` | boolean | false | Disable date picking |

---

## Events

| Event | Args | Description |
|-------|------|-------------|
| `@change` | ChangeEventArgs | Fired when range changes |
| `@created` | Object | Fired when component is created |
| `@destroyed` | Object | Fired when component is destroyed |
| `@renderDayCell` | RenderDayCellEventArgs | Fired for each day cell |

---

## Methods (via Template Refs)

| Method | Args | Returns | Description |
|--------|------|---------|-------------|
| `navigateTo` | (view: string, date: Date) | void | Navigate to view/date |
| `setProperties` | (props: Object) | void | Update properties |
| `show` | - | void | Show calendar popup |
| `destroy` | - | void | Destroy component |

---

## Usage Example

```vue
<template>
  <ejs-daterangepicker
    ref="rangePickerRef"
    :value="selectedRange"
    :startDateFormat="'MM/dd/yyyy'"
    :endDateFormat="'MM/dd/yyyy'"
    @change="onRangeChange"
  ></ejs-daterangepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DateRangePickerComponent } from '@syncfusion/ej2-vue-calendars';

const rangePickerRef = ref(null);
const selectedRange = ref(null);

const onRangeChange = (args) => {
  console.log('Range:', args.startDate, args.endDate);
};
</script>
```

---

## Related Components

- Calendar
- DatePicker
- DateTimePicker
- TimePicker

---

## See Also

- [DateRangePicker Getting Started](daterangepicker-getting-started.md)
- [Date Range Selection](daterangepicker-date-range-selection.md)
- [Advanced Patterns](daterangepicker-advanced-patterns.md)
