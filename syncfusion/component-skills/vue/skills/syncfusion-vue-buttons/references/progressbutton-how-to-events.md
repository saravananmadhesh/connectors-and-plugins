# ProgressButton How-To: Events

> Handle ProgressButton events.

---

## Progress Start

Handle progress start:

```vue
<template>
  <ejs-progressbutton 
    content="Upload"
    :duration="3000"
    @begin="onBegin"
  ></ejs-progressbutton>
  <p v-if="status">{{ status }}</p>
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

const status = ref('');

const onBegin = () => {
  status.value = 'Upload started...';
};
</script>
```

## Progress End

Handle progress completion:

```vue
<template>
  <ejs-progressbutton 
    content="Processing"
    :duration="3000"
    @end="onEnd"
  ></ejs-progressbutton>
  <p v-if="complete">{{ complete }}</p>
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

const complete = ref('');

const onEnd = () => {
  complete.value = 'Process completed successfully!';
};
</script>
```

---

## Related

- [progressbutton-api.md](progressbutton-api.md)
