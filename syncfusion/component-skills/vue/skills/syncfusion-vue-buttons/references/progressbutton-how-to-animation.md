# ProgressButton How-To: Animation Effects

> Add visual effects and animations to ProgressButton.

---

## Progress Animation

Control animation behavior:

```vue
<template>
  <div class="flex gap-4">
    <ejs-progressbutton 
      content="Smooth"
      :duration="3000"
      cssClass="smooth-animation"
    ></ejs-progressbutton>
    <ejs-progressbutton 
      content="Fast"
      :duration="1000"
    ></ejs-progressbutton>
  </div>
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

<style scoped>
:deep(.smooth-animation .e-progress) {
  transition: width 0.3s ease;
}
</style>
```

## Pulse Effect

```vue
<template>
  <ejs-progressbutton 
    content="Pulse"
    :duration="2000"
    cssClass="pulse-effect"
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

<style scoped>
:deep(.pulse-effect) {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}
</style>
```

---

## Related

- [progressbutton-style-and-appearance.md](progressbutton-style-and-appearance.md)
