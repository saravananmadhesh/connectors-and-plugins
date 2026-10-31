# Disabled Items – Syncfusion Vue 3 AutoComplete

## Disable via Fields

Mark items as disabled using a field:

```vue
<template>
  <ejs-autocomplete
    :dataSource="countries"
    :fields="{ text: 'name', value: 'code', disabled: 'isDisabled' }"
  />
</template>

<script setup>
import { ref } from 'vue';

const countries = ref([
  { name: 'USA', code: 'US', isDisabled: false },
  { name: 'Canada', code: 'CA', isDisabled: false },
  { name: 'Mexico', code: 'MX', isDisabled: true },
  { name: 'Brazil', code: 'BR', isDisabled: false }
]);
</script>
```

---

## Disable Entire Component

```vue
<template>
  <div style="padding: 20px">
    <ejs-autocomplete
      :dataSource="countries"
      :enabled="isEnabled"
    />
    
    <button @click="isEnabled = !isEnabled">
      {{ isEnabled ? 'Disable' : 'Enable' }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isEnabled = ref(true);
const countries = ref([...]);
</script>
```

---

## Dynamic Disabling

Disable items programmatically:

```vue
<template>
  <div style="padding: 20px">
    <ejs-autocomplete
      ref="autoCompleteRef"
      :dataSource="countries"
      :fields="{ text: 'name', disabled: 'isDisabled' }"
    />
    
    <button @click="disableSelected">Disable Selected</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const autoCompleteRef = ref(null);
const countries = ref([
  { name: 'USA', isDisabled: false },
  { name: 'Canada', isDisabled: false },
  { name: 'Mexico', isDisabled: false }
]);

const disableSelected = () => {
  const selectedIndex = autoCompleteRef.value?.index;
  if (selectedIndex !== undefined) {
    countries.value[selectedIndex].isDisabled = true;
  }
};
</script>
```

---

## Next Steps

- For filtering, read `references/autocomplete-filtering.md`
- For data binding, read `references/autocomplete-data-binding.md`
- For API reference, read `references/autocomplete-api.md`
