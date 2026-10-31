# RadioButton Label and Size

> Customize RadioButton labels and sizes.

---

## Label Property

Add labels to RadioButton:

```vue
<template>
  <ejs-radiobutton 
    label="Accept Terms"
    name="terms"
    value="yes"
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
```

## Label Position

Control label position:

```vue
<template>
  <div>
    <ejs-radiobutton 
      label="Before (Default)"
      labelPosition="Before"
    ></ejs-radiobutton>
    <ejs-radiobutton 
      label="After"
      labelPosition="After"
    ></ejs-radiobutton>
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

## Size Variations

```vue
<template>
  <div>
    <ejs-radiobutton cssClass="e-small" label="Small"></ejs-radiobutton>
    <ejs-radiobutton label="Default"></ejs-radiobutton>
    <ejs-radiobutton cssClass="e-large" label="Large"></ejs-radiobutton>
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

---

## Next Steps

- Explore features in [radiobutton-features-and-state.md](radiobutton-features-and-state.md)
