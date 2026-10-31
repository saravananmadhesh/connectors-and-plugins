# RadioButton Features and State

> Manage RadioButton state and behavior.

---

## Checked State

Control initial state:

```vue
<template>
  <ejs-radiobutton 
    label="Option"
    name="choice"
    value="a"
    checked
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

## Value Binding

Bind to component data:

```vue
<template>
  <div>
    <ejs-radiobutton 
      label="Yes"
      name="response"
      value="yes"
      v-model="selected"
    ></ejs-radiobutton>
    <ejs-radiobutton 
      label="No"
      name="response"
      value="no"
      v-model="selected"
    ></ejs-radiobutton>
    <p>Selected: {{ selected }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RadioButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    "ejs-radiobutton": RadioButtonComponent
  }
}

const selected = ref('yes');
</script>
```

## Disabled State

Disable RadioButton:

```vue
<template>
  <ejs-radiobutton 
    label="Disabled"
    disabled
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

## Group Example

Create semantic RadioButton groups:

```vue
<template>
  <fieldset>
    <legend>Choose Shipping Speed</legend>
    <div>
      <ejs-radiobutton 
        label="Standard (5-7 days)"
        name="shipping"
        value="standard"
        v-model="shipping"
      ></ejs-radiobutton>
    </div>
    <div>
      <ejs-radiobutton 
        label="Express (2-3 days)"
        name="shipping"
        value="express"
        v-model="shipping"
      ></ejs-radiobutton>
    </div>
  </fieldset>
</template>

<script setup>
import { ref } from 'vue';
import { RadioButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    "ejs-radiobutton": RadioButtonComponent
  }
}

const shipping = ref('standard');
</script>
```

---

## Next Steps

- Explore styling in [radiobutton-style-and-appearance.md](radiobutton-style-and-appearance.md)
