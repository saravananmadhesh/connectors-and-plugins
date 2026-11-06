# Switch Getting Started

> Create Switch components for toggle functionality.

---

## Installation

Ensure Syncfusion EJ2 Vue packages are installed:

```bash
npm install @syncfusion/ej2-vue-buttons @syncfusion/ej2-base
```

## Import Styles

```vue
<script setup>
import "@syncfusion/ej2-material3-theme/styles/switch/index.css";
</script>
```

## Basic Switch

```vue
<template>
  <ejs-switch></ejs-switch>
</template>

<script setup>
import { SwitchComponent } from '@syncfusion/ej2-vue-buttons';
import "@syncfusion/ej2-material3-theme/styles/switch/index.css";

export default {
  name: "App",
  components: {
    'ejs-switch': SwitchComponent
  }
}
</script>
```

## Switch with Label

```vue
<template>
  <div class="flex gap-4">
    <label>
      <ejs-switch v-model="enabled"></ejs-switch>
      <span class="ml-2">Notifications</span>
    </label>
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
</script>
```

## Multiple Switches

```vue
<template>
  <div class="space-y-4">
    <label class="flex items-center">
      <ejs-switch v-model="wifi"></ejs-switch>
      <span class="ml-2">WiFi</span>
    </label>
    
    <label class="flex items-center">
      <ejs-switch v-model="bluetooth"></ejs-switch>
      <span class="ml-2">Bluetooth</span>
    </label>
    
    <label class="flex items-center">
      <ejs-switch v-model="darkMode"></ejs-switch>
      <span class="ml-2">Dark Mode</span>
    </label>
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

const wifi = ref(true);
const bluetooth = ref(false);
const darkMode = ref(false);
</script>
```

## Running Your App

```bash
npm run dev
```

---

## Next Steps

- Explore features in [switch-features.md](switch-features.md)
