# Events & Methods (Vue 3)

## Events

```vue
<template>
  <ejs-datetimepicker
    :value="selectedDateTime"
    @change="onDateTimeChange"
    @created="onCreated"
  ></ejs-datetimepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DateTimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDateTime = ref(new Date());

const onDateTimeChange = (args) => {
  console.log('DateTime changed:', args.value);
};

const onCreated = (args) => {
  console.log('DateTimePicker created');
};
</script>
```

### Event Types

| Event | Description |
|-------|-------------|
| `@change` | Fired when date-time changes |
| `@created` | Fired when component is created |
| `@destroyed` | Fired when component is destroyed |

---

## Methods

Access via template refs:

```vue
<template>
  <div>
    <ejs-datetimepicker
      ref="dateTimePickerRef"
      :value="selectedDateTime"
    ></ejs-datetimepicker>
    
    <button @click="setToNow">Set to Now</button>
    <button @click="clear">Clear</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DateTimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const dateTimePickerRef = ref(null);
const selectedDateTime = ref(new Date());

const setToNow = () => {
  selectedDateTime.value = new Date();
};

const clear = () => {
  selectedDateTime.value = null;
};
</script>
```

---

## Next Steps

- For styling, read `references/datetimepicker-styling-and-customization.md`.
- For advanced features, read `references/datetimepicker-advanced-features.md`.
