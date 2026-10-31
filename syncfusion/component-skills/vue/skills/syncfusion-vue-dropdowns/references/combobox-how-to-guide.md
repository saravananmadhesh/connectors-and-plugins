# How-To Guide – Syncfusion Vue 3 ComboBox

## Search with Debounce

```vue
<template>
  <ejs-combobox
    :dataSource="items"
    :debounceDelay="500"
    :minLength="2"
  />
</template>

<script setup>
import { ref } from 'vue';

const items = ref([...]);
</script>
```

---

## Set Default Value

```vue
<template>
  <ejs-combobox
    :dataSource="employees"
    :fields="{ text: 'name', value: 'id' }"
    :value="defaultEmployeeId"
  />
</template>

<script setup>
import { ref } from 'vue';

const defaultEmployeeId = ref(1);
const employees = ref([
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
]);
</script>
```

---

## Clear Selection

```vue
<template>
  <div style="display: flex; gap: 10px">
    <ejs-combobox
      ref="comboBoxRef"
      :dataSource="items"
      :value="selectedItem"
    />
    <button @click="clearValue" v-if="selectedItem">Clear</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const comboBoxRef = ref(null);
const selectedItem = ref('');
const items = ref([...]);

const clearValue = () => {
  selectedItem.value = '';
};
</script>
```

---

## Disable Specific Items

```vue
<template>
  <ejs-combobox
    :dataSource="items"
    :fields="{ text: 'name', disabled: 'isDisabled' }"
  />
</template>

<script setup>
import { ref } from 'vue';

const items = ref([
  { name: 'Active', isDisabled: false },
  { name: 'Inactive', isDisabled: true },
  { name: 'Pending', isDisabled: false }
]);
</script>
```

---

## Next Steps

- For styling, read `references/combobox-styling-and-theming.md`
- For data binding, read `references/combobox-data-binding.md`
- For API reference, read `references/combobox-api.md`
