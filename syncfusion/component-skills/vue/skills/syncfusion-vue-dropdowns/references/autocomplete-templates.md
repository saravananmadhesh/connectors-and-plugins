# Templates – Syncfusion Vue 3 AutoComplete

## Item Template

Custom rendering for each list item:

```vue
<template>
  <ejs-autocomplete :dataSource="employees">
    <template #itemTemplate="{ data }">
      <div class="flex items-center gap-2">
        <img :src="data.avatar" class="w-6 h-6 rounded" />
        <div>
          <div>{{ data.name }}</div>
          <div class="text-sm text-gray-500">{{ data.email }}</div>
        </div>
      </div>
    </template>
  </ejs-autocomplete>
</template>

<script setup>
import { ref } from 'vue';

const employees = ref([
  { id: 1, name: 'John', email: 'john@example.com', avatar: 'path/to/avatar' },
  { id: 2, name: 'Jane', email: 'jane@example.com', avatar: 'path/to/avatar' }
]);
</script>
```

---

## No Records Template

Show custom message when no data:

```vue
<template>
  <ejs-autocomplete :dataSource="items">
    <template #noRecordsTemplate>
      <div class="text-center text-gray-500 p-4">
        <p>No items found</p>
      </div>
    </template>
  </ejs-autocomplete>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([...]);
</script>
```

---

## Header Template

Add static header to popup:

```vue
<template>
  <ejs-autocomplete :dataSource="items">
    <template #headerTemplate>
      <div class="bg-blue-500 text-white p-2">
        Select from list
      </div>
    </template>
  </ejs-autocomplete>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([...]);
</script>
```

---

## Next Steps

- For data binding, read `references/autocomplete-data-binding.md`
- For filtering, read `references/autocomplete-filtering.md`
- For API reference, read `references/autocomplete-api.md`
