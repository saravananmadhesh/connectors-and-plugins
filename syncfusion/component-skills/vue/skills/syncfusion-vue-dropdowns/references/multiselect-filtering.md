# Filtering – Syncfusion Vue 3 MultiSelect

## Enable Filtering

```vue
<template>
  <ejs-multiselect
    :dataSource="items"
    :allowFiltering="true"
    placeholder="Search and select..."
  />
</template>

<script setup>
import { ref } from 'vue';

const items = ref(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']);
</script>
```

---

## Filter Type

```vue
<template>
  <ejs-multiselect
    :dataSource="countries"
    :allowFiltering="true"
    :filterType="'Contains'"
  />
</template>

<script setup>
import { ref } from 'vue';

const countries = ref(['USA', 'UK', 'Canada', 'Australia', 'Germany']);
</script>
```

Filter types: `StartsWith`, `EndsWith`, `Contains`

---

## Case-Insensitive

```vue
<template>
  <ejs-multiselect
    :dataSource="items"
    :allowFiltering="true"
    :ignoreCase="true"
  />
</template>

<script setup>
import { ref } from 'vue';

const items = ref([...]);
</script>
```

---

## Custom Filtering

```vue
<template>
  <ejs-multiselect
    :dataSource="items"
    @filtering="onFilter"
  />
</template>

<script setup>
import { ref } from 'vue';

const items = ref([...]);

const onFilter = (args) => {
  if (args.text.length < 2) {
    args.cancel = true;
  }
};
</script>
```

---

## Next Steps

- For data binding, read `references/multiselect-data-binding.md`
- For grouping, read `references/multiselect-grouping.md`
- For API reference, read `references/multiselect-api.md`
