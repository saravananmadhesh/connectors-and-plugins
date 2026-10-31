# SplitButton Features

> Explore SplitButton features and functionality.

---

## Disabled State

```vue
<template>
  <div class="flex gap-4">
    <ejs-splitbutton 
      content="Enabled"
      :items="items"
    ></ejs-splitbutton>
    <ejs-splitbutton 
      content="Disabled"
      :items="items"
      :disabled="true"
    ></ejs-splitbutton>
  </div>
</template>

<script setup>
import { SplitButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: "App",
  components: {
    "ejs-splitbutton": SplitButtonComponent
  }
}

const items = [
  { text: 'Edit', icon: 'e-icons e-edit' },
  { text: 'Delete', icon: 'e-icons e-delete' }
];
</script>
```

## Dropdown Open Direction

```vue
<template>
  <div class="flex gap-4">
    <ejs-splitbutton 
      content="Down"
      :items="items"
      :openOrientation="'Below'"
    ></ejs-splitbutton>
    <ejs-splitbutton 
      content="Up"
      :items="items"
      :openOrientation="'Above'"
    ></ejs-splitbutton>
  </div>
</template>

<script setup>
import { SplitButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: "App",
  components: {
    "ejs-splitbutton": SplitButtonComponent
  }
}

const items = [
  { text: 'Item 1' },
  { text: 'Item 2' },
  { text: 'Item 3' }
];
</script>
```

## Item Count

```vue
<template>
  <ejs-splitbutton 
    :content="`Items: ${items.length}`"
    :items="items"
  ></ejs-splitbutton>
</template>

<script setup>
import { computed } from 'vue';
import { SplitButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: "App",
  components: {
    "ejs-splitbutton": SplitButtonComponent
  }
}

const items = [
  { text: 'Action 1' },
  { text: 'Action 2' },
  { text: 'Action 3' },
  { text: 'Action 4' }
];
</script>
```

---

## Next Steps

- Customize with [splitbutton-customization.md](splitbutton-customization.md)
