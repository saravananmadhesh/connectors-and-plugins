# DateTimePicker API Reference (Vue 3)

## Component: `ejs-datetimepicker`

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | Date | null | Selected date-time |
| `format` | string | "M/d/y h:mm a" | Date-time format |
| `min` | Date | null | Minimum selectable date-time |
| `max` | Date | null | Maximum selectable date-time |
| `step` | number | 1 | Minute step interval |
| `locale` | string | "en" | Locale for date/time labels |
| `enableRtl` | boolean | false | Enable RTL layout |

---

## Events

| Event | Args | Description |
|-------|------|-------------|
| `@change` | ChangeEventArgs | Fired when value changes |
| `@created` | Object | Fired when component is created |
| `@destroyed` | Object | Fired when component is destroyed |

---

## Usage

```vue
<template>
  <ejs-datetimepicker
    :value="selectedDateTime"
    format="MM/dd/yyyy HH:mm"
    @change="onChange"
  ></ejs-datetimepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DateTimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDateTime = ref(new Date());

const onChange = (args) => {
  console.log('DateTime changed:', args.value);
};
</script>
```

---

## Related Components

- Calendar
- DatePicker
- DateRangePicker
- TimePicker

---

## See Also

- [DateTimePicker Getting Started](datetimepicker-getting-started.md)
- [Date-Time Selection](datetimepicker-date-time-selection.md)
- [Time Configuration](datetimepicker-time-configuration.md)
- [Advanced Features](datetimepicker-advanced-features.md)
- [Accessibility](datetimepicker-accessibility.md)
