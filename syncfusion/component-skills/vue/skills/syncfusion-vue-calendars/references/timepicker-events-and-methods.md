# Events & Methods (Vue 3)

## Events

```vue
<template>
  <ejs-timepicker
    :value="selectedTime"
    @change="onTimeChange"
    @created="onCreated"
  ></ejs-timepicker>
</template>

<script setup>
import { ref } from 'vue';
import { TimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedTime = ref(new Date());

const onTimeChange = (args) => {
  console.log('Time changed:', args.value);
  selectedTime.value = args.value;
};

const onCreated = (args) => {
  console.log('TimePicker created');
};
</script>
```

### Event Types

| Event | Args | Description |
|-------|------|-------------|
| `@change` | ChangeEventArgs | Fired when time changes |
| `@created` | Object | Fired when component is created |
| `@destroyed` | Object | Fired when component is destroyed |
| `@focus` | FocusEventArgs | Fired on focus |
| `@blur` | BlurEventArgs | Fired on blur |

---

## Methods

Access via template refs:

```vue
<template>
  <div style="padding: 20px">
    <ejs-timepicker
      ref="timePickerRef"
      :value="selectedTime"
    ></ejs-timepicker>
    
    <button @click="setToNow">Set to Now</button>
    <button @click="clear">Clear</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const timePickerRef = ref(null);
const selectedTime = ref(new Date());

const setToNow = () => {
  selectedTime.value = new Date();
};

const clear = () => {
  selectedTime.value = null;
};
</script>
```

---

## Next Steps

- For customization, read `references/timepicker-customization-and-styling.md`.
- For advanced patterns, read `references/timepicker-advanced-patterns.md`.
- For API reference, read `references/timepicker-api-reference.md`.
