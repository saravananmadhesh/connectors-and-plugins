# ProgressButton Spinner and Progress

> Control spinner display and progress behavior.

---

## Spinner Visible

Show/hide spinner during progress:

```vue
<template>
  <div class="flex gap-4">
    <ejs-progressbutton 
      content="With Spinner"
      :duration="3000"
      :spinnerVisible="true"
    ></ejs-progressbutton>
    <ejs-progressbutton 
      content="No Spinner"
      :duration="3000"
      :spinnerVisible="false"
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
```

## Progress Positions

Control progress bar position:

```vue
<template>
  <div class="flex flex-col gap-3">
    <ejs-progressbutton 
      content="Top"
      :duration="3000"
      :progressPosition="'Top'"
    ></ejs-progressbutton>
    <ejs-progressbutton 
      content="Center"
      :duration="3000"
      :progressPosition="'Center'"
    ></ejs-progressbutton>
    <ejs-progressbutton 
      content="Bottom"
      :duration="3000"
      :progressPosition="'Bottom'"
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
```

## Indeterminate Progress

```vue
<template>
  <ejs-progressbutton 
    content="Processing..."
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

## Next Steps

- Customize styling in [progressbutton-style-and-appearance.md](progressbutton-style-and-appearance.md)
