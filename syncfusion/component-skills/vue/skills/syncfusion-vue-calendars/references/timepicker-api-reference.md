# TimePicker API Reference (Vue 3)

## Component: `ejs-timepicker`

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | Date | null | Selected time |
| `format` | string | "h:mm a" | Time format pattern |
| `min` | Date | null | Minimum selectable time |
| `max` | Date | null | Maximum selectable time |
| `step` | number | 1 | Minute step interval |
| `locale` | string | "en" | Locale for time labels |
| `enableRtl` | boolean | false | Enable RTL layout |
| `disabled` | boolean | false | Disable component |
| `readonly` | boolean | false | Disable time picking |

---

## Events

| Event | Args | Description |
|-------|------|-------------|
| `@change` | ChangeEventArgs | Fired when time changes |
| `@created` | Object | Fired when component is created |
| `@destroyed` | Object | Fired when component is destroyed |
| `@focus` | FocusEventArgs | Fired when input gets focus |
| `@blur` | BlurEventArgs | Fired when input loses focus |

---

## Methods (via Template Refs)

| Method | Args | Returns | Description |
|--------|------|---------|-------------|
| `setProperties` | (props: Object) | void | Update component properties |
| `destroy` | - | void | Destroy component |

---

## Usage Example

```vue
<template>
  <ejs-timepicker
    ref="timePickerRef"
    :value="selectedTime"
    format="HH:mm"
    :step="30"
    @change="onTimeChange"
  ></ejs-timepicker>
</template>

<script setup>
import { ref } from 'vue';
import { TimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const timePickerRef = ref(null);
const selectedTime = ref(new Date());

const onTimeChange = (args) => {
  console.log('Time selected:', args.value);
};
</script>
```

---

## Related Components

- Calendar
- DatePicker
- DateRangePicker
- DateTimePicker

---

## See Also

- [TimePicker Getting Started](timepicker-getting-started.md)
- [Time Format & Display](timepicker-time-format-and-display.md)
- [Time Range & Selection](timepicker-time-range-and-selection.md)
- [Events & Methods](timepicker-events-and-methods.md)
- [Advanced Patterns](timepicker-advanced-patterns.md)
