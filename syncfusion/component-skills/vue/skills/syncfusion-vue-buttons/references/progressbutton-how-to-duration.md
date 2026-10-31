# ProgressButton How-To: Duration Control

> Manage progress duration dynamically.

---

## Set Duration

Control progress duration:

```vue
<template>
  <div class="flex gap-4 mb-4">
    <button @click="duration = 2000">2 seconds</button>
    <button @click="duration = 5000">5 seconds</button>
    <button @click="duration = 10000">10 seconds</button>
  </div>
  
  <ejs-progressbutton 
    content="Download"
    :duration="duration"
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

const duration = ref(3000);
</script>
```

## Indeterminate Progress

Infinite progress:

```vue
<template>
  <ejs-progressbutton 
    content="Loading..."
    :duration="0"
    :spinnerVisible="true"
  ></ejs-progressbutton>
</template>

<script setup>
import { ProgressButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    "ejs-progressbutton": ProgressButtonComponent
  }
}
</script>
```

---

## Related

- [progressbutton-getting-started.md](progressbutton-getting-started.md)
