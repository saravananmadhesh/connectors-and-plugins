# Switch Style and Appearance

> Customize Switch visual appearance.

---

## CSS Classes

Apply predefined styles:

```vue
<template>
  <div class="space-y-3">
    <div>
      <label>Default</label>
      <ejs-switch v-model="state1"></ejs-switch>
    </div>
    
    <div>
      <label>Primary</label>
      <ejs-switch v-model="state2" cssClass="e-primary"></ejs-switch>
    </div>
    
    <div>
      <label>Success</label>
      <ejs-switch v-model="state3" cssClass="e-success"></ejs-switch>
    </div>
    
    <div>
      <label>Warning</label>
      <ejs-switch v-model="state4" cssClass="e-warning"></ejs-switch>
    </div>
    
    <div>
      <label>Danger</label>
      <ejs-switch v-model="state5" cssClass="e-danger"></ejs-switch>
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

const state1 = ref(false);
const state2 = ref(true);
const state3 = ref(true);
const state4 = ref(true);
const state5 = ref(true);
</script>
```

## Custom Styling

```vue
<template>
  <ejs-switch 
    v-model="enabled"
    cssClass="custom-switch"
  ></ejs-switch>
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

<style scoped>
:deep(.custom-switch .e-switch) {
  background-color: #7b3ff2;
}

:deep(.custom-switch .e-switch-off) {
  background-color: #e0e0e0;
}
</style>
```

---

## Next Steps

- Learn accessibility in [switch-how-to.md](switch-how-to.md)
