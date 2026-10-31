# ProgressButton How-To: Click Handling

> Programmatically trigger ProgressButton progress.

---

## Click Event

Handle ProgressButton clicks:

```vue
<template>
  <ejs-progressbutton 
    ref="pbRef"
    content="Submit"
    :duration="3000"
    @click="handleSubmit"
  ></ejs-progressbutton>
</template>

<script setup>
import { ref } from 'vue';
import { ProgressButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    "ejs-progressbutton": ProgressButtonComponent
  }
}

const pbRef = ref(null);

const handleSubmit = async () => {
  console.log('Submit initiated');
  await new Promise(resolve => setTimeout(resolve, 3000));
  console.log('Submit complete');
};
</script>
```

## Programmatic Click

```vue
<template>
  <button @click="triggerProgress">Start</button>
  <ejs-progressbutton 
    ref="pbRef"
    content="Processing"
    :duration="2000"
  ></ejs-progressbutton>
</template>

<script setup>
import { ref } from 'vue';
import { ProgressButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    "ejs-progressbutton": ProgressButtonComponent
  }
}

const pbRef = ref(null);

const triggerProgress = () => {
  pbRef.value?.click?.();
};
</script>
```

---

## Related

- [progressbutton-events.md](progressbutton-events.md)
