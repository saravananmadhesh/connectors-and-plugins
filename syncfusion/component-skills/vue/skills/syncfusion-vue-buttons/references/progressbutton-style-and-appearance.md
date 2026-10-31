# ProgressButton Style and Appearance

> Customize ProgressButton visual appearance.

---

## CSS Classes

Apply predefined styles:

```vue
<template>
  <div class="flex gap-4">
    <ejs-progressbutton cssClass="e-primary" content="Primary"></ejs-progressbutton>
    <ejs-progressbutton cssClass="e-success" content="Success"></ejs-progressbutton>
    <ejs-progressbutton cssClass="e-warning" content="Warning"></ejs-progressbutton>
    <ejs-progressbutton cssClass="e-danger" content="Danger"></ejs-progressbutton>
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
```

## Size Variations

```vue
<template>
  <div class="flex gap-4">
    <ejs-progressbutton cssClass="e-small" content="Small"></ejs-progressbutton>
    <ejs-progressbutton content="Default"></ejs-progressbutton>
    <ejs-progressbutton cssClass="e-large" content="Large"></ejs-progressbutton>
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
```

## Progress Bar Color

```vue
<template>
  <ejs-progressbutton 
    content="Custom Color"
    :duration="3000"
    cssClass="custom-progress"
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
:deep(.custom-progress .e-progress) {
  background-color: #7b3ff2;
}
</style>
```

---

## Next Steps

- Learn accessibility in [progressbutton-accessibility.md](progressbutton-accessibility.md)
