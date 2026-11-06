# Working with Data – Syncfusion Vue 3 Mention

## Simple String Array

```vue
<template>
  <ejs-mention :dataSource="users" />
</template>

<script setup>
import { ref } from 'vue';

const users = ref(['John', 'Jane', 'Bob', 'Alice']);
</script>
```

---

## Object Array

```vue
<template>
  <ejs-mention
    :dataSource="employees"
    :fields="{ text: 'name', value: 'email' }"
  />
</template>

<script setup>
import { ref } from 'vue';

const employees = ref([
  { name: 'John Smith', email: 'john@example.com' },
  { name: 'Jane Doe', email: 'jane@example.com' },
  { name: 'Bob Johnson', email: 'bob@example.com' }
]);
</script>
```

---

## Custom Trigger

```vue
<template>
  <ejs-mention
    :dataSource="hashtags"
    :mentionChar="'#'"
  />
</template>

<script setup>
import { ref } from 'vue';

const hashtags = ref(['development', 'design', 'marketing']);
</script>
```

---

## Multiple Triggers

```vue
<template>
  <div>
    <ejs-mention
      :dataSource="users"
      :mentionChar="'@'"
    />
    <ejs-mention
      :dataSource="hashtags"
      :mentionChar="'#'"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const users = ref([...]);
const hashtags = ref([...]);
</script>
```

---

## Next Steps

- For filtering, read `references/mention-filtering-data.md`
- For templates, read `references/mention-template.md`
- For API reference, read `references/mention-api.md`
