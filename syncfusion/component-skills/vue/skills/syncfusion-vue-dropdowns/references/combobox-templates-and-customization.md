# Templates & Customization – Syncfusion Vue 3 ComboBox

## Item Template

```vue
<template>
  <ejs-combobox :dataSource="employees">
    <template #itemTemplate="{ data }">
      <div class="flex items-center gap-2">
        <img :src="data.avatar" class="w-6 h-6 rounded" />
        <div>{{ data.name }}</div>
      </div>
    </template>
  </ejs-combobox>
</template>

<script setup>
import { ref } from 'vue';

const employees = ref([
  { id: 1, name: 'John', avatar: '/avatar1.png' },
  { id: 2, name: 'Jane', avatar: '/avatar2.png' }
]);
</script>
```

## Header & Footer Templates

```vue
<template>
  <ejs-combobox :dataSource="items">
    <template #headerTemplate>
      <div class="bg-blue-500 text-white p-2">Select Item</div>
    </template>
    <template #footerTemplate>
      <div class="bg-gray-200 p-2 text-sm">Total items: {{ items.length }}</div>
    </template>
  </ejs-combobox>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([...]);
</script>
```

## No Records Template

```vue
<template>
  <ejs-combobox :dataSource="items">
    <template #noRecordsTemplate>
      <div class="text-center text-gray-500 p-4">
        No items found
      </div>
    </template>
  </ejs-combobox>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([...]);
</script>
```

---

## Next Steps

- For data binding, read `references/combobox-data-binding.md`
- For filtering, read `references/combobox-filtering-and-search.md`
- For API reference, read `references/combobox-api.md`
