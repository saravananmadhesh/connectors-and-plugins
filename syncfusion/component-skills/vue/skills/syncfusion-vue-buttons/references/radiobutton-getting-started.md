# RadioButton Getting Started

> Begin using Syncfusion RadioButton component.

---

## Installation

```bash
npm install @syncfusion/ej2-vue-buttons @syncfusion/ej2-base
```

## First RadioButton

```vue
<template>
  <div>
    <ejs-radiobutton 
      label="Option 1"
      name="options"
      value="1"
      v-model="selected"
    ></ejs-radiobutton>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import "@syncfusion/ej2-material3-theme/styles/radio-button/index.css";
import { RadioButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    "ejs-radiobutton": RadioButtonComponent
  }
}

const selected = ref('1');
</script>
```

## RadioButton Group

```vue
<template>
  <fieldset>
    <legend>Choose Gender:</legend>
    <ejs-radiobutton 
      label="Male"
      name="gender"
      value="male"
      v-model="gender"
    ></ejs-radiobutton>
    <ejs-radiobutton 
      label="Female"
      name="gender"
      value="female"
      v-model="gender"
    ></ejs-radiobutton>
    <ejs-radiobutton 
      label="Other"
      name="gender"
      value="other"
      v-model="gender"
    ></ejs-radiobutton>
  </fieldset>
</template>

<script setup>
import { ref } from 'vue';
import "@syncfusion/ej2-material3-theme/styles/radio-button/index.css";
import { RadioButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    "ejs-radiobutton": RadioButtonComponent
  }
}

const gender = ref('');
</script>
```

---

## Next Steps

- Learn label and size in [radiobutton-label-and-size.md](radiobutton-label-and-size.md)
- Explore features in [radiobutton-features-and-state.md](radiobutton-features-and-state.md)
