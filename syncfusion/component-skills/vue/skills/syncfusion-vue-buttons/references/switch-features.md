# Switch Features

> Explore Switch features and state management.

---

## Checked State

Control initial state:

```vue
<template>
  <div class="flex gap-8">
    <div>
      <p class="mb-2">Unchecked</p>
      <ejs-switch :checked="false"></ejs-switch>
    </div>
    
    <div>
      <p class="mb-2">Checked</p>
      <ejs-switch :checked="true"></ejs-switch>
    </div>
  </div>
</template>

<script setup>
import { SwitchComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    'ejs-switch': SwitchComponent
  }
}
</script>
```

## Disabled State

```vue
<template>
  <div class="flex gap-8">
    <div>
      <p class="mb-2">Enabled</p>
      <ejs-switch v-model="enabled"></ejs-switch>
    </div>
    
    <div>
      <p class="mb-2">Disabled</p>
      <ejs-switch disabled></ejs-switch>
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

const enabled = ref(true);
</script>
```

## Value Binding

Bind to component state:

```vue
<template>
  <div>
    <label>
      <ejs-switch v-model="isEnabled"></ejs-switch>
      <span class="ml-2">Enable Feature</span>
    </label>
    
    <p class="mt-4 p-3 bg-gray-100 rounded">
      Status: {{ isEnabled ? 'Enabled' : 'Disabled' }}
    </p>
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

const isEnabled = ref(false);
</script>
```

---

## Next Steps

- Handle events in [switch-events-and-methods.md](switch-events-and-methods.md)
