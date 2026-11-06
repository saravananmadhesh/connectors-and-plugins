# Grouping & Sorting – Syncfusion Vue 3 ComboBox

## Grouping

```vue
<template>
  <ejs-combobox
    :dataSource="countries"
    :fields="{ text: 'name', groupBy: 'continent' }"
  />
</template>

<script setup>
import { ref } from 'vue';

const countries = ref([
  { name: 'USA', continent: 'North America' },
  { name: 'Canada', continent: 'North America' },
  { name: 'France', continent: 'Europe' }
]);
</script>
```

## Group Templates

```vue
<template>
  <ejs-combobox
    :dataSource="countries"
    :fields="{ text: 'name', groupBy: 'continent' }"
  >
    <template #groupTemplate="{ data }">
      <div class="font-bold bg-gray-200 p-2">
        🌍 {{ data.continent }}
      </div>
    </template>
  </ejs-combobox>
</template>

<script setup>
import { ref } from 'vue';

const countries = ref([...]);
</script>
```

## Sorting

```vue
<template>
  <ejs-combobox
    :dataSource="countries"
    :sortOrder="'Ascending'"
  />
</template>

<script setup>
import { ref } from 'vue';

const countries = ref([...]);
</script>
```

Sort orders: `Ascending`, `Descending`, `None`

---

## Next Steps

- For data binding, read `references/combobox-data-binding.md`
- For templates, read `references/combobox-templates-and-customization.md`
- For API reference, read `references/combobox-api.md`
