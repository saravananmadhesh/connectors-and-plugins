# Filtering & Search – Syncfusion Vue 3 ComboBox

## Enable Filtering

```vue
<template>
  <ejs-combobox
    :dataSource="countries"
    :allowFiltering="true"
  />
</template>

<script setup>
import { ref } from 'vue';

const countries = ref(['USA', 'UK', 'Canada', 'Australia']);
</script>
```

## Filter Types

```vue
<template>
  <ejs-combobox
    :dataSource="countries"
    :allowFiltering="true"
    :filterType="'Contains'"
  />
</template>

<script setup>
import { ref } from 'vue';

const countries = ref([...]);
</script>
```

Filter types: `StartsWith`, `EndsWith`, `Contains`

## Case-Insensitive

```vue
<template>
  <ejs-combobox
    :dataSource="countries"
    :ignoreCase="true"
  />
</template>

<script setup>
import { ref } from 'vue';

const countries = ref([...]);
</script>
```

## Custom Filtering

```vue
<template>
  <ejs-combobox
    :dataSource="countries"
    @filtering="onFiltering"
  />
</template>

<script setup>
import { ref } from 'vue';

const countries = ref([...]);

const onFiltering = (args) => {
  const { text } = args;
  if (text.length < 2) {
    args.cancel = true;
  }
};
</script>
```

---

## Next Steps

- For data binding, read `references/combobox-data-binding.md`
- For templates, read `references/combobox-templates-and-customization.md`
- For API reference, read `references/combobox-api.md`
