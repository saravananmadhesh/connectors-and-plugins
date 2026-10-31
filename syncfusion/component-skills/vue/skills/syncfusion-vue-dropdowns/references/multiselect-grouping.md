# Grouping & Templates – Syncfusion Vue 3 MultiSelect

## Grouping

```vue
<template>
  <ejs-multiselect
    :dataSource="employees"
    :fields="{ text: 'name', groupBy: 'department' }"
  />
</template>

<script setup>
import { ref } from 'vue';

const employees = ref([
  { name: 'John', department: 'Sales' },
  { name: 'Jane', department: 'IT' },
  { name: 'Bob', department: 'Sales' },
  { name: 'Alice', department: 'HR' }
]);
</script>
```

---

## Group Template

```vue
<template>
  <ejs-multiselect
    :dataSource="employees"
    :fields="{ text: 'name', groupBy: 'department' }"
  >
    <template #groupTemplate="{ data }">
      <div class="font-bold bg-blue-100 p-2">
        {{ data.department }} (Department)
      </div>
    </template>
  </ejs-multiselect>
</template>

<script setup>
import { ref } from 'vue';

const employees = ref([...]);
</script>
```

---

## Item Template

```vue
<template>
  <ejs-multiselect :dataSource="items">
    <template #itemTemplate="{ data }">
      <div class="flex items-center gap-2">
        <span class="font-semibold">{{ data.name }}</span>
        <span class="text-gray-500 text-sm">{{ data.email }}</span>
      </div>
    </template>
  </ejs-multiselect>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([...]);
</script>
```

---

## Next Steps

- For filtering, read `references/multiselect-filtering.md`
- For data binding, read `references/multiselect-data-binding.md`
- For API reference, read `references/multiselect-api.md`
