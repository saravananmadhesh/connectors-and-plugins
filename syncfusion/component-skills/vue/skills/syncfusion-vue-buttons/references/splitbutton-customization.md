# SplitButton Customization

> Customize SplitButton behavior and display.

---

## Item Template

```vue
<template>
  <ejs-splitbutton 
    content="Actions"
    :items="items"
  >
    <template #item="{ data }">
      <div class="flex items-center justify-between w-full">
        <span>{{ data.text }}</span>
        <i v-if="data.icon" :class="data.icon"></i>
      </div>
    </template>
  </ejs-splitbutton>
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
  { text: 'Delete', icon: 'e-icons e-delete' },
  { text: 'Share', icon: 'e-icons e-share' }
];
</script>
```

## Dynamic Items

```vue
<template>
  <div class="mb-4 flex gap-2">
    <button @click="addItem">Add Item</button>
    <button @click="removeItem">Remove Item</button>
  </div>
  
  <ejs-splitbutton 
    content="Actions"
    :items="items"
  ></ejs-splitbutton>
</template>

<script setup>
import { ref } from 'vue';
import { SplitButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: "App",
  components: {
    "ejs-splitbutton": SplitButtonComponent
  }
}

const items = ref([
  { text: 'Item 1', icon: 'e-icons e-edit' },
  { text: 'Item 2', icon: 'e-icons e-delete' }
]);

const addItem = () => {
  items.value.push({ 
    text: `Item ${items.value.length + 1}`,
    icon: 'e-icons e-plus'
  });
};

const removeItem = () => {
  if (items.value.length > 0) {
    items.value.pop();
  }
};
</script>
```

---

## Next Steps

- Learn accessibility in [splitbutton-accessibility.md](splitbutton-accessibility.md)
