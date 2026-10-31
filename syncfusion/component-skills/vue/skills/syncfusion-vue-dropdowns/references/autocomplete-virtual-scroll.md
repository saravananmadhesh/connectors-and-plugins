# Virtual Scrolling – Syncfusion Vue 3 AutoComplete

## Basic Virtualization

Enable virtual scrolling for large datasets:

```vue
<template>
  <ejs-autocomplete
    :dataSource="largeDataset"
    :enableVirtualization="true"
    :suggestionCount="10"
  />
</template>

<script setup>
import { ref } from 'vue';

// Generate 1000 items
const largeDataset = ref(
  Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`)
);
</script>
```

---

## Virtual Scrolling with Objects

```vue
<template>
  <ejs-autocomplete
    :dataSource="largeEmployeeList"
    :fields="{ text: 'name', value: 'id' }"
    :enableVirtualization="true"
    :suggestionCount="20"
  />
</template>

<script setup>
import { ref } from 'vue';

const largeEmployeeList = ref(
  Array.from({ length: 5000 }, (_, i) => ({
    id: i + 1,
    name: `Employee ${i + 1}`
  }))
);
</script>
```

---

## Performance Tips

- Use `:enableVirtualization="true"` for datasets > 500 items
- Adjust `:suggestionCount` to control visible items
- Virtual scrolling reduces DOM nodes for better performance

---

## Next Steps

- For data binding, read `references/autocomplete-data-binding.md`
- For filtering, read `references/autocomplete-filtering.md`
- For API reference, read `references/autocomplete-api.md`
