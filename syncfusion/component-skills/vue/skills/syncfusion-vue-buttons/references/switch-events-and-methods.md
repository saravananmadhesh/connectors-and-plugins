# Switch Events and Methods

> Handle Switch interactions and state changes.

---

## Change Event

```vue
<template>
  <div>
    <label>
      <ejs-switch 
        v-model="enabled"
        @change="onChange"
      ></ejs-switch>
      <span class="ml-2">Toggle</span>
    </label>
    
    <p v-if="message" class="mt-2">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SwitchComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    'ejs-switch': SwitchComponent
  }
}

const enabled = ref(false);
const message = ref('');

const onChange = () => {
  message.value = `Switch is now ${enabled.value ? 'ON' : 'OFF'}`;
};
</script>
```

## Multiple Event Handlers

```vue
<template>
  <div class="space-y-3">
    <label>
      <ejs-switch 
        v-model="feature1"
        @created="onCreated"
        @change="onChange"
        @destroyed="onDestroyed"
      ></ejs-switch>
      <span class="ml-2">Feature 1</span>
    </label>
    
    <p v-if="status">{{ status }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SwitchComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    'ejs-switch': SwitchComponent
  }
}

const feature1 = ref(false);
const status = ref('');

const onCreated = () => {
  status.value = 'Switch initialized';
};

const onChange = () => {
  status.value = `State changed to: ${feature1.value}`;
};

const onDestroyed = () => {
  status.value = 'Switch destroyed';
};
</script>
```

---

## Next Steps

- Customize style in [switch-style-and-appearance.md](switch-style-and-appearance.md)
