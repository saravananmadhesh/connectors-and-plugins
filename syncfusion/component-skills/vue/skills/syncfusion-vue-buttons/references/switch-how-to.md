# Switch How-To

> Common Switch patterns and recipes.

---

## Form Integration

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <div class="space-y-4">
      <label class="flex items-center">
        <ejs-switch v-model="agree"></ejs-switch>
        <span class="ml-2">I agree to the terms</span>
      </label>
      
      <label class="flex items-center">
        <ejs-switch v-model="subscribe"></ejs-switch>
        <span class="ml-2">Subscribe to newsletter</span>
      </label>
      
      <button 
        type="submit"
        class="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
    </div>
  </form>
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

const agree = ref(false);
const subscribe = ref(true);

const handleSubmit = () => {
  console.log('Form data:', { agree: agree.value, subscribe: subscribe.value });
};
</script>
```

## Conditional Display

```vue
<template>
  <div class="space-y-4">
    <label class="flex items-center">
      <ejs-switch v-model="showAdvanced"></ejs-switch>
      <span class="ml-2">Show Advanced Settings</span>
    </label>
    
    <div v-if="showAdvanced" class="p-4 bg-gray-100 rounded">
      <label class="flex items-center mb-2">
        <ejs-switch v-model="debugMode"></ejs-switch>
        <span class="ml-2">Debug Mode</span>
      </label>
      
      <label class="flex items-center">
        <ejs-switch v-model="verbose"></ejs-switch>
        <span class="ml-2">Verbose Logging</span>
      </label>
    </div>
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

const showAdvanced = ref(false);
const debugMode = ref(false);
const verbose = ref(false);
</script>
```

---

## Related

- [switch-getting-started.md](switch-getting-started.md)
- [switch-features.md](switch-features.md)
