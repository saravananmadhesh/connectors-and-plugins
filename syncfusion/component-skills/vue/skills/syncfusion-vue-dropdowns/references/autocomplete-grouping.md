# Grouping – Syncfusion Vue 3 AutoComplete

## Basic Grouping

Group items by a field:

```vue
<template>
  <ejs-autocomplete
    :dataSource="countries"
    :fields="{ text: 'name', groupBy: 'continent' }"
  />
</template>

<script setup>
import { ref } from 'vue';

const countries = ref([
  { name: 'USA', continent: 'North America' },
  { name: 'Canada', continent: 'North America' },
  { name: 'France', continent: 'Europe' },
  { name: 'Germany', continent: 'Europe' },
  { name: 'Japan', continent: 'Asia' }
]);
</script>
```

---

## Grouped with Custom Template

```vue
<template>
  <ejs-autocomplete
    :dataSource="countries"
    :fields="{ text: 'name', groupBy: 'continent' }"
  >
    <template #groupTemplate="{ data }">
      <div class="font-bold bg-gray-200 p-2">
        🌍 {{ data.continent }}
      </div>
    </template>
  </ejs-autocomplete>
</template>

<script setup>
import { ref } from 'vue';

const countries = ref([...]);
</script>
```

---

## Next Steps

- For data binding, read `references/autocomplete-data-binding.md`
- For filtering, read `references/autocomplete-filtering.md`
- For API reference, read `references/autocomplete-api.md`
