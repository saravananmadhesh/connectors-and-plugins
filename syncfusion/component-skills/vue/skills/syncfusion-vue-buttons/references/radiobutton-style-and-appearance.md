# RadioButton Style and Appearance

> Customize RadioButton visual appearance.

---

## CSS Classes

Apply predefined styles:

```vue
<template>
  <div>
    <ejs-radiobutton cssClass="e-primary" label="Primary"></ejs-radiobutton>
    <ejs-radiobutton cssClass="e-success" label="Success"></ejs-radiobutton>
    <ejs-radiobutton cssClass="e-warning" label="Warning"></ejs-radiobutton>
    <ejs-radiobutton cssClass="e-danger" label="Danger"></ejs-radiobutton>
  </div>
</template>

<script setup>
import { RadioButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    "ejs-radiobutton": RadioButtonComponent
  }
}
</script>
```

## Color Variants

```vue
<template>
  <div class="flex flex-col gap-3">
    <ejs-radiobutton label="Default"></ejs-radiobutton>
    <ejs-radiobutton cssClass="e-primary" label="Primary"></ejs-radiobutton>
    <ejs-radiobutton cssClass="e-info" label="Info"></ejs-radiobutton>
    <ejs-radiobutton cssClass="e-success" label="Success"></ejs-radiobutton>
    <ejs-radiobutton cssClass="e-warning" label="Warning"></ejs-radiobutton>
    <ejs-radiobutton cssClass="e-danger" label="Danger"></ejs-radiobutton>
  </div>
</template>

<script setup>
import { RadioButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    "ejs-radiobutton": RadioButtonComponent
  }
}
</script>
```

## Custom Styling

```vue
<template>
  <ejs-radiobutton 
    label="Custom"
    cssClass="custom-radio"
  ></ejs-radiobutton>
</template>

<script setup>
import { RadioButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    "ejs-radiobutton": RadioButtonComponent
  }
}
</script>

<style scoped>
:deep(.custom-radio) {
  --e-radio-color: #7b3ff2;
}

:deep(.custom-radio label) {
  font-weight: 500;
}
</style>
```

---

## Next Steps

- Learn accessibility in [radiobutton-accessibility.md](radiobutton-accessibility.md)
