# Grouping & Templates – Syncfusion Vue 3 DropdownList

## Grouping

```vue
<template>
  <ejs-dropdownlist
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
  { name: 'Germany', continent: 'Europe' }
]);
</script>
```

---

## Custom Group Template

```vue
<template>
  <ejs-dropdownlist
    :dataSource="countries"
    :fields="{ text: 'name', groupBy: 'continent' }"
  >
    <template #groupTemplate="{ data }">
      <div class="font-bold bg-blue-100 p-2">
        {{ data.continent }}
      </div>
    </template>
  </ejs-dropdownlist>
</template>

<script setup>
import { ref } from 'vue';

const countries = ref([...]);
</script>
```

---

## Item Template

```vue
<template>
  <ejs-dropdownlist :dataSource="employees">
    <template #itemTemplate="{ data }">
      <div class="flex items-center gap-2">
        <span class="font-semibold">{{ data.name }}</span>
        <span class="text-gray-500 text-sm">{{ data.department }}</span>
      </div>
    </template>
  </ejs-dropdownlist>
</template>

<script setup>
import { ref } from 'vue';

const employees = ref([
  { id: 1, name: 'John', department: 'Sales' },
  { id: 2, name: 'Jane', department: 'IT' }
]);
</script>
```

---

## Next Steps

- For filtering, read `references/dropdownlist-filtering.md`
- For styling, read `references/dropdownlist-accessibility-styling-localization.md`
- For API reference, read `references/dropdownlist-api.md`
