# Templates – Syncfusion Vue 3 Mention

## Item Template

```vue
<template>
  <ejs-mention :dataSource="employees">
    <template #itemTemplate="{ data }">
      <div class="flex items-center gap-2">
        <img :src="data.avatar" class="w-6 h-6 rounded" />
        <div>
          <div class="font-semibold">{{ data.name }}</div>
          <div class="text-xs text-gray-500">{{ data.email }}</div>
        </div>
      </div>
    </template>
  </ejs-mention>
</template>

<script setup>
import { ref } from 'vue';

const employees = ref([
  { name: 'John', email: 'john@example.com', avatar: '/john.png' },
  { name: 'Jane', email: 'jane@example.com', avatar: '/jane.png' }
]);
</script>
```

---

## No Records Template

```vue
<template>
  <ejs-mention :dataSource="users">
    <template #noRecordsTemplate>
      <div class="text-center text-gray-500 p-4">
        No users found
      </div>
    </template>
  </ejs-mention>
</template>

<script setup>
import { ref } from 'vue';

const users = ref([...]);
</script>
```

---

## Next Steps

- For data binding, read `references/mention-working-with-data.md`
- For filtering, read `references/mention-filtering-data.md`
- For API reference, read `references/mention-api.md`
