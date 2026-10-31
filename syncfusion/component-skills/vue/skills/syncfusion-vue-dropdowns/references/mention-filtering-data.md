# Filtering Data – Syncfusion Vue 3 Mention

## Filter Types

```vue
<template>
  <ejs-mention
    :dataSource="users"
    :filterType="'Contains'"
  />
</template>

<script setup>
import { ref } from 'vue';

const users = ref([...]);
</script>
```

Filter types: `StartsWith`, `EndsWith`, `Contains`

---

## Custom Filtering

```vue
<template>
  <ejs-mention
    :dataSource="users"
    @filtering="onFilter"
  />
</template>

<script setup>
import { ref } from 'vue';

const users = ref([...]);

const onFilter = (args) => {
  const { text } = args;
  if (text.length < 2) {
    args.cancel = true;
  }
};
</script>
```

---

## Min Match Characters

```vue
<template>
  <ejs-mention
    :dataSource="users"
    :minChars="3"
  />
</template>

<script setup>
import { ref } from 'vue';

const users = ref([...]);
</script>
```

---

## Next Steps

- For data binding, read `references/mention-working-with-data.md`
- For templates, read `references/mention-template.md`
- For API reference, read `references/mention-api.md`
