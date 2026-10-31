# Filtering – Syncfusion Vue 3 DropdownList

## Enable Filtering

```vue
<template>
  <ejs-dropdownlist
    :dataSource="countries"
    :allowFiltering="true"
    placeholder="Search or select country"
  />
</template>

<script setup>
import { ref } from 'vue';

const countries = ref(['USA', 'UK', 'Canada', 'Australia', 'Germany']);
</script>
```

---

## Filter Types

```vue
<template>
  <ejs-dropdownlist
    :dataSource="items"
    :allowFiltering="true"
    :filterType="'Contains'"
  />
</template>

<script setup>
import { ref } from 'vue';

const items = ref([...]);
</script>
```

Filter types: `StartsWith`, `EndsWith`, `Contains`

---

## Case-Insensitive Filter

```vue
<template>
  <ejs-dropdownlist
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
  <ejs-dropdownlist
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

- For grouping, read `references/dropdownlist-grouping-and-templates.md`
- For data binding, read `references/dropdownlist-data-binding.md`
- For API reference, read `references/dropdownlist-api.md`
